// Load-and-render smoke test for the Scriptable widget.
//
// Regression guard against ReferenceError / TDZ / "cannot access
// uninitialized variable" errors that node's syntax check misses
// but Scriptable hits the first time the user pastes the script
// into the app. `node -c` only parses; the widget's top-level
// `const` declarations only trigger TDZ at execution time.
//
// The mocks below are a minimum Scriptable surface (Color, Size,
// Font, Device, FileManager, Request, ListWidget, WidgetStack,
// SFSymbol, config, Script, args) — just enough for the module to
// load and for makeWidget to walk its full render tree without
// throwing. They don't render anything visual; they exist to
// exercise every module-level initializer and every code path the
// render loop hits on typical data.

import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const widgetSrc = readFileSync(join(__dirname, 'hpde-widget.js'), 'utf8')

function installScriptableMocks(manifest: unknown, widgetParameter: string | null = null) {
  const g = globalThis as any
  g.Color = class { constructor(_hex?: string, _alpha?: number) {} }
  g.Size = class {
    width: number; height: number
    constructor(w: number, h: number) { this.width = w; this.height = h }
  }
  const fontStub = () => ({})
  g.Font = {
    systemFont: fontStub, mediumSystemFont: fontStub,
    semiboldSystemFont: fontStub, boldSystemFont: fontStub,
    regularRoundedSystemFont: fontStub, mediumRoundedSystemFont: fontStub,
    semiboldRoundedSystemFont: fontStub, boldRoundedSystemFont: fontStub,
    heavyRoundedSystemFont: fontStub,
  }
  g.Device = {
    isUsingDarkAppearance: () => false,
    screenSize: () => ({ width: 390, height: 844 }),
  }
  g.FileManager = {
    iCloud: () => { throw new Error('no iCloud in test') },
    local: () => ({
      documentsDirectory: () => '/tmp',
      joinPath: (a: string, b: string) => `${a}/${b}`,
      fileExists: () => true,
      readString: () => JSON.stringify(manifest),
      writeString: () => {},
    }),
  }
  g.Request = class {
    timeoutInterval = 0
    async loadJSON() { throw new Error('simulate offline → fall back to cache') }
  }
  // Records every addText() call's string so tests can assert on what
  // actually got rendered (which family shows which copy, whether a
  // field got truncated to something implausible, etc.) — the mock
  // used to just return a blank stub, so a test could confirm the
  // render didn't throw but never what it actually said.
  g.__texts = [] as string[]
  const textStub = (text: string) => {
    g.__texts.push(text)
    return { font: null, textColor: null, lineLimit: 0, textOpacity: 1 }
  }
  const imageStub = () => ({ imageSize: null, tintColor: null, imageOpacity: 1 })
  // Records every cornerRadius/height a stack is given, so tests can
  // assert on structural claims the text-content checks can't reach —
  // e.g. "Small has no card container" (no stack gets the card's corner
  // radius) or "cards aren't forced to a fixed height" (no stack gets a
  // non-zero Size height). Both were real bugs a visual render caught
  // that these assertions previously couldn't have.
  g.__cornerRadii = [] as number[]
  g.__sizeHeights = [] as number[]
  // Records {cornerRadius, width, height} together per stack instance
  // (not just flat arrays) so a test can ask "did the stack with THIS
  // cornerRadius ever get an explicit width" — e.g. "the well
  // (cornerRadius 16) never gets a fixed width," which the separate
  // __cornerRadii/__sizeHeights arrays can't express since they don't
  // say which stack a given size belongs to.
  g.__stackSizes = [] as Array<{ cornerRadius: number | null; width: number; height: number }>
  class StackStub {
    _cornerRadius: number | null = null
    addStack() { return new StackStub() }
    addText(text: string) { return textStub(text) }
    addImage() { return imageStub() }
    addSpacer(_n?: number) {}
    setPadding() {}
    layoutVertically() {}
    centerAlignContent() {}
    topAlignContent() {}
    bottomAlignContent() {}
    set backgroundColor(_v) {}
    set borderColor(_v) {}
    set borderWidth(_v) {}
    set cornerRadius(v: number) { this._cornerRadius = v; g.__cornerRadii.push(v) }
    set size(v: { width: number; height: number }) {
      g.__sizeHeights.push(v.height)
      g.__stackSizes.push({ cornerRadius: this._cornerRadius, width: v.width, height: v.height })
    }
    set spacing(_v) {}
    set url(_v) {}
  }
  g.WidgetStack = StackStub
  g.ListWidget = class {
    addStack() { return new StackStub() }
    addText(text: string) { return textStub(text) }
    addSpacer(_n?: number) {}
    setPadding() {}
    set backgroundColor(_v) {}
    set refreshAfterDate(_v) {}
    set url(_v) {}
    async presentMedium() {}
    async presentLarge() {}
  }
  g.SFSymbol = { named: () => ({ image: {} }) }
  // Records what the widget draws (the header's checkered flag).
  g.__drawn = [] as Array<{ fills: number; opaque: boolean; respectScreenScale: boolean }>
  g.Point = class { constructor(public x: number, public y: number) {} }
  g.Path = class {
    move() {}
    addLine() {}
    addCurve() {}
    closeSubpath() {}
  }
  g.DrawContext = class {
    size: unknown = null
    opaque = true
    respectScreenScale = false
    fills = 0
    setFillColor() {}
    addPath() {}
    fillPath() { this.fills++ }
    getImage() {
      g.__drawn.push({ fills: this.fills, opaque: this.opaque, respectScreenScale: this.respectScreenScale })
      return {}
    }
  }
  g.Script = { setWidget: () => {}, complete: () => {} }
  g.args = { widgetParameter }
  class NotificationStub {
    identifier = ''
    title = ''
    body = ''
    threadIdentifier = ''
    sound: string | null = null
    openURL = ''
    deliveryDate: Date | null = null
    nextTriggerDate: Date | null = null
    setTriggerDate(d: Date) { this.nextTriggerDate = d }
    async schedule() {
      if (!this.nextTriggerDate) {
        // Guardrail: the real Scriptable API delivers immediately when
        // no trigger date is set, which is what happened in production
        // before we switched from deliveryDate= to setTriggerDate().
        throw new Error('missing setTriggerDate — would fire immediately')
      }
      g.__scheduled = (g.__scheduled || 0) + 1
      g.__notifs.push({
        identifier: this.identifier,
        title: this.title,
        body: this.body,
        sound: this.sound,
        nextTriggerDate: this.nextTriggerDate,
      })
    }
  }
  ;(NotificationStub as any).allPending = async () => []
  ;(NotificationStub as any).removePending = async (_: string[]) => {}
  g.Notification = NotificationStub
  g.__scheduled = 0
  g.__notifs = []
}

async function runWidget(widgetFamily: string, manifest: unknown, widgetParameter: string | null = null) {
  installScriptableMocks(manifest, widgetParameter)
  ;(globalThis as any).config = { widgetFamily, runsInWidget: false }
  // Widget script uses top-level await; wrap in an async IIFE so
  // it can be evaled and awaited from here.
  const wrapped = `(async () => { ${widgetSrc} })()`
  // eslint-disable-next-line no-eval
  await eval(wrapped)
}

function isoDate(offsetDays: number): string {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return d.toISOString().slice(0, 10)
}

const today = isoDate(0)
const future = isoDate(30)

const RICH_MANIFEST = {
  events: [{
    id: 'test-event',
    name: 'TEST — DELETE ME',
    runGroups: [
      { id: 'red', label: 'Red', color: '#ef4444' },
      { id: 'green', label: 'Green', color: '#22c55e' },
      { id: 'purple', label: 'Purple', color: '#8b5cf6' },
      { id: 'orange', label: 'Orange', color: '#f97316' },
    ],
    days: [{
      date: today,
      label: 'Friday',
      activities: [
        { time: '01:30', type: 'session', onTrack: ['red'], inClass: ['green'] },
        { time: '02:00', type: 'session', onTrack: ['purple'], inClass: ['orange'] },
        { time: '06:30', type: 'general', label: 'Gates open' },
        { time: '07:00', type: 'general', label: 'Registration' },
        { time: '07:45', type: 'general', label: "Instructor's meeting" },
      ],
    }],
  }],
}

const NO_EVENTS_MANIFEST = { events: [] }

// A manifest whose activities are all in the future (dated 30 days out),
// so notification scheduling produces a deterministic result no matter
// what wall-clock time the test runs at. The widget will render as
// "no event today" — that's fine for the notification-only assertions.
const FUTURE_MANIFEST = {
  events: [{
    id: 'future-event',
    name: 'Future event',
    runGroups: [
      { id: 'red', label: 'Red', color: '#ef4444' },
      { id: 'blue', label: 'Blue', color: '#3b82f6' },
      { id: 'orange', label: 'Orange', color: '#f97316' },
    ],
    days: [{
      date: future,
      label: 'Saturday',
      activities: [
        { time: '08:00', type: 'general', label: 'Drivers meeting', subtitle: 'In clubhouse' },
        { time: '08:30', type: 'session', onTrack: ['red'], inClass: ['blue'] },
        { time: '08:50', type: 'session', onTrack: ['orange'] },
        { time: '09:10', type: 'session', onTrack: ['blue'] },
        { type: 'break', label: '10 minute break' },
        { time: '12:00', type: 'lunch', label: 'Lunch', subtitle: '60 minutes' },
      ],
    }],
  }],
}

// Three future days a week+ apart, across two events, so the
// upcoming/countdown path can be exercised with: a big days-only
// count, a 3-card stack on Large, a full-width well on Small, and a
// "more upcoming" footer for whatever doesn't fit.
const UPCOMING_MULTI_MANIFEST = {
  events: [
    {
      id: 'upcoming-a', name: 'Upcoming A', organizer: 'Org A', track: 'Track A', city: 'City A',
      runGroups: [],
      days: [{ date: isoDate(10), label: 'Monday', activities: [] }],
    },
    {
      id: 'upcoming-b', name: 'Upcoming B', organizer: 'Org B', track: 'Track B',
      runGroups: [],
      days: [{ date: isoDate(17), label: 'Monday', activities: [] }],
    },
    {
      id: 'upcoming-c', name: 'Upcoming C', organizer: 'Org C', track: 'Track C',
      runGroups: [],
      days: [{ date: isoDate(24), label: 'Monday', activities: [] }],
    },
  ],
}

describe('scriptable widget loads and renders', () => {
  it('module loads without a TDZ / reference error', async () => {
    await expect(runWidget('medium', RICH_MANIFEST)).resolves.toBeUndefined()
  })

  it('renders on medium widget family', async () => {
    await expect(runWidget('medium', RICH_MANIFEST)).resolves.toBeUndefined()
  })

  it('renders on large widget family', async () => {
    await expect(runWidget('large', RICH_MANIFEST)).resolves.toBeUndefined()
  })

  it('renders the no-events-today path', async () => {
    await expect(runWidget('medium', NO_EVENTS_MANIFEST)).resolves.toBeUndefined()
  })

  it('zero state reuses the countdown-view header, not a plain "HPDE" title', async () => {
    // Regression guard: renderZeroState used to render its own bespoke
    // "HPDE" title, which meant Small/Medium/Large empty states didn't
    // read as part of the same view as the populated countdown. Every
    // family's zero state should now show the SAME title copy as its
    // countdown-populated counterpart: "Next HPDE" on Small,
    // "Upcoming HPDE events" on Medium/Large. If someone rewires
    // renderZeroState back to a hand-crafted title, this fails.
    for (const [family, expected] of [
      ['small', 'Next HPDE'],
      ['medium', 'Upcoming HPDE events'],
      ['large', 'Upcoming HPDE events'],
    ] as const) {
      await runWidget(family, NO_EVENTS_MANIFEST)
      const texts = (globalThis as any).__texts as string[]
      expect(texts).toContain(expected)
      expect(texts).toContain('No upcoming events')
      // The old bespoke title was just "HPDE" on its own; make sure
      // nobody re-adds it as a separate text alongside the shared
      // header (which would double up).
      expect(texts.filter(t => t === 'HPDE')).toHaveLength(0)
    }
  })

  it('renders the upcoming-events countdown header + card on Medium', async () => {
    await expect(runWidget('medium', FUTURE_MANIFEST)).resolves.toBeUndefined()
  })

  it('renders the upcoming-events countdown header + card on Small', async () => {
    await expect(runWidget('small', FUTURE_MANIFEST)).resolves.toBeUndefined()
  })

  it('renders a single upcoming event as a rich card on Large', async () => {
    await expect(runWidget('large', FUTURE_MANIFEST)).resolves.toBeUndefined()
  })

  it('drops the city from the location row on Small so it never truncates the track name', async () => {
    await runWidget('small', UPCOMING_MULTI_MANIFEST)
    const texts = (globalThis as any).__texts as string[]
    expect(texts).toContain('Track A')
    expect(texts).not.toContain('Track A, City A')
  })

  it('shows the track alone on Medium/Large, like the app\'s Location row (city is only its subtitle there)', async () => {
    for (const family of ['medium', 'large']) {
      await runWidget(family, UPCOMING_MULTI_MANIFEST)
      const texts = (globalThis as any).__texts as string[]
      expect(texts).toContain('Track A')
      expect(texts.some(t => t.includes('City A'))).toBe(false)
    }
  })

  it('drops the organizer row on Small so title + rows + well fit the real interior height', async () => {
    await runWidget('small', UPCOMING_MULTI_MANIFEST)
    const texts = (globalThis as any).__texts as string[]
    expect(texts).not.toContain('Org A')
  })

  it('keeps the organizer row on Medium/Large, where there is room for it', async () => {
    await runWidget('medium', UPCOMING_MULTI_MANIFEST)
    const texts = (globalThis as any).__texts as string[]
    expect(texts).toContain('Org A')
  })

  it('draws no card container around a countdown event on Small', async () => {
    await runWidget('small', UPCOMING_MULTI_MANIFEST)
    const radii = (globalThis as any).__cornerRadii as number[]
    // COUNTDOWN_CARD_RADIUS (20) is only ever applied by drawCountdownCard's
    // container — COUNTDOWN_WELL_RADIUS (16) and COUNTDOWN_BADGE_RADIUS (12)
    // still legitimately appear (the well and the header badge are real,
    // deliberate visual elements, not the removed wrapper).
    expect(radii).not.toContain(20)
  })

  it('keeps the card container around a countdown event on Medium/Large', async () => {
    await runWidget('medium', UPCOMING_MULTI_MANIFEST)
    const radii = (globalThis as any).__cornerRadii as number[]
    expect(radii).toContain(20)
  })

  it('never forces a countdown card to a large explicit height', async () => {
    // A visual render caught the real bug this guards: forcing
    // card.size = new Size(0, cardHeight) made centerAlignContent()
    // center short content inside an oversized box, producing uneven
    // padding above/below the rows. Cards should size to their own
    // content now. Small, fixed decorative heights legitimately remain
    // (the week/day divider line tops out at 28; the Large header's
    // square icon badge is COUNTDOWN_BADGE_SIZE, 40) — a forced card
    // height would be far larger (the old code divided most of a
    // ~130-345pt interior across 1-2 cards), so a ceiling just above
    // the badge still catches the regression without flagging those.
    for (const family of ['small', 'medium', 'large']) {
      await runWidget(family, UPCOMING_MULTI_MANIFEST)
      const heights = (globalThis as any).__sizeHeights as number[]
      expect(heights.every(h => h <= 40)).toBe(true)
    }
  })

  it('never sizes a countdown stack to a width computed for one phone', async () => {
    // #204: the info column was pinned to 228pt (Medium) / 172pt (Large)
    // — the card's interior on a 364pt-wide widget minus a budget for
    // the well. The owner's phone has 329pt-wide widgets, so the well
    // got ~25pt and read "•••" / "DAY…". Widget widths differ by up to
    // 43pt across phones, so explicit widths in this view are only
    // small content-sized constants: the date column's strut (at most
    // 46pt, rich), the hairline, the footer's short rules.
    for (const family of ['small', 'medium', 'large']) {
      for (const manifest of [UPCOMING_MULTI_MANIFEST, FUTURE_MANIFEST]) {
        await runWidget(family, manifest)
        const sizes = (globalThis as any).__stackSizes as Array<{ width: number }>
        expect(sizes.length).toBeGreaterThan(0)
        expect(sizes.filter(s => s.width > 46)).toEqual([])
      }
    }
  })

  it('stacks the date on the left like the app, month over day', async () => {
    await runWidget('medium', UPCOMING_MULTI_MANIFEST)
    const texts = (globalThis as any).__texts as string[]
    const [, m, d] = isoDate(10).split('-').map(Number)
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    const i = texts.indexOf(months[m - 1])
    expect(i).toBeGreaterThan(-1)
    expect(texts[i + 1]).toBe(String(d))
    // ...then the name with the countdown pill beside it. No separate
    // date/weekday line: the date column already shows the date.
    const name = texts.indexOf('Upcoming A')
    expect(name).toBeGreaterThan(i)
    expect(texts[name + 1]).toBe('IN 10 DAYS')
    expect(texts.some(t => t.includes('Monday'))).toBe(false)
  })

  it('keeps the countdown in the well on Small, with no pill beside the name', async () => {
    await runWidget('small', UPCOMING_MULTI_MANIFEST)
    const texts = (globalThis as any).__texts as string[]
    expect(texts).toContain('DAYS AWAY')
    expect(texts.some(t => t.startsWith('IN '))).toBe(false)
  })

  it('draws the checkered flag in the header on every family', async () => {
    for (const family of ['small', 'medium', 'large']) {
      await runWidget(family, UPCOMING_MULTI_MANIFEST)
      const drawn = (globalThis as any).__drawn as Array<{ fills: number; opaque: boolean; respectScreenScale: boolean }>
      // One flag: four filled shapes, on a transparent background (a
      // DrawContext is opaque — black — by default), at screen scale.
      expect(drawn).toEqual([{ fills: 4, opaque: false, respectScreenScale: true }])
    }
  })

  it('never shows a "more upcoming" footer on Small, however many events are left over', async () => {
    await runWidget('small', UPCOMING_MULTI_MANIFEST)
    const texts = (globalThis as any).__texts as string[]
    expect(texts.some(t => t.includes('more upcoming'))).toBe(false)
  })

  it('still shows the "more upcoming" footer on Medium/Large', async () => {
    await runWidget('medium', UPCOMING_MULTI_MANIFEST)
    const texts = (globalThis as any).__texts as string[]
    expect(texts.some(t => t.includes('more upcoming'))).toBe(true)
  })

  it('stacks up to three upcoming cards on Large', async () => {
    await runWidget('large', UPCOMING_MULTI_MANIFEST)
    const texts = (globalThis as any).__texts as string[]
    for (const name of ['Upcoming A', 'Upcoming B', 'Upcoming C']) expect(texts).toContain(name)
    // All three fit, so nothing is left for a "more upcoming" footer.
    expect(texts.some(t => t.includes('more upcoming'))).toBe(false)
  })

  it('renders a single upcoming card plus a "more upcoming" footer on Medium', async () => {
    await expect(runWidget('medium', UPCOMING_MULTI_MANIFEST)).resolves.toBeUndefined()
  })
})

describe('notifications', () => {
  it('schedules all-drivers + every group session when the filter is empty', async () => {
    await runWidget('medium', FUTURE_MANIFEST, '')
    // 1 general + 1 lunch + 3 onTrack + 1 inClass = 6 notifications
    expect((globalThis as any).__scheduled).toBe(6)
  })

  it('filters to just the named groups but still schedules all-drivers events', async () => {
    await runWidget('medium', FUTURE_MANIFEST, 'orange|15m')
    // orange on-track (1) + drivers meeting (1) + lunch (1) = 3
    expect((globalThis as any).__scheduled).toBe(3)
  })

  it('parses `Nm` as lead time even without a pipe or before the groups', async () => {
    await runWidget('medium', FUTURE_MANIFEST, '15m,blue')
    // blue on-track (1) + blue in-class (1) + drivers meeting (1) + lunch (1) = 4
    expect((globalThis as any).__scheduled).toBe(4)
  })

  it('takes groups and lead time separated by commas alone (the form the setup page shows)', async () => {
    await runWidget('medium', FUTURE_MANIFEST, 'blue,orange,15m')
    const notifs = (globalThis as any).__notifs as Array<{ title: string }>
    // blue on-track + blue in-class + orange on-track + meeting + lunch = 5
    expect(notifs).toHaveLength(5)
    for (const n of notifs) expect(n.title).toMatch(/· in 15m$/)
  })

  it('schedules nothing when there are no future activities', async () => {
    await runWidget('medium', NO_EVENTS_MANIFEST, '')
    expect((globalThis as any).__scheduled).toBe(0)
  })
})

describe('test-live fixture gating', () => {
  // A manifest that carries the standing fixture at its natural (past)
  // date. Without the `test` flag the widget should treat it as ancient
  // and schedule nothing; with `test`, the widget rewrites its day to
  // today and every activity becomes future work.
  const FIXTURE_MANIFEST = {
    events: [{
      id: 'test-live',
      name: 'Test Event',
      runGroups: [
        { id: 'red', label: 'Red', color: '#ef4444' },
        { id: 'blue', label: 'Blue', color: '#3b82f6' },
      ],
      days: [{
        date: '2000-01-01',
        label: 'Saturday',
        activities: [
          { time: '23:59', type: 'general', label: 'Late-night check-in' },
        ],
      }],
    }],
  }

  it('leaves the test-live fixture in the past when no `test` flag is set', async () => {
    await runWidget('medium', FIXTURE_MANIFEST, '')
    expect((globalThis as any).__scheduled).toBe(0)
  })

  it('rewrites the test-live fixture to today when the `test` flag is set', async () => {
    await runWidget('medium', FIXTURE_MANIFEST, 'test')
    expect((globalThis as any).__scheduled).toBe(1)
  })
})

describe('notification content', () => {
  it('plays the "event" sound (Scriptable defaults to silent)', async () => {
    await runWidget('medium', FUTURE_MANIFEST, 'orange|15m')
    const notifs = (globalThis as any).__notifs as Array<{ sound: string | null }>
    expect(notifs.length).toBeGreaterThan(0)
    for (const n of notifs) expect(n.sound).toBe('event')
  })

  it('titles run-group alerts with a matching colored circle and "in Nm"', async () => {
    await runWidget('medium', FUTURE_MANIFEST, 'orange|15m')
    const notifs = (globalThis as any).__notifs as Array<{ title: string; body: string }>
    const orange = notifs.find(n => n.title.includes('Orange'))
    expect(orange).toBeDefined()
    expect(orange!.title).toBe('🟠 Orange · in 15m')
    expect(orange!.body).toBe('On track at 8:50 AM')
  })

  it('leaves general all-drivers events without a group emoji but still says "in Nm"', async () => {
    await runWidget('medium', FUTURE_MANIFEST, '|20m')
    const notifs = (globalThis as any).__notifs as Array<{ title: string }>
    const meeting = notifs.find(n => n.title.startsWith('Drivers meeting'))
    expect(meeting).toBeDefined()
    expect(meeting!.title).toBe('Drivers meeting · in 20m')
  })

  it('prefixes lunch with 🥙 so it reads distinct from other all-drivers items', async () => {
    await runWidget('medium', FUTURE_MANIFEST, '|20m')
    const notifs = (globalThis as any).__notifs as Array<{ title: string }>
    const lunch = notifs.find(n => n.title.includes('Lunch'))
    expect(lunch).toBeDefined()
    expect(lunch!.title).toBe('🥙 Lunch · in 20m')
  })
})

// Static checks on the source text itself rather than rendered output —
// these enforce the "no borders, no shadows, colors come from the
// palette" rules from the design-guardrails comment block, so a future
// change can't silently reintroduce any of them the way the header-
// margin drift did. Grepping the raw source is intentionally crude but
// catches the actual mistake: someone reaching for a WidgetKit-tutorial
// property (.borderWidth, .shadowColor) that Scriptable stacks don't
// even meaningfully support for widgets, or a fresh new Color("#hex")
// dropped into a layout function instead of reading the palette.
describe('design guardrails (static source checks)', () => {
  it('never sets a border on any stack', () => {
    expect(widgetSrc).not.toMatch(/\.borderColor\s*=|\.borderWidth\s*=/)
  })

  it('never sets a shadow on any stack', () => {
    expect(widgetSrc).not.toMatch(/\.shadowColor\s*=|\.shadowRadius\s*=|\.shadowOffset\s*=|\.shadowOpacity\s*=/)
  })

  it('keeps every countdown-view color read through the palette, not a fresh literal', () => {
    // Everything between the countdown tokens section and the end of
    // the well/info-row/count-unit helpers should only ever assign
    // `p.<something>` (or COUNTDOWN_TOKENS-derived numbers) as a color
    // — never `new Color(...)` inline. urgencyColor/WARN_COLOR and the
    // palette() function itself are the only places allowed to
    // construct a Color from a hex literal.
    const start = widgetSrc.indexOf('function renderUpcomingHeader(')
    const end = widgetSrc.indexOf('function renderError(')
    expect(start).toBeGreaterThan(-1)
    expect(end).toBeGreaterThan(start)
    const section = widgetSrc.slice(start, end)
    expect(section).not.toMatch(/new Color\(/)
  })

  it('keeps the header and card margins as the same shared constant', () => {
    // Regression guard for the exact #180 follow-up bug: the header
    // row used to compute its own margin instead of reusing the
    // card's, so it silently drifted out of alignment. Asserting there
    // is only ONE margin constant for this view (COUNTDOWN_MARGIN) —
    // not a second COUNTDOWN_CARD_MARGIN or similar — makes that
    // specific drift structurally impossible to reintroduce.
    expect(widgetSrc).toMatch(/const COUNTDOWN_MARGIN = 8/)
    expect(widgetSrc).not.toMatch(/COUNTDOWN_CARD_MARGIN/)
  })

  it('never hand-writes a rich/isSmall ternary in the countdown view — only countdownTier() may', () => {
    // The whole point of COUNTDOWN_TOKENS is that no layout function
    // picks its own font/spacing/padding per tier inline — it looks up
    // `t.<property>` from the table `countdownTier()` resolved once.
    // A bare `rich ? … : isSmall ? … : …` reappearing here means a new
    // property was added the old (bug-prone) way instead of being
    // added to the table, so this fails loudly instead of shipping a
    // number some sibling function doesn't share.
    const start = widgetSrc.indexOf('function renderUpcomingHeader(')
    const end = widgetSrc.indexOf('function renderError(')
    const section = widgetSrc.slice(start, end)
    const ternaryLines = section.split('\n').filter(l => /rich\s*\?|isSmall\s*\?/.test(l))
    const offenders = ternaryLines.filter(l => !l.includes('countdownTier('))
    expect(offenders).toEqual([])
  })

  it('keeps the widget-preview simulator icon system pinned to real icon-set data, not hand-drawn strings', () => {
    // The simulator's icon-drift saga (see the branch history around
    // fc21cb1 / 3d1b467) always followed the same pattern: someone
    // — usually me — pastes a stand-in SVG path string as a literal
    // in a lookup table (ICON_SVG_PATHS, REAL_ICON_PATHS, etc.),
    // guessing the shape from memory. Every time, the guess was
    // visibly wrong on device. The fix is to load path data FROM AN
    // INSTALLED ICON PACKAGE (Lucide via node_modules, Font Awesome
    // via its npm export) and NEVER type an SVG `d="..."` literal
    // into the simulator. This test enforces that structurally.
    const sim = readFileSync(join(__dirname, 'widget-preview.mjs'), 'utf8')
    // A `d="..."` attribute inside an object/array literal in the
    // source is the exact shape of a hand-drawn icon lookup. The
    // simulator does render `d="${real.path}"` and similar into
    // strings at runtime — but that's a template interpolation of
    // package-sourced data, not a literal path. Detect the literal
    // form: `d: "..."` or `d="M..."` where M/L/C/Z etc. appear
    // (SVG path commands). Interpolations use `${...}` and don't match.
    const literalPathAttr = /d\s*[:=]\s*"[MmLlCcQqAaZzHhVvSsTt][^"$]*"/
    expect(sim).not.toMatch(literalPathAttr)
    // The simulator must import from an installed icon package.
    expect(sim).toMatch(/@fortawesome\/free-solid-svg-icons|lucide-react/)
  })

  it("draws the app's own checkered flag, path for path", () => {
    // The widget can't show an SVG, so it draws the app's
    // src/assets/checkered-flag.svg with DrawContext from a copy of its
    // path data. Keep the copy identical to the asset.
    const svg = readFileSync(join(__dirname, '..', 'src', 'assets', 'checkered-flag.svg'), 'utf8')
    const assetPaths = [...svg.matchAll(/<path d="([^"]+)"/g)].map(m => m[1])
    const viewBox = svg.match(/viewBox="0 0 (\d+) (\d+)"/)!
    const block = widgetSrc.slice(widgetSrc.indexOf('const CHECKERED_FLAG_PATHS = ['))
    const widgetPaths = [...block.slice(0, block.indexOf(']')).matchAll(/"([^"]+)"/g)].map(m => m[1])
    expect(assetPaths).toHaveLength(4)
    expect(widgetPaths).toEqual(assetPaths)
    expect(widgetSrc).toContain(`const CHECKERED_FLAG_VIEWBOX = [${viewBox[1]}, ${viewBox[2]}]`)
    // svgPathToPath reads absolute M / L / C / Z only.
    for (const d of assetPaths) expect(d).toMatch(/^[MLCZ\d\s.-]+$/)
  })

  it('keeps the widget-preview simulator constants pinned to cited iOS values', async () => {
    // The simulator's reference numbers (widget point sizes, outer
    // corner radius, dark background, DPR) are what let it render
    // relative fit accurately without me guessing them each session.
    // Every field checked here has a citation in widget-preview.mjs's
    // WIDGET_ENV_CONSTANTS block — if a value changes, update the
    // citation there and this test in the same commit. A silent drift
    // (e.g. someone rounding 170 → 175 to "match a screenshot") would
    // make the simulator lie again.
    const mod = await import('./widget-preview.mjs')
    const c = mod.WIDGET_ENV_CONSTANTS as {
      referenceDevice: string
      deviceWidgetSizes: Record<string, Record<string, { w: number; h: number }>>
      widgetSizes: Record<string, { w: number; h: number }>
      outerCornerRadius: number
      background: { light: string; dark: string }
      dpr: number
      textLineHeight: number
      flexSpacerMinWidth: number
    }
    // Apple HIG Widgets page, "iPhone widget sizes" rows (#204 corrected
    // the reference device: the owner's phone is 375×812, and the old
    // 170/364 sizes were the 430×932 row, not the iPhone 15/16 Pro's).
    const row = (s: number, mw: number, mh: number, lw: number, lh: number) => ({
      small: { w: s, h: s }, medium: { w: mw, h: mh }, large: { w: lw, h: lh }, extraLarge: { w: lw, h: lh },
    })
    expect(c.deviceWidgetSizes).toEqual({
      '430x932': row(170, 364, 170, 364, 382),
      '393x852': row(158, 338, 158, 338, 354),
      '375x812': row(155, 329, 155, 329, 345),
      '375x667': row(148, 321, 148, 321, 324),
    })
    expect(c.referenceDevice).toBe('375x812')
    expect(c.widgetSizes).toEqual(c.deviceWidgetSizes['375x812'])
    // SF Pro's line height, (1950 + 494) / 2048:
    expect(c.textLineHeight).toBe(1.19)
    // SwiftUI's standard spacing, matching #204's measurement:
    expect(c.flexSpacerMinWidth).toBe(8)
    // iOS ContainerRelativeShape on iPhone Pro/standard (WidgetKit sample):
    expect(c.outerCornerRadius).toBe(22)
    // UIColor.systemBackground light/dark (UIKit reference):
    expect(c.background.light.toUpperCase()).toBe('#FFFFFF')
    expect(c.background.dark.toUpperCase()).toBe('#1C1C1E')
    // @3x reference iPhone:
    expect(c.dpr).toBe(3)
  })

  it('gives every vertical stack an explicit cross-axis alignment', () => {
    // A VStack's REAL default cross-axis alignment is center, not
    // leading — this is what actually caused the header title/subtitle
    // and info-row misalignment bugs (a user visually caught the
    // header one; this file had three more of the same latent bug).
    // It only looked "left-aligned by default" wherever children
    // happened to render the same width. Every `.layoutVertically()`
    // call must be paired with an explicit `.topAlignContent()` /
    // `.centerAlignContent()` / `.bottomAlignContent()` call on the
    // same stack, so this can't silently regress by someone adding a
    // new vertical stack and assuming CSS-like default left alignment.
    const lines = widgetSrc.split('\n')
    const offenders: string[] = []
    lines.forEach((line, i) => {
      const m = line.match(/^\s*(\w+)\.layoutVertically\(\)/)
      if (!m) return
      const varName = m[1]
      const window = lines.slice(i, i + 8).join('\n')
      const re = new RegExp(`${varName}\\.(topAlignContent|centerAlignContent|bottomAlignContent)\\(\\)`)
      if (!re.test(window)) offenders.push(`line ${i + 1}: ${varName}.layoutVertically()`)
    })
    expect(offenders).toEqual([])
  })

  it('gives both countdown-well texts an explicit lineLimit', () => {
    // Real on-device bug: addCountUnit's `num` and `lbl` texts never
    // got `.lineLimit = 1` (every OTHER addText() call site in the
    // file that needs single-line text sets it explicitly). Without
    // it, Text is free to wrap — and a wrappable Text reports a much
    // smaller "ideal width" to SwiftUI's layout engine than a
    // single-line one, since it can always break onto more lines
    // instead of demanding a wider box. Once drawCountdownWell's
    // `well` stack lost its explicit .size (a separate, deliberate
    // fix), nothing stopped the well from being squeezed down to an
    // unreadable sliver: "17" wrapped into "1" / "7" on separate
    // lines, "DAYS AWAY" wrapped into "DAYS" / "AWAY", on a real
    // device — invisible in this repo's simulator because Chromium's
    // flexbox sizing doesn't collapse the same way. Scoped narrowly
    // to addCountUnit's body (not every addText() in the file) since
    // some texts elsewhere legitimately want wrapping (e.g. the
    // top-level error message) — this guards the one function where
    // it caused a real, confirmed regression.
    const start = widgetSrc.indexOf('function addCountUnit(')
    expect(start).toBeGreaterThan(-1)
    const end = widgetSrc.indexOf('\n}', start)
    const body = widgetSrc.slice(start, end)
    expect(body).toMatch(/num\.lineLimit\s*=\s*1/)
    expect(body).toMatch(/lbl\.lineLimit\s*=\s*1/)
  })
})

// The simulator's model of how a SwiftUI HStack divides its width
// (widget-preview.mjs allocateHStack), checked against what #204's
// on-device screenshots measured — the cases where CSS flexbox, which
// the simulator used before, gave the wrong answer.
describe('widget simulator: SwiftUI HStack width division', () => {
  it('gives a text between two stretchy lines only a third of the row ("1 more upcoming…")', async () => {
    const { allocateHStack } = await import('./widget-preview.mjs')
    // 325pt row minus two 10pt gaps; "1 more upcoming event" at 11pt is
    // ~112pt; each line is a stack holding a flexible spacer.
    const widths = allocateHStack([
      { kind: 'view', min: 8, ideal: Infinity },
      { kind: 'view', min: 11, ideal: 112 },
      { kind: 'view', min: 8, ideal: Infinity },
    ], 305)
    expect(widths[1]).toBeCloseTo(305 / 3)
    expect(widths[1]).toBeLessThan(112) // truncated, as on the phone
    expect(widths[0] + widths[1] + widths[2]).toBeCloseTo(305)
  })

  it('lets a flexible addSpacer() yield to text (Small\'s "Next HPDE" fits)', async () => {
    const { allocateHStack } = await import('./widget-preview.mjs')
    // 135pt header row: title (~65pt), flexible spacer, 16pt flag. An
    // even split with the spacer would offer the title 59.5pt.
    const widths = allocateHStack([
      { kind: 'view', min: 13, ideal: 65 },
      { kind: 'spacer', min: 8, ideal: Infinity },
      { kind: 'fixed', min: 16, ideal: 16 },
    ], 135)
    expect(widths).toEqual([65, 54, 16])
  })

  it('squeezes the old countdown well to ~45pt on a 329pt Medium ("•••" / "DAY…")', async () => {
    const { allocateHStack } = await import('./widget-preview.mjs')
    // Card interior 293pt: the 228pt info column, a 12pt gap, a flexible
    // spacer, then the well (~64pt wide with its padding at 364pt).
    const widths = allocateHStack([
      { kind: 'fixed', min: 228, ideal: 228 },
      { kind: 'fixed', min: 12, ideal: 12 },
      { kind: 'spacer', min: 8, ideal: Infinity },
      { kind: 'view', min: 20, ideal: 64 },
    ], 293)
    // Measured on the phone: 43.5pt.
    expect(widths[3]).toBe(45)
  })
})
