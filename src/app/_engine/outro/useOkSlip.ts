"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useEngine } from "@/app/_engine/engine-context";
import { deskDateStr, deskTime } from "@/lib/desk";

/**
 * THE OK SLIP — the visitor signs the press check (main.js 3063–3164).
 *
 * You've read the sheet — you're the client at the press check now. Initials
 * are machine-set (#ok-initials, typed, never handwritten: the hand belongs to
 * the mess). Three .ok-tab stamp buttons commit on a ~620ms HOLD (the accent
 * ink visibly rising via the CSS .holding state) — plain Enter/Space commit for
 * keyboard people; Enter in the initials field passes the sheet. The stamp
 * thunks down at −4° in the accent, the jobline (#job-ok, in the fixed
 * furniture — reached via document) permanently carries the verdict, and the
 * mess argues back per verdict (#ok-reply1..3). Persisted `ma-ok-v1`.
 *
 * VERBATIM port of the commit/render logic. Two cross-subsystem calls: the
 * stamp knocks via `api.current.sndTok` (owned by the noise system) and the act
 * is witnessed via `api.current.logAct` (owned by useJobLog).
 *
 * KEY-GUARD NOTE: the M/N/S mode keys need no per-field guard here — the engine's
 * global keydown already returns early when the event target is an INPUT
 * (EngineProvider), so typing initials never toggles a mode.
 */

interface OkMeta {
  face: string;
  job: string;
  r1: string;
  r2: string;
}
interface OkState {
  v: string;
  ini: string;
  time: string;
  n: number;
}

const OK_STORE = "ma-ok-v1";
const OK_META: Record<string, OkMeta> = {
  ok: {
    face: "OK TO PRINT",
    job: "PASSED FOR PRESS",
    r1: "someone passed it. it is not done.",
    r2: "who let them in.",
  },
  corr: {
    face: "OK W/ CORRECTIONS",
    job: "OK WITH CORRECTIONS",
    r1: "corrections. plural. i know about the kerning.",
    r2: "",
  },
  re: {
    face: "REPROOF",
    job: "MARKED FOR REPROOF",
    r1: "",
    r2: "yeah. i know.",
  },
};

export function useOkSlip(rootRef: RefObject<HTMLElement | null>): void {
  const engine = useEngine();
  const api = engine.api; // stable ref (sndTok / logAct handles)

  const reducedRef = useRef(engine.reduced);
  reducedRef.current = engine.reduced;
  const stillRef = useRef(engine.stillMode);
  stillRef.current = engine.stillMode;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const okInput = root.querySelector<HTMLInputElement>("#ok-initials");
    const okStampEl = root.querySelector<HTMLElement>("#ok-stamp");
    const okDateEl = root.querySelector<HTMLElement>("#ok-date");
    const jobOkEl = document.getElementById("job-ok"); // fixed furniture, outside the section
    const okTabs = Array.prototype.slice.call(
      root.querySelectorAll<HTMLElement>(".ok-tab"),
    ) as HTMLElement[];
    const okReply1 = root.querySelector<HTMLElement>("#ok-reply1");
    const okReply2 = root.querySelector<HTMLElement>("#ok-reply2");
    const okReply3 = root.querySelector<HTMLElement>("#ok-reply3");

    let okState: OkState | null = null;
    try {
      okState = JSON.parse(localStorage.getItem(OK_STORE) || "null");
    } catch {
      okState = null;
    }
    if (okDateEl) okDateEl.textContent = deskDateStr(new Date());

    function renderOK(fresh: boolean): void {
      if (!okState || !OK_META[okState.v] || !okStampEl) return;
      const m = OK_META[okState.v];
      okStampEl.innerHTML =
        '<span class="oks1">' +
        m.face +
        "</span>" +
        '<span class="oks2">“' +
        okState.ini +
        "” · " +
        okState.time +
        "</span>";
      okStampEl.classList.add("on");
      if (fresh && !reducedRef.current && !stillRef.current) {
        okStampEl.classList.remove("thunk");
        void okStampEl.getBoundingClientRect();
        okStampEl.classList.add("thunk");
      }
      if (jobOkEl) {
        jobOkEl.textContent =
          " · " +
          m.job +
          (okState.v === "ok" ? " · OK" : "") +
          " “" +
          okState.ini +
          "” · " +
          okState.time;
      }
      okTabs.forEach(function (tab) {
        tab.setAttribute(
          "aria-pressed",
          String(tab.dataset.verdict === okState!.v),
        );
      });
      if (okInput && !okInput.value && okState.ini !== "-" && okState.ini !== "—")
        okInput.value = okState.ini;
      /* the mess gets its reply */
      if (okReply1) okReply1.textContent = m.r1;
      if (okReply2) okReply2.textContent = m.r2;
      if (okReply3)
        okReply3.textContent = okState.n > 1 ? "changed your mind. noted." : "";
    }

    function commitOK(verdict: string | undefined): void {
      if (!verdict || !OK_META[verdict]) return;
      const ini =
        (okInput?.value || "")
          .replace(/[^\w.\-]/g, "")
          .toUpperCase()
          .slice(0, 4) || "-";
      okState = {
        v: verdict,
        ini: ini,
        time: deskTime(new Date()),
        n: okState && okState.v ? (okState.n || 1) + 1 : 1,
      };
      try {
        localStorage.setItem(OK_STORE, JSON.stringify(okState));
      } catch {}
      renderOK(true);
      api.current.sndTok?.(); /* the stamp knocks, if the noise is on */
      api.current.logAct?.(
        "sheet stamped: " +
          OK_META[verdict].face.toLowerCase() +
          " · “" +
          ini +
          "”.",
      );
    }

    let okHoldT: ReturnType<typeof setTimeout> | null = null;

    // per-tab handlers, tracked so cleanup can detach exactly what it attached
    const perTab = okTabs.map((tab) => {
      const onDown = (e: PointerEvent): void => {
        if (e.button && e.button !== 0) return;
        if (okHoldT) clearTimeout(okHoldT);
        tab.classList.add("holding");
        okHoldT = setTimeout(function () {
          tab.classList.remove("holding");
          commitOK(tab.dataset.verdict);
        }, 620);
      };
      const onEnd = (): void => {
        if (okHoldT) clearTimeout(okHoldT);
        tab.classList.remove("holding");
      };
      const onKey = (e: KeyboardEvent): void => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          commitOK(tab.dataset.verdict);
        }
      };
      tab.addEventListener("pointerdown", onDown);
      tab.addEventListener("pointerup", onEnd);
      tab.addEventListener("pointerleave", onEnd);
      tab.addEventListener("pointercancel", onEnd);
      tab.addEventListener("keydown", onKey);
      return { tab, onDown, onEnd, onKey };
    });

    const onInputKey = (e: KeyboardEvent): void => {
      /* enter in the field is the affirmative: the sheet passes */
      if (e.key === "Enter") {
        e.preventDefault();
        commitOK("ok");
      }
    };
    if (okInput) okInput.addEventListener("keydown", onInputKey);

    renderOK(false);

    return () => {
      if (okHoldT) clearTimeout(okHoldT);
      perTab.forEach(({ tab, onDown, onEnd, onKey }) => {
        tab.removeEventListener("pointerdown", onDown);
        tab.removeEventListener("pointerup", onEnd);
        tab.removeEventListener("pointerleave", onEnd);
        tab.removeEventListener("pointercancel", onEnd);
        tab.removeEventListener("keydown", onKey);
      });
      if (okInput) okInput.removeEventListener("keydown", onInputKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
