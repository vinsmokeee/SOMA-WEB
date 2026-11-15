# DrukPrep: BCSE Preliminary Exam practice

Timed mock tests for graduates sitting the Bhutan Civil Service Examination
(BCSE) Preliminary Examination, with instant scores, section breakdown and an
explanation for every answer.

Live: `https://vinsmokeee.github.io/SOMA-WEB/drukprep/`

## Why this market

- About 5,000–5,900 graduates register for the BCSE every year, competing for a
  few hundred civil service posts. Many retake it, so new candidates arrive
  every year.
- There is no dedicated online practice platform. Students use old PDF papers
  and an unofficial Facebook page.
- The Preliminary Exam is multiple choice (English, Dzongkha, logical
  reasoning, data interpretation, general awareness), which suits timed
  online practice.

## How it makes money

| Stream | How |
|---|---|
| **Exam Pass**, Nu. 499 | Unlocks all paid mock tests for the season. Paid by mBoB / BNB QR. |
| **Sponsor slot** | Sell the "For institutes" band to coaching centres and colleges. |

Example: if 300 candidates buy (about 5% of registrants), that is Nu. 149,700 per season.

## How payment works

1. The student scans your QR (`assets/qr.png`) and pays.
2. They fill in their name, phone and journal number, which opens WhatsApp
   with a message to you.
3. You check the money arrived, then reply with the **unlock code**.
4. They enter the code and every paid test opens on that device.

No foreign payment company is needed.

## Setup

1. Put your mBoB or BNB QR image at `drukprep/assets/qr.png`.
2. In `config.js`, set `whatsapp` (975 + your number) and `accountName`.
3. Keep your unlock code safe. It is **not** stored on the website.

## Adding mock tests

Paid tests are encrypted, so they can't be read without the code, even
though the repository is public.

```bash
cd drukprep
# 1. Get readable copies of the published tests (needs your code)
node tools/pack.mjs decrypt YOUR-CODE        # → private/*.json
# 2. Copy private/mock1.json to private/mock2.json, change id/title/questions
# 3. Encrypt everything again and publish
node tools/pack.mjs encrypt YOUR-CODE        # → packs/*.json + packs/index.js
git add packs && git commit -m "Add mock test 2" && git push
```

The `private/` folder is git-ignored and never published.

Write your own questions. Don't copy RCSC papers into paid tests; link to them
instead (the site already does).

## Things to know

- **Codes can be shared.** One code unlocks everything, so a buyer could pass
  it on. Change the code each exam season (decrypt with the old code, encrypt
  with the new one). Once you have revenue, a small backend with one code per
  buyer would stop sharing.
- **Before you charge**: 5 paid mock tests are published (100 questions). Still
  needed: Dzongkha questions, because the FAQ promises Dzongkha will be added.
- The site promises a 7-day refund and replies "within a few hours". Keep
  both promises, or edit the FAQ and payment text.
- Keep the "not affiliated with the RCSC" wording. Don't use RCSC logos.
