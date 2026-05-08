---
"@real-a11y-dev/design": minor
---

Address token coverage gaps surfaced by the VitePress integration (issue #1).

**Breaking (pre-1.0): element defaults moved out of `tokens.css`.**
`tokens.css` is now pure custom-property declarations. Body, headings, `:focus-visible`, and `prefers-reduced-motion` live in a new opt-in `base.css`. Importing tokens no longer silently restyles consumer markup — VitePress headings (and any consumer site managing its own typography) stay intact.

```css
/* before */
@import "@real-a11y-dev/design/tokens.css"; /* injected body + heading rules */

/* after */
@import "@real-a11y-dev/design/tokens.css"; /* CSS vars only */
@import "@real-a11y-dev/design/base.css"; /* optional — element defaults */
```

**New tokens:**

- `--color-accent-soft` — soft brand surface; flips on `.dark`, unlike the static `--primary-100`.
- `--color-on-accent` — inverse-contrast partner for `--color-accent` when used as a filled surface (button labels, badge text).
- `--color-code-bg` / `--color-code-fg` / `--color-code-comment` — code-block surface tokens, comment tuned to clear AA on the regular code background and on diff backgrounds.
- `--color-diff-add-bg` / `--color-diff-remove-bg` — Shiki-flavored diff line backgrounds.
- `--ring-color` / `--ring-width` / `--ring-offset` — focus-ring tokens, consumed by `base.css`'s `:focus-visible` rule.
- `--space-0` through `--space-24` — 4px spacing scale (rem-based).

**Heading colour now inherits.** `base.css`'s `h1/h2/h3` rule no longer hardcodes `color: --color-text-primary`, so a parent surface (e.g. `.surface-accent` setting `color: var(--color-on-accent)`) can recolour its headings without each consumer adding an override. `html` still sets the default.

**WCAG AA claim is now verifiable.** `fixtures/contrast.html` exercises every intended-AA pair; `tests/contrast.spec.ts` runs `@axe-core/playwright` against it in light + dark and gates CI on every push/PR.
