import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// BrowserRouter keeps the old scroll position across navigations, so a link
// in the footer would open the next page already scrolled to its bottom.
// Jump to the top whenever the path changes (not on same-page #hash links).
// 'instant' overrides html's scroll-behavior: smooth for this jump.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
