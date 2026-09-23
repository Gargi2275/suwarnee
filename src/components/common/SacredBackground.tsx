import React, { useEffect, useRef, useState } from 'react';

interface SacredBgProps {
  variant?: 'warm' | 'cream' | 'dark';
  intensity?: 'low' | 'medium' | 'high';
}

/**
 * Full-viewport animated sacred background layer.
 * Renders as a FIXED overlay so it is never clipped by a max-width container.
 * Opacity is very low so it blends beneath all content.
 */
export const SacredBackground: React.FC<SacredBgProps> = ({
  variant = 'cream',
  intensity = 'medium',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Only show when the parent section is in viewport
  useEffect(() => {
    const el = sectionRef.current?.parentElement;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const orbOpacity = intensity === 'low' ? 0.12 : intensity === 'high' ? 0.28 : 0.18;
  const symbolOpacity = intensity === 'low' ? 0.04 : intensity === 'high' ? 0.09 : 0.06;

  const colors =
    variant === 'dark'
      ? { orb1: '#FCD34D', orb2: '#C85413', orb3: '#D49622', sym: '#FCD34D' }
      : variant === 'warm'
      ? { orb1: '#C85413', orb2: '#D49622', orb3: '#651728', sym: '#C85413' }
      : { orb1: '#D49622', orb2: '#C85413', orb3: '#8B1A2E', sym: '#C85413' };

  return (
    /* anchor div — zero size, just used for IntersectionObserver ref */
    <div ref={sectionRef} className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>

      {/* ── Soft blurred gradient orbs ── */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 520,
          height: 520,
          top: '-15%',
          left: '-8%',
          background: colors.orb1,
          opacity: orbOpacity,
          animation: 'sacredOrb1 14s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 380,
          height: 380,
          bottom: '-12%',
          right: '-6%',
          background: colors.orb2,
          opacity: orbOpacity * 0.8,
          animation: 'sacredOrb2 18s ease-in-out infinite 3s',
        }}
      />
      <div
        className="absolute rounded-full blur-2xl"
        style={{
          width: 260,
          height: 260,
          top: '40%',
          left: '45%',
          background: colors.orb3,
          opacity: orbOpacity * 0.5,
          animation: 'sacredOrb1 11s ease-in-out infinite 6s',
        }}
      />

      {/* ── Floating Sanskrit / Devanagari symbols ── */}
      {[
        { sym: 'ॐ',  t: '8%',  l: '4%',  fs: '5rem',  delay: '0s',  dur: '20s' },
        { sym: '।।', t: '60%', l: '88%', fs: '3.5rem', delay: '4s',  dur: '24s' },
        { sym: 'ॐ',  t: '78%', l: '10%', fs: '4rem',   delay: '8s',  dur: '18s' },
        { sym: '।',  t: '20%', l: '60%', fs: '3rem',   delay: '12s', dur: '16s' },
        { sym: 'स्व', t: '50%', l: '1%', fs: '2.8rem', delay: '6s',  dur: '22s' },
      ].map((s, i) => (
        <span
          key={i}
          className="absolute font-serif select-none"
          style={{
            top: s.t,
            left: s.l,
            fontSize: s.fs,
            color: colors.sym,
            opacity: symbolOpacity,
            animation: `sacredFloat ${s.dur} ease-in-out ${s.delay} infinite alternate`,
            willChange: 'transform, opacity',
          }}
        >
          {s.sym}
        </span>
      ))}

      {/* ── Spinning lotus SVG (top-right) ── */}
      <svg
        aria-hidden
        className="absolute"
        style={{
          width: 260,
          height: 260,
          top: '4%',
          right: '2%',
          opacity: symbolOpacity * 0.8,
          animation: 'sacredSpin 70s linear infinite',
        }}
        viewBox="0 0 200 200"
        fill="none"
      >
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          const x = 100 + Math.cos(a) * 55;
          const y = 100 + Math.sin(a) * 55;
          return (
            <ellipse
              key={i}
              cx={x} cy={y} rx={18} ry={38}
              transform={`rotate(${(i / 8) * 360},${x},${y})`}
              fill={colors.orb1}
            />
          );
        })}
        <circle cx="100" cy="100" r="14" fill={colors.orb2} />
      </svg>

      {/* ── Spinning lotus SVG (bottom-left) ── */}
      <svg
        aria-hidden
        className="absolute"
        style={{
          width: 180,
          height: 180,
          bottom: '5%',
          left: '3%',
          opacity: symbolOpacity * 0.7,
          animation: 'sacredSpin 90s linear infinite reverse',
        }}
        viewBox="0 0 200 200"
        fill="none"
      >
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x = 100 + Math.cos(a) * 58;
          const y = 100 + Math.sin(a) * 58;
          return (
            <ellipse
              key={i}
              cx={x} cy={y} rx={12} ry={30}
              transform={`rotate(${(i / 12) * 360},${x},${y})`}
              fill={colors.orb3}
            />
          );
        })}
        <circle cx="100" cy="100" r="11" fill={colors.orb1} />
      </svg>

      {/* ── Pulsing concentric rings (centered) ── */}
      {[120, 220, 320, 420].map((r, i) => (
        <div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: r * 2,
            height: r * 2,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderColor: `${colors.orb1}18`,
            animation: `sacredPulse ${7 + i * 2}s ease-in-out ${i * 1.8}s infinite`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* ── Diagonal line shimmer texture ── */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.025,
          background: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 55px,
            ${colors.orb1} 55px,
            ${colors.orb1} 56px
          )`,
        }}
      />
    </div>
  );
};
