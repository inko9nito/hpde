import type { ReactNode } from 'react'
import { CarFront, ChevronRight } from 'lucide-react'
import { consumableLabel, consumablesOn, formatDay } from '../utils/garage'
import type { Car } from '../utils/garage'

// The pieces a car is shown with (#344): its tile, the one-line row that
// opens it — in the Garage and at the top of an event's My notes — and
// its details' rows.

/** Where the car's photo goes: for now, a car on gray. */
export function CarTile({ size = 48 }: { size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-xl bg-gray-100 text-gray-500"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <CarFront size={Math.round(size * 0.46)} />
    </span>
  )
}

/**
 * A car in a line: its tile, what it's called and a line under it, and the
 * chevron that opens it. A link with `href`, a button with `onClick`.
 */
export function CarRow({ title, subtitle, href, onClick, label, dashed = false }: {
  title: string
  subtitle?: string
  href?: string
  onClick?: () => void
  /** Names it, when the title alone doesn't. */
  label?: string
  /** No car yet: the way to add one. */
  dashed?: boolean
}) {
  const className = `flex w-full items-center gap-3 rounded-2xl border bg-white p-3 text-left transition-colors hover:bg-gray-50 ${
    dashed ? 'border-dashed border-gray-300' : 'border-gray-200 shadow-sm'
  }`
  const body = (<>
    <CarTile />
    <span className="min-w-0 flex-1">
      <span className="block truncate text-base font-semibold text-gray-900">{title}</span>
      {subtitle && <span className="mt-0.5 block truncate text-xs text-gray-500">{subtitle}</span>}
    </span>
    <ChevronRight size={16} className="shrink-0 text-gray-400" aria-hidden="true" />
  </>)
  return href
    ? <a href={href} aria-label={label} className={className} data-car-row>{body}</a>
    : <button onClick={onClick} aria-label={label} className={className} data-car-row>{body}</button>
}

/** A label and its value, a line to itself — as on the report card. */
export function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-h-11 items-center justify-between gap-3 border-b border-gray-100 py-2 last:border-b-0">
      <dt className="shrink-0 text-[13px] font-medium text-gray-500">{label}</dt>
      <dd className="min-w-0 text-right text-sm text-gray-900">{children}</dd>
    </div>
  )
}

/**
 * What's on the car — each consumable's last change, on or before `day`
 * when given — and since when. None logged: says so.
 */
export function ConsumablesList({ car, day }: { car: Car; day?: string }) {
  const on = consumablesOn(car, day)
  if (on.length === 0) {
    return <p className="mt-1 text-xs text-gray-500">None logged{day ? ' by then' : ' yet'}.</p>
  }
  return (
    <dl aria-label="Consumables">
      {on.map(c => (
        <DetailRow key={c.part} label={consumableLabel(c.part)}>
          <span className="block">{c.what ?? 'Changed'}</span>
          <span className="block text-xs text-gray-500">since {formatDay(c.date)}</span>
        </DetailRow>
      ))}
    </dl>
  )
}
