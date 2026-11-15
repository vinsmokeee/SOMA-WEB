# Examination architecture

How Soma Preparations models the Bhutan Civil Service Examination so that both
stages (PE and ME), every ME category, and future changes by the RCSC can be
handled as **data entered by administrators**, not code changes.

## 1. Terminology (use consistently everywhere)

| Term | Meaning | Kind |
|---|---|---|
| **RCSC** | Royal Civil Service Commission | Institution that conducts the examination |
| **BCSE** | Bhutan Civil Service Examination | The examination |
| **PE** | Preliminary Examination | BCSE **Stage I** |
| **ME** | Main Examination | BCSE **Stage II** |

Rules:
- Never use "RCSC" as the name of an examination or a stage. ME is not "the RCSC exam".
- Navigation: **BCSE Preparation → Stage I: Preliminary Examination (PE) / Stage II: Main Examination (ME)**.
- Homepage message: *"Prepare for both stages of the Bhutan Civil Service Examination with Soma Preparations."*

## 2. Structure as data

```
exam_bodies            RCSC
└─ examinations        BCSE
   └─ exam_stages      PE (Stage I), ME (Stage II)
      ├─ exam_categories        PE: one ("All candidates")
      │                         ME: Administrative, Finance, Education (PGDE),
      │                             Dzongkha, Technical, B.Ed. … (configurable)
      │  └─ papers               e.g. PE "Paper"; ME category papers
      │     └─ paper_sections    e.g. English, Dzongkha, Logic, DI, GA
      │        └─ syllabus_topics
      └─ exam_cycles             e.g. BCSE 2027: dates, notices, active structure version
```

Every level carries **configurable** values, never constants in code:

| Level | Configurable fields (examples) |
|---|---|
| stage | name, order, description, delivery (`objective`, `written`, `mixed`), viva (yes/no) |
| category | name, eligibility notes, active from/to |
| paper | title, duration, max marks, pass/cut-off rule, weightage, answer mode |
| section | title, number of questions or marks, weightage, language (English/Dzongkha) |
| topic | title, parent topic, syllabus reference |

**Versioning:** structures are versioned per `exam_cycle`. When RCSC changes the
format, an admin creates a new version; old attempts stay linked to the version
they were taken under, so historical results remain correct.

## 3. Content model

### Question / task types

| Type | Used for | Marking |
|---|---|---|
| `mcq_single` | PE (and any objective ME parts) | Automatic, server-side |
| `mcq_multi` (later) | If required | Automatic |
| `short_answer` | ME | Manual (rubric) |
| `long_answer` / `essay` | ME | Manual (rubric), word limits |
| `precis` / `letter` / `report` etc. | ME (as RCSC papers require) | Manual (rubric) |
| `viva_prompt` | Viva voce preparation | Self-practice / mentor feedback |

Shared fields: stage, category, paper, section, topic, difficulty, language,
explanation or **model answer**, **marking rubric**, **origin**, source,
verification status, created/updated by and when.

### Learning materials
`lessons` (topic-wise, PE and ME), `model_answers`, `revision_notes`,
`viva_resources`: each with origin, author and review status.

## 4. Origin and verification (mandatory on every item)

| Origin | Shown to students as | Requirements |
|---|---|---|
| `official` | Official RCSC information | Link to the RCSC announcement, syllabus or notice + date checked |
| `historical` | Historical paper or format | Year stated, labelled as possibly outdated; permission recorded before commercial reuse |
| `original` | Original Soma question | Author recorded |
| `expert` | Expert-created material | Expert name/credentials recorded internally |

- `verification_status`: `draft` → `pending_review` → `verified` (or `rejected`), with reviewer and timestamp.
- Official facts (formats, papers, marks, dates) **cannot be published** without a linked source and a recent `verified_at`.
- Each exam cycle shows "Information checked against RCSC notice of <date>".
- `permissions` table: rights holder, scope, date and document for any reproduced material. No permission means no commercial reuse.

## 5. Attempts and assessment

**PE (objective)**
`attempts` (server start time, server deadline, status) → `attempt_answers`
(saved periodically) → server-side marking → `attempt_results`
(per-section scores). Answer keys are never sent to the browser before
submission.

**ME (written)**
`submissions` (typed answer text or uploaded scan, word count, submitted at)
→ `evaluations` (examiner, rubric scores per criterion, written feedback,
status `queued → in_review → returned`) → student sees feedback and model
answer according to the release settings.

Roles: `student`, `examiner` (evaluates assigned ME submissions only),
`content_editor`, `reviewer`, `admin`. All are enforced server-side with
Supabase Row Level Security.

## 6. Packages and access

`packages` (e.g. "PE Premium", "ME Administrative") → `package_contents`
(stages, categories, papers, exams) → `entitlements` (student × package,
lifetime unless configured otherwise). Expert evaluation can be metered
(e.g. N evaluations per package) because it has a real cost per answer.

## 7. Admin capabilities (Milestones 3, 5 and 6)

- Create and modify stages, ME categories, papers, sections, topics, marks,
  durations and weightages per exam cycle.
- Upload and manage questions, model answers, rubrics, explanations (CSV + forms).
- Assign ME submissions to examiners; track turnaround; quality-check feedback.
- Record official sources and permissions; mark items verified.
- Publish a new structure version when the RCSC changes requirements.

## 8. What is verified today

| Item | Status | Source |
|---|---|---|
| PE skill areas (English, Dzongkha, logic/analytical/problem solving, data interpretation, general awareness/current affairs) | Verified | RCSC "Preliminary Examination" page (rcsc.gov.bt/preliminary-examination/) |
| ME categories (Administrative, Finance, Education (PGDE), Dzongkha, Technical, B.Ed.) | **Pending verification** | Owner's brief; to be checked against the latest RCSC notification |
| Papers, marks, durations, weightages for PE and ME | **Not yet entered** | Enter only from current RCSC notices |
