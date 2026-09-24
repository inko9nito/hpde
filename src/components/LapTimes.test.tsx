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
// fake; signedIn decides whether it reports a user.
let signedIn = true
const handlers: Record<string, (u: unknown) => void> = {}
const currentUser = () => (signedIn ? { id: 'u', email: 'v@example.com', app_metadata: { roles: [] }, jwt: async () => 'token' } : null)
const fakeWidget = {
  init: () => handlers.init?.(currentUser()),
  on: (e: string, cb: (u: unknown) => void) => { handlers[e] = cb },
  open() {}, close() {}, logout() {}, currentUser,
} as unknown as NonNullable<typeof window.netlifyIdentity>

// The laps function, in memory.
let saved: SessionLaps[] = []
let failSaves = false
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

const fetchMock = vi.fn(async (input: string, init?: RequestInit) => {
  const url = String(input)
  if (url.includes('/.netlify/identity/settings')) return json({})
  if (url.includes('api/events')) return json({ events: [event, sameLayout, otherWay] })
  if (url.includes('api/laps')) {
    expect(new Headers(init?.headers).get('Authorization')).toBe('Bearer token')
    if (!url.includes('?')) return json({ events: summary })
    expect(url).toContain(`event=${event.id}`)
    if (init?.method === 'PUT') {
      if (failSaves) return json({ error: 'Blobs is down.' }, 503)
      const { session } = JSON.parse(String(init.body))
      const stored = { ...session, key: `${session.date} ${session.time} ${session.group}`, updatedAt: 'now' }
      saved = [...saved.filter(s => s.key !== stored.key), stored].sort((a, b) => a.key.localeCompare(b.key))
      return json({ session: stored })
    }
    if (init?.method === 'DELETE') {
      const key = new URL(url, 'https://x').searchParams.get('session')
      saved = saved.filter(s => s.key !== key)
      return json({ deleted: key })
    }
    return json({ sessions: saved })
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

// A table of laps, as text, header first.
function rows(el: HTMLElement): string[][] {
  return within(el).getAllByRole('row').map(row => [...row.children].map(cell => cell.textContent ?? ''))
}

const lapCalls = (method: string) =>
  fetchMock.mock.calls.filter(([url, init]) => String(url).includes('api/laps') && (init?.method ?? 'GET') === method)

beforeEach(() => {
  localStorage.clear()
  signedIn = true
  saved = []
  summary = []
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
      ['Lap', 'Start', 'Finish', 'Lap time', 'Note'],
      ['Out', '11:46:32 AM', '11:48:51 AM', '2:19', 'Traffic'],
      ['1', '11:48:51 AM', '11:50:47 AM', '1:56', ''],
      ['2', '11:50:47 AM', '11:52:31 AM', '1:44', 'Best so far'],
    ])
    expect(read.querySelectorAll('[data-best-lap]')).toHaveLength(2)
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
    expect(rows(card)[3]).toEqual(['2', '11:50:47 AM', '11:52:31 AM', '1:44', 'Best so far'])
    await userEvent.click(within(card).getByRole('button', { name: 'Hide laps for Session 2' }))
    expect(within(card).queryByRole('table')).not.toBeInTheDocument()
    expect(screen.getByText('Private')).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Best lap this event' })).toHaveTextContent('1:44')
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
