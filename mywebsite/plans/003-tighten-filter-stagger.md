# 003 — Tighten the project-filter stagger so results land in under 260ms

- **Status**: DONE (applied at 502f4c1)
- **Commit**: 502f4c1
- **Severity**: MEDIUM
- **Category**: Cohesion & tokens (stagger)
- **Estimated scope**: 1 file, ~3 lines

## Problem

Clicking a category on `/projects` remounts the results grid
(`<ul key={active}>`), and every card replays `.filter-enter` with a
per-item delay.

```css
/* src/app/globals.css:372-376 — current */
/* Grid/list entrance used when filters change */
.filter-enter {
  animation: filter-enter var(--duration-base) var(--ease-out-strong) both;
  animation-delay: min(calc(var(--enter-index, 0) * 40ms), 240ms);
}
```

```tsx
/* src/components/projects/project-filter.tsx:66-74 — current (do not change) */
{visible.map((project, i) => (
  <li
    key={project.slug}
    className="filter-enter"
    style={{ "--enter-index": i } as React.CSSProperties}
  >
    <ProjectCard project={project} />
  </li>
))}
```

`--duration-base` is `220ms` (`globals.css:52`). The delay caps at 240ms, so
the last card finishes at **240 + 220 = 460ms**. Because the animation uses
`both` fill, each card holds its `from` state — `opacity: 0` — for the whole
of its delay. A user comparing categories clicks these filters in quick
succession and spends up to half a second looking at a mostly empty grid
each time.

Filtering is a repeated, exploratory action. The stagger is decorative and
must not gate how fast the results read.

## Target

Halve the per-item step and cap the stagger well below the duration, so the
whole grid settles in ~256ms worst case instead of 460ms.

```css
/* target — src/app/globals.css, replacing lines 372-376 */
/* Grid/list entrance used when filters change. Filtering is a repeated,
   exploratory action, so the stagger is kept short enough that the full
   grid reads as settled in ~256ms even at the cap. */
.filter-enter {
  animation: filter-enter var(--duration-fast) var(--ease-out-strong) both;
  animation-delay: min(calc(var(--enter-index, 0) * 24ms), 96ms);
}
```

Exact changes:

1. `var(--duration-base)` (220ms) → `var(--duration-fast)` (160ms). Both
   tokens already exist at `globals.css:51-52`; do not define new ones.
2. Per-item step `40ms` → `24ms`.
3. Stagger cap `240ms` → `96ms`.

Worst case becomes 96 + 160 = 256ms. 160ms sits in the audit's 150–250ms
band for frequent UI transitions.

Leave `@keyframes filter-enter` exactly as it is — its
`translateY(8px) scale(0.985)` start is correct (a real starting size, not
`scale(0)`) and needs no change.

## Repo conventions to follow

- Duration tokens live in `src/app/globals.css` under `:root`:
  `--duration-fast: 160ms`, `--duration-base: 220ms`,
  `--duration-slow: 280ms`. Always reference the token, never a raw `ms`
  value, for the animation duration. The stagger step and cap stay as
  literal `ms` because they are not part of the shared scale.
- Easing is always `var(--ease-out-strong)`.
- The reduced-motion block near the end of `globals.css` already lists
  `.filter-enter` among the classes it neutralises — leave that entry alone.
- Exemplar of the repo's short-interaction budget:
  `src/components/ui/button.tsx` uses `duration-160` for press feedback.

## Steps

1. Open `src/app/globals.css`.
2. Locate the `.filter-enter` rule (directly above `@keyframes filter-enter`).
3. Replace it with the target block above — token swap on the duration, plus
   the `24ms` step and `96ms` cap — and add the explanatory comment shown.
4. Change nothing in `@keyframes filter-enter`.
5. Change nothing in `src/components/projects/project-filter.tsx` — the
   `--enter-index` custom property and the `key={active}` remount stay.

## Boundaries

- Do NOT remove the stagger entirely; a simultaneous pop of every card is
  the failure mode this animation exists to avoid.
- Do NOT touch `@keyframes filter-enter`.
- Do NOT touch `project-filter.tsx`, `project-card.tsx`, or the blog list.
- Do NOT add an exit animation for the outgoing cards in this plan — that is
  a separate, additive change (see the "missed opportunities" note in
  `plans/README.md`).
- Do NOT add new dependencies.
- If the CSS at `globals.css:372-376` does not match the "current" excerpt
  above (drift since commit 502f4c1), STOP and report instead of improvising.

## Verification

- **Mechanical**: from `mywebsite/`, run
  `npm run lint && npm run typecheck && npm run build`.
  All three must exit 0 and the build must report 23/23 static pages.
- **Feel check**: run `npm run start -- -p 3100` and open `/projects`.
  - Click through All → Embedded → Automotive → Firmware → IoT quickly. The
    grid should feel like it answers the click; you should not be waiting on
    trailing cards.
  - In DevTools → Animations, set playback to 10% and click a filter.
    Confirm the cards still arrive in sequence (the stagger is visible, not
    removed) and that the last card starts no later than ~96ms after the
    first.
  - Click the same filter twice in rapid succession and confirm the grid
    re-enters cleanly with no half-faded cards left behind.
  - Select a category with a single project (e.g. Firmware) and confirm the
    lone card has no perceptible delay.
  - DevTools → Rendering → "Emulate prefers-reduced-motion", then filter:
    cards must appear instantly and fully opaque, with no stagger.
- **Done when**: the worst-case settle time is ~256ms, the stagger is still
  perceptible in slow motion, reduced-motion shows results instantly, and
  lint/typecheck/build pass.
