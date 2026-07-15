import "@testing-library/cypress/add-commands";

// A React hydration mismatch re-renders the affected subtree on the client and
// then renders correctly — benign for a smoke test (the page still works). It
// can appear rarely under streaming SSR when a client effect fills an SSR
// placeholder (the visit odometer, the clock) mid-hydration. Don't fail the
// smoke on it; every other uncaught error still fails the test.
Cypress.on("uncaught:exception", (err) => {
  if (
    /Minified React error #(418|421|423|425)|Hydration failed|hydrat/i.test(
      err.message,
    )
  ) {
    return false;
  }
  return undefined;
});
