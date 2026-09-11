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

## Editing a schedule

All schedule data lives in `src/data/schedules/`. Each event is one Markdown file named `YYYY-MM-DD_event-id.md`, and the matching wrapper in `src/data/events/` uses the same `YYYY-MM-DD_event-id` filename and id.

### Top-of-file directives

```
# Event name
subtitle: Sep 13, 2026 · MSR
link: https://example.com/event-page
```

`link:` is optional — when set, a small external-link icon shows next to the event title in the header.

### Line format

```
HH:MM  type  |  content
```

**General events** (announcements, gates open/close, meetings):
```
06:30 general | Track gates open
07:15 general | Drivers sign in | 7:15 – 7:45 AM
```
The third field (after the second `|`) is an optional subtitle shown in smaller text.

**Lunch and special events** (render with bold border + icon):
```
12:10 lunch | Lunch / Lead-follow laps
17:30 special | Pizza party (BYOB) | Hosted by Five Star Performance Ford
```

**Sessions:**
```
08:30 session | on: orange | in: pink
09:50 session 1 | on: orange | in: purple | note: Corner worker break
```
- `on:` — groups on track (comma-separated if multiple: `on: yellow, red`)
- `in:` — groups in classroom (optional)
- `note:` — a concurrent break happening during this slot (optional)
- `session N` — adds a "Session N" header above the first card with that number

Times are 24-hour format. The app converts them to 12-hour for display.

### Run groups

Defined in the `## groups` section at the top of each MD file:
```
orange | Orange | bg-runorange-500 | text-white
blue   | Blue   | bg-runblue-500   | text-white | Novice
```
Format: `id | Display name | Tailwind background class | Tailwind text class | optional descriptor`

Background classes come from the run-group palette in
`src/theme/runGroupColors.ts` (`bg-run<color>-500` — red, orange, yellow,
green, blue, pink, purple, brown, gray, tan). See that file's comment for
how to add another color.

If any group has a descriptor, a small legend renders at the bottom of the schedule mapping color → descriptor (e.g. Blue · Novice). Keep the display name short — just the color usually — so filter chips and session badges stay clean.

---

## Adding a new event

1. Create `src/data/schedules/YYYY-MM-DD_event-id.md` (copy an existing file as a template)
2. Create `src/data/events/YYYY-MM-DD_event-id.ts`:
   ```ts
   import type { EventConfig } from '../../types'
   import { parseScheduleMD } from '../../utils/parseSchedule'
   import src from '../schedules/YYYY-MM-DD_event-id.md?raw'
   const event: EventConfig = parseScheduleMD('YYYY-MM-DD_event-id', src)
   export default event
   ```
3. Add it to `src/data/index.ts` — the first item in the array is shown by default

---

## Development

```bash
npm install
npm run dev       # local dev server at http://localhost:5173
npm test          # run tests
npm run build     # production build → dist/
```

Editing an MD file while `npm run dev` is running will hot-reload the UI instantly.

## Deployment

Pushes to `main` automatically build and deploy to GitHub Pages via GitHub Actions. No manual steps needed.

## iPhone Home Screen widget

<img src="docs/screenshots/widget-medium.jpg" width="140" alt="Scriptable Home Screen widget" />

Add a widget to your Home Screen and see today's schedule without opening
the app — see [`scripts/`](./scripts/README.md) for setup instructions.

**Latest script:** https://raw.githubusercontent.com/inko9nito/hpde/main/scripts/hpde-widget.js
— always the current version, the one to share.
