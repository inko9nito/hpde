# iOS Home Screen widget

Two [Scriptable](https://scriptable.app/) variants live here, both fed by the
same `https://inko9nito.github.io/hpde/api/events.json` manifest emitted at
build time by `scripts/vite-plugin-events-json.ts`:

- **`hpde-widget.js`** — the vertical list, one row per event. Mirrors the
  web app's timeline card layout.
- **`hpde-widget-horizontal.js`** — a Gantt-style horizontal timeline. One
  row per run group, colored blocks marking when that group is on track,
  with a NOW line anchored an hour into the visible window.

Both scripts share the same install steps, refresh cadence, and offline
cache; only the layout differs. The horizontal variant is described at the
bottom of this file.

## Install

1. Install [Scriptable](https://apps.apple.com/app/scriptable/id1405459188) on
   your iPhone (free).
2. Open Scriptable → `+` → paste the contents of
   [`hpde-widget.js`](./hpde-widget.js) → title it "HPDE".
3. Long-press the Home Screen → **Add Widget** → **Scriptable** → pick
   **Medium** or **Large** → Add. The same script handles both sizes;
   Large fits ~10 rows around the "now" line, Medium fits ~3.
4. Tap the widget → **Edit Widget** → **Script** = "HPDE".
5. Optional: set **Parameter** to a comma-separated list of run group ids to
   filter session rows — e.g. `orange` or `orange,blue`. Leave blank to show
   everything. The ids are the ones used in the schedule Markdown files (see
   `../src/data/schedules/*.md`).

## Refresh cadence

iOS decides when to actually rebuild widgets. The script asks for a refresh
every **5 minutes** on an event day, and every **1 hour** otherwise. Force a
manual refresh by long-pressing the widget → Edit Widget → toggle a setting.

## Offline

The script caches the last successful manifest in Scriptable's iCloud
documents. If the network is unreachable it renders the cached data and shows
a small "offline" tag in the header.

## What it shows

- Event name + day
- Up to ~5 rows around now: 1 recent past + 4 upcoming
- A blue "now" line with a countdown to the next event (red ≤5 min,
  orange ≤10 min, otherwise gray) — matches the web app's `TimeIndicator`
- Session rows show colored dots for each run group on track, plus "in <color>"
  when there's a classroom group
- Lunch / special rows use bold text with 🍔 / ⭐

If no event is scheduled for today, the widget renders a small "No event
today." card. (Future work could show a preview of the next upcoming event
in that empty state.)

## Adding a new run-group color

The widget doesn't ship its own color table — it reads colors from
`events.json`, and that file's colors are resolved at build time from the
project's Tailwind palette (see `src/utils/eventsJson.ts` →
`resolveTailwindBgColor`). If you introduce a `bgClass` in a schedule MD file
that Tailwind doesn't recognize, `npm run build` fails loudly and blocks
deploy. So the widget stays in sync with the web app by construction — there
is no separate list to keep updated.

## Horizontal variant (`hpde-widget-horizontal.js`)

Same install flow as above (paste the script, add a Scriptable widget, point
it at the "HPDE Horizontal" script). Best on **Medium** — Large works too and
gives each row more vertical room.

What it shows:

- Header line with event name, day, and the current time.
- One horizontal row per run group, each labeled with a colored pill matching
  the web app's `GroupBadge`.
- Colored blocks in each row mark the intervals when that group is on the
  track (derived from consecutive `on: <group>` session entries). Blocks
  entirely in the past render dimmed; blocks straddling now split at the
  NOW line so the past half is dimmed and the future half is full color.
- Hour tick marks along the top with vertical grid lines through the plot.
- Lunch (🍔) and special (⭐) anchors appear as thin vertical bars.
- A bright vertical NOW line labeled `NOW`, sitting roughly one hour from
  the left edge and sliding right as the day goes on.

**Optional Parameter:** an integer between 2 and 8, the total window length
in hours (default 4 — one hour before now, three hours after). Set it to `6`
for a wider look ahead, or `2` for tighter zoom.
