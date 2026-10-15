import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

// A section stays highlighted on its sub-pages too (e.g. /blog/some-post).
const isActive = (pathname, to) => (to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`));

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/diagnostics', label: 'Diagnostics' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/blog', label: 'Blog' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/download', label: 'Download' },
];

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(252,250,251,0.86)',
        backdropFilter: 'saturate(160%) blur(12px)',
        WebkitBackdropFilter: 'saturate(160%) blur(12px)',
        borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
        boxShadow: scrolled ? '0 6px 20px rgba(30, 24, 35, 0.05)' : 'none',
        transition: 'box-shadow .25s ease, border-color .25s ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 32px',
        }}
      >
        <Link to="/" aria-label="Nura home" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={44} />
          <span style={{ font: "800 23px/1 var(--font-display)", letterSpacing: '-0.02em', color: 'var(--logo-pink)' }}>The Nura</span>
        </Link>

        <div className="nav-desktop-links" style={{ alignItems: 'center', gap: 30 }}>
          {LINKS.map((l) => {
            const active = isActive(pathname, l.to);
            return (
              <Link key={l.to} to={l.to} className={`nav-link ${active ? 'active' : ''}`}>
                {l.label}
              </Link>
            );
          })}
        </div>

        <Link to="/download" className="btn btn-primary btn-sm nav-cta">
          Get the app
        </Link>

        <button
          className="nav-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: 38,
            height: 38,
            border: '1px solid var(--line)',
            borderRadius: 999,
            background: 'var(--surface)',
            cursor: 'pointer',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path d="M6 6L18 18M18 6L6 18" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 6H20M4 12H20M4 18H20" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`nav-mobile-panel ${open ? 'open' : ''}`}
        style={{ flexDirection: 'column', padding: '4px 32px 20px', gap: 14, borderTop: '1px solid var(--line)' }}
      >
        {LINKS.map((l) => {
          const active = isActive(pathname, l.to);
          return (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{ font: 'var(--t-label)', color: active ? 'var(--brand)' : 'var(--ink-3)' }}
            >
              {l.label}
            </Link>
          );
        })}
        <Link to="/download" onClick={() => setOpen(false)} className="btn btn-primary" style={{ marginTop: 4 }}>
          Get the app
        </Link>
      </div>
    </div>
  );
}
