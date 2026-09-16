# PRD — Track day & car setup tracker

Issue: [#120](https://github.com/inko9nito/hpde/issues/120)
Status: Draft for review
Owner: @inko9nito

## 1. Summary

Grow the current HPDE schedule app into a **personal logbook** for track
days: per-event details, per-session notes, instructor feedback, the
service and parts history on the car, and links out to photos and
in-car video. Today the repo is a read-only day-of schedule; this turns
it into something you also look at *after* the event, and across
events.

The audience is the same one person the app already serves (Vera). We
are not building a multi-user platform, a marketplace, or a social
network. Fancier season-stats / lap-time / expense-tracking directions
from the referenced mocks are noted as future scope (§10) but explicitly
out of scope for the first iteration.

## 2. Problem

The current app answers "what's happening on track *right now*". It
doesn't answer:

- What did I do at the last event, and how did the car behave?
- What alignment / pressures / brake pads was I running on that day?
- What did my instructor tell me between sessions?
- Where's the video of session 3?
- When did I last change the brake fluid, and what was the bill?

Today that information lives in a mix of Notes app entries, camera
roll, receipts, and memory. It's hard to look up mid-event
("what pressures did I set here last time?") and impossible to search
across events.

## 3. Users & primary jobs-to-be-done

Single user: the car owner / driver. Two contexts:

1. **At the track** — glance at last visit's setup and notes; capture
   quick notes, tire pressures, instructor comments between sessions.
2. **Between events** — log the service that got done, part numbers and
   costs, attach a photo album / video link, review past events.

Non-goals: crew logins, team roles, sharing to other users, public
profile, ThePaddock-style social features.

## 4. Scope for v1

### In scope

- **Event object** that owns the existing schedule plus new metadata,
  notes, sessions, media links, and instructor feedback.
- **Session object** with its own notes and per-session data (tire
  pressures, one instructor-feedback field, one media link field).
- **Car** (single car for v1) with a **service log**: date, shop, work
  done, parts (with part numbers), cost.
- **Media links**: URL fields for a photo album (Google Photos /
  iCloud shared link) and one or more in-car video links (Garmin
  Catalyst share, YouTube, etc.). We store the link, not the media.
- **Read-only viewer UI** consistent with the current app: mobile-first,
  no login, no backend.
- **Data source stays git-committed** for v1 (see §7). Editing is done
  by committing to the repo, same as today's schedules.

### Out of scope for v1

- Multiple cars / garage of cars.
- Lap times, sector times, telemetry, timing-transponder integration.
- Season totals, wins/podiums, results.
- Expense/budget tracking beyond service costs.
- Track library with track maps for arbitrary tracks (we keep the
  existing per-event map image).
- Setup sheet (camber/toe/damper clicks). Tire pressures only for v1;
  full setup is a future add.
- In-app editing / forms / "Create Event" flow. Data entry is via the
  repo for v1.
- Sync, accounts, cloud storage.

## 5. Data model

Additive to `src/types.ts`. Existing `EventConfig` / `DaySchedule` /
`ScheduleEvent` stay unchanged; new fields are all optional so old
events keep working.

```ts
interface EventConfig {
  // …existing…
  notes?: string            // markdown, free-form, event-wide
  vitals?: EventVitals      // optional structured summary
  media?: MediaLink[]       // photo album, video links
  instructorFeedback?: string  // event-wide, if not per-session
}

interface EventVitals {
  weather?: string          // "72°F, dry, light wind"
  attended?: string[]       // who was there (instructor name, friends)
  carConfig?: string        // free-form: "R7s / +2mm ride height / …"
}

interface SessionEvent {
  // …existing…
  notes?: string            // markdown, per-session
  instructorFeedback?: string
  tirePressures?: TirePressures  // hot/cold snapshot
  media?: MediaLink[]
}

interface TirePressures {
  when: 'cold' | 'hot'
  fl?: number; fr?: number; rl?: number; rr?: number
  unit?: 'psi' | 'bar'   // default psi
}

interface MediaLink {
  kind: 'photos' | 'video' | 'other'
  label: string           // "Garmin Catalyst — Session 3"
  url: string
}

// New: per-car service history, lives outside EventConfig.
interface Car {
  id: string
  name: string            // "Vera's car"
  year?: number; make?: string; model?: string; trim?: string
  services: ServiceEntry[]
}

interface ServiceEntry {
  date: string            // ISO
  shop?: string           // "Redline Motorworks"
  summary: string         // one-line: "Brake pads + fluid flush"
  work?: string           // markdown, longer description
  parts?: Part[]
  laborCost?: number      // USD
  notes?: string
}

interface Part {
  name: string            // "Front pads — Ferodo DS2500"
  partNumber?: string
  qty?: number
  unitCost?: number
}
```

Storage: one markdown file per event (as today) with front-matter or
extended sections for the new fields, plus one markdown file per car
under `src/data/cars/` for the service history. Exact serialization
format is a v1 implementation choice — see §9.

## 6. Screens & UI

Extend the existing app rather than replace it. The current
schedule/map toggle becomes a small nav.

### 6.1 Event home (extends today's schedule view)

Above the timeline, add a collapsible **"Event vitals"** card
(weather, car config, who was there) and a **"Notes"** tab. Both hidden
if empty. Media links appear as a row of chips ("Photos", "Video —
Session 3") below the header.

### 6.2 Session card (extends today's `SessionCard`)

Tap-to-expand a session row to show:

- Notes (markdown)
- Instructor feedback (styled as a quote block)
- Tire pressures (small 4-corner grid, cold/hot label)
- Media links for this session

Sessions with no extra data render exactly as today. The presence of a
tiny indicator dot signals "there's more here".

### 6.3 Service log (new page)

Route: `#/car`. Reverse-chronological list of `ServiceEntry` rows —
date, shop, one-line summary, cost total. Tap to expand for the parts
table and long-form notes. Filter chips for common service categories
(brakes, tires, fluids, alignment) — derived, not stored.

Header shows the car name and (optional) year/make/model.

### 6.4 Navigation

Footer already has "iOS widget · Share". Add "Car" as a third link.
Event-picker in the header is unchanged. No bottom tab bar — this is
still a small app, not the 5-tab PitLedger layout.

## 7. Non-functional / architectural

- **Mobile-first**, same as today. All new UI must work on iPhone
  Safari at the width the app already targets.
- **No login, no backend, no analytics.**
- **Data stays in the repo.** For v1 the "app" is still a static site
  deployed from `main`; adding an event or a service entry is a commit.
  We are trading data-entry friction for zero infrastructure — see
  §9.1.
- **Backward compatible.** Every existing schedule file must render
  unchanged with the v1 code; new fields are all optional.
- **Widget is unaffected.** The iOS widget continues to consume the
  current schedule shape only.
- **Media privacy**: we store links only. We do not upload, proxy, or
  re-host photos or video.

## 8. Success criteria

For v1 to be "done":

1. Vera can open the app at a track and, within two taps of the event,
   see her notes and instructor feedback from the last time she was at
   that track.
2. Vera can pull up the service log and read the last three things
   that were done to the car, with part numbers.
3. Adding a new event with full notes + one session's feedback + one
   service entry is doable from a phone in <15 minutes of editing
   markdown — i.e. the file format is human-writable.
4. Every existing event on the site renders identically to before.

Explicit non-metrics: we are not counting DAU, retention, or session
length. This is a personal tool.

## 9. Open questions

### 9.1 Data-entry ergonomics

The current "edit a markdown file, commit, PR merges to main" loop
works fine for a per-event schedule that gets written once. It gets
worse when the same event gains **post-event** notes, then instructor
feedback added a day later, then a video link a week later, then a
service entry that references it. Options:

- **Keep git-committed markdown** (proposed for v1). Simple, private
  (repo is public — see 9.3), no infra. Friction: every edit is a
  commit from a phone.
- **Add a lightweight admin-only editor** (a `#/edit` page that writes
  to `localStorage` and generates the markdown to paste into a
  commit). Middle ground.
- **Real backend** (Supabase, Firebase, a private Gist). Solves entry,
  adds an auth story and infra to maintain.

Recommendation: ship v1 on markdown-in-repo; revisit if data entry
becomes the bottleneck.

### 9.2 One car vs. multiple

Mocks show a Garage of cars. Issue text implies one car (Vera's).
v1 assumes one car; the data model already namespaces by `Car.id` so
adding a picker later is additive.

### 9.3 Public repo, private data

The repo is public. Notes and instructor feedback are personal;
service costs may be too. Do we (a) accept that anything committed is
public, (b) move personal data to a separate private repo the site
reads at build time, or (c) fold this into 9.1 by moving to a
backend? For v1: assume (a) and let the author self-censor.

### 9.4 Video-link handling

Garmin Catalyst share links, YouTube, Vimeo, iCloud shared albums,
Google Photos — do we just render them as external links, or embed
where possible? v1 proposal: external links only. Embedding is a
future polish.

### 9.5 Instructor feedback shape

Per-session freeform text vs. structured (rating on braking / lines /
smoothness / etc.). v1: freeform text per session, plus optional
event-wide field for a wrap-up. If patterns emerge we can structure
later.

## 10. Future scope (not v1)

Drawn from the reference mocks for context, not commitment:

- Garage of multiple cars with per-car dashboards.
- Setup sheets (camber/toe/brake bias/damper clicks) with side-by-side
  compare across visits to the same track.
- Track library independent of events (turn-numbered maps, notes per
  turn).
- Season view: totals across events, results, best lap.
- Expense tracking across categories (entry, lodging, fuel, tires,
  damage) with charts.
- Service-interval reminders (miles since last brake fluid, etc.).
- Import from MotorsportReg for event details.
- In-app editing / forms for all of the above.

Any of these becomes a separate issue with its own PRD.

---

## Appendix — reference mocks

Screenshots pasted in [#120](https://github.com/inko9nito/hpde/issues/120)
come from three different apps used as inspiration:

- **"Vera's car"** (dark, 4-tab: Garage / Tracks / Events / Profile) —
  closest to this PRD's shape.
- **PitLedger / RACE COMMAND** (light, 5-tab: Dashboard / Garage /
  Team / Service / Season) — richer, points at §10 future scope.
- **ThePaddock** (Android, social) — social/community angle, out of
  scope entirely.

The v1 above deliberately picks the smaller of the three visions.
