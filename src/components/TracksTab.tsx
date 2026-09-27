import { useMemo } from 'react'
import { ChevronRight } from 'lucide-react'
import { HomeHeader } from './HomeTabs'
import { TrackIcon } from './TrackIcon'
import { CARD_FRAME, EmptyRow } from './LandingPage'
import { trackHash } from './TrackLapsPage'
import { plural } from './LapSessions'
import { useEvents } from '../data/EventsContext'
import { useAuth } from '../auth/AuthContext'
import { useLapSummary } from '../data/lapLog'
import { layoutLaps, layoutsOf } from '../utils/trackStats'
import type { EventBest, Layout } from '../utils/trackStats'
import { formatLapTime } from '../utils/lapTimes'

// The track's panel: wider than tall, unlike an event card's square tile,
// so a track row doesn't read as an event (#274). As tall as the Events
// list's rows (82px); a little narrower on the narrowest phones, to leave
// the name room.
const THUMB = 'w-24 min-[375px]:w-28 min-h-[80px]'

/**
 * One layout: its shape on a wide dark panel along the card's left edge,
 * its name, and your best lap there. Opens its track page.
 */
function TrackRow({ layout, summary }: { layout: Layout; summary: EventBest[] | null }) {
  const laps = summary ? layoutLaps(layout, summary) : null
  return (
    <a
      href={trackHash(layout.slug)}
      className={`${CARD_FRAME} flex items-stretch overflow-hidden transition-colors hover:border-gray-400`}
    >
      {/* Flush with the card's left, top and bottom; its corners are the card's. */}
      <div className={`${THUMB} grid shrink-0 place-items-center bg-gray-900`}>
        <TrackIcon trackId={layout.trackId} tone="dark" size={64} padding={0} radius="rounded-none" />
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-4 py-4 pl-4 pr-3">
        <div className="min-w-0 flex-1">
          <div className="truncate font-rubik text-[15px] font-semibold leading-tight text-gray-900">{layout.name}</div>
          <div className="mt-0.5 truncate text-sm text-gray-500">
            {layout.track ?? plural(layout.events.length, 'event', 'events')}
          </div>
        </div>
        {/* Only with laps to show, leaving the track's name room otherwise. */}
        {laps?.best !== undefined && (
          <div className="flex shrink-0 flex-col items-end">
            <span className="font-mono text-[15px] font-semibold tabular-nums text-gray-900">{formatLapTime(laps.best)}</span>
            <span className="mt-0.5 text-xs text-gray-400">{plural(laps.sessions, 'session', 'sessions')}</span>
          </div>
        )}
        <ChevronRight size={18} className="-ml-2 shrink-0 text-gray-300" aria-hidden="true" />
      </div>
    </a>
  )
}

function TrackRowSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading tracks" className={`${CARD_FRAME} flex items-stretch overflow-hidden`}>
      <div className={`${THUMB} shrink-0 animate-pulse bg-gray-100`} />
      <div className="min-w-0 flex-1 space-y-2 p-4">
        <div className="h-3.5 w-2/5 animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-3/5 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  )
}

/**
 * The Tracks tab (#274): every track layout the events are on, with the
 * driver's best lap on each once they're signed in. Each opens its track
 * page, with every session they've logged there.
 */
export function TracksTab() {
  const { events, loaded } = useEvents()
  const { status } = useAuth()
  const layouts = useMemo(() => layoutsOf(events), [events])
  const summary = useLapSummary(status === 'signed-in')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">
        <HomeHeader title="Tracks">
          <p className="mt-2 text-sm text-gray-500">
            {status === 'signed-in'
              ? 'Your lap times at each track, across every event.'
              : 'Sign in to see your lap times at each track, across every event.'}
          </p>
        </HomeHeader>
        {layouts.length === 0 ? (
          loaded ? <EmptyRow>No tracks yet.</EmptyRow> : <TrackRowSkeleton />
        ) : (
          <ul className="space-y-4" aria-label="Tracks">
            {layouts.map(layout => (
              <li key={layout.slug}>
                <TrackRow layout={layout} summary={summary} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
