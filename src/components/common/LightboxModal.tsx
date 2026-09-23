import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react';
import { GalleryItem } from '../../types';
import { useAppLanguage } from '../../context/LanguageContext';

interface LightboxProps {
  isOpen?: boolean;
  images?: GalleryItem[];
  items?: GalleryItem[];
  initialIndex?: number | null;
  currentIndex?: number | null;
  onClose: () => void;
  onNavigate?: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxProps> = ({
  isOpen,
  images,
  items,
  initialIndex,
  currentIndex,
  onClose,
  onNavigate
}) => {
  const { lang } = useAppLanguage();
  const galleryList = images || items || [];
  const startIdx = typeof initialIndex === 'number' ? initialIndex : (typeof currentIndex === 'number' ? currentIndex : 0);
  const [internalIndex, setInternalIndex] = useState<number>(startIdx);

  useEffect(() => {
    if (typeof initialIndex === 'number') {
      setInternalIndex(initialIndex);
    } else if (typeof currentIndex === 'number') {
      setInternalIndex(currentIndex);
    }
  }, [initialIndex, currentIndex, isOpen]);

  if (isOpen === false) return null;
  if (!galleryList || galleryList.length === 0) return null;
  if (internalIndex < 0 || internalIndex >= galleryList.length) return null;

  const currentItem = galleryList[internalIndex];
  if (!currentItem) return null;

  const handlePrev = () => {
    const nextIdx = (internalIndex - 1 + galleryList.length) % galleryList.length;
    setInternalIndex(nextIdx);
    onNavigate?.(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (internalIndex + 1) % galleryList.length;
    setInternalIndex(nextIdx);
    onNavigate?.(nextIdx);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-[#1C1917] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        onClick={e => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 bg-black/40 text-white border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#C85413]/80 text-white font-medium flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {currentItem.categoryLabel || currentItem.category}
            </span>
            {currentItem.year && (
              <span className="text-xs text-amber-200/80 flex items-center gap-1 font-mono">
                <Calendar className="w-3 h-3" />
                {currentItem.year.toLowerCase().includes('year') ? currentItem.year : /^\d{4}$/.test(currentItem.year) ? `Year ${currentItem.year}` : currentItem.year}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Container with Nav Buttons */}
        <div className="relative flex items-center justify-center bg-black min-h-[350px] max-h-[65vh]">
          <img
            src={currentItem.imageUrl}
            alt={currentItem.titleEn}
            className="max-h-[65vh] w-auto object-contain mx-auto"
            referrerPolicy="no-referrer"
          />

          {galleryList.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-105"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-105"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Caption bar */}
        <div className="p-4 sm:p-5 bg-[#221D18] text-white">
          <div className="flex items-baseline justify-between gap-4">
            <h4 className="text-base sm:text-lg font-serif font-semibold text-[#F8EFD3]">
              {lang === 'mr' ? currentItem.titleMr : currentItem.titleEn}
            </h4>
            <span className="text-xs text-white/50 shrink-0">
              {internalIndex + 1} / {galleryList.length}
            </span>
          </div>
          <p className="text-sm text-stone-300 mt-1 leading-relaxed">
            {lang === 'mr' ? (currentItem.captionMr || currentItem.captionEn) : (currentItem.captionEn || currentItem.captionMr)}
          </p>
        </div>
      </div>
    </div>
  );
};
