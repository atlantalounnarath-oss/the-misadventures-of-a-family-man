// Serves per-page social preview tags (Open Graph / Twitter Card) to
// known social/search crawlers only — real visitors always get the
// normal SPA response untouched (context.next()), so this adds zero
// overhead or behavior change for humans. Crawlers only ever read the
// initial HTML, never run the SPA's JS, which is why they need this
// separate path: the real site is one static index.html for every
// route, so without this every shared link showed the same generic
// homepage preview regardless of which page was actually shared.

import seoMeta from "./seo-meta.json" with { type: "json" };

const BOT_PATTERN = /facebookexternalhit|Facebot|Twitterbot|Slackbot|LinkedInBot|WhatsApp|TelegramBot|Discordbot|Googlebot|bingbot|Applebot|Pinterest|redditbot|SkypeUriPreview|iMessageBot/i;

const SITE_URL = "https://misadventures-of-a-family-man.netlify.app";
const DEFAULT_IMAGE = `${SITE_URL}/assets/490299515_10228756310440816_4131957871461001657_n.jpg`;
const DEFAULT_TITLE = "The Misadventures of a Family Man — Travel Journal";
const DEFAULT_DESC = "56 trips, 16 countries, real restaurants, real misadventures — a family travel journal, not a listicle.";

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

export default async (request, context) => {
  const userAgent = request.headers.get("user-agent") || "";
  if (!BOT_PATTERN.test(userAgent)) {
    // Not a known crawler — serve the real site, no change in behavior.
    return context.next();
  }

  const url = new URL(request.url);
  const pagePath = url.pathname.length > 1 ? url.pathname.replace(/\/$/, "") : "/";
  const meta = seoMeta[pagePath] || { title: DEFAULT_TITLE, description: DEFAULT_DESC, image: DEFAULT_IMAGE };

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${escapeHtml(meta.title)}</title>
<meta name="description" content="${escapeHtml(meta.description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE_URL}${pagePath}">
<link rel="canonical" href="${SITE_URL}${pagePath}">
<meta property="og:site_name" content="The Misadventures of a Family Man">
<meta property="og:title" content="${escapeHtml(meta.title)}">
<meta property="og:description" content="${escapeHtml(meta.description)}">
<meta property="og:image" content="${escapeHtml(meta.image)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(meta.title)}">
<meta name="twitter:description" content="${escapeHtml(meta.description)}">
<meta name="twitter:image" content="${escapeHtml(meta.image)}">
</head>
<body></body>
</html>`;

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" }
  });
};
