// Run-group palette (see issue #4). Started from Apple's Reminders list
// colors, then softened toward a less saturated, less "crayon box" look —
// every entry lives at Tailwind shade 500 only — see tailwind.config.ts,
// which turns each key into a `bg-<key>-500` class, and
// src/utils/eventsJson.ts, which resolves the same map to hex for the
// widget's events.json manifest. One map, so the two outputs can't drift.
//
// Keys are prefixed with `run` (and kept lowercase — parseSchedule's
// `bgClass` parsing only accepts `bg-[a-z]+-[0-9]+`) so they land as
// their own Tailwind color families instead of silently overriding
// shades of Tailwind's built-in `red`/`orange`/`blue`/etc, which other,
// unrelated UI (the countdown text in TimeIndicator, the "now" line,
// check icons) also uses.
//
// `runred` through `runpurple` are the colors currently assigned to a run
// group; `runbrown` through `runtan` are muted neutrals held in reserve
// for groups not yet defined (there's deliberately no separate sky
// blue/indigo — one blue, one purple, keeps the set from getting crowded
// with near-duplicate hues). To add another beyond that: pick a hue that
// isn't already here, keep saturation/lightness in the same ballpark as
// the rest (roughly 50-65% saturation, 50-60% lightness) so it reads as
// part of the family, and check white text stays as legible on it as on
// the least-legible entry below (runorange).
export const runGroupColors: Record<string, string> = {
  runred: '#CF4A50',
  runorange: '#F49A34',
  runyellow: '#E4BC44',
  rungreen: '#3CAA64',
  runblue: '#478AD1',
  // Pushed further from red's hue (was too close at a glance — issue #4)
  // and off Apple's stock pink to land closer to magenta.
  runpink: '#D449B9',
  runpurple: '#A261D1',
  runbrown: '#987552',
  rungray: '#5C6D7A',
  runtan: '#C4988D',
}
