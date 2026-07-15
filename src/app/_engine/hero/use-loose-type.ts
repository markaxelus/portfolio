"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import { clamp } from "@/lib/math";
import type { EngineCtx } from "../engine-context";
import type { Ch, HeroFlags } from "./chars";

/**
 * LOOSE TYPE — the case is open. Ported VERBATIM from prototypes/main.js
 * 1220-1388. Grab a hero letter → letterpress physics inside the hero
 * (GRAV 2400, floor bounce 0.42, wall bounce 0.5, resting threshold). The
 * `[!] LOOSE TYPE` / `[R] RESET THE CASE` decal (click or key R) resets the
 * case; the cursor label reads GRAB / WHEEE; fine-pointer only; a hard landing
 * kicks 1-2px of registration error. The grab is delegated on #hero-title but
 * only fires over an actual `.ch` (the .hl-equivalent boxes are wide empties);
 * shift-drag is reserved for the plate pull. Because the pointerdown
 * preventDefault()s, the drag feeds engine.mouse.current from its own
 * pointermove (the compat-mousemove rule — else the cursor dot freezes).
 */
export function useLooseType(
  rootRef: RefObject<HTMLElement | null>,
  titleRef: RefObject<HTMLHeadingElement | null>,
  charsRef: RefObject<Ch[]>,
  flags: HeroFlags,
  engine: EngineCtx,
): void {
  const mouse = engine.mouse;
  const api = engine.api;

  useEffect(() => {
    const heroEl = rootRef.current;
    const heroTitleEl = titleRef.current;
    if (!heroEl || !heroTitleEl) return;

    const typeDecal = document.getElementById("type-decal");
    const cursorEl = document.getElementById("cursor");
    const cursorLabel = cursorEl
      ? cursorEl.querySelector<HTMLElement>(".cursor-label")
      : null;

    const GRAV = 2400;
    let grabbed:
      | {
          c: Ch;
          startPX: number;
          startPY: number;
          baseX: number;
          baseY: number;
          lastPX: number;
          lastPY: number;
          lastT: number;
        }
      | null = null;
    let anyLoose = false;
    let physicsRunning = false;
    let raf = 0;
    let throwCount = 0;
    let grabHoverT = 0;
    const timers = new Set<number>();

    // sound / registry handles — no-op-safe until their owners mount. sndClack
    // carries the impact volume (the interface types it 0-arg; cast to pass it).
    const sndClack = (v: number) => {
      const f = api.current.sndClack as undefined | ((vol: number) => void);
      f?.(v);
    };
    const regKick = (px: number) => api.current.regKick?.(px);
    const logAct = (line: string) => api.current.logAct?.(line);

    function overCh(t: EventTarget | null): boolean {
      const el = t as HTMLElement | null;
      return !!(el && el.classList && el.classList.contains("ch"));
    }

    function applyChar(c: Ch) {
      c.el.style.transform =
        "translate3d(" +
        c.x.toFixed(1) +
        "px," +
        c.y.toFixed(1) +
        "px,0) rotate(" +
        c.rot.toFixed(2) +
        "deg)";
    }

    function physicsFrame() {
      if (!physicsRunning) return;
      const heroRect = heroEl!.getBoundingClientRect();
      const floor = heroRect.bottom - 10;
      let activeCount = 0;
      charsRef.current.forEach((c) => {
        if (!c.loose || c === (grabbed && grabbed.c) || c.resting) return;
        activeCount++;
        const dt = 0.016;
        c.vy += GRAV * dt;
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        c.rot += c.vr * dt;
        applyChar(c);
        const r = c.el.getBoundingClientRect();
        if (r.bottom > floor) {
          const impact = c.vy;
          c.y -= r.bottom - floor;
          c.vy = -c.vy * 0.42;
          c.vx *= 0.88;
          c.vr *= 0.8;
          if (Math.abs(c.vy) < 60) c.vy = 0;
          if (impact > 220) sndClack(clamp(impact / 1800, 0.12, 1));
          // a hard landing kicks a pixel of error into the register
          if (impact > 900) regKick(clamp(impact / 700, 1, 2.2));
        }
        if (r.left < heroRect.left) {
          c.x += heroRect.left - r.left;
          c.vx = -c.vx * 0.5;
        }
        if (r.right > heroRect.right) {
          c.x -= r.right - heroRect.right;
          c.vx = -c.vx * 0.5;
        }
        if (c.vy === 0 && Math.abs(c.vx) < 10 && r.bottom >= floor - 2) {
          c.vx = 0;
          c.vr = 0;
          c.resting = true;
        }
        applyChar(c);
      });
      if (activeCount === 0 && !grabbed) {
        physicsRunning = false;
        return;
      }
      raf = requestAnimationFrame(physicsFrame);
    }

    function startPhysics() {
      if (!physicsRunning) {
        physicsRunning = true;
        raf = requestAnimationFrame(physicsFrame);
      }
    }

    function resetCase() {
      charsRef.current.forEach((c) => {
        if (!c.loose) return;
        c.el.classList.add("returning");
        c.el.style.transform = "";
        c.x = 0;
        c.y = 0;
        c.vx = 0;
        c.vy = 0;
        c.rot = 0;
        c.vr = 0;
        c.loose = false;
        c.resting = false;
        const t = window.setTimeout(() => {
          c.el.classList.remove("returning");
          timers.delete(t);
        }, 750);
        timers.add(t);
      });
      anyLoose = false;
      grabbed = null;
      const t2 = window.setTimeout(() => {
        if (!anyLoose) heroEl!.classList.remove("type-loose");
        timers.delete(t2);
      }, 750);
      timers.add(t2);
      if (typeDecal) typeDecal.textContent = "[!] LOOSE TYPE — GRAB A LETTER";
      logAct("the case reset. every sort back home.");
    }

    // own the registry handle so anyone (the [R] key elsewhere / mess) can reset
    api.current.resetLooseType = resetCase;

    const onDecalClick = () => {
      if (anyLoose) resetCase();
    };
    if (typeDecal) typeDecal.addEventListener("click", onDecalClick);

    // grab: delegated on the title, fires only over a real .ch (not the wide
    // empty title box); shift is the plate pull, not a grab.
    const onTitlePointerDown = (e: PointerEvent) => {
      if (e.shiftKey) return; // shift-drag is the plate pull
      if (!overCh(e.target)) return;
      if (!flags.trail.current || flags.reduced.current) return;
      if (flags.proof.current) return;
      const c = charsRef.current.find((ch) => ch.el === e.target);
      if (!c) return;
      e.preventDefault();
      heroEl!.classList.add("type-loose");
      c.loose = true;
      c.resting = false;
      c.el.classList.add("grabbed");
      grabbed = {
        c,
        startPX: e.clientX,
        startPY: e.clientY,
        baseX: c.x,
        baseY: c.y,
        lastPX: e.clientX,
        lastPY: e.clientY,
        lastT: performance.now(),
      };
      anyLoose = true;
      if (typeDecal) typeDecal.textContent = "[R] RESET THE CASE";
      if (cursorLabel) cursorLabel.textContent = "WHEEE";
      startPhysics();
    };
    heroTitleEl.addEventListener("pointerdown", onTitlePointerDown);

    const onPointerMove = (e: PointerEvent) => {
      if (!grabbed) return;
      // the canceled pointerdown suppresses compat mousemove for the whole
      // drag, freezing the dot's feed — keep it fed from here (compat rule)
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      const g = grabbed;
      const c = g.c;
      c.x = g.baseX + (e.clientX - g.startPX);
      c.y = g.baseY + (e.clientY - g.startPY);
      const now = performance.now();
      const dt = Math.max(8, now - g.lastT) / 1000;
      c.vx = (e.clientX - g.lastPX) / dt;
      c.vy = (e.clientY - g.lastPY) / dt;
      g.lastPX = e.clientX;
      g.lastPY = e.clientY;
      g.lastT = now;
      applyChar(c);
    };
    document.addEventListener("pointermove", onPointerMove);

    const onPointerUp = (e: PointerEvent) => {
      if (!grabbed) return;
      const c = grabbed.c;
      c.el.classList.remove("grabbed");
      c.vx = clamp(c.vx, -1600, 1600);
      c.vy = clamp(c.vy, -1600, 1600);
      c.vr = c.vx * 0.15 + (c.vy > 0 ? 40 : -40);
      grabbed = null;
      // the thrown letter usually rides under the pointer, so this stays GRAB;
      // released over empty case, the ring goes away
      if (overCh(e.target)) {
        if (cursorLabel) cursorLabel.textContent = "GRAB";
      } else if (cursorEl) {
        cursorEl.classList.remove("is-grab");
      }
      throwCount++;
      logAct("the “" + c.el.textContent + "” thrown across the case.");
      if (throwCount === 4) logAct("that’s four throws. the type forgives.");
      startPhysics();
    };
    document.addEventListener("pointerup", onPointerUp);

    // GRAB only over an actual letter — delegate to the .ch spans; the short
    // exit delay bridges word spaces so the ring doesn't flicker
    const onTitleMouseOver = (e: MouseEvent) => {
      if (!overCh(e.target)) return;
      if (!flags.trail.current || flags.reduced.current || flags.proof.current) return;
      clearTimeout(grabHoverT);
      if (cursorLabel) cursorLabel.textContent = grabbed ? "WHEEE" : "GRAB";
      if (cursorEl) cursorEl.classList.add("is-grab");
    };
    heroTitleEl.addEventListener("mouseover", onTitleMouseOver);

    const onTitleMouseOut = (e: MouseEvent) => {
      if (!overCh(e.target) || grabbed) return; // mid-drag it stays WHEEE
      clearTimeout(grabHoverT);
      grabHoverT = window.setTimeout(() => {
        if (!grabbed && cursorEl) cursorEl.classList.remove("is-grab");
      }, 90);
    };
    heroTitleEl.addEventListener("mouseout", onTitleMouseOut);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && t.tagName === "INPUT") return; // the ok slip types here
      if ((e.key === "r" || e.key === "R") && anyLoose) resetCase();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      if (typeDecal) typeDecal.removeEventListener("click", onDecalClick);
      heroTitleEl.removeEventListener("pointerdown", onTitlePointerDown);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
      heroTitleEl.removeEventListener("mouseover", onTitleMouseOver);
      heroTitleEl.removeEventListener("mouseout", onTitleMouseOut);
      document.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(raf);
      clearTimeout(grabHoverT);
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
      if (api.current.resetLooseType === resetCase) delete api.current.resetLooseType;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}