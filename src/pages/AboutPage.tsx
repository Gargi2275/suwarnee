import React, { useState } from 'react';
import { 
  History, 
  Users, 
  Award, 
  ShieldCheck, 
  BookOpen, 
  Calendar, 
  MapPin, 
  GraduationCap, 
  Sparkles,
  Heart
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAppLanguage } from '../context/LanguageContext';
import { 
  FOUNDER_INFO, 
  COMMITTEE_MEMBERS, 
  TIMELINE_EVENTS, 
  GALLERY_ITEMS, 
  TRUST_INFO, 
  MOTTO_SHLOKA 
} from '../data/mockData';
import { TraditionalDivider, LotusIcon } from '../components/common/Motifs';
import { GalleryItem } from '../types';

interface AboutPageProps {
  onOpenLightbox: (item: GalleryItem, index: number) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenLightbox }) => {
  const { lang, openEnrollModal, setCurrentPage } = useAppLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'founder' | 'committee' | 'archival'>('overview');

  const historicalPhotos = GALLERY_ITEMS.filter(g => g.category === 'historical' || g.category === 'events');

  return (
    <div className="space-y-16 sm:space-y-20 pb-16 overflow-hidden">
      {/* 1. ABOUT HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF8F1] via-[#FAF7F2] to-[#FAF7F2] border-b border-[#E3D9C4] py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl space-y-3 sm:space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#FEEEDD] border border-[#C85413]/30 text-[#883008] text-[11px] sm:text-xs font-semibold shadow-xs">
              <History className="w-3.5 h-3.5 text-[#C85413]" />
              <span>{lang === 'mr' ? 'संस्थेचा ६८ वर्षांचा वारसा' : '68-Year Sacred Heritage (Est. 1958)'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#651728] leading-tight">
              {lang === 'mr' ? 'सुरवाणी ज्ञानमंदिर संस्थेविषयी' : 'About Surawanee Dnyanmandir'}
            </h1>
            <p className="text-sm sm:text-lg text-[#5C5348] leading-relaxed">
              {lang === 'mr'
                ? '१९५८ मध्ये ठाण्यातील तलावपाळी परिसरात एका लहान वाड्याच्या ओसरीत सुरू झालेली ही संस्था आज संस्कृत भाषा, वेदविद्या, पौरोहित्य आणि बालसंस्कारांचे अग्रगण्य केंद्र बनली आहे.'
                : 'Founded in 1958 in Thane, Maharashtra, Surawanee Dnyanmandir is a registered public trust devoted to making Sanskrit a living, accessible language and preserving pristine Vedic ritual traditions.'}
            </p>
          </motion.div>

          {/* Quick Sub-Navigation Tabs - Swipeable on mobile, flex-wrapped on tablet/desktop */}
          <div className="pt-6 sm:pt-8 border-t border-[#E3D9C4] mt-6 sm:mt-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 sm:flex-wrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 sm:mx-0 sm:px-0">
              {[
                { id: 'overview', labelEn: 'Overview & Vision', labelMr: 'ध्येय व कार्य' },
                { id: 'timeline', labelEn: 'Historic Timeline (1958-2026)', labelMr: 'कालप्रवाह (इतिहास)' },
                { id: 'founder', labelEn: 'Founding Acharya', labelMr: 'संस्थापक गुरुवर्य' },
                { id: 'committee', labelEn: 'Governing Council', labelMr: 'विश्वस्त व कार्यकारिणी' },
                { id: 'archival', labelEn: 'Archival Heritage Photos', labelMr: 'ऐतिहासिक छायाचित्रे' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-[#C85413] text-white shadow-md scale-102 ring-2 ring-[#C85413]/20'
                      : 'bg-[#FCFAF7] text-[#5C5348] hover:bg-[#F7F3EB] border border-[#D1C3A7] shadow-xs'
                  }`}
                >
                  {lang === 'mr' ? tab.labelMr : tab.labelEn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOUNDER PROFILE CARD */}
      {(activeTab === 'overview' || activeTab === 'founder') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-5 sm:p-12 rounded-3xl bg-[#FCFAF7] border-2 border-[#D49622]/40 shadow-xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 text-center">
                <motion.div 
                  whileHover={{ scale: 1.03, rotateY: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative inline-block rounded-2xl overflow-hidden border-4 border-[#D49622] shadow-xl"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <img
                    src={FOUNDER_INFO.photo}
                    alt={FOUNDER_INFO.nameEn}
                    className="w-64 h-80 object-contain bg-[#FAF7F2] p-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="text-xs text-amber-200 font-serif">॥ प्रणम्य शिरसा देवम् ॥</span>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0F2] text-[#822237] text-xs font-bold">
                  <LotusIcon size={16} />
                  <span>{lang === 'mr' ? FOUNDER_INFO.titleMr : FOUNDER_INFO.titleEn}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#651728]">
                  {lang === 'mr' ? FOUNDER_INFO.nameMr : FOUNDER_INFO.nameEn}
                </h2>
                <p className="text-sm sm:text-base text-[#4A433B] leading-relaxed">
                  {lang === 'mr' ? FOUNDER_INFO.bioMr : FOUNDER_INFO.bioEn}
                </p>

                <div className="p-4 rounded-xl bg-[#F7F3EB] border border-[#E3D9C4] text-xs sm:text-sm text-[#5C5348] italic font-serif leading-relaxed">
                  "संस्कृत ही केवळ विद्वानांची किंवा ग्रंथांची भाषा राहू नये; ती घराघरांत, बालकांच्या मुखात आणि दैनंदिन आचारात सामावली पाहिजे."
                  <span className="block not-italic text-[#883008] font-sans font-semibold text-xs mt-1">
                    — Acharya Trimbak Shastri Kunte (Founder's Convocation Address, 1965)
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* 3. INTERACTIVE HISTORIC TIMELINE */}
      {(activeTab === 'overview' || activeTab === 'timeline') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12 space-y-2"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#C85413]">
              {lang === 'mr' ? 'संस्थेचा कालप्रवाह' : 'OUR SACRED CHRONOLOGY'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#221D18]">
              {lang === 'mr' ? '१९५८ ते २०२६: एक अखंड ज्ञानयज्ञ' : 'Milestones in Sanskrit Propagation'}
            </h2>
            <TraditionalDivider variant="gold" />
          </motion.div>

          <div className="relative border-l-2 border-[#C85413]/40 ml-4 sm:ml-32 space-y-10 pl-6 sm:pl-10">
            {TIMELINE_EVENTS.map((event, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Year tag bubble */}
                <div className="absolute -left-[35px] sm:-left-[140px] top-0 flex items-center gap-2">
                  <span className="hidden sm:inline-block font-mono font-bold text-sm text-[#C85413] bg-[#FFF8F1] px-2.5 py-1 rounded-lg border border-[#C85413]/30 shadow-xs">
                    {event.year}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-[#C85413] border-4 border-[#FAF7F2] shadow-sm group-hover:scale-125 transition-transform" />
                </div>

                <div className="p-6 rounded-2xl bg-[#FCFAF7] border border-[#E3D9C4] shadow-xs group-hover:shadow-lg transition-all space-y-2 group-hover:-translate-y-1">
                  <span className="sm:hidden text-xs font-mono font-bold text-[#C85413] bg-[#FFF8F1] px-2 py-0.5 rounded border border-[#C85413]/20">
                    {event.year}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#221D18]">
                    {lang === 'mr' ? event.titleMr : event.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C5348] leading-relaxed">
                    {lang === 'mr' ? event.descriptionMr : event.descriptionEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 4. GOVERNING COMMITTEE & ADVISORY COUNCIL */}
      {(activeTab === 'overview' || activeTab === 'committee') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative text-center max-w-3xl mx-auto mb-14 space-y-3"
          >
            {/* Decorative top line */}
            <div className="flex items-center justify-center gap-3 mb-1">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#D49622]" />
              <LotusIcon size={20} />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#D49622]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#D49622]">
              {lang === 'mr' ? 'मार्गदर्शक व विश्वस्त मंडळ' : 'GOVERNING TRUSTEES & SCHOLARS'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#221D18]">
              {lang === 'mr' ? 'संस्थेचे नेतृत्व व विद्वान परिषद' : 'Distinguished Sanskrit Faculty & Trustees'}
            </h2>
            <p className="text-sm text-[#5C5348] max-w-xl mx-auto">
              {lang === 'mr'
                ? 'सुरवाणी ज्ञानमंदिरचे विश्वस्त, माजी अध्यक्ष व विद्वान मंडळींनी संस्थेला ज्ञान व परंपरेच्या मार्गावर मार्गदर्शन केले.'
                : 'Luminaries who shaped Surawanee Dnyanmandir across generations — trustees, scholars, and dedicated educators who kept the torch of Sanskrit alive.'}
            </p>
            <TraditionalDivider variant="gold" />
          </motion.div>

          {/* ── Inline keyframes for shimmer & pulse-glow ── */}
          <style>{`
            @keyframes shimmer-sweep {
              0%   { transform: translateX(-120%) skewX(-20deg); }
              100% { transform: translateX(220%) skewX(-20deg); }
            }
            @keyframes gold-pulse {
              0%, 100% { box-shadow: 0 0 0px 0px rgba(212,150,34,0), 0 4px 24px rgba(200,84,19,0.08); }
              50%       { box-shadow: 0 0 18px 3px rgba(212,150,34,0.55), 0 8px 32px rgba(200,84,19,0.18); }
            }
            @keyframes border-rotate {
              0%   { background-position: 0% 50%; }
              50%  { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .golden-card {
              position: relative;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .golden-card::before {
              content: '';
              position: absolute;
              inset: -2px;
              border-radius: inherit;
              background: linear-gradient(120deg, #D49622 0%, #FAE38A 25%, #C85413 50%, #FAE38A 75%, #D49622 100%);
              background-size: 300% 300%;
              animation: border-rotate 3.5s ease infinite;
              z-index: 0;
              opacity: 0;
              transition: opacity 0.35s ease;
            }
            .golden-card:hover::before { opacity: 1; }
            .golden-card:hover { animation: gold-pulse 2.2s ease-in-out infinite; }
            .golden-card .card-inner {
              position: relative;
              z-index: 1;
              background: #FCFAF7;
              border-radius: inherit;
              height: 100%;
            }
            .shimmer-line {
              position: absolute;
              top: 0; bottom: 0;
              width: 40%;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
              animation: shimmer-sweep 2.6s ease-in-out infinite;
            }
          `}</style>

          {/* ── Cards Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {COMMITTEE_MEMBERS.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.55 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="golden-card rounded-2xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="card-inner rounded-2xl border border-[#E3D9C4] overflow-hidden shadow-md flex flex-col">

                  {/* ── Top photo strip with overlay ── */}
                  {(member as any).photo && (
                    <div className="relative h-40 overflow-hidden bg-[#221D18]">
                      <img
                        src={(member as any).photo}
                        alt={member.nameEn}
                        className="w-full h-full object-cover opacity-75 grayscale-[30%] group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Golden shimmer sweep on hover */}
                      <div className="shimmer-line" />
                      {/* Dark-to-transparent gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1510]/80 via-[#1A1510]/20 to-transparent" />
                      {/* Role badge pinned on photo */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#D49622]/90 text-[#1A1510] text-[10px] font-bold tracking-wide shadow-sm backdrop-blur-sm">
                          <Award className="w-3 h-3" />
                          {lang === 'mr' ? member.roleMr : member.roleEn}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* ── Card Body ── */}
                  <div className="flex flex-col flex-1 p-5 space-y-3">
                    {/* Name */}
                    <div>
                      <h4 className="text-base font-serif font-bold text-[#221D18] leading-snug">
                        {lang === 'mr' ? member.nameMr : member.nameEn}
                      </h4>
                      {/* Qualification chip */}
                      <div className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold text-[#736B61] bg-[#F3EEE4] border border-[#DDD2BA] px-2 py-0.5 rounded-full">
                        <GraduationCap className="w-3 h-3 text-[#C85413]" />
                        {member.qualification}
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-[#5C5348] leading-relaxed flex-1">
                      {lang === 'mr' ? member.bioMr : member.bioEn}
                    </p>

                    {/* Footer */}
                    <div className="pt-3 border-t border-[#EFE8DA] flex items-center justify-between">
                      <span className="text-[10px] text-[#883008] font-serif italic">
                        Surawanee Dnyanmandir Trust
                      </span>
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: idx * 0.4 }}
                      >
                        <Sparkles className="w-4 h-4 text-[#D49622]" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Bottom decorative quote ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-14 text-center"
          >
            <div className="inline-block px-8 py-5 rounded-2xl bg-gradient-to-br from-[#FFF8EC] to-[#FAF7F2] border border-[#D49622]/40 shadow-inner">
              <p className="text-sm sm:text-base font-serif italic text-[#4A3B28] leading-relaxed">
                "विद्या ददाति विनयम्" — Knowledge bestows humility.
              </p>
              <span className="block mt-1 text-[11px] text-[#883008] font-sans font-semibold tracking-wide uppercase">
                — Surawanee Dnyanmandir, Est. 1958
              </span>
            </div>
          </motion.div>
        </section>
      )}

      {/* 5. ARCHIVAL PHOTO GALLERY */}
      {(activeTab === 'overview' || activeTab === 'archival') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-12 rounded-3xl bg-[#221D18] text-[#EFE8DA] relative overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D49622] font-semibold">
                  {lang === 'mr' ? 'ऐतिहासिक संग्रह' : 'ARCHIVAL PHOTO COLLECTION (1958-1985)'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                  {lang === 'mr' ? 'ठाण्यातील जुनी छायाचित्रे' : 'Preserving Thane’s Vedic Heritage'}
                </h3>
              </div>
              <button
                onClick={() => setCurrentPage('gallery')}
                className="text-xs font-semibold text-[#D49622] hover:text-white underline cursor-pointer"
              >
                {lang === 'mr' ? 'संपूर्ण दालन उघडा →' : 'Open Full Gallery & Lightbox →'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {historicalPhotos.slice(0, 3).map((photo, i) => (
                <motion.div
                  key={photo.id}
                  whileHover={{ scale: 1.04, y: -4 }}
                  onClick={() => onOpenLightbox(photo, i)}
                  className="rounded-xl overflow-hidden bg-stone-900 border border-stone-700 group cursor-pointer shadow-lg"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <img
                      src={photo.imageUrl}
                      alt={photo.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 sepia-25"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 text-[#F8EFD3] text-[10px] px-2 py-0.5 rounded font-mono">
                      {photo.year || 'Archival'}
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <h5 className="text-sm font-serif font-bold text-[#F8EFD3] group-hover:text-amber-300 transition-colors">
                      {lang === 'mr' ? photo.titleMr : photo.titleEn}
                    </h5>
                    <p className="text-xs text-stone-300 line-clamp-2">
                      {lang === 'mr' ? photo.captionMr : photo.captionEn}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
};
