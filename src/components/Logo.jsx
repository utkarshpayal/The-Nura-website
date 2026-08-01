import logo from '../assets/logo.png';

export default function Logo({ size = 32 }) {
  return (
    <img
      src={logo}
      alt="Nura"
      width={size}
      height={size}
      style={{ display: 'block', objectFit: 'contain', flexShrink: 0 }}
    />
  );
}
