"use client";

import { useEffect, type RefObject } from "react";

/**
 * "Who left this one, and when" — ported VERBATIM from prototypes/main.js
 * (3377–3408). A delegated pointerover/out on #pile shows the fixed #stone-tip
 * over the hovered stone: the house foundation reads "THE HOUSE STACK · MINE";
 * a visitor stone reads "Nº 023 — 3 DAYS AGO" (+ " · SIGNAL STONE" on the 9ths).
 *
 * The single getBoundingClientRect read lives in the pointerover handler (an
 * event, not a rAF/mousemove loop) — the perf rule holds. Delegation on #pile
 * (the container, not its children) survives renderCairn rebuilding the stones.
 */

export function useStoneTip(pileRef: RefObject<SVGGElement | null>): void {
  useEffect(() => {
    const pileEl = pileRef.current;
    const tipEl = document.getElementById("stone-tip");
    if (!pileEl || !tipEl) return;

    function stoneAge(t: number): string {
      const d = Date.now() - t;
      if (d < 60000) return "JUST NOW";
      const m = Math.round(d / 60000);
      if (m < 60) return m + " MIN AGO";
      const h = Math.round(d / 3600000);
      if (h < 24) return h + (h === 1 ? " HOUR AGO" : " HOURS AGO");
      const days = Math.round(d / 86400000);
      return days === 1 ? "YESTERDAY" : days + " DAYS AGO";
    }

    const onOver = (e: PointerEvent) => {
      const p = e.target as SVGElement | null;
      if (!p || p.tagName !== "path") return;
      if (p.classList.contains("house")) {
        tipEl.textContent = "THE HOUSE STACK · MINE";
      } else if (p.classList.contains("passer")) {
        tipEl.textContent = "PASSED THROUGH · LEFT NO NOTE";
      } else if (p.dataset.n) {
        let label = "Nº " + String(p.dataset.n).padStart(3, "0");
        if (p.dataset.t) label += " · " + stoneAge(+p.dataset.t);
        if (p.classList.contains("signal")) label += " · SIGNAL STONE";
        tipEl.textContent = label;
      } else return;
      const r = p.getBoundingClientRect();
      tipEl.style.left = r.left + r.width / 2 + "px";
      tipEl.style.top = r.top + "px";
      tipEl.classList.add("on");
    };
    const onOut = (e: PointerEvent) => {
      if ((e.target as SVGElement | null)?.tagName === "path")
        tipEl.classList.remove("on");
    };

    pileEl.addEventListener("pointerover", onOver);
    pileEl.addEventListener("pointerout", onOut);

    return () => {
      pileEl.removeEventListener("pointerover", onOver);
      pileEl.removeEventListener("pointerout", onOut);
      tipEl.classList.remove("on");
    };
  }, [pileRef]);
}
