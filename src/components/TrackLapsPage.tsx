import { useEffect, useMemo, useRef } from 'react'
import { Timer } from 'lucide-react'
import { BackButton } from './EventHeader'
import { TrackIcon } from './TrackIcon'
import { SignInPrompt } from './SignInPrompt'
import { GroupBadge } from './GroupBadge'
import { BestChip } from './LapList'
import { groupFor } from './LapTimesSheet'
import { CARD_SHELL, DateBlock } from './LandingPage'
import { StatusBadge } from './EventHeader'
import { PrivateTag, StatCard, plural, useSkeletonFade } from './LapSessions'
import { LapTrendChart, dayLabel, fullDate } from './LapTrendChart'
import type { TrendPoint } from './LapTrendChart'
import { useAuth } from '../auth/AuthContext'
import { useTrackLaps } from '../data/lapLog'
import { driverName } from '../data/drivers'
import type { Driver } from '../data/drivers'
import { eventBest, eventsOnLayout, layoutName, layoutSlug, startDate } from '../utils/trackStats'
import { formatAverage, lapStats } from '../utils/lapTimes'
import type { SessionLaps } from '../utils/lapTimes'
import { classifyEvent } from '../utils/eventClass'
import { opensElsewhere } from '../utils/links'
import type { EventConfig } from '../types'

export const TRACK_HASH_PREFIX = '#/track/'

/** A layout's track page: `#/track/msrc-1-7-cw`. */
export function trackHash(slug: string): string {
  return `${TRACK_HASH_PREFIX}${encodeURIComponent(slug)}`
}

export function trackSlugFromHash(hash: string): string | null {
  if (!hash.startsWith(TRACK_HASH_PREFIX)) return null
  return decodeURIComponent(hash.slice(TRACK_HASH_PREFIX.length).split('/')[0]) || null
}

/** The page's name ("MSRC 1.7 CW"), icon and track, from the events on its layout. */
export function trackPageTitle(slug: string, events: EventConfig[]): { name: string; trackId?: string; track?: string } | null {
  const named = events.find(e => layoutSlug(e) === slug)
  const name = named && layoutName(named)
  return name ? { name, trackId: named.trackId, track: named.track?.trim() || undefined } : null
}

/**
 * One event on the track page (#274), compact like the Events list's rows:
 * the date; the name over the driver's run group and the organizer; and
 * their best lap there (the black chip, as everywhere) over their average,
 * across every session. Opens the event, on My notes, for its sessions.
 */
function EventLapsCard({ event, sessions, allTimeBest, onOpen }: {
  event: EventConfig
  sessions: SessionLaps[]
  allTimeBest?: number
  onOpen: () => void
}) {
  const status = classifyEvent(event)
  const laps = sessions.flatMap(s => s.laps)
  const { average, best } = lapStats(laps)
  // The group(s) they drove in, as the schedule lists them.
  const groups = [...new Set(sessions.map(s => s.group))]
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
      <DateBlock event={event} muted={status === 'past'} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-rubik text-[15px] font-semibold leading-tight text-gray-900">{event.name}</span>
          {status === 'live' && <StatusBadge status="live" size="sm" />}
        </div>
        <div className="mt-1 flex min-w-0 items-center gap-2">
          {groups.map(id => <GroupBadge key={id} group={groupFor(id, event.runGroups)} size="sm" />)}
          {event.organizer && <span className="truncate text-sm text-gray-500">{event.organizer}</span>}
        </div>
      </div>
      <dl className="flex shrink-0 flex-col items-end gap-1" aria-label="Event figures">
        <div className="flex">
          <dt className="sr-only">Best</dt>
          <dd className="font-mono text-sm">
            {best !== undefined ? <BestChip ms={best} allTime={best === allTimeBest} /> : '—'}
          </dd>
        </div>
        <div className="flex items-baseline gap-1 text-xs">
          <dt className="text-gray-400">Avg</dt>
          <dd className="font-mono tabular-nums text-gray-600">{average !== undefined ? formatAverage(laps, average) : '—'}</dd>
        </div>
      </dl>
    </a>
  )
}

const bar = 'animate-pulse rounded bg-gray-100'

/** Stand-in for the best-lap card and two event cards while the laps load. */
function TrackSkeleton({ leaving, label }: { leaving: boolean; label: string }) {
  return (
    <div className={leaving ? 'fade-out' : 'fade-in'} aria-busy="true" aria-label={label}>
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4">
        <div className={`h-3 w-1/3 ${bar}`} />
        <div className={`mt-3 h-6 w-1/3 ${bar}`} />
        <div className={`mt-3 h-2.5 w-1/2 ${bar}`} />
      </div>
      <div className={`mb-2 ml-1 h-2.5 w-14 ${bar}`} />
      <div className="space-y-3">
        {[0, 1, 2].map(i => (
          <div key={i} className={CARD_SHELL}>
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-gray-100" />
            <div className="flex-1 space-y-2">
              <div className={`h-3.5 w-3/5 ${bar}`} />
              <div className={`h-3 w-2/5 ${bar}`} />
            </div>
            <div className="h-6 w-16 shrink-0 animate-pulse rounded-md bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  )
}

interface Props {
  slug: string
  /** Every event, to find the ones on this layout. */
  events: EventConfig[]
  eventsLoaded: boolean
  /** Whose laps: another driver's, for an admin (#288); null for your own. */
  driver: Driver | null
  /** On top, not under an event opened from it: back on top, its laps are fetched again. */
  active: boolean
  onBack: () => void
  /** Opens one of the events, on its My notes tab. */
  onOpenEvent: (event: EventConfig) => void
  /** To the Tracks tab. */
  onAllTracks: () => void
}

/**
 * A track page (#274): the events on one layout — the same track,
 * configuration and direction, as the All time best card counts them —
 * that the driver has laps at, newest first, under their all-time best
 * there. Each event opens its own page for its sessions. Private: it needs
 * a sign-in.
 */
export function TrackLapsPage({ slug, events, eventsLoaded, driver, active, onBack, onOpenEvent, onAllTracks }: Props) {
  const { status: authStatus } = useAuth()
  const onLayout = useMemo(() => eventsOnLayout(slug, events), [slug, events])
  const title = trackPageTitle(slug, events)
  const eventIds = useMemo(() => (onLayout.length ? onLayout.map(e => e.id).sort() : null), [onLayout])
  const laps = useTrackLaps(eventIds, driver?.id ?? null)
  const name = driver ? driverName(driver) : null
  const whose = name ? `${name}’s` : 'your'

  // Back from an event opened from here, where its laps may have changed.
  const wasActive = useRef(active)
  const { reload } = laps
  useEffect(() => {
    if (active && !wasActive.current) reload()
    wasActive.current = active
  }, [active, reload])

  const loading = authStatus === 'signed-in' && (laps.status === 'loading' || (laps.status === 'off' && !eventsLoaded))
  const leaving = useSkeletonFade(loading)

  // The newest event first.
  const byId = new Map(onLayout.map(e => [e.id, e]))
  const withLaps = laps.events
    .flatMap(({ eventId, sessions }) => {
      const event = byId.get(eventId)
      return event && sessions.length ? [{ event, sessions }] : []
    })
    .sort((a, b) => startDate(b.event).localeCompare(startDate(a.event)))
  const allSessions = withLaps.flatMap(g => g.sessions)
  const best = eventBest(allSessions)
  // Each event's best and average, oldest first, for the chart.
  const trend = [...withLaps].reverse().flatMap(({ event, sessions }): TrendPoint[] => {
    const laps = sessions.flatMap(s => s.laps)
    const stats = lapStats(laps)
    if (stats.best === undefined || stats.average === undefined) return []
    const date = startDate(event)
    return [{
      key: event.id, tick: dayLabel(date), tickGroup: date.slice(0, 4), title: event.name, subtitle: fullDate(date),
      best: stats.best, average: stats.average, averageText: formatAverage(laps, stats.average),
    }]
  })

  const header = (
    <div className="sticky top-0 z-20 border-b border-gray-500/20 bg-white shadow-[0_4px_15px_rgba(12,12,13,0.05)]">
      <div className="mx-auto flex min-h-[64px] max-w-lg items-center gap-2 px-4 py-2">
        <BackButton onClick={onBack} />
        {title ? (
          <div className="flex min-w-0 items-center gap-3">
            <TrackIcon trackId={title.trackId} tone="dark" size={44} padding={0} radius="rounded-lg" />
            <div className="flex min-w-0 flex-col gap-1">
              <h1 className="truncate font-rubik text-lg font-bold leading-tight text-gray-900">{title.name}</h1>
              <p className="truncate text-[13px] leading-tight text-gray-500">
                {[title.track, name ? `${name}’s laps` : null].filter(Boolean).join(' · ') || 'All my laps'}
              </p>
            </div>
          </div>
        ) : !eventsLoaded && (
          <div className="flex min-w-0 flex-1 items-center gap-3" aria-hidden="true">
            <div className="h-11 w-11 shrink-0 animate-pulse rounded-lg bg-gray-200" />
            <div className="flex flex-1 flex-col gap-2">
              <div className="h-4 w-2/5 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-3/5 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        )}
      </div>
    </div>
  )

  let body
  if (eventsLoaded && !title) {
    body = (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
        <p className="text-sm font-medium text-gray-700">No event is on this track</p>
        <p className="mt-1 text-xs text-gray-400">It may have been renamed or deleted.</p>
        <button
          onClick={onAllTracks}
          className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          See all tracks
        </button>
      </div>
    )
  } else if (authStatus !== 'signed-in') {
    body = <SignInPrompt reason="see your lap times on this track" />
  } else if (loading || leaving) {
    body = <TrackSkeleton leaving={leaving} label={`Loading ${whose} lap times`} />
  } else if (laps.status === 'error') {
    body = (
      <div className="fade-in rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
        <p className="text-sm font-medium text-gray-700">Couldn’t load {whose} lap times</p>
        <p className="mt-1 text-xs text-gray-400">Check your connection and try again.</p>
        <button
          onClick={laps.reload}
          className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Try again
        </button>
      </div>
    )
  } else if (withLaps.length === 0) {
    body = (
      <div className="fade-in rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
        <Timer size={20} className="mx-auto text-gray-400" aria-hidden="true" />
        <p className="mt-2 text-sm font-medium text-gray-700">No lap times on {title?.name ?? 'this track'} yet</p>
        <p className="mt-1 text-xs text-gray-400">
          {name
            ? `On an event’s Schedule tab, tap a session ${name} drove to add their laps.`
            : 'On an event’s Schedule tab, tap a session you drove to add your laps.'}
        </p>
      </div>
    )
  } else {
    body = (
      <div className="fade-in">
        <div className="mb-8">
          <StatCard
            label="All time best"
            ms={best}
            caption={`Across ${plural(allSessions.length, 'session', 'sessions')} at ${plural(withLaps.length, 'event', 'events')}`}
          >
            {/* How it's come along: a point per event, from the first. */}
            {trend.length > 0 && (
              <div className="mt-4 border-t border-gray-100 pt-3">
                <LapTrendChart points={trend} label="Best and average lap at each event, oldest to newest" noun={['event', 'events']} />
              </div>
            )}
          </StatCard>
        </div>
        <section aria-labelledby="track-events-heading">
          {/* Headed like the Events list's Past. */}
          <h2 id="track-events-heading" className="mb-2 font-rubik text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
            Events
          </h2>
          <ul className="space-y-3">
            {withLaps.map(({ event, sessions }) => (
              <li key={event.id}>
                <EventLapsCard event={event} sessions={sessions} allTimeBest={best} onOpen={() => onOpenEvent(event)} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {header}
      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">
        {title && authStatus === 'signed-in' && (
          <div className="mb-3 flex min-h-[20px] items-center justify-end px-1 text-xs text-gray-500">
            <PrivateTag whose={name} />
          </div>
        )}
        {body}
      </div>
    </div>
  )
}
