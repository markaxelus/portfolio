import { Fragment } from "react";
import type { ReactNode, RefObject } from "react";

/**
 * The hero's per-glyph sort — the React translation of main.js's `chars`
 * entries (lines 1134-1233). Every [data-ink] word is split into `.ch` spans
 * (declaratively, in the JSX render — StrictMode-idempotent, no imperative
 * textContent surgery). One object per span carries BOTH the ink-pooling axis
 * state (t / lw / ls) and the loose-type letterpress physics (x…resting).
 */
export interface Ch {
  el: HTMLElement;
  amp: boolean;
  /** ink pooling: quantized swell + last-written wght/SOFT (skip unchanged) */
  t: number;
  lw: number;
  ls: number;
  /** loose type: letterpress physics */
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  loose: boolean;
  resting: boolean;
}

/** engine media flags mirrored to refs so the loops read them synchronously */
export interface HeroFlags {
  trail: RefObject<boolean>;
  reduced: RefObject<boolean>;
  proof: RefObject<boolean>;
}

/**
 * Split a [data-ink] word into `.ch` spans, VERBATIM to main.js's splitter
 * (1139-1150): spaces (U+0020) and non-breaking spaces (U+00A0) stay bare text
 * nodes between the spans; every other character becomes a `<span class="ch">`.
 * The amp is a single "&" → exactly one pure `.ch` (the reel/finale depends on
 * that). Rendered server-side so the settled/printed DOM already carries them.
 */
export function inkChars(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === "\u0020" || c === "\u00A0") {
      out.push(<Fragment key={i}>{c}</Fragment>);
      continue;
    }
    out.push(
      <span key={i} className="ch">
        {c}
      </span>,
    );
  }
  return out;
}

/**
 * Collect the rendered `.ch` nodes into the physics array (main.js 1135-1151).
 * querySelectorAll walks in document order — amp, then Mark, then My desk — and
 * the amp flag is read off each [data-ink] host (id "amp" || class "amp"), so
 * the order + amp mask match the original exactly.
 */
export function collectChars(root: HTMLElement): Ch[] {
  const chars: Ch[] = [];
  root.querySelectorAll<HTMLElement>("[data-ink]").forEach((el) => {
    const amp = el.id === "amp" || el.classList.contains("amp");
    el.querySelectorAll<HTMLElement>(".ch").forEach((span) => {
      chars.push({
        el: span,
        amp,
        t: 0,
        lw: -1,
        ls: -1,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        rot: 0,
        vr: 0,
        loose: false,
        resting: false,
      });
    });
  });
  return chars;
}
