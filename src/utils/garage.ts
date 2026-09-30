// A driver's garage (#344): their cars, and what each event ran on.
//
// A car has its own facts that don't change event to event, like its lug
// nut torque and a photo, and a log of its consumables: each time some
// were changed — tires, pads, rotors, fluids — the day it was done, where,
// and what went on.
// What was on the car at an event is whatever the log last says before it.
// An event keeps which car it was and each session's tire pressures.
//
// What's read and checked here is shared by the app (the forms) and the
// garage function (which checks what it's sent before saving).
import { DATE, GROUP, TIME, sessionKey } from './lapTimes'
import type { EventConfig } from '../types'
import type { Rsvps } from './rsvp'

/** The consumables a car's log tracks, in the order the forms list them. */
export const CONSUMABLES = [
  { id: 'tires', label: 'Tires', placeholder: 'Hoosier R7, 245/40R17' },
  { id: 'frontPads', label: 'Front pads', placeholder: 'Hawk DTC-60' },
  { id: 'rearPads', label: 'Rear pads', placeholder: 'Hawk DTC-30' },
  { id: 'frontRotors', label: 'Front rotors', placeholder: 'OEM, 2-piece' },
  { id: 'rearRotors', label: 'Rear rotors', placeholder: 'OEM' },
  { id: 'brakeFluid', label: 'Brake fluid', placeholder: 'Motul RBF 660' },
  { id: 'engineOil', label: 'Engine oil', placeholder: 'Motul 300V 5W-40' },
  { id: 'transmissionFluid', label: 'Transmission fluid', placeholder: 'Motul Gear 300 75W-90' },
  { id: 'diffFluid', label: 'Diff fluid', placeholder: 'Red Line 75W-90' },
  { id: 'coolant', label: 'Coolant', placeholder: 'OEM, 50/50' },
] as const

export type ConsumableId = typeof CONSUMABLES[number]['id']

export function consumableLabel(id: ConsumableId): string {
  return CONSUMABLES.find(c => c.id === id)!.label
}

/** One consumable changed: which, and what went on ("Hawk DTC-60"), if said. */
export interface PartChange {
  part: ConsumableId
  what?: string
}

/**
 * One entry in a car's log: on this day, at this shop, these consumables
 * were changed — one job, however many parts.
 */
export interface LogEntry {
  id: string
  /** "YYYY-MM-DD". */
  date: string
  /** In the order the forms list them. */
  parts: PartChange[]
  /** Where it was done: "Mike's Motorsports". */
  shop?: string
  /** Anything else: the mileage, why. */
  note?: string
}

/** A consumable as it stands: what went on, and when and where. */
export type PartOn = PartChange & Pick<LogEntry, 'date' | 'shop'>

export interface Car {
  id: string
  year?: number
  make: string
  model: string
  /** What they call it: "The Cayman". */
  nickname?: string
  /** The wheels' lug nut torque, in ft·lb. */
  lugNutTorque?: number
  /** Set once it has a photo: which one, so a new one isn't the old one cached. */
  photo?: string
  /** Its consumables' changes, in the order they were logged. */
  log?: LogEntry[]
  updatedAt?: string
}

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

/** What they ran at one event: the car, and each session's pressures. */
export interface EventSetup {
  carId?: string
  /** By session key. */
  sessions?: Record<string, SessionPressures>
  updatedAt?: string
}

export interface Garage {
  cars: Car[]
  /** By event id. */
  events: Record<string, EventSetup>
}

export const MAX_CARS = 20
// Far more events than anyone drives; keeps a runaway client in check.
export const MAX_EVENTS = 1000
export const MAX_SESSIONS = 100
export const MAX_LOG = 500
/** A car photo as uploaded, already shrunk on the phone: at most this many bytes. */
export const MAX_PHOTO_BYTES = 3_000_000
/** The limit as it's told to the driver. */
export const PHOTO_LIMIT = `${MAX_PHOTO_BYTES / 1_000_000} MB`
export const PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp']
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

/** A car as sent: make and model required; year, nickname and lug nut torque optional. Its photo and log are kept apart. */
export function cleanCar(raw: unknown, thisYear = new Date().getFullYear()): Cleaned<Omit<Car, 'id' | 'photo' | 'log' | 'updatedAt'>> {
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

/**
 * A log entry as sent: the day and at least one consumable required, each
 * once; what went on for each, the shop and a note optional.
 */
export function cleanEntry(raw: unknown): Cleaned<Omit<LogEntry, 'id'>> {
  const r = (raw ?? {}) as Record<string, unknown>
  if (typeof r.date !== 'string' || !DATE.test(r.date) || Number.isNaN(Date.parse(r.date))) return { error: 'Add the day it was done.' }
  if (!Array.isArray(r.parts) || r.parts.length === 0) return { error: 'Pick what was changed.' }
  const byPart = new Map<ConsumableId, PartChange>()
  for (const p of r.parts as Record<string, unknown>[]) {
    const id = p?.part as ConsumableId
    if (!CONSUMABLES.some(c => c.id === id)) return { error: 'Pick what was changed.' }
    if (byPart.has(id)) return { error: `${consumableLabel(id)} is in there twice.` }
    const what = text(p.what, MAX_PART, `What went on for ${consumableLabel(id).toLowerCase()}`)
    if ('error' in what) return what
    byPart.set(id, { part: id, ...(what.value ? { what: what.value } : {}) })
  }
  const shop = text(r.shop, MAX_NAME, 'The shop')
  if ('error' in shop) return shop
  const note = text(r.note, MAX_NOTE, 'The note')
  if ('error' in note) return note
  return {
    value: {
      date: r.date,
      parts: CONSUMABLES.flatMap(c => (byPart.has(c.id) ? [byPart.get(c.id)!] : [])),
      ...(shop.value ? { shop: shop.value } : {}),
      ...(note.value ? { note: note.value } : {}),
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

/** An event's setup as sent: the car (one of `carIds`) and each session's pressures. It must have one or the other. */
export function cleanSetup(raw: unknown, carIds: string[]): Cleaned<Omit<EventSetup, 'updatedAt'>> {
  const r = (raw ?? {}) as Record<string, unknown>
  const out: Omit<EventSetup, 'updatedAt'> = {}
  if (r.carId !== undefined && r.carId !== null && r.carId !== '') {
    if (typeof r.carId !== 'string' || !carIds.includes(r.carId)) return { error: 'That car isn’t in the garage.' }
    out.carId = r.carId
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
  if (Object.keys(out).length === 0) return { error: 'Pick a car first.' }
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

/** An event's first day. */
export function eventStart(event: EventConfig): string {
  return [...event.days].sort((a, b) => a.date.localeCompare(b.date))[0]?.date ?? event.id.slice(0, 10)
}

/** The events a car went to, newest first. Events no longer listed are left out. */
export function carEvents(carId: string, garage: Garage, events: EventConfig[]): EventConfig[] {
  return events
    .filter(e => garage.events[e.id]?.carId === carId)
    .sort((a, b) => eventStart(b).localeCompare(eventStart(a)))
}

/**
 * The events a car could be added to from its page: the driver's — ones
 * they're going to, or went to (#235) — it isn't already at, newest first,
 * each with the car that's there now, if another is.
 */
export function eventsToDriveAt(carId: string, garage: Garage, events: EventConfig[], rsvps: Rsvps): { event: EventConfig; now?: Car }[] {
  return events
    .filter(e => rsvps[e.id]?.status === 'going' && garage.events[e.id]?.carId !== carId)
    .sort((a, b) => eventStart(b).localeCompare(eventStart(a)))
    .map(event => {
      const now = garage.cars.find(c => c.id === garage.events[event.id]?.carId)
      return now ? { event, now } : { event }
    })
}

/** The car's log, newest first; entries on the same day, the last logged first. */
export function logNewestFirst(car: Car): LogEntry[] {
  return (car.log ?? []).map((c, i) => ({ c, i }))
    .sort((a, b) => b.c.date.localeCompare(a.c.date) || b.i - a.i)
    .map(({ c }) => c)
}

/**
 * What was on the car, each consumable's last change — on or before `day`,
 * when given (an event's first day): what it ran there. In the order the
 * forms list them; one that's never been logged isn't there.
 */
export function consumablesOn(car: Car, day?: string): PartOn[] {
  const latest = new Map<ConsumableId, PartOn>()
  for (const e of logNewestFirst(car)) {
    if (day && e.date > day) continue
    for (const p of e.parts) {
      if (!latest.has(p.part)) latest.set(p.part, { ...p, date: e.date, ...(e.shop ? { shop: e.shop } : {}) })
    }
  }
  return CONSUMABLES.flatMap(p => (latest.has(p.id) ? [latest.get(p.id)!] : []))
}

/** Everything a consumable's been, across every car, most used first — for the form's suggestions. */
export function partOptions(part: ConsumableId, garage: Garage): string[] {
  const counts = new Map<string, number>()
  for (const car of garage.cars) {
    for (const e of car.log ?? []) {
      for (const p of e.parts) if (p.part === part && p.what) counts.set(p.what, (counts.get(p.what) ?? 0) + 1)
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([v]) => v)
}

/** Every shop that's done work on any car, most used first — for the form's suggestions. */
export function shopOptions(garage: Garage): string[] {
  const counts = new Map<string, number>()
  for (const car of garage.cars) {
    for (const e of car.log ?? []) if (e.shop) counts.set(e.shop, (counts.get(e.shop) ?? 0) + 1)
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([v]) => v)
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "Mar 7, 2026". */
export function formatDay(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return `${MONTHS[m - 1]} ${d}, ${y}`
}

/** A pressure as shown: "32", "32.5". */
export function formatPsi(psi: number | undefined): string {
  return psi === undefined ? '–' : String(psi)
}

/** "32/32/30/30": front left, front right, rear left, rear right. */
export function cornersText(corners: Corners): string {
  return CORNERS.map(c => formatPsi(corners[c.id])).join('/')
}
