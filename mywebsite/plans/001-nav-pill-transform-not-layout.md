# 001 — Animate the nav pill with transform instead of padding/margin

- **Status**: DONE (applied at 502f4c1)
- **Commit**: 502f4c1
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 1 file, ~4 lines

## Problem

The floating pill navigation shrinks slightly once the page is scrolled past
24px. It does that by animating `padding` and `margin` — both layout
properties. Every crossing of the threshold runs a 220ms animation that
forces layout, paint and composite on the header subtree (avatar, four nav
links, Contact button) on every frame.

This is the only animation in the site triggered by **scrolling**, which is
the worst place to put layout work: it competes with scroll handling for the
same frames.

```tsx
// src/components/layout/site-header.tsx:38-42 — current
<div
  className={cn(
    "pointer-events-auto mt-4 flex w-full max-w-fit items-center gap-1 rounded-full border border-border bg-surface/90 shadow-pill backdrop-blur-md transition-[padding,margin] duration-220 ease-out-strong",
    scrolled ? "mt-2.5 py-1 pr-1 pl-1.5" : "py-1.5 pr-1.5 pl-2",
  )}
>
```

`transition-[padding,margin]` names two layout properties explicitly. The
conditional class swaps `mt-4 → mt-2.5` (16px → 10px), `py-1.5 → py-1`
(6px → 4px), `pr-1.5 → pr-1`, and `pl-2 → pl-1.5`.

The shrink-on-scroll behaviour itself is a deliberate product requirement —
keep it. Only the technique changes.

## Target

Hold the padding constant at the unscrolled value and express the shrink as
a compositor-only transform. `scale(0.94)` reproduces the ~6% size reduction
of the padding change, and `-translate-y-1.5` (6px) reproduces the
`mt-4 → mt-2.5` change.

```tsx
// target
<div
  className={cn(
    "pointer-events-auto mt-4 flex w-full max-w-fit items-center gap-1 rounded-full border border-border bg-surface/90 py-1.5 pr-1.5 pl-2 shadow-pill backdrop-blur-md transition-transform duration-220 ease-out-strong",
    scrolled ? "-translate-y-1.5 scale-[0.94]" : "translate-y-0 scale-100",
  )}
>
```

Changes, precisely:

1. `transition-[padding,margin]` → `transition-transform`
2. Move `py-1.5 pr-1.5 pl-2` out of the conditional and into the base class
   list (it becomes the permanent padding).
3. Conditional becomes `-translate-y-1.5 scale-[0.94]` / `translate-y-0 scale-100`.
4. `mt-4` stays in the base class list and no longer changes.

Keep `duration-220` and `ease-out-strong` exactly as they are — the timing is
already correct and matches the rest of the site.

Do **not** add `will-change: transform`. The element is permanently on
screen, and a permanent `will-change` holds a compositor layer for the whole
session for a transition that fires rarely.

## Repo conventions to follow

- Motion tokens live in `src/app/globals.css` under `:root`. The relevant
  ones already exist: `--ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1)`
  and `--duration-base: 220ms`. Do not add new tokens for this.
- Tailwind arbitrary transition-property syntax is used throughout, e.g.
  `transition-[transform,opacity]`. Prefer the built-in
  `transition-transform` when only transform animates.
- Exemplar of transform-only motion already done correctly in this repo:
  `src/components/projects/project-card.tsx:75` —
  `"object-cover transition-transform duration-280 ease-out-strong group-hover:scale-[1.04]"`.
- Class strings are composed with `cn()` from `src/lib/utils.ts`; keep that.

## Steps

1. Open `src/components/layout/site-header.tsx`.
2. In the `<div>` beginning at line 38, replace the two-argument `cn(...)`
   call with the target above: move `py-1.5 pr-1.5 pl-2` into the first
   (base) string, swap `transition-[padding,margin]` for
   `transition-transform`, and replace the conditional string with
   `scrolled ? "-translate-y-1.5 scale-[0.94]" : "translate-y-0 scale-100"`.
3. Change nothing else in the file — the `useEffect` scroll listener, the
   24px threshold, and the `layoutId="nav-active-pill"` motion element all
   stay exactly as they are.

## Boundaries

- Do NOT touch `src/components/layout/mobile-navigation.tsx`,
  `src/components/ui/avatar.tsx`, or any other component.
- Do NOT change the scroll threshold (24px) or the `passive: true` listener.
- Do NOT remove the shrink-on-scroll behaviour — it is a product
  requirement; only its implementation changes.
- Do NOT add `will-change`, `translate3d`, or `backface-visibility` hacks.
- Do NOT add new dependencies.
- If the code at `site-header.tsx:38-42` does not match the "current"
  excerpt above (drift since commit 502f4c1), STOP and report instead of
  improvising.

## Verification

- **Mechanical**: from `mywebsite/`, run
  `npm run lint && npm run typecheck && npm run build`.
  All three must exit 0 and the build must report 23/23 static pages.
- **Feel check**: run `npm run start -- -p 3100` and open the home page.
  - Scroll slowly past the 24px mark and back. The pill should shrink and
    rise by a hair — the same visual result as before, with no reflow of the
    nav links inside it.
  - Open DevTools → Performance, record while scrolling across the
    threshold repeatedly. Confirm the transition produces **no "Layout"
    entries** attributable to the header (before this change it produced one
    per frame for 220ms).
  - In DevTools → Animations, set playback speed to 10% and cross the
    threshold. Confirm the pill scales and translates smoothly and the text
    inside does not reflow or rewrap at any point.
  - DevTools → Rendering → enable "Emulate prefers-reduced-motion". Cross
    the threshold and confirm the size change is instant (the global
    reduced-motion rule in `globals.css` forces `transition-duration` to
    0.01ms) and the pill still ends in the correct state.
- **Done when**: the pill still visibly shrinks on scroll, a Performance
  recording of the threshold crossing shows no layout work from the header,
  and lint/typecheck/build all pass.
