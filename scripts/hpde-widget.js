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

function monoFont(size) {
  // Scriptable exposes `regularMonospacedSystemFont`; no `monospacedSystemFont`.
  // Fall back to a bundled monospace face on older builds.
  if (typeof Font.regularMonospacedSystemFont === "function") {
    return Font.regularMonospacedSystemFont(size)
  }
  return new Font("Menlo", size)
}

function monoBoldFont(size) {
  if (typeof Font.boldMonospacedSystemFont === "function") {
    return Font.boldMonospacedSystemFont(size)
  }
  return new Font("Menlo-Bold", size)
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
    ? { bg: new Color("#0b0b0f"), fg: new Color("#f5f5f7"), muted: new Color("#8a8a8f"),
        cardBg: new Color("#141418"), currentCardBg: new Color("#122135"),
        foodStroke: new Color("#f5f5f7"),
        accent: new Color("#3b82f6"), pastOpacity: 0.6 }
    : { bg: new Color("#ffffff"), fg: new Color("#111827"), muted: new Color("#9ca3af"),
        cardBg: new Color("#fafafb"), currentCardBg: new Color("#eef4ff"),
        foodStroke: new Color("#111827"),
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
  // Small widget-level side padding — the per-row gutters (see
  // drawEventRow) add another NOW_LINE_DOT_DIAMETER points on each
  // side so that every card lines up at the same x as before, with
  // NOW_LINE_DOT_DIAMETER points of "negative space" available beside
  // each card for the current-event marker.
  w.setPadding(10, 4, 10, 4)
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

  // "Current" event: the last event that has started, iff `now` still
  // falls inside its inferred duration. Duration is `next.start - start`,
  // or LAST_EVENT_FALLBACK_MIN when there is no next event on today's
  // schedule. When an event is current we draw the now-line inside its
  // card's top/bottom padding, at a position proportional to how far we
  // are into the event.
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
    if (now < end) {
      currentIdx = lastPastIdx
      currentProgress = end === start ? 0 : (now - start) / (end - start)
    }
  }

  const nextIdx = visible.findIndex(e => parseMinutes(e.time) > now)
  const insertAt = nextIdx === -1 ? visible.length : nextIdx
  const nextEvent = insertAt < visible.length ? visible[insertAt] : null

  // Row budget adapts to widget size.
  const family = config.widgetFamily || "medium"
  const isLarge = family === "large" || family === "extraLarge"
  const maxRows = isLarge ? 10 : 3
  const maxPast = isLarge ? 2 : 1

  const anchorIdx = currentIdx !== -1 ? currentIdx : insertAt
  const start = Math.max(0, anchorIdx - maxPast)
  const rows = visible.slice(start, start + maxRows)

  // The between-cards now-line only renders when there's no "current" event.
  const nowLineBetweenAt = currentIdx === -1 ? insertAt - start : -1
  const currentLocalIdx = currentIdx === -1 ? -1 : currentIdx - start

  let lastSessionNumber
  for (let i = 0; i < rows.length; i++) {
    if (i === nowLineBetweenAt) {
      drawNowLine(w, p, now, nextEvent, 6)
      lastSessionNumber = undefined
    }
    const ev = rows[i]
    if (ev.type === "session" && ev.sessionNumber !== undefined
        && ev.sessionNumber !== lastSessionNumber) {
      drawSessionHeader(w, p, ev.sessionNumber)
      lastSessionNumber = ev.sessionNumber
    } else if (ev.type !== "session") {
      lastSessionNumber = undefined
    }
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
  outer.addSpacer(NOW_LINE_DOT_DIAMETER)
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
  }
  outer.addSpacer(NOW_LINE_DOT_DIAMETER)
  w.addSpacer(6)
}

// The current-event card's now-line is built from plain WidgetStacks
// (a small circular dot + a thin bar), not a drawn image. Scriptable's
// `cornerRadius` has no effect on a stack using `backgroundImage`, so a
// DrawContext-rendered background can't get rounded corners — real
// stacks with `backgroundColor` don't have that limitation.
const CURRENT_CARD_PAD_V = 20            // top/bottom padding in points
const CURRENT_CARD_CORNER_RADIUS = 12
const NOW_LINE_DOT_DIAMETER = 8
const NOW_LINE_BAR_HEIGHT = 3
const NOW_LINE_MARGIN = 2                // min gap from the card edge / content

function drawEventRow(w, ev, groupById, selected, p, past, current) {
  // Caption (current time + countdown) sits ABOVE the card when we're in
  // the first half of the event and BELOW when we're past the halfway
  // point.
  const lineBelow = !!current && current.progress >= 0.5
  const lineAbove = !!current && !lineBelow

  if (lineAbove) {
    drawNowCaption(w, p, current.now, current.nextEvent)
    w.addSpacer(3)
  }

  // Every event row is a 3-column outer stack:
  //   [leftGutter | card | rightGutter]
  // The gutters occupy the widget's left/right side space, just outside
  // each card. For the current event they hold the marker — a dot on
  // the left (looks like it lives outside the card, sliding through)
  // and a matching bar segment on the right (visually continuing the
  // bar drawn inside the card past the card's right edge). Non-current
  // gutters are empty spacers, so every card still lines up at the
  // same x on both edges.
  const outerRow = w.addStack()
  outerRow.spacing = 0

  const leftGutter = outerRow.addStack()
  leftGutter.layoutVertically()
  leftGutter.size = new Size(NOW_LINE_DOT_DIAMETER, 0)

  const card = outerRow.addStack()

  const rightGutter = outerRow.addStack()
  rightGutter.layoutVertically()
  rightGutter.size = new Size(NOW_LINE_DOT_DIAMETER, 0)

  if (current) {
    // Current card is laid out vertically: [top zone | content row |
    // bottom zone]. The marker (bar) lives in whichever zone matches
    // current progress. The left/right gutters mirror the same
    // vertical structure so the dot / continuation bar sit at the
    // same y as the bar inside the card.
    card.layoutVertically()
    card.backgroundColor = p.currentCardBg
    card.cornerRadius = CURRENT_CARD_CORNER_RADIUS

    const topFraction = lineAbove ? current.progress * 2 : null
    const botFraction = lineBelow ? (current.progress - 0.5) * 2 : null

    // Left gutter — dot on the marker side, plain spacer on the other.
    addMarkerColumnZone(leftGutter, topFraction, "dot", p.accent)
    leftGutter.addSpacer()
    addMarkerColumnZone(leftGutter, botFraction, "dot", p.accent)

    // Card — bar on the marker side, content row in the middle.
    addMarkerColumnZone(card, topFraction, "bar", p.accent)
    const contentRow = card.addStack()
    contentRow.setPadding(0, 12, 0, 12)
    contentRow.spacing = 8
    contentRow.centerAlignContent()
    buildEventContent(contentRow, ev, groupById, selected, p, past, true)
    addMarkerColumnZone(card, botFraction, "bar", p.accent)

    // Right gutter — bar continuation on the marker side.
    addMarkerColumnZone(rightGutter, topFraction, "bar", p.accent)
    rightGutter.addSpacer()
    addMarkerColumnZone(rightGutter, botFraction, "bar", p.accent)
  } else {
    card.backgroundColor = p.cardBg
    card.cornerRadius = 6
    card.setPadding(7, 12, 7, 12)
    card.spacing = 8
    card.centerAlignContent()
    buildEventContent(card, ev, groupById, selected, p, past, false)
    // Gutters stay empty spacers; the horizontal outer stack stretches
    // them to match the card's height automatically.
  }

  if (lineBelow) {
    w.addSpacer(3)
    drawNowCaption(w, p, current.now, current.nextEvent)
  }
  w.addSpacer(6)
}

// One of the three-column outer stack's top or bottom padding zone.
// When `fraction` is a number in [0,1], the marker element (dot or bar)
// is placed within the CURRENT_CARD_PAD_V-tall zone at
// (fraction * usable) points from the zone's inner margin. When
// `fraction` is null, the zone is just blank vertical space of the
// same height, so all three columns stay aligned.
function addMarkerColumnZone(col, fraction, elementType, color) {
  if (fraction === null) {
    col.addSpacer(CURRENT_CARD_PAD_V)
    return
  }
  const rowH = NOW_LINE_DOT_DIAMETER
  const usable = Math.max(0, CURRENT_CARD_PAD_V - rowH - NOW_LINE_MARGIN * 2)
  const before = NOW_LINE_MARGIN + fraction * usable
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

// Shared row content — time on the left, then session pills or an
// event label — used for both the current card and regular rows so
// they lay out (and align) identically.
function buildEventContent(row, ev, groupById, selected, p, past, current) {
  // Fixed time-column width, same for current and non-current cards, so
  // labels line up at the same x on every row and the 12-hour times
  // through 11:xx don't get truncated in the smaller font.
  const timeCol = row.addStack()
  timeCol.size = new Size(60, 0)

  const time = timeCol.addText(formatTime12(ev.time))
  time.font = current ? monoBoldFont(17) : monoFont(13)
  time.textColor = current ? p.accent : p.fg
  if (past) time.textOpacity = p.pastOpacity
  // Scriptable stacks have no direct "start-align" API, so push the
  // digits flush against the column's left edge with a trailing spacer
  // instead — this keeps times lined up at the same x in every row,
  // regardless of column width or font size.
  timeCol.addSpacer()

  const isFood = ev.type === "lunch" || ev.type === "special"

  if (ev.type === "session") {
    const onTrack = (ev.onTrack || []).map(id => groupById[id]).filter(Boolean)
    if (onTrack.length) {
      addMutedLabel(row, "On track", p, past)
      for (const g of onTrack) {
        const dim = selected.length > 0 && !selected.includes(g.id)
        addGroupPill(row, g, dim || past)
      }
    }
    if (ev.inClass && ev.inClass.length) {
      addSeparator(row, p, past)
      addMutedLabel(row, "In class", p, past)
      const inClass = ev.inClass.map(id => groupById[id]).filter(Boolean)
      for (const g of inClass) addGroupPill(row, g, past)
    }
  } else {
    if (isFood) {
      const icon = row.addText(ev.type === "lunch" ? "🍔" : "⭐")
      icon.font = Font.systemFont(current ? 17 : 13)
    }
    const label = row.addText(ev.label)
    label.font = isFood ? Font.boldSystemFont(current ? 15 : 12) : Font.systemFont(current ? 14 : 12)
    label.textColor = p.fg
    label.lineLimit = 1
    if (past) label.textOpacity = p.pastOpacity
  }

  row.addSpacer()
}

function drawSessionHeader(w, p, n) {
  w.addSpacer(4)
  const outer = w.addStack()
  outer.spacing = 0
  outer.addSpacer(NOW_LINE_DOT_DIAMETER)
  const row = outer.addStack()
  const label = row.addText(`SESSION ${n}`)
  label.font = Font.boldSystemFont(9)
  label.textColor = p.muted
  row.addSpacer()
  outer.addSpacer(NOW_LINE_DOT_DIAMETER)
  w.addSpacer(2)
}

function addMutedLabel(row, text, p, past) {
  const l = row.addText(text)
  l.font = Font.systemFont(10)
  l.textColor = p.muted
  if (past) l.textOpacity = p.pastOpacity
}

function addSeparator(row, p, past) {
  const s = row.addText(" · ")
  s.font = Font.systemFont(11)
  s.textColor = p.muted
  if (past) s.textOpacity = p.pastOpacity
}

// Colored pill matching the web app's GroupBadge — colored background
// with the group's full label in white.
function addGroupPill(row, g, dim) {
  // Fully-rounded (pill) shape — Scriptable clamps to half the height.
  const alpha = dim ? 0.55 : 1.0
  const pill = row.addStack()
  pill.backgroundColor = new Color(g.color, alpha)
  pill.cornerRadius = 100
  pill.setPadding(2, 8, 2, 8)
  pill.centerAlignContent()
  const label = pill.addText(g.label)
  label.font = Font.mediumSystemFont(10)
  label.textColor = new Color("#ffffff", alpha)
}

// Web-app style header for the now-marker: current time on the left,
// countdown to the next event on the right. Inset by the per-row
// gutter width so its edges line up with the cards.
function drawNowCaption(w, p, now, nextEvent) {
  const outer = w.addStack()
  outer.spacing = 0
  outer.addSpacer(NOW_LINE_DOT_DIAMETER)
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
  outer.addSpacer(NOW_LINE_DOT_DIAMETER)
}

// Thin horizontal accent-color rule, edges lined up with the cards.
function drawNowRule(w, p) {
  const outer = w.addStack()
  outer.spacing = 0
  outer.addSpacer(NOW_LINE_DOT_DIAMETER)
  const bar = outer.addStack()
  bar.backgroundColor = p.accent
  bar.size = new Size(0, 1.5)
  bar.addSpacer()
  outer.addSpacer(NOW_LINE_DOT_DIAMETER)
}

// Between-cards now-marker: caption on top of a thin rule (used when no
// event is currently in progress — before the day starts).
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
