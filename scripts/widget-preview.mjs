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
// this file depends on — stack orientation, how a SwiftUI stack
// divides its width between children (allocateHStack; CSS flexbox
// does it differently, #204), fixed sizing, padding, alignment,
// line-limit truncation — measuring real rendered text instead of
// arithmetic guesses, at Apple's DOCUMENTED widget sizes for the
// owner's iPhone (plus the narrowest and widest phones for the
// width-sensitive layouts). That's enough to catch overlap / misalignment /
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
import { basename, dirname, join } from 'node:path'
import { chromium } from 'playwright'
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons'

const __dirname = dirname(fileURLToPath(import.meta.url))
// WIDGET_SCRIPT renders a variant copy of the widget instead (e.g. a
// design option to compare), into .widget-preview/<its file name>/.
const variant = process.env.WIDGET_SCRIPT
const widgetSrc = readFileSync(variant || join(__dirname, 'hpde-widget.js'), 'utf8')
const outDir = variant
  ? join(__dirname, '.widget-preview', basename(variant, '.js'))
  : join(__dirname, '.widget-preview')
mkdirSync(outDir, { recursive: true })

// ---------- WIDGET ENVIRONMENT CONSTANTS ----------
//
// Every value in this table has a citation. If you edit a number here,
// update the citation. If you can't cite it, don't put it here —
// this table exists so nothing in this simulator is a guess.
//
// Widget point sizes are per-device on iOS, so the simulator renders at
// the owner's phone by default and sweeps the narrowest and widest
// supported phones for the layouts that are most width-sensitive.
//
// Widget sizes per screen size, from Apple's Human Interface
// Guidelines, Widgets → Specifications → "iPhone widget sizes":
//   https://developer.apple.com/design/human-interface-guidelines/widgets
// (screen size in portrait points → small, medium, large). Keyed by
// that screen size so the widget's own Device.screenSize() lookup (see
// widgetSizeForScreen in hpde-widget.js) and this table share keys.
const DEVICE_WIDGET_SIZES = {
  // iPhone 14 Pro Max / 15 Plus / 15 Pro Max — the largest row.
  '430x932': { small: { w: 170, h: 170 }, medium: { w: 364, h: 170 }, large: { w: 364, h: 382 } },
  // iPhone 14 Pro / 15 / 15 Pro.
  '393x852': { small: { w: 158, h: 158 }, medium: { w: 338, h: 158 }, large: { w: 338, h: 354 } },
  // iPhone X / XS / 11 Pro (12 mini and 13 mini, 360×780, share these
  // widget sizes). The owner's phone: #204's on-device screenshots are
  // 1125×2436 px @3x = 375×812 pt, and the widgets in them measure
  // 987 px = 329 pt wide (Medium/Large), 1034 px ≈ 345 pt tall (Large)
  // and ~463 px ≈ 155 pt (Small) — this row exactly.
  '375x812': { small: { w: 155, h: 155 }, medium: { w: 329, h: 155 }, large: { w: 329, h: 345 } },
  // iPhone SE (2nd/3rd gen) / 8 — the narrowest phone that runs a
  // current iOS.
  '375x667': { small: { w: 148, h: 148 }, medium: { w: 321, h: 148 }, large: { w: 321, h: 324 } },
}
// extraLarge is iPad-only per HIG; mirror large so Scriptable's
// widgetFamily === 'extraLarge' code path stays renderable — the
// widget itself never targets iPad.
function withExtraLarge(sizes) { return { ...sizes, extraLarge: sizes.large } }

export const WIDGET_ENV_CONSTANTS = Object.freeze({
  // The phone the widget's owner actually uses (see DEVICE_WIDGET_SIZES).
  // Until #204 this was the 430×932 row mislabelled as "iPhone 15/16
  // Pro", so every render was 35pt wider than the real widget — room
  // the device never had, which is why fixed widths tuned in the
  // simulator truncated the countdown well to "•••" / "DAY…" on-device.
  referenceDevice: '375x812',
  deviceWidgetSizes: Object.fromEntries(
    Object.entries(DEVICE_WIDGET_SIZES).map(([k, v]) => [k, withExtraLarge(v)]),
  ),
  // Widget sizes on the reference device.
  widgetSizes: withExtraLarge(DEVICE_WIDGET_SIZES['375x812']),

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

  // Line height of one line of text, in ems. SF Pro's hhea metrics
  // (UPM 2048, ascender 1950, descender 494 — the SF fonts shipped with
  // Apple's SF Pro download) give (1950 + 494) / 2048 ≈ 1.19; SwiftUI's
  // Text uses the font's own line height. Nunito's is 1.364, so without
  // this every text line in the simulator was ~15% taller than on the
  // phone. Cross-checked against #204's screenshot: 11pt info rows with
  // 5pt spacing repeat every 55 px @3x = 18.3pt = 11 × 1.21 + 5.
  textLineHeight: 1.19,

  // Minimum width of a flexible addSpacer() (SwiftUI Spacer() with no
  // minLength). SwiftUI's standard spacing is 8pt; #204's Medium
  // screenshot measured a squeezed flexible spacer at ~9.5pt (28.5 px
  // @3x) between the 228pt info column + 12pt spacer and the well, which
  // is 8pt within measurement error of the card edges.
  flexSpacerMinWidth: 8,
})

// ---------- SwiftUI stack layout (widths) ----------
//
// Scriptable stacks are SwiftUI HStacks/VStacks, and SwiftUI divides a
// row's width differently from CSS flexbox. That difference is the
// other half of #204 (the first being the widget size): the simulator
// showed "1 more upcoming event" in full while the phone showed "1 more
// upcoming…", because CSS gives a text its full width before the
// stretchy divider lines on either side, whereas SwiftUI does this:
//
//   1. Fixed-size children (an explicit .size width, a fixed
//      addSpacer(n), an image) take their width.
//   2. Flexible addSpacer()s reserve only their minimum for now.
//   3. Every other child is offered an EQUAL SHARE of what's left, in
//      order of increasing flexibility (ideal width − minimum width):
//      the least flexible is offered remaining ÷ children-left, takes
//      what it needs (up to its ideal; a lineLimit=1 text truncates if
//      offered less), and the rest moves on to the next child. A stack
//      that contains a flexible spacer is infinitely flexible, so it
//      goes last and takes everything left.
//   4. Whatever is still left goes to the flexible spacers, evenly.
//
// Measured on #204's screenshots: the "more upcoming" footer row was
// 325pt; minus two 10pt gaps, the text was offered 305 ÷ 3 = 101.7pt,
// truncated, and each divider line took half of the remaining ~209pt
// (measured 104.7 and 104.3pt). Rule 2 is also on-device: Small's
// "Next HPDE" header shows untruncated even though an even split with
// its trailing spacer would have cut it off.
//
// A VStack offers its full inner width to every child and is as wide as
// its widest child; anything infinitely flexible makes it take the full
// offer (how a card stretches to the widget's width from one trailing
// spacer several stacks deep).
//
// Heights stay with CSS: widget rows are single-line texts and fixed
// sizes, and CSS column flex already splits leftover height evenly
// among vertical flex spacers, as SwiftUI does.
//
// `items`: [{ kind: 'fixed' | 'spacer' | 'view', min, ideal, place? }].
// `place(offer)` lays out a child's subtree within `offer` and returns
// the width it actually takes. Returns the width of each item.
// Serialized into the preview page (see layoutWidgetRoots), so it must
// stay self-contained.
export function allocateHStack(items, available) {
  const widths = items.map(() => 0)
  let remaining = available
  const spacers = []
  const views = []
  items.forEach((it, i) => {
    if (it.kind === 'fixed') {
      widths[i] = it.place ? it.place(it.ideal) : it.ideal
      remaining -= widths[i]
    } else if (it.kind === 'spacer') {
      widths[i] = it.min
      remaining -= it.min
      spacers.push(i)
    } else {
      views.push(i)
    }
  })
  const flexibility = it => (it.ideal === Infinity ? Infinity : it.ideal - it.min)
  // Stable sort: equally flexible children keep their order.
  views.sort((a, b) => {
    const fa = flexibility(items[a])
    const fb = flexibility(items[b])
    return fa === fb ? a - b : fa < fb ? -1 : 1
  })
  views.forEach((i, n) => {
    const it = items[i]
    const offer = Math.max(0, remaining) / (views.length - n)
    widths[i] = it.place ? it.place(offer) : Math.max(it.min, Math.min(offer, it.ideal))
    remaining -= widths[i]
  })
  if (spacers.length > 0 && remaining > 0) {
    for (const i of spacers) widths[i] += remaining / spacers.length
  }
  return widths
}

// Runs in the preview page after fonts load: lays out every
// [data-widget-root] with allocateHStack's rules by measuring the real
// rendered text, then pins each node's width in px. Serialized with
// toString(), so it must stay self-contained.
export function layoutWidgetRoots(spacerMin) {
  const px = v => parseFloat(v) || 0
  const kids = el => Array.from(el.children)
  const padH = el => { const cs = getComputedStyle(el); return px(cs.paddingLeft) + px(cs.paddingRight) }
  const gapsH = el => px(getComputedStyle(el).columnGap) * Math.max(0, el.children.length - 1)
  const cache = new Map()

  function measureText(el) {
    const prev = el.style.width
    el.style.width = 'max-content'
    const ideal = el.getBoundingClientRect().width
    let min
    if (el.dataset.ll === '1') {
      // A truncating text can shrink to its ellipsis (≈ 1em).
      min = Math.min(ideal, px(getComputedStyle(el).fontSize))
    } else {
      el.style.width = 'min-content'
      min = el.getBoundingClientRect().width
    }
    el.style.width = prev
    return { min, ideal }
  }

  function measure(el) {
    if (cache.has(el)) return cache.get(el)
    const k = el.dataset.k
    let m
    if (el.dataset.w) {
      m = { min: +el.dataset.w, ideal: +el.dataset.w, fixed: true }
    } else if (k === 'text') {
      m = measureText(el)
    } else if (k === 'img') {
      m = { min: px(el.style.width), ideal: px(el.style.width), fixed: true }
    } else if (k === 'h') {
      let min = padH(el) + gapsH(el)
      let ideal = min
      for (const c of kids(el)) {
        if (c.dataset.k === 'sp') { min += spacerMin; ideal = Infinity; continue }
        if (c.dataset.k === 'fsp') { min += +c.dataset.n; ideal += +c.dataset.n; continue }
        const cm = measure(c)
        min += cm.min
        ideal += cm.ideal
      }
      m = { min, ideal }
    } else if (k === 'v') {
      let min = 0
      let ideal = 0
      for (const c of kids(el)) {
        if (c.dataset.k === 'sp' || c.dataset.k === 'fsp') continue
        const cm = measure(c)
        min = Math.max(min, cm.min)
        ideal = Math.max(ideal, cm.ideal)
      }
      m = { min: padH(el) + min, ideal: padH(el) + ideal }
    } else {
      m = { min: 0, ideal: 0 }
    }
    cache.set(el, m)
    return m
  }

  // Lays out el's subtree within `offer`; returns el's width.
  function layout(el, offer) {
    const k = el.dataset.k
    const m = measure(el)
    let w = m.fixed ? m.ideal : Math.max(m.min, Math.min(offer, m.ideal))
    if (k === 'h') {
      const cs = kids(el)
      const items = cs.map(c => {
        const ck = c.dataset.k
        if (ck === 'sp') return { kind: 'spacer', min: spacerMin, ideal: Infinity }
        if (ck === 'fsp') return { kind: 'fixed', min: +c.dataset.n, ideal: +c.dataset.n }
        const cm = measure(c)
        return { kind: cm.fixed ? 'fixed' : 'view', min: cm.min, ideal: cm.ideal, place: o => layout(c, o) }
      })
      const widths = allocateHStack(items, w - padH(el) - gapsH(el))
      cs.forEach((c, i) => {
        c.style.width = widths[i] + 'px'
        c.style.flex = '0 0 auto'
        c.style.minWidth = '0'
      })
      // An HStack hugs its children (a flexible spacer inside has
      // already taken up any leftover).
      if (!m.fixed) w = padH(el) + gapsH(el) + widths.reduce((a, b) => a + b, 0)
    } else if (k === 'v') {
      const inner = w - padH(el)
      let widest = 0
      for (const c of kids(el)) {
        if (c.dataset.k === 'sp' || c.dataset.k === 'fsp') continue
        const cw = layout(c, inner)
        c.style.width = cw + 'px'
        // SwiftUI never squeezes a view below its height; it overflows.
        c.style.flexShrink = '0'
        widest = Math.max(widest, cw)
      }
      if (!m.fixed) w = Math.min(w, padH(el) + widest)
    }
    return w
  }

  for (const root of document.querySelectorAll('[data-widget-root]')) {
    cache.clear()
    layout(root, +root.dataset.w)
  }
}

// The <script> both preview pages inject; call
// `window.__layoutWidgets()` once document.fonts.ready resolves.
export function layoutRuntimeScript() {
  return `${allocateHStack.toString()}
${layoutWidgetRoots.toString()}
window.__layoutWidgets = () => layoutWidgetRoots(${WIDGET_ENV_CONSTANTS.flexSpacerMinWidth})`
}

// ---------- VNode tree ----------

let nodeId = 0
function makeNode(kind) {
  return { id: nodeId++, kind, style: {}, data: {}, children: [], text: null, orientation: 'row' }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]))
}

function renderNode(node) {
  const styleStr = Object.entries(node.style).map(([k, v]) => `${k}:${v}`).join(';')
  const styleAttr = styleStr ? ` style="${styleStr}"` : ''
  const dataAttr = Object.entries(node.data).map(([k, v]) => ` data-${k}="${escapeHtml(v)}"`).join('')
  const attrs = `${styleAttr}${dataAttr}`
  if (node.kind === 'image') {
    return `<div${attrs}>${node.text ?? ''}</div>` // raw SVG markup, not escaped
  }
  if (node.kind === 'text') {
    return `<div${attrs}>${escapeHtml(node.text ?? '')}</div>`
  }
  return `<div${attrs}>${node.children.map(renderNode).join('')}</div>`
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
export function loadLucideIconShapes(lucideName) {
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
    this.node.data.ll = String(n)
    if (n === 1) {
      this.node.style['white-space'] = 'pre'
      this.node.style.overflow = 'hidden'
      this.node.style['text-overflow'] = 'ellipsis'
      // KNOWN ISSUE, not fixed: some lineLimit=1 text (seen so far on
      // "…, TX" location strings) occasionally renders its last glyph
      // wrong — e.g. a capital X reading as a stray mark — only in the
      // full multi-scenario page, never in an isolated reproduction.
      // Treat any garbled trailing glyph in a render as a simulator
      // artifact to verify by eye against the source text, not a signal
      // about the real widget.
    } else if (n > 1) {
      this.node.style.display = '-webkit-box'
      this.node.style['-webkit-box-orient'] = 'vertical'
      this.node.style['-webkit-line-clamp'] = String(n)
      this.node.style.overflow = 'hidden'
    }
  }
  set textOpacity(v) { this.node.style.opacity = v }
}

// DrawContext / Path / Point — enough of Scriptable's drawing API to
// replay what the widget draws (its checkered flag) as an inline SVG,
// from the widget's OWN path data: nothing here is a stand-in shape.
class PointMock { constructor(x, y) { this.x = x; this.y = y } }
class PathMock {
  constructor() { this.segments = [] }
  move(p) { this.segments.push(`M${p.x} ${p.y}`) }
  addLine(p) { this.segments.push(`L${p.x} ${p.y}`) }
  addCurve(p, c1, c2) { this.segments.push(`C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${p.x} ${p.y}`) }
  closeSubpath() { this.segments.push('Z') }
}
class DrawContextMock {
  constructor() { this.size = new SizeMock(100, 100); this.opaque = true; this.respectScreenScale = false; this.fills = []; this.fill = null; this.path = null }
  setFillColor(c) { this.fill = c }
  addPath(path) { this.path = path }
  fillPath() { if (this.path) this.fills.push({ segments: this.path.segments.join(''), color: colorCss(this.fill) }) }
  getImage() {
    const { width: w, height: h } = this.size
    const body = this.fills.map(f => `<path fill="${f.color}" d="${f.segments}"/>`).join('')
    return { svg: `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%">${body}</svg>` }
  }
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
    this.node.data.k = orientation === 'row' ? 'h' : 'v'
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
    this.node.data.k = 'v'
    this.node.style['flex-direction'] = 'column'
  }
  addText(text) {
    const n = makeNode('text'); n.text = text
    n.data.k = 'text'
    n.style['font-size'] = '15px'
    n.style['line-height'] = String(WIDGET_ENV_CONSTANTS.textLineHeight)
    // SwiftUI keeps a Text's spaces ("Next in " + "2h"); HTML collapses them.
    n.style['white-space'] = 'pre-wrap'
    this.node.children.push(n)
    return new TextWrapper(n)
  }
  addImage(image) {
    const n = makeNode('image')
    n.data.k = 'img'
    // A DrawContext image carries its own SVG; an SF Symbol carries a name.
    n.text = image && image.svg ? image.svg : iconSvg(image && image.name)
    this.node.children.push(n)
    return new ImageWrapper(n)
  }
  addSpacer(n) {
    const sp = makeNode('spacer')
    if (n == null) {
      sp.data.k = 'sp'
      sp.style.flex = '1 1 0'
      sp.style['align-self'] = 'stretch'
    } else {
      sp.data.k = 'fsp'
      sp.data.n = String(n)
      sp.style.flex = '0 0 auto'
      if (this.node.orientation === 'row') sp.style.width = n + 'px'
      else sp.style.height = n + 'px'
    }
    this.node.children.push(sp)
  }
  setPadding(t, l, b, r) { this.node.style.padding = `${t}px ${r}px ${b}px ${l}px` }
  // topAlignContent / centerAlignContent / bottomAlignContent set the
  // stack's CROSS-axis alignment: on a row, top / center / bottom; on a
  // column, leading / center / trailing. Widths come from the SwiftUI
  // layout pass (layoutWidgetRoots), so a column's children keep their
  // own width and this only positions them.
  centerAlignContent() { this.node.style['align-items'] = 'center' }
  topAlignContent() { this.node.style['align-items'] = 'flex-start' }
  bottomAlignContent() { this.node.style['align-items'] = 'flex-end' }
  set backgroundColor(c) { this.node.style['background-color'] = colorCss(c) }
  set cornerRadius(v) { this.node.style['border-radius'] = v + 'px' }
  set size(s) {
    if (s.width > 0) { this.node.data.w = String(s.width); this.node.style.width = s.width + 'px'; this.node.style['flex-shrink'] = '0' }
    if (s.height > 0) { this.node.style.height = s.height + 'px'; this.node.style['flex-shrink'] = '0' }
  }
  set spacing(n) { this.node.style.gap = n + 'px' }
  set url(_v) {}
  set borderColor(_v) {}
  set borderWidth(_v) {}
}

// A ListWidget is a VStack in a fixed frame: SwiftUI centers its
// children horizontally (a VStack's default alignment) and centers the
// whole column vertically when it's shorter than the widget — the
// widget script's own comments note content floating to the middle
// on-device without a trailing flex spacer. Content taller than the
// widget overflows equally off the top and bottom, as in SwiftUI.
class ListWidgetMock extends StackMock {
  constructor() {
    super('column')
    this.node.data.k = 'v'
    this.node.style['justify-content'] = 'center'
  }
  set refreshAfterDate(_v) {}
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

// Today is an event created in the app (#229) whose schedule hasn't been
// added yet: no run groups, no activities. The iOS widget sees these
// since #232.
const TODAY_NO_SCHEDULE = {
  events: [
    { id: 'c', name: 'TDE at ECR 2.7 CW', organizer: 'The Drivers Edge', track: 'Eagles Canyon Raceway',
      city: 'Decatur, TX', runGroups: [], days: [{ id: 'saturday', date: isoDate(0), label: 'Saturday', activities: [] }] },
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
// A real event with long strings — the ones that truncated on-device.
const UPCOMING_LONG = {
  events: [
    { id: 'e', name: 'TDE at ECR 2.7 CW', organizer: 'The Drivers Edge', track: 'Eagles Canyon Raceway',
      city: 'Decatur, TX', configuration: '2.7', direction: 'Clockwise',
      runGroups: [], days: [{ date: isoDate(9), label: 'Saturday', activities: [] }] },
    ...UPCOMING_MULTI.events,
  ],
}

// The owner's phone first (every scenario), then the narrowest and
// widest phones for the width-sensitive countdown layouts. Scenarios
// without a `device` render on WIDGET_ENV_CONSTANTS.referenceDevice.
const SWEEP_DEVICES = ['375x667', '430x932']
const SWEEP = [
  { family: 'small', manifest: UPCOMING_LONG, label: 'Small — countdown (long names)' },
  { family: 'medium', manifest: UPCOMING_LONG, label: 'Medium — countdown (long names)' },
  { family: 'large', manifest: UPCOMING_ONE, label: 'Large — countdown (1 upcoming, rich)' },
  { family: 'large', manifest: UPCOMING_LONG, label: 'Large — countdown (2 upcoming, long names)' },
]
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
  { family: 'medium', manifest: TODAY_NO_SCHEDULE, label: 'Medium — today, no schedule yet' },
  { family: 'large', manifest: TODAY_NO_SCHEDULE, label: 'Large — today, no schedule yet' },
  ...[WIDGET_ENV_CONSTANTS.referenceDevice, ...SWEEP_DEVICES].flatMap(device =>
    SWEEP.map(s => ({ ...s, device }))),
]

function screenSizeOf(device) {
  const [width, height] = device.split('x').map(Number)
  return { width, height }
}

function installMocks(g, manifest, widgetFamily, widgetParameter = null, device = WIDGET_ENV_CONSTANTS.referenceDevice) {
  g.Color = ColorMock
  g.Size = SizeMock
  g.Point = PointMock
  g.Path = PathMock
  g.DrawContext = DrawContextMock
  g.Font = Font
  g.Device = { isUsingDarkAppearance: () => g.__dark, screenSize: () => screenSizeOf(device) }
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
      if (!g.__online) throw new Error('offline → cache')
      // Scriptable fills in `response` once a load completes.
      this.response = { statusCode: 200 }
      return manifest
    }
  }
  g.SFSymbol = { named: name => ({ image: { name } }) }
  g.WidgetStack = StackMock
  g.ListWidget = ListWidgetMock
  g.Script = { setWidget: w => { g.__widget = w }, complete: () => {} }
  g.args = { widgetParameter }
  g.config = { widgetFamily, runsInWidget: true }
  // Records what the widget schedules, so widget-showcase.mjs can render
  // the real notification text.
  g.__notifs = []
  class NotificationStub {
    setTriggerDate(d) { this.triggerDate = d }
    async schedule() { g.__notifs.push({ title: this.title, body: this.body, at: this.triggerDate }) }
    static async allPending() { return [] }
    static async removePending() {}
  }
  g.Notification = NotificationStub
}

// Returns the widget's HTML; the page must include layoutRuntimeScript()
// and call window.__layoutWidgets() after fonts load. `scenario.device`
// is a DEVICE_WIDGET_SIZES key (default: the reference device).
export async function renderScenario(scenario, dark) {
  const g = globalThis
  const device = scenario.device ?? WIDGET_ENV_CONSTANTS.referenceDevice
  installMocks(g, scenario.manifest, scenario.family, scenario.param ?? null, device)
  g.__dark = dark
  g.__online = !!scenario.online
  g.__widget = null
  const wrapped = `(async () => { ${widgetSrc} })()`
  // eslint-disable-next-line no-eval
  await eval(wrapped)
  const root = g.__widget instanceof StackMock ? g.__widget.node : null
  if (!root) return '<div style="color:red">render failed — no widget produced</div>'
  const sizes = WIDGET_ENV_CONSTANTS.deviceWidgetSizes[device]
  if (!sizes) throw new Error(`unknown device ${device}`)
  const { w, h } = sizes[scenario.family] || sizes.medium
  root.data['widget-root'] = ''
  root.data.w = String(w)
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
    const device = scenario.device ?? WIDGET_ENV_CONSTANTS.referenceDevice
    const { w, h } = WIDGET_ENV_CONSTANTS.deviceWidgetSizes[device][scenario.family]
    for (const dark of [false, true]) {
      const html = await renderScenario(scenario, dark)
      const label = `${scenario.label} — ${w}×${h} — ${dark ? 'dark' : 'light'}`
      sections.push({ label, id: `s${sections.length}`, html })
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
</style>
<script>${layoutRuntimeScript()}</script></head>
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
  const pageErrors = []
  page1.on('pageerror', err => pageErrors.push(err))
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
  // SwiftUI-style widths are measured from the real text, so only once
  // the font is in.
  await page1.evaluate(() => window.__layoutWidgets())
  if (pageErrors.length > 0) throw pageErrors[0]
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
