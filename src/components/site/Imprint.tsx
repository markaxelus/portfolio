/**
 * THE IMPRINT — the colophon seam between the trail (how I got here) and the
 * work (what I made): who is at the desk, and where. Set as a real IMPRESSUM,
 * the bordered imprint block every printed sheet carries: presswork entries
 * typeset as a ledger, and the marlin re-cut as an engraved printer's device
 * at the foot (Aldus kept a dolphin; this shop keeps a marlin — OceanAID's
 * signal-blue billfish, in linework with the red working pass, never a flat
 * mascot). The voice line (the hero motif, now admitting the day job) hands
 * across a dashed seam to the block. FINAL layer only: no hand marks.
 *
 * Asymmetric by the site's law. Deliberate resting tilts live on the inner
 * `.imp-rot` wrappers; the seeded set-in arrival (armed on `.imp-piece` by
 * use-setting's armGroup) rides the OUTER element and settles to `transform:
 * none`, so the two never fight. Structure mirrors Trail: a header rule
 * (`.imp-frame`) over a two-column stage (`.imp-stage`). Static markup — the
 * client SETTING hook arms it by selector; reflows to plain flow on the pocket
 * sheet and in print.
 */
export default function Imprint() {
  return (
    <section className="imprint" id="imprint">
      <div className="imp-frame final">
        <p className="imp-head mono">THE IMPRINT</p>
        <p className="imp-cap mono">WHO&rsquo;S AT THE DESK &middot; AND WHERE</p>
      </div>

      <div className="imp-stage">
        {/* the voice column: the hero motif admits the day job (crooked, the
            punch line knocked off register), then hands down into the run */}
        <div className="imp-voice">
          <div className="imp-piece imp-line final">
            <div className="imp-rot">
              <b className="il1">Still one person,</b>
              <b className="il2">one desk.</b>
              <b className="il3">Now with a day job.</b>
            </div>
          </div>
          {/* the aside: the admission typeset small, machine-set (no hand) */}
          <div className="imp-piece imp-note final">
            <div className="imp-rot mono">
              <span>THE DESK DIDN&rsquo;T MOVE. THE HOURS DID.</span>
              <span>OCEANAID GETS THE DAYLIGHT.</span>
              <span>THIS SHEET GETS WHAT&rsquo;S LEFT.</span>
            </div>
          </div>
          <div className="imp-piece imp-kick final" aria-hidden="true">
            <div className="imp-rot mono">PULLED FROM THE RUN ↓</div>
          </div>
        </div>

        {/* the seam itself: the dashed fold between the trail above and the
            run below, named and dated (the day the day job started) */}
        <span className="imp-seam mono final" aria-hidden="true">
          THE SEAM &middot; TRAIL ABOVE &middot; RUN BELOW &middot; CUT MAY 2026
        </span>

        {/* the imprint block proper: the bordered impressum — presswork,
            place, and the printer's device at the foot */}
        <div className="imp-piece imp-block final">
          <div className="imp-rot">
            <header className="ib-head mono">
              <span>PRESSWORK &amp; PLACE</span>
              <span className="ib-reg" aria-hidden="true" />
            </header>

            <div className="ib-entry ib-now">
              <span className="ib-k mono">CURRENTLY ▸</span>
              <span className="ib-emp">OceanAID</span>
              <span className="ib-meta mono">SOFTWARE ENGINEER &middot; MAY 2026 → NOW</span>
            </div>

            <div className="ib-entry ib-prev">
              <span className="ib-k mono">BEFORE</span>
              <span className="ib-emp">University of Victoria</span>
              <span className="ib-meta mono">AI SYSTEMS DEVELOPER &middot; OCT 2025 → MAY 2026</span>
            </div>

            {/* MAKAIRA — the engraved device: ink linework, accent hatching
                on the sail, the red pass a breath off register */}
            <figure className="ib-device" aria-hidden="true">
              <svg viewBox="0 0 220 120">
                <g className="dev-ghost" transform="translate(2.5,2)">
                  <path d="M72,48 C94,41 126,38 160,44 C166,45 170,46 173,48 C170,50 166,52 160,53 C128,60 96,62 84,58 C78,56 73,53 72,51 Z" />
                  <path d="M86,44 C90,26 98,14 108,12 C124,10 140,22 152,42" />
                  <path d="M170,44 C182,34 196,24 206,14 M206,14 C192,30 186,40 184,48 C186,56 192,68 206,86 M170,52 C182,62 196,74 206,86" />
                </g>
                <path
                  className="dev-body"
                  d="M72,48 C94,41 126,38 160,44 C166,45 170,46 173,48 C170,50 166,52 160,53 C128,60 96,62 84,58 C78,56 73,53 72,51 Z"
                />
                <path className="dev-body" d="M72,48.5 L10,57 L72,51.5" />
                <path className="dev-body" d="M86,44 C90,26 98,14 108,12 C124,10 140,22 152,42" />
                <g className="dev-hatch">
                  <path d="M94,40 L98,24" />
                  <path d="M102,38 L108,17" />
                  <path d="M110,37 L118,15" />
                  <path d="M119,37 L128,17" />
                  <path d="M128,38 L138,22" />
                  <path d="M137,39 L146,28" />
                </g>
                <path className="dev-tail" d="M170,44 C182,34 196,24 206,14" />
                <path className="dev-tail" d="M206,14 C192,30 186,40 184,48 C186,56 192,68 206,86" />
                <path className="dev-tail" d="M170,52 C182,62 196,74 206,86" />
                <path className="dev-fin" d="M92,54 C102,64 112,70 120,72" />
                <path className="dev-gill" d="M88,45 C85,50 85,55 88,59" />
                <path className="dev-lat" d="M78,51 C110,52 140,51 168,49" />
                <circle className="dev-eye" cx="80" cy="47" r="2.2" />
                <path className="dev-wave" d="M26,100 q9,-7 18,0 t18,0 t18,0" />
                <path className="dev-wave" d="M130,106 q9,-7 18,0 t18,0" />
                <path className="dev-wave" d="M84,111 q7,-5 14,0 t14,0" />
              </svg>
              <figcaption className="mono">DEVICE OF OCEANAID &middot; MAKAIRA sp.</figcaption>
            </figure>

            <footer className="ib-foot mono">THE DESK ▸ PACIFIC TIME &middot; STILL RUNS LATE</footer>
          </div>
        </div>

        {/* print furniture measuring the margins */}
        <span className="imp-regx" aria-hidden="true" />
        <span className="imp-sq s1" aria-hidden="true" />
        <span className="imp-sq s2" aria-hidden="true" />
      </div>
    </section>
  );
}
