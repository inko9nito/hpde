import { useEffect, useState } from 'react'
import { skyFromCode } from '../utils/conditions'
import type { Sky } from '../utils/conditions'
import { todayLocalISO } from '../utils/time'
import type { EventConfig } from '../types'

// The weather near the track on an event's days (#347), from Open-Meteo
// (free, no key, CORS open): a forecast up to 16 days ahead, and what it
// was once the day's past. Looked up by where the track is, so only for
// tracks the app knows the place of.

/** Where each track is, by track icon id (an event's `trackId`). */
export const TRACK_LOCATIONS: Record<string, { lat: number; lon: number; tz: string }> = {
  'msrc-1-7': { lat: 32.448, lon: -97.616, tz: 'America/Chicago' },
  'msrc-3-1': { lat: 32.448, lon: -97.616, tz: 'America/Chicago' },
  'msrc-1-3': { lat: 32.448, lon: -97.616, tz: 'America/Chicago' },
  'ecr-2-7': { lat: 33.264, lon: -97.581, tz: 'America/Chicago' },
}

export const FORECAST_DAYS = 16

export interface HourWeather {
  /** "HH:00". */
  time: string
  tempF: number
  sky: Sky
  /** Inches in that hour. */
  precipIn: number
}

export interface DayWeather {
  date: string
  /** Ahead of the day: a forecast; on or after it, what the weather was. */
  kind: 'forecast' | 'observed'
  highF: number
  lowF: number
  /** The day's rain, inches. */
  precipIn: number
  /** A forecast's chance of rain, %. */
  rainChance?: number
  /** The day's sky, from its weather code. */
  sky: Sky
  hours: HourWeather[]
}

export type WeatherStatus = 'off' | 'loading' | 'ready' | 'error'

const daysBetween = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000)

/** The event's days the weather can be looked up for: past ones, and those within the forecast. */
export function weatherDates(event: EventConfig, today = todayLocalISO()): string[] {
  return event.days.map(d => d.date).filter(d => daysBetween(today, d) <= FORECAST_DAYS - 1)
}

function weatherUrl(lat: number, lon: number, tz: string, start: string, end: string, today: string): string {
  // The archive lags a few days behind; the forecast reaches back 3 months.
  const archive = daysBetween(end, today) > 80
  const host = archive ? 'https://archive-api.open-meteo.com/v1/archive' : 'https://api.open-meteo.com/v1/forecast'
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    timezone: tz,
    start_date: start,
    end_date: end,
    temperature_unit: 'fahrenheit',
    precipitation_unit: 'inch',
    hourly: 'temperature_2m,precipitation,weather_code',
    daily: `temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code${archive ? '' : ',precipitation_probability_max'}`,
  })
  return `${host}?${params}`
}

interface OpenMeteo {
  hourly: { time: string[]; temperature_2m: number[]; precipitation: number[]; weather_code: number[] }
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    precipitation_sum: number[]
    weather_code: number[]
    precipitation_probability_max?: (number | null)[]
  }
}

export function readWeather(body: OpenMeteo, today: string): DayWeather[] {
  return body.daily.time.map((date, i) => ({
    date,
    kind: date > today ? 'forecast' : 'observed',
    highF: Math.round(body.daily.temperature_2m_max[i]),
    lowF: Math.round(body.daily.temperature_2m_min[i]),
    precipIn: body.daily.precipitation_sum[i] ?? 0,
    ...(date > today && body.daily.precipitation_probability_max?.[i] != null ? { rainChance: body.daily.precipitation_probability_max[i]! } : {}),
    sky: skyFromCode(body.daily.weather_code[i]),
    hours: body.hourly.time.flatMap((t, h) => t.startsWith(date) ? [{
      time: t.slice(11, 16),
      tempF: Math.round(body.hourly.temperature_2m[h]),
      sky: skyFromCode(body.hourly.weather_code[h]),
      precipIn: body.hourly.precipitation[h] ?? 0,
    }] : []),
  }))
}

/** The hour a session starting at `time` ("HH:MM") falls in, rounded to the nearest. */
export function hourAt(day: DayWeather | undefined, time: string): HourWeather | undefined {
  if (!day) return undefined
  const [h, m] = time.split(':').map(Number)
  const hour = Math.min(23, h + (m >= 30 ? 1 : 0))
  return day.hours.find(x => Number(x.time.slice(0, 2)) === hour)
}

const cache = new Map<string, Promise<DayWeather[]>>()

/** The weather on the event's days, by date. Off for a track with no known place. */
export function useWeather(event: EventConfig | null): { status: WeatherStatus; byDate: Map<string, DayWeather> } {
  const place = event?.trackId ? TRACK_LOCATIONS[event.trackId] : undefined
  const today = todayLocalISO()
  const dates = event && place ? weatherDates(event, today) : []
  const url = place && dates.length ? weatherUrl(place.lat, place.lon, place.tz, dates[0], dates[dates.length - 1], today) : null
  const [loaded, setLoaded] = useState<{ url: string; days: DayWeather[] } | null>(null)
  const [failed, setFailed] = useState<string | null>(null)

  useEffect(() => {
    if (!url) return
    let cancelled = false
    if (!cache.has(url)) {
      cache.set(url, fetch(url).then(async res => {
        if (!res.ok) throw new Error(`weather ${res.status}`)
        return readWeather(await res.json(), today)
      }))
    }
    cache.get(url)!.then(
      days => { if (!cancelled) setLoaded({ url, days }) },
      () => { cache.delete(url); if (!cancelled) setFailed(url) },
    )
    return () => { cancelled = true }
  }, [url, today])

  if (!url) return { status: 'off', byDate: new Map() }
  if (loaded?.url === url) return { status: 'ready', byDate: new Map(loaded.days.map(d => [d.date, d])) }
  return { status: failed === url ? 'error' : 'loading', byDate: new Map() }
}

/** "Rain in the morning, partly cloudy in the afternoon", or "Sunny all day". */
export function daySummary(day: DayWeather, label: (s: Sky) => string): string {
  const part = (from: number, to: number): Sky | undefined => {
    const hours = day.hours.filter(h => { const n = Number(h.time.slice(0, 2)); return n >= from && n < to })
    if (!hours.length) return undefined
    // Rain for two hours or more makes it a rainy part of the day.
    const wet = hours.filter(h => h.sky === 'rain' || h.sky === 'storm')
    if (wet.length >= 2) return wet.some(h => h.sky === 'storm') ? 'storm' : 'rain'
    const counts = new Map<Sky, number>()
    for (const h of hours) counts.set(h.sky, (counts.get(h.sky) ?? 0) + 1)
    return [...counts].sort((a, b) => b[1] - a[1])[0][0]
  }
  const morning = part(7, 12)
  const afternoon = part(12, 18)
  if (!morning || !afternoon) return label(day.sky)
  if (morning === afternoon) return `${label(morning)} all day`
  return `${label(morning)} in the morning, ${label(afternoon).toLowerCase()} in the afternoon`
}
