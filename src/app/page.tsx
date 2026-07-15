"use client";

/**
 * Mark Axelus — My Desk (v4)
 *
 * Genuine React/Next rebuild of the searchlight prototype. Built section by
 * section: this file composes the fixed print-shop chrome + the page sections.
 * The seeded-motion engine is ported into hooks under _engine/ (in progress);
 * every id/class here mirrors prototypes/index.html exactly so the ported
 * engine drives the identical DOM. Fidelity is verified headless, never judged
 * in the preview pane (see prototypes/CLAUDE.md §5).
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
      <a className="corner tr mono" href="mailto:mrkaxelus@gmail.com">CONTACT &nearr;</a>
      <a className="corner bl mono" href="#top">&copy;2026 &mdash; ALL MINE<span id="clock" /></a>
      <button className="corner br mono" id="proof-btn" type="button" aria-pressed="false">
        SEE&nbsp;THE&nbsp;MESS
      </button>

      {/* underdrawing: grid + margin guides (mess mode) */}
      <div className="under" aria-hidden="true" />

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

        {/* hero (shell — full section + engine ported next) */}
        <section className="hero" id="hero">
          <p className="eyebrow mono final">( ONE-PERSON PRACTICE &mdash; <em>EST. 2019</em> )</p>
          <h1 className="hero-title final v3" id="hero-title">
            <span className="amp" id="amp" data-ink="">&amp;</span>
            <span className="v3-words">
              <span className="v3-word v3-mark" id="markw" data-ink="">Mark</span>
              <span className="v3-word v3-desk" id="deskw" data-ink="">My&nbsp;desk</span>
            </span>
          </h1>
          <aside className="hero-bio mono final" id="hero-bio">
            I&rsquo;m Mark, a software engineer.<br />
            One person, one desk, a very high bar.<br />
            This is the fourth version this year; the first three weren&rsquo;t good enough.
          </aside>
        </section>
      </main>
    </>
  );
}
