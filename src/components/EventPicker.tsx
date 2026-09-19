import { useState } from 'react'
import { ChevronDown, Check, Home, Info } from 'lucide-react'
import { eventSubtitle } from '../utils/time'
import { classifyEvent, partitionEvents } from '../utils/eventClass'
import type { EventConfig } from '../types'

interface Props {
  events: EventConfig[]
  active: EventConfig
  onChange: (event: EventConfig) => void
  onOpenDetails: () => void
  onGoHome: () => void
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
      className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left ${
        active ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}
    >
      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-gray-900">{event.name}</span>
          {isLive && <LiveBadge />}
        </div>
        <div className="text-xs text-gray-400">{eventSubtitle(event)}</div>
      </div>
      {active && <Check size={14} className="text-blue-500 ml-3 shrink-0" />}
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

export function EventPicker({ events, active, onChange, onOpenDetails, onGoHome }: Props) {
  const [open, setOpen] = useState(false)
  const { live, upcoming, past } = partitionEvents(events)
  const activeIsLive = classifyEvent(active) === 'live'

  return (
    <div className="relative min-w-0 pl-1">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 text-left group min-w-0"
      >
        <h1 className="text-xl font-bold text-gray-900 leading-tight">{active.name}</h1>
        {activeIsLive && <LiveBadge />}
        <ChevronDown size={16} className="shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors" />
      </button>
      <div className="flex items-center gap-0.5">
        <p className="text-sm text-gray-500">{eventSubtitle(active)}</p>
        <button
          onClick={onOpenDetails}
          aria-label="Event details"
          className="inline-grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <Info size={14} />
        </button>
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-2 min-w-[240px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl">
            <button
              onClick={() => { onGoHome(); setOpen(false) }}
              className="flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left hover:bg-gray-50"
            >
              <Home size={14} className="text-gray-500" />
              <span className="text-sm font-semibold text-gray-900">Home</span>
            </button>
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
            {upcoming.length > 0 && (
              <>
                <SectionHeader label="Upcoming" />
                {upcoming.map(e => (
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
            {past.length > 0 && (
              <>
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
