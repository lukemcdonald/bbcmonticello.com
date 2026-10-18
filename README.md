# Berean Bible Church

Static [Astro](https://docs.astro.build/) site for [bbcmonticello.com](https://bbcmonticello.com).

## Setup

**Needs:** Node.js 22 (see `.nvmrc`), npm

Clone and install:

```bash
npm ci
```

Start local development:

```bash
npm run dev
```

## Scripts

| Script              | What it does                    |
| ------------------- | ------------------------------- |
| `npm run fix`       | Lint + format fix               |
| `npm run typecheck` | `astro check`                   |
| `npm run validate`  | Lint, format check, typecheck   |
| `npm run build`     | Production Astro build          |

CI runs `npm run validate && npm run build`.

## Deploy

Netlify. The site is fully static; redirects live in `public/_redirects`. `npm run preview` is a draft deploy; `npm run deploy:prod` publishes production.
