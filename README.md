# real a11y — Design System

> **Real accessibility, systematised.** The design language behind **real a11y**.

A CSS-first design system shipping tokens, recipe classes, and fonts as a single npm package. Editorial serif voice, practical sans body, one accent color, accessibility-first defaults.

```bash
npm install @real-a11y-dev/design
```

```css
/* your-app.css */
@import "@real-a11y-dev/design/tokens.css"; /* required — CSS vars only */
@import "@real-a11y-dev/design/base.css"; /* optional — element defaults */
@import "@real-a11y-dev/design/recipes.css"; /* optional — utility classes */
@import "@real-a11y-dev/design/fonts.css"; /* optional — DM Sans + DM Serif Display */
```

Tokens are plain CSS custom properties — works with any framework (Tailwind, vanilla, Vue, Svelte, Astro). No JS runtime, no build step.

`tokens.css` is **pure tokens** — importing it never restyles consumer markup. Element defaults (page font, heading family, focus ring, `prefers-reduced-motion`) live in `base.css` and are opt-in.

---

## What's in the box

| Path                  | Contents                                                                                 |
| --------------------- | ---------------------------------------------------------------------------------------- |
| `tokens.css`          | Design tokens — color (HSL), type, spacing, radii, shadows, motion, focus ring           |
| `base.css`            | Element defaults — `body`, headings, `:focus-visible`, `prefers-reduced-motion` (opt-in) |
| `colors_and_type.css` | Recipe classes (`.ra-display-1`, `.ra-eyebrow`, `.ra-link`, …)                           |
| `fonts/fonts.css`     | DM Sans + DM Serif Display via Google Fonts                                              |

---

## Visual foundations

### Palette

Every pair below is verified ≥4.5:1 (WCAG AA, normal text) by `tests/contrast.spec.ts` against `fixtures/contrast.html` in both themes.

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
| `--color-accent-soft`    | hsl(224 76% 95%) | hsl(224 64% 18%) |
| `--color-on-accent`      | hsl(0 0% 100%)   | hsl(222 47% 11%) |
| `--color-code-bg`        | hsl(210 20% 98%) | hsl(222 47% 11%) |
| `--color-code-fg`        | hsl(222 47% 11%) | hsl(210 40% 95%) |
| `--color-code-comment`   | hsl(215 20% 35%) | hsl(215 16% 65%) |
| `--color-diff-add-bg`    | hsl(142 60% 92%) | hsl(142 30% 18%) |
| `--color-diff-remove-bg` | hsl(0 70% 95%)   | hsl(0 50% 22%)   |
| `--primary-600`          | **#2463eb**      | same             |

Single accent ramp `primary-50 → 900`.

- **Text & links.** Use `--color-accent` (theme-aware: primary-700 in light / primary-300 in dark — passes WCAG AA on both backgrounds) for links and emphasized text. Use `--primary-600` for solid surfaces (CTA backgrounds, focus rings, check markers) — never as text on a dark background, it fails AA at 3.65:1.
- **"Soft brand" surfaces.** Reach for `--color-accent-soft` (callouts, badges, quiet brand tints) — flips on `.dark` so it stays readable. Pair with `--color-text-primary` for body copy or `--color-accent` for inline links.
- **Filled brand surfaces.** Pair `--color-accent` background with `--color-on-accent` text (button labels, filled badges). This is the inverse-contrast partner; `--color-text-inverse` is for text on dark surfaces in light mode and is _not_ interchangeable.
- **Code & diff.** `--color-code-bg` / `--color-code-fg` cover the editor surface; `--color-code-comment` is tuned to clear AA on the regular code background _and_ on `--color-diff-add-bg` / `--color-diff-remove-bg`, so syntax-highlighted diffs stay legible.
- **Surface hierarchy.** `--color-bg` → `--color-bg-subtle` (alternating section bands) → `--color-surface` (cards). In light mode `bg` and `surface` are both white because the brand is editorial-flat; in dark, `surface` lifts one step above `bg-subtle` so cards stay visible.

**Dark mode:** add `.dark` (or rely on `prefers-color-scheme: dark` with no `.light` override) on `<html>` — every token above flips automatically.

### Typography

- **Display:** DM Serif Display 400 only — `<h1>`, `<h2>`, section titles.
- **Body:** DM Sans 400/500/600/700 — everything else.
- **Scale:** `--text-display-1` (clamp 36–60px) → `--text-display-2` (30–36px) → `--text-title` (20px) → `--text-body-lg` (18px) → `--text-body` (16px) → `--text-small` (14px) → `--text-xs` (12px, eyebrow). _(Provided by `recipes.css`.)_

### Spacing & shape

`tokens.css` ships a 4px spacing scale: `--space-1` (4px) → `--space-2` (8px) → `--space-3` (12px) → `--space-4` (16px) → `--space-5` (20px) → `--space-6` (24px) → `--space-8` (32px) → `--space-10` (40px) → `--space-12` (48px) → `--space-16` (64px) → `--space-20` (80px) → `--space-24` (96px). Plus `--space-0` for resets.

Layout-y aliases: container `max-w-5xl` (1024px), narrow `max-w-3xl` (768px) for prose, `--nav-height` 4rem, `--section-y` 5rem.

Buttons `rounded-lg` (8px), cards `rounded-2xl` (16px), icon buttons `rounded-md` (6px). Borders do the work — shadows minimal. Card-hover = `shadow-sm`.

### Focus ring

`--ring-color` (defaults to `var(--color-accent)`), `--ring-width` (2px), `--ring-offset` (2px). `base.css` exposes these via `:focus-visible`; override on any element to restyle focus locally without losing the AA-tested colour.

### Motion

`--dur-fast` 150ms, `--dur-normal` 200ms, `--dur-slow` 300ms, `--ease-standard` `cubic-bezier(0.2, 0, 0, 1)`. `prefers-reduced-motion` honored in `base.css`.

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
        "accent-soft": "hsl(var(--color-accent-soft) / <alpha-value>)",
        "on-accent": "hsl(var(--color-on-accent) / <alpha-value>)",
        "code-bg": "hsl(var(--color-code-bg) / <alpha-value>)",
        "code-fg": "hsl(var(--color-code-fg) / <alpha-value>)",
        "code-comment": "hsl(var(--color-code-comment) / <alpha-value>)",
        "diff-add": "hsl(var(--color-diff-add-bg) / <alpha-value>)",
        "diff-remove": "hsl(var(--color-diff-remove-bg) / <alpha-value>)",
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

## Verifying the AA claim

```bash
npm install
npm run test:e2e:install   # one-time: installs Chromium for Playwright
npm run test:e2e           # runs axe-core color-contrast over fixtures/contrast.html
```

`tests/contrast.spec.ts` loads `fixtures/contrast.html`, toggles `.dark` on `<html>`, and runs `@axe-core/playwright` against every intended-AA pair in both themes. CI runs the same suite on every push and pull request.

---

## Publishing

Releases are managed by [Changesets](https://github.com/changesets/changesets).

```bash
npm run changeset    # describe the change; pick patch / minor / major
git add .changeset && git commit -m "chore: changeset" && git push
```

On `main`, `.github/workflows/release.yml` either opens a "Version Packages" PR consolidating pending changesets, or — once that PR is merged — publishes to npm. The `files` whitelist in `package.json` controls exactly what ships.

Pre-1.0 versioning convention: `minor` for breaking changes, `patch` for everything else.

---

## License

MIT © real a11y
