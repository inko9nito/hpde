export interface RunGroupConfig {
  id: string
  label: string
  bgClass: string
  textClass: string
  description?: string
}

export interface GeneralActivity {
  time: string
  type: 'general' | 'lunch' | 'special'
  label: string
  subtitle?: string
}

export interface SessionActivity {
  time: string
  type: 'session'
  sessionNumber?: number
  onTrack: string[]
  inClass?: string[]
  note?: string
}

export interface BreakActivity {
  type: 'break'
  label: string
}

export type ScheduleActivity = GeneralActivity | SessionActivity | BreakActivity

export interface DaySchedule {
  id: string
  label: string
  date: string
  activities: ScheduleActivity[]
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
  city?: string
  configuration?: string
  direction?: string
  /**
   * The original schedule artifacts (photos, scans) this event's data was
   * transcribed from, shown in their own section in Event Details.
   */
  scheduleScans?: string[]
  runGroups: RunGroupConfig[]
  days: DaySchedule[]
}
