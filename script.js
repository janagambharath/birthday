// ─── PARTICLES ───────────────────────────────────────────────
(function(){
  const c = document.getElementById('particles');
  const ctx = c.getContext('2d');
  let W, H, stars = [];
  function resize(){ W=c.width=window.innerWidth; H=c.height=window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  function Star(){
    this.x = Math.random()*W;
    this.y = Math.random()*H;
    this.r = Math.random()*1.4+0.3;
    this.speed = Math.random()*0.2+0.05;
    this.brightness = Math.random();
    this.dir = Math.random()*Math.PI*2;
  }
  Star.prototype.draw = function(){
    const alpha = 0.3+0.6*Math.abs(Math.sin(Date.now()*0.001+this.brightness*10));
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    ctx.fillStyle = `rgba(255,220,255,${alpha})`;
    ctx.fill();
    this.x += Math.cos(this.dir)*this.speed;
    this.y += Math.sin(this.dir)*this.speed;
    if(this.x<0||this.x>W||this.y<0||this.y>H){
      this.x=Math.random()*W; this.y=Math.random()*H;
    }
  };
  for(let i=0;i<140;i++) stars.push(new Star());
  function loop(){
    ctx.clearRect(0,0,W,H);
    stars.forEach(s=>s.draw());
    requestAnimationFrame(loop);
  }
  loop();
})();

// ─── CURSOR ───────────────────────────────────────────────
const cur = document.getElementById('cursor');
document.addEventListener('mousemove', e=>{
  cur.style.left = e.clientX+'px';
  cur.style.top = e.clientY+'px';
});

// ─── LOCK SCREEN ───────────────────────────────────────────
const lockScreen = document.getElementById('lockScreen');
const pwInput = document.getElementById('pwInput');
const unlockBtn = document.getElementById('unlockBtn');
const lockError = document.getElementById('lockError');
const mainSite = document.getElementById('mainSite');
const PASS = 'Mahitha';

function tryUnlock(){
  if(pwInput.value === PASS){
    lockScreen.classList.add('exit');
    setTimeout(()=>{ lockScreen.style.display='none'; }, 800);
    mainSite.classList.add('visible');
    startSite();
  } else {
    lockError.classList.add('show');
    lockScreen.querySelector('.lock-card').classList.add('shake');
    setTimeout(()=>{
      lockScreen.querySelector('.lock-card').classList.remove('shake');
    }, 600);
    pwInput.value=''; pwInput.focus();
  }
}
unlockBtn.addEventListener('click', tryUnlock);
pwInput.addEventListener('keydown', e=>{ if(e.key==='Enter') tryUnlock(); });

// ─── SITE INIT ───────────────────────────────────────────────
function startSite(){
  spawnHearts();
  initTyping();
  initLetters();
  initTimer();
  initFinalTyping();
  initScrollReveal();
  initAudio();
  initSurprise();
  shootConfetti();
}

// ─── CONFETTI ────────────────────────────────────────────────
function shootConfetti(){
  const colors=['#a855f7','#ec4899','#fb7185','#f9a8d4','#c084fc','#fff','#fde68a'];
  for(let i=0;i<90;i++){
    const el = document.createElement('div');
    el.className='confetti-piece';
    el.style.cssText=`
      left:${Math.random()*100}vw;
      top:0;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      width:${6+Math.random()*6}px;
      height:${8+Math.random()*8}px;
      border-radius:${Math.random()>0.5?'50%':'2px'};
      animation-duration:${2+Math.random()*2.5}s;
      animation-delay:${Math.random()*1.2}s;
    `;
    document.body.appendChild(el);
    setTimeout(()=>el.remove(), 5000);
  }
}

// ─── FLOATING HEARTS ─────────────────────────────────────────
function spawnHearts(){
  const emojis=['❤️','💜','🌸','✨','💕','🌷','💫'];
  setInterval(()=>{
    const el = document.createElement('div');
    el.className='heart';
    el.textContent=emojis[Math.floor(Math.random()*emojis.length)];
    el.style.cssText=`
      left:${Math.random()*100}vw;
      font-size:${0.8+Math.random()*1.2}rem;
      animation-duration:${6+Math.random()*8}s;
      animation-delay:0s;
    `;
    document.body.appendChild(el);
    setTimeout(()=>el.remove(), 15000);
  }, 1600);
}

// ─── TYPING HERO ──────────────────────────────────────────────
function initTyping(){
  const phrases=[
    'You are truly magical... ✨',
    'You deserve the absolute best... 💜',
    'Today the world celebrates you... 🎂',
    'Born to shine, always... 🌸',
    'Simply irreplaceable... 💫',
  ];
  let pi=0, ci=0, deleting=false;
  const el = document.getElementById('typingText');
  function tick(){
    const phrase = phrases[pi];
    if(!deleting){
      el.textContent = phrase.slice(0,++ci);
      if(ci===phrase.length){ deleting=true; setTimeout(tick,2000); return; }
    } else {
      el.textContent = phrase.slice(0,--ci);
      if(ci===0){ deleting=false; pi=(pi+1)%phrases.length; setTimeout(tick,400); return; }
    }
    setTimeout(tick, deleting?40:75);
  }
  tick();
}

// ─── LETTER CARDS ──────────────────────────────────────────────
function initLetters(){
  const data=[
    {l:'M', msg:'Magical in every little way — you carry wonder wherever you go.'},
    {l:'A', msg:'Always bringing warmth that wraps around everyone like a soft light.'},
    {l:'H', msg:'Heart full of kindness that gives without ever counting.'},
    {l:'I', msg:'Incredible beyond words — and yet somehow you don\'t even know it.'},
    {l:'T', msg:'Truly one of a kind. No copy, no comparison. Just you.'},
    {l:'H', msg:'Happiness follows you — and radiates from you onto everyone near.'},
    {l:'A', msg:'Always amazing. Yesterday. Today. Every single day to come.'},
  ];
  const grid = document.getElementById('lettersGrid');
  data.forEach((d,i)=>{
    const card = document.createElement('div');
    card.className='letter-card';
    card.style.animationDelay = (i*0.1+0.2)+'s';
    card.innerHTML=`<div class="letter-big">${d.l}</div><div class="letter-msg">${d.msg}</div>`;
    grid.appendChild(card);
  });
}

// ─── TIMER ────────────────────────────────────────────────────
function initTimer(){
  // IST = UTC+5:30, birth at midnight IST on 30 March 2007
  // midnight IST = 2007-03-29T18:30:00Z
  const birth = new Date('2007-03-29T18:30:00Z');
  function update(){
    // Current time in IST
    const nowUTC = Date.now();
    const diff = nowUTC - birth.getTime();
    const totalSecs = Math.floor(diff/1000);
    const secs = totalSecs%60;
    const mins = Math.floor(totalSecs/60)%60;
    const hrs = Math.floor(totalSecs/3600)%24;
    const totalDays = Math.floor(totalSecs/86400);
    const years = Math.floor(totalDays/365.25);
    const days = totalDays - Math.floor(years*365.25);
    document.getElementById('tYears').textContent=String(years).padStart(2,'0');
    document.getElementById('tDays').textContent=String(days).padStart(3,'0');
    document.getElementById('tHours').textContent=String(hrs).padStart(2,'0');
    document.getElementById('tMins').textContent=String(mins).padStart(2,'0');
    document.getElementById('tSecs').textContent=String(secs).padStart(2,'0');
  }
  update(); setInterval(update,1000);
}

// ─── FINAL TYPING ─────────────────────────────────────────────
function initFinalTyping(){
  const text = `Mahitha, birthdays are just numbers — but you are so much more than a date on a calendar.\n\nYou are the kind of person people remember. Not because of grand gestures, but because of the quiet, real way you make people feel seen. Valued. Like they matter.\n\nOn this day, I want you to know that you are deeply celebrated — not just for what you do, but for who you are.\n\nHappy Birthday. May this year bring you everything you've quietly wished for. You deserve every single bit of it. ❤️`;
  
  const el = document.getElementById('finalQuote');
  let ci=0;
  
  const obs = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){
      obs.disconnect();
      function tick(){
        if(ci<=text.length){
          el.innerHTML = text.slice(0,ci).replace(/\n/g,'<br>') + '<span class="cursor-blink"></span>';
          ci++;
          setTimeout(tick, ci<20?50:18);
        }
      }
      tick();
    }
  },{threshold:0.3});
  obs.observe(el);
}

// ─── SCROLL REVEAL ────────────────────────────────────────────
function initScrollReveal(){
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  },{threshold:0.15});
  els.forEach(el=>obs.observe(el));
}

// ─── AUDIO ────────────────────────────────────────────────────
function initAudio(){
  const audio = document.getElementById('bgMusic');
  const btn = document.getElementById('audioBtn');
  let playing = false;
  audio.volume = 0.25;
  
  // gentle autoplay attempt
  audio.play().then(()=>{ playing=true; btn.textContent='🎵'; }).catch(()=>{ playing=false; });
  
  btn.addEventListener('click',()=>{
    if(playing){ audio.pause(); btn.textContent='🔇'; playing=false; }
    else { audio.play(); btn.textContent='🎵'; playing=true; }
  });
}

// ─── SURPRISE ─────────────────────────────────────────────────
function initSurprise(){
  const sBtn = document.getElementById('surpriseBtn');
  const modal = document.getElementById('surpriseModal');
  const close = document.getElementById('modalClose');
  
  setTimeout(()=>{ sBtn.classList.add('show'); }, 10000);
  sBtn.addEventListener('click',()=>modal.classList.add('show'));
  close.addEventListener('click',()=>modal.classList.remove('show'));
  modal.addEventListener('click',e=>{ if(e.target===modal) modal.classList.remove('show'); });
}
