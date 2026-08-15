import { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Loader from '../components/Loader';
import useReveal from '../hooks/useReveal';
import { submitContactMessage } from '../lib/api';

const MESSAGE_MIN_LENGTH = 20;

const topics = [
  'General question',
  'Privacy & data',
  'Bug report',
  'Partnership / press',
  'Billing (Professional)',
];

const channels = [
  { title: 'General support', body: 'Questions about the app, your account, or a bug you found.', email: 'hello@thenura.care' },
  { title: 'Press & media', body: 'Interview requests, press kits, or media inquiries.', email: 'hello@thenura.care' },
  { title: 'Careers', body: 'Applications, referrals, or questions about open roles.', email: 'careers@thenura.care' },
  { title: 'Clinicians & partners', body: 'Gynac Onboarding, Creator Profile, or partnership inquiries.', email: 'hello@thenura.care' },
];

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid var(--line)',
  font: "500 14px 'Inter',sans-serif",
  color: 'var(--ink)',
  fontFamily: 'inherit',
};

export default function Contact() {
  const [refForm, inForm] = useReveal();
  const [refChannels, inChannels] = useReveal();
  const [form, setForm] = useState({ name: '', email: '', topic: topics[0], message: '' });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const messageValid = form.message.trim().length >= MESSAGE_MIN_LENGTH;
  const canSubmit = form.name.trim() && form.email.trim() && messageValid && !submitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <div className="page">
      <Nav />

      <PageHero
        eyebrow="Contact"
        title="We'd like to hear from you"
        subtitle="Whether it's a bug report, a partnership idea, or just feedback, reach out below or email us directly."
      />

      <div ref={refForm} className={`reveal ${inForm ? 'in' : ''} container`} style={{ maxWidth: 640, padding: '48px 32px' }}>
        <div className="card" style={{ padding: 32 }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ font: "700 16px 'Manrope',sans-serif", color: 'var(--ink)', marginBottom: 8 }}>Message sent</div>
              <p style={{ font: "500 14px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', margin: 0 }}>
                Thanks, {form.name.split(' ')[0]}. We typically reply within 1–2 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <label htmlFor="contact-name" style={{ font: "700 12.5px 'Inter',sans-serif", color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>Name</label>
                  <input id="contact-name" required value={form.name} onChange={update('name')} placeholder="Jane Doe" style={inputStyle} />
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <label htmlFor="contact-email" style={{ font: "700 12.5px 'Inter',sans-serif", color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>Email</label>
                  <input id="contact-email" required type="email" value={form.email} onChange={update('email')} placeholder="you@email.com" style={inputStyle} />
                </div>
              </div>
              <div>
                <label htmlFor="contact-topic" style={{ font: "700 12.5px 'Inter',sans-serif", color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>What's this about?</label>
                <select id="contact-topic" value={form.topic} onChange={update('topic')} style={{ ...inputStyle, appearance: 'auto' }}>
                  {topics.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="contact-message" style={{ font: "700 12.5px 'Inter',sans-serif", color: 'var(--ink-2)', display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
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
                  placeholder="How can we help?"
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
              {error && (
                <p style={{ color: 'var(--accent)', font: "600 13px 'Inter',sans-serif", margin: 0 }}>{error}</p>
              )}
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }} disabled={!canSubmit}>
                {submitting ? <Loader size={15} /> : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </div>

      <div ref={refChannels} className={`reveal ${inChannels ? 'in' : ''}`} style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '72px 32px' }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <h2 style={{ font: "800 24px 'Manrope',sans-serif", color: 'var(--ink)', textAlign: 'center', margin: '0 0 32px', letterSpacing: '-0.01em' }}>
            Or reach the right team directly
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
            {channels.map((c) => (
              <div key={c.title} className="card" style={{ padding: 22 }}>
                <h3 style={{ font: "700 15px 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 6px' }}>{c.title}</h3>
                <p style={{ font: "500 13px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', margin: '0 0 12px' }}>{c.body}</p>
                <a href={`mailto:${c.email}`} style={{ font: "700 13px 'Inter',sans-serif" }}>{c.email}</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
