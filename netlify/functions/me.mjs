import { requireUser, json, UNAUTHORIZED } from '../lib/auth.mjs'

// Echoes back who the server thinks is signed in. The smallest end-to-end
// check that a browser's Identity token reaches functions — and the
// template for the notes/garage functions that come next.
export const handler = async (_event, context) => {
  const user = requireUser(context)
  if (!user) return UNAUTHORIZED
  return json(200, { user })
}
