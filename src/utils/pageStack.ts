// Which pages sit under which (#274). An event's page and a track page can
// each be opened from the other — My notes' All time best card opens the
// track page over the event; a track page's event cards open the event
// over the track page — and Back returns to the one underneath. The hash
// only names the page on top, so what's under it is worked out from the
// way there, one hash change at a time.

export interface PageStack<Driver> {
  hash: string
  /** The event whose page is under the track page: the one it was opened from. */
  eventUnderTrack: string | null
  /** The track page under the event's page: the one it was opened from. */
  trackUnderEvent: string | null
  /** Whose laps the track page shows: another driver's, when opened from theirs on an event (#288). */
  trackDriver: Driver | null
}

export interface HashReader {
  /** The event a hash is the page of, or one of its sub-pages (share, editors). */
  event(hash: string): string | null
  /** The track page a hash is. */
  track(hash: string): string | null
}

export function emptyPageStack<Driver>(hash: string): PageStack<Driver> {
  return { hash, eventUnderTrack: null, trackUnderEvent: null, trackDriver: null }
}

/** The stack once `hash` is on top. `driver` is the one picked on the event page, if any. */
export function nextPageStack<Driver>(
  prev: PageStack<Driver>,
  hash: string,
  driver: Driver | null,
  read: HashReader,
): PageStack<Driver> {
  const slug = read.track(hash)
  const eventId = read.event(hash)
  const prevSlug = read.track(prev.hash)
  const prevEventId = read.event(prev.hash)

  if (slug !== null) {
    // Back from an event opened from this track page.
    if (prevEventId !== null && prev.trackUnderEvent === slug) {
      return { hash, eventUnderTrack: null, trackUnderEvent: null, trackDriver: prev.trackDriver }
    }
    // Opened from an event's page: over it, showing the laps it showed.
    if (prevEventId !== null) return { hash, eventUnderTrack: prevEventId, trackUnderEvent: null, trackDriver: driver }
    return emptyPageStack(hash)
  }

  if (eventId !== null) {
    // The same event, or one of its sub-pages: nothing moves.
    if (prevEventId === eventId) return { ...prev, hash }
    // Back to the event the track page was opened from.
    if (prevSlug !== null && prev.eventUnderTrack === eventId) return emptyPageStack(hash)
    // Opened from a track page: over it.
    if (prevSlug !== null) {
      return { hash, eventUnderTrack: null, trackUnderEvent: prevSlug, trackDriver: prev.trackDriver }
    }
  }
  return emptyPageStack(hash)
}
