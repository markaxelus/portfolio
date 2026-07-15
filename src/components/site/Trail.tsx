"use client";

import { useRef, type CSSProperties } from "react";
import { useTrail } from "@/app/_engine/trail/use-trail";

export default function Trail() {
  const rootRef = useRef<HTMLElement>(null);
  useTrail(rootRef);
  return (
    <section className="trail" id="trail" ref={rootRef}>
      <div className="trail-frame final">
        <p className="trail-head mono">FIG.1 &mdash; THE TRAIL SO FAR</p>
        <p className="trail-cap mono">ONE STONE PER YEAR THAT MATTERED &middot; 2019&ndash;2026 &middot; NOT TO SCALE</p>
      </div>
      <div className="terrain final" id="terrain">
        <svg className="terrain-ground" id="terrain-ground" aria-hidden="true" preserveAspectRatio="none"></svg>
        <div className="terrain-stones">
          <div className="stone-slot" style={{ "--sz": ".74", "--lift": "3" } as CSSProperties}>
            <svg className="mile-stone" viewBox="0 0 60 34" aria-hidden="true"></svg>
          </div>
          <div className="stone-slot" style={{ "--sz": "1.16", "--lift": "-9" } as CSSProperties}>
            <svg className="mile-stone" viewBox="0 0 60 34" aria-hidden="true"></svg>
          </div>
          <div className="stone-slot" style={{ "--sz": ".86", "--lift": "6" } as CSSProperties}>
            <svg className="mile-stone" viewBox="0 0 60 34" aria-hidden="true"></svg>
          </div>
          <div className="stone-slot stone-gap" aria-hidden="true"><span className="gap-tick"></span></div>
          <div className="stone-slot" style={{ "--sz": "1", "--lift": "-6" } as CSSProperties}>
            <svg className="mile-stone" viewBox="0 0 60 34" aria-hidden="true"></svg>
          </div>
          <div className="stone-slot is-now" style={{ "--sz": "1.08", "--lift": "-28" } as CSSProperties}>
            <svg className="mile-stone" viewBox="0 0 60 34" aria-hidden="true"></svg>
          </div>
        </div>
        <div className="terrain-labels">
          <div className="mile-label"><p className="mile-year mono">2019</p><p className="mile-fact">Still in high school. The code stuck anyway.</p></div>
          <div className="mile-label"><p className="mile-year mono">2022</p><p className="mile-fact">Chose CS at university. The plan was marine biology.</p></div>
          <div className="mile-label"><p className="mile-year mono">2023</p><p className="mile-fact">First all-nighter that produced something worth keeping.</p></div>
          <div className="mile-label mile-label-gap"><p className="mile-year mono">2024</p><p className="mile-fact gap-fact">&mdash;</p></div>
          <div className="mile-label"><p className="mile-year mono">2025</p><p className="mile-fact">The university started paying me to build AI systems.</p></div>
          <div className="mile-label"><p className="mile-year mono is-now-year">2026</p><p className="mile-fact">You&rsquo;re here, reading this.</p></div>
        </div>
      </div>
      <div className="proof-notes" aria-hidden="true">
        <span className="note hand-k mile-note" style={{ "--d": ".1s", left: "4%" } as CSSProperties}>in class. under the desk.</span>
        <span className="note hand-k mile-note" style={{ "--d": ".2s", left: "23%" } as CSSProperties}>wanted whales. got compilers.</span>
        <span className="note hand-k mile-note" style={{ "--d": ".3s", left: "53%" } as CSSProperties}>the all-nighter worked. once.</span>
        <span className="note hand-k mile-note" style={{ "--d": ".4s", left: "70%" } as CSSProperties}>terrifying. correct.</span>
        <span className="note hand-k mile-note" style={{ "--d": ".5s", left: "87%" } as CSSProperties}>leave a stone on the way out.</span>
        <span className="note hand-b n-gap" style={{ "--d": ".6s" } as CSSProperties}>the gap in 2024? we don&rsquo;t talk about 2024.</span>
        <span className="note hand-k n-2025" style={{ "--d": ".7s" } as CSSProperties}>an actual salary. wild.</span>

        <svg className="note scrawl dd-ttt" style={{ "--d": ".85s" } as CSSProperties} viewBox="0 0 90 90" aria-hidden="true">
          <path className="draw" pathLength="1" d="M33,8 L30,82 M62,6 L60,84 M6,32 L84,30 M8,62 L82,60" fill="none"/>
          <path className="draw" pathLength="1" d="M12,12 L26,26 M26,12 L12,26 M40,40 L54,54 M54,40 L40,54 M68,66 L82,80 M82,66 L68,80" fill="none"/>
          <path className="draw" pathLength="1" d="M47,10 m8,8 a8,8 0 1,0 0.1,0 M19,40 m8,8 a8,8 0 1,0 0.1,0 M47,66 m8,8 a8,8 0 1,0 0.1,0" fill="none"/>
        </svg>
        <span className="note hand-b n-ttt" style={{ "--d": "1s" } as CSSProperties}>cat&rsquo;s game. both players were me.</span>
      </div>
    </section>
  );
}
