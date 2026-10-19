---
name: bbcmonticello.com
description: A small church site set like a printed bulletin in burgundy and wheat; words first.
---

Tokens live in `src/styles/global.css`, which is the source of truth; this file holds rules, not values.

## Overview

A small church site set like a printed bulletin in burgundy and wheat. Words first: most pages are Scripture-backed prose and nothing else.

- Two hues. Burgundy (`primary-*`), wheat (`secondary-*`), and warm gray.
- Serif to read, sans to label. Merriweather for body; Lato for titles and small uppercase tracked labels.
- Flat and quiet. Depth from color bands, not cards; minimal shadows.
- One reading column. A sidebar only when a page needs one.
- Static and still. No animation beyond view transitions; client scripts stay small and inline.

## Components

Reuse these; copy from the file instead of inventing variants.

- Layouts: `Base` (header and sidebar slots), `Singular` (title plus `Prose`).
- Shell pieces: `Html`, `Head`, `Body`, `Header`, `Content`, `Main`, `Sidebar`, `Footer`. `Head` owns all meta tags.
- Masthead: `SiteNavigation`, `SiteIdentity`, `Logo`, `Breadcrumbs`, `Hero`.
- Type: `EntryTitle`, `Lead`, `Prose`.
- Actions: `Button` (`to` renders a link).
- Widgets: `Widget`, `WidgetTitle`, `WidgetNav`.
- Site data: church name, address, worship times, and links from `src/config.ts`.

## Do's and Don'ts

- Do build pages on `Singular`, or on `Base` with its slots. Don't rebuild `Html`, `Head`, `Header` or `Footer` inside a page.
- Do put body content in `Prose` and opt out with `not-prose` (or `Widget prose={false}`). Don't restyle paragraphs, headings or links inside prose with one-off classes.
- Do use `Button`, `Lead`, `EntryTitle` and `Widget`/`WidgetNav`. Don't add a second button style, title style or card component.
- Do use the `primary-*`, `secondary-*` and `gray-*` theme utilities. Don't hard-code hex values in components or reach for other Tailwind palettes.
- Do keep `src/og.ts` colors in step with `global.css` when the palette changes; it is the one place hex values are expected.
- Do wrap full-width bands' inner content in `px-6 2xl:container 2xl:mx-auto`. Don't invent a new container width.
- Do read church name, address and worship times from config. Don't hard-code them in shared components.
- Do add an element only when it carries styling, a landmark or meaning. Don't add wrapper `section`, `div` or `footer` elements for structure alone.
- Do build UI with Astro components and a small inline `<script>` when needed.

## Updating this file

- Update when a shared pattern settles, a component is added, moved, or renamed, or a rule is corrected in review.
- Don't add token values (`global.css` is the source of truth) or one-off page styling.
- Remove rules whose component is gone.
