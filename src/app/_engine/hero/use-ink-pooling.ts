"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import { clamp } from "@/lib/math";
import type { EngineCtx } from "../engine-context";
import type { Ch, HeroFlags } from "./chars";

/**
 * INK POOLING — hero type swells under the nib. Ported VERBATIM from
 * prototypes/main.js 1153-1218. A mousemove queues one rAF (inkFrame); the
 * frame is GATED by the hero box cached in document coords (heroGate) so the
 * pointer path does ZERO layout reads anywhere off the hero. Near the hero it
 * reads the live per-glyph rects (required — loose letters move), applies a
 * distance falloff, quantizes the swell to 20 steps, and writes wght/SOFT only
 * when the rendered axes actually change. The amp is skipped from swell (naming
 * SOFT/WONK swaps it to a narrow alternate glyph — the CSS owns it, static).
 *
 * NOTE ON THE RECT READS: the perf rule "no getBoundingClientRect in a loop" is
 * honored on the mousemove PATH (the heroGate gate makes it pure math); the
 * per-glyph reads only run once the pointer is near, exactly as the original —
 * caching them would break the motion (loose letters are mid-flight). This is
 * the faithful, gated port the site already ships.
 */
export function useInkPooling(
  rootRef: RefObject<HTMLElement | null>,
  charsRef: RefObject<Ch[]>,
  flags: HeroFlags,
  engine: EngineCtx,
): void {
  const mouse = engine.mouse;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const INK_R = 170;
    let inkQueued = false;
    let inkActive = false;
    // hero box in DOCUMENT coords (x is viewport — the page never scrolls
    // horizontally); scroll-invariant, so re-measure only on resize / fonts.
    let heroGate: { left: number; right: number; top: number; bottom: number } | null =
      null;

    function measureHeroGate() {
      if (!root) return;
      const hr = root.getBoundingClientRect();
      const sY = window.scrollY;
      heroGate = {
        left: hr.left,
        right: hr.right,
        top: hr.top + sY,
        bottom: hr.bottom + sY,
      };
    }

    function setInk(c: Ch, t: number) {
      if (c.amp) return;
      if (t === 0 && c.t === 0) return;
      c.t = t;
      const w = Math.round(480 + 240 * t);
      const s = Math.round(70 * t);
      if (w === c.lw && s === c.ls) return; // same rendered axes — no style churn
      c.lw = w;
      c.ls = s;
      c.el.style.fontVariationSettings =
        '"opsz" 144, "wght" ' + w + ', "SOFT" ' + s + ', "WONK" 0';
    }

    function inkFrame() {
      inkQueued = false;
      if (!flags.trail.current || flags.reduced.current || flags.proof.current) return;
      if (!heroGate) return;
      const chars = charsRef.current;
      const my = mouse.current.y + window.scrollY;
      const near =
        mouse.current.x > heroGate.left - INK_R &&
        mouse.current.x < heroGate.right + INK_R &&
        my > heroGate.top - INK_R &&
        my < heroGate.bottom + INK_R;
      if (!near) {
        if (inkActive) {
          chars.forEach((c) => setInk(c, 0));
          inkActive = false;
        }
        return;
      }
      const rects = chars.map((c) => c.el.getBoundingClientRect());
      inkActive = false;
      const ih = window.innerHeight;
      chars.forEach((c, i) => {
        const r = rects[i];
        if (r.bottom < -40 || r.top > ih + 40) {
          setInk(c, 0);
          return;
        }
        const dx = mouse.current.x - (r.left + r.width / 2);
        const dy = mouse.current.y - (r.top + r.height / 2);
        const d = Math.sqrt(dx * dx + dy * dy);
        let t = clamp(1 - d / INK_R, 0, 1);
        t = t * t * (3 - 2 * t);
        // 20 steps, smoothed by the 0.28s .ch transition — writing fresh axes
        // every frame kept the display glyphs re-shaping continuously
        t = Math.round(t * 20) / 20;
        setInk(c, t);
        if (c.t > 0) inkActive = true;
      });
    }

    const onMove = () => {
      if (!inkQueued) {
        inkQueued = true;
        requestAnimationFrame(inkFrame);
      }
    };
    document.addEventListener("mousemove", onMove);

    // cache the gate at mount, on resize (ResizeObserver), and once fonts land
    measureHeroGate();
    const ro = new ResizeObserver(() => measureHeroGate());
    ro.observe(root);
    let fontsLive = true;
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (fontsLive) measureHeroGate();
      });
    }

    return () => {
      document.removeEventListener("mousemove", onMove);
      ro.disconnect();
      fontsLive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}