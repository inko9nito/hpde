import { useState, useEffect, useRef } from 'react'
import { CalendarClock } from 'lucide-react'
import { Timeline } from './components/Timeline'
import { RunGroupFilter } from './components/RunGroupFilter'
import { DayTabs } from './components/DayTabs'
import { isEventTabId } from './components/EventTabs'
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
import { EventHeader, BackButton } from './components/EventHeader'
import { SignInPrompt } from './components/SignInPrompt'
import { NewEventPage, ADMIN_ROLE } from './components/NewEventPage'
import { ScheduleEditorPage, editScheduleHash, eventIdFromEditScheduleHash } from './components/ScheduleEditorPage'
import { Toast } from './components/Toast'
import type { ToastMessage } from './components/Toast'
import { useAuth } from './auth/AuthContext'
import { useEvents } from './data/EventsContext'
import { partitionEvents, classifyEvent } from './utils/eventClass'
import { useTrackFavicon, useDocumentTitle } from './utils/trackFavicon'
import { useChromeColor, HEADER_CHROME_COLOR } from './utils/chromeColor'
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
const NEW_EVENT_HASH = '#/new-event'

function eventHash(eventId: string): string {
  return `${EVENT_HASH_PREFIX}${encodeURIComponent(eventId)}`
}

function eventIdFromHash(hash: string): string | null {
  if (!hash.startsWith(EVENT_HASH_PREFIX)) return null
  return decodeURIComponent(hash.slice(EVENT_HASH_PREFIX.length))
}

// Same header and tab-bar footprint as the loaded page, so the event
// fills in without the layout jumping — and the page never reads as
// blank while a created event is still being fetched (#231).
function EventSkeleton({ onBack }: { onBack: () => void }) {
  return (
    <div aria-busy="true" aria-label="Loading event">
      <div className="bg-white">
        <div className="mx-auto flex h-[52px] max-w-lg items-center px-4">
          <BackButton onClick={onBack} />
        </div>
        <div className="mx-auto flex max-w-lg items-center gap-3 px-6 py-2.5">
          <div className="h-[58px] w-[58px] shrink-0 animate-pulse rounded-xl bg-gray-200" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-5 w-3/5 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-2/5 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
        <div className="h-[45px] border-b border-gray-500/20" />
      </div>
      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">
        <div className="h-40 animate-pulse rounded-2xl border border-gray-200 bg-white" />
      </div>
    </div>
  )
}

function MissingEvent({ loading, onHome }: { loading: boolean; onHome: () => void }) {
  if (loading) return <EventSkeleton onBack={onHome} />
  return (
    <>
    <div className="bg-white">
      <div className="mx-auto flex h-[52px] max-w-lg items-center px-4">
        <BackButton onClick={onHome} />
      </div>
    </div>
    <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">
    <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
      <p className="text-sm font-medium text-gray-700">This event doesn’t exist</p>
      <p className="mt-1 text-xs text-gray-400">It may have been deleted.</p>
      <button
        onClick={onHome}
        className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
      >
        See all events
      </button>
    </div>
    </div>
    </>
  )
}

function isEmptyHash(hash: string): boolean {
  return hash === '' || hash === '#'
}

export default function App() {
  const [hash, setHash] = useHashRoute()
  const { status: authStatus, user } = useAuth()
  const { events: EVENTS, allEvents: ALL_EVENTS, loaded: eventsLoaded, isStored } = useEvents()
  const [activeEventId, setActiveEventId] = useLocalStorage<string>('hpde:activeEvent', ALL_EVENTS[0].id)
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
  const [toast, setToast] = useState<ToastMessage | null>(null)
  function showToast(text: string) {
    setToast({ id: Date.now(), text })
  }
  // True until the first real navigation into an event (switchEvent).
  // Landing directly on an event route — a fresh load, a reload, or the
  // empty-hash-redirects-to-today's-live-event effect below — should show
  // the schedule immediately, not replay the "push in from the right"
  // transition meant for an actual in-app navigation. Read at render time
  // (before effects run), so it's still true for the very first mount even
  // when an effect calls switchEvent afterward — only a switchEvent call
  // that happens BEFORE that mount (i.e. a real click) flips it.
  const skipPushEnterAnimationRef = useRef(true)

  const routeEventId = eventIdFromHash(hash)
  const isOnEventRoute = routeEventId !== null
  // A link to an event we don't have (yet): an app-created one before the
  // fetch lands, or one that was deleted. Don't show some other event.
  const routeMissing = isOnEventRoute && !ALL_EVENTS.some(e => e.id === routeEventId)
  // Keep the pushed page mounted through its slide-out animation. Starts
  // mounted whenever the current hash is an event (including cold-boot);
  // becomes false again only after PushPage's onExited fires.
  const [pushMounted, setPushMounted] = useState(isOnEventRoute)
  useEffect(() => {
    if (isOnEventRoute) setPushMounted(true)
  }, [isOnEventRoute])

  // ALL_EVENTS always has at least the test fixture, even before the
  // events load or when there are none (#232).
  const activeEvent = ALL_EVENTS.find(e => e.id === activeEventId) ?? ALL_EVENTS[0]
  const activeDay = activeEvent.days.find(d => d.id === activeDayId) ?? defaultDay(activeEvent)

  const todayDay = findTodayDay(activeEvent)
  const isToday = activeDay.date === todayLocalISO()
  const multiDay = activeEvent.days.length > 1
  // Events created in the app start with no schedule (#229) — it's added
  // separately, so until then the Schedule tab says so instead.
  const hasSchedule = activeEvent.days.some(d => d.activities.length > 0)

  // While an event's page is open, the tab shows its name and track shape
  // (#233) — and so do iOS Favorites / Home Screen bookmarks made from it.
  const routeEvent = ALL_EVENTS.find(e => e.id === routeEventId)
  useTrackFavicon(routeEvent?.trackId)
  useDocumentTitle(routeEvent?.name)
  // …and the status bar above it matches its white header (#245) — once
  // the page has slid in, not while it's still on its way.
  const [pushEntered, setPushEntered] = useState(false)
  useChromeColor(isOnEventRoute && pushEntered ? HEADER_CHROME_COLOR : null)

  const eventStatus = classifyEvent(activeEvent)

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
    // ALL_EVENTS too: events arrive from the store after load, so a
    // direct link to one only resolves once the fetch lands.
  }, [hash, ALL_EVENTS])

  // '#/widget-script' is the old name for this page (pre-#213) — keep it
  // working in case anyone bookmarked or shared it.
  if (hash === '#/widget-setup' || hash === '#/widget-script') {
    return <WidgetSetupPage />
  }

  if (hash === '#/share') {
    return <SharePage />
  }

  const editScheduleEventId = eventIdFromEditScheduleHash(hash)
  if (editScheduleEventId !== null) {
    const backToEvent = () => {
      // Back where the editor was opened from, without replaying the
      // event page's slide-in.
      skipPushEnterAnimationRef.current = true
      setHash(eventHash(editScheduleEventId))
    }
    return (
      <ScheduleEditorPage
        eventId={editScheduleEventId}
        onClose={backToEvent}
        onSaved={() => {
          setActiveTab('schedule')
          backToEvent()
          showToast('Schedule saved')
        }}
      />
    )
  }

  if (hash === NEW_EVENT_HASH) {
    return (
      <NewEventPage
        onCreated={event => {
          switchEvent(event)
          // Reassurance that this is the new event, not an old one.
          showToast(`“${event.name}” created`)
        }}
      />
    )
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
      onEnteredChange={setPushEntered}
      scrollRef={pushScrollRef}
      skipEnterAnimation={skipPushEnterAnimationRef.current}
    >
    <PullToRefresh disabled={!isOnEventRoute} scrollContainerRef={pushScrollRef}>
    <div className="min-h-screen bg-gray-50">
        {routeMissing ? (
          <MissingEvent loading={!eventsLoaded} onHome={goHome} />
        ) : (<>
        <EventHeader
          event={activeEvent}
          status={eventStatus}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onBack={goHome}
          onDeleted={() => {
            showToast(`“${activeEvent.name}” deleted`)
            goHome()
          }}
          scrollRef={pushScrollRef}
        />

      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">
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
          {activeTab === 'schedule' && !hasSchedule && (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
              <CalendarClock size={20} className="mx-auto text-gray-400" aria-hidden="true" />
              <p className="mt-2 text-sm font-medium text-gray-700">Schedule coming soon</p>
              <p className="mt-1 text-xs text-gray-400">It’ll be posted here once the organizer announces it.</p>
              {user?.roles.includes(ADMIN_ROLE) && isStored(activeEvent.id) && (
                <a
                  href={editScheduleHash(activeEvent.id)}
                  className="mt-4 inline-block rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
                >
                  Add schedule
                </a>
              )}
            </div>
          )}

          {activeTab === 'schedule' && hasSchedule && (
            <>
              {/* Day tabs + Now — only shown for multi-day events */}
              {multiDay && (
                <DayTabs
                  days={activeEvent.days}
                  activeDayId={activeDay.id}
                  onSelect={setActiveDayId}
                  todayDayId={todayDay?.id}
                />
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
        </>)}
      <Footer />
    </div>
    </PullToRefresh>
    </PushPage>
    )}
    <Toast toast={toast} onDone={() => setToast(null)} />
    </>
  )
}
