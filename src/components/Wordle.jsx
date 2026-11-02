import { useCallback, useEffect, useRef, useState } from 'react';

const WORD = 'KUCHU';
const ROWS = 6;
const KEYS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

/* score a guess: 'g' right spot, 'y' wrong spot, 'x' not in the word (handles repeated letters like the two U's) */
function score(guess) {
  const res = Array(WORD.length).fill('x');
  const left = {};
  for (let i = 0; i < WORD.length; i++) {
    if (guess[i] === WORD[i]) res[i] = 'g';
    else left[WORD[i]] = (left[WORD[i]] || 0) + 1;
  }
  for (let i = 0; i < WORD.length; i++) {
    if (res[i] === 'g') continue;
    if (left[guess[i]] > 0) { res[i] = 'y'; left[guess[i]]--; }
  }
  return res;
}

export default function Wordle() {
  const [rows, setRows] = useState([]);
  const [cur, setCur] = useState('');
  const [shake, setShake] = useState(false);
  const rootRef = useRef(null);
  const won = rows.length > 0 && rows[rows.length - 1] === WORD;
  const over = won || rows.length >= ROWS;
  const lost = over && !won;

  const press = useCallback((k) => {
    if (over) return;
    if (k === 'ENTER') {
      if (cur.length < WORD.length) { setShake(true); setTimeout(() => setShake(false), 400); return; }
      setRows((r) => [...r, cur]);
      setCur('');
    } else if (k === 'DEL') setCur((c) => c.slice(0, -1));
    else if (cur.length < WORD.length) setCur((c) => c + k);
  }, [cur, over]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const r = rootRef.current && rootRef.current.getBoundingClientRect();
      if (!r || r.bottom < 0 || r.top > window.innerHeight) return;
      if (e.key === 'Enter') press('ENTER');
      else if (e.key === 'Backspace') press('DEL');
      else if (/^[a-zA-Z]$/.test(e.key)) press(e.key.toUpperCase());
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [press]);

  const best = {};
  rows.forEach((g) => score(g).forEach((s, i) => {
    const c = g[i];
    if (best[c] === 'g' || (best[c] === 'y' && s !== 'g')) return;
    best[c] = s;
  }));

  return (
    <div className="wordle wd" ref={rootRef}>
      {lost && <img className="wangry" src="/img/angry-cat.png" alt="" draggable="false" />}
      <div className="wtitle">Wordle</div>
      <div className="wsub">{won ? 'you got me ♥' : over ? 'you dont look me enough' : 'guess the word'}</div>
      <div className={`wgrid${shake ? ' shake' : ''}`}>
        {Array.from({ length: ROWS }, (_, r) => {
          const done = r < rows.length;
          const text = done ? rows[r] : r === rows.length ? cur : '';
          const sc = done ? score(rows[r]) : null;
          return (
            <div className="wrow" key={r}>
              {Array.from({ length: WORD.length }, (_, c) => (
                <div key={c} className={`wtile${sc ? ' ' + sc[c] : ''}${text[c] ? ' fill' : ''}`}>{text[c] || ''}</div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="wkeys">
        {KEYS.map((row, i) => (
          <div className="wkrow" key={row}>
            {i === 2 && <button type="button" className="wk wide" onClick={() => press('ENTER')}>enter</button>}
            {row.split('').map((k) => <button type="button" key={k} className={`wk ${best[k] || ''}`} onClick={() => press(k)}>{k}</button>)}
            {i === 2 && <button type="button" className="wk wide" onClick={() => press('DEL')} aria-label="Delete">⌫</button>}
          </div>
        ))}
      </div>
      {over && <button type="button" className="wagain" onClick={() => { setRows([]); setCur(''); }}>{lost ? 'try again' : 'play again'}</button>}
    </div>
  );
}
