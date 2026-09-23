import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import { ChevronLeft } from 'lucide-react'
import { TrackIcon } from './TrackIcon'
import { EventTabs } from './EventTabs'
import type { EventTabId } from './EventTabs'
import { EventOverflowMenu } from './EventOverflowMenu'
import { formatDateRangeWithWeekday } from '../utils/time'
import type { EventStatus } from '../utils/eventClass'
import type { EventConfig } from '../types'

/** Height of the top bar (back / compact title / overflow). */
const TOP_BAR_PX = 52
/** Height of the title block under it — fixed (the name truncates) so
 *  the header knows exactly how far to scroll before it sticks. */
const TITLE_BLOCK_PX = 78

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
 * Event page header (#216). One white sticky surface — with the shadow
 * along its bottom edge — holding three bands:
 *
 *   1. Top bar: back chevron · compact title · admin "…" menu
 *   2. Title block: track icon + name + date line with LIVE/PAST badge
 *   3. Tabs
 *
 * The header sticks at `top: -TITLE_BLOCK_PX`, so scrolling first slides
 * it up by the title block's height and then pins the top bar and tabs.
 * The top bar is itself sticky inside it, so it stays put while the
 * title block slides up underneath. Only once the title block is fully
 * hidden does the compact copy fade into the top bar — the "collapsed"
 * state from the design — so the two are never visible together.
 * Nothing changes height, so the page never jumps while scrolling.
 */
export function EventHeader({ event, status, activeTab, onTabChange, onBack, onDeleted, scrollRef }: Props) {
  const collapsed = useCollapsed(scrollRef)
  const date = dateLine(event)

  return (
    <div
      className="sticky z-20 border-b border-gray-500/20 bg-white shadow-[0_4px_15px_rgba(12,12,13,0.05)]"
      style={{ top: -TITLE_BLOCK_PX }}
    >
      <div
        className="sticky top-0 z-10 bg-white"
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

      <div className="bg-white" style={{ height: TITLE_BLOCK_PX }}>
        <div className="mx-auto flex h-full max-w-lg items-center gap-3 px-6">
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

      <div className="mx-auto max-w-lg">
        <EventTabs active={activeTab} onChange={onTabChange} />
      </div>
    </div>
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

/** True once the title block has scrolled fully under the top bar. */
function useCollapsed(scrollRef: RefObject<HTMLElement | null>): boolean {
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    const scroller = scrollRef.current
    if (!scroller) return
    const update = () => setCollapsed(scroller.scrollTop >= TITLE_BLOCK_PX)
    update()
    scroller.addEventListener('scroll', update, { passive: true })
    return () => scroller.removeEventListener('scroll', update)
  }, [scrollRef])
  return collapsed
}
