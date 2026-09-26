import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import useDocumentMeta from '../hooks/useDocumentMeta';

export default function NotFound() {
  useDocumentMeta('Page not found | Nura');

  return (
    <>
      <Nav />
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 1,
            minHeight: '68vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 24,
            padding: '80px 20px',
          }}
        >
          {/* A little confused face, not a generic "404" numeral — a small,
              on-brand joke: the world doesn't get women's health either.
              Gentle idle wobble (not a spin/bounce loop) reads as "puzzled,"
              not "broken"; the sparkle drifts on its own slower rhythm so
              the two motions don't sync up and look mechanical. */}
          <div style={{ position: 'relative', width: 190, height: 190, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* A slow scanning ring, not a spinner — reads as "actively
                reading you," the same idea as the app's own loader ring,
                not a loading state. */}
            <svg
              className="notfound-scan"
              width="190"
              height="190"
              viewBox="0 0 190 190"
              fill="none"
              aria-hidden="true"
              style={{ position: 'absolute', inset: 0 }}
            >
              <circle cx="95" cy="95" r="92" stroke="var(--line)" strokeWidth="1.5" />
              <circle
                cx="95"
                cy="95"
                r="92"
                stroke="var(--brand)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="70 508"
              />
            </svg>
            <div className="notfound-face" style={{ position: 'relative', width: 156, height: 156 }}>
              <div
                style={{
                  width: 156,
                  height: 156,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-tint) 0%, var(--brand-tint) 100%)',
                  border: '1.5px solid var(--brand-tint-2)',
                  boxShadow: '0 16px 40px rgba(194, 65, 111, 0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="76" height="76" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="8.5" cy="10.5" r="1.5" fill="var(--accent)" />
                  <circle cx="15.5" cy="10.5" r="1.5" fill="var(--accent)" />
                  <path d="M8 16c1.2-1 2.7-1.5 4-1.5s2.8.5 4 1.5" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M7 7.3c.6-.7 1.4-1 2.3-.9M17 7.3c-.6-.7-1.4-1-2.3-.9" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'var(--brand)',
                  color: '#fff',
                  font: 'var(--t-title)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ?
              </span>
            </div>
            <svg
              aria-hidden="true"
              className="notfound-sparkle"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              style={{ position: 'absolute', bottom: 2, left: -14 }}
            >
              <path
                d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"
                fill="var(--teal)"
              />
            </svg>
          </div>

          <div className="eyebrow">404 · Page not found</div>
          <h1 style={{ font: 'var(--t-h2)', color: 'var(--ink)', margin: 0, maxWidth: 560, letterSpacing: '-0.01em' }}>
            People say they can't understand women.
          </h1>
          <p style={{ font: 'var(--t-body)', color: 'var(--ink-3)', maxWidth: 440, margin: 0 }}>
            But Nura can. Let's get you back to it.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 6 }}>
            <Link to="/" className="btn btn-brand notfound-cta" style={{ padding: '14px 26px' }}>
              Back to home
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="notfound-cta-arrow">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link to="/download" className="btn btn-secondary" style={{ padding: '14px 26px' }}>
              Meet Nura AI
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
