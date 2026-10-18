import type { OgImageInput } from './og'

import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { Resvg } from '@resvg/resvg-js'
import sharp from 'sharp'

import { buildOgSvg, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from './og'

const BACKGROUND_PATH = join(process.cwd(), 'src/assets/bbc-hero.jpg')
const FONT_PATH = join(process.cwd(), 'src/assets/fonts/merriweather/Merriweather-Bold.ttf')

let backgroundDataUriPromise: Promise<string | undefined> | undefined

function resolveFontPath() {
  if (!existsSync(FONT_PATH)) {
    throw new Error(`OG image font not found at ${FONT_PATH}`)
  }

  return FONT_PATH
}

function loadBackgroundDataUri() {
  if (!backgroundDataUriPromise) {
    backgroundDataUriPromise =
      existsSync(BACKGROUND_PATH) ?
        sharp(BACKGROUND_PATH)
          .resize(OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT, { fit: 'cover' })
          .jpeg({ quality: 55 })
          .toBuffer()
          .then((bytes) => `data:image/jpeg;base64,${bytes.toString('base64')}`)
      : Promise.resolve(undefined)
  }

  return backgroundDataUriPromise
}

export async function renderOgPng({ mark, title }: Pick<OgImageInput, 'mark' | 'title'>) {
  const backgroundDataUri = await loadBackgroundDataUri()
  const resvg = new Resvg(buildOgSvg({ backgroundDataUri, mark, title }), {
    fitTo: {
      mode: 'width',
      value: OG_IMAGE_WIDTH,
    },
    font: {
      defaultFontFamily: 'Merriweather',
      fontFiles: [resolveFontPath()],
      loadSystemFonts: false,
    },
  })

  return sharp(resvg.render().asPng())
    .png({
      compressionLevel: 9,
      palette: true,
      quality: 80,
    })
    .toBuffer()
}
