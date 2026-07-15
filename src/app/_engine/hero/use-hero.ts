"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { useEngine } from "../engine-context";
import { collectChars, type Ch, type HeroFlags } from "./chars";
import { useInkPooling } from "./use-ink-pooling";
import { useLooseType } from "./use-loose-type";
import { usePlatePull } from "./use-plate-pull";

/**
 * The hero's physics, wired to the section's server-rendered DOM. One shared
 * `.ch` array (built once from the declaratively-rendered spans) feeds all
 * three ported subsystems: ink pooling (swell under the nib), loose type
 * (letterpress physics), and the plate pull (shift-drag off register).
 *
 * Engine media flags are mirrored to refs DURING RENDER (the same pattern the
 * EngineProvider uses) so the rAF/pointer loops read them synchronously without
 * re-subscribing — the effects run once and never tear down on a toggle.
 */
export function useHero(
  rootRef: RefObject<HTMLElement | null>,
  titleRef: RefObject<HTMLHeadingElement | null>,
): void {
  const engine = useEngine();
  const charsRef = useRef<Ch[]>([]);

  // mirror the reactive flags onto refs the loops can read without re-running
  const trailRef = useRef(engine.trailEnabled);
  const reducedRef = useRef(engine.reduced);
  const proofRef = useRef(engine.proofOn);
  trailRef.current = engine.trailEnabled;
  reducedRef.current = engine.reduced;
  proofRef.current = engine.proofOn;
  const flags: HeroFlags = { trail: trailRef, reduced: reducedRef, proof: proofRef };

  // build the shared sort array once (runs before the behavior effects below)
  useEffect(() => {
    if (rootRef.current) charsRef.current = collectChars(rootRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInkPooling(rootRef, charsRef, flags, engine);
  useLooseType(rootRef, titleRef, charsRef, flags, engine);
  usePlatePull(titleRef, flags, engine);
}