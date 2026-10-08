import type { ReactNode } from 'react'
import { ChevronRight, Lock, Timer } from 'lucide-react'
import { CarIcon } from './CarIcons'
import { GroupBadge } from './GroupBadge'
import { SheetCloseLink } from './SheetCloseLink'
import { TrackIcon } from './TrackIcon'
import widgetMedium from '../assets/widget-medium.png'
import notificationsImg from '../assets/notifications.png'
import type { RunGroupConfig } from '../types'

/** The About page's hash (#455). */
export const ABOUT_HASH = '#/about'

// About (#455) reads as an App Store page shows an app's features: a big
// plain headline for each, a sentence or two under it, and a glimpse of it
// in the app — not a list. It says what's here; it isn't selling it.

const RED: RunGroupConfig = { id: 'red', label: 'Red', bgClass: 'bg-runred-500', textClass: 'text-white' }
const BLUE: RunGroupConfig = { id: 'blue', label: 'Blue', bgClass: 'bg-runblue-500', textClass: 'text-white' }
const ORANGE: RunGroupConfig = { id: 'orange', label: 'Orange', bgClass: 'bg-runorange-500', textClass: 'text-white' }

/** A glimpse of the app: a card, like a bit of a screen (dark for the Home Screen), with an emoji on its corner. */
function Glimpse({ emoji, dark, children }: { emoji: string; dark?: boolean; children: ReactNode }) {
  return (
    <div className="relative mx-auto mt-7 w-full max-w-[300px]" aria-hidden="true">
      <div className={`rounded-[26px] p-3 text-left shadow-[0_24px_48px_-20px_rgba(17,24,39,0.28)] ${dark ? 'bg-gray-900' : 'bg-white ring-1 ring-gray-200/80'}`}>
        {children}
      </div>
      <span className="absolute -right-4 -top-6 rotate-12 select-none text-[46px] leading-none drop-shadow-md">{emoji}</span>
    </div>
  )
}

function Feature({ id, title, text, children }: { id: string; title: string; text: string; children?: ReactNode }) {
  return (
    <section aria-labelledby={`about-${id}`} className="pt-12 text-center">
      <h2 id={`about-${id}`} className="mx-auto max-w-[320px] text-balance font-rubik text-[28px] font-bold leading-[1.1] tracking-tight text-gray-900">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-[330px] text-[15px] leading-relaxed text-gray-500">{text}</p>
      {children}
    </section>
  )
}

/** Two sessions, with the time now between them, as the Schedule tab has them. */
function ScheduleGlimpse() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 opacity-50">
        <span className="w-12 font-mono text-[15px] font-semibold text-gray-900">9:30</span>
        <span className="text-[11px] text-gray-900">On track</span>
        <span className="flex gap-1"><GroupBadge group={RED} size="sm" /><GroupBadge group={BLUE} size="sm" /></span>
      </div>
      <div className="relative my-5">
        <div className="flex items-center">
          <div className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
          <div className="h-0.5 flex-1 bg-blue-500" />
        </div>
        <span className="absolute -top-4 left-3 font-mono text-[11px] font-semibold text-blue-500">10:12</span>
        <span className="absolute -top-4 right-0 text-[11px] text-gray-400">Next in <span className="font-semibold">18 min</span></span>
      </div>
      <div className="flex flex-col gap-2.5 rounded-xl border border-gray-200 p-3 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="w-12 font-mono text-[15px] font-semibold text-gray-900">10:30</span>
          <span className="text-[11px] text-gray-900">On track</span>
          <GroupBadge group={ORANGE} size="sm" />
        </div>
        <div className="border-t border-gray-100" />
        <div className="flex items-center gap-3">
          <span className="w-12" />
          <span className="text-[11px] text-gray-900">In class</span>
          <GroupBadge group={RED} size="sm" />
        </div>
      </div>
    </div>
  )
}

/** A session's laps: its best in the black chip the app marks it with. */
function LapsGlimpse() {
  const laps = [['1', '1:40.07'], ['2', '1:39.12'], ['3', '1:38.91'], ['4', '1:39.40']]
  return (
    <div>
      <div className="mb-3 flex items-center gap-2.5">
        <TrackIcon trackId="msrc-1-7" size={22} padding={6} radius="rounded-xl" tone="dark" />
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-gray-900">10:30 AM · Orange</p>
          <p className="text-[11px] text-gray-400">MSRC 1.7 CW</p>
        </div>
      </div>
      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-gray-50 px-3 py-2">
          <p className="text-[11px] font-semibold text-gray-500">Best</p>
          <p className="font-mono text-lg font-bold tabular-nums text-gray-900">1:38.91</p>
        </div>
        <div className="rounded-xl bg-gray-50 px-3 py-2">
          <p className="text-[11px] font-semibold text-gray-500">Average</p>
          <p className="font-mono text-lg font-bold tabular-nums text-gray-900">1:39.38</p>
        </div>
      </div>
      <ul className="divide-y divide-gray-100 px-1 text-[13px]">
        {laps.map(([n, time]) => (
          <li key={n} className="flex items-center justify-between py-1.5">
            <span className="text-gray-400">Lap {n}</span>
            {time === '1:38.91' ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-gray-900 px-1.5 py-0.5 font-mono font-bold tabular-nums text-white">
                <Timer size={12} strokeWidth={2.5} />
                {time}
              </span>
            ) : (
              <span className="font-mono tabular-nums text-gray-900">{time}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** An instructor's note, and a skill that's come along. */
function EvaluationGlimpse() {
  return (
    <div>
      <div className="rounded-2xl rounded-tl-md bg-gray-100 px-3.5 py-2.5">
        <p className="text-[13px] leading-snug text-gray-800">
          Brake a little later into 5, and look up through the esses.
        </p>
        <p className="mt-1 text-[11px] text-gray-400">Dave · session 2</p>
      </div>
      <p className="mb-2 mt-4 px-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Most improved</p>
      {[['Vision', 50, 80], ['Braking', 55, 75]].map(([skill, from, to]) => (
        <div key={skill} className="mb-2 px-1 last:mb-0">
          <div className="mb-1 flex justify-between text-[12px]">
            <span className="font-medium text-gray-900">{skill}</span>
            <span className="font-semibold text-emerald-600">+{Number(to) - Number(from)}%</span>
          </div>
          <div className="relative h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div className="absolute inset-y-0 left-0 bg-emerald-200" style={{ width: `${to}%` }} />
            <div className="absolute inset-y-0 left-0 bg-gray-900" style={{ width: `${from}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

/** A car, what's on it, and a session's tire pressures as the car sits. */
function GarageGlimpse() {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gray-900 text-white">
          <CarIcon size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-gray-900">2019 Mustang GT</p>
          <p className="text-[11px] text-gray-400">Last out Sep 11</p>
        </div>
        <ChevronRight size={16} className="text-gray-300" />
      </div>
      <div className="mb-3 divide-y divide-gray-100 rounded-xl bg-gray-50 px-3 text-[12px]">
        {[['Tires', 'Hoosier R7', 'Aug 30'], ['Front pads', 'Carbotech XP12', 'Jul 12']].map(([what, brand, date]) => (
          <div key={what} className="flex items-center justify-between gap-2 py-2">
            <span className="text-gray-500">{what}</span>
            <span className="truncate text-gray-900">{brand} <span className="text-gray-400">· {date}</span></span>
          </div>
        ))}
      </div>
      <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Tire pressures · cold → hot</p>
      <div className="mx-auto grid w-40 grid-cols-2 gap-x-10 gap-y-2 text-center font-mono text-[12px] tabular-nums">
        {['32 → 38', '32 → 39', '30 → 36', '30 → 37'].map(p => (
          <span key={p} className="rounded-md border border-gray-200 py-1 text-gray-900">{p}</span>
        ))}
      </div>
    </div>
  )
}

/** The widget and its alerts, as the iOS widget page shows them. */
function WidgetGlimpse() {
  return (
    <>
      <img src={widgetMedium} alt="" width={364} className="h-auto w-full" />
      <img src={notificationsImg} alt="" width={364} className="mt-3 h-auto w-full" />
    </>
  )
}

/** Signing in, as a signed-out page asks for it. */
function SignInGlimpse() {
  return (
    <div className="px-4 py-6 text-center">
      <Lock size={20} className="mx-auto text-gray-400" />
      <p className="mt-2 text-sm font-medium text-gray-700">Sign in to keep your laps</p>
      <span className="mt-4 inline-block rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white">Sign in with Google</span>
    </div>
  )
}

/**
 * About (#455): what the app is for, then its features one at a time. A page
 * sheet closed with ✕, as the iOS widget page beside it on the More tab is
 * (#415). `closeHref`: where ✕ goes — the tab it was opened from;
 * `onClose`, how (back to it, #429).
 */
export function AboutPage({ closeHref = '#/', onClose }: { closeHref?: string; onClose?: () => void } = {}) {
  return (
    // As tall as the sheet it's on, at least (#415).
    <div className="min-h-full bg-gray-50">
      <div className="mx-auto max-w-lg px-4 pt-4 sm:pt-6 pb-[calc(3rem+env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-lg font-semibold text-gray-900">About</h1>
          <SheetCloseLink href={closeHref} onClose={onClose} />
        </div>

        <div className="pt-6 text-center">
          <img src="/apple-touch-icon.png" alt="" width={72} height={72} className="mx-auto h-[72px] w-[72px] rounded-[17px] shadow-lg" />
          <p className="mt-3 text-[13px] font-semibold text-gray-500">HPDE Events</p>
          <p className="mx-auto mt-1 max-w-[320px] text-balance font-rubik text-[28px] font-bold leading-[1.1] tracking-tight text-gray-900">
            Your track days, in one place.
          </p>
          <p className="mx-auto mt-3 max-w-[330px] text-[15px] leading-relaxed text-gray-500">
            The day’s schedule for every driver at an HPDE event. Sign in, and it keeps your laps, your
            instructor’s notes and your car too.
          </p>
        </div>

        <Feature
          id="schedule"
          title="See what’s on track now."
          text="Each event’s schedule follows the day and counts down to what’s next. Pick your run group and your sessions stand out."
        >
          <Glimpse emoji="🏁"><ScheduleGlimpse /></Glimpse>
        </Feature>

        <Feature
          id="laps"
          title="Paste your laps. See your best."
          text="Paste a session’s times from the timing sheet or your video. The Tracks tab shows how you’ve come along at each track."
        >
          <Glimpse emoji="⏱️"><LapsGlimpse /></Glimpse>
        </Feature>

        <Feature
          id="evaluations"
          title="Keep what your instructor said."
          text="Note what they told you after each session, or fill in the report card. Then see which skills have come along most."
        >
          <Glimpse emoji="📋"><EvaluationGlimpse /></Glimpse>
        </Feature>

        <Feature
          id="garage"
          title="Know what’s on your car."
          text="Log tires, pads and fluids as you change them, and tire pressures for each session. Share the car with whoever else drives it."
        >
          <Glimpse emoji="🔧"><GarageGlimpse /></Glimpse>
        </Feature>

        <Feature
          id="widget"
          title="On your Home Screen."
          text="The iOS widget counts down to your next event and alerts you before your sessions. Set it up under More → iOS widget."
        >
          <Glimpse emoji="🔔" dark><WidgetGlimpse /></Glimpse>
        </Feature>

        <Feature
          id="private"
          title="Open schedules. Private notes."
          text="Anyone can see the schedules, with no account. Your laps, notes and garage are only for you and the site’s admins."
        >
          <Glimpse emoji="🔒"><SignInGlimpse /></Glimpse>
        </Feature>
      </div>
    </div>
  )
}
