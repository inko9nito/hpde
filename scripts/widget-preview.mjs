#!/usr/bin/env node
// Visual simulator for scripts/hpde-widget.js — renders the SAME widget
// script (via eval, same technique hpde-widget.test.ts uses) against a
// Scriptable API mock that emits real HTML/CSS instead of discarding
// the render tree, then screenshots it with Playwright/Chromium.
//
// Why this exists: Scriptable has no renderer outside of iOS, so every
// layout fix in this file up to now was verified by hand-computing
// approximate SF Rounded line heights, then shipping and waiting for an
// on-device screenshot to find out if the guess was right. That's why
// the same class of bug (overlap, inconsistent padding, truncation)
// kept recurring — the guessing was the actual problem. This can't
// replicate Scriptable's exact WidgetKit rendering (different font
// metrics, different exact per-device point sizes, no real SF Symbol
// artwork), but it DOES replicate the actual layout mechanics this file
// depends on — stack orientation, the flex-spacer full-width cascade,
// fixed sizing, padding, alignment, line-limit truncation — using a
// real browser layout engine instead of arithmetic guesses. That's
// enough to catch overlap/misalignment/truncation/overflow immediately,
// locally, without a phone round-trip. On-device is still the final
// check for exact pixel fit — this is for catching the obvious stuff
// before it ever reaches a screenshot.
//
// Usage: npm run widget:preview
// Output: scripts/.widget-preview/preview.html (open directly in any
// browser) and one .png per widget box (for Claude to inspect inline).

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { chromium } from 'playwright'
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons'

const __dirname = dirname(fileURLToPath(import.meta.url))
const widgetSrc = readFileSync(join(__dirname, 'hpde-widget.js'), 'utf8')
const outDir = join(__dirname, '.widget-preview')
mkdirSync(outDir, { recursive: true })

// ---------- VNode tree + the width-cascade pass ----------
//
// Scriptable's real layout rule (see this file's own "flex spacer
// cascade" comments): a stack whose only content is an unconstrained
// addSpacer() has an "as large as possible" ideal width that cascades
// UP through every ancestor stack that isn't otherwise size-constrained
// — which is how e.g. a countdown well or a card stretches to the
// widget's full width from a single trailing spacer three stacks deep.
// Plain CSS flexbox does NOT do this automatically (a child's flex:1
// only distributes space within its OWN immediate parent — it doesn't
// make the parent itself bigger). computeWidthCascade replicates the
// upward propagation explicitly: any stack containing a flex spacer
// (directly, or transitively through a descendant that itself needed
// to cascade) is marked to stretch within ITS OWN parent, unless it has
// an explicit fixed width (Scriptable's `.size = new Size(w, h)` is a
// hard boundary — cascade stops there, matching the real behavior).
let nodeId = 0
function makeNode(kind) {
  return {
    id: nodeId++, kind, style: {}, children: [], text: null,
    orientation: 'row', spacerFlex: false, explicitWidth: false,
  }
}

function computeWidthCascade(node) {
  let childWants = false
  for (const c of node.children) {
    if (computeWidthCascade(c)) childWants = true
  }
  const selfSpacerWants = node.orientation === 'row' && node.children.some(c => c.spacerFlex)
  const wants = selfSpacerWants || childWants
  if (wants && !node.explicitWidth) {
    node.wantsFullWidth = true
    return true
  }
  return false
}

// Applied AFTER computeWidthCascade, so each node knows its parent's
// orientation (needed to pick flex-grow vs align-self:stretch).
function applyWidthCascadeStyles(node, parentOrientation) {
  if (node.wantsFullWidth) {
    if (parentOrientation === 'row') {
      node.style.flex = '1 1 0'
      node.style['min-width'] = '0'
    } else {
      node.style['align-self'] = 'stretch'
    }
  }
  for (const c of node.children) applyWidthCascadeStyles(c, node.orientation)
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]))
}

function renderNode(node) {
  const styleStr = Object.entries(node.style).map(([k, v]) => `${k}:${v}`).join(';')
  const styleAttr = styleStr ? ` style="${styleStr}"` : ''
  if (node.kind === 'image') {
    return `<div${styleAttr}>${node.text ?? ''}</div>` // raw SVG markup, not escaped
  }
  if (node.kind === 'text') {
    return `<div${styleAttr}>${escapeHtml(node.text ?? '')}</div>`
  }
  return `<div${styleAttr}>${node.children.map(renderNode).join('')}</div>`
}

// ---------- Color / Font mocks ----------

function hexToRgb(hex) {
  const h = String(hex || '#000000').replace('#', '')
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h
  const n = parseInt(full, 16) || 0
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

class ColorMock {
  constructor(hex, alpha = 1) { this.hex = hex; this.alpha = alpha }
  toCss() { const [r, g, b] = hexToRgb(this.hex); return `rgba(${r},${g},${b},${this.alpha})` }
}
function colorCss(c) { return c instanceof ColorMock ? c.toCss() : String(c ?? 'inherit') }

class SizeMock { constructor(w, h) { this.width = w; this.height = h } }

function fontMock(size, weight) { return { size, weight } }
const Font = {
  systemFont: s => fontMock(s, 'normal'),
  mediumSystemFont: s => fontMock(s, '500'),
  semiboldSystemFont: s => fontMock(s, '600'),
  boldSystemFont: s => fontMock(s, 'bold'),
  regularRoundedSystemFont: s => fontMock(s, 'normal'),
  mediumRoundedSystemFont: s => fontMock(s, '500'),
  semiboldRoundedSystemFont: s => fontMock(s, '600'),
  boldRoundedSystemFont: s => fontMock(s, 'bold'),
  heavyRoundedSystemFont: s => fontMock(s, '800'),
}

// Flat, single-color line-icon paths (Lucide-style, 24x24 viewBox) —
// stood in for real SF Symbol artwork, which isn't available outside
// iOS. A colored emoji glyph was the original stand-in here, but real
// SF Symbols render as flat, monochrome, tint-colored icons, and an
// emoji's own built-in color scheme made every render look nothing
// like the device (this file's own comments already note these were
// picked to mirror the web app's lucide icon for the same field, so
// approximating the actual lucide shape is the more honest stand-in).
// Two hand-drawn attempts at flag.checkered (scattered squares, then a
// squared-off flag-with-checkerboard) both got called out as visibly
// wrong — reasonably so, since neither was actually icon artwork, just
// a guess at a shape from memory. Real, professionally-drawn path data
// from an established icon set is the right source, not another
// freehand attempt. Font Awesome Free's flag-checkered is that: a real
// checkered-flag glyph, MIT/CC-BY licensed, used here in a private
// local dev tool (not redistributed).
const REAL_ICON_PATHS = {
  'flag.checkered': { viewBox: `0 0 ${faFlagCheckered.icon[0]} ${faFlagCheckered.icon[1]}`, path: faFlagCheckered.icon[4] },
}

// The rest are still hand-approximated Lucide-style line icons (24x24,
// stroke-based) — lower-stakes glyphs (calendar/person/pin/etc.) that
// haven't drawn the same complaint, so left as-is rather than pulled
// from a library preemptively.
const ICON_SVG_PATHS = {
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  'person.2': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  mappin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  car: '<path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>',
  graduationcap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M22 10v6"/><path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5"/>',
  'fork.knife': '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  'point.topleft.down.curvedto.point.bottomright.up': '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
}
function iconSvg(name) {
  const real = REAL_ICON_PATHS[name]
  if (real) {
    return `<svg viewBox="${real.viewBox}" width="100%" height="100%"><path fill="currentColor" d="${real.path}"/></svg>`
  }
  const inner = ICON_SVG_PATHS[name] || '<circle cx="12" cy="12" r="8"/>'
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="100%" height="100%">${inner}</svg>`
}

// ---------- Stack / text / image mocks ----------

class TextWrapper {
  constructor(node) { this.node = node }
  set font(f) { if (f) { this.node.style['font-size'] = f.size + 'px'; this.node.style['font-weight'] = f.weight } }
  set textColor(c) { this.node.style.color = colorCss(c) }
  set lineLimit(n) {
    if (n === 1) {
      this.node.style['white-space'] = 'nowrap'
      this.node.style.overflow = 'hidden'
      this.node.style['text-overflow'] = 'ellipsis'
      this.node.style['min-width'] = '0'
      // KNOWN ISSUE, not fixed: some lineLimit=1 text (seen so far on
      // "…, TX" location strings) occasionally renders its last glyph
      // wrong — e.g. a capital X reading as a stray mark — only in the
      // full multi-scenario page, never in an isolated reproduction of
      // the exact same element/styles/font. Ruled out by direct
      // testing, each still reproducing the artifact: the local-font
      // data-URI not loading (it loads — document.fonts confirms
      // status "loaded"), a text box sized with zero pixel tolerance
      // for its content (DOM measurement shows no overflow), the
      // variable font's runtime weight interpolation (a static-weight
      // instance does the same thing), and text-overflow:ellipsis's
      // own width calculation (removing it entirely changes nothing).
      // The `padding-right` below is cheap insurance against the
      // "zero tolerance" case even though it didn't resolve the one
      // reproduction found so far — treat any garbled trailing glyph
      // in a render as a simulator artifact to verify by eye against
      // the source text, not a signal about the real widget.
      this.node.style['padding-right'] = '2px'
    }
  }
  set textOpacity(v) { this.node.style.opacity = v }
}

class ImageWrapper {
  constructor(node) { this.node = node }
  set imageSize(s) {
    this.node.style['font-size'] = s.height + 'px'
    this.node.style.width = s.width + 'px'
    this.node.style.height = s.height + 'px'
    this.node.style.display = 'inline-flex'
    this.node.style['align-items'] = 'center'
    this.node.style['justify-content'] = 'center'
    this.node.style.flex = '0 0 auto'
    this.node.style['line-height'] = '1'
  }
  set tintColor(c) { this.node.style.color = colorCss(c) }
  set imageOpacity(v) { this.node.style.opacity = v }
}

class StackMock {
  constructor(orientation = 'row') {
    this.node = makeNode(orientation)
    this.node.orientation = orientation
    this.node.style.display = 'flex'
    this.node.style['flex-direction'] = orientation === 'row' ? 'row' : 'column'
    this.node.style['align-items'] = 'center'
    // CSS flex items default to a content-based min-width/min-height
    // ("don't shrink below your content's natural size"), which SwiftUI
    // stacks (what Scriptable's WidgetStack actually maps to) don't do
    // — an HStack distributes space among its children and shrinks them
    // as needed without this escape hatch. Without overriding it here,
    // a stack that's narrower than its un-shrunk content overflows
    // its container in this simulator even when the real widget
    // would just compress it — a false positive this tool should not
    // produce. `.size = new Size(w, h)` below opts a stack OUT of this
    // (flex-shrink: 0) when the script explicitly fixes its size.
    this.node.style['min-width'] = '0'
    this.node.style['min-height'] = '0'
  }
  addStack() { const s = new StackMock('row'); this.node.children.push(s.node); return s }
  layoutVertically() { this.node.orientation = 'column'; this.node.style['flex-direction'] = 'column' }
  addText(text) {
    const n = makeNode('text'); n.text = text
    n.style['font-size'] = '15px'
    n.style['min-width'] = '0'
    this.node.children.push(n)
    return new TextWrapper(n)
  }
  addImage(sentinel) {
    const n = makeNode('image')
    n.text = iconSvg(sentinel && sentinel.name)
    this.node.children.push(n)
    return new ImageWrapper(n)
  }
  addSpacer(n) {
    const sp = makeNode('spacer')
    if (n == null) {
      sp.spacerFlex = true
      sp.style.flex = '1 1 0'
      sp.style['align-self'] = 'stretch'
    } else {
      sp.style.flex = '0 0 auto'
      if (this.node.orientation === 'row') sp.style.width = n + 'px'
      else sp.style.height = n + 'px'
    }
    this.node.children.push(sp)
  }
  setPadding(t, l, b, r) { this.node.style.padding = `${t}px ${r}px ${b}px ${l}px` }
  centerAlignContent() { this.node.style['align-items'] = 'center' }
  topAlignContent() { this.node.style['align-items'] = 'flex-start' }
  bottomAlignContent() { this.node.style['align-items'] = 'flex-end' }
  set backgroundColor(c) { this.node.style['background-color'] = colorCss(c) }
  set cornerRadius(v) { this.node.style['border-radius'] = v + 'px' }
  set size(s) {
    this.node.explicitWidth = s.width > 0
    if (s.width > 0) { this.node.style.width = s.width + 'px'; this.node.style['flex-shrink'] = '0' }
    if (s.height > 0) { this.node.style.height = s.height + 'px'; this.node.style['flex-shrink'] = '0' }
  }
  set spacing(n) { this.node.style.gap = n + 'px' }
  set url(_v) {}
  set borderColor(_v) {}
  set borderWidth(_v) {}
}

class ListWidgetMock extends StackMock {
  constructor() { super('column'); this.node.style['align-items'] = 'stretch' }
  set refreshAfterDate(_v) {}
}

// ---------- Family frame sizes (approximate iPhone point sizes —
// good enough for relative-layout verification, not a device-exact
// match) ----------
const FAMILY_SIZE = { small: [155, 155], medium: [329, 155], large: [329, 345], extraLarge: [329, 345] }

function isoDate(offsetDays) {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return d.toISOString().slice(0, 10)
}
const today = isoDate(0)

const RICH_MANIFEST = {
  events: [{
    id: 'test-event', name: 'TEST — DELETE ME',
    runGroups: [
      { id: 'red', label: 'Red', color: '#ef4444' },
      { id: 'green', label: 'Green', color: '#22c55e' },
      { id: 'purple', label: 'Purple', color: '#8b5cf6' },
      { id: 'orange', label: 'Orange', color: '#f97316' },
    ],
    days: [{
      date: today, label: 'Friday',
      activities: [
        { time: '01:30', type: 'session', onTrack: ['red'], inClass: ['green'] },
        { time: '02:00', type: 'session', onTrack: ['purple'], inClass: ['orange'] },
        { time: '06:30', type: 'general', label: 'Gates open' },
        { time: '07:00', type: 'general', label: 'Registration' },
        { time: '12:00', type: 'lunch', label: 'Lunch', subtitle: '60 minutes' },
      ],
    }],
  }],
}

const UPCOMING_MULTI = {
  events: [
    { id: 'a', name: 'Test Event', organizer: 'Test Organizer', track: 'Test Raceway', city: 'Testville, TX',
      runGroups: [], days: [{ date: isoDate(10), label: 'Wednesday', activities: [] }] },
    { id: 'b', name: 'Test Event', organizer: 'Test Organizer', track: 'Test Raceway', city: 'Testville, TX',
      runGroups: [], days: [{ date: isoDate(17), label: 'Wednesday', activities: [] }] },
    { id: 'c', name: 'Test Event', organizer: 'Test Organizer', track: 'Test Raceway', city: 'Testville, TX',
      runGroups: [], days: [{ date: isoDate(24), label: 'Wednesday', activities: [] }] },
  ],
}

const UPCOMING_ONE = {
  events: [
    { id: 'a', name: 'Test Event', organizer: 'Test Organizer', track: 'Test Raceway', city: 'Testville, TX',
      runGroups: [], days: [{ date: isoDate(10), label: 'Wednesday', activities: [] }] },
  ],
}

// Every combination that has actually been buggy so far, plus the
// populated-today view for future-proofing this tool beyond the
// countdown view. Add a scenario here any time a new layout gets built
// — that's the whole point of keeping this checked into the repo.
const SCENARIOS = [
  { family: 'small', manifest: UPCOMING_ONE, label: 'Small — countdown (1 upcoming)' },
  { family: 'medium', manifest: UPCOMING_ONE, label: 'Medium — countdown (1 upcoming)' },
  { family: 'large', manifest: UPCOMING_ONE, label: 'Large — countdown (1 upcoming, rich)' },
  { family: 'large', manifest: UPCOMING_MULTI, label: 'Large — countdown (2 upcoming, stacked)' },
  { family: 'medium', manifest: RICH_MANIFEST, label: 'Medium — populated today' },
  { family: 'large', manifest: RICH_MANIFEST, label: 'Large — populated today' },
]

function installMocks(g, manifest, widgetFamily) {
  g.Color = ColorMock
  g.Size = SizeMock
  g.Font = Font
  g.Device = { isUsingDarkAppearance: () => g.__dark, screenSize: () => ({ width: 390, height: 844 }) }
  g.FileManager = {
    iCloud: () => { throw new Error('no iCloud in preview') },
    local: () => ({
      documentsDirectory: () => '/tmp',
      joinPath: (a, b) => `${a}/${b}`,
      fileExists: () => true,
      readString: () => JSON.stringify(manifest),
      writeString: () => {},
    }),
  }
  g.Request = class { timeoutInterval = 0; async loadJSON() { throw new Error('offline → cache') } }
  g.SFSymbol = { named: name => ({ image: { name } }) }
  g.WidgetStack = StackMock
  g.ListWidget = ListWidgetMock
  g.Script = { setWidget: w => { g.__widget = w }, complete: () => {} }
  g.args = { widgetParameter: null }
  g.config = { widgetFamily, runsInWidget: true }
  class NotificationStub {
    setTriggerDate() {}
    async schedule() {}
    static async allPending() { return [] }
    static async removePending() {}
  }
  g.Notification = NotificationStub
}

async function renderScenario(scenario, dark) {
  const g = globalThis
  installMocks(g, scenario.manifest, scenario.family)
  g.__dark = dark
  g.__widget = null
  const wrapped = `(async () => { ${widgetSrc} })()`
  // eslint-disable-next-line no-eval
  await eval(wrapped)
  const root = g.__widget instanceof StackMock ? g.__widget.node : null
  if (!root) return '<div style="color:red">render failed — no widget produced</div>'
  root.explicitWidth = true // the frame itself is the hard cascade boundary
  computeWidthCascade(root)
  applyWidthCascadeStyles(root, 'column')
  const [w, h] = FAMILY_SIZE[scenario.family] || FAMILY_SIZE.medium
  root.style.width = w + 'px'
  root.style.height = h + 'px'
  root.style.overflow = 'hidden'
  root.style['border-radius'] = '24px'
  root.style['box-sizing'] = 'border-box'
  if (!root.style['background-color']) root.style['background-color'] = dark ? '#000' : '#fff'
  return renderNode(root)
}

async function main() {
  const sections = []
  for (const scenario of SCENARIOS) {
    for (const dark of [false, true]) {
      const html = await renderScenario(scenario, dark)
      sections.push({ label: `${scenario.label} — ${dark ? 'dark' : 'light'}`, id: `s${sections.length}`, html })
    }
  }

  // ui-rounded (Safari/WebKit's real SF Rounded alias) doesn't exist in
  // Chromium, and this sandbox has no real Apple fonts installed, so
  // every render up to now fell back to a plain Linux sans-serif —
  // visually nothing like SF Rounded. Nunito's letterforms/rounded
  // terminals are one of the closer free approximations, and loading
  // it from a local node_modules file (not a CDN) keeps this tool
  // working offline instead of depending on network access at render
  // time. Variable weight axis covers every weight the widget uses
  // (400 regular through 800 heavy) from one file.
  //
  // Inlined as a base64 data: URI rather than referenced by file://
  // path — Chromium refuses to load a LOCAL file from within a page
  // that is itself loaded via file://, even with a correct absolute
  // path ("Not allowed to load local resource"), so the font silently
  // never applied and every render up to now was still the plain
  // Linux fallback despite believing otherwise. A data: URI has no
  // such restriction and keeps this fully offline (~39KB font, ~52KB
  // base64 — trivial for a local dev-tool page).
  const fontPath = join(__dirname, '..', 'node_modules', '@fontsource-variable', 'nunito', 'files', 'nunito-latin-wght-normal.woff2')
  const fontBase64 = readFileSync(fontPath).toString('base64')
  const fontFace = `@font-face {
    font-family: 'WidgetPreviewFont';
    src: url('data:font/woff2;base64,${fontBase64}') format('woff2-variations');
    font-weight: 200 900;
  }`

  const page = `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  ${fontFace}
  body { background:#333; font-family: 'WidgetPreviewFont', -apple-system, system-ui, sans-serif; margin:0; padding:24px; }
  .grid { display:flex; flex-wrap:wrap; gap:32px; align-items:flex-start; }
  .cell { display:flex; flex-direction:column; gap:8px; align-items:flex-start; }
  .cell span { color:#ddd; font-size:12px; font-family: system-ui, sans-serif; }
  .frame { box-shadow: 0 4px 16px rgba(0,0,0,0.4); }
</style></head>
<body><div class="grid">
${sections.map(s => `<div class="cell" id="${s.id}"><span>${escapeHtml(s.label)}</span><div class="frame">${s.html}</div></div>`).join('\n')}
</div></body></html>`

  const htmlPath = join(outDir, 'preview.html')
  writeFileSync(htmlPath, page)
  console.log(`Wrote ${htmlPath}`)

  // PLAYWRIGHT_EXECUTABLE_PATH lets a sandboxed/CI environment point at a
  // pre-installed Chromium binary instead of the one this playwright
  // version would otherwise expect (`npx playwright install`) — set it
  // if `launch()` fails with an "Executable doesn't exist" error.
  const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined })
  const page1 = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 3 })
  await page1.goto('file://' + htmlPath)
  // Without this, a screenshot can be taken before the local Nunito
  // @font-face finishes loading — text lays out (and lineLimit's
  // overflow:hidden/ellipsis clips) against the fallback font's
  // metrics, then the font swaps in after the pixels are already
  // captured, leaving a glyph clipped mid-character (e.g. "TX"
  // rendering as a stray mark) instead of a clean truncation or no
  // truncation at all. document.fonts.ready resolves once every
  // requested face has actually loaded and the page has reflowed.
  await page1.evaluate(() => document.fonts.ready)
  await page1.screenshot({ path: join(outDir, 'all.png'), fullPage: true })
  for (const s of sections) {
    const el = await page1.$(`#${s.id}`)
    if (el) await el.screenshot({ path: join(outDir, `${s.id}.png`) })
  }
  await browser.close()
  console.log(`Wrote ${sections.length} per-scenario screenshots + all.png to ${outDir}`)
  sections.forEach((s, i) => console.log(`  ${s.id}.png — ${s.label}`))
}

main().catch(err => { console.error(err); process.exit(1) })
