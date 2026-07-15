"use client";

import { useEffect } from "react";

/**
 * The visit odometer (main.js 1812–1866), rewired to the REAL data:
 * `#visit-n` shows the global Upstash Redis count (`/api/visits`), rolling up
 * one as you arrive — you're the visit that ticked it. The per-visitor "knows
 * you" note (`#knows-note`) stays on localStorage (personal return-state Redis
 * can't track per user). Widened past the original 3-digit clamp for the real
 * (4-digit+) count.
 *
 * The colophon also admits the count (`#colo-pulled`, the ironic wink under
 * "NO TRACKERS"): the same global `total` prints on its own line beneath the
 * colophon as "PULLED OVER N,NNN VISITS" — the real edition size across both
 * versions of the site. (In the prototype this hung off the impression line's
 * retire; that system was removed, so it rides the visit fetch now.)
 */

// module-scope so the personal increment happens once per real load, not twice
// under React StrictMode's dev double-mount.
let personalCounted = false;

function odoDigits(n: number, width: number): string[] {
  return String(Math.max(0, n)).padStart(width, "0").split("");
}

function buildOdo(el: HTMLElement, n: number, width: number): HTMLElement[] {
  el.textContent = "";
  return odoDigits(n, width).map((d, i) => {
    const wrap = document.createElement("span");
    wrap.className = "odo";
    const reel = document.createElement("span");
    reel.className = "odo-reel";
    for (let k = 0; k <= 9; k++) {
      const s = document.createElement("span");
      s.textContent = String(k);
      reel.appendChild(s);
    }
    reel.style.transform = "translateY(-" + d + "em)";
    reel.style.transitionDelay = i * 0.09 + "s";
    wrap.appendChild(reel);
    el.appendChild(wrap);
    return reel;
  });
}

function rollOdo(reels: HTMLElement[], n: number, width: number): void {
  odoDigits(n, width).forEach((d, i) => {
    if (reels[i]) reels[i].style.transform = "translateY(-" + d + "em)";
  });
}

// the colophon admits the count under "NO TRACKERS" — the same global total,
// on its own line beneath "1 CAT" (built with a <br> + text node, no innerHTML)
function fillColophon(total: number): void {
  const el = document.getElementById("colo-pulled");
  if (!el) return;
  el.textContent = "";
  el.appendChild(document.createElement("br"));
  el.appendChild(
    document.createTextNode(
      total <= 1
        ? "PULLED IN ONE VISIT"
        : "PULLED OVER " + total.toLocaleString() + " VISITS",
    ),
  );
}

export default function VisitCounter() {
  useEffect(() => {
    // personal return-state → the "knows you" note (once per real load)
    let visits = 1;
    if (!personalCounted) {
      personalCounted = true;
      try {
        const prev = +(localStorage.getItem("ma-visits") || 0);
        visits = prev + 1;
        localStorage.setItem("ma-visits", String(visits));
      } catch {}
      const knowsEl = document.getElementById("knows-note");
      if (knowsEl) {
        knowsEl.textContent =
          visits <= 1
            ? "first time here. look around."
            : visits < 5
              ? "back again. the kerning still isn’t fixed."
              : "you again. leave a stone if you haven’t.";
      }
    } else {
      try {
        visits = +(localStorage.getItem("ma-visits") || 1);
      } catch {}
    }

    const visitEl = document.getElementById("visit-n");
    if (!visitEl) return;

    const staticMode =
      /[?&]still(\b|=)/.test(window.location.search) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    // the odometer reads the GLOBAL count from Redis (/api/visits)
    fetch("/api/visits")
      .then((r) => r.json())
      .then((data: { total?: number }) => {
        if (cancelled) return;
        const total = Math.max(1, Number(data?.total) || visits);
        const width = Math.max(3, String(total).length);
        // the colophon admits the same real count under "NO TRACKERS"
        fillColophon(total);
        if (staticMode) {
          buildOdo(visitEl, total, width);
        } else {
          // arrive on total-1 and tick up to total
          const reels = buildOdo(visitEl, Math.max(0, total - 1), width);
          timer = setTimeout(() => {
            if (cancelled) return;
            document.body.classList.add("odo-live");
            requestAnimationFrame(() => rollOdo(reels, total, width));
          }, 1500);
        }
      })
      .catch(() => {
        // Redis unreachable — fall back to the personal count so it still shows
        if (cancelled) return;
        if (visitEl) buildOdo(visitEl, visits, 3);
        fillColophon(visits);
      });

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  return null;
}
