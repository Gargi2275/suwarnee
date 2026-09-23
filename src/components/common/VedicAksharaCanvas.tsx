/**
 * VedicAksharaCanvas
 * Floating Sanskrit aksharas that rise like sacred smoke / agni sparks.
 * Pure Canvas — zero DOM overhead, 60fps.
 */
import React, { useEffect, useRef } from "react";

interface VedicAksharaCanvasProps {
  count?: number;
  opacity?: number;
  height?: number | string;
  className?: string;
}

const AKSHARAS = [
  "?","????","?????","?????","??",
  "??","???","?","?","?","?","?","?",
  "?","?","?","?","?","?","?","?","?","?",
  "?","?","?","?","?","?","?","?","?","?","?",
  "?","???","???"
];

const COLORS = [
  "rgba(212,150,34,",
  "rgba(200,84,19,",
  "rgba(101,23,40,",
  "rgba(252,211,77,",
];

interface Particle {
  x: number; y: number; vx: number; vy: number;
  alpha: number; alphaDecay: number; size: number;
  char: string; color: string; rotation: number; rotSpeed: number;
  wobble: number; wobbleSpeed: number;
}

function createParticle(w: number, h: number): Particle {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  return {
    x: Math.random() * w,
    y: h + Math.random() * 60,
    vx: (Math.random() - 0.5) * 0.6,
    vy: -(0.3 + Math.random() * 0.7),
    alpha: 0.08 + Math.random() * 0.22,
    alphaDecay: 0.0003 + Math.random() * 0.0004,
    size: 12 + Math.random() * 22,
    char: AKSHARAS[Math.floor(Math.random() * AKSHARAS.length)],
    color,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.01,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.01 + Math.random() * 0.02,
  };
}

export const VedicAksharaCanvas: React.FC<VedicAksharaCanvasProps> = ({
  count = 28, opacity = 1, height = "100%", className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    particlesRef.current = Array.from({ length: count }, () => {
      const p = createParticle(canvas.width, canvas.height);
      p.y = Math.random() * canvas.height;
      return p;
    });

    const loop = () => {
      const w = canvas.width; const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      particlesRef.current.forEach((p, i) => {
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * 0.3;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.alpha -= p.alphaDecay;
        if (p.alpha <= 0 || p.y < -40) { particlesRef.current[i] = createParticle(w, h); return; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font = `${p.size}px "Noto Serif Devanagari", serif`;
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full pointer-events-none select-none ${className}`}
      style={{ height, opacity }}
      aria-hidden="true"
    />
  );
};
