import { useId, useState } from 'react'
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
 * Text input that suggests values from past events (#229), so an organizer
 * or track is picked rather than retyped with a slightly different
 * spelling. On blur, a re-spelling of an existing value ("motorsport ranch
 * cresson") snaps to it; a near miss ("1.7" vs "1.7 mile") gets a
 * "Did you mean" nudge. Anything else is kept as a genuinely new value.
 */
export function SuggestInput({ value, onChange, options, placeholder, className }: Props) {
  const listId = useId()
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(-1)

  const matches = filterOptions(value, options).filter(o => o !== value)
  const showList = open && matches.length > 0
  const similar = !open ? findSimilar(value, options) : null

  function choose(option: string) {
    onChange(option)
    setOpen(false)
    setHighlight(-1)
  }

  function handleBlur() {
    setOpen(false)
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
          setHighlight(-1)
        }}
        onFocus={() => setOpen(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={className}
      />
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
              className={`cursor-pointer px-3 py-2 text-sm text-gray-900 ${
                i === highlight ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              {option}
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
