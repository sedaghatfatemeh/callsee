const menuBtn=document.querySelector('.menu-btn');
const mobileNav=document.querySelector('.mobile-nav');
menuBtn?.addEventListener('click',()=>{const open=mobileNav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open);mobileNav.setAttribute('aria-hidden',!open)});
mobileNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileNav.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false')}));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const tabs=document.querySelectorAll('.tab');
const shots=document.querySelectorAll('.shot');
tabs.forEach(tab=>tab.addEventListener('click',()=>{tabs.forEach(t=>t.classList.remove('active'));tab.classList.add('active');const f=tab.dataset.filter;shots.forEach(s=>s.hidden=!(f==='all'||s.dataset.cat===f))}));

const lightbox=document.getElementById('lightbox');
const lightboxImg=document.getElementById('lightboxImg');
const lightboxTitle=document.getElementById('lightboxTitle');
shots.forEach(s=>s.addEventListener('click',()=>{lightboxImg.src=s.dataset.img;lightboxImg.alt=s.dataset.title||'Callsee';lightboxTitle.textContent=s.dataset.title||'';lightbox.showModal()}));
document.querySelector('.lightbox-close')?.addEventListener('click',()=>lightbox.close());
lightbox?.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()});

const search=document.getElementById('docSearch');
const docItems=[...document.querySelectorAll('.doc-item')];
const empty=document.getElementById('emptyState');
search?.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();let n=0;docItems.forEach(item=>{const ok=!q||(item.dataset.search||'').toLowerCase().includes(q)||item.innerText.toLowerCase().includes(q);item.hidden=!ok;if(ok)n++});empty.classList.toggle('show',n===0)});

document.getElementById('year').textContent=new Date().getFullYear();
