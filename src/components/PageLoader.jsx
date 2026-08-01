import Logo from './Logo';

export default function PageLoader() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        background: 'var(--bg)',
        zIndex: 999,
      }}
    >
      <div style={{ position: 'relative', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', animation: 'nura-spin 0.9s linear infinite' }}>
          <circle cx="12" cy="12" r="9.5" stroke="var(--line)" strokeWidth="2" />
          <circle cx="12" cy="12" r="9.5" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeDasharray="16 100" />
        </svg>
        <Logo size={22} />
      </div>
    </div>
  );
}
