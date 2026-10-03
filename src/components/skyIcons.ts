import { Cloud, CloudLightning, CloudRain, CloudSun, Sun } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Sky } from '../utils/conditions'

/** Each sky's icon (#347), wherever the app shows the weather. */
export const SKY_ICONS: Record<Sky, LucideIcon> = {
  sunny: Sun,
  partly: CloudSun,
  cloudy: Cloud,
  rain: CloudRain,
  storm: CloudLightning,
}
