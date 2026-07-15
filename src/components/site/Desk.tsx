import type { CSSProperties } from "react";

export default function Desk() {
  return (
    <section className="desk" id="desk">
      <p className="desk-head mono final">AT THE DESK &mdash; RIGHT NOW-ISH</p>
      <div className="desk-rows">
        <div className="desk-row final"><span className="mono desk-k">BUILDING</span><span className="desk-v">This site. Again.</span></div>
        <div className="desk-row final"><span className="mono desk-k">READING</span><span className="desk-v">The Shape of Design, again</span></div>
        <div className="desk-row final"><span className="mono desk-k">LISTENING</span><span className="desk-v">The same three albums, on loop</span></div>
        <div className="desk-row final"><span className="mono desk-k">COFFEE</span><span className="desk-v">Nº 094 this quarter</span></div>
      </div>

      {/* the operator's plate: the person, printed in the site's inks.
           screened duotone + one misregistered red pass on the FINAL layer;
           the mess holds the unscreened original, taped over it. */}
      <figure className="op" id="op" aria-label="Portrait of Mark Axelus, printed as a halftone plate">
        <svg className="op-print final" viewBox="0 0 800 1000" role="img"
             aria-label="Mark Axelus &mdash; one ink and one red pass">
          <defs>
            <filter id="op-duo" colorInterpolationFilters="sRGB">
              <feColorMatrix type="saturate" values="0"/>
              <feComponentTransfer>
                <feFuncR type="table" tableValues="0.086 1"/>
                <feFuncG type="table" tableValues="0.082 1"/>
                <feFuncB type="table" tableValues="0.059 1"/>
              </feComponentTransfer>
            </filter>
            <filter id="op-red" colorInterpolationFilters="sRGB">
              <feColorMatrix type="saturate" values="0"/>
              <feComponentTransfer>
                <feFuncR type="table" tableValues="0.780 1"/>
                <feFuncG type="table" tableValues="0.212 1"/>
                <feFuncB type="table" tableValues="0.122 1"/>
              </feComponentTransfer>
            </filter>
            <pattern id="op-ht" width="9" height="9" patternUnits="userSpaceOnUse">
              <circle cx="4.5" cy="4.5" r="1.5" fill="#DDDBD4"/>
            </pattern>
            <filter id="op-gr"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
          </defs>
          <rect width="800" height="1000" fill="#DDDBD4"/>
          <g className="op-redpass" opacity="0.55">
            <image href="/operator.jpg" width="800" height="1000" preserveAspectRatio="xMidYMid slice" filter="url(#op-red)"/>
          </g>
          <g className="op-inkpass">
            <image href="/operator.jpg" width="800" height="1000" preserveAspectRatio="xMidYMid slice" filter="url(#op-duo)"/>
          </g>
          <rect width="800" height="1000" fill="url(#op-ht)" opacity="0.12"/>
          <g transform="rotate(-90 44 500)"><text x="44" y="500" textAnchor="middle"
              fontFamily="monospace" fontSize="17" letterSpacing="5" fill="#16150F" opacity="0.55">M.A. &#8212; THE OPERATOR &#183; PROOF 00/04 &#183; NOT FOR PRODUCTION</text></g>
          <rect width="800" height="1000" filter="url(#op-gr)" opacity="0.12"/>
        </svg>
        <figcaption className="op-cap mono final">THE OPERATOR &mdash; M. AXELUS<br/>ONE INK + ONE RED PASS<br/>NOT RETOUCHED</figcaption>
        <div className="op-candid" aria-hidden="true">
          <img src="/operator.jpg" alt="" loading="lazy"/>
          <span className="note hand-k n-opc" style={{ "--d": ".9s" } as CSSProperties}>me, apparently.</span>
        </div>
      </figure>
      <div className="proof-notes" aria-hidden="true">
        <span className="note hand-k n-desk" style={{ "--d": ".2s" } as CSSProperties}>update this, mark. it&rsquo;s been three weeks.</span>
        <svg className="note scrawl dd-cup" style={{ "--d": ".34s" } as CSSProperties} viewBox="0 0 60 70" aria-hidden="true">
          <path className="draw" pathLength="1" d="M13,32 C12,44 15,56 18,58 C24,61 36,61 40,57 C43,52 45,40 44,31" fill="none"/>
          <path className="draw" pathLength="1" d="M11,31 C20,34 38,34 46,30" fill="none"/>
          <path className="draw" pathLength="1" d="M45,36 C52,34 54,44 47,48" fill="none"/>
          <path className="draw" pathLength="1" d="M22,22 C20,16 26,14 24,8 M32,23 C30,17 36,15 34,9" fill="none" opacity=".7"/>
        </svg>
        <svg className="note scrawl dd-tally" style={{ "--d": ".44s" } as CSSProperties} viewBox="0 0 100 32" aria-hidden="true">
          <path className="draw" pathLength="1" d="M8,6 L10,26 M17,5 L18,27 M26,6 L27,26 M35,5 L36,27 M3,24 L42,8" fill="none"/>
          <path className="draw" pathLength="1" d="M54,6 L56,26 M63,5 L64,27 M72,6 L73,26" fill="none"/>
        </svg>
        <span className="note hand-b n-tally" style={{ "--d": ".54s" } as CSSProperties}>lost count in march.</span>
        <span className="note hand-k n-cmath" style={{ "--d": ".7s" } as CSSProperties}>31 + 28 + 35 = 94. recounted. twice.</span>

        {/* the pen test: every real margin has the corner where the pen
             got scribbled back to life */}
        <svg className="note scrawl dd-pentest" style={{ "--d": ".86s" } as CSSProperties} viewBox="0 0 96 56" aria-hidden="true">
          <path className="draw" pathLength="1" d="M6,42 C10,28 20,26 24,34 C28,42 20,50 14,44 C8,38 16,28 28,27 C40,26 42,38 34,43 C26,48 40,20 52,18 C64,16 62,32 52,36 C44,39 56,46 66,41" fill="none"/>
          <path className="draw" pathLength="1" d="M70,38 C76,30 84,24 92,21" fill="none" opacity=".5"/>
        </svg>
        <span className="note hand-k n-pentest" style={{ "--d": ".98s" } as CSSProperties}>new pen. testing, testing. it&rsquo;s fine.</span>

        <div className="note todo" style={{ "--d": ".66s" } as CSSProperties}>
          <span className="todo-head mono">TODAY &mdash;</span>
          <span className="hand-k struck">fix the kerning</span>
          <span className="hand-k struck">invoice meridian</span>
          <span className="hand-k struck">reply to emails</span>
          <span className="hand-k struck">ship v4</span>
          <span className="hand-k">touch grass</span>
          <span className="hand-b">(tomorrow)</span>
        </div>

        {/* the record: it spins for as long as the mess is open */}
        <svg className="note scrawl dd-vinyl" style={{ "--d": ".5s" } as CSSProperties} viewBox="0 0 150 115" aria-hidden="true">
          <g className="vinyl-spin">
            <circle className="draw" pathLength="1" cx="62" cy="58" r="42" fill="none"/>
            <circle className="draw" pathLength="1" cx="62" cy="58" r="33" fill="none" opacity=".5"/>
            <circle className="draw" pathLength="1" cx="62" cy="58" r="26" fill="none" opacity=".35"/>
            <circle className="draw" pathLength="1" cx="62" cy="58" r="13" fill="none"/>
            <path className="draw" pathLength="1" d="M62,54 a4,4 0 1,0 0.1,0" fill="none"/>
            <path className="draw" pathLength="1" d="M77,29 L88,45" fill="none" opacity=".55"/>
          </g>
          <path className="draw" pathLength="1" d="M124,14 L124,52 C124,62 114,64 109,57" fill="none"/>
          <path className="draw" pathLength="1" d="M118,10 L130,10" fill="none" opacity=".6"/>
        </svg>
        <svg className="note scrawl dd-notes" style={{ "--d": ".68s" } as CSSProperties} viewBox="0 0 70 46" aria-hidden="true">
          <path className="draw" pathLength="1" d="M12,34 a5,3.6 0 1,0 0.1,0 M16,33 V12 L34,7 V28 M30,32 a5,3.6 0 1,0 0.1,0" fill="none"/>
          <path className="draw" pathLength="1" d="M52,26 a4,3 0 1,0 0.1,0 M55,25 V8 C60,10 62,13 60,18" fill="none" opacity=".7"/>
        </svg>
        <span className="note hand-k n-vinyl" style={{ "--d": ".8s" } as CSSProperties}>side B. again.</span>
      </div>
    </section>
  );
}
