const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);
const nav=$('#nav'),menu=$('#menu'),theme=$('#theme');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));
$$('#nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const saved=localStorage.getItem('py-theme');
if(saved==='light')document.body.classList.add('light');
theme?.addEventListener('click',()=>{document.body.classList.toggle('light');localStorage.setItem('py-theme',document.body.classList.contains('light')?'light':'dark')});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));
$('#year').textContent=new Date().getFullYear();
const modal=$('#modal');
$('#caseStudy')?.addEventListener('click',()=>modal.classList.add('open'));
$('#close')?.addEventListener('click',()=>modal.classList.remove('open'));
modal?.querySelector('.backdrop')?.addEventListener('click',()=>modal.classList.remove('open'));
document.addEventListener('keydown',e=>{if(e.key==='Escape')modal?.classList.remove('open')});

// Scroll progress
const progress=document.getElementById('scrollProgress');
const updateProgress=()=>{if(!progress)return;const h=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(h>0?(window.scrollY/h)*100:0)+'%'};
window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();

// Lightweight pointer-based 3D tilt for desktop cards
if(window.matchMedia('(pointer:fine)').matches){
  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      if(card.closest('.modal'))return;
      const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateX(${(-y*3).toFixed(2)}deg) rotateY(${(x*4).toFixed(2)}deg) translateY(-2px)`;
    });
    card.addEventListener('pointerleave',()=>card.style.transform='');
  });
  const term=document.querySelector('.terminal');
  const wrap=document.querySelector('.terminal-wrap');
  wrap?.addEventListener('pointermove',e=>{
    const r=wrap.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    term.style.transform=`perspective(1000px) rotateX(${(-y*5).toFixed(2)}deg) rotateY(${(x*7).toFixed(2)}deg)`;
  });
  wrap?.addEventListener('pointerleave',()=>term.style.transform='');
}

// Respect reduced-motion preferences
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('reduced-motion');
