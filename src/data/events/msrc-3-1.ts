import type { EventConfig } from '../../types'
import { parseScheduleMD } from '../../utils/parseSchedule'
import src from '../schedules/2025-11-07_msrc-3-1.md?raw'

const event: EventConfig = parseScheduleMD('msrc-3-1', src)
export default event
