describe("api smoke", () => {
  it("contact GET returns helper message", () => {
    cy.request("/api/contact").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("message");
    });
  });

  it("contact POST with missing fields returns 400", () => {
    cy.request({
      method: "POST",
      url: "/api/contact",
      failOnStatusCode: false,
      body: { name: "", email: "", message: "" },
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property("error");
    });
  });
});
