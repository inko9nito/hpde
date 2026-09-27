import { useMemo } from 'react'
import { ChevronRight, Timer } from 'lucide-react'
import { BackButton } from './EventHeader'
import { TrackIcon } from './TrackIcon'
import { SignInPrompt } from './SignInPrompt'
import { lapColumns } from './LapList'
import { LapsSkeleton, LapsToolbar, SessionLapsCard, StatCard, plural, useOpenSessions, useSkeletonFade } from './LapSessions'
import { useAuth } from '../auth/AuthContext'
import { useTrackLaps } from '../data/lapLog'
import { driverName } from '../data/drivers'
import type { Driver } from '../data/drivers'
import { eventBest, eventsOnLayout, layoutName, layoutSlug, startDate } from '../utils/trackStats'
import { formatLapTime } from '../utils/lapTimes'
import { formatDateRange } from '../utils/time'
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

interface Props {
  slug: string
  /** Every event, to find the ones on this layout. */
  events: EventConfig[]
  eventsLoaded: boolean
  /** Whose laps: another driver's, for an admin (#288); null for your own. */
  driver: Driver | null
  onBack: () => void
  /** Opens one of the events, on its My notes tab. */
  onOpenEvent: (event: EventConfig) => void
  /** To the Tracks tab. */
  onAllTracks: () => void
}

/**
 * A track page (#274): every session the driver has logged on one layout
 * — the same track, configuration and direction, as the All time best
 * card counts them — grouped by event, newest first. Each session opens
 * onto its lap table, as on My notes. Private: it needs a sign-in.
 */
export function TrackLapsPage({ slug, events, eventsLoaded, driver, onBack, onOpenEvent, onAllTracks }: Props) {
  const { status: authStatus } = useAuth()
  const onLayout = useMemo(() => eventsOnLayout(slug, events), [slug, events])
  const title = trackPageTitle(slug, events)
  const eventIds = useMemo(() => (onLayout.length ? onLayout.map(e => e.id).sort() : null), [onLayout])
  const laps = useTrackLaps(eventIds, driver?.id ?? null)
  const { open, setOpen, toggle } = useOpenSessions()
  const name = driver ? driverName(driver) : null
  const whose = name ? `${name}’s` : 'your'

  const loading = authStatus === 'signed-in' && (laps.status === 'loading' || (laps.status === 'off' && !eventsLoaded))
  const leaving = useSkeletonFade(loading)

  // The newest event first; within one, its sessions in schedule order.
  const byId = new Map(onLayout.map(e => [e.id, e]))
  const groups = laps.events
    .flatMap(({ eventId, sessions }) => {
      const event = byId.get(eventId)
      return event && sessions.length ? [{ event, sessions }] : []
    })
    .sort((a, b) => startDate(b.event).localeCompare(startDate(a.event)))
  const allSessions = groups.flatMap(g => g.sessions)
  const best = eventBest(allSessions)
  // One set of columns for every table on the page, so they line up.
  const columns = lapColumns(allSessions.flatMap(s => s.laps))
  const keyOf = (eventId: string, sessionKey: string) => `${eventId} ${sessionKey}`

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
    body = <LapsSkeleton cards={1} eventHeading leaving={leaving} label={`Loading ${whose} lap times`} />
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
  } else if (groups.length === 0) {
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
        <div className="mb-6">
          <StatCard
            label="All time best"
            ms={best}
            caption={`Across ${plural(allSessions.length, 'session', 'sessions')} at ${plural(groups.length, 'event', 'events')}`}
          />
        </div>
        <div className="flex flex-col gap-8">
          {groups.map(({ event, sessions }) => {
            const headingId = `track-event-${event.id.replace(/[^a-z0-9]+/gi, '-')}`
            const days = new Set(sessions.map(s => s.date))
            const eventBestMs = eventBest(sessions)
            return (
              <section key={event.id} aria-labelledby={headingId} className="flex flex-col gap-4">
                {/* Opens the event's own page, where its laps can be edited. */}
                <a
                  href={`#/event/${encodeURIComponent(event.id)}`}
                  onClick={e => {
                    if (opensElsewhere(e)) return
                    e.preventDefault()
                    onOpenEvent(event)
                  }}
                  className="group flex items-center gap-3 px-1"
                >
                  <div className="min-w-0 flex-1">
                    <h2 id={headingId} className="truncate font-rubik text-base font-bold leading-tight text-gray-900">{event.name}</h2>
                    <p className="mt-1 truncate text-xs text-gray-500">
                      {formatDateRange(event.days)}
                      {eventBestMs !== undefined && ` · Best ${formatLapTime(eventBestMs)}`}
                    </p>
                  </div>
                  <ChevronRight size={18} className="shrink-0 text-gray-400 group-hover:text-gray-600" aria-hidden="true" />
                </a>
                {sessions.map(session => {
                  const key = keyOf(event.id, session.key)
                  return (
                    <SessionLapsCard
                      key={key}
                      session={session}
                      runGroups={event.runGroups}
                      showDate={days.size > 1}
                      columns={columns}
                      allTimeBest={best}
                      expanded={open.has(key)}
                      onToggle={() => toggle(key)}
                      tableId={`laps-${key.replace(/[^a-z0-9]+/gi, '-')}`}
                    />
                  )
                })}
              </section>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {header}
      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">
        {title && authStatus === 'signed-in' && (
          <LapsToolbar
            keys={!loading && !leaving && laps.status === 'ready' ? groups.flatMap(g => g.sessions.map(s => keyOf(g.event.id, s.key))) : []}
            open={open}
            onOpen={setOpen}
            whose={name}
          />
        )}
        {body}
      </div>
    </div>
  )
}
