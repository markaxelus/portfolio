"use client";

import { useEffect, useRef } from "react";
import { useEngine } from "@/app/_engine/engine-context";
import { mulberry32 } from "@/lib/rng";
import { clamp } from "@/lib/math";

/**
 * THE THOUGHT-THREAD — THE RE-READ (mess only).
 *
 * A VERBATIM port of prototypes/main.js lines 149–416: the seeded two-pen
 * re-read line that routes note-to-note through the real scrawl positions,
 * circles what matters, ties a hesitation knot, throws one dead-end spur and
 * scratches it out, changes pens (red #th-a → graphite #th-b) at the record,
 * and lands as an arrow on "Write to me." A tip-dot rides the head of the
 * stroke — the line is being written NOW, not revealed.
 *
 * Operates on the EXISTING #thread SVG (owned by page.tsx) by id. Renders
 * nothing itself. Every constant, seed (mulberry32(7)), lerp factor (.16),
 * speed cap (TH_SPEED 3600 px/s), sample count (K=400), and threshold is
 * identical to the original — it must move exactly as the hand-built site.
 *
 * Wiring (the exact main.js call graph):
 *   - buildThread()  at mount + ResizeObserver(.page) + document.fonts.ready.
 *   - updateThread() on every scroll frame, ONLY while engine.proofOn
 *     (subscribeScroll — the engine's own per-scroll-frame rAF).
 *   - updateThread(true) on mess-entry (proofOn false→true) — the pen meets
 *     you at your scroll position, retracing only the last stretch.
 *   - full-drawn under ?still / reduced motion.
 *
 * Discipline: buildThread does the layout reads (getBoundingClientRect /
 * getTotalLength / getPointAtLength ×~800) ONCE per build. The per-frame path
 * (threadStep) is pure math + string-deduped style writes + exactly one
 * getPointAtLength for the tip — no document reflow reads in the loop.
 */

interface PageR {
  x: number;
  y: number;
  w: number;
  h: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface Sample {
  p: number;
  len: number;
  y: number;
}

export function useThoughtThread(): void {
  const engine = useEngine();
  const { subscribeScroll } = engine;

  // mode/media mirrors so the long-lived loops read the live value (not a
  // captured snapshot). Updated every render — the closures below dereference
  // .current, matching main.js's `stillMode` / `reduced()` / `body.proof`.
  const reducedRef = useRef(false);
  const stillRef = useRef(false);
  const proofRef = useRef(false);
  reducedRef.current = engine.reduced;
  stillRef.current = engine.stillMode;
  proofRef.current = engine.proofOn;

  // published so the mess-entry watcher (separate effect) can retrace
  const updateThreadRef = useRef<((entering?: boolean) => void) | null>(null);
  const prevProofRef = useRef(false);

  // --- the engine: build + reveal (mounts once; owns all listeners/rAF) ---
  useEffect(() => {
    const byId = <T,>(id: string): T | null =>
      document.getElementById(id) as unknown as T | null;

    const threadSvg = byId<SVGSVGElement>("thread");
    const thA = byId<SVGPathElement>("th-a");
    const thAe = byId<SVGPathElement>("th-a-echo");
    const thB = byId<SVGPathElement>("th-b");
    const thBe = byId<SVGPathElement>("th-b-echo");
    const thSpur = byId<SVGPathElement>("th-spur");
    const thScratch = byId<SVGPathElement>("th-scratch");
    const thArrow = byId<SVGPathElement>("th-arrow");
    const thTip = byId<SVGCircleElement>("th-tip");
    if (
      !threadSvg || !thA || !thAe || !thB || !thBe ||
      !thSpur || !thScratch || !thArrow || !thTip
    ) {
      return;
    }

    // --- module-scope state (ported from the IIFE) ---
    let thLenA = 0;
    let thLenB = 0;
    let thSamples: Sample[] = [];
    let thSpurLen = 0;
    let lastThA: number | string = -1;
    let lastThB: number | string = -1;
    let lastTipOnB = false;
    let thCur = 0;
    let thTgt = 0;
    let thAnimOn = false;
    let thPrevT = 0;
    const TH_SPEED = 3600; // px of stroke per second, at full sprint

    let rafId = 0;
    let disposed = false;

    function pageRect(sel: string): PageR | null {
      const n = document.querySelector(sel);
      if (!n) return null;
      const r = n.getBoundingClientRect();
      if (r.width < 3) return null; /* hidden at this breakpoint */
      return {
        x: r.left + r.width / 2,
        y: r.top + scrollY + r.height / 2,
        w: r.width,
        h: r.height,
        left: r.left,
        right: r.right,
        top: r.top + scrollY,
        bottom: r.bottom + scrollY,
      };
    }

    function buildThread(): void {
      const page = document.querySelector<HTMLElement>(".page");
      if (!page) return;
      const W = page.clientWidth;
      const H = page.scrollHeight;
      threadSvg!.setAttribute("viewBox", "0 0 " + W + " " + H);
      threadSvg!.style.height = H + "px";
      const rnd = mulberry32(7);

      const drafts = pageRect(".drafts"),
        amp = pageRect("#amp"),
        lh = pageRect(".n-lh"),
        nosc = pageRect(".n-noscale"),
        y2022 = pageRect(".n-gap") /* the trail-gap scrawl (2024 now) */,
        ttt = pageRect(".dd-ttt"),
        argue = pageRect(".argue"),
        coffee = pageRect(".coffee"),
        vinyl = pageRect(".dd-vinyl"),
        todo = pageRect(".todo"),
        rip = pageRect(".dd-rip"),
        write = pageRect("#write-link");

      const pts: number[][] = [];
      let penChangeAt = -1;
      let spurFrom: number[] | null = null;
      function push(x: number, y: number): void {
        pts.push([x, y]);
      }
      function jitterTo(x: number, y: number): void {
        /* long transits wander twice — a hand never draws a chord */
        const p = pts[pts.length - 1];
        const dist = Math.abs(x - p[0]) + Math.abs(y - p[1]);
        if (dist > 650) {
          push(
            p[0] + (x - p[0]) * 0.33 + (rnd() - 0.5) * 160,
            p[1] + (y - p[1]) * 0.33 + (rnd() - 0.5) * 70,
          );
          push(
            p[0] + (x - p[0]) * 0.7 + (rnd() - 0.5) * 160,
            p[1] + (y - p[1]) * 0.7 + (rnd() - 0.5) * 70,
          );
        } else {
          push(
            (p[0] + x) / 2 + (rnd() - 0.5) * 100,
            (p[1] + y) / 2 + (rnd() - 0.5) * 60,
          );
        }
        push(x, y);
      }
      function loop(r: PageR, padX: number, padY: number): void {
        /* a journaling circle, 1.2 turns, entered from wherever we are */
        const rx = r.w / 2 + padX,
          ry = r.h / 2 + padY;
        const N = 9,
          steps = Math.floor(N * 1.22);
        for (let i = 0; i <= steps; i++) {
          const a = Math.PI + (i / N) * Math.PI * 2;
          push(
            r.x + Math.cos(a) * rx * (1 + (rnd() - 0.5) * 0.16),
            r.y + Math.sin(a) * ry * (1 + (rnd() - 0.5) * 0.16),
          );
        }
      }
      function knot(x: number, y: number): void {
        /* the pen hesitates: a small tightening tangle */
        for (let i = 0; i <= 15; i++) {
          const a = (i / 7.5) * Math.PI * 2;
          const rr = 7 + i * 0.9;
          push(x + Math.cos(a) * rr * 1.5, y + Math.sin(a) * rr);
        }
      }

      push(W * 0.3, 150);
      if (drafts) jitterTo(drafts.left - 36, drafts.y);
      if (amp) jitterTo(amp.x + amp.w * 0.62 + 30, amp.y);
      if (lh) jitterTo(lh.x, lh.bottom + 14);
      if (nosc) jitterTo(nosc.x, nosc.top - 16);
      const prev = pts[pts.length - 1];
      knot(
        W * (0.42 + rnd() * 0.2),
        prev[1] + (y2022 ? (y2022.y - prev[1]) * 0.5 : 400),
      );
      if (y2022) jitterTo(y2022.x, y2022.bottom + 12);
      if (ttt) {
        jitterTo(ttt.left - 26, ttt.y);
        loop(ttt, 26, 22);
      }
      spurFrom = pts[pts.length - 1].slice();
      if (coffee) {
        jitterTo(coffee.left - 18, coffee.y);
        loop(coffee, 12, 10);
      }
      if (vinyl) {
        jitterTo(vinyl.right + 26, vinyl.y);
        penChangeAt = pts.length - 1;
      }
      if (todo) {
        jitterTo(todo.left - 24, todo.y);
        loop(todo, 20, 16);
      }
      if (rip) jitterTo(rip.x, rip.top - 18);
      if (write) jitterTo(write.x - write.w * 0.2, write.top - 26);
      else jitterTo(W * 0.3, H - 240);

      if (penChangeAt < 0) penChangeAt = Math.floor(pts.length * 0.6);

      function smooth(list: number[][]): string {
        if (list.length < 2) return "";
        let d = "M" + list[0][0].toFixed(1) + " " + list[0][1].toFixed(1);
        for (let i = 1; i < list.length - 1; i++) {
          const mx = (list[i][0] + list[i + 1][0]) / 2;
          const my = (list[i][1] + list[i + 1][1]) / 2;
          d +=
            " Q" +
            list[i][0].toFixed(1) +
            " " +
            list[i][1].toFixed(1) +
            " " +
            mx.toFixed(1) +
            " " +
            my.toFixed(1);
        }
        return (
          d +
          " L" +
          list[list.length - 1][0].toFixed(1) +
          " " +
          list[list.length - 1][1].toFixed(1)
        );
      }
      const listA = pts.slice(0, penChangeAt + 1);
      const listB = pts.slice(penChangeAt);
      thA!.setAttribute("d", smooth(listA));
      thAe!.setAttribute("d", smooth(listA));
      thB!.setAttribute("d", smooth(listB));
      thBe!.setAttribute("d", smooth(listB));
      thLenA = thA!.getTotalLength();
      thLenB = thB!.getTotalLength();
      (
        [
          [thA!, thLenA],
          [thAe!, thLenA],
          [thB!, thLenB],
          [thBe!, thLenB],
        ] as Array<[SVGPathElement, number]>
      ).forEach(function (pl) {
        pl[0].style.strokeDasharray = pl[1] + " " + pl[1];
      });

      /* the spur: a thought toward "one more pass" — abandoned, scratched */
      if (spurFrom && argue) {
        const sx = spurFrom[0],
          sy = spurFrom[1];
        const tx = argue.left - 20,
          ty = argue.y;
        thSpur!.setAttribute(
          "d",
          "M" +
            sx.toFixed(1) +
            " " +
            sy.toFixed(1) +
            " Q" +
            ((sx + tx) / 2 + 40).toFixed(1) +
            " " +
            ((sy + ty) / 2 - 60).toFixed(1) +
            " " +
            tx.toFixed(1) +
            " " +
            ty.toFixed(1),
        );
        const mx2 = (sx + tx) / 2 + 12,
          my2 = (sy + ty) / 2 - 26;
        thScratch!.setAttribute(
          "d",
          "M" +
            (mx2 - 48).toFixed(1) +
            " " +
            (my2 + 2).toFixed(1) +
            " L" +
            (mx2 + 48).toFixed(1) +
            " " +
            (my2 - 12).toFixed(1) +
            " M" +
            (mx2 - 42).toFixed(1) +
            " " +
            (my2 + 14).toFixed(1) +
            " L" +
            (mx2 + 42).toFixed(1) +
            " " +
            (my2 - 24).toFixed(1),
        );
        thSpurLen = 0;
        for (let s = 0; s <= 80; s++) {
          const q = thA!.getPointAtLength((thLenA * s) / 80);
          if (Math.abs(q.x - sx) + Math.abs(q.y - sy) < 26) {
            thSpurLen = (thLenA * s) / 80;
            break;
          }
        }
        if (!thSpurLen) thSpurLen = thLenA * 0.7;
      } else {
        thSpur!.removeAttribute("d");
        thScratch!.removeAttribute("d");
        thSpurLen = 0;
      }

      /* the arrowhead, landing on the CTA */
      const end = pts[pts.length - 1];
      thArrow!.setAttribute(
        "d",
        "M" +
          (end[0] - 15).toFixed(1) +
          " " +
          (end[1] - 16).toFixed(1) +
          " L" +
          end[0].toFixed(1) +
          " " +
          end[1].toFixed(1) +
          " M" +
          (end[0] - 18).toFixed(1) +
          " " +
          (end[1] + 3).toFixed(1) +
          " L" +
          end[0].toFixed(1) +
          " " +
          end[1].toFixed(1),
      );

      /* reading samples: monotonic max-y → drawn length (this is what
         makes the reveal dart between notes and linger inside loops) */
      thSamples = [];
      let maxY = 0;
      const K = 400;
      let k: number, q2: DOMPoint;
      for (k = 0; k <= K; k++) {
        q2 = thA!.getPointAtLength((thLenA * k) / K);
        maxY = Math.max(maxY, q2.y);
        thSamples.push({ p: 0, len: (thLenA * k) / K, y: maxY });
      }
      for (k = 0; k <= K; k++) {
        q2 = thB!.getPointAtLength((thLenB * k) / K);
        maxY = Math.max(maxY, q2.y);
        thSamples.push({ p: 1, len: (thLenB * k) / K, y: maxY });
      }
      lastThA = -1;
      lastThB = -1;
      thCur = 0;
      updateThread();
    }

    /* the pen has a speed: the drawn length chases the scroll target
       through a capped lerp, so the stroke FLOWS — no snapping, no
       chunks appearing at once, however hard you scroll */
    function updateThread(entering?: boolean): void {
      if (!thSamples.length) return;
      const full = stillRef.current || reducedRef.current;
      const target = full ? Infinity : scrollY + innerHeight * 0.86;
      let lo = 0,
        hi = thSamples.length - 1;
      while (lo < hi) {
        const mid = (lo + hi + 1) >> 1;
        if (thSamples[mid].y <= target) lo = mid;
        else hi = mid - 1;
      }
      const s = thSamples[lo];
      let total = s.p === 0 ? s.len : thLenA + s.len;
      if (thSamples[0].y > target) total = 0;
      thTgt = total;
      if (full) {
        thCur = thTgt;
        threadRender();
        return;
      }
      /* ONLY on mess-entry: retrace just the last stretch instead of
         re-writing the whole tour from the top. never during scroll —
         the pen's speed cap is what keeps the stroke continuous. */
      if (entering === true && thTgt - thCur > 1100) thCur = thTgt - 1100;
      if (!thAnimOn) {
        thAnimOn = true;
        thPrevT = performance.now();
        rafId = requestAnimationFrame(threadStep);
      }
    }

    function threadStep(now: number): void {
      if (!proofRef.current) {
        thCur = thTgt;
        threadRender();
        thAnimOn = false;
        return;
      }
      const dt = Math.min(0.05, (now - thPrevT) / 1000);
      thPrevT = now;
      const diff = thTgt - thCur;
      if (Math.abs(diff) < 0.6) {
        thCur = thTgt;
        threadRender();
        thAnimOn = false;
        return;
      }
      let step = clamp(diff * 0.16, -TH_SPEED * dt, TH_SPEED * dt);
      if (Math.abs(step) < 1.4)
        step = Math.sign(diff) * Math.min(Math.abs(diff), 1.4);
      thCur += step;
      threadRender();
      rafId = requestAnimationFrame(threadStep);
    }

    function threadRender(): void {
      const lenA = Math.min(thLenA, thCur);
      const lenB = Math.max(0, Math.min(thLenB, thCur - thLenA));
      const offA = (thLenA - lenA).toFixed(1);
      const offB = (thLenB - lenB).toFixed(1);
      if (offA !== lastThA) {
        lastThA = offA;
        thA!.style.strokeDashoffset = offA;
        thAe!.style.strokeDashoffset = offA;
      }
      if (offB !== lastThB) {
        lastThB = offB;
        thB!.style.strokeDashoffset = offB;
        thBe!.style.strokeDashoffset = offB;
      }
      thSpur!.classList.toggle("on", thSpurLen > 0 && lenA >= thSpurLen);
      thScratch!.classList.toggle("on", thSpurLen > 0 && lenA >= thSpurLen + 70);
      thArrow!.classList.toggle("on", thLenB > 0 && lenB >= thLenB - 4);
      /* the tip: the pen is writing this right now */
      const full = stillRef.current || reducedRef.current;
      if (full || (thLenB > 0 && lenB >= thLenB - 2) || thCur <= 1) {
        thTip!.style.opacity = "0";
      } else {
        const onB = lenB > 0;
        const tp = onB ? thB!.getPointAtLength(lenB) : thA!.getPointAtLength(lenA);
        thTip!.style.opacity = "1";
        thTip!.setAttribute(
          "transform",
          "translate(" + tp.x.toFixed(1) + " " + tp.y.toFixed(1) + ")",
        );
        if (onB !== lastTipOnB) {
          lastTipOnB = onB;
          thTip!.setAttribute("class", onB ? "th-gra" : "th-red");
        }
      }
    }

    // publish for the mess-entry watcher
    updateThreadRef.current = updateThread;

    // --- build at mount ---
    buildThread();

    // --- rebuild on layout change (the .page height/width) ---
    const page = document.querySelector<HTMLElement>(".page");
    let firstRO = true;
    const ro = new ResizeObserver(() => {
      if (firstRO) {
        firstRO = false;
        return;
      } /* skip the synchronous initial fire — buildThread already ran */
      buildThread();
    });
    if (page) ro.observe(page);

    // --- rebuild once real font metrics land ---
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!disposed) buildThread();
      });
    }

    // --- draw in with the scroll (mess only) — the engine's scroll rAF ---
    const unsub = subscribeScroll(() => {
      if (proofRef.current) updateThread();
    });

    return () => {
      disposed = true;
      updateThreadRef.current = null;
      ro.disconnect();
      unsub();
      cancelAnimationFrame(rafId);
    };
  }, [subscribeScroll]);

  // --- mess-entry (proofOn false→true): the pen meets you at your scroll ---
  useEffect(() => {
    if (engine.proofOn && !prevProofRef.current) {
      updateThreadRef.current?.(true);
    }
    prevProofRef.current = engine.proofOn;
  }, [engine.proofOn]);
}
