// @ts-check
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, fontProviders } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  build: { format: 'file' },
  compressHTML: true,
  fonts: [
    {
      cssVariable: '--font-lato',
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      name: 'Lato',
      provider: fontProviders.google(),
      styles: ['normal'],
      subsets: ['latin'],
      weights: [400, 700],
    },
    {
      cssVariable: '--font-merriweather',
      fallbacks: ['ui-serif', 'Georgia', 'serif'],
      name: 'Merriweather',
      provider: fontProviders.google(),
      styles: ['italic', 'normal'],
      subsets: ['latin'],
      weights: [400, 700],
    },
  ],
  image: {
    layout: 'constrained',
    responsiveStyles: false,
  },
  integrations: [mdx(), sitemap()],
  prefetch: true,
  site: 'https://bbcmonticello.com/',
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()],
  },
})
