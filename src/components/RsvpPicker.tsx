import { useEffect, useState } from 'react'
import { Check, ChevronDown, CircleHelp, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { useRsvps } from '../data/RsvpsContext'
import { answerFor, myRunGroup } from '../utils/rsvp'
import type { RsvpStatus } from '../utils/rsvp'
import type { EventStatus } from '../utils/eventClass'
import type { EventConfig } from '../types'

interface Props {
  event: EventConfig
  status: EventStatus
  /**
   * 'header': the event page's, showing their answer (or Join event).
   * 'card': a featured card's on the list — only while it's unanswered.
   */
  variant: 'header' | 'card'
  /** They picked their run group: the schedule can show just theirs. */
  onRunGroup?: (id: string) => void
}

interface Option {
  status: RsvpStatus
  label: string
  hint?: string
  Icon: LucideIcon
}

const UPCOMING_OPTIONS: Option[] = [
  { status: 'going', label: 'Going', Icon: Check },
  { status: 'maybe', label: 'Maybe', hint: 'Not sure yet, or on the waitlist', Icon: CircleHelp },
  { status: 'not-going', label: 'Not going', Icon: X },
]

// Once it's over: did they drive it? Nothing to be unsure about.
const PAST_OPTIONS: Option[] = [
  { status: 'going', label: 'I drove', Icon: Check },
  { status: 'not-going', label: 'I didn’t drive', Icon: X },
]

// What the header button says for each answer.
const UPCOMING_LABEL: Record<RsvpStatus, string> = { going: 'Going', maybe: 'Maybe', 'not-going': 'Not going' }
const PAST_LABEL: Record<RsvpStatus, string> = { going: 'Drove', maybe: 'Maybe', 'not-going': 'Didn’t drive' }

const ANSWER_STYLE: Record<RsvpStatus, string> = {
  going: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
  maybe: 'bg-amber-50 text-amber-700 hover:bg-amber-100',
  'not-going': 'bg-gray-100 text-gray-600 hover:bg-gray-200',
}

/**
 * Join event / their answer (#235), as one small button that opens the
 * choices: going, maybe or not going — or for an event that's over,
 * whether they drove it — and, going or maybe, their run group. Only for
 * someone signed in.
 */
export function RsvpPicker({ event, status, variant, onRunGroup }: Props) {
  const { status: authStatus } = useAuth()
  const { status: rsvpsStatus, rsvps, answer } = useRsvps()
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (authStatus !== 'signed-in' || rsvpsStatus !== 'ready') return null

  const past = status === 'past'
  const current = answerFor(event, rsvps)
  // The list only offers to join; the answer itself shows as a badge
  // there — once they've also picked a run group, if it's asking for one.
  if (variant === 'card' && (past || current !== null) && !open) return null

  const runGroup = myRunGroup(event, rsvps[event.id])
  const options = past ? PAST_OPTIONS : UPCOMING_OPTIONS
  const question = past ? 'Did you drive this event?' : 'Are you going?'
  // Going or maybe: which run group they're in.
  const groupAnswer = current === 'going' || current === 'maybe' ? current : null
  const pickGroup = groupAnswer !== null && event.runGroups.length > 0
  const group = event.runGroups.find(g => g.id === runGroup)

  async function save(next: RsvpStatus, nextGroup: string | null) {
    setSaving(true)
    setError(null)
    try {
      await answer(event.id, { status: next, ...(nextGroup && next !== 'not-going' ? { runGroup: nextGroup } : {}) })
      if (nextGroup && next !== 'not-going' && nextGroup !== runGroup) onRunGroup?.(nextGroup)
      // Going or maybe, with groups to pick from: stay open for that.
      const askGroup = next !== 'not-going' && event.runGroups.length > 0 && !nextGroup
      if (!askGroup) setOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setSaving(false)
    }
  }

  const trigger = current === null
    ? (
      <>
        {past ? 'Did you drive?' : 'Join event'}
        <ChevronDown size={14} aria-hidden="true" />
      </>
    ) : (
      <>
        {(() => {
          const Icon = options.find(o => o.status === current)?.Icon ?? CircleHelp
          return <Icon size={14} strokeWidth={2.5} aria-hidden="true" />
        })()}
        {(past ? PAST_LABEL : UPCOMING_LABEL)[current]}
        {group && current !== 'not-going' && (
          <>
            <span aria-hidden="true">·</span>
            <span className={`h-2 w-2 shrink-0 rounded-full ${group.bgClass}`} aria-hidden="true" />
            {group.label}
          </>
        )}
        <ChevronDown size={14} aria-hidden="true" />
      </>
    )

  const triggerStyle = current !== null ? ANSWER_STYLE[current]
    : variant === 'card' ? 'bg-white text-gray-900 hover:bg-gray-200'
    : 'bg-gray-900 text-white hover:bg-gray-700'

  return (
    <div className="relative shrink-0">
      <button
        onClick={e => {
          // On a list card: don't open the event underneath.
          e.stopPropagation()
          setOpen(o => !o)
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`inline-flex h-7 max-w-[11rem] items-center gap-1 whitespace-nowrap rounded-full px-2.5 font-rubik text-[13px] font-medium transition-colors ${triggerStyle}`}
      >
        {trigger}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div
            role="dialog"
            aria-label={question}
            className="absolute right-0 top-full z-40 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-1 text-left shadow-xl"
          >
            <p className="px-3 pb-1 pt-2 text-xs font-medium text-gray-500">{question}</p>
            <div role="radiogroup" aria-label={question}>
              {options.map(({ status: s, label, hint, Icon }) => {
                const checked = s === current
                return (
                  <button
                    key={s}
                    role="radio"
                    aria-checked={checked}
                    disabled={saving}
                    onClick={() => save(s, runGroup)}
                    className="flex w-full items-start gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 disabled:opacity-60"
                  >
                    <Icon size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-gray-500" />
                    <span className="flex-1">
                      {label}
                      {hint && <span className="block text-xs font-normal text-gray-400">{hint}</span>}
                    </span>
                    {checked && <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-blue-500" />}
                  </button>
                )
              })}
            </div>
            {pickGroup && (
              <div className="mx-3 mb-2 mt-1 border-t border-gray-100 pt-2">
                <p id={`rsvp-group-${event.id}`} className="text-xs font-medium text-gray-500">Your run group</p>
                <div role="radiogroup" aria-labelledby={`rsvp-group-${event.id}`} className="mt-2 flex flex-wrap gap-1.5">
                  {event.runGroups.map(g => {
                    const checked = g.id === runGroup
                    return (
                      <button
                        key={g.id}
                        role="radio"
                        aria-checked={checked}
                        disabled={saving}
                        onClick={() => save(groupAnswer ?? 'going', g.id)}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-semibold transition-opacity ${g.bgClass} ${g.textClass} ${
                          checked ? 'ring-2 ring-gray-900 ring-offset-1' : runGroup ? 'opacity-40 hover:opacity-70' : 'hover:opacity-80'
                        }`}
                      >
                        {checked && <Check size={12} strokeWidth={3} aria-hidden="true" />}
                        {g.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
            {error && <p role="alert" className="px-3 pb-2 text-sm text-red-600">{error}</p>}
          </div>
        </>
      )}
    </div>
  )
}
