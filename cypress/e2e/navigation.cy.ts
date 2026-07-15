describe("home smoke (single-page portfolio)", () => {
  beforeEach(() => {
    cy.setCookie("ignoreVisits", "true");
    cy.intercept("GET", "/api/visits", { statusCode: 200, body: { total: 1017 } });
  });

  it("renders the hero, the four work plates, and the outro", () => {
    // ?still skips the make-ready loader and ships every section visible
    cy.visit("/?still");

    cy.get("#hero-title", { timeout: 10000 }).should("be.visible");
    cy.get("#markw").should("contain.text", "Mark");

    cy.get("#index .row").should("have.length", 4);
    cy.contains("#index .row-title", "Uveec").should("exist");

    cy.get("section.outro").should("exist");
    // contact is a mailto now, not a form/page
    cy.get('a[href^="mailto:"]').should("exist");
  });

  it("toggles the mess (proof) layer", () => {
    cy.visit("/?still");
    cy.get("body").should("not.have.class", "proof");
    cy.get("#proof-btn").click();
    cy.get("body").should("have.class", "proof");
  });
});
