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

export type Precipitation = 'dry' | 'damp' | 'light-rain' | 'heavy-rain' | 'mixed'

export interface DayWeather {
  highF?: number
  lowF?: number
  trackTempF?: number
  precipitation?: Precipitation
  notes?: string
}

export interface TirePressureSet {
  fl?: number
  fr?: number
  rl?: number
  rr?: number
}

export interface TirePressures {
  cold?: TirePressureSet
  hot?: TirePressureSet
  unit?: 'psi' | 'bar'
  notes?: string
}

export type MediaKind = 'photos' | 'video' | 'other'

export interface MediaLink {
  kind: MediaKind
  label: string
  url: string
}

// Mirrors the "GREEN Run Group Student Evaluation" form HPDE instructors
// hand out on paper/PDF — every field optional so a partial eval still saves.
export interface InstructorEvalSkills {
  flags?: number
  passing?: number
  smoothInputs?: number
  looksAhead?: number
  consistency?: number
  carControl?: number
  pace?: number
  referencePoints?: number
  trackAwareness?: number
}

export interface InstructorEvalRecommendations {
  sameDirection?: string
  newDirection?: string
  newTrack?: string
}

export interface InstructorEval {
  track?: string
  instructor?: string
  student?: string
  car?: string
  skills?: InstructorEvalSkills
  aggressivenessEqualsSkill?: boolean
  aidsOveractivatedPct?: number
  recommend?: InstructorEvalRecommendations
  notes?: string
}

export interface SessionLog {
  sessionNumber: number
  notes?: string
  instructorEval?: InstructorEval
  tirePressures?: TirePressures
  carAids?: string
  media?: MediaLink[]
}

export interface DaySchedule {
  id: string
  label: string
  date: string
  events: ScheduleEvent[]
  weather?: DayWeather
  sessionLogs?: SessionLog[]
}

export interface EventVitals {
  attended?: string[]
  summary?: string
}

export interface CarConfigSnapshot {
  tires?: string
  brakes?: string
  rideHeight?: string
  alignment?: string
  aids?: string
}

export interface EventConfig {
  id: string
  name: string
  subtitle: string
  link?: string
  mapImage?: string
  runGroups: RunGroupConfig[]
  days: DaySchedule[]
  notes?: string
  vitals?: EventVitals
  media?: MediaLink[]
  carConfig?: CarConfigSnapshot
}

export interface Part {
  name: string
  partNumber?: string
  qty?: number
  unitCost?: number
}

export interface ServiceEntry {
  date: string
  shop?: string
  summary: string
  work?: string
  parts?: Part[]
  laborCost?: number
  notes?: string
}

export interface Car {
  id: string
  name: string
  year?: number
  make?: string
  model?: string
  trim?: string
  services: ServiceEntry[]
}

export type View = 'schedule' | 'map'
