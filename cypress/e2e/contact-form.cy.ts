describe("contact form", () => {
  it("submits successfully when API returns success", () => {
    cy.intercept("POST", "/api/contact", {
      statusCode: 200,
      body: { success: true },
    }).as("contactPost");

    cy.visit("/contact");

    cy.findByPlaceholderText(/your name/i).type("Jane Doe");
    cy.findByPlaceholderText(/your email/i).type("jane@example.com");
    cy.findByPlaceholderText(/say hello!/i).type("Hello from Cypress");

    cy.findByRole("button", { name: /send it!/i }).click();

    cy.wait("@contactPost").its("response.statusCode").should("eq", 200);

    cy.findByText(/sent!/i).should("exist");
  });
});
