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

const SCHEDULE = `## Saturday | 2099-10-03
07:30 general | Drivers meeting
08:00 session 1 | track: Red
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
const defaultFetch = async (url: string, init?: RequestInit) => {
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
  if (String(url).includes('/.netlify/identity/settings')) return json({})
  if (String(url).includes('api/events')) {
    if (init?.method === 'PUT') {
      if (refusePut) return json({ error: refusePut }, 403)
      const { runGroups, schedule } = JSON.parse(init.body as string)
      const result = applySchedule(blank, runGroups, schedule)
      return 'error' in result ? json(result, 400) : json({ event: result.event })
    }
    return json({ events: [blank] })
  }
  return new Response('not found', { status: 404 })
}
const fetchMock = vi.fn(defaultFetch)

function open(hash: string, as: string[] = ['admin']) {
  roles = as
  window.location.hash = hash
  render(<AuthProvider><EventsProvider><App /></EventsProvider></AuthProvider>)
}

const editor = () => screen.findByRole('textbox', { name: 'Schedule' }) as Promise<HTMLTextAreaElement>
const saveButton = () => screen.getByRole('button', { name: 'Save schedule' })

const groupRow = (name: string) => within(screen.getByRole('listitem', { name }))

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

  it('opens from “Add schedule” on an event with none: a section per day with examples to copy, no groups yet', async () => {
    open(`#/event/${blank.id}`)
    await userEvent.click(await screen.findByRole('link', { name: 'Add schedule' }))
    const textarea = await editor()
    expect(textarea.value).not.toContain('## groups')
    expect(textarea.value).toContain('## Saturday | 2099-10-03\n// 7:00 AM general | Registration & tech')
    expect(screen.getByText('Groups named in sessions (“track: Red, Blue”) show up here.')).toBeInTheDocument()
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
    fireEvent.change(await editor(), { target: { value: SCHEDULE + '7:00 general | Gates\n## Sunday | 2099-10-04\n' } })

    const problems = within(screen.getByRole('list', { name: 'Problems' }))
    expect(problems.getByText(/needs AM or PM/)).toHaveTextContent('Line 4:')
    expect(problems.getByText(/isn’t one of this event’s dates/)).toHaveTextContent('Line 5:')
    expect(saveButton()).toBeDisabled()

    fireEvent.change(await editor(), { target: { value: SCHEDULE } })
    expect(screen.queryByRole('list', { name: 'Problems' })).not.toBeInTheDocument()
    expect(saveButton()).toBeEnabled()
  })

  it('never recolors a group because another one’s color changed', async () => {
    open(`#/edit-schedule/${blank.id}`)
    fireEvent.change(await editor(), { target: { value: '## Saturday | 2099-10-03\n08:00 session 1 | track: Novice, Advanced\n' } })
    expect(groupRow('Novice').getByText('Novice')).toHaveClass('bg-runred-500')
    expect(groupRow('Advanced').getByText('Advanced')).toHaveClass('bg-runorange-500')
    await userEvent.click(groupRow('Novice').getByRole('button', { name: 'Novice' }))
    await userEvent.click(groupRow('Novice').getByRole('radio', { name: 'Green' }))
    // Red is free now, but Advanced stays orange.
    expect(groupRow('Advanced').getByText('Advanced')).toHaveClass('bg-runorange-500')
  })

  it('lists the groups the sessions name, below the schedule, with colors picked from their names', async () => {
    open(`#/edit-schedule/${blank.id}`)
    fireEvent.change(await editor(), { target: { value: '## Saturday | 2099-10-03\n08:00 session 1 | track: Instructors, Novice, Blue | class: novice\n' } })

    const section = screen.getByRole('region', { name: 'Run groups' })
    expect(within(section).getAllByRole('listitem').map(li => li.getAttribute('aria-label'))).toEqual(['Instructors', 'Novice', 'Blue'])
    // The schedule comes first on the page, the groups after it.
    expect(screen.getByRole('textbox', { name: 'Schedule' }).compareDocumentPosition(section) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(groupRow('Instructors').getByText('Instructors')).toHaveClass('bg-zinc-900')
    expect(groupRow('Blue').getByText('Blue')).toHaveClass('bg-runblue-500')
    // No color in its name: the first one nobody else has.
    expect(groupRow('Novice').getByText('Novice')).toHaveClass('bg-runred-500')
  })

  it('lets a picked color be changed, and a description added, and saves them', async () => {
    open(`#/edit-schedule/${blank.id}`)
    fireEvent.change(await editor(), { target: { value: SCHEDULE.replace('track: Red', 'track: Red, Novice') } })

    const novice = groupRow('Novice')
    expect(novice.queryByRole('radio')).not.toBeInTheDocument()
    await userEvent.click(novice.getByRole('button', { name: 'Novice' }))
    expect(novice.getByRole('radio', { name: 'Orange' })).toBeChecked()
    await userEvent.click(novice.getByRole('radio', { name: 'Green' }))
    expect(novice.getByText('Novice')).toHaveClass('bg-rungreen-500')
    // Other groups keep theirs.
    expect(groupRow('Red').getByText('Red')).toHaveClass('bg-runred-500')
    await userEvent.type(novice.getByRole('textbox', { name: 'Novice description' }), 'First timers')
    // Closed, the row shows its description next to the chip.
    await userEvent.click(novice.getByRole('button', { name: /^Novice/ }))
    expect(novice.queryByRole('textbox')).not.toBeInTheDocument()
    expect(novice.getByText('First timers')).toBeInTheDocument()

    // Retyping the sessions keeps what was set for the group.
    fireEvent.change(await editor(), { target: { value: SCHEDULE.replace('track: Red', 'track: novice, Red') } })
    expect(groupRow('Novice').getByText('Novice')).toHaveClass('bg-rungreen-500')

    await userEvent.click(saveButton())
    const put = fetchMock.mock.calls.find(([, init]) => init?.method === 'PUT')!
    expect(JSON.parse(put[1]!.body as string).runGroups).toEqual([
      { label: 'Novice', bgClass: 'bg-rungreen-500', description: 'First timers' },
      { label: 'Red', bgClass: 'bg-runred-500' },
    ])
    await waitFor(() => expect(window.location.hash).toBe(`#/event/${blank.id}`))
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

  it('previews a multi-day event with the event page’s day tabs', async () => {
    const twoDay: EventConfig = { ...blank, days: [...blank.days, { id: 'sunday', label: 'Sunday', date: '2099-10-04', activities: [] }] }
    fetchMock.mockImplementation(async (url: string) =>
      String(url).includes('/.netlify/identity/settings')
        ? new Response('{}', { headers: { 'Content-Type': 'application/json' } })
        : new Response(JSON.stringify({ events: [twoDay] }), { headers: { 'Content-Type': 'application/json' } }),
    )
    try {
      open(`#/edit-schedule/${blank.id}`)
      fireEvent.change(await editor(), { target: { value: `${SCHEDULE}\n## Sunday | 2099-10-04\n09:00 general | Sunday briefing\n` } })
      await userEvent.click(screen.getByRole('tab', { name: 'Preview' }))

      expect(screen.getByText('Drivers meeting')).toBeInTheDocument()
      expect(screen.queryByText('Sunday briefing')).not.toBeInTheDocument()
      await userEvent.click(screen.getByRole('button', { name: 'Sunday' }))
      expect(screen.getByText('Sunday briefing')).toBeInTheDocument()
      expect(screen.queryByText('Drivers meeting')).not.toBeInTheDocument()
      // Not today, so Now has nowhere to go.
      expect(screen.getByRole('button', { name: 'Now' })).toBeDisabled()
    } finally {
      fetchMock.mockImplementation(defaultFetch)
    }
  })

  it('saves the groups and the markdown, then shows the event with its new schedule', async () => {
    open(`#/edit-schedule/${blank.id}`)
    fireEvent.change(await editor(), { target: { value: SCHEDULE } })
    await userEvent.click(saveButton())

    const put = fetchMock.mock.calls.find(([, init]) => init?.method === 'PUT')!
    expect(put[0]).toBe(`/api/events?id=${blank.id}`)
    expect(JSON.parse(put[1]!.body as string)).toEqual({
      runGroups: [{ label: 'Red', bgClass: 'bg-runred-500' }],
      schedule: SCHEDULE,
    })
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

  it('keeps unsaved changes — groups and schedule — if you leave, and offers to discard them', async () => {
    open(`#/edit-schedule/${blank.id}`)
    fireEvent.change(await editor(), { target: { value: SCHEDULE } })
    cleanup()

    open(`#/edit-schedule/${blank.id}`)
    expect((await editor()).value).toBe(SCHEDULE)
    expect(groupRow('Red').getByText('Red')).toBeInTheDocument()
    expect(screen.getByText('Your unsaved changes are back.')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Discard' }))
    expect((await editor()).value).toContain('// 7:00 AM general')
    expect(screen.queryByRole('listitem', { name: 'Red' })).not.toBeInTheDocument()
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
