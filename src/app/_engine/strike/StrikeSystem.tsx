"use client";

import { useHoldRegister } from "./use-hold-register";
import { useRegmarkFidget } from "./use-regmark-fidget";

/**
 * THE STRIKE — register systems (Direction Nº 003, P2).
 *
 * Renders nothing. Operates on EXISTING DOM by id/class selector:
 *  • the hold register shears the display type's ink passes (`.regel`) by
 *    scroll velocity and drifts the `.regmark` crosshair by the error;
 *  • the regmark click is a fidget.
 *
 * The impression line ("reading prints the sheet" — the 62vh #impline hairline
 * + the emboss→ink strike) was REMOVED at Mark's request; sections now ship
 * inked (their SSR default) with no `.unstruck` arming. `strikeAll` is no
 * longer registered, so its callers (mess-enter) safely no-op.
 */
export default function StrikeSystem(): null {
  useHoldRegister();
  useRegmarkFidget();
  return null;
}
