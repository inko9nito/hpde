import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, within, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { AuthProvider } from '../auth/AuthContext'
import { EventsProvider } from '../data/EventsContext'
import { RsvpsProvider } from '../data/RsvpsContext'
import { GarageProvider } from '../data/GarageContext'
import type { Rsvps } from '../utils/rsvp'
import type { EventConfig } from '../types'
import type { SessionLaps } from '../utils/lapTimes'
import type { EventEvaluation, SessionNotes } from '../utils/evaluation'
import { cleanCar, cleanEntry, cleanSetup } from '../utils/garage'
import type { Garage } from '../utils/garage'
import { LapTimesSheet } from './LapTimesSheet'

// Logging lap times against a session (#210), through the whole app: the
// schedule opens a session's sheet, the sheet reads a paste and saves it,
// My notes lists what's saved.

const event: EventConfig = {
  id: '2026-03-07_lap-day',
  name: 'Lap Day',
  track: 'Motorsport Ranch - Cresson',
  trackId: 'msrc-1-7',
  configuration: '1.7 mile',
  direction: 'Clockwise',
  runGroups: [
    { id: 'red', label: 'Red', bgClass: 'bg-red-500', textClass: 'text-white' },
    { id: 'blue', label: 'Blue', bgClass: 'bg-blue-500', textClass: 'text-white' },
  ],
  days: [{
    id: 'saturday', label: 'Saturday', date: '2026-03-07',
    activities: [
      { time: '07:30', type: 'general', label: 'Drivers meeting' },
      { time: '08:00', type: 'session', sessionNumber: 1, onTrack: ['red'], inClass: ['blue'] },
      { time: '09:50', type: 'session', sessionNumber: 1, onTrack: ['blue', 'red'] },
      { time: '11:45', type: 'session', sessionNumber: 2, onTrack: ['blue'] },
    ],
  }],
}

// Rows as they come out of a spreadsheet — made-up times.
const SHEET_ROWS = [
  'Lap\tStart Crossing\tFinish Crossing\tLap Time\tNotes',
  'Out\t11:46:32 AM\t11:48:51 AM\t2:19\tTraffic',
  '1\t11:48:51 AM\t11:50:47 AM\t1:56\t',
  '2\t11:50:47 AM\t11:52:31 AM\t1:44\tBest so far',
  'Laps\t2\tBest\t1:44\t',
].join('\n')

// Earlier events: one on the same layout, one run the other way round.
const sameLayout: EventConfig = { ...event, id: '2026-02-07_earlier', name: 'Earlier', days: [{ ...event.days[0], date: '2026-02-07' }] }
const otherWay: EventConfig = { ...sameLayout, id: '2026-01-10_ccw', name: 'CCW', direction: 'Counter-clockwise' }
let summary: { eventId: string; best?: number; sessions: number }[] = []
// The driver's answers to "are you going?" (#235), and events beyond the three above.
let rsvps: Rsvps = {}
// Jason's, for an admin who switched to him (#362).
let jasonRsvps: Rsvps = {}
let moreEvents: EventConfig[] = []

// identity.ts caches the first widget it loads, so every test shares one
// fake; signedIn decides whether it reports a user, roles what they are.
let signedIn = true
let roles: string[] = []
const handlers: Record<string, (u: unknown) => void> = {}
const currentUser = () => (signedIn ? { id: 'u', email: 'v@example.com', app_metadata: { roles }, jwt: async () => 'token' } : null)
const fakeWidget = {
  init: () => handlers.init?.(currentUser()),
  on: (e: string, cb: (u: unknown) => void) => { handlers[e] = cb },
  open() {}, close() {}, logout() {}, currentUser,
} as unknown as NonNullable<typeof window.netlifyIdentity>

// Another driver an admin can log laps for (#288).
const JASON = '5b0f2c1e-8d3a-4f6b-9c2d-7e1a0b3c4d5e'
const DRIVERS = [
  { id: JASON, email: 'jason@example.com', name: 'Jason', avatar: 'https://pics.example/jason.jpg' },
  { id: 'u', email: 'v@example.com', name: 'Vera' },
]

// The laps function, in memory: the signed-in driver's laps, and Jason's.
let saved: SessionLaps[] = []
let jasonSaved: SessionLaps[] = []
// Their laps at the other events, for a track page (#274).
let elsewhere: Record<string, SessionLaps[]> = {}
let failSaves = false
// While set, reading the laps waits for it.
let holdLaps: Promise<void> | null = null
// The notes function (#340), in memory: the signed-in driver's evaluations, by event.
type Notes = { evaluation?: EventEvaluation; sessions: SessionNotes[] }
let notesByEvent: Record<string, Notes> = {}
// The garage function (#344), in memory: the signed-in driver's cars and setups.
let garageData: Garage = { cars: [], events: {} }
// Jason's, as an admin who switched to him reads it (#362).
let jasonGarage: Garage | null = null
let carCount = 0
let entryCount = 0
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

const fetchMock = vi.fn(async (input: string, init?: RequestInit) => {
  const url = String(input)
  if (url.includes('/.netlify/identity/settings')) return json({})
  if (url.includes('api/events')) return json({ events: [event, sameLayout, otherWay, ...moreEvents] })
  if (url.includes('api/rsvps')) {
    const driver = new URL(url, 'https://x').searchParams.get('driver')
    if (driver) expect([roles, driver]).toEqual([expect.arrayContaining(['admin']), JASON])
    return json({ rsvps: driver ? jasonRsvps : rsvps })
  }
  if (url.includes('api/drivers')) {
    expect(roles).toContain('admin')
    return json({ drivers: DRIVERS })
  }
  if (url.includes('api/notes')) {
    expect(new Headers(init?.headers).get('Authorization')).toBe('Bearer token')
    const params = new URL(url, 'https://x').searchParams
    // Nobody else's notes are kept here.
    if (params.has('driver')) return json(init?.method ? { error: 'Not here.' } : { sessions: [] }, init?.method ? 500 : 200)
    // Every event's, for the Instructor evaluations page (#345).
    if (!params.has('event')) return json({ events: Object.entries(notesByEvent).map(([eventId, n]) => ({ eventId, ...n })) })
    const id = params.get('event')!
    const notes = notesByEvent[id] ?? { sessions: [] }
    const keep = (next: Notes) => { notesByEvent[id] = next }
    if (init?.method === 'PUT') {
      const body = JSON.parse(String(init.body))
      if (body.evaluation) {
        keep({ ...notes, evaluation: body.evaluation })
        return json({ evaluation: body.evaluation })
      }
      const { session } = body
      const stored = { ...session, key: `${session.date} ${session.time} ${session.group}`, updatedAt: 'now' }
      keep({ ...notes, sessions: [...notes.sessions.filter(s => s.key !== stored.key), stored] })
      return json({ session: stored })
    }
    if (init?.method === 'DELETE') {
      if (params.get('evaluation')) {
        const { evaluation: _gone, ...rest } = notes
        keep(rest)
        return json({ deleted: 'evaluation' })
      }
      keep({ ...notes, sessions: notes.sessions.filter(s => s.key !== params.get('session')) })
      return json({ deleted: params.get('session') })
    }
    return json(notes)
  }
  if (url.includes('api/garage')) {
    expect(new Headers(init?.headers).get('Authorization')).toBe('Bearer token')
    const params = new URL(url, 'https://x').searchParams
    if (jasonGarage && params.get('driver') === JASON && !init?.method && !params.has('car')) return json(jasonGarage)
    const eventId = params.get('event')
    const carId = params.get('car')
    const withCar = (next: (c: Garage['cars'][number]) => Garage['cars'][number]) => {
      garageData = { ...garageData, cars: garageData.cars.map(c => (c.id === carId ? next(c) : c)) }
      return garageData.cars.find(c => c.id === carId)!
    }
    if (carId && params.get('photo')) {
      if (init?.method === 'PUT') {
        expect(init.body).toBeInstanceOf(Blob)
        return json({ car: withCar(c => ({ ...c, photo: 'p1' })) })
      }
      if (init?.method === 'DELETE') return json({ car: withCar(({ photo: _gone, ...c }) => c) })
      return new Response('jpeg', { headers: { 'Content-Type': 'image/jpeg' } })
    }
    if (carId && params.get('restore') && init?.method === 'PUT') {
      return json({ car: withCar(({ archived: _was, ...c }) => c) })
    }
    if (init?.method === 'PUT') {
      const body = JSON.parse(String(init.body))
      if (carId && body.events) {
        const events = Object.fromEntries((body.events as string[]).map(id => [id, { ...garageData.events[id], carId }]))
        garageData = { ...garageData, events: { ...garageData.events, ...events } }
        return json({ events })
      }
      if (carId) {
        const cleaned = cleanEntry(body.entry)
        if ('error' in cleaned) return json(cleaned, 400)
        const entry = { id: body.entry.id ?? `entry${++entryCount}`, ...cleaned.value }
        withCar(c => ({ ...c, log: [...(c.log ?? []).filter(e => e.id !== entry.id), entry] }))
        return json({ entry })
      }
      if (eventId && jasonGarage && params.get('driver') === JASON) {
        const setup = cleanSetup(body.setup, jasonGarage.cars.map(c => c.id))
        if ('error' in setup) return json(setup, 400)
        jasonGarage = { ...jasonGarage, events: { ...jasonGarage.events, [eventId]: setup.value } }
        return json({ setup: setup.value })
      }
      if (eventId) {
        const setup = cleanSetup(body.setup, garageData.cars.map(c => c.id))
        if ('error' in setup) return json(setup, 400)
        garageData = { ...garageData, events: { ...garageData.events, [eventId]: setup.value } }
        return json({ setup: setup.value })
      }
      const cleaned = cleanCar(body.car)
      if ('error' in cleaned) return json(cleaned, 400)
      const old = garageData.cars.find(c => c.id === body.car.id)
      const car = { id: body.car.id ?? `car${++carCount}`, ...cleaned.value, ...(old?.photo ? { photo: old.photo } : {}), ...(old?.log ? { log: old.log } : {}) }
      garageData = { ...garageData, cars: [...garageData.cars.filter(c => c.id !== car.id), car] }
      return json({ car })
    }
    if (init?.method === 'DELETE') {
      const entryId = params.get('entry')
      if (carId && entryId) {
        withCar(c => ({ ...c, log: (c.log ?? []).filter(e => e.id !== entryId) }))
        return json({ deleted: entryId })
      }
      // As the function does (#410): one that went to events, or is shared, is kept — any, when asked (#423).
      const car = garageData.cars.find(c => c.id === carId)
      if (car && !car.archived && (params.get('archive') === '1' || Object.values(garageData.events).some(e => e.carId === carId) || (car.drivers?.length ?? 0) > 1)) {
        return json({ car: withCar(c => ({ ...c, archived: '2026-10-02T12:00:00.000Z' })) })
      }
      if (carId) {
        garageData = {
          cars: garageData.cars.filter(c => c.id !== carId),
          events: Object.fromEntries(Object.entries(garageData.events).map(([id, { carId: was, ...rest }]) => [id, was === carId ? rest : { carId: was, ...rest }])),
        }
        return json({ deleted: carId })
      }
      const { [eventId!]: _gone, ...events } = garageData.events
      garageData = { ...garageData, events }
      return json({ deleted: eventId })
    }
    return json(garageData)
  }
  if (url.includes('api/laps')) {
    expect(new Headers(init?.headers).get('Authorization')).toBe('Bearer token')
    const params = new URL(url, 'https://x').searchParams
    const forJason = params.get('driver') === JASON
    if (params.has('driver')) {
      expect(roles).toContain('admin')
      expect(params.get('driver')).toBe(JASON)
    }
    if (params.has('events')) {
      const ids = params.get('events')!.split(',')
      const at = (id: string) => (id === event.id ? (forJason ? jasonSaved : saved) : forJason ? [] : elsewhere[id] ?? [])
      return json({ events: ids.filter(id => at(id).length).map(id => ({ eventId: id, sessions: at(id) })) })
    }
    if (!params.has('event')) return json({ events: forJason ? [] : summary })
    // The other events' laps, as a track page sees them.
    if (params.get('event') !== event.id && !init?.method) {
      return json({ sessions: forJason ? [] : elsewhere[params.get('event')!] ?? [] })
    }
    expect(params.get('event')).toBe(event.id)
    const laps = forJason ? jasonSaved : saved
    const keep = (next: SessionLaps[]) => { if (forJason) jasonSaved = next; else saved = next }
    if (init?.method === 'PUT') {
      if (failSaves) return json({ error: 'Blobs is down.' }, 503)
      const { session } = JSON.parse(String(init.body))
      const stored = { ...session, key: `${session.date} ${session.time} ${session.group}`, updatedAt: 'now' }
      keep([...laps.filter(s => s.key !== stored.key), stored].sort((a, b) => a.key.localeCompare(b.key)))
      return json({ session: stored })
    }
    if (init?.method === 'DELETE') {
      const key = params.get('session')
      keep(laps.filter(s => s.key !== key))
      return json({ deleted: key })
    }
    if (holdLaps) await holdLaps
    return json({ sessions: laps })
  }
  return new Response('not found', { status: 404 })
})

function openEvent() {
  window.location.hash = `#/event/${event.id}`
  render(<AuthProvider><EventsProvider><App /></EventsProvider></AuthProvider>)
}

// Once the driver's laps have loaded, the schedule is settled. The sheet
// opens on what the session can have (#205); `open` picks one of them.
async function tapSession(name: string, open: 'Lap times' | 'Instructor feedback' | null = 'Lap times') {
  await waitFor(() => expect(lapCalls('GET').length).toBeGreaterThan(0))
  await userEvent.click(await screen.findByRole('button', { name }))
  if (open) await openInSheet(open)
}

// No dialog open — nor a sheet from the bottom, or the session's page,
// still sliding down and away (#388).
async function sheetGone() {
  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(document.querySelector('[data-sheet-handle], [data-lap-page]')).toBeNull()
  })
}

// Back on the session's list once what was picked from it has slid down
// (#445) — on Save, Remove or Cancel.
async function backOnList() {
  await waitFor(() => expect(document.querySelector('[data-lap-page]')).toBeNull())
  const list = await screen.findByRole('dialog', { name: /^\d/ })
  expect(within(list).getByRole('navigation', { name: 'Session info' })).toBeInTheDocument()
  return list
}

// Closes the session's list with its ✕.
async function closeList() {
  await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Close' }))
  await sheetGone()
}

// In the session's sheet, opens one of the things it can have: a page
// sheet, named for it and the session, once the list has slid away (#388,
// #445).
async function openInSheet(what: 'Lap times' | 'Instructor feedback') {
  const nav = await within(await screen.findByRole('dialog')).findByRole('navigation', { name: 'Session info' })
  await userEvent.click(within(nav).getByRole('button', { name: new RegExp(`^${what}`) }))
  return screen.findByRole('dialog', { name: new RegExp(`^${what}, `) })
}

// An event's figures on a track page, by label.
function figures(el: HTMLElement, label: string): Record<string, string> {
  const dl = el.querySelector(`dl[aria-label="${label}"]`)!
  const out: Record<string, string> = {}
  dl.querySelectorAll('dt').forEach(dt => { out[dt.textContent!] = dt.nextElementSibling!.textContent! })
  return out
}

// A session's figures table (#324), on its card or in the sheet, as text,
// row by row: the column headings, then each row's label and figures.
function sessionFigures(card: HTMLElement): string[][] {
  return within(within(card).getByRole('table', { name: 'Session figures' })).getAllByRole('row')
    .map(row => [...row.children].map(cell => cell.textContent ?? ''))
}

// A table of laps, as text, header first: the one given, or the one in it
// (not the figures table above it, #324). Lines stacked in one cell (start
// over finish) are joined with a dash.
function rows(el: HTMLElement): string[][] {
  const table = el.matches('table') ? el : within(el).getByRole('table', { name: 'Laps' })
  return within(table).getAllByRole('row').map(row => [...row.children].map(cell =>
    cell.children.length > 1 ? [...cell.children].map(line => line.textContent).join(' – ') : cell.textContent ?? ''))
}

const notesCalls = (method: string) =>
  fetchMock.mock.calls.filter(([url, init]) => String(url).includes('api/notes') && (init?.method ?? 'GET') === method)
const lapCalls = (method: string) =>
  fetchMock.mock.calls.filter(([url, init]) => String(url).includes('api/laps') && (init?.method ?? 'GET') === method)
const garageCalls = (method: string) =>
  fetchMock.mock.calls.filter(([url, init]) => String(url).includes('api/garage') && (init?.method ?? 'GET') === method)
const driverCalls = () => fetchMock.mock.calls.filter(([url]) => String(url).includes('api/drivers'))

beforeEach(() => {
  localStorage.clear()
  signedIn = true
  roles = []
  saved = []
  jasonSaved = []
  elsewhere = {}
  summary = []
  rsvps = {}
  jasonRsvps = {}
  moreEvents = []
  holdLaps = null
  notesByEvent = {}
  garageData = { cars: [], events: {} }
  jasonGarage = null
  carCount = 0
  entryCount = 0
  failSaves = false
  fetchMock.mockClear()
  vi.stubGlobal('fetch', fetchMock)
  window.netlifyIdentity = fakeWidget
})
afterEach(() => {
  vi.unstubAllGlobals()
  delete window.netlifyIdentity
})

describe('lap times (#210)', () => {
  it('leaves the schedule as it was for anyone signed out, and fetches nothing', async () => {
    signedIn = false
    openEvent()
    await screen.findByText('Drivers meeting')
    await screen.findAllByRole('button', { name: /Sign in/ })
    expect(screen.queryByRole('button', { name: /^Lap times:/ })).not.toBeInTheDocument()
    expect(lapCalls('GET')).toHaveLength(0)
  })

  it('adds a session’s laps from spreadsheet rows, then lists them on My notes', async () => {
    openEvent()
    await tapSession('Lap times: 11:45 AM, Blue', null)

    const menu = screen.getByRole('dialog', { name: '11:45 AM · Blue' })
    // Headed like the session's card: session, then time and group.
    expect(within(menu).getByRole('heading')).toHaveTextContent('11:45AMBlue')
    expect(menu).toHaveTextContent('Session 2')
    // Lap times, once picked, slides up as a page with Cancel, its name
    // and Save, the session under it, as the list slides away (#388).
    const sheet = await openInSheet('Lap times')
    expect(sheet).toHaveAccessibleName('Lap times, 11:45 AM · Blue')
    expect(screen.getAllByRole('dialog')).toEqual([sheet])
    expect(within(sheet).getByRole('heading')).toHaveTextContent('Lap times')
    expect(sheet).toHaveTextContent('Session 2 · 11:45 AM · Blue')
    const box = within(sheet).getByLabelText('Lap times or timestamps')
    fireEvent.change(box, { target: { value: SHEET_ROWS } })

    // What was read, before saving: the out lap doesn't count.
    const read = within(sheet).getByRole('region', { name: 'Laps read' })
    expect(read).toHaveTextContent('Lap times · 2 laps')
    expect(sessionFigures(read)).toEqual([
      ['', 'Average', 'Best'],
      ['Lap time', '1:50.0', '1:44'],
    ])
    // Columns in the order they're entered; the best lap in a chip.
    expect(rows(read)).toEqual([
      ['Lap', 'From / To', 'Lap time', 'Note'],
      ['Out', '11:46:32 AM – 11:48:51 AM', '2:19', 'Traffic'],
      ['1', '11:48:51 AM – 11:50:47 AM', '1:56', ''],
      ['2', '11:50:47 AM – 11:52:31 AM', '1:44', 'Best so far'],
    ])
    // The chip is in both, pulled left in each so its digits line up with
    // the heading and times above and below it.
    const [inFigures, inTable] = read.querySelectorAll('[data-best-lap]')
    expect(inFigures).toHaveClass('-ml-1.5')
    expect(inTable).toHaveClass('-ml-1.5')
    expect(sheet).toHaveTextContent('Passed over lines 1, 5')

    await userEvent.click(within(sheet).getByRole('button', { name: 'Save' }))
    // Back on the list, which says what's saved now (#445).
    const list = await backOnList()
    expect(within(list).getByRole('button', { name: /^Lap times/ })).toHaveTextContent('Lap times2 laps · best 1:44')
    expect(screen.getByRole('status')).toHaveTextContent('Lap times saved')
    await closeList()

    const [, put] = lapCalls('PUT')[0]
    expect(JSON.parse(String(put!.body)).session).toEqual({
      date: '2026-03-07', time: '11:45', group: 'blue', sessionNumber: 2,
      laps: [
        { ms: 139_000, kind: 'out', start: '11:46:32 AM', end: '11:48:51 AM', note: 'Traffic' },
        { ms: 116_000, start: '11:48:51 AM', end: '11:50:47 AM' },
        { ms: 104_000, start: '11:50:47 AM', end: '11:52:31 AM', note: 'Best so far' },
      ],
    })

    // The session now shows it has laps, and My notes counts it.
    expect(screen.getByRole('button', { name: 'Lap times: 11:45 AM, Blue (saved)' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('tab', { name: 'My notes (1)' }))
    const card = screen.getByRole('region', { name: 'Session 2, 11:45 AM' })
    // Its laps that count, then a compact table of its figures (#324).
    expect(card).toHaveTextContent('Lap times · 2 laps')
    expect(sessionFigures(card)).toEqual([
      ['', 'Average', 'Best'],
      ['Lap time', '1:50.0', '1:44'],
    ])
    // The laps are folded away until asked for.
    expect(within(card).queryByRole('table', { name: 'Laps' })).not.toBeInTheDocument()
    await userEvent.click(within(card).getByRole('button', { name: 'Show laps for Session 2' }))
    expect(rows(card)[3]).toEqual(['2', '11:50:47 AM – 11:52:31 AM', '1:44', 'Best so far'])
    await userEvent.click(within(card).getByRole('button', { name: 'Hide laps for Session 2' }))
    expect(within(card).queryByRole('table', { name: 'Laps' })).not.toBeInTheDocument()
    // No Private tag: what's theirs is theirs without saying so (#414).
    expect(screen.queryByText('Private')).not.toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Best lap this event' })).toHaveTextContent('1:44')
    // Only admins pick a driver (#288).
    expect(screen.queryByLabelText('Driver')).not.toBeInTheDocument()
    expect(driverCalls()).toHaveLength(0)
    expect(lapCalls('GET').every(([url]) => !String(url).includes('driver='))).toBe(true)
  })

  it('reads each lap’s top and average speed, saves them and shows them in the table (#298)', async () => {
    openEvent()
    await tapSession('Lap times: 11:45 AM, Blue')
    const sheet = screen.getByRole('dialog', { name: 'Lap times, 11:45 AM · Blue' })
    fireEvent.change(within(sheet).getByLabelText('Lap times or timestamps'), { target: { value: [
      'Lap #\tLap time\tTop speed (mph)\tAvg speed (mph)',
      'Out\t2:19\t88\t55.5',
      '1\t1:40.071\t92.0\t61.7',
      '2\t1:28.551\t102.3\t69.6\tTraffic',
    ].join('\n') } })

    const read = within(sheet).getByRole('region', { name: 'Laps read' })
    expect(rows(read)).toEqual([
      ['Lap', 'Lap time', 'Top – mph', 'Avg – mph', 'Note'],
      ['Out', '2:19', '88.0', '55.5', ''],
      ['1', '1:40.071', '92.0', '61.7', ''],
      ['2', '1:28.551', '102.3', '69.6', 'Traffic'],
    ])
    expect(within(read).getByRole('columnheader', { name: 'Top speed, mph' })).toBeInTheDocument()
    expect(within(read).getByRole('columnheader', { name: 'Average speed, mph' })).toBeInTheDocument()

    // Beside start and finish crossings, top stacks over average, as they do.
    fireEvent.change(within(sheet).getByLabelText('Lap times or timestamps'), { target: { value: '1\t8:33:20 AM\t8:35:12 AM\t1:52\t101.9\t68.2' } })
    expect(rows(read)).toEqual([
      ['Lap', 'From / To', 'Lap time', 'Top – Avg', ''],
      ['1', '8:33:20 AM – 8:35:12 AM', '1:52', '101.9 – 68.2', ''],
    ])
    expect(within(read).getByRole('columnheader', { name: 'Top and average speed, mph' })).toBeInTheDocument()
    fireEvent.change(within(sheet).getByLabelText('Lap times or timestamps'), { target: { value: [
      'Lap #\tLap time\tTop speed (mph)\tAvg speed (mph)',
      'Out\t2:19\t88\t55.5',
      '1\t1:40.071\t92.0\t61.7',
      '2\t1:28.551\t102.3\t69.6\tTraffic',
    ].join('\n') } })

    await userEvent.click(within(sheet).getByRole('button', { name: 'Save' }))
    await waitFor(() => expect(lapCalls('PUT')).toHaveLength(1))
    expect(JSON.parse(String(lapCalls('PUT')[0][1]!.body)).session.laps).toEqual([
      { ms: 139_000, kind: 'out', topMph: 88, avgMph: 55.5 },
      { ms: 100_071, topMph: 92, avgMph: 61.7 },
      { ms: 88_551, topMph: 102.3, avgMph: 69.6, note: 'Traffic' },
    ])

    // Editing brings them back as rows, speeds after the lap time.
    await backOnList()
    await closeList()
    await userEvent.click(screen.getByRole('button', { name: 'Lap times: 11:45 AM, Blue (saved)' }))
    const again = await openInSheet('Lap times')
    await userEvent.click(within(again).getByRole('button', { name: 'Edit' }))
    expect(within(again).getByLabelText('Lap times or timestamps')).toHaveValue(
      'Out\t\t\t2:19\t88\t55.5\n1\t\t\t1:40.071\t92\t61.7\n2\t\t\t1:28.551\t102.3\t69.6\tTraffic',
    )
  })

  it('asks which group when more than one is on track', async () => {
    openEvent()
    await tapSession('Lap times: 9:50 AM, Blue, Red', null)
    const sheet = screen.getByRole('dialog')
    // Nothing to add to till the group's picked.
    const nav = within(sheet).getByRole('navigation', { name: 'Session info' })
    expect(within(nav).getByRole('button', { name: /^Lap times/ })).toBeDisabled()
    expect(within(nav).getByRole('button', { name: /^Instructor feedback/ })).toBeDisabled()

    await userEvent.click(within(sheet).getByRole('button', { name: 'Red' }))
    expect(sheet).toHaveAccessibleName('9:50 AM · Red')
    const page = await openInSheet('Lap times')
    fireEvent.change(within(page).getByLabelText('Lap times or timestamps'), { target: { value: '1:39.42, 1:38.91' } })
    await userEvent.click(within(page).getByRole('button', { name: 'Save' }))
    await waitFor(() => expect(lapCalls('PUT')).toHaveLength(1))
    expect(JSON.parse(String(lapCalls('PUT')[0][1]!.body)).session.group).toBe('red')
  })

  it('won’t save what it can’t read, and says which line', async () => {
    openEvent()
    await tapSession('Lap times: 11:45 AM, Blue')
    const sheet = screen.getByRole('dialog')
    fireEvent.change(within(sheet).getByLabelText('Lap times or timestamps'), { target: { value: '1:44\n1:4x' } })
    expect(within(sheet).getByRole('list', { name: 'Can’t read' })).toHaveTextContent('Line 2: Couldn’t read “1:4x” as a time.')
    expect(within(sheet).getByRole('button', { name: 'Save' })).toBeDisabled()
  })

  it('offers to read increasing times as video timestamps', async () => {
    openEvent()
    await tapSession('Lap times: 11:45 AM, Blue')
    const sheet = screen.getByRole('dialog')
    fireEvent.change(within(sheet).getByLabelText('Lap times or timestamps'), { target: { value: '2:13, 4:09, 5:57' } })
    expect(within(sheet).getByRole('region', { name: 'Laps read' })).toHaveTextContent('Lap times · 3 laps')

    await userEvent.click(within(sheet).getByRole('button', { name: 'Video timestamps' }))
    const read = within(sheet).getByRole('region', { name: 'Laps read' })
    expect(read).toHaveTextContent('Lap times · 2 laps')
    expect(sessionFigures(read)).toEqual([
      ['', 'Average', 'Best'],
      ['Lap time', '1:52.0', '1:48'],
    ])
  })

  it('keeps the sheet open with the reason when a save fails', async () => {
    failSaves = true
    openEvent()
    await tapSession('Lap times: 11:45 AM, Blue')
    const sheet = screen.getByRole('dialog')
    fireEvent.change(within(sheet).getByLabelText('Lap times or timestamps'), { target: { value: '1:44' } })
    await userEvent.click(within(sheet).getByRole('button', { name: 'Save' }))
    expect(await within(sheet).findByRole('alert')).toHaveTextContent('Blobs is down.')
    expect(within(sheet).getByLabelText('Lap times or timestamps')).toHaveValue('1:44')
  })

  it('edits and removes saved laps from My notes', async () => {
    saved = [{
      key: '2026-03-07 11:45 blue', date: '2026-03-07', time: '11:45', group: 'blue', sessionNumber: 2,
      laps: [{ ms: 99_420 }, { ms: 98_910 }],
    }]
    openEvent()
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes (1)' }))
    expect(screen.getByRole('group', { name: 'Best lap this event' })).toHaveTextContent('1:38.91')

    await userEvent.click(screen.getByRole('button', { name: 'Edit Session 2' }))
    const sheet = await openInSheet('Lap times')
    // Saved laps open read-only, under Done and Edit (#388).
    expect(within(sheet).getByRole('heading', { level: 1 })).toHaveTextContent('Lap times')
    expect(within(sheet).queryByLabelText('Lap times or timestamps')).not.toBeInTheDocument()
    expect(within(sheet).queryByRole('button', { name: 'Save' })).not.toBeInTheDocument()
    expect(within(sheet).getByRole('button', { name: 'Done' })).toBeInTheDocument()
    expect(rows(within(sheet).getByRole('region', { name: 'Saved laps' }))).toEqual([
      ['Lap', 'Lap time'], ['1', '1:39.42'], ['2', '1:38.91'],
    ])
    await userEvent.click(within(sheet).getByRole('button', { name: 'Edit' }))
    const box = within(sheet).getByLabelText('Lap times or timestamps')
    expect(box).toHaveValue('1:39.42, 1:38.91')
    // Cancel puts back what's saved.
    fireEvent.change(box, { target: { value: '1:44' } })
    await userEvent.click(within(sheet).getByRole('button', { name: 'Cancel' }))
    expect(within(sheet).queryByLabelText('Lap times or timestamps')).not.toBeInTheDocument()
    expect(rows(within(sheet).getByRole('region', { name: 'Saved laps' }))[1]).toEqual(['1', '1:39.42'])

    await userEvent.click(within(sheet).getByRole('button', { name: 'Remove from session' }))
    await userEvent.click(within(sheet).getByRole('button', { name: 'Remove' }))
    await backOnList()
    await closeList()
    expect(lapCalls('DELETE')[0][0]).toContain(`session=${encodeURIComponent('2026-03-07 11:45 blue')}`)
    expect(screen.getByText('No session notes yet')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'My notes' })).toBeInTheDocument()
  })

  it('shows the best lap of the event, and on this layout across every event', async () => {
    saved = [{
      key: '2026-03-07 11:45 blue', date: '2026-03-07', time: '11:45', group: 'blue', sessionNumber: 2,
      laps: [{ ms: 99_420 }, { ms: 98_910 }],
    }]
    summary = [
      { eventId: sameLayout.id, best: 98_540, sessions: 4 },
      { eventId: otherWay.id, best: 90_000, sessions: 2 },
    ]
    openEvent()
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes (1)' }))
    // The event header already names the track.
    expect(screen.queryByText('MSRC · 1.7 CW')).not.toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Best lap this event' })).toHaveTextContent('1:38.91Across 1 recorded session')
    // The counter-clockwise event doesn't count.
    await waitFor(() => {
      expect(screen.getByRole('group', { name: 'All time best' })).toHaveTextContent('1:38.54Across 2 events at this track config')
    })
  })

  it('takes the lap time summary from the paste, and saves and shows it', async () => {
    openEvent()
    await tapSession('Lap times: 11:45 AM, Blue')
    const sheet = screen.getByRole('dialog')
    fireEvent.change(within(sheet).getByLabelText('Lap times or timestamps'), {
      target: { value: `SESSION 2 — Started 11:46 AM\nTires were complaining as heat built.\n${SHEET_ROWS}` },
    })
    const summaryBox = within(sheet).getByLabelText(/Lap time summary/)
    expect(summaryBox).toHaveValue('Tires were complaining as heat built.')
    expect(sheet).toHaveTextContent('From your paste')
    // Passed over: the title, the header and the totals — not the summary.
    expect(sheet).toHaveTextContent('Passed over lines 1, 3, 7')

    // Typed over, the typed words win.
    fireEvent.change(summaryBox, { target: { value: 'Hot tires by lap 3.' } })
    await userEvent.click(within(sheet).getByRole('button', { name: 'Save' }))
    await waitFor(() => expect(lapCalls('PUT')).toHaveLength(1))
    expect(JSON.parse(String(lapCalls('PUT')[0][1]!.body)).session.summary).toBe('Hot tires by lap 3.')

    await userEvent.click(screen.getByRole('tab', { name: 'My notes (1)' }))
    expect(screen.getByRole('region', { name: 'Session 2, 11:45 AM' })).toHaveTextContent('Hot tires by lap 3.')
  })

  it('marks the lap that’s the all-time best on this layout, once every event’s best is in', async () => {
    saved = [
      { key: '2026-03-07 09:50 blue', date: '2026-03-07', time: '09:50', group: 'blue', sessionNumber: 1, laps: [{ ms: 99_420 }, { ms: 98_540 }] },
      { key: '2026-03-07 11:45 blue', date: '2026-03-07', time: '11:45', group: 'blue', sessionNumber: 2, laps: [{ ms: 99_000 }] },
    ]
    summary = [{ eventId: sameLayout.id, best: 98_910, sessions: 3 }]
    openEvent()
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes (2)' }))
    const first = screen.getByRole('region', { name: 'Session 1, 9:50 AM' })
    const second = screen.getByRole('region', { name: 'Session 2, 11:45 AM' })
    await waitFor(() => expect(first.querySelector('[data-all-time-best]')).not.toBeNull())
    // Session 2's best is its own best, not the all-time one.
    expect(second.querySelector('[data-best-lap]')).not.toBeNull()
    expect(second.querySelector('[data-all-time-best]')).toBeNull()
  })

  it('charts each session’s best and average on My notes, in schedule order (#274)', async () => {
    saved = [
      { key: '2026-03-07 09:50 blue', date: '2026-03-07', time: '09:50', group: 'blue', sessionNumber: 1, laps: [{ ms: 101_000 }, { ms: 99_420 }] },
      { key: '2026-03-07 11:45 blue', date: '2026-03-07', time: '11:45', group: 'blue', sessionNumber: 2, laps: [{ ms: 98_910 }, { ms: 99_300 }] },
    ]
    openEvent()
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes (2)' }))
    const chart = screen.getByRole('group', { name: /^Best and average lap in each session, in schedule order: 2 sessions\./ })
    expect(chart.closest('div.rounded-2xl')).toHaveTextContent(/^Lap times by session/)
    // Session by session, under their numbers; the latest best at the end.
    expect([...chart.querySelectorAll('svg > text')].map(t => t.textContent).filter(t => /^S\d/.test(t!))).toEqual(['S1', 'S2'])
    expect(chart.querySelector('[data-end-label="best"]')).toHaveTextContent('1:38.91')
    fireEvent.focus(chart)
    const readout = within(chart).getByRole('status')
    expect(readout).toHaveTextContent('Session 211:45 AM · Blue1:38.91Best1:39.105Average')
    fireEvent.keyDown(chart, { key: 'ArrowLeft' })
    expect(readout).toHaveTextContent('Session 19:50 AM · Blue1:39.42Best1:40.210Average')
  })

  it('shows each session’s top and average speed, and charts top speed on a right-hand axis (#298)', async () => {
    saved = [
      { key: '2026-03-07 09:50 blue', date: '2026-03-07', time: '09:50', group: 'blue', sessionNumber: 1,
        laps: [{ ms: 101_000, topMph: 103.9, avgMph: 69 }, { ms: 99_420, topMph: 104.5, avgMph: 70 }] },
      { key: '2026-03-07 11:45 blue', date: '2026-03-07', time: '11:45', group: 'blue', sessionNumber: 2, laps: [{ ms: 98_910 }, { ms: 99_300 }] },
    ]
    openEvent()
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes (2)' }))
    // A row under the lap times (#324), the top speed in a chip like the best
    // lap's; nothing for a session without speeds.
    const withSpeeds = screen.getByRole('region', { name: 'Session 1, 9:50 AM' })
    expect(withSpeeds).toHaveTextContent('Laps & speeds · 2 laps')
    expect(sessionFigures(withSpeeds)).toEqual([
      ['', 'Average', 'Best / top'],
      ['Lap time', '1:40.210', '1:39.42'],
      ['Speed', '69.5 mph', '104.5 mph'],
    ])
    expect(withSpeeds.querySelector('[data-top-speed]')).toHaveTextContent('104.5')
    const without = screen.getByRole('region', { name: 'Session 2, 11:45 AM' })
    expect(without).toHaveTextContent('Lap times · 2 laps')
    expect(sessionFigures(without)).toEqual([
      ['', 'Average', 'Best'],
      ['Lap time', '1:39.105', '1:38.91'],
    ])

    const chart = screen.getByRole('group', { name: /^Best and average lap in each session, in schedule order, with top speed in mph on the right: 2 sessions\./ })
    const legend = chart.parentElement!
    expect(legend).toHaveTextContent('Top speed, mph (right)')
    expect(legend).not.toHaveTextContent(/lower is faster/i)
    // One point: the session with speeds; its ticks on the lap times' grid lines.
    expect(chart.querySelectorAll('[data-series="speed"] circle')).toHaveLength(1)
    expect(chart.querySelectorAll('[data-speed-tick]')).toHaveLength(chart.querySelectorAll('svg line[stroke="#e5e7eb"]').length)
    // The right edge is the speed axis's: no lap time labelled beside its ticks.
    expect(chart.querySelector('[data-end-label]')).toBeNull()
    fireEvent.focus(chart)
    fireEvent.keyDown(chart, { key: 'ArrowLeft' })
    expect(within(chart).getByRole('status')).toHaveTextContent('104.5mph top speed')
  })

  it('gives every session’s table the same columns, so they line up', async () => {
    saved = [
      { key: '2026-03-07 09:50 blue', date: '2026-03-07', time: '09:50', group: 'blue', sessionNumber: 1, laps: [{ ms: 99_420 }] },
      { key: '2026-03-07 11:45 blue', date: '2026-03-07', time: '11:45', group: 'blue', sessionNumber: 2, laps: [{ ms: 98_910, start: '~2:32:44 PM', end: '~2:34:26 PM' }] },
    ]
    openEvent()
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes (2)' }))
    await userEvent.click(screen.getByRole('button', { name: 'Expand all' }))
    const headers = screen.getAllByRole('table', { name: 'Laps' }).map(t => rows(t)[0])
    expect(headers).toEqual([['Lap', 'From / To', 'Lap time'], ['Lap', 'From / To', 'Lap time']])
  })

  it('fades a skeleton in while the laps load, then out as they fade in', async () => {
    saved = [{ key: '2026-03-07 09:50 blue', date: '2026-03-07', time: '09:50', group: 'blue', sessionNumber: 1, laps: [{ ms: 99_420 }] }]
    let release!: () => void
    holdLaps = new Promise(resolve => { release = resolve })
    openEvent()
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes' }))
    const skeleton = screen.getByLabelText('Loading your lap times')
    expect(skeleton).toHaveClass('fade-in')

    release()
    await waitFor(() => expect(skeleton).toHaveClass('fade-out'))
    expect(screen.queryByRole('group', { name: 'Best lap this event' })).toBeNull()
    await waitFor(() => expect(screen.queryByLabelText('Loading your lap times')).toBeNull())
    expect(screen.getByRole('group', { name: 'Best lap this event' }).closest('.fade-in')).not.toBeNull()
  })

  it('opens and closes every session’s laps at once', async () => {
    saved = [
      { key: '2026-03-07 09:50 blue', date: '2026-03-07', time: '09:50', group: 'blue', sessionNumber: 1, laps: [{ ms: 99_420 }] },
      { key: '2026-03-07 11:45 blue', date: '2026-03-07', time: '11:45', group: 'blue', sessionNumber: 2, laps: [{ ms: 98_910 }] },
    ]
    openEvent()
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes (2)' }))
    expect(screen.queryAllByRole('table', { name: 'Laps' })).toHaveLength(0)
    await userEvent.click(screen.getByRole('button', { name: 'Expand all' }))
    expect(screen.getAllByRole('table', { name: 'Laps' })).toHaveLength(2)
    await userEvent.click(screen.getByRole('button', { name: 'Collapse all' }))
    expect(screen.queryAllByRole('table', { name: 'Laps' })).toHaveLength(0)
  })

  it('goes back to the list on Escape without saving, and closes on Escape again', async () => {
    openEvent()
    await tapSession('Lap times: 11:45 AM, Blue')
    fireEvent.change(screen.getByLabelText('Lap times or timestamps'), { target: { value: '1:44' } })
    await userEvent.keyboard('{Escape}')
    await backOnList()
    await userEvent.keyboard('{Escape}')
    await sheetGone()
    expect(lapCalls('PUT')).toHaveLength(0)
  })
})


// Switch driver (#396): from the account menu (#416), the one place to pick it (#399),
// then back to the page it was picked from; back to "Me" is the banner's
// Switch back, on every page.
async function switchDriver(name: string) {
  if (name === 'Me') {
    await userEvent.click(within(screen.getByRole('region', { name: 'Acting as' })).getByRole('button', { name: 'Switch back' }))
    expect(screen.queryByRole('region', { name: 'Acting as' })).not.toBeInTheDocument()
    return
  }
  const back = window.location.hash
  window.location.hash = '#/'
  await userEvent.click(await screen.findByRole('button', { name: /^Account: / }))
  await userEvent.click(within(screen.getByRole('dialog', { name: 'Account' })).getByRole('button', { name: /^Switch driver/ }))
  const sheet = screen.getByRole('dialog', { name: 'Switch driver' })
  await userEvent.click(await within(sheet).findByRole('radio', { name }))
  expect(screen.queryByRole('dialog', { name: 'Switch driver' })).not.toBeInTheDocument()
  window.location.hash = back
}

describe('an admin logging another driver’s lap times (#288)', () => {
  const blue2 = (ms: number): SessionLaps => ({
    key: '2026-03-07 11:45 blue', date: '2026-03-07', time: '11:45', group: 'blue', sessionNumber: 2, laps: [{ ms }],
  })
  beforeEach(() => { roles = ['admin'] })

  it('switches driver only from the account menu: no picker on the event, its "…" menu, the schedule or the sheet (#399)', async () => {
    openEvent()
    await userEvent.click(await screen.findByRole('button', { name: 'More actions' }))
    expect(screen.queryByRole('menuitem', { name: /^Switch driver/ })).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'More actions' }))

    await switchDriver('Jason')
    await tapSession('Lap times: 11:45 AM, Blue')
    expect(screen.queryByLabelText('Driver')).not.toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    await userEvent.click(screen.getByRole('tab', { name: /^My notes/ }))
    expect(await screen.findByText('No session notes yet')).toBeInTheDocument()
    expect(screen.queryByLabelText('Driver')).not.toBeInTheDocument()
  })

  it('saves the laps as the driver switched to', async () => {
    openEvent()
    await switchDriver('Jason')
    await tapSession('Lap times: 11:45 AM, Blue')
    const sheet = screen.getByRole('dialog')
    // Only the banner says it's his (#364), and nothing says who can see it (#414).
    expect(sheet).not.toHaveTextContent('admins can see')
    const box = await within(sheet).findByLabelText('Lap times or timestamps')
    fireEvent.change(box, { target: { value: '1:24.5, 1:23.9' } })
    await userEvent.click(within(sheet).getByRole('button', { name: 'Save' }))
    await backOnList()
    await closeList()
    expect(screen.getByRole('status')).toHaveTextContent('Lap times saved')

    const [url] = lapCalls('PUT')[0]
    expect(String(url)).toContain(`driver=${JASON}`)
    expect(jasonSaved.map(s => s.key)).toEqual(['2026-03-07 11:45 blue'])
    expect(saved).toEqual([])

    // The schedule marks his laps, and the admin's own again on switching back.
    expect(screen.getByRole('button', { name: 'Lap times: 11:45 AM, Blue (saved)' })).toBeInTheDocument()
    await switchDriver('Me')
    expect(await screen.findByRole('button', { name: 'Lap times: 11:45 AM, Blue' })).toBeInTheDocument()
  })

  it('shows the switched-to driver’s saved laps, and yours again on switching back', async () => {
    saved = [blue2(99_420)]
    jasonSaved = [blue2(84_420)]
    openEvent()
    const savedLaps = () => rows(within(screen.getByRole('dialog')).getByRole('region', { name: 'Saved laps' }))[1]
    // Escape takes the laps down to the list (#388), and again closes that.
    const closeAll = async () => {
      await userEvent.keyboard('{Escape}')
      await screen.findByRole('navigation', { name: 'Session info' })
      await userEvent.keyboard('{Escape}')
      await sheetGone()
    }
    await tapSession('Lap times: 11:45 AM, Blue (saved)')
    expect(savedLaps()).toEqual(['1', '1:39.42'])
    await closeAll()

    await switchDriver('Jason')
    await userEvent.click(await screen.findByRole('button', { name: 'Lap times: 11:45 AM, Blue (saved)' }))
    await openInSheet('Lap times')
    await waitFor(() => expect(savedLaps()).toEqual(['1', '1:24.42']))
    await closeAll()

    await switchDriver('Me')
    await userEvent.click(await screen.findByRole('button', { name: 'Lap times: 11:45 AM, Blue (saved)' }))
    await openInSheet('Lap times')
    await waitFor(() => expect(savedLaps()).toEqual(['1', '1:39.42']))
  })

  it('lists the switched-to driver’s laps on My notes', async () => {
    saved = [blue2(99_000)]
    openEvent()
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes (1)' }))
    await switchDriver('Jason')
    await userEvent.click(await screen.findByRole('tab', { name: /^My notes/ }))
    expect(await screen.findByText('No session notes yet')).toBeInTheDocument()
    // Worded as he'd see it (#364): only the banner says whose.
    expect(screen.getByRole('region', { name: 'Acting as' })).toHaveTextContent('Acting as Jason')
    expect(screen.getByText('On the Schedule tab, tap a session you drove to add your laps, tire pressures or your instructor’s feedback.')).toBeInTheDocument()
    expect(screen.queryByText('Private')).not.toBeInTheDocument()

    // Picked again, they're fetched afresh.
    jasonSaved = [blue2(84_000)]
    await switchDriver('Me')
    await switchDriver('Jason')
    await userEvent.click(await screen.findByRole('tab', { name: /^My notes/ }))
    expect(await screen.findByRole('tab', { name: 'My notes (1)' })).toBeInTheDocument()
    expect(await screen.findByRole('group', { name: 'Best lap this event' })).toHaveTextContent('1:24')

    // Another event is Jason's too: the switch is for everywhere (#396),
    // and the banner over every page says so.
    window.location.hash = `#/event/${sameLayout.id}`
    const earlier = () => lapCalls('GET').filter(([url]) => String(url).includes(`event=${sameLayout.id}`))
    await waitFor(() => expect(earlier()).toHaveLength(1))
    expect(String(earlier()[0][0])).toContain(`driver=${JASON}`)
    const banner = screen.getByRole('region', { name: 'Acting as' })
    expect(banner).toHaveTextContent('Acting as Jason')
    // Its Switch back is back to the admin's own, everywhere.
    await userEvent.click(within(banner).getByRole('button', { name: 'Switch back' }))
    expect(screen.queryByRole('region', { name: 'Acting as' })).not.toBeInTheDocument()
    await waitFor(() => expect(earlier()).toHaveLength(2))
    expect(String(earlier()[1][0])).not.toContain('driver=')
  })
  it('switches driver from the account menu, for every page, with a banner saying who until switched back (#396)', async () => {
    window.location.hash = '#/'
    render(<AuthProvider><EventsProvider><RsvpsProvider><App /></RsvpsProvider></EventsProvider></AuthProvider>)
    expect(screen.queryByRole('region', { name: 'Acting as' })).not.toBeInTheDocument()
    await userEvent.click(await screen.findByRole('button', { name: /^Account: / }))
    await userEvent.click(within(screen.getByRole('dialog', { name: 'Account' })).getByRole('button', { name: /^Switch driver/ }))
    const sheet = screen.getByRole('dialog', { name: 'Switch driver' })
    await waitFor(() => expect(within(sheet).getAllByRole('radio').map(r => [r.getAttribute('aria-label'), r.getAttribute('aria-checked')]))
      .toEqual([['Me', 'true'], ['Test account', 'false'], ['Jason', 'false']]))
    // Each driver with their picture (#416).
    expect(within(sheet).getByRole('radio', { name: 'Jason' }).querySelector('img')).toHaveAttribute('src', 'https://pics.example/jason.jpg')
    await userEvent.click(within(sheet).getByRole('radio', { name: 'Jason' }))
    expect(screen.queryByRole('dialog', { name: 'Switch driver' })).not.toBeInTheDocument()
    // Plain that it's his app they're in (#416): his picture, and everything as him.
    const banner = screen.getByRole('region', { name: 'Acting as' })
    expect(banner).toHaveTextContent('Acting as Jason')
    expect(banner).toHaveTextContent('Everything shows and saves as them')
    expect(banner.querySelector('img')).toHaveAttribute('src', 'https://pics.example/jason.jpg')
    expect(screen.getByRole('button', { name: 'Account: v@example.com, acting as Jason' })).toBeInTheDocument()
    const asked = (what: string) => fetchMock.mock.calls.some(([url]) => String(url).includes(`api/${what}?driver=${JASON}`))
    // Their answers, for My events…
    await waitFor(() => expect(asked('rsvps')).toBe(true))
    // …and their evaluations, on a page that isn't an event's.
    window.location.hash = '#/evaluations'
    await waitFor(() => expect(asked('notes')).toBe(true))
    // The menu says who, and the way back is the banner's.
    await userEvent.click(within(banner).getByRole('button', { name: 'Switch back' }))
    expect(screen.queryByRole('region', { name: 'Acting as' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Account: v@example.com' })).toBeInTheDocument()
  })

  it('on the test account, says so in the banner (#309, #396)', async () => {
    window.location.hash = '#/'
    render(<AuthProvider><EventsProvider><RsvpsProvider><App /></RsvpsProvider></EventsProvider></AuthProvider>)
    await userEvent.click(await screen.findByRole('button', { name: /^Account: / }))
    await userEvent.click(within(screen.getByRole('dialog', { name: 'Account' })).getByRole('button', { name: /^Switch driver/ }))
    await userEvent.click(within(screen.getByRole('dialog', { name: 'Switch driver' })).getByRole('radio', { name: 'Test account' }))
    expect(screen.getByRole('region', { name: 'Acting as' })).toHaveTextContent('On the test account')
    expect(screen.getByRole('button', { name: 'Account: v@example.com, on the test account' })).toBeInTheDocument()
  })
})

describe('instructor evaluation (#340)', () => {
  // A TDE event: the report card is theirs alone.
  const tde: EventConfig = {
    ...event,
    id: '2026-03-21_tde-day',
    name: 'TDE Day',
    organizer: 'The Drivers Edge',
    runGroups: [
      { id: 'instructors', label: 'Instructors', bgClass: 'bg-zinc-900', textClass: 'text-white' },
      { id: 'pink', label: 'Pink', bgClass: 'bg-runpink-500', textClass: 'text-white' },
    ],
    days: [{ id: 'saturday', label: 'Saturday', date: '2026-03-21', activities: [
      { time: '10:25', type: 'session', sessionNumber: 2, onTrack: ['pink'] },
    ] }],
  }
  function openTde() {
    moreEvents = [tde]
    window.location.hash = `#/event/${tde.id}`
    render(<AuthProvider><EventsProvider><RsvpsProvider><App /></RsvpsProvider></EventsProvider></AuthProvider>)
  }

  it('adds a session’s evaluation from the schedule, and shows it on My notes, laps or not', async () => {
    openEvent()
    await tapSession('Lap times: 11:45 AM, Blue', null)
    const sheet = screen.getByRole('dialog', { name: '11:45 AM · Blue' })
    // The sheet lists what the session can have (#205).
    const nav = within(sheet).getByRole('navigation', { name: 'Session info' })
    // In the order the day goes, and nothing under one till it has something (#388).
    expect(within(nav).getAllByRole('button').map(b => b.textContent)).toEqual(['Track conditions', 'Instructor feedback', 'Lap times'])
    const page = await openInSheet('Instructor feedback')
    // Its name heads it, between Cancel and Save, with the session under it (#388).
    expect(within(page).getByRole('heading', { level: 1 })).toHaveTextContent('Instructor feedback')
    expect(page).toHaveTextContent('Session 2 · 11:45 AM · Blue')
    expect(within(page).queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
    // Nothing to save till there's feedback.
    expect(within(page).getByRole('button', { name: 'Save' })).toBeDisabled()
    fireEvent.change(within(page).getByLabelText('What they said'), { target: { value: 'Unwind the wheel sooner.' } })
    fireEvent.change(within(page).getByRole('textbox', { name: /^Instructor\s?Optional$/ }), { target: { value: 'John Harms' } })
    await userEvent.click(within(page).getByRole('button', { name: 'Save' }))
    await backOnList()
    expect(screen.getByRole('status')).toHaveTextContent('Feedback saved')
    await closeList()
    expect(JSON.parse(String(notesCalls('PUT')[0][1]!.body)).session).toEqual({
      date: '2026-03-07', time: '11:45', group: 'blue', sessionNumber: 2,
      evaluation: { feedback: 'Unwind the wheel sooner.', instructor: 'John Harms' },
    })
    expect(lapCalls('PUT')).toHaveLength(0)

    // The schedule marks it; My notes counts it and lists it, with no laps.
    expect(screen.getByRole('button', { name: 'Lap times: 11:45 AM, Blue (evaluated)' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('tab', { name: 'My notes (1)' }))
    const card = screen.getByRole('region', { name: 'Session 2, 11:45 AM' })
    expect(card).toHaveTextContent('Instructor feedback · John HarmsUnwind the wheel sooner.')
    expect(within(card).queryByRole('table', { name: 'Session figures' })).not.toBeInTheDocument()

    // Its chevron opens it in the sheet, where it's removed.
    await userEvent.click(within(card).getByRole('button', { name: 'Open the instructor feedback for Session 2' }))
    const again = screen.getByRole('dialog', { name: 'Instructor feedback, 11:45 AM · Blue' })
    expect(within(again).getByLabelText('What they said')).toHaveValue('Unwind the wheel sooner.')
    await userEvent.click(within(again).getByRole('button', { name: 'Remove from session' }))
    await userEvent.click(within(again).getByRole('button', { name: 'Remove' }))
    await sheetGone()
    expect(notesCalls('DELETE')[0][0]).toContain(`session=${encodeURIComponent('2026-03-07 11:45 blue')}`)
    expect(screen.getByText('No session notes yet')).toBeInTheDocument()
  })

  it('shows a session’s evaluation under its laps, and the menu says what each has', async () => {
    saved = [{ key: '2026-03-07 11:45 blue', date: '2026-03-07', time: '11:45', group: 'blue', sessionNumber: 2, laps: [{ ms: 99_420 }, { ms: 98_910 }] }]
    notesByEvent = { [event.id]: { sessions: [{
      key: '2026-03-07 11:45 blue', date: '2026-03-07', time: '11:45', group: 'blue', sessionNumber: 2,
      evaluation: { feedback: 'Eyes up through Big Bend.' },
    }] } }
    openEvent()
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes (1)' }))
    const card = screen.getByRole('region', { name: 'Session 2, 11:45 AM' })
    expect(card).toHaveTextContent('Lap times · 2 laps')
    expect(card.querySelector('[data-session-evaluation]')).toHaveTextContent('Instructor feedbackEyes up through Big Bend.')

    // Edit opens the sheet on everything the session has.
    await userEvent.click(within(card).getByRole('button', { name: 'Edit Session 2' }))
    const nav = within(screen.getByRole('dialog')).getByRole('navigation', { name: 'Session info' })
    expect(within(nav).getAllByRole('button').map(b => b.textContent))
      .toEqual(['Track conditions', 'Instructor feedbackEyes up through Big Bend.', 'Lap times2 laps · best 1:38.91'])
    // No dot for what's saved: what's under it says so (#388).
    expect(nav.querySelector('.bg-green-500')).toBeNull()
    // And back from one of them, once it's slid down: Done on saved laps,
    // Cancel once editing.
    await userEvent.click(within(await openInSheet('Lap times')).getByRole('button', { name: 'Done' }))
    expect(await screen.findByRole('dialog', { name: '11:45 AM · Blue' })).toBeInTheDocument()
    await userEvent.click(within(await openInSheet('Instructor feedback')).getByRole('button', { name: 'Cancel' }))
    expect(await screen.findByRole('navigation', { name: 'Session info' })).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toHaveAccessibleName('11:45 AM · Blue')

    // Opened for just the one, Cancel closes the sheet.
    await userEvent.keyboard('{Escape}')
    await sheetGone()
    await userEvent.click(within(screen.getByRole('region', { name: 'Session 2, 11:45 AM' })).getByRole('button', { name: 'Open the instructor feedback for Session 2' }))
    await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Cancel' }))
    await sheetGone()
  })

  it('adds the whole event’s evaluation on any event: on others, just the instructor and their notes', async () => {
    openEvent()
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes' }))
    // Once the notes are in.
    const add = await screen.findByRole('button', { name: /^Add instructor evaluation/ })
    expect(add).toHaveTextContent('What your instructor said about the whole event')
    await userEvent.click(add)
    const sheet = screen.getByRole('dialog', { name: 'Instructor evaluation' })
    // None of TDE's report card.
    expect(within(sheet).queryByLabelText('Car')).not.toBeInTheDocument()
    expect(within(sheet).queryByText('Recommended run group')).not.toBeInTheDocument()
    expect(within(sheet).queryByText('Core skills')).not.toBeInTheDocument()
    expect(within(sheet).queryByText('You drove in')).not.toBeInTheDocument()
    fireEvent.change(within(sheet).getByLabelText('Instructor'), { target: { value: 'Pat Lee' } })
    fireEvent.change(within(sheet).getByLabelText('Instructor notes'), { target: { value: 'Smooth hands; look further ahead.' } })
    await userEvent.click(within(sheet).getByRole('button', { name: 'Save' }))
    await sheetGone()
    expect(JSON.parse(String(notesCalls('PUT')[0][1]!.body)).evaluation).toEqual({ instructor: 'Pat Lee', notes: 'Smooth hands; look further ahead.' })
    const card = screen.getByRole('region', { name: 'Instructor evaluation' })
    expect(card).toHaveTextContent('Instructor evaluationInstructorPat LeeInstructor notesSmooth hands; look further ahead.Edit evaluation')
    expect(screen.getByRole('tab', { name: 'My notes (1)' })).toBeInTheDocument()
  })

  it('offers no evaluation of an event that hasn’t begun', async () => {
    const coming: EventConfig = {
      ...event, id: '2099-05-02_coming', name: 'Coming Up',
      days: [{ ...event.days[0], date: '2099-05-02' }],
    }
    moreEvents = [coming]
    window.location.hash = `#/event/${coming.id}`
    render(<AuthProvider><EventsProvider><App /></EventsProvider></AuthProvider>)
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes' }))
    expect(await screen.findByText('No session notes yet')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /^Add instructor evaluation/ })).not.toBeInTheDocument()
  })

  it('keeps the whole event’s evaluation after leaving the event and coming back', async () => {
    openTde()
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes' }))
    await userEvent.click(await screen.findByRole('button', { name: /^Add instructor evaluation/ }))
    fireEvent.change(within(screen.getByRole('dialog')).getByLabelText('Instructor'), { target: { value: 'John Harms' } })
    await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Save' }))
    await sheetGone()
    expect(screen.getByRole('region', { name: 'Instructor evaluation' })).toHaveTextContent('John Harms')

    await userEvent.click(screen.getAllByRole('button', { name: 'Back' })[0])
    await userEvent.click(await screen.findByRole('button', { name: /TDE Day/ }))
    await userEvent.click(await screen.findByRole('tab', { name: /My notes/ }))
    expect(await screen.findByRole('region', { name: 'Instructor evaluation' })).toHaveTextContent('John Harms')
  })

  it('on a TDE event, adds the report card: skills, recommended groups and notes, with the group from “Did you drive?”', async () => {
    rsvps = { [tde.id]: { status: 'going', runGroup: 'pink' } }
    openTde()
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes' }))
    await userEvent.click(await screen.findByRole('button', { name: /^Add instructor evaluation/ }))
    const sheet = screen.getByRole('dialog', { name: 'Instructor evaluation' })
    // Their group is the event's, shown, not picked.
    expect(sheet).toHaveTextContent('You drove inPink')
    expect(within(sheet).queryByRole('combobox')).not.toBeInTheDocument()
    expect(within(sheet).getByRole('button', { name: 'Save' })).toBeDisabled()

    fireEvent.change(within(sheet).getByLabelText('Instructor'), { target: { value: 'John Harms' } })
    fireEvent.change(within(sheet).getByLabelText('Car'), { target: { value: 'Porsche Panamera' } })
    // Recommendations are picked from a menu of the app's run group
    // badges, as the Schedule tab filters them; never Instructors.
    await userEvent.click(within(sheet).getByRole('button', { name: 'Same track & direction: none' }))
    const menu = within(sheet).getByRole('listbox', { name: 'Same track & direction' })
    expect(within(menu).getAllByRole('option').map(o => o.textContent)).toEqual(['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Pink', 'Purple'])
    await userEvent.click(within(menu).getByRole('option', { name: 'Blue' }))
    expect(within(sheet).queryByRole('listbox')).not.toBeInTheDocument()
    expect(within(sheet).getByRole('button', { name: 'Same track & direction: Blue' })).toBeInTheDocument()
    await userEvent.click(within(sheet).getByRole('button', { name: 'New track: none' }))
    await userEvent.click(within(within(sheet).getByRole('listbox', { name: 'New track' })).getByRole('option', { name: 'Green' }))
    // Escape closes a menu, not the sheet.
    await userEvent.click(within(sheet).getByRole('button', { name: 'New direction: none' }))
    await userEvent.keyboard('{Escape}')
    expect(within(sheet).queryByRole('listbox')).not.toBeInTheDocument()
    expect(screen.getByRole('dialog', { name: 'Instructor evaluation' })).toBeInTheDocument()
    // Scores: digits only, at most 100.
    fireEvent.change(within(sheet).getByLabelText('Calls out all flags'), { target: { value: '65' } })
    fireEvent.change(within(sheet).getByLabelText('Looks ahead'), { target: { value: '8o0' } })
    expect(within(sheet).getByLabelText('Looks ahead')).toHaveValue('80')
    fireEvent.change(within(sheet).getByLabelText('Consistency'), { target: { value: '150' } })
    expect(within(sheet).getByLabelText('Consistency')).toHaveValue('100')
    await userEvent.click(within(within(sheet).getByRole('group', { name: 'Aggressiveness = skill' })).getByRole('button', { name: 'Yes' }))
    fireEvent.change(within(sheet).getByLabelText('Car aids over activated'), { target: { value: '25' } })
    fireEvent.change(within(sheet).getByLabelText('Instructor notes'), { target: { value: 'Very smooth.' } })
    await userEvent.click(within(sheet).getByRole('button', { name: 'Save' }))
    await sheetGone()

    expect(JSON.parse(String(notesCalls('PUT')[0][1]!.body)).evaluation).toEqual({
      instructor: 'John Harms',
      car: 'Porsche Panamera',
      next: { sameTrack: 'Blue', newTrack: 'Green' },
      skills: { flags: 65, vision: 80, consistency: 100 },
      aggressivenessIsSkill: true,
      carAidsPct: 25,
      notes: 'Very smooth.',
    })
    const card = screen.getByRole('region', { name: 'Instructor evaluation' })
    expect(card).toHaveTextContent('InstructorJohn Harms')
    expect(card).toHaveTextContent('CarPorsche Panamera')
    expect(card).toHaveTextContent('Run groupPink')
    expect(card).toHaveTextContent('Same track & directionBlue')
    expect(card).not.toHaveTextContent('New direction')
    expect(within(card).getByRole('list', { name: 'Core skills' })).toHaveTextContent('Calls out all flags65%Looks ahead80%Consistency100%')
    expect(card).toHaveTextContent('Aggressiveness = skillYes')
    expect(card).toHaveTextContent('Car aids over activated25%')
    expect(card).toHaveTextContent('Instructor notesVery smooth.')
    // It counts on the tab.
    expect(screen.getByRole('tab', { name: 'My notes (1)' })).toBeInTheDocument()

    // Edited, and removed.
    await userEvent.click(within(card).getByRole('button', { name: 'Edit evaluation' }))
    const again = screen.getByRole('dialog', { name: 'Instructor evaluation' })
    expect(within(again).getByLabelText('Calls out all flags')).toHaveValue('65')
    await userEvent.click(within(again).getByRole('button', { name: 'Remove evaluation' }))
    await userEvent.click(within(again).getByRole('button', { name: 'Remove' }))
    await sheetGone()
    expect(notesCalls('DELETE')[0][0]).toContain('evaluation=1')
    expect(screen.getByRole('button', { name: /^Add instructor evaluation/ })).toBeInTheDocument()
  })

  // Each run group has a report card of its own (#350): Blue's has its own
  // skills and fields. Two of Jason's events: in Blue, and in Orange, which
  // has no card of its own.
  const blueDay: EventConfig = {
    ...tde,
    id: '2024-11-02_tde-at-msrc-3-1-ccw',
    name: 'TDE at MSRC 3.1 CCW',
    runGroups: [
      { id: 'blue', label: 'Blue', bgClass: 'bg-runblue-500', textClass: 'text-white' },
      { id: 'orange', label: 'Orange', bgClass: 'bg-runorange-500', textClass: 'text-white' },
    ],
    days: [{ id: 'saturday', label: 'Saturday', date: '2024-11-02', activities: [] }],
  }
  const orangeDay: EventConfig = {
    ...blueDay,
    id: '2024-12-07_tde-at-msrc-1-7-cw',
    name: 'TDE at MSRC 1.7 CW',
    days: [{ id: 'saturday', label: 'Saturday', date: '2024-12-07', activities: [] }],
  }
  async function openFormOn(e: EventConfig) {
    moreEvents = [blueDay, orangeDay]
    window.location.hash = `#/event/${e.id}`
    render(<AuthProvider><EventsProvider><RsvpsProvider><App /></RsvpsProvider></EventsProvider></AuthProvider>)
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes' }))
    await userEvent.click(await screen.findByRole('button', { name: /^Add instructor evaluation/ }))
    return screen.getByRole('dialog', { name: 'Instructor evaluation' })
  }

  it('on a Blue run group’s event, fills in Blue’s report card: its skills and its own fields (#350)', async () => {
    rsvps = { [blueDay.id]: { status: 'going', runGroup: 'blue' } }
    const sheet = await openFormOn(blueDay)
    const cards = within(sheet).getByRole('group', { name: 'Report card' })
    expect(within(cards).getByRole('button', { name: 'Blue' })).toHaveAttribute('aria-pressed', 'true')
    expect(within(sheet).queryByLabelText('Looks ahead')).not.toBeInTheDocument()

    fireEvent.change(within(sheet).getByLabelText('Instructor'), { target: { value: 'Tom Albertson' } })
    await userEvent.click(within(within(sheet).getByRole('group', { name: 'Instructed' })).getByRole('button', { name: 'Full-time' }))
    fireEvent.change(within(sheet).getByLabelText('ESP / traction control'), { target: { value: 'Comp Mode' } })
    // A recommended group says how, and can be one of two.
    await userEvent.click(within(sheet).getByRole('button', { name: 'Same track & direction: none' }))
    await userEvent.click(within(within(sheet).getByRole('listbox', { name: 'Same track & direction' })).getByRole('option', { name: 'Blue' }))
    await userEvent.selectOptions(within(sheet).getByRole('combobox', { name: 'Same track & direction: how' }), 'Full-time instructor')
    await userEvent.click(within(sheet).getByRole('button', { name: 'New track: none' }))
    await userEvent.click(within(within(sheet).getByRole('listbox', { name: 'New track' })).getByRole('option', { name: 'Blue' }))
    await userEvent.selectOptions(within(sheet).getByRole('combobox', { name: 'New track: how' }), 'Part-time solo')
    await userEvent.click(within(sheet).getByRole('button', { name: 'New track, or: none' }))
    await userEvent.click(within(within(sheet).getByRole('listbox', { name: 'New track, or' })).getByRole('option', { name: 'Yellow' }))
    fireEvent.change(within(sheet).getByLabelText('Acknowledges all flags early'), { target: { value: '65' } })
    fireEvent.change(within(sheet).getByLabelText('Able to take a corner offline'), { target: { value: '95' } })
    await userEvent.click(within(within(sheet).getByRole('group', { name: 'Aggressiveness = skill' })).getByRole('button', { name: 'Too aggressive' }))
    fireEvent.change(within(sheet).getByLabelText('Relies on car aids'), { target: { value: '0' } })
    await userEvent.click(within(within(sheet).getByRole('group', { name: 'Blue part-time solo qualified' })).getByRole('button', { name: 'No' }))

    // Green's card instead: a skill both have keeps its score; Blue's own fields go.
    await userEvent.click(within(cards).getByRole('button', { name: 'Green' }))
    expect(within(sheet).getByLabelText('Calls out all flags')).toHaveValue('65')
    expect(within(sheet).queryByRole('group', { name: 'Instructed' })).not.toBeInTheDocument()
    expect(within(within(sheet).getByRole('group', { name: 'Aggressiveness = skill' })).queryByRole('button', { name: 'Too aggressive' })).not.toBeInTheDocument()
    await userEvent.click(within(cards).getByRole('button', { name: 'Blue' }))

    await userEvent.click(within(sheet).getByRole('button', { name: 'Save' }))
    await sheetGone()
    expect(JSON.parse(String(notesCalls('PUT')[0][1]!.body)).evaluation).toEqual({
      card: 'blue',
      instructor: 'Tom Albertson',
      instructed: 'fullTime',
      escTc: 'Comp Mode',
      next: { sameTrack: 'Blue', newTrack: 'Blue' },
      nextHow: { sameTrack: 'fullTime', newTrack: 'partTime' },
      nextOr: { newTrack: 'Yellow' },
      skills: { flags: 65, offline: 95 },
      aggressivenessIsSkill: 'tooAggressive',
      carAidsPct: 0,
      soloQualified: false,
    })
    const card = screen.getByRole('region', { name: 'Instructor evaluation' })
    expect(card).toHaveTextContent('Report cardBlue')
    expect(card).toHaveTextContent('InstructedFull-time')
    expect(card).toHaveTextContent('ESP / traction controlComp Mode')
    expect(card).toHaveTextContent('Same track & directionBlueFull-time instructor')
    expect(card).toHaveTextContent('New trackBluePart-time soloorYellow')
    expect(within(card).getByRole('list', { name: 'Core skills' })).toHaveTextContent('Acknowledges all flags early65%Able to take a corner offline95%')
    expect(card).toHaveTextContent('Aggressiveness = skillToo aggressive')
    expect(card).toHaveTextContent('Relies on car aidsNever')
    expect(card).toHaveTextContent('Blue part-time solo qualifiedNo')

    // Edited, it opens on the card it was saved on.
    await userEvent.click(within(card).getByRole('button', { name: 'Edit evaluation' }))
    const again = screen.getByRole('dialog', { name: 'Instructor evaluation' })
    expect(within(within(again).getByRole('group', { name: 'Report card' })).getByRole('button', { name: 'Blue' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('in a run group with no card of its own, starts on the card their latest evaluation was on (#350)', async () => {
    notesByEvent = { [blueDay.id]: { evaluation: { card: 'blue', instructor: 'Tom Albertson' }, sessions: [] } }
    rsvps = { [orangeDay.id]: { status: 'going', runGroup: 'orange' } }
    const sheet = await openFormOn(orangeDay)
    const cards = within(sheet).getByRole('group', { name: 'Report card' })
    await waitFor(() => expect(within(cards).getByRole('button', { name: 'Blue' })).toHaveAttribute('aria-pressed', 'true'))
    expect(within(sheet).getByLabelText('Acknowledges all flags early')).toBeInTheDocument()
  })
})

describe('LapTimesSheet', () => {
  it('keeps focus in the text box when the page behind re-renders', async () => {
    const props = {
      slot: { date: '2026-03-07', time: '11:45', sessionNumber: 2, groups: ['blue'] },
      view: 'laps' as const,
      runGroups: event.runGroups,
      showDate: false,
      saved: () => undefined,
      savedNotes: () => undefined,
      onSave: async () => {},
      onRemove: async () => {},
      onSaveEvaluation: async () => {},
      onRemoveEvaluation: async () => {},
    }
    // Every render of the event page hands the sheet a new onClose.
    const { rerender } = render(<LapTimesSheet {...props} onClose={() => {}} />)
    const box = screen.getByLabelText('Lap times or timestamps')
    box.focus()
    rerender(<LapTimesSheet {...props} onClose={() => {}} />)
    expect(box).toHaveFocus()
  })
})

describe('a track page: the events on one layout (#274)', () => {
  const at = (date: string, time: string, sessionNumber: number, laps: number[]): SessionLaps => ({
    key: `${date} ${time} blue`, date, time, group: 'blue', sessionNumber, laps: laps.map(ms => ({ ms })),
  })
  const TRACK = '#/track/msrc-1-7-cw'
  // The track page, as opposed to the event page under or over it.
  const trackPage = async () => (await screen.findByRole('heading', { level: 1, name: 'MSRC 1.7 CW' })).closest<HTMLElement>('.fixed')!
  // Its event cards, newest first.
  const cards = async () => within(await within(await trackPage()).findByRole('region', { name: 'Events' })).getAllByRole('link')
  const card = async (name: string) => (await cards()).find(c => c.textContent!.includes(name))!

  beforeEach(() => {
    saved = [at('2026-03-07', '11:45', 2, [99_420, 99_100])]
    elsewhere = {
      [sameLayout.id]: [at('2026-02-07', '09:50', 1, [101_000, 98_540]), at('2026-02-07', '11:45', 2, [100_200])],
      [otherWay.id]: [at('2026-01-10', '09:50', 1, [90_000])],
    }
    summary = [
      { eventId: sameLayout.id, best: 98_540, sessions: 2 },
      { eventId: otherWay.id, best: 90_000, sessions: 1 },
    ]
  })

  it('opens from the All time best card: the layout’s events, newest first, each with its run group, average and best', async () => {
    openEvent()
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes (1)' }))
    await waitFor(() => expect(screen.getByRole('group', { name: 'All time best' })).toHaveTextContent('1:38.54'))
    await userEvent.click(screen.getByRole('link', { name: 'See all my MSRC 1.7 CW laps' }))
    expect(window.location.hash).toBe(TRACK)

    const page = await trackPage()
    expect(page).toHaveTextContent('Motorsport Ranch - Cresson')
    // One request for every event on the layout — not the one run the other way.
    await within(page).findByRole('group', { name: 'All time best' })
    const [url] = lapCalls('GET').find(([u]) => String(u).includes('events='))!
    expect(new URL(String(url), 'https://x').searchParams.get('events')!.split(',')).toEqual([sameLayout.id, event.id])
    expect(within(page).getByRole('group', { name: 'All time best' })).toHaveTextContent('1:38.54Across 3 sessions at 2 events')

    // Compact cards like the Events list's, newest first: the run group, and
    // the best and average across every session. No sessions here.
    const [lapDay, earlier] = await cards()
    expect(lapDay).toHaveTextContent('Lap DayBlue')
    expect(earlier).toHaveTextContent('EarlierBlue')
    expect(figures(lapDay, 'Event figures')).toEqual({ Best: '1:39.1', Avg: '1:39.260' })
    expect(figures(earlier, 'Event figures')).toEqual({ Best: '1:38.54', Avg: '1:39.913' })
    // The best that's the all-time best says so.
    expect(earlier.querySelector('[data-all-time-best]')).not.toBeNull()
    expect(lapDay.querySelector('[data-all-time-best]')).toBeNull()
    expect(within(page).queryByRole('table')).not.toBeInTheDocument()
    expect(within(page).queryByRole('button', { name: 'Expand all' })).not.toBeInTheDocument()
    expect(within(page).queryByText('Private')).not.toBeInTheDocument()
    expect(document.title).toBe('MSRC 1.7 CW')

    // A chart of each event's best and average, oldest to newest, in the
    // best-lap card: the latest best at the end of its line (the average
    // there is too close to it to label as well).
    const chart = within(page).getByRole('group', { name: /^Best and average lap at each event, oldest to newest: 2 events/ })
    expect(within(page).getByRole('group', { name: 'All time best' })).toContainElement(chart)
    expect(chart.querySelector('[data-end-label="best"]')).toHaveTextContent('1:39.1')
    expect(chart.querySelector('[data-end-label="average"]')).toBeNull()
    // Read point by point from the keyboard: the latest first.
    fireEvent.focus(chart)
    const readout = within(chart).getByRole('status')
    expect(readout).toHaveTextContent('Lap DayMar 7, 20261:39.1Best1:39.260Average')
    fireEvent.keyDown(chart, { key: 'ArrowLeft' })
    expect(readout).toHaveTextContent('EarlierFeb 7, 20261:38.54Best1:39.913Average')
    fireEvent.keyDown(chart, { key: 'Escape' })
    expect(readout).toBeEmptyDOMElement()

    // Back to the event, on the tab it was opened from.
    await userEvent.click(within(page).getByRole('button', { name: 'Back' }))
    expect(window.location.hash).toBe(`#/event/${event.id}`)
    expect(screen.getByRole('tab', { name: 'My notes (1)' })).toHaveAttribute('aria-selected', 'true')
  })

  it('shows the fastest the driver went at each event, when speeds are logged (#298)', async () => {
    saved = [{ ...at('2026-03-07', '11:45', 2, []), laps: [{ ms: 99_420, topMph: 104.5 }, { ms: 99_100, topMph: 106.6 }, { ms: 139_000, kind: 'in', topMph: 110 }] }]
    window.location.hash = TRACK
    render(<AuthProvider><EventsProvider><App /></EventsProvider></AuthProvider>)
    await waitFor(async () => expect(figures(await card('Lap Day'), 'Event figures')).toEqual({ Best: '1:39.1', Avg: '1:39.260', Peak: '106.6' }))
    expect(figures(await card('Earlier'), 'Event figures')).toEqual({ Best: '1:38.54', Avg: '1:39.913' })
    expect(within(await trackPage()).getByRole('group', { name: /with top speed in mph on the right/ })).toBeInTheDocument()
  })

    it('opens an event’s sessions from its card, over the track page, and back returns to it', async () => {
    window.location.hash = TRACK
    render(<AuthProvider><EventsProvider><App /></EventsProvider></AuthProvider>)
    await userEvent.click(await card('Earlier'))
    expect(window.location.hash).toBe(`#/event/${sameLayout.id}`)
    expect(await screen.findByRole('tab', { name: 'My notes (2)', selected: true })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Session 1, 9:50 AM' })).toBeInTheDocument()

    // The event's Back returns to the track page, which fetches its laps again.
    const before = lapCalls('GET').filter(([u]) => String(u).includes('events=')).length
    await userEvent.click(screen.getAllByRole('button', { name: 'Back' })[0])
    expect(window.location.hash).toBe(TRACK)
    await waitFor(() => expect(lapCalls('GET').filter(([u]) => String(u).includes('events=')).length).toBe(before + 1))
    // …and its own Back, to the Tracks tab.
    await userEvent.click(within(await trackPage()).getByRole('button', { name: 'Back' }))
    expect(window.location.hash).toBe('#/tracks')
  })

  it('opened from one event, opens another over it; the event it came from is where it was', async () => {
    openEvent()
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes (1)' }))
    await userEvent.click(screen.getByRole('link', { name: 'See all my MSRC 1.7 CW laps' }))
    await userEvent.click(await card('Earlier'))
    expect(window.location.hash).toBe(`#/event/${sameLayout.id}`)
    await userEvent.click(screen.getAllByRole('button', { name: 'Back' })[0])
    expect(window.location.hash).toBe(TRACK)

    // The event it was opened from: back under the track page, on My notes.
    await userEvent.click(await card('Lap Day'))
    expect(window.location.hash).toBe(`#/event/${event.id}`)
    expect(screen.getByRole('tab', { name: 'My notes (1)' })).toHaveAttribute('aria-selected', 'true')
  })

  it('links from a session’s saved laps, saying how they compare with the all-time best', async () => {
    openEvent()
    await tapSession('Lap times: 11:45 AM, Blue (saved)')
    const sheet = screen.getByRole('dialog', { name: 'Lap times, 11:45 AM · Blue' })
    const link = within(sheet).getByRole('link', { name: 'See all my MSRC 1.7 CW laps' })
    // Once every event's best is in.
    await waitFor(() => expect(link.parentElement).toHaveTextContent('All time best on MSRC 1.7 CW: 1:38.54 · +0.56s vs this session'))

    await userEvent.click(link)
    expect(window.location.hash).toBe(TRACK)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await card('Earlier')

    // Back on the event, the sheet stays closed.
    await userEvent.click(within(await trackPage()).getByRole('button', { name: 'Back' }))
    expect(window.location.hash).toBe(`#/event/${event.id}`)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('says when a session set the all-time best', async () => {
    summary = [{ eventId: sameLayout.id, best: 99_500, sessions: 2 }]
    openEvent()
    await tapSession('Lap times: 11:45 AM, Blue (saved)')
    const link = within(screen.getByRole('dialog')).getByRole('link', { name: 'See all my MSRC 1.7 CW laps' })
    await waitFor(() => expect(link.parentElement).toHaveTextContent('All time best on MSRC 1.7 CW: 1:39.1 · set this session'))
  })

  it('opened from its link, back goes to the Tracks tab', async () => {
    window.location.hash = TRACK
    render(<AuthProvider><EventsProvider><App /></EventsProvider></AuthProvider>)
    await card('Lap Day')
    await userEvent.click(within(await trackPage()).getByRole('button', { name: 'Back' }))
    expect(window.location.hash).toBe('#/tracks')
    expect(screen.getByRole('link', { name: 'Tracks' })).toHaveAttribute('aria-current', 'page')
  })

  it('asks anyone signed out to sign in, and fetches nothing', async () => {
    signedIn = false
    window.location.hash = TRACK
    render(<AuthProvider><EventsProvider><App /></EventsProvider></AuthProvider>)
    expect(await within(await trackPage()).findByText('Sign in to see your lap times on this track')).toBeInTheDocument()
    expect(lapCalls('GET')).toHaveLength(0)
  })

  it('says when there are no laps on the layout yet', async () => {
    saved = []
    elsewhere = {}
    window.location.hash = TRACK
    render(<AuthProvider><EventsProvider><App /></EventsProvider></AuthProvider>)
    expect(await within(await trackPage()).findByText('No lap times on MSRC 1.7 CW yet')).toBeInTheDocument()
  })

  it('lists the events they said they’re going to, laps or not (#320)', async () => {
    // Laps at Lap Day only; going to Earlier, and to one still to come, in Red.
    elsewhere = {}
    const coming: EventConfig = { ...event, id: '2099-05-02_coming', name: 'Coming Up', days: [{ ...event.days[0], date: '2099-05-02' }] }
    moreEvents = [coming]
    rsvps = { [sameLayout.id]: { status: 'going' }, [coming.id]: { status: 'going', runGroup: 'red' }, [otherWay.id]: { status: 'going' } }
    window.location.hash = TRACK
    render(<AuthProvider><EventsProvider><RsvpsProvider><App /></RsvpsProvider></EventsProvider></AuthProvider>)

    await waitFor(async () => expect((await cards()).map(c => c.textContent)).toEqual([
      expect.stringMatching(/Coming Up.*Red.*Going$/),
      expect.stringContaining('Lap Day'),
      expect.stringMatching(/Earlier.*No laps$/),
    ]))
    const page = await trackPage()
    // The best is still only from the laps.
    expect(within(page).getByRole('group', { name: 'All time best' })).toHaveTextContent('1:39.1Across 1 session at 1 event')
    expect(figures(await card('Lap Day'), 'Event figures')).toEqual({ Best: '1:39.1', Avg: '1:39.260' })
    expect((await card('Coming Up')).querySelector('[aria-label="Event figures"]')).toBeNull()
    expect((await card('Earlier')).querySelector('[aria-label="Event figures"]')).toBeNull()

    // With no laps there, it opens on the Schedule, where they're added.
    await userEvent.click(await card('Earlier'))
    expect(window.location.hash).toBe(`#/event/${sameLayout.id}`)
    expect(await screen.findByRole('tab', { name: 'Schedule', selected: true })).toBeInTheDocument()
  })

  it('lists them under the note that there are no laps yet (#320)', async () => {
    saved = []
    elsewhere = {}
    rsvps = { [sameLayout.id]: { status: 'going' }, [event.id]: { status: 'maybe' } }
    window.location.hash = TRACK
    render(<AuthProvider><EventsProvider><RsvpsProvider><App /></RsvpsProvider></EventsProvider></AuthProvider>)
    const page = await trackPage()
    expect(await within(page).findByText('No lap times on MSRC 1.7 CW yet')).toBeInTheDocument()
    // A past maybe never became a yes.
    expect((await cards()).map(c => c.textContent)).toEqual([expect.stringMatching(/Earlier.*No laps$/)])
    expect(within(page).queryByRole('group', { name: 'All time best' })).not.toBeInTheDocument()
  })

  it('says when no event is on the track it names', async () => {
    window.location.hash = '#/track/nowhere'
    render(<AuthProvider><EventsProvider><App /></EventsProvider></AuthProvider>)
    expect(await screen.findByText('No event is on this track')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'See all tracks' }))
    expect(window.location.hash).toBe('#/tracks')
  })

  it('shows the driver an admin picked, and keeps showing them on the event it opens (#288)', async () => {
    roles = ['admin']
    jasonSaved = [at('2026-03-07', '11:45', 2, [84_420])]
    openEvent()
    await switchDriver('Jason')
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes (1)' }))
    await userEvent.click(await screen.findByRole('link', { name: 'See all my MSRC 1.7 CW laps' }))

    const page = await trackPage()
    expect(page).toHaveTextContent('Motorsport Ranch - Cresson · Jason’s laps')
    expect(await within(page).findByRole('group', { name: 'All time best' })).toHaveTextContent('1:24.42Across 1 session at 1 event')
    // One event is still a chart: its best and average, labelled.
    const chart = within(page).getByRole('group', { name: /^Best and average lap at each event, oldest to newest: 1 event\./ })
    expect(chart.querySelector('[data-end-label="best"]')).toHaveTextContent('1:24.42')
    const [url] = lapCalls('GET').find(([u]) => String(u).includes('events='))!
    expect(String(url)).toContain(`driver=${JASON}`)
    expect(within(page).queryByText('Private')).not.toBeInTheDocument()

    await userEvent.click(await card('Lap Day'))
    expect(screen.getByRole('region', { name: 'Acting as' })).toHaveTextContent('Acting as Jason')
    expect(String(lapCalls('GET').at(-1)![0])).toContain(`driver=${JASON}`)
  })
})

describe('the Events, Tracks and More tabs (#274, #345)', () => {
  const at = (date: string, laps: number[]): SessionLaps => ({
    key: `${date} 09:50 blue`, date, time: '09:50', group: 'blue', sessionNumber: 1, laps: laps.map(ms => ({ ms })),
  })
  const openAt = (hash: string) => {
    window.location.hash = hash
    render(<AuthProvider><EventsProvider><App /></EventsProvider></AuthProvider>)
  }
  const tracks = () => within(screen.getByRole('list', { name: 'Tracks' })).getAllByRole('link')

  beforeEach(() => {
    summary = [
      { eventId: sameLayout.id, best: 98_540, sessions: 2 },
      { eventId: event.id, best: 99_100, sessions: 1 },
      { eventId: otherWay.id, best: 90_000, sessions: 1 },
    ]
    elsewhere = { [sameLayout.id]: [at('2026-02-07', [101_000, 98_540])] }
  })

  it('lists every track layout under its track, A–Z, with the events you have sessions at there', async () => {
    openAt('#/tracks')
    expect(screen.getByRole('heading', { level: 1, name: 'Tracks' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Tracks' })).toHaveAttribute('aria-current', 'page')
    await waitFor(() => expect(tracks().map(t => t.textContent)).toEqual([
      'MSRC 1.7 CCW1 event',
      'MSRC 1.7 CW2 events',
    ]))
    // Each thumbnail shows which way round it goes (#307).
    expect(tracks().map(t => t.querySelector('[data-direction]')?.getAttribute('data-direction'))).toEqual(['ccw', 'cw'])
    // One track, both its layouts under its name (#314).
    const track = screen.getByRole('region', { name: 'Motorsport Ranch - Cresson' })
    expect(within(track).getByRole('heading', { level: 2, name: 'Motorsport Ranch - Cresson' })).toBeInTheDocument()
    expect(within(track).getAllByRole('link')).toHaveLength(2)
  })

  it('says so on a layout you have no events at', async () => {
    summary = [{ eventId: event.id, best: 99_100, sessions: 1 }]
    openAt('#/tracks')
    await waitFor(() => expect(tracks().map(t => t.textContent)).toEqual([
      'MSRC 1.7 CCWNo events yet',
      'MSRC 1.7 CW1 event',
    ]))
  })

  it('counts the events you said you’re going to as well as the ones with sessions, each once (#320)', async () => {
    summary = [{ eventId: event.id, best: 99_100, sessions: 1 }]
    // Going to both CW events — one with sessions too — and not to the CCW one.
    rsvps = { [event.id]: { status: 'going' }, [sameLayout.id]: { status: 'going' }, [otherWay.id]: { status: 'not-going' } }
    window.location.hash = '#/tracks'
    render(<AuthProvider><EventsProvider><RsvpsProvider><App /></RsvpsProvider></EventsProvider></AuthProvider>)
    await waitFor(() => expect(tracks().map(t => t.textContent)).toEqual([
      'MSRC 1.7 CCWNo events yet',
      'MSRC 1.7 CW2 events',
    ]))
  })

  it('opens a track’s page, and goes back to the list', async () => {
    openAt('#/tracks')
    await waitFor(() => expect(tracks()).toHaveLength(2))
    await userEvent.click(tracks()[1])
    expect(window.location.hash).toBe('#/track/msrc-1-7-cw')
    const page = (await screen.findByRole('heading', { level: 1, name: 'MSRC 1.7 CW' })).closest<HTMLElement>('.fixed')!
    await within(page).findByRole('region', { name: 'Events' })

    await userEvent.click(within(page).getByRole('button', { name: 'Back' }))
    expect(window.location.hash).toBe('#/tracks')
  })


  it('lists the tracks for anyone signed out, without lap times', async () => {
    signedIn = false
    openAt('#/tracks')
    await waitFor(() => expect(tracks().map(t => t.textContent)).toEqual([
      'MSRC 1.7 CCW',
      'MSRC 1.7 CW',
    ]))
    expect(lapCalls('GET')).toHaveLength(0)
  })

  it('switches tabs from the tab bar; More has tiles for Instructor evaluations and the Garage — which opens over it — and a list of Share and the iOS widget', async () => {
    openAt('#/')
    expect(await screen.findByRole('heading', { level: 1, name: 'HPDE Events' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Events' })).toHaveAttribute('aria-current', 'page')
    expect(screen.queryByRole('link', { name: 'Garage' })).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('link', { name: 'More' }))
    expect(window.location.hash).toBe('#/more')
    expect(screen.getByRole('heading', { level: 1, name: 'More' })).toBeInTheDocument()
    const items = within(screen.getByRole('list', { name: 'More' })).getAllByRole('link')
    expect(items.map(a => a.getAttribute('href'))).toEqual(['#/evaluations', '#/garage'])
    expect(within(screen.getByRole('list', { name: 'Share and widget' })).getAllByRole('link').map(a => a.getAttribute('href'))).toEqual(['#/share', '#/widget-setup'])

    await userEvent.click(items[1])
    expect(window.location.hash).toBe('#/garage')
    const garage = screen.getByRole('heading', { level: 1, name: 'Garage' }).closest<HTMLElement>('.fixed')!
    // Still under More.
    expect(screen.getByRole('link', { name: 'More' })).toHaveAttribute('aria-current', 'page')
    await userEvent.click(within(garage).getByRole('button', { name: 'Back' }))
    expect(window.location.hash).toBe('#/more')

    await userEvent.click(screen.getByRole('link', { name: 'Events' }))
    expect(window.location.hash).toBe('#/')
    expect(screen.getByRole('heading', { level: 1, name: 'HPDE Events' })).toBeInTheDocument()
  })
})

describe('the garage (#344)', () => {
  const cayman = {
    id: 'cayman', year: 2019, make: 'Porsche', model: '718 Cayman GTS', nickname: 'The Cayman', lugNutTorque: 118,
    log: [
      { id: 'l1', date: '2026-02-20', shop: 'Speed Shop', parts: [{ part: 'tires' as const, what: 'Hoosier R7' }, { part: 'frontPads' as const, what: 'Hawk DTC-60' }] },
      { id: 'l3', date: '2026-04-15', parts: [{ part: 'tires' as const, what: 'Yokohama A052' }] },
    ],
  }
  const openWithGarage = (hash: string) => {
    window.location.hash = hash
    render(<AuthProvider><EventsProvider><GarageProvider><App /></GarageProvider></EventsProvider></AuthProvider>)
  }
  const body = (call: unknown[]) => JSON.parse(String((call[1] as RequestInit).body))
  // The car's page: the one pushed over the Garage.
  const carPage = async (name: string) => (await screen.findByRole('heading', { level: 1, name })).closest<HTMLElement>('.fixed')!
  // An item from the "…" at the top of a car's page (#423).
  const carAction = async (page: HTMLElement, item: string) => {
    await userEvent.click(within(page).getByRole('button', { name: 'More actions' }))
    await userEvent.click(within(page).getByRole('menuitem', { name: item }))
  }

  it('asks anyone signed out to sign in, and fetches nothing', async () => {
    signedIn = false
    openWithGarage('#/garage')
    expect(await screen.findByText('Sign in to manage your cars')).toBeInTheDocument()
    // Just that: no line under it.
    expect(screen.queryByText(/admins can see/)).not.toBeInTheDocument()
    expect(garageCalls('GET')).toHaveLength(0)
  })

  it('adds a car in the Garage, on a page of its own: a card, its name over its photo and how many events it went to, opening its page (#410)', async () => {
    openWithGarage('#/garage')
    expect(await screen.findByText('No cars yet')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Add a car' }))
    const form = screen.getByRole('dialog', { name: 'Add a car' })
    expect(form.closest('[data-car-form]')).toBe(form)
    // It has a Cancel, so it slides up from the bottom, as on iOS (#356).
    expect((form.parentElement as HTMLElement).style.transform).toMatch(/^translateY\(/)
    // Nothing to save till it has a make and model.
    expect(within(form).getByRole('button', { name: 'Save' })).toBeDisabled()
    await userEvent.type(within(form).getByLabelText('Year'), '2019')
    await userEvent.type(within(form).getByLabelText('Make'), 'Porsche')
    await userEvent.type(within(form).getByLabelText('Model'), '718 Cayman GTS')
    await userEvent.type(within(form).getByRole('textbox', { name: /^Nickname/ }), 'The Cayman')
    await userEvent.type(within(form).getByRole('textbox', { name: /^Lug nut torque/ }), '118')
    await userEvent.click(within(form).getByRole('button', { name: 'Save' }))
    await sheetGone()
    expect(screen.getByRole('status')).toHaveTextContent('Car added')
    expect(body(garageCalls('PUT')[0]).car).toEqual({ year: 2019, make: 'Porsche', model: '718 Cayman GTS', nickname: 'The Cayman', lugNutTorque: 118 })

    const cars = screen.getByRole('list', { name: 'Cars' })
    // No events yet: no count on it (#424).
    expect(within(cars).getByRole('link')).toHaveTextContent(/^The Cayman2019 · Porsche 718 Cayman GTS$/)
    expect(within(cars).getByRole('link')).toHaveAttribute('href', '#/garage/car1')
  })

  it('cancels adding a car, saving nothing', async () => {
    openWithGarage('#/garage')
    await userEvent.click(await screen.findByRole('button', { name: 'Add a car' }))
    const form = screen.getByRole('dialog', { name: 'Add a car' })
    await userEvent.type(within(form).getByLabelText('Make'), 'Porsche')
    await userEvent.click(within(form).getByRole('button', { name: 'Cancel' }))
    await sheetGone()
    expect(garageCalls('PUT')).toHaveLength(0)
  })

  it('says how many events each car went to (#410)', async () => {
    garageData = { cars: [cayman], events: { [event.id]: { carId: 'cayman' }, [sameLayout.id]: { carId: 'cayman' } } }
    openWithGarage('#/garage')
    const cars = await screen.findByRole('list', { name: 'Cars' })
    // On the photo, across from its name (#424).
    expect(within(cars).getByRole('link')).toHaveTextContent('The Cayman2019 · Porsche 718 Cayman GTS2 events')
    expect(within(cars).getByText('2 events')).toHaveAttribute('data-events-badge')
    // No Private by the Garage's title (#424).
    expect(screen.queryByText('Private')).not.toBeInTheDocument()
  })

  it('says how many events each consumable on a car has been used at, none still to come, and each in its history till it came off (#418)', async () => {
    const may: EventConfig = { ...sameLayout, id: '2026-05-02_may', name: 'May', days: [{ ...event.days[0], date: '2026-05-02' }] }
    const coming: EventConfig = { ...sameLayout, id: '2099-05-02_coming', name: 'Coming', days: [{ ...event.days[0], date: '2099-05-02' }] }
    moreEvents = [may, coming]
    garageData = { cars: [cayman], events: Object.fromEntries([otherWay, sameLayout, event, may, coming].map(e => [e.id, { carId: 'cayman' }])) }
    openWithGarage('#/garage/cayman')
    const page = await carPage('The Cayman')
    const on = await within(page).findByRole('region', { name: 'Maintenance' })
    // Tires on Apr 15: May since. Front pads on Feb 20: Lap Day and May —
    // not the two before it, nor the one to come.
    await waitFor(() => expect(on).toHaveTextContent('TiresYokohama A052Since Apr 15, 2026 · 1 eventFront padsHawk DTC-60Since Feb 20, 2026 · 2 events'))

    // History: each change, with the events it was on till it came off —
    // the Hoosiers, Lap Day; the Yokohamas since.
    await userEvent.click(within(page).getByRole('tab', { name: 'History' }))
    const log = [...within(page).getByRole('group', { name: 'Change log' }).querySelectorAll<HTMLElement>('[data-history-part]')]
    expect(log.map(b => b.textContent)).toEqual(['TiresYokohama A0521 event', 'TiresHoosier R7Speed Shop1 event', 'Front padsHawk DTC-60Speed Shop2 events'])
  })

  it('a car’s page has its setup — what’s on it — and its change history; a job is logged, edited and removed (#410)', async () => {
    garageData = { cars: [cayman], events: {} }
    openWithGarage('#/garage/cayman')
    const page = await carPage('The Cayman')
    expect(within(page).getByText('2019 · Porsche 718 Cayman GTS')).toBeInTheDocument()
    expect(within(page).getByRole('tab', { name: 'Setup' })).toHaveAttribute('aria-selected', 'true')
    expect(within(page).getByRole('region', { name: 'Details' })).toHaveTextContent('Lug nut torque118 ft·lb')
    const on = within(page).getByRole('region', { name: 'Maintenance' })
    expect(on).toHaveTextContent('TiresYokohama A052Since Apr 15, 2026Front padsHawk DTC-60Since Feb 20, 2026')
    // Each opens the change that put it on.
    await userEvent.click(within(on).getByRole('button', { name: /^Front pads/ }))
    const opened = screen.getByRole('dialog', { name: 'Edit entry' })
    expect(within(opened).getByLabelText('Front pads')).toHaveValue('Hawk DTC-60')
    await userEvent.keyboard('{Escape}')
    await sheetGone()

    // History: every change, newest first, under its month.
    const history = async () => {
      await userEvent.click(within(page).getByRole('tab', { name: 'History' }))
      return within(page).getByRole('group', { name: 'Change log' })
    }
    // Each part changed, on lines of its own; a day's split by a rule.
    const log = () => [...within(page).getByRole('group', { name: 'Change log' }).querySelectorAll<HTMLElement>('[data-history-part]')]
    const days = () => within(within(page).getByRole('group', { name: 'Change log' })).getAllByRole('listitem').map(d => d.textContent)
    const months = async () => within(await history()).getAllByRole('heading').map(h => h.textContent)
    expect(await months()).toEqual(['April 2026', 'February 2026'])
    expect(days()).toEqual(['Apr 15TiresYokohama A052', 'Feb 20TiresHoosier R7Speed ShopFront padsHawk DTC-60Speed Shop'])
    expect(log().map(b => b.textContent)).toEqual(['TiresYokohama A052', 'TiresHoosier R7Speed Shop', 'Front padsHawk DTC-60Speed Shop'])
    // Adding one is at the top, not the foot.
    expect(within(page).getByRole('group', { name: 'Change log' }).querySelector('section')).toContainElement(within(page).getByRole('button', { name: 'Add entry' }))

    // A brake job: several consumables on one day at one shop, each asking what went on.
    await userEvent.click(within(page).getByRole('tab', { name: 'Setup' }))
    await userEvent.click(within(page).getByRole('button', { name: 'Add entry' }))
    const sheet = screen.getByRole('dialog', { name: 'Add entry' })
    expect(within(sheet).queryByLabelText('Brake fluid')).not.toBeInTheDocument()
    await userEvent.click(within(sheet).getByRole('button', { name: 'Brake fluid' }))
    await userEvent.click(within(sheet).getByRole('button', { name: 'Rear pads' }))
    await userEvent.click(within(sheet).getByRole('button', { name: 'Coolant' }))
    await userEvent.click(within(sheet).getByRole('button', { name: 'Coolant' }))
    // One box for each picked, in the order they're listed.
    const whats = within(within(sheet).getByRole('group', { name: /^What went on/ })).getAllByRole('combobox')
    expect(whats.map(w => w.id.split('-').at(-1))).toEqual(['rearPads', 'brakeFluid'])
    fireEvent.change(within(sheet).getByLabelText('Rear pads'), { target: { value: 'Hawk DTC-30' } })
    fireEvent.change(within(sheet).getByLabelText('Brake fluid'), { target: { value: 'Motul RBF 660' } })
    fireEvent.change(within(sheet).getByLabelText('Date'), { target: { value: '2026-05-01' } })
    fireEvent.change(within(sheet).getByLabelText(/^Shop/), { target: { value: 'Speed Shop' } })
    fireEvent.change(within(sheet).getByRole('textbox', { name: /^Note/ }), { target: { value: 'Full flush.' } })
    await userEvent.click(within(sheet).getByRole('button', { name: 'Add entry' }))
    await sheetGone()
    expect(screen.getByRole('status')).toHaveTextContent('Entry added')
    expect(garageCalls('PUT')[0][0]).toContain('car=cayman')
    expect(body(garageCalls('PUT')[0]).entry).toEqual({
      date: '2026-05-01', shop: 'Speed Shop', note: 'Full flush.',
      parts: [{ part: 'rearPads', what: 'Hawk DTC-30' }, { part: 'brakeFluid', what: 'Motul RBF 660' }],
    })
    expect(within(page).getByRole('region', { name: 'Maintenance' })).toHaveTextContent('Rear padsHawk DTC-30Since May 1, 2026')
    expect(await months()).toEqual(['May 2026', 'April 2026', 'February 2026'])
    expect(days()[0]).toBe('May 1Rear padsHawk DTC-30Speed ShopBrake fluidMotul RBF 660Speed ShopFull flush.')

    // An entry opens to change it, or take it out.
    await userEvent.click(log()[2])
    const edit = screen.getByRole('dialog', { name: 'Edit entry' })
    expect(within(edit).getByRole('button', { name: 'Tires' })).toHaveAttribute('aria-pressed', 'true')
    expect(within(edit).getByLabelText('Tires')).toHaveValue('Yokohama A052')
    await userEvent.click(within(edit).getByRole('button', { name: 'Remove from log' }))
    await userEvent.click(within(edit).getByRole('button', { name: 'Remove' }))
    await sheetGone()
    expect(garageCalls('DELETE')[0][0]).toContain('car=cayman&entry=l3')
    await userEvent.click(within(page).getByRole('tab', { name: 'Setup' }))
    expect(within(page).getByRole('region', { name: 'Maintenance' })).toHaveTextContent('TiresHoosier R7Since Feb 20, 2026')
  })

  it('adds a photo with a new car, and changes or removes it from Edit, each saved with Save', async () => {
    const createObjectURL = vi.fn(() => 'blob:car-photo')
    vi.stubGlobal('URL', Object.assign(URL, { createObjectURL, revokeObjectURL: vi.fn() }))
    openWithGarage('#/garage')
    await userEvent.click(await screen.findByRole('button', { name: 'Add a car' }))
    let form = screen.getByRole('dialog', { name: 'Add a car' })
    await userEvent.upload(within(form).getByLabelText('Add a photo'), new File(['png'], 'cayman.png', { type: 'image/png' }))
    // Shown from the phone; nothing sent yet.
    await waitFor(() => expect(within(form).getByRole('img', { name: 'Your car' })).toHaveAttribute('src', 'blob:car-photo'))
    expect(garageCalls('PUT')).toHaveLength(0)
    await userEvent.type(within(form).getByLabelText('Make'), 'Porsche')
    await userEvent.type(within(form).getByLabelText('Model'), 'Cayman')
    await userEvent.click(within(form).getByRole('button', { name: 'Save' }))
    await sheetGone()
    expect(garageCalls('PUT').map(([u]) => String(u).split('?')[1] ?? '')).toEqual(['', 'car=car1&photo=1'])
    // Fetched with the sign-in, once, however many places show it.
    await waitFor(() => expect(fetchMock.mock.calls.filter(([u, i]) => String(u).includes('photo=1&v=p1') && !i?.method)).toHaveLength(1))

    // On the car's page it's only shown; Edit is where it changes.
    await userEvent.click(within(screen.getByRole('list', { name: 'Cars' })).getByRole('link'))
    const page = await carPage('Porsche Cayman')
    await waitFor(() => expect(within(page).getByRole('img', { name: 'Porsche Cayman' })).toBeInTheDocument())
    expect(within(page).queryByRole('button', { name: /photo/i })).not.toBeInTheDocument()
    await carAction(page, 'Edit')
    form = screen.getByRole('dialog', { name: 'Edit car' })
    await userEvent.click(within(form).getByRole('button', { name: 'Remove' }))
    expect(within(form).getByRole('button', { name: /^Add a photo/ })).toBeInTheDocument()
    expect(garageCalls('DELETE')).toHaveLength(0)
    await userEvent.click(within(form).getByRole('button', { name: 'Save' }))
    await sheetGone()
    expect(garageCalls('DELETE')[0][0]).toContain('car=car1&photo=1')
    expect(within(page).queryByRole('img', { name: 'Porsche Cayman' })).not.toBeInTheDocument()
  })

  it('says what the photo limit is when a photo can’t be made small enough', async () => {
    openWithGarage('#/garage')
    await userEvent.click(await screen.findByRole('button', { name: 'Add a car' }))
    const form = screen.getByRole('dialog', { name: 'Add a car' })
    // Not readable here (no canvas), and over the limit as it is.
    await userEvent.upload(within(form).getByLabelText('Add a photo'), new File([new Uint8Array(3_000_001)], 'big.jpg', { type: 'image/jpeg' }))
    expect(await within(form).findByRole('alert')).toHaveTextContent('That photo couldn’t be made smaller, and it’s over the 3 MB limit. Try another photo.')
  })

  it('edits a car’s details from its page, and deletes it, from its "…" (#423)', async () => {
    garageData = { cars: [cayman], events: {} }
    openWithGarage('#/garage/cayman')
    const page = await carPage('The Cayman')
    // It went to no events and isn't shared: Delete, as well as Archive.
    await userEvent.click(within(page).getByRole('button', { name: 'More actions' }))
    expect(within(page).getAllByRole('menuitem').map(m => m.textContent)).toEqual(['Edit', 'Archive', 'Delete'])
    await userEvent.click(within(page).getByRole('menuitem', { name: 'Edit' }))
    const edit = screen.getByRole('dialog', { name: 'Edit car' })
    const torque = within(edit).getByRole('textbox', { name: /^Lug nut torque/ })
    await userEvent.clear(torque)
    await userEvent.type(torque, '96')
    await userEvent.click(within(edit).getByRole('button', { name: 'Save' }))
    await sheetGone()
    expect(within(page).getByRole('region', { name: 'Details' })).toHaveTextContent('Lug nut torque96 ft·lb')
    expect(body(garageCalls('PUT')[0]).car).toMatchObject({ id: 'cayman', lugNutTorque: 96 })
    expect(body(garageCalls('PUT')[0]).car).not.toHaveProperty('log')

    // Not on Edit's page any more: the "…"'s.
    await carAction(page, 'Edit')
    const again = screen.getByRole('dialog', { name: 'Edit car' })
    expect(within(again).queryByRole('button', { name: /Remove from garage|Archive/ })).not.toBeInTheDocument()
    await userEvent.click(within(again).getByRole('button', { name: 'Cancel' }))
    await sheetGone()

    // It asks first; Cancel keeps it.
    await carAction(page, 'Delete')
    let ask = screen.getByRole('alertdialog', { name: 'Delete “The Cayman”?' })
    expect(ask).toHaveTextContent('Its change log goes with it. This can’t be undone.')
    await userEvent.click(within(ask).getByRole('button', { name: 'Cancel' }))
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    expect(garageCalls('DELETE')).toHaveLength(0)
    await carAction(page, 'Delete')
    ask = screen.getByRole('alertdialog', { name: 'Delete “The Cayman”?' })
    await userEvent.click(within(ask).getByRole('button', { name: 'Delete' }))
    await waitFor(() => expect(window.location.hash).toBe('#/garage'))
    expect(screen.getByRole('status')).toHaveTextContent('Car deleted')
    expect(garageCalls('DELETE')[0][0]).toContain('car=cayman')
    expect(await screen.findByText('No cars yet')).toBeInTheDocument()
  })

  it('archives a car that went to events, keeping it for them; the Garage links to its archived cars (#410)', async () => {
    garageData = { cars: [cayman], events: { [event.id]: { carId: 'cayman' } } }
    openWithGarage('#/garage/cayman')
    const page = await carPage('The Cayman')
    // Archive, never Delete, once it's been to an event (#423).
    await userEvent.click(within(page).getByRole('button', { name: 'More actions' }))
    expect(within(page).getAllByRole('menuitem').map(m => m.textContent)).toEqual(['Edit', 'Archive'])
    await userEvent.click(within(page).getByRole('menuitem', { name: 'Archive' }))
    const ask = screen.getByRole('alertdialog', { name: 'Archive “The Cayman”?' })
    expect(ask).toHaveTextContent('It leaves your garage but stays on the event you drove it at, with its history. You can put it back.')
    await userEvent.click(within(ask).getByRole('button', { name: 'Archive' }))
    await waitFor(() => expect(window.location.hash).toBe('#/garage'))
    expect(screen.getByRole('status')).toHaveTextContent('Car archived')
    // Out of the Garage; a link to the archived ones, with how many. Still the event's car.
    expect(await screen.findByText('No cars yet')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^Archived/ })).toHaveTextContent('Archived1')
    expect(screen.getByRole('link', { name: /^Archived/ })).toHaveAttribute('href', '#/garage/archived')
    expect(garageData.events[event.id].carId).toBe('cayman')
    expect(garageCalls('DELETE')[0][0]).toContain('car=cayman&archive=1')
  })

  it('archives a car that went nowhere too, and only that one can be deleted for good once archived (#423)', async () => {
    garageData = { cars: [cayman], events: {} }
    openWithGarage('#/garage/cayman')
    const page = await carPage('The Cayman')
    await carAction(page, 'Archive')
    const ask = screen.getByRole('alertdialog', { name: 'Archive “The Cayman”?' })
    expect(ask).toHaveTextContent('It leaves your garage, with its history. You can put it back.')
    await userEvent.click(within(ask).getByRole('button', { name: 'Archive' }))
    await waitFor(() => expect(window.location.hash).toBe('#/garage'))
    expect(screen.getByRole('status')).toHaveTextContent('Car archived')
    expect(garageCalls('DELETE')[0][0]).toContain('car=cayman&archive=1')
    expect(garageData.cars).toEqual([expect.objectContaining({ id: 'cayman', archived: expect.any(String) })])
    expect(screen.getByRole('link', { name: /^Archived/ })).toHaveTextContent('Archived1')

    // Archived, it went to no events: it can go for good.
    window.location.hash = '#/garage/cayman'
    const archived = within(await carPage('The Cayman')).getByRole('region', { name: 'Archived' })
    await userEvent.click(within(archived).getByRole('button', { name: 'Delete for good' }))
    await userEvent.click(within(archived).getByRole('button', { name: 'Delete' }))
    await waitFor(() => expect(window.location.hash).toBe('#/garage'))
    expect(screen.getByRole('status')).toHaveTextContent('Car deleted')
    expect(garageData.cars).toEqual([])
  })

  it('lists the archived cars on a page of their own; one opens over it, and Back returns there (#410)', async () => {
    garageData = { cars: [{ ...cayman, archived: '2026-10-02T12:00:00.000Z' }], events: { [event.id]: { carId: 'cayman' } } }
    openWithGarage('#/garage/archived')
    const list = await screen.findByRole('list', { name: 'Archived cars' })
    expect(within(list).getByRole('button')).toHaveTextContent('The Cayman1 event · archived Oct 2, 2026')
    await userEvent.click(within(list).getByRole('button'))
    expect(window.location.hash).toBe('#/garage/cayman')
    const page = await carPage('The Cayman')
    await userEvent.click(within(page).getByRole('button', { name: 'Back' }))
    expect(window.location.hash).toBe('#/garage/archived')
  })

  it('shows a car taken out of the garage as kept for its events, and puts it back (#410)', async () => {
    garageData = { cars: [{ ...cayman, archived: '2026-10-02T12:00:00.000Z' }], events: { [event.id]: { carId: 'cayman' } } }
    openWithGarage('#/garage/cayman')
    const page = await carPage('The Cayman')
    expect(within(page).getByRole('region', { name: 'Archived' })).toHaveTextContent('Archived on Oct 2, 2026. It’s kept for the event you drove it at.')
    // Nothing to change on it till it's back.
    for (const name of ['More actions', /Share with another driver/, 'Add entry']) expect(within(page).queryByRole('button', { name })).not.toBeInTheDocument()
    // It went to an event: never deleted, only archived (#423).
    expect(within(page).queryByRole('button', { name: 'Delete for good' })).not.toBeInTheDocument()
    await userEvent.click(within(page).getByRole('button', { name: 'Put back in garage' }))
    expect(await screen.findByRole('status')).toHaveTextContent('Back in your garage')
    expect(garageCalls('PUT')[0][0]).toContain('car=cayman&restore=1')
    expect(within(page).queryByRole('region', { name: 'Archived' })).not.toBeInTheDocument()
    expect(within(page).getByRole('button', { name: 'More actions' })).toBeInTheDocument()
  })

  it('shows a shared car’s drivers by their pictures, or their initial (#410)', async () => {
    garageData = {
      cars: [{
        ...cayman,
        drivers: [{ id: 'a', name: 'Vera Kim', you: true }, { id: 'j', name: 'Jason Smith', avatar: 'https://pics.example/jason.jpg' }],
        drives: [{ eventId: event.id, driverId: 'j' }],
      }],
      events: {},
    }
    openWithGarage('#/garage/cayman')
    const page = await carPage('The Cayman')
    const faces = (el: Element) => [...el.querySelectorAll('[data-avatar]')].map(a => a.getAttribute('src') ?? a.textContent)
    // Theirs beside Share, then the one to add: once, up top.
    const share = within(page).getByRole('button', { name: 'Shared with Jason. Share with another driver' })
    expect(faces(share)).toEqual(['V', 'https://pics.example/jason.jpg'])
    expect(faces(page)).toHaveLength(2)
    // Theirs count too (#422).
    await userEvent.click(within(page).getByRole('tab', { name: 'Events (1)' }))
    const who = page.querySelector('[data-who-drove]')!
    expect(faces(who)).toEqual(['https://pics.example/jason.jpg'])
    expect(who).toHaveTextContent('Jason')
  })

  it('lists a car’s events on its page; one opens over it on My notes, and Back returns to the car', async () => {
    garageData = { cars: [cayman], events: { [event.id]: { carId: 'cayman' }, [sameLayout.id]: { carId: 'cayman' } } }
    openWithGarage('#/garage/cayman')
    const page = await carPage('The Cayman')
    // How many, as My notes says on an event's page (#422).
    await userEvent.click(within(page).getByRole('tab', { name: 'Events (2)' }))
    // As the Events tab shows them (#408): the date on the left, the track on the right.
    const events = within(page).getByRole('list', { name: 'Past events' })
    expect(within(events).getAllByRole('button').map(b => b.textContent)).toEqual([
      expect.stringMatching(/^Mar7(2026)?Lap DayOrganizer not set$/),
      expect.stringMatching(/^Feb7(2026)?EarlierOrganizer not set$/),
    ])
    expect(within(events).getAllByRole('button').map(b => b.querySelectorAll('[data-track-icon]').length)).toEqual([1, 1])
    await userEvent.click(within(events).getByRole('button', { name: /Lap Day/ }))
    expect(window.location.hash).toBe(`#/event/${event.id}`)
    expect(await screen.findByRole('tab', { name: 'My notes (1)' })).toHaveAttribute('aria-selected', 'true')
    expect(await screen.findByRole('button', { name: 'Your car: The Cayman' })).toBeInTheDocument()

    // The event's page is over the car's; its Back goes back to it.
    const eventPage = screen.getByRole('tab', { name: 'My notes (1)' }).closest<HTMLElement>('.fixed')!
    expect(eventPage).toContainElement(screen.getByRole('button', { name: 'Your car: The Cayman' }))
    await userEvent.click(within(eventPage).getAllByRole('button', { name: 'Back' })[0])
    expect(window.location.hash).toBe('#/garage/cayman')
    expect(screen.getByRole('heading', { level: 1, name: 'The Cayman' })).toBeInTheDocument()
  })

  it('puts the car at the very top of My notes; it opens to what was on it at the event, and to its page', async () => {
    garageData = { cars: [cayman], events: { [event.id]: { carId: 'cayman' } } }
    openWithGarage(`#/event/${event.id}`)
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes (1)' }))
    const row = await screen.findByRole('button', { name: 'Your car: The Cayman' })
    expect(row).toHaveTextContent('The Cayman · 2019 Porsche 718 Cayman GTS')
    // One slim line: it's seldom changed. The car (#417) is wider than
    // it's tall, so 18 across is 12 high.
    expect(row.querySelector('svg')).toHaveAttribute('width', '18')
    await userEvent.click(row)
    const sheet = screen.getByRole('dialog', { name: 'Your car' })
    expect(sheet).toHaveTextContent('Lug nut torque118 ft·lb')
    // The car first, with the way to change it beside it.
    expect(within(sheet).getByRole('button', { name: 'The Cayman: car details' })).toHaveTextContent('The Cayman2019 Porsche 718 Cayman GTS')
    expect(within(sheet).getByRole('button', { name: 'Change' })).toBeInTheDocument()
    expect(sheet).not.toHaveTextContent('Speed Shop')
    // The event was Mar 7: the tires changed in April aren't on yet.
    expect(within(sheet).getByLabelText('Consumables')).toHaveTextContent('TiresHoosier R7since Feb 20, 2026Front padsHawk DTC-60since Feb 20, 2026')

    // Its page, over the event; Back returns to the event.
    await userEvent.click(within(sheet).getByRole('button', { name: 'The Cayman: car details' }))
    expect(window.location.hash).toBe('#/garage/cayman')
    const page = await carPage('The Cayman')
    expect(within(page).getByRole('region', { name: 'Details' })).toBeInTheDocument()
    await userEvent.click(within(page).getByRole('button', { name: 'Back' }))
    expect(window.location.hash).toBe(`#/event/${event.id}`)
    expect(screen.getByRole('tab', { name: 'My notes (1)' })).toHaveAttribute('aria-selected', 'true')
  })

  it('picks the event’s car on My notes', async () => {
    garageData = { cars: [cayman, { id: 'miata', make: 'Mazda', model: 'Miata' }], events: {} }
    openWithGarage(`#/event/${event.id}`)
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes' }))
    await userEvent.click(await screen.findByRole('button', { name: /^Add your car/ }))
    const sheet = screen.getByRole('dialog', { name: 'Pick your car' })
    await userEvent.click(within(sheet).getByRole('button', { name: /^Mazda Miata/ }))
    await sheetGone()
    expect(screen.getByRole('status')).toHaveTextContent('Car saved')
    expect(body(garageCalls('PUT')[0]).setup).toEqual({ carId: 'miata' })
    expect(screen.getByRole('button', { name: 'Your car: Mazda Miata' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'My notes (1)' })).toBeInTheDocument()

    // Changed to the other, then taken off.
    await userEvent.click(screen.getByRole('button', { name: 'Your car: Mazda Miata' }))
    await userEvent.click(screen.getByRole('button', { name: 'Change' }))
    await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: /^The Cayman/ }))
    await sheetGone()
    expect(body(garageCalls('PUT')[1]).setup).toEqual({ carId: 'cayman' })
    await userEvent.click(screen.getByRole('button', { name: 'Your car: The Cayman' }))
    await userEvent.click(screen.getByRole('button', { name: 'Remove from event' }))
    await userEvent.click(screen.getByRole('button', { name: 'Remove' }))
    await sheetGone()
    expect(garageCalls('DELETE')[0][0]).toContain(`event=${event.id}`)
    expect(screen.getByRole('button', { name: /^Add your car/ })).toBeInTheDocument()
  })

  it('adds the car from the event, on its own page, and it’s the event’s', async () => {
    openWithGarage(`#/event/${event.id}`)
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes' }))
    await userEvent.click(await screen.findByRole('button', { name: /^Add your car/ }))
    await userEvent.click(within(screen.getByRole('dialog', { name: 'Pick your car' })).getByRole('button', { name: 'Add a car to your garage' }))
    const form = screen.getByRole('dialog', { name: 'Add a car' })
    expect(screen.queryByRole('dialog', { name: 'Pick your car' })).not.toBeInTheDocument()
    await userEvent.type(within(form).getByLabelText('Make'), 'Mazda')
    await userEvent.type(within(form).getByLabelText('Model'), 'Miata')
    await userEvent.click(within(form).getByRole('button', { name: 'Save' }))
    await sheetGone()
    expect(body(garageCalls('PUT')[0]).car).toEqual({ make: 'Mazda', model: 'Miata' })
    expect(body(garageCalls('PUT')[1]).setup).toEqual({ carId: 'car1' })
    expect(screen.getByRole('status')).toHaveTextContent('Car added')
    expect(screen.getByRole('button', { name: 'Your car: Mazda Miata' })).toBeInTheDocument()
  })

  it('adds a car to events from its page, one or all — all but ones you didn’t go to — taking another car’s place', async () => {
    const miata = { id: 'miata', make: 'Mazda', model: 'Miata', nickname: 'Zoom' }
    garageData = { cars: [cayman, miata], events: { [otherWay.id]: { carId: 'miata' } } }
    // No answer for one, maybe for another; not going to the third, which isn't listed.
    rsvps = { [otherWay.id]: { status: 'maybe' }, [sameLayout.id]: { status: 'not-going' } }
    window.location.hash = '#/garage/cayman'
    render(<AuthProvider><EventsProvider><RsvpsProvider><GarageProvider><App /></GarageProvider></RsvpsProvider></EventsProvider></AuthProvider>)
    const page = await carPage('The Cayman')
    await userEvent.click(within(page).getByRole('tab', { name: 'Events' }))
    expect(within(page).getByRole('region', { name: 'Past' })).toHaveTextContent('No events yet.')
    await userEvent.click(within(page).getByRole('button', { name: 'Add to event' }))
    const sheet = screen.getByRole('dialog', { name: 'Add to event' })
    const choices = await within(sheet).findAllByRole('checkbox')
    // Newest first; one with another car says so.
    expect(choices.map(c => c.textContent)).toEqual(['Lap DayMar 7, 2026', 'CCWFeb 7, 2026 · Now in Zoom'])
    expect(within(sheet).getByRole('button', { name: 'Add to event' })).toBeDisabled()
    await userEvent.click(within(sheet).getByRole('button', { name: 'Select all' }))
    expect(choices.map(c => c.getAttribute('aria-checked'))).toEqual(['true', 'true'])
    expect(sheet).toHaveTextContent('The Cayman takes Zoom’s place there. Tire pressures stay.')
    await userEvent.click(within(sheet).getByRole('button', { name: 'Add to 2 events' }))
    await sheetGone()
    expect(screen.getByRole('status')).toHaveTextContent('Added to 2 events')
    expect(body(garageCalls('PUT')[0]).events).toEqual([event.id, otherWay.id])
    expect(within(within(page).getByRole('list', { name: 'Past events' })).getAllByRole('button')).toHaveLength(2)
    expect(within(page).getByRole('tab', { name: 'Events (2)' })).toHaveAttribute('aria-selected', 'true')
  })

  it('logs a session’s tire pressures from the schedule, and shows them on My notes', async () => {
    garageData = { cars: [cayman], events: { [event.id]: { carId: 'cayman' } } }
    openWithGarage(`#/event/${event.id}`)
    await tapSession('Lap times: 11:45 AM, Blue', null)
    const sheet = screen.getByRole('dialog', { name: '11:45 AM · Blue' })
    const nav = within(sheet).getByRole('navigation', { name: 'Session info' })
    // Pressures after the track's conditions: they're set before the session (#388).
    expect(within(nav).getAllByRole('button').map(b => b.textContent)).toEqual(['Track conditions', 'Tire pressures', 'Instructor feedback', 'Lap times'])
    await userEvent.click(within(nav).getByRole('button', { name: /^Tire pressures/ }))
    const page = await screen.findByRole('dialog', { name: 'Tire pressures, 11:45 AM · Blue' })
    expect(within(page).getByRole('heading', { level: 1 })).toHaveTextContent('Tire pressures')
    expect(within(page).getByRole('button', { name: 'Save' })).toBeDisabled()
    for (const [corner, psi] of [['Front left', '30'], ['Front right', '30'], ['Rear left', '28.5'], ['Rear right', '28.5']]) {
      await userEvent.type(within(page).getByLabelText(`${corner}, before the session`), psi)
    }
    await userEvent.type(within(page).getByLabelText('Front left, after the session'), '36.25')
    await userEvent.type(within(page).getByRole('textbox', { name: /^What you changed/ }), 'Bled the fronts.')
    await userEvent.click(within(page).getByRole('button', { name: 'Save' }))
    await backOnList()
    expect(screen.getByRole('status')).toHaveTextContent('Tire pressures saved')
    await closeList()
    // Saved with the event's car, which stays.
    expect(body(garageCalls('PUT')[0]).setup).toEqual({
      carId: 'cayman',
      sessions: { '2026-03-07 11:45 blue': {
        key: '2026-03-07 11:45 blue', date: '2026-03-07', time: '11:45', group: 'blue', sessionNumber: 2,
        cold: { fl: 30, fr: 30, rl: 28.5, rr: 28.5 }, hot: { fl: 36.2 }, note: 'Bled the fronts.',
      } },
    })

    expect(screen.getByRole('button', { name: 'Lap times: 11:45 AM, Blue (tire pressures)' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('tab', { name: 'My notes (2)' }))
    const card = screen.getByRole('region', { name: 'Session 2, 11:45 AM' })
    expect(within(within(card).getByRole('table', { name: 'Tire pressures' })).getAllByRole('row').map(r => r.textContent))
      .toEqual(['FLFRRLRR', 'Before303028.528.5', 'After36.2–––'])
    expect(card).toHaveTextContent('Bled the fronts.')

    // Its chevron opens them in the sheet, where they're removed.
    await userEvent.click(within(card).getByRole('button', { name: 'Open the tire pressures for Session 2' }))
    const again = screen.getByRole('dialog', { name: 'Tire pressures, 11:45 AM · Blue' })
    expect(within(again).getByLabelText('Rear left, before the session')).toHaveValue('28.5')
    await userEvent.click(within(again).getByRole('button', { name: 'Remove from session' }))
    await userEvent.click(within(again).getByRole('button', { name: 'Remove' }))
    await sheetGone()
    expect(body(garageCalls('PUT')[1]).setup).toEqual({ carId: 'cayman' })
    expect(screen.getByText('No session notes yet')).toBeInTheDocument()
  })

  it('offers another driver’s tire pressures, from their garage (#362)', async () => {
    roles = ['admin']
    openWithGarage(`#/event/${event.id}`)
    await switchDriver('Jason')
    await waitFor(() => expect(garageCalls('GET').some(([url]) => String(url).includes(`driver=${JASON}`))).toBe(true))
    await tapSession('Lap times: 11:45 AM, Blue', null)
    const nav = within(screen.getByRole('dialog')).getByRole('navigation', { name: 'Session info' })
    expect(within(nav).getByRole('button', { name: /^Tire pressures/ })).toBeInTheDocument()
  })

  it('shows the switched-to driver’s car and answer on the event, as they’d see them, and picks a car from their garage (#364)', async () => {
    roles = ['admin']
    const miata = { id: 'miata', make: 'Mazda', model: 'Miata' }
    garageData = { cars: [cayman], events: { [event.id]: { carId: 'cayman' } } }
    jasonGarage = { cars: [miata], events: {} }
    jasonRsvps = { [event.id]: { status: 'going', runGroup: 'blue', updatedAt: 'now' } }
    window.location.hash = `#/event/${event.id}`
    render(<AuthProvider><EventsProvider><RsvpsProvider><GarageProvider><App /></GarageProvider></RsvpsProvider></EventsProvider></AuthProvider>)
    await userEvent.click(await screen.findByRole('tab', { name: /^My notes/ }))
    expect(await screen.findByRole('button', { name: 'Your car: The Cayman' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Did you drive\?/ })).toBeInTheDocument()

    await switchDriver('Jason')
    // His answer, and no car yet: from his garage, not the admin's.
    expect(await screen.findByRole('button', { name: /^Drove/ })).toBeInTheDocument()
    // Just as he'd see it: only the Driver banner says it's his.
    await userEvent.click(await screen.findByRole('button', { name: /^Add your car/ }))
    const sheet = screen.getByRole('dialog', { name: 'Pick your car' })
    expect(within(sheet).queryByText('The Cayman')).not.toBeInTheDocument()
    await userEvent.click(within(sheet).getByRole('button', { name: /Mazda Miata/ }))
    await sheetGone()
    expect(screen.getByRole('status')).toHaveTextContent('Car saved')
    const [url] = garageCalls('PUT').at(-1)!
    expect(String(url)).toContain(`driver=${JASON}`)
    expect(String(url)).toContain(`event=${encodeURIComponent(event.id)}`)
    expect(await screen.findByRole('button', { name: 'Your car: Mazda Miata' })).toBeInTheDocument()

    // Back to the admin's own.
    await switchDriver('Me')
    expect(await screen.findByRole('button', { name: 'Your car: The Cayman' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Did you drive\?/ })).toBeInTheDocument()
  })
})

describe('Instructor evaluations across events (#345)', () => {
  // Two TDE events on the layout, and Lap Day, which isn't one.
  const tdeSep: EventConfig = { ...sameLayout, id: '2025-09-13_tde', name: 'TDE at MSRC', organizer: 'The Drivers Edge', days: [{ ...event.days[0], date: '2025-09-13' }] }
  const tdeOct: EventConfig = { ...sameLayout, id: '2025-10-04_tde', name: 'TDE at ECR', organizer: 'The Drivers Edge', days: [{ ...event.days[0], date: '2025-10-04' }] }
  const openAt = (hash: string) => {
    window.location.hash = hash
    render(<AuthProvider><EventsProvider><RsvpsProvider><App /></RsvpsProvider></EventsProvider></AuthProvider>)
  }
  const page = async () => (await screen.findByRole('heading', { level: 1, name: 'Instructor evaluations' })).closest<HTMLElement>('.fixed')!

  beforeEach(() => {
    moreEvents = [tdeSep, tdeOct]
    notesByEvent = {
      [tdeSep.id]: { evaluation: { instructor: 'John Harms', skills: { flags: 65, vision: 70 }, carAidsPct: 25 }, sessions: [] },
      [tdeOct.id]: { evaluation: { instructor: 'Amy Lee', skills: { flags: 80, vision: 70, pace: 90 }, notes: 'Smoother on the brakes.' }, sessions: [] },
      // Not a TDE event: no report card, but its evaluations are listed all the same.
      [event.id]: {
        evaluation: { instructor: 'Jo', notes: 'Brake later into turn 1.' },
        sessions: [{ key: '2026-03-07 11:45 blue', date: '2026-03-07', time: '11:45', group: 'blue', sessionNumber: 2, evaluation: { feedback: 'Eyes up.', instructor: 'Jo' } }],
      },
    }
    // Events they went to with nothing yet: one they said they drove, one they've laps at. Not one they didn't go to.
    rsvps = { [sameLayout.id]: { status: 'going' }, [tdeSep.id]: { status: 'not-going' } }
    summary = [{ eventId: otherWay.id, best: 90_000, sessions: 1 }]
  })

  it('sums the report cards up: most improved since the first, and what needs work on the latest', async () => {
    openAt('#/evaluations')
    const el = await page()
    const overview = await within(el).findByRole('region', { name: 'Report card overview' })
    expect(within(overview).getByText('2 events')).toBeInTheDocument()
    const items = (name: string) => within(within(overview).getByRole('region', { name })).getAllByRole('listitem').map(li => li.textContent)
    // Only what went up: vision stayed at 70, and pace is on one card.
    expect(items('Most improved')).toEqual(['Flags+15'])
    expect(items('Needs work')).toEqual(['Vision70%', 'Flags80%', 'Pace90%'])
  })

  it('draws each report card on the skills wheel, and lists a skill’s score at each event when it’s tapped', async () => {
    openAt('#/evaluations')
    const el = await page()
    const wheel = await within(el).findByRole('region', { name: 'Skills wheel' })
    // All, then the cards newest first, every one on at first; one can be hidden, not every one.
    const chips = within(within(wheel).getByRole('group', { name: 'Report cards shown' })).getAllByRole('button')
    expect(chips.map(c => [c.textContent, c.getAttribute('aria-pressed')])).toEqual([['All', 'true'], ['Oct 4', 'true'], ['Sep 13', 'true']])
    const drawn = () => [...wheel.querySelectorAll('[data-card]')].map(g => g.getAttribute('data-card'))
    // The newest drawn last, on top.
    expect(drawn()).toEqual([tdeSep.id, tdeOct.id])
    await userEvent.click(chips[2])
    expect(drawn()).toEqual([tdeOct.id])
    expect(chips[0]).toHaveAttribute('aria-pressed', 'false')
    await userEvent.click(chips[1])
    expect(chips[1]).toHaveAttribute('aria-pressed', 'true')
    // All shows every card; again, just the newest.
    await userEvent.click(chips[0])
    expect(drawn()).toEqual([tdeSep.id, tdeOct.id])
    await userEvent.click(chips[0])
    expect(drawn()).toEqual([tdeOct.id])
    await userEvent.click(chips[0])

    // A spoke for each skill scored; not car aids.
    expect(within(wheel).getAllByRole('button', { pressed: false }).map(b => b.getAttribute('aria-label')).filter(Boolean))
      .toEqual(['Calls out all flags', 'Looks ahead', 'Pace with group'])
    expect(within(wheel).getByText('Tap a skill for its score at each event.')).toBeInTheDocument()
    await userEvent.click(within(wheel).getByRole('button', { name: 'Calls out all flags' }))
    const list = within(wheel).getByRole('region', { name: 'Calls out all flags at each event' })
    expect(within(list).getAllByRole('listitem').map(li => li.textContent)).toEqual([
      'Oct 4, 2025TDE at ECR+1580%',
      'Sep 13, 2025TDE at MSRC65%',
    ])
    // Each on a 0–100% bar, the gain since the event before hatched on.
    expect([...list.querySelectorAll('[data-bar]')].map(b => b.querySelector('[data-change]')?.getAttribute('data-change') ?? null)).toEqual(['gain', null])
    // Tapped again, it goes.
    await userEvent.click(within(wheel).getByRole('button', { name: 'Calls out all flags' }))
    expect(within(wheel).queryByRole('region', { name: 'Calls out all flags at each event' })).not.toBeInTheDocument()
  })

  it('shows one run group’s report cards at a time, each with its own skills: the newest one’s first (#350)', async () => {
    const tdeDec: EventConfig = { ...tdeOct, id: '2025-12-06_tde', name: 'TDE Blue Day', days: [{ ...event.days[0], date: '2025-12-06' }] }
    moreEvents = [tdeSep, tdeOct, tdeDec]
    notesByEvent[tdeDec.id] = { evaluation: { card: 'blue', instructor: 'Brett Gabriel', skills: { flags: 95, offline: 95, exits: 80 } }, sessions: [] }
    openAt('#/evaluations')
    const el = await page()
    const picker = await within(el).findByRole('group', { name: 'Report card' })
    expect(within(picker).getAllByRole('button').map(b => [b.textContent, b.getAttribute('aria-pressed')])).toEqual([['Green', 'false'], ['Blue', 'true']])
    const spokes = () => within(within(el).getByRole('region', { name: 'Skills wheel' })).getAllByRole('button', { pressed: false })
      .map(b => b.getAttribute('aria-label')).filter(Boolean)
    // Blue's skills, in Blue's order.
    expect(spokes()).toEqual(['Acknowledges all flags early', 'Understands and uses exit strategies', 'Able to take a corner offline'])
    expect(within(el).getByRole('region', { name: 'Report card overview' })).toHaveTextContent('Blue report cards1 event')
    await userEvent.click(within(picker).getByRole('button', { name: 'Green' }))
    expect(spokes()).toEqual(['Calls out all flags', 'Looks ahead', 'Pace with group'])
    expect(within(el).getByRole('region', { name: 'Report card overview' })).toHaveTextContent('Green report cards2 events')
  })

  it('lists every event with an evaluation, TDE or not, newest first, with what the instructors said; one opens on My notes and Back returns here', async () => {
    openAt('#/more')
    await userEvent.click(await screen.findByRole('link', { name: /Instructor evaluations/ }))
    expect(window.location.hash).toBe('#/evaluations')
    const el = await page()
    const section = await within(el).findByRole('region', { name: 'Events' })
    await waitFor(() => expect(within(section).getAllByRole('article')).toHaveLength(5))
    const cards = within(section).getAllByRole('article')
    // With the events they went to that have none yet, newest first.
    expect(cards.map(c => c.getAttribute('aria-label'))).toEqual(['Lap Day', 'Earlier', 'CCW', 'TDE at ECR', 'TDE at MSRC'])
    expect(within(cards[1]).getByRole('button', { name: /^Add instructor evaluation/ })).toBeInTheDocument()
    expect(within(cards[2]).getByRole('button', { name: /^Add instructor evaluation/ })).toBeInTheDocument()
    expect(within(cards[0]).queryByRole('button', { name: /^Add instructor evaluation/ })).not.toBeInTheDocument()
    const feedback = (card: HTMLElement) => within(within(card).getByRole('list', { name: 'Feedback' })).getAllByRole('listitem').map(li => li.textContent)
    // The whole event's (who the instructor was, and their notes), then each session's.
    expect(feedback(cards[0])).toEqual([
      'JoBrake later into turn 1.',
      'Session 2 · 11:45 AM· JoEyes up.',
    ])
    expect(feedback(cards[3])).toEqual(['Amy LeeSmoother on the brakes.'])
    // A report card with no notes says so.
    expect(feedback(cards[4])).toEqual(['John HarmsNo notes.'])

    await userEvent.click(within(cards[3]).getByRole('link'))
    expect(window.location.hash).toBe(`#/event/${tdeOct.id}`)
    expect(await screen.findByRole('tab', { name: /My notes/, selected: true })).toBeInTheDocument()
    expect(await screen.findByRole('region', { name: 'Instructor evaluation' })).toHaveTextContent('Amy Lee')

    await userEvent.click(screen.getAllByRole('button', { name: 'Back' }).at(-1)!)
    expect(window.location.hash).toBe('#/evaluations')
  })

  it('adds an evaluation to an event they went to: its My notes, with the form open', async () => {
    openAt('#/evaluations')
    const el = await page()
    const earlier = await within(el).findByRole('article', { name: 'Earlier' })
    await userEvent.click(within(earlier).getByRole('button', { name: /^Add instructor evaluation/ }))
    expect(window.location.hash).toBe(`#/event/${sameLayout.id}`)
    expect(await screen.findByRole('tab', { name: /My notes/, selected: true })).toBeInTheDocument()
    const form = await screen.findByRole('dialog', { name: 'Instructor evaluation' })
    await userEvent.type(within(form).getByLabelText('Instructor', { exact: true }), 'Sam')
    await userEvent.type(within(form).getByLabelText('Instructor notes'), 'Look further ahead.')
    await userEvent.click(within(form).getByRole('button', { name: 'Save' }))
    await waitFor(() => expect(notesByEvent[sameLayout.id]?.evaluation).toMatchObject({ instructor: 'Sam', notes: 'Look further ahead.' }))

    // Back on the page, it has feedback now.
    await userEvent.click(screen.getAllByRole('button', { name: 'Back' }).at(-1)!)
    expect(window.location.hash).toBe('#/evaluations')
    const card = await within(el).findByRole('article', { name: 'Earlier' })
    await waitFor(() => expect(within(card).getByRole('list', { name: 'Feedback' })).toHaveTextContent('Look further ahead.'))
  })

  it('says there are none yet, with no chart', async () => {
    notesByEvent = {}
    rsvps = {}
    summary = []
    openAt('#/evaluations')
    const el = await page()
    // Just that: no line under it.
    expect((await within(el).findByText('No instructor evaluations yet')).nextElementSibling).toBeNull()
    expect(within(el).queryByRole('region', { name: 'Skills wheel' })).not.toBeInTheDocument()
  })

  it('asks anyone signed out to sign in, and fetches nothing', async () => {
    signedIn = false
    openAt('#/evaluations')
    const el = await page()
    expect(await within(el).findByText('Sign in to see your instructor evaluations')).toBeInTheDocument()
    expect(within(el).queryByText(/admins can see/)).not.toBeInTheDocument()
    expect(fetchMock.mock.calls.filter(([u]) => String(u).includes('api/notes'))).toHaveLength(0)
  })
})
