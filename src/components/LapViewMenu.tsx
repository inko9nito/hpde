import { useEffect, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Toggle } from './Toggle'
import { setLapView, useLapView } from '../data/lapView'

/**
 * Out laps (#480): a button over the laps that opens the driver's two
 * choices about their out and in laps — shown in the tables and charts or
 * not, and counted in the average or not. Kept for the device, so every
 * page with laps follows them.
 */
export function LapViewMenu() {
  const [open, setOpen] = useState(false)
  const { showOutLaps, outLapsInAverage } = useLapView()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopImmediatePropagation()
      setOpen(false)
    }
    document.addEventListener('keydown', onKey, true)
    return () => document.removeEventListener('keydown', onKey, true)
  }, [open])

  // Its menu hangs from the right of the row it's in, which is
  // positioned: under it, whatever's beside the button.
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex items-center gap-1 text-gray-500 transition-colors hover:text-gray-800"
        data-lap-view-menu
      >
        <SlidersHorizontal size={14} aria-hidden="true" />
        Out laps
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            role="dialog"
            aria-label="Out and in laps"
            className="absolute right-0 top-full z-20 -mt-1 flex w-72 max-w-[calc(100vw-2rem)] flex-col rounded-xl border border-gray-200 bg-white p-1 text-left shadow-xl"
          >
            <Row
              title="Show out & in laps"
              detail="In the lap tables, and on each session’s chart as hollow dots."
              checked={showOutLaps}
              onChange={() => setLapView({ showOutLaps: !showOutLaps })}
            />
            <div className="mx-3 border-t border-gray-100" />
            <Row
              title="Count them in the average"
              detail="Never in the best lap."
              checked={outLapsInAverage}
              onChange={() => setLapView({ outLapsInAverage: !outLapsInAverage })}
            />
          </div>
        </>
      )}
    </div>
  )
}

function Row({ title, detail, checked, onChange }: { title: string; detail: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2.5">
      <div className="min-w-0">
        <p className="text-sm text-gray-900">{title}</p>
        <p className="mt-0.5 text-xs text-gray-500">{detail}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} ariaLabel={title} />
    </div>
  )
}
