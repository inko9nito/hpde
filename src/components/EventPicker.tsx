import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { eventSubtitle } from '../utils/time'
import { classifyEvent, partitionEvents } from '../utils/eventClass'
import { TrackIcon } from './TrackIcon'
import type { EventConfig } from '../types'

interface Props {
  events: EventConfig[]
  active: EventConfig
  onChange: (event: EventConfig) => void
}

function LiveBadge() {
  return (
    <span className="ml-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-green-700">
      <span className="h-1 w-1 rounded-full bg-green-700 animate-pulse" />
      Live
    </span>
  )
}

function EventRow({
  event,
  active,
  isLive,
  onClick,
}: {
  event: EventConfig
  active: boolean
  isLive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left ${
        active ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}
    >
      <TrackIcon trackId={event.trackId} size={28} tone={active ? 'selected' : 'default'} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-sm font-semibold text-gray-900">{event.name}</span>
          {isLive && <LiveBadge />}
        </div>
        <div className="truncate text-xs text-gray-400">{eventSubtitle(event)}</div>
      </div>
      {active && <Check size={14} className="text-blue-500 ml-1 shrink-0" />}
    </button>
  )
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="px-4 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
      {label}
    </div>
  )
}

export function EventPicker({ events, active, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const { live, upcoming, past } = partitionEvents(events)
  const activeIsLive = classifyEvent(active) === 'live'

  return (
    <div className="relative flex min-w-0 flex-col items-center">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex max-w-full items-center gap-1 group min-w-0"
      >
        <h1 className="truncate text-xl font-bold text-gray-900 leading-tight">{active.name}</h1>
        {activeIsLive && <LiveBadge />}
        <ChevronDown size={16} className="shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors" />
      </button>
      <p className="max-w-full truncate text-center text-sm text-gray-500">{eventSubtitle(active)}</p>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-1/2 top-full z-20 mt-2 min-w-[280px] -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-1 shadow-xl">
            {live.length > 0 && (
              <>
                <SectionHeader label="Live" />
                {live.map(e => (
                  <EventRow
                    key={e.id}
                    event={e}
                    active={e.id === active.id}
                    isLive
                    onClick={() => { onChange(e); setOpen(false) }}
                  />
                ))}
              </>
            )}
            {/* Upcoming header is always shown — otherwise a dropdown
                that only has Past events looks like a bug (issue #206). */}
            <SectionHeader label="Upcoming" />
            {upcoming.length > 0 ? (
              upcoming.map(e => (
                <EventRow
                  key={e.id}
                  event={e}
                  active={e.id === active.id}
                  isLive={false}
                  onClick={() => { onChange(e); setOpen(false) }}
                />
              ))
            ) : (
              <div className="px-4 py-2 text-xs text-gray-400">None</div>
            )}
            {past.length > 0 && (
              <>
                <div className="my-2 border-t border-gray-100" role="separator" />
                <SectionHeader label="Past" />
                {past.map(e => (
                  <EventRow
                    key={e.id}
                    event={e}
                    active={e.id === active.id}
                    isLive={false}
                    onClick={() => { onChange(e); setOpen(false) }}
                  />
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
