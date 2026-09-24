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
  if (url.includes('api/events')) return json({ events: [event] })
  if (url.includes('api/laps')) {
    expect(new Headers(init?.headers).get('Authorization')).toBe('Bearer token')
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

const lapCalls = (method: string) =>
  fetchMock.mock.calls.filter(([url, init]) => String(url).includes('api/laps') && (init?.method ?? 'GET') === method)

beforeEach(() => {
  localStorage.clear()
  signedIn = true
  saved = []
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
    expect(sheet).toHaveTextContent('Session 2 · On track')
    const box = within(sheet).getByLabelText('Lap times or timestamps')
    fireEvent.change(box, { target: { value: SHEET_ROWS } })

    // What was read, before saving: the out lap doesn't count.
    const read = within(sheet).getByRole('region', { name: 'Laps read' })
    expect(read).toHaveTextContent('2 laps · Best 1:44 · Avg 1:50.0 · + 1 out/in')
    expect(within(read).getByLabelText('Lap 2: 1:44, best')).toBeInTheDocument()
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
    expect(card).toHaveTextContent('2 laps · Best 1:44')
    expect(card).toHaveTextContent('Best so far')
    expect(screen.getByText(/Only visible to you/)).toBeInTheDocument()
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
    expect(within(sheet).getByRole('region', { name: 'Laps read' })).toHaveTextContent('3 laps')

    await userEvent.click(within(sheet).getByRole('button', { name: 'Video timestamps' }))
    expect(within(sheet).getByRole('region', { name: 'Laps read' })).toHaveTextContent('2 laps · Best 1:48 · Avg 1:52.0')
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
    expect(screen.getByText(/Best lap/)).toHaveTextContent('Best lap 1:38.91 · Session 2')

    await userEvent.click(screen.getByRole('button', { name: 'Edit lap times for Session 2' }))
    const sheet = screen.getByRole('dialog', { name: '11:45 AM · Blue' })
    expect(within(sheet).getByLabelText('Lap times or timestamps')).toHaveValue('1:39.42, 1:38.91')

    await userEvent.click(within(sheet).getByRole('button', { name: 'Remove from session' }))
    await userEvent.click(within(sheet).getByRole('button', { name: 'Remove' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(lapCalls('DELETE')[0][0]).toContain(`session=${encodeURIComponent('2026-03-07 11:45 blue')}`)
    expect(screen.getByText('No lap times yet')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'My notes' })).toBeInTheDocument()
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
