// @ts-check
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, fontProviders } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://fruitbench.hogdani.sh',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'Inter',
        cssVariable: '--font-sans',
        weights: ['100 900'],
        styles: ['normal', 'italic'],
        subsets: ['latin'],
        fallbacks: ['system-ui', '-apple-system', 'sans-serif'],
      },
    ],
  },
})
