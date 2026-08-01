import { useState } from 'react';
import useReveal from '../hooks/useReveal';
import Loader from './Loader';
import { subscribeNewsletter } from '../lib/api';

export default function Newsletter({ title, subtitle, padding = '96px 32px' }) {
  const [ref, visible] = useReveal();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || submitting) return;

    setSubmitting(true);
    setError('');
    try {
      await subscribeNewsletter(email.trim());
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      setError(err.message || 'Something went wrong — please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={ref} className={`reveal ${visible ? 'in' : ''}`} style={{ padding, background: 'var(--surface)', borderTop: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ font: "800 26px 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 10px' }}>
          {title}
        </h2>
        <p style={{ font: "500 15px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', margin: '0 0 26px' }}>
          {subtitle}
        </p>
        {subscribed ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              background: 'var(--teal-tint)',
              color: 'var(--teal)',
              borderRadius: 14,
              padding: '16px 22px',
              font: "700 14px 'Inter',sans-serif",
            }}
          >
            You're on the list — thanks for subscribing.
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: '1 1 260px',
                  minWidth: 200,
                  padding: '13px 16px',
                  borderRadius: 10,
                  border: '1px solid var(--line)',
                  font: "500 14px 'Inter',sans-serif",
                  color: 'var(--ink)',
                  outline: 'none',
                }}
              />
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? <Loader size={15} /> : 'Subscribe'}
              </button>
            </form>
            {error && (
              <p style={{ color: 'var(--accent)', font: "600 13px 'Inter',sans-serif", margin: '12px 0 0' }}>{error}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
