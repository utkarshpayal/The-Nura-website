import SoftGlow from './SoftGlow';

export default function PageHero({ eyebrow, title, subtitle, max = 720, glow = false }) {
  const content = (
    <div className="container" style={{ position: glow ? 'relative' : 'static', zIndex: 1, maxWidth: max, padding: '76px 32px 8px', textAlign: 'center' }}>
      {eyebrow && (
        <div className="eyebrow" style={{ marginBottom: 20 }}>
          {eyebrow}
        </div>
      )}
      <h1 style={{ font: "800 40px/1.2 'Manrope',sans-serif", color: 'var(--ink)', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ font: "500 16px/1.6 'Inter',sans-serif", color: 'var(--ink-3)', margin: 0 }}>{subtitle}</p>
      )}
    </div>
  );

  if (!glow) return content;

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <SoftGlow />
      {content}
    </div>
  );
}
