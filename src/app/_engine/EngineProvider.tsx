"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EngineContext, type EngineCtx } from "./engine-context";
import { ACCENTS, PROJECTS, plateURI } from "@/lib/plates";
import { deskDateStr, deskHour, deskTime } from "@/lib/desk";

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

  // ref mirrors so the (future) physics loops can read synchronously
  const reducedRef = useRef(false);
  const stillRef = useRef(false);
  const proofRef = useRef(false);
  reducedRef.current = reduced;
  stillRef.current = stillMode;
  proofRef.current = proofOn;

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
      setReduced(mqReduce.matches);
      document.body.classList.toggle("has-cursor", mqFine.matches && !mqReduce.matches);
    };
    sync();
    mqReduce.addEventListener("change", sync);
    mqFine.addEventListener("change", sync);
    return () => {
      mqReduce.removeEventListener("change", sync);
      mqFine.removeEventListener("change", sync);
    };
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
    const tick = () => {
      const now = new Date();
      if (clockEl) clockEl.textContent = " — " + deskTime(now) + " AT MY DESK";
      const h = deskHour(now);
      document.body.classList.toggle("late-desk", h >= 23 || h < 6);
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
      reduced, stillMode,
    }),
    [accentI, setAccent, plates, isNight, setNight, proofOn, setProof, noiseOn, setNoise, reduced, stillMode],
  );

  return <EngineContext.Provider value={ctx}>{children}</EngineContext.Provider>;
}
