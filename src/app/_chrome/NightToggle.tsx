"use client";

import { useEngine } from "../_engine/engine-context";

export default function NightToggle() {
  const { isNight, setNight } = useEngine();
  return (
    <button
      className="night-toggle"
      type="button"
      id="night-btn"
      aria-pressed={isNight}
      onClick={() => setNight(!isNight, true)}
    >
      {isNight ? (
        <>
          [N] DAY SHIFT <span className="moon">&#9728;</span>
        </>
      ) : (
        <>
          [N] NIGHT OFFICE <span className="moon">&#9686;</span>
        </>
      )}
    </button>
  );
}
