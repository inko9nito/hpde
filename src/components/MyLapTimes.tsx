import { NotebookPen } from 'lucide-react'
import { lapColumns } from './LapList'
import { LapsSkeleton, LapsToolbar, SessionLapsCard, StatCard, plural, sessionTitle, useOpenSessions, useSkeletonFade } from './LapSessions'
import type { SessionHead } from './LapSessions'
import { AddEventEvaluation, EventEvaluationCard } from './EventEvaluationCard'
import { CarRow } from './CarRow'
import type { SessionView } from './LapTimesSheet'
import { LapTrendChart, withTopSpeed } from './LapTrendChart'
import type { TrendPoint } from './LapTrendChart'
import { groupFor, shortDate } from './LapTimesSheet'
import { eventBest, trackShortName } from '../utils/trackStats'
import { formatAverage, lapSpeeds, lapStats } from '../utils/lapTimes'
import { formatTime, formatAmPm } from '../utils/time'
import type { LapLog } from '../data/lapLog'
import type { NotesLog } from '../data/notesLog'
import { isTdeEvent } from '../utils/evaluation'
import { classifyEvent } from '../utils/eventClass'
import { carName, carTitle } from '../utils/garage'
import type { Car, SessionPressures } from '../utils/garage'
import type { GarageStatus } from '../data/GarageContext'
import type { EventConfig, RunGroupConfig } from '../types'

interface Props {
  event: EventConfig
  log: LapLog
  /** Instructor evaluations: each session's, and a TDE event's report card (#340). */
  notes: NotesLog
  /** The best on this track layout across every event, and how many events that is. */
  layoutBest: { best?: number; events: number }
  /** The same best, once every event's is known — marks the lap that set it. */
  allTimeBest?: number
  /** The layout's track page (#274), which the All time best card opens. */
  track?: { name: string; href: string }
  /** The group they drove in, and every event (to color groups), for the report card. */
  runGroup?: RunGroupConfig | null
  events: EventConfig[]
  /** Opens a session's sheet: on what it has (`menu`), or on one thing. */
  onEdit: (session: SessionHead, view: SessionView) => void
  /** Opens the report card's form (#340). */
  onEditEvaluation: () => void
  /**
   * What the driver ran here, from their garage (#344): the car, and each
   * session's tire pressures — the picked driver's, for an admin, shown
   * just as they'd see it (#364).
   */
  garage?: {
    status: GarageStatus
    car?: Car
    pressures: Map<string, SessionPressures>
    /** Opens the car's details, or with none picked, the garage's cars to pick from. */
    onOpenCar: () => void
    reload: () => void
  }
}

/**
 * The My notes tab (#210): the driver's own notes for this event, session
 * by session — lap times, and what their instructor said (#340) — with a
 * TDE event's report card for the whole event. Added from the Schedule
 * tab; edited from here too. An admin can pick another driver's instead
 * (#288).
 */
export function MyLapTimes({
  event, log, notes, layoutBest, allTimeBest, track: trackPage, runGroup, events, onEdit, onEditEvaluation, garage,
}: Props) {
  const { open, setOpen, toggle } = useOpenSessions()
  const runGroups = event.runGroups
  const track = trackShortName(event)

  const loading = log.status === 'loading' || log.status === 'off' || notes.status === 'loading' || garage?.status === 'loading'
  const tde = isTdeEvent(event)
  const leaving = useSkeletonFade(loading)

  // The car they drove, first of all: one line, which opens its details.
  const carRow = garage?.status === 'ready' && (
    <div className="mb-5">
      {garage.car
        ? <CarRow car={garage.car} title={carName(garage.car)} subtitle={garage.car.nickname ? carTitle(garage.car) : undefined} onClick={garage.onOpenCar} label={`Your car: ${carName(garage.car)}`} />
        : <CarRow title="Add your car" subtitle="from your garage" onClick={garage.onOpenCar} dashed />}
    </div>
  )

  // Expand all: at the top until there are sessions to list,
  // then just over them, by the cards it opens (#361).
  const toolbar = (
    <LapsToolbar
      keys={log.status === 'ready' ? log.sessions.map(s => s.key) : []}
      open={open}
      onOpen={setOpen}
    />
  )
  const top = (<>
    {carRow}
  </>)
  const header = <>{top}{toolbar}</>

  if (loading || leaving) {
    return <>{header}<LapsSkeleton cards={track ? 2 : 1} leaving={leaving} label="Loading your lap times" /></>
  }

  if (log.status === 'error' || notes.status === 'error' || garage?.status === 'error') {
    return (
      <>
        {header}
        <div className="fade-in rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
          <p className="text-sm font-medium text-gray-700">Couldn’t load your notes</p>
          <p className="mt-1 text-xs text-gray-400">Check your connection and try again.</p>
          <button
            onClick={() => {
              if (log.status === 'error') log.reload()
              if (notes.status === 'error') notes.reload()
              if (garage?.status === 'error') garage.reload()
            }}
            className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
          >
            Try again
          </button>
        </div>
      </>
    )
  }

  // The whole event's evaluation — on a TDE event, their report card — or
  // once the event's begun, the way to add one.
  const reportCard = notes.evaluation
    ? <EventEvaluationCard evaluation={notes.evaluation} tde={tde} runGroup={tde ? runGroup : null} events={events} onEdit={onEditEvaluation} />
    : classifyEvent(event) !== 'upcoming' ? <AddEventEvaluation tde={tde} onAdd={onEditEvaluation} /> : null

  // Every session with something saved: laps, an evaluation, tire pressures.
  const heads = new Map<string, SessionHead>()
  for (const s of [...log.sessions, ...notes.sessions, ...(garage?.pressures.values() ?? [])]) if (!heads.has(s.key)) heads.set(s.key, s)
  const sessions = [...heads.values()].sort((a, b) => a.key.localeCompare(b.key))

  if (sessions.length === 0) {
    return (
      <>
        {header}
        <div className="fade-in flex flex-col gap-5">
          {reportCard}
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
            <NotebookPen size={20} className="mx-auto text-gray-400" aria-hidden="true" />
            <p className="mt-2 text-sm font-medium text-gray-700">No session notes yet</p>
            <p className="mt-1 text-xs text-gray-400">
              On the Schedule tab, tap a session you drove to add your laps, tire pressures or your instructor’s feedback.
            </p>
          </div>
        </div>
      </>
    )
  }

  const days = new Set(sessions.map(s => s.date))
  // One set of columns for every session's table, so they line up.
  const columns = lapColumns(log.sessions.flatMap(s => s.laps))
  // Each session's best and average, in schedule order, for the chart (#274).
  const trend = log.sessions.flatMap((s): TrendPoint[] => {
    const { best, average } = lapStats(s.laps)
    if (best === undefined || average === undefined) return []
    const day = days.size > 1 ? shortDate(s.date) : undefined
    return [{
      key: s.key,
      tick: s.sessionNumber !== undefined ? `S${s.sessionNumber}` : formatTime(s.time),
      tickGroup: day,
      title: sessionTitle(s),
      subtitle: [`${formatTime(s.time)} ${formatAmPm(s.time)}`, groupFor(s.group, runGroups).label, day].filter(Boolean).join(' · '),
      best, average, averageText: formatAverage(s.laps, average),
      ...withTopSpeed(lapSpeeds(s.laps).top),
    }]
  })

  return (
    <>
      {top}
      <div className="fade-in">
        {log.sessions.length > 0 && <div className={`mb-5 grid gap-3 ${track ? 'grid-cols-2' : 'grid-cols-1'}`}>
          <StatCard
            label="Best lap this event"
            ms={eventBest(log.sessions)}
            caption={`Across ${plural(log.sessions.length, 'recorded session', 'recorded sessions')}`}
          />
          {track && (
            <StatCard
              label="All time best"
              ms={layoutBest.best}
              caption={`Across ${plural(layoutBest.events, 'event', 'events')} at this track config`}
              link={trackPage && {
                href: trackPage.href,
                label: `See all my ${trackPage.name} laps`,
              }}
            />
          )}
        </div>}
        {reportCard && <div className="mb-5">{reportCard}</div>}
        {trend.length > 0 && (
          <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4">
            <p className="mb-3 text-[13px] font-semibold text-gray-500">Lap times by session</p>
            <LapTrendChart points={trend} label="Best and average lap in each session, in schedule order" noun={['session', 'sessions']} />
          </div>
        )}
        {toolbar}
        <div className="flex flex-col gap-5">
          {sessions.map(session => (
            <SessionLapsCard
              key={session.key}
              session={session}
              laps={log.byKey.get(session.key)}
              notes={notes.byKey.get(session.key)}
              pressures={garage?.pressures.get(session.key)}
              runGroups={runGroups}
              showDate={days.size > 1}
              columns={columns}
              allTimeBest={allTimeBest}
              expanded={open.has(session.key)}
              onToggle={() => toggle(session.key)}
              onEdit={() => onEdit(session, 'menu')}
              onOpenEvaluation={() => onEdit(session, 'evaluation')}
              onOpenPressures={() => onEdit(session, 'pressures')}
              tableId={`laps-${session.key.replace(/[^a-z0-9]+/gi, '-')}`}
            />
          ))}
        </div>
      </div>
    </>
  )
}
