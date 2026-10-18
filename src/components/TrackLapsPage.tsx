import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, ChevronRight, Timer } from 'lucide-react'
import { TOP_BAR_PX, TrackShape, TrackTopBar, UNDER_BAR } from './TrackPhoto'
import { SignInPrompt } from './SignInPrompt'
import { GroupBadge } from './GroupBadge'
import { BestChip } from './LapList'
import { groupFor } from './LapTimesSheet'
import { CARD_SHELL, EmptyRow } from './EventCard'
import { EventsFilterToggle } from './EventsFilterToggle'
import type { EventsFilter } from './EventsFilterToggle'
import { DateBlock } from './DateBlock'
import { StatusBadge } from './EventHeader'
import { StatCard, plural, useSkeletonFade } from './LapSessions'
import { LapTrendChart, dayLabel, fullDate, withTopSpeed } from './LapTrendChart'
import type { TrendPoint } from './LapTrendChart'
import { useAuth } from '../auth/AuthContext'
import { useTrackLaps } from '../data/lapLog'
import { useRsvps } from '../data/RsvpsContext'
import { driverName } from '../data/drivers'
import type { Driver } from '../data/drivers'
import { eventBest, eventsOnLayout, layoutName, layoutSlug, layoutTitle, startDate } from '../utils/trackStats'
import { trackInfo } from '../data/tracks'
import { useScrolledPast } from '../utils/useScrolledPast'
import { formatAverage, formatSpeed, lapSpeeds, lapStats } from '../utils/lapTimes'
import type { SessionLaps } from '../utils/lapTimes'
import { classifyEvent } from '../utils/eventClass'
import { goingIds, myRunGroup } from '../utils/rsvp'
import type { Rsvp } from '../utils/rsvp'
import { opensElsewhere } from '../utils/links'
import { TabStrip } from './EventTabs'
import { LayoutNotes } from './LayoutNotes'
import type { TrackLink } from './EventInfo'
import type { EventConfig } from '../types'
import type { EventTabId } from './EventTabs'
import { PAGE_FILL } from './PushPage'

export const TRACK_HASH_PREFIX = '#/track/'

/** A layout's track page: `#/track/msrc-1-7-cw`. */
export function trackHash(slug: string): string {
  return `${TRACK_HASH_PREFIX}${encodeURIComponent(slug)}`
}

export function trackSlugFromHash(hash: string): string | null {
  if (!hash.startsWith(TRACK_HASH_PREFIX)) return null
  return decodeURIComponent(hash.slice(TRACK_HASH_PREFIX.length).split('/')[0]) || null
}

/**
 * The page's name ("MSRC 1.7 CW"), icon and track, from the events on its
 * layout — and spelled out, under its track's name, for its header (#346).
 */
export function trackPageTitle(slug: string, events: EventConfig[]): {
  name: string
  trackId?: string
  track?: string
  length?: string
  direction?: string
} | null {
  const named = events.find(e => layoutSlug(e) === slug)
  const name = named && layoutName(named)
  if (!name) return null
  return {
    name,
    trackId: named.trackId,
    track: trackInfo(named.trackId)?.name ?? (named.track?.trim() || undefined),
    ...layoutTitle(named),
  }
}

/**
 * One event on the track page (#274), compact like the Events list's rows:
 * the date; the name over the driver's run group and the organizer; and
 * their best lap there (the black chip, as everywhere) over their average,
 * across every session, and the fastest they went there (#298). Opens the
 * event, on My notes, for its sessions — or, with none logged yet (#320),
 * on its Schedule, where they're added: Going there instead of the figures
 * when it's still to come. One of the others on All (#385) has neither.
 */
function EventLapsCard({ event, sessions, yours, rsvp, allTimeBest, onOpen }: {
  event: EventConfig
  sessions: SessionLaps[]
  /** Theirs: laps at it, or a yes to it. */
  yours: boolean
  /** Their answer, for the run group they said, before they've laps. */
  rsvp?: Rsvp
  allTimeBest?: number
  onOpen: (tab: EventTabId) => void
}) {
  const status = classifyEvent(event)
  const laps = sessions.flatMap(s => s.laps)
  const { average, best } = lapStats(laps)
  const peak = lapSpeeds(laps).top
  // The group(s) they drove in, as the schedule lists them; before any
  // laps, the one they said they're in.
  const said = myRunGroup(event, rsvp)
  const groups = sessions.length ? [...new Set(sessions.map(s => s.group))] : said ? [said] : []
  return (
    <a
      href={`#/event/${encodeURIComponent(event.id)}`}
      onClick={e => {
        if (opensElsewhere(e)) return
        e.preventDefault()
        onOpen(sessions.length ? 'notes' : 'schedule')
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
      {!yours ? null : sessions.length === 0 ? (
        status === 'past' ? (
          <span className="shrink-0 text-xs text-gray-400">No laps</span>
        ) : (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 font-rubik text-[11px] font-medium leading-none text-emerald-700">
            <Check size={11} strokeWidth={3} aria-hidden="true" />
            Going
          </span>
        )
      ) : (
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
        {peak !== undefined && (
          <div className="flex items-baseline gap-1 text-xs" data-peak>
            <dt className="text-gray-400">Peak</dt>
            <dd className="font-mono tabular-nums text-gray-600">{formatSpeed(peak)}</dd>
            <span className="text-gray-400">mph</span>
          </div>
        )}
      </dl>
      )}
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
  /** Every event on the layout, or only theirs (#385), as on the Tracks tab. */
  filter: EventsFilter
  onFilter: (f: EventsFilter) => void
  /** On top, not under an event opened from it: back on top, its laps are fetched again. */
  active: boolean
  onBack: () => void
  /** Opens one of the events: on My notes for its laps, or its Schedule to add them. */
  onOpenEvent: (event: EventConfig, tab: EventTabId) => void
  /** To the Tracks tab. */
  onAllTracks: () => void
  /** Whether its title has scrolled up into the top bar, which is gray-50 then, not over the photo. */
  onCollapsedChange?: (collapsed: boolean) => void
  /** Its track's own page (#462), which the track's name under its title opens. */
  track?: TrackLink
}

type LayoutTab = 'events' | 'notes'

/**
 * A track page (#274): the driver's events on one layout — the same track,
 * configuration and direction, as the All time best card counts them —
 * newest first, under their all-time best there: the ones they have laps
 * at, and the ones they said they're going to or went to, laps or not
 * (#320) — or, on All, every event on it (#385). Each event opens its own
 * page for its sessions. The laps need a sign-in; signed out, it lists
 * every event on it. Beside them, on a tab of its own, their notes from
 * every event on it (#462).
 */
export function TrackLapsPage({ slug, events, eventsLoaded, driver, filter, onFilter, active, onBack, onOpenEvent, onAllTracks, onCollapsedChange, track }: Props) {
  const { status: authStatus } = useAuth()
  const signedIn = authStatus === 'signed-in'
  const onLayout = useMemo(() => eventsOnLayout(slug, events), [slug, events])
  const title = trackPageTitle(slug, events)
  const eventIds = useMemo(() => (onLayout.length ? onLayout.map(e => e.id).sort() : null), [onLayout])
  const laps = useTrackLaps(eventIds, driver?.id ?? null)
  // Your own answers; an admin looking at another driver's laps has only theirs.
  const { status: rsvpsStatus, rsvps } = useRsvps()
  const answers = useMemo(() => (driver ? {} : rsvps), [driver, rsvps])
  const going = useMemo(() => goingIds(onLayout, answers), [onLayout, answers])
  const name = driver ? driverName(driver) : null
  // A ref that re-renders: the title is only there once the events are.
  const [titleEl, setTitleEl] = useState<HTMLElement | null>(null)
  const collapsed = useScrolledPast(titleEl, TOP_BAR_PX)
  useEffect(() => {
    onCollapsedChange?.(collapsed)
  }, [collapsed])

  // Back from an event opened from here, where its laps may have changed.
  const wasActive = useRef(active)
  const { reload } = laps
  useEffect(() => {
    if (active && !wasActive.current) reload()
    wasActive.current = active
  }, [active, reload])

  const [tab, setTab] = useState<LayoutTab>('events')

  const loading = signedIn
    && (laps.status === 'loading' || (laps.status === 'off' && !eventsLoaded) || (!driver && rsvpsStatus === 'loading'))
  const leaving = useSkeletonFade(loading)

  // Theirs, the newest first: laps at it, or a yes to it (#320).
  const sessionsOf = new Map(laps.events.filter(e => e.sessions.length).map(e => [e.eventId, e.sessions]))
  const all = onLayout
    .map(event => ({ event, sessions: sessionsOf.get(event.id) ?? [], yours: sessionsOf.has(event.id) || going.has(event.id) }))
    .sort((a, b) => startDate(b.event).localeCompare(startDate(a.event)))
  const mine = all.filter(g => g.yours)
  // The list: theirs, or every event on it (#385).
  const listed = filter === 'all' || !signedIn ? all : mine
  const withLaps = mine.filter(g => g.sessions.length)
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
      ...withTopSpeed(lapSpeeds(laps).top),
    }]
  })

  const info = trackInfo(title?.trackId)
  // "1.7 mile · Clockwise", under its track's name (#346).
  const heading = title ? [title.length, title.direction].filter(Boolean).join(' · ') || title.name : ''
  const header = (<>
    <TrackTopBar title={heading} collapsed={collapsed} onBack={onBack} />
    {/* As the track's own page has it — its name over where it is, then
        its shape — but the layout leads (#346): its shape over the track's
        photo, softened and dimmed, in a shorter header with no panel over
        it, so it doesn't read as the track's page, where the photo leads. */}
    <header className="relative overflow-hidden bg-gray-900 text-white" style={UNDER_BAR}>
      {info?.photo && (
        <img
          src={info.photo}
          alt=""
          data-track-photo={info.id}
          className="absolute inset-0 h-full w-full scale-110 object-cover"
          style={{ objectPosition: `${info.photoX} 50%`, filter: 'blur(3px) saturate(0.85) brightness(0.5)' }}
        />
      )}
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.25) 45%, rgba(0, 0, 0, 0.75))' }} />
      <div
        className="relative mx-auto flex max-w-lg flex-col items-center px-4 pb-5 text-center font-rubik"
        style={{ paddingTop: TOP_BAR_PX }}
      >
        {title ? (<>
          <h1 ref={setTitleEl} className="max-w-full truncate text-[20px] font-bold leading-normal">{heading}</h1>
          {/* Its track, as the track page's city sits under its name — which opens the track's page (#462). */}
          <p className="mt-1.5 flex max-w-full items-center justify-center text-base leading-normal">
            {title.track && track ? (
              <a
                href={track.href}
                onClick={e => {
                  if (opensElsewhere(e)) return
                  e.preventDefault()
                  track.onOpen()
                }}
                aria-label={`${title.track}: its track page`}
                className="-mx-1.5 inline-flex min-w-0 items-center gap-0.5 rounded-md px-1.5 transition-colors hover:bg-white/15"
                data-track-link
              >
                <span className="truncate">{title.track}</span>
                <ChevronRight size={16} strokeWidth={2.5} className="shrink-0 text-white/70" aria-hidden="true" />
              </a>
            ) : title.track && <span className="truncate">{title.track}</span>}
            {name && <span className="shrink-0 whitespace-pre">{title.track ? ' · ' : ''}{name}’s laps</span>}
          </p>
          {/* Its square is mostly margin: 77 pt above the shape, 78 below. */}
          <TrackShape trackId={title.trackId} width={170} className="-mt-[61px] -mb-[62px]" />
        </>) : !eventsLoaded ? (
          <div className="flex w-full flex-col items-center gap-3 pb-2" aria-hidden="true">
            <div className="h-5 w-2/5 animate-pulse rounded bg-white/15" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-white/10" />
            <div className="mt-2 h-16 w-40 animate-pulse rounded-lg bg-white/10" />
          </div>
        ) : <div className="h-24" />}
      </div>
    </header>
  </>)

  // Theirs whether or not they've laps there (#320), or all of them (#385):
  // every one to anyone signed out, with no toggle.
  const eventsList = all.length > 0 && (
    <section aria-labelledby="track-events-heading">
      {/* Headed like the Events list's Past, with All or theirs across from it. */}
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 id="track-events-heading" className="font-rubik text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
          Events
        </h2>
        {signedIn && <EventsFilterToggle filter={filter} onChange={onFilter} mineLabel="Mine" />}
      </div>
      {listed.length === 0 ? <EmptyRow>None of yours here yet.</EmptyRow> : (
      <ul className="space-y-3">
        {listed.map(({ event, sessions, yours }) => (
          <li key={event.id}>
            <EventLapsCard
              event={event}
              sessions={sessions}
              yours={yours}
              rsvp={answers[event.id]}
              allTimeBest={best}
              onOpen={tab => onOpenEvent(event, tab)}
            />
          </li>
        ))}
      </ul>
      )}
        </section>
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
  } else if (!signedIn) {
    // Your laps need a sign-in; the events on it don't (#385).
    body = (
      <>
        <div className="mb-8"><SignInPrompt reason="see your lap times on this track" /></div>
        {authStatus !== 'loading' && eventsList}
      </>
    )
  } else if (loading || leaving) {
    body = <TrackSkeleton leaving={leaving} label="Loading your lap times" />
  } else if (laps.status === 'error') {
    body = (
      <div className="fade-in rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
        <p className="text-sm font-medium text-gray-700">Couldn’t load your lap times</p>
        <p className="mt-1 text-xs text-gray-400">Check your connection and try again.</p>
        <button
          onClick={laps.reload}
          className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Try again
        </button>
      </div>
    )
  } else {
    const noLaps = (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
        <Timer size={20} className="mx-auto text-gray-400" aria-hidden="true" />
        <p className="mt-2 text-sm font-medium text-gray-700">No lap times on {title?.name ?? 'this track'} yet</p>
        <p className="mt-1 text-xs text-gray-400">
          On an event’s Schedule tab, tap a session you drove to add your laps.
        </p>
      </div>
    )
    body = (
      <div className="fade-in">
        <div className="mb-8">
          {withLaps.length === 0 ? noLaps : (
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
          )}
        </div>
        {eventsList}
      </div>
    )
  }

  // Its events, or the driver's notes from them (#462), as the track's page has its tabs.
  const tabs = title !== null
  if (tabs && tab === 'notes') {
    body = signedIn
      ? <LayoutNotes events={onLayout} layout={heading} active={active} onOpenEvent={onOpenEvent} />
      : <SignInPrompt reason="see your notes from this track" />
  }

  return (
    <div className={`${PAGE_FILL} bg-gray-50`}>
      {header}
      {tabs && (
        // Under the bar, staying there, as on the track's page.
        <div className="sticky z-10 border-b border-gray-200 bg-gray-50" style={{ top: TOP_BAR_PX }}>
          <div className="mx-auto max-w-lg">
            <TabStrip
              tabs={[
                { id: 'events', label: `Events (${onLayout.length})` },
                { id: 'notes', label: 'My notes' },
              ]}
              active={tab} onChange={setTab} label="Track config section" idPrefix="layout" className="px-1 pt-4"
            />
          </div>
        </div>
      )}
      <div
        role={tabs ? 'tabpanel' : undefined}
        id={tabs ? `layout-tabpanel-${tab}` : undefined}
        aria-labelledby={tabs ? `layout-tab-${tab}` : undefined}
        className="mx-auto max-w-lg px-3 pt-4 sm:px-4 sm:pt-6 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
      >
        {body}
      </div>
    </div>
  )
}
