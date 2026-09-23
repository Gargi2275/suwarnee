import React, { useState } from 'react';

interface SacredMandalaProps {
  className?: string;
  size?: number;
  interactive3d?: boolean;
}

export const SacredMandala: React.FC<SacredMandalaProps> = ({
  className = '',
  size = 320,
  interactive3d = true
}) => {
  const [rotatePos, setRotatePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive3d) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 15;
    const y = (e.clientY - rect.top - rect.height / 2) / 15;
    setRotatePos({ x: -y, y: x });
  };

  const handleMouseLeave = () => {
    setRotatePos({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center transition-transform duration-300 ease-out pointer-events-auto ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        transform: `rotateX(${rotatePos.x}deg) rotateY(${rotatePos.y}deg)`
      }}
    >
      <div 
        className="relative flex items-center justify-center animate-spin-slow"
        style={{ width: size, height: size }}
      >
        {/* Glow Aura */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-yellow-500/20 blur-2xl animate-pulse" />

        {/* Outer Ring */}
        <svg 
          viewBox="0 0 200 200" 
          className="w-full h-full text-[#C85413] drop-shadow-[0_0_12px_rgba(200,84,19,0.4)]"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="50%" stopColor="#C85413" />
              <stop offset="100%" stopColor="#651728" />
            </linearGradient>
          </defs>

          {/* Outer Circle with Petals */}
          <circle cx="100" cy="100" r="95" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" strokeDasharray="4 2" />
          <circle cx="100" cy="100" r="88" fill="none" stroke="url(#goldGradient)" strokeWidth="1" />
          
          {/* 16 Lotus Petals Ring */}
          {[...Array(16)].map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <g key={i} transform={`rotate(${angle} 100 100)`}>
                <path
                  d="M100 12 Q105 24 100 30 Q95 24 100 12 Z"
                  fill="none"
                  stroke="url(#goldGradient)"
                  strokeWidth="0.8"
                />
              </g>
            );
          })}

          {/* Inner 8 Petals Ring */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8 + 22.5;
            return (
              <g key={i} transform={`rotate(${angle} 100 100)`}>
                <path
                  d="M100 35 Q108 50 100 60 Q92 50 100 35 Z"
                  fill="none"
                  stroke="url(#goldGradient)"
                  strokeWidth="1"
                />
              </g>
            );
          })}

          {/* Concentric Triangles (Sri Yantra Geometry) */}
          <polygon points="100,45 155,140 45,140" fill="none" stroke="url(#goldGradient)" strokeWidth="1.2" />
          <polygon points="100,155 155,60 45,60" fill="none" stroke="url(#goldGradient)" strokeWidth="1.2" />
          <polygon points="100,55 145,130 55,130" fill="none" stroke="url(#goldGradient)" strokeWidth="1" />
          <polygon points="100,145 145,70 55,70" fill="none" stroke="url(#goldGradient)" strokeWidth="1" />

          {/* Central Bindu Point */}
          <circle cx="100" cy="100" r="4" fill="#FCD34D" />
          <circle cx="100" cy="100" r="10" fill="none" stroke="#FCD34D" strokeWidth="0.8" />
        </svg>

        {/* Center Sacred Symbol */}
        <div className="absolute inset-0 flex items-center justify-center text-[#651728] font-serif font-black text-2xl sm:text-3xl select-none drop-shadow-[0_2px_8px_rgba(252,211,77,0.8)]">
          ॐ
        </div>
      </div>
    </div>
  );
};
