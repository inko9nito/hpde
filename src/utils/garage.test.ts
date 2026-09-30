import { describe, it, expect } from 'vitest'
import { carEvents, carName, carTitle, cleanCar, cleanPressures, consumableOptions, cornersText, lastConsumables } from './garage'
import type { Garage } from './garage'
import type { EventConfig } from '../types'

const at = (id: string, date: string): EventConfig => ({
  id, name: id, runGroups: [], days: [{ id: 'd', label: 'Day', date, activities: [] }],
})
const events = [at('march', '2026-03-07'), at('may', '2026-05-02'), at('sept', '2026-09-11')]

const garage: Garage = {
  cars: [{ id: 'c', make: 'Porsche', model: 'Cayman' }, { id: 'm', year: 1999, make: 'Mazda', model: 'Miata', nickname: 'Zoom' }],
  events: {
    sept: { carId: 'c' },
    march: { carId: 'c', tires: 'Hoosier R7', frontPads: 'Hawk DTC-60' },
    may: { carId: 'c', tires: 'Yokohama A052', frontPads: 'Hawk DTC-60' },
    other: { carId: 'm', tires: 'Hoosier R7' },
  },
}

describe('garage (#344)', () => {
  it('names a car by its nickname, or its year, make and model', () => {
    expect(carName(garage.cars[1])).toBe('Zoom')
    expect(carTitle(garage.cars[1])).toBe('1999 Mazda Miata')
    expect(carName(garage.cars[0])).toBe('Porsche Cayman')
  })

  it('lists the events a car went to, newest first', () => {
    expect(carEvents('c', garage, events)).toEqual(['sept', 'may', 'march'])
  })

  it('carries a car’s consumables over from its last event that had any, before the one given', () => {
    expect(lastConsumables('c', garage, events)?.eventId).toBe('may')
    expect(lastConsumables('c', garage, events, 'sept')?.eventId).toBe('may')
    expect(lastConsumables('c', garage, events, 'may')?.eventId).toBe('march')
    expect(lastConsumables('c', garage, events, 'march')).toBeNull()
  })

  it('suggests what a consumable’s been, most used first', () => {
    expect(consumableOptions('tires', garage)).toEqual(['Hoosier R7', 'Yokohama A052'])
  })

  it('reads a car: make and model needed, numbers checked', () => {
    expect(cleanCar({ make: ' Porsche ', model: 'Cayman', year: 2019, lugNutTorque: 96.4 })).toEqual({
      value: { year: 2019, make: 'Porsche', model: 'Cayman', lugNutTorque: 96 },
    })
    expect(cleanCar({ make: 'Porsche' })).toHaveProperty('error')
    expect(cleanCar({ make: 'Porsche', model: 'Cayman', year: 2031 }, 2026)).toHaveProperty('error')
  })

  it('reads a session’s pressures to a tenth of a psi, and wants at least one', () => {
    const p = cleanPressures({ date: '2026-03-07', time: '09:50', group: 'blue', cold: { fl: 30.25, rr: 29 } })
    expect(p).toEqual({ value: { key: '2026-03-07 09:50 blue', date: '2026-03-07', time: '09:50', group: 'blue', cold: { fl: 30.3, rr: 29 } } })
    expect(cornersText({ fl: 30.3, rr: 29 })).toBe('30.3/–/–/29')
    expect(cleanPressures({ date: '2026-03-07', time: '09:50', group: 'blue', cold: {} })).toHaveProperty('error')
  })
})
