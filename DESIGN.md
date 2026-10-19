---
name: bbcmonticello.com
description: Rules for the existing Berean Bible Church site UI. Token values live in CSS; restyle through current utilities and components.
---

Tokens live in `src/styles/global.css`, which is the source of truth; this file holds rules, not values.

## Overview

A small church's front door, set like a printed bulletin in burgundy and wheat: a white sticky nav bar, a deep-burgundy masthead with the two-tone Berean logo and the address in italics, a wheat breadcrumb strip, and then plain serif reading text on white. The home page swaps the breadcrumbs for a grayscale photo-collage hero. Every page ends the same way, with three footer widgets (Who We Are, The Berean Name, Sunday Worship) above a soft gray wave. The words carry the site; most pages are Scripture-backed prose and nothing else.

- Two hues. Burgundy (`primary-*`) for the masthead, active nav and links; wheat (`secondary-*`) for the breadcrumb strip and the logo's second tone; warm gray for everything else.
- Serif to read, sans to label. Merriweather is the body face; Lato sets page titles and the small, uppercase, widely tracked labels (nav, breadcrumbs, widget titles).
- Flat and quiet. Depth comes from color bands, not cards; the only shadows are the sticky nav, the hero frame and a faint one under buttons.
- One reading column. A sidebar appears only where a page needs one, like the Confessional Statement's table of contents.
- Static and still. No animation beyond view transitions; client scripts stay small and inline.

## Components

Reuse these; copy from the file instead of inventing variants.

- Layouts: `src/layouts/Base.astro` (page shell with `header` and `sidebar` slots), `src/layouts/Singular.astro` (title plus `Prose`; MDX pages use it through `layout:` frontmatter).
- Shell pieces: `Html`, `Head`, `Body`, `Header`, `Content`, `Main`, `Sidebar`, `Footer` in `src/components/layout/`. `Head` owns all meta tags, including `<OgMeta>`.
- Masthead: `SiteNavigation`, `SiteIdentity`, `Logo`, `Breadcrumbs`, `Hero` in `src/components/`.
- Type: `EntryTitle` (`src/components/entry/`) for the page `h1`, `Lead` for an intro paragraph, `Prose` for body content.
- Actions: `Button` (`to` renders a link).
- Widgets: `Widget`, `WidgetTitle`, `WidgetNav` in `src/components/widget/`, used by the footer and sidebar.
- Site data: church name, address, worship times and links in `src/config.ts`.

## Do's and Don'ts

- Do build pages on `Singular`, or on `Base` with its slots. Don't rebuild `Html`, `Head`, `Header` or `Footer` inside a page.
- Do put body content in `Prose` and opt out with `not-prose` (or `Widget prose={false}`). Don't restyle paragraphs, headings or links inside prose with one-off classes.
- Do use `Button`, `Lead`, `EntryTitle` and `Widget`/`WidgetNav`. Don't add a second button style, title style or card component.
- Do use the `primary-*`, `secondary-*` and `gray-*` theme utilities. Don't hard-code hex values in components or reach for other Tailwind palettes.
- Do keep `src/og.ts` colors in step with `global.css` when the palette changes; it is the one place hex values are expected.
- Do wrap full-width bands' inner content in `px-6 2xl:container 2xl:mx-auto`. Don't invent a new container width.
- Do read church name, address and worship times from `src/config.ts` in components. Don't hard-code them in shared components.
- Do keep the Confessional Statement's wording exactly as it is, including "Tri-une"; only its markup may change. Don't fix or modernize its words without explicit approval.
- Do add an element only when it carries styling, a landmark or meaning. Don't add wrapper `section`, `div` or `footer` elements for structure alone.
- Do leave every file as Prettier writes it. Don't add `prettier-ignore`.
- Do build UI with Astro components and a small inline `<script>` when needed. Don't add React or another UI framework, and don't add a dependency for what a few lines of Astro or CSS can do.

## Updating this file

- Add or update when a pattern is shared or settled, a shared component is added, moved, or renamed, or a rule is corrected in review.
- Don't add token values (`global.css` is the source of truth), one-off page styling, or anything the code already makes obvious.
- Remove rules whose component is gone.
