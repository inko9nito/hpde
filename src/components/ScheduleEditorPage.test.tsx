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
// Identity, as far as renewing the sign-in goes — the way gotrue-js does
// it: the access token is renewed when it's (nearly) expired, with a
// refresh token that works once. `renewalFails` refuses every renewal (a
// revoked sign-in).
const HOUR = 3_600_000
let renewalFails = false
let acceptedRefresh = 'r1'
let startToken = { access_token: 'token', refresh_token: 'r1', expires_at: Date.now() + HOUR }
const handlers: Record<string, (u: unknown) => void> = {}
const currentUser = () => ({
  id: 'u', email: 'v@example.com', app_metadata: { roles },
  token: { ...startToken } as { access_token: string; refresh_token: string; expires_at: number } | null,
  async jwt() {
    if (renewalFails) throw new Error('invalid_grant: Invalid Refresh Token')
    const t = this.token!
    if (t.expires_at - 60_000 > Date.now()) return t.access_token
    if (t.refresh_token !== acceptedRefresh) throw new Error('invalid_grant: Invalid Refresh Token')
    acceptedRefresh = `${t.refresh_token}+`
    this.token = { access_token: 'renewed', refresh_token: acceptedRefresh, expires_at: Date.now() + HOUR }
    return this.token.access_token
  },
})
window.netlifyIdentity = {
  init: () => handlers.init?.(currentUser()),
  on: (e: string, cb: (u: unknown) => void) => { handlers[e] = cb },
  open() {}, close() {}, logout() {}, currentUser,
} as unknown as NonNullable<typeof window.netlifyIdentity>

// The events function, as far as these tests need it: the PUT answers the
// way the real one does, from the same parser — unless a test refuses it.
let refusePut: string | null = null
let putThrows = false
const defaultFetch = async (url: string, init?: RequestInit) => {
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
  if (String(url).includes('/.netlify/identity/settings')) return json({})
  if (String(url).includes('api/events')) {
    if (init?.method === 'PUT') {
      if (refusePut) return json({ error: refusePut }, 403)
      if (putThrows) throw new TypeError('Load failed')
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
    putThrows = false
    renewalFails = false
    acceptedRefresh = 'r1'
    startToken = { access_token: 'token', refresh_token: 'r1', expires_at: Date.now() + HOUR }
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

  it('renews an expired sign-in quietly, with the refresh token another copy of the site saved', async () => {
    // This page's refresh token (r1) was spent by another tab, which saved
    // the renewed sign-in (r2) — itself expired by now.
    startToken = { access_token: 'old', refresh_token: 'r1', expires_at: Date.now() - HOUR }
    acceptedRefresh = 'r2'
    localStorage.setItem('gotrue.user', JSON.stringify({
      id: 'u', token: { access_token: 'stale', refresh_token: 'r2', expires_at: Date.now() - 1000 },
    }))
    open(`#/edit-schedule/${blank.id}`)
    fireEvent.change(await editor(), { target: { value: SCHEDULE } })
    await userEvent.click(saveButton())

    await waitFor(() => expect(window.location.hash).toBe(`#/event/${blank.id}`))
    const put = fetchMock.mock.calls.find(([, init]) => init?.method === 'PUT')!
    expect((put[1]!.headers as Headers).get('Authorization')).toBe('Bearer renewed')
    expect(screen.queryByText('You’ve been signed out')).not.toBeInTheDocument()
  })

  it('finds out a sign-in has lapsed when the app comes back to the front, not at save', async () => {
    open(`#/edit-schedule/${blank.id}`)
    fireEvent.change(await editor(), { target: { value: SCHEDULE } })
    renewalFails = true
    document.dispatchEvent(new Event('visibilitychange'))
    expect(await screen.findByRole('alert')).toHaveTextContent('You’ve been signed out')
    expect(JSON.parse(localStorage.getItem(`hpde:scheduleDraft:${blank.id}`)!).text).toBe(SCHEDULE)
  })

  it('says so when the sign-in has lapsed, and keeps the changes for after signing back in', async () => {
    open(`#/edit-schedule/${blank.id}`)
    fireEvent.change(await editor(), { target: { value: SCHEDULE } })
    renewalFails = true
    await userEvent.click(saveButton())

    // Not "couldn't reach the server": retrying could never work.
    const notice = await screen.findByRole('alert')
    expect(notice).toHaveTextContent('You’ve been signed out')
    expect(notice).toHaveTextContent('Your changes are kept on this device.')
    expect(within(notice).getByRole('button', { name: 'Sign in' })).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ method: 'PUT' }))
    expect(JSON.parse(localStorage.getItem(`hpde:scheduleDraft:${blank.id}`)!).text).toBe(SCHEDULE)
  })

  it('says when the server can’t be reached, with the browser’s reason', async () => {
    putThrows = true
    open(`#/edit-schedule/${blank.id}`)
    fireEvent.change(await editor(), { target: { value: SCHEDULE } })
    await userEvent.click(saveButton())
    expect(await screen.findByRole('alert')).toHaveTextContent('Couldn’t reach the server. Check your connection and try again. (Load failed)')
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
