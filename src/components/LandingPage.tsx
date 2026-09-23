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

export function LandingPage({ onOpenEvent }: Props) {
  const [view, setView] = useLocalStorage<LandingView>('hpde:landingView', 'list')
  const { events: EVENTS } = useEvents()
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
          {isAdmin && (
            <a
              href="#/new-event"
              aria-label="New event"
              className="inline-grid h-9 w-9 shrink-0 place-items-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <Plus size={18} />
            </a>
          )}
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
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Upcoming
              </h2>
              {upcomingRows.length === 0 ? (
                <div className="rounded-lg border border-gray-200 bg-white px-3 py-4 text-center text-sm text-gray-500">
                  No upcoming events.
                </div>
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
                <div className="rounded-lg border border-gray-200 bg-white px-3 py-4 text-center text-sm text-gray-500">
                  No past events.
                </div>
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
