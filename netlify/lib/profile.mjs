// A driver's name and picture as this app shows them (#416): the ones they
// set on Edit profile, or else their sign-in's (Google's). Theirs are kept
// in their Identity user_metadata under keys of the app's own, beside
// Google's full_name and avatar_url, so the app never changes their Google
// account — and Google sign-in, which writes its own keys, never undoes
// them. Plain JS, as me.mjs ships auth.mjs as written; the browser's copy
// is src/utils/profile.ts, and a test keeps the two the same.

export const NAME_KEY = 'hpde_name'
export const AVATAR_KEY = 'hpde_avatar'
// As long as a name can be (src/utils/profile.ts: MAX_PROFILE_NAME).
export const MAX_NAME = 50

const text = value => (typeof value === 'string' ? value.trim() : '')

/** Their name and picture as the app shows them, from Identity's user_metadata; null where there's none. */
export function profileOf(meta) {
  const m = meta ?? {}
  const name = text(m[NAME_KEY]).slice(0, MAX_NAME) || text(m.full_name) || text(m.name) || null
  const avatar = text(m[AVATAR_KEY]) || text(m.avatar_url) || null
  return { name, avatar }
}
