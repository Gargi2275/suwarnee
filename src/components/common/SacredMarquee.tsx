import React from 'react';
import { useAppLanguage } from '../../context/LanguageContext';

const SHLOKAS_EN = [
  '॥ विद्या ददाति विनयम् ॥',
  '— Knowledge bestows humility —',
  '॥ संस्कृतं सर्वभाषाणां जननी ॥',
  '— Sanskrit, the mother of all languages —',
  '॥ आचार्यात् पादमादत्ते पादं शिष्यः स्वमेधया ॥',
  '— A quarter from the teacher, a quarter from one\'s own intellect —',
  '॥ सा विद्या या विमुक्तये ॥',
  '— That is education which liberates —',
  '॥ ज्ञानं परमं बलम् ॥',
  '— Knowledge is the highest strength —',
];

const SHLOKAS_MR = [
  '॥ विद्या ददाति विनयम् ॥',
  '— ज्ञान नम्रता देते —',
  '॥ संस्कृतं सर्वभाषाणां जननी ॥',
  '— संस्कृत सर्व भाषांची जननी —',
  '॥ सा विद्या या विमुक्तये ॥',
  '— जी विद्या मुक्ती देते, तीच खरी विद्या —',
  '॥ ज्ञानं परमं बलम् ॥',
  '— ज्ञान हे सर्वोच्च बळ आहे —',
  '॥ सुरवाणी ज्ञानमंदिर, ठाणे — स्था. १९५८ ॥',
];

/**
 * Continuously scrolling Sanskrit shloka marquee strip.
 * Pauses on hover. Uses pure CSS animation (wave-scroll).
 */
export const SacredMarquee: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { lang } = useAppLanguage();
  const items = lang === 'mr' ? SHLOKAS_MR : SHLOKAS_EN;
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-r from-[#651728] via-[#7D1E30] to-[#651728] border-y border-[#D49622]/40 py-2.5 ${className}`}
      aria-label="Sacred Sanskrit Shlokas"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#651728] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#651728] to-transparent z-10 pointer-events-none" />

      <div className="sacred-marquee-track" style={{ willChange: 'transform' }}>
        {doubled.map((item, i) => (
          <React.Fragment key={i}>
            <span
              className="inline-block text-[#FAE38A] text-xs sm:text-sm font-serif tracking-widest px-6 select-none"
              style={{
                textShadow: '0 0 12px rgba(212,150,34,0.7)',
              }}
            >
              {item}
            </span>
            <span className="text-[#D49622]/60 text-xs select-none" aria-hidden>✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
