import { useEffect, useState } from 'react'
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
}

/**
 * Full-viewport slide-over that animates in from the right on push and
 * back out to the right on pop. Kept mounted through the exit animation
 * so its content is still visible while sliding away; `onExited` fires
 * once the transform finishes and it can be unmounted.
 */
export function PushPage({ open, onExited, scrollRef, children }: Props) {
  // Always start off-screen and animate in via requestAnimationFrame,
  // even when mounted with open=true — otherwise the initial off-screen
  // frame never paints and the transition doesn't fire.
  const [inPosition, setInPosition] = useState(false)

  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setInPosition(true))
      return () => cancelAnimationFrame(id)
    }
    setInPosition(false)
  }, [open])

  return (
    <div
      ref={scrollRef}
      className="fixed inset-0 z-30 overflow-x-hidden overflow-y-auto bg-gray-50"
      style={{
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
