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
  return `<img class="lazy-img ${cls || ""} loaded" src="${src}" alt="${escapeHtml(alt)}" loading="lazy">`;
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
function netlifyEncode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

function submitToNetlify(email, note, form) {
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: netlifyEncode({ "form-name": "newsletter", email })
  })
    .then(() => {
      if (note) note.textContent = `You're in — postcards headed to ${email}.`;
      form.reset();
    })
    .catch(() => {
      if (note) note.textContent = `Something went wrong — mind trying again?`;
    });
}

function bindNewsletterForms() {
  document.querySelectorAll("[data-newsletter-form]").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = form.querySelector("[data-form-note]") || form.parentElement.querySelector("[data-form-note]");
      const input = form.querySelector("input[type=email]");
      submitToNetlify(input.value, note, form);
    });
  });
  const footerForm = document.getElementById("footerNewsletterForm");
  const footerNote = document.getElementById("footerFormNote");
  if (footerForm) {
    footerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = footerForm.querySelector("input[type=email]");
      submitToNetlify(input.value, footerNote, footerForm);
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
  "/about": renderAbout,
  "/herstories": renderHerStoriesList
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
  const herMatch = path.match(/^\/herstories\/([a-z0-9-]+)$/);

  if (routes[path]) {
    html = routes[path]();
  } else if (destMatch && getDestination(destMatch[1])) {
    html = renderDestinationDetail(getDestination(destMatch[1]));
  } else if (advMatch && getAdventure(advMatch[1])) {
    html = renderAdventureDetail(getAdventure(advMatch[1]));
  } else if (herMatch && getHerStory(herMatch[1])) {
    html = renderHerStoryDetail(getHerStory(herMatch[1]));
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
  const herMatch = path.match(/^\/herstories\/([a-z0-9-]+)$/);
  if (herMatch) { const t = getHerStory(herMatch[1]); if (t) return `${t.name} · HerStories — ${base}`; }
  const map = { "/adventures": "Adventures", "/destinations": "Destinations", "/eats": "Eats Worth the Flight", "/misadventures": "Misadventures", "/gallery": "Gallery", "/about": "About", "/herstories": "HerStories" };
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
    if (d) registerLightboxGroup(`dest-${d.slug}`, d.gallery.map(entry => {
      const src = typeof entry === "string" ? entry : entry.src;
      const label = typeof entry === "string" ? d.name : (entry.caption || d.name);
      return { src, label };
    }));
  }
  const advMatch = path.match(/^\/adventures\/([a-z0-9-]+)$/);
  if (advMatch) {
    const a = getAdventure(advMatch[1]);
    if (a) initAdventureRouteMap(a);
  }
  const herMatch = path.match(/^\/herstories\/([a-z0-9-]+)$/);
  if (herMatch) {
    const t = getHerStory(herMatch[1]);
    if (t && t.foodPhotos) registerLightboxGroup(`her-${t.slug}`, t.foodPhotos.map(f => ({ src: f.src, label: f.caption || t.name })));
  }
  if (path === "/gallery") {
    registerLightboxGroup("full-gallery", GALLERY.map(g => ({ src: g.src, label: g.label })));
  }
  bindGalleryFilters();
  bindCountryFilters();
  bindMisadventureFilters();
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
  <div class="food-card food-card-noimg reveal ${delay || ""}">
    <div class="food-card-body">
      <span class="food-card-loc">${escapeHtml(r.location)}${r.destName ? " · " + escapeHtml(r.destName) : ""}</span>
      <h3 class="food-card-name">${escapeHtml(r.name)}${r.rating ? ` <span class="food-card-rating-inline">★ ${r.rating.toFixed(1)}</span>` : ""}</h3>
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

function foodPhotosGalleryHTML(d) {
  if (d.foodPhotos && d.foodPhotos.length) {
    return `
      <div class="foods-strip mt-lg">
        ${d.foodPhotos.map(f => `
          <div class="food-pill reveal">
            ${lazyImg(f.src, f.caption || "A real photo from this trip")}
            ${f.caption ? `<div class="food-pill-name">${escapeHtml(f.caption)}</div>` : ""}
          </div>`).join("")}
      </div>`;
  }
  return `
      <div class="foods-pending reveal" style="margin-top:20px; opacity:0.7; font-style:italic;">
        In the Kitchen... Searching for Those Pictures, Coming Soon.
      </div>`;
}

function misadventurePhotosHTML(m) {
  if (m.photos && m.photos.length) {
    return `
      <div class="foods-strip mt-lg">
        ${m.photos.map(p => `
          <div class="food-pill reveal">
            ${lazyImg(p.src, p.caption || m.title)}
            ${p.caption ? `<div class="food-pill-name">${escapeHtml(p.caption)}</div>` : ""}
          </div>`).join("")}
      </div>`;
  }
  return "";
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
          <input type="email" name="email" required placeholder="you@somewhere-nice.com" aria-label="Email address">
          <button class="btn btn-primary" type="submit">Subscribe</button>
        </form>
        <p class="form-note" data-form-note></p>
      </div>
    </div>
  </section>`;
}

function worldLandmassSVG() {
  // Real, simplified world country boundaries (Natural Earth via datasets/geo-countries on GitHub,
  // public domain), converted to the same percentage math used for pin placement
  // (left = (lon+180)/360*100, top = (90-lat)/180*100), so shapes and pins always line up.
  return `
  <svg class="map-landmass" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <polygon points="84.57,55.1 84.68,55.0 84.74,55.02 84.76,55.09 84.73,55.1 84.74,55.24 84.61,55.55 84.47,55.66 84.36,55.76 84.3,55.75 84.37,55.58 84.35,55.47 84.38,55.32 84.43,55.21 84.51,55.23 84.54,55.25 84.56,55.16 84.57,55.1" />
    <polygon points="82.66,47.69 82.59,48.09 82.73,48.84 82.98,49.54 82.63,49.93 82.6,50.5 82.31,51.18 82.26,51.81 81.43,51.7 80.78,51.64 80.51,50.6 80.31,50.14 80.37,49.01 80.79,49.45 81.82,49.16 82.09,48.11 82.56,47.58 82.66,47.69" />
    <polygon points="89.16,51.44 88.91,54.46 88.6,54.0 88.4,53.16 88.04,52.72 87.44,52.18 87.13,51.84 86.89,52.14 86.69,51.53 87.13,51.43 87.13,51.23 86.64,50.88 86.52,50.41 87.3,50.75 87.46,51.78 87.99,51.25 89.1,51.45 89.16,51.44" />
    <polygon points="80.53,54.35 80.18,54.27 79.56,53.99 79.31,53.81 79.35,53.6 79.73,53.35 80.04,53.51 80.48,53.81 80.84,53.58 81.25,53.83 81.32,54.14 81.75,54.3 81.77,54.86 81.57,54.7 81.22,54.64 80.99,54.62 80.69,54.51 80.53,54.35" />
    <polygon points="83.29,50.49 83.47,49.55 84.0,49.44 84.61,49.29 84.43,49.81 83.69,49.73 83.54,50.76 84.12,50.34 83.84,50.95 84.02,51.76 84.12,52.29 83.75,52.59 83.62,51.48 83.42,52.77 83.23,52.42 83.0,51.58 83.29,50.49" />
    <polygon points="78.04,48.99 78.46,49.86 78.77,50.06 78.79,50.52 79.13,51.18 79.33,51.33 79.42,52.73 79.05,53.06 78.75,52.7 77.94,50.79 77.6,49.87 77.42,49.02 76.8,47.9 76.46,46.9 77.25,47.48 77.77,48.35 78.03,48.97 78.04,48.99" />
    <polygon points="83.55,55.53 83.51,55.68 83.46,55.73 83.37,55.66 83.32,55.55 83.3,55.52 83.23,55.44 83.19,55.42 83.15,55.42 83.07,55.38 83.05,55.26 83.12,55.21 83.2,55.21 83.32,55.16 83.38,55.26 83.43,55.37 83.47,55.39 83.55,55.53" />
    <polygon points="83.11,54.78 83.05,54.86 83.04,54.91 82.9,54.8 82.78,54.92 82.66,55.0 82.42,54.98 82.46,54.74 82.64,54.68 82.71,54.79 82.79,54.82 82.84,54.76 82.7,54.53 82.85,54.63 82.94,54.6 83.03,54.6 83.1,54.76 83.11,54.78" />
    <polygon points="84.17,54.6 84.12,54.75 83.95,54.85 83.77,54.9 83.59,54.95 83.49,54.88 83.32,54.91 83.3,54.69 83.35,54.66 83.46,54.58 83.59,54.64 83.7,54.73 83.78,54.71 83.89,54.68 84.03,54.74 84.13,54.6 84.13,54.49 84.17,54.6" />
    <polygon points="82.12,54.6 82.13,54.7 82.09,54.74 82.01,54.84 82.01,54.88 82.01,54.91 81.98,54.91 81.99,54.86 81.98,54.81 81.96,54.76 81.84,54.67 81.79,54.5 81.82,54.52 81.86,54.52 81.98,54.48 82.02,54.49 82.12,54.6" />
    <polygon points="88.59,54.19 88.62,54.23 88.61,54.35 88.58,54.41 88.57,54.49 88.53,54.53 88.5,54.59 88.46,54.66 88.4,54.66 88.27,54.66 88.26,54.5 88.28,54.44 88.32,54.3 88.34,54.23 88.49,54.1 88.57,54.13 88.59,54.19" />
    <polygon points="81.68,53.84 81.68,53.9 81.63,53.94 81.6,53.96 81.55,53.97 81.54,54.02 81.51,54.01 81.43,53.99 81.43,53.97 81.42,53.99 81.33,53.98 81.31,53.94 81.3,53.91 81.35,53.85 81.41,53.82 81.61,53.82 81.68,53.84" />
    <polygon points="84.21,52.9 84.18,53.01 84.14,53.06 84.1,53.13 84.08,53.15 84.08,52.96 84.12,52.89 84.11,52.81 84.12,52.72 84.13,52.56 84.19,52.47 84.22,52.59 84.21,52.64 84.18,52.63 84.16,52.76 84.15,52.86 84.19,52.87 84.21,52.9" />
    <polygon points="85.34,51.93 85.32,52.03 85.26,52.09 85.19,52.15 85.12,52.08 85.07,52.02 85.02,51.93 85.0,51.76 85.04,51.76 85.07,51.73 85.24,51.73 85.28,51.75 85.31,51.79 85.3,51.82 85.29,51.85 85.31,51.87 85.35,51.87 85.34,51.93" />
    <polygon points="86.35,51.99 86.31,52.13 86.15,51.96 85.99,51.89 85.82,51.79 85.75,51.89 85.61,51.77 85.56,51.87 85.54,51.85 85.56,51.7 85.59,51.62 85.7,51.58 85.88,51.64 85.89,51.63 86.0,51.56 86.1,51.65 86.29,51.88 86.35,51.99" />
    <polygon points="88.01,50.98 87.98,51.01 87.96,51.04 87.93,51.06 87.89,51.05 87.86,51.04 87.85,51.05 87.8,51.02 87.77,51.0 87.71,50.96 87.68,50.94 87.64,50.93 87.62,50.91 87.63,50.88 87.79,50.91 87.86,50.93 87.97,50.96 88.01,50.98" />
    <polygon points="79.66,51.42 79.61,51.63 79.65,51.71 79.6,51.72 79.53,51.62 79.39,51.3 79.36,51.18 79.29,51.18 79.2,51.09 79.27,50.91 79.33,50.85 79.37,50.98 79.37,50.9 79.42,50.84 79.46,50.94 79.48,51.0 79.56,51.38 79.66,51.42" />
    <polygon points="85.46,50.12 85.44,49.74 85.41,49.44 85.41,49.23 85.53,48.82 85.52,48.94 85.56,49.27 85.48,49.53 85.6,49.31 85.7,49.14 85.75,49.35 85.62,49.54 85.74,49.69 85.7,49.81 85.53,49.92 85.66,50.48 85.48,50.17 85.46,50.12" />
    <polygon points="78.35,46.52 78.74,47.48 78.74,48.04 78.88,48.75 78.93,49.25 78.78,49.25 78.49,48.87 78.19,48.49 78.03,47.93 77.95,47.69 77.95,47.35 77.88,47.17 77.83,46.51 77.92,46.39 78.08,46.55 78.15,46.76 78.35,46.61 78.35,46.52" />
    <polygon points="81.99,47.27 82.28,46.55 82.5,46.24 82.71,46.48 82.81,46.84 83.05,47.2 82.9,47.58 82.35,47.6 82.09,48.25 81.86,48.97 81.16,49.22 80.51,49.21 80.69,49.04 80.89,49.08 80.98,48.62 81.8,47.7 81.99,47.29 81.99,47.27" />
    <polygon points="30.69,59.73 30.6,66.74 30.29,71.53 30.03,75.64 30.29,79.85 29.84,79.33 29.54,79.13 29.69,78.85 29.41,78.04 29.32,77.26 29.27,76.47 29.14,75.7 29.66,74.98 29.68,73.2 29.99,68.98 30.38,64.45 30.61,59.91 30.69,59.73" />
    <polygon points="30.93,80.44 30.61,80.41 30.46,80.44 30.29,80.37 30.21,80.31 30.11,80.32 30.01,80.3 30.07,80.23 30.24,80.24 30.37,80.24 30.47,80.19 30.62,80.31 30.77,80.26 30.66,80.12 30.43,79.55 30.52,79.3 30.93,79.99 30.93,80.44" />
    <polygon points="31.11,80.9 31.02,80.84 30.89,80.83 30.87,80.7 30.77,80.68 30.7,80.69 30.77,80.77 30.72,80.8 30.62,80.72 30.58,80.68 30.68,80.58 30.91,80.53 30.95,80.62 31.0,80.66 30.92,80.71 31.03,80.77 31.11,80.9" />
    <polygon points="31.14,80.69 31.14,80.65 31.13,80.66 31.07,80.68 31.07,80.64 31.06,80.6 31.06,80.55 31.02,80.55 31.05,80.51 31.17,80.51 31.31,80.52 31.37,80.59 31.37,80.64 31.29,80.72 31.26,80.7 31.23,80.65 31.21,80.7 31.17,80.7 31.14,80.69" />
    <polygon points="29.85,80.04 29.77,80.07 29.79,80.01 29.78,79.9 29.69,80.01 29.63,79.91 29.58,79.81 29.67,79.81 29.64,79.77 29.67,79.68 29.74,79.71 29.76,79.79 29.81,79.78 29.88,79.79 29.96,79.89 29.89,79.98 29.86,80.03 29.85,80.04" />
    <polygon points="29.66,79.62 29.61,79.61 29.56,79.58 29.52,79.54 29.44,79.49 29.37,79.5 29.33,79.46 29.28,79.4 29.25,79.3 29.32,79.36 29.39,79.42 29.46,79.44 29.49,79.47 29.54,79.48 29.57,79.56 29.59,79.52 29.63,79.6 29.66,79.62" />
    <polygon points="29.11,77.65 29.07,77.48 29.08,77.41 29.17,77.37 29.22,77.21 29.18,77.13 29.27,77.07 29.31,77.22 29.29,77.56 29.32,77.67 29.25,77.78 29.19,77.73 29.2,77.63 29.21,77.55 29.22,77.43 29.16,77.58 29.14,77.7 29.11,77.65" />
    <polygon points="29.35,74.05 29.38,73.9 29.4,73.76 29.39,73.59 29.43,73.3 29.44,73.22 29.44,73.25 29.55,73.23 29.57,73.29 29.61,73.45 29.53,73.57 29.5,73.63 29.59,73.8 29.56,73.87 29.52,73.96 29.53,74.1 29.44,74.1 29.35,74.05" />
    <polygon points="30.69,59.73 30.79,58.48 30.87,57.09 31.15,55.92 31.72,55.44 31.82,55.89 31.94,56.61 32.25,56.96 32.6,57.22 33.16,57.63 33.76,59.25 33.89,60.83 32.7,61.42 32.09,62.5 31.38,62.58 30.96,61.06 30.7,59.79 30.69,59.73" />
    <polygon points="30.69,59.73 29.62,59.07 28.81,57.84 28.44,56.23 28.16,55.09 27.45,52.83 27.64,52.46 28.24,51.88 29.09,50.06 29.58,50.82 30.14,51.28 30.55,52.41 29.96,52.6 29.51,54.38 30.39,55.25 30.84,57.74 30.69,59.73" />
    <polygon points="31.34,62.68 32.88,62.93 33.84,64.79 34.83,64.37 34.8,65.31 33.86,67.95 32.84,71.66 31.9,72.74 31.88,74.66 31.44,76.1 30.94,77.76 29.71,77.53 30.21,74.81 30.05,72.29 30.44,69.71 30.6,66.76 31.32,63.19 31.34,62.68" />
    <polygon points="30.93,80.43 30.95,79.27 31.05,79.51 30.96,79.54 31.09,79.66 31.19,79.88 31.31,80.03 31.53,80.25 31.71,80.36 31.89,80.38 31.87,80.46 31.83,80.49 31.76,80.54 31.73,80.5 31.63,80.55 31.48,80.56 31.09,80.47 30.95,80.47 30.93,80.43" />
    <polygon points="59.36,30.56 59.33,30.65 59.27,30.71 59.16,30.76 59.14,30.74 59.11,30.73 59.03,30.72 58.98,30.61 58.98,30.52 59.04,30.46 59.08,30.47 59.13,30.52 59.17,30.48 59.23,30.47 59.28,30.47 59.29,30.55 59.32,30.56 59.36,30.56 59.36,30.56" />
    <polygon points="71.61,30.28 72.42,34.13 74.65,34.69 76.87,34.2 75.82,37.76 75.18,36.02 74.63,36.48 74.5,37.9 73.35,39.85 72.18,43.32 71.19,44.42 70.48,41.33 70.24,39.27 70.07,37.63 69.49,37.25 69.32,34.93 71.39,30.56 71.61,30.28" />
    <polygon points="75.85,42.62 75.81,42.77 75.82,42.84 75.81,43.1 75.8,43.16 75.78,43.28 75.78,43.39 75.77,43.54 75.73,43.54 75.7,43.42 75.73,43.33 75.77,43.22 75.76,42.98 75.79,42.77 75.8,42.54 75.84,42.46 75.83,42.6 75.85,42.62" />
    <polygon points="71.92,31.45 72.75,24.91 81.92,24.79 85.06,20.85 86.42,25.04 84.07,28.04 83.42,29.06 83.55,31.57 83.8,34.01 83.2,35.52 82.5,36.87 81.46,37.74 80.49,38.23 79.62,37.68 77.45,36.6 74.47,34.51 71.98,31.51 71.92,31.45" />
    <polygon points="80.84,39.06 80.75,39.22 80.71,39.42 80.69,39.57 80.57,39.76 80.49,39.78 80.44,39.91 80.32,39.84 80.17,39.52 80.19,39.25 80.35,39.04 80.35,38.95 80.44,38.9 80.54,38.89 80.62,38.87 80.7,38.88 80.8,38.89 80.84,39.06" />
    <polygon points="59.51,32.66 59.7,31.91 59.75,31.62 59.88,31.51 59.94,31.47 59.9,31.84 59.88,31.93 59.88,31.99 59.73,32.03 59.73,32.27 59.78,32.32 59.79,32.36 59.69,32.56 59.83,32.78 59.76,33.19 59.7,33.62 59.58,32.97 59.51,32.66" />
    <polygon points="59.75,31.62 59.78,31.53 59.84,31.27 59.88,31.16 59.9,31.04 59.95,30.86 60.04,30.76 60.12,30.78 60.12,30.83 60.15,30.92 60.13,31.07 60.1,31.2 60.0,31.24 60.01,31.35 59.92,31.49 59.87,31.52 59.79,31.62 59.75,31.62" />
    <polygon points="59.46,44.75 59.76,43.41 60.12,42.24 60.44,42.11 60.83,41.87 61.61,42.69 61.8,43.86 62.05,44.7 63.21,45.79 62.2,47.25 61.22,47.71 60.71,47.99 59.98,47.46 59.69,46.59 59.37,45.75 59.22,45.43 59.47,44.89 59.46,44.75" />
    <polygon points="59.98,47.43 58.9,48.01 58.49,47.95 58.19,47.41 57.85,47.58 57.62,47.18 57.36,46.61 57.2,46.09 56.93,45.56 56.89,44.71 57.11,44.24 58.25,44.38 59.27,44.09 59.22,45.33 59.27,45.7 59.65,46.31 59.93,47.18 59.98,47.43" />
    <polygon points="62.91,46.37 63.44,45.2 63.76,43.67 64.03,43.45 64.21,43.59 64.23,44.2 64.24,44.22 64.07,44.94 63.82,45.78 62.87,48.47 62.23,49.4 61.74,50.39 61.66,50.59 61.45,50.67 61.38,48.47 61.95,47.46 62.7,46.8 62.91,46.37" />
    <polygon points="59.92,47.43 60.46,47.81 60.89,48.07 61.39,47.73 61.38,49.65 61.42,51.1 61.37,51.28 61.16,51.63 61.05,51.98 60.99,52.24 60.84,52.53 60.26,51.47 59.53,49.59 59.71,48.87 59.56,48.16 59.47,47.84 59.92,47.43" />
    <polygon points="59.71,56.43 59.94,58.1 59.81,59.0 59.81,59.49 59.62,59.14 59.6,58.39 59.35,58.08 59.16,57.75 59.16,57.29 59.28,56.93 59.24,56.33 59.35,55.88 59.2,55.33 59.28,55.34 59.54,55.43 59.63,55.98 59.71,56.42 59.71,56.43" />
    <polygon points="59.14,55.23 58.55,54.61 58.45,52.0 58.45,51.56 58.49,50.74 59.9,51.07 60.87,52.78 60.82,53.59 60.93,54.11 60.99,54.96 61.03,55.32 61.16,55.7 60.78,56.23 60.28,56.43 59.86,56.43 59.61,55.85 59.22,55.28 59.14,55.23" />
    <polygon points="59.93,31.81 59.98,31.39 60.05,31.21 60.16,30.98 60.09,30.84 60.02,30.76 59.97,30.49 59.94,30.19 60.07,30.02 60.17,29.82 60.27,29.58 60.82,29.62 61.73,29.28 61.49,29.73 61.3,30.93 60.2,32.04 59.98,31.85 59.93,31.81" />
    <polygon points="63.59,43.75 63.56,44.85 63.11,45.56 62.67,45.3 62.22,45.0 62.03,44.67 61.9,44.33 61.89,43.99 62.04,43.66 62.11,43.81 62.42,44.21 62.62,44.07 62.73,43.98 62.9,44.06 63.06,43.92 63.37,43.81 63.44,43.73 63.59,43.75" />
    <polygon points="34.97,48.83 34.83,48.71 34.95,48.35 35.0,48.04 34.91,47.78 34.87,47.37 34.99,46.94 35.19,46.92 35.37,47.11 35.47,47.34 35.58,47.41 35.65,47.64 35.53,48.05 35.4,48.53 35.27,48.79 35.08,48.72 34.99,48.78 34.97,48.83" />
    <polygon points="50.7,21.62 51.38,22.33 52.28,22.8 51.88,23.82 51.98,24.76 51.97,25.8 51.39,25.82 50.48,26.37 49.56,25.96 49.69,24.43 49.32,23.73 49.13,23.59 48.81,23.24 48.9,22.94 49.38,22.99 49.48,22.42 50.59,21.66 50.7,21.62" />
    <polygon points="52.38,26.55 52.39,26.49 52.41,26.43 52.44,26.35 52.59,26.24 52.63,26.12 52.63,26.33 52.65,26.6 52.6,26.88 52.58,26.95 52.53,27.0 52.48,26.94 52.46,26.86 52.42,26.79 52.44,26.71 52.42,26.63 52.38,26.55" />
    <polygon points="34.98,48.16 34.86,48.66 34.68,48.59 34.41,48.7 34.25,48.87 34.13,48.46 34.09,48.23 33.98,48.08 33.92,47.47 34.08,47.19 34.1,46.96 34.41,46.75 34.66,46.72 34.72,46.74 34.95,47.04 34.9,47.69 34.98,48.16" />
    <polygon points="34.31,48.92 33.84,49.14 33.52,49.18 33.36,48.69 33.42,47.94 33.36,47.51 33.21,47.12 33.0,46.32 33.16,46.0 33.34,45.46 33.71,45.8 33.94,46.33 34.07,47.05 33.93,47.27 33.99,48.12 34.12,48.36 34.31,48.91 34.31,48.92" />
    <polygon points="85.66,28.54 85.95,30.29 85.73,30.45 85.57,30.58 85.42,30.63 85.36,30.73 85.14,30.9 85.11,30.75 85.11,30.65 85.1,30.42 85.22,29.99 85.13,29.62 85.06,29.51 85.16,29.5 85.26,29.49 85.22,29.28 85.62,28.65 85.66,28.54" />
    <polygon points="85.66,28.54 84.98,28.97 84.87,28.99 84.76,28.83 84.85,28.5 84.8,28.27 84.68,27.93 84.59,27.66 84.96,27.28 85.3,26.87 85.6,26.8 85.99,26.46 86.28,26.43 86.09,26.72 85.88,27.44 85.42,27.92 85.62,28.48 85.66,28.54" />
    <polygon points="47.55,34.63 46.64,35.65 45.58,38.06 45.48,37.28 45.55,36.86 45.89,35.86 46.38,34.58 47.22,33.52 47.36,32.28 47.88,31.33 48.44,30.1 48.91,30.42 49.22,30.49 49.52,31.26 49.63,32.17 48.72,33.18 47.59,34.4 47.55,34.63" />
    <polygon points="47.55,34.63 47.59,35.37 47.31,35.56 46.8,35.56 46.66,36.1 46.66,36.86 46.35,37.4 45.74,38.15 45.25,38.42 45.63,38.06 46.02,37.67 46.23,36.74 46.56,36.18 46.75,35.47 47.01,34.99 47.4,34.95 47.55,34.63" />
    <polygon points="26.75,43.92 26.96,44.52 26.96,44.8 26.94,45.4 26.9,45.22 26.86,45.28 26.77,45.12 26.63,44.79 26.49,44.57 26.33,44.32 26.42,44.55 26.24,44.52 26.19,44.14 26.16,43.97 26.19,43.87 26.58,43.93 26.76,43.94 26.75,43.92" />
    <polygon points="26.19,43.84 25.8,43.08 25.69,42.76 25.91,42.59 26.08,42.2 26.26,42.16 26.38,41.82 26.63,41.82 26.76,41.73 26.89,41.69 26.85,41.8 26.77,43.08 26.74,43.07 26.73,43.32 26.72,43.64 26.62,44.01 26.21,43.78 26.19,43.84" />
    <polygon points="55.17,48.07 54.91,50.34 54.5,51.68 54.0,52.64 53.75,52.65 53.29,52.66 53.24,51.58 53.58,51.16 53.83,51.22 54.01,50.93 53.88,50.14 53.92,49.23 53.65,49.02 54.15,48.89 54.47,48.86 54.76,48.01 55.17,48.07" />
    <polygon points="55.17,48.07 56.15,47.67 56.81,47.17 57.29,47.12 58.0,47.51 58.55,48.53 58.18,50.81 57.93,55.26 58.15,56.89 57.74,56.81 56.78,56.24 56.09,54.65 55.07,54.44 54.64,53.43 53.65,52.56 54.51,51.83 55.17,48.07" />
    <polygon points="75.13,34.4 75.31,34.45 75.46,34.49 75.48,34.74 75.55,34.91 75.52,35.09 75.41,35.07 75.26,35.12 74.97,35.16 74.93,35.16 74.79,35.1 74.7,35.01 74.69,34.82 74.73,34.67 74.84,34.45 74.98,34.27 75.16,34.31 75.13,34.4" />
    <polygon points="58.82,21.06 59.62,21.55 60.63,22.19 61.07,23.27 60.07,24.1 59.3,24.41 58.89,24.09 58.54,24.15 58.25,24.75 58.06,24.34 58.2,23.86 57.72,23.09 56.49,23.34 56.3,22.55 57.24,21.17 58.31,21.41 58.82,21.06" />
    <polygon points="56.56,21.38 56.5,21.01 56.58,20.05 57.08,19.84 57.15,19.56 57.39,19.1 58.05,18.88 58.59,19.12 58.63,19.73 59.05,20.29 58.76,20.45 58.81,21.01 58.51,21.27 58.44,21.5 58.01,21.36 57.64,21.32 56.56,21.37 56.56,21.38" />
    <polygon points="54.58,65.87 54.2,64.8 54.05,63.56 54.01,62.41 53.36,60.3 53.52,59.54 54.04,59.66 55.6,59.94 56.64,59.75 56.99,59.85 56.68,60.06 56.34,60.03 55.83,61.86 55.55,64.85 55.34,66.06 54.83,65.74 54.66,65.8 54.58,65.87" />
    <polygon points="55.55,63.75 55.83,64.91 56.49,64.05 57.51,63.14 57.81,62.66 58.59,62.39 58.74,65.17 58.63,66.55 57.75,68.34 56.9,68.99 55.93,69.12 55.23,68.99 55.03,68.42 54.89,67.19 54.67,65.68 55.27,66.04 55.55,63.95 55.55,63.75" />
    <polygon points="65.66,36.12 66.25,36.87 66.38,37.08 66.59,37.49 66.37,38.25 66.26,38.6 66.14,38.57 66.03,39.07 65.77,39.61 65.41,40.08 65.31,40.5 65.1,40.54 64.65,40.39 65.3,38.75 65.43,36.74 65.49,36.35 65.62,36.2 65.66,36.12" />
    <polygon points="69.71,27.65 69.25,27.44 68.98,28.04 68.92,28.64 68.49,29.19 67.22,27.3 66.52,26.51 65.82,26.74 65.84,24.87 68.04,25.72 68.91,27.19 69.05,27.37 69.28,26.96 69.73,26.51 69.89,26.95 70.17,27.49 69.78,27.61 69.71,27.65" />
    <polygon points="74.26,22.73 72.32,25.47 70.52,26.05 69.18,27.02 68.28,26.18 64.61,26.49 64.16,25.03 64.42,23.95 63.48,23.67 64.24,21.29 65.68,21.64 66.84,21.03 67.53,19.9 69.72,19.57 70.48,20.22 72.71,21.79 74.24,22.66 74.26,22.73" />
    <polygon points="69.71,27.65 69.27,27.8 69.61,28.01 69.99,28.14 70.47,28.3 70.78,28.84 70.61,29.26 69.95,29.61 69.82,28.73 69.49,28.92 69.27,29.21 69.06,29.33 68.96,28.89 68.79,28.26 69.12,27.85 69.33,27.38 69.6,27.61 69.71,27.65" />
    <polygon points="57.39,19.07 57.4,19.35 57.17,19.51 57.09,19.81 57.13,19.93 56.9,19.92 56.76,20.06 56.52,20.02 56.4,19.81 56.32,19.59 56.15,19.42 55.91,19.29 55.87,19.06 56.16,18.66 56.59,18.7 56.92,18.65 57.37,19.07 57.39,19.07" />
    <polygon points="34.0,66.77 34.52,62.52 32.74,57.3 30.38,56.07 30.66,50.41 32.99,47.49 34.81,48.71 35.58,50.87 36.84,50.43 37.35,50.71 37.7,51.41 39.68,52.74 39.31,57.11 38.33,62.77 36.58,64.07 35.95,66.92 34.0,66.78 34.0,66.77" />
    <polygon points="36.54,50.32 36.49,50.57 36.44,50.79 36.42,50.82 36.33,50.85 36.28,50.84 36.24,50.92 36.16,51.01 36.05,50.91 36.04,50.91 35.9,50.82 35.97,50.61 35.89,50.46 35.92,50.35 36.01,50.07 36.33,50.08 36.56,50.18 36.54,50.32" />
    <polygon points="34.0,66.77 34.17,66.72 34.4,67.01 34.51,67.22 34.71,67.39 34.97,67.71 35.15,68.06 35.15,68.72 34.93,69.27 34.76,69.41 34.44,69.37 34.25,69.28 33.95,69.15 33.78,68.59 33.84,68.09 33.89,67.45 33.92,66.95 34.0,66.77" />
    <polygon points="82.41,22.32 83.29,23.92 82.72,24.16 81.28,25.05 80.41,26.42 76.48,25.47 75.35,24.93 75.09,23.54 74.46,23.03 74.78,22.47 75.66,21.74 76.68,22.22 77.2,21.54 78.38,21.56 79.5,22.06 80.61,22.69 82.28,22.21 82.41,22.32" />
    <polygon points="74.39,22.69 66.27,21.64 61.84,26.04 58.84,19.97 61.3,12.33 63.59,12.39 69.63,12.94 72.44,9.68 80.39,7.36 85.79,9.58 94.74,11.93 97.63,16.26 93.77,17.85 92.14,16.98 88.96,22.88 85.97,22.54 74.48,22.58 74.39,22.69" />
    <polygon points="56.32,19.8 55.47,19.76 55.53,19.63 55.53,19.51 55.66,19.47 55.82,19.31 55.79,19.36 55.71,19.48 55.86,19.5 55.88,19.35 55.91,19.33 56.03,19.36 56.12,19.4 56.23,19.41 56.31,19.47 56.34,19.57 56.31,19.61 56.32,19.8" />
    <polygon points="59.34,24.38 59.57,24.47 59.93,24.8 60.04,24.74 60.17,24.81 60.08,24.97 59.85,24.94 59.76,25.07 59.58,25.15 59.47,25.32 59.27,25.23 59.31,25.11 59.23,24.9 59.07,24.71 59.21,24.58 59.35,24.52 59.35,24.44 59.34,24.38" />
    <polygon points="0.0,13.85 0.54,12.07 0.92,12.25 1.31,12.43 1.42,12.78 1.67,13.11 1.61,12.76 1.89,12.83 2.62,13.13 2.63,13.43 2.14,13.52 2.16,13.84 2.02,14.2 1.62,14.12 0.94,13.59 0.39,13.14 0.14,13.72 0.0,13.85" />
    <polygon points="100.0,10.26 99.97,10.58 99.91,10.63 99.78,10.62 99.66,10.66 99.66,10.64 99.64,10.6 99.63,10.57 99.62,10.53 99.62,10.52 99.67,10.46 99.68,10.44 99.68,10.44 99.68,10.44 99.83,10.34 99.88,10.3 99.93,10.29 99.94,10.28 99.96,10.28 100.0,10.26" />
    <polygon points="0.0,10.56 0.03,10.25 0.08,10.23 0.19,10.25 0.35,10.24 0.47,10.27 0.51,10.29 0.54,10.32 0.56,10.34 0.65,10.39 0.69,10.39 0.71,10.42 0.66,10.49 0.57,10.53 0.28,10.58 0.15,10.6 0.03,10.56 0.0,10.56" />
    <polygon points="89.59,19.83 89.7,20.08 89.75,20.34 89.79,20.8 89.8,21.28 89.87,21.53 90.07,22.72 89.6,23.36 89.83,24.04 89.84,24.43 89.51,24.34 89.45,23.48 89.48,22.25 89.41,21.33 89.41,20.64 89.59,20.31 89.52,19.83 89.59,19.83" />
    <polygon points="64.28,10.11 64.56,9.84 64.66,9.65 64.8,9.41 65.67,9.43 65.42,9.7 65.34,10.04 65.96,10.75 65.68,10.7 65.58,10.74 65.38,10.72 65.17,10.73 64.88,10.62 65.02,10.44 64.81,10.34 64.62,10.25 64.28,10.15 64.28,10.11" />
    <polygon points="65.83,8.51 65.48,8.29 66.02,8.1 66.82,7.77 67.46,7.65 68.29,7.42 69.06,7.53 67.3,8.09 66.83,8.27 66.6,8.56 66.3,8.75 65.98,8.82 65.76,9.08 65.18,9.22 64.91,9.04 65.35,8.73 65.66,8.49 65.83,8.51" />
    <polygon points="91.33,24.77 91.24,24.86 91.07,25.02 91.01,25.03 90.94,25.15 90.83,25.31 90.82,25.26 90.84,25.23 90.89,25.15 90.91,25.07 90.97,24.96 91.04,24.9 91.07,24.8 91.11,24.82 91.23,24.8 91.28,24.74 91.34,24.75 91.33,24.77" />
    <polygon points="95.75,17.24 95.74,17.27 95.65,17.31 95.62,17.33 95.6,17.32 95.55,17.37 95.5,17.42 95.41,17.53 95.39,17.47 95.46,17.39 95.49,17.31 95.53,17.23 95.5,17.21 95.48,17.22 95.64,17.15 95.72,17.09 95.73,17.12 95.73,17.17 95.75,17.22 95.75,17.24" />
    <polygon points="63.98,11.58 63.93,11.66 63.94,11.58 63.86,11.66 63.79,11.74 63.68,11.79 63.53,11.8 63.45,11.77 63.42,11.73 63.4,11.73 63.41,11.68 63.39,11.66 63.39,11.63 63.41,11.57 63.44,11.48 63.63,11.38 63.98,11.58" />
    <polygon points="97.07,11.19 97.07,11.21 97.06,11.23 97.06,11.24 97.02,11.24 97.02,11.27 97.03,11.3 97.01,11.34 96.96,11.35 96.71,11.28 96.68,11.24 96.61,11.22 96.62,11.18 96.73,11.11 96.74,11.1 96.88,11.13 97.02,11.17 97.07,11.19" />
    <polygon points="66.82,11.21 66.8,11.27 66.65,11.29 66.54,11.25 66.49,11.17 66.4,11.16 66.36,11.15 66.27,11.03 66.25,11.01 66.24,10.96 66.26,10.92 66.32,10.89 66.38,10.85 66.53,10.96 66.6,11.02 66.69,11.07 66.81,11.19 66.82,11.21" />
    <polygon points="71.74,9.69 71.78,9.73 71.74,9.75 71.69,9.78 71.65,9.79 71.6,9.83 71.44,9.84 71.37,9.84 71.35,9.81 71.36,9.8 71.45,9.74 71.46,9.73 71.48,9.7 71.51,9.68 71.56,9.65 71.67,9.67 71.73,9.68 71.74,9.69" />
    <polygon points="69.91,9.32 69.93,9.43 69.81,9.36 69.5,9.42 69.45,9.4 69.47,9.43 69.41,9.42 69.45,9.34 69.45,9.27 69.57,9.17 69.79,9.19 69.76,9.21 69.74,9.25 69.72,9.3 69.79,9.29 69.81,9.27 69.89,9.29 69.91,9.32" />
    <polygon points="89.85,9.27 89.87,9.33 89.59,9.33 89.31,9.28 89.03,9.22 88.84,9.26 88.91,9.19 89.07,9.12 89.11,9.06 89.14,9.0 89.21,8.96 89.27,8.96 89.58,8.97 89.71,9.06 89.84,9.14 89.85,9.22 89.85,9.24 89.85,9.25 89.85,9.26 89.85,9.27" />
    <polygon points="81.5,8.64 81.51,8.66 81.49,8.68 81.46,8.72 81.45,8.74 81.43,8.76 81.37,8.79 81.33,8.84 81.24,8.82 81.12,8.78 80.97,8.73 80.98,8.69 81.06,8.69 81.1,8.68 81.1,8.66 81.11,8.64 81.11,8.59 81.32,8.61 81.49,8.63 81.5,8.64" />
    <polygon points="91.9,8.24 91.86,8.32 91.86,8.36 91.45,8.47 90.98,8.35 90.59,8.19 90.61,8.12 90.67,8.07 90.75,8.04 90.73,8.09 90.93,8.14 90.93,8.11 91.15,8.1 91.27,8.2 91.52,8.19 91.73,8.24 91.85,8.26 91.9,8.24" />
    <polygon points="90.38,8.03 90.12,8.29 89.64,8.19 89.63,7.93 89.49,8.1 89.67,8.4 89.04,8.4 88.77,8.42 88.04,8.19 88.13,8.05 88.1,7.9 88.36,7.73 88.55,7.66 88.84,7.85 89.16,7.96 89.27,7.7 90.05,7.91 90.38,8.03" />
    <polygon points="76.85,7.63 76.83,7.66 76.83,7.69 76.81,7.67 76.8,7.63 76.77,7.63 76.78,7.66 76.74,7.66 76.77,7.7 76.77,7.71 76.72,7.69 76.58,7.67 76.48,7.64 76.48,7.62 76.53,7.62 76.56,7.64 76.62,7.61 76.69,7.63 76.7,7.65 76.75,7.61 76.85,7.63" />
    <polygon points="76.81,7.11 76.82,7.14 76.8,7.18 76.77,7.19 76.74,7.2 76.75,7.21 76.75,7.21 76.73,7.23 76.7,7.22 76.67,7.23 76.58,7.25 76.6,7.24 76.61,7.23 76.65,7.21 76.63,7.21 76.53,7.22 76.45,7.22 76.47,7.21 76.51,7.19 76.58,7.18 76.75,7.13 76.8,7.11 76.81,7.11" />
    <polygon points="79.92,6.59 79.89,6.62 79.85,6.64 79.84,6.63 79.84,6.62 79.78,6.62 79.55,6.59 79.58,6.58 79.7,6.56 79.7,6.57 79.78,6.57 79.79,6.58 79.8,6.57 79.8,6.57 79.82,6.56 79.89,6.57 79.9,6.58 79.91,6.58 79.92,6.59" />
    <polygon points="79.28,6.34 78.64,6.53 78.33,6.55 77.6,6.65 77.79,6.43 77.85,6.3 78.03,6.23 78.23,6.12 78.19,5.98 78.32,5.95 78.39,5.88 78.55,6.01 78.45,6.19 78.71,6.05 78.89,6.05 79.07,6.21 79.23,6.26 79.28,6.34" />
    <polygon points="71.56,5.82 71.56,5.83 71.43,5.84 71.29,5.84 71.3,5.83 71.3,5.82 71.28,5.81 71.27,5.81 71.16,5.79 71.13,5.76 71.14,5.74 71.17,5.75 71.16,5.76 71.17,5.77 71.22,5.77 71.25,5.75 71.45,5.79 71.56,5.82" />
    <polygon points="76.01,5.59 76.06,5.61 76.02,5.65 75.91,5.68 75.63,5.74 75.54,5.73 75.54,5.72 75.6,5.7 75.64,5.71 75.65,5.69 75.49,5.65 75.29,5.63 75.32,5.61 75.34,5.59 75.29,5.57 75.33,5.55 75.31,5.53 75.25,5.53 75.35,5.52 75.57,5.53 75.87,5.58 76.01,5.59" />
    <polygon points="64.26,5.58 64.3,5.59 64.3,5.6 64.16,5.59 63.9,5.57 63.9,5.57 64.04,5.56 64.06,5.54 64.08,5.53 64.16,5.5 64.17,5.51 64.19,5.52 64.24,5.53 64.22,5.54 64.22,5.55 64.23,5.56 64.26,5.57 64.27,5.58 64.26,5.58" />
    <polygon points="77.75,6.09 77.15,6.21 76.65,6.12 76.38,6.07 76.17,5.84 76.03,5.79 75.86,5.82 76.21,5.62 76.42,5.53 76.82,5.48 77.18,5.56 77.0,5.72 77.34,5.6 77.6,5.56 77.78,5.67 77.7,5.87 77.67,6.02 77.75,6.09" />
    <polygon points="65.5,5.2 65.46,5.19 65.47,5.17 65.42,5.17 65.4,5.16 65.43,5.15 65.48,5.15 65.49,5.14 65.6,5.13 65.72,5.12 65.71,5.13 65.79,5.15 65.82,5.17 65.82,5.18 65.81,5.19 65.65,5.21 65.65,5.2 65.51,5.2 65.5,5.2" />
    <polygon points="62.97,5.26 62.92,5.29 62.79,5.27 62.73,5.25 62.69,5.25 62.6,5.24 62.53,5.19 62.89,5.14 63.09,5.1 63.47,5.11 63.52,5.18 63.53,5.21 63.34,5.17 63.23,5.14 63.19,5.15 63.14,5.19 63.09,5.22 62.96,5.24 62.97,5.26" />
    <polygon points="67.28,5.1 67.29,5.15 67.24,5.21 67.11,5.24 67.05,5.28 66.97,5.33 66.71,5.29 66.53,5.29 66.49,5.24 66.45,5.19 66.47,5.16 66.55,5.12 66.61,5.09 66.66,5.11 66.77,5.12 67.09,5.07 67.28,5.1" />
    <polygon points="66.15,5.12 66.14,5.12 66.08,5.12 66.07,5.11 66.06,5.11 66.07,5.1 66.09,5.09 66.1,5.09 66.12,5.09 66.15,5.07 66.24,5.06 66.32,5.05 66.37,5.07 66.38,5.07 66.38,5.08 66.39,5.09 66.4,5.1 66.39,5.1 66.39,5.1 66.39,5.11 66.37,5.12 66.36,5.13 66.33,5.12 66.3,5.12 66.26,5.14 66.23,5.14 66.15,5.12" />
    <polygon points="65.49,5.12 65.24,5.15 65.19,5.14 65.19,5.13 65.18,5.12 65.15,5.12 65.0,5.11 64.99,5.1 65.03,5.08 65.11,5.08 65.21,5.07 65.21,5.08 65.23,5.09 65.25,5.08 65.27,5.06 65.3,5.05 65.38,5.08 65.55,5.11 65.49,5.12" />
    <polygon points="64.36,5.15 63.91,5.27 63.55,5.35 63.61,5.46 63.41,5.49 63.23,5.49 63.16,5.45 63.12,5.38 63.39,5.32 63.39,5.26 63.6,5.26 63.71,5.21 63.67,5.17 63.8,5.08 64.13,5.05 63.97,5.14 64.19,5.14 64.36,5.15" />
    <polygon points="72.17,5.01 72.26,5.02 72.34,5.03 72.34,5.06 72.33,5.06 72.33,5.07 72.31,5.08 72.2,5.09 72.09,5.1 71.98,5.11 71.95,5.1 71.94,5.09 71.94,5.08 71.97,5.06 71.98,5.04 71.98,5.03 72.0,5.03 72.0,5.02 72.0,5.02 72.01,5.03 72.15,5.01 72.17,5.01" />
    <polygon points="65.93,5.06 65.89,5.05 65.9,5.04 65.87,5.02 65.82,5.02 65.81,5.01 65.8,5.0 65.8,4.99 65.78,4.99 65.69,4.97 65.58,4.95 65.58,4.94 65.6,4.93 65.62,4.94 65.77,4.95 65.82,4.96 65.9,4.96 66.02,4.99 66.02,5.0 66.12,5.03 66.18,5.05 66.08,5.08 65.98,5.08 65.93,5.06" />
    <polygon points="65.16,5.0 65.12,4.98 65.15,4.96 65.19,4.93 65.42,5.0 65.73,5.01 66.02,5.1 66.02,5.12 65.85,5.17 65.75,5.12 65.75,5.11 65.49,5.08 65.48,5.06 65.39,5.02 65.34,5.03 65.24,5.01 65.16,5.0" />
    <polygon points="75.43,4.91 75.44,4.92 75.44,4.92 75.43,4.93 75.38,4.94 75.37,4.95 75.37,4.96 75.33,4.97 75.22,4.96 75.11,4.95 75.0,4.94 74.99,4.94 74.98,4.93 74.98,4.93 74.98,4.92 74.98,4.91 74.98,4.91 74.97,4.9 74.98,4.9 75.01,4.89 75.02,4.88 75.02,4.88 75.15,4.88 75.28,4.89 75.4,4.89 75.43,4.91" />
    <polygon points="77.15,5.14 77.03,5.18 76.99,5.28 77.06,5.38 76.32,5.49 75.57,5.46 75.68,5.44 75.9,5.38 75.46,5.34 75.76,5.27 75.8,5.18 75.75,5.09 75.85,5.0 76.44,4.88 76.71,4.89 76.85,5.01 77.15,5.11 77.15,5.14" />
    <polygon points="65.91,4.76 65.77,4.75 65.77,4.74 65.82,4.73 65.84,4.72 65.83,4.72 65.84,4.7 65.98,4.7 65.97,4.69 65.98,4.69 66.06,4.69 66.05,4.7 66.07,4.71 66.07,4.72 66.07,4.72 66.15,4.73 66.26,4.76 66.25,4.78 66.2,4.79 66.05,4.79 66.0,4.78 65.99,4.77 65.98,4.76 65.91,4.76" />
    <polygon points="67.36,4.64 67.37,4.63 67.25,4.63 67.25,4.62 67.27,4.61 67.28,4.61 67.28,4.61 67.35,4.6 67.37,4.61 67.4,4.6 67.45,4.6 67.44,4.6 67.43,4.61 67.56,4.61 67.69,4.61 67.72,4.63 67.72,4.65 67.71,4.65 67.7,4.66 67.63,4.67 67.58,4.67 67.56,4.67 67.49,4.66 67.41,4.66 67.39,4.65 67.37,4.65 67.36,4.64" />
    <polygon points="66.19,4.6 66.08,4.61 66.08,4.6 66.09,4.59 66.09,4.59 66.1,4.58 66.15,4.57 66.11,4.56 66.1,4.55 66.15,4.54 66.35,4.53 66.47,4.53 66.51,4.55 66.5,4.55 66.49,4.57 66.49,4.58 66.39,4.59 66.19,4.6" />
    <polygon points="65.48,5.5 65.56,5.44 65.56,5.42 65.54,5.41 65.55,5.39 65.55,5.38 65.59,5.36 65.75,5.36 65.84,5.35 65.87,5.39 65.86,5.42 65.87,5.44 65.87,5.45 65.85,5.47 65.87,5.49 65.82,5.52 65.54,5.51 65.48,5.5" />
    <polygon points="64.62,5.45 64.53,5.43 64.52,5.4 64.61,5.39 64.64,5.38 64.64,5.37 64.63,5.36 64.68,5.33 64.73,5.33 64.8,5.33 64.82,5.36 64.96,5.41 64.93,5.43 64.91,5.43 64.9,5.42 64.88,5.43 64.87,5.45 64.74,5.46 64.62,5.45" />
    <polygon points="65.98,5.48 65.91,5.46 65.89,5.42 65.9,5.38 65.91,5.34 66.03,5.29 66.33,5.32 66.46,5.36 66.27,5.38 66.15,5.4 66.14,5.42 66.24,5.44 66.18,5.45 66.13,5.45 66.09,5.45 66.1,5.47 66.1,5.5 65.98,5.48" />
    <polygon points="66.74,4.98 66.75,4.97 66.81,4.96 66.84,4.95 66.94,4.94 67.03,4.94 67.13,4.94 67.14,4.94 67.13,4.94 67.13,4.95 67.12,4.95 67.11,4.96 67.12,4.96 67.12,4.96 67.12,4.97 67.12,4.98 67.11,4.98 67.03,5.01 66.94,5.04 66.85,5.04 66.76,5.03 66.74,5.02 66.69,5.01 66.67,5.0 66.68,5.0 66.72,4.99 66.74,4.98" />
    <polygon points="67.44,5.06 67.54,5.02 67.83,4.99 67.84,4.97 67.81,4.95 67.84,4.93 67.9,4.89 68.12,4.92 68.18,4.98 68.16,5.01 68.18,5.04 68.07,5.09 67.96,5.12 67.81,5.15 67.54,5.18 67.36,5.11 67.37,5.09 67.44,5.06" />
    <polygon points="65.46,4.89 65.44,4.87 65.44,4.85 65.4,4.84 65.42,4.83 65.48,4.82 65.51,4.82 65.53,4.83 65.62,4.85 65.71,4.85 65.67,4.81 65.66,4.79 65.76,4.78 65.79,4.79 65.95,4.81 66.0,4.82 65.95,4.85 65.68,4.9 65.62,4.87 65.46,4.89" />
    <polygon points="54.11,21.75 54.27,21.79 54.52,21.95 54.71,22.1 54.84,22.09 55.0,22.22 55.22,22.43 54.85,22.87 54.42,22.88 54.15,22.88 53.9,22.97 53.59,22.6 53.46,22.26 53.41,22.11 53.63,21.95 53.87,21.78 54.06,21.75 54.11,21.75" />
    <polygon points="53.84,22.91 53.5,23.52 52.82,23.73 52.38,23.55 52.23,22.9 51.8,22.37 51.68,21.74 51.95,20.94 52.32,20.22 52.4,19.84 52.83,19.81 53.37,19.88 53.64,19.84 53.93,20.61 54.0,21.66 53.4,22.1 53.8,22.85 53.84,22.91" />
    <polygon points="56.75,17.85 56.74,17.62 56.59,17.55 56.54,17.37 56.51,17.35 56.52,17.23 56.66,17.06 56.85,16.97 56.97,16.93 57.16,16.87 57.38,16.91 57.75,17.06 57.72,17.84 57.6,18.03 57.34,18.02 57.05,17.76 56.86,17.8 56.75,17.85" />
    <polygon points="56.45,17.5 56.44,17.52 56.42,17.54 56.38,17.58 56.29,17.64 56.25,17.65 56.21,17.66 56.17,17.77 56.11,17.79 56.16,17.72 56.07,17.61 56.11,17.58 56.09,17.49 56.14,17.51 56.17,17.49 56.29,17.45 56.37,17.43 56.45,17.5" />
    <polygon points="57.6,18.04 57.68,18.42 57.84,18.74 57.6,18.98 57.14,18.84 56.82,18.72 56.43,18.69 55.9,18.79 55.84,18.61 55.85,18.52 56.0,18.09 56.43,18.16 56.74,18.24 56.82,17.81 57.03,17.75 57.23,17.88 57.46,17.99 57.6,18.04" />
    <polygon points="55.73,11.65 52.77,17.24 51.66,17.21 51.92,16.36 51.89,16.03 51.69,15.65 52.13,15.11 53.18,14.54 53.17,14.08 53.82,13.24 54.0,12.62 54.51,12.23 55.24,11.39 56.08,10.99 57.41,10.58 58.3,10.74 55.88,11.62 55.73,11.65" />
    <polygon points="54.59,11.82 54.49,11.93 54.41,11.96 54.37,12.0 54.32,12.04 54.29,11.99 54.16,12.07 54.24,11.95 54.29,11.88 54.29,11.82 54.3,11.77 54.34,11.7 54.4,11.8 54.38,11.87 54.46,11.87 54.5,11.75 54.58,11.78 54.59,11.82" />
    <polygon points="55.02,11.42 54.98,11.51 54.92,11.57 54.78,11.64 54.67,11.63 54.77,11.55 54.75,11.53 54.7,11.5 54.69,11.46 54.75,11.45 54.79,11.39 54.85,11.38 54.85,11.36 54.91,11.36 54.96,11.34 54.97,11.39 55.01,11.42 55.02,11.42" />
    <polygon points="56.23,10.83 56.16,10.83 56.13,10.76 56.23,10.76 56.25,10.72 56.31,10.77 56.31,10.7 56.36,10.72 56.42,10.7 56.41,10.67 56.48,10.68 56.52,10.66 56.49,10.69 56.43,10.74 56.38,10.78 56.34,10.8 56.28,10.82 56.23,10.83" />
    <polygon points="56.78,6.76 56.67,6.89 56.47,7.06 56.22,7.06 56.23,6.99 56.28,6.92 56.19,6.92 55.8,6.97 55.79,6.92 55.9,6.86 55.9,6.83 55.99,6.74 56.0,6.7 56.12,6.55 56.52,6.58 56.42,6.67 56.69,6.73 56.78,6.76" />
    <polygon points="55.84,6.54 55.76,6.56 55.75,6.54 55.77,6.52 55.69,6.49 55.74,6.47 55.72,6.44 55.7,6.37 55.87,6.34 55.95,6.33 56.05,6.33 56.07,6.35 56.12,6.34 56.15,6.37 56.18,6.41 56.17,6.44 56.17,6.5 55.85,6.56 55.84,6.54" />
    <polygon points="53.37,6.53 53.37,6.56 53.28,6.51 53.23,6.46 53.15,6.42 53.06,6.38 53.02,6.32 52.96,6.26 52.93,6.22 52.92,6.16 53.06,6.23 53.09,6.29 53.13,6.33 53.13,6.37 53.19,6.38 53.31,6.42 53.35,6.49 53.37,6.53" />
    <polygon points="58.18,6.16 58.22,6.16 58.24,6.16 58.25,6.17 58.15,6.19 58.15,6.19 58.15,6.19 58.12,6.19 58.04,6.17 58.02,6.16 58.02,6.16 57.95,6.17 57.88,6.18 57.81,6.21 57.8,6.21 57.73,6.2 57.74,6.19 57.79,6.18 57.8,6.17 57.81,6.17 57.82,6.16 57.82,6.16 57.88,6.15 57.89,6.15 57.9,6.14 57.89,6.13 58.0,6.13 58.05,6.15 58.07,6.16 58.07,6.16 58.18,6.16" />
    <polygon points="55.61,6.31 54.9,6.98 54.54,7.42 53.98,7.09 54.69,6.77 53.96,6.67 54.62,6.28 54.05,6.28 53.47,6.42 53.36,5.95 53.12,5.67 53.47,5.78 53.94,5.75 54.54,6.09 54.64,5.59 55.23,5.91 55.75,6.28 55.61,6.31" />
    <polygon points="59.19,5.43 59.25,5.42 59.34,5.43 59.33,5.44 59.32,5.45 59.25,5.45 59.18,5.46 59.12,5.48 59.01,5.49 58.89,5.5 58.78,5.52 58.75,5.5 58.74,5.5 58.74,5.49 58.75,5.49 58.88,5.47 59.02,5.46 59.15,5.44 59.17,5.43 59.17,5.43 59.19,5.43 59.19,5.43" />
    <polygon points="57.55,5.51 57.18,5.85 56.03,5.9 56.06,5.68 55.11,5.59 54.94,5.48 55.31,5.42 55.42,5.34 55.71,5.36 55.98,5.4 56.23,5.53 56.31,5.36 56.44,5.36 56.48,5.46 56.6,5.4 56.8,5.4 57.14,5.43 57.55,5.51" />
    <polygon points="55.73,11.65 56.67,13.3 56.1,13.53 55.9,14.08 55.54,14.66 55.13,15.08 54.87,15.42 54.79,16.1 55.2,16.8 55.01,17.2 54.67,17.47 54.62,17.96 54.27,18.81 53.53,18.88 53.24,17.87 53.18,17.23 55.62,11.96 55.73,11.65" />
    <polygon points="58.04,11.65 58.33,14.14 57.72,16.36 57.35,16.43 57.0,16.54 56.51,16.69 56.27,16.52 55.93,16.21 55.96,15.68 55.96,15.03 56.23,14.74 56.58,14.35 57.06,13.92 56.72,13.45 56.5,12.19 56.91,11.91 58.02,11.55 58.04,11.65" />
    <polygon points="79.87,41.83 79.5,40.41 79.08,39.04 78.58,38.12 78.96,37.32 79.65,37.78 79.78,38.34 79.59,38.65 79.47,39.84 80.01,40.97 80.33,42.14 80.38,42.98 80.24,43.7 79.61,44.2 79.12,45.24 79.49,43.91 79.86,41.92 79.87,41.83" />
    <polygon points="79.87,41.83 79.88,42.61 79.57,43.36 79.4,43.73 79.28,43.91 78.91,44.14 78.78,44.03 78.67,43.96 78.65,43.61 78.63,43.5 78.47,42.92 78.58,42.2 78.9,42.02 79.17,42.1 79.45,42.09 79.64,41.99 79.86,41.84 79.87,41.83" />
    <polygon points="65.63,35.76 65.61,36.21 65.5,36.28 65.47,36.65 65.19,37.4 64.33,36.61 64.39,36.65 64.55,36.64 64.72,36.58 64.88,36.62 65.09,36.52 65.13,36.36 65.19,36.23 65.36,36.0 65.43,35.81 65.57,35.6 65.61,35.77 65.63,35.76" />
    <polygon points="50.7,21.62 51.17,21.46 51.25,21.4 51.41,21.42 51.62,21.59 51.59,21.8 51.71,21.93 51.74,22.08 51.65,22.16 51.59,22.33 51.61,22.48 51.47,22.42 51.35,22.17 51.17,22.19 51.04,22.03 50.89,21.83 50.72,21.7 50.7,21.62" />
    <polygon points="61.54,26.44 61.27,26.06 61.24,25.83 61.64,26.0 61.99,26.14 62.28,26.31 62.58,26.34 62.8,26.66 62.85,26.88 62.95,27.16 62.71,27.04 62.38,27.11 62.22,27.13 61.98,27.05 61.82,26.91 61.58,26.96 61.55,26.47 61.54,26.44" />
    <polygon points="55.71,26.74 55.77,26.62 55.92,26.61 55.98,26.53 56.18,26.47 56.31,26.64 56.36,26.72 56.37,26.87 56.37,27.04 56.28,27.14 56.2,27.14 56.09,27.17 56.01,27.28 55.82,27.31 55.72,27.17 55.69,26.98 55.7,26.81 55.71,26.74" />
    <polygon points="55.71,26.74 55.7,26.99 55.77,27.28 55.82,27.5 55.74,27.68 55.64,27.89 55.56,27.94 55.51,27.75 55.37,27.53 55.37,27.4 55.42,27.27 55.41,27.05 55.45,26.87 55.38,26.67 55.45,26.34 55.59,26.38 55.72,26.69 55.71,26.74" />
    <polygon points="62.5,27.06 62.93,27.17 62.84,26.8 63.09,26.91 63.33,27.02 63.72,27.3 63.98,27.54 63.73,27.73 63.69,28.04 63.65,28.3 63.5,28.67 63.37,28.22 63.06,28.23 62.92,28.23 62.81,27.97 62.63,27.48 62.56,27.14 62.5,27.06" />
    <polygon points="62.82,28.41 62.65,28.35 62.62,28.32 62.61,28.27 62.59,28.24 62.54,28.21 62.52,28.13 62.5,28.1 62.46,27.99 62.44,27.95 62.51,27.91 62.55,28.02 62.6,28.04 62.66,28.04 62.72,28.06 62.73,28.15 62.77,28.21 62.82,28.41" />
    <polygon points="55.57,26.36 55.57,26.24 55.69,26.17 55.73,26.1 55.74,25.99 55.79,26.01 55.9,26.14 55.94,26.25 56.04,26.29 56.04,26.35 55.97,26.53 55.92,26.58 55.87,26.56 55.76,26.7 55.72,26.75 55.71,26.6 55.61,26.45 55.57,26.36" />
    <polygon points="62.07,27.16 62.31,28.6 61.93,29.27 60.02,30.08 59.44,29.83 58.46,29.87 58.02,29.64 57.8,29.61 57.84,29.45 57.64,29.27 57.31,28.69 57.45,28.47 57.34,27.67 58.27,27.36 59.64,26.7 60.72,27.24 62.0,27.1 62.07,27.16" />
    <polygon points="57.78,26.68 57.8,26.86 58.07,27.15 58.01,27.24 57.87,27.19 57.63,27.25 57.4,27.56 57.27,27.73 57.41,27.49 57.24,27.43 57.29,27.28 57.32,27.16 57.39,26.94 57.37,26.75 57.47,26.67 57.61,26.67 57.72,26.68 57.78,26.68" />
    <polygon points="49.5,25.9 50.06,26.27 50.66,26.45 50.33,27.19 49.98,28.58 49.47,29.48 48.49,29.93 47.92,29.17 48.0,28.23 48.07,27.21 47.82,26.74 47.59,26.42 47.43,26.15 47.71,25.84 48.05,25.82 48.94,25.87 49.45,25.92 49.5,25.9" />
    <polygon points="78.37,37.56 78.62,38.34 79.06,38.53 78.91,39.08 79.19,39.69 79.58,40.58 79.82,41.39 79.77,41.95 79.48,42.18 79.31,41.63 79.12,40.35 78.62,40.01 78.07,40.28 78.11,39.19 77.81,38.66 78.26,38.26 78.37,37.56" />
    <polygon points="72.28,26.56 71.57,27.22 71.02,27.54 70.53,27.82 70.06,28.23 69.7,28.1 69.31,28.03 69.58,27.79 69.91,27.7 70.16,27.5 70.0,27.12 69.7,27.11 69.71,26.45 70.23,26.35 70.8,26.12 71.45,26.16 72.24,26.5 72.28,26.56" />
    <polygon points="62.5,27.06 62.59,27.23 62.61,27.45 62.76,27.71 62.81,27.97 62.91,28.08 62.89,28.24 62.82,28.41 62.72,28.06 62.57,28.0 62.41,27.89 62.25,27.76 62.12,27.55 62.13,27.32 62.22,27.13 62.35,27.12 62.49,27.07 62.5,27.06" />
    <polygon points="52.41,19.5 52.3,19.12 52.26,18.88 52.4,18.62 52.52,18.54 52.58,18.5 52.72,18.28 52.36,18.48 52.36,18.31 52.78,18.28 52.81,18.51 52.96,18.8 52.84,18.79 52.78,19.05 52.67,19.24 52.7,19.44 52.56,19.54 52.41,19.5" />
    <polygon points="53.34,19.5 53.3,19.59 53.29,19.46 53.26,19.35 53.13,19.31 53.11,19.23 53.06,19.06 53.15,19.03 53.26,18.91 53.26,19.0 53.29,19.01 53.31,19.08 53.34,18.87 53.5,19.04 53.46,19.29 53.37,19.4 53.31,19.48 53.34,19.5" />
    <polygon points="53.2,31.57 53.95,31.84 54.82,32.73 55.55,32.9 55.91,31.79 56.41,31.86 56.57,32.12 56.91,32.57 56.94,33.76 56.94,38.61 56.15,38.66 54.77,37.31 53.86,37.3 52.85,36.34 52.71,34.75 52.83,32.64 53.19,31.65 53.2,31.57" />
    <polygon points="53.2,31.57 52.85,32.4 52.52,32.23 52.08,31.17 52.3,30.56 52.31,29.75 52.5,29.38 52.72,29.31 52.83,29.35 52.85,29.55 53.07,29.43 52.92,29.99 53.07,30.37 52.95,30.76 52.79,31.1 53.05,31.31 53.16,31.54 53.2,31.57" />
    <polygon points="56.35,23.36 56.85,23.41 57.51,23.26 57.64,23.62 57.85,24.11 57.82,24.57 58.13,24.77 58.08,25.09 58.04,25.17 57.95,25.47 57.17,25.69 56.27,25.37 55.99,25.12 55.8,24.77 55.76,24.32 56.0,23.94 56.31,23.43 56.35,23.36" />
    <polygon points="56.35,23.36 56.11,23.69 55.97,24.04 55.76,24.31 55.42,24.38 55.22,24.51 54.9,24.52 54.68,24.24 54.53,24.01 54.58,23.86 54.63,23.57 54.72,23.42 55.19,23.46 55.49,23.24 55.79,23.03 56.16,23.11 56.35,23.36" />
    <polygon points="56.26,22.74 56.17,22.98 55.96,23.03 55.69,23.06 55.51,23.25 55.28,23.3 54.93,23.46 54.74,23.26 54.68,23.12 54.94,22.83 55.15,22.51 55.34,22.53 55.47,22.56 55.56,22.68 55.74,22.55 55.95,22.55 56.17,22.69 56.26,22.74" />
    <polygon points="55.23,22.49 54.92,22.17 54.72,22.07 54.56,21.91 54.16,21.67 54.1,21.07 53.97,20.2 54.0,20.08 54.66,19.68 55.45,19.75 56.62,20.43 56.56,21.15 56.66,21.69 56.31,22.56 55.98,22.54 55.5,22.67 55.26,22.51 55.23,22.49" />
    <polygon points="47.99,19.41 47.99,19.89 48.29,20.22 48.22,21.0 47.82,21.14 47.52,21.37 47.35,21.25 47.11,21.18 47.26,20.95 47.33,20.71 47.32,20.34 47.33,20.1 47.22,19.84 47.62,19.84 47.65,19.56 47.86,19.37 48.01,19.36 47.99,19.41" />
    <polygon points="47.99,19.41 48.21,19.31 48.35,19.46 48.38,19.61 48.46,19.65 48.45,19.78 48.43,19.74 48.38,19.87 48.25,19.94 48.15,19.97 48.09,19.82 48.01,19.85 47.97,19.94 47.79,19.83 47.86,19.65 47.89,19.59 47.98,19.42 47.99,19.41" />
    <polygon points="49.26,21.32 48.55,21.26 49.09,20.38 49.02,19.45 48.64,19.06 48.46,19.22 48.57,18.45 48.47,18.17 48.5,17.75 49.07,17.44 49.09,17.93 49.2,18.88 49.82,20.15 50.23,21.37 49.42,21.83 48.58,22.17 49.33,21.25 49.26,21.32" />
    <polygon points="55.82,27.31 56.71,26.94 57.39,26.89 56.86,27.3 56.66,27.78 56.28,27.53 56.39,28.33 56.66,28.83 56.44,29.09 56.34,29.25 56.25,29.66 55.88,28.93 56.35,28.76 55.92,28.67 55.86,28.4 55.63,28.08 55.84,27.39 55.82,27.31" />
    <polygon points="57.31,30.38 57.25,30.56 57.03,30.57 56.88,30.54 56.75,30.45 56.61,30.42 56.54,30.38 56.55,30.27 56.59,30.26 56.65,30.26 56.69,30.27 56.85,30.32 56.97,30.37 57.14,30.37 57.14,30.44 57.22,30.45 57.3,30.39 57.31,30.38" />
    <polygon points="56.83,28.8 56.77,28.89 56.74,28.84 56.72,28.77 56.7,28.74 56.68,28.67 56.56,28.64 56.52,28.53 56.43,28.42 56.38,28.42 56.4,28.36 56.48,28.32 56.55,28.46 56.65,28.51 56.72,28.61 56.74,28.75 56.83,28.8" />
    <polygon points="59.14,55.23 59.25,56.03 59.22,57.0 59.2,57.74 58.09,58.81 57.28,59.94 56.9,59.73 56.27,59.42 56.21,57.22 56.77,56.18 57.09,56.53 57.76,56.84 58.22,57.35 58.08,56.88 57.96,55.95 58.03,54.71 59.11,55.19 59.14,55.23" />
    <polygon points="47.14,45.29 46.84,46.03 46.54,45.88 46.61,45.79 46.52,45.75 46.41,45.6 46.36,45.44 46.37,45.34 46.42,45.19 46.35,45.26 46.35,45.06 46.39,44.92 46.48,44.7 46.64,44.51 46.99,44.78 47.06,45.1 47.1,45.3 47.14,45.29" />
    <polygon points="46.31,44.98 46.19,44.71 46.07,44.34 45.92,44.07 45.84,43.9 46.18,43.39 46.43,43.07 47.0,43.32 47.4,43.12 47.63,43.76 47.73,44.51 47.74,45.29 47.55,45.89 47.37,45.52 47.11,45.29 46.96,44.64 46.38,44.94 46.31,44.98" />
    <polygon points="46.81,46.16 47.07,45.5 47.27,45.28 47.36,45.37 47.4,45.77 47.45,45.96 47.57,45.85 47.7,46.11 47.66,46.42 47.8,46.52 47.89,46.73 47.93,47.01 47.9,47.27 47.82,47.53 47.42,47.13 47.12,46.59 46.84,46.23 46.81,46.16" />
    <polygon points="56.35,43.93 56.85,45.44 57.3,46.28 57.61,47.16 57.22,47.1 56.92,47.24 56.48,47.44 56.06,47.63 55.31,47.26 54.86,47.95 54.46,48.5 54.05,47.02 54.43,45.84 54.99,45.56 55.56,44.94 55.89,44.51 56.35,43.93" />
    <polygon points="56.35,43.93 56.18,42.62 56.36,41.6 56.94,38.47 58.62,37.78 60.25,38.0 60.33,38.73 60.58,39.81 60.59,40.26 60.25,40.75 60.02,42.94 59.68,44.04 59.19,43.56 58.03,44.71 57.05,44.26 56.82,45.0 56.56,44.72 56.35,43.93" />
    <polygon points="62.01,43.62 61.86,43.85 61.74,43.89 61.65,43.93 61.6,43.62 61.65,43.43 61.8,43.05 61.9,43.02 62.03,43.07 62.06,43.2 62.0,43.36 61.93,43.46 61.83,43.58 61.83,43.62 61.85,43.6 61.96,43.56 62.01,43.62" />
    <polygon points="61.98,42.94 61.18,41.98 60.82,41.91 60.54,41.77 60.28,42.07 60.26,40.91 60.36,40.52 60.68,40.08 60.89,40.9 61.0,41.39 61.07,41.4 61.15,41.66 61.28,41.69 61.49,42.02 61.71,42.42 61.81,42.65 61.96,42.86 61.98,42.94" />
    <polygon points="54.71,23.0 54.74,23.37 54.63,23.61 54.52,23.89 54.22,24.09 53.83,24.16 53.37,23.88 53.01,24.01 52.67,23.83 52.8,23.69 52.99,23.6 53.38,23.5 53.62,23.58 53.73,23.1 53.98,23.02 54.24,22.79 54.67,22.94 54.71,23.0" />
    <polygon points="62.44,29.37 62.51,29.72 62.68,30.04 62.78,30.23 62.74,30.53 62.64,30.82 62.68,31.29 62.8,31.6 63.18,32.06 63.38,33.1 63.34,33.31 62.49,33.79 61.37,32.41 61.11,31.12 61.72,29.5 62.09,29.3 62.36,29.39 62.44,29.37" />
    <polygon points="51.95,24.49 52.48,24.52 52.79,24.18 53.26,23.9 53.79,24.34 53.5,24.72 53.42,24.94 53.56,25.58 54.68,27.14 54.79,27.52 54.6,28.65 54.24,27.76 53.75,27.1 53.05,26.27 52.46,25.33 51.91,25.29 51.91,24.54 51.95,24.49" />
    <polygon points="54.31,28.72 54.22,29.03 54.24,29.31 54.25,29.4 54.23,29.47 54.15,29.61 53.91,29.38 53.69,29.23 53.52,29.13 53.46,28.97 53.52,28.82 53.63,28.84 53.7,28.77 53.81,28.9 54.02,28.87 54.18,28.81 54.28,28.75 54.31,28.72" />
    <polygon points="52.72,27.47 52.7,27.82 52.67,28.15 52.59,28.22 52.51,28.25 52.4,28.39 52.33,28.22 52.35,27.91 52.34,27.85 52.34,27.59 52.27,27.39 52.43,27.27 52.58,27.11 52.63,27.16 52.65,27.2 52.67,27.27 52.71,27.45 52.72,27.47" />
    <polygon points="52.9,23.96 52.79,24.15 52.7,24.27 52.55,24.35 52.45,24.42 52.25,24.29 52.09,24.46 51.89,24.28 51.68,24.31 51.78,24.0 51.92,23.66 52.07,23.62 52.25,23.57 52.39,23.54 52.42,23.47 52.63,23.79 52.88,23.89 52.9,23.96" />
    <polygon points="62.45,27.98 63.43,28.12 64.96,29.55 66.05,28.95 67.0,29.97 66.83,31.67 67.44,34.82 67.09,36.01 66.03,35.7 65.33,35.15 64.14,33.9 63.67,33.07 63.19,32.12 62.64,30.92 62.75,30.09 62.36,29.01 62.35,27.95 62.45,27.98" />
    <polygon points="52.0,20.42 51.85,20.81 51.87,21.06 51.73,21.19 51.72,21.4 51.63,21.69 51.64,21.8 51.61,21.63 51.46,21.52 51.34,21.41 51.18,21.46 50.99,21.34 51.13,21.33 51.1,21.2 51.31,20.61 51.66,20.33 52.0,20.42" />
    <polygon points="47.78,44.35 48.15,44.2 48.33,44.33 48.63,44.52 48.85,44.54 49.23,44.95 49.14,46.67 49.1,47.1 48.92,47.05 48.7,47.08 48.59,47.11 48.33,47.24 47.95,47.03 47.74,46.51 47.67,45.87 47.82,45.31 47.74,44.42 47.78,44.35" />
    <polygon points="55.62,24.38 55.85,24.83 55.94,25.08 56.31,25.25 56.23,25.55 56.3,25.89 56.23,26.21 56.03,26.52 55.94,26.19 55.72,26.11 55.41,25.96 55.38,25.57 55.33,25.24 55.3,25.0 55.28,24.76 55.27,24.48 55.57,24.37 55.62,24.38" />
    <polygon points="46.59,41.79 47.03,41.43 48.49,41.22 48.41,36.11 50.5,38.73 51.18,40.5 49.87,41.62 48.91,42.53 48.7,43.3 48.48,44.03 48.19,44.13 47.83,44.31 47.67,43.67 47.26,43.3 46.81,43.25 46.79,42.71 46.6,41.82 46.59,41.79" />
    <polygon points="46.59,41.79 46.74,42.55 46.83,42.92 46.44,43.08 45.47,43.1 45.65,43.03 45.55,42.93 45.34,42.93 45.95,42.58 45.74,42.34 45.38,42.31 45.36,42.19 45.41,41.2 45.8,40.75 46.15,41.03 46.33,41.28 46.58,41.77 46.59,41.79" />
    <polygon points="51.0,43.5 52.37,42.74 53.55,42.56 54.06,43.36 53.57,44.92 53.2,46.31 52.46,46.78 52.29,47.31 52.02,47.5 51.94,47.57 51.84,47.59 51.66,47.59 51.56,46.93 51.45,46.74 50.81,46.45 50.77,45.03 51.03,43.83 51.0,43.5" />
    <polygon points="51.0,43.5 51.07,44.11 50.92,44.55 50.8,44.96 50.75,45.4 50.76,46.04 50.75,46.46 50.44,46.26 50.45,45.23 50.21,44.23 50.28,43.85 50.32,43.77 50.39,43.64 50.64,43.48 50.69,43.19 50.8,43.13 50.99,43.47 51.0,43.5" />
    <polygon points="53.63,52.58 53.55,52.68 53.5,52.74 53.46,52.81 53.48,52.87 53.43,53.18 53.39,53.08 53.39,53.0 53.34,52.8 53.37,52.8 53.36,52.8 53.35,52.79 53.39,52.65 53.42,52.65 53.47,52.55 53.53,52.47 53.56,52.45 53.62,52.56 53.63,52.58" />
    <polygon points="56.66,56.04 56.11,58.61 56.42,59.68 55.49,59.94 53.74,59.45 53.26,59.56 53.42,57.89 53.63,57.05 53.7,55.53 53.59,54.13 54.01,53.27 54.65,53.69 54.84,54.36 55.41,54.17 56.07,54.17 56.17,55.6 56.65,56.06 56.66,56.04" />
    <polygon points="54.59,24.17 54.9,24.53 55.26,24.62 55.3,24.94 55.09,24.93 54.69,24.85 54.41,25.15 54.8,25.85 54.56,25.82 54.41,25.72 54.31,25.41 53.91,25.02 53.85,25.09 53.75,24.75 54.16,24.73 54.36,24.42 54.58,24.16 54.59,24.17" />
    <polygon points="55.12,26.36 55.14,26.43 55.06,26.34 55.02,26.3 54.97,26.25 54.94,26.22 54.93,26.23 54.9,26.21 54.78,26.12 54.73,26.09 54.79,26.1 54.85,26.15 54.87,26.16 54.91,26.18 54.91,26.16 54.95,26.17 55.0,26.26 55.11,26.35 55.12,26.36" />
    <polygon points="53.79,24.74 53.81,24.57 53.78,24.37 53.76,24.23 54.0,24.2 54.11,24.16 54.31,24.08 54.44,23.99 54.54,24.06 54.54,24.14 54.47,24.24 54.33,24.38 54.3,24.55 54.26,24.65 54.14,24.71 54.03,24.68 53.86,24.76 53.79,24.74" />
    <polygon points="64.11,36.25 64.1,36.01 64.12,35.84 64.12,35.77 64.14,35.82 64.15,35.76 64.15,35.66 64.16,35.57 64.24,35.47 64.3,35.58 64.32,35.7 64.32,35.74 64.31,35.86 64.34,36.1 64.29,36.29 64.25,36.3 64.11,36.25" />
    <polygon points="64.11,36.25 65.39,37.58 62.21,40.39 61.79,40.53 61.48,39.67 61.14,38.75 60.86,38.03 60.78,37.17 60.34,36.26 59.86,34.69 59.63,34.37 59.98,33.77 62.26,33.55 63.58,34.57 63.68,34.76 63.94,35.46 64.06,36.1 64.11,36.25" />
    <polygon points="57.02,59.89 57.36,60.98 57.69,61.66 58.07,62.12 57.84,62.59 57.67,62.9 57.52,63.11 57.16,63.96 56.52,64.06 56.31,64.37 55.9,64.91 55.74,64.25 55.55,63.76 55.83,60.69 56.48,60.01 56.66,60.1 56.94,59.9 57.02,59.89" />
    <polygon points="57.02,59.89 57.27,59.95 57.66,59.65 58.08,58.83 58.58,58.89 58.86,59.12 59.15,59.71 59.16,60.23 59.12,60.59 59.17,61.12 59.01,61.84 58.51,62.4 58.2,62.32 57.8,61.99 57.69,61.47 57.37,60.99 57.08,60.2 57.02,59.89" />
    <polygon points="71.11,29.75 70.51,30.86 70.92,32.11 70.54,33.1 69.59,35.73 68.98,36.68 68.77,36.74 68.53,36.17 68.1,35.94 67.35,36.0 67.3,35.28 67.1,33.96 68.42,33.06 69.25,32.26 69.74,31.06 69.92,29.77 70.97,29.6 71.11,29.75" />
    <polygon points="57.31,26.83 57.22,27.04 56.88,27.02 56.69,26.92 56.37,27.02 56.34,26.65 56.24,26.25 56.34,25.95 56.21,25.68 56.36,25.64 57.2,25.64 57.94,25.79 57.75,26.27 57.68,26.42 57.78,26.65 57.6,26.66 57.38,26.72 57.31,26.83" />
    <polygon points="78.59,43.53 78.2,42.98 77.78,43.23 77.64,44.85 78.14,46.18 77.82,46.28 77.47,45.53 77.36,44.62 77.63,43.24 77.33,41.5 77.15,40.0 77.5,38.93 78.11,39.27 78.42,39.97 79.15,40.93 78.96,42.0 78.53,43.26 78.59,43.53" />
    <polygon points="30.07,39.05 30.06,39.47 30.05,39.79 29.84,39.9 29.57,39.86 29.5,39.99 29.33,39.82 29.46,39.68 29.54,39.69 29.81,39.73 29.84,39.55 29.78,39.25 29.69,39.09 29.68,38.93 29.91,39.03 29.97,39.04 30.05,39.05 30.07,39.05" />
    <polygon points="30.07,39.05 30.18,38.97 30.29,38.95 30.52,39.1 30.71,39.26 30.66,39.32 30.81,39.45 30.97,39.57 30.88,39.81 30.64,39.75 30.4,39.87 30.32,39.81 30.25,39.96 30.12,40.13 30.05,39.79 30.06,39.47 30.07,39.07 30.07,39.05" />
    <polygon points="53.91,42.73 54.1,41.03 54.36,39.12 54.17,37.36 56.22,38.73 56.24,41.87 56.2,42.97 56.2,43.93 55.93,44.47 55.72,44.83 55.45,44.98 55.17,45.51 54.61,45.7 54.14,45.14 54.18,44.0 54.14,43.24 53.91,42.73" />
    <polygon points="63.32,33.34 63.35,33.48 63.36,33.57 63.28,33.63 63.28,33.68 63.31,33.7 63.34,33.69 63.37,33.78 63.41,33.97 63.44,34.05 63.44,34.08 63.44,34.09 63.31,34.15 63.21,34.06 63.16,33.89 62.93,33.82 63.05,33.5 63.26,33.28 63.32,33.34" />
    <polygon points="24.97,42.37 25.07,42.2 25.11,42.05 25.17,41.97 25.25,42.03 25.32,42.17 25.41,42.23 25.45,42.29 25.49,42.25 25.57,42.28 25.64,42.33 25.61,42.55 25.52,42.68 25.45,42.68 25.39,42.62 25.43,42.68 25.05,42.45 24.97,42.37" />
    <polygon points="25.18,41.99 25.12,42.05 25.03,42.2 24.63,42.25 24.42,41.66 24.84,41.07 24.88,40.96 24.89,40.91 24.83,40.84 24.75,40.65 24.66,40.51 24.99,40.1 25.32,41.18 25.4,41.19 25.49,41.27 25.23,41.71 25.21,41.91 25.18,41.99" />
    <polygon points="84.7,54.98 84.76,54.8 84.87,54.75 85.02,54.73 85.11,54.68 85.2,54.67 85.31,54.65 85.36,54.68 85.19,54.87 85.04,55.0 84.91,55.11 84.79,55.22 84.73,55.2 84.73,55.1 84.76,55.1 84.75,54.99 84.7,55.04 84.7,54.98" />
    <polygon points="48.66,36.11 48.18,33.59 49.6,32.17 49.51,30.95 49.71,30.18 50.06,29.94 50.76,29.63 51.39,29.55 51.99,29.48 52.33,29.49 52.29,30.7 52.58,32.72 52.9,36.4 52.15,38.32 50.9,39.17 50.32,38.4 48.66,36.11" />
    <polygon points="58.92,64.91 59.17,60.99 59.17,59.63 58.9,58.0 59.61,59.12 59.97,58.27 60.19,56.5 61.26,55.85 61.28,57.03 61.31,57.88 61.27,58.62 60.47,59.7 59.99,60.51 59.64,61.28 59.8,62.05 59.86,63.39 58.94,64.91 58.92,64.91" />
    <polygon points="58.87,64.42 58.91,64.49 58.9,64.6 58.92,64.91 58.89,64.91 58.87,65.1 58.88,65.17 58.76,65.17 58.65,65.11 58.6,65.0 58.6,64.93 58.57,64.88 58.55,64.88 58.58,64.61 58.64,64.39 58.72,64.3 58.82,64.41 58.87,64.42" />
    <polygon points="58.49,51.33 58.46,51.55 58.51,51.64 58.56,51.71 58.53,51.83 58.47,51.95 58.44,52.09 58.31,52.41 58.17,52.47 58.12,51.76 58.08,51.61 58.11,51.46 58.17,51.56 58.26,51.54 58.32,51.29 58.39,51.3 58.47,51.32 58.49,51.33" />
    <polygon points="58.06,51.51 58.02,51.32 58.09,51.02 58.23,50.77 58.3,50.8 58.39,50.7 58.45,50.59 58.48,50.66 58.54,50.81 58.57,51.02 58.57,51.3 58.45,51.3 58.39,51.31 58.31,51.3 58.25,51.56 58.14,51.54 58.06,51.51" />
    <polygon points="75.72,37.79 76.3,36.11 77.04,34.34 77.25,35.88 77.6,37.45 77.73,38.69 77.15,39.98 77.29,41.76 77.47,44.01 77.42,43.33 77.26,42.45 77.08,40.82 76.49,41.12 76.29,40.92 76.12,39.39 75.95,38.88 75.72,38.06 75.72,37.79" />
    <polygon points="75.72,37.79 75.56,37.95 75.4,37.32 75.2,36.92 75.11,37.36 75.03,37.82 74.94,37.74 74.86,37.71 74.7,37.47 74.65,36.54 74.67,35.86 74.6,35.3 74.89,35.52 75.43,36.02 75.53,36.48 75.42,37.2 75.72,37.68 75.72,37.79" />
    <polygon points="70.71,29.43 69.93,29.78 69.85,30.58 69.49,31.36 69.08,32.35 68.6,32.6 67.18,33.57 66.9,31.42 66.98,30.4 67.56,30.17 68.28,29.15 68.89,29.47 69.29,29.32 69.49,28.92 69.83,28.94 70.38,29.19 70.66,29.35 70.71,29.43" />
    <polygon points="55.14,26.44 55.15,26.32 55.17,26.06 55.27,25.96 55.25,25.84 55.38,25.9 55.52,26.06 55.62,26.22 55.58,26.33 55.48,26.36 55.43,26.39 55.38,26.63 55.37,26.74 55.29,26.59 55.22,26.51 55.16,26.45 55.14,26.42 55.14,26.44" />
    <polygon points="54.9,26.17 54.64,25.67 54.48,25.34 54.41,25.15 54.41,24.88 54.67,24.89 54.8,24.89 54.98,24.95 55.17,24.94 55.27,25.08 55.35,25.2 55.4,25.48 55.34,25.58 55.3,25.83 55.27,25.94 55.15,26.28 54.94,26.16 54.9,26.17" />
    <polygon points="58.46,50.59 58.32,50.81 58.21,50.61 58.23,50.25 58.38,49.5 58.66,48.9 58.53,48.64 58.57,48.16 58.76,47.97 59.06,47.91 59.47,47.81 59.57,48.04 59.64,48.4 59.72,48.94 59.56,49.5 59.34,50.56 58.47,50.59 58.46,50.59" />
    <polygon points="29.14,38.95 28.41,38.94 28.32,38.5 27.9,37.99 27.45,37.62 27.29,37.42 26.67,37.76 26.55,37.61 26.89,37.23 27.44,37.12 27.87,37.35 28.36,37.85 28.57,37.98 28.71,38.19 28.99,38.39 29.11,38.5 29.15,38.93 29.14,38.95" />
    <polygon points="25.18,41.99 25.49,41.26 25.97,41.22 26.5,41.22 26.65,41.39 26.66,41.45 26.78,41.57 26.84,41.65 26.66,41.8 26.45,41.77 26.24,42.19 26.02,42.36 25.85,42.74 25.7,42.57 25.61,42.27 25.42,42.26 25.24,42.03 25.18,41.99" />
    <polygon points="28.1,49.2 28.55,49.81 28.9,49.87 29.07,50.26 28.86,51.18 28.22,52.05 28.02,52.77 27.71,52.42 27.72,52.03 27.81,51.68 27.81,51.21 27.72,51.46 27.57,51.12 27.6,50.51 27.77,49.9 27.87,49.5 28.09,49.26 28.1,49.2" />
    <polygon points="28.1,49.2 28.4,48.46 28.56,47.95 28.5,47.02 28.42,45.75 28.71,45.16 29.04,44.09 29.42,43.71 30.18,43.13 29.86,45.59 31.15,46.51 31.26,48.53 30.76,49.44 30.48,52.14 29.8,51.32 29.26,50.2 28.1,49.2" />
    <polygon points="32.6,62.35 33.84,61.02 33.91,61.55 33.89,62.26 34.12,62.34 34.39,62.38 34.65,63.33 34.84,64.18 34.73,64.88 34.37,65.24 33.72,65.18 33.84,64.78 33.96,64.26 33.6,63.69 33.09,63.25 32.78,62.77 32.6,62.36 32.6,62.35" />
    <polygon points="48.03,28.43 48.05,28.86 47.94,29.29 47.56,29.41 47.53,28.91 47.45,28.65 47.52,28.31 47.45,28.05 47.61,27.36 47.55,26.87 47.75,26.66 47.93,26.76 48.18,26.86 48.07,27.21 48.05,27.67 47.93,28.03 48.03,28.43" />
    <polygon points="57.39,23.19 57.52,23.12 57.85,23.21 58.02,23.33 58.1,23.64 58.19,23.83 58.32,24.02 58.28,24.23 58.13,24.22 57.99,24.52 57.83,24.74 57.81,24.4 57.84,24.14 57.72,23.8 57.62,23.58 57.53,23.33 57.39,23.19" />
    <polygon points="67.02,30.21 66.53,29.34 65.98,28.93 65.22,29.13 64.92,28.2 64.79,28.04 64.81,27.8 64.75,27.3 65.06,27.37 64.98,26.74 64.6,26.93 65.82,26.85 66.5,26.5 67.22,27.3 68.48,29.21 67.75,29.98 67.04,30.21 67.02,30.21" />
    <polygon points="59.89,31.84 59.98,31.85 60.04,31.93 60.35,31.91 60.84,32.04 60.49,32.39 60.55,33.06 60.15,33.56 59.72,33.58 59.76,33.26 59.8,32.89 59.84,32.6 59.87,32.26 59.88,32.09 59.87,31.99 59.88,31.95 59.88,31.88 59.89,31.84" />
    <polygon points="74.48,34.52 74.43,35.35 74.09,35.31 73.73,35.12 73.34,34.75 72.79,34.5 72.44,34.16 72.29,33.81 72.46,33.23 72.66,33.11 72.97,33.44 73.19,33.74 73.41,33.96 73.63,34.27 73.9,34.51 74.04,34.4 74.4,34.5 74.48,34.52" />
    <polygon points="58.05,66.06 58.17,66.26 58.13,66.4 58.09,66.59 57.89,66.74 57.84,66.88 57.75,67.02 57.65,66.89 57.6,66.74 57.5,66.48 57.57,66.42 57.61,66.31 57.68,66.16 57.7,66.1 57.78,66.04 57.89,65.9 58.02,65.99 58.05,66.06" />
    <polygon points="53.15,48.8 52.71,47.87 52.6,47.82 52.37,47.49 52.6,46.49 53.21,46.21 53.53,45.14 54.03,43.64 54.05,42.92 54.2,43.46 53.94,44.46 54.11,46.47 54.08,47.27 54.47,48.53 54.37,48.94 53.98,48.79 53.15,48.8" />
    <polygon points="53.69,48.8 53.8,49.25 53.87,50.02 54.01,50.86 53.86,51.3 53.58,51.17 53.27,51.67 52.7,51.38 52.77,51.39 52.6,51.07 52.52,50.75 52.59,50.72 52.45,50.42 52.6,49.87 52.59,49.71 52.79,49.44 53.68,48.74 53.69,48.8" />
    <polygon points="51.0,43.5 50.73,43.17 50.6,43.1 50.32,42.6 50.1,42.18 50.83,41.48 51.18,40.05 52.42,38.0 53.75,37.12 54.34,38.36 54.33,39.98 53.86,41.61 53.68,42.45 53.52,42.62 52.75,42.73 51.88,42.71 51.01,43.49 51.0,43.5" />
    <polygon points="50.66,43.39 50.33,43.74 50.25,43.89 49.75,43.9 49.23,44.21 49.17,44.61 48.83,44.58 48.68,44.59 48.58,44.32 48.48,43.84 48.59,43.34 48.81,42.94 48.9,42.55 49.25,42.15 50.1,42.17 50.28,42.58 50.58,43.16 50.66,43.39" />
    <polygon points="49.95,43.81 50.22,44.04 50.38,44.73 50.45,45.56 50.44,46.32 50.33,46.61 50.2,46.34 50.17,46.07 50.17,45.62 50.19,45.36 50.13,45.09 50.14,44.75 50.06,44.7 50.09,44.51 50.1,44.28 49.99,44.11 49.98,43.84 49.95,43.81" />
    <polygon points="49.95,43.81 50.06,44.22 50.1,44.6 50.13,44.74 50.11,45.19 50.15,45.77 50.2,46.35 50.04,46.82 49.66,47.17 49.4,47.33 49.23,46.93 49.19,45.77 49.27,45.04 49.23,44.62 49.2,44.18 49.6,43.88 49.88,43.85 49.95,43.81" />
    <polygon points="46.19,42.96 46.16,43.51 45.81,43.93 45.79,43.83 45.73,43.68 45.72,43.61 45.78,43.56 45.81,43.54 45.77,43.49 45.72,43.55 45.72,43.4 45.82,43.35 45.61,43.42 45.61,43.32 45.48,43.23 45.41,43.22 45.89,42.96 46.19,42.96" />
    <polygon points="15.9,22.78 30.93,23.75 30.55,25.65 29.45,27.54 28.85,28.52 28.71,28.98 28.92,30.2 27.59,32.09 27.16,35.11 25.7,33.17 25.05,33.65 23.11,34.19 21.56,33.41 16.81,30.9 15.84,28.77 15.61,24.08 15.9,22.82 15.9,22.78" />
    <polygon points="10.83,11.31 13.4,19.02 12.52,17.41 12.03,17.61 9.43,16.25 8.85,16.34 7.94,16.55 7.13,17.63 5.95,18.8 4.8,19.27 5.89,17.46 4.32,16.6 4.26,15.3 3.79,13.72 4.9,12.77 6.74,10.55 10.76,11.31 10.83,11.31" />
    <polygon points="13.34,19.54 13.26,19.55 13.22,19.48 13.19,19.41 13.1,19.3 13.0,19.23 13.05,19.11 13.0,19.0 12.89,18.78 13.02,18.73 13.07,18.85 13.21,19.09 13.18,19.16 13.23,19.21 13.27,19.31 13.31,19.41 13.34,19.5 13.34,19.54" />
    <polygon points="12.61,18.48 12.6,18.68 12.58,18.77 12.52,18.68 12.52,18.56 12.5,18.53 12.45,18.51 12.43,18.45 12.41,18.35 12.43,18.24 12.35,18.2 12.35,18.09 12.39,18.07 12.49,18.1 12.52,18.19 12.57,18.31 12.6,18.47 12.61,18.48" />
    <polygon points="7.73,17.98 7.61,18.07 7.61,18.12 7.49,18.16 7.36,18.29 7.28,18.42 7.23,18.34 7.11,18.26 7.16,18.4 7.0,18.14 7.17,17.96 7.3,18.02 7.34,17.89 7.44,17.93 7.55,17.82 7.62,17.83 7.66,17.99 7.73,17.98" />
    <polygon points="12.26,18.11 12.22,18.0 12.16,17.89 12.13,17.78 12.14,17.7 12.17,17.69 12.34,17.66 12.32,17.77 12.38,17.71 12.52,17.8 12.5,17.86 12.34,17.84 12.45,17.94 12.54,18.04 12.29,17.93 12.34,18.04 12.31,18.12 12.26,18.11" />
    <polygon points="12.68,18.28 12.64,18.2 12.68,18.15 12.64,18.06 12.58,17.91 12.57,17.67 12.51,17.56 12.59,17.68 12.78,17.81 12.78,17.94 12.71,17.74 12.69,17.79 12.81,18.05 12.77,18.07 12.78,18.16 12.76,18.18 12.69,18.27 12.68,18.28" />
    <polygon points="7.79,17.59 7.76,17.68 7.69,17.65 7.69,17.69 7.66,17.7 7.61,17.7 7.57,17.77 7.44,17.68 7.53,17.68 7.53,17.62 7.56,17.58 7.58,17.53 7.62,17.52 7.66,17.57 7.69,17.55 7.72,17.58 7.75,17.62 7.79,17.59" />
    <polygon points="30.02,27.19 29.87,27.28 29.8,27.33 29.69,27.37 29.54,27.44 29.51,27.43 29.45,27.46 29.47,27.34 29.53,27.3 29.59,27.29 29.61,27.26 29.69,27.24 29.89,27.16 29.89,27.2 29.83,27.26 29.9,27.22 29.97,27.21 30.02,27.19" />
    <polygon points="1.65,20.98 1.62,21.04 1.59,21.06 1.56,21.06 1.53,21.08 1.5,21.09 1.45,21.1 1.33,21.09 1.39,21.09 1.4,21.07 1.46,21.06 1.52,21.03 1.55,21.01 1.59,20.98 1.57,20.94 1.58,20.91 1.66,20.91 1.65,20.98" />
    <polygon points="3.37,20.34 3.26,20.42 3.23,20.47 3.19,20.54 3.12,20.58 3.1,20.6 3.05,20.64 3.04,20.63 3.09,20.59 3.11,20.49 3.16,20.41 3.2,20.41 3.23,20.4 3.21,20.37 3.23,20.3 3.31,20.24 3.39,20.28 3.37,20.34" />
    <polygon points="3.81,20.15 3.72,20.26 3.67,20.25 3.62,20.31 3.48,20.39 3.38,20.39 3.5,20.32 3.56,20.26 3.6,20.22 3.66,20.19 3.58,20.11 3.63,20.01 3.71,20.04 3.77,20.03 3.81,20.07 3.73,20.16 3.78,20.15 3.81,20.15" />
    <polygon points="6.97,39.13 6.97,39.22 6.89,39.3 6.84,39.33 6.79,39.4 6.76,39.5 6.71,39.43 6.69,39.34 6.68,39.17 6.66,39.09 6.67,38.99 6.71,38.9 6.7,38.81 6.74,38.75 6.77,38.81 6.85,38.86 6.92,39.04 6.96,39.1 6.97,39.13" />
    <polygon points="4.7,19.62 4.69,19.62 4.66,19.62 4.61,19.58 4.58,19.65 4.35,19.7 4.32,19.77 4.21,19.76 4.19,19.7 4.25,19.62 4.34,19.49 4.4,19.47 4.5,19.42 4.57,19.43 4.6,19.49 4.66,19.57 4.69,19.58 4.7,19.62" />
    <polygon points="4.0,16.69 3.96,16.71 3.88,16.74 3.87,16.79 3.77,16.75 3.61,16.67 3.59,16.67 3.52,16.62 3.53,16.53 3.67,16.5 3.78,16.47 3.85,16.43 3.89,16.49 3.98,16.5 3.97,16.58 3.97,16.61 4.0,16.68 4.0,16.69" />
    <polygon points="3.13,14.84 2.96,14.9 2.88,15.02 2.83,14.93 2.7,14.89 2.59,14.77 2.45,14.78 2.3,14.8 2.27,14.67 2.3,14.58 2.33,14.61 2.4,14.65 2.53,14.67 2.7,14.62 2.76,14.73 2.94,14.8 3.07,14.81 3.13,14.84" />
    <polygon points="23.57,22.57 14.74,20.97 12.05,17.14 13.2,11.58 18.02,12.22 22.25,12.32 23.73,11.31 25.6,11.96 26.52,13.12 24.3,15.31 27.62,21.3 28.44,16.24 31.06,17.58 32.5,17.73 34.04,19.74 33.38,22.03 23.66,22.69 23.57,22.57" />
    <polygon points="31.34,24.9 30.47,24.42 29.57,24.77 31.1,22.95 31.8,23.3 31.97,23.58 32.27,24.37 32.6,24.65 32.95,24.89 32.48,25.12 32.21,25.24 31.98,25.63 31.73,25.8 31.78,25.17 32.09,24.78 32.0,24.65 31.35,24.92 31.34,24.9" />
    <polygon points="35.38,23.6 35.06,23.87 34.84,23.69 34.68,23.63 34.51,23.56 34.12,23.56 33.74,23.09 33.92,22.48 34.54,21.4 34.47,21.72 34.46,22.2 34.63,22.57 34.85,22.48 35.01,22.9 35.16,22.99 35.1,23.59 35.36,23.52 35.38,23.6" />
    <polygon points="13.58,21.02 13.51,21.0 13.47,20.89 13.31,20.7 13.32,20.66 13.26,20.58 13.26,20.54 13.23,20.48 13.39,20.46 13.37,20.52 13.44,20.58 13.34,20.62 13.4,20.68 13.43,20.81 13.51,20.91 13.52,20.91 13.56,20.98 13.58,21.02" />
    <polygon points="13.17,20.44 13.14,20.35 13.15,20.29 13.08,20.25 13.06,20.16 13.02,20.03 13.04,19.9 13.16,19.99 13.27,19.98 13.22,20.14 13.21,20.19 13.28,20.19 13.29,19.99 13.42,19.98 13.36,20.3 13.28,20.46 13.2,20.45 13.17,20.44" />
    <polygon points="23.55,11.74 23.39,11.84 23.05,11.91 22.84,11.86 22.66,11.79 22.52,11.7 22.43,11.74 22.43,11.58 22.62,11.51 22.62,11.35 22.68,11.33 22.86,11.2 23.02,11.32 23.27,11.56 23.31,11.55 23.37,11.68 23.54,11.74 23.55,11.74" />
    <polygon points="21.98,11.22 21.33,11.31 21.65,11.54 20.81,11.62 19.02,11.92 17.57,11.36 18.51,10.75 17.44,10.33 16.99,9.98 18.37,9.63 19.08,9.77 19.46,9.59 19.93,10.06 19.99,9.59 20.73,9.56 21.07,10.6 21.98,11.22" />
    <polygon points="29.74,12.93 28.27,11.0 25.19,10.67 26.45,10.38 27.88,9.83 29.39,10.31 30.62,11.1 31.45,11.98 32.44,12.76 32.34,13.58 31.54,13.11 31.44,13.84 31.89,15.04 31.48,15.2 30.01,14.58 28.94,14.14 29.63,12.96 29.74,12.93" />
    <polygon points="17.97,9.16 17.09,9.56 16.73,9.87 16.55,10.09 16.0,10.43 15.29,10.03 15.13,9.86 15.29,9.69 15.25,9.53 15.35,9.43 15.47,9.19 15.5,8.96 15.42,8.78 16.31,8.59 16.74,8.83 16.96,8.88 17.8,9.04 17.97,9.16" />
    <polygon points="15.74,23.06 15.25,22.92 15.24,22.78 15.06,22.72 15.02,22.57 14.88,22.52 14.91,22.42 14.69,22.3 14.59,22.14 14.45,22.02 14.49,21.95 14.33,21.8 14.7,21.89 15.11,22.02 15.39,22.56 15.61,22.8 15.72,22.95 15.74,23.06" />
    <polygon points="27.17,15.01 27.25,15.06 27.24,15.1 27.24,15.15 27.18,15.21 27.11,15.26 26.93,15.45 26.89,15.43 26.74,15.47 26.68,15.3 26.77,15.2 26.79,15.14 26.82,15.07 26.87,15.05 26.93,15.09 27.12,15.03 27.12,15.02 27.17,15.01 27.17,15.01" />
    <polygon points="27.73,14.57 27.35,14.68 27.12,14.53 26.9,14.35 26.76,14.52 26.54,14.74 26.22,14.65 26.05,14.4 26.06,13.98 26.09,13.58 26.32,13.58 26.5,13.62 26.73,13.79 27.14,14.03 27.34,14.34 27.43,14.41 27.73,14.57" />
    <polygon points="26.54,13.28 26.61,13.28 26.66,13.28 26.73,13.35 26.74,13.44 26.8,13.48 26.88,13.49 26.87,13.53 26.78,13.52 26.76,13.52 26.72,13.51 26.74,13.46 26.67,13.47 26.63,13.45 26.61,13.37 26.56,13.33 26.54,13.28" />
    <polygon points="29.62,12.31 29.61,12.35 29.28,12.32 29.23,12.23 29.24,12.18 29.32,12.18 29.32,12.17 29.33,12.16 29.36,12.12 29.38,12.15 29.37,12.17 29.41,12.18 29.49,12.22 29.51,12.22 29.55,12.21 29.6,12.25 29.61,12.28 29.61,12.3 29.62,12.31" />
    <polygon points="29.16,12.13 29.15,12.17 29.13,12.3 29.15,12.42 29.15,12.47 29.08,12.55 29.07,12.56 29.01,12.6 28.85,12.64 28.71,12.65 28.56,12.55 28.54,12.51 28.54,12.46 28.55,12.29 28.69,12.09 28.84,12.06 29.13,12.09 29.16,12.13" />
    <polygon points="28.03,11.73 27.98,11.76 27.95,11.72 27.97,11.68 28.02,11.62 28.08,11.59 28.1,11.56 28.16,11.52 28.15,11.47 28.21,11.45 28.27,11.5 28.24,11.55 28.21,11.54 28.18,11.59 28.13,11.67 28.11,11.71 28.03,11.73" />
    <polygon points="27.79,11.31 27.79,11.39 27.71,11.35 27.68,11.35 27.66,11.31 27.57,11.27 27.61,11.26 27.65,11.27 27.66,11.27 27.64,11.24 27.68,11.23 27.74,11.25 27.78,11.26 27.85,11.24 27.85,11.22 27.91,11.22 27.96,11.26 27.8,11.33 27.79,11.31" />
    <polygon points="20.92,9.09 20.96,9.18 20.95,9.24 20.9,9.35 20.78,9.48 20.75,9.49 20.75,9.53 20.73,9.51 20.63,9.42 20.58,9.36 20.54,9.33 20.51,9.28 20.44,9.23 20.28,9.18 20.33,9.12 20.79,9.02 20.92,9.09" />
    <polygon points="27.53,9.11 27.68,9.02 27.93,9.09 28.37,9.11 28.57,9.18 28.68,9.26 28.73,9.33 28.8,9.41 28.81,9.48 28.67,9.53 28.07,9.56 27.76,9.47 27.73,9.36 27.66,9.3 27.54,9.24 27.58,9.18 27.53,9.11" />
    <polygon points="23.24,9.74 23.16,10.04 22.65,10.15 22.4,10.27 21.97,9.89 21.73,9.78 21.59,9.4 21.91,9.6 22.12,9.42 22.18,9.42 22.2,9.3 22.07,9.19 22.2,9.02 22.43,9.06 22.87,9.17 22.74,9.44 23.22,9.7 23.24,9.74" />
    <polygon points="22.43,8.97 22.38,8.94 22.5,8.92 22.5,8.91 22.5,8.89 22.57,8.87 22.85,8.82 22.88,8.85 22.81,8.91 22.77,8.93 22.76,8.93 22.75,8.95 22.74,8.96 22.58,8.96 22.58,8.98 22.55,8.99 22.46,8.99 22.55,8.98 22.53,8.97 22.43,8.97" />
    <polygon points="24.92,8.93 24.73,9.15 24.58,9.4 24.05,9.56 23.95,9.61 23.91,9.87 23.86,10.01 23.67,9.91 23.57,9.75 23.46,9.62 23.43,9.42 23.43,9.26 23.45,9.12 23.67,9.08 23.53,8.89 24.23,8.82 24.72,8.89 24.92,8.93" />
    <polygon points="21.21,8.22 21.22,8.25 21.15,8.3 21.04,8.32 20.97,8.31 20.89,8.28 20.86,8.25 20.89,8.22 20.9,8.2 20.9,8.19 20.92,8.19 20.91,8.18 20.9,8.17 20.91,8.16 20.92,8.14 21.07,8.09 21.13,8.11 21.17,8.14 21.18,8.2 21.2,8.21 21.21,8.22 21.21,8.22" />
    <polygon points="24.05,8.36 24.0,8.53 23.59,8.51 23.48,8.45 23.41,8.43 23.32,8.35 23.28,8.36 23.24,8.33 23.2,8.24 23.34,8.19 23.34,8.12 23.29,8.11 23.42,8.1 23.52,8.0 23.89,8.09 24.01,8.23 24.04,8.34 24.05,8.36" />
    <polygon points="21.42,7.91 21.3,7.92 21.32,7.88 21.34,7.87 21.36,7.86 21.36,7.84 21.45,7.81 21.61,7.78 21.64,7.8 21.67,7.81 21.67,7.81 21.54,7.85 21.53,7.88 21.48,7.91 21.46,7.91 21.44,7.91 21.42,7.91" />
    <polygon points="21.51,7.78 21.4,7.8 21.3,7.82 21.2,7.84 21.17,7.83 21.14,7.83 21.13,7.83 21.13,7.82 21.13,7.82 21.12,7.81 21.12,7.81 21.16,7.81 21.19,7.79 21.25,7.79 21.3,7.77 21.32,7.77 21.33,7.76 21.35,7.75 21.36,7.75 21.38,7.75 21.46,7.74 21.54,7.73 21.57,7.74 21.58,7.74 21.58,7.75 21.58,7.77 21.57,7.77 21.51,7.78" />
    <polygon points="17.28,7.84 17.27,7.86 17.25,7.88 17.24,7.91 17.24,7.93 17.16,8.0 17.03,8.05 16.97,8.03 16.94,8.02 16.83,8.0 16.93,7.92 17.0,7.86 17.13,7.79 17.19,7.77 17.25,7.74 17.34,7.71 17.36,7.75 17.34,7.79 17.31,7.82 17.28,7.84" />
    <polygon points="21.16,7.76 21.15,7.75 21.09,7.75 21.0,7.73 20.98,7.7 21.0,7.68 21.02,7.66 21.08,7.66 21.14,7.64 21.19,7.63 21.25,7.63 21.36,7.61 21.49,7.63 21.52,7.66 21.52,7.69 21.5,7.7 21.32,7.75 21.16,7.76" />
    <polygon points="21.0,7.52 20.97,7.51 20.95,7.5 20.95,7.49 20.93,7.45 21.01,7.41 21.09,7.46 21.16,7.43 21.23,7.46 21.28,7.5 21.32,7.5 21.32,7.51 21.39,7.54 21.13,7.6 21.02,7.57 20.99,7.56 21.0,7.52" />
    <polygon points="22.94,8.04 22.84,8.1 22.8,8.17 22.78,8.33 22.11,8.26 22.14,8.07 21.56,8.03 21.6,7.91 21.79,7.85 21.65,7.56 22.22,7.82 22.19,7.74 22.18,7.57 22.51,7.52 22.65,7.4 22.91,7.67 22.94,8.02 22.94,8.04" />
    <polygon points="21.9,7.45 21.85,7.47 21.75,7.45 21.76,7.45 21.78,7.44 21.8,7.43 21.82,7.42 21.88,7.42 21.89,7.41 21.91,7.4 21.92,7.4 21.93,7.39 21.93,7.39 21.93,7.39 21.93,7.39 21.93,7.38 21.94,7.38 21.94,7.38 21.95,7.37 22.05,7.36 22.15,7.37 22.13,7.38 22.01,7.42 21.9,7.45" />
    <polygon points="20.72,7.96 20.08,8.32 19.42,8.43 18.55,8.42 19.01,8.25 18.49,8.29 18.22,8.19 17.61,8.24 17.72,7.85 18.28,7.52 18.83,7.88 19.44,8.03 19.61,7.75 19.5,7.47 19.86,7.52 19.99,7.88 20.71,7.88 20.72,7.96" />
    <polygon points="18.1,7.36 18.1,7.35 18.09,7.35 18.09,7.35 18.09,7.33 18.1,7.33 18.16,7.3 18.21,7.29 18.27,7.29 18.28,7.28 18.38,7.28 18.41,7.29 18.45,7.31 18.46,7.31 18.47,7.31 18.48,7.32 18.48,7.33 18.49,7.35 18.48,7.35 18.46,7.37 18.44,7.37 18.43,7.38 18.43,7.39 18.42,7.39 18.38,7.37 18.3,7.37 18.22,7.37 18.19,7.36 18.11,7.36 18.1,7.36" />
    <polygon points="27.9,8.34 27.03,8.6 26.3,8.61 25.7,8.62 25.3,8.48 24.75,8.42 24.33,8.23 23.97,7.6 23.33,7.46 23.22,7.23 24.06,7.52 24.88,7.69 24.86,7.81 25.28,8.07 26.16,8.09 27.65,7.97 27.9,8.34" />
    <polygon points="16.86,7.67 16.73,7.72 16.54,7.84 16.38,7.74 16.08,7.76 15.88,7.7 16.17,7.54 16.62,7.26 17.0,7.03 17.55,7.05 17.74,6.96 17.7,7.16 17.55,7.48 17.21,7.54 17.08,7.38 17.0,7.52 16.87,7.71 16.86,7.67" />
    <polygon points="25.09,7.02 25.06,7.07 24.93,7.11 24.88,7.1 24.74,7.05 24.69,7.01 24.67,6.98 24.66,6.93 24.67,6.92 24.67,6.89 24.7,6.88 24.84,6.86 24.94,6.89 24.96,6.9 25.08,6.99 25.08,7.01 25.09,7.02 25.09,7.02" />
    <polygon points="21.0,7.12 20.88,7.16 20.78,7.13 20.73,7.1 20.74,7.1 20.72,7.07 20.67,7.03 20.67,7.01 20.64,6.99 20.63,6.95 20.62,6.93 20.6,6.89 20.53,6.82 20.76,6.87 20.83,6.98 20.9,6.99 20.99,7.05 20.99,7.07 21.0,7.12" />
    <polygon points="24.1,6.86 24.06,6.89 24.03,6.94 23.98,6.97 23.95,6.97 23.9,6.97 23.68,6.96 23.25,6.89 23.25,6.86 23.27,6.83 23.42,6.79 23.5,6.81 23.56,6.81 23.81,6.8 23.89,6.8 23.94,6.81 24.04,6.8 24.11,6.82 24.1,6.86" />
    <polygon points="21.54,6.81 21.55,6.81 21.55,6.8 21.54,6.79 21.52,6.78 21.53,6.77 21.53,6.74 21.56,6.73 21.72,6.72 21.75,6.72 21.88,6.76 21.96,6.81 21.95,6.82 21.9,6.82 21.83,6.82 21.8,6.82 21.77,6.83 21.62,6.84 21.54,6.81 21.54,6.81" />
    <polygon points="18.42,6.74 18.45,6.77 18.29,6.83 18.16,6.8 18.19,6.8 18.15,6.77 18.02,6.69 18.04,6.68 18.07,6.69 18.12,6.67 18.19,6.64 18.25,6.63 18.24,6.65 18.26,6.67 18.31,6.68 18.35,6.71 18.42,6.74" />
    <polygon points="19.55,6.63 19.38,6.72 19.35,6.79 19.41,6.83 19.43,6.86 19.42,6.9 19.23,6.97 18.89,7.04 18.69,6.97 18.56,6.93 18.56,6.86 18.55,6.82 18.53,6.74 18.62,6.72 18.84,6.66 18.97,6.65 19.17,6.62 19.55,6.63" />
    <polygon points="19.65,6.41 19.61,6.49 19.46,6.48 19.2,6.47 19.09,6.47 19.05,6.5 18.92,6.48 18.67,6.49 18.53,6.49 18.55,6.44 18.85,6.36 19.08,6.3 19.24,6.25 19.41,6.28 19.5,6.32 19.59,6.35 19.63,6.39 19.65,6.41" />
    <polygon points="23.08,6.78 23.02,6.74 22.87,6.64 23.09,6.6 22.8,6.53 22.77,6.48 22.66,6.39 22.77,6.35 22.68,6.27 23.14,6.29 23.27,6.35 23.65,6.45 23.64,6.63 23.51,6.68 23.22,6.73 23.17,6.75 23.09,6.78 23.08,6.78" />
    <polygon points="20.66,6.05 21.37,5.96 21.49,6.05 21.5,6.18 21.77,6.08 21.99,6.23 22.33,6.33 22.34,6.5 22.49,6.73 21.99,6.64 21.45,6.48 20.82,6.39 21.28,6.33 21.24,6.23 21.1,6.25 20.98,6.15 20.66,6.08 20.66,6.05" />
    <polygon points="22.18,5.56 22.18,5.53 22.2,5.51 22.38,5.49 22.54,5.51 22.54,5.53 22.58,5.57 22.56,5.61 22.6,5.66 22.58,5.69 22.56,5.72 22.53,5.73 22.41,5.68 22.41,5.66 22.41,5.64 22.19,5.62 22.18,5.58 22.18,5.57 22.18,5.56" />
    <polygon points="23.16,5.53 23.29,5.34 23.63,5.1 24.14,4.91 24.69,5.13 25.38,5.41 25.82,5.7 26.14,5.81 25.68,6.29 25.34,6.32 25.13,6.54 24.2,6.39 24.0,6.08 24.4,5.92 23.92,5.89 23.41,5.82 23.15,5.54 23.16,5.53" />
    <polygon points="33.03,4.26 30.07,5.49 28.54,5.91 28.66,6.56 28.03,7.18 27.2,7.46 25.68,7.57 25.78,7.11 26.43,6.91 26.14,6.46 26.56,5.96 28.65,5.09 25.53,5.18 25.03,4.5 27.12,4.09 30.1,3.84 32.68,4.18 33.03,4.26" />
    <polygon points="33.31,24.56 33.1,24.65 32.99,24.68 32.92,24.41 33.05,24.1 33.2,23.94 33.24,24.1 33.13,24.38 33.12,24.43 33.06,24.51 33.02,24.61 33.13,24.59 33.13,24.49 33.15,24.4 33.29,24.32 33.36,24.45 33.31,24.54 33.31,24.56" />
    <polygon points="32.78,24.19 32.64,24.29 32.63,24.36 32.59,24.46 32.51,24.39 32.48,24.31 32.44,24.32 32.36,24.32 32.3,24.22 32.21,24.13 32.15,23.95 32.2,24.02 32.26,24.1 32.27,24.17 32.36,24.16 32.44,24.21 32.75,24.18 32.78,24.19" />
    <polygon points="32.13,22.34 32.1,22.31 32.15,22.26 32.22,22.27 32.47,22.34 32.57,22.41 32.65,22.47 32.67,22.51 32.71,22.52 32.77,22.56 32.83,22.61 32.85,22.65 32.86,22.72 32.81,22.73 32.68,22.72 32.42,22.6 32.34,22.54 32.29,22.44 32.13,22.34" />
    <polygon points="27.57,20.6 27.58,20.64 27.59,20.7 27.58,20.72 27.57,20.72 27.49,20.69 27.42,20.64 27.32,20.61 27.24,20.57 27.2,20.54 27.22,20.52 27.23,20.5 27.25,20.46 27.28,20.46 27.31,20.44 27.36,20.44 27.45,20.44 27.5,20.49 27.51,20.49 27.51,20.52 27.53,20.54 27.56,20.59 27.57,20.6" />
    <polygon points="23.02,35.57 24.25,39.67 25.78,38.02 25.5,39.62 23.77,40.97 21.67,40.01 20.06,36.36 19.67,35.35 18.58,32.74 18.48,33.92 19.1,35.71 19.52,37.21 18.43,35.13 18.18,33.91 19.94,32.35 21.7,33.44 22.96,35.59 23.02,35.57" />
    <polygon points="25.22,40.89 25.3,40.05 25.36,39.9 25.42,39.73 25.45,39.79 25.51,39.81 25.53,39.93 25.49,40.26 25.48,40.51 25.49,40.65 25.46,40.77 25.45,40.81 25.43,40.89 25.4,40.96 25.37,40.97 25.32,41.07 25.22,41.17 25.22,40.89" />
    <polygon points="27.06,44.68 27.23,45.04 27.66,44.92 28.01,44.69 28.37,44.96 28.52,45.71 28.22,45.56 28.37,45.42 28.22,45.27 28.03,44.96 27.86,45.08 27.78,45.82 27.5,45.73 27.38,45.73 27.23,45.43 26.98,45.41 27.06,44.7 27.06,44.68" />
    <polygon points="33.33,45.25 33.01,46.48 32.37,47.85 31.94,49.37 31.16,48.44 31.23,46.52 29.98,46.08 29.86,43.83 30.03,44.76 30.24,43.85 30.55,43.23 31.75,44.32 32.19,44.1 32.51,44.25 32.71,44.51 33.11,44.78 33.32,45.24 33.33,45.25" />
    <polygon points="89.16,51.44 90.04,52.13 90.49,53.04 90.98,53.33 90.89,54.14 91.22,54.8 91.54,55.33 91.77,55.78 91.68,55.82 91.31,55.63 90.86,55.25 90.58,54.54 90.18,54.21 89.92,54.16 89.5,54.55 89.34,55.13 89.16,51.46 89.16,51.44" />
    <polygon points="93.31,53.69 93.3,53.78 93.21,53.81 93.11,53.63 93.06,53.45 93.0,53.34 92.99,53.24 92.98,53.09 92.98,53.05 93.03,53.08 93.07,53.08 93.09,53.14 93.11,53.26 93.16,53.31 93.21,53.43 93.23,53.45 93.27,53.53 93.31,53.67 93.31,53.69" />
    <polygon points="92.34,52.41 92.25,53.02 92.09,53.14 91.89,53.39 91.72,53.48 91.56,53.5 91.4,53.35 91.25,53.22 91.35,53.07 91.57,53.07 91.66,52.94 91.68,52.93 91.88,53.04 92.04,52.75 92.1,52.44 92.22,52.34 92.32,52.41 92.34,52.41" />
    <polygon points="92.54,52.37 92.5,52.61 92.42,52.57 92.39,52.24 92.32,52.05 92.17,51.87 92.0,51.62 91.94,51.55 91.91,51.47 91.94,51.5 92.04,51.61 92.16,51.76 92.24,51.81 92.33,52.0 92.38,52.12 92.46,52.2 92.54,52.36 92.54,52.37" />
    <polygon points="59.55,32.83 59.59,34.15 59.38,34.43 59.1,33.64 59.07,33.84 59.33,34.64 59.72,36.16 59.98,37.38 58.32,37.78 56.94,32.87 57.92,32.75 58.44,32.52 58.85,32.48 58.84,32.58 58.91,32.75 59.15,32.72 59.52,32.68 59.55,32.83" />
    <polygon points="64.44,39.45 64.61,40.85 64.41,41.39 63.94,41.75 63.57,42.11 62.96,42.54 62.49,42.89 62.42,42.92 62.18,42.97 62.02,42.46 61.94,41.84 61.84,41.54 61.86,41.31 61.97,40.74 62.07,40.27 62.61,40.37 64.17,39.52 64.44,39.45" />
    <polygon points="65.13,43.03 65.14,43.04 65.1,43.08 65.06,43.11 65.01,43.14 64.98,43.15 64.88,43.15 64.84,43.08 64.82,43.03 64.83,42.97 64.86,42.94 64.92,42.96 64.97,42.97 65.02,42.96 65.05,42.96 65.07,42.97 65.11,43.01 65.13,43.03" />
    <polygon points="47.59,34.84 48.3,38.28 48.48,41.27 47.49,41.39 46.82,41.32 46.66,41.8 46.4,41.41 46.27,41.06 46.12,40.92 45.8,40.75 45.48,40.82 45.42,39.25 45.48,38.97 45.41,38.5 45.27,38.41 46.66,36.36 47.59,34.9 47.59,34.84" />
    <polygon points="52.72,48.7 52.77,48.8 53.15,48.86 52.89,49.44 52.76,49.48 52.72,49.41 52.71,49.39 52.68,49.4 52.64,49.37 52.6,49.35 52.63,49.25 52.66,49.16 52.7,49.12 52.69,49.03 52.71,48.97 52.71,48.84 52.72,48.7" />
    <polygon points="45.35,42.74 45.37,42.51 45.44,42.64 45.49,42.61 45.51,42.54 45.66,42.53 45.75,42.5 45.66,42.51 45.47,42.57 45.4,42.47 45.7,42.42 45.91,42.44 46.1,42.47 46.06,42.64 45.89,42.55 45.7,42.56 45.35,42.7 45.35,42.74" />
    <polygon points="59.45,30.52 59.42,30.51 59.4,30.52 59.36,30.53 59.34,30.54 59.31,30.52 59.3,30.53 59.27,30.45 59.21,30.46 59.15,30.5 59.1,30.48 59.14,30.44 59.24,30.37 59.52,30.24 59.6,30.2 59.44,30.38 59.45,30.52" />
    <polygon points="35.63,95.59 47.03,89.75 57.39,89.45 65.66,87.11 70.88,88.82 82.69,87.3 91.39,88.02 96.91,90.32 94.95,93.64 50.49,100.0 8.87,94.39 18.09,91.35 27.66,90.66 32.62,85.94 31.94,87.39 32.39,91.76 35.38,95.64 35.63,95.59" />
    <polygon points="96.57,93.4 96.57,93.41 96.57,93.41 96.53,93.46 96.47,93.47 96.36,93.46 96.2,93.51 96.15,93.49 96.12,93.44 96.12,93.38 96.15,93.38 96.2,93.4 96.33,93.45 96.41,93.42 96.5,93.34 96.53,93.33 96.56,93.35 96.56,93.38 96.57,93.4" />
    <polygon points="33.53,94.56 33.45,94.61 33.39,94.68 33.46,94.72 33.41,94.76 33.15,94.98 32.46,94.77 32.14,94.86 31.59,94.56 31.95,94.66 32.87,94.54 32.86,94.45 33.32,94.27 33.4,94.34 33.44,94.39 33.38,94.44 33.52,94.54 33.53,94.56" />
    <polygon points="31.63,94.24 31.68,94.26 31.6,94.26 31.59,94.29 31.79,94.32 31.79,94.34 31.8,94.38 31.81,94.41 31.74,94.44 31.58,94.49 31.55,94.46 31.56,94.43 31.39,94.4 31.44,94.33 31.17,94.22 31.19,94.18 31.23,94.2 31.41,94.21 31.54,94.23 31.63,94.24" />
    <polygon points="31.05,94.05 31.09,94.02 31.22,94.01 31.38,94.04 31.33,94.07 31.32,94.06 31.25,94.11 31.29,94.12 31.31,94.13 31.32,94.14 31.28,94.16 31.13,94.16 30.96,94.13 30.96,94.12 31.25,94.07 31.2,94.06 31.19,94.05 31.19,94.05 31.04,94.07 31.0,94.06 31.05,94.05" />
    <polygon points="40.58,94.06 40.56,94.08 40.54,94.09 40.41,94.08 40.29,94.08 40.17,94.07 40.04,94.07 39.92,94.06 39.8,94.05 39.77,94.03 39.74,93.99 39.75,94.0 39.8,94.04 39.83,94.04 39.84,94.04 39.83,94.03 39.83,94.02 39.82,94.02 39.82,94.01 39.93,94.0 40.04,93.98 40.06,93.97 40.09,93.95 40.1,93.94 40.14,93.94 40.28,93.97 40.41,94.01 40.55,94.04 40.58,94.06" />
    <polygon points="31.46,93.58 31.37,93.63 31.29,93.69 30.85,93.94 30.83,93.97 30.73,94.04 30.66,94.11 30.62,94.13 30.68,94.18 30.63,94.2 30.15,94.25 30.05,94.16 30.09,94.03 30.45,93.82 30.7,93.72 31.19,93.57 31.48,93.52 31.44,93.58 31.46,93.58" />
    <polygon points="35.41,94.56 36.04,94.15 35.96,93.98 36.04,93.81 36.05,93.68 36.33,93.41 37.51,93.32 37.68,93.68 37.93,93.86 37.97,94.04 38.07,94.16 37.92,94.5 36.45,94.78 35.49,94.91 34.89,94.79 35.06,94.64 35.44,94.48 35.41,94.56" />
    <polygon points="44.34,91.35 44.33,91.38 44.21,91.37 44.2,91.33 44.15,91.2 43.88,91.17 44.13,91.08 44.19,90.95 44.27,90.9 44.27,90.89 44.3,90.93 44.31,91.0 44.28,91.04 44.28,91.1 44.26,91.13 44.26,91.16 44.33,91.28 44.34,91.35" />
    <polygon points="29.21,90.48 29.38,90.57 29.33,90.65 29.25,90.71 29.29,90.73 29.31,90.77 29.34,90.81 29.32,90.87 29.16,90.85 28.87,90.7 28.87,90.61 29.02,90.62 29.06,90.58 29.16,90.58 29.05,90.56 28.95,90.5 29.02,90.48 29.18,90.48 29.21,90.48" />
    <polygon points="23.47,90.18 23.24,90.32 22.99,90.28 22.45,90.21 21.74,90.09 22.19,89.9 22.29,90.02 22.6,90.05 22.71,89.89 22.68,90.09 22.83,90.04 22.94,89.99 22.99,90.07 23.32,89.95 23.08,90.14 23.47,90.08 23.32,90.14 23.47,90.18" />
    <polygon points="29.19,89.46 28.85,89.52 28.77,89.5 28.74,89.43 28.78,89.38 29.11,89.32 29.16,89.27 29.16,89.23 29.19,89.21 29.26,89.28 29.31,89.31 29.31,89.22 29.36,89.21 29.4,89.25 29.4,89.21 29.43,89.19 29.55,89.26 29.55,89.32 29.26,89.44 29.19,89.46" />
    <polygon points="29.03,88.96 28.94,88.9 28.95,88.85 29.1,88.8 29.09,88.77 29.05,88.77 29.23,88.74 29.29,88.81 29.3,88.83 29.33,88.85 29.33,88.86 29.32,88.87 29.27,88.88 29.26,88.9 29.27,88.92 29.28,88.95 29.25,88.97 29.2,88.99 29.03,88.96" />
    <polygon points="30.15,90.35 30.38,90.2 30.19,89.91 29.88,89.82 29.12,89.86 29.59,89.78 30.19,89.45 30.61,89.36 30.49,89.01 30.02,88.87 30.09,88.56 30.53,88.31 30.7,88.62 30.98,89.23 31.04,89.66 30.9,90.14 30.32,90.32 30.15,90.35" />
    <polygon points="30.8,87.57 30.81,87.44 31.16,87.01 31.2,87.06 31.16,87.1 31.13,87.14 31.13,87.21 31.12,87.26 31.19,87.3 31.15,87.33 31.12,87.37 31.08,87.44 31.08,87.53 31.0,87.53 30.96,87.63 30.91,87.64 30.85,87.61 30.81,87.59 30.8,87.57" />
    <polygon points="32.53,85.85 32.47,85.91 32.42,85.97 32.37,85.96 32.31,86.03 32.22,85.99 32.15,85.94 32.17,85.88 32.26,85.8 32.32,85.76 32.34,85.7 32.43,85.71 32.45,85.74 32.41,85.79 32.44,85.82 32.43,85.88 32.51,85.85 32.53,85.85" />
    <polygon points="34.02,85.74 33.98,85.74 33.97,85.72 33.94,85.78 33.91,85.73 33.84,85.76 33.85,85.71 33.76,85.63 33.8,85.53 33.9,85.46 33.94,85.51 33.94,85.6 34.02,85.56 34.06,85.63 34.15,85.64 34.07,85.7 34.04,85.76 34.02,85.74" />
    <polygon points="34.68,85.11 34.71,85.16 34.65,85.2 34.56,85.19 34.51,85.17 34.49,85.18 34.48,85.17 34.47,85.17 34.45,85.19 34.38,85.23 34.34,85.24 34.31,85.23 34.3,85.21 34.3,85.18 34.32,85.14 34.52,85.08 34.59,85.08 34.57,85.1 34.61,85.11 34.68,85.11" />
    <polygon points="33.01,84.81 33.01,84.77 33.1,84.76 33.1,84.74 33.11,84.7 33.14,84.73 33.17,84.76 33.24,84.75 33.29,84.71 33.31,84.72 33.31,84.77 33.3,84.84 33.24,84.86 33.25,84.82 33.22,84.82 33.24,84.8 33.14,84.79 33.11,84.82 33.01,84.81" />
    <polygon points="33.76,84.53 33.7,84.57 33.67,84.55 33.66,84.54 33.62,84.57 33.69,84.46 33.76,84.42 33.83,84.42 33.98,84.4 33.98,84.43 33.95,84.45 33.85,84.48 33.84,84.5 33.82,84.55 33.78,84.5 33.78,84.49 33.76,84.5 33.72,84.55 33.76,84.53" />
    <polygon points="4.91,96.07 5.02,96.1 5.05,96.13 5.04,96.14 5.01,96.18 4.89,96.19 4.65,96.16 4.64,96.14 4.65,96.14 4.58,96.12 4.55,96.1 4.55,96.08 4.57,96.07 4.55,96.06 4.51,96.04 4.53,96.04 4.5,96.03 4.63,96.03 4.87,96.04 4.91,96.07" />
    <polygon points="3.05,96.2 3.08,96.22 3.11,96.22 3.11,96.23 3.1,96.24 2.97,96.23 2.83,96.21 2.83,96.21 2.83,96.21 2.82,96.2 2.82,96.19 2.68,96.15 2.54,96.11 2.41,96.07 2.27,96.04 2.25,96.02 2.27,96.01 2.4,96.04 2.53,96.07 2.66,96.11 2.79,96.14 2.92,96.17 3.05,96.2" />
    <polygon points="6.01,95.5 6.01,95.5 6.03,95.52 6.04,95.53 6.13,95.57 6.15,95.57 6.16,95.57 6.16,95.58 6.13,95.6 6.11,95.61 6.09,95.61 6.08,95.61 6.09,95.6 6.09,95.6 6.1,95.6 6.09,95.58 6.08,95.58 6.0,95.55 5.92,95.5 5.83,95.45 5.83,95.44 5.83,95.43 5.84,95.43 5.86,95.43 5.93,95.46 6.0,95.49 6.01,95.49 6.01,95.5" />
    <polygon points="5.4,95.33 5.15,95.31 4.9,95.3 4.65,95.28 4.51,95.26 4.54,95.26 4.54,95.25 4.45,95.22 4.46,95.21 4.47,95.19 4.61,95.16 4.85,95.17 5.11,95.21 5.37,95.26 5.38,95.28 5.37,95.29 5.43,95.31 5.43,95.33 5.4,95.33" />
    <polygon points="7.19,94.47 7.12,94.46 7.13,94.46 7.14,94.45 7.12,94.45 7.11,94.45 7.1,94.45 7.1,94.44 7.1,94.44 7.1,94.43 7.08,94.42 6.95,94.41 6.94,94.4 6.94,94.39 6.81,94.37 6.76,94.34 6.76,94.34 6.76,94.34 6.77,94.33 6.78,94.33 6.9,94.36 7.01,94.39 7.13,94.42 7.24,94.45 7.25,94.46 7.24,94.47 7.19,94.47 7.19,94.47" />
    <polygon points="41.77,94.4 41.7,94.39 41.62,94.38 41.67,94.42 41.58,94.44 41.53,94.41 41.49,94.4 41.48,94.42 41.15,94.36 41.11,94.34 41.13,94.3 41.07,94.28 41.09,94.26 41.34,94.31 41.57,94.36 41.42,94.29 41.41,94.27 41.47,94.28 41.73,94.36 41.77,94.4" />
    <polygon points="5.6,94.08 5.69,94.15 5.74,94.2 5.78,94.25 5.84,94.32 5.81,94.34 4.84,94.23 4.36,94.05 4.36,94.0 4.37,93.96 4.38,93.92 4.4,93.88 4.51,93.85 4.53,93.81 4.65,93.73 4.96,93.77 5.18,93.89 5.6,94.08" />
    <polygon points="97.02,93.03 97.05,93.07 96.91,93.13 96.5,93.14 96.41,93.19 96.3,93.25 96.35,93.18 96.25,93.17 96.36,93.15 96.21,93.12 96.19,93.09 96.16,93.07 96.24,93.02 96.27,92.96 96.26,92.88 96.4,92.89 96.41,92.95 96.43,92.97 96.86,93.0 97.02,93.03" />
    <polygon points="8.41,92.85 8.39,92.84 8.39,92.84 8.29,92.83 8.17,92.8 8.11,92.77 8.12,92.76 8.22,92.73 8.21,92.72 8.2,92.72 8.22,92.71 8.22,92.73 8.38,92.71 8.4,92.74 8.49,92.79 8.49,92.8 8.49,92.81 8.49,92.81 8.49,92.82 8.53,92.83 8.54,92.85 8.41,92.85 8.41,92.85" />
    <polygon points="13.63,91.36 13.62,91.37 13.62,91.4 13.62,91.41 13.59,91.44 13.58,91.45 13.4,91.41 13.37,91.41 13.33,91.39 13.33,91.37 13.3,91.35 13.33,91.32 13.41,91.29 13.44,91.3 13.44,91.3 13.62,91.34 13.62,91.35 13.63,91.36" />
    <polygon points="17.74,91.06 17.72,91.08 17.68,91.1 17.64,91.13 17.61,91.14 17.6,91.15 17.64,91.16 17.64,91.16 17.63,91.17 17.61,91.19 17.56,91.21 17.45,91.22 17.42,91.21 17.41,91.21 17.4,91.2 17.39,91.18 17.39,91.16 17.4,91.16 17.53,91.1 17.67,91.04 17.69,91.04 17.74,91.06" />
    <polygon points="16.59,91.07 16.6,91.11 16.37,91.22 16.37,91.25 16.36,91.3 15.86,91.3 15.9,91.24 15.85,91.19 15.87,91.16 15.9,91.14 15.9,91.12 16.02,91.06 15.85,91.04 15.74,91.02 15.76,90.99 16.04,90.93 16.56,91.02 16.59,91.07" />
    <polygon points="14.59,90.86 14.59,90.81 14.69,90.72 15.11,90.82 15.2,90.94 15.21,91.0 15.3,91.04 15.39,90.96 15.52,91.1 15.62,91.16 15.6,91.19 15.41,91.23 15.07,91.12 15.02,91.08 14.86,90.96 14.73,90.94 14.66,90.9 14.59,90.86" />
    <polygon points="49.25,89.34 49.41,89.34 49.41,89.37 49.38,89.39 49.37,89.41 49.36,89.45 49.24,89.54 49.22,89.51 49.21,89.49 49.21,89.48 49.24,89.45 49.17,89.41 49.18,89.39 49.17,89.36 49.04,89.31 49.02,89.27 49.19,89.27 49.3,89.3 49.25,89.34" />
    <polygon points="86.54,67.56 81.94,68.7 81.58,62.63 84.2,59.28 84.74,58.56 85.07,57.9 85.96,58.05 86.72,56.28 87.97,56.77 89.27,58.84 90.37,58.47 91.5,61.95 92.61,65.54 91.65,70.55 88.92,70.87 88.24,68.31 86.71,67.77 86.54,67.56" />
    <polygon points="91.11,74.02 91.07,73.87 90.92,73.77 90.82,74.0 90.72,74.2 90.6,74.1 90.5,74.01 90.34,73.52 90.37,73.42 90.18,72.76 90.41,72.7 90.8,72.86 91.1,72.64 91.2,73.19 91.17,73.3 91.1,73.69 91.11,73.98 91.11,74.02" />
    <polygon points="88.37,69.9 88.33,69.95 88.24,69.95 88.23,70.0 88.15,70.0 88.08,70.02 88.01,70.02 87.98,70.03 87.93,69.95 87.94,69.89 88.0,69.84 88.15,69.77 88.22,69.77 88.24,69.81 88.27,69.86 88.29,69.89 88.35,69.87 88.37,69.9" />
    <polygon points="38.65,13.84 38.13,16.0 37.43,16.03 36.22,15.41 35.74,14.08 35.38,12.94 36.02,12.25 35.72,10.72 34.15,8.46 31.36,6.03 37.47,3.92 45.22,4.73 44.25,8.17 43.92,10.14 43.64,11.13 40.45,12.96 38.69,13.86 38.65,13.84" />
    <polygon points="35.3,11.47 35.04,11.51 34.94,11.43 35.1,11.42 35.17,11.35 35.05,11.41 35.03,11.34 34.96,11.36 34.72,11.28 34.81,11.25 34.84,11.25 34.76,11.15 34.79,11.09 34.91,10.93 35.28,11.05 35.56,11.22 35.6,11.31 35.33,11.47 35.3,11.47" />
    <polygon points="30.12,7.01 30.15,7.0 30.18,7.01 30.14,7.03 30.1,7.04 30.08,7.05 29.96,7.04 29.97,7.04 29.97,7.03 29.92,7.03 29.84,6.99 29.85,6.98 29.9,6.97 29.9,6.97 29.93,6.97 29.94,6.97 29.96,6.97 30.09,6.99 30.12,7.01" />
    <polygon points="30.46,6.99 30.52,6.99 30.54,7.0 30.53,7.0 30.51,7.0 30.49,7.01 30.37,7.01 30.26,7.01 30.25,7.01 30.24,7.0 30.23,6.99 30.22,6.98 30.19,6.97 30.2,6.97 30.2,6.97 30.22,6.97 30.24,6.96 30.29,6.97 30.31,6.96 30.38,6.97 30.46,6.99" />
    <polygon points="35.2,4.35 35.18,4.33 35.21,4.28 35.34,4.27 35.39,4.29 35.39,4.3 35.41,4.33 35.54,4.37 35.77,4.44 35.78,4.45 35.75,4.46 35.53,4.45 35.41,4.42 35.27,4.4 35.22,4.38 35.21,4.37 35.21,4.36 35.21,4.35 35.2,4.35" />
    <polygon points="37.63,4.21 37.66,4.25 37.58,4.27 37.53,4.35 37.55,4.41 37.41,4.37 37.25,4.31 36.95,4.23 36.94,4.21 36.89,4.16 36.84,4.15 36.74,4.09 36.98,4.09 37.01,4.09 37.06,4.07 37.32,4.11 37.41,4.13 37.53,4.17 37.63,4.21" />
    <polygon points="39.05,3.83 39.08,3.84 39.09,3.84 39.09,3.84 39.08,3.85 39.07,3.86 39.02,3.89 38.98,3.89 38.96,3.89 38.95,3.88 38.93,3.88 38.9,3.86 38.88,3.85 38.8,3.85 38.79,3.84 38.78,3.83 38.78,3.83 38.78,3.83 38.77,3.83 38.76,3.82 38.75,3.81 38.75,3.81 38.74,3.81 38.74,3.8 38.74,3.8 38.82,3.8 38.9,3.8 38.94,3.82 39.05,3.83" />
    <polygon points="38.86,3.86 38.87,3.87 38.88,3.88 38.89,3.88 38.9,3.88 38.93,3.9 38.81,3.89 38.69,3.87 38.64,3.85 38.6,3.85 38.59,3.84 38.57,3.82 38.49,3.8 38.48,3.8 38.48,3.8 38.48,3.8 38.49,3.79 38.57,3.79 38.65,3.79 38.66,3.8 38.68,3.82 38.69,3.82 38.71,3.83 38.75,3.85 38.82,3.85 38.84,3.86 38.85,3.86 38.86,3.86" />
    <polygon points="39.21,3.79 39.26,3.82 39.19,3.83 39.18,3.82 38.93,3.78 38.92,3.76 38.79,3.74 38.7,3.73 38.71,3.71 38.73,3.7 38.78,3.7 38.74,3.69 38.81,3.69 38.89,3.72 38.98,3.73 39.03,3.77 39.21,3.79" />
    <polygon points="42.97,10.7 42.95,10.75 42.79,10.81 42.74,10.81 42.64,10.81 42.5,10.82 42.2,10.87 42.23,10.82 42.24,10.76 42.38,10.68 42.48,10.61 42.77,10.55 42.87,10.52 42.85,10.56 42.95,10.63 42.96,10.66 42.96,10.68 42.97,10.7" />
    <polygon points="43.9,9.76 43.82,9.75 43.68,9.76 43.69,9.79 43.83,9.84 43.85,9.9 43.74,9.9 43.67,9.88 43.35,9.74 43.33,9.73 43.24,9.67 43.22,9.6 43.41,9.52 43.61,9.59 43.69,9.65 43.78,9.67 43.83,9.72 43.9,9.76" />
    <polygon points="43.91,9.59 43.92,9.62 43.86,9.62 43.82,9.61 43.69,9.59 43.67,9.55 43.44,9.52 43.17,9.47 43.54,9.4 43.86,9.48 43.89,9.48 43.92,9.5 43.9,9.53 43.84,9.55 43.87,9.56 43.89,9.59 43.91,9.59" />
    <polygon points="43.19,9.42 43.12,9.4 42.9,9.36 42.86,9.34 42.86,9.33 42.9,9.31 42.98,9.26 42.97,9.23 43.21,9.21 43.55,9.3 43.3,9.29 43.05,9.27 43.08,9.27 43.23,9.3 43.39,9.33 43.61,9.36 43.62,9.38 43.2,9.42 43.19,9.42" />
    <polygon points="44.35,8.75 44.38,8.76 44.41,8.77 44.32,8.81 44.16,8.84 44.05,8.81 43.89,8.76 43.9,8.73 43.92,8.71 43.92,8.71 43.92,8.71 43.93,8.69 44.17,8.64 44.18,8.64 44.21,8.65 44.3,8.67 44.32,8.69 44.32,8.71 44.32,8.72 44.33,8.73 44.33,8.74 44.35,8.75" />
    <polygon points="45.19,8.26 45.18,8.32 45.13,8.36 45.11,8.34 45.03,8.31 44.74,8.31 44.77,8.25 44.74,8.16 44.85,8.12 44.94,8.16 44.96,8.12 45.02,8.12 45.01,8.19 44.94,8.2 44.99,8.23 45.03,8.26 45.11,8.28 45.14,8.25 45.19,8.26" />
    <polygon points="44.63,6.73 44.64,6.73 44.65,6.74 44.66,6.75 44.66,6.76 44.65,6.77 44.64,6.78 44.53,6.75 44.42,6.72 44.31,6.7 44.31,6.69 44.31,6.68 44.32,6.68 44.39,6.68 44.4,6.68 44.41,6.67 44.43,6.67 44.44,6.67 44.45,6.67 44.45,6.67 44.46,6.68 44.46,6.69 44.47,6.7 44.47,6.71 44.51,6.73 44.62,6.72 44.63,6.73" />
    <polygon points="44.79,5.57 44.81,5.57 44.84,5.55 45.07,5.5 45.2,5.55 45.21,5.55 45.18,5.58 45.11,5.64 44.95,5.73 44.84,5.72 44.7,5.68 44.65,5.65 44.61,5.64 44.68,5.61 44.71,5.59 44.74,5.59 44.74,5.58 44.73,5.55 44.76,5.54 44.77,5.54 44.79,5.55 44.79,5.57" />
    <polygon points="100.0,58.97 99.89,59.2 99.88,59.29 99.93,59.21 99.96,59.24 99.95,59.3 99.84,59.34 99.75,59.34 99.69,59.37 99.61,59.33 99.6,59.26 99.67,59.21 99.71,59.15 99.83,59.12 99.87,59.02 99.91,59.01 100.0,58.97 100.0,58.97" />
    <polygon points="99.64,60.0 99.6,60.05 99.55,60.07 99.52,60.09 99.43,60.15 99.33,60.09 99.25,60.01 99.27,59.91 99.28,59.82 99.31,59.73 99.35,59.72 99.39,59.65 99.45,59.65 99.52,59.7 99.57,59.75 99.61,59.88 99.61,59.98 99.64,60.0" />
    <polygon points="97.99,74.04 97.93,74.35 97.46,75.26 97.15,75.83 96.76,75.85 96.38,75.52 96.39,75.32 96.4,75.07 96.56,74.86 97.06,74.25 97.64,73.24 97.93,72.54 98.18,72.86 98.3,72.82 98.38,72.77 98.36,72.97 98.09,73.91 97.99,74.04" />
    <polygon points="99.15,72.0 98.58,73.0 98.27,71.83 98.55,70.76 98.44,70.32 98.42,70.1 98.18,69.71 97.97,69.15 98.17,69.38 98.39,69.63 98.43,69.89 98.52,70.44 98.74,70.47 98.85,70.47 98.93,70.93 99.6,70.94 99.14,71.91 99.15,72.0" />
    <polygon points="96.4,62.35 96.34,62.4 96.27,62.36 96.21,62.34 96.16,62.24 96.06,62.15 95.96,62.01 95.83,61.86 95.76,61.7 95.66,61.51 95.56,61.26 95.64,61.26 95.91,61.56 95.99,61.78 96.11,61.94 96.22,62.05 96.38,62.3 96.4,62.35" />
    <polygon points="62.29,61.32 62.3,59.4 62.67,58.92 62.88,58.79 63.07,58.45 63.33,58.12 63.31,57.73 63.48,57.44 63.63,56.83 63.7,56.83 63.85,57.19 64.02,58.57 63.85,59.16 63.29,62.64 62.55,64.22 62.12,62.93 62.23,61.52 62.29,61.32" />
    <polygon points="85.16,45.94 85.03,46.4 84.87,46.38 84.78,46.61 84.43,46.21 84.28,45.79 84.18,45.79 84.02,45.74 83.91,45.82 84.17,45.3 84.38,45.22 84.55,45.23 84.71,45.02 84.85,44.54 85.06,44.83 85.1,45.25 85.16,45.8 85.16,45.94" />
    <polygon points="83.97,39.78 83.98,40.77 83.78,41.29 83.94,42.13 84.11,42.05 84.26,42.18 84.37,42.55 84.42,42.99 84.31,42.8 84.03,42.37 83.77,42.28 83.51,42.26 83.49,41.98 83.32,41.38 83.43,41.07 83.48,39.88 83.96,39.72 83.97,39.78" />
    <polygon points="84.33,43.98 84.26,44.26 84.23,44.45 84.2,44.66 84.23,44.74 84.21,44.96 84.14,44.84 84.07,44.77 84.03,44.69 84.01,44.61 84.03,44.46 84.13,44.39 84.13,44.14 84.15,43.97 84.24,43.9 84.28,43.92 84.32,43.94 84.33,43.98" />
    <polygon points="84.46,43.98 84.45,44.12 84.45,44.23 84.43,44.26 84.37,44.36 84.35,44.41 84.33,44.52 84.29,44.72 84.27,44.56 84.28,44.45 84.3,44.4 84.36,44.18 84.38,44.09 84.42,43.86 84.43,43.81 84.46,43.77 84.45,43.86 84.46,43.95 84.46,43.98" />
    <polygon points="83.24,44.14 83.06,44.44 82.98,44.63 82.81,44.96 82.61,45.29 82.59,45.19 82.74,44.89 82.88,44.64 83.01,44.4 83.05,44.25 83.12,44.17 83.12,43.92 83.17,44.02 83.15,43.89 83.18,43.7 83.2,43.88 83.24,44.07 83.24,44.14" />
    <polygon points="84.8,44.26 84.74,44.28 84.73,44.43 84.67,44.36 84.65,44.17 84.64,43.94 84.59,43.95 84.55,43.91 84.56,43.81 84.54,43.67 84.57,43.64 84.68,43.65 84.71,43.66 84.72,43.74 84.73,43.79 84.76,44.05 84.78,44.22 84.8,44.26" />
    <polygon points="84.21,43.62 84.2,43.72 84.17,43.83 84.14,43.87 84.1,44.0 84.06,44.04 83.95,44.09 83.87,44.16 83.9,43.75 83.89,43.48 83.86,43.4 83.89,43.39 84.02,43.53 84.07,43.58 84.09,43.55 84.15,43.64 84.2,43.61 84.21,43.62" />
    <polygon points="84.92,43.81 84.89,43.82 84.83,43.83 84.76,43.73 84.69,43.63 84.72,43.51 84.67,43.39 84.6,43.31 84.56,43.03 84.69,43.02 84.75,43.03 84.81,43.14 84.86,43.2 84.86,43.29 84.85,43.46 84.86,43.59 84.9,43.71 84.92,43.81" />
    <polygon points="83.76,42.94 83.73,43.04 83.73,43.12 83.71,43.16 83.64,43.18 83.64,43.15 83.59,42.99 83.55,42.87 83.49,42.65 83.44,42.55 83.44,42.49 83.53,42.51 83.61,42.49 83.65,42.55 83.67,42.55 83.74,42.7 83.75,42.85 83.76,42.94" />
    <polygon points="72.74,46.06 72.43,46.68 72.27,46.64 72.17,46.01 72.14,45.49 72.17,45.46 72.24,44.97 72.3,44.75 72.26,44.66 72.34,44.67 72.47,44.92 72.51,45.07 72.54,45.28 72.61,45.47 72.66,45.59 72.7,45.76 72.73,45.86 72.74,46.06" />
    <polygon points="83.86,36.14 83.84,36.39 83.81,36.54 83.73,37.06 83.65,37.37 83.55,37.8 83.48,37.54 83.39,37.36 83.36,37.2 83.36,37.11 83.37,36.98 83.41,36.72 83.51,36.41 83.59,36.21 83.69,36.04 83.78,35.96 83.88,36.1 83.86,36.14" />
    <polygon points="86.57,31.96 86.46,32.56 86.33,32.57 86.26,32.68 86.16,32.21 86.28,31.83 86.2,31.74 86.08,31.85 86.02,31.61 86.04,31.63 86.06,31.5 86.14,31.35 86.24,31.26 86.39,31.23 86.58,31.53 86.69,31.7 86.57,31.96" />
    <polygon points="87.41,31.21 87.28,31.46 87.07,31.44 87.01,31.56 86.95,31.79 86.85,31.75 86.78,31.66 86.78,31.56 86.77,31.49 86.7,31.46 86.84,31.29 86.94,31.05 87.12,31.07 87.21,30.91 87.31,30.96 87.4,31.01 87.41,31.18 87.41,31.21" />
    <polygon points="87.06,30.86 86.65,31.14 86.37,30.89 87.0,30.24 87.68,30.25 88.15,29.18 88.82,27.86 89.16,27.25 89.37,27.56 89.36,28.35 89.16,28.97 88.84,30.36 88.6,30.75 88.04,30.64 87.92,30.96 87.52,30.96 87.1,30.86 87.06,30.86" />
    <polygon points="90.49,25.9 90.31,26.04 90.21,26.13 89.77,26.68 89.15,26.48 89.14,26.68 89.01,26.86 88.93,26.73 88.93,26.25 89.03,25.91 89.27,25.8 89.35,24.81 89.7,25.2 90.04,25.5 90.37,25.37 90.39,25.94 90.49,25.9 90.49,25.9" />
    <polygon points="45.95,13.12 46.21,13.8 45.86,14.26 45.29,14.49 44.31,14.61 43.82,14.43 43.98,14.07 43.44,13.94 43.88,13.61 43.2,13.6 43.58,13.27 43.63,13.17 44.0,13.49 44.37,13.52 44.85,13.35 45.37,13.26 45.85,13.12 45.95,13.12" />
    <polygon points="69.6,77.32 69.44,77.42 69.37,77.46 69.53,77.54 69.36,77.51 69.23,77.51 69.16,77.62 69.13,77.43 69.15,77.3 69.12,77.16 69.16,77.11 69.19,77.17 69.29,77.23 69.35,77.29 69.3,77.36 69.41,77.36 69.56,77.25 69.6,77.32" />
    <polygon points="31.77,39.84 31.77,39.89 31.71,39.97 31.62,40.04 31.59,40.03 31.53,40.01 31.47,40.01 31.41,40.03 31.36,40.03 31.34,39.99 31.34,39.9 31.33,39.79 31.46,39.73 31.62,39.74 31.65,39.76 31.7,39.75 31.74,39.79 31.77,39.84" />
    <polygon points="28.82,39.99 28.79,40.07 28.71,40.05 28.68,40.02 28.63,40.09 28.57,40.07 28.56,40.13 28.48,40.09 28.38,40.02 28.31,39.89 28.23,39.85 28.26,39.77 28.34,39.75 28.51,39.74 28.58,39.77 28.65,39.81 28.73,39.88 28.82,39.99" />
    <polygon points="94.67,55.47 94.58,55.49 94.55,55.47 94.46,55.46 94.41,55.43 94.37,55.38 94.35,55.36 94.33,55.29 94.34,55.23 94.34,55.16 94.41,55.21 94.45,55.23 94.49,55.23 94.52,55.23 94.56,55.24 94.63,55.35 94.66,55.4 94.67,55.45 94.67,55.47" />
    <polygon points="94.82,55.34 94.77,55.21 94.71,55.13 94.66,54.96 94.64,54.76 94.63,54.64 94.65,54.61 94.67,54.68 94.72,54.82 94.71,54.91 94.74,54.94 94.76,54.99 94.78,55.05 94.79,55.09 94.79,55.12 94.79,55.16 94.83,55.35 94.82,55.34" />
    <polygon points="94.41,54.73 94.39,54.73 94.34,54.64 94.26,54.57 94.19,54.51 94.17,54.49 94.15,54.45 94.09,54.38 94.05,54.29 94.06,54.21 94.09,54.22 94.12,54.28 94.18,54.37 94.22,54.4 94.26,54.44 94.3,54.48 94.39,54.66 94.4,54.71 94.41,54.73" />
    <polygon points="40.03,80.38 40.0,80.45 39.97,80.49 39.87,80.3 39.78,80.22 39.68,80.14 39.61,80.08 39.52,80.02 39.51,80.0 39.66,80.04 39.73,80.03 39.82,80.06 39.86,80.1 39.86,80.15 39.92,80.15 39.97,80.25 40.02,80.37 40.03,80.38" />
    <polygon points="33.44,78.75 33.28,78.89 33.21,78.98 33.14,78.98 33.09,78.95 33.1,78.86 33.2,78.87 33.21,78.81 33.25,78.78 33.23,78.73 33.2,78.72 33.19,78.61 33.16,78.53 33.37,78.55 33.49,78.56 33.54,78.59 33.48,78.66 33.44,78.75" />
    <polygon points="33.94,78.72 33.83,78.8 33.69,78.86 33.65,78.92 33.54,78.89 33.6,78.97 33.5,78.99 33.45,79.0 33.44,78.9 33.51,78.8 33.61,78.78 33.58,78.59 33.69,78.52 33.75,78.58 33.82,78.67 33.81,78.56 33.87,78.66 33.94,78.72" />
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
        <a href="#/herstories" class="map-egg" style="top:${HER_STORIES[0].coords.top}; left:${HER_STORIES[0].coords.left};" aria-label="A quiet corner of the map">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <path d="M58 58 C40 62,20 68,8 88 C26 82,42 76,56 74 C50 82,48 90,52 98 C62 88,68 76,66 64 Z" fill="var(--brass)"/>
            <path d="M60 46 C46 24,26 10,6 8 C20 20,28 30,30 42 C42 34,54 36,62 46 Z" fill="var(--brass-bright)"/>
            <ellipse cx="58" cy="56" rx="17" ry="15" fill="var(--brass-bright)"/>
            <circle cx="78" cy="38" r="12" fill="var(--brass-bright)"/>
            <path d="M88 33 L100 39 L88 45 Z" fill="var(--brass-bright)"/>
          </svg>
        </a>
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

function sampleRandom(arr, n) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function renderHome() {
  const featured = ADVENTURES[Math.floor(Math.random() * ADVENTURES.length)];
  const featuredDests = sampleRandom(DESTINATIONS, 3);
  const topRestaurants = sampleRandom(getAllRestaurants(), 3);
  const mysteryMisadventure = MISADVENTURES[Math.floor(Math.random() * MISADVENTURES.length)];

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
          <span class="eyebrow">Where the Pin Drops</span>
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
          <span class="eyebrow">Flip the Passport Pages</span>
          <h2 class="section-title">Check out this spot</h2>
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
          <span class="eyebrow">Your Next Reservation</span>
          <h2 class="section-title">Restaurants worth the flight</h2>
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
      <span class="eyebrow">The Mishap You Might've Missed</span>
      <div class="misadventure-card reveal mt-lg" style="max-width: 720px;">
        <span class="misadventure-icon">${mysteryMisadventure.icon}</span>
        <h3 class="misadventure-title">${escapeHtml(mysteryMisadventure.title)}</h3>
        <span class="misadventure-loc">${escapeHtml(mysteryMisadventure.location)}</span>
        <p class="misadventure-body">${escapeHtml(mysteryMisadventure.body)}</p>
        ${misadventurePhotosHTML(mysteryMisadventure)}
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

function initAdventureRouteMap(a) {
  const stage = document.getElementById("advRouteMap");
  if (!stage) return;
  const pins = Array.from(stage.querySelectorAll(".adv-pin"));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const STEP_MS = 420;

  function keepCardOnscreen(p) {
    const card = p.querySelector(".adv-pin-card");
    p.style.setProperty("--sx", "0px");
    p.style.setProperty("--sy", "0px");
    requestAnimationFrame(() => {
      const stageRect = stage.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const margin = 10;
      let sx = 0, sy = 0;
      if (cardRect.left < stageRect.left + margin) sx = (stageRect.left + margin) - cardRect.left;
      else if (cardRect.right > stageRect.right - margin) sx = (stageRect.right - margin) - cardRect.right;
      if (cardRect.top < stageRect.top + margin) sy = (stageRect.top + margin) - cardRect.top;
      p.style.setProperty("--sx", sx + "px");
      p.style.setProperty("--sy", sy + "px");
    });
  }

  function visitPin(p) {
    p.classList.add("visited", "peek");
    keepCardOnscreen(p);
    setTimeout(() => p.classList.remove("peek"), 1400);
  }

  function playSequence() {
    stage.classList.remove("zoomed");
    pins.forEach(p => { p.classList.remove("visited", "peek", "active"); p.style.removeProperty("--sx"); p.style.removeProperty("--sy"); });

    if (reduced) {
      stage.classList.add("zoomed");
      pins.forEach(p => { p.classList.add("visited"); keepCardOnscreen(p); });
      return;
    }
    void stage.offsetWidth; // force reflow before re-animating
    setTimeout(() => stage.classList.add("zoomed"), 250);
    const zoomSettleDelay = 250 + 1300 + 250;
    pins.forEach((p, i) => setTimeout(() => visitPin(p), zoomSettleDelay + i * STEP_MS));
  }

  pins.forEach(p => {
    const dot = p.querySelector(".adv-pin-dot");
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!p.classList.contains("visited")) return;
      const wasActive = p.classList.contains("active");
      pins.forEach(other => other.classList.remove("active"));
      if (!wasActive) { p.classList.add("active"); keepCardOnscreen(p); }
    });
  });
  stage.addEventListener("click", () => pins.forEach(p => p.classList.remove("active")));

  stage.querySelectorAll("[data-jump-slug]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const target = document.getElementById("stop-" + btn.getAttribute("data-jump-slug"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        target.classList.add("flash-highlight");
        setTimeout(() => target.classList.remove("flash-highlight"), 1400);
      }
    });
  });

  // Use an observer so the sequence only plays once the map actually
  // scrolls into view, rather than firing immediately on page load while
  // it's still offscreen (it sits right under the hero, so this mostly
  // just means "right after the page paints," but it's a safe guard).
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { playSequence(); io.disconnect(); }
  }, { threshold: 0.3 });
  io.observe(stage);
}

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

// Zoom into the region a trip's stops fall in, then reveal each stop's dot
// glowing from dim teal to lit brass gold in visit order. Coordinates and
// map artwork are the exact same ones used on the homepage world map, so
// pins line up with real geography — works for any multi-stop Adventure,
// not just one specific trip.
function adventureRouteMapHTML(a, stopDests) {
  const pins = stopDests.map((d, i) => {
    const top = parseFloat(d.coords.top);
    const left = parseFloat(d.coords.left);
    return { slug: d.slug, name: d.name, top, left, n: String(i + 1).padStart(2, "0") };
  });

  const lefts = pins.map(p => p.left), tops = pins.map(p => p.top);
  const centerLeft = (Math.min(...lefts) + Math.max(...lefts)) / 2;
  const centerTop = (Math.min(...tops) + Math.max(...tops)) / 2;

  // Scale so the furthest stop from center still lands within a safe
  // margin of the frame edge (45% of the way out, leaving breathing room).
  const maxDeltaX = Math.max(...pins.map(p => Math.abs(p.left - centerLeft)), 0.5);
  const maxDeltaY = Math.max(...pins.map(p => Math.abs(p.top - centerTop)), 0.5);
  const scale = Math.min(45 / maxDeltaX, 45 / maxDeltaY, 14); // cap so a single-stop trip doesn't zoom absurdly far
  const tx = 50 - centerLeft;
  const ty = 50 - centerTop;

  return `
  <div class="adv-route-map" id="advRouteMap" style="--adv-scale:${scale.toFixed(2)}; --adv-tx:${tx.toFixed(2)}%; --adv-ty:${ty.toFixed(2)}%;">
    <span class="adv-route-region-label">${escapeHtml(a.title)}</span>
    <div class="adv-route-world">
      ${worldLandmassSVG()}
      ${pins.map((p, i) => `
        <div class="adv-pin" id="advPin-${i}" data-slug="${p.slug}" style="top:${p.top}%; left:${p.left}%;">
          <div class="adv-pin-dot"></div>
          <div class="adv-pin-card">
            <span class="adv-pin-n">${p.n}</span>
            <p class="adv-pin-name">${escapeHtml(p.name)}</p>
            <button data-jump-slug="${p.slug}">Jump to stop →</button>
          </div>
        </div>
      `).join("")}
    </div>
    <span class="adv-route-caption">${pins.length} stops — tap a pin</span>
  </div>`;
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
      ${adventureRouteMapHTML(a, stopDests)}
      <p class="section-desc" style="max-width:70ch; font-size:16px;">${escapeHtml(a.intro)}</p>

      <div class="timeline">
        <div class="timeline-line"></div>
        ${stopDests.map((d, i) => `
          <div class="timeline-item reveal" id="stop-${d.slug}">
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

  const countryGroupsHTML = countries.map((c, gi) => `
    <details class="dest-group" data-view="country" data-key="${escapeHtml(c)}" ${gi === 0 ? "open" : ""}>
      <summary class="dest-group-summary">
        <div class="divider-route"></div>
        <h2 class="country-heading">${escapeHtml(c)} <span class="country-count">${byCountry[c].length} ${byCountry[c].length === 1 ? "stop" : "stops"}</span></h2>
      </summary>
      <div class="card-grid mt-lg">
        ${byCountry[c].map((d, i) => destCardHTML(d, `reveal-delay-${(i % 3) + 1}`)).join("")}
      </div>
    </details>`).join("");

  const yearGroupsHTML = years.map((y, gi) => `
    <details class="dest-group" data-view="year" data-key="${escapeHtml(y)}" style="display:none;" ${gi === 0 ? "open" : ""}>
      <summary class="dest-group-summary">
        <div class="divider-route"></div>
        <h2 class="country-heading">${escapeHtml(y)} <span class="country-count">${byYear[y].length} ${byYear[y].length === 1 ? "stop" : "stops"}</span></h2>
      </summary>
      <div class="card-grid mt-lg">
        ${byYear[y].map((d, i) => destCardHTML(d, `reveal-delay-${(i % 3) + 1}`)).join("")}
      </div>
    </details>`).join("");

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
      if (match && key !== "all") g.open = true;
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
      ${d.heroCaption ? `<p class="page-hero-caption" style="margin-top:10px; font-size:13px; font-style:italic; opacity:0.75;">${escapeHtml(d.heroCaption)}</p>` : ""}
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
      <span class="eyebrow">What We Actually Ate</span>
      <h2 class="section-title" style="font-size:30px; margin-top:14px;">Real photos, real trip</h2>
      ${foodPhotosGalleryHTML(d)}
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

  ${(() => {
    const stories = getMisadventuresForDestination(d);
    if (!stories.length) return "";
    return `
  <section class="section section-tight">
    <div class="container">
      <span class="eyebrow">Misadventures From This Trip</span>
      <h2 class="section-title" style="font-size:30px; margin-top:14px;">What went sideways here</h2>
      <div class="card-grid mt-lg">
        ${stories.map((m, i) => `
          <div class="misadventure-card reveal reveal-delay-${(i % 3) + 1}">
            <span class="misadventure-icon">${m.icon}</span>
            <h3 class="misadventure-title">${escapeHtml(m.title)}</h3>
            <span class="misadventure-loc">${escapeHtml(m.location)}</span>
            <p class="misadventure-body">${escapeHtml(m.body)}</p>
            ${misadventurePhotosHTML(m)}
          </div>`).join("")}
      </div>
      <a href="#/misadventures" class="btn btn-ghost mt-lg" style="margin-top:32px;">See All Misadventures</a>
    </div>
  </section>`;
  })()}

  <section class="section section-tight section-alt">
    <div class="container">
      <span class="eyebrow">Photo Gallery</span>
      ${(() => {
        const entries = d.gallery.map((entry, i) => ({
          i,
          src: typeof entry === "string" ? entry : entry.src,
          group: typeof entry === "object" && entry.group ? entry.group : null
        }));
        const groups = [...new Set(entries.map(e => e.group).filter(Boolean))];
        const renderGrid = (list) => `<div class="masonry mt-lg" style="margin-top:16px;">
          ${list.map(e => `<div class="masonry-item reveal" data-lightbox-group="dest-${d.slug}" data-lightbox-index="${e.i}">${lazyImg(e.src, d.name)}</div>`).join("")}
        </div>`;
        if (groups.length > 1) {
          return groups.map(g => `
            <h3 class="gallery-subheading">${escapeHtml(g)}</h3>
            ${renderGrid(entries.filter(e => e.group === g))}
          `).join("");
        }
        return renderGrid(entries);
      })()}
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
   HERSTORIES — her solo trips, kept separate from the family's
   ============================================================ */

function herStoryCardHTML(t, delay) {
  return `
  <a href="#/herstories/${t.slug}" class="dest-card reveal ${delay || ""}">
    ${lazyImg(t.cardImg, t.name)}
    <div class="dest-card-body">
      <span class="dest-card-tag">${escapeHtml(t.tripType)}</span>
      <h3 class="dest-card-title">${escapeHtml(t.name)}</h3>
      <p class="dest-card-sub">${escapeHtml(t.country)}</p>
    </div>
  </a>`;
}

function renderHerStoriesList() {
  return `
  <section class="page-hero" style="background-image:url('${HER_STORIES[0].heroImg}')">
    <div class="page-hero-content">
      <div class="breadcrumb"><span>HerStories</span></div>
      <h1 class="page-hero-title">HerStories</h1>
      <p class="page-hero-caption" style="margin-top:10px; font-size:15px; max-width:640px;">The trips she took without the rest of us — solo and work travel, told (eventually) in her own words. Consider this section a work in progress.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="card-grid">
        ${HER_STORIES.map((t, i) => herStoryCardHTML(t, `reveal-delay-${i + 1}`)).join("")}
      </div>
    </div>
  </section>

  ${newsletterBlockHTML()}
  `;
}

function renderHerStoryDetail(t) {
  return `
  <section class="page-hero" style="background-image:url('${t.heroImg}')">
    <div class="page-hero-content">
      <div class="breadcrumb"><a href="#/herstories">HerStories</a><span>/</span><span>${escapeHtml(t.name)}</span></div>
      <h1 class="page-hero-title">${escapeHtml(t.name)}</h1>
      <div class="page-hero-meta">
        <span>◆ ${escapeHtml(t.country)}</span>
        <span>◆ ${escapeHtml(t.tripType)}</span>
      </div>
    </div>
  </section>

  <section class="section section-tight">
    <div class="container">
      <span class="eyebrow">The Short Version</span>
      <p class="section-desc" style="max-width:none; margin-top:18px; font-size:15px;">${escapeHtml(t.intro)}</p>
    </div>
  </section>

  ${t.restaurants.length ? `
  <section class="section section-tight section-alt">
    <div class="container">
      <span class="eyebrow">Restaurants</span>
      <h2 class="section-title" style="font-size:30px; margin-top:14px;">Where she ate</h2>
      <div class="card-grid cols-2 mt-lg">
        ${t.restaurants.map((r, i) => foodCardHTML({ ...r }, `reveal-delay-${i + 1}`)).join("")}
      </div>
    </div>
  </section>` : ""}

  <section class="section section-tight">
    <div class="container">
      <span class="eyebrow">What She Actually Ate</span>
      <h2 class="section-title" style="font-size:30px; margin-top:14px;">Real photos, real trip</h2>
      ${foodPhotosGalleryHTML(t)}
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="misadventure-card reveal" style="max-width:720px;">
        <span class="misadventure-icon">🗂️</span>
        <h3 class="misadventure-title">The Story: Still Searching the Rolodex</h3>
        <p class="misadventure-body">The actual play-by-play of this trip — how it went, what went sideways, what was worth it — hasn't been tracked down yet. That part's pending an interview with the traveler herself.</p>
      </div>
    </div>
  </section>

  <section class="section" style="padding-top:0;">
    <div class="container">
      <a href="#/herstories" class="btn btn-ghost">← All HerStories</a>
    </div>
  </section>

  ${newsletterBlockHTML()}
  `;
}

/* ============================================================
   EATS WORTH THE FLIGHT
   ============================================================ */

function renderEats() {
  const byDest = DESTINATIONS.filter(d => d.restaurants.length);
  return `
  <section class="section" style="padding-top: calc(var(--nav-h) + 60px);">
    <div class="container">
      <span class="eyebrow">Eats Worth the Flight</span>
      <h1 class="section-title" style="margin-top:16px;">Restaurants I'd fly back for</h1>
      <p class="section-desc" style="margin-top:16px;">Every meal here earned its place through repeat visits, unreasonable cravings back home, or a kid asking for it by name months later.</p>

      ${byDest.map((d, gi) => `
        <details class="dest-group" ${gi === 0 ? "open" : ""}>
          <summary class="dest-group-summary">
            <div class="divider-route"></div>
            <h2 class="country-heading">${escapeHtml(d.name)} <span class="country-count">${d.restaurants.length} ${d.restaurants.length === 1 ? "restaurant" : "restaurants"}</span></h2>
          </summary>
          <div class="card-grid mt-lg">
            ${d.restaurants.map((r, i) => foodCardHTML({ ...r, destSlug: d.slug, destName: d.name }, `reveal-delay-${(i % 3) + 1}`)).join("")}
          </div>
          <div class="eyebrow" style="margin-top:32px; display:block;">What We Actually Ate</div>
          ${foodPhotosGalleryHTML(d)}
        </details>`).join("")}
    </div>
  </section>
  ${newsletterBlockHTML()}
  `;
}

/* ============================================================
   MISADVENTURES
   ============================================================ */

function renderMisadventures() {
  const byLocation = {};
  MISADVENTURES.forEach(m => {
    if (!byLocation[m.location]) byLocation[m.location] = [];
    byLocation[m.location].push(m);
  });
  const locations = Object.keys(byLocation).sort((a, b) => a.localeCompare(b));

  return `
  <section class="section" style="padding-top: calc(var(--nav-h) + 60px);">
    <div class="container">
      <span class="eyebrow">Misadventures</span>
      <h1 class="section-title" style="margin-top:16px;">Everything that went sideways (and how it turned out fine)</h1>
      <p class="section-desc" style="margin-top:16px;">${MISADVENTURES.length} wrong boats, wrong turns, and questionable bets across ${locations.length} destinations — jump to one below, or scroll through all of them.</p>

      <div class="gallery-filters mt-lg" id="misadventureFilters">
        <button class="gallery-filter active" data-filter="all">All (${MISADVENTURES.length})</button>
        ${locations.map(loc => `<button class="gallery-filter" data-filter="${escapeHtml(loc)}">${escapeHtml(loc)} (${byLocation[loc].length})</button>`).join("")}
      </div>

      <div id="misadventureGroups">
        ${locations.map((loc, gi) => `
          <details class="dest-group" data-key="${escapeHtml(loc)}" ${gi === 0 ? "open" : ""}>
            <summary class="dest-group-summary">
              <div class="divider-route"></div>
              <h2 class="country-heading">${escapeHtml(loc)} <span class="country-count">${byLocation[loc].length} ${byLocation[loc].length === 1 ? "story" : "stories"}</span></h2>
            </summary>
            <div class="card-grid mt-lg">
              ${byLocation[loc].map((m, i) => `
                <div class="misadventure-card reveal reveal-delay-${(i % 3) + 1}">
                  <span class="misadventure-icon">${m.icon}</span>
                  <h3 class="misadventure-title">${escapeHtml(m.title)}</h3>
                  <span class="misadventure-loc">${escapeHtml(m.location)}</span>
                  <p class="misadventure-body">${escapeHtml(m.body)}</p>
                  ${misadventurePhotosHTML(m)}
                </div>`).join("")}
            </div>
          </details>
        `).join("")}
      </div>
    </div>
  </section>
  ${newsletterBlockHTML()}
  `;
}

function bindMisadventureFilters() {
  const filterBar = document.getElementById("misadventureFilters");
  if (!filterBar) return;
  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".gallery-filter");
    if (!btn) return;
    filterBar.querySelectorAll(".gallery-filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const key = btn.getAttribute("data-filter");
    document.querySelectorAll("#misadventureGroups .dest-group").forEach(g => {
      const match = key === "all" || g.getAttribute("data-key") === key;
      g.style.display = match ? "" : "none";
      if (match && key !== "all") g.open = true;
    });
  });
}

// Loose match: does this misadventure's location string belong to this destination?
function getMisadventuresForDestination(dest) {
  const name = dest.name.toLowerCase();
  return MISADVENTURES.filter(m => {
    const loc = m.location.toLowerCase();
    return loc.includes(name) || name.includes(loc.split(",")[0].trim());
  });
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
          When I'm not enjoying good food or working on my next start-up, you can find me traveling to the next adventure. Two adults, two kids, and two decades of frequent flyer miles — when my oldest was two, we handed her a passport and a frequent flyer card, and I promised if I couldn't give her the world, I'd at least show her as much of it as I could. That promise turned into cities across six continents, a running list of restaurants worth flying for, and more misadventures than adventures, if we're being honest.
        </p>
        <p class="section-desc" style="max-width:none; margin-top:18px; font-size:15.5px;">
          We've ventured alone, we've ventured together, and we've raised two daughters who've conquered more cities than most adults ever will. No sponsored perfection here — just honest reviews, real mishaps, and the lessons that only show up after you've already made the mistake once. This isn't a highlight reel — it's the real trip, wrong turns included.
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
