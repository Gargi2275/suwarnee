/**
 * YantraReveal
 * Sri-Yantra geometry that draws itself with animated stroke-dashoffset
 * when it enters the viewport. Purely decorative / sacred watermark.
 */
import React, { useRef, useEffect, useState } from "react";

interface YantraRevealProps {
  size?: number;
  className?: string;
  /** Delay before draw starts (ms) */
  delay?: number;
  /** Duration of the draw animation (ms) */
  duration?: number;
  color?: string;
}

export const YantraReveal: React.FC<YantraRevealProps> = ({
  size = 260,
  className = "",
  delay = 200,
  duration = 2200,
  color = "#D49622",
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setDrawn(true), delay); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const strokeProps = (totalLen: number) => ({
    strokeDasharray: totalLen,
    strokeDashoffset: drawn ? 0 : totalLen,
    style: { transition: `stroke-dashoffset ${duration}ms cubic-bezier(0.22,1,0.36,1)` },
  });

  const s = size;
  const cx = s / 2, cy = s / 2, r = s * 0.46;

  // Triangle vertices (upward + downward)
  const tri = (offset: number, flip: boolean) => {
    const pts = [0, 1, 2].map((i) => {
      const a = (i * 120 + offset) * (Math.PI / 180) + (flip ? Math.PI : 0);
      return `${cx + r * 0.72 * Math.cos(a)},${cy + r * 0.72 * Math.sin(a)}`;
    });
    return pts.join(" ");
  };

  const perimCircle = 2 * Math.PI * r;
  const perimInner = 2 * Math.PI * r * 0.55;
  const perimTriBig = r * 0.72 * 3 * 1.73;
  const perimTriSmall = r * 0.52 * 3 * 1.73;
  const perimSquare = r * 0.9 * 4 * 1.41;

  return (
    <div ref={wrapRef} className={`relative inline-flex items-center justify-center ${className}`} style={{ width: s, height: s }}>
      {/* Soft golden glow aura */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`, filter: "blur(18px)" }}
      />
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="yantraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAE38A" />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor="#C85413" />
          </linearGradient>
        </defs>

        {/* Outer circle */}
        <circle cx={cx} cy={cy} r={r} stroke="url(#yantraGrad)" strokeWidth="1.4" {...strokeProps(perimCircle)} />

        {/* 16 lotus petals via dashed arc trick */}
        {[...Array(16)].map((_, i) => {
          const a = (i * 22.5) * Math.PI / 180;
          const pr = r * 0.88;
          return (
            <ellipse
              key={i}
              cx={cx + pr * Math.cos(a)}
              cy={cy + pr * Math.sin(a)}
              rx={r * 0.07}
              ry={r * 0.14}
              transform={`rotate(${i * 22.5 + 90} ${cx + pr * Math.cos(a)} ${cy + pr * Math.sin(a)})`}
              stroke="url(#yantraGrad)"
              strokeWidth="0.8"
              strokeDasharray={`${r * 0.7} ${r * 0.7}`}
              strokeDashoffset={drawn ? 0 : r * 0.7}
              style={{ transition: `stroke-dashoffset ${duration}ms ${i * 40}ms cubic-bezier(0.22,1,0.36,1)` }}
            />
          );
        })}

        {/* Inner circle */}
        <circle cx={cx} cy={cy} r={r * 0.55} stroke="url(#yantraGrad)" strokeWidth="1" {...strokeProps(perimInner)} />

        {/* Big upward triangle */}
        <polygon
          points={tri(-90, false)}
          stroke="url(#yantraGrad)"
          strokeWidth="1.2"
          {...strokeProps(perimTriBig)}
        />

        {/* Big downward triangle */}
        <polygon
          points={tri(90, true)}
          stroke="url(#yantraGrad)"
          strokeWidth="1.2"
          {...strokeProps(perimTriBig)}
        />

        {/* Small upward triangle */}
        <polygon
          points={[0, 1, 2].map((i) => {
            const a = (i * 120 - 90) * (Math.PI / 180);
            return `${cx + r * 0.52 * Math.cos(a)},${cy + r * 0.52 * Math.sin(a)}`;
          }).join(" ")}
          stroke="url(#yantraGrad)"
          strokeWidth="0.9"
          {...strokeProps(perimTriSmall)}
        />

        {/* Square (rotated 45°) */}
        <rect
          x={cx - r * 0.9 / Math.SQRT2}
          y={cy - r * 0.9 / Math.SQRT2}
          width={(r * 0.9 / Math.SQRT2) * 2}
          height={(r * 0.9 / Math.SQRT2) * 2}
          transform={`rotate(45 ${cx} ${cy})`}
          stroke="url(#yantraGrad)"
          strokeWidth="1"
          {...strokeProps(perimSquare)}
        />

        {/* Central bindu */}
        <circle cx={cx} cy={cy} r={3.5} fill={color} opacity={drawn ? 1 : 0} style={{ transition: `opacity 0.6s ${duration}ms ease` }} />
        <circle cx={cx} cy={cy} r={r * 0.08} stroke={color} strokeWidth="0.8" opacity={drawn ? 0.6 : 0} style={{ transition: `opacity 0.6s ${duration + 200}ms ease` }} />

        {/* OM text in center */}
        <text
          x={cx} y={cy + 6}
          textAnchor="middle"
          fontFamily="Noto Serif Devanagari, serif"
          fontSize={r * 0.22}
          fill={color}
          opacity={drawn ? 0.85 : 0}
          style={{ transition: `opacity 0.8s ${duration + 400}ms ease` }}
        >
          ?
        </text>
      </svg>
    </div>
  );
};
