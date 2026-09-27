import type { MouseEvent } from 'react'

/**
 * A click meant for a new tab or window (a modifier key, or not the main
 * button): leave it to the link's own href instead of navigating in place.
 */
export function opensElsewhere(e: MouseEvent): boolean {
  return e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
}
