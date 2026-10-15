import { useEffect } from 'react';

/**
 * Per-page social/SEO tags on top of useDocumentMeta's title + description:
 * Open Graph and Twitter tags, a canonical link, and optional JSON-LD.
 * Everything it adds or changes is put back on unmount, so the site-wide
 * defaults in index.html return when the reader leaves the page.
 *
 * Search engines that render JavaScript (Google) read these; link-preview
 * crawlers that don't (WhatsApp, LinkedIn) still see index.html's defaults.
 */
export default function useSeo({ title, description, url, image, type = 'website', jsonLd }) {
  const jsonLdText = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    const restores = [];

    const setTag = (selector, create, value) => {
      if (!value) return;
      let el = document.head.querySelector(selector);
      if (el) {
        const prev = el.getAttribute('content') ?? el.getAttribute('href');
        const attr = el.tagName === 'LINK' ? 'href' : 'content';
        el.setAttribute(attr, value);
        restores.push(() => el.setAttribute(attr, prev));
      } else {
        el = create();
        el.setAttribute(el.tagName === 'LINK' ? 'href' : 'content', value);
        document.head.appendChild(el);
        restores.push(() => el.remove());
      }
    };

    const meta = (key, attr = 'property') => () => {
      const el = document.createElement('meta');
      el.setAttribute(attr, key);
      return el;
    };

    setTag('meta[property="og:title"]', meta('og:title'), title);
    setTag('meta[property="og:description"]', meta('og:description'), description);
    setTag('meta[property="og:url"]', meta('og:url'), url);
    setTag('meta[property="og:image"]', meta('og:image'), image);
    setTag('meta[property="og:type"]', meta('og:type'), type);
    setTag('meta[name="twitter:card"]', meta('twitter:card', 'name'), image ? 'summary_large_image' : 'summary');
    setTag('meta[name="twitter:title"]', meta('twitter:title', 'name'), title);
    setTag('meta[name="twitter:description"]', meta('twitter:description', 'name'), description);
    setTag('meta[name="twitter:image"]', meta('twitter:image', 'name'), image);
    setTag(
      'link[rel="canonical"]',
      () => {
        const el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        return el;
      },
      url
    );

    if (jsonLdText) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = jsonLdText;
      document.head.appendChild(script);
      restores.push(() => script.remove());
    }

    return () => restores.reverse().forEach((fn) => fn());
  }, [title, description, url, image, type, jsonLdText]);
}
