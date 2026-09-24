// @vitest-environment node
import { describe, it, expect, afterAll } from 'vitest'
import { build } from 'esbuild'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readdirSync, rmSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

// Loads every Netlify function the way Netlify runs it, in a plain Node
// process — not through Vitest, whose resolver forgives imports that Node
// rejects. The widget feed shipped broken because of exactly that (#253):
// `import 'tailwindcss/colors'` passed every test here and crashed on
// Netlify with ERR_MODULE_NOT_FOUND.
//
// How Netlify packages them:
//   .mjs / .js   shipped as written (zip-it-and-ship-it's default bundler)
//   .mts / .ts   bundled with esbuild — the project's own files inlined,
//                npm packages left as imports, resolved from node_modules
//                at run time as ES modules
const root = path.resolve(__dirname, '../..')
const functionsDir = path.join(root, 'netlify/functions')
const functions = readdirSync(functionsDir).filter(f => /\.(mjs|js|mts|ts)$/.test(f) && !f.includes('.test.'))

// Inside the repo, so bundled imports resolve from its node_modules.
const cacheDir = path.join(root, 'node_modules/.cache')
mkdirSync(cacheDir, { recursive: true })
const outDir = mkdtempSync(path.join(cacheDir, 'functions-load-'))
afterAll(() => rmSync(outDir, { recursive: true, force: true }))

async function packageLikeNetlify(file: string): Promise<string> {
  const src = path.join(functionsDir, file)
  if (/\.m?js$/.test(file)) return src
  const out = path.join(outDir, file.replace(/\.m?ts$/, '.mjs'))
  await build({
    entryPoints: [src],
    outfile: out,
    bundle: true,
    packages: 'external',
    platform: 'node',
    format: 'esm',
    target: 'node22',
    logLevel: 'silent',
  })
  return out
}

// Imports the module and reports its handler; any load error fails. A
// function exports either a default handler (the current format) or a
// named \`handler\` (the older Lambda-compatible one, e.g. me.mjs).
const LOADER = `
const m = await import(process.argv[1])
console.log(JSON.stringify({ handler: typeof (m.default ?? m.handler) }))
`

describe('Netlify functions load as Netlify runs them (#253)', () => {
  it('finds the functions', () => {
    expect(functions.length).toBeGreaterThan(0)
  })

  it.each(functions)('%s', async file => {
    const entry = await packageLikeNetlify(file)
    let stdout: string
    try {
      stdout = execFileSync(process.execPath, ['--input-type=module', '-e', LOADER, pathToFileURL(entry).href], {
        cwd: root,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      })
    } catch (err) {
      const stderr = (err as { stderr?: string }).stderr ?? String(err)
      throw new Error(`${file} doesn't load under plain Node:\n${stderr.split('\n').slice(0, 6).join('\n')}`)
    }
    const loaded = JSON.parse(stdout.trim().split('\n').at(-1)!)
    expect(loaded.handler).toBe('function')
  }, 30_000)
})
