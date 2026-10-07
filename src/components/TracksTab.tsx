import { useMemo } from 'react'
import { ChevronRight, RotateCcw, RotateCw } from 'lucide-react'
import { HomeHeader } from './HomeTabs'
import { EventsFilterToggle } from './EventsFilterToggle'
import type { EventsFilter } from './EventsFilterToggle'
import { TrackIcon } from './TrackIcon'
import { CARD_FRAME, EmptyRow } from './EventCard'
import { trackHash } from './TrackLapsPage'
import { plural } from './LapSessions'
import { useEvents } from '../data/EventsContext'
import { useAuth } from '../auth/AuthContext'
import { useLapSummaryStatus } from '../data/lapLog'
import { useRsvps } from '../data/RsvpsContext'
import { goingIds } from '../utils/rsvp'
import { layoutLaps, layoutsOf, trackGroups } from '../utils/trackStats'
import type { Layout, TrackGroup } from '../utils/trackStats'

// The track's panel: wider than tall, unlike an event card's square tile,
// so a track row doesn't read as an event (#274). As tall as the Events
// list's rows (82px); a little narrower on the narrowest phones, to leave
// the name room.
const THUMB = 'w-24 min-[375px]:w-28 min-h-[80px]'
// The track icon's square frame, in px: the shape fills about four fifths
// of its width (#314).
const ICON = 84

/**
 * One layout: its shape on a wide dark panel along the card's left edge,
 * its name, and how many events are on it: all of them, or yours (#385).
 * Opens its track page, with those events and your laps.
 */
function TrackRow({ layout, count }: { layout: Layout; count: number }) {
  const DirectionIcon = layout.direction === 'ccw' ? RotateCcw : RotateCw
  return (
    <a
      href={trackHash(layout.slug)}
      className={`${CARD_FRAME} flex items-stretch overflow-hidden transition-colors hover:border-gray-400`}
    >
      {/* Flush with the card's left, top and bottom; its corners are the card's. */}
      <div className={`${THUMB} relative shrink-0 overflow-hidden bg-gray-900`}>
        {/* Taller than the panel, but the shape is a band across its middle:
            placed over the panel, so it doesn't stretch the card. */}
        <div className="absolute inset-0 grid place-items-center">
          <TrackIcon trackId={layout.trackId} tone="dark" size={ICON} padding={0} radius="rounded-none" />
        </div>
        {/* Which way round it's driven (#307); the name says so too, as CW or CCW. */}
        {layout.direction && (
          <DirectionIcon
            size={14}
            strokeWidth={2.25}
            data-direction={layout.direction}
            className="absolute bottom-1.5 right-1.5 text-white/60"
            aria-hidden="true"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-4 py-4 pl-4 pr-3">
        <div className="min-w-0 flex-1">
          <div className="truncate font-rubik text-[15px] font-semibold leading-tight text-gray-900">{layout.name}</div>
          {/* Events, not the sessions (#314, #320). */}
          <div className="mt-0.5 truncate text-sm text-gray-500">{plural(count, 'event', 'events')}</div>
        </div>
        <ChevronRight size={18} className="-ml-2 shrink-0 text-gray-300" aria-hidden="true" />
      </div>
    </a>
  )
}

/** A track's layouts under its name and where it is (#314). */
function TrackSection({ group, countOf }: { group: TrackGroup; countOf: (layout: Layout) => number }) {
  return (
    <section aria-label={group.name}>
      <div className="mb-2">
        <h2 className="truncate font-rubik text-sm font-semibold text-gray-700">{group.name}</h2>
        {group.city && <div className="truncate text-xs text-gray-500">{group.city}</div>}
      </div>
      <ul className="space-y-4">
        {group.layouts.map(layout => (
          <li key={layout.slug}>
            <TrackRow layout={layout} count={countOf(layout)} />
          </li>
        ))}
      </ul>
    </section>
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
 * The Tracks tab (#274): the track layouts, grouped by track (#314), each
 * with how many events are on it — every layout and every event on it, or,
 * signed in, on Mine (#385), only the layouts the driver has events on and
 * how many: ones they're going to or went to, or have sessions at (#320).
 * Each opens its track page, with those events.
 */
export function TracksTab({ filter, onFilter }: { filter: EventsFilter; onFilter: (f: EventsFilter) => void }) {
  const { events, loaded } = useEvents()
  const { status } = useAuth()
  const signedIn = status === 'signed-in'
  const summary = useLapSummaryStatus(signedIn)
  const { status: rsvpsStatus, rsvps } = useRsvps()
  // The events they said yes to; none if their answers couldn't load.
  const going = useMemo(
    () => (rsvpsStatus === 'loading' ? null : goingIds(events, rsvps)),
    [rsvpsStatus, events, rsvps],
  )
  const mine = signedIn && filter === 'mine'
  const layouts = useMemo(() => layoutsOf(events), [events])
  // On Mine, how many of theirs are on each, once their laps and answers are in.
  const counts = useMemo(() => {
    if (!mine) return new Map(layouts.map(l => [l.slug, l.events.length]))
    if (!summary.events || !going) return null
    const theirs = summary.events
    return new Map(layouts.map(l => [l.slug, layoutLaps(l, theirs, going).events]))
  }, [mine, layouts, summary.events, going])
  const groups = useMemo(
    () => (counts ? trackGroups(layouts.filter(l => counts.get(l.slug)! > 0)) : []),
    [counts, layouts],
  )

  let list
  if (mine && summary.status === 'error') list = <EmptyRow>Couldn’t load your tracks.</EmptyRow>
  else if (!counts || (groups.length === 0 && !loaded)) list = <TrackRowSkeleton />
  else if (groups.length === 0) list = <EmptyRow>{mine ? 'No tracks of yours yet.' : 'No tracks yet.'}</EmptyRow>
  else {
    list = (
      <ul className="space-y-6" aria-label="Tracks">
        {groups.map(group => (
          <li key={group.name}>
            <TrackSection group={group} countOf={layout => counts.get(layout.slug) ?? 0} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">
        <HomeHeader title="Tracks">
          {/* All or theirs (#385), as on the Events tab. */}
          {signedIn && (
            <div className="mt-4">
              <EventsFilterToggle filter={filter} onChange={onFilter} label="Which tracks" mineLabel="Mine" />
            </div>
          )}
        </HomeHeader>
        {list}
      </div>
    </div>
  )
}
