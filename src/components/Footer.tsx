import { formatBuildTime } from '../utils/time'

/** Landing page only (#273): the build date. The iOS widget and Share
 *  links moved to the landing page's menu. */
export function Footer() {
  return (
    <div className="mt-6 pb-8 text-center font-mono text-[10px] text-gray-400">
      build {formatBuildTime(__BUILD_TIME__)}
    </div>
  )
}
