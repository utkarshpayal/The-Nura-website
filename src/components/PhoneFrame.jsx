// The screenshots (816×1724) come with a device bezel baked in, but it isn't
// consistent: the Wellbeing shot has no bottom bezel, and the Home shot's
// tab bar is drawn over the bottom corners. So the baked-in bezel is cropped
// away (16px left/top, 20px right/bottom, measured from the images) and the
// frame draws its own, uniform on every side and corner: outer radius =
// screen radius + bezel thickness.
const IMG_W = 816;
const IMG_H = 1724;
const CROP = { top: 16, right: 20, bottom: 20, left: 16 };
const SCREEN_W = IMG_W - CROP.left - CROP.right;
const SCREEN_H = IMG_H - CROP.top - CROP.bottom;
const pct = (px) => `${(px / SCREEN_W) * 100}%`;

// Screenshots are below the fold everywhere except the Home hero, so they
// lazy-load by default; pass loading="eager" for an above-the-fold image.
export default function PhoneFrame({ src, alt, width = 220, className = '', style = {}, loading = 'lazy' }) {
  const bezel = Math.max(Math.round(width * 0.02), 4);
  const screenRadius = Math.round(width * 0.1);

  return (
    <div
      className={`phone-frame ${className}`}
      style={{ width, padding: bezel, borderRadius: screenRadius + bezel, ...style }}
    >
      <div className="phone-frame__screen" style={{ aspectRatio: `${SCREEN_W} / ${SCREEN_H}`, borderRadius: screenRadius }}>
        <img
          src={src}
          alt={alt}
          width={IMG_W}
          height={IMG_H}
          loading={loading}
          decoding="async"
          style={{ display: 'block', width: pct(IMG_W), maxWidth: 'none', height: 'auto', margin: `-${pct(CROP.top)} 0 0 -${pct(CROP.left)}` }}
        />
      </div>
    </div>
  );
}
