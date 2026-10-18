import { ChevronRight, ClipboardCheck, NotebookPen, Waves } from 'lucide-react'
import { CARD_FRAME, CARD_SHELL } from './EventCard'
import { DateBlock } from './DateBlock'
import { GroupBadge } from './GroupBadge'
import { groupFor } from './LapTimesSheet'
import { EvaluationRow, PressuresRow, sessionTitle, useSkeletonFade } from './LapSessions'
import type { SessionHead } from './LapSessions'
import { SKY_ICONS } from './skyIcons'
import { useAllNotes } from '../data/notesLog'
import type { EventNotes } from '../data/notesLog'
import { useGarage } from '../data/GarageContext'
import { useRsvps } from '../data/RsvpsContext'
import { conditionsSummary } from '../utils/conditions'
import type { SessionConditions } from '../utils/conditions'
import { isTdeEvent } from '../utils/evaluation'
import type { EventEvaluation, SessionEvaluation } from '../utils/evaluation'
import type { EventSetup, SessionPressures } from '../utils/garage'
import { myRunGroup } from '../utils/rsvp'
import { startDate } from '../utils/trackStats'
import { opensElsewhere } from '../utils/links'
import { formatAmPm, formatTime } from '../utils/time'
import type { EventConfig } from '../types'
import type { EventTabId } from './EventTabs'

/** One session's notes on the layout's page: its instructor's feedback, and its tire pressures. */
export interface SessionNoted {
  session: SessionHead
  evaluation?: SessionEvaluation
  pressures?: SessionPressures
}

/** One event's notes on the layout's page (#462). */
export interface EventNoted {
  event: EventConfig
  /** The whole event's evaluation: on a TDE event, its report card. */
  evaluation?: EventEvaluation
  /** How the conditions went, in a line, from what they recorded for each session. */
  conditions?: { line: string; sky?: SessionConditions['sky'] }
  /** Their note on the day's conditions. */
  conditionsNote?: string
  /** The run groups they drove in there. */
  groups: string[]
  /** Each session with feedback or tire pressures, in schedule order. */
  sessions: SessionNoted[]
}

/**
 * The driver's notes from each event on a layout (#462), newest first: the
 * conditions, the instructor's evaluation of the event and of each session,
 * and the tire pressures they ran — from their notes (`notes`) and their
 * garage (`setups`). An event with none isn't there.
 */
export function layoutNotes(events: EventConfig[], notes: EventNotes[], setups: Record<string, EventSetup>): EventNoted[] {
  const byId = new Map(notes.map(n => [n.eventId, n]))
  return [...events]
    .sort((a, b) => startDate(b).localeCompare(startDate(a)))
    .flatMap((event): EventNoted[] => {
      const noted = byId.get(event.id)
      const pressures = Object.values(setups[event.id]?.sessions ?? {})
      const sessions = new Map<string, SessionNoted>()
      for (const s of noted?.sessions ?? []) if (s.evaluation) sessions.set(s.key, { session: s, evaluation: s.evaluation })
      for (const p of pressures) sessions.set(p.key, { ...(sessions.get(p.key) ?? { session: p }), pressures: p })
      const recorded = (noted?.sessions ?? []).flatMap(s => (s.conditions ? [s.conditions] : []))
      const line = conditionsSummary(recorded)
      const skies = [...new Set(recorded.flatMap(c => (c.sky ? [c.sky] : [])))]
      const entry: EventNoted = {
        event,
        ...(noted?.evaluation ? { evaluation: noted.evaluation } : {}),
        ...(line ? { conditions: { line, ...(skies.length === 1 ? { sky: skies[0] } : {}) } } : {}),
        ...(noted?.conditions?.note ? { conditionsNote: noted.conditions.note } : {}),
        groups: [...new Set([...(noted?.sessions ?? []), ...pressures].map(s => s.group))],
        sessions: [...sessions.values()].sort((a, b) => a.session.key.localeCompare(b.session.key)),
      }
      return entry.evaluation || entry.conditions || entry.conditionsNote || entry.sessions.length ? [entry] : []
    })
}

const weekday = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { weekday: 'short' })
}

/**
 * One event's notes (#462): its date, name and run groups, which open it
 * on My notes; then the day's conditions and the instructor's evaluation
 * of it; then each session's feedback and tire pressures, as My notes
 * shows them.
 */
function EventNotesCard({ noted, groups, onOpen }: { noted: EventNoted; groups: string[]; onOpen: () => void }) {
  const { event, evaluation, conditions } = noted
  const multiDay = event.days.length > 1
  const SkyIcon = conditions?.sky ? SKY_ICONS[conditions.sky] : Waves
  const whole = conditions || noted.conditionsNote || evaluation
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
      {whole && (
        <div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-3">
          {(conditions || noted.conditionsNote) && (
            <div className="flex flex-col gap-1.5" data-event-conditions>
              <p className="flex min-w-0 items-center gap-1.5 text-xs text-gray-500">
                <Waves size={13} className="shrink-0" aria-hidden="true" />
                <span className="truncate">Track conditions</span>
              </p>
              {conditions && (
                <p className="flex items-center gap-2 pl-[19px] text-sm font-medium text-gray-900">
                  <SkyIcon size={16} className="shrink-0 text-gray-500" aria-hidden="true" />
                  {conditions.line}
                </p>
              )}
              {noted.conditionsNote && <p className="whitespace-pre-line pl-[19px] text-sm text-gray-700">{noted.conditionsNote}</p>}
            </div>
          )}
          {evaluation && (
            <div className="flex flex-col gap-1.5" data-event-evaluation>
              <p className="flex min-w-0 items-center gap-1.5 text-xs text-gray-500">
                <ClipboardCheck size={13} className="shrink-0" aria-hidden="true" />
                <span className="truncate">
                  {isTdeEvent(event) ? 'Report card' : 'Instructor evaluation'}{evaluation.instructor && ` · ${evaluation.instructor}`}
                </span>
              </p>
              {evaluation.notes
                ? <p className="whitespace-pre-line pl-[19px] text-sm text-gray-900">{evaluation.notes}</p>
                : <p className="pl-[19px] text-sm text-gray-400">No notes.</p>}
            </div>
          )}
        </div>
      )}
      {noted.sessions.map(({ session, evaluation: feedback, pressures }) => {
        const title = sessionTitle(session)
        return (
          <section
            key={session.key}
            aria-label={`${title}, ${formatTime(session.time)} ${formatAmPm(session.time)}`}
            className="flex flex-col gap-3 border-t border-gray-100 px-4 pt-3 pb-3"
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {title}
              <span className="ml-2 font-medium normal-case tracking-normal">
                {multiDay && `${weekday(session.date)} `}{formatTime(session.time)} {formatAmPm(session.time)}
              </span>
            </h3>
            {feedback && <EvaluationRow evaluation={feedback} title={title} />}
            {pressures && <PressuresRow pressures={pressures} title={title} />}
          </section>
        )
      })}
    </article>
  )
}

const bar = 'animate-pulse rounded bg-gray-100'

/**
 * The layout page's My notes (#462): the driver's notes from every event
 * on the layout, newest first, read here without opening each — each opens
 * on its own My notes. Fetched while it's showing.
 */
export function LayoutNotes({ events, layout, active, onOpenEvent }: {
  /** The events on the layout. */
  events: EventConfig[]
  /** The layout's name, for when there are none: "3.1 mile · Counter-clockwise". */
  layout: string
  /** Showing, on top: back on top, the notes are fetched again. */
  active: boolean
  onOpenEvent: (event: EventConfig, tab: EventTabId) => void
}) {
  const notes = useAllNotes(active)
  const garage = useGarage()
  const { rsvps } = useRsvps()
  const loading = notes.status === 'loading' || garage.status === 'loading'
  const leaving = useSkeletonFade(loading)

  if (loading || leaving) {
    return (
      <div className={`space-y-4 ${leaving ? 'fade-out' : 'fade-in'}`} aria-busy="true" aria-label="Loading your notes">
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
    )
  }
  if (notes.status === 'error' || garage.status === 'error') {
    return (
      <div className="fade-in rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
        <p className="text-sm font-medium text-gray-700">Couldn’t load your notes</p>
        <p className="mt-1 text-xs text-gray-400">Check your connection and try again.</p>
        <button
          onClick={() => {
            if (notes.status === 'error') notes.reload()
            if (garage.status === 'error') garage.reload()
          }}
          className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Try again
        </button>
      </div>
    )
  }

  const noted = layoutNotes(events, notes.events, garage.status === 'ready' ? garage.events : {})
  if (noted.length === 0) {
    return (
      <div className="fade-in rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
        <NotebookPen size={20} className="mx-auto text-gray-400" aria-hidden="true" />
        <p className="mt-2 text-sm font-medium text-gray-700">No notes on {layout} yet</p>
        <p className="mt-1 text-xs text-gray-400">
          On an event’s Schedule tab, tap a session you drove to add your instructor’s feedback, tire pressures or track conditions.
        </p>
      </div>
    )
  }
  return (
    <ul className="fade-in space-y-4" aria-label="Your notes">
      {noted.map(n => {
        // The groups they drove in — or, with no session saved, the one they said.
        const said = myRunGroup(n.event, rsvps[n.event.id])
        const groups = n.groups.length ? n.groups : said ? [said] : []
        return (
          <li key={n.event.id}>
            <EventNotesCard noted={n} groups={groups} onOpen={() => onOpenEvent(n.event, 'notes')} />
          </li>
        )
      })}
    </ul>
  )
}
