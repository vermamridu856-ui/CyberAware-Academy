# CyberAware Academy — Project Report

**Workshop:** IBM ICT Academy Cybersecurity Workshop  
**Project:** Cybersecurity Awareness Training Program  
**Student:** [Name]  
**Roll number:** [Roll number]  
**Institute:** [College]  
**Mentor:** [Mentor]

## 1. Problem statement
Phishing, password reuse, unsafe browsing and social engineering can expose users to preventable cyber risks. Introductory cybersecurity training should be accessible, concise and engaging.

## 2. Objective
Develop a simple training website that presents four core security topics, measures understanding with a short quiz, explains mistakes and provides a printable completion acknowledgment.

## 3. Technology used
HTML5, CSS3, modern JavaScript (ES modules), browser localStorage, Node.js built-in test runner, optional Docker and Nginx, GitHub/GitHub Actions and IBM Bob (upon documented use).

## 4. Architecture
User browser → static HTML/CSS/JS → lessons (`content.js`) → quiz scoring (`quiz.js`) → result feedback → certificate eligibility. Browser localStorage holds completed lesson IDs and latest quiz percentage. There is no backend or database.

## 5. Functional modules
1. Lessons on phishing, passwords/MFA, safer browsing, and social engineering.
2. Interactive 10-question assessment (each question has one correct answer).
3. Scoring formula: `(correct answers / total questions) × 100`, rounded to nearest integer.
4. Result explanations and retry.
5. Printable educational completion certificate unlocked after completing lessons and scoring at least 70%.
6. Reset stored progress.

## 6. Testing
Run `npm test` and record your actual result. Unit tests cover correct/wrong/unanswered questions, empty question lists, completion, eligibility, name sanitization and input validation. Manually test desktop/mobile screens and print dialog.

## 7. IBM Bob contribution
Complete steps in `IBM_BOB_WORKFLOW.md` and describe **only tasks you actually carried out**. Add Bob screenshots and test evidence.

## 8. Constraints and future scope
This is an educational prototype, not accredited certification. No user identity verification, no centralized learning analytics, and no persistent records outside one browser. Future enhancements could include multilingual content, role-based questions, an accessible question bank and optional authenticated learning records.

## 9. Conclusion
The project demonstrates cybersecurity-awareness education, interactive assessment, fundamental web engineering, unit testing and reproducible deployment.
