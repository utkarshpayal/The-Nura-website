import { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Loader from '../components/Loader';
import useReveal from '../hooks/useReveal';
import { submitContactMessage } from '../lib/api';
import useDocumentMeta from '../hooks/useDocumentMeta';

const MESSAGE_MIN_LENGTH = 20;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const topics = [
  'General question',
  'Privacy & data',
  'Bug report',
  'Partnership / press',
  'Billing (Professional)',
];

const channels = [
  {
    title: 'General support',
    body: 'Questions about the app, your account, or a bug you found.',
    email: 'hello@thenura.care',
    bg: 'var(--brand-tint)',
    icon: <path d="M4 6h16v12H4z M4 6l8 7 8-7" stroke="var(--brand-dark)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: 'Press & media',
    body: 'Interview requests, press kits, or media inquiries.',
    email: 'hello@thenura.care',
    bg: 'var(--teal-tint)',
    icon: <path d="M4 4l14 8-14 8V4Z" stroke="var(--teal)" strokeWidth="1.7" strokeLinejoin="round" />,
  },
  {
    title: 'Careers',
    body: 'Applications, referrals, or questions about open roles.',
    email: 'hello@thenura.care',
    bg: 'var(--amber-tint)',
    icon: <path d="M8 3v3M16 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" stroke="var(--amber)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: 'Clinicians & partners',
    body: 'Gynac Onboarding, Creator Profile, or partnership inquiries.',
    email: 'hello@thenura.care',
    bg: 'var(--accent-tint)',
    icon: <path d="M12 21s-7-4.35-9.5-8.5C.7 8.8 2.6 5 6.3 5c1.9 0 3.3 1 3.7 2.3C10.4 6 11.8 5 13.7 5c3.7 0 5.6 3.8 3.8 7.5C15 16.65 12 21 12 21Z" stroke="var(--accent)" strokeWidth="1.7" strokeLinejoin="round" />,
  },
];

const fieldLabelStyle = { font: "700 12.5px 'Inter',sans-serif", color: 'var(--ink-2)', display: 'block', marginBottom: 7 };

export default function Contact() {
  useDocumentMeta('Contact | Nura', 'Questions, bug reports, partnerships, or press: get in touch with the Nura team.');

  const [refForm, inForm] = useReveal();
  const [refChannels, inChannels] = useReveal();
  const [form, setForm] = useState({ name: '', email: '', topic: topics[0], message: '' });
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const touch = (field) => () => setTouched((t) => ({ ...t, [field]: true }));

  const messageValid = form.message.trim().length >= MESSAGE_MIN_LENGTH;
  const emailValid = EMAIL_RE.test(form.email.trim());
  const nameValid = form.name.trim().length > 1;
  const canSubmit = nameValid && emailValid && messageValid && !submitting;

  const fieldStyle = (valid, field) => ({
    width: '100%',
    padding: '13px 15px',
    borderRadius: 11,
    background: 'var(--bg)',
    border: `1.5px solid ${touched[field] && !valid ? 'var(--accent)' : 'var(--line)'}`,
    font: "500 14px 'Inter',sans-serif",
    color: 'var(--ink)',
    fontFamily: 'inherit',
    transition: 'border-color .15s ease, box-shadow .15s ease',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!canSubmit) return;

    setSubmitting(true);
    setError('');
    try {
      await submitContactMessage(form);
      setSent(true);
    } catch (err) {
      setError(err.message || 'Something went wrong, please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({ name: '', email: '', topic: topics[0], message: '' });
    setTouched({});
    setSent(false);
  };

  return (
    <div className="page">
      <Nav />

      <PageHero
        eyebrow="Contact"
        title="We'd like to hear from you"
        subtitle="Whether it's a bug report, a partnership idea, or just feedback, reach out below or email us directly."
      />

      <div ref={refForm} className={`reveal ${inForm ? 'in' : ''} container`} style={{ maxWidth: 640, padding: '48px 32px' }}>
        <div className="card" style={{ padding: 36 }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'var(--teal-tint)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 18px',
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 12.5L9.5 18L20 6" stroke="var(--teal)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ font: "800 18px 'Manrope',sans-serif", color: 'var(--ink)', marginBottom: 8 }}>Message sent</div>
              <p style={{ font: "500 14px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', margin: '0 0 22px' }}>
                Thanks, {form.name.split(' ')[0]}. We typically reply within 1–2 business days.
              </p>
              <button type="button" onClick={resetForm} className="btn btn-secondary btn-sm">
                Send another message
              </button>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26 }}>
                <div className="icon-tile" style={{ background: 'var(--brand-tint)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 6h16v12H4z M4 6l8 7 8-7" stroke="var(--brand-dark)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div style={{ font: "700 15.5px 'Manrope',sans-serif", color: 'var(--ink)' }}>Send us a message</div>
                  <div style={{ font: "500 12.5px 'Inter',sans-serif", color: 'var(--ink-4)' }}>We read every one, personally.</div>
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }} noValidate>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 200px' }}>
                    <label htmlFor="contact-name" style={fieldLabelStyle}>Name</label>
                    <input
                      id="contact-name"
                      required
                      value={form.name}
                      onChange={update('name')}
                      onBlur={touch('name')}
                      placeholder="Jane Doe"
                      style={fieldStyle(nameValid, 'name')}
                    />
                  </div>
                  <div style={{ flex: '1 1 200px' }}>
                    <label htmlFor="contact-email" style={fieldLabelStyle}>Email</label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      onBlur={touch('email')}
                      placeholder="you@email.com"
                      style={fieldStyle(emailValid, 'email')}
                    />
                    {touched.email && !emailValid && (
                      <p style={{ font: "600 11.5px 'Inter',sans-serif", color: 'var(--accent)', margin: '5px 0 0' }}>Enter a valid email address.</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-topic" style={fieldLabelStyle}>What's this about?</label>
                  <div style={{ position: 'relative' }}>
                    <select
                      id="contact-topic"
                      value={form.topic}
                      onChange={update('topic')}
                      style={{ ...fieldStyle(true, 'topic'), appearance: 'none', paddingRight: 38, cursor: 'pointer' }}
                    >
                      {topics.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                    >
                      <path d="M6 9l6 6 6-6" stroke="var(--ink-4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" style={{ ...fieldLabelStyle, display: 'flex', justifyContent: 'space-between' }}>
                    <span>Message</span>
                    <span style={{ fontWeight: 600, color: messageValid ? 'var(--teal)' : 'var(--ink-4)' }}>
                      {form.message.trim().length}/{MESSAGE_MIN_LENGTH} min
                    </span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    onBlur={touch('message')}
                    placeholder="How can we help?"
                    style={{ ...fieldStyle(messageValid, 'message'), resize: 'vertical' }}
                  />
                </div>

                {error && (
                  <div style={{ display: 'flex', gap: 8, background: 'var(--accent-tint)', borderRadius: 10, padding: '10px 14px' }}>
                    <span style={{ font: "600 13px 'Inter',sans-serif", color: '#8A2E4C' }}>{error}</span>
                  </div>
                )}

                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', minWidth: 150 }} disabled={!canSubmit}>
                  {submitting ? <Loader size={15} /> : (
                    <>
                      Send message
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <div ref={refChannels} className={`reveal ${inChannels ? 'in' : ''}`} style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '72px 32px' }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <h2 style={{ font: "800 24px 'Manrope',sans-serif", color: 'var(--ink)', textAlign: 'center', margin: '0 0 32px', letterSpacing: '-0.01em' }}>
            Or reach the right team directly
          </h2>
          <div className="grid-clean-2">
            {channels.map((c) => (
              <div key={c.title} className="card card-hover" style={{ padding: 24, display: 'flex', gap: 16 }}>
                <div className="icon-tile" style={{ background: c.bg, flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">{c.icon}</svg>
                </div>
                <div>
                  <h3 style={{ font: "700 15px 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 6px' }}>{c.title}</h3>
                  <p style={{ font: "500 13px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', margin: '0 0 10px' }}>{c.body}</p>
                  <a href={`mailto:${c.email}`} style={{ font: "700 13px 'Inter',sans-serif" }}>{c.email}</a>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <div style={{ font: "700 13px 'Inter',sans-serif", color: 'var(--ink-4)', marginBottom: 6 }}>Legal / registered contact</div>
            <div style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--ink-2)' }}>
              UTKARSH &middot;{' '}
              <a href="mailto:utkarsh12march2004@gmail.com">utkarsh12march2004@gmail.com</a>
              {' '}&middot; <a href="tel:+918890866167">8890866167</a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
