import type { EventConfig } from '../../types'
import { parseScheduleMD } from '../../utils/parseSchedule'
import src from '../schedules/2026-09-11_msrc-1-7.md?raw'

const event: EventConfig = parseScheduleMD('2026-09-11_msrc-1-7', src)
export default event
