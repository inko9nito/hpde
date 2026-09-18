import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import { parseScheduleMD } from '../src/utils/parseSchedule'
import { serializeEvents } from '../src/utils/eventsJson'
import type { EventConfig } from '../src/types'

// Fixtures that carry a fixed-date schedule on disk and ship in
// events.json alongside real events. The widget doesn't treat these as
// today's event unless the user opts in via the `test` flag on the
// widget parameter, at which point the widget rewrites their days to
// "today" client-side. Real users' widgets never see them as active.
const FIXTURES: { id: string; sourceFile: string }[] = [
  { id: 'test-live', sourceFile: 'src/data/fixtures/test-live.md' },
]

export function eventsJsonPlugin(): Plugin {
  return {
    name: 'hpde-events-json',
    apply: 'build',
    writeBundle(options) {
      const outDir = options.dir ?? 'dist'
      const schedulesDir = path.resolve('src/data/schedules')

      const scheduled: EventConfig[] = fs
        .readdirSync(schedulesDir)
        .filter(f => f.endsWith('.md'))
        .map(file => {
          const id = file.replace(/\.md$/, '')
          const src = fs.readFileSync(path.join(schedulesDir, file), 'utf8')
          return parseScheduleMD(id, src)
        })

      const fixtures: EventConfig[] = FIXTURES.map(({ id, sourceFile }) => {
        const src = fs.readFileSync(path.resolve(sourceFile), 'utf8')
        return parseScheduleMD(id, src)
      })

      const events = [...scheduled, ...fixtures].sort((a, b) => {
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
