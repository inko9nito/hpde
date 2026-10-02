import type { ReactNode } from 'react'
import { DateBlock } from './DateBlock'
import { TrackIcon } from './TrackIcon'
import { StatusBadge } from './EventHeader'
import { GroupBadge } from './GroupBadge'
import type { EventConfig, RunGroupConfig } from '../types'

// An event in a list, as the Events tab shows it — and everywhere else an
// event is a row of its own, like a car's events (#408), so a change to
// one is a change to all.

// Soft, low shadow under every card (a touch of lift, not a float).
const CARD_SHADOW = 'shadow-[0_1px_2px_rgba(17,24,39,0.04),0_4px_12px_rgba(17,24,39,0.05)]'
// Inner padding of a card's date + title row.
export const CARD_PADDING = 'p-4'

/** A card's frame: border, corners, shadow — the Tracks tab's rows too (#274). */
export const CARD_FRAME = `w-full rounded-xl border border-gray-200 bg-white ${CARD_SHADOW}`

/** A card's box: its frame and padding. */
const CARD_BOX = `${CARD_FRAME} ${CARD_PADDING}`

// Every compact row on the page — past event card, loading skeleton,
// empty state — shares this shell (p-4 + 48px tile + border = 82px),
// so swapping between them never shifts the page.
export const CARD_SHELL = `flex items-center gap-4 ${CARD_BOX}`

/** In place of a list of cards with none: the same height as one. */
export function EmptyRow({ children }: { children: string }) {
  return (
    <div className={`${CARD_SHELL} h-[82px] justify-center text-sm text-gray-500`}>
      {children}
    </div>
  )
}

/**
 * Event name (with a LIVE pill when it's on today) over its organizer —
 * after their run group there, on My events (#330) — and, on a car's page,
 * who drove it there, a line to itself (#408, #410).
 */
export function EventTitle({ event, live, group, below }: {
  event: EventConfig
  live: boolean
  group?: RunGroupConfig
  /** A line of its own under the organizer: a car's drivers there, in their run groups. */
  below?: ReactNode
}) {
  return (
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <span className="truncate font-rubik text-[15px] font-semibold leading-tight text-gray-900">
          {event.name}
        </span>
        {live && <StatusBadge status="live" size="sm" />}
      </div>
      <div className="mt-0.5 flex min-w-0 items-center gap-2">
        {group && <GroupBadge group={group} size="sm" />}
        <span className="truncate text-sm text-gray-500">
          {event.organizer ?? 'Organizer not set'}
        </span>
      </div>
      {below && <div className="mt-1.5 flex min-w-0">{below}</div>}
    </div>
  )
}

/**
 * An event in a line: its date on the left, its name over its organizer,
 * and its track on the right. `muted` (gray month) once it's past.
 */
export function EventCard({
  event,
  muted,
  live,
  group,
  below,
  onClick,
}: {
  event: EventConfig
  muted: boolean
  live: boolean
  group?: RunGroupConfig
  below?: ReactNode
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`${CARD_SHELL} text-left transition-colors ${
        muted ? 'hover:border-gray-300' : 'hover:border-gray-400'
      }`}
    >
      <DateBlock event={event} muted={muted} />
      <EventTitle event={event} live={live} group={group} below={below} />
      {/* Same dark tile as the event page header; no padding, the SVGs
          carry their own margin. */}
      <TrackIcon trackId={event.trackId} tone="dark" size={48} padding={0} radius="rounded-xl" />
    </button>
  )
}
