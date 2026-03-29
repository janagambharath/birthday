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
  audio.volume = 1.0;
  
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

  sBtn.addEventListener('click',()=>{
    blastSurprise();
    setTimeout(()=>modal.classList.add('show'), 600);
  });
  close.addEventListener('click',()=>modal.classList.remove('show'));
  modal.addEventListener('click',e=>{ if(e.target===modal) modal.classList.remove('show'); });
}

function blastSurprise(){
  screenFlash();
  massiveConfetti();
  fireworksBurst();
  heartExplosion();
  ringSurpriseBtn();
}

function screenFlash(){
  const flash = document.createElement('div');
  flash.style.cssText = `
    position:fixed;inset:0;z-index:9000;pointer-events:none;
    background:radial-gradient(ellipse at 50% 50%, rgba(236,72,153,0.55), rgba(123,47,255,0.4), transparent 70%);
    animation:flashFade 0.8s ease forwards;
  `;
  if(!document.getElementById('flashStyle')){
    const s = document.createElement('style');
    s.id='flashStyle';
    s.textContent=`
      @keyframes flashFade{0%{opacity:0}20%{opacity:1}100%{opacity:0}}
      @keyframes firework{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(var(--tx),var(--ty)) scale(0);opacity:0}}
      @keyframes bigHeart{0%{transform:translate(-50%,-50%) scale(0) rotate(-20deg);opacity:1}60%{opacity:1}100%{transform:translate(-50%,-50%) scale(3.5) rotate(10deg);opacity:0}}
      @keyframes ringPulse{0%{transform:scale(1);box-shadow:0 0 30px rgba(236,72,153,0.4)}25%{transform:scale(1.35);box-shadow:0 0 60px rgba(255,215,0,0.9),0 0 100px rgba(236,72,153,0.7)}50%{transform:scale(0.95);box-shadow:0 0 30px rgba(123,47,255,0.6)}75%{transform:scale(1.2);box-shadow:0 0 50px rgba(255,215,0,0.7)}100%{transform:scale(1);box-shadow:0 0 30px rgba(236,72,153,0.4)}}
    `;
    document.head.appendChild(s);
  }
  document.body.appendChild(flash);
  setTimeout(()=>flash.remove(), 900);
}

function massiveConfetti(){
  const colors=['#ec4899','#a855f7','#ffd700','#fb7185','#f9a8d4','#fff','#c084fc','#ff80b5','#fde68a','#7b2fff'];
  const shapes=['50%','2px','0'];
  for(let wave=0;wave<3;wave++){
    setTimeout(()=>{
      for(let i=0;i<80;i++){
        const el=document.createElement('div');
        const size=6+Math.random()*10;
        const shape=shapes[Math.floor(Math.random()*shapes.length)];
        el.style.cssText=`
          position:fixed;z-index:8000;pointer-events:none;
          left:${10+Math.random()*80}vw;top:0;
          width:${size}px;height:${size*(0.6+Math.random()*0.8)}px;
          background:${colors[Math.floor(Math.random()*colors.length)]};
          border-radius:${shape};
          animation:confettiDrop ${1.5+Math.random()*2.5}s ${Math.random()*0.6}s linear forwards;
          transform:rotate(${Math.random()*360}deg);
        `;
        document.body.appendChild(el);
        setTimeout(()=>el.remove(),5000);
      }
    }, wave*200);
  }
}

function fireworksBurst(){
  const colors=['#ffd700','#ec4899','#a855f7','#fff','#fb7185','#ff80b5'];
  const origins=[
    {x:'20vw',y:'30vh'},{x:'50vw',y:'20vh'},{x:'80vw',y:'30vh'},
    {x:'30vw',y:'55vh'},{x:'70vw',y:'50vh'},{x:'50vw',y:'40vh'},
  ];
  origins.forEach((o, oi)=>{
    setTimeout(()=>{
      for(let i=0;i<28;i++){
        const el=document.createElement('div');
        const angle=(i/28)*Math.PI*2;
        const dist=80+Math.random()*120;
        const tx=Math.cos(angle)*dist;
        const ty=Math.sin(angle)*dist;
        const color=colors[Math.floor(Math.random()*colors.length)];
        const size=3+Math.random()*5;
        el.style.cssText=`
          position:fixed;z-index:7500;pointer-events:none;
          left:${o.x};top:${o.y};
          width:${size}px;height:${size}px;
          border-radius:50%;
          background:${color};
          box-shadow:0 0 6px 2px ${color};
          --tx:${tx}px;--ty:${ty}px;
          animation:firework ${0.6+Math.random()*0.4}s ${Math.random()*0.1}s ease-out forwards;
        `;
        document.body.appendChild(el);
        setTimeout(()=>el.remove(),1200);
      }
    }, oi*180);
  });
}

function heartExplosion(){
  const emojis=['❤️','💜','💖','💗','🌸','✨','💫','🎉','🎊','💝'];
  for(let i=0;i<18;i++){
    setTimeout(()=>{
      const el=document.createElement('div');
      el.textContent=emojis[Math.floor(Math.random()*emojis.length)];
      el.style.cssText=`
        position:fixed;z-index:8500;pointer-events:none;
        left:${5+Math.random()*90}vw;
        top:${20+Math.random()*60}vh;
        font-size:${1.5+Math.random()*2.5}rem;
        animation:bigHeart ${0.8+Math.random()*0.6}s ease-out forwards;
      `;
      document.body.appendChild(el);
      setTimeout(()=>el.remove(),1600);
    }, i*60);
  }
}

function ringSurpriseBtn(){
  const btn=document.getElementById('surpriseBtn');
  btn.style.animation='ringPulse 0.6s ease-in-out 3';
  setTimeout(()=>{ btn.style.animation='pulse 2s ease-in-out infinite'; },1800);
}
