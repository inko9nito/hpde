import { userFromRequest, jsonResponse as json } from '../lib/auth.mjs'
import { DEFAULT_MODEL, checkImage, claudeReader, gatewayFrom, noGateway } from '../lib/screenshotRead.mts'
import type { Gateway, Image, ReadResult } from '../lib/screenshotRead.mts'
import {
  MAX_NAME, MAX_NOTES, NEXT_GROUPS, TDE_CARDS, TDE_GROUP_NAMES, cardForGroup, cleanEventEvaluation,
} from '../../src/utils/evaluation.ts'
import type { CardId, EventEvaluation, NextGroupId } from '../../src/utils/evaluation.ts'

// Reads an instructor's report card off a screenshot (#483) — The Drivers
// Edge's "GREEN Run Group Student Evaluation", say, as it's emailed — for
// the Instructor evaluation sheet on My notes, which fills its form in with
// it for the driver to check before anything is saved. A long card can take
// more than one screenshot: they're read together, as one card. Nothing is
// kept here. It's read by Claude, through Netlify's AI Gateway
// (netlify/lib/screenshotRead.mts); the site can pick another model with
// EVALUATION_IMPORT_MODEL.
//   POST {images: [{mediaType, data}, …]}   each image base64-encoded, 1 to MAX_IMAGES
//     200 {read: EventEvaluation}   with `card` always, when the card's run group is one the app has a card for
//     422 {error}  not a report card, or nothing could be read off it
//     503 {error}  no AI Gateway (or key) on the site
// Signed-in drivers only: each read costs a little.
//
// TypeScript (.mts) so it can share the checks in src/; Netlify bundles it
// with esbuild (see netlify/lib/functionsLoad.test.ts).
export const config = { path: '/api/evaluation-import' }

/** Screenshots of one card, at most. */
export const MAX_IMAGES = 3

// Every skill the app's cards have, by id — the same id on each card for a
// skill both have, roughly (#350) — in each card's own words.
const SKILL_IDS = [...new Set(TDE_CARDS.flatMap(c => c.skills.map(s => s.id)))]
const SKILL_LIST = TDE_CARDS.map(c =>
  `  ${c.group}'s card:\n${c.skills.map(s => `    - ${s.id}: "${s.label}"`).join('\n')}`).join('\n')

const SYSTEM = `You read screenshots of a driving instructor's evaluation of a student, for a track-day driver's logbook. The screenshots show one evaluation form: The Drivers Edge's run group student evaluation, or one like it. Transcribe what it shows; never work out, estimate or guess a value it doesn't show.`

const INSTRUCTIONS = `Read this student evaluation. If there's more than one screenshot, they're parts of the same form, in any order, and may overlap.

- is_evaluation: false if this isn't an instructor's evaluation of a student driver; the rest can then be empty.
- card_group: the run group in the form's title, as written ("GREEN Run Group Student Evaluation" is "GREEN"); "" if it names none.
- instructor: the instructor's name, as written; "".
- car: the car's make and model, as written; "".
- instructed: "full_time" or "part_time" if the form says how the instructor rode with the student; "".
- esc_tc: the ESP / traction control setting, as written ("Comp Mode", "On"); "".
- skills: one per core skill the form scores, with its percentage as a whole number. Match each to one of these ids by its words; leave out any that matches none:
${SKILL_LIST}
- aggressiveness: the answer to "Aggressiveness = Skill": "yes", "no" or "too_aggressive"; "" if none.
- car_aids: the answer to "Car Aids OVER Activated" or "Relies on car aids", as written ("25%", "Never"); "".
- next: the recommended run groups, each as {group, how, or_group}; empty strings for one the form doesn't answer.
  - same_track: "Recommended Run Group (THIS TRACK, SAME DIRECTION)".
  - new_direction: "Next Recommended Run Group (THIS TRACK NEW DIRECTION)".
  - new_track: "Next Recommended Run Group (NEW TRACK)".
  - group: the run group's name alone ("Blue"); how: "full_time_instructor", "part_time_solo" or "solo" if the answer says how ("Blue Part-time Solo"), else ""; or_group: a second group the answer offers instead ("… or Yellow"), else "".
- solo_qualified: the answer to whether they're qualified to run part-time solo: "yes", "no" or "".
- notes: the instructor's notes, word for word. Join lines the screen wrapped; keep the writer's own paragraph breaks.`

const STRING = { type: 'string' }
const oneOf = (...values: string[]) => ({ type: 'string', enum: [...values, ''] })
const NEXT_LINE = {
  type: 'object',
  properties: { group: STRING, how: oneOf('full_time_instructor', 'part_time_solo', 'solo'), or_group: STRING },
  required: ['group', 'how', 'or_group'],
  additionalProperties: false,
}

const SCHEMA = {
  type: 'object',
  properties: {
    is_evaluation: { type: 'boolean' },
    card_group: STRING,
    instructor: STRING,
    car: STRING,
    instructed: oneOf('full_time', 'part_time'),
    esc_tc: STRING,
    skills: {
      type: 'array',
      items: {
        type: 'object',
        properties: { id: { type: 'string', enum: SKILL_IDS }, score: { type: 'integer' } },
        required: ['id', 'score'],
        additionalProperties: false,
      },
    },
    aggressiveness: oneOf('yes', 'no', 'too_aggressive'),
    car_aids: STRING,
    next: {
      type: 'object',
      properties: { same_track: NEXT_LINE, new_direction: NEXT_LINE, new_track: NEXT_LINE },
      required: ['same_track', 'new_direction', 'new_track'],
      additionalProperties: false,
    },
    solo_qualified: oneOf('yes', 'no'),
    notes: STRING,
  },
  required: ['is_evaluation', 'card_group', 'instructor', 'car', 'instructed', 'esc_tc', 'skills', 'aggressiveness', 'car_aids', 'next', 'solo_qualified', 'notes'],
  additionalProperties: false,
}

type NextLine = { group: string; how: string; or_group: string }

/** What the model answers, before it's checked. */
export interface ModelRead {
  is_evaluation: boolean
  card_group: string
  instructor: string
  car: string
  instructed: string
  esc_tc: string
  skills: { id: string; score: number }[]
  aggressiveness: string
  car_aids: string
  next: Record<'same_track' | 'new_direction' | 'new_track', NextLine>
  solo_qualified: string
  notes: string
}

const LINES: Record<NextGroupId, keyof ModelRead['next']> = { sameTrack: 'same_track', newDirection: 'new_direction', newTrack: 'new_track' }
const HOW = { full_time_instructor: 'fullTime', part_time_solo: 'partTime', solo: 'solo' } as const
const YES_NO = { yes: true, no: false } as const

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max).trim() : '')

/** A run group's name as the app writes it: "BLUE" is "Blue"; one it doesn't know, as written. */
export function groupName(text: unknown): string {
  const t = str(text, MAX_NAME)
  return TDE_GROUP_NAMES.find(n => n.toLowerCase() === t.toLowerCase()) ?? t
}

/** "25%", "25", "Never": the car aids percentage; undefined if it's none of those. */
export function carAidsPct(text: unknown): number | undefined {
  const t = str(text, 20)
  if (/^never$/i.test(t)) return 0
  const m = /^(\d{1,3})\s*%?$/.exec(t)
  return m && Number(m[1]) <= 100 ? Number(m[1]) : undefined
}

/**
 * What the model read, as the app keeps an evaluation: on the card for the
 * run group in its title, if the app has one (else Green's), with only what
 * that card has (cleanEventEvaluation) — or null if there's nothing.
 */
export function evaluationFromRead(answer: ModelRead): { card?: CardId; evaluation: EventEvaluation } | null {
  const card = cardForGroup(str(answer.card_group, MAX_NAME))
  const next: Partial<Record<NextGroupId, string>> = {}
  const nextHow: Partial<Record<NextGroupId, string>> = {}
  const nextOr: Partial<Record<NextGroupId, string>> = {}
  for (const { id } of NEXT_GROUPS) {
    const line = answer.next?.[LINES[id]]
    const group = groupName(line?.group)
    if (!group) continue
    next[id] = group
    const how = HOW[line.how as keyof typeof HOW]
    if (how) nextHow[id] = how
    const or = groupName(line.or_group)
    if (or) nextOr[id] = or
  }
  const skills: Record<string, number> = {}
  for (const { id, score } of Array.isArray(answer.skills) ? answer.skills : []) {
    if (SKILL_IDS.includes(id) && Number.isInteger(score) && score >= 0 && score <= 100) skills[id] = score
  }
  const raw = {
    card: card?.id,
    instructor: str(answer.instructor, MAX_NAME),
    car: str(answer.car, MAX_NAME),
    escTc: str(answer.esc_tc, MAX_NAME),
    instructed: ({ full_time: 'fullTime', part_time: 'partTime' } as Record<string, string>)[answer.instructed],
    next,
    nextHow,
    nextOr,
    skills,
    // "Too aggressive" on a card without it: unanswered, not the whole card refused.
    aggressivenessIsSkill: answer.aggressiveness === 'too_aggressive'
      ? (card?.has.tooAggressive ? 'tooAggressive' : undefined)
      : YES_NO[answer.aggressiveness as keyof typeof YES_NO],
    carAidsPct: carAidsPct(answer.car_aids),
    soloQualified: YES_NO[answer.solo_qualified as keyof typeof YES_NO],
    notes: str(answer.notes, MAX_NOTES),
  }
  const cleaned = cleanEventEvaluation(raw)
  if (!('value' in cleaned)) return null
  // Green's card is left unsaid when it's saved; here it's said, so the form switches to it.
  return { card: card?.id, evaluation: cleaned.value }
}

type Read = (images: Image[]) => Promise<ReadResult<ModelRead>>

type Deps = {
  fetch?: typeof fetch
  /** Stands in for Claude in tests. */
  read?: Read
  /** Stands in for process.env, in tests. */
  env?: Record<string, string | undefined>
}

export default async function handler(req: Request, _context: unknown, deps: Deps = {}) {
  if (req.method !== 'POST') return json(405, { error: 'Method not allowed.' })

  const user = await userFromRequest(req, deps.fetch)
  if (!user) return json(401, { error: 'Please sign in to continue.' })

  let body
  try {
    body = await req.json()
  } catch {
    return json(400, { error: 'Request body must be JSON.' })
  }
  const sent = body?.images
  if (!Array.isArray(sent) || sent.length === 0) return json(400, { error: 'Send a screenshot of the evaluation.' })
  if (sent.length > MAX_IMAGES) return json(400, { error: `Send at most ${MAX_IMAGES} screenshots of one evaluation.` })
  const images: Image[] = []
  for (const image of sent) {
    const checked = checkImage(image)
    if ('error' in checked) return checked.error
    images.push(checked.image)
  }

  // The AI Gateway gives the function its key.
  const env = deps.env ?? process.env
  const gateway = gatewayFrom(env)
  const read = deps.read ?? (gateway ? evaluationReader(env.EVALUATION_IMPORT_MODEL || DEFAULT_MODEL, gateway) : undefined)
  if (!read) return noGateway(env, 'evaluation-import')

  const result = await read(images)
  if (!result.ok) return json(result.status, { error: result.error })
  if (!result.answer || result.answer.is_evaluation === false) {
    return json(422, { error: 'This doesn’t look like an instructor’s evaluation.' })
  }
  const found = evaluationFromRead(result.answer)
  if (!found) return json(422, { error: 'Couldn’t read anything off this evaluation.' })
  return json(200, { read: { ...(found.card ? { card: found.card } : {}), ...found.evaluation } })
}

/** Claude, reading one evaluation's screenshots together. */
function evaluationReader(model: string, gateway: Gateway): Read {
  return claudeReader<ModelRead>({
    model,
    gateway,
    system: SYSTEM,
    instructions: INSTRUCTIONS,
    schema: SCHEMA,
    tag: 'evaluation-import',
    unreadable: 'Couldn’t read this evaluation.',
  })
}
