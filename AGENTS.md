# Agent Instructions

- Before opening a PR, run `pnpm run validate && pnpm run build` and `pnpm run audit:code` and make sure they pass.
- No emojis in code, copy, commits, or PRs.
- Put `return` on its own line. Do not use inline returns.
- Follow DESIGN.md for UI and styling work.
- Don't change Confessional Statement wording without explicit approval. Keep "Tri-une"; only markup may change.
- Leave files as Prettier writes them. Don't add `prettier-ignore`.
- Don't add React or another UI framework, or a dependency for what a few lines of Astro or CSS can do.
