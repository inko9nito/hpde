// HPDE track-day schedule — iOS Home Screen widget for Scriptable.
// Source: https://github.com/inko9nito/hpde/blob/main/scripts/hpde-widget.js
// Data:   https://myhpde.netlify.app/api/events.json
//
// Setup: install Scriptable → paste this script → long-press Home Screen →
//   Add Widget → Scriptable → Medium → Edit Widget → Script = this script.
// Optional Parameter: comma-separated run group ids and an optional lead
//   time as `Nm`, split by `|` for readability. Examples:
//     orange,blue          — filter to orange + blue, default 10-min lead
//     orange,blue|15m      — same filter, 15-min lead
//     15m                  — no filter, 15-min lead
//     (blank)              — no filter, default 10-min lead
//     test                 — debug flag: show the Test Event as today's
//                            event so a notification-schedule end-to-end
//                            can be verified even without a real HPDE
//                            today. Combine with anything else, e.g.
//                            `test,orange|10m`.
//     test-upcoming        — debug flag: show the Test Event as a FUTURE
//                            event instead, to exercise the no-event-
//                            today countdown card. Defaults to 10 days
//                            out (past the single-day/week:day split);
//                            `test-upcoming-3` picks a different count.
//   Run-group filtering also drives notifications: sessions in the filtered
//   groups are alerted N minutes before start; all-drivers events (anything
//   without a run-group tag — meetings, lunch, etc.) always fire an alert.

const DATA_URL = "https://myhpde.netlify.app/api/events.json"
const SITE_URL = "https://myhpde.netlify.app/"
const CACHE_FILENAME = "hpde-events.json"
const NOTIF_STATE_FILENAME = "hpde-notif-state.json"
const NOTIF_ID_PREFIX = "hpde:"
const NOTIF_THREAD_ID = "hpde"
// Scriptable's Notification.sound defaults to null, which delivers
// silently even with sound enabled in iOS settings (#218). "event" is
// one of Scriptable's built-in sound names.
const NOTIF_SOUND = "event"
const DEFAULT_LEAD_MIN = 10
// Instance entries in the shared state file age out after this many days
// without a widget refresh, so a widget instance that was removed stops
// contributing its filter/lead to the merged notification set.
const NOTIF_STALE_INSTANCE_DAYS = 3
// iOS caps pending notifications per app at 64; leave headroom under that
// so the widget's own alerts don't crowd out anything else Scriptable
// might schedule.
const NOTIF_MAX_PENDING = 60
// A same-group session immediately after an on-track slot only counts as
// a "follows" hint if it starts within this many minutes.
const NOTIF_FOLLOW_WINDOW_MIN = 60

const LAST_ACTIVITY_FALLBACK_MIN = 30
// The current activity stops being "current" this many minutes before the
// next activity begins — the marker leaves the card and moves into the
// between-cards gap.
const CURRENT_END_LOOKAHEAD_MIN = 5
// The marker sits OVERLAPPING THE TOP of the current card for the
// first few minutes of the activity, then flips to OVERLAPPING THE
// BOTTOM for the rest of the "current" window. Both states use the
// three-column illusion (dot in the left gutter, bar inside the card
// interior, bar in the right gutter) that makes the marker appear to
// cross over the card.
const CURRENT_TOP_PHASE_MIN = 5

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
    // The feed is a Netlify function (#232); an error page or anything
    // that isn't the events list must not replace the good cached copy.
    if (req.response.statusCode !== 200 || !manifest || !Array.isArray(manifest.events)) {
      throw new Error("Events feed unavailable")
    }
    try { fm.writeString(path, JSON.stringify(manifest)) } catch (_) {}
    return { manifest, stale: false }
  } catch (e) {
    if (fm.fileExists(path)) {
      return { manifest: JSON.parse(fm.readString(path)), stale: true }
    }
    throw e
  }
}

// Standing fixture events (test-live) ship in the manifest at their
// natural date (Jan 1 2000) so real users never see them as today's
// event. Rewriting them to "today" (or to a future date, for testing
// the no-event-today countdown card) is opt-in via the `test` /
// `test-upcoming` flags on the widget parameter — the widget calls
// this only when the user asks for it.
const FIXTURE_EVENT_IDS = new Set(["test-live"])
// Past 6 days out the countdown card switches from a single day count
// to a week:day split, so the default here exercises that split
// without the user having to pick a number.
const TEST_UPCOMING_DEFAULT_DAYS = 10
// The fixture ships 3 days (see test-live.md) purely so `test-upcoming`
// has more than one future day to work with — spreading them a week
// apart lets one `test-upcoming[-N]` flag exercise the countdown
// card's 3-card stack on Large AND the "N more upcoming" footer on Medium,
// without a separate flag for each.
const TEST_UPCOMING_SPREAD_DAYS = 7
const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
function weekdayLabel(iso) {
  const [y, m, d] = iso.split("-").map(Number)
  return WEEKDAY_NAMES[new Date(y, m - 1, d).getDay()]
}

function rewriteFixtures(manifest, mode, upcomingDays, upcomingCount) {
  if (!manifest || !Array.isArray(manifest.events)) return manifest
  for (const event of manifest.events) {
    if (!event || !FIXTURE_EVENT_IDS.has(event.id)) continue
    const days = (event.days || []).filter(day => day && typeof day === "object")
    if (mode === "upcoming") {
      const base = upcomingDays || TEST_UPCOMING_DEFAULT_DAYS
      // Default to using every fixture day; `test-upcoming-count-<N>`
      // clamps that down (to as low as 0) so fewer of them get pushed
      // into the future — the rest stay on their inert placeholder
      // dates and never count as "upcoming" at all.
      const count = upcomingCount == null ? days.length : Math.max(0, Math.min(upcomingCount, days.length))
      days.forEach((day, i) => {
        if (i >= count) return
        const iso = futureIso(base + i * TEST_UPCOMING_SPREAD_DAYS)
        day.date = iso
        // The fixture's first day is authored as "## Today | 2000-01-01",
        // so its label is the literal string "Today" — accurate for the
        // `test` flag (rewritten to today) but confusing here, where
        // "Today" would read as a contradiction on a future-dated card.
        // Real events always label a day by its weekday name, never
        // "Today", so rewrite the label to match on every fixture day.
        day.label = weekdayLabel(iso)
      })
    } else {
      const iso = todayIso()
      const label = weekdayLabel(iso)
      for (const day of days) {
        day.date = iso
        day.label = label
      }
    }
  }
  return manifest
}

// ---------- date + time helpers ----------

function todayIso() {
  return isoFor(new Date())
}

function futureIso(daysAhead) {
  const d = new Date()
  d.setDate(d.getDate() + daysAhead)
  return isoFor(d)
}

function isoFor(d) {
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

function formatAmPm(hhmm) {
  const [h] = hhmm.split(":").map(Number)
  return h >= 12 ? "PM" : "AM"
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
  return matches[0]
}

// Every future day across every event, soonest first, plus how many
// there are in total — `limit` only trims how many come back in
// `items`, so the caller can still show "N more upcoming" for the rest.
function pickUpcoming(manifest, limit) {
  const iso = todayIso()
  const future = []
  for (const event of manifest.events) {
    for (const day of event.days) {
      if (day.date > iso) future.push({ event, day })
    }
  }
  future.sort((a, b) => a.day.date.localeCompare(b.day.date))
  return { items: future.slice(0, limit), total: future.length }
}

// Reserved parameter tokens that aren't run-group ids: they flip debug
// switches instead. Keep this small — every keyword here excludes a
// potential future run-group id.
const RESERVED_FLAG_TOKENS = new Set(["test"])
// `test-upcoming` rewrites the Test Event to FUTURE date(s) instead of
// today, for exercising the no-event-today countdown card. Two
// optional numeric parts, hyphen required before each:
//   test-upcoming            → default count (every fixture day) and
//                               default day offset (10 days out)
//   test-upcoming-<count>    → how many upcoming events to have (0-3;
//                               see FIXTURE_EVENT_IDS' day count)
//   test-upcoming-<days>d    → which day offset the first one lands on
//   test-upcoming-<count>-<days>d → both, e.g. test-upcoming-3-2d is
//                               "3 upcoming events, the first one 2
//                               days out"
// The trailing `d` is what disambiguates a day offset from a count —
// without it (or without the leading hyphen), the token doesn't match
// and falls through to the invalid-parameter footer instead of being
// silently misread.
const TEST_UPCOMING_RE = /^test-upcoming(?:-(\d+))?(?:-(\d+)d)?$/i

// Parse the widget's optional user parameter into a filter list plus a lead
// time for notifications and a debug-flag set. Format is `<groups>|<Nm>`;
// either half is optional. Any comma-separated token matching `\d+m`
// (case-insensitive) is treated as the lead time even if the user forgot
// the pipe (`10m` alone or `orange,10m` both work). A reserved flag token
// (e.g. `test`, `test-upcoming`) is recorded in `flags` and skips the
// group list. Anything else is a group id — unknown group ids get sifted
// into `invalid` later, once we have a manifest to check against.
function parseWidgetParameter(raw) {
  const source = String(raw == null ? "" : raw).trim()
  const groups = []
  const flags = {}
  let leadMinutes = DEFAULT_LEAD_MIN
  const invalidLead = []
  if (source) {
    for (const chunk of source.split("|")) {
      for (const t of chunk.split(",")) {
        const tok = t.trim()
        if (!tok) continue
        const m = tok.match(/^(\d+)\s*m$/i)
        const upcomingMatch = tok.match(TEST_UPCOMING_RE)
        if (m) {
          const n = parseInt(m[1], 10)
          if (n >= 0 && n <= 24 * 60) leadMinutes = n
          else invalidLead.push(tok)
        } else if (upcomingMatch) {
          flags["test-upcoming"] = true
          if (upcomingMatch[1]) flags.testUpcomingCount = parseInt(upcomingMatch[1], 10)
          if (upcomingMatch[2]) flags.testUpcomingDays = parseInt(upcomingMatch[2], 10)
        } else if (RESERVED_FLAG_TOKENS.has(tok.toLowerCase())) {
          flags[tok.toLowerCase()] = true
        } else {
          groups.push(tok)
        }
      }
    }
  }
  return { rawParam: source, groups, leadMinutes, flags, invalid: invalidLead }
}

function readWidgetParameter() {
  const raw = typeof args !== "undefined" && args.widgetParameter
  return parseWidgetParameter(raw)
}

// Validates group ids against a manifest's known run groups; unknown ids
// are moved into `invalid` for the widget footer. Mutates and returns the
// parsed object.
function validateWidgetParameter(parsed, manifest) {
  const known = new Set()
  for (const event of (manifest && manifest.events) || []) {
    for (const g of event.runGroups || []) known.add(g.id)
  }
  const kept = []
  for (const gid of parsed.groups) {
    if (known.has(gid)) kept.push(gid)
    else parsed.invalid.push(gid)
  }
  parsed.groups = kept
  return parsed
}

// What the widget's parameter and alerts change about today's view
// (#291), for the chips under the live view's header: the run groups
// it's filtered to that have sessions today, the ones that don't (every
// one of their sessions is missing, so they get a warning), parameter
// tokens it couldn't read, and the alerts — off, or their lead time when
// it isn't the default. Null when there's none of it.
function paramSummary(parsed, notifStatus, event, day, manifest) {
  const running = new Set()
  for (const a of day.activities || []) {
    if (a.type !== "session") continue
    for (const id of [...(a.onTrack || []), ...(a.inClass || [])]) running.add(id)
  }
  const groups = []
  const missing = []
  // With no schedule yet, nothing is filtered out: no group chips.
  if ((day.activities || []).length > 0) {
    for (const id of (parsed && parsed.groups) || []) {
      const g = findRunGroup(event, manifest, id)
      if (running.has(id)) groups.push(g)
      else missing.push(g)
    }
  }
  const invalid = (parsed && parsed.invalid) || []
  const notifsOff = !!(notifStatus && notifStatus.denied)
  const lead = !notifsOff && parsed && parsed.leadMinutes !== DEFAULT_LEAD_MIN ? parsed.leadMinutes : null
  if (groups.length + missing.length + invalid.length === 0 && !notifsOff && lead == null) return null
  return { groups, missing, invalid, notifsOff, lead }
}

// A run group by id: today's event's own, else another event's (a
// filter can name a group that only runs at another event).
function findRunGroup(event, manifest, id) {
  const events = [event, ...((manifest && manifest.events) || [])]
  for (const e of events) {
    const g = (e.runGroups || []).find(x => x.id === id)
    if (g) return g
  }
  return { id, label: id }
}

// ---------- palette ----------

// `accent` (blue) is the today view's now-marker, as the app's
// TimeIndicator. `brand` (red) is the upcoming-events view's accent —
// the app's DateBlock month (red-600 light / red-400 dark) — for the
// month, the countdown pill and the Small well;
// `brandTint` (the app's LIVE badge background, red-500 at 10%) is the
// pill's and the Small well's background. `chipBg` is the live view's
// parameter chips (#291).
function palette(dark) {
  return dark
    // Dark mode keeps its "cards are slightly LIGHTER than the
    // widget background" relationship — that's the convention that
    // makes dark cards read as raised over a deeper widget ground.
    // No borders on either card variety; the tinted background on
    // the current card and the marker crossing it are enough.
    ? { bg: new Color("#0e0e11"), fg: new Color("#f5f5f7"), muted: new Color("#8a8a8f"),
        mutedStrong: new Color("#a4a4aa"),
        cardBg: new Color("#18181c"),
        currentCardBg: new Color("#122135"),
        divider: new Color("#26262c"),
        chipBg: new Color("#26262c"),
        accent: new Color("#3b82f6"),
        brand: new Color("#f87171"), brandTint: new Color("#ef4444", 0.15),
        pastOpacity: 0.6 }
    // Light mode: widget background is now white and non-current
    // cards use the light gray that USED to be the widget
    // background (swap of the two, no border). The current card
    // keeps its blue tint. No borders anywhere — the marker line
    // would otherwise get interrupted where it crosses a border
    // strip.
    : { bg: new Color("#ffffff"), fg: new Color("#111827"), muted: new Color("#9ca3af"),
        mutedStrong: new Color("#6b7280"),
        cardBg: new Color("#f9fafb"),
        currentCardBg: new Color("#eef4ff"),
        divider: new Color("#e5e7eb"),
        chipBg: new Color("#e5e7eb"),
        accent: new Color("#3b82f6"),
        brand: new Color("#dc2626"), brandTint: new Color("#ef4444", 0.1),
        pastOpacity: 0.6 }
}

// The countdowns are the app's featured event card (#204), near-black
// whatever the phone's appearance, as their Figma designs have it (HPDE
// file: Small 2068:7908, Medium 2069:8111, Large 2069:8015 with one
// event and 2069:8027 with more): white
// text, the month and the bar beside the name in `accent`, the
// organizer white at 60%, a solid red badge with white text. The track
// is #646872 on a 35% layer (then faded, see FEATURED_TRACK); the other
// configuration, where a track has one, is a sixth of that; a track
// with no shape gets the placeholder flag in the track's color.
const FEATURED_PALETTE = {
  fg: new Color("#ffffff"),
  accent: new Color("#d64545"),
  subtle: new Color("#ffffff", 0.6),
  badgeBg: new Color("#dc2626"),
  badgeFg: new Color("#ffffff"),
  track: new Color("#646872", 0.35),
  trackGhost: new Color("#646872", 0.06),
  // Large with one event: its big track is fainter, a 20% layer.
  trackFaint: new Color("#646872", 0.2),
  trackFaintGhost: new Color("#646872", 0.033),
  // Large's header flag: white at 60%.
  flag: new Color("#ffffff", 0.6),
}

// The featured cards' ground: a near-black gradient, top to bottom,
// from the designs — [how far down, color]. Both cards draw it into
// their background image with the track (which sits behind their
// text), and the track's fade in the ground's own color at each height.
const FEATURED_GROUND = [
  [0, "#262626"], [0.149, "#262626"], [0.418, "#222222"], [0.817, "#1c1c1c"], [1, "#1b1b1b"],
]

// The ground's color `f` of the way down (0 top, 1 bottom).
function featuredGround(f, alpha = 1) {
  const g = FEATURED_GROUND
  let i = 1
  while (i < g.length - 1 && g[i][0] < f) i++
  const [f0, c0] = g[i - 1]
  const [f1, c1] = g[i]
  const k = Math.max(0, Math.min(1, (f - f0) / (f1 - f0)))
  const ch = (c, j) => parseInt(c.slice(1 + 2 * j, 3 + 2 * j), 16)
  const hex = [0, 1, 2]
    .map(j => Math.round(ch(c0, j) + (ch(c1, j) - ch(c0, j)) * k).toString(16).padStart(2, "0"))
    .join("")
  return new Color(`#${hex}`, alpha)
}

// The card's background: its ground and tracks (`items`' tracks at
// `places`, see FEATURED_TRACK) as the widget's background image. The
// background color is set too, to the ground's middle, replacing the
// phone-appearance one makeWidget set: whichever of color and image
// Scriptable shows, it's dark.
function setFeaturedGround(w, family, items, places) {
  w.backgroundColor = featuredGround(0.5)
  const tracks = places.map((place, i) => ({ trackId: items[i] && items[i].event.trackId, place }))
  const image = featuredGroundImage(family, tracks, FEATURED_PALETTE)
  if (image) w.backgroundImage = image
  else w.backgroundGradient = featuredGradient()
}

// Without DrawContext (no background image), the ground alone.
function featuredGradient() {
  const g = new LinearGradient()
  g.colors = FEATURED_GROUND.map(([f]) => featuredGround(f))
  g.locations = FEATURED_GROUND.map(([f]) => f)
  g.startPoint = new Point(0, 0)
  g.endPoint = new Point(0, 1)
  return g
}

// ---------- design guardrails ----------
//
// This widget hand-rolls what WidgetKit gives native widgets for free
// (auto content margins, container-relative corner radius, Dynamic
// Type). Nothing here enforces these automatically, so they're written
// down as rules instead — and where possible, as a single shared
// constant/table so a layout function structurally CAN'T drift from
// its siblings the way the header/card margin and Small-truncation
// bugs did:
//
//   1. Color: every color a layout function uses comes from the `p`
//      palette (or a shared semantic constant like WARN_COLOR below)
//      — never a fresh `new Color("#hex")` inline. The palette is what
//      makes light/dark mode and any future re-tint (Smart Stack,
//      monochrome Home Screen) a one-place change instead of a hunt
//      through every draw function. (Exceptions: urgencyColor's
//      reds/oranges are genuinely data-driven, not a layout choice;
//      pill text and run-group colors come from event data, not the
//      palette.)
//   2. No borders. A stroked edge around a card interrupts the
//      now-marker line where it crosses a card, and the HIG's own
//      guidance is that the system container already separates a
//      widget from the wallpaper — cards distinguish themselves by
//      background tint alone.
//   3. No shadows. Widgets render flat next to system widgets; no
//      drop shadow / elevation effect anywhere in this file.
//   4. Size-dependent values (font, spacing, radius per small/medium/
//      large tier) are looked up from one table per view, never
//      hand-tuned per property in each function — see COUNTDOWN_TOKENS
//      below for the pattern.
const WARN_COLOR = new Color("#ef4444")

function urgencyColor(min, p) {
  if (min <= 5) return WARN_COLOR
  if (min <= 10) return new Color("#f97316")
  return p.muted
}

// Rough widget interior height (after our top/bottom widget
// padding) for the running host. Used to decide dynamically how
// many activity rows we can afford to render before we blow past the
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

// Rough vertical space a rendered activity row will consume in the
// widget's outer stack, including the 6pt gap after it.
function estimateActivityRowHeight(ev, isCurrent) {
  // Only general-activity subtitles render as a note line. Session
  // `note` fields are dropped (see `activityNote`), so we don't
  // budget space for them here either.
  const hasNote = !!ev.subtitle
  const isSession = ev.type === "session"
  const hasBoth = isSession
    && (ev.onTrack || []).length > 0
    && (ev.inClass || []).length > 0

  let contentH
  if (hasBoth) contentH = 57       // on-row + spacer + divider + spacer + in-row
  else if (isSession) contentH = 20 // single pill row
  else contentH = 18                // plain activity label
  if (hasNote) contentH += 18       // note line + spacer

  // Current cards use a bigger symmetric top/bottom pad (room for
  // the marker to overlap without crowding the content) and drag a
  // caption block along right above or below the card. Non-current
  // cards are the small pad plus row-gap only. No border on either
  // (the current card lost its border so the marker line isn't
  // interrupted at the sides).
  const innerPadV = isCurrent ? CURRENT_CARD_PAD_V : NONCURRENT_CARD_PAD_V
  const captionBlock = isCurrent ? CURRENT_CAPTION_BLOCK_HEIGHT : 0
  return 2 * innerPadV + contentH + captionBlock + 6
}

// The now-line block (caption + rule + spacer) that we inject
// between cards when there is no current activity to overlap. Budgeted
// separately from card rows so the row-fit loop knows to leave
// room for it — but only in the between-cards case; when a current
// activity exists its caption is baked into its own row estimate.
const NOW_LINE_BLOCK_HEIGHT = 22
// Caption block reserved above (or below) the current card — just
// the caption text and its two small outer spacers, no rule (the
// rule is inside the card, drawn as the marker bar).
const CURRENT_CAPTION_BLOCK_HEIGHT = 21
const NONCURRENT_CARD_PAD_V = 8

// ---------- rendering ----------

function makeWidget({ manifest, stale }, parsed, notifStatus) {
  const w = new ListWidget()
  const dark = Device.isUsingDarkAppearance()
  const p = palette(dark)
  w.backgroundColor = p.bg
  w.setPadding(10, WIDGET_SIDE_PAD_LEFT, 10, WIDGET_SIDE_PAD_RIGHT)
  w.url = SITE_URL

  const picked = pickToday(manifest)
  if (!picked) {
    // Small and Medium show one event; Large up to two.
    const family = config.widgetFamily || "medium"
    const isLarge = family === "large" || family === "extraLarge"
    const upcoming = pickUpcoming(manifest, isLarge ? 2 : 1)
    const footer = statusFooterBits(stale, parsed, notifStatus).length > 0
    renderNoEvents(w, p, stale, upcoming, footer)
    drawStatusFooter(w, p, stale, parsed, notifStatus)
    w.refreshAfterDate = new Date(Date.now() + 60 * 60 * 1000)
    return w
  }

  const { event, day } = picked
  const groupById = Object.fromEntries(event.runGroups.map(g => [g.id, g]))
  const selected = (parsed && parsed.groups) || []

  const visible = day.activities.map(e => {
    if (e.type !== "session" || selected.length === 0) return e
    const onTrack = (e.onTrack || []).filter(id => selected.includes(id))
    const inClass = (e.inClass || []).filter(id => selected.includes(id))
    return { ...e, onTrack, inClass }
  }).filter(e => {
    if (e.type !== "session") return true
    if (selected.length === 0) return true
    return (e.onTrack.length > 0) || (e.inClass.length > 0)
  }).filter(e => e.type !== "break")

  const summary = paramSummary(parsed, notifStatus, event, day, manifest)
  renderHeader(w, event, day, p, stale, summary)

  // An event created in the app (#229) has no schedule until one is added.
  // Say so, as the app does, instead of drawing an empty timeline.
  if (day.activities.length === 0) {
    renderCenteredMessage(w, p, "Schedule coming soon")
    w.refreshAfterDate = new Date(Date.now() + 15 * 60 * 1000)
    return w
  }

  const now = nowMinutes()

  let currentIdx = -1
  // "above" — marker sits just above the current card (first minutes
  // of the activity). "below" — marker sits just below the current card
  // (rest of the "current" window). Null when nothing is current, in
  // which case the marker floats between the last past and next
  // future cards instead.
  let currentPosition = null
  let lastPastIdx = -1
  for (let i = 0; i < visible.length; i++) {
    if (parseMinutes(visible[i].time) <= now) lastPastIdx = i
    else break
  }
  if (lastPastIdx !== -1) {
    const start = parseMinutes(visible[lastPastIdx].time)
    const nextEv = visible[lastPastIdx + 1]
    const nextStart = nextEv
      ? parseMinutes(nextEv.time)
      : start + LAST_ACTIVITY_FALLBACK_MIN
    // Current window ends CURRENT_END_LOOKAHEAD_MIN before the next
    // activity, at which point the marker leaves the card and joins the
    // between-cards gap. The Math.max floor keeps back-to-back activities
    // (nextStart very close to start) from producing a negative
    // window that would flip the card to "not current" before it even
    // began.
    const currentEndsAt = nextEv
      ? Math.max(start, nextStart - CURRENT_END_LOOKAHEAD_MIN)
      : nextStart
    if (now < currentEndsAt) {
      currentIdx = lastPastIdx
      // Top-phase end caps at the current window's own end so a very
      // short window (activities less than TOP_PHASE_MIN apart) doesn't
      // spend its entire life in the "above" phase.
      const topPhaseEnds = Math.min(start + CURRENT_TOP_PHASE_MIN, currentEndsAt)
      currentPosition = now < topPhaseEnds ? "above" : "below"
    }
  }

  const nextIdx = visible.findIndex(e => parseMinutes(e.time) > now)
  const insertAt = nextIdx === -1 ? visible.length : nextIdx
  const nextActivity = insertAt < visible.length ? visible[insertAt] : null

  const family = config.widgetFamily || "medium"
  const isLarge = family === "large" || family === "extraLarge"
  // Absolute cap so we never render more rows than the widget can
  // ever plausibly fit, even for a run of all-simple general activities.
  const maxRowsCap = isLarge ? 10 : 4
  const anchorIdx = currentIdx !== -1 ? currentIdx : insertAt
  // Large shows exactly one past activity before the current one so the
  // current card sits at row 1 — as close to the top as it can be
  // without hiding what just happened. Medium has no room for it (#291):
  // it starts at what's on now or next, and shows the last activity
  // only once the day's are all over.
  const maxPast = isLarge || anchorIdx >= visible.length ? 1 : 0
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
  // Reserve the between-cards now-line block only when we actually
  // need one. When a current activity exists, its caption is baked into
  // its own row estimate (via CURRENT_CAPTION_BLOCK_HEIGHT), and the
  // marker bar itself is drawn inside the card so it costs no extra
  // vertical space.
  const nowLineReserve = currentIdx === -1 ? NOW_LINE_BLOCK_HEIGHT : 0
  const availableH = widgetInteriorHeight() - liveHeaderHeight(summary) - nowLineReserve
  // The past row and the anchor (current or next) always show; the
  // rows after them only while they fit.
  const mustShow = anchorIdx - start + 1
  const rows = []
  let usedH = 0
  for (let i = start; i < visible.length && rows.length < maxRowsCap; i++) {
    const isCurrent = i === currentIdx
    const rowH = estimateActivityRowHeight(visible[i], isCurrent)
    if (rows.length >= mustShow && usedH + rowH > availableH) break
    rows.push(visible[i])
    usedH += rowH
  }

  const nowLineBetweenAt = currentIdx === -1 ? insertAt - start : -1
  const currentLocalIdx = currentIdx === -1 ? -1 : currentIdx - start

  const nowLineLast = nowLineBetweenAt >= rows.length
  for (let i = 0; i < rows.length; i++) {
    if (i === nowLineBetweenAt) drawNowLine(w, p, now, nextActivity, liveTier().nowLineGap)
    const ev = rows[i]
    const isCurrentActivity = i === currentLocalIdx
    const past = !isCurrentActivity && parseMinutes(ev.time) < now
    // No gap under the last card: the flex spacer below takes over, and
    // on Medium the 6pt is needed to fit.
    const gapAfter = i < rows.length - 1 || nowLineLast
    drawActivityRow(w, ev, groupById, selected, p, past,
      isCurrentActivity ? { position: currentPosition, now, nextActivity } : null, gapAfter)
  }
  if (nowLineLast) drawNowLine(w, p, now, null, 0)

  // Flex spacer forces the widget's content stack to top-align.
  // Without it, Scriptable's ListWidget centers whatever content
  // it has vertically when it's shorter than the widget's box,
  // which showed up as awkward empty gutters above the header and
  // below the bottom card. (#291 took out the "N more activities" line
  // that sat here, and the status footer, whose news is in the header
  // now, to make room for the parameter chips.)
  w.addSpacer()

  w.refreshAfterDate = new Date(Date.now() + 60 * 1000)
  return w
}

// Shared with the countdown card's height math (see renderCountdownState)
// so it can reserve space for this footer only when it's actually
// going to render something, instead of always leaving a blank gap.
// The live view says the same in its header (see renderHeader).
function statusFooterBits(stale, parsed, notifStatus) {
  const bits = []
  if (notifStatus && notifStatus.denied) {
    bits.push({ text: "🔕 Notifications off", warn: true })
  }
  if (stale) bits.push({ text: "Cached schedule", warn: false })
  const invalid = (parsed && parsed.invalid) || []
  if (invalid.length > 0) {
    const label = invalid.length === 1 ? "Invalid parameter" : "Invalid parameters"
    bits.push({ text: `⚠ ${label}: ${invalid.join(", ")}`, warn: true })
  }
  return bits
}

function drawStatusFooter(w, p, stale, parsed, notifStatus) {
  const bits = statusFooterBits(stale, parsed, notifStatus)
  if (bits.length === 0) return
  w.addSpacer(2)
  const row = w.addStack()
  row.centerAlignContent()
  row.addSpacer()
  for (let i = 0; i < bits.length; i++) {
    if (i > 0) {
      const dot = row.addText(" · ")
      dot.font = rFont(9)
      dot.textColor = p.muted
    }
    const el = row.addText(bits[i].text)
    el.font = rFont(9)
    el.textColor = bits[i].warn ? WARN_COLOR : p.muted
  }
  row.addSpacer()
}

// ----- now-marker sizing -----
// Declared before the current-card constants below because
// MARKER_CONTENT_CLEARANCE reads NOW_LINE_DOT_DIAMETER in its
// initializer. Top-level `const` declarations are in the temporal
// dead zone until their own line runs, so referencing a `const`
// declared later in the file throws at load time (that was the
// "ReferenceError: Cannot access uninitialized variable" this
// widget hit before this section moved up here).
const NOW_LINE_DOT_DIAMETER = 8
const NOW_LINE_BAR_HEIGHT = 2

// ----- current-card layout constants -----

// Symmetric top/bottom padding on the current card. Big enough to
// hold the now-marker bar in the card's straight-sides zone (past
// the rounded corners) AND leave breathing room to the content
// underneath it. Both top and bottom use the same value so the card
// doesn't visibly change shape when the marker flips from top to
// bottom — the empty side still consumes the same pad, and the
// content stays vertically centered. (On Large. Medium, short of
// room, pads only the marker's side this much — see LIVE_TIERS.)
// Distance from the marker row's outer edge to the nearest card
// edge (5pt). Chosen so the bar lands past the corner radius (8pt)
// — the 8pt-tall marker row starts at y=5 with the 2pt bar centered
// at y=8-10, safely in the straight-sides zone of the card.
const MARKER_ROW_INSET = 5
// Distance from the marker row's inner edge to the content. Set
// equal to MARKER_ROW_INSET so the visible gap above the marker
// (MARKER_CONTENT_CLEARANCE + 3pt bar-to-row-top) matches the
// visible gap below (3pt bar-to-row-bottom + MARKER_ROW_INSET).
// This was the "padding above marker is too much" bug — MCC used
// to be 2pt while MRI was 5pt, so the visible gaps differed by
// 3pt AND the fixed-height contentBlock added slack on top of
// that.
const MARKER_CONTENT_CLEARANCE = MARKER_ROW_INSET
// Total vertical pad on each side of the card. Absolute — same
// whether the marker is on this side or not — so content position
// is deterministic and the card doesn't shift when the marker
// flips.
const CURRENT_CARD_PAD_V =
  MARKER_ROW_INSET + NOW_LINE_DOT_DIAMETER + MARKER_CONTENT_CLEARANCE
const CURRENT_CARD_CORNER_RADIUS = 8
// Space between the current card and its caption ("3:08 AM · Next
// in 3h 22m") on the outside — matches the pre-#77 spacing so the
// caption reads as a footer/header for the card.
const CURRENT_CAPTION_OUTER_PAD = 4

// ----- live view header (#291) -----
//
// The date and the event's name on one line, as the upcoming view has
// them — the red month, the day, a red bar, then the name at the
// countdown's title size (COUNTDOWN_TOKENS, the same numbers, not a
// copy) — and under it, when the widget's parameter changes the view,
// a row of chips saying how: the run groups it's filtered to, a
// warning for any of them with no sessions today, and the alert lead
// time when it isn't the default, or that alerts are off. Filters sit
// above the schedule in the app too. Offline, the line ends in
// "Offline", as the old header's day did; the view has no status
// footer (a Medium couldn't fit one under a two-row card).
const LIVE_HEADER = {
  dayGap: 3, barW: 2, barH: 14, barGap: 6,
  chipFont: 10, chipPadV: 3, chipPadH: 7, chipSpacing: 4,
  dotSize: 6, dotGap: 4, iconGap: 3,
  // For the row-fit budget: the header line and the chip row.
  lineH: 18, chipsH: 19,
}

// The spacing that depends on the widget's size, one row per size.
// Medium has room for one card: less air under the header and the
// now-line, and the current card padded for the now-marker only on the
// marker's side (the other side as a plain card's), so a two-row
// session card, its caption and the chips all fit under the header.
const LIVE_TIERS = {
  compact: { chipsGap: 5, gapBelow: 6, nowLineGap: 4, currentOffPad: NONCURRENT_CARD_PAD_V },
  large: { chipsGap: 7, gapBelow: 14, nowLineGap: 6, currentOffPad: CURRENT_CARD_PAD_V },
}

function liveTier() {
  const family = config.widgetFamily || "medium"
  return family === "large" || family === "extraLarge" ? LIVE_TIERS.large : LIVE_TIERS.compact
}

function liveHeaderHeight(summary) {
  const t = LIVE_HEADER
  const tier = liveTier()
  return t.lineH + (summary ? tier.chipsGap + t.chipsH : 0) + tier.gapBelow
}

function renderHeader(w, event, day, p, stale, summary) {
  const t = LIVE_HEADER
  const tier = liveTier()
  const c = COUNTDOWN_TOKENS.large
  const outer = w.addStack()
  outer.spacing = 0
  outer.addSpacer(LEFT_GUTTER_WIDTH)
  const row = outer.addStack()
  row.centerAlignContent()

  const [, m, d] = day.date.split("-").map(Number)
  const month = row.addText(MONTH_ABBR[m - 1])
  month.font = rMediumFont(c.monthFont)
  month.textColor = p.brand
  month.lineLimit = 1
  row.addSpacer(t.dayGap)
  const dayNum = row.addText(String(d))
  dayNum.font = rSemiboldFont(c.titleFont)
  dayNum.textColor = p.fg
  dayNum.lineLimit = 1

  row.addSpacer(t.barGap)
  const bar = row.addStack()
  bar.size = new Size(t.barW, t.barH)
  bar.backgroundColor = p.brand
  bar.cornerRadius = 1
  row.addSpacer(t.barGap)

  // The name is the one thing on the line that truncates.
  const title = row.addText(event.name)
  title.font = rSemiboldFont(c.titleFont)
  title.textColor = p.fg
  title.lineLimit = 1
  row.addSpacer()
  if (stale) addLiveText(row, "Offline", rFont(t.chipFont), p.muted)

  outer.addSpacer(RIGHT_GUTTER_WIDTH)
  if (summary) {
    w.addSpacer(tier.chipsGap)
    drawParamChips(w, p, summary)
  }
  w.addSpacer(tier.gapBelow)
}

function drawParamChips(w, p, s) {
  const t = LIVE_HEADER
  const outer = w.addStack()
  outer.addSpacer(LEFT_GUTTER_WIDTH)
  const row = outer.addStack()
  row.centerAlignContent()
  row.spacing = t.chipSpacing

  // A chip per group, each with one text: an HStack offers its children
  // equal shares, least flexible first, so a chip holding two names
  // could be squeezed to "Ora…" / "Pur…" with room to spare. Small
  // chips each take what they need and pass the rest on.
  for (const g of s.groups) {
    const chip = addParamChip(row, p.chipBg)
    const dot = chip.addStack()
    dot.size = new Size(t.dotSize, t.dotSize)
    dot.cornerRadius = t.dotSize / 2
    dot.backgroundColor = new Color(g.color)
    chip.addSpacer(t.dotGap)
    addLiveText(chip, g.label, rMediumFont(t.chipFont), p.fg)
  }
  if (s.missing.length > 0) {
    const chip = addParamChip(row, p.brandTint)
    addChipSymbol(chip, "exclamationmark.triangle", WARN_COLOR)
    chip.addSpacer(t.iconGap)
    const names = s.missing.map(g => g.label).join(" or ")
    addLiveText(chip, `No ${names} today`, rMediumFont(t.chipFont), WARN_COLOR)
  }
  if (s.invalid.length > 0) {
    const chip = addParamChip(row, p.brandTint)
    addChipSymbol(chip, "exclamationmark.triangle", WARN_COLOR)
    chip.addSpacer(t.iconGap)
    const label = s.invalid.length === 1 ? "Invalid parameter" : "Invalid parameters"
    addLiveText(chip, `${label}: ${s.invalid.join(", ")}`, rMediumFont(t.chipFont), WARN_COLOR)
  }
  if (s.notifsOff) {
    const chip = addParamChip(row, p.brandTint)
    addChipSymbol(chip, "bell.slash", WARN_COLOR)
    chip.addSpacer(t.iconGap)
    addLiveText(chip, "Notifications off", rMediumFont(t.chipFont), WARN_COLOR)
  } else if (s.lead != null) {
    const chip = addParamChip(row, p.chipBg)
    addChipSymbol(chip, "bell", p.mutedStrong)
    chip.addSpacer(t.iconGap)
    const text = s.lead === 0 ? "At start" : `${s.lead}m`
    addLiveText(chip, text, rFont(t.chipFont), p.mutedStrong)
  }

  outer.addSpacer()
  outer.addSpacer(RIGHT_GUTTER_WIDTH)
}

function addParamChip(row, bg) {
  const t = LIVE_HEADER
  const chip = row.addStack()
  chip.centerAlignContent()
  chip.backgroundColor = bg
  chip.cornerRadius = 100
  chip.setPadding(t.chipPadV, t.chipPadH, t.chipPadV, t.chipPadH)
  return chip
}

function addChipSymbol(chip, name, color) {
  if (typeof SFSymbol === "undefined") return
  const sym = SFSymbol.named(name)
  if (!sym) return
  const img = chip.addImage(sym.image)
  img.imageSize = new Size(LIVE_HEADER.chipFont, LIVE_HEADER.chipFont)
  img.tintColor = color
}

function addLiveText(stack, text, font, color) {
  const el = stack.addText(text)
  el.font = font
  el.textColor = color
  el.lineLimit = 1
}

function activityNote(ev) {
  // Only general-activity subtitles surface in the widget. Session
  // `note` fields are intentionally dropped — a session card is
  // already carrying a time + on-track pills + in-class pills, and
  // adding a note line pushes the whole card taller than it needs
  // to be.
  return ev.subtitle || null
}

const NONCURRENT_CARD_CORNER_RADIUS = 14

// ----- widget-level padding -----
//
// Left side: WIDGET_SIDE_PAD_LEFT is the gap between the widget's
// own left edge and the marker dot itself. LEFT_GUTTER_WIDTH is
// the gap between the widget's content-start and the card's left
// edge — the dot lives inside that gutter with the 4pt gap
// between it and the card baked in (dot 8pt + 4pt = 12pt gutter).
// Together that gives 4pt from widget left → dot → 4pt gap →
// card, which is what issue #77 asked for.
//
// Right side: widget's right padding stays at 0 and the right
// gutter absorbs the visual right margin. That lets the now-line's
// blue bar extend all the way to the widget's right edge instead
// of stopping short at the card's right border.
const WIDGET_SIDE_PAD_LEFT = 4
const WIDGET_SIDE_PAD_RIGHT = 0
const LEFT_GUTTER_WIDTH = NOW_LINE_DOT_DIAMETER + 4   // dot + 4pt gap
const RIGHT_GUTTER_WIDTH = 16

const CARD_INNER_PAD_H = 12

// Horizontal gap between the time column and the info block —
// bigger than the default 8pt so the time isn't crammed up
// against the "On track" text.
const TIME_INFO_SPACING = 14

// Unified column widths so every row's time and section labels line
// up at the same x whether the row is the current card or a plain
// activity row. Widened from 60 to fit the small AM/PM suffix next to
// the time.
const TIME_COLUMN_WIDTH = 68
// Wide enough for "On track" plus a few characters of breathing
// room at the current 12pt rounded font size, so the labels never
// truncate: SF Symbol icon (14pt) + 8pt gap + label text
// ("On track" ~55pt) + 20-ish pt of margin ≈ 100pt.
const LABEL_COLUMN_WIDTH = 100

// Icon + gap used in front of the "Lunch" / "special" label, sized
// to match the on-track/in-class section icons so every row's icon
// reads at the same visual weight.
const FOOD_ICON_SIZE = 14
const FOOD_ICON_GAP = 8

// Fine-tune knob for the AM/PM-to-time baseline alignment — see
// addTimeColumn. Bump this up/down if AM/PM still looks off after a
// font or size change.
const AMPM_BASELINE_NUDGE = 1

function drawActivityRow(w, ev, groupById, selected, p, past, current, gapAfter) {
  // "Above": the marker overlaps the TOP straight-sides zone of the
  // current card; the caption ("3:08 AM · Next in 3h 22m") sits
  // just above the card.
  if (current && current.position === "above") {
    w.addSpacer(CURRENT_CAPTION_OUTER_PAD)
    drawNowCaption(w, p, current.now, current.nextActivity)
    w.addSpacer(3)
  }

  // Three-column outerRow: leftGutter (dot in negative space) |
  // cardContainer (card with the bar embedded inside its interior
  // at the marker row's y) | rightGutter (bar continuation in
  // negative space). Scriptable can't do true overlays, so this
  // stack composition is what makes the marker LOOK like one line
  // crossing over the card.
  const outerRow = w.addStack()
  outerRow.spacing = 0

  // Align outerRow's children to the same edge the marker sits on.
  // Both the card's embedded marker and the gutter's dot/bar are
  // placed at a fixed MARKER_ROW_INSET from that edge, so when both
  // columns are aligned to the same edge the two lands at the same
  // y — no flex spacer needed, no dependence on knowing the card's
  // natural height. This is what fixes the "dot floats below the
  // bar" bug: a flex spacer in a shorter vertical child of a
  // horizontal parent does NOT auto-stretch to the tallest
  // sibling's height in Scriptable, so the old gutter stayed 13pt
  // at the top of the row while the bar sat much lower in the card.
  if (current && current.position === "below") {
    outerRow.bottomAlignContent()
  } else {
    outerRow.topAlignContent()
  }

  const leftGutter = outerRow.addStack()
  leftGutter.layoutVertically()
  leftGutter.topAlignContent()
  leftGutter.size = new Size(LEFT_GUTTER_WIDTH, 0)

  const cardContainer = outerRow.addStack()

  const rightGutter = outerRow.addStack()
  rightGutter.layoutVertically()
  rightGutter.topAlignContent()
  rightGutter.size = new Size(RIGHT_GUTTER_WIDTH, 0)

  if (current) {
    drawCurrentCard(cardContainer, leftGutter, rightGutter,
      ev, groupById, selected, p, past, current.position)
  } else {
    drawNonCurrentCard(cardContainer, ev, groupById, selected, p, past)
    // Gutters stay empty — they auto-size to 0 height and take up no
    // vertical space, so the non-current row is as compact as before.
  }

  // "Below": the marker overlaps the BOTTOM zone of the card; the
  // caption sits just below.
  if (current && current.position === "below") {
    w.addSpacer(3)
    drawNowCaption(w, p, current.now, current.nextActivity)
    w.addSpacer(CURRENT_CAPTION_OUTER_PAD)
  }
  if (gapAfter) w.addSpacer(6)
}

// Three-column current card. The card interior manually stacks
// [top pad zone] + [fixed-height content block] + [bottom pad zone];
// one of the two pad zones carries the marker bar, the other is
// just a spacer of the same height (that's the "symmetric padding"
// promise — content stays put regardless of marker position). The
// left and right gutters are filled with pre-computed spacer heights
// that put a dot / bar-continuation at exactly the same y as the
// bar inside the card, faking the overlay.
//
// NO BORDER on the current card. Any 1pt border strip along the
// card's left and right edges would show through as
// currentCardBorder color where the horizontal marker meets it —
// interrupting the continuous accent-blue line that reads as one
// mark crossing the card. The tinted background (currentCardBg) is
// enough to distinguish this card as current, especially with the
// marker crossing it.
function drawCurrentCard(cardContainer, leftGutter, rightGutter,
    ev, groupById, selected, p, past, position) {
  const markerAtTop = position === "above"

  cardContainer.layoutVertically()
  cardContainer.topAlignContent()
  cardContainer.backgroundColor = p.currentCardBg
  cardContainer.cornerRadius = CURRENT_CARD_CORNER_RADIUS

  // Top pad zone. Absolute — either the marker + its clearance
  // (both sum to CURRENT_CARD_PAD_V) or a plain spacer of the same
  // height. Same either way, so the content below sits at the exact
  // same y regardless of where the marker is.
  // Medium pads the side without the marker as a plain card (see
  // LIVE_TIERS), so there the content moves when the marker flips.
  const offPad = liveTier().currentOffPad
  if (markerAtTop) {
    cardContainer.addSpacer(MARKER_ROW_INSET)
    addBarInCard(cardContainer, p.accent)
    cardContainer.addSpacer(MARKER_CONTENT_CLEARANCE)
  } else {
    cardContainer.addSpacer(offPad)
  }

  // Content grows to its natural height — no fixed-height wrapper.
  // The fixed wrapper we had before ate the "above marker" gap with
  // top-aligned slack; now the content is exactly as tall as it
  // wants, and the pad zones above/below are absolute constants.
  const contentBlock = cardContainer.addStack()
  contentBlock.setPadding(0, CARD_INNER_PAD_H, 0, CARD_INNER_PAD_H)
  buildCardContent(contentBlock, ev, groupById, selected, p, past, true)

  // Bottom pad zone — mirror of top.
  if (!markerAtTop) {
    cardContainer.addSpacer(MARKER_CONTENT_CLEARANCE)
    addBarInCard(cardContainer, p.accent)
    cardContainer.addSpacer(MARKER_ROW_INSET)
  } else {
    cardContainer.addSpacer(offPad)
  }

  // Gutter columns place the dot / bar-continuation at exactly the
  // same y as the bar embedded in the card. Since content height is
  // no longer a fixed constant, the gutter columns use a flex
  // spacer on the empty side to auto-fill to the card's natural
  // height. Flex is limited to the gutter — it does NOT touch
  // content position inside the card.
  addGutterMarkerColumn(leftGutter, markerAtTop, "dot", p.accent)
  addGutterMarkerColumn(rightGutter, markerAtTop, "bar", p.accent)
}

function drawNonCurrentCard(cardContainer, ev, groupById, selected, p, past) {
  // No border. Non-current cards are just tinted (light gray on
  // white) rounded rectangles, matching the current card's
  // border-less look so the whole widget reads as one system.
  cardContainer.backgroundColor = p.cardBg
  cardContainer.cornerRadius = NONCURRENT_CARD_CORNER_RADIUS
  cardContainer.setPadding(
    NONCURRENT_CARD_PAD_V, CARD_INNER_PAD_H,
    NONCURRENT_CARD_PAD_V, CARD_INNER_PAD_H,
  )
  buildCardContent(cardContainer, ev, groupById, selected, p, past, false)
}

// Bar drawn inside the current card, at the top or bottom pad zone.
// Sits in an 8pt-tall row (matches NOW_LINE_DOT_DIAMETER so its y
// aligns with the dot in the gutter) with a 2pt bar centered
// vertically inside.
function addBarInCard(card, color) {
  const row = card.addStack()
  row.size = new Size(0, NOW_LINE_DOT_DIAMETER)
  row.centerAlignContent()
  const bar = row.addStack()
  bar.backgroundColor = color
  bar.size = new Size(0, NOW_LINE_BAR_HEIGHT)
  bar.addSpacer()
}

// One of the two negative-space gutter columns. Places the dot or
// the bar continuation at MARKER_ROW_INSET from the row's aligned
// edge — matching the same fixed distance the marker sits from
// that edge inside the card. drawActivityRow sets outerRow's
// topAlignContent()/bottomAlignContent() so both this column and
// cardContainer align to the same edge, which is what makes the
// dot land at the exact y as the embedded bar. Fully absolute:
// spacers here are constants, no flex.
function addGutterMarkerColumn(col, markerAtTop, elementType, color) {
  if (markerAtTop) {
    col.addSpacer(MARKER_ROW_INSET)
    addGutterMarkerElement(col, elementType, color)
  } else {
    addGutterMarkerElement(col, elementType, color)
    col.addSpacer(MARKER_ROW_INSET)
  }
}

function addGutterMarkerElement(col, elementType, color) {
  const row = col.addStack()
  row.size = new Size(0, NOW_LINE_DOT_DIAMETER)
  row.centerAlignContent()
  if (elementType === "dot") {
    // Dot pinned to the leading edge of the gutter (widget-left side),
    // then a thin bar segment fills the remaining gutter width right
    // up to the card. Two things at once:
    //  - the dot still sits 4pt away from the card's own left edge
    //    (dot 8pt + trailing bar 4pt = 12pt = LEFT_GUTTER_WIDTH), so
    //    it isn't squashed against the card — that's what issue #67
    //    was about;
    //  - and the dot no longer looks disconnected from the horizontal
    //    line inside the card, because the bar segment bridges the
    //    gap. The dot reads as a bulb with a thin tail leading into
    //    the card's marker line, not a dot marooned in whitespace
    //    (#77's complaint after the border fix).
    const dot = row.addStack()
    dot.size = new Size(NOW_LINE_DOT_DIAMETER, NOW_LINE_DOT_DIAMETER)
    dot.backgroundColor = color
    dot.cornerRadius = NOW_LINE_DOT_DIAMETER / 2
    const bridge = row.addStack()
    bridge.backgroundColor = color
    bridge.size = new Size(0, NOW_LINE_BAR_HEIGHT)
    bridge.addSpacer()
  } else {
    const bar = row.addStack()
    bar.backgroundColor = color
    bar.size = new Size(0, NOW_LINE_BAR_HEIGHT)
    bar.addSpacer()
  }
}

// Card interior. Builds either a single main row [time | info] or,
// when the activity carries a note or subtitle, a vertical layout with
// the main row on top and the note line below.
function buildCardContent(container, ev, groupById, selected, p, past, current) {
  const note = activityNote(ev)
  // Stacked sessions (both on-track and in-class rows) top-align
  // the time column with the "On track" row instead of centering
  // it between the two rows, so the eye doesn't have to hunt for
  // the time in the vertical middle of a two-row card.
  const stacked = ev.type === "session"
    && (ev.onTrack || []).length > 0
    && (ev.inClass || []).length > 0

  if (note) {
    container.layoutVertically()
    container.topAlignContent()
    const mainRow = container.addStack()
    if (stacked) mainRow.topAlignContent()
    else mainRow.centerAlignContent()
    mainRow.spacing = TIME_INFO_SPACING
    buildMainContent(mainRow, ev, groupById, selected, p, past, current)
    container.addSpacer(3)
    // Lunch rows carry a leading icon before the label, so the note
    // needs the extra indent to land under the label text itself —
    // matching how the web app aligns the subtitle under the title,
    // not under the icon badge. Special rows have no icon.
    const hasIcon = ev.type === "lunch"
    const noteIndent = TIME_COLUMN_WIDTH + TIME_INFO_SPACING
      + (hasIcon ? FOOD_ICON_SIZE + FOOD_ICON_GAP : 0)
    addNoteRow(container, note, p, past, current, noteIndent)
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
      // A VStack's real default cross-axis alignment is CENTER, not
      // leading — the "On track" and "In class" rows only look
      // left-aligned by coincidence when they happen to render the
      // same width (same pill count/label length); an explicit call
      // is required, not a comment claiming a default that isn't real.
      infoBlock.topAlignContent()

      addSectionRow(infoBlock, "On track", "car", onTrack, selected, p, past, current)
      infoBlock.addSpacer(current ? 6 : 8)
      addRowDivider(infoBlock, p)
      infoBlock.addSpacer(current ? 6 : 8)
      addSectionRow(infoBlock, "In class", "graduationcap", inClass, selected, p, past, current)
      // No mainRow.addSpacer() here — the divider inside infoBlock
      // uses its own addSpacer to stretch full width, which cascades
      // out and makes cardContainer fill the widget width.
    } else if (onTrack.length) {
      // Trailing flex spacer stretches the CARDCONTAINER to the
      // widget's full width, so the card doesn't visibly shrink to
      // its natural content width (time + label + pill). Safe now
      // that addSectionRow no longer carries its own trailing flex
      // spacer — only this ONE flex sits in the horizontal chain,
      // so the pill inside gets its full natural width (no double-
      // flex competition that would truncate the label).
      addSectionRow(mainRow, "On track", "car", onTrack, selected, p, past, current)
      mainRow.addSpacer()
    } else if (inClass.length) {
      addSectionRow(mainRow, "In class", "graduationcap", inClass, selected, p, past, current)
      mainRow.addSpacer()
    }
  } else {
    const isFood = ev.type === "lunch" || ev.type === "special"
    const hasIcon = ev.type === "lunch"
    if (hasIcon) {
      // Icon + label share their own tight-spaced row so mainRow's
      // wider TIME_INFO_SPACING only applies once, between the time
      // column and this block — matching how the on-track/in-class
      // icon columns are laid out.
      const foodRow = mainRow.addStack()
      foodRow.centerAlignContent()
      foodRow.spacing = FOOD_ICON_GAP
      addFoodIcon(foodRow, p, past)
      addFoodLabel(foodRow, ev.label, p, past, true)
    } else {
      addFoodLabel(mainRow, ev.label, p, past, isFood)
    }
    mainRow.addSpacer()
  }
}

// SF Symbol for the lunch row — fork.knife mirrors the web app's
// Utensils icon. Same tint/size/opacity treatment as the on-track/
// in-class section icons. Special activities render with no icon at all.
function addFoodIcon(row, p, past) {
  if (typeof SFSymbol === "undefined") return
  const sym = SFSymbol.named("fork.knife")
  if (!sym) return
  const img = row.addImage(sym.image)
  img.imageSize = new Size(FOOD_ICON_SIZE, FOOD_ICON_SIZE)
  img.tintColor = p.fg
  if (past) img.imageOpacity = p.pastOpacity
}

function addFoodLabel(row, text, p, past, bold) {
  const label = row.addText(text)
  // Same font on current and non-current — the border and
  // background do the emphasising, not the type.
  label.font = bold ? rBoldFont(12) : rMediumFont(12)
  label.textColor = p.fg
  label.lineLimit = 1
  if (past) label.textOpacity = p.pastOpacity
}

function addTimeColumn(row, hhmm, p, past, current, topAlign) {
  const timeCol = row.addStack()
  timeCol.size = new Size(TIME_COLUMN_WIDTH, 0)
  // Stacked-session cards top-align the time with the "On track"
  // row so the eye doesn't have to hunt for the time in the
  // vertical middle of a two-row card.
  if (topAlign) timeCol.topAlignContent()
  else timeCol.centerAlignContent()

  // Scriptable stacks only offer top/center/bottom cross-axis
  // alignment, no true text baseline. A flush bottom-edge alignment
  // between the two font sizes isn't quite right either: a smaller
  // font's descent is proportionally smaller than the time's, so
  // its baseline ends up sitting BELOW the time's baseline once
  // their box bottoms are flush. AMPM_BASELINE_NUDGE compensates by
  // giving the AM/PM text a bit of padding below it, so its box —
  // not the glyph itself — reaches all the way down to the shared
  // bottom edge.
  const timeRow = timeCol.addStack()
  timeRow.bottomAlignContent()
  // +2 over the base 2pt gap shifts the AM/PM text right.
  timeRow.spacing = 4

  const time = timeRow.addText(formatTime12(hhmm))
  // Bold on the current card so the time carries the "this is now"
  // signal too, not just the card's border/tinted background.
  time.font = current ? rBoldFont(14) : rMediumFont(14)
  time.textColor = p.fg
  time.lineLimit = 1
  if (past) time.textOpacity = p.pastOpacity

  // AM/PM suffix — smaller and muted so it reads as a qualifier,
  // not part of the time itself.
  const ampmBox = timeRow.addStack()
  ampmBox.layoutVertically()
  ampmBox.topAlignContent()
  const ampm = ampmBox.addText(formatAmPm(hhmm))
  ampm.font = rFont(9)
  ampm.textColor = p.mutedStrong
  ampm.lineLimit = 1
  if (past) ampm.textOpacity = p.pastOpacity
  ampmBox.addSpacer(AMPM_BASELINE_NUDGE)

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
  // No trailing flex spacer here. When the outer mainRow ALSO had
  // a flex spacer (for session cards), the two competed and shared
  // the extra horizontal space equally — which starved the section
  // row of the pt or two it needed for the pill to be its natural
  // width, and the pill's label truncated ("Oran…"). The row now
  // grows only to its natural width (label col + pills); the caller's
  // infoBlock.topAlignContent() (buildMainContent) is what actually
  // keeps this row left-aligned against its sibling — a VStack's real
  // default cross-axis alignment is center, not leading.
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
  // Dynamic-stretch pattern: a horizontal-layout stack (Scriptable
  // stacks are horizontal by default) containing only a flex
  // spacer expands to fill the parent's remaining horizontal
  // width. Same trick the now-line bar and pill rows already use
  // successfully elsewhere in this file. This replaces the old
  // fixed-DIVIDER_WIDTH computed from a screen-size lookup table
  // that was always either too short (undershooting on Pro Max)
  // or too long (overshooting on smaller phones) — the root cause
  // of the "divider doesn't reach the right edge" complaints in
  // #71 and #77.
  const line = col.addStack()
  line.backgroundColor = p.divider
  line.size = new Size(0, 1)
  line.addSpacer()
}

// Small muted note / subtitle line beneath the main content row.
// Indented past the time column (and, for food rows, past the icon
// too) so it aligns with the label above it — reads as belonging to
// the activity, not the widget.
function addNoteRow(container, note, p, past, current, indent) {
  const row = container.addStack()
  row.addSpacer(indent)
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
  // Top/bottom padding is 2pt more than the sides (issue #4) — the
  // rounded pill otherwise looks visually tighter top-to-bottom than
  // side-to-side.
  pill.setPadding(4, 8, 4, 8)
  pill.centerAlignContent()
  const label = pill.addText(g.label)
  label.font = rMediumFont(10)
  // Pill text stays fully opaque even when the pill is dimmed
  // (past activity / not-in-selected-groups) — the background alpha
  // already carries the "dimmed" signal, and fading the text on
  // top makes the label unreadable. Matches the web app.
  label.textColor = new Color("#ffffff")
  // Force single-line so the pill hugs the full text width. Without
  // this, Scriptable treats the text as multi-line-wrappable and its
  // ideal width collapses to one character, which lets the row's
  // trailing flex spacer eat the space — the pill then either
  // truncates ("Oran…") or, when there is vertical room, wraps to a
  // second line. Neither is what we want.
  label.lineLimit = 1
}

function drawNowCaption(w, p, now, nextActivity) {
  const outer = w.addStack()
  outer.spacing = 0
  outer.addSpacer(LEFT_GUTTER_WIDTH + CARD_INNER_PAD_H)
  const row = outer.addStack()
  row.centerAlignContent()

  const time = row.addText(nowHM().toUpperCase())
  time.font = rMediumFont(10)
  time.textColor = p.accent

  row.addSpacer()

  if (nextActivity) {
    const min = parseMinutes(nextActivity.time) - now
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

function drawNowLine(w, p, now, nextActivity, belowSpacer) {
  drawNowCaption(w, p, now, nextActivity)
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

function renderNoEvents(w, p, stale, upcoming, footer) {
  if (!upcoming || upcoming.items.length === 0) {
    renderZeroState(w, p)
    return
  }
  renderCountdownState(w, p, upcoming, footer)
}

// True zero state — nothing scheduled today AND no future event either.
// Uses the SAME countdown-view header (`renderUpcomingHeader`) as the
// populated countdown, so this state reads as part of the same view
// instead of a separate "HPDE" screen — Small says "Next HPDE",
// Medium says "Upcoming HPDE events", Large gets the badge + subtitle.
// Message centers in whatever height is left below the header,
// matching the AA/Podcasts/Umami-style empty states this was designed
// against.
function renderZeroState(w, p) {
  renderUpcomingHeader(w, p, config.widgetFamily || "medium")
  renderCenteredMessage(w, p, "No upcoming events")
}

// Center the message vertically in the interior below the header:
// one flex spacer above, one flex spacer below, message in the
// middle. Horizontally centered inside its own row via left+right
// flex spacers, since there's no card underneath to line it up with.
function renderCenteredMessage(w, p, text) {
  const family = config.widgetFamily || "medium"
  w.addSpacer()
  const row = w.addStack()
  row.addSpacer()
  const msg = row.addText(text)
  msg.font = rFont(family === "small" ? 12 : 14)
  msg.textColor = p.muted
  msg.lineLimit = 1
  row.addSpacer()
  w.addSpacer()
}

function pluralize(n, word) {
  return n === 1 ? word : `${word}s`
}

// Whole days between today and the given ISO date (always positive
// here — pickUpcoming only returns days strictly after today).
function daysUntil(iso) {
  const [y, m, d] = iso.split("-").map(Number)
  const target = new Date(y, m - 1, d)
  const today = new Date()
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return Math.round((target - todayStart) / (24 * 60 * 60 * 1000))
}

// There's no event today, but a future one is scheduled — show the
// app's featured event card instead of a plain "Next: <name>" line
// (#204): the red month over the day, the name and its details beside
// a red bar, and a red "in 9 days" badge, over the track's shape.

// ----- how the countdown view is laid out, and why -----
//
// Scriptable stacks are SwiftUI stacks, and a row divides its width the
// SwiftUI way (#204 — reproduced by scripts/widget-preview.mjs's
// allocateHStack): fixed-size children first, then every other child is
// offered an EQUAL SHARE of what's left, least flexible first, and
// addSpacer()s only get what's left after that. Two rules follow, and
// every stack in this view keeps to them:
//
//   1. No width is computed for a particular phone. Widget sizes differ
//      by up to 43pt between phones (321pt on an SE, 329pt on the
//      owner's 375×812 phone, 364pt on a Pro Max); an info column sized
//      228pt "because the card is 332pt wide" left the countdown well
//      25pt on the owner's phone, so it read "•••" / "DAY…". Explicit
//      widths here are only small, content-sized constants (Large's
//      date column, the red bar).
//   2. At most one child in a row can truncate. The info column is the
//      only flexible child of an event row (Large's date column is
//      pinned to a fixed width by a strut, see addFeaturedDate), so it gets all the
//      width left and its lineLimit=1 texts truncate only when they
//      truly don't fit. A row with two stretchy things beside a text —
//      the old "line · N more upcoming · line" footer — gives the text
//      a third, which is why that footer read "1 more upcoming…".
//
// Stretching to the full width uses a trailing addSpacer(), which
// yields to text, never a flexible sibling view.

// ----- countdown/upcoming-events design tokens -----
//
// Every element in this view shares ONE tier table instead of each
// function hand-tuning its own font/spacing/margin per size — a shared
// table makes the "header misaligned from the cards below it" class of
// bug (#180 follow-ups) impossible to reintroduce, because there's only
// one place to change a tier's spacing.
//
// The zero state's header keeps the widget's margin:
const COUNTDOWN_MARGIN = 8       // outer left/right margin — header AND cards

const COUNTDOWN_TOKENS = {
  // The Small and Medium featured card (renderFeaturedCountdown), from
  // their Figma designs (HPDE file, nodes 2068:7908 and 2069:8111), where
  // the 155pt-tall widgets are 392px: 16pt in from every edge, and less
  // top and bottom when a status line (e.g. "Cached schedule") has to
  // fit under the badge. The name and organizer center on a
  // `barH`-tall red bar.
  featured: {
    pad: 16, padWithFooter: 10,
    monthFont: 13, dayFont: 29, dateGap: 5,
    barW: 2, barH: 40, barGap: 6,
    titleFont: 13.5, rowFont: 12.5, rowGap: 4,
    pillFont: 12, pillPadV: 2.5, pillPadH: 7,
  },
  // Large (renderLargeCountdown), same type and badge, from its designs
  // (2069:8015, 2069:8027). The date is a `dateColW` column, so names
  // line up across events whatever the date; the bar runs beside
  // three lines. With one event, `headerGap` and `badgeGap` space the
  // header, badge and event; with more, each event's badge sits
  // `badgeTop` under it, in line with the bar.
  large: {
    pad: 16, padWithFooter: 10,
    headerFont: 12.5, flagWidth: 25, headerGap: 12, badgeGap: 42, badgeTop: 11.5,
    monthFont: 13, dayFont: 29, dateColW: 45,
    barW: 2, barH: 56, barGap: 6,
    titleFont: 13.5, rowFont: 12.5, rowGap: 3,
    pillFont: 12, pillPadV: 2.5, pillPadH: 7,
    footerFont: 12.5,
  },
}

// ----- the app's checkered flag -----
//
// src/assets/checkered-flag.svg — the flag the app shows for "No more
// events today" and for a track with no icon — path for path (a test
// keeps the two identical). A widget can't show an SVG, so it's drawn
// with Scriptable's DrawContext, in the text color (black on light).
const CHECKERED_FLAG_VIEWBOX = [430, 373]
const CHECKERED_FLAG_PATHS = [
  "M108 43 208 42 C216 42 220 46 217 53 L192 118 C185 134 172 139 153 140 L65 144 C55 145 52 141 55 135 L87 57 C92 47 99 43 108 43 Z",
  "M216 122 316 119 C326 118 328 121 325 130 L302 190 C296 207 283 213 262 214 L167 217 C157 218 155 215 159 207 L185 138 C190 127 200 123 216 122 Z",
  "M62 218 150 216 C157 215 159 219 156 225 L128 294 C124 304 114 309 105 309 L22 309 C16 309 14 306 17 298 L45 230 C48 222 53 218 62 218 Z",
  "M319 200 412 197 C421 197 425 200 422 210 L391 292 C386 305 377 309 367 309 L268 309 C259 309 256 306 259 299 L290 218 C295 206 304 201 319 200 Z",
]

// Absolute M / L / C / H / V / Z only — all the flag and the track
// shapes use. Coordinate pairs after an M are lines, as in SVG. The
// drawing is the SVG's (ox, oy) corner onward, times `scale`.
const SVG_ARG_COUNT = { M: 2, L: 2, C: 6, H: 1, V: 1 }
function svgPathToPath(d, scale, ox = 0, oy = 0) {
  const path = new Path()
  const tokens = d.match(/[MLCHVZ]|-?\d*\.?\d+/g) || []
  const pt = (px, py) => new Point((px - ox) * scale, (py - oy) * scale)
  let cmd = null
  let x = 0
  let y = 0
  let i = 0
  while (i < tokens.length) {
    if (/[MLCHVZ]/.test(tokens[i])) {
      cmd = tokens[i++]
      if (cmd === "Z") path.closeSubpath()
      continue
    }
    const n = tokens.slice(i, i + SVG_ARG_COUNT[cmd]).map(Number)
    i += n.length
    if (cmd === "M") {
      x = n[0]
      y = n[1]
      path.move(pt(x, y))
      cmd = "L"
    } else if (cmd === "L") {
      x = n[0]
      y = n[1]
      path.addLine(pt(x, y))
    } else if (cmd === "H") {
      x = n[0]
      path.addLine(pt(x, y))
    } else if (cmd === "V") {
      y = n[0]
      path.addLine(pt(x, y))
    } else if (cmd === "C") {
      x = n[4]
      y = n[5]
      path.addCurve(pt(x, y), pt(n[0], n[1]), pt(n[2], n[3]))
    }
  }
  return path
}

function addCheckeredFlag(stack, color, width) {
  if (typeof DrawContext === "undefined") return
  const [vw, vh] = CHECKERED_FLAG_VIEWBOX
  const scale = width / vw
  const height = vh * scale
  const ctx = new DrawContext()
  ctx.size = new Size(width, height)
  // Points, drawn at the screen's scale so the flag stays crisp, on a
  // transparent background (a DrawContext is opaque by default).
  ctx.respectScreenScale = true
  ctx.opaque = false
  ctx.setFillColor(color)
  for (const d of CHECKERED_FLAG_PATHS) {
    ctx.addPath(svgPathToPath(d, scale))
    ctx.fillPath()
  }
  const img = stack.addImage(ctx.getImage())
  img.imageSize = new Size(width, height)
}

// ----- the app's track shapes -----
//
// src/data/track-icons/<trackId>.svg — the shapes the app draws across
// the top of its featured event card — path for path, with each path's
// fill-opacity (a test keeps these identical to the app's files, and
// requires one per track the app knows). Drawn with DrawContext, like
// the flag, since a widget can't show an SVG.
//
// Every shape sits in the same 437-unit frame; the app's Motorsport
// Ranch files clip to x 45–392, y 150–286 and Eagles Canyon's spans
// y 149–288, so the widget draws the window below and nothing else —
// the banner the app crops the square icon to.
const TRACK_SHAPE_WINDOW = { x: 45, y: 146, w: 347, h: 145 }
const TRACK_SHAPES = {
  "ecr-2-7": [
    [1, "M222.162 149.169H222.166C227.342 149.189 231.732 150.653 234.734 154.116C237.648 157.473 238.683 162.086 238.448 167.41L238.447 167.418C238.389 168.672 238.433 169.805 238.558 170.81L238.608 171.153C238.87 172.825 239.336 173.828 239.767 174.359L239.888 174.496C240.171 174.791 240.458 174.905 240.834 174.922L240.867 174.924C240.99 174.931 241.137 174.926 241.297 174.902L241.322 174.899L241.349 174.896L368.542 158.401C371.631 157.999 374.505 157.722 376.928 158.206C378.402 158.495 379.809 159.052 381.022 160.055C382.242 161.064 383.078 162.37 383.644 163.857L386.921 172.468L387.067 172.869C387.391 173.806 387.608 174.757 387.671 175.717C387.818 177.775 387.288 179.669 386.11 181.255L386.104 181.264L386.098 181.272C384.974 182.763 383.433 183.743 381.77 184.385L381.762 184.388L381.755 184.391C380.203 184.98 378.448 185.304 376.581 185.433L376.582 185.434L272.517 193.032L272.518 193.033C269.737 193.239 267.321 194.602 265.588 196.694L265.586 196.697C263.883 198.748 262.869 201.469 262.888 204.343L262.906 204.92V204.927L262.92 205.197L262.975 205.751C263.29 208.323 264.403 210.685 266.027 212.457L266.382 212.827L266.387 212.832C268.258 214.702 270.68 215.754 273.292 215.626L296.751 213.842L296.756 213.841C299.841 213.611 302.659 214.276 305.013 215.846L305.478 216.172L305.484 216.176C307.797 217.892 309.359 220.357 310.234 223.213L310.401 223.79L313.989 237.118L314.091 237.513C314.282 238.301 314.401 239.08 314.448 239.848L314.467 240.232V240.258C314.523 242.781 313.789 245.164 312.233 247.12L312.234 247.121C310.72 249.029 308.578 250.335 306.057 251.014C304.79 251.365 303.435 251.551 302.025 251.586H302.021L278.495 252.147H278.493C275.426 252.218 272.353 252.153 269.387 252.095C266.397 252.037 263.514 251.985 260.71 252.072C255.996 252.223 252.46 252.869 249.927 253.873L249.928 253.874C247.055 255.017 245.532 257.433 244.445 261.276C243.899 263.207 243.514 265.316 243.091 267.621C242.679 269.868 242.231 272.297 241.562 274.607L241.54 274.68L241.537 274.691C240.086 279.701 237.507 283.53 233.649 285.767L233.648 285.766C229.718 288.06 225.048 288.349 220.072 287.237L66.6964 253.026C63.3285 252.276 60.3336 250.658 57.8556 248.489C55.2849 246.241 53.2479 243.38 51.8986 240.229C50.5522 237.084 49.8729 233.634 50.0197 230.213L50.0558 229.596C50.2766 226.513 51.1711 223.459 52.84 220.692L52.8468 220.681C53.7372 219.218 54.6431 217.765 55.5617 216.303C57.7132 212.847 59.9053 209.337 61.9523 205.521L61.9562 205.515C63.2235 203.165 63.759 201.1 63.796 199.249C63.833 197.4 63.3818 195.561 62.4191 193.636L56.1554 181.111C54.6405 178.089 53.5672 175.276 52.964 172.694L52.963 172.693C52.1771 169.32 52.1529 166.126 53.1788 163.289L53.1808 163.282C54.2735 160.283 56.401 158.031 59.3087 156.576L59.7697 156.355C60.8561 155.854 62.0189 155.472 63.2306 155.191C65.9917 154.55 69.7032 154.192 74.2833 154.137C77.9518 154.093 82.2752 154.245 87.2492 154.622L89.421 154.798L89.422 154.799C97.8687 155.528 104.273 158.977 108.856 165.094L109.259 165.646C113.375 171.421 115.717 179.2 117.011 188.552C118.392 198.542 121.515 205.812 125.663 210.771L126.068 211.243L126.07 211.246C130.647 216.485 136.625 219.224 143.458 219.681L203.767 223.661L203.772 223.662C206.619 223.855 208.715 223.352 210.204 222.543L210.214 222.538C211.377 221.912 212.25 221.049 212.86 220.026L212.867 220.014C213.503 218.957 213.9 217.671 213.998 216.193C214.246 212.443 212.951 209.791 210.724 206.158L210.72 206.153C208.012 201.718 205.129 197.481 201.692 192.427L201.684 192.415L201.676 192.404L201.212 191.708L200.824 191.151C198.903 188.441 197.178 186.81 195.256 185.804L195.253 185.803C193.189 184.72 190.466 184.145 186.295 184.116L157.928 183.942C154.293 183.92 151.369 183.544 149.033 182.599C146.556 181.596 144.891 180.016 143.731 177.961L143.728 177.955C142.439 175.661 140.793 171.168 139.939 166.703C139.508 164.45 139.248 162.054 139.388 159.846C139.524 157.703 140.063 155.312 141.636 153.509C143.201 151.708 145.332 150.518 147.7 149.82L147.709 149.818L147.717 149.817C149.646 149.26 151.803 148.993 154.11 149L222.162 149.169ZM154.086 158.054C152.506 158.049 151.231 158.22 150.267 158.502C149.313 158.784 148.801 159.121 148.541 159.377C148.527 159.42 148.508 159.489 148.487 159.589C148.419 159.918 148.375 160.413 148.39 161.088C148.419 162.438 148.67 164.143 149.062 165.935C149.449 167.707 149.95 169.46 150.431 170.871C150.671 171.577 150.898 172.175 151.093 172.632C151.292 173.1 151.406 173.297 151.418 173.318C151.854 173.944 152.847 174.859 157.993 174.889H157.995L186.359 175.069C191.532 175.095 195.756 175.844 199.465 177.783L199.467 177.784C203.192 179.735 206.029 182.692 208.691 186.608L209.185 187.33L209.191 187.338C212.592 192.348 215.548 196.695 218.393 201.336L218.394 201.338C221.139 205.824 223.459 210.353 223.027 216.793C222.843 219.6 222.064 222.304 220.637 224.682L220.634 224.687C219.197 227.07 217.151 229.084 214.528 230.496C211.379 232.203 207.545 232.993 203.161 232.695L142.856 228.715C133.743 228.112 125.518 224.381 119.252 217.206C113.74 210.907 109.908 202.126 108.196 190.885L108.037 189.789C106.828 181.032 104.74 174.706 101.608 170.522C98.6853 166.622 94.6245 164.33 88.6408 163.812C83.0338 163.33 78.2911 163.143 74.3986 163.19H74.3966C70.2555 163.237 67.2449 163.556 65.2863 164.01C64.4687 164.199 63.8442 164.423 63.38 164.657L63.3751 164.66C62.3793 165.16 61.9196 165.738 61.6896 166.375L61.6857 166.384C61.3958 167.179 61.2923 168.516 61.7824 170.631L61.9581 171.321C62.3444 172.735 62.9459 174.337 63.796 176.135L64.2423 177.05L64.2433 177.053L70.5089 189.578L70.5099 189.581C72.0618 192.691 72.9142 195.961 72.8497 199.419L72.8488 199.426C72.7772 202.872 71.8013 206.318 69.9279 209.811L69.9288 209.812C67.754 213.875 65.4109 217.618 63.2316 221.105L63.2326 221.106C62.314 222.579 61.4281 224 60.5978 225.375L60.5939 225.382C59.6543 226.929 59.1512 228.717 59.0685 230.599C58.9813 232.608 59.3847 234.708 60.2218 236.676L60.382 237.037C61.1541 238.714 62.2323 240.214 63.5324 241.417L63.8146 241.67L63.8204 241.676C65.2322 242.913 66.884 243.786 68.6798 244.192L222.05 278.401C225.364 279.133 227.611 278.808 229.107 277.94C230.527 277.112 231.9 275.414 232.84 272.161L232.861 272.085L232.864 272.075C233.467 269.996 233.885 267.736 234.35 265.271C234.803 262.868 235.3 260.278 236.06 257.819C237.605 252.819 240.381 247.92 246.578 245.456L246.581 245.455C250.314 243.975 254.963 243.204 260.46 243.029L261.602 243C264.264 242.947 266.923 242.995 269.531 243.045C272.536 243.103 275.472 243.162 278.409 243.089H278.412L301.805 242.528H301.821C302.558 242.515 303.177 242.42 303.686 242.286L303.992 242.194C304.653 241.972 304.983 241.69 305.141 241.495C305.283 241.313 305.422 241.013 305.408 240.476V240.464C305.402 240.164 305.358 239.84 305.265 239.504L305.261 239.492L305.258 239.48L301.661 226.142L301.66 226.138C301.275 224.7 300.67 223.882 300.082 223.445C299.563 223.065 298.746 222.766 297.443 222.865L274.965 224.578L274.94 224.605L273.791 224.664C268.365 224.948 263.52 222.759 259.992 219.235C256.529 215.788 254.287 211.013 253.895 205.891L253.896 205.89C253.876 205.667 253.864 205.463 253.862 205.446L253.861 205.425L253.86 205.402C253.58 200.018 255.372 194.838 258.624 190.91C261.807 187.063 266.426 184.403 271.856 184.008L375.922 176.408L375.931 176.407C377.098 176.325 377.946 176.145 378.516 175.939C378.526 175.934 378.536 175.929 378.546 175.925C378.524 175.856 378.498 175.781 378.466 175.698L378.464 175.692L375.191 167.091L375.189 167.087C375.186 167.086 375.183 167.086 375.18 167.085L375.172 167.083C374.283 166.907 372.67 166.999 369.692 167.376L369.691 167.375L242.512 183.875L242.511 183.874C241.831 183.966 241.14 184 240.438 183.962C240.431 183.962 240.425 183.961 240.418 183.961C240.409 183.961 240.399 183.962 240.39 183.961C237.266 183.814 234.632 182.408 232.73 180.062L232.722 180.052C230.999 177.91 229.989 175.106 229.584 171.977C229.384 170.435 229.327 168.771 229.405 167.011V167.009C229.577 163.231 228.846 161.148 227.898 160.058L227.896 160.054C227.038 159.065 225.389 158.233 222.138 158.228H222.135L154.089 158.054H154.086Z"],
  ],
  "msrc-1-3": [
    [0.3, "M316.71 154.41C322.405 154.026 327.642 154.934 332.296 157.36C337.112 159.864 341.046 163.847 344.146 169.209L344.147 169.211L382.162 235.038L382.164 235.042C383.913 238.082 384.845 241.468 384.857 244.924V244.936C384.857 248.304 384.003 251.686 382.219 254.794L372.061 272.54L372.06 272.544C370.377 275.473 368.139 277.485 365.615 278.767L365.609 278.77C363.168 280.004 360.589 280.505 358.169 280.626L358.17 280.627L336.439 281.751L336.44 281.752C332.794 281.943 329.585 281.072 326.846 279.338L326.845 279.337C323.932 277.492 321.774 274.775 320.189 271.702L320.187 271.699C318.387 268.197 317.735 264.446 318.732 260.835L318.734 260.826C319.708 257.341 322.091 254.444 325.63 252.336L325.632 252.335L342.447 242.335C344.914 240.862 345.642 239.752 345.816 238.954L345.852 238.758C345.996 237.724 345.661 235.875 343.787 232.606L324.594 199.08C323.351 196.91 321.999 195.289 320.572 194.194C319.232 193.168 317.729 192.544 315.975 192.358C313.216 192.081 310.644 192.654 308.299 193.901L308.296 193.902C305.682 195.29 303.259 197.548 301.2 200.512L301.198 200.516L253.587 268.817L253.585 268.818C251.3 272.089 248.521 274.496 245.354 276.11L245.353 276.111C241.968 277.835 238.282 278.571 234.523 278.571H184.523C181.463 278.571 178.235 277.854 174.797 276.737L174.792 276.735C171.472 275.651 167.787 274.139 163.66 272.389C156.313 269.269 149.588 267.639 143.618 267.271C137.477 266.893 132.144 267.854 127.7 269.9L127.699 269.901L110.386 277.862L110.377 277.866C107.137 279.345 103.97 280.005 100.983 279.417L100.978 279.416C97.7336 278.77 95.2649 276.808 93.5156 273.99L93.5136 273.987C90.8196 269.637 90.0099 265.207 90.9716 260.577L90.9746 260.567C91.8859 256.26 94.3002 252.077 97.6474 247.783L107.848 234.685C110.286 231.545 112.974 228.326 116.201 225.368L116.822 224.808C119.958 222.021 123.58 219.48 127.947 217.467C131.326 215.905 133.765 214.097 135.316 212.071L135.323 212.063C136.79 210.161 137.598 207.869 137.555 204.991V204.983C137.545 204.21 137.498 203.464 137.415 202.742L137.414 202.735L137.413 202.728C137.085 199.757 136.223 198.078 135.313 197.186L135.156 197.04C134.344 196.328 133.102 195.845 131.144 195.876L131.143 195.875C130.769 195.884 130.358 195.911 129.911 195.963L129.9 195.964C124.529 196.564 119.922 198.654 116.189 202.312C112.562 205.885 109.589 211.122 107.644 218.319C106.748 221.665 105.52 224.983 103.537 228.034L103.534 228.04C101.485 231.181 98.7173 233.916 94.873 236.042L94.8183 236.072L94.7627 236.101L94.6435 236.159C91.9653 237.637 89.7359 238.867 87.9463 239.999C86.106 241.163 85.0079 242.056 84.4306 242.773L84.1816 243.083L84.1767 243.09C82.4893 245.186 80.3525 247.906 77.0332 249.498L77.0322 249.497C75.3885 250.287 73.4373 251.792 71.5175 254.37C69.8553 256.606 68.2503 259.614 66.9238 263.573C65.7863 267.016 64.5047 270.129 62.6845 272.375C61.5971 273.718 60.2799 274.844 58.6543 275.537C57.1125 276.194 55.4646 276.388 53.7509 276.186L53.4072 276.141C49.2689 275.529 46.2741 273.149 44.6826 269.398L44.6797 269.39C43.3078 266.13 43.1438 262.038 43.7832 257.492L45.748 243.447C46.077 241.069 46.5364 238.458 47.3261 235.768L47.3271 235.766C48.131 233.033 49.2833 230.201 51.0068 227.45C52.6171 224.869 53.9831 222.391 54.9316 219.852L54.9336 219.847C55.8748 217.34 56.4449 214.78 56.4726 212.039V212.036C56.5371 206.153 57.1936 201.304 59.9131 197.614L59.916 197.61C62.799 193.714 67.2552 191.981 73.1396 191.1L73.8164 190.99C77.1864 190.413 80.3715 189.375 83.1582 187.893L83.164 187.89C85.912 186.435 88.2688 184.545 90.0703 182.268C94.4652 176.697 99.6286 172.298 105.748 169.464L105.75 169.463C111.895 166.622 118.818 165.451 126.617 166.162C129.114 166.386 131.254 166.548 133.155 166.482H133.164C134.918 166.425 136.299 166.164 137.409 165.668C139.639 164.665 141.78 163.999 144.261 164.115H144.264C146.706 164.232 148.971 165.109 151.483 166.509C157.247 169.724 161.051 174.711 162.686 181.987L162.837 182.698C164.228 189.621 163.693 198.523 161.353 209.943L161.121 211.057C160.472 214.119 160.255 216.396 160.324 218.093L160.36 218.656C160.47 219.905 160.741 220.74 161.054 221.34L161.661 222.464C163.089 225.035 164.605 227.294 166.183 229.3C168.006 231.594 169.939 233.618 171.945 235.423C173.906 237.181 175.441 237.727 177.109 238.167L177.835 238.353L177.843 238.355L177.85 238.357C179.154 238.692 180.757 239.09 182.41 239.925C184.114 240.785 185.764 242.046 187.443 244.006L187.646 244.234C187.967 244.582 188.204 244.778 188.395 244.901L188.605 245.018L188.621 245.026L188.636 245.033C188.991 245.211 189.522 245.383 190.52 245.58L190.978 245.666L190.984 245.667C191.976 245.847 193.455 245.651 195.639 244.607C197.969 243.492 200.717 241.586 203.916 238.861L203.927 238.853C205.372 237.633 207.1 236.864 208.883 236.555L208.888 236.554C210.664 236.248 212.562 236.385 214.312 237.029C214.32 237.032 214.328 237.035 214.335 237.037C215.987 237.639 217.354 238.629 218.417 239.845L218.627 240.092L218.643 240.111C219.74 241.473 220.49 243.077 220.883 244.756C221.064 245.527 221.355 245.949 221.672 246.219L221.809 246.326L221.815 246.331L221.821 246.335C222.324 246.698 223.269 247.059 224.903 247.14C227.724 247.268 230.039 246.78 232.002 245.777L232.377 245.577C234.24 244.544 235.975 242.956 237.577 240.702L237.581 240.697L284.119 175.528C288.68 169.134 293.656 164.244 298.842 160.776L298.845 160.775C304.488 157.009 310.363 154.922 316.157 154.451L316.71 154.41ZM327.921 165.78C324.9 164.214 321.265 163.557 316.923 163.913C312.827 164.249 308.479 165.749 304.119 168.662L304.118 168.663C299.969 171.432 295.804 175.489 291.837 181.043L291.836 181.042L245.309 246.201C242.807 249.718 239.836 252.438 236.322 254.232L236.318 254.234C232.755 256.046 228.809 256.817 224.469 256.615H224.465C221.414 256.469 218.588 255.7 216.283 254.054L216.277 254.05C213.911 252.351 212.352 249.933 211.637 246.924L211.633 246.907L211.629 246.89C211.553 246.552 211.415 246.286 211.277 246.113C211.222 246.048 211.178 246.008 211.148 245.986C211.119 245.965 211.101 245.959 211.094 245.956L211.077 245.949L211.06 245.943C210.952 245.904 210.752 245.869 210.488 245.907C210.223 245.96 210.101 246.043 210.07 246.069L210.065 246.074C206.432 249.163 202.995 251.592 199.743 253.158L199.734 253.162C196.255 254.825 192.741 255.627 189.294 254.999L189.29 254.998C187.53 254.675 185.938 254.286 184.424 253.536C182.79 252.726 181.503 251.647 180.246 250.174C178.699 248.382 177.489 248.069 175.492 247.553C172.832 246.877 169.575 246.046 165.601 242.478C163.236 240.36 160.942 237.953 158.752 235.182L158.751 235.181C156.565 232.411 154.523 229.296 152.657 225.764L152.655 225.76C151.576 223.711 150.969 221.331 150.848 218.493V218.487C150.739 215.828 151.057 212.742 151.834 209.079C154.142 198.218 154.607 190.52 153.635 185.091L153.536 184.572C152.537 179.604 150.269 176.691 146.866 174.798L146.857 174.793C145.161 173.842 144.32 173.62 143.803 173.591C143.354 173.573 142.691 173.697 141.267 174.326L141.266 174.325C138.749 175.455 136.107 175.867 133.473 175.96L133.472 175.959C130.977 176.051 128.362 175.842 125.765 175.61H125.762C119.551 175.047 114.281 175.971 109.737 178.081L109.728 178.086C105.15 180.194 101.121 183.58 97.5156 188.144C94.832 191.564 91.4009 194.257 87.6006 196.278C83.5962 198.408 79.1358 199.799 74.5586 200.481L74.5595 200.482C70.0418 201.164 68.3345 202.174 67.5449 203.245C66.5775 204.56 66.0075 207.01 65.9541 212.122V212.126C65.9069 216.144 65.0914 219.789 63.8213 223.184L63.8183 223.192C62.5637 226.518 60.8695 229.583 59.0527 232.484L59.0517 232.483C57.8551 234.394 57.0235 236.402 56.4277 238.439L56.4287 238.44C55.817 240.537 55.4374 242.661 55.1386 244.763L53.1758 258.795L53.1767 258.796C52.6918 262.302 52.9135 264.502 53.4131 265.707L53.5195 265.933C53.7431 266.352 54.0318 266.58 54.5127 266.694L54.7695 266.742L54.7851 266.744C54.8866 266.759 54.9361 266.754 54.9463 266.753H54.9492C54.9527 266.751 54.9815 266.738 55.0361 266.693C55.0726 266.664 55.1189 266.619 55.1767 266.557L55.3095 266.395C56.093 265.433 56.9305 263.603 57.9306 260.592L57.9316 260.589C59.5577 255.711 61.6178 251.784 63.917 248.711C66.708 244.964 69.8405 242.435 72.9111 240.95L72.9179 240.946L72.9238 240.943C74.0992 240.382 75.1585 239.157 76.7871 237.139L77.0341 236.83L77.04 236.822C78.4603 235.059 80.402 233.573 82.5537 232.188C84.7153 230.796 87.306 229.372 90.1259 227.818L90.2724 227.735L90.2871 227.727L90.3008 227.719C92.5485 226.486 94.1508 224.961 95.3506 223.22L95.5908 222.86C96.8651 220.908 97.7512 218.571 98.4873 215.859C100.802 207.261 104.541 200.467 109.544 195.546L109.548 195.543C114.889 190.308 121.469 187.365 128.848 186.53L128.859 186.528L128.871 186.527C129.551 186.456 130.266 186.407 130.992 186.395H130.998C135.235 186.332 139.051 187.569 141.954 190.416L142.212 190.676C144.678 193.224 146.147 196.687 146.738 200.819L146.848 201.685L146.849 201.693C146.954 202.664 147.024 203.717 147.036 204.862C147.117 209.883 145.633 214.212 142.862 217.831L142.859 217.834C140.165 221.344 136.375 224.019 131.932 226.076C128.286 227.763 125.27 229.921 122.615 232.358C119.91 234.844 117.577 237.62 115.32 240.503L105.12 253.614L105.119 253.613C102.316 257.217 100.771 260.084 100.264 262.513C99.8184 264.639 100.133 266.672 101.573 268.987L101.577 268.994C102.061 269.776 102.444 269.999 102.706 270.076L102.811 270.102L102.816 270.103C103.358 270.21 104.459 270.144 106.421 269.238L106.425 269.236L123.75 261.275L124.313 261.022C130.165 258.454 136.863 257.354 144.186 257.801C151.347 258.239 159.135 260.165 167.373 263.659C170.908 265.157 173.938 266.404 176.608 267.33L177.731 267.707L177.739 267.71C180.567 268.636 182.756 269.079 184.523 269.079H234.523C236.975 269.079 239.164 268.612 241.043 267.657C242.783 266.766 244.398 265.405 245.796 263.394L245.799 263.389L293.41 195.089C296.208 191.071 299.721 187.709 303.859 185.513C307.765 183.439 312.176 182.44 316.92 182.927C320.49 183.281 323.635 184.595 326.329 186.657C328.953 188.656 331.088 191.311 332.837 194.368L352.029 227.882L352.03 227.884C354.722 232.593 355.975 236.906 355.086 240.979L355.085 240.978C354.165 245.229 351.17 248.189 347.287 250.497L347.286 250.496L330.472 260.495C328.78 261.502 328.11 262.533 327.879 263.362L327.834 263.542C327.637 264.445 327.772 265.706 328.62 267.347L328.623 267.353L328.809 267.702C329.742 269.415 330.792 270.599 331.927 271.313L331.936 271.319L331.946 271.325C332.969 271.98 334.261 272.365 335.959 272.278L357.679 271.153H357.683C359.088 271.082 360.308 270.812 361.307 270.306C362.222 269.841 363.098 269.089 363.818 267.829L373.978 250.079C374.927 248.422 375.373 246.669 375.375 244.949L375.368 244.62C375.305 242.976 374.83 241.324 373.943 239.794L373.94 239.79L335.936 173.963C333.636 169.992 330.94 167.357 327.921 165.78Z"],
    [1, "M144.261 164.096H144.263C146.705 164.212 148.97 165.089 151.483 166.488L151.485 166.489C157.249 169.705 161.051 174.691 162.685 181.968L162.836 182.68C164.272 189.825 163.656 199.079 161.121 211.036C160.926 211.954 160.77 212.807 160.648 213.598L160.62 213.781L160.599 213.852C160.589 213.9 160.573 213.97 160.554 214.057C160.516 214.233 160.462 214.481 160.4 214.77C160.275 215.35 160.114 216.094 159.971 216.754C159.271 220.171 158.271 223.943 157.01 228.073L157.009 228.079C154.962 234.736 152.189 242.453 148.824 251.23C147.681 255.131 145.095 258.668 141.255 261.844L141.25 261.848C140.711 262.292 140.149 262.722 139.571 263.144C137.804 264.67 135.372 266.453 133.917 267.164C133.259 267.486 132.099 267.978 130.981 268.454C129.806 268.954 128.599 269.466 127.701 269.88L127.7 269.881L110.385 277.843L110.376 277.847C107.137 279.324 103.97 279.986 100.984 279.398L100.977 279.397C97.733 278.751 95.264 276.788 93.5151 273.971L93.5141 273.968C90.8201 269.618 90.0094 265.187 90.9711 260.558L90.9741 260.547C91.8855 256.24 94.2998 252.057 97.6469 247.763L107.848 234.664C110.287 231.524 112.974 228.306 116.201 225.349C119.477 222.342 123.288 219.594 127.947 217.447C131.326 215.885 133.765 214.077 135.316 212.052L135.323 212.043C136.789 210.142 137.597 207.849 137.554 204.972L137.553 204.963C137.544 204.191 137.498 203.444 137.414 202.723L137.414 202.716L137.413 202.708C137.084 199.737 136.223 198.058 135.313 197.166L135.156 197.02C134.345 196.311 133.108 195.827 131.162 195.855C130.784 195.864 130.367 195.891 129.911 195.943L129.9 195.944C124.529 196.544 119.922 198.634 116.189 202.292C112.563 205.864 109.59 211.099 107.645 218.291C106.749 221.639 105.52 224.961 103.537 228.015L103.534 228.02C101.484 231.162 98.7167 233.896 94.8725 236.022L94.8178 236.053L94.7621 236.081L94.643 236.14C91.965 237.617 89.7354 238.847 87.9457 239.978C86.1049 241.142 85.0064 242.036 84.4291 242.753L84.1801 243.064L84.1752 243.07C82.4882 245.166 80.3521 247.886 77.0327 249.478L77.0317 249.477C75.3884 250.267 73.4362 251.77 71.517 254.348L71.518 254.349C69.8553 256.584 68.25 259.594 66.9233 263.555C65.7859 266.997 64.5044 270.111 62.684 272.356L62.683 272.355C61.5955 273.698 60.2792 274.825 58.6538 275.517C57.112 276.175 55.464 276.369 53.7504 276.167L53.4067 276.121C49.2687 275.509 46.2735 273.129 44.6821 269.378L44.6791 269.369C43.3073 266.109 43.1439 262.015 43.7836 257.47L45.7475 243.428C46.0765 241.049 46.5368 238.437 47.3266 235.747C48.1304 233.014 49.2829 230.182 51.0063 227.432C52.6168 224.85 53.9834 222.371 54.9321 219.832L54.933 219.827C55.8743 217.32 56.4444 214.76 56.4721 212.019V212.017C56.5366 206.133 57.1932 201.284 59.9125 197.595L59.9164 197.59C62.7994 193.695 67.2549 191.961 73.1391 191.08L73.8159 190.971C77.1858 190.393 80.3711 189.355 83.1577 187.873L83.1635 187.87C85.91 186.416 88.2656 184.527 90.0668 182.251C94.4623 176.678 99.6271 172.279 105.748 169.444L105.749 169.443C111.895 166.603 118.818 165.431 126.618 166.142C129.114 166.367 131.254 166.529 133.155 166.462L133.164 166.461C134.807 166.408 136.124 166.176 137.198 165.738L137.409 165.648C139.639 164.645 141.781 163.98 144.261 164.096ZM143.803 173.571C143.354 173.553 142.692 173.678 141.267 174.307L141.266 174.306C138.75 175.435 136.109 175.846 133.477 175.939L133.478 175.94C130.982 176.033 128.364 175.823 125.765 175.591L125.761 175.59C119.55 175.027 114.28 175.951 109.737 178.061L109.728 178.065C105.15 180.173 101.121 183.56 97.5161 188.124C94.8323 191.544 91.4002 194.237 87.6 196.259C83.5945 198.389 79.1324 199.781 74.5532 200.463C70.0417 201.145 68.334 202.154 67.5444 203.224C66.5765 204.538 66.007 206.989 65.9536 212.102V212.106C65.9064 216.124 65.0909 219.769 63.8207 223.164L63.8188 223.172C62.5642 226.498 60.8699 229.564 59.0532 232.464L59.0522 232.463C57.855 234.375 57.024 236.385 56.4282 238.422L56.4272 238.421C55.8158 240.517 55.4378 242.642 55.1391 244.743L53.1762 258.78L53.1752 258.779C52.6909 262.283 52.9134 264.483 53.4125 265.687L53.519 265.913C53.7424 266.332 54.031 266.56 54.5121 266.675L54.769 266.723L54.7846 266.725C54.886 266.74 54.9356 266.735 54.9457 266.733H54.9487C54.9521 266.732 54.9809 266.719 55.0356 266.674C55.0754 266.641 55.1268 266.59 55.1918 266.519L55.31 266.374C56.0936 265.412 56.9314 263.582 57.9311 260.572L57.9321 260.569C59.558 255.692 61.6175 251.766 63.9164 248.692C66.7072 244.946 69.8395 242.415 72.9106 240.93L72.9164 240.927L72.9233 240.924C74.0989 240.362 75.159 239.136 76.7866 237.119L77.0346 236.809L77.0405 236.803C78.4607 235.039 80.4016 233.553 82.5532 232.168C84.7148 230.776 87.3055 229.352 90.1254 227.798L90.2719 227.716L90.2866 227.708L90.3012 227.699C92.5483 226.467 94.1503 224.942 95.35 223.2L95.5903 222.84C96.8646 220.888 97.7517 218.551 98.4877 215.839C100.802 207.241 104.541 200.448 109.543 195.527L109.547 195.523C114.888 190.288 121.468 187.345 128.847 186.511L128.871 186.509C129.549 186.437 130.265 186.387 130.992 186.375H130.998C135.235 186.313 139.05 187.549 141.953 190.395C144.575 192.966 146.126 196.526 146.738 200.801L146.847 201.665L146.848 201.674C146.953 202.639 147.023 203.686 147.036 204.823L147.039 205.292C147.027 210.122 145.549 214.301 142.862 217.811L142.859 217.814C140.164 221.325 136.375 224 131.931 226.057C128.286 227.743 125.269 229.901 122.615 232.338C119.91 234.824 117.576 237.6 115.32 240.482L115.321 240.483L105.12 253.594C102.317 257.197 100.771 260.064 100.263 262.493C99.8459 264.486 100.097 266.398 101.317 268.537L101.574 268.969L101.779 269.276C102.168 269.816 102.481 269.989 102.706 270.056L102.815 270.083C103.357 270.191 104.459 270.125 106.42 269.22L106.424 269.218L123.748 261.256L123.749 261.255C125.172 260.602 126.645 260.031 128.167 259.547C131.234 258.006 133.666 256.453 135.536 254.913C138.279 252.642 139.667 250.541 140.199 248.707L140.229 248.561L140.307 248.348L140.338 248.263L140.346 248.243L140.353 248.224C143.698 239.512 146.42 231.941 148.418 225.434C149.333 222.447 150.084 219.71 150.669 217.213C150.829 215.614 151.234 211.883 151.833 209.059C154.142 198.199 154.607 190.501 153.635 185.071L153.537 184.553C152.537 179.584 150.269 176.67 146.867 174.777L146.858 174.772C145.163 173.822 144.321 173.601 143.803 173.571Z"],
  ],
  "msrc-1-7": [
    [0.3, "M143.275 164.115H143.277C145.566 164.224 147.7 165.002 150.028 166.252L150.497 166.509L150.499 166.51C156.448 169.829 160.308 175.034 161.85 182.698C163.241 189.621 162.707 198.523 160.367 209.943L160.134 211.057C159.485 214.119 159.268 216.396 159.337 218.093L159.374 218.656C159.484 219.91 159.757 220.747 160.071 221.348C161.672 224.387 163.394 227.009 165.196 229.3C167.019 231.594 168.953 233.617 170.959 235.423C173.199 237.433 174.884 237.859 176.848 238.352L179.765 239.085L177.426 248.295L174.519 247.557L174.499 247.551C171.838 246.874 168.584 246.041 164.615 242.477L163.731 241.67C161.678 239.752 159.681 237.606 157.765 235.182L157.764 235.181C155.578 232.411 153.536 229.296 151.67 225.764L151.669 225.76C150.589 223.711 149.983 221.331 149.861 218.493V218.487C149.752 215.828 150.07 212.742 150.847 209.079C153.23 197.868 153.649 190.027 152.55 184.572C151.551 179.604 149.282 176.691 145.879 174.798L145.871 174.793C144.175 173.842 143.334 173.62 142.817 173.591C142.368 173.573 141.705 173.697 140.28 174.326L140.279 174.325C137.762 175.455 135.121 175.867 132.487 175.96L132.486 175.959C129.991 176.051 127.375 175.842 124.778 175.609H124.775C118.564 175.046 113.294 175.971 108.751 178.081L108.742 178.086C104.163 180.194 100.135 183.58 96.5299 188.143C94.0141 191.35 90.841 193.917 87.3228 195.892L86.6138 196.278C82.6095 198.408 78.1491 199.798 73.5719 200.48L73.5728 200.481C69.0551 201.164 67.3478 202.174 66.5582 203.245C65.5908 204.56 65.0208 207.01 64.9674 212.122V212.126C64.9202 216.144 64.1047 219.79 62.8345 223.184L62.8316 223.191C61.577 226.518 59.8827 229.582 58.066 232.482L58.067 232.483C56.8698 234.395 56.0379 236.404 55.442 238.441L55.441 238.44C54.8295 240.537 54.4507 242.661 54.1519 244.763L52.189 258.795L52.19 258.796C51.7051 262.301 51.9269 264.502 52.4263 265.707L52.5328 265.933C52.7563 266.352 53.0451 266.58 53.526 266.694L53.7828 266.742L53.7984 266.744C53.8998 266.759 53.9494 266.755 53.9595 266.754C53.9655 266.753 53.9665 266.752 53.9644 266.753H53.9625C53.9655 266.751 53.9943 266.738 54.0494 266.693C54.0883 266.661 54.1378 266.612 54.2008 266.544L54.3238 266.394C55.1073 265.433 55.9438 263.603 56.9439 260.592L56.9449 260.589C58.5709 255.711 60.6311 251.784 62.9303 248.711C65.7213 244.964 68.8538 242.435 71.9244 240.95L71.9312 240.947L71.9371 240.943C73.107 240.384 74.1637 239.166 75.7838 237.158L75.7994 237.139L76.0474 236.83L76.0533 236.822C77.464 235.071 79.3886 233.593 81.5211 232.217C83.6632 230.834 86.2275 229.422 89.0191 227.884L89.1392 227.817L89.2867 227.734L89.314 227.719C91.7116 226.404 93.3746 224.756 94.5982 222.868L94.6041 222.86C95.8775 220.91 96.7628 218.575 97.4986 215.865C99.8129 207.264 103.553 200.469 108.557 195.547L108.561 195.543C113.902 190.308 120.482 187.364 127.861 186.53L127.873 186.529L127.884 186.527C128.564 186.456 129.279 186.407 130.005 186.394H130.012C134.249 186.332 138.065 187.569 140.967 190.416L141.226 190.676C143.692 193.224 145.161 196.687 145.752 200.819L145.861 201.684L145.862 201.693C145.967 202.659 146.037 203.705 146.049 204.842L146.052 205.311C146.04 210.141 144.563 214.32 141.876 217.831L141.873 217.834C139.178 221.344 135.388 224.019 130.945 226.076C127.299 227.762 124.283 229.921 121.628 232.357C118.923 234.844 116.59 237.62 114.334 240.503L114.335 240.504L104.133 253.614L104.132 253.613C101.33 257.217 99.7853 260.084 99.2779 262.513L99.2769 262.514C98.8317 264.64 99.1466 266.671 100.587 268.987L100.591 268.994C101.075 269.776 101.457 269.998 101.719 270.076L101.825 270.101L101.83 270.102C102.372 270.21 103.472 270.144 105.434 269.238L105.438 269.236L122.763 261.274L123.327 261.021C129.179 258.453 135.877 257.354 143.201 257.801L143.874 257.846C150.848 258.36 158.406 260.274 166.386 263.659C170.427 265.371 173.807 266.755 176.745 267.707L179.603 268.634L176.659 277.668L173.805 276.735C170.485 275.651 166.8 274.139 162.673 272.389C155.786 269.464 149.444 267.848 143.759 267.354L142.631 267.271C136.49 266.894 131.158 267.854 126.714 269.899L126.712 269.9L109.399 277.862L109.39 277.866C106.15 279.344 102.983 280.005 99.9967 279.417L99.9908 279.416C96.7469 278.77 94.2781 276.808 92.5289 273.99L92.5269 273.988C89.8327 269.638 89.0232 265.206 89.9849 260.577L89.9879 260.566C90.8992 256.259 93.3135 252.077 96.6607 247.783L106.861 234.684C109.3 231.545 111.987 228.326 115.214 225.368L115.836 224.808C118.971 222.02 122.593 219.48 126.961 217.467C130.339 215.905 132.779 214.097 134.33 212.071L134.337 212.062C135.803 210.161 136.611 207.868 136.568 204.991V204.982C136.559 204.21 136.512 203.464 136.428 202.742L136.427 202.735L136.426 202.727C136.098 199.757 135.237 198.078 134.327 197.185L134.17 197.04C133.36 196.331 132.124 195.848 130.177 195.876L129.58 195.902C129.371 195.916 129.152 195.937 128.924 195.963L128.914 195.964C123.543 196.564 118.936 198.653 115.203 202.311C111.575 205.885 108.602 211.122 106.657 218.319C105.761 221.665 104.533 224.982 102.55 228.034L102.547 228.04C100.498 231.181 97.7307 233.915 93.8863 236.042L93.8316 236.072L93.776 236.101L93.6539 236.161L93.5855 236.199C90.9163 237.671 88.6964 238.898 86.9176 240.025C85.1011 241.177 84.016 242.063 83.4439 242.772L83.1949 243.083L83.19 243.09C81.5026 245.186 79.3659 247.906 76.0465 249.498L76.0455 249.497C74.4018 250.287 72.4506 251.792 70.5308 254.37C68.8704 256.603 67.2667 259.607 65.941 263.56C64.8025 267.008 63.5191 270.126 61.6969 272.374L61.6978 272.375C60.6103 273.718 59.2932 274.844 57.6676 275.537C56.023 276.238 54.2576 276.412 52.4205 276.141C48.2824 275.529 45.2884 273.149 43.6969 269.397L43.6929 269.39C42.3208 266.129 42.1576 262.036 42.7974 257.489L44.7613 243.447C45.0903 241.068 45.5497 238.457 46.3394 235.768L46.3404 235.766C47.1443 233.033 48.2966 230.201 50.0201 227.45C51.6304 224.869 52.9964 222.391 53.9449 219.851L53.9469 219.847C54.8881 217.34 55.4582 214.78 55.4859 212.039V212.036C55.5504 206.152 56.2069 201.304 58.9263 197.614L58.9303 197.609C61.8133 193.714 66.2687 191.981 72.1529 191.1L72.8297 190.99C76.1997 190.412 79.3848 189.375 82.1715 187.893L82.1773 187.89C84.9254 186.435 87.2821 184.545 89.0836 182.268C93.4785 176.696 98.6419 172.298 104.761 169.464H104.763C110.909 166.623 117.832 165.451 125.631 166.162C128.128 166.386 130.269 166.548 132.17 166.481H132.178C133.932 166.425 135.312 166.164 136.422 165.668C138.652 164.665 140.794 163.999 143.275 164.115Z"],
    [1, "M315.758 154.397C321.453 154.012 326.69 154.92 331.344 157.346C336.159 159.85 340.094 163.833 343.194 169.195L343.195 169.197L381.21 235.025L381.212 235.028C382.961 238.068 383.893 241.455 383.905 244.91V244.922C383.905 248.289 383.051 251.67 381.268 254.776L381.269 254.777L371.109 272.526L371.107 272.53C369.425 275.459 367.187 277.471 364.663 278.753L364.657 278.756C362.215 279.99 359.637 280.491 357.217 280.612L357.218 280.613L335.487 281.739L335.486 281.738C331.84 281.928 328.632 281.058 325.894 279.324C322.981 277.479 320.821 274.761 319.237 271.689L319.235 271.686C317.435 268.183 316.783 264.433 317.78 260.821L317.782 260.813C318.756 257.327 321.14 254.431 324.678 252.323L324.68 252.321L341.495 242.321C343.962 240.849 344.69 239.739 344.864 238.941L344.899 238.744C345.044 237.71 344.709 235.861 342.835 232.592L323.642 199.067C322.399 196.897 321.048 195.277 319.622 194.182C318.281 193.154 316.778 192.531 315.022 192.344C312.264 192.067 309.692 192.641 307.347 193.888L307.344 193.889C304.73 195.276 302.308 197.534 300.249 200.498L300.246 200.502L252.635 268.803L252.634 268.805C250.349 272.075 247.57 274.482 244.403 276.097L244.401 276.098C241.016 277.821 237.33 278.558 233.571 278.558H183.446L183.32 278.548C178.168 278.115 173.747 277.177 170.274 274.951C166.657 272.632 164.424 269.155 163.177 264.443C161.852 259.47 162.48 254.125 164.127 249.717C165.22 246.794 166.984 243.886 169.685 240.616L170.237 239.957C171.9 238.005 174.295 237.813 175.998 238.153C180.423 239.039 183.701 240.735 186.491 243.992L186.694 244.22C187.015 244.568 187.252 244.764 187.443 244.887L187.653 245.004L187.685 245.02C188.04 245.197 188.57 245.37 189.568 245.567L190.026 245.652L190.032 245.653C191.024 245.834 192.504 245.638 194.687 244.594L194.688 244.593C197.018 243.479 199.764 241.572 202.964 238.848L202.975 238.839C204.42 237.62 206.149 236.851 207.932 236.541L207.936 236.54C209.711 236.235 211.61 236.372 213.36 237.016C213.363 237.017 213.367 237.018 213.369 237.019C213.374 237.02 213.378 237.022 213.383 237.024C215.035 237.626 216.402 238.615 217.465 239.831L217.675 240.078L217.69 240.098C218.79 241.461 219.54 243.068 219.933 244.749C220.14 245.626 220.489 246.05 220.856 246.313L220.863 246.318L220.869 246.321C221.371 246.684 222.317 247.045 223.951 247.126C226.772 247.255 229.087 246.766 231.05 245.764L231.425 245.564C233.288 244.53 235.023 242.942 236.625 240.689L236.629 240.684L283.167 175.515C287.728 169.12 292.704 164.232 297.89 160.763L297.893 160.761C303.536 156.995 309.411 154.908 315.205 154.438L315.758 154.397ZM326.969 165.767C323.948 164.201 320.312 163.543 315.971 163.9C311.875 164.235 307.527 165.736 303.167 168.649L303.166 168.65C299.017 171.419 294.852 175.475 290.885 181.029L290.884 181.028L244.359 246.182C241.857 249.701 238.885 252.423 235.37 254.218L235.366 254.22C231.803 256.033 227.857 256.803 223.517 256.602H223.513C220.462 256.455 217.636 255.686 215.331 254.04L215.325 254.036C212.959 252.337 211.4 249.919 210.685 246.91L210.681 246.894L210.677 246.876C210.601 246.538 210.463 246.272 210.325 246.1C210.269 246.034 210.225 245.994 210.196 245.973C210.168 245.952 210.15 245.945 210.143 245.943L210.125 245.936L210.107 245.93C209.999 245.89 209.797 245.856 209.53 245.896C209.27 245.948 209.15 246.031 209.119 246.057L209.113 246.061C205.48 249.149 202.042 251.578 198.791 253.145L198.782 253.149C195.303 254.812 191.789 255.613 188.342 254.985L188.338 254.985C186.578 254.661 184.986 254.273 183.472 253.523C181.838 252.713 180.551 251.633 179.294 250.16C178.001 248.662 176.942 248.201 175.464 247.787C173.984 249.758 173.091 251.387 172.538 252.86C171.434 255.827 171.091 259.235 171.864 262.14C172.584 264.842 174.005 266.403 175.856 267.399C177.828 268.458 180.459 268.96 183.621 269.066H233.571C236.022 269.066 238.212 268.598 240.091 267.644C241.831 266.753 243.446 265.392 244.844 263.38L244.847 263.376L292.458 195.075C295.256 191.058 298.769 187.695 302.907 185.499C306.812 183.425 311.223 182.427 315.968 182.913C319.541 183.268 322.689 184.584 325.385 186.65C328.005 188.648 330.137 191.299 331.885 194.355L351.077 227.868L351.078 227.87C353.77 232.579 355.023 236.892 354.134 240.965L354.133 240.964C353.213 245.215 350.218 248.175 346.335 250.484L329.52 260.484L329.519 260.483C327.828 261.489 327.158 262.519 326.927 263.349L326.926 263.353C326.686 264.209 326.753 265.421 327.508 267.011L327.668 267.334L327.671 267.339C328.588 269.122 329.626 270.373 330.749 271.151L330.975 271.3L330.994 271.312C332.017 271.966 333.309 272.352 335.007 272.265L356.727 271.14H356.73C357.96 271.078 359.048 270.863 359.97 270.472L360.355 270.292C361.271 269.828 362.146 269.075 362.866 267.816L373.025 250.067L373.026 250.066C373.975 248.409 374.42 246.655 374.423 244.936L374.416 244.607C374.353 242.963 373.878 241.311 372.991 239.78L372.988 239.776L334.984 173.949C332.684 169.979 329.988 167.343 326.969 165.767Z"],
  ],
  "msrc-3-1": [
    [1, "M315.17 154.451C321.08 153.968 326.506 154.855 331.31 157.359C335.975 159.786 339.814 163.6 342.868 168.711L343.161 169.209L343.162 169.211L381.175 235.038L381.178 235.042C382.927 238.081 383.858 241.468 383.871 244.924V244.935C383.871 248.302 383.017 251.682 381.234 254.789L381.235 254.79L371.076 272.54L371.073 272.544C369.39 275.472 367.152 277.484 364.628 278.766L364.624 278.769C362.182 280.003 359.602 280.504 357.182 280.626L357.183 280.627L335.454 281.751L335.455 281.752C331.808 281.942 328.599 281.071 325.86 279.338L325.858 279.337C322.945 277.491 320.787 274.775 319.203 271.702L319.202 271.699C317.401 268.197 316.749 264.446 317.747 260.835L317.748 260.826C318.722 257.34 321.106 254.445 324.644 252.337L324.646 252.335L341.46 242.335C343.927 240.862 344.655 239.752 344.83 238.954C345.046 237.963 344.8 236.093 342.801 232.605L342.8 232.604L323.608 199.08C322.365 196.91 321.014 195.29 319.587 194.195C318.246 193.167 316.744 192.544 314.988 192.357C312.229 192.081 309.657 192.653 307.312 193.9L307.31 193.902C304.696 195.289 302.274 197.548 300.214 200.512L300.211 200.515L252.601 268.816L252.599 268.818C250.315 272.088 247.535 274.496 244.369 276.11L244.368 276.111C240.982 277.835 237.295 278.571 233.537 278.571H183.537C180.477 278.571 177.249 277.854 173.811 276.737L173.806 276.735C170.486 275.65 166.801 274.139 162.674 272.388C155.327 269.269 148.601 267.639 142.631 267.271C136.49 266.894 131.157 267.854 126.714 269.899L126.713 269.9L109.399 277.862L109.391 277.866C106.15 279.344 102.983 280.005 99.9964 279.417L99.9905 279.416C96.7468 278.77 94.2778 276.807 92.5286 273.99L92.5276 273.987C89.8335 269.637 89.0239 265.206 89.9856 260.577L89.9876 260.566C90.8989 256.259 93.3133 252.077 96.6605 247.783L106.859 234.687L107.786 233.507C109.979 230.745 112.391 227.956 115.216 225.367C118.493 222.361 122.303 219.613 126.961 217.467L127.583 217.171C130.641 215.678 132.876 213.97 134.33 212.071L134.337 212.062C135.804 210.161 136.611 207.868 136.568 204.991V204.982C136.558 204.21 136.511 203.463 136.428 202.742C136.427 202.737 136.427 202.732 136.426 202.727C136.098 199.757 135.237 198.078 134.326 197.185L134.169 197.04C133.357 196.328 132.115 195.845 130.158 195.876L130.157 195.875C129.782 195.884 129.372 195.911 128.924 195.963L128.913 195.964C123.542 196.564 118.935 198.653 115.202 202.311C111.575 205.885 108.603 211.122 106.658 218.319C105.762 221.665 104.533 224.982 102.551 228.034L102.547 228.04C100.498 231.181 97.7304 233.915 93.886 236.042C93.8497 236.062 93.8128 236.082 93.7757 236.1L93.6507 236.163C90.9754 237.638 88.7485 238.868 86.9603 239.999C85.1266 241.158 84.0285 242.048 83.4495 242.763L83.1956 243.083L83.1897 243.09C81.5023 245.186 79.3656 247.906 76.0462 249.498L76.0452 249.497C74.4016 250.286 72.4501 251.792 70.5306 254.37C68.8684 256.605 67.2642 259.614 65.9378 263.573C64.8003 267.016 63.5176 270.128 61.6975 272.374L61.6985 272.375C60.611 273.717 59.2929 274.844 57.6673 275.537C56.0229 276.238 54.258 276.412 52.4212 276.14C48.2828 275.529 45.2881 273.149 43.6966 269.397L43.6936 269.389C42.3215 266.129 42.1573 262.035 42.7971 257.489L44.761 243.447C45.09 241.068 45.5503 238.457 46.3401 235.767V235.765C47.144 233.032 48.2962 230.201 50.0198 227.45C51.6302 224.869 52.997 222.39 53.9456 219.851L53.9466 219.846C54.8878 217.34 55.4579 214.779 55.4856 212.039V212.036C55.5501 206.152 56.2067 201.304 58.9261 197.614L58.93 197.609C61.8131 193.714 66.269 191.981 72.1536 191.099L72.8294 190.99C76.1997 190.412 79.3853 189.375 82.1722 187.892L82.177 187.889C84.9251 186.435 87.2827 184.544 89.0843 182.267C93.4791 176.696 98.6427 172.298 104.762 169.464L104.764 169.463C110.909 166.622 117.832 165.451 125.631 166.162C128.128 166.386 130.268 166.548 132.169 166.481H132.178C133.932 166.425 135.313 166.164 136.423 165.668C138.653 164.665 140.794 163.999 143.275 164.115H143.278C145.72 164.231 147.984 165.109 150.496 166.509H150.498C156.448 169.828 160.307 175.034 161.85 182.698L161.851 182.699C163.242 189.622 162.706 198.522 160.367 209.943L160.135 211.056C159.486 214.119 159.268 216.396 159.337 218.093C159.407 219.66 159.709 220.653 160.067 221.34C161.669 224.382 163.393 227.007 165.197 229.3L165.885 230.147C167.503 232.095 169.201 233.841 170.955 235.42L171.369 235.779C173.138 237.258 174.573 237.758 176.123 238.167L176.848 238.352L176.864 238.356C178.168 238.691 179.771 239.09 181.424 239.925C183.127 240.785 184.777 242.046 186.456 244.006L186.66 244.233C187.109 244.72 187.395 244.909 187.619 245.017C187.629 245.022 187.639 245.028 187.65 245.033C188.005 245.21 188.536 245.383 189.535 245.58L189.992 245.666L189.997 245.667C190.989 245.847 192.469 245.651 194.653 244.606L195.095 244.387C197.329 243.25 199.931 241.415 202.93 238.861L202.94 238.852C204.385 237.633 206.114 236.864 207.897 236.554L207.901 236.553C209.677 236.248 211.576 236.385 213.327 237.029C215.098 237.671 216.546 238.758 217.64 240.092C217.645 240.098 217.65 240.105 217.656 240.111C218.754 241.473 219.504 243.077 219.897 244.757L219.981 245.065C220.162 245.644 220.414 245.987 220.685 246.218L220.823 246.326L220.835 246.335C221.338 246.697 222.283 247.059 223.916 247.139C226.737 247.268 229.053 246.78 231.016 245.777C233.022 244.753 234.881 243.105 236.59 240.702L236.594 240.697L283.133 175.528C287.695 169.134 292.67 164.244 297.856 160.775L297.858 160.774C303.501 157.009 309.376 154.922 315.17 154.451ZM326.935 165.779C323.914 164.213 320.278 163.557 315.936 163.913C311.84 164.249 307.492 165.749 303.132 168.662L303.131 168.663C298.983 171.432 294.817 175.489 290.85 181.043L290.849 181.042L244.323 246.201L244.322 246.2C241.82 249.717 238.85 252.437 235.336 254.231L235.332 254.233C231.769 256.046 227.824 256.817 223.483 256.615H223.478C220.427 256.468 217.601 255.7 215.296 254.053L215.29 254.05C212.924 252.351 211.365 249.932 210.65 246.924C210.647 246.912 210.645 246.901 210.642 246.889C210.565 246.549 210.426 246.282 210.287 246.109C210.233 246.046 210.19 246.007 210.161 245.986C210.133 245.965 210.115 245.959 210.108 245.956C210.096 245.952 210.085 245.947 210.074 245.943C209.966 245.903 209.766 245.869 209.502 245.907C209.238 245.959 209.116 246.042 209.084 246.069L209.078 246.074C205.445 249.162 202.009 251.591 198.757 253.158L198.748 253.162C195.269 254.825 191.755 255.627 188.308 254.999L188.304 254.998C186.654 254.695 185.151 254.335 183.722 253.673L183.437 253.536C181.803 252.726 180.517 251.646 179.26 250.174C177.713 248.382 176.503 248.069 174.506 247.552C171.846 246.876 168.589 246.046 164.615 242.477L163.731 241.67C161.678 239.752 159.682 237.606 157.766 235.181L157.765 235.18C155.579 232.411 153.537 229.295 151.671 225.763L151.669 225.76C150.59 223.71 149.982 221.33 149.861 218.493V218.487C149.752 215.828 150.07 212.742 150.847 209.079L150.848 209.078C153.156 198.217 153.621 190.52 152.649 185.091L152.55 184.572C151.551 179.604 149.282 176.691 145.879 174.798L145.871 174.793C144.175 173.842 143.334 173.62 142.817 173.591C142.368 173.573 141.706 173.697 140.281 174.326L140.28 174.325C137.763 175.455 135.121 175.867 132.487 175.96L132.486 175.959C129.991 176.051 127.376 175.841 124.779 175.609H124.775C118.564 175.046 113.295 175.971 108.751 178.081L108.742 178.086C104.163 180.194 100.135 183.58 96.5296 188.143C93.846 191.564 90.4141 194.257 86.6136 196.278C82.6076 198.408 78.1459 199.8 73.5667 200.482C69.0534 201.165 67.3481 202.175 66.5589 203.245L66.5579 203.244C65.5903 204.559 65.0205 207.01 64.9671 212.122V212.126C64.9199 216.143 64.1053 219.789 62.8352 223.183L62.8323 223.191C61.5776 226.518 59.8835 229.583 58.0667 232.483L58.0657 232.482C56.869 234.393 56.0375 236.402 55.4417 238.438L55.4427 238.439C54.831 240.536 54.4514 242.661 54.1526 244.762L52.1897 258.8L52.1887 258.8C51.7032 262.313 51.9287 264.514 52.4309 265.716C52.6698 266.275 52.9683 266.562 53.5257 266.694L53.7825 266.742L53.7991 266.744C53.8995 266.759 53.9485 266.754 53.9593 266.753H53.9622C53.963 266.752 53.9924 266.74 54.0501 266.693C54.1021 266.65 54.1746 266.579 54.2688 266.467C54.2873 266.443 54.3042 266.418 54.3235 266.394C55.107 265.433 55.9444 263.603 56.9446 260.592L56.9456 260.589C58.5706 255.714 60.6286 251.789 62.9261 248.717L63.4544 248.027C66.1105 244.654 69.045 242.343 71.9251 240.95L71.9378 240.943C73.113 240.381 74.1718 239.157 75.8001 237.138L76.0472 236.83L76.053 236.822C77.4733 235.058 79.4151 233.573 81.5667 232.187C83.7283 230.795 86.3189 229.372 89.139 227.817L89.2864 227.734L89.3147 227.719C91.7122 226.403 93.3753 224.756 94.5989 222.868L94.6038 222.86C95.8783 220.908 96.7652 218.571 97.5013 215.858C99.8158 207.26 103.555 200.467 108.558 195.546L108.562 195.543C113.903 190.307 120.483 187.364 127.862 186.53L127.884 186.527C128.564 186.456 129.279 186.407 130.005 186.394H130.012C134.249 186.332 138.065 187.568 140.968 190.416C143.59 192.986 145.14 196.545 145.751 200.819L145.862 201.684L145.863 201.692C145.967 202.658 146.037 203.705 146.049 204.842L146.053 205.311C146.041 210.141 144.563 214.32 141.875 217.831L141.873 217.834C139.179 221.344 135.388 224.019 130.945 226.076C127.3 227.762 124.283 229.919 121.629 232.355C118.923 234.842 116.59 237.619 114.333 240.503L114.334 240.504L104.133 253.614L104.132 253.613C101.329 257.217 99.785 260.084 99.2776 262.512C98.8602 264.506 99.1107 266.417 100.33 268.556L100.587 268.987L100.591 268.994C101.075 269.776 101.458 269.998 101.72 270.076L101.825 270.101L101.829 270.102C102.371 270.21 103.472 270.144 105.434 269.238L105.439 269.236L122.763 261.274C128.747 258.526 135.641 257.339 143.201 257.8C150.361 258.239 158.148 260.165 166.386 263.659C170.427 265.371 173.807 266.754 176.744 267.707L176.753 267.71L177.785 268.034C180.122 268.739 181.991 269.079 183.537 269.079H233.537C235.988 269.079 238.178 268.612 240.057 267.657L240.381 267.484C241.998 266.593 243.5 265.279 244.81 263.393L244.812 263.388L292.423 195.089C295.134 191.196 298.515 187.92 302.487 185.722L302.873 185.513C306.779 183.439 311.189 182.44 315.933 182.927C319.506 183.281 322.654 184.597 325.35 186.663C327.971 188.661 330.102 191.313 331.85 194.368L351.043 227.882L351.044 227.884C353.735 232.589 354.986 236.9 354.1 240.97C353.182 245.225 350.185 248.187 346.3 250.497L346.299 250.496L329.486 260.496C327.794 261.502 327.124 262.532 326.893 263.362L326.848 263.542C326.664 264.385 326.77 265.539 327.474 267.023L327.634 267.346L327.637 267.352C328.555 269.136 329.592 270.387 330.715 271.164L330.941 271.313L330.959 271.325C331.983 271.98 333.275 272.365 334.973 272.278L356.693 271.153H356.696C358.101 271.082 359.322 270.812 360.321 270.305L360.662 270.118C361.452 269.645 362.201 268.931 362.832 267.829L372.991 250.079L372.992 250.078C373.941 248.421 374.387 246.668 374.389 244.949L374.381 244.62C374.319 242.976 373.843 241.324 372.957 239.794L372.955 239.79L334.951 173.963C332.65 169.992 329.955 167.355 326.935 165.779Z"],
  ],
}

// The event's track shape (or, as in the app for a track with no icon,
// a checkered flag) `width` wide with its top left at (x0, y0), in the
// colors `look` gives: { track, ghost, placeholder }. Returns its height.
// Shared by the Small and Medium cards' backgrounds.
function drawTrackShape(ctx, trackId, x0, y0, width, look) {
  const win = TRACK_SHAPE_WINDOW
  const scale = width / win.w
  const height = win.h * scale
  const shape = TRACK_SHAPES[trackId]
  if (shape) {
    for (const [opacity, d] of shape) {
      ctx.setFillColor(opacity < 1 ? look.ghost : look.track)
      ctx.addPath(svgPathToPath(d, scale, win.x - x0 / scale, win.y - y0 / scale))
      ctx.fillPath()
    }
  } else {
    // The app's placeholder: the checkered flag, 56.25% of the icon's
    // size, centered.
    const [vw, vh] = CHECKERED_FLAG_VIEWBOX
    const flagW = 437 * 0.5625 * scale
    const flagScale = flagW / vw
    const ox = -(x0 + (width - flagW) / 2) / flagScale
    const oy = -(y0 + (height - vh * flagScale) / 2) / flagScale
    ctx.setFillColor(look.placeholder)
    for (const d of CHECKERED_FLAG_PATHS) {
      ctx.addPath(svgPathToPath(d, flagScale, ox, oy))
      ctx.fillPath()
    }
  }
  return height
}

// The designs fade the track along a diagonal — all there at its top
// right, gone by its bottom left. The fade's progress across the
// shape's box (u, v from 0 to 1) is t = a·u + b·v + c: the first row of
// the Figma fill's gradientTransform (`fade`, see FEATURED_TRACK).
// DrawContext has no gradients, so the fade is drawn over the shape:
// the ground's own color (`groundAt(y, alpha)`) at alpha t, in 1pt
// cells on whole points (whole pixels at any screen scale), so no two
// overlap — an overlap doubles the alpha and shows as a line. A row's
// run of cells at the same alpha is one rect.
//
// It also clips: outside the shape's box the cells are the ground,
// opaque. Some shapes' other configuration runs past the window the app
// crops them to (TRACK_SHAPE_WINDOW), and the canvas here is the whole
// widget, so nothing else would cut it off.
// Only rows `from` to `to` (a band of the canvas: with more than one
// track, each fades and clips its own).
function fadeTrackDiagonally(ctx, x0, y0, width, height, W, from, to, groundAt, fade) {
  const { a, b, c } = fade
  const alphaAt = (x, y) => {
    const u = (x + 0.5 - x0) / width
    const v = (y + 0.5 - y0) / height
    if (u < 0 || u > 1 || v < 0 || v > 1) return 1
    return Math.round(Math.max(0, Math.min(1, a * u + b * v + c)) * 100) / 100
  }
  for (let y = from; y < to; y++) {
    let x = 0
    while (x < W) {
      const alpha = alphaAt(x, y)
      let end = x + 1
      while (end < W && alphaAt(end, y) === alpha) end++
      if (alpha > 0) {
        ctx.setFillColor(groundAt(y, alpha))
        ctx.fillRect(new Rect(x, y, end - x, 1))
      }
      x = end
    }
  }
}

// Where each design puts the track, as fractions of the widget (x and w
// of its width, y of its height), the fade of its Figma fill, and how
// strong it is. HPDE file: Small 2068:7914, Medium 2069:8118, Large
// with one event 2069:8166, and with more 2069:8066 / 2069:8079 (one
// beside each event, Small's size and fade).
const SMALL_FADE = { a: -0.9994, b: 0.7678, c: 0.6786 }
const FEATURED_TRACK = {
  small: [{ x: 0.35, y: 0.138, w: 0.772, fade: SMALL_FADE }],
  medium: [{ x: 0.3184, y: 0.1658, w: 0.7155, fade: { a: -1.0417, b: 0.5806, c: 0.9411 } }],
  largeOne: [{ x: 0.0872, y: 0.5647, w: 0.9722, fade: { a: -1.4848, b: 0.4671, c: 0.7276 }, faint: true }],
  largeMany: [
    { x: 0.6574, y: 0.2153, w: 0.3656, fade: SMALL_FADE },
    { x: 0.6574, y: 0.5796, w: 0.3656, fade: SMALL_FADE },
  ],
}
// A widget's background image fills it (scaled to cover, centered), so
// each family's is drawn once, at its largest widget's size (a Pro
// Max's), and scales to the others: Small's are all square; Medium's
// and Large's differ in shape by under 4%, a few points cropped off two
// edges.
const FEATURED_GROUND_SIZE = { small: [170, 170], medium: [364, 170], large: [364, 382] }

// The card's background: the ground, then each track shape (`tracks`,
// one per placement), running off the right edge, faded along its
// diagonal. The shapes go down first; then each fades and clips its own
// band of rows, the bands meeting halfway between tracks.
function featuredGroundImage(family, tracks, F) {
  if (typeof DrawContext === "undefined") return null
  const [W, H] = FEATURED_GROUND_SIZE[family]
  const ctx = new DrawContext()
  ctx.size = new Size(W, H)
  ctx.respectScreenScale = true
  ctx.opaque = true
  const groundAt = (y, alpha) => featuredGround((y + 0.5) / H, alpha)
  for (let y = 0; y < H; y++) {
    ctx.setFillColor(groundAt(y, 1))
    ctx.fillRect(new Rect(0, y, W, 1))
  }
  const boxes = tracks.map(({ trackId, place }) => {
    const x0 = place.x * W
    const y0 = place.y * H
    const width = place.w * W
    const look = place.faint
      ? { track: F.trackFaint, ghost: F.trackFaintGhost, placeholder: F.trackFaint }
      : { track: F.track, ghost: F.trackGhost, placeholder: F.track }
    const height = drawTrackShape(ctx, trackId, x0, y0, width, look)
    return { x0, y0, width, height, fade: place.fade }
  })
  boxes.forEach((b, i) => {
    const from = i === 0 ? 0 : Math.round((boxes[i - 1].y0 + boxes[i - 1].height + b.y0) / 2)
    const to = i === boxes.length - 1 ? H : Math.round((b.y0 + b.height + boxes[i + 1].y0) / 2)
    fadeTrackDiagonally(ctx, b.x0, b.y0, b.width, b.height, W, from, to, groundAt, b.fade)
  })
  return ctx.getImage()
}

// ----- upcoming-events header -----
//
// Title on the left (with a "Track days ahead" subtitle on Large), the
// checkered flag in the top right corner.
const UPCOMING_HEADER_FLAG_WIDTH = { large: 30, medium: 24, small: 22 }

// `topPad` is extra top clearance ADDED to the widget's own root 10pt
// setPadding — the title sat visibly too close to the top edge at just
// 10pt on-device, especially on Large where the 18pt bold title crowds
// the rounded top corner. `gap` is the gap between the header and
// whatever renders below it (the first card, or the "No upcoming
// events" message in the zero state).
const UPCOMING_HEADER_TOKENS = {
  large: { topPad: 6, gap: 14 },
  medium: { topPad: 2, gap: 8 },
  small: { topPad: 2, gap: 8 },
}

function upcomingHeaderTier(family) {
  if (family === "large" || family === "extraLarge") return "large"
  if (family === "small") return "small"
  return "medium"
}

// Wrapped in the same left/right margin the countdown cards use
// (COUNTDOWN_MARGIN — the SAME constant, not a copy) so the header's
// title and flag structurally can't drift out of alignment with the
// card edges below it.
function renderUpcomingHeader(w, p, family) {
  const tier = upcomingHeaderTier(family)
  const h = UPCOMING_HEADER_TOKENS[tier]
  if (h.topPad > 0) w.addSpacer(h.topPad)
  const outer = w.addStack()
  outer.addSpacer(COUNTDOWN_MARGIN)
  const row = outer.addStack()

  if (tier === "large") {
    // Flag in the corner: top-aligned with the title, not centered on
    // the title + subtitle pair.
    row.topAlignContent()
    const col = row.addStack()
    col.layoutVertically()
    // A VStack's real default cross-axis alignment is center, not
    // leading — without this, "Track days ahead" (narrower) renders
    // centered under "Upcoming HPDE events" (wider).
    col.topAlignContent()
    const title = col.addText("Upcoming HPDE events")
    title.font = rBoldFont(18)
    title.textColor = p.fg
    title.lineLimit = 1
    col.addSpacer(2)
    const subtitle = col.addText("Track days ahead")
    subtitle.font = rFont(13)
    subtitle.textColor = p.muted
    subtitle.lineLimit = 1
  } else {
    row.centerAlignContent()
    const title = row.addText(tier === "small" ? "Next HPDE" : "Upcoming HPDE events")
    title.font = rMediumFont(13)
    title.textColor = p.fg
    title.lineLimit = 1
  }
  row.addSpacer()
  addCheckeredFlag(row, p.fg, UPCOMING_HEADER_FLAG_WIDTH[tier])

  outer.addSpacer(COUNTDOWN_MARGIN)
  w.addSpacer(h.gap)
}

// One to three countdown cards (Medium always gets one; Large stacks
// up to three), plus a "N more upcoming" footer for whatever didn't fit.
function renderCountdownState(w, p, upcoming, footer) {
  const family = config.widgetFamily || "medium"
  // Small and Medium are each one featured card, with no room for a
  // "more upcoming" footer.
  if (family === "small" || family === "medium") {
    renderFeaturedCountdown(w, upcoming.items[0], footer, family)
    return
  }

  renderLargeCountdown(w, upcoming, footer)
}

// Small and Medium: the featured card as their Figma designs have it
// (HPDE file, nodes 2068:7908 and 2069:8111) — Medium is Small, wider,
// with a bigger track. The track shape sits behind the date in the top
// right, in the widget's background image with the ground (see
// featuredGroundImage). Over it: the month over the day, left-aligned;
// the name over the organizer beside a red bar; the badge at the
// bottom. The day, name and badge are a weight heavier than the
// design's (#204 review).
// Each row ends in a flex spacer, which pins it to the left edge.
function renderFeaturedCountdown(w, next, footer, family) {
  const F = FEATURED_PALETTE
  const t = COUNTDOWN_TOKENS.featured
  const padV = footer ? t.padWithFooter : t.pad
  w.setPadding(padV, t.pad, padV, t.pad)
  setFeaturedGround(w, family, [next], FEATURED_TRACK[family])

  const dateRow = w.addStack()
  addFeaturedDate(dateRow, next, F, t)
  dateRow.addSpacer()

  w.addSpacer(t.dateGap)
  const block = w.addStack()
  block.centerAlignContent()
  // The organizer, as the design has it (the track, if there's none).
  addFeaturedInfo(block, [next.event.organizer || next.event.track], next, F, t)
  block.addSpacer()

  w.addSpacer()
  addFeaturedBadge(w, next, F, t)
}

// Large: its designs have a header, then either one event with its
// badge above it and a big faint track across the bottom, or two
// events, each with its badge under it and its own track beside it,
// and "N more upcoming events" at the bottom. Flex spacers between the
// events spread them down the widget.
function renderLargeCountdown(w, upcoming, footer) {
  const F = FEATURED_PALETTE
  const t = COUNTDOWN_TOKENS.large
  const { items, total } = upcoming
  const one = items.length === 1
  const padV = footer ? t.padWithFooter : t.pad
  w.setPadding(padV, t.pad, padV, t.pad)
  setFeaturedGround(w, "large", items, one ? FEATURED_TRACK.largeOne : FEATURED_TRACK.largeMany)

  const head = w.addStack()
  head.centerAlignContent()
  const title = head.addText(one ? "Upcoming track event" : "Upcoming track events")
  title.font = rFont(t.headerFont)
  title.textColor = F.subtle
  title.lineLimit = 1
  head.addSpacer()
  // Both versions have the flag (the one-event design left it out; the
  // owner asked for it back).
  addCheckeredFlag(head, F.flag, t.flagWidth)

  if (one) {
    w.addSpacer(t.headerGap)
    addFeaturedBadge(w, items[0], F, t)
    w.addSpacer(t.badgeGap)
    addLargeEvent(w, items[0], F, t)
    w.addSpacer()
    return
  }

  for (const next of items) {
    w.addSpacer()
    addLargeEvent(w, next, F, t)
    w.addSpacer(t.badgeTop)
    const badgeRow = w.addStack()
    badgeRow.addSpacer(t.dateColW)
    addCountdownPill(badgeRow, daysUntil(next.day.date), F.badgeBg, F.badgeFg, t)
    badgeRow.addSpacer()
  }
  w.addSpacer()
  const remaining = total - items.length
  if (remaining > 0) {
    const row = w.addStack()
    row.addSpacer()
    const more = row.addText(`${remaining} more upcoming event${remaining === 1 ? "" : "s"}`)
    more.font = rFont(t.footerFont)
    more.textColor = F.subtle
    more.lineLimit = 1
    row.addSpacer()
  }
}

// One of Large's events: the date in its column, then the bar beside
// the name, organizer and track.
function addLargeEvent(w, next, F, t) {
  const row = w.addStack()
  row.topAlignContent()
  addFeaturedDate(row, next, F, t, t.dateColW)
  addFeaturedInfo(row, [next.event.organizer, next.event.track], next, F, t)
  row.addSpacer()
}

// The red month over the day, left-aligned. With `width`, the column is
// that wide: its last child is a 1pt-tall empty strut at that width (a
// VStack is as wide as its widest child), so names line up whatever
// the date.
function addFeaturedDate(parent, next, F, t, width) {
  const date = parent.addStack()
  date.layoutVertically()
  date.topAlignContent()
  const [, m, d] = next.day.date.split("-").map(Number)
  const month = date.addText(MONTH_ABBR[m - 1])
  month.font = rMediumFont(t.monthFont)
  month.textColor = F.accent
  month.lineLimit = 1
  const day = date.addText(String(d))
  day.font = rBoldFont(t.dayFont)
  day.textColor = F.fg
  day.lineLimit = 1
  if (width) {
    const strut = date.addStack()
    strut.size = new Size(width, 1)
  }
}

// The red bar beside the name and, under it, each of `lines` that's
// there (white at 60%).
function addFeaturedInfo(parent, lines, next, F, t) {
  const bar = parent.addStack()
  bar.size = new Size(t.barW, t.barH)
  bar.backgroundColor = F.accent
  bar.cornerRadius = 1
  parent.addSpacer(t.barGap)
  const col = parent.addStack()
  col.layoutVertically()
  col.topAlignContent()
  const title = col.addText(next.event.name)
  title.font = rSemiboldFont(t.titleFont)
  title.textColor = F.fg
  title.lineLimit = 1
  for (const line of lines.filter(Boolean)) {
    col.addSpacer(t.rowGap)
    const text = col.addText(line)
    text.font = rFont(t.rowFont)
    text.textColor = F.subtle
    text.lineLimit = 1
  }
}

// The badge on a row of its own, at the left.
function addFeaturedBadge(w, next, F, t) {
  const row = w.addStack()
  addCountdownPill(row, daysUntil(next.day.date), F.badgeBg, F.badgeFg, t)
  row.addSpacer()
}

const MONTH_ABBR = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

// "in 9 days": a solid pill, as the designs have it.
function addCountdownPill(row, days, bg, fg, t) {
  const pill = row.addStack()
  pill.backgroundColor = bg
  pill.cornerRadius = 100
  pill.setPadding(t.pillPadV, t.pillPadH, t.pillPadV, t.pillPadH)
  pill.centerAlignContent()
  const label = pill.addText(`in ${days} ${pluralize(days, "day")}`)
  label.font = rSemiboldFont(t.pillFont)
  label.textColor = fg
  label.lineLimit = 1
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

// ---------- notifications ----------
//
// Model: every widget refresh (from every widget instance on this device)
// merges each live instance's filter + lead time and rewrites the full
// pending-notification set for the app. The merge uses one global identifier
// namespace `hpde:<sessionKey>`, so any refresh converges to the same end
// state regardless of order — two widgets covering the same session never
// produce duplicate alerts. Cross-instance merge rules:
//
//   - A session is scheduled if ANY live instance's filter includes its
//     group (or its filter is empty, i.e. "notify for all groups"). All-
//     drivers events (activities without a run-group tag: meetings, lunch,
//     etc.) are always scheduled, regardless of any instance's filter.
//   - Its lead time is the MAX across the instances that want it, so the
//     earliest warning wins.
//
// Instance state lives in `hpde-notif-state.json` next to the manifest
// cache. Each instance keys itself by a hash of its parameter string; an
// entry ages out after NOTIF_STALE_INSTANCE_DAYS without a refresh, which
// is how a removed widget stops contributing.

function paramHash(source) {
  let h = 5381
  const s = String(source == null ? "" : source)
  for (let i = 0; i < s.length; i++) {
    h = (((h << 5) + h) + s.charCodeAt(i)) >>> 0
  }
  return h.toString(36)
}

function slug(s) {
  return String(s == null ? "" : s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "activity"
}

function activityDate(dateStr, timeHhmm) {
  const [y, m, d] = String(dateStr).split("-").map(Number)
  const [h, mm] = String(timeHhmm).split(":").map(Number)
  return new Date(y, m - 1, d, h, mm, 0, 0)
}

function loadNotifState() {
  try {
    const fm = getFm()
    const path = fm.joinPath(fm.documentsDirectory(), NOTIF_STATE_FILENAME)
    if (fm.fileExists(path)) {
      const parsed = JSON.parse(fm.readString(path))
      if (parsed && typeof parsed === "object") return parsed
    }
  } catch (_) {}
  return { instances: {} }
}

function saveNotifState(state) {
  try {
    const fm = getFm()
    const path = fm.joinPath(fm.documentsDirectory(), NOTIF_STATE_FILENAME)
    fm.writeString(path, JSON.stringify(state))
  } catch (_) {}
}

// Collect one notification target per (activity × group) or per all-drivers
// activity in the future. Each target carries enough context to build its
// title/body and to compute a follow-up hint.
function collectNotifTargets(manifest, now) {
  const targets = []
  const nowMs = now.getTime()
  for (const event of (manifest && manifest.events) || []) {
    for (const day of event.days || []) {
      const activities = day.activities || []
      for (let i = 0; i < activities.length; i++) {
        const a = activities[i]
        if (!a || a.type === "break" || !a.time) continue
        const when = activityDate(day.date, a.time)
        if (when.getTime() <= nowMs) continue
        const keyBase = `${event.id}:${day.date}:${a.time}`
        if (a.type === "session") {
          for (const gid of (a.onTrack || [])) {
            targets.push({
              event, day, activityIdx: i, activity: a,
              kind: "onTrack", groupId: gid, when,
              sessionKey: `${keyBase}:sess:onTrack:${gid}`,
            })
          }
          for (const gid of (a.inClass || [])) {
            targets.push({
              event, day, activityIdx: i, activity: a,
              kind: "inClass", groupId: gid, when,
              sessionKey: `${keyBase}:sess:inClass:${gid}`,
            })
          }
        } else {
          targets.push({
            event, day, activityIdx: i, activity: a,
            kind: "all", groupId: null, when,
            sessionKey: `${keyBase}:gen:${slug(a.label)}`,
          })
        }
      }
    }
  }
  return targets
}

function findFollowUp(target) {
  if (target.kind === "all") return null
  const activities = target.day.activities || []
  const gid = target.groupId
  for (let j = target.activityIdx + 1; j < activities.length; j++) {
    const a = activities[j]
    if (!a || a.type !== "session" || !a.time) continue
    const inTrack = (a.onTrack || []).includes(gid)
    const inClass = (a.inClass || []).includes(gid)
    if (!inTrack && !inClass) continue
    const followKind = inTrack ? "onTrack" : "inClass"
    if (followKind === target.kind) return null
    const nextWhen = activityDate(target.day.date, a.time)
    const gapMin = (nextWhen.getTime() - target.when.getTime()) / 60000
    if (gapMin <= 0 || gapMin > NOTIF_FOLLOW_WINDOW_MIN) return null
    return { kind: followKind, time: a.time }
  }
  return null
}

function groupLabel(event, groupId) {
  const g = ((event && event.runGroups) || []).find(x => x.id === groupId)
  return (g && g.label) || groupId
}

// Colored circle emoji per known run-group id, so a notification's title
// reads as "🟠 Orange · in 10m" at glance instead of a generic Scriptable
// braces alert. Ids not in this map (e.g. some future "Aqua" group) get
// no prefix — safer than picking a wrong color.
const GROUP_EMOJI = {
  red: "🔴",
  orange: "🟠",
  yellow: "🟡",
  green: "🟢",
  blue: "🔵",
  purple: "🟣",
  black: "⚫",
  white: "⚪",
  brown: "🟤",
}

function groupEmoji(groupId) {
  return GROUP_EMOJI[String(groupId || "").toLowerCase()] || ""
}

function formatTimeWithAmPm(hhmm) {
  return `${formatTime12(hhmm)} ${formatAmPm(hhmm)}`
}

function buildNotifContent(target, leadMinutes) {
  const timeStr = formatTimeWithAmPm(target.activity.time)
  if (target.kind === "all") {
    const label = target.activity.label || "Activity"
    // Lunch is the one all-drivers activity type that carries its own
    // recognizable icon — everything else stays plain so the group's
    // colored circle keeps its "this one's yours" visual weight.
    const prefix = target.activity.type === "lunch" ? "🥙 " : ""
    const body = target.activity.subtitle
      ? `${timeStr} · ${target.activity.subtitle}`
      : timeStr
    return { title: `${prefix}${label} · in ${leadMinutes}m`, body }
  }
  const g = groupLabel(target.event, target.groupId)
  const emoji = groupEmoji(target.groupId)
  const titlePrefix = emoji ? `${emoji} ${g}` : g
  const verb = target.kind === "onTrack" ? "On track at" : "Classroom at"
  let body = `${verb} ${timeStr}`
  const follow = findFollowUp(target)
  if (follow) {
    const fTime = formatTimeWithAmPm(follow.time)
    const fLabel = follow.kind === "onTrack" ? "On track" : "Classroom"
    body += ` · ${fLabel} follows at ${fTime}.`
  }
  return { title: `${titlePrefix} · in ${leadMinutes}m`, body }
}

function computeMergedSpecs(manifest, state, now) {
  const targets = collectNotifTargets(manifest, now)
  const cutoffMs = now.getTime() - NOTIF_STALE_INSTANCE_DAYS * 86400 * 1000
  const liveInstances = []
  for (const inst of Object.values(state.instances || {})) {
    if (!inst || typeof inst !== "object") continue
    const t = Date.parse(inst.lastRefreshed || "")
    if (isFinite(t) && t >= cutoffMs) liveInstances.push(inst)
  }
  const specs = []
  for (const target of targets) {
    let maxLead = -1
    for (const inst of liveInstances) {
      const groups = inst.groups || []
      const wants =
        target.kind === "all" ||
        groups.length === 0 ||
        groups.includes(target.groupId)
      if (wants) {
        const lead = Number.isFinite(inst.leadMinutes) ? inst.leadMinutes : DEFAULT_LEAD_MIN
        if (lead > maxLead) maxLead = lead
      }
    }
    if (maxLead < 0) continue
    const fireAt = new Date(target.when.getTime() - maxLead * 60 * 1000)
    if (fireAt.getTime() <= now.getTime()) continue
    const { title, body } = buildNotifContent(target, maxLead)
    specs.push({
      identifier: NOTIF_ID_PREFIX + target.sessionKey,
      title, body, fireAt,
    })
  }
  specs.sort((a, b) => a.fireAt.getTime() - b.fireAt.getTime())
  if (specs.length > NOTIF_MAX_PENDING) specs.length = NOTIF_MAX_PENDING
  return specs
}

async function cancelExistingHpdeNotifications() {
  if (typeof Notification === "undefined" || !Notification.allPending) return
  const pending = await Notification.allPending()
  const ids = []
  for (const n of (pending || [])) {
    if (n && typeof n.identifier === "string" &&
        n.identifier.indexOf(NOTIF_ID_PREFIX) === 0) {
      ids.push(n.identifier)
    }
  }
  if (ids.length > 0 && Notification.removePending) {
    await Notification.removePending(ids)
  }
}

async function scheduleSpecs(specs) {
  let scheduled = 0
  let denied = false
  for (const s of specs) {
    try {
      const n = new Notification()
      n.identifier = s.identifier
      n.title = s.title
      n.body = s.body
      n.threadIdentifier = NOTIF_THREAD_ID
      n.sound = NOTIF_SOUND
      n.openURL = SITE_URL
      // Scriptable's `deliveryDate` is READ-ONLY (it reports when the
      // notification actually fired). To schedule for a future moment
      // you must call setTriggerDate(); without it, `schedule()` fires
      // the notification immediately.
      n.setTriggerDate(s.fireAt)
      await n.schedule()
      scheduled++
    } catch (_) {
      // Permission denial or another scheduling failure. iOS won't
      // re-prompt after a "Don't Allow", so bail rather than repeat
      // the same failing call for every remaining spec.
      denied = true
      break
    }
  }
  return { scheduled, denied }
}

async function refreshNotifications(manifest, parsed) {
  if (typeof Notification === "undefined") return { scheduled: 0, denied: false }
  const now = new Date()
  const state = loadNotifState()
  if (!state.instances || typeof state.instances !== "object") state.instances = {}
  const hash = paramHash(parsed.rawParam)
  state.instances[hash] = {
    params: parsed.rawParam,
    groups: parsed.groups,
    leadMinutes: parsed.leadMinutes,
    lastRefreshed: now.toISOString(),
  }
  const cutoffMs = now.getTime() - NOTIF_STALE_INSTANCE_DAYS * 86400 * 1000
  for (const [k, v] of Object.entries(state.instances)) {
    const t = v && Date.parse(v.lastRefreshed || "")
    if (!isFinite(t) || t < cutoffMs) delete state.instances[k]
  }
  saveNotifState(state)

  const specs = computeMergedSpecs(manifest, state, now)
  try {
    await cancelExistingHpdeNotifications()
  } catch (_) {}
  return await scheduleSpecs(specs)
}

// ---------- entrypoint ----------

let widget
try {
  const data = await loadManifest()
  const parsedRaw = readWidgetParameter()
  // Fixture events (test-live) ship in the manifest at their natural
  // date and are only rewritten when the user opts in: `test` moves it
  // to today (for testing the populated view / notifications),
  // `test-upcoming` moves it into the future instead (for testing the
  // no-event-today countdown card). Real users' widgets are never
  // haunted by the Test Event this way.
  if (parsedRaw.flags && parsedRaw.flags["test-upcoming"]) {
    rewriteFixtures(data.manifest, "upcoming", parsedRaw.flags.testUpcomingDays, parsedRaw.flags.testUpcomingCount)
  } else if (parsedRaw.flags && parsedRaw.flags.test) {
    rewriteFixtures(data.manifest, "today")
  }
  const parsed = validateWidgetParameter(parsedRaw, data.manifest)
  let notifStatus = { scheduled: 0, denied: false }
  try {
    notifStatus = await refreshNotifications(data.manifest, parsed)
  } catch (_) {}
  widget = makeWidget(data, parsed, notifStatus)
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
