import { describe, it, expect } from 'vitest'
import { daySummary, hourAt, readWeather, weatherDates } from './weather'
import { skyLabel } from '../utils/conditions'
import type { EventConfig } from '../types'

// An Open-Meteo answer for one day: rain until 11, then cloud, then sun.
function answer(date: string, extra: Record<string, unknown> = {}) {
  const hours = [...Array(24).keys()]
  return {
    hourly: {
      time: hours.map(h => `${date}T${String(h).padStart(2, '0')}:00`),
      temperature_2m: hours.map(h => 60 + h * 0.6),
      precipitation: hours.map(h => (h < 11 ? 0.05 : 0)),
      weather_code: hours.map(h => (h < 11 ? 63 : h < 14 ? 3 : 0)),
    },
    daily: {
      time: [date],
      temperature_2m_max: [73.6],
      temperature_2m_min: [60.2],
      precipitation_sum: [0.55],
      weather_code: [63],
      ...extra,
    },
  }
}

describe('weather near the track (#347)', () => {
  it('reads a past day as what the weather was, hour by hour', () => {
    const [day] = readWeather(answer('2026-09-13'), '2026-10-03')
    expect(day).toMatchObject({ date: '2026-09-13', kind: 'observed', highF: 74, lowF: 60, precipIn: 0.55, sky: 'rain' })
    expect(day.rainChance).toBeUndefined()
    expect(day.hours).toHaveLength(24)
    expect(day.hours[9]).toEqual({ time: '09:00', tempF: 65, sky: 'rain', precipIn: 0.05 })
  })

  it('reads a day ahead as a forecast, with its chance of rain', () => {
    const [day] = readWeather(answer('2026-10-10', { precipitation_probability_max: [70] }), '2026-10-03')
    expect(day).toMatchObject({ kind: 'forecast', rainChance: 70 })
  })

  it('finds the hour a session starts in, to the nearest', () => {
    const [day] = readWeather(answer('2026-09-13'), '2026-10-03')
    expect(hourAt(day, '09:10')?.time).toBe('09:00')
    expect(hourAt(day, '09:50')?.time).toBe('10:00')
    expect(hourAt(undefined, '09:50')).toBeUndefined()
  })

  it('sums up the morning and the afternoon', () => {
    const [day] = readWeather(answer('2026-09-13'), '2026-10-03')
    expect(daySummary(day, skyLabel)).toBe('Rain in the morning, sunny in the afternoon')
    const dry = readWeather({ ...answer('2026-09-13'), hourly: { ...answer('2026-09-13').hourly, weather_code: Array(24).fill(0) } }, '2026-10-03')[0]
    expect(daySummary(dry, skyLabel)).toBe('Sunny all day')
  })

  it('looks up an event’s past days and those within the 16-day forecast, no further', () => {
    const event = { days: [{ date: '2026-10-17' }, { date: '2026-10-18' }, { date: '2026-10-19' }] } as EventConfig
    expect(weatherDates(event, '2026-10-03')).toEqual(['2026-10-17', '2026-10-18'])
    expect(weatherDates(event, '2026-12-01')).toEqual(['2026-10-17', '2026-10-18', '2026-10-19'])
  })
})
