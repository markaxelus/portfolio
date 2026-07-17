"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EngineContext, type EngineApi, type EngineCtx, type Point } from "./engine-context";
import { ACCENTS, PROJECTS, plateURI } from "@/lib/plates";
import { deskDateStr, deskHour, deskTime } from "@/lib/desk";
import { clamp, lerp, r2 } from "@/lib/math";

/**
 * Phase 2 backbone. Holds the truly-global state (accent/theme/proof/noise +
 * media flags), derives the plate art, and owns the cross-cutting DOM effects
 * that main.js applied imperatively: the `--accent` CSS var, `body.night/proof/
 * has-cursor/late-desk`, the desk clock fill, the reprint flash, persistence,
 * the boot URL reads, and the global keyboard. SSR ships the settled defaults;
 * everything here runs client-side after mount (no hydration divergence).
 */
export default function EngineProvider({ children }: { children: React.ReactNode }) {
  const [accentI, setAccentI] = useState(0);
  const [isNight, setIsNight] = useState(false);
  const [proofOn, setProofOn] = useState(false);
  const [noiseOn, setNoiseOn] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [stillMode, setStillMode] = useState(false);
  const [trailEnabled, setTrailEnabled] = useState(false);

  // ref mirrors so the physics loops can read synchronously (no subscribe)
  const reducedRef = useRef(false);
  const stillRef = useRef(false);
  const proofRef = useRef(false);
  const trailRef = useRef(false);
  reducedRef.current = reduced;
  stillRef.current = stillMode;
  proofRef.current = proofOn;
  trailRef.current = trailEnabled;

  // the single pointer feed + per-frame singletons
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const loupeOnRef = useRef(false);

  // cross-subsystem imperative registry (owners assign, callers no-op-safe call)
  const apiRef = useRef<EngineApi>({});

  // scroll-frame fan-out (strike / hold-register / thread / setting subscribe here)
  const scrollSubs = useRef<Set<(prog: number) => void>>(new Set());
  const subscribeScroll = useCallback((fn: (prog: number) => void) => {
    scrollSubs.current.add(fn);
    return () => {
      scrollSubs.current.delete(fn);
    };
  }, []);

  // the plate library, re-inked reactively when the accent changes
  // (replaces the imperative boot build + rebuildPlates()).
  const plates = useMemo(
    () => PROJECTS.map((p) => plateURI(p, ACCENTS[accentI].night)),
    [accentI],
  );

  // --- setters (persisting) ---
  const setAccent = useCallback((i: number) => {
    setAccentI(i);
    try {
      localStorage.setItem("ma-accent-i", String(i));
    } catch {}
  }, []);

  const setNight = useCallback((on: boolean, persist = true) => {
    setIsNight(on);
    if (persist) {
      try {
        localStorage.setItem("ma-night", on ? "1" : "0");
      } catch {}
    }
  }, []);

  const setProof = useCallback((on: boolean) => setProofOn(on), []);
  const setNoise = useCallback((on: boolean) => setNoiseOn(on), []);

  // --- boot: URL params + persisted prefs (once) ---
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (/[?&]still(\b|=)/.test(window.location.search)) {
      setStillMode(true);
    }
    // accent
    try {
      const a = +(localStorage.getItem("ma-accent-i") || 0);
      if (a >= 0 && a <= 2) setAccentI(Math.min(2, Math.max(0, a)));
    } catch {}
    // night: stored pref wins, else the office dims on its own schedule
    let pref: string | null = null;
    try {
      pref = localStorage.getItem("ma-night");
    } catch {}
    if (pref === null) {
      const dh = deskHour(new Date());
      setIsNight(dh >= 23 || dh < 6);
    } else {
      setIsNight(pref === "1");
    }
    // mess via ?proof / #proof
    if (q.has("proof") || window.location.hash === "#proof") setProofOn(true);
  }, []);

  // --- media flags ---
  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqFine = window.matchMedia("(pointer: fine)");
    const sync = () => {
      const red = mqReduce.matches;
      const trail = mqFine.matches && !red;
      setReduced(red);
      setTrailEnabled(trail);
      document.body.classList.toggle("has-cursor", trail);
    };
    sync();
    mqReduce.addEventListener("change", sync);
    mqFine.addEventListener("change", sync);
    return () => {
      mqReduce.removeEventListener("change", sync);
      mqFine.removeEventListener("change", sync);
    };
  }, []);

  // --- pointer feed + the always-on cursor / reveal frame (frame() 975–1076) ---
  useEffect(() => {
    const m = mouseRef.current;
    m.x = window.innerWidth / 2;
    m.y = window.innerHeight / 2;
    const plate = { x: m.x, y: m.y };
    let prevPlateX = plate.x;
    let seen = false;
    let lastPlateTf = "";
    let lastDotTf = "";
    const LERP_PLATE = 0.12;

    const onMove = (e: MouseEvent) => {
      m.x = e.clientX;
      m.y = e.clientY;
      if (!seen) {
        seen = true;
        document.body.classList.add("pointer-seen");
        plate.x = m.x;
        plate.y = m.y;
      }
    };
    document.addEventListener("mousemove", onMove);

    const cursorEl = document.getElementById("cursor");

    /* the dot acts over anything pressable (delegated — one listener, pure
       class toggle). Semantic elements plus the few non-semantic clickables;
       the labeled states (PROOF / GRAB / the loupe) ride their own classes
       and win in the cascade. */
    const ACT_SEL =
      'a, button, input, textarea, select, label, [role="button"],' +
      ' [tabindex]:not([tabindex="-1"]), .regmark, .jl-thumb, .yard-ground';
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      cursorEl?.classList.toggle(
        "is-act",
        !!(t && typeof t.closest === "function" && t.closest(ACT_SEL)),
      );
    };
    document.addEventListener("mouseover", onOver);
    const revealEl = document.querySelector<HTMLElement>(".reveal");
    let raf = 0;
    const frame = () => {
      if (trailRef.current && seen) {
        // the dot rides 1:1; the reveal plate keeps its lazy trail (loupe holds it still)
        if (!loupeOnRef.current && revealEl) {
          if (reducedRef.current) {
            plate.x = m.x;
            plate.y = m.y;
          } else {
            plate.x = lerp(plate.x, m.x, LERP_PLATE);
            plate.y = lerp(plate.y, m.y, LERP_PLATE);
            if (Math.abs(plate.x - m.x) + Math.abs(plate.y - m.y) < 0.3) {
              plate.x = m.x;
              plate.y = m.y;
            }
          }
          const vx = plate.x - prevPlateX;
          prevPlateX = plate.x;
          const skew = reducedRef.current ? 0 : clamp(vx * 0.45, -9, 9);
          const rot = reducedRef.current ? 0 : clamp(vx * 0.06, -1.6, 1.6);
          const tf =
            "translate3d(" + r2(plate.x) + "px," + r2(plate.y) + "px,0)" +
            " translate(-50%,-50%) skewX(" + r2(skew) + "deg) rotate(" + r2(rot) + "deg)";
          if (tf !== lastPlateTf) {
            lastPlateTf = tf;
            revealEl.style.transform = tf;
          }
        }
        if (cursorEl) {
          const dotTf = "translate3d(" + m.x + "px," + m.y + "px,0) translate(-50%,-50%)";
          if (dotTf !== lastDotTf) {
            lastDotTf = dotTf;
            cursorEl.style.transform = dotTf;
          }
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  // --- scroll engine: prog → #scroll-pct + cairn indicator + subscribers (onScroll 1888) ---
  useEffect(() => {
    const pctEl = document.getElementById("scroll-pct");
    const indStones = Array.from(document.querySelectorAll<SVGPathElement>("#cairn-svg path"));
    let queued = false;
    let lastPct = "";
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const prog = max > 0 ? clamp(window.scrollY / max, 0, 1) : 1;
        indStones.forEach((p, i) => p.classList.toggle("on", prog >= (i + 1) * 0.19));
        const pct = String(Math.round(prog * 100)).padStart(3, "0");
        if (pctEl && pct !== lastPct) {
          lastPct = pct;
          pctEl.textContent = pct;
        }
        scrollSubs.current.forEach((fn) => fn(prog));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- apply --accent (accent × night) ---
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--accent",
      ACCENTS[accentI][isNight ? "night" : "day"],
    );
  }, [accentI, isNight]);

  // --- body classes ---
  useEffect(() => {
    document.body.classList.toggle("night", isNight);
  }, [isNight]);
  useEffect(() => {
    document.body.classList.toggle("proof", proofOn);
  }, [proofOn]);

  // --- reprint flash on a chip click (never on mount, never reduced/still) ---
  const firstAccent = useRef(true);
  useEffect(() => {
    if (firstAccent.current) {
      firstAccent.current = false;
      return;
    }
    if (reducedRef.current || stillRef.current) return;
    const h = document.getElementById("hero-title");
    if (!h) return;
    h.classList.remove("reprint");
    void h.getBoundingClientRect();
    h.classList.add("reprint");
    const t = setTimeout(() => h.classList.remove("reprint"), 500);
    return () => clearTimeout(t);
  }, [accentI]);

  // --- the desk clock (imperative fill of the SSR spans; client-only Date) ---
  useEffect(() => {
    const clockEl = document.getElementById("clock");
    const jd = document.getElementById("job-date");
    const sd = document.getElementById("stamp-date");
    if (jd || sd) {
      const dateStr = deskDateStr(new Date());
      if (jd) jd.textContent = dateStr;
      if (sd) sd.textContent = dateStr;
    }
    const shiftRows = document.querySelectorAll<HTMLElement>(
      ".imprint .shf-row",
    );
    const impNow = document.getElementById("imp-now");
    const tick = () => {
      const now = new Date();
      if (clockEl) clockEl.textContent = " — " + deskTime(now) + " AT MY DESK";
      /* the imprint's night-shift margin line quotes the clock (mess +
         late-desk only; by day the span sits hidden, the write is cheap) */
      if (impNow) impNow.textContent = deskTime(now);
      const h = deskHour(now);
      document.body.classList.toggle("late-desk", h >= 23 || h < 6);
      /* the shifts ledger knows which shift is RUNNING right now (imprint):
         SHIFT 01 is the day job's hours, SHIFT 02 the sheet's late window —
         the same window as late-desk. Between shifts, neither is marked. */
      if (shiftRows.length === 2) {
        shiftRows[0].classList.toggle("shf-on", h >= 9 && h < 17);
        shiftRows[1].classList.toggle("shf-on", h >= 23 || h < 6);
      }
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  // --- global keyboard (M/P mess, N night, S noise, Esc exit) ---
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (proofRef.current) setProofOn(false);
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      const k = e.key.toLowerCase();
      if (k === "m" || k === "p") {
        e.preventDefault();
        setProofOn((v) => !v);
      } else if (k === "n") {
        setIsNight((v) => {
          const nv = !v;
          try {
            localStorage.setItem("ma-night", nv ? "1" : "0");
          } catch {}
          return nv;
        });
      } else if (k === "s") {
        setNoiseOn((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ctx: EngineCtx = useMemo(
    () => ({
      accentI, setAccent, plates,
      isNight, setNight,
      proofOn, setProof,
      noiseOn, setNoise,
      reduced, stillMode, trailEnabled,
      mouse: mouseRef, subscribeScroll, api: apiRef,
    }),
    [accentI, setAccent, plates, isNight, setNight, proofOn, setProof, noiseOn, setNoise, reduced, stillMode, trailEnabled, subscribeScroll],
  );

  return <EngineContext.Provider value={ctx}>{children}</EngineContext.Provider>;
}
