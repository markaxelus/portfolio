"use client";

import { useAmbientAudio } from "@/app/_engine/ambient/use-ambient-audio";
import { useTabTitle } from "@/app/_engine/ambient/use-tab-title";
import { useIdleWhisper } from "@/app/_engine/ambient/use-idle-whisper";
import { usePageAwake } from "@/app/_engine/ambient/use-page-awake";

/**
 * AMBIENT LIFE — the page's small unprompted life, ported from prototypes/
 * main.js. A selector-driven singleton (renders null, no root): it
 *   • OWNS the opt-in WebAudio synths on the engine registry
 *     (sndClack / sndTok / sndSlam — created lazily on first enable, gated by
 *     engine.noiseOn, never persisted),
 *   • makes the tab miss you on blur,
 *   • whispers #idle-line after two idle minutes,
 *   • lets the sheet fidget on its own every 9-22s (rattle / mutter / hiccup).
 *
 * Mount it ONCE, anywhere under <EngineProvider> (it targets its DOM by
 * selector). Every act obeys the media flags; the mess (body.proof), a hidden
 * tab, reduced motion and ?still all silence it.
 */
export default function AmbientLife(): null {
  useAmbientAudio();
  useTabTitle();
  useIdleWhisper();
  usePageAwake();
  return null;
}
