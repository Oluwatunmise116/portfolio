# Tunmise — Embedded Systems Engineer Portfolio

A production-quality personal portfolio for an embedded systems / firmware /
automotive / IoT engineer, built with the Next.js App Router. The design
direction is **"Engineered Clarity"** — contemporary editorial layout, strong
typography, generous whitespace, restrained motion, and quiet technical
references (coordinate grids, oscilloscope traces, PCB-style diagrams).

## Stack

- **Next.js 16** (App Router, Turbopack, React Server Components)
- **TypeScript** (strict)
- **Tailwind CSS v4** with CSS-variable design tokens
- **Motion** (`motion/react`) for the small amount of JS-driven animation
- **React Hook Form + Zod** for the contact form
- **Lucide React** icons
- `next/image` + `next/font` (Sora / Inter / IBM Plex Mono)
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
    layout/             # header, mobile nav, theme toggle, footer
    home|projects|about|resume|blog|contact/
    ui/                 # button, container, inputs, badges, states…
  data/                 # ALL editable content (see below)
  lib/                  # fonts, motion tokens, validation, metadata helper
  types/                # Project, Article, resume types
public/
  images/               # generated SVG placeholders (replace with photos)
  resume/               # resume-placeholder.pdf (replace with your PDF)
```

## Updating content

Everything user-visible lives in `src/data/` — components never hardcode
content.

| To change…               | Edit…                                     |
| ------------------------ | ----------------------------------------- |
| Name, title, email, bio  | `src/data/profile.ts`                     |
| Profile image            | `src/data/profile.ts` → `portrait.src`    |
| Projects                 | `src/data/projects.ts`                    |
| Experience / timeline    | `src/data/experience.ts`                  |
| Education                | `src/data/education.ts`                   |
| Skills / principles      | `src/data/skills.ts`                      |
| Blog articles            | `src/data/articles.ts`                    |
| Social links             | `src/data/social-links.ts`                |
| Site URL / title pattern | `src/lib/constants.ts` + `.env`           |

### Replace the profile image

Drop a portrait (≈4:5, e.g. 960×1200) at
`public/images/profile/portrait.jpg` and update `portrait.src` and
`portrait.alt` in `src/data/profile.ts`. Nothing else references the image.

### Add a project

Append an object to `src/data/projects.ts` (the `Project` type in
`src/types/project.ts` documents every field). Add a 4:3 image to
`public/images/projects/` plus optional gallery images. The route
`/projects/<slug>` is generated automatically.

### Add a blog article

Append an object to `src/data/articles.ts`. The `sections` array mirrors what
MDX produces (headings/paragraphs/code/callouts/figures), so migrating to
`.mdx` files later is mechanical: keep the visual components in
`src/components/blog/article-content.tsx` and map MDX elements onto them.

### Replace the résumé PDF

Overwrite `public/resume/resume-placeholder.pdf` (keeping the name), or
change `RESUME_PDF_PATH` in `src/components/resume/resume-download.tsx`.
The Resume page also has a print stylesheet — "Print résumé" produces a clean
white, navigation-free document.

### Connect the contact form to a backend

The form currently calls a simulated submitter in `src/lib/validation.ts`
(`submitContactForm`). Replace its body with a real call — a Next.js route
handler, Formspree, or Resend — and keep API keys in server-side env vars
(see `.env.example`). Validation, loading, error, and success states already
work and won't need changes.

### Colors & typography

All tokens live in `src/app/globals.css` (`:root` and `.dark`) — change the
accent, surfaces, or type scale there and the whole site follows. Fonts are
configured in `src/lib/fonts.ts` via `next/font`.

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import it at vercel.com → the Next.js preset needs no changes.
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain (Project → Settings →
   Environment Variables).
4. Deploy. Sitemap (`/sitemap.xml`) and robots (`/robots.txt`) are generated
   from that URL.

## Accessibility notes

- Semantic landmarks, one `h1` per page, ordered headings.
- Skip-to-content link; visible `:focus-visible` treatment everywhere.
- Mobile menu: focus trap, Escape to close, body scroll lock, closes on
  navigation.
- Filters use `aria-pressed`; result counts are announced via `aria-live`.
- Form fields have visible labels, `aria-invalid`, field-level errors, and a
  polite live region for submission status; the first invalid field receives
  focus on submit.
- `prefers-reduced-motion` collapses all movement to (near-)instant while
  keeping content visible.
- Interactive targets are at least 40–44px.

## Animation notes

Motion is deliberately sparse and tokenised (`src/lib/motion.ts` +
`--ease-*`/`--duration-*` in `globals.css`):

- Entrances use a strong `ease-out` curve, 160–320ms, `transform`/`opacity`
  only; exits are faster than entrances.
- One-time hero trace draw and staggered hero reveal on the home page.
- Hover feedback (thumbnail reveal, arrow nudge) is gated to hover-capable
  pointers; press feedback is a 0.98 scale.
- Filter changes replay a short CSS entrance; the mobile menu uses
  interruptible Motion variants.
- Nothing animates on keyboard-frequency actions, and everything respects
  reduced motion.

## Placeholder content to replace

Search the repo for `TODO:` and `[Replace` / `[Your` / `[Organisation` /
`[Duration` / `[Year` — every placeholder is bracketed on purpose:

- `src/data/profile.ts` — name, location, summary, portrait
- `src/data/experience.ts` / `education.ts` — real history
- `src/data/projects.ts` — roles, durations, constraints marked `[Replace…]`,
  and **all results/metrics**
- `src/data/social-links.ts` — real profile URLs
- `src/lib/metadata.ts` — social handle + real OG image
- `public/images/**` — generated SVG placeholders → real photos
  (once no SVGs remain, remove `dangerouslyAllowSVG` from `next.config.ts`)
- `public/resume/resume-placeholder.pdf` — real résumé
- `.env` — `NEXT_PUBLIC_SITE_URL`
