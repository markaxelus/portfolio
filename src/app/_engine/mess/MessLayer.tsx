"use client";

import { useMess } from "./use-mess";

/**
 * THE MESS LAYER (mess only) — the working desk under the proof.
 *
 * Renders nothing. It operates on the EXISTING server-rendered DOM by id/class
 * (the hero's #amp / #deskw / #anchor-amp / #anchor-bio / #amark-desk, the
 * outro's #write-link / #amark-write, the `.note` / `.anchor` / `.chip-ring` /
 * `.amark` marginalia across every section, the `.cat`) via useMess — a verbatim
 * port of the proof-mode working layer, the cat, and fresh ink from
 * prototypes/main.js. Mount it once inside <EngineProvider>; placement is
 * cosmetic (it queries the DOM at effect time).
 */
export default function MessLayer(): null {
  useMess();
  return null;
}
