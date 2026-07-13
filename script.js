/* ── Smooth scroll helper ── */
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* ── Navbar scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Mobile menu ── */
const burger  = document.getElementById('burger');
const drawer  = document.getElementById('drawer');
let menuOpen  = false;

function toggleMenu() {
  menuOpen = !menuOpen;
  burger.classList.toggle('open', menuOpen);
  drawer.classList.toggle('open', menuOpen);
}

/* ── Particle canvas ── */
(function initCanvas() {
  const canvas = document.getElementById('canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let frame, particles = [];

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initParticles();
  }

  function initParticles() {
    particles = Array.from({ length: 60 }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - .5) * .3,
      vy: (Math.random() - .5) * .3,
      r:  Math.random() * 1.5 + .5,
      a:  Math.random() * .5 + .1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* grid */
    ctx.strokeStyle = 'rgba(255,255,255,.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 60) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 60) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    /* connections */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(240,165,61,${.06 * (1 - dist / 120)})`;
          ctx.lineWidth = .5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    /* dots */
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240,165,61,${p.a})`;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });

    frame = requestAnimationFrame(draw);
  }

  resize();
  draw();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
})();

/* ── Category SVG icons ── */
const ICONS = {
  photography:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
  cars:         `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="8" cy="18" r="2"/><circle cx="16" cy="18" r="2"/><path d="M6 18H3V10l3-4h12l3 4v8h-4"/><path d="M10 18h4"/></svg>`,
  watches:      `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="7"/><polyline points="12 9 12 12 14 13"/><path d="M9.5 5h5M9.5 19h5"/></svg>`,
  computers:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  electronics:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  architecture: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  nature:       `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  cycling:      `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h-3l-2.5 11.5M15 6l3.5 11.5M3 9.5h11"/></svg>`,
  hiking:       `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20l5-9 4 5 3-8 5 12H3z"/></svg>`,
  climbing:     `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L4 21h16L12 2z"/><path d="M9 14l3-2.5 3 2.5"/></svg>`,
};

/* ── Feed posts data ──
   Cleared pending real photos/write-ups — add entries here as they're shot. */
const POSTS = [];

/* Category active filter colours */
const CAT_COLORS = {
  photography: '#e879f9', cars: '#60a5fa', watches: '#f0a53d',
  computers: '#34d399', electronics: '#a78bfa', architecture: '#fb923c',
  nature: '#4ade80', cycling: '#38bdf8', hiking: '#fbbf24', climbing: '#f87171',
};

function fmt(n) { return n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n); }

/* Build a post card HTML string */
function cardHTML(post) {
  const imgH = { lg:'380px', wide:'260px', md:'300px', sm:'220px' }[post.size] || '260px';
  return `
    <div class="post-card" data-id="${post.id}">
      <div class="card-img-wrap" style="height:${imgH}">
        <img class="card-img" src="${post.img}" alt="${post.title}" loading="lazy">
        <div class="card-overlay"></div>
        <div class="card-badge" style="color:${post.color};border-color:${post.color}30">
          ${ICONS[post.cat]}${post.catLabel}
        </div>
        <button class="save-btn" data-save="${post.id}" aria-label="Save">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </button>
        <span class="card-date">${post.date}</span>
      </div>
      <div class="card-body">
        <div class="card-title">${post.title}</div>
        <div class="card-caption">${post.caption}</div>
        <div class="card-tags">${post.tags.map(t => `<span>#${t}</span>`).join('')}</div>
        <div class="card-stats">
          <div class="stats-left">
            <button class="like-btn" data-like="${post.id}" data-count="${post.likes}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <span class="like-num">${fmt(post.likes)}</span>
            </button>
            <span class="comment-stat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              ${post.comments}
            </span>
          </div>
          <span class="view-count">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            ${fmt(post.views)}
          </span>
        </div>
      </div>
    </div>`;
}

/* Render the grid */
function renderFeed(posts) {
  const grid = document.getElementById('feedGrid');
  if (!grid) return;
  if (!posts.length) {
    grid.innerHTML = `
      <div class="feed-empty">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        <div class="feed-empty-title">New posts coming soon</div>
        <div class="feed-empty-sub">This feed is getting a refresh with real shots and stories — check back soon.</div>
      </div>`;
    return;
  }
  grid.innerHTML = posts.map(p => {
    const spanClass = p.size === 'wide' ? 'span-3' : p.size === 'lg' ? 'span-2' : '';
    return `<div class="card-wrap ${spanClass}">${cardHTML(p)}</div>`;
  }).join('');
}

const feedCountEl = document.getElementById('feedCount');
if (feedCountEl) feedCountEl.textContent = POSTS.length ? `${POSTS.length} posts` : 'coming soon';

renderFeed(POSTS);

/* ── Filters ── */
let activeFilter = 'all';
const filtersEl = document.getElementById('filters');

if (filtersEl) filtersEl.addEventListener('click', e => {
  const btn = e.target.closest('.filt');
  if (!btn) return;
  activeFilter = btn.dataset.f;

  /* update active styling */
  filtersEl.querySelectorAll('.filt').forEach(b => {
    b.classList.remove('active');
    b.style.color = '';
    b.style.background = '';
    b.style.borderColor = '';
  });
  btn.classList.add('active');
  const col = CAT_COLORS[activeFilter] || '#f0a53d';
  if (activeFilter !== 'all') {
    btn.style.color = col;
    btn.style.background = col + '15';
    btn.style.borderColor = col + '40';
  } else {
    btn.style.color = '#f0a53d';
    btn.style.background = 'rgba(240,165,61,.15)';
    btn.style.borderColor = 'rgba(240,165,61,.4)';
  }

  const filtered = activeFilter === 'all' ? POSTS : POSTS.filter(p => p.cat === activeFilter);
  renderFeed(filtered);
  attachCardEvents();
});

/* ── Like & Save ── */
const likedSet = new Set();
const savedSet = new Set();

function attachCardEvents() {
  /* Like buttons */
  document.querySelectorAll('.like-btn').forEach(btn => {
    const id = btn.dataset.like;
    if (likedSet.has(id)) { btn.classList.add('liked'); setLikeIcon(btn, true); }

    btn.addEventListener('click', () => {
      if (likedSet.has(id)) {
        likedSet.delete(id);
        btn.classList.remove('liked');
        setLikeIcon(btn, false);
        const numEl = btn.querySelector('.like-num');
        numEl.textContent = fmt(parseInt(btn.dataset.count));
      } else {
        likedSet.add(id);
        btn.classList.add('liked');
        setLikeIcon(btn, true);
        const numEl = btn.querySelector('.like-num');
        numEl.textContent = fmt(parseInt(btn.dataset.count) + 1);
      }
    });
  });

  /* Save buttons */
  document.querySelectorAll('.save-btn').forEach(btn => {
    const id = btn.dataset.save;
    if (savedSet.has(id)) { btn.classList.add('saved'); setSaveIcon(btn, true); }

    btn.addEventListener('click', () => {
      if (savedSet.has(id)) {
        savedSet.delete(id);
        btn.classList.remove('saved');
        setSaveIcon(btn, false);
      } else {
        savedSet.add(id);
        btn.classList.add('saved');
        setSaveIcon(btn, true);
      }
    });
  });
}

function setLikeIcon(btn, filled) {
  const svg = btn.querySelector('svg');
  svg.querySelector('path').setAttribute('fill', filled ? '#f87171' : 'none');
}

function setSaveIcon(btn, filled) {
  const svg = btn.querySelector('svg');
  svg.querySelector('path').setAttribute('fill', filled ? '#f0a53d' : 'none');
  svg.querySelector('path').setAttribute('stroke', filled ? '#f0a53d' : 'currentColor');
}

attachCardEvents();

/* Default "all" filter button colour */
(function() {
  if (!filtersEl) return;
  const allBtn = filtersEl.querySelector('[data-f="all"]');
  if (allBtn) {
    allBtn.style.color = '#f0a53d';
    allBtn.style.background = 'rgba(240,165,61,.15)';
    allBtn.style.borderColor = 'rgba(240,165,61,.4)';
  }
})();

/* ── Blog listing (blog.html) ── */
function renderBlogGrid(containerId, filterTag) {
  const el = document.getElementById(containerId);
  if (!el || typeof BLOG_POSTS === 'undefined') return;

  const posts = filterTag ? BLOG_POSTS.filter(p => p.tags.includes(filterTag)) : BLOG_POSTS;

  el.innerHTML = posts.map(p => `
    <a class="blog-card" href="posts/${p.slug}.html">
      <div class="blog-card-top">
        <div class="blog-card-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
        <span class="blog-card-date">${new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
      </div>
      <h3 class="blog-card-title">${p.title}</h3>
      <p class="blog-card-excerpt">${p.excerpt}</p>
      <div class="blog-card-foot">
        <span>${p.readTime} read</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </div>
    </a>`).join('');
}

/* ── Scroll reveal ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); } });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
