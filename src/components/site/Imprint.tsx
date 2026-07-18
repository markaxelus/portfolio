import ImprintChartInk from "./ImprintChartInk";

/**
 * THE IMPRINT — FIG.2, one plate, two engravings (who's at the desk · and
 * where). Both figures ship built; the FIGURE switch below chooses which
 * one prints — nothing is rebuilt to swap them:
 *
 *   "harbour" — THE TWO STATIONS: the engraved chart of Victoria and the
 *   strait. The day station is a mooring buoy out in the water, the desk
 *   is the registration cross ashore, the daily passage dashes between,
 *   and the marlin — MAKAIRA sp., THE MARK OF THE PRESS, the house device
 *   — swims home waters. Fits an ocean-adjacent chapter of life.
 *
 *   "plan" — THE DESK, SURVEYED: an architect's plan of the desk itself.
 *   The chair is the night station; the commute dashes OFF THE PLAN's
 *   edge to the day station — employer-proof for any company, any sector,
 *   or a startup. Fits every other chapter.
 *
 * Both figures speak the same machinery: they INK THEMSELVES IN stroke by
 * stroke on entry (strike = ink; ImprintChartInk arms it, SSR ships them
 * drawn), the RED WORKING PASS rides off register and slides home on
 * hover (+ the page-awake drift), the desk clock lights ● RUNNING on the
 * live station (two .shf-row markers, DOM order = day then night), the
 * voice line rides the hold-register, the pieces set down seeded
 * (.imp-piece). FINAL layer — machine-set, no hand marks.
 */

/* THE FIGURE — the one-line switch. */
const FIGURE: "harbour" | "plan" = "harbour";

/* THE FACTS — the only lines that change when life does. Neither figure
   names the employer, so a new job, a startup, or no logo at all is an
   edit HERE and nowhere else. url is optional — without it the credit
   sets as plain type, no link. */
const SHIFT01 = {
  name: "OceanAID",
  url: "https://oceanaid.ca" as string | null,
  title: "JUNIOR SOFTWARE ENGINEER · VICTORIA BC",
  kick: "CURRENTLY · MAY 2026",
  hours: "09–17",
};
const BEFORE = "BEFORE · AI SYSTEMS DEVELOPER · UNIV. OF VICTORIA · 2025–26";

/* the plates' shared annotation setter */
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

/* the engraved marlin — the house device (the press's own mark, swimming
   home waters — employer-agnostic), drawn once. pathLength=1 on every
   stroke so the fish can ink itself in stroke-by-stroke. */
function MarlinG() {
  return (
    <g className="chart-marlin" transform="translate(436,316) scale(1.12)">
      <g className="dev-ghost" style={{ "--ikd": "3.08s" } as React.CSSProperties}>
        <path d="M72,48 C94,41 126,38 160,44 C166,45 170,46 173,48 C170,50 166,52 160,53 C128,60 96,62 84,58 C78,56 73,53 72,51 Z" />
        <path d="M86,44 C90,26 98,14 108,12 C124,10 140,22 152,42" />
        <path d="M170,44 C182,34 196,24 206,14 M206,14 C192,30 186,40 184,48 C186,56 192,68 206,86 M170,52 C182,62 196,74 206,86" />
      </g>
      <path pathLength={1} className="dev-body ck-draw" style={{ "--ikd": "1.05s" } as React.CSSProperties} d="M72,48 C94,41 126,38 160,44 C166,45 170,46 173,48 C170,50 166,52 160,53 C128,60 96,62 84,58 C78,56 73,53 72,51 Z" />
      <path pathLength={1} className="dev-body ck-draw" style={{ "--ikd": "1.18s" } as React.CSSProperties} d="M72,48.5 L10,57 L72,51.5" />
      <path pathLength={1} className="dev-body ck-draw" style={{ "--ikd": "1.13s" } as React.CSSProperties} d="M86,44 C90,26 98,14 108,12 C124,10 140,22 152,42" />
      <g className="dev-hatch">
        <path pathLength={1} className="ck-draw" style={{ "--ikd": "1.76s" } as React.CSSProperties} d="M94,40 L98,24" />
        <path pathLength={1} className="ck-draw" style={{ "--ikd": "1.87s" } as React.CSSProperties} d="M102,38 L108,17" />
        <path pathLength={1} className="ck-draw" style={{ "--ikd": "1.81s" } as React.CSSProperties} d="M110,37 L118,15" />
        <path pathLength={1} className="ck-draw" style={{ "--ikd": "1.93s" } as React.CSSProperties} d="M119,37 L128,17" />
        <path pathLength={1} className="ck-draw" style={{ "--ikd": "1.83s" } as React.CSSProperties} d="M128,38 L138,22" />
        <path pathLength={1} className="ck-draw" style={{ "--ikd": "1.97s" } as React.CSSProperties} d="M137,39 L146,28" />
      </g>
      <path pathLength={1} className="dev-tail ck-draw" style={{ "--ikd": "1.39s" } as React.CSSProperties} d="M170,44 C182,34 196,24 206,14" />
      <path pathLength={1} className="dev-tail ck-draw" style={{ "--ikd": "1.45s" } as React.CSSProperties} d="M206,14 C192,30 186,40 184,48 C186,56 192,68 206,86" />
      <path pathLength={1} className="dev-tail ck-draw" style={{ "--ikd": "1.51s" } as React.CSSProperties} d="M170,52 C182,62 196,74 206,86" />
      <path pathLength={1} className="dev-fin ck-draw" style={{ "--ikd": "1.55s" } as React.CSSProperties} d="M92,54 C102,64 112,70 120,72" />
      <path pathLength={1} className="dev-gill ck-draw" style={{ "--ikd": "1.6s" } as React.CSSProperties} d="M88,45 C85,50 85,55 88,59" />
      <path pathLength={1} className="dev-lat ck-draw" style={{ "--ikd": "1.64s" } as React.CSSProperties} d="M78,51 C110,52 140,51 168,49" />
      <circle className="dev-eye ck-fade" style={{ "--fop": 1, "--ikd": "2.14s" } as React.CSSProperties} cx="80" cy="47" r="2.2" />
      <path pathLength={1} className="dev-wave ck-draw" style={{ "--ikd": "1.89s" } as React.CSSProperties} d="M26,100 q9,-7 18,0 t18,0 t18,0" />
      <path pathLength={1} className="dev-wave ck-draw" style={{ "--ikd": "2.02s" } as React.CSSProperties} d="M130,106 q9,-7 18,0 t18,0" />
    </g>
  );
}

/* the chart plate: coast, harbour, stations, route, rose, soundings, the
   resident — engraved in the site's own inks, red pass off register */
function ChartSVG() {
  return (
    <svg viewBox="0 0 780 560" aria-hidden="true">
      {/* neatline ticks — the two untorn edges */}
      <g className="ck-fine ck-fade" style={{ "--fop": 0.35, "--ikd": "0.25s" } as React.CSSProperties}>
        {[56, 124, 192, 260, 328, 396, 464, 532, 600, 668, 736].map((x) => (
          <path key={"nt" + x} d={`M${x},2 L${x},9`} />
        ))}
        {[36, 104, 172, 240, 308, 376, 444, 512].map((y) => (
          <path key={"nr" + y} d={`M771,${y} L778,${y}`} />
        ))}
      </g>

      {/* the cartouche */}
      <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.38s" } as React.CSSProperties} d="M26,26 L268,26" />
      {T(26, 46, 12, 0.85, "0.55s", "FIG.2 · THE TWO STATIONS", undefined, 2.6)}
      {T(26, 61, 8.5, 0.55, "0.71s", "HARBOUR & STRAIT · SURVEYED DAILY · NOT TO SCALE", undefined, 1.6)}

      {/* the coast — engraver's line + shore hatching */}
      <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "0.0s" } as React.CSSProperties} d="M0,302 C40,306 86,318 122,338 C138,347 152,356 158,368 C163,378 158,388 148,394 C136,401 124,404 122,414 C120,424 132,428 148,427 C162,426 174,430 184,444 C194,459 200,476 210,492 C224,514 244,536 262,560" />
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
      <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "0.46s" } as React.CSSProperties} d="M284,152 C288,143 300,140 310,144 C318,147 318,155 309,158 C298,161 282,160 284,152 Z" />
      <path pathLength={1} className="ck-hatch ck-draw" style={{ "--ikd": "0.63s" } as React.CSSProperties} d="M290,158 L288,164 M302,160 L301,166" />
      {T(52, 496, 12, 0.6, "0.84s", "VICTORIA BC", -7, 3.5)}

      {/* sea furniture: rhumbs, contours, the shoal, soundings */}
      <g className="ck-rhumb ck-fade" style={{ "--fop": 0.16, "--ikd": "0.76s" } as React.CSSProperties}>
        <path d="M652,96 L70,258" />
        <path d="M652,96 L170,540" />
        <path d="M652,96 L470,500" />
      </g>
      <path className="ck-fine ck-fade" strokeDasharray="5 6" style={{ "--fop": 0.4, "--ikd": "0.92s" } as React.CSSProperties} d="M36,336 C140,306 240,322 330,282 C420,242 520,262 612,224" />
      <path className="ck-fine ck-fade" strokeDasharray="4 6" style={{ "--fop": 0.3, "--ikd": "1.22s" } as React.CSSProperties} d="M240,492 C310,478 370,492 430,470" />
      <g className="ck-dot ck-fade" style={{ "--fop": 0.45, "--ikd": "1.39s" } as React.CSSProperties}>
        {[[392, 450], [398, 454], [405, 449], [410, 456], [396, 461], [403, 465], [390, 467], [408, 470], [416, 462], [400, 473]].map(([x, y]) => (
          <circle key={"sd" + x + y} cx={x} cy={y} r="0.9" />
        ))}
      </g>
      {T(338, 178, 11, 0.5, "1.43s", "23")}
      {T(238, 252, 11, 0.5, "1.55s", "18")}
      {T(418, 118, 11, 0.5, "1.72s", "31")}
      {T(508, 264, 11, 0.5, "1.49s", "42")}
      {T(306, 352, 11, 0.5, "1.85s", "12")}
      {T(388, 428, 11, 0.5, "1.66s", "7")}
      {T(300, 512, 11, 0.5, "1.95s", "9")}
      {T(382, 484, 11, 0.5, "1.81s", "5")}
      {T(614, 296, 11, 0.5, "1.6s", "27")}
      {T(168, 238, 11, 0.5, "1.89s", "36")}
      {T(318, 84, 12, 0.4, "1.34s", "JUAN DE FUCA STRAIT", -2, 5)}

      {/* the compass rose */}
      <g style={{ "--ikd": "0.63s" } as React.CSSProperties}>
        <circle className="ck-fine ck-fade" cx="652" cy="96" r="30" style={{ "--fop": 0.5, "--ikd": "0.63s" } as React.CSSProperties} />
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.71s" } as React.CSSProperties} d="M652,64 L652,128" />
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.8s" } as React.CSSProperties} d="M620,96 L684,96" />
        <path pathLength={1} className="ck-rhumbx ck-draw" style={{ "--ikd": "0.88s" } as React.CSSProperties} d="M631,75 L673,117 M673,75 L631,117" />
        <path className="ck-solid ck-fade" style={{ "--fop": 0.85, "--ikd": "0.97s" } as React.CSSProperties} d="M652,58 L648,68 L652,65 L656,68 Z" />
        <circle className="ck-solid ck-fade" cx="652" cy="96" r="2.4" style={{ "--fop": 0.85, "--ikd": "0.84s" } as React.CSSProperties} />
        {T(652 - 4, 50, 11, 0.7, "0.5s", "N")}
      </g>

      {/* the daily passage — it TRAVELS from the desk out to the day
          station (masked reveal; the path starts at the buoy, so the mask
          draws from its far end: --mdir -1) */}
      <defs>
        <mask id="imp-rmask-h" maskUnits="userSpaceOnUse" x="0" y="0" width="780" height="560">
          <path className="ck-routemask" pathLength={1} d="M462,222 C402,256 306,326 192,396" style={{ "--mdir": -1, "--ikd": "1.75s", "--ikdur": "0.85s" } as React.CSSProperties} />
        </mask>
      </defs>
      <path mask="url(#imp-rmask-h)" className="ck-route" strokeDasharray="7 6" d="M462,222 C402,256 306,326 192,396" />
      <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "2.62s" } as React.CSSProperties} d="M366,295 L357,303 L367,310" />
      <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "2.7s" } as React.CSSProperties} d="M436,240 L446,232 L437,225" />
      {T(244, 358, 10, 0.5, "2.75s", "THE COMMUTE · TWICE DAILY", -27, 2)}

      {/* station: the day buoy — STAMPED down, not drawn (fixing a station
          is a stamp; the seat gesture: drop, overpress, settle) */}
      <g className="ck-stamp" style={{ "--ikd": "1.62s" } as React.CSSProperties}>
        <circle className="ck-line" fill="none" cx="468" cy="214" r="4.5" />
        <path className="ck-line" d="M470,210 L477,197" />
        <path className="ck-solid" d="M477,197 L488,199 L478,203 Z" style={{ opacity: 0.9 }} />
      </g>
      {/* station: THE DESK — the registration cross, stamped ashore */}
      <g className="ck-stamp" style={{ "--ikd": "1.42s" } as React.CSSProperties}>
        <circle className="ck-fine" fill="none" cx="176" cy="404" r="7" style={{ opacity: 0.75 }} />
        <path className="ck-line" d="M176,392 L176,416" />
        <path className="ck-line" d="M164,404 L188,404" />
      </g>

      {/* the resident */}
      <MarlinG />
      {T(445, 478, 10, 0.5, "2.06s", "MAKAIRA sp. · THE MARK OF THE PRESS", undefined, 2)}

      {/* the red working pass — off register; hover slides it home */}
      <g className="dev-ghost" style={{ "--ikd": "2.95s" } as React.CSSProperties}>
        <path d="M0,302 C40,306 86,318 122,338 C138,347 152,356 158,368 C163,378 158,388 148,394 C136,401 124,404 122,414 C120,424 132,428 148,427 C162,426 174,430 184,444 C194,459 200,476 210,492 C224,514 244,536 262,560" />
        <path strokeDasharray="7 6" d="M462,222 C402,256 306,326 192,396" />
        <circle cx="468" cy="214" r="4.5" />
      </g>
    </svg>
  );
}

/* the plan plate: walls, the desk at its angle, the chair (night station),
   the commute off the sheet — engraved in the site's own inks, red pass
   off register */
function PlanSVG() {
  return (
    <svg viewBox="0 0 780 560" aria-hidden="true">
      {/* neatline ticks — the two untorn edges */}
      <g className="ck-fine ck-fade" style={{ "--fop": 0.35, "--ikd": "0.25s" } as React.CSSProperties}>
        {[56, 124, 192, 260, 328, 396, 464, 532, 600, 668, 736].map((x) => (
          <path key={"nt" + x} d={`M${x},2 L${x},9`} />
        ))}
        {[36, 104, 172, 240, 308, 376, 444, 512].map((y) => (
          <path key={"nr" + y} d={`M771,${y} L778,${y}`} />
        ))}
      </g>

      {/* the cartouche */}
      <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.38s" } as React.CSSProperties} d="M26,26 L282,26" />
      {T(26, 46, 12, 0.85, "0.55s", "FIG.2 · THE DESK, SURVEYED", undefined, 2.6)}
      {T(26, 61, 8.5, 0.55, "0.71s", "PLAN VIEW · SCALE 1:1 · DRAWN AT VICTORIA BC", undefined, 1.6)}

      {/* the walls — double line + section hatching; the door gap low-left */}
      <path pathLength={1} className="ck-wall ck-draw" style={{ "--ikd": "0.0s" } as React.CSSProperties} d="M36,108 L745,108" />
      <path pathLength={1} className="ck-wall ck-draw" style={{ "--ikd": "0.32s", "--ikdur": "0.9s" } as React.CSSProperties} d="M36,120 L745,120" />
      <path pathLength={1} className="ck-wall ck-draw" style={{ "--ikd": "0.21s" } as React.CSSProperties} d="M54,120 L54,384 M66,120 L66,384" />
      <path pathLength={1} className="ck-wall ck-draw" style={{ "--ikd": "0.34s" } as React.CSSProperties} d="M54,448 L54,478 M66,448 L66,478" />
      <g className="ck-hatch">
        {[90, 152, 214, 276, 338, 400, 462, 524, 586, 648, 710].map((x, i) => (
          <path key={"wh" + x} pathLength={1} className="ck-draw" style={{ "--ikd": (0.08 + (i % 5) * 0.07).toFixed(2) + "s" } as React.CSSProperties} d={`M${x},108 L${x - 11},120`} />
        ))}
        {[140, 176, 212, 248, 284, 320, 356].map((y, i) => (
          <path key={"lh" + y} pathLength={1} className="ck-draw" style={{ "--ikd": (0.12 + (i % 4) * 0.08).toFixed(2) + "s" } as React.CSSProperties} d={`M54,${y} L66,${y + 11}`} />
        ))}
      </g>
      {/* the door: leaf + dashed swing */}
      <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "0.88s" } as React.CSSProperties} d="M66,388 L128,412" />
      <path className="ck-fine ck-fade" strokeDasharray="4 5" style={{ "--fop": 0.45, "--ikd": "1.09s" } as React.CSSProperties} d="M128,412 A66,66 0 0 1 66,446" />
      {T(88, 486, 8, 0.45, "1.89s", "IN / OUT · RARELY", undefined, 1.6)}

      {/* the floorboards — faint working grid */}
      <g className="ck-rhumb ck-fade" style={{ "--fop": 0.12, "--ikd": "0.95s" } as React.CSSProperties}>
        {[250, 290, 330, 370, 410, 450].map((y) => (
          <path key={"fb" + y} d={`M90,${y} L730,${y}`} />
        ))}
      </g>

      {/* THE DESK — at its working angle, everything aboard */}
      <g transform="translate(330,268) rotate(-7)">
        <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "0.7s", "--ikdur": "0.9s" } as React.CSSProperties} d="M-160,-66 L160,-66 L160,66 L-160,66 Z" />
        {/* screens */}
        <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "0.92s" } as React.CSSProperties} d="M-125,-56 L-15,-56 L-15,-42 L-125,-42 Z" />
        <circle className="ck-fine ck-fade" cx="-70" cy="-34" r="3.5" style={{ "--fop": 0.6, "--ikd": "1.05s" } as React.CSSProperties} />
        <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "1.01s" } as React.CSSProperties} d="M0,-54 L60,-54 L60,-42 L0,-42 Z" />
        {/* keyboard + mouse */}
        <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "1.18s" } as React.CSSProperties} d="M-80,-6 L40,-6 L40,28 L-80,28 Z" />
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "1.34s" } as React.CSSProperties} d="M-80,6 L40,6 M-80,17 L40,17" />
        <circle className="ck-fine ck-fade" cx="58" cy="12" r="6" style={{ "--fop": 0.6, "--ikd": "1.39s" } as React.CSSProperties} />
        {/* the mug + its critical radius */}
        <circle className="ck-line ck-fade" cx="108" cy="-28" r="13" style={{ "--fop": 1, "--ikd": "1.26s" } as React.CSSProperties} />
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "1.43s" } as React.CSSProperties} d="M121,-34 a8,8 0 0 1 0,12" />
        <circle className="ck-fine ck-fade" cx="108" cy="-28" r="48" strokeDasharray="5 6" style={{ "--fop": 0.4, "--ikd": "1.51s" } as React.CSSProperties} />
        {/* the proof stack */}
        <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "1.22s" } as React.CSSProperties} d="M55,30 L125,30 L125,62 L55,62 Z" />
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "1.3s" } as React.CSSProperties} d="M60,26 L130,26 L130,58" />
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "1.47s" } as React.CSSProperties} d="M65,22 L135,22 L135,54" />
        {/* the type case */}
        <path pathLength={1} className="ck-line ck-draw" style={{ "--ikd": "1.09s" } as React.CSSProperties} d="M-150,20 L-95,20 L-95,56 L-150,56 Z" />
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "1.26s" } as React.CSSProperties} d="M-131,20 L-131,56 M-113,20 L-113,56 M-150,38 L-95,38" />
        {/* dimensions — the surveyor was thorough */}
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "1.64s" } as React.CSSProperties} d="M-160,-70 L-160,-96 M160,-70 L160,-96 M-160,-90 L160,-90" />
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "1.72s" } as React.CSSProperties} d="M-160,-90 l9,-3 M-160,-90 l9,3 M160,-90 l-9,-3 M160,-90 l-9,3" />
        <text className="ck-txt ck-fade" x="-16" y="-96" fontSize={9} letterSpacing={1.5} style={{ "--fop": 0.6, "--ikd": "1.85s" } as React.CSSProperties}>1400</text>
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "1.68s" } as React.CSSProperties} d="M164,-66 L192,-66 M164,66 L192,66 M186,-66 L186,66" />
        <text className="ck-txt ck-fade" x="194" y="6" fontSize={9} letterSpacing={1.5} transform="rotate(90 194 6)" style={{ "--fop": 0.6, "--ikd": "1.93s" } as React.CSSProperties}>600</text>
      </g>
      {/* held for the resident of the mess layer — floor box, never stacked */}
      <circle className="ck-fine ck-fade" cx="642" cy="452" r="22" strokeDasharray="4 5" style={{ "--fop": 0.5, "--ikd": "1.78s" } as React.CSSProperties} />
      {T(504, 498, 8, 0.5, "1.97s", "RESERVED · DO NOT STACK", undefined, 1.6)}
      <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "1.89s" } as React.CSSProperties} d="M398,192 L290,174" />
      {T(100, 170, 8, 0.5, "2.02s", "COFFEE RADIUS · CRITICAL", undefined, 1.6)}

      {/* THE CHAIR — the night station, STAMPED down whole (the seat
          gesture: drop, overpress, settle) */}
      <g className="ck-stamp" style={{ "--ikd": "1.42s" } as React.CSSProperties}>
        <circle className="ck-line" fill="none" cx="390" cy="392" r="24" />
        <path className="ck-line" fill="none" d="M362,402 A30,30 0 0 0 418,402" />
        <circle className="ck-fine" fill="none" cx="390" cy="392" r="7" style={{ opacity: 0.75 }} />
        <path className="ck-line" d="M390,380 L390,404 M378,392 L402,392" />
      </g>

      {/* the commute — SHIFT 01 exits the plan; wherever the day job is,
          it is off this sheet */}
      <defs>
        <mask id="imp-rmask-p" maskUnits="userSpaceOnUse" x="0" y="0" width="780" height="560">
          <path className="ck-routemask" pathLength={1} d="M408,374 C490,340 600,280 748,196" style={{ "--mdir": 1, "--ikd": "1.75s", "--ikdur": "0.85s" } as React.CSSProperties} />
        </mask>
      </defs>
      <path mask="url(#imp-rmask-p)" className="ck-route" strokeDasharray="7 6" d="M408,374 C490,340 600,280 748,196" />
      <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "2.62s" } as React.CSSProperties} d="M732,210 L748,194 L728,186" />
      <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "2.7s" } as React.CSSProperties} d="M448,346 L434,359 L450,365" />
      {T(490, 278, 10, 0.5, "2.75s", "THE COMMUTE · TWICE DAILY", -28, 2)}

      {/* plan north */}
      <g style={{ "--ikd": "0.63s" } as React.CSSProperties}>
        <circle className="ck-fine ck-fade" cx="704" cy="72" r="14" style={{ "--fop": 0.5, "--ikd": "0.63s" } as React.CSSProperties} />
        <path pathLength={1} className="ck-fine ck-draw" style={{ "--ikd": "0.76s" } as React.CSSProperties} d="M704,84 L704,58" />
        <path className="ck-solid ck-fade" style={{ "--fop": 0.85, "--ikd": "0.88s" } as React.CSSProperties} d="M704,54 L700,62 L704,60 L708,62 Z" />
        <text className="ck-txt ck-fade" x="699" y="44" fontSize={11} letterSpacing={2} style={{ "--fop": 0.7, "--ikd": "1.01s" } as React.CSSProperties}>N</text>
      </g>

      {/* the red working pass — off register; hover slides it home */}
      <g className="dev-ghost" style={{ "--ikd": "2.95s" } as React.CSSProperties}>
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
  const harbour = FIGURE === "harbour";
  return (
    <section className="imprint" id="imprint">
      <div className="imp-frame final">
        <p className="imp-head mono">THE IMPRINT</p>
        <p className="imp-cap mono">WHO&rsquo;S AT THE DESK &middot; AND WHERE</p>
      </div>

      <div className="imp-stage final">
        {/* THE FIGURE — the torn fragment, pinned over the sheet */}
        <div className={"imp-chart imp-piece " + (harbour ? "imp-fig-harbour" : "imp-fig-plan")}>
          <div className="imp-chart-rot">
            {harbour ? <ChartSVG /> : <PlanSVG />}
            {/* station labels — the desk clock lights the RUNNING one;
                DOM order is the engine contract: day first, night second */}
            <span className="imp-sta imp-sta-oa mono">
              <span className="shf-row">SHIFT 01 &middot; {SHIFT01.hours}</span>
              <i>{harbour ? "DAY STATION" : "DAY STATION \u00b7 OFF THE PLAN"}</i>
            </span>
            <span className="imp-sta imp-sta-desk mono">
              <span className="shf-row">{harbour ? "THE DESK \u00b7 23\u201306" : "SHIFT 02 \u00b7 23\u201306"}</span>
              <i>{harbour ? "NIGHT STATION" : "NIGHT STATION \u00b7 THE CHAIR"}</i>
            </span>
            <span className="imp-slug mono" aria-hidden="true">
              {harbour ? "NOT FOR NAVIGATION \u00b7 NEVER WAS" : "NOT FOR CONSTRUCTION \u00b7 NEVER WAS"}
            </span>
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

        {/* AFTER HOURS — the standing credit, tucked at the tear. The rest
            tilt lives on the inner wrapper: set-in ends at transform:none */}
        <div className="imp-desk imp-piece">
          <div className="imp-rot">
            <p className="imp-kick imp-kick-desk mono">AFTER HOURS &middot; EST. 2022</p>
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

      {/* imprint marginalia (mess only) — the pens fact-check the plate's
          officialdom. Shared notes read the shift clocks; the rest are
          figure-specific, so the FIGURE switch swaps the argument too. */}
      <div className="proof-notes" aria-hidden="true">
        {/* the shadow stage: the stage/chart geometry, re-stated, so the
            notes track the objects they annotate at EVERY width (the real
            stage is .final and would dim them — see portfolio.css) */}
        <div className="imp-shadow">
          <span className="note hand-k n-imp-sleep-q" style={{ "--d": ".3s" } as React.CSSProperties}>when do you sleep?</span>
          <span className="note hand-b n-imp-sleep-a" style={{ "--d": ".55s" } as React.CSSProperties}>17&ndash;23. allegedly.</span>
          {/* the clock testifies — shown only when it's actually the night
              shift (rides body.late-desk; the engine clock fills #imp-now) */}
          <span className="note hand-b n-imp-live" style={{ "--d": "1.05s" } as React.CSSProperties}>(it&rsquo;s <span id="imp-now" suppressHydrationWarning /> right now. case in point.)</span>
          <div className="imp-shadow-chart">
            {harbour ? (
              <>
                <span className="note hand-k n-imp-row" style={{ "--d": ".75s" } as React.CSSProperties}>rowed it once. never again.</span>
                <span className="note hand-b n-imp-fish-a" style={{ "--d": ".62s" } as React.CSSProperties}>no marlin up here.</span>
                <span className="note hand-k n-imp-fish-b" style={{ "--d": ".85s" } as React.CSSProperties}>my chart. she stays.</span>
                <svg className="note scrawl dd-imp-fish" style={{ "--d": ".95s" } as React.CSSProperties} viewBox="0 0 54 26" aria-hidden="true">
                  <path className="draw" pathLength="1" d="M4,18 C18,16 32,13 46,10 M46,10 l-9,-1 M46,10 l-5,7" fill="none"/>
                </svg>
              </>
            ) : (
              <>
                <span className="note hand-b n-imp-box" style={{ "--d": ".7s" } as React.CSSProperties}>her box. load-bearing.<br/>do not stack.</span>
                <span className="note hand-k n-imp-radius" style={{ "--d": ".82s" } as React.CSSProperties}>the coffee radius is real. measured.</span>
              </>
            )}
          </div>
        </div>
      </div>

      <ImprintChartInk />
    </section>
  );
}
