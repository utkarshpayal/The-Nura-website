import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { ANDROID_PLAY_STORE_URL } from '../constants';

/*
 * /app?deeplink=<in-app path> — the landing page for every link the Nura app
 * shares (The-Nura-App/lib/share.ts), e.g. /app?deeplink=blogs%3Fslug%3Dabc.
 *
 * With the app installed and Android App Links verified
 * (public/.well-known/assetlinks.json), Android opens the app directly and this
 * page never loads. It only runs when that didn't happen: app not installed,
 * App Links not verified yet, or an in-app browser (Instagram, Facebook, ...)
 * that loads links itself instead of handing them to the OS.
 *
 * Android: navigate to an intent:// URL for thenura://<deeplink> scoped to the
 * app's package. Chrome and most in-app browsers open the app if it's
 * installed, otherwise go to S.browser_fallback_url (the Play Store listing,
 * with the deeplink as the install referrer). The same URL is also a visible
 * button, since some in-app browsers only honour intent:// on a real tap.
 * iOS (no App Store release yet) and desktop just get buttons.
 */

const APP_SCHEME = 'thenura';
const ANDROID_PACKAGE = 'com.uvin124.thenura';

// Only a relative in-app route + optional query ("blogs?slug=abc") — never
// something with its own scheme/host, so this page can't be used to bounce
// visitors into arbitrary apps or sites.
const DEEPLINK_PATTERN = /^[a-z0-9-]+(?:\/[a-z0-9-]+)*(?:\?[^#\s]*)?$/i;

function readDeeplink(search) {
  const raw = new URLSearchParams(search).get('deeplink');
  const value = (raw || '').trim().replace(/^\/+/, '');
  return DEEPLINK_PATTERN.test(value) ? value : '';
}

function detectPlatform() {
  const ua = navigator.userAgent || '';
  if (/android/i.test(ua)) return 'android';
  if (/iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return 'ios';
  return 'desktop';
}

export default function AppRedirect() {
  useDocumentMeta('Open in Nura', 'Opening this in the Nura app.');

  const deeplink = useMemo(() => readDeeplink(window.location.search), []);
  const platform = useMemo(detectPlatform, []);
  const [attempted, setAttempted] = useState(false);

  const playStoreUrl = deeplink
    ? `${ANDROID_PLAY_STORE_URL}&referrer=${encodeURIComponent(`deeplink=${encodeURIComponent(deeplink)}`)}`
    : ANDROID_PLAY_STORE_URL;
  const schemeUrl = `${APP_SCHEME}://${deeplink}`;
  const intentUrl =
    `intent://${deeplink}#Intent;scheme=${APP_SCHEME};package=${ANDROID_PACKAGE};` +
    `S.browser_fallback_url=${encodeURIComponent(playStoreUrl)};end`;
  const openUrl = platform === 'android' ? intentUrl : schemeUrl;

  useEffect(() => {
    if (platform !== 'android') return undefined;
    // Straight away, while this is still the navigation the visitor's tap
    // started — Chrome only lets a page launch an app without a fresh gesture
    // in that window.
    window.location.replace(intentUrl);
    const timer = setTimeout(() => setAttempted(true), 1200);
    return () => clearTimeout(timer);
  }, [platform, intentUrl]);

  const message =
    platform === 'android'
      ? attempted
        ? "If Nura didn't open, tap below — or get it free on Google Play."
        : 'Opening Nura…'
      : platform === 'ios'
        ? 'Nura for iPhone is coming soon. If you already have it, tap below to open.'
        : 'Open this link on your Android phone to view it in the Nura app.';

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', background: 'var(--bg, #fff)' }}>
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 20,
          padding: '48px 16px',
        }}
      >
        <Logo size={72} />
        <h1 style={{ font: 'var(--t-h2)', color: 'var(--ink)', margin: 0, letterSpacing: '-0.01em' }}>
          Open in Nura
        </h1>
        <p style={{ font: 'var(--t-body)', color: 'var(--ink-3)', maxWidth: 420, margin: 0 }}>
          {message}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 320, marginTop: 8 }}>
          {platform !== 'desktop' && (
            <a href={openUrl} className="btn btn-brand" style={{ padding: '14px 26px' }}>
              Open in the Nura app
            </a>
          )}
          {platform === 'ios' ? (
            <Link to="/download" className="btn btn-secondary" style={{ padding: '14px 26px' }}>
              Get the app
            </Link>
          ) : (
            <a href={playStoreUrl} className="btn btn-secondary" style={{ padding: '14px 26px' }}>
              Get it on Google Play
            </a>
          )}
          <Link to="/" style={{ font: 'var(--t-label-sm)', color: 'var(--ink-4)', marginTop: 4 }}>
            Go to thenura.care
          </Link>
        </div>
      </div>
    </div>
  );
}
