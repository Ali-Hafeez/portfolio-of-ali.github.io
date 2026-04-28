/* ==========================================
   THEME TOGGLE
   ========================================== */
(function () {
  const html = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (saved === 'light' || (!saved && !prefersDark)) {
    html.classList.add('light');
  }

  btn.addEventListener('click', () => {
    html.classList.toggle('light');
    localStorage.setItem('theme', html.classList.contains('light') ? 'light' : 'dark');
  });
})();

/* ==========================================
   NAV SCROLL
   ========================================== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ==========================================
   MOBILE MENU
   ========================================== */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ==========================================
   REVEAL ON SCROLL
   ========================================== */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ==========================================
   ACTIVE NAV SECTION HIGHLIGHT
   ========================================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach(s => sectionObserver.observe(s));

/* ==========================================
   TIMELINE EXPAND / COLLAPSE
   ========================================== */
document.querySelectorAll('.timeline-content').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('expanded'));
});
