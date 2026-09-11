// HPDE track-day schedule — iOS Home Screen widget for Scriptable.
// Source: https://github.com/inko9nito/hpde/blob/main/scripts/hpde-widget.js
// Data:   https://inko9nito.github.io/hpde/api/events.json
//
// Setup: install Scriptable → paste this script → long-press Home Screen →
//   Add Widget → Scriptable → Medium → Edit Widget → Script = this script.
// Optional Parameter: comma-separated run group ids (e.g. "orange,blue") to
//   filter session rows. Leave blank to show everything.

const DATA_URL = "https://inko9nito.github.io/hpde/api/events.json"
const SITE_URL = "https://inko9nito.github.io/hpde/"
const CACHE_FILENAME = "hpde-events.json"

const LAST_EVENT_FALLBACK_MIN = 30
const CURRENT_END_LOOKAHEAD_MIN = 5

// ---------- data fetching (with offline cache) ----------

function getFm() {
  try { return FileManager.iCloud() } catch (_) { return FileManager.local() }
}

function cachePath(fm) {
  return fm.joinPath(fm.documentsDirectory(), CACHE_FILENAME)
}

async function loadManifest() {
  const fm = getFm()
  const path = cachePath(fm)
  try {
    const req = new Request(DATA_URL)
    req.timeoutInterval = 8
    const manifest = await req.loadJSON()
    try { fm.writeString(path, JSON.stringify(manifest)) } catch (_) {}
    return { manifest, stale: false }
  } catch (e) {
    if (fm.fileExists(path)) {
      return { manifest: JSON.parse(fm.readString(path)), stale: true }
    }
    throw e
  }
}

// ---------- date + time helpers ----------

function todayIso() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

function parseMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number)
  return h * 60 + m
}

function nowMinutes() {
  const d = new Date()
  return d.getHours() * 60 + d.getMinutes()
}

// SF Rounded — the same font family used for every text in the
// widget so the type reads as one system. Scriptable exposes a full
// set of weights (regular / medium / semibold / bold / heavy) as
// static methods on Font.
function rFont(size) {
  return typeof Font.regularRoundedSystemFont === "function"
    ? Font.regularRoundedSystemFont(size)
    : Font.systemFont(size)
}
function rMediumFont(size) {
  return typeof Font.mediumRoundedSystemFont === "function"
    ? Font.mediumRoundedSystemFont(size)
    : Font.mediumSystemFont(size)
}
function rSemiboldFont(size) {
  return typeof Font.semiboldRoundedSystemFont === "function"
    ? Font.semiboldRoundedSystemFont(size)
    : Font.semiboldSystemFont(size)
}
function rBoldFont(size) {
  return typeof Font.boldRoundedSystemFont === "function"
    ? Font.boldRoundedSystemFont(size)
    : Font.boldSystemFont(size)
}
function rHeavyFont(size) {
  return typeof Font.heavyRoundedSystemFont === "function"
    ? Font.heavyRoundedSystemFont(size)
    : Font.boldSystemFont(size)
}

function formatTime12(hhmm) {
  const [h, m] = hhmm.split(":").map(Number)
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, "0")}`
}

function formatCountdown(min) {
  if (min <= 0) return ""
  if (min < 60) return `${min}m`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m === 0 ? `${h}h` : `${h}h ${m}m`
}

// ---------- event picking ----------

function pickToday(manifest) {
  const iso = todayIso()
  for (const event of manifest.events) {
    for (const day of event.days) {
      if (day.date === iso) return { event, day }
    }
  }
  return null
}

function pickNextFuture(manifest) {
  const iso = todayIso()
  const future = []
  for (const event of manifest.events) {
    for (const day of event.days) {
      if (day.date > iso) future.push({ event, day })
    }
  }
  future.sort((a, b) => a.day.date.localeCompare(b.day.date))
  return future[0] || null
}

function parseGroupFilter() {
  const raw = typeof args !== "undefined" && args.widgetParameter
  if (!raw) return []
  return String(raw).split(",").map(s => s.trim()).filter(Boolean)
}

// ---------- palette ----------

function palette(dark) {
  return dark
    ? { bg: new Color("#0e0e11"), fg: new Color("#f5f5f7"), muted: new Color("#8a8a8f"),
        cardBg: new Color("#18181c"), cardBorder: new Color("#2a2a30"),
        currentCardBg: new Color("#122135"), divider: new Color("#26262c"),
        accent: new Color("#3b82f6"), pastOpacity: 0.6 }
    : { bg: new Color("#f9fafb"), fg: new Color("#111827"), muted: new Color("#9ca3af"),
        cardBg: new Color("#ffffff"), cardBorder: new Color("#e5e7eb"),
        currentCardBg: new Color("#eef4ff"), divider: new Color("#e5e7eb"),
        accent: new Color("#3b82f6"), pastOpacity: 0.6 }
}

function urgencyColor(min, p) {
  if (min <= 5) return new Color("#ef4444")
  if (min <= 10) return new Color("#f97316")
  return p.muted
}

// Best-effort widget pixel width for the running host, so the
// divider — whose width Scriptable will not auto-stretch — can be
// sized to reach the card's right inner edge. Values below are
// Apple's published medium-widget sizes indexed by screen portrait
// width for common iPhones.
function widgetWidth() {
  const family = config.widgetFamily || "medium"
  const s = Device.screenSize()
  const sw = Math.round(Math.min(s.width, s.height))
  let medium
  if (sw <= 320) medium = 292
  else if (sw <= 375) medium = 329
  else if (sw <= 390) medium = 338
  else if (sw <= 414) medium = 345
  else if (sw <= 428) medium = 364
  else medium = 364
  if (family === "small") return Math.round(medium / 2) - 8
  if (family === "extraLarge") return medium * 2 + 12
  return medium
}

// The maximum divider width we can request without overflowing the
// card's right inner edge. Assumes the current card's layout (whose
// content interior is one border-width narrower than the
// non-current card's, but LEFT/RIGHT gutter values match).
function computeDividerWidth() {
  const w = widgetWidth()
  const cardOuter = w - WIDGET_SIDE_PAD_LEFT - WIDGET_SIDE_PAD_RIGHT
    - LEFT_GUTTER_WIDTH - RIGHT_GUTTER_WIDTH
  const cardInner = cardOuter - 2 * CURRENT_CARD_BORDER_WIDTH
  const contentInner = cardInner - 2 * CARD_INNER_PAD_H
  return Math.max(120, contentInner - TIME_COLUMN_WIDTH - 8)
}

// ---------- rendering ----------

function makeWidget({ manifest, stale }) {
  const w = new ListWidget()
  const dark = Device.isUsingDarkAppearance()
  const p = palette(dark)
  w.backgroundColor = p.bg
  w.setPadding(10, WIDGET_SIDE_PAD_LEFT, 10, WIDGET_SIDE_PAD_RIGHT)
  w.url = SITE_URL

  const picked = pickToday(manifest)
  if (!picked) {
    renderNoEvents(w, p, stale, pickNextFuture(manifest))
    w.refreshAfterDate = new Date(Date.now() + 60 * 60 * 1000)
    return w
  }

  const { event, day } = picked
  const groupById = Object.fromEntries(event.runGroups.map(g => [g.id, g]))
  const selected = parseGroupFilter()

  const visible = day.events.filter(e => {
    if (e.type !== "session") return true
    if (selected.length === 0) return true
    const on = (e.onTrack || []).some(id => selected.includes(id))
    const inC = (e.inClass || []).some(id => selected.includes(id))
    return on || inC
  }).filter(e => e.type !== "break")

  renderHeader(w, event, day, p, stale)

  const now = nowMinutes()

  let currentIdx = -1
  let currentProgress = 0
  let lastPastIdx = -1
  for (let i = 0; i < visible.length; i++) {
    if (parseMinutes(visible[i].time) <= now) lastPastIdx = i
    else break
  }
  if (lastPastIdx !== -1) {
    const start = parseMinutes(visible[lastPastIdx].time)
    const nextEv = visible[lastPastIdx + 1]
    const end = nextEv ? parseMinutes(nextEv.time) : start + LAST_EVENT_FALLBACK_MIN
    const currentEndsAt = nextEv
      ? Math.max(start, end - CURRENT_END_LOOKAHEAD_MIN)
      : end
    if (now < currentEndsAt) {
      currentIdx = lastPastIdx
      currentProgress = end === start ? 0 : (now - start) / (end - start)
    }
  }

  const nextIdx = visible.findIndex(e => parseMinutes(e.time) > now)
  const insertAt = nextIdx === -1 ? visible.length : nextIdx
  const nextEvent = insertAt < visible.length ? visible[insertAt] : null

  const family = config.widgetFamily || "medium"
  const isLarge = family === "large" || family === "extraLarge"
  const maxRows = isLarge ? 10 : 3
  const maxPast = isLarge ? 2 : 1

  const anchorIdx = currentIdx !== -1 ? currentIdx : insertAt
  const start = Math.max(0, anchorIdx - maxPast)
  const rows = visible.slice(start, start + maxRows)

  const nowLineBetweenAt = currentIdx === -1 ? insertAt - start : -1
  const currentLocalIdx = currentIdx === -1 ? -1 : currentIdx - start

  for (let i = 0; i < rows.length; i++) {
    if (i === nowLineBetweenAt) drawNowLine(w, p, now, nextEvent, 6)
    const ev = rows[i]
    const isCurrentEvent = i === currentLocalIdx
    const past = !isCurrentEvent && parseMinutes(ev.time) < now
    drawEventRow(w, ev, groupById, selected, p, past,
      isCurrentEvent ? { progress: currentProgress, now, nextEvent } : null)
  }
  if (nowLineBetweenAt >= rows.length) drawNowLine(w, p, now, null, 6)

  w.refreshAfterDate = new Date(Date.now() + 60 * 1000)
  return w
}

function renderHeader(w, event, day, p, stale) {
  const outer = w.addStack()
  outer.spacing = 0
  outer.addSpacer(LEFT_GUTTER_WIDTH)
  const row = outer.addStack()
  row.centerAlignContent()

  const title = row.addText(event.name)
  title.font = rBoldFont(14)
  title.textColor = p.fg
  title.lineLimit = 1

  const sep = row.addText("  ·  ")
  sep.font = rFont(12)
  sep.textColor = p.muted

  const sub = row.addText(day.label)
  sub.font = rFont(12)
  sub.textColor = p.muted
  sub.lineLimit = 1

  row.addSpacer()

  if (stale) {
    const s = row.addText("offline")
    s.font = rFont(9)
    s.textColor = p.muted
  }

  outer.addSpacer(RIGHT_GUTTER_WIDTH)
  w.addSpacer(6)
}

// ----- current-card layout constants -----

// Top/bottom pad zone inside the current card. Big enough to hold
// the marker dot with no clipping — safeMin = min(cornerRadius,
// PAD_V - dotDiameter), which for these values gives a fully
// visible bar sitting just below the corner curve.
const CURRENT_CARD_PAD_V = 14
const CURRENT_CARD_CORNER_RADIUS = 8
const CURRENT_CARD_BORDER_WIDTH = 1
const CURRENT_CARD_OUTER_PAD = CURRENT_CARD_BORDER_WIDTH
const CURRENT_CARD_INNER_CORNER_RADIUS =
  CURRENT_CARD_CORNER_RADIUS - CURRENT_CARD_BORDER_WIDTH

const CURRENT_CONTENT_HEIGHT = 26
const CURRENT_CONTENT_HEIGHT_STACKED = 58
// Extra vertical space added to the current card when the event
// carries a note (or a general-event subtitle), so the note line
// fits below the main content row without pushing the marker zones.
const NOTE_ROW_HEIGHT = 17

function eventNote(ev) {
  return ev.note || ev.subtitle || null
}

function currentContentHeightFor(ev) {
  const hasBoth = ev.type === "session"
    && (ev.onTrack || []).length > 0 && (ev.inClass || []).length > 0
  const baseH = hasBoth ? CURRENT_CONTENT_HEIGHT_STACKED : CURRENT_CONTENT_HEIGHT
  return baseH + (eventNote(ev) ? NOTE_ROW_HEIGHT : 0)
}

const NONCURRENT_CARD_CORNER_RADIUS = 14

// ----- now-marker sizing -----
const NOW_LINE_DOT_DIAMETER = 8
const NOW_LINE_BAR_HEIGHT = 2

// ----- widget-level padding -----
//
// Left side: dot sits flush against the card's left border (no
// horizontal gap between them), so the marker dot reads as
// connected to the card. WIDGET_SIDE_PAD_LEFT gives the dot itself
// some breathing room before the widget's left edge.
//
// Right side: the widget's own right padding drops to 0, and the
// right gutter absorbs the visual right margin. That lets the
// between-cards blue rule extend all the way to the widget's right
// edge instead of stopping short at the card's right border.
const WIDGET_SIDE_PAD_LEFT = 8
const WIDGET_SIDE_PAD_RIGHT = 0
const LEFT_GUTTER_WIDTH = NOW_LINE_DOT_DIAMETER   // dot only, no gap
const RIGHT_GUTTER_WIDTH = 16

const CURRENT_CAPTION_OUTER_PAD = 4
const CARD_INNER_PAD_H = 12

// Unified column widths so every row's time and section labels line
// up at the same x whether the row is the current card or a plain
// event row.
const TIME_COLUMN_WIDTH = 60
const LABEL_COLUMN_WIDTH = 64

// Session divider width: computed at runtime from the actual widget
// width so the divider extends flush to the card's right inner edge
// on every iPhone. Scriptable doesn't stretch a stack to fill its
// parent's auto width, so the alternative is to guess — which is
// what we did before, and why the divider fell short on Pro Max.
const DIVIDER_WIDTH = computeDividerWidth()

function drawEventRow(w, ev, groupById, selected, p, past, current) {
  const lineBelow = !!current && current.progress >= 0.5
  const lineAbove = !!current && !lineBelow

  if (lineAbove) {
    w.addSpacer(CURRENT_CAPTION_OUTER_PAD)
    drawNowCaption(w, p, current.now, current.nextEvent)
    w.addSpacer(3)
  }

  const outerRow = w.addStack()
  outerRow.spacing = 0

  const leftGutter = outerRow.addStack()
  leftGutter.layoutVertically()
  leftGutter.size = new Size(LEFT_GUTTER_WIDTH, 0)

  const cardContainer = outerRow.addStack()

  const rightGutter = outerRow.addStack()
  rightGutter.layoutVertically()
  rightGutter.size = new Size(RIGHT_GUTTER_WIDTH, 0)

  if (current) {
    drawCurrentCard(cardContainer, leftGutter, rightGutter,
      ev, groupById, selected, p, past, current, lineAbove, lineBelow)
  } else {
    drawNonCurrentCard(cardContainer, ev, groupById, selected, p, past)
  }

  if (lineBelow) {
    w.addSpacer(3)
    drawNowCaption(w, p, current.now, current.nextEvent)
    w.addSpacer(CURRENT_CAPTION_OUTER_PAD)
  }
  w.addSpacer(6)
}

function drawCurrentCard(cardContainer, leftGutter, rightGutter,
    ev, groupById, selected, p, past, current, lineAbove, lineBelow) {
  cardContainer.layoutVertically()
  cardContainer.backgroundColor = p.accent
  cardContainer.cornerRadius = CURRENT_CARD_CORNER_RADIUS
  cardContainer.setPadding(
    CURRENT_CARD_BORDER_WIDTH, CURRENT_CARD_BORDER_WIDTH,
    CURRENT_CARD_BORDER_WIDTH, CURRENT_CARD_BORDER_WIDTH,
  )

  const card = cardContainer.addStack()
  card.layoutVertically()
  card.backgroundColor = p.currentCardBg
  card.cornerRadius = CURRENT_CARD_INNER_CORNER_RADIUS

  const topFraction = lineAbove ? current.progress * 2 : null
  const botFraction = lineBelow ? (current.progress - 0.5) * 2 : null

  const contentH = currentContentHeightFor(ev)

  leftGutter.addSpacer(CURRENT_CARD_OUTER_PAD)
  addMarkerColumnZone(leftGutter, topFraction, "dot", p.accent, false)
  leftGutter.addSpacer(contentH)
  addMarkerColumnZone(leftGutter, botFraction, "dot", p.accent, true)
  leftGutter.addSpacer(CURRENT_CARD_OUTER_PAD)

  addMarkerColumnZone(card, topFraction, "bar", p.accent, false)

  const contentBlock = card.addStack()
  contentBlock.size = new Size(0, contentH)
  const contentPadH = CARD_INNER_PAD_H - CURRENT_CARD_OUTER_PAD
  contentBlock.setPadding(0, contentPadH, 0, contentPadH)

  buildCardContent(contentBlock, ev, groupById, selected, p, past, true)

  addMarkerColumnZone(card, botFraction, "bar", p.accent, true)

  rightGutter.addSpacer(CURRENT_CARD_OUTER_PAD)
  addMarkerColumnZone(rightGutter, topFraction, "bar", p.accent, false)
  rightGutter.addSpacer(contentH)
  addMarkerColumnZone(rightGutter, botFraction, "bar", p.accent, true)
  rightGutter.addSpacer(CURRENT_CARD_OUTER_PAD)
}

function drawNonCurrentCard(cardContainer, ev, groupById, selected, p, past) {
  cardContainer.backgroundColor = p.cardBg
  cardContainer.borderColor = p.cardBorder
  cardContainer.borderWidth = 1
  cardContainer.cornerRadius = NONCURRENT_CARD_CORNER_RADIUS
  cardContainer.setPadding(8, CARD_INNER_PAD_H, 8, CARD_INNER_PAD_H)
  buildCardContent(cardContainer, ev, groupById, selected, p, past, false)
}

function addMarkerColumnZone(col, fraction, elementType, color, isBottomZone) {
  if (fraction === null) {
    col.addSpacer(CURRENT_CARD_PAD_V)
    return
  }
  const rowH = NOW_LINE_DOT_DIAMETER
  const cr = CURRENT_CARD_INNER_CORNER_RADIUS
  const safeMin = isBottomZone ? 0 : Math.min(cr, CURRENT_CARD_PAD_V - rowH)
  const safeMax = isBottomZone
    ? Math.max(safeMin, CURRENT_CARD_PAD_V - rowH - cr)
    : Math.max(safeMin, CURRENT_CARD_PAD_V - rowH)
  const before = safeMin + fraction * (safeMax - safeMin)
  const after = Math.max(0, CURRENT_CARD_PAD_V - rowH - before)
  col.addSpacer(before)
  addMarkerElementRow(col, elementType, color)
  col.addSpacer(after)
}

function addMarkerElementRow(col, elementType, color) {
  const row = col.addStack()
  row.size = new Size(0, NOW_LINE_DOT_DIAMETER)
  row.centerAlignContent()
  if (elementType === "dot") {
    const dot = row.addStack()
    dot.size = new Size(NOW_LINE_DOT_DIAMETER, NOW_LINE_DOT_DIAMETER)
    dot.backgroundColor = color
    dot.cornerRadius = NOW_LINE_DOT_DIAMETER / 2
  } else if (elementType === "bar") {
    const bar = row.addStack()
    bar.backgroundColor = color
    bar.size = new Size(0, NOW_LINE_BAR_HEIGHT)
    bar.addSpacer()
  }
}

// Card interior. Builds either a single main row [time | info] or,
// when the event carries a note or subtitle, a vertical layout with
// the main row on top and the note line below.
function buildCardContent(container, ev, groupById, selected, p, past, current) {
  const note = eventNote(ev)

  if (note) {
    container.layoutVertically()
    // Flexible spacers vertically center the main row + note pair
    // inside the current card's fixed-height contentBlock. On a
    // non-current card `container` is the card itself (no fixed
    // height), and a flex spacer there balloons the card to fill
    // whatever extra vertical space the widget's layout hands it
    // — which is why an event-with-note previously rendered
    // enormously tall.
    if (current) container.addSpacer()

    const mainRow = container.addStack()
    mainRow.centerAlignContent()
    mainRow.spacing = 8
    buildMainContent(mainRow, ev, groupById, selected, p, past, current)

    container.addSpacer(3)
    addNoteRow(container, note, p, past, current)
    if (current) container.addSpacer()
  } else {
    container.centerAlignContent()
    container.spacing = 8
    buildMainContent(container, ev, groupById, selected, p, past, current)
  }
}

function buildMainContent(mainRow, ev, groupById, selected, p, past, current) {
  addTimeColumn(mainRow, ev.time, p, past, current)

  if (ev.type === "session") {
    const onTrack = (ev.onTrack || []).map(id => groupById[id]).filter(Boolean)
    const inClass = (ev.inClass || []).map(id => groupById[id]).filter(Boolean)
    const stacked = onTrack.length > 0 && inClass.length > 0

    if (stacked) {
      const infoBlock = mainRow.addStack()
      infoBlock.layoutVertically()

      addSectionRow(infoBlock, "On track", onTrack, selected, p, past, current)
      infoBlock.addSpacer(current ? 6 : 8)
      addRowDivider(infoBlock, p)
      infoBlock.addSpacer(current ? 6 : 8)
      addSectionRow(infoBlock, "In class", inClass, selected, p, past, current)
    } else if (onTrack.length) {
      addSectionRow(mainRow, "On track", onTrack, selected, p, past, current)
      mainRow.addSpacer()
    } else if (inClass.length) {
      addSectionRow(mainRow, "In class", inClass, selected, p, past, current)
      mainRow.addSpacer()
    }
  } else {
    const isFood = ev.type === "lunch" || ev.type === "special"
    if (isFood) {
      const icon = mainRow.addText(ev.type === "lunch" ? "🍔" : "⭐")
      icon.font = rFont(current ? 16 : 13)
      mainRow.addSpacer(6)
    }
    const label = mainRow.addText(ev.label)
    label.font = isFood
      ? rBoldFont(current ? 15 : 12)
      : rMediumFont(current ? 15 : 12)
    label.textColor = p.fg
    label.lineLimit = 1
    if (past) label.textOpacity = p.pastOpacity
    mainRow.addSpacer()
  }
}

function addTimeColumn(row, hhmm, p, past, current) {
  const timeCol = row.addStack()
  timeCol.size = new Size(TIME_COLUMN_WIDTH, 0)
  timeCol.centerAlignContent()

  const time = timeCol.addText(formatTime12(hhmm))
  time.font = current ? rHeavyFont(18) : rMediumFont(14)
  time.textColor = p.fg
  time.lineLimit = 1
  if (past) time.textOpacity = p.pastOpacity
  timeCol.addSpacer()
}

function addSectionRow(parent, labelText, groups, selected, p, past, current) {
  const row = parent.addStack()
  row.centerAlignContent()
  row.spacing = 10

  addSectionLabelColumn(row, labelText, p, past, current)

  const pillsStack = row.addStack()
  pillsStack.centerAlignContent()
  pillsStack.spacing = 6
  const dimSelected = selected.length > 0
  for (const g of groups) {
    const dim = dimSelected && !selected.includes(g.id)
    addGroupPill(pillsStack, g, dim || past, current)
  }
  row.addSpacer()
}

function addSectionLabelColumn(row, text, p, past, current) {
  const col = row.addStack()
  col.size = new Size(LABEL_COLUMN_WIDTH, 0)
  col.centerAlignContent()
  const l = col.addText(text)
  l.font = rFont(current ? 13 : 12)
  l.textColor = p.muted
  l.lineLimit = 1
  if (past) l.textOpacity = p.pastOpacity
  col.addSpacer()
}

function addRowDivider(col, p) {
  const line = col.addStack()
  line.backgroundColor = p.divider
  line.size = new Size(DIVIDER_WIDTH, 1)
}

// Small muted note / subtitle line beneath the main content row.
// Indented past the time column so it aligns with the info block
// above it — reads as belonging to the event, not the widget.
function addNoteRow(container, note, p, past, current) {
  const row = container.addStack()
  row.addSpacer(TIME_COLUMN_WIDTH + 8)
  const text = row.addText(note)
  text.font = rFont(current ? 12 : 11)
  text.textColor = p.muted
  text.lineLimit = 1
  if (past) text.textOpacity = p.pastOpacity
  row.addSpacer()
}

function addGroupPill(row, g, dim, current) {
  const alpha = dim ? 0.55 : 1.0
  const pill = row.addStack()
  pill.backgroundColor = new Color(g.color, alpha)
  pill.cornerRadius = 100
  if (current) {
    pill.setPadding(3, 12, 3, 12)
  } else {
    pill.setPadding(2, 8, 2, 8)
  }
  pill.centerAlignContent()
  const label = pill.addText(g.label)
  label.font = current ? rBoldFont(13) : rMediumFont(10)
  label.textColor = new Color("#ffffff", alpha)
}

function drawNowCaption(w, p, now, nextEvent) {
  const outer = w.addStack()
  outer.spacing = 0
  outer.addSpacer(LEFT_GUTTER_WIDTH + CARD_INNER_PAD_H)
  const row = outer.addStack()
  row.centerAlignContent()

  const time = row.addText(nowHM().toUpperCase())
  time.font = rMediumFont(10)
  time.textColor = p.accent

  row.addSpacer()

  if (nextEvent) {
    const min = parseMinutes(nextEvent.time) - now
    if (min > 0) {
      const prefix = row.addText("Next in ")
      prefix.font = rFont(10)
      prefix.textColor = p.muted
      const label = row.addText(formatCountdown(min))
      label.font = rBoldFont(10)
      label.textColor = urgencyColor(min, p)
    }
  }
  outer.addSpacer(RIGHT_GUTTER_WIDTH + CARD_INNER_PAD_H)
}

function drawNowRule(w, p) {
  const outer = w.addStack()
  outer.spacing = 0
  outer.centerAlignContent()

  // Dot occupies the left gutter (same as the current-event card's
  // marker dot), so the between-cards rule reads as the same
  // marker style as the in-card marker.
  const dot = outer.addStack()
  dot.size = new Size(NOW_LINE_DOT_DIAMETER, NOW_LINE_DOT_DIAMETER)
  dot.backgroundColor = p.accent
  dot.cornerRadius = NOW_LINE_DOT_DIAMETER / 2

  // No trailing spacer — bar extends across the right gutter and
  // into the widget's zero-width right padding, all the way to the
  // widget's right edge.
  const bar = outer.addStack()
  bar.backgroundColor = p.accent
  bar.size = new Size(0, NOW_LINE_BAR_HEIGHT)
  bar.addSpacer()
}

function drawNowLine(w, p, now, nextEvent, belowSpacer) {
  drawNowCaption(w, p, now, nextEvent)
  w.addSpacer(2)
  drawNowRule(w, p)
  if (belowSpacer > 0) w.addSpacer(belowSpacer)
}

function nowHM() {
  const d = new Date()
  const h = d.getHours() % 12 || 12
  const ampm = d.getHours() >= 12 ? "PM" : "AM"
  return `${h}:${String(d.getMinutes()).padStart(2, "0")} ${ampm}`
}

function shortDate(iso) {
  const [y, m, d] = iso.split("-").map(Number)
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  return `${months[m - 1]} ${d}`
}

function renderNoEvents(w, p, stale, next) {
  const title = w.addText("HPDE")
  title.font = rBoldFont(14)
  title.textColor = p.fg
  w.addSpacer(6)

  const msg = w.addText("No event today.")
  msg.font = rFont(12)
  msg.textColor = p.muted

  if (next) {
    w.addSpacer(4)
    const nx = w.addText(`Next: ${next.event.name}`)
    nx.font = rMediumFont(11)
    nx.textColor = p.fg
    nx.lineLimit = 1
    const when = w.addText(`${next.day.label}, ${shortDate(next.day.date)}`)
    when.font = rFont(10)
    when.textColor = p.muted
  }

  if (stale) {
    w.addSpacer(4)
    const s = w.addText("(cached)")
    s.font = rFont(9)
    s.textColor = p.muted
  }
}

function renderError(err) {
  const w = new ListWidget()
  const dark = Device.isUsingDarkAppearance()
  const p = palette(dark)
  w.backgroundColor = p.bg
  const t = w.addText("HPDE widget error")
  t.font = rBoldFont(12)
  t.textColor = p.fg
  const e = w.addText(String(err && err.message ? err.message : err))
  e.font = rFont(10)
  e.textColor = p.muted
  w.url = SITE_URL
  return w
}

// ---------- entrypoint ----------

let widget
try {
  const data = await loadManifest()
  widget = makeWidget(data)
} catch (err) {
  widget = renderError(err)
}

if (config.runsInWidget) {
  Script.setWidget(widget)
} else if (config.widgetFamily === "large" || config.widgetFamily === "extraLarge") {
  await widget.presentLarge()
} else {
  await widget.presentMedium()
}
Script.complete()
