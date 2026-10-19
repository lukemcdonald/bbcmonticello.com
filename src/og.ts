import { cover, defineOg } from 'astro-og-kit'

import { SITE_TITLE } from '@/config'

export const og = defineOg({
  colors: {
    accent: '#ba9b47',
    background: '#4c0818',
    foreground: '#f9f9f8',
    logo: false,
    muted: '#cfb97f',
    overlay: '#26040c',
  },
  font: { family: 'Merriweather', files: ['src/assets/fonts/merriweather/Merriweather-Bold.ttf'] },
  footer: SITE_TITLE,
  logo: { src: 'src/assets/og-logo.svg', width: 192 },
  photo: { position: 'left', src: 'src/assets/og-hero.jpg' },
  template: cover({ lineHeight: 88 / 72, maxWidth: 640, opacity: 0.72 }),
})
