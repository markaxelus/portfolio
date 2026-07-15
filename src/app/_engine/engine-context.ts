"use client";

import { createContext, useContext, type RefObject } from "react";

export interface Point {
  x: number;
  y: number;
}

/**
 * The imperative registry — the React translation of main.js's hoisted/late-
 * bound cross-subsystem functions. Each owner assigns its handle in a mount
 * effect (e.g. `api.current.logAct = ...`); callers invoke through it
 * (`api.current.regKick?.(1.8)`) and safely no-op until the owner mounts.
 */
export interface EngineApi {
  logAct?: (line: string, instant?: boolean) => void;
  regKick?: (px: number) => void;
  strikeAll?: (instant?: boolean) => void;
  positionAnchors?: () => void;
  disarmSetting?: () => void;
  kickSheet?: (i: number) => void;
  sndClack?: () => void;
  sndTok?: () => void;
  sndSlam?: () => void;
  resetLooseType?: () => void;
  closeProject?: () => void;
  openProject?: (idx: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: ((...args: any[]) => unknown) | undefined;
}

/**
 * The shared engine context — the React translation of main.js's module scope.
 * Truly-global state that drives what renders (accent/plates, theme, mess/proof,
 * noise) plus the media flags every physics system reads. Hot-path values
 * (mouse, scroll prog, per-frame refs) live on the provider's refs, not here.
 */
export interface EngineCtx {
  /** accent index 0..2 (signal / magenta / acid); persisted `ma-accent-i` */
  accentI: number;
  setAccent: (i: number) => void;
  /** the four plate data-URIs re-inked in the current accent (memoized) */
  plates: string[];

  /** night office (`body.night`); persisted `ma-night` */
  isNight: boolean;
  setNight: (on: boolean, persist?: boolean) => void;

  /** the mess / persona layer (`body.proof`) */
  proofOn: boolean;
  setProof: (on: boolean) => void;

  /** press-noise opt-in (never persisted) */
  noiseOn: boolean;
  setNoise: (on: boolean) => void;

  /** prefers-reduced-motion */
  reduced: boolean;
  /** `?still` — freeze all motion */
  stillMode: boolean;
  /** fine pointer && !reduced — the cursor dot / reveal / hover systems run */
  trailEnabled: boolean;

  /** the single pointer feed (viewport coords); mutated by the root mousemove
   *  and by drag hooks' own pointermove (the compat-mousemove rule) */
  mouse: RefObject<Point>;
  /** subscribe a per-scroll-frame callback (prog 0..1); returns an unsubscribe */
  subscribeScroll: (fn: (prog: number) => void) => () => void;

  /** cross-subsystem imperative handles (see EngineApi) */
  api: RefObject<EngineApi>;
}

export const EngineContext = createContext<EngineCtx | null>(null);

export function useEngine(): EngineCtx {
  const c = useContext(EngineContext);
  if (!c) throw new Error("useEngine must be used within <EngineProvider>");
  return c;
}
