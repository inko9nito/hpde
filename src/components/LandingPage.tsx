import { useState, useEffect } from 'react'
import { Calendar as CalendarIcon, List, Plus } from 'lucide-react'
import { useEvents } from '../data/EventsContext'
import { useAuth } from '../auth/AuthContext'
import { ADMIN_ROLE } from './NewEventPage'
import { partitionEvents } from '../utils/eventClass'
import { eventSubtitle } from '../utils/time'
import { EventCalendar } from './EventCalendar'
import { Footer } from './Footer'
import { TrackIcon } from './TrackIcon'
import { AccountButton } from './AccountButton'
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

function LiveBadge() {
  return (
    <span className="ml-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-green-700">
      <span className="h-1 w-1 rounded-full bg-green-700 animate-pulse" />
      Live
    </span>
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
      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
        muted
          ? 'border-gray-200 bg-white hover:border-gray-300'
          : 'border-gray-200 bg-white shadow-sm hover:border-gray-400'
      }`}
    >
      <TrackIcon trackId={event.trackId} size={40} muted={muted} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center">
          <span className={`truncate text-sm font-semibold ${muted ? 'text-gray-700' : 'text-gray-900'}`}>
            {event.name}
          </span>
          {live && <LiveBadge />}
        </div>
        <div className="truncate text-xs text-gray-500">{eventSubtitle(event)}</div>
      </div>
    </button>
  )
}

function AddEventLink() {
  return (
    <a
      href="#/new-event"
      className="-my-1 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
    >
      <Plus size={14} aria-hidden="true" />
      Add event
    </a>
  )
}

// Same shell as EventCard (p-3 + 48px icon tile + border = 74px), so
// swapping between placeholder, empty state and real cards never shifts
// the page.
const CARD_SHELL = 'flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-white p-3'

/** Stand-in row while app-created events load (they may be upcoming). */
function EventCardSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading events" className={CARD_SHELL}>
      <div className="h-12 w-12 shrink-0 animate-pulse rounded-lg bg-gray-100" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-3.5 w-2/5 animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-1/4 animate-pulse rounded bg-gray-100" />
      </div>
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
        <div className="mb-4 flex items-start justify-between gap-3">
          <h1 className="text-xl font-bold text-gray-900 leading-tight">HPDE Schedule</h1>
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
                <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
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
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
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
