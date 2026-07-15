"use client";

import { useEffect } from "react";
import { mulberry32 } from "@/lib/rng";
import { useEngine } from "@/app/_engine/engine-context";

/**
 * THE SETTING — matter arrives by hand (main.js initSetting, 2728–2960),
 * ported VERBATIM. The strike is ink; this is MATTER, set DOWN onto the sheet
 * (dropped stones, hung sheets, pulled specimen) — never floated up. Every
 * arrival is jittered by ONE per-load mulberry32 seed (drop height, duration,
 * delay, an occasional lateral / lean that settles TRUE): no two elements move
 * alike, no two loads are identical, destinations are always exact.
 *
 * Discipline (§5): all transform/opacity, vars written ONCE at arm time, zero
 * reads in any loop. One IntersectionObserver (rootMargin "0px 0px -12% 0px",
 * unobserve-on-entry) drives set-in per section. Not persisted — replays every
 * load. reduced / `?still` / no-js / print ship VISIBLE: the SSR DOM has no
 * `set-*` classes, so returning early before arming simply leaves matter at its
 * natural opacity (belt and braces; the CSS media/print blocks reinforce it).
 *
 * StrictMode: the seed is module-latched so both dev invokes produce identical
 * vars; arming is idempotent (classList.add / setProperty); the effect tears
 * down its observer / listeners / timers on cleanup.
 *
 * NOTE (per the migration blueprint): this is the NON-LOADER entrance. The
 * loader (Phase 8) is not built, so the `!mrRan` branch always runs (hero-set /
 * spec-set added on every load). The amp reel / cede machinery is untouched.
 */

type StyleEl = HTMLElement | SVGElement;

/** this load's hand — latched so a StrictMode re-mount reuses the same seed
 *  (reseeding to a new value between the two mounts would jump the arrivals). */
let settingSeed: number | null = null;

export function useSetting(): void {
  const engine = useEngine();
  const api = engine.api;

  useEffect(() => {
    /* reduced / ?still ship visible — read the ground truth (matches main.js
       reduced() = mqReduce.matches, stillMode = the ?still flag). Nothing is
       armed, so the SSR-settled DOM stays at its natural opacity. */
    const stillMode = /[?&]still(\b|=)/.test(window.location.search);
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (stillMode || mqReduce.matches) return;

    if (settingSeed === null) settingSeed = (Date.now() & 0xfffff) >>> 0;
    const srnd = mulberry32(settingSeed); // this load's hand
    const rj = (a: number, b: number): number => a + srnd() * (b - a);
    const pick = <T>(arr: T[]): T => arr[Math.floor(srnd() * arr.length)];

    const armed: StyleEl[] = []; // elements holding set classes
    const bodyCls: string[] = []; // body-level arms
    const arm = (
      el: StyleEl | null,
      cls: string,
      vars?: Record<string, string>,
    ): StyleEl | null => {
      if (!el) return null;
      el.classList.add(cls);
      if (vars) for (const k in vars) el.style.setProperty(k, vars[k]);
      armed.push(el);
      return el;
    };

    /* one element's seeded arrival: its own drop, its own clock. every third
       or so arrives with a whisper of lateral or lean that settles to true —
       the hand never places two sorts identically. */
    const setVars = (extra?: Record<string, string>): Record<string, string> => {
      const v: Record<string, string> = {
        "--sy": rj(-24, -10).toFixed(1) + "px",
        "--sdur": rj(0.42, 0.62).toFixed(2) + "s",
        "--sd": rj(0, 0.12).toFixed(2) + "s",
      };
      if (srnd() < 0.35) v["--sx"] = (pick([-1, 1]) * rj(3, 7)).toFixed(1) + "px";
      if (srnd() < 0.3) v["--sr"] = (pick([-1, 1]) * rj(0.3, 0.7)).toFixed(2) + "deg";
      if (extra) for (const k in extra) v[k] = extra[k];
      return v;
    };

    /* teardown registry — declared up front so the choreo closures (called
       later, at IO time) can push their timers into it. */
    const timers: Array<ReturnType<typeof setTimeout>> = [];
    let io: IntersectionObserver | null = null;
    const cleanups: Array<() => void> = [];

    /* ---- singles: each sets on its own seeded clock ---- */
    [
      ".ticker", ".trail-frame", ".index-head", ".index-sub", ".desk-head",
      ".yard-head", ".outro-title",
    ].forEach((sel) => {
      arm(document.querySelector<HTMLElement>(sel), "set-in", setVars());
    });
    /* the operator's plate is the heaviest single on the page */
    arm(document.querySelector<HTMLElement>("#op"), "set-in",
        setVars({ "--sy": "-26px", "--sdur": "0.64s" }));

    /* ---- groups: seeded, NON-monotonic — tossed on, not dealt ---- */
    const armGroup = (sel: string, spread: number): void => {
      const els = Array.prototype.slice.call(
        document.querySelectorAll<HTMLElement>(sel),
      ) as HTMLElement[];
      const order = els.map((_, i) => i);
      for (let i = order.length - 1; i > 0; i--) { // seeded shuffle
        const j = Math.floor(srnd() * (i + 1)), t = order[i];
        order[i] = order[j]; order[j] = t;
      }
      els.forEach((el, i) => {
        arm(el, "set-in", setVars({
          "--sd": (order[i] * (spread / Math.max(1, els.length)) + rj(0, 0.05)).toFixed(2) + "s",
        }));
      });
    };
    armGroup(".desk-rows .desk-row", 0.3);
    armGroup(".check-pair, .outro-links, .colophon", 0.34);

    /* ---- the hanging sheets: fade in + a DRAFT KICK through the real physics
       (kickSheet is owned by the line now — called per row as it enters) ---- */
    ["#p-01", "#p-02", "#p-03", "#p-04", ".line-dock"].forEach((sel) => {
      arm(document.querySelector<HTMLElement>(sel), "set-fade");
    });
    arm(document.querySelector<HTMLElement>(".yard-ground"), "set-fade");

    /* ---- the trail: stones LAND (L→R, jittered, 2026 last), then the ground
       line draws through their bases, then the legend sets ---- */
    const trailEl2 = document.querySelector<HTMLElement>(".trail");
    /* the choreo fires off the STONES themselves, not the section top (they
       sit low in .trail — keying on the section landed them below the fold) */
    const trailTrig = trailEl2
      ? trailEl2.querySelector<HTMLElement>(".terrain-stones")
      : null;
    let trailDone = false;
    if (trailEl2) {
      arm(trailEl2, "stones-armed");
      trailEl2.querySelectorAll<HTMLElement>(".mile-label").forEach((el) => {
        arm(el, "set-in", setVars({ "--sd": rj(0, 0.3).toFixed(2) + "s" }));
      });
    }
    let trailRaf = 0;
    const trailChoreo = (): void => {
      if (trailDone || !trailEl2) return;
      const trail = trailEl2; // non-null capture for the nested closures
      trailDone = true;
      let maxD = 0;
      trail.querySelectorAll<HTMLElement>(".terrain-stones .stone-slot")
        .forEach((slot, i) => {
          const st = slot.querySelector<SVGSVGElement>(".mile-stone");
          if (!st) return;
          const d = slot.classList.contains("is-now")
            ? 0 /* assigned after the loop — the present lands last */
            : i * 0.11 + rj(-0.05, 0.05);
          st.style.setProperty("--sd", Math.max(0, d).toFixed(2) + "s");
          maxD = Math.max(maxD, d);
        });
      const now = trail.querySelector<SVGSVGElement>(".stone-slot.is-now .mile-stone");
      if (now) { maxD += 0.16; now.style.setProperty("--sd", maxD.toFixed(2) + "s"); }
      trail.classList.add("stones-go");
      /* the ground is measured only through LANDED stones — re-measure once
         they're seated (a resize mid-fall would have caught a stone in the
         air), then draw a frame later so the dash transition has a start */
      const t = setTimeout(() => {
        if (!trail.classList.contains("stones-armed")) return; // disarmed
        api.current.buildTerrain?.();
        trailRaf = requestAnimationFrame(() => {
          if (!trail.classList.contains("stones-armed")) return;
          trail.classList.add("ground-drawn");
          trail.querySelectorAll<HTMLElement>(".mile-label.set-in")
            .forEach((el) => el.classList.add("set-go"));
        });
      }, (maxD + 0.55) * 1000 + 150);
      timers.push(t);
    };

    /* ---- the yard: the cairn is stacked bottom-up; the choreography classes
       are stripped after the land so renderCairn re-runs stay inert ---- */
    const yardEl2 = document.querySelector<HTMLElement>(".yard");
    let yardDone = false;
    if (yardEl2) arm(yardEl2, "stones-armed");
    const yardChoreo = (): void => {
      if (yardDone || !yardEl2) return;
      const yard = yardEl2; // non-null capture for the nested closure
      yardDone = true;
      const inners = yard.querySelectorAll<HTMLElement>("#pile .stone-inner");
      let maxD = 0;
      inners.forEach((inner, i) => {
        const d = i * 0.07 + rj(0, 0.06);
        inner.style.setProperty("--sd", d.toFixed(2) + "s");
        maxD = Math.max(maxD, d);
      });
      yard.classList.add("stones-go");
      const t = setTimeout(() => {
        yard.classList.remove("stones-armed", "stones-go");
        inners.forEach((inner) => inner.style.removeProperty("--sd"));
      }, (maxD + 0.55) * 1000 + 100);
      timers.push(t);
    };

    /* ---- first-load hero: the lockup is set by hand, the furniture chatters
       in around it. NON-LOADER path only — always taken here (mrRan === false;
       the loader that would suppress this is Phase 8, not yet built). ---- */
    document.body.classList.add("hero-set", "spec-set");
    bodyCls.push("hero-set", "spec-set");
    const eyeEl = document.querySelector<HTMLElement>(".eyebrow");
    if (eyeEl) eyeEl.style.setProperty("--sd", rj(0.8, 1.15).toFixed(2) + "s");
    const bioEl = document.querySelector<HTMLElement>(".hero-bio");
    if (bioEl) bioEl.style.setProperty("--sd", rj(0.9, 1.3).toFixed(2) + "s");
    [
      ".d-cluster .decode", ".d-scatter", ".d-cross", ".d-run",
      ".loose-decal", ".plates-decal",
    ].forEach((sel) => {
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        el.style.setProperty("--sd", rj(1.0, 1.85).toFixed(2) + "s");
      });
    });

    /* the specimen pulls run on BOTH paths (here + at loader release) — the
       vars are seeded either way. smallest first, accelerating into the 144pt
       accent one, which lands last and heaviest. */
    const pullBase = [0.32, 0.48, 0.62, 0.76, 0.98];
    document.querySelectorAll<HTMLElement>(".spec-amp").forEach((el, i) => {
      el.style.setProperty("--sd", (pullBase[Math.min(i, 4)] + rj(-0.04, 0.04)).toFixed(2) + "s");
      if (el.classList.contains("s5")) el.style.setProperty("--sdur", "0.62s");
    });
    document.querySelectorAll<HTMLElement>(".tonebar i").forEach((el, i) => {
      el.style.setProperty("--sd", (0.5 + i * 0.055).toFixed(2) + "s"); /* the ramp: machine-linear on purpose */
    });

    /* ---- disarm + observer + listeners ---- */
    cleanups.push(() => timers.forEach((t) => clearTimeout(t)));
    cleanups.push(() => cancelAnimationFrame(trailRaf));

    /* disarm = strip the setting entirely so each element reverts to its
       natural (or .final mess-dimmed) opacity. used on mess-enter and when
       reduced motion is switched on mid-session. */
    const disarmSetting = (): void => {
      if (io) { io.disconnect(); io = null; }
      armed.forEach((el) => {
        el.classList.remove("set-in", "set-fade", "set-go",
                            "stones-armed", "stones-go", "ground-drawn");
      });
      bodyCls.forEach((c) => document.body.classList.remove(c));
      document.body.classList.remove("spec-set", "spec-armed");
    };
    api.current.disarmSetting = disarmSetting;
    cleanups.push(() => {
      if (api.current.disarmSetting === disarmSetting) delete api.current.disarmSetting;
    });

    /* arriving straight in the mess (or no observer support): ship settled.
       proof is read from the URL here (the body.proof class is applied by a
       parent effect that may not have run yet); later M-toggles disarm via the
       proof-watcher effect below. */
    const arrivedInMess =
      /[?&]proof(\b|=)/.test(window.location.search) ||
      window.location.hash === "#proof";
    if (arrivedInMess || !("IntersectionObserver" in window)) {
      disarmSetting();
      return () => cleanups.forEach((f) => f());
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target as HTMLElement;
        obs.unobserve(el);
        if (el === trailTrig) { trailChoreo(); return; }
        if (el === yardEl2) { yardChoreo(); return; }
        el.classList.add("set-go");
        if (el.classList.contains("row") && !mqReduce.matches) {
          api.current.kickSheet?.(Number(el.dataset.plate));
        }
      });
    }, { rootMargin: "0px 0px -12% 0px" }); // fire as it enters (~12% up from the bottom)
    io = obs;
    armed.forEach((el) => {
      /* legend labels wait for the ground, not the viewport */
      if (el.classList.contains("mile-label")) return;
      /* the trail is triggered by its stones (below), not the section top */
      if (el === trailEl2) return;
      obs.observe(el);
    });
    if (trailTrig) obs.observe(trailTrig);
    cleanups.push(() => obs.disconnect());

    /* a proof pulls everything at once, and reduced motion drops it */
    const onBeforePrint = (): void => {
      armed.forEach((el) => el.classList.add("set-go"));
      trailChoreo(); yardChoreo();
    };
    window.addEventListener("beforeprint", onBeforePrint);
    cleanups.push(() => window.removeEventListener("beforeprint", onBeforePrint));

    const onReduceChange = (): void => {
      if (mqReduce.matches) disarmSetting();
    };
    mqReduce.addEventListener("change", onReduceChange);
    cleanups.push(() => mqReduce.removeEventListener("change", onReduceChange));

    return () => cleanups.forEach((f) => f());
  }, [api]);

  /* NOTE: disarm-on-mess-enter is driven by the MESS system, not here — this
     hook OWNS `api.current.disarmSetting`, and use-mess's messEnter cascade
     calls it on every proofOn→true (the setProof(on) split, main.js 1525-1554).
     Arriving already in the mess (?proof at load) is handled inside the effect
     above by reading the URL directly (source line 2929). */
}
