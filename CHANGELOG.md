# Changelog

Versions follow major.minor.patch:

- **patch** (1.0.1): fixes. Safe to take.
- **minor** (1.1.0): additions, such as a new token or component. Safe to take.
- **major** (2.0.0): renames or removals. A brand may need changes before taking it.

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
