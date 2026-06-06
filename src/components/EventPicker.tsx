import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import type { EventConfig } from '../types'

interface Props {
  events: EventConfig[]
  active: EventConfig
  onChange: (event: EventConfig) => void
}

export function EventPicker({ events, active, onChange }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-left group"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">{active.name}</h1>
          <p className="text-sm text-gray-500">{active.subtitle}</p>
        </div>
        <ChevronDown size={18} className="text-gray-400 mt-1 group-hover:text-gray-600 transition-colors" />
      </button>

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
