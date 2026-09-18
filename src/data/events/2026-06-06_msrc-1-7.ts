import type { EventConfig } from '../../types'
import { parseScheduleMD } from '../../utils/parseSchedule'
import src from '../schedules/2026-06-06_msrc-1-7.md?raw'
import mapImage from '../maps/msrc-1-7.jpg'

const event: EventConfig = { ...parseScheduleMD('2026-06-06_msrc-1-7', src), mapImage }
export default event
