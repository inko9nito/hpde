import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { PushPage } from './PushPage'
import { PageHeader } from './PageHeader'
import { Avatar } from './Avatar'
import { inputClass } from './SessionEvaluationForm'
import { useAuth } from '../auth/AuthContext'
import { driverName } from '../data/drivers'
import { MAX_PROFILE_NAME, PROFILE_URL, cleanProfileName } from '../utils/profile'
import { shrinkPhoto } from '../utils/photo'

/** A picture picked here, not saved yet: shown from the phone until Save. */
type PhotoChange = { blob: Blob; src: string } | 'remove' | null

const card = 'rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'
const outlineButton = 'rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-gray-50 disabled:opacity-50'

/** Puts a picture where anyone can see it, as a Google one is: its URL. */
async function uploadAvatar(authedFetch: ReturnType<typeof useAuth>['authedFetch'], blob: Blob): Promise<string> {
  let res: Response
  try {
    res = await authedFetch(`${PROFILE_URL}?avatar=1`, { method: 'PUT', headers: { 'Content-Type': blob.type || 'image/jpeg' }, body: blob })
  } catch {
    throw new Error('Couldn’t upload the picture. Check your connection and try again.')
  }
  const body = await res.json().catch(() => null)
  if (!res.ok || typeof body?.avatar !== 'string') throw new Error(body?.error ?? 'Couldn’t upload the picture. Try again in a moment.')
  return body.avatar
}

/**
 * Edit profile (#416), from the account menu: the name and picture this
 * app shows for them — to the drivers they share a car with (#398), and on
 * their own account button. Neither changes their Google account; left
 * blank or removed, Google's shows. A page sheet that slides up (#356,
 * #415), Cancel and Save across its top; nothing's saved until Save.
 * Always their own, even while an admin acts as someone else (#396).
 */
export function EditProfilePage({ onClosed }: {
  /** Once it's slid away. */
  onClosed: () => void
}) {
  const { user, actingAs, authedFetch, saveProfile } = useAuth()
  const id = useId()
  const [open, setOpen] = useState(true)
  const [name, setName] = useState(user?.profile.own.name ?? '')
  const [photo, setPhoto] = useState<PhotoChange>(null)
  const [busy, setBusy] = useState<'saving' | 'photo' | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const input = useRef<HTMLInputElement>(null)

  // A picked picture is shown from the phone; let it go once it's replaced.
  useEffect(() => () => {
    if (photo && photo !== 'remove') URL.revokeObjectURL(photo.src)
  }, [photo])

  const close = () => setOpen(false)
  const busyRef = useRef(busy)
  busyRef.current = busy
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !busyRef.current) setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const own = user?.profile.own ?? { name: null, avatarUrl: null }
  const signIn = user?.profile.signIn ?? { name: null, avatarUrl: null }
  const cleaned = cleanProfileName(name)
  const changed = photo !== null || ('value' in cleaned && cleaned.value !== own.name)
  // What it'll look like once saved.
  const shownName = ('value' in cleaned ? cleaned.value : null) ?? signIn.name ?? user?.email ?? ''
  const shownAvatar = photo === 'remove' ? signIn.avatarUrl : photo ? photo.src : own.avatarUrl ?? signIn.avatarUrl
  const hasOwnPhoto = photo ? photo !== 'remove' : !!own.avatarUrl

  async function run(what: 'saving' | 'photo', action: () => Promise<void>) {
    setBusy(what)
    setFailure(null)
    try {
      await action()
    } catch (err) {
      setFailure((err as Error).message)
    } finally {
      setBusy(null)
    }
  }

  function save() {
    if (!('value' in cleaned)) return
    run('saving', async () => {
      const avatarUrl = photo === 'remove' ? null : photo ? await uploadAvatar(authedFetch, photo.blob) : own.avatarUrl
      await saveProfile({ name: cleaned.value, avatarUrl })
      // Their own picture isn't used any more: tidy it away, if that works.
      if (photo === 'remove' && own.avatarUrl) authedFetch(`${PROFILE_URL}?avatar=1`, { method: 'DELETE' }).catch(() => {})
      close()
    })
  }

  return createPortal(
    <PushPage open={open} onExited={onClosed} raised from="bottom" sheet>
      {/* On its way out once closed: gone to a screen reader, and to taps. */}
      <div role="dialog" aria-label="Edit profile" aria-hidden={!open || undefined} inert={!open || undefined} className="min-h-full bg-gray-50" data-edit-profile>
        <PageHeader
          title="Edit profile"
          onCancel={close}
          cancelDisabled={!!busy}
          save={{ label: busy === 'saving' ? 'Saving…' : 'Save', disabled: !changed || !('value' in cleaned) || !!busy, onClick: save }}
        />

        <div className="mx-auto flex max-w-lg flex-col gap-5 px-3 pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-4 sm:pt-6">
          <section aria-label="Picture" className={`flex flex-col items-center ${card}`}>
            <input
              ref={input}
              type="file"
              accept="image/*"
              className="sr-only"
              aria-label="Choose a picture"
              // The button that opens it is what's read out and tapped.
              aria-hidden="true"
              tabIndex={-1}
              onChange={e => {
                const file = e.target.files?.[0]
                e.target.value = ''
                if (file) {
                  run('photo', async () => {
                    // Shown small, as a circle: no need for more than this.
                    const blob = await shrinkPhoto(file, 512)
                    setPhoto({ blob, src: URL.createObjectURL(blob) })
                  })
                }
              }}
            />
            <Avatar name={shownName} url={shownAvatar} size={96} />
            <div className="mt-4 flex w-full gap-2">
              <button onClick={() => input.current?.click()} disabled={!!busy} className={`flex-1 text-gray-900 ${outlineButton}`}>
                {busy === 'photo' ? 'Getting it ready…' : 'Choose picture'}
              </button>
              {hasOwnPhoto && (
                <button onClick={() => setPhoto('remove')} disabled={!!busy} className={`text-red-600 ${outlineButton}`}>
                  {signIn.avatarUrl ? 'Use Google’s' : 'Remove'}
                </button>
              )}
            </div>
          </section>

          <section aria-label="Name" className={`flex flex-col ${card}`}>
            <label htmlFor={`${id}-name`} className="text-xs font-medium text-gray-700">Name</label>
            <input
              id={`${id}-name`}
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={MAX_PROFILE_NAME}
              autoComplete="name"
              autoCapitalize="words"
              placeholder={signIn.name ?? 'Your name'}
              className={inputClass}
            />
            <p className="mt-2 text-xs text-gray-500">
              What drivers you share a car with see. Left blank, it’s your Google name.
            </p>
            {'error' in cleaned && <p role="alert" className="mt-2 text-xs text-red-700">{cleaned.error}</p>}
          </section>

          <p className="px-1 text-xs text-gray-500">
            Only for this app: your Google account keeps its own name and picture.
            {actingAs && <> This is your own profile, not {driverName(actingAs)}’s.</>}
          </p>

          {failure && <p role="alert" className="-mt-2 px-1 text-xs text-red-700">{failure}</p>}
        </div>
      </div>
    </PushPage>,
    document.body,
  )
}
