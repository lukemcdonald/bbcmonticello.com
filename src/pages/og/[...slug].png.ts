import type { OgPage } from 'astro-og-kit'

import { og } from '@/og'

export const prerender = true

const pageModules = import.meta.glob<{ frontmatter?: { title: string }; title?: string }>(
  ['../**/*.astro', '../**/*.mdx', '!../404.mdx'],
  {
    eager: true,
  },
)

const pages: OgPage[] = []

for (const [key, mod] of Object.entries(pageModules)) {
  const title = mod.frontmatter?.title ?? mod.title

  if (!title) {
    continue
  }

  const slug = key.replace(/^\.\.\//, '').replace(/\.(astro|mdx)$/, '')
  const pathname = slug === 'index' ? '/' : `/${slug}`

  pages.push({
    footer: pathname === '/' ? false : undefined,
    pathname,
    title,
  })
}

export const { GET, getStaticPaths } = og.route(pages)
