import { createContext, useCallback, useContext, useEffect, useRef } from 'react';

const BurstContext = createContext(() => {});
export const useBurst = () => useContext(BurstContext);

const COLORS = ['#ff4d6d', '#ffb3c1', '#ffffff', '#c9184a', '#f1c9c4'];
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function drawHeart(ctx, x, y, s) {
  ctx.beginPath();
  ctx.moveTo(x, y + s * 0.3);
  ctx.bezierCurveTo(x, y, x - s * 0.5, y, x - s * 0.5, y + s * 0.3);
  ctx.bezierCurveTo(x - s * 0.5, y + s * 0.6, x, y + s * 0.8, x, y + s);
  ctx.bezierCurveTo(x, y + s * 0.8, x + s * 0.5, y + s * 0.6, x + s * 0.5, y + s * 0.3);
  ctx.bezierCurveTo(x + s * 0.5, y, x, y, x, y + s * 0.3);
  ctx.fill();
}

// One full-screen canvas; it only animates while hearts are on screen.
export function HeartBurstProvider({ children }) {
  const canvasRef = useRef(null);
  const parts = useRef([]);
  const running = useRef(false);

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv.getContext('2d');
    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = window.innerWidth * dpr;
      cv.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener('resize', size);
    return () => window.removeEventListener('resize', size);
  }, []);

  const loop = useCallback(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    parts.current = parts.current.filter((p) => p.life > 0);
    for (const p of parts.current) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.vx *= 0.98; p.life -= 0.016;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.c;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      drawHeart(ctx, 0, -p.s / 2, p.s);
      ctx.restore();
    }
    if (parts.current.length) requestAnimationFrame(loop);
    else running.current = false;
  }, []);

  const burst = useCallback((x, y, n = 14) => {
    if (reduceMotion()) return;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const v = 4 + Math.random() * 6;
      parts.current.push({
        x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 3,
        s: 14 + Math.random() * 18, life: 1, c: COLORS[i % COLORS.length], r: (Math.random() - 0.5) * 0.3,
      });
    }
    if (!running.current) { running.current = true; requestAnimationFrame(loop); }
  }, [loop]);

  return (
    <BurstContext.Provider value={burst}>
      {children}
      <canvas ref={canvasRef} className="fx" aria-hidden="true" />
    </BurstContext.Provider>
  );
}
