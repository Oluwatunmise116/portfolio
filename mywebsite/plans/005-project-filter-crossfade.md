# 005 — Crossfade the project filter grid swap

- **Status**: TODO
- **Commit**: 9ed2e43
- **Severity**: MEDIUM
- **Category**: Missed opportunity / Preventing a jarring change
- **Estimated scope**: 2 files (`project-filter.tsx`, `globals.css`)

## Problem

`src/components/projects/project-filter.tsx:63-76` keys the results `<ul>`
by `active`, so changing the category filter unmounts the outgoing cards
instantly while the incoming cards fade in via `.filter-enter`. The filter
change reads as a *pop*, not a *swap*. This is a previously-identified,
still-open finding (`plans/README.md`, "Missed opportunities" #2).

```tsx
// src/components/projects/project-filter.tsx:62-76 — current
{visible.length > 0 ? (
  <ul
    key={active}
    className="mt-10 grid list-none gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3"
  >
    {visible.map((project, i) => (
      <li
        key={project.slug}
        className="filter-enter"
        style={{ "--enter-index": i } as React.CSSProperties}
      >
        <ProjectCard project={project} />
      </li>
    ))}
  </ul>
) : (
  <div className="mt-8">
    <EmptyState ... />
  </div>
)}
```

## Target

Use the native View Transitions API, scoped to just this grid region (not
the whole page), so the outgoing set crossfades out while the incoming set
plays its existing `.filter-enter` stagger. This needs no new component
state, no timers, and is natively interruptible — starting a new transition
while one is in flight is handled by the browser, not application code.

```tsx
// src/components/projects/project-filter.tsx — target
export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("All");

  const filters: Filter[] = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];
  const visible =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  const applyFilter = (filter: Filter) => {
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      document.startViewTransition(() => setActive(filter));
    } else {
      setActive(filter);
    }
  };

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const selected = filter === active;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={selected}
              onClick={() => applyFilter(filter)}
              className={cn(/* unchanged */)}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} project{visible.length === 1 ? "" : "s"} shown
      </p>

      <div className="[view-transition-name:project-grid]">
        {visible.length > 0 ? (
          <ul key={active} className="mt-10 grid list-none gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((project, i) => (
              <li key={project.slug} className="filter-enter" style={{ "--enter-index": i } as React.CSSProperties}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8">
            <EmptyState
              title="No projects in this category yet"
              description="Work in this area is on the bench but not written up. Try another category, or check back soon."
              action={<Button variant="secondary" onClick={() => applyFilter("All")}>Show all projects</Button>}
            />
          </div>
        )}
      </div>
    </div>
  );
}
```

```css
/* src/app/globals.css — add near .filter-enter */

/* Project filter grid swap: named so only this region crossfades, not the
   whole page (a page-wide view transition would double-animate the filter
   pills and heading, which don't need it). Duration/easing match
   --duration-fast / --ease-out-strong so the crossfade and the incoming
   .filter-enter stagger read as one motion instead of two. */
::view-transition-old(project-grid),
::view-transition-new(project-grid) {
  animation-duration: var(--duration-fast);
  animation-timing-function: var(--ease-out-strong);
}
```

```css
/* src/app/globals.css — inside the existing
   @media (prefers-reduced-motion: reduce) block, alongside the other
   animation-neutralising rules */
::view-transition-group(project-grid) {
  animation: none !important;
}
```

## Repo conventions to follow

- `--duration-fast: 160ms` and `--ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1)`
  are defined in `src/app/globals.css:59-60` (root) — reuse them verbatim,
  do not hardcode `160ms`/the cubic-bezier a second time anywhere new.
- The reduced-motion override goes in the *existing* single
  `@media (prefers-reduced-motion: reduce)` block in `globals.css` (search
  for `.filter-enter,` inside it) — do not create a second reduced-motion
  media query.
  Verify by opening it and confirming this project-grid rule reads: "gentler, not zero" — but a `view-transition` disabled via `animation:none` is
  the same "collapse to instant" treatment already used for every other
  entry in that block (`animation-duration: 0.01ms !important` at the top
  of the block also technically applies to `::view-transition-*`
  pseudo-elements in most browsers, so the explicit rule is a
  belt-and-braces guarantee, not a departure from convention).
- `[view-transition-name:project-grid]` is Tailwind v4 arbitrary-property
  syntax — this project already uses that syntax elsewhere (e.g.
  `w-[min(68vw,17rem)]` in `src/components/home/hero.tsx`), so it's
  consistent with how one-off CSS values are expressed here rather than
  introducing an inline `style` prop with a `viewTransitionName` key (which
  may not be in this project's React/TS `CSSProperties` type yet).

## Steps

1. In `src/components/projects/project-filter.tsx`, add the `applyFilter`
   helper shown above and call it from the filter buttons' `onClick`
   instead of calling `setActive` directly (two call sites: the filter
   pills' `onClick`, and the "Show all projects" button inside
   `EmptyState`'s `action`).
2. Wrap the existing `{visible.length > 0 ? (...) : (...)}` ternary in a
   `<div className="[view-transition-name:project-grid]">` — keep
   `key={active}` on the inner `<ul>` unchanged (it's what forces the
   `.filter-enter` stagger to replay on every filter change, including
   when the new filtered set happens to contain the same projects).
3. In `src/app/globals.css`, add the `::view-transition-old/new(project-grid)`
   rule near `.filter-enter` (around line 458).
4. In the same file's existing `@media (prefers-reduced-motion: reduce)`
   block, add the `::view-transition-group(project-grid) { animation: none !important; }` rule alongside the other entries there.

## Boundaries

- Do NOT add a page-wide/unnamed view transition — it must be scoped to
  `project-grid` only.
- Do NOT touch `.filter-enter`'s existing duration, stagger delay, or
  keyframe — it is correct and unrelated to this fix.
- Do NOT add any new easing curve or duration token — reuse
  `--duration-fast` / `--ease-out-strong`.
- Do NOT add per-badge/tag stagger inside `ProjectCard` — out of scope and
  explicitly rejected in the prior audit.
- If `document.startViewTransition` is unsupported (Safari < 18, older
  browsers), the code must fall back to the current instant `setActive` —
  this is progressive enhancement, not a regression, and needs no
  additional polyfill or warning.

## Verification

- **Mechanical**: `npx tsc --noEmit` and
  `npx eslint src/components/projects/project-filter.tsx src/app/globals.css`
  clean.
- **Feel check**: in a browser that supports View Transitions (current
  Chrome/Edge), open `/projects`, click between category filters:
  - The outgoing cards fade out instead of vanishing instantly.
  - The incoming cards still play their `.filter-enter` stagger.
  - Click a second filter rapidly before the first transition finishes —
    it should not glitch, freeze, or show both sets stacked; the browser's
    native interruption handling should just start the next crossfade.
  - Filter pills, heading, and description do not visibly flash or
    crossfade — only the grid region does.
  - Toggle `prefers-reduced-motion` (Rendering panel) and confirm the swap
    becomes instant with no fade.
  - In a browser without View Transitions support (or by temporarily
    deleting the `"startViewTransition" in document` branch to simulate
    one), confirm the filter still works exactly as it does today —
    instant swap, no error.
- **Done when**: `tsc`/`eslint` are clean and the crossfade is visually
  confirmed in a supporting browser, with a clean unsupported-browser
  fallback.
