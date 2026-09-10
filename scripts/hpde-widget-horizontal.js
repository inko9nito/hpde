// HPDE track-day schedule — horizontal iOS Home Screen widget for Scriptable.
// Source: https://github.com/inko9nito/hpde/blob/main/scripts/hpde-widget-horizontal.js
// Data:   https://inko9nito.github.io/hpde/api/events.json
//
// A Gantt-style timeline: one row per run group, blocks marking when the
// group is on track (solid color, labeled "On track") or in class (outlined
// with the group color, labeled "In class"). The visible window starts one
// hour before now and extends to the last event of the day (capped at a
// max window). A vertical NOW line sits about an hour into the window and
// slides right as the day progresses.
//
// Setup: install Scriptable → paste this script → long-press Home Screen →
//   Add Widget → Scriptable → Medium (or Large) → Edit Widget → Script = this.
// Optional Parameter: max window length in hours (integer, 2–8). Default 5.
//   The actual window shrinks to the last event of the day when that's
//   sooner, so this is only a ceiling.

const DATA_URL = "https://inko9nito.github.io/hpde/api/events.json"
const SITE_URL = "https://inko9nito.github.io/hpde/"
const CACHE_FILENAME = "hpde-events.json"

const DEFAULT_MAX_WINDOW_HOURS = 5
const MIN_WINDOW_MIN = 90
const LOOKBACK_MIN = 60
const TRAILING_PAD_MIN = 10

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

function formatHourLabel(min) {
  const h = Math.floor(min / 60) % 24
  const hour = h % 12 || 12
  const ampm = h >= 12 ? "PM" : "AM"
  return `${hour}${ampm}`
}

function parseMaxWindowHours() {
  const raw = typeof args !== "undefined" && args.widgetParameter
  const n = raw ? parseInt(String(raw).trim(), 10) : NaN
  if (!Number.isFinite(n)) return DEFAULT_MAX_WINDOW_HOURS
  return Math.max(2, Math.min(8, n))
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

// ---------- Gantt block computation ----------

// For each group, walk the day and record on-track and in-class intervals.
// A block runs from its session-entry start to min(next timed event start,
// own start + typical slot length). Slot length is the median gap between
// consecutive session entries — this keeps the last group before a break
// or lunch from visually occupying the downtime. Consecutive same-kind
// slots for the same group merge into one block.
function computeGroupBlocks(dayEvents, groupIds) {
  const timed = dayEvents.filter(e => e.type !== "break" && typeof e.time === "string")
  const starts = timed.map(e => parseMinutes(e.time))

  const sessionStarts = []
  for (let i = 0; i < timed.length; i++) {
    if (timed[i].type === "session") sessionStarts.push(starts[i])
  }
  const gaps = []
  for (let j = 1; j < sessionStarts.length; j++) {
    const g = sessionStarts[j] - sessionStarts[j - 1]
    if (g > 0 && g <= 60) gaps.push(g)
  }
  gaps.sort((a, b) => a - b)
  const slotLen = gaps.length ? gaps[Math.floor(gaps.length / 2)] : 20

  const blocks = {}
  for (const id of groupIds) blocks[id] = { onTrack: [], inClass: [] }

  const pushBlock = (kind, gid, start, end) => {
    const arr = blocks[gid][kind]
    const last = arr[arr.length - 1]
    if (last && last.end === start) last.end = end
    else arr.push({ start, end })
  }

  for (let i = 0; i < timed.length; i++) {
    const ev = timed[i]
    if (ev.type !== "session") continue
    const start = starts[i]
    const nextStart = i + 1 < timed.length ? starts[i + 1] : start + slotLen
    const end = Math.min(start + slotLen, nextStart)
    for (const gid of ev.onTrack || []) {
      if (blocks[gid]) pushBlock("onTrack", gid, start, end)
    }
    for (const gid of ev.inClass || []) {
      if (blocks[gid]) pushBlock("inClass", gid, start, end)
    }
  }

  return blocks
}

// The window's rightmost point should hug the end of the day so the axis
// isn't padded with dead space. Falls back to a minimum width when the day
// is essentially over, so the NOW line still has room to sit inside a plot.
function computeWindow(dayEvents, now, maxHours) {
  const winStart = Math.max(0, now - LOOKBACK_MIN)
  const timed = dayEvents.filter(e => e.type !== "break" && typeof e.time === "string")
  const starts = timed.map(e => parseMinutes(e.time))
  const lastStart = starts.length ? starts[starts.length - 1] : winStart
  const naturalEnd = lastStart + TRAILING_PAD_MIN
  const cappedEnd = winStart + maxHours * 60
  let winEnd = Math.min(cappedEnd, naturalEnd)
  if (winEnd - winStart < MIN_WINDOW_MIN) winEnd = winStart + MIN_WINDOW_MIN
  winEnd = Math.min(24 * 60, winEnd)
  return { winStart, winEnd }
}

// Anchor events (lunch, special) inside the window render as thin vertical
// bars with a small icon at the top of the axis.
function anchorMarkers(dayEvents, winStart, winEnd) {
  const out = []
  for (const e of dayEvents) {
    if (e.type !== "lunch" && e.type !== "special") continue
    if (typeof e.time !== "string") continue
    const t = parseMinutes(e.time)
    if (t < winStart || t > winEnd) continue
    out.push({ time: t, label: e.label, type: e.type })
  }
  return out
}

// ---------- palette ----------

function palette(dark) {
  return dark
    ? { bg: new Color("#0b0b0f"), fg: new Color("#f5f5f7"),
        muted: new Color("#8a8a8f"), grid: new Color("#2a2a30"),
        row: new Color("#141418"), accent: new Color("#3b82f6"),
        marker: new Color("#f5f5f7", 0.35), pastOpacity: 0.5 }
    : { bg: new Color("#ffffff"), fg: new Color("#111827"),
        muted: new Color("#9ca3af"), grid: new Color("#e5e7eb"),
        row: new Color("#f5f5f7"), accent: new Color("#3b82f6"),
        marker: new Color("#111827", 0.25), pastOpacity: 0.5 }
}

// ---------- rendering ----------

function makeWidget({ manifest, stale }) {
  const w = new ListWidget()
  const dark = Device.isUsingDarkAppearance()
  const p = palette(dark)
  w.backgroundColor = p.bg
  w.setPadding(10, 12, 8, 12)
  w.url = SITE_URL

  const picked = pickToday(manifest)
  if (!picked) {
    renderNoEvents(w, p, stale, pickNextFuture(manifest))
    w.refreshAfterDate = new Date(Date.now() + 60 * 60 * 1000)
    return w
  }

  const { event, day } = picked
  const now = nowMinutes()
  const { winStart, winEnd } = computeWindow(day.events, now, parseMaxWindowHours())

  renderHeader(w, event, day, p, stale)

  const family = config.widgetFamily || "medium"
  const isLarge = family === "large" || family === "extraLarge"

  const image = drawTimelineImage({
    event, day, p, isLarge, winStart, winEnd, now,
  })
  const img = w.addImage(image)
  img.resizable = false
  img.centerAlignImage()

  w.refreshAfterDate = new Date(Date.now() + 5 * 60 * 1000)
  return w
}

function renderHeader(w, event, day, p, stale) {
  const row = w.addStack()
  row.centerAlignContent()

  const title = row.addText(event.name)
  title.font = Font.boldSystemFont(13)
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

  const nowLabel = row.addText(nowHM())
  nowLabel.font = Font.mediumSystemFont(12)
  nowLabel.textColor = p.accent

  if (stale) {
    const s = row.addText("  offline")
    s.font = Font.systemFont(9)
    s.textColor = p.muted
  }
  w.addSpacer(6)
}

// Draw the timeline at real point dimensions and let `respectScreenScale`
// handle retina. iOS renders the image 1:1 so text stays crisp and
// legible; nothing gets shrunk to fit.
function drawTimelineImage({ event, day, p, isLarge, winStart, winEnd, now }) {
  const groups = event.runGroups
  const groupIds = groups.map(g => g.id)
  const blocks = computeGroupBlocks(day.events, groupIds)
  const markers = anchorMarkers(day.events, winStart, winEnd)

  // Approximate content area of a medium widget (after the widget's own
  // padding and the header stack above).
  const W = isLarge ? 305 : 305
  const rowH = isLarge ? 40 : 22
  const labelColW = 44
  const axisH = 14
  const bottomPad = 2
  const H = axisH + groups.length * rowH + bottomPad

  const dc = new DrawContext()
  dc.size = new Size(W, H)
  dc.opaque = false
  dc.respectScreenScale = true

  const plotX0 = labelColW
  const plotX1 = W - 2
  const plotW = plotX1 - plotX0
  const winMin = Math.max(1, winEnd - winStart)
  const timeToX = t => plotX0 + ((t - winStart) / winMin) * plotW

  // Hour tick marks with faint vertical grid lines through the rows.
  const firstHour = Math.ceil(winStart / 60) * 60
  for (let t = firstHour; t <= winEnd; t += 60) {
    const x = timeToX(t)
    dc.setFillColor(p.grid)
    dc.fillRect(new Rect(x - 0.5, axisH - 2, 1, H - axisH - bottomPad + 2))
    dc.setFont(Font.mediumSystemFont(8))
    dc.setTextColor(p.muted)
    dc.setTextAlignedCenter()
    dc.drawTextInRect(formatHourLabel(t), new Rect(x - 20, 1, 40, 10))
  }

  // Rows: pill label on the left, band background, then any on-track /
  // in-class blocks inside the band.
  for (let i = 0; i < groups.length; i++) {
    const g = groups[i]
    const y = axisH + i * rowH
    const bandY = y + 2
    const bandH = rowH - 4

    dc.setFillColor(p.row)
    dc.fillRect(new Rect(plotX0, bandY, plotW, bandH))

    // Left pill: solid group color with the group name in white.
    const pillH = Math.min(bandH, isLarge ? 22 : 16)
    const pillY = y + (rowH - pillH) / 2
    dc.setFillColor(new Color(g.color))
    dc.fillRect(new Rect(2, pillY, labelColW - 6, pillH))
    dc.setFont(Font.boldSystemFont(isLarge ? 11 : 9))
    dc.setTextColor(new Color("#ffffff"))
    dc.setTextAlignedCenter()
    dc.drawTextInRect(g.label, new Rect(2, pillY + (pillH - (isLarge ? 14 : 11)) / 2,
      labelColW - 6, isLarge ? 14 : 11))

    drawBlocks({
      dc, blocks: blocks[g.id].onTrack, kind: "onTrack",
      color: g.color, bandY, bandH, timeToX, winStart, winEnd, now, p,
      labelFontSize: isLarge ? 10 : 8,
    })
    drawBlocks({
      dc, blocks: blocks[g.id].inClass, kind: "inClass",
      color: g.color, bandY, bandH, timeToX, winStart, winEnd, now, p,
      labelFontSize: isLarge ? 10 : 8,
    })
  }

  // Lunch / special markers as vertical bars behind the NOW line.
  for (const m of markers) {
    const x = timeToX(m.time)
    dc.setFillColor(p.marker)
    dc.fillRect(new Rect(x - 0.75, axisH, 1.5, H - axisH - bottomPad))
    dc.setFont(Font.systemFont(9))
    dc.setTextAlignedCenter()
    dc.drawTextInRect(m.type === "lunch" ? "🍔" : "⭐",
      new Rect(x - 9, 1, 18, 12))
  }

  // NOW line sits on top of everything.
  if (now >= winStart && now <= winEnd) {
    const x = timeToX(now)
    dc.setFillColor(p.accent)
    dc.fillRect(new Rect(x - 1, axisH - 3, 2, H - axisH - bottomPad + 3))
    dc.setFont(Font.boldSystemFont(8))
    dc.setTextColor(p.accent)
    dc.setTextAlignedCenter()
    dc.drawTextInRect("NOW", new Rect(x - 16, 2, 32, 10))
  }

  return dc.getImage()
}

// Blocks whose entire span is past are dimmed; blocks straddling now are
// dimmed before the NOW line, full opacity after. In-class blocks use a
// tinted background instead of a full-color fill so they read as different
// from on-track without competing visually.
function drawBlocks({ dc, blocks, kind, color, bandY, bandH, timeToX,
  winStart, winEnd, now, p, labelFontSize }) {
  for (const b of blocks) {
    if (b.end <= winStart || b.start >= winEnd) continue
    const s = Math.max(b.start, winStart)
    const e = Math.min(b.end, winEnd)
    const x = timeToX(s)
    const bw = Math.max(2, timeToX(e) - x)

    // Draw the block in one or two pieces (dim before now, full after).
    const pieces = []
    if (e <= now) pieces.push({ x, w: bw, past: true })
    else if (s >= now) pieces.push({ x, w: bw, past: false })
    else {
      const split = timeToX(now)
      pieces.push({ x, w: split - x, past: true })
      pieces.push({ x: split, w: bw - (split - x), past: false })
    }

    for (const pc of pieces) {
      if (kind === "onTrack") {
        dc.setFillColor(new Color(color, pc.past ? p.pastOpacity : 1))
      } else {
        // In-class: pale fill so it doesn't look like the group is racing.
        dc.setFillColor(new Color(color, pc.past ? 0.15 : 0.3))
      }
      dc.fillRect(new Rect(pc.x, bandY, pc.w, bandH))
    }

    // Label inside the block if there's room. On-track uses white on the
    // solid color; in-class uses the color itself on the pale fill.
    if (bw >= 26) {
      const label = kind === "onTrack" ? "On track" : "In class"
      dc.setFont(Font.mediumSystemFont(labelFontSize))
      if (kind === "onTrack") dc.setTextColor(new Color("#ffffff"))
      else dc.setTextColor(new Color(color))
      dc.setTextAlignedCenter()
      const textH = labelFontSize + 2
      dc.drawTextInRect(label,
        new Rect(x, bandY + (bandH - textH) / 2, bw, textH))
    }
  }
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
