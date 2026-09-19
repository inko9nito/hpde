import { useEffect, useRef, useState } from 'react'
import { Calendar, ChevronLeft, ExternalLink, Image as ImageIcon, Link2, MapPin, Route, Users, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { formatDateRangeWithWeekday } from '../utils/time'
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

// Mirrors UIKit's interactive pop gesture: dismiss once the panel has
// crossed ~1/3 of its own width, or on a fast enough flick regardless
// of distance (px/ms, matching UIScreenEdgePanGestureRecognizer feel).
const DISMISS_DISTANCE_RATIO = 0.35
const DISMISS_VELOCITY = 0.5

function linkDisplay(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

// "Clockwise" -> "CW (clockwise)", "Counter-clockwise" -> "CCW (counter-clockwise)".
// Anything else is passed through as-is.
function abbreviateDirection(direction: string): string {
  const normalized = direction.trim().toLowerCase()
  if (normalized === 'clockwise') return 'CW (clockwise)'
  if (normalized === 'counter-clockwise' || normalized === 'counterclockwise') return 'CCW (counter-clockwise)'
  return direction
}

/** "Track configuration" row value, e.g. "1.7 CW (clockwise)" */
function formatTrackConfiguration(configuration?: string, direction?: string): string {
  return [configuration, direction && abbreviateDirection(direction)].filter(Boolean).join(' ')
}

interface RowProps { icon: LucideIcon; label: string; subtitle?: string; children: React.ReactNode }
function Row({ icon: Icon, label, subtitle, children }: RowProps) {
  return (
    <div className="grid grid-cols-[124px_1fr] items-center gap-3 border-b border-gray-100 py-3 last:border-b-0">
      <span className="flex items-center gap-3 text-[13px] font-medium text-gray-500">
        <Icon size={14} className="shrink-0 text-gray-400" />
        {label}
      </span>
      <span className="text-sm text-gray-900 tabular-nums break-words">
        {children}
        {subtitle && (
          <span className="mt-0.5 block text-xs font-normal text-gray-400">{subtitle}</span>
        )}
      </span>
    </div>
  )
}

export function EventDetailsDrawer({ event, open, onClose }: Props) {
  const drawerRef = useRef<HTMLDivElement>(null)
  // Horizontal offset (px, right = positive) the panel is dragged by,
  // rendered on top of the open/closed transform while a swipe is live
  // or its release animation is still playing.
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isSettling, setIsSettling] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Reset drag state whenever the drawer opens or closes by any means
  // (button, backdrop, Escape, or the swipe itself), so the next open
  // starts clean.
  useEffect(() => {
    setDragX(0)
    setIsDragging(false)
    setIsSettling(false)
  }, [open])

  // Swipe-right-to-dismiss, mimicking iOS's interactive pop gesture.
  // Listeners are attached directly to the panel element (not
  // `document`) so this never competes with PullToRefresh's global
  // touch handlers.
  useEffect(() => {
    if (!open) return
    const el = drawerRef.current
    if (!el) return

    let gesture: {
      startX: number
      startY: number
      lastX: number
      lastT: number
      velocity: number
      dx: number
      active: boolean
      width: number
    } | null = null

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      gesture = {
        startX: touch.clientX,
        startY: touch.clientY,
        lastX: touch.clientX,
        lastT: e.timeStamp,
        velocity: 0,
        dx: 0,
        active: false,
        width: el.getBoundingClientRect().width,
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!gesture) return
      const touch = e.touches[0]
      const dx = touch.clientX - gesture.startX
      const dy = touch.clientY - gesture.startY

      if (!gesture.active) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
        // Only a clearly-horizontal, rightward drag is ours; anything
        // more vertical (or leftward) is left alone for normal scroll.
        if (dx <= 0 || Math.abs(dy) >= Math.abs(dx)) {
          gesture = null
          return
        }
        gesture.active = true
        setIsDragging(true)
      }

      e.preventDefault()
      const dt = e.timeStamp - gesture.lastT
      if (dt > 0) gesture.velocity = (touch.clientX - gesture.lastX) / dt
      gesture.lastX = touch.clientX
      gesture.lastT = e.timeStamp
      gesture.dx = Math.min(Math.max(dx, 0), gesture.width)
      setDragX(gesture.dx)
    }

    const onTouchEnd = () => {
      if (!gesture || !gesture.active) {
        gesture = null
        return
      }
      const { dx, velocity, width } = gesture
      const shouldDismiss = dx > width * DISMISS_DISTANCE_RATIO || velocity > DISMISS_VELOCITY
      gesture = null
      setIsDragging(false)
      setIsSettling(true)
      if (shouldDismiss) {
        setDragX(width)
        window.setTimeout(onClose, PUSH_DURATION_MS)
      } else {
        setDragX(0)
      }
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd)
    el.addEventListener('touchcancel', onTouchEnd)
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    // Lock background scroll: without this, wheel/touch input over the
    // drawer bubbles past its (often non-scrolling) content and scrolls
    // the page behind it instead. `body` has no explicit height, so it's
    // `html` (left at its default `overflow: visible`) that actually
    // produces the viewport scrollbar — both need locking.
    const html = document.documentElement
    const previousHtmlOverflow = html.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    html.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      html.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
    }
  }, [open])

  const dates = formatDateRangeWithWeekday(event.days)
  const trackConfiguration = formatTrackConfiguration(event.configuration, event.direction)
  const hasScans = !!event.scheduleScans?.length
  const hasAny = dates || event.organizer || event.track
    || trackConfiguration || event.link || hasScans

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
        ref={drawerRef}
        role="dialog"
        aria-modal={open}
        aria-labelledby="event-details-title"
        inert={!open}
        className="fixed inset-y-0 right-0 z-50 flex w-full bg-white md:w-[480px] md:max-w-[60vw]"
        style={{
          transform: isDragging || isSettling
            ? `translate3d(${dragX}px,0,0)`
            : open ? 'translate3d(0,0,0)' : 'translate3d(100%,0,0)',
          transition: isDragging ? 'none' : `transform ${PUSH_DURATION_MS}ms ${PUSH_EASING}`,
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
            <>
              <div className="pl-1">
                {dates && <Row icon={Calendar} label="Dates">{dates}</Row>}
                {event.organizer && <Row icon={Users} label="Organizer">{event.organizer}</Row>}
                {event.track && (
                  <Row icon={MapPin} label="Location" subtitle={event.city}>{event.track}</Row>
                )}
                {trackConfiguration && (
                  <Row icon={Route} label="Track config">{trackConfiguration}</Row>
                )}
                {event.link && (
                  <Row icon={Link2} label="Event page">
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

              {hasScans && (
                <div className="mt-6 pl-1">
                  <h3 className="mb-2 flex items-center gap-3 text-[13px] font-medium text-gray-500">
                    <ImageIcon size={14} className="shrink-0 text-gray-400" />
                    Original schedule
                  </h3>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {event.scheduleScans!.map((src, i) => (
                      <a key={src} href={src} target="_blank" rel="noopener noreferrer">
                        <img
                          src={src}
                          alt={`Original schedule scan ${i + 1}`}
                          className="aspect-[3/4] w-full rounded-lg border border-gray-200 object-cover"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-400">No details for this event yet.</p>
          )}
        </div>
      </div>
    </>
  )
}
