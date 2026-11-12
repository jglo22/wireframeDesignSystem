# Card

A container for one item: a title and supporting text on a card surface. Every value comes from a `card-*` component token.

| Part | Token |
| --- | --- |
| Background | `card-surface` (white); Mid: `card-surface-mid` (grey-200) |
| Outline | `card-stroke` (grey-200) at `border-s`; Mid: none |
| Corners | `card-radius` (radius-m, 8px) |
| Padding | `card-padding` (space-l, 16px) |
| Gap | `card-gap` (space-m, 8px) |
| Title | `card-heading` (follows `subheading-1`), `card-heading-colour` (grey-900) |
| Body | `card-body` (font-m), `card-body-colour` (grey-700) |
| Supporting text | `card-body-secondary` (font-xs), `card-body-secondary-colour` (grey-600) |

- **Variant** `Surface`: Default or Mid. On Mid, all text uses `card-body-colour` or darker: `card-body-secondary-colour` (grey-600) fails on grey-200.
- **Figma:** a frame with vertical auto layout; fill, stroke, corners, padding and gap bound to the `card/` variables. Text uses the `<prefix>type/card/heading`, `/body` and `/body-secondary` text styles, with the matching `card/*-colour` variable as its fill (text styles can't carry colour). One component with a `Surface` variant property.

Built from tokens only; it contains no other components.
