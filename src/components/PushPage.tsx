import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { CSSProperties, RefObject } from 'react'
import { IOS_SPRING_EASING, IOS_SPRING_MS } from '../utils/iosSpring'

// What's under a page pushed from the right slides a little way left, and
// darkens, as the page covers it — iOS's parallax (#367), measured off the
// same recordings as the spring: 30% as far as the page travels, and 10%
// darker once covered.
const COVERED_SHIFT = 'translateX(-30%)'
const COVERED_DIM = 0.1

// Pages pushed from the right that are in place, in the order they got
// there: each covers the one before it, and the first covers the tabs.
// Pages that slide up (Share, New event) cover nothing, as on iOS.
const covering: object[] = []
const coveringListeners = new Set<() => void>()

function onCoveringChange(listener: () => void) {
  coveringListeners.add(listener)
  return () => { coveringListeners.delete(listener) }
}

function useCovering(page: object, on: boolean) {
  useLayoutEffect(() => {
    if (!on) return
    covering.push(page)
    coveringListeners.forEach(listener => listener())
    return () => {
      covering.splice(covering.indexOf(page), 1)
      coveringListeners.forEach(listener => listener())
    }
  }, [on])
}

/** Whether a page is pushed over `page` — or, without one, over the tabs. */
function useCovered(page?: object): boolean {
  return useSyncExternalStore(onCoveringChange, () => {
    if (!page) return covering.length > 0
    const i = covering.indexOf(page)
    return i >= 0 && i < covering.length - 1
  })
}

function slide(property: string, instant: boolean) {
  return instant ? 'none' : `${property} ${IOS_SPRING_MS}ms ${IOS_SPRING_EASING}`
}

/**
 * Style for the tabs and their tab bar, under every pushed page: they
 * slide a little way left as the first page is pushed over them, and back
 * as it goes (#367). `instant` as for PushPage.
 */
export function useUnderPushedPages(instant: boolean): CSSProperties {
  return {
    transform: useCovered() ? COVERED_SHIFT : undefined,
    transition: slide('transform', instant),
    // Painted as a layer of their own ahead of time, as a pushed page is:
    // made one only as a push starts, Safari paints them in that push's
    // first frame, and the push jumps.
    willChange: 'transform',
  }
}

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
  // Pushed from the right, it covers the page before it while in place —
  // from the frame it starts sliding in to the frame it starts sliding out
  // — and is itself covered by the next (#367).
  const self = useRef({}).current
  const pushed = from === 'right'
  useCovering(self, pushed && inPosition)
  const covered = useCovered(self) && pushed

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
    // Closed before it ever slid in: nothing to slide out. Nor closed
    // under the page over it, going too: that one slides away to show
    // what's under both, as iOS pops more than one page at once.
    if (!inPosition || covered) {
      if (onScreen) exited()
    } else setInPosition(false)
  }, [open, instant])

  return (
    <>
    {pushed && (
      // Darkens whatever it's pushed over, as it covers it (#367).
      <div
        aria-hidden="true"
        data-covering-dim
        className="pointer-events-none fixed inset-0 z-30 bg-black"
        style={{
          zIndex: raised ? 31 : undefined,
          opacity: inPosition ? COVERED_DIM : 0,
          transition: slide('opacity', instant),
        }}
      />
    )}
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
          : !inPosition ? 'translateX(100%)' : covered ? COVERED_SHIFT : 'translateX(0)',
        // iOS's own push, pop and sheet spring (#367).
        transition: slide('transform', instant),
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
    </>
  )
}
