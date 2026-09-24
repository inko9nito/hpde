// What happens to an event's schedule when its dates change in the details
// form (#232). Shared by the form, which warns before a day's schedule is
// dropped, and the events function, which does the same thing on save.
import type { DaySchedule } from '../types'

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function toTime(iso: string): number {
  return Date.parse(`${iso}T00:00:00Z`)
}

function weekday(iso: string): string {
  return WEEKDAYS[new Date(toTime(iso)).getUTCDay()]
}

function addDays(iso: string, n: number): string {
  const d = new Date(toTime(iso))
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

/** Every date from `start` to `end` ("YYYY-MM-DD"), both included. */
export function datesBetween(start: string, end: string): string[] {
  const out: string[] = []
  for (let d = start; d <= end; d = addDays(d, 1)) out.push(d)
  return out
}

/**
 * The event's days for its new dates, with each schedule carried over:
 *
 * - Same number of days: the event moved (a rain date, a typo), so each
 *   day's schedule moves with it, in order.
 * - More or fewer days, overlapping the old ones: a day added or taken
 *   away, so every date keeps its own schedule. New dates start empty.
 * - More or fewer days, and no overlap: moved and resized at once; the
 *   schedules move from the first day on.
 *
 * `dropped` lists the days whose schedule no longer fits, so the form can
 * say so before saving.
 */
export function retimeDays(days: DaySchedule[], start: string, end: string): { days: DaySchedule[]; dropped: DaySchedule[] } {
  const dates = datesBetween(start, end)
  const oldStart = days[0]?.date
  const oldEnd = days[days.length - 1]?.date
  const overlaps = !!oldStart && start <= oldEnd && end >= oldStart
  const byDate = dates.length !== days.length && overlaps

  const moved = new Map<string, DaySchedule>()
  if (byDate) {
    for (const day of days) moved.set(day.date, day)
  } else {
    days.forEach((day, i) => { if (i < dates.length) moved.set(dates[i], day) })
  }

  const kept = new Set<DaySchedule>()
  const next: DaySchedule[] = dates.map(date => {
    const label = weekday(date)
    const old = moved.get(date)
    if (!old) return { id: label.toLowerCase(), label, date, activities: [] }
    kept.add(old)
    // A weekday label follows the new date; a custom one ("Day 1") stays.
    if (old.label === weekday(old.date)) return { ...old, id: label.toLowerCase(), label, date }
    return { ...old, date }
  })
  // Ids tell the day tabs apart; a custom day's id could match a weekday's.
  const seen = new Set<string>()
  for (const day of next) {
    if (seen.has(day.id)) day.id = `${day.id}-${day.date}`
    seen.add(day.id)
  }
  return { days: next, dropped: days.filter(d => !kept.has(d) && d.activities.length > 0) }
}
