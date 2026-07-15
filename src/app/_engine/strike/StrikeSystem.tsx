"use client";

import { useImpressionLine } from "./use-impression-line";
import { useHoldRegister } from "./use-hold-register";
import { useRegmarkFidget } from "./use-regmark-fidget";

/**
 * THE STRIKE — "STRIKE = INK" (Direction Nº 003, P1 + P2).
 *
 * Renders nothing. It operates on EXISTING DOM by id/class selector:
 *  • the impression line arms `.unstruck` on the 10 units (ticker, trail,
 *    index head, the four rows, desk, yard, outro) and strikes each as it
 *    crosses the 62vh hairline (`#impline`), ticking the `.regmark`;
 *  • the hold register shears the display type's ink passes (`.regel`) by
 *    scroll velocity and drifts the `.regmark` crosshair by the error;
 *  • the regmark click is a fidget.
 *
 * Mount ORDER matters only for the shared scroll subscription: checkStrikes
 * (impression line) is registered before regFrame (hold register), matching
 * main.js's onScroll (checkStrikes at 1904, regFrame at 1906). Placement in
 * the tree is otherwise cosmetic — everything is queried by selector.
 */
export default function StrikeSystem(): null {
  useImpressionLine();
  useHoldRegister();
  useRegmarkFidget();
  return null;
}
