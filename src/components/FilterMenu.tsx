import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronDown, Check } from 'lucide-react'

export interface FilterOption {
  /** Null: every one — the option that filters nothing. */
  id: string | null
  /** What it says in words, for the button's name. */
  text: string
  /** How it's drawn, if not just its words: a run group's badge. */
  content?: ReactNode
}

/**
 * One of a page's filters (#401): a button showing what's picked, opening a
 * menu of the options, the way RunGroupSelect picks a run group.
 */
export function FilterMenu({ label, options, value, onChange }: {
  /** What it filters by, naming the menu and its button. */
  label: string
  options: readonly FilterOption[]
  value: string | null
  onChange: (id: string | null) => void
}) {
  const [open, setOpen] = useState(false)
  const picked = options.find(o => o.id === value) ?? options[0]

  useEffect(() => {
    if (!open) return
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
    <div className="relative min-w-0">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${picked.text}`}
        className={`flex min-h-9 max-w-full items-center gap-2 rounded-lg border bg-white px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-gray-400 ${
          picked.id === null ? 'border-gray-200' : 'border-gray-900'
        }`}
      >
        <span className="min-w-0 truncate text-gray-700">{picked.content ?? picked.text}</span>
        <ChevronDown size={14} className="shrink-0 text-gray-400" aria-hidden="true" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div role="listbox" aria-label={label} className="absolute left-0 top-full z-20 mt-1 min-w-[200px] max-w-[calc(100vw-2rem)] rounded-xl border border-gray-200 bg-white p-1 shadow-xl">
            {options.map(o => (
              <button
                key={o.id === null ? 'all' : `option ${o.id}`}
                type="button"
                role="option"
                aria-selected={o.id === picked.id}
                onClick={() => choose(o.id)}
                className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-50"
              >
                <span className="min-w-0 truncate">{o.content ?? o.text}</span>
                {o.id === picked.id && <Check size={14} className="shrink-0 text-blue-500" aria-hidden="true" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
