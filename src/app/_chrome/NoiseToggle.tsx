"use client";

import { useEngine } from "../_engine/engine-context";

export default function NoiseToggle() {
  const { noiseOn, setNoise } = useEngine();
  return (
    <button
      className="noise-toggle"
      type="button"
      id="noise-btn"
      aria-pressed={noiseOn}
      onClick={() => setNoise(!noiseOn)}
    >
      [S] PRESS NOISE &mdash; {noiseOn ? "ON" : "OFF"}
    </button>
  );
}
