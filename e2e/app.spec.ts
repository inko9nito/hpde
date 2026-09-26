import type { Page } from '@playwright/test'
import { test, expect } from './fixtures'
import { TEST_EVENTS } from '../src/test/events'
import { RUN_GROUP_BG_CLASSES, RUN_GROUP_TEXT_CLASSES } from '../src/theme/runGroupColors'
import { resolveTailwindBgColor } from '../src/utils/eventsJson'
import { applySchedule } from '../src/utils/scheduleEditor'
import { editDetails } from '../netlify/lib/newEvent.mjs'
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

test('the landing menu slides up, and Share slides up over the list (#273, #278)', async ({ page }) => {
  await stubEvents(page)
  await page.goto('/#/')
  await page.getByRole('button', { name: 'Menu' }).click()
  await page.getByRole('dialog', { name: 'Menu' }).getByRole('link', { name: 'Share' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'Share' })).toBeInViewport()
  await expect(page.getByText('https://myhpde.netlify.app/')).toBeVisible()
  await page.getByRole('link', { name: 'Close' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'Share' })).toHaveCount(0)
  await expect(page.getByRole('heading', { level: 1, name: 'HPDE Events' })).toBeInViewport()
})

test('anyone can share an event’s own link from its menu (#273)', async ({ page }) => {
  await stubEvents(page)
  await page.goto(`/#/event/${upcoming.id}`)
  await page.getByRole('button', { name: 'More actions' }).click()
  await page.getByRole('menuitem', { name: 'Share' }).click()
  await expect(page).toHaveURL(new RegExp(`#/event/${upcoming.id}/share$`))
  await expect(page.getByText(`https://myhpde.netlify.app/#/event/${upcoming.id}`)).toBeVisible()
  await expect(page.locator('img[src^="data:image/png"]')).toBeVisible()
  await page.getByRole('link', { name: 'Close' }).click()
  await expect(page).toHaveURL(new RegExp(`#/event/${upcoming.id}$`))
  await expect(page.getByText('Schedule coming soon')).toBeInViewport()
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

// Follows the page that `open()` brings in, frame by frame, until it
// settles: which way it moved, and where it ended up.
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
        if (top > 1) fromBelow = true
        if (left > 1) fromSide = true
        const at = `${top},${left}`
        still = at === last ? still + 1 : 0
        last = at
        if (still > 10 && top === 0 && left === 0) return resolve({ fromBelow, fromSide })
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

  await page.getByRole('button', { name: 'Close' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'New event' })).toHaveCount(0)
  await expect(page).toHaveURL(/#\/$/)
  await expect(add).toBeInViewport()
})

test('Share and the iOS widget slide up from the bottom (#278)', async ({ page }) => {
  await stubEvents(page)
  await page.goto('/#/')
  const menu = page.getByRole('dialog', { name: 'Menu' })
  for (const [item, heading] of [['Share', 'Share'], ['Get iOS widget', 'iOS widget']]) {
    await page.getByRole('button', { name: 'Menu' }).click()
    const link = menu.getByRole('link', { name: item })
    const slide = await trackSlide(page, () => link.click(), heading)
    expect(slide).toEqual({ fromBelow: true, fromSide: false })
    await page.getByRole('link', { name: 'Close' }).click()
    await expect(page.getByRole('heading', { level: 1, name: 'HPDE Events' })).toBeInViewport()
  }
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

  await page.getByRole('link', { name: 'Add schedule' }).click()
  const textarea = page.getByRole('textbox', { name: 'Schedule' })
  await expect(textarea).toHaveValue(new RegExp(`## ${upcoming.days[0].label} \\| ${upcoming.days[0].date}`))
  // 16px, or iOS zooms the page in when a field is tapped.
  await expect(textarea).toHaveCSS('font-size', '16px')

  // Uncomment the examples, the way it's meant to be used on a phone, with
  // a typo to fix.
  const text = (await textarea.inputValue()).replace(/\/\/ (\d{1,2}:\d\d|break)/g, '$1')
  await textarea.fill(text.replace('7:00 AM general', '7:00 general'))
  await expect(page.getByRole('list', { name: 'Problems' })).toContainText('“7:00” needs AM or PM')
  await expect(page.getByRole('button', { name: 'Save schedule' })).toBeDisabled()
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

  // Scrolled all the way down, the Edit / Preview tabs are still on screen.
  const scrollRoot = page.locator('[data-scroll-root]')
  await scrollRoot.evaluate(el => el.scrollTo(0, el.scrollHeight))
  await expect.poll(() => scrollRoot.evaluate(el => el.scrollTop)).toBeGreaterThan(0)
  await expect(page.getByRole('tab', { name: 'Preview' })).toBeInViewport()
  // Nothing wider than the screen.
  expect(await scrollRoot.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true)

  await page.getByRole('tab', { name: 'Preview' }).click()
  await expect(page.getByText('Registration & tech')).toBeVisible()
  await expect(page.getByText('Novice', { exact: true }).first()).toHaveCSS('background-color', hexToRgb(resolveTailwindBgColor('bg-rungreen-500')))
  expect(await scrollRoot.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true)

  await page.getByRole('button', { name: 'Save schedule' }).click()
  await expect(page.getByText('Schedule saved')).toBeVisible()
  await expect(page).toHaveURL(new RegExp(`#/event/${upcoming.id}$`))
  await expect(page.getByText('Registration & tech')).toBeVisible()
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
  await page.getByRole('button', { name: 'More actions' }).click()
  await page.getByRole('menuitem', { name: 'Edit details' }).click()
  await expect(page.getByRole('heading', { name: 'Edit details' })).toBeVisible()
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
  const sheet = page.getByRole('dialog', { name: '8:30 AM · Blue' })
  await expect(sheet).toBeVisible()
  // A sheet along the bottom of the screen, as wide as the phone at most.
  const viewport = page.viewportSize()!
  await expect.poll(async () => {
    const box = (await sheet.boundingBox())!
    return Math.round(box.y + box.height)
  }).toBe(viewport.height)

  await sheet.getByLabel('Lap times or timestamps').fill([
    'Lap\tStart Crossing\tFinish Crossing\tLap Time\tNotes',
    'Out\t8:31:02 AM\t8:33:20 AM\t2:18\tCold tires',
    '1\t8:33:20 AM\t8:35:12 AM\t1:52\t',
    '2\t8:35:12 AM\t8:36:58 AM\t1:46\tClean lap',
  ].join('\n'))
  const read = sheet.getByRole('region', { name: 'Laps read' })
  await expect(read.getByRole('definition')).toHaveText(['2', '1:49.0', '1:46'])
  await expect(read.getByRole('row', { name: /^2 / })).toContainText('Clean lap')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await sheet.getByRole('button', { name: 'Save lap times' }).click()

  await expect(sheet).toBeHidden()
  await expect(page.getByRole('status')).toHaveText('Lap times saved')
  await expect(page.getByRole('button', { name: 'Lap times: 8:30 AM, Blue (saved)' })).toBeVisible()

  await page.getByRole('tab', { name: 'My notes (1)' }).click()
  const card = page.getByRole('region', { name: 'Session 1, 8:30 AM' })
  await expect(card.getByRole('definition')).toHaveText(['2', '1:49.0', '1:46'])
  // Tapping anywhere on the figures opens the laps (the toggle covers them).
  const figure = (await card.getByRole('definition').first().boundingBox())!
  await page.mouse.click(figure.x + 4, figure.y + 4)
  await expect(card.getByRole('button', { name: 'Hide laps for Session 1' })).toHaveAttribute('aria-expanded', 'true')
  await expect(card.getByRole('row', { name: /^2 / })).toContainText('Clean lap')
  await expect(page.getByRole('group', { name: 'Best lap this event' })).toContainText('1:46')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})

test('an admin logs another driver’s lap times, picked in the sheet (#288)', async ({ page }) => {
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

  await page.goto(`/#/event/${alpha.id}`)
  await page.getByRole('button', { name: 'Lap times: 8:30 AM, Blue' }).click()
  const sheet = page.getByRole('dialog', { name: '8:30 AM · Blue' })
  const picker = sheet.getByLabel('Driver')
  await expect(picker.getByRole('option')).toHaveText(['Me', email])
  await picker.selectOption({ label: email })
  await expect(sheet).toContainText(`Only ${email} and admins can see these lap times.`)
  await sheet.getByLabel('Lap times or timestamps').fill('1:24.51, 1:23.84')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await sheet.getByRole('button', { name: 'Save lap times' }).click()

  await expect(sheet).toBeHidden()
  const toast = page.getByRole('status')
  await expect(toast).toHaveText(`Lap times saved for ${email}`)
  // It wraps rather than running off the screen.
  const pill = (await toast.locator('> div').boundingBox())!
  expect(pill.x).toBeGreaterThanOrEqual(0)
  expect(pill.x + pill.width).toBeLessThanOrEqual(page.viewportSize()!.width)
  expect(Object.keys(laps)).toEqual([jason])
  // The schedule marks Jason's laps, and says so above them.
  await expect(page.getByRole('button', { name: 'Lap times: 8:30 AM, Blue (saved)' })).toBeVisible()
  await expect(page.getByLabel('Driver')).toHaveValue(jason)
  await expect(page.getByLabel('Driver')).toBeInViewport()

  await page.getByRole('tab', { name: 'My notes (1)' }).click()
  await expect(page.getByLabel('Driver')).toHaveValue(jason)
  await expect(page.getByRole('group', { name: 'Best lap this event' })).toContainText('1:23.84')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)

  // Back to the admin's own: none yet.
  await page.getByLabel('Driver').selectOption({ label: 'Me' })
  await expect(page.getByText('No lap times yet')).toBeVisible()
})
