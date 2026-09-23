import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
  hue: number;
}

interface AgniParticlesProps {
  className?: string;
  particleCount?: number;
}

export const AgniParticles: React.FC<AgniParticlesProps> = ({ 
  className = '', 
  particleCount = 35 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];

    const createParticle = (): Particle => ({
      x: Math.random() * width,
      y: height + Math.random() * 20,
      size: Math.random() * 2.5 + 1,
      speedY: Math.random() * 1.2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.8 + 0.2,
      fadeSpeed: Math.random() * 0.005 + 0.002,
      hue: Math.floor(Math.random() * 30) + 20 // 20 to 50: Saffron, gold, fiery orange
    });

    for (let i = 0; i < particleCount; i++) {
      const p = createParticle();
      p.y = Math.random() * height; // distribute initially
      particles.push(p);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.02) * 0.3;
        p.opacity -= p.fadeSpeed;

        if (p.y < -10 || p.opacity <= 0) {
          Object.assign(p, createParticle());
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.opacity})`;
        ctx.shadowColor = `hsl(${p.hue}, 100%, 50%)`;
        ctx.shadowBlur = p.size * 3;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`pointer-events-none absolute inset-0 z-0 ${className}`} 
    />
  );
};
