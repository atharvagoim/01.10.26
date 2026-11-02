import { useState } from 'react';
import { config } from '../config.js';

/* First screen: nothing else is rendered until the password is right (the check is client-side, so it is a gentle lock, not real security) */
export default function Gate({ onOk }) {
  const [val, setVal] = useState('');
  const [bad, setBad] = useState(false);
  const [shake, setShake] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (config.password && val.trim().toLowerCase() === config.password.toLowerCase()) { onOk(); return; }
    setBad(true);
    setShake(true);
    setTimeout(() => setShake(false), 450);
  };

  return (
    <div className="gate">
      <form className="gbox" onSubmit={submit}>
        <img className="gcat" src={bad ? '/img/angry-cat.png' : '/img/cat.png'} alt="" draggable="false" />
        <div className="gtitle">password?</div>
        <input
          className={`ginput${shake ? ' shake' : ''}`}
          type="password"
          value={val}
          onChange={(e) => { setVal(e.target.value); setBad(false); }}
          placeholder="type it here"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          autoFocus
          aria-label="Password"
        />
        <div className="gmsg" aria-live="polite">{bad ? 'wrong, try again' : '\u00a0'}</div>
        <button className="gbtn" type="submit">enter</button>
      </form>
    </div>
  );
}
