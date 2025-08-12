// @ts-check
import netlify from '@astrojs/netlify'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  build: { format: 'file' },
  image: {
    layout: 'constrained',
    responsiveStyles: false,
  },
  integrations: [mdx(), sitemap(), tailwind()],
  site: 'https://bbcmonticello.com/',
  trailingSlash: 'never',
})
