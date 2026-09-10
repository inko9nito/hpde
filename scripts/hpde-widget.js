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

// Kept in sync with CURRENT_WINDOW_MIN in src/utils/time.ts.
const CURRENT_WINDOW_MIN = 15

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
  w.setPadding(10, 12, 10, 12)
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

  // Find the "current" event: the most recent event to have started, if
  // it was within CURRENT_WINDOW_MIN. When it exists, the now-marker
  // overlays that card instead of sitting between two cards.
  let currentIdx = -1
  for (let i = visible.length - 1; i >= 0; i--) {
    const t = parseMinutes(visible[i].time)
    if (t <= now) {
      if (now - t <= CURRENT_WINDOW_MIN) currentIdx = i
      break
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
      isCurrentEvent ? { now, nextEvent } : null)
  }
  if (nowLineBetweenAt >= rows.length) drawNowLine(w, p, now, null, 6)

  w.refreshAfterDate = new Date(Date.now() + 5 * 60 * 1000)
  return w
}

function renderHeader(w, event, day, p, stale) {
  const row = w.addStack()
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
  w.addSpacer(6)
}

function drawEventRow(w, ev, groupById, selected, p, past, current) {
  // Current events overlay the now-marker on top of the card: draw the
  // rule row directly above with 0 bottom spacer so they read as one unit.
  if (current) drawNowLine(w, p, current.now, current.nextEvent, 0)

  // Card-style row (block) with subtle background and rounded corners.
  const card = w.addStack()
  card.backgroundColor = current ? p.currentCardBg : p.cardBg
  card.cornerRadius = 6
  card.setPadding(7, 10, 7, 10)
  card.spacing = 8
  card.centerAlignContent()

  // Fixed-width time column (Outlook-style). Session numbers are shown
  // as SESSION headers between blocks, not inside the time cell.
  const timeCol = card.addStack()
  timeCol.size = new Size(44, 0)
  timeCol.centerAlignContent()

  const time = timeCol.addText(formatTime12(ev.time))
  time.font = current ? monoBoldFont(13) : monoFont(13)
  time.textColor = current ? p.accent : p.fg
  if (past) time.textOpacity = p.pastOpacity

  // Right content
  const isFood = ev.type === "lunch" || ev.type === "special"

  if (ev.type === "session") {
    const onTrack = (ev.onTrack || []).map(id => groupById[id]).filter(Boolean)
    if (onTrack.length) {
      addMutedLabel(card, "On track", p, past)
      for (const g of onTrack) {
        const dim = selected.length > 0 && !selected.includes(g.id)
        addGroupPill(card, g, dim || past)
      }
    }
    if (ev.inClass && ev.inClass.length) {
      addSeparator(card, p, past)
      addMutedLabel(card, "In class", p, past)
      const inClass = ev.inClass.map(id => groupById[id]).filter(Boolean)
      for (const g of inClass) addGroupPill(card, g, past)
    }
  } else {
    if (isFood) {
      const icon = card.addText(ev.type === "lunch" ? "🍔" : "⭐")
      icon.font = Font.systemFont(13)
    }
    const label = card.addText(ev.label)
    label.font = isFood ? Font.boldSystemFont(12) : Font.systemFont(12)
    label.textColor = p.fg
    label.lineLimit = 1
    if (past) label.textOpacity = p.pastOpacity
  }

  card.addSpacer()
  w.addSpacer(6)
}

function drawSessionHeader(w, p, n) {
  w.addSpacer(4)
  const row = w.addStack()
  const label = row.addText(`SESSION ${n}`)
  label.font = Font.boldSystemFont(9)
  label.textColor = p.muted
  row.addSpacer()
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

function drawNowLine(w, p, now, nextEvent, belowSpacer) {
  // Web-app style: current time + countdown above a thin blue rule.
  const top = w.addStack()
  top.centerAlignContent()

  const time = top.addText(nowHM().toUpperCase())
  time.font = Font.mediumSystemFont(10)
  time.textColor = p.accent

  top.addSpacer()

  if (nextEvent) {
    const min = parseMinutes(nextEvent.time) - now
    const prefix = top.addText("Next in ")
    prefix.font = Font.systemFont(10)
    prefix.textColor = p.muted
    const label = top.addText(formatCountdown(min))
    label.font = Font.boldSystemFont(10)
    label.textColor = urgencyColor(min, p)
  }

  w.addSpacer(2)

  const line = w.addStack()
  const bar = line.addStack()
  bar.backgroundColor = p.accent
  bar.size = new Size(0, 1.5)
  bar.addSpacer()

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
