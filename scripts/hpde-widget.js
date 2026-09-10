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

function pickDay(manifest) {
  const iso = todayIso()
  for (const event of manifest.events) {
    for (const day of event.days) {
      if (day.date === iso) return { event, day, notToday: false }
    }
  }
  const future = []
  for (const event of manifest.events) {
    for (const day of event.days) {
      if (day.date > iso) future.push({ event, day })
    }
  }
  future.sort((a, b) => a.day.date.localeCompare(b.day.date))
  return future[0] ? { event: future[0].event, day: future[0].day, notToday: true } : null
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
        line: new Color("#2a2a30"), accent: new Color("#3b82f6"),
        food: new Color("#f5f5f7"), pastOpacity: 0.35 }
    : { bg: new Color("#ffffff"), fg: new Color("#111827"), muted: new Color("#9ca3af"),
        line: new Color("#e5e7eb"), accent: new Color("#3b82f6"),
        food: new Color("#111827"), pastOpacity: 0.35 }
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
  w.setPadding(10, 12, 10, 12)
  w.url = SITE_URL

  const picked = pickDay(manifest)
  if (!picked) {
    renderNoEvents(w, p, stale)
    w.refreshAfterDate = new Date(Date.now() + 60 * 60 * 1000)
    return w
  }

  const { event, day, notToday } = picked
  const groupById = Object.fromEntries(event.runGroups.map(g => [g.id, g]))
  const selected = parseGroupFilter()

  const visible = day.events.filter(e => {
    if (e.type !== "session") return true
    if (selected.length === 0) return true
    const on = (e.onTrack || []).some(id => selected.includes(id))
    const inC = (e.inClass || []).some(id => selected.includes(id))
    return on || inC
  }).filter(e => e.type !== "break")

  renderHeader(w, event, day, p, notToday, stale)

  const isToday = day.date === todayIso()
  const now = nowMinutes()

  const nextIdx = isToday
    ? visible.findIndex(e => parseMinutes(e.time) > now)
    : -1
  const insertAt = nextIdx === -1 ? visible.length : nextIdx

  // window: 1 past + 4 upcoming when today, first 5 otherwise
  const start = isToday ? Math.max(0, insertAt - 1) : 0
  const rows = visible.slice(start, start + 5)
  const nowLineAt = isToday ? insertAt - start : -1

  for (let i = 0; i < rows.length; i++) {
    if (i === nowLineAt) drawNowLine(w, p, now, visible[insertAt])
    const ev = rows[i]
    const past = isToday && parseMinutes(ev.time) < now
    drawEventRow(w, ev, groupById, selected, p, past)
  }
  if (isToday && nowLineAt >= rows.length) drawNowLine(w, p, now, null)

  const nowMs = Date.now()
  const bumpMin = isToday ? 5 : 60
  w.refreshAfterDate = new Date(nowMs + bumpMin * 60 * 1000)

  return w
}

function renderHeader(w, event, day, p, notToday, stale) {
  const row = w.addStack()
  row.centerAlignContent()

  const title = row.addText(event.name)
  title.font = Font.boldSystemFont(13)
  title.textColor = p.fg
  title.lineLimit = 1

  const dot = row.addText("  ·  ")
  dot.font = Font.systemFont(11)
  dot.textColor = p.muted

  const sub = row.addText(notToday ? day.label + " " + shortDate(day.date) : day.label)
  sub.font = Font.systemFont(11)
  sub.textColor = p.muted
  sub.lineLimit = 1

  row.addSpacer()

  if (stale) {
    const s = row.addText("offline")
    s.font = Font.systemFont(9)
    s.textColor = p.muted
  }
  w.addSpacer(4)
}

function drawEventRow(w, ev, groupById, selected, p, past) {
  const row = w.addStack()
  row.centerAlignContent()
  row.spacing = 6

  const time = row.addText(formatTime12(ev.time))
  time.font = Font.monospacedSystemFont(11)
  time.textColor = p.fg
  if (past) time.textOpacity = p.pastOpacity

  const isFood = ev.type === "lunch" || ev.type === "special"

  if (ev.type === "session") {
    const onTrack = (ev.onTrack || [])
    for (const gid of onTrack) {
      const g = groupById[gid]
      if (!g) continue
      const dimmed = selected.length > 0 && !selected.includes(gid)
      const dot = row.addText("●")
      dot.font = Font.systemFont(12)
      dot.textColor = new Color(g.color)
      if (dimmed || past) dot.textOpacity = p.pastOpacity
    }
    if (ev.sessionNumber !== undefined) {
      const label = row.addText(` S${ev.sessionNumber}`)
      label.font = Font.mediumSystemFont(11)
      label.textColor = p.fg
      if (past) label.textOpacity = p.pastOpacity
    }
    if (ev.inClass && ev.inClass.length) {
      const sep = row.addText("  ·  in ")
      sep.font = Font.systemFont(10)
      sep.textColor = p.muted
      if (past) sep.textOpacity = p.pastOpacity
      for (const gid of ev.inClass) {
        const g = groupById[gid]
        if (!g) continue
        const dot = row.addText("●")
        dot.font = Font.systemFont(10)
        dot.textColor = new Color(g.color)
        if (past) dot.textOpacity = p.pastOpacity
      }
    }
  } else {
    if (isFood) {
      const icon = row.addText(ev.type === "lunch" ? "🍔" : "⭐")
      icon.font = Font.systemFont(11)
    }
    const label = row.addText(ev.label)
    label.font = isFood ? Font.boldSystemFont(11) : Font.systemFont(11)
    label.textColor = p.fg
    label.lineLimit = 1
    if (past) label.textOpacity = p.pastOpacity
  }

  row.addSpacer()
  w.addSpacer(3)
}

function drawNowLine(w, p, now, nextEvent) {
  const row = w.addStack()
  row.centerAlignContent()
  row.spacing = 6

  const time = row.addText(nowHM())
  time.font = Font.monospacedSystemFont(10)
  time.textColor = p.accent

  const bar = row.addStack()
  bar.backgroundColor = p.accent
  bar.size = new Size(0, 1.5)
  bar.addSpacer()

  if (nextEvent) {
    const min = parseMinutes(nextEvent.time) - now
    const label = row.addText("next in " + formatCountdown(min))
    label.font = Font.systemFont(9)
    label.textColor = urgencyColor(min, p)
  }
  w.addSpacer(3)
}

function nowHM() {
  const d = new Date()
  const h = d.getHours() % 12 || 12
  const ampm = d.getHours() >= 12 ? "p" : "a"
  return `${h}:${String(d.getMinutes()).padStart(2, "0")}${ampm}`
}

function shortDate(iso) {
  const [y, m, d] = iso.split("-").map(Number)
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  return `${months[m - 1]} ${d}`
}

function renderNoEvents(w, p, stale) {
  const title = w.addText("HPDE")
  title.font = Font.boldSystemFont(14)
  title.textColor = p.fg
  w.addSpacer(4)

  const msg = w.addText("No event today.")
  msg.font = Font.systemFont(12)
  msg.textColor = p.muted

  if (stale) {
    const s = w.addText("(showing cached data)")
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
} else {
  await widget.presentMedium()
}
Script.complete()
