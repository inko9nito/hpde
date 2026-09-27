import type { ReactNode } from 'react'
import { CalendarDays, Car, Route } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppMenu } from './AppMenu'
import { AccountButton } from './AccountButton'

// The app's top-level sections (#274): Events (the list of events), Tracks
// (lap times by track layout) and Garage (coming soon), picked from a tab
// bar along the bottom, as in an iOS app. Pushed pages — an event, a
// track — slide in over them.

export type HomeTab = 'events' | 'tracks' | 'garage'

export const HOME_TAB_HASH: Record<HomeTab, string> = {
  events: '#/',
  tracks: '#/tracks',
  garage: '#/garage',
}

/** The tab a hash is the page of; null for anything else. */
export function homeTabFromHash(hash: string): HomeTab | null {
  const tab = (Object.keys(HOME_TAB_HASH) as HomeTab[]).find(t => HOME_TAB_HASH[t] === hash)
  return tab ?? null
}

/** The tab bar's height, above the safe area; pages leave this much room at the bottom. */
export const TAB_BAR_PX = 56

const TABS: readonly { id: HomeTab; label: string; Icon: LucideIcon }[] = [
  { id: 'events', label: 'Events', Icon: CalendarDays },
  { id: 'tracks', label: 'Tracks', Icon: Route },
  { id: 'garage', label: 'Garage', Icon: Car },
]

export function TabBar({ active }: { active: HomeTab }) {
  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-gray-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
    >
      <div className="mx-auto flex max-w-lg" style={{ height: TAB_BAR_PX }}>
        {TABS.map(({ id, label, Icon }) => {
          const current = id === active
          return (
            <a
              key={id}
              href={HOME_TAB_HASH[id]}
              aria-current={current ? 'page' : undefined}
              className={`flex flex-1 flex-col items-center justify-center gap-1 font-rubik text-[11px] transition-colors ${
                current ? 'font-medium text-gray-900' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={22} strokeWidth={current ? 2.25 : 2} aria-hidden="true" />
              {label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}

/** A tab's title, with the app menu and account button across from it; `children` go under it. */
export function HomeHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-rubik text-2xl font-bold leading-tight text-gray-900">{title}</h1>
        <div className="flex shrink-0 items-center gap-1">
          <AppMenu />
          <AccountButton reserveSpace={false} />
        </div>
      </div>
      {children}
    </div>
  )
}

/** The Garage tab: coming soon (#120). */
export function GarageTab() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">
        <HomeHeader title="Garage" />
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
          <Car size={22} className="mx-auto text-gray-400" aria-hidden="true" />
          <p className="mt-2 text-sm font-medium text-gray-700">Coming soon</p>
          <p className="mt-1 text-xs text-gray-400">
            Your car’s setup, parts and service history, event by event.
          </p>
        </div>
      </div>
    </div>
  )
}
