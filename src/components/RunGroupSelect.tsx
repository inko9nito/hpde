import { useEffect, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { GroupBadge } from './GroupBadge'
import type { RunGroupConfig } from '../types'

interface Props {
  groups: RunGroupConfig[]
  /** The group picked, by id; null for none. */
  value: string | null
  onChange: (id: string | null) => void
  /** Names the menu and its button. */
  label: string
}

/**
 * Picks one run group (#340), the way the Schedule tab's filter picks them
 * (RunGroupFilter): a button showing the group's badge, opening a menu of
 * every group's badge, with a way back to none.
 */
export function RunGroupSelect({ groups, value, onChange, label }: Props) {
  const [open, setOpen] = useState(false)
  const picked = groups.find(g => g.id === value) ?? null

  useEffect(() => {
    if (!open) return
    // Escape closes the menu, not the sheet it's in.
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopImmediatePropagation()
      setOpen(false)
    }
    document.addEventListener('keydown', onKey, true)
    return () => document.removeEventListener('keydown', onKey, true)
  }, [open])

  const choose = (id: string | null) => {
    onChange(id)
    setOpen(false)
  }

  return (
    <div className="relative shrink-0">
      <button
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${picked ? picked.label : 'none'}`}
        className="flex min-h-8 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-gray-400"
      >
        {picked ? <GroupBadge group={picked} size="sm" /> : <span className="text-gray-400">Choose</span>}
        <ChevronDown size={14} className="text-gray-400" aria-hidden="true" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div role="listbox" aria-label={label} className="absolute right-0 top-full z-20 mt-1 min-w-[180px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl">
            {groups.map(g => (
              <button
                key={g.id}
                role="option"
                aria-selected={g.id === value}
                onClick={() => choose(g.id)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50"
              >
                <GroupBadge group={g} size="md" />
                {g.id === value && <Check size={14} className="text-blue-500" aria-hidden="true" />}
              </button>
            ))}
            {picked && (
              <div className="mt-1 border-t border-gray-100 pt-1">
                <button
                  onClick={() => choose(null)}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-400 hover:bg-gray-50"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
