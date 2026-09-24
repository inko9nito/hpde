import ecr from './maps/ecr.png'
import msrc17 from './maps/msrc-1-7.jpg'
import msrc31 from './maps/msrc-3-1.png'

// Track map photos, by track icon id (an event's `trackId`). They're build
// assets (hashed URLs), so events don't store them: an event shows the map
// for its track, if there is one.
export const TRACK_MAPS: Record<string, string> = {
  'ecr-2-7': ecr,
  'msrc-1-7': msrc17,
  'msrc-3-1': msrc31,
}
