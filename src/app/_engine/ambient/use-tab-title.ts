"use client";

import { useEffect } from "react";

/**
 * THE TAB MISSES YOU — ported VERBATIM from prototypes/main.js (3349-3356).
 * On blur (document.hidden) the tab title becomes a small plea; focus restores
 * the base title. baseTitle is captured on mount (the SSR <title>). Cleanup
 * restores it so a StrictMode double-invoke / unmount can't leave a stale plea.
 */
export function useTabTitle(): void {
  useEffect(() => {
    const baseTitle = document.title;
    const onVis = () => {
      document.title = document.hidden
        ? "come back, the kerning isn’t done"
        : baseTitle;
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      document.title = baseTitle;
    };
  }, []);
}
