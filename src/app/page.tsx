import type { CSSProperties } from "react";
import Hero from "@/components/site/Hero";
import Trail from "@/components/site/Trail";
import WorkIndex from "@/components/site/WorkIndex";
import Desk from "@/components/site/Desk";
import Yard from "@/components/site/Yard";
import Outro from "@/components/site/Outro";

/**
 * Mark Axelus — My Desk (v4)
 *
 * Genuine React/Next rebuild of the searchlight prototype. This composes the
 * fixed print-shop chrome, the post-<main> singleton overlays, and the page
 * sections. SSR ships the SETTLED/printed DOM (no `.unstruck`, no `set-*`
 * arming); the ported motion engine (EngineProvider + hooks, in progress) arms
 * and drives the identical DOM after mount. Every id/class mirrors
 * prototypes/index.html exactly. Fidelity is verified headless (CLAUDE.md §5).
 */
export default function Home() {
  return (
    <>
      {/* LOADER: the make-ready runs isolated in a frame (src set by the engine
          on first visit only). */}
      <div id="makeready">
        <iframe
          id="mr-frame"
          title="Loading"
          tabIndex={-1}
          scrolling="no"
          aria-hidden="true"
        />
      </div>

      {/* grain */}
      <div className="grain" aria-hidden="true" />

      {/* poster frame */}
      <div className="frame" aria-hidden="true" />

      {/* proof-sheet furniture (always present, quiet) */}
      <div className="sheet" aria-hidden="true">
        <span className="crop tl" />
        <span className="crop tr" />
        <span className="crop bl" />
        <span className="crop br" />
        <svg className="regmark" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M10 0v20M0 10h20" stroke="currentColor" strokeWidth="1" />
        </svg>
        <span className="jobline mono">
          SHEET Nº 001 &middot; MARK AXELUS &middot; WORKING PROOF &middot;{" "}
          <span id="job-date" />
          <span id="job-ok" />
        </span>
        <span className="print-slug mono">
          PRINTED FROM THE WORKING PROOF &middot; MRKAXELUS@GMAIL.COM
        </span>
      </div>

      {/* decal furniture: grip tape, hazards, working paint chips, night switch */}
      <span className="tape mono" aria-hidden="true">
        AXELUS &bull; AXELUS &bull; AXELUS &bull; AXELUS
      </span>
      <span className="hazard hz-bl" aria-hidden="true" />
      <span className="hazard hz-r" aria-hidden="true" />

      <div className="chips">
        <span className="chip-static chip-ink" aria-hidden="true" />
        <button className="chip" type="button" data-ai="0" aria-label="Paint it signal blue" style={{ background: "#2A2AF0" }} />
        <button className="chip" type="button" data-ai="1" aria-label="Paint it magenta" style={{ background: "#D6246E" }} />
        <button className="chip" type="button" data-ai="2" aria-label="Paint it acid" style={{ background: "#B4C400" }} />
        <span className="chip-static chip-fade" aria-hidden="true" />
      </div>

      <button className="night-toggle" type="button" id="night-btn" aria-pressed="false">
        [N] NIGHT OFFICE <span className="moon">&#9686;</span>
      </button>
      <button className="noise-toggle" type="button" id="noise-btn" aria-pressed="false">
        [S] PRESS NOISE &mdash; OFF
      </button>

      {/* live telemetry */}
      <span className="d-scroll spec" aria-hidden="true">
        SCROLL <span id="scroll-pct">000</span>%
      </span>

      {/* the impression line */}
      <div className="impline" id="impline" aria-hidden="true">
        <i className="mono">IMPRESSION LINE &mdash; THE SHEET PRINTS AS READ</i>
      </div>

      {/* corner navigation */}
      <a className="corner tl mono" href="#top">MARK AXELUS</a>
      <a className="corner tr mono" href="mailto:mrkaxelus@gmail.com">CONTACT ↗</a>
      <a className="corner bl mono" href="#top">&copy;2026 &mdash; ALL MINE<span id="clock" /></a>
      <button className="corner br mono" id="proof-btn" type="button" aria-pressed="false">
        SEE&nbsp;THE&nbsp;MESS
      </button>

      {/* underdrawing: grid + margin guides (mess mode) */}
      <div className="under" aria-hidden="true" />

      {/* underdrawing: fixed callouts (mess mode) */}
      <div className="proof-fixed" aria-hidden="true">
        <span className="note hand-k n-margin" style={{ "--d": ".10s" } as CSSProperties}>&larr; 2vw. don&rsquo;t touch it, mark.</span>
        <span className="note hand-k n-chips" style={{ "--d": ".46s" } as CSSProperties}>the paint. try the chips.</span>
        <svg className="chip-ring scrawl" viewBox="0 0 118 42" aria-hidden="true">
          <path className="draw" pathLength="1" d="M58,6 C92,4 112,12 110,22 C108,34 84,39 54,37 C26,35 8,28 10,19 C12,9 34,7 62,7" fill="none" />
        </svg>
        <span className="note hand-b n-night" style={{ "--d": ".52s" } as CSSProperties}>for the 2am people ↗</span>
        <div className="stamp" id="stamp">
          <span className="stamp-line1">MARK AXELUS &mdash; WORKING PROOF</span>
          <span className="stamp-line2">STILL NOT DONE</span>
          <span className="stamp-line3 mono">AT MY DESK &middot; <span id="stamp-date" /></span>
        </div>
        <span className="note hand-b n-knows" id="knows-note" style={{ "--d": ".64s" } as CSSProperties} />
      </div>

      <main className="page" id="top">
        {/* the thought-thread (mess only; routed by the engine) */}
        <svg className="thread" id="thread" aria-hidden="true" preserveAspectRatio="none">
          <path id="th-a" className="th-main th-red" fill="none" />
          <path id="th-a-echo" className="th-echo th-red" fill="none" />
          <path id="th-b" className="th-main th-gra" fill="none" />
          <path id="th-b-echo" className="th-echo th-gra" fill="none" />
          <path id="th-spur" className="th-ev th-red" fill="none" pathLength="1" />
          <path id="th-scratch" className="th-ev th-red" fill="none" pathLength="1" />
          <path id="th-arrow" className="th-ev th-gra" fill="none" pathLength="1" />
          <circle id="th-tip" className="th-red" r="4" />
        </svg>

        <Hero />

        {/* kinetic seam */}
        <div className="ticker mono final" aria-hidden="true">
          <div className="ticker-track" id="ticker-track" />
        </div>

        <Trail />
        <WorkIndex />
        <Desk />
        <Yard />
        <Outro />
      </main>

      {/* cairn scroll indicator */}
      <div className="cairn-ind" id="cairn-ind" aria-hidden="true">
        <svg viewBox="0 0 44 120" id="cairn-svg" />
      </div>

      {/* idle whisper */}
      <span className="idle-line mono" id="idle-line" aria-hidden="true">STILL HERE? IT STILL ISN&rsquo;T DONE</span>

      {/* stone hover tip */}
      <div className="stone-tip mono" id="stone-tip" aria-hidden="true" />

      {/* project viewer: each project is its own proof sheet (built by the engine) */}
      <section className="pv" id="pv" role="dialog" aria-modal="true" aria-label="Project proof sheet" />

      {/* signature: cursor-trailing reveal */}
      <div className="reveal" aria-hidden="true">
        <div className="reveal-scaler" id="reveal-scaler">
          <div className="reveal-plate" id="reveal-plate" />
        </div>
      </div>

      {/* the printer's loupe (press and hold a plate) */}
      <div className="loupe" id="loupe" aria-hidden="true" />

      {/* custom cursor */}
      <div className="cursor" id="cursor" aria-hidden="true">
        <span className="cursor-label">PROOF ↗</span>
      </div>
    </>
  );
}
