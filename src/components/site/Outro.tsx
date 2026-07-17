"use client";

import { useRef, type CSSProperties } from "react";
import { useJobLog } from "@/app/_engine/outro/useJobLog";
import { useOkSlip } from "@/app/_engine/outro/useOkSlip";
import { PM_MODULE, PM_RECTS } from "@/app/_engine/outro/pressmark";
import OutroPocketInk from "./OutroPocketInk";

/**
 * THE OUTRO — THE BUNDLE (the finished run, tied for handoff).
 *
 * The section's object is a TIED BUNDLE of sheets — the way a real shop
 * hands a finished job over: a loose stack at varied small leans (the
 * site's own pile language), string crossed diagonally over everything,
 * knotted at the button. No jacket, no box — the container law holds
 * (a full rectangle outline reads as a box and dies; the STRING is what
 * says \u201cdelivered\u201d, never the outline):
 *   · the TOP SHEET is the docket — JOB Nº header, the PRESS CHECK form
 *     (same #okslip machinery: initials, three hold-to-commit pads, the
 *     steel stamp that thunks over the sheet edge), and the RETURN
 *     address that makes the headline literal,
 *   · the MAKER'S MARK is the franking, overhanging the docket's corner,
 *     cancelled with wave bars (POSTAGE PAID · THE DESK),
 *   · the PACKING SLIP (the job log) is the sheet beneath, exposed along
 *     the bundle's foot,
 *   · EMAIL / GITHUB / LINKEDIN poke out from BETWEEN the sheets like
 *     file tabs,
 *   · the STRING ties the stack shut, PLEASE DO NOT BEND stamped along
 *     its run; the red working pass rides the tie off register and
 *     slides home on hover (the plate gesture).
 * "Got a brief? / Write to me." stays the display voice, left, over the
 * spec; the bundle sits on the right, grazing past the sheet edge.
 * FINAL layer — machine-set; the mess argues in the margins as always.
 */

/* the tie, drawn OVER the stack: two string runs crossing at the button,
   the loose tail, the cancellation waves into the franking corner, the
   courtesy line stamped along the run. Strokes keep width under the
   nonuniform scale (vector-effect); one red pass rides the tie. */
function TieSVG() {
  return (
    <svg className="bd-tie" viewBox="0 0 600 820" preserveAspectRatio="none" aria-hidden="true">
      {/* the two runs — near-straight, wrapping corner to corner; they
          cross in the docket's quiet lower-right. Endpoints sit ON the
          sheet edges (start: the back sheet's crown/side, end: the packing
          slip's foot) so the string never floats in air or stops short */}
      <path pathLength={1} className="pk-string pk-draw" style={{ "--ikd": "1.28s", "--ikdur": "0.6s" } as React.CSSProperties} d="M107,12 C242,339 378,605 513,809" />
      <path pathLength={1} className="pk-string pk-draw" style={{ "--ikd": "1.56s", "--ikdur": "0.6s" } as React.CSSProperties} d="M562,38 C495,297 429,557 362,816" />
      {/* the button + the figure-8 knot at the crossing */}
      <circle className="pk-line pk-fade" style={{ "--ikd": "1.12s" } as React.CSSProperties} cx="414" cy="615" r="9" />
      <circle className="pk-dot pk-fade" style={{ "--ikd": "1.18s" } as React.CSSProperties} cx="414" cy="615" r="2.2" />
      <path pathLength={1} className="pk-string pk-draw" style={{ "--ikd": "1.86s", "--ikdur": "0.45s" } as React.CSSProperties} d="M405,608 C392,623 432,627 423,607 C416,595 398,601 402,615" />
      {/* the loose tail — the knot never quite finished */}
      <path pathLength={1} className="pk-string pk-draw" style={{ "--ikd": "2.06s", "--ikdur": "0.5s" } as React.CSSProperties} d="M420,625 C446,662 431,692 459,721 C469,729 477,725 471,717" />
      {/* the cancellation — wave bars into the franking corner */}
      <g style={{ opacity: 0.55 } as React.CSSProperties}>
        <path pathLength={1} className="pk-fine pk-draw" style={{ "--ikd": "2.28s" } as React.CSSProperties} d="M408,82 q12,-8 24,0 t24,0 t24,0" />
        <path pathLength={1} className="pk-fine pk-draw" style={{ "--ikd": "2.36s" } as React.CSSProperties} d="M422,104 q12,-8 24,0 t24,0" />
        <path pathLength={1} className="pk-fine pk-draw" style={{ "--ikd": "2.45s" } as React.CSSProperties} d="M408,126 q12,-8 24,0 t24,0 t24,0" />
      </g>
      {/* the courtesy line — stamped on the exposed foot, a touch off true;
          set narrow so the stamp stays on the sheet at every desktop width */}
      <g className="pk-fade" transform="rotate(-2 420 743)" style={{ "--fop": 0.5, "--ikd": "2.6s" } as React.CSSProperties}>
        <text className="pk-txt" x="401" y="743" fontSize="10" letterSpacing="1.6">PLEASE DO NOT BEND</text>
        <text className="pk-txt" x="401" y="759" fontSize="10" letterSpacing="1.6">IT&rsquo;S BEEN THROUGH</text>
        <text className="pk-txt" x="401" y="775" fontSize="10" letterSpacing="1.6">ENOUGH</text>
      </g>
      {/* the red working pass — the tie prints last, just off register */}
      <g className="dev-ghost" style={{ "--ikd": "2.85s" } as React.CSSProperties}>
        <path d="M107,12 C242,339 378,605 513,809" />
        <path d="M562,38 C495,297 429,557 362,816" />
        <circle cx="414" cy="615" r="9" fill="none" />
      </g>
    </svg>
  );
}

export default function Outro() {
  const rootRef = useRef<HTMLElement>(null);
  // the shop witnesses you (owns api.logAct) — mounted first so the OK slip's
  // stamp can hand it a line
  useJobLog(rootRef);
  // the visitor signs the press check (calls api.logAct + api.sndTok)
  useOkSlip(rootRef);

  return (
    <section className="outro" ref={rootRef}>
      <span className="d-outro spec final decode" tabIndex={0}><span className="c1">094&#10042; &nbsp;00//WC</span><span className="c2">coffees this quarter. and counting.</span></span>
      <h2 className="outro-title final">Got a brief?<br/><a href="mailto:mrkaxelus@gmail.com" id="write-link">Write to me.</a></h2>
      <div className="amark scrawl" id="amark-write" aria-hidden="true">
        <svg viewBox="0 0 200 90" preserveAspectRatio="none">
          <path className="draw" pathLength="1" d="M100,8 C158,4 194,22 192,46 C190,74 148,86 92,84 C42,82 8,68 10,44 C12,20 52,10 106,10" fill="none"/>
        </svg>
      </div>

      {/* the spec: what a brief needs, in the docket's own voice — the
          column the headline opens is measured, not empty */}
      <div className="brief-spec mono final">
        <p className="bs-head">A BRIEF, FOR THIS SHOP &mdash;</p>
        <p className="bs-row"><span className="bs-n">01</span>THE PROBLEM, IN A SENTENCE</p>
        <p className="bs-row"><span className="bs-n">02</span>THE DEADLINE, HONESTLY</p>
        <p className="bs-row"><span className="bs-n">03</span>THE BUDGET, ROUGHLY</p>
        <p className="bs-fine">EVERYTHING ELSE IS OPTIONAL &middot; A PLAIN EMAIL BEATS A DECK</p>
      </div>

      {/* THE BUNDLE — a loose stack at varied leans, tied shut. The rest
          leans live on the sheets; set-in ends at transform:none on the
          wrapper, so it never fights them. */}
      <div className="pocket final" id="pocket">
        <div className="bd">
          {/* the plain proof peeking from the back of the stack */}
          <span className="bd-sheet bd-s1 pk-fade" style={{ "--ikd": "0.05s" } as CSSProperties} aria-hidden="true" />

          {/* the packing slip sheet — exposed along the bundle's foot */}
          <div className="bd-sheet bd-s2 pk-fade" style={{ "--ikd": "0.2s" } as CSSProperties}>
            <div className="pf joblog mono" id="joblog" style={{ "--ikd": "0.1s" } as CSSProperties} hidden>
              <p className="jl-head">THE JOB LOG &mdash;</p>
              <div className="jl-scroll">
                <ul id="jl-lines"></ul>
                <div className="jl-rail" id="jl-rail" aria-hidden="true"><span className="jl-thumb" id="jl-thumb"></span></div>
              </div>
              <p className="jl-fine">THIS LOG PRINTS ON YOUR COPY ONLY. SHOP POLICY.</p>
            </div>
          </div>

          {/* the routing tabs — poking out from between the sheets */}
          <div className="pf outro-links bd-tabs" style={{ "--ikd": "0.95s" } as CSSProperties}>
            <a className="olink mono" href="mailto:mrkaxelus@gmail.com">
              <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"><rect x="1.4" y="3.6" width="13.2" height="8.8" rx="1"/><path d="M2 4.7 8 9 14 4.7"/></svg>EMAIL&nbsp;↗
            </a>
            <a className="olink mono" href="https://github.com/markaxelus" target="_blank" rel="noopener">
              <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>GITHUB&nbsp;↗
            </a>
            <a className="olink mono" href="https://www.linkedin.com/in/markaxelus" target="_blank" rel="noopener">
              <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M14.816 0H1.18C.528 0 0 .516 0 1.153v13.694C0 15.484.528 16 1.18 16h13.635c.652 0 1.185-.516 1.185-1.153V1.153C16 .516 15.468 0 14.816 0ZM4.745 13.635H2.37V6h2.375v7.635ZM3.558 4.955a1.376 1.376 0 1 1 0-2.752 1.376 1.376 0 0 1 0 2.752Zm10.074 8.68h-2.37V9.922c0-.886-.018-2.025-1.234-2.025-1.235 0-1.424.964-1.424 1.96v3.778h-2.37V6H8.51v1.04h.033c.317-.6 1.09-1.233 2.246-1.233 2.4 0 2.843 1.58 2.843 3.637v4.191Z"/></svg>LINKEDIN&nbsp;↗
            </a>
          </div>

          {/* THE DOCKET — the top sheet; its matter flows */}
          <div className="bd-sheet bd-s3 pk-fade" style={{ "--ikd": "0.35s" } as CSSProperties}>
            <p className="pf pkt-job mono" style={{ "--ikd": "0.5s" } as CSSProperties}>JOB N&ordm; 004 &mdash; THE WORKING PROOF</p>

            {/* the docket form: you've read the sheet — you're the press-check
                client. initials are machine-set (typed, never handwritten:
                the hand belongs to the mess); the stamps commit on a hold,
                and say so on their face. */}
            <div className="pf okslip" id="okslip" style={{ "--ikd": "0.62s" } as CSSProperties}>
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

            {/* the return address — the headline, made literal */}
            <div className="pf pkt-addr" style={{ "--ikd": "0.8s" } as CSSProperties}>
              <p className="pkt-kick mono">RETURN TO &mdash;</p>
              <p className="pkt-name">Mark Axelus</p>
              <p className="pkt-meta mono">AT HIS DESK &middot; VICTORIA BC &middot; NO CLOSING TIME</p>
            </div>

            {/* the franking — the maker's mark overhangs the docket corner */}
            <figure className="pf pressmark" style={{ "--ikd": "0.9s" } as CSSProperties}>
              <svg className="pm-svg" viewBox="0 0 200 250" role="img" aria-labelledby="pm-title">
                <title id="pm-title">Mark Axelus &mdash; maker's mark</title>
                <path className="pm-brk" d="M26 58 V38 H48"/>
                <path className="pm-brk" d="M174 212 V232 H152"/>
                <g className="pm-ghost" id="pm-ghost" transform="translate(55 69)">
                  {PM_RECTS.map((m) => (
                    <rect key={"g" + m.key} x={m.x} y={m.y} width={PM_MODULE} height={PM_MODULE} />
                  ))}
                </g>
                <g className="pm-code" id="pm-cells" transform="translate(52 66)">
                  {PM_RECTS.map((m) => (
                    <rect key={"c" + m.key} x={m.x} y={m.y} width={PM_MODULE} height={PM_MODULE} />
                  ))}
                </g>
                <g className="pm-reg"><circle cx="162" cy="58" r="4.5"/><path d="M162 50 V66 M154 58 H170"/></g>
                <rect className="pm-acid" x="150" y="150" width="7" height="7"/>
                <text className="pm-lbl pm-dim pm-r" x="178" y="88">JOB Nº 004</text>
                <text className="pm-lbl pm-dim pm-r" x="178" y="104">DATA // MA</text>
                <text className="pm-lbl pm-name" x="28" y="198">MRK // AXELUS</text>
                <text className="pm-lbl pm-dim" x="28" y="212">WORKING PROOF</text>
                <text className="pm-lbl pm-dim pm-r" x="172" y="228">SCANS TRUE &middot; MMXIX</text>
              </svg>
            </figure>
          </div>

          <TieSVG />
        </div>
      </div>
      <OutroPocketInk />

      {/* scattered furniture — punctuate the void between type and pocket */}
      <span className="out-sq" aria-hidden="true" />
      <span className="out-tick" aria-hidden="true" />

      {/* the colophon tells the truth: v2 runs on a framework, so the old
          NO FRAMEWORK boast became a lie — the working proof admits it
          instead (same register as STILL NOT DONE) */}
      <p className="colophon mono final">SET IN FRAUNCES, EXCON &amp; SPACE MONO ( + TWO PENS )<br/>
        HAND-SET &middot; NO TRACKERS &middot; ONE FRAMEWORK, ADMITTED<br/>
        24PX GRID &middot; 3 INKS &middot; 1 CAT<span id="colo-pulled"></span></p>

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
