// @ts-check
import netlify from '@astrojs/netlify'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  build: { format: 'file' },
  image: {
    layout: 'constrained',
    responsiveStyles: false,
  },
  integrations: [mdx(), sitemap()],
  site: 'https://bbcmonticello.com/',
  trailingSlash: 'never',
  vite: {
    // @ts-expect-error https://github.com/withastro/astro/issues/14030
    plugins: [tailwindcss()],
  },
})
