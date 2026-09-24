import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import useReveal from '../hooks/useReveal';
import PhoneFrame from '../components/PhoneFrame';
import { GooglePlayButton, AppStoreButton } from 'react-mobile-app-button';
import { ANDROID_PLAY_STORE_URL } from '../constants';
import screenHome from '../assets/images/screen-home.webp';
import screenInsights from '../assets/images/screen-insights.webp';
import screenWellbeing from '../assets/images/screen-wellbeing.webp';
import screenBuddy from '../assets/images/screen-buddy.webp';
import useDocumentMeta from '../hooks/useDocumentMeta';

const tagStyle = { background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 999, padding: '7px 14px', font: "600 12.5px 'Inter',sans-serif", color: 'var(--ink-2)' };

function FeatureRow({ eyebrow, title, body, tags, img, alt, reversed }) {
  const [ref, visible] = useReveal();
  const textBlock = (
    <div style={{ flex: '1 1 380px', minWidth: 0 }}>
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

const uniqueHighlights = [
  {
    badge: 'Only in Nura',
    title: 'Government schemes & benefits',
    body: 'Browse real Indian government health schemes (national + state) for reproductive and menstrual health, get an honest eligibility check, find your nearest government hospital, and track every application, without leaving the app. Almost no period app offers this.',
    icon: (
      <>
        <path d="M4 21h16M5 21V10.5L12 6l7 4.5V21M9 21v-6h6v6" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M12 6V3" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
      </>
    ),
  },
  {
    badge: 'Doctor-ready, automatically',
    title: 'AI-written health report',
    body: "Months of logs and documents, turned into a written summary a real doctor can actually use, not raw data they have to decode themselves in a five-minute appointment.",
    icon: (
      <>
        <path d="M9 3h6l1 4h-8l1-4ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M9.5 13.2l1.8 1.8L15 11" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    badge: 'Beyond "share my data"',
    title: 'Smart partner care suggestions',
    body: 'Partner Sync doesn’t just show a partner a phase label, it translates it into real guidance, like "she’s feeling anxious today, a calm evening would help", so caring about you doesn’t require guesswork.',
    icon: (
      <path d="M20.8 8.6c0 4.8-8.8 10.4-8.8 10.4S3.2 13.4 3.2 8.6a4.8 4.8 0 0 1 8.8-2.6 4.8 4.8 0 0 1 8.8 2.6Z" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" />
    ),
  },
];

const comparisonRows = [
  { them: 'Logs your period, guesses the next one', us: 'Same, plus predictions personalized to your own logged symptom history' },
  { them: 'A generic list of possible symptoms', us: 'A full, color-coded log covering flow, mood, sex, discharge, pregnancy tests, digestion, and more' },
  { them: 'Static articles about periods', us: 'A conversational AI you can actually ask, by voice or text, in real time' },
  { them: 'Data that stays trapped in the app', us: 'An AI-written, doctor-ready PDF report you can hand to a physician' },
  { them: 'No real medical help', us: 'Actual video consultations with real gynaecologists, booked in-app' },
  { them: '"Share with partner" is all-or-nothing', us: 'Switch-by-switch sharing, plus care advice a partner can actually act on' },
  { them: 'Habit tracking feels like a chore', us: 'A living, growing tree that makes consistency feel rewarding' },
  { them: 'No connection to real-world help', us: 'Direct guidance to real government health schemes you may qualify for' },
];

const moreFeatures = [
  {
    title: 'Health documents & AI intelligence',
    body: 'Store lab results, prescriptions, and scans securely. Nura summarizes them and flags abnormal values automatically.',
    bg: 'var(--amber-tint)',
    icon: <path d="M4 19V6a2 2 0 0 1 2-2h11l3 3v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" stroke="var(--amber)" strokeWidth="1.7" strokeLinejoin="round" />,
  },
  {
    title: 'Voice check-in calls',
    body: 'A real outbound phone call from Nura, on demand or on a schedule tied to your cycle, that checks in and logs what you tell it.',
    bg: 'var(--teal-tint)',
    icon: <path d="M6.5 3.5c1 0 2.6 2.2 2.6 3.4 0 1-1.4 1.7-1.4 2.6 0 1.8 3 4.8 4.8 4.8.9 0 1.6-1.4 2.6-1.4 1.2 0 3.4 1.6 3.4 2.6 0 1.6-1.9 3-3.4 3-5 0-11-6-11-11 0-1.5 1.4-3.4 3-3.4Z" stroke="var(--teal)" strokeWidth="1.7" strokeLinejoin="round" />,
  },
  {
    title: 'Reminders & daily notifications',
    body: 'Customizable period, ovulation, and fertility-window reminders, plus a gentle nudge to log if a day slips by unlogged.',
    bg: 'var(--brand-tint)',
    icon: <path d="M12 3a6 6 0 0 0-6 6v3.5L4 16h16l-2-3.5V9a6 6 0 0 0-6-6ZM10 19a2 2 0 0 0 4 0" stroke="var(--brand-dark)" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" />,
  },
  {
    title: 'Symptom checker & early screening',
    body: 'A guided questionnaire that flags possible signs of PCOS, endometriosis, fibroids, or thyroid issues early, and keeps a history of past check-ins.',
    bg: 'var(--brand-tint)',
    icon: (
      <>
        <path d="M9 3h6l1 4h-8l1-4ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" stroke="var(--brand-dark)" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M9.5 13.2l1.8 1.8L15 11" stroke="var(--brand-dark)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: 'Personalized symptom predictions',
    body: '"You’re likely to get headaches around day 3" — likelihood by cycle phase, calculated from your own history, not a generic chart.',
    bg: 'var(--teal-tint)',
    icon: <path d="M4 18l5-6 4 3 7-9M20 4h-4M20 4v4" stroke="var(--teal)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: 'Graphs & Reports dashboard',
    body: 'A visual dashboard of cycle length, weight, temperature, water intake, and sleep trends over time, plus a ranked symptom report.',
    bg: 'var(--amber-tint)',
    icon: <path d="M5 21V10M12 21V4M19 21v-7" stroke="var(--amber)" strokeWidth="1.7" strokeLinecap="round" />,
  },
  {
    title: 'Blogs & short-form video library',
    body: 'Categorized, easy-to-read articles and bite-sized educational videos on periods, hygiene, and wellness.',
    bg: 'var(--teal-tint)',
    icon: <path d="M6 4l14 8-14 8V4Z" stroke="var(--teal)" strokeWidth="1.7" strokeLinejoin="round" />,
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
  useDocumentMeta('Features | Nura', 'Cycle tracking and AI predictions, an AI health assistant, gynaecologist consultations, report chat, Partner Sync, and more, all in one private app.');

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

      {/* ONLY IN NURA — flagship differentiators */}
      <div className="container" style={{ padding: '52px 32px 12px' }}>
        <div style={{ background: 'var(--surface-dark)', borderRadius: 'var(--radius-lg)', padding: '48px 36px' }}>
          <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 40px' }}>
            <div className="eyebrow" style={{ marginBottom: 16, color: '#EFC97A' }}>Why Nura is different</div>
            <h2 style={{ font: "800 28px/1.3 'Manrope',sans-serif", color: '#fff', margin: '0 0 12px', letterSpacing: '-0.01em' }}>
              Not just another period tracker
            </h2>
            <p style={{ font: "500 15px/1.6 'Inter',sans-serif", color: 'rgba(255,255,255,0.65)', margin: 0 }}>
              These three don’t show up in most period apps at all, and every one of them, along with your predictions, insights, and AI chat, draws on the same personalization engine built from your own logged history.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20 }}>
            {uniqueHighlights.map((f) => (
              <div key={f.title} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: 26, flex: '0 1 300px', maxWidth: 340 }}>
                <span style={{ display: 'inline-block', font: "700 11px 'Inter',sans-serif", color: '#221A3D', background: '#EFC97A', borderRadius: 999, padding: '4px 11px', marginBottom: 16 }}>
                  {f.badge}
                </span>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">{f.icon}</svg>
                </div>
                <h3 style={{ font: "700 16.5px 'Manrope',sans-serif", color: '#fff', margin: '0 0 8px' }}>{f.title}</h3>
                <p style={{ font: "500 13.5px/1.65 'Inter',sans-serif", color: 'rgba(255,255,255,0.7)', margin: 0 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
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

      {/* COMPARISON TABLE */}
      <div className="container" style={{ padding: '24px 32px 8px' }}>
        <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 36px' }}>
          <h2 style={{ font: "800 28px/1.3 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 12px', letterSpacing: '-0.01em' }}>
            What people expect vs. what Nura adds
          </h2>
          <p style={{ font: "500 15px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', margin: 0 }}>
            Other apps track what’s happening to you. Nura tracks that too, then does something about it.
          </p>
        </div>
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', padding: '14px 24px', background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}>
            <div style={{ flex: '1 1 0', font: "700 12.5px 'Inter',sans-serif", color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>A typical period app</div>
            <div style={{ flex: '1 1 0', font: "700 12.5px 'Inter',sans-serif", color: 'var(--brand-dark)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>What Nura adds</div>
          </div>
          {comparisonRows.map((r, i) => (
            <div
              key={r.them}
              style={{
                display: 'flex',
                gap: 16,
                padding: '18px 24px',
                borderBottom: i === comparisonRows.length - 1 ? 'none' : '1px solid var(--line)',
              }}
            >
              <div style={{ flex: '1 1 0', font: "500 14px/1.6 'Inter',sans-serif", color: 'var(--ink-3)' }}>{r.them}</div>
              <div style={{ flex: '1 1 0', display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
                  <path d="M4 12.5L9.5 18L20 6" stroke="var(--teal)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ font: "600 14px/1.6 'Inter',sans-serif", color: 'var(--ink)' }}>{r.us}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GRID OF REMAINING FEATURES */}
      <div ref={refGrid} className={`reveal ${inGrid ? 'in' : ''} container`} style={{ padding: '80px 32px' }}>
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 44px' }}>
          <h2 style={{ font: "800 30px/1.25 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 12px', letterSpacing: '-0.01em' }}>And a lot more, built in</h2>
          <p style={{ font: "500 15.5px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', margin: 0 }}>
            Nura is a full platform, not a single feature. Here's what else comes with it.
          </p>
        </div>
        <div className="more-features-grid">
          {moreFeatures.map((f) => (
            <div key={f.title} style={{ display: 'flex', gap: 14, padding: '22px 0', borderTop: '1px solid var(--line)' }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">{f.icon}</svg>
              </div>
              <div>
                <h3 style={{ font: "700 14px 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 4px' }}>{f.title}</h3>
                <p style={{ font: "500 12.5px/1.55 'Inter',sans-serif", color: 'var(--ink-3)', margin: 0 }}>{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div ref={refCta} className={`reveal ${inCta ? 'in' : ''}`} style={{ background: 'var(--surface-dark)', padding: '76px 32px', textAlign: 'center' }}>
        <h2 style={{ font: "800 30px/1.25 'Manrope',sans-serif", color: '#fff', margin: '0 0 12px', letterSpacing: '-0.01em' }}>Ready to feel supported?</h2>
        <p style={{ font: "500 14.5px/1.6 'Inter',sans-serif", color: 'rgba(255,255,255,0.6)', margin: '0 0 28px' }}>
          Core tracking, predictions, and daily insights are free, always. A handful of deeper features unlock individually as you need them. <Link to="/pricing" style={{ color: '#fff', textDecoration: 'underline' }}>See pricing →</Link>
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

      <Footer />
    </div>
  );
}
