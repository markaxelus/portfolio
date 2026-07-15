"use client";

import { useEffect } from "react";
import { clamp } from "@/lib/math";
import { useEngine } from "@/app/_engine/engine-context";

/**
 * HOLD REGISTER — "the sheet is only true when you are still" (Direction Nº 003,
 * P2). Ported VERBATIM from prototypes/main.js 2962-3061 (regEls / regEnabled /
 * regHeroBusy / regWrite / regSettle / regHardZero / regFrame / regKick + the
 * plates-decal demo) plus its scroll wiring (regFrame in onScroll, 1906).
 *
 * One global registration-error scalar, written on the shared scroll
 * subscription (no new loop). Scroll velocity shears the ink passes of the
 * DISPLAY type only — the hero headline, the outro title, the 144pt specimen
 * amp, the row titles (`.regel`, never body text) — 1-3px via the press-check's
 * text-shadow pass language, quantized to quarter-px so identical frames write
 * nothing. ~300ms of stillness thunks everything home; the #regmark crosshair
 * drifts by exactly the current error (`translate`, composes with reg-spin).
 *
 * OWNS engine.api.current.regKick(px) (a hard loose-type landing + the plates
 * decal demo call it) + regHardZero. reduced / ?still / the mess / the viewer /
 * press-check all pin the error at zero (regEnabled). regFrame self-heals to
 * zero the instant any of those turn on.
 */

export function useHoldRegister(): void {
  const engine = useEngine();
  const api = engine.api;
  const subscribeScroll = engine.subscribeScroll;

  useEffect(() => {
    const heroTitleEl = document.getElementById("hero-title");
    const regEl = document.querySelector<SVGElement>(".regmark");
    if (!heroTitleEl || !regEl) return;
    // capture non-null consts — nested-closure narrowing of the nullable
    // locals doesn't survive, so the closures read these instead
    const heroTitle: HTMLElement = heroTitleEl;
    const reg: SVGElement = regEl;

    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqFine = window.matchMedia("(pointer: fine)");
    const reduced = () => mqReduce.matches;
    const trail = () => mqFine.matches && !reduced();
    const stillMode = /[?&]still(\b|=)/.test(window.location.search);

    const regEls: HTMLElement[] = [
      heroTitle,
      document.querySelector<HTMLElement>(".outro-title"),
      document.querySelector<HTMLElement>(".spec-amp.s5"),
      ...Array.from(document.querySelectorAll<HTMLElement>(".row")).map((r) =>
        r.querySelector<HTMLElement>(".row-title"),
      ),
    ].filter((el): el is HTMLElement => !!el);
    regEls.forEach((el) => el.classList.add("regel"));

    let regCur = 0;
    let regPrevY = -1;
    let regSettleT = 0;
    let regSettleInner = 0;
    let regLastShadow = "";
    // main.js reads the plate-pull's shared `pullState`; the ported pull keeps
    // it private, so we mirror the same gesture (below) into this flag
    let heroPulling = false;

    function regEnabled() {
      return (
        !reduced() &&
        !stillMode &&
        !document.body.classList.contains("proof") &&
        !document.body.classList.contains("pv-open") &&
        !document.body.classList.contains("press-check")
      );
    }
    function regHeroBusy() {
      /* the manual extreme owns the headline while it's in hand */
      return heroPulling || heroTitle.classList.contains("plates-return");
    }
    function regWrite(px: number) {
      const q = Math.round(px * 4) / 4; /* quarter-px steps — no style churn */
      const shadow =
        q === 0
          ? "0 0 0 var(--pencil), 0 0 0 var(--accent)"
          : "0 " +
            (q * 0.75).toFixed(2) +
            "px 0 var(--pencil), 0 " +
            (-q * 0.55).toFixed(2) +
            "px 0 var(--accent)";
      if (shadow === regLastShadow) return;
      regLastShadow = shadow;
      for (let i = 0; i < regEls.length; i++) {
        if (regEls[i] === heroTitle && regHeroBusy()) continue;
        regEls[i].style.textShadow = shadow;
      }
      reg.style.setProperty(
        "translate",
        q === 0 ? "0px 0px" : (q * 0.5).toFixed(2) + "px " + (q * 0.9).toFixed(2) + "px",
      );
    }
    function regSettle() {
      document.body.classList.add("reg-settling");
      regCur = 0;
      regWrite(0);
      regSettleInner = window.setTimeout(() => {
        document.body.classList.remove("reg-settling");
        for (let i = 0; i < regEls.length; i++) {
          if (regEls[i] === heroTitle && regHeroBusy()) continue;
          regEls[i].style.textShadow = "";
        }
        reg.style.setProperty("translate", "");
        regLastShadow = "";
      }, 430);
    }
    function regHardZero() {
      clearTimeout(regSettleT);
      regCur = 0;
      regLastShadow = "";
      regEls.forEach((el) => {
        if (el === heroTitle && regHeroBusy()) return;
        el.style.textShadow = "";
      });
      reg.style.setProperty("translate", "");
    }
    function regFrame() {
      if (regPrevY < 0) {
        regPrevY = window.scrollY;
        return;
      }
      const dy = window.scrollY - regPrevY;
      regPrevY = window.scrollY;
      if (!regEnabled()) {
        if (regCur) regHardZero();
        return;
      }
      const target = clamp(dy * 0.05, -3, 3);
      regCur += (target - regCur) * 0.5;
      if (Math.abs(regCur) < 0.05) regCur = 0;
      regWrite(regCur);
      clearTimeout(regSettleT);
      regSettleT = window.setTimeout(regSettle, 300);
    }
    function regKick(px: number) {
      if (!regEnabled()) return;
      regCur = clamp(px, -3, 3);
      regWrite(regCur);
      clearTimeout(regSettleT);
      regSettleT = window.setTimeout(regSettle, 300);
    }

    // mirror the plate-pull's own gate (main.js pullState) so regHeroBusy
    // knows exactly when the manual extreme owns the headline — the ported
    // pull uses the same guard (shift + fine-pointer + !reduced + !proof).
    const onHeroDown = (e: PointerEvent) => {
      if (!e.shiftKey || !trail() || reduced()) return;
      if (document.body.classList.contains("proof")) return;
      heroPulling = true;
    };
    const onDocUp = () => {
      heroPulling = false;
    };
    heroTitle.addEventListener("pointerdown", onHeroDown);
    document.addEventListener("pointerup", onDocUp);

    /* the decal runs one demo pull: the sheet lurches off register and thunks
       back — the gesture, taught by the gesture (main.js 3058-3061) */
    const platesDecal = document.getElementById("plates-decal");
    const onDecal = () => regKick(2.6);
    if (platesDecal) platesDecal.addEventListener("click", onDecal);

    // OWN the handles (loose-type land + the plates decal call regKick)
    api.current.regKick = regKick;
    api.current.regHardZero = regHardZero;

    // regFrame runs on every scroll frame (main.js 1906, inside the onScroll
    // rAF). It reads scrollY only — no layout reads.
    const unsub = subscribeScroll(() => regFrame());

    return () => {
      unsub();
      heroTitle.removeEventListener("pointerdown", onHeroDown);
      document.removeEventListener("pointerup", onDocUp);
      if (platesDecal) platesDecal.removeEventListener("click", onDecal);
      clearTimeout(regSettleT);
      clearTimeout(regSettleInner);
      document.body.classList.remove("reg-settling");
      regEls.forEach((el) => {
        el.classList.remove("regel");
        el.style.textShadow = "";
      });
      reg.style.setProperty("translate", "");
      if (api.current.regKick === regKick) delete api.current.regKick;
      if (api.current.regHardZero === regHardZero) delete api.current.regHardZero;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
