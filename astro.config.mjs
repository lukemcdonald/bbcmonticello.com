// @ts-check
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  build: { format: 'file' },
  compressHTML: true,
  image: {
    layout: 'constrained',
    responsiveStyles: false,
  },
  integrations: [mdx(), sitemap()],
  site: 'https://bbcmonticello.com/',
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()],
  },
})
