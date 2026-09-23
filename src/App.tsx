import { useState, useEffect, useRef } from 'react'
import { Home } from 'lucide-react'
import { Timeline } from './components/Timeline'
import { RunGroupFilter } from './components/RunGroupFilter'
import { EventPicker } from './components/EventPicker'
import { EventTabs, isEventTabId } from './components/EventTabs'
import type { EventTabId } from './components/EventTabs'
import { EventInfo } from './components/EventInfo'
import { Toggle } from './components/Toggle'
import { PullToRefresh } from './components/PullToRefresh'
import { Legend } from './components/Legend'
import { WidgetSetupPage } from './components/WidgetSetupPage'
import { SharePage } from './components/SharePage'
import { LandingPage } from './components/LandingPage'
import { PushPage } from './components/PushPage'
import { Footer } from './components/Footer'
import { AccountButton } from './components/AccountButton'
import { SignInPrompt } from './components/SignInPrompt'
import { useAuth } from './auth/AuthContext'
import { EVENTS, ALL_EVENTS } from './data'
import { partitionEvents } from './utils/eventClass'
import { todayLocalISO, nowMinutes, parseMinutes } from './utils/time'
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
  const { status: authStatus } = useAuth()
  const [activeEventId, setActiveEventId] = useLocalStorage<string>('hpde:activeEvent', EVENTS[0].id)
  const [activeDayId, setActiveDayId] = useLocalStorage<string | null>('hpde:activeDay', null)
  const [selectedGroups, setSelectedGroups] = useLocalStorage<string[]>('hpde:groups', [])
  const [hidePast, setHidePast] = useLocalStorage<boolean>('hpde:hidePast', false)
  // Active tab on the event page. Persisted so pull-to-refresh — which
  // reloads the page — comes back on the tab you were reading. Switching
  // events deliberately resets it to Schedule (see switchEvent): the tab
  // is a view of one event, not a global mode.
  const [storedTab, setActiveTab] = useLocalStorage<EventTabId>('hpde:activeTab', 'schedule')
  const activeTab = isEventTabId(storedTab) ? storedTab : 'schedule'
  const pushScrollRef = useRef<HTMLDivElement>(null)
  // True until the first real navigation into an event (switchEvent).
  // Landing directly on an event route — a fresh load, a reload, or the
  // empty-hash-redirects-to-today's-live-event effect below — should show
  // the schedule immediately, not replay the "push in from the right"
  // transition meant for an actual in-app navigation. Read at render time
  // (before effects run), so it's still true for the very first mount even
  // when an effect calls switchEvent afterward — only a switchEvent call
  // that happens BEFORE that mount (i.e. a real click) flips it.
  const skipPushEnterAnimationRef = useRef(true)

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
    skipPushEnterAnimationRef.current = false
    setActiveEventId(event.id)
    setActiveDayId(defaultDay(event).id)
    setSelectedGroups([])
    setActiveTab('schedule')
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

  // '#/widget-script' is the old name for this page (pre-#213) — keep it
  // working in case anyone bookmarked or shared it.
  if (hash === '#/widget-setup' || hash === '#/widget-script') {
    return <WidgetSetupPage />
  }

  if (hash === '#/share') {
    return <SharePage />
  }

  return (
    <>
    <PullToRefresh disabled={pushMounted}>
      <LandingPage onOpenEvent={switchEvent} />
    </PullToRefresh>
    {pushMounted && (
    <PushPage
      open={isOnEventRoute}
      onExited={() => setPushMounted(false)}
      scrollRef={pushScrollRef}
      skipEnterAnimation={skipPushEnterAnimationRef.current}
    >
    <PullToRefresh disabled={!isOnEventRoute} scrollContainerRef={pushScrollRef}>
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">

        {/* Header: Home | centered EventPicker | symmetric spacer */}
        <div className="mb-4 flex items-start gap-3">
          <button
            onClick={goHome}
            aria-label="Home"
            className="inline-grid h-9 w-9 shrink-0 place-items-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <Home size={18} />
          </button>
          <div className="min-w-0 flex-1">
            <EventPicker
              events={EVENTS}
              active={activeEvent}
              onChange={switchEvent}
            />
          </div>
          {/* Same 36px box as Home, so the picker stays visually
              centered whether or not sign-in is shown. */}
          <AccountButton />
        </div>

        {isPastEvent && (
          <div className="mb-4 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-center text-sm text-gray-600">
            This event has passed.
          </div>
        )}

        {/* Top-level tab bar: Schedule | My notes | Info */}
        <div className="mb-3">
          <EventTabs active={activeTab} onChange={setActiveTab} />
        </div>

        {/* Tab panel. Keyed on activeTab so a fresh element mounts on
            change — CSS keyframe (see index.css) plays a ~10 ms fade,
            matching iOS's near-instant tab switch. */}
        <div
          key={activeTab}
          role="tabpanel"
          id={`event-tabpanel-${activeTab}`}
          aria-labelledby={`event-tab-${activeTab}`}
          className="tab-fade"
        >
          {activeTab === 'schedule' && (
            <>
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
            </>
          )}

          {activeTab === 'notes' && authStatus !== 'signed-in' && (
            <SignInPrompt reason="keep private notes for each event" />
          )}

          {activeTab === 'notes' && authStatus === 'signed-in' && (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
              <p className="text-sm font-medium text-gray-500">My notes</p>
              <p className="mt-1 text-xs text-gray-400">Coming soon</p>
            </div>
          )}

          {activeTab === 'info' && <EventInfo event={activeEvent} />}
        </div>

      </div>
      <Footer />
    </div>
    </PullToRefresh>
    </PushPage>
    )}
    </>
  )
}
