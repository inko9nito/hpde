import type { EventConfig } from '../../types'
import { parseScheduleMD } from '../../utils/parseSchedule'
import src from '../schedules/2026-05-30_ecr-2-7.md?raw'
import mapImage from '../maps/ecr.png'

const event: EventConfig = { ...parseScheduleMD('2026-05-30_ecr-2-7', src), mapImage }
export default event
