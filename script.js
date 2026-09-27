const menuBtn = document.querySelector('.menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
menuBtn?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  mobileNav.setAttribute('aria-hidden', String(!open));
});
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded','false');
}));

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const search = document.getElementById('docSearch');
const docs = [...document.querySelectorAll('.doc-item')];
const empty = document.getElementById('emptyState');
search?.addEventListener('input', e => {
  const q = e.target.value.trim().toLowerCase();
  let shown = 0;
  docs.forEach(item => {
    const match = !q || (item.dataset.search + ' ' + item.textContent).toLowerCase().includes(q);
    item.style.display = match ? 'grid' : 'none';
    if (match) shown++;
  });
  empty.style.display = shown ? 'none' : 'block';
});

const filters = [...document.querySelectorAll('.filter')];
const shots = [...document.querySelectorAll('.shot')];
filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  shots.forEach(shot => shot.classList.toggle('hidden', f !== 'all' && shot.dataset.cat !== f));
}));

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
shots.forEach(shot => shot.addEventListener('click', () => {
  lightboxImg.src = shot.dataset.img;
  lightbox.showModal();
}));
document.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });
