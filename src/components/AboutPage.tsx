import type { ReactNode } from 'react'
import { CalendarClock, ChevronDown, ChevronRight, ClipboardCheck, Lock, Smartphone, Timer } from 'lucide-react'
import { CarIcon, GarageIcon } from './CarIcons'
import { GroupBadge } from './GroupBadge'
import { ScoreBar } from './ReportCardSkills'
import { SheetCloseLink } from './SheetCloseLink'
import widgetLarge from '../assets/widget-large.png'
import type { RunGroupConfig } from '../types'

/** The About page's hash (#455). */
export const ABOUT_HASH = '#/about'

// About (#455) reads as an App Store page shows an app's features: a plain
// headline for each, under the icon the app gives it, a sentence or two,
// and a phone sketching that page of the app, with the one part that
// matters popping out over its frame as the app draws it — not a list. It
// says what's here; it isn't selling it.

const ORANGE: RunGroupConfig = { id: 'orange', label: 'Orange', bgClass: 'bg-runorange-500', textClass: 'text-white' }

/** A card popping out over the phone's frame, with more of the app in it than the screen shows; place it with `className`. */
function Pop({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div className={`absolute rounded-2xl bg-white text-left shadow-[0_18px_36px_-12px_rgba(17,24,39,0.35)] ring-1 ring-gray-200/70 ${className}`}>
      {children}
    </div>
  )
}

/**
 * A phone, drawn plainly, with a sketch of a page of the app on `screen`,
 * and at most one Pop over it (`children`) for the part that matters.
 */
function PhoneMock({ screen, dark, wide, children }: { screen: ReactNode; dark?: boolean; wide?: boolean; children?: ReactNode }) {
  return (
    <div className="relative mx-auto mt-8 h-[330px] w-full max-w-[320px] text-left" aria-hidden="true">
      <div className={`absolute inset-y-0 left-1/2 ${wide ? 'w-[206px]' : 'w-[188px]'} -translate-x-1/2 rounded-[34px] bg-white p-[7px] shadow-[0_24px_48px_-24px_rgba(17,24,39,0.35)] ring-1 ring-gray-200`}>
        <div className={`h-full overflow-hidden rounded-[27px] ${dark ? 'bg-gradient-to-b from-slate-500 to-slate-800' : 'bg-gray-50'}`}>
          <div className={`mx-auto mt-2 h-1.5 w-9 rounded-full ${dark ? 'bg-white/25' : 'bg-gray-900/10'}`} />
          {screen}
        </div>
      </div>
      {children}
    </div>
  )
}

/** A page's title on the phone's screen, and its tabs under it. */
function ScreenHead({ title, tabs, active = 0 }: { title: string; tabs?: string[]; active?: number }) {
  return (
    <div className="px-3 pt-2">
      <p className="text-[9px] font-semibold text-gray-900">{title}</p>
      {tabs && (
        <div className="mt-2 flex gap-2.5 border-b border-gray-200 text-[8px] text-gray-400">
          {tabs.map((tab, i) => (
            <span key={tab} className={i === active ? '-mb-px border-b border-gray-900 pb-1 font-semibold text-gray-900' : ''}>{tab}</span>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * An event's Schedule tab with Orange picked: only Orange's sessions, the
 * time now across it, and the next of them over it as the tab shows it.
 */
function ScheduleGlimpse() {
  const row = (time: string, past?: boolean) => (
    <div className={`flex items-center gap-2 rounded-md border border-gray-100 bg-white px-2 py-1.5 ${past ? 'opacity-50' : ''}`}>
      <span className="w-6 font-mono text-[8px] font-semibold text-gray-900">{time}</span>
      <span className="h-2.5 w-8 rounded-full bg-runorange-500" />
    </div>
  )
  return (
    <PhoneMock
      screen={
        <>
          <ScreenHead title="TDE at MSRC 1.7 CW" tabs={['Schedule', 'Details', 'My notes']} />
          <div className="px-3 pt-2">
            {/* The run group picker, Orange picked. */}
            <span className="mb-2 inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-1.5 py-1">
              <span className="h-2 w-6 rounded-full bg-runorange-500" />
              <ChevronDown size={8} className="text-gray-400" />
            </span>
            <div className="flex flex-col gap-1.5">
              {row('9:30', true)}
              {row('9:55', true)}
              <div className="my-1 flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                <div className="h-px flex-1 bg-blue-500" />
              </div>
              {row('10:30')}
              {row('11:15')}
              {row('12:50')}
              {row('13:50')}
            </div>
          </div>
        </>
      }
    >
      <Pop className="left-[3%] right-[3%] top-[48%] p-3">
        <div className="relative mt-4">
          <div className="flex items-center">
            <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />
            <div className="h-0.5 flex-1 bg-blue-500" />
          </div>
          <span className="absolute -top-5 left-4 font-mono text-xs font-semibold text-blue-500">10:12 AM</span>
          <span className="absolute -top-5 right-0 text-xs text-gray-400">Next activity starts in <span className="font-semibold">18 min</span></span>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
          <span className="flex w-[4.5rem] shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900">
            10:30<span className="font-sans text-[10px] font-normal text-gray-400">AM</span>
          </span>
          <span className="w-14 shrink-0 text-xs text-gray-900">On track</span>
          <GroupBadge group={ORANGE} />
        </div>
      </Pop>
    </PhoneMock>
  )
}

/** Best and average lap at each event on a track, as a track page charts them: best in black, the average in gray. */
function TrendSketch() {
  const best = [103.2, 101.9, 100.6, 99.8, 98.91]
  const average = [105.8, 104.0, 102.5, 101.3, 100.2]
  const ticks = ['May 3', 'Jun 7', 'Jul 19', 'Aug 16', 'Sep 12']
  const [left, right, top, height, width] = [30, 46, 6, 50, 230]
  const x = (i: number) => left + 6 + (i * (width - left - right - 12)) / (ticks.length - 1)
  const y = (secs: number) => top + ((106 - secs) / 8) * height
  const path = (pts: number[]) => pts.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ')
  return (
    <div>
      <div className="mb-0.5 flex gap-3 text-[10px] text-gray-500">
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 rounded bg-gray-900" />Best</span>
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 rounded bg-[#8b93a1]" />Average</span>
      </div>
      <svg viewBox={`0 0 ${width} ${top + height + 18}`} className="w-full">
        {[98, 102, 106].map(t => (
          <g key={t}>
            <line x1={left} x2={width - right + 8} y1={y(t)} y2={y(t)} stroke="#e5e7eb" />
            <text x={left - 5} y={y(t)} dy="0.32em" textAnchor="end" fontSize={9} fill="#6b7280">1:{t - 60}</text>
          </g>
        ))}
        {ticks.map((t, i) => <text key={t} x={x(i)} y={top + height + 14} textAnchor="middle" fontSize={9} fill="#6b7280">{t}</text>)}
        {([[average, '#8b93a1'], [best, '#111827']] as const).map(([pts, color]) => (
          <g key={color}>
            <path d={path(pts)} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            {pts.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r={3} fill={color} stroke="#fff" strokeWidth={1.5} />)}
          </g>
        ))}
        <text x={x(4) + 7} y={y(98.91)} dy="0.32em" fontSize={10} fontWeight={600} fill="#111827" className="font-mono">1:38.91</text>
      </svg>
    </div>
  )
}

/** An event's My notes, its laps under its best, and a track page's chart over it. */
function LapsGlimpse() {
  return (
    <PhoneMock
      screen={
        <>
          <ScreenHead title="TDE at MSRC 1.7 CW" tabs={['Schedule', 'Details', 'My notes']} active={2} />
          <div className="px-3 pt-2">
            <div className="grid grid-cols-2 gap-1.5">
              {[['Best lap this event', '1:38.91'], ['All time best', '1:38.91']].map(([label, time]) => (
                <div key={label} className="rounded-md border border-gray-100 bg-white px-1.5 py-1">
                  <p className="truncate text-[6px] font-semibold text-gray-500">{label}</p>
                  <p className="font-mono text-[10px] font-bold text-gray-900">{time}</p>
                </div>
              ))}
            </div>
            {['10:30 AM', '11:15 AM'].map((time, k) => (
              <div key={time} className="mt-1.5 rounded-md border border-gray-100 bg-white px-2 py-1.5">
                <p className="mb-1 text-[8px] font-semibold text-gray-900">{time} · Orange</p>
                {['1:40.07', '1:39.12', k ? '1:39.40' : '1:38.91', '1:39.85'].map((lap, i) => (
                  <div key={i} className="flex justify-between py-0.5 text-[7px]">
                    <span className="text-gray-400">{i + 1}</span>
                    <span className={`font-mono ${lap === '1:38.91' ? 'rounded-sm bg-gray-900 px-0.5 font-bold text-white' : 'text-gray-900'}`}>{lap}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      }
    >
      {/* A track page's All time best, off the phone's right edge. */}
      <Pop className="right-0 top-[40%] w-[62%] p-2.5">
        <p className="text-[11px] font-semibold text-gray-500">All time best</p>
        <p className="font-mono text-lg font-bold leading-tight tabular-nums text-gray-900">1:38.91</p>
        <div className="mt-1.5 border-t border-gray-100 pt-1.5"><TrendSketch /></div>
      </Pop>
    </PhoneMock>
  )
}

/**
 * The skills wheel as the Instructor evaluations page draws it: a spoke per
 * skill, rings every 20%, and each report card a shape on it, newer darker
 * — the newest black and shaded. The skills' names are gray bars here: the
 * report card is The Drivers Edge's, and its skills are theirs to show.
 */
function WheelSketch({ labels = true, picked }: { labels?: boolean; picked?: number }) {
  const spokes = 9
  const [c, R] = [100, labels ? 62 : 90]
  const at = (i: number, pct: number): [number, number] => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / spokes
    return [c + Math.cos(a) * (pct / 100) * R, c + Math.sin(a) * (pct / 100) * R]
  }
  const ring = (pct: number) => Array.from({ length: spokes }, (_, i) => at(i, pct).join(',')).join(' ')
  const cards = [
    { scores: [50, 45, 55, 40, 50, 45, 40, 35, 45], stroke: '#8b93a1', width: 1.75, fill: 'none', shape: 'triangle' },
    { scores: [60, 55, 60, 50, 60, 55, 50, 45, 55], stroke: '#4b5563', width: 1.75, fill: 'none', shape: 'square' },
    { scores: [80, 70, 75, 65, 75, 70, 60, 65, 70], stroke: '#111827', width: 2, fill: 'rgba(17, 24, 39, 0.07)', shape: 'circle' },
  ]
  return (
    <svg viewBox="0 0 200 200" className="block w-full">
      {[20, 40, 60, 80, 100].map(pct => <polygon key={pct} points={ring(pct)} fill="none" stroke="#eceef1" />)}
      {Array.from({ length: spokes }, (_, i) => {
        const [x, y] = at(i, 100)
        return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke={i === picked ? '#9ca3af' : '#eceef1'} />
      })}
      {cards.map(card => (
        <g key={card.stroke}>
          <polygon points={card.scores.map((v, i) => at(i, v).join(',')).join(' ')} fill={card.fill} stroke={card.stroke} strokeWidth={card.width} strokeLinejoin="round" />
          {card.scores.map((v, i) => {
            const [x, y] = at(i, v)
            const paint = { fill: card.stroke, stroke: '#fff', strokeWidth: 1.25 }
            return card.shape === 'circle' ? <circle key={i} cx={x} cy={y} r={3.25} {...paint} />
              : card.shape === 'square' ? <rect key={i} x={x - 2.75} y={y - 2.75} width={5.5} height={5.5} {...paint} />
              : <polygon key={i} points={`${x},${y - 3.7} ${x + 3.7},${y + 2.8} ${x - 3.7},${y + 2.8}`} {...paint} />
          })}
        </g>
      ))}
      {labels && Array.from({ length: spokes }, (_, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / spokes
        const [x, y] = [c + Math.cos(a) * (R + 13), c + Math.sin(a) * (R + 13)]
        const w = i === picked ? 30 : 22
        const left = Math.abs(x - c) < 8 ? x - w / 2 : x > c ? x - 3 : x - w + 3
        return <rect key={i} x={left} y={y - (i === picked ? 5 : 2.5)} width={w} height={i === picked ? 10 : 5} rx={i === picked ? 3 : 2.5} fill={i === picked ? '#111827' : '#d1d5db'} />
      })}
    </svg>
  )
}

/**
 * Instructor evaluations: the skills wheel popping out of the page, and
 * under it on the page, as there, a skill's score at each event — its gain
 * since the event before hatched green on the end of its bar.
 */
function EvaluationGlimpse() {
  const rows = [['Sep 12, 2026', 80, 10], ['Jul 19, 2026', 70, 10], ['Jun 7, 2026', 60, undefined]] as const
  return (
    <PhoneMock
      screen={
        <>
          <ScreenHead title="Instructor evaluations" />
          <div className="mx-3 mt-2 rounded-md border border-gray-100 bg-white p-2"><WheelSketch labels={false} /></div>
          <div className="mx-3 mt-1.5 rounded-md border border-gray-100 bg-white px-2 py-1.5">
            <span className="block h-1.5 w-16 rounded-full bg-gray-900" />
            {rows.map(([date, score, change]) => (
              <div key={date} className="border-b border-gray-100 py-1.5 last:border-b-0">
                <div className="flex items-center gap-1.5 text-[7px]">
                  <span className="flex-1 text-gray-900">{date}</span>
                  {change !== undefined && <span className="font-medium text-emerald-700">+{change}</span>}
                  <span className="font-semibold text-gray-900">{score}%</span>
                </div>
                <div className="-mt-1 origin-left scale-y-75"><ScoreBar score={score} change={change} /></div>
              </div>
            ))}
          </div>
        </>
      }
    >
      <Pop className="left-0 top-[4%] w-[56%] p-1.5">
        <WheelSketch picked={0} />
      </Pop>
    </PhoneMock>
  )
}

/**
 * An event's My notes, the car you brought on top, and its sheet over it:
 * the car, its lug nut torque, and what was on it at that event, from its
 * change log.
 */
function GarageGlimpse() {
  return (
    <PhoneMock
      screen={
        <>
          <ScreenHead title="TDE at MSRC 1.7 CW" tabs={['Schedule', 'Details', 'My notes']} active={2} />
          <div className="px-3 pt-2">
            <div className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2 py-1.5">
              <CarIcon size={11} className="text-gray-500" />
              <span className="flex-1 truncate text-[8px] font-semibold text-gray-900">2019 Mustang GT</span>
              <ChevronRight size={8} className="text-gray-400" />
            </div>
            {['10:30 AM', '11:15 AM', '1:50 PM'].map(time => (
              <div key={time} className="mt-1.5 rounded-md border border-gray-100 bg-white px-2 py-1.5">
                <p className="mb-1.5 text-[8px] font-semibold text-gray-900">{time} · Orange</p>
                <div className="flex flex-col gap-1">
                  {['85%', '70%', '78%'].map((w, i) => <span key={i} className="h-1 rounded-full bg-gray-200" style={{ width: w }} />)}
                </div>
              </div>
            ))}
          </div>
        </>
      }
    >
      <Pop className="right-0 top-[16%] w-[64%] p-2.5">
        <p className="text-[14px] font-bold text-gray-900">Your car</p>
        <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-gray-200 p-1.5">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gray-100 text-gray-500"><CarIcon size={16} /></span>
          <span className="flex-1 truncate text-[12px] font-semibold text-gray-900">2019 Mustang GT</span>
          <ChevronRight size={14} className="text-gray-400" />
        </div>
        <dl className="mt-1 text-[12px]">
          <div className="flex items-center justify-between gap-2 border-b border-gray-100 py-1">
            <dt className="text-[11px] font-medium text-gray-500">Lug nut torque</dt>
            <dd className="text-gray-900">150 ft·lb</dd>
          </div>
        </dl>
        <p className="mt-1.5 text-[11px] font-semibold text-gray-900">At this event</p>
        <dl className="text-[12px]">
          {[['Tires', 'Hoosier R7', 'Aug 30'], ['Front pads', 'Carbotech XP12', 'Jul 12']].map(([part, what, since]) => (
            <div key={part} className="flex items-center justify-between gap-2 border-b border-gray-100 py-1 last:border-b-0">
              <dt className="shrink-0 text-[11px] font-medium text-gray-500">{part}</dt>
              <dd className="min-w-0 text-right">
                <span className="block truncate text-gray-900">{what}</span>
                <span className="block text-[10px] text-gray-500">since {since}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Pop>
    </PhoneMock>
  )
}

/** An alert the widget scheduled, as it pops up over the phone. */
function Alert({ className, when, body }: { className: string; when: string; body: string }) {
  return (
    <Pop className={`flex gap-2 p-2.5 ${className}`}>
      {/* Scriptable's icon: the widget's alerts come from it. */}
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-slate-800 font-mono text-[10px] font-bold text-white">{'{ }'}</span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="flex items-baseline justify-between gap-2">
          <span className="truncate text-[12px] font-semibold text-gray-900">🟠 Orange · in 10m</span>
          <span className="shrink-0 text-[10px] text-gray-400">{when}</span>
        </span>
        <span className="block truncate text-[12px] text-gray-700">{body}</span>
      </span>
    </Pop>
  )
}

/**
 * The widget on a phone's Home Screen, and an alert it sent popping up over
 * the top of the phone, clear of it: the Large widget as the setup page
 * shows it (10:05 on the TDE event's Saturday), and Orange's alert for its
 * 9:55 class.
 */
function WidgetGlimpse() {
  return (
    <PhoneMock
      dark
      wide
      screen={
        <div className="flex h-[calc(100%-6px)] flex-col px-3 pb-3 pt-5">
          <div className="grid grid-cols-4 gap-2.5">
            {Array.from({ length: 12 }, (_, i) => <span key={i} className="aspect-square rounded-[9px] bg-white/20" />)}
          </div>
          <img src={widgetLarge} alt="" width={364} className="mt-auto aspect-[1095/960] w-full rounded-[16px] object-cover object-top" />
        </div>
      }
    >
      <Alert className="left-0 right-0 top-[-3%]" when="20m ago" body="Classroom at 9:55 AM" />
    </PhoneMock>
  )
}

/** Signed out, the Garage asks you to sign in; the schedules never do. */
function SignInGlimpse() {
  return (
    <PhoneMock
      screen={
        <>
          <ScreenHead title="Garage" />
          <div className="mx-3 mt-3 rounded-xl border border-dashed border-gray-200 bg-white px-3 py-8 text-center">
            <Lock size={16} className="mx-auto text-gray-400" />
            <p className="mt-1.5 text-[10px] font-medium text-gray-700">Sign in to manage your cars</p>
            <span className="mt-3 inline-block rounded-md bg-gray-900 px-2.5 py-1.5 text-[9px] font-medium text-white">Sign in with Google</span>
          </div>
        </>
      }
    />
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
          text="Log tires, pads and fluids as you change them, and each event keeps the car you brought and what was on it. Share the car with whoever else drives it."
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
