"use client";

import { useRef, type CSSProperties } from "react";
import { useLine } from "@/app/_engine/line/useLine";

export default function WorkIndex() {
  const rootRef = useRef<HTMLElement>(null);
  useLine(rootRef);

  return (
    <section className="index" id="index" ref={rootRef}>
      <p className="index-head mono final">SELECTED WORK / 2024&ndash;2025</p>
      <p className="index-sub mono final">THE RUN, ON THE LINE &middot; BRUSH A SHEET &middot; IT HOLDS &middot; CLICK &middot; PULL ITS PROOF</p>

      {/* the wire + hardware (cleats, turnbuckle, pulleys, drop-cords) */}
      <svg className="line-wire" id="line-wire" aria-hidden="true"></svg>

      {/* the instrument reads the line */}
      <span className="line-wll mono final" id="line-wll" aria-hidden="true">[W.L.L.] 04 SHEETS &middot; <em>HOLDS</em></span>

      {/* the dock: the run so far, delivered */}
      <div className="line-dock final" id="line-dock" aria-hidden="true">
        <div className="dock-table"></div>
        <div className="dock-stack"><i></i><i></i><i></i><i></i></div>
        <span className="dock-tally mono">DELIVERED SINCE 2019 &middot; ON THE LINE &middot; 004 &middot; <em>NONE HAVE FALLEN</em></span>
      </div>

      {/* coffee ring, sorry */}
      <div className="proof-notes" aria-hidden="true">
        <svg className="note coffee" style={{ "--d": ".20s" } as CSSProperties} viewBox="0 0 160 150">
          <path className="draw" pathLength="1" d="M80,12 C120,10 148,38 146,74 C144,114 114,140 78,138 C40,136 12,110 14,72 C16,36 44,14 80,12 Z" fill="none"/>
          <path className="draw" pathLength="1" d="M80,22 C114,20 138,44 136,74 C134,108 108,130 78,128 C46,126 24,104 26,72 C28,42 50,24 80,22 Z" fill="none" opacity=".55"/>
        </svg>
        <span className="note hand-b n-coffee" style={{ "--d": ".26s" } as CSSProperties}>3am was involved.</span>
        <span className="note hand-b n-time1" style={{ "--d": ".4s" } as CSSProperties}>01:47 - still here.</span>
        <svg className="note scrawl dd-spiral" style={{ "--d": ".5s" } as CSSProperties} viewBox="0 0 50 50" aria-hidden="true">
          <path className="draw" pathLength="1" d="M25,25 C29,21 33,26 29,30 C23,36 15,29 20,21 C26,11 39,16 38,28 C37,41 22,46 13,37" fill="none"/>
        </svg>
        <span className="note hand-k n-redo" style={{ "--d": ".6s" } as CSSProperties}>redo this whole section? <em>- no. - maybe.</em></span>

        {/* the day log, out of order — nothing here happens in a straight line */}
        <span className="note hand-b n-time2" style={{ "--d": ".44s" } as CSSProperties}>23:58 - fixed the kerning.</span>
        <span className="note hand-k n-time3" style={{ "--d": ".58s" } as CSSProperties}>09:12 - it wasn&rsquo;t fixed.</span>
        <svg className="note scrawl dd-burst" style={{ "--d": ".66s" } as CSSProperties} viewBox="0 0 40 40" aria-hidden="true">
          <path className="draw" pathLength="1" d="M20,5 L20,35 M7,12 L33,28 M33,12 L7,28" fill="none"/>
        </svg>

        <div className="note argue" style={{ "--d": ".75s" } as CSSProperties}>
          <span className="hand-k">ship it.</span>
          <span className="hand-b">one more pass.</span>
          <span className="hand-k">you said that in march.</span>
          <span className="hand-b">&hellip;one more pass.</span>
        </div>

        {/* the gauge */}
        <svg className="note scrawl dd-mood" style={{ "--d": ".88s" } as CSSProperties} viewBox="0 0 120 78" aria-hidden="true">
          <path className="draw" pathLength="1" d="M14,64 A46,46 0 0 1 106,64" fill="none"/>
          <path className="draw" pathLength="1" d="M24,50 L29,55 M60,32 L60,40 M96,50 L91,55" fill="none" opacity=".6"/>
          <path className="draw" pathLength="1" d="M60,64 L89,41 M60,68 a4,4 0 1,0 0.1,0" fill="none"/>
        </svg>
        <span className="note hand-b n-mood" style={{ "--d": "1s" } as CSSProperties}>fine &middot; tired &middot; <em>tired but wired</em> &larr;</span>
      </div>

      <a className="row" id="p-01" href="#p-01" data-plate="0">
        <svg className="row-clip" viewBox="0 0 34 22" aria-hidden="true"><rect x="2" y="3" width="30" height="8" rx="2"/><line x1="10" y1="11" x2="10" y2="20"/><line x1="24" y1="11" x2="24" y2="20"/><line x1="10" y1="20" x2="24" y2="20"/><circle cx="17" cy="7" r="1.6"/></svg>
        <span className="row-etch mono final" aria-hidden="true">REF//UVE-24 &middot; CLIPPED ON DELIVERY</span>
        <span className="row-thumb final" aria-hidden="true"></span>
        <span className="row-strip final">
          <span className="row-num mono">01</span>
          <span className="row-title">Uveec</span>
          <span className="row-meta mono">FRONT-END &middot; 2024<span className="row-ref">REF//UVE-24</span></span>
        </span>
        <span className="row-desc mono final">Rebuilt the UVic Environmental Engineering Club&rsquo;s site: dynamic teams, mobile-first, maintainable.</span>
        <span className="note hand-k row-note" style={{ "--d": ".18s" } as CSSProperties} aria-hidden="true">inherited a hardcoded teams page.<br/>made it edit itself.</span>
      </a>

      <a className="row" id="p-02" href="#p-02" data-plate="1">
        <svg className="row-clip" viewBox="0 0 34 22" aria-hidden="true"><rect x="2" y="3" width="30" height="8" rx="2"/><line x1="10" y1="11" x2="10" y2="20"/><line x1="24" y1="11" x2="24" y2="20"/><line x1="10" y1="20" x2="24" y2="20"/><circle cx="17" cy="7" r="1.6"/></svg>
        <span className="row-etch mono final" aria-hidden="true">REF//RLY-25 &middot; CLIPPED ON DELIVERY</span>
        <span className="row-thumb final" aria-hidden="true"></span>
        <span className="row-strip final">
          <span className="row-num mono">02</span>
          <span className="row-title">Relay</span>
          <span className="row-meta mono">FULL-STACK &middot; ONGOING<span className="row-ref">REF//RLY-25</span></span>
        </span>
        <span className="row-desc mono final">A project-management app built for real collaboration: real-time updates, drag-and-drop, Postgres + Prisma.</span>
        <span className="note hand-b row-note" style={{ "--d": ".24s" } as CSSProperties} aria-hidden="true">fought the websocket re-renders.<br/>won, eventually.</span>
      </a>

      <a className="row" id="p-03" href="#p-03" data-plate="2">
        <svg className="row-clip" viewBox="0 0 34 22" aria-hidden="true"><rect x="2" y="3" width="30" height="8" rx="2"/><line x1="10" y1="11" x2="10" y2="20"/><line x1="24" y1="11" x2="24" y2="20"/><line x1="10" y1="20" x2="24" y2="20"/><circle cx="17" cy="7" r="1.6"/></svg>
        <span className="row-etch mono final" aria-hidden="true">REF//PRT-25 &middot; CLIPPED ON DELIVERY</span>
        <span className="row-thumb final" aria-hidden="true"></span>
        <span className="row-strip final">
          <span className="row-num mono">03</span>
          <span className="row-title">Portfolio</span>
          <span className="row-meta mono">UI/UX &middot; 2025<span className="row-ref">REF//PRT-25</span></span>
        </span>
        <span className="row-desc mono final">This very site: static-fast, hand-tuned motion, built and rebuilt to a very high bar.</span>
        <span className="note hand-k row-note" style={{ "--d": ".30s" } as CSSProperties} aria-hidden="true">the fourth version this year.<br/>you&rsquo;re on it.</span>
        <svg className="note num-ring scrawl" style={{ "--d": ".42s" } as CSSProperties} viewBox="0 0 84 58" aria-hidden="true">
          <path className="draw" pathLength="1" d="M42,6 C66,4 80,14 78,28 C76,44 58,53 38,52 C18,51 5,42 7,27 C9,12 24,7 46,7" fill="none"/>
        </svg>
        <span className="note hand-k n-fav" style={{ "--d": ".48s" } as CSSProperties} aria-hidden="true">fav.</span>
      </a>

      <a className="row" id="p-04" href="#p-04" data-plate="3">
        <svg className="row-clip" viewBox="0 0 34 22" aria-hidden="true"><rect x="2" y="3" width="30" height="8" rx="2"/><line x1="10" y1="11" x2="10" y2="20"/><line x1="24" y1="11" x2="24" y2="20"/><line x1="10" y1="20" x2="24" y2="20"/><circle cx="17" cy="7" r="1.6"/></svg>
        <span className="row-etch mono final" aria-hidden="true">REF//SYN-24 &middot; CLIPPED ON DELIVERY</span>
        <span className="row-thumb final" aria-hidden="true"></span>
        <span className="row-strip final">
          <span className="row-num mono">04</span>
          <span className="row-title">Synapse</span>
          <span className="row-meta mono">AI &middot; 2024<span className="row-ref">REF//SYN-24</span></span>
        </span>
        <span className="row-desc mono final">NwHacks: PDFs become editable diagrams. GPT-4 + serverless, under five seconds.</span>
        <span className="note hand-b row-note" style={{ "--d": ".36s" } as CSSProperties} aria-hidden="true">10MB pdf, cold lambda, five seconds.<br/>somehow.</span>
      </a>

      {/* the cat. she just exists — now she sits on the wire.
           (positioned by buildLine; mess layer only, as ever.) */}
      <svg className="note scrawl cat" viewBox="0 0 120 100" aria-hidden="true">
        <path className="draw" pathLength="1" style={{ "--dd": "0s" } as CSSProperties}   d="M45,34 C41,24 44,13 49,9 L55,17 C61,14 68,14 73,17 L80,10 C85,15 86,25 82,33" fill="none"/>
        <path className="draw" pathLength="1" style={{ "--dd": ".1s" } as CSSProperties}  d="M82,33 C87,41 85,50 78,54 C68,59 52,59 46,53 C42,48 43,40 45,34" fill="none"/>
        <path className="draw" pathLength="1" style={{ "--dd": ".22s" } as CSSProperties} d="M80,54 C93,63 99,78 97,98" fill="none"/>
        <path className="draw" pathLength="1" style={{ "--dd": ".34s" } as CSSProperties} d="M50,56 C45,68 45,84 47,98" fill="none"/>
        <path className="draw" pathLength="1" style={{ "--dd": ".46s" } as CSSProperties} d="M56,98 C55,88 57,80 59,76 M66,77 C67,85 67,92 66,98" fill="none"/>
        <path className="draw cat-tail" pathLength="1" style={{ "--dd": ".58s" } as CSSProperties} d="M97,96 C111,92 114,74 100,68" fill="none"/>
        <path className="draw" pathLength="1" style={{ "--dd": ".7s" } as CSSProperties}  d="M36,38 L20,35 M36,44 L21,47 M52,30 C54,28 57,28 59,30 M46,38 L42,42" fill="none"/>
        <path className="draw" pathLength="1" style={{ "--dd": ".82s" } as CSSProperties} d="M68,68 L58,80 M76,72 L64,88 M83,78 L72,93" fill="none" opacity=".6"/>
      </svg>
      <span className="note hand-b n-cat" style={{ "--d": ".9s" } as CSSProperties} aria-hidden="true">not my cat. she keeps coming back.</span>
      <svg className="note scrawl dd-zzz" style={{ "--d": "1.05s" } as CSSProperties} viewBox="0 0 40 40" aria-hidden="true">
        <path className="draw" pathLength="1" d="M6,30 L14,30 L6,38 L14,38" fill="none"/>
        <path className="draw" pathLength="1" d="M17,17 L26,17 L17,26 L26,26" fill="none" opacity=".75"/>
        <path className="draw" pathLength="1" d="M29,5 L37,5 L29,13 L37,13" fill="none" opacity=".5"/>
      </svg>
    </section>
  );
}
