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
