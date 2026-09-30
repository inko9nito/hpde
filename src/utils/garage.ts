// A driver's garage (#344): their cars, and what each event ran on — the
// car they brought, its track-prep consumables (tires, pads, rotors, brake
// fluid) and each session's tire pressures. A car's own facts that don't
// change event to event, like its lug nut torque, are the car's.
//
// What's read and checked here is shared by the app (the forms) and the
// garage function (which checks what it's sent before saving).
import { DATE, GROUP, TIME, sessionKey } from './lapTimes'
import type { EventConfig } from '../types'

export interface Car {
  id: string
  year?: number
  make: string
  model: string
  /** What they call it: "The Cayman". */
  nickname?: string
  /** The wheels' lug nut torque, in ft·lb. */
  lugNutTorque?: number
  updatedAt?: string
}

/** The track-prep consumables an event's setup records, in the order the forms list them. */
export const CONSUMABLES = [
  { id: 'tires', label: 'Tires', placeholder: 'Hoosier R7, 245/40R17' },
  { id: 'frontPads', label: 'Front pads', placeholder: 'Hawk DTC-60' },
  { id: 'rearPads', label: 'Rear pads', placeholder: 'Hawk DTC-30' },
  { id: 'frontRotors', label: 'Front rotors', placeholder: 'OEM, 2-piece' },
  { id: 'rearRotors', label: 'Rear rotors', placeholder: 'OEM' },
  { id: 'brakeFluid', label: 'Brake fluid', placeholder: 'Motul RBF 660' },
] as const

export type ConsumableId = typeof CONSUMABLES[number]['id']

export const CORNERS = [
  { id: 'fl', label: 'Front left', short: 'FL' },
  { id: 'fr', label: 'Front right', short: 'FR' },
  { id: 'rl', label: 'Rear left', short: 'RL' },
  { id: 'rr', label: 'Rear right', short: 'RR' },
] as const

export type CornerId = typeof CORNERS[number]['id']

/** A tire pressure at each corner, in psi. */
export type Corners = Partial<Record<CornerId, number>>

/** One session's tire pressures: set cold before it, and read hot after. */
export interface SessionPressures {
  /** `${date} ${time} ${group}` — the same key as the session's laps (sessionKey). */
  key: string
  date: string
  time: string
  group: string
  sessionNumber?: number
  cold?: Corners
  hot?: Corners
  /** What they changed, and why: "Bled 2 psi from the fronts". */
  note?: string
}

/** What they ran at one event: the car, its consumables and each session's pressures. */
export type EventSetup = {
  carId?: string
  /** By session key. */
  sessions?: Record<string, SessionPressures>
  updatedAt?: string
} & Partial<Record<ConsumableId, string>>

export interface Garage {
  cars: Car[]
  /** By event id. */
  events: Record<string, EventSetup>
}

export const MAX_CARS = 20
// Far more events than anyone drives; keeps a runaway client in check.
export const MAX_EVENTS = 1000
export const MAX_SESSIONS = 100
export const MAX_NAME = 60
export const MAX_PART = 80
export const MAX_NOTE = 500
export const MAX_TORQUE = 500
export const MAX_PSI = 99.5

type Cleaned<T> = { value: T } | { error: string }

function text(v: unknown, max: number, what: string): Cleaned<string | undefined> {
  if (v === undefined || v === null) return { value: undefined }
  if (typeof v !== 'string') return { error: `${what} must be text.` }
  const t = v.trim()
  if (t.length > max) return { error: `${what} is too long (at most ${max} characters).` }
  return { value: t || undefined }
}

function number(v: unknown, min: number, max: number, what: string, places = 0): Cleaned<number | undefined> {
  if (v === undefined || v === null || v === '') return { value: undefined }
  if (typeof v !== 'number' || !Number.isFinite(v) || v < min || v > max) return { error: `${what} must be a number from ${min} to ${max}.` }
  const scale = 10 ** places
  return { value: Math.round(v * scale) / scale }
}

export const CAR_ID = /^[a-z0-9][a-z0-9-]{0,39}$/

/** A car as sent: make and model required; year, nickname and lug nut torque optional. */
export function cleanCar(raw: unknown, thisYear = new Date().getFullYear()): Cleaned<Omit<Car, 'id' | 'updatedAt'>> {
  const r = (raw ?? {}) as Record<string, unknown>
  const make = text(r.make, MAX_NAME, 'The make')
  if ('error' in make) return make
  const model = text(r.model, MAX_NAME, 'The model')
  if ('error' in model) return model
  if (!make.value || !model.value) return { error: 'Add the car’s make and model.' }
  const nickname = text(r.nickname, MAX_NAME, 'The nickname')
  if ('error' in nickname) return nickname
  const year = number(r.year, 1900, thisYear + 2, 'The year')
  if ('error' in year) return year
  const torque = number(r.lugNutTorque, 1, MAX_TORQUE, 'Lug nut torque')
  if ('error' in torque) return torque
  return {
    value: {
      ...(year.value !== undefined ? { year: year.value } : {}),
      make: make.value,
      model: model.value,
      ...(nickname.value ? { nickname: nickname.value } : {}),
      ...(torque.value !== undefined ? { lugNutTorque: torque.value } : {}),
    },
  }
}

function cleanCorners(raw: unknown, what: string): Cleaned<Corners | undefined> {
  if (raw === undefined || raw === null) return { value: undefined }
  if (typeof raw !== 'object') return { error: `Bad ${what} pressures.` }
  const out: Corners = {}
  for (const { id, label } of CORNERS) {
    const psi = number((raw as Record<string, unknown>)[id], 0, MAX_PSI, `${label} ${what}`, 1)
    if ('error' in psi) return psi
    if (psi.value !== undefined) out[id] = psi.value
  }
  return { value: Object.keys(out).length ? out : undefined }
}

/** A session's pressures as sent: which session (checked as its laps are), and at least one pressure or a note. */
export function cleanPressures(raw: unknown): Cleaned<SessionPressures> {
  const r = (raw ?? {}) as Record<string, unknown>
  if (typeof r.date !== 'string' || !DATE.test(r.date)) return { error: 'Missing the session’s day.' }
  if (typeof r.time !== 'string' || !TIME.test(r.time)) return { error: 'Missing the session’s time.' }
  if (typeof r.group !== 'string' || !GROUP.test(r.group)) return { error: 'Missing the session’s run group.' }
  const n = r.sessionNumber
  if (n !== undefined && (typeof n !== 'number' || !Number.isInteger(n) || n < 0 || n > 999)) return { error: 'Bad session number.' }
  const cold = cleanCorners(r.cold, 'cold')
  if ('error' in cold) return cold
  const hot = cleanCorners(r.hot, 'hot')
  if ('error' in hot) return hot
  const note = text(r.note, MAX_NOTE, 'The note')
  if ('error' in note) return note
  if (!cold.value && !hot.value && !note.value) return { error: 'Add a tire pressure first.' }
  return {
    value: {
      key: sessionKey(r.date, r.time, r.group),
      date: r.date, time: r.time, group: r.group,
      ...(n !== undefined ? { sessionNumber: n } : {}),
      ...(cold.value ? { cold: cold.value } : {}),
      ...(hot.value ? { hot: hot.value } : {}),
      ...(note.value ? { note: note.value } : {}),
    },
  }
}

/**
 * An event's setup as sent: the car (one of `carIds`), what consumables
 * are filled in, and each session's pressures. It must have something.
 */
export function cleanSetup(raw: unknown, carIds: string[]): Cleaned<Omit<EventSetup, 'updatedAt'>> {
  const r = (raw ?? {}) as Record<string, unknown>
  const out: Omit<EventSetup, 'updatedAt'> = {}
  if (r.carId !== undefined && r.carId !== null && r.carId !== '') {
    if (typeof r.carId !== 'string' || !carIds.includes(r.carId)) return { error: 'That car isn’t in the garage.' }
    out.carId = r.carId
  }
  for (const { id, label } of CONSUMABLES) {
    const t = text(r[id], MAX_PART, label)
    if ('error' in t) return t
    if (t.value) out[id] = t.value
  }
  if (r.sessions !== undefined && r.sessions !== null) {
    if (typeof r.sessions !== 'object' || Array.isArray(r.sessions)) return { error: 'Bad session pressures.' }
    const entries = Object.values(r.sessions)
    if (entries.length > MAX_SESSIONS) return { error: 'That’s too many sessions.' }
    const sessions: Record<string, SessionPressures> = {}
    for (const s of entries) {
      const p = cleanPressures(s)
      if ('error' in p) return p
      sessions[p.value.key] = p.value
    }
    if (Object.keys(sessions).length) out.sessions = sessions
  }
  if (Object.keys(out).length === 0) return { error: 'Pick a car or fill something in first.' }
  return { value: out }
}

/** "2019 Porsche 718 Cayman": the car's year, make and model. */
export function carTitle(car: Pick<Car, 'year' | 'make' | 'model'>): string {
  return [car.year, car.make, car.model].filter(Boolean).join(' ')
}

/** What to call the car in a line: its nickname, or failing that, its year, make and model. */
export function carName(car: Car): string {
  return car.nickname ?? carTitle(car)
}

/** Whether an event's setup names any consumable. */
export function hasConsumables(setup: EventSetup | undefined): boolean {
  return !!setup && CONSUMABLES.some(c => !!setup[c.id])
}

/** An event's first day, to put events in order; its id (which starts with it) failing that. */
function eventDate(eventId: string, events: EventConfig[]): string {
  return events.find(e => e.id === eventId)?.days[0]?.date ?? eventId
}

/** The events a car went to, newest first. */
export function carEvents(carId: string, garage: Garage, events: EventConfig[]): string[] {
  return Object.keys(garage.events)
    .filter(id => garage.events[id].carId === carId)
    .sort((a, b) => eventDate(b, events).localeCompare(eventDate(a, events)))
}

/**
 * The car's most recent consumables — at the latest event (before
 * `before`, when given) that it ran with any. What a new event's setup
 * starts from: pads and tires carry over until they're changed.
 */
export function lastConsumables(
  carId: string, garage: Garage, events: EventConfig[], before?: string,
): { eventId: string; setup: EventSetup } | null {
  const cutoff = before ? eventDate(before, events) : null
  for (const id of carEvents(carId, garage, events)) {
    if (id === before) continue
    if (cutoff && eventDate(id, events) > cutoff) continue
    if (hasConsumables(garage.events[id])) return { eventId: id, setup: garage.events[id] }
  }
  return null
}

/** Every value a consumable's been given, most used first — for the form's suggestions. */
export function consumableOptions(id: ConsumableId, garage: Garage): string[] {
  const counts = new Map<string, number>()
  for (const setup of Object.values(garage.events)) {
    const v = setup[id]
    if (v) counts.set(v, (counts.get(v) ?? 0) + 1)
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([v]) => v)
}

/** A pressure as shown: "32", "32.5". */
export function formatPsi(psi: number | undefined): string {
  return psi === undefined ? '–' : String(psi)
}

/** "32/32/30/30": front left, front right, rear left, rear right. */
export function cornersText(corners: Corners): string {
  return CORNERS.map(c => formatPsi(corners[c.id])).join('/')
}
