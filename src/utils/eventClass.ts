import type { EventConfig } from '../types'
import { todayLocalISO } from './time'

export type EventStatus = 'live' | 'upcoming' | 'past'

/** Earliest day.date on an event. */
export function firstDate(event: EventConfig): string {
  return event.days.reduce((min, d) => (d.date < min ? d.date : min), event.days[0].date)
}

/** Latest day.date on an event. */
export function lastDate(event: EventConfig): string {
  return event.days.reduce((max, d) => (d.date > max ? d.date : max), event.days[0].date)
}

/**
 * Classify an event relative to `today`:
 *   live     — any day is today
 *   upcoming — every day is strictly after today
 *   past     — every day is strictly before today (or the event straddles
 *              today but doesn't contain it, which is treated as past
 *              since its last day is over)
 */
export function classifyEvent(event: EventConfig, today: string = todayLocalISO()): EventStatus {
  if (event.days.some(d => d.date === today)) return 'live'
  if (event.days.every(d => d.date > today)) return 'upcoming'
  return 'past'
}

export interface PartitionedEvents {
  live: EventConfig[]
  upcoming: EventConfig[]
  past: EventConfig[]
}

/**
 * Split events into { live, upcoming, past }, each sorted:
 *   live/upcoming ascending by first date (soonest first)
 *   past         descending by last date (most recent first)
 */
export function partitionEvents(
  events: EventConfig[],
  today: string = todayLocalISO(),
): PartitionedEvents {
  const live: EventConfig[] = []
  const upcoming: EventConfig[] = []
  const past: EventConfig[] = []
  for (const e of events) {
    const status = classifyEvent(e, today)
    if (status === 'live') live.push(e)
    else if (status === 'upcoming') upcoming.push(e)
    else past.push(e)
  }
  live.sort((a, b) => firstDate(a).localeCompare(firstDate(b)))
  upcoming.sort((a, b) => firstDate(a).localeCompare(firstDate(b)))
  past.sort((a, b) => lastDate(b).localeCompare(lastDate(a)))
  return { live, upcoming, past }
}
