import SaveButton from './SaveButton';
import { setTextSize, useReader } from '../../lib/readerStore';

const SIZES = ['sm', 'md', 'lg'];
const SIZE_NAMES = { sm: 'Small', md: 'Medium', lg: 'Large' };

function ListenIcon({ status }) {
  if (status === 'playing') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="6" y="5" width="4" height="14" rx="1.2" />
        <rect x="14" y="5" width="4" height="14" rx="1.2" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 9.5v5h3.5L12 19V5L7.5 9.5H4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Reading tools for an article: listen, text size, save and share.
 * `variant="inline"` sits under the byline; `variant="bar"` is the fixed
 * bottom bar on phones (icon-first, thumb-reachable).
 */
export default function ArticleToolbar({ post, speech, onShare, variant = 'inline' }) {
  const textSize = useReader((s) => s.textSize);
  const bar = variant === 'bar';

  const cycleSize = () => setTextSize(SIZES[(SIZES.indexOf(textSize) + 1) % SIZES.length]);

  const listenLabel = speech.status === 'playing' ? 'Pause' : speech.status === 'paused' ? 'Resume' : 'Listen';

  return (
    <div className={bar ? 'article-bar' : 'article-tools'} role="toolbar" aria-label="Article tools">
      {speech.supported && (
        <div className="tool-group">
          <button
            type="button"
            className={`tool-btn ${speech.status !== 'idle' ? 'is-active' : ''}`}
            onClick={speech.status === 'playing' ? speech.pause : speech.play}
            aria-label={`${listenLabel} article`}
          >
            <ListenIcon status={speech.status} />
            <span className="tool-btn__label">{listenLabel}</span>
          </button>
          {speech.status !== 'idle' && (
            <button type="button" className="tool-btn tool-btn--icon" onClick={speech.stop} aria-label="Stop listening">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            </button>
          )}
        </div>
      )}

      <button
        type="button"
        className="tool-btn"
        onClick={cycleSize}
        aria-label={`Text size: ${SIZE_NAMES[textSize]}. Change text size`}
        title="Change text size"
      >
        <span className="aa-icon" aria-hidden="true">
          <span style={{ fontSize: 11 }}>A</span>
          <span style={{ fontSize: 17 }}>A</span>
        </span>
        <span className="tool-btn__label tool-btn__label--size">{SIZE_NAMES[textSize]}</span>
      </button>

      <SaveButton post={post} variant="tool" />

      <button type="button" className="tool-btn" onClick={onShare} aria-haspopup="dialog">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3v12M7 8l5-5 5 5M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="tool-btn__label">Share</span>
      </button>
    </div>
  );
}
