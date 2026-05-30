import type { EventConfig } from '../../types'
import { parseScheduleMD } from '../../utils/parseSchedule'
import src from '../schedules/2026-05-30_ecr-2-7.md?raw'

const event: EventConfig = parseScheduleMD('ecr-2-7', src)
export default event
