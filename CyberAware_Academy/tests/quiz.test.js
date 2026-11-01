import test from 'node:test';
import assert from 'node:assert/strict';
import {scoreQuiz,completedAllLessons,earnedCertificate,safeDisplayName} from '../src/quiz.js';
const sample=[{id:1,correct:1,explanation:'A'},{id:2,correct:0,explanation:'B'}];const lessons=[{id:'a'},{id:'b'}];
test('all correct answers give 100%',()=>assert.equal(scoreQuiz(sample,{1:1,2:0}).percentage,100));
test('wrong answers give 0%',()=>assert.equal(scoreQuiz(sample,{1:0,2:1}).percentage,0));
test('missing answer is incorrect',()=>assert.equal(scoreQuiz(sample,{1:1}).percentage,50));
test('empty question list returns 0%',()=>assert.equal(scoreQuiz([],{}).percentage,0));
test('number of results matches questions',()=>assert.equal(scoreQuiz(sample,{}).results.length,2));
test('lesson completion checks all ids',()=>assert.equal(completedAllLessons(['a','b'],lessons),true));
test('certificate requires sufficient score',()=>assert.equal(earnedCertificate(69,['a','b'],lessons),false));
test('certificate requires all lessons',()=>assert.equal(earnedCertificate(90,['a'],lessons),false));
test('certificate unlocked at 70 and complete',()=>assert.equal(earnedCertificate(70,['a','b'],lessons),true));
test('certificate names strip HTML angle brackets',()=>assert.equal(safeDisplayName('<Alex>'),'Alex'));
test('invalid inputs rejected',()=>assert.throws(()=>scoreQuiz('bad',{}),TypeError));

// Improvement #1 — answer validation: null answers must never score points
test('unanswered question with correct index 0 does not score', () => {
  const q = [{id:5,correct:0,explanation:'X'}];
  assert.equal(scoreQuiz(q,{}).percentage, 0);
});
test('unanswered question result has correct:false', () => {
  const q = [{id:5,correct:0,explanation:'X'}];
  assert.equal(scoreQuiz(q,{}).results[0].correct, false);
});
test('unanswered question result has selected:null', () => {
  const q = [{id:5,correct:0,explanation:'X'}];
  assert.equal(scoreQuiz(q,{}).results[0].selected, null);
});
test('explicit option-0 answer on correct:0 question scores correctly', () => {
  const q = [{id:5,correct:0,explanation:'X'}];
  assert.equal(scoreQuiz(q,{5:'0'}).percentage, 100);
});
test('explicit option-0 answer on correct:0 has correct:true', () => {
  const q = [{id:5,correct:0,explanation:'X'}];
  assert.equal(scoreQuiz(q,{5:'0'}).results[0].correct, true);
});
test('null value in answers object is treated as unanswered', () => {
  const q = [{id:5,correct:0,explanation:'X'}];
  assert.equal(scoreQuiz(q,{5:null}).percentage, 0);
});
test('all questions unanswered gives 0%', () => {
  assert.equal(scoreQuiz(sample,{}).percentage, 0);
});
test('partial answers: only answered questions can score', () => {
  // q1 correct:1 — answered correctly; q2 correct:0 — unanswered
  assert.equal(scoreQuiz(sample,{1:'1'}).correct, 1);
});
