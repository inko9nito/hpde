/**
 * The tab's history, as far as the app has seen it (#429): each entry's
 * hash, in order, and which entry is showing — so Back can return to the
 * page under it by stepping back in history, as iOS's swipe back does,
 * rather than adding the page under it on top. Added on top, a swipe back
 * from there returns to the page just left: a car just deleted, say.
 *
 * Each entry carries its place in `history.state`; the hashes are kept in
 * sessionStorage, so a reload still knows them.
 */

const STORAGE_KEY = 'hpde:history'

export type HashHistory = { entries: string[]; index: number }

function stateObject(): Record<string, unknown> {
  const state: unknown = window.history.state
  return typeof state === 'object' && state !== null ? state as Record<string, unknown> : {}
}

/** This entry's place in the history, if the app has given it one. */
function entryIndex(): number | null {
  const index = stateObject().hpdeIndex
  return typeof index === 'number' && Number.isInteger(index) && index >= 0 ? index : null
}

function stamp(index: number) {
  window.history.replaceState({ ...stateObject(), hpdeIndex: index }, '')
}

function save(nav: HashHistory) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nav.entries))
  } catch {
    // Storage blocked: known until a reload.
  }
}

function saved(): string[] {
  try {
    const entries: unknown = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(entries) && entries.every(e => typeof e === 'string') ? entries : []
  } catch {
    return []
  }
}

/** On load: a reload, or back into the app, picks up where it was; anything else starts afresh. */
export function loadHashHistory(): HashHistory {
  const hash = window.location.hash
  const index = entryIndex()
  if (index === null) {
    stamp(0)
    const nav = { entries: [hash], index: 0 }
    save(nav)
    return nav
  }
  const entries = saved().slice()
  entries[index] = hash
  const nav = { entries: Array.from(entries, e => e ?? ''), index }
  save(nav)
  return nav
}

/**
 * After the hash changes: a step through history lands on an entry the
 * app has placed; any other change is a new entry over the one it was on,
 * dropping those ahead of it.
 */
export function hashChanged(nav: HashHistory) {
  const hash = window.location.hash
  const index = entryIndex()
  if (index === null) {
    nav.index += 1
    nav.entries.length = Math.min(nav.entries.length, nav.index)
    stamp(nav.index)
  } else {
    nav.index = index
  }
  nav.entries[nav.index] = hash
  nav.entries = Array.from(nav.entries, e => e ?? '')
  save(nav)
}

/**
 * Back to `target`: a step back in history when that's the entry before
 * this one; otherwise — a link straight to this page, say — `target` in
 * this entry's place, so stepping back from it doesn't return here.
 * Returns whether it stepped back (the move lands with the browser's
 * hashchange) or replaced (which fires none: the caller shows it).
 */
export function goBackTo(nav: HashHistory, target: string): 'back' | 'replaced' {
  if (nav.index > 0 && nav.entries[nav.index - 1] === target) {
    window.history.back()
    return 'back'
  }
  replaceWith(nav, target)
  return 'replaced'
}

/** `target` in this entry's place: a redirect, which Back shouldn't return to. */
export function replaceWith(nav: HashHistory, target: string) {
  window.history.replaceState(window.history.state, '', target)
  nav.entries[nav.index] = target
  save(nav)
}
