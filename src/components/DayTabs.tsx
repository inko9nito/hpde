import type { DaySchedule } from '../types'

interface Props {
  days: DaySchedule[]
  activeDayId: string
  onSelect: (dayId: string) => void
  // The day that's today, if the event runs today — for the Now button.
  todayDayId?: string
}

/**
 * Day tabs + Now for a multi-day event's schedule. Shared by the event page
 * and the schedule editor's preview (#232), so the preview looks exactly
 * like the page it previews.
 */
export function DayTabs({ days, activeDayId, onSelect, todayDayId }: Props) {
  const nowDisabled = !todayDayId || activeDayId === todayDayId
  return (
    <div className="mb-3 flex items-center gap-2">
      <div className="flex flex-1 gap-1 rounded-lg bg-white border border-gray-200 p-1 shadow-sm min-w-0">
        {days.map(day => (
          <button
            key={day.id}
            onClick={() => onSelect(day.id)}
            className={`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${
              activeDayId === day.id
                ? 'bg-gray-900 text-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {day.label}
          </button>
        ))}
      </div>
      <button
        onClick={() => todayDayId && onSelect(todayDayId)}
        disabled={nowDisabled}
        className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors shrink-0 ${
          nowDisabled
            ? 'border-gray-100 bg-white text-gray-300 cursor-default'
            : 'border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400'
        }`}
      >
        Now
      </button>
    </div>
  )
}
