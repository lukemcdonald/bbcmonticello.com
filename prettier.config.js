/** @type {import('prettier').Config} */
export default {
  astroCompressHTML: true,
  experimentalTernaries: true,
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  printWidth: 100,
  proseWrap: 'preserve',
  semi: false,
  singleAttributePerLine: true,
  singleQuote: true,
  tailwindStylesheet: './src/styles/global.css',
}
