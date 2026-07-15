"use client";

import { useEffect } from "react";
import { willLoaderRun } from "@/app/_engine/loader-state";
import { useEngine } from "@/app/_engine/engine-context";

/**
 * THE MAKE-READY LOADER + THE & FINALE — a VERBATIM port of prototypes/main.js
 * (2241-2545, the `makeReady` IIFE + the whole & finale). Renders nothing; it
 * drives the server-rendered `#makeready` / `#mr-frame` by id and exposes the
 * cross-frame seam the loader iframe calls.
 *
 * THE FICTION: first arrival each session the press dials your sheet into
 * register. The approved lockup make-ready runs ISOLATED in a full-viewport,
 * same-origin iframe (`/loader-lockup-mock.html?embed`). Because it is same
 * origin its coords == the page's, so its script reads `parent.document`'s live
 * hero word rects and FLIPs the lockup words INTO them — the headline MOVES into
 * the page, it isn't replaced. At the relax it CEDES the giant "&" to our flight
 * reel (`parent.__ampFly`), floods booth→page (`parent.__ampFlood`), and posts
 * `"mr-lockup-done"`; we then release() — flood the booth away, `spec-armed →
 * spec-set` — and the reel seats the crisp italic "&" into the fading frame with
 * the impression seat.
 *
 * GATE: only when `willLoaderRun()` is true (first visit each session / ?loader
 * replay; never reduced / ?still). We call it FIRST so the answer is cached
 * (locked true) before we write `ma-press-check`, so THE SETTING reads the same
 * answer and skips its own hero-set entrance (the loader's flight IS the
 * entrance). false ⇒ do NOTHING: the booth ships hidden (`.out`) and the page is
 * already settled.
 *
 * DISCIPLINE (§5): the flight reel is native-size cells moved by transform only
 * (WAAPI, compositor — no rAF, no per-frame layout reads); the amp box is
 * measured ONCE at __ampFly / dropAmp, then pure math. Every listener / timer /
 * animation / window global is torn down on cleanup. Any input skips: during the
 * load → release(); during the flight → skipFinale() seats the native "&"
 * instantly (the fixed reel can't shear off the hero — hence "scroll" in
 * SKIP_EVS). A hard 9000ms failsafe releases no matter what.
 *
 * StrictMode: the double dev mount is mount → cleanup → mount, SYNCHRONOUS and
 * before the iframe (async) or any timer fires — so full cleanup (below) leaves
 * a pristine state and the second mount replays once, cleanly. `willLoaderRun`'s
 * own memo keeps the answer stable across both mounts.
 */

declare global {
  interface Window {
    __ampFly?: (
      src: { left: number; top: number; width: number; height: number },
      morphMs?: number,
      srcColor?: string,
    ) => boolean;
    __ampFlood?: () => void;
  }
}

export function useLoader(): void {
  const engine = useEngine();
  const api = engine.api;

  useEffect(() => {
    /* GATE — caches willLoaderRun (locks it true) before the sessionStorage
       write below. false ⇒ booth stays hidden, page settled: do nothing
       (beyond dropping a stale pre-paint hold, belt and braces — the head
       script mirrors this gate so the two should always agree). */
    if (!willLoaderRun()) {
      document.documentElement.classList.remove("mr-hold");
      return;
    }

    const mrEl = document.getElementById("makeready");
    if (!mrEl) return;
    const frame = document.getElementById("mr-frame") as HTMLIFrameElement | null;

    /* media (main.js reduced() = mqReduce.matches, stillMode = the ?still flag).
       willLoaderRun already gated these out; they're the finale's defensive
       checks only. */
    const stillMode = /[?&]still(\b|=)/.test(window.location.search);
    const reduced = (): boolean =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const heroTitleEl = document.getElementById("hero-title");
    const mrRan = true;

    /* return-visit gate: matches the original pressCheck write (main.js 2556) so
       later loads in this tab session skip the whole first-visit sequence */
    try {
      sessionStorage.setItem("ma-press-check", "1");
    } catch {}

    /* pre-hide the specimen plate under the booth: the flood reveals a settled
       sheet, then the shop finishes it — the pulls run at release (spec-armed →
       spec-set), never a flash of already-there glyphs (main.js 2263) */
    document.body.classList.add("spec-armed");

    /* reveal the #0C0B08 booth. The React page ships #makeready WITH .out
       (opacity 0) so a return-visit / un-managed booth never blacks the page;
       when the loader runs we drop .out to show it. Kill the 0.7s opacity
       transition for this reveal so the booth covers the hero INSTANTLY (the
       original had no .out at first paint) — release() restores it, so the
       booth still floods OUT over 0.7s. */
    const prevTransition = mrEl.style.transition;
    mrEl.style.transition = "none";
    mrEl.classList.remove("out");
    void mrEl.offsetWidth; // commit the instant opacity before restoring transition
    mrEl.style.transition = prevTransition;
    /* the engine owns the booth from here — lower the pre-paint hold (its
       guard animation must never race the real release) */
    document.documentElement.classList.remove("mr-hold");

    /* teardown registry */
    const timers: Array<ReturnType<typeof setTimeout>> = [];

    let released = false;

    /* ---------- THE & FINALE ----------
       primary: __ampFly (below) — the loader cedes the & at relax and ONE fixed
       reel flies + spins + seats it. fallback: dropAmp — the in-place reel, a
       child of #amp (tracks layout / survives scroll). both are native-size
       (crisp, cells never scaled up), transform-only (60fps, no rAF). every
       bail-out simply reveals the &. */
    let ampArmed = false,
      dropRan = false,
      seated = false,
      skipArmed = false;
    let ampAnim: Animation | null = null;
    let ampReel: HTMLDivElement | null = null;
    let failsafeT: ReturnType<typeof setTimeout> | undefined;
    let watchdogT: ReturnType<typeof setTimeout> | undefined;

    function ampImpact(): void {
      /* the seat IS the impression: the slug lands pressed into the paper —
         2px down + a hair of squash on the glyph itself — and settles. one
         motion, no light show. transform-only on the inline-block .ch: zero
         reflow, can't fight the ink pooling (which writes font-variation only). */
      const ch = document.querySelector<HTMLElement>("#amp .ch");
      if (ch && typeof ch.animate === "function") {
        ch.animate(
          [
            { transform: "translateY(2px) scale(1.045)" },
            { transform: "none" },
          ],
          { duration: 300, easing: "cubic-bezier(0.22,1,0.36,1)" },
        );
      }
      api.current.sndSlam?.();
    }

    function revealAmpStatic(): void {
      seated = true;
      disarmSkip();
      if (ampAnim) {
        try {
          ampAnim.cancel();
        } catch {}
        ampAnim = null;
      }
      if (ampReel && ampReel.parentNode) ampReel.parentNode.removeChild(ampReel);
      ampReel = null;
      document.body.classList.remove("amp-armed");
      clearTimeout(failsafeT);
      clearTimeout(watchdogT);
    }
    function failsafeAmpReveal(): void {
      if (!seated) revealAmpStatic();
    }
    function seatAmp(): void {
      if (seated) return;
      seated = true;
      disarmSkip();
      clearTimeout(watchdogT);
      clearTimeout(failsafeT);
      if (ampReel && ampReel.parentNode) ampReel.parentNode.removeChild(ampReel);
      ampReel = null;
      document.body.classList.remove("amp-armed"); // the native crisp & appears the same frame
      ampImpact();
    }
    function skipFinale(): void {
      if (!seated) revealAmpStatic();
    } // interrupted → quiet instant &
    /* "scroll" is here for the flight reel: it is position:fixed, so any scroll
       would shear it off the hero — any input just seats the & now, natively */
    const SKIP_EVS = ["keydown", "pointerdown", "wheel", "touchstart", "scroll"];
    function armSkip(): void {
      if (skipArmed) return;
      skipArmed = true;
      SKIP_EVS.forEach((ev) => {
        window.addEventListener(ev, skipFinale, { capture: true, passive: true });
      });
    }
    function disarmSkip(): void {
      if (!skipArmed) return;
      skipArmed = false;
      SKIP_EVS.forEach((ev) => {
        window.removeEventListener(ev, skipFinale, { capture: true });
      });
    }

    /* ---------- THE FLIGHT REEL (primary path) ----------
       called SYNCHRONOUSLY by the loader at the first frame of relaxToHero,
       before it hides its own .l-amp — so the swap is atomic: the reel's first
       visible frame is the same & at the same box (native-size cells scaled
       DOWN to the lockup box, never up — crisp mid-flight). the carriage flies
       the words' own 920ms ease above the frame; the strip is ONE timeline that
       starts rolling with the first movement, cruises through the flood + frame
       fade, then brakes into the & (weighted arrival, no theater). */
    const ampFly: NonNullable<Window["__ampFly"]> = function (src, morphMs, srcColor) {
      if (dropRan || seated || !mrRan || reduced() || stillMode) return false;
      if (typeof Element.prototype.animate !== "function") return false;
      if (!src || !(src.width > 0)) return false;
      const amp = document.getElementById("amp");
      const ch = amp && amp.querySelector<HTMLElement>(".ch");
      if (
        !amp ||
        !ch ||
        !heroTitleEl ||
        !heroTitleEl.classList.contains("landed")
      )
        return false;
      try {
        const chR = ch.getBoundingClientRect();
        if (!(chR.width > 0)) return false;
        const cs = getComputedStyle(ch);
        const A = parseFloat(cs.fontSize) || chR.height; // native amp size (~208 @1440)
        const P = Math.round(A * 1.32); // reel pitch
        const WIN = Math.round(P * 1.15); // slot window height

        /* the in-place bank + one more lap of sorts, ENDING on the start cell —
           an & — so the reel opens on the glyph it just replaced */
        let BANK = ["$", "&", "8", "%", "7", "¶", "@", "§", "3", "$", "ẞ", "9", "%", "8", "7", "§"];
        BANK = BANK.concat(BANK.slice(2));
        BANK.push("&");
        const S = BANK.length - 1; // start index (the trailing &)

        const reel = document.createElement("div");
        reel.className = "amp-reel amp-reel--flight spinning";
        reel.setAttribute("aria-hidden", "true");
        reel.style.left = chR.left + "px"; // fixed == viewport == the frame's coords
        reel.style.top = chR.top + chR.height / 2 - WIN / 2 + "px";
        reel.style.width = chR.width + "px";
        reel.style.height = WIN + "px";
        reel.style.fontFamily = cs.fontFamily; // the hero's own face (reel hangs off body)
        reel.style.fontStyle = cs.fontStyle; // italic — the roulette spins + lands on the SAME & as the hero
        if (srcColor) reel.style.color = srcColor; // the lockup's ink; flooded live by __ampFlood
        const strip = document.createElement("div");
        strip.className = "amp-reel-strip";
        strip.style.top = WIN / 2 - 1.5 * P + "px"; // idx1 (&) seats centred at translateY 0
        for (let i = 0; i < BANK.length; i++) {
          const cell = document.createElement("span");
          cell.className = "amp-cell";
          cell.style.height = P + "px";
          const rc = document.createElement("span");
          rc.className = "rc";
          rc.style.fontSize = A + "px";
          rc.style.letterSpacing = cs.letterSpacing;
          rc.textContent = BANK[i];
          cell.appendChild(rc);
          strip.appendChild(cell);
        }
        reel.appendChild(strip);
        document.body.appendChild(reel);
        ampReel = reel;
        dropRan = true; // the in-place path stands down
        document.body.classList.add("amp-armed"); // the hero slot is the reel's until the seat

        /* the carriage — flies in formation with the words (same clock, same
           ease); centre-to-centre + scale about centre, so the glyph maps exactly */
        const ncx = chR.left + chR.width / 2,
          ncy = chR.top + chR.height / 2;
        const scx = src.left + src.width / 2,
          scy = src.top + src.height / 2;
        const s0 = src.width / chR.width;
        const MORPH = morphMs || 920;
        reel.animate(
          [
            {
              transform:
                "translate(" +
                (scx - ncx).toFixed(1) +
                "px," +
                (scy - ncy).toFixed(1) +
                "px) scale(" +
                s0.toFixed(4) +
                ")",
            },
            { transform: "none" },
          ],
          { duration: MORPH, easing: "cubic-bezier(0.19,1,0.22,1)", fill: "forwards" },
        );

        /* the strip — one timeline across the whole hand-off: MORPH flight +
           30 flood + 470 release wait + ~380 INTO the frame fade. the fade is
           an extreme ease-out (0.7s, ~95% clear by its half), so the & seats
           as the last wisp of the loader dissolves. the ending is a WEIGHTED
           ARRIVAL, not theater: the reel just brakes into the & and stops. */
        const TOTAL = MORPH + 30 + 470 + 380;
        const o = (ms: number): number => ms / TOTAL;
        ampAnim = strip.animate(
          [
            { transform: "translateY(" + -(S - 1) * P + "px)", offset: 0, easing: "cubic-bezier(0.40,0,1,1)" },
            { transform: "translateY(" + -(S - 3.5) * P + "px)", offset: o(260), easing: "linear" },
            { transform: "translateY(" + -2 * P + "px)", offset: o(TOTAL - 280), easing: "cubic-bezier(0.18,0.84,0.26,1)" }, // the brake
            { transform: "translateY(0px)", offset: 1 }, // & seated
          ],
          { duration: TOTAL, fill: "forwards" },
        );
        ampAnim.onfinish = () => {
          seatAmp();
        };
        watchdogT = setTimeout(seatAmp, TOTAL + 500); // if onfinish is ever lost
        armSkip(); // any input seats it now (fixed reel can't scroll)
        return true;
      } catch {
        /* leave no half-state — the loader will fly the & itself (fallback) */
        if (ampReel && ampReel.parentNode) ampReel.parentNode.removeChild(ampReel);
        ampReel = null;
        ampAnim = null;
        dropRan = false;
        document.body.classList.remove("amp-armed");
        return false;
      }
    };
    window.__ampFly = ampFly;

    /* the loader floods booth→page at toPage(); the reel's ink floods with it
       (instant, like the old body.page .l-amp colour flip) */
    const ampFlood: NonNullable<Window["__ampFlood"]> = function () {
      if (!ampReel || seated) return;
      const ch = document.querySelector<HTMLElement>("#amp .ch");
      if (ch) ampReel.style.color = getComputedStyle(ch).color;
    };
    window.__ampFlood = ampFlood;

    function dropAmp(): void {
      if (dropRan) return;
      dropRan = true;
      const amp = document.getElementById("amp");
      const ch = amp && amp.querySelector<HTMLElement>(".ch");
      /* any degenerate state → just reveal the & (never leave the slot empty) */
      if (
        !mrRan ||
        reduced() ||
        stillMode ||
        !amp ||
        !ch ||
        !heroTitleEl ||
        !heroTitleEl.classList.contains("landed") ||
        typeof Element.prototype.animate !== "function"
      ) {
        return revealAmpStatic();
      }
      /* measure ONCE — the only layout reads, never in a loop */
      const ampR = amp.getBoundingClientRect();
      const chR = ch.getBoundingClientRect();
      const cs = getComputedStyle(ch);
      const A = parseFloat(cs.fontSize) || chR.height; // native amp size (~208 @1440)
      const P = Math.round(A * 1.32); // reel pitch
      const WIN = Math.round(P * 1.15); // slot window height
      const cyc = chR.top - ampR.top + chR.height / 2; // glyph vertical centre in #amp

      /* now (not during the whole load) hide the landed & — the reel takes over
         its slot for the spin, then hands back to the native glyph on seat */
      document.body.classList.add("amp-armed");

      /* idx0 '$' = the near-miss decoy; idx1 '&' = the target; idx15 '&' = the
         START cell — even this fallback reads as the & itself starting to roll */
      const BANK = ["$", "&", "8", "%", "7", "¶", "@", "§", "3", "$", "ẞ", "9", "%", "8", "7", "&"];
      const N = BANK.length;

      const reel = document.createElement("div");
      reel.className = "amp-reel spinning";
      reel.setAttribute("aria-hidden", "true");
      reel.style.left = chR.left - ampR.left + "px";
      reel.style.top = cyc - WIN / 2 + "px";
      reel.style.width = chR.width + "px";
      reel.style.height = WIN + "px";
      const strip = document.createElement("div");
      strip.className = "amp-reel-strip";
      strip.style.top = WIN / 2 - 1.5 * P + "px"; // so idx1 (&) sits centred at translateY 0
      for (let i = 0; i < N; i++) {
        const cell = document.createElement("span");
        cell.className = "amp-cell";
        cell.style.height = P + "px";
        const rc = document.createElement("span");
        rc.className = "rc";
        rc.style.fontSize = A + "px";
        rc.style.letterSpacing = cs.letterSpacing;
        rc.textContent = BANK[i];
        cell.appendChild(rc);
        strip.appendChild(cell);
      }
      reel.appendChild(strip);
      amp.appendChild(reel);
      ampReel = reel;

      /* the strip SPIN — one WAAPI transform, compositor-only. the FALLBACK path
         (cede didn't happen): the & flew in as a word and sits right here — the
         reel opens on it, rolls down fast, then BRAKES back into the & and stops
         (same weighted arrival as the flight reel; no theater). */
      ampAnim = strip.animate(
        [
          { transform: "translateY(" + -14 * P + "px)", offset: 0, easing: "cubic-bezier(0.40,0,1,1)" },
          { transform: "translateY(" + -12.6 * P + "px)", offset: 0.09, easing: "linear" },
          { transform: "translateY(" + -2 * P + "px)", offset: 0.72, easing: "cubic-bezier(0.18,0.84,0.26,1)" }, // the brake
          { transform: "translateY(0px)", offset: 1 }, // & seated
        ],
        { duration: 1000, fill: "forwards" },
      );
      ampAnim.onfinish = () => {
        seatAmp();
      };
      watchdogT = setTimeout(seatAmp, 1400); // if onfinish is ever lost
      armSkip(); // any input during the reel lands it now
    }
    function scheduleAmpFinale(): void {
      /* fallback trigger only — when the flight reel ran, dropRan is already
         true and dropAmp stands down (the strip timeline owns the seat) */
      if (ampArmed) return;
      ampArmed = true;
      const t = setTimeout(dropAmp, 100); // a short breath, then the in-place reel
      timers.push(t);
    }

    function release(): void {
      if (released || !mrEl) return;
      released = true;
      mrEl.classList.add("out");
      /* the flood is under way — the shop pulls the specimen onto the finished
         sheet (THE SETTING's first-visit path) */
      document.body.classList.remove("spec-armed");
      document.body.classList.add("spec-set");
      failsafeT = setTimeout(failsafeAmpReveal, 3500); // the slot is never left empty
      const t = setTimeout(() => {
        /* the booth has faded out (.out, 0.7s) — stop the loader frame and drop
           the last slug. We do NOT node-remove #makeready (React owns it); .out
           hides it and blanking the frame unloads the nested loader doc. */
        if (frame) {
          try {
            frame.src = "about:blank";
          } catch {}
        }
        scheduleAmpFinale(); // frame gone, page settled → drop the last slug
      }, 760);
      timers.push(t);
    }
    function onMsg(e: MessageEvent): void {
      if (e && e.data === "mr-lockup-done") {
        window.removeEventListener("message", onMsg);
        /* the words have already flown onto the hero and the booth is flooding
           to the page's colours; let that finish so the reveal is a takeover */
        const t = setTimeout(release, 470);
        timers.push(t);
      }
    }
    window.addEventListener("message", onMsg);

    /* any input skips straight to the live page */
    const RELEASE_EVS = ["keydown", "pointerdown", "wheel", "touchstart"];
    RELEASE_EVS.forEach((ev) => {
      window.addEventListener(ev, release, { capture: true, passive: true, once: true });
    });

    /* failsafe: never trap the page if the frame stalls */
    const failsafe9 = setTimeout(release, 9000);
    timers.push(failsafe9);

    /* load it now (src set LAST, after __ampFly is exposed) — only first visits
       reach here */
    if (frame) frame.src = "/loader-lockup-mock.html?embed";

    /* ---------- teardown (StrictMode transient + genuine unmount) ---------- */
    return () => {
      disarmSkip();
      clearTimeout(failsafeT);
      clearTimeout(watchdogT);
      timers.forEach((t) => clearTimeout(t));
      window.removeEventListener("message", onMsg);
      RELEASE_EVS.forEach((ev) =>
        window.removeEventListener(ev, release, { capture: true } as EventListenerOptions),
      );
      if (ampAnim) {
        try {
          ampAnim.cancel();
        } catch {}
        ampAnim = null;
      }
      if (ampReel && ampReel.parentNode) ampReel.parentNode.removeChild(ampReel);
      ampReel = null;
      if (window.__ampFly === ampFly) delete window.__ampFly;
      if (window.__ampFlood === ampFlood) delete window.__ampFlood;
      document.body.classList.remove("spec-armed", "amp-armed");
      mrEl.classList.add("out"); // restore the shipped hidden state
      if (frame) {
        try {
          frame.src = "about:blank";
        } catch {}
      }
    };
  }, [api]);
}
