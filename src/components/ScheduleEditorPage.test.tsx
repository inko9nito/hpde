import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent, within, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { AuthProvider } from '../auth/AuthContext'
import { EventsProvider } from '../data/EventsContext'
import { applySchedule } from '../utils/scheduleEditor'
import type { EventConfig } from '../types'

// Created in the app, no schedule yet (like the Oct 3 event).
const blank: EventConfig = {
  id: '2099-10-03_tde',
  name: 'TDE at Test Raceway',
  runGroups: [],
  days: [{ id: 'saturday', label: 'Saturday', date: '2099-10-03', activities: [] }],
}

const SCHEDULE = `## groups
red | Red | bg-runred-500 | text-white | Advanced

## Saturday | 2099-10-03
07:30 general | Drivers meeting
08:00 session 1 | track: red
`

// identity.ts caches the first widget it loads, so every test shares one
// fake and just changes who's signed in.
let roles: string[] = []
const handlers: Record<string, (u: unknown) => void> = {}
const currentUser = () => ({ id: 'u', email: 'v@example.com', app_metadata: { roles }, jwt: async () => 'token' })
window.netlifyIdentity = {
  init: () => handlers.init?.(currentUser()),
  on: (e: string, cb: (u: unknown) => void) => { handlers[e] = cb },
  open() {}, close() {}, logout() {}, currentUser,
} as unknown as NonNullable<typeof window.netlifyIdentity>

// The events function, as far as these tests need it: the PUT answers the
// way the real one does, from the same parser — unless a test refuses it.
let refusePut: string | null = null
const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
  if (String(url).includes('/.netlify/identity/settings')) return json({})
  if (String(url).includes('api/events')) {
    if (init?.method === 'PUT') {
      if (refusePut) return json({ error: refusePut }, 403)
      const result = applySchedule(blank, JSON.parse(init.body as string).schedule)
      return 'error' in result ? json(result, 400) : json({ event: result.event })
    }
    return json({ events: [blank] })
  }
  return new Response('not found', { status: 404 })
})

function open(hash: string, as: string[] = ['admin']) {
  roles = as
  window.location.hash = hash
  render(<AuthProvider><EventsProvider><App /></EventsProvider></AuthProvider>)
}

const editor = () => screen.findByRole('textbox', { name: 'Schedule' }) as Promise<HTMLTextAreaElement>
const saveButton = () => screen.getByRole('button', { name: 'Save schedule' })

describe('schedule editor (#232)', () => {
  beforeEach(() => {
    localStorage.clear()
    refusePut = null
    fetchMock.mockClear()
    vi.stubGlobal('fetch', fetchMock)
  })
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('opens from “Add schedule” on an event with none, with a section per day and examples to copy', async () => {
    open(`#/event/${blank.id}`)
    await userEvent.click(await screen.findByRole('link', { name: 'Add schedule' }))
    const textarea = await editor()
    expect(textarea.value).toContain('## groups\n// id | Label | color | text color')
    expect(textarea.value).toContain('## Saturday | 2099-10-03\n// 07:00 general | Registration & tech')
    // Nothing changed yet, nothing to save.
    expect(saveButton()).toBeDisabled()
  })

  it('also opens from the header’s … menu', async () => {
    open(`#/event/${blank.id}`)
    await userEvent.click(await screen.findByRole('button', { name: 'More actions' }))
    await userEvent.click(screen.getByRole('menuitem', { name: /Edit schedule/ }))
    expect(await editor()).toBeInTheDocument()
    expect(window.location.hash).toBe(`#/edit-schedule/${blank.id}`)
  })

  it('lists what it can’t read, by line, and won’t save until it’s fixed', async () => {
    open(`#/edit-schedule/${blank.id}`)
    fireEvent.change(await editor(), { target: { value: SCHEDULE.replace('track: red', 'track: blue') + '7:00 general | Gates\n' } })

    const problems = within(screen.getByRole('list', { name: 'Problems' }))
    expect(problems.getByText(/There’s no group “blue”/)).toHaveTextContent('Line 6:')
    expect(problems.getByText(/use 24-hour HH:MM/)).toHaveTextContent('Line 7:')
    expect(saveButton()).toBeDisabled()

    fireEvent.change(await editor(), { target: { value: SCHEDULE } })
    expect(screen.queryByRole('list', { name: 'Problems' })).not.toBeInTheDocument()
    expect(saveButton()).toBeEnabled()
  })

  it('previews the schedule as it will look', async () => {
    open(`#/edit-schedule/${blank.id}`)
    fireEvent.change(await editor(), { target: { value: SCHEDULE } })
    await userEvent.click(screen.getByRole('tab', { name: 'Preview' }))
    expect(screen.getByText('Drivers meeting')).toBeInTheDocument()
    expect(screen.getAllByText('Red').length).toBeGreaterThan(0)
    await userEvent.click(screen.getByRole('tab', { name: 'Edit' }))
    expect((await editor()).value).toBe(SCHEDULE)
  })

  it('saves the markdown, then shows the event with its new schedule', async () => {
    open(`#/edit-schedule/${blank.id}`)
    fireEvent.change(await editor(), { target: { value: SCHEDULE } })
    await userEvent.click(saveButton())

    const put = fetchMock.mock.calls.find(([, init]) => init?.method === 'PUT')!
    expect(put[0]).toBe(`/api/events?id=${blank.id}`)
    expect(JSON.parse(put[1]!.body as string)).toEqual({ schedule: SCHEDULE })
    expect((put[1]!.headers as Headers).get('Authorization')).toBe('Bearer token')

    await waitFor(() => expect(window.location.hash).toBe(`#/event/${blank.id}`))
    expect(await screen.findByText('Schedule saved')).toBeInTheDocument()
    expect(await screen.findByText('Drivers meeting')).toBeInTheDocument()
    // Saved, so no draft left behind.
    expect(localStorage.getItem(`hpde:scheduleDraft:${blank.id}`)).toBeNull()
  })

  it('shows the server’s reason when a save is refused, and stays put', async () => {
    refusePut = 'Only admins can change events.'
    open(`#/edit-schedule/${blank.id}`)
    fireEvent.change(await editor(), { target: { value: SCHEDULE } })
    await userEvent.click(saveButton())
    expect(await screen.findByRole('alert')).toHaveTextContent('Only admins can change events.')
    expect(window.location.hash).toBe(`#/edit-schedule/${blank.id}`)
    expect((await editor()).value).toBe(SCHEDULE)
  })

  it('keeps unsaved changes if you leave, and offers to discard them', async () => {
    open(`#/edit-schedule/${blank.id}`)
    fireEvent.change(await editor(), { target: { value: SCHEDULE } })
    cleanup()

    open(`#/edit-schedule/${blank.id}`)
    expect((await editor()).value).toBe(SCHEDULE)
    expect(screen.getByText('Your unsaved changes are back.')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Discard' }))
    expect((await editor()).value).toContain('// 07:00 general')
    expect(localStorage.getItem(`hpde:scheduleDraft:${blank.id}`)).toBeNull()
  })

  it('is for admins only', async () => {
    open(`#/edit-schedule/${blank.id}`, [])
    expect(await screen.findByText('Only admins can edit schedules.')).toBeInTheDocument()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('won’t edit the test events that ship with the app', async () => {
    open('#/event/test-live')
    await userEvent.click(await screen.findByRole('button', { name: 'More actions' }))
    const item = screen.getByRole('menuitem', { name: /Edit schedule/ })
    expect(item).toBeDisabled()
    expect(item).toHaveTextContent('Test events can’t be edited')
    cleanup()

    open('#/edit-schedule/test-live')
    expect(await screen.findByText('Test events can’t be edited.')).toBeInTheDocument()
  })

  it('closes back to the event', async () => {
    open(`#/edit-schedule/${blank.id}`)
    await editor()
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => expect(window.location.hash).toBe(`#/event/${blank.id}`))
  })
})
