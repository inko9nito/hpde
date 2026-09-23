/// <reference types="vitest" />
import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
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

export default defineConfig({
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime()),
  },
  plugins: [react(), eventsJsonPlugin()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
})
