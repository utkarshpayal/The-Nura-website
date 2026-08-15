import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import useReveal from '../hooks/useReveal';

const shared = [
  'Smart cycle & symptom tracking', 'Adaptive forecasts (learns your rhythm)', 'End-to-end encryption',
  'Sleep, mood & symptom logging', 'Daily insight cards tailored to your phase', 'Optional biometric app lock',
  'Customizable reminders & notifications', 'Partner Sync sharing', 'Nominate Buddy anonymous matching',
  'Nura Forest habit tracking', 'Anonymous community Q&A', 'AI health assistant, voice & text',
  'Deep physiological trend reports', 'Guided wellbeing audio library', 'Early access to new features',
  'Voice logging & text-to-speech', 'App, chat & reports in 11+ languages', 'Upload lab results, scans & prescriptions',
  'AI chat with your medical reports', 'Unified health report generator',
];

const proOnly = [
  'Creator Profile: public professional profile', 'Gynac Onboarding: verified clinician listing',
  'Post articles & educational content', 'Publish short-form videos on any topic', 'Upload long-form videos on any topic',
  'In-platform consultations: chat', 'In-platform consultations: video call',
];

const faqDefs = [
  { id: 'verify', question: 'How does Professional verification work?', answer: 'You submit your license or credentials during Gynac Onboarding or Creator Profile setup. Our team reviews within 2–3 business days before your account goes live.' },
  { id: 'cancel', question: 'Can I cancel my Professional plan anytime?', answer: 'Yes. Cancel anytime from your account settings. You keep access until the end of the current billing period.' },
  { id: 'switch', question: 'Can I switch between monthly and annual billing?', answer: 'Yes, you can switch at your next renewal date. Annual billing saves 35% compared to paying monthly.' },
  { id: 'data', question: 'Is my data ever sold or shared?', answer: 'Never. All plans include end-to-end encryption, and we do not sell user data, whether on the free app or on Professional.' },
];

function toggleBtnStyle(active) {
  return {
    padding: '9px 18px',
    border: 'none',
    borderRadius: 9,
    font: "700 13px 'Inter',sans-serif",
    cursor: 'pointer',
    transition: 'all .15s ease',
    background: active ? 'var(--brand)' : 'transparent',
    color: active ? '#fff' : 'var(--ink-3)',
  };
}

export default function Pricing() {
  const [billing, setBilling] = useState('annual');
  const [faqOpen, setFaqOpen] = useState({});
  const [refPlans, inPlans] = useReveal();
  const [refFaq, inFaq] = useReveal();

  const isAnnual = billing === 'annual';
  const proPrice = isAnnual ? '$4.49' : '$6.99';
  const proPeriod = isAnnual ? '/month, billed annually' : '/month';
  const saveBadge = isAnnual ? 'Save 35%' : 'Flexible';

  const toggleFaq = (id) => setFaqOpen((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="page">
      <Nav />

      {/* HERO */}
      <div className="container" style={{ maxWidth: 720, padding: '76px 32px 8px', textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>
          Pricing
        </div>
        <h1 style={{ font: "800 40px/1.2 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
          Free for everyone. No locked features.
        </h1>
        <p style={{ font: "500 16px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', margin: 0 }}>
          Nura App is $0, forever. Professional is a verified add-on for licensed clinicians and wellness creators.
        </p>
      </div>

      {/* BILLING TOGGLE */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 32px 0' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 2, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 11, padding: 4 }}>
          <button onClick={() => setBilling('monthly')} style={toggleBtnStyle(!isAnnual)}>Monthly</button>
          <button onClick={() => setBilling('annual')} style={toggleBtnStyle(isAnnual)}>
            Annual <span style={{ opacity: 0.75 }}>· save 35%</span>
          </button>
        </div>
      </div>

      {/* PLANS */}
      <div ref={refPlans} className={`reveal ${inPlans ? 'in' : ''} container`} style={{ maxWidth: 980, padding: '36px 32px 96px', display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'stretch' }}>
        {/* FREE PLAN */}
        <div className="card pricing-card" style={{ flex: '1 1 380px', maxWidth: 420, padding: 32 }}>
          <h2 style={{ font: "800 20px 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 8px' }}>Nura App</h2>
          <p style={{ font: "500 14px/1.5 'Inter',sans-serif", color: 'var(--ink-3)', margin: '0 0 22px' }}>
            The complete Nura experience — every core feature, free for everyone, forever.
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 22 }}>
            <span style={{ font: "800 38px 'Manrope',sans-serif", color: 'var(--ink)' }}>$0</span>
            <span style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--ink-4)' }}>/forever</span>
          </div>
          <Link to="/download" className="btn btn-secondary" style={{ width: '100%', marginBottom: 22 }}>
            Get started free
          </Link>
          <div style={{ borderTop: '1px solid var(--line)', marginBottom: 18 }}></div>
          <div className="pricing-features" style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {shared.map((f) => (
              <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                  <path d="M4 12.5L9.5 18L20 6" stroke="var(--teal)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ font: "500 13.5px/1.5 'Inter',sans-serif", color: 'var(--ink-2)' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PROFESSIONAL PLAN */}
        <div className="pricing-card pricing-card--dark" style={{ position: 'relative', flex: '1 1 380px', maxWidth: 420, background: 'var(--surface-dark)', borderRadius: 'var(--radius-lg)', padding: 32 }}>
          <div style={{ position: 'absolute', top: -14, right: 22, background: 'var(--brand)', color: '#fff', font: "700 11.5px 'Inter',sans-serif", padding: '5px 12px', borderRadius: 999 }}>
            {saveBadge}
          </div>
          <h2 style={{ font: "800 20px 'Manrope',sans-serif", color: '#fff', margin: '0 0 8px' }}>Nura Professional</h2>
          <p style={{ font: "500 14px/1.5 'Inter',sans-serif", color: 'rgba(255,255,255,0.6)', margin: '0 0 22px' }}>
            Post content, run consultations, and manage sessions under a verified Creator Profile or Gynac Onboarding listing.
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 18 }}>
            <span style={{ font: "800 38px 'Manrope',sans-serif", color: '#fff' }}>{proPrice}</span>
            <span style={{ font: "600 14px 'Inter',sans-serif", color: 'rgba(255,255,255,0.55)' }}>{proPeriod}</span>
          </div>
          <div style={{ display: 'flex', gap: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: 14, marginBottom: 18 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
              <path d="M6 11V8a6 6 0 0 1 12 0v3M5 11h14v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9Z" stroke="#EFC97A" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            <p style={{ font: "500 12.5px/1.6 'Inter',sans-serif", color: '#E9D6A6', margin: 0 }}>
              <b style={{ color: '#F5E4B8' }}>Verification required.</b> Only for licensed gynaecologists/OB-GYNs or credentialed reproductive-health &amp; wellness creators. We review credentials before approval, and every consultation stays inside the platform, no external contact info is exchanged.
            </p>
          </div>
          <Link to="/contact" className="btn btn-brand" style={{ width: '100%', marginBottom: 22 }}>
            Apply for a Professional account
          </Link>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: 18 }}></div>
          <div className="pricing-features" style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {[...shared, ...proOnly].map((f) => (
              <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                  <path d="M4 12.5L9.5 18L20 6" stroke="#7CE2B4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ font: "500 13.5px/1.5 'Inter',sans-serif", color: 'rgba(255,255,255,0.85)' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div ref={refFaq} className={`reveal ${inFaq ? 'in' : ''} container`} style={{ maxWidth: 760, padding: '8px 32px 96px' }}>
        <h2 style={{ font: "800 26px 'Manrope',sans-serif", color: 'var(--ink)', textAlign: 'center', margin: '0 0 28px', letterSpacing: '-0.01em' }}>Common questions</h2>
        <div className="card" style={{ overflow: 'hidden' }}>
          {faqDefs.map((q) => {
            const open = !!faqOpen[q.id];
            return (
              <div key={q.id} className="faq-row" onClick={() => toggleFaq(q.id)} style={{ padding: '18px 22px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                  <span style={{ font: "700 14.5px 'Inter',sans-serif", color: 'var(--ink)' }}>{q.question}</span>
                  <span style={{ font: "700 18px 'Inter',sans-serif", color: 'var(--brand)', flexShrink: 0 }}>{open ? '−' : '+'}</span>
                </div>
                {open && (
                  <p style={{ font: "500 13.5px/1.7 'Inter',sans-serif", color: 'var(--ink-3)', margin: '12px 0 0' }}>{q.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
