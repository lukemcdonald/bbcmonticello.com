import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

const YOUTUBE_FEED_URL =
  'https://www.youtube.com/feeds/videos.xml?channel_id=UCmrgfWhOUByJrLlSVz3sVgA'

function decodeXmlEntities(value: string) {
  return value
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&')
}

function tagText(xml: string, tag: string) {
  const match = xml.match(new RegExp(`<${tag}>([^<]*)</${tag}>`))

  if (!match?.[1]) {
    return
  }

  return decodeXmlEntities(match[1])
}

function parseEntry(entry: string) {
  const item = {
    id: tagText(entry, 'yt:videoId'),
    published: tagText(entry, 'published'),
    thumbnail: entry.match(/<media:thumbnail\b[^>]*\burl="([^"]+)"/)?.[1],
    title: tagText(entry, 'title'),
    videoId: tagText(entry, 'yt:videoId'),
  }

  if (Object.values(item).some((value) => !value)) {
    return
  }

  return item as {
    id: string
    published: string
    thumbnail: string
    title: string
    videoId: string
  }
}

function parseYoutubeFeed(xml: string) {
  return xml
    .split('<entry>')
    .slice(1)
    .map(parseEntry)
    .filter((item) => item !== undefined)
}

const sermons = defineCollection({
  loader: async () => {
    try {
      const response = await fetch(YOUTUBE_FEED_URL, {
        headers: {
          'User-Agent': 'bbcmonticello.com',
        },
        signal: AbortSignal.timeout(10_000),
      })

      if (!response.ok) {
        return []
      }

      return parseYoutubeFeed(await response.text())
    } catch {
      return []
    }
  },
  schema: z.object({
    published: z.coerce.date(),
    thumbnail: z.url(),
    title: z.string(),
    videoId: z.string(),
  }),
})

export const collections = {
  sermons,
}
