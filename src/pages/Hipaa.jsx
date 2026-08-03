import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const sections = [
  {
    title: 'Our commitment',
    body: 'Nura treats every piece of health information you share (cycle logs, symptoms, lab results, and consultation notes) as protected health information (PHI), whether or not a given feature falls under HIPAA. We apply HIPAA-aligned safeguards across the platform as a baseline, not a ceiling.',
  },
  {
    title: 'How your data is protected',
    body: 'Health logs and uploaded documents are encrypted at rest and in transit. Access is limited to systems and personnel who need it to operate the service, and consultation records are only visible to you and the clinician you spoke with.',
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
    body: 'You can request an export of your health data at any time from Settings, and you can permanently delete your account and associated data, typically processed within 30 days. You can also request corrections to inaccurate information.',
  },
  {
    title: 'Breach notification',
    body: 'In the unlikely event of a security incident affecting your health information, we will notify affected users and relevant authorities in accordance with applicable law.',
  },
  {
    title: 'Contact our privacy team',
    body: 'For questions about this notice or to exercise your data rights, contact privacy@nura.health. We aim to respond within 5 business days.',
  },
];

export default function Hipaa() {
  return (
    <div className="page">
      <Nav />

      <PageHero eyebrow="Legal" title="HIPAA & Health Data Notice" subtitle="Last updated January 1, 2026" max={720} />

      <div className="container" style={{ maxWidth: 760, padding: '48px 32px 96px' }}>
        <div className="card" style={{ padding: '8px 36px' }}>
          {sections.map((s, i) => (
            <div key={s.title} style={{ padding: '26px 0', borderBottom: i === sections.length - 1 ? 'none' : '1px solid var(--line)' }}>
              <h2 style={{ font: "700 16.5px 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 10px' }}>{s.title}</h2>
              <p style={{ font: "500 14.5px/1.75 'Inter',sans-serif", color: 'var(--ink-2)', margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
        <p style={{ font: "500 13.5px/1.6 'Inter',sans-serif", color: 'var(--ink-4)', marginTop: 24, textAlign: 'center' }}>
          For our full data-handling practices, see our <Link to="/privacy" style={{ fontWeight: 700 }}>Privacy page</Link>.
        </p>
      </div>

      <Footer />
    </div>
  );
}
