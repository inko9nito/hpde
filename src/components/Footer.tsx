import { formatBuildTime } from '../utils/time'

/** Landing page only (#273): the build date. The iOS widget and Share
 *  links moved to the landing page's menu. Under it, the credit the race
 *  car icon's licence asks for (#417). */
export function Footer() {
  return (
    <div className="mt-6 pb-8 text-center font-mono text-[10px] text-gray-400">
      build {formatBuildTime(__BUILD_TIME__)}
      <p className="mt-1">
        Race car icon by Skoll,{' '}
        <a href="https://game-icons.net" className="underline">game-icons.net</a>,{' '}
        <a href="https://creativecommons.org/licenses/by/3.0/" className="underline">CC BY 3.0</a>
      </p>
    </div>
  )
}
