import { defineConfig, devices } from '@playwright/test'

// Browser tests (#256), in real browser engines rather than jsdom. Two modes:
//
//   npm run build && npm run test:e2e
//     The built app, served by `vite preview`, with the events API stubbed
//     (e2e/app.spec.ts). Runs on every PR and push to main.
//
//   E2E_BASE_URL=https://… npm run test:e2e
//     Read-only checks against a deployed site — a Netlify deploy preview or
//     production — with the real functions behind it (e2e/live.spec.ts).
//
// Both run in WebKit on an iPhone-sized screen (the engine behind Safari on
// iPhone) and Chromium. Locally, where only Chromium may be installed:
// `npm run test:e2e -- --project=chromium`, and set
// PLAYWRIGHT_EXECUTABLE_PATH if its binary isn't where Playwright expects.
const live = process.env.E2E_BASE_URL
const executablePath = process.env.PLAYWRIGHT_EXECUTABLE_PATH

export default defineConfig({
  testDir: 'e2e',
  testMatch: live ? 'live.spec.ts' : 'app.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  // A deployed site's functions can take a few seconds on a cold start.
  expect: { timeout: live ? 15_000 : 5_000 },
  use: {
    baseURL: live ?? 'http://localhost:4173',
    trace: 'retain-on-failure',
    // Only for Claude's sandbox, whose network proxy re-signs HTTPS with its
    // own certificate. Never set in CI.
    ignoreHTTPSErrors: !!process.env.E2E_SANDBOX_PROXY,
  },
  projects: [
    { name: 'iphone-webkit', use: { ...devices['iPhone 13'] } },
    {
      name: 'chromium',
      use: { ...devices['Pixel 7'], ...(executablePath ? { launchOptions: { executablePath } } : {}) },
    },
  ],
  webServer: live
    ? undefined
    : {
        command: 'npx vite preview --port 4173 --strictPort',
        url: 'http://localhost:4173',
        reuseExistingServer: !process.env.CI,
      },
})
