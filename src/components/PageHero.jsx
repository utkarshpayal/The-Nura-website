export default function PageHero({ eyebrow, title, subtitle, max = 720 }) {
  return (
    <div className="container" style={{ maxWidth: max, padding: '76px 32px 8px', textAlign: 'center' }}>
      {eyebrow && (
        <div className="eyebrow" style={{ marginBottom: 14 }}>
          {eyebrow}
        </div>
      )}
      <h1 style={{ font: 'var(--t-h1)', color: 'var(--ink)', margin: '0 0 18px' }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ font: 'var(--t-lead)', color: 'var(--ink-3)', margin: '0 auto', maxWidth: 620 }}>{subtitle}</p>
      )}
    </div>
  );
}
