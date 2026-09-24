# HPDE Schedule

See the day's HPDE track schedule at a glance — what's happening now, what's
next, and which sessions are yours. Built for checking on your phone between
runs.

**Live site:** https://myhpde.netlify.app/

## Features

- **Live "now" line** shows what's happening at this moment and counts down
  to what's next
- **Run group filter** — pick your color(s) and the schedule highlights just
  your sessions
- **On track / in class** badges make it obvious who's driving and who's in
  the classroom for each session
- **iPhone Home Screen widget** — see the schedule without opening the app
  (see below)

<img src="docs/screenshots/app-today.png" width="140" alt="Today's schedule with the now-line" /> <img src="docs/screenshots/app-sessions.png" width="140" alt="Session rows with on-track / in-class run group badges" /> <img src="docs/screenshots/app-filter.png" width="140" alt="Run group filter dropdown" />

---

## Sign-in (Netlify Identity + Google)

The schedule is public — no account needed. Signing in is only for
personal, private things (my notes, my garage). It's the same setup as the
BEI app: **Netlify Identity** with **Google** as the login provider.

The app, its PR previews and the iOS widget's data all live on
**Netlify**. The old GitHub Pages address (`inko9nito.github.io/hpde/`) no
longer deploys; it only points visitors at the Netlify site.

**One-time Netlify setup**
1. Netlify → *Add new site* → *Import from Git* → `inko9nito/hpde`. Build
   settings come from `netlify.toml` (no need to fill them in).
2. *Site configuration → Identity* → **Enable Identity**.
3. *Identity → Registration* → **Open** (anyone can sign up — unlike BEI,
   which is invite-only).
4. *Identity → External providers* → add **Google** (default Netlify
   credentials are fine to start).

**How it fits together**
- `src/auth/` loads the Identity widget only when `/.netlify/identity`
  exists, and exposes `useAuth()` — `status`, `user`, `signIn()`,
  `authedFetch()` (adds the user's token for function calls).
- `netlify/functions/*` read the signed-in user via
  `requireUser(context)` (`netlify/lib/auth.mjs`) and return 401 without
  one. `/api/me` is the first example.
- Roles (*Identity → Users → a user → Roles*) come through as
  `user.roles`. The `admin` role can create events (below).

## Creating events (admins)

Admins get a **+** button on the home page that opens a *New event* form:
title, start/end date, organizer, location, city, track configuration,
direction and event page. A new event starts with no schedule — its
Schedule tab says "Schedule coming soon" until one is added.

Admins add or change an event's schedule in the app: event page → **…** →
**Edit schedule** (or **Add schedule** on an event that has none).
- **The schedule** is markdown, one section per day, with a live preview.
  Sessions name run groups however the organizer does:
```
## Saturday | 2026-10-03
7:00 AM general | Registration & tech | Paddock
8:00 AM session 1 | track: Red, Blue | class: Novice | note: Lead-follow
12:00 PM lunch | Lunch
break | Track walk
1:30 PM session 4 | track: Red, Blue
```

Times are written with AM or PM (`1:30 PM`, `1:30pm`); 24-hour times
like `13:30` work too. A time like `1:30` with no AM or PM is flagged
rather than guessed. They're stored 24-hour either way.

- **Run groups** come from the sessions and are listed below the
  schedule. Each gets a color from its name (Red → red, Instructors →
  black, anything else → a color no other group has). Tap
  **Change color** to pick another, and add a description if you like.

Each day opens with commented-out (`//`) example lines to copy.
Anything the editor can't read is listed by line number, and saving waits
until it's fixed, so nothing typed is silently dropped. The days are the
event's own dates. Each save keeps the version it replaced in the
`events-history` store. Unsaved changes stay on the device if you leave
the page.

Admins change an event's details — dates included — with the same form:
event page → **…** → **Edit details**. The event keeps its link. If the
dates move, the schedule moves with them. Dates added to the event start
with an empty day. If a day with a schedule is taken off the event, the
form says so before saving. Each save keeps the version it replaced in
`events-history`, as the schedule editor does.

Admins can also delete any event: event page → **…** → **Delete event** →
confirm. (Only the `test-live` test event, which ships with the app, can't
be edited or deleted.)

**Where events live (#232).** Every event is stored in **Netlify Blobs**
(store `events`), not in the repo, so anyone deploying this app starts with
their own events. No extra Netlify setup is needed for Blobs.
- `netlify/functions/events.mts` — `/api/events`: public `GET`, admin-only
  `POST`, `PUT ?id=` (either the details form's fields, or the schedule
  editor's run groups and markdown, which the function checks itself) and
  `DELETE ?id=`. The app loads every event
  from here.
- `netlify/functions/events-json.mts` — `/api/events.json`, the iOS
  widget's feed: the same events in the widget's format, cached for a
  minute.
- Each deploy preview gets its own store, which starts as a copy of the
  live events (taken the first time that deploy is loaded). You see real
  data on a preview, but creating or deleting events there never touches
  the live ones. A later push makes a new deploy with a fresh copy.
- The events that used to live in the repo (`src/data/schedules/*.md`)
  were imported into the live store once, in #252.

**Make yourself an admin (one time)**
1. Sign in on the Netlify site once with Google, so your user exists.
2. Netlify → your site → *Identity* (or *Project configuration →
   Identity*) → **Users** → click your user.
3. Under *Roles*, **Edit settings** → type `admin` → **Save**.
4. Back on the site, sign out and in again (or wait up to an hour for the
   token to refresh) — the **+ Add event** link appears next to *Upcoming*
   on the home page, in list view (not calendar view).

   If you signed in *before* adding the role, signing back in is required —
   your browser is holding a token from before you were an admin, and
   nothing server-side will refresh it for you.

Repeat for anyone else who should be able to add events.

## Lap times (signed in)

Signed-in drivers can log their lap times for each session they drove.
Only they can see them.

- **Add:** on an event's Schedule tab, tap a session's *On track* row.
  If more than one group is on track, pick yours. Then paste your times
  and tap **Save lap times**. The sheet shows what it read (laps, best,
  average) before you save.
- **What you can paste:**
  - a list: `1:39.42, 1:38.91, 1:39.08` (commas, spaces, `;` or `|`)
  - a spreadsheet column: one time per line
  - rows copied from a timing sheet, in the order
    lap, start crossing, finish crossing, lap time, note. Title, header
    and total rows are passed over. `Out` / `In` laps are kept but left
    out of the best and the average. `~` times are kept as written. A row
    with no lap time uses the gap between its crossings.
  - crossing times: clock times (`9:52:49 AM`) or video timestamps
    (`0:02:13`), in a list or a column. Each gap is a lap.
    For a list of increasing times like `2:13, 4:09, 5:57`, the sheet
    asks whether they're lap times or video timestamps.

  Anything it can't read is listed by line, and saving waits until it's
  fixed. Paste one session at a time.
- **Lap time summary:** a few words on the laps (out lap, traffic,
  flags), typed in under them. Paste a session from a timing sheet and the
  words under its title fill it in. (Notes on the session as a whole are
  for later, #205.)
- **See / edit:** tap a session that has laps to see them read-only: the
  laps, average and best (worked out from the laps, never typed in), the
  lap time summary and a table of every lap in the order they're entered
  (lap, start and finish stacked in one column, lap time, note). The best lap is in a dark chip, with a timer
  when it's also the all-time best on this layout. **Edit** brings up the
  text box. The **My notes** tab opens with *Best lap this event* and
  *All time best* (across every event at the track with the same
  configuration and direction), then each session's figures and lap time summary;
  tap the figures to open its lap table, or use *Expand all*. The tables'
  columns line up from session to session. The tab shows how many
  sessions have laps, e.g. *My notes (2)*.
- **Where they live:** `netlify/functions/laps.mts` (`/api/laps`; with no
  `?event=` it sums up each event's best, for the layout best) in
  Netlify Blobs (store `laps`), one record per driver per event, keyed by
  their Identity user id. Every request needs a sign-in and only ever
  reaches the driver's own laps. A deploy preview gets an empty store of
  its own, so laps saved on a preview never touch the real ones, and
  they're gone with the next deploy.

---

## iPhone Home Screen widget

<img src="docs/screenshots/widget-medium.jpg" width="140" alt="Scriptable Home Screen widget" />

Add a widget to your Home Screen and see today's schedule without opening
the app — see [`scripts/`](./scripts/README.md) for setup instructions.

**Latest script:** https://raw.githubusercontent.com/inko9nito/hpde/main/scripts/hpde-widget.js
— always the current version, the one to share.

**Known issues:** 
* The widget doesn't update instantly — iOS controls when widgets actually refresh, so there can be a short delay before it catches up to what's happening on track.
* The widget is optimized for the Large widget type, and while it supports Medium size, it is not optimized for it.  Small size is unsupported. 
