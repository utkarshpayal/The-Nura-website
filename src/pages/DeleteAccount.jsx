import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Loader from '../components/Loader';
import { requestAccountDeletion, confirmAccountDeletion } from '../lib/api';
import useDocumentMeta from '../hooks/useDocumentMeta';

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid var(--line)',
  font: 'var(--t-body-sm)',
  color: 'var(--ink)',
  fontFamily: 'inherit',
};

// This page is intentionally not linked anywhere in the site nav/footer.
// It is still reachable by anyone who knows or guesses the URL, so the
// destructive action itself must not depend on the URL being secret:
// deletion only happens after the account owner confirms a one-time code
// sent to their own inbox. `noindex` keeps it out of search results.
export default function DeleteAccount() {
  useDocumentMeta('Delete your account | Nura', 'Permanently delete your Nura account and all associated data.');

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  const [step, setStep] = useState('email'); // 'email' | 'code' | 'done'
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const emailValid = /\S+@\S+\.\S+/.test(email.trim());

  const handleRequest = async (e) => {
    e.preventDefault();
    if (!emailValid || submitting) return;
    setSubmitting(true);
    setError('');
    try {
      await requestAccountDeletion(email.trim());
      setStep('code');
    } catch (err) {
      setError(err.message || 'Something went wrong, please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!code.trim() || confirmText.trim().toUpperCase() !== 'DELETE' || submitting) return;
    setSubmitting(true);
    setError('');
    try {
      await confirmAccountDeletion(email.trim(), code.trim());
      setStep('done');
    } catch (err) {
      setError(err.message || 'Something went wrong, please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <Nav />

      <PageHero
        eyebrow="Account deletion"
        title="Delete your account and data"
        subtitle="This permanently removes your account, profile, and all associated data from Nura. This can't be undone."
      />

      <div className="container" style={{ maxWidth: 520, padding: '48px 32px 96px' }}>
        <div className="card" style={{ padding: 32 }}>
          {step === 'email' && (
            <form onSubmit={handleRequest} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label htmlFor="delete-email" style={{ font: 'var(--t-label-sm)', color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>
                  Account email
                </label>
                <input
                  id="delete-email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  style={inputStyle}
                />
              </div>
              <p style={{ font: 'var(--t-caption)', color: 'var(--ink-3)', margin: 0 }}>
                We'll send a one-time confirmation code to this address. Nothing is deleted until you enter that code below.
              </p>
              {error && (
                <p style={{ color: 'var(--danger)', font: 'var(--t-label-sm)', margin: 0 }}>{error}</p>
              )}
              <button type="submit" className="btn btn-primary" disabled={!emailValid || submitting} style={{ alignSelf: 'flex-start' }}>
                {submitting ? <Loader size={15} /> : 'Send confirmation code'}
              </button>
            </form>
          )}

          {step === 'code' && (
            <form onSubmit={handleConfirm} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ font: 'var(--t-caption)', color: 'var(--ink-3)', margin: 0 }}>
                We sent a code to <strong style={{ color: 'var(--ink)' }}>{email.trim()}</strong>. Enter it below to permanently
                delete this account and all of its data.
              </p>
              <div>
                <label htmlFor="delete-code" style={{ font: 'var(--t-label-sm)', color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>
                  Confirmation code
                </label>
                <input
                  id="delete-code"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="123456"
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="delete-confirm" style={{ font: 'var(--t-label-sm)', color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>
                  Type DELETE to confirm
                </label>
                <input
                  id="delete-confirm"
                  required
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="DELETE"
                  style={inputStyle}
                />
              </div>
              {error && (
                <p style={{ color: 'var(--danger)', font: 'var(--t-label-sm)', margin: 0 }}>{error}</p>
              )}
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!code.trim() || confirmText.trim().toUpperCase() !== 'DELETE' || submitting}
                >
                  {submitting ? <Loader size={15} /> : 'Permanently delete my account'}
                </button>
                <button type="button" className="btn" onClick={() => setStep('email')} disabled={submitting}>
                  Back
                </button>
              </div>
            </form>
          )}

          {step === 'done' && (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ font: 'var(--t-title)', color: 'var(--ink)', marginBottom: 8 }}>
                Account deleted
              </div>
              <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: 0 }}>
                Your account and all associated data have been permanently removed.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
