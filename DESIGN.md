# Design

## Visual Theme

Editorial monochrome with a single live wire of brand colour. The canvas is pure white. Typography carries the entire hierarchy — Cal Sans for display, Inter for body. Depth is produced through Cal.com-style multi-layered ring-shadows, never borders or gradients. One accent — a red sampled from the Aktina logo — appears sparingly: section numbers, CTAs, hover states, the asterisk on the wordmark. Everything else is charcoal on white.

## Color Palette

Stated in OKLCH with hex approximations. Chroma is kept low on neutrals (no pure blacks or pure whites).

| Token | Hex | OKLCH | Use |
|---|---|---|---|
| `--color-canvas` | `#FEFEFE` | `oklch(0.995 0.002 25)` | Page background. Barely tinted toward brand hue. |
| `--color-ink` | `#242424` | `oklch(0.24 0.003 250)` | Primary text, CTA button background. |
| `--color-ink-deep` | `#111111` | `oklch(0.14 0.003 250)` | Nav links, high-contrast emphasis. |
| `--color-muted` | `#898989` | `oklch(0.61 0 0)` | Secondary text, captions, metadata. |
| `--color-line` | `rgba(34,42,53,0.08)` | — | Shadow-ring border. Never used as CSS `border`. |
| `--color-brand` | `#E63946` | `oklch(0.62 0.204 25)` | The single accent. CTAs, asterisk, numerals, hover transitions. |
| `--color-brand-ink` | `#FEFEFE` | — | Text on brand-red surfaces. |

Color strategy: **Restrained** (per impeccable). One accent, appearing on less than 10% of surface area.

## Typography

### Families

- **Display — `Cal Sans`** (Google Fonts). Exclusively for headings ≥ 24px. Tight default letter-spacing, optimised for weight 600.
- **Body — `Inter`** (Google Fonts). 300–700 weights loaded. All body copy, navigation labels, captions, UI.
- **Fallback chain — `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`**.

### Scale

| Role | Font | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| Display Hero | Cal Sans | `clamp(3rem, 10vw, 8rem)` | 600 | 0.95 | -0.02em |
| Section H | Cal Sans | `clamp(2.25rem, 5vw, 4.5rem)` | 600 | 1.0 | -0.015em |
| Sub H | Cal Sans | `clamp(1.5rem, 2.5vw, 2.25rem)` | 600 | 1.1 | 0 |
| Eyebrow | Inter | `0.875rem` | 500 | 1.0 | 0.12em (uppercase) |
| Body Large | Inter | `1.125rem` | 400 | 1.6 | 0 |
| Body | Inter | `1rem` | 400 | 1.65 | 0 |
| Caption | Inter | `0.875rem` | 500 | 1.5 | 0 |
| Micro | Inter | `0.75rem` | 500 | 1.4 | 0.04em |

### Rules

- Cal Sans is never used below 20px. If it would need to be small, switch to Inter.
- Body line length capped at **65–75ch**.
- Hierarchy is produced by scale + weight contrast (ratio ≥ 1.25 between steps). No flat scales.

## Elevation

Shadow-first, never `border`. Two-layer composited ring-shadows.

| Level | Definition | Use |
|---|---|---|
| `shadow-ring` | `0 0 0 1px rgba(34,42,53,0.08), 0 1px 2px rgba(19,19,22,0.04)` | Default container hairline |
| `shadow-card` | `0 0 0 1px rgba(34,42,53,0.08), 0 1px 5px -4px rgba(19,19,22,0.70), 0 4px 8px rgba(34,42,53,0.05)` | Cards, callouts |
| `shadow-card-hover` | `0 0 0 1px rgba(34,42,53,0.10), 0 2px 10px -4px rgba(19,19,22,0.70), 0 12px 24px rgba(34,42,53,0.08)` | Hover state of `shadow-card` |
| `shadow-inset-hi` | `inset 0 2px 0 rgba(255,255,255,0.15)` | Subtle pressed-button highlight on dark CTAs |

## Layout

- **Container max-width:** `1200px`, gutters of `clamp(1rem, 4vw, 2rem)`.
- **Section vertical padding:** `clamp(4rem, 10vw, 8rem)`. Generous is the default. Cramped is wrong.
- **Grid:** 12-column on desktop, collapsing to 1-column on mobile with deliberate column spans, never auto-flow-for-its-own-sake.
- **Radii:** `6px` on small controls, `8px` standard, `12px` large cards, `9999px` for pill badges.

## Motion

Governed by framer-motion for React islands; CSS transitions for static interactions.

- **Easings (use these, not CSS defaults):**
  - `ease-out-quart` — `cubic-bezier(0.25, 1, 0.5, 1)` — refined.
  - `ease-out-quint` — `cubic-bezier(0.22, 1, 0.36, 1)` — snappier (default choice).
  - `ease-out-expo` — `cubic-bezier(0.16, 1, 0.3, 1)` — decisive (hero reveals).
  - **Never** bounce or elastic.
- **Durations:**
  - Micro (hover, toggle): 150–200ms
  - State (menu, focus): 250–300ms
  - Reveal / entrance: 600–900ms
  - Exit: ~75% of enter duration
- **Stagger:** 80–120ms between siblings on grouped entrance reveals.
- **Only animate:** `transform` and `opacity`. Never layout properties.
- **`prefers-reduced-motion`:** disable all reveals; instant show. Honour at the framer-motion level via `useReducedMotion`.

## Components

### Nav
Fixed top, white background, `shadow-ring` on scroll past 8px. Logo mark on left (wordmark "AKTINA PRIME*" with brand-red asterisk). Nav links right in Inter 500 at `--color-ink-deep`. Primary CTA on far right — dark charcoal pill-radius `9999px`, white text, inset highlight. Mobile: hamburger opens a full-viewport overlay with large Cal Sans nav links.

### Section Heading Block
Small eyebrow (number + label, e.g. "02 / WHAT WE DO") in Inter 500 uppercase with `--color-brand` number and `--color-ink-deep` label. Below, Cal Sans heading. Below, an optional Inter intro at Body Large capped at 65ch.

### Work Card
White surface, `shadow-card`, radius 12px. On hover: `shadow-card-hover` plus `translateY(-4px)` and 300ms ease-out-quint transition. Large Cal Sans title. Inter tag-row. Short Inter description. Brand-red "View Project" in Inter 500 with underline-on-hover.

### CTA Button — Primary
`--color-ink` background, white text, radius 9999px, padding `0.875rem 1.75rem`, Inter 500 at 1rem, inset-highlight. Hover: scale 1.02 in 150ms. Active: scale 0.98.

### CTA Button — Accent
`--color-brand` background, white text, otherwise identical to Primary. Used sparingly — the hero CTA, the contact CTA.

### Placeholder Media
Rendered as a 16:10 or 1:1 surface with `shadow-card`, radius 12px, a diagonal noise-texture overlay on a subtle charcoal gradient (`oklch(0.22 0.003 250)` → `oklch(0.15 0.003 250)`), and a small Inter label reading "PLACEHOLDER" in the bottom-left at `--color-muted`. Every image slot in the initial build uses this component.

### Footer
White, `shadow-ring` top border. Two-column: wordmark + tagline on left, social handles on right. Below, copyright row in Inter 500 `--color-muted`.

## Do / Don't

### Do
- Keep Cal Sans exclusively for display (≥24px).
- Use the multi-layered shadow system for any elevation.
- Keep body to Inter 400 at 1rem+ on mobile.
- Honour `prefers-reduced-motion` in every React island that animates.
- Use the brand red as a single word of brand — section numbers, one CTA, the asterisk, hover tints.

### Don't
- Use CSS `border` for card containment — use the ring shadow.
- Use gradient text or side-stripe borders (impeccable absolute bans).
- Animate `height`, `width`, `top`, `left`. Use `transform` and `opacity`.
- Use em dashes (— and --) in product copy — prefer commas, colons, periods.
- Add a second brand colour. The red is the one colour.
