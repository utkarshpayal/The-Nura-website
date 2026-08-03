import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/download', label: 'Download' },
];

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(251,250,252,0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--line)',
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
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={40} />
          <span style={{ font: "800 24px 'Manrope',sans-serif", color: 'var(--ink)' }}>Nura</span>
        </Link>

        <div className="nav-desktop-links" style={{ alignItems: 'center', gap: 30 }}>
          {LINKS.map((l) => {
            const active = pathname === l.to;
            return (
              <Link key={l.to} to={l.to} className={`nav-link ${active ? 'active' : ''}`}>
                {l.label}
              </Link>
            );
          })}
        </div>

        <Link to="/download" className="btn btn-primary nav-cta">
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
            borderRadius: 10,
            background: '#fff',
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
          const active = pathname === l.to;
          return (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{ font: "600 15px 'Inter',sans-serif", color: active ? 'var(--ink)' : 'var(--ink-3)' }}
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
