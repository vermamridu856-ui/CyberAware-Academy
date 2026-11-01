# CyberAware Academy
### Cybersecurity Awareness Training Program

An original, beginner-friendly **IBM ICT Academy Cybersecurity Workshop** project. Four educational modules, ten interactive knowledge-check questions, a progress dashboard, and a printable completion certificate.

## Features
- Four modules: phishing, passwords & MFA, safer browsing, and social engineering
- Interactive 10-question quiz with explanations and 70% pass threshold
- Progress stored in your browser using localStorage
- Printable **workshop demonstration** completion certificate (not accredited)
- Responsive interface, no login or backend, no user data sent to a server
- Automated tests, GitHub Actions, Docker deployment

## Project structure
```text
src/index.html      Web page
src/styles.css      Styling and responsive design
src/content.js      Educational lessons and quiz questions
src/quiz.js         Scoring and certification logic
src/app.js          UI logic and browser storage
tests/quiz.test.js  Automated unit tests
Dockerfile          Nginx container
nginx.conf          Web server configuration
docs/               Report and IBM Bob workflow
```

## Run locally — simplest way (no Node.js required)
Open `src/index.html` via VS Code's **Live Server** extension, or run Python's built-in static web server from the project root:

```bash
python -m http.server 8080 --directory src
```
Visit http://localhost:8080. For Windows, `py -m http.server 8080 --directory src` may work if `python` does not.

**Important:** Because the app uses JavaScript ES modules, opening `index.html` as a `file://` URL may fail. Use an HTTP server.

## Run automated tests (Node.js 20+)
```bash
npm test
```
No `npm install` is needed for tests: they use the built-in Node test runner.

## Run in Docker
```bash
docker build -t cyberaware-academy .
docker run --rm --name cyberaware-demo -p 8081:80 cyberaware-academy
```
Visit http://localhost:8081. Stop with Ctrl+C.

## Free deployment — GitHub Pages
After pushing the code to the `main` branch of your own repository, visit **Settings > Pages** and set **Source: GitHub Actions**. The included `.github/workflows/pages.yml` deploys the `src/` folder automatically after pushes to `main`. Watch the repository **Actions** tab for the result. Your site URL will typically be `https://YOUR_USERNAME.github.io/REPO_NAME/`.

## Sample demonstration
1. Open all four lessons and mark each complete.
2. Scroll to assessment; select an answer for each question.
3. Submit to see score, correct/incorrect feedback, and explanations.
4. Score at least 70%; enter your name and print a certificate.
5. Click Reset progress and demonstrate that browser-local progress clears.

## IBM Bob evidence
Use Bob's Plan, Agent, and Ask modes. Read `docs/IBM_BOB_WORKFLOW.md`. Add your *real* screenshots and a Git commit showing the improvement Bob helped you implement. Do not claim an action was done by Bob if you have not actually performed it.

## Limitations
Educational content is not professional security certification. The quiz is a learning check, not a validated assessment of cyber competence. Progress is device/browser-local, not synchronized. Certificate is printable and not independently verified. No accounts, central database, or tracking.

## Academic details
Student: **[Your name]**  
Roll number: **[Your roll number]**  
College: **[Your college]**  
Mentor: **[Mentor name]**  
Repository: **[Your GitHub URL]**
