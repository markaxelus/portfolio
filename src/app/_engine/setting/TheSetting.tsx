"use client";

import { useSetting } from "./use-setting";
import { useReleaseMasks } from "./use-release-masks";

/**
 * THE SETTING — the seeded-asymmetric load entrance ("matter arrives by hand").
 *
 * Renders nothing. It operates on the EXISTING server-rendered section DOM by
 * id / class selector (the ticker, trail stones + measured ground, the line
 * sheets, the yard cairn, the v3 lockup, the specimen / tonebar, the desk /
 * outro furniture) — a verbatim port of main.js's initSetting + releaseMasks.
 * Mount it anywhere inside <EngineProvider>; placement is cosmetic since it
 * queries the DOM globally.
 *
 *  - useSetting():      arms set-in / set-fade / stones-armed on the furniture,
 *                       drives one IntersectionObserver, fires the trail / yard
 *                       choreo, kicks the hung sheets, owns disarmSetting.
 *  - useReleaseMasks(): lands the v3 lockup (`.landed`) at its animationend.
 */
export default function TheSetting(): null {
  useReleaseMasks();
  useSetting();
  return null;
}
