import { useCallback } from 'react'
import { useAuth } from '../auth/AuthContext'
import { screenshotForUpload } from './lapImport'
import type { EventEvaluation } from '../utils/evaluation'

// Reading an instructor's report card off screenshots (#483): each shrunk
// here, then read together by the evaluation-import function, which sends
// them to Claude. Nothing is saved until the driver saves the form it fills.
export const EVALUATION_IMPORT_URL = `${import.meta.env.BASE_URL}api/evaluation-import`

/** Screenshots of one evaluation, at most: the function's MAX_IMAGES. */
export const MAX_EVALUATION_SCREENSHOTS = 3

/** Reads one evaluation off its screenshots, `card` always said when it's known. Throws with a message to show. */
export function useEvaluationReader(): (files: File[]) => Promise<EventEvaluation> {
  const { authedFetch } = useAuth()
  return useCallback(async (files: File[]) => {
    const images = await Promise.all(files.map(screenshotForUpload))
    let res: Response
    try {
      res = await authedFetch(EVALUATION_IMPORT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images }),
      })
    } catch {
      throw new Error('Couldn’t reach the server. Check your connection and try again.')
    }
    const body = await res.json().catch(() => null)
    if (!res.ok || !body?.read) {
      throw new Error(typeof body?.error === 'string' ? body.error : 'Couldn’t read this screenshot. Try again.')
    }
    return body.read as EventEvaluation
  }, [authedFetch])
}
