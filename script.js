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
   CURSOR
   ========================================== */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mx = 0, my = 0, cx = 0, cy = 0;

if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top = my + 'px';
  });

  function animateCursor() {
    cx += (mx - cx) * 0.1;
    cy += (my - cy) * 0.1;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    cursor.style.transform = `translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

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
   TERMINAL WIDGET
   ========================================== */
(function initTerminal() {
  const el = document.getElementById('terminalBody');
  if (!el) return;

  const SEQ = [
    { k: 'cmd', t: 'whoami' },
    { k: 'out', t: 'ali-hafeez  ·  cloud &amp; devops engineer  ·  london' },
    { k: 'gap' },
    { k: 'cmd', t: 'cat status' },
    { k: 'out', t: '&#x2713;  available for full-time  ·  sc eligible' },
    { k: 'gap' },
    { k: 'cmd', t: 'git log --oneline -4' },
    { k: 'out', t: '<span class="t-sha">a3f9e2c</span>  chaos engineering platform  (dissertation)' },
    { k: 'out', t: '<span class="t-sha">7b2d891</span>  cloud infrastructure  @  hmrc' },
    { k: 'out', t: '<span class="t-sha">4c1a830</span>  full-stack mvp  @  clickpitch' },
    { k: 'out', t: '<span class="t-sha">2e91fba</span>  network cabling &amp; cctv diagnostics' },
    { k: 'cursor' },
  ];

  let html = '';

  function d(ms) { return new Promise(r => setTimeout(r, ms)); }

  function render() { el.innerHTML = html + '<span class="t-caret"></span>'; }

  async function run() {
    html = '';
    for (const step of SEQ) {
      if (step.k === 'gap') {
        html += '\n';
        await d(180);
      } else if (step.k === 'out') {
        html += '<span class="t-out">' + step.t + '</span>\n';
        render();
        await d(70);
      } else if (step.k === 'cursor') {
        render();
      } else if (step.k === 'cmd') {
        const prefix = '<span class="t-prompt">$ </span>';
        let typed = '';
        for (const ch of step.t) {
          typed += (ch === ' ' ? '&nbsp;' : ch);
          el.innerHTML = html + prefix + typed + '<span class="t-caret"></span>';
          await d(42 + Math.random() * 28);
        }
        html += prefix + step.t + '\n';
        render();
        await d(320);
      }
    }
    await d(4800);
    run();
  }

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { obs.disconnect(); run(); }
  }, { threshold: 0.2 });
  obs.observe(el);
})();

/* ==========================================
   BLOG GRID RENDERING
   ========================================== */
function renderBlogGrid(containerId, limit) {
  const container = document.getElementById(containerId);
  if (!container || typeof BLOG_POSTS === 'undefined') return;

  const posts = (limit && limit > 0) ? BLOG_POSTS.slice(0, limit) : BLOG_POSTS;
  const isListing = !limit;

  container.innerHTML = posts.map(post => {
    const date = new Date(post.date).toLocaleDateString('en-GB', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
    const tagsHtml = post.tags.map(t => `<span class="tag">${t}</span>`).join('');
    const href = isListing ? `posts/${post.slug}.html` : `posts/${post.slug}.html`;

    if (isListing) {
      return `
        <a href="${href}" class="blog-listing-card glass-card reveal">
          <div class="blog-listing-meta">
            <span class="blog-listing-date">${date}</span>
            <span class="blog-listing-sep">·</span>
            <span class="blog-listing-time">${post.readTime} read</span>
          </div>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <div class="blog-listing-tags">${tagsHtml}</div>
        </a>`;
    }

    return `
      <a href="${href}" class="blog-card glass-card reveal">
        <div class="blog-card-meta">
          <span class="blog-card-date">${date}</span>
          <span class="blog-read-time">${post.readTime} read</span>
        </div>
        <h3>${post.title}</h3>
        <p class="blog-card-excerpt">${post.excerpt}</p>
        <div class="blog-card-tags">${tagsHtml}</div>
      </a>`;
  }).join('');

  container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  renderBlogGrid('blogGrid', 3);
});

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
