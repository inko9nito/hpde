import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

// iOS UINavigationController's default push transition. Same curve and
// duration the event-details drawer uses so both pushes feel of a piece.
const PUSH_DURATION_MS = 350
const PUSH_EASING = 'cubic-bezier(0.32, 0.72, 0, 1)'

interface Props {
  open: boolean
  onExited?: () => void
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
}

/**
 * Full-viewport slide-over that animates in from the right on push and
 * back out to the right on pop. Kept mounted through the exit animation
 * so its content is still visible while sliding away; `onExited` fires
 * once the transform finishes and it can be unmounted.
 */
export function PushPage({ open, onExited, scrollRef, children, skipEnterAnimation }: Props) {
  // Always start off-screen and animate in via requestAnimationFrame,
  // even when mounted with open=true — otherwise the initial off-screen
  // frame never paints and the transition doesn't fire. The one
  // exception is skipEnterAnimation, which renders already in position.
  const [inPosition, setInPosition] = useState(() => open && !!skipEnterAnimation)
  const isFirstRun = useRef(true)

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
      className="fixed inset-0 z-30 overflow-x-hidden overflow-y-auto bg-white"
      style={{
        // White is what Safari 26 samples to tint the status bar — this
        // fixed page is the element at the top edge — so it matches the
        // white header (#245). The page's own content paints gray-50;
        // this only shows when rubber-banding past either end, so keep
        // it white above (header) and gray-50 below (page).
        backgroundImage: 'linear-gradient(to bottom, #ffffff 50%, #f9fafb 50%)',
        transform: `translateX(${inPosition ? '0' : '100%'})`,
        transition: `transform ${PUSH_DURATION_MS}ms ${PUSH_EASING}`,
        willChange: 'transform',
        boxShadow: '-8px 0 32px -8px rgba(0, 0, 0, 0.18)',
      }}
      onTransitionEnd={e => {
        if (e.propertyName === 'transform' && !inPosition && !open) onExited?.()
      }}
    >
      {children}
    </div>
  )
}
