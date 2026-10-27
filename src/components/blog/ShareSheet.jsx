import { useEffect, useRef, useState } from 'react';
import BlogCover from './BlogCover';
import { ChannelIcon } from './ShareIcons';
import { CHANNEL_STYLE } from './shareChannels';
import { canNativeShare, copyText, shareChannels, trimQuote, withUtm } from '../../lib/share';

/**
 * Share dialog: a bottom sheet on phones, a centred card on desktop.
 * Built on <dialog>, so the browser handles focus trapping, Esc to close
 * and returning focus to the button that opened it.
 *
 * `quote` (optional) shares a highlighted passage instead of just the link.
 */
export default function ShareSheet({ open, onClose, post, url, quote }) {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return undefined;
    if (open && !dialog.open) {
      dialog.showModal();
      // Start focus on the sheet itself (not the Close button), so Tab goes
      // straight to the share targets without a stray focus ring on open.
      dialog.querySelector('.share-sheet__body')?.focus();
      // Stop the page behind from scrolling while the sheet is up.
      document.documentElement.style.overflow = 'hidden';
    } else if (!open && dialog.open) {
      // Let the slide-out play, then close for real (instant under reduced motion).
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      dialog.classList.add('is-closing');
      const timer = setTimeout(() => {
        dialog.classList.remove('is-closing');
        if (dialog.open) dialog.close();
      }, reduce ? 0 : 220);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) {
      setCopied(false);
      document.documentElement.style.overflow = '';
    }
  }, [open]);

  useEffect(() => () => {
    document.documentElement.style.overflow = '';
  }, []);

  const channels = shareChannels({ url, title: post.title, excerpt: post.excerpt, quote });
  const shownUrl = url.replace(/^https?:\/\//, '');

  const copy = async () => {
    const text = quote ? `“${trimQuote(quote)}”\n— ${post.title}\n${url}` : url;
    if (await copyText(text)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({
        title: post.title,
        text: quote ? `“${trimQuote(quote)}”` : post.excerpt || undefined,
        url: withUtm(url, 'native'),
      });
      onClose();
    } catch {
      // Dismissed; keep our sheet open.
    }
  };

  return (
    <dialog
      ref={ref}
      className="share-sheet"
      aria-labelledby="share-sheet-title"
      onClose={onClose}
      onCancel={onClose}
      // A click that lands on <dialog> itself (not its content) is on the backdrop.
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      {open && (
        <div className="share-sheet__body" tabIndex={-1}>
          <div className="share-sheet__handle" aria-hidden="true" />
          <div className="share-sheet__head">
            <h2 id="share-sheet-title">{quote ? 'Share this quote' : 'Share this article'}</h2>
            <button type="button" className="share-sheet__close" onClick={onClose} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {quote ? (
            <blockquote className="share-quote">
              “{trimQuote(quote)}”
              <cite>— {post.title}</cite>
            </blockquote>
          ) : (
            <div className="share-preview">
              <BlogCover src={post.coverImageUrl} topic={post.category} ratio="1 / 1" radius="10px" sizes="72px" />
              <div style={{ minWidth: 0 }}>
                <div className="share-preview__title">{post.title}</div>
                <div className="share-preview__site">thenura.care · Nura Journal</div>
              </div>
            </div>
          )}

          {/* 3 columns for six targets, 4 for seven or eight: rows stay balanced. */}
          <ul
            className="share-grid"
            aria-label="Share to"
            style={{ gridTemplateColumns: `repeat(${channels.length + (canNativeShare() ? 1 : 0) <= 6 ? 3 : 4}, 1fr)` }}
          >
            {channels.map((c) => (
              <li key={c.id}>
                <a
                  href={c.href}
                  target={c.id === 'email' || c.id === 'sms' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="share-target"
                  onClick={() => setTimeout(onClose, 150)}
                >
                  <span className="share-target__icon" style={{ background: CHANNEL_STYLE[c.id].bg, color: CHANNEL_STYLE[c.id].fg }}>
                    <ChannelIcon id={c.id} />
                  </span>
                  <span className="share-target__label">{c.label}</span>
                </a>
              </li>
            ))}
            {canNativeShare() && (
              <li>
                <button type="button" className="share-target" onClick={nativeShare}>
                  <span className="share-target__icon" style={{ background: CHANNEL_STYLE.more.bg, color: CHANNEL_STYLE.more.fg }}>
                    <ChannelIcon id="more" />
                  </span>
                  <span className="share-target__label">More</span>
                </button>
              </li>
            )}
          </ul>

          <div className="share-link">
            <span className="share-link__url" title={url}>{shownUrl}</span>
            <button type="button" className={`share-link__btn ${copied ? 'is-done' : ''}`} onClick={copy} aria-live="polite">
              <ChannelIcon id={copied ? 'check' : 'copy'} size={16} />
              {copied ? 'Copied' : quote ? 'Copy quote' : 'Copy link'}
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
