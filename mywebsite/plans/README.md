# Animation improvement plans

Produced by the `improve-animations` audit at commit `502f4c1`; plans
004-008 produced by a `find-animation-opportunities` sweep of the
redesigned site at commit `9ed2e43`.

Each plan is self-contained: exact file paths, current code, target values,
and a feel check. They can be executed in any order — no plan depends on
another — but the order below is by leverage (impact ÷ effort).

| # | Plan | Severity | Category | Scope | Status |
| --- | --- | --- | --- | --- | --- |
| [001](001-nav-pill-transform-not-layout.md) | Animate the nav pill with transform instead of padding/margin | HIGH | Performance | 1 file, ~4 lines | DONE |
| [002](002-shorten-page-transition.md) | Cut the route transition to 200ms and drop its movement | MEDIUM | Purpose & frequency | 1 file, ~6 lines | DONE |
| [003](003-tighten-filter-stagger.md) | Tighten the project-filter stagger so results land in under 260ms | MEDIUM | Cohesion (stagger) | 1 file, ~3 lines | DONE |
| [004](004-card-press-feedback.md) | Add `:active` press feedback to project/article card links | MEDIUM | Purpose & frequency | 2 files, 1 line each | DONE |
| [005](005-project-filter-crossfade.md) | Crossfade the project filter grid swap (View Transitions, scoped) | MEDIUM | Missed opportunity | 2 files | DONE |
| [006](006-theme-toggle-icon-transition.md) | Crossfade the theme toggle's Sun/Moon icon | LOW | Cohesion | 1 file | DONE |
| [007](007-mobile-nav-icon-transition.md) | Animate the mobile nav trigger's Menu/X swap | LOW | Cohesion | 1 file | DONE |
| [008](008-contact-success-crossfade.md) | Crossfade the contact form into its success panel | LOW | Delight | 2 files | DONE |

## Recommended execution order

1. **001** — the only layout-property animation triggered by scrolling, and
   the cheapest fix relative to its cost.
2. **002** — touches every navigation on the site.
3. **003** — localised to `/projects`.
4. **004** — independent, touches two card components.
5. **005** — independent; if executed alongside 008, keep the two
   `view-transition-name` values distinct (`project-grid` vs
   `contact-panel`).
6. **006** and **007** — independent, same icon-swap pattern applied to two
   different controls; safe to do together or separately.
7. **008** — independent; see note under 005.

002, 003, 005, and 008 all touch `src/app/globals.css`, but each owns a
different rule (`.page-enter`, `.filter-enter`,
`::view-transition-*(project-grid)`, `::view-transition-*(contact-panel)`)
— they do not conflict.

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

## Missed opportunities — now planned

The three items originally logged here are now plans 006, 005, and 008
respectively (in that order). One correction from the original note: the
theme-toggle entry originally suggested the View Transitions API for the
*whole swap*; plan 006 instead animates only the 18px Sun/Moon icon inside
the toggle button and leaves the page-wide colour swap instant, per an
explicit product decision that theme switching itself must stay immediate.

## Additional findings from the redesign sweep — now planned

1. **Project and article cards have no press feedback.** Every other
   interactive element on the site (`buttonClasses`, filter pills, the
   theme toggle) has an `active:scale-[...]`; the two card link types do
   not, and cards are the primary browsing surface on mobile. → **004**.
2. **The mobile nav trigger's Menu/X icon hard-cuts** while the panel it
   opens is the best-animated surface on the site. → **007**.

## Defect found during execution of 004/006/007

Tailwind v4's `scale-*` and `rotate-*` utilities set the standalone CSS
`scale`/`rotate` properties, not `transform`. Any element pairing
`active:scale-[…]` (or `rotate-…`) with an *arbitrary* `transition-[…]`
list that names `transform` — rather than `scale`/`rotate` — silently
never animates that property; it snaps instantly. This predates plans
004-008 and was previously invisible (the change is a fast, subtle
98%-scale press) — caught only by inspecting `getComputedStyle(...).
transitionProperty` while verifying 006/007's rotation.

Fixed as part of this batch, one word swapped per file (`transform` →
`scale`, or added `scale`/`rotate` to the list):
`src/components/ui/button.tsx` (the shared recipe — every `<Button>`/
`<LinkButton>` on the site), `src/components/blog/article-card.tsx`,
`src/components/home/featured-projects.tsx`,
`src/components/layout/back-to-top.tsx`,
`src/components/layout/site-header.tsx` (Contact pill button),
`src/components/layout/theme-toggle.tsx` (the button itself, separate
from its icon fix in 006), `src/components/projects/project-filter.tsx`,
and `src/components/layout/mobile-navigation.tsx` (the trigger's icon
transition from 007, which had the same `transform`-vs-`rotate` gap).
Elements already using the *bare* `transition-transform` utility were
unaffected — Tailwind v4 special-cases that one utility to expand to
`transform, translate, scale, rotate` together.
