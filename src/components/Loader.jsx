export default function Loader({ size = 18, color = '#fff', trackColor = 'rgba(255,255,255,0.35)' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: 'nura-spin 0.8s linear infinite', flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="9" stroke={trackColor} strokeWidth="2.6" />
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeDasharray="14 100" />
    </svg>
  );
}
