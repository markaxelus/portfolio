"use client";

import { useEffect } from "react";
import { useEngine } from "@/app/_engine/engine-context";

/**
 * releaseMasks — the v3 lockup's entrance lands. Ported VERBATIM from
 * prototypes/main.js (1648–1668).
 *
 * The hero title ships its entrance masks armed (the filled `.hl` transform is a
 * stacking context that would steal the specimen's pointer events; commas /
 * descenders clip). `.landed` drops both — but only AFTER the lockup has set:
 * we wait for `.hero-title.v3 .v3-desk`'s OWN `animationend` (animationend
 * BUBBLES, so a child `.ch` rattle would fire it — hence the `e.target` check),
 * with a 2.4s failsafe (belt and braces — the loader path lands it well before
 * the amp reel needs `.landed`; here the SETTING's hero-set entrance is the
 * clock). Under reduced/`?still` (no entrance animation) it lands immediately.
 * At land it re-measures the mess anchors so they aim at the RESTED type
 * (`engine.api.current.positionAnchors` — owned by the anchors system, no-op
 * until it mounts).
 *
 * Independent of the arming (`use-setting`): `.landed` must land regardless of
 * mess / reduced / still, because the hero is only interactive once it lands.
 */
export function useReleaseMasks(): void {
  const engine = useEngine();
  const api = engine.api;

  useEffect(() => {
    const heroTitleEl = document.getElementById("hero-title");
    if (!heroTitleEl) return;

    // read the ground-truth media at mount (matches main.js reduced()/stillMode)
    const stillMode = /[?&]still(\b|=)/.test(window.location.search);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lastSet =
      document.querySelector<HTMLElement>(".hero-title.v3 .v3-desk") ||
      document.querySelector<HTMLElement>(".hl-mask:last-child .hl");

    let heroLanded = false;
    const releaseMasks = () => {
      if (heroLanded) return;
      heroLanded = true;
      heroTitleEl.classList.add("landed");
      api.current.positionAnchors?.();
    };

    let failsafe: ReturnType<typeof setTimeout> | undefined;
    let onLand: ((e: AnimationEvent) => void) | null = null;

    if (lastSet && !stillMode && !reduced) {
      // animationend bubbles (a child .ch rattle would fire it) — only the
      // word's own entrance counts
      const target = lastSet; // non-null capture for the nested closure
      onLand = (e: AnimationEvent) => {
        if (e.target !== target) return;
        target.removeEventListener("animationend", onLand!);
        releaseMasks();
      };
      target.addEventListener("animationend", onLand);
      failsafe = setTimeout(releaseMasks, 2400); // belt and braces
    } else {
      releaseMasks();
    }

    return () => {
      if (failsafe !== undefined) clearTimeout(failsafe);
      if (lastSet && onLand) lastSet.removeEventListener("animationend", onLand);
    };
  }, [api]);
}
