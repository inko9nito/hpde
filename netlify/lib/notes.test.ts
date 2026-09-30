import { describe, it, expect, beforeEach } from 'vitest'
import handler from '../functions/notes.mts'
import { fakeBlobs } from './fakeBlobs'

const blobs = fakeBlobs()
const store = blobs.data('site:notes')

// Identity's user ids are UUIDs; an admin names a driver by theirs.
const JASON = '5b0f2c1e-8d3a-4f6b-9c2d-7e1a0b3c4d5e'

// Stands in for Netlify Identity's /user endpoint: one token per user.
const identityUsers: Record<string, unknown> = {
  'vera-token': { id: 'vera', email: 'vera@example.com' },
  'jason-token': { id: JASON, email: 'jason@example.com' },
  'admin-token': { id: 'amy', email: 'amy@example.com', app_metadata: { roles: ['admin'] } },
}
const fakeFetch = async (url: URL, init: { headers: Record<string, string> }) => {
  expect(String(url)).toBe('https://site.example/.netlify/identity/user')
  const u = identityUsers[init.headers.Authorization.replace('Bearer ', '')]
  return u ? new Response(JSON.stringify(u)) : new Response('{}', { status: 401 })
}

// Stands in for Identity's admin API (#288): Jason is the only other user.
const identity = {
  getUser: async (id: string) => {
    if (id === JASON) return { id: JASON, email: 'jason@example.com', name: 'Jason' }
    throw Object.assign(new Error('User not found'), { status: 404 })
  },
  listUsers: async () => [],
}

const EVENT = '2026-09-11_msrc-1-7'

const call = (
  method: string,
  { token, body, query = `?event=${EVENT}`, context = {} }: { token?: string; body?: unknown; query?: string; context?: unknown } = {},
) =>
  handler(
    new Request(`https://site.example/api/notes${query}`, {
      method,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      ...(body !== undefined ? { body: typeof body === 'string' ? body : JSON.stringify(body) } : {}),
    }),
    context,
    { getStore: blobs.getStore, getDeployStore: blobs.getDeployStore, fetch: fakeFetch, identity } as never,
  )

const session2 = {
  date: '2026-09-12', time: '10:25', group: 'pink', sessionNumber: 2,
  evaluation: { feedback: 'Unwind the wheel sooner.', instructor: 'John Harms' },
}
const session1 = { date: '2026-09-12', time: '08:30', group: 'pink', sessionNumber: 1, evaluation: { feedback: 'Eyes up.' } }
const reportCard = {
  instructor: 'John Harms',
  car: 'Porsche Panamera',
  next: { sameTrack: 'Blue', newDirection: 'Green', newTrack: 'Green' },
  skills: { flags: 65, passing: 95 },
  aggressivenessIsSkill: true,
  carAidsPct: 25,
  notes: 'Very smooth.',
}

const notesOf = async (token: string, query?: string) => (await (await call('GET', { token, query })).json())

describe('notes function (#340)', () => {
  beforeEach(() => blobs.clear())

  it('needs a sign-in for everything', async () => {
    expect((await call('GET')).status).toBe(401)
    expect((await call('GET', { token: 'forged' })).status).toBe(401)
    expect((await call('PUT', { body: { session: session1 } })).status).toBe(401)
    expect((await call('DELETE', { query: `?event=${EVENT}&session=x` })).status).toBe(401)
    expect(store.size).toBe(0)
  })

  it('starts with no notes', async () => {
    expect(await notesOf('vera-token')).toEqual({ sessions: [] })
  })

  it('saves a session’s evaluation, keyed as its laps are, and lists them in schedule order', async () => {
    const res = await call('PUT', { token: 'vera-token', body: { session: session2 } })
    expect(res.status).toBe(200)
    const { session } = await res.json()
    expect(session).toMatchObject({ key: '2026-09-12 10:25 pink', sessionNumber: 2, evaluation: session2.evaluation })
    expect(session.updatedAt).toBeTruthy()
    await call('PUT', { token: 'vera-token', body: { session: session1 } })
    const { sessions } = await notesOf('vera-token')
    expect(sessions.map((s: { key: string }) => s.key)).toEqual(['2026-09-12 08:30 pink', '2026-09-12 10:25 pink'])
    expect([...store.keys()]).toEqual([`vera/${EVENT}`])
  })

  it('replaces a session’s evaluation when it’s saved again', async () => {
    await call('PUT', { token: 'vera-token', body: { session: session2 } })
    await call('PUT', { token: 'vera-token', body: { session: { ...session2, evaluation: { feedback: 'Later turn-in.' } } } })
    const { sessions } = await notesOf('vera-token')
    expect(sessions).toHaveLength(1)
    expect(sessions[0].evaluation).toEqual({ feedback: 'Later turn-in.' })
  })

  it('saves a report card for the whole event, keeping only what’s filled in', async () => {
    const res = await call('PUT', { token: 'vera-token', body: { evaluation: { ...reportCard, car: '  ', skills: { flags: 65, passing: 95, vision: undefined } } } })
    expect(res.status).toBe(200)
    const { evaluation } = await notesOf('vera-token')
    const { car: _car, ...rest } = reportCard
    expect(evaluation).toMatchObject(rest)
    expect(evaluation).not.toHaveProperty('car')
    expect(Object.keys(evaluation.skills)).toEqual(['flags', 'passing'])
  })

  it('keeps the report card and the sessions’ evaluations side by side', async () => {
    await call('PUT', { token: 'vera-token', body: { evaluation: reportCard } })
    await call('PUT', { token: 'vera-token', body: { session: session2 } })
    const notes = await notesOf('vera-token')
    expect(notes.evaluation.instructor).toBe('John Harms')
    expect(notes.sessions).toHaveLength(1)
  })

  it('removes a session’s evaluation, or the report card, and the record with the last of them', async () => {
    await call('PUT', { token: 'vera-token', body: { evaluation: reportCard } })
    await call('PUT', { token: 'vera-token', body: { session: session2 } })
    expect((await call('DELETE', { token: 'vera-token', query: `?event=${EVENT}&session=${encodeURIComponent('2026-09-12 10:25 pink')}` })).status).toBe(200)
    expect((await notesOf('vera-token')).sessions).toEqual([])
    expect(store.size).toBe(1)
    expect((await call('DELETE', { token: 'vera-token', query: `?event=${EVENT}&evaluation=1` })).status).toBe(200)
    expect(await notesOf('vera-token')).toEqual({ sessions: [] })
    expect(store.size).toBe(0)
    expect((await call('DELETE', { token: 'vera-token', query: `?event=${EVENT}&evaluation=1` })).status).toBe(404)
    expect((await call('DELETE', { token: 'vera-token', query: `?event=${EVENT}&session=nope` })).status).toBe(404)
  })

  it('lists every event’s notes, with no event named (#345)', async () => {
    expect(await notesOf('vera-token', '')).toEqual({ events: [] })
    await call('PUT', { token: 'vera-token', body: { evaluation: reportCard } })
    await call('PUT', { token: 'vera-token', body: { session: session2 } })
    await call('PUT', { token: 'vera-token', query: '?event=2025-09-13_tde', body: { session: session1 } })
    await call('PUT', { token: 'jason-token', query: '?event=2025-07-19_tde', body: { session: session1 } })
    const { events } = await notesOf('vera-token', '')
    expect(events.map((e: { eventId: string }) => e.eventId).sort()).toEqual(['2025-09-13_tde', EVENT])
    const mine = events.find((e: { eventId: string }) => e.eventId === EVENT)
    expect(mine.evaluation.skills).toEqual(reportCard.skills)
    expect(mine.sessions.map((s: { key: string }) => s.key)).toEqual(['2026-09-12 10:25 pink'])
    expect(events.find((e: { eventId: string }) => e.eventId === '2025-09-13_tde')).not.toHaveProperty('evaluation')
    // An admin's list of a driver's, and only with their own sign-in otherwise.
    expect((await notesOf('admin-token', `?driver=${JASON}`)).events.map((e: { eventId: string }) => e.eventId)).toEqual(['2025-07-19_tde'])
    expect((await call('GET', { token: 'jason-token', query: '?driver=vera' })).status).toBe(403)
    expect((await call('GET', { query: '' })).status).toBe(401)
  })

  it('keeps each driver’s notes to themselves', async () => {
    await call('PUT', { token: 'vera-token', body: { session: session2 } })
    expect((await notesOf('jason-token')).sessions).toEqual([])
    // Naming another driver takes an admin.
    expect((await call('GET', { token: 'jason-token', query: `?event=${EVENT}&driver=vera` })).status).toBe(403)
  })

  it('lets an admin save a driver’s evaluation as theirs, recording who saved it (#288)', async () => {
    const res = await call('PUT', { token: 'admin-token', query: `?event=${EVENT}&driver=${JASON}`, body: { session: session2 } })
    expect(res.status).toBe(200)
    expect((await res.json()).session.loggedBy).toBe('amy@example.com')
    expect((await notesOf('jason-token')).sessions).toHaveLength(1)
    expect((await notesOf('admin-token')).sessions).toEqual([])
    expect((await call('GET', { token: 'admin-token', query: `?event=${EVENT}&driver=00000000-0000-4000-8000-000000000000` })).status).toBe(404)
  })

  it('refuses what isn’t an evaluation, and a missing or odd event id', async () => {
    const bad = async (body: unknown, query?: string) => (await call('PUT', { token: 'vera-token', body, query })).status
    expect(await bad({ session: { ...session2, evaluation: { feedback: '  ' } } })).toBe(400)
    expect(await bad({ session: { ...session2, evaluation: { feedback: 'x'.repeat(2001) } } })).toBe(400)
    expect(await bad({ session: { ...session2, time: '10:25 AM' } })).toBe(400)
    expect(await bad({ session: { ...session2, group: '../x' } })).toBe(400)
    expect(await bad({ evaluation: {} })).toBe(400)
    expect(await bad({ evaluation: { skills: { flags: 120 } } })).toBe(400)
    expect(await bad({ evaluation: { aggressivenessIsSkill: 'yes' } })).toBe(400)
    expect(await bad('not json')).toBe(400)
    expect(await bad({ session: session2 }, '?event=../../x')).toBe(400)
    expect(await bad({ session: session2 }, '')).toBe(400)
    expect(store.size).toBe(0)
  })

  it('on a deploy preview, starts from a copy of the driver’s live notes, and never changes the live ones', async () => {
    await call('PUT', { token: 'vera-token', body: { session: session2 } })
    const preview = { deploy: { context: 'deploy-preview' } }
    const res = await call('GET', { token: 'vera-token', context: preview })
    expect((await res.json()).sessions).toHaveLength(1)
    await call('PUT', { token: 'vera-token', context: preview, body: { session: session1 } })
    await call('DELETE', { token: 'vera-token', context: preview, query: `?event=${EVENT}&session=${encodeURIComponent('2026-09-12 10:25 pink')}` })
    // The live notes are as they were; the preview's has its own.
    expect((await notesOf('vera-token')).sessions.map((s: { key: string }) => s.key)).toEqual(['2026-09-12 10:25 pink'])
    const previewNotes = await (await call('GET', { token: 'vera-token', context: preview })).json()
    expect(previewNotes.sessions.map((s: { key: string }) => s.key)).toEqual(['2026-09-12 08:30 pink'])
  })
})
