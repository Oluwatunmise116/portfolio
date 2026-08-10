# Animation improvement plans

Produced by the `improve-animations` audit at commit `502f4c1`.

Each plan is self-contained: exact file paths, current code, target values,
and a feel check. They can be executed in any order — no plan depends on
another — but the order below is by leverage (impact ÷ effort).

| # | Plan | Severity | Category | Scope | Status |
| --- | --- | --- | --- | --- | --- |
| [001](001-nav-pill-transform-not-layout.md) | Animate the nav pill with transform instead of padding/margin | HIGH | Performance | 1 file, ~4 lines | DONE |
| [002](002-shorten-page-transition.md) | Cut the route transition to 200ms and drop its movement | MEDIUM | Purpose & frequency | 1 file, ~6 lines | DONE |
| [003](003-tighten-filter-stagger.md) | Tighten the project-filter stagger so results land in under 260ms | MEDIUM | Cohesion (stagger) | 1 file, ~3 lines | DONE |

## Recommended execution order

1. **001** — the only layout-property animation triggered by scrolling, and
   the cheapest fix relative to its cost.
2. **002** — touches every navigation on the site.
3. **003** — localised to `/projects`.

002 and 003 both edit `src/app/globals.css` but different rules
(`.page-enter` vs `.filter-enter`); they will not conflict.

## Findings deliberately NOT planned

- **`grid-template-rows` animation on the FAQ accordion**
  (`src/components/home/faq.tsx:77`). This animates a layout property, which
  normally warrants a finding, but the `0fr → 1fr` grid technique is the
  idiomatic way to animate an accordion of unknown content height while
  keeping it accessible. The alternatives are worse: `max-height` guessing
  produces wrong-speed easing, and JS height measurement adds a layout read
  on every toggle. The accordion is low-frequency, opens one panel at a
  time, and wraps a small subtree. **Leave as is.**

## Checked and found clean

These were audited and produced no findings — recorded so a future audit
does not re-derive them:

- No `transition: all` anywhere.
- No `ease-in` on any UI transition.
- No `scale(0)` entrances (the smallest start value is `scale(0.6)` on the
  hero badge, deliberately chosen over `scale(0)`).
- Hover motion is pointer-gated: Tailwind v4 compiles every `hover:` and
  `group-hover:` rule inside `@media (hover:hover)` — verified in the built
  CSS, not assumed.
- Reduced motion is handled globally in `src/app/globals.css` and every
  entrance class is listed in the neutralising block; a `@media (scripting:
  none)` block keeps scroll-revealed content visible without JavaScript.
- Motion tokens are consolidated: one easing (`--ease-out-strong`) accounts
  for all 55 easing usages, and durations collapse to three tokens
  (160/220/280ms) plus the one-shot 1s hero entrance.
- `CountUp` writes frames directly to the DOM rather than through React
  state, so four on-screen counters do not trigger re-renders at 60fps.

## Missed opportunities (additive — no plans written)

Places that do not animate but could. These are additions rather than
corrections, so they need a product decision before a plan is worth writing.

1. **Theme toggle is a hard cut.** Switching light/dark swaps every colour
   on the page instantly. It is a rare action with delight budget available.
   Note the trap: a global `transition: background-color` would fire on
   every hover across the site and is the wrong fix — this needs the View
   Transitions API or a class applied only for the duration of the swap.
2. **Project filter has no exit.** Outgoing cards disappear instantly
   (the `<ul key={active}>` remount destroys them) while incoming cards fade
   in, so a filter change reads as a pop rather than a swap. A brief
   crossfade would need the outgoing set kept alive for ~120ms.
3. **Contact form → success is an instant swap.** `ContactSuccess` replaces
   the form outright; only the checkmark draws itself. This is a rare,
   high-emotion moment and currently gets none of the delight budget it is
   allowed.
