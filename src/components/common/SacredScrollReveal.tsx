import React, { useEffect, useRef, ReactNode } from 'react';

type RevealDirection = 'up' | 'left' | 'right' | 'scale';

interface SacredScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;        // ms
  threshold?: number;    // 0-1
  className?: string;
  once?: boolean;
}

const directionClass: Record<RevealDirection, string> = {
  up:    'scroll-hidden',
  left:  'scroll-hidden-left',
  right: 'scroll-hidden-right',
  scale: 'scroll-hidden',
};

/**
 * Wraps any content with a CSS-class-based scroll reveal animation.
 * Uses IntersectionObserver to add `.scroll-visible` when the element enters viewport.
 */
export const SacredScrollReveal: React.FC<SacredScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  threshold = 0.12,
  className = '',
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Apply delay via inline style
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('scroll-visible');
          if (once) observer.disconnect();
        } else if (!once) {
          el.classList.remove('scroll-visible');
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, once, threshold]);

  return (
    <div ref={ref} className={`${directionClass[direction]} ${className}`}>
      {children}
    </div>
  );
};

/**
 * Animated sacred stat number display.
 * Counts from 0 to the target value when it enters the viewport.
 */
interface SacredStatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  labelMr?: string;
  lang?: string;
  delay?: number;
  icon?: ReactNode;
}

export const SacredStat: React.FC<SacredStatProps> = ({
  value,
  suffix = '',
  prefix = '',
  label,
  labelMr,
  lang = 'en',
  delay = 0,
  icon,
}) => {
  const displayRef = useRef<HTMLSpanElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const display = displayRef.current;
    if (!el || !display) return;

    let frame: number;
    const duration = 1800;
    const startTime: { t: number | null } = { t: null };

    const animate = (timestamp: number) => {
      if (!startTime.t) startTime.t = timestamp;
      const elapsed = timestamp - startTime.t;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      display.textContent = `${prefix}${Math.round(eased * value)}${suffix}`;
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            frame = requestAnimationFrame(animate);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, suffix, prefix, delay]);

  return (
    <div ref={ref} className="text-center group">
      {icon && (
        <div className="flex justify-center mb-2 text-[#D49622] group-hover:scale-125 transition-transform duration-300">
          {icon}
        </div>
      )}
      <div className="text-3xl sm:text-4xl font-serif font-black stat-glow text-[#651728]">
        <span ref={displayRef}>{prefix}0{suffix}</span>
      </div>
      <div className="text-xs sm:text-sm text-[#5C5348] mt-1 font-semibold tracking-wide">
        {lang === 'mr' && labelMr ? labelMr : label}
      </div>
    </div>
  );
};
