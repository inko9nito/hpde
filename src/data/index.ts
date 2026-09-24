import testLive from './events/test-live'
import type { EventConfig } from '../types'

// Test events that ship with the app instead of living in the events store
// (#232). Never listed — reachable only by their URL (test-live: a schedule
// that's always happening today).
export const FIXTURE_EVENTS: EventConfig[] = [testLive]
