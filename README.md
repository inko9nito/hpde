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
- **Run groups** are a form: a name, an optional description and a color
  from the palette for each, in the order they're listed.
- **The schedule** is markdown, one section per day, with a live preview.
  Sessions name groups as they're called in the form:

```
## Saturday | 2026-10-03
07:00 general | Registration & tech | Paddock
08:00 session 1 | track: Red, Blue | class: Novice | note: Lead-follow
12:00 lunch | Lunch
break | Track walk
```

Each day opens with commented-out (`//`) example lines to copy.
Anything the editor can't read is listed by line number, and saving waits
until it's fixed, so nothing typed is silently dropped. The days are the
event's own dates. Each save keeps the version it replaced in the
`events-history` store. Unsaved changes stay on the device if you leave
the page.

Admins can also delete any event: event page → **…** → **Delete event** →
confirm. (Only the `test-live` test event, which ships with the app, can't
be edited or deleted.)

**Where events live (#232).** Every event is stored in **Netlify Blobs**
(store `events`), not in the repo, so anyone deploying this app starts with
their own events. No extra Netlify setup is needed for Blobs.
- `netlify/functions/events.mts` — `/api/events`: public `GET`, admin-only
  `POST`, `PUT ?id=` (the editor's run groups and schedule markdown, which
  the function checks itself) and `DELETE ?id=`. The app loads every event
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
