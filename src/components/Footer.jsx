import { Link } from 'react-router-dom';
import Logo from './Logo';

const linkStyle = { font: 'var(--t-body-sm)', color: 'var(--ink-3)' };
const headingStyle = { font: 'var(--t-micro)', color: 'var(--ink)', marginBottom: 16, letterSpacing: '0.04em', textTransform: 'uppercase' };

export default function Footer() {
  return (
    <div style={{ borderTop: '1px solid var(--line)', background: 'var(--surface)' }}>
      <div className="container" style={{ padding: '64px 32px 32px', display: 'flex', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 260px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Logo size={28} />
            <span style={{ font: "600 20px/1 var(--font-display)", letterSpacing: '-0.02em', color: 'var(--ink)' }}>Nura</span>
          </div>
          <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', maxWidth: 300, margin: 0 }}>
            An AI-powered women's health platform for cycle tracking, medical guidance, and everyday wellbeing.
          </p>
          <a href="mailto:hello@thenura.care" style={{ display: 'inline-block', marginTop: 16, font: 'var(--t-label-sm)' }}>hello@thenura.care</a>
        </div>
        <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
          <div>
            <div style={headingStyle}>Product</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to="/features" style={linkStyle}>Features</Link>
              <Link to="/diagnostics" style={linkStyle}>Diagnostics</Link>
              <Link to="/pricing" style={linkStyle}>Pricing</Link>
              <Link to="/privacy" style={linkStyle}>Privacy</Link>
              <Link to="/security" style={linkStyle}>Security</Link>
              <Link to="/download" style={linkStyle}>Download</Link>
            </div>
          </div>
          <div>
            <div style={headingStyle}>Company</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to="/about" style={linkStyle}>About</Link>
              <Link to="/team" style={linkStyle}>Our team</Link>
              <Link to="/blog" style={linkStyle}>Blog</Link>
              <Link to="/careers" style={linkStyle}>Careers</Link>
              <Link to="/faq" style={linkStyle}>FAQ</Link>
              <Link to="/contact" style={linkStyle}>Contact</Link>
            </div>
          </div>
          <div>
            <div style={headingStyle}>Legal</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to="/privacy" style={linkStyle}>Privacy Policy</Link>
              <Link to="/terms" style={linkStyle}>Terms of Service</Link>
              <Link to="/data-protection" style={linkStyle}>Data Protection</Link>
              <Link to="/security" style={linkStyle}>Security & Safety</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ padding: '20px 32px 32px', borderTop: '1px solid var(--line-2)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ font: 'var(--t-caption)', color: 'var(--ink-4)' }}>© 2026 The Nura Care</span>
        <span style={{ font: 'var(--t-caption)', color: 'var(--ink-4)', maxWidth: 560 }}>Nura provides health information, not a diagnosis, and is not a substitute for professional medical advice. In an emergency, contact your local emergency services.</span>
      </div>
    </div>
  );
}
