import { describe, it, expect } from 'vitest'
import { iosSpring, IOS_SPRING_LINEAR, IOS_SPRING_MS } from './iosSpring'

describe('iOS push, pop and sheet spring (#367)', () => {
  // Where iOS 26's own push, pop and sheet were, frame by frame, in the
  // screen recordings on #367 — a critically damped spring from rest.
  it('is as far along as iOS was at each point', () => {
    expect(iosSpring(0)).toBe(0)
    expect(iosSpring(50)).toBeCloseTo(0.23, 2)
    expect(iosSpring(100)).toBeCloseTo(0.55, 2)
    expect(iosSpring(200)).toBeCloseTo(0.88, 2)
    expect(iosSpring(300)).toBeCloseTo(0.973, 3)
  })

  it('starts slowly, rather than jumping ahead in its first frame', () => {
    expect(iosSpring(1000 / 60)).toBeLessThan(0.05)
  })

  it('settles by the end, never going past it', () => {
    const points = Array.from({ length: IOS_SPRING_MS + 1 }, (_, ms) => iosSpring(ms))
    points.slice(1).forEach((p, i) => expect(p).toBeGreaterThan(points[i]))
    expect(iosSpring(IOS_SPRING_MS - 1)).toBeGreaterThan(0.998)
    expect(iosSpring(IOS_SPRING_MS)).toBe(1)
  })

  it('is sampled into a CSS linear() easing, from 0 to 1', () => {
    const values = IOS_SPRING_LINEAR.slice('linear('.length, -1).split(', ').map(Number)
    expect(IOS_SPRING_LINEAR).toMatch(/^linear\(0, [\d., ]+, 1\)$/)
    expect(values).toHaveLength(51)
    values.forEach((v, i) => expect(v).toBeCloseTo(iosSpring((i / 50) * IOS_SPRING_MS), 4))
  })
})
