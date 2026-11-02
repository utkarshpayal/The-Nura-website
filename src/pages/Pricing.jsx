import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import useReveal from '../hooks/useReveal';
import usePageSeo from '../hooks/usePageSeo';
import { getPricing } from '../lib/api';
import { FALLBACK_PRICING, formatRupees, mergePricing } from '../lib/pricing';

// Prices come live from the backend (GET /api/subscriptions/pricing, the same
// summary the app shows), with FALLBACK_PRICING drawn first and on any error.
// Everything listed here as free must stay free in the app: basic tracking
// and health-safety guidance are never paid.
const freeFeatures = [
  'Period and cycle tracking, with predictions',
  'Fertile-window and ovulation estimates',
  'Symptom, mood and sleep logging',
  'Daily health insights',
  'Ask Nura AI by text or voice, within daily fair-use limits (chats aren’t saved)',
  'Graphs & Reports dashboard',
  'Articles and videos',
  'Government schemes: browse, check eligibility, save and track',
  'Community: browse, post, comment and like, anonymously',
  'Voice logging, read-aloud and supported Indian languages',
  'Reminders, biometric app lock, wellbeing audio and Nura Forest',
  'Urgent-symptom safety guidance',
  'Browse gynaecologists and see their consultation fees',
];

const professionalFeatures = [
  'A verified gynaecologist profile, free during our launch',
  'You set your own consultation fee, shown to patients before they book',
  'In-app chat and video consultations',
];

const faqDefs = (p) => [
  {
    id: 'free',
    question: 'What stays free?',
    answer: 'Tracking, predictions, logging, daily insights, Ask Nura AI (within daily limits), the community, articles, scheme discovery and all safety guidance. They’re never behind a paywall.',
  },
  {
    id: 'billing',
    question: 'How does billing work? Does it renew automatically?',
    answer: `You pay ahead: ${formatRupees(p.premium.monthly.price)} covers 30 days, ${formatRupees(p.premium.yearly.price)} covers 12 months and is paid once, not monthly. Nothing renews by itself, so there’s nothing to cancel. When it ends, the paid features lock again until you buy another period, and your data stays as it was.`,
  },
  {
    id: 'yearly',
    question: 'Is the yearly plan billed every month?',
    answer: p.premium.yearly.comparison?.saving
      ? `No. It’s one payment of ${formatRupees(p.premium.yearly.price)} for 12 months. That works out to about ${formatRupees(p.premium.yearly.comparison.monthlyEquivalent)} a month, ${formatRupees(p.premium.yearly.comparison.saving)} less than 12 monthly payments.`
      : `No. It’s one payment of ${formatRupees(p.premium.yearly.price)} for 12 months.`,
  },
  {
    id: 'tax',
    question: 'Is GST included?',
    answer: p.tax.pricesIncludeTax
      ? `Yes. Prices include ${p.tax.ratePercent}% GST. The app shows the GST and the final amount before you pay.`
      : `GST at ${p.tax.ratePercent}% is added at checkout. The app shows it and the final amount before you pay.`,
  },
  {
    id: 'limits',
    question: 'Is Premium unlimited?',
    answer: 'No. AI messages, document processing and doctor-ready reports have fair-use limits, so we can keep Premium affordable. The app shows what you’ve used.',
  },
  {
    id: 'consult',
    question: 'Are doctor consultations included in Premium?',
    answer: 'No. Each consultation is paid separately, at the fee the doctor sets. You see the fee before you book or pay, on the free app or Premium.',
  },
  {
    id: 'ai',
    question: 'Can Nura AI diagnose me?',
    answer: 'No. Nura AI gives general health information for learning, not medical advice or a diagnosis. For anything that worries you, talk to a doctor. In an emergency, call 112.',
  },
  {
    id: 'privacy',
    question: 'Does paying change what happens to my health data?',
    answer: 'No. Your health data is never sold, on any plan. Medical documents are private to your account.',
  },
];

const Check = ({ color = 'var(--teal)' }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 3 }}>
    <path d="M4 12.5L9.5 18L20 6" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

const priceRow = { display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap', marginBottom: 6 };
const divider = { borderTop: '1px solid var(--line)', margin: '18px 0' };
const featureList = { display: 'flex', flexDirection: 'column', gap: 11, listStyle: 'none', margin: 0, padding: 0 };

export default function Pricing() {
  const [pricing, setPricing] = useState(FALLBACK_PRICING);
  const [period, setPeriod] = useState('monthly');
  const [faqOpen, setFaqOpen] = useState({});
  const [refPlans, inPlans] = useReveal();
  const [refFaq, inFaq] = useReveal();

  useEffect(() => {
    let live = true;
    getPricing()
      .then((data) => live && setPricing(mergePricing(data)))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  const { premium, addOns, tax, fairUse } = pricing;
  const plan = period === 'yearly' ? premium.yearly : premium.monthly;
  const comparison = premium.yearly.comparison;
  const founding = premium.founding;
  const faqs = faqDefs(pricing);

  usePageSeo('/pricing', {
    description: `Tracking, predictions and safety guidance are free. Nura Premium is ${formatRupees(premium.monthly.price)} for 30 days or ${formatRupees(premium.yearly.price)} for a year, paid ahead with no auto-renewal.`,
  });

  const toggleFaq = (id) => setFaqOpen((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="page">
      <Nav />

      {/* HERO */}
      <div className="container" style={{ maxWidth: 720, padding: '76px 32px 8px', textAlign: 'center' }}>
        <h1 style={{ font: 'var(--t-h1)', color: 'var(--ink)', margin: '0 0 16px' }}>
          Free to start. Premium when you want more.
        </h1>
        <p style={{ font: 'var(--t-lead)', color: 'var(--ink-3)', margin: 0 }}>
          Tracking, predictions and safety guidance are free for everyone. Premium adds saved AI chats, your document vault, doctor-ready reports and more.
        </p>
      </div>

      {/* BILLING PERIOD */}
      <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '36px 32px 0' }}>
        <div className="billing-toggle" role="group" aria-label="Billing period">
          {[
            { key: 'monthly', label: 'Monthly' },
            { key: 'yearly', label: 'Yearly', note: comparison?.saving ? `save ${formatRupees(comparison.saving)}` : null },
          ].map((opt) => (
            <button
              key={opt.key}
              type="button"
              aria-pressed={period === opt.key}
              className={period === opt.key ? 'is-active' : ''}
              onClick={() => setPeriod(opt.key)}
            >
              {opt.label}
              {opt.note ? <span className="billing-toggle__note">{opt.note}</span> : null}
            </button>
          ))}
        </div>
      </div>

      {/* PLANS */}
      <div ref={refPlans} className={`reveal ${inPlans ? 'in' : ''} container stagger`} style={{ padding: '28px 32px 0', display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'stretch' }}>
        {/* FREE */}
        <section className="card pricing-card" aria-labelledby="plan-free" style={{ flex: '1 1 320px', maxWidth: 420, padding: 32 }}>
          <h2 id="plan-free" style={{ font: 'var(--t-h4)', color: 'var(--ink)', margin: '0 0 8px' }}>Free</h2>
          <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: '0 0 22px' }}>
            The core of Nura, for everyone. No trial, no expiry.
          </p>
          <div style={priceRow}>
            <span style={{ font: 'var(--t-h1)', color: 'var(--ink)' }}>₹0</span>
            <span style={{ font: 'var(--t-label)', color: 'var(--ink-4)' }}>forever</span>
          </div>
          <Link to="/download" className="btn btn-secondary" style={{ width: '100%', margin: '16px 0 0' }}>
            Get started free
          </Link>
          <div style={divider}></div>
          <ul className="pricing-features" style={featureList}>
            {freeFeatures.map((f) => (
              <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Check />
                <span style={{ font: 'var(--t-body-sm)', color: 'var(--ink-2)' }}>{f}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* PREMIUM */}
        <section className="card pricing-card" aria-labelledby="plan-premium" style={{ flex: '1 1 320px', maxWidth: 420, padding: 32, borderColor: 'var(--brand)', boxShadow: '0 0 0 1px var(--brand)' }}>
          <h2 id="plan-premium" style={{ font: 'var(--t-h4)', color: 'var(--ink)', margin: '0 0 8px' }}>Nura Premium</h2>
          <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: '0 0 22px' }}>
            Everything in Free, plus the features below.
          </p>
          <div style={priceRow} aria-live="polite">
            <span style={{ font: 'var(--t-h1)', color: 'var(--ink)' }}>{formatRupees(plan.price)}</span>
            <span style={{ font: 'var(--t-label)', color: 'var(--ink-4)' }}>
              {period === 'yearly' ? 'for 12 months, paid once' : 'for 30 days'}
            </span>
          </div>
          <p style={{ font: 'var(--t-caption)', color: 'var(--ink-3)', margin: 0, minHeight: 40 }}>
            {period === 'yearly' && comparison
              ? `About ${formatRupees(comparison.monthlyEquivalent)} a month${comparison.saving ? `, ${formatRupees(comparison.saving)} less than 12 monthly payments (${comparison.savingPercent}%)` : ''}.`
              : `Or ${formatRupees(premium.yearly.price)} for a whole year.`}
          </p>
          <Link to="/download" className="btn btn-brand" style={{ width: '100%', margin: '16px 0 10px' }}>
            Get Premium in the app
          </Link>
          <p style={{ font: 'var(--t-caption)', color: 'var(--ink-4)', margin: 0 }}>
            {tax.pricesIncludeTax ? `Includes ${tax.ratePercent}% GST.` : `Plus ${tax.ratePercent}% GST.`} Paid ahead, no auto-renewal.
          </p>
          <div style={divider}></div>
          <ul className="pricing-features" style={featureList}>
            {premium.features.map((f) => (
              <li key={f.key} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Check color="var(--brand)" />
                <span style={{ font: 'var(--t-body-sm)', color: 'var(--ink-2)' }}>{f.name}</span>
              </li>
            ))}
            <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <Check color="var(--brand)" />
              <span style={{ font: 'var(--t-body-sm)', color: 'var(--ink-2)' }}>More AI messages each day than Free</span>
            </li>
          </ul>
          <p style={{ font: 'var(--t-caption)', color: 'var(--ink-4)', margin: '16px 0 0' }}>
            {fairUse?.enabled
              ? `Fair use: up to ${fairUse.aiMessagesPerDay?.premium} AI messages a day, ${fairUse.documentsPerMonth?.premium} medical documents a month (up to ${fairUse.maxPagesPerDocument?.premium} pages each) and ${fairUse.doctorReportsPerMonth?.premium} doctor-ready report a month.`
              : 'Fair-use limits apply to AI messages, document processing and doctor-ready reports.'}{' '}
            Consultations are paid separately.
          </p>
        </section>
      </div>

      {/* FOUNDING OFFER: only while an admin has it switched on */}
      {founding ? (
        <div className="container" style={{ maxWidth: 864, padding: '24px 32px 0' }}>
          <section className="card" aria-labelledby="founding-offer" style={{ padding: '24px 28px', borderColor: 'var(--brand)', background: 'var(--brand-tint)' }}>
            <h2 id="founding-offer" style={{ font: 'var(--t-h4)', color: 'var(--ink)', margin: '0 0 6px' }}>
              Founding member offer: {formatRupees(founding.price)} for your first year
            </h2>
            <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-2)', margin: 0 }}>
              For new Premium members, once per person
              {founding.maxMembers ? `, open to the first ${founding.maxMembers} members` : ''}
              {founding.endsAt ? ` until ${formatDate(founding.endsAt)}` : ''}. After the first year, Premium is{' '}
              {founding.renewalPrice ? `${formatRupees(founding.renewalPrice)}/year` : 'the standard yearly price'} if you choose to continue. Nothing renews by itself. Available in the app under My Subscription.
            </p>
          </section>
        </div>
      ) : null}

      {/* ADD-ONS */}
      <div className="container" style={{ maxWidth: 864, padding: '72px 32px 0' }}>
        <h2 style={{ font: 'var(--t-h2)', color: 'var(--ink)', margin: '0 0 10px', textAlign: 'center' }}>Or buy only what you need</h2>
        <p style={{ font: 'var(--t-body)', color: 'var(--ink-3)', margin: '0 auto 28px', textAlign: 'center', maxWidth: 580 }}>
          Every Premium feature can be bought on its own. If you have Premium, you already have these and won’t be charged again.
        </p>
        <div className="card" style={{ padding: '4px 0', overflowX: 'auto' }}>
          <table className="addon-table">
            <caption className="sr-only">Single feature prices in Indian rupees</caption>
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">30 days</th>
                <th scope="col">12 months</th>
              </tr>
            </thead>
            <tbody>
              {addOns.map((a) => (
                <tr key={a.key}>
                  <th scope="row">
                    {a.name}
                    {a.includedInPremium ? <span className="addon-tag">In Premium</span> : null}
                  </th>
                  <td>{formatRupees(a.price)}</td>
                  <td>{a.yearlyPrice ? formatRupees(a.yearlyPrice) : '—'}</td>
                </tr>
              ))}
              <tr>
                <th scope="row">Community posting</th>
                <td colSpan={2}>Free</td>
              </tr>
              <tr>
                <th scope="row">
                  Government scheme application help
                  <span className="addon-sub">Finding schemes and checking eligibility is free. One-to-one help with an application isn’t offered yet. When it is, you’ll pay only for help actually given, and no one can promise approval.</span>
                </th>
                <td colSpan={2}>Coming soon</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ font: 'var(--t-caption)', color: 'var(--ink-4)', margin: '14px 0 0', textAlign: 'center' }}>
          Prices in Indian rupees{tax.pricesIncludeTax ? `, including ${tax.ratePercent}% GST` : ''}. Paid ahead, no auto-renewal. The app always shows the final amount before you pay.
        </p>
      </div>

      {/* PROFESSIONALS */}
      <div className="container" style={{ maxWidth: 864, padding: '72px 32px 0' }}>
        <section className="pricing-card--dark" aria-labelledby="plan-pro" style={{ background: 'var(--surface-dark)', borderRadius: 'var(--radius-lg)', padding: 32 }}>
          <h2 id="plan-pro" style={{ font: 'var(--t-h3)', color: '#fff', margin: '0 0 8px' }}>For gynaecologists and health professionals</h2>
          <p style={{ font: 'var(--t-body-sm)', color: 'rgba(255,255,255,0.75)', margin: '0 0 20px', maxWidth: 620 }}>
            Consultations are booked and paid in the app, separately from Nura Premium. We verify every clinician’s licence before their profile goes live.
          </p>
          <ul style={{ ...featureList, margin: '0 0 24px' }}>
            {professionalFeatures.map((f) => (
              <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Check color="#7CE2B4" />
                <span style={{ font: 'var(--t-body-sm)', color: 'rgba(255,255,255,0.88)' }}>{f}</span>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/contact?topic=professional" className="btn btn-brand">Apply as a clinician</Link>
            <Link to="/contact?topic=partnership" className="btn btn-ghost-light">Clinics, hospitals and labs: talk to us</Link>
          </div>
          <p style={{ font: 'var(--t-caption)', color: 'rgba(255,255,255,0.6)', margin: '18px 0 0' }}>
            Coming soon: a creator plan with extra professional tools. Pricing for clinics, institutions and diagnostics partners is agreed with you directly.
          </p>
        </section>
      </div>

      {/* FAQ */}
      <div ref={refFaq} className={`reveal ${inFaq ? 'in' : ''} container`} style={{ maxWidth: 760, padding: '72px 32px 24px' }}>
        <h2 style={{ font: 'var(--t-h3)', color: 'var(--ink)', textAlign: 'center', margin: '0 0 28px', letterSpacing: '-0.01em' }}>Common questions</h2>
        <div className="card" style={{ overflow: 'hidden' }}>
          {faqs.map((q) => {
            const open = !!faqOpen[q.id];
            return (
              <div key={q.id} className="faq-row" style={{ padding: '18px 22px' }}>
                <h3 style={{ margin: 0 }}>
                  <button type="button" onClick={() => toggleFaq(q.id)} aria-expanded={open} aria-controls={`faq-${q.id}`} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: 0, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ font: 'var(--t-label)', color: 'var(--ink)' }}>{q.question}</span>
                    <span aria-hidden="true" style={{ font: 'var(--t-title)', color: 'var(--brand)', flexShrink: 0 }}>{open ? '−' : '+'}</span>
                  </button>
                </h3>
                {open && (
                  <p id={`faq-${q.id}`} style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: '12px 0 0' }}>{q.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="container" style={{ maxWidth: 760, padding: '0 32px 96px', font: 'var(--t-caption)', color: 'var(--ink-4)', textAlign: 'center' }}>
        Nura gives general health information for learning. It isn’t medical advice or a diagnosis and doesn’t replace a doctor.
      </p>

      <Footer />
    </div>
  );
}
