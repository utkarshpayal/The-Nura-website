import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import useReveal from '../hooks/useReveal';
import { ANDROID_APK_URL } from '../constants';
import { GooglePlayButton, AppStoreButton } from 'react-mobile-app-button';
import PhoneFrame from '../components/PhoneFrame';
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
          Free · No ads · Private
        </div>
        <h1 style={{ font: "800 40px/1.2 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
          Get Nura on your phone
        </h1>
        <p style={{ font: "500 16px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', margin: '0 0 32px' }}>
          Android is available now as a direct download. iOS is coming soon.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 14, marginBottom: 12 }}>
          <GooglePlayButton
            url={ANDROID_APK_URL}
            theme="dark"
            title="Download for"
            width={210}
            height={58}
            className="store-badge store-badge--dark"
          />
          <AppStoreButton
            url="#"
            theme="light"
            title="Coming soon on"
            width={210}
            height={58}
            className="store-badge store-badge--disabled"
          />
        </div>
        <p style={{ font: "500 12.5px 'Inter',sans-serif", color: 'var(--ink-4)', margin: '0 0 28px' }}>
          Direct APK download. Android may ask you to allow installs from this source.
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
                <PhoneFrame src={s.src} alt={s.alt} width={180} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SYSTEM REQS */}
      <div ref={refReqs} className={`reveal ${inReqs ? 'in' : ''} container`} style={{ maxWidth: 860, padding: '64px 32px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
          <div>
            <div style={{ font: "800 20px 'Manrope',sans-serif", color: 'var(--ink)' }}>Android 10+</div>
            <div style={{ font: "600 12.5px 'Inter',sans-serif", color: 'var(--ink-4)', marginTop: 4 }}>Phone &amp; tablet · available now</div>
          </div>
          <div>
            <div style={{ font: "800 20px 'Manrope',sans-serif", color: 'var(--ink)' }}>iOS 16+</div>
            <div style={{ font: "600 12.5px 'Inter',sans-serif", color: 'var(--ink-4)', marginTop: 4 }}>iPhone &amp; iPad · coming soon</div>
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
