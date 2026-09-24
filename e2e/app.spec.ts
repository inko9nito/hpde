import type { Page } from '@playwright/test'
import { test, expect } from './fixtures'
import { TEST_EVENTS } from '../src/test/events'
import { RUN_GROUP_BG_CLASSES, RUN_GROUP_TEXT_CLASSES } from '../src/theme/runGroupColors'
import { resolveTailwindBgColor } from '../src/utils/eventsJson'
import { applySchedule } from '../src/utils/scheduleEditor'
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

// One run group per allowed color, alternating the allowed text colors.
const TEXT_RGB: Record<string, string> = { 'text-white': 'rgb(255, 255, 255)', 'text-gray-900': 'rgb(17, 24, 39)' }
const palette: EventConfig = {
  id: '2026-03-14_palette',
  name: 'Palette Day',
  runGroups: RUN_GROUP_BG_CLASSES.map((bgClass, i) => ({
    id: `g${i}`,
    label: `Group ${i}`,
    bgClass,
    textClass: RUN_GROUP_TEXT_CLASSES[i % RUN_GROUP_TEXT_CLASSES.length],
  })),
  days: [{
    id: 'saturday', label: 'Saturday', date: '2026-03-14',
    activities: [{ time: '08:00', type: 'session', sessionNumber: 1, onTrack: RUN_GROUP_BG_CLASSES.map((_, i) => `g${i}`) }],
  }],
}

function hexToRgb(hex: string): string {
  const n = parseInt(hex.slice(1), 16)
  return `rgb(${n >> 16}, ${(n >> 8) & 255}, ${n & 255})`
}

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

// Groups come from the events store, not source files Tailwind scans, so
// every color a group may use has to be safelisted into the CSS — pink and
// yellow drew no color at all once the event files left the repo.
test('every run-group color and text color is in the CSS', async ({ page }) => {
  await stubEvents(page, [palette, ...TEST_EVENTS])
  await page.goto(`/#/event/${palette.id}`)
  await page.getByRole('button', { name: 'All run groups' }).click()
  for (const g of palette.runGroups) {
    const badge = page.getByRole('button').getByText(g.label, { exact: true })
    await expect(badge, g.bgClass).toHaveCSS('background-color', hexToRgb(resolveTailwindBgColor(g.bgClass)))
    await expect(badge, g.textClass).toHaveCSS('color', TEXT_RGB[g.textClass])
  }
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

// Signed in as an admin: a stand-in for the Netlify Identity widget, which
// the app uses when it's already on the page.
async function signInAsAdmin(page: Page) {
  await page.route('**/.netlify/identity/settings', route => route.fulfill({ json: {} }))
  await page.addInitScript(() => {
    const user = { id: 'a', email: 'admin@example.com', app_metadata: { roles: ['admin'] }, jwt: async () => 'token' }
    ;(window as unknown as { netlifyIdentity: unknown }).netlifyIdentity = {
      init() {}, open() {}, close() {}, logout() {}, on() {}, currentUser: () => user,
    }
  })
}

test('an admin adds a schedule: days in markdown, group colors picked from names, preview, save (#232)', async ({ page }) => {
  await stubEvents(page)
  await signInAsAdmin(page)
  let body: { runGroups: unknown[]; schedule: string } | null = null
  await page.route(`**/api/events?id=${upcoming.id}`, async route => {
    expect(route.request().method()).toBe('PUT')
    expect(route.request().headers().authorization).toBe('Bearer token')
    body = route.request().postDataJSON()
    const result = applySchedule(upcoming, body!.runGroups, body!.schedule)
    await route.fulfill('error' in result ? { status: 400, json: result } : { json: { event: result.event } })
  })

  await page.goto(`/#/event/${upcoming.id}`)
  await page.getByRole('link', { name: 'Add schedule' }).click()
  const textarea = page.getByRole('textbox', { name: 'Schedule' })
  await expect(textarea).toHaveValue(new RegExp(`## ${upcoming.days[0].label} \\| ${upcoming.days[0].date}`))
  // 16px, or iOS zooms the page in when a field is tapped.
  await expect(textarea).toHaveCSS('font-size', '16px')

  // Uncomment the examples, the way it's meant to be used on a phone, with
  // a typo to fix.
  const text = (await textarea.inputValue()).replace(/\/\/ (\d\d:\d\d|break)/g, '$1')
  await textarea.fill(text.replace('07:00 general', '7:00 general'))
  await expect(page.getByRole('list', { name: 'Problems' })).toContainText('“7:00” isn’t a time')
  await expect(page.getByRole('button', { name: 'Save schedule' })).toBeDisabled()
  await textarea.fill(text)
  await expect(page.getByRole('list', { name: 'Problems' })).toHaveCount(0)

  // The groups the sessions name, below the schedule, colored.
  const groups = page.getByRole('region', { name: 'Run groups' })
  await expect(groups.getByRole('listitem')).toHaveText([/Novice/, /Intermediate/])
  const novice = groups.getByRole('listitem', { name: 'Novice' })
  await novice.getByRole('button', { name: 'Change color' }).click()
  await novice.getByRole('radio', { name: 'Green' }).check()
  await novice.getByRole('textbox', { name: 'Novice description' }).fill('First timers')
  await expect(novice.getByRole('textbox', { name: 'Novice description' })).toHaveCSS('font-size', '16px')

  await page.getByRole('tab', { name: 'Preview' }).click()
  await expect(page.getByText('Registration & tech')).toBeVisible()
  await expect(page.getByText('Novice', { exact: true }).first()).toHaveCSS('background-color', hexToRgb(resolveTailwindBgColor('bg-rungreen-500')))
  // Nothing wider than the screen.
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)

  await page.getByRole('button', { name: 'Save schedule' }).click()
  await expect(page.getByText('Schedule saved')).toBeVisible()
  await expect(page).toHaveURL(new RegExp(`#/event/${upcoming.id}$`))
  await expect(page.getByText('Registration & tech')).toBeVisible()
  expect(body!.runGroups).toEqual([
    { label: 'Novice', bgClass: 'bg-rungreen-500', description: 'First timers' },
    { label: 'Intermediate', bgClass: 'bg-runorange-500' },
  ])
})
