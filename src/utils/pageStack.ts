// Which pages sit under which (#274). An event's page and a track page can
// each be opened from the other — My notes' All time best card opens the
// track page over the event; a track page's event cards open the event
// over the track page — and Back returns to the one underneath. An event
// opened from a More page (#345: Instructor evaluations) goes over that,
// too. The hash only names the page on top, so what's under it is worked
// out from the way there, one hash change at a time.

export interface PageStack {
  hash: string
  /** The event whose page is under the track page: the one it was opened from. */
  eventUnderTrack: string | null
  /** The track page under the event's page: the one it was opened from. */
  trackUnderEvent: string | null
  /** The More page (its hash) under the event's page, the one it was opened from (#345) — under a track page opened from that event too. */
  moreUnderEvent: string | null
}

export interface HashReader {
  /** The event a hash is the page of, or one of its sub-pages (share, editors). */
  event(hash: string): string | null
  /** The track page a hash is. */
  track(hash: string): string | null
  /** The More page a hash is (#345). */
  more(hash: string): string | null
}

export function emptyPageStack(hash: string): PageStack {
  return { hash, eventUnderTrack: null, trackUnderEvent: null, moreUnderEvent: null }
}

/** The stack once `hash` is on top. */
export function nextPageStack(prev: PageStack, hash: string, read: HashReader): PageStack {
  const slug = read.track(hash)
  const eventId = read.event(hash)
  const prevSlug = read.track(prev.hash)
  const prevEventId = read.event(prev.hash)

  if (slug !== null) {
    // Back from an event opened from this track page.
    if (prevEventId !== null && prev.trackUnderEvent === slug) return emptyPageStack(hash)
    // Opened from an event's page: over it — and over whatever the event was over.
    if (prevEventId !== null) {
      return { hash, eventUnderTrack: prevEventId, trackUnderEvent: null, moreUnderEvent: prev.moreUnderEvent }
    }
    return emptyPageStack(hash)
  }

  if (eventId !== null) {
    // The same event, or one of its sub-pages: nothing moves.
    if (prevEventId === eventId) return { ...prev, hash }
    // Back to the event the track page was opened from, still over what it was over.
    if (prevSlug !== null && prev.eventUnderTrack === eventId) return { ...emptyPageStack(hash), moreUnderEvent: prev.moreUnderEvent }
    // Opened from a track page: over it.
    if (prevSlug !== null) return { ...emptyPageStack(hash), trackUnderEvent: prevSlug }
    // Opened from a More page: over it.
    if (read.more(prev.hash) !== null) return { ...emptyPageStack(hash), moreUnderEvent: prev.hash }
  }
  return emptyPageStack(hash)
}
