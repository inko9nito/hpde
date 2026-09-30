import { MAX_PHOTO_BYTES, PHOTO_LIMIT, PHOTO_TYPES } from './garage'

/** A decoded photo, ready to draw; `close` frees it. */
interface Decoded {
  source: CanvasImageSource
  width: number
  height: number
  close(): void
}

// createImageBitmap where it works; an <img> otherwise — iPhone Safari
// can't always make a bitmap of a full-size camera photo, but can show one.
async function decode(file: Blob): Promise<Decoded> {
  if (typeof createImageBitmap === 'function') {
    try {
      const bitmap = await createImageBitmap(file)
      return { source: bitmap, width: bitmap.width, height: bitmap.height, close: () => bitmap.close?.() }
    } catch {
      // Try an <img>.
    }
  }
  const url = URL.createObjectURL(file)
  try {
    const img = new Image()
    img.src = url
    await img.decode()
    return { source: img, width: img.naturalWidth, height: img.naturalHeight, close: () => URL.revokeObjectURL(url) }
  } catch (err) {
    URL.revokeObjectURL(url)
    throw err
  }
}

// The photo drawn at most `max` pixels on its longer side, as a JPEG.
async function draw(photo: Decoded, max: number, quality: number): Promise<Blob | null> {
  const scale = Math.min(1, max / Math.max(photo.width, photo.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(photo.width * scale))
  canvas.height = Math.max(1, Math.round(photo.height * scale))
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  ctx.drawImage(photo.source, 0, 0, canvas.width, canvas.height)
  return new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', quality))
}

/**
 * A photo picked on the phone, made small enough to upload (#344): a
 * camera photo is several megabytes, and a car's tile and header need a
 * fraction of that. Scaled to fit `max` pixels on its longer side, as a
 * JPEG — smaller still if that's somehow over the limit. Where the browser
 * can't read it, the file as it is, if it's under the limit. Throws with a
 * message to show, the limit in it.
 */
export async function shrinkPhoto(file: Blob, max = 1280): Promise<Blob> {
  try {
    const photo = await decode(file)
    try {
      for (const [side, quality] of [[max, 0.85], [max * 0.75, 0.75], [max / 2, 0.7]]) {
        const blob = await draw(photo, side, quality)
        if (blob && blob.size > 0 && blob.size <= MAX_PHOTO_BYTES) return blob
      }
    } finally {
      photo.close()
    }
  } catch {
    // Fall through: send it as it is, if that's possible.
  }
  if (PHOTO_TYPES.includes(file.type) && file.size <= MAX_PHOTO_BYTES) return file
  if (PHOTO_TYPES.includes(file.type)) {
    throw new Error(`That photo couldn’t be made smaller, and it’s over the ${PHOTO_LIMIT} limit. Try another photo.`)
  }
  throw new Error(`That photo couldn’t be read. Try a JPEG or PNG (up to ${PHOTO_LIMIT}).`)
}
