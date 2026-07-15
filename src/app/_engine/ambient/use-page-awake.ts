"use client";

import { useEffect, useRef } from "react";
import { useEngine } from "@/app/_engine/engine-context";

/* the mutter alphabet: caps, digits, and a few print sorts (main.js 3798) */
const MUTTER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·—□";

/**
 * THE PAGE IS AWAKE — ported VERBATIM from prototypes/main.js (3785-3853).
 * Every 9-22s the page does ONE small unprompted act:
 *   • a hero letter (.ch) RATTLES loose in its case (invites the grab),
 *   • a decode decal (.decode .c1) MUTTERS — re-decodes itself, scramble → settle,
 *   • the regmark HICCUPS — corrects its drift (reg-hiccup composes with reg-spin),
 *   • the imprint device DRIFTS — its red pass creeps off register, eases home.
 * One act at a time; the RATTLE is weighted double (it carries discovery). Never
 * in the mess (body.proof — the cat has that shift), never when the tab is
 * hidden, never under reduced motion or ?still.
 *
 * Selector-driven (the component renders null): `.ch` are built by the hero's
 * own hook and queried live per act (absent early / all loose → the act no-ops,
 * mirroring the source's `chars.filter(!c.loose)` guard). A loose letter carries
 * a physics inline transform or `.grabbed`, so those are skipped — the rattle
 * keyframe must not fight the throw.
 */
export function usePageAwake(): void {
  const { reduced, stillMode } = useEngine();

  // one shared `muttering` latch across scheduled acts (main.js closure var)
  const mutteringRef = useRef(false);

  useEffect(() => {
    if (reduced || stillMode) return;

    // timers we must be able to cancel on unmount (the source never unmounts)
    let lifeT: ReturnType<typeof setTimeout> | null = null;
    let muttIv: ReturnType<typeof setInterval> | null = null;
    let muttEl: HTMLElement | null = null;
    let muttOrig = "";
    const rattleTimers = new Set<ReturnType<typeof setTimeout>>();

    /* a hero letter rattles loose in its case. LIVE = not currently loose:
       a loose sort has a physics inline transform (or .grabbed while held). */
    function actRattle() {
      const live = (
        Array.prototype.slice.call(
          document.querySelectorAll("#hero-title .ch"),
        ) as HTMLElement[]
      ).filter((el) => !el.classList.contains("grabbed") && !el.style.transform);
      if (!live.length) return;
      const c = live[(Math.random() * live.length) | 0];
      c.classList.add("rattle");
      const to = setTimeout(() => {
        c.classList.remove("rattle");
        rattleTimers.delete(to);
      }, 650);
      rattleTimers.add(to);
    }

    /* the mutterables: decode primaries with NO children (the ones carrying a
       live square / counter are skipped). SSR-static, so cached once. */
    const mutterables = (
      Array.prototype.slice.call(
        document.querySelectorAll(".decode .c1"),
      ) as HTMLElement[]
    ).filter((el) => el.children.length === 0);

    function actMutter() {
      if (mutteringRef.current || !mutterables.length) return;
      mutteringRef.current = true;
      const el = mutterables[(Math.random() * mutterables.length) | 0];
      const orig = el.textContent || "";
      muttEl = el;
      muttOrig = orig;
      let f = 0;
      const TOTAL = 9;
      muttIv = setInterval(() => {
        f++;
        if (f >= TOTAL) {
          if (muttIv) clearInterval(muttIv);
          muttIv = null;
          el.textContent = orig;
          muttEl = null;
          mutteringRef.current = false;
          return;
        }
        const settled = Math.floor((f / TOTAL) * orig.length);
        let out = orig.slice(0, settled);
        for (let i = settled; i < orig.length; i++) {
          const ch = orig[i];
          out +=
            ch === " " || ch === " "
              ? ch
              : MUTTER_CHARS[(Math.random() * MUTTER_CHARS.length) | 0];
        }
        el.textContent = out;
      }, 48);
    }

    /* the regmark corrects its drift (reg-hiccup composes with reg-spin, so
       the drift never resets); the animationend clears the class. */
    const regEl = document.querySelector<SVGElement>(".regmark");
    function actHiccup() {
      if (regEl) regEl.classList.add("hiccup");
    }

    /* the imprint marlin's red pass creeps further off register, then the
       shop eases it home (the .dev-ghost transition carries both ways).
       TWO ghosts — the fish is printed once per side of the seam — so the
       act must move them in register with each other. */
    const devEls = Array.prototype.slice.call(
      document.querySelectorAll(".imprint .dev-ghost"),
    ) as SVGGElement[];
    let adriftT: ReturnType<typeof setTimeout> | null = null;
    function actAdrift() {
      if (!devEls.length || devEls[0].classList.contains("adrift")) return;
      devEls.forEach((el) => el.classList.add("adrift"));
      adriftT = setTimeout(
        () => devEls.forEach((el) => el.classList.remove("adrift")),
        900,
      );
    }
    const onRegAnimEnd = (e: AnimationEvent) => {
      if (e.animationName === "reg-hiccup" && regEl) regEl.classList.remove("hiccup");
    };
    if (regEl) regEl.addEventListener("animationend", onRegAnimEnd as EventListener);

    // the rattle carries discovery weight (loose type), so it comes up more
    const ACTS = [actRattle, actMutter, actHiccup, actAdrift, actRattle];

    function scheduleLife() {
      lifeT = setTimeout(() => {
        if (!document.hidden && !document.body.classList.contains("proof")) {
          ACTS[(Math.random() * ACTS.length) | 0]();
        }
        scheduleLife();
      }, 9000 + Math.random() * 13000);
    }
    scheduleLife();

    return () => {
      if (lifeT) clearTimeout(lifeT);
      if (muttIv) {
        clearInterval(muttIv);
        // restore any in-flight scramble to its settled text
        if (muttEl) muttEl.textContent = muttOrig;
      }
      muttEl = null;
      mutteringRef.current = false;
      rattleTimers.forEach((to) => clearTimeout(to));
      rattleTimers.clear();
      if (adriftT) clearTimeout(adriftT);
      devEls.forEach((el) => el.classList.remove("adrift"));
      if (regEl) {
        regEl.removeEventListener("animationend", onRegAnimEnd as EventListener);
        regEl.classList.remove("hiccup");
      }
      (
        Array.prototype.slice.call(
          document.querySelectorAll("#hero-title .ch.rattle"),
        ) as HTMLElement[]
      ).forEach((el) => el.classList.remove("rattle"));
    };
  }, [reduced, stillMode]);
}
