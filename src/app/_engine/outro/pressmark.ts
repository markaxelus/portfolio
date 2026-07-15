/**
 * THE MAKER'S MARK — the job-code device (main.js 3317–3348, buildPressmark).
 *
 * A coarse Data-Matrix-style grid: gapped chunky modules (decorative, NOT a
 * live code), painted twice in the JSX — an off-register red pass behind
 * (#pm-ghost) and the ink pass on top (#pm-cells). Because the pattern is
 * fully deterministic (a static 8×8 bit grid at a fixed 11px pitch / 9px
 * module → 2px gap), it is rendered DECLARATIVELY from these rects rather
 * than injected imperatively. The `<rect>` geometry is byte-identical to the
 * original: x = c·11, y = r·11, width = height = 9 for every "1" cell.
 */

// the exact bit pattern from main.js (P), row-major
const P = [
  "10101010",
  "11010011",
  "10110100",
  "11001101",
  "10100110",
  "11011001",
  "10010100",
  "11111111",
] as const;

const S = 11; // pitch
const SZ = 9; // module

export interface PmRect {
  x: number;
  y: number;
  key: string;
}

/** the module rects for every set bit — same order main.js appended them */
export const PM_RECTS: PmRect[] = (() => {
  const out: PmRect[] = [];
  for (let r = 0; r < P.length; r++) {
    const row = P[r];
    for (let c = 0; c < row.length; c++) {
      if (row.charAt(c) === "1") {
        out.push({ x: c * S, y: r * S, key: r + "-" + c });
      }
    }
  }
  return out;
})();

export const PM_MODULE = SZ;
