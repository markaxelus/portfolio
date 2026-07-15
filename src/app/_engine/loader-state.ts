"use client";

/**
 * One per-load determination shared by the make-ready loader and THE SETTING.
 * The loader's flight IS the hero entrance when it runs, so the setting must
 * SKIP its own hero-set entrance exactly when the loader will run. Both import
 * this and get the same memoized answer (no mount-order race).
 *
 * Runs (first visit each session, or ?loader replay) unless reduced-motion or
 * ?still. Memoized on first client call so a later sessionStorage write (by the
 * loader marking itself done) can't flip the answer mid-load.
 */
let cached: boolean | null = null;

export function willLoaderRun(): boolean {
  if (cached !== null) return cached;
  if (typeof window === "undefined") return false; // SSR: never the loader
  const still = /[?&]still(\b|=)/.test(window.location.search);
  const forcedReplay = /[?&]loader(\b|=)/.test(window.location.search);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let firstVisit = true;
  try {
    firstVisit = sessionStorage.getItem("ma-press-check") == null;
  } catch {}
  cached = !still && !reduced && (forcedReplay || firstVisit);
  return cached;
}
