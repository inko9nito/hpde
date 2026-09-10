import { useState } from 'react'
import { ChevronDown, Check, ExternalLink } from 'lucide-react'
import type { EventConfig } from '../types'

interface Props {
  events: EventConfig[]
  active: EventConfig
  onChange: (event: EventConfig) => void
}

export function EventPicker({ events, active, onChange }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative min-w-0 pl-1">
      <div className="flex items-center gap-1">
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-1 text-left group min-w-0"
        >
          <h1 className="text-xl font-bold text-gray-900 leading-tight">{active.name}</h1>
          <ChevronDown size={16} className="shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </button>
        {active.link && (
          <a
            href={active.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Event page"
            className="shrink-0 rounded-md p-1 text-gray-400 transition-colors hover:text-gray-700"
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>
      <p className="text-sm text-gray-500">{active.subtitle}</p>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-2 min-w-[200px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl">
            {events.map(e => (
              <button
                key={e.id}
                onClick={() => { onChange(e); setOpen(false) }}
                className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 hover:bg-gray-50 text-left"
              >
                <div>
                  <div className="text-sm font-semibold text-gray-900">{e.name}</div>
                  <div className="text-xs text-gray-400">{e.subtitle}</div>
                </div>
                {e.id === active.id && <Check size={14} className="text-blue-500 ml-3 shrink-0" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
