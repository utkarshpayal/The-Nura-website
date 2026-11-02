import useDocumentMeta from './useDocumentMeta';
import useSeo from './useSeo';
import { pageSeo } from '../seo/site';

/**
 * Title, description, canonical, social tags and structured data for a static
 * page, from src/seo/site.js (the same values the build writes into the
 * page's HTML). `overrides` replaces the title or description, e.g. Pricing's
 * live prices.
 */
export default function usePageSeo(path, overrides) {
  const seo = pageSeo(path, overrides);
  useDocumentMeta(seo.title, seo.description);
  useSeo({ title: seo.title, description: seo.description, url: seo.url, jsonLd: seo.jsonLd });
}
