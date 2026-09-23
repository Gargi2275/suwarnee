/**
 * InkRevealHeading
 * Renders a heading that bleed-reveals like ink soaking into parchment.
 * Each word appears with a blur + scale-x expand from center.
 */
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

interface InkRevealHeadingProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  delay?: number;
}

export const InkRevealHeading: React.FC<InkRevealHeadingProps> = ({
  text, tag = "h2", className = "", delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = text.split(" ");
  const Tag = tag;

  return (
    <div ref={ref}>
      <Tag className={`inline-flex flex-wrap gap-x-[0.35em] gap-y-1 ${className}`} aria-label={text}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, filter: "blur(12px)", scaleX: 0.5 }}
            animate={visible ? { opacity: 1, filter: "blur(0px)", scaleX: 1 } : {}}
            transition={{
              duration: 0.55,
              delay: delay + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: "inline-block", transformOrigin: "left center" }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </div>
  );
};
