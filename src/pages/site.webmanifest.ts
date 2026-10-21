import type { APIRoute } from 'astro'

import { SITE_DESCRIPTION, SITE_THEME_COLOR, SITE_TITLE } from '@/config'

export const prerender = true

export const GET: APIRoute = () => {
  const body = JSON.stringify({
    background_color: SITE_THEME_COLOR.light,
    description: SITE_DESCRIPTION,
    display: 'standalone',
    icons: [
      {
        sizes: '192x192',
        src: '/icon-192.png',
        type: 'image/png',
      },
      {
        sizes: '512x512',
        src: '/icon-512.png',
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        sizes: '512x512',
        src: '/icon-maskable-512.png',
        type: 'image/png',
      },
    ],
    name: SITE_TITLE,
    short_name: SITE_TITLE,
    start_url: '/',
    theme_color: SITE_THEME_COLOR.dark,
  })

  return new Response(body, {
    headers: {
      'Content-Type': 'application/manifest+json',
    },
  })
}
