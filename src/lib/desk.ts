/**
 * Desk clock / date / status — ported from prototypes/main.js (lines 426–463).
 * The functions take an explicit `now: Date` instead of reading `new Date()`
 * internally, so callers keep the non-deterministic clock read inside a client
 * effect (SSR determinism). The America/Los_Angeles Intl formatting is
 * deterministic given a Date.
 */

export const DESK_TZ = "America/Los_Angeles";

export function deskTime(now: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: DESK_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
}

export function deskHour(now: Date): number {
  return +new Intl.DateTimeFormat("en-GB", {
    timeZone: DESK_TZ,
    hour: "2-digit",
    hour12: false,
  }).format(now);
}

export function deskStatus(now: Date): string {
  const h = deskHour(now);
  return h >= 8 && h < 19
    ? "I AM PROBABLY AT THE DESK"
    : "THE DESK SLEEPS. WRITE ANYWAY";
}

/** the jobline / stamp date, e.g. "14 JUL 2026" */
export function deskDateStr(now: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: DESK_TZ,
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(now)
    .toUpperCase();
}
