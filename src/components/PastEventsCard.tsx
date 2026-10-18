import { ChevronRight } from 'lucide-react'
import { CARD_FRAME } from './EventCard'
import { LayoutTile } from './TrackPage'
import { plural } from './LapSessions'
import { formatLapTime } from '../utils/lapTimes'
import { opensElsewhere } from '../utils/links'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** What an event's past events at its layout come to (#462). */
export interface PastEventsHere {
  /** The layout, short: "3.1 CCW" — or its track's name, with no layout. */
  layout: string
  trackId?: string
  direction?: 'cw' | 'ccw'
  /** How many: the events Instructor evaluations lists there. */
  count: number
  /** The newest one's first day, "YYYY-MM-DD". */
  last: string
  /** Their best lap on the layout. */
  best?: number
  /** Instructor evaluations, filtered to the layout. */
  href: string
  onOpen: () => void
}

/** "Nov 2025". */
function monthYear(iso: string): string {
  const [year, month] = iso.split('-').map(Number)
  return `${MONTHS[month - 1]} ${year}`
}

/**
 * Before an event, on its My notes (#462): one card for every past event
 * of theirs at its layout — how many, when they were last there and their
 * best lap there — that opens Instructor evaluations on that layout, to
 * read how they did. The layout's shape leads, as on the track page.
 */
export function PastEventsCard({ past }: { past: PastEventsHere }) {
  const title = `${plural(past.count, 'event', 'events')} at ${past.layout}`
  return (
    <a
      href={past.href}
      onClick={e => {
        if (opensElsewhere(e)) return
        e.preventDefault()
        past.onOpen()
      }}
      aria-label={`Your past events here: ${title}`}
      className={`${CARD_FRAME} flex items-stretch overflow-hidden transition-colors hover:border-gray-400`}
      data-past-events
    >
      <LayoutTile trackId={past.trackId} direction={past.direction} />
      <div className="flex min-w-0 flex-1 items-center gap-4 py-3 pl-4 pr-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-gray-500">Your past events here</p>
          <p className="mt-0.5 truncate font-rubik text-[15px] font-semibold leading-tight text-gray-900">{title}</p>
          <p className="mt-1 truncate text-sm text-gray-500">
            Last {monthYear(past.last)}
            {past.best !== undefined && <> · Best <span className="font-mono tabular-nums text-gray-700">{formatLapTime(past.best)}</span></>}
          </p>
        </div>
        <ChevronRight size={18} className="-ml-2 shrink-0 text-gray-300" aria-hidden="true" />
      </div>
    </a>
  )
}
