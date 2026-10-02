import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

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

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center" {...data}>
      <div className="absolute inset-0 bg-black/40" onClick={busy ? undefined : onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="sheet-up relative flex max-h-[92dvh] w-full max-w-lg flex-col overflow-y-auto [&>*]:shrink-0 overscroll-contain rounded-t-2xl bg-white px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl"
      >
        <div className="mx-auto mt-2 h-1 w-9 shrink-0 rounded-full bg-gray-300" aria-hidden="true" />
        <div className={centerHeading
          ? 'grid grid-cols-[2rem_minmax(0,1fr)_2rem] items-center gap-3 pt-3'
          : 'flex items-start justify-between gap-3 pt-3'}
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
      </div>
    </div>,
    document.body,
  )
}
