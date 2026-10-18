import { useEffect, useMemo, useState } from 'react'
import { ChevronRight, ExternalLink, MapPin, RotateCcw, RotateCw } from 'lucide-react'
import { TrackIcon } from './TrackIcon'
import { TOP_BAR_PX, TrackShape, TrackTopBar, UNDER_BAR } from './TrackPhoto'
import { CARD_FRAME, EmptyRow, EventCard } from './EventCard'
import { TabStrip } from './EventTabs'
import { MapsSheet } from './MapsSheet'
import { EventsFilterToggle } from './EventsFilterToggle'
import type { EventsFilter } from './EventsFilterToggle'
import { trackHash } from './TrackLapsPage'
import { plural } from './LapSessions'
import { useAuth } from '../auth/AuthContext'
import { useLapSummaryStatus } from '../data/lapLog'
import { useRsvps } from '../data/RsvpsContext'
import { goingIds, myRunGroup } from '../utils/rsvp'
import { classifyEvent, partitionEvents } from '../utils/eventClass'
import { formatLapTime } from '../utils/lapTimes'
import { layoutLaps, layoutTitle, trackGroup } from '../utils/trackStats'
import { useScrolledPast } from '../utils/useScrolledPast'
import type { Layout, TrackGroup } from '../utils/trackStats'
import type { EventConfig } from '../types'
import { PAGE_FILL } from './PushPage'

export const TRACK_PAGE_HASH_PREFIX = '#/tracks/'

/** A track's page (#346), under the Tracks tab: `#/tracks/msrc`. Its layouts' pages are `#/track/…`. */
export function trackPageHash(slug: string): string {
  return `${TRACK_PAGE_HASH_PREFIX}${encodeURIComponent(slug)}`
}

export function trackPageSlugFromHash(hash: string): string | null {
  if (!hash.startsWith(TRACK_PAGE_HASH_PREFIX)) return null
  return decodeURIComponent(hash.slice(TRACK_PAGE_HASH_PREFIX.length).split('/')[0]) || null
}

/** "1.7 mile · Clockwise", or the layout's short name when its events don't say. */
function layoutText(layout: Layout): string {
  const { length, direction } = layoutTitle(layout.events[0])
  return [length, direction].filter(Boolean).join(' · ') || layout.name
}

/** "1 event", "3 events" — or "No events", on Mine at a layout none of theirs are on. */
function eventCount(n: number): string {
  return n === 0 ? 'No events' : plural(n, 'event', 'events')
}

/**
 * A layout's shape on a dark panel along a card's left edge (#274), with
 * which way round it goes in its corner: the track page's layouts, and an
 * event's past events at its layout (#462).
 */
export function LayoutTile({ trackId, direction }: { trackId?: string; direction?: 'cw' | 'ccw' }) {
  const DirectionIcon = direction === 'ccw' ? RotateCcw : RotateCw
  return (
    <div className="relative w-20 min-h-[64px] shrink-0 overflow-hidden bg-gray-900">
      <div className="absolute inset-0 grid place-items-center">
        <TrackIcon trackId={trackId} tone="dark" size={64} padding={0} radius="rounded-none" />
      </div>
      {direction && (
        <DirectionIcon
          size={13}
          strokeWidth={2.25}
          data-direction={direction}
          className="absolute bottom-1.5 right-1.5 text-white/60"
          aria-hidden="true"
        />
      )}
    </div>
  )
}

/**
 * One of the track's layouts (#346): its shape on a dark panel along the
 * card's left edge (#274), how far round and which way, and how many
 * events are on it — all of them, or theirs — with their best lap there.
 * Opens its own page.
 */
function LayoutRow({ layout, count, best }: { layout: Layout; count: number; best?: number }) {
  const { length, direction } = layoutTitle(layout.events[0])
  return (
    <a
      href={trackHash(layout.slug)}
      aria-label={`${layoutText(layout)}, ${eventCount(count)}`}
      className={`${CARD_FRAME} flex items-stretch overflow-hidden transition-colors hover:border-gray-400`}
    >
      <LayoutTile trackId={layout.trackId} direction={layout.direction} />
      <div className="flex min-w-0 flex-1 items-center gap-4 py-3 pl-4 pr-3">
        <div className="min-w-0 flex-1">
          {/* How far round, and which way beside it. */}
          <div className="flex min-w-0 items-baseline gap-1.5 font-rubik text-[15px] leading-tight">
            <span className="shrink-0 font-semibold text-gray-900">{length ?? layout.name}</span>
            {direction && <span className="min-w-0 truncate text-gray-500">{direction}</span>}
          </div>
          <div className="mt-1 truncate text-sm text-gray-500">
            {eventCount(count)}
            {best !== undefined && <> · Best <span className="font-mono tabular-nums text-gray-700">{formatLapTime(best)}</span></>}
          </div>
        </div>
        <ChevronRight size={18} className="-ml-2 shrink-0 text-gray-300" aria-hidden="true" />
      </div>
    </a>
  )
}

const SECTION_HEADING = 'font-rubik text-xs font-medium uppercase tracking-[0.15em] text-gray-500'

/**
 * Where it is (#346), plainly, under its layouts: its address — or its
 * city, when that's all there is. Tapped, its address asks which maps app
 * to open it in, with the icon iOS uses for going elsewhere.
 */
function Location({ group }: { group: TrackGroup }) {
  const [picking, setPicking] = useState(false)
  const address = group.info?.address
  if (!address && !group.city) return null
  // "9012 Performance Ct" over "Cresson, TX 76035".
  const comma = address?.indexOf(',') ?? -1
  const lines = address && comma > 0 ? [address.slice(0, comma), address.slice(comma + 1).trim()] : [address ?? group.city!]
  const text = (
    <>
      <MapPin size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-gray-400" aria-hidden="true" />
      <span className="min-w-0 flex-1">
        {lines.map(line => <span key={line} className="block">{line}</span>)}
      </span>
    </>
  )
  return (
    <section aria-label="Location">
      <h2 className={`mb-2 px-1 ${SECTION_HEADING}`}>Location</h2>
      {address ? (
        <button
          onClick={() => setPicking(true)}
          aria-label={`${address}: open in Maps`}
          className="flex w-full items-start gap-2 px-1 text-left text-[15px] leading-snug text-gray-600 transition-colors hover:text-gray-900"
        >
          {text}
          <ExternalLink size={18} className="shrink-0 self-center text-gray-400" aria-hidden="true" />
        </button>
      ) : (
        <p className="flex items-start gap-2 px-1 text-[15px] leading-snug text-gray-600">{text}</p>
      )}
      {picking && address && <MapsSheet name={group.name} address={address} onClose={() => setPicking(false)} />}
    </section>
  )
}

type TrackTab = 'layouts' | 'events'

interface Props {
  slug: string
  /** Every event, to find the ones at this track. */
  events: EventConfig[]
  eventsLoaded: boolean
  /** Every event at it, or theirs (#385), as on the Tracks tab. */
  filter: EventsFilter
  onFilter: (f: EventsFilter) => void
  onBack: () => void
  onOpenEvent: (event: EventConfig) => void
  /** To the Tracks tab, when there's no such track. */
  onAllTracks: () => void
  /** Whether its title has scrolled up into the top bar, which is gray-50 then, not over the photo. */
  onCollapsedChange?: (collapsed: boolean) => void
}

/**
 * A track's page (#346, HPDE Figma 2079:1128): its photo, dimmed on black,
 * with its name and its full course's shape over it; then, on a panel
 * over the photo's foot, two tabs, as a car's page has: its layouts —
 * each opens its own page (#274) — with where it is under them, and
 * every event at it, or theirs.
 */
export function TrackPage({ slug, events, eventsLoaded, filter, onFilter, onBack, onOpenEvent, onAllTracks, onCollapsedChange }: Props) {
  const group = useMemo(() => trackGroup(slug, events), [slug, events])
  const { status: authStatus } = useAuth()
  const signedIn = authStatus === 'signed-in'
  const summary = useLapSummaryStatus(signedIn)
  const { status: rsvpsStatus, rsvps } = useRsvps()
  const going = useMemo(() => (rsvpsStatus === 'loading' ? null : goingIds(events, rsvps)), [rsvpsStatus, events, rsvps])
  const mine = signedIn && filter === 'mine'
  // Theirs: at it, or said they're going (#320) — once both are in.
  const theirs = useMemo(() => {
    if (!signedIn || !summary.events || !going) return null
    const driven = new Set(summary.events.filter(s => s.sessions > 0).map(s => s.eventId))
    return new Set([...driven, ...going])
  }, [signedIn, summary.events, going])

  // A ref that re-renders: the title is only there once the track's found.
  const [title, setTitle] = useState<HTMLElement | null>(null)
  const collapsed = useScrolledPast(title, TOP_BAR_PX)
  useEffect(() => {
    onCollapsedChange?.(collapsed)
  }, [collapsed])

  const name = group?.name ?? ''
  const info = group?.info
  const [tab, setTab] = useState<TrackTab>('layouts')

  let body
  if (!group) {
    body = eventsLoaded ? (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
        <p className="text-sm font-medium text-gray-700">No event is at this track</p>
        <p className="mt-1 text-xs text-gray-400">It may have been renamed or deleted.</p>
        <button
          onClick={onAllTracks}
          className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          See all tracks
        </button>
      </div>
    ) : (
      <div aria-busy="true" aria-label="Loading track" className="space-y-3">
        <div className="h-16 animate-pulse rounded-xl bg-gray-100" />
        <div className="h-20 animate-pulse rounded-xl bg-gray-100" />
      </div>
    )
  } else {
    const listed = mine && theirs ? group.events.filter(e => theirs.has(e.id)) : group.events
    const { live, upcoming, past } = partitionEvents(listed)
    const groupOf = (e: EventConfig) => {
      const id = myRunGroup(e, rsvps[e.id])
      return id ? e.runGroups.find(g => g.id === id) : undefined
    }
    const card = (e: EventConfig) => (
      <li key={e.id}>
        <EventCard event={e} muted={classifyEvent(e) === 'past'} live={classifyEvent(e) === 'live'} group={groupOf(e)} onClick={() => onOpenEvent(e)} />
      </li>
    )
    const countOf = (layout: Layout) => (mine && theirs ? layout.events.filter(e => theirs.has(e.id)).length : layout.events.length)
    body = tab === 'layouts' ? (
      <div className="space-y-8">
        <ul className="space-y-3" aria-label="Configurations">
          {group.layouts.map(layout => (
            <li key={layout.slug}>
              <LayoutRow
                layout={layout}
                count={countOf(layout)}
                best={signedIn && summary.events ? layoutLaps(layout, summary.events).best : undefined}
              />
            </li>
          ))}
        </ul>
        <Location group={group} />
      </div>
    ) : (
      <>
        {/* As on a layout's page (#385): every event at it, or theirs. */}
        {signedIn && (
          <div className="mb-4 flex justify-end">
            <EventsFilterToggle filter={filter} onChange={onFilter} mineLabel="Mine" />
          </div>
        )}
        {mine && !theirs ? (
          summary.status === 'error' ? <EmptyRow>Couldn’t load your events here.</EmptyRow> : <div aria-busy="true" aria-label="Loading your events" className="h-20 animate-pulse rounded-xl bg-gray-100" />
        ) : listed.length === 0 ? (
          <EmptyRow>None of yours here yet.</EmptyRow>
        ) : (
          <div className="space-y-6">
            {live.length + upcoming.length > 0 && (
              <section aria-labelledby="track-upcoming-heading">
                <h2 id="track-upcoming-heading" className={`mb-2 ${SECTION_HEADING}`}>Upcoming</h2>
                <ul className="space-y-3" aria-label="Upcoming events">{[...live, ...upcoming].map(card)}</ul>
              </section>
            )}
            {past.length > 0 && (
              <section aria-labelledby="track-past-heading">
                <h2 id="track-past-heading" className={`mb-2 ${SECTION_HEADING}`}>Past</h2>
                <ul className="space-y-3" aria-label="Past events">{past.map(card)}</ul>
              </section>
            )}
          </div>
        )}
      </>
    )
  }

  return (
    <div className={`${PAGE_FILL} bg-gray-50`}>
      <TrackTopBar title={name} collapsed={collapsed} onBack={onBack} />
      {/* The design's header, 375 pt wide: everything placed from the
          status bar's foot, as there. */}
      <header className="relative overflow-hidden bg-black text-white" style={{ ...UNDER_BAR, height: 358 }}>
        {info?.photo && (
          // At its natural size on a phone, 640 × 364 pt, dimmed to 60% on black.
          <img
            src={info.photo}
            alt=""
            data-track-photo={group?.slug}
            className="absolute inset-x-0 w-full object-cover opacity-60"
            style={{ top: -6, height: 364, objectPosition: `${info.photoX} 50%` }}
          />
        )}
        {/* Black to clear, up from the panel's edge (the design's Bottom fade, at 80%)… */}
        <div
          className="absolute inset-x-0 opacity-80"
          style={{ top: 178, height: 179, backgroundImage: 'linear-gradient(to top, #000 39.753%, rgba(0, 0, 0, 0) 99.304%)' }}
        />
        {/* …and down from under the bar (its Top fade). */}
        <div
          className="absolute inset-x-0"
          style={{ top: 0, height: 113, backgroundImage: 'linear-gradient(to bottom, #000 19.391%, rgba(0, 0, 0, 0) 99.304%)' }}
        />
        <div className="absolute inset-x-0 flex flex-col items-center gap-1.5 px-4 text-center font-rubik" style={{ top: TOP_BAR_PX }}>
          {group ? (<>
            <h1 ref={setTitle} className="max-w-full truncate text-[20px] font-bold leading-normal">{name}</h1>
            {group.city && <p className="max-w-full truncate text-base leading-normal">{group.city}</p>}
          </>) : !eventsLoaded && (
            <div className="h-6 w-44 animate-pulse rounded bg-white/15" aria-hidden="true" />
          )}
        </div>
        {group && (
          // Its full course, centred, 266 pt across.
          <div className="absolute inset-x-0 flex justify-center" style={{ top: 137 }}>
            <TrackShape trackId={group.trackId} width={266} className="-mt-[120px]" />
          </div>
        )}
      </header>
      <div
        // Clipped to its round corners, the tabs' gray too — clip, not
        // hidden, so the tabs still stick under the bar.
        className="relative rounded-t-[20px] bg-gray-50 [overflow:clip]"
        // Over the photo's foot, from 292 pt below the status bar.
        style={{ marginTop: -66 }}
      >
        {group && (
          // As a car's page has them (#410): under the bar, staying there.
          <div className="sticky z-10 border-b border-gray-200 bg-gray-50" style={{ top: TOP_BAR_PX }}>
            <div className="mx-auto max-w-lg">
              <TabStrip
                tabs={[
                  { id: 'layouts', label: 'Configurations' },
                  { id: 'events', label: group.events.length ? `Events (${group.events.length})` : 'Events' },
                ]}
                active={tab} onChange={setTab} label="Track section" idPrefix="track" className="px-1 pt-4"
              />
            </div>
          </div>
        )}
        <div
          role={group ? 'tabpanel' : undefined}
          id={group ? `track-tabpanel-${tab}` : undefined}
          aria-labelledby={group ? `track-tab-${tab}` : undefined}
          className="mx-auto max-w-lg px-3 pt-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-4"
        >
          {body}
        </div>
      </div>
    </div>
  )
}
