/// <reference types="vitest" />
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { eventsJsonPlugin } from './scripts/vite-plugin-events-json'

// Commit timestamp of the build, shown in the app footer so the user can tell
// a stale cached page from the current deploy at a glance. Falls back to the
// current time when the working tree has no git (e.g. tarball builds).
function buildTime(): string {
  try {
    return execSync('git log -1 --format=%cI', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString().trim()
  } catch {
    return new Date().toISOString()
  }
}

function gitCommit(): string | null {
  try {
    return execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
  } catch {
    return null
  }
}

// dist/version.json: which commit this build is. CI waits for a deploy to
// serve the commit it's checking before testing it (#256).
function versionJsonPlugin(): Plugin {
  return {
    name: 'hpde-version-json',
    apply: 'build',
    writeBundle(options) {
      const outDir = options.dir ?? 'dist'
      const version = { commit: gitCommit(), builtAt: new Date().toISOString() }
      fs.writeFileSync(path.join(outDir, 'version.json'), JSON.stringify(version, null, 2))
    },
  }
}

export default defineConfig({
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime()),
  },
  plugins: [react(), eventsJsonPlugin(), versionJsonPlugin()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    // Browser tests run under Playwright (npm run test:e2e), not Vitest.
    exclude: [...configDefaults.exclude, 'e2e/**'],
  },
})
