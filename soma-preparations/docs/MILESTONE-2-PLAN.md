# Milestone 2 plan: Examination engine

Status: **awaiting owner approval**. No Milestone 2 code has been written.

Terminology: RCSC (institution) → BCSE (examination) → PE (Stage I) and ME (Stage II).

---

## 1. What exists today (Milestone 1)

| Area | State |
|---|---|
| Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui, design system, official logo | ✅ Done, reused as-is |
| Public site: homepage, `/bcse`, `/bcse/pe`, `/bcse/me`, about, placeholders | ✅ Done |
| Student portal shell (sidebar / mobile tabs) + dashboard empty states | ✅ Done, will be connected to real data |
| BCSE stage config, content-origin labels (official / historical / original / expert) | ✅ Done |
| Examination architecture (configurable, versioned structure; written assessment) | ✅ Documented in `EXAMINATION-ARCHITECTURE.md` |
| Backend: database, accounts, server logic, exam engine | ❌ Not started |
| Content: ~200 verified original PE questions (DrukPrep: 2 full mocks incl. 40 owner-checked Dzongkha, 5 quick tests, free test) | ✅ Exists (DrukPrep), to be imported, labelled *original* |

## 2. Requirements coverage

| Requirement (owner brief) | Supported now | Milestone |
|---|---|---|
| Authentic PE simulation | Homepage preview only | **2** |
| Authentic ME simulation (written) | — | **2** (engine), 4 (evaluation) |
| Server-side deadlines, autosave, recovery, no duplicate submissions | — | **2** |
| Randomised sets, configurable duration/marks | Designed | **2** (engine), 3 (admin UI) |
| Results + basic history | Empty states | **2** |
| Historical papers library + analysis | Research started | 3 |
| Question bank, bulk import, review workflow | Designed | 3 |
| Analytics, topic weaknesses, time management | — | 4 |
| Written-answer human evaluation, rubrics, examiner roles | Designed | 4 |
| AI question intelligence (AI Generated → Awaiting Review → Verified → Published) | — | 5 (schema fields reserved in 2–3) |
| Current-affairs automation (scheduled, human-approved) | — | 6 |
| Packages: PE Nu. 499, PE + ME Nu. 799, exam-cycle based, manual payments | Pricing copy only | 7 (schema-ready in 2) |
| Contributor roles + audit trail | Designed | 2 (roles + audit table), 3–4 (UIs) |

**Authentication is a prerequisite.** Attempts must belong to a verified account
for server-side timing and history, so Milestone 2 includes registration,
login, logout and password reset. Profile editing stays minimal.

## 3. What we know about the real procedure (verified vs not)

| Fact | Status | Source |
|---|---|---|
| PE is objective (MCQ), answered on an **OMR sheet with pencil**; answers on the question paper are not evaluated | Historical (2011) | BCSE 2011 PE paper, instructions page |
| 2011 PE: 100 questions, 1 mark each, all compulsory, 150 min + 15 min reading time, question paper "Series A" | Historical (2011) | Same |
| Current PE: 5 parameters × 20 questions (English, Dzongkha, logic/analytical/problem solving, data interpretation, general awareness/current affairs) | Reported for 2024+ | RCSC announcement (via search snippet); **duration not yet verified** |
| PE cut-off 55% (2025, 2026) | Official result notices | RCSC PE result declarations |
| ME pass mark 50% (2025); results cover **eleven categories** incl. Technical, Dzongkha, Law (Common Examination for Law), PGDE, Admin, Finance, B.Ed | Official | RCSC ME result notice, 5 Dec 2025 |
| ME papers: General Paper I (languages & GK, essays), Paper II (English & GK), Paper III (subject specialisation per category) | Historical papers | RCSC "BCSE Past Question Papers" page |
| ME answers are handwritten in booklets | **Assumed, to verify** | — |

Implications: every number above is **configuration with a source and
"checked on" date**, not code. The ME category list on the site should add
**Law** and be checked against the latest notice (currently shown as *pending verification*).

## 4. How the PE simulation works (student view)

1. **Exam lobby**: paper title, stage, duration, number of questions, marks,
   cut-off reference (with source label), rules. "I have read the instructions" checkbox.
2. **Reading time** (optional, configurable, e.g. 15 min): questions visible, answering locked.
3. **Start confirmation**: the server records the official start time; the countdown begins.
4. **Examination screen** (distraction-free: no site header or footer):
   - Header: paper name, section, live server-synced timer, question X of N.
   - One question at a time, large touch-friendly options (A–D; Dzongkha papers use ཀ ཁ ག ང).
   - Shared material (passage, chart, table) shown above its questions.
   - **Mark for review**, Previous, Next, **Clear response**.
   - **Palette**: answered / not answered / marked / answered and marked / current; section tabs.
   - Autosave on every change; a "Saved ✓ / Saving… / Offline, will sync" indicator.
5. **OMR practice mode** (option per attempt): the question booklet scrolls on
   the left (on phones, a tab), and answers are filled as **bubbles on a
   numbered answer sheet**, as on the real OMR. It trains transferring
   answers to a sheet. It is labelled *practice format based on the historical PE procedure*.
6. **Final review screen**: counts of answered, unanswered and marked; jump to any; then **Submit**, with a confirmation dialog.
7. **Auto-submit** when the server deadline passes, even if the browser is closed.
8. **Results**: score, %, correct / incorrect / unanswered, time used,
   section breakdown, comparison with the configured cut-off (sourced, "not
   a prediction"). Review answers with explanations if the exam's release
   setting allows.

## 5. How the ME simulation works

1. **Paper lobby**: category, paper (e.g. Paper I / II / III), duration,
   marks per question, choice rules ("answer any 3 of 5"), word guidance.
2. **Written examination screen**:
   - Timer (server deadline), question list with marks and status (not started / in progress / answered).
   - Question types: short answer, long answer, essay, précis, letter or report, analytical/descriptive, each with optional word limits shown as a live word count.
   - Plain, distraction-free editor (paragraphs; no rich formatting, closer to handwriting).
   - Autosave every few seconds and on blur; full recovery after refresh or disconnection.
   - Optional choice enforcement (e.g. max 3 answered for "any 3").
3. **Submit** with confirmation; auto-submit at the deadline.
4. **After submission**: model answers and marking rubric (per release
   setting), self-assessment against the rubric. In Milestone 4, **request
   expert evaluation** (human examiner scores per rubric criterion, with
   written feedback). AI-assisted feedback, if added later, is always labelled
   separately from human evaluation.
5. ME is **not** MCQ, but a paper can include an objective part if the
   official format requires it (mixed papers are supported).

## 6. Architecture

### Stack additions
- **Supabase**: Postgres, Auth (email + password, email verification, reset), Row Level Security.
- `@supabase/ssr`: cookie-based sessions in Next.js server components and actions; session refresh in `proxy.ts` (Next 16's name for middleware).
- `zod`: validation of every input at the server boundary.
- **Vitest** for unit tests; **Playwright** (already available) for end-to-end tests.
- `pg_cron` (Supabase) to finalise expired attempts.

### Database (Milestone 2 tables; the rest arrive in later milestones as designed)

```
profiles(id → auth.users, full_name, role, created_at)
roles: student | question_developer | subject_specialist | reviewer | evaluator | admin

-- structure (configurable, versioned)
exam_stages(id, code PE|ME, name, ...)
exam_categories(id, stage_id, name, active, source_id)
exam_cycles(id, year, label, status)
papers(id, cycle_id, stage_id, category_id, title, mode objective|written|mixed,
       duration_sec, reading_time_sec, total_marks, pass_rule jsonb, instructions md,
       access free|package, release_policy, shuffle_questions, shuffle_options,
       max_attempts, opens_at, closes_at, status draft|published)
paper_sections(id, paper_id, title, order, language, marks, question_count, blueprint jsonb)

-- content
content_groups(id, kind passage|chart|table, payload jsonb, origin, source_id)
questions(id, type mcq_single|short|long|essay|precis|letter|report,
          stem, group_id, subject, topic, difficulty, language, marks,
          word_limit, origin official|historical|original|expert|ai_generated,
          status draft|awaiting_review|verified|published|rejected,
          source_id, created_by, reviewed_by, reviewed_at, version)
question_options(id, question_id, label, body, order)          -- no correctness flag
answer_keys(question_id, correct_option_id, explanation)       -- students: NO access
model_answers(question_id, body, rubric jsonb)                 -- released per policy
sources(id, kind, title, url, publisher, published_on, checked_on, permission_status)

-- attempts (server-authoritative)
attempts(id, user_id, paper_id, mode standard|omr, status in_progress|submitted|expired,
         started_at, deadline_at, submitted_at, submit_reason user|timeout,
         score, max_score, client_meta jsonb)
attempt_items(attempt_id, position, question_id, option_order int[])    -- frozen set
attempt_answers(attempt_id, question_id, selected_option_id, flagged, updated_at)
written_responses(attempt_id, question_id, body, word_count, updated_at, revision)
attempt_results(attempt_id, section_id, correct, incorrect, unanswered, marks)
audit_log(id, actor_id, action, entity, entity_id, data jsonb, at)
```

`packages`, `package_items`, `entitlements`, `orders` and `payments` are
added in Milestone 7, but `papers.access` already distinguishes free from paid,
so no rework is needed. Prices live in the `packages` table and are never hardcoded.

### Server authority and exam integrity
- **Start**: `start_attempt(paper_id)` is a Postgres function (security
  definer). It checks access and attempt limits, sets `started_at = now()` and
  `deadline_at = now() + duration` (+ reading time), draws the question set
  (randomised from the section blueprints, if configured) and freezes it in
  `attempt_items` with shuffled option order. A resumed attempt gets the same set.
- **Delivery**: students receive stems and options only. `answer_keys` and
  `model_answers` have no student SELECT policy; nothing correct-answer
  related reaches the browser before submission.
- **Save**: `save_answer(attempt_id, question_id, option_id, flagged)` and
  `save_written(…)` succeed only if the caller owns the attempt, it is
  `in_progress`, and `now() <= deadline_at` (+ a few seconds' grace for
  network delay). Written saves carry a revision number so out-of-order saves
  can't overwrite newer text.
- **Timer**: the client shows `deadline_at − server_now` and re-syncs the
  offset on each save. Changing the device clock or JavaScript can't extend time.
- **Submit**: `submit_attempt(attempt_id)` performs a single atomic update
  (`WHERE status = 'in_progress'`), grades MCQs in SQL, writes results and
  returns them. A second call returns the existing result (idempotent), so
  there are no duplicate submissions.
- **Expiry**: a `pg_cron` job every minute finalises attempts past their
  deadline as `expired` with grading, so time still ends even if the browser
  never returns. Any request on an expired attempt also finalises it.
- **Offline**: every change is written immediately to an IndexedDB queue,
  then sent to the server. On reconnect or reload the queue flushes
  (server-side deadline still applies), so a refresh or brief disconnection loses nothing.
- **RLS**: students see only their own profile, attempts, answers and
  results; published papers' safe columns are exposed through views. Admin
  and reviewer access is checked via `role` in policies and functions, never via hidden links.
- **Secrets**: the service-role key is used only in server code (seeding and
  admin tasks), never in the browser bundle. Keys live in `.env.local` and
  Vercel environment variables.
- **Abuse limits**: per-user throttling on save and start functions; at most one in-progress attempt per paper.
- **Audit**: starts, submissions, expiries and admin changes go to `audit_log`.

### Next.js structure (new)

```
src/lib/supabase/{server,client,proxy}.ts
src/proxy.ts                                  -- session refresh, protect /dashboard and /exam
src/app/(auth)/login, register, forgot-password, reset-password
src/app/dashboard/exams                       -- available papers (PE / ME)
src/app/dashboard/history                     -- attempt history
src/app/exam/[paperId]/                       -- lobby (instructions)
src/app/exam/attempt/[attemptId]/             -- full-screen runner (PE or ME)
src/app/exam/attempt/[attemptId]/result       -- results + review
src/components/exam/{timer,palette,mcq-question,omr-sheet,written-editor,review-screen,...}
supabase/migrations/*.sql                     -- schema, RLS, functions, cron
supabase/seed/                                -- import of verified DrukPrep questions + sample ME papers
```

## 7. Milestone 2 deliverables

1. Supabase setup: migrations, RLS, functions, cron; documented in the README.
2. Auth: register (name, email, password), email verification, login, logout, password reset; protected routes.
3. Paper catalogue in the dashboard: free PE and ME papers.
4. **PE runner**: lobby, reading time, start confirmation, timer, one question at a time, palette, mark for review, autosave, offline queue, final review, submit and auto-submit, OMR practice mode, passages, charts and tables, Dzongkha support.
5. **ME runner**: lobby, timer, short, long and essay questions, word counts and limits, choice rules, autosave and recovery, submit and auto-submit, model answer and rubric view per release policy.
6. Results page + basic attempt history.
7. Seed content: imported **original** PE questions from DrukPrep (2 full mocks, quick tests) and **2 original sample ME papers** (e.g. a Paper I-style essay and précis paper) labelled *original*, with format notes marked as illustrative until verified.
8. Tests: unit tests (timer maths, grading, word count, randomisation), database tests (RLS: a student can't read keys or others' attempts; saves after the deadline fail; double submit is idempotent), Playwright end-to-end tests (full PE attempt, refresh mid-exam, offline then reconnect, timeout auto-submit, ME autosave and recovery) on phone and desktop widths.
9. Docs: README, CHECKLIST, this plan updated with results.

Out of scope for Milestone 2: admin UI (3), historical paper library (3),
analytics (4), human evaluation (4), AI (5), current affairs (6), payments (7).

## 8. Risks and dependencies

| # | Risk / dependency | Mitigation |
|---|---|---|
| 1 | 🔑 **Supabase project needed** (free tier). Keys must not be pasted in chat | Owner creates the project (in the business owner's name). Keys are provided through the secure environment settings; steps given at kickoff |
| 2 | Local development without Docker (Supabase CLI local stack may not run here) | Develop against a separate **development** Supabase project; production project later |
| 3 | The RCSC site blocks automated access from this environment | Verification via owner-provided documents; any automated retrieval runs from an allowed location with permission |
| 4 | Copyright of RCSC papers unclear (Bhutan Copyright Act 2001; no reuse licence found on the papers page) | Treat as **analysis-only** until RCSC grants permission. A permission-request letter is prepared. Students see links to official papers, not copies |
| 5 | ME is handwritten in reality; typing differs | Typed practice in M2; scan or photo upload of handwritten answers in M4 for evaluation |
| 6 | PE duration and current paper details not yet verified | All configurable, sourced, "checked on" date shown; current values confirmed from the latest notice before launch |
| 7 | ME category list incomplete (Law missing; "eleven categories" in 2025) | Update after verification; categories are data |
| 8 | Slow or mobile connections in Bhutan | Small payloads per question, offline queue, no heavy libraries in the runner |
| 9 | Free-tier limits (database size, emails/hour) | Fine for development and launch; upgrade path documented |
| 10 | "Lifetime" and package terms (Nu. 499 PE / Nu. 799 PE + ME) | Defined per package in M7: access to the named package's content for the named exam cycle(s); future cycles not promised unless stated |

## 9. Milestone order (owner's revised sequence, adopted)

2 Examination engine (+ essential auth) → 3 Question bank, historical papers
and admin → 4 Analytics and ME evaluation → 5 AI question intelligence →
6 Current-affairs automation → 7 Packages, payments and business.
`CHECKLIST.md` will be updated to this order when Milestone 2 starts.
