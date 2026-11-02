const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:5000/api' : 'https://www.backend.thenura.care/api');

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  let body = null;
  try {
    body = await res.json();
  } catch {
    // no JSON body
  }

  if (!res.ok) {
    const message = body?.message || `Request failed with status ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    error.errors = body?.errors;
    throw error;
  }

  return body;
}

export const subscribeNewsletter = (email) =>
  request('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

export const submitContactMessage = ({ name, email, topic, message }) =>
  request('/contact', {
    method: 'POST',
    body: JSON.stringify({ name, email, topic, message }),
  });

// Account deletion is a two-step flow: requesting it only emails a one-time
// code to the address given, and nothing is deleted until that code is
// confirmed. This prevents someone from wiping out another person's account
// just by knowing (or guessing) this URL and typing in their email.
export const requestAccountDeletion = (email) =>
  request('/auth/account/delete/request', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

export const confirmAccountDeletion = (email, code) =>
  request('/auth/account/delete/confirm', {
    method: 'POST',
    body: JSON.stringify({ email, code }),
  });

// Public, read-only blog API (published posts only, no auth). The admin CMS
// writes these posts; the app reads the same ones behind login.
//
// Responses are kept in memory for a few minutes, so going back from an
// article to the list (or hovering a card, see prefetchBlog) doesn't refetch.
// A failed request is never cached.
const BLOG_CACHE_TTL = 5 * 60 * 1000;
const blogCache = new Map();

// The last answer for each blog request, readable synchronously so a page can
// draw it on its first render (peekBlogs / peekBlog / peekBlogTopics). The
// build fills it while prerendering a page and embeds it in that page
// (window.__NURA_BLOG_DATA__, read by seedBlogData in main.jsx), so the
// article is in the HTML search engines download and shows instantly; the
// page still refetches in the background.
const resolved = new Map();

function cachedGet(path) {
  const hit = blogCache.get(path);
  if (hit && Date.now() - hit.at < BLOG_CACHE_TTL) return hit.promise;
  const promise = request(path).then((res) => {
    resolved.set(path, res.data);
    return res.data;
  });
  blogCache.set(path, { at: Date.now(), promise });
  promise.catch(() => blogCache.delete(path));
  return promise;
}

/** Fills the synchronous copy from a prerendered page's embedded data. */
export function seedBlogData(data) {
  if (!data || typeof data !== 'object') return;
  for (const [path, value] of Object.entries(data)) resolved.set(path, value);
}

/** Build time: everything fetched for the page being rendered, then cleared. */
export function takeBlogData() {
  const data = Object.fromEntries(resolved);
  resolved.clear();
  blogCache.clear();
  return data;
}

const toQuery = (params) => {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') qs.set(key, value);
  });
  const s = qs.toString();
  return s ? `?${s}` : '';
};

const blogsPath = ({ topic, tag, search, sort, page, limit } = {}) =>
  `/blogs/public${toQuery({ topic, tag, search, sort, page, limit })}`;
const blogPath = (slug) => `/blogs/public/${encodeURIComponent(slug)}`;
const TOPICS_PATH = '/blogs/public/topics';

export const getBlogs = (params) => cachedGet(blogsPath(params));

export const getBlogTopics = () => cachedGet(TOPICS_PATH);

export const getBlog = (slug) => cachedGet(blogPath(slug));

// Synchronous reads of the last answer (see `resolved` above); undefined if none.
export const peekBlogs = (params) => resolved.get(blogsPath(params));
export const peekBlogTopics = () => resolved.get(TOPICS_PATH);
export const peekBlog = (slug) => resolved.get(blogPath(slug));

/** Warm the cache for an article the reader is about to open. */
export const prefetchBlog = (slug) => {
  getBlog(slug).catch(() => {});
};

// Live pricing (public): Premium monthly/yearly with the yearly saving, the
// founding offer only while an admin has it switched on, add-ons, GST and
// fair-use limits. The same summary the app's My Subscription screen draws.
export const getPricing = () => request('/subscriptions/pricing').then((res) => res.data);
