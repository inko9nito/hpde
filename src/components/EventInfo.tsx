import { useState } from 'react'
import { Calendar, ExternalLink, Image as ImageIcon, Link2, Map, MapPin, Maximize2, Route, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { MapViewer } from './MapViewer'
import { formatDateRangeWithWeekday } from '../utils/time'
import type { EventConfig } from '../types'

interface Props {
  event: EventConfig
}

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

export function EventInfo({ event }: Props) {
  const [mapExpanded, setMapExpanded] = useState(false)

  const dates = formatDateRangeWithWeekday(event.days)
  const trackConfiguration = formatTrackConfiguration(event.configuration, event.direction)
  const hasScans = !!event.scheduleScans?.length
  const hasAny = dates || event.organizer || event.track
    || trackConfiguration || event.link || hasScans || event.mapImage

  if (!hasAny) {
    return <p className="text-sm text-gray-400">No details for this event yet.</p>
  }

  return (
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

      {event.mapImage && (
        <div className="mt-6 pl-1">
          <h3 className="mb-2 flex items-center gap-3 text-[13px] font-medium text-gray-500">
            <Map size={14} className="shrink-0 text-gray-400" />
            Track map
          </h3>
          <button
            type="button"
            onClick={() => setMapExpanded(true)}
            aria-label="Expand track map"
            className="group relative block w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            <img
              src={event.mapImage}
              alt={`${event.name} track map`}
              className="block w-full h-auto"
            />
            <span className="absolute right-2 top-2 inline-grid h-8 w-8 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors group-hover:bg-black/70">
              <Maximize2 size={16} />
            </span>
          </button>
        </div>
      )}

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

      {mapExpanded && event.mapImage && (
        <MapViewer
          src={event.mapImage}
          alt={`${event.name} track map`}
          onClose={() => setMapExpanded(false)}
        />
      )}
    </>
  )
}
