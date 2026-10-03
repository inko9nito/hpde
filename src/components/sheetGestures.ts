import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

// A sheet from the bottom — or a page sheet with Cancel or ✕ — held by its
// handle (#387) and in front of the page (#432), as an iOS sheet is:
//  - a finger pulling it down — on its handle or toolbar (anything marked
//    data-sheet-grab), or on what's in it once that's scrolled to the top
//    — drags it, and lets go of it past a third of its height, or with a
//    flick, to close it; short of that it springs back up. Never while
//    it's busy, or its Cancel (data-sheet-cancel) is disabled: saving;
//  - nothing scrolls the page behind it: not a finger on the dimmed page,
//    nor one that runs past the end of what's in the sheet. What's in it
//    still scrolls, and its text boxes are left alone.
// Touch only: on a computer, ✕, Escape and the dimmed page close it.

/** How far a finger moves before it's a drag. */
export const DRAG_START_PX = 8
/** Let go past this much of the sheet's height, and it closes. */
export const DISMISS_FRACTION = 1 / 3
/** Or flicked down at least this fast (px/ms). */
export const FLICK_PX_PER_MS = 0.5
/** How long it takes to slide the rest of the way down, or back up. */
export const SETTLE_MS = 220
export const SETTLE_EASE = 'cubic-bezier(0.2, 0.8, 0.2, 1)'

type Axis = 'x' | 'y'

/** The nearest element from `el` up to `panel` that scrolls along `axis`; null if none does. */
function scrollerOf(el: Element | null, panel: Element, axis: Axis): HTMLElement | null {
  for (let n = el; n; n = n.parentElement) {
    const style = getComputedStyle(n)
    const overflow = axis === 'y' ? style.overflowY : style.overflowX
    const more = axis === 'y' ? n.scrollHeight > n.clientHeight + 1 : n.scrollWidth > n.clientWidth + 1
    if ((overflow === 'auto' || overflow === 'scroll') && more) return n as HTMLElement
    if (n === panel) break
  }
  return null
}

/** Whether `el` can scroll further as a finger moves `delta` px along `axis`. */
function canScroll(el: HTMLElement, axis: Axis, delta: number): boolean {
  const at = axis === 'y' ? el.scrollTop : el.scrollLeft
  const max = axis === 'y' ? el.scrollHeight - el.clientHeight : el.scrollWidth - el.clientWidth
  // A finger moving down (or right) shows what's before.
  return delta > 0 ? at > 0 : at < max - 1
}

const inField = (el: Element | null) => !!el?.closest('input, textarea, select, [contenteditable="true"]')

/**
 * The sheet's gestures, on its overlay (`root`): the dimmed page
 * (`backdrop`, if it has one) and the sheet itself (`panel`). `onClose` once
 * it's been dragged away — after sliding the rest of the way down itself,
 * or, with `slideOut` false, straight away, for a page that slides itself
 * out (PushPage). Never while `busy`; none at all unless `enabled`.
 */
export function useSheetGestures({ root, panel, backdrop, onClose, busy = false, enabled = true, slideOut = true }: {
  root: RefObject<HTMLElement | null>
  panel: RefObject<HTMLElement | null>
  backdrop?: RefObject<HTMLElement | null>
  onClose: () => void
  busy?: boolean
  enabled?: boolean
  slideOut?: boolean
}) {
  const latest = useRef({ onClose, busy })
  latest.current = { onClose, busy }

  useEffect(() => {
    const overlay = root.current
    const sheet = panel.current
    if (!enabled || !overlay || !sheet) return
    const dim = backdrop?.current ?? null
    const isBusy = () => latest.current.busy || !!sheet.querySelector('[data-sheet-cancel]:disabled')

    // What the finger on it is doing, decided on its first move: dragging
    // the sheet, scrolling what's in the sheet (or using a text box), or
    // neither — kept from scrolling the page.
    let mode: 'idle' | 'deciding' | 'drag' | 'native' | 'block' = 'idle'
    let startX = 0
    let startY = 0
    let offset = 0
    let lastY = 0
    let lastT = 0
    let velocity = 0
    let closing = false
    let timer: ReturnType<typeof setTimeout> | undefined
    // Its own transform and transition (a page sheet's, from PushPage),
    // as they were before the drag: the drag goes on top, and they're put
    // back after.
    let rest = { transform: '', transition: '' }

    // The sheet `y` px down from where it rests, and the page dimmed less the further it is.
    const place = (y: number, settle: boolean) => {
      const ease = `${SETTLE_MS}ms ${SETTLE_EASE}`
      sheet.style.transition = !settle ? 'none' : rest.transition || `transform ${ease}`
      sheet.style.transform = y > 0 ? `${rest.transform} translateY(${y}px)`.trim() : rest.transform
      if (dim) {
        dim.style.transition = settle ? `opacity ${ease}` : 'none'
        dim.style.opacity = y > 0 ? String(Math.max(0, 1 - y / Math.max(1, sheet.offsetHeight))) : ''
      }
    }

    const onStart = (e: TouchEvent) => {
      if (closing || e.touches.length !== 1) {
        mode = closing ? 'block' : 'native'
        return
      }
      const t = e.touches[0]
      startX = t.clientX
      startY = t.clientY
      lastY = t.clientY
      lastT = e.timeStamp
      velocity = 0
      offset = 0
      rest = { transform: sheet.style.transform, transition: sheet.style.transition }
      mode = 'deciding'
    }

    const decide = (target: Element | null, dx: number, dy: number) => {
      if (!target || !sheet.contains(target)) return 'block'
      if (inField(target)) return 'native'
      const axis: Axis = Math.abs(dy) >= Math.abs(dx) ? 'y' : 'x'
      const delta = axis === 'y' ? dy : dx
      const scroller = scrollerOf(target, sheet, axis)
      const grab = axis === 'y' && dy > 0 && (!!target.closest('[data-sheet-grab]') || !scroller || scroller.scrollTop <= 0)
      if (grab) return isBusy() ? 'block' : 'drag'
      return scroller && canScroll(scroller, axis, delta) ? 'native' : 'block'
    }

    const onMove = (e: TouchEvent) => {
      if (mode === 'idle' || mode === 'native') return
      const t = e.touches[0]
      if (!t) return
      const dx = t.clientX - startX
      const dy = t.clientY - startY
      // Decided on the first move: once iOS starts a scroll, it can't be stopped.
      if (mode === 'deciding') mode = decide(e.target as Element | null, dx, dy)
      if (mode === 'native') return
      if (e.cancelable) e.preventDefault()
      if (mode !== 'drag') return
      // It follows the finger once it has moved far enough to be a drag, never above where it rests.
      offset = dy > DRAG_START_PX ? dy - DRAG_START_PX : 0
      const dt = e.timeStamp - lastT
      if (dt > 0) velocity = (t.clientY - lastY) / dt
      lastY = t.clientY
      lastT = e.timeStamp
      place(offset, false)
    }

    const onEnd = (e: TouchEvent) => {
      if (mode === 'drag') {
        // A finger that stopped before letting go isn't a flick.
        const flicked = e.timeStamp - lastT < 100 && velocity > FLICK_PX_PER_MS && offset > 0
        if (e.type === 'touchend' && (offset > sheet.offsetHeight * DISMISS_FRACTION || flicked)) {
          closing = true
          if (slideOut) {
            place(sheet.offsetHeight, true)
            timer = setTimeout(() => latest.current.onClose(), SETTLE_MS)
          } else {
            // It slides itself out from here, along its own spring.
            sheet.style.transition = rest.transition
            latest.current.onClose()
          }
        } else if (offset > 0) {
          place(0, true)
        }
      }
      if (e.touches.length === 0) mode = 'idle'
    }

    overlay.addEventListener('touchstart', onStart, { passive: true })
    overlay.addEventListener('touchmove', onMove, { passive: false })
    overlay.addEventListener('touchend', onEnd)
    overlay.addEventListener('touchcancel', onEnd)
    return () => {
      overlay.removeEventListener('touchstart', onStart)
      overlay.removeEventListener('touchmove', onMove)
      overlay.removeEventListener('touchend', onEnd)
      overlay.removeEventListener('touchcancel', onEnd)
      clearTimeout(timer)
    }
  }, [root, panel, backdrop, enabled, slideOut])
}
