import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <>
      <Nav />
      <div
        className="container"
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 18,
          padding: '80px 20px',
        }}
      >
        <p style={{ font: "800 64px 'Manrope',sans-serif", color: 'var(--brand)', margin: 0 }}>404</p>
        <h1 style={{ font: "700 24px 'Manrope',sans-serif", color: 'var(--ink)', margin: 0 }}>
          This page wandered off
        </h1>
        <p style={{ font: "500 15px/1.7 'Inter',sans-serif", color: 'var(--ink-4)', maxWidth: 420, margin: 0 }}>
          The link may be broken or the page may have moved. Let&apos;s get you back on track.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 6 }}>
          <Link to="/" className="btn btn-brand">Back to home</Link>
          <Link to="/contact" className="btn btn-secondary">Contact support</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
