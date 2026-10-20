import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import useReveal from '../hooks/useReveal';
import { ANDROID_PLAY_STORE_URL } from '../constants';
import { GooglePlayButton, AppStoreButton } from 'react-mobile-app-button';
import PhoneFrame from '../components/PhoneFrame';
import screenHome from '../assets/images/screens/screen-home.webp';
import screenInsights from '../assets/images/screens/screen-insights.webp';
import screenWellbeing from '../assets/images/screens/screen-wellbeing.webp';
import screenBuddy from '../assets/images/screens/screen-buddy.webp';
import screenApplock from '../assets/images/screens/screen-applock.webp';
import useDocumentMeta from '../hooks/useDocumentMeta';

const trustPoints = [
  'Reviewed with OB-GYNs',
  'Encrypted & private',
  '11+ languages',
  '24/7 AI health assistant',
];

const screenshots = [
  { id: 'shot-home', label: 'Cycle Dashboard', src: screenHome },
  { id: 'shot-insights', label: 'AI Health Insights', src: screenInsights },
  { id: 'shot-wellbeing', label: 'Wellbeing & Forest', src: screenWellbeing },
  { id: 'shot-chat', label: 'AI Health Assistant', src: screenBuddy },
];

const testimonials = [
  {
    quote: 'The AI report chat helped me understand my hormone panel before my appointment. I finally knew what to ask my doctor.',
    name: 'Jinal M.',
    tag: 'Using Nura for 2 months',
  },
  {
    quote: 'Partner Sync means my husband gets gentle context without me having to explain everything every month.',
    name: 'Priya R.',
    tag: 'Partner Sync user',
  },
  {
    quote: 'Booking a video consultation in-app, then getting a plain-language summary of my report, saved me so much anxiety.',
    name: 'Anshika R.',
    tag: 'Booked a video consultation',
  },
];

const featureCards = [
  {
    bg: 'var(--brand-tint)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="16" rx="3" stroke="var(--brand-dark)" strokeWidth="1.7" />
        <path d="M3 9.5H21" stroke="var(--brand-dark)" strokeWidth="1.7" />
        <path d="M8 3V6.5M16 3V6.5" stroke="var(--brand-dark)" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="8.5" cy="14" r="1.3" fill="var(--brand-dark)" />
        <circle cx="12" cy="14" r="1.3" fill="var(--brand-dark)" />
        <circle cx="15.5" cy="14" r="1.3" fill="var(--brand-dark)" />
      </svg>
    ),
    title: 'Cycle tracking & AI predictions',
    body: 'Log symptoms in seconds. Nura predicts your next period, fertile window, and flags irregular cycles early.',
  },
  {
    bg: 'var(--accent-tint)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 3C7 3 3 6.6 3 11c0 2.4 1.2 4.6 3.2 6.1L5.5 21l4.2-1.8c.7.1 1.5.2 2.3.2 5 0 9-3.6 9-8s-4-8.4-9-8.4Z" stroke="var(--accent)" strokeWidth="1.7" strokeLinejoin="round" />
        <circle cx="8.5" cy="11" r="1" fill="var(--accent)" />
        <circle cx="12" cy="11" r="1" fill="var(--accent)" />
        <circle cx="15.5" cy="11" r="1" fill="var(--accent)" />
      </svg>
    ),
    title: 'AI health assistant',
    body: 'Ask anything, anonymously, by voice or text, in your language. It draws on the same intelligence layer as your predictions and insights, not a generic chatbot.',
  },
  {
    bg: 'var(--teal-tint)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M8 3v3M16 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" stroke="var(--teal)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 14l2 2 4-4" stroke="var(--teal)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Gynaecologist consultations',
    body: 'Book chat, audio, or video consultations with verified clinicians directly in the app, with secure payments.',
  },
  {
    bg: 'var(--amber-tint)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 19V6a2 2 0 0 1 2-2h11l3 3v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" stroke="var(--amber)" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M8 9h8M8 13h8M8 17h5" stroke="var(--amber)" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    title: 'Documents & report chat',
    badge: 'Premium',
    body: 'Store lab results and prescriptions securely, then ask your reports questions in plain language, in any of 11+ languages.',
  },
  {
    bg: 'var(--teal-tint)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 3c-3 3-5 5.8-5 9a5 5 0 0 0 10 0c0-3.2-2-6-5-9Z" stroke="var(--teal)" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M12 13v6" stroke="var(--teal)" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    title: 'Nura Forest',
    body: 'Daily logging and healthy habits grow your tree. Join a gamified wellness system with streaks and rewards.',
  },
  {
    bg: 'var(--brand-tint)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="9" r="3" stroke="var(--brand-dark)" strokeWidth="1.7" />
        <circle cx="17" cy="9" r="2.4" stroke="var(--brand-dark)" strokeWidth="1.7" />
        <path d="M3 19c0-2.8 2.3-5 5-5s5 2.2 5 5M14.5 14.5c2.5.2 4.5 2.1 4.5 4.5" stroke="var(--brand-dark)" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    title: 'Partner Sync & community',
    body: 'Join the anonymous community for free. With Premium, invite a partner into a permission-based view of your cycle.',
  },
];
// Same promises the Privacy page makes, surfaced on Home so the trust story
// is visible before someone has to go looking for it.
const safetyPoints = [
  {
    title: 'Never sold, never shared',
    body: 'Your health data is never sold to advertisers or data brokers.',
  },
  {
    title: 'Encrypted and locked',
    body: 'Your notes, chats and messages are encrypted in our database, and App Lock keeps the app behind a PIN or Face ID.',
  },
  {
    title: 'Reviewed with OB-GYNs',
    body: 'Health guidance is reviewed with clinicians, and consultations are with verified gynaecologists.',
  },
  {
    title: 'Export or delete anytime',
    body: 'Download a copy of your data from Privacy & security, or permanently delete your account and data.',
  },
];

// Government schemes & benefits is deliberately not repeated here — it
// already has its own dedicated callout card directly above this grid.

export default function Home() {
  useDocumentMeta("Nura: AI Women's Health Platform", "Nura is an AI-powered women's health platform for cycle tracking, medical guidance, and everyday wellbeing.");

  const [refFeatures, inFeatures] = useReveal();
  const [refScreens, inScreens] = useReveal();
  const [refSafety, inSafety] = useReveal();
  const [refTestimonials, inTestimonials] = useReveal();
  const [refDownload, inDownload] = useReveal();

  return (
    <div className="page">
      <Nav />

      {/* HERO */}
      <div className="container" style={{ padding: '72px 32px 64px', display: 'flex', alignItems: 'center', gap: 56, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 460px', minWidth: 0 }}>
          <h1 style={{ font: 'var(--t-display)', color: 'var(--ink)', margin: '0 0 20px' }}>
            Understand your body. Get answers you can trust.
          </h1>
          <p style={{ font: 'var(--t-lead)', color: 'var(--ink-3)', margin: '0 0 32px', maxWidth: 500 }}>
            Nura is built on an AI and ML engine that learns your cycle: tracking, predictions, and real gynaecologist
            consultations in one private, secure app so you always know what's going on and what to do about it.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
            <Link to="/download" className="btn btn-brand" style={{ padding: '15px 26px' }}>
              Download the app
            </Link>
            <Link to="/features" className="btn btn-secondary" style={{ padding: '15px 26px' }}>
              Explore features
            </Link>
          </div>
          <p style={{ font: 'var(--t-caption)', color: 'var(--ink-4)', margin: 0 }}>{trustPoints.join(' · ')}</p>
        </div>

        <div style={{ flex: '1 1 280px', minWidth: 240, display: 'flex', justifyContent: 'center' }}>
          <div className="phone-shell" style={{ width: 290, maxWidth: '100%' }}>
            <PhoneFrame src={screenHome} alt="Nura cycle dashboard" width={290} loading="eager" />
          </div>
        </div>
      </div>

      {/* UNIQUE CALLOUTS */}
      <div className="container" style={{ padding: '0 32px 8px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Link
          to="/features"
          className="card card-hover"
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 18px', padding: '20px 24px', textDecoration: 'none' }}
        >
          <div style={{ flex: '3 1 200px' }}>
            <div style={{ font: 'var(--t-label)', color: 'var(--ink)' }}>
              Only in Nura: real government health scheme guidance
            </div>
            <div style={{ font: 'var(--t-caption)', color: 'var(--ink-3)' }}>
              Browse reproductive-health benefits and check your eligibility for free. Premium helps you submit and track applications.
            </div>
          </div>
          <span style={{ font: 'var(--t-label-sm)', color: 'var(--brand)', flexShrink: 0, marginLeft: 'auto' }}>Learn more →</span>
        </Link>

        <Link
          to="/diagnostics"
          className="card card-hover"
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 18px', padding: '20px 24px', textDecoration: 'none' }}
        >
          <div style={{ flex: '3 1 200px' }}>
            <div style={{ font: 'var(--t-label)', color: 'var(--ink)' }}>
              Coming soon: Nura Diagnostics
            </div>
            <div style={{ font: 'var(--t-caption)', color: 'var(--ink-3)' }}>
              Home sample collection, digital lab reports, and a straight line from results to a gynaecologist, all connected.
            </div>
          </div>
          <span style={{ font: 'var(--t-label-sm)', color: 'var(--brand)', flexShrink: 0, marginLeft: 'auto' }}>Learn more →</span>
        </Link>
      </div>

      {/* FEATURES */}
      <div ref={refFeatures} className={`reveal ${inFeatures ? 'in' : ''} container`} style={{ padding: '48px 32px 40px' }}>
        <div style={{ maxWidth: 620, margin: '0 auto 48px', textAlign: 'center' }}>
          <h2 style={{ font: 'var(--t-h2)', color: 'var(--ink)', margin: '0 0 12px', letterSpacing: '-0.01em' }}>
            One app for your whole cycle
          </h2>
          <p style={{ font: 'var(--t-body)', color: 'var(--ink-3)', margin: '0 0 20px' }}>
            From daily logging to doctor consultations, everything is designed around how your body actually feels.
          </p>
          <Link to="/features" style={{ font: 'var(--t-label)' }}>See all features →</Link>
        </div>
        <div className="home-features-grid stagger">
          {featureCards.map((f) => (
            <div key={f.title} style={{ padding: '26px 0', borderTop: '1px solid var(--line)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 6 }}>
                  <h3 style={{ font: 'var(--t-title)', color: 'var(--ink)', margin: 0 }}>{f.title}</h3>
                  {f.badge && (
                    <span className="premium-tag">{f.badge}</span>
                  )}
                </div>
                <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: 0, maxWidth: 320 }}>{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SCREENSHOTS */}
      <div id="screens" ref={refScreens} className={`reveal ${inScreens ? 'in' : ''}`} style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '88px 32px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 48px' }}>
            <h2 style={{ font: 'var(--t-h2)', color: 'var(--ink)', margin: '0 0 12px', letterSpacing: '-0.01em' }}>A look inside the app</h2>
            <p style={{ font: 'var(--t-body)', color: 'var(--ink-3)', margin: 0 }}>
              Clear, uncluttered screens designed to make daily tracking feel effortless.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {screenshots.map((s) => (
              <div key={s.id} style={{ width: 200 }}>
                <PhoneFrame src={s.src} alt={s.label} width={200} />
                <p style={{ textAlign: 'center', font: 'var(--t-label-sm)', color: 'var(--ink)', margin: '14px 0 0' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHY DIFFERENT — a single confident statement, not another grid */}
      <div className="container" style={{ padding: '96px 32px', textAlign: 'center' }}>
        <p style={{ font: 'var(--t-h2)', letterSpacing: '-0.02em', color: 'var(--ink)', margin: '0 auto 24px', maxWidth: 780 }}>
          Most apps stop at <span style={{ color: 'var(--ink-4)' }}>a calendar and a guess.</span> Nura adds real doctors, a
          doctor-ready report, and government benefits you may not know you qualify for.
        </p>
        <Link to="/features" style={{ font: 'var(--t-label)' }}>See the full comparison →</Link>
      </div>

      {/* PRIVACY & SAFETY */}
      <div ref={refSafety} className={`reveal ${inSafety ? 'in' : ''}`} style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '88px 32px' }}>
        <div className="container" style={{ padding: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '48px 72px' }}>
          <div style={{ flex: '0 1 240px', margin: '0 auto' }}>
            <PhoneFrame src={screenApplock} alt="Nura App Lock screen" width={240} />
          </div>
          <div style={{ flex: '1 1 420px', minWidth: 0 }}>
            <h2 style={{ font: 'var(--t-h2)', color: 'var(--ink)', margin: '0 0 12px' }}>Your health data stays yours</h2>
            <p style={{ font: 'var(--t-body)', color: 'var(--ink-3)', margin: '0 0 28px', maxWidth: 520 }}>
              Cycle and symptom data is some of the most personal information you have. We treat it that way.
            </p>
            <dl style={{ margin: '0 0 28px' }}>
              {safetyPoints.map((p) => (
                <div key={p.title} style={{ padding: '16px 0', borderTop: '1px solid var(--line)' }}>
                  <dt style={{ font: 'var(--t-title-sm)', color: 'var(--ink)', marginBottom: 4 }}>{p.title}</dt>
                  <dd style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: 0 }}>{p.body}</dd>
                </div>
              ))}
            </dl>
            <Link to="/security" style={{ font: 'var(--t-label)' }}>How we protect your data →</Link>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div ref={refTestimonials} className={`reveal ${inTestimonials ? 'in' : ''} container`} style={{ padding: '88px 32px' }}>
        <h2 style={{ font: 'var(--t-h2)', color: 'var(--ink)', textAlign: 'center', margin: '0 0 48px', letterSpacing: '-0.01em' }}>
          What members say about Nura
        </h2>
        <div className="stagger" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20 }}>
          {testimonials.map((t) => (
            <div key={t.name} className="card" style={{ padding: 26, flex: '0 1 320px', maxWidth: 380 }}>
              <p style={{ font: 'var(--t-body)', color: 'var(--ink)', margin: '0 0 20px' }}>"{t.quote}"</p>
              <div>
                <div style={{ font: 'var(--t-label-sm)', color: 'var(--ink)' }}>{t.name}</div>
                <div style={{ font: 'var(--t-caption)', color: 'var(--ink-4)' }}>{t.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DOWNLOAD CTA */}
      <div ref={refDownload} className={`reveal ${inDownload ? 'in' : ''}`} style={{ background: 'var(--surface-dark)', padding: '80px 32px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ font: 'var(--t-h2)', color: '#fff', margin: '0 0 14px', letterSpacing: '-0.01em' }}>
            Start understanding your health today
          </h2>
          <p style={{ font: 'var(--t-body)', color: 'rgba(255,255,255,0.65)', margin: '0 0 16px' }}>
            Free to download. Core tracking and AI insights are always free. Deeper features unlock one at a time, or all together with Premium.
          </p>
          <p style={{ font: 'var(--t-label-sm)', margin: '0 0 32px' }}>
            <Link to="/pricing" style={{ color: '#fff', textDecoration: 'underline' }}>See what's free vs. paid →</Link>
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 14 }}>
            <GooglePlayButton
              url={ANDROID_PLAY_STORE_URL}
              theme="light"
              title="Download for"
              width={210}
              height={58}
              className="store-badge store-badge--light"
            />
            <AppStoreButton
              url="#"
              theme="dark"
              title="Coming soon on"
              width={210}
              height={58}
              className="store-badge store-badge--outline store-badge--disabled"
            />
          </div>
        </div>
      </div>

      <Newsletter title="Cycle tips, in your inbox" subtitle="One thoughtful email a month. No spam, unsubscribe anytime." />

      <Footer />
    </div>
  );
}
