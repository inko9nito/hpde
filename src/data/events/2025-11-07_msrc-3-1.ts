import type { EventConfig } from '../../types'
import { parseScheduleMD } from '../../utils/parseSchedule'
import src from '../schedules/2025-11-07_msrc-3-1.md?raw'
import mapImage from '../maps/msrc-3-1.png'

const event: EventConfig = { ...parseScheduleMD('2025-11-07_msrc-3-1', src), mapImage }
export default event
