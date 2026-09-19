import { useState, useEffect, useRef } from 'react'
import { Home, Info } from 'lucide-react'
import { Timeline } from './components/Timeline'
import { RunGroupFilter } from './components/RunGroupFilter'
import { EventPicker } from './components/EventPicker'
import { Toggle } from './components/Toggle'
import { PullToRefresh } from './components/PullToRefresh'
import { Legend } from './components/Legend'
import { WidgetScriptPage } from './components/WidgetScriptPage'
import { SharePage } from './components/SharePage'
import { EventDetailsDrawer } from './components/EventDetailsDrawer'
import { LandingPage } from './components/LandingPage'
import { PushPage } from './components/PushPage'
import { EVENTS, ALL_EVENTS } from './data'
import { partitionEvents } from './utils/eventClass'
import { todayLocalISO, nowMinutes, parseMinutes, formatBuildTime } from './utils/time'
import type { EventConfig, DaySchedule } from './types'

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

function findTodayDay(event: EventConfig): DaySchedule | undefined {
  const today = todayLocalISO()
  return event.days.find(d => d.date === today)
}

function defaultDay(event: EventConfig): DaySchedule {
  return findTodayDay(event) ?? event.days[0]
}

function useHashRoute() {
  const [hash, setHashState] = useState(() => window.location.hash)
  useEffect(() => {
    const onHashChange = () => {
      setHashState(window.location.hash)
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  function setHash(next: string) {
    if (window.location.hash === next) return
    window.location.hash = next
  }
  return [hash, setHash] as const
}

const EVENT_HASH_PREFIX = '#/event/'
const LANDING_HASH = '#/'

function eventHash(eventId: string): string {
  return `${EVENT_HASH_PREFIX}${encodeURIComponent(eventId)}`
}

function eventIdFromHash(hash: string): string | null {
  if (!hash.startsWith(EVENT_HASH_PREFIX)) return null
  return decodeURIComponent(hash.slice(EVENT_HASH_PREFIX.length))
}

function isEmptyHash(hash: string): boolean {
  return hash === '' || hash === '#'
}

export default function App() {
  const [hash, setHash] = useHashRoute()
  const [activeEventId, setActiveEventId] = useLocalStorage<string>('hpde:activeEvent', EVENTS[0].id)
  const [activeDayId, setActiveDayId] = useLocalStorage<string | null>('hpde:activeDay', null)
  const [selectedGroups, setSelectedGroups] = useLocalStorage<string[]>('hpde:groups', [])
  const [hidePast, setHidePast] = useLocalStorage<boolean>('hpde:hidePast', false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const pushScrollRef = useRef<HTMLDivElement>(null)

  const isOnEventRoute = eventIdFromHash(hash) !== null
  // Keep the pushed page mounted through its slide-out animation. Starts
  // mounted whenever the current hash is an event (including cold-boot);
  // becomes false again only after PushPage's onExited fires.
  const [pushMounted, setPushMounted] = useState(isOnEventRoute)
  useEffect(() => {
    if (isOnEventRoute) setPushMounted(true)
  }, [isOnEventRoute])

  const activeEvent = ALL_EVENTS.find(e => e.id === activeEventId) ?? EVENTS[0]
  const activeDay = activeEvent.days.find(d => d.id === activeDayId) ?? defaultDay(activeEvent)

  const todayDay = findTodayDay(activeEvent)
  const isToday = activeDay.date === todayLocalISO()
  const multiDay = activeEvent.days.length > 1

  const lastEventDate = activeEvent.days.reduce((max, d) => (d.date > max ? d.date : max), activeEvent.days[0].date)
  const isPastEvent = lastEventDate < todayLocalISO()

  const [, setTick] = useState(0)
  useEffect(() => {
    if (!isToday) return
    const id = setInterval(() => setTick(t => t + 1), 60000)
    return () => clearInterval(id)
  }, [isToday])

  const hasPastActivities = isToday
    && activeDay.activities.some(a => a.type !== 'break' && parseMinutes(a.time) < nowMinutes())

  function switchEvent(event: EventConfig) {
    setActiveEventId(event.id)
    setActiveDayId(defaultDay(event).id)
    setSelectedGroups([])
    setHash(eventHash(event.id))
  }

  function goHome() {
    setHash(LANDING_HASH)
  }

  // Keep the URL in sync with the active event: a direct link to
  // `#/event/<id>` selects that event, and picking an event from the
  // dropdown (via switchEvent) publishes its URL so the schedule is
  // shareable and bookmarkable. An empty hash on cold boot lands on the
  // live event when there is one; otherwise on the landing page.
  useEffect(() => {
    const hashEventId = eventIdFromHash(hash)
    if (hashEventId) {
      const matched = ALL_EVENTS.find(e => e.id === hashEventId)
      if (matched && matched.id !== activeEventId) switchEvent(matched)
      return
    }
    if (isEmptyHash(hash)) {
      const { live } = partitionEvents(EVENTS)
      setHash(live.length > 0 ? eventHash(live[0].id) : LANDING_HASH)
    }
  }, [hash])

  if (hash === '#/widget-script') {
    return <WidgetScriptPage />
  }

  if (hash === '#/share') {
    return <SharePage />
  }

  return (
    <>
    <LandingPage onOpenEvent={switchEvent} />
    {pushMounted && (
    <PushPage
      open={isOnEventRoute}
      onExited={() => setPushMounted(false)}
      scrollRef={pushScrollRef}
    >
    <PullToRefresh disabled={detailsOpen || !isOnEventRoute} scrollContainerRef={pushScrollRef}>
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">

        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-1">
            <button
              onClick={goHome}
              aria-label="Home"
              className="inline-grid h-9 w-9 shrink-0 place-items-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <Home size={18} />
            </button>
            <EventPicker
              events={EVENTS}
              active={activeEvent}
              onChange={switchEvent}
              onGoHome={goHome}
            />
          </div>
          <div className="flex gap-1 rounded-lg bg-gray-100 p-1 shrink-0 self-start">
            <button
              onClick={() => setDetailsOpen(true)}
              aria-label="Event details"
              className="rounded-md p-2 text-gray-400 transition-colors hover:text-gray-600"
              style={{ minWidth: 36, minHeight: 36 }}
            >
              <Info size={18} />
            </button>
          </div>
        </div>

        {isPastEvent && (
          <div className="mb-4 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-center text-sm text-gray-600">
            This event has passed.
          </div>
        )}

        {/* Day tabs + Now — only shown for multi-day events */}
        {multiDay && (
          <div className="mb-3 flex items-center gap-2">
            <div className="flex flex-1 gap-1 rounded-lg bg-white border border-gray-200 p-1 shadow-sm min-w-0">
              {activeEvent.days.map(day => (
                <button
                  key={day.id}
                  onClick={() => setActiveDayId(day.id)}
                  className={`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${
                    activeDay.id === day.id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => todayDay && setActiveDayId(todayDay.id)}
              disabled={isToday || !todayDay}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors shrink-0 ${
                isToday || !todayDay
                  ? 'border-gray-100 bg-white text-gray-300 cursor-default'
                  : 'border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400'
              }`}
            >
              Now
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <RunGroupFilter
            groups={activeEvent.runGroups}
            selected={selectedGroups}
            onChange={setSelectedGroups}
          />
          {hasPastActivities && (
            <Toggle
              checked={hidePast}
              onChange={() => setHidePast(h => !h)}
              label="Hide past activities"
            />
          )}
        </div>

        <Timeline
          activities={activeDay.activities}
          runGroups={activeEvent.runGroups}
          isToday={isToday}
          selectedGroups={selectedGroups}
          hidePast={hidePast}
        />

        <Legend groups={activeEvent.runGroups} />

      </div>
      <div className="mt-6 pb-8 text-center text-xs">
        <div>
          <a href="#/widget-script" className="text-gray-600 underline hover:text-gray-800">
            iOS widget
          </a>
          {' · '}
          <a href="#/share" className="text-gray-600 underline hover:text-gray-800">
            Share
          </a>
        </div>
        <div className="mt-4 font-mono text-[10px] text-gray-300">
          build {formatBuildTime(__BUILD_TIME__)}
        </div>
      </div>
    </div>
    </PullToRefresh>
    <EventDetailsDrawer
      event={activeEvent}
      open={detailsOpen}
      onClose={() => setDetailsOpen(false)}
    />
    </PushPage>
    )}
    </>
  )
}
