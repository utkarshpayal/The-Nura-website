import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import useReveal from '../hooks/useReveal';
import usePageSeo from '../hooks/usePageSeo';

// The people on /team. Edit names and lines here; cards show initials, so no
// photos are needed. `note` is one short line under the role; `kind` picks
// the card's colour (founder, doctor, student, team). Layout: `.team-*` in
// index.css.
const founders = [
  { name: 'Utkarsh Payal', role: 'Founder', note: 'Product, engineering and the Nura app.' },
  { name: 'Kunjal Jain', role: 'Co-founder', note: 'Partnerships, care and community.' },
];

// TODO before publishing: the three gynaecologists from the doctors list
// (name, experience / hospital), and real names for everyone else.
const team = [
  { name: 'Dr. Shreem Sharma', role: 'Gynaecologist', note: '3 yrs · Hospital', kind: 'doctor' },
  { name: 'Dr. Sakshi Sha', role: 'Gynaecologist', note: '4 yrs · Hospital', kind: 'doctor' },
  { name: 'Dr. Shuchi Meena', role: 'Obstetrics and Gynaecologies', note: '4 yrs · Hospital', kind: 'doctor' },
  { name: 'Alveera Mirza', role: 'Medical student', note: 'SMS College, Jaipur · 3rd Year', kind: 'student' },
  { name: 'Chhavi', role: 'Medical student', note: 'SMS College, Jaipur  · 3rd Year', kind: 'student' },
  { name: 'Vikash Yadav', role: 'Medical student', note: 'SMS College, Jaipur  · 4th Year', kind: 'student' },
  { name: 'Preeti Sharma', role: 'Data Analyst', note: 'Product and user analysis.', kind: 'team' },
  { name: 'Tanuja Devi', role: 'Content Writer', note: 'Blogs and content creation.', kind: 'team' },
];

const COLORS = {
  founder: { tint: 'var(--brand-tint)', ink: 'var(--brand-dark)' },
  doctor: { tint: 'var(--teal-tint)', ink: 'var(--teal)' },
  student: { tint: 'var(--accent-tint)', ink: 'var(--accent)' },
  team: { tint: 'var(--amber-tint)', ink: 'var(--amber)' },
};

/** "Dr. Asha Rao" → "AR"; titles like Dr. don't count. */
function initials(name) {
  const words = name
    .replace(/^(dr|prof)\.?\s+/i, '')
    .split(/\s+/)
    .filter(Boolean);
  const letters = words.length > 1 ? [words[0], words[words.length - 1]] : words;
  return letters.map((w) => w[0].toUpperCase()).join('');
}

function Avatar({ name, kind, size }) {
  const { tint, ink } = COLORS[kind];
  return (
    <div
      aria-hidden="true"
      className="team-avatar"
      style={{ width: size, height: size, background: tint, color: ink, fontSize: Math.round(size * 0.34) }}
    >
      {initials(name)}
    </div>
  );
}

function RolePill({ role, kind }) {
  const { tint, ink } = COLORS[kind];
  return (
    <span className="team-pill" style={{ background: tint, color: ink }}>
      {role}
    </span>
  );
}

function SectionHeading({ title, intro }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 32px' }}>
      <h2 style={{ font: 'var(--t-h2)', color: 'var(--ink)', margin: '0 0 10px', letterSpacing: '-0.01em' }}>{title}</h2>
      <p style={{ font: 'var(--t-body)', color: 'var(--ink-3)', margin: 0 }}>{intro}</p>
    </div>
  );
}

export default function Team() {
  usePageSeo('/team');
  const [refFounders, inFounders] = useReveal();
  const [refTeam, inTeam] = useReveal();
  const [refCta, inCta] = useReveal();

  return (
    <div className="page">
      <Nav />

      <PageHero
        eyebrow="Our team"
        title="The people behind Nura"
        subtitle="A small team working on health guidance you can trust."
      />

      <section ref={refFounders} className={`reveal ${inFounders ? 'in' : ''} container team-section`}>
        <SectionHeading title="Founders" intro="Building Nura so that tracking a symptom is the start of getting an answer." />
        <div className="team-founders stagger">
          {founders.map((p) => (
            <div key={p.name} className="card card-hover team-founder">
              <Avatar name={p.name} kind="founder" size={104} />
              <div className="team-founder-text">
                <h3 style={{ font: 'var(--t-h3)', color: 'var(--ink)', margin: '0 0 10px' }}>{p.name}</h3>
                <RolePill role={p.role} kind="founder" />
                <p style={{ font: 'var(--t-body)', color: 'var(--ink-3)', margin: '12px 0 0' }}>{p.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        ref={refTeam}
        className={`reveal ${inTeam ? 'in' : ''} team-band`}
      >
        <div className="container team-section">
          <SectionHeading title="Our team" intro="The people who build, check and look after everything you see in Nura." />
          <div className="team-grid stagger">
            {team.map((p, i) => (
              <div key={`${p.name}-${i}`} className="card card-hover team-member">
                <Avatar name={p.name} kind={p.kind} size={80} />
                <h3 style={{ font: 'var(--t-title)', color: 'var(--ink)', margin: '0 0 8px' }}>{p.name}</h3>
                <RolePill role={p.role} kind={p.kind} />
                {p.note ? <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: '10px 0 0' }}>{p.note}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div ref={refCta} className={`reveal ${inCta ? 'in' : ''}`} style={{ background: 'var(--surface-dark)', padding: '76px 32px', textAlign: 'center' }}>
        <h2 style={{ font: 'var(--t-h2)', color: '#fff', margin: '0 0 20px', letterSpacing: '-0.01em' }}>
          Want to join us?
        </h2>
        <Link to="/careers" className="btn btn-brand" style={{ padding: '15px 28px' }}>
          See open roles
        </Link>
      </div>

      <Footer />
    </div>
  );
}
