import { defineConfig, devices } from "@playwright/test";

const PORT = 3210;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `npx browser-sync start --server --no-notify --no-open --no-ui --port ${PORT}`,
    url: `http://localhost:${PORT}/fixtures/contrast.html`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
