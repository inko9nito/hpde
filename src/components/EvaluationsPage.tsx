import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronRight, ClipboardCheck, Plus } from 'lucide-react'
import { SubPageHeader } from './HomeTabs'
import { SignInPrompt } from './SignInPrompt'
import { GroupBadge } from './GroupBadge'
import { groupFor } from './LapTimesSheet'
import { CARD_FRAME, CARD_SHELL } from './EventCard'
import { DateBlock } from './DateBlock'
import { sessionTitle, useSkeletonFade } from './LapSessions'
import { ReportCardGroup, scoredCards } from './ReportCardSkills'
import type { ReportCardPoint } from './ReportCardSkills'
import { FilterMenu } from './FilterMenu'
import type { FilterOption } from './FilterMenu'
import { groupNamed } from './EventEvaluationCard'
import { useAuth } from '../auth/AuthContext'
import { useAllNotes } from '../data/notesLog'
import type { EventNotes } from '../data/notesLog'
import { useRsvps } from '../data/RsvpsContext'
import { TDE_CARDS, TDE_GROUP_NAMES, cardOf, isTdeEvent } from '../utils/evaluation'
import type { CardId, TdeCard } from '../utils/evaluation'
import { answerFor, myRunGroup } from '../utils/rsvp'
import type { Rsvps } from '../utils/rsvp'
import { classifyEvent } from '../utils/eventClass'
import { useLapSummary } from '../data/lapLog'
import { startDate } from '../utils/trackStats'
import { opensElsewhere } from '../utils/links'
import { formatAmPm, formatTime, todayLocalISO } from '../utils/time'
import type { EventConfig } from '../types'

const weekday = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short' })

/** One event's evaluations, and the event. */
interface Evaluated {
  event: EventConfig
  notes: EventNotes
}

/**
 * The events a driver has an instructor's evaluation at — of the whole
 * event, or of a session — newest first. Notes for an event that's gone
 * are left out.
 */
export function evaluatedEvents(notes: EventNotes[], events: EventConfig[]): Evaluated[] {
  const byId = new Map(events.map(e => [e.id, e]))
  return notes
    .filter(n => n.evaluation || n.sessions.length)
    .flatMap(n => {
      const event = byId.get(n.eventId)
      return event ? [{ event, notes: n }] : []
    })
    .sort((a, b) => startDate(b.event).localeCompare(startDate(a.event)))
}

/**
 * The events they went to that have no evaluation yet (#345), to add one
 * to: begun, and either they said they were going (for a past event, that
 * they drove it) or they've laps there. Newest first.
 */
export function unevaluatedEvents(
  events: EventConfig[],
  rsvps: Rsvps,
  withLaps: ReadonlySet<string>,
  evaluated: ReadonlySet<string>,
  today: string = todayLocalISO(),
): EventConfig[] {
  return events
    .filter(e => e.days.length > 0 && classifyEvent(e, today) !== 'upcoming' && !evaluated.has(e.id))
    .filter(e => withLaps.has(e.id) || answerFor(e, rsvps, today) === 'going')
    .sort((a, b) => startDate(b).localeCompare(startDate(a)))
}

/** The TDE events' report cards, for the chart. */
export function reportCards(evaluated: Evaluated[]): ReportCardPoint[] {
  return evaluated.flatMap(({ event, notes }) =>
    notes.evaluation && isTdeEvent(event)
      ? [{ key: event.id, date: startDate(event), title: event.name, evaluation: notes.evaluation }]
      : [])
}

/**
 * The kinds of report card they have scores on (#350) — each run group's
 * card has its own skills, so its own overview and wheel — the one with
 * the newest scored card first.
 */
export function reportCardKinds(points: ReportCardPoint[]): TdeCard[] {
  const newest = (kind: TdeCard) => scoredCards(points, kind).cards.at(-1)?.date ?? ''
  return TDE_CARDS
    .filter(kind => scoredCards(points, kind).cards.length > 0)
    .sort((a, b) => newest(b).localeCompare(newest(a)))
}

/** One event on the page: its evaluations, or null for one they went to without any yet. */
export interface Entry {
  event: EventConfig
  notes: EventNotes | null
}

/**
 * What the page's events — and so its report cards — are filtered by
 * (#401): an organizer, then one of its run groups. A run group is the
 * organizer's own — Blue is TDE's second level, but SCCA's first — so it's
 * only picked with an organizer.
 */
export interface Filters {
  /** An organizer, as organizerOf names it; null: every one. */
  organizer: string | null
  /** One of the organizer's run groups, by its name lowercased; null: every one. */
  group: string | null
}

export const NO_FILTERS: Filters = { organizer: null, group: null }

export const TDE_ORGANIZER = 'The Drivers Edge'

/** Who ran an event, by one name for each: every TDE event's is The Drivers Edge, however it's spelled, or none; '' for none set. */
export function organizerOf(event: Pick<EventConfig, 'name' | 'organizer'>): string {
  return isTdeEvent(event) ? TDE_ORGANIZER : event.organizer?.trim() ?? ''
}

/** The report card an event's evaluation was entered on, if it's a TDE event's and has one. */
function reportCardOf({ event, notes }: Entry) {
  const evaluation = notes?.evaluation
  if (!evaluation || !isTdeEvent(event)) return undefined
  return evaluation.card || Object.keys(evaluation.skills ?? {}).length ? cardOf(evaluation) : undefined
}

/**
 * The run groups they were in at an event, by name: the ones of the
 * sessions they have notes on, or else the one they said they're in — and
 * the one whose report card the instructor filled in.
 */
export function entryGroups(entry: Entry, rsvps: Rsvps): string[] {
  const { event, notes } = entry
  const ids = notes?.sessions.length ? notes.sessions.map(s => s.group) : [myRunGroup(event, rsvps[event.id])].flatMap(id => id ? [id] : [])
  const names = ids.map(id => groupFor(id, event.runGroups).label)
  const card = reportCardOf(entry)
  if (card) names.push(card.group)
  const byKey = new Map(names.map(n => [n.trim().toLowerCase(), n.trim()]))
  return [...byKey.values()]
}

const groupOrder = (name: string) => {
  const i = TDE_GROUP_NAMES.findIndex(n => n.toLowerCase() === name.toLowerCase())
  return i === -1 ? TDE_GROUP_NAMES.length : i
}

/**
 * What each filter can pick (#401): every organizer of their events, A to
 * Z (none set last); and the run groups they were in at the picked
 * organizer's, in the palette's order — none with no organizer picked.
 */
export function filterChoices(entries: Entry[], rsvps: Rsvps, organizer: string | null): { organizers: string[]; groups: string[] } {
  const organizers = [...new Set(entries.map(e => organizerOf(e.event)))]
    .sort((a, b) => Number(!a) - Number(!b) || a.localeCompare(b))
  const groups = new Map<string, string>()
  for (const entry of entries) {
    if (organizer === null || organizerOf(entry.event) !== organizer) continue
    for (const name of entryGroups(entry, rsvps)) if (!groups.has(name.toLowerCase())) groups.set(name.toLowerCase(), name)
  }
  return {
    organizers,
    groups: [...groups.values()].sort((a, b) => groupOrder(a) - groupOrder(b) || a.localeCompare(b)),
  }
}

/** The events that pass the filters (#401); a run group only with its organizer. */
export function filterEntries(entries: Entry[], rsvps: Rsvps, { organizer, group }: Filters): Entry[] {
  return entries.filter(entry =>
    (organizer === null || organizerOf(entry.event) === organizer)
    && (organizer === null || group === null || entryGroups(entry, rsvps).some(n => n.toLowerCase() === group)))
}

/**
 * The run group picked at first (#401): the one of their newest report
 * card at the organizer's events (lowercased), so its card is the one
 * shown; none if they've no report card there, or no organizer's picked.
 */
export function newestCardGroup(entries: Entry[], rsvps: Rsvps, organizer: string | null): string | null {
  if (organizer === null) return null
  const points = shownReportCards(filterEntries(entries, rsvps, { organizer, group: null }), null)
  const kind = reportCardKinds(points)[0]
  return kind ? kind.group.toLowerCase() : null
}

/** The report cards of the events shown — with a run group picked, only that group's cards (#401). */
export function shownReportCards(entries: Entry[], group: string | null): ReportCardPoint[] {
  const points = reportCards(entries.flatMap(({ event, notes }) => notes ? [{ event, notes }] : []))
  return group === null ? points : points.filter(p => cardOf(p.evaluation).group.toLowerCase() === group)
}

/**
 * The card their newest TDE evaluation was entered on, but this event's
 * (#350) — the one a new evaluation's form starts on when the event's run
 * group has no card of its own.
 */
export function latestCard(notes: EventNotes[], events: EventConfig[], exceptId: string): CardId | undefined {
  const byId = new Map(events.map(e => [e.id, e]))
  const tde = notes.flatMap(n => {
    const event = byId.get(n.eventId)
    return n.evaluation && n.eventId !== exceptId && event && isTdeEvent(event) ? [{ date: startDate(event), card: cardOf(n.evaluation).id }] : []
  })
  return tde.sort((a, b) => b.date.localeCompare(a.date))[0]?.card
}

/** One piece of an instructor's feedback: what it's of, who said it, and what they said. */
function Feedback({ label, instructor, text }: {
  label: string
  instructor?: string
  /** What they said; none, and it says so. */
  text?: string
}) {
  return (
    <li className="min-w-0" data-feedback>
      <p className="flex min-w-0 flex-wrap items-center gap-x-1.5 text-xs">
        <span className="font-semibold text-gray-900">{label}</span>
        {instructor && <span className="text-gray-500">· {instructor}</span>}
      </p>
      {text
        ? <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-gray-900">{text}</p>
        : <p className="mt-1 text-sm text-gray-400">No notes.</p>}
    </li>
  )
}

/**
 * One event on the page, TDE or not: the date, name and run group, which
 * open the event on My notes; and under them, what the instructors said —
 * about the whole event (on a TDE event, the report card's notes) and each
 * session, in schedule order — so it can all be read here. An event they
 * went to with nothing yet has a button to add the instructor's evaluation.
 */
function EvaluationEventCard({ event, notes, runGroup, onOpen, onAdd }: {
  event: EventConfig
  /** Null: none yet. */
  notes: EventNotes | null
  /** The group they said they're in, for an event evaluated as a whole. */
  runGroup: string | null
  onOpen: () => void
  onAdd: () => void
}) {
  const groups = notes?.sessions.length ? [...new Set(notes.sessions.map(s => s.group))] : runGroup ? [runGroup] : []
  // With neither, the run group whose report card the instructor filled in (#401).
  const card = groups.length ? undefined : reportCardOf({ event, notes })
  const tde = isTdeEvent(event)
  const evaluation = notes?.evaluation
  const multiDay = event.days.length > 1
  return (
    <article aria-label={event.name} className={`${CARD_FRAME} overflow-hidden`}>
      <a
        href={`#/event/${encodeURIComponent(event.id)}`}
        onClick={e => {
          if (opensElsewhere(e)) return
          e.preventDefault()
          onOpen()
        }}
        className="flex items-center gap-4 p-4 transition-colors hover:bg-gray-50"
      >
        <DateBlock event={event} muted />
        <div className="min-w-0 flex-1">
          <div className="truncate font-rubik text-[15px] font-semibold leading-tight text-gray-900">{event.name}</div>
          <div className="mt-1 flex min-w-0 items-center gap-2">
            {groups.map(id => <GroupBadge key={id} group={groupFor(id, event.runGroups)} size="sm" />)}
            {card && <GroupBadge group={groupNamed(card.group, [event])} size="sm" />}
            {event.organizer && <span className="truncate text-sm text-gray-500">{event.organizer}</span>}
          </div>
        </div>
        <ChevronRight size={16} className="shrink-0 text-gray-300" aria-hidden="true" />
      </a>
      {notes ? (
      <ul className="flex flex-col gap-3 border-t border-gray-100 px-4 py-3" aria-label="Feedback">
        {/* The whole event's: who the instructor was, and their notes (on a TDE event, the report card's). */}
        {evaluation && <Feedback label={evaluation.instructor ?? 'Instructor'} text={evaluation.notes} />}
        {notes.sessions.flatMap(s => !s.evaluation ? [] : [(
          <Feedback
            key={s.key}
            label={`${sessionTitle(s)} · ${multiDay ? `${weekday(s.date)} ` : ''}${formatTime(s.time)} ${formatAmPm(s.time)}`}
            instructor={s.evaluation.instructor}
            text={s.evaluation.feedback}
          />
        )])}
      </ul>
      ) : (
        <button
          type="button"
          onClick={onAdd}
          className="flex w-full items-center gap-3 border-t border-gray-100 px-4 py-3 text-left transition-colors hover:bg-gray-50"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-dashed border-gray-300 text-gray-500">
            <Plus size={16} aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-gray-900">Add instructor evaluation</span>
            <span className="mt-0.5 block text-xs text-gray-500">
              {tde ? 'Your TDE report card: run groups, skills and notes' : 'What your instructor said about the event'}
            </span>
          </span>
        </button>
      )}
    </article>
  )
}

const HEADING = 'mb-2 font-rubik text-xs font-medium uppercase tracking-[0.15em] text-gray-500'

const bar = 'animate-pulse rounded bg-gray-100'

function EvaluationsSkeleton({ leaving }: { leaving: boolean }) {
  return (
    <div className={leaving ? 'fade-out' : 'fade-in'} aria-busy="true" aria-label="Loading your instructor evaluations">
      <div className="mb-8 space-y-4 rounded-2xl border border-gray-200 bg-white p-4">
        <div className={`h-3 w-1/3 ${bar}`} />
        {[0, 1, 2].map(i => (
          <div key={i} className="space-y-2">
            <div className={`h-3 w-1/2 ${bar}`} />
            <div className={`h-6 w-full ${bar}`} />
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {[0, 1].map(i => (
          <div key={i} className={CARD_SHELL}>
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-gray-100" />
            <div className="flex-1 space-y-2">
              <div className={`h-3.5 w-3/5 ${bar}`} />
              <div className={`h-3 w-2/5 ${bar}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface Props {
  /** Every event, to find the ones evaluated. */
  events: EventConfig[]
  eventsLoaded: boolean
  /** On top, not under an event opened from it: back on top, the evaluations are fetched again. */
  active: boolean
  onBack: () => void
  /** Opens one of the events on My notes, where its evaluations are. */
  onOpenEvent: (event: EventConfig) => void
  /** Opens one on My notes, with its evaluation's form open to fill in. */
  onAddEvaluation: (event: EventConfig) => void
}

/**
 * Instructor evaluations (#345), from the More tab: every event the driver
 * went to or has an evaluation at, newest first, with what the instructors
 * said (or a button to add it), under how their TDE report cards have come
 * along — the skills most improved and needing the most work, and the
 * skills wheel. Filters at the top (#401) narrow the events, and so the
 * report cards, by organizer and run group. It needs a sign-in.
 */
export function EvaluationsPage({ events, eventsLoaded, active, onBack, onOpenEvent, onAddEvaluation }: Props) {
  const { status: authStatus } = useAuth()
  const notes = useAllNotes(active)
  const { status: rsvpsStatus, rsvps } = useRsvps()
  // The events they've laps at, which they went to whatever they answered.
  const lapSummary = useLapSummary(active)

  // Back from an event opened from here, where its evaluations may have changed.
  const wasActive = useRef(active)
  const { reload } = notes
  useEffect(() => {
    if (active && !wasActive.current) reload()
    wasActive.current = active
  }, [active, reload])

  const evaluated = useMemo(() => evaluatedEvents(notes.events, events), [notes.events, events])
  // Every event on the list, newest first: the ones evaluated, and the ones they went to without one yet.
  const entries = useMemo((): Entry[] => {
    const withLaps = new Set((lapSummary ?? []).map(e => e.eventId))
    const rest = unevaluatedEvents(events, rsvps, withLaps, new Set(evaluated.map(e => e.event.id)))
    return [...evaluated, ...rest.map(event => ({ event, notes: null }))]
      .sort((a, b) => startDate(b.event).localeCompare(startDate(a.event)))
  }, [evaluated, events, rsvps, lapSummary])

  // The events by organizer, then one of its run groups (#401) — and so
  // the report cards: each run group's card shown has its own overview and
  // wheel (#350), the newest's first. Until they pick, the organizer and
  // run group of their newest report card (undefined till then): The
  // Drivers Edge's, the only ones with report cards.
  const [picked, setFilters] = useState<{ organizer?: string | null; group?: string | null }>({})
  const anyCards = useMemo(() => shownReportCards(entries, null).length > 0, [entries])
  const pickedOrganizer = picked.organizer === undefined ? (anyCards ? TDE_ORGANIZER : null) : picked.organizer
  const choices = useMemo(() => filterChoices(entries, rsvps, pickedOrganizer), [entries, rsvps, pickedOrganizer])
  const organizer = pickedOrganizer !== null && choices.organizers.includes(pickedOrganizer) ? pickedOrganizer : null
  const group = picked.group === undefined ? newestCardGroup(entries, rsvps, organizer) : picked.group
  // A pick no longer among the choices — say, a run group not at the organizer now picked — is all of them.
  const filters: Filters = {
    organizer,
    group: group !== null && choices.groups.some(g => g.toLowerCase() === group) ? group : null,
  }
  const shown = filterEntries(entries, rsvps, filters)
  const cards = shownReportCards(shown, filters.group)
  const kinds = reportCardKinds(cards)
  // The organizer's events, for its run groups' colors.
  const organizerEvents = organizer === null ? events : events.filter(e => organizerOf(e) === organizer)

  const loading = authStatus === 'signed-in' && (notes.status === 'loading' || !eventsLoaded || rsvpsStatus === 'loading')
  const leaving = useSkeletonFade(loading)

  let body
  if (authStatus !== 'signed-in') {
    body = <SignInPrompt reason="see your instructor evaluations" />
  } else if (loading || leaving) {
    body = <EvaluationsSkeleton leaving={leaving} />
  } else if (notes.status === 'error') {
    body = (
      <div className="fade-in rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
        <p className="text-sm font-medium text-gray-700">Couldn’t load your instructor evaluations</p>
        <p className="mt-1 text-xs text-gray-400">Check your connection and try again.</p>
        <button
          onClick={notes.reload}
          className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Try again
        </button>
      </div>
    )
  } else if (entries.length === 0) {
    body = (
      <div className="fade-in rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
        <ClipboardCheck size={20} className="mx-auto text-gray-400" aria-hidden="true" />
        <p className="mt-2 text-sm font-medium text-gray-700">No instructor evaluations yet</p>
      </div>
    )
  } else {
    const organizerOptions: FilterOption[] = [
      { id: null, text: 'All organizers' },
      ...choices.organizers.map(o => ({ id: o, text: o || 'Organizer not set' })),
    ]
    const groupOptions: FilterOption[] = [
      { id: null, text: 'All run groups' },
      ...choices.groups.map(g => ({ id: g.toLowerCase(), text: g, content: <GroupBadge group={groupNamed(g, organizerEvents)} size="sm" /> })),
    ]
    body = (
      <div className="fade-in">
        <div role="group" aria-label="Filter events" className="mb-6 flex min-w-0 gap-2">
          <FilterMenu label="Organizer" options={organizerOptions} value={filters.organizer} onChange={o => setFilters({ organizer: o })} />
          {/* An organizer's own run groups: none to pick till there's an organizer. */}
          <FilterMenu
            label="Run group"
            options={groupOptions}
            value={filters.group}
            onChange={g => setFilters({ ...filters, group: g })}
            disabled={organizer === null}
          />
        </div>
        {/* Whose report cards, then which run group's, then its two views of them. */}
        {kinds.length > 0 && (
          <section aria-labelledby="evaluations-cards-heading" className="mb-8">
            <h2 id="evaluations-cards-heading" className={HEADING}>{TDE_ORGANIZER} report cards</h2>
            <div className="flex flex-col gap-4">
              {kinds.map(kind => (
                <ReportCardGroup key={kind.id} points={cards} kind={kind} group={groupNamed(kind.group, events.filter(e => organizerOf(e) === TDE_ORGANIZER))} />
              ))}
            </div>
          </section>
        )}
        <section aria-labelledby="evaluations-events-heading">
          <h2 id="evaluations-events-heading" className={HEADING}>
            Events
          </h2>
          <ul className="space-y-3">
            {shown.map(({ event, notes }) => (
              <li key={event.id}>
                <EvaluationEventCard
                  event={event}
                  notes={notes}
                  runGroup={myRunGroup(event, rsvps[event.id])}
                  onOpen={() => onOpenEvent(event)}
                  onAdd={() => onAddEvaluation(event)}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SubPageHeader title="Instructor evaluations" onBack={onBack} />
      <div className="mx-auto max-w-lg px-3 pt-4 sm:px-4 sm:pt-6 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        {body}
      </div>
    </div>
  )
}
