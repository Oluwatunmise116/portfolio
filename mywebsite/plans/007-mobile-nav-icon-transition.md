# 007 — Animate the mobile nav trigger's Menu/X swap

- **Status**: TODO
- **Commit**: 9ed2e43
- **Severity**: LOW
- **Category**: Cohesion / Missed opportunity
- **Estimated scope**: 1 file

## Problem

`src/components/layout/mobile-navigation.tsx` (trigger button, ~line
178-194) swaps `<Menu>`/`<X>` via a React conditional render — an instant
mount/unmount with zero transition. This sits right next to the
best-animated surface on the site: the panel it opens uses
`AnimatePresence`, a correct `transform-origin`, asymmetric enter/exit
timing, and an explicit `useReducedMotion()` check. The trigger icon is the
one visibly untreated piece of an otherwise carefully animated control.

```tsx
// src/components/layout/mobile-navigation.tsx — current
<button
  ref={triggerRef}
  type="button"
  aria-expanded={open}
  aria-controls="mobile-navigation"
  aria-label={open ? "Close navigation menu" : "Open navigation menu"}
  onClick={() => (open ? close() : setOpen(true))}
  className="inline-flex size-10 items-center justify-center rounded-full bg-control text-control-foreground transition-transform duration-160 ease-out-strong active:scale-[0.94]"
>
  {open ? (
    <X aria-hidden="true" className="size-5" />
  ) : (
    <Menu aria-hidden="true" className="size-5" />
  )}
</button>
```

## Target

Render both icons always, stack them absolutely, and drive `opacity` +
`rotate()` off the existing `open` boolean via `cn()` (already imported in
this file) instead of a conditional render.

```tsx
// src/components/layout/mobile-navigation.tsx — target
<button
  ref={triggerRef}
  type="button"
  aria-expanded={open}
  aria-controls="mobile-navigation"
  aria-label={open ? "Close navigation menu" : "Open navigation menu"}
  onClick={() => (open ? close() : setOpen(true))}
  className="relative inline-flex size-10 items-center justify-center rounded-full bg-control text-control-foreground transition-transform duration-160 ease-out-strong active:scale-[0.94]"
>
  <Menu
    aria-hidden="true"
    className={cn(
      "absolute inset-0 m-auto size-5 transition-[opacity,transform] duration-140 ease-out-strong",
      open ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
    )}
  />
  <X
    aria-hidden="true"
    className={cn(
      "absolute inset-0 m-auto size-5 transition-[opacity,transform] duration-140 ease-out-strong",
      open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
    )}
  />
</button>
```

## Repo conventions to follow

- `ease-out-strong` — reused, not a new curve, matching every other
  transition in this file (the panel's own CSS-adjacent pieces, the close
  button inside the panel at `active:scale-[0.94]`, etc.).
- `duration-140` follows the same bare-arbitrary-integer Tailwind pattern
  as `duration-160`/`duration-220`/`duration-280` used throughout this
  codebase — 140ms (not 160) because this sits directly beside core
  navigation and should read as fast, per the original audit's frequency
  reasoning (this control is touched by every mobile visitor, repeatedly).
- `absolute inset-0 m-auto` to overlap two fixed-size icons inside a
  `relative` parent — same pattern as plan 006's theme-toggle icon fix;
  apply it identically here for consistency between the two icon-swap
  controls on the site.
- This is a plain CSS `transition`, not a `motion/react` animation, so it
  is automatically covered by the site's global
  `@media (prefers-reduced-motion: reduce)` rule in `globals.css` — no
  need to thread the `reduceMotion` value (already computed in this file
  via `useReducedMotion()` for the panel's `AnimatePresence` variants)
  through to this icon. That hook stays scoped to the panel animation it
  already governs.

## Steps

1. In `src/components/layout/mobile-navigation.tsx`, find the trigger
   `<button>` (the one with `ref={triggerRef}`, near the end of the
   component, inside `<div className="md:hidden">`).
2. Add `relative` to its className.
3. Replace the `{open ? <X ... /> : <Menu ... />}` conditional with the two
   always-rendered `<Menu>`/`<X>` elements shown in Target, using `cn()`
   for the conditional classes exactly as written.

## Boundaries

- Do NOT touch the `<X>` icon inside the panel itself (the close button at
  the top of the open panel, `className="... active:scale-[0.94]"`,
  currently rendered unconditionally) — that one already has no swap to
  animate and is out of scope.
- Do NOT touch `AnimatePresence`, `sheetVariants`, `exitTransition`, or any
  import from `@/lib/motion` — the panel's own animation is already
  correct and is not part of this plan.
- Do NOT change the focus-trap, Escape-key, or body-scroll-lock logic in
  this file.
- Do NOT change `size-10` (the trigger button's own dimensions) — this was
  deliberately sized to match its sibling controls inside the compact nav
  pill; only the icons inside it change.

## Verification

- **Mechanical**: `npx tsc --noEmit` and
  `npx eslint src/components/layout/mobile-navigation.tsx` clean.
- **Feel check**: on a mobile viewport (or DevTools device emulation),
  below the `md` breakpoint:
  - Tap the trigger open: `Menu` rotates out/fades out while `X` rotates
    in/fades in, synchronized with the panel opening — no flash of both
    icons or neither.
  - Tap `X` (either the trigger or the in-panel close button) to close:
    icon reverses correctly; confirm both the trigger's own icon-swap AND
    the panel's exit animation complete without visual conflict.
  - Tap the trigger rapidly several times: the icon transition retargets
    smoothly (it's a CSS `transition`, not a `@keyframes` animation, so
    this should just work — confirm it does).
  - Confirm the icon reads clearly against `bg-control` in both light and
    dark mode (this button uses the `control`/`control-foreground` token
    pair specifically so it stays legible in both themes — verify nothing
    about the new absolute positioning broke that).
  - Toggle `prefers-reduced-motion` and confirm the icon still swaps
    correctly, collapsed to near-instant via the site's existing global
    rule.
- **Done when**: the icon swap animates in both directions, matches the
  panel's open/close timing well enough that they don't visually fight,
  and `tsc`/`eslint` are clean.
