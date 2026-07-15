"use client";

import { useLoader } from "./use-loader";

/**
 * THE MAKE-READY LOADER — the client shell for the first-visit make-ready +
 * the & finale. Renders nothing: it drives the server-rendered `#makeready` /
 * `#mr-frame` (in page.tsx) by id and exposes the `window.__ampFly` /
 * `window.__ampFlood` cross-frame seam that the loader iframe calls.
 *
 * Mount anywhere inside <EngineProvider> — placement is cosmetic (it queries
 * the DOM globally and gates on willLoaderRun()). It no-ops entirely on
 * return visits / reduced-motion / ?still (the booth ships hidden).
 *
 * INTEGRATOR NOTE: THE SETTING (use-setting) must skip its hero-set entrance
 * when willLoaderRun() — the loader's flight IS the entrance — and land the
 * hero at rest (`#hero-title.landed`) so the flip flies into settled words.
 * That is already wired (use-setting.ts). See the manifest.
 */
export default function Loader(): null {
  useLoader();
  return null;
}
