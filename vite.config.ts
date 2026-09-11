/// <reference types="vitest" />
import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { eventsJsonPlugin } from './scripts/vite-plugin-events-json'

// Short commit SHA of the build, shown in the app footer so the user can tell
// a stale cached page from the current deploy at a glance. Falls back to
// "dev" when the working tree has no git (e.g. tarball builds).
function buildSha(): string {
  try {
    return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString().trim()
  } catch {
    return 'dev'
  }
}

export default defineConfig({
  base: '/hpde/',
  define: {
    __BUILD_SHA__: JSON.stringify(buildSha()),
  },
  plugins: [react(), eventsJsonPlugin()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
})
