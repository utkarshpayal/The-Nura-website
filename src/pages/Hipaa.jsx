import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import useDocumentMeta from '../hooks/useDocumentMeta';

const sections = [
  {
    title: 'Our commitment',
    body: 'Nura treats every piece of health information you share — cycle logs, symptoms, lab results, and consultation notes — as sensitive personal data. We apply strong safeguards across the platform as a baseline, not a ceiling, and handle your data in line with applicable data-protection law, including India’s Digital Personal Data Protection (DPDP) Act, 2023.',
  },
  {
    title: 'How your data is protected',
    body: 'All data is encrypted in transit. Free text you write (notes, AI chats, messages and consultation chats) is encrypted field by field with AES-256 in our database, and uploaded documents are kept in private, encrypted storage and opened through links that expire after 10 minutes. Our staff tools never show your health records, and consultation records are only visible to you and the clinician you spoke with.',
  },
  {
    title: 'Consultations with clinicians',
    body: 'When you book a chat, audio, or video consultation through Nura Professional, that clinician is bound by their own professional confidentiality obligations in addition to our platform-level protections. Consultation history is stored securely and accessible only to you.',
  },
  {
    title: 'What we never do',
    body: 'We do not sell health data to advertisers or data brokers, and we do not use your cycle or symptom logs to target ads. Partner Sync and community features only share what you explicitly choose to share.',
  },
  {
    title: 'Your rights',
    body: 'You can download a copy of your data at any time from Privacy & security in the app, and delete your account from Profile: you are signed out and hidden from others at once, and your account and data are erased 30 days later. You can also request corrections to inaccurate information.',
  },
  {
    title: 'Breach notification',
    body: 'In the unlikely event of a security incident affecting your health information, we will notify affected users and the relevant authorities in accordance with applicable law.',
  },
  {
    title: 'Contact our privacy team',
    body: 'For questions about this notice or to exercise your data rights, contact privacy@thenura.care. We aim to respond within 5 business days.',
  },
];

export default function Hipaa() {
  useDocumentMeta('Data Protection | Nura', 'How Nura stores, protects, and handles your health data.');

  return (
    <div className="page">
      <Nav />

      <PageHero
        eyebrow="Legal"
        title="Health Data Protection Notice"
        subtitle="How we safeguard your health information. Last updated September 30, 2026."
        max={720}
      />

      <div className="container" style={{ maxWidth: 760, padding: '48px 32px 96px' }}>
        <div className="card" style={{ padding: '8px 36px' }}>
          {sections.map((s, i) => (
            <div key={s.title} style={{ padding: '26px 0', borderBottom: i === sections.length - 1 ? 'none' : '1px solid var(--line)' }}>
              <h2 style={{ font: 'var(--t-title)', color: 'var(--ink)', margin: '0 0 10px' }}>{s.title}</h2>
              <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-2)', margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
        <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-4)', marginTop: 24, textAlign: 'center' }}>
          For our full data-handling practices, see our <Link to="/privacy" style={{ fontWeight: 700 }}>Privacy page</Link> and{' '}
          <Link to="/security" style={{ fontWeight: 700 }}>Security & Safety</Link>.
        </p>
      </div>

      <Footer />
    </div>
  );
}
