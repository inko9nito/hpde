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
  subtitle: string
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
