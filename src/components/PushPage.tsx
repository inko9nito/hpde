import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

// iOS UINavigationController's default push transition. Same curve and
// duration the event-details drawer uses so both pushes feel of a piece.
const PUSH_DURATION_MS = 350
const PUSH_EASING = 'cubic-bezier(0.32, 0.72, 0, 1)'

interface Props {
  open: boolean
  onExited?: () => void
  /** True once the page has finished sliding in, false again the moment
   *  it starts sliding out. */
  onEnteredChange?: (entered: boolean) => void
  scrollRef?: RefObject<HTMLDivElement | null>
  children: React.ReactNode
  /**
   * Skip the slide-in on this instance's first mount, rendering already
   * in position instead — for a page that mounted open because it's
   * showing whatever route the app loaded on (a fresh load, a reload,
   * a redirect), not because of a real in-app push. Only ever applies
   * once: a later close/reopen of the same instance still animates.
   */
  skipEnterAnimation?: boolean
  /**
   * The page's top edge is a white header (the event page), so once in
   * place its backdrop turns white to match. False for pages that are
   * gray-50 all the way up — Share, iOS widget (#273).
   */
  whiteHeader?: boolean
  /**
   * Which edge it slides in from, and back out to. 'right' is a push
   * (the event page); 'bottom' is a modal page closed with ✕ — New
   * event, Share, iOS widget (#278).
   */
  from?: 'right' | 'bottom'
}

/**
 * Full-viewport slide-over that animates in from the right on push and
 * back out to the right on pop — or up from the bottom and back down,
 * for a modal page (`from="bottom"`). Kept mounted through the exit animation
 * so its content is still visible while sliding away; `onExited` fires
 * once the transform finishes and it can be unmounted.
 */
export function PushPage({ open, onExited, onEnteredChange, scrollRef, children, skipEnterAnimation, whiteHeader = true, from = 'right' }: Props) {
  // Always start off-screen and animate in via requestAnimationFrame,
  // even when mounted with open=true — otherwise the initial off-screen
  // frame never paints and the transition doesn't fire. The one
  // exception is skipEnterAnimation, which renders already in position.
  const [inPosition, setInPosition] = useState(() => open && !!skipEnterAnimation)
  const isFirstRun = useRef(true)
  // Fully in place, as opposed to on its way in or out. The status bar
  // tint (#245) follows this rather than `open`, so it doesn't turn white
  // before the page has slid in, and turns back as soon as it leaves.
  const [entered, setEntered] = useState(() => open && !!skipEnterAnimation)
  useEffect(() => {
    if (!open) setEntered(false)
  }, [open])
  useEffect(() => {
    onEnteredChange?.(entered)
  }, [entered])
  const white = entered && whiteHeader

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      // inPosition already matches `open` from the state initializer
      // above — nothing to animate for this first run.
      if (skipEnterAnimation) return
    }
    if (open) {
      const id = requestAnimationFrame(() => setInPosition(true))
      return () => cancelAnimationFrame(id)
    }
    setInPosition(false)
  }, [open])

  return (
    <div
      ref={scrollRef}
      className={`fixed inset-0 z-30 overflow-x-hidden overflow-y-auto ${white ? 'bg-white' : 'bg-gray-50'}`}
      style={{
        // Once in place, white is what Safari 26 samples to tint the
        // status bar — this fixed page is the element at the top edge —
        // so it matches the white header (#245). Gray-50 while sliding,
        // so the tint doesn't change ahead of the page. The page's own
        // content paints gray-50 over this; it only shows when
        // rubber-banding past either end, so keep it white above
        // (header) and gray-50 below (page).
        backgroundImage: white ? 'linear-gradient(to bottom, #ffffff 50%, #f9fafb 50%)' : undefined,
        transform: from === 'bottom'
          ? `translateY(${inPosition ? '0' : '100%'})`
          : `translateX(${inPosition ? '0' : '100%'})`,
        transition: `transform ${PUSH_DURATION_MS}ms ${PUSH_EASING}`,
        willChange: 'transform',
        // Cast onto the page it's covering: left of a push, above a modal.
        boxShadow: from === 'bottom'
          ? '0 -8px 32px -8px rgba(0, 0, 0, 0.18)'
          : '-8px 0 32px -8px rgba(0, 0, 0, 0.18)',
      }}
      onTransitionEnd={e => {
        if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
        if (inPosition && open) setEntered(true)
        else if (!inPosition && !open) onExited?.()
      }}
    >
      {children}
    </div>
  )
}
