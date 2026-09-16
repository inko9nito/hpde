import { Sun, CloudDrizzle, CloudRain, CloudSun } from 'lucide-react'
import type { DayWeather, Precipitation } from '../types'

const PRECIP_LABEL: Record<Precipitation, string> = {
  'dry': 'Dry',
  'damp': 'Damp',
  'light-rain': 'Light rain',
  'heavy-rain': 'Heavy rain',
  'mixed': 'Mixed',
}

const PRECIP_ICON: Record<Precipitation, typeof Sun> = {
  'dry': Sun,
  'damp': CloudSun,
  'light-rain': CloudDrizzle,
  'heavy-rain': CloudRain,
  'mixed': CloudSun,
}

interface Props {
  weather: DayWeather
}

export function WeatherCard({ weather }: Props) {
  const { highF, lowF, trackTempF, precipitation, notes } = weather
  if (highF === undefined && lowF === undefined && trackTempF === undefined && !precipitation && !notes) {
    return null
  }

  const Icon = precipitation ? PRECIP_ICON[precipitation] : Sun

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
          <Icon size={20} />
        </div>
        <div className="flex flex-1 flex-wrap items-baseline gap-x-2 gap-y-0.5">
          {(highF !== undefined || lowF !== undefined) && (
            <span className="text-sm font-semibold text-gray-900">
              {highF !== undefined ? `${highF}°` : '—'}
              {lowF !== undefined && <span className="font-normal text-gray-400"> / {lowF}°</span>}
            </span>
          )}
          {precipitation && <span className="text-sm text-gray-600">{PRECIP_LABEL[precipitation]}</span>}
          {trackTempF !== undefined && (
            <span className="text-xs text-gray-400">Track {trackTempF}°</span>
          )}
        </div>
      </div>
      {notes && <p className="mt-2 text-xs text-gray-500">{notes}</p>}
    </div>
  )
}
