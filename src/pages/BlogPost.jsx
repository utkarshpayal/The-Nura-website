import { Children, isValidElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import BlogCard, { BlogCardSkeleton } from '../components/blog/BlogCard';
import BlogCover from '../components/blog/BlogCover';
import RichChart from '../components/blog/RichChart';
import TopicTag from '../components/blog/TopicTag';
import AppCta from '../components/blog/AppCta';
import ArticleToolbar from '../components/blog/ArticleToolbar';
import ShareSheet from '../components/blog/ShareSheet';
import ShareRow from '../components/blog/ShareRow';
import SelectionShare from '../components/blog/SelectionShare';
import { articleUrl, copyText, trimQuote } from '../lib/share';
import useSpeech from '../hooks/useSpeech';
import { recordProgress, useReader } from '../lib/readerStore';
import useDocumentMeta from '../hooks/useDocumentMeta';
import useSeo from '../hooks/useSeo';
import { getBlog, peekBlog } from '../lib/api';
import { blogPostSeo } from '../seo/site';
import { parseChartSpec, richTextSchema } from '../lib/richText';
import { SITE_URL, extractHeadings, formatDate, headingId, readTime, stripLeadingTitle, tagLabel, topicMeta } from '../lib/blog';
import NotFound from './NotFound';

const textOf = (children) =>
  Children.toArray(children)
    .map((child) => (typeof child === 'string' || typeof child === 'number' ? child : isValidElement(child) ? textOf(child.props.children) : ''))
    .join('');

// Each section heading gets a "#" link (shown on hover/focus) so a reader
// can copy a link straight to that part of the article.
const heading = (Tag) =>
  function MarkdownHeading({ children }) {
    const id = headingId(textOf(children));
    return (
      <Tag id={id} className="anchor-heading">
        {children}
        {/* The "#" is drawn in CSS so read-aloud doesn't speak it. */}
        <a href={`#${id}`} className="heading-anchor" aria-label="Link to this section" />
      </Tag>
    );
  };

// Blocks read aloud, top-level only (an <li>'s inner <p> is read with the <li>).
const READABLE = 'p, li, h2, h3, blockquote, td, th';
function readableBlocks(root) {
  if (!root) return [];
  const all = [...root.querySelectorAll(READABLE)];
  return all.filter((el) => !all.some((other) => other !== el && other.contains(el)));
}

const isImageOnly = (node) => node?.children?.length === 1 && node.children[0].tagName === 'img';

// Markdown comes from the CMS, with the small raw-HTML allowlist in
// lib/richText.js (colored text, highlight, underline). rehype-sanitize drops
// everything else, so a post can't inject scripts; links leaving the site open
// in a new tab.
const rehypePlugins = [rehypeRaw, [rehypeSanitize, richTextSchema]];

const markdownComponents = {
  // The page title is the only h1; a `#` inside the body is a section.
  h1: heading('h2'),
  h2: heading('h2'),
  h3: heading('h3'),
  a({ href = '', children }) {
    if (href.startsWith('/')) return <Link to={href}>{children}</Link>;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
  // An image on its own line is a figure; its Markdown title is the caption.
  p({ node, children }) {
    return isImageOnly(node) ? children : <p>{children}</p>;
  },
  img({ src, alt, title }) {
    const img = <img src={src} alt={alt || ''} loading="lazy" decoding="async" />;
    if (!title) return img;
    return (
      <figure className="prose-figure">
        {img}
        <figcaption>{title}</figcaption>
      </figure>
    );
  },
  // ```chart blocks draw as charts; one that can't be read is left out.
  pre({ node, children }) {
    const code = node?.children?.[0];
    const classes = code?.properties?.className ?? [];
    if (code?.tagName === 'code' && classes.includes('language-chart')) {
      const spec = parseChartSpec(code.children?.map((c) => c.value ?? '').join('') ?? '');
      return spec ? <RichChart spec={spec} /> : null;
    }
    return <pre>{children}</pre>;
  },
};

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return <div className="reading-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />;
}

function TocList({ headings, active, onNavigate }) {
  return (
    <ul className="toc">
      {headings.map((h) => (
        <li key={h.id} style={{ paddingLeft: h.level === 3 ? 14 : 0 }}>
          <a href={`#${h.id}`} className={active === h.id ? 'active' : ''} aria-current={active === h.id ? 'location' : undefined} onClick={onNavigate}>
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Phones: a collapsed "On this page" box above the article body. */
function MobileToc({ headings }) {
  const [open, setOpen] = useState(false);
  return (
    <details className="toc-mobile" open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary>
        On this page
        <span className="toc-mobile__count">{headings.length} sections</span>
      </summary>
      <TocList headings={headings} onNavigate={() => setOpen(false)} />
    </details>
  );
}

function TableOfContents({ headings }) {
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    const nodes = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
    if (!nodes.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-90px 0px -65% 0px' }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [headings]);

  return (
    <nav aria-label="On this page">
      <div style={{ font: 'var(--t-micro)', color: 'var(--ink)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 12 }}>On this page</div>
      <TocList headings={headings} active={active} />
    </nav>
  );
}

function ArticleSkeleton() {
  return (
    <div className="container" style={{ maxWidth: 780, paddingTop: 56, paddingBottom: 96 }} aria-busy="true" aria-label="Loading article">
      <div className="skeleton" style={{ width: 120, height: 24, borderRadius: 999, marginBottom: 18 }} />
      <div className="skeleton" style={{ width: '95%', height: 42, marginBottom: 12 }} />
      <div className="skeleton" style={{ width: '70%', height: 42, marginBottom: 24 }} />
      <div className="skeleton" style={{ width: '100%', aspectRatio: '16 / 9', borderRadius: 'var(--radius-lg)', marginBottom: 32 }} />
      {[100, 96, 88, 100, 72].map((w, i) => (
        <div key={i} className="skeleton" style={{ width: `${w}%`, height: 16, marginBottom: 12 }} />
      ))}
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  // A prerendered page (or a visit earlier in this session) already has the
  // article: draw it straight away and refresh it quietly.
  const fromPeek = (data) => ({ loading: false, error: null, blog: data.blog, related: data.related || [] });
  const [state, setState] = useState(() => {
    const seeded = peekBlog(slug);
    return seeded ? fromPeek(seeded) : { loading: true, error: null, blog: null, related: [] };
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const seeded = peekBlog(slug);
    setState(seeded ? fromPeek(seeded) : { loading: true, error: null, blog: null, related: [] });
    getBlog(slug)
      .then((data) => !cancelled && setState({ loading: false, error: null, blog: data.blog, related: data.related || [] }))
      .catch((err) => {
        // Keep showing the copy we have; only an article we never had fails.
        if (!cancelled && !seeded) setState({ loading: false, error: err, blog: null, related: [] });
      });
    return () => {
      cancelled = true;
    };
  }, [slug, attempt]);

  const { blog, related } = state;
  const body = useMemo(() => (blog ? stripLeadingTitle(blog.content, blog.title) : ''), [blog]);
  const headings = useMemo(() => extractHeadings(body), [body]);

  const seo = blogPostSeo(blog, slug);
  const canonical = seo.url || `${SITE_URL}/blog/${encodeURIComponent(slug)}`;
  const pageTitle = seo.title;
  const pageDescription = seo.description;
  const shareImage = seo.image;

  useDocumentMeta(pageTitle, pageDescription);
  useSeo({
    title: blog ? seo.ogTitle : undefined,
    description: pageDescription,
    url: blog ? canonical : undefined,
    image: shareImage,
    type: 'article',
    jsonLd: blog ? seo.jsonLd : undefined,
  });

  const textSize = useReader((s) => s.textSize);
  const shareUrl = articleUrl(slug);
  const [sheet, setSheet] = useState({ open: false, quote: null });
  const [toast, setToast] = useState({ message: '', key: 0 });
  const showToast = useCallback((message) => setToast((t) => ({ message, key: t.key + 1 })), []);
  const openShare = useCallback((quote = null) => setSheet({ open: true, quote }), []);

  // Toasts clear themselves.
  useEffect(() => {
    if (!toast.message) return undefined;
    const t = setTimeout(() => setToast((cur) => (cur.key === toast.key ? { ...cur, message: '' } : cur)), 2400);
    return () => clearTimeout(t);
  }, [toast]);
  const proseRef = useRef(null);
  const headerRef = useRef(null);
  const relatedRef = useRef(null);
  const [showBar, setShowBar] = useState(false);

  const getBlocks = useCallback(() => readableBlocks(proseRef.current), []);
  const speech = useSpeech(getBlocks, blog?.title);
  const { stop: stopSpeech } = speech;

  // A new article (related link, back/forward) stops the one being read.
  useEffect(() => stopSpeech, [slug, stopSpeech]);

  // Remember how far the reader got (for "Continue reading" and the read
  // marks on cards), and show the phone action bar once the header has
  // scrolled away, hiding it again when "Keep reading" comes into view.
  useEffect(() => {
    if (!blog) return undefined;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const prose = proseRef.current;
        if (prose) {
          const rect = prose.getBoundingClientRect();
          const read = (window.innerHeight - rect.top) / Math.max(rect.height, 1);
          if (read > 0) recordProgress(blog, Math.min(1, read));
        }
        const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 0;
        const relatedTop = relatedRef.current?.getBoundingClientRect().top ?? Infinity;
        setShowBar(headerBottom < 0 && relatedTop > window.innerHeight);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [blog]);

  if (state.error?.status === 404) return <NotFound />;

  if (state.error) {
    return (
      <div className="page">
        <Nav />
        <div className="container" style={{ maxWidth: 600, paddingTop: 96, paddingBottom: 96, textAlign: 'center' }}>
          <h1 style={{ font: 'var(--t-h2)', margin: '0 0 12px' }}>We couldn’t load this article</h1>
          <p style={{ font: 'var(--t-body)', color: 'var(--ink-3)', margin: '0 0 24px' }}>Check your connection and try again.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => setAttempt((a) => a + 1)}>Try again</button>
            <Link to="/blog" className="btn btn-secondary">All articles</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const meta = blog ? topicMeta(blog.category) : null;
  const updated = blog && blog.updatedAt && formatDate(blog.updatedAt) !== formatDate(blog.publishedAt) ? formatDate(blog.updatedAt) : null;

  return (
    <div className="page">
      <ReadingProgress />
      <Nav />

      {state.loading ? (
        <ArticleSkeleton />
      ) : (
        <article>
          <header ref={headerRef} className="container" style={{ maxWidth: 1080, paddingTop: 48 }}>
            <div style={{ maxWidth: 760 }}>
            <nav aria-label="Breadcrumb" className="breadcrumb" style={{ marginBottom: 22 }}>
              <Link to="/blog">Nura Journal</Link>
              <span aria-hidden="true">/</span>
              <Link to={`/blog/topic/${encodeURIComponent(blog.category)}`}>{meta.label}</Link>
            </nav>
            <TopicTag topic={blog.category} link />
            <h1 style={{ font: 'var(--t-h1)', color: 'var(--ink)', margin: '16px 0 16px' }}>{blog.title}</h1>
            {blog.excerpt && <p style={{ font: 'var(--t-lead)', color: 'var(--ink-3)', margin: '0 0 24px' }}>{blog.excerpt}</p>}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', paddingBottom: 20 }}>
              <span className="blog-avatar blog-avatar--lg" aria-hidden="true">{(blog.author || 'N').trim().charAt(0)}</span>
              <div>
                <div style={{ font: 'var(--t-label)', color: 'var(--ink)' }}>{blog.author}</div>
                <div style={{ font: 'var(--t-caption)', color: 'var(--ink-4)' }}>
                  {formatDate(blog.publishedAt)} · {readTime(blog.readTimeMinutes)}
                  {updated && <> · Updated {updated}</>}
                </div>
              </div>
            </div>
            <ArticleToolbar post={blog} speech={speech} onShare={() => openShare()} />
            </div>
          </header>

          <div className="container" style={{ maxWidth: 1080 }}>
            <BlogCover
              src={blog.coverImageUrl}
              alt=""
              topic={blog.category}
              ratio={null}
              className="article-cover"
              radius="var(--radius-lg)"
              sizes="(min-width: 1080px) 1016px, 100vw"
              eager
            />
          </div>

          <div className="container article-layout" style={{ paddingTop: 44, paddingBottom: 72 }}>
            <div style={{ minWidth: 0 }}>
              {headings.length >= 2 && <MobileToc headings={headings} />}
              <div ref={proseRef} className={`prose prose--${textSize}`}>
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={rehypePlugins} components={markdownComponents}>
                  {body}
                </Markdown>
              </div>

              {blog.tags?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 36 }}>
                  {blog.tags.map((t) => (
                    <Link key={t} to={`/blog?tag=${encodeURIComponent(t)}`} className="tag-chip">
                      {tagLabel(t)}
                    </Link>
                  ))}
                </div>
              )}

              <div className="card" style={{ marginTop: 32, padding: '18px 22px', background: 'var(--surface)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="var(--teal)" strokeWidth="1.8" />
                  <path d="M12 11v5M12 8h.01" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: 0 }}>
                  This article is for general information and isn’t a diagnosis or a substitute for advice from a doctor. If something feels wrong, talk to a clinician. You can book one in the Nura app.
                </p>
              </div>

              <ShareRow post={blog} url={shareUrl} onCopied={showToast} onOpenSheet={() => openShare()} />

              <button
                type="button"
                className="back-to-top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to top
              </button>
            </div>

            <aside className="article-aside">
              <div className="article-aside__sticky">
                {headings.length >= 2 && <TableOfContents headings={headings} />}
                <AppCta variant="card" />
              </div>
            </aside>
          </div>
        </article>
      )}

      {blog && (
        <>
          <ShareSheet
            open={sheet.open}
            quote={sheet.quote}
            post={blog}
            url={shareUrl}
            onClose={() => setSheet((cur) => ({ ...cur, open: false }))}
          />
          <SelectionShare
            containerRef={proseRef}
            onShare={(text) => openShare(text)}
            onCopy={async (text) => {
              if (await copyText(`“${trimQuote(text)}”\n— ${blog.title}\n${shareUrl}`)) showToast('Quote copied with a link to the article');
            }}
          />
        </>
      )}

      <div className="toast" role="status" aria-live="polite">
        {toast.message && (
          <span key={toast.key} className="toast__msg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4.5 12.5 9.5 17.5 19.5 6.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {toast.message}
          </span>
        )}
      </div>

      {blog && (
        <div className={`article-bar-wrap ${showBar ? 'is-visible' : ''}`} aria-hidden={!showBar} inert={showBar ? undefined : true}>
          <ArticleToolbar post={blog} speech={speech} onShare={() => openShare()} variant="bar" />
        </div>
      )}

      {(state.loading || related.length > 0) && (
        <section ref={relatedRef} style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', padding: '64px 0 80px' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
              <h2 style={{ font: 'var(--t-h3)', color: 'var(--ink)', margin: 0 }}>Keep reading</h2>
              <Link to="/blog" style={{ font: 'var(--t-label)' }}>All articles →</Link>
            </div>
            <div className="blog-grid">
              {state.loading ? [0, 1, 2].map((i) => <BlogCardSkeleton key={i} />) : related.map((post) => <BlogCard key={post.id} post={post} />)}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
