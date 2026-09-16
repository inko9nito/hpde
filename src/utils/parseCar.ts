import type { Car, ServiceEntry, Part } from '../types'

// Mirrors parseSchedule's grammar: "## service | YYYY-MM-DD" opens an
// entry (same "Label | date" shape as a schedule day heading), key:value
// lines fill it in, and "### parts" opens a pipe-delimited parts table
// scoped to that entry.
const KEY_LINE = /^[a-zA-Z][a-zA-Z0-9_.\- ]*:/

function isKeyLine(line: string): boolean {
  return KEY_LINE.test(line)
}

function parseKV(line: string): [string, string] | null {
  const idx = line.indexOf(':')
  if (idx === -1) return null
  return [line.slice(0, idx).trim().toLowerCase(), line.slice(idx + 1).trim()]
}

function collectFreeform(lines: string[], start: number, firstValue: string): { text: string; next: number } {
  const parts: string[] = []
  if (firstValue) parts.push(firstValue)
  let i = start
  while (i < lines.length) {
    const l = lines[i]
    if (!l || l.startsWith('#') || isKeyLine(l)) break
    parts.push(l)
    i++
  }
  return { text: parts.join(' ').trim(), next: i }
}

function parsePartLine(line: string): Part | null {
  const parts = line.split('|').map(s => s.trim())
  if (parts.length < 1 || !parts[0]) return null
  const [name, partNumber, qty, unitCost] = parts
  return {
    name,
    ...(partNumber ? { partNumber } : {}),
    ...(qty ? { qty: parseFloat(qty) } : {}),
    ...(unitCost ? { unitCost: parseFloat(unitCost) } : {}),
  }
}

export function parseCarMD(id: string, src: string): Car {
  const lines = src.split('\n').map(l => l.trim())

  let name = ''
  let year: number | undefined
  let make: string | undefined
  let model: string | undefined
  let trim: string | undefined
  const services: ServiceEntry[] = []
  let currentService: ServiceEntry | null = null
  let inParts = false

  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line || line.startsWith('//')) { i++; continue }

    if (line.startsWith('# ')) {
      name = line.slice(2).trim()
      i++
      continue
    }

    if (line.startsWith('### ')) {
      inParts = line.slice(4).trim().toLowerCase() === 'parts'
      i++
      continue
    }

    if (line.startsWith('## ')) {
      const heading = line.slice(3).trim()
      const parts = heading.split('|').map(s => s.trim())
      inParts = false
      if (parts[0].toLowerCase() === 'service' && parts.length === 2) {
        currentService = { date: parts[1], summary: '' }
        services.push(currentService)
      } else {
        currentService = null
      }
      i++
      continue
    }

    if (!currentService) {
      const kv = parseKV(line)
      if (kv) {
        const [key, value] = kv
        if (key === 'year') year = parseInt(value, 10) || undefined
        else if (key === 'make') make = value
        else if (key === 'model') model = value
        else if (key === 'trim') trim = value
      }
      i++
      continue
    }

    if (inParts) {
      const part = parsePartLine(line)
      if (part) currentService.parts = [...(currentService.parts ?? []), part]
      i++
      continue
    }

    const kv = parseKV(line)
    if (kv) {
      const [key, value] = kv
      if (key === 'shop') currentService.shop = value
      else if (key === 'summary') currentService.summary = value
      else if (key === 'labor') {
        const n = parseFloat(value)
        currentService.laborCost = Number.isNaN(n) ? undefined : n
      }
      else if (key === 'work') {
        const { text, next } = collectFreeform(lines, i + 1, value)
        currentService.work = text || undefined
        i = next
        continue
      } else if (key === 'notes') {
        const { text, next } = collectFreeform(lines, i + 1, value)
        currentService.notes = text || undefined
        i = next
        continue
      }
    }
    i++
  }

  services.sort((a, b) => b.date.localeCompare(a.date))

  return {
    id,
    name,
    ...(year !== undefined ? { year } : {}),
    ...(make ? { make } : {}),
    ...(model ? { model } : {}),
    ...(trim ? { trim } : {}),
    services,
  }
}
