import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { MutableRefObject, ReactNode, RefObject } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { COVERED_DIM, COVERED_SHIFT, SHEET_TOP, useHtmlClass, useRecedeUnder } from './PushPage'
import { IOS_SPRING_EASING, IOS_SPRING_MS } from '../utils/iosSpring'
import { SETTLE_EASE, SETTLE_MS, useSheetGestures } from './sheetGestures'

// Room under what's in a sheet for the home indicator.
const SHEET_BOTTOM = 'pb-[max(1.25rem,env(safe-area-inset-bottom))]'
/** The handle's strip across a sheet's top. */
const HANDLE_PX = 20

/**
 * Slides a sheet away (#388): down off the screen, the page under it
 * brightening as it goes, then `then`. Once only; at once with reduced
 * motion.
 */
export type Dismiss = (then?: () => void) => void

/**
 * What every sheet from the bottom is built on: the dimmed page, and the
 * sheet over it with its handle — which drags it down to close it (#387)
 * — while the page behind it stays put (#432). A tap on the dimmed page
 * slides it down to close it (#388), never while `busy`. `className` lays
 * out what's in it. `dismissRef` gets the way to slide it down, for its ✕
 * and Escape, or what it's in.
 */
export function BottomSheet({ label, busy = false, onClose, className, dismissRef, back, bare = false, tapToClose = true, receded = false, children, ...data }: {
  /** Names the dialog. */
  label: string
  busy?: boolean
  onClose: () => void
  className: string
  dismissRef?: MutableRefObject<Dismiss | null>
  /** With a page pushed in it (#445): dragged down, it goes back a page instead of closing. */
  back?: () => void
  /** No room left under what's in it for the home indicator: what's in it leaves its own. */
  bare?: boolean
  /** A tap on the dimmed page closes it. */
  tapToClose?: boolean
  /** Grown into a page sheet (#445): the card shrunk back behind it is dimmed less, as under one. */
  receded?: boolean
  children: ReactNode
} & { [data: `data-${string}`]: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const backdrop = useRef<HTMLDivElement>(null)
  useSheetGestures({ root, panel, backdrop, onClose, back, busy })
  const latestClose = useRef(onClose)
  latestClose.current = onClose
  const leaving = useRef(false)
  // Gone before it's down — something else closed it: nothing more to do.
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  const dismiss: Dismiss = then => {
    const done = then ?? (() => latestClose.current())
    if (leaving.current) return
    leaving.current = true
    // On its way out: gone to a screen reader. Taps stop at the dimmed page
    // till it's gone, as on iOS — not through to what's under it, which
    // its closing (going back, say) would then undo.
    root.current?.setAttribute('aria-hidden', 'true')
    if (panel.current) panel.current.style.pointerEvents = 'none'
    const sheet = panel.current
    const dim = backdrop.current
    if (!sheet || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return done()
    const ease = `${SETTLE_MS}ms ${SETTLE_EASE}`
    // Still rising, it goes down from where it's got to.
    sheet.style.transform = getComputedStyle(sheet).transform.replace('none', '')
    sheet.classList.remove('sheet-up')
    void sheet.offsetHeight
    sheet.style.transition = `transform ${ease}`
    sheet.style.transform = 'translateY(100%)'
    if (dim) {
      dim.style.transition = `opacity ${ease}`
      dim.style.opacity = '0'
    }
    timer.current = setTimeout(done, SETTLE_MS)
  }
  if (dismissRef) dismissRef.current = dismiss
  // The page behind it doesn't scroll, with a mouse wheel either.
  useHtmlClass('bottom-sheet-open', true)

  return createPortal(
    <div ref={root} className="fixed inset-0 z-50 flex items-end justify-center" {...data}>
      <div
        ref={backdrop}
        className={`absolute inset-0 touch-none transition-colors duration-500 ${receded ? 'bg-black/[.12]' : 'bg-black/40'}`}
        onClick={busy || !tapToClose ? undefined : () => dismiss()}
        aria-hidden="true"
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`sheet-up relative w-full max-w-lg overscroll-contain rounded-t-2xl bg-white shadow-2xl ${bare ? '' : SHEET_BOTTOM} ${className}`}
      >
        {/* The handle: a taller strip than the pill shows, for a thumb. */}
        <div className="flex shrink-0 items-center justify-center" style={{ height: HANDLE_PX }} data-sheet-handle data-sheet-grab aria-hidden="true">
          <div className="h-1 w-9 rounded-full bg-gray-300" />
        </div>
        {children}
      </div>
    </div>,
    document.body,
  )
}

/**
 * A sheet that opens from the bottom like an iOS sheet (#210): a heading
 * with a close button, over whatever goes in it. ✕, Escape or a tap
 * outside slides it down to close it (#388) — none while `busy`, saving or
 * removing.
 */
export function Sheet({ label, heading, centerHeading = false, busy = false, onClose, dismissRef, children, ...data }: {
  /** Names the dialog. */
  label: string
  heading: ReactNode
  /** Across the middle, over a sheet laid out down its middle (#411). */
  centerHeading?: boolean
  busy?: boolean
  onClose: () => void
  /** The way to slide it down, for what it's in (#388). */
  dismissRef?: MutableRefObject<Dismiss | null>
  children: ReactNode
} & { [data: `data-${string}`]: boolean }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const ownDismiss = useRef<Dismiss | null>(null)
  const dismiss = dismissRef ?? ownDismiss
  useSheetKeys(closeRef, () => { if (!busy) dismiss.current?.() })

  return (
    <BottomSheet label={label} busy={busy} onClose={onClose} dismissRef={dismiss} className="flex max-h-[92dvh] flex-col overflow-y-auto px-4 [&>*]:shrink-0" {...data}>
      <SheetHeading heading={heading} centerHeading={centerHeading} busy={busy} closeRef={closeRef} onClose={() => dismiss.current?.()} />
      {children}
    </BottomSheet>
  )
}

/**
 * Focus on its ✕ once a sheet opens, and back where it was once it's gone;
 * Escape does `onEscape`.
 */
function useSheetKeys(closeRef: RefObject<HTMLButtonElement | null>, onEscape: () => void) {
  const latest = useRef(onEscape)
  latest.current = onEscape
  // Once, when the sheet opens — not on every render, which would pull
  // focus out of a text box mid-typing (and close the iPhone keyboard).
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const dialog = closeRef.current?.closest('[role="dialog"]')
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') latest.current() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      // Back where it was — unless it's moved on: into a page that's come
      // up as this went down (#388), whose text box keeps it.
      const now = document.activeElement
      if (!now || now === document.body || dialog?.contains(now)) previousFocus?.focus?.()
    }
  }, [])
}

/** A sheet's heading, with its ✕ — which it's dragged down by too. */
function SheetHeading({ heading, centerHeading, busy, closeRef, onClose }: {
  heading: ReactNode
  centerHeading: boolean
  busy: boolean
  closeRef: RefObject<HTMLButtonElement | null>
  onClose: () => void
}) {
  return (
    <div
      className={centerHeading
        ? 'grid grid-cols-[2rem_minmax(0,1fr)_2rem] items-center gap-3 pt-1'
        : 'flex items-start justify-between gap-3 pt-1'}
      data-sheet-grab
    >
      {/* As wide as ✕, so the heading is in the middle of the sheet. */}
      {centerHeading && <span aria-hidden="true" />}
      <div className={centerHeading ? 'min-w-0 text-center' : 'min-w-0'}>{heading}</div>
      <button
        ref={closeRef}
        onClick={onClose}
        disabled={busy}
        aria-label="Close"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
      >
        <X size={16} strokeWidth={2.5} />
      </button>
    </div>
  )
}

/** A page pushed over what's in a PagedSheet (#445). */
export interface SheetPage {
  /** Names the sheet while it's in. */
  label: string
  /** False slides it back out to the right; `onExited` once it's out. */
  open: boolean
  onExited: () => void
  /** Its Cancel: what Escape and a drag down do too. */
  onBack: () => void
  /** Its toolbar (PageHeader) and what's under it. */
  children: ReactNode
}

// Where a sheet grown into a page sheet stops, as PushPage's sheet does:
// its handle, then the page pushed in it, to the bottom of the screen.
const PAGE_HEIGHT = `calc(100dvh - ${SHEET_TOP} - ${HANDLE_PX}px)`

function spring(property: string) {
  return property.split(', ').map(p => `${p} ${IOS_SPRING_MS}ms ${IOS_SPRING_EASING}`).join(', ')
}

/**
 * A sheet whose rows each open a page in it (#445), as iOS pushes a page
 * in a navigation stack in a sheet: the sheet grows up into a page sheet
 * as the page slides in from the right over what's in it, which slides a
 * little way left; what's under the sheet shrinks back into a card. Its
 * Cancel, Escape or a drag down slides the page back out to the right and
 * shrinks the sheet back down around what's in it. With no `children`,
 * it's only ever the page: opened as one, and closed with its Cancel.
 */
export function PagedSheet({ label, heading, busy = false, onClose, dismissRef, page, children, ...data }: {
  /** Names the dialog, with no page in. */
  label: string
  heading: ReactNode
  busy?: boolean
  onClose: () => void
  dismissRef?: MutableRefObject<Dismiss | null>
  page: SheetPage | null
  children?: ReactNode
} & { [data: `data-${string}`]: boolean }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const ownDismiss = useRef<Dismiss | null>(null)
  const dismiss = dismissRef ?? ownDismiss
  const hasMenu = children !== undefined && children !== null
  // In place over what's in the sheet: from the frame it starts sliding in
  // to the frame it starts sliding out. Opened as a page, it's there from
  // the start.
  const [pageIn, setPageIn] = useState(() => !!page?.open)
  const open = !!page?.open
  useEffect(() => {
    if (!open) {
      setPageIn(false)
      return
    }
    // From off to the right, once that's been painted.
    const id = requestAnimationFrame(() => setPageIn(true))
    return () => cancelAnimationFrame(id)
  }, [open])
  // Out once slid out — or soon after, should its slide's end not be heard.
  const exited = useRef(page?.onExited)
  exited.current = page?.onExited
  const shown = !!page
  useEffect(() => {
    if (!shown || open) return
    const id = setTimeout(() => exited.current?.(), IOS_SPRING_MS + 100)
    return () => clearTimeout(id)
  }, [shown, open])

  useSheetKeys(closeRef, () => {
    if (busy) return
    if (page?.open && hasMenu) page.onBack()
    else dismiss.current?.()
  })

  // As tall as what's in it — or, with a page in, a page sheet.
  const menu = useRef<HTMLDivElement>(null)
  const [menuHeight, setMenuHeight] = useState<number | null>(null)
  useLayoutEffect(() => {
    const el = menu.current
    if (!el) return
    const measure = () => setMenuHeight(el.scrollHeight)
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const watch = new ResizeObserver(measure)
    watch.observe(el.firstElementChild ?? el)
    return () => watch.disconnect()
  }, [hasMenu])
  const grown = pageIn || !hasMenu
  useRecedeUnder(shown || !hasMenu, grown)

  return (
    <BottomSheet
      label={page?.open ? page.label : label}
      busy={busy}
      onClose={onClose}
      dismissRef={dismiss}
      back={page?.open && hasMenu ? page.onBack : undefined}
      tapToClose={!page}
      receded={grown}
      bare
      className="flex flex-col"
      {...data}
    >
      <div
        className="relative overflow-hidden"
        style={{
          height: grown ? PAGE_HEIGHT : menuHeight === null ? undefined : `min(${menuHeight}px, ${PAGE_HEIGHT})`,
          transition: menuHeight === null ? undefined : spring('height'),
        }}
      >
        {hasMenu && (
          <div
            ref={menu}
            // Under the page once it's in: gone to a screen reader, and to taps.
            aria-hidden={!!page || undefined}
            inert={!!page || undefined}
            className={`absolute inset-x-0 top-0 max-h-full overflow-y-auto overscroll-contain px-4 ${SHEET_BOTTOM}`}
            style={{ transform: pageIn ? COVERED_SHIFT : 'translateX(0)', transition: spring('transform') }}
          >
            <div>
              <SheetHeading heading={heading} centerHeading={false} busy={busy} closeRef={closeRef} onClose={() => dismiss.current?.()} />
              {children}
            </div>
          </div>
        )}
        {hasMenu && (
          // Darkens what's in the sheet as the page covers it.
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-black"
            style={{ opacity: pageIn ? COVERED_DIM : 0, transition: spring('opacity') }}
          />
        )}
        {page && (
          <div
            // On its way out once closed: gone to a screen reader, and to taps.
            aria-hidden={!page.open || undefined}
            inert={!page.open || undefined}
            className="absolute inset-0 overflow-y-auto overscroll-contain bg-white"
            style={{
              transform: pageIn ? 'translateX(0)' : 'translateX(100%)',
              transition: spring('transform'),
              boxShadow: '-8px 0 32px -8px rgba(0, 0, 0, 0.18)',
            }}
            onTransitionEnd={e => {
              if (e.target === e.currentTarget && e.propertyName === 'transform' && !page.open) page.onExited()
            }}
            data-sheet-page
          >
            {page.children}
          </div>
        )}
      </div>
    </BottomSheet>
  )
}
