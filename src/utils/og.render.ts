import type { OgImageInput } from './og'

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { Resvg } from '@resvg/resvg-js'
import sharp from 'sharp'

import { buildOgSvg, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from './og'

const BACKGROUND_PATH = join(process.cwd(), 'src/assets/bbc-hero.jpg')
const FONT_PATH = join(process.cwd(), 'src/assets/fonts/merriweather/Merriweather-Bold.ttf')
const LOGO_PATH = join(process.cwd(), 'public/logo.svg')

let backgroundDataUriPromise: Promise<string | undefined> | undefined

function resolveFontPath() {
  if (!existsSync(FONT_PATH)) {
    throw new Error(`OG image font not found at ${FONT_PATH}`)
  }

  return FONT_PATH
}

function loadLogoMarkup() {
  if (!existsSync(LOGO_PATH)) {
    throw new Error(`OG image logo not found at ${LOGO_PATH}`)
  }

  const groups = readFileSync(LOGO_PATH, 'utf8').match(/<g[\s\S]*?<\/g>/g)
  const mark = groups?.at(-1)

  if (!mark) {
    throw new Error(`OG image logo mark missing in ${LOGO_PATH}`)
  }

  return mark.replace(/class="[^"]*"/, 'fill="#f9f9f8"')
}

function loadBackgroundDataUri() {
  if (!backgroundDataUriPromise) {
    backgroundDataUriPromise =
      existsSync(BACKGROUND_PATH) ?
        sharp(BACKGROUND_PATH)
          .extract({ height: 600, left: 0, top: 0, width: 600 })
          .resize(OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT, { fit: 'cover', position: 'left' })
          .jpeg({ quality: 55 })
          .toBuffer()
          .then((bytes) => `data:image/jpeg;base64,${bytes.toString('base64')}`)
      : Promise.resolve(undefined)
  }

  return backgroundDataUriPromise
}

export async function renderOgPng({ mark, title }: Pick<OgImageInput, 'mark' | 'title'>) {
  const backgroundDataUri = await loadBackgroundDataUri()
  const resvg = new Resvg(
    buildOgSvg({ backgroundDataUri, logoMarkup: loadLogoMarkup(), mark, title }),
    {
      fitTo: {
        mode: 'width',
        value: OG_IMAGE_WIDTH,
      },
      font: {
        defaultFontFamily: 'Merriweather',
        fontFiles: [resolveFontPath()],
        loadSystemFonts: false,
      },
    },
  )

  return sharp(resvg.render().asPng())
    .png({
      compressionLevel: 9,
      palette: true,
      quality: 80,
    })
    .toBuffer()
}
