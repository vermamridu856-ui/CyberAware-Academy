# IBM Bob workflow — evidence checklist
Do these tasks yourself in Bob. Take screenshots of actual steps and add them to the presentation.

## 1. Plan mode (review)
Prompt:
> Review this CyberAware Academy project. Explain how `src/content.js`, `src/quiz.js` and `src/app.js` work together. Identify two manageable improvements that will make the learning platform more robust. Create a plan only; do not edit code.

Capture: workspace, Bob plan, file references.

## 2. Agent mode (real edit)
Prompt:
> Implement one small improvement to quiz usability or accessibility. For example, add a clearer error prompt when users try to submit unanswered questions, or improve keyboard focus states. Keep all features working. Add or update an appropriate test where practical, run `npm test`, and explain changes.

Review the proposed diff before accepting; run the application and verify manually. Capture: Bob code changes, test output, Git diff.

## 3. Ask mode (viva preparation)
Prompt:
> Explain the quiz scoring function, browser localStorage behavior, certificate eligibility checks, and why this app requires no backend. Prepare five viva questions and answers based on the actual files.

Capture: Bob explanation.

## Git evidence
```bash
git status
git add .
git commit -m "Improve quiz usability with IBM Bob assistance"
```
Only make the commit after you have reviewed/tested the code. Add screenshots under `docs/screenshots/` if you choose.
