// Display metadata for blog topics. A topic is the post's `category` in the
// CMS; anything not listed here still works, it just gets a title-cased
// label and the neutral style.
const TOPICS = {
  health: {
    label: 'Health & cycle',
    description: 'Periods, hormones, PCOS and the conditions worth knowing about.',
    color: 'var(--brand-dark)',
    tint: 'var(--brand-tint)',
  },
  lifestyle: {
    label: 'Lifestyle',
    description: 'Food, movement, sleep and energy, in sync with your cycle.',
    color: 'var(--teal)',
    tint: 'var(--teal-tint)',
  },
  general: {
    label: 'Essentials',
    description: 'Start here: the basics of your body, your cycle and your care.',
    color: 'var(--accent)',
    tint: 'var(--accent-tint)',
  },
  beauty: {
    label: 'Skin & beauty',
    description: 'How your hormones show up in your skin, hair and self-care.',
    color: 'var(--amber)',
    tint: 'var(--amber-tint)',
  },
};

const titleCase = (value = '') =>
  value
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

export function topicMeta(id) {
  const known = TOPICS[id];
  if (known) return { id, ...known };
  return {
    id,
    label: titleCase(id) || 'General',
    description: '',
    color: 'var(--ink-3)',
    tint: 'var(--line-2)',
  };
}

export const tagLabel = (tag) => titleCase(tag);

export function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// The API computes this from the article's word count; guard against a
// missing or fractional value from an older backend anyway.
export const readTime = (minutes) => `${Math.max(1, Math.round(Number(minutes) || 0))} min read`;

// Same rules for the heading ids and the table of contents, so the
// "On this page" links always land on the right heading.
export const headingId = (text) =>
  String(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');

const normalise = (text) => String(text).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

/** CMS bodies often open with `# <the post title>`, which would repeat the
 * page's own heading (and give the page a second h1). Drop it. */
export function stripLeadingTitle(markdown = '', title = '') {
  const match = /^\s*#\s+(.+?)\s*#*\s*(\n|$)/.exec(markdown);
  if (match && normalise(match[1]) === normalise(title)) return markdown.slice(match[0].length).replace(/^\s+/, '');
  return markdown;
}

/** Pulls the headings out of a Markdown body for the table of contents.
 * `#` counts as a section heading too, since the article renders it as h2. */
export function extractHeadings(markdown = '') {
  const headings = [];
  let inFence = false;
  markdown.split('\n').forEach((line) => {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (inFence) return;
    const match = /^(#{1,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (match) {
      const text = match[2].replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '');
      headings.push({ level: Math.max(2, match[1].length), text, id: headingId(text) });
    }
  });
  return headings;
}

// Unsplash (where most CMS covers come from) serves any width on request, so
// ask for what the layout needs instead of the CMS's fixed 600px thumbnail,
// which looks soft on a full-width hero or a retina screen.
const RESIZABLE_HOSTS = ['images.unsplash.com'];

export function sizedImage(url, width) {
  if (!url) return url;
  try {
    const u = new URL(url);
    if (!RESIZABLE_HOSTS.includes(u.hostname)) return url;
    u.searchParams.set('w', String(width));
    u.searchParams.set('auto', 'format');
    u.searchParams.set('fit', 'crop');
    if (!u.searchParams.has('q')) u.searchParams.set('q', '75');
    return u.toString();
  } catch {
    return url;
  }
}

export function imageSrcSet(url, widths = [480, 800, 1200, 1600]) {
  if (!url || sizedImage(url, 1) === url) return undefined;
  return widths.map((w) => `${sizedImage(url, w)} ${w}w`).join(', ');
}

export const SITE_URL = 'https://thenura.care';

const NEW_FOR_DAYS = 14;
export function isNew(publishedAt) {
  const t = new Date(publishedAt).getTime();
  return Number.isFinite(t) && Date.now() - t < NEW_FOR_DAYS * 24 * 60 * 60 * 1000 && Date.now() >= t;
}

export const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
