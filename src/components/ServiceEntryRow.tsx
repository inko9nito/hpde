import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { ServiceEntry } from '../types'

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatCurrency(n: number): string {
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

function totalCost(entry: ServiceEntry): number {
  const partsCost = (entry.parts ?? []).reduce((sum, p) => sum + (p.unitCost ?? 0) * (p.qty ?? 1), 0)
  return partsCost + (entry.laborCost ?? 0)
}

interface Props {
  entry: ServiceEntry
}

export function ServiceEntryRow({ entry }: Props) {
  const [open, setOpen] = useState(false)
  const total = totalCost(entry)
  const expandable = !!(entry.work || entry.notes || (entry.parts && entry.parts.length > 0))

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <button
        onClick={() => expandable && setOpen(o => !o)}
        className="flex w-full items-start justify-between gap-3 p-4 text-left"
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-mono text-gray-400">{formatDate(entry.date)}</span>
          <span className="text-sm font-semibold text-gray-900">{entry.summary}</span>
          {entry.shop && <span className="text-xs text-gray-500">{entry.shop}</span>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {total > 0 && <span className="text-sm font-medium text-gray-700">{formatCurrency(total)}</span>}
          {expandable && (
            <ChevronDown size={16} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
          )}
        </div>
      </button>

      {expandable && open && (
        <div className="flex flex-col gap-3 border-t border-gray-100 p-4">
          {entry.work && <p className="text-xs text-gray-600">{entry.work}</p>}

          {entry.parts && entry.parts.length > 0 && (
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-gray-400">
                  <th className="pb-1 font-normal">Part</th>
                  <th className="pb-1 font-normal">Part #</th>
                  <th className="pb-1 text-right font-normal">Qty</th>
                  <th className="pb-1 text-right font-normal">Cost</th>
                </tr>
              </thead>
              <tbody>
                {entry.parts.map((part, idx) => (
                  <tr key={idx} className="border-t border-gray-50 text-gray-700">
                    <td className="py-1 pr-2">{part.name}</td>
                    <td className="py-1 pr-2 font-mono text-gray-500">{part.partNumber ?? '—'}</td>
                    <td className="py-1 text-right">{part.qty ?? 1}</td>
                    <td className="py-1 text-right">{part.unitCost !== undefined ? formatCurrency(part.unitCost) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {entry.laborCost !== undefined && (
            <p className="text-xs text-gray-500">Labor: {formatCurrency(entry.laborCost)}</p>
          )}

          {entry.notes && <p className="text-xs italic text-gray-500">{entry.notes}</p>}
        </div>
      )}
    </div>
  )
}
