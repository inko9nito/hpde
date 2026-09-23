import { useState, useEffect } from 'react'
import { Calendar as CalendarIcon, List, Plus } from 'lucide-react'
import { useEvents } from '../data/EventsContext'
import { useAuth } from '../auth/AuthContext'
import { ADMIN_ROLE } from './NewEventPage'
import { firstDate, partitionEvents } from '../utils/eventClass'
import { EventCalendar } from './EventCalendar'
import { Footer } from './Footer'
import { TrackIcon } from './TrackIcon'
import { AccountButton } from './AccountButton'
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

// Every row on the page — event card, loading skeleton, empty state —
// shares this shell (p-3 + 48px tile + border = 74px), so swapping
// between them never shifts the page.
const CARD_SHELL = 'flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-white p-3'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Month + day-of-month tile on the left of a card. A multi-day event
 *  shows only its first day (#243). */
function DateBlock({ event, muted }: { event: EventConfig; muted: boolean }) {
  if (event.days.length === 0) return <div className="w-10 shrink-0" />
  const [, m, d] = firstDate(event).split('-').map(Number)
  return (
    <div className="flex w-10 shrink-0 flex-col items-center font-rubik leading-none">
      <span
        className={`text-[11px] font-medium uppercase tracking-wider ${
          muted ? 'text-gray-500' : 'text-red-600'
        }`}
      >
        {MONTHS[m - 1]}
      </span>
      <span className="mt-1 text-2xl font-bold text-gray-900">{d}</span>
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
        muted ? 'hover:border-gray-300' : 'shadow-sm hover:border-gray-400'
      }`}
    >
      <DateBlock event={event} muted={muted} />
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
      {/* Same dark tile as the event page header; no padding, the SVGs
          carry their own margin. */}
      <TrackIcon trackId={event.trackId} tone="dark" size={48} padding={0} radius="rounded-xl" />
    </button>
  )
}

function AddEventLink() {
  return (
    <a
      href="#/new-event"
      className="-my-1 -mr-2 inline-flex items-center gap-1 rounded-md px-2 py-1 font-rubik text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
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
    <div className={`${CARD_SHELL} h-[74px] justify-center text-sm text-gray-500`}>
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
        <div className="mb-5 flex items-center justify-between gap-3">
          <h1 className="font-rubik text-2xl font-bold leading-tight text-gray-900">HPDE Events</h1>
          <div className="flex shrink-0 items-center gap-2">
          <div className="flex gap-1 rounded-lg bg-gray-100 p-1 shrink-0 self-start">
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
          <AccountButton reserveSpace={false} />
          </div>
        </div>

        {view === 'list' ? (
          <div className="space-y-6">
            <section>
              <div className="mb-2 flex items-center justify-between gap-3">
                <h2 className="font-rubik text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
                  Upcoming
                </h2>
                {isAdmin && <AddEventLink />}
              </div>
              {upcomingRows.length === 0 ? (
                // Created events are fetched after load and are usually the
                // upcoming ones — don't flash "No upcoming events" meanwhile.
                loaded ? <EmptyRow>No upcoming events.</EmptyRow> : <EventCardSkeleton />
              ) : (
                <div className="space-y-2">
                  {upcomingRows.map(e => (
                    <EventCard
                      key={e.id}
                      event={e}
                      muted={false}
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
                <div className="space-y-2">
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
