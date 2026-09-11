/** Convert "HH:MM" (24h) to total minutes since midnight */
export function parseMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

/**
 * Fallback duration (in minutes) assumed for the last event of the day —
 * it has no following event to infer an end time from. Kept in sync with
 * LAST_EVENT_FALLBACK_MIN in scripts/hpde-widget.js.
 */
export const LAST_EVENT_FALLBACK_MIN = 30

/**
 * Compute the current event and progress fraction (0-1) through it.
 * `visibleTimes` are the timed events in chronological order (breaks
 * stripped). Returns `{ index: -1 }` when no event contains `now`.
 */
export function findCurrentEvent(
  visibleTimes: string[],
  now: number,
): { index: number; progress: number } {
  let lastPast = -1
  for (let i = 0; i < visibleTimes.length; i++) {
    if (parseMinutes(visibleTimes[i]) <= now) lastPast = i
    else break
  }
  if (lastPast === -1) return { index: -1, progress: 0 }
  const start = parseMinutes(visibleTimes[lastPast])
  const nextStart = visibleTimes[lastPast + 1] ? parseMinutes(visibleTimes[lastPast + 1]) : null
  const end = nextStart !== null ? nextStart : start + LAST_EVENT_FALLBACK_MIN
  if (now >= end) return { index: -1, progress: 0 }
  const progress = end === start ? 0 : (now - start) / (end - start)
  return { index: lastPast, progress: Math.max(0, Math.min(1, progress)) }
}

/** Convert "HH:MM" (24h) to "H:MM" 12h display (no AM/PM) */
export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const hour = h % 12 || 12
  return `${hour}:${m.toString().padStart(2, '0')}`
}

/** Current time in minutes since midnight */
export function nowMinutes(): number {
  const d = new Date()
  return d.getHours() * 60 + d.getMinutes()
}

/**
 * Today's date as "YYYY-MM-DD" in the viewer's LOCAL timezone. Do not
 * use `new Date().toISOString().split('T')[0]` for this — that returns
 * the UTC date, which flips over at UTC midnight and makes an evening
 * session read as "not today" once local time crosses UTC midnight.
 */
export function todayLocalISO(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Current time as "H:MM AM/PM" */
export function nowDisplay(): string {
  const d = new Date()
  const h = d.getHours()
  const m = d.getMinutes()
  const hour = h % 12 || 12
  const ampm = h >= 12 ? 'PM' : 'AM'
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`
}

/** Minutes remaining as a readable string, e.g. "25 min" or "1h 5m" */
export function formatCountdown(minutes: number): string {
  if (minutes <= 0) return ''
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m === 0 ? `${h}h` : `${h}h ${m}m`
}
