import React, { useState } from 'react';
import { LOGO_PRIMARY, LOGO_SECONDARY } from '../../data/mockData';

interface TrustLogoProps {
  variant?: 'primary' | 'round' | 'footer';
  className?: string;
  height?: number | string;
  width?: number | string;
}

export const TrustLogo: React.FC<TrustLogoProps> = ({
  variant = 'primary',
  className = '',
  height = 48,
  width
}) => {
  const [imgError, setImgError] = useState(false);
  const logoSrc = variant === 'round' ? LOGO_SECONDARY : LOGO_PRIMARY;

  if (imgError) {
    return (
      <div 
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#C85413]/30 bg-[#FFF8F1] text-[#651728] font-serif font-bold text-sm tracking-tight ${className}`}
        style={{ minHeight: typeof height === 'number' ? `${height}px` : height }}
      >
        <div className="w-8 h-8 rounded-full bg-[#651728] text-white flex items-center justify-center text-xs font-bold shrink-0">
          सु
        </div>
        <div className="leading-tight">
          <div className="text-[#651728] font-bold text-xs uppercase tracking-wide">SURAWANEE</div>
          <div className="text-[10px] text-[#C85413] font-semibold">Dnyanmandir</div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={logoSrc}
      alt="Surawanee Dyan Mandir Sanskrit School"
      className={`object-contain transition-all select-none ${className}`}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
        maxHeight: '100%'
      }}
      referrerPolicy="no-referrer"
      onError={() => {
        setImgError(true);
      }}
    />
  );
};

