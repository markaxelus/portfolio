"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useEngine } from "@/app/_engine/engine-context";
import { deskTime } from "@/lib/desk";

/**
 * THE JOB LOG — the shop witnesses you (main.js 3166–3315).
 *
 * OWNS `engine.api.current.logAct = (line, instant) => {}`: every playful act
 * across the page hands one dry typeset line to the colophon — desk-time
 * stamped, newest first (top), teletyped char-by-char like a ticket printer,
 * capped ~10, adjacent identical acts collapsing into one line with a fresh
 * clock. Hidden until the first act. A returning session's first act re-opens
 * the ticket with a `— reading nº NNN —` divider. Persisted `ma-presslog-v1`;
 * the reading divider gate is sessionStorage `ma-log-sess`.
 *
 * Also builds the REAL scroll rail (#jl-rail / #jl-thumb) — a draggable ink
 * carriage synced to scrollTop, shown only while the log overflows — because
 * native ::-webkit-scrollbar is an unreliable lottery across browsers.
 *
 * VERBATIM port: 620/620 nothing changes here except the JS→React plumbing —
 * every timeout (19ms / 30ms typing, the collapse rule, the 11-entry cap, the
 * thumb-height `ch*ch/sh` math) is identical.
 */

interface LogEntry {
  t?: string; // desk time (absent on dividers)
  s: string; // the line text
  d?: number; // 1 = a "reading nº" divider
}

export function useJobLog(rootRef: RefObject<HTMLElement | null>): void {
  const engine = useEngine();
  const api = engine.api; // stable ref object
  const mouse = engine.mouse; // stable ref (compat-mousemove feed)

  // refs mirror the latest media flags so the once-mounted closures read fresh
  const reducedRef = useRef(engine.reduced);
  reducedRef.current = engine.reduced;
  const stillRef = useRef(engine.stillMode);
  stillRef.current = engine.stillMode;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const LOG_STORE = "ma-presslog-v1";
    const logLinesEl = root.querySelector<HTMLUListElement>("#jl-lines");
    const logBlockEl = root.querySelector<HTMLElement>("#joblog");
    const jlThumb = root.querySelector<HTMLElement>("#jl-thumb");
    const jlScroll: HTMLElement | null = logLinesEl
      ? (logLinesEl.parentNode as HTMLElement | null)
      : null;

    let logEntries: LogEntry[] = [];
    let logSessionMarked = false;
    try {
      logEntries = JSON.parse(localStorage.getItem(LOG_STORE) || "[]") || [];
    } catch {
      logEntries = [];
    }
    try {
      logSessionMarked = !!sessionStorage.getItem("ma-log-sess");
    } catch {}

    const liText = (en: LogEntry): string =>
      en.d ? en.s : en.t! + " · " + en.s; // non-dividers always carry a time
    /* newest line sits on TOP — keep it in view by pinning to the start */
    const scrollLogTop = (): void => {
      if (logLinesEl) {
        logLinesEl.scrollTop = 0;
        updateJoblogBar();
      }
    };
    let typeTimer: ReturnType<typeof setTimeout> | null = null;

    /* rebuild the whole log instantly — load, print, reduced motion */
    const renderLog = (): void => {
      if (!logLinesEl || !logBlockEl) return;
      if (typeTimer) clearTimeout(typeTimer);
      if (!logEntries.length) {
        logBlockEl.hidden = true;
        return;
      }
      logBlockEl.hidden = false;
      logLinesEl.innerHTML = "";
      for (let i = logEntries.length - 1; i >= 0; i--) {
        // newest first (top)
        const li = document.createElement("li");
        if (logEntries[i].d) li.className = "jl-div";
        li.textContent = liText(logEntries[i]);
        logLinesEl.appendChild(li);
      }
      scrollLogTop();
    };

    /* the shop's ticket printer: render all but the newest instantly, then
       chatter the newest line out one character at a time. */
    const typeOutLast = (): void => {
      if (!logLinesEl || !logBlockEl) return;
      if (typeTimer) clearTimeout(typeTimer);
      logBlockEl.hidden = false;
      logLinesEl.innerHTML = "";
      const en = logEntries[logEntries.length - 1];
      const full = liText(en);
      const line = document.createElement("li");
      if (en.d) line.className = "jl-div";
      line.classList.add("jl-typing");
      logLinesEl.appendChild(line);
      for (let i = logEntries.length - 2; i >= 0; i--) {
        const li = document.createElement("li");
        if (logEntries[i].d) li.className = "jl-div";
        li.textContent = liText(logEntries[i]);
        logLinesEl.appendChild(li);
      }
      scrollLogTop();
      let k = 0;
      const step = (): void => {
        line.textContent = full.slice(0, k);
        if (k < full.length) {
          const ch = full.charAt(k);
          k++;
          scrollLogTop();
          typeTimer = setTimeout(step, ch === " " ? 30 : 19);
        } else {
          line.classList.remove("jl-typing");
        }
      };
      step();
    };

    const logAct = (line: string, instant?: boolean): void => {
      if (!logLinesEl) return;
      /* the first act of a return session re-opens the ticket */
      if (!logSessionMarked) {
        logSessionMarked = true;
        try {
          sessionStorage.setItem("ma-log-sess", "1");
        } catch {}
        if (logEntries.length) {
          let v = 1;
          try {
            v = Math.max(2, +(localStorage.getItem("ma-visits") || 2));
          } catch {}
          logEntries.push({
            d: 1,
            s: "· reading nº " + String(v).padStart(3, "0") + " ·",
          });
        }
      }
      const last = logEntries[logEntries.length - 1];
      let fresh: boolean;
      if (last && !last.d && last.s === line) {
        last.t = deskTime(new Date()); // same act again — the clock updates, the line doesn't
        fresh = false;
      } else {
        logEntries.push({ t: deskTime(new Date()), s: line });
        fresh = true;
      }
      if (logEntries.length > 11) logEntries = logEntries.slice(-11);
      try {
        localStorage.setItem(LOG_STORE, JSON.stringify(logEntries));
      } catch {}
      if (
        fresh &&
        !instant &&
        !reducedRef.current &&
        !stillRef.current &&
        document.visibilityState !== "hidden"
      ) {
        typeOutLast();
      } else {
        renderLog();
      }
    };

    renderLog();

    // ---- OWN the cross-subsystem handle ----
    api.current.logAct = logAct;

    /* pulling a paper copy is an act too — render it instantly */
    const onBeforePrint = (): void =>
      logAct("a clean proof pulled to paper.", true);
    window.addEventListener("beforeprint", onBeforePrint);

    // ---- the scroll rail, as REAL DOM ----
    function updateJoblogBar(): void {
      if (!logLinesEl || !jlThumb || !jlScroll) return;
      const ch = logLinesEl.clientHeight,
        sh = logLinesEl.scrollHeight;
      if (sh - ch <= 1) {
        jlScroll.classList.remove("has-scroll");
        return;
      }
      jlScroll.classList.add("has-scroll");
      const th = Math.max(16, Math.round((ch * ch) / sh));
      const maxTop = ch - th;
      jlThumb.style.height = th + "px";
      jlThumb.style.top =
        Math.round((logLinesEl.scrollTop / (sh - ch)) * maxTop) + "px";
    }

    if (logLinesEl)
      logLinesEl.addEventListener("scroll", updateJoblogBar, { passive: true });
    window.addEventListener("resize", updateJoblogBar);

    // the thumb drag
    let jlDrag: { y: number; top: number; span: number; maxTop: number } | null =
      null;
    const onThumbDown = (e: PointerEvent): void => {
      if (!logLinesEl || !jlThumb) return;
      const ch = logLinesEl.clientHeight,
        sh = logLinesEl.scrollHeight;
      if (sh - ch <= 1) return;
      jlDrag = {
        y: e.clientY,
        top: logLinesEl.scrollTop,
        span: sh - ch,
        maxTop: ch - jlThumb.offsetHeight,
      };
      jlThumb.classList.add("drag");
      try {
        jlThumb.setPointerCapture(e.pointerId);
      } catch {}
      e.preventDefault();
    };
    const onThumbMove = (e: PointerEvent): void => {
      // compat-mousemove rule: this pointerdown preventDefault()s + captures,
      // so feed the cursor dot ourselves or it freezes for the drag.
      const m = mouse.current;
      if (m) {
        m.x = e.clientX;
        m.y = e.clientY;
      }
      if (!jlDrag || jlDrag.maxTop <= 0 || !logLinesEl) return;
      logLinesEl.scrollTop =
        jlDrag.top + ((e.clientY - jlDrag.y) / jlDrag.maxTop) * jlDrag.span;
    };
    const onThumbEnd = (e: PointerEvent): void => {
      if (!jlDrag) return;
      jlDrag = null;
      if (jlThumb) {
        jlThumb.classList.remove("drag");
        try {
          jlThumb.releasePointerCapture(e.pointerId);
        } catch {}
      }
    };
    if (jlThumb) {
      jlThumb.addEventListener("pointerdown", onThumbDown);
      jlThumb.addEventListener("pointermove", onThumbMove);
      jlThumb.addEventListener("pointerup", onThumbEnd);
      jlThumb.addEventListener("pointercancel", onThumbEnd);
    }

    updateJoblogBar();

    return () => {
      if (typeTimer) clearTimeout(typeTimer);
      if (api.current.logAct === logAct) delete api.current.logAct;
      window.removeEventListener("beforeprint", onBeforePrint);
      window.removeEventListener("resize", updateJoblogBar);
      if (logLinesEl)
        logLinesEl.removeEventListener("scroll", updateJoblogBar);
      if (jlThumb) {
        jlThumb.removeEventListener("pointerdown", onThumbDown);
        jlThumb.removeEventListener("pointermove", onThumbMove);
        jlThumb.removeEventListener("pointerup", onThumbEnd);
        jlThumb.removeEventListener("pointercancel", onThumbEnd);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
