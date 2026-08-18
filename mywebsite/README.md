# Oluwatunmise John Olabanji — Embedded Systems Engineer

A personal portfolio for an embedded systems / firmware / automotive / IoT
engineer, built with the Next.js App Router.

The visual direction is an **editorial, portrait-centered layout** — a
floating pill navigation, an oversized condensed split headline
(`EMBEDDED · portrait · ENGINEER`), image-heavy project cards, generous
whitespace, thin neutral borders, and a single electric-indigo accent. It is
an original implementation inspired by the Portavia template as a design
direction; no template source code, copy, imagery, or branding was copied.

## Stack

- **Next.js 16** (App Router, Turbopack, React Server Components)
- **TypeScript** (strict)
- **Tailwind CSS v4** with CSS-variable design tokens
- **Motion** (`motion/react`) for the small amount of JS-driven animation
- **React Hook Form + Zod** for the contact form
- **Lucide React** icons
- `next/image` + `next/font` — **Oswald** (condensed display), **Manrope**
  (body), **IBM Plex Mono** (technical metadata only)
- ESLint (flat config) + Prettier

## Getting started

```bash
npm install
npm run dev        # development server (Turbopack)
```

Other commands:

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript (tsc --noEmit)
npm run build      # production build
npm start          # serve the production build
npm run format     # Prettier
```

## Project structure

```
src/
  app/                  # routes: /, /projects, /projects/[slug], /about,
                        # /resume, /blog, /blog/[slug], /contact, 404,
                        # sitemap.ts, robots.ts, template.tsx (page transition)
  components/
    layout/             # pill header, mobile nav sheet, theme toggle, footer
    home/               # hero, services, about preview, featured projects,
                        # how-i-work, faq, latest articles, contact section
    projects|about|resume|blog|contact/
    ui/                 # button, container, page-hero, reveal, inputs, states…
  data/                 # ALL editable content (see below)
  lib/                  # fonts, motion tokens, validation, metadata helper
  types/                # Project, Article, resume types
public/
  images/               # generated SVG placeholders (replace with real art)
                        # blog covers are the real Medium artwork
```

## Home page sections

1. **Hero** — split `EMBEDDED / portrait / ENGINEER` composition with a
   circular accent badge.
2. **What I can build** — four numbered capability groups
   (`src/data/services.ts`).
3. **About me** — portrait, short bio, capability areas, résumé link.
4. **Featured projects** — image-heavy cards from `src/data/projects.ts`.
5. **How I work** — four engineering principles plus capability areas.
   There are **no testimonials, no counters, and no numeric claims**: no
   figure appears anywhere on this site unless it can be independently
   verified.
6. **FAQ** — accessible accordion (`src/data/faq.ts`).
7. **Automotive insights & engineering notes** — latest Medium articles.
8. **Contact** — the shared validated form, centered.

## Updating content

Everything user-visible lives in `src/data/` — components never hardcode
content.

| To change…               | Edit…                                     |
| ------------------------ | ----------------------------------------- |
| Name, title, email, bio  | `src/data/profile.ts`                     |
| Profile image            | `src/data/profile.ts` → `portrait.src`    |
| Hero words / badge       | `src/data/profile.ts` → `heroWords`, `heroBadge` |
| Capability areas         | `src/data/profile.ts` → `focusAreas`      |
| Capability groups        | `src/data/services.ts`                    |
| FAQ                      | `src/data/faq.ts`                         |
| Projects                 | `src/data/projects.ts`                    |
| Experience / timeline    | `src/data/experience.ts`                  |
| Education                | `src/data/education.ts`                   |
| Skills / principles      | `src/data/skills.ts`                      |
| Medium articles          | `src/data/articles.ts`                    |
| Social links             | `src/data/social-links.ts`                |
| Site URL / title pattern | `src/lib/constants.ts` + `.env`           |

### Replace the profile image

**Overwrite `public/images/profile/portrait.jpg`** with your own photo.
That is the only required step — no code change. The file currently in
place is a generated stand-in.

The portrait appears in six places, in two different shapes, and both are
tuned from `portrait` in `src/data/profile.ts`:

| Where | Shape | Tuned by |
| --- | --- | --- |
| Hero, About page, About preview | large 4:5 | `focus` |
| Nav avatar (36px), home contact (64px), contact page (80px) | circle | `avatarFocus` + `avatarZoom` |

- **`focus`** is a CSS `object-position` (e.g. `"58% 42%"`) — it decides
  which part of the photo survives the 4:5 crop.
- **`avatarFocus` / `avatarZoom`** exist because a full-body photo
  centre-cropped into a 36px circle leaves the face a few pixels wide. The
  `Avatar` component (`src/components/ui/avatar.tsx`) zooms to the face
  instead. Set `avatarFocus` to the face centre and raise `avatarZoom`
  until the face fills the circle.

After swapping the photo, check the nav avatar first — it is the smallest
crop and the one most likely to need `avatarFocus`/`avatarZoom` nudging.
If your photo is already a head-and-shoulders shot, set `avatarZoom: 1`.

Portrait orientation is expected, but the aspect ratio does not need to be
exactly 4:5 — `object-cover` handles the difference. Update `width`/
`height` to your file's real pixel dimensions so Next.js reserves the
correct space and avoids layout shift.

Optional: set `portrait.hoverSrc` to a second image and the hero
cross-fades to it on hover. The effect is gated to pointer devices
(`hover: hover and pointer: fine`) and is simply absent when `hoverSrc` is
left `undefined`.

### Add a project

Append an object to `src/data/projects.ts` (the `Project` type in
`src/types/project.ts` documents every field). Add a 4:3 image to
`public/images/projects/` plus optional gallery images. The route
`/projects/<slug>` is generated automatically, and previous/next links
follow array order.

**Only publish projects that are personal, academic, or otherwise publicly
shareable.** Employer-owned products, internal system names, proprietary
architecture, and confidential outcomes stay off this site — the expertise
behind them is communicated through About, Skills, Services, FAQ, and the
writing instead.

To feature a project on the home page, set `featured: true` on it. The home
grid reads that flag, so there is no slug list to keep in sync.

Only `slug`, `number`, `title`, `summary`, `category`, `status`,
`technologies`, `role` and `image` are required. Every narrative field
(context, problem, testing, results, gallery…) is optional, and its section
renders only when present — add one when the content is true rather than
padding a project out with invented material.

## How the Medium integration works

Articles are **published on Medium**; this site stores curated metadata
only and never copies article bodies.

- `src/data/articles.ts` holds `title`, `slug`, `excerpt`, `category`,
  `date`, `cover`, `mediumUrl`, and optional `readingTime`.
- The excerpts are short original summaries written for this site.
- `readingTime` is optional and only present where it is confirmed —
  **do not invent one**; omit the field and the card simply hides it.
- `/blog` lists every article; each card links to the internal preview.
- `/blog/[slug]` is a **preview page** (Strategy A): metadata, cover, and
  excerpt, with a prominent "Continue reading on Medium" button. Its
  `alternates.canonical` points at the **Medium URL**, so Medium remains
  the canonical source for search engines.
- Outbound links use `target="_blank"` + `rel="noopener noreferrer"` and
  carry a visible external-link icon.
- A "View all on Medium" CTA appears on the home page and `/blog`.

There is no live Medium fetch: the build never depends on Medium being
reachable. To add a new post, append an entry to `articles.ts`.

### Add a blog article

```ts
{
  slug: "your-article-slug",
  title: "Your article title",
  excerpt: "Two sentences in your own words.",
  category: "Vehicle Communication",   // see src/types/article.ts
  date: "2026-08-01",                  // ISO, the Medium publication date
  readingTime: "8 min read",           // omit if not confirmed
  cover: "/images/blog/your-article-slug.webp",   // 16:9, see note below
  mediumUrl: "https://medium.com/@olabanjitunmise234/…",
  featured: false,
}
```

Save the cover to `public/images/blog/<slug>.webp`. **Use 16:9** — the
covers have their titles baked into the artwork, so the cards and article
hero both use a 16:9 frame; a tighter crop would clip the lettering.
Downloading the image straight from the Medium post gives the right ratio.

### Replace the résumé PDF

No résumé PDF ships with the site, and the Download button is hidden until
one exists — handing a visitor a placeholder file is worse than offering
no download at all. Drop the real PDF into `public/resume/` and set
`RESUME_PDF_PATH` in `src/components/resume/resume-download.tsx`; the
button then appears automatically.

`/resume` is reachable from the hero, the About page, and the footer — it
is deliberately **not** a main navigation item. The page has a print
stylesheet, so "Print / save as PDF" produces a clean, navigation-free
document from the live content regardless.

### Connect the contact form to a backend

The form calls `submitContactForm` in `src/lib/validation.ts`. There is
**no simulated success path**: until `NEXT_PUBLIC_CONTACT_ENDPOINT` is set,
the form composes the enquiry into the visitor's own email client and the
confirmation says so explicitly. Showing "message received" for a message
that was never sent would lose real enquiries.

Set `NEXT_PUBLIC_CONTACT_ENDPOINT` to a form endpoint (Formspree or
similar) for real delivery, or replace the fetch with a
Next.js route handler, Formspree, or Resend — and keep API keys in
server-side env vars (see `.env.example`). Validation, loading, error, and
success states already work and need no changes. Submission logic is
isolated in that one function on purpose.

### Colors & typography

All tokens live in `src/app/globals.css` (`:root` and `.dark`). Two things
to know before editing:

- **Fonts**: hand-written CSS must reference the `next/font` variables
  directly (`--font-oswald`, `--font-manrope`, `--font-plex-mono`). The
  `@theme inline` block maps them onto Tailwind utilities, but `inline`
  means `--font-display`/`--font-sans`/`--font-mono` are *not* emitted as
  usable custom properties — referencing those in plain CSS silently falls
  back to the system font stack.
- **Accent**: `--accent` is deliberately darker than a stock periwinkle so
  it clears WCAG AA both as text on the background and as a fill behind
  white text. Lightening it reintroduces contrast failures.
- **Hero size**: `--text-hero` is tuned so the longest headline word never
  overflows its grid column. It was verified by measurement at 1024, 1280,
  1440, 1600, and 1920px — re-measure if you change it or the portrait
  width.

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import it at vercel.com → the Next.js preset needs no changes.
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain (Project → Settings
   → Environment Variables).
4. Deploy. Sitemap (`/sitemap.xml`) and robots (`/robots.txt`) are
   generated from that URL.

## Accessibility notes

Audited with **axe-core** (WCAG 2.0/2.1 A + AA) across 8 routes in both
light and dark themes: **0 violations**.

- Semantic landmarks, one `h1` per page, ordered headings. The home `h1`
  uses `display: contents` so both hero words form a single heading while
  the portrait sits between them on the grid (a `<div>` inside an `<h1>`
  would be invalid HTML).
- Skip-to-content link; visible `:focus-visible` treatment everywhere.
- Mobile menu: focus trap, Escape to close, body scroll lock, focus
  returned to the trigger, closes on navigation.
- FAQ accordion: native buttons, `aria-expanded`/`aria-controls`, and
  `inert` on collapsed panels so they leave the a11y tree and tab order.
- Filters use `aria-pressed`; result counts announced via `aria-live`.
- Form fields have visible labels, `aria-invalid`, field-level errors, and
  a polite live region for submission status.
- Interactive targets are at least 44px.
- The project-card cursor label is decorative, `aria-hidden`, and gated to
  pointer devices — it never replaces the system pointer for keyboard or
  touch users, and no information is hover-only.

## Animation notes

Motion is deliberately sparse and tokenised (`src/lib/motion.ts` +
`--ease-*`/`--duration-*` in `globals.css`):

- **Home hero entrance** mirrors the design reference: the two headline
  halves converge on the portrait — the left word travels in from the
  right, the right word from the left (150px, 28px on small screens) —
  while the portrait scales up from 0.94 and the circular badge pops in
  last. It runs on `--ease-spring` (a zero-bounce spring approximation)
  over `--duration-entrance` (1s), staggered in ~0.3s steps.
  The hero section is `overflow-x-clip` so the off-screen start positions
  cannot widen the page mid-animation — verified at 320–1920px.
- **Statistics count up from zero** when scrolled into view
  (`components/ui/count-up.tsx`). The final value is server-rendered, so it
  is what shows without JS, under reduced motion, and to crawlers; frames
  are written straight to the DOM rather than through React state.
  Values with no digits (the `[X]` placeholders) never animate.
- Entrances use a strong `ease-out` curve; exits are faster than entrances.
- Repeated interactions are 160–280ms. Only the one-shot hero entrance
  (1s), scroll reveals (480ms), and the page transition (360ms) run longer.
- `transform`/`opacity` only. No `transition: all`, no `ease-in`, no
  `scale(0)` entrances.
- The nav active-page pill uses a shared-layout spring; the mobile sheet
  uses interruptible Motion variants.
- Hover motion is gated to `(hover: hover) and (pointer: fine)`.
- The availability dot is intentionally **static** — a permanently looping
  animation is noise the user cannot dismiss, and the adjacent text label
  carries the meaning.
- `prefers-reduced-motion` collapses movement while keeping content
  visible, and a `@media (scripting: none)` rule keeps scroll-reveal
  content visible without JavaScript. Both are verified by test.

## Outstanding items

All placeholder copy, dummy organisations, unverified statistics, and
proprietary product names have been removed. What remains needs an asset or
a confirmation only the owner can supply:

- **Portrait** —  is a generated
  stand-in. Overwrite it with the real photo, then check
  / in .
- **Project imagery** —  are generated
  placeholders. Replace with real photos or diagrams using the same file
  names. Once no SVGs remain anywhere, drop  from
  .
- **Résumé PDF** — no PDF ships. Drop one into  and set
   in ; the
  Download button then appears on its own. Printing already works.
- **Contact delivery** — the form hands off to the visitor's email client
  until  is set. See .
- **Production domain** — set  in .
- **Open Graph card** —  should become a real
  1200x630 branded raster image.
- **Certification issuer** — the HSE certification lists no issuer because
  the one printed on the certificate has not been confirmed.
