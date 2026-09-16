import type { Car } from '../../types'
import { parseCarMD } from '../../utils/parseCar'
import veraCarSrc from './vera-car.md?raw'

export const CARS: Car[] = [parseCarMD('vera-car', veraCarSrc)]
