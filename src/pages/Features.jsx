import Nav from '../components/Nav';
import Footer from '../components/Footer';
import useReveal from '../hooks/useReveal';
import PhoneFrame from '../components/PhoneFrame';
import { GooglePlayButton, AppStoreButton } from 'react-mobile-app-button';
import { ANDROID_APK_URL } from '../constants';
import screenHome from '../assets/images/screen-home.png';
import screenInsights from '../assets/images/screen-insights.png';
import screenWellbeing from '../assets/images/screen-wellbeing.png';
import screenBuddy from '../assets/images/screen-buddy.png';

const tagStyle = { background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 999, padding: '7px 14px', font: "600 12.5px 'Inter',sans-serif", color: 'var(--ink-2)' };

function FeatureRow({ eyebrow, title, body, tags, img, alt, reversed }) {
  const [ref, visible] = useReveal();
  const textBlock = (
    <div style={{ flex: '1 1 380px', minWidth: 300 }}>
      <div className="eyebrow" style={{ marginBottom: 18 }}>{eyebrow}</div>
      <h2 style={{ font: "800 28px/1.25 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 14px', letterSpacing: '-0.01em' }}>{title}</h2>
      <p style={{ font: "500 15.5px/1.7 'Inter',sans-serif", color: 'var(--ink-3)', margin: '0 0 20px' }}>{body}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {tags.map((t) => (
          <span key={t} style={tagStyle}>{t}</span>
        ))}
      </div>
    </div>
  );
  const imgBlock = (
    <div style={{ flex: '1 1 260px', minWidth: 220, display: 'flex', justifyContent: 'center' }}>
      <PhoneFrame src={img} alt={alt} width={220} />
    </div>
  );

  if (reversed) {
    return (
      <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '64px 32px' }}>
        <div ref={ref} className={`reveal ${visible ? 'in' : ''} container`} style={{ display: 'flex', alignItems: 'center', gap: 56, flexWrap: 'wrap-reverse' }}>
          {imgBlock}
          {textBlock}
        </div>
      </div>
    );
  }
  return (
    <div ref={ref} className={`reveal ${visible ? 'in' : ''} container`} style={{ padding: '64px 32px', display: 'flex', alignItems: 'center', gap: 56, flexWrap: 'wrap' }}>
      {textBlock}
      {imgBlock}
    </div>
  );
}

const moreFeatures = [
  {
    title: 'Health documents & AI intelligence',
    body: 'Store lab results, prescriptions, and scans securely. Nura summarizes them and flags abnormal values automatically.',
    bg: 'var(--amber-tint)',
    icon: <path d="M4 19V6a2 2 0 0 1 2-2h11l3 3v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" stroke="var(--amber)" strokeWidth="1.7" strokeLinejoin="round" />,
  },
  {
    title: 'Unified health report',
    body: 'Combine logs, cycle history, and consultations into one report you can share with any healthcare provider.',
    bg: 'var(--brand-tint)',
    icon: <path d="M9 3h6l1 4h-8l1-4ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" stroke="var(--brand-dark)" strokeWidth="1.7" strokeLinejoin="round" />,
  },
  {
    title: 'Multilingual voice agent',
    body: 'A hands-free assistant that logs symptoms, answers questions, and reads reports aloud in your language.',
    bg: 'var(--teal-tint)',
    icon: <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3ZM6 11a6 6 0 0 0 12 0M12 19v2" stroke="var(--teal)" strokeWidth="1.7" strokeLinecap="round" />,
  },
  {
    title: 'Anonymous community',
    body: 'Ask questions and share experiences in a moderated, judgment-free space. Your identity stays private.',
    bg: 'var(--accent-tint)',
    icon: <path d="M8 10h8M8 14h5M5 20l1.5-3.2A6 6 0 1 1 12 19a6 6 0 0 1-3.2-.9L5 20Z" stroke="var(--accent)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: 'Nominate Buddy',
    body: 'AI matches you anonymously with people who share similar cycle patterns or symptoms, for private peer support.',
    bg: 'var(--brand-tint)',
    icon: <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM15 8a2.4 2.4 0 1 0 0-4.8M3 19a6 6 0 0 1 12 0M14.5 14.5c2.5.2 4.5 2.1 4.5 4.5" stroke="var(--brand-dark)" strokeWidth="1.7" strokeLinecap="round" />,
  },
  {
    title: 'Sexual wellbeing',
    body: 'Doctor-reviewed articles, intimacy education, and consent guidance for relationship and sexual health.',
    bg: 'var(--accent-tint)',
    icon: <path d="M12 21s-7-4.35-9.5-8.5C.7 8.8 2.6 5 6.3 5c1.9 0 3.3 1 3.7 2.3C10.4 6 11.8 5 13.7 5c3.7 0 5.6 3.8 3.8 7.5C15 16.65 12 21 12 21Z" stroke="var(--accent)" strokeWidth="1.7" strokeLinejoin="round" />,
  },
  {
    title: 'Short-form video learning',
    body: 'Bite-sized videos from gynaecologists and health experts on PCOS, hormones, nutrition, and more.',
    bg: 'var(--amber-tint)',
    icon: <path d="M6 4l14 8-14 8V4Z" stroke="var(--amber)" strokeWidth="1.7" strokeLinejoin="round" />,
  },
  {
    title: 'Personalised habits & Forest',
    body: 'AI-generated daily habits based on your cycle and goals. Complete them to grow your tree and earn rewards.',
    bg: 'var(--teal-tint)',
    icon: <path d="M12 3c-3 3-5 5.8-5 9a5 5 0 0 0 10 0c0-3.2-2-6-5-9Z" stroke="var(--teal)" strokeWidth="1.7" strokeLinejoin="round" />,
  },
  {
    title: 'Privacy & app lock',
    body: 'Biometric app lock, on-device encryption, and granular controls over exactly what you share, with whom.',
    bg: 'var(--brand-tint)',
    icon: <path d="M6 11V8a6 6 0 0 1 12 0v3M5 11h14v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9Z" stroke="var(--brand-dark)" strokeWidth="1.7" strokeLinejoin="round" />,
  },
];

export default function Features() {
  const [refGrid, inGrid] = useReveal();
  const [refCta, inCta] = useReveal();

  return (
    <div className="page">
      <Nav />

      <div className="container" style={{ padding: '76px 32px 8px', textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>
          Features
        </div>
        <h1 style={{ font: "800 42px/1.2 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 auto 16px', maxWidth: 720, letterSpacing: '-0.02em' }}>
          Everything you need to understand and manage your health
        </h1>
        <p style={{ font: "500 16.5px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', margin: '0 auto', maxWidth: 560 }}>
          From daily tracking to real medical consultations, built around how your cycle actually feels, not a spreadsheet pretending to be one.
        </p>
      </div>

      <FeatureRow
        eyebrow="Cycle tracking"
        title="Cycle & symptom tracking that takes seconds"
        body="Log flow, mood, symptoms, sleep, and more with one tap. Nura learns your rhythm and predicts your next period, fertile window, and ovulation, with growing accuracy over time."
        tags={['Interactive calendar', 'Smart predictions', 'Irregular cycle detection']}
        img={screenHome}
        alt="Cycle dashboard"
      />

      <FeatureRow
        eyebrow="AI health assistant"
        title="A private health assistant, available 24×7"
        body="Ask anything about your body, by voice or text, in your own language. Nura explains symptoms, lab values, and medical terms in plain language, and can log data, update your cycle, or read articles aloud on request."
        tags={['Voice & text', 'Multilingual', 'Anonymous by default']}
        img={screenBuddy}
        alt="AI health assistant"
        reversed
      />

      <FeatureRow
        eyebrow="Consultations & health library"
        title="Real answers from real clinicians, when you need them"
        body="Book chat, audio, or video consultations with verified gynaecologists directly in the app. Pair that with a health library covering PCOS, endometriosis, pregnancy, and more, available in 11+ languages with text-to-speech."
        tags={['Verified clinicians', 'Secure payments', 'Consultation history']}
        img={screenInsights}
        alt="Health insights"
      />

      <FeatureRow
        eyebrow="Forest & partner sync"
        title="Wellness that grows with you and the people you choose"
        body="Daily logging and healthy habits grow a tree in your personal Forest. Invite a partner into a permission-based space where they get gentle context and care reminders, never your raw data, unless you choose to share it."
        tags={['Gamified wellness', 'Streaks & rewards', 'Permission-based sharing']}
        img={screenWellbeing}
        alt="Wellbeing and forest"
        reversed
      />

      {/* GRID OF REMAINING FEATURES */}
      <div ref={refGrid} className={`reveal ${inGrid ? 'in' : ''} container`} style={{ padding: '80px 32px' }}>
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 44px' }}>
          <h2 style={{ font: "800 30px/1.25 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 12px', letterSpacing: '-0.01em' }}>And a lot more, built in</h2>
          <p style={{ font: "500 15.5px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', margin: 0 }}>
            Nura is a full platform, not a single feature. Here's what else comes with it.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 18 }}>
          {moreFeatures.map((f) => (
            <div key={f.title} className="card card-hover" style={{ padding: 24 }}>
              <div className="icon-tile" style={{ background: f.bg, marginBottom: 14 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">{f.icon}</svg>
              </div>
              <h3 style={{ font: "700 15.5px 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 6px' }}>{f.title}</h3>
              <p style={{ font: "500 13.5px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', margin: 0 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div ref={refCta} className={`reveal ${inCta ? 'in' : ''}`} style={{ background: 'var(--surface-dark)', padding: '76px 32px', textAlign: 'center' }}>
        <h2 style={{ font: "800 30px/1.25 'Manrope',sans-serif", color: '#fff', margin: '0 0 28px', letterSpacing: '-0.01em' }}>Ready to feel supported?</h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 14 }}>
          <GooglePlayButton
            url={ANDROID_APK_URL}
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

      <Footer />
    </div>
  );
}
