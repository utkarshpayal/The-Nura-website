import { useEffect } from 'react';

/**
 * Sets document.title and the meta[name="description"] content for as long as
 * the calling page is mounted, restoring the previous values on unmount so
 * back/forward navigation between pages never leaves a stale title behind.
 * Lightweight, dependency-free stand-in for a full SEO/head library, single
 * page's-worth of usage for now, this is the pattern subsequent pages should
 * follow if they want their own title/description too.
 */
export default function useDocumentMeta(title, description) {
  useEffect(() => {
    const prevTitle = document.title;
    let meta = document.querySelector('meta[name="description"]');
    const prevDescription = meta?.getAttribute('content') ?? null;
    const createdMeta = !meta;

    if (title) document.title = title;
    if (description) {
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }

    return () => {
      document.title = prevTitle;
      if (meta) {
        if (createdMeta) {
          meta.remove();
        } else if (prevDescription !== null) {
          meta.setAttribute('content', prevDescription);
        }
      }
    };
  }, [title, description]);
}
