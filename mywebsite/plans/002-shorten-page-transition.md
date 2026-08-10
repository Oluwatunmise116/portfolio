# 002 — Cut the route transition to 200ms and drop its movement

- **Status**: DONE (applied at 502f4c1)
- **Commit**: 502f4c1
- **Severity**: MEDIUM
- **Category**: Purpose & frequency
- **Estimated scope**: 1 file, ~6 lines

## Problem

Every route change plays a 360ms entrance that fades the whole page in from
`translateY(10px)`. `app/template.tsx` remounts on each navigation, so this
runs on **every** click of Home / About / Projects / Blogs / Contact, every
project card, and every article card.

Navigation is the most repeated interaction on the site. The audit frequency
table puts repeated actions in the "remove or drastically reduce" band, and
this animation sits on top of the latency Next.js already spends fetching
and rendering the route — so the user waits for the route, then waits again
for it to slide up.

```css
/* src/app/globals.css:254-268 — current */
/* Route-level transition: template.tsx remounts per navigation. */
.page-enter {
  animation: page-enter 360ms var(--ease-out-strong) both;
}

@keyframes page-enter {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

```tsx
/* src/components/layout/page-transition.tsx:9 — current (do not change) */
return <div className="page-enter">{children}</div>;
```

The 10px rise is the expensive part perceptually: it delays the moment the
page reads as settled. A short opacity-only fade still prevents the harsh
cut between routes without adding felt latency.

## Target

200ms, opacity only. The `translateY` is removed entirely.

```css
/* target — src/app/globals.css, replacing lines 254-268 */
/* Route-level transition: template.tsx remounts per navigation.
   Deliberately short and opacity-only — this runs on every navigation, so
   it must smooth the change without adding felt latency. */
.page-enter {
  animation: page-enter 200ms var(--ease-out-strong) both;
}

@keyframes page-enter {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

Exact values: duration `360ms` → `200ms`; the `from` block loses its
`transform: translateY(10px)` and the `to` block loses its
`transform: translateY(0)`. The easing token `var(--ease-out-strong)` and
the `both` fill mode are unchanged.

200ms is inside the audit's 150–250ms band for frequent UI transitions.

## Repo conventions to follow

- All keyframes and entrance classes live in `src/app/globals.css` under the
  `/* Entrances */` banner comment. Keep this rule in place, in order.
- Easing is always referenced via the token `var(--ease-out-strong)`
  (defined at `globals.css:49`), never as a raw cubic-bezier.
- The reduced-motion block near the end of `globals.css` already lists
  `.page-enter` among the classes it neutralises — leave that entry alone,
  it stays correct.
- Exemplar of a short opacity-first entrance already in the repo:
  `.reveal` in `globals.css` uses `opacity` + `transform` with an explicit
  token-based transition; this plan makes `.page-enter` the opacity-only
  sibling of that pattern.

## Steps

1. Open `src/app/globals.css`.
2. Locate the `.page-enter` rule and the `@keyframes page-enter` block under
   the `/* Entrances */` banner.
3. Replace both with the target block above: duration `200ms`, and a
   keyframe pair that animates `opacity` only.
4. Add the two-line explanatory comment shown in the target so the next
   reader knows the shortness is deliberate.
5. Change nothing in `src/components/layout/page-transition.tsx` or
   `src/app/template.tsx` — the class name and wrapper stay as they are.

## Boundaries

- Do NOT delete the route transition entirely; a hard cut between routes is
  a regression, not a fix.
- Do NOT touch `.hero-rise`, `.hero-slide`, `.hero-zoom`, `.hero-pop`,
  `.reveal`, or `.filter-enter` — they are separate animations with
  separate budgets (`.filter-enter` is covered by plan 003).
- Do NOT modify `page-transition.tsx`, `template.tsx`, or any route file.
- Do NOT introduce View Transitions API or a motion-library page
  transition — that is a different design decision, out of scope here.
- Do NOT add new dependencies.
- If the CSS at `globals.css:254-268` does not match the "current" excerpt
  above (drift since commit 502f4c1), STOP and report instead of improvising.

## Verification

- **Mechanical**: from `mywebsite/`, run
  `npm run lint && npm run typecheck && npm run build`.
  All three must exit 0 and the build must report 23/23 static pages.
- **Feel check**: run `npm run start -- -p 3100`.
  - Click rapidly between Home → Projects → Blogs → About. The new page
    should read as settled essentially on arrival; there should be no sense
    of content sliding into position.
  - Confirm the page still fades rather than hard-cutting: in DevTools →
    Animations, set playback to 10%, navigate, and confirm a pure opacity
    ramp with **no vertical movement** at any point.
  - Navigate repeatedly and confirm nothing ever renders at a permanent
    partial opacity (the `both` fill must still land at `opacity: 1`).
  - DevTools → Rendering → "Emulate prefers-reduced-motion", then navigate:
    content must appear immediately and fully opaque.
  - Disable JavaScript and load `/projects` directly: content must be fully
    visible (the `@media (scripting: none)` block covers `.reveal` and the
    hero classes; `.page-enter` uses `both` fill so it holds at
    `opacity: 0` only for its 200ms — confirm the page is not left blank).
- **Done when**: navigation feels immediate, the fade is opacity-only,
  reduced-motion shows content instantly, and lint/typecheck/build pass.
