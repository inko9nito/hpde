import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import { parseScheduleMD } from '../src/utils/parseSchedule'
import { serializeEvents } from '../src/utils/eventsJson'
import type { EventConfig } from '../src/types'

// Fixtures that carry a fixed-date schedule on disk and ship in the
// widget feed alongside real events. The widget doesn't treat these as
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

      const fixtures: EventConfig[] = FIXTURES.map(({ id, sourceFile }) => {
        const src = fs.readFileSync(path.resolve(sourceFile), 'utf8')
        return parseScheduleMD(id, src)
      })

      // Fails the build on a run-group color the widget couldn't resolve,
      // the same check the widget feed runs at request time.
      serializeEvents(fixtures)

      // Not events.json: on Netlify that path is a function
      // (netlify/functions/events-json.mts) that serves every stored event
      // to the iOS widget (#232), plus these fixtures, read from here.
      const apiDir = path.join(outDir, 'api')
      fs.mkdirSync(apiDir, { recursive: true })
      const outPath = path.join(apiDir, 'builtin-events.json')
      fs.writeFileSync(outPath, JSON.stringify({ fixtures }, null, 2))
      this.info(`emitted ${outPath} (${fixtures.length} fixture events)`)
    },
  }
}
