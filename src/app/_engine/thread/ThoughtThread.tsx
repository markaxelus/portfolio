"use client";

import { useThoughtThread } from "./useThoughtThread";

/**
 * THE THOUGHT-THREAD (mess only) — the spine of the hidden page.
 *
 * Renders nothing. It drives the EXISTING #thread SVG (paths #th-a / #th-a-echo
 * / #th-b / #th-b-echo / #th-spur / #th-scratch / #th-arrow / #th-tip, already
 * in page.tsx's <main class="page">) by id via useThoughtThread — a verbatim
 * port of the seeded two-pen re-read physics from prototypes/main.js. Mount it
 * anywhere inside the tree; it queries the DOM by id, so placement is cosmetic.
 */
export default function ThoughtThread(): null {
  useThoughtThread();
  return null;
}
