import { Sheet } from './Sheet'
import { ShareLink } from './ShareLink'
import { SITE_URL, newSiteUrl } from '../utils/siteMoved'

export const SHARE_HASH = '#/share'
const EVENT_HASH_PREFIX = '#/event/'
const EVENT_SHARE_SUFFIX = '/share'

/** Sharing one event, from its "…" menu (#273). Sits under the event's
 *  own route, so the event page stays open beneath it. */
export function eventShareHash(eventId: string): string {
  return `${EVENT_HASH_PREFIX}${encodeURIComponent(eventId)}${EVENT_SHARE_SUFFIX}`
}

export function isEventShareHash(hash: string): boolean {
  return hash.startsWith(EVENT_HASH_PREFIX) && hash.endsWith(EVENT_SHARE_SUFFIX)
}

/** Link to one event, always on the live site — even when opened on a
 *  deploy preview or localhost. */
export function eventShareUrl(eventId: string): string {
  return newSiteUrl(`${EVENT_HASH_PREFIX}${encodeURIComponent(eventId)}`)
}

/**
 * Sharing the site, from the app menu, or one event, from its "…" menu
 * (#273): the same sheet a car is shared in (#411), sliding up over the
 * page it's shared from, which stays where it was underneath.
 */
export function ShareSheet({ event, onClose }: {
  /** The event shared; without one, the site's home page. */
  event?: { id: string; name?: string }
  onClose: () => void
}) {
  const title = event ? 'Share this event' : 'Share this app'
  return (
    <Sheet
      label={title}
      onClose={onClose}
      centerHeading
      data-share-sheet
      heading={<h2 className="text-lg font-bold text-gray-900">{title}</h2>}
    >
      <ShareLink
        url={event ? eventShareUrl(event.id) : SITE_URL}
        shareTitle={event?.name ?? 'HPDE Events'}
      />
    </Sheet>
  )
}
