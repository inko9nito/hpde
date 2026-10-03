import { describe, it, expect } from 'vitest'
import { cleanEventConditions, cleanSessionConditions, conditionsText, skyFromCode, surfaceTrend } from './conditions'

describe('track conditions (#347)', () => {
  it('reads Open-Meteo’s weather codes as the app’s skies', () => {
    expect([0, 1, 2, 3, 45, 61, 63, 80, 71, 95, 99].map(skyFromCode)).toEqual([
      'sunny', 'sunny', 'partly', 'cloudy', 'cloudy', 'rain', 'rain', 'rain', 'rain', 'storm', 'storm',
    ])
  })

  it('puts a session’s conditions in a line, leaving out what isn’t there', () => {
    expect(conditionsText({ surface: 'wet', sky: 'rain', airF: 68 })).toBe('Wet · Rain · 68°F')
    expect(conditionsText({ surface: 'dry', sky: 'partly', airF: 77, trackF: 104 })).toBe('Dry · Partly cloudy · 77°F · track 104°F')
    expect(conditionsText({ airF: 70 })).toBe('70°F')
    expect(conditionsText({ note: 'Oil at Turn 4' })).toBe('')
  })

  it('follows the surface through the day, running repeats together', () => {
    expect(surfaceTrend([{ surface: 'wet' }, { surface: 'wet' }, { sky: 'rain' }, { surface: 'damp' }, { surface: 'dry' }])).toBe('Wet → Damp → Dry')
    expect(surfaceTrend([{ sky: 'sunny' }])).toBeNull()
  })

  it('keeps only what a session’s conditions have filled in, and needs something', () => {
    expect(cleanSessionConditions({ surface: 'wet', sky: 'rain', airF: 68.4, trackF: null, note: '  Standing water at T2 ' }))
      .toEqual({ value: { surface: 'wet', sky: 'rain', airF: 68, note: 'Standing water at T2' } })
    expect(cleanSessionConditions({ note: '   ' })).toEqual({ error: 'Add the track’s conditions.' })
    expect(cleanSessionConditions(undefined)).toEqual({ error: 'Missing the conditions.' })
  })

  it('turns away a surface, sky or temperature it doesn’t know', () => {
    expect(cleanSessionConditions({ surface: 'icy' })).toEqual({ error: 'Unknown track surface.' })
    expect(cleanSessionConditions({ sky: 'hail' })).toEqual({ error: 'Unknown weather.' })
    expect(cleanSessionConditions({ airF: 680 })).toHaveProperty('error')
    expect(cleanSessionConditions({ trackF: '90' })).toHaveProperty('error')
    expect(cleanSessionConditions({ note: 'x'.repeat(501) })).toHaveProperty('error')
  })

  it('needs a note for the event’s conditions', () => {
    expect(cleanEventConditions({ note: ' Dry all day ' })).toEqual({ value: { note: 'Dry all day' } })
    expect(cleanEventConditions({ note: '' })).toEqual({ error: 'Add a note on the day’s conditions.' })
    expect(cleanEventConditions(null)).toEqual({ error: 'Add a note on the day’s conditions.' })
  })
})
