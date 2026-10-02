import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronRight, Menu, Share, Smartphone, UserRoundCog } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { ICON_BUTTON } from './iconButton'
import { SwitchDriverSheet } from './SwitchDriverSheet'
import { driverName } from '../data/drivers'
import { ADMIN_ROLE } from './NewEventPage'
import { SHARE_HASH } from './ShareSheet'

const ITEMS = [
  { href: SHARE_HASH, label: 'Share', Icon: Share },
  { href: '#/widget-setup', label: 'Get iOS widget', Icon: Smartphone },
] as const

const ITEM = 'flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left text-[15px] font-medium text-gray-900 transition-colors hover:bg-gray-50 active:bg-gray-100'

/**
 * The landing page's menu button (#273). Opens a sheet from the bottom
 * with the app-wide pages — Share, a sheet of its own (#411), and the iOS
 * widget, which slides up from the bottom too (#278). Admins also get Switch driver (#396):
 * who to act as everywhere — themselves, the test account (#309), or
 * another driver.
 */
export function AppMenu() {
  const [open, setOpen] = useState(false)
  const [switching, setSwitching] = useState(false)
  const { status, user, actingAs } = useAuth()
  const isAdmin = status === 'signed-in' && !!user?.roles.includes(ADMIN_ROLE)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        className={ICON_BUTTON}
      >
        <Menu size={22} strokeWidth={2.25} />
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="sheet-up relative w-full max-w-lg rounded-t-2xl bg-white px-2 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl"
          >
            <div className="mx-auto mb-2 mt-2 h-1 w-9 rounded-full bg-gray-300" aria-hidden="true" />
            <nav>
              {ITEMS.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={ITEM}
                >
                  <Icon size={20} aria-hidden="true" className="shrink-0 text-gray-500" />
                  <span className="flex-1">{label}</span>
                  <ChevronRight size={18} aria-hidden="true" className="shrink-0 text-gray-300" />
                </a>
              ))}
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    setSwitching(true)
                  }}
                  className={ITEM}
                >
                  <UserRoundCog size={20} aria-hidden="true" className="shrink-0 text-gray-500" />
                  <span className="flex-1">Switch driver</span>
                  <span className="max-w-[45%] truncate text-sm font-normal text-gray-500">{actingAs ? driverName(actingAs) : 'Me'}</span>
                </button>
              )}
            </nav>
          </div>
        </div>,
        document.body,
      )}
      {switching && createPortal(<SwitchDriverSheet onClose={() => setSwitching(false)} />, document.body)}
    </>
  )
}
