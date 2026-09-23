# HPDE Schedule

See the day's HPDE track schedule at a glance — what's happening now, what's
next, and which sessions are yours. Built for checking on your phone between
runs.

**Live site:** https://inko9nito.github.io/hpde/

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

Sign-in only works on the **Netlify** deploy. GitHub Pages (and the
GitHub-hosted PR previews) keep working, with sign-in hidden — the iOS
widget still reads `api/events.json` from GitHub Pages.

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

Admins can also delete an event created this way: *Info* tab → **Delete
event** → confirm. Built-in events (the ones in `src/data`) can't be
deleted from the app.

Created events are stored in **Netlify Blobs** (store `events`) by the
`created-events` function (`/api/created-events`: public `GET`, admin-only
`POST` and `DELETE ?id=`). No extra Netlify setup is needed for Blobs. They show up on the
Netlify site only — not on GitHub Pages or in the iOS widget yet.

**Make yourself an admin (one time)**
1. Sign in on the Netlify site once with Google, so your user exists.
2. Netlify → your site → *Identity* (or *Project configuration →
   Identity*) → **Users** → click your user.
3. Under *Roles*, **Edit settings** → type `admin` → **Save**.
4. Back on the site, sign out and in again (or wait up to an hour for the
   token to refresh) — the **+** appears on the home page.

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
