/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { eventsJsonPlugin } from './scripts/vite-plugin-events-json'

export default defineConfig({
  base: '/hpde/',
  plugins: [react(), eventsJsonPlugin()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
})
