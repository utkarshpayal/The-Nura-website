import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import useReveal from '../hooks/useReveal';
import { ANDROID_APK_URL } from '../constants';
import screenHome from '../assets/images/screen-home.png';
import screenInsights from '../assets/images/screen-insights.png';
import screenWellbeing from '../assets/images/screen-wellbeing.png';
import screenBuddy from '../assets/images/screen-buddy.png';

const trustPoints = [
  'Reviewed with OB-GYNs',
  'End-to-end encrypted',
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
    quote: 'The AI report chat helped me understand my hormone panel before my appointment — I finally knew what to ask my doctor.',
    name: 'Maya F.',
    tag: 'Using Nura for 8 months',
    initial: 'M',
  },
  {
    quote: 'Partner Sync means my husband gets gentle context without me having to explain everything every month.',
    name: 'Priya R.',
    tag: 'Partner Sync user',
    initial: 'P',
  },
  {
    quote: 'Booking a video consultation in-app, then getting a plain-language summary of my report, saved me so much anxiety.',
    name: 'Jordan K.',
    tag: 'Nura Professional consultation',
    initial: 'J',
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
    body: 'Ask anything, anonymously — by voice or text, in your language. Nura explains symptoms and reports in plain terms.',
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
    body: 'Store lab results and prescriptions securely, then ask your reports questions in plain language, in any of 11 languages.',
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
    body: 'Daily logging and healthy habits grow your tree — join a gamified wellness system with streaks and rewards.',
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
    body: 'Share gentle context with a partner on your terms, or connect anonymously with people navigating similar experiences.',
  },
];

export default function Home() {
  const [refFeatures, inFeatures] = useReveal();
  const [refScreens, inScreens] = useReveal();
  const [refTestimonials, inTestimonials] = useReveal();
  const [refDownload, inDownload] = useReveal();

  return (
    <div className="page">
      <Nav />

      {/* HERO */}
      <div className="container" style={{ padding: '76px 32px 48px', display: 'flex', alignItems: 'center', gap: 56, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 460px', minWidth: 300 }}>
          <div className="eyebrow" style={{ marginBottom: 22 }}>
            <span className="eyebrow-dot" />
            AI Women's Health Platform
          </div>
          <h1 style={{ font: "800 48px/1.15 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 20px', letterSpacing: '-0.02em' }}>
            Understand your body. Get answers you can trust.
          </h1>
          <p style={{ font: "500 17px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', margin: '0 0 32px', maxWidth: 500 }}>
            Nura combines cycle tracking, AI health insights, and real gynaecologist consultations in one private,
            secure app — so you always know what's going on and what to do about it.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
            <Link to="/download" className="btn btn-brand" style={{ padding: '15px 26px' }}>
              Download the app
            </Link>
            <Link to="/features" className="btn btn-secondary" style={{ padding: '15px 26px' }}>
              Explore features
            </Link>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 28px' }}>
            {trustPoints.map((t) => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 7, font: "600 13px 'Inter',sans-serif", color: 'var(--ink-3)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12.5L9.5 18L20 6" stroke="var(--teal)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ flex: '1 1 280px', minWidth: 240, display: 'flex', justifyContent: 'center' }}>
          <div className="phone-shell" style={{ position: 'relative', width: 290, maxWidth: '100%' }}>
            <div style={{ borderRadius: 36, background: '#17151F', padding: 10, boxShadow: 'var(--shadow-lg)' }}>
              <img src={screenHome} alt="Nura cycle dashboard" style={{ width: '100%', display: 'block', borderRadius: 28 }} />
            </div>
            <div
              className="card"
              style={{
                position: 'absolute',
                left: -28,
                bottom: 44,
                padding: '12px 16px',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                maxWidth: 190,
              }}
            >
              <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--teal-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3c-3 3-5 5.8-5 9a5 5 0 0 0 10 0c0-3.2-2-6-5-9Z" stroke="var(--teal)" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div style={{ font: "700 12.5px 'Inter',sans-serif", color: 'var(--ink)' }}>Next period</div>
                <div style={{ font: "500 12px 'Inter',sans-serif", color: 'var(--ink-3)' }}>In 5 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div ref={refFeatures} className={`reveal ${inFeatures ? 'in' : ''} container`} style={{ padding: '80px 32px 40px' }}>
        <div style={{ maxWidth: 620, margin: '0 auto 48px', textAlign: 'center' }}>
          <h2 style={{ font: "800 32px/1.25 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 12px', letterSpacing: '-0.01em' }}>
            One app for your whole cycle
          </h2>
          <p style={{ font: "500 16px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', margin: '0 0 20px' }}>
            From daily logging to doctor consultations — everything is designed around how your body actually feels.
          </p>
          <Link to="/features" style={{ font: "700 14px 'Inter',sans-serif" }}>See all features →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
          {featureCards.map((f) => (
            <div key={f.title} className="card card-hover" style={{ padding: 26 }}>
              <div className="icon-tile" style={{ background: f.bg, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ font: "700 16.5px 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 8px' }}>{f.title}</h3>
              <p style={{ font: "500 14px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', margin: 0 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SCREENSHOTS */}
      <div id="screens" ref={refScreens} className={`reveal ${inScreens ? 'in' : ''}`} style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '88px 32px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 48px' }}>
            <h2 style={{ font: "800 32px/1.25 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 12px', letterSpacing: '-0.01em' }}>A look inside the app</h2>
            <p style={{ font: "500 16px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', margin: 0 }}>
              Clear, uncluttered screens designed to make daily tracking feel effortless.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {screenshots.map((s) => (
              <div key={s.id} style={{ width: 200 }}>
                <div style={{ borderRadius: 26, background: '#17151F', padding: 8, boxShadow: 'var(--shadow-md)' }}>
                  <img src={s.src} alt={s.label} style={{ width: '100%', display: 'block', borderRadius: 19 }} />
                </div>
                <p style={{ textAlign: 'center', font: "700 13.5px 'Inter',sans-serif", color: 'var(--ink)', margin: '14px 0 0' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div ref={refTestimonials} className={`reveal ${inTestimonials ? 'in' : ''} container`} style={{ padding: '88px 32px' }}>
        <h2 style={{ font: "800 32px/1.25 'Manrope',sans-serif", color: 'var(--ink)', textAlign: 'center', margin: '0 0 48px', letterSpacing: '-0.01em' }}>
          What people track with Nura
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
          {testimonials.map((t) => (
            <div key={t.name} className="card" style={{ padding: 26 }}>
              <p style={{ font: "500 15px/1.7 'Inter',sans-serif", color: 'var(--ink)', margin: '0 0 20px' }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--brand-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 13px 'Manrope',sans-serif", color: 'var(--brand-dark)' }}>
                  {t.initial}
                </div>
                <div>
                  <div style={{ font: "700 13.5px 'Inter',sans-serif", color: 'var(--ink)' }}>{t.name}</div>
                  <div style={{ font: "500 12.5px 'Inter',sans-serif", color: 'var(--ink-4)' }}>{t.tag}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DOWNLOAD CTA */}
      <div ref={refDownload} className={`reveal ${inDownload ? 'in' : ''}`} style={{ background: 'var(--surface-dark)', padding: '80px 32px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ font: "800 32px/1.25 'Manrope',sans-serif", color: '#fff', margin: '0 0 14px', letterSpacing: '-0.01em' }}>
            Start understanding your health today
          </h2>
          <p style={{ font: "500 16px/1.6 'Inter',sans-serif", color: 'rgba(255,255,255,0.65)', margin: '0 0 32px' }}>
            Free to download. Core tracking and AI insights, always free.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={ANDROID_APK_URL} className="btn" style={{ background: '#fff', color: 'var(--ink)', padding: '14px 22px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M4 3.5C3.6 3.9 3.4 4.5 3.4 5.2V18.8C3.4 19.5 3.6 20.1 4 20.5L4.1 20.6L12.2 12.5V12.3L4.1 4.2L4 3.5Z" fill="#4CB5F5" />
                <path d="M15 15.3L12.2 12.5V12.3L15 9.5L15.1 9.6L18.4 11.5C19.4 12.1 19.4 13 18.4 13.6L15.1 15.5L15 15.3Z" fill="#F5CB40" />
                <path d="M15.1 15.4L12.2 12.5L4 20.7C4.4 21.1 4.9 21.1 5.6 20.8L15.1 15.4Z" fill="#EA4C3C" />
                <path d="M15.1 9.6L5.6 4.2C4.9 3.8 4.4 3.9 4 4.3L12.2 12.5L15.1 9.6Z" fill="#3CBA65" />
              </svg>
              Download APK
            </a>
            <span className="btn" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.16)', padding: '14px 22px', cursor: 'default' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.55)"><path d="M17.05 12.5c-.03-2.4 1.96-3.55 2.05-3.6-1.12-1.63-2.86-1.85-3.48-1.88-1.48-.15-2.9.87-3.65.87-.75 0-1.9-.85-3.13-.83-1.6.02-3.1.94-3.92 2.37-1.68 2.9-.43 7.2 1.2 9.55.8 1.15 1.76 2.43 3 2.38 1.2-.05 1.66-.77 3.11-.77 1.45 0 1.86.77 3.13.75 1.3-.02 2.12-1.16 2.9-2.32.92-1.33 1.3-2.62 1.32-2.68-.03-.01-2.53-.97-2.56-3.84Z" /><path d="M14.7 5.3c.66-.8 1.1-1.9 1-3-.94.04-2.1.63-2.78 1.42-.6.7-1.14 1.83-1 2.9 1.06.08 2.13-.53 2.78-1.32Z" /></svg>
              iOS — Coming soon
            </span>
          </div>
        </div>
      </div>

      <Newsletter title="Cycle tips, in your inbox" subtitle="One thoughtful email a month. No spam, unsubscribe anytime." />

      <Footer />
    </div>
  );
}
