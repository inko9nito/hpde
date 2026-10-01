import { useRef } from 'react'
import { useAuth } from '../auth/AuthContext'
import { useEvents } from '../data/EventsContext'
import { ADMIN_ROLE, EventDetailsForm, FormPage } from './NewEventPage'
import { SignInPrompt } from './SignInPrompt'
import { Notice, SignedOutNotice } from './Notice'
import type { EventConfig } from '../types'

// A sub-page of the event's (#368), like Share: it slides up over the event's page.
export function editEventHash(eventId: string): string {
  return `#/event/${encodeURIComponent(eventId)}/edit`
}

export function eventIdFromEditEventHash(hash: string): string | null {
  const m = /^#\/event\/([^/]+)\/edit$/.exec(hash)
  return m ? decodeURIComponent(m[1]) : null
}

interface Props {
  eventId: string
  onClose: () => void
  onSaved: (event: EventConfig) => void
}

/**
 * "Edit details" (#232): the New event form, filled in with the event's
 * details, dates included. Saving keeps the event's id (so links to it
 * still work) and moves its schedule to the new dates. It slides up over
 * the event's page, Cancel and Save across its top (#368).
 */
export function EditEventPage({ eventId, onClose, onSaved }: Props) {
  const { status, user } = useAuth()
  const { allEvents, isStored, loaded } = useEvents()
  const event = allEvents.find(e => e.id === eventId)
  // Set once the form has been shown: a sign-in that lapses mid-edit keeps
  // the form (and what's typed in it) under a notice, instead of swapping
  // it for the sign-in prompt.
  const wasEditing = useRef(false)

  const page = { title: 'Edit details', subtitle: event?.name, onCancel: onClose }
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
    return (
      <EventDetailsForm
        key={event.id}
        {...page}
        event={event}
        onDone={onSaved}
        notice={status !== 'signed-in' && (
          <div className="mb-4">
            <SignedOutNotice detail="Sign in again to save. Your changes are kept." />
          </div>
        )}
      />
    )
  }

  return <FormPage {...page} save={{ label: 'Save', disabled: true }}>{content}</FormPage>
}
