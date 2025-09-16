describe("navigation smoke", () => {
  it("loads home and navigates to Works, About, Contact", () => {
    cy.setCookie("ignoreVisits", "true");
    cy.intercept("GET", "/api/visits", { statusCode: 200, body: { total: 0 } });

    cy.visit("/");

    cy.findByRole("link", { name: /^mark$/i }).should("exist");

    cy.get("nav").within(() => {
      cy.get("button").first().click();
    });

    cy.findByRole("link", { name: /works/i }).click();
    cy.url().should("include", "/works");

    cy.go("back");
    cy.get("nav").within(() => {
      cy.get("button").first().click();
    });
    cy.findByRole("link", { name: /about/i }).click();
    cy.url().should("include", "/about");

    cy.go("back");
    cy.get("nav").within(() => {
      cy.get("button").first().click();
    });
    cy.findByRole("link", { name: /contact/i }).click();
    cy.url().should("include", "/contact");
  });
});
