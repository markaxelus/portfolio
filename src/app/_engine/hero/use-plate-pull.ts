"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import { clamp } from "@/lib/math";
import type { EngineCtx } from "../engine-context";
import type { HeroFlags } from "./chars";

/**
 * THE PLATE PULL (signature Nº4) — shift-drag the headline. Ported VERBATIM
 * from prototypes/main.js 3528-3579. The red (`--pencil`) and blue (`--accent`)
 * passes come off register and follow the hand with resistance (softPull:
 * clamp(sign·|v|^0.72·2.2, ±110)), written as an inline text-shadow; release
 * and they thunk back (`.plates-return`), then the inline styles clear after
 * 600ms. Shift is the discriminator vs the loose-type grab. Because the
 * pointerdown preventDefault()s, it feeds engine.mouse.current from its own
 * pointermove (the compat-mousemove rule — else the cursor dot freezes).
 */
export function usePlatePull(
  titleRef: RefObject<HTMLHeadingElement | null>,
  flags: HeroFlags,
  engine: EngineCtx,
): void {
  const mouse = engine.mouse;
  const api = engine.api;

  useEffect(() => {
    const heroTitleEl = titleRef.current;
    if (!heroTitleEl) return;

    const cursorEl = document.getElementById("cursor");
    const cursorLabel = cursorEl
      ? cursorEl.querySelector<HTMLElement>(".cursor-label")
      : null;

    let pullState: { x: number; y: number } | null = null;
    let lastPullShadow = "";
    let returnTimer = 0;

    function softPull(v: number) {
      return clamp(Math.sign(v) * Math.pow(Math.abs(v), 0.72) * 2.2, -110, 110);
    }
    function overCh(t: EventTarget | null): boolean {
      const el = t as HTMLElement | null;
      return !!(el && el.classList && el.classList.contains("ch"));
    }
    const logAct = (line: string) => api.current.logAct?.(line);

    const onPointerDown = (e: PointerEvent) => {
      if (!e.shiftKey || !flags.trail.current || flags.reduced.current) return;
      if (flags.proof.current) return;
      e.preventDefault();
      pullState = { x: e.clientX, y: e.clientY };
      heroTitleEl.classList.remove("plates-return");
      if (cursorEl) cursorEl.classList.add("is-grab");
      if (cursorLabel) cursorLabel.textContent = "OFF REGISTER";
    };
    heroTitleEl.addEventListener("pointerdown", onPointerDown);

    const onPointerMove = (e: PointerEvent) => {
      if (!pullState) return;
      // same compat-mousemove suppression as the loose-type drag: keep the
      // dot's feed alive while the plates are held off register
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      const rx = softPull(e.clientX - pullState.x);
      const ry = softPull(e.clientY - pullState.y);
      const shadow =
        Math.round(rx * 0.75) +
        "px " +
        Math.round(ry * 0.75) +
        "px 0 var(--pencil), " +
        Math.round(rx * -0.55) +
        "px " +
        Math.round(ry * -0.55) +
        "px 0 var(--accent)";
      if (shadow !== lastPullShadow) {
        lastPullShadow = shadow;
        heroTitleEl.style.textShadow = shadow;
      }
    };
    document.addEventListener("pointermove", onPointerMove);

    const onPointerUp = (e: PointerEvent) => {
      if (!pullState) return;
      pullState = null;
      heroTitleEl.classList.add("plates-return");
      heroTitleEl.style.textShadow = "0 0 0 var(--pencil), 0 0 0 var(--accent)";
      // is-grab came from the pull, not a letter hover — clear it unless the
      // release actually lands on a letter
      if (overCh(e.target)) {
        if (cursorLabel) cursorLabel.textContent = "GRAB";
      } else if (cursorEl) {
        cursorEl.classList.remove("is-grab");
      }
      // only a real pull makes the book (a shift-click without drag doesn't)
      if (lastPullShadow) logAct("headline pulled off register. returned crooked.");
      returnTimer = window.setTimeout(() => {
        heroTitleEl.classList.remove("plates-return");
        heroTitleEl.style.textShadow = "";
        lastPullShadow = "";
      }, 600);
    };
    document.addEventListener("pointerup", onPointerUp);

    return () => {
      heroTitleEl.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
      clearTimeout(returnTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}