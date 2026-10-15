// Which pages sit under which (#274). An event's page and a track page can
// each be opened from the other — My notes' All time best card opens the
// track page over the event; a track page's event cards open the event
// over the track page — and Back returns to the one underneath. An event
// opened from a More page (#345: Instructor evaluations) goes over that,
// too. A track's own page (#346) goes under a layout's page or an event
// opened from it, and stays under an event opened from that layout's page.
// The hash only names the page on top, so what's under it is worked out
// from the way there, one hash change at a time.

export interface PageStack {
  hash: string
  /** The event whose page is under the track page: the one it was opened from. */
  eventUnderTrack: string | null
  /** The track page under the event's page: the one it was opened from. */
  trackUnderEvent: string | null
  /** The More page (its hash) under the event's page, the one it was opened from (#345) — under a track page opened from that event too. */
  moreUnderEvent: string | null
  /** The track's page (#346) under the layout's page or the event's, the one they were opened from. */
  trackPageUnder: string | null
}

export interface HashReader {
  /** The event a hash is the page of, or one of its sub-pages (share, editors). */
  event(hash: string): string | null
  /** The (layout's) track page a hash is. */
  track(hash: string): string | null
  /** The track's own page a hash is (#346). */
  trackPage(hash: string): string | null
  /** The More page a hash is (#345). */
  more(hash: string): string | null
}

export function emptyPageStack(hash: string): PageStack {
  return { hash, eventUnderTrack: null, trackUnderEvent: null, moreUnderEvent: null, trackPageUnder: null }
}

/** The stack once `hash` is on top. */
export function nextPageStack(prev: PageStack, hash: string, read: HashReader): PageStack {
  const slug = read.track(hash)
  const eventId = read.event(hash)
  const prevSlug = read.track(prev.hash)
  const prevEventId = read.event(prev.hash)
  const prevTrackPage = read.trackPage(prev.hash)

  if (slug !== null) {
    // Back from an event opened from this track page.
    if (prevEventId !== null && prev.trackUnderEvent === slug) return { ...emptyPageStack(hash), trackPageUnder: prev.trackPageUnder }
    // Opened from an event's page: over it — and over whatever the event was over.
    if (prevEventId !== null) {
      return { hash, eventUnderTrack: prevEventId, trackUnderEvent: null, moreUnderEvent: prev.moreUnderEvent, trackPageUnder: prev.trackPageUnder }
    }
    // Opened from its track's page (#346): over it.
    if (prevTrackPage !== null) return { ...emptyPageStack(hash), trackPageUnder: prevTrackPage }
    return emptyPageStack(hash)
  }

  if (eventId !== null) {
    // The same event, or one of its sub-pages: nothing moves.
    if (prevEventId === eventId) return { ...prev, hash }
    // Back to the event the track page was opened from, still over what it was over.
    if (prevSlug !== null && prev.eventUnderTrack === eventId) {
      return { ...emptyPageStack(hash), moreUnderEvent: prev.moreUnderEvent, trackPageUnder: prev.trackPageUnder }
    }
    // Opened from a track page: over it, and over the track's page under that.
    if (prevSlug !== null) return { ...emptyPageStack(hash), trackUnderEvent: prevSlug, trackPageUnder: prev.trackPageUnder }
    // Opened from a track's own page (#346): over it.
    if (prevTrackPage !== null) return { ...emptyPageStack(hash), trackPageUnder: prevTrackPage }
    // Opened from a More page: over it.
    if (read.more(prev.hash) !== null) return { ...emptyPageStack(hash), moreUnderEvent: prev.hash }
  }
  return emptyPageStack(hash)
}
