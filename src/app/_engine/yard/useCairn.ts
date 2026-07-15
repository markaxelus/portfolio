"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useEngine } from "@/app/_engine/engine-context";
import { mulberry32, stonePath, SVG_NS } from "@/lib/rng";
import { clamp } from "@/lib/math";

/**
 * The visitors' cairn — ported VERBATIM from prototypes/main.js (1914–2120).
 * A click/tap on #yard-ground adds your stone ON the cairn (#pile): the tower
 * grows on the studio's own foundation (OURS, never falls), develops a seeded
 * lean (leanStep) and past LEAN_LIMIT / STACK_CAP it TOPPLES — the stacked
 * stones fall to the ground row (accelerating heavy fall + tumble, e*e easing,
 * never a bounce) and the count flashes "THE STACK FELL — WE STACK AGAIN".
 *
 * Every stone is one <g>-per-stone (positioned group + inner anim group +
 * origin-centred blob) so the topple is pure transform writes — ZERO layout
 * reads in the rAF. Reduced motion / stillMode seat everything instantly; a
 * cairnBusy guard stops fast clicks racing the fall. Persists cairn-stones-v2
 * ({stack, ground}; v1's scattered stones migrate into ground) + ma-stone-seq.
 * Every 9th visitor stone is a signal (accent) stone. On a drop it knocks the
 * shared stone tok (engine.api.current.sndTok?.()).
 */

type StackStone = {
  seed: number;
  sig?: boolean;
  t?: number;
  n?: number;
  rx?: number;
  ry?: number;
};
type GroundStone = StackStone & { x: number };
type StoneMeta = {
  seed: number;
  n?: number;
  t?: number;
  house?: boolean;
  sig?: boolean;
};
type GeomStone = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  seed: number;
  n?: number;
  t?: number;
  sig?: boolean;
};
type FallTarget = {
  seed: number;
  sig?: boolean;
  t?: number;
  n?: number;
  rx: number;
  ry: number;
  fromX: number;
  fromY: number;
  tx: number;
  ty: number;
  rot: number;
};

export interface CairnRefs {
  groundRef: RefObject<HTMLElement | null>;
  pileRef: RefObject<SVGGElement | null>;
  countRef: RefObject<HTMLElement | null>;
}

export function useCairn({ groundRef, pileRef, countRef }: CairnRefs): void {
  const engine = useEngine();
  const apiRef = engine.api;

  // live media flags mirrored into refs so the closures read them fresh
  // (reduced() / stillMode were live checks in the original)
  const reducedRef = useRef(engine.reduced);
  const stillRef = useRef(engine.stillMode);
  reducedRef.current = engine.reduced;
  stillRef.current = engine.stillMode;

  useEffect(() => {
    const pileEl = pileRef.current;
    const yardEl = groundRef.current;
    const countEl = countRef.current;
    if (!pileEl || !yardEl || !countEl) return;

    const GROUND_Y = 143;
    const STORE_KEY = "cairn-stones-v2";
    const LEAN_LIMIT = 30; /* px of apex lean before it gives */
    const STACK_CAP = 9; /* it never stacks higher than this */
    const GROUND_CAP = 42; /* the ground erodes past this */

    const mqFine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = () => reducedRef.current;

    /* the studio's own stack, centre stage — the foundation, never falls */
    const OURS = [
      { rx: 50, ry: 12, seed: 101 },
      { rx: 42, ry: 10, seed: 102 },
      { rx: 36, ry: 9, seed: 103 },
      { rx: 30, ry: 8, seed: 104 },
      { rx: 25, ry: 7, seed: 105 },
      { rx: 20, ry: 6, seed: 106 },
      { rx: 15, ry: 5, seed: 107 },
    ];
    /* the top surface of the house stack — visitor stones start here */
    const HOUSE_APEX = (function () {
      let b = GROUND_Y + 1;
      OURS.forEach(function (s) {
        b = b - 2 * s.ry + 3;
      });
      return b;
    })();

    /* a stone's size + its lean contribution are derived from its seed, so
       the same stack renders identically on every load */
    function stoneSize(seed: number) {
      const r = mulberry32(seed ^ 0x1234);
      return { rx: 12 + Math.floor(r() * 6), ry: 5 + Math.floor(r() * 3) };
    }
    function leanStep(seed: number) {
      return (mulberry32(seed ^ 0x9e37)() - 0.5) * 22;
    }

    /* one draw path for every stone: a positioned group, an animation group
       (for the drop / topple), and the wobbly blob centred at its own origin
       so a rotate() tumbles it around its middle */
    function drawStoneG(
      cx: number,
      cy: number,
      rx: number,
      ry: number,
      meta: StoneMeta,
      drop: boolean,
    ): SVGGElement {
      const g = document.createElementNS(SVG_NS, "g") as SVGGElement;
      g.setAttribute(
        "transform",
        "translate(" + cx.toFixed(1) + " " + cy.toFixed(1) + ")",
      );
      const inner = document.createElementNS(SVG_NS, "g") as SVGGElement;
      inner.setAttribute("class", "stone-inner" + (drop ? " dropping" : ""));
      const p = document.createElementNS(SVG_NS, "path") as SVGPathElement;
      p.setAttribute("d", stonePath(0, 0, rx, ry, meta.seed));
      if (meta.n) p.dataset.n = String(meta.n);
      if (meta.t) p.dataset.t = String(meta.t);
      if (meta.house) p.classList.add("house");
      if (meta.sig) p.classList.add("signal");
      inner.appendChild(p);
      g.appendChild(inner);
      pileEl!.appendChild(g);
      return g;
    }

    let stackStones: StackStone[] = [];
    let groundStones: GroundStone[] = [];
    let stoneSeq = 0;
    function loadCairn(): { stack: StackStone[]; ground: GroundStone[] } {
      try {
        const raw = localStorage.getItem(STORE_KEY);
        if (raw) {
          const o = JSON.parse(raw);
          return {
            stack: Array.isArray(o.stack) ? o.stack : [],
            ground: Array.isArray(o.ground) ? o.ground : [],
          };
        }
        /* migrate the old scattered stones into the ground row */
        const v1 = localStorage.getItem("cairn-stones-v1");
        if (v1) {
          const arr = JSON.parse(v1);
          if (Array.isArray(arr))
            return {
              stack: [],
              ground: arr.map(function (s: GroundStone): GroundStone {
                return {
                  x: s.x,
                  seed: s.seed,
                  sig: s.sig,
                  t: s.t,
                  n: s.n,
                  rx: s.rx,
                  ry: s.ry,
                };
              }),
            };
        }
      } catch {}
      return { stack: [], ground: [] };
    }
    function saveCairn() {
      try {
        localStorage.setItem(
          STORE_KEY,
          JSON.stringify({ stack: stackStones, ground: groundStones }),
        );
      } catch {}
    }
    (function initCairn() {
      const l = loadCairn();
      stackStones = l.stack;
      groundStones = l.ground;
      try {
        stoneSeq = +(localStorage.getItem("ma-stone-seq") || 0);
      } catch {}
      stackStones.concat(groundStones).forEach(function (s) {
        if (s.n && s.n > stoneSeq) stoneSeq = s.n;
      });
    })();

    /* the tower's geometry: each stone sits on the last, carrying the lean */
    function stackGeom(): GeomStone[] {
      const out: GeomStone[] = [];
      let bottom = HOUSE_APEX;
      let lean = 0;
      stackStones.forEach(function (s) {
        const sz = stoneSize(s.seed);
        lean += leanStep(s.seed);
        out.push({
          cx: 500 + lean,
          cy: bottom - sz.ry,
          rx: sz.rx,
          ry: sz.ry,
          seed: s.seed,
          n: s.n,
          t: s.t,
          sig: s.sig,
        });
        bottom = bottom - 2 * sz.ry + 3;
      });
      return out;
    }
    function towerLean(): number {
      let lean = 0;
      stackStones.forEach(function (s) {
        lean += leanStep(s.seed);
      });
      return lean;
    }

    function renderCairn(dropLast: boolean) {
      while (pileEl!.firstChild) pileEl!.removeChild(pileEl!.firstChild);
      let b = GROUND_Y + 1;
      OURS.forEach(function (s) {
        drawStoneG(500, b - s.ry, s.rx, s.ry, { seed: s.seed, house: true }, false);
        b = b - 2 * s.ry + 3;
      });
      groundStones.forEach(function (s) {
        const sz = stoneSize(s.seed);
        drawStoneG(
          s.x,
          GROUND_Y - (s.ry || sz.ry),
          s.rx || sz.rx,
          s.ry || sz.ry,
          s,
          false,
        );
      });
      const geom = stackGeom();
      geom.forEach(function (g, i) {
        drawStoneG(g.cx, g.cy, g.rx, g.ry, g, dropLast && i === geom.length - 1);
      });
    }

    function updateCount() {
      const total = OURS.length + stackStones.length + groundStones.length;
      const verb = mqFine.matches ? "CLICK" : "TAP";
      countEl!.textContent = total + " STONES — " + verb + " TO LEAVE YOURS";
    }

    let fellT: ReturnType<typeof setTimeout> | null = null;
    function showFellLine() {
      countEl!.textContent = "THE STACK FELL — WE STACK AGAIN";
      if (fellT) clearTimeout(fellT);
      fellT = setTimeout(updateCount, 2600);
    }

    function trimGround() {
      while (groundStones.length > GROUND_CAP) groundStones.shift();
    }

    let cairnBusy = false; /* locked while a topple plays, so fast clicks don't race it */
    function topple() {
      const geom = stackGeom();
      if (!geom.length) {
        cairnBusy = false;
        return;
      }
      const targets: FallTarget[] = geom.map(function (g, i) {
        const side = i % 2 === 0 ? -1 : 1;
        const spread = 70 + i * 22 + mulberry32(g.seed ^ 0x5151)() * 60;
        return {
          seed: g.seed,
          sig: g.sig,
          t: g.t,
          n: g.n,
          rx: g.rx,
          ry: g.ry,
          fromX: g.cx,
          fromY: g.cy,
          tx: clamp(500 + side * spread, 55, 945),
          ty: GROUND_Y - g.ry,
          rot: (mulberry32(g.seed ^ 0xaaaa)() * 2 - 1) * 46,
        };
      });
      stackStones = [];
      showFellLine();
      if (reduced() || stillRef.current) {
        targets.forEach(function (t) {
          groundStones.push(groundEntry(t));
        });
        trimGround();
        saveCairn();
        updateCount();
        renderCairn(false);
        cairnBusy = false;
        return;
      }
      renderCairn(false); /* tower gone; house + existing ground */
      const nodes = targets.map(function (t) {
        return drawStoneG(
          t.fromX,
          t.fromY,
          t.rx,
          t.ry,
          { seed: t.seed, sig: t.sig, n: t.n, t: t.t },
          false,
        );
      });
      const start = performance.now();
      const DUR = 700;
      const fall = (now: number) => {
        if (disposed) return;
        const e = Math.min(1, (now - start) / DUR);
        const kg = e * e; /* accelerate — the pile lets go, it doesn't spring */
        nodes.forEach(function (node, i) {
          const t = targets[i];
          const x = t.fromX + (t.tx - t.fromX) * kg;
          const y = t.fromY + (t.ty - t.fromY) * kg;
          node.setAttribute(
            "transform",
            "translate(" +
              x.toFixed(1) +
              " " +
              y.toFixed(1) +
              ") rotate(" +
              (t.rot * kg).toFixed(1) +
              ")",
          );
        });
        if (e < 1) {
          raf = requestAnimationFrame(fall);
          return;
        }
        targets.forEach(function (t) {
          groundStones.push(groundEntry(t));
        });
        trimGround();
        saveCairn();
        updateCount();
        renderCairn(false);
        cairnBusy = false;
        apiRef.current.sndTok?.();
      };
      raf = requestAnimationFrame(fall);
    }
    function groundEntry(t: FallTarget): GroundStone {
      return {
        x: Math.round(t.tx),
        seed: t.seed,
        sig: t.sig,
        t: t.t,
        n: t.n,
        rx: t.rx,
        ry: t.ry,
      };
    }

    function addStone() {
      if (cairnBusy) return; /* the pile is mid-collapse — let it land */
      const visitorTotal = stackStones.length + groundStones.length;
      const s: StackStone = {
        seed: Math.floor(Math.random() * 1e9),
        sig: visitorTotal % 9 === 8,
        t: Date.now(),
        n: ++stoneSeq,
      };
      try {
        localStorage.setItem("ma-stone-seq", String(stoneSeq));
      } catch {}
      stackStones.push(s);
      saveCairn();
      updateCount();
      const willTopple =
        Math.abs(towerLean()) > LEAN_LIMIT || stackStones.length >= STACK_CAP;
      renderCairn(true);
      later(() => apiRef.current.sndTok?.(), reduced() ? 60 : 340);
      apiRef.current.logAct?.(
        "stone nº " +
          s.n +
          " placed. " +
          (willTopple ? "the stack… hm." : "the stack holds."),
      );
      if (willTopple) {
        cairnBusy = true;
        later(topple, reduced() || stillRef.current ? 260 : 560);
        later(
          () => apiRef.current.logAct?.("the stack fell. we stack again."),
          reduced() || stillRef.current ? 320 : 1300,
        );
      }
    }

    // --- lifecycle plumbing: cancel every rAF / timer on unmount so a
    //     StrictMode remount can't leave two loops fighting one transform.
    //     later() tracks its id, self-removes on fire, and swallows a fire
    //     that lands after unmount (never acts on a torn-down cairn). ---
    let disposed = false;
    let raf = 0;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    function later(fn: () => void, ms: number) {
      const id = setTimeout(() => {
        timers.delete(id);
        if (!disposed) fn();
      }, ms);
      timers.add(id);
      return id;
    }

    renderCairn(false);
    updateCount();

    const onClick = () => addStone();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        addStone();
      }
    };
    yardEl.addEventListener("click", onClick);
    yardEl.addEventListener("keydown", onKey);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      if (fellT) clearTimeout(fellT);
      timers.forEach((id) => clearTimeout(id));
      timers.clear();
      yardEl.removeEventListener("click", onClick);
      yardEl.removeEventListener("keydown", onKey);
      while (pileEl.firstChild) pileEl.removeChild(pileEl.firstChild);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
