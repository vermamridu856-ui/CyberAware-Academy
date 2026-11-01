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
