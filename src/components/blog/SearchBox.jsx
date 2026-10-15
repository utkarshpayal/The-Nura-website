import { useEffect, useId, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBlogs } from '../../lib/api';
import { escapeRegExp, readTime, tagLabel, topicMeta } from '../../lib/blog';

const SUGGEST_DEBOUNCE_MS = 200;

/** Wraps every match of `query` in <mark>, case-insensitively. */
export function Highlight({ text, query }) {
  const q = query?.trim();
  if (!q) return text;
  const parts = String(text).split(new RegExp(`(${escapeRegExp(q)})`, 'gi'));
  return parts.map((part, i) => (part.toLowerCase() === q.toLowerCase() ? <mark key={i}>{part}</mark> : part));
}

/**
 * Search with instant suggestions (ARIA combobox): typing shows the top
 * matching articles, ↑/↓ moves through them, Enter opens the highlighted one
 * or, with nothing highlighted, shows all results. An empty, focused box
 * offers popular subjects so there's always somewhere to start.
 */
export default function SearchBox({ initial, onSubmit, tags = [] }) {
  const navigate = useNavigate();
  const listId = useId();
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const requestRef = useRef(0);
  const timer = useRef(null);
  const [value, setValue] = useState(initial);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => setValue(initial), [initial]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const query = value.trim();
  // Options: matching articles, then a final "see all results" row.
  const options = query ? [...suggestions.map((post) => ({ type: 'post', post })), { type: 'all' }] : [];

  const fetchSuggestions = (q) => {
    clearTimeout(timer.current);
    if (!q) {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    timer.current = setTimeout(() => {
      const id = ++requestRef.current;
      getBlogs({ search: q, limit: 5 })
        .then((data) => {
          if (id === requestRef.current) setSuggestions(data.blogs);
        })
        .catch(() => {
          if (id === requestRef.current) setSuggestions([]);
        })
        .finally(() => {
          if (id === requestRef.current) setLoading(false);
        });
    }, SUGGEST_DEBOUNCE_MS);
  };

  const close = () => {
    setOpen(false);
    setActive(-1);
  };

  const submit = (q) => {
    close();
    inputRef.current?.blur();
    onSubmit(q.trim());
  };

  const choose = (option) => {
    if (option.type === 'post') {
      close();
      navigate(`/blog/${option.post.slug}`);
    } else {
      submit(value);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown' && options.length) {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i + 1) % options.length);
    } else if (e.key === 'ArrowUp' && options.length) {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i <= 0 ? options.length - 1 : i - 1));
    } else if (e.key === 'Escape') {
      if (open) {
        e.preventDefault();
        close();
      } else if (value) {
        setValue('');
        fetchSuggestions('');
      }
    } else if (e.key === 'Enter' && open && active >= 0 && options[active]) {
      e.preventDefault();
      choose(options[active]);
    }
  };

  const showPanel = open && (query ? true : tags.length > 0);

  return (
    <div
      ref={wrapRef}
      className="search-wrap"
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget)) close();
      }}
    >
      <form
        role="search"
        className={`blog-search ${showPanel ? 'is-open' : ''}`}
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="7" stroke="var(--ink-4)" strokeWidth="2" />
          <path d="M20 20L16.5 16.5" stroke="var(--ink-4)" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          enterKeyHint="search"
          role="combobox"
          aria-label="Search articles"
          aria-autocomplete="list"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
          autoComplete="off"
          placeholder="Search articles"
          maxLength={100}
          value={value}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
            setActive(-1);
            fetchSuggestions(e.target.value.trim());
          }}
        />
        {value && (
          <button
            type="button"
            className="blog-search__clear"
            aria-label="Clear search"
            onClick={() => {
              setValue('');
              fetchSuggestions('');
              if (initial) onSubmit('');
              inputRef.current?.focus();
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </button>
        )}
        <button type="submit" className="btn btn-primary btn-sm blog-search__submit">Search</button>
      </form>

      {showPanel && (
        <div className="search-panel">
          {query ? (
            <ul id={listId} role="listbox" aria-label="Suggested articles" className="search-options">
              {loading && suggestions.length === 0 && <li className="search-status" role="presentation">Searching…</li>}
              {!loading && suggestions.length === 0 && (
                <li className="search-status" role="presentation">No quick matches. Press Enter to search everything.</li>
              )}
              {options.map((option, i) => (
                <li
                  key={option.type === 'post' ? option.post.id : 'all'}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={active === i}
                  className={`search-option ${active === i ? 'is-active' : ''} ${option.type === 'all' ? 'search-option--all' : ''}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(option)}
                >
                  {option.type === 'post' ? (
                    <>
                      <span className="search-option__title">
                        <Highlight text={option.post.title} query={query} />
                      </span>
                      <span className="search-option__meta">
                        {topicMeta(option.post.category).label} · {readTime(option.post.readTimeMinutes)}
                      </span>
                    </>
                  ) : (
                    <span>
                      See all results for <strong>“{query}”</strong> →
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="search-popular">
              <div className="search-popular__label">Popular subjects</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {tags.slice(0, 10).map((t) => (
                  <Link
                    key={t.name}
                    to={`/blog?tag=${encodeURIComponent(t.name)}`}
                    className="tag-chip"
                    onClick={close}
                  >
                    {tagLabel(t.name)}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
