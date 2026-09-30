import { describe, it, expect } from 'vitest'
import { emptyPageStack, nextPageStack } from './pageStack'
import type { PageStack } from './pageStack'

const read = {
  event: (h: string) => /^#\/(?:event|edit-schedule)\/([^/]+)/.exec(h)?.[1] ?? null,
  track: (h: string) => /^#\/track\/([^/]+)/.exec(h)?.[1] ?? null,
  more: (h: string) => (h === '#/evaluations' ? 'evaluations' : null),
}

// Follows the hashes from the first, as the app sees them change.
function walk(hashes: string[], driver: string | null = null): PageStack<string> {
  return hashes.slice(1).reduce((stack, hash) => nextPageStack(stack, hash, driver, read), emptyPageStack<string>(hashes[0]))
}

describe('page stack (#274)', () => {
  it('puts a track page opened from an event over it, and goes back to it', () => {
    expect(walk(['#/event/a', '#/track/t'], 'jason')).toEqual({
      hash: '#/track/t', eventUnderTrack: 'a', trackUnderEvent: null, trackDriver: 'jason', moreUnderEvent: null,
    })
    expect(walk(['#/event/a', '#/track/t', '#/event/a'])).toEqual(emptyPageStack('#/event/a'))
  })

  it('puts an event opened from a track page over it, and goes back to it', () => {
    const over = walk(['#/tracks', '#/track/t', '#/event/b'])
    expect(over).toEqual({ hash: '#/event/b', eventUnderTrack: null, trackUnderEvent: 't', trackDriver: null, moreUnderEvent: null })
    expect(walk(['#/tracks', '#/track/t', '#/event/b', '#/track/t'])).toEqual(emptyPageStack('#/track/t'))
  })

  it('from a track page over one event, opens another over it, and back leaves the first behind', () => {
    const stack = walk(['#/event/a', '#/track/t', '#/event/b'], 'jason')
    expect(stack).toEqual({ hash: '#/event/b', eventUnderTrack: null, trackUnderEvent: 't', trackDriver: 'jason', moreUnderEvent: null })
    // Back on the track page, it keeps the driver it showed.
    expect(walk(['#/event/a', '#/track/t', '#/event/b', '#/track/t'], 'jason')).toEqual({
      hash: '#/track/t', eventUnderTrack: null, trackUnderEvent: null, trackDriver: 'jason', moreUnderEvent: null,
    })
  })

  it('keeps the stack through an event’s own sub-pages and editors', () => {
    const stack = walk(['#/track/t', '#/event/b', '#/event/b/share', '#/edit-schedule/b', '#/event/b'])
    expect(stack.trackUnderEvent).toBe('t')
  })

  it('puts an event opened from a More page over it, through the event’s track page and back (#345)', () => {
    expect(walk(['#/more', '#/evaluations', '#/event/a']).moreUnderEvent).toBe('#/evaluations')
    expect(walk(['#/evaluations', '#/event/a', '#/event/a/share', '#/event/a']).moreUnderEvent).toBe('#/evaluations')
    expect(walk(['#/evaluations', '#/event/a', '#/track/t'])).toMatchObject({ eventUnderTrack: 'a', moreUnderEvent: '#/evaluations' })
    expect(walk(['#/evaluations', '#/event/a', '#/track/t', '#/event/a']).moreUnderEvent).toBe('#/evaluations')
    expect(walk(['#/evaluations', '#/event/a', '#/evaluations'])).toEqual(emptyPageStack('#/evaluations'))
    // An event opened from a track page over it leaves the More page behind.
    expect(walk(['#/evaluations', '#/event/a', '#/track/t', '#/event/b']).moreUnderEvent).toBeNull()
  })

  it('starts over anywhere else', () => {
    expect(walk(['#/event/a', '#/track/t', '#/'])).toEqual(emptyPageStack('#/'))
    expect(walk(['#/track/t', '#/event/b', '#/tracks'])).toEqual(emptyPageStack('#/tracks'))
    expect(walk(['#/', '#/track/t'])).toEqual(emptyPageStack('#/track/t'))
  })
})
