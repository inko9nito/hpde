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
