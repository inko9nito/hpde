import type { TirePressures, TirePressureSet } from '../types'

function Corner({ label, cold, hot, unit }: { label: string; cold?: number; hot?: number; unit: string }) {
  if (cold === undefined && hot === undefined) return null
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-lg bg-gray-50 px-2 py-2">
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</span>
      <span className="font-mono text-sm font-semibold text-gray-900">
        {cold !== undefined ? cold : '—'}
        <span className="text-gray-300"> / </span>
        {hot !== undefined ? hot : '—'}
      </span>
      <span className="text-[10px] text-gray-400">{unit}</span>
    </div>
  )
}

function hasAny(set: TirePressureSet | undefined) {
  return !!set && (set.fl !== undefined || set.fr !== undefined || set.rl !== undefined || set.rr !== undefined)
}

interface Props {
  pressures: TirePressures
}

export function TirePressureGrid({ pressures }: Props) {
  const { cold, hot, unit = 'psi', notes } = pressures
  if (!hasAny(cold) && !hasAny(hot)) return null

  return (
    <div>
      <div className="mb-1 text-[10px] text-gray-400">cold / hot</div>
      <div className="grid grid-cols-2 gap-1.5">
        <Corner label="FL" cold={cold?.fl} hot={hot?.fl} unit={unit} />
        <Corner label="FR" cold={cold?.fr} hot={hot?.fr} unit={unit} />
        <Corner label="RL" cold={cold?.rl} hot={hot?.rl} unit={unit} />
        <Corner label="RR" cold={cold?.rr} hot={hot?.rr} unit={unit} />
      </div>
      {notes && <p className="mt-1.5 text-xs text-gray-500">{notes}</p>}
    </div>
  )
}
