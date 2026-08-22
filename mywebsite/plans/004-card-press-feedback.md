# 004 — Add press feedback to project/article card links

- **Status**: TODO
- **Commit**: 9ed2e43
- **Severity**: MEDIUM
- **Category**: Purpose & frequency / Missed opportunity
- **Estimated scope**: 2 files, 1 line each

## Problem

Every other interactive element on this site (buttons via `buttonClasses`,
filter pills, the theme toggle) has an `active:scale-[...]` press state.
Project cards and article cards do not — their only feedback is
`group-hover:`, which is unreliable/absent on touch devices. This is the
primary browsing surface on `/projects` and `/blog`, hit tens of times per
session, and mobile visitors currently get zero tactile confirmation that
their tap registered before navigation fires.

```tsx
// src/components/projects/project-card.tsx:72 — current
<Link href={`/projects/${project.slug}`} className="block rounded-2xl">
```

```tsx
// src/components/blog/article-card.tsx:57-60 — current
<Link
  href={`/blog/${article.slug}`}
  className="transition-colors duration-160 ease-out-strong after:absolute after:inset-0 group-hover:text-accent"
>
```

## Target

```tsx
// src/components/projects/project-card.tsx:72 — target
<Link
  href={`/projects/${project.slug}`}
  className="block rounded-2xl transition-transform duration-130 ease-out-strong active:scale-[0.99]"
>
```

```tsx
// src/components/blog/article-card.tsx:57-60 — target
<Link
  href={`/blog/${article.slug}`}
  className="inline-block transition-[color,transform] duration-160 ease-out-strong after:absolute after:inset-0 group-hover:text-accent active:scale-[0.99]"
>
```

Note: `article-card.tsx`'s link only wraps the title text (the `after:absolute
after:inset-0` pseudo-element is what stretches the hit target across the
whole card), so the scale must be applied with `inline-block` — a plain
inline element ignores `transform`. `duration-130` does not exist as a
Tailwind arbitrary class by default in this project; use
`transition-duration:130ms` via `duration-130` only if Tailwind's arbitrary
value scale already emits it (check `duration-160`/`duration-220` usage
elsewhere — if `duration-130` doesn't compile, use `duration-[130ms]`).

## Repo conventions to follow

- Press feedback everywhere else in this codebase uses `active:scale-[N]`
  paired with a `transition-transform` (or a multi-property
  `transition-[...]`) at `ease-out-strong` — see
  `src/components/ui/button.tsx:17-18`
  (`"rounded-full transition-[transform,background-color,border-color,color] duration-160 ease-out-strong"`,
  `"active:scale-[0.98]"`).
- `ease-out-strong` maps to `--ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1)`
  in `src/app/globals.css` — do not introduce a new curve.
- Scale values across the site range 0.94–0.98 depending on element size;
  0.99 is intentionally the subtlest in that range because this is a large
  card, not a small button — a bigger visual element needs a smaller scale
  delta to read as "pressed" rather than "shrunk."

## Steps

1. In `src/components/projects/project-card.tsx:72`, add
   `transition-transform duration-[130ms] ease-out-strong active:scale-[0.99]`
   to the existing `<Link>` className (keep `block rounded-2xl`).
2. In `src/components/blog/article-card.tsx:57-60`, change `className` from
   `transition-colors` to `transition-[color,transform]`, add
   `active:scale-[0.99]`, and add `inline-block` so the transform applies.

## Boundaries

- Do NOT touch the `group-hover:` image scale, arrow-translate, or
  cursor-following "View" label logic already on these cards — those are
  unrelated, already-correct animations.
- Do NOT add this to the FAQ, project-navigation prev/next cards, or any
  other component — scope is exactly these two files.
- Do NOT change the tag `<Badge>` list inside the card — no stagger, no
  motion added there (explicitly rejected in the prior audit).

## Verification

- **Mechanical**: `npx tsc --noEmit` and `npx eslint src/components/projects/project-card.tsx src/components/blog/article-card.tsx` both clean.
- **Feel check**: on a touch device or DevTools touch emulation, press and
  hold a project card and an article card:
  - The whole card visibly, subtly compresses (not just the title text).
  - Release before navigating (or use DevTools to pause) and confirm the
    scale reverts smoothly, not with a snap.
  - Confirm hover-only feedback (image zoom, arrow translate) is untouched
    on desktop.
  - Toggle `prefers-reduced-motion` (Rendering panel) and confirm the press
    state still changes (opacity/color equivalent isn't lost) but the
    transform duration collapses to near-instant via the site's existing
    global reduced-motion rule (`globals.css:519-544`) — no extra code
    needed for this, it's inherited.
- **Done when**: both links have visible, distinct `:active` compression
  and `tsc`/`eslint` are clean.
