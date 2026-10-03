import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { CSSProperties, RefObject } from 'react'
import { IOS_SPRING_EASING, IOS_SPRING_MS } from '../utils/iosSpring'

// What's under a page pushed from the right slides a little way left, and
// darkens, as the page covers it — iOS's parallax (#367), measured off the
// same recordings as the spring: 30% as far as the page travels, and 10%
// darker once covered.
const COVERED_SHIFT = 'translateX(-30%)'
const COVERED_DIM = 0.1

// A page with Cancel and Save is an iOS page sheet (#415): it stops a
// little below the status bar, with rounded top corners, and what's under
// it shrinks back into a dimmed card on black, the card's top edge showing
// above the sheet. Measured off iOS's own sheets (a GitHub issue's New
// issue sheet): the card is 92% as wide and 8 px under the status bar, the
// sheet 10 px under the card's top, each with ~10 px corners.
const RECEDED_SCALE = 0.92
const RECEDED = `translateY(calc(env(safe-area-inset-top) + 8px)) scale(${RECEDED_SCALE})`
// Its corners, before the card is scaled down to show them 10 px round.
const RECEDED_RADIUS = `${+(10 / RECEDED_SCALE).toFixed(2)}px`
const RECEDED_DIM = 0.12
/** Where a sheet's top edge stops: below the acting banner and status bar. */
export const SHEET_TOP = 'calc(var(--acting-h, 0px) + env(safe-area-inset-top) + 18px)'
const SHEET_RADIUS = '12px'
// Over every page, a raised one too (#274): an event's page opened from a
// track or car page sat over its own Edit details at 31.
const SHEET_Z = 35

function zIndex(sheet: boolean, raised: boolean) {
  return sheet ? SHEET_Z : raised ? 31 : undefined
}

// Pages pushed from the right that are in place. Each covers whatever is
// under it, and the first covers the tabs. Pages that slide up (Share, New
// event) cover nothing, as on iOS.
interface Pushed {
  el: HTMLElement | null
  raised: boolean
}
const covering: Pushed[] = []
const coveringListeners = new Set<() => void>()

function coveringChanged() {
  coveringListeners.forEach(listener => listener())
}

function onCoveringChange(listener: () => void) {
  coveringListeners.add(listener)
  return () => { coveringListeners.delete(listener) }
}

/**
 * Whether `a` is painted over `b`: raised pages over the rest, and
 * otherwise whichever comes later on the page. Not the order they got
 * into place: a page can arrive under one already there — the Garage,
 * under a car's page opened from an event, once another of the car's
 * events is opened over it (#380).
 */
function isOver(a: Pushed, b: Pushed): boolean {
  if (a.raised !== b.raised) return a.raised
  if (!a.el || !b.el) return false
  return !!(b.el.compareDocumentPosition(a.el) & Node.DOCUMENT_POSITION_FOLLOWING)
}

function useCovering(page: Pushed, on: boolean, raised: boolean) {
  useLayoutEffect(() => {
    if (page.raised === raised) return
    page.raised = raised
    if (covering.includes(page)) coveringChanged()
  }, [raised])
  useLayoutEffect(() => {
    if (!on) return
    covering.push(page)
    coveringChanged()
    return () => {
      covering.splice(covering.indexOf(page), 1)
      coveringChanged()
    }
  }, [on])
}

// Sheets on screen (#415), and whether each is up in place yet or still
// on its way. Whatever's under one recedes as it comes up.
interface Sheet {
  page: Pushed
  up: boolean
}
const sheets: Sheet[] = []

function useSheet(page: Pushed, shown: boolean, up: boolean) {
  const sheet = useRef<Sheet>({ page, up }).current
  useLayoutEffect(() => {
    if (!shown) return
    sheets.push(sheet)
    coveringChanged()
    return () => {
      sheets.splice(sheets.indexOf(sheet), 1)
      coveringChanged()
    }
  }, [shown])
  useLayoutEffect(() => {
    if (sheet.up === up) return
    sheet.up = up
    if (sheets.includes(sheet)) coveringChanged()
  }, [up])
}

/**
 * Whether a sheet is over `page` — every sheet is over every page —
 * or, without one, over the tabs:
 * 'up' once one is in place (or on its way there), 'shown' while one is on
 * screen but down (sliding in or out), else 'none'.
 */
type UnderSheet = 'none' | 'shown' | 'up'
function useUnderSheet(page?: Pushed): UnderSheet {
  return useSyncExternalStore(onCoveringChange, () => {
    const over = sheets.filter(sheet => sheet.page !== page)
    return over.some(sheet => sheet.up) ? 'up' : over.length > 0 ? 'shown' : 'none'
  })
}

/** Whether a sheet is up, over anything (#415): the status bar turns black over it. */
export function useSheetUp(): boolean {
  return useUnderSheet() === 'up'
}

/** Whether a page is pushed over `page` — or, without one, over the tabs. */
function useCovered(page?: Pushed): boolean {
  return useSyncExternalStore(onCoveringChange, () => {
    if (!page) return covering.length > 0
    return covering.includes(page) && covering.some(other => other !== page && isOver(other, page))
  })
}

function slide(property: string, instant: boolean) {
  if (instant) return 'none'
  return property.split(', ').map(p => `${p} ${IOS_SPRING_MS}ms ${IOS_SPRING_EASING}`).join(', ')
}

/**
 * Style for the tabs and their tab bar, under every pushed page: they
 * slide a little way left as the first page is pushed over them, and back
 * as it goes (#367). Under a sheet (#415) they shrink back into a card, as
 * a page does. `instant` as for PushPage.
 *
 * The tabs scroll with the document, and the tab bar is fixed to the
 * bottom, so each is scaled about the top of the screen, not its own: where
 * the screen's top is in the tabs is how far the document is scrolled,
 * held still while the sheet is up (#321).
 */
export function useUnderPushedPages(instant: boolean, part: 'tabs' | 'tab bar' = 'tabs'): CSSProperties {
  const covered = useCovered()
  const underSheet = useUnderSheet()
  const top = typeof window === 'undefined' ? 0 : window.scrollY
  const style: CSSProperties = {
    transform: covered ? COVERED_SHIFT : underSheet === 'up' ? RECEDED : undefined,
    transition: slide('transform, clip-path', instant),
    // Painted as a layer of their own ahead of time, as a pushed page is:
    // made one only as a push starts, Safari paints them in that push's
    // first frame, and the push jumps.
    willChange: 'transform',
  }
  if (underSheet === 'none') return style
  // Out of sight under a page pushed over them: hidden, so they don't show
  // at the corners of that page's card.
  if (covered) return { ...style, visibility: 'hidden' }
  if (part === 'tab bar') {
    return { ...style, transformOrigin: '50% calc(var(--acting-h, 0px) + 100% - 100dvh)' }
  }
  return {
    ...style,
    transformOrigin: `50% ${top}px`,
    // Cut off above the screen's top, which would show above the card,
    // with the card's round corners there.
    clipPath: `inset(${top}px 0 0 0 round ${underSheet === 'up' ? RECEDED_RADIUS : '0px'})`,
    // Its own background rather than the page's, which is black under a sheet.
    backgroundColor: '#f9fafb',
  }
}

// Pushed pages on screen, so the document stays locked until the last one
// has gone (an event's page can be open over a track page).
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
  useHtmlClass('push-page-open', locked)
}

const htmlClassCounts = new Map<string, number>()

/** `className` on <html> while any page (or sheet) asks for it. */
export function useHtmlClass(className: string, on: boolean) {
  useLayoutEffect(() => {
    if (!on) return
    const count = htmlClassCounts.get(className) ?? 0
    htmlClassCounts.set(className, count + 1)
    if (count === 0) document.documentElement.classList.add(className)
    return () => {
      const left = htmlClassCounts.get(className)! - 1
      htmlClassCounts.set(className, left)
      if (left === 0) document.documentElement.classList.remove(className)
    }
  }, [on])
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
  /**
   * With `from="bottom"`: an iOS page sheet (#415), for a page with Cancel
   * and Save, or the iOS widget page's ✕. It stops a little below the status bar, with rounded top
   * corners, and what's under it shrinks back into a dimmed card on black.
   */
  sheet?: boolean
}

/**
 * Full-viewport slide-over that animates in from the right on push and
 * back out to the right on pop — or up from the bottom and back down,
 * for a modal page (`from="bottom"`). Kept mounted through the exit animation
 * so its content is still visible while sliding away; `onExited` fires
 * once the transform finishes and it can be unmounted.
 */
export function PushPage({ open, onExited, onEnteredChange, scrollRef, children, skipEnterAnimation, instant = false, whiteHeader = true, from = 'right', raised = false, sheet = false }: Props) {
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
  const self = useRef<Pushed>({ el: null, raised }).current
  const pushed = from === 'right'
  useCovering(self, pushed && inPosition, raised)
  const covered = useCovered(self) && pushed
  // A sheet, up from the frame it starts sliding up to the frame it starts
  // sliding down, as a push covers (#415); and any other page under one.
  const isSheet = sheet && from === 'bottom'
  useSheet(self, isSheet && onScreen, isSheet && inPosition)
  useHtmlClass('page-sheet-open', isSheet && onScreen)
  useHtmlClass('page-sheet-up', isSheet && inPosition)
  const underSheet = useUnderSheet(self)
  const receded = !isSheet && underSheet === 'up'

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
    {isSheet && onScreen && (
      // Dims the card that what's under it shrinks into, and keeps taps
      // off it (#415).
      <div
        aria-hidden="true"
        data-sheet-dim
        className="fixed inset-0 bg-black"
        style={{
          zIndex: SHEET_Z,
          opacity: inPosition ? RECEDED_DIM : 0,
          transition: slide('opacity', instant),
        }}
      />
    )}
    <div
      ref={el => {
        self.el = el
        if (scrollRef) scrollRef.current = el
      }}
      className={`fixed inset-0 z-30 overflow-x-hidden overflow-y-auto overscroll-y-contain ${white ? 'bg-white' : 'bg-gray-50'}`}
      style={{
        // Below the banner while an admin acts as another driver (#396);
        // a sheet, below the status bar too, with the card under it showing.
        top: isSheet ? SHEET_TOP : 'var(--acting-h, 0px)',
        zIndex: zIndex(isSheet, raised),
        // Out of sight under the page pushed over it, while a sheet makes
        // that one a card: hidden, so it doesn't show at the card's corners.
        visibility: covered && underSheet !== 'none' ? 'hidden' : undefined,
        borderRadius: isSheet ? `${SHEET_RADIUS} ${SHEET_RADIUS} 0 0` : receded ? RECEDED_RADIUS : undefined,
        transformOrigin: isSheet ? undefined : '50% 0',
        // Once in place, white is what Safari 26 samples to tint the
        // status bar — this fixed page is the element at the top edge —
        // so it matches the white header (#245). Gray-50 while sliding,
        // so the tint doesn't change ahead of the page. The page's own
        // content paints gray-50 over this; it only shows when
        // rubber-banding past either end, so keep it white above
        // (header) and gray-50 below (page).
        backgroundImage: white ? 'linear-gradient(to bottom, #ffffff 50%, #f9fafb 50%)' : undefined,
        transform: from === 'bottom'
          ? !inPosition ? 'translateY(100%)' : receded ? RECEDED : 'translateY(0)'
          : !inPosition ? 'translateX(100%)' : covered ? COVERED_SHIFT : receded ? RECEDED : 'translateX(0)',
        // iOS's own push, pop and sheet spring (#367).
        transition: slide(isSheet ? 'transform' : 'transform, border-radius', instant),
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
