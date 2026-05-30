import { Utensils, Pizza } from 'lucide-react'
import { formatTime } from '../utils/time'
import type { GeneralEvent } from '../types'

interface Props {
  event: GeneralEvent
  past?: boolean
}

export function EventCard({ event, past }: Props) {
  const isFood = event.type === 'lunch' || event.type === 'special'

  return (
    <div className={`rounded-xl p-4 shadow-sm transition-opacity ${
      isFood
        ? 'border-2 border-gray-900 bg-white my-2'
        : 'border border-gray-200 bg-white'
    } ${past ? 'opacity-40' : ''}`}>
      <div className="flex items-center gap-4">
        <div className="w-16 shrink-0 font-mono text-lg font-semibold text-gray-900">
          {formatTime(event.time)}
        </div>
        {isFood && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white">
            {event.type === 'lunch' ? <Utensils size={16} /> : <Pizza size={16} />}
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-gray-900">{event.label}</p>
          {event.subtitle && (
            <p className="mt-0.5 text-xs text-gray-500">{event.subtitle}</p>
          )}
        </div>
      </div>
    </div>
  )
}
