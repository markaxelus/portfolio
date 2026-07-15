"use client";

import { Fragment, useEffect, useState } from "react";
import { deskStatus } from "@/lib/desk";

/**
 * THE TICKER SEAM — the marquee speaks in Mark's voice (ported from
 * prototypes/main.js `TICKER`, 470–495). The React page shipped `#ticker-track`
 * EMPTY, so the seam rendered as a blank ~43px strip ("the banner doesn't
 * work"); this fills it.
 *
 * Built client-side on purpose: the desk-status line reads the live LA hour, so
 * SSR keeps the empty track (identical to the settled DOM — no hydration drift)
 * and mount fills it. The list is rendered TWICE because the CSS `tick` keyframe
 * translates the track 0 → -50%, so a seamless loop needs two identical halves.
 *
 * aria-hidden decorative furniture; `.mono .final` so it dims in the mess and
 * the marquee pauses there (`.proof .ticker-track`). The old "AVAILABLE Q4 2026"
 * line was dropped at Mark's request (July 2026).
 */
function lines(now: Date): string[] {
  return [
    "CODE · DESIGN · TYPE · MOTION",
    deskStatus(now),
    "THE KERNING IS DONE. IT ISN’T.",
    "I SHIP SLOWLY, ON PURPOSE",
    "THERE’S ANOTHER PAGE UNDER THIS ONE. PRESS M",
    "NO FRAMEWORK · NO TRACKERS · HAND-BUILT",
    "ONE-PERSON OPERATION",
    "STILL NOT DONE. NEVER QUITE IS.",
    "MRKAXELUS@GMAIL.COM · REPLIES IN 48H",
  ];
}

export default function Ticker() {
  const [items, setItems] = useState<string[] | null>(null);

  useEffect(() => {
    setItems(lines(new Date()));
  }, []);

  return (
    <div className="ticker mono final" aria-hidden="true">
      <div className="ticker-track" id="ticker-track">
        {items &&
          [...items, ...items].map((t, i) => (
            <Fragment key={i}>
              <span>{t}</span>
              <span className="tick-mark">{"✲"}</span>
            </Fragment>
          ))}
      </div>
    </div>
  );
}
