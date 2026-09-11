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
  const matches = []
  for (const event of manifest.events) {
    for (const day of event.days) {
      if (day.date === iso) matches.push({ event, day })
    }
  }
  if (matches.length === 0) return null
  // The TEST — DELETE ME schedule shares today's date with a real
  // event on purpose (it's meant to always preview as "today"), so
  // when both match, prefer it over whichever real event happens to
  // sort first in the manifest. Remove this preference along with
  // the TEST schedule file once done testing.
  const testMatch = matches.find(m => /test/i.test(m.event.id))
  return testMatch || matches[0]
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
        currentCardBg: new Color("#122135"),
        // Subtle border for the current card — just a shade lighter
        // than the card interior, matching the same contrast ratio
        // the non-current gray border has against the white card.
        currentCardBorder: new Color("#1e3050"),
        divider: new Color("#26262c"),
        accent: new Color("#3b82f6"), pastOpacity: 0.6 }
    : { bg: new Color("#f9fafb"), fg: new Color("#111827"), muted: new Color("#9ca3af"),
        cardBg: new Color("#ffffff"), cardBorder: new Color("#e5e7eb"),
        currentCardBg: new Color("#eef4ff"),
        // Tailwind blue-200-ish — a slight blue tint over the
        // card's blue-50 interior, comparable to the gray-200
        // border on a white card.
        currentCardBorder: new Color("#bfdbfe"),
        divider: new Color("#e5e7eb"),
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

// Rough widget interior height (after our top/bottom widget
// padding) for the running host. Used to decide dynamically how
// many event rows we can afford to render before we blow past the
// widget's actual height. On the Home Screen anything past the
// widget's bottom edge is clipped, so a past card that pushes the
// current card off-screen makes the widget useless; in Scriptable's
// preview sheet, overflow makes the sheet scroll to a
// hard-to-predict position (which is what "the widget seems to be
// scrolled to a random position" was — 10 rows of stacked-session
// cards with notes total ~668pt on a ~354pt-tall large widget).
function widgetInteriorHeight() {
  const family = config.widgetFamily || "medium"
  if (family === "small") return 130
  if (family === "medium") return 135
  if (family === "large") return 330
  return 330 // extraLarge (iPad)
}

// Rough vertical space a rendered event row will consume in the
// widget's outer stack, including the 6pt gap after it.
function estimateEventRowHeight(ev, isCurrent) {
  // Only general-event subtitles render as a note line. Session
  // `note` fields are dropped (see `eventNote`), so we don't
  // budget space for them here either.
  const hasNote = !!ev.subtitle
  const isSession = ev.type === "session"
  const hasBoth = isSession
    && (ev.onTrack || []).length > 0
    && (ev.inClass || []).length > 0

  if (isCurrent) {
    // Wrapper border (2) + marker-side pad + no-marker pad +
    // content block + caption above/below + row-gap spacer. Only
    // one side gets the full CURRENT_CARD_PAD_V — the other side
    // is NO_MARKER_PAD_V — so budget the sum, not 2 * PAD_V.
    let contentH = hasBoth ? CURRENT_CONTENT_HEIGHT_STACKED : CURRENT_CONTENT_HEIGHT
    if (hasNote) contentH += NOTE_ROW_HEIGHT
    return 2 + CURRENT_CARD_PAD_V + NO_MARKER_PAD_V + contentH + 17 + 6
  }

  // Non-current: card content-height + inner top/bot padding + row-gap.
  let contentH
  if (hasBoth) contentH = 57       // on-row + spacer + divider + spacer + in-row
  else if (isSession) contentH = 20 // single pill row
  else contentH = 18                // plain event label
  if (hasNote) contentH += 18       // note line + spacer
  return 16 + contentH + 6
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
  // Info block starts at time column + time-info gap from the
  // card's content left edge, so the divider — sitting at the
  // start of the info block — is at most this wide before it'd
  // overflow the card's right inner edge. Add a fudge factor
  // because the widgetWidth() table below is a rough
  // approximation of Apple's published widget sizes and
  // empirically undershoots the actual widget width by ~15-20pt
  // on the phones users test on. Undershooting is what leaves
  // the divider ending in a visible right gutter (#71), and a
  // small overshoot is clipped by the card's stack layout, so
  // erring on the generous side is the safer default.
  return Math.max(120, contentInner - TIME_COLUMN_WIDTH - TIME_INFO_SPACING + 20)
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
  // Absolute cap so we never render more rows than the widget can
  // ever plausibly fit, even for a run of all-simple general events.
  const maxRowsCap = isLarge ? 10 : 4
  // Always show exactly one past event before the current one so the
  // current card sits at row 1 — as close to the top as it can be
  // without hiding what just happened.
  const maxPast = 1

  const anchorIdx = currentIdx !== -1 ? currentIdx : insertAt
  const start = Math.max(0, anchorIdx - maxPast)

  // Dynamic row-fitting: pack rows into the widget's interior height
  // instead of using a fixed row count. Past + current are always
  // included so the "current" concept has an anchor; additional
  // future rows are added only while they'd still fit. Otherwise
  // (with the old maxRows=10 for large widgets) a run of stacked
  // sessions with notes could pile ~668pt of content into a 354pt
  // widget, and the Scriptable preview sheet ended up scrolled to a
  // hard-to-predict middle position — the "widget seems to be
  // scrolled to a random position" bug.
  const availableH = widgetInteriorHeight() - 26  // subtract header + spacer
  const rows = []
  let usedH = 0
  for (let i = start; i < visible.length && rows.length < maxRowsCap; i++) {
    const isCurrent = i === currentIdx
    const rowH = estimateEventRowHeight(visible[i], isCurrent)
    if (rows.length >= 2 && usedH + rowH > availableH) break
    rows.push(visible[i])
    usedH += rowH
  }

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

  // Flex spacer at the very end forces the widget's content stack
  // to top-align. Without it, Scriptable's ListWidget centers
  // whatever content it has vertically when it's shorter than the
  // widget's box, which showed up as awkward empty gutters above
  // the header and below the bottom card.
  w.addSpacer()

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

// Marker pad zone on whichever side of the current card the
// marker sits (top when the event is in its first half, bottom
// when in its second half). Must be at least the marker-row
// height (NOW_LINE_DOT_DIAMETER = 8) so the marker fits without
// overflowing into the wrapper's border strip — that overflow
// was the "card border cutting through the marker" bug.
const CURRENT_CARD_PAD_V = 10
// Pad zone on the OTHER side of the card, where there is no
// marker. Kept tiny so the card doesn't carry a big blank stripe
// on the empty side ("extra padding at the bottom") — before this
// change we spent the full CURRENT_CARD_PAD_V here too.
const NO_MARKER_PAD_V = 2
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
  // Only general-event subtitles surface in the widget. Session
  // `note` fields are intentionally dropped — a session card is
  // already carrying a time + on-track pills + in-class pills, and
  // adding a note line pushes the whole card taller than it needs
  // to be.
  return ev.subtitle || null
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
// Left side: 4pt breathing room between the dot and the card
// border, so the marker dot reads as a separate element sitting
// alongside the card, not squashed against it.
// WIDGET_SIDE_PAD_LEFT gives the dot itself room before the
// widget's own left edge.
//
// Right side: widget's right padding stays at 0 and the right
// gutter absorbs the visual right margin. That lets the
// between-cards blue rule extend all the way to the widget's
// right edge instead of stopping short at the card's right border.
const WIDGET_SIDE_PAD_LEFT = 8
const WIDGET_SIDE_PAD_RIGHT = 0
const LEFT_GUTTER_WIDTH = NOW_LINE_DOT_DIAMETER + 4   // dot + 4pt gap
const RIGHT_GUTTER_WIDTH = 16

const CURRENT_CAPTION_OUTER_PAD = 4
const CARD_INNER_PAD_H = 12

// Horizontal gap between the time column and the info block —
// bigger than the default 8pt so the time isn't crammed up
// against the "On track" text.
const TIME_INFO_SPACING = 14

// Unified column widths so every row's time and section labels line
// up at the same x whether the row is the current card or a plain
// event row.
const TIME_COLUMN_WIDTH = 60
// Wide enough for "On track" plus a few characters of breathing
// room at the current 12pt rounded font size, so the labels never
// truncate: SF Symbol icon (14pt) + 8pt gap + label text
// ("On track" ~55pt) + 20-ish pt of margin ≈ 100pt.
const LABEL_COLUMN_WIDTH = 100

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
  // Subtle border color instead of full accent — matches the
  // web app's soft edge on the current card. The now-marker
  // bar/dot are still accent-color, they just no longer wrap
  // the entire card in loud blue.
  cardContainer.backgroundColor = p.currentCardBorder
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
    // Marker not in this zone — shrink the empty side so the card
    // isn't top-heavy or bottom-heavy just because the marker's
    // over on the other end.
    col.addSpacer(NO_MARKER_PAD_V)
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
  // Stacked sessions (both on-track and in-class rows) top-align
  // the time column with the "On track" row instead of centering
  // it between the two rows, so the eye doesn't have to hunt for
  // the time in the vertical middle of a two-row card.
  const stacked = ev.type === "session"
    && (ev.onTrack || []).length > 0
    && (ev.inClass || []).length > 0

  if (note) {
    container.layoutVertically()
    // Flexible spacers vertically center the main row + note pair
    // inside the current card's fixed-height contentBlock. On a
    // non-current card `container` is the card itself (no fixed
    // height), and a flex spacer there balloons the card to fill
    // whatever extra vertical space the widget's layout hands it.
    if (current) container.addSpacer()

    const mainRow = container.addStack()
    if (stacked) mainRow.topAlignContent()
    else mainRow.centerAlignContent()
    mainRow.spacing = TIME_INFO_SPACING
    buildMainContent(mainRow, ev, groupById, selected, p, past, current)

    container.addSpacer(3)
    addNoteRow(container, note, p, past, current)
    if (current) container.addSpacer()
  } else {
    if (stacked) container.topAlignContent()
    else container.centerAlignContent()
    container.spacing = TIME_INFO_SPACING
    buildMainContent(container, ev, groupById, selected, p, past, current)
  }
}

function buildMainContent(mainRow, ev, groupById, selected, p, past, current) {
  const onTrack = ev.type === "session"
    ? (ev.onTrack || []).map(id => groupById[id]).filter(Boolean)
    : []
  const inClass = ev.type === "session"
    ? (ev.inClass || []).map(id => groupById[id]).filter(Boolean)
    : []
  const stacked = onTrack.length > 0 && inClass.length > 0

  addTimeColumn(mainRow, ev.time, p, past, current, stacked)

  if (ev.type === "session") {
    if (stacked) {
      const infoBlock = mainRow.addStack()
      infoBlock.layoutVertically()

      addSectionRow(infoBlock, "On track", "car", onTrack, selected, p, past, current)
      infoBlock.addSpacer(current ? 6 : 8)
      addRowDivider(infoBlock, p)
      infoBlock.addSpacer(current ? 6 : 8)
      addSectionRow(infoBlock, "In class", "graduationcap", inClass, selected, p, past, current)
    } else if (onTrack.length) {
      addSectionRow(mainRow, "On track", "car", onTrack, selected, p, past, current)
      mainRow.addSpacer()
    } else if (inClass.length) {
      addSectionRow(mainRow, "In class", "graduationcap", inClass, selected, p, past, current)
      mainRow.addSpacer()
    }
  } else {
    const isFood = ev.type === "lunch" || ev.type === "special"
    if (isFood) {
      const icon = mainRow.addText(ev.type === "lunch" ? "🍔" : "⭐")
      icon.font = rFont(13)
      mainRow.addSpacer(6)
    }
    const label = mainRow.addText(ev.label)
    // Same font on current and non-current — the border and
    // background do the emphasising, not the type.
    label.font = isFood ? rBoldFont(12) : rMediumFont(12)
    label.textColor = p.fg
    label.lineLimit = 1
    if (past) label.textOpacity = p.pastOpacity
    mainRow.addSpacer()
  }
}

function addTimeColumn(row, hhmm, p, past, current, topAlign) {
  const timeCol = row.addStack()
  timeCol.size = new Size(TIME_COLUMN_WIDTH, 0)
  // Stacked-session cards top-align the time with the "On track"
  // row so the eye doesn't have to hunt for the time in the
  // vertical middle of a two-row card.
  if (topAlign) timeCol.topAlignContent()
  else timeCol.centerAlignContent()

  const time = timeCol.addText(formatTime12(hhmm))
  // Same font on current and non-current — the current card's
  // border + tinted background already carry the "this is now"
  // signal, so we don't inflate the time on top.
  time.font = rMediumFont(14)
  time.textColor = p.fg
  time.lineLimit = 1
  if (past) time.textOpacity = p.pastOpacity
  timeCol.addSpacer()
}

function addSectionRow(parent, labelText, iconName, groups, selected, p, past, current) {
  const row = parent.addStack()
  row.centerAlignContent()
  row.spacing = 10

  addSectionLabelColumn(row, labelText, iconName, p, past, current)

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

// Label column with a small SF Symbol glyph to the left of the
// text — a car for "On track" and a graduation cap for "In class".
// SF Symbols is the iOS-native equivalent of Material Icons and the
// closest simple line-glyph set actually available inside
// Scriptable; both are rendered in the same color as the label so
// the icon reads as part of the section label, not a decoration.
function addSectionLabelColumn(row, text, iconName, p, past, current) {
  const col = row.addStack()
  col.size = new Size(LABEL_COLUMN_WIDTH, 0)
  col.centerAlignContent()
  col.spacing = 8   // generous gap between icon and label

  if (iconName && typeof SFSymbol !== "undefined") {
    const sym = SFSymbol.named(iconName)
    if (sym) {
      const img = col.addImage(sym.image)
      img.imageSize = new Size(14, 14)
      img.tintColor = p.fg
      if (past) img.imageOpacity = p.pastOpacity
    }
  }

  const l = col.addText(text)
  // Same font on every card — current and non-current alike —
  // so labels don't visually bump up in size when a row goes
  // from "next" to "current".
  l.font = rFont(12)
  // Same p.fg as every other text element on the card so the
  // label doesn't fade into the background — matches the web
  // app's dark section labels.
  l.textColor = p.fg
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
  row.addSpacer(TIME_COLUMN_WIDTH + TIME_INFO_SPACING)
  const text = row.addText(note)
  // Same font on current and non-current so subtitles read at
  // one consistent visual weight everywhere.
  text.font = rFont(11)
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
  // Same padding and text sizing on every card, current or not.
  pill.setPadding(2, 8, 2, 8)
  pill.centerAlignContent()
  const label = pill.addText(g.label)
  label.font = rMediumFont(10)
  // Pill text stays fully opaque even when the pill is dimmed
  // (past event / not-in-selected-groups) — the background alpha
  // already carries the "dimmed" signal, and fading the text on
  // top makes the label unreadable. Matches the web app.
  label.textColor = new Color("#ffffff")
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

  // Dot at the far left, bar starts immediately at the dot's
  // right edge — the two read as one continuous marker.
  // Deliberately no 4pt gap here (the gap only lives in the
  // card-row left gutter, not in the between-cards rule) so the
  // line doesn't visually disconnect from the dot.
  const dot = outer.addStack()
  dot.size = new Size(NOW_LINE_DOT_DIAMETER, NOW_LINE_DOT_DIAMETER)
  dot.backgroundColor = p.accent
  dot.cornerRadius = NOW_LINE_DOT_DIAMETER / 2

  // No trailing spacer on outer — bar extends across the right
  // gutter and into the widget's zero-width right padding, all
  // the way to the widget's right edge.
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
