# HPDE Schedule

Track day schedule app for HPDE events. Optimized for mobile (iPhone 13 mini).

**Live site:** https://inko9nito.github.io/hpde/

---

## Editing a schedule

All schedule data lives in `src/data/schedules/`. Each event is one Markdown file named `YYYY-MM-DD_event-id.md`.

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
orange | Orange | bg-orange-500 | text-white
```
Format: `id | Display name | Tailwind background class | Tailwind text class`

---

## Adding a new event

1. Create `src/data/schedules/YYYY-MM-DD_event-id.md` (copy an existing file as a template)
2. Create `src/data/events/event-id.ts`:
   ```ts
   import type { EventConfig } from '../../types'
   import { parseScheduleMD } from '../../utils/parseSchedule'
   import src from '../schedules/YYYY-MM-DD_event-id.md?raw'
   const event: EventConfig = parseScheduleMD('event-id', src)
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
