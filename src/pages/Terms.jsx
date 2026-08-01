import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const sections = [
  {
    title: '1. Acceptance of terms',
    body: 'By creating an account or using Nura, you agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use the app.',
  },
  {
    title: '2. Who can use Nura',
    body: 'Nura is intended for users aged 16 and older. If you are under the age of majority in your jurisdiction, you confirm you have permission from a parent or guardian to use the app.',
  },
  {
    title: '3. Your account',
    body: 'You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. Notify us immediately at support@nura.health if you suspect unauthorized access.',
  },
  {
    title: '4. Not a substitute for medical care',
    body: 'Nura provides health information, tracking tools, and AI-generated insights for educational and wellness purposes only. It does not diagnose conditions or replace professional medical advice. Always consult a qualified healthcare provider for medical decisions, and seek emergency care for urgent symptoms.',
  },
  {
    title: '5. Consultations & Professional accounts',
    body: 'Gynaecologists and creators on Nura Professional are independently verified but are not employees of Nura. Consultations booked through the app are a direct professional relationship between you and the clinician; Nura facilitates scheduling, payments, and secure messaging.',
  },
  {
    title: '6. Subscriptions & payments',
    body: 'Nura App is free. Nura Professional is billed monthly or annually as selected at checkout, and renews automatically until cancelled. You can cancel anytime from account settings; access continues until the end of the current billing period.',
  },
  {
    title: '7. Community conduct',
    body: 'Anonymous community features, Partner Sync, and Nominate Buddy are moderated spaces. Harassment, medical misinformation, and impersonation of healthcare professionals are not permitted and may result in account suspension.',
  },
  {
    title: '8. Intellectual property',
    body: 'All content, trademarks, and software associated with Nura are owned by Nura Health, Inc. or its licensors. You retain ownership of the health data and content you submit.',
  },
  {
    title: '9. Limitation of liability',
    body: 'Nura is provided "as is." To the extent permitted by law, Nura Health, Inc. is not liable for indirect or consequential damages arising from use of the app, including reliance on AI-generated insights.',
  },
  {
    title: '10. Changes to these terms',
    body: 'We may update these terms from time to time. Material changes will be communicated in-app or by email before they take effect.',
  },
];

export default function Terms() {
  return (
    <div className="page">
      <Nav />

      <PageHero eyebrow="Legal" title="Terms of Service" subtitle="Last updated January 1, 2026" max={720} />

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
          Questions about these terms? Contact us at{' '}
          <a href="mailto:legal@nura.health" style={{ fontWeight: 700 }}>legal@nura.health</a>.
        </p>
      </div>

      <Footer />
    </div>
  );
}
