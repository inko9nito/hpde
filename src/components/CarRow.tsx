import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { CarIcon } from './CarIcons'
import { carHeading, carSubtitle, consumableLabel, consumablesOn, formatDay } from '../utils/garage'
import type { Car } from '../utils/garage'
import { useCarPhoto } from '../data/GarageContext'

// The pieces a car is shown with (#344): its tile, the one-line row that
// opens it at the top of an event's My notes, and its details' rows.

/** The car's photo, square — or with none (yet), a car on gray. */
export function CarTile({ car, size = 48, rounded = 'rounded-xl' }: { car?: Car; size?: number; rounded?: string }) {
  const src = useCarPhoto(car)
  if (src) {
    return <img src={src} alt="" className={`shrink-0 object-cover ${rounded}`} style={{ width: size, height: size }} data-car-photo />
  }
  return (
    <span
      className={`grid shrink-0 place-items-center bg-gray-100 text-gray-500 ${rounded}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <CarIcon size={Math.round(size * 0.5)} />
    </span>
  )
}

/**
 * A car in one slim line — a small car, the name and a line beside it, and
 * the chevron that opens it — at the top of an event's My notes, where it's
 * seldom changed and shouldn't take the room.
 */
export function CarRow({ car, title, subtitle, onClick, label, dashed = false }: {
  /** Its photo shows, if it has one. */
  car?: Car
  title: string
  subtitle?: string
  onClick?: () => void
  /** Names it, when the title alone doesn't. */
  label?: string
  /** No car yet: the way to add one. */
  dashed?: boolean
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`flex min-h-10 w-full items-center gap-2 rounded-xl border bg-white px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
        dashed ? 'border-dashed border-gray-300' : 'border-gray-200'
      }`}
      data-car-row
    >
      {car?.photo
        ? <CarTile car={car} size={24} rounded="rounded-md" />
        : <CarIcon size={18} className="shrink-0 text-gray-500" aria-hidden="true" />}
      <span className="min-w-0 flex-1 truncate">
        <span className="font-semibold text-gray-900">{title}</span>
        {subtitle && <span className="text-gray-500"> · {subtitle}</span>}
      </span>
      <ChevronRight size={16} className="shrink-0 text-gray-400" aria-hidden="true" />
    </button>
  )
}

/**
 * A car as the Garage shows it (#410): its photo, landscape, with its name
 * and year over the foot of it — or, with none (yet), a car on dark gray.
 * The invite to share a car shows it the same way.
 */
export function CarHero({ car, src, corner, badge }: {
  car: Pick<Car, 'year' | 'make' | 'model' | 'nickname' | 'photo'>
  /** Its photo, once it's in. */
  src: string | null
  /** At the top right: in the Garage, its drivers when it's shared (#424). */
  corner?: ReactNode
  /** At the foot, across from its name: in the Garage, how many events (#424). */
  badge?: ReactNode
}) {
  const subtitle = carSubtitle(car)
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-800" data-car-hero>
      {src ? (
        <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" data-car-photo />
      ) : car.photo ? (
        <div className="absolute inset-0 animate-pulse bg-gray-700" aria-busy="true" />
      ) : (
        <CarIcon size={96} className="absolute right-6 top-4 text-gray-600" aria-hidden="true" />
      )}
      {/* Dark enough at the foot for the name to read over any photo. */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/35 to-transparent" aria-hidden="true" />
      {corner && <div className="absolute right-3 top-3">{corner}</div>}
      <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 px-4 pb-3.5">
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-rubik text-[22px] font-bold leading-tight text-white">{carHeading(car)}</h2>
          {subtitle && <p className="mt-0.5 truncate text-sm text-white/85">{subtitle}</p>}
        </div>
        {badge && <div className="shrink-0">{badge}</div>}
      </div>
    </div>
  )
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
