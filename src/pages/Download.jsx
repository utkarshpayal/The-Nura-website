import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import useReveal from '../hooks/useReveal';
import { ANDROID_APK_URL } from '../constants';
import screenHome from '../assets/images/screen-home.png';
import screenInsights from '../assets/images/screen-insights.png';
import screenWellbeing from '../assets/images/screen-wellbeing.png';
import screenApplock from '../assets/images/screen-applock.png';

const screenshots = [
  { id: 'dl-home', src: screenHome, alt: 'Cycle dashboard' },
  { id: 'dl-insights', src: screenInsights, alt: 'AI health insights' },
  { id: 'dl-wellbeing', src: screenWellbeing, alt: 'Wellbeing and Forest' },
  { id: 'dl-applock', src: screenApplock, alt: 'Biometric app lock' },
];

export default function Download() {
  const [refScreens, inScreens] = useReveal();
  const [refReqs, inReqs] = useReveal();

  return (
    <div className="page">
      <Nav />

      {/* HERO */}
      <div id="get" className="container" style={{ maxWidth: 760, padding: '76px 32px 40px', textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>
          <span className="eyebrow-dot" />
          Free · No ads · Private
        </div>
        <h1 style={{ font: "800 40px/1.2 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
          Get Nura on your phone
        </h1>
        <p style={{ font: "500 16px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', margin: '0 0 32px' }}>
          Android is available now as a direct download. iOS is coming soon.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
          <a href={ANDROID_APK_URL} className="btn btn-primary" style={{ padding: '15px 24px' }}>
            <svg width="19" height="19" viewBox="0 0 24 24">
              <path d="M4 3.5C3.6 3.9 3.4 4.5 3.4 5.2V18.8C3.4 19.5 3.6 20.1 4 20.5L4.1 20.6L12.2 12.5V12.3L4.1 4.2L4 3.5Z" fill="#4CB5F5" />
              <path d="M15 15.3L12.2 12.5V12.3L15 9.5L15.1 9.6L18.4 11.5C19.4 12.1 19.4 13 18.4 13.6L15.1 15.5L15 15.3Z" fill="#F5CB40" />
              <path d="M15.1 15.4L12.2 12.5L4 20.7C4.4 21.1 4.9 21.1 5.6 20.8L15.1 15.4Z" fill="#EA4C3C" />
              <path d="M15.1 9.6L5.6 4.2C4.9 3.8 4.4 3.9 4 4.3L12.2 12.5L15.1 9.6Z" fill="#3CBA65" />
            </svg>
            <span>Download for<br /><b style={{ fontSize: 14.5 }}>Android (APK)</b></span>
          </a>
          <span
            className="btn"
            style={{ padding: '15px 24px', background: 'var(--line-2)', color: 'var(--ink-4)', cursor: 'default', boxShadow: 'none' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--ink-4)"><path d="M17.05 12.5c-.03-2.4 1.96-3.55 2.05-3.6-1.12-1.63-2.86-1.85-3.48-1.88-1.48-.15-2.9.87-3.65.87-.75 0-1.9-.85-3.13-.83-1.6.02-3.1.94-3.92 2.37-1.68 2.9-.43 7.2 1.2 9.55.8 1.15 1.76 2.43 3 2.38 1.2-.05 1.66-.77 3.11-.77 1.45 0 1.86.77 3.13.75 1.3-.02 2.12-1.16 2.9-2.32.92-1.33 1.3-2.62 1.32-2.68-.03-.01-2.53-.97-2.56-3.84Z" /><path d="M14.7 5.3c.66-.8 1.1-1.9 1-3-.94.04-2.1.63-2.78 1.42-.6.7-1.14 1.83-1 2.9 1.06.08 2.13-.53 2.78-1.32Z" /></svg>
            <span>App Store<br /><b style={{ fontSize: 14.5 }}>Coming soon</b></span>
          </span>
        </div>
        <p style={{ font: "500 12.5px 'Inter',sans-serif", color: 'var(--ink-4)', margin: '0 0 28px' }}>
          Direct APK download — Android may ask you to allow installs from this source.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="card" style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <svg width="88" height="88" viewBox="0 0 100 100">
              <rect width="100" height="100" fill="#fff" />
              <g fill="var(--ink)">
                <rect x="6" y="6" width="24" height="24" /><rect x="70" y="6" width="24" height="24" /><rect x="6" y="70" width="24" height="24" />
                <rect x="12" y="12" width="12" height="12" fill="#fff" /><rect x="76" y="12" width="12" height="12" fill="#fff" /><rect x="12" y="76" width="12" height="12" fill="#fff" />
                <rect x="38" y="6" width="6" height="6" /><rect x="50" y="6" width="6" height="12" /><rect x="38" y="20" width="12" height="6" /><rect x="58" y="20" width="6" height="6" />
                <rect x="38" y="38" width="6" height="6" /><rect x="50" y="38" width="12" height="6" /><rect x="70" y="38" width="6" height="12" /><rect x="82" y="38" width="12" height="6" />
                <rect x="38" y="50" width="6" height="18" /><rect x="52" y="50" width="6" height="6" /><rect x="64" y="50" width="6" height="6" /><rect x="76" y="52" width="18" height="6" />
                <rect x="38" y="76" width="6" height="6" /><rect x="50" y="70" width="18" height="6" /><rect x="70" y="76" width="6" height="12" /><rect x="82" y="82" width="12" height="6" /><rect x="50" y="82" width="12" height="6" />
              </g>
            </svg>
            <span style={{ font: "600 11.5px 'Inter',sans-serif", color: 'var(--ink-3)' }}>Scan to download</span>
          </div>
        </div>
      </div>

      {/* SCREENS */}
      <div ref={refScreens} className={`reveal ${inScreens ? 'in' : ''}`} style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '76px 32px' }}>
        <div className="container">
          <h2 style={{ font: "800 26px/1.25 'Manrope',sans-serif", color: 'var(--ink)', textAlign: 'center', margin: '0 0 40px', letterSpacing: '-0.01em' }}>See what you'll get</h2>
          <div style={{ display: 'flex', gap: 22, justifyContent: 'center', flexWrap: 'wrap' }}>
            {screenshots.map((s) => (
              <div key={s.id} style={{ width: 180 }}>
                <div style={{ borderRadius: 24, background: '#17151F', padding: 7, boxShadow: 'var(--shadow-md)' }}>
                  <img src={s.src} alt={s.alt} style={{ width: '100%', display: 'block', borderRadius: 18 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SYSTEM REQS */}
      <div ref={refReqs} className={`reveal ${inReqs ? 'in' : ''} container`} style={{ maxWidth: 860, padding: '64px 32px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
          <div>
            <div style={{ font: "800 20px 'Manrope',sans-serif", color: 'var(--ink)' }}>iOS 16+</div>
            <div style={{ font: "600 12.5px 'Inter',sans-serif", color: 'var(--ink-4)', marginTop: 4 }}>iPhone &amp; iPad</div>
          </div>
          <div>
            <div style={{ font: "800 20px 'Manrope',sans-serif", color: 'var(--ink)' }}>Android 10+</div>
            <div style={{ font: "600 12.5px 'Inter',sans-serif", color: 'var(--ink-4)', marginTop: 4 }}>Phone &amp; tablet</div>
          </div>
          <div>
            <div style={{ font: "800 20px 'Manrope',sans-serif", color: 'var(--ink)' }}>Free</div>
            <div style={{ font: "600 12.5px 'Inter',sans-serif", color: 'var(--ink-4)', marginTop: 4 }}>Core app, always free</div>
          </div>
        </div>
      </div>

      <Newsletter title="Not ready yet? Get cycle tips instead" subtitle="One thoughtful email a month. No spam, unsubscribe anytime." padding="64px 32px 96px" />

      <Footer />
    </div>
  );
}
