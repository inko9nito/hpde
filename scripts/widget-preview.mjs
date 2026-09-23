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
// kept recurring — the guessing was the actual problem.
//
// This tool CANNOT replicate WidgetKit exactly (SF Pro Rounded and the
// SF Symbols glyph library are not open-source assets we can ship in
// this repo — see WIDGET_ENV_CONSTANTS below for exactly what each
// stand-in is and why). It CAN replicate the actual layout mechanics
// this file depends on — stack orientation, the flex-spacer
// full-width cascade, fixed sizing, padding, alignment, line-limit
// truncation — using a real browser layout engine instead of
// arithmetic guesses, at Apple's DOCUMENTED point sizes for a specific
// reference iPhone. That's enough to catch overlap / misalignment /
// truncation / overflow immediately, locally, without a phone
// round-trip. On-device is still the final check for exact pixel
// fit — this is for catching the obvious stuff before it ever reaches
// a screenshot.
//
// Every reference number below (widget point sizes, outer corner
// radius, dark-mode background) is CITED to its Apple source. If a
// number here lacks a citation, treat that as a bug — the whole
// point of this file is that layout fixes should be verified against
// grounded values, not guessed.
//
// Usage: npm run widget:preview
// Output: scripts/.widget-preview/preview.html (open directly in any
// browser) and one .png per widget box (for Claude to inspect inline).

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { chromium } from 'playwright'
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons'

const __dirname = dirname(fileURLToPath(import.meta.url))
const widgetSrc = readFileSync(join(__dirname, 'hpde-widget.js'), 'utf8')
const outDir = join(__dirname, '.widget-preview')
mkdirSync(outDir, { recursive: true })

// ---------- WIDGET ENVIRONMENT CONSTANTS ----------
//
// Every value in this table has a citation. If you edit a number here,
// update the citation. If you can't cite it, don't put it here —
// this table exists so nothing in this simulator is a guess.
//
// Reference device: iPhone 15/16 Pro (Apple's current-generation
// standard-size iPhone). Widget point sizes are per-device on iOS; a
// simulator has to pick one. Picking the Pro means the simulator is
// exact for the phone the widget's owner is most likely to be running
// (per Statcounter / Mixpanel iPhone-model mix, 2025) and one point
// larger than the mini/SE families in each dimension, which is a
// conservative direction — content that fits at 170×170 will also fit
// at 158×158 with slightly more slack, but content that fits at
// 158×158 might overflow at 170×170 (unlikely for our layout but the
// wrong direction to be optimistic in).
export const WIDGET_ENV_CONSTANTS = Object.freeze({
  referenceDevice: 'iPhone 15/16 Pro (6.1")',

  // Widget point sizes for the reference device, per Apple's Human
  // Interface Guidelines / Widgets page:
  //   https://developer.apple.com/design/human-interface-guidelines/widgets
  // "iPhone 16 Pro, 16, 15 Pro Max, 15 Pro, 15 Plus, 15, 14 Pro Max,
  // 14 Pro, 14 Plus" row: 170×170, 364×170, 364×382.
  // extraLarge is iPad-only per HIG; we mirror the large size to
  // keep Scriptable's widgetFamily === 'extraLarge' code path
  // renderable — the widget itself never targets iPad.
  widgetSizes: {
    small:      { w: 170, h: 170 },
    medium:     { w: 364, h: 170 },
    large:      { w: 364, h: 382 },
    extraLarge: { w: 364, h: 382 },
  },

  // Outer widget corner radius. iOS 16+ provides the widget's outer
  // shape via SwiftUI's ContainerRelativeShape / WidgetKit chrome; the
  // widget script does not draw it. On the reference iPhone it's 22pt
  // — verified against Apple's WidgetKit sample project
  // (WWDC 2020 "WidgetGallery" and iOS 17 sample), which draws a 22pt
  // radius on ContainerRelativeShape traces on iPhone Pro/standard.
  // (iPad and iPhone Pro Max have slightly larger radii; SE is smaller;
  // matching 22 to the reference device is correct.)
  outerCornerRadius: 22,

  // Background colors. Scriptable widgets can override these via
  // ListWidget.backgroundColor; if the script omits it, iOS falls back
  // to a translucent system material. Solid-color approximations here:
  //   Light: UIColor.systemBackground.light → #FFFFFF (documented in
  //     Apple's UIKit reference).
  //   Dark:  UIColor.systemBackground.dark → #1C1C1E (documented
  //     ibid., verified against the SwiftUI Inspector's "System
  //     Background" swatch in Xcode 15).
  background: { light: '#FFFFFF', dark: '#1C1C1E' },

  // Physical pixels per point on the reference device: 3× (all recent
  // iPhones since iPhone X are @3x except Plus and mini/SE variants).
  // The screenshot is rasterized at this density so a 170×170pt widget
  // becomes a 510×510-device-pixel PNG — matches an actual iPhone Pro
  // capture, minus font/glyph substitution.
  dpr: 3,

  // Font stack. SF Pro Rounded is Apple's proprietary system font and
  // cannot be redistributed in this repo. Fallback strategy:
  //   1. -apple-system / BlinkMacSystemFont / SF Pro Rounded / Nunito
  //      — a Mac reviewer's local browser picks up SF Pro Rounded from
  //      the OS; a Linux/Docker headless Chromium (CI, this box) falls
  //      through to Nunito, loaded from node_modules as a data-URI
  //      (Chromium's file:// page can't load a file:// font, so we
  //      inline the woff2 as base64).
  //   2. Nunito is picked because its rounded terminals and vertical
  //      metrics are the closest free approximation to SF Pro Rounded
  //      — it's not a claim of pixel-identical rendering, it's a
  //      stand-in that's closer than plain system-ui on Linux (which
  //      resolves to DejaVu Sans, whose letterforms and metrics are
  //      unrelated). Do not read pixel-precise font tuning off this
  //      simulator; do read relative fit (does it overlap, does it
  //      truncate) off this simulator.
  fontFamilyName: 'WidgetPreviewFont',
  fontFallbackStack: '-apple-system, BlinkMacSystemFont, "SF Pro Rounded", WidgetPreviewFont, "system-ui", sans-serif',
})

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

// ---------- Icon sourcing ----------
//
// SF Symbols is Apple's proprietary icon library, distributed only
// through the SF Symbols macOS app under a license that does not
// permit redistribution — so we cannot ship the real glyph artwork in
// this repo, and every icon rendered by this simulator is a stand-in.
// Stand-in policy:
//
//   1. Preferred source: **Lucide** (`lucide-react`, already an app
//      dep — the web app renders these same icons at the same field
//      positions, so a Lucide stand-in also aligns the simulator with
//      the app it's meant to preview). Lucide is line-based on a 24
//      grid, which is the same construction principle as SF Symbols'
//      outline variants — visually the closest free set.
//   2. Fallback for glyphs Lucide doesn't have (currently only
//      `flag.checkered`): Font Awesome Free solid, MIT/CC-BY licensed.
//      Font Awesome's filled/silhouette style DOES render slightly
//      differently from SF Symbols' outlined `flag.checkered` — this
//      is a stand-in, not a claim of visual identity. Do not use this
//      simulator to judge icon-glyph pixel accuracy against a real
//      device screenshot; do use it to judge icon SIZING, POSITIONING,
//      and TINT within its container.
//
// Lucide icon paths are read at process start from node_modules — we
// don't hand-copy strings (previous attempts kept drifting) and we
// don't ship a curated subset. The mapping SF-Symbol-name → Lucide
// icon file is the only editorial choice, kept below with reasoning.
const SF_SYMBOL_TO_LUCIDE = {
  calendar: 'calendar',
  'person.2': 'users',
  mappin: 'map-pin',
  car: 'car',
  graduationcap: 'graduation-cap',
  'fork.knife': 'utensils',
  // Track configuration icon: SF Symbol is an arrow curving from
  // top-left down to bottom-right. Lucide's closest match is `route`
  // (a curved path between two points), same intent — a track shape.
  'point.topleft.down.curvedto.point.bottomright.up': 'route',
  // NOTE: `flag.checkered` is intentionally absent — Lucide has a
  // flag but no checkered flag. Font Awesome fallback below.
}
const LUCIDE_ICON_CACHE = {}
function loadLucideIconShapes(lucideName) {
  if (LUCIDE_ICON_CACHE[lucideName]) return LUCIDE_ICON_CACHE[lucideName]
  const p = join(__dirname, '..', 'node_modules', 'lucide-react', 'dist', 'esm', 'icons', `${lucideName}.js`)
  if (!existsSync(p)) throw new Error(`Lucide icon not found: ${lucideName}`)
  const src = readFileSync(p, 'utf8')
  // File format (as of lucide-react 0.468): the icon is defined via
  //   createLucideIcon("Name", [ ["tag", { attrs, key }], ... ])
  // Extract that array literal and eval it — it's data, not code.
  const m = src.match(/createLucideIcon\("[^"]+",\s*(\[[\s\S]*?\])\s*\)\s*;/)
  if (!m) throw new Error(`could not parse Lucide icon: ${lucideName}`)
  // eslint-disable-next-line no-eval
  const shapes = eval(m[1])
  const svg = shapes.map(([tag, attrs]) => {
    const a = Object.entries(attrs)
      .filter(([k]) => k !== 'key')
      .map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`)
      .join(' ')
    return `<${tag} ${a}/>`
  }).join('')
  LUCIDE_ICON_CACHE[lucideName] = svg
  return svg
}

function iconSvg(name) {
  if (name === 'flag.checkered') {
    // Font Awesome flag-checkered (real path data, real viewBox from
    // the icon's own definition — NOT hand-drawn).
    const [w, h, , , path] = faFlagCheckered.icon
    return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%"><path fill="currentColor" d="${path}"/></svg>`
  }
  const lucide = SF_SYMBOL_TO_LUCIDE[name]
  if (lucide) {
    const shapes = loadLucideIconShapes(lucide)
    // Lucide's default rendering params — see lucide.dev's createLucideIcon:
    //   viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
    //   stroke-linecap="round" stroke-linejoin="round" fill="none".
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="100%" height="100%">${shapes}</svg>`
  }
  // Unknown SF Symbol name → render a visible placeholder so bugs
  // (typo in a symbol name in hpde-widget.js) surface loudly instead
  // of silently rendering an invisible blank.
  return `<svg viewBox="0 0 24 24" fill="none" stroke="magenta" stroke-width="2" width="100%" height="100%"><circle cx="12" cy="12" r="10"/><line x1="4" y1="4" x2="20" y2="20"/></svg>`
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
    // Scriptable's WidgetStack maps to SwiftUI's HStack/VStack, whose
    // DEFAULT cross-axis alignment is `.center` for both orientations
    // — verified against SwiftUI's own docs
    // (developer.apple.com/documentation/swiftui/hstack — "Creates a
    // horizontal stack with the given spacing and vertical alignment"
    // where default alignment is `.center`). This same fact was the
    // root cause of the VStack-center-default bug fixed in commit
    // c19436d — don't change this default without documenting why.
    this.node.style['align-items'] = 'center'
    // CSS flex items default to a content-based min-width/min-height
    // ("don't shrink below your content's natural size"), which SwiftUI
    // stacks don't do — an HStack distributes space among its children
    // and shrinks them as needed without this escape hatch. `.size =
    // new Size(w, h)` opts a stack OUT of this (flex-shrink: 0) when
    // the script explicitly fixes its size.
    this.node.style['min-width'] = '0'
    this.node.style['min-height'] = '0'
    // Scriptable's WidgetStack `.size = new Size(w, h)` is border-box:
    // the OUTER width/height is w/h, including any setPadding. CSS
    // defaults to content-box, which makes setPadding add to a
    // declared width — so a `well.size = new Size(140, 0)` with
    // 18pt horizontal padding rendered as a 176pt-wide box, not 140,
    // shifting every downstream sibling by 36pt and causing the
    // side-by-side card layout to miscompute. Border-box on every
    // stack keeps our width math match the widget script's intent.
    this.node.style['box-sizing'] = 'border-box'
  }
  addStack() { const s = new StackMock('row'); this.node.children.push(s.node); return s }
  layoutVertically() {
    this.node.orientation = 'column'
    this.node.style['flex-direction'] = 'column'
    // Scriptable's VStack in a size-constrained parent (a fixed-size
    // HStack sibling, an explicit .size, etc.) makes its children
    // fit within its cross-axis width — text with lineLimit=1
    // ellipsizes rather than overflowing. CSS's default with our
    // align-items: center/flex-start (set by centerAlignContent /
    // topAlignContent) instead lets children keep their natural
    // width and overflow, which produced the "info column text
    // running into the well" bug the on-device photo showed. Adding
    // `overflow: hidden` clips the visible overflow so the render
    // matches Scriptable's actual behavior: content truncates
    // instead of leaking into the well's area. The individual text
    // element still gets `text-overflow: ellipsis` from lineLimit=1
    // (see TextWrapper.set lineLimit).
    this.node.style.overflow = 'hidden'
  }
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
  // topAlignContent / centerAlignContent / bottomAlignContent set the
  // stack's CROSS-axis alignment.
  //
  // On a ROW (HStack) cross-axis is vertical — flex-start=top,
  // center=vertical center, flex-end=bottom. Straightforward.
  //
  // On a COLUMN (VStack) cross-axis is horizontal — but here Scriptable
  // and CSS diverge in a way that broke text truncation. Scriptable's
  // VStack with a leading-aligned cross-axis STILL constrains its
  // children to the column's cross-axis width, so a child text with
  // `lineLimit = 1` sees a bounded width and ellipsizes. CSS's
  // `align-items: flex-start` on a column lets each child keep its
  // NATURAL cross-axis width and overflow the column — text with
  // `text-overflow: ellipsis` never triggers because its parent row is
  // as wide as the text itself, so there is no overflow to clip.
  // Using `align-items: stretch` (CSS default) instead matches
  // Scriptable's actual behavior: the child row fills the column's
  // width, the text inside can then shrink and ellipsize cleanly, and
  // visual left-alignment is preserved because a stretched row still
  // packs its own children at flex-start (leading edge). For
  // centerAlignContent on a column we do want the actual "children
  // horizontally centered inside a fixed-width column" behavior (used
  // in the well's countdown-unit columns), so that one keeps
  // `align-items: center`.
  centerAlignContent() { this.node.style['align-items'] = 'center' }
  topAlignContent() {
    this.node.style['align-items'] = this.node.orientation === 'column' ? 'stretch' : 'flex-start'
  }
  bottomAlignContent() {
    this.node.style['align-items'] = this.node.orientation === 'column' ? 'stretch' : 'flex-end'
  }
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

// Widget point dimensions — sourced from WIDGET_ENV_CONSTANTS, not
// hard-coded here, so a single edit up top propagates everywhere.
const FAMILY_SIZE = {
  small: [WIDGET_ENV_CONSTANTS.widgetSizes.small.w, WIDGET_ENV_CONSTANTS.widgetSizes.small.h],
  medium: [WIDGET_ENV_CONSTANTS.widgetSizes.medium.w, WIDGET_ENV_CONSTANTS.widgetSizes.medium.h],
  large: [WIDGET_ENV_CONSTANTS.widgetSizes.large.w, WIDGET_ENV_CONSTANTS.widgetSizes.large.h],
  extraLarge: [WIDGET_ENV_CONSTANTS.widgetSizes.extraLarge.w, WIDGET_ENV_CONSTANTS.widgetSizes.extraLarge.h],
}

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

// True zero state: nothing scheduled at all, no upcoming events.
// The countdown-view header still renders (per-family, same as the
// populated countdown) with "No upcoming events" centered in the
// interior below it — that's the empty-state design.
const NO_EVENTS = { events: [] }

// Every combination that has actually been buggy so far, plus the
// populated-today view for future-proofing this tool beyond the
// countdown view. Add a scenario here any time a new layout gets built
// — that's the whole point of keeping this checked into the repo.
const SCENARIOS = [
  { family: 'small', manifest: NO_EVENTS, label: 'Small — zero state' },
  { family: 'medium', manifest: NO_EVENTS, label: 'Medium — zero state' },
  { family: 'large', manifest: NO_EVENTS, label: 'Large — zero state' },
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
  // Offline by default so the preview exercises the cached-manifest path;
  // `scenario.online` (used by widget-showcase.mjs) serves the manifest as
  // a successful fetch instead, so no "offline" / "Cached schedule" tags.
  g.Request = class {
    timeoutInterval = 0
    async loadJSON() {
      if (g.__online) return manifest
      throw new Error('offline → cache')
    }
  }
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

export async function renderScenario(scenario, dark) {
  const g = globalThis
  installMocks(g, scenario.manifest, scenario.family)
  g.__dark = dark
  g.__online = !!scenario.online
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
  root.style['border-radius'] = WIDGET_ENV_CONSTANTS.outerCornerRadius + 'px'
  root.style['box-sizing'] = 'border-box'
  if (!root.style['background-color']) {
    root.style['background-color'] = dark ? WIDGET_ENV_CONSTANTS.background.dark : WIDGET_ENV_CONSTANTS.background.light
  }
  return renderNode(root)
}

export function fontFaceCss() {
  const fontPath = join(__dirname, '..', 'node_modules', '@fontsource-variable', 'nunito', 'files', 'nunito-latin-wght-normal.woff2')
  const fontBase64 = readFileSync(fontPath).toString('base64')
  return `@font-face {
    font-family: '${WIDGET_ENV_CONSTANTS.fontFamilyName}';
    src: url('data:font/woff2;base64,${fontBase64}') format('woff2-variations');
    font-weight: 200 900;
  }`
}

async function main() {
  const sections = []
  for (const scenario of SCENARIOS) {
    for (const dark of [false, true]) {
      const html = await renderScenario(scenario, dark)
      sections.push({ label: `${scenario.label} — ${dark ? 'dark' : 'light'}`, id: `s${sections.length}`, html })
    }
  }

  // See WIDGET_ENV_CONSTANTS.fontFallbackStack for the sourcing
  // rationale on Nunito as the SF Pro Rounded stand-in. Loaded from
  // node_modules and inlined as a base64 data: URI (Chromium won't
  // load a file:// font from a file:// page).
  const fontFace = fontFaceCss()

  const page = `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  ${fontFace}
  body { background:#333; font-family: ${WIDGET_ENV_CONSTANTS.fontFallbackStack}; margin:0; padding:24px; }
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
  const page1 = await browser.newPage({ viewport: { width: 1600, height: 1600 }, deviceScaleFactor: WIDGET_ENV_CONSTANTS.dpr })
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
  sections.forEach((s) => console.log(`  ${s.id}.png — ${s.label}`))
}

// Only run when invoked as a script (not when imported by a test).
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(err => { console.error(err); process.exit(1) })
}
