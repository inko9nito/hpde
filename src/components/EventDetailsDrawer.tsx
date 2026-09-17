import { useEffect, useRef } from 'react'
import { ChevronLeft, ExternalLink } from 'lucide-react'
import type { EventConfig, DaySchedule } from '../types'

interface Props {
  event: EventConfig
  open: boolean
  onClose: () => void
}

// iOS UIKit's default view-controller push: 350ms with the "spring standard"
// easing curve. Same values in the design mock.
const PUSH_DURATION_MS = 350
const PUSH_EASING = 'cubic-bezier(0.32, 0.72, 0, 1)'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function formatDateRange(days: DaySchedule[]): string {
  if (days.length === 0) return ''
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date))
  const first = sorted[0].date
  const last = sorted[sorted.length - 1].date
  const [fy, fm, fd] = first.split('-').map(Number)
  const [ly, lm, ld] = last.split('-').map(Number)
  if (first === last) return `${MONTHS[fm - 1]} ${fd}, ${fy}`
  if (fy === ly && fm === lm) return `${MONTHS[fm - 1]} ${fd}–${ld}, ${fy}`
  if (fy === ly) return `${MONTHS[fm - 1]} ${fd} – ${MONTHS[lm - 1]} ${ld}, ${fy}`
  return `${MONTHS[fm - 1]} ${fd}, ${fy} – ${MONTHS[lm - 1]} ${ld}, ${ly}`
}

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
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    // Move focus to the back button so keyboard users can dismiss immediately.
    closeBtnRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const dates = formatDateRange(event.days)
  const hasAny = dates || event.organizer || event.track
    || event.configuration || event.direction || event.link

  return (
    <div
      role="dialog"
      aria-modal={open}
      aria-labelledby="event-details-title"
      inert={!open}
      className="fixed inset-0 z-50 flex justify-center bg-gray-50"
      style={{
        transform: open ? 'translate3d(0,0,0)' : 'translate3d(100%,0,0)',
        transition: `transform ${PUSH_DURATION_MS}ms ${PUSH_EASING}`,
        boxShadow: open ? '-8px 0 24px rgba(0,0,0,0.08)' : 'none',
        willChange: 'transform',
      }}
    >
      <div className="mx-auto w-full max-w-lg px-3 py-4 sm:px-4 sm:py-6 overflow-y-auto">
        <div className="mb-5 flex items-start gap-2">
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Back"
            className="inline-grid h-9 w-9 shrink-0 -ml-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <ChevronLeft size={20} />
          </button>
          <h2
            id="event-details-title"
            className="min-w-0 truncate pl-1 pt-1 text-xl font-bold text-gray-900 leading-tight"
          >
            Event details
          </h2>
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
  )
}
