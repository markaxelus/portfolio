"use client";

import { useEffect } from "react";
import { willLoaderRun } from "@/app/_engine/loader-state";

/**
 * THE MAKE-READY LOADER — a port of prototypes/main.js (2241-2545, the
 * `makeReady` IIFE). Renders nothing; it drives the server-rendered
 * `#makeready` / `#mr-frame` by id.
 *
 * THE FICTION: first arrival each session the press dials your sheet into
 * register. The approved lockup make-ready runs ISOLATED in a full-viewport,
 * same-origin iframe (`/loader-lockup-mock.html?embed`). Because it is same
 * origin its coords == the page's, so its script reads `parent.document`'s live
 * hero word rects and FLIPs the lockup words INTO them — the headline MOVES into
 * the page, it isn't replaced. It floods booth→page and posts
 * `"mr-lockup-done"`; we then release() — flood the booth away, `spec-armed →
 * spec-set` — and the settled sheet is the page.
 *
 * THE LAST SLUG (struck, September 2026): the loader used to CEDE the giant "&"
 * to a flight reel here (`parent.__ampFly` / `__ampFlood`) that spun a bank of
 * sorts mid-flight and braked into the crisp italic. It's gone. Both globals are
 * simply absent now, which the loader already reads as "the parent refused" —
 * its own fallback flies the & as a word alongside MARK and DESK, and the hero's
 * native glyph is never hidden.
 *
 * GATE: only when `willLoaderRun()` is true (first visit each session / ?loader
 * replay; never reduced / ?still). We call it FIRST so the answer is cached
 * (locked true) before we write `ma-press-check`, so THE SETTING reads the same
 * answer and skips its own hero-set entrance (the loader's flight IS the
 * entrance). false ⇒ do NOTHING: the booth ships hidden (`.out`) and the page is
 * already settled.
 *
 * DISCIPLINE (§5): every listener and timer is torn down on cleanup. Any input
 * skips straight to the live page via release(). A hard 9000ms failsafe releases
 * no matter what.
 *
 * StrictMode: the double dev mount is mount → cleanup → mount, SYNCHRONOUS and
 * before the iframe (async) or any timer fires — so full cleanup (below) leaves
 * a pristine state and the second mount replays once, cleanly. `willLoaderRun`'s
 * own memo keeps the answer stable across both mounts.
 */

export function useLoader(): void {
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

    function release(): void {
      if (released || !mrEl) return;
      released = true;
      mrEl.classList.add("out");
      /* the flood is under way — the shop pulls the specimen onto the finished
         sheet (THE SETTING's first-visit path) */
      document.body.classList.remove("spec-armed");
      document.body.classList.add("spec-set");
      const t = setTimeout(() => {
        /* the booth has faded out (.out, 0.7s) — stop the loader frame. We do
           NOT node-remove #makeready (React owns it); .out hides it and blanking
           the frame unloads the nested loader doc. */
        if (frame) {
          try {
            frame.src = "about:blank";
          } catch {}
        }
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

    /* load it now — only first visits reach here */
    if (frame) frame.src = "/loader-lockup-mock.html?embed";

    /* ---------- teardown (StrictMode transient + genuine unmount) ---------- */
    return () => {
      timers.forEach((t) => clearTimeout(t));
      window.removeEventListener("message", onMsg);
      RELEASE_EVS.forEach((ev) =>
        window.removeEventListener(ev, release, { capture: true } as EventListenerOptions),
      );
      document.body.classList.remove("spec-armed");
      mrEl.classList.add("out"); // restore the shipped hidden state
      if (frame) {
        try {
          frame.src = "about:blank";
        } catch {}
      }
    };
  }, []);
}
