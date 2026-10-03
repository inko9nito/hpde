import { formatBuildTime } from '../utils/time'

/** The build date, under the More tab's tiles (#395) — it was under the
 *  events list (#273). */
export function Footer() {
  return (
    <div className="mt-6 pb-8 text-center font-mono text-[10px] text-gray-400">
      build {formatBuildTime(__BUILD_TIME__)}
    </div>
  )
}
