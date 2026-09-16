import { describe, it, expect } from 'vitest'
import { parseCarMD } from './parseCar'

const SAMPLE = `
# Test Car
year: 1993
make: Porsche
model: 911
trim: RS

## service | 2026-05-02
shop: Redline Motorworks
summary: Alignment
work: Set to -2.0 front camber.
labor: 220

## service | 2026-08-20
shop: Home garage
summary: Brake pads
work: Replaced front and rear pads.
labor: 0
notes: Felt great after bedding in.

### parts
Front pads — Ferodo DS2500 | FCP1234 | 1 | 180
Rear pads — Ferodo DS2500 | FCP5678 | 1 | 150
`.trim()

describe('parseCarMD', () => {
  it('parses car identity fields', () => {
    const car = parseCarMD('test-car', SAMPLE)
    expect(car.id).toBe('test-car')
    expect(car.name).toBe('Test Car')
    expect(car.year).toBe(1993)
    expect(car.make).toBe('Porsche')
    expect(car.model).toBe('911')
    expect(car.trim).toBe('RS')
  })

  it('parses each service entry', () => {
    const car = parseCarMD('test-car', SAMPLE)
    expect(car.services).toHaveLength(2)
  })

  it('sorts services newest first', () => {
    const car = parseCarMD('test-car', SAMPLE)
    expect(car.services[0].date).toBe('2026-08-20')
    expect(car.services[1].date).toBe('2026-05-02')
  })

  it('parses shop, summary, work, and labor cost', () => {
    const car = parseCarMD('test-car', SAMPLE)
    const brakeJob = car.services.find(s => s.date === '2026-08-20')
    expect(brakeJob).toMatchObject({
      shop: 'Home garage',
      summary: 'Brake pads',
      work: 'Replaced front and rear pads.',
      laborCost: 0,
      notes: 'Felt great after bedding in.',
    })
  })

  it('parses parts for a service entry', () => {
    const car = parseCarMD('test-car', SAMPLE)
    const brakeJob = car.services.find(s => s.date === '2026-08-20')
    expect(brakeJob?.parts).toEqual([
      { name: 'Front pads — Ferodo DS2500', partNumber: 'FCP1234', qty: 1, unitCost: 180 },
      { name: 'Rear pads — Ferodo DS2500', partNumber: 'FCP5678', qty: 1, unitCost: 150 },
    ])
  })

  it('leaves parts undefined when a service has none', () => {
    const car = parseCarMD('test-car', SAMPLE)
    const alignment = car.services.find(s => s.date === '2026-05-02')
    expect(alignment?.parts).toBeUndefined()
  })
})
