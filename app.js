/* ============================================================
   THE MISADVENTURES OF A FAMILY MAN — app.js
   Hash-router single-page app. Every view is a pure render
   function that returns an HTML string; app.js swaps #app's
   content and re-binds behavior after each route change.
   ============================================================ */

const app = document.getElementById("app");
const siteNav = document.getElementById("siteNav");
const navLinks = document.getElementById("navLinks");
const navBurger = document.getElementById("navBurger");
const themeToggle = document.getElementById("themeToggle");

document.getElementById("footerYear").textContent = new Date().getFullYear();

/* ---------------- Theme ---------------- */
function initTheme() {
  const saved = localStorageSafeGet("mfm-theme");
  const theme = saved || "dark";
  document.documentElement.setAttribute("data-theme", theme);
}
function localStorageSafeGet(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}
function localStorageSafeSet(key, val) {
  try { localStorage.setItem(key, val); } catch (e) { /* no-op */ }
}
themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorageSafeSet("mfm-theme", next);
});
initTheme();

/* ---------------- Nav scroll + burger ---------------- */
window.addEventListener("scroll", () => {
  siteNav.classList.toggle("scrolled", window.scrollY > 40);
}, { passive: true });

navBurger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navBurger.classList.toggle("open", open);
  navBurger.setAttribute("aria-expanded", String(open));
});
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("open");
    navBurger.classList.remove("open");
  }
});

/* ---------------- Utilities ---------------- */
function stars(rating5) {
  const full = Math.round(rating5);
  return "★".repeat(full) + "☆".repeat(5 - full);
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------------- Reveal-on-scroll ---------------- */
let revealObserver;
function initReveal() {
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
}

/* ---------------- Lazy load ---------------- */
let lazyObserver;
function initLazyImages() {
  if (lazyObserver) lazyObserver.disconnect();
  lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const src = el.getAttribute("data-src");
        if (src) {
          el.src = src;
          el.addEventListener("load", () => el.classList.add("loaded"), { once: true });
          el.removeAttribute("data-src");
        }
        lazyObserver.unobserve(el);
      }
    });
  }, { rootMargin: "200px" });
  document.querySelectorAll("img[data-src]").forEach(el => lazyObserver.observe(el));
}
function lazyImg(src, alt, cls) {
  return `<img class="lazy-img ${cls || ""}" data-src="${src}" alt="${escapeHtml(alt)}" loading="lazy">`;
}

/* ---------------- Lightbox ---------------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
let lightboxGroup = [];
let lightboxIndex = 0;

function openLightbox(group, index) {
  lightboxGroup = group;
  lightboxIndex = index;
  showLightboxImage();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function showLightboxImage() {
  const item = lightboxGroup[lightboxIndex];
  lightboxImg.classList.remove("loaded");
  lightboxImg.src = item.src;
  lightboxImg.alt = item.label || "";
  lightboxCaption.textContent = item.label || "";
  lightboxImg.onload = () => lightboxImg.classList.add("loaded");
  const multi = lightboxGroup.length > 1;
  document.getElementById("lightboxPrev").style.display = multi ? "flex" : "none";
  document.getElementById("lightboxNext").style.display = multi ? "flex" : "none";
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function lightboxStep(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxGroup.length) % lightboxGroup.length;
  showLightboxImage();
}
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
document.getElementById("lightboxPrev").addEventListener("click", () => lightboxStep(-1));
document.getElementById("lightboxNext").addEventListener("click", () => lightboxStep(1));
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") lightboxStep(-1);
  if (e.key === "ArrowRight") lightboxStep(1);
});

/* Delegate clicks: any element with data-lightbox-group + data-lightbox-index opens the viewer.
   Groups are looked up from window.__lightboxGroups, keyed by group name, so the same
   masonry/gallery markup works for the homepage strip, the full gallery, and a single
   destination's photo set without extra markup per image. */
window.__lightboxGroups = {};
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-lightbox-group]");
  if (!el) return;
  const groupName = el.getAttribute("data-lightbox-group");
  const index = parseInt(el.getAttribute("data-lightbox-index"), 10) || 0;
  const group = window.__lightboxGroups[groupName];
  if (group && group.length) openLightbox(group, index);
});

function registerLightboxGroup(name, items) {
  window.__lightboxGroups[name] = items;
}

/* ---------------- Newsletter forms ---------------- */
function bindNewsletterForms() {
  document.querySelectorAll("[data-newsletter-form]").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = form.querySelector("[data-form-note]") || form.parentElement.querySelector("[data-form-note]");
      const input = form.querySelector("input[type=email]");
      if (note) note.textContent = `You're in — postcards headed to ${input.value}.`;
      form.reset();
    });
  });
  const footerForm = document.getElementById("footerNewsletterForm");
  const footerNote = document.getElementById("footerFormNote");
  if (footerForm) {
    footerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = footerForm.querySelector("input[type=email]");
      footerNote.textContent = `Thanks — you're on the list.`;
      footerForm.reset();
    });
  }
}

/* ============================================================
   ROUTER
   ============================================================ */

const routes = {
  "/": renderHome,
  "/adventures": renderAdventuresList,
  "/destinations": renderDestinationsList,
  "/eats": renderEats,
  "/misadventures": renderMisadventures,
  "/gallery": renderGallery,
  "/about": renderAbout
};

function parseHash() {
  let hash = location.hash.replace(/^#/, "") || "/";
  if (!hash.startsWith("/")) hash = "/" + hash;
  return hash;
}

function router() {
  const path = parseHash();
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

  let html = "";
  const destMatch = path.match(/^\/destinations\/([a-z0-9-]+)$/);
  const advMatch = path.match(/^\/adventures\/([a-z0-9-]+)$/);

  if (routes[path]) {
    html = routes[path]();
  } else if (destMatch && getDestination(destMatch[1])) {
    html = renderDestinationDetail(getDestination(destMatch[1]));
  } else if (advMatch && getAdventure(advMatch[1])) {
    html = renderAdventureDetail(getAdventure(advMatch[1]));
  } else {
    html = render404();
  }

  app.innerHTML = html;
  updateActiveNav(path);
  afterRender(path);
  document.title = pageTitle(path);
}

function pageTitle(path) {
  const base = "The Misadventures of a Family Man";
  if (path === "/") return `${base} — Travel Journal`;
  const destMatch = path.match(/^\/destinations\/([a-z0-9-]+)$/);
  if (destMatch) { const d = getDestination(destMatch[1]); if (d) return `${d.name} — ${base}`; }
  const advMatch = path.match(/^\/adventures\/([a-z0-9-]+)$/);
  if (advMatch) { const a = getAdventure(advMatch[1]); if (a) return `${a.title} — ${base}`; }
  const map = { "/adventures": "Adventures", "/destinations": "Destinations", "/eats": "Eats Worth the Flight", "/misadventures": "Misadventures", "/gallery": "Gallery", "/about": "About" };
  return `${map[path] || "Not Found"} — ${base}`;
}

function updateActiveNav(path) {
  document.querySelectorAll(".nav-links a").forEach(a => {
    const route = a.getAttribute("data-route");
    const isActive = route === "/" ? path === "/" : path.startsWith(route);
    a.classList.toggle("active", isActive);
  });
}

function afterRender(path) {
  initReveal();
  initLazyImages();
  bindNewsletterForms();
  if (path === "/") {
    initHeroSlider();
    registerLightboxGroup("home", GALLERY.slice(0, 8).map(g => ({ src: g.src, label: g.label })));
  }
  const destMatch = path.match(/^\/destinations\/([a-z0-9-]+)$/);
  if (destMatch) {
    const d = getDestination(destMatch[1]);
    if (d) registerLightboxGroup(`dest-${d.slug}`, d.gallery.map(src => ({ src, label: d.name })));
  }
  if (path === "/gallery") {
    registerLightboxGroup("full-gallery", GALLERY.map(g => ({ src: g.src, label: g.label })));
  }
  bindGalleryFilters();
  bindCountryFilters();
}

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);

/* ============================================================
   SHARED PARTIALS
   ============================================================ */

function destCardHTML(d, delay) {
  return `
  <a href="#/destinations/${d.slug}" class="dest-card reveal ${delay || ""}">
    ${lazyImg(d.cardImg, d.name)}
    <div class="dest-card-body">
      <span class="dest-card-tag">${escapeHtml(d.tag)}</span>
      <h3 class="dest-card-title">${escapeHtml(d.name)}</h3>
      <p class="dest-card-sub">${escapeHtml(d.country)}</p>
    </div>
  </a>`;
}

function foodCardHTML(r, delay) {
  return `
  <div class="food-card reveal ${delay || ""}">
    <div class="food-card-img">
      ${lazyImg(r.img, r.name)}
      <div class="food-card-rating">★ ${r.rating.toFixed(1)}</div>
    </div>
    <div class="food-card-body">
      <span class="food-card-loc">${escapeHtml(r.location)}${r.destName ? " · " + escapeHtml(r.destName) : ""}</span>
      <h3 class="food-card-name">${escapeHtml(r.name)}</h3>
      <p class="food-card-review">${escapeHtml(r.review)}</p>
      ${r.communityReview ? `
      <div class="community-review">
        <span class="community-review-label">Community says <em>(via ${escapeHtml(r.communitySource || "Google/Yelp")} — visited)</em></span>
        <p>${escapeHtml(r.communityReview)}</p>
      </div>` : ""}
      ${r.destSlug ? `<a href="#/destinations/${r.destSlug}" class="food-card-more">See ${escapeHtml(r.destName || "destination")} →</a>` : ""}
    </div>
  </div>`;
}

function newsletterBlockHTML() {
  return `
  <section class="section">
    <div class="container">
      <div class="newsletter-block reveal">
        <span class="eyebrow">Stay in the loop</span>
        <h2 class="newsletter-title">Get the postcard, whenever there's one worth sending.</h2>
        <p class="newsletter-desc">New destinations, honest restaurant reviews, and whatever went wrong this time — straight to your inbox.</p>
        <form class="newsletter-form" data-newsletter-form>
          <input type="email" required placeholder="you@somewhere-nice.com" aria-label="Email address">
          <button class="btn btn-primary" type="submit">Subscribe</button>
        </form>
        <p class="form-note" data-form-note></p>
      </div>
    </div>
  </section>`;
}

function worldLandmassSVG() {
  // Simplified continent silhouettes, hand-built on the same equirectangular
  // percentage math used for pin placement (left = (lon+180)/360*100,
  // top = (90-lat)/180*100), so shapes and pins always line up regardless
  // of the container's actual pixel size.
  return `
  <svg class="map-landmass" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <polygon points="4.2,10.6 11.1,12.2 15.3,22.8 17.5,32.2 20.8,38.9 23.1,40 25.6,40 27.8,36.1 29.2,30.6 30.6,25 33.3,22.2 34.7,23.3 31.9,16.7 23.6,11.1 13.9,11.1" />
    <polygon points="30,43.3 27.5,52.8 30.3,66.7 31.1,80.6 32.5,78.9 33.9,69.4 40.3,54.4 37.5,47.2 33.3,44.4" />
    <polygon points="47.5,26.1 47.5,30 50.8,29.4 54.2,28.9 56.4,30.6 57.8,25 61.1,25 66.7,19.4 66.7,11.1 55.6,10.6 51.4,15.6 49.2,17.8 47.5,22.2" />
    <polygon points="45.3,38.3 48.3,30.6 52.8,29.4 58.9,32.8 61.9,43.3 64.2,43.3 61.9,50.6 61.1,58.3 59.7,63.9 55.6,69.4 54.2,65.6 53.3,52.8 52.5,47.2 48.6,44.4" />
    <polygon points="57.8,25 61.1,25 63.3,26.7 66.7,26.7 63.9,33.3 66.7,36.1 69.4,36.1 71.4,45.6 72.2,42.8 75.8,37.8 77.2,45.6 78.9,48.9 79.4,53.3 83.3,54.4 88.9,51.1 89.2,55 88.9,25 89.4,20.6 94.4,15.6 97.2,13.3 100,12.2 97.2,11.1 88.9,9.4 77.8,6.7 66.7,10 63.3,12.2" />
    <polygon points="81.4,62.2 83.9,59.4 85.8,58.3 87.8,56.7 89.4,56.1 90.3,59.4 92.5,65.6 91.7,70.6 88.9,71.1 86.4,67.8 81.9,69.4" />
  </svg>`;
}

function worldMapHTML() {
  return `
  <section class="section section-alt">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow">Where we've been</span>
          <h2 class="section-title">The route so far</h2>
        </div>
        <a href="#/destinations" class="btn btn-ghost">View all destinations</a>
      </div>
      <div class="map-block reveal">
        ${worldLandmassSVG()}
        ${DESTINATIONS.map(d => `<a href="#/destinations/${d.slug}" class="map-pin" data-label="${escapeHtml(d.name)}" style="top:${d.coords.top}; left:${d.coords.left};"></a>`).join("")}
        <span class="map-caption">${DESTINATIONS.length} stamps and counting — tap a pin</span>
      </div>
    </div>
  </section>`;
}

/* ============================================================
   HOME
   ============================================================ */

const HERO_SLIDES = [
  { img: wpImg(825, 1920), eyebrow: "Now traveling — Ha Long Bay" },
  { img: wpImg(806, 1920), eyebrow: "Latest stop — Hanoi's Old Quarter" },
  { img: wpImg(797, 1920), eyebrow: "Where it started — Hong Kong" }
];

function renderHome() {
  const featured = getAdventure("southeast-asia-2026");
  const featuredDests = DESTINATIONS.slice(0, 3);
  const topRestaurants = getAllRestaurants().slice(0, 3);
  const misadventureOfMonth = MISADVENTURES[2];

  return `
  <section class="hero-slider" id="heroSlider">
    ${HERO_SLIDES.map((s, i) => `<div class="hero-slide ${i === 0 ? "active" : ""}" style="background-image:url('${s.img}')" data-index="${i}"></div>`).join("")}
    <div class="hero-content">
      <span class="hero-eyebrow" id="heroEyebrow">${HERO_SLIDES[0].eyebrow}</span>
      <h1 class="hero-title">The Misadventures <em>of a Family Man</em></h1>
      <p class="hero-subtitle">Traveling the world one wrong turn, unforgettable meal, and family adventure at a time.</p>
      <div class="hero-actions">
        <a href="#/adventures/southeast-asia-2026" class="btn btn-primary">Start the Adventure</a>
        <a href="#/destinations" class="btn btn-ghost">Browse Destinations</a>
      </div>
    </div>
    <div class="hero-dots" id="heroDots">
      ${HERO_SLIDES.map((_, i) => `<button class="${i === 0 ? "active" : ""}" data-slide="${i}" aria-label="Show slide ${i + 1}"></button>`).join("")}
    </div>
    <div class="scroll-cue"><span>Scroll</span><span class="line"></span></div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow">Featured Adventure</span>
          <h2 class="section-title">${escapeHtml(featured.title)}</h2>
          <p class="section-desc">${escapeHtml(featured.subtitle)}</p>
        </div>
        <a href="#/adventures/${featured.slug}" class="btn btn-primary">View the Full Trip</a>
      </div>
      <div class="timeline-card reveal" style="grid-template-columns: 1.3fr 1fr;">
        ${lazyImg(featured.heroImg, featured.title)}
        <div class="timeline-card-body">
          <span class="timeline-loc">${featured.stops.length} stops · ${escapeHtml(featured.duration)}</span>
          <h3 class="timeline-title">${escapeHtml(featured.subtitle)}</h3>
          <p class="timeline-desc">${escapeHtml(featured.intro)}</p>
          <a href="#/adventures/${featured.slug}" class="timeline-link">Follow the route →</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow">Latest Destinations</span>
          <h2 class="section-title">Where the passport's been stamped lately</h2>
        </div>
        <a href="#/destinations" class="btn btn-ghost">All Destinations</a>
      </div>
      <div class="card-grid">
        ${featuredDests.map((d, i) => destCardHTML(d, `reveal-delay-${i + 1}`)).join("")}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow">Eats Worth the Flight</span>
          <h2 class="section-title">Restaurants I'd fly back for</h2>
        </div>
        <a href="#/eats" class="btn btn-ghost">See All Restaurants</a>
      </div>
      <div class="card-grid">
        ${topRestaurants.map((r, i) => foodCardHTML(r, `reveal-delay-${i + 1}`)).join("")}
      </div>
    </div>
  </section>

  ${worldMapHTML()}

  <section class="section">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow">Featured Photography</span>
          <h2 class="section-title">A few frames from the road</h2>
        </div>
        <a href="#/gallery" class="btn btn-ghost">Open Full Gallery</a>
      </div>
      <div class="masonry">
        ${GALLERY.slice(0, 8).map((g, i) => `
          <div class="masonry-item reveal" data-lightbox-group="home" data-lightbox-index="${i}">
            ${lazyImg(g.src, g.label)}
            <span class="masonry-tag">${escapeHtml(g.label)}</span>
          </div>`).join("")}
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <span class="eyebrow">Misadventure of the Month</span>
      <div class="misadventure-card reveal mt-lg" style="max-width: 720px;">
        <span class="misadventure-icon">${misadventureOfMonth.icon}</span>
        <h3 class="misadventure-title">${escapeHtml(misadventureOfMonth.title)}</h3>
        <span class="misadventure-loc">${escapeHtml(misadventureOfMonth.location)}</span>
        <p class="misadventure-body">${escapeHtml(misadventureOfMonth.body)}</p>
        <a href="#/misadventures" class="food-card-more" style="margin-top:22px;">Read more misadventures →</a>
      </div>
    </div>
  </section>

  ${newsletterBlockHTML()}
  `;
}

function initHeroSlider() {
  const slider = document.getElementById("heroSlider");
  if (!slider) return;
  const slides = slider.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll("#heroDots button");
  const eyebrow = document.getElementById("heroEyebrow");
  let index = 0;
  let timer = setInterval(next, 6000);

  function go(i) {
    slides[index].classList.remove("active");
    dots[index].classList.remove("active");
    index = i;
    slides[index].classList.add("active");
    dots[index].classList.add("active");
    eyebrow.textContent = HERO_SLIDES[index].eyebrow;
  }
  function next() { go((index + 1) % slides.length); }

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      clearInterval(timer);
      go(parseInt(dot.getAttribute("data-slide"), 10));
      timer = setInterval(next, 6000);
    });
  });
}

/* ============================================================
   ADVENTURES (list + detail)
   ============================================================ */

function renderAdventuresList() {
  return `
  <section class="section" style="padding-top: calc(var(--nav-h) + 60px);">
    <div class="container">
      <span class="eyebrow">Adventures</span>
      <h1 class="section-title" style="margin-top:16px;">Multi-stop trips, told in order</h1>
      <p class="section-desc" style="margin-top:16px;">Full journeys, stitched together stop by stop. More get added every time we survive one.</p>

      <div class="card-grid cols-2 mt-lg">
        ${ADVENTURES.map(a => `
          <a href="#/adventures/${a.slug}" class="dest-card reveal" style="aspect-ratio: 16/11;">
            ${lazyImg(a.heroImg, a.title)}
            <div class="dest-card-body">
              <span class="dest-card-tag">${a.stops.length} Stops · ${escapeHtml(a.duration)}</span>
              <h3 class="dest-card-title">${escapeHtml(a.title)}</h3>
              <p class="dest-card-sub">${escapeHtml(a.subtitle)}</p>
            </div>
          </a>`).join("")}
      </div>
    </div>
  </section>
  ${newsletterBlockHTML()}
  `;
}

function renderAdventureDetail(a) {
  const stopDests = a.stops.map(getDestination);
  return `
  <section class="page-hero" style="background-image:url('${a.heroImg}')">
    <div class="page-hero-content">
      <div class="breadcrumb"><a href="#/adventures">Adventures</a><span>/</span><span>${escapeHtml(a.title)}</span></div>
      <h1 class="page-hero-title">${escapeHtml(a.title)}</h1>
      <div class="page-hero-meta">
        <span>◆ ${a.stops.length} stops</span>
        <span>◆ ${escapeHtml(a.duration)}</span>
        <span>◆ ${escapeHtml(a.distance)}</span>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <p class="section-desc" style="max-width:70ch; font-size:16px;">${escapeHtml(a.intro)}</p>

      <div class="timeline">
        <div class="timeline-line"></div>
        ${stopDests.map((d, i) => `
          <div class="timeline-item reveal">
            <div class="timeline-marker">${String(i + 1).padStart(2, "0")}</div>
            <div class="timeline-card">
              ${lazyImg(d.cardImg, d.name)}
              <div class="timeline-card-body">
                <span class="timeline-loc">${escapeHtml(d.country)}</span>
                <h3 class="timeline-title">${escapeHtml(d.name)}</h3>
                <p class="timeline-desc">${escapeHtml(d.whyVisit)}</p>
                <a href="#/destinations/${d.slug}" class="timeline-link">Explore ${escapeHtml(d.name)} →</a>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  ${a.topExperiences || a.topRestaurants ? `
  <section class="section section-alt">
    <div class="container two-col">
      ${a.topExperiences ? `
      <div class="reveal">
        <span class="eyebrow">If I had to pick 10 experiences</span>
        <h2 class="section-title" style="font-size:28px; margin-top:14px;">The trip's highlight reel</h2>
        <ul class="list-check">
          ${a.topExperiences.map(e => `<li>${escapeHtml(e)}</li>`).join("")}
        </ul>
      </div>` : ""}
      ${a.topRestaurants ? `
      <div class="reveal reveal-delay-1">
        <span class="eyebrow">Top 10 restaurants, whole trip</span>
        <h2 class="section-title" style="font-size:28px; margin-top:14px;">Where we'd eat again first</h2>
        <ul class="list-check">
          ${a.topRestaurants.map((r, i) => `<li>${String(i + 1).padStart(2, "0")} — ${escapeHtml(r)}</li>`).join("")}
        </ul>
      </div>` : ""}
    </div>
  </section>` : ""}

  ${a.packingTips ? `
  <section class="section">
    <div class="container">
      <span class="eyebrow">Packing & Practical Tips</span>
      <h2 class="section-title" style="font-size:28px; margin-top:14px;">What we'd tell ourselves before packing again</h2>
      <div class="tips-list mt-lg" style="margin-top:28px;">
        ${a.packingTips.map(t => `<div class="tip-row"><span class="tip-icon">◆</span>${escapeHtml(t)}</div>`).join("")}
      </div>
    </div>
  </section>` : ""}

  ${worldMapHTML()}
  ${newsletterBlockHTML()}
  `;
}

/* ============================================================
   DESTINATIONS (list + detail)
   ============================================================ */

function renderDestinationsList() {
  // Group by country (alphabetical) and by year (most recent first) — two views, one toggle
  const byCountry = {};
  const byYear = {};
  DESTINATIONS.forEach(d => {
    if (!byCountry[d.country]) byCountry[d.country] = [];
    byCountry[d.country].push(d);
    const y = d.year || "Undated";
    if (!byYear[y]) byYear[y] = [];
    byYear[y].push(d);
  });
  const countries = Object.keys(byCountry).sort((a, b) => a.localeCompare(b));
  countries.forEach(c => byCountry[c].sort((a, b) => a.name.localeCompare(b.name)));
  const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a));
  years.forEach(y => byYear[y].sort((a, b) => a.name.localeCompare(b.name)));

  const countryGroupsHTML = countries.map(c => `
    <div class="dest-group" data-view="country" data-key="${escapeHtml(c)}">
      <div class="divider-route"></div>
      <h2 class="country-heading">${escapeHtml(c)} <span class="country-count">${byCountry[c].length} ${byCountry[c].length === 1 ? "stop" : "stops"}</span></h2>
      <div class="card-grid mt-lg">
        ${byCountry[c].map((d, i) => destCardHTML(d, `reveal-delay-${(i % 3) + 1}`)).join("")}
      </div>
    </div>`).join("");

  const yearGroupsHTML = years.map(y => `
    <div class="dest-group" data-view="year" data-key="${escapeHtml(y)}" style="display:none;">
      <div class="divider-route"></div>
      <h2 class="country-heading">${escapeHtml(y)} <span class="country-count">${byYear[y].length} ${byYear[y].length === 1 ? "stop" : "stops"}</span></h2>
      <div class="card-grid mt-lg">
        ${byYear[y].map((d, i) => destCardHTML(d, `reveal-delay-${(i % 3) + 1}`)).join("")}
      </div>
    </div>`).join("");

  return `
  <section class="section" style="padding-top: calc(var(--nav-h) + 60px);">
    <div class="container">
      <span class="eyebrow">Destinations</span>
      <h1 class="section-title" style="margin-top:16px;">Every stop, one passport at a time</h1>
      <p class="section-desc" style="margin-top:16px;">${DESTINATIONS.length} places we've eaten, wandered, and occasionally gotten lost in, across ${countries.length} countries — with quick facts, food picks, and the honest verdict on whether we'd go back.</p>

      <div class="view-toggle mt-lg" id="viewToggle">
        <span class="view-toggle-label">Browse by:</span>
        <button class="view-toggle-btn active" data-mode="country">Country</button>
        <button class="view-toggle-btn" data-mode="year">Year</button>
      </div>

      <div class="gallery-filters" id="countryFilters">
        <button class="gallery-filter active" data-filter="all">All (${DESTINATIONS.length})</button>
        ${countries.map(c => `<button class="gallery-filter" data-filter="${escapeHtml(c)}">${escapeHtml(c)} (${byCountry[c].length})</button>`).join("")}
      </div>

      <div id="destGroups">
        ${countryGroupsHTML}
        ${yearGroupsHTML}
      </div>
    </div>
  </section>
  ${worldMapHTML()}
  ${newsletterBlockHTML()}
  `;
}

function bindCountryFilters() {
  const toggle = document.getElementById("viewToggle");
  const filterBar = document.getElementById("countryFilters");
  if (!toggle || !filterBar) return;

  let currentMode = "country";

  function renderFilterPills() {
    const groups = document.querySelectorAll(`#destGroups .dest-group[data-view="${currentMode}"]`);
    const pills = [`<button class="gallery-filter active" data-filter="all">All</button>`];
    groups.forEach(g => {
      const key = g.getAttribute("data-key");
      const count = g.querySelectorAll(".dest-card").length;
      pills.push(`<button class="gallery-filter" data-filter="${key}">${key} (${count})</button>`);
    });
    filterBar.innerHTML = pills.join("");
  }

  function applyMode(mode) {
    currentMode = mode;
    document.querySelectorAll("#destGroups .dest-group").forEach(g => {
      g.style.display = g.getAttribute("data-view") === mode ? "" : "none";
    });
    renderFilterPills();
  }

  toggle.addEventListener("click", (e) => {
    const btn = e.target.closest(".view-toggle-btn");
    if (!btn) return;
    toggle.querySelectorAll(".view-toggle-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    applyMode(btn.getAttribute("data-mode"));
  });

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".gallery-filter");
    if (!btn) return;
    filterBar.querySelectorAll(".gallery-filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const key = btn.getAttribute("data-filter");
    document.querySelectorAll(`#destGroups .dest-group[data-view="${currentMode}"]`).forEach(g => {
      const match = key === "all" || g.getAttribute("data-key") === key;
      g.style.display = match ? "" : "none";
    });
  });
}

function renderDestinationDetail(d) {
  const related = DESTINATIONS.filter(x => x.slug !== d.slug && x.relatedAdventure === d.relatedAdventure).slice(0, 3);
  return `
  <section class="page-hero" style="background-image:url('${d.heroImg}')">
    <div class="page-hero-content">
      <div class="breadcrumb"><a href="#/destinations">Destinations</a><span>/</span><span>${escapeHtml(d.name)}</span></div>
      <h1 class="page-hero-title">${escapeHtml(d.name)}</h1>
      <div class="page-hero-meta">
        <span>◆ ${escapeHtml(d.country)}</span>
        <span>◆ ${escapeHtml(d.tag)}</span>
      </div>
    </div>
  </section>

  <section class="section section-tight">
    <div class="container">
      <div class="facts-grid reveal">
        ${d.quickFacts.map(f => `
          <div class="fact-cell">
            <div class="fact-label">${escapeHtml(f.label)}</div>
            <div class="fact-value">${escapeHtml(f.value)}</div>
          </div>`).join("")}
      </div>
    </div>
  </section>

  <section class="section section-tight section-alt">
    <div class="container two-col">
      <div class="reveal">
        <span class="eyebrow">Why Visit</span>
        <h2 class="section-title" style="font-size: 30px; margin-top:14px;">The short version</h2>
        <p class="section-desc" style="max-width:none; margin-top:18px; font-size:15px;">${escapeHtml(d.whyVisit)}</p>
      </div>
      <div class="reveal reveal-delay-1">
        <span class="eyebrow">Things To Do</span>
        <ul class="list-check">
          ${d.thingsToDo.map(t => `<li>${escapeHtml(t)}</li>`).join("")}
        </ul>
      </div>
    </div>
  </section>

  ${d.restaurants.length ? `
  <section class="section section-tight">
    <div class="container">
      <span class="eyebrow">Restaurants</span>
      <h2 class="section-title" style="font-size:30px; margin-top:14px;">Where we ate, twice if we could</h2>
      <div class="card-grid cols-2 mt-lg">
        ${d.restaurants.map((r, i) => foodCardHTML({ ...r }, `reveal-delay-${i + 1}`)).join("")}
      </div>
    </div>
  </section>` : ""}

  <section class="section section-tight section-alt">
    <div class="container">
      <span class="eyebrow">Must-Try Foods</span>
      <h2 class="section-title" style="font-size:30px; margin-top:14px;">Order these first</h2>
      <div class="foods-strip mt-lg">
        ${d.mustTryFoods.map(f => `
          <div class="food-pill reveal">
            ${lazyImg(f.img, f.name)}
            <div class="food-pill-name">${escapeHtml(f.name)}</div>
          </div>`).join("")}
      </div>
    </div>
  </section>

  <section class="section section-tight">
    <div class="container two-col">
      <div class="reveal">
        <span class="eyebrow">Hidden Gems</span>
        <ul class="list-check">
          ${d.hiddenGems.map(g => `<li>${escapeHtml(g)}</li>`).join("")}
        </ul>
      </div>
      <div class="reveal reveal-delay-1">
        <span class="eyebrow">Travel Tips</span>
        <div class="tips-list mt-lg" style="margin-top:20px;">
          ${d.travelTips.map(t => `<div class="tip-row"><span class="tip-icon">◆</span>${escapeHtml(t)}</div>`).join("")}
        </div>
      </div>
    </div>
  </section>

  <section class="section section-tight section-alt">
    <div class="container">
      <span class="eyebrow">Photo Gallery</span>
      <div class="masonry mt-lg" style="margin-top:32px;">
        ${d.gallery.map((src, i) => `<div class="masonry-item reveal" data-lightbox-group="dest-${d.slug}" data-lightbox-index="${i}">${lazyImg(src, d.name)}</div>`).join("")}
      </div>
    </div>
  </section>

  <section class="section section-tight">
    <div class="container">
      <span class="eyebrow">On the Map</span>
      <div class="map-block reveal mt-lg" style="margin-top:24px;">
        ${worldLandmassSVG()}
        <span class="map-pin" data-label="${escapeHtml(d.name)}" style="top:${d.coords.top}; left:${d.coords.left};"></span>
        <span class="map-caption">${escapeHtml(d.name)}, ${escapeHtml(d.country)}</span>
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container two-col">
      <div class="rating-block reveal">
        <div class="stamp"><span class="stamp-num">${d.rating}</span><span class="stamp-of">/ 10</span></div>
        <div>
          <span class="eyebrow">Personal Rating</span>
          <p class="return-verdict" style="margin-top:10px;">Family rating based on food, chaos-to-charm ratio, and how many times someone asked "can we come back here."</p>
        </div>
      </div>
      <div class="rating-block reveal reveal-delay-1">
        <div class="stamp" style="border-color: var(--teal-bright); color: var(--teal-bright);"><span class="stamp-num">✓</span><span class="stamp-of">Return?</span></div>
        <div>
          <span class="eyebrow">Would I Return?</span>
          <p class="return-verdict" style="margin-top:10px;"><strong>${escapeHtml(d.wouldReturn)}</strong></p>
        </div>
      </div>
    </div>
  </section>

  ${related.length ? `
  <section class="section">
    <div class="container">
      <span class="eyebrow">Related Adventures</span>
      <h2 class="section-title" style="font-size:30px; margin-top:14px;">Part of the ${escapeHtml(getAdventure(d.relatedAdventure)?.title || "")} route</h2>
      <div class="card-grid mt-lg">
        ${related.map((r, i) => destCardHTML(r, `reveal-delay-${i + 1}`)).join("")}
      </div>
    </div>
  </section>` : ""}

  ${newsletterBlockHTML()}
  `;
}

/* ============================================================
   EATS WORTH THE FLIGHT
   ============================================================ */

function renderEats() {
  const restaurants = getAllRestaurants();
  return `
  <section class="section" style="padding-top: calc(var(--nav-h) + 60px);">
    <div class="container">
      <span class="eyebrow">Eats Worth the Flight</span>
      <h1 class="section-title" style="margin-top:16px;">Restaurants I'd fly back for</h1>
      <p class="section-desc" style="margin-top:16px;">Every meal here earned its place through repeat visits, unreasonable cravings back home, or a kid asking for it by name months later.</p>

      <div class="card-grid mt-lg">
        ${restaurants.map((r, i) => foodCardHTML(r, `reveal-delay-${(i % 3) + 1}`)).join("")}
      </div>
    </div>
  </section>
  ${newsletterBlockHTML()}
  `;
}

/* ============================================================
   MISADVENTURES
   ============================================================ */

function renderMisadventures() {
  return `
  <section class="section" style="padding-top: calc(var(--nav-h) + 60px);">
    <div class="container">
      <span class="eyebrow">Misadventures</span>
      <h1 class="section-title" style="margin-top:16px;">Everything that went sideways (and how it turned out fine)</h1>
      <p class="section-desc" style="margin-top:16px;">The wrong boats, wrong turns, and questionable bets that ended up being the stories we tell the most.</p>

      <div class="card-grid mt-lg">
        ${MISADVENTURES.map((m, i) => `
          <div class="misadventure-card reveal reveal-delay-${(i % 3) + 1}">
            <span class="misadventure-icon">${m.icon}</span>
            <h3 class="misadventure-title">${escapeHtml(m.title)}</h3>
            <span class="misadventure-loc">${escapeHtml(m.location)}</span>
            <p class="misadventure-body">${escapeHtml(m.body)}</p>
          </div>`).join("")}
      </div>
    </div>
  </section>
  ${newsletterBlockHTML()}
  `;
}

/* ============================================================
   GALLERY
   ============================================================ */

function renderGallery() {
  return `
  <section class="section" style="padding-top: calc(var(--nav-h) + 60px);">
    <div class="container">
      <span class="eyebrow">Gallery</span>
      <h1 class="section-title" style="margin-top:16px;">Frames from the road</h1>
      <p class="section-desc" style="margin-top:16px;">Filter by destination, or scroll the whole trip at once.</p>

      <div class="gallery-filters mt-lg" id="galleryFilters">
        ${GALLERY_TAGS.map(tag => `
          <button class="gallery-filter ${tag === "all" ? "active" : ""}" data-tag="${tag}">
            ${tag === "all" ? "All" : escapeHtml(getDestination(tag)?.name || tag)}
          </button>`).join("")}
      </div>

      <div class="masonry" id="galleryMasonry">
        ${GALLERY.map((g, i) => `
          <div class="masonry-item reveal" data-tag="${g.tag}" data-lightbox-group="full-gallery" data-lightbox-index="${i}">
            ${lazyImg(g.src, g.label)}
            <span class="masonry-tag">${escapeHtml(g.label)}</span>
          </div>`).join("")}
      </div>
    </div>
  </section>
  ${newsletterBlockHTML()}
  `;
}

function bindGalleryFilters() {
  const filterBar = document.getElementById("galleryFilters");
  if (!filterBar) return;
  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".gallery-filter");
    if (!btn) return;
    filterBar.querySelectorAll(".gallery-filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const tag = btn.getAttribute("data-tag");
    document.querySelectorAll("#galleryMasonry .masonry-item").forEach(item => {
      const match = tag === "all" || item.getAttribute("data-tag") === tag;
      item.style.display = match ? "" : "none";
    });
  });
}

/* ============================================================
   ABOUT
   ============================================================ */

function renderAbout() {
  return `
  <section class="section" style="padding-top: calc(var(--nav-h) + 80px);">
    <div class="container about-hero">
      <div class="about-portrait reveal">
        ${lazyImg(wpImg(824, 900), "The author, on the road")}
      </div>
      <div class="reveal reveal-delay-1">
        <span class="eyebrow">About</span>
        <h1 class="section-title" style="margin-top:16px;">Just a family man near Dallas, Texas.</h1>
        <p class="section-desc" style="max-width:none; margin-top:22px; font-size:15.5px;">
          When I'm not enjoying good food or traveling to my next adventure, you can find me working on my next start-up. This site is where the two collide — every trip, every meal, and every wrong turn my family and I have taken since we started keeping track in 2010.
        </p>
        <p class="section-desc" style="max-width:none; margin-top:18px; font-size:15.5px;">
          No sponsored perfection here — just honest reviews, real mishaps, and the lessons that only show up after you've already made the mistake once. Earn the life you deserve; no one else will do it for you. That goes for the travel too.
        </p>
        <div class="about-stats">
          <div><div class="about-stat-num">34</div><div class="about-stat-label">Trips documented</div></div>
          <div><div class="about-stat-num">700+</div><div class="about-stat-label">Restaurants & experiences catalogued</div></div>
          <div><div class="about-stat-num">∞</div><div class="about-stat-label">Wrong turns</div></div>
        </div>
        <div class="hero-actions" style="margin-top:40px;">
          <a href="#/adventures/southeast-asia-2026" class="btn btn-primary">Read the Latest Trip</a>
          <a href="#/misadventures" class="btn btn-ghost">See the Misadventures</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="divider-route"></div>
      <div class="two-col">
        <div class="reveal">
          <span class="eyebrow">The Family</span>
          <h2 class="section-title" style="font-size:30px; margin-top:14px;">Two adults, two kids, one shared carry-on rule</h2>
          <p class="section-desc" style="max-width:none; margin-top:16px; font-size:15px;">We travel as a family of four, which means every destination gets filtered through one honest question: is this actually going to work with kids? Sometimes the answer is a hard no. Usually it's the best version of the trip anyway.</p>
        </div>
        <div class="reveal reveal-delay-1">
          <span class="eyebrow">What You'll Find Here</span>
          <ul class="list-check">
            <li>Destination guides written after actually staying there, not skimming a listicle</li>
            <li>Restaurant reviews from meals we paid for and would order again</li>
            <li>The misadventures we'd normally leave out of a highlight reel</li>
            <li>A slowly growing archive of family-tested travel tips, going back to 2010</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="section text-center">
    <div class="container">
      <div class="badge-frame reveal">
        ${lazyImg("assets/logo-badge.png", "The Misadventures of a Family Man badge", "badge-img")}
      </div>
      <p class="section-desc" style="margin: 24px auto 0; text-align:center;">The paper airplane that started it all.</p>
    </div>
  </section>

  ${newsletterBlockHTML()}
  `;
}

/* ============================================================
   404
   ============================================================ */

function render404() {
  return `
  <section class="section text-center" style="padding-top: calc(var(--nav-h) + 140px); min-height: 60vh;">
    <div class="container">
      <span class="eyebrow" style="justify-content:center;">Wrong Turn</span>
      <h1 class="section-title" style="margin: 16px auto 0;">This page took a detour we didn't plan for.</h1>
      <p class="section-desc" style="margin: 16px auto 0;">Even we can't find this one — and we've gotten lost on three continents.</p>
      <a href="#/" class="btn btn-primary" style="margin-top:32px;">Back to Home</a>
    </div>
  </section>`;
}
