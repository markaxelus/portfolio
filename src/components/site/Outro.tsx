import type { CSSProperties } from "react";

export default function Outro() {
  return (
    <section className="outro">
      <span className="d-outro spec final decode" tabIndex={0}><span className="c1">094&#10042; &nbsp;00//WC</span><span className="c2">coffees this quarter. and counting.</span></span>
      <h2 className="outro-title final">Got a brief?<br/><a href="mailto:mrkaxelus@gmail.com" id="write-link">Write to me.</a></h2>
      <div className="amark scrawl" id="amark-write" aria-hidden="true">
        <svg viewBox="0 0 200 90" preserveAspectRatio="none">
          <path className="draw" pathLength="1" d="M100,8 C158,4 194,22 192,46 C190,74 148,86 92,84 C42,82 8,68 10,44 C12,20 52,10 106,10" fill="none"/>
        </svg>
      </div>

      {/* the ok slip: you've read the sheet — you're the press-check
           client now. initials are machine-set (typed, never handwritten:
           the hand belongs to the mess); the stamps commit on a hold,
           and say so on their face. */}
      {/* THE PRESS-CHECK PAIR: approve (the slip) | witness (the log), side by side */}
      <div className="check-pair">
      <div className="okslip final" id="okslip">
        <p className="ok-head mono">PRESS CHECK &mdash; APPROVAL</p>
        <p className="ok-sheet mono">SHEET Nº 001 &middot; WORKING PROOF &middot; <span id="ok-date"></span></p>
        <label className="ok-by mono">CHECKED BY
          <input id="ok-initials" type="text" maxLength={4} autoComplete="off"
                 spellCheck="false" placeholder="&middot;&middot;&middot;&middot;" aria-label="Your initials"/>
        </label>
        <div className="ok-tabs">
          <button className="ok-tab mono" type="button" data-verdict="ok" aria-pressed="false">OK TO PRINT<em>HOLD</em></button>
          <button className="ok-tab mono" type="button" data-verdict="corr" aria-pressed="false">OK W/ CORRECTIONS<em>HOLD</em></button>
          <button className="ok-tab mono" type="button" data-verdict="re" aria-pressed="false">REPROOF<em>HOLD</em></button>
        </div>
        <p className="ok-fine mono">HOLD A STAMP TO COMMIT &middot; ENTER WORKS TOO &middot; RE-STAMPS NOTED</p>
        <div className="ok-stamp mono" id="ok-stamp" aria-live="polite"></div>
      </div>
      {/* the job log: the shop witnesses you — beside the check now */}
      <div className="joblog mono final" id="joblog" hidden>
        <p className="jl-head">THE JOB LOG &mdash;</p>
        <div className="jl-scroll">
          <ul id="jl-lines"></ul>
          <div className="jl-rail" id="jl-rail" aria-hidden="true"><span className="jl-thumb" id="jl-thumb"></span></div>
        </div>
        <p className="jl-fine">THIS LOG PRINTS ON YOUR COPY ONLY. SHOP POLICY.</p>
      </div>
      </div>{/* /check-pair */}

      <div className="outro-rail">
      <div className="outro-links final">
        <a className="olink mono" href="mailto:mrkaxelus@gmail.com">
          <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"><rect x="1.4" y="3.6" width="13.2" height="8.8" rx="1"/><path d="M2 4.7 8 9 14 4.7"/></svg>EMAIL&nbsp;↗
        </a>
        <div className="olink-row">
        <a className="olink mono" href="https://github.com/markaxelus" target="_blank" rel="noopener">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>GITHUB&nbsp;↗
        </a>
        <a className="olink mono" href="https://www.linkedin.com/in/markaxelus" target="_blank" rel="noopener">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M14.816 0H1.18C.528 0 0 .516 0 1.153v13.694C0 15.484.528 16 1.18 16h13.635c.652 0 1.185-.516 1.185-1.153V1.153C16 .516 15.468 0 14.816 0ZM4.745 13.635H2.37V6h2.375v7.635ZM3.558 4.955a1.376 1.376 0 1 1 0-2.752 1.376 1.376 0 0 1 0 2.752Zm10.074 8.68h-2.37V9.922c0-.886-.018-2.025-1.234-2.025-1.235 0-1.424.964-1.424 1.96v3.778h-2.37V6H8.51v1.04h.033c.317-.6 1.09-1.233 2.246-1.233 2.4 0 2.843 1.58 2.843 3.637v4.191Z"/></svg>LINKEDIN&nbsp;↗
        </a>
        </div>
      </div>

      {/* THE MAKER'S MARK: the approved job-code device — a coarse Data-Matrix-style
           grid (decorative, gapped chunky modules) with an off-register red pass behind
           it, off-square brackets, a reg cross + acid tick, techwear labels. modules
           injected by main.js; everything themes with the sheet (day/night). */}
      <figure className="pressmark final">
        <svg className="pm-svg" viewBox="0 0 200 250" role="img" aria-labelledby="pm-title">
          <title id="pm-title">Mark Axelus &mdash; maker's mark</title>
          <path className="pm-brk" d="M26 58 V38 H48"/>
          <path className="pm-brk" d="M174 212 V232 H152"/>
          <g className="pm-ghost" id="pm-ghost" transform="translate(55 69)"></g>
          <g className="pm-code" id="pm-cells" transform="translate(52 66)"></g>
          <g className="pm-reg"><circle cx="162" cy="58" r="4.5"/><path d="M162 50 V66 M154 58 H170"/></g>
          <rect className="pm-acid" x="150" y="150" width="7" height="7"/>
          <text className="pm-lbl pm-dim pm-r" x="178" y="88">JOB Nº 07</text>
          <text className="pm-lbl pm-dim pm-r" x="178" y="104">DATA // MA</text>
          <text className="pm-lbl pm-name" x="28" y="198">MRK // AXELUS</text>
          <text className="pm-lbl pm-dim" x="28" y="212">WORKING PROOF</text>
          <text className="pm-lbl pm-dim pm-r" x="172" y="228">SCANS TRUE &middot; MMXIX</text>
        </svg>
      </figure>

      <p className="colophon mono final">SET IN FRAUNCES, EXCON &amp; SPACE MONO ( + TWO PENS )<br/>
        NO FRAMEWORK &middot; NO TRACKERS &middot; HAND-BUILT<br/>
        24PX GRID &middot; 3 INKS &middot; 1 CAT<span id="colo-pulled"></span></p>
      </div>{/* /outro-rail */}

      <div className="proof-notes" aria-hidden="true">
        <span className="note hand-k big-line" style={{ "--d": ".2s" } as CSSProperties}>it just never stops, does it.</span>
        <span className="note hand-b big-reply" style={{ "--d": ".45s" } as CSSProperties}>you love it though. &mdash; 2am me</span>
        <svg className="note scrawl dd-moon" style={{ "--d": ".6s" } as CSSProperties} viewBox="0 0 48 44" aria-hidden="true">
          <path className="draw" pathLength="1" d="M30,6 C16,10 14,30 28,36 C18,38 8,30 10,18 C12,8 22,4 30,6" fill="none"/>
          <path className="draw" pathLength="1" d="M40,12 L40,20 M36,16 L44,16" fill="none" opacity=".7"/>
          <path className="draw" pathLength="1" d="M42,28 L42,33 M39.5,30.5 L44.5,30.5" fill="none" opacity=".45"/>
        </svg>
        <svg className="note scrawl dd-plane" style={{ "--d": ".7s" } as CSSProperties} viewBox="0 0 80 54" aria-hidden="true">
          <path className="draw" pathLength="1" d="M8,42 L70,10 M70,10 L38,36 M38,36 L34,48 L30,37 M30,37 L8,42" fill="none"/>
          <path className="draw" pathLength="1" d="M4,50 C14,48 20,50 26,46" fill="none" opacity=".5"/>
        </svg>
        <span className="note hand-k n-outro" style={{ "--d": ".85s" } as CSSProperties}>you read my margins &mdash; mention the stones when you write.</span>
        <span className="note hand-b n-uplate" style={{ "--d": ".95s" } as CSSProperties}>you&rsquo;re up late too?</span>

        {/* the mess argues with the verdict (text set by main.js) */}
        <span className="note hand-k n-okr1" id="ok-reply1" style={{ "--d": ".5s" } as CSSProperties}></span>
        <span className="note hand-b n-okr2" id="ok-reply2" style={{ "--d": ".7s" } as CSSProperties}></span>
        <span className="note hand-b n-okr3" id="ok-reply3" style={{ "--d": ".9s" } as CSSProperties}></span>

        {/* the maker's mark gets fact-checked, obviously */}
        <span className="note hand-b n-pm" style={{ "--d": ".9s" } as CSSProperties}>it scans. tested it at 3am.<br/>it just says my name.</span>
        <svg className="note scrawl dd-pm-arrow" style={{ "--d": "1.02s" } as CSSProperties} viewBox="0 0 70 34" aria-hidden="true">
          <path className="draw" pathLength="1" d="M4,28 C24,26 44,18 62,8 M62,8 l-11,1 M62,8 l-3,10" fill="none"/>
        </svg>

        <svg className="note scrawl dd-rip" style={{ "--d": "1.1s" } as CSSProperties} viewBox="0 0 150 70" aria-hidden="true">
          <path className="draw" pathLength="1" d="M8,64 C8,40 10,26 24,25 C38,26 40,40 40,64" fill="none"/>
          <path className="draw" pathLength="1" d="M58,64 C58,42 60,28 73,27 C86,28 88,42 88,64" fill="none"/>
          <path className="draw" pathLength="1" d="M106,64 C106,44 108,30 121,29 C134,30 136,44 136,64" fill="none"/>
          <path className="draw" pathLength="1" d="M2,66 L146,66" fill="none"/>
          <path className="draw" pathLength="1" d="M18,44 L30,44 M24,38 L24,52 M67,44 L79,44 M73,38 L73,52 M115,46 L127,46 M121,40 L121,54" fill="none"/>
        </svg>
        <span className="note hand-b n-rip" style={{ "--d": "1.25s" } as CSSProperties}>house rules &middot; the skills grid &middot; the peel.<br/>we don&rsquo;t talk about the peel.</span>
      </div>
    </section>
  );
}
