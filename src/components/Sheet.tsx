import { useEffect, useRef } from 'react'
import type { MutableRefObject, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useHtmlClass } from './PushPage'
import { SETTLE_EASE, SETTLE_MS, useSheetGestures } from './sheetGestures'

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
export function BottomSheet({ label, busy = false, onClose, className, dismissRef, children, ...data }: {
  /** Names the dialog. */
  label: string
  busy?: boolean
  onClose: () => void
  className: string
  dismissRef?: MutableRefObject<Dismiss | null>
  children: ReactNode
} & { [data: `data-${string}`]: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const backdrop = useRef<HTMLDivElement>(null)
  useSheetGestures({ root, panel, backdrop, onClose, busy })
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
      <div ref={backdrop} className="absolute inset-0 touch-none bg-black/40" onClick={busy ? undefined : () => dismiss()} aria-hidden="true" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`sheet-up relative w-full max-w-lg overscroll-contain rounded-t-2xl bg-white pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl ${className}`}
      >
        {/* The handle: a taller strip than the pill shows, for a thumb. */}
        <div className="flex h-5 shrink-0 items-center justify-center" data-sheet-handle data-sheet-grab aria-hidden="true">
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

  // Once, when the sheet opens — not on every render, which would pull
  // focus out of a text box mid-typing (and close the iPhone keyboard).
  const busyRef = useRef(busy)
  busyRef.current = busy
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const dialog = closeRef.current?.closest('[role="dialog"]')
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !busyRef.current) dismiss.current?.() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      // Back where it was — unless it's moved on: into a page that's come
      // up as this went down (#388), whose text box keeps it.
      const now = document.activeElement
      if (!now || now === document.body || dialog?.contains(now)) previousFocus?.focus?.()
    }
  }, [])

  return (
    <BottomSheet label={label} busy={busy} onClose={onClose} dismissRef={dismiss} className="flex max-h-[92dvh] flex-col overflow-y-auto px-4 [&>*]:shrink-0" {...data}>
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
          onClick={() => dismiss.current?.()}
          disabled={busy}
          aria-label="Close"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>
      {children}
    </BottomSheet>
  )
}
