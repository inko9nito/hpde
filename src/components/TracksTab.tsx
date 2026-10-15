import { useMemo } from 'react'
import { ChevronRight } from 'lucide-react'
import { HomeHeader } from './HomeTabs'
import { EventsFilterToggle } from './EventsFilterToggle'
import type { EventsFilter } from './EventsFilterToggle'
import { TrackShape } from './TrackPhoto'
import { CARD_FRAME, EmptyRow } from './EventCard'
import { trackPageHash } from './TrackPage'
import { plural } from './LapSessions'
import { useEvents } from '../data/EventsContext'
import { useAuth } from '../auth/AuthContext'
import { useLapSummaryStatus } from '../data/lapLog'
import { useRsvps } from '../data/RsvpsContext'
import { goingIds } from '../utils/rsvp'
import { layoutLaps, layoutsOf, trackGroups } from '../utils/trackStats'
import type { TrackGroup } from '../utils/trackStats'

// The card's photo band: about as the design has it (#346), 2.6 times as
// wide as tall.
const BAND = 'h-[136px]'

/**
 * One track (#346): its photo with its full course's shape over it, its
 * name and where it is, and how many events and layouts — all of them, or
 * theirs (#385). Opens its page.
 */
function TrackCard({ group, events, layouts, mine }: { group: TrackGroup; events: number; layouts: number; mine: boolean }) {
  const counts = `${plural(events, 'event', 'events')} · ${plural(layouts, 'configuration', 'configurations')}${mine ? ' driven' : ''}`
  return (
    <a
      href={trackPageHash(group.slug)}
      aria-label={`${group.name}${group.city ? `, ${group.city}` : ''}: ${counts}`}
      className={`${CARD_FRAME} block overflow-hidden transition-colors hover:border-gray-400`}
    >
      <div className={`relative ${BAND} overflow-hidden bg-black`}>
        {group.info?.photo && (
          <img
            src={group.info.photo}
            alt=""
            data-track-photo={group.slug}
            className="absolute inset-0 h-full w-full object-cover opacity-75"
            style={{ objectPosition: `${group.info.photoX} 50%` }}
          />
        )}
        {/* Flex, not grid: its square is taller than the band, and a grid row would grow to fit it. */}
        <div className="absolute inset-0 flex items-center justify-center">
          <TrackShape trackId={group.trackId} width={168} className="shrink-0" />
        </div>
      </div>
      <div className="flex items-center gap-3 py-3.5 pl-4 pr-3">
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-rubik text-[17px] font-semibold leading-tight text-gray-900">{group.name}</h2>
          {group.city && <div className="mt-0.5 truncate text-sm text-gray-700">{group.city}</div>}
          <div className="mt-1 truncate text-sm text-gray-500">{counts}</div>
        </div>
        <ChevronRight size={20} className="shrink-0 text-gray-300" aria-hidden="true" />
      </div>
    </a>
  )
}

function TrackCardSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading tracks" className={`${CARD_FRAME} overflow-hidden`}>
      <div className={`${BAND} animate-pulse bg-gray-100`} />
      <div className="space-y-2 p-4">
        <div className="h-4 w-2/5 animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-3/5 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  )
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
