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

// Fallback duration (minutes) applied to the last event of the day, which
// has no following event to infer an end time from. Kept in sync with
// LAST_EVENT_FALLBACK_MIN in src/utils/time.ts.
const LAST_EVENT_FALLBACK_MIN = 30

// How many minutes before the next event we stop treating the current
// event as "in progress" and switch the now-marker to the between-cards
// style. This keeps the marker from having to sit right at the bottom
// of the current card's padding zone (which is where the corner-curve
// starts clipping it) as the event runs down to zero.
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

// ---------- date + time helpers (match src/utils/time.ts) ----------

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

// Font helpers. Scriptable's system-font family includes rounded, mono,
// and serif variants; we pick a rounded bold for the current-event
// time (feels more like a car dashboard clock than plain SF), plain
// system for section labels and event labels, and mono for the
// non-current time column (keeps digits column-aligned across rows).
function monoFont(size) {
  if (typeof Font.regularMonospacedSystemFont === "function") {
    return Font.regularMonospacedSystemFont(size)
  }
  return new Font("Menlo", size)
}

function roundedBoldFont(size) {
  if (typeof Font.heavyRoundedSystemFont === "function") {
    return Font.heavyRoundedSystemFont(size)
  }
  if (typeof Font.boldRoundedSystemFont === "function") {
    return Font.boldRoundedSystemFont(size)
  }
  return Font.boldSystemFont(size)
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

// Palette mirrors the web app: gray-50 widget background, white
// non-current cards with a gray-200 border, gray-100 dividers, and
// blue-500 accent for the current-event border and now-marker. The
// current card interior uses a subtle blue tint (`currentCardBg`)
// instead of white, so the accent bleeds through the interior as a
// gentle "happening now" wash rather than reading purely as a border.
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

// ---------- rendering ----------

function makeWidget({ manifest, stale }) {
  const w = new ListWidget()
  const dark = Device.isUsingDarkAppearance()
  const p = palette(dark)
  w.backgroundColor = p.bg
  // Symmetric widget side padding — the previous asymmetric layout
  // (0pt right so the marker bar could touch the widget's right
  // edge) made the cards look off-center. Both sides are now
  // WIDGET_SIDE_PAD_{LEFT,RIGHT}pt wide, and the marker bar ends at
  // the card's right border like a normal underline.
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
  title.font = Font.boldSystemFont(14)
  title.textColor = p.fg
  title.lineLimit = 1

  const dot = row.addText("  ·  ")
  dot.font = Font.systemFont(12)
  dot.textColor = p.muted

  const sub = row.addText(day.label)
  sub.font = Font.systemFont(12)
  sub.textColor = p.muted
  sub.lineLimit = 1

  row.addSpacer()

  if (stale) {
    const s = row.addText("offline")
    s.font = Font.systemFont(9)
    s.textColor = p.muted
    row.addSpacer(6)
  }

  const refresh = row.addStack()
  refresh.url = URLScheme.forRunningScript()
  refresh.setPadding(2, 4, 2, 4)
  const refreshIcon = refresh.addText("↻")
  refreshIcon.font = Font.mediumSystemFont(11)
  refreshIcon.textColor = p.muted

  outer.addSpacer(RIGHT_GUTTER_WIDTH)
  w.addSpacer(6)
}

// ----- current-card layout constants -----
//
// The current-event card's now-marker (a small circular dot in the
// left gutter + a thin bar inside the card + a bar continuation in
// the right gutter) is built from plain WidgetStacks, not a drawn
// image. Scriptable's `cornerRadius` has no effect on a stack that
// uses `backgroundImage`, so a DrawContext-rendered background can't
// get rounded corners — real stacks with `backgroundColor` don't
// have that limitation.
//
// Top and bottom padding inside the current card, sized to give the
// now-marker room to travel inside the straight-edge zone of the
// card, clear of the corner-curve at each corner.
const CURRENT_CARD_PAD_V = 14
const CURRENT_CARD_CORNER_RADIUS = 12
// The current card is nested inside one wrapper stack whose accent
// background shows as a 1pt border ring around the card. The border
// color matches the marker bar exactly, so the bar transitions
// through it seamlessly from inside the card to outside without a
// visible color break.
const CURRENT_CARD_BORDER_WIDTH = 1
const CURRENT_CARD_OUTER_PAD = CURRENT_CARD_BORDER_WIDTH
// Effective clipping radius the marker rows need to stay outside —
// the card interior's own corner radius (one border-width smaller
// than the outer wrapper's radius, so the border looks even all the
// way around).
const CURRENT_CARD_INNER_CORNER_RADIUS =
  CURRENT_CARD_CORNER_RADIUS - CURRENT_CARD_BORDER_WIDTH
// Fixed content height for the current card. Sizes are picked so all
// three columns (left gutter | card | right gutter) end up the same
// intrinsic height, which is how the dot in the gutter, the bar
// inside the card, and the bar continuation on the right stay
// vertically aligned — Scriptable's flexible spacer doesn't stretch
// reliably enough on its own for that.
const CURRENT_CONTENT_HEIGHT = 26
const CURRENT_CONTENT_HEIGHT_STACKED = 58

function currentContentHeightFor(ev) {
  if (ev.type !== "session") return CURRENT_CONTENT_HEIGHT
  const hasOn = ev.onTrack && ev.onTrack.length > 0
  const hasIn = ev.inClass && ev.inClass.length > 0
  return hasOn && hasIn ? CURRENT_CONTENT_HEIGHT_STACKED : CURRENT_CONTENT_HEIGHT
}

// Non-current cards are a single stack with a native 1pt border via
// `borderWidth`/`borderColor` and a bigger corner radius — matches
// how the web app rounds its SessionCards.
const NONCURRENT_CARD_CORNER_RADIUS = 14

// ----- now-marker sizing -----
const NOW_LINE_DOT_DIAMETER = 8
const NOW_LINE_BAR_HEIGHT = 2

// ----- widget-level padding -----
//
// Widget's own side padding + left/right gutter widths together
// determine how far each event card sits from the widget's left/right
// edge. The left gutter must be wide enough to hold the full
// NOW_LINE_DOT_DIAMETER-pt dot AND leave a small gap before the card
// starts. Right gutter has the same width so left/right feel balanced.
const WIDGET_SIDE_PAD_LEFT = 4
const WIDGET_SIDE_PAD_RIGHT = 4
const LEFT_GUTTER_WIDTH = NOW_LINE_DOT_DIAMETER + 4   // dot + 4pt gap
const RIGHT_GUTTER_WIDTH = LEFT_GUTTER_WIDTH

// Extra vertical padding between the current-event caption and the
// adjacent (non-current) card on the caption's outer side, so the
// caption reads as belonging to the current row rather than crowding
// its neighbour.
const CURRENT_CAPTION_OUTER_PAD = 4

// Horizontal inner padding used by every event card, so the time
// digits inside them (and the now-caption above/below them) line up
// at the same x on every row.
const CARD_INNER_PAD_H = 12

// Fixed width for the "On track" / "In class" section labels — the
// pill that follows always starts at the same x on both rows so the
// row structure reads as a two-column table. The label font is now
// small and muted (matching the web app), so a compact column works.
const LABEL_COLUMN_WIDTH = 60

// Time column widths — sized to hold each font's widest time in the
// current-card and non-current-card variants without truncation.
const TIME_COLUMN_WIDTH_CURRENT = 68
const TIME_COLUMN_WIDTH_NORMAL = 56

// Fixed divider width. Chosen conservatively for the medium widget
// (whose card content area is ~205pt after all the paddings) so the
// divider reaches the card's right inner edge on medium widgets
// without overflowing on the corner-curve zone. cornerRadius does
// not clip children in Scriptable, so we cannot let it stretch
// beyond the card's inner content area.
const DIVIDER_WIDTH = 200

function drawEventRow(w, ev, groupById, selected, p, past, current) {
  const lineBelow = !!current && current.progress >= 0.5
  const lineAbove = !!current && !lineBelow

  if (lineAbove) {
    w.addSpacer(CURRENT_CAPTION_OUTER_PAD)
    drawNowCaption(w, p, current.now, current.nextEvent)
    w.addSpacer(3)
  }

  // Every event row is a 3-column outer stack:
  //   [leftGutter | cardContainer | rightGutter]
  // The gutters occupy the widget's left/right side space, just
  // outside each card. For the current event the gutters hold the
  // marker — a dot on the left (sits outside the card, looks like
  // it's sliding through) and a bar segment on the right that
  // visually continues the bar drawn inside the card past the card's
  // right border into the gutter. Non-current gutters are empty
  // spacers, so every card still lines up at the same x on both
  // edges.
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
  // The wrapper stack is a solid accent-color rounded rectangle. Its
  // 1pt padding shows as a border ring around the inner card.
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

  // Content block: fixed height so the gutter's dot-height spacer
  // (contentH) lines up with the card's content block, giving the
  // dot the same y as the middle of the card interior.
  const contentBlock = card.addStack()
  contentBlock.size = new Size(0, contentH)
  contentBlock.centerAlignContent()
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
  // Native border — cleaner than the wrapper trick, and cornerRadius
  // is bumped to NONCURRENT_CARD_CORNER_RADIUS for a friendlier
  // rounded look.
  cardContainer.backgroundColor = p.cardBg
  cardContainer.borderColor = p.cardBorder
  cardContainer.borderWidth = 1
  cardContainer.cornerRadius = NONCURRENT_CARD_CORNER_RADIUS
  cardContainer.setPadding(8, CARD_INNER_PAD_H, 8, CARD_INNER_PAD_H)
  cardContainer.centerAlignContent()
  buildCardContent(cardContainer, ev, groupById, selected, p, past, false)
}

// One of the current card's top-or-bottom padding zones, in one
// column. When `fraction` is a number in [0,1] the marker element
// (dot or bar) is placed within the CURRENT_CARD_PAD_V-tall zone;
// when it's null, the zone is a blank spacer of the same height so
// all three columns stay aligned. Fraction 0 is always the end of
// the zone nearest the card edge, and fraction 1 is nearest the
// content row — so the marker moves toward the content as the event
// progresses.
function addMarkerColumnZone(col, fraction, elementType, color, isBottomZone) {
  if (fraction === null) {
    col.addSpacer(CURRENT_CARD_PAD_V)
    return
  }
  const rowH = NOW_LINE_DOT_DIAMETER
  const cr = CURRENT_CARD_INNER_CORNER_RADIUS
  // Range of legal row_top offsets within the zone (relative to
  // zone_top). In the top zone the corner square hugs the zone's top
  // (row_top >= cr); in the bottom zone it hugs the zone's bottom
  // (row_top + rowH <= padV - cr).
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

// A fixed-height (dot-diameter) row containing the marker element.
// Height is unified across dot and bar variants so the two align
// vertically across the three columns even though the bar is thinner
// than the dot.
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

// Build the interior of a card. `container` is expected to be
// centerAlignContent, horizontal by default. For sessions with both
// on-track and in-class pills we lay out as
//   [timeCol | infoBlock (on / divider / in)]
// so the divider sits inside infoBlock at fixed width — going from
// just past the time column all the way to the card's right inner
// edge. The horizontally-centered `container` puts the time column
// visually centered between the two pill rows.
function buildCardContent(container, ev, groupById, selected, p, past, current) {
  const hasOn = ev.type === "session" && (ev.onTrack || []).length > 0
  const hasIn = ev.type === "session" && (ev.inClass || []).length > 0
  const stacked = hasOn && hasIn

  addTimeColumn(container, ev.time, p, past, current)

  if (ev.type === "session") {
    const onTrack = (ev.onTrack || []).map(id => groupById[id]).filter(Boolean)
    const inClass = (ev.inClass || []).map(id => groupById[id]).filter(Boolean)

    if (stacked) {
      const infoBlock = container.addStack()
      infoBlock.layoutVertically()

      addSectionRow(infoBlock, "On track", onTrack, selected, p, past, current)
      infoBlock.addSpacer(current ? 6 : 8)
      addRowDivider(infoBlock, p)
      infoBlock.addSpacer(current ? 6 : 8)
      addSectionRow(infoBlock, "In class", inClass, selected, p, past, current)
    } else if (onTrack.length) {
      addSectionRow(container, "On track", onTrack, selected, p, past, current)
      container.addSpacer()
    } else if (inClass.length) {
      addSectionRow(container, "In class", inClass, selected, p, past, current)
      container.addSpacer()
    }
  } else {
    const isFood = ev.type === "lunch" || ev.type === "special"
    if (isFood) {
      const icon = container.addText(ev.type === "lunch" ? "🍔" : "⭐")
      icon.font = Font.systemFont(current ? 17 : 13)
      container.addSpacer(6)
    }
    const label = container.addText(ev.label)
    label.font = isFood
      ? Font.boldSystemFont(current ? 15 : 12)
      : Font.systemFont(current ? 15 : 12)
    label.textColor = p.fg
    label.lineLimit = 1
    if (past) label.textOpacity = p.pastOpacity
    container.addSpacer()
  }
}

function addTimeColumn(row, hhmm, p, past, current) {
  const timeCol = row.addStack()
  timeCol.size = new Size(
    current ? TIME_COLUMN_WIDTH_CURRENT : TIME_COLUMN_WIDTH_NORMAL, 0)
  timeCol.centerAlignContent()

  const time = timeCol.addText(formatTime12(hhmm))
  time.font = current ? roundedBoldFont(22) : monoFont(13)
  time.textColor = p.fg
  if (past) time.textOpacity = p.pastOpacity
  // Trailing spacer left-aligns the digits inside the fixed-width
  // column, so times line up at the same x on every row regardless
  // of font size.
  timeCol.addSpacer()
}

// A single "On track" / "In class" pill row: the label column on
// the left, pills packed together on the right.
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

// Fixed-width label column ("On track" / "In class"). Small muted
// gray matching the web app — pills carry the visual weight and the
// labels read as helper text.
function addSectionLabelColumn(row, text, p, past, current) {
  const col = row.addStack()
  col.size = new Size(LABEL_COLUMN_WIDTH, 0)
  col.centerAlignContent()
  const l = col.addText(text)
  l.font = Font.systemFont(current ? 13 : 12)
  l.textColor = p.muted
  l.lineLimit = 1
  if (past) l.textOpacity = p.pastOpacity
  col.addSpacer()
}

// Thin horizontal rule between the on-track and in-class rows of a
// session card. Fixed width because Scriptable doesn't stretch a
// stack to fill its parent width when the parent has no fixed size.
// DIVIDER_WIDTH is chosen so the divider comfortably reaches the
// card's right inner edge on the medium widget.
function addRowDivider(col, p) {
  const line = col.addStack()
  line.backgroundColor = p.divider
  line.size = new Size(DIVIDER_WIDTH, 1)
}

// Colored pill matching the web app's GroupBadge — colored
// background with the group's label in white. Bigger on the current
// card, so the pills carry the visual weight the smaller labels
// give up.
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
  label.font = current
    ? Font.boldSystemFont(13)
    : Font.mediumSystemFont(10)
  label.textColor = new Color("#ffffff", alpha)
}

// Web-app style header for the now-marker: current time on the
// left, countdown to the next event on the right. Inset so it lines
// up horizontally with the time digits inside the cards — that way
// the eye doesn't have to jump between the caption's x and the
// times' x.
function drawNowCaption(w, p, now, nextEvent) {
  const outer = w.addStack()
  outer.spacing = 0
  outer.addSpacer(LEFT_GUTTER_WIDTH + CARD_INNER_PAD_H)
  const row = outer.addStack()
  row.centerAlignContent()

  const time = row.addText(nowHM().toUpperCase())
  time.font = Font.mediumSystemFont(10)
  time.textColor = p.accent

  row.addSpacer()

  if (nextEvent) {
    const min = parseMinutes(nextEvent.time) - now
    if (min > 0) {
      const prefix = row.addText("Next in ")
      prefix.font = Font.systemFont(10)
      prefix.textColor = p.muted
      const label = row.addText(formatCountdown(min))
      label.font = Font.boldSystemFont(10)
      label.textColor = urgencyColor(min, p)
    }
  }
  outer.addSpacer(RIGHT_GUTTER_WIDTH + CARD_INNER_PAD_H)
}

// Thin horizontal accent-color rule, edges lined up with the cards.
function drawNowRule(w, p) {
  const outer = w.addStack()
  outer.spacing = 0
  outer.addSpacer(LEFT_GUTTER_WIDTH)
  const bar = outer.addStack()
  bar.backgroundColor = p.accent
  bar.size = new Size(0, 1.5)
  bar.addSpacer()
  outer.addSpacer(RIGHT_GUTTER_WIDTH)
}

// Between-cards now-marker: caption on top of a thin rule (used
// when no event is currently in progress — before the day starts).
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
  title.font = Font.boldSystemFont(14)
  title.textColor = p.fg
  w.addSpacer(6)

  const msg = w.addText("No event today.")
  msg.font = Font.systemFont(12)
  msg.textColor = p.muted

  if (next) {
    w.addSpacer(4)
    const nx = w.addText(`Next: ${next.event.name}`)
    nx.font = Font.mediumSystemFont(11)
    nx.textColor = p.fg
    nx.lineLimit = 1
    const when = w.addText(`${next.day.label}, ${shortDate(next.day.date)}`)
    when.font = Font.systemFont(10)
    when.textColor = p.muted
  }

  if (stale) {
    w.addSpacer(4)
    const s = w.addText("(cached)")
    s.font = Font.systemFont(9)
    s.textColor = p.muted
  }
}

function renderError(err) {
  const w = new ListWidget()
  const dark = Device.isUsingDarkAppearance()
  const p = palette(dark)
  w.backgroundColor = p.bg
  const t = w.addText("HPDE widget error")
  t.font = Font.boldSystemFont(12)
  t.textColor = p.fg
  const e = w.addText(String(err && err.message ? err.message : err))
  e.font = Font.systemFont(10)
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
