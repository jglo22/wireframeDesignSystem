# Card

A container for one item: a title and supporting text on a card surface. Every value comes from a `card-*` component token.

| Part | Token |
| --- | --- |
| Background | `card-surface` (white); Mid: `card-surface-mid` (grey-200) |
| Outline | `card-stroke` (grey-200) at `border-s`; Mid: none |
| Corners | `card-radius` (radius-m, 8px) |
| Padding | `card-padding` (space-l, 16px) |
| Gap | `card-gap` (space-m, 8px) |
| Title | `subheading-1`, `text-primary` |
| Body | `font-m`, `text-secondary` |

- **Variant** `Surface`: Default or Mid. On Mid, text stays `text-secondary` or darker: `text-muted` fails on grey-200.
- **Figma:** a frame with vertical auto layout; fill, stroke, corners, padding and gap bound to the `card/` variables; the title uses the `subheading-1` text style. One component with a `Surface` variant property.

Built from tokens only; it contains no other components.
