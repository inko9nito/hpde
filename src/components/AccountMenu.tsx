import { useEffect } from 'react'
import { ChevronRight, LogOut, UserRoundCog, UserRoundPen } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { driverName } from '../data/drivers'
import { ADMIN_ROLE } from './NewEventPage'
import { Avatar } from './Avatar'
import { BottomSheet } from './Sheet'

const ITEM = 'flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left text-[15px] font-medium transition-colors hover:bg-gray-50 active:bg-gray-100'

/**
 * The signed-in driver's menu (#416), from their picture in the header: a
 * sheet from the bottom with who they are, then Edit profile, Switch
 * driver for admins (#396) — who to act as everywhere — and Log out. It
 * replaced the Identity widget's own "Logged in" panel, and the menu
 * beside the picture that held Switch driver (#273); that menu's Share and
 * iOS widget are tiles on the More tab now.
 */
export function AccountMenu({ onClose, onEditProfile, onSwitchDriver }: {
  onClose: () => void
  onEditProfile: () => void
  onSwitchDriver: () => void
}) {
  const { user, actingAs, signOut } = useAuth()
  const isAdmin = !!user?.roles.includes(ADMIN_ROLE)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!user) return null
  const name = user.name ?? user.email
  return (
    <BottomSheet label="Account" onClose={onClose} className="px-2">
      {/* Who's signed in: as others see them, then the account it is. */}
      <div className="flex items-center gap-3 px-3 pb-3 pt-1">
        <Avatar name={name} url={user.avatarUrl} size={48} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[17px] font-semibold text-gray-900">{name}</div>
          {user.name && <div className="truncate text-sm text-gray-500">{user.email}</div>}
        </div>
      </div>
      <div className="mx-3 border-t border-gray-100" aria-hidden="true" />
      <nav className="pt-1">
        <button type="button" onClick={onEditProfile} className={`${ITEM} text-gray-900`}>
          <UserRoundPen size={20} aria-hidden="true" className="shrink-0 text-gray-500" />
          <span className="flex-1">Edit profile</span>
          <ChevronRight size={18} aria-hidden="true" className="shrink-0 text-gray-300" />
        </button>
        {isAdmin && (
          <button type="button" onClick={onSwitchDriver} className={`${ITEM} text-gray-900`}>
            <UserRoundCog size={20} aria-hidden="true" className="shrink-0 text-gray-500" />
            <span className="flex-1">Switch driver</span>
            <span className="max-w-[45%] truncate text-sm font-normal text-gray-500">{actingAs ? driverName(actingAs) : 'Me'}</span>
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            onClose()
            signOut()
          }}
          className={`${ITEM} text-red-600`}
        >
          <LogOut size={20} aria-hidden="true" className="shrink-0" />
          <span className="flex-1">Log out</span>
        </button>
      </nav>
    </BottomSheet>
  )
}
