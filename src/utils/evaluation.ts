// An instructor's evaluation of a driver (#340), kept with the driver's own
// notes for an event. Two kinds, at any event:
//   - a session's feedback: what the instructor said after that session,
//     and who they were;
//   - the whole event's: who they were and their notes — on a TDE event,
//     The Drivers Edge's report card, which adds the run group they
//     recommend next and a score for each core skill. Each run group has a
//     card of its own (#350), with its own skills and fields: TDE_CARDS.
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

/** A core skill on a report card: its words there, and a word for it where there's only room for one (the skills wheel, #345). */
export interface TdeSkill {
  id: string
  label: string
  short: string
}

export type CardId = 'green' | 'blue'

/**
 * One run group's report card (#350). Each has its own core skills, in its
 * own words and order — a skill both have, roughly, has the same id on
 * each, so a score carries over when the form switches cards — and some
 * have fields the others don't (`has`).
 */
export interface TdeCard {
  id: CardId
  /** The run group whose card it is. */
  group: string
  skills: readonly TdeSkill[]
  /** What it calls the percentage of the time the car's aids stepped in. */
  carAidsLabel: string
  has: {
    /** Instructed: full-time or part-time. */
    instructed?: boolean
    /** The ESP / traction control setting they ran. */
    escTc?: boolean
    /** Qualified to run solo part-time in the card's group. */
    soloQualified?: boolean
    /** "Aggressiveness = skill" can be "Too aggressive". */
    tooAggressive?: boolean
    /** The car aids percentage can be "Never": 0%. */
    carAidsNever?: boolean
    /** A recommended run group says how — "Blue Full-time Instructor" — and can be one of two: "… or Yellow". */
    nextHow?: boolean
  }
}

/**
 * The cards the app knows (#350): Green's, which it started with (#340),
 * and Blue's ("BLUE Run Group Student Evaluation", from Jason's). No other
 * group's yet; until there is, a driver in one picks whichever matches
 * their paper card.
 */
export const TDE_CARDS: readonly TdeCard[] = [
  {
    id: 'green',
    group: 'Green',
    skills: [
      { id: 'flags', label: 'Calls out all flags', short: 'Flags' },
      { id: 'passing', label: 'Clean passing & signals', short: 'Passing' },
      { id: 'inputs', label: 'Smooth inputs (brake, steering, gas, shift)', short: 'Inputs' },
      { id: 'vision', label: 'Looks ahead', short: 'Vision' },
      { id: 'consistency', label: 'Consistency', short: 'Consistency' },
      { id: 'carControl', label: 'Car control', short: 'Car control' },
      { id: 'pace', label: 'Pace with group', short: 'Pace' },
      { id: 'references', label: 'Uses reference points', short: 'References' },
      { id: 'awareness', label: 'Track location awareness', short: 'Awareness' },
    ],
    carAidsLabel: 'Car aids over activated',
    has: {},
  },
  {
    id: 'blue',
    group: 'Blue',
    skills: [
      { id: 'flags', label: 'Acknowledges all flags early', short: 'Flags' },
      { id: 'passing', label: 'Proper passing & traffic management', short: 'Passing' },
      { id: 'inputs', label: 'Smooth inputs & corrections (brake, steering, gas, shift)', short: 'Inputs' },
      { id: 'references', label: 'Uses reference points & scans track', short: 'References' },
      { id: 'consistency', label: 'Consistent & appropriate line', short: 'Line' },
      { id: 'carControl', label: 'Car control & slide control', short: 'Car control' },
      { id: 'exits', label: 'Understands and uses exit strategies', short: 'Exits' },
      { id: 'carAids', label: 'Knows and corrects with car aids on/off', short: 'Car aids' },
      { id: 'pace', label: 'Pace with group', short: 'Pace' },
      { id: 'offline', label: 'Able to take a corner offline', short: 'Offline' },
    ],
    carAidsLabel: 'Relies on car aids',
    has: { instructed: true, escTc: true, soloQualified: true, tooAggressive: true, carAidsNever: true, nextHow: true },
  },
]

/** A card by its id; with none (every evaluation from before #350), Green's. */
export function cardById(id: string | undefined): TdeCard {
  return TDE_CARDS.find(c => c.id === id) ?? TDE_CARDS[0]
}

/** The card an evaluation was entered on. */
export function cardOf(evaluation: Pick<EventEvaluation, 'card'>): TdeCard {
  return cardById(evaluation.card)
}

/** The card for a run group by its name ("Blue", "Blue PT Solo"), if the app has that group's. */
export function cardForGroup(name: string | null | undefined): TdeCard | undefined {
  if (!name) return undefined
  return TDE_CARDS.find(c => new RegExp(`\\b${c.group}\\b`, 'i').test(name))
}

/** Where the report card recommends the driver run next: a run group's name for each. */
export const NEXT_GROUPS = [
  { id: 'sameTrack', label: 'Same track & direction' },
  { id: 'newDirection', label: 'New direction' },
  { id: 'newTrack', label: 'New track' },
] as const

export type NextGroupId = typeof NEXT_GROUPS[number]['id']

/** How the card recommends they run in the group (#350): "Blue Full-time Instructor". */
export const NEXT_HOW = [
  { id: 'fullTime', label: 'Full-time instructor' },
  { id: 'partTime', label: 'Part-time solo' },
  { id: 'solo', label: 'Solo' },
] as const

export type NextHow = typeof NEXT_HOW[number]['id']

/** Whether the instructor rode with them all day, or part of it (#350). */
export const INSTRUCTED = [
  { id: 'fullTime', label: 'Full-time' },
  { id: 'partTime', label: 'Part-time' },
] as const

export type Instructed = typeof INSTRUCTED[number]['id']

/** The car aids percentage as the card says it: "Never", on a card that says so, for 0%. */
export function carAidsText(pct: number, card: TdeCard): string {
  return pct === 0 && card.has.carAidsNever ? 'Never' : `${pct}%`
}

/** What "Aggressiveness = skill" says: yes, no — or on some cards, too aggressive. */
export function aggressivenessText(v: boolean | 'tooAggressive'): string {
  return v === 'tooAggressive' ? 'Too aggressive' : v ? 'Yes' : 'No'
}

/**
 * The instructor's evaluation of the whole event: who they were and their
 * notes — and on a TDE event, the rest of The Drivers Edge's report card:
 * the card it was entered on, and what that card has. Every field is
 * optional: fill in what the card has. The run group they drove in isn't
 * here: it's the event's (their answer to "Did you drive?", or their laps').
 */
export interface EventEvaluation {
  /** The report card it was entered on (#350); none: Green's, as every one before was. */
  card?: CardId
  instructor?: string
  /** Blue: whether the instructor rode with them all day, or part of it. */
  instructed?: Instructed
  car?: string
  /** Blue: the ESP / traction control setting they ran ("Comp Mode", "On"). */
  escTc?: string
  /** The run group recommended next, by its name, for each. */
  next?: Partial<Record<NextGroupId, string>>
  /** Blue: how they'd run in it (#350) — kept apart from `next`, which an app from before reads as names. */
  nextHow?: Partial<Record<NextGroupId, NextHow>>
  /** Blue: another group the card recommends instead: "Blue Part-time Solo or Yellow". */
  nextOr?: Partial<Record<NextGroupId, string>>
  /** Each of the card's core skills' score, a percentage. */
  skills?: Partial<Record<string, number>>
  /** "Aggressiveness = skill": yes or no — or on Blue's card, too aggressive. */
  aggressivenessIsSkill?: boolean | 'tooAggressive'
  /** How often the car's aids stepped in, a percentage: on Blue's card, how much they rely on them (0: never). */
  carAidsPct?: number
  /** Blue: qualified to run solo part-time in Blue. */
  soloQualified?: boolean
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

/**
 * A report card as sent: only what's filled in is kept — and only what its
 * card has (#350) — and it must have something.
 */
export function cleanEventEvaluation(raw: unknown): Cleaned<EventEvaluation> {
  const r = (raw ?? {}) as Record<string, unknown>
  if (r.card !== undefined && r.card !== null && !TDE_CARDS.some(c => c.id === r.card)) return { error: 'Unknown report card.' }
  const card = cardById(r.card as string | undefined)
  const out: EventEvaluation = {}
  for (const [field, max, what] of [
    ['instructor', MAX_NAME, 'The instructor’s name'],
    ['car', MAX_NAME, 'The car'],
    ['notes', MAX_NOTES, 'The instructor’s notes'],
    ...(card.has.escTc ? [['escTc', MAX_NAME, 'ESP / traction control']] as const : []),
  ] as const) {
    const t = text(r[field], max, what)
    if ('error' in t) return t
    if (t.value) out[field] = t.value
  }
  if (card.has.instructed) {
    const v = r.instructed
    if (v !== undefined && v !== null) {
      if (!INSTRUCTED.some(i => i.id === v)) return { error: 'Instructed must be full-time or part-time.' }
      out.instructed = v as Instructed
    }
  }

  const next: Partial<Record<NextGroupId, string>> = {}
  const nextHow: Partial<Record<NextGroupId, NextHow>> = {}
  const nextOr: Partial<Record<NextGroupId, string>> = {}
  for (const { id, label } of NEXT_GROUPS) {
    const t = text((r.next as Record<string, unknown> | undefined)?.[id], MAX_NAME, label)
    if ('error' in t) return t
    if (!t.value) continue
    next[id] = t.value
    if (!card.has.nextHow) continue
    // How, and another group instead, only go with a group.
    const how = (r.nextHow as Record<string, unknown> | undefined)?.[id]
    if (how !== undefined && how !== null && how !== '') {
      if (!NEXT_HOW.some(h => h.id === how)) return { error: `${label}: say how they’d run in it.` }
      nextHow[id] = how as NextHow
    }
    const or = text((r.nextOr as Record<string, unknown> | undefined)?.[id], MAX_NAME, label)
    if ('error' in or) return or
    if (or.value) nextOr[id] = or.value
  }
  if (Object.keys(next).length) out.next = next
  if (Object.keys(nextHow).length) out.nextHow = nextHow
  if (Object.keys(nextOr).length) out.nextOr = nextOr

  const skills: Partial<Record<string, number>> = {}
  for (const { id, label } of card.skills) {
    const p = percent((r.skills as Record<string, unknown> | undefined)?.[id], label)
    if ('error' in p) return p
    if (p.value !== undefined) skills[id] = p.value
  }
  if (Object.keys(skills).length) out.skills = skills

  const aggr = r.aggressivenessIsSkill
  if (aggr !== undefined && aggr !== null) {
    if (typeof aggr !== 'boolean' && !(card.has.tooAggressive && aggr === 'tooAggressive')) {
      return { error: card.has.tooAggressive ? 'Aggressiveness = skill must be yes, no or too aggressive.' : 'Aggressiveness = skill must be yes or no.' }
    }
    out.aggressivenessIsSkill = aggr
  }
  const aids = percent(r.carAidsPct, card.carAidsLabel)
  if ('error' in aids) return aids
  if (aids.value !== undefined) out.carAidsPct = aids.value
  if (card.has.soloQualified && r.soloQualified !== undefined && r.soloQualified !== null) {
    if (typeof r.soloQualified !== 'boolean') return { error: 'Part-time solo qualified must be yes or no.' }
    out.soloQualified = r.soloQualified
  }
  if (Object.keys(out).length === 0) return { error: 'Fill in some of the report card first.' }
  // Green's is the card when none is said, as before #350.
  return { value: card.id === 'green' ? out : { card: card.id, ...out } }
}
