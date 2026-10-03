import { ChevronRight, Plus, Waves } from 'lucide-react'
import { daySummary } from '../data/weather'
import type { DayWeather, WeatherStatus } from '../data/weather'
import { skyLabel, surfaceTrend } from '../utils/conditions'
import { SKY_ICONS } from './skyIcons'
import type { SessionConditions } from '../utils/conditions'
import type { EventConfig } from '../types'

export interface EventConditionsProps {
  weather: { status: WeatherStatus; byDate: Map<string, DayWeather> }
  /** Signed in: what they recorded for each session, and their note on the day. */
  conditions?: {
    sessions: { key: string; conditions: SessionConditions }[]
    note?: string
    onViewSessions: () => void
    onEditNote?: () => void
  }
}

const weekday = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { weekday: 'short' })
}

/** "68–79°F · 0.4 in of rain", or ahead of the day "61–76°F · 70% chance of rain". */
export function weatherLine(day: DayWeather): string {
  const range = `${day.lowF}–${day.highF}°F`
  if (day.kind === 'forecast') return day.rainChance ? `${range} · ${day.rainChance}% chance of rain` : range
  return day.precipIn >= 0.01 ? `${range} · ${day.precipIn.toFixed(2).replace(/0$/, '')} in of rain` : `${range} · no rain`
}

/**
 * The event's conditions (#347), first on Details: the weather near the
 * track each day — a forecast ahead of it, what it was after — and, signed
 * in, how the surface went across the sessions they recorded, and their
 * note on the day.
 */
export function EventConditionsCard({ event, weather, conditions }: { event: EventConfig } & EventConditionsProps) {
  const days = event.days.map(d => weather.byDate.get(d.date)).filter((d): d is DayWeather => !!d)
  const trend = conditions && surfaceTrend(conditions.sessions.map(s => s.conditions))
  const recorded = conditions?.sessions.filter(s => s.conditions.surface).length ?? 0
  if (!days.length && !trend && !conditions?.note) return null
  const forecast = days.some(d => d.kind === 'forecast')

  return (
    <section aria-label="Conditions" className="mb-5 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="font-rubik text-[15px] font-semibold text-gray-900">{forecast ? 'Forecast' : 'Conditions'}</h3>

      {days.map(day => {
        const Icon = SKY_ICONS[day.sky]
        return (
          <div key={day.date} className="flex items-start gap-3" data-day-weather>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gray-100 text-gray-700">
              <Icon size={20} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {days.length > 1 && <span className="text-gray-500">{weekday(day.date)} · </span>}
                {daySummary(day, skyLabel)}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                {weatherLine(day)} · {day.kind === 'forecast' ? 'Forecast near the track' : 'Nearby weather'}
              </p>
            </div>
          </div>
        )
      })}

      {conditions && (trend || days.some(d => d.kind === 'observed')) && (
        <div className="flex items-start gap-3 border-t border-gray-100 pt-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gray-100 text-gray-700">
            <Waves size={20} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500">Your track conditions</p>
            {trend ? (<>
              <p className="mt-0.5 text-sm font-semibold text-gray-900">{trend}</p>
              <p className="mt-0.5 text-xs text-gray-500">Across {recorded} recorded {recorded === 1 ? 'session' : 'sessions'}</p>
            </>) : (
              <p className="mt-0.5 text-sm text-gray-500">Record the surface from each session you drove.</p>
            )}
            <button onClick={conditions.onViewSessions} className="mt-1.5 flex items-center gap-0.5 text-sm font-medium text-blue-600 hover:text-blue-700">
              {trend ? 'View sessions' : 'Go to sessions'}
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {conditions && (conditions.note ? (
        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-xs font-medium text-gray-500">Your note on the day</p>
            <button onClick={conditions.onEditNote} className="text-sm font-medium text-blue-600 hover:text-blue-700">Edit</button>
          </div>
          <p className="mt-1 whitespace-pre-line text-sm text-gray-900">{conditions.note}</p>
        </div>
      ) : days.some(d => d.kind === 'observed') && (
        <button onClick={conditions.onEditNote} className="flex items-center gap-1.5 border-t border-gray-100 pt-3 text-sm font-medium text-blue-600 hover:text-blue-700">
          <Plus size={16} aria-hidden="true" />
          Add a note on the day’s conditions
        </button>
      ))}
    </section>
  )
}
