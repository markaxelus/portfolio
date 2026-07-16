/**
 * THE IMPRINT — the statutory line.
 *
 * In the shop's own law an imprint is not a section, it is a REQUIREMENT:
 * every printed sheet must carry one line naming its printer and where it
 * was printed. That is exactly what this seam has to say (who's at the desk
 * · and where), so the section IS that line — one sentence, set large and
 * ragged: "Set, printed & kept by one person, days at OceanAID, nights at
 * his own desk, Victoria BC." The facts hang off its clauses as the shop's
 * margin instruments (shift windows, the title, the prior press, the
 * printer named) the way axis labels hang off the specimen. No slab, no
 * scraps, no mascot — the type is the object.
 *
 * Life (concept-motivated): the desk clock lights the clause that is TRUE
 * right now — ● RUNNING rides SHIFT 01 (09–17) or SHIFT 02 (23–06) on the
 * two .shf-row markers (EngineProvider tick, DOM order = day then night);
 * the sentence rides the hold-register (.imp-line shears with scroll,
 * thunks home when still); the pieces are tossed on by the seeded set-in
 * (.imp-piece, use-setting). FINAL layer — machine-set, no hand marks.
 * Prints as flowed black facts (a statutory line that prints is the point).
 */
export default function Imprint() {
  return (
    <section className="imprint" id="imprint">
      <div className="imp-frame final">
        <p className="imp-head mono">THE IMPRINT</p>
        <p className="imp-cap mono">WHO&rsquo;S AT THE DESK &middot; AND WHERE</p>
      </div>

      <div className="imp-stage final">
        {/* the legal fiction, named — the sheet declares its own maker */}
        <p className="imp-req mono imp-piece">
          AS REQUIRED ON EVERY PRINTED SHEET:
        </p>

        {/* the statutory line — hold-register wrapper (.imp-line takes .regel) */}
        <div className="imp-line">
          <p className="il il1 imp-piece">Set, printed &amp; kept</p>
          <p className="il il2 imp-piece">by one person,</p>
          <p className="il il3 imp-piece">
            days at{" "}
            <a
              className="imp-oa"
              href="https://oceanaid.ca"
              target="_blank"
              rel="noopener"
            >
              OceanAID<span className="imp-ext mono" aria-hidden="true">&#8202;&#8599;</span>
            </a>
            ,
          </p>
          <p className="il il4 imp-piece">nights at his own desk,</p>
          <p className="il il5 imp-piece">
            <span className="imp-lead" aria-hidden="true" />
            Victoria&nbsp;BC.
          </p>
        </div>

        {/* the margin instruments — the facts, hung off their clauses;
            .shf-row order is the engine contract: day first, night second */}
        <div className="imp-rail">
          <div className="imp-ann mono imp-piece">
            <p className="ia-k">
              <span className="shf-row">SHIFT 01 &middot; WEEKDAYS 09&ndash;17</span>
            </p>
            <p className="ia-v">JUNIOR SOFTWARE ENGINEER</p>
            <p className="ia-v">SINCE MAY 2026</p>
          </div>
          <div className="imp-ann mono imp-piece">
            <p className="ia-k">
              <span className="shf-row">SHIFT 02 &middot; 23&ndash;06, MOSTLY</span>
            </p>
            <p className="ia-v">OWNER &middot; OPERATOR &middot; JANITOR</p>
            <p className="ia-v">EST. 2022 &middot; NO CLOSING TIME</p>
          </div>
        </div>

        {/* the fine print — the prior press + the printer, named */}
        <div className="imp-foot mono imp-piece">
          <p>BEFORE &middot; AI SYSTEMS DEVELOPER &middot; UNIVERSITY OF VICTORIA &middot; 2024&ndash;26</p>
          <p>THE PRINTER &middot; M. AXELUS &middot; ONE PERSON, BOTH SHIFTS</p>
        </div>

        {/* the folio — edition mark */}
        <div className="imp-fol mono imp-piece" aria-hidden="true">
          <svg className="imp-reg" viewBox="0 0 26 26">
            <circle className="rr" cx="13" cy="13" r="7" />
            <line className="rk" x1="13" y1="0" x2="13" y2="26" />
            <line className="rk" x1="0" y1="13" x2="26" y2="13" />
          </svg>
          <span className="imp-fol-t">ED. N&ordm; 4 &middot; 2026</span>
        </div>
      </div>
    </section>
  );
}
