import { useEffect, useState } from 'react';
import { ChannelIcon } from './ShareIcons';

const MIN_CHARS = 12;

/**
 * Highlight-to-share: selecting text inside the article shows a small bar
 * to share or copy that passage. Sits above the selection with a mouse and
 * below it on touch screens, where the phone's own copy/paste menu takes
 * the space above.
 */
export default function SelectionShare({ containerRef, onShare, onCopy }) {
  const [sel, setSel] = useState(null);

  useEffect(() => {
    let timer = 0;
    const update = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const selection = window.getSelection();
        const root = containerRef.current;
        if (!selection || selection.isCollapsed || !selection.rangeCount || !root) return setSel(null);
        const range = selection.getRangeAt(0);
        if (!root.contains(range.commonAncestorContainer)) return setSel(null);
        const text = selection.toString().replace(/\s+/g, ' ').trim();
        if (text.length < MIN_CHARS) return setSel(null);
        const rect = range.getBoundingClientRect();
        const touch = window.matchMedia('(pointer: coarse)').matches;
        const half = 110;
        setSel({
          text,
          left: Math.min(Math.max(rect.left + rect.width / 2, half + 8), window.innerWidth - half - 8) + window.scrollX,
          top: touch ? rect.bottom + window.scrollY + 14 : rect.top + window.scrollY - 54,
        });
      }, 120);
    };
    document.addEventListener('selectionchange', update);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('selectionchange', update);
    };
  }, [containerRef]);

  if (!sel) return null;

  return (
    <div
      className="selection-share"
      style={{ left: sel.left, top: sel.top }}
      role="toolbar"
      aria-label="Share selected text"
      // Keep the selection alive while clicking the buttons.
      onMouseDown={(e) => e.preventDefault()}
    >
      <button
        type="button"
        onClick={() => {
          onShare(sel.text);
          window.getSelection()?.removeAllRanges();
        }}
      >
        <ChannelIcon id="share" size={16} />
        Share quote
      </button>
      <span className="selection-share__divider" aria-hidden="true" />
      <button
        type="button"
        onClick={() => {
          onCopy(sel.text);
          window.getSelection()?.removeAllRanges();
        }}
      >
        <ChannelIcon id="copy" size={16} />
        Copy
      </button>
    </div>
  );
}
