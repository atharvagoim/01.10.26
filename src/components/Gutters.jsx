import { img } from '../config.js';

/* Desktop only: fills the empty side margins with tilted polaroids and stickers (positions are % of the margin) */
const LEFT = [
  { k: 'p', f: 'bday-sq.jpg', x: 14, y: 5, w: 52, r: -7 },
  { k: 's', n: 9, x: 66, y: 27, w: 24, r: 10 },
  { k: 'p', f: 'kiss-sq.jpg', x: 34, y: 36, w: 46, r: 6 },
  { k: 's', n: 2, x: 8, y: 52, w: 26, r: -8 },
  { k: 'p', f: 'auto1-sq.jpg', x: 12, y: 62, w: 48, r: -5 },
  { k: 's', n: 14, x: 64, y: 82, w: 24, r: 12 },
  { k: 's', n: 6, x: 18, y: 88, w: 22, r: -10 },
];
const RIGHT = [
  { k: 's', n: 5, x: 12, y: 3, w: 24, r: -9 },
  { k: 'p', f: 'elev-sq.jpg', x: 38, y: 12, w: 50, r: 7 },
  { k: 's', n: 17, x: 10, y: 34, w: 26, r: 9 },
  { k: 'p', f: 'cheek-sq.jpg', x: 14, y: 46, w: 46, r: -6 },
  { k: 's', n: 21, x: 70, y: 64, w: 24, r: 8 },
  { k: 'p', f: 'auto2-sq.jpg', x: 36, y: 70, w: 48, r: 5 },
  { k: 's', n: 12, x: 12, y: 88, w: 24, r: -12 },
];

function Panel({ side, items }) {
  return (
    <div className={`gutter ${side}`} aria-hidden="true">
      {items.map((it, i) => {
        const style = { left: `${it.x}%`, top: `${it.y}%`, width: `${it.w}%`, '--r': `${it.r}deg`, '--d': `${6 + (i * 5) % 5}s`, '--dl': `${-i * 1.4}s` };
        return it.k === 'p'
          ? <figure key={i} className="gph" style={style}><img src={img(it.f)} alt="" draggable="false" /></figure>
          : <img key={i} className="gst" style={style} src={`/img/stk/s${it.n}.png`} alt="" draggable="false" />;
      })}
    </div>
  );
}

export default function Gutters() {
  return (
    <>
      <Panel side="l" items={LEFT} />
      <Panel side="r" items={RIGHT} />
    </>
  );
}
