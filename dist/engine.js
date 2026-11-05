import {characters,questions,matches} from './data.js';
export const allIds=()=>characters.map(c=>c.id);
export const narrow=(ids,q,answer)=>ids.filter(id=>matches(characters[id],q)===answer);
// The strategy receives candidate IDs and prior question IDs only. No oracle or secret.
export function chooseComputerMove({candidates,used},difficulty='medium',rng=Math.random){
  if(candidates.length<=1)return {type:'guess',id:candidates[0]};
  const available=questions.filter(q=>!used.includes(q.id)).map(q=>({q,yes:candidates.filter(id=>matches(characters[id],q)).length})).filter(x=>x.yes>0&&x.yes<candidates.length);
  if(!available.length)return {type:'guess',id:candidates[Math.floor(rng()*candidates.length)]};
  available.sort((a,b)=>Math.abs(candidates.length/2-a.yes)-Math.abs(candidates.length/2-b.yes));
  let pool=difficulty==='easy'?available:difficulty==='medium'?available.slice(0,Math.min(4,available.length)):available.slice(0,1);
  return {type:'question',question:pool[Math.floor(rng()*pool.length)].q};
}
// Only these referee methods can compare actions to secrets.
export function createReferee(first,second){
  for(const id of [first,second])if(!Number.isInteger(id)||!characters[id])throw Error('Invalid character');
  const secrets=Object.freeze([first,second]);
  return Object.freeze({
    answer:(target,q)=>matches(characters[secrets[target]],q),
    guess:(target,id)=>id===secrets[target],
    own:player=>characters[secrets[player]],
    reveal:()=>secrets.map(id=>characters[id])
  });
}
