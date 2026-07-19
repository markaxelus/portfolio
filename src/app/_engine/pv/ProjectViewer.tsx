"use client";

import { useRef } from "react";
import { usePV } from "./usePV";

/** The empty proof-sheet shell (mirrors prototypes/index.html — the sheet
 *  itself is composed by the engine per open; see usePV). */
export default function ProjectViewer() {
  const rootRef = useRef<HTMLElement>(null);
  usePV(rootRef);
  return (
    <section
      className="pv"
      id="pv"
      role="dialog"
      aria-modal="true"
      aria-label="Project proof sheet"
      ref={rootRef}
    />
  );
}
