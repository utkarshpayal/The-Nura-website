import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AppRedirect from './pages/AppRedirect';
import PageLoader from './components/PageLoader';
import ScrollToTop from './components/ScrollToTop';

// Home and /app are loaded eagerly: Home is the most common landing page, and
// /app has to hand off to the app immediately (a delayed launch loses the
// tap's navigation and Chrome may then block it). Every other page is split
// into its own chunk and shows the PageLoader while it downloads.
const Features = lazy(() => import('./pages/Features'));
const Diagnostics = lazy(() => import('./pages/Diagnostics'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Download = lazy(() => import('./pages/Download'));
const Privacy = lazy(() => import('./pages/Privacy'));
const About = lazy(() => import('./pages/About'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const Terms = lazy(() => import('./pages/Terms'));
const Hipaa = lazy(() => import('./pages/Hipaa'));
const Security = lazy(() => import('./pages/Security'));
const Faq = lazy(() => import('./pages/Faq'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const DeleteAccount = lazy(() => import('./pages/DeleteAccount'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Shared-link landing page for the app — not linked from Nav/Footer. */}
          <Route path="/app" element={<AppRedirect />} />
          <Route path="/features" element={<Features />} />
          <Route path="/diagnostics" element={<Diagnostics />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/download" element={<Download />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/saved" element={<Blog view="saved" />} />
          <Route path="/blog/topic/:topic" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/security" element={<Security />} />
          {/* Renamed from HIPAA to a jurisdiction-neutral notice; /hipaa kept as an alias so old links don't break. */}
          <Route path="/data-protection" element={<Hipaa />} />
          <Route path="/hipaa" element={<Hipaa />} />
          {/* Intentionally not linked from Nav/Footer — reachable only by direct URL. */}
          <Route path="/account/delete" element={<DeleteAccount />} />
          {/* Catch-all: anything unmatched renders a friendly 404 instead of a blank page. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
