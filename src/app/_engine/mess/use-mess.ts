"use client";

import { useEffect, useRef } from "react";
import { useEngine } from "@/app/_engine/engine-context";
import { mulberry32 } from "@/lib/rng";

/**
 * THE MESS LAYER — the working desk under the proof. Ported VERBATIM from
 * prototypes/main.js: the proof-mode working layer (1390-1561: handLoopD /
 * positionAnchors / watchNotes / cacheInkNotes / setProof branches), the cat
 * (3409-3427), and fresh ink (3429-3465).
 *
 * `body.proof` is toggled by EngineProvider on `engine.proofOn`; this hook adds
 * the CASCADE and the hand-drawn positioning around it:
 *
 *  (1) MESS ENTER/EXIT — on the false→true transition it calls the SETTING's
 *      `disarmSetting` + the strike's `strikeAll(true)` ("you can't annotate
 *      unprinted paper"), builds the notes IntersectionObserver (`.seen` per
 *      viewport; ?still marks all seen), positions the anchors, caches the ink
 *      notes, starts the cat, and logs "the margins read." once a session. On
 *      true→false (or unmount) it tears the observer + wet class down and stops
 *      the cat.
 *  (2) ANCHORED MARKS (positionAnchors) — JS-positions the hand marks off the
 *      LIVE glyph rects: the journaling circle REDRAWN AT GLYPH SIZE around the
 *      giant & (#anchor-amp, box = amp rect ×1.24/×1.06, `d` regenerated via
 *      handLoopD at target size — never a stretched path, that breaks the
 *      pathLength=1 draw-in), the pen underline under "my desk" (#amark-desk,
 *      measured across the #deskw .ch GLYPH RUN + rotated to its measured lean),
 *      the Write-to-me circle (#amark-write), the bio bracket (#anchor-bio).
 *      Re-measured on mount / fonts.ready / resize / hero animationend.
 *  (3) THE CAT — tail-flicks every 6-15s once drawn in, scheduled only while
 *      the mess is on.
 *  (4) FRESH INK — the `.page .note` nearest the cursor darkens (`.wet`); note
 *      positions are cached on mess-enter, a throttled (≤1/90ms) mousemove does
 *      pure math against `engine.mouse`.
 *
 * OWNS `engine.api.current.positionAnchors / cacheInkNotes / clearWet / catLife`
 * (external systems — the SETTING at land, resize, the reveal — call them
 * no-op-safe). All reads happen at mount/resize/fonts/land/mess-enter, NEVER in
 * a frame loop (§5 perf law: measure once, then pure math).
 */
export function useMess(): void {
  const engine = useEngine();
  const api = engine.api;
  const mouse = engine.mouse;

  // mirror the reactive media flags to refs so the mount-once effect's closures
  // (positionAnchors / catLife / watchNotes) read them synchronously, exactly as
  // main.js read `reduced()` / `stillMode` / `body.proof`.
  const reducedRef = useRef(engine.reduced);
  const stillRef = useRef(engine.stillMode);
  const proofRef = useRef(engine.proofOn);
  reducedRef.current = engine.reduced;
  stillRef.current = engine.stillMode;
  proofRef.current = engine.proofOn;

  // the mess enter/exit impl, assigned by the mount-once effect and driven by
  // the proofOn-keyed effect below — kept out of the reactive path so the
  // listeners + api ownership stay stable across a proof toggle.
  const implRef = useRef<{ enter: () => void; exit: () => void } | null>(null);

  /* ---- MAIN: define + own the mess machinery (mount-once, stable deps) ---- */
  useEffect(() => {
    // element refs cached once (server-rendered, stable) — the same set main.js
    // captured at the top of the proof block.
    const heroEl = document.getElementById("hero");
    const ampEl = document.getElementById("amp");
    const bioEl = document.getElementById("hero-bio");
    const anchorAmp = document.getElementById("anchor-amp");
    const anchorBio = document.getElementById("anchor-bio");
    const deskEl = document.getElementById("deskw");
    const amarkDesk = document.getElementById("amark-desk");
    const writeEl = document.getElementById("write-link");
    const amarkWrite = document.getElementById("amark-write");
    const outroEl = document.querySelector<HTMLElement>(".outro");
    const catEl = document.querySelector<HTMLElement>(".cat");

    /* a journaling loop drawn by hand: 1.15 turns of a jittered ellipse,
       smoothed the same way the thought-thread is. seeded — same hand, any
       glyph size. local coords; pathLength=1 on the element keeps the draw-in
       working at every scale. (main.js 1407-1423) */
    function handLoopD(
      cx: number,
      cy: number,
      rx: number,
      ry: number,
      seed: number,
    ): string {
      const rnd = mulberry32(seed);
      const pts: [number, number][] = [];
      const N = 11;
      const steps = Math.floor(N * 1.15);
      const a0 = -Math.PI * 0.62 + (rnd() - 0.5) * 0.3;
      for (let i = 0; i <= steps; i++) {
        const a = a0 + (i / N) * Math.PI * 2;
        pts.push([
          cx + Math.cos(a) * rx * (1 + (rnd() - 0.5) * 0.09),
          cy + Math.sin(a) * ry * (1 + (rnd() - 0.5) * 0.09),
        ]);
      }
      let d = "M" + pts[0][0].toFixed(1) + " " + pts[0][1].toFixed(1);
      for (let j = 1; j < pts.length - 1; j++) {
        d +=
          " Q" +
          pts[j][0].toFixed(1) +
          " " +
          pts[j][1].toFixed(1) +
          " " +
          ((pts[j][0] + pts[j + 1][0]) / 2).toFixed(1) +
          " " +
          ((pts[j][1] + pts[j + 1][1]) / 2).toFixed(1);
      }
      return d;
    }

    /* the hand on the finished page (main.js 1425-1495). NOTE: main.js calls
       measureHeroGate() first; the React split gives ink-pooling its own gate +
       observers, so that line is dropped here. Gated on proofRef (mirrors
       body.proof) so the amp/bio anchors only run in the mess regardless of when
       EngineProvider's class toggle lands relative to this effect. */
    function positionAnchors(): void {
      /* the pen underlines "my desk" (the site's true address). the v3 words are
         display:block, so the element rect spans the whole lockup column —
         measure the GLYPH RUN (.ch spans) instead, and let the underline ride
         the sort's own splay (angle read from the run, not hardcoded). */
      if (amarkDesk && deskEl && heroEl) {
        const hr0 = heroEl.getBoundingClientRect();
        const dchs = deskEl.querySelectorAll(".ch");
        let nr: { left: number; width: number; bottom: number; height: number };
        let lean = 0;
        if (dchs.length > 1) {
          const fr = dchs[0].getBoundingClientRect();
          const lr = dchs[dchs.length - 1].getBoundingClientRect();
          nr = {
            left: fr.left,
            width: lr.right - fr.left,
            bottom: (fr.bottom + lr.bottom) / 2,
            height: Math.max(fr.height, lr.height),
          };
          lean =
            (Math.atan2(
              (lr.top + lr.bottom) / 2 - (fr.top + fr.bottom) / 2,
              (lr.left + lr.right) / 2 - (fr.left + fr.right) / 2,
            ) *
              180) /
            Math.PI;
        } else {
          nr = deskEl.getBoundingClientRect();
        }
        amarkDesk.style.left = nr.left - hr0.left + nr.width * 0.03 + "px";
        amarkDesk.style.top = nr.bottom - hr0.top - nr.height * 0.02 + "px";
        amarkDesk.style.width = nr.width * 0.96 + "px";
        amarkDesk.style.height = Math.max(10, nr.width * 0.055) + "px";
        amarkDesk.style.transformOrigin = "left center";
        amarkDesk.style.transform = "rotate(" + lean.toFixed(2) + "deg)";
      }
      if (amarkWrite && writeEl && outroEl) {
        const or = outroEl.getBoundingClientRect();
        const wr = writeEl.getBoundingClientRect();
        amarkWrite.style.left = wr.left - or.left - wr.width * 0.07 + "px";
        amarkWrite.style.top = wr.top - or.top - wr.height * 0.1 + "px";
        amarkWrite.style.width = wr.width * 1.14 + "px";
        amarkWrite.style.height = wr.height * 1.28 + "px";
      }
      if (!proofRef.current) return;
      if (!heroEl) return; // narrowing for the amp/bio closure below
      const hr = heroEl.getBoundingClientRect();
      if (anchorAmp && ampEl) {
        /* the v3 amp is a monument (up to ~36rem) — the journaling circle is
           REDRAWN AT GLYPH SIZE, not a stretched 180px oval (a scaled path +
           non-scaling-stroke breaks the pathLength dash draw-in in chromium).
           hand wobble is seeded, so the loop is the same hand every load. */
        const ar = ampEl.getBoundingClientRect();
        const aw = ar.width * 1.24;
        const ah = ar.height * 1.08;
        const cx = ar.left + ar.width / 2 - hr.left;
        const cy = ar.top + ar.height / 2 - hr.top;
        anchorAmp.style.width = aw + "px";
        anchorAmp.style.height = ah + "px";
        anchorAmp.style.left = Math.max(4, cx - aw / 2) + "px";
        anchorAmp.style.top = Math.max(4, cy - ah / 2 - ar.height * 0.02) + "px";
        const svg = anchorAmp.querySelector("svg");
        if (svg) {
          svg.setAttribute(
            "viewBox",
            "0 0 " + Math.round(aw) + " " + Math.round(ah),
          );
          const paths = svg.querySelectorAll("path");
          const mainD = handLoopD(aw / 2, ah / 2, aw * 0.46, ah * 0.44, 11);
          const echoD = handLoopD(
            aw / 2 + aw * 0.012,
            ah / 2 + ah * 0.02,
            aw * 0.44,
            ah * 0.415,
            23,
          );
          if (paths[0]) paths[0].setAttribute("d", mainD);
          if (paths[1]) paths[1].setAttribute("d", echoD);
        }
      }
      if (anchorBio && bioEl) {
        const br = bioEl.getBoundingClientRect();
        anchorBio.style.left = br.left - hr.left - 34 + "px";
        anchorBio.style.top = br.top - hr.top - 6 + "px";
        anchorBio.style.height = br.height + 12 + "px";
        anchorBio.style.width = "34px";
      }
    }

    /* notes draw themselves in only when they scroll into view (main.js
       1497-1522). ?still marks everything seen (no observer). */
    let messObserver: IntersectionObserver | null = null;
    function watchNotes(): void {
      const els = Array.prototype.slice.call(
        document.querySelectorAll(".note, .anchor, .chip-ring, .amark"),
      ) as Element[];
      if (stillRef.current) {
        els.forEach((el) => el.classList.add("seen"));
        return;
      }
      messObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("seen");
              messObserver?.unobserve(en.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      const obs = messObserver; // non-null capture for the forEach closure
      els.forEach((el) => obs.observe(el));
    }
    function unwatchNotes(): void {
      if (messObserver) {
        messObserver.disconnect();
        messObserver = null;
      }
      Array.prototype.slice
        .call(document.querySelectorAll(".seen"))
        .forEach((el) => {
          (el as Element).classList.remove("seen");
        });
    }

    /* fresh ink: the scrawl nearest the cursor darkens a breath, like wet ink
       under the lamp. note positions cached on mess-entry (event-driven read);
       mousemove does pure math. (main.js 3433-3465) */
    let inkNotes: { el: HTMLElement; x: number; y: number }[] = [];
    let wetEl: HTMLElement | null = null;
    let wetLast = 0;
    function cacheInkNotes(): void {
      inkNotes = [];
      Array.prototype.slice
        .call(document.querySelectorAll(".page .note"))
        .forEach((el) => {
          const node = el as HTMLElement;
          const r = node.getBoundingClientRect();
          if (r.width < 3) return;
          inkNotes.push({
            el: node,
            x: r.left + r.width / 2,
            y: r.top + window.scrollY + r.height / 2,
          });
        });
    }
    function clearWet(): void {
      if (wetEl) {
        wetEl.classList.remove("wet");
        wetEl = null;
      }
      inkNotes = [];
    }
    /* event-driven + throttled, exactly like main.js; the pointer comes from
       the engine's single feed (engine.mouse). document coords: the page never
       scrolls horizontally, so x is the viewport x. */
    function onInkMove(): void {
      if (!inkNotes.length) return;
      const now = performance.now();
      if (now - wetLast < 90) return;
      wetLast = now;
      const px = mouse.current.x;
      const py = mouse.current.y + window.scrollY;
      let best: HTMLElement | null = null;
      let bd = 170 * 170;
      for (let i = 0; i < inkNotes.length; i++) {
        const n = inkNotes[i];
        const dx = n.x - px;
        const dy = n.y - py;
        const d = dx * dx + dy * dy;
        if (d < bd) {
          bd = d;
          best = n.el;
        }
      }
      if (best !== wetEl) {
        if (wetEl) wetEl.classList.remove("wet");
        wetEl = best;
        if (wetEl) wetEl.classList.add("wet");
      }
    }
    document.addEventListener("mousemove", onInkMove);

    /* the cat, alive at last (main.js 3409-3427). tail-flicks every 6-15s once
       she's been drawn in, scheduled only while the mess is on. */
    let catT: ReturnType<typeof setTimeout> | null = null;
    function catLife(on: boolean): void {
      if (catT) {
        clearTimeout(catT);
        catT = null;
      }
      if (!on || !catEl || reducedRef.current || stillRef.current) return;
      const el = catEl; // non-null capture
      const nap = (): void => {
        catT = setTimeout(
          () => {
            /* only once she's been drawn in */
            if (el.classList.contains("seen")) el.classList.add("flick");
            nap();
          },
          6000 + Math.random() * 9000,
        );
      };
      nap();
    }
    function onCatAnim(e: AnimationEvent): void {
      if (e.animationName === "tail-flick") catEl?.classList.remove("flick");
    }
    if (catEl) catEl.addEventListener("animationend", onCatAnim);

    /* own the cross-subsystem handles (external callers no-op-safe until here) */
    api.current.positionAnchors = positionAnchors;
    api.current.cacheInkNotes = cacheInkNotes;
    api.current.clearWet = clearWet;
    api.current.catLife = catLife;

    /* the setProof(on) cascade, split into enter/exit (main.js 1525-1554) */
    function messEnter(): void {
      /* the reveal lets go so .final can dim, then everything strikes — you
         can't annotate unprinted paper */
      api.current.disarmSetting?.();
      api.current.strikeAll?.(true);
      positionAnchors();
      if (!messObserver) watchNotes();
      cacheInkNotes(); /* fresh ink needs to know where the notes live */
      /* the log notices, once a session — reading the margins is an act */
      try {
        if (!sessionStorage.getItem("ma-log-mess")) {
          sessionStorage.setItem("ma-log-mess", "1");
          api.current.logAct?.("the margins read.");
        }
      } catch {}
      catLife(true);
    }
    function messExit(): void {
      unwatchNotes();
      clearWet();
      catLife(false);
    }
    implRef.current = { enter: messEnter, exit: messExit };

    /* boot + re-measure triggers: mount, fonts.ready, resize (150ms debounce,
       matching main.js), and the hero's own landing (aim the marks at the
       RESTED type, not a mid-flight rect). */
    positionAnchors();
    let fontsLive = true;
    if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (fontsLive) positionAnchors();
      });
    }
    let resizeT: ReturnType<typeof setTimeout> | undefined;
    function onResize(): void {
      clearTimeout(resizeT);
      resizeT = setTimeout(() => positionAnchors(), 150);
    }
    window.addEventListener("resize", onResize);
    /* animationend bubbles (a child .ch rattle would fire it) — only the word's
       own entrance counts (main.js 1660). */
    const lastSet = document.querySelector<HTMLElement>(
      ".hero-title.v3 .v3-desk",
    );
    function onLand(e: AnimationEvent): void {
      if (e.target !== lastSet) return;
      positionAnchors();
    }
    if (lastSet) lastSet.addEventListener("animationend", onLand);

    return () => {
      fontsLive = false;
      clearTimeout(resizeT);
      window.removeEventListener("resize", onResize);
      if (lastSet) lastSet.removeEventListener("animationend", onLand);
      document.removeEventListener("mousemove", onInkMove);
      if (catEl) catEl.removeEventListener("animationend", onCatAnim);
      if (catT) {
        clearTimeout(catT);
        catT = null;
      }
      if (messObserver) {
        messObserver.disconnect();
        messObserver = null;
      }
      implRef.current = null;
      if (api.current.positionAnchors === positionAnchors)
        delete api.current.positionAnchors;
      if (api.current.cacheInkNotes === cacheInkNotes)
        delete api.current.cacheInkNotes;
      if (api.current.clearWet === clearWet) delete api.current.clearWet;
      if (api.current.catLife === catLife) delete api.current.catLife;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, mouse]);

  /* ---- ENTER: mess-enter on proofOn true; mess-exit on cleanup (false /
     unmount). Only re-runs when proofOn flips, so setup === the false→true
     transition and cleanup === the true→false transition. ---- */
  useEffect(() => {
    if (!engine.proofOn) return;
    implRef.current?.enter();
    return () => {
      implRef.current?.exit();
    };
  }, [engine.proofOn]);
}
