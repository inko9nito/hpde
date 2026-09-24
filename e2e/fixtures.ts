import { test as base, expect } from '@playwright/test'

// Every browser test fails on an uncaught error in the page, even if what
// it was checking looked right — the class of bug jsdom hides (#256).
export const test = base.extend<{ pageErrors: string[] }>({
  pageErrors: [
    async ({ page }, use) => {
      const errors: string[] = []
      page.on('pageerror', err => errors.push(err.stack ?? String(err)))
      await use(errors)
      expect(errors, 'uncaught errors in the page').toEqual([])
    },
    { auto: true },
  ],
})

export { expect }
