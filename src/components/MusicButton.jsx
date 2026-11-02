export const Bars = () => (
  <span className="bars" aria-hidden="true"><span /><span /><span /><span /></span>
);

export default function MusicButton({ song }) {
  const off = song.muted || !song.playing;
  return (
    <nav className="nav">
      <button className="music" type="button" aria-label={off ? 'Unmute music' : 'Mute music'} onClick={song.toggleMute}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 5 6 9H3v6h3l5 4z" fill="#fff" />
          {off
            ? <path d="m16 9 5 6m0-6-5 6" />
            : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
        </svg>
      </button>
    </nav>
  );
}
