(function(){
const $=id=>document.getElementById(id);
const screens={start:$('start-screen'),game:$('game-screen'),over:$('gameover-screen')};
const el={lives:$('lives'),score:$('score'),timerFill:$('timer-fill'),emoji:$('zombie-emoji'),task:$('zombie-task'),input:$('answer-input'),area:$('zombie-area'),feedback:$('feedback')};

let lives,score,timeLeft,timerMax,currentAnswer,intervalId,currentType,spawnTime;

// Sanftere Schwierigkeitskurve: mehr Stufen, langsam ansteigend
const LEVELS=[
  {min:0,   weights:[1,  0,  0,  0],  time:20},
  {min:30,  weights:[1,  0,  0,  0],  time:18},
  {min:60,  weights:[.8, .2, 0,  0],  time:16},
  {min:100, weights:[.6, .4, 0,  0],  time:15},
  {min:150, weights:[.4, .4, .2, 0],  time:14},
  {min:200, weights:[.3, .3, .4, 0],  time:13},
  {min:270, weights:[.2, .3, .3, .2], time:12},
  {min:350, weights:[.15,.25,.35,.25],time:11},
  {min:450, weights:[.1, .2, .35,.35],time:10},
  {min:600, weights:[.05,.15,.4, .4], time:9},
  {min:800, weights:[0,  .1, .4, .5], time:8}
];
const TYPES=[{emoji:'🧟',base:10},{emoji:'🧟‍♂️',base:20},{emoji:'💀',base:30},{emoji:'👑',base:50}];

function rand(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function getLevel(){for(let i=LEVELS.length-1;i>=0;i--)if(score>=LEVELS[i].min)return LEVELS[i];return LEVELS[0]}
function pickType(w){let r=Math.random(),s=0;for(let i=0;i<w.length;i++){s+=w[i];if(r<s)return i}return 0}

function genTask(type){
  if(type===0){let a=rand(1,10),b=rand(1,10),op=Math.random()<.5?'+':'-';if(op==='-'&&a<b)[a,b]=[b,a];return{text:`${a} ${op} ${b}`,ans:op==='+'?a+b:a-b}}
  if(type===1){let a=rand(10,50),b=rand(10,50),op=Math.random()<.5?'+':'-';if(op==='-'&&a<b)[a,b]=[b,a];return{text:`${a} ${op} ${b}`,ans:op==='+'?a+b:a-b}}
  if(type===2){if(Math.random()<.5){let a=rand(2,12),b=rand(2,12);return{text:`${a} × ${b}`,ans:a*b}}else{let b=rand(2,12),q=rand(2,12),a=b*q;return{text:`${a} ÷ ${b}`,ans:q}}}
  for(let t=0;t<100;t++){let a=rand(2,20),b=rand(2,20),c=rand(2,20),ops=['+','-','×'],o1=ops[rand(0,2)],o2=ops[rand(0,2)],res=calcBoss(a,o1,b,o2,c);if(Number.isInteger(res)&&res>=0)return{text:`${a} ${o1} ${b} ${o2} ${c}`,ans:res}}
  let a=rand(2,10),b=rand(2,10);return{text:`${a} + ${b}`,ans:a+b}
}
function calcBoss(a,o1,b,o2,c){if(o2==='×')return applyOp(a,o1,b*c);if(o1==='×')return applyOp(a*b,o2,c);return applyOp(applyOp(a,o1,b),o2,c)}
function applyOp(x,op,y){return op==='+'?x+y:op==='-'?x-y:x*y}

// Zeitbonus: je schneller, desto mehr Punkte (bis 2x)
function calcPoints(base){
  let elapsed=(timerMax-timeLeft);
  let speedRatio=Math.max(0,1-elapsed/timerMax); // 1.0 = sofort, 0.0 = letzte Sekunde
  let bonus=Math.round(base*speedRatio); // 0 bis base extra
  return base+bonus;
}

function showScreen(name){Object.values(screens).forEach(s=>s.classList.remove('active'));screens[name].classList.add('active')}
function updateHUD(){el.lives.textContent='❤️'.repeat(lives)+'🖤'.repeat(3-lives);el.score.textContent=score+' Punkte'}

function startGame(){lives=3;score=0;showScreen('game');updateHUD();spawnZombie()}

function spawnZombie(){
  clearInterval(intervalId);
  el.feedback.textContent='';el.feedback.className='';
  let lv=getLevel();timerMax=lv.time;timeLeft=timerMax;
  currentType=pickType(lv.weights);
  let t=genTask(currentType);
  currentAnswer=t.ans;
  el.emoji.textContent=TYPES[currentType].emoji;
  el.task.textContent=t.text+' = ?';
  el.input.value='';
  el.input.focus({preventScroll:true});
  el.area.className='';void el.area.offsetWidth;el.area.classList.add('slide-in');
  updateTimer();
  intervalId=setInterval(()=>{timeLeft-=0.1;if(timeLeft<=0){timeLeft=0;updateTimer();onTimeout();return}updateTimer()},100);
}

function updateTimer(){
  let pct=Math.max(0,timeLeft/timerMax*100);
  el.timerFill.style.width=pct+'%';
  el.timerFill.className=pct>66?'':pct>33?'yellow':'red';
}

function onTimeout(){clearInterval(intervalId);showFeedback('⏰ Zu langsam!','wrong');loseLife()}

function loseLife(){
  lives--;updateHUD();
  el.area.className='';void el.area.offsetWidth;el.area.classList.add('shake');
  if(lives<=0)setTimeout(gameOver,500);
  else setTimeout(spawnZombie,700);
}

function submit(){
  let val=el.input.value.trim();
  if(val===''||isNaN(Number(val)))return;
  clearInterval(intervalId);
  let ans=Number(val);
  if(ans===currentAnswer){
    let pts=calcPoints(TYPES[currentType].base);
    score+=pts;updateHUD();
    showFeedback('💥 Getroffen! +'+pts,'correct');
    el.area.className='';void el.area.offsetWidth;el.area.classList.add('hit');
    setTimeout(spawnZombie,400);
  }else{
    showFeedback('🩸 Verfehlt! ('+currentAnswer+')','wrong');
    loseLife();
  }
}

function showFeedback(msg,cls){el.feedback.textContent=msg;el.feedback.className=cls}

function gameOver(){
  clearInterval(intervalId);
  el.input.blur();
  showScreen('over');
  let hi=Number(localStorage.getItem('zombieHighscore')||0);
  let isNew=score>hi;
  if(isNew){hi=score;localStorage.setItem('zombieHighscore',hi)}
  $('final-score').textContent=score;
  $('final-highscore').textContent=hi;
  $('new-record').classList.toggle('hidden',!isNew);
}

function init(){
  let hi=localStorage.getItem('zombieHighscore')||0;
  $('start-highscore').textContent=hi;
  $('btn-start').onclick=startGame;
  $('btn-restart').onclick=()=>{init();startGame()};
  $('btn-submit').onclick=submit;
  el.input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();submit()}});
  document.addEventListener('dblclick',e=>e.preventDefault());
}

if(window.visualViewport){
  window.visualViewport.addEventListener('resize',()=>{document.documentElement.style.setProperty('--vh',window.visualViewport.height+'px')});
  document.documentElement.style.setProperty('--vh',window.visualViewport.height+'px');
}

init();
})();
