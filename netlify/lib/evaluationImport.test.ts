import { describe, it, expect, vi } from 'vitest'
import handler, { MAX_IMAGES, carAidsPct, evaluationFromRead, groupName } from '../functions/evaluation-import.mts'
import type { ModelRead } from '../functions/evaluation-import.mts'

// Stands in for Netlify Identity's /user endpoint.
const fakeFetch = async (_url: URL, init: { headers: Record<string, string> }) =>
  init.headers.Authorization === 'Bearer vera-token'
    ? new Response(JSON.stringify({ id: 'vera', email: 'vera@example.com' }))
    : new Response('{}', { status: 401 })

const IMAGE = { mediaType: 'image/jpeg', data: 'aGVsbG8=' }
const none = { group: '', how: '', or_group: '' }

// What the model answers for the sample Green report card (#483).
const ANSWER: ModelRead = {
  is_evaluation: true,
  card_group: 'GREEN',
  instructor: 'John Harms',
  car: 'Porsche Panamerica',
  instructed: '',
  esc_tc: '',
  skills: [
    { id: 'flags', score: 65 },
    { id: 'passing', score: 95 },
    { id: 'inputs', score: 95 },
    { id: 'vision', score: 80 },
    { id: 'consistency', score: 80 },
    { id: 'carControl', score: 95 },
    { id: 'pace', score: 95 },
    { id: 'references', score: 95 },
    { id: 'awareness', score: 95 },
  ],
  aggressiveness: 'yes',
  car_aids: '25%',
  next: {
    same_track: { group: 'Blue', how: '', or_group: '' },
    new_direction: { group: 'Green', how: '', or_group: '' },
    new_track: { group: 'Green', how: '', or_group: '' },
  },
  solo_qualified: '',
  notes: 'Worked on braking successfully. Overall, very smooth and got faster as the day went on.',
}

const call = (
  { token = 'vera-token', body = { images: [IMAGE] } as unknown, method = 'POST', read }:
  { token?: string; body?: unknown; method?: string; read?: unknown } = {},
) =>
  handler(
    new Request('https://site.example/api/evaluation-import', {
      method,
      headers: { Authorization: `Bearer ${token}` },
      ...(method === 'POST' ? { body: typeof body === 'string' ? body : JSON.stringify(body) } : {}),
    }),
    {},
    { fetch: fakeFetch, env: { ANTHROPIC_API_KEY: 'key' }, read: read ?? (async () => ({ ok: true, answer: ANSWER })) } as never,
  )

describe('evaluation-import function (#483)', () => {
  it('reads a report card: its card, instructor, car, recommended groups, skills and notes', async () => {
    const read = vi.fn(async () => ({ ok: true, answer: ANSWER }))
    const res = await call({ read, body: { images: [IMAGE, IMAGE] } })
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      read: {
        card: 'green',
        instructor: 'John Harms',
        car: 'Porsche Panamerica',
        next: { sameTrack: 'Blue', newDirection: 'Green', newTrack: 'Green' },
        skills: { flags: 65, passing: 95, inputs: 95, vision: 80, consistency: 80, carControl: 95, pace: 95, references: 95, awareness: 95 },
        aggressivenessIsSkill: true,
        carAidsPct: 25,
        notes: 'Worked on braking successfully. Overall, very smooth and got faster as the day went on.',
      },
    })
    // Every screenshot, read together.
    expect(read).toHaveBeenCalledWith([IMAGE, IMAGE])
  })

  it('says so when it isn’t an evaluation, or nothing can be read off it', async () => {
    let res = await call({ read: async () => ({ ok: true, answer: { ...ANSWER, is_evaluation: false } }) })
    expect(res.status).toBe(422)
    const empty: ModelRead = {
      ...ANSWER, card_group: '', instructor: '', car: '', skills: [], aggressiveness: '', car_aids: '', notes: '',
      next: { same_track: none, new_direction: none, new_track: none },
    }
    res = await call({ read: async () => ({ ok: true, answer: empty }) })
    expect(res.status).toBe(422)
    res = await call({ read: async () => ({ ok: false, status: 504, error: 'Claude took too long to read the screenshot. Try again.' }) })
    expect(res.status).toBe(504)
  })

  it('needs a sign-in, a POST, and one to three images', async () => {
    const read = vi.fn()
    expect((await call({ token: 'nobody', read })).status).toBe(401)
    expect((await call({ method: 'GET', read })).status).toBe(405)
    expect((await call({ body: 'not json', read })).status).toBe(400)
    expect((await call({ body: { images: [] }, read })).status).toBe(400)
    expect((await call({ body: { image: IMAGE }, read })).status).toBe(400)
    expect((await call({ body: { images: Array(MAX_IMAGES + 1).fill(IMAGE) }, read })).status).toBe(400)
    expect((await call({ body: { images: [IMAGE, { ...IMAGE, mediaType: 'image/heic' }] }, read })).status).toBe(400)
    expect((await call({ body: { images: [{ ...IMAGE, data: 'not base64!' }] }, read })).status).toBe(400)
    expect(read).not.toHaveBeenCalled()
  })

  it('says it isn’t set up without the AI Gateway', async () => {
    const errors = vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = await handler(
      new Request('https://site.example/api/evaluation-import', { method: 'POST', headers: { Authorization: 'Bearer vera-token' }, body: JSON.stringify({ images: [IMAGE] }) }),
      {},
      { fetch: fakeFetch as never, env: {} },
    )
    expect(res.status).toBe(503)
    expect((await res.json()).error).toMatch(/needs Netlify’s AI Gateway/)
    errors.mockRestore()
  })
})

describe('evaluationFromRead', () => {
  it('puts a Blue (or Purple) card on Blue’s, with how they’d run and a second group', () => {
    const blue: ModelRead = {
      ...ANSWER,
      card_group: 'PURPLE',
      instructed: 'part_time',
      esc_tc: 'Comp Mode',
      skills: [{ id: 'exits', score: 70 }, { id: 'vision', score: 80 }],
      aggressiveness: 'too_aggressive',
      car_aids: 'Never',
      next: { same_track: { group: 'BLUE', how: 'part_time_solo', or_group: 'yellow' }, new_direction: none, new_track: none },
      solo_qualified: 'no',
    }
    expect(evaluationFromRead(blue)).toEqual({
      card: 'blue',
      evaluation: {
        card: 'blue',
        instructor: 'John Harms',
        instructed: 'partTime',
        car: 'Porsche Panamerica',
        escTc: 'Comp Mode',
        next: { sameTrack: 'Blue' },
        nextHow: { sameTrack: 'partTime' },
        nextOr: { sameTrack: 'Yellow' },
        // Blue's card has no "Looks ahead".
        skills: { exits: 70 },
        aggressivenessIsSkill: 'tooAggressive',
        carAidsPct: 0,
        soloQualified: false,
        notes: ANSWER.notes,
      },
    })
  })

  it('keeps only what Green’s card has, on a card it doesn’t know', () => {
    const read = evaluationFromRead({ ...ANSWER, card_group: 'YELLOW', instructed: 'full_time', aggressiveness: 'too_aggressive', skills: [{ id: 'flags', score: 140 }] })!
    expect(read.card).toBeUndefined()
    expect(read.evaluation).not.toHaveProperty('instructed')
    expect(read.evaluation).not.toHaveProperty('aggressivenessIsSkill')
    expect(read.evaluation).not.toHaveProperty('skills')
  })

  it('cuts text to what the form takes, rather than refusing it', () => {
    const read = evaluationFromRead({ ...ANSWER, notes: 'x'.repeat(5000), instructor: 'y'.repeat(100) })!
    expect(read.evaluation.notes).toHaveLength(4000)
    expect(read.evaluation.instructor).toHaveLength(80)
  })
})

describe('groupName and carAidsPct', () => {
  it('writes a run group as the app does', () => {
    expect(groupName(' BLUE ')).toBe('Blue')
    expect(groupName('Advanced')).toBe('Advanced')
    expect(groupName(undefined)).toBe('')
  })

  it('reads the car aids percentage', () => {
    expect(carAidsPct('25%')).toBe(25)
    expect(carAidsPct('25 %')).toBe(25)
    expect(carAidsPct('never')).toBe(0)
    expect(carAidsPct('')).toBeUndefined()
    expect(carAidsPct('lots')).toBeUndefined()
    expect(carAidsPct('250%')).toBeUndefined()
  })
})
