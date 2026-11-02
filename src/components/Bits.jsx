import { useEffect, useId, useRef, useState } from 'react';
import { config } from '../config.js';

export const H_OUT = 'M50 92C20 70 0 52 0 29 0 12 12 0 28 0c10 0 17 5 22 13C55 5 62 0 72 0c16 0 28 12 28 29 0 23-20 41-50 63z';
const H_IN = 'M50 86C23 66 5 49 5 29 5 15 15 5 28 5c9 0 17 5 22 14C55 10 63 5 72 5c13 0 23 10 23 24 0 20-18 37-45 57z';
const H_LOCKET = 'M50 82C24 64 8 48 8 30 8 17 17 8 29 8c9 0 16 5 21 13C55 13 62 8 71 8c12 0 21 9 21 22 0 18-16 34-42 52z';
const cleanId = (id) => 'h' + id.replace(/[^a-zA-Z0-9]/g, '');

/* Stickers drift in the free space of each page: they measure the text and photos and pick spots that touch none of them */
const SLOTS = [[4, 3], [79, 3], [4, 44], [79, 46], [4, 80], [78, 82], [41, 3], [41, 82], [4, 22], [79, 24], [4, 62], [79, 64], [22, 3], [60, 3], [22, 82], [60, 82]];
const AVOID = '.wd,.script,.label,.polaroid,.cal,.counter,.hp,.locket,.ph,.cap,img:not(.stk),svg,figure,button,.lace,.plaid';
let pageNo = 0;
const hit = (a, b, pad) => a.l < b.r + pad && a.r + pad > b.l && a.t < b.b + pad && a.b + pad > b.t;

function Floaters({ n, cvRef, inView }) {
  const count = 5;
  const [pos, setPos] = useState(() => Array(count).fill(null));
  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return undefined;
    const run = () => {
      const cr = cv.getBoundingClientRect();
      const W = cr.width, H = cr.height;
      if (!W) return;
      const rel = (r) => ({ l: r.left - cr.left, r: r.right - cr.left, t: r.top - cr.top, b: r.bottom - cr.top });
      const avoid = [];
      const walker = document.createTreeWalker(cv, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (!node.nodeValue.trim() || node.parentElement.closest('.stk')) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        for (const q of range.getClientRects()) avoid.push(rel(q));
      }
      cv.querySelectorAll(AVOID).forEach((el) => { if (!el.classList.contains('stk')) avoid.push(rel(el.getBoundingClientRect())); });
      const pad = W * 0.045, sw = W * 0.14, step = W * 0.04;
      const imgs = cv.querySelectorAll('.stk');
      const placed = [];
      const next = [];
      for (let k = 0; k < count; k++) {
        const im = imgs[k];
        const sh = im && im.naturalWidth ? sw * im.naturalHeight / im.naturalWidth : sw * 1.2;
        const [px, py] = SLOTS[(n * 5 + k * 3) % SLOTS.length];
        const tx = px / 100 * W, ty = py / 100 * H;
        const cands = [];
        for (let x = pad; x <= W - sw - pad; x += step) for (let y = pad; y <= H - sh - pad; y += step) cands.push([x, y]);
        cands.sort((a, b) => Math.hypot(a[0] - tx, a[1] - ty) - Math.hypot(b[0] - tx, b[1] - ty));
        const spot = cands.find(([x, y]) => {
          const box = { l: x, r: x + sw, t: y, b: y + sh };
          return !avoid.some((a) => hit(box, a, pad)) && !placed.some((a) => hit(box, a, pad));
        });
        if (spot) placed.push({ l: spot[0], r: spot[0] + sw, t: spot[1], b: spot[1] + sh });
        next.push(spot ? [spot[0] / W * 100, spot[1] / H * 100] : null);
      }
      setPos((old) => (JSON.stringify(old) === JSON.stringify(next) ? old : next));
    };
    const timers = [200, 1200, 2800].map((t) => setTimeout(run, t));
    window.addEventListener('resize', run);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
    return () => { timers.forEach(clearTimeout); window.removeEventListener('resize', run); };
  }, [n, cvRef, inView]);

  return pos.map((p, k) => {
    const i = n * 5 + k;
    return (
      <img key={k} className="stk" src={`/img/stk/s${(i * 5) % 23 + 1}.png`} alt="" aria-hidden="true"
        style={{ left: p ? `${p[0]}%` : 0, top: p ? `${p[1]}%` : 0, visibility: p ? 'visible' : 'hidden', '--d': `${6 + (i * 7) % 6}s`, '--dl': `${-(i * 1.7) % 9}s`, '--r': `${(i % 2 ? 1 : -1) * (6 + (i % 4) * 4)}deg` }} />
    );
  });
}

/* A page: full-width band with a fixed-ratio canvas inside. Adds .in once it scrolls into view. */
export function Page({ className = '', children }) {
  const ref = useRef(null);
  const cvRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [n] = useState(() => pageNo++);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0.18 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <article ref={ref} className={`page ${className}${inView ? ' in' : ''}`}>
      <div className="cv" ref={cvRef}><Floaters n={n} cvRef={cvRef} inView={inView} />{children}</div>
    </article>
  );
}

/* A photo clipped into a heart with a white rim */
export function HeartPhoto({ src, className = '', style }) {
  const id = cleanId(useId());
  return (
    <div className={`hp ${className}`} style={style}>
      <svg viewBox="-2 -2 104 96">
        <clipPath id={id}><path d={H_IN} /></clipPath>
        <path d={H_OUT} fill="#fff" />
        <image href={src} x="0" y="0" width="100" height="92" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${id})`} />
      </svg>
    </div>
  );
}

/* Two-heart locket on a chain */
export function Locket({ left, right }) {
  const a = cleanId(useId());
  const OUT = 'M50 92C20 70 0 52 0 29 0 12 12 0 28 0c10 0 17 5 22 13C55 5 62 0 72 0c16 0 28 12 28 29 0 23-20 41-50 63z';
  const metal = `url(#${a}m)`, chain = `url(#${a}c)`;
  const Heart = ({ id, src, transform }) => (
    <g transform={transform}>
      <clipPath id={id}><path d={H_LOCKET} /></clipPath>
      <path d={OUT} fill={metal} stroke="#7d808b" strokeWidth=".8" />
      <path d={OUT} fill="none" stroke="#fff" strokeOpacity=".85" strokeWidth="1.4" transform="translate(50 46) scale(.965) translate(-50 -46)" />
      <image href={src} x="8" y="6" width="84" height="84" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${id})`} />
      <path d={H_LOCKET} fill="none" stroke="#5f626d" strokeOpacity=".75" strokeWidth="1.6" />
      <path d={H_LOCKET} fill={`url(#${a}g)`} />
    </g>
  );
  /* a chain: dashed "links" in silver with a thin highlight on top */
  const Chain = ({ d }) => (
    <>
      <path d={d} fill="none" stroke="#6c6f7a" strokeWidth="4.2" strokeLinecap="round" strokeDasharray="4.6 1.6" />
      <path d={d} fill="none" stroke={chain} strokeWidth="3.2" strokeLinecap="round" strokeDasharray="4.6 1.6" />
      <path d={d} fill="none" stroke="#fff" strokeOpacity=".75" strokeWidth=".9" strokeLinecap="round" strokeDasharray="2.6 3.6" transform="translate(-.6 -.9)" />
    </>
  );
  const Ring = ({ cx, cy, r }) => (
    <>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#6c6f7a" strokeWidth="3.4" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={chain} strokeWidth="2.4" />
    </>
  );
  return (
    <svg className="locket" viewBox="0 0 240 210" aria-label="Locket with our photos">
      <defs>
        <linearGradient id={a + 'm'} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbfbfd" /><stop offset=".35" stopColor="#c3c6d0" /><stop offset=".55" stopColor="#8f929d" /><stop offset=".8" stopColor="#d9dbe3" /><stop offset="1" stopColor="#a4a7b2" />
        </linearGradient>
        <linearGradient id={a + 'c'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3f4f8" /><stop offset=".5" stopColor="#b5b8c3" /><stop offset="1" stopColor="#e6e8ee" />
        </linearGradient>
        <linearGradient id={a + 'g'} x1=".1" y1="0" x2=".7" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".5" /><stop offset=".35" stopColor="#fff" stopOpacity=".08" /><stop offset=".36" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#fff" stopOpacity=".1" />
        </linearGradient>
      </defs>
      <Chain d="M-70 -80 Q40 20 120 40" />
      <Chain d="M310 -80 Q200 20 120 40" />
      <Ring cx="120" cy="45" r="6" />
      <Chain d="M120 52 Q92 56 62 66" />
      <Chain d="M120 52 Q150 54 180 62" />
      <Heart id={a + 'l'} src={left} transform="translate(16 54) rotate(-12 50 46)" />
      <Heart id={a + 'r'} src={right} transform="translate(124 50) rotate(10 50 46)" />
      <Ring cx="59.5" cy="66.5" r="3.6" />
      <Ring cx="180" cy="62.5" r="3.6" />
    </svg>
  );
}

/* Month calendar with the anniversary day inside a heart */
export function Calendar() {
  const { year, month, day } = config.calendar;
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  return (
    <div className="cal">
      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={'w' + i} className="dow">{d}</span>)}
      {Array.from({ length: first }, (_, i) => <span key={'b' + i} />)}
      {Array.from({ length: days }, (_, i) => i + 1).map((d) => d === day ? (
        <span key={d} className="d one">{d}<svg viewBox="0 0 100 92"><path d={H_OUT} /></svg></span>
      ) : <span key={d} className="d">{d}</span>)}
    </div>
  );
}

/* Live time-together counter */
export function Counter() {
  const start = new Date(config.startedAt).getTime();
  const calc = () => {
    let s = Math.max(0, Math.floor((Date.now() - start) / 1000));
    const d = Math.floor(s / 86400); s %= 86400;
    const h = Math.floor(s / 3600); s %= 3600;
    return { d, h, m: Math.floor(s / 60), s: s % 60 };
  };
  const [t, setT] = useState(calc);
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id); }, []);
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <div className="counter">
      <div><b>{t.d}</b><span>days</span></div>
      <div><b>{pad(t.h)}</b><span>hours</span></div>
      <div><b>{pad(t.m)}</b><span>mins</span></div>
      <div><b>{pad(t.s)}</b><span>secs</span></div>
    </div>
  );
}
