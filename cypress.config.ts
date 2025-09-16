import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: [
      "cypress/e2e/**/*.cy.{ts,tsx,js,jsx}",
      "src/**/__tests__/**/*.cy.{ts,tsx,js,jsx}",
    ],
    supportFile: "cypress/support/e2e.ts",
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    retries: 1,
  },
});
