"use client";

import { useEffect } from "react";
import { useEngine } from "@/app/_engine/engine-context";

/**
 * IDLE WHISPER — two minutes of nothing → #idle-line fades in (bottom-center).
 * Ported VERBATIM from prototypes/main.js (3357-3376). Any of pointermove /
 * pointerdown / keydown / scroll / touchstart re-arms the timer, but a mousemove
 * STORM re-arms at most once a second (unless the line is already showing, in
 * which case every poke clears + re-arms it). Disabled under ?still exactly like
 * the source. IDLE_MS = 120000.
 */
export function useIdleWhisper(): void {
  const { stillMode } = useEngine();

  useEffect(() => {
    if (stillMode) return;
    const idleEl = document.getElementById("idle-line");
    if (!idleEl) return;

    const IDLE_MS = 120000;
    let idleT: ReturnType<typeof setTimeout> | null = null;
    let idleLast = 0;

    const idlePoke = () => {
      const now = performance.now();
      // mousemove storms re-arm at most once a second
      if (now - idleLast < 1000 && !idleEl.classList.contains("on")) return;
      idleLast = now;
      idleEl.classList.remove("on");
      if (idleT) clearTimeout(idleT);
      idleT = setTimeout(() => {
        idleEl.classList.add("on");
      }, IDLE_MS);
    };

    const events = [
      "pointermove",
      "pointerdown",
      "keydown",
      "scroll",
      "touchstart",
    ] as const;
    events.forEach((ev) =>
      window.addEventListener(ev, idlePoke, { passive: true }),
    );
    idlePoke();

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, idlePoke));
      if (idleT) clearTimeout(idleT);
      idleEl.classList.remove("on");
    };
  }, [stillMode]);
}
