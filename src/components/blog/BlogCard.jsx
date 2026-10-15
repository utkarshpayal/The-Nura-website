import { Link } from 'react-router-dom';
import BlogCover from './BlogCover';
import TopicTag from './TopicTag';
import SaveButton from './SaveButton';
import { formatDate, isNew, readTime } from '../../lib/blog';
import { prefetchBlog } from '../../lib/api';
import { READ_THRESHOLD, useReader } from '../../lib/readerStore';

/** "Read" once finished, otherwise the usual date + reading time. */
function Meta({ post, pct }) {
  const done = pct >= READ_THRESHOLD;
  return (
    <div style={{ font: 'var(--t-caption)', color: 'var(--ink-4)', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
      {done && (
        <span className="read-mark">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 12.5L9.5 18L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Read
        </span>
      )}
      <span>
        {formatDate(post.publishedAt)} · {readTime(post.readTimeMinutes)}
      </span>
    </div>
  );
}

function Media({ post, pct, eager, ratio, radius, sizes, save }) {
  const inProgress = pct > 0.05 && pct < READ_THRESHOLD;
  return (
    <div className="blog-card__media">
      <BlogCover src={post.coverImageUrl} topic={post.category} ratio={ratio} radius={radius} sizes={sizes} eager={eager} />
      {isNew(post.publishedAt) && <span className="badge-new">New</span>}
      {save && <SaveButton post={post} className="blog-card__save" />}
      {inProgress && (
        <div className="card-progress" role="img" aria-label={`${Math.round(pct * 100)}% read`}>
          <div style={{ width: `${Math.round(pct * 100)}%` }} />
        </div>
      )}
    </div>
  );
}

/**
 * Article card in three layouts:
 *  - default: cover on top, used in grids
 *  - featured: big cover beside the copy, the lead story on /blog
 *  - compact: small thumbnail beside the title, for side lists
 *
 * The title link is stretched over the whole card (see .blog-card__link),
 * which keeps the card one big click target while still letting the save
 * button sit on top of it as a separate, valid control.
 */
export default function BlogCard({ post, variant = 'default', eager = false, highlight }) {
  const pct = useReader((s) => s.progress[post.slug]?.pct || 0);
  const to = `/blog/${post.slug}`;
  // Start loading the article as soon as the reader shows intent, so it's
  // usually ready by the time the click lands.
  const prefetch = () => prefetchBlog(post.slug);
  const link = (
    <Link to={to} className="blog-card__link" onMouseEnter={prefetch} onFocus={prefetch} onTouchStart={prefetch}>
      {highlight ? highlight(post.title) : post.title}
    </Link>
  );

  if (variant === 'featured') {
    return (
      <article className="blog-card blog-card--featured">
        <Media
          post={post}
          pct={pct}
          eager={eager}
          ratio="16 / 10"
          radius="var(--radius-lg)"
          sizes="(min-width: 1080px) 560px, (min-width: 760px) 55vw, 100vw"
          save
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}>
          <TopicTag topic={post.category} />
          <h2 className="blog-card__title" style={{ font: 'var(--t-h2)', margin: 0 }}>
            {link}
          </h2>
          {post.excerpt && (
            <p className="blog-clamp-3" style={{ font: 'var(--t-lead)', color: 'var(--ink-3)', margin: 0 }}>
              {post.excerpt}
            </p>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="blog-avatar" aria-hidden="true">{(post.author || 'N').trim().charAt(0)}</span>
            <div>
              <div style={{ font: 'var(--t-label-sm)', color: 'var(--ink-2)' }}>{post.author}</div>
              <Meta post={post} pct={pct} />
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="blog-card blog-card--compact">
        <Media post={post} pct={pct} ratio="1 / 1" radius="var(--radius-sm)" sizes="152px" />
        <div style={{ minWidth: 0 }}>
          <h3 className="blog-card__title blog-clamp-2" style={{ font: 'var(--t-title-sm)', margin: '0 0 4px' }}>
            {link}
          </h3>
          <Meta post={post} pct={pct} />
        </div>
      </article>
    );
  }

  return (
    <article className="blog-card">
      <Media post={post} pct={pct} eager={eager} save />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 16 }}>
        <TopicTag topic={post.category} />
        <h3 className="blog-card__title blog-clamp-2" style={{ font: 'var(--t-title)', margin: 0 }}>
          {link}
        </h3>
        {post.excerpt && (
          <p className="blog-clamp-2" style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: 0 }}>
            {post.excerpt}
          </p>
        )}
        <Meta post={post} pct={pct} />
      </div>
    </article>
  );
}

export function BlogCardSkeleton({ variant = 'default' }) {
  if (variant === 'featured') {
    return (
      <div className="blog-card--featured" aria-hidden="true">
        <div className="skeleton" style={{ aspectRatio: '16 / 10', borderRadius: 'var(--radius-lg)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}>
          <div className="skeleton" style={{ width: 110, height: 24, borderRadius: 999 }} />
          <div className="skeleton" style={{ width: '90%', height: 36 }} />
          <div className="skeleton" style={{ width: '70%', height: 36 }} />
          <div className="skeleton" style={{ width: '100%', height: 18 }} />
        </div>
      </div>
    );
  }
  if (variant === 'compact') {
    return (
      <div className="blog-card--compact" aria-hidden="true">
        <div className="skeleton" style={{ aspectRatio: '1 / 1', borderRadius: 'var(--radius-sm)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="skeleton" style={{ width: '95%', height: 16 }} />
          <div className="skeleton" style={{ width: '50%', height: 12 }} />
        </div>
      </div>
    );
  }
  return (
    <div aria-hidden="true">
      <div className="skeleton" style={{ aspectRatio: '16 / 10', borderRadius: 'var(--radius-md)' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 16 }}>
        <div className="skeleton" style={{ width: 90, height: 22, borderRadius: 999 }} />
        <div className="skeleton" style={{ width: '92%', height: 20 }} />
        <div className="skeleton" style={{ width: '60%', height: 14 }} />
      </div>
    </div>
  );
}
