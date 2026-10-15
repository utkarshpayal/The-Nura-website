import { useState } from 'react';
import { imageSrcSet, sizedImage, topicMeta } from '../../lib/blog';

// Cover image with a branded fallback: a CMS post can have no cover, or one
// whose URL has gone stale, and a broken-image icon looks worse than a calm
// topic-colored tile. Pass `ratio={null}` to let a CSS class set the shape
// (e.g. a different ratio on mobile).
export default function BlogCover({
  src,
  alt = '',
  topic,
  ratio = '16 / 10',
  radius = 'var(--radius-md)',
  sizes = '(min-width: 1000px) 360px, (min-width: 640px) 50vw, 100vw',
  eager = false,
  className = '',
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const meta = topicMeta(topic);
  const showImage = src && !failed;

  return (
    <div
      className={`blog-cover ${loaded ? 'is-loaded' : ''} ${className}`}
      style={{ aspectRatio: ratio || undefined, borderRadius: radius, background: meta.tint }}
    >
      {showImage ? (
        <img
          src={sizedImage(src, 800)}
          srcSet={imageSrcSet(src)}
          sizes={sizes}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : undefined}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="blog-cover__fallback" aria-hidden="true">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21s-7.5-4.6-7.5-10.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 16.4 12 21 12 21Z"
              stroke={meta.color}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
