import eslintPluginAstro from 'eslint-plugin-astro'
import { defineConfig } from 'eslint/config'
import perfectionist from 'eslint-plugin-perfectionist'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

export default defineConfig([
  ...tsEslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs['jsx-a11y-recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'warn',
    },
  },
  {
    files: ['src/**/*.{astro,js,jsx,ts,tsx}'],
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-exports': [
        'error',
        {
          ignoreCase: true,
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'type',
            'side-effect',
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'unknown',
          ],
          ignoreCase: true,
          internalPattern: ['^@/'],
          newlinesBetween: 1,
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-named-imports': [
        'error',
        {
          ignoreCase: true,
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-objects': [
        'error',
        {
          ignoreCase: true,
          order: 'asc',
          partitionByComment: 'keep-order',
          type: 'alphabetical',
        },
      ],
    },
  },
  {
    files: ['src/pages/**/*.astro'],
    rules: {
      'astro/no-exports-from-components': 'off',
    },
  },
  {
    ignores: ['.astro/**', 'dist/**'],
  },
])
