// A quiet, static gradient wash behind a hero/section — no motion, no
// graphics, just a soft tint of brand color fading into the page. Render
// inside a `position: relative; overflow: hidden` parent so it stays
// clipped to that section. Purely decorative (aria-hidden, non-interactive).
export default function SoftGlow({ dark = false }) {
  return <div className={`soft-glow${dark ? ' soft-glow--dark' : ''}`} aria-hidden="true" />;
}
