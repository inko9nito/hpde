import type { ReactNode } from 'react'
import { CalendarClock, Check, ClipboardCheck, Lock, Smartphone, Timer } from 'lucide-react'
import { CarIcon, GarageIcon } from './CarIcons'
import { GroupBadge } from './GroupBadge'
import { SheetCloseLink } from './SheetCloseLink'
import widgetLarge from '../assets/widget-large.png'
import type { RunGroupConfig } from '../types'

/** The About page's hash (#455). */
export const ABOUT_HASH = '#/about'

// About (#455) reads as an App Store page shows an app's features: a plain
// headline for each, under the icon the app gives it, a sentence or two,
// and a phone showing it, the parts that matter popping out over its
// frame — not a list. It says what's here; it isn't selling it.

const RED: RunGroupConfig = { id: 'red', label: 'Red', bgClass: 'bg-runred-500', textClass: 'text-white' }
const BLUE: RunGroupConfig = { id: 'blue', label: 'Blue', bgClass: 'bg-runblue-500', textClass: 'text-white' }
const ORANGE: RunGroupConfig = { id: 'orange', label: 'Orange', bgClass: 'bg-runorange-500', textClass: 'text-white' }
const PINK: RunGroupConfig = { id: 'pink', label: 'Pink', bgClass: 'bg-runpink-500', textClass: 'text-white' }
const PURPLE: RunGroupConfig = { id: 'purple', label: 'Purple', bgClass: 'bg-runpurple-500', textClass: 'text-white' }
const INSTRUCTORS: RunGroupConfig = { id: 'instructors', label: 'Instructors', bgClass: 'bg-zinc-900', textClass: 'text-white' }

/** A card popping out over the phone's frame; place it with `className`. */
function Pop({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div className={`absolute rounded-2xl bg-white text-left shadow-[0_18px_36px_-12px_rgba(17,24,39,0.35)] ring-1 ring-gray-200/70 ${className}`}>
      {children}
    </div>
  )
}

/**
 * A phone, drawn plainly — any phone, as the app runs on any — with `screen`
 * on it, and `children` (Pops) over it, reaching past its frame.
 */
function PhoneMock({ screen, dark, children }: { screen: ReactNode; dark?: boolean; children: ReactNode }) {
  return (
    <div className="relative mx-auto mt-8 h-[330px] w-full max-w-[320px] text-left" aria-hidden="true">
      <div className="absolute inset-y-0 left-1/2 w-[188px] -translate-x-1/2 rounded-[34px] bg-white p-[7px] shadow-[0_24px_48px_-24px_rgba(17,24,39,0.35)] ring-1 ring-gray-200">
        <div className={`h-full overflow-hidden rounded-[27px] ${dark ? 'bg-gradient-to-b from-slate-500 to-slate-800' : 'bg-gray-50'}`}>
          <div className={`mx-auto mt-2 h-1.5 w-9 rounded-full ${dark ? 'bg-white/25' : 'bg-gray-900/10'}`} />
          {screen}
        </div>
      </div>
      {children}
    </div>
  )
}

/** Gray bars where a phone's screen has lines of text. */
function Lines({ widths }: { widths: string[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {widths.map((w, i) => <span key={i} className="h-1.5 rounded-full bg-gray-200" style={{ width: w }} />)}
    </div>
  )
}

/** An event's Schedule tab, small, as the phone's screen. */
function ScheduleScreen() {
  const rows: [string, RunGroupConfig][] = [
    ['8:30', PINK], ['8:55', PURPLE], ['9:30', ORANGE], ['9:55', INSTRUCTORS], ['10:25', PINK], ['10:50', PURPLE], ['11:15', ORANGE],
  ]
  return (
    <div className="px-3 pt-2">
      <p className="text-[9px] font-semibold text-gray-900">TDE at MSRC 1.7 CW</p>
      <p className="text-[8px] text-gray-400">Saturday, Sep 12</p>
      <div className="mt-2 flex gap-2.5 border-b border-gray-200 text-[8px] text-gray-400">
        <span className="-mb-px border-b border-gray-900 pb-1 font-semibold text-gray-900">Schedule</span>
        <span>Details</span>
        <span>My notes</span>
      </div>
      <div className="mt-2 flex flex-col gap-1.5">
        {rows.map(([time, group]) => (
          <div key={time} className="flex items-center gap-2 rounded-md border border-gray-100 bg-white px-2 py-1.5">
            <span className="w-6 font-mono text-[8px] font-semibold text-gray-900">{time}</span>
            <span className={`h-2.5 w-8 rounded-full ${group.bgClass}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

/** The schedule, with your group picked and the session coming up over it. */
function ScheduleGlimpse() {
  return (
    <PhoneMock screen={<ScheduleScreen />}>
      {/* The run group filter's menu, Orange picked. */}
      <Pop className="right-0 top-[6%] w-[42%] p-1 text-[12px]">
        {[RED, ORANGE, BLUE].map(g => (
          <div key={g.id} className="flex items-center justify-between rounded-lg px-2 py-1.5">
            <GroupBadge group={g} size="sm" />
            {g === ORANGE && <Check size={13} className="text-blue-500" />}
          </div>
        ))}
      </Pop>
      <Pop className="left-[3%] right-[3%] top-[46%] p-3">
        <div className="relative mb-3 mt-3">
          <div className="flex items-center">
            <div className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
            <div className="h-0.5 flex-1 bg-blue-500" />
          </div>
          <span className="absolute -top-4 left-3 font-mono text-[11px] font-semibold text-blue-500">10:12</span>
          <span className="absolute -top-4 right-0 text-[11px] text-gray-400">Next in <span className="font-semibold">18 min</span></span>
        </div>
        <div className="flex flex-col gap-2 rounded-xl border border-gray-200 p-2.5">
          <div className="flex items-center gap-3">
            <span className="w-11 font-mono text-[15px] font-semibold text-gray-900">10:30</span>
            <span className="text-[11px] text-gray-900">On track</span>
            <GroupBadge group={ORANGE} size="sm" />
          </div>
          <div className="border-t border-gray-100" />
          <div className="flex items-center gap-3">
            <span className="w-11" />
            <span className="text-[11px] text-gray-900">In class</span>
            <GroupBadge group={RED} size="sm" />
          </div>
        </div>
      </Pop>
    </PhoneMock>
  )
}

/** A session's laps: its best and average, and how your best has come along at the track. */
function LapsGlimpse() {
  const laps = ['1:40.07', '1:39.12', '1:38.91', '1:39.40', '1:39.85', '1:39.02', '1:40.31', '1:39.66']
  return (
    <PhoneMock
      screen={
        <div className="px-3 pt-2">
          <p className="text-[9px] font-semibold text-gray-900">10:30 AM · Orange</p>
          <p className="text-[8px] text-gray-400">8 laps</p>
          <ul className="mt-2 divide-y divide-gray-100 rounded-md bg-white px-2 text-[8px]">
            {laps.map((time, i) => (
              <li key={i} className="flex justify-between py-1.5">
                <span className="text-gray-400">{i + 1}</span>
                <span className={`font-mono ${i === 2 ? 'rounded bg-gray-900 px-1 font-bold text-white' : 'text-gray-900'}`}>{time}</span>
              </li>
            ))}
          </ul>
        </div>
      }
    >
      <Pop className="left-0 top-[10%] w-[56%] p-3">
        <p className="text-[11px] font-semibold text-gray-500">Best lap this event</p>
        <p className="mt-0.5 inline-flex items-center gap-1 rounded-md bg-gray-900 px-1.5 py-0.5 font-mono text-lg font-bold tabular-nums text-white">
          <Timer size={15} strokeWidth={2.5} />
          1:38.91
        </p>
        <p className="mt-1 text-[10px] text-gray-400">Average 1:39.54</p>
      </Pop>
      {/* The track page's chart: your best at each event there, coming down. */}
      <Pop className="right-0 top-[54%] w-[60%] p-3">
        <p className="text-[11px] font-semibold text-gray-900">MSRC 1.7 CW</p>
        <p className="text-[10px] text-gray-400">Your best at each event</p>
        <div className="mt-2 flex h-14 items-end gap-1.5">
          {[92, 80, 74, 63, 55].map((h, i, all) => (
            <span key={h} className={`flex-1 rounded-t-[3px] ${i === all.length - 1 ? 'bg-gray-900' : 'bg-gray-200'}`} style={{ height: `${h}%` }} />
          ))}
        </div>
      </Pop>
    </PhoneMock>
  )
}

/** An instructor's note, and the skills that have come along. */
function EvaluationGlimpse() {
  return (
    <PhoneMock
      screen={
        <div className="px-3 pt-2">
          <p className="text-[9px] font-semibold text-gray-900">Instructor evaluation</p>
          <p className="mb-3 text-[8px] text-gray-400">TDE at MSRC 1.7 CW</p>
          {['Vision', 'Braking', 'Turn-in', 'Throttle', 'Line', 'Smoothness'].map((skill, i) => (
            <div key={skill} className="mb-2">
              <p className="mb-0.5 text-[8px] text-gray-500">{skill}</p>
              <div className="h-1 rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-gray-900" style={{ width: `${[80, 75, 60, 70, 55, 65][i]}%` }} />
              </div>
            </div>
          ))}
          <Lines widths={['90%', '75%', '82%']} />
        </div>
      }
    >
      <Pop className="left-0 top-[8%] w-[74%] rounded-tl-md p-3">
        <p className="text-[13px] leading-snug text-gray-800">Brake a little later into 5, and look up through the esses.</p>
        <p className="mt-1 text-[11px] text-gray-400">Dave · session 2</p>
      </Pop>
      <Pop className="right-0 top-[52%] w-[62%] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400">Most improved</p>
        {([['Vision', 50, 80], ['Braking', 55, 75]] as const).map(([skill, from, to]) => (
          <div key={skill} className="mb-2 last:mb-0">
            <div className="mb-1 flex justify-between text-[12px]">
              <span className="font-medium text-gray-900">{skill}</span>
              <span className="font-semibold text-emerald-600">+{to - from}%</span>
            </div>
            <div className="relative h-1.5 overflow-hidden rounded-full bg-gray-100">
              <div className="absolute inset-y-0 left-0 bg-emerald-200" style={{ width: `${to}%` }} />
              <div className="absolute inset-y-0 left-0 bg-gray-900" style={{ width: `${from}%` }} />
            </div>
          </div>
        ))}
      </Pop>
    </PhoneMock>
  )
}

/** A car's page, with the car and a session's tire pressures over it. */
function GarageGlimpse() {
  return (
    <PhoneMock
      screen={
        <div className="px-3 pt-2">
          <div className="grid h-24 place-items-center rounded-lg bg-gray-200 text-gray-400">
            <CarIcon size={40} />
          </div>
          <ul className="mt-2 divide-y divide-gray-100 rounded-md bg-white px-2 text-[8px]">
            {[['Tires', 'Hoosier R7'], ['Front pads', 'Carbotech XP12'], ['Brake fluid', 'Castrol SRF'], ['Engine oil', 'Motul 300V'], ['Coolant', 'Water Wetter']].map(([what, brand]) => (
              <li key={what} className="flex justify-between gap-2 py-1.5">
                <span className="text-gray-400">{what}</span>
                <span className="truncate text-gray-900">{brand}</span>
              </li>
            ))}
          </ul>
        </div>
      }
    >
      <Pop className="left-0 top-[18%] flex w-[72%] items-center gap-2.5 p-2.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gray-900 text-white">
          <CarIcon size={22} />
        </span>
        <span className="min-w-0">
          <span className="block text-[13px] font-semibold text-gray-900">2019 Mustang GT</span>
          <span className="block text-[11px] text-gray-400">Tires on Aug 30</span>
        </span>
      </Pop>
      <Pop className="right-0 top-[56%] w-[56%] p-3">
        <p className="text-[11px] font-semibold text-gray-900">Tire pressures</p>
        <p className="mb-2 text-[10px] text-gray-400">Cold → hot, psi</p>
        <div className="grid grid-cols-2 gap-1.5 text-center font-mono text-[11px] tabular-nums">
          {['32 → 38', '32 → 39', '30 → 36', '30 → 37'].map(p => (
            <span key={p} className="rounded-md border border-gray-200 py-1 text-gray-900">{p}</span>
          ))}
        </div>
      </Pop>
    </PhoneMock>
  )
}

/**
 * The widget on the Home Screen, and an alert it sent: the Large widget as
 * the setup page shows it (10:05 on the TDE event's Saturday), and the
 * alert it scheduled for Orange's 9:55 class that morning.
 */
function WidgetGlimpse() {
  return (
    <PhoneMock
      dark
      screen={
        <div className="mt-3 grid grid-cols-4 gap-2.5 px-3.5">
          {Array.from({ length: 24 }, (_, i) => <span key={i} className="aspect-square rounded-[9px] bg-white/20" />)}
        </div>
      }
    >
      {/* Cropped above the empty rows at its foot, so the phone shows under it. */}
      <Pop className="left-[16%] right-[16%] top-[26%] overflow-hidden rounded-[22px]">
        <img src={widgetLarge} alt="" width={364} className="aspect-[1095/960] w-full object-cover object-top" />
      </Pop>
      <Pop className="right-0 top-[5%] flex w-[80%] gap-2 p-2.5">
        {/* Scriptable's icon: the widget's alerts come from it. */}
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-slate-800 font-mono text-[10px] font-bold text-white">{'{ }'}</span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="flex items-baseline justify-between gap-2">
            <span className="truncate text-[12px] font-semibold text-gray-900">🟠 Orange · in 10m</span>
            <span className="shrink-0 text-[10px] text-gray-400">20m ago</span>
          </span>
          <span className="block text-[12px] text-gray-700">Classroom at 9:55 AM</span>
        </span>
      </Pop>
    </PhoneMock>
  )
}

/** The schedule's open to all; signing in is what keeps your own. */
function SignInGlimpse() {
  return (
    <PhoneMock screen={<ScheduleScreen />}>
      <Pop className="left-[8%] right-[8%] top-[34%] px-4 py-5 text-center">
        <Lock size={20} className="mx-auto text-gray-400" />
        <p className="mt-2 text-sm font-medium text-gray-700">Sign in to keep your laps</p>
        <span className="mt-3 inline-block rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white">Sign in with Google</span>
      </Pop>
    </PhoneMock>
  )
}

/** A Lucide icon, or the app's own Garage icon (#417), which takes its props. */
type GlyphIcon = (props: { size?: number; strokeWidth?: number; className?: string; 'aria-hidden'?: 'true' }) => ReactNode

function Feature({ id, Icon, title, text, children }: { id: string; Icon: GlyphIcon; title: string; text: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`about-${id}`} className="pt-16 text-center">
      <Icon size={24} strokeWidth={1.75} className="mx-auto text-red-600" aria-hidden="true" />
      <h2 id={`about-${id}`} className="mx-auto mt-2 max-w-[300px] text-balance font-rubik text-[22px] font-bold leading-tight tracking-tight text-gray-900">
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-[330px] text-[15px] leading-normal text-gray-500">{text}</p>
      {children}
    </section>
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
      <div className="mx-auto max-w-lg px-4 pt-4 sm:pt-6 pb-[calc(4rem+env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-lg font-semibold text-gray-900">About</h1>
          <SheetCloseLink href={closeHref} onClose={onClose} />
        </div>

        <div className="mt-4 flex items-center gap-3.5">
          <img src="/apple-touch-icon.png" alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-[13px]" />
          <div className="min-w-0">
            <p className="font-rubik text-lg font-bold leading-tight text-gray-900">HPDE Events</p>
            <p className="text-[15px] text-gray-500">Your track days, in one place</p>
          </div>
        </div>
        <p className="mt-4 text-[15px] leading-normal text-gray-600">
          The day’s schedule for every driver at an HPDE event. Sign in, and it keeps your laps, your
          instructor’s notes and your car too.
        </p>

        <Feature
          id="schedule"
          Icon={CalendarClock}
          title="See what’s on track now."
          text="Each event’s schedule follows the day and counts down to what’s next. Pick your run group and your sessions stand out."
        >
          <ScheduleGlimpse />
        </Feature>

        <Feature
          id="laps"
          Icon={Timer}
          title="Paste your laps. See your best."
          text="Paste a session’s times from the timing sheet or your video. The Tracks tab shows how you’ve come along at each track."
        >
          <LapsGlimpse />
        </Feature>

        <Feature
          id="evaluations"
          Icon={ClipboardCheck}
          title="Keep what your instructor said."
          text="Note what they told you after each session, or fill in the report card. Then see which skills have come along most."
        >
          <EvaluationGlimpse />
        </Feature>

        <Feature
          id="garage"
          Icon={GarageIcon}
          title="Know what’s on your car."
          text="Log tires, pads and fluids as you change them, and tire pressures for each session. Share the car with whoever else drives it."
        >
          <GarageGlimpse />
        </Feature>

        <Feature
          id="widget"
          Icon={Smartphone}
          title="On your Home Screen."
          text="On an iPhone, the widget shows what’s next on your Home Screen, and alerts you before your sessions. Set it up under More → iOS widget."
        >
          <WidgetGlimpse />
        </Feature>

        <Feature
          id="private"
          Icon={Lock}
          title="Open schedules. Private notes."
          text="Anyone can see the schedules, with no account. Your laps, notes and garage stay private to your account."
        >
          <SignInGlimpse />
        </Feature>
      </div>
    </div>
  )
}
