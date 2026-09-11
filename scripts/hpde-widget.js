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
  // `label` is a stronger-contrast muted color used for section labels
  // like "On track" / "In class" so they read clearly, without going
  // all the way to the full fg tone.
  return dark
    ? { bg: new Color("#0b0b0f"), fg: new Color("#f5f5f7"), muted: new Color("#8a8a8f"),
        label: new Color("#c4c4c8"),
        cardBg: new Color("#141418"), currentCardBg: new Color("#122135"),
        foodStroke: new Color("#f5f5f7"),
        accent: new Color("#3b82f6"), accentGlow: new Color("#3b82f6", 0.25),
        pastOpacity: 0.6 }
    : { bg: new Color("#ffffff"), fg: new Color("#111827"), muted: new Color("#9ca3af"),
        label: new Color("#4b5563"),
        cardBg: new Color("#fafafb"), currentCardBg: new Color("#eef4ff"),
        foodStroke: new Color("#111827"),
        accent: new Color("#3b82f6"), accentGlow: new Color("#3b82f6", 0.22),
        pastOpacity: 0.6 }
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
  // Widget's own side padding is asymmetric: a small left inset that
  // combines with the LEFT_GUTTER_WIDTH-wide left gutter to keep the
  // cards sitting where they used to; and zero on the right so the
  // current-event marker bar (drawn inside the RIGHT_GUTTER_WIDTH-wide
  // right gutter) can extend all the way to the widget's right edge.
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
    // Cut off the "current" state CURRENT_END_LOOKAHEAD_MIN minutes
    // before the next event begins, so the marker moves out of the
    // card and into the between-cards gap for the final countdown.
    // Math.max guards against events shorter than the lookahead — in
    // that case the event never enters "current" state.
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

  // Tap-to-refresh button. iOS throttles widget timelines by a shared
  // daily budget, so a `refreshAfterDate` hint (see makeWidget) rarely
  // actually delivers a minute-by-minute cadence over the full day.
  // Setting a per-stack URL to Scriptable's own URL scheme lets a tap
  // on this icon open Scriptable, re-run the script, and reload the
  // widget's timeline immediately — bypassing the budget on demand
  // without stealing the whole-widget tap (which still opens the site).
  const refresh = row.addStack()
  refresh.url = URLScheme.forRunningScript()
  refresh.setPadding(2, 4, 2, 4)
  const refreshIcon = refresh.addText("↻")
  refreshIcon.font = Font.mediumSystemFont(11)
  refreshIcon.textColor = p.muted

  outer.addSpacer(RIGHT_GUTTER_WIDTH)
  w.addSpacer(6)
}

// The current-event card's now-line is built from plain WidgetStacks
// (a small circular dot + a thin bar), not a drawn image. Scriptable's
// `cornerRadius` has no effect on a stack using `backgroundImage`, so a
// DrawContext-rendered background can't get rounded corners — real
// stacks with `backgroundColor` don't have that limitation.
// Top/bottom padding in points, sized to give the now-line room to
// travel inside the straight-edge zone of the card, i.e. clear of the
// corner-curve square at each corner.
const CURRENT_CARD_PAD_V = 24
const CURRENT_CARD_CORNER_RADIUS = 12
// The current card is nested inside two concentric wrapper stacks
// whose backgrounds show around it: a thin accent border (matching
// the bar color, so the bar transitions through it seamlessly), and
// a slightly wider low-alpha accent halo that reads as a soft blue
// glow. The two wrappers' cornerRadii are chosen so the border is
// visually uniform width all the way around.
const CURRENT_CARD_BORDER_WIDTH = 1
const CURRENT_CARD_GLOW_WIDTH = 2
const CURRENT_CARD_OUTER_PAD = CURRENT_CARD_BORDER_WIDTH + CURRENT_CARD_GLOW_WIDTH
// Effective clipping radius the marker rows need to stay outside — the
// innermost of the three concentric cornerRadii — so the bar inside
// the card doesn't get chewed by the card's own rounded corners.
const CURRENT_CARD_INNER_CORNER_RADIUS =
  CURRENT_CARD_CORNER_RADIUS - CURRENT_CARD_GLOW_WIDTH - CURRENT_CARD_BORDER_WIDTH
// Fixed height for the current card's content row. All three columns
// (leftGutter | card | rightGutter) pin this exact value so their
// intrinsic heights match — the dot in the left gutter, the bar
// inside the card, and the bar continuation in the right gutter then
// end up at the same y automatically, without depending on Scriptable
// stretching a flexible spacer. Session events that carry both an
// "on track" row and an "in class" row need more room because the
// two rows stack vertically like the web app's SessionCard does.
const CURRENT_CONTENT_HEIGHT = 24
const CURRENT_CONTENT_HEIGHT_STACKED = 40

// The vertical size the current card's content row needs for `ev` —
// stacked when the session carries both on-track and in-class pills,
// single-height otherwise. Non-session events always use the single
// height.
function currentContentHeightFor(ev) {
  if (ev.type !== "session") return CURRENT_CONTENT_HEIGHT
  const hasOn = ev.onTrack && ev.onTrack.length > 0
  const hasIn = ev.inClass && ev.inClass.length > 0
  return hasOn && hasIn ? CURRENT_CONTENT_HEIGHT_STACKED : CURRENT_CONTENT_HEIGHT
}
const NOW_LINE_DOT_DIAMETER = 8
const NOW_LINE_BAR_HEIGHT = 3
// Gutter widths outside each event card. Left is dot-sized so the dot
// fills its gutter exactly; right is wider so the marker bar can
// reach the widget's right edge alongside a zero right-side widget
// padding (see WIDGET_SIDE_PAD_RIGHT).
const LEFT_GUTTER_WIDTH = NOW_LINE_DOT_DIAMETER   // 8pt
const RIGHT_GUTTER_WIDTH = 12
const WIDGET_SIDE_PAD_LEFT = 4
const WIDGET_SIDE_PAD_RIGHT = 0
// Extra vertical padding between the current-event caption and the
// adjacent (non-current) card on the caption's outer side, so the
// caption reads as belonging to the current row rather than crowding
// its neighbour.
const CURRENT_CAPTION_OUTER_PAD = 4
// Horizontal inner padding used by every event card, so the time
// digits inside them (and the now-caption above/below them) line up
// at the same x on every row.
const CARD_INNER_PAD_H = 12
// Fixed width for the "On track" / "In class" section labels, so the
// pills that follow them line up at the same x on both rows even
// though the labels themselves have different natural widths.
const LABEL_COLUMN_WIDTH = 48

function drawEventRow(w, ev, groupById, selected, p, past, current) {
  // Caption (current time + countdown) sits ABOVE the card when we're in
  // the first half of the event and BELOW when we're past the halfway
  // point.
  const lineBelow = !!current && current.progress >= 0.5
  const lineAbove = !!current && !lineBelow

  if (lineAbove) {
    // Extra gap on the caption's outer side (between the previous card
    // and this caption) so the caption reads as belonging to the
    // current card rather than crowding its neighbour.
    w.addSpacer(CURRENT_CAPTION_OUTER_PAD)
    drawNowCaption(w, p, current.now, current.nextEvent)
    w.addSpacer(3)
  }

  // Every event row is a 3-column outer stack:
  //   [leftGutter | cardContainer | rightGutter]
  // The gutters occupy the widget's left/right side space, just outside
  // each card. For the current event they hold the marker — a dot on
  // the left (looks like it lives outside the card, sliding through)
  // and a matching bar segment on the right that visually continues the
  // bar drawn inside the card past the card's right edge, extending
  // out to the widget's right edge thanks to WIDGET_SIDE_PAD_RIGHT=0.
  // Non-current gutters are empty spacers, so every card still lines
  // up at the same x on both edges.
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
    // Border + glow effect: nest the current card inside two concentric
    // wrappers. The outer one's background is a low-alpha accent color
    // that reads as a soft blue glow around the card. The inner one's
    // background is full accent, a thin ring that reads as a border
    // (and, because it's the same color as the bar, lets the bar
    // transition through it seamlessly). All three cornerRadii are
    // offset by each wrapper's padding so the border and glow rings
    // stay a uniform width all the way around the card.
    cardContainer.layoutVertically()
    cardContainer.backgroundColor = p.accentGlow
    cardContainer.cornerRadius = CURRENT_CARD_CORNER_RADIUS
    cardContainer.setPadding(
      CURRENT_CARD_GLOW_WIDTH, CURRENT_CARD_GLOW_WIDTH,
      CURRENT_CARD_GLOW_WIDTH, CURRENT_CARD_GLOW_WIDTH,
    )

    const borderWrapper = cardContainer.addStack()
    borderWrapper.layoutVertically()
    borderWrapper.backgroundColor = p.accent
    borderWrapper.cornerRadius = CURRENT_CARD_CORNER_RADIUS - CURRENT_CARD_GLOW_WIDTH
    borderWrapper.setPadding(
      CURRENT_CARD_BORDER_WIDTH, CURRENT_CARD_BORDER_WIDTH,
      CURRENT_CARD_BORDER_WIDTH, CURRENT_CARD_BORDER_WIDTH,
    )

    const card = borderWrapper.addStack()
    card.layoutVertically()
    card.backgroundColor = p.currentCardBg
    card.cornerRadius = CURRENT_CARD_INNER_CORNER_RADIUS

    const topFraction = lineAbove ? current.progress * 2 : null
    const botFraction = lineBelow ? (current.progress - 0.5) * 2 : null

    // All three columns get the same vertical structure — outer pad
    // (glow + border) / top zone / content-row-sized block / bottom
    // zone / outer pad — so the dot in the left gutter, the bar inside
    // the card, and the bar continuation in the right gutter land at
    // the same y without depending on Scriptable stretching a flexible
    // spacer to line them up. The card omits its own outer-pad spacers
    // because those come from the two wrapping stacks' paddings.
    const contentH = currentContentHeightFor(ev)

    leftGutter.addSpacer(CURRENT_CARD_OUTER_PAD)
    addMarkerColumnZone(leftGutter, topFraction, "dot", p.accent, false)
    leftGutter.addSpacer(contentH)
    addMarkerColumnZone(leftGutter, botFraction, "dot", p.accent, true)
    leftGutter.addSpacer(CURRENT_CARD_OUTER_PAD)

    addMarkerColumnZone(card, topFraction, "bar", p.accent, false)
    const contentRow = card.addStack()
    contentRow.size = new Size(0, contentH)
    // Two wrapping stacks (glow + border) already inset the content by
    // CURRENT_CARD_OUTER_PAD points on each side, so we shrink the
    // contentRow's own left/right padding by that amount to keep the
    // interior padding equal to CARD_INNER_PAD_H — matching the
    // non-current cards, so the time digits sit at the same x on every
    // row.
    const contentPadH = CARD_INNER_PAD_H - CURRENT_CARD_OUTER_PAD
    contentRow.setPadding(0, contentPadH, 0, contentPadH)
    contentRow.spacing = 8
    contentRow.centerAlignContent()
    buildEventContent(contentRow, ev, groupById, selected, p, past, true)
    addMarkerColumnZone(card, botFraction, "bar", p.accent, true)

    rightGutter.addSpacer(CURRENT_CARD_OUTER_PAD)
    addMarkerColumnZone(rightGutter, topFraction, "bar", p.accent, false)
    rightGutter.addSpacer(contentH)
    addMarkerColumnZone(rightGutter, botFraction, "bar", p.accent, true)
    rightGutter.addSpacer(CURRENT_CARD_OUTER_PAD)
  } else {
    cardContainer.backgroundColor = p.cardBg
    cardContainer.cornerRadius = 6
    cardContainer.setPadding(7, CARD_INNER_PAD_H, 7, CARD_INNER_PAD_H)
    cardContainer.spacing = 8
    cardContainer.centerAlignContent()
    buildEventContent(cardContainer, ev, groupById, selected, p, past, false)
    // Gutters stay empty spacers; the horizontal outer stack stretches
    // them to match the card's height automatically.
  }

  if (lineBelow) {
    w.addSpacer(3)
    drawNowCaption(w, p, current.now, current.nextEvent)
    w.addSpacer(CURRENT_CAPTION_OUTER_PAD)
  }
  w.addSpacer(6)
}

// One of the three-column outer stack's top or bottom padding zone.
// When `fraction` is a number in [0,1] the marker element (dot or bar)
// is placed within the CURRENT_CARD_PAD_V-tall zone; when it's null,
// the zone is a blank spacer of the same height so all three columns
// stay aligned.
//
// The marker row is confined to the card's straight-edge zone — the
// portion of each side that lies clear of the corner-curve square at
// each corner (CURRENT_CARD_CORNER_RADIUS on a side). Inside that
// square the card's cornerRadius clips content off from the corner,
// which would leave a visible gap between the bar inside the card and
// the bar continuation in the right gutter.
//
// Fraction 0 is always the end of the zone nearest the card edge, and
// fraction 1 is nearest the content row — so the marker moves toward
// the content as the current event's progress advances.
function addMarkerColumnZone(col, fraction, elementType, color, isBottomZone) {
  if (fraction === null) {
    col.addSpacer(CURRENT_CARD_PAD_V)
    return
  }
  const rowH = NOW_LINE_DOT_DIAMETER
  // Only the innermost cornerRadius clips the bar (the outer wrappers
  // are concentric with matching padding, so their corner arcs sit
  // outside the card's own arc). Using the innermost cornerRadius here
  // gives the marker more travel room within each padding zone.
  const cr = CURRENT_CARD_INNER_CORNER_RADIUS
  // Range of legal row_top offsets within the zone (relative to
  // zone_top). In the top zone the corner square hugs the zone's top
  // (row_top >= cr); in the bottom zone it hugs the zone's bottom
  // (row_top + rowH <= padV - cr).
  const safeMin = isBottomZone ? 0 : cr
  const safeMax = isBottomZone
    ? Math.max(safeMin, CURRENT_CARD_PAD_V - rowH - cr)
    : Math.max(safeMin, CURRENT_CARD_PAD_V - rowH)
  // Row_top increases monotonically with fraction in both zones — in
  // the top zone larger row_top is nearer the content, in the bottom
  // zone larger row_top is farther from the content — matching how
  // the caller feeds in progress (small first, growing over time).
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
    // On-track and in-class rows stack vertically like the web app's
    // SessionCard, so the two label + pill groups don't run together
    // on a single line.
    const onTrack = (ev.onTrack || []).map(id => groupById[id]).filter(Boolean)
    const inClass = (ev.inClass || []).map(id => groupById[id]).filter(Boolean)

    const infoCol = row.addStack()
    infoCol.layoutVertically()
    infoCol.spacing = 3

    if (onTrack.length) {
      const onRow = infoCol.addStack()
      onRow.centerAlignContent()
      onRow.spacing = 6
      addMutedLabelColumn(onRow, "On track", p, past)
      for (const g of onTrack) {
        const dim = selected.length > 0 && !selected.includes(g.id)
        addGroupPill(onRow, g, dim || past)
      }
    }
    if (inClass.length) {
      const inRow = infoCol.addStack()
      inRow.centerAlignContent()
      inRow.spacing = 6
      addMutedLabelColumn(inRow, "In class", p, past)
      for (const g of inClass) addGroupPill(inRow, g, past)
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
  outer.addSpacer(LEFT_GUTTER_WIDTH)
  const row = outer.addStack()
  const label = row.addText(`SESSION ${n}`)
  label.font = Font.boldSystemFont(9)
  label.textColor = p.muted
  row.addSpacer()
  outer.addSpacer(RIGHT_GUTTER_WIDTH)
  w.addSpacer(2)
}

// Fixed-width column holding a muted section label ("On track" /
// "In class"). The fixed width equalises the different natural widths
// of the labels themselves, so the pills that follow start at the
// same x on both rows.
function addMutedLabelColumn(row, text, p, past) {
  const col = row.addStack()
  col.size = new Size(LABEL_COLUMN_WIDTH, 0)
  const l = col.addText(text)
  l.font = Font.systemFont(10)
  l.textColor = p.label
  if (past) l.textOpacity = p.pastOpacity
  // Trailing spacer pushes the label flush against the column's left
  // edge, same trick as the time column.
  col.addSpacer()
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
// countdown to the next event on the right. Inset so it lines up
// horizontally with the time digits inside the cards — that way the
// eye doesn't have to jump between the caption's x and the times' x.
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
