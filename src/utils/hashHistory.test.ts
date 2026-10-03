import { beforeEach, describe, expect, it } from 'vitest'
import { goBackTo, hashChanged, loadHashHistory, replaceWith } from './hashHistory'

// jsdom moves through history asynchronously, firing hashchange as a browser does.
function changed() {
  return new Promise<void>(resolve => window.addEventListener('hashchange', () => resolve(), { once: true }))
}

async function push(nav: ReturnType<typeof loadHashHistory>, hash: string) {
  const done = changed()
  window.location.hash = hash
  await done
  hashChanged(nav)
}

describe('hash history (#429)', () => {
  beforeEach(() => {
    sessionStorage.clear()
    window.history.replaceState(null, '', '#/more')
  })

  it('steps back when Back returns to the page before', async () => {
    const nav = loadHashHistory()
    await push(nav, '#/garage')
    await push(nav, '#/garage/car1')
    expect(nav).toEqual({ entries: ['#/more', '#/garage', '#/garage/car1'], index: 2 })

    const done = changed()
    expect(goBackTo(nav, '#/garage')).toBe('back')
    await done
    hashChanged(nav)
    expect(window.location.hash).toBe('#/garage')
    expect(nav.index).toBe(1)

    // A swipe back from here is More, not the car just left.
    const more = changed()
    window.history.back()
    await more
    hashChanged(nav)
    expect(window.location.hash).toBe('#/more')
  })

  it('replaces this entry when the page under it isn’t the one before — a link straight to it', async () => {
    window.history.replaceState(null, '', '#/garage/car1')
    const nav = loadHashHistory()
    expect(goBackTo(nav, '#/garage')).toBe('replaced')
    expect(window.location.hash).toBe('#/garage')
    expect(nav).toEqual({ entries: ['#/garage'], index: 0 })
  })

  it('a new page drops those ahead of it', async () => {
    const nav = loadHashHistory()
    await push(nav, '#/garage')
    await push(nav, '#/garage/car1')
    const done = changed()
    goBackTo(nav, '#/garage')
    await done
    hashChanged(nav)
    await push(nav, '#/garage/car2')
    expect(nav).toEqual({ entries: ['#/more', '#/garage', '#/garage/car2'], index: 2 })
  })

  it('a reload picks up where it was', async () => {
    const nav = loadHashHistory()
    await push(nav, '#/garage')
    expect(loadHashHistory()).toEqual({ entries: ['#/more', '#/garage'], index: 1 })
  })

  it('a redirect takes this entry’s place', () => {
    window.history.replaceState(null, '', '#')
    const nav = loadHashHistory()
    replaceWith(nav, '#/')
    expect(window.location.hash).toBe('#/')
    expect(nav).toEqual({ entries: ['#/'], index: 0 })
  })
})
