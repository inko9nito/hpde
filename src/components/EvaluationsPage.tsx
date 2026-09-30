import { useEffect, useMemo, useRef } from 'react'
import { ChevronRight, ClipboardCheck } from 'lucide-react'
import { SubPageHeader } from './HomeTabs'
import { SignInPrompt } from './SignInPrompt'
import { GroupBadge } from './GroupBadge'
import { groupFor } from './LapTimesSheet'
import { CARD_SHELL } from './LandingPage'
import { DateBlock } from './DateBlock'
import { PrivateTag, plural, useSkeletonFade } from './LapSessions'
import { SkillTrends, scoredCards } from './SkillTrends'
import type { ReportCardPoint } from './SkillTrends'
import { useAuth } from '../auth/AuthContext'
import { useAllNotes } from '../data/notesLog'
import type { EventNotes } from '../data/notesLog'
import { useRsvps } from '../data/RsvpsContext'
import { isTdeEvent } from '../utils/evaluation'
import { myRunGroup } from '../utils/rsvp'
import { startDate } from '../utils/trackStats'
import { opensElsewhere } from '../utils/links'
import type { EventConfig } from '../types'

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

/** The TDE events' report cards, for the chart. */
export function reportCards(evaluated: Evaluated[]): ReportCardPoint[] {
  return evaluated.flatMap(({ event, notes }) =>
    notes.evaluation && isTdeEvent(event)
      ? [{ key: event.id, date: startDate(event), title: event.name, evaluation: notes.evaluation }]
      : [])
}

/**
 * One event on the page, compact like the Events list's rows: the date;
 * the name over the run group they drove in and who their instructor was;
 * and what's there — the report card (or the whole event's evaluation),
 * and how many sessions have one. Opens the event on My notes, where they
 * are.
 */
function EvaluationEventCard({ event, notes, runGroup, onOpen }: {
  event: EventConfig
  notes: EventNotes
  /** The group they said they're in, for an event evaluated as a whole. */
  runGroup: string | null
  onOpen: () => void
}) {
  const groups = notes.sessions.length ? [...new Set(notes.sessions.map(s => s.group))] : runGroup ? [runGroup] : []
  const instructors = [...new Set([notes.evaluation?.instructor, ...notes.sessions.map(s => s.evaluation.instructor)]
    .filter((n): n is string => !!n))]
  const tde = isTdeEvent(event)
  return (
    <a
      href={`#/event/${encodeURIComponent(event.id)}`}
      onClick={e => {
        if (opensElsewhere(e)) return
        e.preventDefault()
        onOpen()
      }}
      className={`${CARD_SHELL} transition-colors hover:border-gray-400`}
    >
      <DateBlock event={event} muted />
      <div className="min-w-0 flex-1">
        <div className="truncate font-rubik text-[15px] font-semibold leading-tight text-gray-900">{event.name}</div>
        <div className="mt-1 flex min-w-0 items-center gap-2">
          {groups.map(id => <GroupBadge key={id} group={groupFor(id, event.runGroups)} size="sm" />)}
          <span className="truncate text-sm text-gray-500">{instructors.join(', ') || event.organizer}</span>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1 text-xs text-gray-600">
        {notes.evaluation && (
          <span className="flex items-center gap-1 font-medium text-gray-900">
            <ClipboardCheck size={12} aria-hidden="true" />
            {tde ? 'Report card' : 'Evaluation'}
          </span>
        )}
        {notes.sessions.length > 0 && <span>{plural(notes.sessions.length, 'session', 'sessions')}</span>}
      </div>
      <ChevronRight size={16} className="-ml-2 shrink-0 text-gray-300" aria-hidden="true" />
    </a>
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
}

/**
 * Instructor evaluations (#345), from the More tab: every event the driver
 * has one at, newest first, under a chart of how their TDE report cards'
 * scores have come along. Private: it needs a sign-in.
 */
export function EvaluationsPage({ events, eventsLoaded, active, onBack, onOpenEvent }: Props) {
  const { status: authStatus } = useAuth()
  const notes = useAllNotes(active)
  const { rsvps } = useRsvps()

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

  const loading = authStatus === 'signed-in' && (notes.status === 'loading' || !eventsLoaded)
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
  } else if (evaluated.length === 0) {
    body = (
      <div className="fade-in rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
        <ClipboardCheck size={20} className="mx-auto text-gray-400" aria-hidden="true" />
        <p className="mt-2 text-sm font-medium text-gray-700">No instructor evaluations yet</p>
        <p className="mt-1 text-xs text-gray-400">
          Add one on an event’s My notes tab, or tap a session you drove on its Schedule.
        </p>
      </div>
    )
  } else {
    body = (
      <div className="fade-in">
        <div className="mb-3 flex min-h-[20px] items-center justify-end px-1 text-xs text-gray-500">
          <PrivateTag whose={null} what="evaluations" />
        </div>
        {scored > 0 && (
          <section aria-label="Report card scores" className="mb-8 rounded-2xl border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="text-[13px] font-semibold text-gray-500">TDE report cards</h2>
              <span className="text-xs text-gray-400">{plural(scored, 'event', 'events')}</span>
            </div>
            <SkillTrends points={cards} />
          </section>
        )}
        <section aria-labelledby="evaluations-events-heading">
          <h2 id="evaluations-events-heading" className="mb-2 font-rubik text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
            Events
          </h2>
          <ul className="space-y-3">
            {evaluated.map(({ event, notes }) => (
              <li key={event.id}>
                <EvaluationEventCard
                  event={event}
                  notes={notes}
                  runGroup={myRunGroup(event, rsvps[event.id])}
                  onOpen={() => onOpenEvent(event)}
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
