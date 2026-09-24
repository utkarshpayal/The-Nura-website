import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Features from './pages/Features';
import Diagnostics from './pages/Diagnostics';
import Pricing from './pages/Pricing';
import Download from './pages/Download';
import Privacy from './pages/Privacy';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Hipaa from './pages/Hipaa';
import Faq from './pages/Faq';
import DeleteAccount from './pages/DeleteAccount';
import NotFound from './pages/NotFound';
import AppRedirect from './pages/AppRedirect';
import PageLoader from './components/PageLoader';

// /app is the shared-link bounce page (see pages/AppRedirect.jsx). It skips
// the splash loader so it can hand off to the app immediately — a delayed
// launch loses the tap's navigation and Chrome may then block it.
const isAppRedirect = /^\/app\/?$/.test(window.location.pathname);

function App() {
  const [loading, setLoading] = useState(!isAppRedirect);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PageLoader />;

  return (
    <BrowserRouter>
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
        {/* Renamed from HIPAA to a jurisdiction-neutral notice; /hipaa kept as an alias so old links don't break. */}
        <Route path="/data-protection" element={<Hipaa />} />
        <Route path="/hipaa" element={<Hipaa />} />
        {/* Intentionally not linked from Nav/Footer — reachable only by direct URL. */}
        <Route path="/account/delete" element={<DeleteAccount />} />
        {/* Catch-all: anything unmatched renders a friendly 404 instead of a blank page. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
