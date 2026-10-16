import { useMemo } from 'react'
import { HomeHeader } from './HomeTabs'
import { EventsFilterToggle } from './EventsFilterToggle'
import type { EventsFilter } from './EventsFilterToggle'
import { TrackShape } from './TrackPhoto'
import { EmptyRow } from './EventCard'
import { trackPageHash } from './TrackPage'
import { plural } from './LapSessions'
import { useEvents } from '../data/EventsContext'
import { useAuth } from '../auth/AuthContext'
import { useLapSummaryStatus } from '../data/lapLog'
import { useRsvps } from '../data/RsvpsContext'
import { goingIds } from '../utils/rsvp'
import { layoutLaps, layoutsOf, trackGroups } from '../utils/trackStats'
import type { TrackGroup } from '../utils/trackStats'

/**
 * One track (#346), as the Garage shows a car (#410): its photo, dimmed on
 * black as its page has it, with its full course's shape over the middle;
 * its name and where it is over the foot, with how many layouts — all of
 * them, or theirs (#385) — and how many events across from them. Opens
 * its page.
 */
function TrackCard({ group, events, layouts, mine }: { group: TrackGroup; events: number; layouts: number; mine: boolean }) {
  const configurations = `${plural(layouts, 'configuration', 'configurations')}${mine ? ' driven' : ''}`
  const count = plural(events, 'event', 'events')
  return (
    <a
      href={trackPageHash(group.slug)}
      aria-label={`${group.name}${group.city ? `, ${group.city}` : ''}: ${count} · ${configurations}`}
      className="block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors hover:border-gray-300"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
        {group.info?.photo && (
          // At 60% on black, as on the track's page.
          <img
            src={group.info.photo}
            alt=""
            data-track-photo={group.slug}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
            style={{ objectPosition: `${group.info.photoX} 50%` }}
          />
        )}
        {/* Dark enough at the foot for the name to read, as the Garage's. */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/35 to-transparent" aria-hidden="true" />
        {/* Over the photo above the name. Flex, not grid: its square is
            taller than the room, and a grid row would grow to fit it. */}
        <div className="absolute inset-x-0 top-0 flex h-[62%] items-center justify-center">
          <TrackShape trackId={group.trackId} width={150} className="shrink-0" />
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 px-4 pb-3.5">
          <div className="min-w-0 flex-1">
            {/* Two lines rather than cut short beside the events: "Eagles Canyon Raceway". */}
            <h2 className="line-clamp-2 text-balance font-rubik text-[20px] font-bold leading-tight text-white">{group.name}</h2>
            <p className="mt-0.5 truncate text-sm text-white/85">{[group.city, configurations].filter(Boolean).join(' · ')}</p>
          </div>
          <span className="block shrink-0 rounded-full bg-white/90 px-2.5 py-1 text-[13px] font-semibold tabular-nums text-gray-900 shadow-sm" data-events-badge>
            {count}
          </span>
        </div>
      </div>
    </a>
  )
}

function TrackCardSkeleton() {
  return <div aria-busy="true" aria-label="Loading tracks" className="aspect-[16/9] animate-pulse rounded-2xl border border-gray-200 bg-white" />
}

/**
 * The Tracks tab (#274): each track (#346), the one with the latest event
 * first, with how many events and layouts it has — every one, or, signed
 * in, on Mine (#385), only the tracks the driver has events at and how
 * many: ones they're going to or went to, or have sessions at (#320), and
 * on how many layouts. Each opens its page.
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
  // On Mine, how many of theirs are on each layout, once their laps and answers are in.
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
  else if (!counts || (groups.length === 0 && !loaded)) list = <TrackCardSkeleton />
  else if (groups.length === 0) list = <EmptyRow>{mine ? 'No tracks of yours yet.' : 'No tracks yet.'}</EmptyRow>
  else {
    list = (
      <ul className="space-y-4" aria-label="Tracks">
        {groups.map(group => (
          <li key={group.slug}>
            <TrackCard
              group={group}
              events={group.layouts.reduce((n, l) => n + (counts.get(l.slug) ?? 0), 0)}
              layouts={group.layouts.length}
              mine={mine}
            />
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
