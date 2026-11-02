import { createElement, useCallback, useRef, useState } from 'react';
import { config } from '../config.js';

// Owns the <audio> element. If song.mp3 is missing, tapping play lets the viewer pick the file from their phone.
export function useSong(toast) {
  const audioRef = useRef(null);
  const pickRef = useRef(null);
  const hasSong = useRef(true);
  const seeked = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const play = useCallback(async (noPick = false) => {
    const a = audioRef.current;
    if (!hasSong.current) { if (!noPick) pickRef.current.click(); return false; }
    if (!seeked.current) {
      seeked.current = true;
      const seek = () => { a.currentTime = config.song.start || 0; };
      if (a.readyState >= 1) seek(); else a.addEventListener('loadedmetadata', seek, { once: true });
    }
    try { await a.play(); return true; }
    catch { if (a.error || a.networkState === 3) hasSong.current = false; return false; }
  }, []);

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a.paused) { a.pause(); return; }
    play().then((ok) => { if (!ok && !hasSong.current) toast(`Pick "${config.song.title}" from your phone to play it here ♪`); });
  }, [play, toast]);

  const toggleMute = useCallback(() => {
    const a = audioRef.current;
    if (a.paused) { a.muted = false; setMuted(false); play().then((ok) => { if (!ok && !hasSong.current) toast(`Pick "${config.song.title}" from your phone to play it here ♪`); }); return; }
    a.muted = !a.muted;
    setMuted(a.muted);
  }, [play, toast]);

  const onPick = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    audioRef.current.src = URL.createObjectURL(f);
    hasSong.current = true;
    seeked.current = true;
    audioRef.current.addEventListener('loadedmetadata', () => { audioRef.current.currentTime = config.song.start || 0; }, { once: true });
    audioRef.current.play().catch(() => {});
  };

  const audio = createElement('div', { hidden: true },
    createElement('audio', {
      ref: audioRef, src: config.song.src, preload: 'auto', loop: true, playsInline: true,
      onPlay: () => setPlaying(true), onPause: () => setPlaying(false),
      onError: () => { hasSong.current = false; },
    }),
    createElement('input', { ref: pickRef, type: 'file', accept: 'audio/*', onChange: onPick }),
  );

  return { playing, muted, play, toggle, toggleMute, audio };
}
