# Berean Bible Church

Static [Astro](https://docs.astro.build/) site for [bbcmonticello.com](https://bbcmonticello.com).

## Setup

**Needs:** Node.js 24+ (see `.nvmrc`), pnpm

Clone and install:

```bash
pnpm install
```

Start local development:

```bash
pnpm dev
```

## Scripts

| Script           | What it does                  |
| ---------------- | ----------------------------- |
| `pnpm fix`       | Lint + format fix             |
| `pnpm typecheck` | `astro check`                 |
| `pnpm validate`  | Lint, format check, typecheck |
| `pnpm build`     | Production Astro build        |

CI runs `pnpm validate && pnpm build`.

## Deploy

Netlify. The site is fully static; redirects live in `public/_redirects`. `pnpm preview` is a draft deploy; `pnpm deploy:prod` publishes production.
