// An instructor's evaluation of a driver (#340), kept with the driver's own
// notes for an event. Two kinds, at any event:
//   - a session's feedback: what the instructor said after that session,
//     and who they were;
//   - the whole event's: who they were and their notes — on a TDE event,
//     The Drivers Edge's report card, which adds the run group they
//     recommend next and a score for each core skill.
// What's read and checked here is shared by the app (the forms) and the
// notes function (which checks what it's sent before saving).
import type { EventConfig } from '../types'

/** A session's instructor feedback. */
export interface SessionEvaluation {
  feedback: string
  instructor?: string
}

/** One session's notes: for now, its instructor evaluation. */
export interface SessionNotes {
  /** `${date} ${time} ${group}` — the same key as the session's laps (sessionKey). */
  key: string
  date: string
  time: string
  group: string
  sessionNumber?: number
  evaluation: SessionEvaluation
  updatedAt?: string
  /** Who saved them, when it wasn't the driver: an admin's email (#288). */
  loggedBy?: string
}

/**
 * The Drivers Edge's core skills, as their report card lists them — and a
 * word for each, where there's only room for one (the skills wheel, #345).
 */
export const TDE_SKILLS = [
  { id: 'flags', label: 'Calls out all flags', short: 'Flags' },
  { id: 'passing', label: 'Clean passing & signals', short: 'Passing' },
  { id: 'inputs', label: 'Smooth inputs (brake, steering, gas, shift)', short: 'Inputs' },
  { id: 'vision', label: 'Looks ahead', short: 'Vision' },
  { id: 'consistency', label: 'Consistency', short: 'Consistency' },
  { id: 'carControl', label: 'Car control', short: 'Car control' },
  { id: 'pace', label: 'Pace with group', short: 'Pace' },
  { id: 'references', label: 'Uses reference points', short: 'References' },
  { id: 'awareness', label: 'Track location awareness', short: 'Awareness' },
] as const

export type TdeSkillId = typeof TDE_SKILLS[number]['id']

/** Where the report card recommends the driver run next: a run group's name for each. */
export const NEXT_GROUPS = [
  { id: 'sameTrack', label: 'Same track & direction' },
  { id: 'newDirection', label: 'New direction' },
  { id: 'newTrack', label: 'New track' },
] as const

export type NextGroupId = typeof NEXT_GROUPS[number]['id']

/**
 * The instructor's evaluation of the whole event: who they were and their
 * notes — and on a TDE event, the rest of The Drivers Edge's report card.
 * Every field is optional: fill in what the card has. The run group they
 * drove in isn't here: it's the event's (their answer to "Did you drive?",
 * or their laps').
 */
export interface EventEvaluation {
  instructor?: string
  car?: string
  next?: Partial<Record<NextGroupId, string>>
  /** Each core skill's score, a percentage. */
  skills?: Partial<Record<TdeSkillId, number>>
  /** "Aggressiveness = skill": the instructor's yes or no. */
  aggressivenessIsSkill?: boolean
  /** How often the car's aids stepped in, a percentage. */
  carAidsPct?: number
  notes?: string
  updatedAt?: string
  loggedBy?: string
}

/**
 * Run by The Drivers Edge (#340): their events get the report card. Some
 * events have no organizer set; their names start with "TDE".
 */
export function isTdeEvent(event: Pick<EventConfig, 'name' | 'organizer'>): boolean {
  return /driver'?s'?\s*edge/i.test(event.organizer ?? '') || /^TDE\b/.test(event.name)
}

/** The run groups a report card can recommend, beyond the event's own — in the palette's order. */
export const TDE_GROUP_NAMES = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Pink', 'Purple']

export const MAX_FEEDBACK = 2000
export const MAX_NOTES = 4000
export const MAX_NAME = 80

type Cleaned<T> = { value: T } | { error: string }

function text(v: unknown, max: number, what: string): Cleaned<string | undefined> {
  if (v === undefined || v === null) return { value: undefined }
  if (typeof v !== 'string') return { error: `${what} must be text.` }
  const t = v.trim()
  if (t.length > max) return { error: `${what} is too long (at most ${max} characters).` }
  return { value: t || undefined }
}

function percent(v: unknown, what: string): Cleaned<number | undefined> {
  if (v === undefined || v === null || v === '') return { value: undefined }
  if (typeof v !== 'number' || !Number.isFinite(v) || v < 0 || v > 100) return { error: `${what} must be a percentage, 0 to 100.` }
  return { value: Math.round(v) }
}

/** A session's evaluation as sent: feedback required, instructor optional. */
export function cleanSessionEvaluation(raw: unknown): Cleaned<SessionEvaluation> {
  const r = (raw ?? {}) as Record<string, unknown>
  const feedback = text(r.feedback, MAX_FEEDBACK, 'Feedback')
  if ('error' in feedback) return feedback
  if (!feedback.value) return { error: 'Add the instructor’s feedback.' }
  const instructor = text(r.instructor, MAX_NAME, 'The instructor’s name')
  if ('error' in instructor) return instructor
  return { value: { feedback: feedback.value, ...(instructor.value ? { instructor: instructor.value } : {}) } }
}

/** A report card as sent: only what's filled in is kept, and it must have something. */
export function cleanEventEvaluation(raw: unknown): Cleaned<EventEvaluation> {
  const r = (raw ?? {}) as Record<string, unknown>
  const out: EventEvaluation = {}
  for (const [field, max, what] of [
    ['instructor', MAX_NAME, 'The instructor’s name'],
    ['car', MAX_NAME, 'The car'],
    ['notes', MAX_NOTES, 'The instructor’s notes'],
  ] as const) {
    const t = text(r[field], max, what)
    if ('error' in t) return t
    if (t.value) out[field] = t.value
  }
  const next: Partial<Record<NextGroupId, string>> = {}
  for (const { id, label } of NEXT_GROUPS) {
    const t = text((r.next as Record<string, unknown> | undefined)?.[id], MAX_NAME, label)
    if ('error' in t) return t
    if (t.value) next[id] = t.value
  }
  if (Object.keys(next).length) out.next = next
  const skills: Partial<Record<TdeSkillId, number>> = {}
  for (const { id, label } of TDE_SKILLS) {
    const p = percent((r.skills as Record<string, unknown> | undefined)?.[id], label)
    if ('error' in p) return p
    if (p.value !== undefined) skills[id] = p.value
  }
  if (Object.keys(skills).length) out.skills = skills
  if (r.aggressivenessIsSkill !== undefined && r.aggressivenessIsSkill !== null) {
    if (typeof r.aggressivenessIsSkill !== 'boolean') return { error: 'Aggressiveness = skill must be yes or no.' }
    out.aggressivenessIsSkill = r.aggressivenessIsSkill
  }
  const aids = percent(r.carAidsPct, 'Car aids over activated')
  if ('error' in aids) return aids
  if (aids.value !== undefined) out.carAidsPct = aids.value
  if (Object.keys(out).length === 0) return { error: 'Fill in some of the report card first.' }
  return { value: out }
}
