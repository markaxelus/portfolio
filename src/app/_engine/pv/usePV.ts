"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useEngine } from "../engine-context";
import { ACCENTS, PROJECTS, detailURI } from "@/lib/plates";
import { CASES } from "@/lib/cases";

/**
 * THE PROJECT VIEWER — every project is its own proof sheet (main.js
 * §"the project viewer", ported). A clean tap on a hanging sheet calls
 * `api.openProject(i)` (the line owns the tap; it preventDefaults only
 * because this owner exists); the engine composes the sheet INTO the empty
 * #pv shell — awwwards case-study anatomy in the shop's language: kicker,
 * title, lede off the row itself (the row stays the single source of the
 * public identity), the meta rail (with DELIVERED: only what is verifiably
 * off press), the plate hero, THE BRIEF / THE RUN / THE STET, the specimen
 * duo, outcome figures, a quote off the shop's own paper, and the giant
 * NEXT PROOF handoff (the next sheet's own plate rides its hover). CASE
 * copy lives in src/lib/cases.ts — the four real jobs, not the
 * prototype's fiction.
 *
 * Laws honored here:
 *  · the arrival law, scroll-armed: the fold stamps in press order at
 *    open (.pv-st); everything below stamps when the scroll brings it
 *    into view (.pv-sc, own IO on the sheet — the first batch keeps the
 *    press cascade, later batches take a short local stagger, exactly
 *    the main page's per-viewport rule). A stamp ENDS on its rest values
 *    and hands itself back on animationend (.pv-set), so no fill ever
 *    pins matter bright: the ghost numeral settles AT its rest ink
 *    instead of stamping to full and snapping down.
 *  · deep links: /#p-01..04 opens the sheet directly; back button closes;
 *    the row hrefs stay graceful no-js fallbacks (they're real anchors).
 *  · the accent re-inks the open sheet (plate + duo) the moment the chips
 *    switch — same as the prototype's accent pass.
 *  · the mess annotates the sheet: if the margins are already awake the
 *    sheet's notes draw in on scroll (own observer — use-mess only scans
 *    at arm time); a later M/P toggle finds them via use-mess's own scan.
 *  · ESC closes the sheet before it closes the mess (EngineProvider's
 *    global keydown routes through api.closeProject first).
 *  · Nº 0(i+2): sheet 001 is the press check on the docket — the run's
 *    proofs are sheets 002–005.
 */
export function usePV(rootRef: RefObject<HTMLElement | null>): void {
  const engine = useEngine();
  const { api, plates, accentI, proofOn, setProof } = engine;

  const idxRef = useRef(-1);
  const proofRef = useRef(proofOn);
  const platesRef = useRef(plates);
  const accentRef = useRef(accentI);
  const notesObsRef = useRef<IntersectionObserver | null>(null);
  const scObsRef = useRef<IntersectionObserver | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  proofRef.current = proofOn;
  platesRef.current = plates;
  accentRef.current = accentI;

  /* ---- the owner: build, open, close (mount-stable) ---- */
  useEffect(() => {
    const pvEl = rootRef.current;
    if (!pvEl) return;
    const apiC = api.current;
    /* the still law is read off the ground truth (use-setting's rule) —
       the ctx flag can lag this effect on first paint */
    const stillNow = /[?&]still(\b|=)/.test(window.location.search);

    const rowFor = (i: number): HTMLElement | null =>
      document.getElementById("p-0" + (i + 1));

    function buildPV(i: number): string {
      const p = PROJECTS[i];
      const c = CASES[i];
      const row = rowFor(i);
      const title = row?.querySelector(".row-title")?.textContent ?? "";
      const kind = row?.querySelector(".row-meta")?.childNodes[0]?.textContent ?? "";
      const ref = row?.querySelector(".row-ref")?.textContent ?? "";
      const desc = row?.querySelector(".row-desc")?.textContent ?? "";
      const next = (i + 1) % PROJECTS.length;
      const nextTitle = rowFor(next)?.querySelector(".row-title")?.textContent ?? "";
      /* the proofreader's insertion rides INSIDE the stet (the pmark
         gesture from the outro headline: caret under, pen above) */
      const stet = c.stet.replace(
        c.ins.find,
        '<span class="pmark">' + c.ins.find +
          '<svg class="note scrawl pm-caret" style="--d:.5s" viewBox="0 0 16 10" aria-hidden="true"><path class="draw" pathLength="1" d="M1,9 L8,1 L15,9" fill="none"/></svg>' +
          '<em class="note pm-ins ' + c.ins.pen + '" style="--d:.62s" aria-hidden="true">' + c.ins.text + "</em></span>",
      );
      /* the fold assembles in press order at open (.pv-st, --pvd
         cascade); everything below the fold is scroll-armed instead
         (.pv-sc — its IO stamps it when the scroll brings it up, and
         the IO owns the delay: open-visible blocks continue the fold's
         cascade, scrolled-to blocks stamp near-immediately); ?still
         ships every block seated (no pv-arm), reduced motion is
         disarmed in CSS */
      const st = (d: string): string => ' pv-st" style="--pvd:' + d + '"';
      const sc = (): string => ' pv-sc"';
      return (
        '<div class="pv-sheet' + (stillNow ? "" : " pv-arm") + '">' +
          /* the trim: two opposing brackets (the pressmark's own grammar —
             never four corners, a full box reads as a container) + the
             registration cross top-center */
          '<span class="pv-crop c-tl" aria-hidden="true"></span>' +
          '<span class="pv-crop c-br" aria-hidden="true"></span>' +
          '<svg class="pv-reg" viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="4.2"/><path d="M9 1v16M1 9h16"/></svg>' +
          '<span class="pv-num' + st(".02s") + ' aria-hidden="true">' + p.num + "</span>" +
          '<button class="pv-close mono" id="pv-close" type="button">CLOSE &#10005; <em>ESC</em></button>' +
          '<button class="pv-messbtn mono" id="pv-mess" type="button"></button>' +
          '<header class="pv-head">' +
            '<p class="pv-kicker mono' + st(".06s") + ">PROOF SHEET N&ordm; 0" + (i + 2) + " &middot; " + ref + " &middot; " + kind + "</p>" +
            /* the ink bar — the control strip a real proof carries */
            '<div class="pv-bar mono' + st(".12s") + ' aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><span>PASS ORDER &middot; INK / ACCENT / RED</span></div>' +
            '<h2 class="pv-title' + st(".16s") + ">" + title + "</h2>" +
            '<p class="pv-lede' + st(".24s") + ">" + desc + "</p>" +
          "</header>" +
          '<div class="pv-grid">' +
            '<aside class="pv-meta mono' + st(".32s") + ">" +
              '<p class="pv-dhead">DOCKET:</p>' +
              "<div><span>CLIENT</span>" + c.client + "</div>" +
              "<div><span>ROLE</span>" + c.role + "</div>" +
              "<div><span>STACK</span>" + c.stack + "</div>" +
              "<div><span>WHEN</span>" + c.when + "</div>" +
              "<div><span>MADE</span><ul>" + c.made.map((m) => "<li>" + m + "</li>").join("") + "</ul></div>" +
              /* only what is verifiably off press gets a row; a claim
                 without an address prints as set type, never a dead link */
              (c.delivered.length
                ? '<div><span>DELIVERED</span><ul class="pv-links">' +
                  c.delivered.map((d) =>
                    d.href
                      ? '<li><a href="' + d.href + '" target="_blank" rel="noopener">' + d.t + " &nearr;</a></li>"
                      : "<li><em>" + d.t + "</em></li>",
                  ).join("") +
                  "</ul></div>"
                : "") +
            "</aside>" +
            '<div class="pv-body">' +
              '<figure class="pv-plate' + st(".4s") + ">" +
                /* side B: the pen reads the plate from under its foot */
                '<span class="note ' + c.plateNote.pen + ' pv-pnote" style="--d:.3s">' + c.plateNote.text + "</span>" +
                '<svg class="note scrawl pv-parr" style="--d:.42s" viewBox="0 0 40 26" aria-hidden="true"><path class="draw" pathLength="1" d="M6,24 C14,20 24,12 31,5 M25,6 L32,3 L30,11" fill="none"/></svg>' +
              "</figure>" +
              '<p class="pv-cap mono' + st(".46s") + ">PLATE " + p.num + " &middot; THREE INKS &middot; " + p.motif.toUpperCase() + " MOTIF &middot; 800&times;1000</p>" +
              '<h3 class="mono' + sc() + '>THE BRIEF:</h3><p class="' + sc().slice(1) + ">" + c.brief + "</p>" +
              /* THE RUN — the process, station by station, docket voice */
              '<div class="pv-run' + sc() + ">" +
                '<p class="pv-run-head mono">THE RUN:</p>' +
                c.run.map((r, k) =>
                  '<p class="pv-run-row mono"><span class="pv-run-n">0' + (k + 1) + '</span><span class="pv-run-st">' + r[0] + '</span><span class="pv-run-line">' + r[1] + "</span></p>",
                ).join("") +
              "</div>" +
              /* THE STET — the one call that stood; the heading teaches
                 the word in the instrument voice (the hero struck the
                 nerve tagline; the proofreader's verdict replaces it) */
              '<h3 class="mono' + sc() + '>THE STET: <span class="pv-gloss">LET IT STAND</span></h3>' +
              '<p class="pv-stet ' + sc().slice(1) + ">" + stet + "</p>" +
              '<div class="pv-duo' + sc() + "><figure></figure><figure></figure></div>" +
              '<ul class="pv-stats' + sc() + ">" +
                c.outcome.map((o, k) =>
                  "<li><b>" + o[0] + '</b><span class="mono">' + o[1] + "</span>" +
                    (k === c.statRing.i
                      ? /* side B: the red hand rings ITS figure, note under */
                        '<svg class="note scrawl pv-ring" style="--d:.2s" viewBox="0 0 84 58" aria-hidden="true"><path class="draw" pathLength="1" d="M42,6 C66,4 80,14 78,28 C76,44 58,53 38,52 C18,51 5,42 7,27 C9,12 24,7 46,7" fill="none"/></svg>' +
                        '<span class="note ' + c.statRing.note.pen + ' pv-snote" style="--d:.34s">' + c.statRing.note.text + "</span>"
                      : "") +
                  "</li>",
                ).join("") +
              "</ul>" +
              '<blockquote class="pv-quote' + sc() + ">" + c.quote + '<footer class="mono">' + c.attr + "</footer>" +
                /* side B: the two hands argue at the quote's shoulder */
                '<div class="note argue pv-argue" style="--d:.3s">' +
                  c.argue.map((a) => '<span class="' + a.pen + '">' + a.text + "</span>").join("") +
                "</div>" +
              "</blockquote>" +
            "</div>" +
          "</div>" +
          /* NEXT PROOF — the handoff is a press pass: the ink rolls
             across on hover, the arrow advances, and the NEXT sheet's
             own plate rides up like the next job on the wire */
          '<a class="pv-next' + sc() + ' id="pv-next" href="#p-0' + (next + 1) + '" data-next="' + next + '">' +
            '<span class="pv-next-ink" aria-hidden="true"></span>' +
            '<span class="pv-next-plate" aria-hidden="true"></span>' +
            '<span class="mono">NEXT PROOF &middot; 0' + (next + 1) + "</span>" +
            "<b>" + nextTitle + '<i class="pv-next-arr" aria-hidden="true">&rarr;</i></b></a>' +
          '<span class="pv-jobline mono' + sc() + ' aria-hidden="true">SHEET N&ordm; 0' + (i + 2) + " &middot; " + title.toUpperCase() + " &middot; MARK AXELUS &middot; WORKING PROOF</span>" +
        "</div>"
      );
    }

    function inkArt(i: number): void {
      if (!pvEl) return;
      const accent = ACCENTS[accentRef.current].night;
      const plate = pvEl.querySelector<HTMLElement>(".pv-plate");
      if (plate) plate.style.backgroundImage = platesRef.current[i];
      const duo = pvEl.querySelectorAll<HTMLElement>(".pv-duo figure");
      if (duo.length === 2) {
        duo[0].style.backgroundImage = detailURI(PROJECTS[i], 0, accent);
        duo[1].style.backgroundImage = detailURI(PROJECTS[i], 1, accent);
      }
      /* the handoff carries the NEXT sheet's plate (revealed on hover) */
      const np = pvEl.querySelector<HTMLElement>(".pv-next-plate");
      if (np) np.style.backgroundImage = platesRef.current[(i + 1) % PROJECTS.length];
    }

    /* the arrival law, below the fold: each .pv-sc stamps when the
       scroll brings it onto the sheet. ONE RUN, NEVER TWO: the IO's
       first delivery (whatever the open frame already shows) is timed
       to CONTINUE the fold cascade (the fold's last stamp seats ~0.88s;
       these pick up right behind it), so a tall screen reads a single
       press run instead of settle → pause → settle again. Later batches
       take a short local stagger — a scrolled-to block never waits. */
    function watchScrollBlocks(): void {
      if (stillNow || !pvEl) return;
      const blocks = Array.prototype.slice.call(pvEl.querySelectorAll(".pv-sc")) as HTMLElement[];
      if (!blocks.length) return;
      let firstBatch = true;
      const obs = new IntersectionObserver(
        (entries) => {
          const atOpen = firstBatch;
          firstBatch = false;
          let k = 0;
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            const el = en.target as HTMLElement;
            el.style.setProperty(
              "--pvd",
              ((atOpen ? 0.48 + k * 0.08 : k * 0.09)).toFixed(2) + "s",
            );
            k++;
            el.classList.add("pv-in");
            obs.unobserve(el);
          });
        },
        { root: pvEl, rootMargin: "0px 0px -8% 0px" },
      );
      blocks.forEach((el) => obs.observe(el));
      scObsRef.current = obs;
    }

    function watchSheetNotes(): void {
      /* the mess only scans at arm time — a sheet opened into an already-
         awake mess observes its own margins (same seen law, same margin) */
      if (!proofRef.current || !pvEl) return;
      const notes = Array.prototype.slice.call(pvEl.querySelectorAll(".note")) as Element[];
      if (stillNow) {
        notes.forEach((el) => el.classList.add("seen"));
        return;
      }
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("seen");
              obs.unobserve(en.target);
            }
          });
        },
        { root: pvEl, rootMargin: "0px 0px -8% 0px" },
      );
      notes.forEach((el) => obs.observe(el));
      notesObsRef.current = obs;
    }

    function openProject(i: number): void {
      if (!pvEl || !(i >= 0 && i < PROJECTS.length)) return;
      notesObsRef.current?.disconnect();
      scObsRef.current?.disconnect();
      if (idxRef.current < 0) {
        returnFocusRef.current = (document.activeElement as HTMLElement) ?? null;
      }
      idxRef.current = i;
      pvEl.innerHTML = buildPV(i);
      /* every stamp ends ON its rest values, so there is nothing to
         release on a timer any more — each block hands itself back the
         moment it seats (.pv-set kills the fill; transitions take over,
         so the proof dims and the ghost numeral fade like set type) */
      pvEl.querySelector(".pv-sheet")?.addEventListener("animationend", (e) => {
        if ((e as AnimationEvent).animationName === "pv-stamp") {
          (e.target as HTMLElement).classList.add("pv-set");
        }
      });
      inkArt(i);
      document.body.classList.add("pv-open");
      document.documentElement.classList.add("pv-open");
      pvEl.scrollTop = 0;
      const target = "#p-0" + (i + 1);
      if (location.hash !== target) history.pushState(null, "", target);
      const closeBtn = pvEl.querySelector<HTMLButtonElement>("#pv-close");
      closeBtn?.addEventListener("click", closeProject);
      closeBtn?.focus({ preventScroll: true });
      const pvm = pvEl.querySelector<HTMLButtonElement>("#pv-mess");
      if (pvm) {
        pvm.textContent = proofRef.current ? "OK, ENOUGH" : "SEE THE MESS";
        pvm.addEventListener("click", () => setProof(!proofRef.current));
      }
      pvEl.querySelector<HTMLAnchorElement>("#pv-next")?.addEventListener("click", function (this: HTMLAnchorElement, e) {
        e.preventDefault();
        openProject(+(this.dataset.next ?? 0));
      });
      watchScrollBlocks();
      watchSheetNotes();
    }

    function closeProject(): void {
      if (idxRef.current < 0 || !pvEl) return;
      idxRef.current = -1;
      notesObsRef.current?.disconnect();
      notesObsRef.current = null;
      scObsRef.current?.disconnect();
      scObsRef.current = null;
      document.body.classList.remove("pv-open");
      document.documentElement.classList.remove("pv-open");
      if (location.hash) history.pushState(null, "", location.pathname + location.search);
      pvEl.innerHTML = "";
      const back = returnFocusRef.current;
      returnFocusRef.current = null;
      if (back && back.isConnected) back.focus({ preventScroll: true });
    }

    apiC.openProject = openProject;
    apiC.closeProject = closeProject;

    /* deep links: /#p-03 opens the sheet directly; the back button works */
    const onHash = (): void => {
      if (/^#p-0[1-4]$/.test(location.hash)) {
        openProject(+location.hash.slice(3) - 1);
      } else if (idxRef.current >= 0) {
        closeProject();
      }
    };
    if (/^#p-0[1-4]$/.test(location.hash)) {
      openProject(+location.hash.slice(3) - 1);
    }
    window.addEventListener("hashchange", onHash);

    return () => {
      window.removeEventListener("hashchange", onHash);
      notesObsRef.current?.disconnect();
      notesObsRef.current = null;
      scObsRef.current?.disconnect();
      scObsRef.current = null;
      if (idxRef.current >= 0) {
        idxRef.current = -1;
        document.body.classList.remove("pv-open");
        document.documentElement.classList.remove("pv-open");
        pvEl.innerHTML = "";
      }
      if (apiC.openProject === openProject) apiC.openProject = undefined;
      if (apiC.closeProject === closeProject) apiC.closeProject = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- the accent re-inks the open sheet (the chips' pass) ---- */
  useEffect(() => {
    const pvEl = rootRef.current;
    const i = idxRef.current;
    if (!pvEl || i < 0) return;
    const plate = pvEl.querySelector<HTMLElement>(".pv-plate");
    if (plate) plate.style.backgroundImage = plates[i];
    const duo = pvEl.querySelectorAll<HTMLElement>(".pv-duo figure");
    if (duo.length === 2) {
      duo[0].style.backgroundImage = detailURI(PROJECTS[i], 0, ACCENTS[accentI].night);
      duo[1].style.backgroundImage = detailURI(PROJECTS[i], 1, ACCENTS[accentI].night);
    }
    const np = pvEl.querySelector<HTMLElement>(".pv-next-plate");
    if (np) np.style.backgroundImage = plates[(i + 1) % PROJECTS.length];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accentI, plates]);

  /* ---- the mess button reads the room (toggled from anywhere) ---- */
  useEffect(() => {
    const pvm = rootRef.current?.querySelector<HTMLButtonElement>("#pv-mess");
    if (pvm) {
      pvm.textContent = proofOn ? "OK, ENOUGH" : "SEE THE MESS";
      pvm.setAttribute("aria-pressed", String(proofOn));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proofOn]);
}
