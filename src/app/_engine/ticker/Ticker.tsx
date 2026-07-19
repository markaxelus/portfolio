"use client";

import { Fragment, useEffect, useRef, useState } from "react";
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
 * line was dropped at Mark's request (July 2026); "I SHIP SLOWLY" re-voiced,
 * "NO FRAMEWORK" corrected (the v2 rebuild made it a lie), and the email line
 * removed outright (the CONTACT corner + outro carry contact) — all his
 * request too (July 15). One hint per cycle — PRESS M keeps the slot.
 */
function lines(now: Date): string[] {
  return [
    "CODE · DESIGN · TYPE · MOTION",
    deskStatus(now),
    "THE KERNING IS DONE. IT ISN’T.",
    "MOST OF THIS WAS SET AFTER MIDNIGHT",
    "THERE’S ANOTHER PAGE UNDER THIS ONE. PRESS M",
    "NO TRACKERS · YOUR STONES STAY IN YOUR BROWSER",
    "ONE-PERSON OPERATION",
    "STILL NOT DONE. NEVER QUITE IS.",
  ];
}

export default function Ticker() {
  const [items, setItems] = useState<string[] | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setItems(lines(new Date()));
  }, []);

  /* the marquee runs only while its strip is on screen — an infinite
     transform animation on an off-screen element still ticks the
     compositor every frame for nothing (phones notice) */
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((en) => el.classList.toggle("tk-off", !en.isIntersecting));
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="ticker mono final" aria-hidden="true" ref={rootRef}>
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
