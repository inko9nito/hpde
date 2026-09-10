import type { RunGroupConfig } from '../types'

interface Props {
  groups: RunGroupConfig[]
}

export function Legend({ groups }: Props) {
  const rows = groups.filter(g => g.description)
  if (rows.length === 0) return null

  return (
    <div className="mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">
        Legend
      </div>
      <ul className="flex flex-col gap-1.5">
        {rows.map(g => (
          <li key={g.id} className="flex items-center gap-2 text-sm text-gray-700">
            <span className={`h-3 w-3 shrink-0 rounded-full ${g.bgClass}`} aria-hidden="true" />
            <span className="font-medium text-gray-900">{g.label}</span>
            <span className="text-gray-400">·</span>
            <span>{g.description}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
