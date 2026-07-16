import ImprintChartInk from "./ImprintChartInk";

/**
 * THE IMPRINT — FIG.2, THE HARBOUR CHART (who's at the desk · and where).
 *
 * The section's object is a torn-out fragment of an ENGRAVED CHART of
 * Victoria and the strait, pinned to the sheet — bleeding off the right
 * edge and up over the frame rule. Two stations are charted: OCEANAID (a
 * mooring buoy out in the water, the day shift 09–17) and THE DESK (the
 * registration cross ashore, the night shift 23–06), the daily passage
 * dashed between them. The marlin is the RESIDENT of the charted sea —
 * MAKAIRA sp., swimming beside the ocean org. Chart furniture is real:
 * compass rose, rhumb lines, soundings, depth contours, a shoal, neatline
 * ticks on the two untorn edges, and the slug NOT FOR NAVIGATION · NEVER
 * WAS. Around the chart, the colophon sits off-axis: the voice line tilted
 * high-left, the CURRENT credit large in accent overlapping the torn edge,
 * the after-hours credit low on the water, folio + furniture in the voids.
 *
 * Life (concept-motivated): the chart INKS ITSELF IN stroke-by-stroke as
 * it enters (strike = ink; ImprintChartInk arms it, SSR ships it drawn);
 * the RED WORKING PASS rides off register and slides home on hover (the
 * operator-plate gesture; the page-awake act drifts it further out); the
 * desk clock lights ● RUNNING on the station whose shift is live (the two
 * .shf-row markers, EngineProvider tick, DOM order = day then night); the
 * voice line rides the hold-register (.imp-line shears with scroll); the
 * pieces are tossed on by the seeded set-in (.imp-piece). FINAL layer —
 * machine-set, no hand marks.
 */

/* the engraved marlin — the resident, drawn once. pathLength=1 on every
   stroke so the fish can ink itself in stroke-by-stroke. */
function MarlinG() {
  return (
    <g className="chart-marlin" transform="translate(436,316) scale(1.12)">
      <g className="dev-ghost ck-fade" style={{ "--fop": 0.4, "--ikd": "1.06s" } as React.CSSProperties}>
        <path d="M72,48 C94,41 126,38 160,44 C166,45 170,46 173,48 C170,50 166,52 160,53 C128,60 96,62 84,58 C78,56 73,53 72,51 Z" />
        <path d="M86,44 C90,26 98,14 108,12 C124,10 140,22 152,42" />
        <path d="M170,44 C182,34 196,24 206,14 M206,14 C192,30 186,40 184,48 C186,56 192,68 206,86 M170,52 C182,62 196,74 206,86" />
      </g>
      <path pathLength={1} className="dev-body ck-draw" style={{ "--ikd": "0.50s" } as React.CSSProperties} d="M72,48 C94,41 126,38 160,44 C166,45 170,46 173,48 C170,50 166,52 160,53 C128,60 96,62 84,58 C78,56 73,53 72,51 Z" />
      <path pathLength={1} className="dev-body ck-draw" style={{ "--ikd": "0.56s" } as React.CSSProperties} d="M72,48.5 L10,57 L72,51.5" />
      <path pathLength={1} className="dev-body ck-draw" style={{ "--ikd": "0.54s" } as React.CSSProperties} d="M86,44 C90,26 98,14 108,12 C124,10 140,22 152,42" />
      <g className="dev-hatch">
        <path pathLength={1} className="ck-draw" style={{ "--ikd": "0.84s" } as React.CSSProperties} d="M94,40 L98,24" />
        <path pathLength={1} className="ck-draw" style={{ "--ikd": "0.89s" } as React.CSSProperties} d="M102,38 L108,17" />
        <path pathLength={1} className="ck-draw" style={{ "--ikd": "0.86s" } as React.CSSProperties} d="M110,37 L118,15" />
        <path pathLength={1} className="ck-draw" style={{ "--ikd": "0.92s" } as React.CSSProperties} d="M119,37 L128,17" />
        <path pathLength={1} className="ck-draw" style={{ "--ikd": "0.87s" } as React.CSSProperties} d="M128,38 L138,22" />
        <path pathLength={1} className="ck-draw" style={{ "--ikd": "0.94s" } as React.CSSProperties} d="M137,39 L146,28" />
      </g>
      <path pathLength={1} className="dev-tail ck-draw" style={{ "--ikd": "0.66s" } as React.CSSProperties} d="M170,44 C182,34 196,24 206,14" />
      <path pathLength={1} className="dev-tail ck-draw" style={{ "--ikd": "0.69s" } as React.CSSProperties} d="M206,14 C192,30 186,40 184,48 C186,56 192,68 206,86" />
      <path pathLength={1} className="dev-tail ck-draw" style={{ "--ikd": "0.72s" } as React.CSSProperties} d="M170,52 C182,62 196,74 206,86" />
      <path pathLength={1} className="dev-fin ck-draw" style={{ "--ikd": "0.74s" } as React.CSSProperties} d="M92,54 C102,64 112,70 120,72" />
      <path pathLength={1} className="dev-gill ck-draw" style={{ "--ikd": "0.76s" } as React.CSSProperties} d="M88,45 C85,50 85,55 88,59" />
      <path pathLength={1} className="dev-lat ck-draw" style={{ "--ikd": "0.78s" } as React.CSSProperties} d="M78,51 C110,52 140,51 168,49" />
      <circle className="dev-eye ck-fade" style={{ "--fop": 1, "--ikd": "1.02s" } as React.CSSProperties} cx="80" cy="47" r="2.2" />
      <path pathLength={1} className="dev-wave ck-draw" style={{ "--ikd": "0.90s" } as React.CSSProperties} d="M26,100 q9,-7 18,0 t18,0 t18,0" />
      <path pathLength={1} className="dev-wave ck-draw" style={{ "--ikd": "0.96s" } as React.CSSProperties} d="M130,106 q9,-7 18,0 t18,0" />
    </g>
  );
}

/* the chart plate: coast, harbour, stations, route, rose, soundings, the
   resident — engraved in the site's own inks, red pass off register */
function ChartSVG() {
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
      <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.18s" } as React.CSSProperties} d="M26,26 L268,26" />
      {T(26, 46, 12, 0.85, "0.26s", "FIG.2 — THE TWO STATIONS", undefined, 2.6)}
      {T(26, 61, 8.5, 0.55, "0.34s", "HARBOUR & STRAIT · SURVEYED DAILY · NOT TO SCALE", undefined, 1.6)}

      {/* the coast — engraver's line + shore hatching */}
      <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "0s" } as React.CSSProperties} d="M0,302 C40,306 86,318 122,338 C138,347 152,356 158,368 C163,378 158,388 148,394 C136,401 124,404 122,414 C120,424 132,428 148,427 C162,426 174,430 184,444 C194,459 200,476 210,492 C224,514 244,536 262,560" />
      <g className="ck-hatch">
        {[
          "M30,306 L27,316", "M66,313 L62,323", "M100,327 L95,337", "M128,342 L122,351",
          "M150,357 L143,365", "M158,372 L149,377", "M126,412 L117,415", "M136,425 L131,434",
          "M158,427 L155,437", "M178,438 L170,445", "M192,456 L183,461", "M204,480 L195,485",
          "M222,508 L213,514", "M244,534 L235,540",
        ].map((d, i) => (
          <path key={"h" + i} pathLength={1} className="ck-draw" style={{ "--ikd": (0.08 + (i % 5) * 0.07).toFixed(2) + "s" } as React.CSSProperties} d={d} />
        ))}
      </g>
      {/* the islet */}
      <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "0.22s" } as React.CSSProperties} d="M284,152 C288,143 300,140 310,144 C318,147 318,155 309,158 C298,161 282,160 284,152 Z" />
      <path pathLength={1} className="ck-hatch ck-draw" style={{ "--ikd": "0.3s" } as React.CSSProperties} d="M290,158 L288,164 M302,160 L301,166" />
      {T(52, 496, 12, 0.6, "0.4s", "VICTORIA BC", -7, 3.5)}

      {/* sea furniture: rhumbs, contours, the shoal, soundings */}
      <g className="ck-rhumb ck-fade" style={{ "--fop": 0.16, "--ikd": "0.36s" } as React.CSSProperties}>
        <path d="M652,96 L70,258" />
        <path d="M652,96 L170,540" />
        <path d="M652,96 L470,500" />
      </g>
      <path className="ck-fine ck-fade" strokeDasharray="5 6" style={{ "--fop": 0.4, "--ikd": "0.44s" } as React.CSSProperties} d="M36,336 C140,306 240,322 330,282 C420,242 520,262 612,224" />
      <path className="ck-fine ck-fade" strokeDasharray="4 6" style={{ "--fop": 0.3, "--ikd": "0.58s" } as React.CSSProperties} d="M240,492 C310,478 370,492 430,470" />
      <g className="ck-dot ck-fade" style={{ "--fop": 0.45, "--ikd": "0.66s" } as React.CSSProperties}>
        {[[392, 450], [398, 454], [405, 449], [410, 456], [396, 461], [403, 465], [390, 467], [408, 470], [416, 462], [400, 473]].map(([x, y]) => (
          <circle key={"sd" + x + y} cx={x} cy={y} r="0.9" />
        ))}
      </g>
      {T(338, 178, 11, 0.5, "0.68s", "23")}
      {T(238, 252, 11, 0.5, "0.74s", "18")}
      {T(418, 118, 11, 0.5, "0.82s", "31")}
      {T(508, 264, 11, 0.5, "0.71s", "42")}
      {T(306, 352, 11, 0.5, "0.88s", "12")}
      {T(388, 428, 11, 0.5, "0.79s", "7")}
      {T(300, 512, 11, 0.5, "0.93s", "9")}
      {T(382, 484, 11, 0.5, "0.86s", "5")}
      {T(614, 296, 11, 0.5, "0.76s", "27")}
      {T(168, 238, 11, 0.5, "0.90s", "36")}
      {T(318, 84, 12, 0.4, "0.64s", "JUAN DE FUCA STRAIT", -2, 5)}

      {/* the compass rose */}
      <g style={{ "--ikd": "0.30s" } as React.CSSProperties}>
        <circle className="ck-fine ck-fade" cx="652" cy="96" r="30" style={{ "--fop": 0.5, "--ikd": "0.30s" } as React.CSSProperties} />
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.34s" } as React.CSSProperties} d="M652,64 L652,128" />
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.38s" } as React.CSSProperties} d="M620,96 L684,96" />
        <path pathLength={1} className="ck-rhumbx ck-draw" style={{ "--ikd": "0.42s" } as React.CSSProperties} d="M631,75 L673,117 M673,75 L631,117" />
        <path className="ck-solid ck-fade" style={{ "--fop": 0.85, "--ikd": "0.46s" } as React.CSSProperties} d="M652,58 L648,68 L652,65 L656,68 Z" />
        <circle className="ck-solid ck-fade" cx="652" cy="96" r="2.4" style={{ "--fop": 0.85, "--ikd": "0.40s" } as React.CSSProperties} />
        {T(652 - 4, 50, 11, 0.7, "0.5s", "N")}
      </g>

      {/* the daily passage — buoy to desk, twice a day */}
      <path className="ck-route ck-fade" strokeDasharray="7 6" style={{ "--fop": 0.75, "--ikd": "0.50s" } as React.CSSProperties} d="M462,222 C402,256 306,326 192,396" />
      <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.6s" } as React.CSSProperties} d="M366,295 L357,303 L367,310" />
      <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.62s" } as React.CSSProperties} d="M436,240 L446,232 L437,225" />
      {T(244, 358, 10, 0.5, "0.84s", "THE COMMUTE · TWICE DAILY", -27, 2)}

      {/* station: OCEANAID — the mooring buoy, day water */}
      <g style={{ "--ikd": "0.55s" } as React.CSSProperties}>
        <circle className="ck-line ck-fade" cx="468" cy="214" r="4.5" style={{ "--fop": 1, "--ikd": "0.55s" } as React.CSSProperties} />
        <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "0.58s" } as React.CSSProperties} d="M470,210 L477,197" />
        <path className="ck-solid ck-fade" style={{ "--fop": 0.9, "--ikd": "0.61s" } as React.CSSProperties} d="M477,197 L488,199 L478,203 Z" />
      </g>
      {/* station: THE DESK — the registration cross, ashore */}
      <g style={{ "--ikd": "0.60s" } as React.CSSProperties}>
        <circle className="ck-fine ck-fade" cx="176" cy="404" r="7" style={{ "--fop": 0.75, "--ikd": "0.60s" } as React.CSSProperties} />
        <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "0.63s" } as React.CSSProperties} d="M176,392 L176,416" />
        <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "0.66s" } as React.CSSProperties} d="M164,404 L188,404" />
      </g>

      {/* the resident */}
      <MarlinG />
      {T(536, 478, 10, 0.5, "0.98s", "MAKAIRA sp. · RESIDENT", undefined, 2.4)}

      {/* the red working pass — off register; hover slides it home */}
      <g className="dev-ghost ck-fade" style={{ "--fop": 0.4, "--ikd": "1.05s" } as React.CSSProperties}>
        <path d="M0,302 C40,306 86,318 122,338 C138,347 152,356 158,368 C163,378 158,388 148,394 C136,401 124,404 122,414 C120,424 132,428 148,427 C162,426 174,430 184,444 C194,459 200,476 210,492 C224,514 244,536 262,560" />
        <path strokeDasharray="7 6" d="M462,222 C402,256 306,326 192,396" />
        <circle cx="468" cy="214" r="4.5" />
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
        {/* THE CHART — the torn fragment, pinned over the sheet */}
        <div className="imp-chart imp-piece">
          <div className="imp-chart-rot">
            <ChartSVG />
            {/* station labels — the desk clock lights the RUNNING one;
                DOM order is the engine contract: day first, night second */}
            <span className="imp-sta imp-sta-oa mono">
              <span className="shf-row">OCEANAID &middot; 09&ndash;17</span>
              <i>DAY STATION</i>
            </span>
            <span className="imp-sta imp-sta-desk mono">
              <span className="shf-row">THE DESK &middot; 23&ndash;06</span>
              <i>NIGHT STATION</i>
            </span>
            <span className="imp-slug mono" aria-hidden="true">NOT FOR NAVIGATION &middot; NEVER WAS</span>
          </div>
        </div>

        {/* the voice line — the note on the maker (hold-register shears it) */}
        <div className="imp-line final imp-piece">
          <b className="il1">Still one person,</b>
          <b className="il2">one desk.</b>
          <b className="il3">Now with a day job.</b>
          <p className="imp-note mono">A NOTE ON THE MAKER &middot; ONE PERSON, BOTH SIDES</p>
        </div>

        {/* CURRENT — the dominant credit, overlapping the torn edge */}
        <div className="imp-cur imp-piece">
          <p className="imp-kick mono">CURRENTLY &middot; MAY 2026 &mdash;</p>
          <a className="imp-oa" href="https://oceanaid.ca" target="_blank" rel="noopener">
            OceanAID<span className="imp-ext mono" aria-hidden="true">&#8202;&#8599;</span>
          </a>
          <p className="imp-meta mono">JUNIOR SOFTWARE ENGINEER &middot; VICTORIA BC</p>
          <p className="imp-bfr mono">BEFORE &mdash; AI SYSTEMS DEVELOPER &middot; UNIV. OF VICTORIA &middot; 2024&ndash;26</p>
        </div>

        {/* AFTER HOURS — the standing credit, low on the water. The rest
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
