import { useEffect, useState } from 'react'
import { Lock } from 'lucide-react'
import { FormPage } from './NewEventPage'
import { Notice } from './Notice'
import { SignInPrompt } from './SignInPrompt'
import { CarTile } from './CarRow'
import { useAuth } from '../auth/AuthContext'
import { useGarage } from '../data/GarageContext'
import { carTitle } from '../utils/garage'
import type { CarInvite } from '../utils/garage'

/**
 * An invite to share a car (#398), opened from its link: whose car, and
 * Join, which puts it in this driver's garage too. Slides up, with Cancel.
 */
export function JoinCarPage({ token, onClose, onJoined }: {
  token: string
  onClose: () => void
  /** Joined (or theirs already): the car's id. */
  onJoined: (carId: string, joined: boolean) => void
}) {
  const { status: authStatus } = useAuth()
  const garage = useGarage()
  const ready = garage.status !== 'off'
  const [invite, setInvite] = useState<CarInvite | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const [joining, setJoining] = useState(false)
  const [joinFailure, setJoinFailure] = useState<string | null>(null)

  useEffect(() => {
    if (!ready) return
    let cancelled = false
    garage.readInvite(token).then(
      found => { if (!cancelled) setInvite(found) },
      err => { if (!cancelled) setFailure((err as Error).message) },
    )
    return () => { cancelled = true }
  }, [token, ready])

  async function join() {
    if (!invite) return
    if (invite.carId) return onJoined(invite.carId, false)
    setJoining(true)
    setJoinFailure(null)
    try {
      onJoined(await garage.join(token), true)
    } catch (err) {
      setJoinFailure((err as Error).message)
      setJoining(false)
    }
  }

  const page = { title: 'Shared car', onCancel: onClose, cancelDisabled: joining }
  let content: React.ReactNode
  if (authStatus !== 'signed-in') {
    content = authStatus === 'loading'
      ? <div className="h-40 animate-pulse rounded-2xl border border-gray-200 bg-white" aria-busy="true" aria-label="Loading" />
      : <SignInPrompt reason="add this car to your garage" privacyNote={false} />
  } else if (failure) {
    content = <Notice title={failure} detail="Ask them to share the car again, for a new link." />
  } else if (!invite) {
    content = <div className="h-40 animate-pulse rounded-2xl border border-gray-200 bg-white" aria-busy="true" aria-label="Loading the invite" />
  } else {
    const title = carTitle(invite.car)
    content = (
      <div className="flex flex-col gap-4">
        <section aria-label="The car" className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <CarTile size={48} />
            <div className="min-w-0">
              <h2 className="truncate text-base font-bold text-gray-900">{invite.car.nickname ?? title}</h2>
              {invite.car.nickname && <p className="truncate text-[13px] text-gray-500">{title}</p>}
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-700">
            {invite.carId
              ? 'It’s in your garage already.'
              : <><span className="font-semibold">{invite.from}</span> is sharing this car with you.</>}
          </p>
          {!invite.carId && (
            <p className="mt-2 text-sm text-gray-500">
              Join, and it’s in your garage too: you both keep up its details, photo and change log. Each of you adds it to your own events, with your own tire pressures, and its page shows who drove it where.
            </p>
          )}
        </section>
        {joinFailure && <p role="alert" className="-mt-1 px-1 text-xs text-red-700">{joinFailure}</p>}
        <p className="flex items-center justify-center gap-1 text-[11px] text-gray-400">
          <Lock size={11} aria-hidden="true" />
          Only its drivers and admins can see this car.
        </p>
      </div>
    )
  }

  return (
    <div role="dialog" aria-label="Shared car">
      <FormPage
        {...page}
        save={{
          label: invite?.carId ? 'Open' : joining ? 'Joining…' : 'Join',
          disabled: authStatus !== 'signed-in' || !invite || joining,
          onClick: join,
        }}
      >
        {content}
      </FormPage>
    </div>
  )
}
