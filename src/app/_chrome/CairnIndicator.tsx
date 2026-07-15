import { stonePath } from "@/lib/rng";

/** the 5-stone scroll cairn (main.js 1868–1883); seeded so SSR == client.
 *  The scroll engine toggles `.on` per progress threshold. */
const IND = [
  { cy: 108, rx: 16, ry: 8, seed: 11 },
  { cy: 93, rx: 13.5, ry: 7, seed: 23 },
  { cy: 79.5, rx: 11, ry: 6.5, seed: 37 },
  { cy: 67.5, rx: 8.5, ry: 5.5, seed: 51 },
  { cy: 57.5, rx: 6, ry: 4.5, seed: 66 },
];

export default function CairnIndicator() {
  return (
    <div className="cairn-ind" id="cairn-ind" aria-hidden="true">
      <svg viewBox="0 0 44 120" id="cairn-svg">
        {IND.map((s, i) => (
          <path
            key={i}
            d={stonePath(22, s.cy, s.rx, s.ry, s.seed)}
            className={i === IND.length - 1 ? "top-stone" : undefined}
          />
        ))}
      </svg>
    </div>
  );
}
