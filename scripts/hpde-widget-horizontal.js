// HPDE track-day schedule — horizontal iOS Home Screen widget for Scriptable.
// Source: https://github.com/inko9nito/hpde/blob/main/scripts/hpde-widget-horizontal.js
// Data:   https://inko9nito.github.io/hpde/api/events.json
//
// A Gantt-style timeline: one row per run group, colored blocks marking when
// that group is on track. The visible window starts one hour before now and
// extends a few hours to the right; a vertical NOW line sits about a quarter
// of the way in and slides right as the day progresses.
//
// Setup: install Scriptable → paste this script → long-press Home Screen →
//   Add Widget → Scriptable → Medium (or Large) → Edit Widget → Script = this.
// Optional Parameter: window length in hours (integer, 2–8). Default 4.
//   e.g. "6" widens the view to six hours after "one hour ago".

const DATA_URL = "https://inko9nito.github.io/hpde/api/events.json"
const SITE_URL = "https://inko9nito.github.io/hpde/"
const CACHE_FILENAME = "hpde-events.json"

// Default visible window: one hour before now, plus this many hours after.
const DEFAULT_WINDOW_HOURS = 4
const LOOKBACK_MIN = 60

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

function parseWindowHours() {
  const raw = typeof args !== "undefined" && args.widgetParameter
  const n = raw ? parseInt(String(raw).trim(), 10) : NaN
  if (!Number.isFinite(n)) return DEFAULT_WINDOW_HOURS
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

// A group's on-track block runs from its session entry's start time to
// min(next timed event start, its own start + typical slot length). The
// slot-length cap keeps the last group before a break/lunch from visually
// occupying the downtime — schedules don't carry explicit end times, so we
// infer slot length as the median gap between consecutive session entries.
// Consecutive on-track slots for the same group merge into one block.
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

  const blocks = Object.fromEntries(groupIds.map(id => [id, []]))

  for (let i = 0; i < timed.length; i++) {
    const ev = timed[i]
    if (ev.type !== "session") continue
    const onTrack = ev.onTrack || []
    if (!onTrack.length) continue
    const start = starts[i]
    const nextStart = i + 1 < timed.length ? starts[i + 1] : start + slotLen
    const end = Math.min(start + slotLen, nextStart)
    for (const gid of onTrack) {
      if (!blocks[gid]) continue
      const arr = blocks[gid]
      const last = arr[arr.length - 1]
      if (last && last.end === start) last.end = end
      else arr.push({ start, end })
    }
  }

  return blocks
}

// Anchor events (lunch, special) that fall inside the visible window are
// rendered as vertical bars so the timeline stays legible during downtime.
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
  w.setPadding(10, 12, 10, 12)
  w.url = SITE_URL

  const picked = pickToday(manifest)
  if (!picked) {
    renderNoEvents(w, p, stale, pickNextFuture(manifest))
    w.refreshAfterDate = new Date(Date.now() + 60 * 60 * 1000)
    return w
  }

  const { event, day } = picked
  const winHours = parseWindowHours()
  const now = nowMinutes()
  const winStart = Math.max(0, now - LOOKBACK_MIN)
  const winEnd = Math.min(24 * 60, winStart + winHours * 60)

  renderHeader(w, event, day, p, stale)

  const family = config.widgetFamily || "medium"
  const isLarge = family === "large" || family === "extraLarge"

  const image = drawTimelineImage({
    event, day, p, dark, isLarge, winStart, winEnd, now,
  })
  const img = w.addImage(image)
  img.resizable = true

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
  dot.font = Font.systemFont(11)
  dot.textColor = p.muted

  const sub = row.addText(day.label)
  sub.font = Font.systemFont(11)
  sub.textColor = p.muted
  sub.lineLimit = 1

  row.addSpacer()

  const nowLabel = row.addText(nowHM())
  nowLabel.font = Font.mediumSystemFont(11)
  nowLabel.textColor = p.accent

  if (stale) {
    const gap = row.addText("  ")
    gap.font = Font.systemFont(9)
    const s = row.addText("offline")
    s.font = Font.systemFont(9)
    s.textColor = p.muted
  }
  w.addSpacer(6)
}

// The timeline is drawn as one image so we get precise horizontal blocks
// and a crisp NOW line. Canvas coordinates are internal — the widget
// scales the image to fit its available width.
function drawTimelineImage({ event, day, p, dark, isLarge, winStart, winEnd, now }) {
  const groups = event.runGroups
  const groupIds = groups.map(g => g.id)
  const blocks = computeGroupBlocks(day.events, groupIds)
  const markers = anchorMarkers(day.events, winStart, winEnd)

  const W = 640
  const rowH = isLarge ? 48 : 30
  const labelColW = 78
  const axisH = 22
  const bottomPad = 6
  const H = axisH + groups.length * rowH + bottomPad

  const dc = new DrawContext()
  dc.size = new Size(W, H)
  dc.opaque = false
  dc.respectScreenScale = true

  const plotX0 = labelColW
  const plotX1 = W - 4
  const plotW = plotX1 - plotX0
  const winMin = winEnd - winStart
  const timeToX = t => plotX0 + ((t - winStart) / winMin) * plotW

  // Axis: hour ticks + labels. Draw a subtle vertical grid line down through
  // every row so the eye can line blocks up with the axis.
  const firstHour = Math.ceil(winStart / 60) * 60
  dc.setTextAlignedCenter()
  for (let t = firstHour; t <= winEnd; t += 60) {
    const x = timeToX(t)
    dc.setFillColor(p.grid)
    dc.fillRect(new Rect(x - 0.5, axisH - 4, 1, H - axisH - bottomPad + 4))
    dc.setFont(Font.mediumSystemFont(10))
    dc.setTextColor(p.muted)
    dc.drawTextInRect(formatHourLabel(t), new Rect(x - 24, 2, 48, 14))
  }

  // Row bands + group labels + on-track blocks.
  for (let i = 0; i < groups.length; i++) {
    const g = groups[i]
    const y = axisH + i * rowH
    const bandY = y + 4
    const bandH = rowH - 8

    dc.setFillColor(p.row)
    dc.fillRect(new Rect(plotX0, bandY, plotW, bandH))

    // Group pill (rounded rect) on the left, matching the web app's
    // GroupBadge — colored background with the group label in white.
    const pillH = Math.min(bandH, 20)
    const pillY = y + (rowH - pillH) / 2
    dc.setFillColor(new Color(g.color))
    drawRoundedRect(dc, new Rect(4, pillY, labelColW - 10, pillH), pillH / 2)
    dc.setFont(Font.boldSystemFont(11))
    dc.setTextColor(new Color("#ffffff"))
    dc.setTextAlignedCenter()
    dc.drawTextInRect(g.label, new Rect(4, pillY + (pillH - 14) / 2, labelColW - 10, 14))

    // On-track blocks (clipped to the visible window). Blocks whose whole
    // span is in the past are dimmed; blocks straddling now are drawn full
    // opacity from now onward, dimmed before.
    for (const b of blocks[g.id] || []) {
      if (b.end <= winStart || b.start >= winEnd) continue
      const s = Math.max(b.start, winStart)
      const e = Math.min(b.end, winEnd)
      const x = timeToX(s)
      const bw = Math.max(2, timeToX(e) - x)
      const rect = new Rect(x, bandY, bw, bandH)
      if (e <= now) {
        dc.setFillColor(new Color(g.color, p.pastOpacity))
        drawRoundedRect(dc, rect, Math.min(4, bandH / 2))
      } else if (s >= now) {
        dc.setFillColor(new Color(g.color))
        drawRoundedRect(dc, rect, Math.min(4, bandH / 2))
      } else {
        const splitX = timeToX(now)
        dc.setFillColor(new Color(g.color, p.pastOpacity))
        drawRoundedRect(dc, new Rect(x, bandY, splitX - x, bandH), Math.min(4, bandH / 2))
        dc.setFillColor(new Color(g.color))
        drawRoundedRect(dc, new Rect(splitX, bandY, bw - (splitX - x), bandH), Math.min(4, bandH / 2))
      }
    }
  }

  // Anchor markers (lunch / special) as thin vertical bars behind the NOW
  // line, with a small icon at the top so the downtime is recognizable.
  for (const m of markers) {
    const x = timeToX(m.time)
    dc.setFillColor(p.marker)
    dc.fillRect(new Rect(x - 1, axisH, 2, H - axisH - bottomPad))
    dc.setFont(Font.systemFont(11))
    dc.setTextAlignedCenter()
    dc.drawTextInRect(m.type === "lunch" ? "🍔" : "⭐",
      new Rect(x - 10, 3, 20, 14))
  }

  // NOW line, drawn last so it sits on top of everything.
  if (now >= winStart && now <= winEnd) {
    const x = timeToX(now)
    dc.setFillColor(p.accent)
    dc.fillRect(new Rect(x - 1.25, axisH - 6, 2.5, H - axisH - bottomPad + 6))
    dc.setFont(Font.boldSystemFont(9))
    dc.setTextColor(p.accent)
    dc.setTextAlignedCenter()
    dc.drawTextInRect("NOW", new Rect(x - 20, 2, 40, 12))
  }

  return dc.getImage()
}

// DrawContext has no rounded-rect primitive; approximate with a center
// rect + two square caps + four corner circles. Falls back to a plain
// fillRect when the radius is 0.
function drawRoundedRect(dc, rect, radius) {
  const r = Math.max(0, Math.min(radius, rect.width / 2, rect.height / 2))
  if (r === 0) { dc.fillRect(rect); return }
  const { x, y, width: w, height: h } = rect
  dc.fillRect(new Rect(x + r, y, w - 2 * r, h))
  dc.fillRect(new Rect(x, y + r, r, h - 2 * r))
  dc.fillRect(new Rect(x + w - r, y + r, r, h - 2 * r))
  dc.fillEllipse(new Rect(x, y, 2 * r, 2 * r))
  dc.fillEllipse(new Rect(x + w - 2 * r, y, 2 * r, 2 * r))
  dc.fillEllipse(new Rect(x, y + h - 2 * r, 2 * r, 2 * r))
  dc.fillEllipse(new Rect(x + w - 2 * r, y + h - 2 * r, 2 * r, 2 * r))
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
