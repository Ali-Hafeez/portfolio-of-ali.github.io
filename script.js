/* ═══════════════════════ Theme ═══════════════════════ */

(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") {
    document.documentElement.setAttribute("data-theme", saved);
  }
})();

function currentTheme() {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr) return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateThemeToggle();
}

function updateThemeToggle() {
  const isDark = currentTheme() === "dark";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", isDark ? "#14110b" : "#ece3d1");
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  btn.textContent = isDark ? "☀ LIGHT" : "☾ DARK";
  btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

function mountThemeToggle() {
  if (document.getElementById("themeToggle")) return;
  const btn = document.createElement("button");
  btn.id = "themeToggle";
  btn.className = "theme-toggle";
  btn.addEventListener("click", () => setTheme(currentTheme() === "dark" ? "light" : "dark"));
  document.body.appendChild(btn);
  updateThemeToggle();
}

document.addEventListener("DOMContentLoaded", mountThemeToggle);

/* ═══════════════════════ Data ═══════════════════════ */

const CATEGORIES = [
  { key: "photography", label: "Photography", code: "PH" },
  { key: "cars", label: "Cars", code: "CR" },
  { key: "watches", label: "Watches", code: "WT" },
  { key: "architecture", label: "Architecture", code: "AR" },
  { key: "nature", label: "Nature", code: "NT" },
  { key: "hiking", label: "Hiking", code: "HK" },
  { key: "climbing", label: "Climbing", code: "CL" },
];
const CATEGORY_LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.label]));
const CATEGORY_CODE = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.code]));
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const img = (name) => `media/photos/${name}`;

const POSTS = [
  { id: "1", category: "photography", title: "Ridge Line, Snowdonia", caption: "Broke through the cloud and the whole valley just opened up. Photos never quite get the scale right, but this one comes close.", image: img("photography-ridge-line.jpg"), date: "2026.06.20", tags: ["snowdonia", "landscape", "goldenhour"], size: "lg" },
  { id: "2", category: "cars", title: "Rear Three-Quarter", caption: "Caught it tucked into the corner of the car park, low light doing all the work. Some shapes just don't need help.", image: img("cars-ferrari-rear.jpg"), date: "2026.06.18", tags: ["ferrari", "carspotting", "carphotography"], size: "tall" },
  { id: "3", category: "watches", title: "Unboxing Day", caption: "Still can't get over how heavy the bracelet feels the first time. Some purchases you remember down to the smell of the box.", image: img("watches-unboxing.jpg"), date: "2026.06.15", tags: ["watches", "wristcheck", "horology"], size: "sm" },
  { id: "4", category: "architecture", title: "Concrete and Sky", caption: "Valencia does this thing where the buildings look like they're mid-motion. Spent an hour just walking around this one looking for angles.", image: img("architecture-concrete-sky.jpg"), date: "2026.06.14", tags: ["architecture", "valencia", "calatrava"], size: "md" },
  { id: "5", category: "nature", title: "That Colour Isn't Filtered", caption: "People assume I boosted the saturation. I didn't. The lake really is that colour, and it's somehow even better in person.", image: img("nature-turquoise-lake.jpg"), date: "2026.06.11", tags: ["lake", "nature", "wales"], size: "sm" },
  { id: "6", category: "climbing", title: "The Scramble", caption: "This is the part of the route where conversation stops and everyone just watches their feet. Worth every careful step.", image: img("climbing-the-scramble.jpg"), date: "2026.06.09", tags: ["scrambling", "climbing", "ridge"], size: "lg" },
  { id: "7", category: "architecture", title: "Looking Straight Up", caption: "Found the one spot where the ribs of the roof line up with the palm trees below. Stood there rotating my phone for way too long.", image: img("architecture-looking-up.jpg"), date: "2026.06.07", tags: ["architecture", "symmetry", "travel"], size: "wide" },
  { id: "8", category: "hiking", title: "Miles Underfoot", caption: "The path just keeps unfurling ahead of you on days like this. Legs tired, head completely clear.", image: img("hiking-miles-underfoot.jpg"), date: "2026.06.05", tags: ["hiking", "trail", "mountains"], size: "md" },
  { id: "9", category: "photography", title: "The Line Up the Mountain", caption: "Watched the little train work its way up the slope for a good ten minutes before I even lifted the camera.", image: img("photography-mountain-railway.jpg"), date: "2026.06.03", tags: ["landscape", "railway", "mountains"], size: "tall" },
  { id: "10", category: "watches", title: "Case and Bracelet", caption: "Laid it out on the desk for five minutes to get the light right before it went straight back on. No regrets about the detour.", image: img("watches-on-the-wrist.jpg"), date: "2026.05.30", tags: ["watches", "flatlay", "watchphotography"], size: "sm" },
  { id: "11", category: "hiking", title: "Early Start", caption: "Left before sunrise to beat the crowds to the summit. Cold hands, warm light, absolutely no regrets.", image: img("hiking-early-start.jpg"), date: "2026.05.28", tags: ["hiking", "sunrise", "mountains"], size: "md" },
  { id: "12", category: "architecture", title: "Old Stone", caption: "Wandered off from the main square and found this archway tucked between two buildings. No plaque, no explanation, just centuries of stone.", image: img("architecture-old-stone.jpg"), date: "2026.05.25", tags: ["architecture", "travel", "stonework"], size: "sm" },
  { id: "13", category: "cars", title: "Parked Up", caption: "Spotted this one sitting outside completely unattended, which felt almost rude. Walked around it twice before taking the shot.", image: img("cars-parked-up.jpg"), date: "2026.05.22", tags: ["porsche", "carspotting", "carphotography"], size: "lg" },
  { id: "14", category: "cars", title: "Low Light, Low Angle", caption: "Empty multi-storey, one working strip light, and this thing sitting there daring me not to shoot it from the floor.", image: img("cars-gt3-dramatic.jpg"), date: "2026.05.20", tags: ["porsche", "gt3", "carphotography"], size: "wide" },
  { id: "15", category: "climbing", title: "Last Push", caption: "That final stretch before the summit always looks shorter than it is. Told myself 'just one more rise' about four times.", image: img("climbing-last-push.jpg"), date: "2026.05.17", tags: ["summit", "climbing", "alpine"], size: "md" },
  { id: "16", category: "hiking", title: "Downhill Kind of Day", caption: "The descent always feels like its own reward after a climb like that. Tired legs, quiet mind, golden light the whole way down.", image: img("hiking-downhill.jpg"), date: "2026.05.14", tags: ["hiking", "descent", "mountains"], size: "sm" },
  { id: "17", category: "nature", title: "Field of Green", caption: "There's a particular shade of green after weeks of rain that shows up in these hills and nowhere else I've photographed.", image: img("nature-field-of-green.jpg"), date: "2026.05.11", tags: ["wales", "nature", "hillside"], size: "sm" },
  { id: "18", category: "photography", title: "Green Valleys, Blue Sky", caption: "The conditions lined up for about twenty minutes total. I spent all twenty of them right here.", image: img("photography-green-valleys.jpg"), date: "2026.05.08", tags: ["landscape", "mountains", "photography"], size: "md" },
  { id: "19", category: "photography", title: "Working Harbour", caption: "Stopped on the quay for the cranes and the boats, stayed for the water — that particular teal you only get with the light bouncing straight off the harbour floor.", image: img("photography-harbor.jpg"), date: "2026.05.06", tags: ["harbour", "coast", "travel"], size: "tall" },
  { id: "20", category: "cars", title: "Turbo Tag", caption: "The decal alone tells you everything. Found it tucked between two modern cars in the same car park, doing its own thing entirely.", image: img("cars-retro-turbo.jpg"), date: "2026.05.04", tags: ["retro", "carspotting", "jdm"], size: "md" },
  { id: "21", category: "architecture", title: "Ribs of Glass", caption: "Lay flat on a bench for this one. The whole roof turns into a diagram of triangles once the sun's behind it.", image: img("architecture-ribbed-dome.jpg"), date: "2026.05.02", tags: ["architecture", "valencia", "glass"], size: "lg" },
  { id: "22", category: "architecture", title: "Walking Up On It", caption: "Someone else wandered into the frame right as I lined up the shot. Left them in — the scale reads better with a person in it.", image: img("architecture-dome-approach.jpg"), date: "2026.04.30", tags: ["architecture", "travel", "candid"], size: "md" },
  { id: "23", category: "architecture", title: "Teal Through the Arches", caption: "Shot straight up through the palms and the steel ribs lined up so cleanly I almost didn't believe it wasn't staged.", image: img("architecture-teal-arches.jpg"), date: "2026.04.28", tags: ["architecture", "valencia", "palms"], size: "wide" },
  { id: "24", category: "photography", title: "Caught in the Reflection", caption: "Wandered past a gift shop window and this thing stopped me dead. Spent way too long trying to get my own reflection out of the shot.", image: img("photography-silver-orb.jpg"), date: "2026.04.26", tags: ["abstract", "reflection", "stilllife"], size: "sm" },
  { id: "25", category: "photography", title: "Peak, Hazy", caption: "The haze rolled in halfway up and never really left. Made the whole ridge look like it was cut out of paper.", image: img("photography-hazy-peak.jpg"), date: "2026.04.24", tags: ["landscape", "mountains", "haze"], size: "tall" },
];

/* ═══════════════════════ Timeline ═══════════════════════ */

// Posts grouped by month, newest first: [{ key: "2026.06", posts: [...] }]
function monthGroups() {
  const groups = [];
  [...POSTS].sort((x, y) => y.date.localeCompare(x.date)).forEach((p) => {
    const key = p.date.slice(0, 7);
    let g = groups[groups.length - 1];
    if (!g || g.key !== key) groups.push(g = { key, posts: [] });
    g.posts.push(p);
  });
  return groups;
}

const monthId = (key) => "m-" + key.replace(".", "-");
const monthShort = (key) => MONTHS[+key.slice(5, 7) - 1];
const monthLong = (key) => MONTHS_LONG[+key.slice(5, 7) - 1];

function timelineHTML() {
  const groups = monthGroups();
  const latest = groups[0]?.posts[0]?.date ?? "";
  let n = POSTS.length;
  return `
    <div class="tl">
      <div class="tl-rail" aria-hidden="true"><div class="tl-fill"></div></div>
      <div class="tl-now"><span class="tl-now-dot"></span>NOW &mdash; ${latest}</div>
      ${groups.map((g) => `
        <div class="tl-month">
          <button class="tl-month-head" data-month="${g.key}">
            <span class="tl-month-name">${monthShort(g.key)}</span>
            <span class="tl-month-year">${g.key.slice(0, 4)}</span>
            <span class="tl-month-count">${String(g.posts.length).padStart(2, "0")} ENTRIES</span>
          </button>
          ${g.posts.map((p) => `
            <button class="tl-entry" data-id="${p.id}">
              <span class="tl-node" aria-hidden="true"></span>
              <span class="tl-day">${p.date.slice(8)}</span>
              <span class="tl-title">${p.title}</span>
              <span class="tl-code">${String(n--).padStart(2, "0")}</span>
            </button>
          `).join("")}
        </div>
      `).join("")}
      <div class="tl-origin">&#9660; FILE OPENED &mdash; ${groups[groups.length - 1]?.posts.slice(-1)[0]?.date ?? ""}</div>
    </div>
  `;
}

function renderTimelines() {
  ["sideTimeline", "mobileTimeline"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = timelineHTML();
    el.querySelectorAll(".tl-entry").forEach((btn) => {
      btn.addEventListener("click", () => { closeMobileDrawer(); jumpToPost(btn.dataset.id); });
    });
    el.querySelectorAll(".tl-month-head").forEach((btn) => {
      btn.addEventListener("click", () => { closeMobileDrawer(); goto(monthId(btn.dataset.month)); });
    });
  });
}

function jumpToPost(id) {
  const item = document.getElementById("post-" + id);
  if (!item) return;
  item.classList.add("in");
  const y = item.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.18;
  window.scrollTo({ top: y, behavior: "smooth" });
  item.classList.remove("hit");
  void item.offsetWidth;
  item.classList.add("hit");
  pinned = id;
  activeId = undefined;
  syncTimeline();
}

let activeId = null;
let pinned = null; // a clicked entry stays active until the user scrolls by hand

// Scroll-spy: the active entry is the last card whose top has crossed 40% of the viewport.
function syncTimeline() {
  const doc = document.documentElement;
  const bar = document.getElementById("scrollProgress");
  if (bar) bar.style.transform = `scaleX(${doc.scrollTop / Math.max(1, doc.scrollHeight - doc.clientHeight)})`;

  const items = document.querySelectorAll(".feed-item");
  if (!items.length) return;
  const line = window.innerHeight * 0.4;
  let best = null, bestTop = -Infinity;
  items.forEach((it) => {
    const top = it.getBoundingClientRect().top;
    if (top < line && top >= bestTop) { bestTop = top; best = it; }
  });
  const feedBottom = document.getElementById("feed").getBoundingClientRect().bottom;
  let id = best && feedBottom > line ? best.dataset.id : (best ? "end" : null);
  if (pinned) id = pinned;
  if (id === activeId) return;
  activeId = id;

  const post = POSTS.find((p) => p.id === id);
  document.querySelectorAll(".tl").forEach((tl) => {
    tl.classList.toggle("done", id === "end");
    tl.querySelectorAll(".tl-entry").forEach((e) => e.classList.toggle("active", e.dataset.id === id));
    tl.querySelectorAll(".tl-month-head").forEach((h) => h.classList.toggle("active", post && h.dataset.month === post.date.slice(0, 7)));
    const fill = tl.querySelector(".tl-fill");
    const act = tl.querySelector(".tl-entry.active .tl-node");
    if (id === "end") fill.style.height = "100%";
    else if (act) fill.style.height = (act.getBoundingClientRect().top - tl.getBoundingClientRect().top + act.offsetHeight / 2) + "px";
    else fill.style.height = "0px";
  });

  // Keep the active entry in view inside the desktop rail without moving the page
  const scroller = document.getElementById("sideTimelineScroll");
  const act = scroller?.querySelector(".tl-entry.active");
  if (scroller && act) {
    const target = act.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - scroller.clientHeight * 0.4;
    scroller.scrollTo({ top: target, behavior: "smooth" });
  }

  const label = post ? `${monthShort(post.date.slice(0, 7))} ${post.date.slice(0, 4)} — ${post.title}` : (id === "end" ? "End of feed" : "Start here");
  const mob = document.getElementById("mobileTimelineValue");
  if (mob) mob.textContent = label;
  const pos = document.getElementById("feedPosLabel");
  if (pos) pos.textContent = post ? `▸ NOW VIEWING ${post.date}` : "▸ NEWEST FIRST";
}

function goto(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ═══════════════════════ Hero marquee ═══════════════════════ */

function renderMarquee() {
  const wrap = document.getElementById("heroMarquee");
  wrap.innerHTML = "";
  for (let rep = 0; rep < 2; rep++) {
    const repDiv = document.createElement("div");
    repDiv.className = "hero-marquee-rep";
    if (rep === 1) repDiv.setAttribute("aria-hidden", "true");
    CATEGORIES.forEach((c) => {
      const span = document.createElement("span");
      span.className = "hero-marquee-item";
      span.innerHTML = `${c.label} <span class="diamond">&#9670;</span>`;
      repDiv.appendChild(span);
    });
    wrap.appendChild(repDiv);
  }

  const tape = document.getElementById("heroTape");
  if (!tape) return;
  const words = ["Unfiltered", "No presets", "Shot raw", "Filed live", "Zero algorithm", "All of it"];
  const rep = words.map((w) => `<span>${w}</span><span class="tape-x">&#10006;</span>`).join("");
  tape.innerHTML = `<div class="hero-tape-rep">${rep}</div><div class="hero-tape-rep" aria-hidden="true">${rep}</div>`;
}

/* ═══════════════════════ Post card ═══════════════════════ */

function postCardHTML(post) {
  return `
    <article class="post-card size-${post.size}" data-id="${post.id}">
      <div class="post-meta">
        <span><span class="neon">[${CATEGORY_CODE[post.category]}]</span> <span class="post-cat-label">${CATEGORY_LABEL[post.category]}</span></span>
        <span class="post-meta-date">${post.date}</span>
      </div>
      <div class="post-img-wrap">
        <img src="${post.image}" alt="${post.title}" loading="lazy" />
        <div class="post-grain"></div>
        <div class="post-open-tag">OPEN &#8599;</div>
      </div>
      <div class="post-body">
        <h3 class="post-title">${post.title}</h3>
        <p class="post-caption">${post.caption}</p>
      </div>
    </article>
  `;
}

// Masonry columns filled round-robin, so cards read in date order left to right
const COLUMN_QUERIES = [matchMedia("(max-width: 640px)"), matchMedia("(max-width: 1180px)")];
const columnCount = () => (COLUMN_QUERIES[0].matches ? 1 : COLUMN_QUERIES[1].matches ? 2 : 3);

function columnsHTML(posts) {
  const cols = Array.from({ length: columnCount() }, () => []);
  posts.forEach((p, i) => cols[i % cols.length].push(p));
  return cols.map((c) => `
    <div class="feed-col">
      ${c.map((p) => `<div class="feed-item" id="post-${p.id}" data-id="${p.id}">${postCardHTML(p)}</div>`).join("")}
    </div>
  `).join("");
}

function renderFeed() {
  const groups = monthGroups();
  document.getElementById("feedGrid").innerHTML = groups.map((g) => `
    <section class="feed-month" id="${monthId(g.key)}">
      <header class="feed-month-head">
        <h3 class="feed-month-name">${monthLong(g.key)} <span class="outline">'${g.key.slice(2, 4)}</span></h3>
        <span class="feed-month-stamp">${String(g.posts.length).padStart(2, "0")} ENTRIES</span>
      </header>
      <div class="feed-flow">${columnsHTML(g.posts)}</div>
    </section>
  `).join("");

  document.querySelectorAll("#feedGrid .post-card").forEach((card) => {
    card.addEventListener("click", () => openLightbox(card.dataset.id));
  });

  document.getElementById("feedCount").textContent = `${POSTS.length} ENTRIES / NO FILTER`;
  const start = document.getElementById("feedStart");
  if (start) start.textContent = groups[groups.length - 1]?.posts.slice(-1)[0]?.date ?? "";

  // Cards slam in as they enter the viewport
  document.documentElement.classList.add("anim");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".feed-item").forEach((it) => io.observe(it));
}

function renderCarousel() {
  const strip = POSTS.filter((p) => ["photography", "climbing", "nature"].includes(p.category));
  const car = document.getElementById("feedCarousel");
  car.innerHTML = strip.map((p) => `
    <button class="hcar-item" data-id="${p.id}">
      <div class="hcar-img-wrap">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
        <div class="hcar-caption">
          <div class="hcar-date">${p.date}</div>
          <div class="hcar-title">${p.title}</div>
        </div>
      </div>
    </button>
  `).join("");
  car.querySelectorAll(".hcar-item").forEach((btn) => {
    btn.addEventListener("click", () => openLightbox(btn.dataset.id));
  });
}

/* ═══════════════════════ Lightbox ═══════════════════════ */

function openLightbox(id) {
  const post = POSTS.find((p) => p.id === id);
  if (!post) return;

  document.getElementById("lbImage").src = post.image;
  document.getElementById("lbImage").alt = post.title;
  document.getElementById("lbCode").textContent = `[${CATEGORY_CODE[post.category]}]`;
  document.getElementById("lbCategory").textContent = CATEGORY_LABEL[post.category].toUpperCase();
  document.getElementById("lbDate").textContent = post.date;
  document.getElementById("lbTitle").textContent = post.title;
  document.getElementById("lbCaption").textContent = post.caption;
  document.getElementById("lbTags").innerHTML = post.tags.map((t) => `<span>#${t}</span>`).join("");

  document.getElementById("lightbox").hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

/* ═══════════════════════ Mobile drawer ═══════════════════════ */

function openMobileDrawer() { document.getElementById("mobileNav")?.classList.add("open"); }
function closeMobileDrawer() { document.getElementById("mobileNav")?.classList.remove("open"); }

/* ═══════════════════════ Blog index ═══════════════════════ */

function renderBlogList(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof BLOG_POSTS === "undefined") return;
  container.innerHTML = BLOG_POSTS.map((p) => `
    <a class="post-index-item" href="posts/${p.slug}.html">
      <div class="post-index-meta">
        <span>${formatBlogDate(p.date)}</span>
        <span>&middot;</span>
        <span>${p.readTime} read</span>
      </div>
      <h3 class="post-index-title">${p.title}</h3>
      <p class="post-index-excerpt">${p.excerpt}</p>
      <div class="post-index-tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
    </a>
  `).join("");
}

function formatBlogDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/* ═══════════════════════ Init ═══════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (document.getElementById("heroMarquee")) renderMarquee();
  if (document.getElementById("sideTimeline")) renderTimelines();
  if (document.getElementById("feedCarousel")) renderCarousel();
  if (document.getElementById("feedGrid")) {
    renderFeed();
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; syncTimeline(); });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { activeId = undefined; onScroll(); });
    COLUMN_QUERIES.forEach((q) => q.addEventListener("change", () => { renderFeed(); activeId = undefined; onScroll(); }));
    const unpin = () => { if (pinned) { pinned = null; onScroll(); } };
    ["wheel", "touchmove", "keydown"].forEach((ev) => window.addEventListener(ev, unpin, { passive: true }));
    syncTimeline();
  }
  if (document.getElementById("blogListingGrid")) renderBlogList("blogListingGrid");

  document.getElementById("mobileFilterToggle")?.addEventListener("click", () => {
    document.getElementById("mobileNav").classList.contains("open") ? closeMobileDrawer() : openMobileDrawer();
  });
  document.getElementById("mobileClose")?.addEventListener("click", closeMobileDrawer);
  document.getElementById("mobileOverlay")?.addEventListener("click", closeMobileDrawer);

  document.getElementById("lightbox")?.addEventListener("click", (e) => {
    if (e.target.id === "lightbox") closeLightbox();
  });
  document.getElementById("lbClose")?.addEventListener("click", closeLightbox);
  document.getElementById("lbPanel")?.addEventListener("click", (e) => e.stopPropagation());

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
      closeMobileDrawer();
    }
  });
});
