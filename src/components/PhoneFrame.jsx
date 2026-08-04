export default function PhoneFrame({ src, alt, width = 220, radius, className = '', style = {} }) {
  const outerRadius = radius || Math.round(width * 0.165);
  const padding = Math.round(width * 0.012);
  const innerRadius = Math.max(outerRadius - padding, 0);

  return (
    <div
      className={`phone-frame ${className}`}
      style={{
        width,
        aspectRatio: '816 / 1724',
        borderRadius: outerRadius,
        padding,
        boxSizing: 'border-box',
        overflow: 'hidden',
        ...style,
      }}
    >
      <img src={src} alt={alt} className="phone-frame__screen" style={{ borderRadius: innerRadius }} />
    </div>
  );
}
