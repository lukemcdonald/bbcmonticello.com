import type { APIRoute } from 'astro'

import { SITE_TITLE } from '@/config'
import { renderOgPng } from '@/utils/og.render'

export const prerender = true

const pageSources = import.meta.glob<string>(['../**/*.astro', '../**/*.mdx'], {
  eager: true,
  import: 'default',
  query: '?raw',
})

function slugFromGlobKey(key: string) {
  return key.replace(/^\.\.\//, '').replace(/\.(astro|mdx)$/, '')
}

const CONST_TITLE = /const title = ['"](.+?)['"]/
const FRONTMATTER_TITLE = /^title:\s*['"](.+?)['"]/m

function firstMatch(source: string, pattern: RegExp) {
  return source.match(pattern)?.[1]
}

function pageTitle(source: string) {
  return firstMatch(source, FRONTMATTER_TITLE) ?? firstMatch(source, CONST_TITLE)
}

function titleFromSource(source: string, slug: string) {
  return pageTitle(source) ?? (slug === 'index' ? SITE_TITLE : undefined)
}

export function getStaticPaths() {
  const paths = []

  for (const [key, source] of Object.entries(pageSources)) {
    const slug = slugFromGlobKey(key)
    const title = titleFromSource(source, slug)

    if (!title || slug === '404') {
      continue
    }

    paths.push({
      params: { slug },
      props: {
        title,
      },
    })
  }

  return paths
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgPng({ title: props.title })

  return new Response(Uint8Array.from(png), {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
