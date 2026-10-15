import { SITE_URL } from './blog';

/** The article's address on this site — what readers share. (A CMS
 * `canonicalUrl` can point elsewhere for SEO; sharing should still land
 * people on Nura.) */
export const articleUrl = (slug) => `${SITE_URL}/blog/${encodeURIComponent(slug)}`;

/** Tags a shared link with where it was shared, so analytics can tell
 * which channels bring readers. */
export function withUtm(url, source) {
  try {
    const u = new URL(url);
    u.searchParams.set('utm_source', source);
    u.searchParams.set('utm_medium', 'share');
    u.searchParams.set('utm_campaign', 'journal');
    return u.toString();
  } catch {
    return url;
  }
}

const MAX_QUOTE = 280;
export const trimQuote = (text) => {
  const clean = String(text).replace(/\s+/g, ' ').trim();
  return clean.length > MAX_QUOTE ? `${clean.slice(0, MAX_QUOTE - 1).trimEnd()}…` : clean;
};

const isTouch = () => typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches;

/**
 * Share targets for an article, each with a message written for that
 * channel. With `quote`, the message leads with the highlighted passage.
 */
export function shareChannels({ url, title, excerpt, quote }) {
  const enc = encodeURIComponent;
  const lead = quote ? `“${trimQuote(quote)}”\n— ${title}` : title;
  const link = (source) => withUtm(url, source);

  const channels = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      // WhatsApp renders *text* as bold.
      href: `https://wa.me/?text=${enc(`${quote ? `_“${trimQuote(quote)}”_\n— ` : ''}*${title}*${!quote && excerpt ? `\n${excerpt}` : ''}\n\nRead on Nura: ${link('whatsapp')}`)}`,
    },
    {
      id: 'telegram',
      label: 'Telegram',
      href: `https://t.me/share/url?url=${enc(link('telegram'))}&text=${enc(lead)}`,
    },
    {
      id: 'facebook',
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(link('facebook'))}`,
    },
    {
      id: 'x',
      label: 'X',
      href: `https://x.com/intent/post?text=${enc(lead)}&url=${enc(link('x'))}`,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(link('linkedin'))}`,
    },
    {
      id: 'email',
      label: 'Email',
      href: `mailto:?subject=${enc(`${title} | Nura Journal`)}&body=${enc(
        `${quote ? `“${trimQuote(quote)}”\n\n` : ''}I thought you might find this useful:\n\n${title}\n${excerpt ? `${excerpt}\n` : ''}\n${link('email')}`
      )}`,
    },
  ];

  // Text messages only make sense on a phone.
  if (isTouch()) {
    channels.splice(1, 0, {
      id: 'sms',
      label: 'Messages',
      href: `sms:?&body=${enc(`${lead}\n${link('sms')}`)}`,
    });
  }
  return channels;
}

export const canNativeShare = () => typeof navigator !== 'undefined' && typeof navigator.share === 'function';

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers / insecure contexts: fall back to a hidden textarea.
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}
