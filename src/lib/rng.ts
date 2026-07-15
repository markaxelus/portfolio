/**
 * Seeded RNG + hand-drawn stone generator — ported VERBATIM from
 * prototypes/main.js (lines 4–36). Do not touch the wobble math: the stones
 * must wobble the same way twice (mulberry32), N=9, weights 0.82+rnd*0.3 /
 * 0.86+rnd*0.26, coords rounded to 0.1. Every generated artifact on the site
 * (trail, cairn, indicator) is built from these.
 */

export const SVG_NS = "http://www.w3.org/2000/svg";

export function mulberry32(a: number): () => number {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** hand-drawn stone: closed wobbly blob through smoothed points */
export function stonePath(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  seed: number,
): string {
  const rnd = mulberry32(seed);
  const N = 9;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const w = 0.82 + rnd() * 0.3;
    pts.push([
      cx + Math.cos(a) * rx * w,
      cy + Math.sin(a) * ry * (0.86 + rnd() * 0.26),
    ]);
  }
  const r1 = (v: number) => Math.round(v * 10) / 10;
  const mid = (p: [number, number], q: [number, number]): [number, number] => [
    (p[0] + q[0]) / 2,
    (p[1] + q[1]) / 2,
  ];
  let d = "M" + mid(pts[N - 1], pts[0]).map(r1).join(" ");
  for (let i = 0; i < N; i++) {
    const p = pts[i];
    const m = mid(pts[i], pts[(i + 1) % N]);
    d += " Q" + r1(p[0]) + " " + r1(p[1]) + " " + r1(m[0]) + " " + r1(m[1]);
  }
  return d + " Z";
}
