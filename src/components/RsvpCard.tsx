import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { useRsvps } from '../data/RsvpsContext'
import { myRunGroup } from '../utils/rsvp'
import type { EventStatus } from '../utils/eventClass'
import type { EventConfig } from '../types'

interface Props {
  event: EventConfig
  status: EventStatus
  /** They picked their run group: the schedule can show just theirs. */
  onRunGroup?: (id: string) => void
}

const CARD = 'mb-4 rounded-xl border border-gray-200 bg-white px-4 py-3'

/**
 * "Are you going?" at the top of an event's page (#235) — or, once it's
 * over, "Did you drive it?" — and, going, which run group they're in.
 * Only the events they answer yes to are theirs (My events on the list).
 */
export function RsvpCard({ event, status, onRunGroup }: Props) {
  const { status: authStatus } = useAuth()
  const { status: rsvpsStatus, rsvps, answer } = useRsvps()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Signed out, the schedule stays as public as ever: nothing asked. And
  // nothing to answer until we know what they've said.
  if (authStatus !== 'signed-in' || rsvpsStatus === 'loading') return null
  if (rsvpsStatus === 'error') {
    return <div className={`${CARD} text-sm text-gray-500`}>Couldn’t load whether you’re going. Pull down to try again.</div>
  }

  const rsvp = rsvps[event.id]
  const past = status === 'past'
  const runGroup = myRunGroup(event, rsvp)

  async function save(going: boolean, group: string | null = going ? runGroup : null) {
    setSaving(true)
    setError(null)
    try {
      await answer(event.id, { going, ...(group ? { runGroup: group } : {}) })
      if (group && group !== runGroup) onRunGroup?.(group)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setSaving(false)
    }
  }

  const question = past ? 'Did you drive this event?' : 'Are you going?'
  const headline = !rsvp ? question
    : rsvp.going ? (past ? 'You drove this event' : 'You’re going')
    : (past ? 'You didn’t drive this event' : 'You’re not going')

  return (
    <section aria-label="Your RSVP" className={CARD}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <h2 className="font-rubik text-[15px] font-semibold text-gray-900">{headline}</h2>
        <div role="group" aria-label={question} className="inline-flex shrink-0 gap-1 rounded-lg bg-gray-100 p-1">
          <AnswerButton pressed={rsvp?.going === true} disabled={saving} onClick={() => save(true)}>
            <Check size={16} aria-hidden="true" />
            {past ? 'Yes' : 'Going'}
          </AnswerButton>
          <AnswerButton pressed={rsvp?.going === false} disabled={saving} onClick={() => save(false)}>
            <X size={16} aria-hidden="true" />
            {past ? 'No' : 'Not going'}
          </AnswerButton>
        </div>
      </div>
      {rsvp?.going && event.runGroups.length > 0 && (
        <div className="mt-3 border-t border-gray-100 pt-3">
          <p id={`rsvp-group-${event.id}`} className="text-xs font-medium text-gray-500">
            Your run group
          </p>
          <div role="radiogroup" aria-labelledby={`rsvp-group-${event.id}`} className="mt-2 flex flex-wrap gap-2">
            {event.runGroups.map(g => {
              const checked = g.id === runGroup
              return (
                <button
                  key={g.id}
                  role="radio"
                  aria-checked={checked}
                  disabled={saving}
                  onClick={() => save(true, g.id)}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold transition-opacity ${g.bgClass} ${g.textClass} ${
                    checked ? 'ring-2 ring-gray-900 ring-offset-2' : runGroup ? 'opacity-40 hover:opacity-70' : 'hover:opacity-80'
                  }`}
                >
                  {checked && <Check size={14} aria-hidden="true" />}
                  {g.label}
                </button>
              )
            })}
          </div>
        </div>
      )}
      {error && <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}
    </section>
  )
}

function AnswerButton({ pressed, disabled, onClick, children }: {
  pressed: boolean
  disabled: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors disabled:opacity-60 ${
        pressed ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'
      }`}
      style={{ minHeight: 36 }}
    >
      {children}
    </button>
  )
}
