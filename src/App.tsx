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
import { SharePage, SHARE_HASH, isEventShareHash, eventShareUrl } from './components/SharePage'
import { LandingPage } from './components/LandingPage'
import { PushPage } from './components/PushPage'
import { EventHeader, BackButton, EVENT_PAGE_MIN_HEIGHT } from './components/EventHeader'
import { SignInPrompt } from './components/SignInPrompt'
import { NewEventPage, ADMIN_ROLE } from './components/NewEventPage'
import { ScheduleEditorPage, editScheduleHash, eventIdFromEditScheduleHash } from './components/ScheduleEditorPage'
import { EditEventPage, eventIdFromEditEventHash } from './components/EditEventPage'
import { LapTimesSheet, groupFor } from './components/LapTimesSheet'
import type { SessionSlot, SessionView } from './components/LapTimesSheet'
import { EventEvaluationSheet } from './components/EventEvaluationSheet'
import { MyLapTimes } from './components/MyLapTimes'
import { TrackLapsPage, trackHash, trackPageTitle, trackSlugFromHash } from './components/TrackLapsPage'
import { emptyPageStack, nextPageStack } from './utils/pageStack'
import { GarageTab, HOME_TAB_HASH, TAB_BAR_PX, TabBar, homeTabFromHash } from './components/HomeTabs'
import type { HomeTab } from './components/HomeTabs'
import { TracksTab } from './components/TracksTab'
import { DriverPicker } from './components/DriverPicker'
import { useLapLog, useLapSummary } from './data/lapLog'
import { useNotesLog } from './data/notesLog'
import { useDrivers, driverName } from './data/drivers'
import type { Driver } from './data/drivers'
import { bestOnLayout, eventBest, layoutName, layoutSlug } from './utils/trackStats'
import { Toast } from './components/Toast'
import type { ToastMessage } from './components/Toast'
import { useAuth } from './auth/AuthContext'
import { useEvents } from './data/EventsContext'
import { useRsvps } from './data/RsvpsContext'
import { myRunGroup } from './utils/rsvp'
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

// Also matches the event's sub-pages (`#/event/<id>/share`), which open
// over its page. The id itself is encoded, so it never holds a `/`.
function eventIdFromHash(hash: string): string | null {
  if (!hash.startsWith(EVENT_HASH_PREFIX)) return null
  return decodeURIComponent(hash.slice(EVENT_HASH_PREFIX.length).split('/')[0])
}

/** A page that slides up from the bottom over the landing or event page
 *  (#273, #278): New event, Share (the site, or one event) or the iOS
 *  widget setup. */
type Overlay = { kind: 'new-event' } | { kind: 'widget' } | { kind: 'share'; eventId?: string }

// What the page stack (#274) reads from a hash: the event it's a page of —
// its own, a sub-page or an editor — and the track page it is.
const PAGE_HASHES = {
  event: (hash: string) => eventIdFromHash(hash) ?? eventIdFromEditScheduleHash(hash) ?? eventIdFromEditEventHash(hash),
  track: trackSlugFromHash,
}

function overlayFromHash(hash: string): Overlay | null {
  if (hash === NEW_EVENT_HASH) return { kind: 'new-event' }
  // '#/widget-script' is the old name for the widget page (pre-#213) —
  // keep it working in case anyone bookmarked or shared it.
  if (hash === '#/widget-setup' || hash === '#/widget-script') return { kind: 'widget' }
  if (hash === SHARE_HASH) return { kind: 'share' }
  if (isEventShareHash(hash)) return { kind: 'share', eventId: eventIdFromHash(hash)! }
  return null
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
  const { rsvps } = useRsvps()
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
  const trackScrollRef = useRef<HTMLDivElement>(null)
  // The session whose lap times are open in the sheet (#210), if any — and
  // what of it: what it has, or its laps or evaluation (#340).
  const [lapSlot, setLapSlot] = useState<(SessionSlot & { view?: SessionView }) | null>(null)
  // A TDE event's report card, open in its sheet (#340).
  const [evaluationOpen, setEvaluationOpen] = useState(false)
  // An admin can log another driver's lap times (#288): whose the sheet,
  // My notes and the schedule's saved marks are showing. Null for their
  // own; back to that on another event.
  const [lapDriver, setLapDriver] = useState<Driver | null>(null)
  const isAdminUser = authStatus === 'signed-in' && !!user?.roles.includes(ADMIN_ROLE)
  const driver = isAdminUser ? lapDriver : null
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
  // A layout's track page (#274), and which of it and an event's page is
  // over the other: each opens from the other, sliding in over it, and
  // Back returns to the one underneath (see pageStack).
  const trackSlug = trackSlugFromHash(hash)
  const [stack, setStack] = useState(() => emptyPageStack<Driver>(hash))
  if (stack.hash !== hash) setStack(nextPageStack(stack, hash, driver, PAGE_HASHES))
  const trackOverEventId = trackSlug !== null ? stack.eventUnderTrack : null
  const trackUnderEvent = isOnEventRoute ? stack.trackUnderEvent : null
  // The event whose page is showing: the route's, or the one under the track page.
  const pageEventId = routeEventId ?? trackOverEventId
  const eventPageOpen = pageEventId !== null
  // The track page showing: the route's, or the one under the event's page.
  const trackPageSlug = trackSlug ?? trackUnderEvent
  // An event's page opened from a track page goes over it — kept through
  // its slide-out.
  const [eventOverTrack, setEventOverTrack] = useState(trackUnderEvent !== null)
  if (isOnEventRoute && eventOverTrack !== (trackUnderEvent !== null)) setEventOverTrack(trackUnderEvent !== null)
  // The tab under everything (#274): Events, Tracks or Garage. A track page
  // of its own (not over an event) is the Tracks tab's. Pages pushed over a
  // tab leave it as it was, and go back to it.
  const hashTab = homeTabFromHash(hash) ?? (trackSlug !== null && trackOverEventId === null ? 'tracks' : null)
  const [homeTab, setHomeTab] = useState<HomeTab>(hashTab ?? 'events')
  if (hashTab !== null && hashTab !== homeTab) setHomeTab(hashTab)
  // A link to an event we don't have (yet): an app-created one before the
  // fetch lands, or one that was deleted. Don't show some other event.
  const routeMissing = isOnEventRoute && !ALL_EVENTS.some(e => e.id === routeEventId)
  // Keep the pushed page mounted through its slide-out animation. Starts
  // mounted whenever the current hash is an event (including cold-boot);
  // becomes false again only after PushPage's onExited fires.
  const [pushMounted, setPushMounted] = useState(isOnEventRoute)
  useEffect(() => {
    if (eventPageOpen) setPushMounted(true)
  }, [eventPageOpen])

  // The track page stays mounted through its slide-out too.
  const [lastTrackSlug, setLastTrackSlug] = useState(trackPageSlug)
  useEffect(() => {
    if (trackPageSlug) setLastTrackSlug(trackPageSlug)
  }, [trackPageSlug])
  const shownTrackSlug = trackPageSlug ?? lastTrackSlug
  const [trackEntered, setTrackEntered] = useState(false)

  // Same for New event / Share / iOS widget: the last one opened stays
  // mounted through its slide-out.
  const overlay = overlayFromHash(hash)
  const [lastOverlay, setLastOverlay] = useState(overlay)
  useEffect(() => {
    if (overlay) setLastOverlay(overlay)
  }, [hash])
  const shownOverlay = overlay ?? lastOverlay
  const [overlayEntered, setOverlayEntered] = useState(false)
  // Opened by loading its URL, not by tapping through to it: show it in
  // place instead of sliding it in (as with the event page, below).
  const bootHashRef = useRef<string | null>(hash)
  if (hash !== bootHashRef.current) bootHashRef.current = null

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
  // …and a track page, its layout's (#274).
  const trackTitle = trackSlug !== null ? trackPageTitle(trackSlug, ALL_EVENTS) : null
  useTrackFavicon(routeEvent?.trackId ?? trackTitle?.trackId)
  useDocumentTitle(routeEvent?.name ?? trackTitle?.name)
  // …and the status bar above it matches its white header (#245) — once
  // the page has slid in, not while it's still on its way — until a
  // gray Share page has slid in over it.
  const [pushEntered, setPushEntered] = useState(false)
  useChromeColor(((eventPageOpen && pushEntered) || trackEntered) && !overlayEntered ? HEADER_CHROME_COLOR : null)

  const eventStatus = classifyEvent(activeEvent)

  // The signed-in driver's lap times for this event (#210).
  // Fetched only while this event's page is open.
  const lapLog = useLapLog(pageEventId !== null && pageEventId === activeEvent.id ? activeEvent.id : null, driver?.id ?? null)
  const savedLapKeys = new Set(lapLog.byKey.keys())
  // …and their instructor's evaluations of it (#340).
  const notesLog = useNotesLog(pageEventId !== null && pageEventId === activeEvent.id ? activeEvent.id : null, driver?.id ?? null)
  const evaluatedKeys = new Set(notesLog.byKey.keys())
  // The group they drove in, for a TDE report card (#340): their answer to
  // "Did you drive?" — or for another driver's, or with none, their laps'.
  const rsvpGroup = driver ? null : myRunGroup(activeEvent, rsvps[activeEvent.id])
  const drivenGroup = rsvpGroup ?? lapLog.sessions[0]?.group ?? notesLog.sessions[0]?.group
  const evaluationGroup = drivenGroup ? groupFor(drivenGroup, activeEvent.runGroups) : null
  // Sessions with anything saved, and the report card: "My notes (3)".
  const notesCount = new Set([...savedLapKeys, ...evaluatedKeys]).size + (notesLog.evaluation ? 1 : 0)
  // Their best on this track layout across every event — so a lap that's
  // the all-time best can say so. Only once the other events' bests are in.
  const lapSummary = useLapSummary(lapLog.status !== 'off', driver?.id ?? null)
  const layoutBest = bestOnLayout(activeEvent, ALL_EVENTS, lapSummary ?? [], eventBest(lapLog.sessions))
  const allTimeBest = lapSummary ? layoutBest.best : undefined
  // The track page for this event's layout, which the All time best card
  // and a session's saved laps link to (#274).
  const activeLayout = layoutName(activeEvent)
  const activeLayoutSlug = layoutSlug(activeEvent)
  const trackLink = activeLayout && activeLayoutSlug ? { name: activeLayout, href: trackHash(activeLayoutSlug) } : undefined

  // Who else an admin can pick, fetched once they open the laps.
  const drivers = useDrivers(isAdminUser && isOnEventRoute && (lapSlot !== null || activeTab === 'notes'))
  const driverPicker = isAdminUser && user
    ? <DriverPicker driver={driver} onChange={setLapDriver} drivers={drivers} selfId={user.id} />
    : undefined

  const [, setTick] = useState(0)
  useEffect(() => {
    if (!isToday) return
    const id = setInterval(() => setTick(t => t + 1), 60000)
    return () => clearInterval(id)
  }, [isToday])

  const hasPastActivities = isToday
    && activeDay.activities.some(a => a.type !== 'break' && parseMinutes(a.time) < nowMinutes())

  function selectEvent(event: EventConfig) {
    skipPushEnterAnimationRef.current = false
    setActiveEventId(event.id)
    setActiveDayId(defaultDay(event).id)
    // Their own run group's sessions, when they've said which it is (#235).
    const mine = myRunGroup(event, rsvps[event.id])
    setSelectedGroups(mine ? [mine] : [])
    setActiveTab('schedule')
    setLapSlot(null)
    setEvaluationOpen(false)
    setLapDriver(null)
  }

  function switchEvent(event: EventConfig) {
    selectEvent(event)
    setHash(eventHash(event.id))
  }

  function goHome() {
    setHash(LANDING_HASH)
  }

  // Back from a pushed page: to the tab it was opened from.
  function backToTab() {
    setHash(HOME_TAB_HASH[homeTab])
  }

  // From a track page, one of its events, for its sessions: My notes (or,
  // with no laps there yet, the Schedule to add them), with whoever's laps
  // the track page showed. It slides in over the track page
  // — except the event the track page was opened from, already in place
  // under it, which the track page slides away to reveal.
  function openEventNotes(event: EventConfig, tab: EventTabId = 'notes') {
    // The event it was opened from keeps its day and filters.
    if (event.id !== activeEvent.id) selectEvent(event)
    setLapDriver(stack.trackDriver)
    setActiveTab(tab)
    skipPushEnterAnimationRef.current = event.id === trackOverEventId
    setHash(eventHash(event.id))
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
      // The URL already names it — and may be one of its sub-pages, so
      // leave the hash alone.
      if (matched && matched.id !== activeEventId) selectEvent(matched)
      return
    }
    if (isEmptyHash(hash)) {
      const { live } = partitionEvents(EVENTS)
      setHash(live.length > 0 ? eventHash(live[0].id) : LANDING_HASH)
    }
    // ALL_EVENTS too: events arrive from the store after load, so a
    // direct link to one only resolves once the fetch lands.
  }, [hash, ALL_EVENTS])

  // Back where an editor was opened from, without replaying the event
  // page's slide-in.
  function backToEvent(eventId: string) {
    skipPushEnterAnimationRef.current = true
    setHash(eventHash(eventId))
  }

  const editScheduleEventId = eventIdFromEditScheduleHash(hash)
  if (editScheduleEventId !== null) {
    return (
      <ScheduleEditorPage
        eventId={editScheduleEventId}
        onClose={() => backToEvent(editScheduleEventId)}
        onSaved={() => {
          setActiveTab('schedule')
          backToEvent(editScheduleEventId)
          showToast('Schedule saved')
        }}
      />
    )
  }

  const editEventId = eventIdFromEditEventHash(hash)
  if (editEventId !== null) {
    return (
      <EditEventPage
        eventId={editEventId}
        onClose={() => backToEvent(editEventId)}
        onSaved={() => {
          backToEvent(editEventId)
          showToast('Details saved')
        }}
      />
    )
  }

  return (
    <>
    <PullToRefresh disabled={pushMounted || !!shownTrackSlug || !!shownOverlay}>
      {/* Room at the bottom for the tab bar. */}
      <div key={homeTab} className="tab-fade" style={{ paddingBottom: `calc(${TAB_BAR_PX}px + env(safe-area-inset-bottom))` }}>
        {homeTab === 'events' && <LandingPage onOpenEvent={switchEvent} />}
        {homeTab === 'tracks' && <TracksTab />}
        {homeTab === 'garage' && <GarageTab />}
      </div>
    </PullToRefresh>
    <TabBar active={homeTab} />
    {pushMounted && (
    <PushPage
      // A fresh page when it goes over the track page, so it slides in.
      key={eventOverTrack ? 'event over track' : 'event'}
      raised={eventOverTrack}
      open={eventPageOpen}
      onExited={() => setPushMounted(false)}
      onEnteredChange={setPushEntered}
      scrollRef={pushScrollRef}
      skipEnterAnimation={skipPushEnterAnimationRef.current}
    >
    <PullToRefresh disabled={!isOnEventRoute || !!shownOverlay} scrollContainerRef={pushScrollRef}>
    <div className="min-h-screen bg-gray-50" style={routeMissing ? undefined : { minHeight: EVENT_PAGE_MIN_HEIGHT }}>
        {routeMissing ? (
          <MissingEvent loading={!eventsLoaded} onHome={goHome} />
        ) : (<>
        <EventHeader
          event={activeEvent}
          status={eventStatus}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          notesCount={notesCount}
          onRunGroup={id => setSelectedGroups([id])}
          onBack={trackUnderEvent !== null ? () => setHash(trackHash(trackUnderEvent)) : backToTab}
          onDeleted={() => {
            showToast(`“${activeEvent.name}” deleted`)
            goHome()
          }}
          scrollRef={pushScrollRef}
        />

      <div className="mx-auto max-w-lg px-3 pt-4 sm:px-4 sm:pt-6 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
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

              {/* Someone else's laps on show (#288): say whose, and let the admin switch back. */}
              {driver && driverPicker && (
                <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2">{driverPicker}</div>
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
                lapTimes={authStatus === 'signed-in' ? {
                  date: activeDay.date,
                  saved: savedLapKeys,
                  evaluated: evaluatedKeys,
                  onOpen: session => setLapSlot({
                    date: activeDay.date,
                    time: session.time,
                    sessionNumber: session.sessionNumber,
                    groups: session.onTrack,
                  }),
                } : undefined}
              />

              <Legend groups={activeEvent.runGroups} />
            </>
          )}

          {activeTab === 'notes' && authStatus !== 'signed-in' && (
            <SignInPrompt reason="keep private notes for each event" />
          )}

          {activeTab === 'notes' && authStatus === 'signed-in' && (
            <MyLapTimes
              event={activeEvent}
              log={lapLog}
              notes={notesLog}
              layoutBest={layoutBest}
              allTimeBest={allTimeBest}
              track={trackLink}
              driver={driver}
              driverPicker={driverPicker}
              runGroup={evaluationGroup}
              events={ALL_EVENTS}
              onEdit={(session, view) => setLapSlot({
                date: session.date,
                time: session.time,
                sessionNumber: session.sessionNumber,
                groups: [session.group],
                view,
              })}
              onEditEvaluation={() => setEvaluationOpen(true)}
            />
          )}

          {activeTab === 'info' && <EventInfo event={activeEvent} />}
        </div>
      </div>
        </>)}
    </div>
    </PullToRefresh>
    </PushPage>
    )}
    {shownTrackSlug && (
      <PushPage
        key={shownTrackSlug}
        open={trackPageSlug !== null}
        onExited={() => setLastTrackSlug(null)}
        onEnteredChange={setTrackEntered}
        scrollRef={trackScrollRef}
        skipEnterAnimation={bootHashRef.current !== null}
      >
        <PullToRefresh disabled={trackSlug === null || !!shownOverlay} scrollContainerRef={trackScrollRef}>
        <TrackLapsPage
          slug={shownTrackSlug}
          events={ALL_EVENTS}
          eventsLoaded={eventsLoaded}
          // Another driver's laps only when opened from their laps on an event.
          driver={stack.trackDriver}
          active={trackSlug !== null}
          onBack={() => {
            if (trackOverEventId !== null) backToEvent(trackOverEventId)
            else backToTab()
          }}
          onOpenEvent={openEventNotes}
          onAllTracks={() => setHash(HOME_TAB_HASH.tracks)}
        />
        </PullToRefresh>
      </PushPage>
    )}
    {shownOverlay && (
      <PushPage
        key={shownOverlay.kind === 'share' ? `share ${shownOverlay.eventId ?? ''}` : shownOverlay.kind}
        open={overlay !== null}
        onExited={() => setLastOverlay(null)}
        onEnteredChange={setOverlayEntered}
        skipEnterAnimation={bootHashRef.current !== null}
        whiteHeader={false}
        from="bottom"
      >
        {shownOverlay.kind === 'new-event' ? (
          <NewEventPage
            onClose={goHome}
            onCreated={event => {
              switchEvent(event)
              // Already in place under this page, so sliding it back down
              // reveals the new event — rather than that sliding in too.
              skipPushEnterAnimationRef.current = true
              // Reassurance that this is the new event, not an old one.
              showToast(`“${event.name}” created`)
            }}
          />
        ) : shownOverlay.kind === 'widget' ? (
          <WidgetSetupPage closeHref={HOME_TAB_HASH[homeTab]} />
        ) : shownOverlay.eventId !== undefined ? (
          <SharePage
            url={eventShareUrl(shownOverlay.eventId)}
            description="Share this link so others can view this event’s schedule."
            closeHref={eventHash(shownOverlay.eventId)}
          />
        ) : (
          <SharePage closeHref={HOME_TAB_HASH[homeTab]} />
        )}
      </PushPage>
    )}
    {lapSlot && authStatus === 'signed-in' && isOnEventRoute && !routeMissing && (
      <LapTimesSheet
        // A fresh sheet for each session, so nothing typed carries over.
        key={`${activeEvent.id} ${lapSlot.date} ${lapSlot.time} ${lapSlot.groups.join(',')}`}
        slot={lapSlot}
        view={lapSlot.view}
        runGroups={activeEvent.runGroups}
        showDate={multiDay}
        saved={key => lapLog.byKey.get(key)}
        savedNotes={key => notesLog.byKey.get(key)}
        allTimeBest={allTimeBest}
        track={trackLink}
        onOpenTrack={() => {
          setLapSlot(null)
          if (trackLink) setHash(trackLink.href)
        }}
        driver={driver}
        driverPicker={driverPicker}
        loading={lapLog.status === 'loading' || notesLog.status === 'loading'}
        onSave={async session => {
          await lapLog.save(session)
          setLapSlot(null)
          showToast(driver ? `Lap times saved for ${driverName(driver)}` : 'Lap times saved')
        }}
        onRemove={async key => {
          await lapLog.remove(key)
          setLapSlot(null)
          showToast(driver ? `Lap times removed for ${driverName(driver)}` : 'Lap times removed')
        }}
        onSaveEvaluation={async session => {
          await notesLog.saveSession(session)
          setLapSlot(null)
          showToast(driver ? `Evaluation saved for ${driverName(driver)}` : 'Evaluation saved')
        }}
        onRemoveEvaluation={async key => {
          await notesLog.removeSession(key)
          setLapSlot(null)
          showToast(driver ? `Evaluation removed for ${driverName(driver)}` : 'Evaluation removed')
        }}
        onClose={() => setLapSlot(null)}
      />
    )}
    {evaluationOpen && authStatus === 'signed-in' && isOnEventRoute && !routeMissing && (
      <EventEvaluationSheet
        key={`${activeEvent.id} ${driver?.id ?? ''}`}
        event={activeEvent}
        events={ALL_EVENTS}
        existing={notesLog.evaluation}
        runGroup={evaluationGroup}
        driver={driver}
        onSave={async evaluation => {
          await notesLog.saveEvaluation(evaluation)
          setEvaluationOpen(false)
          showToast(driver ? `Evaluation saved for ${driverName(driver)}` : 'Evaluation saved')
        }}
        onRemove={async () => {
          await notesLog.removeEvaluation()
          setEvaluationOpen(false)
          showToast(driver ? `Evaluation removed for ${driverName(driver)}` : 'Evaluation removed')
        }}
        onClose={() => setEvaluationOpen(false)}
      />
    )}
    {/* Clear of the tab bar while a tab is showing. */}
    <Toast toast={toast} onDone={() => setToast(null)} bottomInset={eventPageOpen || trackPageSlug !== null || overlay !== null ? 0 : TAB_BAR_PX} />
    </>
  )
}
