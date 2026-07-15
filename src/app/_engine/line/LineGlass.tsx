"use client";

import { useLineGlass } from "@/app/_engine/line/useLineGlass";

/**
 * THE GLASS IS THE CURSOR — the line loupe (CLAUDE.md §27).
 *
 * A render-null singleton that mounts the loupe engine. It operates entirely on
 * `#index` (and the `#loupe` / `#cursor` singletons) by selector, so it is fully
 * self-contained: it needs no props and coexists with `useLine` (the sheet
 * physics), which is left untouched. Must be a descendant of <EngineProvider>.
 */
export default function LineGlass() {
  useLineGlass();
  return null;
}
