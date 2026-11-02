/**
 * Prerender (runs after `vite build` and `vite build --ssr`, see package.json):
 * writes a real HTML file for every page and every published article, so
 * search engines and link previews get the page's title, description,
 * canonical URL, structured data and full text without running JavaScript.
 * The browser app then takes over as usual.
 *
 *   dist/index.html, dist/features.html, dist/blog/<slug>.html, …
 *   dist/_shell.html  the plain app, for articles published after this build
 *                     (vercel.json sends unknown /blog/* URLs to it)
 *   dist/404.html     served by Vercel, with a real 404 status, for anything else
 *
 * Articles are read from the public blog API (VITE_API_URL, else production).
 * If it can't be reached the static pages are still written and the journal
 * falls back to the shell, so a backend outage never fails a deploy.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const server = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');

// index.html's site-wide defaults, replaced by each page's own tags.
const DEFAULT_HEAD = [
  /<title>[\s\S]*?<\/title>\s*/,
  /<meta name="description"[^>]*>\s*/,
  /<meta property="og:[^"]+"[^>]*>\s*/g,
  /<meta name="twitter:[^"]+"[^>]*>\s*/g,
];

// Without JavaScript the scroll-in animation never runs; show those sections.
const NOSCRIPT = '<noscript><style>.reveal{opacity:1!important;transform:none!important}</style></noscript>';

function page({ html, head, data }) {
  let out = template;
  for (const pattern of DEFAULT_HEAD) out = out.replace(pattern, '');
  out = out.replace('</head>', `    ${head}\n    ${NOSCRIPT}\n  </head>`);
  const dataScript =
    data && Object.keys(data).length
      ? `<script>window.__NURA_BLOG_DATA__=${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
      : '';
  return out.replace('<div id="root"></div>', `<div id="root">${html}</div>${dataScript}`);
}

const fileFor = (url) => (url === '/' ? 'index.html' : `${url.slice(1)}.html`);

async function write(url, file = fileFor(url)) {
  const result = await server.render(url);
  const target = path.join(dist, file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, page(result));
}

// The plain app first, before index.html is overwritten with the home page.
await fs.writeFile(path.join(dist, '_shell.html'), template);

// /app only bounces a shared link into the app (it reads window while
// rendering): it gets the plain app, kept out of search results.
const CLIENT_ONLY = new Set(['/app']);
const noindexShell = template.replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>');

const staticRoutes = Object.keys(server.PAGES);
for (const url of staticRoutes) {
  if (CLIENT_ONLY.has(url)) await fs.writeFile(path.join(dist, fileFor(url)), noindexShell);
  else await write(url);
}
await write('/this-page-does-not-exist', '404.html');

let blogRoutes = [];
try {
  const { slugs, topics } = await server.listBlogRoutes();
  blogRoutes = ['/blog', ...topics.map((t) => `/blog/topic/${encodeURIComponent(t)}`), ...slugs.map((s) => `/blog/${encodeURIComponent(s)}`)];
} catch (error) {
  console.warn(`prerender: blog API unreachable (${error.message}); the journal will load in the browser.`);
}

let failed = 0;
for (const url of blogRoutes) {
  try {
    await write(url);
  } catch (error) {
    failed += 1;
    console.warn(`prerender: skipped ${url} (${error.message})`);
  }
}

console.log(
  `prerender: ${staticRoutes.length} pages, ${blogRoutes.length - failed} journal pages, 404 and shell written` +
    (failed ? ` (${failed} skipped)` : '')
);
