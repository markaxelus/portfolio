"use client";

import { useRef, type CSSProperties } from "react";
import { useCairn } from "@/app/_engine/yard/useCairn";
import { useStoneTip } from "@/app/_engine/yard/useStoneTip";

export default function Yard() {
  const groundRef = useRef<HTMLDivElement>(null);
  const pileRef = useRef<SVGGElement>(null);
  const countRef = useRef<HTMLParagraphElement>(null);

  useCairn({ groundRef, pileRef, countRef });
  useStoneTip(pileRef);

  return (
    <section className="yard" id="yard">
      <div className="yard-head final">
        <p className="mono">PASSERS-BY</p>
        <p className="mono yard-count" id="yard-count" ref={countRef}>LEAVE A STONE</p>
      </div>
      <div className="yard-ground final" id="yard-ground" role="button" tabIndex={0}
           aria-label="Add your stone to the cairn" ref={groundRef}>
        {/* headroom above y0 for the tower to grow before it topples */}
        <svg id="yard-svg" viewBox="0 -80 1000 240" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
          <path id="ground-line" d="M14,144 C180,141 360,146 500,143 C660,140 840,145 986,142"
                fill="none"/>
          <g id="pile" ref={pileRef}></g>
        </svg>
      </div>
      <div className="proof-notes" aria-hidden="true">
        <svg className="note scrawl dd-map" style={{ "--d": ".7s" } as CSSProperties} viewBox="0 0 200 60" aria-hidden="true">
          <path className="draw" pathLength="1" d="M4,18 h34 v22 h-34 z M62,18 h34 v22 h-34 z M120,18 h34 v22 h-34 z M170,20 a12,12 0 1,0 0.1,0" fill="none"/>
          <path className="draw" pathLength="1" d="M40,29 h18 m-6,-4 l6,4 l-6,4 M98,29 h18 m-6,-4 l6,4 l-6,4 M156,30 h10 m-5,-4 l5,4 l-5,4" fill="none"/>
        </svg>
        <span className="note hand-k n-map" style={{ "--d": ".85s" } as CSSProperties}>type &rarr; work &rarr; stones &rarr; you. that&rsquo;s the whole site.</span>
        <span className="note hand-b n-map2" style={{ "--d": "1.05s" } as CSSProperties}>(now with a detour past the day job.)</span>

        {/* the passers-by, at 2am: the cairn topples and we stack again
             (the nerve theme, in the hand) — and the count is read, not just kept */}
        <span className="note hand-b n-cairn-a" style={{ "--d": ".3s" } as CSSProperties}>it topples sometimes.<br/>i stack it again.</span>
        <span className="note hand-k n-cairn-b" style={{ "--d": ".5s" } as CSSProperties}>strangers, all of them.<br/>i&rsquo;ve read every timestamp.</span>
        <svg className="note scrawl dd-cairn-arrow" style={{ "--d": ".62s" } as CSSProperties} viewBox="0 0 70 40" aria-hidden="true">
          <path className="draw" pathLength="1" d="M4,30 C24,30 40,24 56,12 M56,12 l-11,2 M56,12 l1,11" fill="none"/>
        </svg>
        <span className="note hand-k n-cairn-c" style={{ "--d": ".72s" } as CSSProperties}>go on. leave one.</span>

        {/* the failed sketch: he tried to draw the cairn, scribbled it out.
             (it topples. of course it wouldn't sit still for a portrait.) */}
        <svg className="note scrawl dd-tries" style={{ "--d": ".42s" } as CSSProperties} viewBox="0 0 120 76" aria-hidden="true">
          <path className="draw" pathLength="1" d="M34,62 C24,62 20,54 26,50 C16,50 14,40 24,38 C20,30 30,24 38,29 C42,20 56,22 56,31 C66,31 68,42 58,45 C64,52 54,62 44,59 C42,64 36,64 34,62" fill="none"/>
          <path className="draw" pathLength="1" d="M10,56 C34,42 58,32 74,22 M8,46 C32,34 56,26 72,16 M14,64 C38,52 62,42 78,32" fill="none" opacity=".8"/>
        </svg>
        <span className="note hand-k n-tries" style={{ "--d": ".58s" } as CSSProperties}>tried to sketch the cairn.<br/>can&rsquo;t. it won&rsquo;t sit still.</span>
      </div>
    </section>
  );
}
