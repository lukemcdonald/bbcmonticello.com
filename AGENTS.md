# Agent Instructions

Berean Bible Church website at [bbcmonticello.com](https://bbcmonticello.com). Built with Astro. Keep changes focused and match existing patterns.

## Workflow

- Package manager: **npm** (not pnpm)
- Before marking any task complete, run `npm run validate && npm run build`. That is exactly what CI runs in `.github/workflows/ci.yml`.
- Start the dev server with `npm run dev`.

## Conventions

- No emojis anywhere: code, commits, descriptions, PR titles
- Alphabetize imports and object keys. `eslint-plugin-perfectionist` enforces this; Prettier handles formatting. Run `npm run fix` to apply both.
- Put `return` on its own line. Do not use inline returns.

## Commits and pull requests

PRs are squash-merged, so the PR title becomes the commit on main. Use Conventional Commits for git commits and PR titles:

`type: description [VOLTA-123]`

CI (`.github/workflows/pr-title.yml`) enforces that format on the PR title: allowed types below, no scope. Append `[VOLTA-123]` when there is a Linear issue. No details body.

Types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`

Branch names: `thelukemcdonald/volta-<n>-<slug>`

## Linear

Always use the **bbcmonticello.com** project (`2f67fcdc-4497-45ab-9f5c-bc67c5a1d480`) when searching, creating, or updating Linear issues for this codebase. Team: Personal. Issue key: VOLTA.

## Architecture

Fully static Astro site, deployed on Netlify. Redirects live in `public/_redirects`.

### Directory Structure

- `src/pages/` — Astro/MDX routes
- `src/layouts/` — Page shells
- `src/components/{layout,widget,entry,icons}` — Shared UI
- `src/config.ts` — Site title and description
- `public/` — Static assets and Netlify `_redirects`

**Path alias:** `@/*` maps to `src/*`
