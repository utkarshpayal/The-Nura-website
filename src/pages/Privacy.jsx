import { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import useReveal from '../hooks/useReveal';
import { GooglePlayButton, AppStoreButton } from 'react-mobile-app-button';
import { ANDROID_PLAY_STORE_URL } from '../constants';
import useDocumentMeta from '../hooks/useDocumentMeta';

const faqData = [
  { question: 'Do you ever sell my health data?', answer: 'Never. Your cycle and symptom data is never sold or shared with advertisers, data brokers, or third parties, under any circumstance.' },
  { question: 'What happens if I lose my phone?', answer: 'Your data stays encrypted on-device and behind App Lock. Signing in on a new device restores your history from your encrypted, password-protected account.' },
  { question: 'Can my partner see everything I log?', answer: 'No. Partner Sync only shares what you explicitly enable, gentle context like cycle phase, never raw symptom logs unless you choose to share them.' },
  { question: 'How do I delete my account?', answer: 'Settings → Account → Delete Account permanently erases your data from our servers within 30 days, no follow-up required.' },
];

const pillars = [
  {
    bg: 'var(--teal-tint)',
    icon: <path d="M6 11V8a6 6 0 0 1 12 0v3M5 11h14v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9Z" stroke="var(--teal)" strokeWidth="1.7" strokeLinejoin="round" />,
    title: 'App Lock & encryption',
    body: 'PIN, Face ID, or Touch ID gate the app. Your logs are encrypted on your device, not just in transit.',
  },
  {
    bg: 'var(--brand-tint)',
    icon: <path d="M12 3L4 6.5V11C4 16 7.5 20 12 21.5C16.5 20 20 16 20 11V6.5L12 3Z" stroke="var(--brand-dark)" strokeWidth="1.7" strokeLinejoin="round" />,
    title: 'Never sold, never shared',
    body: 'Your health data is never sold to advertisers or data brokers, not now, not as a future business model.',
  },
  {
    bg: 'var(--accent-tint)',
    icon: <><path d="M12 4v16M4 12h16" stroke="var(--accent)" strokeWidth="1.7" strokeLinecap="round" /><circle cx="12" cy="12" r="9" stroke="var(--accent)" strokeWidth="1.7" /></>,
    title: 'You control the pairing',
    body: 'Partner Sync and AI chat are opt-in and permission-based. Leave a pairing anytime, no explanation needed.',
  },
  {
    bg: 'var(--teal-tint)',
    icon: <path d="M12 15V3M12 15l-4-4M12 15l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="var(--teal)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
    title: 'Export or delete, instantly',
    body: 'Request an export of your data from Settings anytime, or permanently delete your account and all associated data.',
  },
];

export default function Privacy() {
  useDocumentMeta('Privacy | Nura', 'How Nura protects your health data: App Lock, encryption, consent controls, and a promise never to sell your data.');

  const [open, setOpen] = useState({});
  const [refStats, inStats] = useReveal();
  const [refPillars, inPillars] = useReveal();
  const [refFaq, inFaq] = useReveal();

  const toggle = (i) => setOpen((s) => ({ ...s, [i]: !s[i] }));

  return (
    <div className="page">
      <Nav />

      <div className="container" style={{ maxWidth: 720, padding: '76px 32px 8px', textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 20, color: 'var(--teal)' }}>
          Private by design
        </div>
        <h1 style={{ font: 'var(--t-h1)', color: 'var(--ink)', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
          Your cycle data is yours. Full stop.
        </h1>
        <p style={{ font: 'var(--t-body)', color: 'var(--ink-3)', margin: 0 }}>
          No ads. No data brokers. No exceptions. Here's exactly how we protect it.
        </p>
      </div>

      {/* STATS */}
      <div ref={refStats} className={`reveal ${inStats ? 'in' : ''} container`} style={{ maxWidth: 960, padding: '44px 32px' }}>
        <div className="grid-clean-3">
          {[
            ['100%', 'Encrypted on-device'],
            ['0', 'Data sold to advertisers'],
            ['1-tap', 'Full data export or delete'],
          ].map(([stat, label]) => (
            <div key={label} className="card" style={{ padding: 24, textAlign: 'center' }}>
              <div style={{ font: 'var(--t-h2)', color: 'var(--brand)' }}>{stat}</div>
              <div style={{ font: 'var(--t-label-sm)', color: 'var(--ink-3)', marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PILLARS */}
      <div ref={refPillars} className={`reveal ${inPillars ? 'in' : ''} container`} style={{ padding: '20px 32px 88px' }}>
        <div className="pillars-grid" style={{ display: 'grid', gap: 18 }}>
          {pillars.map((p) => (
            <div key={p.title} className="card card-hover" style={{ padding: 28 }}>
              <div className="icon-tile" style={{ background: p.bg, marginBottom: 16 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">{p.icon}</svg>
              </div>
              <h3 style={{ font: 'var(--t-title)', color: 'var(--ink)', margin: '0 0 8px' }}>{p.title}</h3>
              <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: 0 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div ref={refFaq} className={`reveal ${inFaq ? 'in' : ''}`} style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '80px 32px' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <h2 style={{ font: 'var(--t-h2)', color: 'var(--ink)', textAlign: 'center', margin: '0 0 32px', letterSpacing: '-0.01em' }}>Privacy questions</h2>
          <div className="card" style={{ overflow: 'hidden' }}>
            {faqData.map((q, i) => {
              const isOpen = !!open[i];
              return (
                <div key={q.question} className="faq-row" style={{ padding: '18px 22px' }}>
                  <button type="button" onClick={() => toggle(i)} aria-expanded={isOpen} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: 0, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ font: 'var(--t-label)', color: 'var(--ink)' }}>{q.question}</span>
                    <span aria-hidden="true" style={{ font: 'var(--t-title)', color: 'var(--brand)', flexShrink: 0, transition: 'transform .2s', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                  </button>
                  {isOpen && (
                    <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: '12px 0 0' }}>{q.answer}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'var(--surface-dark)', padding: '76px 32px', textAlign: 'center' }}>
        <h2 style={{ font: 'var(--t-h2)', color: '#fff', margin: '0 0 28px', letterSpacing: '-0.01em' }}>Track with confidence</h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 14 }}>
          <GooglePlayButton
            url={ANDROID_PLAY_STORE_URL}
            theme="light"
            title="Download for"
            width={210}
            height={58}
            className="store-badge store-badge--light"
          />
          <AppStoreButton
            url="#"
            theme="dark"
            title="Coming soon on"
            width={210}
            height={58}
            className="store-badge store-badge--outline store-badge--disabled"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
