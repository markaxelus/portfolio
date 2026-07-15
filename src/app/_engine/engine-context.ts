"use client";

import { createContext, useContext } from "react";

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
}

export const EngineContext = createContext<EngineCtx | null>(null);

export function useEngine(): EngineCtx {
  const c = useContext(EngineContext);
  if (!c) throw new Error("useEngine must be used within <EngineProvider>");
  return c;
}
