import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Loader from '../components/Loader';
import BlogCard, { BlogCardSkeleton } from '../components/blog/BlogCard';
import BlogCover from '../components/blog/BlogCover';
import AppCta from '../components/blog/AppCta';
import SearchBox, { Highlight } from '../components/blog/SearchBox';
import { BookmarkIcon } from '../components/blog/SaveButton';
import useDocumentMeta from '../hooks/useDocumentMeta';
import useSeo from '../hooks/useSeo';
import { getBlogs, getBlogTopics, peekBlogTopics, peekBlogs } from '../lib/api';
import { blogListSeo } from '../seo/site';
import { tagLabel, topicMeta } from '../lib/blog';
import { READ_THRESHOLD, useReader } from '../lib/readerStore';

const PAGE_SIZE = 12;

function TopicNav({ topics, active }) {
  const ref = useRef(null);
  const savedCount = useReader((s) => s.saved.length);

  // On a phone the row scrolls sideways: bring the selected topic into view.
  useEffect(() => {
    const el = ref.current?.querySelector('[aria-current="page"]');
    if (!el || !ref.current) return;
    const row = ref.current;
    row.scrollTo({ left: el.offsetLeft - (row.clientWidth - el.clientWidth) / 2, behavior: 'smooth' });
  }, [active, topics, savedCount]);

  return (
    <nav aria-label="Blog topics" className="topic-nav-wrap">
      <div ref={ref} className="topic-nav">
        <Link to="/blog" className={`topic-pill ${!active ? 'active' : ''}`} aria-current={!active ? 'page' : undefined}>
          All topics
        </Link>
        {topics.map((t) => {
          const isActive = active === t.id;
          return (
            <Link
              key={t.id}
              to={`/blog/topic/${encodeURIComponent(t.id)}`}
              className={`topic-pill ${isActive ? 'active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {topicMeta(t.id).label}
              <span className="topic-pill__count">{t.count}</span>
            </Link>
          );
        })}
        <Link
          to="/blog/saved"
          className={`topic-pill topic-pill--saved ${active === '__saved' ? 'active' : ''}`}
          aria-current={active === '__saved' ? 'page' : undefined}
        >
          <BookmarkIcon filled={savedCount > 0} size={14} />
          Saved
          {savedCount > 0 && <span className="topic-pill__count">{savedCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

function SectionHeading({ title, subtitle, action }) {
  return (
    <div className="section-heading">
      <div>
        <h2 style={{ font: 'var(--t-h3)', color: 'var(--ink)', margin: 0 }}>{title}</h2>
        {subtitle && <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: '6px 0 0' }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function ErrorState({ onRetry }) {
  return (
    <div className="card" role="alert" style={{ padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ font: 'var(--t-title)', color: 'var(--ink)', marginBottom: 6 }}>We couldn’t load articles right now</div>
      <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: '0 0 18px' }}>Check your connection and try again.</p>
      <button type="button" className="btn btn-secondary btn-sm" onClick={onRetry}>Try again</button>
    </div>
  );
}

function TopicTiles({ topics }) {
  return (
    <div className="topic-tiles">
      {topics.map((t) => {
        const meta = topicMeta(t.id);
        return (
          <Link key={t.id} to={`/blog/topic/${encodeURIComponent(t.id)}`} className="topic-tile" style={{ background: meta.tint }}>
            <BlogCover src={t.coverImageUrl} topic={t.id} ratio="4 / 3" radius="var(--radius-sm)" sizes="(min-width: 1000px) 260px, 45vw" />
            <div style={{ padding: '14px 4px 4px' }}>
              <div style={{ font: 'var(--t-title)', color: meta.color }}>{meta.label}</div>
              <div style={{ font: 'var(--t-caption)', color: 'var(--ink-3)' }}>
                {t.count} {t.count === 1 ? 'article' : 'articles'}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/** Articles this reader started but didn't finish, newest first. Lives only
 * in this browser (see lib/readerStore.js). */
function ContinueReading() {
  const progress = useReader((s) => s.progress);
  const items = useMemo(
    () =>
      Object.values(progress)
        .filter((p) => p.pct >= 0.05 && p.pct < READ_THRESHOLD && p.post?.slug)
        .sort((a, b) => b.at - a.at)
        .slice(0, 3),
    [progress]
  );
  if (!items.length) return null;

  return (
    <section className="container blog-section" aria-labelledby="continue-heading">
      <div className="continue-box">
        <h2 id="continue-heading" style={{ font: 'var(--t-h4)', color: 'var(--ink)', margin: '0 0 14px' }}>
          Continue reading
        </h2>
        <div className="continue-list">
          {items.map((p) => (
            <BlogCard key={p.post.slug} post={p.post} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}

function SavedView() {
  const saved = useReader((s) => s.saved);
  return (
    <section className="container blog-section" style={{ paddingTop: 8 }}>
      {saved.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon" aria-hidden="true">
            <BookmarkIcon size={26} />
          </div>
          <div style={{ font: 'var(--t-title)', color: 'var(--ink)', marginBottom: 6 }}>Nothing saved yet</div>
          <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: '0 auto 18px', maxWidth: 380 }}>
            Tap the bookmark on any article to keep it here for later. Your list stays on this device, no account needed.
          </p>
          <Link to="/blog" className="btn btn-primary btn-sm">Find something to read</Link>
        </div>
      ) : (
        <>
          <p className="results-count">
            {saved.length} saved {saved.length === 1 ? 'article' : 'articles'} · kept on this device
          </p>
          <div className="blog-grid">
            {saved.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

/* ── Landing view: featured story, most read, latest, then every topic ── */
function BlogHome({ topics, tags }) {
  // Prerendered pages (and earlier visits) already hold these lists: draw
  // them at once and refresh quietly.
  const [state, setState] = useState(() => {
    const latest = peekBlogs({ limit: 7 });
    const popular = peekBlogs({ sort: 'popular', limit: 4 });
    return latest && popular
      ? { loading: false, error: false, latest: latest.blogs, popular: popular.blogs }
      : { loading: true, error: false, latest: [], popular: [] };
  });
  const [byTopic, setByTopic] = useState(() =>
    Object.fromEntries(topics.map((t) => [t.id, peekBlogs({ topic: t.id, limit: 3 })?.blogs]).filter(([, b]) => b))
  );
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: s.latest.length === 0, error: false }));
    Promise.all([getBlogs({ limit: 7 }), getBlogs({ sort: 'popular', limit: 4 })])
      .then(([latest, popular]) => {
        if (!cancelled) setState({ loading: false, error: false, latest: latest.blogs, popular: popular.blogs });
      })
      .catch(() => {
        // Keep a list we already show; only an empty page shows the error.
        if (!cancelled) setState((s) => ({ ...s, loading: false, error: s.latest.length === 0 }));
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  useEffect(() => {
    if (!topics.length) return undefined;
    let cancelled = false;
    Promise.all(
      topics.map((t) =>
        getBlogs({ topic: t.id, limit: 3 })
          .then((r) => [t.id, r.blogs])
          .catch(() => [t.id, []])
      )
    ).then((entries) => {
      if (!cancelled) setByTopic(Object.fromEntries(entries));
    });
    return () => {
      cancelled = true;
    };
  }, [topics]);

  if (state.error) {
    return (
      <div className="container" style={{ paddingTop: 24, paddingBottom: 72, maxWidth: 760 }}>
        <ErrorState onRetry={() => setAttempt((a) => a + 1)} />
      </div>
    );
  }

  const [featured, ...rest] = state.latest;

  if (!state.loading && !featured) {
    return (
      <div className="container" style={{ paddingTop: 24, paddingBottom: 72, maxWidth: 760, textAlign: 'center' }}>
        <p style={{ font: 'var(--t-body)', color: 'var(--ink-3)' }}>New articles are on their way. Check back soon.</p>
      </div>
    );
  }

  return (
    <>
      {/* Featured + Most read */}
      <section className="container blog-section" aria-label="Featured">
        <div className="blog-lead">
          {state.loading ? <BlogCardSkeleton variant="featured" /> : <BlogCard post={featured} variant="featured" eager />}
          <aside className="blog-lead__aside" aria-labelledby="most-read-heading">
            <h2 id="most-read-heading" style={{ font: 'var(--t-h4)', color: 'var(--ink)', margin: '0 0 6px' }}>Most read</h2>
            <ol className="most-read">
              {state.loading
                ? [0, 1, 2, 3].map((i) => <li key={i}><BlogCardSkeleton variant="compact" /></li>)
                : state.popular.map((post) => (
                    <li key={post.id}>
                      <BlogCard post={post} variant="compact" />
                    </li>
                  ))}
            </ol>
          </aside>
        </div>
      </section>

      <ContinueReading />

      {(state.loading || rest.length > 0) && (
        <section className="container blog-section">
          <SectionHeading title="Latest articles" subtitle="The newest reads from the Nura team." />
          <div className="blog-grid blog-grid--rail">
            {state.loading
              ? [0, 1, 2].map((i) => <BlogCardSkeleton key={i} />)
              : rest.slice(0, 6).map((post) => <BlogCard key={post.id} post={post} />)}
          </div>
        </section>
      )}

      {topics.length > 1 && (
        <section className="container blog-section">
          <SectionHeading title="Browse by topic" subtitle="Pick a subject and read at your own pace." />
          <TopicTiles topics={topics} />
        </section>
      )}

      <section className="container blog-section">
        <AppCta />
      </section>

      {topics.map((t) => {
        const posts = byTopic[t.id];
        const meta = topicMeta(t.id);
        if (posts && posts.length === 0) return null;
        return (
          <section key={t.id} className="container blog-section">
            <SectionHeading
              title={meta.label}
              subtitle={meta.description}
              action={
                <Link to={`/blog/topic/${encodeURIComponent(t.id)}`} className="see-all">
                  See all {t.count} <span aria-hidden="true">→</span>
                </Link>
              }
            />
            <div className="blog-grid blog-grid--rail">
              {posts ? posts.map((post) => <BlogCard key={post.id} post={post} />) : [0, 1, 2].map((i) => <BlogCardSkeleton key={i} />)}
            </div>
          </section>
        );
      })}

      {tags.length > 0 && (
        <section className="container blog-section">
          <SectionHeading title="Explore by subject" subtitle="Jump straight to what’s on your mind." />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {tags.map((t) => (
              <Link key={t.name} to={`/blog?tag=${encodeURIComponent(t.name)}`} className="tag-chip">
                {tagLabel(t.name)}
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

/* ── Filtered view: a topic page, a tag, or search results ── */
function BlogResults({ topic, tag, search, popularTags }) {
  const [sort, setSort] = useState('latest');
  const firstPage = peekBlogs({ topic, tag, search, sort: 'latest', page: 1, limit: PAGE_SIZE });
  const [posts, setPosts] = useState(() => firstPage?.blogs || []);
  const [pagination, setPagination] = useState(() => firstPage?.pagination || null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(!firstPage);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const seeded = page === 1 ? peekBlogs({ topic, tag, search, sort, page: 1, limit: PAGE_SIZE }) : undefined;
    if (seeded) {
      setPosts(seeded.blogs);
      setPagination(seeded.pagination);
    }
    setLoading(!seeded);
    setError(false);
    getBlogs({ topic, tag, search, sort, page, limit: PAGE_SIZE })
      .then((data) => {
        if (cancelled) return;
        setPosts((prev) => (page === 1 ? data.blogs : [...prev, ...data.blogs]));
        setPagination(data.pagination);
      })
      .catch(() => {
        if (!cancelled && !seeded) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [topic, tag, search, sort, page, attempt]);

  const firstLoad = loading && page === 1;

  return (
    <section className="container blog-section" style={{ paddingTop: 8 }} aria-busy={loading}>
      <div className="results-bar">
        <p className="results-count" aria-live="polite" style={{ margin: 0 }}>
          {!firstLoad && pagination ? `${pagination.total} ${pagination.total === 1 ? 'article' : 'articles'}` : '\u00a0'}
        </p>
        {(firstLoad || (pagination?.total ?? 0) > 1) && (
          <div className="segmented" role="group" aria-label="Sort articles">
            {[
              ['latest', 'Latest'],
              ['popular', 'Most read'],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                aria-pressed={sort === key}
                className={sort === key ? 'is-active' : ''}
                onClick={() => {
                  if (sort === key) return;
                  setSort(key);
                  setPage(1);
                  setPosts([]);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && posts.length === 0 ? (
        <ErrorState onRetry={() => setAttempt((a) => a + 1)} />
      ) : !firstLoad && posts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ font: 'var(--t-title)', color: 'var(--ink)', marginBottom: 6 }}>
            {search ? `No articles match “${search}”` : 'No articles here yet'}
          </div>
          <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: '0 auto 18px', maxWidth: 380 }}>
            {search ? 'Check the spelling or try a shorter word. Or start from one of these:' : 'Try one of these subjects instead:'}
          </p>
          {popularTags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 20 }}>
              {popularTags.slice(0, 8).map((t) => (
                <Link key={t.name} to={`/blog?tag=${encodeURIComponent(t.name)}`} className="tag-chip">
                  {tagLabel(t.name)}
                </Link>
              ))}
            </div>
          )}
          <Link to="/blog" className="btn btn-secondary btn-sm">Browse all articles</Link>
        </div>
      ) : (
        <div className="blog-grid">
          {firstLoad
            ? [0, 1, 2, 3, 4, 5].map((i) => <BlogCardSkeleton key={i} />)
            : posts.map((post, i) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  eager={i < 3}
                  highlight={search ? (title) => <Highlight text={title} query={search} /> : undefined}
                />
              ))}
        </div>
      )}

      {error && posts.length > 0 && (
        <p role="alert" style={{ textAlign: 'center', font: 'var(--t-label-sm)', color: 'var(--danger)', marginTop: 24 }}>
          Couldn’t load more articles. Please try again.
        </p>
      )}

      {pagination?.hasNextPage && !firstLoad && (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button
            type="button"
            className="btn btn-secondary"
            disabled={loading}
            onClick={() => (error ? setAttempt((a) => a + 1) : setPage((p) => p + 1))}
          >
            {loading ? <Loader size={15} color="var(--brand)" trackColor="var(--line)" /> : 'Load more articles'}
          </button>
        </div>
      )}
    </section>
  );
}

function ActiveFilters({ topic, tag, search, onClear }) {
  const chips = [];
  if (topic && (tag || search)) chips.push({ key: 'topic', label: `Topic: ${topicMeta(topic).label}` });
  if (tag) chips.push({ key: 'tag', label: `Subject: ${tagLabel(tag)}` });
  if (search) chips.push({ key: 'q', label: `“${search}”` });
  if (!chips.length) return null;

  return (
    <div className="container" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 16 }}>
      {chips.map((c) => (
        <button key={c.key} type="button" className="filter-chip" onClick={() => onClear(c.key)} aria-label={`Remove filter ${c.label}`}>
          {c.label}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export default function Blog({ view }) {
  const savedView = view === 'saved';
  const { topic } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('q') || '';
  const tag = searchParams.get('tag') || '';
  const [taxonomy, setTaxonomy] = useState(() => peekBlogTopics() || { topics: [], tags: [] });

  useEffect(() => {
    let cancelled = false;
    getBlogTopics()
      .then((data) => {
        if (!cancelled) setTaxonomy(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const meta = topic ? topicMeta(topic) : null;
  const filtered = Boolean(topic || tag || search || savedView);

  let heading = 'Your body, explained';
  let subheading = 'Clear, practical articles on periods, hormones, fertility and everyday wellbeing. No jargon, no judgement.';
  if (savedView) {
    heading = 'Saved for later';
    subheading = 'Articles you bookmarked, ready when you are.';
  } else if (meta) {
    heading = meta.label;
    subheading = meta.description;
  } else if (tag) {
    heading = tagLabel(tag);
    subheading = 'Every article on this subject.';
  } else if (search) {
    heading = 'Search results';
    subheading = '';
  }

  const seo = blogListSeo({ topic, heading, filtered });
  const pageTitle = seo.title;
  const pageDescription = seo.description;

  useDocumentMeta(pageTitle, pageDescription);
  useSeo({ title: pageTitle, description: pageDescription, url: seo.url, jsonLd: seo.jsonLd });

  const updateParams = (changes) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)));
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="page">
      <Nav />

      <header className={`blog-hero ${filtered ? 'blog-hero--compact' : ''}`}>
        <div className="container" style={{ maxWidth: 760, textAlign: 'center' }}>
          {filtered ? (
            <nav aria-label="Breadcrumb" className="breadcrumb" style={{ justifyContent: 'center', marginBottom: 12 }}>
              <Link to="/blog">Nura Journal</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{savedView ? 'Saved' : meta ? 'Topic' : tag ? 'Subject' : 'Search'}</span>
            </nav>
          ) : (
            <div className="eyebrow" style={{ marginBottom: 12 }}>Nura Journal</div>
          )}
          <h1 className="blog-hero__title">{heading}</h1>
          {subheading && <p className="blog-hero__lead">{subheading}</p>}
          <SearchBox
            initial={search}
            tags={taxonomy.tags}
            onSubmit={(q) =>
              // Searching from the saved list searches every article.
              savedView ? navigate(q ? `/blog?q=${encodeURIComponent(q)}` : '/blog') : updateParams({ q })
            }
          />
        </div>
      </header>

      <div className="container" style={{ paddingTop: 28 }}>
        <TopicNav topics={taxonomy.topics} active={savedView ? '__saved' : topic} />
      </div>

      <ActiveFilters topic={topic} tag={tag} search={search} onClear={(key) =>
          // The topic lives in the path, so dropping it means leaving /blog/topic/…
          key === 'topic' ? navigate({ pathname: '/blog', search: searchParams.toString() }) : updateParams({ [key]: '' })
        } />

      {savedView ? (
        <SavedView />
      ) : filtered ? (
        // Keyed on the filter so a new topic/tag/search starts fresh from page 1.
        <BlogResults key={`${topic}|${tag}|${search}`} topic={topic} tag={tag} search={search} popularTags={taxonomy.tags} />
      ) : (
        <BlogHome topics={taxonomy.topics} tags={taxonomy.tags} />
      )}

      <Newsletter
        title="Get the best of the Journal, monthly"
        subtitle="One short email a month with our most useful articles and what’s new in Nura. No spam, unsubscribe anytime."
      />
      <Footer />
    </div>
  );
}
