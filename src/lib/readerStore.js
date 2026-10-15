import { useSyncExternalStore } from 'react';

/**
 * Per-reader blog state kept in this browser only: saved articles, how far
 * each article was read, and the preferred text size. Nothing here leaves
 * the device, and the blog works normally when storage is unavailable
 * (private mode, blocked site data) — it just won't remember between visits.
 */
const KEY = 'nura-journal-v1';
const MAX_PROGRESS_ENTRIES = 60;
const EMPTY = { saved: [], progress: {}, textSize: 'md' };

function load() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return {
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
      progress: parsed.progress && typeof parsed.progress === 'object' ? parsed.progress : {},
      textSize: ['sm', 'md', 'lg'].includes(parsed.textSize) ? parsed.textSize : 'md',
    };
  } catch {
    return EMPTY;
  }
}

let state = typeof window === 'undefined' ? EMPTY : load();
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());

function update(changes) {
  state = { ...state, ...changes };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage full or blocked: keep working in memory for this visit.
  }
  emit();
}

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

// Keep several open tabs in step (save in one, see it in the other).
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) {
      state = load();
      emit();
    }
  });
}

/** Subscribe to a slice of reader state. The selector must return a stable
 * value (a primitive, or a reference straight out of state). */
export const useReader = (selector) => useSyncExternalStore(subscribe, () => selector(state), () => selector(EMPTY));

// Only what a card needs, so the saved list renders without the API.
const summarise = (post) => ({
  id: post.id,
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  coverImageUrl: post.coverImageUrl,
  category: post.category,
  readTimeMinutes: post.readTimeMinutes,
  publishedAt: post.publishedAt,
  author: post.author,
});

export const isSavedIn = (s, slug) => s.saved.some((p) => p.slug === slug);

export function toggleSaved(post) {
  const saved = isSavedIn(state, post.slug)
    ? state.saved.filter((p) => p.slug !== post.slug)
    : [{ ...summarise(post), savedAt: Date.now() }, ...state.saved];
  update({ saved });
  return saved.some((p) => p.slug === post.slug);
}

/** Records the furthest point (0–1) the reader reached in an article. */
export function recordProgress(post, pct) {
  const prev = state.progress[post.slug];
  const next = Math.max(prev?.pct || 0, Math.min(1, pct));
  if (prev && next - prev.pct < 0.02) return;
  const entries = Object.entries({ ...state.progress, [post.slug]: { pct: next, at: Date.now(), post: summarise(post) } })
    .sort((a, b) => b[1].at - a[1].at)
    .slice(0, MAX_PROGRESS_ENTRIES);
  update({ progress: Object.fromEntries(entries) });
}

export const READ_THRESHOLD = 0.9;

export function setTextSize(textSize) {
  update({ textSize });
}
