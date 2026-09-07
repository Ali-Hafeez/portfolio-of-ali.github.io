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
const INDEX = [{ key: "all", label: "Everything", code: "00" }, ...CATEGORIES.map((c, i) => ({
  key: c.key, label: c.label, code: String(i + 1).padStart(2, "0"),
}))];

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
  { id: "14", category: "cars", title: "A Different Kind of Classic", caption: "The newer cars get all the attention at these meets, but this air-cooled 911 had a small crowd of its own the whole afternoon.", image: img("cars-classic-911.jpg"), date: "2026.05.20", tags: ["classiccars", "porsche", "carspotting"], size: "wide" },
  { id: "15", category: "climbing", title: "Last Push", caption: "That final stretch before the summit always looks shorter than it is. Told myself 'just one more rise' about four times.", image: img("climbing-last-push.jpg"), date: "2026.05.17", tags: ["summit", "climbing", "alpine"], size: "md" },
  { id: "16", category: "hiking", title: "Downhill Kind of Day", caption: "The descent always feels like its own reward after a climb like that. Tired legs, quiet mind, golden light the whole way down.", image: img("hiking-downhill.jpg"), date: "2026.05.14", tags: ["hiking", "descent", "mountains"], size: "sm" },
  { id: "17", category: "nature", title: "Field of Green", caption: "There's a particular shade of green after weeks of rain that shows up in these hills and nowhere else I've photographed.", image: img("nature-field-of-green.jpg"), date: "2026.05.11", tags: ["wales", "nature", "hillside"], size: "sm" },
  { id: "18", category: "photography", title: "Green Valleys, Blue Sky", caption: "The conditions lined up for about twenty minutes total. I spent all twenty of them right here.", image: img("photography-green-valleys.jpg"), date: "2026.05.08", tags: ["landscape", "mountains", "photography"], size: "md" },
  { id: "19", category: "photography", title: "Working Harbour", caption: "Stopped on the quay for the cranes and the boats, stayed for the water — that particular teal you only get with the light bouncing straight off the harbour floor.", image: img("photography-harbor.jpg"), date: "2026.05.06", tags: ["harbour", "coast", "travel"], size: "tall" },
];

/* ═══════════════════════ State ═══════════════════════ */

let filter = "all";

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

function renderFeed() {
  const posts = filter === "all" ? POSTS : POSTS.filter((p) => p.category === filter);
  const grid = document.getElementById("feedGrid");
  const empty = document.getElementById("feedEmpty");

  grid.innerHTML = posts.map((p) => `<div class="feed-item">${postCardHTML(p)}</div>`).join("");
  empty.hidden = posts.length !== 0;

  grid.querySelectorAll(".post-card").forEach((card) => {
    card.addEventListener("click", () => openLightbox(card.dataset.id));
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
