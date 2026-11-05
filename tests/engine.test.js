import test from 'node:test';
import assert from 'node:assert/strict';
import {characters,questions,matches} from '../dist/data.js';
import {allIds,narrow,chooseComputerMove,createReferee} from '../dist/engine.js';
test('exactly 48 unique characters and fully distinguishable trait vectors',()=>{
 assert.equal(characters.length,48);assert.equal(new Set(characters.map(c=>c.name)).size,48);
 assert.equal(new Set(characters.map(c=>JSON.stringify(questions.map(q=>matches(c,q))))).size,48);
});
test('every question answers correctly for every secret, and eliminates exactly nonmatches',()=>{
 for(const c of characters){const ref=createReferee(c.id,c.id);for(const q of questions){const expected=c[q.key]===q.value;assert.equal(ref.answer(0,q),expected);const ids=narrow(allIds(),q,expected);assert.ok(ids.includes(c.id));assert.deepEqual(ids,characters.filter(x=>(x[q.key]===q.value)===expected).map(x=>x.id))}}
});
test('all difficulties finish against all 48 secrets without eliminating the truth',()=>{
 for(const difficulty of ['easy','medium','hard'])for(const c of characters){const ref=createReferee(c.id,0);let candidates=allIds(),used=[],done=false;for(let turn=0;turn<70;turn++){const move=chooseComputerMove({candidates,used},difficulty,()=>.37);if(move.type==='guess'){assert.equal(move.id,c.id);done=true;break}assert.ok(!used.includes(move.question.id));used.push(move.question.id);const next=narrow(candidates,move.question,ref.answer(0,move.question));assert.ok(next.length<candidates.length);assert.ok(next.includes(c.id));candidates=next}assert.ok(done)}
});
test('strategy is independent of unseen secrets and does not mutate its inputs',()=>{
 const input={candidates:allIds(),used:[]},before=JSON.stringify(input);
 assert.deepEqual(chooseComputerMove(input,'hard'),chooseComputerMove({...input,secret:37},'hard'));
 assert.equal(JSON.stringify(input),before);assert.ok(!String(chooseComputerMove).includes('ref.'));
});
test('referee correct and incorrect final guesses; invalid selections rejected',()=>{
 const r=createReferee(4,35);assert.ok(r.guess(1,35));assert.equal(r.guess(1,4),false);assert.equal(r.own(0).name,'Hulk');assert.throws(()=>createReferee(-1,99));
});
