import { test as base, expect } from '@playwright/test'

// Every browser test fails on an uncaught error in the page, even if what
// it was checking looked right — the class of bug jsdom hides (#256).
export const test = base.extend<{ pageErrors: string[]; homeScreenBanner: boolean }>({
  pageErrors: [
    async ({ page }, use) => {
      const errors: string[] = []
      page.on('pageerror', err => errors.push(err.stack ?? String(err)))
      await use(errors)
      expect(errors, 'uncaught errors in the page').toEqual([])
    },
    { auto: true },
  ],
  // The Add to Home Screen card (#379) sits over the events on an iPhone
  // until it's dismissed. Tests start with it dismissed, so the iPhone and
  // Chromium runs see the same page; its own tests turn this on.
  homeScreenBanner: [false, { option: true }],
  page: async ({ page, homeScreenBanner }, use) => {
    if (!homeScreenBanner) {
      await page.addInitScript(() => localStorage.setItem('hpde:homeScreenBannerDismissed', 'e2e'))
    }
    await use(page)
  },
})

export { expect }
