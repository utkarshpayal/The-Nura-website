import { useCallback, useEffect, useRef, useState } from 'react';

const SPEAKING_CLASS = 'is-speaking';

function pickVoice() {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === 'en-IN') ||
    voices.find((v) => v.lang?.startsWith('en-') && /female|samantha|google/i.test(v.name)) ||
    voices.find((v) => v.lang?.startsWith('en')) ||
    null
  );
}

/**
 * Reads an article aloud with the browser's built-in speech (no network,
 * nothing sent anywhere). Speaks one block at a time — Chrome stops long
 * utterances after ~15s — and marks the block being read so the listener
 * can follow along.
 *
 * `getBlocks()` returns the elements to read, in order; `intro` is spoken
 * first (the title).
 */
export default function useSpeech(getBlocks, intro) {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const [status, setStatus] = useState('idle'); // idle | playing | paused
  // Bumped on every stop/start so callbacks from a cancelled run are ignored
  // (cancel() fires `end` on the utterance it interrupts).
  const runRef = useRef(0);
  const currentRef = useRef(null);

  const unmark = () => {
    currentRef.current?.classList.remove(SPEAKING_CLASS);
    currentRef.current = null;
  };

  const stop = useCallback(() => {
    if (!supported) return;
    runRef.current += 1;
    window.speechSynthesis.cancel();
    unmark();
    setStatus('idle');
  }, [supported]);

  const play = useCallback(() => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    if (status === 'paused') {
      synth.resume();
      setStatus('playing');
      return;
    }

    synth.cancel();
    const run = ++runRef.current;
    const voice = pickVoice();
    const queue = [
      ...(intro ? [{ text: intro, el: null }] : []),
      ...getBlocks()
        .map((el) => ({ el, text: el.innerText.trim() }))
        .filter((b) => b.text),
    ];

    const speak = (i) => {
      if (run !== runRef.current) return;
      unmark();
      if (i >= queue.length) {
        setStatus('idle');
        return;
      }
      const { el, text } = queue[i];
      if (el) {
        el.classList.add(SPEAKING_CLASS);
        currentRef.current = el;
        const rect = el.getBoundingClientRect();
        if (rect.top < 80 || rect.bottom > window.innerHeight - 80) {
          el.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      }
      const u = new SpeechSynthesisUtterance(text);
      if (voice) u.voice = voice;
      u.lang = voice?.lang || 'en-IN';
      u.rate = 1;
      u.onend = () => speak(i + 1);
      u.onerror = () => speak(i + 1);
      synth.speak(u);
    };

    setStatus('playing');
    speak(0);
  }, [supported, status, getBlocks, intro]);

  const pause = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.pause();
    setStatus('paused');
  }, [supported]);

  // Stop when leaving the article; speech would otherwise keep going.
  useEffect(() => stop, [stop]);

  return { supported, status, play, pause, stop };
}
