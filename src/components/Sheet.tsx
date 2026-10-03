import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { MutableRefObject, ReactNode, RefObject } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { SHEET_TOP, useHtmlClass, useRecedeUnder } from './PushPage'
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
      // Still dimming, it brightens from where it's got to.
      dim.style.opacity = getComputedStyle(dim).opacity
      dim.getAnimations?.().forEach(a => a.cancel())
      void dim.offsetHeight
      dim.style.transition = `opacity ${ease}`
      dim.style.opacity = '0'
    }
    timer.current = setTimeout(done, SETTLE_MS)
  }
  if (dismissRef) dismissRef.current = dismiss
  // The page dims behind it as it rises, not all at once (#445).
  useLayoutEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    backdrop.current?.animate?.([{ opacity: 0 }, { opacity: 1 }], { duration: SETTLE_MS, easing: SETTLE_EASE })
  }, [])
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

/** A page shown in a PagedSheet in place of what's in it (#445). */
export interface SheetPage {
  /** Names the sheet while it's up. */
  label: string
  /** False fades it out, and the sheet back down around what's in it; `onExited` once that's back. */
  open: boolean
  onExited: () => void
  /** Its Cancel: what Escape and a drag down do too. */
  onBack: () => void
  /** Its toolbar (PageHeader) and what's under it. */
  children: ReactNode
}

// Where a sheet grown into a page sheet stops, as PushPage's sheet does:
// its handle, then the page in it, to the bottom of the screen.
const PAGE_HEIGHT = `calc(100dvh - ${SHEET_TOP} - ${HANDLE_PX}px)`
/** How long what's in the sheet takes to fade out, or in. */
export const FADE_MS = 150
/** How long the sheet takes to grow (or shrink), before what's next fades in. */
export const RESIZE_MS = 350
// Quick off the mark and settling gently, as iOS's sheets resize — and
// done when it's done, unlike its spring's long tail, so nothing fades in
// while it's still moving.
const RESIZE_EASE = 'cubic-bezier(0.32, 0.72, 0, 1)'

// Where a PagedSheet's got to: what's in it, fading out, the sheet growing
// with nothing in it, then the page; and the same back.
type Stage = 'list' | 'list out' | 'growing' | 'page' | 'page out' | 'shrinking'

/**
 * A sheet whose rows each open a page in it (#445): what's in it fades out,
 * the sheet grows up into a page sheet — what's under it shrinking back
 * into a card — and the page fades in. Its Cancel, Escape or a drag down
 * fades the page out, shrinks the sheet back down, and fades what was in
 * it back in. With no `children`, it's only ever the page: opened as one,
 * and closed with its Cancel.
 */
export function PagedSheet({ label, heading, busy = false, onClose, dismissRef, page, children, ...data }: {
  /** Names the dialog, with no page up. */
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
  const open = !!page?.open
  // Opened as a page, it's there from the start.
  const [stage, setStage] = useState<Stage>(() => (open ? 'page' : 'list'))
  const exited = useRef(page?.onExited)
  exited.current = page?.onExited
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      if (open) return
    }
    if (!open && stage === 'list') return
    // One step after another, each once the last has had its time.
    const steps: [Stage, number][] = open
      ? [['list out', 0], ['growing', FADE_MS], ['page', FADE_MS + RESIZE_MS]]
      : [['page out', 0], ['shrinking', FADE_MS], ['list', FADE_MS + RESIZE_MS]]
    const ids = steps.map(([next, at]) => setTimeout(() => {
      setStage(next)
      if (next === 'list') exited.current?.()
    }, at))
    return () => ids.forEach(clearTimeout)
  }, [open])

  useSheetKeys(closeRef, () => {
    if (busy) return
    if (page?.open && hasMenu) page.onBack()
    else dismiss.current?.()
  })

  // As tall as what's in it — or, with a page up, a page sheet.
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
  const grown = !hasMenu || stage === 'growing' || stage === 'page' || stage === 'page out'
  useRecedeUnder(!!page || !hasMenu, grown)
  const listShown = stage === 'list'
  const pageShown = stage === 'page'
  const fade = `opacity ${FADE_MS}ms ease`

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
          transition: menuHeight === null ? undefined : `height ${RESIZE_MS}ms ${RESIZE_EASE}`,
        }}
      >
        {hasMenu && (
          <div
            ref={menu}
            // Faded out: gone to a screen reader, and to taps.
            aria-hidden={!listShown || undefined}
            inert={!listShown || undefined}
            className={`absolute inset-x-0 top-0 max-h-full overflow-y-auto overscroll-contain px-4 ${SHEET_BOTTOM}`}
            style={{ opacity: listShown ? 1 : 0, transition: fade }}
            data-sheet-list
          >
            <div>
              <SheetHeading heading={heading} centerHeading={false} busy={busy} closeRef={closeRef} onClose={() => dismiss.current?.()} />
              {children}
            </div>
          </div>
        )}
        {page && (
          <div
            aria-hidden={!pageShown || undefined}
            inert={!pageShown || undefined}
            className="absolute inset-0 overflow-y-auto overscroll-contain bg-white"
            style={{ opacity: pageShown ? 1 : 0, transition: fade, visibility: stage === 'shrinking' ? 'hidden' : undefined }}
            data-sheet-page
          >
            {page.children}
          </div>
        )}
      </div>
    </BottomSheet>
  )
}
