import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Run group colors
        'group-red': { bg: '#ef4444', text: '#ffffff' },
        'group-yellow': { bg: '#eab308', text: '#000000' },
        'group-green': { bg: '#22c55e', text: '#000000' },
        'group-blue': { bg: '#3b82f6', text: '#ffffff' },
        'group-instructor': { bg: '#8b5cf6', text: '#ffffff' },
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
