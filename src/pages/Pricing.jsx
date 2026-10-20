import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import useReveal from '../hooks/useReveal';
import useDocumentMeta from '../hooks/useDocumentMeta';

// Always free, core experience — nothing here is ever gated. Keep this in
// step with the admin Features tab: anything priced there belongs in
// premiumFeatures below, not here.
const freeFeatures = [
  'Cycle & symptom tracking', 'Period, fertile window & ovulation forecasts', 'Sleep, mood & symptom logging',
  'Daily insight cards tailored to your phase', 'Ask Nura AI anytime (voice & text, chats aren’t saved)',
  'Graphs & Reports dashboard', 'Anonymous community: browse, comment & like',
  'Government schemes guide: browse & check eligibility', 'Nura Forest habit tracking',
  'Guided wellbeing audio library', 'Blogs & short-form video library', 'Voice logging & text-to-speech',
  'App, chat & reports in 11+ languages', 'Customizable reminders & notifications', 'Optional biometric app lock',
  'Book gynaecologist consultations (paid per session)',
];

// Mirrors the live catalog in the admin Features tab (all billed monthly).
// Admins can retune prices there at any time, so the page says these are
// current prices and the app shows the live one.
const PREMIUM_PRICE = '₹99';
const premiumFeatures = [
  { name: 'Nura AI Assistant (saved chats)', body: 'Topic-based AI chat sessions with your full history saved.', price: '₹9', category: 'AI & insights' },
  { name: 'Medical Document Vault & Chat', body: 'Upload lab reports and prescriptions, then ask questions about them.', price: '₹9', category: 'AI & insights' },
  { name: 'Doctor-Ready Health Reports', body: 'AI-written, downloadable PDF reports of your cycle and symptoms.', price: '₹9', category: 'AI & insights' },
  { name: 'PCOS/Endometriosis Symptom Checker', body: 'Guided screening for PCOS, endometriosis, fibroids and thyroid issues.', price: '₹9', category: 'AI & insights' },
  { name: 'Symptom Predictions', body: 'Per-symptom likelihood by cycle phase, based on your own logged history.', price: '₹9', category: 'AI & insights' },
  { name: 'Voice Check-in Calls', body: 'On-demand and scheduled cycle check-in phone calls.', price: '₹18', category: 'Care' },
  { name: 'Government Scheme Application Assistance', body: 'Submit and track government health scheme applications in the app.', price: '₹9', category: 'Care' },
  { name: 'Community Posting', body: 'Create your own posts in the community. Browsing stays free.', price: '₹5', category: 'Community' },
  { name: 'Partner Connect', body: 'Invite a partner into their own connected view of your cycle.', price: '₹9', category: 'Community' },
  { name: 'Period Buddy Matching', body: 'Get matched with a peer buddy for chat and video support.', price: '₹5', category: 'Community' },
];

const proFeatures = [
  'Creator Profile: a public professional profile', 'Gynac Onboarding: a verified clinician listing',
  'Post articles & educational content', 'Publish short-form and long-form videos',
  'Run in-platform consultations by chat and video call',
];

const faqDefs = [
  { id: 'model', question: 'What’s free and what’s paid?', answer: 'Tracking, forecasts, daily insights, the AI assistant, community browsing and the government schemes guide are free forever. Ten deeper features are paid. Take them one at a time, or get all of them with Premium.' },
  { id: 'bundle', question: 'Can I pay for just one feature?', answer: `Yes. Each feature can be unlocked on its own, billed monthly, or you can get all ten with Premium for ${PREMIUM_PRICE}/month. Both are in the app under My Subscription.` },
  { id: 'consult', question: 'Are consultations included in Premium?', answer: 'No. Consultations with gynaecologists are booked and paid per session in the app, whether you’re on the free app or Premium.' },
  { id: 'verify', question: 'How do I apply for Nura Professional?', answer: 'Use the contact form and choose “Apply for Nura Professional”. Our team reviews your licence or credentials and sets up your Creator Profile or Gynac Onboarding listing with you directly.' },
  { id: 'data', question: 'Is my data ever sold or shared?', answer: 'Never, on any plan. Your health data is never sold to advertisers or data brokers.' },
];

const Check = ({ color = 'var(--teal)' }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 3 }}>
    <path d="M4 12.5L9.5 18L20 6" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const priceRow = { display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 22 };
const divider = { borderTop: '1px solid var(--line)', marginBottom: 18 };

export default function Pricing() {
  useDocumentMeta('Pricing | Nura', `The core Nura app is free forever. Unlock deeper features one at a time, or all of them with Premium for ${PREMIUM_PRICE}/month. Nura Professional is for verified clinicians and creators.`);

  const [faqOpen, setFaqOpen] = useState({});
  const [refPlans, inPlans] = useReveal();
  const [refFaq, inFaq] = useReveal();

  const toggleFaq = (id) => setFaqOpen((s) => ({ ...s, [id]: !s[id] }));

  const categories = [...new Set(premiumFeatures.map((f) => f.category))];

  return (
    <div className="page">
      <Nav />

      {/* HERO */}
      <div className="container" style={{ maxWidth: 720, padding: '76px 32px 8px', textAlign: 'center' }}>
        <h1 style={{ font: 'var(--t-h1)', color: 'var(--ink)', margin: '0 0 16px' }}>
          Free to start. Pay only for what you use.
        </h1>
        <p style={{ font: 'var(--t-lead)', color: 'var(--ink-3)', margin: 0 }}>
          The core app is free forever. Unlock deeper features one at a time, or all of them with Premium.
        </p>
      </div>

      {/* PLANS */}
      <div ref={refPlans} className={`reveal ${inPlans ? 'in' : ''} container stagger`} style={{ padding: '48px 32px 0', display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'stretch' }}>
        {/* FREE */}
        <div className="card pricing-card" style={{ flex: '1 1 320px', maxWidth: 380, padding: 32 }}>
          <h2 style={{ font: 'var(--t-h4)', color: 'var(--ink)', margin: '0 0 8px' }}>Free</h2>
          <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: '0 0 22px' }}>
            The core Nura app, for everyone. No trial, no expiry.
          </p>
          <div style={priceRow}>
            <span style={{ font: 'var(--t-h1)', color: 'var(--ink)' }}>₹0</span>
            <span style={{ font: 'var(--t-label)', color: 'var(--ink-4)' }}>forever</span>
          </div>
          <Link to="/download" className="btn btn-secondary" style={{ width: '100%', marginBottom: 22 }}>
            Get started free
          </Link>
          <div style={divider}></div>
          <div className="pricing-features" style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {freeFeatures.map((f) => (
              <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Check />
                <span style={{ font: 'var(--t-body-sm)', color: 'var(--ink-2)' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PREMIUM */}
        <div className="card pricing-card" style={{ flex: '1 1 320px', maxWidth: 380, padding: 32, borderColor: 'var(--brand)', boxShadow: '0 0 0 1px var(--brand)' }}>
          <h2 style={{ font: 'var(--t-h4)', color: 'var(--ink)', margin: '0 0 8px' }}>Premium</h2>
          <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: '0 0 22px' }}>
            Every paid feature in one monthly subscription.
          </p>
          <div style={priceRow}>
            <span style={{ font: 'var(--t-h1)', color: 'var(--ink)' }}>{PREMIUM_PRICE}</span>
            <span style={{ font: 'var(--t-label)', color: 'var(--ink-4)' }}>/month</span>
          </div>
          <Link to="/download" className="btn btn-brand" style={{ width: '100%', marginBottom: 22 }}>
            Get Premium in the app
          </Link>
          <div style={divider}></div>
          <div style={{ font: 'var(--t-label-sm)', color: 'var(--ink)', marginBottom: 12 }}>Everything in Free, plus:</div>
          <div className="pricing-features" style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {premiumFeatures.map((f) => (
              <div key={f.name} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Check color="var(--brand)" />
                <span style={{ font: 'var(--t-body-sm)', color: 'var(--ink-2)' }}>{f.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PROFESSIONAL */}
        <div className="pricing-card pricing-card--dark" style={{ flex: '1 1 320px', maxWidth: 380, background: 'var(--surface-dark)', borderRadius: 'var(--radius-lg)', padding: 32 }}>
          <h2 style={{ font: 'var(--t-h4)', color: '#fff', margin: '0 0 8px' }}>Nura Professional</h2>
          <p style={{ font: 'var(--t-body-sm)', color: 'rgba(255,255,255,0.7)', margin: '0 0 22px' }}>
            For licensed gynaecologists and credentialed reproductive-health and wellness creators.
          </p>
          <div style={priceRow}>
            <span style={{ font: 'var(--t-h3)', color: '#fff' }}>Custom pricing</span>
          </div>
          <Link to="/contact?topic=professional" className="btn btn-brand" style={{ width: '100%', marginBottom: 14 }}>
            Apply for Professional
          </Link>
          <p style={{ font: 'var(--t-caption)', color: 'rgba(255,255,255,0.6)', margin: '0 0 22px' }}>
            Verification required. We review your credentials and agree pricing with you directly. Every consultation stays inside the platform, and no outside contact details are exchanged.
          </p>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', marginBottom: 18 }}></div>
          <div style={{ font: 'var(--t-label-sm)', color: '#fff', marginBottom: 12 }}>Everything in Free, plus:</div>
          <div className="pricing-features" style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {proFeatures.map((f) => (
              <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Check color="#7CE2B4" />
                <span style={{ font: 'var(--t-body-sm)', color: 'rgba(255,255,255,0.85)' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INDIVIDUAL FEATURES */}
      <div className="container" style={{ maxWidth: 820, padding: '88px 32px 88px' }}>
        <h2 style={{ font: 'var(--t-h2)', color: 'var(--ink)', margin: '0 0 10px', textAlign: 'center' }}>Or unlock only what you need</h2>
        <p style={{ font: 'var(--t-body)', color: 'var(--ink-3)', margin: '0 auto 36px', textAlign: 'center', maxWidth: 560 }}>
          Every Premium feature can also be unlocked on its own, billed monthly.
        </p>
        <div className="card" style={{ padding: '8px 28px' }}>
          {categories.map((cat, ci) => (
            <div key={cat} style={{ padding: '20px 0', borderTop: ci === 0 ? 'none' : '1px solid var(--line)' }}>
              <h3 style={{ font: 'var(--t-label-sm)', color: 'var(--ink-4)', letterSpacing: 0, margin: '0 0 6px' }}>{cat}</h3>
              {premiumFeatures.filter((f) => f.category === cat).map((f) => (
                <div key={f.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'baseline', padding: '10px 0' }}>
                  <div>
                    <div style={{ font: 'var(--t-title-sm)', color: 'var(--ink)' }}>{f.name}</div>
                    <div style={{ font: 'var(--t-caption)', color: 'var(--ink-3)' }}>{f.body}</div>
                  </div>
                  <span style={{ flexShrink: 0, font: 'var(--t-label)', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
                    {f.price}<span style={{ color: 'var(--ink-4)', fontWeight: 400 }}>/mo</span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <p style={{ font: 'var(--t-caption)', color: 'var(--ink-4)', margin: '14px 0 0', textAlign: 'center' }}>
          Current prices in Indian rupees. Prices may change, and the app always shows the live price before you pay.
        </p>
      </div>

      {/* FAQ */}
      <div ref={refFaq} className={`reveal ${inFaq ? 'in' : ''} container`} style={{ maxWidth: 760, padding: '8px 32px 96px' }}>
        <h2 style={{ font: 'var(--t-h3)', color: 'var(--ink)', textAlign: 'center', margin: '0 0 28px', letterSpacing: '-0.01em' }}>Common questions</h2>
        <div className="card" style={{ overflow: 'hidden' }}>
          {faqDefs.map((q) => {
            const open = !!faqOpen[q.id];
            return (
              <div key={q.id} className="faq-row" style={{ padding: '18px 22px' }}>
                <button type="button" onClick={() => toggleFaq(q.id)} aria-expanded={open} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: 0, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ font: 'var(--t-label)', color: 'var(--ink)' }}>{q.question}</span>
                  <span aria-hidden="true" style={{ font: 'var(--t-title)', color: 'var(--brand)', flexShrink: 0 }}>{open ? '−' : '+'}</span>
                </button>
                {open && (
                  <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: '12px 0 0' }}>{q.answer}</p>
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
