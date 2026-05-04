# real a11y — Design System

> **Real accessibility, systematised.** The design language behind **real a11y**.

A CSS-first design system shipping tokens, recipe classes, and fonts as a single npm package. Editorial serif voice, practical sans body, one accent color, accessibility-first defaults.

```bash
npm install @real-a11y-dev/design
```

```css
/* your-app.css */
@import "@real-a11y-dev/design/tokens.css"; /* required — CSS vars */
@import "@real-a11y-dev/design/recipes.css"; /* optional — utility classes */
@import "@real-a11y-dev/design/fonts.css"; /* optional — DM Sans + DM Serif Display */
```

Tokens are plain CSS custom properties — works with any framework (Tailwind, vanilla, Vue, Svelte, Astro). No JS runtime, no build step.

---

## What's in the box

| Path                  | Contents                                                                 |
| --------------------- | ------------------------------------------------------------------------ |
| `tokens.css`          | Design tokens — color (HSL + hex), type, spacing, radii, shadows, motion |
| `colors_and_type.css` | Recipe classes (`.ra-display-1`, `.ra-eyebrow`, `.ra-link`, …)           |
| `fonts/fonts.css`     | DM Sans + DM Serif Display via Google Fonts                              |

---

## Visual foundations

### Palette

| Token                    | Light            | Dark             |
| ------------------------ | ---------------- | ---------------- |
| `--color-bg`             | hsl(0 0% 100%)   | hsl(222 47% 8%)  |
| `--color-bg-subtle`      | hsl(210 20% 98%) | hsl(222 47% 11%) |
| `--color-surface`        | hsl(0 0% 100%)   | hsl(222 47% 12%) |
| `--color-border`         | hsl(220 13% 91%) | hsl(222 47% 20%) |
| `--color-text-primary`   | hsl(222 47% 11%) | hsl(210 40% 95%) |
| `--color-text-secondary` | hsl(215 20% 40%) | hsl(215 20% 65%) |
| `--color-text-muted`     | hsl(215 16% 45%) | hsl(215 16% 65%) |
| `--color-accent`         | hsl(224 76% 45%) | hsl(221 90% 78%) |
| `--color-accent-hover`   | hsl(224 76% 36%) | hsl(221 96% 87%) |
| `--primary-600`          | **#2463eb**      | same             |

Single accent ramp `primary-50 → 900`. Use `--color-accent` (theme-aware: primary-700 in light / primary-300 in dark — passes WCAG AA on both backgrounds) for links and emphasized text. Use `--primary-600` for solid surfaces (CTA backgrounds, focus rings, check markers) — never as text on a dark background, it fails AA at 3.65:1. `primary-300` is also used for card-hover borders.

**Dark mode:** add `.dark` (or `[data-theme="dark"]`) on `<html>` — tokens flip automatically.

### Typography

- **Display:** DM Serif Display 400 only — `<h1>`, `<h2>`, section titles.
- **Body:** DM Sans 400/500/600/700 — everything else.
- **Scale:** `--text-display-1` (clamp 36–60px) → `--text-display-2` (30–36px) → `--text-title` (20px) → `--text-body-lg` (18px) → `--text-body` (16px) → `--text-small` (14px) → `--text-xs` (12px, eyebrow).

### Spacing & shape

- Container `max-w-5xl` (1024px). Narrow `max-w-3xl` (768px) for prose.
- Section padding `py-16 sm:py-20` (hero/CTA `py-20 sm:py-28`).
- Buttons `rounded-lg` (8px), cards `rounded-2xl` (16px), icon buttons `rounded-md` (6px).
- Borders do the work — shadows minimal. Card-hover = `shadow-sm`.

### Motion

`--dur-quick` 150ms, `--dur-base` 220ms, `--ease-out` `cubic-bezier(0.2, 0, 0, 1)`. `prefers-reduced-motion` honored in `tokens.css`.

### States

| Component      | Rest                        | Hover                              | Focus                         |
| -------------- | --------------------------- | ---------------------------------- | ----------------------------- |
| Primary button | `bg-primary-600 text-white` | `bg-primary-700`                   | 2px primary-600 ring (global) |
| Text link      | `text-accent`               | `hover:text-accent-hover`          | (global)                      |
| Card           | `border-border`             | `border-primary-300` + `shadow-sm` | (global)                      |
| Nav link       | `text-text-secondary`       | `hover:text-accent`                | (global)                      |
| Icon button    | `text-text-muted`           | `bg-bg-subtle text-text-primary`   | (global)                      |

44px minimum tap target on every interactive utility.

---

## Tailwind integration

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--color-bg) / <alpha-value>)",
        "bg-subtle": "hsl(var(--color-bg-subtle) / <alpha-value>)",
        surface: "hsl(var(--color-surface) / <alpha-value>)",
        border: "hsl(var(--color-border) / <alpha-value>)",
        "text-primary": "hsl(var(--color-text-primary) / <alpha-value>)",
        "text-secondary": "hsl(var(--color-text-secondary) / <alpha-value>)",
        "text-muted": "hsl(var(--color-text-muted) / <alpha-value>)",
        accent: "hsl(var(--color-accent) / <alpha-value>)",
        "accent-hover": "hsl(var(--color-accent-hover) / <alpha-value>)",
        primary: {
          50: "hsl(221 100% 97%)",
          100: "hsl(221 100% 94%)",
          200: "hsl(221 94% 87%)",
          300: "hsl(221 90% 78%)",
          400: "hsl(221 86% 68%)",
          500: "hsl(221 83% 58%)",
          600: "hsl(221 83% 53%)",
          700: "hsl(224 76% 45%)",
          800: "hsl(224 76% 36%)",
          900: "hsl(224 76% 25%)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-body)"],
      },
    },
  },
} satisfies Config;
```

---

## Publishing

```bash
npm version patch     # or minor/major
npm publish --access public
```

`package.json` is configured for public npm — the `files` whitelist controls exactly what ships.

---

## License

MIT © real a11y
