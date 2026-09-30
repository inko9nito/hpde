import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { IOS_SPRING_EASING, IOS_SPRING_MS } from '../utils/iosSpring'

// Pushed pages on screen, so the document stays locked until the last one
// has gone (an event's page can be open over a track page).
let openPages = 0

/**
 * While a pushed page is on screen, the page under it doesn't scroll (#321).
 * The pushed page is its own scroller over the document; left scrollable,
 * iOS hands a drag to the document behind it instead — reliably after a
 * native picker (a date field) has been open — so the page in view stops
 * scrolling while the hidden list underneath does.
 *
 * Unlocked once the page has slid all the way out, not as it starts to
 * (#367): that relays out the whole page underneath, and Safari jumps a
 * slide ahead by however long its first frame takes. Lifted in the same
 * commit that takes the page away, so it never outlasts the page.
 */
function useLockDocumentScroll(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) return
    if (openPages++ === 0) document.documentElement.classList.add('push-page-open')
    return () => {
      if (--openPages === 0) document.documentElement.classList.remove('push-page-open')
    }
  }, [locked])
}

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
   * The browser has already slid this page in or out itself — an iOS
   * swipe back or forward (#355) — so it opens or closes in place, rather
   * than sliding across a second time.
   */
  instant?: boolean
  /**
   * The page's top edge is a white header (the event page), so once in
   * place its backdrop turns white to match. False for pages that are
   * gray-50 all the way up — Share, iOS widget (#273).
   */
  whiteHeader?: boolean
  /**
   * Which edge it slides in from, and back out to. 'right' is a push
   * (the event page), closed with Back; 'bottom' is a modal page closed
   * with ✕ or Cancel — New event, Share, iOS widget (#278), Add a car
   * (#356). A page with a Cancel always slides up, as on iOS.
   */
  from?: 'right' | 'bottom'
  /**
   * Above the other pushed pages, whatever their order on the page: an
   * event's page opened from a track page, over it (#274).
   */
  raised?: boolean
}

/**
 * Full-viewport slide-over that animates in from the right on push and
 * back out to the right on pop — or up from the bottom and back down,
 * for a modal page (`from="bottom"`). Kept mounted through the exit animation
 * so its content is still visible while sliding away; `onExited` fires
 * once the transform finishes and it can be unmounted.
 */
export function PushPage({ open, onExited, onEnteredChange, scrollRef, children, skipEnterAnimation, instant = false, whiteHeader = true, from = 'right', raised = false }: Props) {
  // Always start off-screen and animate in via requestAnimationFrame,
  // even when mounted with open=true — otherwise the initial off-screen
  // frame never paints and the transition doesn't fire. The exceptions
  // are skipEnterAnimation and instant, which render already in position.
  const [inPosition, setInPosition] = useState(() => open && (!!skipEnterAnimation || instant))
  const isFirstRun = useRef(true)
  // Fully in place, as opposed to on its way in or out. The status bar
  // tint (#245) follows this rather than `open`, so it doesn't turn white
  // before the page has slid in, and turns back as soon as it leaves.
  const [entered, setEntered] = useState(() => open && (!!skipEnterAnimation || instant))
  // Opened or closed by a swipe the browser has already animated (#355):
  // in place (or off-screen) in the same render, so the page it swiped
  // away never shows again.
  const [wasOpen, setWasOpen] = useState(open)
  if (open !== wasOpen) {
    setWasOpen(open)
    if (instant) {
      setInPosition(open)
      setEntered(open)
    }
  }
  useEffect(() => {
    if (!open) setEntered(false)
  }, [open])
  useEffect(() => {
    onEnteredChange?.(entered)
  }, [entered])
  const white = entered && whiteHeader
  // Open, or still on its way out.
  const [onScreen, setOnScreen] = useState(open)
  if (open && !onScreen) setOnScreen(true)
  useLockDocumentScroll(onScreen)
  function exited() {
    setOnScreen(false)
    onExited?.()
  }

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      // inPosition already matches `open` from the state initializer
      // above — nothing to animate for this first run.
      if (skipEnterAnimation || instant) return
    }
    if (instant) {
      // Already out of sight, with no slide to wait for — as is a page
      // swiped away while it was still sliding out, since `transition:
      // none` cuts that slide short.
      if (!open && onScreen) exited()
      return
    }
    if (open) {
      const id = requestAnimationFrame(() => setInPosition(true))
      return () => cancelAnimationFrame(id)
    }
    // Closed before it ever slid in: nothing to slide out.
    if (!inPosition) {
      if (onScreen) exited()
    } else setInPosition(false)
  }, [open, instant])

  return (
    <div
      ref={scrollRef}
      className={`fixed inset-0 z-30 overflow-x-hidden overflow-y-auto overscroll-y-contain ${white ? 'bg-white' : 'bg-gray-50'}`}
      style={{
        zIndex: raised ? 31 : undefined,
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
        // iOS's own push, pop and sheet spring (#367).
        transition: instant ? 'none' : `transform ${IOS_SPRING_MS}ms ${IOS_SPRING_EASING}`,
        willChange: 'transform',
        // Cast onto the page it's covering: left of a push, above a modal.
        boxShadow: from === 'bottom'
          ? '0 -8px 32px -8px rgba(0, 0, 0, 0.18)'
          : '-8px 0 32px -8px rgba(0, 0, 0, 0.18)',
      }}
      onTransitionEnd={e => {
        if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
        if (inPosition && open) setEntered(true)
        else if (!inPosition && !open) exited()
      }}
    >
      {children}
    </div>
  )
}
