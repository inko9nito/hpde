// Turns the "New event" form (#229) into an EventConfig the app already
// knows how to render: one empty day per date in the range, no run groups.
// The schedule itself is added separately, so a new event starts blank.

export const ADMIN_ROLE = 'admin'
export const MAX_EVENT_DAYS = 7

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// Free-text fields, trimmed; an empty string means "not set".
const TEXT_FIELDS = ['organizer', 'track', 'city', 'configuration', 'direction', 'link']

export function isAdmin(user) {
  return !!user && user.roles.includes(ADMIN_ROLE)
}

function parseISODate(s) {
  if (typeof s !== 'string' || !ISO_DATE.test(s)) return null
  const d = new Date(`${s}T00:00:00Z`)
  // Rejects dates like 2026-02-30 that Date would silently roll over.
  return d.toISOString().slice(0, 10) === s ? d : null
}

export function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
    .replace(/-+$/, '')
}

function daysBetween(start, end) {
  const days = []
  for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    const label = WEEKDAYS[d.getUTCDay()]
    days.push({ id: label.toLowerCase(), label, date: d.toISOString().slice(0, 10), activities: [] })
  }
  return days
}

/**
 * Validates form input and builds the event. `takenIds` are ids already in
 * use (built-in + previously created) so the new id never shadows one.
 * Returns `{ event }` on success or `{ error }` with a message for the form.
 */
export function buildEvent(input, takenIds = []) {
  const src = input && typeof input === 'object' ? input : {}
  const name = typeof src.name === 'string' ? src.name.trim() : ''
  if (!name) return { error: 'Title is required.' }

  const start = parseISODate(src.startDate)
  if (!start) return { error: 'Start date must be a valid date.' }
  const endRaw = typeof src.endDate === 'string' && src.endDate ? src.endDate : src.startDate
  const end = parseISODate(endRaw)
  if (!end) return { error: 'End date must be a valid date.' }
  if (end < start) return { error: 'End date can’t be before the start date.' }

  const days = daysBetween(start, end)
  if (days.length > MAX_EVENT_DAYS) {
    return { error: `An event can span at most ${MAX_EVENT_DAYS} days.` }
  }

  const fields = {}
  for (const key of TEXT_FIELDS) {
    const v = typeof src[key] === 'string' ? src[key].trim() : ''
    if (v) fields[key] = v
  }
  if (fields.link) {
    let url
    try {
      url = new URL(fields.link)
    } catch {
      return { error: 'Event page must be a full URL (https://…).' }
    }
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      return { error: 'Event page must be a full URL (https://…).' }
    }
  }

  const base = `${src.startDate}_${slugify(name) || 'event'}`
  const taken = new Set(takenIds)
  let id = base
  for (let n = 2; taken.has(id); n++) id = `${base}-${n}`

  return { event: { id, name, ...fields, runGroups: [], days } }
}
