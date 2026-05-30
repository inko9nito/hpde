/** Convert "HH:MM" (24h) to total minutes since midnight */
export function parseMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
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
