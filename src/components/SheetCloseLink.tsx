import { X } from 'lucide-react'

/**
 * A page sheet's ✕, as on iOS (#415): a gray circle. `href`: where it goes
 * — the tab the sheet was opened from; `onClose`, how (back to it, #429).
 */
export function SheetCloseLink({ href, onClose }: { href: string; onClose?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClose && (e => {
        e.preventDefault()
        onClose()
      })}
      aria-label="Close"
      className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gray-200/70 text-gray-600 transition-colors hover:bg-gray-200"
    >
      <X size={16} strokeWidth={2.5} />
    </a>
  )
}

/**
 * A page sheet's title across its middle, as the Share sheet has its own
 * (#411), and its ✕ (SheetCloseLink) at the right.
 */
export function SheetTitle({ title, href, onClose, className = '' }: { title: string; href: string; onClose?: () => void; className?: string }) {
  return (
    <div className={`grid grid-cols-[2rem_minmax(0,1fr)_2rem] items-center gap-3 ${className}`}>
      {/* As wide as ✕, so the title is in the middle of the sheet. */}
      <span aria-hidden="true" />
      <h1 className="truncate text-center text-lg font-semibold text-gray-900">{title}</h1>
      <SheetCloseLink href={href} onClose={onClose} />
    </div>
  )
}
