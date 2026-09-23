#!/usr/bin/env node
// Renders the small / medium / large widget previews shown on the web
// app's widget setup page (src/assets/widget-*.png).
//
// Uses the same simulator as `npm run widget:preview` — the real
// hpde-widget.js rendered through the Scriptable mock — against real
// events from the built events.json, with the clock frozen: small and
// medium show the countdown ahead of an event, large shows a busy event
// day mid-morning. Re-run after a visible widget change:
//
//   npm run build && npm run widget:showcase
//
// Same caveat as the simulator: the fonts and SF Symbols are stand-ins,
// so this is close to, not pixel-identical with, the on-device widget.

import { readFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { chromium } from 'playwright'
import { renderScenario, fontFaceCss, WIDGET_ENV_CONSTANTS } from './widget-preview.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'src', 'assets')
mkdirSync(outDir, { recursive: true })

const eventsJson = JSON.parse(readFileSync(join(__dirname, '..', 'dist', 'api', 'events.json'), 'utf8'))
const realEvents = eventsJson.events.filter(e => e.id !== 'test-live')

// Large: a full on-track day (TDE at MSRC 1.7, day 2) mid-morning, so
// the populated view has past, current and upcoming rows.
const EVENT_DAY = '2026-09-12'
const eventDay = realEvents.find(e => e.id === '2026-09-11_msrc-1-7')
if (!eventDay) throw new Error('2026-09-11_msrc-1-7 not in dist/api/events.json — run `npm run build` first')

// Small / medium: the countdown view ahead of that event. Those sizes
// are laid out for the countdown; the event-day view is designed for
// large.
const SHOTS = [
  { family: 'small', at: '2026-09-01T12:00:00', manifest: { events: realEvents } },
  { family: 'medium', at: '2026-09-01T12:00:00', manifest: { events: realEvents } },
  {
    family: 'large',
    at: `${EVENT_DAY}T10:05:00`,
    manifest: { events: [{ ...eventDay, days: [{ ...eventDay.days[1], date: EVENT_DAY }] }] },
  },
]

// The widget reads the wall clock via `new Date()` / `Date.now()`.
const RealDate = Date
function freezeClock(iso) {
  const fixed = new RealDate(iso).getTime()
  globalThis.Date = class FrozenDate extends RealDate {
    constructor(...args) {
      if (args.length === 0) super(fixed)
      else super(...args)
    }
    static now() { return fixed }
  }
}

const cells = []
for (const shot of SHOTS) {
  freezeClock(shot.at)
  const html = await renderScenario({ family: shot.family, manifest: shot.manifest, online: true }, false)
  cells.push(`<div class="cell" id="${shot.family}">${html}</div>`)
}
globalThis.Date = RealDate
const FAMILIES = SHOTS.map(s => s.family)

const page = `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  ${fontFaceCss()}
  body { margin:0; padding:24px; background:transparent; font-family: ${WIDGET_ENV_CONSTANTS.fontFallbackStack}; }
  .cell { display:inline-block; margin:0 24px 24px 0; vertical-align:top; }
</style></head>
<body>${cells.join('\n')}</body></html>`

const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined })
const tab = await browser.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: WIDGET_ENV_CONSTANTS.dpr })
await tab.setContent(page)
await tab.evaluate(() => document.fonts.ready)
for (const family of FAMILIES) {
  const el = await tab.$(`#${family} > *`)
  const path = join(outDir, `widget-${family}.png`)
  await el.screenshot({ path, omitBackground: true })
  console.log(`Wrote ${path}`)
}
await browser.close()
