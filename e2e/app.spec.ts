import type { Page } from '@playwright/test'
import { test, expect } from './fixtures'
import { TEST_EVENTS } from '../src/test/events'
import type { EventConfig } from '../src/types'

// The built app (vite preview of dist/) in real browsers, with the events
// API stubbed — what jsdom can't check: real layout, scrolling, asset URLs
// and browser APIs (#256).

function isoInDays(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

// Created in the app, no schedule yet, 10 days out.
const upcoming: EventConfig = {
  id: `${isoInDays(10)}_upcoming-track-day`,
  name: 'Upcoming Track Day',
  track: 'Charlie Raceway',
  runGroups: [],
  days: [{ id: 'saturday', label: 'Saturday', date: isoInDays(10), activities: [] }],
}
const [alpha] = TEST_EVENTS

async function stubEvents(page: Page, events: EventConfig[] | 'down' = [upcoming, ...TEST_EVENTS]) {
  await page.route('**/api/events', route =>
    events === 'down'
      ? route.fulfill({ status: 500, body: 'down' })
      : route.fulfill({ json: { events } }),
  )
  // No Netlify Identity here: sign-in stays hidden, as on local dev.
  await page.route('**/.netlify/identity/**', route => route.fulfill({ status: 404, body: '' }))
}

test('lists upcoming and past events, and opens one', async ({ page }) => {
  await stubEvents(page)
  await page.goto('/#/')
  await expect(page.getByRole('button', { name: /Upcoming Track Day/ })).toBeVisible()
  await page.getByRole('button', { name: new RegExp(alpha.name) }).click()

  await expect(page.getByRole('heading', { level: 1, name: alpha.name })).toBeVisible()
  await expect(page.getByRole('tab', { name: 'Schedule' })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByText('Drivers meeting')).toBeVisible()
})

test('shows the track map for the event’s track', async ({ page }) => {
  await stubEvents(page)
  await page.goto(`/#/event/${alpha.id}`)
  await page.getByRole('tab', { name: 'Details' }).click()
  const map = page.getByRole('img', { name: `${alpha.name} track map` }).first()
  await expect(map).toBeVisible()
  // Actually loaded from the build's hashed asset URL, not a broken image.
  await expect.poll(() => map.evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
})

test('shows today’s schedule with the now-line, scrolled into view', async ({ page }) => {
  await stubEvents(page)
  await page.goto('/#/event/test-live')
  await expect(page.getByRole('tablist', { name: 'Event section' })).toBeVisible()
  // The timeline scrolls the now-line into view 150ms after showing today —
  // the call jsdom doesn't have. test-live runs from midnight to midnight,
  // so wherever "now" is, the line ends up on screen.
  await expect(page.locator('[data-time-indicator]')).toBeInViewport()
})

test('says "Schedule coming soon" for an event with no schedule', async ({ page }) => {
  await stubEvents(page)
  await page.goto(`/#/event/${upcoming.id}`)
  await expect(page.getByText('Schedule coming soon')).toBeVisible()
})

test('says when a linked event doesn’t exist', async ({ page }) => {
  await stubEvents(page)
  await page.goto('/#/event/2099-01-01_deleted')
  await expect(page.getByText('This event doesn’t exist')).toBeVisible()
})

test('still works when the events API is down', async ({ page }) => {
  await stubEvents(page, 'down')
  await page.goto('/#/')
  await expect(page.getByText('No upcoming events.')).toBeVisible()
})

test('widget setup page offers the loader script', async ({ page }) => {
  await stubEvents(page)
  await page.goto('/#/widget-setup')
  await expect(page.getByRole('heading', { level: 1, name: 'iOS widget' })).toBeVisible()
  await page.getByRole('button', { name: 'View script' }).click()
  await expect(page.getByText(/raw\.githubusercontent\.com\/inko9nito\/hpde\/main\/scripts\/hpde-widget\.js/)).toBeVisible()
})

test('share page shares the live address with a QR code', async ({ page }) => {
  await stubEvents(page)
  await page.goto('/#/share')
  await expect(page.getByRole('heading', { level: 1, name: 'Share' })).toBeVisible()
  await expect(page.getByText('https://myhpde.netlify.app/')).toBeVisible()
  const qr = page.locator('img[src^="data:image/png"]')
  await expect(qr).toBeVisible()
})
