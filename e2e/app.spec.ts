import type { Locator, Page } from '@playwright/test'
import { test, expect } from './fixtures'
import { TEST_EVENTS } from '../src/test/events'
import { RUN_GROUP_BG_CLASSES, RUN_GROUP_TEXT_CLASSES } from '../src/theme/runGroupColors'
import { resolveTailwindBgColor } from '../src/utils/eventsJson'
import { applySchedule } from '../src/utils/scheduleEditor'
import { editDetails } from '../netlify/lib/newEvent.mjs'
import { iosSpring } from '../src/utils/iosSpring'
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

// An event without a track icon gets the checkered flag (#263). A mask
// url() the browser can't parse is dropped to `none` — no error, just a
// blank tile — so check what the browser actually applied.
test('an event without a track icon shows the checkered flag', async ({ page }) => {
  await stubEvents(page)
  await page.goto(`/#/event/${upcoming.id}`)
  const placeholder = page.locator('[data-track-icon="placeholder"]').first()
  await expect(placeholder).toBeVisible()
  const mask = await placeholder.evaluate(el => {
    const style = getComputedStyle(el)
    return style.maskImage || style.getPropertyValue('-webkit-mask-image')
  })
  expect(mask).toContain('data:image/svg+xml')
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

// A pinch on the map zoomed the whole app, and it stayed zoomed after the
// map closed (#259). The map zooms itself now, and the page can't.
test('the full-screen track map zooms on its own, not the page', async ({ page }) => {
  await stubEvents(page)
  await page.goto(`/#/event/${alpha.id}`)
  await page.getByRole('tab', { name: 'Details' }).click()
  await page.getByRole('button', { name: 'Expand track map' }).click()

  const dialog = page.getByRole('dialog', { name: `${alpha.name} track map` })
  const map = dialog.getByRole('img', { name: `${alpha.name} track map` })
  await expect.poll(() => map.evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  // Covers the screen, and the browser leaves pinches on it to the app.
  const viewport = page.viewportSize()!
  expect(await dialog.boundingBox()).toEqual({ x: 0, y: 0, ...viewport })
  await expect(dialog).toHaveCSS('touch-action', 'none')

  const scale = () => map.evaluate(img => new DOMMatrix(getComputedStyle(img).transform).a)
  await map.dblclick()
  await expect.poll(scale).toBeCloseTo(2.5)
  await map.dblclick()
  await expect.poll(scale).toBe(1)

  // Two fingers spreading from 80px to 200px apart: 2.5×.
  const box = (await map.boundingBox())!
  const cx = box.x + box.width / 2
  const cy = box.y + box.height / 2
  await page.locator('[data-map-stage]').evaluate((stage, { cx, cy }) => {
    const fire = (type: string, pointerId: number, x: number) => {
      const target = type === 'pointerdown' ? document.elementFromPoint(x, cy)! : stage
      target.dispatchEvent(new PointerEvent(type, { pointerId, pointerType: 'touch', isPrimary: pointerId === 1, clientX: x, clientY: cy, bubbles: true }))
    }
    fire('pointerdown', 1, cx - 40)
    fire('pointerdown', 2, cx + 40)
    fire('pointermove', 1, cx - 100)
    fire('pointermove', 2, cx + 100)
    fire('pointerup', 1, cx - 100)
    fire('pointerup', 2, cx + 100)
  }, { cx, cy })
  expect(await scale()).toBeCloseTo(2.5)

  await page.getByRole('button', { name: 'Close map' }).click()
  await expect(dialog).toBeHidden()
  // Nothing left zoomed or scrolled sideways behind it.
  expect(await page.evaluate(() => window.visualViewport?.scale ?? 1)).toBe(1)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
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

// With past activities hidden and the day's last one over, the timeline
// would otherwise be blank — which reads as "nothing loaded" (#6).
test('says there are no more events today once they’ve all passed', async ({ page }) => {
  const today = isoInDays(0)
  const morning: EventConfig = {
    id: `${today}_morning-only`,
    name: 'Morning Only',
    runGroups: [],
    days: [{
      id: 'saturday', label: 'Saturday', date: today,
      activities: [
        { time: '08:00', type: 'general', label: 'Drivers meeting' },
        { time: '09:00', type: 'general', label: 'Track walk' },
      ],
    }],
  }
  await page.clock.setFixedTime(new Date(`${today}T22:00:00`))
  await stubEvents(page, [morning, ...TEST_EVENTS])
  await page.goto(`/#/event/${morning.id}`)
  await page.getByRole('switch').click()

  await expect(page.getByText('No more events today')).toBeVisible()
  await expect(page.getByText('Track walk')).not.toBeInViewport()
  // The now-line leads into the zero state instead of trailing after it.
  const lineBox = await page.locator('[data-time-indicator]').boundingBox()
  const textBox = await page.getByText('No more events today').boundingBox()
  expect(lineBox!.y).toBeLessThan(textBox!.y)
  const art = page.locator('img[src*="svg"]')
  await expect(art).toBeVisible()
  await expect.poll(() => art.evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
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

// A past event added without one (#373) won't get one now.
test('says "No schedule" for a past event with none', async ({ page }) => {
  const past: EventConfig = {
    ...upcoming,
    id: '2024-12-07_tde-at-msrc-1-7-cw',
    name: 'TDE at MSRC 1.7 CW',
    runGroups: [{ id: 'orange', label: 'Orange', bgClass: 'bg-runorange-500', textClass: 'text-white' }],
    days: [{ id: 'saturday', label: 'Saturday', date: '2024-12-07', activities: [] }],
  }
  await stubEvents(page, [past, ...TEST_EVENTS])
  await page.goto(`/#/event/${past.id}`)
  await expect(page.getByText('No schedule', { exact: true })).toBeVisible()
  await expect(page.getByText('None was posted for this event.')).toBeVisible()
  await expect(page.getByText('Schedule coming soon')).toHaveCount(0)
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
  await expect(page.getByText(/myhpde\.netlify\.app\/hpde-widget\.js/)).toBeVisible()
})

// Every share screen is the sheet a car is shared in (#411): up from the
// bottom of the screen, its title centered, the code to scan under it and
// the link under that.
async function expectShareSheet(page: Page, sheet: Locator) {
  const qr = sheet.getByRole('img', { name: 'Code to scan for the link' })
  const link = sheet.getByRole('button', { name: 'Copy link' })
  await expect(qr).toBeVisible()
  await expect(link).toBeVisible()
  // Settled where it slides up to.
  await expect.poll(async () => {
    const box = (await sheet.boundingBox())!
    return Math.round(box.y + box.height)
  }).toBe(page.viewportSize()!.height)
  const qrBox = (await qr.boundingBox())!
  const linkBox = (await link.boundingBox())!
  expect(qrBox.y + qrBox.height).toBeLessThan(linkBox.y)
  // The title is across the middle, over the code (#411).
  const titleBox = (await sheet.getByRole('heading', { level: 2 }).boundingBox())!
  const title = await sheet.getByRole('heading', { level: 2 }).evaluate(h => {
    const range = document.createRange()
    range.selectNodeContents(h)
    const { left, width } = range.getBoundingClientRect()
    return { center: left + width / 2 }
  })
  expect(titleBox.width).toBeGreaterThan(0)
  expect(Math.abs(title.center - (qrBox.x + qrBox.width / 2))).toBeLessThan(1)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
}

test('Share shares the live address with a QR code, in a sheet (#411)', async ({ page }) => {
  await stubEvents(page)
  await page.goto('/#/share')
  const sheet = page.getByRole('dialog', { name: 'Share this app' })
  await expect(sheet.getByRole('button', { name: 'Copy link' })).toContainText('https://myhpde.netlify.app/')
  await expectShareSheet(page, sheet)
})

test('Share slides up from its row on the More tab, over the tab (#278, #416)', async ({ page }) => {
  await stubEvents(page)
  await page.goto('/#/more')
  // The menu that held it beside the account button is gone (#416).
  await expect(page.getByRole('heading', { level: 1, name: 'More' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Menu' })).toHaveCount(0)
  await page.getByRole('list', { name: 'Share and widget' }).getByRole('link', { name: 'Share' }).click()
  const sheet = page.getByRole('dialog', { name: 'Share this app' })
  await expect(sheet.getByRole('button', { name: 'Copy link' })).toContainText('https://myhpde.netlify.app/')
  await expectShareSheet(page, sheet)
  await sheet.getByRole('button', { name: 'Close' }).click()
  await expect(sheet).toHaveCount(0)
  await expect(page).toHaveURL(/#\/more$/)
  await expect(page.getByRole('heading', { level: 1, name: 'More' })).toBeInViewport()
  // The build date is at the bottom (#395), not under the events list.
  await expect(page.getByText(/^build /)).toBeVisible()
  await page.getByRole('navigation', { name: 'Sections' }).getByRole('link', { name: 'Events' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'HPDE Events' })).toBeVisible()
  await expect(page.getByText(/^build /)).toHaveCount(0)
})

test('anyone can share an event’s own link from its menu (#273)', async ({ page }) => {
  await stubEvents(page)
  await page.goto(`/#/event/${upcoming.id}`)
  await page.getByRole('button', { name: 'More actions' }).click()
  await page.getByRole('menuitem', { name: 'Share' }).click()
  await expect(page).toHaveURL(new RegExp(`#/event/${upcoming.id}/share$`))
  const sheet = page.getByRole('dialog', { name: 'Share this event' })
  await expect(sheet.getByRole('button', { name: 'Copy link' })).toContainText(`https://myhpde.netlify.app/#/event/${upcoming.id}`)
  await expectShareSheet(page, sheet)
  await sheet.getByRole('button', { name: 'Close' }).click()
  await expect(page).toHaveURL(new RegExp(`#/event/${upcoming.id}$`))
  await expect(page.getByText('Schedule coming soon')).toBeInViewport()
})

// Signed in as an admin: a stand-in for the Netlify Identity widget, which
// the app uses when it's already on the page.
async function signInAsAdmin(page: Page) {
  await page.route('**/.netlify/identity/settings', route => route.fulfill({ json: {} }))
  // No answers yet (#235); a test about them routes its own.
  await page.route(/\/api\/rsvps(\?|$)/, route => route.fulfill({ json: { rsvps: {} } }))
  // No notes either (#340); a test about them routes its own.
  await page.route(/\/api\/notes(\?|$)/, route => route.fulfill({ json: { sessions: [] } }))
  // And an empty garage (#344).
  await page.route(/\/api\/garage(\?|$)/, route => route.fulfill({ json: { cars: [], events: {} } }))
  await page.addInitScript(() => {
    const user = { id: 'a', email: 'admin@example.com', app_metadata: { roles: ['admin'] }, jwt: async () => 'token' }
    ;(window as unknown as { netlifyIdentity: unknown }).netlifyIdentity = {
      init() {}, open() {}, close() {}, logout() {}, on() {}, currentUser: () => user,
    }
  })
}

// Follows the page that `open()` brings in, frame by frame, until it
// settles where it rests — the top of the screen, or a sheet's a little
// below it (#415): which way it moved.
async function trackSlide(page: Page, open: () => Promise<void>, heading: string) {
  const track = page.evaluate(heading => new Promise<{ fromBelow: boolean; fromSide: boolean }>(resolve => {
    let fromBelow = false
    let fromSide = false
    let still = 0
    let last = ''
    const step = () => {
      const h = [...document.querySelectorAll('h1')].find(el => el.textContent === heading)
      const page = h?.closest<HTMLElement>('.fixed')
      if (page) {
        const { top, left } = page.getBoundingClientRect()
        const rest = parseFloat(getComputedStyle(page).top)
        if (top > rest + 1) fromBelow = true
        if (left > 1) fromSide = true
        const at = `${top},${left}`
        still = at === last ? still + 1 : 0
        last = at
        if (still > 10 && top === rest && left === 0) return resolve({ fromBelow, fromSide })
      }
      requestAnimationFrame(step)
    }
    step()
  }), heading)
  await open()
  return track
}

test('an admin adds an event from beside the list/calendar toggle; the page slides up, and back down (#278, #279)', async ({ page }) => {
  await stubEvents(page)
  await signInAsAdmin(page)
  await page.goto('/#/')

  // In line with the toggle, not in a row of its own above the events.
  const add = page.getByRole('link', { name: 'Add event' })
  const toggle = page.getByRole('button', { name: 'List view' })
  const [addBox, toggleBox] = [await add.boundingBox(), await toggle.boundingBox()]
  expect(Math.abs((addBox!.y + addBox!.height / 2) - (toggleBox!.y + toggleBox!.height / 2))).toBeLessThan(2)
  await expect(add).toBeVisible()

  const slide = await trackSlide(page, () => add.click(), 'New event')
  expect(slide).toEqual({ fromBelow: true, fromSide: false })
  await expect(page.getByLabel('Title')).toBeInViewport()

  await page.getByRole('button', { name: 'Cancel' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'New event' })).toHaveCount(0)
  await expect(page).toHaveURL(/#\/$/)
  await expect(add).toBeInViewport()
})

test('the page under a pushed page doesn’t scroll while it’s open (#321)', async ({ page }) => {
  await stubEvents(page)
  await signInAsAdmin(page)
  await page.goto('/#/')
  const documentScrolls = () => page.evaluate(() =>
    [document.documentElement, document.body].every(el => getComputedStyle(el).overflowY !== 'hidden'))
  expect(await documentScrolls()).toBe(true)

  // New event slides up; a drag on it is its own, never the list's behind it.
  await page.getByRole('link', { name: 'Add event' }).click()
  const heading = page.getByRole('heading', { level: 1, name: 'New event' })
  await expect(heading).toBeInViewport()
  expect(await documentScrolls()).toBe(false)
  const scroller = heading.locator('xpath=ancestor::div[contains(@class, "fixed")][1]')
  expect(await scroller.evaluate(el => getComputedStyle(el).overscrollBehaviorY)).toBe('contain')
  await page.getByRole('button', { name: 'Cancel' }).click()
  await expect(heading).toHaveCount(0)
  expect(await documentScrolls()).toBe(true)

  // An event's page slides in from the side: the same, until it's closed.
  await page.getByRole('button', { name: new RegExp(alpha.name) }).click()
  await expect(page.getByRole('heading', { level: 1, name: alpha.name })).toBeInViewport()
  expect(await documentScrolls()).toBe(false)
  await page.getByRole('button', { name: 'Back' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'HPDE Events' })).toBeInViewport()
  await expect.poll(documentScrolls).toBe(true)
})

test('back from an event’s page, the list is still scrolled where it was (#389)', async ({ page }) => {
  // More events than fit on a phone, the last far down the list.
  const many: EventConfig[] = Array.from({ length: 20 }, (_, i) => ({
    ...upcoming,
    id: `${isoInDays(10 + i * 7)}_day-${i}`,
    name: `Track Day ${i}`,
    days: [{ ...upcoming.days[0], date: isoInDays(10 + i * 7) }],
  }))
  await stubEvents(page, many)
  await page.goto('/#/')
  const last = page.getByRole('button', { name: /Track Day 19/ })
  await last.scrollIntoViewIfNeeded()
  const scrolled = await page.evaluate(() => window.scrollY)
  expect(scrolled).toBeGreaterThan(0)
  const scrollY = () => page.evaluate(() => window.scrollY)

  // The Back button…
  await last.click()
  await expect(page.getByRole('heading', { level: 1, name: 'Track Day 19' })).toBeInViewport()
  await page.getByRole('button', { name: 'Back' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'Track Day 19' })).toHaveCount(0)
  expect(await scrollY()).toBe(scrolled)
  await expect(last).toBeInViewport()

  // …and the browser's back (a swipe back on iPhone).
  await last.click()
  await expect(page.getByRole('heading', { level: 1, name: 'Track Day 19' })).toBeInViewport()
  await page.goBack()
  await expect(page.getByRole('heading', { level: 1, name: 'Track Day 19' })).toHaveCount(0)
  expect(await scrollY()).toBe(scrolled)
  await expect(last).toBeInViewport()

  // Another tab starts at its top.
  await page.getByRole('navigation', { name: 'Sections' }).getByRole('link', { name: 'Tracks' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'Tracks' })).toBeVisible()
  expect(await scrollY()).toBe(0)
})

test('Share and the iOS widget slide up from the bottom, from the More tab (#278, #416)', async ({ page }) => {
  await stubEvents(page)
  await page.goto('/#/more')
  const links = page.getByRole('list', { name: 'Share and widget' })
  // Share, as a sheet (#411).
  await links.getByRole('link', { name: 'Share' }).click()
  const sheet = page.getByRole('dialog', { name: 'Share this app' })
  await expectShareSheet(page, sheet)
  await sheet.getByRole('button', { name: 'Close' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'More' })).toBeInViewport()
  // The iOS widget, as a page sheet with ✕ (#415).
  const slide = await trackSlide(page, () => links.getByRole('link', { name: 'iOS widget' }).click(), 'iOS widget')
  expect(slide).toEqual({ fromBelow: true, fromSide: false })
  const widget = page.getByRole('heading', { level: 1, name: 'iOS widget' }).locator('xpath=ancestor::div[contains(@class, "fixed")][1]')
  await expect.poll(async () => (await widget.boundingBox())?.y).toBe(18)
  await expect(widget).toHaveCSS('border-top-left-radius', '12px')
  await page.getByRole('link', { name: 'Close' }).click()
  await expect(page).toHaveURL(/#\/more$/)
  await expect(page.getByRole('heading', { level: 1, name: 'More' })).toBeInViewport()
})

// A real finger's drag, through Chromium's DevTools protocol: the browser
// scrolls for it, or doesn't, as it would on a phone.
async function touchDrag(page: Page, from: { x: number; y: number }, to: { x: number; y: number }, steps = 12) {
  const cdp = await page.context().newCDPSession(page)
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [from] })
  for (let i = 1; i <= steps; i++) {
    const x = from.x + ((to.x - from.x) * i) / steps
    const y = from.y + ((to.y - from.y) * i) / steps
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y }] })
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  await cdp.detach()
}

test('a sheet holds the page still behind it, and drags down by its handle to close (#432, #387)', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'Real touch drags need Chromium’s DevTools protocol')
  await stubEvents(page)
  await signInAsAdmin(page)
  // Short enough that the events list scrolls.
  await page.setViewportSize({ width: 412, height: 560 })
  await page.goto('/#/')
  await expect(page.getByRole('button', { name: 'Account: admin@example.com' })).toBeVisible()
  const scrollY = () => page.evaluate(() => window.scrollY)
  // Without a sheet, the same drag scrolls the page.
  await touchDrag(page, { x: 200, y: 450 }, { x: 200, y: 150 })
  await expect.poll(scrollY).toBeGreaterThan(0)
  await page.evaluate(() => window.scrollTo(0, 0))
  await expect.poll(scrollY).toBe(0)

  await page.getByRole('button', { name: 'Account: admin@example.com' }).click()
  const menu = page.getByRole('dialog', { name: 'Account' })
  await expect(menu).toBeVisible()
  // Wait for it to finish rising.
  await page.waitForTimeout(300)
  // A drag on the dimmed page, then one on the sheet: neither scrolls what's behind it (#432).
  await touchDrag(page, { x: 200, y: 150 }, { x: 200, y: 20 })
  await touchDrag(page, { x: 200, y: 520 }, { x: 200, y: 300 })
  await page.waitForTimeout(300)
  expect(await scrollY()).toBe(0)
  await expect(menu).toBeVisible()

  // Pulled down a little by its handle, it springs back (#387).
  const handle = (await menu.locator('[data-sheet-handle]').boundingBox())!
  const grab = { x: handle.x + handle.width / 2, y: handle.y + handle.height / 2 }
  const top = (await menu.boundingBox())!.y
  await touchDrag(page, grab, { x: grab.x, y: grab.y + 30 }, 30)
  await expect.poll(async () => (await menu.boundingBox())!.y).toBe(top)
  // Pulled most of the way, it goes.
  await touchDrag(page, grab, { x: grab.x, y: grab.y + 260 })
  await expect(menu).toHaveCount(0)
  await expect(page.getByRole('heading', { level: 1, name: 'HPDE Events' })).toBeInViewport()
  expect(await page.evaluate(() => document.documentElement.classList.contains('bottom-sheet-open'))).toBe(false)
})

test('a page sheet with Cancel drags down by its toolbar to close, as Cancel does (#387)', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'Real touch drags need Chromium’s DevTools protocol')
  await stubEvents(page)
  await signInAsAdmin(page)
  await page.goto('/#/')
  await page.getByRole('button', { name: 'Account: admin@example.com' }).click()
  await page.getByRole('dialog', { name: 'Account' }).getByRole('button', { name: 'Edit profile' }).click()
  const edit = page.getByRole('dialog', { name: 'Edit profile' })
  const sheet = edit.getByRole('heading', { level: 1, name: 'Edit profile' }).locator('xpath=ancestor::div[contains(@class, "fixed")][1]')
  await expect.poll(async () => (await sheet.boundingBox())?.y).toBe(18)
  const title = (await edit.getByRole('heading', { level: 1, name: 'Edit profile' }).boundingBox())!
  const grab = { x: title.x + title.width / 2, y: title.y + title.height / 2 }
  // A short pull springs back…
  await touchDrag(page, grab, { x: grab.x, y: grab.y + 40 }, 30)
  await expect.poll(async () => (await sheet.boundingBox())?.y).toBe(18)
  await expect(edit).toBeVisible()
  // …a long one closes it, and it slides away.
  await touchDrag(page, grab, { x: grab.x, y: grab.y + 400 })
  await expect(edit).toHaveCount(0)
  await expect(page.getByRole('heading', { level: 1, name: 'HPDE Events' })).toBeInViewport()
})

test('the account menu slides up from the picture, and Edit profile is a page sheet (#416)', async ({ page }) => {
  await stubEvents(page)
  await signInAsAdmin(page)
  await page.goto('/#/')
  await page.getByRole('button', { name: 'Account: admin@example.com' }).click()
  const menu = page.getByRole('dialog', { name: 'Account' })
  await expect(menu).toContainText('admin@example.com')
  await expect(menu.getByRole('button')).toHaveText(['Edit profile', /^Switch driver/, 'Log out'])
  const slide = await trackSlide(page, () => menu.getByRole('button', { name: 'Edit profile' }).click(), 'Edit profile')
  expect(slide).toEqual({ fromBelow: true, fromSide: false })
  await expect(menu).toHaveCount(0)
  const edit = page.getByRole('dialog', { name: 'Edit profile' })
  const sheet = edit.getByRole('heading', { level: 1, name: 'Edit profile' }).locator('xpath=ancestor::div[contains(@class, "fixed")][1]')
  await expect.poll(async () => (await sheet.boundingBox())?.y).toBe(18)
  await expect(sheet).toHaveCSS('border-top-left-radius', '12px')
  await expect(edit.getByRole('button', { name: 'Save' })).toBeDisabled()
  await edit.getByRole('textbox', { name: 'Name' }).fill('Amy Admin')
  await expect(edit.getByRole('button', { name: 'Save' })).toBeEnabled()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await edit.getByRole('button', { name: 'Cancel' }).click()
  await expect(edit).toHaveCount(0)
  await expect(page.getByRole('heading', { level: 1, name: 'HPDE Events' })).toBeInViewport()
})

// Safari's word for a history move it has slid across the screen itself:
// an iOS swipe back or forward. `swipe()` makes the next move say so.
async function stubSwipes(page: Page) {
  await page.addInitScript(() => {
    let swiping = false
    Object.defineProperty(PopStateEvent.prototype, 'hasUAVisualTransition', { configurable: true, get: () => swiping })
    Object.assign(window, {
      swipe(direction: 'back' | 'forward') {
        swiping = true
        addEventListener('hashchange', () => { swiping = false }, { once: true })
        history[direction]()
      },
    })
  })
}

function swipe(page: Page, direction: 'back' | 'forward') {
  return page.evaluate(direction => (window as unknown as { swipe(d: string): void }).swipe(direction), direction)
}

// Follows the page with this heading, frame by frame, through the history
// move `move()` makes, until it's settled: whether it was ever seen partway
// across the screen — sliding.
async function seenSliding(page: Page, move: () => Promise<unknown>, heading: string) {
  const track = page.evaluate(heading => new Promise<boolean>(resolve => {
    const from = location.hash
    let sliding = false
    let still = 0
    let last: number | undefined
    const step = () => {
      const h = [...document.querySelectorAll('h1')].find(el => el.textContent === heading)
      const left = h?.closest<HTMLElement>('.fixed')?.getBoundingClientRect().left
      if (left !== undefined && left > 1 && left < innerWidth - 1) sliding = true
      still = left === last ? still + 1 : 0
      last = left
      if (location.hash !== from && still > 10) return resolve(sliding)
      requestAnimationFrame(step)
    }
    step()
  }), heading)
  await move()
  return track
}

test('a page iOS has swiped away, or back, doesn’t slide across again after it (#355)', async ({ page }) => {
  await stubEvents(page)
  await signInAsAdmin(page)
  await stubSwipes(page)
  for (const [start, opener, heading] of [
    ['/#/more', page.getByRole('link', { name: /^Instructor evaluations/ }), 'Instructor evaluations'],
    ['/#/', page.getByRole('button', { name: new RegExp(alpha.name) }), alpha.name],
  ] as const) {
    await page.goto(start)
    const slide = await trackSlide(page, () => opener.click(), heading)
    expect(slide).toEqual({ fromBelow: false, fromSide: true })

    // Swiped back: gone, not slid out over the page under it.
    expect(await seenSliding(page, () => swipe(page, 'back'), heading)).toBe(false)
    await expect(page.getByRole('heading', { level: 1, name: heading })).toHaveCount(0)
    await expect(opener).toBeInViewport()

    // Swiped forward: in place, not slid in again.
    expect(await seenSliding(page, () => swipe(page, 'forward'), heading)).toBe(false)
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeInViewport()

    // Back any other way — the browser's button — still slides it out.
    expect(await seenSliding(page, () => page.evaluate(() => history.back()), heading)).toBe(true)
    await expect(page.getByRole('heading', { level: 1, name: heading })).toHaveCount(0)
  }
})

// The page with this heading, caught as its slide starts and held — with
// everything that started moving with it — `at` each of these many ms into
// it: how far it has still to go, as a share of the screen it crosses; where
// the tab bar under it is, as a share of the screen; how dark it makes
// what's under it; and whether that's still kept from scrolling.
async function slideAt(page: Page, move: () => Promise<unknown>, heading: string, at: number[]) {
  const caught = page.evaluate(({ heading, at }) => new Promise<{ x: number; y: number; tabs: number; dim: number | null; locked: boolean }[]>(resolve => {
    addEventListener('transitionrun', function onRun(e) {
      const el = e.target as HTMLElement
      if (e.propertyName !== 'transform' || !el.classList.contains('fixed')) return
      if (![...el.querySelectorAll('h1')].some(h => h.textContent === heading)) return
      removeEventListener('transitionrun', onRun, true)
      const moving = document.getAnimations()
      moving.forEach(a => a.pause())
      const tabBar = document.querySelector('nav[aria-label="Sections"]')!
      const dim = el.previousElementSibling?.matches('[data-covering-dim], [data-sheet-dim]') ? el.previousElementSibling : null
      // A sheet rests a little below the top of the screen (#415).
      const rest = parseFloat(getComputedStyle(el).top)
      const seen = at.map(ms => {
        moving.forEach(a => { a.currentTime = ms })
        const { left, top } = el.getBoundingClientRect()
        return {
          x: left / innerWidth,
          y: (top - rest) / (innerHeight - rest),
          tabs: tabBar.getBoundingClientRect().left / innerWidth,
          dim: dim && Number(getComputedStyle(dim).opacity),
          locked: document.documentElement.classList.contains('push-page-open'),
        }
      })
      moving.forEach(a => a.play())
      resolve(seen)
    }, true)
  }), { heading, at })
  await move()
  return caught
}

test('pages slide in and out, and up, with iOS’s own spring, the tabs a third as far under them; the page under stays still until one has slid out (#367)', async ({ page }) => {
  await stubEvents(page)
  await signInAsAdmin(page)
  await page.goto('/#/')
  const along = (ms: number) => iosSpring(ms)

  // Pushed: from the right, halfway 0.1 s in, as on iOS — and the tabs
  // slide a third as far left, darkening, as it covers them.
  const pushed = await slideAt(page, () => page.getByRole('button', { name: new RegExp(alpha.name) }).click(), alpha.name, [100, 200])
  expect(pushed.map(p => p.x)).toEqual([expect.closeTo(1 - along(100), 2), expect.closeTo(1 - along(200), 2)])
  expect(pushed.map(p => p.tabs)).toEqual([expect.closeTo(-0.3 * along(100), 2), expect.closeTo(-0.3 * along(200), 2)])
  expect(pushed.map(p => p.dim)).toEqual([expect.closeTo(0.1 * along(100), 2), expect.closeTo(0.1 * along(200), 2)])
  await expect(page.getByRole('heading', { level: 1, name: alpha.name })).toBeInViewport()

  // Back: out to the right, just as fast, and the tabs back with it; the
  // list stays still till it's gone.
  const popped = await slideAt(page, () => page.getByRole('button', { name: 'Back' }).click(), alpha.name, [100, 200])
  expect(popped.map(p => p.x)).toEqual([expect.closeTo(along(100), 2), expect.closeTo(along(200), 2)])
  expect(popped.map(p => p.tabs)).toEqual([expect.closeTo(-0.3 * (1 - along(100)), 2), expect.closeTo(-0.3 * (1 - along(200)), 2)])
  expect(popped.map(p => p.dim)).toEqual([expect.closeTo(0.1 * (1 - along(100)), 2), expect.closeTo(0.1 * (1 - along(200)), 2)])
  expect(popped.every(p => p.locked)).toBe(true)
  await expect(page.getByRole('heading', { level: 1, name: alpha.name })).toHaveCount(0)
  await expect.poll(() => page.evaluate(() => document.documentElement.classList.contains('push-page-open'))).toBe(false)
  await expect.poll(async () => (await page.getByRole('navigation', { name: 'Sections' }).boundingBox())?.x).toBe(0)

  // A page with Cancel: a sheet, up from the bottom on the same spring, as
  // the tabs shrink back to 92% under it, darkening (#415).
  const up = await slideAt(page, () => page.getByRole('link', { name: 'Add event' }).click(), 'New event', [100])
  expect(up.map(p => p.y)).toEqual([expect.closeTo(1 - along(100), 2)])
  expect(up.map(p => [p.tabs, p.dim])).toEqual([[expect.closeTo(0.04 * along(100), 2), expect.closeTo(0.12 * along(100), 2)]])
})

// What the page it's on, and its own page sheet, look like once a sheet
// has come up (#415), as on iOS: what's under it shrunk back into a dimmed
// card on black, its top edge showing above the sheet; the sheet with round
// top corners, and iOS's 17 pt Cancel, title and Save.
test('a page with Cancel and Save is a sheet over a card of the page it covers (#415)', async ({ page }) => {
  await stubEvents(page)
  await signInAsAdmin(page)
  await page.goto(`/#/event/${upcoming.id}`)
  const eventPage = page.getByRole('heading', { level: 1, name: upcoming.name }).locator('xpath=ancestor::div[contains(@class, "fixed")][1]')
  const tabs = page.locator('.tab-fade').first()
  const html = page.locator('html')
  await page.getByRole('link', { name: 'Add schedule' }).click()
  const sheet = page.getByRole('heading', { level: 1, name: 'Edit schedule' }).locator('xpath=ancestor::div[contains(@class, "fixed")][1]')

  // 18 px from the top, the card 8 px, 92% as wide and centered.
  await expect.poll(async () => (await sheet.boundingBox())?.y).toBe(18)
  const width = page.viewportSize()!.width
  await expect.poll(async () => {
    const box = (await eventPage.boundingBox())!
    return [box.y, box.x, box.width].map(n => Math.round(n * 10) / 10)
  }).toEqual([8, Math.round(width * 0.04 * 10) / 10, Math.round(width * 0.92 * 10) / 10])
  await expect(sheet).toHaveCSS('border-top-left-radius', '12px')
  await expect(eventPage).not.toHaveCSS('border-top-left-radius', '0px')
  await expect(page.locator('[data-sheet-dim]')).toHaveCSS('opacity', '0.12')
  await expect(html).toHaveCSS('background-color', 'rgb(0, 0, 0)')
  // The tabs, out of sight under the event's page, stay out of sight at
  // its card's corners.
  await expect(tabs).toHaveCSS('visibility', 'hidden')
  for (const name of ['Cancel', 'Save']) {
    await expect(sheet.getByRole('button', { name })).toHaveCSS('font-size', '17px')
  }
  await expect(sheet.getByRole('heading', { level: 1 })).toHaveCSS('font-size', '17px')

  // Taps above the sheet don't reach the page under it.
  await page.mouse.click(width / 2, 12)
  await expect(sheet).toBeInViewport()

  // Cancel: down it goes, and the event's page is itself again.
  await sheet.getByRole('button', { name: 'Cancel' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'Edit schedule' })).toHaveCount(0)
  await expect.poll(async () => await eventPage.boundingBox()).toEqual({ x: 0, y: 0, width, height: page.viewportSize()!.height })
  await expect(eventPage).toHaveCSS('border-top-left-radius', '0px')
  await expect(tabs).toHaveCSS('visibility', 'visible')
  await expect(html).not.toHaveClass(/page-sheet/)
})

// An event's page opened from a track (or car) page goes over it, above
// the other pages (#274); its Edit details went under it, out of sight.
test('Edit details comes up over an event’s page opened from a track page (#415)', async ({ page }) => {
  await stubEvents(page)
  await signInAsAdmin(page)
  await page.goto('/#/track/msrc-2-0-cw')
  await expect(page.getByRole('heading', { level: 1, name: 'MSRC 2.0 CW' })).toBeVisible()
  await page.evaluate(id => { location.hash = `#/event/${id}` }, alpha.id)
  await expect(page.getByRole('heading', { level: 1, name: alpha.name })).toBeInViewport()
  await page.getByRole('button', { name: 'More actions' }).click()
  await page.getByRole('menuitem', { name: 'Edit details' }).click()
  const sheet = page.getByRole('heading', { level: 1, name: 'Edit details' }).locator('xpath=ancestor::div[contains(@class, "fixed")][1]')
  await expect.poll(async () => (await sheet.boundingBox())?.y).toBe(18)
  // On top, where a tap lands.
  const cancel = sheet.getByRole('button', { name: 'Cancel' })
  const box = (await cancel.boundingBox())!
  expect(await page.evaluate(([x, y]) => document.elementFromPoint(x, y)?.textContent, [box.x + box.width / 2, box.y + box.height / 2])).toBe('Cancel')
  await cancel.click()
  await expect(page.getByRole('heading', { level: 1, name: 'Edit details' })).toHaveCount(0)
  await expect(page.getByRole('heading', { level: 1, name: alpha.name })).toBeInViewport()
})

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
  // The header's icon buttons match: no background or border at rest…
  const more = page.getByRole('button', { name: 'More actions' })
  for (const button of [page.getByRole('button', { name: 'Back' }), more]) {
    await expect(button).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
    await expect(button).toHaveCSS('border-top-width', '0px')
  }
  // …and "…" shows its circle while its menu is open.
  await more.click()
  await expect(more).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  await page.keyboard.press('Escape')

  // Up from the bottom, over the event's page (#368).
  const slide = await trackSlide(page, () => page.getByRole('link', { name: 'Add schedule' }).click(), 'Edit schedule')
  expect(slide).toEqual({ fromBelow: true, fromSide: false })
  const textarea = page.getByRole('textbox', { name: 'Schedule' })
  await expect(textarea).toHaveValue(new RegExp(`## ${upcoming.days[0].label} \\| ${upcoming.days[0].date}`))
  // 16px, or iOS zooms the page in when a field is tapped.
  await expect(textarea).toHaveCSS('font-size', '16px')

  // Uncomment the examples, the way it's meant to be used on a phone, with
  // a typo to fix.
  const text = (await textarea.inputValue()).replace(/\/\/ (\d{1,2}:\d\d|break)/g, '$1')
  await textarea.fill(text.replace('7:00 AM general', '7:00 general'))
  await expect(page.getByRole('list', { name: 'Problems' })).toContainText('“7:00” needs AM or PM')
  await expect(page.getByRole('button', { name: 'Save' })).toBeDisabled()
  await textarea.fill(text)
  await expect(page.getByRole('list', { name: 'Problems' })).toHaveCount(0)

  // The groups the sessions name, below the schedule, colored.
  const groups = page.getByRole('region', { name: 'Run groups' })
  await expect(groups.getByRole('listitem')).toHaveText([/Novice/, /Intermediate/])
  const novice = groups.getByRole('listitem', { name: 'Novice' })
  await novice.getByRole('button', { name: 'Novice' }).click()
  await novice.getByRole('radio', { name: 'Green' }).check()
  await novice.getByRole('textbox', { name: 'Novice description' }).fill('First timers')
  await expect(novice.getByRole('textbox', { name: 'Novice description' })).toHaveCSS('font-size', '16px')

  // Scrolled all the way down, the toolbar and the Edit / Preview tabs are still on screen.
  const scrollRoot = page.getByRole('heading', { level: 1, name: 'Edit schedule' }).locator('xpath=ancestor::div[contains(@class, "fixed")][1]')
  await scrollRoot.evaluate(el => el.scrollTo(0, el.scrollHeight))
  await expect.poll(() => scrollRoot.evaluate(el => el.scrollTop)).toBeGreaterThan(0)
  await expect(page.getByRole('tab', { name: 'Preview' })).toBeInViewport()
  await expect(page.getByRole('button', { name: 'Save' })).toBeInViewport()
  // …the tabs just under the toolbar, not behind it.
  const [bar, tabs] = [await page.getByRole('button', { name: 'Save' }).boundingBox(), await page.getByRole('tablist', { name: 'Editor view' }).boundingBox()]
  expect(tabs!.y).toBeGreaterThanOrEqual(bar!.y + bar!.height)
  // Nothing wider than the screen.
  expect(await scrollRoot.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true)

  await page.getByRole('tab', { name: 'Preview' }).click()
  await expect(page.getByText('Registration & tech')).toBeVisible()
  await expect(page.getByText('Novice', { exact: true }).first()).toHaveCSS('background-color', hexToRgb(resolveTailwindBgColor('bg-rungreen-500')))
  expect(await scrollRoot.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true)

  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByText('Schedule saved')).toBeVisible()
  await expect(page).toHaveURL(new RegExp(`#/event/${upcoming.id}$`))
  // The event's page, under the editor as it slides back down, has the new schedule.
  await expect(page.getByRole('tabpanel', { name: 'Schedule' }).getByText('Registration & tech')).toBeVisible()
  await expect(page.getByRole('heading', { level: 1, name: 'Edit schedule' })).toHaveCount(0)
  expect(body!.runGroups).toEqual([
    { label: 'Novice', bgClass: 'bg-rungreen-500', description: 'First timers' },
    { label: 'Intermediate', bgClass: 'bg-runorange-500' },
  ])
})

test('an admin edits an event’s details: renamed and a day added (#232)', async ({ page }) => {
  await stubEvents(page)
  await signInAsAdmin(page)
  let details: Record<string, string> | null = null
  await page.route(`**/api/events?id=${upcoming.id}`, async route => {
    expect(route.request().method()).toBe('PUT')
    expect(route.request().headers().authorization).toBe('Bearer token')
    details = route.request().postDataJSON().details
    const result = editDetails(upcoming, details)
    await route.fulfill(result.error ? { status: 400, json: result } : { json: { event: result.event } })
  })

  await page.goto(`/#/event/${upcoming.id}`)
  // Up from the bottom, over the event's page, and Cancel takes it back down (#368).
  await page.getByRole('button', { name: 'More actions' }).click()
  let slide = await trackSlide(page, () => page.getByRole('menuitem', { name: 'Edit details' }).click(), 'Edit details')
  expect(slide).toEqual({ fromBelow: true, fromSide: false })
  await page.getByRole('button', { name: 'Cancel' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'Edit details' })).toHaveCount(0)
  await expect(page).toHaveURL(new RegExp(`#/event/${upcoming.id}$`))

  await page.getByRole('button', { name: 'More actions' }).click()
  slide = await trackSlide(page, () => page.getByRole('menuitem', { name: 'Edit details' }).click(), 'Edit details')
  expect(slide).toEqual({ fromBelow: true, fromSide: false })
  const title = page.getByLabel('Title')
  await expect(title).toHaveValue('Upcoming Track Day')
  await expect(page.getByLabel('Location')).toHaveValue('Charlie Raceway')
  const save = page.getByRole('button', { name: 'Save' })
  await expect(save).toBeDisabled()

  await title.fill('Upcoming Track Weekend')
  await page.getByLabel('End date').fill(isoInDays(11))
  // Nothing on the page wider than the phone.
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await save.click()

  await expect(page).toHaveURL(new RegExp(`#/event/${upcoming.id}$`))
  await expect(page.getByRole('status')).toHaveText('Details saved')
  await expect(page.getByRole('heading', { name: /Upcoming Track Weekend/ })).toBeVisible()
  expect(details).toMatchObject({ name: 'Upcoming Track Weekend', startDate: isoInDays(10), endDate: isoInDays(11), track: 'Charlie Raceway' })
})

test('a driver logs a session’s lap times from spreadsheet rows, and sees them on My notes (#210)', async ({ page }) => {
  await stubEvents(page)
  await signInAsAdmin(page)
  let sessions: { key: string }[] = []
  await page.route(/\/api\/laps(\?|$)/, async route => {
    const req = route.request()
    expect(req.headers().authorization).toBe('Bearer token')
    // The summary across events, for the best on this layout.
    if (!new URL(req.url()).searchParams.has('event')) return route.fulfill({ json: { events: [] } })
    expect(new URL(req.url()).searchParams.get('event')).toBe(alpha.id)
    if (req.method() === 'PUT') {
      const { session } = req.postDataJSON()
      const saved = { ...session, key: `${session.date} ${session.time} ${session.group}` }
      sessions = [saved]
      return route.fulfill({ json: { session: saved } })
    }
    return route.fulfill({ json: { sessions } })
  })

  await page.goto(`/#/event/${alpha.id}`)
  await page.getByRole('button', { name: 'Lap times: 8:30 AM, Blue' }).click()
  const menu = page.getByRole('dialog', { name: '8:30 AM · Blue' })
  await expect(menu).toBeVisible()
  // It opens on what the session can have (#205).
  await menu.getByRole('navigation', { name: 'Session info' }).getByRole('button', { name: /^Lap times/ }).click()
  // It slides up as a page sheet, as the list slides away (#388).
  const sheet = page.getByRole('dialog', { name: /^Lap times, / })
  // A sheet along the bottom of the screen, as wide as the phone at most.
  const viewport = page.viewportSize()!
  await expect.poll(async () => {
    const box = (await sheet.boundingBox())!
    return Math.round(box.y + box.height)
  }).toBe(viewport.height)
  // Headed by Cancel, Lap times and Save, edge to edge across it (#388).
  const toolbar = sheet.locator('[data-sheet-grab]').filter({ has: page.getByRole('heading', { name: 'Lap times' }) })
  await expect(toolbar.getByRole('button')).toHaveText(['Cancel', 'Save'])
  const [sheetBox, toolbarBox] = [(await sheet.boundingBox())!, (await toolbar.boundingBox())!]
  expect(Math.round(toolbarBox.x)).toBe(Math.round(sheetBox.x))
  expect(Math.round(toolbarBox.width)).toBe(Math.round(sheetBox.width))

  // Every column, top and average speed too (#298): the widest a table gets.
  await sheet.getByLabel('Lap times or timestamps').fill([
    'Lap\tStart Crossing\tFinish Crossing\tLap Time\tTop mph\tAvg mph\tNotes',
    'Out\t8:31:02 AM\t8:33:20 AM\t2:18\t88.4\t55.1\tCold tires',
    '1\t8:33:20 AM\t8:35:12 AM\t1:52\t101.9\t68.2\t',
    '2\t8:35:12 AM\t8:36:58 AM\t1:46\t103.9\t70.8\tClean lap',
  ].join('\n'))
  const read = sheet.getByRole('region', { name: 'Laps read' })
  // The laps that count, then their figures (#324): average and best lap,
  // then average and top speed (#298), from the laps that count.
  await expect(read).toContainText('Laps & speeds · 2 laps')
  await expect(read.getByLabel('Session figures').locator('tbody').getByRole('cell')).toHaveText(['1:49.0', '1:46', '69.5 mph', '103.9 mph'])
  await expect(read.getByRole('row', { name: /^2 / })).toContainText('Clean lap')
  await expect(read.getByRole('row', { name: /^2 / }).locator('[data-speed]')).toHaveText(['103.9', '70.8'])
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await sheet.getByRole('button', { name: 'Save', exact: true }).click()

  await expect(sheet).toBeHidden()
  await expect(page.getByRole('status')).toHaveText('Lap times saved')
  await expect(page.getByRole('button', { name: 'Lap times: 8:30 AM, Blue (saved)' })).toBeVisible()

  await page.getByRole('tab', { name: 'My notes (1)' }).click()
  const card = page.getByRole('region', { name: 'Session 1, 8:30 AM' })
  // A compact table (#324): average and best lap, then average and top speed.
  await expect(card).toContainText('Laps & speeds · 2 laps')
  await expect(card.getByLabel('Session figures').locator('tbody').getByRole('cell')).toHaveText(['1:49.0', '1:46', '69.5 mph', '103.9 mph'])
  // Tapping anywhere on the figures opens the laps (the toggle covers them).
  // Below the chart on a phone, so scrolled to first, as a thumb would.
  const firstFigure = card.getByLabel('Session figures').locator('tbody').getByRole('cell').first()
  await firstFigure.scrollIntoViewIfNeeded()
  const figure = (await firstFigure.boundingBox())!
  await page.mouse.click(figure.x + 4, figure.y + 4)
  await expect(card.getByRole('button', { name: 'Hide laps for Session 1' })).toHaveAttribute('aria-expanded', 'true')
  await expect(card.getByRole('row', { name: /^2 / })).toContainText('Clean lap')
  await expect(page.getByRole('group', { name: 'Best lap this event' })).toContainText('1:46')
  // …and a chart of each session's best and average (#274), here just the one.
  await expect(page.getByRole('group', { name: /^Best and average lap in each session/ })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})

// With laps, they drove it (#377): saving them answers "Did you drive?",
// in the session's group, and the header says so straight away.
// Whether what `selector` finds moves down before it goes (#388): a sheet
// sliding away, not vanishing. Watches from now; `act` starts it going.
async function slidAway(page: Page, selector: string, act: () => Promise<unknown>) {
  const watch = page.evaluate(selector => new Promise<boolean>(resolve => {
    const el = document.querySelector(selector)!
    const start = el.getBoundingClientRect().top
    let moved = false
    const step = () => {
      if (!el.isConnected) return resolve(moved)
      if (el.getBoundingClientRect().top > start + 20) moved = true
      requestAnimationFrame(step)
    }
    step()
  }), selector)
  await act()
  return watch
}

// Whether what `selector` finds, once there, rises into place from lower down.
function risesInto(page: Page, selector: string) {
  return page.evaluate(selector => new Promise<boolean>(resolve => {
    let first: number | undefined
    let last: number | undefined
    let still = 0
    const step = () => {
      const top = document.querySelector(selector)?.getBoundingClientRect().top
      if (top !== undefined) {
        first ??= top
        still = top === last ? still + 1 : 0
        last = top
        if (still > 10) return resolve(first > top + 20)
      }
      requestAnimationFrame(step)
    }
    step()
  }), selector)
}

test('a session’s sheet slides down as what’s picked from it slides up, and back up on Cancel; ✕ slides it away (#388)', async ({ page }) => {
  await stubEvents(page)
  await signInAsAdmin(page)
  await page.route(/\/api\/laps(\?|$)/, route => route.fulfill({
    json: new URL(route.request().url()).searchParams.has('event') ? { sessions: [] } : { events: [] },
  }))
  await page.goto(`/#/event/${alpha.id}`)
  const list = '[data-lap-sheet] [role="dialog"]'
  const opened = risesInto(page, list)
  await page.getByRole('button', { name: 'Lap times: 8:30 AM, Blue' }).click()
  expect(await opened).toBe(true)
  const menu = page.getByRole('dialog', { name: '8:30 AM · Blue', exact: true })

  // Picked: the list slides down as its page slides up.
  const up = trackSlide(page, () => Promise.resolve(), 'Instructor feedback')
  expect(await slidAway(page, list, () => menu.getByRole('button', { name: /^Instructor feedback/ }).click())).toBe(true)
  expect(await up).toEqual({ fromBelow: true, fromSide: false })
  const sheet = page.getByRole('dialog', { name: 'Instructor feedback, 8:30 AM · Blue' })
  await expect(menu).toHaveCount(0)
  // A page sheet, all the way to the bottom of the screen.
  const box = (await sheet.boundingBox())!
  expect(Math.round(box.y + box.height)).toBeGreaterThanOrEqual(page.viewportSize()!.height)

  // Cancel: it slides down, and the list back up.
  const back = risesInto(page, list)
  expect(await slidAway(page, '[data-lap-page]', () => sheet.getByRole('button', { name: 'Cancel' }).click())).toBe(true)
  expect(await back).toBe(true)
  await expect(menu).toBeVisible()

  // ✕ slides it down and away.
  expect(await slidAway(page, list, () => menu.getByRole('button', { name: 'Close' }).click())).toBe(true)
  await expect(page.getByRole('dialog')).toHaveCount(0)
})

test('saving lap times at a past event answers "I drove", in the session’s group (#377)', async ({ page }) => {
  const past: EventConfig = {
    id: '2025-10-04_past-track-day',
    name: 'Past Track Day',
    track: 'Charlie Raceway',
    runGroups: [{ id: 'blue', label: 'Blue', bgClass: 'bg-runblue-500', textClass: 'text-white' }],
    days: [{ id: 'saturday', label: 'Saturday', date: '2025-10-04', activities: [{ time: '08:30', type: 'session', sessionNumber: 1, onTrack: ['blue'] }] }],
  }
  await stubEvents(page, [past, ...TEST_EVENTS])
  await signInAsAdmin(page)
  await page.route(/\/api\/laps(\?|$)/, async route => {
    const req = route.request()
    if (!new URL(req.url()).searchParams.has('event')) return route.fulfill({ json: { events: [] } })
    if (req.method() === 'PUT') {
      const { session } = req.postDataJSON()
      const saved = { ...session, key: `${session.date} ${session.time} ${session.group}` }
      return route.fulfill({ json: { session: saved, rsvp: { status: 'going', runGroup: session.group, updatedAt: '2026-10-02T00:00:00.000Z' } } })
    }
    return route.fulfill({ json: { sessions: [] } })
  })

  await page.goto(`/#/event/${past.id}`)
  await expect(page.getByRole('button', { name: 'Did you drive?' })).toBeVisible()
  await page.getByRole('button', { name: 'Lap times: 8:30 AM, Blue' }).click()
  const menu = page.getByRole('dialog', { name: /8:30 AM · Blue/ })
  await menu.getByRole('navigation', { name: 'Session info' }).getByRole('button', { name: /^Lap times/ }).click()
  // It slides up as a page sheet, as the list slides away (#388).
  const sheet = page.getByRole('dialog', { name: /^Lap times, / })
  await sheet.getByLabel('Lap times or timestamps').fill(['1:52', '1:46'].join('\n'))
  await sheet.getByRole('button', { name: 'Save', exact: true }).click()
  await expect(page.getByRole('status')).toHaveText('Lap times saved')
  await expect(page.getByRole('button', { name: 'Did you drive?' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Drove Blue' })).toBeVisible()
})

test('a finger scrolling the page over the lap chart leaves its readout shut; a tap or a sideways scrub opens it (#332)', async ({ page }) => {
  await stubEvents(page)
  await signInAsAdmin(page)
  const sessions = [
    { key: '2026-03-07 08:00 red', date: '2026-03-07', time: '08:00', group: 'red', sessionNumber: 1, laps: [{ ms: 106_000 }, { ms: 104_000 }] },
    { key: '2026-03-07 08:30 blue', date: '2026-03-07', time: '08:30', group: 'blue', sessionNumber: 1, laps: [{ ms: 103_000 }, { ms: 105_000 }] },
  ]
  await page.route(/\/api\/laps(\?|$)/, route => route.fulfill({
    json: new URL(route.request().url()).searchParams.has('event') ? { sessions } : { events: [] },
  }))
  await page.goto(`/#/event/${alpha.id}`)
  await page.getByRole('tab', { name: 'My notes (2)' }).click()
  const chart = page.getByRole('group', { name: /^Best and average lap in each session/ })
  const readout = chart.getByRole('status')
  await chart.scrollIntoViewIfNeeded()
  const box = (await chart.boundingBox())!
  // What a browser sends for a finger at (x, y) from the chart's corner.
  const touch = (type: string, x: number, y: number) =>
    chart.dispatchEvent(type, { pointerType: 'touch', pointerId: 7, isPrimary: true, clientX: box.x + x, clientY: box.y + y })
  const left = 50
  const right = box.width - 50
  const middle = box.height / 2

  // A thumb comes down on the chart and scrolls the page: the browser takes
  // the gesture over and cancels the pointer.
  await touch('pointerdown', right, middle)
  await touch('pointermove', right, middle - 4)
  await touch('pointercancel', right, middle - 4)
  await expect(readout).toBeEmpty()

  // A tap opens the session under it.
  await touch('pointerdown', right, middle)
  await touch('pointerup', right, middle)
  await expect(readout).toContainText('8:30 AM · Blue')

  // Scrubbing sideways moves it along.
  await touch('pointerdown', right, middle)
  await touch('pointermove', left, middle + 3)
  await expect(readout).toContainText('8:00 AM · Red')
  await touch('pointerup', left, middle + 3)
  await expect(readout).toContainText('8:00 AM · Red')
})

test('an admin logs another driver’s lap times, switched to from the account menu (#288, #399, #416)', async ({ page }) => {
  await stubEvents(page)
  await signInAsAdmin(page)
  const jason = '5b0f2c1e-8d3a-4f6b-9c2d-7e1a0b3c4d5e'
  // No name on his account, so he goes by his email — a long one.
  const email = 'jasonrivera.racing@example.com'
  await page.route('**/api/drivers', route => route.fulfill({
    json: { drivers: [{ id: 'a', email: 'admin@example.com', name: 'Ada Admin' }, { id: jason, email, name: null }] },
  }))
  const laps: Record<string, { key: string }[]> = {}
  await page.route(/\/api\/laps(\?|$)/, async route => {
    const req = route.request()
    const params = new URL(req.url()).searchParams
    const driver = params.get('driver') ?? 'a'
    if (!params.has('event')) return route.fulfill({ json: { events: [] } })
    if (req.method() === 'PUT') {
      const { session } = req.postDataJSON()
      const saved = { ...session, key: `${session.date} ${session.time} ${session.group}` }
      laps[driver] = [saved]
      return route.fulfill({ json: { session: saved } })
    }
    return route.fulfill({ json: { sessions: laps[driver] ?? [] } })
  })

  // Switch driver is the account menu's alone (#399, #416).
  await page.goto('/#/')
  await page.getByRole('button', { name: 'Account: admin@example.com' }).click()
  await page.getByRole('dialog', { name: 'Account' }).getByRole('button', { name: /^Switch driver/ }).click()
  const switcher = page.getByRole('dialog', { name: 'Switch driver' })
  // The admin is "Me"; then the test account, and everyone else (#396).
  await expect(switcher.getByRole('radio')).toHaveCount(3)
  expect(await switcher.getByRole('radio').evaluateAll(radios => radios.map(r => r.getAttribute('aria-label')))).toEqual(['Me', 'Test account', email])
  // Each with their picture, or their initial without one (#416).
  await expect(switcher.getByRole('radio', { name: email }).locator('[data-avatar]')).toHaveText(email[0].toUpperCase())
  await switcher.getByRole('radio', { name: email }).click()
  await expect(switcher).toHaveCount(0)
  const banner = page.getByRole('region', { name: 'Acting as' })
  await expect(banner).toContainText(email)

  await page.goto(`/#/event/${alpha.id}`)
  await page.getByRole('button', { name: 'More actions' }).click()
  await expect(page.getByRole('menuitem', { name: 'Share' })).toBeVisible()
  await expect(page.getByRole('menuitem', { name: /^Switch driver/ })).toHaveCount(0)
  await page.keyboard.press('Escape')
  await expect(page.getByRole('menu')).toHaveCount(0)
  await page.getByRole('button', { name: 'Lap times: 8:30 AM, Blue' }).click()
  const menu = page.getByRole('dialog', { name: '8:30 AM · Blue' })
  await menu.getByRole('navigation', { name: 'Session info' }).getByRole('button', { name: /^Lap times/ }).click()
  // It slides up as a page sheet, as the list slides away (#388).
  const sheet = page.getByRole('dialog', { name: /^Lap times, / })
  await expect(page.getByLabel('Driver')).toHaveCount(0)
  // Only the banner says it's his (#364), and nothing says who can see it (#414).
  await expect(sheet).not.toContainText('admins can see')
  await sheet.getByLabel('Lap times or timestamps').fill('1:24.51, 1:23.84')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await sheet.getByRole('button', { name: 'Save', exact: true }).click()

  await expect(sheet).toBeHidden()
  const toast = page.getByRole('status')
  await expect(toast).toHaveText('Lap times saved')
  // It stays on the screen.
  const pill = (await toast.locator('> div').boundingBox())!
  expect(pill.x).toBeGreaterThanOrEqual(0)
  expect(pill.x + pill.width).toBeLessThanOrEqual(page.viewportSize()!.width)
  expect(Object.keys(laps)).toEqual([jason])
  // The schedule marks Jason's laps; the banner says whose.
  await expect(page.getByRole('button', { name: 'Lap times: 8:30 AM, Blue (saved)' })).toBeVisible()
  await expect(banner).toBeInViewport()
  await expect(page.getByLabel('Driver')).toHaveCount(0)

  await page.getByRole('tab', { name: 'My notes (1)' }).click()
  await expect(page.getByLabel('Driver')).toHaveCount(0)
  await expect(page.getByRole('group', { name: 'Best lap this event' })).toContainText('1:23.84')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)

  // Back to the admin's own: none yet.
  await banner.getByRole('button', { name: 'Switch back' }).click()
  await expect(page.getByText('No session notes yet')).toBeVisible()
})

test('a driver adds their instructor’s evaluation of a session, and a TDE event’s report card (#340)', async ({ page }) => {
  const tde: EventConfig = { ...alpha, id: '2026-03-07_tde', name: 'TDE Day', organizer: 'The Drivers Edge' }
  await stubEvents(page, [tde])
  await signInAsAdmin(page)
  await page.route(/\/api\/rsvps(\?|$)/, route => route.fulfill({ json: { rsvps: { [tde.id]: { status: 'going', runGroup: 'blue' } } } }))
  await page.route(/\/api\/laps(\?|$)/, route => route.fulfill({
    json: new URL(route.request().url()).searchParams.has('event') ? { sessions: [] } : { events: [] },
  }))
  let notes: { evaluation?: object; sessions: object[] } = { sessions: [] }
  await page.route(/\/api\/notes(\?|$)/, async route => {
    const req = route.request()
    expect(req.headers().authorization).toBe('Bearer token')
    if (req.method() === 'PUT') {
      const body = req.postDataJSON()
      if (body.evaluation) {
        notes = { ...notes, evaluation: body.evaluation }
        return route.fulfill({ json: { evaluation: body.evaluation } })
      }
      const saved = { ...body.session, key: `${body.session.date} ${body.session.time} ${body.session.group}` }
      notes = { ...notes, sessions: [saved] }
      return route.fulfill({ json: { session: saved } })
    }
    return route.fulfill({ json: notes })
  })

  await page.goto(`/#/event/${tde.id}`)
  await page.getByRole('button', { name: 'Lap times: 8:30 AM, Blue' }).click()
  const menu = page.getByRole('dialog', { name: '8:30 AM · Blue' })
  await menu.getByRole('navigation', { name: 'Session info' }).getByRole('button', { name: /^Instructor feedback/ }).click()
  // It slides up as a page sheet, as the list slides away (#388).
  const sheet = page.getByRole('dialog', { name: /^Instructor feedback, / })
  await sheet.getByLabel('What they said').fill('Unwind the wheel sooner and use all of the exit curb.')
  await sheet.getByRole('button', { name: 'Save', exact: true }).click()
  await expect(sheet).toBeHidden()
  await expect(page.getByRole('status')).toHaveText('Feedback saved')
  await expect(page.getByRole('button', { name: 'Lap times: 8:30 AM, Blue (evaluated)' })).toBeVisible()

  await page.getByRole('tab', { name: 'My notes (1)' }).click()
  await expect(page.getByRole('region', { name: 'Session 1, 8:30 AM' })).toContainText('Unwind the wheel sooner')
  await page.getByRole('button', { name: /^Add instructor evaluation/ }).click()
  const card = page.getByRole('dialog', { name: 'Instructor evaluation' })
  await expect(card).toContainText('You drove inBlue')
  // They drove in Blue: Blue's report card, with its own skills (#350).
  await expect(card.getByRole('group', { name: 'Report card' }).getByRole('button', { name: 'Blue' })).toHaveAttribute('aria-pressed', 'true')
  await card.getByLabel('Instructor', { exact: true }).fill('John Harms')
  // Picked from a menu of run group badges, which stays on screen.
  await card.getByRole('button', { name: 'Same track & direction: none' }).click()
  const badges = card.getByRole('listbox', { name: 'Same track & direction' })
  const menuBox = (await badges.boundingBox())!
  expect(menuBox.x).toBeGreaterThanOrEqual(0)
  expect(menuBox.x + menuBox.width).toBeLessThanOrEqual(page.viewportSize()!.width)
  await badges.getByRole('option', { name: 'Green' }).click()
  await expect(card.getByRole('button', { name: 'Same track & direction: Green' })).toBeVisible()
  // Blue's card says how they'd run in it, and can name a second group.
  await card.getByRole('combobox', { name: 'Same track & direction: how' }).selectOption('Part-time solo')
  await card.getByLabel('Acknowledges all flags early').fill('65')
  await card.getByLabel('Instructor notes').fill('Very smooth; got faster as the day went on.')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  // A page sheet: Cancel and Save across its top (#415).
  await expect(card.getByRole('button', { name: 'Cancel' })).toBeVisible()
  await card.getByRole('button', { name: 'Save' }).click()
  await expect(card).toBeHidden()

  const report = page.getByRole('region', { name: 'Instructor evaluation' })
  await expect(report).toContainText('John Harms')
  await expect(report).toContainText('Same track & directionGreenPart-time solo')
  await expect(report.getByRole('listitem', { name: 'Acknowledges all flags early: 65%' })).toBeVisible()
  await expect(page.getByRole('tab', { name: 'My notes (2)' })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})

// Open-Meteo's answer for one day near the track (#347): rain until 11,
// cloud until 2, then sun, warming up through the day.
function weatherFor(date: string, daily: Record<string, unknown[]> = {}) {
  const hours = [...Array(24).keys()]
  return {
    hourly: {
      time: hours.map(h => `${date}T${String(h).padStart(2, '0')}:00`),
      temperature_2m: hours.map(h => 58 + h),
      precipitation: hours.map(h => (h < 11 ? 0.04 : 0)),
      weather_code: hours.map(h => (h < 11 ? 63 : h < 14 ? 3 : 0)),
    },
    daily: { time: [date], temperature_2m_max: [79.4], temperature_2m_min: [58.2], precipitation_sum: [0.44], weather_code: [63], ...daily },
  }
}

test('the weather near the track: a forecast on the next event, each session’s hour on its schedule (#347)', async ({ page }) => {
  const soon: EventConfig = { ...alpha, id: `${isoInDays(5)}_soon`, name: 'Soon Day', days: [{ ...alpha.days[0], date: isoInDays(5) }] }
  await stubEvents(page, [soon])
  await page.route(/open-meteo\.com/, route => {
    const url = new URL(route.request().url())
    expect(url.searchParams.get('start_date')).toBe(isoInDays(5))
    return route.fulfill({ json: weatherFor(isoInDays(5), { precipitation_probability_max: [70] }) })
  })
  await page.goto('/#/')
  await expect(page.locator('[data-forecast]')).toHaveText('Forecast · 58–79°F · 70% rain')

  await page.getByRole('button', { name: /Soon Day/ }).click()
  // Session 1's first start, 8:00: rain, 66°F.
  await expect(page.getByLabel('Forecast: Rain, 66°F')).toBeVisible()
  await page.getByRole('tab', { name: 'Details' }).click()
  const card = page.getByRole('region', { name: 'Conditions' })
  await expect(card.getByRole('heading', { name: 'Forecast' })).toBeVisible()
  await expect(card).toContainText('Rain in the morning, sunny in the afternoon')
  await expect(card).toContainText('58–79°F · 70% chance of rain · Forecast near the track')
})

test('a driver records each session’s track conditions, starting from the nearby weather, and a note on the day (#347)', async ({ page }) => {
  await stubEvents(page, [alpha])
  await signInAsAdmin(page)
  await page.route(/\/api\/rsvps(\?|$)/, route => route.fulfill({ json: { rsvps: { [alpha.id]: { status: 'going', runGroup: 'blue' } } } }))
  await page.route(/\/api\/laps(\?|$)/, route => route.fulfill({
    json: new URL(route.request().url()).searchParams.has('event') ? { sessions: [] } : { events: [] },
  }))
  await page.route(/open-meteo\.com/, route => route.fulfill({ json: weatherFor(alpha.days[0].date) }))
  let notes: { conditions?: object; sessions: object[] } = { sessions: [] }
  const puts: Record<string, unknown>[] = []
  await page.route(/\/api\/notes(\?|$)/, async route => {
    const req = route.request()
    if (req.method() === 'PUT') {
      const body = req.postDataJSON()
      puts.push(body)
      if (body.conditions) {
        notes = { ...notes, conditions: body.conditions }
        return route.fulfill({ json: { conditions: body.conditions } })
      }
      const saved = { ...body.session, key: `${body.session.date} ${body.session.time} ${body.session.group}` }
      notes = { ...notes, sessions: [saved] }
      return route.fulfill({ json: { session: saved } })
    }
    return route.fulfill({ json: notes })
  })

  await page.goto(`/#/event/${alpha.id}`)
  await page.getByRole('button', { name: 'Lap times: 8:30 AM, Blue' }).click()
  const menu = page.getByRole('dialog', { name: '8:30 AM · Blue' })
  await menu.getByRole('navigation', { name: 'Session info' }).getByRole('button', { name: /^Track conditions/ }).click()
  // It slides up as a page sheet, as the list slides away (#388).
  const sheet = page.getByRole('dialog', { name: /^Track conditions, / })
  // 8:30 rounds to 9:00: rain, 67°F near the track.
  await expect(sheet.getByRole('button', { name: 'Rain' })).toHaveAttribute('aria-pressed', 'true')
  await expect(sheet.getByLabel('Air')).toHaveValue('67')
  await sheet.getByRole('button', { name: 'Wet' }).click()
  await sheet.getByLabel('Air').fill('65')
  await sheet.getByLabel('Notes').fill('Standing water at Turn 2.')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await sheet.getByRole('button', { name: 'Save', exact: true }).click()
  await expect(sheet).toBeHidden()
  await expect(page.getByRole('status')).toHaveText('Track conditions saved')
  expect(puts[0]).toEqual({ session: {
    date: alpha.days[0].date, time: '08:30', group: 'blue', sessionNumber: 1,
    conditions: { surface: 'wet', sky: 'rain', airF: 65, note: 'Standing water at Turn 2.' },
  } })
  await expect(page.getByRole('button', { name: 'Lap times: 8:30 AM, Blue (track conditions)' })).toContainText('Wet · Rain · 65°F')

  // Details: the day's weather, how the surface went, and a note on the day.
  await page.getByRole('tab', { name: 'Details' }).click()
  const card = page.getByRole('region', { name: 'Conditions' })
  await expect(card).toContainText('Rain in the morning, sunny in the afternoon')
  await expect(card).toContainText('58–79°F · 0.44 in of rain · Nearby weather')
  await expect(card).toContainText('Wet')
  await expect(card).toContainText('Across 1 recorded session')
  await card.getByRole('button', { name: 'Add a note on the day’s conditions' }).click()
  const noteSheet = page.getByRole('dialog', { name: 'Note on the day’s conditions' })
  await noteSheet.getByLabel('Your note').fill('Wet morning, grippy after lunch.')
  await noteSheet.getByRole('button', { name: 'Save note' }).click()
  await expect(noteSheet).toBeHidden()
  expect(puts[1]).toEqual({ conditions: { note: 'Wet morning, grippy after lunch.' } })
  await expect(card).toContainText('Wet morning, grippy after lunch.')

  // My notes: the session's conditions on its card.
  await page.getByRole('tab', { name: /My notes/ }).click()
  await expect(page.getByRole('region', { name: 'Session 1, 8:30 AM' }).locator('[data-session-conditions]')).toContainText('Wet · Rain · 65°FStanding water at Turn 2.')
})

test('a driver adds their car and its photo in the Garage, logs a brake job, adds it to an event and logs tire pressures (#344)', async ({ page }) => {
  await stubEvents(page, [alpha])
  await signInAsAdmin(page)
  await page.route(/\/api\/laps(\?|$)/, route => route.fulfill({
    json: new URL(route.request().url()).searchParams.has('event') ? { sessions: [] } : { events: [] },
  }))
  type Car = { id: string; photo?: string; log?: object[] }
  const garage: { cars: Car[]; events: Record<string, object> } = { cars: [], events: {} }
  let photo: { type: string; body: Buffer | null } | null = null
  // The photo as the app sent it, kept in the page too: WebKit doesn't hand
  // Playwright a Blob body, so the stand-in server can't read it from there.
  await page.addInitScript(() => {
    const fetch = window.fetch
    window.fetch = (input, init) => {
      if (String(input).includes('photo=1') && init?.method === 'PUT') (window as unknown as { sentPhoto: unknown }).sentPhoto = init.body
      return fetch(input, init)
    }
  })
  const sentPhoto = async () => {
    photo!.body ??= Buffer.from(await page.evaluate(() => new Promise<string>(resolve => {
      const read = new FileReader()
      read.onload = () => resolve(String(read.result).split(',')[1])
      read.readAsDataURL((window as unknown as { sentPhoto: Blob }).sentPhoto)
    })), 'base64')
    return photo!.body
  }
  await page.route(/\/api\/garage(\?|$)/, async route => {
    const req = route.request()
    expect(req.headers().authorization).toBe('Bearer token')
    const params = new URL(req.url()).searchParams
    if (params.get('photo')) {
      if (req.method() === 'PUT') {
        photo = { type: req.headers()['content-type'], body: req.postDataBuffer() }
        garage.cars[0].photo = 'p1'
        return route.fulfill({ json: { car: garage.cars[0] } })
      }
      return route.fulfill({ contentType: photo!.type, body: await sentPhoto() })
    }
    if (req.method() === 'PUT') {
      const body = req.postDataJSON()
      if (params.get('event')) {
        garage.events[params.get('event')!] = body.setup
        return route.fulfill({ json: { setup: body.setup } })
      }
      if (params.get('car') && body.events) {
        const events = Object.fromEntries((body.events as string[]).map(id => [id, { carId: params.get('car') }]))
        Object.assign(garage.events, events)
        return route.fulfill({ json: { events } })
      }
      if (params.get('car')) {
        const entry = { id: 'e1', ...body.entry }
        garage.cars[0].log = [entry]
        return route.fulfill({ json: { entry } })
      }
      const car = { id: 'car1', ...body.car }
      garage.cars = [car]
      return route.fulfill({ json: { car } })
    }
    return route.fulfill({ json: garage })
  })
  const noSideScroll = async () => expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)

  await page.goto('/#/garage')
  await expect(page.getByRole('heading', { level: 1, name: 'Garage' })).toBeInViewport()
  // A page of its own, over the Garage: Cancel and Save across its top. It
  // has a Cancel, so it slides up from the bottom, as on iOS (#356).
  const slide = await trackSlide(page, () => page.getByRole('button', { name: 'Add a car' }).click(), 'Add a car')
  expect(slide).toEqual({ fromBelow: true, fromSide: false })
  const add = page.getByRole('dialog', { name: 'Add a car' })
  await expect(add.getByRole('button', { name: 'Cancel' })).toBeInViewport()
  await expect(add.getByRole('button', { name: 'Save' })).toBeDisabled()
  await add.getByLabel('Year').fill('2019')
  await add.getByLabel('Make').fill('Porsche')
  await add.getByLabel('Model').fill('718 Cayman GTS')
  await add.getByRole('textbox', { name: /^Nickname/ }).fill('The Cayman')
  await add.getByRole('textbox', { name: /^Lug nut torque/ }).fill('118')

  // Its photo, picked as it's added: a camera-sized one, over the upload
  // limit as it is, made smaller before it's sent — even where the browser
  // can't make a bitmap of it (as iPhone Safari sometimes can't).
  const picked = await add.getByLabel('Add a photo').evaluate(async input => {
    window.createImageBitmap = () => Promise.reject(new Error('Not here'))
    const c = document.createElement('canvas')
    c.width = 1600
    c.height = 1200
    const ctx = c.getContext('2d')!
    const noise = ctx.createImageData(1600, 1200)
    for (let i = 0; i < noise.data.length; i++) noise.data[i] = i % 4 === 3 ? 255 : Math.random() * 256
    ctx.putImageData(noise, 0, 0)
    const png = await new Promise<Blob>(r => c.toBlob(b => r(b!), 'image/png'))
    const files = new DataTransfer()
    files.items.add(new File([png], 'cayman.png', { type: 'image/png' }))
    ;(input as HTMLInputElement).files = files.files
    input.dispatchEvent(new Event('change', { bubbles: true }))
    return png.size
  })
  expect(picked).toBeGreaterThan(3_000_000)
  await expect(add.getByRole('img', { name: 'Your car' })).toBeVisible()
  await expect(add.getByRole('button', { name: 'Change photo' })).toBeVisible()
  await noSideScroll()
  expect(photo).toBeNull()
  await add.getByRole('button', { name: 'Save' }).click()
  await expect(add).toBeHidden()
  await expect(page.getByRole('status')).toHaveText('Car added')
  expect(photo!.type).toBe('image/jpeg')
  expect((await sentPhoto()).length).toBeLessThanOrEqual(3_000_000)

  // A card for the car, its photo across it (#410), which opens its page.
  const row = page.getByRole('list', { name: 'Cars' }).getByRole('link')
  await expect(row).toHaveText('The Cayman2019 · Porsche 718 Cayman GTS')
  // No count on it till it's been to an event (#424); nothing under the photo.
  await expect(row.locator('[data-events-badge]')).toHaveCount(0)
  await expect(row.locator('img[data-car-photo]')).toBeVisible()
  await noSideScroll()
  await row.click()
  await expect(page).toHaveURL(/#\/garage\/car1$/)
  await expect(page.getByRole('heading', { level: 1, name: 'The Cayman' })).toBeInViewport()
  await expect(page.getByRole('region', { name: 'Details' })).toContainText('Lug nut torque118 ft·lb')
  // The photo, shown under its name — changed from Edit, not over it.
  const shown = page.getByRole('img', { name: 'The Cayman' })
  await expect(shown).toBeVisible()
  const size = await shown.evaluate(img => [(img as HTMLImageElement).naturalWidth, (img as HTMLImageElement).naturalHeight])
  expect(size).toEqual([1280, 960])
  await expect(page.getByRole('button', { name: 'Change photo' })).toHaveCount(0)

  // A brake job: pads and rotors on one day at one shop.
  await page.getByRole('button', { name: 'Add entry' }).click()
  const change = page.getByRole('dialog', { name: 'Add entry' })
  await change.getByRole('button', { name: 'Front pads' }).click()
  await change.getByRole('button', { name: 'Front rotors' }).click()
  await change.getByLabel('Front pads', { exact: true }).and(page.getByRole('combobox')).fill('Hawk DTC-60')
  await change.getByLabel('Date').fill('2026-03-01')
  await change.getByLabel(/^Shop/).fill('Speed Shop')
  // The date sits inside the sheet, like the boxes around it (iOS ran it wider).
  const date = (await change.getByLabel('Date').boundingBox())!
  const shop = (await change.getByLabel(/^Shop/).boundingBox())!
  expect(Math.round(date.x + date.width)).toBe(Math.round(shop.x + shop.width))
  await noSideScroll()
  await change.getByRole('button', { name: 'Add entry' }).click()
  await expect(change).toBeHidden()
  await expect(page.getByRole('region', { name: 'Maintenance' })).toContainText('Front padsHawk DTC-60Since Mar 1, 2026')
  await noSideScroll()
  // History: the job, under its month.
  await page.getByRole('tab', { name: 'History' }).click()
  await expect(page.getByRole('region', { name: 'March 2026' })).toContainText('Mar 1Front padsHawk DTC-60Speed ShopFront rotorsSpeed Shop')
  await noSideScroll()

  // Added to an event from its page: any the driver didn't say they're not going to.
  await page.getByRole('tab', { name: 'Events' }).click()
  await page.getByRole('button', { name: 'Add to event' }).click()
  const pick = page.getByRole('dialog', { name: 'Add to event' })
  await pick.getByRole('checkbox', { name: new RegExp(`^${alpha.name}`) }).click()
  await noSideScroll()
  await pick.getByRole('button', { name: 'Add to event' }).click()
  await expect(pick).toBeHidden()
  await expect(page.getByRole('list', { name: 'Past events' })).toContainText(alpha.name)
  await noSideScroll()
  expect(garage.events[alpha.id]).toEqual({ carId: 'car1' })

  // At the event: the car's at the very top of My notes.
  await page.goto(`/#/event/${alpha.id}`)
  await page.getByRole('tab', { name: 'My notes' }).click()
  const carRow = page.getByRole('button', { name: 'Your car: The Cayman' })
  await expect(carRow).toBeVisible()
  await expect(page.getByRole('tab', { name: 'My notes (1)' })).toBeVisible()
  await carRow.click()
  const details = page.getByRole('dialog', { name: 'Your car' })
  await expect(details).toContainText('Lug nut torque118 ft·lb')
  await expect(details.getByLabel('Consumables')).toContainText('Front padsHawk DTC-60since Mar 1, 2026')
  // Its page, over the event; Back returns to the event.
  await details.getByRole('button', { name: 'The Cayman: car details' }).click()
  await expect(page).toHaveURL(/#\/garage\/car1$/)
  await expect(page.getByRole('heading', { level: 1, name: 'The Cayman' })).toBeInViewport()
  await page.getByRole('button', { name: 'Back' }).last().click()
  await expect(page).toHaveURL(new RegExp(`#/event/${alpha.id}$`))
  await expect(carRow).toBeInViewport()

  // A session's pressures, each corner, from the schedule.
  await page.getByRole('tab', { name: 'Schedule' }).click()
  await page.getByRole('button', { name: 'Lap times: 8:30 AM, Blue' }).click()
  const menu = page.getByRole('dialog', { name: '8:30 AM · Blue' })
  // It slides up as a page sheet, as the list slides away (#388): measured once it's up.
  await trackSlide(page, () => menu.getByRole('navigation', { name: 'Session info' }).getByRole('button', { name: /^Tire pressures/ }).click(), 'Tire pressures')
  const sheet = page.getByRole('dialog', { name: /^Tire pressures, / })
  for (const corner of ['Front left', 'Front right', 'Rear left', 'Rear right']) {
    await sheet.getByLabel(`${corner}, before the session`).fill('30')
    await sheet.getByLabel(`${corner}, after the session`).fill('36.5')
  }
  // The four corners sit two by two, as on the car.
  const fl = (await sheet.getByLabel('Front left, before the session').boundingBox())!
  const fr = (await sheet.getByLabel('Front right, before the session').boundingBox())!
  const rl = (await sheet.getByLabel('Rear left, before the session').boundingBox())!
  expect(fr.y).toBe(fl.y)
  expect(fr.x).toBeGreaterThan(fl.x)
  expect(rl.y).toBeGreaterThan(fl.y)
  await noSideScroll()
  await sheet.getByRole('button', { name: 'Save', exact: true }).click()
  await expect(sheet).toBeHidden()
  await expect(page.getByRole('status')).toHaveText('Tire pressures saved')
  await expect(page.getByRole('button', { name: 'Lap times: 8:30 AM, Blue (tire pressures)' })).toBeVisible()
  expect(garage.events[alpha.id]).toMatchObject({ carId: 'car1' })

  await page.getByRole('tab', { name: 'My notes (2)' }).click()
  const session = page.getByRole('region', { name: 'Session 1, 8:30 AM' })
  await expect(session.getByRole('table', { name: 'Tire pressures' })).toContainText('After36.536.536.536.5')
  await noSideScroll()

  // The car's page lists the event; it opens over the car's page, and Back
  // returns there — scrolled where it was left, on the event (#389), however
  // far reaching the event scrolled it (on a short screen, the car's name).
  await page.goto('/#/garage/car1')
  await page.getByRole('tab', { name: 'Events' }).click()
  const wentTo = page.getByRole('list', { name: 'Past events' }).getByRole('button', { name: new RegExp(alpha.name) })
  const carScrolled = () => wentTo.evaluate(el => el.closest('.overflow-y-auto')!.scrollTop)
  await wentTo.click()
  await expect(page.getByRole('tab', { name: 'My notes (2)' })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('button', { name: 'Your car: The Cayman' })).toBeInViewport()
  const scrolled = await carScrolled()
  const eventPage = page.locator('.fixed.inset-0', { has: page.getByRole('button', { name: 'Your car: The Cayman' }) })
  await eventPage.getByRole('button', { name: 'Back' }).click()
  await expect(page).toHaveURL(/#\/garage\/car1$/)
  await expect(wentTo).toBeInViewport()
  expect(await carScrolled()).toBe(scrolled)

  // Back from the car's page is the Garage, under More (#345); Back from there, More.
  const carPage = page.locator('.fixed.inset-0', { has: page.getByRole('heading', { level: 1, name: 'The Cayman' }) })
  await carPage.getByRole('button', { name: 'Back' }).click()
  await expect(page).toHaveURL(/#\/garage$/)
  await expect(page.getByRole('list', { name: 'Cars' })).toBeInViewport()
  await expect(page.getByRole('navigation', { name: 'Sections' }).getByRole('link', { name: 'More' })).toHaveAttribute('aria-current', 'page')
  await page.locator('.fixed.inset-0', { has: page.getByRole('list', { name: 'Cars' }) }).getByRole('button', { name: 'Back' }).click()
  await expect(page).toHaveURL(/#\/more$/)
  await expect(page.getByRole('heading', { level: 1, name: 'More' })).toBeInViewport()
})

test('a driver shares their car from its page, with a link to send or a code to scan (#398)', async ({ page }) => {
  await stubEvents(page, [alpha])
  await signInAsAdmin(page)
  const token = 'tok-abcdefghijklmnop'
  let invited = 0
  await page.route(/\/api\/garage(\?|$)/, route => {
    const params = new URL(route.request().url()).searchParams
    if (route.request().method() === 'PUT' && params.get('car') === 'car1' && params.get('invite') === '1') {
      invited++
      return route.fulfill({ json: { invite: { token, expires: '2026-10-16T12:00:00.000Z' } } })
    }
    return route.fulfill({ json: { cars: [{ id: 'car1', year: 2015, make: 'Ford', model: 'Mustang GT', nickname: 'The Mustang' }], events: {} } })
  })
  await page.goto('/#/garage/car1')
  // Not shared yet: just their own picture, beside Edit, with the person-plus.
  await expect(page.getByRole('button', { name: 'Share with another driver' }).locator('[data-avatar]')).toHaveCount(1)
  await page.getByRole('button', { name: 'Share with another driver' }).click()
  const sheet = page.getByRole('dialog', { name: 'Share this car' })
  await expect(sheet.getByRole('button', { name: 'Copy link' })).toContainText(`/#/join-car/${token}`)
  await expectShareSheet(page, sheet)
  // What sharing a car means, between the title and the code (#426).
  const about = sheet.locator('[data-share-car-about]')
  await expect(about).toHaveText('Send this link to someone else who drives it. Once they open it and join, you both keep up its details, photo and change log, and each of you adds it to your own events.')
  const [titleBox, aboutBox, qrBox] = await Promise.all([
    sheet.getByRole('heading', { level: 2 }).boundingBox(),
    about.boundingBox(),
    sheet.getByRole('img', { name: 'Code to scan for the link' }).boundingBox(),
  ])
  expect(aboutBox!.y).toBeGreaterThanOrEqual(titleBox!.y + titleBox!.height)
  expect(aboutBox!.y + aboutBox!.height).toBeLessThanOrEqual(qrBox!.y)
  await expect(sheet).toContainText('Works once, until Oct 16, 2026.')
  expect(invited).toBe(1)
})

test('a driver joins a shared car from its link, and its page says who drove it where, in which group (#398)', async ({ page }) => {
  const [, bravo] = TEST_EVENTS
  await stubEvents(page, [alpha, bravo])
  await signInAsAdmin(page)
  await page.route(/\/api\/rsvps(\?|$)/, route => route.fulfill({ json: { rsvps: { [alpha.id]: { status: 'going', runGroup: 'blue' } } } }))
  await page.route(/\/api\/laps(\?|$)/, route => route.fulfill({
    json: new URL(route.request().url()).searchParams.has('event') ? { sessions: [] } : { events: [] },
  }))
  const token = 'tok-abcdefghijklmnop'
  const mustang = { id: 's1', year: 2015, make: 'Ford', model: 'Mustang GT', nickname: 'The Mustang' }
  let joined = false
  await page.route(/\/api\/garage(\?|$)/, route => {
    const req = route.request()
    const params = new URL(req.url()).searchParams
    if (params.get('invite') === token) {
      if (req.method() === 'PUT') {
        joined = true
        return route.fulfill({ json: { car: { id: 's1' } } })
      }
      return route.fulfill({ json: { invite: { car: { year: 2015, make: 'Ford', model: 'Mustang GT', nickname: 'The Mustang' }, from: 'Jason Smith', expires: '2026-10-16T12:00:00.000Z' } } })
    }
    if (!joined) return route.fulfill({ json: { cars: [], events: {} } })
    return route.fulfill({ json: {
      cars: [{
        ...mustang,
        drivers: [{ id: 'j', name: 'Jason Smith' }, { id: 'a', name: 'Rick Smith', you: true }],
        drives: [{ eventId: alpha.id, driverId: 'j', runGroup: 'red' }, { eventId: bravo.id, driverId: 'j' }],
      }],
      // Rick drove it at Alpha too.
      events: { [alpha.id]: { carId: 's1' } },
    } })
  })

  await page.goto(`/#/join-car/${token}`)
  const invite = page.getByRole('dialog', { name: 'Shared car' })
  await expect(invite).toContainText('Jason Smith wants to share a car with you')
  // The car front and center, as the Garage shows it, and Accept or Decline (#410).
  await expect(invite.getByRole('region', { name: 'The car' })).toContainText('The Mustang2015 · Ford Mustang GT')
  await expect(invite.getByRole('button', { name: 'Decline' })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await invite.getByRole('button', { name: 'Accept' }).click()
  await expect(page.getByRole('status')).toHaveText('Added to your garage')
  await expect(page).toHaveURL(/#\/garage\/s1$/)
  await expect(page.getByRole('heading', { level: 1, name: 'The Mustang' })).toBeInViewport()
  expect(joined).toBe(true)

  const carPage = page.locator('.fixed.inset-0', { has: page.getByRole('heading', { level: 1, name: 'The Mustang' }) })
  // Under its name, who else drives it.
  // Its drivers up top, by their picture or, without one, their initial (#410).
  await expect(carPage.getByRole('button', { name: 'Shared with Jason. Share with another driver' }).locator('[data-avatar]')).toHaveText(['R', 'J'])
  // Each event, who drove it there, in their run group if they said.
  await carPage.getByRole('tab', { name: 'Events' }).click()
  const rows = carPage.getByRole('list', { name: 'Past events' }).getByRole('listitem')
  await expect(rows).toHaveCount(2)
  // How many, as My notes says on an event's page (#422).
  await expect(carPage.getByRole('tab', { name: 'Events (2)', exact: true })).toHaveAttribute('aria-selected', 'true')
  await expect(rows.nth(0)).toContainText(alpha.name)
  // Each by their picture — here, their initial — with their name for screen readers (#410).
  await expect(rows.nth(0).locator('[data-who-drove] [data-avatar]')).toHaveText(['R', 'J'])
  await expect(rows.nth(0).locator('[data-who-drove] .sr-only')).toHaveText(['You', 'Jason'])
  await expect(rows.nth(0).locator('[data-who-drove]')).toContainText('Blue')
  await expect(rows.nth(0).locator('[data-who-drove]')).toContainText('Red')
  await expect(rows.nth(1)).toContainText(bravo.name)
  await expect(rows.nth(1).locator('[data-who-drove] .sr-only')).toHaveText(['Jason'])
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)

  // Taking it out of their garage leaves it in Jason's: Archive, from its "…" (#423).
  await carPage.getByRole('button', { name: 'More actions' }).click()
  await expect(carPage.getByRole('menuitem')).toHaveText(['Edit', 'Archive'])
  await carPage.getByRole('menuitem', { name: 'Archive' }).click()
  const ask = page.getByRole('alertdialog', { name: 'Archive “The Mustang”?' })
  await expect(ask).toContainText('It stays in Jason’s garage, and the event you drove it at keeps it as it is now. You can put it back.')
  await expect(ask).toBeInViewport({ ratio: 1 })
  await ask.getByRole('button', { name: 'Cancel' }).click()
  await expect(ask).toBeHidden()
  await carPage.getByRole('button', { name: 'More actions' }).click()
  await carPage.getByRole('menuitem', { name: 'Edit' }).click()
  const edit = page.getByRole('dialog', { name: 'Edit car' })
  // Nothing says who can see it (#414).
  await expect(edit).not.toContainText('admins can see')
  await edit.getByRole('button', { name: 'Cancel' }).click()
  await expect(edit).toBeHidden()

  // In the Garage: who else drives it, at the top of its photo, and how
  // many events it's been to, at the foot (#424). No Private by the title.
  await carPage.getByRole('button', { name: 'Back' }).click()
  await expect(page).toHaveURL(/#\/garage$/)
  const card = page.getByRole('list', { name: 'Cars' }).getByRole('link')
  await expect(card).toContainText('Shared with Jason')
  await expect(card.locator('[data-events-badge]')).toHaveText('2 events')
  await expect(card.locator('[data-avatar]')).toHaveText(['R', 'J'])
  const [photoBox, badgeBox, facesBox] = await Promise.all([
    card.locator('[data-car-hero]').boundingBox(),
    card.locator('[data-events-badge]').boundingBox(),
    card.locator('[data-avatar]').last().boundingBox(),
  ])
  // Bottom right and top right, on the photo.
  expect(badgeBox!.x + badgeBox!.width).toBeGreaterThan(photoBox!.x + photoBox!.width - 24)
  expect(badgeBox!.y + badgeBox!.height).toBeGreaterThan(photoBox!.y + photoBox!.height - 24)
  expect(facesBox!.x + facesBox!.width).toBeGreaterThan(photoBox!.x + photoBox!.width - 24)
  expect(facesBox!.y).toBeLessThan(photoBox!.y + 24)
  await expect(page.getByText('Private', { exact: true })).toHaveCount(0)
})

test('Back returns through history: a swipe back from the Garage after deleting a car is More, not the car (#429)', async ({ page }) => {
  await stubEvents(page, [alpha])
  await signInAsAdmin(page)
  await page.route(/\/api\/laps(\?|$)/, route => route.fulfill({
    json: new URL(route.request().url()).searchParams.has('event') ? { sessions: [] } : { events: [] },
  }))
  const garage = {
    cars: [
      { id: 'c1', year: 2018, make: 'Porsche', model: 'Panamera 4S', nickname: 'Beluga' },
      { id: 'c2', year: 2019, make: 'Test', model: 'Test' },
    ],
    events: {},
  }
  await page.route(/\/api\/garage(\?|$)/, route => {
    const req = route.request()
    if (req.method() === 'DELETE') {
      const id = new URL(req.url()).searchParams.get('car')
      garage.cars = garage.cars.filter(c => c.id !== id)
      return route.fulfill({ json: {} })
    }
    return route.fulfill({ json: garage })
  })
  const heading = (name: string) => page.getByRole('heading', { level: 1, name, exact: true })
  const cards = page.getByRole('list', { name: 'Cars' }).getByRole('link')
  const pageOf = (name: string) => page.locator('.fixed.inset-0', { has: heading(name) })

  await page.goto('/#/more')
  await page.getByRole('link', { name: /^Garage/ }).click()
  await expect(heading('Garage')).toBeInViewport()

  // Back from a car's page is a step back: the browser's back from the
  // Garage then is More, not the car again.
  await cards.filter({ hasText: 'Beluga' }).click()
  await expect(heading('Beluga')).toBeInViewport()
  await pageOf('Beluga').getByRole('button', { name: 'Back' }).click()
  await expect(page).toHaveURL(/#\/garage$/)
  await page.goBack()
  await expect(page).toHaveURL(/#\/more$/)
  await expect(heading('More')).toBeInViewport()

  // Deleted from its page: back in the Garage, and back from there, More.
  await page.getByRole('link', { name: /^Garage/ }).click()
  await cards.filter({ hasText: 'Test Test' }).click()
  const carPage = pageOf('Test Test')
  await expect(heading('Test Test')).toBeInViewport()
  await carPage.getByRole('button', { name: 'More actions' }).click()
  await carPage.getByRole('menuitem', { name: 'Delete' }).click()
  await page.getByRole('alertdialog', { name: /^Delete “.*Test Test”\?$/ }).getByRole('button', { name: 'Delete' }).click()
  await expect(page.getByRole('status')).toHaveText('Car deleted')
  await expect(page).toHaveURL(/#\/garage$/)
  await expect(cards).toHaveCount(1)
  await page.goBack()
  await expect(page).toHaveURL(/#\/more$/)
  await expect(heading('More')).toBeInViewport()
  await expect(page.getByText('This car isn’t in your garage')).toHaveCount(0)

  // A link straight to a car: Back to the Garage takes its place, so back
  // from the Garage doesn't open the car again.
  await page.goto('/#/garage/c1')
  await expect(heading('Beluga')).toBeInViewport()
  await pageOf('Beluga').getByRole('button', { name: 'Back' }).click()
  await expect(page).toHaveURL(/#\/garage$/)
  await page.goBack()
  await expect(page).not.toHaveURL(/#\/garage\/c1$/)
})

test('a track page slides in over the event from My notes, listing the layout’s events, which open over it (#274)', async ({ page }) => {
  // An earlier event on the same layout as Alpha.
  const earlier: EventConfig = { ...alpha, id: '2025-10-04_alpha', name: 'Alpha in October', days: [{ ...alpha.days[0], date: '2025-10-04' }] }
  await stubEvents(page, [...TEST_EVENTS, earlier])
  await signInAsAdmin(page)
  const session = (date: string, laps: object[]) => ({ key: `${date} 08:30 blue`, date, time: '08:30', group: 'blue', sessionNumber: 1, laps })
  const laps: Record<string, object[]> = {
    [alpha.id]: [session('2026-03-07', [{ ms: 112_000 }, { ms: 106_000, start: '8:35:12 AM', end: '8:36:58 AM', note: 'Clean lap' }])],
    [earlier.id]: [session('2025-10-04', [{ ms: 108_400 }, { ms: 105_220 }])],
  }
  await page.route(/\/api\/laps(\?|$)/, async route => {
    const params = new URL(route.request().url()).searchParams
    if (params.has('events')) {
      const ids = params.get('events')!.split(',')
      return route.fulfill({ json: { events: ids.filter(id => laps[id]).map(id => ({ eventId: id, sessions: laps[id] })) } })
    }
    if (!params.has('event')) return route.fulfill({ json: { events: [{ eventId: earlier.id, best: 105_220, sessions: 1 }] } })
    return route.fulfill({ json: { sessions: laps[params.get('event')!] ?? [] } })
  })

  await page.goto(`/#/event/${alpha.id}`)
  await page.getByRole('tab', { name: 'My notes (1)' }).click()
  const card = page.getByRole('group', { name: 'All time best' })
  await expect(card).toContainText('1:45.22')
  const slide = await trackSlide(page, () => card.getByRole('link', { name: 'See all my MSRC 2.0 CW laps' }).click(), 'MSRC 2.0 CW')
  expect(slide).toEqual({ fromBelow: false, fromSide: true })
  await expect(page).toHaveURL(/#\/track\/msrc-2-0-cw$/)

  const track = page.locator('.fixed', { has: page.getByRole('heading', { level: 1, name: 'MSRC 2.0 CW' }) })
  await expect(track.getByRole('group', { name: 'All time best' })).toContainText('1:45.22')
  // The layout's events, newest first, each with its run group, best and
  // average; their sessions are a tap away, not on this page.
  const events = track.getByRole('region', { name: 'Events' }).getByRole('link')
  await expect(events).toHaveCount(2)
  await expect(events.nth(0)).toContainText('Alpha Track Day')
  await expect(events.nth(1)).toContainText('Alpha in October')
  await expect(events.nth(1)).toContainText('Blue')
  await expect(events.nth(1).getByRole('definition')).toHaveText(['1:45.22', '1:46.810'])
  // Compact: one row each, like the Events list's.
  expect((await events.nth(1).boundingBox())!.height).toBeLessThan(100)
  await expect(track.getByRole('table')).toHaveCount(0)
  // Above them, a chart of each event's best and average: the older one on
  // the left, which the pointer reads out.
  const chart = track.getByRole('group', { name: /^Best and average lap at each event/ })
  const box = (await chart.boundingBox())!
  await page.mouse.move(box.x + 60, box.y + box.height / 2)
  await expect(chart.getByRole('status')).toContainText('Alpha in October')
  await expect(chart.getByRole('status')).toContainText('1:45.22Best')
  // Nothing runs off the side of the phone.
  expect(await track.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)

  // Back slides it away, and the event is right where it was.
  await track.getByRole('button', { name: 'Back' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'MSRC 2.0 CW' })).toHaveCount(0)
  await expect(page).toHaveURL(new RegExp(`#/event/${alpha.id}$`))
  await expect(page.getByRole('tab', { name: 'My notes (1)' })).toHaveAttribute('aria-selected', 'true')
  await expect(card).toBeInViewport()

  // An event's card slides its page in over the track page, on My notes…
  await card.getByRole('link', { name: 'See all my MSRC 2.0 CW laps' }).click()
  const slideIn = await trackSlide(page, () => events.nth(1).click(), 'Alpha in October')
  expect(slideIn).toEqual({ fromBelow: false, fromSide: true })
  const october = page.locator('.fixed', { has: page.getByRole('heading', { level: 1, name: 'Alpha in October' }) })
  await expect(october.getByRole('tab', { name: 'My notes (1)' })).toHaveAttribute('aria-selected', 'true')
  // The top of My notes shows as it opens; the sessions are further down.
  await expect(october.getByRole('group', { name: /^Best and average lap in each session/ })).toBeInViewport()
  await october.getByRole('region', { name: 'Session 1, 8:30 AM' }).scrollIntoViewIfNeeded()
  await expect(october.getByRole('region', { name: 'Session 1, 8:30 AM' })).toBeInViewport()
  // …and its Back returns to the track page.
  await october.getByRole('button', { name: 'Back' }).click()
  await expect(page).toHaveURL(/#\/track\/msrc-2-0-cw$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Alpha in October' })).toHaveCount(0)
  await expect(events.nth(1)).toBeInViewport()
})

test('an admin switches to the test account from the account menu, sees its laps and speeds, and switches back (#309)', async ({ page }) => {
  await stubEvents(page)
  await signInAsAdmin(page)
  const testSession = {
    key: '2026-03-07 08:30 blue', date: '2026-03-07', time: '08:30', group: 'blue', sessionNumber: 1,
    laps: [{ ms: 100_071, topMph: 92, avgMph: 61.7 }, { ms: 84_072, topMph: 106.3, avgMph: 69.5 }],
  }
  const asked: (string | null)[] = []
  await page.route(/\/api\/laps(\?|$)/, async route => {
    const params = new URL(route.request().url()).searchParams
    const driver = params.get('driver')
    asked.push(driver)
    const test = driver === 'test-account'
    if (!params.has('event')) {
      return route.fulfill({ json: { events: test ? [{ eventId: alpha.id, best: 84_072, sessions: 1 }] : [] } })
    }
    return route.fulfill({ json: { sessions: test && params.get('event') === alpha.id ? [testSession] : [] } })
  })

  await page.goto('/#/tracks')
  const alphaTrack = page.getByRole('list', { name: 'Tracks' }).getByRole('link', { name: /^MSRC 2\.0 CW/ })
  await expect(page.getByRole('button', { name: 'Account: admin@example.com' })).toBeVisible()
  await expect(alphaTrack).toContainText('No events yet')

  await page.getByRole('button', { name: 'Account: admin@example.com' }).click()
  await page.getByRole('dialog', { name: 'Account' }).getByRole('button', { name: /^Switch driver/ }).click()
  await page.getByRole('dialog', { name: 'Switch driver' }).getByRole('radio', { name: 'Test account' }).click()
  await expect(page.getByRole('dialog', { name: 'Switch driver' })).toHaveCount(0)
  // The account button and a banner over every page say so (#396), and the test account's laps show.
  await expect(page.getByRole('button', { name: 'Account: admin@example.com, on the test account' })).toBeVisible()
  const banner = page.getByRole('region', { name: 'Acting as' })
  await expect(banner).toHaveText(/On the test account/)
  // The page starts below it, not under it.
  const bannerBottom = (await banner.boundingBox())!.y + (await banner.boundingBox())!.height
  expect((await page.getByRole('heading', { level: 1, name: 'Tracks' }).boundingBox())!.y).toBeGreaterThanOrEqual(bannerBottom)
  await expect(alphaTrack).toContainText('1 event')
  expect(asked).toContain('test-account')

  // Still on it after a reload — once its laps are in, so the reload
  // doesn't cut off requests on their way.
  await page.reload()
  await expect(page.getByRole('button', { name: 'Account: admin@example.com, on the test account' })).toBeVisible()
  await expect(alphaTrack).toContainText('1 event')

  // Its laps show with each lap's speeds.
  await page.goto(`/#/event/${alpha.id}`)
  await page.getByRole('tab', { name: 'My notes (1)' }).click()
  const card = page.getByRole('region', { name: 'Session 1, 8:30 AM' })
  await card.getByRole('button', { name: 'Show laps for Session 1' }).click()
  const table = card.getByRole('table', { name: 'Laps' })
  await expect(table.getByRole('columnheader', { name: 'Top speed, mph' })).toBeVisible()
  await expect(table.getByRole('columnheader', { name: 'Average speed, mph' })).toBeVisible()
  await expect(table.getByRole('row', { name: /^2 / })).toHaveText(/1:24\.072\s*106\.3\s*69\.5/)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)

  // An event's page, pushed over the tab, starts below the banner too.
  const eventBack = page.getByRole('button', { name: /^Back/ }).first()
  expect((await eventBack.boundingBox())!.y).toBeGreaterThanOrEqual(bannerBottom)

  // Back with the banner's Switch back.
  await page.goto('/#/tracks')
  await banner.getByRole('button', { name: 'Switch back' }).click()
  await expect(banner).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Account: admin@example.com' })).toBeVisible()
  await expect(alphaTrack).toContainText('No events yet')
})

test('Events, Tracks and More tabs along the bottom; a track opens from Tracks (#274), the Garage from More (#345)', async ({ page }) => {
  await stubEvents(page)
  await page.goto('/#/')
  const bar = page.getByRole('navigation', { name: 'Sections' })
  // Pinned to the bottom of the screen, full width.
  const viewport = page.viewportSize()!
  await expect.poll(async () => {
    const box = (await bar.boundingBox())!
    return [Math.round(box.y + box.height), Math.round(box.width)]
  }).toEqual([viewport.height, viewport.width])
  await expect(bar.getByRole('link', { name: 'Events' })).toHaveAttribute('aria-current', 'page')

  // The last event scrolls clear of the bar.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  const last = page.getByRole('button', { name: /Bravo HPDE/ })
  const [lastBox, barBox] = [(await last.boundingBox())!, (await bar.boundingBox())!]
  expect(lastBox.y + lastBox.height).toBeLessThanOrEqual(barBox.y)

  await bar.getByRole('link', { name: 'Tracks' }).click()
  await expect(page).toHaveURL(/#\/tracks$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Tracks' })).toBeVisible()
  // The one coming up first, then the rest.
  const tracks = page.getByRole('list', { name: 'Tracks' }).getByRole('link')
  await expect(tracks).toHaveText([/^Charlie Raceway/, /^MSRC 2\.0 CW/, /^ECR/])
  // Each track's shape is on a panel wider than it's tall, flush with the
  // card's left, top and bottom (inside its 1px border) — not an event
  // card's square tile.
  const [card, panel] = await tracks.nth(1).evaluate(a => [a, a.firstElementChild!].map(el => {
    const { left, top, bottom, width, height } = el.getBoundingClientRect()
    return { left, top, bottom, width, height }
  }))
  expect(panel.width).toBeGreaterThan(panel.height)
  expect(panel.left - card.left).toBeCloseTo(1, 0)
  expect(panel.top - card.top).toBeCloseTo(1, 0)
  expect(card.bottom - panel.bottom).toBeCloseTo(1, 0)

  const slide = await trackSlide(page, () => tracks.nth(1).click(), 'MSRC 2.0 CW')
  expect(slide).toEqual({ fromBelow: false, fromSide: true })
  // Signed out here, so it asks to sign in.
  await expect(page.getByText('Sign in to see your lap times on this track')).toBeVisible()
  await page.getByRole('button', { name: 'Back' }).click()
  await expect(page).toHaveURL(/#\/tracks$/)
  await expect(page.getByRole('heading', { level: 1, name: 'MSRC 2.0 CW' })).toHaveCount(0)

  await bar.getByRole('link', { name: 'More' }).click()
  await expect(page).toHaveURL(/#\/more$/)
  await expect(page.getByRole('heading', { level: 1, name: 'More' })).toBeVisible()
  const garage = await trackSlide(page, () => page.getByRole('link', { name: /^Garage/ }).click(), 'Garage')
  expect(garage).toEqual({ fromBelow: false, fromSide: true })
  // Signed out here, so it asks to sign in.
  await expect(page.getByText('Sign in to manage your cars')).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await page.getByRole('button', { name: 'Back' }).click()
  await expect(page).toHaveURL(/#\/more$/)
  await expect(bar.getByRole('link', { name: 'More' })).toHaveAttribute('aria-current', 'page')
})

test('Instructor evaluations, from More: the TDE report cards’ overview and skills wheel, and the events, which open on My notes (#345)', async ({ page }) => {
  const tde = (id: string, name: string, date: string): EventConfig =>
    ({ ...alpha, id: `${date}_${id}`, name, organizer: 'The Drivers Edge', days: [{ ...alpha.days[0], date }] })
  const jul = tde('jul', 'TDE at MSRC', '2025-07-19')
  const sep = tde('sep', 'TDE at MSRC 2.0', '2025-09-13')
  const oct = tde('oct', 'TDE at Eagles Canyon Raceway', '2025-10-04')
  await stubEvents(page, [...TEST_EVENTS, jul, sep, oct])
  await signInAsAdmin(page)
  const bravo = TEST_EVENTS.find(e => e.name === 'Bravo HPDE')!
  await page.route(/\/api\/rsvps(\?|$)/, route => route.fulfill({ json: { rsvps: { [bravo.id]: { status: 'going' } } } }))
  await page.route(/\/api\/laps(\?|$)/, route => route.fulfill({
    json: new URL(route.request().url()).searchParams.has('event') ? { sessions: [] } : { events: [] },
  }))
  const card = (flags: number, passing: number, inputs: number, vision: number, consistency: number, carControl: number, pace: number, references: number, awareness: number, carAidsPct: number) =>
    ({ instructor: 'John Harms', skills: { flags, passing, inputs, vision, consistency, carControl, pace, references, awareness }, carAidsPct })
  const notes = [
    { eventId: jul.id, evaluation: card(65, 95, 60, 55, 60, 70, 75, 50, 65, 25), sessions: [] },
    { eventId: sep.id, evaluation: card(75, 95, 70, 65, 70, 70, 80, 65, 70, 15), sessions: [] },
    { eventId: oct.id, evaluation: { ...card(90, 100, 80, 60, 85, 75, 85, 80, 85, 10), notes: 'Smoother on the brakes, and much better at picking up flags early.' }, sessions: [] },
    // Not a TDE event: no report card, but its feedback is listed too.
    {
      eventId: alpha.id,
      evaluation: { instructor: 'Sam Ortiz', notes: 'Good day. Carry more speed through the carousel.' },
      sessions: [{
        key: '2026-03-07 08:30 blue', date: '2026-03-07', time: '08:30', group: 'blue', sessionNumber: 1,
        evaluation: { feedback: 'Unwind the wheel sooner and use all of the exit curb.', instructor: 'Sam Ortiz' },
      }],
    },
  ]
  await page.route(/\/api\/notes(\?|$)/, route => {
    const id = new URL(route.request().url()).searchParams.get('event')
    if (!id) return route.fulfill({ json: { events: notes } })
    const { evaluation, sessions } = notes.find(n => n.eventId === id) ?? { sessions: [] }
    return route.fulfill({ json: { ...(evaluation ? { evaluation } : {}), sessions } })
  })

  await page.goto('/#/more')
  const slide = await trackSlide(page, () => page.getByRole('link', { name: /^Instructor evaluations/ }).click(), 'Instructor evaluations')
  expect(slide).toEqual({ fromBelow: false, fromSide: true })
  const overview = page.getByRole('region', { name: 'Report card overview' })
  await expect(overview.getByRole('region', { name: 'Most improved' }).getByRole('listitem'))
    .toHaveText([/References\s*\+30/, /Flags\s*\+25/, /Consistency\s*\+25/])
  await expect(overview.getByRole('region', { name: 'Needs work' }).getByRole('listitem'))
    .toHaveText([/Vision\s*60%/, /Car control\s*75%/, /Inputs\s*80%/])

  const wheel = page.getByRole('region', { name: 'Skills wheel' })
  // Every skill's name is on the card, clear of its edges and of the others.
  const names = wheel.locator('[data-spoke]')
  await expect(names).toHaveCount(9)
  const frame = (await wheel.boundingBox())!
  const boxes = await names.evaluateAll(els => els.map(el => el.getBoundingClientRect().toJSON() as DOMRect))
  for (const b of boxes) {
    expect(b.left).toBeGreaterThanOrEqual(frame.x)
    expect(b.right).toBeLessThanOrEqual(frame.x + frame.width)
  }
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
    const [a, b] = [boxes[i], boxes[j]]
    expect(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top).toBe(true)
  }
  // Every card is drawn, each with its own marker; a tap on a skill lists it at every event.
  await expect(wheel.locator('[data-card]')).toHaveCount(3)
  const chips = wheel.getByRole('group', { name: 'Report cards shown' }).getByRole('button')
  await expect(wheel.getByRole('group', { name: 'Report cards shown' }).getByRole('button', { pressed: true })).toHaveText(['All', /Oct 4/, /Sep 13/, /Jul 19/])
  // Picked, a chip is filled black, as a picked skill's name is.
  await expect(chips.nth(1)).toHaveCSS('background-color', 'rgb(17, 24, 39)')
  await chips.nth(1).click()
  await expect(chips.nth(1)).toHaveCSS('background-color', 'rgb(255, 255, 255)')
  await chips.nth(1).click()
  expect(await wheel.getByRole('group', { name: 'Report cards shown' }).locator('[data-shape]').evaluateAll(els => els.map(el => el.getAttribute('data-shape'))))
    .toEqual(['circle', 'square', 'triangle'])
  await wheel.getByRole('button', { name: 'Calls out all flags' }).click()
  await expect(wheel.getByRole('region', { name: 'Calls out all flags at each event' }).getByRole('listitem'))
    .toHaveText([/Oct 4, 2025.*\+15\s*90%/, /Sep 13, 2025.*\+10\s*75%/, /Jul 19, 2025.*65%/])
  // Each on a bar, 0% to 100%: the gain since the event before hatched on, a drop hatched light.
  await wheel.getByRole('button', { name: 'Looks ahead' }).click()
  const vision = wheel.getByRole('region', { name: 'Looks ahead at each event' })
  await expect(vision.getByRole('listitem')).toHaveText([/Oct 4, 2025.*−5\s*60%/, /Sep 13, 2025.*\+10\s*65%/, /Jul 19, 2025.*55%/])
  const bars = await vision.locator('[data-bar]').evaluateAll(els => els.map(el => {
    const track = el.getBoundingClientRect()
    const [solid, change] = [...el.children].map(c => c.getBoundingClientRect())
    const pct = (px: number) => Math.round((px / track.width) * 100)
    return { solid: pct(solid.width), change: change ? [el.children[1].getAttribute('data-change'), pct(change.left - track.left), pct(change.width)] : null }
  }))
  expect(bars).toEqual([
    { solid: 60, change: ['loss', 60, 5] },
    { solid: 55, change: ['gain', 55, 10] },
    { solid: 55, change: null },
  ])
  await expect(vision).toContainText('Up since the event before')
  await expect(vision).toContainText('Down since the event before')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)

  // The events, newest first; one opens on My notes, and Back comes back.
  const feedback = page.getByRole('region', { name: 'Events' })
  const events = feedback.getByRole('link')
  // Bravo has no evaluation, but they drove it: it's there to add one to.
  await expect(events).toHaveText([/Alpha Track Day/, /Bravo HPDE/, /TDE at Eagles Canyon Raceway/, /TDE at MSRC 2\.0/, /TDE at MSRC/])
  await expect(feedback.getByRole('article', { name: 'Bravo HPDE' }).getByRole('button', { name: /^Add instructor evaluation/ })).toBeVisible()
  const alphaCard = feedback.getByRole('article', { name: 'Alpha Track Day' })
  await expect(alphaCard.getByRole('listitem')).toHaveText([
    /^Sam Ortiz\s*Good day\. Carry more speed/,
    /Session 1 · 8:30 AM.*Sam Ortiz.*Unwind the wheel sooner/,
  ])
  await events.nth(2).click()
  await expect(page).toHaveURL(new RegExp(`#/event/${oct.id}$`))
  await expect(page.getByRole('region', { name: 'Instructor evaluation' })).toContainText('John Harms')
  await page.getByRole('button', { name: 'Back' }).last().click()
  await expect(page).toHaveURL(/#\/evaluations$/)
  await expect(wheel).toBeVisible()

  // Adding one to Bravo opens its My notes with the form up.
  await feedback.getByRole('article', { name: 'Bravo HPDE' }).getByRole('button', { name: /^Add instructor evaluation/ }).click()
  await expect(page).toHaveURL(new RegExp(`#/event/${bravo.id}$`))
  await expect(page.getByRole('dialog', { name: 'Instructor evaluation' })).toBeVisible()
})

test('My events shows the run group they’re in on each card (#330), and Past how many they attended (#331)', async ({ page }) => {
  const withGroups: EventConfig = {
    id: `${isoInDays(20)}_group-day`,
    name: 'Group Day',
    runGroups: alpha.runGroups,
    days: [{ ...alpha.days[0], date: isoInDays(20) }],
  }
  await stubEvents(page, [withGroups, upcoming, ...TEST_EVENTS])
  await signInAsAdmin(page)
  // Going to Group Day in Blue; drove Alpha in Red, and Bravo with no group said.
  await page.route(/\/api\/rsvps(\?|$)/, route => route.fulfill({ json: { rsvps: {
    [withGroups.id]: { status: 'going', runGroup: 'blue' },
    [upcoming.id]: { status: 'maybe' },
    [alpha.id]: { status: 'going', runGroup: 'red' },
    [TEST_EVENTS[1].id]: { status: 'going' },
  } } }))

  await page.goto('/#/')
  await page.getByRole('button', { name: 'All', exact: true }).click()
  const groupDay = page.getByRole('button', { name: /Group Day/ })
  const alphaCard = page.getByRole('button', { name: new RegExp(alpha.name) })
  const bravoCard = page.getByRole('button', { name: new RegExp(TEST_EVENTS[1].name) })
  await expect(groupDay).toBeVisible()
  // Both past events, whichever filter is on.
  await expect(page.getByText('2 events attended')).toBeVisible()
  // All: no run groups on the cards.
  await expect(groupDay.getByText('Blue', { exact: true })).toHaveCount(0)
  await expect(alphaCard.getByText('Red', { exact: true })).toHaveCount(0)

  await page.getByRole('button', { name: 'My events' }).click()
  await expect(groupDay.getByText('Blue', { exact: true })).toBeVisible()
  await expect(alphaCard.getByText('Red', { exact: true })).toBeVisible()
  // Before the organizer, as on a track's page.
  await expect(alphaCard.getByText('Red', { exact: true }).locator('xpath=following-sibling::*[1]')).toHaveText(alpha.organizer!)
  // No group said, no badge.
  await expect(bravoCard.getByText('Red', { exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: /Upcoming Track Day/ })).toBeVisible()
  await expect(page.getByText('2 events attended')).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})

test('a driver joins events from the list or the event’s header — going, maybe or not — with their run group; My events has theirs (#235)', async ({ page }) => {
  const withGroups: EventConfig = {
    id: `${isoInDays(20)}_group-day`,
    name: 'Group Day',
    runGroups: alpha.runGroups,
    days: [{ ...alpha.days[0], date: isoInDays(20) }],
  }
  await stubEvents(page, [withGroups, upcoming, ...TEST_EVENTS])
  await signInAsAdmin(page)
  // Went to Alpha; not going to Bravo.
  const rsvps: Record<string, { status: string; runGroup?: string }> = {
    [alpha.id]: { status: 'going' },
    [TEST_EVENTS[1].id]: { status: 'not-going' },
  }
  await page.route(/\/api\/rsvps(\?|$)/, async route => {
    const req = route.request()
    expect(req.headers().authorization).toBe('Bearer token')
    if (req.method() === 'PUT') {
      const id = new URL(req.url()).searchParams.get('event')!
      rsvps[id] = req.postDataJSON()
      return route.fulfill({ json: { rsvp: rsvps[id] } })
    }
    return route.fulfill({ json: { rsvps } })
  })

  // An event's own page, over the list.
  const eventPage = (name: string) => page.locator('div.fixed.inset-0', { has: page.getByRole('heading', { level: 1, name }) })

  await page.goto('/#/')
  // Both upcoming events are waiting on an answer: Join event on each.
  const join = page.getByRole('button', { name: 'Join event' })
  await expect(join).toHaveCount(2)
  // The soonest first: Upcoming Track Day. Maybe — it's on the waitlist.
  await join.first().click()
  const choices = page.getByRole('dialog', { name: 'Are you going?' })
  await expect(choices.getByRole('radio')).toHaveText(['Going', /^Maybe/, 'Not going'])
  await choices.getByRole('radio', { name: /^Maybe/ }).click()
  await expect(choices).toBeHidden()
  expect(rsvps[upcoming.id]).toEqual({ status: 'maybe' })
  // It stays on the list, in sentence case, and didn't open the event.
  await expect(page.getByRole('button', { name: /Upcoming Track Day.*Maybe$/ })).toBeVisible()
  await expect(page).toHaveURL(/#\/$/)
  await expect(join).toHaveCount(1)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)

  await page.getByRole('button', { name: 'My events' }).click()
  await expect(page.getByRole('button', { name: 'My events' })).toHaveAttribute('aria-pressed', 'true')
  // Theirs: maybe, still asking, and Alpha — not Bravo.
  await expect(page.getByRole('button', { name: /Group Day/ })).toBeVisible()
  await expect(page.getByRole('button', { name: /Upcoming Track Day/ })).toBeVisible()
  await expect(page.getByRole('button', { name: new RegExp(alpha.name) })).toBeVisible()
  await expect(page.getByRole('button', { name: new RegExp(TEST_EVENTS[1].name) })).toHaveCount(0)

  // In the event's header: Join event, then going, and their run group.
  await page.getByRole('button', { name: /Group Day/ }).click()
  const groupDay = eventPage('Group Day')
  await groupDay.getByRole('button', { name: 'Join event' }).click()
  await choices.getByRole('radio', { name: 'Going', exact: true }).click()
  // Stays open for the run group.
  await choices.getByRole('radio', { name: 'Blue' }).click()
  await expect(choices).toBeHidden()
  expect(rsvps[withGroups.id]).toEqual({ status: 'going', runGroup: 'blue' })
  await expect(groupDay.getByRole('button', { name: /^Going.*Blue/ })).toBeVisible()
  // The schedule shows their group's sessions.
  await expect(groupDay.getByRole('button', { name: /All run groups/ })).toHaveCount(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)

  // Back on the list, it's theirs: going, not asking.
  await page.getByRole('button', { name: 'Back' }).click()
  await expect(page.getByRole('button', { name: /Group Day.*Going$/ })).toBeVisible()
  await expect(join).toHaveCount(0)

  // Not going to the other after all: it leaves My events.
  await page.getByRole('button', { name: /Upcoming Track Day/ }).click()
  const upcomingPage = eventPage('Upcoming Track Day')
  await upcomingPage.getByRole('button', { name: /^Maybe/ }).click()
  await choices.getByRole('radio', { name: 'Not going' }).click()
  await expect(upcomingPage.getByRole('button', { name: /^Not going/ })).toBeVisible()
  await page.getByRole('button', { name: 'Back' }).click()
  await expect(page.getByRole('button', { name: /Group Day/ })).toBeVisible()
  await expect(page.getByRole('button', { name: /Upcoming Track Day/ })).toHaveCount(0)

  // A past event: whether they drove it.
  await page.getByRole('button', { name: 'All', exact: true }).click()
  await page.getByRole('button', { name: new RegExp(TEST_EVENTS[1].name) }).click()
  const bravo = eventPage(TEST_EVENTS[1].name)
  await bravo.getByRole('button', { name: /^Didn’t drive/ }).click()
  await expect(page.getByRole('dialog', { name: 'Did you drive this event?' }).getByRole('radio'))
    .toHaveText(['I drove', 'I didn’t drive'])
})

// A short tab could fold the title into the top bar but not scroll the
// empty title block away, leaving a white gap over the tabs (#305). Every
// event page has room to scroll it all the way: the tabs end up right
// under the top bar.
test('a short tab folds the event header all the way', async ({ page }) => {
  await stubEvents(page)
  await page.goto(`/#/event/${alpha.id}`)
  const heading = page.getByRole('heading', { level: 1, name: alpha.name })
  await heading.waitFor()
  await page.getByRole('tab', { name: 'Details' }).click()
  const scroller = heading.locator('xpath=ancestor::div[contains(@class, "fixed")][1]')
  await scroller.evaluate(el => el.scrollTo(0, el.scrollHeight))
  // The top bar is 52px tall; the tabs stick right under it.
  const tabs = page.getByRole('tablist', { name: 'Event section' })
  await expect.poll(async () => Math.round((await tabs.boundingBox())!.y)).toBe(52)
})

// Left partway through the title block, the header snaps (#305): folded
// the rest of the way once the title has faded (48px), open again before.
test('a half-folded event header snaps shut or open', async ({ page }) => {
  await stubEvents(page)
  await page.goto(`/#/event/${alpha.id}`)
  const heading = page.getByRole('heading', { level: 1, name: alpha.name })
  await heading.waitFor()
  const scroller = heading.locator('xpath=ancestor::div[contains(@class, "fixed")][1]')
  const tabs = page.getByRole('tablist', { name: 'Event section' })

  await scroller.evaluate(el => el.scrollTo(0, 60))
  await expect.poll(() => scroller.evaluate(el => el.scrollTop)).toBe(96)
  await expect.poll(async () => Math.round((await tabs.boundingBox())!.y)).toBe(52)

  await scroller.evaluate(el => el.scrollTo(0, 30))
  await expect.poll(() => scroller.evaluate(el => el.scrollTop)).toBe(0)
  await expect(heading).toBeVisible()
})

// The Add to Home Screen strip (#379), in Safari on an iPhone running iOS 18
// (both runs borrow its user agent: Playwright's iPhone says Safari 26, whose
// steps go through ⋯). The other tests start with it dismissed
// (e2e/fixtures.ts).
test('the checkers pulse while the app loads, and go once it has (#365)', async ({ page }) => {
  await stubEvents(page)
  // The app's script held back, as on a slow first open from the Home Screen.
  let release!: () => void
  const held = new Promise<void>(resolve => { release = resolve })
  await page.route(/\/assets\/index-[^/]*\.js$/, async route => {
    await held
    await route.continue()
  })
  await page.goto('/#/', { waitUntil: 'commit' })
  const loader = page.getByRole('progressbar', { name: 'Loading' })
  await expect(loader).toBeVisible()
  // Centered, on the page's gray, and pulsing.
  const box = (await loader.locator('svg').boundingBox())!
  const viewport = page.viewportSize()!
  expect(Math.round(box.x + box.width / 2)).toBe(Math.round(viewport.width / 2))
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(249, 250, 251)')
  expect(await loader.locator('svg').evaluate(el => getComputedStyle(el).animationName)).toBe('boot-pulse')
  release()
  await expect(page.getByRole('button', { name: /Upcoming Track Day/ })).toBeVisible()
  await expect(loader).toHaveCount(0)
})

test('in the Home Screen app, the loader’s checkers sit at the middle of the screen, where the launch image has them (#365)', async ({ page }) => {
  // The app starts below the status bar: the screen is 47pt taller than the page.
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'standalone', { get: () => true })
    Object.defineProperty(Screen.prototype, 'height', { get: () => window.innerHeight + 47 })
  })
  await stubEvents(page)
  await page.route(/\/assets\/index-[^/]*\.js$/, () => {})
  await page.goto('/#/', { waitUntil: 'commit' })
  const checkers = page.getByRole('progressbar', { name: 'Loading' }).locator('svg')
  await expect(checkers).toBeVisible()
  // Half the status bar higher than the page's middle: the screen's middle.
  const box = (await checkers.boundingBox())!
  const innerHeight = await page.evaluate(() => window.innerHeight)
  expect(Math.round(box.y + box.height / 2)).toBe(Math.round((innerHeight - 47) / 2))
})

test.describe('Add to Home Screen banner (#379)', () => {
  test.use({
    homeScreenBanner: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Mobile/15E148 Safari/604.1',
  })

  test('runs across the top with the steps, and stays away once dismissed', async ({ page }) => {
    await stubEvents(page)
    await page.goto('/#/')
    const banner = page.getByRole('region', { name: 'Add to Home Screen' })
    await expect(banner).toBeVisible()
    await expect(banner).toContainText('Tap then “Add to Home Screen”')
    // Edge to edge, above the title.
    const box = (await banner.boundingBox())!
    expect(box.x).toBe(0)
    expect(box.width).toBe(page.viewportSize()!.width)
    const title = page.getByRole('heading', { name: 'HPDE Events', level: 1 })
    expect(box.y + box.height).toBeLessThanOrEqual((await title.boundingBox())!.y)

    await banner.getByRole('button', { name: 'Dismiss' }).click()
    await expect(banner).toBeHidden()
    await page.reload()
    await expect(page.getByRole('button', { name: /Upcoming Track Day/ })).toBeVisible()
    await expect(banner).toHaveCount(0)
  })

  test('never shows in the Home Screen app', async ({ page }) => {
    await page.addInitScript(() => Object.defineProperty(navigator, 'standalone', { get: () => true }))
    await stubEvents(page)
    await page.goto('/#/')
    await expect(page.getByRole('button', { name: /Upcoming Track Day/ })).toBeVisible()
    await expect(page.getByRole('region', { name: 'Add to Home Screen' })).toHaveCount(0)
  })
})

test('a car’s page opened from one of its events, after another of its events, slides all the way in (#380)', async ({ page }) => {
  const [first, second] = TEST_EVENTS
  await stubEvents(page, [first, second])
  await signInAsAdmin(page)
  await page.route(/\/api\/laps(\?|$)/, route => route.fulfill({
    json: new URL(route.request().url()).searchParams.has('event') ? { sessions: [] } : { events: [] },
  }))
  const car = { id: 'car1', make: 'Porsche', model: 'Cayman', nickname: 'The Cayman' }
  await page.route(/\/api\/garage(\?|$)/, route => route.fulfill({
    json: { cars: [car], events: { [first.id]: { carId: 'car1' }, [second.id]: { carId: 'car1' } } },
  }))
  const carPage = page.locator('.fixed.inset-0', { has: page.getByRole('heading', { level: 1, name: 'The Cayman' }) })
  const openCar = async () => {
    await page.locator('.fixed.inset-0', { has: page.getByRole('button', { name: 'Your car: The Cayman' }) }).last()
      .getByRole('button', { name: 'Your car: The Cayman' }).click()
    await page.getByRole('dialog', { name: 'Your car' }).getByRole('button', { name: 'The Cayman: car details' }).click()
    await expect(page).toHaveURL(/#\/garage\/car1$/)
    // In place, not left where it would be under another page.
    await expect.poll(() => carPage.evaluate(el => el.getBoundingClientRect().left)).toBe(0)
  }

  // The first event, its car's page, and another of the car's events over it…
  await page.goto(`/#/event/${first.id}`)
  await page.getByRole('tab', { name: /My notes/ }).click()
  await openCar()
  await carPage.getByRole('tab', { name: 'Events' }).click()
  await carPage.getByRole('tabpanel').getByRole('button', { name: new RegExp(second.name) }).click()
  await expect(page).toHaveURL(new RegExp(`#/event/${second.id}$`))
  // …which has the Garage under the car's page now: the car's page still opens over it.
  await openCar()
  // All of it, across: its top bar (which stays at the top, wherever the
  // page was left scrolled) is wholly on screen, Back to its "…".
  await expect(carPage.getByRole('button', { name: 'Back' })).toBeInViewport({ ratio: 1 })
  await expect(carPage.getByRole('button', { name: 'More actions' })).toBeInViewport({ ratio: 1 })
  await carPage.getByRole('button', { name: 'Back' }).click()
  await expect(page).toHaveURL(/#\/garage$/)
  await expect(page.getByRole('list', { name: 'Cars' })).toBeInViewport()
})
