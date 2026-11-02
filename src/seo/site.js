/**
 * SEO for every page, in one place: titles, descriptions, canonical URLs and
 * structured data (JSON-LD). Used by the pages in the browser (usePageSeo,
 * Blog, BlogPost) and by the build's prerender (src/entry-server.jsx), so the
 * HTML search engines download and the page people see always agree.
 *
 * Plain JS with no browser APIs: it runs in Node during the build.
 */
import { ANDROID_PLAY_STORE_URL } from '../constants';
import { SITE_URL, sizedImage, topicMeta } from '../lib/blog';
import { FAQ_GROUPS } from './faq';

export { SITE_URL };

const LOGO = `${SITE_URL}/logo.png`;

/** Title + description per page. Titles lead with what people search for. */
export const PAGES = {
  '/': {
    title: "Nura: Period Tracker, Ovulation Calendar & Women's Health App",
    description:
      'Track your period, ovulation and symptoms, ask an AI health assistant in your language, and talk to real gynaecologists. Free, private, no ads.',
  },
  '/features': {
    title: 'Features: Period Tracker, Symptom Checker & AI Health Assistant | Nura',
    description:
      'Period and ovulation predictions, a PCOS and endometriosis symptom checker, an AI health assistant, gynaecologist consultations, report chat and Partner Sync in one private app.',
  },
  '/diagnostics': {
    title: "Women's Health Tests & Home Sample Collection | Nura Diagnostics",
    description:
      'Clinically designed diagnostic pathways for women’s health concerns, home sample collection, easy-to-read lab reports and gynaecologist consultations in one connected health record.',
  },
  '/pricing': {
    title: 'Pricing: Free Period Tracking & Nura Premium | Nura',
    description:
      'Period tracking, predictions and safety guidance are free. Nura Premium is paid ahead for 30 days or a year, with no auto-renewal.',
  },
  '/download': {
    title: 'Download Nura: Free Period Tracker App for Android | Nura',
    description: 'Get Nura free on Google Play for Android 10 and above: period and ovulation tracking, AI health answers and doctor consultations. iOS is coming soon.',
  },
  '/privacy': {
    title: 'Privacy: Your Health Data Stays Yours | Nura',
    description: 'How Nura protects your health data: App Lock, encryption, consent controls, and a promise never to sell your data.',
  },
  '/about': {
    title: "About Nura: Women's Health Guidance That Listens | Nura",
    description: "The mission behind Nura, a women's health app built on privacy and real clinical care.",
  },
  '/team': {
    title: 'Our Team: The People Behind Nura | Nura',
    description: "Meet the founders and team behind Nura, the period tracker and women's health app.",
  },
  '/careers': {
    title: 'Careers at Nura | Nura',
    description: "Help build Nura, the women's health platform. Get in touch about open roles.",
  },
  '/contact': {
    title: 'Contact Nura | Nura',
    description: 'Questions, bug reports, partnerships, or press: get in touch with the Nura team.',
  },
  '/terms': {
    title: 'Terms of Service | Nura',
    description: 'The terms that govern your use of the Nura app and website.',
  },
  '/faq': {
    title: 'FAQ: Period Tracking, Privacy, AI & Pricing Questions | Nura',
    description: 'Answers to the most common questions about Nura: pricing, devices, languages, prediction accuracy, AI and privacy.',
  },
  '/security': {
    title: 'Security & Safety | Nura',
    description:
      'How Nura protects your health data: encryption, App Lock, private documents, sign-in protection, AI controls and what our own team can and cannot see.',
  },
  '/data-protection': {
    title: 'Data Protection | Nura',
    description: 'How Nura stores, protects, and handles your health data.',
  },
  '/app': { title: 'Open in Nura', description: 'Opening this in the Nura app.', noindex: true },
  '/account/delete': {
    title: 'Delete your account | Nura',
    description: 'Permanently delete your Nura account and all associated data.',
    noindex: true,
  },
};

export const NOT_FOUND = { title: 'Page not found | Nura', description: 'This page doesn’t exist.', noindex: true };

/** Absolute canonical URL for a path: the home page keeps its slash. */
export const canonicalFor = (path) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);

const organization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'The Nura Care',
  alternateName: 'Nura',
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: LOGO },
  email: 'hello@thenura.care',
  founder: [
    { '@type': 'Person', name: 'Utkarsh Payal', jobTitle: 'Founder' },
    { '@type': 'Person', name: 'Kunjal', jobTitle: 'Co-founder' },
  ],
  sameAs: [ANDROID_PLAY_STORE_URL],
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Nura',
  url: `${SITE_URL}/`,
  publisher: { '@id': `${SITE_URL}/#organization` },
  // Lets Google show a search box for the journal under the site's result.
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

const app = {
  '@type': 'MobileApplication',
  name: 'Nura: Period Tracker & Women’s Health',
  operatingSystem: 'Android 10+',
  applicationCategory: 'HealthApplication',
  downloadUrl: ANDROID_PLAY_STORE_URL,
  installUrl: ANDROID_PLAY_STORE_URL,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@id': `${SITE_URL}/#organization` },
};

const breadcrumb = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
});

/** JSON-LD for a static page, or undefined. */
export function pageJsonLd(path) {
  const meta = PAGES[path];
  if (!meta || meta.noindex) return undefined;
  const graph = [];
  if (path === '/') graph.push(organization, website, app);
  else if (path === '/team' || path === '/about') graph.push(organization);
  else if (path === '/download') graph.push(app);
  if (path === '/faq') {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: FAQ_GROUPS.flatMap((g) => g.items).map((it) => ({
        '@type': 'Question',
        name: it.q,
        acceptedAnswer: { '@type': 'Answer', text: it.a },
      })),
    });
  }
  if (path !== '/') graph.push(breadcrumb([['Home', `${SITE_URL}/`], [meta.title.split(' | ')[0].split(':')[0], canonicalFor(path)]]));
  return { '@context': 'https://schema.org', '@graph': graph };
}

/** Everything the head needs for a static page. */
export function pageSeo(path, overrides = {}) {
  const meta = { ...(PAGES[path] || NOT_FOUND), ...overrides };
  return {
    title: meta.title,
    description: meta.description,
    url: PAGES[path] ? canonicalFor(path) : undefined,
    noindex: Boolean(meta.noindex),
    jsonLd: pageJsonLd(path),
  };
}

/** The journal home or a topic page. */
export function blogListSeo({ topic, heading, filtered }) {
  const meta = topic ? topicMeta(topic) : null;
  const title = filtered && heading ? `${heading} | Nura Journal` : 'Nura Journal: Periods, PCOS, Hormones & Women’s Health';
  const description =
    meta?.description ||
    'Practical, doctor-informed articles on periods, period pain, PCOS, ovulation, fertility, nutrition and everyday wellbeing from the team at Nura.';
  const url = topic ? `${SITE_URL}/blog/topic/${encodeURIComponent(topic)}` : `${SITE_URL}/blog`;
  return {
    title,
    description,
    url,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Blog',
          name: 'Nura Journal',
          url: `${SITE_URL}/blog`,
          publisher: { '@id': `${SITE_URL}/#organization`, '@type': 'Organization', name: 'The Nura Care', logo: LOGO },
        },
        breadcrumb(
          topic
            ? [['Nura Journal', `${SITE_URL}/blog`], [meta.label, url]]
            : [['Home', `${SITE_URL}/`], ['Nura Journal', `${SITE_URL}/blog`]]
        ),
      ],
    },
  };
}

/** One article. `blog` is the API's public blog object. */
export function blogPostSeo(blog, slug) {
  const url = blog?.canonicalUrl || `${SITE_URL}/blog/${encodeURIComponent(slug)}`;
  if (!blog) return { title: 'Nura Journal', description: undefined, url: undefined };
  const description = blog.seoDescription || blog.excerpt;
  const image = blog.coverImageUrl ? sizedImage(blog.coverImageUrl, 1200) : undefined;
  const topic = topicMeta(blog.category);
  const article = {
    '@type': blog.medicallyReviewed ? ['Article', 'MedicalWebPage'] : 'Article',
    headline: blog.title,
    description,
    image: image ? [image] : undefined,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt || blog.publishedAt,
    author: { '@type': 'Person', name: blog.author },
    publisher: { '@type': 'Organization', name: 'The Nura Care', logo: { '@type': 'ImageObject', url: LOGO } },
    mainEntityOfPage: url,
    articleSection: topic.label,
    keywords: blog.tags?.join(', '),
    inLanguage: 'en',
  };
  if (blog.medicallyReviewed && blog.reviewedBy) {
    article.reviewedBy = { '@type': 'Person', name: blog.reviewedBy };
    if (blog.reviewedAt) article.lastReviewed = blog.reviewedAt;
  }
  return {
    title: `${blog.seoTitle || blog.title} | Nura Journal`,
    ogTitle: blog.seoTitle || blog.title,
    description,
    url,
    image,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        article,
        breadcrumb([
          ['Nura Journal', `${SITE_URL}/blog`],
          [topic.label, `${SITE_URL}/blog/topic/${encodeURIComponent(blog.category)}`],
          [blog.title, url],
        ]),
      ],
    },
  };
}

const escapeHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** JSON safe inside a <script> tag. */
export const scriptJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

/**
 * The <head> tags for a page, as HTML (build time). The JSON-LD carries
 * data-prerender so main.jsx can drop it once the page sets its own.
 */
export function headTags({ title, ogTitle, description, url, image, type = 'website', jsonLd, noindex }) {
  const tags = [`<title>${escapeHtml(title)}</title>`];
  if (description) tags.push(`<meta name="description" content="${escapeHtml(description)}" />`);
  if (noindex) tags.push('<meta name="robots" content="noindex" />');
  if (url) tags.push(`<link rel="canonical" href="${escapeHtml(url)}" />`);
  const og = {
    'og:type': type,
    'og:site_name': 'Nura',
    'og:title': ogTitle || title,
    'og:description': description,
    'og:url': url,
    'og:image': image || LOGO,
    'og:locale': 'en_IN',
  };
  for (const [k, v] of Object.entries(og)) if (v) tags.push(`<meta property="${k}" content="${escapeHtml(v)}" />`);
  tags.push(`<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`);
  tags.push(`<meta name="twitter:title" content="${escapeHtml(ogTitle || title)}" />`);
  if (description) tags.push(`<meta name="twitter:description" content="${escapeHtml(description)}" />`);
  tags.push(`<meta name="twitter:image" content="${escapeHtml(image || LOGO)}" />`);
  if (jsonLd) tags.push(`<script type="application/ld+json" data-prerender>${scriptJson(jsonLd)}</script>`);
  return tags.join('\n    ');
}
