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
  const textStub = () => ({ font: null, textColor: null, lineLimit: 0, textOpacity: 1 })
  const imageStub = () => ({ imageSize: null, tintColor: null, imageOpacity: 1 })
  class StackStub {
    addStack() { return new StackStub() }
    addText() { return textStub() }
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
    set cornerRadius(_v) {}
    set size(_v) {}
    set spacing(_v) {}
    set url(_v) {}
  }
  g.WidgetStack = StackStub
  g.ListWidget = class {
    addStack() { return new StackStub() }
    addText() { return textStub() }
    addSpacer(_n?: number) {}
    setPadding() {}
    set backgroundColor(_v) {}
    set refreshAfterDate(_v) {}
    set url(_v) {}
    async presentMedium() {}
    async presentLarge() {}
  }
  g.SFSymbol = { named: () => ({ image: {} }) }
  g.Script = { setWidget: () => {}, complete: () => {} }
  g.args = { widgetParameter }
  class NotificationStub {
    identifier = ''
    title = ''
    body = ''
    threadIdentifier = ''
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
    }
  }
  ;(NotificationStub as any).allPending = async () => []
  ;(NotificationStub as any).removePending = async (_: string[]) => {}
  g.Notification = NotificationStub
  g.__scheduled = 0
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

  it('schedules nothing when there are no future activities', async () => {
    await runWidget('medium', NO_EVENTS_MANIFEST, '')
    expect((globalThis as any).__scheduled).toBe(0)
  })
})
