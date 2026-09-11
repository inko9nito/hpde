import type { EventConfig } from '../../types'
import { parseScheduleMD } from '../../utils/parseSchedule'
import src from '../schedules/2026-09-11_test-today.md?raw'

const event: EventConfig = parseScheduleMD('2026-09-11_test-today', src)
export default event
