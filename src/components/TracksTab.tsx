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
 * them, or the ones theirs are on (#385). Opens its page.
 */
function TrackCard({ group, layouts, mine }: { group: TrackGroup; layouts: number; mine: boolean }) {
  const configurations = `${plural(layouts, 'configuration', 'configurations')}${mine ? ' driven' : ''}`
  return (
    <a
      href={trackPageHash(group.slug)}
      aria-label={`${group.name}${group.city ? `, ${group.city}` : ''}: ${configurations}`}
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
        {/* The shape in the room above the name, as far from the card's top
            as from the name, however many lines that takes. Flex, not
            grid: its square is taller than the room, and a grid row would
            grow to fit it. */}
        <div className="absolute inset-0 flex flex-col">
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <TrackShape trackId={group.trackId} width={215} className="shrink-0" fill="bg-white/60" />
          </div>
          <div className="px-4 pb-3.5">
            {/* Two lines rather than cut short: "Eagles Canyon Raceway". */}
            <h2 className="line-clamp-2 text-balance font-rubik text-[20px] font-bold leading-tight text-white">{group.name}</h2>
            <p className="mt-0.5 truncate text-sm text-white/85">{[group.city, configurations].filter(Boolean).join(' · ')}</p>
          </div>
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
 * first, with how many layouts it has — every one, or, signed in, on Mine
 * (#385), only the tracks the driver has events at (ones they're going to
 * or went to, or have sessions at, #320), and on how many layouts. Each
 * opens its page.
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
              layouts={group.layouts.length}
              mine={mine}
            />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="bg-gray-50">
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
