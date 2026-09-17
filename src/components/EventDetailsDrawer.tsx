import { useEffect } from 'react'
import { ChevronLeft, ExternalLink, X } from 'lucide-react'
import { formatDateRange } from '../utils/time'
import type { EventConfig } from '../types'

interface Props {
  event: EventConfig
  open: boolean
  onClose: () => void
}

// iOS UIKit's default view-controller push: 350ms with the "spring standard"
// easing curve. Same values in the design mock.
const PUSH_DURATION_MS = 350
const PUSH_EASING = 'cubic-bezier(0.32, 0.72, 0, 1)'

function linkDisplay(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

interface RowProps { label: string; children: React.ReactNode }
function Row({ label, children }: RowProps) {
  return (
    <div className="grid grid-cols-[96px_1fr] items-baseline gap-3 border-b border-gray-100 py-3 last:border-b-0">
      <span className="text-[13px] font-medium text-gray-500">{label}</span>
      <span className="text-sm text-gray-900 tabular-nums break-words">{children}</span>
    </div>
  )
}

export function EventDetailsDrawer({ event, open, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const dates = formatDateRange(event.days)
  const hasAny = dates || event.organizer || event.track
    || event.configuration || event.direction || event.link

  return (
    <>
      <div
        aria-hidden="true"
        inert={!open}
        onClick={onClose}
        className="fixed inset-0 z-40"
        style={{ pointerEvents: open ? 'auto' : 'none' }}
      />
      <div
        role="dialog"
        aria-modal={open}
        aria-labelledby="event-details-title"
        inert={!open}
        className="fixed inset-y-0 right-0 z-50 flex w-full bg-gray-50 md:w-[480px] md:max-w-[60vw]"
        style={{
          transform: open ? 'translate3d(0,0,0)' : 'translate3d(100%,0,0)',
          transition: `transform ${PUSH_DURATION_MS}ms ${PUSH_EASING}`,
          boxShadow: open ? '-8px 0 24px rgba(0,0,0,0.08)' : 'none',
          willChange: 'transform',
        }}
      >
        <div className="mx-auto w-full max-w-lg px-3 py-4 sm:px-4 sm:py-6 overflow-y-auto md:mx-0 md:max-w-none">
          <div className="mb-5 flex items-start gap-2 md:justify-between md:gap-4">
            <button
              onClick={onClose}
              aria-label="Back"
              className="inline-grid h-9 w-9 shrink-0 -ml-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden"
            >
              <ChevronLeft size={20} />
            </button>
            <h2
              id="event-details-title"
              className="min-w-0 truncate pl-1 pt-1 text-xl font-bold text-gray-900 leading-tight"
            >
              Event details
            </h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="hidden h-9 w-9 shrink-0 -mr-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:inline-grid"
            >
              <X size={20} />
            </button>
          </div>

          {hasAny ? (
            <div className="rounded-xl border border-gray-200 bg-white px-3.5 py-1 shadow-sm">
              {dates && <Row label="Dates">{dates}</Row>}
              {event.organizer && <Row label="Organizer">{event.organizer}</Row>}
              {event.track && <Row label="Track">{event.track}</Row>}
              {event.configuration && <Row label="Config">{event.configuration}</Row>}
              {event.direction && <Row label="Direction">{event.direction}</Row>}
              {event.link && (
                <Row label="Event page">
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-blue-500 hover:underline"
                  >
                    {linkDisplay(event.link)}
                    <ExternalLink size={12} className="text-gray-400" />
                  </a>
                </Row>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No details for this event yet.</p>
          )}
        </div>
      </div>
    </>
  )
}
