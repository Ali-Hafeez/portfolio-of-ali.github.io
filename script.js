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

/* ── Feed posts data ── */
const POSTS = [
  { id:1, cat:'photography', catLabel:'Photography', icon:'📸', color:'#e879f9', title:'Golden Hour in the Alps', caption:'Waited 3 hours for this exact light. The ridge turned amber before the clouds swallowed it whole. Zero regrets.', img:'https://images.unsplash.com/photo-1604223190546-a43e4c7f29d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', date:'Jun 20, 2026', likes:847, views:4203, comments:42, tags:['landscape','goldenhour','alps'], size:'lg' },
  { id:2, cat:'cars', catLabel:'Cars', icon:'🚗', color:'#60a5fa', title:'Midnight Run', caption:'Nothing hits like an empty road at 2am. Just the engine, the asphalt, and the playlist you built for exactly this moment.', img:'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', date:'Jun 18, 2026', likes:1243, views:5832, comments:67, tags:['midnight','sedan','drive'], size:'md' },
  { id:3, cat:'watches', catLabel:'Watches', icon:'⌚', color:'#f0a53d', title:'The Chronograph Obsession', caption:"Every dial tells a story. This one's a 1969 movement trapped in modern steel — and I'm absolutely fine with that.", img:'https://images.unsplash.com/photo-1600003014637-ff82a275e191?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', date:'Jun 15, 2026', likes:634, views:2901, comments:28, tags:['chronograph','watchfam','horology'], size:'sm' },
  { id:4, cat:'architecture', catLabel:'Architecture', icon:'🏛', color:'#fb923c', title:'Geometry Wins', caption:"Brutalism gets a bad rap. But stand beneath a concrete slab like this and tell me it doesn't make you feel something.", img:'https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', date:'Jun 14, 2026', likes:512, views:2403, comments:19, tags:['brutalism','concrete','urban'], size:'md' },
  { id:5, cat:'nature', catLabel:'Nature', icon:'🌿', color:'#4ade80', title:'Above the Canopy', caption:'From up here the world goes quiet. Just wind through the treetops and that particular green that only forests have.', img:'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', date:'Jun 11, 2026', likes:731, views:3104, comments:33, tags:['nature','forest','aerial'], size:'sm' },
  { id:6, cat:'climbing', catLabel:'Climbing', icon:'⛰', color:'#f87171', title:'On Top of Everything', caption:'Summit reached at 6am. My lungs were screaming. The view made it embarrassingly worth it.', img:'https://images.unsplash.com/photo-1604766038176-736d6d72d652?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', date:'Jun 9, 2026', likes:1108, views:6201, comments:89, tags:['summit','climbing','alpine'], size:'lg' },
  { id:7, cat:'computers', catLabel:'Computers', icon:'💻', color:'#34d399', title:'The Setup, Revisited', caption:'Rebuilt the desk again. Yes, I do this every 6 months. No, I have no regrets. The cable management is chef\'s kiss.', img:'https://images.unsplash.com/photo-1587831990711-23ca6441447b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', date:'Jun 7, 2026', likes:892, views:4511, comments:54, tags:['desksetup','battlestation','pcbuild'], size:'wide' },
  { id:8, cat:'cycling', catLabel:'Cycling', icon:'🚴', color:'#38bdf8', title:'Through the Valley', caption:'80km through mountain roads. My legs disagree with the plan. My heart is already planning the next ride.', img:'https://images.unsplash.com/photo-1695238070098-83d6775247a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', date:'Jun 5, 2026', likes:678, views:3241, comments:31, tags:['cycling','endurance','mountains'], size:'md' },
  { id:9, cat:'photography', catLabel:'Photography', icon:'📸', color:'#e879f9', title:'Storm on the Horizon', caption:'You see the clouds coming from miles away. You have exactly 8 minutes to get the shot before it hits.', img:'https://images.unsplash.com/photo-1489493512598-d08130f49bea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', date:'Jun 3, 2026', likes:504, views:2088, comments:17, tags:['storm','landscape','dramatic'], size:'sm' },
  { id:10, cat:'watches', catLabel:'Watches', icon:'⌚', color:'#f0a53d', title:'Field Watch on Rock', caption:'Took the field watch where it belongs — out in the field. Or specifically, on a boulder 2400m up.', img:'https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', date:'May 30, 2026', likes:445, views:1823, comments:12, tags:['fieldwatch','outdoors','watchphotography'], size:'sm' },
  { id:11, cat:'hiking', catLabel:'Hiking', icon:'🥾', color:'#fbbf24', title:'Early Starts', caption:"Nobody tells you about the 4am alarm. Or the cold. But also nobody can explain that feeling when the sun breaks the ridge.", img:'https://images.unsplash.com/photo-1551632811-561732d1e306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', date:'May 28, 2026', likes:769, views:3402, comments:44, tags:['hiking','earlymorning','mountains'], size:'md' },
  { id:12, cat:'architecture', catLabel:'Architecture', icon:'🏛', color:'#fb923c', title:'White Lines', caption:'Minimalism done right. No ornamentation, no fuss — just the play of light against a clean surface all day long.', img:'https://images.unsplash.com/photo-1549791084-5f78368b208b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', date:'May 25, 2026', likes:398, views:1744, comments:15, tags:['minimalism','architecture','white'], size:'sm' },
  { id:13, cat:'cars', catLabel:'Cars', icon:'🚗', color:'#60a5fa', title:'Parked, Not Forgotten', caption:"There's an art to a car just sitting in the right light. This one knew what it was doing.", img:'https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', date:'May 22, 2026', likes:921, views:4788, comments:58, tags:['carphoto','black','elegant'], size:'lg' },
  { id:14, cat:'electronics', catLabel:'Electronics', icon:'⚡', color:'#a78bfa', title:'The Gadget Corner', caption:'Headphones, laptops, keyboards — the supporting cast that makes everything else possible. I care about all of them equally.', img:'https://images.unsplash.com/photo-1498049794561-7780e7231661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', date:'May 20, 2026', likes:543, views:2312, comments:26, tags:['gadgets','tech','edc'], size:'wide' },
  { id:15, cat:'climbing', catLabel:'Climbing', icon:'⛰', color:'#f87171', title:'Jagged Peaks', caption:'Some mountains are beautiful from a distance. Others pull you toward them. These are the second kind.', img:'https://images.unsplash.com/photo-1759485182761-86185c772a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', date:'May 17, 2026', likes:832, views:4001, comments:37, tags:['peaks','alpine','mountaineering'], size:'md' },
  { id:16, cat:'hiking', catLabel:'Hiking', icon:'🥾', color:'#fbbf24', title:'Downhill Kind of Day', caption:'After 6 hours of uphill, the descent is its own kind of meditation. Tired legs, clear mind.', img:'https://images.unsplash.com/photo-1501554728187-ce583db33af7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', date:'May 14, 2026', likes:612, views:2874, comments:21, tags:['hiking','trail','solo'], size:'sm' },
  { id:17, cat:'nature', catLabel:'Nature', icon:'🌿', color:'#4ade80', title:'Field of Green', caption:"There's a particular shade of green after spring rain that I keep trying to photograph and keep failing to capture.", img:'https://images.unsplash.com/photo-1595104615356-cbe9c4364513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', date:'May 11, 2026', likes:487, views:2103, comments:18, tags:['spring','greenery','nature'], size:'sm' },
  { id:18, cat:'photography', catLabel:'Photography', icon:'📸', color:'#e879f9', title:'Green Valleys, Blue Sky', caption:'The conditions aligned. The mountains cooperated. I pressed the shutter and held my breath.', img:'https://images.unsplash.com/photo-1612441804231-77a36b284856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', date:'May 8, 2026', likes:703, views:3128, comments:39, tags:['landscape','mountains','photography'], size:'md' },
];

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
          <span>${post.icon}</span>${post.catLabel}
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
  grid.innerHTML = posts.map(p => {
    const spanClass = p.size === 'wide' ? 'span-3' : p.size === 'lg' ? 'span-2' : '';
    return `<div class="card-wrap ${spanClass}">${cardHTML(p)}</div>`;
  }).join('');
}

renderFeed(POSTS);

/* ── Filters ── */
let activeFilter = 'all';
const filtersEl = document.getElementById('filters');

filtersEl.addEventListener('click', e => {
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
  const allBtn = filtersEl.querySelector('[data-f="all"]');
  if (allBtn) {
    allBtn.style.color = '#f0a53d';
    allBtn.style.background = 'rgba(240,165,61,.15)';
    allBtn.style.borderColor = 'rgba(240,165,61,.4)';
  }
})();

/* ── Scroll reveal ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); } });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
