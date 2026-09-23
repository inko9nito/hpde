import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

export interface ToastMessage {
  // New id per toast, so the same text twice still restarts the timer.
  id: number
  text: string
}

interface Props {
  toast: ToastMessage | null
  onDone: () => void
  durationMs?: number
}

/**
 * Brief confirmation pill at the bottom of the screen (e.g. "Event
 * created"), announced to screen readers, gone after a few seconds.
 */
export function Toast({ toast, onDone, durationMs = 3000 }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!toast) return
    setVisible(true)
    const hide = setTimeout(() => setVisible(false), durationMs)
    // Unmount after the fade-out transition.
    const done = setTimeout(onDone, durationMs + 200)
    return () => {
      clearTimeout(hide)
      clearTimeout(done)
    }
  }, [toast?.id])

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
    >
      {toast && (
        <div
          className={`flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-200 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
          <CheckCircle2 size={16} className="shrink-0 text-green-400" aria-hidden="true" />
          <span className="min-w-0 truncate">{toast.text}</span>
        </div>
      )}
    </div>
  )
}
