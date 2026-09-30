import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { ChevronLeft } from 'lucide-react'
import { TrackIcon } from './TrackIcon'
import { DateBlock } from './DateBlock'
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
export function EventHeader({ event, status, activeTab, onTabChange, notesCount, onRunGroup, onBack, onDeleted, scrollRef }: Props) {
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
            <div className="flex min-w-0 items-center gap-2">
              <DateBlock event={event} muted={status === 'past'} size="sm" />
              <div className="flex min-w-0 flex-col gap-1">
                <span className="truncate font-rubik text-[13px] font-bold leading-tight text-gray-900">{event.name}</span>
                <span className="flex min-w-0 items-center gap-1.5">
                  <span className="truncate text-[10px] leading-none text-gray-500">{date}</span>
                  <StatusBadge status={status} size="sm" />
                </span>
              </div>
            </div>
          </div>
          {/* Same 36px footprint as the back button, so the compact
              title stays centred. */}
          <div className="flex h-9 w-9 shrink-0 justify-end">
            <EventOverflowMenu event={event} onDeleted={onDeleted} />
          </div>
        </div>
      </div>

      <div style={{ height: TITLE_BLOCK_PX }}>
        <div ref={titleContentRef} className="mx-auto flex h-full max-w-lg items-center gap-4 px-6 pb-1">
          <DateBlock event={event} muted={status === 'past'} size="lg" />
          <div aria-hidden="true" className="w-px self-stretch bg-gray-200" style={{ marginBlock: 14 }} />
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

      <div className="mx-auto max-w-lg">
        <EventTabs active={activeTab} onChange={onTabChange} notesCount={notesCount} />
      </div>
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

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Back"
      className={`-ml-1 ${ICON_BUTTON}`}
    >
      <ChevronLeft size={26} strokeWidth={2.25} />
    </button>
  )
}

/**
 * Drives the scroll-linked fade of the title block (written straight to
 * its style, so scrolling doesn't re-render the header every frame) and
 * returns true once it has fully faded — the cue for the compact title.
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
    update()
    scroller.addEventListener('scroll', update, { passive: true })
    return () => scroller.removeEventListener('scroll', update)
  }, [scrollRef, titleContentRef])
  return collapsed
}
