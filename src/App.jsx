import { useState } from 'react';
import { HeartBurstProvider } from './components/HeartBurst.jsx';
import { useSong } from './components/useSong.js';
import Intro from './components/Intro.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import MusicButton from './components/MusicButton.jsx';
import Gutters from './components/Gutters.jsx';
import Gate from './components/Gate.jsx';
import Toast from './components/Toast.jsx';
import Spreads from './components/Spreads.jsx';

export default function App() {
  const [toast, setToast] = useState('');
  const song = useSong(setToast);
  const [ok, setOk] = useState(false);

  if (!ok) return <Gate onOk={() => setOk(true)} />;

  return (
    <HeartBurstProvider>
      <Intro onOpen={() => song.play(true)} />
      <Gutters />
      <div className={`app${song.playing ? ' playing' : ''}`}>
        <ProgressBar />
        <header className="top">
          <span>ten months</span><b>of us</b><span>01.01 → 01.11</span>
        </header>
        <main className="book" aria-label="Anniversary scrapbook">
          <Spreads song={song} />
        </main>
        <MusicButton song={song} />
      </div>
      {song.audio}
      <Toast text={toast} onDone={() => setToast('')} />
    </HeartBurstProvider>
  );
}
