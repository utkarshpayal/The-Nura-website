import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import useReveal from '../hooks/useReveal';

// Always free, core experience — nothing here is ever gated.
const freeFeatures = [
  'Smart cycle & symptom tracking', 'Adaptive forecasts (learns your rhythm)', 'End-to-end encryption',
  'Sleep, mood & symptom logging', 'Daily insight cards tailored to your phase', 'Optional biometric app lock',
  'Customizable reminders & notifications', 'Partner Sync (once connected)', 'Nura Forest habit tracking',
  'Anonymous community — browse, comment & like', 'Ask Nura AI anytime (voice & text, no history saved)',
  'Guided wellbeing audio library', 'Voice logging & text-to-speech', 'App, chat & reports in 11+ languages',
  'PCOS/endometriosis/fibroid/thyroid screening history', 'Government schemes & benefits guide (browse + eligibility check)',
  'Blogs & short-form video library', 'Graphs & Reports dashboard',
  'Book real gynaecologist consultations (paid per session, not a subscription)',
];

// Sourced from period-buddy-be's live feature catalog — each unlocks on its
// own, individually or bundled, right when a screen would otherwise lock it.
// Prices are the catalog's current defaults; admins can retune them any
// time from the Content Studio, so treat these as representative, not fixed.
const premiumFeatures = [
  { name: 'Nura AI Assistant — saved chats', body: 'Persisted, topic-scoped AI chat sessions with full history.', price: '₹99/mo', category: 'AI & Insights' },
  { name: 'Medical Document Vault & Chat', body: 'Upload lab reports/prescriptions and ask questions about them.', price: '₹149/mo', category: 'AI & Insights' },
  { name: 'Doctor-Ready Health Reports', body: 'AI-written, downloadable PDF cycle/symptom reports.', price: '₹99/mo', category: 'AI & Insights' },
  { name: 'Symptom Predictions', body: 'Per-symptom likelihood by cycle phase, from your own history.', price: '₹79/mo', category: 'AI & Insights' },
  { name: 'PCOS/Endometriosis Symptom Checker', body: 'Guided screening for PCOS, endometriosis, fibroids & thyroid issues.', price: '₹49 one-time', category: 'AI & Insights' },
  { name: 'Voice Check-in Calls', body: 'Outbound "call me now" and scheduled cycle check-in phone calls.', price: '₹199/mo', category: 'Care' },
  { name: 'Government Scheme Application Assistance', body: 'Submit and track applications to government health schemes.', price: '₹49 one-time', category: 'Care' },
  { name: 'Community Posting', body: 'Create new posts in the community forum.', price: '₹29/mo', category: 'Community' },
  { name: 'Partner Connect', body: 'Invite a partner into their own connected view of your cycle.', price: '₹49 one-time', category: 'Community' },
  { name: 'Period Buddy Matching', body: 'Get matched with a peer buddy for chat and video support.', price: '₹39 one-time', category: 'Community' },
];

const proOnly = [
  'Everything in Nura App, plus:',
  'Creator Profile: public professional profile', 'Gynac Onboarding: verified clinician listing',
  'Post articles & educational content', 'Publish short-form videos on any topic', 'Upload long-form videos on any topic',
  'In-platform consultations: chat', 'In-platform consultations: video call',
];

const faqDefs = [
  { id: 'model', question: 'Why do some features cost extra if the app is free?', answer: 'Core tracking, predictions, and daily insights are free forever, that’s the app. A handful of deeper features (saved AI chat history, document AI, voice check-in calls, and a few others) unlock individually, right when you’d otherwise hit a lock, so you only ever pay for what you actually use.' },
  { id: 'bundle', question: 'Can I unlock more than one feature at once?', answer: 'Yes, buy features individually as you need them, or as a bundle if you want several at once, both are priced in the app under My Subscription.' },
  { id: 'verify', question: 'How does Professional verification work?', answer: 'You apply via the contact form. Our team reviews your license or credentials and sets up your Creator Profile or Gynac Onboarding listing directly.' },
  { id: 'data', question: 'Is my data ever sold or shared?', answer: 'Never. Every plan includes end-to-end encryption, and we do not sell user data.' },
];

export default function Pricing() {
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
        <div className="eyebrow" style={{ marginBottom: 20 }}>
          Pricing
        </div>
        <h1 style={{ font: "800 40px/1.2 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
          Free to start. Pay only for what you actually use.
        </h1>
        <p style={{ font: "500 16px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', margin: 0 }}>
          Tracking, predictions, and daily insights are free forever. A handful of deeper features unlock individually as you need them, and Nura Professional is a separate, verified add-on for licensed clinicians and wellness creators.
        </p>
      </div>

      {/* PLANS */}
      <div ref={refPlans} className={`reveal ${inPlans ? 'in' : ''} container`} style={{ maxWidth: 1180, padding: '48px 32px 96px', display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'stretch' }}>
        {/* FREE PLAN */}
        <div className="card pricing-card" style={{ flex: '1 1 340px', maxWidth: 380, padding: 32 }}>
          <h2 style={{ font: "800 20px 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 8px' }}>Nura App</h2>
          <p style={{ font: "500 14px/1.5 'Inter',sans-serif", color: 'var(--ink-3)', margin: '0 0 22px' }}>
            The core experience, free for everyone, forever, no trial, no expiry.
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 22 }}>
            <span style={{ font: "800 38px 'Manrope',sans-serif", color: 'var(--ink)' }}>₹0</span>
            <span style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--ink-4)' }}>/forever</span>
          </div>
          <Link to="/download" className="btn btn-secondary" style={{ width: '100%', marginBottom: 22 }}>
            Get started free
          </Link>
          <div style={{ borderTop: '1px solid var(--line)', marginBottom: 18 }}></div>
          <div className="pricing-features" style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {freeFeatures.map((f) => (
              <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                  <path d="M4 12.5L9.5 18L20 6" stroke="var(--teal)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ font: "500 13.5px/1.5 'Inter',sans-serif", color: 'var(--ink-2)' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PREMIUM — À LA CARTE */}
        <div className="card pricing-card" style={{ flex: '1 1 380px', maxWidth: 420, padding: 32 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Pay for what you use</div>
          <h2 style={{ font: "800 20px 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 8px' }}>Unlock as you need it</h2>
          <p style={{ font: "500 14px/1.5 'Inter',sans-serif", color: 'var(--ink-3)', margin: '0 0 22px' }}>
            No subscription required, buy an individual feature the moment you need it, or bundle a few together.
          </p>
          <Link to="/download" className="btn btn-brand" style={{ width: '100%', marginBottom: 8 }}>
            Get the app to unlock
          </Link>
          <p style={{ font: "500 11.5px/1.5 'Inter',sans-serif", color: 'var(--ink-4)', margin: '0 0 18px' }}>
            Prices shown are current in-app defaults and may change, live pricing always shows in the app.
          </p>
          <div style={{ borderTop: '1px solid var(--line)', marginBottom: 18 }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {categories.map((cat) => (
              <div key={cat}>
                <div style={{ font: "700 11px 'Inter',sans-serif", color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10 }}>{cat}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {premiumFeatures.filter((f) => f.category === cat).map((f) => (
                    <div key={f.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ flex: '1 1 auto' }}>
                        <div style={{ font: "700 13px 'Inter',sans-serif", color: 'var(--ink)' }}>{f.name}</div>
                        <div style={{ font: "500 12px/1.5 'Inter',sans-serif", color: 'var(--ink-3)' }}>{f.body}</div>
                      </div>
                      <span style={{ flexShrink: 0, font: "600 12.5px 'Inter',sans-serif", color: 'var(--ink-4)', whiteSpace: 'nowrap', marginTop: 1 }}>{f.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROFESSIONAL PLAN */}
        <div className="pricing-card pricing-card--dark" style={{ position: 'relative', flex: '1 1 340px', maxWidth: 380, background: 'var(--surface-dark)', borderRadius: 'var(--radius-lg)', padding: 32 }}>
          <h2 style={{ font: "800 20px 'Manrope',sans-serif", color: '#fff', margin: '0 0 8px' }}>Nura Professional</h2>
          <p style={{ font: "500 14px/1.5 'Inter',sans-serif", color: 'rgba(255,255,255,0.6)', margin: '0 0 22px' }}>
            Post content, run consultations, and manage sessions under a verified Creator Profile or Gynac Onboarding listing.
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 18 }}>
            <span style={{ font: "800 26px 'Manrope',sans-serif", color: '#fff' }}>Custom pricing</span>
          </div>
          <div style={{ display: 'flex', gap: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: 14, marginBottom: 18 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
              <path d="M6 11V8a6 6 0 0 1 12 0v3M5 11h14v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9Z" stroke="#EFC97A" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            <p style={{ font: "500 12.5px/1.6 'Inter',sans-serif", color: '#E9D6A6', margin: 0 }}>
              <b style={{ color: '#F5E4B8' }}>Verification required.</b> Only for licensed gynaecologists/OB-GYNs or credentialed reproductive-health &amp; wellness creators. We review credentials and set up pricing with you directly, every consultation stays inside the platform, no external contact info is exchanged.
            </p>
          </div>
          <Link to="/contact" className="btn btn-brand" style={{ width: '100%', marginBottom: 22 }}>
            Apply for a Professional account
          </Link>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: 18 }}></div>
          <div className="pricing-features" style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {proOnly.map((f, i) => (
              i === 0 ? (
                <div key={f} style={{ font: "700 12px 'Inter',sans-serif", color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 2 }}>{f}</div>
              ) : (
                <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                    <path d="M4 12.5L9.5 18L20 6" stroke="#7CE2B4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ font: "500 13.5px/1.5 'Inter',sans-serif", color: 'rgba(255,255,255,0.85)' }}>{f}</span>
                </div>
              )
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
