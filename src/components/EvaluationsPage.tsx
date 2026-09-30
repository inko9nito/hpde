import { useEffect, useMemo, useRef } from 'react'
import { ChevronRight, ClipboardCheck, Plus } from 'lucide-react'
import { SubPageHeader } from './HomeTabs'
import { SignInPrompt } from './SignInPrompt'
import { GroupBadge } from './GroupBadge'
import { groupFor } from './LapTimesSheet'
import { CARD_FRAME, CARD_SHELL } from './LandingPage'
import { DateBlock } from './DateBlock'
import { PrivateTag, sessionTitle, useSkeletonFade } from './LapSessions'
import { SkillOverview, SkillsWheel, scoredCards } from './ReportCardSkills'
import type { ReportCardPoint } from './ReportCardSkills'
import { useAuth } from '../auth/AuthContext'
import { useAllNotes } from '../data/notesLog'
import type { EventNotes } from '../data/notesLog'
import { useRsvps } from '../data/RsvpsContext'
import { isTdeEvent } from '../utils/evaluation'
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
            {event.organizer && <span className="truncate text-sm text-gray-500">{event.organizer}</span>}
          </div>
        </div>
        <ChevronRight size={16} className="shrink-0 text-gray-300" aria-hidden="true" />
      </a>
      {notes ? (
      <ul className="flex flex-col gap-3 border-t border-gray-100 px-4 py-3" aria-label="Feedback">
        {/* The whole event's: who the instructor was, and their notes (on a TDE event, the report card's). */}
        {evaluation && <Feedback label={evaluation.instructor ?? 'Instructor'} text={evaluation.notes} />}
        {notes.sessions.map(s => (
          <Feedback
            key={s.key}
            label={`${sessionTitle(s)} · ${multiDay ? `${weekday(s.date)} ` : ''}${formatTime(s.time)} ${formatAmPm(s.time)}`}
            instructor={s.evaluation.instructor}
            text={s.evaluation.feedback}
          />
        ))}
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
 * skills wheel. Private: it needs a sign-in.
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
  const cards = useMemo(() => reportCards(evaluated), [evaluated])
  const scored = scoredCards(cards).cards.length
  // Every event on the list, newest first: the ones evaluated, and the ones they went to without one yet.
  const entries = useMemo(() => {
    const withLaps = new Set((lapSummary ?? []).map(e => e.eventId))
    const rest = unevaluatedEvents(events, rsvps, withLaps, new Set(evaluated.map(e => e.event.id)))
    return [...evaluated, ...rest.map(event => ({ event, notes: null }))]
      .sort((a, b) => startDate(b.event).localeCompare(startDate(a.event)))
  }, [evaluated, events, rsvps, lapSummary])

  const loading = authStatus === 'signed-in' && (notes.status === 'loading' || !eventsLoaded || rsvpsStatus === 'loading')
  const leaving = useSkeletonFade(loading)

  let body
  if (authStatus !== 'signed-in') {
    body = <SignInPrompt reason="see your instructor evaluations" privacyNote={false} />
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
    body = (
      <div className="fade-in">
        <div className="mb-3 flex min-h-[20px] items-center justify-end px-1 text-xs text-gray-500">
          <PrivateTag what="evaluations" />
        </div>
        {scored > 0 && (
          <div className="mb-8 flex flex-col gap-4">
            <SkillOverview points={cards} />
            <SkillsWheel points={cards} />
          </div>
        )}
        <section aria-labelledby="evaluations-events-heading">
          <h2 id="evaluations-events-heading" className="mb-2 font-rubik text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
            Events
          </h2>
          <ul className="space-y-3">
            {entries.map(({ event, notes }) => (
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
