import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, within, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { AuthProvider } from '../auth/AuthContext'
import { EventsProvider } from '../data/EventsContext'
import type { EventConfig } from '../types'
import type { SessionLaps } from '../utils/lapTimes'
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

// Another driver an admin can log laps for (#289).
const JASON = '5b0f2c1e-8d3a-4f6b-9c2d-7e1a0b3c4d5e'
const DRIVERS = [
  { id: JASON, email: 'jason@example.com', name: 'Jason' },
  { id: 'u', email: 'v@example.com', name: 'Vera' },
]

// The laps function, in memory: the signed-in driver's laps, and Jason's.
let saved: SessionLaps[] = []
let jasonSaved: SessionLaps[] = []
let failSaves = false
// While set, reading the laps waits for it.
let holdLaps: Promise<void> | null = null
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

const fetchMock = vi.fn(async (input: string, init?: RequestInit) => {
  const url = String(input)
  if (url.includes('/.netlify/identity/settings')) return json({})
  if (url.includes('api/events')) return json({ events: [event, sameLayout, otherWay] })
  if (url.includes('api/drivers')) {
    expect(roles).toContain('admin')
    return json({ drivers: DRIVERS })
  }
  if (url.includes('api/laps')) {
    expect(new Headers(init?.headers).get('Authorization')).toBe('Bearer token')
    const params = new URL(url, 'https://x').searchParams
    const forJason = params.get('driver') === JASON
    if (params.has('driver')) {
      expect(roles).toContain('admin')
      expect(params.get('driver')).toBe(JASON)
    }
    if (!params.has('event')) return json({ events: forJason ? [] : summary })
    // Nothing saved at the earlier event.
    if (params.get('event') === sameLayout.id && !init?.method) return json({ sessions: [] })
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

// Once the driver's laps have loaded, the schedule is settled.
async function tapSession(name: string) {
  await waitFor(() => expect(lapCalls('GET').length).toBeGreaterThan(0))
  await userEvent.click(await screen.findByRole('button', { name }))
}

// The figures above a table of laps, by label.
function figures(el: HTMLElement): Record<string, string> {
  const dl = el.querySelector('dl[aria-label="Session figures"]')!
  const out: Record<string, string> = {}
  dl.querySelectorAll('dt').forEach(dt => { out[dt.textContent!] = dt.nextElementSibling!.textContent! })
  return out
}

// A table of laps, as text, header first. Lines stacked in one cell (start
// over finish) are joined with a dash.
function rows(el: HTMLElement): string[][] {
  return within(el).getAllByRole('row').map(row => [...row.children].map(cell =>
    cell.children.length > 1 ? [...cell.children].map(line => line.textContent).join(' – ') : cell.textContent ?? ''))
}

const lapCalls = (method: string) =>
  fetchMock.mock.calls.filter(([url, init]) => String(url).includes('api/laps') && (init?.method ?? 'GET') === method)
const driverCalls = () => fetchMock.mock.calls.filter(([url]) => String(url).includes('api/drivers'))

beforeEach(() => {
  localStorage.clear()
  signedIn = true
  roles = []
  saved = []
  jasonSaved = []
  summary = []
  holdLaps = null
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
    expect(figures(read)).toEqual({ Laps: '2', Average: '1:50.0', Best: '1:44' })
    // Columns in the order they're entered; the best lap in a chip.
    expect(rows(read)).toEqual([
      ['Lap', 'From / To', 'Lap time', 'Note'],
      ['Out', '11:46:32 AM – 11:48:51 AM', '2:19', 'Traffic'],
      ['1', '11:48:51 AM – 11:50:47 AM', '1:56', ''],
      ['2', '11:50:47 AM – 11:52:31 AM', '1:44', 'Best so far'],
    ])
    // The chip is in both; only the table's is pulled left, to line up with
    // the times above and below it.
    const [inFigures, inTable] = read.querySelectorAll('[data-best-lap]')
    expect(inFigures).not.toHaveClass('-ml-1.5')
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
    expect(figures(card)).toEqual({ Laps: '2', Average: '1:50.0', Best: '1:44' })
    // The laps are folded away until asked for.
    expect(within(card).queryByRole('table')).not.toBeInTheDocument()
    await userEvent.click(within(card).getByRole('button', { name: 'Show laps for Session 2' }))
    expect(rows(card)[3]).toEqual(['2', '11:50:47 AM – 11:52:31 AM', '1:44', 'Best so far'])
    await userEvent.click(within(card).getByRole('button', { name: 'Hide laps for Session 2' }))
    expect(within(card).queryByRole('table')).not.toBeInTheDocument()
    expect(screen.getByText('Private')).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Best lap this event' })).toHaveTextContent('1:44')
    // Only admins pick a driver (#289).
    expect(screen.queryByLabelText('Driver')).not.toBeInTheDocument()
    expect(driverCalls()).toHaveLength(0)
    expect(lapCalls('GET').every(([url]) => !String(url).includes('driver='))).toBe(true)
  })

  it('asks which group when more than one is on track', async () => {
    openEvent()
    await tapSession('Lap times: 9:50 AM, Blue, Red')
    const sheet = screen.getByRole('dialog')
    expect(within(sheet).queryByLabelText('Lap times or timestamps')).not.toBeInTheDocument()
    expect(within(sheet).getByRole('button', { name: 'Save lap times' })).toBeDisabled()

    await userEvent.click(within(sheet).getByRole('button', { name: 'Red' }))
    expect(sheet).toHaveAccessibleName('9:50 AM · Red')
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
    expect(figures(within(sheet).getByRole('region', { name: 'Laps read' })).Laps).toBe('3')

    await userEvent.click(within(sheet).getByRole('button', { name: 'Video timestamps' }))
    expect(figures(within(sheet).getByRole('region', { name: 'Laps read' }))).toEqual({ Laps: '2', Average: '1:52.0', Best: '1:48' })
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

    await userEvent.click(screen.getByRole('button', { name: 'Edit lap times for Session 2' }))
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
    expect(screen.getByText('No lap times yet')).toBeInTheDocument()
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

  it('gives every session’s table the same columns, so they line up', async () => {
    saved = [
      { key: '2026-03-07 09:50 blue', date: '2026-03-07', time: '09:50', group: 'blue', sessionNumber: 1, laps: [{ ms: 99_420 }] },
      { key: '2026-03-07 11:45 blue', date: '2026-03-07', time: '11:45', group: 'blue', sessionNumber: 2, laps: [{ ms: 98_910, start: '~2:32:44 PM', end: '~2:34:26 PM' }] },
    ]
    openEvent()
    await userEvent.click(await screen.findByRole('tab', { name: 'My notes (2)' }))
    await userEvent.click(screen.getByRole('button', { name: 'Expand all' }))
    const headers = screen.getAllByRole('table').map(t => rows(t)[0])
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
    expect(screen.queryAllByRole('table')).toHaveLength(0)
    await userEvent.click(screen.getByRole('button', { name: 'Expand all' }))
    expect(screen.getAllByRole('table')).toHaveLength(2)
    await userEvent.click(screen.getByRole('button', { name: 'Collapse all' }))
    expect(screen.queryAllByRole('table')).toHaveLength(0)
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


describe('an admin logging another driver’s lap times (#289)', () => {
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
    expect(await screen.findByText('No lap times yet')).toBeInTheDocument()
    expect(screen.getByText('On the Schedule tab, tap a session Jason drove to add their laps.')).toBeInTheDocument()
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

describe('LapTimesSheet', () => {
  it('keeps focus in the text box when the page behind re-renders', async () => {
    const props = {
      slot: { date: '2026-03-07', time: '11:45', sessionNumber: 2, groups: ['blue'] },
      runGroups: event.runGroups,
      showDate: false,
      saved: () => undefined,
      onSave: async () => {},
      onRemove: async () => {},
    }
    // Every render of the event page hands the sheet a new onClose.
    const { rerender } = render(<LapTimesSheet {...props} onClose={() => {}} />)
    const box = screen.getByLabelText('Lap times or timestamps')
    box.focus()
    rerender(<LapTimesSheet {...props} onClose={() => {}} />)
    expect(box).toHaveFocus()
  })
})
