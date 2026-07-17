/**
 * Generated press-plate art — ported VERBATIM from prototypes/main.js (38–147).
 * Every plate runs paper + ink + the red working pass in the current accent
 * (three inks, four plates — told apart by MOTIF, not colour). Pure string
 * builders (encodeURIComponent on static SVG), server-safe.
 *
 * NOTE: PROJECTS here is the plate/loupe data (motif + margin micro-note). The
 * real top-4 project identities (titles/meta/case copy) are swapped into the
 * WorkIndex rows + the project viewer, keeping the print-shop voice.
 */

export type Motif = "arcs" | "stripes" | "orbits" | "steps";

export interface Project {
  num: string;
  motif: Motif;
  g: number;
  micro: string;
}

export const PROJECTS: Project[] = [
  { num: "01", motif: "arcs", g: 0.32, micro: "UVE-24 · THE TEAMS PAGE WAS HARDCODED · NOT ANYMORE" },
  { num: "02", motif: "stripes", g: 0.52, micro: "RLY-25 · REAL-TIME · THE WEBSOCKETS BEHAVED, EVENTUALLY" },
  { num: "03", motif: "orbits", g: 0.4, micro: "PRT-25 · v4 THIS YEAR · THE FIRST THREE WEREN'T GOOD ENOUGH" },
  { num: "04", motif: "steps", g: 0.6, micro: "SYN-24 · 10MB PDF · COLD START · UNDER FIVE SECONDS" },
];

/** the paint chips pick the site accent; the plates print in it too. The plate
 *  is a dark tile lit the same in any room, so it always takes the luminous
 *  (night) variant. */
export const ACCENTS: Array<{ day: string; night: string }> = [
  { day: "#2A2AF0", night: "#7C7CFF" }, // signal
  { day: "#D6246E", night: "#FF5FA2" }, // magenta
  { day: "#6E7D00", night: "#C6D600" }, // acid
];

export const PLATE_INK = "#16150F";
export const PLATE_PAPER = "#DDDBD4";
export const PLATE_RED = "#C7361F";

export function motifSVG(kind: Motif, color: string): string {
  let s = "";
  let i;
  if (kind === "arcs") {
    for (i = 1; i <= 6; i++) {
      s +=
        '<circle cx="560" cy="300" r="' + i * 58 +
        '" fill="none" stroke="' + color + '" stroke-width="2" opacity="' + (0.9 - i * 0.1) + '"/>';
    }
    s += '<circle cx="560" cy="300" r="14" fill="' + color + '"/>';
  } else if (kind === "stripes") {
    s += '<g transform="rotate(-24 400 500)">';
    for (i = 0; i < 9; i++) {
      s +=
        '<rect x="' + (-100 + i * 120) + '" y="120" width="34" height="760" fill="' + color +
        '" opacity="' + (i % 2 ? 0.85 : 0.4) + '"/>';
    }
    s += "</g>";
  } else if (kind === "orbits") {
    s += '<circle cx="400" cy="430" r="240" fill="none" stroke="' + color + '" stroke-width="2"/>';
    s += '<ellipse cx="400" cy="430" rx="340" ry="120" fill="none" stroke="' + color + '" stroke-width="1.5" opacity="0.7"/>';
    s += '<circle cx="640" cy="360" r="26" fill="' + color + '"/>';
    for (i = 0; i < 5; i++) {
      for (let j = 0; j < 4; j++) {
        const x = 120 + i * 44,
          y = 760 + j * 44;
        s +=
          '<path d="M' + x + " " + (y - 9) + "v18M" + (x - 9) + " " + y + "h18" +
          '" stroke="' + color + '" stroke-width="2" opacity="0.75"/>';
      }
    }
  } else if (kind === "steps") {
    for (i = 0; i < 7; i++) {
      s +=
        '<rect x="90" y="' + (180 + i * 78) + '" width="' + (620 - i * 78) +
        '" height="40" fill="' + color + '" opacity="' + (0.95 - i * 0.11) + '"/>';
    }
  }
  return s;
}

function plateSVG(p: Project, accent: string, forSep: boolean): string {
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">' +
    "<defs>" +
    '<linearGradient id="duo" x1="0" y1="0" x2="0.9" y2="1.15">' +
    '<stop offset="0" stop-color="' + PLATE_INK + '"/>' +
    '<stop offset="1" stop-color="' + accent + '" stop-opacity="' + p.g + '"/>' +
    "</linearGradient>" +
    (forSep
      ? ""
      : '<pattern id="ht" width="9" height="9" patternUnits="userSpaceOnUse">' +
        '<circle cx="4.5" cy="4.5" r="1.5" fill="' + accent + '"/>' +
        "</pattern>" +
        '<filter id="gr"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>' +
        '<feColorMatrix type="saturate" values="0"/></filter>') +
    "</defs>" +
    '<rect width="800" height="1000" fill="' + PLATE_INK + '"/>' +
    '<rect width="800" height="1000" fill="url(#duo)"/>' +
    (forSep ? "" : '<rect width="800" height="1000" fill="url(#ht)" opacity="0.14"/>') +
    '<g transform="translate(6 4)" opacity="0.42">' + motifSVG(p.motif, PLATE_RED) + "</g>" +
    motifSVG(p.motif, accent) +
    '<text x="30" y="985" font-family="Georgia, \'Times New Roman\', serif" font-size="560" ' +
    'font-weight="500" fill="' + PLATE_PAPER + '" opacity="0.14" letter-spacing="-30">' + p.num + "</text>" +
    '<g transform="rotate(-90 44 500)"><text x="44" y="500" text-anchor="middle" ' +
    'font-family="monospace" font-size="17" letter-spacing="5" fill="' + PLATE_PAPER + '" opacity="0.72">' +
    "M.A. &#8212; PROOF " + p.num + "/04 &#183; NOT FOR PRODUCTION</text></g>" +
    '<g font-family="monospace" font-size="9" letter-spacing="1.5" fill="' + PLATE_PAPER + '">' +
    '<text x="770" y="732" text-anchor="end" opacity="0.55">' + p.micro + "</text>" +
    '<text x="770" y="748" text-anchor="end" opacity="0.4">IF YOU CAN READ THIS YOU FOUND THE LOUPE</text>' +
    "</g>" +
    (forSep ? "" : '<rect width="800" height="1000" filter="url(#gr)" opacity="0.14"/>') +
    "</svg>"
  );
}

export function plateURI(p: Project, accent: string): string {
  return 'url("data:image/svg+xml;utf8,' + encodeURIComponent(plateSVG(p, accent, false)) + '")';
}

/** The separation source for the halftone loupe (SOTD P2): the same art minus
 *  the FAKE 9px screen pattern and the grain — under the glass those are
 *  replaced by the real screens, and unmixing them would only add noise and
 *  moiré against the true rosette. Plain data URI (Image-loadable). */
export function plateSepURI(p: Project, accent: string): string {
  return "data:image/svg+xml;utf8," + encodeURIComponent(plateSVG(p, accent, true));
}

/** The type pass for the halftone loupe: ONLY the proof slug + the margin
 *  micro-notes, on transparency. Real print never screens small type — the
 *  glass draws this solid over the dots so the notes stay razor-legible
 *  (the ghost numeral is a tint, so it stays in the screens and resolves
 *  into dots — that's the show). Accent-free, so one per plate. */
export function plateTextURI(p: Project): string {
  /* full-strength fills, unlike the tile art's worn tints: a knockout under a
     loupe reads as CLEAN PAPER letters against the screened field — the worn
     look belongs to the unmagnified tile, the crisp knockout to the glass */
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">' +
    '<g transform="rotate(-90 44 500)"><text x="44" y="500" text-anchor="middle" ' +
    'font-family="monospace" font-size="17" letter-spacing="5" fill="' + PLATE_PAPER + '" opacity="0.85">' +
    "M.A. &#8212; PROOF " + p.num + "/04 &#183; NOT FOR PRODUCTION</text></g>" +
    '<g font-family="monospace" font-size="9" letter-spacing="1.5" fill="' + PLATE_PAPER + '">' +
    '<text x="770" y="732" text-anchor="end">' + p.micro + "</text>" +
    '<text x="770" y="748" text-anchor="end" opacity="0.9">IF YOU CAN READ THIS YOU FOUND THE LOUPE</text>' +
    "</g>" +
    "</svg>";
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
