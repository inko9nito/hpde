export interface RunGroupConfig {
  id: string
  label: string
  bgClass: string
  textClass: string
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
  note?: string // e.g. 'Instructor break', 'Corner worker break' — happens concurrent with this slot
}

export type ScheduleEvent = GeneralEvent | SessionEvent

export interface DaySchedule {
  id: string
  label: string
  date: string
  events: ScheduleEvent[]
}

export interface EventConfig {
  id: string
  name: string
  subtitle: string
  runGroups: RunGroupConfig[]
  days: DaySchedule[]
}

export type View = 'schedule' | 'map'
