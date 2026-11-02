import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import useReveal from '../hooks/useReveal';
import usePageSeo from '../hooks/usePageSeo';
import { FAQ_GROUPS as groups } from '../seo/faq';


function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--line)' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '20px 0',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          font: 'var(--t-label)',
          color: 'var(--ink)',
        }}
      >
        {q}
        <span style={{ color: 'var(--brand)', flexShrink: 0, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .18s ease', font: 'var(--t-lead)', lineHeight: 1 }}>
          +
        </span>
      </button>
      {/* Always in the page (hidden while closed) so search engines read every answer. */}
      <p hidden={!open} style={{ font: 'var(--t-body-sm)', color: 'var(--ink-2)', margin: '0 0 20px', maxWidth: 640 }}>
        {a}
      </p>
    </div>
  );
}

export default function Faq() {
  usePageSeo('/faq');

  const [ref, visible] = useReveal();

  return (
    <div className="page">
      <Nav />

      <PageHero
        eyebrow="FAQ"
        title="Questions, answered"
        subtitle="The things people ask most about Nura. Still stuck? We’re one message away."
        max={720}
      />

      <div ref={ref} className={`reveal ${visible ? 'in' : ''} container`} style={{ maxWidth: 760, padding: '40px 32px 72px' }}>
        {groups.map((g) => (
          <div key={g.heading} style={{ marginBottom: 40 }}>
            <h2 style={{ font: 'var(--t-h4)', color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
              {g.heading}
            </h2>
            <div className="card" style={{ padding: '4px 28px' }}>
              {g.items.map((it) => (
                <FaqItem key={it.q} q={it.q} a={it.a} />
              ))}
            </div>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: '0 0 14px' }}>
            Didn’t find what you were looking for?
          </p>
          <Link to="/contact" className="btn btn-brand">Contact us</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
