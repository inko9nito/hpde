import { describe, it, expect } from 'vitest'
import {
  carEvents, carName, carOutings, carTitle, cleanCar, driverLabel, isShared, othersText, cleanEntry, cleanPressures, cleanSetup, consumablesOn, cornersText, formatDay, logNewestFirst, partOptions, shopOptions,
} from './garage'
import type { Car, Garage } from './garage'
import type { EventConfig } from '../types'

const at = (id: string, date: string): EventConfig => ({
  id, name: id, runGroups: [], days: [{ id: 'd', label: 'Day', date, activities: [] }],
})
const events = [at('march', '2026-03-07'), at('may', '2026-05-02'), at('sept', '2026-09-11')]

const cayman: Car = {
  id: 'c', make: 'Porsche', model: 'Cayman',
  log: [
    { id: '1', date: '2026-02-20', shop: 'Speed Shop', parts: [{ part: 'tires', what: 'Hoosier R7' }, { part: 'frontPads', what: 'Hawk DTC-60' }] },
    { id: '3', date: '2026-04-15', parts: [{ part: 'tires', what: 'Yokohama A052' }] },
    { id: '4', date: '2026-04-15', parts: [{ part: 'brakeFluid' }], note: 'Flushed.' },
  ],
}
const garage: Garage = {
  cars: [cayman, { id: 'm', year: 1999, make: 'Mazda', model: 'Miata', nickname: 'Zoom', log: [{ id: '5', date: '2026-01-01', shop: 'Speed Shop', parts: [{ part: 'tires', what: 'Hoosier R7' }] }] }],
  events: { sept: { carId: 'c' }, march: { carId: 'c' }, may: { carId: 'c' }, other: { carId: 'm' } },
}

describe('garage (#344)', () => {
  it('names a car by its nickname, or its year, make and model', () => {
    expect(carName(garage.cars[1])).toBe('Zoom')
    expect(carTitle(garage.cars[1])).toBe('1999 Mazda Miata')
    expect(carName(cayman)).toBe('Porsche Cayman')
  })

  it('lists the events a car went to, newest first', () => {
    expect(carEvents('c', garage, events).map(e => e.id)).toEqual(['sept', 'may', 'march'])
  })

  it('lists the log newest first', () => {
    expect(logNewestFirst(cayman).map(c => c.id)).toEqual(['4', '3', '1'])
  })

  it('works out what was on the car from its log: now, or at an event', () => {
    expect(consumablesOn(cayman)).toEqual([
      { part: 'tires', what: 'Yokohama A052', date: '2026-04-15' },
      { part: 'frontPads', what: 'Hawk DTC-60', date: '2026-02-20', shop: 'Speed Shop' },
      { part: 'brakeFluid', date: '2026-04-15' },
    ])
    expect(consumablesOn(cayman, '2026-03-07').map(c => [c.part, c.what])).toEqual([['tires', 'Hoosier R7'], ['frontPads', 'Hawk DTC-60']])
    expect(consumablesOn(cayman, '2026-01-01')).toEqual([])
  })

  it('suggests what a consumable’s been, most used first', () => {
    expect(partOptions('tires', garage)).toEqual(['Hoosier R7', 'Yokohama A052'])
    expect(shopOptions(garage)).toEqual(['Speed Shop'])
  })

  it('reads a car: make and model needed, numbers checked', () => {
    expect(cleanCar({ make: ' Porsche ', model: 'Cayman', year: 2019, lugNutTorque: 96.4 })).toEqual({
      value: { year: 2019, make: 'Porsche', model: 'Cayman', lugNutTorque: 96 },
    })
    expect(cleanCar({ make: 'Porsche' })).toHaveProperty('error')
    expect(cleanCar({ make: 'Porsche', model: 'Cayman', year: 2031 }, 2026)).toHaveProperty('error')
  })

  it('reads a log entry: a day and at least one consumable, each once, in the forms’ order', () => {
    expect(cleanEntry({
      date: '2026-04-15', shop: 'Speed Shop', note: '',
      parts: [{ part: 'coolant', what: '' }, { part: 'brakeFluid', what: ' Motul RBF 660 ' }],
    })).toEqual({
      value: { date: '2026-04-15', shop: 'Speed Shop', parts: [{ part: 'brakeFluid', what: 'Motul RBF 660' }, { part: 'coolant' }] },
    })
    const entry = (e: object) => cleanEntry({ date: '2026-04-15', parts: [{ part: 'tires' }], ...e })
    expect(entry({ shop: 'x'.repeat(61) })).toHaveProperty('error')
    expect(entry({ parts: [] })).toHaveProperty('error')
    expect(entry({ parts: [{ part: 'wipers' }] })).toHaveProperty('error')
    expect(entry({ parts: [{ part: 'tires' }, { part: 'tires' }] })).toHaveProperty('error')
    expect(entry({ date: '4/15/2026' })).toHaveProperty('error')
  })

  it('reads a session’s pressures to a tenth of a psi, and wants at least one', () => {
    const p = cleanPressures({ date: '2026-03-07', time: '09:50', group: 'blue', cold: { fl: 30.25, rr: 29 } })
    expect(p).toEqual({ value: { key: '2026-03-07 09:50 blue', date: '2026-03-07', time: '09:50', group: 'blue', cold: { fl: 30.3, rr: 29 } } })
    expect(cornersText({ fl: 30.3, rr: 29 })).toBe('30.3/–/–/29')
    expect(cleanPressures({ date: '2026-03-07', time: '09:50', group: 'blue', cold: {} })).toHaveProperty('error')
  })

  it('reads an event’s setup: a car from the garage, or pressures', () => {
    expect(cleanSetup({ carId: 'c' }, ['c'])).toEqual({ value: { carId: 'c' } })
    expect(cleanSetup({ carId: 'x' }, ['c'])).toHaveProperty('error')
    expect(cleanSetup({}, ['c'])).toHaveProperty('error')
  })

  it('writes a day out', () => {
    expect(formatDay('2026-03-07')).toBe('Mar 7, 2026')
  })
})

describe('a car shared between drivers (#398)', () => {
  const shared: Car = {
    ...cayman,
    drivers: [{ id: 'v', name: 'Vera Smith', you: true }, { id: 'j', name: 'Jason Smith' }, { id: 'r', name: 'rick@example.com' }],
    drives: [{ eventId: 'may', driverId: 'j', runGroup: 'blue' }, { eventId: 'sept', driverId: 'r' }, { eventId: 'gone', driverId: 'j' }],
  }
  const theirs: Garage = { cars: [shared], events: { march: { carId: 'c' }, sept: { carId: 'c' }, other: { carId: 'm' } } }

  it('says who drives it: You, a first name, or an email without a name', () => {
    expect(isShared(shared)).toBe(true)
    expect(isShared(cayman)).toBe(false)
    expect(isShared({ ...cayman, drivers: [{ id: 'v', name: 'Vera', you: true }] })).toBe(false)
    expect(shared.drivers!.map(driverLabel)).toEqual(['You', 'Jason', 'rick@example.com'])
    expect(othersText(shared)).toBe('Jason and rick@example.com')
    expect(othersText({ ...shared, drivers: shared.drivers!.slice(0, 2) })).toBe('Jason')
  })

  it('lists the events it went to, newest first, with who drove it at each, in which group', () => {
    const outings = carOutings(shared, theirs, events, { sept: { status: 'going', runGroup: 'pink' } })
    expect(outings.map(o => o.event.id)).toEqual(['sept', 'may', 'march'])
    expect(outings[0].drivers).toEqual([
      { driver: shared.drivers![0], runGroup: 'pink' },
      { driver: shared.drivers![2] },
    ])
    expect(outings[1].drivers).toEqual([{ driver: shared.drivers![1], runGroup: 'blue' }])
    expect(outings[2].drivers).toEqual([{ driver: shared.drivers![0] }])
  })

  it('lists a car of their own’s events as theirs', () => {
    const outings = carOutings(cayman, garage, events, { may: { status: 'going', runGroup: 'blue' } })
    expect(outings.map(o => o.event.id)).toEqual(['sept', 'may', 'march'])
    expect(outings[1].drivers).toEqual([{ driver: { id: '', name: 'You', you: true }, runGroup: 'blue' }])
  })
})
