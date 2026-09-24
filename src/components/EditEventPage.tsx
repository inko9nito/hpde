import { useRef } from 'react'
import { useAuth } from '../auth/AuthContext'
import { useEvents } from '../data/EventsContext'
import { ADMIN_ROLE, EventDetailsForm, FormPage } from './NewEventPage'
import { SignInPrompt } from './SignInPrompt'
import { Notice, SignedOutNotice } from './Notice'
import type { EventConfig } from '../types'

export const EDIT_EVENT_HASH_PREFIX = '#/edit-event/'

export function editEventHash(eventId: string): string {
  return `${EDIT_EVENT_HASH_PREFIX}${encodeURIComponent(eventId)}`
}

export function eventIdFromEditEventHash(hash: string): string | null {
  if (!hash.startsWith(EDIT_EVENT_HASH_PREFIX)) return null
  return decodeURIComponent(hash.slice(EDIT_EVENT_HASH_PREFIX.length))
}

interface Props {
  eventId: string
  onClose: () => void
  onSaved: (event: EventConfig) => void
}

/**
 * "Edit details" (#232): the New event form, filled in with the event's
 * details, dates included. Saving keeps the event's id (so links to it
 * still work) and moves its schedule to the new dates.
 */
export function EditEventPage({ eventId, onClose, onSaved }: Props) {
  const { status, user } = useAuth()
  const { allEvents, isStored, loaded } = useEvents()
  const event = allEvents.find(e => e.id === eventId)
  // Set once the form has been shown: a sign-in that lapses mid-edit keeps
  // the form (and what's typed in it) under a notice, instead of swapping
  // it for the sign-in prompt.
  const wasEditing = useRef(false)

  let content: React.ReactNode
  if (status === 'loading' || (!loaded && (!event || isStored(eventId)))) {
    // Wait for the fresh list, so the form never starts from a stale copy.
    content = <div className="h-40 animate-pulse rounded-2xl border border-gray-200 bg-white" aria-busy="true" aria-label="Loading" />
  } else if (status !== 'signed-in' && !wasEditing.current) {
    content = <SignInPrompt reason="edit events" />
  } else if (status === 'signed-in' && !user?.roles.includes(ADMIN_ROLE)) {
    content = <Notice title="Only admins can edit events." detail={`Signed in as ${user?.email}`} />
  } else if (!event) {
    content = <Notice title="This event doesn’t exist" detail="It may have been deleted." />
  } else if (!isStored(event.id)) {
    content = <Notice title="Test events can’t be edited." detail="They ship with the app." />
  } else {
    wasEditing.current = true
    content = (
      <>
        {status !== 'signed-in' && (
          <div className="mb-4">
            <SignedOutNotice detail="Sign in again to save. Your changes are kept." />
          </div>
        )}
        <EventDetailsForm key={event.id} event={event} onDone={onSaved} />
      </>
    )
  }

  return <FormPage title="Edit details" subtitle={event?.name} onClose={onClose}>{content}</FormPage>
}
