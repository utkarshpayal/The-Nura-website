import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import useReveal from '../hooks/useReveal';
import { ANDROID_PLAY_STORE_URL } from '../constants';
import { GooglePlayButton, AppStoreButton } from 'react-mobile-app-button';
import { QRCodeSVG } from 'qrcode.react';
import PhoneFrame from '../components/PhoneFrame';
import screenHome from '../assets/images/screens/screen-home.webp';
import screenInsights from '../assets/images/screens/screen-insights.webp';
import screenWellbeing from '../assets/images/screens/screen-wellbeing.webp';
import screenApplock from '../assets/images/screens/screen-applock.webp';
import usePageSeo from '../hooks/usePageSeo';

const screenshots = [
  { id: 'dl-home', src: screenHome, alt: 'Cycle dashboard' },
  { id: 'dl-insights', src: screenInsights, alt: 'AI health insights' },
  { id: 'dl-wellbeing', src: screenWellbeing, alt: 'Wellbeing and Forest' },
  { id: 'dl-applock', src: screenApplock, alt: 'Biometric app lock' },
];

export default function Download() {
  usePageSeo('/download');

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
        <h1 style={{ font: 'var(--t-h1)', color: 'var(--ink)', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
          Get Nura on your phone
        </h1>
        <p style={{ font: 'var(--t-body)', color: 'var(--ink-3)', margin: '0 0 32px' }}>
          Android is available now on Google Play. iOS is coming soon.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 14, marginBottom: 12 }}>
          <GooglePlayButton
            url={ANDROID_PLAY_STORE_URL}
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
        <p style={{ font: 'var(--t-caption)', color: 'var(--ink-4)', margin: '0 0 28px' }}>
          Available on the Google Play Store for Android 10 and above.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="card" style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <QRCodeSVG
              value={ANDROID_PLAY_STORE_URL}
              size={112}
              level="M"
              marginSize={2}
              fgColor="#1E1823"
              bgColor="#FFFFFF"
              title="QR code: Nura on Google Play"
            />
            <span style={{ font: 'var(--t-micro)', color: 'var(--ink-3)' }}>Scan to get it on Google Play</span>
          </div>
        </div>
      </div>

      {/* SCREENS */}
      <div ref={refScreens} className={`reveal ${inScreens ? 'in' : ''}`} style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '76px 32px' }}>
        <div className="container">
          <h2 style={{ font: 'var(--t-h3)', color: 'var(--ink)', textAlign: 'center', margin: '0 0 40px', letterSpacing: '-0.01em' }}>See what you'll get</h2>
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
            <div style={{ font: 'var(--t-h4)', color: 'var(--ink)' }}>Android 10+</div>
            <div style={{ font: 'var(--t-label-sm)', color: 'var(--ink-4)', marginTop: 4 }}>Phone &amp; tablet · available now</div>
          </div>
          <div>
            <div style={{ font: 'var(--t-h4)', color: 'var(--ink)' }}>iOS 16+</div>
            <div style={{ font: 'var(--t-label-sm)', color: 'var(--ink-4)', marginTop: 4 }}>iPhone &amp; iPad · coming soon</div>
          </div>
          <div>
            <div style={{ font: 'var(--t-h4)', color: 'var(--ink)' }}>Free</div>
            <div style={{ font: 'var(--t-label-sm)', color: 'var(--ink-4)', marginTop: 4 }}>Core app, always free</div>
          </div>
        </div>
      </div>

      <Newsletter title="Not ready yet? Get cycle tips instead" subtitle="One thoughtful email a month. No spam, unsubscribe anytime." padding="64px 32px 96px" />

      <Footer />
    </div>
  );
}
