// A driver's name and picture as the app shows them (#416): the ones they
// set on Edit profile, or else their sign-in's (Google's). Theirs are kept
// in their Identity user_metadata under keys of the app's own, beside
// Google's, so the app never changes their Google account. The functions'
// copy is netlify/lib/profile.mjs; a test keeps the two the same.

export const PROFILE_NAME_KEY = 'hpde_name'
export const PROFILE_AVATAR_KEY = 'hpde_avatar'
export const MAX_PROFILE_NAME = 50

/** Where a picture set on Edit profile is served from: anyone can see it, as they can a Google one. */
export const PROFILE_URL = `${import.meta.env.BASE_URL}api/profile`

export type ProfileMetadata = Record<string, unknown> | null | undefined

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

/** What they set on Edit profile, and what their sign-in has; null where there's none. */
export function profileParts(meta: ProfileMetadata) {
  const m = meta ?? {}
  return {
    own: { name: text(m[PROFILE_NAME_KEY]).slice(0, MAX_PROFILE_NAME) || null, avatarUrl: text(m[PROFILE_AVATAR_KEY]) || null },
    signIn: { name: text(m.full_name) || text(m.name) || null, avatarUrl: text(m.avatar_url) || null },
  }
}

/** Their name and picture as the app shows them. */
export function profileOf(meta: ProfileMetadata): { name: string | null; avatarUrl: string | null } {
  const { own, signIn } = profileParts(meta)
  return { name: own.name ?? signIn.name, avatarUrl: own.avatarUrl ?? signIn.avatarUrl }
}

/** A name as typed on Edit profile: what to keep (null: their sign-in's), or what's wrong. */
export function cleanProfileName(typed: string): { value: string | null } | { error: string } {
  const name = typed.trim().replace(/\s+/g, ' ')
  if (name.length > MAX_PROFILE_NAME) return { error: `That name is too long (at most ${MAX_PROFILE_NAME} characters).` }
  return { value: name || null }
}
