import ImprintChartInk from "./ImprintChartInk";

/**
 * THE IMPRINT — FIG.2, THE DESK, SURVEYED (who's at the desk · and where).
 *
 * The section's object is a torn-out fragment of an ENGRAVED PLAN — the
 * desk itself, drawn from above like an architect's survey: hatched walls,
 * the desk at its working angle (keyboard, screens, the mug with its
 * critical coffee radius, the proof stack, the type case, a dashed circle
 * held RESERVED), dimension lines, the door marked IN / OUT · RARELY. The
 * night station is THE CHAIR (the registration cross, SHIFT 02 · 23–06);
 * the day station is OFF THE PLAN — the commute dashes off the sheet's
 * edge (SHIFT 01). That is the employer-proof fiction: whatever the day
 * job is — any company, any sector, a startup — it is simply the station
 * off this plan. Nothing in the figure names or resembles an employer;
 * the plan never changes when life does.
 *
 * Life (concept-motivated): the plan INKS ITSELF IN stroke-by-stroke as
 * it enters (strike = ink; ImprintChartInk arms it, SSR ships it drawn);
 * the RED WORKING PASS rides off register and slides home on hover (the
 * operator-plate gesture; the page-awake act drifts it further out); the
 * desk clock lights ● RUNNING on the station whose shift is live (the two
 * .shf-row markers, EngineProvider tick, DOM order = day then night); the
 * voice line rides the hold-register (.imp-line shears with scroll); the
 * pieces are tossed on by the seeded set-in (.imp-piece). FINAL layer —
 * machine-set, no hand marks.
 */

/* THE FACTS — the only lines that change when life does. The plan never
   names the employer (its day station is simply OFF THE PLAN), so a new
   job, a startup, or no logo at all is an edit HERE and nowhere else.
   url is optional — without it the credit sets as plain type, no link. */
const SHIFT01 = {
  name: "OceanAID",
  url: "https://oceanaid.ca" as string | null,
  title: "JUNIOR SOFTWARE ENGINEER · VICTORIA BC",
  kick: "CURRENTLY · MAY 2026 —",
  hours: "09–17",
};
const BEFORE = "BEFORE — AI SYSTEMS DEVELOPER · UNIV. OF VICTORIA · 2025–26";

/* the plan plate: walls, the desk at its angle, the chair (night station),
   the commute off the sheet — engraved in the site's own inks, red pass
   off register */
function PlanSVG() {
  const T = (x: number, y: number, s: number, o: number, d: string, txt: string, rot?: number, ls?: number) => (
    <text
      className="ck-txt ck-fade"
      x={x}
      y={y}
      fontSize={s}
      letterSpacing={ls ?? 2}
      transform={rot ? `rotate(${rot} ${x} ${y})` : undefined}
      style={{ "--fop": o, "--ikd": d } as React.CSSProperties}
    >
      {txt}
    </text>
  );
  return (
    <svg viewBox="0 0 780 560" aria-hidden="true">
      {/* neatline ticks — the two untorn edges */}
      <g className="ck-fine ck-fade" style={{ "--fop": 0.35, "--ikd": "0.12s" } as React.CSSProperties}>
        {[56, 124, 192, 260, 328, 396, 464, 532, 600, 668, 736].map((x) => (
          <path key={"nt" + x} d={`M${x},2 L${x},9`} />
        ))}
        {[36, 104, 172, 240, 308, 376, 444, 512].map((y) => (
          <path key={"nr" + y} d={`M771,${y} L778,${y}`} />
        ))}
      </g>

      {/* the cartouche */}
      <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.18s" } as React.CSSProperties} d="M26,26 L282,26" />
      {T(26, 46, 12, 0.85, "0.26s", "FIG.2 — THE DESK, SURVEYED", undefined, 2.6)}
      {T(26, 61, 8.5, 0.55, "0.34s", "PLAN VIEW · SCALE 1:1 · DRAWN AT VICTORIA BC", undefined, 1.6)}

      {/* the walls — double line + section hatching; the door gap low-left */}
      <path pathLength={1} className="ck-wall ck-draw" style={{ "--ikd": "0s" } as React.CSSProperties} d="M36,108 L745,108" />
      <path pathLength={1} className="ck-wall ck-draw" style={{ "--ikd": "0.06s" } as React.CSSProperties} d="M36,120 L745,120" />
      <path pathLength={1} className="ck-wall ck-draw" style={{ "--ikd": "0.10s" } as React.CSSProperties} d="M54,120 L54,384 M66,120 L66,384" />
      <path pathLength={1} className="ck-wall ck-draw" style={{ "--ikd": "0.16s" } as React.CSSProperties} d="M54,448 L54,478 M66,448 L66,478" />
      <g className="ck-hatch">
        {[90, 152, 214, 276, 338, 400, 462, 524, 586, 648, 710].map((x, i) => (
          <path key={"wh" + x} pathLength={1} className="ck-draw" style={{ "--ikd": (0.08 + (i % 5) * 0.07).toFixed(2) + "s" } as React.CSSProperties} d={`M${x},108 L${x - 11},120`} />
        ))}
        {[140, 176, 212, 248, 284, 320, 356].map((y, i) => (
          <path key={"lh" + y} pathLength={1} className="ck-draw" style={{ "--ikd": (0.12 + (i % 4) * 0.08).toFixed(2) + "s" } as React.CSSProperties} d={`M54,${y} L66,${y + 11}`} />
        ))}
      </g>
      {/* the door: leaf + dashed swing */}
      <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "0.42s" } as React.CSSProperties} d="M66,388 L128,412" />
      <path className="ck-fine ck-fade" strokeDasharray="4 5" style={{ "--fop": 0.45, "--ikd": "0.52s" } as React.CSSProperties} d="M128,412 A66,66 0 0 1 66,446" />
      {T(88, 486, 8, 0.45, "0.9s", "IN / OUT · RARELY", undefined, 1.6)}

      {/* the floorboards — faint working grid */}
      <g className="ck-rhumb ck-fade" style={{ "--fop": 0.12, "--ikd": "0.45s" } as React.CSSProperties}>
        {[250, 290, 330, 370, 410, 450].map((y) => (
          <path key={"fb" + y} d={`M90,${y} L730,${y}`} />
        ))}
      </g>

      {/* THE DESK — at its working angle, everything aboard */}
      <g transform="translate(330,268) rotate(-7)">
        <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "0.30s" } as React.CSSProperties} d="M-160,-66 L160,-66 L160,66 L-160,66 Z" />
        {/* screens */}
        <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "0.44s" } as React.CSSProperties} d="M-125,-56 L-15,-56 L-15,-42 L-125,-42 Z" />
        <circle className="ck-fine ck-fade" cx="-70" cy="-34" r="3.5" style={{ "--fop": 0.6, "--ikd": "0.5s" } as React.CSSProperties} />
        <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "0.48s" } as React.CSSProperties} d="M0,-54 L60,-54 L60,-42 L0,-42 Z" />
        {/* keyboard + mouse */}
        <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "0.56s" } as React.CSSProperties} d="M-80,-6 L40,-6 L40,28 L-80,28 Z" />
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.64s" } as React.CSSProperties} d="M-80,6 L40,6 M-80,17 L40,17" />
        <circle className="ck-fine ck-fade" cx="58" cy="12" r="6" style={{ "--fop": 0.6, "--ikd": "0.66s" } as React.CSSProperties} />
        {/* the mug + its critical radius */}
        <circle className="ck-line ck-fade" cx="108" cy="-28" r="13" style={{ "--fop": 1, "--ikd": "0.60s" } as React.CSSProperties} />
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.68s" } as React.CSSProperties} d="M121,-34 a8,8 0 0 1 0,12" />
        <circle className="ck-fine ck-fade" cx="108" cy="-28" r="48" strokeDasharray="5 6" style={{ "--fop": 0.4, "--ikd": "0.72s" } as React.CSSProperties} />
        {/* the proof stack */}
        <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "0.58s" } as React.CSSProperties} d="M55,30 L125,30 L125,62 L55,62 Z" />
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.62s" } as React.CSSProperties} d="M60,26 L130,26 L130,58" />
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.7s" } as React.CSSProperties} d="M65,22 L135,22 L135,54" />
        {/* the type case */}
        <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "0.52s" } as React.CSSProperties} d="M-150,20 L-95,20 L-95,56 L-150,56 Z" />
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.6s" } as React.CSSProperties} d="M-131,20 L-131,56 M-113,20 L-113,56 M-150,38 L-95,38" />
        {/* dimensions — the surveyor was thorough */}
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.78s" } as React.CSSProperties} d="M-160,-70 L-160,-96 M160,-70 L160,-96 M-160,-90 L160,-90" />
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.82s" } as React.CSSProperties} d="M-160,-90 l9,-3 M-160,-90 l9,3 M160,-90 l-9,-3 M160,-90 l-9,3" />
        <text className="ck-txt ck-fade" x="-16" y="-96" fontSize={9} letterSpacing={1.5} style={{ "--fop": 0.6, "--ikd": "0.88s" } as React.CSSProperties}>1400</text>
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.8s" } as React.CSSProperties} d="M164,-66 L192,-66 M164,66 L192,66 M186,-66 L186,66" />
        <text className="ck-txt ck-fade" x="194" y="6" fontSize={9} letterSpacing={1.5} transform="rotate(90 194 6)" style={{ "--fop": 0.6, "--ikd": "0.92s" } as React.CSSProperties}>600</text>
      </g>
      {/* held for the resident of the mess layer — floor box, never stacked */}
      <circle className="ck-fine ck-fade" cx="642" cy="452" r="22" strokeDasharray="4 5" style={{ "--fop": 0.5, "--ikd": "0.85s" } as React.CSSProperties} />
      {T(504, 498, 8, 0.5, "0.94s", "RESERVED · DO NOT STACK", undefined, 1.6)}
      <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.9s" } as React.CSSProperties} d="M398,192 L290,174" />
      {T(100, 170, 8, 0.5, "0.96s", "COFFEE RADIUS · CRITICAL", undefined, 1.6)}

      {/* THE CHAIR — the night station, held by the registration cross */}
      <g style={{ "--ikd": "0.55s" } as React.CSSProperties}>
        <circle className="ck-line ck-fade" cx="390" cy="392" r="24" style={{ "--fop": 1, "--ikd": "0.55s" } as React.CSSProperties} />
        <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "0.6s" } as React.CSSProperties} d="M362,402 A30,30 0 0 0 418,402" />
        <circle className="ck-fine ck-fade" cx="390" cy="392" r="7" style={{ "--fop": 0.75, "--ikd": "0.63s" } as React.CSSProperties} />
        <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "0.66s" } as React.CSSProperties} d="M390,380 L390,404 M378,392 L402,392" />
      </g>

      {/* the commute — SHIFT 01 exits the plan; wherever the day job is,
          it is off this sheet */}
      <path className="ck-route ck-fade" strokeDasharray="7 6" style={{ "--fop": 0.75, "--ikd": "0.50s" } as React.CSSProperties} d="M408,374 C490,340 600,280 748,196" />
      <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.6s" } as React.CSSProperties} d="M732,210 L748,194 L728,186" />
      <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.62s" } as React.CSSProperties} d="M448,346 L434,359 L450,365" />
      {T(490, 278, 10, 0.5, "0.84s", "THE COMMUTE · TWICE DAILY", -28, 2)}

      {/* plan north */}
      <g style={{ "--ikd": "0.30s" } as React.CSSProperties}>
        <circle className="ck-fine ck-fade" cx="704" cy="72" r="14" style={{ "--fop": 0.5, "--ikd": "0.30s" } as React.CSSProperties} />
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.36s" } as React.CSSProperties} d="M704,84 L704,58" />
        <path className="ck-solid ck-fade" style={{ "--fop": 0.85, "--ikd": "0.42s" } as React.CSSProperties} d="M704,54 L700,62 L704,60 L708,62 Z" />
        <text className="ck-txt ck-fade" x="699" y="44" fontSize={11} letterSpacing={2} style={{ "--fop": 0.7, "--ikd": "0.48s" } as React.CSSProperties}>N</text>
      </g>

      {/* the red working pass — off register; hover slides it home */}
      <g className="dev-ghost ck-fade" style={{ "--fop": 0.4, "--ikd": "1.05s" } as React.CSSProperties}>
        <g transform="translate(330,268) rotate(-7)">
          <path d="M-160,-66 L160,-66 L160,66 L-160,66 Z" />
        </g>
        <path strokeDasharray="7 6" d="M408,374 C490,340 600,280 748,196" />
        <circle cx="390" cy="392" r="24" />
      </g>
    </svg>
  );
}

export default function Imprint() {
  return (
    <section className="imprint" id="imprint">
      <div className="imp-frame final">
        <p className="imp-head mono">THE IMPRINT</p>
        <p className="imp-cap mono">WHO&rsquo;S AT THE DESK &middot; AND WHERE</p>
      </div>

      <div className="imp-stage final">
        {/* THE PLAN — the torn fragment, pinned over the sheet */}
        <div className="imp-chart imp-piece">
          <div className="imp-chart-rot">
            <PlanSVG />
            {/* station labels — the desk clock lights the RUNNING one;
                DOM order is the engine contract: day first, night second */}
            <span className="imp-sta imp-sta-oa mono">
              <span className="shf-row">SHIFT 01 &middot; {SHIFT01.hours}</span>
              <i>DAY STATION &middot; OFF THE PLAN</i>
            </span>
            <span className="imp-sta imp-sta-desk mono">
              <span className="shf-row">SHIFT 02 &middot; 23&ndash;06</span>
              <i>NIGHT STATION &middot; THE CHAIR</i>
            </span>
            <span className="imp-slug mono" aria-hidden="true">NOT FOR CONSTRUCTION &middot; NEVER WAS</span>
          </div>
        </div>

        {/* the voice line — the note on the maker (hold-register shears it) */}
        <div className="imp-line final imp-piece">
          <b className="il1">Still one person,</b>
          <b className="il2">one desk.</b>
          <b className="il3">Now with a day job.</b>
          <p className="imp-note mono">A NOTE ON THE MAKER &middot; ONE PERSON, BOTH SIDES</p>
        </div>

        {/* CURRENT — the dominant credit, all facts from the config */}
        <div className="imp-cur imp-piece">
          <p className="imp-kick mono">{SHIFT01.kick}</p>
          {SHIFT01.url ? (
            <a className="imp-oa" href={SHIFT01.url} target="_blank" rel="noopener">
              {SHIFT01.name}<span className="imp-ext mono" aria-hidden="true">&#8202;&#8599;</span>
            </a>
          ) : (
            <span className="imp-oa imp-oa-still">{SHIFT01.name}</span>
          )}
          <p className="imp-meta mono">{SHIFT01.title}</p>
          <p className="imp-bfr mono">{BEFORE}</p>
        </div>

        {/* AFTER HOURS — the standing credit, low on the plan. The rest
            tilt lives on the inner wrapper: set-in ends at transform:none */}
        <div className="imp-desk imp-piece">
          <div className="imp-rot">
            <p className="imp-kick imp-kick-desk mono">AFTER HOURS &middot; EST. 2022 &mdash;</p>
            <span className="imp-deskname">My desk.</span>
            <p className="imp-meta mono">OWNER &middot; OPERATOR &middot; JANITOR &middot; NO CLOSING TIME</p>
          </div>
        </div>

        {/* the folio — edition mark, low-left */}
        <div className="imp-fol mono imp-piece" aria-hidden="true">
          <svg className="imp-reg" viewBox="0 0 26 26">
            <circle className="rr" cx="13" cy="13" r="7" />
            <line className="rk" x1="13" y1="0" x2="13" y2="26" />
            <line className="rk" x1="0" y1="13" x2="26" y2="13" />
          </svg>
          <span className="imp-fol-t">ED. N&ordm; 4 &middot; 2026</span>
        </div>

        {/* scattered furniture — punctuate the voids, never centre */}
        <span className="imp-sq" aria-hidden="true" />
        <span className="imp-tick" aria-hidden="true" />
      </div>

      <ImprintChartInk />
    </section>
  );
}
