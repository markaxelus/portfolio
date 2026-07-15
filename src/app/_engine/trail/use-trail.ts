"use client";

import { useEffect, type RefObject } from "react";
import { SVG_NS, stonePath } from "@/lib/rng";
import { useEngine } from "@/app/_engine/engine-context";

/**
 * The trail terrain (FIG.1) — ported VERBATIM from prototypes/main.js
 * (1673–1729). Two moves, one mount effect:
 *
 *  1. Fill the six `.terrain-stones .mile-stone` svgs with seeded
 *     `stonePath(30, 24, 22, 9, 201 + i*17)` blobs (each stone sits at the
 *     bottom of its 60×34 box so the measured line meets its base cleanly).
 *  2. `buildTerrain()` — the ground is MEASURED, not drawn: one quadratic
 *     line through the actual stone bases (so it follows their sizes + lifts),
 *     hairline ticks up to the legend, all into `#terrain-ground`.
 *
 * buildTerrain reads layout ONCE — at mount, on the ResizeObserver, on
 * `document.fonts.ready`, and whenever the SETTING system re-calls it at
 * stone-seat time (via `engine.api.current.buildTerrain`). NEVER in a frame
 * loop (§5 perf law). Mobile hides the measured ground — the source gates on
 * `getComputedStyle(svg).display === "none"` (styles.css sets it at the
 * breakpoint) and bails, leaving the CSS hairline under the stones.
 */
export function useTrail(rootRef: RefObject<HTMLElement | null>): void {
  const engine = useEngine();
  const api = engine.api;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;

    /* each stone sits at the bottom of its 60×34 box (base ≈ y33) so the
       ground line — drawn through the measured bases — meets it cleanly.
       clear first so a StrictMode double-invoke can't stack two paths. */
    const stoneSvgs = Array.prototype.slice.call(
      root.querySelectorAll(".terrain-stones .mile-stone"),
    ) as SVGSVGElement[];
    stoneSvgs.forEach((svg, i) => {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      const p = document.createElementNS(SVG_NS, "path");
      p.setAttribute("d", stonePath(30, 24, 22, 9, 201 + i * 17));
      svg.appendChild(p);
    });

    /* the ground is measured, not drawn: one line through the actual stone
       bases (so it follows their sizes + lifts), with hairline drops to the
       legend. re-run on load / fonts.ready / resize, never in a frame loop. */
    function buildTerrain() {
      if (!root) return; // narrowing doesn't survive into this nested closure
      const terrain = root.querySelector<HTMLElement>("#terrain");
      const svg = root.querySelector<SVGSVGElement>("#terrain-ground");
      if (!terrain || !svg) return;
      const slots = Array.prototype.slice.call(
        terrain.querySelectorAll(".stone-slot"),
      ) as HTMLElement[];
      const labelsEl = terrain.querySelector<HTMLElement>(".terrain-labels");
      const tr = terrain.getBoundingClientRect();
      const W = tr.width,
        H = tr.height;
      if (W < 40 || !slots.length) return;
      /* hidden at this breakpoint (mobile drops the measured ground) */
      if (getComputedStyle(svg).display === "none") return;
      svg.setAttribute("viewBox", "0 0 " + W + " " + H);
      const anchors = slots.map((slot) => {
        const gap = slot.classList.contains("stone-gap");
        const el = gap ? slot : slot.querySelector(".mile-stone")!;
        const r = el.getBoundingClientRect();
        return {
          x: r.left - tr.left + r.width / 2,
          y: gap ? r.bottom - tr.top - 10 : r.bottom - tr.top - 2,
          gap,
        };
      });
      const pts = [{ x: 2, y: anchors[0].y + 5 }];
      anchors.forEach((a) => {
        pts.push({ x: a.x, y: a.y });
      });
      pts.push({ x: W - 2, y: anchors[anchors.length - 1].y + 5 });
      let d = "M" + pts[0].x.toFixed(1) + " " + pts[0].y.toFixed(1);
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i],
          b = pts[i + 1];
        const mx = (a.x + b.x) / 2,
          my = Math.max(a.y, b.y) + 5;
        d +=
          " Q" +
          mx.toFixed(1) +
          " " +
          my.toFixed(1) +
          " " +
          b.x.toFixed(1) +
          " " +
          b.y.toFixed(1);
      }
      const labelTop = labelsEl
        ? labelsEl.getBoundingClientRect().top - tr.top
        : H;
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      anchors.forEach((a) => {
        if (a.gap) return;
        const ln = document.createElementNS(SVG_NS, "line");
        ln.setAttribute("class", "tick");
        ln.setAttribute("x1", a.x.toFixed(1));
        ln.setAttribute("y1", (a.y + 3).toFixed(1));
        ln.setAttribute("x2", a.x.toFixed(1));
        ln.setAttribute("y2", (labelTop - 8).toFixed(1));
        svg.appendChild(ln);
      });
      const path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("class", "ground");
      path.setAttribute("d", d);
      /* normalized length so the SETTING's draw-in is plain dash math */
      path.setAttribute("pathLength", "1");
      svg.appendChild(path);
    }

    // initial build (layout read ONCE, not per frame)
    buildTerrain();

    // re-measure once the display face is loaded (metrics shift the boxes)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) buildTerrain();
      });
    }

    // re-measure on layout change — the ResizeObserver replaces the source's
    // debounced window-resize handler; still zero reads inside any rAF.
    const terrainEl = root.querySelector<HTMLElement>("#terrain");
    const ro = new ResizeObserver(() => buildTerrain());
    if (terrainEl) ro.observe(terrainEl);

    // OWN buildTerrain on the registry so the SETTING system can re-draw the
    // ground through the LANDED stone bases at stone-seat time (main.js 2848:
    // a resize mid-fall would have caught a stone in the air).
    api.current.buildTerrain = buildTerrain;

    return () => {
      cancelled = true;
      ro.disconnect();
      if (api.current.buildTerrain === buildTerrain) {
        delete api.current.buildTerrain;
      }
    };
  }, [rootRef, api]);
}
