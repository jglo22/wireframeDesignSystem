# Wireframe Design System

Jim's base design system: complete, unbranded defaults that every brand builds on. Tokens plus starter components: Button and Headings (h1).

## How this system works

- **This is the wireframe.** One colour mode. Brand colours are greys (each one points at a grey token) on a white background, so structure can be judged on its own. Status colours stay in colour because they carry meaning.
- **Brands inherit from it.** A brand lives in its own project (for example `design-system/` in the wellnessApp repo). It holds only its overrides and pins a version of this repo; everything it doesn't override is inherited. `scripts/flatten.mjs` merges the two into one complete system with two modes, Wireframe and Branded; with `--detach` it produces a standalone copy for handover.
- **Versions.** To release, bump the version in `package.json` and add a CHANGELOG entry; when that reaches `main`, GitHub creates the tag and release itself (`.github/workflows/release.yml`). Brands choose when to take a new version; see CHANGELOG.md.
- **The repo is the master.** The Design System artifacts are generated from it and are read-only. Change the repo, then rebuild them.

## Open decisions

- Semantic colour layer (text-primary, surface, border and so on): needed before the apps are built.
- Recipe app brand.

<!-- shared-rules: everything below is copied into every brand's generated README -->
## Rules

- **Use a token wherever one exists.** Raw values are allowed only when no token covers them. On every build: swap exact matches for the token, flag near misses (15px where the scale has 16), and list repeated new values as token candidates.
- **Naming.** Lowercase and hyphenated. Size scales run xs / s / m / l / xl, and `m` is always the default.
- **Out of scope for now.** Dark mode and a semantic colour layer. Do not invent either.
- **Components nest.** Small components (Atoms) build bigger ones (Molecules, then Blocks, then Pages). Each component README lists what it is built from. Changing a small component updates everything that contains it.

## Colour

- Text sits in `grey-900` (primary), `grey-700` (secondary) or `grey-600` (muted). `grey-600` passes contrast on `white` and on `background`; `grey-500` and lighter are never text.
- `brand-primary` means "act here": main buttons, links, active tabs, toggles, focus rings, progress. Keep it to roughly 10% of a screen so it keeps its signal.
- `brand-secondary` supports: tags, highlights, small accents. It never fills a button, so nobody has to guess which thing to tap.
- Every brand and status colour is a group of four: `-light` (tint behind badges and tags), the base, `-dark` (hover, pressed, and text on the tint) and `-contrast` (text and icons on the base).
- Status colours: `error`, `warning`, `info`, `success`. `warning-contrast` is `grey-900` because white fails on amber.
- `background` is the page background.

## Typography

- `font-display` is Atkinson Hyperlegible Next, for headings and large moments. `font-body` is Inter, for body and all UI text. Both are stored in this system as variable font files (Latin, OFL licence), so they load without Google Fonts.
- Sizes derive from two tokens: `type-base` (18px) and `type-ratio` (1.125, Major Second). Each step is base × ratio^n, rounded to one decimal place. Changing either token recalculates the scale.
- Allowed ratios: Minor Second 1.067, Major Second 1.125, Minor Third 1.2, Major Third 1.25, Perfect Fourth 1.333, Augmented Fourth 1.414, Perfect Fifth 1.5, Golden Ratio 1.618.
- Weights: `weight-regular` 400 for body, `weight-medium` 500 for labels and buttons, `weight-semibold` 600 for headings, `weight-bold` 700 sparingly, `weight-extrabold` 800 for page titles in the display face only.
- Line heights: `leading-normal` 1.5 for body (font-m and below), `leading-snug` 1.35 for font-l and font-xl, `leading-tight` 1.2 for font-2xl and up.

## Spacing, radius, borders, shadows

- Spacing runs 2 / 4 / 8 / 16 / 32px as `space-xs` to `space-xl`; `space-m` (8) is the default.
- Radius: `radius-s` 4 for inputs and tags, `radius-m` 8 for buttons and cards, `radius-l` 16 for sheets, `radius-full` for pills and avatars.
- Borders: `border-s` 1px by default, `border-m` 2px for focus rings in `brand-primary` and selected states, `border-l` 4px for accent bars.
- Shadows use `grey-900` at low opacity: `shadow-s` for buttons and inputs, `shadow-m` for cards, `shadow-l` for modals.

## Iconography

Google Material Symbols, Rounded style only. Settings: `icon-weight` 400 to match body text, `icon-fill` 0 (1 for active and selected states), `icon-grade` 0 (−25 on dark backgrounds). Sizes `icon-s` 16, `icon-m` 24 (default), `icon-l` 32, with the font's optical size matched to the rendered size. Icons inherit the colour of surrounding text.

## Layout

- Mobile-first. Breakpoints are minimum widths: `breakpoint-m` 768px (48em), `breakpoint-l` 1024px (64em), `breakpoint-xl` 1440px (90em).
- Grid: 4 columns on phone, 8 from `breakpoint-m`, 12 from `breakpoint-l`. `gutter` 8px and `margin` 16px at every size.
- `content-max` 1408px. At 1440: 16 + 12 × 110 + 11 × 8 + 16 = 1440. Figma layout grid: 12 columns, Center, width 110, gutter 8.
- `reading-max` 70ch for long text such as instructions or articles.
- `touch-target-min` 44px: nothing tappable is smaller.

## Units and behaviour

- Tokens are thought of in px. Font sizes and spacing are output in rem (1rem = 16px) so they respect the user's text-size setting; media queries use em; borders, radius and shadows stay px; line heights are unitless.
- Leave the root font size at the browser default. No 62.5% trick.
- Motion: `motion-fast` 150ms, `motion-medium` 250ms (default), `motion-slow` 400ms, all on `motion-easing`.
- `opacity-disabled` 0.4. Layers: `layer-dropdown` 100, `layer-sticky` 200, `layer-modal` 300, `layer-toast` 400.
