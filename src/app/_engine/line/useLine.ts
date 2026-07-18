"use client";

import { useEffect, type RefObject } from "react";
import { useEngine } from "@/app/_engine/engine-context";
import { mulberry32 } from "@/lib/rng";

/**
 * THE LINE — the work index's hanging-sheet physics, ported VERBATIM from
 * prototypes/main.js (buildLine 512–727, lineFrame 729–794, gestures 871–962,
 * the setting's kickSheet 2788–2804). SELECTED WORK hangs from one strung wire:
 * four plates on drop-cords of different lengths, salon-style, each with its own
 * rest-lean. The physics are LANGUID — idle micro-sway, scroll = a slow-dying
 * draft, hover STEADIES a sheet, a laggy hand on drag (lerp .055), an overdamped
 * drift home with NO bounce (−4.2/−4.4). Geometry is computed at build/resize/
 * fonts.ready (reads happen there, never per frame); the one rAF does pure math
 * and writes only a changed `rotate`/`scale` per sheet.
 *
 * NOT ported (added separately): the loupe/glass, the cursor-trailing reveal,
 * the project viewer. A quick click calls `engine.api.current.openProject?.(i)`
 * (owned later); a drag is not a nav (lineDragUsed / preventDefault).
 *
 * The line drag does NOT preventDefault its pointerdown, so it never suppresses
 * compat mouse events — the cursor dot keeps its own feed and this hook does not
 * need to write engine.mouse.current.
 */

interface LineItem {
  el: HTMLElement;
  i: number;
  z: number;
  cx: number;
  cyPage: number;
  lift: number;
  lean: number;
  th: number;
  sc: number;
  A: number;
  w1: number;
  p1: number;
  w2: number;
  p2: number;
  u: number;
  du: number;
  dragTarget: number;
  drag: boolean;
  hovered: boolean;
  steady: number;
}

type Pt = { x: number; y: number };
type SpanDef = { a: [number, number]; b: [number, number]; sag: number };
type SheetDef = { s: number; t: number; w: number; drop: number; lean: number; z: number };
type LineGeo = {
  height: (vw: number, vh: number) => number;
  spans: SpanDef[];
  sheets: SheetDef[];
  dock: { x: number; y: number; w: number; h: number };
  wll: { x: number; y: number };
  cat: { s: number; t: number };
};

/* geometry as fractions of the section's padding box (W × BH) — VERBATIM */
const LINE_GEO_D: LineGeo = {
  height: function (vw, vh) {
    return Math.max(vh * 1.5, vw * 0.94);
  },
  spans: [
    { a: [0.03, 0.095], b: [0.97, 0.23], sag: 0.052 },
    { a: [0.97, 0.23], b: [0.04, 0.59], sag: 0.058 },
    { a: [0.04, 0.59], b: [0.58, 0.88], sag: 0.028 },
  ],
  sheets: [
    { s: 0, t: 0.24, w: 0.215, drop: 0.012, lean: -1.1, z: 3 },
    { s: 0, t: 0.72, w: 0.15, drop: 0.085, lean: 0.8, z: 4 },
    { s: 1, t: 0.42, w: 0.235, drop: 0.03, lean: -0.5, z: 2 },
    { s: 1, t: 0.8, w: 0.165, drop: 0.06, lean: 1.6, z: 3 },
  ],
  dock: { x: 0.62, y: 0.855, w: 0.24, h: 0.055 },
  wll: { x: 0.035, y: 0.415 },
  cat: { s: 1, t: 0.16 },
};
const LINE_GEO_M: LineGeo = {
  height: function (vw, vh) {
    return vh * 3.3;
  },
  spans: [
    { a: [0.1, 0.052], b: [0.9, 0.13], sag: 0.011 },
    { a: [0.9, 0.14], b: [0.1, 0.31], sag: 0.015 },
    { a: [0.1, 0.32], b: [0.9, 0.495], sag: 0.015 },
    { a: [0.9, 0.505], b: [0.12, 0.695], sag: 0.015 },
    { a: [0.12, 0.695], b: [0.55, 0.915], sag: 0.008 },
  ],
  sheets: [
    { s: 0, t: 0.5, w: 0.7, drop: 0.008, lean: -1.1, z: 2 },
    { s: 1, t: 0.52, w: 0.6, drop: 0.028, lean: 0.9, z: 2 },
    { s: 2, t: 0.5, w: 0.72, drop: 0.01, lean: -0.5, z: 2 },
    { s: 3, t: 0.52, w: 0.62, drop: 0.036, lean: 1.5, z: 2 },
  ],
  dock: { x: 0.18, y: 0.93, w: 0.62, h: 0.034 },
  wll: { x: 0.06, y: 0.258 },
  cat: { s: 3, t: 0.16 },
};

function lineQ(p0: Pt, c: Pt, p1: Pt, t: number): Pt {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * c.x + t * t * p1.x,
    y: mt * mt * p0.y + 2 * mt * t * c.y + t * t * p1.y,
  };
}

export function useLine(rootRef: RefObject<HTMLElement | null>): void {
  const engine = useEngine();
  /* stable handles (never change identity) — the imperative registry and the
     scroll bus. media flags are read as dep values so the effect re-arms when
     they flip (start/stop the rAF, re-gate hover). */
  const api = engine.api;
  const subscribeScroll = engine.subscribeScroll;
  const { reduced, stillMode, trailEnabled } = engine;

  /* ---- build + physics + gestures (rebuilds only on reduced/still change) ---- */
  useEffect(() => {
    const rootEl = rootRef.current;
    if (!rootEl) return;
    const indexEl: HTMLElement = rootEl; /* non-null typed for every closure below */
    const wireEl = indexEl.querySelector<SVGSVGElement>("#line-wire");
    if (!wireEl) return; /* no wire → nothing to hang (SSR ships the printed DOM) */
    const lineWireEl: SVGSVGElement = wireEl; /* non-null typed for every closure below */
    const lineWllEl = indexEl.querySelector<HTMLElement>("#line-wll");
    const lineDockEl = indexEl.querySelector<HTMLElement>("#line-dock");

    const rows = Array.prototype.slice.call(
      indexEl.querySelectorAll(".row"),
    ) as HTMLElement[];

    let lineItems: LineItem[] = [];
    let lineDraft = 0;
    let lineVisible = true;
    let lineDragUsed = false;
    let wllBlipped = false;
    let wllT: ReturnType<typeof setTimeout> | undefined;

    /* this load's hand — the draft-kick jitter for the SETTING's kickSheet.
       (matches main.js srnd's seed formula; kickSheet is owned here now, so it
       carries its own seed rather than the setting block's.) */
    const srnd = mulberry32((Date.now() & 0xfffff) >>> 0);
    function rj(a: number, b: number): number {
      return a + srnd() * (b - a);
    }
    function pick<T>(arr: T[]): T {
      return arr[Math.floor(srnd() * arr.length)];
    }

    /* ---- geometry: reads happen HERE, in one place, never in the loop ---- */
    function buildLine(): void {
      const vw = window.innerWidth,
        vh = window.innerHeight;
      const mobileLine = vw <= 820;
      const GEO = mobileLine ? LINE_GEO_M : LINE_GEO_D;

      /* reserve a header band so the topmost sheet's clip never rises into the
         SELECTED WORK / "THE RUN…" heading. */
      const BHgeo = Math.round(GEO.height(vw, vh));
      const headEl =
        indexEl.querySelector<HTMLElement>(".index-sub") ||
        indexEl.querySelector<HTMLElement>(".index-head");
      const headBottom = headEl ? headEl.offsetTop + headEl.offsetHeight : 0;
      const HEAD_GAP = Math.round(Math.min(vw, vh) * 0.02) + 14;
      let topFrac = 1;
      GEO.spans.forEach(function (s) {
        topFrac = Math.min(topFrac, s.a[1], s.b[1]);
      });
      const headroom = Math.max(0, headBottom + HEAD_GAP - topFrac * BHgeo);
      const BH = BHgeo + headroom;
      indexEl.style.height = BH + "px";
      /* reads happen here, in one place, never in the loop */
      const W = indexEl.clientWidth;
      const idxRect = indexEl.getBoundingClientRect();
      const idxTop = idxRect.top + window.scrollY;
      const idxLeft = idxRect.left + window.scrollX;

      /* ---- the wire + hardware ---- */
      lineWireEl.setAttribute("viewBox", "0 0 " + W + " " + BH);
      const spansPx = GEO.spans.map(function (s) {
        const p0 = { x: s.a[0] * W, y: s.a[1] * BHgeo + headroom };
        const p1 = { x: s.b[0] * W, y: s.b[1] * BHgeo + headroom };
        const c = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 + s.sag * BHgeo };
        return { p0: p0, p1: p1, c: c };
      });
      let svg = "";
      spansPx.forEach(function (sp) {
        const d =
          "M" +
          sp.p0.x.toFixed(1) +
          " " +
          sp.p0.y.toFixed(1) +
          " Q" +
          sp.c.x.toFixed(1) +
          " " +
          sp.c.y.toFixed(1) +
          " " +
          sp.p1.x.toFixed(1) +
          " " +
          sp.p1.y.toFixed(1);
        svg += '<path class="w" d="' + d + '"/><path class="w-hi" d="' + d + '"/>';
      });
      function hwCleat(p: Pt): string {
        return (
          '<g class="hw">' +
          '<rect class="fill" x="' +
          (p.x - 4.5) +
          '" y="' +
          (p.y - 14) +
          '" width="9" height="20" rx="2"/>' +
          '<circle class="dot" cx="' +
          p.x +
          '" cy="' +
          (p.y - 9.5) +
          '" r="1.5"/>' +
          '<circle class="dot" cx="' +
          p.x +
          '" cy="' +
          (p.y + 1.5) +
          '" r="1.5"/></g>'
        );
      }
      function hwPulley(p: Pt): string {
        return (
          '<g class="hw">' +
          '<line x1="' +
          p.x +
          '" y1="' +
          (p.y - 13) +
          '" x2="' +
          p.x +
          '" y2="' +
          p.y +
          '"/>' +
          '<circle class="fill" cx="' +
          p.x +
          '" cy="' +
          p.y +
          '" r="6.4"/>' +
          '<circle cx="' +
          p.x +
          '" cy="' +
          p.y +
          '" r="3"/>' +
          '<circle class="dot" cx="' +
          p.x +
          '" cy="' +
          p.y +
          '" r="1.3"/></g>'
        );
      }
      function hwTurnbuckle(sp: { p0: Pt; c: Pt; p1: Pt }): string {
        const m = lineQ(sp.p0, sp.c, sp.p1, 0.08);
        const m2 = lineQ(sp.p0, sp.c, sp.p1, 0.13);
        const ang = Math.atan2(m2.y - m.y, m2.x - m.x) * 57.3;
        return (
          '<g class="hw" transform="rotate(' +
          ang.toFixed(1) +
          " " +
          m.x.toFixed(1) +
          " " +
          m.y.toFixed(1) +
          ')">' +
          '<rect class="fill" x="' +
          (m.x - 11) +
          '" y="' +
          (m.y - 3.2) +
          '" width="22" height="6.4" rx="3"/>' +
          '<circle cx="' +
          (m.x - 14) +
          '" cy="' +
          m.y +
          '" r="2.4"/>' +
          '<circle cx="' +
          (m.x + 14) +
          '" cy="' +
          m.y +
          '" r="2.4"/></g>'
        );
      }
      svg += hwCleat(spansPx[0].p0);
      svg += hwTurnbuckle(spansPx[0]);
      for (let si = 1; si < spansPx.length; si++) svg += hwPulley(spansPx[si].p0);
      svg += hwCleat(spansPx[spansPx.length - 1].p1);

      /* ---- the sheets on their drop-cords ---- */
      lineItems = [];
      rows.forEach(function (row, i) {
        const def = GEO.sheets[i];
        if (!def) return;
        const sp = spansPx[def.s];
        const wp = lineQ(sp.p0, sp.c, sp.p1, def.t); /* on the wire */
        const w = Math.min(def.w * W, 560);
        const clipY = wp.y + def.drop * BHgeo; /* the clip, below the cord */
        /* the drop-cord + its ring on the wire */
        svg +=
          '<circle class="hw dot" cx="' +
          wp.x.toFixed(1) +
          '" cy="' +
          wp.y.toFixed(1) +
          '" r="2.2"/>' +
          '<line class="cord" x1="' +
          wp.x.toFixed(1) +
          '" y1="' +
          wp.y.toFixed(1) +
          '" x2="' +
          wp.x.toFixed(1) +
          '" y2="' +
          (clipY - 16).toFixed(1) +
          '"/>';
        row.style.left = Math.round(wp.x - w / 2) + "px";
        row.style.top = Math.round(clipY + 2) + "px";
        row.style.width = Math.round(w) + "px";
        row.style.zIndex = String(def.z);
        row.style.transform = "rotate(" + def.lean + "deg)";
        lineItems.push({
          el: row,
          i: i,
          z: def.z,
          cx: idxLeft + wp.x,
          cyPage: idxTop + clipY,
          lift: 0,
          lean: def.lean,
          th: def.lean,
          sc: 1,
          A: 0.22 + ((i * 7919) % 97) / 97 * 0.28 /* deterministic variety */,
          w1: 0.05 + ((i * 104729) % 89) / 89 * 0.05,
          p1: ((i * 31) % 7) * 0.9,
          w2: 0.16 + ((i * 15485863) % 83) / 83 * 0.12,
          p2: ((i * 17) % 5) * 1.3,
          u: 0,
          du: 0,
          dragTarget: 0,
          drag: false,
          hovered: false,
          steady: 0,
        });
      });
      lineWireEl.innerHTML = svg;

      /* the instrument reads the line from a right-aligned readout tucked in the
         header band — a fixed clear pocket ABOVE the first sheet. */
      if (lineWllEl) {
        lineWllEl.style.left = "auto";
        lineWllEl.style.right = Math.round(Math.max(12, W * 0.02)) + "px";
        lineWllEl.style.top =
          Math.round(headBottom + Math.round(HEAD_GAP * 0.45)) + "px";
      }
      if (lineDockEl) {
        lineDockEl.style.left = Math.round(GEO.dock.x * W) + "px";
        lineDockEl.style.top = Math.round(GEO.dock.y * BHgeo + headroom) + "px";
        lineDockEl.style.width = Math.round(Math.min(GEO.dock.w * W, 420)) + "px";
        lineDockEl.style.height = Math.round(GEO.dock.h * BHgeo) + "px";
      }

      /* the cat sits on the wire now (mess layer; she just exists) */
      const catEl2 = indexEl.querySelector<HTMLElement>(".cat");
      if (catEl2 && GEO.cat) {
        const csp = spansPx[GEO.cat.s];
        const cp = lineQ(csp.p0, csp.c, csp.p1, GEO.cat.t);
        catEl2.style.left = Math.round(cp.x - 59) + "px";
        catEl2.style.top = Math.round(cp.y - 96) + "px";
        catEl2.style.right = "auto";
        const nCat = indexEl.querySelector<HTMLElement>(".n-cat");
        if (nCat) {
          nCat.style.left = Math.round(Math.max(8, cp.x - 59 - 190)) + "px";
          nCat.style.top = Math.round(cp.y - 58) + "px";
          nCat.style.right = "auto";
        }
        const zzz = indexEl.querySelector<HTMLElement>(".dd-zzz");
        if (zzz) {
          zzz.style.left = Math.round(cp.x + 52) + "px";
          zzz.style.top = Math.round(cp.y - 136) + "px";
          zzz.style.right = "auto";
        }
      }
    }

    /* ---- the loop: heavy paper, pure math, changed writes only ---- */
    const lineT0 = performance.now();
    let rafId = 0;
    function lineFrame(now: number): void {
      rafId = requestAnimationFrame(lineFrame);
      if (lineVisible && !document.hidden) {
        const t = (now - lineT0) / 1000;
        lineDraft *= 0.955; /* the draft dies slowly */
        for (let i = 0; i < lineItems.length; i++) {
          const it = lineItems[i];
          /* unstruck paper doesn't perform */
          if (it.el.classList.contains("unstruck")) continue;
          const steadyTarget = it.hovered ? 1 : 0;
          it.steady += (steadyTarget - it.steady) * 0.045;
          it.lift += ((it.hovered ? 1 : 0) - it.lift) * 0.09; /* pick it up to look */
          const calm = 1 - it.steady;
          const rest =
            it.A * calm * Math.sin(it.w1 * t * 6.283 + it.p1) +
            lineDraft * 1.4 * calm * Math.sin(it.w2 * t * 6.283 + it.p2);
          if (it.drag) {
            /* a heavy sheet follows the hand with lag — never snaps to it */
            it.u += (it.dragTarget - it.u) * 0.055;
          } else if (it.u !== 0 || it.du !== 0) {
            /* overdamped drift home — no bounce (Mark: no snap) */
            it.du += (-4.2 * it.u - 4.4 * it.du) * 0.016;
            it.u += it.du;
            if (Math.abs(it.u) < 0.02 && Math.abs(it.du) < 0.01) {
              it.u = 0;
              it.du = 0;
            }
          }
          const th = it.lean + rest + it.u;
          const sc = 1 + it.lift * 0.16; /* hover zooms the sheet toward you */
          if (Math.abs(th - it.th) > 0.03 || Math.abs(sc - it.sc) > 0.002) {
            it.th = th;
            it.sc = sc;
            it.el.style.transform =
              "rotate(" + th.toFixed(2) + "deg) scale(" + sc.toFixed(3) + ")";
          }
        }
      }
    }

    /* ---- hover STEADIES a sheet (no loupe): pick it up, dim the rest ---- */
    let lineHoverEl: HTMLElement | null = null;
    function setHover(it: LineItem, on: boolean): void {
      it.hovered = on;
      if (on) {
        it.el.classList.add("is-active");
        indexEl.classList.add("is-hovering");
        it.el.style.zIndex = "9";
      } else {
        it.el.classList.remove("is-active");
        it.el.style.zIndex = String(it.z);
        indexEl.classList.remove("is-hovering");
      }
    }
    function itemFor(el: Element | null): LineItem | null {
      const row = el && (el as Element).closest<HTMLElement>(".row");
      if (!row) return null;
      return lineItems[+(row.dataset.plate ?? -1)] || null;
    }

    /* ---- gestures ---- */
    let linePress: { it: LineItem; sx: number; sy: number; moved: boolean } | null =
      null;
    let lineDragging: LineItem | null = null;

    function onPointerOver(e: PointerEvent): void {
      if (e.pointerType && e.pointerType !== "mouse") return;
      const th = (e.target as Element)?.closest<HTMLElement>(".row-thumb");
      if (!th || th === lineHoverEl) return;
      lineHoverEl = th;
      const it = itemFor(th);
      if (!it || reduced || !trailEnabled) return;
      if (lineDragging || linePress) return; /* mid-gesture — the hand owns it */
      if (it.el.classList.contains("unstruck")) return;
      setHover(it, true);
    }
    function onPointerOut(e: PointerEvent): void {
      if (!lineHoverEl) return;
      if ((e.target as Element)?.closest(".row-thumb") !== lineHoverEl) return;
      const to = e.relatedTarget as Element | null;
      if (to && to.closest && to.closest(".row-thumb") === lineHoverEl) return; /* still inside */
      const it = itemFor(lineHoverEl);
      lineHoverEl = null;
      if (it) setHover(it, false);
    }

    function onPointerDown(e: PointerEvent): void {
      if (e.button !== 0) return;
      const row = (e.target as Element)?.closest<HTMLElement>(".row");
      if (!row || reduced) return;
      const it = lineItems[+(row.dataset.plate ?? -1)];
      if (!it || it.el.classList.contains("unstruck")) return;
      lineDragUsed = false; /* fresh press — clear any stale suppress flag */
      linePress = { it: it, sx: e.pageX, sy: e.pageY, moved: false };
    }

    function onPointerMove(e: PointerEvent): void {
      if (!linePress) return;
      if (!linePress.moved) {
        const mx = e.pageX - linePress.sx,
          my = e.pageY - linePress.sy;
        if (mx * mx + my * my > 36) {
          /* past 6px → it's a swing */
          linePress.moved = true;
          lineDragging = linePress.it;
          lineDragging.drag = true;
          lineDragging.dragTarget = lineDragging.u;
          lineDragUsed = true;
        }
      }
      if (lineDragging) {
        const dx = e.pageX - lineDragging.cx;
        const dy = Math.max(40, e.pageY - lineDragging.cyPage);
        lineDragging.dragTarget = Math.max(
          -22,
          Math.min(22, Math.atan2(dx, dy) * 57.3 - lineDragging.lean),
        );
      }
    }

    /* a swing release: settle the drag; a hard pull hums the wire + reads the
       load. navigation is decided by the row `click` handler (lineDragUsed),
       so a pointercancel simply drops the press — never navigates. */
    function lineUp(): void {
      if (lineDragging) {
        const it = lineDragging;
        lineDragging = null;
        it.drag = false;
        it.du = 0;
        /* a hard pull runs down the wire; the instrument reads it */
        if (Math.abs(it.u) > 9) {
          lineWireEl.classList.remove("hum");
          void (lineWireEl as unknown as HTMLElement).offsetWidth;
          lineWireEl.classList.add("hum");
          const nb = lineItems[it.i - 1],
            na = lineItems[it.i + 1];
          if (nb && !nb.drag) nb.du += it.u * 0.045;
          if (na && !na.drag) na.du += it.u * 0.045;
          if (lineWllEl) {
            const wll = lineWllEl; /* non-null capture for the revert timer */
            wll.innerHTML =
              "[W.L.L.] LOAD +" +
              Math.round(Math.abs(it.u) * 1.3) +
              "% · <em>HELD</em>";
            wll.classList.add("blip");
            clearTimeout(wllT);
            wllT = setTimeout(function () {
              wll.innerHTML = "[W.L.L.] 04 SHEETS · <em>HOLDS</em>";
              wll.classList.remove("blip");
            }, 1700);
          }
          api.current.logAct?.(
            "pulled at sheet 0" + (it.i + 1) + ". the line held.",
          );
        }
      }
      linePress = null;
    }

    /* a quick click opens the project; a drag is not a nav */
    const rowClickHandlers: Array<[HTMLElement, (e: MouseEvent) => void]> = [];

    /* ---- boot: the languid line runs unless ?still ships the hang static ---- */
    let io: IntersectionObserver | null = null;
    let unsub: (() => void) | undefined;

    if (!stillMode) {
      buildLine();
      if (!reduced) rafId = requestAnimationFrame(lineFrame);
      /* the loop idles while the run is off screen */
      if ("IntersectionObserver" in window) {
        io = new IntersectionObserver(
          function (es) {
            es.forEach(function (en) {
              lineVisible = en.isIntersecting;
            });
          },
          { rootMargin: "25%" },
        );
        io.observe(indexEl);
      }
      /* your reading speed is a draft through the shop (per-scroll-frame) */
      let lineLastY = window.scrollY;
      unsub = subscribeScroll(function () {
        const y = window.scrollY;
        lineDraft = Math.min(1, lineDraft + Math.abs(y - lineLastY) * 0.0035);
        lineLastY = y;
      });

      indexEl.addEventListener("pointerover", onPointerOver);
      indexEl.addEventListener("pointerout", onPointerOut);
      indexEl.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", lineUp);
      window.addEventListener("pointercancel", lineUp);
      rows.forEach(function (row) {
        const onClick = function (e: MouseEvent): void {
          if (lineDragUsed) {
            e.preventDefault();
            lineDragUsed = false;
            return;
          }
          /* a clean tap opens the project sheet (owned later). preventDefault
             only when there is a door to open, so the #p-01 href stays a
             graceful deep-link fallback until the viewer is wired. */
          const op = api.current.openProject;
          if (op) {
            e.preventDefault();
            op(+(row.dataset.plate ?? -1));
          }
        };
        row.addEventListener("click", onClick);
        rowClickHandlers.push([row, onClick]);
      });

      /* the SETTING adds a draft impulse per sheet as it hangs (§30) */
      api.current.kickSheet = function (i: number): void {
        const it = lineItems[i];
        if (!it || it.drag) return;
        /* a real swing that DIES languid — stronger than a neighbor kick,
           well under a hand pull */
        it.du += pick([-1, 1]) * rj(0.6, 1.3);
        if (!wllBlipped && lineWllEl) {
          const wll = lineWllEl; /* non-null capture for the revert timer */
          wllBlipped = true;
          wll.innerHTML = "[W.L.L.] TAKING THE LOAD · <em>HELD</em>";
          wll.classList.add("blip");
          clearTimeout(wllT);
          wllT = setTimeout(function () {
            wll.innerHTML = "[W.L.L.] 04 SHEETS · <em>HOLDS</em>";
            wll.classList.remove("blip");
          }, 1700);
        }
      };
    } else {
      buildLine(); /* ?still ships the hang, hung true, nothing moving */
    }

    /* ---- geometry re-hangs on resize (150ms) + once fonts settle ---- */
    let resizeT: ReturnType<typeof setTimeout> | undefined;
    function onResize(): void {
      clearTimeout(resizeT);
      resizeT = setTimeout(function () {
        buildLine();
      }, 150);
    }
    window.addEventListener("resize", onResize);
    let fontsCancelled = false;
    if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        if (!fontsCancelled) buildLine(); /* re-hang once metrics are real */
      });
    }

    return function cleanup() {
      cancelAnimationFrame(rafId);
      io?.disconnect();
      unsub?.();
      clearTimeout(wllT);
      clearTimeout(resizeT);
      fontsCancelled = true;
      window.removeEventListener("resize", onResize);
      indexEl.removeEventListener("pointerover", onPointerOver);
      indexEl.removeEventListener("pointerout", onPointerOut);
      indexEl.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", lineUp);
      window.removeEventListener("pointercancel", lineUp);
      rowClickHandlers.forEach(function (pair) {
        pair[0].removeEventListener("click", pair[1]);
      });
      if (api.current.kickSheet) {
        delete api.current.kickSheet;
      }
    };
  }, [reduced, stillMode, trailEnabled, rootRef, api, subscribeScroll]);

  /* ---- the row thumbs take the current-accent plate; re-ink on plate change ---- */
  useEffect(() => {
    const indexEl = rootRef.current;
    if (!indexEl) return;
    const rows = indexEl.querySelectorAll<HTMLElement>(".row");
    rows.forEach(function (row) {
      const th = row.querySelector<HTMLElement>(".row-thumb");
      const i = +(row.dataset.plate ?? -1);
      if (th && engine.plates[i]) th.style.backgroundImage = engine.plates[i];
    });
  }, [engine.plates, rootRef]);
}
