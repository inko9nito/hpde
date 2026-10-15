import msrcPhoto from './track-photos/msrc.jpg'
import ecrPhoto from './track-photos/ecr.jpg'

// The tracks the app knows (#346): one record per track, not per layout —
// its name, where it is, its photo and the shape drawn over it. An event
// finds its track by its track icon id's first part ("msrc" of
// "msrc-1-7"). The first step of #440, which moves these off the code and
// lets an admin edit them.

export interface TrackInfo {
  /** "msrc": its track page's id, and the start of its layouts' icon ids. */
  id: string
  /** "Motorsport Ranch". */
  name: string
  /** "Cresson, TX". */
  city: string
  /** Its street address, for Maps. */
  address: string
  /** Where it is, for the weather (#347). */
  lat: number
  lon: number
  tz: string
  /** An aerial photo, 1280 × 728 (#346). */
  photo: string
  /** Which part of the photo shows on a phone, across: CSS object-position's x. */
  photoX: string
  /** The layout drawn over the photo: its full course. */
  shape: string
}

export const TRACKS: Record<string, TrackInfo> = {
  msrc: {
    id: 'msrc',
    name: 'Motorsport Ranch',
    city: 'Cresson, TX',
    address: '9012 Performance Ct, Cresson, TX 76035',
    lat: 32.448,
    lon: -97.616,
    tz: 'America/Chicago',
    // Upscaled 2× from the 640 px original (#346).
    photo: msrcPhoto,
    // Its paddock and pits, at the left, as in the design (HPDE Figma 2079:1128).
    photoX: '0%',
    shape: 'msrc-3-1',
  },
  ecr: {
    id: 'ecr',
    name: 'Eagles Canyon Raceway',
    city: 'Decatur, TX',
    address: '7629 N FM 51, Decatur, TX 76234',
    lat: 33.264,
    lon: -97.581,
    tz: 'America/Chicago',
    photo: ecrPhoto,
    photoX: '35%',
    shape: 'ecr-2-7',
  },
}

/** The track a track icon id ("msrc-1-7") is a layout of. */
export function trackInfo(trackId: string | undefined): TrackInfo | undefined {
  const id = trackId?.match(/^([a-z]+)-/)?.[1]
  return id ? TRACKS[id] : undefined
}
