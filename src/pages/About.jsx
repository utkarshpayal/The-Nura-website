import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import useReveal from '../hooks/useReveal';
import usePageSeo from '../hooks/usePageSeo';

const values = [
  {
    title: 'Privacy is non-negotiable',
    body: 'Health data is the most sensitive data there is. We build with encryption and consent controls first, not as an afterthought.',
    bg: 'var(--brand-tint)',
    icon: <path d="M6 11V8a6 6 0 0 1 12 0v3M5 11h14v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9Z" stroke="var(--brand-dark)" strokeWidth="1.7" strokeLinejoin="round" />,
  },
  {
    title: 'Medically grounded',
    body: 'Every article, prediction, and AI response is reviewed alongside board-certified gynaecologists and health specialists.',
    bg: 'var(--teal-tint)',
    icon: <path d="M9 3h6l1 4h-8l1-4ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" stroke="var(--teal)" strokeWidth="1.7" strokeLinejoin="round" />,
  },
  {
    title: 'Built for every body',
    body: 'Irregular cycles, PCOS, menopause, or just curiosity, Nura adapts to your reality instead of assuming a textbook cycle.',
    bg: 'var(--accent-tint)',
    icon: <path d="M12 21s-7-4.35-9.5-8.5C.7 8.8 2.6 5 6.3 5c1.9 0 3.3 1 3.7 2.3C10.4 6 11.8 5 13.7 5c3.7 0 5.6 3.8 3.8 7.5C15 16.65 12 21 12 21Z" stroke="var(--accent)" strokeWidth="1.7" strokeLinejoin="round" />,
  },
  {
    title: 'Accessible everywhere',
    body: 'Support for 11+ languages, voice interaction, and text-to-speech, so health guidance isn’t locked behind English or literacy.',
    bg: 'var(--amber-tint)',
    icon: <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3ZM6 11a6 6 0 0 0 12 0M12 19v2" stroke="var(--amber)" strokeWidth="1.7" strokeLinecap="round" />,
  },
];

export default function About() {
  usePageSeo('/about');

  const [refStory, inStory] = useReveal();
  const [refValues, inValues] = useReveal();
  const [refCta, inCta] = useReveal();

  return (
    <div className="page">
      <Nav />

      <PageHero
        eyebrow="About Nura"
        title="Health guidance that actually listens"
        subtitle="Nura started with a simple frustration: cycle and reproductive health apps track data, but rarely help you understand it. We're building the version that does both."
      />

      <div ref={refStory} className={`reveal ${inStory ? 'in' : ''} container`} style={{ maxWidth: 760, padding: '48px 32px' }}>
        <div className="card" style={{ padding: 36 }}>
          <h2 style={{ font: 'var(--t-h3)', color: 'var(--ink)', margin: '0 0 14px' }}>Why we built Nura</h2>
          <p style={{ font: 'var(--t-body)', color: 'var(--ink-2)', margin: '0 0 16px' }}>
            Most period trackers stop at logging. Meanwhile, questions about hormonal symptoms, lab results, or when to
            actually see a doctor go unanswered, or worse, get answered by an anonymous forum thread at 2am.
          </p>
          <p style={{ font: 'var(--t-body)', color: 'var(--ink-2)', margin: 0 }}>
            Nura combines cycle tracking with an AI health assistant, real gynaecologist consultations, and a private
            community, so tracking a symptom is the start of getting an answer, not the end of the conversation.
          </p>
          <p style={{ font: 'var(--t-body)', color: 'var(--ink-2)', margin: '16px 0 0' }}>
            <Link to="/team" style={{ color: 'var(--brand)', fontWeight: 600 }}>Meet the team behind Nura →</Link>
          </p>
        </div>
      </div>

      {/* AT A GLANCE */}
      <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '48px 32px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', textAlign: 'center' }}>
          {[
            { k: '11+', l: 'Languages supported' },
            { k: '24/7', l: 'AI health assistant' },
            { k: 'End-to-end', l: 'Encrypted health data' },
            { k: 'OB-GYN', l: 'Clinician-reviewed content' },
          ].map((s) => (
            <div key={s.l}>
              <div style={{ font: 'var(--t-h3)', color: 'var(--brand)' }}>{s.k}</div>
              <div style={{ font: 'var(--t-label-sm)', color: 'var(--ink-4)', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div ref={refValues} className={`reveal ${inValues ? 'in' : ''} container`} style={{ padding: '40px 32px 88px' }}>
        <h2 style={{ font: 'var(--t-h2)', color: 'var(--ink)', textAlign: 'center', margin: '0 0 40px', letterSpacing: '-0.01em' }}>
          What we build around
        </h2>
        <div className="grid-clean-2 stagger">
          {values.map((v) => (
            <div key={v.title} className="card card-hover" style={{ padding: 26 }}>
              <div className="icon-tile" style={{ background: v.bg, marginBottom: 16 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">{v.icon}</svg>
              </div>
              <h3 style={{ font: 'var(--t-title)', color: 'var(--ink)', margin: '0 0 8px' }}>{v.title}</h3>
              <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: 0 }}>{v.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div ref={refCta} className={`reveal ${inCta ? 'in' : ''}`} style={{ background: 'var(--surface-dark)', padding: '76px 32px', textAlign: 'center' }}>
        <h2 style={{ font: 'var(--t-h2)', color: '#fff', margin: '0 0 20px', letterSpacing: '-0.01em' }}>
          Want to help build this?
        </h2>
        <Link to="/careers" className="btn btn-brand" style={{ padding: '15px 28px' }}>
          See open roles
        </Link>
      </div>

      <Footer />
    </div>
  );
}
