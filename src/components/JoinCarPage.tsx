import { useEffect, useState } from 'react'
import { FormPage } from './NewEventPage'
import { Notice } from './Notice'
import { SignInPrompt } from './SignInPrompt'
import { Avatar } from './Avatar'
import { CarHero } from './CarRow'
import { useAuth } from '../auth/AuthContext'
import { useGarage, useInvitePhoto } from '../data/GarageContext'
import type { CarInvite } from '../utils/garage'

/**
 * An invite to share a car (#398), opened from its link: who it's from, the
 * car front and center as the Garage shows it, and Accept — which puts it in
 * this driver's garage too — or Decline (#410). Slides up, with Cancel.
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
  const photo = useInvitePhoto(token, invite)
  const big = 'flex min-h-12 flex-1 items-center justify-center rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors disabled:opacity-50'
  let content: React.ReactNode
  if (authStatus !== 'signed-in') {
    content = authStatus === 'loading'
      ? <div className="h-40 animate-pulse rounded-2xl border border-gray-200 bg-white" aria-busy="true" aria-label="Loading" />
      : <SignInPrompt reason="add this car to your garage" />
  } else if (failure) {
    content = <Notice title={failure} detail="Ask them to share the car again, for a new link." />
  } else if (!invite) {
    content = (
      <div className="flex flex-col gap-4" aria-busy="true" aria-label="Loading the invite">
        <div className="mx-auto h-5 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="aspect-[16/9] animate-pulse rounded-2xl bg-gray-200" />
      </div>
    )
  } else {
    content = (
      <div className="flex flex-col gap-5">
        {/* Who it's from, then the car, as the Garage shows it (#410). */}
        <p className="flex items-center justify-center gap-2.5 text-center text-[15px] text-gray-700">
          {!invite.carId && <Avatar name={invite.from} url={invite.fromAvatar} size={32} />}
          {invite.carId
            ? 'It’s in your garage already.'
            : <span><span className="font-semibold text-gray-900">{invite.from}</span> wants to share a car with you</span>}
        </p>
        <section aria-label="The car" className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <CarHero car={{ ...invite.car, ...(invite.photo ? { photo: invite.photo } : {}) }} src={photo} />
          {!invite.carId && (
            <p className="px-4 py-3.5 text-sm text-gray-600">
              Accept, and it’s in your garage too. You both keep its setup and history up to date, and each of you adds it to your own events.
            </p>
          )}
        </section>
        {joinFailure && <p role="alert" className="-mt-2 px-1 text-xs text-red-700">{joinFailure}</p>}
        <div className="flex gap-3">
          {invite.carId ? (
            <button onClick={join} className={`${big} bg-gray-900 text-white hover:bg-gray-700`}>Open the car</button>
          ) : (<>
            <button onClick={onClose} disabled={joining} className={`${big} border border-gray-300 bg-white text-gray-900 hover:bg-gray-50`}>Decline</button>
            <button onClick={join} disabled={joining} className={`${big} bg-gray-900 text-white hover:bg-gray-700`}>{joining ? 'Accepting…' : 'Accept'}</button>
          </>)}
        </div>
      </div>
    )
  }

  return (
    <div role="dialog" aria-label="Shared car" className="min-h-full">
      <FormPage {...page}>
        {content}
      </FormPage>
    </div>
  )
}
