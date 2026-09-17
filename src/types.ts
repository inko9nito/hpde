export interface RunGroupConfig {
  id: string
  label: string
  bgClass: string
  textClass: string
  description?: string
}

export interface GeneralEvent {
  time: string
  type: 'general' | 'lunch' | 'special'
  label: string
  subtitle?: string
}

export interface SessionEvent {
  time: string
  type: 'session'
  sessionNumber?: number
  onTrack: string[]
  inClass?: string[]
  note?: string
}

export interface BreakEvent {
  type: 'break'
  label: string
}

export type ScheduleEvent = GeneralEvent | SessionEvent | BreakEvent

export interface DaySchedule {
  id: string
  label: string
  date: string
  events: ScheduleEvent[]
}

export interface EventConfig {
  id: string
  name: string
  /**
   * Overrides the computed date-range line shown under the event name.
   * Only needed for a non-standard event (e.g. a test fixture) — leave
   * unset to auto-derive it from `days` via `eventSubtitle()`.
   */
  subtitle?: string
  link?: string
  mapImage?: string
  organizer?: string
  track?: string
  configuration?: string
  direction?: string
  runGroups: RunGroupConfig[]
  days: DaySchedule[]
}

export type View = 'schedule' | 'map'
