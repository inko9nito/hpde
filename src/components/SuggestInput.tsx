import { useId, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { filterOptions, findExact, findSimilar } from '../utils/fieldOptions'

interface Props {
  value: string
  onChange: (value: string) => void
  // Values already used on past events.
  options: string[]
  placeholder?: string
  className: string
}

/**
 * Typeahead that suggests values from past events (#229), so an organizer
 * or track is picked rather than retyped with a slightly different
 * spelling. On blur, a re-spelling of an existing value ("motorsport ranch
 * cresson") snaps to it; a near miss ("1.7" vs "1.7 mile") gets a
 * "Did you mean" nudge. Anything else is kept as a genuinely new value.
 *
 * Focusing the field lists every option (the current one checked), like a
 * dropdown — filtering only starts once you type, so an already-chosen
 * value doesn't hide the alternatives.
 */
export function SuggestInput({ value, onChange, options, placeholder, className }: Props) {
  const listId = useId()
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(-1)
  // True once the user types after focusing; until then show everything.
  const [typing, setTyping] = useState(false)

  const matches = typing ? filterOptions(value, options) : options
  const selected = findExact(value, options)
  const showList = open && matches.length > 0
  const similar = !open ? findSimilar(value, options) : null

  function choose(option: string) {
    onChange(option)
    setOpen(false)
    setTyping(false)
    setHighlight(-1)
  }

  function handleBlur() {
    setOpen(false)
    setTyping(false)
    setHighlight(-1)
    const exact = findExact(value, options)
    if (exact && exact !== value) onChange(exact)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showList) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight(h => (h + 1) % matches.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight(h => (h <= 0 ? matches.length - 1 : h - 1))
    } else if (e.key === 'Enter' && highlight >= 0) {
      e.preventDefault()
      choose(matches[highlight])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className="relative">
      <input
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        onChange={e => {
          onChange(e.target.value)
          setOpen(true)
          setTyping(true)
          setHighlight(-1)
        }}
        onFocus={() => setOpen(true)}
        // Tapping an already-focused field (after picking) reopens the list.
        onClick={() => setOpen(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} ${options.length > 0 ? 'pr-8' : ''}`}
      />
      {options.length > 0 && (
        <ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute right-3 top-[26px] -translate-y-1/2 text-gray-400" />
      )}
      {showList && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 z-20 mt-1 max-h-52 overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
        >
          {matches.map((option, i) => (
            <li
              key={option}
              role="option"
              aria-selected={i === highlight}
              // mousedown, not click: runs before the input's blur closes the list.
              onMouseDown={e => {
                e.preventDefault()
                choose(option)
              }}
              className={`flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm text-gray-900 ${
                i === highlight ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <span className="min-w-0 truncate">{option}</span>
              {option === selected && <Check size={14} aria-hidden="true" className="shrink-0 text-gray-500" />}
            </li>
          ))}
        </ul>
      )}
      {similar && (
        <button
          type="button"
          onClick={() => choose(similar)}
          className="mt-1 block text-left text-xs text-amber-700 hover:underline"
        >
          Did you mean “{similar}”? Tap to use it.
        </button>
      )}
    </div>
  )
}
