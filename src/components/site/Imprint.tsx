/**
 * THE IMPRINT — the colophon seam between the trail (how I got here) and the
 * work (what I made): who is at the desk, and where. A print colophon, NOT a CV
 * — the current role is the off-register focal decal, the previous role a tilted
 * entry, and a marlin billfish decal (signal blue reads as ocean) tags the
 * employer, OceanAID. FINAL layer only: no hand marks live here (they belong to
 * the mess).
 *
 * Asymmetric by the site's law. Deliberate resting tilts live on the inner
 * `.imp-rot` wrappers; the seeded set-in arrival (armed on `.imp-piece` by
 * use-setting's armGroup) rides the OUTER element and settles to `transform:
 * none`, so the two never fight. Structure mirrors Trail: a header rule
 * (`.imp-frame`) over a positioned stage (`.imp-stage`). Static markup — the
 * client SETTING hook arms it by selector; reflows to plain flow on the pocket
 * sheet and in print.
 */
export default function Imprint() {
  return (
    <section className="imprint" id="imprint">
      <div className="imp-frame final">
        <p className="imp-head mono">THE IMPRINT</p>
        <p className="imp-cap mono">WHO’S AT THE DESK · AND WHERE</p>
      </div>

      <div className="imp-stage">
        {/* the voice line: the hero motif, now admitting the day job (crooked,
            with the punch line knocked off register) */}
        <div className="imp-piece imp-line final">
          <div className="imp-rot">
            <b className="il1">Still one person,</b>
            <b className="il2">one desk.</b>
            <b className="il3">Now with a day job.</b>
          </div>
        </div>

        {/* the current role: the focal decal, pinned right, off register */}
        <div className="imp-piece imp-role final">
          <div className="imp-rot">
            <span className="ir-k mono">CURRENTLY ▸</span>
            <span className="ir-emp">OceanAID</span>
            <span className="ir-t mono">SOFTWARE ENGINEER</span>
            <span className="ir-d mono">MAY 2026 → NOW</span>
          </div>
        </div>

        {/* MAKAIRA — the marlin, for OceanAID: accent ink under a misregistered
            red pass, swimming the measured void */}
        <div className="imp-piece imp-marlin final" aria-hidden="true">
          <div className="imp-rot">
            <svg viewBox="0 0 210 104">
              <path
                className="fish-ghost"
                transform="translate(3,2)"
                d="M204,48 L132,44 C124,42 122,40 120,38 C110,26 100,15 92,10 C88,21 84,31 78,37 C62,41 48,42 34,45 C24,38 14,32 6,27 C16,39 22,45 26,51 C20,59 14,67 6,75 C18,64 28,58 36,55 C54,57 70,58 86,59 C90,67 94,73 100,79 C102,71 100,63 104,58 C112,56 122,55 130,53 L204,48 Z"
              />
              <path
                className="fish-main"
                d="M204,46 L132,42 C124,40 122,38 120,36 C110,24 100,13 92,8 C88,19 84,29 78,35 C62,39 48,40 34,43 C24,36 14,30 6,25 C16,37 22,43 26,49 C20,57 14,65 6,73 C18,62 28,56 36,53 C54,55 70,56 86,57 C90,65 94,71 100,77 C102,69 100,61 104,56 C112,54 122,53 130,51 L204,46 Z"
              />
              <path className="fish-line" d="M120,44 C90,46 60,48 34,46" />
              <path className="fish-gill" d="M116,33 C114,40 114,48 117,54" />
              <circle className="fish-eye" cx="126" cy="41" r="2.4" />
            </svg>
            <span className="im-cap mono">MAKAIRA sp. · OCEANAID</span>
          </div>
        </div>

        {/* before OceanAID: the previous role, a tilted entry */}
        <div className="imp-piece imp-prev final">
          <div className="imp-rot">
            <span className="ip-k mono">BEFORE</span>
            <span className="ip-emp">University of Victoria</span>
            <span className="ip-t mono">AI SYSTEMS DEVELOPER</span>
            <span className="ip-d mono">OCT 2025 → MAY 2026</span>
          </div>
        </div>

        {/* print furniture filling the measured void */}
        <span className="imp-regx" aria-hidden="true" />
        <span className="imp-sq s1" aria-hidden="true" />
        <span className="imp-sq s2" aria-hidden="true" />

        {/* the hand-off down into the work */}
        <div className="imp-piece imp-kick final" aria-hidden="true">
          <div className="imp-rot mono">PULLED FROM THE RUN ↓</div>
        </div>
      </div>
    </section>
  );
}
