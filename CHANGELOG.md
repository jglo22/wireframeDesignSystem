# Changelog

Versions follow major.minor.patch:

- **patch** (1.0.1): fixes. Safe to take.
- **minor** (1.1.0): additions, such as a new token or component. Safe to take.
- **major** (2.0.0): renames or removals. A brand may need changes before taking it.

## 1.9.0 (2026-10-30)

- The prefix is now `jg-`, and Figma names use it exactly as written: collections `jg-primitives` and `jg-roles`, mode `jg-Wireframe`, variables under a `jg-` group (`jg-/grey/grey-900`).
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
