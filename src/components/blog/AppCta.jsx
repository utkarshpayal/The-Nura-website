import { Link } from 'react-router-dom';

/** "Get the app" prompt used across the blog: a wide banner between
 * sections, or a narrow card in the article sidebar. */
export default function AppCta({ variant = 'banner' }) {
  if (variant === 'card') {
    return (
      <div className="card" style={{ padding: 22, background: 'var(--brand-tint)', borderColor: 'var(--brand-tint-2)' }}>
        <div style={{ font: 'var(--t-title)', color: 'var(--ink)', marginBottom: 6 }}>Know your own pattern</div>
        <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-2)', margin: '0 0 16px' }}>
          Track your cycle and symptoms in Nura and get insights that are about you, not the average.
        </p>
        <Link to="/download" className="btn btn-primary btn-sm">Get the app, free</Link>
      </div>
    );
  }

  return (
    <div className="blog-cta">
      <div style={{ maxWidth: 560 }}>
        <h2 style={{ font: 'var(--t-h2)', color: '#fff', margin: '0 0 12px' }}>
          Reading is a start. Tracking is how you learn your body.
        </h2>
        <p style={{ font: 'var(--t-body)', color: 'rgba(255,255,255,0.78)', margin: 0 }}>
          Nura predicts your period and fertile window, spots irregular cycles early, and answers your questions in your language. Free, private, no ads.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link to="/download" className="btn btn-primary">Get Nura free</Link>
        <Link to="/features" className="btn btn-ghost-light">See features</Link>
      </div>
    </div>
  );
}
