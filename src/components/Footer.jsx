import { Link } from 'react-router-dom';
import Logo from './Logo';

const linkStyle = { font: "500 14px 'Inter',sans-serif", color: 'var(--ink-3)' };
const headingStyle = { font: "700 12px 'Inter',sans-serif", color: 'var(--ink)', marginBottom: 16, letterSpacing: '0.04em', textTransform: 'uppercase' };

export default function Footer() {
  return (
    <div style={{ borderTop: '1px solid var(--line)', background: 'var(--surface)' }}>
      <div className="container" style={{ padding: '64px 32px 32px', display: 'flex', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 260px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Logo size={28} />
            <span style={{ font: "800 16px 'Manrope',sans-serif", color: 'var(--ink)' }}>Nura</span>
          </div>
          <p style={{ font: "500 14px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', maxWidth: 300, margin: 0 }}>
            An AI-powered women's health platform for cycle tracking, medical guidance, and everyday wellbeing.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
          <div>
            <div style={headingStyle}>Product</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to="/features" style={linkStyle}>Features</Link>
              <Link to="/pricing" style={linkStyle}>Pricing</Link>
              <Link to="/privacy" style={linkStyle}>Privacy</Link>
              <Link to="/download" style={linkStyle}>Download</Link>
            </div>
          </div>
          <div>
            <div style={headingStyle}>Company</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to="/about" style={linkStyle}>About</Link>
              <Link to="/careers" style={linkStyle}>Careers</Link>
              <Link to="/contact" style={linkStyle}>Contact</Link>
            </div>
          </div>
          <div>
            <div style={headingStyle}>Legal</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to="/privacy" style={linkStyle}>Privacy Policy</Link>
              <Link to="/terms" style={linkStyle}>Terms of Service</Link>
              <Link to="/hipaa" style={linkStyle}>HIPAA Notice</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ padding: '20px 32px 32px', borderTop: '1px solid var(--line-2)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ font: "500 13px 'Inter',sans-serif", color: 'var(--ink-4)' }}>© 2026 The Nura Care</span>
        <span style={{ font: "500 13px 'Inter',sans-serif", color: 'var(--ink-4)' }}>Not a substitute for professional medical advice.</span>
      </div>
    </div>
  );
}
