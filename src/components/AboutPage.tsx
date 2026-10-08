import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { CalendarClock, ChevronDown, ChevronRight, ClipboardCheck, Copy, Share, Smartphone, Timer } from 'lucide-react'
import QRCode from 'qrcode'
import { CarIcon, GarageIcon } from './CarIcons'
import { GroupBadge } from './GroupBadge'
import { ScoreBar } from './ReportCardSkills'
import { SheetCloseLink } from './SheetCloseLink'
import { eventShareUrl } from './ShareSheet'
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

// The run groups' colors on the TDE event's Saturday morning, on track and
// in class at each session, as the phones' schedules show them.
const PINK = 'bg-runpink-500'
const PURPLE = 'bg-runpurple-500'
const INSTRUCTORS = 'bg-zinc-900'
const SATURDAY: [time: string, onTrack: string, inClass?: string][] = [
  ['8:00', INSTRUCTORS, PURPLE], ['8:30', PINK], ['8:55', PURPLE, PINK], ['9:30', ORANGE.bgClass, PURPLE],
  ['9:55', INSTRUCTORS, ORANGE.bgClass], ['10:25', PINK], ['10:50', PURPLE], ['11:15', ORANGE.bgClass, PURPLE],
  ['12:20', INSTRUCTORS], ['12:50', PINK], ['1:15', PURPLE, PINK],
]

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

/** One session on a phone's schedule: its time, and its groups' colors, on track and then in class. */
function SessionSketch({ time, groups, past }: { time: string; groups: (string | undefined)[]; past?: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 rounded-md border border-gray-100 bg-white px-2 py-1.5 ${past ? 'opacity-60' : ''}`}>
      <span className="w-6 font-mono text-[8px] font-semibold text-gray-900">{time}</span>
      {groups.map((bg, i) => bg && <span key={i} className={`h-2.5 w-7 rounded-full ${bg}`} />)}
    </div>
  )
}

/** An event's Schedule tab from 9:30, every group on it, the time now (11:02) across it. */
function ScheduleScreen() {
  return (
    <>
      <ScreenHead title="TDE at MSRC 1.7 CW" tabs={['Schedule', 'Details', 'My notes']} />
      <div className="flex flex-col gap-1.5 px-3 pt-2">
        {SATURDAY.slice(3, 7).map(([time, onTrack, inClass]) => <SessionSketch key={time} time={time} groups={[onTrack, inClass]} past />)}
        <div className="my-0.5 flex items-center">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          <div className="h-px flex-1 bg-blue-500" />
        </div>
        {SATURDAY.slice(7).map(([time, onTrack, inClass]) => <SessionSketch key={time} time={time} groups={[onTrack, inClass]} />)}
      </div>
    </>
  )
}

/**
 * The schedule, every group on it, and over it the same tab filtered to
 * Orange, as the run group picker leaves it: the time now, and Orange's
 * next session, at 11:15.
 */
function ScheduleGlimpse() {
  return (
    <PhoneMock screen={<ScheduleScreen />}>
      <Pop className="right-0 top-[47%] w-[80%] p-2.5">
        {/* The run group picker, Orange picked. */}
        <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-2.5 py-1 shadow-sm">
          <GroupBadge group={ORANGE} size="sm" />
          <ChevronDown size={14} className="text-gray-400" />
        </span>
        <div className="relative mt-6">
          <div className="flex items-center">
            <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />
            <div className="h-0.5 flex-1 bg-blue-500" />
          </div>
          <span className="absolute -top-5 left-3 font-mono text-[10px] font-semibold text-blue-500">11:02 AM</span>
          <span className="absolute -top-5 right-0 text-[10px] text-gray-400">Next activity starts in <span className="font-semibold">13 min</span></span>
        </div>
        <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white p-2.5 shadow-sm">
          <span className="flex shrink-0 items-baseline gap-0.5 font-mono text-base font-semibold text-gray-900">
            11:15<span className="font-sans text-[9px] font-normal text-gray-400">AM</span>
          </span>
          <span className="shrink-0 text-[11px] text-gray-900">On track</span>
          <GroupBadge group={ORANGE} size="sm" />
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
function WheelSketch({ picked }: { picked?: number }) {
  const spokes = 9
  const [c, R] = [100, 62]
  const at = (i: number, pct: number): [number, number] => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / spokes
    return [c + Math.cos(a) * (pct / 100) * R, c + Math.sin(a) * (pct / 100) * R]
  }
  const ring = (pct: number) => Array.from({ length: spokes }, (_, i) => at(i, pct).join(',')).join(' ')
  const cards = [
    { scores: [50, 40, 45, 30, 55, 35, 45, 30, 40], stroke: '#8b93a1', width: 1.75, fill: 'none', shape: 'triangle' },
    { scores: [65, 45, 60, 35, 70, 50, 55, 40, 50], stroke: '#4b5563', width: 1.75, fill: 'none', shape: 'square' },
    { scores: [80, 55, 75, 40, 90, 60, 70, 45, 65], stroke: '#111827', width: 2, fill: 'rgba(17, 24, 39, 0.07)', shape: 'circle' },
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
      {Array.from({ length: spokes }, (_, i) => {
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
 * Instructor evaluations: the report cards at a glance and a skill's score
 * at each event on the page — its gain since the event before hatched green
 * on the end of its bar — and the skills wheel popping out over it. Skills
 * are gray bars, as on the wheel.
 */
function EvaluationGlimpse() {
  const rows = [['Sep 12, 2026', 80, 10], ['Jul 19, 2026', 70, 10], ['Jun 7, 2026', 60, undefined]] as const
  return (
    <PhoneMock
      screen={
        <>
          <ScreenHead title="Instructor evaluations" />
          <div className="mx-3 mt-2 grid grid-cols-2 divide-x divide-gray-100 rounded-md border border-gray-100 bg-white">
            {([['+20', '+15', '+10'], ['50%', '55%', '60%']] as const).map((values, k) => (
              <div key={k} className="p-1.5">
                <span className="mb-1.5 block h-1.5 w-12 rounded-full bg-gray-300" />
                {values.map(v => (
                  <div key={v} className="flex items-center justify-between py-0.5">
                    <span className="h-1 w-8 rounded-full bg-gray-200" />
                    <span className="text-[7px] font-semibold text-gray-900">{v}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
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
          <div className="mx-3 mt-1.5 rounded-md border border-gray-100 bg-white px-2 py-1.5">
            <p className="text-[8px] font-semibold text-gray-900">TDE at MSRC 1.7 CW</p>
            <div className="mt-1 flex flex-col gap-1">
              {['90%', '75%'].map(w => <span key={w} className="h-1 rounded-full bg-gray-200" style={{ width: w }} />)}
            </div>
          </div>
        </>
      }
    >
      <Pop className="right-0 top-[3%] w-[54%] p-1.5">
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
              <span className="flex-1 truncate text-[8px] font-semibold text-gray-900">2019 Miata</span>
              <ChevronRight size={8} className="text-gray-400" />
            </div>
            {/* Your sessions, Orange's, their laps under them. */}
            {['9:30', '11:15', '1:50'].map(time => (
              <div key={time} className="mt-1.5 rounded-md border border-gray-100 bg-white px-2 py-1.5">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <span className="w-6 font-mono text-[8px] font-semibold text-gray-900">{time}</span>
                  <span className="h-2.5 w-7 rounded-full bg-runorange-500" />
                </div>
                <div className="flex flex-col gap-1">
                  {['85%', '70%'].map((w, i) => <span key={i} className="h-1 rounded-full bg-gray-200" style={{ width: w }} />)}
                </div>
              </div>
            ))}
          </div>
        </>
      }
    >
      {/* Narrow enough that Orange's color shows beside it. */}
      <Pop className="right-0 top-[16%] w-[57%] p-2.5">
        <p className="text-[14px] font-bold text-gray-900">Your car</p>
        <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-gray-200 p-1.5">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gray-100 text-gray-500"><CarIcon size={16} /></span>
          <span className="flex-1 truncate text-[12px] font-semibold text-gray-900">2019 Miata</span>
          <ChevronRight size={14} className="text-gray-400" />
        </div>
        <dl className="mt-1 text-[12px]">
          <div className="flex items-center justify-between gap-2 border-b border-gray-100 py-1">
            <dt className="text-[11px] font-medium text-gray-500">Lug nut torque</dt>
            <dd className="text-gray-900">80 ft·lb</dd>
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
          <span className="truncate text-[11px] font-semibold text-gray-900">🟠 Orange · in 10m</span>
          <span className="shrink-0 text-[9px] text-gray-400">{when}</span>
        </span>
        <span className="block truncate text-[11px] text-gray-700">{body}</span>
      </span>
    </Pop>
  )
}

/**
 * The widget on a phone's Home Screen, and an alert it sent flying in from
 * the right, over a corner of the phone: the Large widget as the setup page
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
      <Alert className="right-0 top-[12%] w-[72%]" when="20m ago" body="Classroom at 9:55 AM" />
    </PhoneMock>
  )
}

/** A code to scan for `url`, as the share sheet draws it. */
function useQrCode(url: string): string | null {
  const [qr, setQr] = useState<string | null>(null)
  useEffect(() => {
    QRCode.toDataURL(url, { margin: 1, width: 240 }).then(setQr, () => setQr(null))
  }, [url])
  return qr
}

/** The schedule, and over it the sheet that shares it: a code to scan, and the link. */
function ShareGlimpse() {
  const url = eventShareUrl('2026-09-11_msrc-1-7')
  const qr = useQrCode(url)
  return (
    <PhoneMock screen={<ScheduleScreen />}>
      <Pop className="right-0 top-[18%] w-[58%] p-3 text-center">
        <p className="text-[13px] font-bold text-gray-900">Share this event</p>
        {qr
          ? <img src={qr} alt="" width={112} height={112} className="mx-auto mt-2 rounded-md border border-gray-200" />
          : <div className="mx-auto mt-2 h-28 w-28 rounded-md bg-gray-100" />}
        <div className="mt-2 flex items-center gap-1.5 rounded-lg border border-gray-200 px-2 py-1.5 text-left">
          <span className="min-w-0 flex-1 truncate text-[10px] text-gray-800">{url}</span>
          <Copy size={11} className="shrink-0 text-gray-400" />
        </div>
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
          text="Each event’s schedule follows the day and counts down to what’s next. Filter it to your run group, or any you’re following, to see just their sessions."
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
          title="See how you’re improving."
          text="Keep your instructor’s notes and report cards from every event, and see each skill come along over time."
        >
          <EvaluationGlimpse />
        </Feature>

        <Feature
          id="garage"
          Icon={GarageIcon}
          title="Your car’s setup, event by event."
          text="Log tires, pads and fluids as you change them, and each event keeps the car you brought and how it was set up. Share the car with whoever else drives it."
        >
          <GarageGlimpse />
        </Feature>

        <Feature
          id="widget"
          Icon={Smartphone}
          title="What’s next, without opening the app."
          text="On iPhone, swipe over to the widget without unlocking, or keep it on your Home Screen. Or skip the widget and just get alerts before your run group’s sessions, as far ahead as you like. Set it up under More → iOS widget."
        >
          <WidgetGlimpse />
        </Feature>

        <Feature
          id="share"
          Icon={Share}
          title="Share an event with anyone."
          text="Send a link, or let them scan the code. Anyone can open the schedule, no account needed. Your laps, notes and car stay private to your account."
        >
          <ShareGlimpse />
        </Feature>
      </div>
    </div>
  )
}
