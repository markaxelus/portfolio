"use client";

import { useEffect } from "react";
import { useEngine } from "@/app/_engine/engine-context";

/**
 * THE IMPRESSION LINE — "the sheet prints as read" (Direction Nº 003, P1).
 * Ported VERBATIM from prototypes/main.js 2583-2711 (measureStrikes /
 * checkStrikes / strikeUnit / strikeAll / retireLine / colophonPulled +
 * the initStrikes IIFE) plus its resize/fonts.ready/scroll wiring (1617-1637,
 * 1904) and the mess-enter strike (setProof, 1531-1532).
 *
 * Below a fixed hairline at 62vh every unit is blind impression — real type,
 * uninked (`.unstruck`). As a unit's first visible child crosses the line it
 * STRIKES: ink floods (`.striking`), a 1px inline-translate shudder (NOT a
 * keyframe — it composes with entrance transforms), the #regmark ticks 36°.
 * One-way, persisted per unit (`ma-struck-v1`). STRUCK IS THE DEFAULT — this
 * arms `.unstruck` CLIENT-SIDE after mount, so SSR/no-js/print/reduced/?still
 * ship printed (no hydration divergence). Unit tops are cached at
 * load/fonts.ready/resize (`measureStrikes`, §5 perf law); checkStrikes runs on
 * the shared scroll subscription and does pure math vs the cached tops.
 *
 * OWNS engine.api.current.strikeAll / measureStrikes / checkStrikes. When the
 * last unit lands the line retires and the colophon admits the pull
 * (`ma-pulled-n`). reduced/?still ship fully printed — no line, nothing stored.
 */

const IMP_LINE = 0.62; /* keep in sync with .impline { top: 62vh } */
const STRIKE_SEL = [
  ".ticker",
  ".trail",
  ".index-head",
  "#p-01",
  "#p-02",
  "#p-03",
  "#p-04",
  ".desk",
  ".yard",
  ".outro",
];

interface StrikeUnit {
  el: HTMLElement;
  id: string;
  top: number;
  struck: boolean;
  t: number;
}

export function useImpressionLine(): void {
  const engine = useEngine();
  const api = engine.api;
  const subscribeScroll = engine.subscribeScroll;
  const proofOn = engine.proofOn;

  useEffect(() => {
    const implineEl = document.getElementById("impline");
    const regEl = document.querySelector<SVGElement>(".regmark");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = () => mqReduce.matches;
    const stillMode = /[?&]still(\b|=)/.test(window.location.search);
    const q = new URLSearchParams(window.location.search);
    const proofArrival = q.has("proof") || window.location.hash === "#proof";

    const strikeUnits: StrikeUnit[] = [];
    let struckStore: Record<string, number> = {};
    let regTicks = 0;

    // all pending timers, so a StrictMode remount / unmount clears them
    const timers = new Set<number>();
    const after = (fn: () => void, ms: number): number => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
      return id;
    };

    try {
      struckStore = JSON.parse(localStorage.getItem("ma-struck-v1") || "{}") || {};
    } catch {
      struckStore = {};
    }

    function saveStruck() {
      try {
        localStorage.setItem("ma-struck-v1", JSON.stringify(struckStore));
      } catch {}
    }

    function measureStrikes() {
      if (implineEl) implineEl.style.top = Math.round(window.innerHeight * IMP_LINE) + "px";
      strikeUnits.forEach((u) => {
        if (u.struck) return;
        /* anchor on the first visible child, not the padding box — the type
           strikes when the type reaches the line (.trail carries dead padding
           above its first rule) */
        const a = u.el.firstElementChild || u.el;
        let r = a.getBoundingClientRect();
        if (r.width < 2 && r.height < 2) r = u.el.getBoundingClientRect();
        u.top = r.top + window.scrollY;
      });
    }

    function regTick() {
      regTicks++;
      if (regEl) regEl.style.setProperty("rotate", regTicks * 36 + "deg");
    }

    function colophonPulled() {
      const el = document.getElementById("colo-pulled");
      let n = 0;
      try {
        n = +(localStorage.getItem("ma-pulled-n") || 0);
      } catch {}
      if (!el || !n) return;
      el.innerHTML =
        "<br>" +
        (n === 1 ? "PULLED IN ONE VISIT" : "PULLED OVER " + String(n).padStart(3, "0") + " VISITS");
    }

    function retireLine() {
      document.body.classList.remove("imp-armed");
      let firstPull = false;
      try {
        if (!localStorage.getItem("ma-pulled-n")) {
          firstPull = true;
          localStorage.setItem(
            "ma-pulled-n",
            String(Math.max(1, +(localStorage.getItem("ma-visits") || 1))),
          );
        }
      } catch {}
      colophonPulled();
      /* the moment the last unit strikes — once, ever */
      if (firstPull) api.current.logAct?.("the sheet fully pulled. every unit struck.");
    }

    function strikeUnit(u: StrikeUnit, instant?: boolean) {
      if (u.struck) return;
      u.struck = true;
      struckStore[u.id] = 1;
      saveStruck();
      u.el.classList.remove("unstruck");
      if (!instant && !stillMode && !reduced()) {
        /* the flood (transitions ride on .striking) + the shudder — an inline
           translate step: it composes with entrance transforms and can't
           restart a filled animation the way a keyframe would */
        u.el.classList.add("striking");
        u.el.style.setProperty("translate", "0 1px");
        after(() => {
          u.el.style.setProperty("translate", "0 -0.5px");
        }, 90);
        after(() => {
          u.el.style.setProperty("translate", "");
        }, 180);
        clearTimeout(u.t);
        timers.delete(u.t);
        u.t = after(() => {
          u.el.classList.remove("striking");
        }, 500);
        regTick();
      }
      if (!strikeUnits.some((s) => !s.struck)) retireLine();
    }

    function strikeAll(instant?: boolean) {
      if (!strikeUnits) return;
      strikeUnits.forEach((u) => strikeUnit(u, instant));
    }

    function checkStrikes() {
      if (!strikeUnits || !strikeUnits.length) return;
      const lineY = window.scrollY + window.innerHeight * IMP_LINE;
      for (let i = 0; i < strikeUnits.length; i++) {
        if (!strikeUnits[i].struck && strikeUnits[i].top <= lineY) {
          strikeUnit(strikeUnits[i]);
        }
      }
    }

    // handlers kept for cleanup
    const wired: Array<{ el: HTMLElement; click: () => void; focus: () => void }> = [];
    const onBeforePrint = () => strikeAll(true);
    const onReduceChange = () => {
      if (reduced()) strikeAll(true);
    };

    (function initStrikes() {
      /* reduced motion / ?still ship fully printed — no line, nothing stored */
      if (stillMode || reduced()) return;
      STRIKE_SEL.forEach((sel) => {
        const el = document.querySelector<HTMLElement>(sel);
        if (!el || struckStore[sel]) return; /* printed on an earlier visit */
        strikeUnits.push({ el, id: sel, top: 0, struck: false, t: 0 });
        el.classList.add("unstruck");
      });
      if (!strikeUnits.length) return; /* fully printed — the line has retired */
      /* arriving straight in the mess: you can't annotate unprinted paper */
      if (document.body.classList.contains("proof") || proofArrival) {
        strikeAll(true);
        return;
      }
      document.body.classList.add("imp-armed");
      measureStrikes();
      checkStrikes();
      strikeUnits.forEach((u) => {
        /* a deliberate touch prints the sheet where you touched it */
        const click = () => strikeUnit(u);
        const focus = () => strikeUnit(u);
        u.el.addEventListener("click", click, true);
        u.el.addEventListener("focusin", focus);
        wired.push({ el: u.el, click, focus });
      });
      /* pulling a paper proof pulls the whole sheet */
      window.addEventListener("beforeprint", onBeforePrint);
      mqReduce.addEventListener("change", onReduceChange);
    })();
    colophonPulled();

    // OWN the handles (mess-enter + beforeprint + the resize re-measure)
    api.current.strikeAll = strikeAll;
    api.current.measureStrikes = measureStrikes;
    api.current.checkStrikes = checkStrikes;

    // checkStrikes runs on every scroll frame — cached tops vs scrollY, pure
    // math (main.js 1904, inside the existing onScroll rAF). No layout reads.
    const unsub = subscribeScroll(() => checkStrikes());

    // cache tops at fonts.ready + resize (never in a frame loop) — §5 perf law
    let cancelled = false;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (cancelled) return;
        measureStrikes();
        checkStrikes();
      });
    }
    let resizeT = 0;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = window.setTimeout(() => {
        measureStrikes();
        checkStrikes();
      }, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      unsub();
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeT);
      window.removeEventListener("beforeprint", onBeforePrint);
      mqReduce.removeEventListener("change", onReduceChange);
      wired.forEach(({ el, click, focus }) => {
        el.removeEventListener("click", click, true);
        el.removeEventListener("focusin", focus);
      });
      timers.forEach((id) => clearTimeout(id));
      timers.clear();
      // revert the client-side arming so a StrictMode re-mount starts clean
      strikeUnits.forEach((u) => {
        u.el.classList.remove("unstruck", "striking");
        u.el.style.setProperty("translate", "");
      });
      document.body.classList.remove("imp-armed");
      if (regEl) regEl.style.setProperty("rotate", "");
      if (api.current.strikeAll === strikeAll) delete api.current.strikeAll;
      if (api.current.measureStrikes === measureStrikes) delete api.current.measureStrikes;
      if (api.current.checkStrikes === checkStrikes) delete api.current.checkStrikes;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // mess-enter: "you can't annotate unprinted paper" — strike everything and
  // hold the register still (main.js setProof 1531-1532). Idempotent: strikeUnit
  // guards on u.struck and regHardZero no-ops when already zero, so this is
  // safe alongside any future setProof caller.
  useEffect(() => {
    if (!proofOn) return;
    api.current.strikeAll?.(true);
    api.current.regHardZero?.();
  }, [proofOn, api]);
}
