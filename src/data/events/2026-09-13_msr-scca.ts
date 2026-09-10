import type { EventConfig } from '../../types'
import { parseScheduleMD } from '../../utils/parseSchedule'
import src from '../schedules/2026-09-13_msr-scca.md?raw'

const event: EventConfig = parseScheduleMD('2026-09-13_msr-scca', src)
export default event
