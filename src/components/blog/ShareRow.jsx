import { ChannelIcon } from './ShareIcons';
import { CHANNEL_STYLE } from './shareChannels';
import { copyText, shareChannels } from '../../lib/share';

const ROW_CHANNELS = ['whatsapp', 'telegram', 'facebook', 'x', 'linkedin', 'email'];

/** End-of-article prompt: one tap to the most-used channels, copy link, or
 * the full share sheet. */
export default function ShareRow({ post, url, onCopied, onOpenSheet }) {
  const channels = shareChannels({ url, title: post.title, excerpt: post.excerpt }).filter((c) => ROW_CHANNELS.includes(c.id));

  return (
    <div className="share-row">
      <div>
        <div style={{ font: 'var(--t-title)', color: 'var(--ink)' }}>Found this helpful?</div>
        <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: '4px 0 0' }}>
          Share it with someone who might need it today.
        </p>
      </div>
      <ul className="share-row__list">
        {channels.map((c) => (
          <li key={c.id}>
            <a
              href={c.href}
              target={c.id === 'email' ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="share-round"
              style={{ background: CHANNEL_STYLE[c.id].bg, color: CHANNEL_STYLE[c.id].fg }}
              aria-label={`Share on ${c.label}`}
              title={c.label}
            >
              <ChannelIcon id={c.id} size={20} />
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            className="share-round"
            style={{ background: CHANNEL_STYLE.copy.bg, color: CHANNEL_STYLE.copy.fg }}
            aria-label="Copy link"
            title="Copy link"
            onClick={async () => {
              if (await copyText(url)) onCopied('Link copied');
            }}
          >
            <ChannelIcon id="copy" size={20} />
          </button>
        </li>
        <li>
          <button
            type="button"
            className="share-round"
            style={{ background: CHANNEL_STYLE.more.bg, color: CHANNEL_STYLE.more.fg }}
            aria-label="More ways to share"
            title="More"
            onClick={onOpenSheet}
          >
            <ChannelIcon id="more" size={20} />
          </button>
        </li>
      </ul>
    </div>
  );
}
