import test from 'node:test';
import assert from 'node:assert/strict';
import {scoreQuiz,completedAllLessons,earnedCertificate,safeDisplayName,buildFormUrl} from '../src/quiz.js';
const sample=[{id:1,correct:1,explanation:'A'},{id:2,correct:0,explanation:'B'}];const lessons=[{id:'a'},{id:'b'}];

// ── Original scoreQuiz tests ──────────────────────────────────────────────────
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

// ── Improvement #1: null answers must never score points ──────────────────────
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

// ── buildFormUrl tests ────────────────────────────────────────────────────────
const FORM_BASE = 'https://docs.google.com/forms/d/e/1FAIpQLScbPQJ8rkW_aDY-qFvNSAp3qbCDHXdGaeN6YkPgNOLSCUWggQ/viewform';

test('buildFormUrl returns a string starting with the form base URL', () => {
  const url = buildFormUrl({ percentage: 80 });
  assert.ok(url.startsWith(FORM_BASE), `Expected URL to start with form base, got: ${url}`);
});
test('buildFormUrl encodes percentage into entry.419242921', () => {
  const url = buildFormUrl({ percentage: 70 });
  assert.ok(url.includes('entry.419242921=70'), `URL missing score param: ${url}`);
});
test('buildFormUrl rounds non-integer percentage', () => {
  const url = buildFormUrl({ percentage: 66.7 });
  assert.ok(url.includes('entry.419242921=67'), `Expected rounded score: ${url}`);
});
test('buildFormUrl omits entry.1892569905 when studentName is not provided', () => {
  const url = buildFormUrl({ percentage: 80 });
  assert.ok(!url.includes('entry.1892569905'), `Name param should be absent: ${url}`);
});
test('buildFormUrl includes entry.1892569905 when studentName is provided', () => {
  const url = buildFormUrl({ percentage: 80, studentName: 'Alice' });
  assert.ok(url.includes('entry.1892569905=Alice'), `Name param missing: ${url}`);
});
test('buildFormUrl omits entry.1892569905 when studentName is empty string', () => {
  const url = buildFormUrl({ percentage: 80, studentName: '' });
  assert.ok(!url.includes('entry.1892569905'), `Empty name should be omitted: ${url}`);
});
test('buildFormUrl omits entry.1892569905 when studentName is whitespace only', () => {
  const url = buildFormUrl({ percentage: 80, studentName: '   ' });
  assert.ok(!url.includes('entry.1892569905'), `Whitespace-only name should be omitted: ${url}`);
});
test('buildFormUrl omits entry.1061860108 when studentId is not provided', () => {
  const url = buildFormUrl({ percentage: 80 });
  assert.ok(!url.includes('entry.1061860108'), `Student ID param should be absent: ${url}`);
});
test('buildFormUrl includes entry.1061860108 when studentId is provided', () => {
  const url = buildFormUrl({ percentage: 80, studentId: 'S12345' });
  assert.ok(url.includes('entry.1061860108=S12345'), `Student ID param missing: ${url}`);
});
test('buildFormUrl encodes certificate earned as "yes"', () => {
  const url = buildFormUrl({ percentage: 80, certificateEarned: true });
  assert.ok(url.includes('entry.1878979011=yes'), `Expected yes: ${url}`);
});
test('buildFormUrl encodes certificate not earned as "no"', () => {
  const url = buildFormUrl({ percentage: 80, certificateEarned: false });
  assert.ok(url.includes('entry.1878979011=no'), `Expected no: ${url}`);
});
test('buildFormUrl omits entry.1878979011 when certificateEarned is not provided', () => {
  const url = buildFormUrl({ percentage: 80 });
  assert.ok(!url.includes('entry.1878979011'), `Certificate param should be absent: ${url}`);
});
test('buildFormUrl handles 0% score', () => {
  const url = buildFormUrl({ percentage: 0 });
  assert.ok(url.includes('entry.419242921=0'), `Expected 0 score: ${url}`);
});
test('buildFormUrl handles 100% score', () => {
  const url = buildFormUrl({ percentage: 100 });
  assert.ok(url.includes('entry.419242921=100'), `Expected 100 score: ${url}`);
});
test('buildFormUrl throws RangeError for percentage below 0', () => {
  assert.throws(() => buildFormUrl({ percentage: -1 }), RangeError);
});
test('buildFormUrl throws RangeError for percentage above 100', () => {
  assert.throws(() => buildFormUrl({ percentage: 101 }), RangeError);
});
test('buildFormUrl throws RangeError for non-finite percentage', () => {
  assert.throws(() => buildFormUrl({ percentage: NaN }), RangeError);
});
test('buildFormUrl URL-encodes special characters in student name', () => {
  const url = buildFormUrl({ percentage: 80, studentName: 'O\'Brien' });
  // URLSearchParams encodes apostrophe as %27
  assert.ok(url.includes('entry.1892569905=O%27Brien') || url.includes("entry.1892569905=O'Brien"), `Special chars not encoded correctly: ${url}`);
});
test('buildFormUrl with all fields produces URL containing all four entry IDs', () => {
  const url = buildFormUrl({ percentage: 90, studentName: 'Bob', studentId: 'S99', certificateEarned: true });
  assert.ok(url.includes('entry.419242921=90'), url);
  assert.ok(url.includes('entry.1892569905=Bob'), url);
  assert.ok(url.includes('entry.1061860108=S99'), url);
  assert.ok(url.includes('entry.1878979011=yes'), url);
});
