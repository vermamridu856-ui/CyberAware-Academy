# CyberAware Academy — Testing Report

**Workshop:** IBM ICT Academy Cybersecurity Workshop  
**Project:** Cybersecurity Awareness Training Program  
**Repository:** <https://github.com/vermamridu856-ui/CyberAware-Academy>  
**Live site:** <https://vermamridu856-ui.github.io/CyberAware-Academy/>  
**Test file:** `tests/quiz.test.js`  
**Test runner:** Node.js built-in test runner (`node --test`)  
**CI environment:** GitHub Actions, Node 22, Ubuntu Latest

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ PASS | Verified and passing |
| ❌ FAIL | Verified and failing |
| ⚠️ UNVERIFIED | Untested or not directly confirmable from source code alone |

| Label | Meaning |
|-------|---------|
| **[AUTO]** | Executed automatically by `npm test` / GitHub Actions CI |
| **[MANUAL]** | Confirmed by human interaction with the running application |
| **[STATIC]** | Verified by reading source code and configuration without execution |

---

## 1. Automated Unit Tests — `tests/quiz.test.js`

The project uses the Node.js built-in test runner. The test file imports five functions from [`src/quiz.js`](../src/quiz.js): `scoreQuiz`, `completedAllLessons`, `earnedCertificate`, `safeDisplayName`, and `buildFormUrl`. No third-party testing framework is used; no `npm install` step is required.

**Total tests in `tests/quiz.test.js`: 40**

---

### 1.1 Core Quiz Scoring — `scoreQuiz()`

The scoring formula (from [`src/quiz.js` line 9](../src/quiz.js)):

```
percentage = Math.round(100 * correct / total)
```

An unanswered question is defined by `Object.hasOwn(answers, q.id) && answers[q.id] !== null`. A `null` value in the answers object is treated identically to a missing key.

| Test ID | Test scenario | Expected result | Actual result | Status | Type |
|---------|--------------|-----------------|---------------|--------|------|
| SQ-01 | All answers correct (`{1:1, 2:0}` on two-question sample) | `percentage === 100` | 100 | ✅ PASS | [AUTO] |
| SQ-02 | All answers wrong (`{1:0, 2:1}` on two-question sample) | `percentage === 0` | 0 | ✅ PASS | [AUTO] |
| SQ-03 | One of two questions answered correctly, the other missing from answers object | `percentage === 50` | 50 | ✅ PASS | [AUTO] |
| SQ-04 | Empty questions array, empty answers object | `percentage === 0` | 0 | ✅ PASS | [AUTO] |
| SQ-05 | Two-question sample, empty answers object | `results.length === 2` | 2 | ✅ PASS | [AUTO] |
| SQ-06 | Non-array passed as `questions` argument | Throws `TypeError` | Throws `TypeError` | ✅ PASS | [AUTO] |

---

### 1.2 Null / Unanswered Answer Guard — Improvement #1

This group of tests was added as part of IBM Bob's Agent-mode improvement session. The guard ensures that a question whose correct answer is option index `0` cannot accidentally receive a passing score when left unanswered, because `Number(undefined) === 0` is `true`. The fix uses an explicit `answered` flag before comparing indices.

See [Section 4](#4-ibm-bob-improvement--quiz-validation-bug) for the full bug description and fix.

| Test ID | Test scenario | Expected result | Actual result | Status | Type |
|---------|--------------|-----------------|---------------|--------|------|
| NA-01 | Question with `correct:0`, no entry in answers object — `scoreQuiz(q, {})` | `percentage === 0` | 0 | ✅ PASS | [AUTO] |
| NA-02 | Same question — result object `correct` field | `correct === false` | false | ✅ PASS | [AUTO] |
| NA-03 | Same question — result object `selected` field | `selected === null` | null | ✅ PASS | [AUTO] |
| NA-04 | Same question — explicit answer `{5:'0'}` (correct option) | `percentage === 100` | 100 | ✅ PASS | [AUTO] |
| NA-05 | Same question — explicit answer `{5:'0'}` — result `correct` field | `correct === true` | true | ✅ PASS | [AUTO] |
| NA-06 | Same question — `{5:null}` in answers object | `percentage === 0` | 0 | ✅ PASS | [AUTO] |
| NA-07 | Two-question sample, completely empty answers object | `percentage === 0` | 0 | ✅ PASS | [AUTO] |
| NA-08 | Two-question sample — q1 answered correctly (`{1:'1'}`), q2 unanswered | `correct === 1` | 1 | ✅ PASS | [AUTO] |

---

### 1.3 Lesson Completion — `completedAllLessons()`

| Test ID | Test scenario | Expected result | Actual result | Status | Type |
|---------|--------------|-----------------|---------------|--------|------|
| LC-01 | Completed array contains both lesson IDs `['a','b']` | `true` | true | ✅ PASS | [AUTO] |

> Note: The test file does not include a test for a *partial* completed array in isolation; the partial scenario is covered indirectly by certificate eligibility test CE-02.

---

### 1.4 Certificate Eligibility — `earnedCertificate()`

Certificate eligibility requires **both** conditions simultaneously: all four lesson IDs in `state.completed` **and** `percentage >= 70`. The default threshold parameter is `70` (see [`src/quiz.js` line 14](../src/quiz.js)).

| Test ID | Test scenario | Expected result | Actual result | Status | Type |
|---------|--------------|-----------------|---------------|--------|------|
| CE-01 | Score 69, both lessons complete | `false` | false | ✅ PASS | [AUTO] |
| CE-02 | Score 90, only one of two lessons complete | `false` | false | ✅ PASS | [AUTO] |
| CE-03 | Score exactly 70, both lessons complete | `true` | true | ✅ PASS | [AUTO] |

---

### 1.5 Name Sanitisation — `safeDisplayName()`

| Test ID | Test scenario | Expected result | Actual result | Status | Type |
|---------|--------------|-----------------|---------------|--------|------|
| NS-01 | Input `'<Alex>'` containing HTML angle brackets | `'Alex'` | 'Alex' | ✅ PASS | [AUTO] |

---

### 1.6 Google Forms URL Builder — `buildFormUrl()`

`buildFormUrl()` constructs a prefilled URL using `URLSearchParams`. The four Google Form entry IDs are: `419242921` (score), `1892569905` (name), `1061860108` (student ID), `1878979011` (certificate earned).

| Test ID | Test scenario | Expected result | Actual result | Status | Type |
|---------|--------------|-----------------|---------------|--------|------|
| GF-01 | `percentage: 80` — URL starts with the correct form base | URL starts with form base | Confirmed | ✅ PASS | [AUTO] |
| GF-02 | `percentage: 70` — score entry present | URL contains `entry.419242921=70` | Confirmed | ✅ PASS | [AUTO] |
| GF-03 | `percentage: 66.7` — fractional score is rounded | URL contains `entry.419242921=67` | Confirmed | ✅ PASS | [AUTO] |
| GF-04 | `percentage: 80`, no `studentName` — name entry absent | `entry.1892569905` not in URL | Confirmed | ✅ PASS | [AUTO] |
| GF-05 | `percentage: 80, studentName: 'Alice'` — name entry present | URL contains `entry.1892569905=Alice` | Confirmed | ✅ PASS | [AUTO] |
| GF-06 | `percentage: 80, studentName: ''` — empty string omitted | `entry.1892569905` not in URL | Confirmed | ✅ PASS | [AUTO] |
| GF-07 | `percentage: 80, studentName: '   '` — whitespace-only omitted | `entry.1892569905` not in URL | Confirmed | ✅ PASS | [AUTO] |
| GF-08 | `percentage: 80`, no `studentId` — student ID entry absent | `entry.1061860108` not in URL | Confirmed | ✅ PASS | [AUTO] |
| GF-09 | `percentage: 80, studentId: 'S12345'` — student ID entry present | URL contains `entry.1061860108=S12345` | Confirmed | ✅ PASS | [AUTO] |
| GF-10 | `percentage: 80, certificateEarned: true` | URL contains `entry.1878979011=yes` | Confirmed | ✅ PASS | [AUTO] |
| GF-11 | `percentage: 80, certificateEarned: false` | URL contains `entry.1878979011=no` | Confirmed | ✅ PASS | [AUTO] |
| GF-12 | `percentage: 80`, no `certificateEarned` — cert entry absent | `entry.1878979011` not in URL | Confirmed | ✅ PASS | [AUTO] |
| GF-13 | `percentage: 0` — zero score | URL contains `entry.419242921=0` | Confirmed | ✅ PASS | [AUTO] |
| GF-14 | `percentage: 100` — maximum score | URL contains `entry.419242921=100` | Confirmed | ✅ PASS | [AUTO] |
| GF-15 | `percentage: -1` — below valid range | Throws `RangeError` | Throws `RangeError` | ✅ PASS | [AUTO] |
| GF-16 | `percentage: 101` — above valid range | Throws `RangeError` | Throws `RangeError` | ✅ PASS | [AUTO] |
| GF-17 | `percentage: NaN` — non-finite value | Throws `RangeError` | Throws `RangeError` | ✅ PASS | [AUTO] |
| GF-18 | `studentName: "O'Brien"` — apostrophe in name | URL encodes special character correctly | Confirmed | ✅ PASS | [AUTO] |
| GF-19 | All four fields supplied (`percentage:90, studentName:'Bob', studentId:'S99', certificateEarned:true`) | URL contains all four entry IDs with correct values | Confirmed | ✅ PASS | [AUTO] |

---

## 2. Manual Application Tests

These tests cover features that require a running browser and cannot be exercised by the Node.js unit test runner alone, since `src/app.js` depends on the DOM and `localStorage` APIs. Tests were performed against the live site at <https://vermamridu856-ui.github.io/CyberAware-Academy/> and confirmed through the screenshots in the `screenshots/` directory.

---

### 2.1 Lesson Navigation and Content

| Test ID | Test scenario | Expected result | Actual result | Status | Type |
|---------|--------------|-----------------|---------------|--------|------|
| LN-01 | Click **Open lesson ↗** on the Spot Phishing card | Modal dialog opens; shows icon, title, six bullet points, scenario, and model response | Modal renders correctly | ✅ PASS | [MANUAL] |
| LN-02 | Click **Open lesson ↗** on the Passwords & MFA card | Modal opens with correct content for that lesson | Content displayed | ✅ PASS | [MANUAL] |
| LN-03 | Click **Open lesson ↗** on the Safer Browsing card | Modal opens with correct content | Content displayed | ✅ PASS | [MANUAL] |
| LN-04 | Click **Open lesson ↗** on the Social Engineering card | Modal opens with correct content | Content displayed | ✅ PASS | [MANUAL] |
| LN-05 | Click ✕ button inside open lesson modal | Dialog closes | Dialog dismissed | ✅ PASS | [MANUAL] |
| LN-06 | Click modal backdrop (outside dialog box) | Dialog closes | Dialog dismissed | ✅ PASS | [MANUAL] |

*Evidence: `screenshots/lessons.png` shows the four lesson cards rendered with progress bar.*

---

### 2.2 Lesson Progress Tracking

| Test ID | Test scenario | Expected result | Actual result | Status | Type |
|---------|--------------|-----------------|---------------|--------|------|
| PT-01 | Open a lesson and click **Mark lesson complete ✓** | Card updates to show `✓ Completed`; progress bar advances; `localStorage` key `cyberaware-academy-v1` updated | Progress updates in real time | ✅ PASS | [MANUAL] |
| PT-02 | After marking all four lessons complete, reload the page | All four cards still show `✓ Completed`; progress bar shows 100 % | State persists across reload | ✅ PASS | [MANUAL] |
| PT-03 | Click **Reset progress** and confirm the dialog | All lesson cards reset to `○ Not started`; progress bar returns to 0 %; `localStorage` entry removed | State cleared | ✅ PASS | [MANUAL] |
| PT-04 | Mark a lesson complete, reload, then reopen that lesson | Button inside dialog shows `Completed ✓` (greyed, already complete) | State preserved | ✅ PASS | [MANUAL] |

---

### 2.3 Incomplete Quiz Submission Validation

This feature was identified as a gap by IBM Bob (Plan mode) and implemented with Bob's assistance (Agent mode). See [Section 4](#4-ibm-bob-improvement--quiz-validation-bug) for full details.

| Test ID | Test scenario | Expected result | Actual result | Status | Type |
|---------|--------------|-----------------|---------------|--------|------|
| QV-01 | Click **Submit assessment →** with all 10 questions unanswered | Warning banner appears ("Please answer 10 unanswered questions before submitting."); all question fieldsets highlighted with amber border; page scrolls to first question | Validation triggers correctly | ✅ PASS | [MANUAL] |
| QV-02 | Answer 8 of 10 questions and click submit | Warning banner shows count of 2; only the 2 unanswered fieldsets highlighted | Partial validation triggers | ✅ PASS | [MANUAL] |
| QV-03 | Answer a highlighted question and resubmit | Previous amber highlights cleared; new validation state applied | Previous state cleared on resubmit | ✅ PASS | [MANUAL] |
| QV-04 | Answer all 10 questions and click submit | No warning banner; quiz scores and results displayed | No false positives | ✅ PASS | [MANUAL] |

*Evidence: `screenshots/quiz-validation.png` shows the amber-highlighted unanswered question and warning banner.*

---

### 2.4 Complete Quiz Scoring and Results Display

| Test ID | Test scenario | Expected result | Actual result | Status | Type |
|---------|--------------|-----------------|---------------|--------|------|
| QS-01 | Answer all 10 questions with correct answers and submit | Score of 100 % displayed; all 10 questions show `✓ Correct` | Results rendered | ✅ PASS | [MANUAL] |
| QS-02 | Answer all 10 questions with wrong answers and submit | Score of 0 % displayed; all 10 questions show `✕ Review needed` | Results rendered | ✅ PASS | [MANUAL] |
| QS-03 | Answer 7 of 10 questions correctly and submit | Score of 70 % displayed; heading reads "Excellent progress!"; "You met the quiz pass threshold." shown | Pass threshold message | ✅ PASS | [MANUAL] |
| QS-04 | Answer 6 of 10 questions correctly and submit | Score of 60 % displayed; heading reads "Keep learning — you can retry." | Fail message displayed | ✅ PASS | [MANUAL] |
| QS-05 | Click **Retake quiz ↻** after seeing results | Quiz form re-renders from scratch; previous answers cleared; page scrolls to assessment section | Retake works | ✅ PASS | [MANUAL] |
| QS-06 | Check that each question's explanation appears after submission | Every question row shows the explanatory sentence from `content.js` | Explanations visible | ✅ PASS | [MANUAL] |

*Evidence: `screenshots/quiz-result.png` shows the score display with per-question feedback and the "Record my result" button.*

---

### 2.5 Certificate Eligibility and Lock / Unlock

| Test ID | Test scenario | Expected result | Actual result | Status | Type |
|---------|--------------|-----------------|---------------|--------|------|
| CI-01 | Fresh state — no lessons completed, no quiz taken | Certificate panel shows 🔒 "Certificate locked" | Locked state rendered | ✅ PASS | [MANUAL] |
| CI-02 | All 4 lessons complete, quiz score 60 % (below threshold) | Certificate panel remains locked | Correctly locked | ✅ PASS | [MANUAL] |
| CI-03 | Quiz score ≥ 70 %, but fewer than 4 lessons complete | Certificate panel remains locked | Correctly locked | ✅ PASS | [MANUAL] |
| CI-04 | All 4 lessons complete and quiz score ≥ 70 % | Certificate panel unlocks; preview renders with "CERTIFICATE OF COMPLETION"; name input and Print button appear | Unlocked correctly | ✅ PASS | [MANUAL] |
| CI-05 | Certificate unlocked; reload page | Certificate panel remains unlocked (state restored from `localStorage`) | Persists across reload | ✅ PASS | [MANUAL] |

---

### 2.6 Printable Certificate Generation

| Test ID | Test scenario | Expected result | Actual result | Status | Type |
|---------|--------------|-----------------|---------------|--------|------|
| CG-01 | Certificate unlocked; type a name in the input | Certificate preview updates live to show the entered name | Live preview works | ✅ PASS | [MANUAL] |
| CG-02 | Click **Print / Save as PDF ↗** without entering a name | Input gains focus; browser validation message "Please enter your name" | Blank-name guard triggers | ✅ PASS | [MANUAL] |
| CG-03 | Enter a valid name and click **Print / Save as PDF ↗** | New browser tab opens; landscape certificate page renders; browser print dialog opens after ~200 ms | Print dialog triggered | ✅ PASS | [MANUAL] |
| CG-04 | Printed certificate includes score and date | Certificate shows `ASSESSMENT <score>%` and `ISSUED <date>` in the details strip | Fields populated correctly | ✅ PASS | [MANUAL] |
| CG-05 | Enter a name containing `<` or `>` characters | Characters stripped by `safeDisplayName()`; preview shows name without angle brackets | Sanitisation confirmed | ✅ PASS | [AUTO+MANUAL] |

*Evidence: `screenshots/certificate.pdf` is a saved copy of the generated printable certificate.*

---

### 2.7 Google Forms Pre-filled Score Submission

| Test ID | Test scenario | Expected result | Actual result | Status | Type |
|---------|--------------|-----------------|---------------|--------|------|
| GS-01 | Complete quiz; click **Record my result ↗** | New tab opens pointing to the Google Form; `entry.419242921` in the URL matches the quiz percentage | URL constructed correctly (verified by source code inspection and manual test) | ✅ PASS | [MANUAL] |
| GS-02 | Complete quiz with all lessons done (certificate earned); click **Record my result ↗** | URL contains `entry.1878979011=yes` | Certificate flag set correctly | ✅ PASS | [MANUAL] |
| GS-03 | Complete quiz without all lessons done; click **Record my result ↗** | URL contains `entry.1878979011=no` | Certificate flag set to no | ✅ PASS | [MANUAL] |
| GS-04 | Pre-filled form opens in new tab; fill in name and student ID fields manually and submit | Form accepts input; Google confirms submission | Submission accepted | ✅ PASS | [MANUAL] |

---

### 2.8 Google Sheets Result Recording

| Test ID | Test scenario | Expected result | Actual result | Status | Type |
|---------|--------------|-----------------|---------------|--------|------|
| GR-01 | Submit a completed Google Form entry | New row appears in the linked Google Sheets spreadsheet with timestamp, score, and certificate field | Result recorded in spreadsheet | ✅ PASS | [MANUAL] |
| GR-02 | Multiple submissions from different learners | Each submission creates a separate timestamped row | Separate rows created | ⚠️ UNVERIFIED | — |

> GR-02 has not been independently verified with multiple real learner submissions during this test session. The mechanism (standard Google Forms → Google Sheets connection) is well established and the form integration is confirmed working by GR-01.

---

## 3. Deployment Tests

### 3.1 GitHub Actions — Automated Test Workflow

Workflow file: [`.github/workflows/tests.yml`](../.github/workflows/tests.yml)  
Trigger: every `push` and every `pull_request` to any branch.  
Runner: `ubuntu-latest`, Node 22.  
Command: `npm test` → `node --test tests/*.test.js`.

| Test ID | Test scenario | Expected result | Actual result | Status | Type |
|---------|--------------|-----------------|---------------|--------|------|
| CI-W-01 | Push to `main` branch triggers test workflow | Workflow job runs; all 40 unit tests pass; green badge reported | Confirmed via `screenshots/github-deployment.png` | ✅ PASS | [MANUAL] |

*Evidence: `screenshots/github-deployment.png` shows the GitHub Actions deployment and test run completing successfully.*

---

### 3.2 GitHub Actions — Pages Deployment Workflow

Workflow file: [`.github/workflows/pages.yml`](../.github/workflows/pages.yml)  
Trigger: push to `main` branch, or manual `workflow_dispatch`.  
Artifact path deployed: `src/` directory.

| Test ID | Test scenario | Expected result | Actual result | Status | Type |
|---------|--------------|-----------------|---------------|--------|------|
| DEP-01 | Push to `main` triggers the Pages deployment | Workflow steps complete: checkout → configure-pages → upload-pages-artifact → deploy-pages; live URL becomes accessible | Deployment succeeds | ✅ PASS | [MANUAL] |
| DEP-02 | Live site at `https://vermamridu856-ui.github.io/CyberAware-Academy/` loads the application | Homepage renders; all four lesson cards visible; quiz section accessible; no 404 errors | Site accessible | ✅ PASS | [MANUAL] |
| DEP-03 | ES module scripts (`app.js`, `quiz.js`, `content.js`) load without MIME-type errors | No console errors related to module loading; application fully functional | No module errors | ✅ PASS | [MANUAL] |

---

## 4. IBM Bob Improvement — Quiz Validation Bug

### Background

IBM Bob was used across multiple sessions during development. In **Plan mode**, Bob reviewed the three source files (`content.js`, `quiz.js`, `app.js`) and identified two improvements:

1. **Missing user feedback on incomplete quiz submission** — the original quiz submit handler in `app.js` called `scoreQuiz` on whatever answers were present without first checking whether all questions had been answered, giving no feedback to the user about which questions were skipped.

2. **Null-answer scoring vulnerability** — the original `scoreQuiz` answer comparison `Number(answers[q.id]) === q.correct` would evaluate as `true` for any question with `correct: 0` if that question was absent from the answers object, because `Number(undefined) === 0` is `true` in JavaScript.

### Pre-fix behaviour

Without the fix:
- A learner could click **Submit assessment →** without answering every question; the quiz would score immediately with no indication of which questions were missed.
- A question with `correct: 0` (Question 6 in the live quiz: "Which is a warning sign of phishing?") would receive a passing score even if the learner did not select any answer.

### Fix implemented (IBM Bob Agent mode)

Prompt used:
> Implement one small improvement to quiz usability or accessibility. Add a clearer error prompt when users try to submit unanswered questions. Keep all features working. Add or update an appropriate test where practical, run `npm test`, and explain changes.

**Changes made to `src/app.js` (submit handler):**

```javascript
// Explicit answered flag prevents null/undefined matching correct:0
const answered = Object.hasOwn(answers, q.id) && answers[q.id] !== null;
const correct = answered && Number(answers[q.id]) === q.correct;
```

The submit handler was extended to:
1. Collect unanswered question IDs via `FormData`.
2. Display a count-accurate warning banner (`role="alert"`) above the submit button.
3. Apply class `question--unanswered` to each unanswered `<fieldset>`.
4. Scroll the page smoothly to the first unanswered question.
5. Clear the previous validation state at the start of each resubmission attempt.

**Changes made to `src/styles.css`:**

```css
/* Quiz answer validation — Improvement #1 */
.question--unanswered { border: 2px solid #f4a340; border-radius: 12px; }
.quizWarning { background: #2a1a00; color: #f4a340; border: 1px solid #f4a340;
               border-radius: 8px; padding: 12px 16px; font-size: 14px;
               font-weight: 600; margin-bottom: 16px; }
```

**Tests added to `tests/quiz.test.js` (tests NA-01 through NA-08, 8 new tests):**

These tests specifically cover the null-answer scoring edge cases and are labelled `// Improvement #1` in the test file.

### Verification

After implementing the changes, `npm test` was run and all tests passed. The fix was then verified manually against the running application (see tests QV-01 through QV-04 in Section 2.3).

| Aspect | Before fix | After fix |
|--------|-----------|-----------|
| Submit with unanswered questions | Quiz scored silently | Warning banner + amber highlights + smooth scroll |
| `correct:0` question left unanswered | Incorrectly scored as correct | Correctly scored as 0 (unanswered) |
| Test coverage for null answers | No dedicated tests | 8 new unit tests (NA-01 to NA-08) |

*Evidence:*
- `screenshots/ibm-bob-analysis.png` — Bob Plan-mode review showing identified improvements.
- `screenshots/ibm-bob-debugging.png` — Bob Agent-mode session implementing the fix.
- `screenshots/quiz-validation.png` — running application showing the validation UI.

---

## 5. Test Coverage Summary

| Area | Automated tests | Manual tests | Total |
|------|----------------|--------------|-------|
| Core quiz scoring (`scoreQuiz`) | 6 | 0 | 6 |
| Null / unanswered answer guard (Improvement #1) | 8 | 0 | 8 |
| Lesson completion (`completedAllLessons`) | 1 | 0 | 1 |
| Certificate eligibility (`earnedCertificate`) | 3 | 0 | 3 |
| Name sanitisation (`safeDisplayName`) | 1 | 0 | 1 |
| Google Forms URL builder (`buildFormUrl`) | 19 | 0 | 19 |
| Lesson navigation and content rendering | 0 | 6 | 6 |
| Progress tracking and localStorage persistence | 0 | 4 | 4 |
| Incomplete quiz validation (UI) | 0 | 4 | 4 |
| Complete quiz scoring and results (UI) | 0 | 6 | 6 |
| Certificate lock / unlock (UI) | 0 | 5 | 5 |
| Printable certificate generation (UI) | 1 (name sanit.) | 4 | 5 |
| Google Forms pre-fill and manual submission | 19 (URL logic) | 4 | 23 |
| Google Sheets result recording | 0 | 1 verified / 1 unverified | 2 |
| GitHub Actions CI (test workflow) | 0 | 1 | 1 |
| GitHub Pages deployment | 0 | 3 | 3 |
| **Total** | **40** | **39** | **79** |

---

## 6. Known Gaps and Unverified Scenarios

| Scenario | Reason not tested |
|----------|------------------|
| Multiple simultaneous learner submissions to Google Sheets (GR-02) | Requires coordinating multiple real users submitting the form during the same test session. |
| Certificate printed to PDF on multiple OS and browser combinations | Print output depends on the local print subsystem; only one browser/OS combination was tested manually. |
| Application behaviour when `localStorage` is disabled or full | No automated test covers the `catch` branch of `readState()`. The branch exists in the code and returns a safe default, but has not been exercised in testing. |
| Pop-up blocker preventing certificate print window | The application shows an `alert` in this case; this alert path was not triggered during manual testing. |
| Mobile-device layout and touch interaction | Responsive breakpoints are present in `src/styles.css` but cross-device manual testing was not performed during this session. |

---

*CyberAware Academy · IBM ICT Academy Cybersecurity Workshop · Educational demonstration*
