/**
 * Scalar helpers — ported VERBATIM from prototypes/main.js (lines 988–990),
 * where they were declared inside the cursor loop but consumed across the
 * thread, hold-register, cairn, and softPull. Hoisted to a shared module.
 */

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export const clamp = (v: number, lo: number, hi: number): number =>
  Math.min(hi, Math.max(lo, v));

export const r2 = (v: number): number => Math.round(v * 100) / 100;
