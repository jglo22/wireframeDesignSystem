# Changelog

Versions follow major.minor.patch:

- **patch** (1.0.1): fixes. Safe to take.
- **minor** (1.1.0): additions, such as a new token or component. Safe to take.
- **major** (2.0.0): renames or removals. A brand may need changes before taking it.

## 2.2.0 (2026-10-30)

- New spacing: `space-none` (0), and `space-2xl` 48, `space-3xl` 64 and `space-4xl` 96 for gaps between groups and page sections.
- New colour role: `text-link-inverse` (grey-200), for links on `surface-inverse`.

## 2.1.0 (2026-10-30)

- README, Figma section: never detach, swap or rebuild nested components. If a rule can only be met inside a nested component, stop and ask (change its main component once approved, or list the gap). A build that loses a nested link has failed and is undone.

## 2.0.0 (2026-10-30)

Renames. A brand may need changes before taking this version.

- `brand-primary` and `brand-secondary` and their groups are renamed `primary` and `secondary`: `primary-light`, `primary`, `primary-dark`, `primary-contrast`, and the same for `secondary`. Values are unchanged. The old names read as a mistake in Wireframe mode, where these colours are grey.
- Button, `text-link` and `stroke-focus` use the new names. They look the same.
- In Figma the group becomes `jg-/primary/…` and `jg-/secondary/…`; a sync renames the variables in place.

To take this version:

- **brand.json:** rename `brand-primary…` and `brand-secondary…` colour overrides (names and `{brand-…}` aliases) to `primary…` and `secondary…`. Until you do, the export still accepts the old names and warns about each one.
- **App styles:** replace `var(--brand-primary…)` and `var(--brand-secondary…)` with `var(--primary…)` and `var(--secondary…)`. The export does not keep the old CSS names.

## 1.16.0 (2026-10-30)

- README, Figma section: breakpoints and layout tokens become variables in `jg-primitives` (px; `reading-max` skipped), and four layout grid styles, `jg-grids/grid-s` to `grid-xl` (4, 8, 12 and 12 centred columns, gutter 8, margin 16). No token or CSS changes.

## 1.15.0 (2026-10-30)

- New colours for review mark-up: `highlight-1` to `highlight-6` (yellow, pink, orange, lime, cyan, violet). Review only, never in a finished design. In Figma they get their own collection, `jg-highlights`.
- README, Figma section: descriptions for the two font family variables, and a "Syncing" rule (compare with the repo and update the `jg-` collections and styles, renaming in place; no version recorded in Figma).
- Figma style names: text styles under `jg-typescale` (`jg-typescale/font-xs`) and effect styles under `jg-shadows` (`jg-shadows/shadow-s`), replacing `jg-/font/…` and `jg-/shadow/…`. Variables are unchanged.

## 1.14.0 (2026-10-30)

- README: shadows keep their colour as a literal `rgba()` of `grey-900` (a token can't carry its own opacity); change them together. New Figma rule, "Effect styles": one drop shadow per shadow token, spread 0, colour and opacity literal, not bound.

## 1.13.0 (2026-10-30)

- Each type style points at its weight token (`fontWeightRef`: `weight-regular`, `weight-medium` or `weight-semibold`), and the CSS classes use it (`font-weight: var(--weight-regular)`). The weights are unchanged. A brand that sets a plain `fontWeight` on a style drops the pointer.
- README, Figma section: a "Text styles" rule (family, size and weight bound to variables; line height as a percentage; letter spacing 0; usage note as description).

## 1.12.0 (2026-10-30)

- README, Figma section: radius primitives are hidden from pickers too, so designers pick radius roles. New "Role scopes" rule: `text-*` to text and shape fill (so icons can use text colours), `surface-*` to frame and shape fill, `stroke-*` to stroke colour, radius roles to corner radius.

## 1.11.0 (2026-10-30)

- New CSS variables for font sizes, `--font-xs` to `--font-4xl`. The type classes use them; the sizes are unchanged.
- README: a new Figma section gathers the prefix and group rules and adds units (px), line heights (percentages in text styles, not variables), font family names, descriptions and code syntax, and which variables show in pickers (neutral colour primitives hidden).

## 1.10.0 (2026-10-30)

- New rule, Figma groups: each variable or style is grouped by the first word of its name (`jg-/grey/grey-900`). Status bases go inside their group (`jg-/error/error`); `black`, `white` and `background` sit directly under the prefix (`jg-/black`); layout tokens share one `layout` group.

## 1.9.1 (2026-10-30)

- Figma mode names are lowercase, like the collections: `jg-wireframe` (and `jg-branded` for a brand).

## 1.9.0 (2026-10-30)

- The prefix is now `jg-`, and Figma names use it exactly as written: collections `jg-primitives` and `jg-roles`, mode `jg-Wireframe` (lowercased to `jg-wireframe` in 1.9.1), variables under a `jg-` group (`jg-/grey/grey-900`).
- Text styles and effect styles get the prefix too: `jg-/font/font-xs`, `jg-/shadow/shadow-m`.
- Token names and CSS are unchanged.

## 1.8.1 (2026-10-30)

- The Figma prefix rule now covers modes too: `jg-Wireframe` (and `jg-Branded` for a brand). Token names and CSS are unchanged.

## 1.8.0 (2026-10-30)

- New `prefix` field in tokens.json, set to `jg`. It marks this system's variables in Figma: collections `jg-Primitives` and `jg-Roles`, variables under a top-level `jg` group. Token names and CSS are unchanged.
- A brand inherits the prefix, or sets its own `prefix` in brand.json.

## 1.7.0 (2026-10-29)

- Colour roles: `text-primary`, `text-secondary`, `text-muted`, `text-inverse`, `text-link`; `surface-page`, `surface-card`, `surface-subtle`, `surface-inverse`; `stroke-subtle`, `stroke-default`, `stroke-strong`, `stroke-focus`. Each points at a colour primitive.
- Button and Headings use colour roles. They look the same as before.
- The semantic colour layer is no longer out of scope.

## 1.6.0 (2026-10-29)

- New radius primitive: `radius-xl` 24px.

## 1.5.1 (2026-10-29)

- Radius primitives move back into the page's built-in Corner radius section (token group `radius`), so they show as visual corner previews and the empty section goes. Radius roles keep their own section. Token names unchanged.

## 1.5.0 (2026-10-29)

- Radius primitives and radius roles each get their own section, titled "Radius primitives" and "Radius roles" (token groups `radiusPrimitives` and `radiusRoles`). Token names are unchanged.
- Brand files that still use the old group names (`radius`, `radiusRole`) keep working.

## 1.4.0 (2026-10-29)

- Radius now has two layers. The existing `radius-s`, `radius-m`, `radius-l` and `radius-full` are the **primitives**. New **role** tokens say what a corner is for and point at a primitive: `radius-input`, `radius-button`, `radius-card`, `radius-dialog`, `radius-chip`.
- Components and apps should use roles. Button now uses `radius-button` (same 8px as before).
- Brands override a role by pointing it at another primitive (`"ref"`) or, as an exception, an exact `"value"`. The export resolves roles and keeps their notes accurate.
- Nothing renamed or removed: existing brands look the same.

## 1.3.0 (2026-10-29)

- New token `weight-light` (300), for large display text only, never below `font-xl`.

## 1.2.1 (2026-10-29)

- Handover exports no longer record which wireframe version they came from, and the `background` note no longer mentions the wireframe.

## 1.2.0 (2026-10-29)

- A detached (handover) export gets its own standalone README: no inheritance, levers or workflow notes, only how to use the files, followed by the shared rules.
- Shared rules no longer mention specific brands or apps; open decisions moved out of them.

## 1.1.0 (2026-10-29)

- Export lists Wireframe mode first, then Branded.
- Export writes a README: the brand's own README followed by this repo's shared rules, so a brand's generated design system carries its full narrative.
- Tokens a brand overrides are labelled "<Brand> override." in their usage notes.
- README split into a wireframe intro and shared rules (marked `shared-rules`).
- Releases are created automatically when a new version in `package.json` reaches `main`.

## 1.0.0 (2026-10-29)

First release. Colours, spacing, type scale, weights (including `weight-extrabold` 800), line heights, radius, borders, shadows, icons, layout, motion, opacity, layers. Fonts: Atkinson Hyperlegible Next (display) and Inter (body). Components: Button, Headings (h1 only).
