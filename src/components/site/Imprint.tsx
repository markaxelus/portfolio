/**
 * THE IMPRINT — THE TWO SHIFTS. The colophon seam between the trail (how I
 * got here) and the work (what I made), set at poster scale: the stage is one
 * bordered plate SPLIT at a hard seam into the two shifts of the same life.
 * SHIFT 01 is the day panel (sheet-light: OceanAID, the junior title, the
 * hours); SHIFT 02 is the night panel (ink-dark: MY DESK, no closing time).
 * The panels keep their literal inks in BOTH site modes: the shifts are
 * absolute, so by day the night panel burns dark, and in the night office the
 * day panel glows light. The voice line and the engraved marlin both CROSS
 * the seam and change ink mid-stroke (two identical copies, clip-path cut at
 * --seam) — one person, printed across both worlds.
 *
 * Life: the voice line rides the hold-register (shears with scroll; the
 * punch line keeps its permanent knock), the desk clock marks the RUNNING
 * shift on the kickers (.shf-row/.shf-on, EngineProvider tick), the marlin's
 * red pass drifts off register as a page-awake act and slides home on hover.
 * The seeded set-in arrival arms `.imp-piece` (armGroup); resting tilts live
 * on inner elements so the two never fight. FINAL layer only: no hand marks.
 * Reflows to plain flow on the pocket sheet; prints as flowed facts.
 */

/* the engraved marlin, drawn once — body/sail/tail linework + hatch + the
   red working pass. Rendered twice (day inks / night inks) and clipped at
   the seam so the fish changes colour where it crosses. */
function MarlinSVG() {
  return (
    <svg viewBox="0 0 220 120">
      <g className="dev-ghost">
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
    </svg>
  );
}

/* the voice line, rendered once per ink copy — identical markup so the two
   clipped copies register perfectly */
function VoiceLines() {
  return (
    <>
      <b className="il1">Still one person,</b>
      <b className="il2">one desk.</b>
      <b className="il3">Now with a day job.</b>
    </>
  );
}

export default function Imprint() {
  return (
    <section className="imprint" id="imprint">
      <div className="imp-frame final">
        <p className="imp-head mono">THE IMPRINT</p>
        <p className="imp-cap mono">WHO&rsquo;S AT THE DESK &middot; AND WHERE</p>
      </div>

      <div className="imp-split">
        {/* the voice line owns the day panel's top; the marlin is the one
            seam-crosser (two crossers in one band read as noise). FIRST in
            DOM so the pocket sheet flows it above the panels; z-lifted on
            the wide plate so the panels' ink fields never paint over it. */}
        <div className="imp-piece imp-line final">
          <div className="imp-rot"><VoiceLines /></div>
        </div>

        {/* SHIFT 01 — the day panel: sheet-light, the employer's hours */}
        <div className="imp-piece imp-shift imp-day final">
          <p className="ish-k shf-row mono">SHIFT 01 &middot; 09:00 → 17:00</p>
          <a className="ish-emp" href="https://oceanaid.ca" target="_blank" rel="noopener">
            OceanAID<span className="ish-ext mono" aria-hidden="true">&nbsp;↗</span>
          </a>
          <p className="ish-t mono">JUNIOR SOFTWARE ENGINEER</p>
          <p className="ish-d mono">MAY 2026 → NOW &middot; VICTORIA BC</p>
          <p className="ish-prev mono">
            BEFORE ▸ UNIVERSITY OF VICTORIA &middot; AI SYSTEMS DEVELOPER &middot; OCT 2025 → MAY 2026
          </p>
        </div>

        {/* SHIFT 02 — the night panel: ink-dark, the desk's hours */}
        <div className="imp-piece imp-shift imp-night final">
          <p className="ish-k shf-row mono">SHIFT 02 &middot; 23:00 → ?</p>
          <span className="ish-emp">My desk.</span>
          <p className="ish-t mono">OWNER &middot; OPERATOR &middot; JANITOR</p>
          <p className="ish-d mono">EST. 2022 → NO CLOSING TIME</p>
          <p className="ish-tonight mono">TONIGHT ▸ THIS PAGE, AGAIN</p>
          <span className="imp-regx" aria-hidden="true" />
          <span className="imp-sq" aria-hidden="true" />
        </div>

        {/* MAKAIRA sp. leaps the seam — day inks left of the cut, night inks
            right of it. Hover slides the red pass into register. */}
        <div className="imp-piece imp-marlin final" aria-hidden="true">
          <div className="m-copy m-day"><MarlinSVG /></div>
          <div className="m-copy m-night"><MarlinSVG /></div>
          <span className="im-cap mono">MAKAIRA sp. &middot; CROSSES THE SEAM NIGHTLY</span>
        </div>

        {/* the seam itself, named and dated */}
        <span className="imp-seam mono final" aria-hidden="true">
          THE SEAM &middot; ONE PERSON, BOTH SIDES
        </span>
      </div>

      {/* the hand-off down into the work */}
      <div className="imp-piece imp-kick final" aria-hidden="true">
        <div className="imp-rot mono">PULLED FROM THE RUN ↓</div>
      </div>
    </section>
  );
}
