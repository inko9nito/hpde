import { X } from 'lucide-react'
import { ICON_BUTTON } from './iconButton'

/**
 * Title bar of the admin pages — New event, Edit details, Edit schedule
 * (#232): the page's name, the event's underneath, and ✕ to leave.
 */
export function PageHeader({ title, subtitle, onClose }: { title: string; subtitle?: string; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-1 pb-3">
      <div className="min-w-0">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="truncate text-sm text-gray-500">{subtitle}</p>}
      </div>
      <button onClick={onClose} aria-label="Close" className={`-mr-2 ${ICON_BUTTON}`}>
        <X size={20} />
      </button>
    </div>
  )
}
