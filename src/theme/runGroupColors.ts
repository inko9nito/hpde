// Run-group palette, matching Apple's own Reminders list-color picker
// (see issue #4) so groups read as native to iOS in both the web app and
// the Scriptable widget. Every entry lives at Tailwind shade 500 only —
// see tailwind.config.ts, which turns each key into a `bg-<key>-500`
// class, and src/utils/eventsJson.ts, which resolves the same map to hex
// for the widget's events.json manifest. One map, so the two outputs
// can't drift.
//
// Keys are prefixed with `run` (and kept lowercase — parseSchedule's
// `bgClass` parsing only accepts `bg-[a-z]+-[0-9]+`) so they land as
// their own Tailwind color families instead of silently overriding
// shades of Tailwind's built-in `red`/`orange`/`blue`/etc, which other,
// unrelated UI (the countdown text in TimeIndicator, the "now" line,
// check icons) also uses.
//
// `runred` through `runpurple` are the colors currently assigned to a run
// group; `runskyblue` through `runtan` round out Apple's 12-color set for
// groups not yet defined. To add another beyond that: pick a hue that
// isn't already here, keep it in the same family as the rest — roughly
// 65-100% saturation, 45-60% lightness — and eyeball that white text on
// it stays as legible as the least-legible entry below (runyellow).
export const runGroupColors: Record<string, string> = {
  runred: '#FE3B30',
  runorange: '#FF9500',
  runyellow: '#FECC00',
  rungreen: '#19C759',
  runblue: '#007AFF',
  // Nudged ~16° away from red's hue (Apple's stock pink, #EA426A, reads
  // too close to red at a glance — issue #4).
  runpink: '#EA4297',
  runpurple: '#C077DA',
  runskyblue: '#51AAF2',
  runindigo: '#5856D6',
  runbrown: '#9D8563',
  rungray: '#5B6770',
  runtan: '#D9A69F',
}
