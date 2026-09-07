/* ═══════════════════════ Data ═══════════════════════ */

const CATEGORIES = [
  { key: "photography", label: "Photography", code: "PH" },
  { key: "cars", label: "Cars", code: "CR" },
  { key: "watches", label: "Watches", code: "WT" },
  { key: "computers", label: "Computers", code: "CP" },
  { key: "electronics", label: "Electronics", code: "EL" },
  { key: "architecture", label: "Architecture", code: "AR" },
  { key: "nature", label: "Nature", code: "NT" },
  { key: "cycling", label: "Cycling", code: "CY" },
  { key: "hiking", label: "Hiking", code: "HK" },
  { key: "climbing", label: "Climbing", code: "CL" },
];
const CATEGORY_LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.label]));
const CATEGORY_CODE = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.code]));
const INDEX = [{ key: "all", label: "Everything", code: "00" }, ...CATEGORIES.map((c, i) => ({
  key: c.key, label: c.label, code: String(i + 1).padStart(2, "0"),
}))];

const img = (id) => `https://images.unsplash.com/photo-${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080`;

const POSTS = [
  { id: "1", category: "photography", title: "Golden Hour in the Alps", caption: "Waited 3 hours for this exact light. The ridge turned amber before the clouds swallowed it whole. Zero regrets.", image: img("1604223190546-a43e4c7f29d7"), date: "2026.06.20", likes: 847, views: 4203, comments: 42, tags: ["landscape", "goldenhour", "alps"], size: "lg" },
  { id: "2", category: "cars", title: "Midnight Run", caption: "Nothing hits like an empty road at 2am. Just the engine, the asphalt, and the playlist you built for exactly this moment.", image: img("1485291571150-772bcfc10da5"), date: "2026.06.18", likes: 1243, views: 5832, comments: 67, tags: ["midnight", "sedan", "drive"], size: "tall" },
  { id: "3", category: "watches", title: "The Chronograph Obsession", caption: "Every dial tells a story. This one's a 1969 movement trapped in modern steel — and I'm absolutely fine with that.", image: img("1600003014637-ff82a275e191"), date: "2026.06.15", likes: 634, views: 2901, comments: 28, tags: ["chronograph", "watchfam", "horology"], size: "sm" },
  { id: "4", category: "architecture", title: "Geometry Wins", caption: "Brutalism gets a bad rap. But stand beneath a concrete slab like this and tell me it doesn't make you feel something.", image: img("1483366774565-c783b9f70e2c"), date: "2026.06.14", likes: 512, views: 2403, comments: 19, tags: ["brutalism", "concrete", "urban"], size: "md" },
  { id: "5", category: "nature", title: "Above the Canopy", caption: "From up here the world goes quiet. Just wind through the treetops and that particular green that only forests have.", image: img("1542273917363-3b1817f69a2d"), date: "2026.06.11", likes: 731, views: 3104, comments: 33, tags: ["nature", "forest", "aerial"], size: "sm" },
  { id: "6", category: "climbing", title: "On Top of Everything", caption: "Summit reached at 6am. My lungs were screaming. The view made it embarrassingly worth it.", image: img("1604766038176-736d6d72d652"), date: "2026.06.09", likes: 1108, views: 6201, comments: 89, tags: ["summit", "climbing", "alpine"], size: "lg" },
  { id: "7", category: "computers", title: "The Setup, Revisited", caption: "Rebuilt the desk again. Yes, I do this every 6 months. No, I have no regrets. The cable management is chef's kiss.", image: img("1587831990711-23ca6441447b"), date: "2026.06.07", likes: 892, views: 4511, comments: 54, tags: ["desksetup", "battlestation", "pcbuild"], size: "wide" },
  { id: "8", category: "cycling", title: "Through the Valley", caption: "80km through mountain roads. My legs disagree with the plan. My heart is already planning the next ride.", image: img("1695238070098-83d6775247a7"), date: "2026.06.05", likes: 678, views: 3241, comments: 31, tags: ["cycling", "endurance", "mountains"], size: "md" },
  { id: "9", category: "photography", title: "Storm on the Horizon", caption: "You see the clouds coming from miles away. You have exactly 8 minutes to get the shot before it hits.", image: img("1489493512598-d08130f49bea"), date: "2026.06.03", likes: 504, views: 2088, comments: 17, tags: ["storm", "landscape", "dramatic"], size: "tall" },
  { id: "10", category: "watches", title: "Field Watch on Rock", caption: "Took the field watch where it belongs — out in the field. Or specifically, on a boulder 2400m up.", image: img("1670177257750-9b47927f68eb"), date: "2026.05.30", likes: 445, views: 1823, comments: 12, tags: ["fieldwatch", "outdoors", "watchphotography"], size: "sm" },
  { id: "11", category: "hiking", title: "Early Starts", caption: "Nobody tells you about the 4am alarm. Or the cold. But also nobody can explain that feeling when the sun breaks the ridge.", image: img("1551632811-561732d1e306"), date: "2026.05.28", likes: 769, views: 3402, comments: 44, tags: ["hiking", "earlymorning", "mountains"], size: "md" },
  { id: "12", category: "architecture", title: "White Lines", caption: "Minimalism done right. No ornamentation, no fuss — just the play of light against a clean surface all day long.", image: img("1549791084-5f78368b208b"), date: "2026.05.25", likes: 398, views: 1744, comments: 15, tags: ["minimalism", "architecture", "white"], size: "sm" },
  { id: "13", category: "cars", title: "Parked, Not Forgotten", caption: "There's an art to a car just sitting in the right light. This one knew what it was doing.", image: img("1567808291548-fc3ee04dbcf0"), date: "2026.05.22", likes: 921, views: 4788, comments: 58, tags: ["carphoto", "black", "elegant"], size: "lg" },
  { id: "14", category: "electronics", title: "The Gadget Corner", caption: "Headphones, laptops, keyboards — the supporting cast that makes everything else possible. I care about all of them equally.", image: img("1498049794561-7780e7231661"), date: "2026.05.20", likes: 543, views: 2312, comments: 26, tags: ["gadgets", "tech", "edc"], size: "wide" },
  { id: "15", category: "climbing", title: "Jagged Peaks", caption: "Some mountains are beautiful from a distance. Others pull you toward them. These are the second kind.", image: img("1759485182761-86185c772a94"), date: "2026.05.17", likes: 832, views: 4001, comments: 37, tags: ["peaks", "alpine", "mountaineering"], size: "md" },
  { id: "16", category: "hiking", title: "Downhill Kind of Day", caption: "After 6 hours of uphill, the descent is its own kind of meditation. Tired legs, clear mind.", image: img("1501554728187-ce583db33af7"), date: "2026.05.14", likes: 612, views: 2874, comments: 21, tags: ["hiking", "trail", "solo"], size: "sm" },
  { id: "17", category: "nature", title: "Field of Green", caption: "There's a particular shade of green after spring rain that I keep trying to photograph and keep failing to capture.", image: img("1595104615356-cbe9c4364513"), date: "2026.05.11", likes: 487, views: 2103, comments: 18, tags: ["spring", "greenery", "nature"], size: "sm" },
  { id: "18", category: "photography", title: "Green Valleys, Blue Sky", caption: "The conditions aligned. The mountains cooperated. I pressed the shutter and held my breath.", image: img("1612441804231-77a36b284856"), date: "2026.05.08", likes: 703, views: 3128, comments: 39, tags: ["landscape", "mountains", "photography"], size: "md" },
];

const formatNum = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`);

/* ═══════════════════════ State ═══════════════════════ */

let filter = "all";
const liked = new Set();

/* ═══════════════════════ Nav rendering ═══════════════════════ */

function renderFilterLists() {
  const sideList = document.getElementById("sideFilterList");
  const mobileList = document.getElementById("mobileFilterList");
  sideList.innerHTML = "";
  mobileList.innerHTML = "";

  INDEX.forEach((item) => {
    const sideBtn = document.createElement("button");
    sideBtn.className = "side-link" + (filter === item.key ? " active" : "");
    sideBtn.innerHTML = `<span class="side-link-code">${item.code}</span><span class="side-link-label">${item.label}</span>`;
    sideBtn.onclick = () => setFilter(item.key);
    sideList.appendChild(sideBtn);

    const mobBtn = document.createElement("button");
    mobBtn.className = "mobile-link" + (filter === item.key ? " active" : "");
    mobBtn.innerHTML = `<span class="mobile-link-code">${item.code}</span><span class="mobile-link-label">${item.label}</span>`;
    mobBtn.onclick = () => { setFilter(item.key); closeMobileDrawer(); };
    mobileList.appendChild(mobBtn);
  });

  document.getElementById("mobileFilterValue").textContent =
    INDEX.find((i) => i.key === filter)?.label ?? "Everything";
}

function setFilter(key) {
  filter = key;
  renderFilterLists();
  renderFeed();
  goto("feed");
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
}

/* ═══════════════════════ Post card ═══════════════════════ */

function postCardHTML(post) {
  const isLiked = liked.has(post.id);
  const likeCount = formatNum(post.likes + (isLiked ? 1 : 0));
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
        <div class="post-stats">
          <button class="post-like${isLiked ? " liked" : ""}" data-like="${post.id}">&#9825; ${likeCount}</button>
          <span class="post-comments">&#128172; ${post.comments}</span>
          <span class="post-views">&#128065; ${formatNum(post.views)}</span>
        </div>
      </div>
    </article>
  `;
}

function renderFeed() {
  const posts = filter === "all" ? POSTS : POSTS.filter((p) => p.category === filter);
  const grid = document.getElementById("feedGrid");
  const empty = document.getElementById("feedEmpty");

  grid.innerHTML = posts.map((p) => `<div class="feed-item">${postCardHTML(p)}</div>`).join("");
  empty.hidden = posts.length !== 0;

  grid.querySelectorAll(".post-card").forEach((card) => {
    card.addEventListener("click", () => openLightbox(card.dataset.id));
  });
  grid.querySelectorAll("[data-like]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.like;
      if (liked.has(id)) liked.delete(id); else liked.add(id);
      renderFeed();
    });
  });

  document.getElementById("feedFilterLabel").textContent =
    "▸ " + (filter === "all" ? "ALL CATEGORIES" : CATEGORY_LABEL[filter].toUpperCase());
  document.getElementById("feedCount").textContent = `${posts.length} / ${POSTS.length} ENTRIES`;

  const carWrap = document.getElementById("feedCarouselWrap");
  carWrap.classList.toggle("hidden", filter !== "all");
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
  document.getElementById("lbLikes").textContent = formatNum(post.likes + (liked.has(post.id) ? 1 : 0));
  document.getElementById("lbComments").textContent = post.comments;
  document.getElementById("lbViews").textContent = formatNum(post.views);

  document.getElementById("lightbox").hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").hidden = true;
  document.body.style.overflow = "";
}

/* ═══════════════════════ Mobile drawer ═══════════════════════ */

function openMobileDrawer() { document.getElementById("mobileNav").classList.add("open"); }
function closeMobileDrawer() { document.getElementById("mobileNav").classList.remove("open"); }

/* ═══════════════════════ Init ═══════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  renderMarquee();
  renderFilterLists();
  renderCarousel();
  renderFeed();

  document.getElementById("mobileFilterToggle").addEventListener("click", () => {
    document.getElementById("mobileNav").classList.contains("open") ? closeMobileDrawer() : openMobileDrawer();
  });
  document.getElementById("mobileClose").addEventListener("click", closeMobileDrawer);
  document.getElementById("mobileOverlay").addEventListener("click", closeMobileDrawer);

  document.getElementById("lightbox").addEventListener("click", (e) => {
    if (e.target.id === "lightbox") closeLightbox();
  });
  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lbPanel").addEventListener("click", (e) => e.stopPropagation());

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
      closeMobileDrawer();
    }
  });
});
