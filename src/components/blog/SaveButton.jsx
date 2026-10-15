import { isSavedIn, toggleSaved, useReader } from '../../lib/readerStore';

export function BookmarkIcon({ filled, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} aria-hidden="true">
      <path d="M6.5 3.5h11a1 1 0 0 1 1 1v16l-6.5-4.2L5.5 20.5v-16a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Save-for-later toggle. `variant="icon"` is the round button over a card
 * cover; `variant="tool"` is the labelled button in the article toolbar.
 */
export default function SaveButton({ post, variant = 'icon', className = '' }) {
  const saved = useReader((s) => isSavedIn(s, post.slug));
  const label = saved ? 'Saved' : 'Save';

  return (
    <button
      type="button"
      className={`${variant === 'icon' ? 'save-icon-btn' : 'tool-btn'} ${saved ? 'is-active' : ''} ${className}`}
      aria-pressed={saved}
      aria-label={variant === 'icon' ? `${saved ? 'Remove from' : 'Save to'} your reading list: ${post.title}` : undefined}
      title={saved ? 'Remove from your reading list' : 'Save to read later'}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSaved(post);
      }}
    >
      <BookmarkIcon filled={saved} size={variant === 'icon' ? 17 : 18} />
      {variant !== 'icon' && <span className="tool-btn__label">{label}</span>}
    </button>
  );
}
