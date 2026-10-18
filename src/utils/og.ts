import { SITE_TITLE } from '@/config'
import { normalizePath } from '@/lib/pathname'

export const OG_IMAGE_HEIGHT = 630
export const OG_IMAGE_WIDTH = 1200

export type OgImageInput = {
  backgroundDataUri?: string
  mark?: string
  title: string
}

const ACCENT = '#ba9b47'
const BACKGROUND = '#4c0818'
const FOREGROUND = '#f9f9f8'
const MUTED = '#cfb97f'
const OG_IMAGE_MARK = SITE_TITLE
const OVERLAY = '#26040c'

const TITLE_LINE_HEIGHT = 88
const TITLE_MAX_CHARS = 18

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function wrapTitle(title: string) {
  const trimmed = title.trim()
  const words = trimmed.split(/\s+/).filter(Boolean)

  if (trimmed.length <= TITLE_MAX_CHARS || words.length < 2) {
    return [trimmed]
  }

  const splitAt = Math.ceil(words.length / 2)

  return [words.slice(0, splitAt).join(' '), words.slice(splitAt).join(' ')]
}

export function buildOgImagePath(pathname: string) {
  const canonical = normalizePath(pathname)
  const slug = canonical === '/' ? 'index' : canonical.replace(/^\/+/, '')

  return `/og/${slug}.png`
}

export function buildOgSvg({ backgroundDataUri, mark = OG_IMAGE_MARK, title }: OgImageInput) {
  const lines = wrapTitle(title)
  const titleStartY = 318 - ((lines.length - 1) * TITLE_LINE_HEIGHT) / 2
  const titleMarkup = lines
    .map((line, index) => {
      const y = titleStartY + index * TITLE_LINE_HEIGHT

      return `<tspan x="96" y="${y}">${escapeXml(line)}</tspan>`
    })
    .join('')
  const backgroundMarkup =
    backgroundDataUri ?
      `<image href="${backgroundDataUri}" x="0" y="0" width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" preserveAspectRatio="xMidYMid slice" />
  <rect width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" fill="${OVERLAY}" fill-opacity="0.72" />`
    : ''

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" viewBox="0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}">
  <rect width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" fill="${BACKGROUND}" />
  ${backgroundMarkup}
  <rect x="0" y="0" width="12" height="${OG_IMAGE_HEIGHT}" fill="${ACCENT}" />
  <text font-family="Merriweather" font-size="72" font-weight="700" fill="${FOREGROUND}">${titleMarkup}</text>
  <text x="96" y="534" font-family="Merriweather" font-size="28" font-weight="700" fill="${MUTED}">${escapeXml(mark)}</text>
</svg>`
}
