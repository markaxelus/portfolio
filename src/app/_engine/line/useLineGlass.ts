"use client";

import { useEffect, useRef } from "react";
import { useEngine } from "@/app/_engine/engine-context";
import { ACCENTS, PROJECTS, plateSepURI, plateTextURI } from "@/lib/plates";
import {
  ART_H,
  ART_W,
  buildSeparation,
  HalftoneTiler,
  renderHalftoneWindow,
  type Separation,
} from "@/app/_engine/line/halftone";

/**
 * THE GLASS IS THE CURSOR (CLAUDE.md §27) — the line loupe, ported VERBATIM
 * from prototypes/main.js (the "glass is the cursor" block 796–962 + the
 * frame() loupe cover-fit branch 1043–1071, lineLoupeItem path).
 *
 * A SELF-CONTAINED companion to `useLine`. The physics hook owns the sheets'
 * hover-lift / steady / swing (it runs its own `pointerover` setHover on the
 * SAME hover); this hook adds ONLY the magnifying glass and NEVER touches
 * `.is-active` / `.is-hovering` / zIndex / the item physics. Both delegate on
 * `#index` independently and coexist.
 *
 * HOVER a plate face (`.row-thumb`, mouse pointers only) → the glass drops
 * INSTANTLY: `#loupe` takes the row's plate art and shows, `#cursor` gets
 * `.is-loupe` (the dot hides, the cursor IS the glass). An ephemeral rAF pans
 * the 2.2× zoom off `engine.mouse.current` + the face rect cached at summon
 * (page coords, pre-scaled by the hover-zoom Z=1.16 — verbatim). Leaving the
 * photo LIFTS it (drop). Press + MOVE past ~6px → the glass YIELDS to the hand
 * (drop; the swing belongs to `useLine`). A quick TAP drops the glass so the
 * project sheet (owned by `useLine`) opens clean. Coarse/touch pointers have no
 * hover, so the glass never runs.
 *
 * The line drag does NOT preventDefault its pointerdown (see useLine), so compat
 * mouse events are never suppressed — `engine.mouse.current` stays live and this
 * hook reads it directly; it never writes the pointer feed.
 *
 * THE GLASS RESOLVES REAL DOTS (SOTD plan P2): under the glass the plate is
 * re-rendered as its three ink screens (halftone.ts) on the `#loupe-dots`
 * canvas — key 45°, accent 15°, red 75°, the true rosette. The separation is
 * built async per plate+accent (cached; the rest warm in idle time); until it
 * lands the smooth CSS zoom shows, and the canvas fades in with a short
 * focus-pull — the loupe finding focus. A chip click while the glass is down
 * re-separates and refocuses in place.
 */

const LOUPE_M = 2.2;
const LOUPE_R = 92;
const LOUPE_D = LOUPE_R * 2;
const FOCUS_MS = 240; /* the resolve — dots settle from a breath oversize */

type Face = { x: number; y: number; w: number; h: number };
type HoverItem = { i: number; faceEl: HTMLElement; row: HTMLElement };
type LoupeItem = HoverItem & { face: Face };

/* ---- the separation shop (module-level: survives re-arms, shared) ----
   one build per plate+accent, cached as its promise; after the first build
   lands, the remaining plates warm in idle time so plate 02 resolves
   instantly by the time anyone reaches it. */
const sepCache = new Map<string, Promise<Separation>>();

function ensureSep(i: number, accentI: number): Promise<Separation> {
  const key = i + ":" + accentI;
  let p = sepCache.get(key);
  if (!p) {
    /* the plates always print in the luminous (night) accent — the sep too */
    const accent = ACCENTS[accentI].night;
    p = buildSeparation(plateSepURI(PROJECTS[i], accent), accent);
    sepCache.set(key, p);
    p.catch(() => sepCache.delete(key));
    if (sepCache.size > 8) {
      const oldest = sepCache.keys().next().value;
      if (oldest && oldest !== key) sepCache.delete(oldest);
    }
  }
  return p;
}

/* the type pass images (accent-free, one per plate) */
const textImgCache = new Map<number, Promise<HTMLImageElement>>();
function ensureTextImg(i: number): Promise<HTMLImageElement> {
  let p = textImgCache.get(i);
  if (!p) {
    p = new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = () => rej(new Error("text layer failed to load"));
      img.src = plateTextURI(PROJECTS[i]);
    });
    textImgCache.set(i, p);
    p.catch(() => textImgCache.delete(i));
  }
  return p;
}

let warmed = -1;
function warmPlates(accentI: number): void {
  if (warmed === accentI) return;
  warmed = accentI;
  const idle: (cb: () => void) => void =
    typeof window.requestIdleCallback === "function"
      ? (cb) => window.requestIdleCallback(cb)
      : (cb) => window.setTimeout(cb, 400);
  idle(() => {
    for (let i = 0; i < PROJECTS.length; i++) void ensureSep(i, accentI).catch(() => {});
  });
}

export function useLineGlass(): void {
  const engine = useEngine();
  const api = engine.api;
  const mouse = engine.mouse;
  const { reduced, stillMode, trailEnabled } = engine;

  /* always-current mirrors read inside effects that do NOT re-arm on plate
     changes (a chip click must re-ink the glass in place, never rebuild it). */
  const platesRef = useRef(engine.plates);
  platesRef.current = engine.plates;

  /* the glass-down item — the single source of truth, shared with the re-ink
     effect below (so a chip click while the glass is down finds the plate). */
  const itemRef = useRef<LoupeItem | null>(null);

  /* the current accent (mirror — the sep build + dot inks must read the live
     value inside effects that don't re-arm on accent change) */
  const accentIRef = useRef(engine.accentI);
  accentIRef.current = engine.accentI;

  /* the resolved separation for the down glass + its async-guard generation
     (a lift or a re-ink mid-build must drop the stale result) */
  const sepRef = useRef<Separation | null>(null);
  const sepGenRef = useRef(0);
  const dotsT0Ref = useRef(0);
  /* the pre-rasterized type pass for the down glass (whole plate at S, crisp) */
  const textRef = useRef<{ src: CanvasImageSource; w: number; h: number } | null>(null);
  /* the tile cache — steady-state panning blits, it never re-arcs (perf law) */
  const tilerRef = useRef<HalftoneTiler | null>(null);

  /* which plates have been logged this session (once each, survives re-arm) */
  const loupedRef = useRef<Record<number, true>>({});

  /* ---- delegate hover/press on #index; own the ephemeral pan rAF ---- */
  useEffect(() => {
    if (stillMode) return; /* ?still ships the hang static — no glass */
    const indexEl = document.getElementById("index");
    if (!indexEl) return;
    const loupeEl = document.getElementById("loupe");
    if (!loupeEl) return; /* nothing to show the glass in */
    const cursorEl = document.getElementById("cursor");
    const dotsEl = document.getElementById("loupe-dots") as HTMLCanvasElement | null;
    const dctx = dotsEl ? dotsEl.getContext("2d") : null;

    const m = mouse.current; /* the live pointer feed (mutated in place) */

    /* dedupe writes — reset on summon so the first pan frame always paints the
       fresh crop for the new plate */
    let lastLoupeTf = "";
    let lastLoupeBs = "";
    let lastLoupeBp = "";
    let lastDotKey = "";

    /* the ephemeral pan loop — started on summon, cancelled on drop.
       reads engine.mouse.current + the cached face; pure math, no gBCR. */
    let panRaf = 0;
    function pan(): void {
      panRaf = requestAnimationFrame(pan);
      const it = itemRef.current;
      if (!it) return;
      const f = it.face;
      const mx = m.x;
      const my = m.y;
      const sx = window.scrollX;
      const sy = window.scrollY;
      /* the plate is background-size: cover (art is 800×1000): cover-fit it into
         the face box, map the pointer to a point inside the rendered plate */
      const scv = Math.max(f.w / 800, f.h / 1000);
      const coverW = 800 * scv;
      const coverH = 1000 * scv;
      const ix = mx + sx - (f.x - (coverW - f.w) / 2);
      const iy = my + sy - (f.y - (coverH - f.h) / 2);
      const loupeTf =
        "translate3d(" + mx + "px," + my + "px,0) translate(-50%,-50%)";
      if (loupeTf !== lastLoupeTf) {
        lastLoupeTf = loupeTf;
        loupeEl!.style.transform = loupeTf;
      }
      const bs =
        Math.round(coverW * LOUPE_M) + "px " + Math.round(coverH * LOUPE_M) + "px";
      const bp =
        Math.round(LOUPE_R - ix * LOUPE_M) +
        "px " +
        Math.round(LOUPE_R - iy * LOUPE_M) +
        "px";
      if (bs !== lastLoupeBs) {
        lastLoupeBs = bs;
        loupeEl!.style.backgroundSize = bs;
      }
      if (bp !== lastLoupeBp) {
        lastLoupeBp = bp;
        loupeEl!.style.backgroundPosition = bp;
      }
      /* the dots: re-screen the window when the pan moved or the focus pull
         is still settling (quarter-px quantized — identical frames write
         nothing; the grid is glued to the artwork, so panning translates
         the rosette, never re-seeds it) */
      const sep = sepRef.current;
      if (sep && dctx) {
        const t = performance.now() - dotsT0Ref.current;
        const eased = t >= FOCUS_MS ? 0 : Math.pow(1 - t / FOCUS_MS, 3);
        const focus = 1 + 0.22 * eased;
        const offX = LOUPE_R - ix * LOUPE_M;
        const offY = LOUPE_R - iy * LOUPE_M;
        const dk =
          ((offX * 4) | 0) + ":" + ((offY * 4) | 0) + ":" + ((focus * 200) | 0);
        if (dk !== lastDotKey) {
          lastDotKey = dk;
          renderHalftoneWindow(dctx, sep, {
            size: LOUPE_D,
            accent: ACCENTS[accentIRef.current].night,
            S: scv * LOUPE_M,
            offX,
            offY,
            focus,
            text: textRef.current,
          }, tilerRef.current);
        }
      }
    }

    let lineHoverEl: HTMLElement | null = null; /* the .row-thumb under the pointer */
    let lineHoverItem: HoverItem | null = null;
    let glassPress: { sx: number; sy: number; moved: boolean } | null = null;

    function dropLoupe(): void {
      if (!itemRef.current) return;
      /* the zoom releases WITH the glass — one lifecycle (this + summonLoupe) */
      itemRef.current = null;
      loupeEl!.classList.remove("on");
      if (cursorEl) cursorEl.classList.remove("is-loupe");
      sepRef.current = null;
      textRef.current = null;
      tilerRef.current = null;
      sepGenRef.current++;
      if (dotsEl) dotsEl.classList.remove("dots-on");
      cancelAnimationFrame(panRaf);
      panRaf = 0;
    }

    function summonLoupe(hit: HoverItem): void {
      /* fresh, near-steady face rect. pre-scale the captured crop by the hover
         zoom (top-centre origin) so the glass magnifies the ZOOMED plate — the
         sheet scales to ~1.16 on hover (useLine: 1 + lift*0.16). */
      const r = hit.faceEl.getBoundingClientRect();
      const Z = 1.16;
      const dw = r.width * (Z - 1);
      const face: Face = {
        x: r.left + window.scrollX - dw / 2,
        y: r.top + window.scrollY,
        w: r.width * Z,
        h: r.height * Z,
      };
      itemRef.current = { i: hit.i, faceEl: hit.faceEl, row: hit.row, face };
      loupeEl!.style.backgroundImage = platesRef.current[hit.i];
      loupeEl!.classList.add("on");
      if (cursorEl) cursorEl.classList.add("is-loupe");
      if (!loupedRef.current[hit.i]) {
        loupedRef.current[hit.i] = true;
        api.current.logAct?.(
          "loupe down on plate 0" + (hit.i + 1) + ". the dots check out.",
        );
      }
      /* the dots: size the backing store for this screen, then build (or
         reuse) the separation. The smooth zoom shows until the dots are
         ready — the resolve reads as the loupe finding focus. */
      sepRef.current = null;
      textRef.current = null;
      const gen = ++sepGenRef.current;
      if (dotsEl && dctx) {
        dotsEl.classList.remove("dots-on");
        delete dotsEl.dataset.textDown;
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        if (dotsEl.width !== LOUPE_D * dpr) {
          dotsEl.width = LOUPE_D * dpr;
          dotsEl.height = LOUPE_D * dpr;
        }
        dctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        tilerRef.current = new HalftoneTiler(LOUPE_D, dpr);
        /* the type pass: rasterize the whole plate's text layer at this
           summon's scale (DPR-crisp) — small type is never screened */
        const S = Math.max(face.w / ART_W, face.h / ART_H) * LOUPE_M;
        void ensureTextImg(hit.i)
          .then((img) => {
            if (gen !== sepGenRef.current) return;
            const tw = Math.round(ART_W * S);
            const th = Math.round(ART_H * S);
            const cv = document.createElement("canvas");
            cv.width = tw * dpr;
            cv.height = th * dpr;
            const c2 = cv.getContext("2d");
            if (!c2) return;
            c2.drawImage(img, 0, 0, cv.width, cv.height);
            textRef.current = { src: cv, w: tw, h: th };
            dotsEl.dataset.textDown = "1"; /* harness-visible marker */
            lastDotKey = ""; /* repaint with the type down */
          })
          .catch(() => {});
        void ensureSep(hit.i, accentIRef.current)
          .then((sep) => {
            if (gen !== sepGenRef.current) return; /* lifted or re-inked meanwhile */
            sepRef.current = sep;
            dotsT0Ref.current = performance.now();
            lastDotKey = "";
            dotsEl.classList.add("dots-on");
            warmPlates(accentIRef.current);
          })
          .catch(() => {}); /* no dots — the smooth zoom stands, gracefully */
      }
      /* force the first pan frame to paint (fresh crop for the new plate) */
      lastLoupeTf = "";
      lastLoupeBs = "";
      lastLoupeBp = "";
      cancelAnimationFrame(panRaf);
      panRaf = requestAnimationFrame(pan);
    }

    function hoverItemFor(th: HTMLElement): HoverItem | null {
      const row = th.closest<HTMLElement>(".row");
      if (!row) return null;
      const i = +(row.dataset.plate ?? -1);
      if (i < 0) return null;
      return { i, faceEl: th, row };
    }

    /* the glass rides the hover — delegated (buildLine re-runs on resize, but
       the .row/.row-thumb DOM persists, so element identity is stable) */
    function onPointerOver(e: PointerEvent): void {
      if (e.pointerType && e.pointerType !== "mouse") return;
      const th = (e.target as Element | null)?.closest<HTMLElement>(".row-thumb");
      if (!th || th === lineHoverEl) return;
      lineHoverEl = th;
      const it = hoverItemFor(th);
      lineHoverItem = it;
      if (!it || reduced || !trailEnabled) return;
      if (glassPress) return; /* mid-gesture — the hand owns it */
      if (it.row.classList.contains("unstruck")) return; /* unprinted paper doesn't perform */
      if (!itemRef.current) summonLoupe(it); /* brings the glass */
    }

    function onPointerOut(e: PointerEvent): void {
      if (!lineHoverEl) return;
      if ((e.target as Element | null)?.closest(".row-thumb") !== lineHoverEl) return;
      const to = e.relatedTarget as Element | null;
      if (to && to.closest && to.closest(".row-thumb") === lineHoverEl) return; /* still inside */
      lineHoverEl = null;
      lineHoverItem = null;
      if (itemRef.current) dropLoupe(); /* leaving the photo lifts the glass */
    }

    function onPointerDown(e: PointerEvent): void {
      if (e.pointerType && e.pointerType !== "mouse") return;
      if (e.button !== 0) return;
      const row = (e.target as Element | null)?.closest<HTMLElement>(".row");
      if (!row || reduced) return;
      if (row.classList.contains("unstruck")) return;
      glassPress = { sx: e.pageX, sy: e.pageY, moved: false };
    }

    function onPointerMove(e: PointerEvent): void {
      if (!glassPress) return;
      if (!glassPress.moved) {
        const mx = e.pageX - glassPress.sx;
        const my = e.pageY - glassPress.sy;
        if (mx * mx + my * my > 36) {
          /* past 6px → it's a swing: the glass yields to the hand (the drag
             belongs to useLine — don't fight it) */
          glassPress.moved = true;
          if (itemRef.current) dropLoupe();
        }
      }
    }

    /* a clean TAP drops the glass so useLine's viewer opens clean; a swing
       release (or cancel) leaves the HOVER in charge — pointer still on a
       face → the glass comes back down (a settling swung plate needs the
       next 1px hand move to re-hit-test). */
    function glassUp(ev: PointerEvent): void {
      const wasNav = !!glassPress && !glassPress.moved && ev.type !== "pointercancel";
      glassPress = null;
      if (wasNav) {
        if (itemRef.current) dropLoupe();
      } else if (
        !itemRef.current &&
        lineHoverItem &&
        !reduced &&
        trailEnabled &&
        !lineHoverItem.row.classList.contains("unstruck")
      ) {
        summonLoupe(lineHoverItem);
      }
    }

    indexEl.addEventListener("pointerover", onPointerOver);
    indexEl.addEventListener("pointerout", onPointerOut);
    indexEl.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", glassUp);
    window.addEventListener("pointercancel", glassUp);

    return function cleanup() {
      cancelAnimationFrame(panRaf);
      /* leave the glass/cursor clean on unmount or re-arm */
      if (itemRef.current) {
        itemRef.current = null;
        loupeEl!.classList.remove("on");
        if (cursorEl) cursorEl.classList.remove("is-loupe");
      }
      sepRef.current = null;
      textRef.current = null;
      sepGenRef.current++;
      if (dotsEl) dotsEl.classList.remove("dots-on");
      indexEl.removeEventListener("pointerover", onPointerOver);
      indexEl.removeEventListener("pointerout", onPointerOut);
      indexEl.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", glassUp);
      window.removeEventListener("pointercancel", glassUp);
    };
  }, [reduced, stillMode, trailEnabled, api, mouse]);

  /* ---- re-ink the glass in place if the plates change while it is down ----
     the smooth underlay swaps instantly; the dots hide, re-separate in the
     new accent, and refocus — the glass re-finding focus on the fresh ink. */
  useEffect(() => {
    const it = itemRef.current;
    if (!it) return;
    const loupeEl = document.getElementById("loupe");
    if (loupeEl && engine.plates[it.i]) {
      loupeEl.style.backgroundImage = engine.plates[it.i];
    }
    const dotsEl = document.getElementById("loupe-dots");
    sepRef.current = null;
    const gen = ++sepGenRef.current;
    if (dotsEl) dotsEl.classList.remove("dots-on");
    void ensureSep(it.i, engine.accentI)
      .then((sep) => {
        if (gen !== sepGenRef.current || itemRef.current?.i !== it.i) return;
        sepRef.current = sep;
        dotsT0Ref.current = performance.now();
        if (dotsEl) dotsEl.classList.add("dots-on");
      })
      .catch(() => {});
  }, [engine.plates, engine.accentI]);
}
