import type { EventConfig } from '../types'

// Suggestions for the New event form (#229): organizer, location, city and
// track configuration values already used on past events, so a slightly
// different spelling ("Motorsport Ranch Cresson", "1.7" vs "1.7 mile")
// doesn't quietly become a new track or organizer.

export type SuggestField = 'organizer' | 'track' | 'city' | 'configuration'

/** Case, punctuation and spacing-insensitive form used for comparisons. */
export function normalizeKey(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9.]+/g, ' ')
    .replace(/(^|\s)\.|\.(\s|$)/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

const compact = (s: string) => normalizeKey(s).replace(/ /g, '')

/**
 * Distinct values of `field` across `events`, most-used first. Spellings
 * that normalize the same are one option, shown as the most-used spelling.
 * `where` narrows the events (e.g. configurations of one track).
 */
export function collectOptions(
  events: EventConfig[],
  field: SuggestField,
  where: (e: EventConfig) => boolean = () => true,
): string[] {
  const groups = new Map<string, Map<string, number>>()
  for (const e of events) {
    const value = e[field]?.trim()
    if (!value || !where(e)) continue
    const key = compact(value)
    const spellings = groups.get(key) ?? new Map<string, number>()
    spellings.set(value, (spellings.get(value) ?? 0) + 1)
    groups.set(key, spellings)
  }
  return [...groups.values()]
    .map(spellings => {
      const ranked = [...spellings.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      const total = ranked.reduce((n, [, c]) => n + c, 0)
      return { value: ranked[0][0], total }
    })
    .sort((a, b) => b.total - a.total || a.value.localeCompare(b.value))
    .map(o => o.value)
}

/** Options containing every word typed so far, in their original order. */
export function filterOptions(query: string, options: string[]): string[] {
  const words = normalizeKey(query).split(' ').filter(Boolean)
  if (words.length === 0) return options
  return options.filter(o => {
    const key = normalizeKey(o)
    return words.every(w => key.includes(w))
  })
}

/** The existing option `value` is just a re-spelling of, if any. */
export function findExact(value: string, options: string[]): string | null {
  const key = compact(value)
  if (!key) return null
  return options.find(o => compact(o) === key) ?? null
}

function editDistance(a: string, b: string): number {
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
    }
    prev = cur
  }
  return prev[b.length]
}

/**
 * A close-but-not-equal existing option ("Did you mean …?"): one contains
 * the other ("1.7" / "1.7 mile"), or they're a typo or two apart.
 */
export function findSimilar(value: string, options: string[]): string | null {
  const key = compact(value)
  if (key.length < 2 || findExact(value, options)) return null
  let best: { option: string; score: number } | null = null
  for (const option of options) {
    const other = compact(option)
    const contains = (key.length >= 3 || /\d/.test(key)) && (other.includes(key) || key.includes(other))
    const distance = editDistance(key, other)
    const close = distance <= Math.max(1, Math.floor(Math.min(key.length, other.length) / 5))
    if (!contains && !close) continue
    const score = contains ? Math.abs(other.length - key.length) : distance
    if (!best || score < best.score) best = { option, score }
  }
  return best?.option ?? null
}

function mostCommon(values: string[]): string | undefined {
  const counts = new Map<string, number>()
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1)
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0]
}

/**
 * Track-shape icon for a new event, from past events at the same track:
 *   1. an icon used there with the same configuration;
 *   2. else the track's icon prefix + the configuration's number
 *      ("msrc" + "1.3 mile" -> "msrc-1-3"), if that icon exists;
 *   3. with no configuration, the track's icon when it has only one.
 * `iconIds` are the ids that have a real icon (TRACK_ICON_IDS).
 */
export function resolveTrackId(
  events: EventConfig[],
  track: string,
  configuration: string,
  iconIds: string[],
): string | undefined {
  const known = findExact(track, collectOptions(events, 'track'))
  if (!known) return undefined
  const atTrack = events.filter(e => e.track && e.trackId && iconIds.includes(e.trackId)
    && findExact(e.track, [known]))
  const trackIds = [...new Set(atTrack.map(e => e.trackId!))]

  if (!configuration.trim()) return trackIds.length === 1 ? trackIds[0] : undefined

  const sameConfig = atTrack.filter(e => e.configuration && findExact(e.configuration, [configuration]))
  const fromConfig = mostCommon(sameConfig.map(e => e.trackId!))
  if (fromConfig) return fromConfig

  const num = configuration.match(/(\d+)(?:\.(\d+))?/)
  if (!num) return undefined
  const suffix = num[2] ? `${num[1]}-${num[2]}` : num[1]
  const prefixes = new Set(trackIds.map(id => id.replace(/-\d.*$/, '')))
  return [...prefixes].map(p => `${p}-${suffix}`).find(id => iconIds.includes(id))
}
