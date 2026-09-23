#!/usr/bin/env node
// Renders the images on the web app's widget setup page:
// src/assets/widget-{small,medium,large}.png and notifications.png.
//
// Uses the same simulator as `npm run widget:preview` — the real
// hpde-widget.js rendered through the Scriptable mock — against real
// events from the built events.json, with the clock frozen: small and
// medium show the countdown ahead of an event, large shows a busy event
// day mid-morning. notifications.png shows alerts the widget actually
// schedules for that day with an `orange` filter. Re-run after a visible
// widget or notification change:
//
//   npm run build && npm run widget:showcase
//
// Same caveat as the simulator: the fonts and SF Symbols are stand-ins,
// so this is close to, not pixel-identical with, the on-device widget.

import { readFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { chromium } from 'playwright'
import { renderScenario, fontFaceCss, loadLucideIconShapes, WIDGET_ENV_CONSTANTS } from './widget-preview.mjs'

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

// Notifications: run the widget early on the event day with an `orange`
// filter, then show three of the alerts it schedules — the all-drivers
// "track goes hot", Orange's on-track session, and Orange's classroom
// session right after — as they'd stack on the lock screen.
const NOTIF_PARAM = 'orange'
freezeClock(`${EVENT_DAY}T06:00:00`)
await renderScenario({ family: 'medium', manifest: SHOTS[2].manifest, online: true, param: NOTIF_PARAM }, false)
const scheduled = globalThis.__notifs
const pick = test => {
  const n = scheduled.find(test)
  if (!n) throw new Error('expected notification not scheduled — check the event data / NOTIF_PARAM')
  return n
}
const notifs = [
  pick(n => n.title.startsWith('🟠') && n.body.startsWith('Classroom')),
  pick(n => n.title.startsWith('🟠') && n.body.startsWith('On track')),
  pick(n => n.title.startsWith('Track goes hot')),
]
const newest = notifs[0].at.getTime()
function ago(d) {
  const min = Math.round((newest - d.getTime()) / 60000)
  if (min < 1) return 'now'
  if (min < 60) return `${min}m ago`
  return `${Math.floor(min / 60)}h ago`
}
const escapeHtml = str => String(str).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
// Generic stand-in for the app icon (iOS shows Scriptable's icon here).
const appIcon = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${loadLucideIconShapes('braces')}</svg>`
const notifHtml = `<div class="notifs">${notifs.map(n => `
  <div class="notif">
    <div class="icon">${appIcon}</div>
    <div class="text">
      <div class="row"><span class="title">${escapeHtml(n.title)}</span><span class="time">${ago(n.at)}</span></div>
      <div class="body">${escapeHtml(n.body)}</div>
    </div>
  </div>`).join('')}</div>`
cells.push(`<div class="cell" id="notifications">${notifHtml}</div>`)
globalThis.Date = RealDate
const FAMILIES = SHOTS.map(s => s.family)
const OUTPUTS = [...FAMILIES.map(f => [f, `widget-${f}.png`]), ['notifications', 'notifications.png']]

const page = `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  ${fontFaceCss()}
  body { margin:0; padding:24px; background:transparent; font-family: ${WIDGET_ENV_CONSTANTS.fontFallbackStack}; }
  .cell { display:inline-block; margin:0 24px 24px 0; vertical-align:top; }
  .notifs { width:364px; display:flex; flex-direction:column; gap:8px;
    font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif; }
  .notif { display:flex; gap:10px; align-items:flex-start; padding:12px 14px; border-radius:22px;
    background:rgba(246,246,248,0.96); }
  .icon { width:38px; height:38px; border-radius:9px; background:#1f2937; display:grid; place-items:center; flex-shrink:0; }
  .text { min-width:0; flex:1; }
  .row { display:flex; justify-content:space-between; gap:8px; align-items:baseline; }
  .title { font-size:15px; font-weight:600; color:#111; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .time { font-size:13px; color:#8a8a8e; flex-shrink:0; }
  .body { font-size:15px; color:#222; line-height:1.3; margin-top:1px; }
</style></head>
<body>${cells.join('\n')}</body></html>`

const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined })
const tab = await browser.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: WIDGET_ENV_CONSTANTS.dpr })
await tab.setContent(page)
await tab.evaluate(() => document.fonts.ready)
for (const [id, file] of OUTPUTS) {
  const el = await tab.$(`#${id} > *`)
  const path = join(outDir, file)
  await el.screenshot({ path, omitBackground: true })
  console.log(`Wrote ${path}`)
}
await browser.close()
