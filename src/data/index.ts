// TODO delete when done: the test-today entry (schedule + wrapper) is only
// here to preview the widget's "now" line on today's date. Remove those two
// files and the import + array entry below once done testing.
import testToday from './events/2026-09-11_test-today'
import msrc17Sep from './events/2026-09-11_msrc-1-7'
import msrScca from './events/2026-09-13_msr-scca'
import msrc17 from './events/2026-06-06_msrc-1-7'
import msrc31 from './events/2025-11-07_msrc-3-1'
import ecr27 from './events/2026-05-30_ecr-2-7'
import type { EventConfig } from '../types'

export const EVENTS: EventConfig[] = [testToday, msrc17Sep, msrScca, msrc17, ecr27, msrc31]
