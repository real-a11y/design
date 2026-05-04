---
name: "@real-a11y-dev/design"
description: Design system for real a11y. CSS-first design tokens, type, color, components, and brand assets shipped as a single npm package.
user-invocable: true
---

Read `README.md` first for foundations and brand rules. Then explore:

- `tokens.css` — CSS custom properties (color, type, spacing, radii, shadows, motion). Works with any framework.
- `colors_and_type.css` — recipe classes (`.ra-display-1`, `.ra-eyebrow`, `.ra-link`, …).
- `fonts/fonts.css` — DM Sans + DM Serif Display.
- `assets/` — logos, favicons, OG/Twitter images, Lucide icons.

## Non-negotiables

- Sentence-case headlines. Eyebrows ALL CAPS with `tracking-widest` (0.1em). No emoji.
- For links and emphasized text use `--color-accent` (theme-aware: primary-700 on light, primary-300 on dark — both pass WCAG AA). Hover = `--color-accent-hover`. The fixed `--primary-600` (#2463eb) is for solid surfaces (CTA backgrounds, focus rings) — never use it directly as text on a dark background, it fails AA at 3.65:1. Focus ring is 2px primary-600, offset 2.
- Display font is **DM Serif Display 400 only** — never use `font-bold` on headings.
- Every section gets `border-b border-border`. Alternate `bg` / `bg-subtle` bands.
- Cards: `rounded-2xl`, `p-6`, border-first (no shadow at rest). Hover: `border-primary-300` + `shadow-sm`.
- 44px minimum tap target on every interactive utility.

## Install

```css
@import "@real-a11y-dev/design/tokens.css";
@import "@real-a11y-dev/design/recipes.css"; /* optional */
@import "@real-a11y-dev/design/fonts.css"; /* optional */
```
