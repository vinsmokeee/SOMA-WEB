# SOMA PREPARATIONS: development checklist

Legend: ✅ done · 🟡 in progress · ⬜ not started · 🔑 needs something from the owner

## Milestone 1: Project foundation ✅

- ✅ Inspect project directory (repo held the Soma invoice site + DrukPrep; new app isolated in `soma-preparations/`)
- ✅ Next.js 16 + TypeScript + App Router
- ✅ Tailwind CSS v4
- ✅ shadcn/ui (button, card, badge, sheet, separator, progress)
- ✅ Design system: tokens, fonts, spacing, components
- ✅ Official SOMA logo added (`public/images/soma-logo.png`, unmodified)
- ✅ Responsive homepage: hero, PE & RCSC cards, exam experience, free practice, pricing (Nu. 499), about, final CTA
- ✅ Responsive navigation (desktop bar + mobile drawer)
- ✅ Footer with legal links and non-affiliation disclaimer
- ✅ Student dashboard layout (sidebar on desktop, bottom tabs on phones) with honest empty states
- ✅ Placeholder pages for later milestones (no broken links)
- ✅ PWA readiness: manifest, icons, theme colour
- ✅ Lint, type check, production build
- ✅ Browser checks on phone, tablet and desktop widths
- ✅ README + this checklist

## Milestone 2: Authentication ⬜

- 🔑 Create a Supabase project and share URL + anon key (service-role key goes in env only)
- ⬜ Supabase client (browser + server) and session handling via `proxy`
- ⬜ Registration (name, email, password) with validation
- ⬜ Login / logout
- ⬜ Email verification
- ⬜ Password reset
- ⬜ Profile page (view/edit)
- ⬜ Protect `/dashboard` (server-side)
- ⬜ Tests for auth flows

## Milestone 3: Database and question bank ⬜

- ⬜ Schema + migrations (profiles, roles, categories, subjects, topics, questions, options, sources, exams, exam_questions, attempts, attempt_answers, packages, entitlements, orders, payments, audit_logs)
- ⬜ Row Level Security policies + tests
- ⬜ Question management (add / edit / delete / search / filter)
- ⬜ CSV import with template
- ⬜ Source attribution + verification status
- ⬜ Migrate the existing verified DrukPrep questions into the bank

## Milestone 4: Examination engine ⬜

- ⬜ Instructions page
- ⬜ Server-enforced timer (start time + deadline stored server-side)
- ⬜ Question palette (answered / unanswered / marked / current)
- ⬜ Mark for review, previous / next, jump to question
- ⬜ Periodic answer saving + offline recovery
- ⬜ Submission with confirmation, auto-submit at deadline, duplicate protection
- ⬜ Server-side marking; answers never sent to the browser before submission
- ⬜ Results: correct / incorrect / unanswered, score, %, time taken, subject breakdown
- ⬜ Configurable answer/explanation release

## Milestone 5: Administration ⬜

- ⬜ Role-based admin access (server-enforced)
- ⬜ Admin dashboard (students, premium, exams, questions, revenue)
- ⬜ Examination management (duration, marks, free/premium, random sets, attempts, availability)
- ⬜ Student management
- ⬜ Payment verification
- ⬜ Audit logging

## Milestone 6: Premium access ⬜

- ⬜ Packages + entitlements (lifetime access per package)
- ⬜ Manual, admin-verified payment workflow (mBoB/BNB QR + journal number)
- 🔑 Payment provider documentation + credentials (e.g. BoB e-Payment Gateway) when available
- ⬜ Duplicate-activation protection
- ⬜ Purchase history

## Milestone 7: Testing and launch ⬜

- ⬜ End-to-end tests (auth, exam integrity, payments, RLS)
- ⬜ Real-device testing (Android, iPhone, laptop)
- 🔑 Vercel account + domain
- ⬜ Production deployment, backups, monitoring
- 🔑 Final terms and privacy policy text
