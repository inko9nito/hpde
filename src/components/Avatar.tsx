import { useAuth } from '../auth/AuthContext'
import type { CarDriver } from '../utils/garage'

/**
 * Someone's picture, round — or, without one, the first letter of their
 * name on near-black, as the account button shows the signed-in driver.
 */
export function Avatar({ name, url, size = 24, className = '' }: {
  name: string
  url?: string | null
  size?: number
  /** A ring, to sit over the one beside it in a stack. */
  className?: string
}) {
  const style = { width: size, height: size }
  if (url) {
    return <img src={url} alt="" referrerPolicy="no-referrer" className={`shrink-0 rounded-full object-cover ${className}`} style={style} data-avatar />
  }
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full bg-gray-900 font-semibold leading-none text-white ${className}`}
      style={{ ...style, fontSize: Math.round(size * 0.43) }}
      data-avatar
    >
      {name.trim().charAt(0).toUpperCase()}
    </span>
  )
}

/** A few people's pictures, each a little over the last, as on a shared car (#410). */
export function AvatarStack({ people, size = 24, ring = 'ring-white' }: {
  people: { name: string; url?: string | null }[]
  size?: number
  /** The ring between them: the color of what they sit on. */
  ring?: string
}) {
  return (
    <span className="flex shrink-0 items-center" aria-hidden="true">
      {people.map((p, i) => (
        <Avatar key={i} name={p.name} url={p.url} size={size} className={`ring-2 ${ring} ${i ? '-ml-1.5' : ''}`} />
      ))}
    </span>
  )
}

/**
 * A car's driver's picture: theirs as the garage function sends it, or for
 * the signed-in driver — not an admin acting for someone — their own.
 */
export function useDriverAvatar(): (driver: CarDriver) => string | null {
  const { user, actingAs } = useAuth()
  return driver => driver.avatar ?? (driver.you && !actingAs ? user?.avatarUrl ?? null : null)
}
