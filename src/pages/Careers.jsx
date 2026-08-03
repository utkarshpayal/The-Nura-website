import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import useReveal from '../hooks/useReveal';

const roles = [
  { title: 'Senior React Native Engineer', team: 'Engineering', location: 'Remote', type: 'Full-time' },
  { title: 'ML Engineer, Health Predictions', team: 'AI / Data', location: 'Remote', type: 'Full-time' },
  { title: 'Product Designer', team: 'Design', location: 'Remote', type: 'Full-time' },
  { title: 'Clinical Content Lead (OB-GYN background)', team: 'Medical', location: 'Remote', type: 'Contract' },
  { title: 'Backend Engineer, Platform & Security', team: 'Engineering', location: 'Remote', type: 'Full-time' },
  { title: 'Community & Trust Manager', team: 'Operations', location: 'Remote', type: 'Full-time' },
];

const perks = [
  'Remote-first, async-friendly', 'Health coverage for you & dependents', 'Flexible time off',
  'Annual learning stipend', 'Home office budget', 'Equity for every full-time hire',
];

export default function Careers() {
  const [refRoles, inRoles] = useReveal();
  const [refPerks, inPerks] = useReveal();

  return (
    <div className="page">
      <Nav />

      <PageHero
        eyebrow="Careers"
        title="Help build the future of women's health"
        subtitle="We're a small, remote-first team working on health infrastructure that millions of people will rely on. If that excites you, we'd like to meet you."
      />

      <div ref={refRoles} className={`reveal ${inRoles ? 'in' : ''} container`} style={{ maxWidth: 860, padding: '48px 32px' }}>
        <h2 style={{ font: "800 24px 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 20px', letterSpacing: '-0.01em' }}>Open roles</h2>
        <div className="card" style={{ overflow: 'hidden' }}>
          {roles.map((r) => (
            <a
              key={r.title}
              href="mailto:careers@nura.health"
              className="faq-row"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '18px 22px', color: 'inherit' }}
            >
              <div>
                <div style={{ font: "700 14.5px 'Inter',sans-serif", color: 'var(--ink)', marginBottom: 4 }}>{r.title}</div>
                <div style={{ font: "500 12.5px 'Inter',sans-serif", color: 'var(--ink-4)' }}>{r.team} · {r.location} · {r.type}</div>
              </div>
              <span style={{ font: "700 13px 'Inter',sans-serif", color: 'var(--brand)', flexShrink: 0 }}>Apply →</span>
            </a>
          ))}
        </div>
        <p style={{ font: "500 13.5px/1.6 'Inter',sans-serif", color: 'var(--ink-4)', marginTop: 18 }}>
          Don't see a fit? Send us your background at{' '}
          <a href="mailto:careers@nura.health" style={{ fontWeight: 700 }}>careers@nura.health</a>, we read every note.
        </p>
      </div>

      <div ref={refPerks} className={`reveal ${inPerks ? 'in' : ''}`} style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '72px 32px' }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <h2 style={{ font: "800 24px 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>Benefits & perks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
            {perks.map((p) => (
              <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M4 12.5L9.5 18L20 6" stroke="var(--teal)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--ink-2)' }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
