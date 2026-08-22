# 006 — Crossfade the theme toggle's Sun/Moon icon

- **Status**: TODO
- **Commit**: 9ed2e43
- **Severity**: LOW
- **Category**: Missed opportunity / Cohesion
- **Estimated scope**: 1 file

## Problem

`src/components/layout/theme-toggle.tsx:30-31` swaps the Sun/Moon icon via
Tailwind's `hidden`/`block` on the `dark:` variant. `display` cannot be
transitioned, so the icon hard-cuts even though everything else about this
control (the button's own `active:scale-[0.94]`, its `hover:text-foreground`
color transition, its focus ring, its 44px target) is already animated
correctly.

```tsx
// src/components/layout/theme-toggle.tsx:23-33 — current
<button
  type="button"
  onClick={toggle}
  aria-label="Switch between light and dark theme"
  className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-[color,transform] duration-160 ease-out-strong hover:text-foreground active:scale-[0.94]"
>
  <Sun aria-hidden="true" className="hidden size-[18px] dark:block" />
  <Moon aria-hidden="true" className="size-[18px] dark:hidden" />
</button>
```

## Target

Stack both icons absolutely and transition `opacity` + `rotate()` on the
`dark:` variant instead of toggling `display`. The `dark` class on
`<html>` remains the only thing driving this — no JS state, no hydration
risk introduced.

```tsx
// src/components/layout/theme-toggle.tsx:23-33 — target
<button
  type="button"
  onClick={toggle}
  aria-label="Switch between light and dark theme"
  className="relative inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-[color,transform] duration-160 ease-out-strong hover:text-foreground active:scale-[0.94]"
>
  <Sun
    aria-hidden="true"
    className="absolute inset-0 m-auto size-[18px] rotate-90 opacity-0 transition-[opacity,transform] duration-180 ease-out-strong dark:rotate-0 dark:opacity-100"
  />
  <Moon
    aria-hidden="true"
    className="absolute inset-0 m-auto size-[18px] rotate-0 opacity-100 transition-[opacity,transform] duration-180 ease-out-strong dark:-rotate-90 dark:opacity-0"
  />
</button>
```

Note on easing: the original audit suggested plain `ease` for this specific
transition (it's a state flip, not an entrance or an on-screen move). This
plan deliberately overrides that in favor of `ease-out-strong` — the same
curve already used by every other transition on this exact button — so as
not to introduce a second timing function into one 44px control. This is a
stricter reading of "do not introduce unnecessary new easing curves," not a
correction of the audit.

## Repo conventions to follow

- `ease-out-strong` / `--ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1)` —
  already used on this exact button for `hover:text-foreground`
  (`theme-toggle.tsx:28`) and sitewide. Reuse it; do not add `ease`.
- `duration-160`, `duration-220`, `duration-280` are already used as bare
  Tailwind arbitrary-integer duration utilities throughout this codebase
  (e.g. `button.tsx:17`, `faq.tsx:48`) — `duration-180` follows the same
  pattern, no bracket syntax needed.
- Absolute-centering a fixed-size icon inside a relatively-positioned
  parent via `absolute inset-0 m-auto` is not used elsewhere in this repo,
  but is the standard, dependency-free way to overlap two icons without
  breaking the button's existing `inline-flex items-center justify-center`
  layout for anything else that might be added inside it later.

## Steps

1. In `src/components/layout/theme-toggle.tsx`, add `relative` to the
   `<button>`'s className (it has no positioning context today).
2. Replace `<Sun aria-hidden="true" className="hidden size-[18px] dark:block" />`
   with the target `<Sun>` markup above.
3. Replace `<Moon aria-hidden="true" className="size-[18px] dark:hidden" />`
   with the target `<Moon>` markup above.

## Boundaries

- Do NOT change `toggle()`'s logic, the `localStorage` write, or the
  `aria-label` — this plan is icon-transition-only.
- Do NOT change the button's own `active:scale-[0.94]` or its border/hover
  color treatment.
- Do NOT touch the inline theme-init script in `src/app/layout.tsx` — the
  pre-hydration flash prevention is unrelated and must not be touched.
- Do NOT add a transition to `html`/`body`/`.dark` background or text
  colors anywhere — theme switching itself must remain instant. This plan
  only ever touches the 18px icon inside this one button.

## Verification

- **Mechanical**: `npx tsc --noEmit` and
  `npx eslint src/components/layout/theme-toggle.tsx` clean.
- **Feel check**: in both light and dark starting states:
  - Click the toggle: the visible icon rotates and fades out while the
    other rotates in and fades in — no moment where both or neither icon
    is visible, and no layout shift (button stays 44px, icon stays
    centered).
  - Confirm the icon is clearly legible against `bg-surface` in **both**
    themes (light: dark icon on white-ish surface; dark: light icon on the
    dark surface) — this is a contrast check, not just a motion check.
  - Click rapidly several times in a row — the animation should retarget
    smoothly each time (this is a CSS `transition`, not a `@keyframes`
    animation, so it's interruptible by construction; confirm it actually
    behaves that way).
  - In DevTools Animations panel, set playback to 10% and confirm the
    rotate and opacity changes are synchronized (no icon "arriving late").
  - Toggle `prefers-reduced-motion` (Rendering panel) and confirm the icon
    still swaps correctly, collapsed to near-instant via the site's global
    reduced-motion rule (`globals.css:519-544` — `transition-duration:
    0.01ms !important` applies to this transition automatically, no extra
    code needed).
- **Done when**: the icon crossfades in both themes, contrast holds in
  both themes, and `tsc`/`eslint` are clean.
