"use client";

import { useEffect } from "react";

/**
 * THE REGMARK IS ALSO A FIDGET — ported VERBATIM from prototypes/main.js
 * 2571-2582. Clicking the registration mark spins it two fast turns
 * (`.fidget`, the `reg-fidget` keyframe) that ease back into its slow 90s
 * drift; a mid-spin click restarts the spin (the getBoundingClientRect reflow
 * flush). Reduced motion sits it still. The animationend guard is scoped to
 * `reg-fidget`, so it never fights the awake scheduler's `reg-hiccup`
 * (use-page-awake owns that one on the same element).
 */
export function useRegmarkFidget(): void {
  useEffect(() => {
    const regEl = document.querySelector<SVGElement>(".regmark");
    if (!regEl) return;
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = () => {
      if (mqReduce.matches) return;
      regEl.classList.remove("fidget");
      void regEl.getBoundingClientRect(); /* restart mid-spin spins again */
      regEl.classList.add("fidget");
    };
    const onAnimEnd = (e: AnimationEvent) => {
      if (e.animationName === "reg-fidget") regEl.classList.remove("fidget");
    };
    regEl.addEventListener("click", onClick);
    regEl.addEventListener("animationend", onAnimEnd as EventListener);

    return () => {
      regEl.removeEventListener("click", onClick);
      regEl.removeEventListener("animationend", onAnimEnd as EventListener);
      regEl.classList.remove("fidget");
    };
  }, []);
}
