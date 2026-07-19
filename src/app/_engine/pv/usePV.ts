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
 * public identity), the meta rail, the plate hero, THE BRIEF / THE NERVE,
 * the specimen duo, outcome figures, a quote off the shop's own paper, and
 * the giant NEXT PROOF handoff. CASE copy lives in src/lib/cases.ts — the
 * four real jobs, not the prototype's fiction.
 *
 * Laws honored here:
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
  const { api, plates, accentI, proofOn, setProof, stillMode } = engine;

  const idxRef = useRef(-1);
  const proofRef = useRef(proofOn);
  const platesRef = useRef(plates);
  const accentRef = useRef(accentI);
  const notesObsRef = useRef<IntersectionObserver | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  proofRef.current = proofOn;
  platesRef.current = plates;
  accentRef.current = accentI;

  /* ---- the owner: build, open, close (mount-stable) ---- */
  useEffect(() => {
    const pvEl = rootRef.current;
    if (!pvEl) return;
    const apiC = api.current;

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
      return (
        '<div class="pv-sheet">' +
          '<span class="pv-num" aria-hidden="true">' + p.num + "</span>" +
          '<button class="pv-close mono" id="pv-close" type="button">CLOSE &#10005; <em>ESC</em></button>' +
          '<button class="pv-messbtn mono" id="pv-mess" type="button"></button>' +
          '<header class="pv-head">' +
            '<p class="pv-kicker mono">PROOF SHEET N&ordm; 0' + (i + 2) + " &middot; " + ref + " &middot; " + kind + "</p>" +
            '<h2 class="pv-title">' + title + "</h2>" +
            '<p class="pv-lede">' + desc + "</p>" +
          "</header>" +
          '<div class="pv-grid">' +
            '<aside class="pv-meta mono">' +
              "<div><span>CLIENT</span>" + c.client + "</div>" +
              "<div><span>ROLE</span>" + c.role + "</div>" +
              "<div><span>STACK</span>" + c.stack + "</div>" +
              "<div><span>WHEN</span>" + c.when + "</div>" +
              "<div><span>MADE</span><ul>" + c.made.map((m) => "<li>" + m + "</li>").join("") + "</ul></div>" +
            "</aside>" +
            '<div class="pv-body">' +
              '<figure class="pv-plate"></figure>' +
              '<h3 class="mono">THE BRIEF</h3><p>' + c.brief + "</p>" +
              '<h3 class="mono">THE NERVE</h3><p>' + c.nerve + "</p>" +
              '<div class="pv-duo"><figure></figure><figure></figure></div>' +
              '<ul class="pv-stats">' +
                c.outcome.map((o) => "<li><b>" + o[0] + '</b><span class="mono">' + o[1] + "</span></li>").join("") +
              "</ul>" +
              '<blockquote class="pv-quote">' + c.quote + '<footer class="mono">' + c.attr + "</footer></blockquote>" +
            "</div>" +
          "</div>" +
          '<a class="pv-next" id="pv-next" href="#p-0' + (next + 1) + '" data-next="' + next + '">' +
            '<span class="mono">NEXT PROOF &middot; 0' + (next + 1) + "</span><b>" + nextTitle + " &rarr;</b></a>" +
          '<span class="pv-jobline mono" aria-hidden="true">SHEET N&ordm; 0' + (i + 2) + " &middot; " + title.toUpperCase() + " &middot; MARK AXELUS &middot; WORKING PROOF</span>" +
          '<div class="proof-notes pv-notes" aria-hidden="true">' +
            c.notes.map((n, k) =>
              '<span class="note ' + n.pen + " " + n.pos + '" style="--d:.' + (2 + k * 3) + 's">' + n.text + "</span>",
            ).join("") +
          "</div>" +
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
    }

    function watchSheetNotes(): void {
      /* the mess only scans at arm time — a sheet opened into an already-
         awake mess observes its own margins (same seen law, same margin) */
      if (!proofRef.current || !pvEl) return;
      const notes = Array.prototype.slice.call(pvEl.querySelectorAll(".note")) as Element[];
      if (stillMode) {
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
      if (idxRef.current < 0) {
        returnFocusRef.current = (document.activeElement as HTMLElement) ?? null;
      }
      idxRef.current = i;
      pvEl.innerHTML = buildPV(i);
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
      watchSheetNotes();
    }

    function closeProject(): void {
      if (idxRef.current < 0 || !pvEl) return;
      idxRef.current = -1;
      notesObsRef.current?.disconnect();
      notesObsRef.current = null;
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
