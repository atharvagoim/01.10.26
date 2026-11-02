import { useEffect } from 'react';

export default function Toast({ text, onDone }) {
  useEffect(() => {
    if (!text) return;
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [text, onDone]);
  return <div className={`toast${text ? ' show' : ''}`} role="status">{text}</div>;
}
