// Netlify populates context.clientContext.user only when a valid Identity
// JWT is sent as a Bearer token, so a missing user means "not signed in".
// Every function that touches personal data (notes, garage) starts here.
export function requireUser(context) {
  const user = context?.clientContext?.user
  if (!user) return null
  return {
    id: user.sub,
    email: user.email,
    roles: user.app_metadata?.roles ?? [],
  }
}

export function json(status, body) {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  }
}

export const UNAUTHORIZED = json(401, { error: 'Please sign in to continue.' })

// For functions in the current (Request/Response) format, where Netlify
// doesn't decode the Identity token into context. Asks Identity who the
// Bearer token belongs to — Identity validates it, so a forged or expired
// token gets null. Same shape as requireUser().
export async function userFromRequest(req, fetchImpl = fetch) {
  const auth = req.headers.get('authorization')
  if (!auth?.startsWith('Bearer ')) return null
  try {
    const res = await fetchImpl(new URL('/.netlify/identity/user', req.url), {
      headers: { Authorization: auth },
    })
    if (!res.ok) return null
    const user = await res.json()
    return { id: user.id, email: user.email, roles: user.app_metadata?.roles ?? [] }
  } catch {
    return null
  }
}

export function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}
