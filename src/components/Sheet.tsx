import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useHtmlClass } from './PushPage'
import { useSheetGestures } from './sheetGestures'

/**
 * What every sheet from the bottom is built on: the dimmed page, and the
 * sheet over it with its handle — which drags it down to close it (#387)
 * — while the page behind it stays put (#432). A tap on the dimmed page
 * closes it, never while `busy`. `className` lays out what's in it.
 */
export function BottomSheet({ label, busy = false, onClose, className, children, ...data }: {
  /** Names the dialog. */
  label: string
  busy?: boolean
  onClose: () => void
  className: string
  children: ReactNode
} & { [data: `data-${string}`]: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const backdrop = useRef<HTMLDivElement>(null)
  useSheetGestures({ root, panel, backdrop, onClose, busy })
  // The page behind it doesn't scroll, with a mouse wheel either.
  useHtmlClass('bottom-sheet-open', true)

  return createPortal(
    <div ref={root} className="fixed inset-0 z-50 flex items-end justify-center" {...data}>
      <div ref={backdrop} className="absolute inset-0 touch-none bg-black/40" onClick={busy ? undefined : onClose} aria-hidden="true" />
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
 * with a close button, over whatever goes in it. Escape or a tap outside
 * closes it — neither while `busy`, saving or removing.
 */
export function Sheet({ label, heading, centerHeading = false, busy = false, onClose, children, ...data }: {
  /** Names the dialog. */
  label: string
  heading: ReactNode
  /** Across the middle, over a sheet laid out down its middle (#411). */
  centerHeading?: boolean
  busy?: boolean
  onClose: () => void
  children: ReactNode
} & { [data: `data-${string}`]: boolean }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  // Once, when the sheet opens — not on every render, which would pull
  // focus out of a text box mid-typing (and close the iPhone keyboard).
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onCloseRef.current() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      previousFocus?.focus?.()
    }
  }, [])

  return (
    <BottomSheet label={label} busy={busy} onClose={onClose} className="flex max-h-[92dvh] flex-col overflow-y-auto px-4 [&>*]:shrink-0" {...data}>
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
      {children}
    </BottomSheet>
  )
}
