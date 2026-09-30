import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, within, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { AuthProvider } from '../auth/AuthContext'
import { EventsProvider } from '../data/EventsContext'
import { RsvpsProvider } from '../data/RsvpsContext'
import type { Rsvps } from '../utils/rsvp'
import type { EventConfig } from '../types'
import type { SessionLaps } from '../utils/lapTimes'
import type { EventEvaluation, SessionNotes } from '../utils/evaluation'
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
  { id: JASON, email: 'jason@example.com', name: 'Jason' },
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
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

const fetchMock = vi.fn(async (input: string, init?: RequestInit) => {
  const url = String(input)
  if (url.includes('/.netlify/identity/settings')) return json({})
  if (url.includes('api/events')) return json({ events: [event, sameLayout, otherWay, ...moreEvents] })
  if (url.includes('api/rsvps')) return json({ rsvps })
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
async function tapSession(name: string, open: 'Lap times' | 'Instructor evaluation' | null = 'Lap times') {
  await waitFor(() => expect(lapCalls('GET').length).toBeGreaterThan(0))
  await userEvent.click(await screen.findByRole('button', { name }))
  if (open) await openInSheet(open)
}

// In the session's sheet, opens one of the things it can have.
async function openInSheet(what: 'Lap times' | 'Instructor evaluation') {
  const nav = within(screen.getByRole('dialog')).getByRole('navigation', { name: 'Session info' })
  await userEvent.click(within(nav).getByRole('button', { name: new RegExp(`^${what}`) }))
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
  moreEvents = []
  holdLaps = null
  notesByEvent = {}
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
    await tapSession('Lap times: 11:45 AM, Blue')

    const sheet = screen.getByRole('dialog', { name: '11:45 AM · Blue' })
    // Headed like the session's card: session, then time and group.
    expect(within(sheet).getByRole('heading')).toHaveTextContent('11:45AMBlue')
    expect(sheet).toHaveTextContent('Session 2')
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

    await userEvent.click(within(sheet).getByRole('button', { name: 'Save lap times' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(screen.getByRole('status')).toHaveTextContent('Lap times saved')

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
    expect(screen.getByText('Private')).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Best lap this event' })).toHaveTextContent('1:44')
    // Only admins pick a driver (#288).
    expect(screen.queryByLabelText('Driver')).not.toBeInTheDocument()
    expect(driverCalls()).toHaveLength(0)
    expect(lapCalls('GET').every(([url]) => !String(url).includes('driver='))).toBe(true)
  })

  it('reads each lap’s top and average speed, saves them and shows them in the table (#298)', async () => {
    openEvent()
    await tapSession('Lap times: 11:45 AM, Blue')
    const sheet = screen.getByRole('dialog', { name: '11:45 AM · Blue' })
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

    await userEvent.click(within(sheet).getByRole('button', { name: 'Save lap times' }))
    await waitFor(() => expect(lapCalls('PUT')).toHaveLength(1))
    expect(JSON.parse(String(lapCalls('PUT')[0][1]!.body)).session.laps).toEqual([
      { ms: 139_000, kind: 'out', topMph: 88, avgMph: 55.5 },
      { ms: 100_071, topMph: 92, avgMph: 61.7 },
      { ms: 88_551, topMph: 102.3, avgMph: 69.6, note: 'Traffic' },
    ])

    // Editing brings them back as rows, speeds after the lap time.
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    await userEvent.click(screen.getByRole('button', { name: 'Lap times: 11:45 AM, Blue (saved)' }))
    await openInSheet('Lap times')
    const again = screen.getByRole('dialog')
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
    expect(within(nav).getByRole('button', { name: /^Instructor evaluation/ })).toBeDisabled()

    await userEvent.click(within(sheet).getByRole('button', { name: 'Red' }))
    expect(sheet).toHaveAccessibleName('9:50 AM · Red')
    await openInSheet('Lap times')
    fireEvent.change(within(sheet).getByLabelText('Lap times or timestamps'), { target: { value: '1:39.42, 1:38.91' } })
    await userEvent.click(within(sheet).getByRole('button', { name: 'Save lap times' }))
    await waitFor(() => expect(lapCalls('PUT')).toHaveLength(1))
    expect(JSON.parse(String(lapCalls('PUT')[0][1]!.body)).session.group).toBe('red')
  })

  it('won’t save what it can’t read, and says which line', async () => {
    openEvent()
    await tapSession('Lap times: 11:45 AM, Blue')
    const sheet = screen.getByRole('dialog')
    fireEvent.change(within(sheet).getByLabelText('Lap times or timestamps'), { target: { value: '1:44\n1:4x' } })
    expect(within(sheet).getByRole('list', { name: 'Can’t read' })).toHaveTextContent('Line 2: Couldn’t read “1:4x” as a time.')
    expect(within(sheet).getByRole('button', { name: 'Save lap times' })).toBeDisabled()
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
    await userEvent.click(within(sheet).getByRole('button', { name: 'Save lap times' }))
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
    await openInSheet('Lap times')
    const sheet = screen.getByRole('dialog', { name: '11:45 AM · Blue' })
    // Saved laps open read-only, with a way to edit them.
    expect(within(sheet).queryByLabelText('Lap times or timestamps')).not.toBeInTheDocument()
    expect(within(sheet).queryByRole('button', { name: 'Save lap times' })).not.toBeInTheDocument()
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
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
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
    await userEvent.click(within(sheet).getByRole('button', { name: 'Save lap times' }))
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

  it('closes on Escape without saving', async () => {
    openEvent()
    await tapSession('Lap times: 11:45 AM, Blue')
    fireEvent.change(screen.getByLabelText('Lap times or timestamps'), { target: { value: '1:44' } })
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(lapCalls('PUT')).toHaveLength(0)
  })
})


describe('an admin logging another driver’s lap times (#288)', () => {
  const blue2 = (ms: number): SessionLaps => ({
    key: '2026-03-07 11:45 blue', date: '2026-03-07', time: '11:45', group: 'blue', sessionNumber: 2, laps: [{ ms }],
  })
  beforeEach(() => { roles = ['admin'] })

  it('picks the driver in the sheet, and saves the laps as theirs', async () => {
    openEvent()
    await tapSession('Lap times: 11:45 AM, Blue')
    const sheet = screen.getByRole('dialog')
    const picker = within(sheet).getByLabelText('Driver')
    expect(picker).toHaveValue('')
    // Everyone else, by name; the admin is "Me".
    await waitFor(() => expect(within(picker).getAllByRole('option').map(o => o.textContent)).toEqual(['Me', 'Jason']))
    expect(sheet).toHaveTextContent('Only you and admins can see your lap times.')

    await userEvent.selectOptions(picker, 'Jason')
    expect(sheet).toHaveTextContent('Only Jason and admins can see these lap times.')
    const box = await within(sheet).findByLabelText('Lap times or timestamps')
    fireEvent.change(box, { target: { value: '1:24.5, 1:23.9' } })
    await userEvent.click(within(sheet).getByRole('button', { name: 'Save lap times' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(screen.getByRole('status')).toHaveTextContent('Lap times saved for Jason')

    const [url] = lapCalls('PUT')[0]
    expect(String(url)).toContain(`driver=${JASON}`)
    expect(jasonSaved.map(s => s.key)).toEqual(['2026-03-07 11:45 blue'])
    expect(saved).toEqual([])

    // The schedule says whose laps it's marking, and switches back.
    expect(screen.getByRole('button', { name: 'Lap times: 11:45 AM, Blue (saved)' })).toBeInTheDocument()
    const banner = screen.getByLabelText('Driver')
    expect(banner).toHaveValue(JASON)
    await userEvent.selectOptions(banner, 'Me')
    expect(screen.queryByLabelText('Driver')).not.toBeInTheDocument()
    expect(await screen.findByRole('button', { name: 'Lap times: 11:45 AM, Blue' })).toBeInTheDocument()
  })

  it('keeps what’s been pasted when the driver is picked after', async () => {
    openEvent()
    await tapSession('Lap times: 11:45 AM, Blue')
    const sheet = screen.getByRole('dialog')
    fireEvent.change(within(sheet).getByLabelText('Lap times or timestamps'), { target: { value: '1:24.5' } })
    await userEvent.selectOptions(within(sheet).getByLabelText('Driver'), await within(sheet).findByRole('option', { name: 'Jason' }))
    expect(within(sheet).getByLabelText('Lap times or timestamps')).toHaveValue('1:24.5')
    await userEvent.click(within(sheet).getByRole('button', { name: 'Save lap times' }))
    await waitFor(() => expect(jasonSaved).toHaveLength(1))
    expect(saved).toEqual([])
  })

  it('shows the picked driver’s saved laps, and yours again on switching back', async () => {
    saved = [blue2(99_420)]
    jasonSaved = [blue2(84_420)]
    openEvent()
    await tapSession('Lap times: 11:45 AM, Blue (saved)')
    const sheet = screen.getByRole('dialog')
    const savedLaps = () => rows(within(sheet).getByRole('region', { name: 'Saved laps' }))[1]
    expect(savedLaps()).toEqual(['1', '1:39.42'])

    await userEvent.selectOptions(within(sheet).getByLabelText('Driver'), await within(sheet).findByRole('option', { name: 'Jason' }))
    await waitFor(() => expect(savedLaps()).toEqual(['1', '1:24.42']))
    await userEvent.selectOptions(within(sheet).getByLabelText('Driver'), 'Me')
    await waitFor(() => expect(savedLaps()).toEqual(['1', '1:39.42']))
  })

  it('lists the picked driver’s laps on My notes', async () => {
    saved = [blue2(99_000)]
    openEvent()
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes (1)' }))
    await userEvent.selectOptions(screen.getByLabelText('Driver'), await screen.findByRole('option', { name: 'Jason' }))
    expect(await screen.findByText('No session notes yet')).toBeInTheDocument()
    expect(screen.getByText('On the Schedule tab, tap a session Jason drove to add their laps or their instructor’s feedback.')).toBeInTheDocument()
    expect(screen.getByText('Private')).toHaveAttribute('title', 'Only Jason and admins can see these lap times')

    // Picked again, they're fetched afresh.
    jasonSaved = [blue2(84_000)]
    await userEvent.selectOptions(screen.getByLabelText('Driver'), 'Me')
    await userEvent.selectOptions(screen.getByLabelText('Driver'), 'Jason')
    expect(await screen.findByRole('tab', { name: 'My notes (1)' })).toBeInTheDocument()
    expect(await screen.findByRole('group', { name: 'Best lap this event' })).toHaveTextContent('1:24')

    // Another event starts back on the admin's own.
    window.location.hash = `#/event/${sameLayout.id}`
    const earlier = () => lapCalls('GET').filter(([url]) => String(url).includes(`event=${sameLayout.id}`))
    await waitFor(() => expect(earlier()).toHaveLength(1))
    expect(String(earlier()[0][0])).not.toContain('driver=')
    expect(screen.queryByLabelText('Driver')).not.toBeInTheDocument()
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
    expect(within(nav).getByRole('button', { name: /^Lap times/ })).toHaveTextContent('Paste times or timestamps')
    await openInSheet('Instructor evaluation')
    // Nothing to save till there's feedback.
    expect(within(sheet).getByRole('button', { name: 'Save evaluation' })).toBeDisabled()
    fireEvent.change(within(sheet).getByLabelText('Instructor feedback'), { target: { value: 'Unwind the wheel sooner.' } })
    fireEvent.change(within(sheet).getByRole('textbox', { name: /^Instructor\s?Optional$/ }), { target: { value: 'John Harms' } })
    await userEvent.click(within(sheet).getByRole('button', { name: 'Save evaluation' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(screen.getByRole('status')).toHaveTextContent('Evaluation saved')
    expect(JSON.parse(String(notesCalls('PUT')[0][1]!.body)).session).toEqual({
      date: '2026-03-07', time: '11:45', group: 'blue', sessionNumber: 2,
      evaluation: { feedback: 'Unwind the wheel sooner.', instructor: 'John Harms' },
    })
    expect(lapCalls('PUT')).toHaveLength(0)

    // The schedule marks it; My notes counts it and lists it, with no laps.
    expect(screen.getByRole('button', { name: 'Lap times: 11:45 AM, Blue (evaluated)' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('tab', { name: 'My notes (1)' }))
    const card = screen.getByRole('region', { name: 'Session 2, 11:45 AM' })
    expect(card).toHaveTextContent('Instructor evaluation · John HarmsUnwind the wheel sooner.')
    expect(within(card).queryByRole('table', { name: 'Session figures' })).not.toBeInTheDocument()

    // Its chevron opens it in the sheet, where it's removed.
    await userEvent.click(within(card).getByRole('button', { name: 'Open the instructor evaluation for Session 2' }))
    const again = screen.getByRole('dialog', { name: '11:45 AM · Blue' })
    expect(within(again).getByLabelText('Instructor feedback')).toHaveValue('Unwind the wheel sooner.')
    await userEvent.click(within(again).getByRole('button', { name: 'Remove from session' }))
    await userEvent.click(within(again).getByRole('button', { name: 'Remove' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
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
    expect(card.querySelector('[data-session-evaluation]')).toHaveTextContent('Instructor evaluationEyes up through Big Bend.')

    // Edit opens the sheet on everything the session has.
    await userEvent.click(within(card).getByRole('button', { name: 'Edit Session 2' }))
    const nav = within(screen.getByRole('dialog')).getByRole('navigation', { name: 'Session info' })
    expect(within(nav).getByRole('button', { name: /^Lap times/ })).toHaveTextContent('2 laps · best 1:38.91')
    expect(within(nav).getByRole('button', { name: /^Instructor evaluation/ })).toHaveTextContent('Eyes up through Big Bend.')
    // And back from one of them.
    await openInSheet('Lap times')
    await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'All session info' }))
    expect(within(screen.getByRole('dialog')).getByRole('navigation', { name: 'Session info' })).toBeInTheDocument()
  })

  it('adds the whole event’s evaluation on any event: on others, just the instructor and their notes', async () => {
    openEvent()
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes' }))
    const add = screen.getByRole('button', { name: /^Add instructor evaluation/ })
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
    await userEvent.click(within(sheet).getByRole('button', { name: 'Save evaluation' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
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
    await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Save evaluation' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
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
    expect(within(sheet).getByRole('button', { name: 'Save evaluation' })).toBeDisabled()

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
    await userEvent.click(within(sheet).getByRole('button', { name: 'Save evaluation' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())

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
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(notesCalls('DELETE')[0][0]).toContain('evaluation=1')
    expect(screen.getByRole('button', { name: /^Add instructor evaluation/ })).toBeInTheDocument()
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
    expect(within(page).getByText('Private')).toBeInTheDocument()
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
    const sheet = screen.getByRole('dialog', { name: '11:45 AM · Blue' })
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
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes (1)' }))
    await userEvent.selectOptions(screen.getByLabelText('Driver'), await screen.findByRole('option', { name: 'Jason' }))
    await userEvent.click(await screen.findByRole('link', { name: 'See all Jason’s MSRC 1.7 CW laps' }))

    const page = await trackPage()
    expect(page).toHaveTextContent('Motorsport Ranch - Cresson · Jason’s laps')
    expect(await within(page).findByRole('group', { name: 'All time best' })).toHaveTextContent('1:24.42Across 1 session at 1 event')
    // One event is still a chart: its best and average, labelled.
    const chart = within(page).getByRole('group', { name: /^Best and average lap at each event, oldest to newest: 1 event\./ })
    expect(chart.querySelector('[data-end-label="best"]')).toHaveTextContent('1:24.42')
    const [url] = lapCalls('GET').find(([u]) => String(u).includes('events='))!
    expect(String(url)).toContain(`driver=${JASON}`)
    expect(within(page).getByText('Private')).toHaveAttribute('title', 'Only Jason and admins can see these lap times')

    await userEvent.click(await card('Lap Day'))
    expect(screen.getByLabelText('Driver')).toHaveValue(JASON)
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

  it('switches tabs from the tab bar; More lists Instructor evaluations and the Garage, which is coming soon', async () => {
    openAt('#/')
    expect(await screen.findByRole('heading', { level: 1, name: 'HPDE Events' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Events' })).toHaveAttribute('aria-current', 'page')
    expect(screen.queryByRole('link', { name: 'Garage' })).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('link', { name: 'More' }))
    expect(window.location.hash).toBe('#/more')
    expect(screen.getByRole('heading', { level: 1, name: 'More' })).toBeInTheDocument()
    const items = within(screen.getByRole('list', { name: 'More' })).getAllByRole('link')
    expect(items.map(a => a.getAttribute('href'))).toEqual(['#/evaluations', '#/garage'])

    await userEvent.click(items[1])
    expect(window.location.hash).toBe('#/garage')
    const garage = screen.getByRole('heading', { level: 1, name: 'Garage' }).closest<HTMLElement>('.fixed')!
    expect(within(garage).getByText('Coming soon')).toBeInTheDocument()
    // Still under More.
    expect(screen.getByRole('link', { name: 'More' })).toHaveAttribute('aria-current', 'page')
    await userEvent.click(within(garage).getByRole('button', { name: 'Back' }))
    expect(window.location.hash).toBe('#/more')

    await userEvent.click(screen.getByRole('link', { name: 'Events' }))
    expect(window.location.hash).toBe('#/')
    expect(screen.getByRole('heading', { level: 1, name: 'HPDE Events' })).toBeInTheDocument()
  })
})

describe('Instructor evaluations across events (#345)', () => {
  // Two TDE events on the layout, and Lap Day, which isn't one.
  const tdeSep: EventConfig = { ...sameLayout, id: '2025-09-13_tde', name: 'TDE at MSRC', organizer: 'The Drivers Edge', days: [{ ...event.days[0], date: '2025-09-13' }] }
  const tdeOct: EventConfig = { ...sameLayout, id: '2025-10-04_tde', name: 'TDE at ECR', organizer: 'The Drivers Edge', days: [{ ...event.days[0], date: '2025-10-04' }] }
  const openAt = (hash: string) => {
    window.location.hash = hash
    render(<AuthProvider><EventsProvider><App /></EventsProvider></AuthProvider>)
  }
  const page = async () => (await screen.findByRole('heading', { level: 1, name: 'Instructor evaluations' })).closest<HTMLElement>('.fixed')!
  const score = (el: HTMLElement, id: string) => el.querySelector(`[data-score="${id}"]`)!.getAttribute('aria-label')

  beforeEach(() => {
    moreEvents = [tdeSep, tdeOct]
    notesByEvent = {
      [tdeSep.id]: { evaluation: { instructor: 'John Harms', skills: { flags: 65, vision: 70 }, carAidsPct: 25 }, sessions: [] },
      [tdeOct.id]: { evaluation: { instructor: 'Amy Lee', skills: { flags: 80, vision: 70, pace: 90 } }, sessions: [] },
      [event.id]: {
        sessions: [{ key: '2026-03-07 11:45 blue', date: '2026-03-07', time: '11:45', group: 'blue', sessionNumber: 2, evaluation: { feedback: 'Eyes up.', instructor: 'Jo' } }],
      },
    }
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
    // The first and the latest card, both on at first; one can be hidden, not both.
    const chips = within(within(wheel).getByRole('group', { name: 'Report cards shown' })).getAllByRole('button')
    expect(chips.map(c => [c.textContent, c.getAttribute('aria-pressed')])).toEqual([['Sep 13', 'true'], ['Oct 4', 'true']])
    expect([...wheel.querySelectorAll('[data-card]')].map(g => g.getAttribute('data-card'))).toEqual([tdeSep.id, tdeOct.id])
    await userEvent.click(chips[0])
    expect([...wheel.querySelectorAll('[data-card]')].map(g => g.getAttribute('data-card'))).toEqual([tdeOct.id])
    await userEvent.click(chips[1])
    expect(chips[1]).toHaveAttribute('aria-pressed', 'true')

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
    // Tapped again, it goes.
    await userEvent.click(within(wheel).getByRole('button', { name: 'Calls out all flags' }))
    expect(within(wheel).queryByRole('region', { name: 'Calls out all flags at each event' })).not.toBeInTheDocument()
  })

  it('lists every event with an evaluation, newest first, and opens one on My notes; Back returns here', async () => {
    openAt('#/more')
    await userEvent.click(await screen.findByRole('link', { name: /Instructor evaluations/ }))
    expect(window.location.hash).toBe('#/evaluations')
    const el = await page()
    const events = within(await within(el).findByRole('region', { name: 'Events' })).getAllByRole('link')
    expect(events.map(a => a.textContent)).toEqual([
      expect.stringContaining('Lap Day'),
      expect.stringContaining('TDE at ECR'),
      expect.stringContaining('TDE at MSRC'),
    ])
    expect(events[0]).toHaveTextContent('1 session')
    expect(events[0]).toHaveTextContent('Jo')
    expect(events[1]).toHaveTextContent('Report card')
    expect(events[1]).toHaveTextContent('Amy Lee')

    await userEvent.click(events[1])
    expect(window.location.hash).toBe(`#/event/${tdeOct.id}`)
    expect(await screen.findByRole('tab', { name: /My notes/, selected: true })).toBeInTheDocument()
    expect(await screen.findByRole('region', { name: 'Instructor evaluation' })).toHaveTextContent('Amy Lee')

    await userEvent.click(screen.getAllByRole('button', { name: 'Back' }).at(-1)!)
    expect(window.location.hash).toBe('#/evaluations')
  })

  it('says how to add one when there are none, with no chart', async () => {
    notesByEvent = {}
    openAt('#/evaluations')
    const el = await page()
    expect(await within(el).findByText('No instructor evaluations yet')).toBeInTheDocument()
    expect(within(el).queryByRole('region', { name: 'Skills wheel' })).not.toBeInTheDocument()
  })

  it('asks anyone signed out to sign in, and fetches nothing', async () => {
    signedIn = false
    openAt('#/evaluations')
    const el = await page()
    expect(await within(el).findByText('Sign in to see your instructor evaluations')).toBeInTheDocument()
    expect(fetchMock.mock.calls.filter(([u]) => String(u).includes('api/notes'))).toHaveLength(0)
  })
})
