import type { ReactNode } from 'react'
import { CalendarDays, ClipboardCheck, Smartphone, Timer, UserRound } from 'lucide-react'
import { GarageIcon } from './CarIcons'
import { SheetCloseLink } from './SheetCloseLink'

/** The About page's hash (#455). */
export const ABOUT_HASH = '#/about'

/** An icon a feature leads with: a Lucide icon, or a car icon (#417) that takes its props. */
type FeatureIcon = (props: { size?: number; strokeWidth?: number; 'aria-hidden'?: 'true' }) => ReactNode

// What the app does, a group of features at a time, each headed by what it's
// for — as an App Store page lists an app's features (#455), but plainly:
// it's to say what's here, not to sell it.
const FEATURES: readonly {
  id: string
  Icon: FeatureIcon
  name: string
  title: string
  signIn?: boolean
  points: readonly string[]
}[] = [
  {
    id: 'events',
    Icon: CalendarDays,
    name: 'Events',
    title: 'Know what’s on track now',
    points: [
      'Each event’s schedule, with a line at the time it is now and a countdown to what’s next.',
      'Pick your run group and your sessions stand out; badges show who’s on track and who’s in class.',
      'Each event’s dates, organizer, track map and the weather at the track.',
      'Upcoming events as a list or a calendar. Say which ones you’re going to, and share one with a link or a code to scan.',
    ],
  },
  {
    id: 'laps',
    Icon: Timer,
    name: 'Lap times',
    title: 'Log your laps after each session',
    signIn: true,
    points: [
      'Tap a session and paste its times: a list, rows from a timing sheet, or timestamps from your video.',
      'Each session’s best and average, and your all-time best on that layout.',
      'The Tracks tab lists the layouts you’ve driven, with a chart of your laps there from event to event.',
    ],
  },
  {
    id: 'evaluations',
    Icon: ClipboardCheck,
    name: 'Instructor evaluations',
    title: 'Keep what your instructor said',
    signIn: true,
    points: [
      'Notes on each session, and on the event as a whole.',
      'On The Drivers Edge (TDE) events, their report card: a score for each skill, and the run group they recommend.',
      'More → Instructor evaluations has every event’s together, with the skills that have improved most and those that need work.',
    ],
  },
  {
    id: 'garage',
    Icon: GarageIcon,
    name: 'Garage',
    title: 'Keep a record of your car',
    signIn: true,
    points: [
      'Your cars, with a dated log of tires, pads, rotors and fluids.',
      'Which car you brought to each event, and what was on it then.',
      'Tire pressures before and after each session.',
      'Share a car with someone else who drives it, so you both keep it up to date.',
    ],
  },
  {
    id: 'iphone',
    Icon: Smartphone,
    name: 'On your iPhone',
    title: 'Check it between runs',
    points: [
      'In Safari, Share → Add to Home Screen opens it full screen, as an app.',
      'The iOS widget shows the day’s schedule on your Home Screen, and alerts you before your sessions. More → iOS widget sets it up.',
    ],
  },
]

function Feature({ id, Icon, name, title, signIn, points }: (typeof FEATURES)[number]) {
  return (
    <section aria-labelledby={`about-${id}`} className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-gray-900 text-white">
          <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <h2 id={`about-${id}`} className="font-rubik text-xs font-semibold uppercase tracking-wider text-gray-500">{name}</h2>
            {signIn && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
                <UserRound size={11} strokeWidth={2.25} aria-hidden="true" />
                Signed in
              </span>
            )}
          </div>
          <p className="font-rubik text-[17px] font-semibold leading-snug text-gray-900">{title}</p>
        </div>
      </div>
      <ul className="space-y-2 text-[15px] leading-snug text-gray-600">
        {points.map(point => (
          <li key={point} className="flex gap-2.5">
            <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-gray-400" aria-hidden="true" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/**
 * About (#455): what the app is for, then its features a group at a time.
 * A page sheet closed with ✕, as the iOS widget page beside it on the More
 * tab is (#415). `closeHref`: where ✕ goes — the tab it was opened from;
 * `onClose`, how (back to it, #429).
 */
export function AboutPage({ closeHref = '#/', onClose }: { closeHref?: string; onClose?: () => void } = {}) {
  return (
    // As tall as the sheet it's on, at least (#415).
    <div className="min-h-full bg-gray-50">
      <div className="mx-auto max-w-lg px-4 pt-4 sm:pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h1 className="text-lg font-semibold text-gray-900">About</h1>
          <SheetCloseLink href={closeHref} onClose={onClose} />
        </div>

        <div className="mb-6 flex items-center gap-3.5">
          <img src="/apple-touch-icon.png" alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-[13px] border border-gray-200" />
          <div className="min-w-0">
            <p className="font-rubik text-xl font-bold leading-tight text-gray-900">HPDE Events</p>
            <p className="text-[15px] text-gray-500">Track days, from the schedule to your lap times</p>
          </div>
        </div>

        <div className="mb-6 space-y-3 text-[15px] leading-relaxed text-gray-700">
          <p>
            For drivers at HPDE (high performance driver education) track days. It shows each event’s
            schedule as the day goes, so you can see what’s next at a glance between runs.
          </p>
          <p>
            Sign in with Google and it also keeps your own record of every event: your lap times, what
            your instructor said, and your car. Only you and the site’s admins can see it. The schedules
            are open to everyone, with no account needed.
          </p>
        </div>

        <div className="space-y-3">
          {FEATURES.map(feature => <Feature key={feature.id} {...feature} />)}
        </div>
      </div>
    </div>
  )
}
