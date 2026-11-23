import { MAX_LAP_MS, MAX_LAPS, MIN_LAP_MS, sessionKey } from './lapTimes'
import type { Lap } from './lapTimes'
import type { EventConfig, GeneralActivity, ScheduleActivity, SessionActivity } from '../types'

// Laps imported from a lap timer's screenshots (#472): what the lap-import
// function reads off one screenshot, and which of the event's sessions it
// is. Shared by the function (which checks what the model read) and the
// import sheet (which matches and shows it).

/** One lap as the timer lists it. */
export interface ReadLap {
  ms: number
  /** Whether the timer counted it: one it left out is an in or out lap here. */
  counted: boolean
}

/** What one screenshot shows. */
export interface ScreenshotRead {
  /** The session's day, "YYYY-MM-DD", when the screenshot shows one. */
  date?: string
  /** When the session started on the timer, "HH:MM" (24-hour), when it shows one. */
  start?: string
  laps: ReadLap[]
}

const DATE = /^\d{4}-\d{2}-\d{2}$/
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/

/**
 * What the model read, checked: the date and start time only in the form
 * asked for, and only laps the app would take. Anything else is left out,
 * never guessed at. Null when it isn't a read at all.
 */
export function cleanRead(raw: unknown): ScreenshotRead | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  if (!Array.isArray(r.laps)) return null
  const laps: ReadLap[] = []
  for (const lap of r.laps.slice(0, MAX_LAPS)) {
    const ms = (lap as Record<string, unknown> | null)?.ms
    if (typeof ms !== 'number' || !Number.isFinite(ms)) continue
    const rounded = Math.round(ms)
    if (rounded < MIN_LAP_MS || rounded > MAX_LAP_MS) continue
    laps.push({ ms: rounded, counted: (lap as { counted?: unknown }).counted !== false })
  }
  return {
    ...(typeof r.date === 'string' && DATE.test(r.date) ? { date: r.date } : {}),
    ...(typeof r.start === 'string' && TIME.test(r.start) ? { start: r.start } : {}),
    laps,
  }
}

/** A lap the timer left out of its count. */
export const LEFT_OUT_NOTE = 'Left out by the lap timer'

/**
 * The laps as the app keeps them. One the timer left out of its count stays
 * out of the best and the average: the out lap if it's the first, an in lap
 * otherwise (a stop on the way round, or the lap in).
 */
export function lapsFromRead(laps: ReadLap[]): Lap[] {
  return laps.map((lap, i) => (lap.counted
    ? { ms: lap.ms }
    : { ms: lap.ms, kind: i === 0 ? 'out' : 'in', note: LEFT_OUT_NOTE }))
}

/** A run group's session on one day: where a screenshot's laps can go. */
export interface ImportSlot {
  key: string
  date: string
  time: string
  group: string
  sessionNumber?: number
  /** A line that isn't a numbered session — lunch's lead-follow laps — by its name. */
  label?: string
}

function minutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

/** Minutes from the slot's start on the schedule to the timer's: negative when it went out early. */
export function minutesOff(slot: Pick<ImportSlot, 'time'>, start: string): number {
  return minutes(start) - minutes(slot.time)
}

/**
 * How early a timer can start against the schedule and still be that
 * session, with no group to go by: a group let out a few minutes before
 * its time.
 */
export const EARLY_MIN = 5

/**
 * With the driver's group known, how early and how late their session can
 * have gone out and still be the one: afternoon sessions run 15 minutes
 * early, a red flag holds one back.
 */
export const OWN_EARLY_MIN = 20
export const OWN_LATE_MIN = 25

const isSession = (a: { type: string }): a is SessionActivity => a.type === 'session'
const isLunch = (a: ScheduleActivity): a is GeneralActivity => a.type === 'lunch' && !!a.time

/**
 * Where laps can go on that day, in schedule order: every run group's
 * sessions, and every group's lunch (lead-follow laps), titled with that
 * line's name.
 */
export function slotsOn(event: EventConfig, date: string): ImportSlot[] {
  const day = event.days.find(d => d.date === date)
  if (!day) return []
  return day.activities.flatMap((line): ImportSlot[] => {
    if (isSession(line)) {
      return line.onTrack.map(group => ({
        key: sessionKey(date, line.time, group),
        date,
        time: line.time,
        group,
        ...(line.sessionNumber !== undefined ? { sessionNumber: line.sessionNumber } : {}),
      }))
    }
    if (isLunch(line)) {
      return event.runGroups.map(({ id: group }) => ({ key: sessionKey(date, line.time, group), date, time: line.time, group, label: line.label }))
    }
    return []
  })
}

export type Match =
  | { slot: ImportSlot }
  | { reason: 'no-date' | 'no-start' | 'not-this-event' | 'no-session' }

/**
 * The session a screenshot's laps are from. With the driver's groups at the
 * event known, one of theirs — a session or lunch — the one that starts
 * nearest the timer, from OWN_EARLY_MIN before it to OWN_LATE_MIN after
 * (as near, a session rather than lunch).
 * With none known, the line on the schedule that was on track when the
 * timer started: the last to start before it (or up to EARLY_MIN after),
 * so long as the line after that hadn't started yet, in its first group.
 */
export function matchSession(event: EventConfig, read: ScreenshotRead, groups: string[] = []): Match {
  if (!read.date) return { reason: 'no-date' }
  if (!read.start) return { reason: 'no-start' }
  const day = event.days.find(d => d.date === read.date)
  if (!day) return { reason: 'not-this-event' }
  const start = read.start

  if (groups.length) {
    const nearest = slotsOn(event, read.date)
      .filter(slot => groups.includes(slot.group))
      .map(slot => ({ slot, off: minutesOff(slot, start) }))
      .filter(({ off }) => off >= -OWN_EARLY_MIN && off <= OWN_LATE_MIN)
      // Nearest first; as near, a session before lunch, then their first group.
      .sort((a, b) => Math.abs(a.off) - Math.abs(b.off)
        || Number(!!a.slot.label) - Number(!!b.slot.label)
        || groups.indexOf(a.slot.group) - groups.indexOf(b.slot.group))[0]
    return nearest ? { slot: nearest.slot } : { reason: 'no-session' }
  }

  const at = minutes(start)
  const timed = day.activities
    .flatMap(a => ('time' in a && a.time ? [{ ...a, at: minutes(a.time) }] : []))
    .sort((a, b) => a.at - b.at)
  const line = timed.filter((a): a is typeof a & SessionActivity => a.type === 'session').filter(a => a.at <= at + EARLY_MIN).at(-1)
  const next = line && timed.find(a => a.at > line.at)
  if (!line || (next && at >= next.at)) return { reason: 'no-session' }
  const group = line.onTrack[0]
  return {
    slot: {
      key: sessionKey(read.date, line.time, group),
      date: read.date,
      time: line.time,
      group,
      ...(line.sessionNumber !== undefined ? { sessionNumber: line.sessionNumber } : {}),
    },
  }
}
