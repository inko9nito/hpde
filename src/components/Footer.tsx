import { formatBuildTime } from '../utils/time'

export function Footer() {
  return (
    <div className="mt-6 pb-8 text-center text-xs">
      <div>
        <a href="#/widget-setup" className="text-gray-600 underline hover:text-gray-800">
          iOS widget
        </a>
        {' · '}
        <a href="#/share" className="text-gray-600 underline hover:text-gray-800">
          Share
        </a>
      </div>
      <div className="mt-4 font-mono text-[10px] text-gray-300">
        build {formatBuildTime(__BUILD_TIME__)}
      </div>
    </div>
  )
}
