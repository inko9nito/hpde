# iPhone Home Screen widget

<img src="../docs/screenshots/widget-medium.jpg" width="140" alt="Scriptable Home Screen widget" />

`hpde-widget.js` is a [Scriptable](https://scriptable.app/) script that puts
today's HPDE schedule on your iPhone Home Screen, so you can check what's
next without opening the app.

**Latest script:** https://raw.githubusercontent.com/inko9nito/hpde/main/scripts/hpde-widget.js
— always points at the current version on `main`, so it's the easiest thing
to share or open straight from an iPhone.

> **Known issue:** the widget isn't truly live — iOS controls when it
> actually refreshes, so it can lag a bit behind what's happening on track.
> See [Refresh cadence](#refresh-cadence) below.

## Install

Two ways to set up the widget — pick one:

**Auto-updating (recommended):** paste
[`hpde-widget-loader.js`](./hpde-widget-loader.js) instead of the main
script. It's a tiny stub that fetches the real script from `main` on every
run (falling back to its last successful fetch if offline), so future
updates need no more copy-pasting — see
[`hpde-widget-loader.js`](./hpde-widget-loader.js) for how it works.

**Manual:** paste `hpde-widget.js` itself. You'll need to re-paste it
whenever it changes.

1. Install [Scriptable](https://apps.apple.com/app/scriptable/id1405459188) on
   your iPhone (free).
2. Open Scriptable → `+` → paste the contents of one of the two scripts
   above → title it "HPDE".
3. Long-press the Home Screen → **Add Widget** → **Scriptable** → pick
   **Medium** or **Large** → Add. The same script handles both sizes;
   Large fits ~10 rows around the "now" line, Medium fits ~3.
4. Tap the widget → **Edit Widget** → **Script** = "HPDE".
5. Optional: set **Parameter** to configure filtering and notifications —
   see [Widget parameter](#widget-parameter) below.

## Widget parameter

The `Parameter` field on the widget (long-press → Edit Widget → Parameter)
takes a small comma-separated string. Tokens are split by `,` (a `|` also
works as a separator, but user-facing docs only show commas — the pipe is
hard to find on the iPhone keyboard):

| Token             | Effect                                                                 |
| ----------------- | ---------------------------------------------------------------------- |
| `<group id>`      | Include this run group in the filter (schedule rows + notifications).  |
| `<N>m`            | Notification lead time in minutes (default `10m`).                     |
| `test`            | Debug flag — see [Testing notifications](#testing-notifications).      |
| `test-upcoming[-<count>][-<days>d]` | Debug flag — see [Testing the countdown card](#testing-the-countdown-card). |

Examples:

- `orange` — filter to orange, default 10-min lead.
- `orange,blue,15m` — filter to orange + blue, 15-min lead.
- `15m` — no filter, 15-min lead.
- (blank) — no filter, 10-min lead.

Run-group ids are the ones in each event's schedule (the `## groups`
section of its Markdown). Unknown tokens surface as a `⚠ invalid: …`
footer on the widget so you can see typos at a glance.

### Notifications

The widget schedules an iOS notification a few minutes before every session
your filter matches, plus every all-drivers activity on the day
(meetings, lunch, etc.) regardless of filter. First run triggers the iOS
permissions prompt. Delivery happens even when the widget itself hasn't
refreshed at the moment of the alert — the widget only writes the schedule;
iOS handles delivery from there.

With more than one widget on the phone, each widget alerts for what it
shows, filtered by its own Parameter: a Small set to `orange` and a
Large set to `blue` alert for both, each alert at the longest lead time
among the widgets that want it. A widget without `test` doesn't show the
Test Event, so its filter doesn't touch the Test Event's alerts (#295).
Scriptable gives a widget no id, so the widget's size stands in for one:
editing a widget's Parameter replaces its old one on the next refresh,
and two widgets of the same size share one entry, the one refreshed last
deciding. A removed widget stops counting once it has gone 3 hours
without a refresh, from the next refresh of a widget that's still there.
Running the script in the Scriptable app only previews the widget; it
leaves alerts alone.

Notifications show up under Scriptable's app icon, not HPDE's. That's a
Scriptable/iOS limitation — the icon is tied to the app that scheduled the
notification, and there is no Scriptable API to override it. The only way
to get a different icon is a native app (or a third-party push service like
Web Live Activities from #160). We stay in Scriptable, so we live with the
Scriptable braces icon.

### Testing notifications

Because iOS won't schedule past-dated notifications, you can't test the
notification pipeline on a day with no real HPDE event unless we give the
widget a fake "today" to work from. That's what the standing test-live
fixture is for.

- Set the widget's Parameter to `test` (or combine, e.g.
  `test,orange,10m`) → the widget rewrites the Test Event's day date to
  today client-side, schedules notifications for its remaining sessions,
  and renders it like a real event.
- Set the Parameter back to whatever you normally use (or blank) → the
  Test Event goes silent immediately on the next widget refresh.

The site's `events.json` always ships the fixture at its natural date
(`2000-01-01`) so widgets without the `test` flag can't see it as active.
The rewrite lives entirely on the widget side; there's no server or CI
knob to change.

### Testing the countdown card

When there's no event today, the widget shows a countdown to the next
one instead — but that's only reachable on a day with no real HPDE
event AND a real future one already scheduled. `test-upcoming` gives
you that on demand, the same way `test` does for the populated view:

- Set the Parameter to `test-upcoming` → the widget rewrites the Test
  Event to 10 days out and renders the countdown card against it
  (event name, date, organizer, location — all from the Test Event's
  fixture data). 10 days exercises the week:day split (`1 WEEK : 3
  DAYS`); anything ≤ 6 days shows the single day-count instead.
- `test-upcoming` optionally takes a **count** and/or a **day
  offset**, hyphen-separated, day offset suffixed with `d`:
  - `test-upcoming-<count>` — how many upcoming events to have (0-3).
  - `test-upcoming-<days>d` — which day offset the first one lands
    on, e.g. `test-upcoming-3d` for the single-day-count layout or
    `test-upcoming-14d` for a bigger week:day split.
  - `test-upcoming-<count>-<days>d` — both together, e.g.
    `test-upcoming-3-2d` means "3 upcoming events, the first one 2
    days out". The `d` suffix is what tells the two numbers apart —
    without it the token doesn't match and surfaces as an invalid
    parameter instead of being misread.
- The count controls exactly how many upcoming events exist, so you
  can test every scenario on purpose:
  - `test-upcoming-0` — no upcoming events at all (the true zero
    state — see caveat below).
  - `test-upcoming-1` — exactly one upcoming event (no "more" footer
    on either size).
  - `test-upcoming-2` — exactly two (Large shows both with no
    footer; Medium shows one + "1 more upcoming event").
  - `test-upcoming` alone (or `test-upcoming-3`) — the default 3,
    more than Large can show at once, so the footer always appears.
  - A count above 3 clamps to 3, since that's how many days the Test
    Event fixture ships (spread a week apart starting at the day
    offset you asked for).
  - Caveat: the count only controls the *fixture's* contribution. If
    your schedule data already has real future events, they still
    count toward the total — so `test-upcoming-0` only shows the
    true zero state when there are no real upcoming events either.
- `test` and `test-upcoming` are mutually exclusive (today vs. the
  future) — set one or the other, not both.
- Set the Parameter back to whatever you normally use (or blank) to
  return to real data.

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
- A blue "now" line with a countdown to the next activity (red ≤5 min,
  orange ≤10 min, otherwise gray) — matches the web app's `TimeIndicator`
- Session rows show colored dots for each run group on track, plus "in <color>"
  when there's a classroom group
- Lunch / special rows use bold text; lunch also gets a fork.knife SF Symbol icon

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
