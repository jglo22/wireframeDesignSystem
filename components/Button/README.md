# Button

The basic action control, in three variants: `primary`, `outline` and `ghost`.

- **primary** fills with `brand-primary`. Use it for the single main action on a screen ("Save recipe"). At most one per view.
- **outline** is for secondary actions next to a primary one ("Cancel", "Add note").
- **ghost** is for low-emphasis actions in lists and toolbars ("Edit").
- Labels are verb first and sentence case.
- Every variant is at least `touch-target-min` (44px) tall and wide, uses `radius-m`, and shows a `border-m` focus ring in `brand-primary`.
- Disabled buttons drop to `opacity-disabled`.
- Never fill a button with `brand-secondary`; that colour is for accents only.

Built from tokens only; it contains no other components.
