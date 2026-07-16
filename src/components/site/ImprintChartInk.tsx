"use client";

import { useEffect } from "react";

/**
 * THE CHART INKS ITSELF IN (strike = ink). SSR ships the chart fully drawn
 * (printed is the default — no-js/print/reduced/?still get the finished
 * plate); this effect ARMS the draw-in client-side (.ink-armed strips the
 * strokes) and strikes it (.inked) when the chart enters the viewport, so
 * the engraving is pulled stroke-by-stroke exactly once, in front of you.
 */
export default function ImprintChartInk() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const still = /[?&]still(\b|=)/.test(window.location.search);
    if (reduced || still) return;
    const chart = document.querySelector<HTMLElement>(".imprint .imp-chart");
    if (!chart) return;

    chart.classList.add("ink-armed");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            chart.classList.add("inked");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -18% 0px" },
    );
    io.observe(chart);

    /* a print mid-arm must ship the finished plate */
    const onPrint = () => chart.classList.add("inked");
    window.addEventListener("beforeprint", onPrint);

    return () => {
      io.disconnect();
      window.removeEventListener("beforeprint", onPrint);
      chart.classList.remove("ink-armed", "inked");
    };
  }, []);
  return null;
}
