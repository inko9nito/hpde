import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { GroupBadge } from './GroupBadge'
import type { RunGroupConfig } from '../types'

interface Props {
  groups: RunGroupConfig[]
  selected: string[]
  onChange: (ids: string[]) => void
}

export function RunGroupFilter({ groups, selected, onChange }: Props) {
  const [open, setOpen] = useState(false)

  const toggle = (id: string) =>
    onChange(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id])

  const allSelected = selected.length === 0 || selected.length === groups.length
  const activeGroups = groups.filter(g => selected.includes(g.id))

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-gray-400"
      >
        {allSelected ? (
          <span className="text-gray-700">All run groups</span>
        ) : (
          <div className="flex items-center gap-1">
            {activeGroups.map(g => <GroupBadge key={g.id} group={g} size="sm" />)}
          </div>
        )}
        <ChevronDown size={14} className="text-gray-400" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-1 min-w-[180px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl">
            {groups.map(g => (
              <button
                key={g.id}
                onClick={() => toggle(g.id)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50"
              >
                <GroupBadge group={g} size="md" />
                {selected.includes(g.id) && <Check size={14} className="text-blue-500" />}
              </button>
            ))}
            <div className="mt-1 border-t border-gray-100 pt-1">
              <button
                onClick={() => { onChange([]); setOpen(false) }}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-400 hover:bg-gray-50"
              >
                {allSelected ? 'All selected' : 'Clear filter'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
