# 008 — Crossfade the contact form into its success panel

- **Status**: TODO
- **Commit**: 9ed2e43
- **Severity**: LOW
- **Category**: Missed opportunity / Delight
- **Estimated scope**: 2 files (`contact-form.tsx`, `globals.css`)

## Problem

`src/components/contact/contact-form.tsx:53-57` swaps the `<form>` for
`<ContactSuccess>` on an instant conditional return — no transition. This
is a rare, once-per-visitor, high-emotion moment (successfully reaching out)
that currently gets none of the delight budget it's allowed. Previously
identified, still open (`plans/README.md`, "Missed opportunities" #3).

```tsx
// src/components/contact/contact-form.tsx:40-57 — current
const onSubmit = handleSubmit(async (values) => {
  if (isSubmitting || status === "submitting") return; // no double submits
  setStatus("submitting");
  try {
    const result = await submitContactForm(values);
    setDelivery(result.delivery);
    setStatus("success");
    reset();
  } catch {
    setStatus("error");
  }
});

if (status === "success") {
  return (
    <ContactSuccess delivery={delivery} onReset={() => setStatus("idle")} />
  );
}
```

## Target

Reuse the same scoped View Transitions approach as plan 005 (consistent
mechanism across the site, no new library, natively interruptible), with
its own `view-transition-name` and this repo's existing `--duration-slow`
token rather than inventing a new duration value.

```tsx
// src/components/contact/contact-form.tsx — target
const onSubmit = handleSubmit(async (values) => {
  if (isSubmitting || status === "submitting") return; // no double submits
  setStatus("submitting");
  try {
    const result = await submitContactForm(values);
    const commit = () => {
      setDelivery(result.delivery);
      setStatus("success");
      reset();
    };
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      document.startViewTransition(commit);
    } else {
      commit();
    }
  } catch {
    setStatus("error");
  }
});

if (status === "success") {
  return (
    <div className="[view-transition-name:contact-panel]">
      <ContactSuccess delivery={delivery} onReset={() => setStatus("idle")} />
    </div>
  );
}

return (
  <form
    onSubmit={onSubmit}
    noValidate
    className="[view-transition-name:contact-panel] flex flex-col gap-6"
  >
```

```css
/* src/app/globals.css — add near the project-grid rule from plan 005 */

/* Contact form -> success swap. Its own name (not shared with
   project-grid) so the two crossfades can't collide if both were
   somehow mid-flight; --duration-slow (280ms) instead of a bespoke
   value because this is the one place on the site where a
   modal/drawer-tier duration is appropriate — it's a rare, one-time
   moment, not a repeated UI interaction. */
::view-transition-old(contact-panel),
::view-transition-new(contact-panel) {
  animation-duration: var(--duration-slow);
  animation-timing-function: var(--ease-out-strong);
}
```

```css
/* src/app/globals.css — inside the existing
   @media (prefers-reduced-motion: reduce) block */
::view-transition-group(contact-panel) {
  animation: none !important;
}
```

## Repo conventions to follow

- `--duration-slow: 220ms`... **verify this value directly in
  `src/app/globals.css` before writing it** (it is defined near
  `--duration-fast`/`--duration-base`; do not trust this plan's prose over
  the actual file — read the token, then use it verbatim).
- Same `[view-transition-name:...]` Tailwind arbitrary-property pattern as
  plan 005 — if plan 005 has already been executed, this is the second
  and only other use of this pattern on the site; keep the two names
  distinct (`project-grid` vs `contact-panel`).
- `ContactSuccess`'s own entrance detail — its checkmark's `.check-draw`
  stroke animation (`globals.css`, `stroke-dashoffset`, 500ms,
  `ease-out-strong`, 120ms delay) — already exists and needs no changes;
  it will now play concurrently with the incoming crossfade, which is the
  intended combined effect (crossfade brings the panel in, the checkmark
  draws itself as the payoff beat).
- `ContactForm` is shared between `/contact` and the homepage
  `ContactSection` (`src/components/home/contact-section.tsx`) — this fix
  applies to both call sites automatically since it lives in the shared
  component; do not duplicate it into `ContactSection`.

## Steps

1. In `src/components/contact/contact-form.tsx`, wrap the three
   post-`await` state updates (`setDelivery`, `setStatus("success")`,
   `reset()`) in a `commit` closure, and call it via
   `document.startViewTransition(commit)` when supported, else call it
   directly — exactly as shown in Target. Leave the `catch` block
   (`setStatus("error")`) untouched — errors are not part of this plan.
2. Add `className="[view-transition-name:contact-panel]"` to the wrapping
   `<div>` around the `status === "success"` return's `<ContactSuccess>`.
3. Add `[view-transition-name:contact-panel]` to the `<form>` element's
   existing className (alongside `flex flex-col gap-6`).
4. In `src/app/globals.css`, read the actual `--duration-slow` value near
   the top of the file, then add the `::view-transition-old/new(contact-panel)`
   rule using that token (near the `project-grid` rule from plan 005, or
   near `.check-draw` if plan 005 hasn't been executed yet).
5. Add `::view-transition-group(contact-panel) { animation: none !important; }`
   to the existing `@media (prefers-reduced-motion: reduce)` block.

## Boundaries

- Do NOT touch `contact-success.tsx` itself — no changes to its markup,
  its `check-draw` animation, or its "Write another message" button.
- Do NOT add a transition to the `status === "error"` alert box
  (`contact-form.tsx`, `role="alert"` block) — out of scope, and errors are
  not the rare/delight-tier moment this plan targets.
- Do NOT change `LoadingState`'s spinner or the submit button's own
  `disabled`/label swap while `isSubmitting` — unrelated.
- If plan 005 was executed first, do NOT reuse its `project-grid`
  view-transition-name here — this must be a distinct name.

## Verification

- **Mechanical**: `npx tsc --noEmit` and
  `npx eslint src/components/contact/contact-form.tsx src/app/globals.css`
  clean.
- **Feel check**: on both `/contact` and the homepage contact section:
  - Submit a valid message and confirm the form crossfades into the
    success panel rather than swapping instantly — both while the
    checkmark's stroke animation plays.
  - Click "Write another message" (`onReset`) and confirm going back to
    the empty form is instant and correct (this reverse path was not
    given a transition in this plan — confirm that's an acceptable,
    deliberate asymmetry: entering the rare/delight moment is worth
    animating, returning to a blank form is not).
  - Trigger a submission error (e.g. temporarily break the network) and
    confirm the error alert still appears with the site's current
    (unanimated) behavior — this plan must not have touched that path.
  - Toggle `prefers-reduced-motion` and confirm the swap becomes instant.
  - In a browser without View Transitions support, confirm the swap still
    works exactly as it does today (instant, no error, no missing
    content).
- **Done when**: the success transition is visually confirmed crossfading
  in a supporting browser, the error path is unchanged, and `tsc`/`eslint`
  are clean.
