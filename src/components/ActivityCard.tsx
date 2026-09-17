import { Utensils, Pizza } from 'lucide-react'
import { formatTime, formatAmPm } from '../utils/time'
import type { GeneralActivity } from '../types'

interface Props {
  activity: GeneralActivity
  past?: boolean
}

export function ActivityCard({ activity, past }: Props) {
  const isFood = activity.type === 'lunch' || activity.type === 'special'

  return (
    <div className={`rounded-xl p-4 shadow-sm transition-opacity ${
      isFood
        ? 'border-2 border-gray-900 bg-white my-2'
        : 'border border-gray-200 bg-white'
    } ${past ? 'opacity-60' : ''}`}>
      <div className="flex items-center gap-4">
        <div className="flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900">
          {formatTime(activity.time)}
          <span className="font-sans text-[10px] font-normal text-gray-400">{formatAmPm(activity.time)}</span>
        </div>
        {isFood && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white">
            {activity.type === 'lunch' ? <Utensils size={16} /> : <Pizza size={16} />}
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-gray-900">{activity.label}</p>
          {activity.subtitle && (
            <p className="mt-0.5 text-xs text-gray-500">{activity.subtitle}</p>
          )}
        </div>
      </div>
    </div>
  )
}
