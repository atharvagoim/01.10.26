import { useRef, useState } from 'react';
import { useBurst } from './HeartBurst.jsx';

export default function Intro({ onOpen }) {
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);
  const envRef = useRef(null);
  const burst = useBurst();

  const handleOpen = () => {
    if (open) return;
    setOpen(true);
    onOpen();
    const r = envRef.current.getBoundingClientRect();
    setTimeout(() => burst(r.left + r.width / 2, r.top + r.height / 3, 14), 700);
    setTimeout(() => setGone(true), 1700);
  };

  return (
    <div className={`intro${gone ? ' gone' : ''}`}>
      <div className="box">
        <div className="tapTop">tap to open</div>
        <div
          ref={envRef}
          className={`env${open ? ' open' : ''}`}
          role="button"
          tabIndex={0}
          aria-label="Open the letter"
          onClick={handleOpen}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpen(); } }}
        >
          <img src="/img/envelope.png" alt="" draggable="false" />
        </div>
        <img className="cat" src="/img/cat.png" alt="" draggable="false" />
      </div>
    </div>
  );
}
