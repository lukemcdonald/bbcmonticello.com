module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            hr: {
              borderColor: 'var(--color-gray-300)',
            },
          },
        },
      },
    },
  },
}
