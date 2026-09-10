import { describe, it, expect } from 'vitest'
import { resolveTailwindBgColor, serializeEvents } from './eventsJson'
import { parseScheduleMD } from './parseSchedule'

describe('resolveTailwindBgColor', () => {
  it('resolves standard Tailwind color classes to hex', () => {
    expect(resolveTailwindBgColor('bg-orange-500')).toBe('#f97316')
    expect(resolveTailwindBgColor('bg-blue-500')).toBe('#3b82f6')
    expect(resolveTailwindBgColor('bg-zinc-900')).toBe('#18181b')
  })

  it('throws for a malformed class', () => {
    expect(() => resolveTailwindBgColor('orange-500')).toThrow(/expected format/)
    expect(() => resolveTailwindBgColor('bg-orange')).toThrow(/expected format/)
  })

  it('throws for an unknown color name — this blocks a stale widget', () => {
    expect(() => resolveTailwindBgColor('bg-notacolor-500')).toThrow(/unknown Tailwind color/)
  })

  it('throws for an unknown shade', () => {
    expect(() => resolveTailwindBgColor('bg-orange-42')).toThrow(/unknown Tailwind shade/)
  })
})

describe('serializeEvents', () => {
  const fixture = `# Test Event
subtitle: Sample
link: https://example.com

## groups
red   | Red   | bg-red-500   | text-white | Time Trial
green | Green | bg-green-500 | text-white

## Sunday | 2026-09-13

08:30 session 1 | on: red | in: green
09:00 general | Driver's meeting
12:00 lunch | Lunch | 60 minutes
`

  it('produces a manifest with resolved colors and preserved event data', () => {
    const parsed = parseScheduleMD('2026-09-13_test', fixture)
    const manifest = serializeEvents([parsed], new Date('2026-01-01T00:00:00Z'))

    expect(manifest.generatedAt).toBe('2026-01-01T00:00:00.000Z')
    expect(manifest.events).toHaveLength(1)

    const [event] = manifest.events
    expect(event.id).toBe('2026-09-13_test')
    expect(event.name).toBe('Test Event')
    expect(event.subtitle).toBe('Sample')
    expect(event.link).toBe('https://example.com')

    expect(event.runGroups).toEqual([
      { id: 'red',   label: 'Red',   color: '#ef4444', description: 'Time Trial' },
      { id: 'green', label: 'Green', color: '#22c55e' },
    ])

    expect(event.days).toHaveLength(1)
    expect(event.days[0].date).toBe('2026-09-13')
    expect(event.days[0].events).toHaveLength(3)
  })
})
