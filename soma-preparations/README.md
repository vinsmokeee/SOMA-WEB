# SOMA PREPARATIONS

Bhutan's online preparation platform for the **Bhutan Civil Service
Examination (BCSE)**, which is conducted by the Royal Civil Service Commission
(RCSC), covering both stages:

- **Stage I: Preliminary Examination (PE)**: lessons, practice questions,
  timed computer-based mock examinations, explanations and analytics.
- **Stage II: Main Examination (ME)**: category- and paper-wise materials,
  written-answer practice, model answers, rubrics, expert feedback and viva
  preparation.

Terminology and the data model: [`docs/EXAMINATION-ARCHITECTURE.md`](docs/EXAMINATION-ARCHITECTURE.md).

*Prepare. Practice. Progress.*

> Status: **Milestone 1 complete**, including the BCSE structure correction
> (PE and ME stages, origin labels, architecture doc). Accounts, the examination engine and
> payments are not built yet. See [`CHECKLIST.md`](CHECKLIST.md).

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, Cache Components) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui (Base UI primitives) |
| Icons | lucide-react |
| Fonts | Inter (text), Instrument Serif (headings), self-hosted via `next/font` |
| Auth & DB | Supabase Auth + PostgreSQL (from Milestone 2) |
| Hosting | Vercel (Milestone 7) |

> **Next.js 16 note:** this version differs from older Next.js. Read
> `node_modules/next/dist/docs/` before changing framework-level code
> (see `AGENTS.md`). Notable: `middleware` is now `proxy`, `params` are async,
> `next/image` uses `preload` instead of `priority`, and Cache Components
> means pages are prerendered, so avoid `new Date()` in server components
> without `"use cache"`.

## Getting started

Requirements: **Node.js 22+** and npm.

```bash
cd soma-preparations
npm install
cp .env.example .env.local     # then fill in values when needed
npm run dev                    # http://localhost:3000
```

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build (`next start`) |
| `npm run lint` | ESLint |
| `npm run typecheck` | Regenerate route types and run TypeScript |
| `npm run check` | Lint, type check and build: run before every commit |

## Configuration

Environment variables (see `.env.example`):

| Variable | Used for | Milestone |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Absolute URLs for social previews | 1 |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | 2 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public key | 2 |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only admin key: **never** expose to the browser | 2+ |

Never commit `.env.local`. Set production values in Vercel.

## Project structure

```
soma-preparations/
├── public/
│   ├── images/soma-logo.png          # official logo, unmodified (original upload)
│   ├── images/soma-logo-trimmed.png  # same logo, empty margin removed
│   ├── images/soma-mark.png          # symbol only (header, icons)
│   └── icon-192.png, icon-512.png    # PWA icons
├── src/
│   ├── app/
│   │   ├── layout.tsx                # fonts, metadata, viewport
│   │   ├── manifest.ts               # PWA manifest (add to home screen)
│   │   ├── icon.png, apple-icon.png  # browser + iOS icons
│   │   ├── globals.css               # design tokens (white / charcoal / forest green)
│   │   ├── (public)/                 # marketing site: header + footer
│   │   │   ├── page.tsx              # homepage
│   │   │   ├── bcse/                 # BCSE overview + /bcse/[stage] (pe, me)
│   │   │   ├── about/ contact/ login/ register/ terms/ privacy/
│   │   └── dashboard/                # student portal shell + pages
│   ├── components/
│   │   ├── brand/logo.tsx
│   │   ├── site/                     # header, footer, exam preview, headings
│   │   ├── dashboard/                # portal shell + navigation
│   │   └── ui/                       # shadcn/ui components
│   └── lib/
│       ├── site.ts                   # brand, navigation, BCSE stages, origin labels, pricing copy
│       └── utils.ts                  # cn() class helper
├── docs/EXAMINATION-ARCHITECTURE.md  # BCSE data model (PE + ME), verification rules
├── CHECKLIST.md                      # milestone progress
└── .env.example
```

## Design system

Tokens live in `src/app/globals.css` and are exposed to Tailwind:

- **Colours:** white background, charcoal text (`foreground`), near-black
  primary buttons, **forest green** accent (`brand`, `brand-soft`) for
  interactive states and indicators, `warning` for "marked for review".
- **Type:** `font-heading` (Instrument Serif) for headlines, Inter for
  everything else. The `.eyebrow` class is used for small uppercase labels.
- **Layout:** `.container-page` for consistent page width and gutters.
- **Buttons as links:** use `buttonVariants()` on a `<Link>`. It merges
  classes, so overrides passed in `className` win.

Brand copy, navigation, examination categories and pricing are edited in
`src/lib/site.ts`, not in components.

## Brand rules

- The official logo is `public/images/soma-logo.png`. Do not redesign,
  recolour, distort or filter it. Derived files only trim empty margins.
- Never claim an affiliation with the RCSC or any government agency. The
  footer disclaimer is required.

## Content accuracy rules

- RCSC is the institution; BCSE is the examination; PE and ME are its stages.
  Never call ME "the RCSC exam".
- Examination formats, papers, marks, durations and weightages are **data**,
  entered by admins from current RCSC notices, never hardcoded.
- Every item carries an origin label: *Official RCSC information* (with
  source link), *Historical paper or format*, *Original Soma question* or
  *Expert-created material*. Unverified official facts display as
  *Pending verification with RCSC*.
- Do not reproduce official examination papers commercially without
  recorded permission.

## Testing done for Milestone 1

- `npm run lint`, `npm run typecheck`, `npm run build`: all pass.
- Browser checks (Playwright, production build) at 390 px, 820 px and
  1366 px: every page returns 200, no horizontal overflow, no console
  errors, mobile menu opens and navigates, all 20 internal links resolve, and no page uses "RCSC" as an examination name,
  manifest valid.

## Known items

- `npm audit` reports moderate advisories in **development-only** lint
  tooling (`@typescript-eslint`). They do not ship to users; revisit when
  upstream releases fixes.
- The shadcn CLI installed a new `cn` package; it failed to resolve
  `border-*` colour conflicts, so the project uses the standard
  `clsx` + `tailwind-merge` instead.

## Deployment (Milestone 8)

Vercel → *Add New Project* → import the GitHub repository → set **Root
Directory** to `soma-preparations` → add environment variables → Deploy.
