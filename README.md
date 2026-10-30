# Wireframe Design System

Jim's base design system: complete, unbranded defaults that every brand builds on. Tokens plus starter components: Button and Headings (h1).

## How this system works

- **This is the wireframe.** One colour mode. Primary and secondary colours are greys (each one points at a grey token) on a white background, so structure can be judged on its own. Status colours stay in colour because they carry meaning.
- **Brands inherit from it.** A brand lives in its own project (for example `design-system/` in the wellnessApp repo). It holds only its overrides and pins a version of this repo; everything it doesn't override is inherited. `scripts/flatten.mjs` merges the two into one complete system with two modes, Wireframe and Branded; with `--detach` it produces a standalone copy for handover.
- **Versions.** To release, bump the version in `package.json` and add a CHANGELOG entry; when that reaches `main`, GitHub creates the tag and release itself (`.github/workflows/release.yml`). Brands choose when to take a new version; see CHANGELOG.md.
- **The repo is the master.** The Design System artifacts are generated from it and are read-only. Change the repo, then rebuild them.

## Open decisions

- Recipe app brand.

<!-- shared-rules: everything below is copied into every brand's generated README -->
## Rules

- **Use a token wherever one exists.** Raw values are allowed only when no token covers them. On every build: swap exact matches for the token, flag near misses (15px where the scale has 16), and list repeated new values as token candidates.
- **Naming.** Lowercase and hyphenated. Size scales run xs / s / m / l / xl, and `m` is always the default.
- **Out of scope for now.** Dark mode. Do not invent it.
- **Roles before primitives.** Where a role token exists (for example `radius-card`), use it rather than the primitive it points at.
- **Components nest.** Small components (Atoms) build bigger ones (Molecules, then Blocks, then Pages). Each component README lists what it is built from. Changing a small component updates everything that contains it.

## Colour

- Colour comes in two layers, like radius. **Primitives** are the greys, black, white, `background`, and the primary, secondary and status groups. **Roles** say what a colour is for and point at a primitive: `text-*` (primary, secondary, muted, inverse, link, link-inverse), `surface-*` (page, card, subtle, inverse) and `stroke-*` (subtle, default, strong, focus). "Stroke" is the colour of an outline; its width comes from `border-s`, `border-m` or `border-l`.
- Components and apps use colour roles, never greys directly. A brand changes a role by overriding it in its colour tokens, either pointing at another primitive or giving an exact value.
- Links use `text-link`, or `text-link-inverse` (grey-200) on `surface-inverse`. Text sits in `text-primary` (grey-900), `text-secondary` (grey-700) or `text-muted` (grey-600). `grey-600` passes contrast on `white` and on `background`; `grey-500` and lighter are never text.
- `primary` means "act here": main buttons, links, active tabs, toggles, focus rings, progress. Keep it to roughly 10% of a screen so it keeps its signal.
- `secondary` supports: tags, highlights, small accents. It never fills a button, so nobody has to guess which thing to tap.
- Every primary, secondary and status colour is a group of four: `-light` (tint behind badges and tags), the base, `-dark` (hover, pressed, and text on the tint) and `-contrast` (text and icons on the base).
- Status colours: `error`, `warning`, `info`, `success`. `warning-contrast` is `grey-900` because white fails on amber.
- `background` is the page background.
- **Highlights** (`highlight-1` to `highlight-6`: yellow, pink, orange, lime, cyan, violet) are loud on purpose. They are for review only: mark up a design or screen to flag what needs changing. They never appear in a finished design or shipped app, carry no meaning, and are the same in every mode; brands don't override them.

## Typography

- `font-display` is Atkinson Hyperlegible Next, for headings and large moments. `font-body` is Inter, for body and all UI text. Both are stored in this system as variable font files (Latin, OFL licence), so they load without Google Fonts.
- Each type style's size is also a variable of the same name (`--font-xs` to `--font-4xl`), which the style's class uses. Each style's weight points at a weight token (`fontWeightRef`, for example `weight-regular`), the way a radius role points at a primitive; a brand that gives a plain `fontWeight` instead drops the pointer.
- Sizes derive from two tokens: `type-base` (18px) and `type-ratio` (1.125, Major Second). Each step is base × ratio^n, rounded to one decimal place. Changing either token recalculates the scale.
- Allowed ratios: Minor Second 1.067, Major Second 1.125, Minor Third 1.2, Major Third 1.25, Perfect Fourth 1.333, Augmented Fourth 1.414, Perfect Fifth 1.5, Golden Ratio 1.618.
- Weights: `weight-light` 300 for large display text only (never below `font-xl`), `weight-regular` 400 for body, `weight-medium` 500 for labels and buttons, `weight-semibold` 600 for headings, `weight-bold` 700 sparingly, `weight-extrabold` 800 for page titles in the display face only.
- Line heights: `leading-normal` 1.5 for body (font-m and below), `leading-snug` 1.35 for font-l and font-xl, `leading-tight` 1.2 for font-2xl and up.

## Spacing, radius, borders, shadows

- Spacing runs 2 / 4 / 8 / 16 / 32px as `space-xs` to `space-xl`; `space-m` (8) is the default. `space-none` (0) is for no gap or padding. Larger gaps between groups and page sections use 48 / 64 / 96px, `space-2xl` to `space-4xl`.
- Radius comes in two layers. **Primitives** are the scale: `radius-s` 4, `radius-m` 8, `radius-l` 16, `radius-xl` 24, `radius-full` (round). **Roles** say what a corner is for and point at a primitive: `radius-input` (s), `radius-button` (m), `radius-card` (m), `radius-dialog` (l), `radius-chip` (full).
- On the design system page, the **Corner radius** section shows the primitives and **Radius roles** shows the roles.
- Components and apps use roles, never primitives directly. A brand changes a corner by overriding the role: point it at another primitive, or, if no step fits and the size is deliberate, give it an exact value. If several brands need the same in-between size, add it to the primitives instead.
- Borders: `border-s` 1px by default, `border-m` 2px for focus rings in `primary` and selected states, `border-l` 4px for accent bars.
- Shadows use `grey-900` at low opacity: `shadow-s` for buttons and inputs, `shadow-m` for cards, `shadow-l` for modals. The colour is written into each shadow as `rgba()` rather than pointing at `grey-900`, because a token can't carry its own opacity; if `grey-900` changes, change the shadows with it.

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

## Figma

How this system's tokens are written into a Figma file, and how to work with components there. Nothing here changes token names or CSS.

- **Prefix.** `prefix` in tokens.json marks everything this system adds to Figma, so it stands apart from any other library in the file. It goes in front of every name exactly as written, hyphen included: collections `<prefix>primitives`, `<prefix>roles` and `<prefix>highlights`; modes `<prefix>` plus the colour theme's name in lowercase, without "mode" (`<prefix>wireframe`, `<prefix>branded`); a top-level `<prefix>` group over every variable (`<prefix>/grey/grey-900`); and styles in one group each, `<prefix>typescale` for text styles (`<prefix>typescale/font-xs`) `<prefix>shadows` for effect styles (`<prefix>shadows/shadow-m`) and `<prefix>grids` for layout grid styles (`<prefix>grids/grid-xl`). Token names in the repo and in CSS stay unprefixed (`grey-900`, `--grey-900`), and a variable's code syntax in Figma uses the CSS name (`var(--grey-900)`). Read the prefix from tokens.json; never type it from memory. A brand inherits it unless its brand.json sets its own `prefix`.
- **Groups.** Inside the prefix group, each variable sits in a group named after the first word of its name: `grey/grey-900`, `primary/primary-light`, `text/text-primary`, `space/space-m`, `font/font-xs`. A one-word name that heads a group goes inside that group (`error/error`, next to `error/error-light`). Other one-word names sit directly under the prefix (`black`, `white`, `background`). Layout tokens share no first word, so they all go in one `layout` group (`layout/content-max`, `layout/gutter`).
- **Units.** Figma takes px: convert rem at 1rem = 16px, rounded to one decimal place (spacing 0, 2, 4, 8, 16, 32, 48, 64, 96; font sizes 14.2, 16, 18 and so on). Breakpoints convert from em the same way (768, 1024, 1440). Radius and border widths are already px; weights are plain numbers.
- **Line heights are not variables.** Figma reads a bound number as px, so `leading-*` (1.2, 1.35, 1.5) would become 1.2px. Text styles set line height as a percentage instead (120%, 135%, 150%). CSS keeps `--leading-*`.
- **Font families.** `font/font-display` and `font/font-body` hold the plain family name (`Inter`), not the CSS fallback stack. Their descriptions come from Typography: `font-display` "Headings and large moments.", `font-body` "Body and all UI text."
- **Each variable** gets its token's usage note as its description and its CSS name as its code syntax (`var(--grey-900)`).
- **Who sees what in pickers.** Primitives that roles cover are hidden from pickers: the neutral colours (greys, `black`, `white`, `background`) and the radius primitives (`radius-s` to `radius-full`). Roles can still alias them. Primary, secondary and status colours stay pickable, because components fill with them directly. Other primitives are scoped to where they belong: `space` to gap and padding, `border` to stroke width, font sizes to font size, families to font family, `weight` to font weight.
- **Role scopes.** `text-*` to text fill and shape fill (icons are shapes and take the colour of the text around them); `surface-*` to frame and shape fill; `stroke-*` to stroke colour; radius roles to corner radius.
- **Text styles.** One per type style, `<prefix>typescale/font-xs` to `<prefix>typescale/font-4xl`, in that order. Family, size and weight are bound to variables (`font/font-body`, `font/font-xs`, and the weight token the style's `fontWeightRef` names). Line height is a percentage, letter spacing is 0, and the description is the style's usage note. If a bound weight doesn't pick the right face in a font, leave that weight unbound and say so.
- **Effect styles.** One drop shadow per shadow token, `<prefix>shadows/shadow-s` to `<prefix>shadows/shadow-l`, with x, y and blur from the token, spread 0, and the token's colour and opacity as a literal (not bound: a colour variable carries its own opacity, so binding `grey-900` would make the shadow solid). The description is the usage note.
- **Layout and breakpoints** are variables in `<prefix>primitives`, in px: `breakpoint/breakpoint-m` 768, `breakpoint-l` 1024 and `breakpoint-xl` 1440 (frame widths for tablet, laptop and desktop); `layout/content-max` 1408, `layout/gutter` 8, `layout/margin` 16, `layout/touch-target-min` 44 and `layout/grid-columns-s`, `-m`, `-l` (4, 8, 12). Skip `reading-max`: 70ch has no px value. Scopes: breakpoints, `content-max` and `touch-target-min` to width and height; `gutter` and `margin` to gap and padding; the grid column counts hidden from pickers (only grid styles use them).
- **Grid styles.** One layout grid per screen size: `<prefix>grids/grid-s` 4 columns, stretch (phone); `grid-m` 8 columns, stretch (from `breakpoint-m`); `grid-l` 12 columns, stretch (from `breakpoint-l`); `grid-xl` 12 columns, centred, 110 wide (at `breakpoint-xl`: 16 + 12 × 110 + 11 × 8 + 16 = 1440). Every grid uses `gutter` 8 and, where it stretches, `margin` 16. Bind column count, gutter and margin to their variables where Figma allows; the 110 column width is worked out from `content-max` ((1408 − 11 × 8) ÷ 12), so it stays a literal. The description says which screen the grid is for.
- **Highlights** go in their own collection, `<prefix>highlights` (`highlight/highlight-1` to `highlight/highlight-6`), apart from the system's primitives and roles so they are easy to find or remove. Scoped to all fills and strokes.
- **Syncing.** Each sync compares the Figma file with the repo and makes the `<prefix>` collections and styles match: add what is new, update what changed, and remove what the repo no longer has. The first sync creates them; later syncs update them rather than stopping because they exist. When a name changes, rename the existing variable or style rather than deleting and recreating it, so anything using it keeps its link. No version is recorded in Figma. Nothing outside the prefix is touched.
- **Never detach, swap or rebuild nested components.** Changes cascade through nested component instances, so their links must survive every edit. Never detach an instance, swap a nested component for another, or rebuild it as plain layers. If a rule (a token, a touch target, a style) can only be met by changing something inside a nested component, stop and ask: either change that component's main component, once approved and after checking its other uses, or leave the rule unmet and list the gap. Before and after any build, list the nested instances; if a link is lost, the build has failed: undo it and report it rather than carrying on.
