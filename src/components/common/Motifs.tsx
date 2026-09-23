import React from 'react';

export const OrgEmblem: React.FC<{ className?: string; size?: number; variant?: 'color' | 'gold' | 'white' }> = ({
  className = '',
  size = 52,
  variant = 'color'
}) => {
  const isWhite = variant === 'white';
  const isGold = variant === 'gold';

  const strokeColor = isWhite ? '#FFFFFF' : isGold ? '#D49622' : '#C85413';
  const fillColor = isWhite ? '#FFFFFF' : isGold ? '#B87C13' : '#651728';
  const goldAccent = isWhite ? '#FFFFFF' : isGold ? '#F8EFD3' : '#D49622';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
      aria-label="Surawanee Dnyanmandir Emblem"
    >
      {/* Outer concentric sacred circle */}
      <circle cx="50" cy="50" r="47" stroke={strokeColor} strokeWidth="2.5" strokeDasharray="3 2" opacity="0.8" />
      <circle cx="50" cy="50" r="43" stroke={goldAccent} strokeWidth="1.5" />
      
      {/* 8 Radial Lotus Petals Background */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 50 50)`}>
          <path
            d="M50 8 C47 18, 45 28, 50 34 C55 28, 53 18, 50 8 Z"
            fill={isWhite ? 'rgba(255,255,255,0.2)' : isGold ? 'rgba(212,150,34,0.25)' : 'rgba(200,84,19,0.15)'}
            stroke={goldAccent}
            strokeWidth="0.8"
          />
        </g>
      ))}

      {/* Center Sun & Knowledge Rays */}
      <circle cx="50" cy="46" r="22" fill={isWhite ? 'rgba(255,255,255,0.15)' : isGold ? '#FDF9EE' : '#FFF8F1'} stroke={strokeColor} strokeWidth="1.5" />

      {/* Open Palm-leaf / Manuscript Book */}
      <path
        d="M34 58 C40 54, 46 54, 50 56 C54 54, 60 54, 66 58 L64 64 C58 60, 53 60, 50 62 C47 60, 42 60, 36 64 Z"
        fill={strokeColor}
      />
      <line x1="50" y1="56" x2="50" y2="62" stroke={goldAccent} strokeWidth="1.2" />

      {/* Sacred Flame (Diya / Jyoti) Rising from Book */}
      <path
        d="M50 32 C46 39, 44 44, 46 48 C48 51, 52 51, 54 48 C56 44, 54 39, 50 32 Z"
        fill={isWhite ? '#FFFFFF' : isGold ? '#D49622' : '#C85413'}
      />
      <path
        d="M50 38 C48 42, 47 45, 48 47 C49 49, 51 49, 52 47 C53 45, 52 42, 50 38 Z"
        fill={goldAccent}
      />

      {/* Base Brass Lamp Pedestal */}
      <path
        d="M44 65 C44 63, 56 63, 56 65 L54 69 C55 70, 55 71, 57 72 L43 72 C45 71, 45 70, 46 69 Z"
        fill={fillColor}
      />

      {/* Sanskrit Veena / Sacred curves */}
      <circle cx="50" cy="50" r="1.5" fill={goldAccent} />
    </svg>
  );
};

export const TraditionalDivider: React.FC<{
  className?: string;
  variant?: 'saffron' | 'gold' | 'maroon' | 'subtle';
}> = ({ className = '', variant = 'saffron' }) => {
  const colorMap = {
    saffron: 'text-[#C85413]',
    gold: 'text-[#B87C13]',
    maroon: 'text-[#651728]',
    subtle: 'text-[#D1C3A7]'
  };

  return (
    <div className={`flex items-center justify-center gap-3 my-6 select-none ${className}`}>
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-current opacity-40" />
      <span className={`inline-flex items-center gap-1.5 ${colorMap[variant]}`}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9" />
        </svg>
        <span className="text-xs tracking-widest font-serif">ॐ</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9" />
        </svg>
      </span>
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-current opacity-40" />
    </div>
  );
};

export const LotusIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2C11 6 8 9 5 11C7.5 12 10 11.5 12 10C14 11.5 16.5 12 19 11C16 9 13 6 12 2Z" opacity="0.9" />
    <path d="M12 10C10.5 13 7.5 15 3 15C5 17 8 17.5 11 16C11.5 17.5 12 19 12 21C12 19 12.5 17.5 13 16C16 17.5 19 17 21 15C16.5 15 13.5 13 12 10Z" />
    <path d="M7 17C9 19.5 11 21 12 22C13 21 15 19.5 17 17C14.5 18 9.5 18 7 17Z" opacity="0.75" />
  </svg>
);

export const DiyaIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3C11 6 9.5 7.5 10 9.5C10.5 11 12 11 12 11C12 11 13.5 11 14 9.5C14.5 7.5 13 6 12 3Z" fill="currentColor" opacity="0.8" />
    <path d="M4 14C4 18 7.5 20 12 20C16.5 20 20 18 20 14C20 12 17 12 12 12C7 12 4 12 4 14Z" fill="currentColor" fillOpacity="0.15" />
    <path d="M8 20L6 22H18L16 20" />
  </svg>
);
