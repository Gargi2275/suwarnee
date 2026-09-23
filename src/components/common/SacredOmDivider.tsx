/**
 * SacredOmDivider
 * A premium section divider: central OM symbol with 3 radiating glow rings
 * and two ink-draw horizontal lines emanating from center.
 */
import React from "react";
import { motion } from "motion/react";

interface SacredOmDividerProps {
  className?: string;
  color?: "gold" | "maroon" | "saffron";
}

const COLOR_MAP = {
  gold:    { primary: "#D49622", secondary: "#FAE38A", glow: "rgba(212,150,34,0.35)" },
  maroon:  { primary: "#651728", secondary: "#822237", glow: "rgba(101,23,40,0.30)" },
  saffron: { primary: "#C85413", secondary: "#F97316", glow: "rgba(200,84,19,0.35)" },
};

export const SacredOmDivider: React.FC<SacredOmDividerProps> = ({ className = "", color = "gold" }) => {
  const c = COLOR_MAP[color];

  return (
    <div className={`flex items-center justify-center gap-0 py-6 ${className}`} aria-hidden="true">
      {/* Left animated ink line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          transformOrigin: "right center",
          height: "1.5px",
          width: "clamp(60px, 20vw, 220px)",
          background: `linear-gradient(to left, ${c.primary}, transparent)`,
        }}
      />

      {/* Central Om with rings */}
      <div className="relative flex items-center justify-center mx-4 shrink-0" style={{ width: 56, height: 56 }}>
        {/* Radiating rings */}
        {[0, 0.6, 1.2].map((delay) => (
          <motion.div
            key={delay}
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: c.glow }}
            animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
            transition={{ duration: 2.4, delay, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
        {/* Soft background glow */}
        <div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)`, filter: "blur(6px)" }} />
        {/* Om symbol */}
        <motion.span
          className="relative z-10 font-serif font-black select-none"
          style={{ fontSize: 26, color: c.primary, textShadow: `0 0 16px ${c.glow}` }}
          animate={{ textShadow: [`0 0 8px ${c.glow}`, `0 0 24px ${c.glow}`, `0 0 8px ${c.glow}`] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          ?
        </motion.span>
      </div>

      {/* Right animated ink line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          transformOrigin: "left center",
          height: "1.5px",
          width: "clamp(60px, 20vw, 220px)",
          background: `linear-gradient(to right, ${c.primary}, transparent)`,
        }}
      />
    </div>
  );
};
