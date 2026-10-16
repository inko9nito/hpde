import { useRef } from 'react'
import { ExternalLink } from 'lucide-react'
import { Sheet } from './Sheet'
import type { Dismiss } from './Sheet'

export interface MapsApp {
  name: string
  href: string
}

/**
 * The maps apps a place opens in (#346). A web page can't ask iOS which
 * maps apps there are, or show its own "Open with" list, so these are
 * the common ones, each by a link that opens its app when it's installed
 * (iOS hands maps.apple.com, google.com/maps and waze.com links to their
 * apps) and the app's website when it isn't.
 */
export function mapsApps(name: string, address: string): MapsApp[] {
  const q = encodeURIComponent
  return [
    { name: 'Apple Maps', href: `https://maps.apple.com/?address=${q(address)}&q=${q(name)}` },
    { name: 'Google Maps', href: `https://www.google.com/maps/search/?api=1&query=${q(`${name}, ${address}`)}` },
    { name: 'Waze', href: `https://waze.com/ul?q=${q(address)}&navigate=yes` },
  ]
}

/**
 * Which maps app to open a track's address in (#346), as iOS asks when
 * there's more than one: a sheet from the bottom, as Share is (#411).
 * Picking one opens it and closes the sheet.
 */
export function MapsSheet({ name, address, onClose }: { name: string; address: string; onClose: () => void }) {
  const dismissRef = useRef<Dismiss | null>(null)
  return (
    <Sheet
      label="Open in"
      onClose={onClose}
      dismissRef={dismissRef}
      centerHeading
      data-maps-sheet
      heading={<h2 className="text-lg font-bold text-gray-900">Open in</h2>}
    >
      <p className="mt-1 text-center text-sm text-gray-500">{address}</p>
      <ul aria-label="Maps apps" className="mt-4 flex flex-col gap-2 pb-2">
        {mapsApps(name, address).map(app => (
          <li key={app.name}>
            <a
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => dismissRef.current?.()}
              className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-3 py-3 text-left transition-colors hover:bg-gray-50"
            >
              <span className="min-w-0 flex-1 truncate text-[15px] font-medium text-gray-900">{app.name}</span>
              <ExternalLink size={16} className="shrink-0 text-gray-400" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </Sheet>
  )
}
