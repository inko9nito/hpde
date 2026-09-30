import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { ChevronLeft } from 'lucide-react'
import { TrackIcon } from './TrackIcon'
import { DateBlock, firstDayParts } from './DateBlock'
import { EventTabs } from './EventTabs'
import type { EventTabId } from './EventTabs'
import { EventOverflowMenu } from './EventOverflowMenu'
import { RsvpPicker } from './RsvpPicker'
import { ICON_BUTTON } from './iconButton'
import { formatDateRangeWithWeekday } from '../utils/time'
import { layoutName } from '../utils/trackStats'
import type { EventStatus } from '../utils/eventClass'
import type { EventConfig } from '../types'

/** Height of the top bar (back / compact title / overflow). */
const TOP_BAR_PX = 52
/** Height of the title block under it — fixed (the name truncates) so
 *  the header knows exactly how far to scroll before it sticks. */
const TITLE_BLOCK_PX = 96

/** How much taller than the screen an event page is, at least: room to
 *  scroll the whole title block away. A shorter page (a Details tab, a
 *  day with no schedule) could fold the title into the top bar but not
 *  slide the empty block out from under it (#305). */
export const EVENT_PAGE_MIN_HEIGHT = `calc(100vh + ${TITLE_BLOCK_PX}px)`
/** Scroll distance over which the title block fades out as it rises
 *  toward the top bar — fully gone before it reaches the chevron row
 *  (Figma 2043:6837). The compact title takes over from here. */
const TITLE_FADE_PX = 48

type BadgeSize = 'md' | 'sm'

/** "LIVE" (red, with a dot) or "PAST" (gray) pill next to the date. */
export function StatusBadge({ status, size = 'md' }: { status: EventStatus; size?: BadgeSize }) {
  if (status === 'upcoming') return null
  const live = status === 'live'
  const sizeCls = size === 'md'
    ? 'gap-1 px-1.5 py-1 text-[10px]'
    : 'gap-[3.5px] px-[5px] py-[3px] text-[8.5px]'
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full font-rubik font-medium uppercase leading-none ${sizeCls} ${
        live ? 'bg-red-500/10 text-red-500' : 'bg-gray-500/10 text-gray-500'
      }`}
    >
      {live && (
        <span
          aria-hidden="true"
          className={`animate-pulse rounded-full bg-current ${size === 'md' ? 'h-1 w-1' : 'h-[3.5px] w-[3.5px]'}`}
        />
      )}
      {live ? 'Live' : 'Past'}
    </span>
  )
}

/** The line under the event name: its own `subtitle` if the schedule
 *  sets one, otherwise the dates with (short) weekdays. */
function dateLine(event: EventConfig): string {
  return event.subtitle ?? formatDateRangeWithWeekday(event.days, { weekday: 'short' })
}

interface Props {
  event: EventConfig
  status: EventStatus
  activeTab: EventTabId
  onTabChange: (id: EventTabId) => void
  /** Sessions with lap times saved, shown on the My notes tab (#210). */
  notesCount?: number
  /** They picked their run group in the RSVP (#235). */
  onRunGroup?: (id: string) => void
  onBack: () => void
  onDeleted: () => void
  /** Admins only: Switch driver, in the "…" menu (#362). */
  switchDriver?: { driver: string | null; onOpen: () => void }
  /** The page's scroll container — drives the collapse. */
  scrollRef: RefObject<HTMLElement | null>
}

/**
 * Event page header (#216). One white sticky surface — with the shadow
 * along its bottom edge — holding three bands:
 *
 *   1. Top bar: back chevron · compact title · admin "…" menu
 *   2. Title block: the big stacked date (#305), then the name over the
 *      date line (with the LIVE/PAST badge) and, smaller, the track —
 *      the track's own page leads with its shape, the event with its date
 *   3. Tabs
 *
 * The header sticks at `top: -TITLE_BLOCK_PX`, so scrolling first slides
 * it up by the title block's height and then pins the top bar and tabs.
 * The top bar is itself sticky inside it, so it stays put while the
 * title block slides up underneath. The top bar has no background of
 * its own, so the title block isn't sliced off by it; instead the block
 * fades out with scroll and is gone before it reaches the chevron row.
 * Only then does the compact copy fade into the top bar — the
 * "collapsed" state from the design — so the two are never visible
 * together.
 * Nothing changes height, so the page never jumps while scrolling.
 */
export function EventHeader({ event, status, activeTab, onTabChange, notesCount, onRunGroup, onBack, onDeleted, switchDriver, scrollRef }: Props) {
  const titleContentRef = useRef<HTMLDivElement>(null)
  const collapsed = useCollapsed(scrollRef, titleContentRef)
  const date = dateLine(event)

  return (
    <div
      className="sticky z-20 border-b border-gray-500/20 bg-white shadow-[0_4px_15px_rgba(12,12,13,0.05)]"
      style={{ top: -TITLE_BLOCK_PX }}
    >
      <div
        className="sticky top-0 z-10"
        style={{ height: TOP_BAR_PX }}
      >
        <div className="mx-auto flex h-full max-w-lg items-center gap-2 px-4">
          <BackButton onClick={onBack} />
          {/* Visual echo of the <h1> below — hidden from assistive tech
              so the name isn't announced twice. */}
          {/* Fades in, but hides instantly: scrolling back up must not
              show it alongside the title block coming back into view. */}
          <div
            aria-hidden="true"
            className={`flex min-w-0 flex-1 justify-center ${
              collapsed
                ? 'opacity-100 transition-[opacity,transform] duration-200'
                : 'pointer-events-none translate-y-1 opacity-0'
            }`}
          >
            <CompactTitle event={event} status={status} date={date} />
          </div>
          {/* Same 36px footprint as the back button, pulled out to the
              right edge as far as it is to the left (#354), so the
              compact title stays centred and the "…" lines up with the
              content's right edge. */}
          <div className="-mr-3 flex h-9 w-9 shrink-0 justify-end">
            <EventOverflowMenu event={event} onDeleted={onDeleted} switchDriver={switchDriver} />
          </div>
        </div>
      </div>

      <div style={{ height: TITLE_BLOCK_PX }}>
        <div ref={titleContentRef} className="mx-auto flex h-full max-w-lg items-center px-6 pb-1">
          {/* On one baseline, the month's and the name's: the date lines up
              with the text instead of floating beside it. */}
          <div className="flex min-w-0 flex-1 items-baseline gap-4">
            <DateBlock event={event} muted={status === 'past'} size="lg" />
            <div aria-hidden="true" className="w-px self-stretch bg-gray-200" />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <h1 className="truncate font-rubik text-xl font-bold leading-tight text-gray-900">{event.name}</h1>
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="truncate text-[13px] leading-tight text-gray-500">{date}</span>
                <StatusBadge status={status} />
              </div>
              {/* The track, then Join event or their answer (#235) across
                  from it: the date line keeps the width to itself. */}
              <div className="flex min-h-7 min-w-0 items-center gap-2.5">
                <TrackLine event={event} />
                <div className="ml-auto flex shrink-0">
                  <RsvpPicker event={event} status={status} variant="header" onRunGroup={onRunGroup} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg">
        <EventTabs active={activeTab} onChange={onTabChange} notesCount={notesCount} />
      </div>
    </div>
  )
}

/** The collapsed title in the top bar: the small date (#305) beside the
 *  name over the date line. A two-row grid, each row on one baseline, so
 *  the month lines up with the name and the day with the date line. */
function CompactTitle({ event, status, date }: { event: EventConfig; status: EventStatus; date: string }) {
  const parts = firstDayParts(event)
  const monthColor = status === 'past' ? 'text-gray-500' : 'text-red-600'
  return (
    <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-2.5 gap-y-0.5">
      <span className={`text-center font-rubik text-[10px] font-medium uppercase leading-none tracking-wider ${monthColor}`}>
        {parts?.month}
      </span>
      <span className="truncate font-rubik text-[13px] font-bold leading-tight text-gray-900">{event.name}</span>
      <span className="text-center font-rubik text-lg font-bold leading-none text-gray-900">{parts?.day}</span>
      <span className="flex min-w-0 items-center gap-1.5">
        <span className="truncate text-[10px] leading-none text-gray-500">{date}</span>
        <StatusBadge status={status} size="sm" />
      </span>
    </div>
  )
}

/** The track, second to the date (#305): its shape, small, and its
 *  layout ("MSRC 1.7 CW") — the name its track page goes by — or just the
 *  track's name without a layout. */
function TrackLine({ event }: { event: EventConfig }) {
  const name = layoutName(event) ?? event.track?.trim()
  return (
    <span className="flex min-w-0 items-center gap-1.5">
      {/* No padding: the track SVGs already carry their own margin
          inside a square viewBox. */}
      <TrackIcon trackId={event.trackId} tone="dark" size={18} padding={0} radius="rounded" />
      {name && <span className="truncate text-xs leading-tight text-gray-500">{name}</span>}
    </span>
  )
}

// Pulled out to the header's edge, so the chevron lines up with the
// content's left edge under it (#354), as iOS's back chevron does.
export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Back"
      className={`-ml-4 ${ICON_BUTTON}`}
    >
      <ChevronLeft size={26} strokeWidth={2.25} />
    </button>
  )
}

/** How long scrolling has to have stopped (no finger down) before a
 *  half-folded header snaps (#305). Momentum scrolling keeps sending
 *  scroll events, so this only runs once the page has come to rest. */
const SNAP_DELAY_MS = 150

/**
 * Drives the scroll-linked fade of the title block (written straight to
 * its style, so scrolling doesn't re-render the header every frame) and
 * returns true once it has fully faded — the cue for the compact title.
 *
 * It also snaps (#305): a scroll that comes to rest partway through the
 * title block finishes the move, folding the header if the title had
 * already faded and opening it again if not, so the page never sits
 * with the title gone and its empty block still above the tabs.
 */
function useCollapsed(
  scrollRef: RefObject<HTMLElement | null>,
  titleContentRef: RefObject<HTMLElement | null>,
): boolean {
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    const scroller = scrollRef.current
    if (!scroller) return
    const update = () => {
      const progress = Math.min(Math.max(scroller.scrollTop / TITLE_FADE_PX, 0), 1)
      const title = titleContentRef.current
      if (title) {
        title.style.opacity = String(1 - progress)
        title.style.pointerEvents = progress >= 1 ? 'none' : ''
      }
      setCollapsed(progress >= 1)
    }

    let settle: ReturnType<typeof setTimeout> | undefined
    let touching = false
    const snap = () => {
      const top = scroller.scrollTop
      if (top <= 0 || top >= TITLE_BLOCK_PX) return
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      scroller.scrollTo({
        top: top >= TITLE_FADE_PX ? TITLE_BLOCK_PX : 0,
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
    }
    // Never under a finger: wait for it to lift, then for the page to stop.
    const scheduleSnap = () => {
      clearTimeout(settle)
      if (!touching) settle = setTimeout(snap, SNAP_DELAY_MS)
    }
    const onScroll = () => {
      update()
      scheduleSnap()
    }
    const onTouchStart = () => {
      touching = true
      clearTimeout(settle)
    }
    const onTouchEnd = () => {
      touching = false
      scheduleSnap()
    }

    update()
    scroller.addEventListener('scroll', onScroll, { passive: true })
    scroller.addEventListener('touchstart', onTouchStart, { passive: true })
    scroller.addEventListener('touchend', onTouchEnd, { passive: true })
    scroller.addEventListener('touchcancel', onTouchEnd, { passive: true })
    return () => {
      clearTimeout(settle)
      scroller.removeEventListener('scroll', onScroll)
      scroller.removeEventListener('touchstart', onTouchStart)
      scroller.removeEventListener('touchend', onTouchEnd)
      scroller.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [scrollRef, titleContentRef])
  return collapsed
}
