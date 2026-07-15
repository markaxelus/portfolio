"use client";

import { useEngine } from "../_engine/engine-context";

/** the chip swatches (brighter than the day accent for acid, as in the source) */
const CHIP_BG = ["#2A2AF0", "#D6246E", "#B4C400"];
const CHIP_LABEL = ["Paint it signal blue", "Paint it magenta", "Paint it acid"];

export default function PaintChips() {
  const { accentI, setAccent } = useEngine();
  return (
    <div className="chips">
      <span className="chip-static chip-ink" aria-hidden="true" />
      {CHIP_BG.map((bg, i) => (
        <button
          key={i}
          className="chip"
          type="button"
          data-ai={i}
          aria-label={CHIP_LABEL[i]}
          aria-pressed={i === accentI}
          style={{ background: bg }}
          onClick={() => setAccent(i)}
        />
      ))}
      <span className="chip-static chip-fade" aria-hidden="true" />
    </div>
  );
}
