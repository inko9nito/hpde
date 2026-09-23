import { describe, it, expect } from 'vitest'
import { collectOptions, filterOptions, findExact, findSimilar, normalizeKey, resolveTrackId } from './fieldOptions'
import type { EventConfig } from '../types'

const ev = (fields: Partial<EventConfig>): EventConfig =>
  ({ id: Math.random().toString(), name: 'x', runGroups: [], days: [], ...fields })

const events = [
  ev({ track: 'Motorsport Ranch - Cresson', configuration: '1.7 mile', organizer: 'The Drivers Edge' }),
  ev({ track: 'Motorsport Ranch - Cresson', configuration: '1.7 mile', organizer: 'The Drivers Edge' }),
  ev({ track: 'motorsport ranch cresson', configuration: '3.1 mile', organizer: 'Texas Region SCCA' }),
  ev({ track: 'Eagles Canyon Raceway', configuration: '2.7 mile' }),
]

describe('fieldOptions', () => {
  it('normalizes case, punctuation and spacing but keeps decimals', () => {
    expect(normalizeKey('  Motorsport Ranch -  Cresson ')).toBe('motorsport ranch cresson')
    expect(normalizeKey('1.7 Mile.')).toBe('1.7 mile')
  })

  it('merges re-spellings into the most-used one, most-used first', () => {
    expect(collectOptions(events, 'track')).toEqual(['Motorsport Ranch - Cresson', 'Eagles Canyon Raceway'])
    expect(collectOptions(events, 'city')).toEqual([])
  })

  it('can narrow to one track', () => {
    const eagles = (e: EventConfig) => e.track === 'Eagles Canyon Raceway'
    expect(collectOptions(events, 'configuration', eagles)).toEqual(['2.7 mile'])
  })

  it('filters on every typed word', () => {
    const tracks = collectOptions(events, 'track')
    expect(filterOptions('ranch cres', tracks)).toEqual(['Motorsport Ranch - Cresson'])
    expect(filterOptions('', tracks)).toEqual(tracks)
  })

  it('snaps a re-spelling to the existing value', () => {
    expect(findExact('MOTORSPORT RANCH CRESSON', ['Motorsport Ranch - Cresson'])).toBe('Motorsport Ranch - Cresson')
    expect(findExact('Motorsport Ranch', ['Motorsport Ranch - Cresson'])).toBeNull()
  })

  it('suggests near misses but not unrelated values', () => {
    const configs = ['1.7 mile', '3.1 mile']
    expect(findSimilar('1.7', configs)).toBe('1.7 mile')
    expect(findSimilar('Texas Regoin SCCA', ['Texas Region SCCA'])).toBe('Texas Region SCCA')
    expect(findSimilar('Drivers Edge', ['The Drivers Edge'])).toBe('The Drivers Edge')
    expect(findSimilar('Harris Hill Road', ['Eagles Canyon Raceway'])).toBeNull()
    expect(findSimilar('1.7 mile', configs)).toBeNull()
  })
})

describe('resolveTrackId', () => {
  const icons = ['msrc-1-7', 'msrc-3-1', 'msrc-1-3', 'ecr-2-7']
  const past = [
    ev({ track: 'Motorsport Ranch - Cresson', configuration: '1.7 mile', trackId: 'msrc-1-7' }),
    ev({ track: 'Motorsport Ranch - Cresson', configuration: '3.1 mile', trackId: 'msrc-3-1' }),
    ev({ track: 'Eagles Canyon Raceway', configuration: '2.7 mile', trackId: 'ecr-2-7' }),
  ]

  it('uses the icon of a past event with the same track and configuration', () => {
    expect(resolveTrackId(past, 'motorsport ranch cresson', '3.1 Mile', icons)).toBe('msrc-3-1')
  })

  it('uses a track with a single icon even without a configuration', () => {
    expect(resolveTrackId(past, 'Eagles Canyon Raceway', '', icons)).toBe('ecr-2-7')
    expect(resolveTrackId(past, 'Motorsport Ranch - Cresson', '', icons)).toBeUndefined()
  })

  it('matches an icon by track prefix + configuration number', () => {
    expect(resolveTrackId(past, 'Motorsport Ranch - Cresson', '1.3', icons)).toBe('msrc-1-3')
    expect(resolveTrackId(past, 'Motorsport Ranch - Cresson', '2.0', icons)).toBeUndefined()
  })

  it('has nothing for an unknown track', () => {
    expect(resolveTrackId(past, 'Harris Hill Road', '1.8', icons)).toBeUndefined()
  })
})
