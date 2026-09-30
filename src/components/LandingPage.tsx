import { useState, useEffect } from 'react'
import { Calendar as CalendarIcon, Check, CircleHelp, List, Plus } from 'lucide-react'
import { useEvents } from '../data/EventsContext'
import { useRsvps } from '../data/RsvpsContext'
import { answerFor, myEvents, needsAnswer } from '../utils/rsvp'
import { RsvpPicker } from './RsvpPicker'
import { useAuth } from '../auth/AuthContext'
import { ADMIN_ROLE } from './NewEventPage'
import { partitionEvents } from '../utils/eventClass'
import { DateBlock } from './DateBlock'
import { EventCalendar } from './EventCalendar'
import { Footer } from './Footer'
import { FadedTrack, TrackIcon } from './TrackIcon'
import { HomeHeader } from './HomeTabs'
import { StatusBadge } from './EventHeader'
import type { EventConfig } from '../types'

interface Props {
  onOpenEvent: (event: EventConfig) => void
}

type LandingView = 'list' | 'calendar'

function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue] as const
}

// Soft, low shadow under every card (a touch of lift, not a float).
const CARD_SHADOW = 'shadow-[0_1px_2px_rgba(17,24,39,0.04),0_4px_12px_rgba(17,24,39,0.05)]'
// Inner padding of a card's date + title row.
const CARD_PADDING = 'p-4'

/** A card's frame: border, corners, shadow — the Tracks tab's rows too (#274). */
export const CARD_FRAME = `w-full rounded-xl border border-gray-200 bg-white ${CARD_SHADOW}`

/** A card's box: its frame and padding. */
const CARD_BOX = `${CARD_FRAME} ${CARD_PADDING}`

// Every compact row on the page — past event card, loading skeleton,
// empty state — shares this shell (p-4 + 48px tile + border = 82px),
// so swapping between them never shifts the page.
export const CARD_SHELL = `flex items-center gap-4 ${CARD_BOX}`

/** Event name (with a LIVE pill when it's on today) over its organizer. */
export function EventTitle({ event, live }: { event: EventConfig; live: boolean }) {
  return (
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <span className="truncate font-rubik text-[15px] font-semibold leading-tight text-gray-900">
          {event.name}
        </span>
        {live && <StatusBadge status="live" size="sm" />}
      </div>
      <div className="mt-0.5 truncate text-sm text-gray-500">
        {event.organizer ?? 'Organizer not set'}
      </div>
    </div>
  )
}

function EventCard({
  event,
  muted,
  live,
  onClick,
}: {
  event: EventConfig
  muted: boolean
  live: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`${CARD_SHELL} text-left transition-colors ${
        muted ? 'hover:border-gray-300' : 'hover:border-gray-400'
      }`}
    >
      <DateBlock event={event} muted={muted} />
      <EventTitle event={event} live={live} />
      {/* Same dark tile as the event page header; no padding, the SVGs
          carry their own margin. */}
      <TrackIcon trackId={event.trackId} tone="dark" size={48} padding={0} radius="rounded-xl" />
    </button>
  )
}

/** An upcoming (or live) event (#276): one near-black card, the shape
 *  of the widget's Medium countdown, with the track large behind it,
 *  running off the right edge and fading away down to the left (#292),
 *  then along the bottom the date, a hairline divider, and the name
 *  over the organizer. A live event gets the same LIVE badge as the
 *  event page's date line. */
function FeaturedEventCard({
  event,
  live,
  rsvp,
  onClick,
}: {
  event: EventConfig
  live: boolean
  /**
   * Signed in (#235): their answer, as a badge — or 'ask', waiting on it,
   * with a Join event button in the corner that offers the choices.
   */
  rsvp?: 'going' | 'maybe' | 'ask'
  onClick: () => void
}) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="relative flex aspect-[364/170] w-full flex-col justify-end overflow-hidden rounded-2xl border border-gray-900 bg-gray-900 text-left shadow-[0_2px_4px_rgba(17,24,39,0.08),0_12px_28px_rgba(17,24,39,0.18)] transition-colors hover:border-gray-500"
      >
        <FadedTrack trackId={event.trackId} />
        {/* Same left inset and date column as the past cards, so the date
            stacks line up down the page; painted above the track. Clear
            of the Join event button when there is one. */}
        <div className={`relative flex items-center gap-4 ${CARD_PADDING} ${rsvp === 'ask' ? 'pr-32' : ''}`}>
          <DateBlock event={event} muted={false} dark />
          <div aria-hidden="true" className="w-px self-stretch bg-gray-700" />
          <div className="min-w-0 flex-1">
            <div className="truncate font-rubik text-[17px] font-semibold leading-tight text-white">
              {event.name}
            </div>
            <div className="mt-1 flex min-w-0 items-center gap-2.5">
              <span className="truncate text-sm text-gray-400">
                {event.organizer ?? 'Organizer not set'}
              </span>
              {live && <StatusBadge status="live" />}
              {(rsvp === 'going' || rsvp === 'maybe') && <RsvpBadge rsvp={rsvp} />}
            </div>
          </div>
        </div>
      </button>
      {/* Beside the card's button, not in it: a button can't hold another. */}
      {rsvp === 'ask' && (
        <div className="absolute bottom-4 right-4">
          <RsvpPicker event={event} status={live ? 'live' : 'upcoming'} variant="card" />
        </div>
      )}
    </div>
  )
}

/** On a dark featured card: Going or Maybe (#235). */
function RsvpBadge({ rsvp }: { rsvp: 'going' | 'maybe' }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 font-rubik text-[11px] font-medium leading-none ${
        rsvp === 'going' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-amber-400/15 text-amber-300'
      }`}
    >
      {rsvp === 'going' ? <Check size={11} strokeWidth={3} aria-hidden="true" /> : <CircleHelp size={11} strokeWidth={2.5} aria-hidden="true" />}
      {rsvp === 'going' ? 'Going' : 'Maybe'}
    </span>
  )
}

type EventsFilter = 'all' | 'mine'

/** Every event, or only theirs (#235) — signed in. */
function FilterToggle({ filter, onChange }: { filter: EventsFilter; onChange: (f: EventsFilter) => void }) {
  const options: { id: EventsFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'mine', label: 'My events' },
  ]
  return (
    <div role="group" aria-label="Which events" className="inline-flex gap-1 rounded-lg bg-gray-100 p-1">
      {options.map(o => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          aria-pressed={filter === o.id}
          className={`rounded-md px-3 font-rubik text-sm transition-colors ${
            filter === o.id ? 'bg-white font-medium text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
          style={{ minHeight: 36 }}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

// Its hover pill ends at the cards' right edge, not past it (#273).
function AddEventLink() {
  return (
    <a
      href="#/new-event"
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-rubik text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
    >
      <Plus size={16} aria-hidden="true" />
      Add event
    </a>
  )
}

/** Stand-in row while app-created events load (they may be upcoming). */
function EventCardSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading events" className={CARD_SHELL}>
      <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-gray-100" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-3.5 w-2/5 animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-1/4 animate-pulse rounded bg-gray-100" />
      </div>
      <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-gray-100" />
    </div>
  )
}

export function EmptyRow({ children }: { children: string }) {
  return (
    <div className={`${CARD_SHELL} h-[82px] justify-center text-sm text-gray-500`}>
      {children}
    </div>
  )
}

export function LandingPage({ onOpenEvent }: Props) {
  const [view, setView] = useLocalStorage<LandingView>('hpde:landingView', 'list')
  const [filter, setFilter] = useLocalStorage<EventsFilter>('hpde:eventsFilter', 'all')
  const { events: EVENTS, loaded } = useEvents()
  const { user } = useAuth()
  const { status: rsvpsStatus, rsvps } = useRsvps()
  const isAdmin = !!user?.roles.includes(ADMIN_ROLE)
  // Theirs only (#235), once we know which those are.
  const rsvpsReady = rsvpsStatus === 'ready'
  const mine = rsvpsReady && filter === 'mine'
  const shown = mine ? myEvents(EVENTS, rsvps) : EVENTS
  const { live, upcoming, past } = partitionEvents(shown)
  const upcomingRows = [...live, ...upcoming]
  const rsvpOf = (e: EventConfig) => {
    if (!rsvpsReady) return undefined
    const answer = answerFor(e, rsvps)
    if (answer === 'going' || answer === 'maybe') return answer
    return needsAnswer(e, rsvps) ? 'ask' as const : undefined
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">
        <HomeHeader title="HPDE Events">
          {/* List / calendar, under the title (#273), then All / My
              events (#235), with Add event across from them (#279). */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="inline-flex gap-1 rounded-lg bg-gray-100 p-1">
                <button
                  onClick={() => setView('list')}
                  className={`rounded-md p-2 transition-colors ${
                    view === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                  }`}
                  style={{ minWidth: 36, minHeight: 36 }}
                  aria-label="List view"
                >
                  <List size={18} />
                </button>
                <button
                  onClick={() => setView('calendar')}
                  className={`rounded-md p-2 transition-colors ${
                    view === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                  }`}
                  style={{ minWidth: 36, minHeight: 36 }}
                  aria-label="Calendar view"
                >
                  <CalendarIcon size={18} />
                </button>
              </div>
              {rsvpsReady && <FilterToggle filter={filter} onChange={setFilter} />}
            </div>
            {isAdmin && <AddEventLink />}
          </div>
        </HomeHeader>

        {view === 'list' ? (
          <div className="space-y-16">
            {/* Live and upcoming events together, no heading (#276). */}
            <section aria-label="Live and upcoming events">
              {upcomingRows.length === 0 ? (
                // Created events are fetched after load and are usually the
                // upcoming ones — don't flash "No upcoming events" meanwhile.
                loaded ? <EmptyRow>{mine ? 'You’re not going to any upcoming events.' : 'No upcoming events.'}</EmptyRow> : <EventCardSkeleton />
              ) : (
                <div className="space-y-4">
                  {upcomingRows.map(e => (
                    <FeaturedEventCard
                      key={e.id}
                      event={e}
                      live={live.includes(e)}
                      rsvp={rsvpOf(e)}
                      onClick={() => onOpenEvent(e)}
                    />
                  ))}
                </div>
              )}
            </section>
            <section>
              <h2 className="mb-2 font-rubik text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
                Past
              </h2>
              {past.length === 0 ? (
                <EmptyRow>{mine ? 'No past events of yours.' : 'No past events.'}</EmptyRow>
              ) : (
                <div className="space-y-4">
                  {past.map(e => (
                    <EventCard
                      key={e.id}
                      event={e}
                      muted
                      live={false}
                      onClick={() => onOpenEvent(e)}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        ) : (
          <EventCalendar events={shown} onOpenEvent={onOpenEvent} />
        )}
      </div>
      <Footer />
    </div>
  )
}
