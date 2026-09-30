import { MAX_PHOTO_BYTES, PHOTO_TYPES } from './garage'

/**
 * A photo picked on the phone, shrunk before it's uploaded (#344): a
 * camera photo is several megabytes, and a car's tile and header need a
 * fraction of that. Scaled to fit `max` pixels on its longer side, as a
 * JPEG. Where the browser can't (no canvas), the file as it is, if it's
 * small enough. Throws with a message to show.
 */
export async function shrinkPhoto(file: Blob, max = 1280): Promise<Blob> {
  try {
    if (typeof createImageBitmap !== 'function') throw new Error('No canvas')
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('No canvas')
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    bitmap.close?.()
    const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.85))
    if (blob) return blob
  } catch {
    // Fall through: send it as it is, if that's possible.
  }
  if (!PHOTO_TYPES.includes(file.type)) throw new Error('That isn’t a photo this can read. Try a JPEG or PNG.')
  if (file.size > MAX_PHOTO_BYTES) throw new Error('That photo is too big.')
  return file
}
