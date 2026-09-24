import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import useReveal from '../hooks/useReveal';
import useDocumentMeta from '../hooks/useDocumentMeta';

const groups = [
  {
    heading: 'Getting started',
    items: [
      {
        q: 'Is Nura free?',
        a: 'Yes. The full Nura app — cycle tracking, AI health assistant, insights, community, and more — is free forever, with no locked features. Professional is a separate, verified add-on for licensed clinicians and wellness creators.',
      },
      {
        q: 'Which devices are supported?',
        a: 'Android 10 and above is available now on Google Play. The iOS app is coming soon.',
      },
      {
        q: 'What languages does Nura support?',
        a: 'The app, AI chat, and report explanations work in 11+ languages, with voice input and text-to-speech so guidance isn’t locked behind English or literacy.',
      },
    ],
  },
  {
    heading: 'Health & AI',
    items: [
      {
        q: 'Can Nura replace a doctor?',
        a: 'No. Nura helps you understand your body and prepare for conversations with a clinician, and lets you book real consultations in-app — but it is not a substitute for professional medical advice, diagnosis, or treatment.',
      },
      {
        q: 'How accurate are the predictions?',
        a: 'Nura learns your personal rhythm over time, so forecasts for your next period, fertile window, and ovulation get more accurate the more you log. It also flags irregular cycles early so you know when to check in with a doctor.',
      },
      {
        q: 'What is the report chat?',
        a: 'You can securely upload lab results and prescriptions, and then ask questions about them in plain language. Nura summarizes reports and highlights values worth discussing with your clinician.',
      },
    ],
  },
  {
    heading: 'Privacy & data',
    items: [
      {
        q: 'Is my health data private?',
        a: 'Yes. Health logs and documents are encrypted at rest and in transit, and we never sell your data or use your cycle and symptom logs to target ads. You choose exactly what to share, and with whom.',
      },
      {
        q: 'Can I export or delete my data?',
        a: 'Anytime. You can export your health data from Settings, and permanently delete your account and associated data — typically processed within 30 days.',
      },
      {
        q: 'What does Partner Sync share?',
        a: 'Only what you explicitly choose. Partner Sync gives someone you invite gentle context and care reminders on a permission-based basis — never your raw data unless you turn that on.',
      },
    ],
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--line)' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '20px 0',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          font: "700 15px 'Inter',sans-serif",
          color: 'var(--ink)',
        }}
      >
        {q}
        <span style={{ color: 'var(--brand)', flexShrink: 0, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .18s ease', font: "400 22px 'Inter',sans-serif", lineHeight: 1 }}>
          +
        </span>
      </button>
      {open && (
        <p style={{ font: "500 14.5px/1.75 'Inter',sans-serif", color: 'var(--ink-2)', margin: '0 0 20px', maxWidth: 640 }}>
          {a}
        </p>
      )}
    </div>
  );
}

export default function Faq() {
  useDocumentMeta('FAQ | Nura', 'Answers to the most common questions about Nura: pricing, devices, languages, AI, and privacy.');

  const [ref, visible] = useReveal();

  return (
    <div className="page">
      <Nav />

      <PageHero
        eyebrow="FAQ"
        title="Questions, answered"
        subtitle="The things people ask most about Nura. Still stuck? We’re one message away."
        max={720}
      />

      <div ref={ref} className={`reveal ${visible ? 'in' : ''} container`} style={{ maxWidth: 760, padding: '40px 32px 72px' }}>
        {groups.map((g) => (
          <div key={g.heading} style={{ marginBottom: 40 }}>
            <h2 style={{ font: "800 20px 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
              {g.heading}
            </h2>
            <div className="card" style={{ padding: '4px 28px' }}>
              {g.items.map((it) => (
                <FaqItem key={it.q} q={it.q} a={it.a} />
              ))}
            </div>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <p style={{ font: "500 14.5px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', margin: '0 0 14px' }}>
            Didn’t find what you were looking for?
          </p>
          <Link to="/contact" className="btn btn-brand">Contact us</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
