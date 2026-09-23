import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { ChevronLeft } from 'lucide-react'
import { TrackIcon } from './TrackIcon'
import { EventTabs } from './EventTabs'
import type { EventTabId } from './EventTabs'
import { EventOverflowMenu } from './EventOverflowMenu'
import { formatDateRangeWithWeekday } from '../utils/time'
import type { EventStatus } from '../utils/eventClass'
import type { EventConfig } from '../types'

/** Height of the sticky top bar (back / compact title / overflow). The
 *  tab strip sticks directly beneath it. */
const TOP_BAR_PX = 52

type BadgeSize = 'md' | 'sm'

/** "LIVE" (red, with a dot) or "PAST" (gray) pill next to the date. */
export function StatusBadge({ status, size = 'md' }: { status: EventStatus; size?: BadgeSize }) {
  if (status === 'upcoming') return null
  const live = status === 'live'
  const sizeCls = size === 'md'
    ? 'gap-1 px-1.5 py-0.5 text-[10px]'
    : 'gap-[3px] px-1 py-px text-[7px]'
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full font-medium uppercase leading-none ${sizeCls} ${
        live ? 'bg-red-500/10 text-red-500' : 'bg-gray-500/10 text-gray-500'
      }`}
    >
      {live && (
        <span
          aria-hidden="true"
          className={`animate-pulse rounded-full bg-current ${size === 'md' ? 'h-1 w-1' : 'h-[3px] w-[3px]'}`}
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
  onBack: () => void
  onDeleted: () => void
  /** The page's scroll container — drives the collapse. */
  scrollRef: RefObject<HTMLElement | null>
}

/**
 * Event page header (#216). Three stacked bands on one white surface:
 *
 *   1. Top bar (sticky): back chevron · compact title · admin "…" menu
 *   2. Title block: track icon + name + date line with LIVE/PAST badge
 *   3. Tabs (sticky, directly under the top bar)
 *
 * On scroll the title block slides up under the top bar, and once it's
 * mostly covered a compact copy of it fades into the top bar — the
 * "collapsed" state from the design. Nothing changes height, so the
 * page never jumps while scrolling.
 */
export function EventHeader({ event, status, activeTab, onTabChange, onBack, onDeleted, scrollRef }: Props) {
  const titleRef = useRef<HTMLDivElement>(null)
  const collapsed = useCollapsed(scrollRef, titleRef)
  const date = dateLine(event)

  return (
    <>
      <div
        className="sticky top-0 z-20 bg-white"
        style={{ height: TOP_BAR_PX }}
      >
        <div className="mx-auto flex h-full max-w-lg items-center gap-2 px-4">
          <BackButton onClick={onBack} />
          {/* Visual echo of the <h1> below — hidden from assistive tech
              so the name isn't announced twice. */}
          <div
            aria-hidden="true"
            className={`flex min-w-0 flex-1 justify-center transition-[opacity,transform] duration-200 ${
              collapsed ? 'opacity-100' : 'pointer-events-none translate-y-1 opacity-0'
            }`}
          >
            <div className="flex min-w-0 items-center gap-2">
              <TrackIcon trackId={event.trackId} tone="dark" size={38} padding={0} radius="rounded-lg" />
              <div className="flex min-w-0 flex-col gap-1">
                <span className="truncate text-[13px] font-bold leading-tight text-gray-900">{event.name}</span>
                <span className="flex min-w-0 items-center gap-1.5">
                  <span className="truncate text-[9px] leading-none text-gray-500">{date}</span>
                  <StatusBadge status={status} size="sm" />
                </span>
              </div>
            </div>
          </div>
          {/* Same 36px footprint as the back button when there's no
              menu, so the compact title stays centred. */}
          <div className="flex h-9 w-9 shrink-0 justify-end">
            <EventOverflowMenu event={event} onDeleted={onDeleted} />
          </div>
        </div>
      </div>

      <div ref={titleRef} className="bg-white">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-6 pb-2.5 pt-2.5">
          {/* No padding: the track SVGs already carry their own margin
              inside a square viewBox. */}
          <TrackIcon trackId={event.trackId} tone="dark" size={58} padding={0} radius="rounded-xl" />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <h1 className="truncate text-xl font-bold leading-tight text-gray-900">{event.name}</h1>
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="truncate text-[13px] leading-tight text-gray-500">{date}</span>
              <StatusBadge status={status} />
            </div>
          </div>
        </div>
      </div>

      <div
        className="sticky z-10 border-b border-gray-500/20 bg-white shadow-[0_4px_15px_rgba(12,12,13,0.05)]"
        style={{ top: TOP_BAR_PX }}
      >
        <div className="mx-auto max-w-lg">
          <EventTabs active={activeTab} onChange={onTabChange} />
        </div>
      </div>
    </>
  )
}

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Back"
      className="-ml-1 inline-grid h-9 w-9 shrink-0 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
    >
      <ChevronLeft size={26} strokeWidth={2.25} />
    </button>
  )
}

/**
 * True once the title block has scrolled at least halfway under the
 * sticky top bar. Re-reads the block's height on each scroll so a font
 * load or rotation doesn't leave a stale threshold.
 */
function useCollapsed(
  scrollRef: RefObject<HTMLElement | null>,
  titleRef: RefObject<HTMLElement | null>,
): boolean {
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    const scroller = scrollRef.current
    if (!scroller) return
    const update = () => {
      const title = titleRef.current
      const threshold = title ? title.offsetHeight / 2 : 40
      setCollapsed(scroller.scrollTop > threshold)
    }
    update()
    scroller.addEventListener('scroll', update, { passive: true })
    return () => scroller.removeEventListener('scroll', update)
  }, [scrollRef, titleRef])
  return collapsed
}
