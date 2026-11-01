export function scoreQuiz(questions, answers) {
  if (!Array.isArray(questions) || !answers || typeof answers !== 'object') throw new TypeError('Invalid quiz inputs');
  const results = questions.map(q => {
    const answered = Object.hasOwn(answers, q.id) && answers[q.id] !== null;
    const correct = answered && Number(answers[q.id]) === q.correct;
    return { id:q.id, correct, selected: answered ? Number(answers[q.id]) : null, correctIndex:q.correct, explanation:q.explanation };
  });
  const correct = results.filter(r => r.correct).length;
  return {correct,total:questions.length,percentage:questions.length ? Math.round(100*correct/questions.length) : 0,results};
}
export function completedAllLessons(completed, lessons) {
 return lessons.every(lesson => completed.includes(lesson.id));
}
export function earnedCertificate(percentage,completed,lessons,threshold=70){return completedAllLessons(completed,lessons)&&percentage>=threshold;}
export function safeDisplayName(name){return String(name??'').replace(/[<>\x00-\x1f]/g,'').trim().slice(0,60);}

const FORM_BASE = 'https://docs.google.com/forms/d/e/1FAIpQLScbPQJ8rkW_aDY-qFvNSAp3qbCDHXdGaeN6YkPgNOLSCUWggQ/viewform';

/**
 * Build a prefilled Google Form URL for recording a quiz result.
 *
 * @param {object} opts
 * @param {number}  opts.percentage        - Quiz score (0–100). Required.
 * @param {string}  [opts.studentName]     - Name already collected and confirmed; omit if unknown.
 * @param {string}  [opts.studentId]       - Student ID already collected and confirmed; omit if unknown.
 * @param {boolean} [opts.certificateEarned] - Only pass when genuinely known; omit otherwise.
 * @returns {string} Prefilled Google Forms URL.
 */
export function buildFormUrl({ percentage, studentName, studentId, certificateEarned } = {}) {
  if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) {
    throw new RangeError('percentage must be a finite number between 0 and 100');
  }
  const params = new URLSearchParams();
  params.set('entry.419242921', String(Math.round(percentage)));
  if (typeof studentName === 'string' && studentName.trim() !== '') {
    params.set('entry.1892569905', studentName.trim());
  }
  if (typeof studentId === 'string' && studentId.trim() !== '') {
    params.set('entry.1061860108', studentId.trim());
  }
  if (typeof certificateEarned === 'boolean') {
    params.set('entry.1878979011', certificateEarned ? 'yes' : 'no');
  }
  return `${FORM_BASE}?${params.toString()}`;
}
