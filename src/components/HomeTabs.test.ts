import { describe, it, expect } from 'vitest'
import { MORE_PAGE_HASH, evaluationsHash, evaluationsLayoutFromHash, morePageFromHash } from './HomeTabs'

describe('More pages’ addresses (#345)', () => {
  it('names Instructor evaluations, on a layout too (#462)', () => {
    expect(morePageFromHash(MORE_PAGE_HASH.evaluations)).toBe('evaluations')
    expect(morePageFromHash(MORE_PAGE_HASH.garage)).toBe('garage')
    expect(evaluationsHash('msrc-3-1-ccw')).toBe('#/evaluations/msrc-3-1-ccw')
    expect(morePageFromHash('#/evaluations/msrc-3-1-ccw')).toBe('evaluations')
    expect(evaluationsLayoutFromHash('#/evaluations/msrc-3-1-ccw')).toBe('msrc-3-1-ccw')
    expect(evaluationsLayoutFromHash(MORE_PAGE_HASH.evaluations)).toBeNull()
    expect(evaluationsLayoutFromHash('#/evaluations/')).toBeNull()
    expect(morePageFromHash('#/evaluations/')).toBeNull()
    expect(morePageFromHash('#/garage/car1')).toBeNull()
  })
})
