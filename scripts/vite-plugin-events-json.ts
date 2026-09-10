import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import { parseScheduleMD } from '../src/utils/parseSchedule'
import { serializeEvents } from '../src/utils/eventsJson'
import type { EventConfig } from '../src/types'

export function eventsJsonPlugin(): Plugin {
  return {
    name: 'hpde-events-json',
    apply: 'build',
    writeBundle(options) {
      const outDir = options.dir ?? 'dist'
      const schedulesDir = path.resolve('src/data/schedules')

      const events: EventConfig[] = fs
        .readdirSync(schedulesDir)
        .filter(f => f.endsWith('.md'))
        .map(file => {
          const id = file.replace(/\.md$/, '')
          const src = fs.readFileSync(path.join(schedulesDir, file), 'utf8')
          return parseScheduleMD(id, src)
        })
        .sort((a, b) => {
          const da = a.days[0]?.date ?? ''
          const db = b.days[0]?.date ?? ''
          return db.localeCompare(da)
        })

      const manifest = serializeEvents(events)
      const apiDir = path.join(outDir, 'api')
      fs.mkdirSync(apiDir, { recursive: true })
      const outPath = path.join(apiDir, 'events.json')
      fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2))
      this.info(`emitted ${outPath} (${events.length} events)`)
    },
  }
}
