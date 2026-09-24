import { useState, useEffect } from 'react'
import { Calendar as CalendarIcon, List, Plus } from 'lucide-react'
import { useEvents } from '../data/EventsContext'
import { useAuth } from '../auth/AuthContext'
import { ADMIN_ROLE } from './NewEventPage'
import { firstDate, partitionEvents } from '../utils/eventClass'
import { todayLocalISO } from '../utils/time'
import { EventCalendar } from './EventCalendar'
import { Footer } from './Footer'
import { TrackIcon } from './TrackIcon'
import { AccountButton } from './AccountButton'
import { AppMenu } from './AppMenu'
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

// Every compact row on the page — past event card, loading skeleton,
// empty state — shares this shell (p-4 + 48px tile + border = 82px),
// so swapping between them never shifts the page.
const CARD_SHELL = `flex w-full items-center gap-4 rounded-xl border border-gray-200 bg-white ${CARD_PADDING} ${CARD_SHADOW}`

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Month + day-of-month tile on the left of a card. A multi-day event
 *  shows only its first day (#243). The year goes under the day, only
 *  when it isn't this year (#266). `dark` is for the featured card's
 *  near-black background (#276). */
function DateBlock({ event, muted, dark = false }: { event: EventConfig; muted: boolean; dark?: boolean }) {
  if (event.days.length === 0) return <div className="w-10 shrink-0" />
  const [y, m, d] = firstDate(event).split('-').map(Number)
  const thisYear = Number(todayLocalISO().slice(0, 4))
  const monthColor = muted ? 'text-gray-500' : dark ? 'text-red-400' : 'text-red-600'
  return (
    <div className="flex w-10 shrink-0 flex-col items-center font-rubik leading-none">
      <span className={`text-[11px] font-medium uppercase tracking-wider ${monthColor}`}>
        {MONTHS[m - 1]}
      </span>
      <span className={`mt-1 text-2xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{d}</span>
      {y !== thisYear && (
        <span className={`mt-0.5 text-[11px] font-normal tracking-wider ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
          {y}
        </span>
      )}
    </div>
  )
}

/** Event name (with a LIVE pill when it's on today) over its organizer. */
function EventTitle({ event, live }: { event: EventConfig; live: boolean }) {
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

/** An upcoming (or live) event (#276): one near-black card, the track
 *  shape large across the top fading out at its bottom edge, then the
 *  date, a hairline divider, and the name over the organizer. A live
 *  event gets the same LIVE badge as the event page's date line. */
function FeaturedEventCard({
  event,
  live,
  onClick,
}: {
  event: EventConfig
  live: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="block w-full overflow-hidden rounded-2xl border border-gray-900 bg-gray-900 text-left shadow-[0_2px_4px_rgba(17,24,39,0.08),0_12px_28px_rgba(17,24,39,0.18)] transition-colors hover:border-gray-500"
    >
      {/* The SVGs are square with the shape in a wide band across the
          middle, so a box taller than the banner is cropped by it. The
          gradient fades the bottom of the shape into the card. */}
      <div className="relative flex h-32 items-center justify-center overflow-hidden">
        <TrackIcon
          trackId={event.trackId}
          tone="dark"
          size={232}
          padding={0}
          radius="rounded-none"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-b from-gray-900/0 to-gray-900"
        />
      </div>
      {/* Same left inset and date column as the past cards, so the date
          stacks line up down the page. Tucked up into the faded bottom
          of the track, painted above the gradient. */}
      <div className={`relative -mt-3 flex items-center gap-4 ${CARD_PADDING} pt-0`}>
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
          </div>
        </div>
      </div>
    </button>
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

function EmptyRow({ children }: { children: string }) {
  return (
    <div className={`${CARD_SHELL} h-[82px] justify-center text-sm text-gray-500`}>
      {children}
    </div>
  )
}

export function LandingPage({ onOpenEvent }: Props) {
  const [view, setView] = useLocalStorage<LandingView>('hpde:landingView', 'list')
  const { events: EVENTS, loaded } = useEvents()
  const { user } = useAuth()
  const isAdmin = !!user?.roles.includes(ADMIN_ROLE)
  const { live, upcoming, past } = partitionEvents(EVENTS)
  const upcomingRows = [...live, ...upcoming]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">
        <div className="mb-8">
          <div className="flex items-center justify-between gap-3">
            <h1 className="font-rubik text-2xl font-bold leading-tight text-gray-900">HPDE Events</h1>
            <div className="flex shrink-0 items-center gap-1">
              <AppMenu />
              <AccountButton reserveSpace={false} />
            </div>
          </div>
          {/* List / calendar, under the title (#273), with Add event
              across from it (#279). */}
          <div className="mt-4 flex items-center justify-between gap-3">
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
            {isAdmin && <AddEventLink />}
          </div>
        </div>

        {view === 'list' ? (
          <div className="space-y-16">
            {/* Live and upcoming events together, no heading (#276). */}
            <section aria-label="Live and upcoming events">
              {upcomingRows.length === 0 ? (
                // Created events are fetched after load and are usually the
                // upcoming ones — don't flash "No upcoming events" meanwhile.
                loaded ? <EmptyRow>No upcoming events.</EmptyRow> : <EventCardSkeleton />
              ) : (
                <div className="space-y-4">
                  {upcomingRows.map(e => (
                    <FeaturedEventCard
                      key={e.id}
                      event={e}
                      live={live.includes(e)}
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
                <EmptyRow>No past events.</EmptyRow>
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
          <EventCalendar events={EVENTS} onOpenEvent={onOpenEvent} />
        )}
      </div>
      <Footer />
    </div>
  )
}
