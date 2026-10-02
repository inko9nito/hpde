import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronRight, Plus, UserPlus } from 'lucide-react'
import { Avatar, AvatarStack, useDriverAvatar } from './Avatar'
import { useAuth } from '../auth/AuthContext'
import { BackButton } from './EventHeader'
import { CARD_FRAME, EmptyRow, EventCard } from './EventCard'
import { TabStrip } from './EventTabs'
import { CarFormPage } from './CarFormPage'
import { ChangeSheet } from './ChangeSheet'
import { DriveAtSheet } from './DriveAtSheet'
import { GroupBadge } from './GroupBadge'
import { ShareCarSheet } from './ShareCarSheet'
import { useCarPhoto, useGarage } from '../data/GarageContext'
import { useRsvps } from '../data/RsvpsContext'
import { MAX_DRIVERS, carEvents, carHeading, carOutings, carSubtitle, consumableLabel, consumablesOn, driverLabel, formatDay, isShared, logNewestFirst, othersText } from '../utils/garage'
import type { Car, CarOuting, LogEntry } from '../utils/garage'
import { classifyEvent } from '../utils/eventClass'
import type { EventConfig } from '../types'

const CAR_HASH_PREFIX = '#/garage/'

/** A car's page (#344), over the Garage (More › Garage). */
export function carHash(carId: string): string {
  return `${CAR_HASH_PREFIX}${encodeURIComponent(carId)}`
}

export function carIdFromHash(hash: string): string | null {
  if (!hash.startsWith(CAR_HASH_PREFIX)) return null
  return decodeURIComponent(hash.slice(CAR_HASH_PREFIX.length).split('/')[0]) || null
}

type CarTab = 'setup' | 'history' | 'events'

const TABS: readonly { id: CarTab; label: string }[] = [
  { id: 'setup', label: 'Setup' },
  { id: 'history', label: 'History' },
  { id: 'events', label: 'Events' },
]

/** Height of the top bar (Back · the car's name, once its title scrolls away · Edit). */
const TOP_BAR_PX = 52

/** A section's heading, over its card. */
function SectionTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3 px-1">
      <h2 className="font-rubik text-lg font-bold text-gray-900">{children}</h2>
      {aside}
    </div>
  )
}

/** A heading over a run of cards — a month, past or upcoming — as the Events tab's Past is. */
function ListTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3">
      <h3 className="font-rubik text-xs font-medium uppercase tracking-[0.15em] text-gray-500">{children}</h3>
      {aside}
    </div>
  )
}

/** The car's photo, under its name: changed from Edit. */
function CarPhoto({ car }: { car: Car }) {
  const src = useCarPhoto(car)
  if (!car.photo) return null
  return (
    <div className="mt-4 overflow-hidden rounded-2xl bg-gray-100">
      {src
        ? <img src={src} alt={carHeading(car)} className="aspect-[16/10] w-full object-cover" data-car-photo />
        : <div className="aspect-[16/10] w-full animate-pulse" aria-busy="true" />}
    </div>
  )
}

/**
 * Who drove the car at an event, in which run group (#398): each of a
 * shared car's drivers who did, or for a car of their own, the group.
 */
function WhoDrove({ outing, shared }: { outing: CarOuting; shared: boolean }) {
  const avatarOf = useDriverAvatar()
  const shown = outing.drivers.filter(d => shared || d.runGroup)
  if (shown.length === 0) return null
  return (
    <span className="flex shrink-0 items-center gap-2.5 text-xs text-gray-700" data-who-drove>
      {shown.map(({ driver, runGroup }) => {
        const group = outing.event.runGroups.find(g => g.id === runGroup)
        return (
          <span key={driver.id || 'you'} className="inline-flex items-center gap-1" title={shared ? driverLabel(driver) : undefined}>
            {/* Their picture, on a shared car (#410); their name for screen readers. */}
            {shared && <><Avatar name={driver.name} url={avatarOf(driver)} size={20} /><span className="sr-only">{driverLabel(driver)}</span></>}
            {group && <GroupBadge group={group} size="sm" />}
          </span>
        )
      })}
    </span>
  )
}

/**
 * A car taken out of the garage (#410): when, that it's kept for its
 * events, and the way to put it back — or to delete it for good.
 */
function RemovedNotice({ car, events, onRestore, onDelete }: {
  car: Car
  events: number
  onRestore: () => Promise<void>
  onDelete: () => Promise<void>
}) {
  const [busy, setBusy] = useState<'restoring' | 'deleting' | null>(null)
  const [confirming, setConfirming] = useState(false)
  const [failure, setFailure] = useState<string | null>(null)
  const run = async (what: 'restoring' | 'deleting', action: () => Promise<void>) => {
    setBusy(what)
    setFailure(null)
    try {
      await action()
    } catch (err) {
      setFailure((err as Error).message)
      setBusy(null)
    }
  }
  return (
    <section aria-label="Removed" className={`${CARD_FRAME} mt-4 px-4 py-3.5`}>
      <p className="text-sm text-gray-700">
        Removed from your garage on {formatDay(car.archived!.slice(0, 10))}.
        {events > 0 && ` It’s kept for the ${events === 1 ? 'event' : `${events} events`} you drove it at.`}
      </p>
      {confirming ? (
        <div className="mt-3">
          <p className="text-sm text-gray-700">Delete it for good? {events > 0 ? 'Your events keep their tire pressures, but not the car.' : ''}</p>
          <div className="mt-2 flex items-center gap-4 text-sm font-semibold">
            <button onClick={() => run('deleting', onDelete)} disabled={!!busy} className="text-red-600 hover:text-red-700 disabled:opacity-50">
              {busy === 'deleting' ? 'Deleting…' : 'Delete'}
            </button>
            <button onClick={() => setConfirming(false)} disabled={!!busy} className="font-normal text-gray-500 hover:text-gray-700">Keep</button>
          </div>
        </div>
      ) : (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <button
            onClick={() => run('restoring', onRestore)}
            disabled={!!busy}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
          >
            {busy === 'restoring' ? 'Putting it back…' : 'Put back in garage'}
          </button>
          <button onClick={() => setConfirming(true)} disabled={!!busy} className="text-sm text-red-600 hover:text-red-700">Delete for good</button>
        </div>
      )}
      {failure && <p role="alert" className="mt-2 text-xs text-red-700">{failure}</p>}
    </section>
  )
}

/**
 * "+ Add entry", "+ Add to event": across from a list's heading, at the top
 * of the tab, so there's no scrolling to the end to add one — as the Events
 * tab's Add event is.
 */
function AddLink({ onClick, children }: { onClick: () => void; children: string }) {
  return (
    <button
      onClick={onClick}
      className="-mr-2 inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 font-rubik text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
    >
      <Plus size={16} aria-hidden="true" />
      {children}
    </button>
  )
}

/**
 * Whether the page's title has scrolled up under the top bar — the cue
 * for the bar's own copy of the name, as on iOS.
 */
function useScrolledPast(el: HTMLElement | null, offset: number): boolean {
  const [past, setPast] = useState(false)
  useEffect(() => {
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => setPast(!entry.isIntersecting && entry.boundingClientRect.top < (entry.rootBounds?.top ?? offset)),
      { rootMargin: `-${offset}px 0px 0px 0px` },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [el, offset])
  return past
}

/**
 * Setup (#410): what the car is fitted with now — its lug nut torque, its
 * maintenance (the consumables last changed) and, to come, its
 * modifications (#390).
 */
function SetupPanel({ car, onOpenEntry, onLog }: {
  car: Car
  onOpenEntry: (entry: LogEntry) => void
  /** None for a car out of the garage. */
  onLog?: () => void
}) {
  const on = consumablesOn(car)
  const log = logNewestFirst(car)
  return (
    <div className="space-y-7">
      <section aria-label="Details" className={`${CARD_FRAME} flex min-h-14 items-center justify-between gap-3 px-4 py-3`}>
        <span className="text-[15px] text-gray-700">Lug nut torque</span>
        {car.lugNutTorque !== undefined
          ? <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-sm font-semibold tabular-nums text-gray-900">{car.lugNutTorque} ft·lb</span>
          : <span className="text-sm text-gray-400">Not set</span>}
      </section>

      {/* Maintenance, as it's to sit beside Modifications (#390). */}
      <section aria-label="Maintenance">
        <SectionTitle aside={onLog && <AddLink onClick={onLog}>Add entry</AddLink>}>Maintenance</SectionTitle>
        {on.length === 0 ? (
          <p className={`${CARD_FRAME} px-4 py-4 text-sm text-gray-500`}>None logged yet. Add an entry to keep track of what’s on the car.</p>
        ) : (
          <ul className={`${CARD_FRAME} overflow-hidden`}>
            {on.map(c => {
              // The change that put it on.
              const entry = log.find(e => e.date === c.date && e.parts.some(p => p.part === c.part))
              return (
                <li key={c.part} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => entry && onOpenEntry(entry)}
                    className="flex min-h-[60px] w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-gray-50"
                  >
                    <span className="w-[6.5rem] shrink-0 text-sm text-gray-500">{consumableLabel(c.part)}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] text-gray-900">{c.what ?? 'Changed'}</span>
                      <span className="block text-[13px] text-gray-500">Since {formatDay(c.date)}</span>
                    </span>
                    <ChevronRight size={16} className="shrink-0 text-gray-400" aria-hidden="true" />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      {/* A place for them till they can be logged (#390). */}
      <section aria-label="Modifications">
        <SectionTitle>Modifications</SectionTitle>
        <p className={`${CARD_FRAME} px-4 py-4 text-sm text-gray-500`}>Coming soon: sway bars, coilovers, seats and the rest, as they go on.</p>
      </section>
    </div>
  )
}

/** "September 2026": a month's heading in the change history. */
function monthTitle(date: string): string {
  const [y, m] = date.split('-').map(Number)
  return `${new Date(y, m - 1, 1).toLocaleString('en-US', { month: 'long' })} ${y}`
}

/** "Sep 9": a change's day, under its month's heading. */
function dayTitle(date: string): string {
  return formatDay(date).replace(/, \d+$/, '')
}

/**
 * History (#410): every change logged, newest first, a list for each
 * month — the day in a column of its own, not the events' stacked date —
 * each part on lines of its own (what it is, what went on, where), parts
 * changed the same day split by a rule, as a schedule's sessions at the
 * same time are. Each opens its entry to change or remove.
 */
function HistoryPanel({ car, onOpenEntry, onLog }: {
  car: Car
  onOpenEntry: (entry: LogEntry) => void
  /** None for a car out of the garage. */
  onLog?: () => void
}) {
  const log = logNewestFirst(car)
  const months: { month: string; days: { date: string; entries: LogEntry[] }[] }[] = []
  for (const e of log) {
    const month = e.date.slice(0, 7)
    if (months[months.length - 1]?.month !== month) months.push({ month, days: [] })
    const days = months[months.length - 1].days
    if (days[days.length - 1]?.date !== e.date) days.push({ date: e.date, entries: [] })
    days[days.length - 1].entries.push(e)
  }
  const add = onLog && <AddLink onClick={onLog}>Add entry</AddLink>
  if (log.length === 0) {
    return (
      <section aria-label="History">
        <ListTitle aside={add}>History</ListTitle>
        <EmptyRow>Nothing logged yet.</EmptyRow>
      </section>
    )
  }
  return (
    <div aria-label="Change log" role="group" className="space-y-7">
      {months.map(({ month, days }, i) => (
        <section key={month} aria-label={monthTitle(`${month}-01`)}>
          <ListTitle aside={i === 0 ? add : undefined}>{monthTitle(`${month}-01`)}</ListTitle>
          <ul className={`${CARD_FRAME} overflow-hidden`}>
            {days.map(({ date, entries }) => (
              <li key={date} className="flex gap-3 border-b border-gray-100 pl-4 last:border-b-0">
                <span className="w-14 shrink-0 py-3 text-[13px] tabular-nums text-gray-500">{dayTitle(date)}</span>
                <div className="min-w-0 flex-1 divide-y divide-gray-100">
                  {entries.flatMap(e => e.parts.map((p, j) => (
                    <button
                      key={`${e.id} ${p.part}`}
                      onClick={() => onOpenEntry(e)}
                      className="flex w-full items-start gap-3 py-3 pr-4 text-left transition-colors hover:bg-gray-50"
                      data-history-part
                    >
                      <span className="min-w-0 flex-1 text-sm leading-snug">
                        <span className="block font-semibold text-gray-900">{consumableLabel(p.part)}</span>
                        {p.what && <span className="block text-gray-700">{p.what}</span>}
                        {e.shop && <span className="block text-gray-500">{e.shop}</span>}
                        {/* The job's note, once, under its last part. */}
                        {e.note && j === e.parts.length - 1 && <span className="mt-1 block whitespace-pre-line text-xs text-gray-500">{e.note}</span>}
                      </span>
                      <ChevronRight size={16} className="mt-0.5 shrink-0 text-gray-400" aria-hidden="true" />
                    </button>
                  )))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

/**
 * Events (#408, #410): the ones it's going to, soonest first, then the ones
 * it went to — each the Events tab's own card, with who drove it there in
 * which run group — which open on their My notes.
 */
function EventsPanel({ car, outings, onOpenEvent, onAdd }: {
  car: Car
  outings: CarOuting[]
  onOpenEvent: (event: EventConfig) => void
  /** None for a car out of the garage. */
  onAdd?: () => void
}) {
  const shared = isShared(car)
  const status = (o: CarOuting) => classifyEvent(o.event)
  const upcoming = outings.filter(o => status(o) !== 'past').reverse()
  const past = outings.filter(o => status(o) === 'past')
  const add = onAdd && <AddLink onClick={onAdd}>Add to event</AddLink>
  const cards = (rows: CarOuting[], label: string) => (
    <ul className="space-y-4" aria-label={label}>
      {rows.map(o => (
        <li key={o.event.id}>
          <EventCard
            event={o.event}
            muted={status(o) === 'past'}
            live={status(o) === 'live'}
            before={<WhoDrove outing={o} shared={shared} />}
            onClick={() => onOpenEvent(o.event)}
          />
        </li>
      ))}
    </ul>
  )
  return (
    <div className="space-y-8">
      {upcoming.length > 0 && (
        <section aria-label="Upcoming">
          <ListTitle aside={add}>Upcoming</ListTitle>
          {cards(upcoming, 'Upcoming events')}
        </section>
      )}
      <section aria-label="Past">
        <ListTitle aside={upcoming.length > 0 ? undefined : add}>Past</ListTitle>
        {past.length === 0
          ? <EmptyRow>{upcoming.length ? 'None yet.' : 'No events yet.'}</EmptyRow>
          : cards(past, 'Past events')}
      </section>
    </div>
  )
}

/**
 * A car's page (#344), pushed over the Garage (#410): its name and photo,
 * Share and Edit at the top — shared with another driver, it's theirs to
 * keep up too (#398), and its page says who — and three tabs: Setup,
 * what's on it now;
 * History, every change logged to its consumables, each of which opens to
 * change or remove; and Events, the ones it's been to and is going to, as
 * the Events tab shows them (#408), which open on their My notes.
 */
export function CarPage({ carId, events, onBack, onOpenEvent, onToast }: {
  carId: string
  events: EventConfig[]
  onBack: () => void
  onOpenEvent: (event: EventConfig) => void
  onToast: (text: string) => void
}) {
  const garage = useGarage()
  const { rsvps } = useRsvps()
  const car = garage.cars.find(c => c.id === carId)
  const [tab, setTab] = useState<CarTab>('setup')
  // Edit's page, while it's open: a new one each time, so one opened while
  // the last is still sliding away starts afresh.
  const [editing, setEditing] = useState<number | null>(null)
  const [addingEvents, setAddingEvents] = useState(false)
  const [sharing, setSharing] = useState(false)
  // The log entry open in its sheet: one to change, or a new one.
  const [entry, setEntry] = useState<LogEntry | 'new' | null>(null)
  // A ref that re-renders: the title is only there once the car's loaded.
  const [title, setTitle] = useState<HTMLHeadingElement | null>(null)
  const collapsed = useScrolledPast(title, TOP_BAR_PX)
  const avatarOf = useDriverAvatar()
  const { user } = useAuth()
  // You first, then the others in the order they joined; on a car of your own, you.
  const drivers = car?.drivers?.length
    ? [...car.drivers].sort((a, b) => Number(!!b.you) - Number(!!a.you))
    : [{ id: '', name: user?.name ?? user?.email ?? 'You', you: true }]
  const faces = drivers.map(d => ({ name: d.name, url: avatarOf(d) }))

  const topBar = (
    <div className="sticky top-0 z-30 bg-gray-50" style={{ height: TOP_BAR_PX }}>
      <div className="mx-auto grid h-full max-w-lg grid-cols-[minmax(4rem,1fr)_minmax(0,max-content)_minmax(4rem,1fr)] items-center gap-2 px-4">
        <div className="justify-self-start"><BackButton onClick={onBack} /></div>
        {/* The title's echo, once it's scrolled away — hidden from
            assistive tech so the name isn't announced twice. */}
        <span
          aria-hidden="true"
          className={`truncate text-center font-rubik text-[15px] font-semibold text-gray-900 ${
            car && collapsed ? 'opacity-100 transition-opacity duration-200' : 'opacity-0'
          }`}
        >
          {car ? carHeading(car) : ''}
        </span>
        {car && !car.archived ? (
          <div className="-mr-2 flex items-center gap-1 justify-self-end">
            {/* Who drives it is the car's, not its setup's (#398): their
                pictures up here (#410), and another added from them. */}
            {drivers.length < MAX_DRIVERS ? (
              <button
                onClick={() => setSharing(true)}
                aria-label="Share with another driver"
                className="inline-flex h-9 shrink-0 items-center gap-1 rounded-full pl-1 pr-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                data-share-car
              >
                <AvatarStack people={faces} size={26} ring="ring-gray-50" />
                <UserPlus size={18} strokeWidth={2.25} aria-hidden="true" />
              </button>
            ) : <AvatarStack people={faces} size={26} ring="ring-gray-50" />}
            <button
              onClick={() => setEditing(n => (n ?? 0) + 1)}
              className="rounded-lg px-2 py-2 text-[15px] font-semibold text-blue-600 hover:text-blue-700"
            >
              Edit
            </button>
          </div>
        ) : <span />}
      </div>
    </div>
  )

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50">
        {topBar}
        <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">
          {garage.status === 'loading' ? (
            <div className="h-44 animate-pulse rounded-2xl border border-gray-200 bg-white" aria-busy="true" aria-label="Loading your car" />
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
              <p className="text-sm font-medium text-gray-700">This car isn’t in your garage</p>
              <p className="mt-1 text-xs text-gray-400">It may have been removed.</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Theirs: the events in their garage it's the car of.
  const went = carEvents(car.id, garage, events)
  // And its other drivers', on a shared car (#398).
  const outings = carOutings(car, garage, events, rsvps)
  const subtitle = carSubtitle(car)

  return (
    <div className="min-h-screen bg-gray-50">
      {topBar}
      <div className="mx-auto max-w-lg px-3 pb-5 sm:px-4">
        <h1 ref={setTitle} className="px-1 font-rubik text-[28px] font-bold leading-tight text-gray-900">{carHeading(car)}</h1>
        {subtitle && <p className="mt-0.5 px-1 text-[15px] text-gray-500">{subtitle}</p>}
        {isShared(car) && (
          <p className="mt-2 flex items-center gap-2 px-1 text-sm text-gray-500" data-drivers>
            <AvatarStack people={drivers.filter(d => !d.you).map(d => ({ name: d.name, url: avatarOf(d) }))} size={22} ring="ring-gray-50" />
            <span className="min-w-0 truncate">Shared with {othersText(car)}</span>
          </p>
        )}
        {car.archived && (
          <RemovedNotice
            car={car}
            events={went.length}
            onRestore={async () => {
              await garage.restoreCar(car.id)
              onToast('Back in your garage')
            }}
            onDelete={async () => {
              await garage.removeCar(car.id)
              onToast('Car deleted')
              onBack()
            }}
          />
        )}
        <CarPhoto car={car} />
      </div>
      <div className="sticky z-20 border-b border-gray-200 bg-gray-50" style={{ top: TOP_BAR_PX }}>
        <div className="mx-auto max-w-lg">
          <TabStrip tabs={TABS} active={tab} onChange={setTab} label="Car section" idPrefix="car" className="px-1 pt-2" />
        </div>
      </div>
      <div
        role="tabpanel"
        id={`car-tabpanel-${tab}`}
        aria-labelledby={`car-tab-${tab}`}
        // At least a screen tall, so a shorter tab doesn't pull the page back up.
        className="mx-auto min-h-screen max-w-lg px-3 pt-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-4"
      >
        {tab === 'setup' && (
          <SetupPanel car={car} onOpenEntry={setEntry} onLog={car.archived ? undefined : () => setEntry('new')} />
        )}
        {tab === 'history' && <HistoryPanel car={car} onOpenEntry={setEntry} onLog={car.archived ? undefined : () => setEntry('new')} />}
        {tab === 'events' && (
          <EventsPanel car={car} outings={outings} onOpenEvent={onOpenEvent} onAdd={car.archived ? undefined : () => setAddingEvents(true)} />
        )}
      </div>

      {editing !== null && (
        <CarFormPage
          key={editing}
          car={car}
          events={went.length}
          onSaved={() => onToast('Car saved')}
          onRemoved={() => {
            onToast(went.length ? 'Removed from your garage' : 'Car removed')
            onBack()
          }}
          onClosed={() => setEditing(null)}
        />
      )}
      {sharing && <ShareCarSheet car={car} invite={garage.invite} onClose={() => setSharing(false)} />}
      {addingEvents && (
        <DriveAtSheet
          car={car}
          garage={garage}
          onSave={async ids => {
            await garage.driveAt(car.id, ids)
            setAddingEvents(false)
            onToast(ids.length === 1 ? 'Added to 1 event' : `Added to ${ids.length} events`)
          }}
          onClose={() => setAddingEvents(false)}
        />
      )}
      {entry && (
        <ChangeSheet
          key={entry === 'new' ? 'new' : entry.id}
          car={car}
          garage={garage}
          entry={entry === 'new' ? undefined : entry}
          onSave={async next => {
            await garage.saveEntry(car.id, next)
            setEntry(null)
            onToast(entry === 'new' ? 'Entry added' : 'Entry saved')
          }}
          onRemove={entry === 'new' ? undefined : async () => {
            await garage.removeEntry(car.id, entry.id)
            setEntry(null)
            onToast('Entry removed')
          }}
          onClose={() => setEntry(null)}
        />
      )}
    </div>
  )
}
