import { useCallback } from 'react'
import { useAuth } from '../auth/AuthContext'
import type { ScreenshotRead } from '../utils/lapImport'

// Reading a lap timer's screenshot (#472): shrunk here, then read by the
// lap-import function, which sends it to Claude. Nothing is saved until the
// driver imports what was read.
export const LAP_IMPORT_URL = `${import.meta.env.BASE_URL}api/lap-import`

// Claude reads an image at up to this long an edge; a bigger one is only
// more to send.
const LONG_EDGE = 1568

/** A screenshot as the function takes it: a JPEG no bigger than Claude reads, base64. */
export async function screenshotForUpload(file: File): Promise<{ mediaType: 'image/jpeg'; data: string }> {
  let bitmap: ImageBitmap
  try {
    bitmap = await createImageBitmap(file)
  } catch {
    throw new Error('Couldn’t open this image.')
  }
  const scale = Math.min(1, LONG_EDGE / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Couldn’t open this image.')
  // A screenshot with see-through parts: on white, as JPEG has none.
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()
  const url = canvas.toDataURL('image/jpeg', 0.9)
  return { mediaType: 'image/jpeg', data: url.slice(url.indexOf(',') + 1) }
}

/** Reads one screenshot: its date, start time and laps. Throws with a message to show. */
export function useScreenshotReader(): (file: File) => Promise<ScreenshotRead> {
  const { authedFetch } = useAuth()
  return useCallback(async (file: File) => {
    const image = await screenshotForUpload(file)
    let res: Response
    try {
      res = await authedFetch(LAP_IMPORT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      })
    } catch {
      throw new Error('Couldn’t reach the server. Check your connection and try again.')
    }
    const body = await res.json().catch(() => null)
    if (!res.ok || !body?.read) {
      throw new Error(typeof body?.error === 'string' ? body.error : 'Couldn’t read this screenshot. Try again.')
    }
    return body.read as ScreenshotRead
  }, [authedFetch])
}
