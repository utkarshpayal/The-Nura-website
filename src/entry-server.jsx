/* eslint-disable react/only-export-components -- build-time module, never hot-reloaded */
/**
 * Build-time renderer (scripts/prerender.mjs): turns one URL into the page's
 * HTML and <head> tags, with the blog data it needs fetched first. Built with
 * `vite build --ssr`; never shipped to browsers.
 */
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import { getBlog, getBlogTopics, getBlogs, takeBlogData } from './lib/api';
import { NOT_FOUND, PAGES, blogListSeo, blogPostSeo, headTags, pageSeo } from './seo/site';
import { topicMeta } from './lib/blog';

const PAGE_SIZE = 12; // src/pages/Blog.jsx's PAGE_SIZE

export { PAGES };

/** Every published article's slug and every topic id (all pages of the list). */
export async function listBlogRoutes() {
  const slugs = [];
  for (let page = 1; page < 100; page += 1) {
    const data = await getBlogs({ page, limit: 24 });
    slugs.push(...data.blogs.map((b) => b.slug));
    if (!data.pagination?.hasNextPage) break;
  }
  const { topics = [] } = await getBlogTopics();
  takeBlogData();
  return { slugs, topics: topics.map((t) => t.id) };
}

/** Fetches what the page's first render reads (see the peek* calls). */
async function preload(url) {
  if (url === '/blog') {
    const { topics = [] } = await getBlogTopics();
    await Promise.all([
      getBlogs({ limit: 7 }),
      getBlogs({ sort: 'popular', limit: 4 }),
      ...topics.map((t) => getBlogs({ topic: t.id, limit: 3 })),
    ]);
    return {};
  }
  const topic = url.match(/^\/blog\/topic\/([^/]+)$/)?.[1];
  if (topic) {
    await Promise.all([
      getBlogTopics(),
      getBlogs({ topic: decodeURIComponent(topic), sort: 'latest', page: 1, limit: PAGE_SIZE }),
    ]);
    return {};
  }
  const slug = url.match(/^\/blog\/([^/]+)$/)?.[1];
  if (slug) {
    const data = await getBlog(decodeURIComponent(slug));
    return { blog: data.blog };
  }
  return {};
}

function seoFor(url, extra) {
  if (PAGES[url]) return pageSeo(url);
  if (url === '/blog') return blogListSeo({ filtered: false });
  const topic = url.match(/^\/blog\/topic\/([^/]+)$/)?.[1];
  if (topic) {
    const id = decodeURIComponent(topic);
    return blogListSeo({ topic: id, heading: topicMeta(id).label, filtered: true });
  }
  if (extra.blog) return blogPostSeo(extra.blog, extra.blog.slug);
  return { ...NOT_FOUND };
}

// Covers that don't load (a dead image host, a deleted file) would give the
// article a blank share preview, so check each once and fall back to the
// site's preview card.
const imageOk = new Map();
async function reachable(url) {
  if (!imageOk.has(url)) {
    imageOk.set(
      url,
      fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(8000) })
        // Some image hosts refuse HEAD; ask for the image itself then.
        .then((res) => (res.status === 405 || res.status === 403 ? fetch(url, { signal: AbortSignal.timeout(8000) }) : res))
        .then((res) => res.ok && (res.headers.get('content-type') || 'image/').startsWith('image/'))
        .catch(() => false)
    );
  }
  return imageOk.get(url);
}

async function toHtml(element) {
  const { prelude } = await prerenderToNodeStream(element);
  const chunks = [];
  for await (const chunk of prelude) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

/** { html, head, data } for one URL. Throws if its blog data can't load. */
export async function render(url) {
  const extra = await preload(url);
  const html = await toHtml(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );
  const data = takeBlogData();
  const seo = seoFor(url, extra);
  if (seo.image && !(await reachable(seo.image))) seo.image = undefined;
  return { html, head: headTags(seo), data };
}
