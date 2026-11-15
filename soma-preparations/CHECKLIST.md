# SOMA PREPARATIONS: development checklist

Legend: ✅ done · 🟡 in progress · ⬜ not started · 🔑 needs something from the owner

Terminology: **RCSC** (institution) conducts the **BCSE** (examination), which has
**Stage I: Preliminary Examination (PE)** and **Stage II: Main Examination (ME)**.
See [`docs/EXAMINATION-ARCHITECTURE.md`](docs/EXAMINATION-ARCHITECTURE.md).

## Milestone 1: Project foundation ✅

- ✅ Inspect project directory (repo held the Soma invoice site + DrukPrep; new app isolated in `soma-preparations/`)
- ✅ Next.js 16 + TypeScript + App Router
- ✅ Tailwind CSS v4
- ✅ shadcn/ui (button, card, badge, sheet, separator, progress)
- ✅ Design system: tokens, fonts, spacing, components
- ✅ Official SOMA logo added (`public/images/soma-logo.png`, unmodified)
- ✅ Responsive homepage: hero, BCSE stage cards (PE + ME), exam experience, free practice, pricing (Nu. 499), about, final CTA
- ✅ Responsive navigation (desktop bar + mobile drawer)
- ✅ Footer with legal links and non-affiliation disclaimer
- ✅ Student dashboard layout (sidebar on desktop, bottom tabs on phones) with honest empty states
- ✅ Placeholder pages for later milestones (no broken links)
- ✅ PWA readiness: manifest, icons, theme colour
- ✅ Lint, type check, production build, browser checks on phone/tablet/desktop
- ✅ README + this checklist

### Correction: BCSE structure ✅

- ✅ Replaced "PE and RCSC" with **PE and ME under BCSE** in config, pages, dashboard and docs
- ✅ Routes: `/bcse`, `/bcse/pe`, `/bcse/me` (old `/exams` routes removed)
- ✅ Navigation: *BCSE Preparation → Stage I (PE) / Stage II (ME)*
- ✅ Homepage message: "Prepare for both stages of the Bhutan Civil Service Examination with Soma Preparations."
- ✅ Content-origin labels (official / historical / original / expert) with verification state
- ✅ Examination architecture document (data model for PE + ME, written assessment, versioning)
- 🔑 Verify ME categories against the latest RCSC notification (currently shown as *pending verification*)

## Milestone 2: Authentication ⬜

- 🔑 Create a Supabase project and share URL + anon key (service-role key goes in env only)
- ⬜ Supabase client (browser + server) and session handling via `proxy`
- ⬜ Registration (name, email, password) with validation
- ⬜ Login / logout, email verification, password reset
- ⬜ Profile page (view/edit)
- ⬜ Protect `/dashboard` (server-side)
- ⬜ Tests for auth flows

## Milestone 3: Database, examination structure and question bank ⬜

- ⬜ Schema + migrations per `docs/EXAMINATION-ARCHITECTURE.md`: exam bodies, examinations, stages, ME categories, papers, sections, topics, exam cycles (versioned), questions (MCQ + written types), options, model answers, rubrics, lessons, sources, permissions, attempts, submissions, evaluations, packages, entitlements, orders, payments, audit logs
- ⬜ Roles: student, examiner, content editor, reviewer, admin
- ⬜ Row Level Security policies + tests
- ⬜ Admin: manage stages, categories, papers, sections, topics, marks, durations, weightages
- ⬜ Question management (add / edit / delete / search / filter), CSV import
- ⬜ Origin, source and verification workflow (draft → review → verified)
- ⬜ Migrate the verified DrukPrep PE questions (labelled *original*)

## Milestone 4: PE examination engine ⬜

- ⬜ Instructions page
- ⬜ Server-enforced timer (start + deadline stored server-side)
- ⬜ Question palette (answered / unanswered / marked / current), mark for review, jump
- ⬜ Periodic answer saving + offline recovery
- ⬜ Submission with confirmation, auto-submit at deadline, duplicate protection
- ⬜ Server-side marking; answer keys never sent before submission
- ⬜ Results: correct / incorrect / unanswered, score, %, time, section breakdown
- ⬜ Configurable answer/explanation release
- ⬜ Topic-wise lessons and practice, revision tools

## Milestone 5: ME preparation and written assessment ⬜

- ⬜ Category and paper-wise learning materials
- ⬜ Written-answer and essay practice (typed answers; scan upload later)
- ⬜ Model answers and marking rubrics
- ⬜ Examiner workflow: queue, assignment, rubric scoring, written feedback, return
- ⬜ Student feedback view and history
- ⬜ Viva voce preparation resources
- 🔑 Recruit/confirm subject experts and examiners per ME category

## Milestone 6: Administration ⬜

- ⬜ Admin dashboard (students, premium, exams, questions, submissions, revenue)
- ⬜ Examination management (structure versions, free/premium, random sets, attempts, availability)
- ⬜ Student and examiner management
- ⬜ Payment verification
- ⬜ Audit logging

## Milestone 7: Premium access ⬜

- ⬜ Packages + entitlements (lifetime access per package; PE and ME packages independent)
- ⬜ Metered expert evaluations for ME packages
- ⬜ Manual, admin-verified payment workflow (mBoB/BNB QR + journal number)
- 🔑 Payment provider documentation + credentials when available
- ⬜ Duplicate-activation protection, purchase history

## Milestone 8: Testing and launch ⬜

- ⬜ End-to-end tests (auth, exam integrity, written submissions, payments, RLS)
- ⬜ Real-device testing (Android, iPhone, laptop)
- 🔑 Vercel account + domain
- ⬜ Production deployment, backups, monitoring
- 🔑 Final terms and privacy policy text
