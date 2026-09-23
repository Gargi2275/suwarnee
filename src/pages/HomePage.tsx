import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Phone, 
  Mail, 
  Play, 
  ShieldCheck,
  ChevronRight, 
  ChevronLeft, 
  Volume2, 
  HeartHandshake, 
  ExternalLink, 
  Info,
  Flame,
  GraduationCap,
  Clock,
  MapPin,
  Tag
} from 'lucide-react';
import { useAppLanguage } from '../context/LanguageContext';
import { useAppData } from '../context/DataContext';
import { 
  HERO_SHLOKA, 
  TRUST_INFO, 
  HOME_COURSE_CATEGORIES, 
  SPONSORS, 
  PRIMARY_PHONE, 
  PRIMARY_EMAIL 
} from '../data/mockData';
import { motion } from 'motion/react';
import { TrustLogo } from '../components/common/TrustLogo';
import { AgniParticles } from '../components/common/AgniParticles';
import { SacredMandala } from '../components/common/SacredMandala';
import { SacredBackground } from '../components/common/SacredBackground';
import { AudioItem, VideoItem } from '../types';

interface HomePageProps {
  onPlayAudio: (audio: AudioItem) => void;
  onPlayVideo: (video: VideoItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onPlayAudio, onPlayVideo }) => {
  const { lang, setCurrentPage, openCourseDetail, openEnrollModal, navigateToGallery, openDonateModal } = useAppLanguage();
  const { courses, videoItems, events, galleryItems } = useAppData();

  // Carousel auto-scroll & controls
  const carouselRef = useRef<HTMLDivElement>(null);

  const carouselImages = galleryItems.length > 0 ? galleryItems.slice(0, 8).map(g => ({
    id: g.id,
    src: g.imageUrl,
    title: lang === 'mr' ? g.titleMr : g.titleEn,
    tag: g.category
  })) : [
    {
      id: 'car-1',
      src: '/Photos/Surwanee_competition_6-scaled-updraft-pre-smush-original.jpg',
      title: 'Annual Subhashit & Geeta Chanting Competition',
      tag: 'Competition'
    },
    {
      id: 'car-2',
      src: '/Photos/Surawanee_Paurohitya-Ganesh-Pooja-e1660834393968-updraft-pre-smush-original.jpg',
      title: 'Paurohitya Class & Stotra Pathan Guidance',
      tag: 'Paurohitya'
    },
    {
      id: 'car-3',
      src: '/Photos/kids-rainbow-surawanee-updraft-pre-smush-original.png',
      title: 'Bal Sanskar Varg Gatherings (Age 5-10)',
      tag: 'Sanskar Varg'
    },
    {
      id: 'car-4',
      src: '/Photos/Teachers-Training-1-updraft-pre-smush-original.jpg',
      title: 'Teachers Training Workshop on New Syllabus',
      tag: 'Teachers Training'
    }
  ];

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      
      let newScrollLeft = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      
      // Auto-wrap logic
      if (direction === 'right' && scrollLeft + clientWidth >= scrollWidth - 10) {
        newScrollLeft = 0;
      } else if (direction === 'left' && scrollLeft <= 0) {
        newScrollLeft = scrollWidth - clientWidth;
      }

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      scrollCarousel('right');
    }, 3500); // Scroll every 3.5 seconds

    return () => clearInterval(interval);
  }, []);

  const displayVideos = videoItems.length > 0 ? videoItems.slice(0, 2) : [];

  return (
    <div className="relative pb-12">
      {/* ── Single unified sacred background for entire page (below hero) ── */}
      <div className="absolute inset-0 top-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <SacredBackground variant="cream" intensity="low" />
      </div>

      {/* ========================================================
          1. HERO SECTION (Full-bleed Warm Maroon/Saffron Gradient + Animated Glow)
          ======================================================== */}
      <section className="relative z-20 [overflow:clip] bg-gradient-to-b from-[#561320] via-[#6D1B28] to-[#80221A] text-white pt-12 sm:pt-16 pb-20 sm:pb-28">
        
        {/* Sacred Agni Ember Particles */}
        <AgniParticles particleCount={45} className="opacity-80 z-0" />

        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 mix-blend-overlay"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Animated Sacred Mandala & Watermark Backdrop */}
        <div className="absolute -top-12 -right-12 opacity-15 pointer-events-none select-none z-0 hidden md:block">
          <SacredMandala size={480} interactive3d={false} />
        </div>
        <div className="absolute top-10 -left-20 w-96 h-96 rounded-full bg-[#D49622]/15 blur-3xl pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 text-center">
          
          {/* Sanskrit Verse with Glow & Motion */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mb-6 sm:mb-8 px-3.5 py-3 sm:px-6 sm:py-4 rounded-2xl bg-black/30 backdrop-blur-md border border-[#D49622]/60 shadow-[0_0_25px_rgba(212,150,34,0.25)] relative overflow-hidden"
          >
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-10 bg-[#FCD34D]/25 blur-xl rounded-full pointer-events-none" />
            <div className="text-[14px] xs:text-[15px] sm:text-xl md:text-2xl lg:text-3xl font-serif text-[#F8EFD3] tracking-wide leading-relaxed sm:leading-loose font-semibold drop-shadow-sm space-y-0.5 sm:space-y-1">
              <span className="block">
                संस्कृताध्ययनेनैव संस्कृतेः प्रसरो भवेत्&nbsp;।
              </span>
              <span className="block">
                तस्मात्संस्कृतभाषायाः प्रसारो ध्येयमस्तु&nbsp;नः&nbsp;॥
              </span>
            </div>
            <div className="text-[10px] sm:text-xs text-[#FDE68A] mt-2 font-serif opacity-95 tracking-wide sm:tracking-wider">
              ॥ संस्थेचे ध्येयवाक्य • सुरवाणी ज्ञानमंदिर, ठाणे ॥
            </div>
          </motion.div>

          {/* Institutional Heritage Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 mb-5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-[#F8EFD3] text-[11px] sm:text-xs font-medium tracking-wide shadow-lg hover:bg-white/15 transition-all text-center max-w-full"
          >
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FCD34D] animate-pulse shrink-0" />
            <span className="leading-snug">Est. 1958 • Reg. Trust No. E-225 (Thane) • Serving 66+ Years</span>
          </motion.div>

          {/* Institution Display Titles with Thin Golden Shining Wave Lines on Sides */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center justify-center gap-1.5 sm:gap-4 md:gap-6 mb-2"
          >
            {/* Left Thin Golden Shining Wave Line */}
            <svg className="w-8 sm:w-28 md:w-44 h-4 sm:h-7 text-[#FCD34D] drop-shadow-[0_0_10px_rgba(252,211,77,0.9)] shrink-0" viewBox="0 0 140 24" fill="none">
              <path d="M0 12 Q 20 2 40 12 T 80 12 T 120 12 Q 130 12 138 4" stroke="url(#goldWaveGradLeft)" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="138" cy="4" r="2.5" fill="#FFF" className="animate-pulse" />
              <defs>
                <linearGradient id="goldWaveGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.1" />
                  <stop offset="60%" stopColor="#FCD34D" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#FFF" stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>

            <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight text-white leading-tight drop-shadow-md">
              सुरवाणी ज्ञानमंदिर
            </h1>

            {/* Right Thin Golden Shining Wave Line */}
            <svg className="w-8 sm:w-28 md:w-44 h-4 sm:h-7 text-[#FCD34D] drop-shadow-[0_0_10px_rgba(252,211,77,0.9)] shrink-0 transform scale-x-[-1]" viewBox="0 0 140 24" fill="none">
              <path d="M0 12 Q 20 2 40 12 T 80 12 T 120 12 Q 130 12 138 4" stroke="url(#goldWaveGradRight)" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="138" cy="4" r="2.5" fill="#FFF" className="animate-pulse" />
              <defs>
                <linearGradient id="goldWaveGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.1" />
                  <stop offset="60%" stopColor="#FCD34D" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#FFF" stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg sm:text-2xl font-serif font-medium text-[#F8EFD3] max-w-3xl mx-auto tracking-wide mb-4"
          >
            Surawanee Dnyanmandir Sanskrit Trust, Thane
          </motion.p>

          {/* Trust Narrative Subtext */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-xs sm:text-base text-[#F4EFE6] max-w-2xl mx-auto font-normal leading-relaxed opacity-95 mb-4"
          >
            {lang === 'mr' 
              ? 'ठाण्यातील ६६ वर्षांची पवित्र परंपरा. पौरोहित्य, संस्कृत भाषा, बाल संस्कार व अध्यापन प्रशिक्षणाचे महाराष्ट्रातील अग्रणी केंद्र.'
              : 'Preserving and propagating Sanskrit heritage since 1958 through comprehensive Purohit training, foundational language classes, and cultural vargs.'}
          </motion.p>

          {/* Carousel */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 sm:mt-14 w-full"
          >
            <div className="flex items-center justify-between text-xs text-[#F8EFD3] mb-3 px-2">
              <span className="font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FCD34D]" />
                <span>{lang === 'mr' ? 'संस्थेचे उपक्रम व कार्यक्रम' : 'Trust Activities & Heritage Gallery'}</span>
              </span>
              <button 
                onClick={() => navigateToGallery('photos')} 
                className="hover:underline flex items-center gap-1 opacity-90 hover:opacity-100 transition-opacity"
              >
                <span>{lang === 'mr' ? 'सर्व छायाचित्रे पहा' : 'View Full Gallery'}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="relative group">
              {/* Left Arrow */}
              <button
                onClick={() => scrollCarousel('left')}
                className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-xl border border-white/20 hover:scale-110"
                aria-label="Previous photos"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Scrollable Container */}
              <div 
                ref={carouselRef}
                className="flex items-center gap-4 overflow-x-auto scrollbar-none py-3 pl-2 pr-8 scroll-smooth"
                style={{ scrollSnapType: 'x mandatory' }}
              >
                {carouselImages.map((img) => (
                  <motion.div
                    key={img.id}
                    whileHover={{ scale: 1.04, y: -4, rotateY: 3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    onClick={() => navigateToGallery('photos')}
                    className="relative shrink-0 w-64 sm:w-72 h-44 rounded-2xl overflow-hidden border border-white/25 shadow-xl cursor-pointer group/item transform transition-all duration-300"
                    style={{ scrollSnapAlign: 'start', transformStyle: 'preserve-3d' }}
                  >
                    <img 
                      src={img.src} 
                      alt={img.title} 
                      className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-3.5 text-white">
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#D49622] text-[#221D18] font-bold w-max uppercase mb-1 shadow-sm">
                        {img.tag}
                      </span>
                      <p className="text-xs font-serif font-semibold line-clamp-2 text-[#F4EFE6]">
                        {img.title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => scrollCarousel('right')}
                className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-xl border border-white/20 hover:scale-110"
                aria-label="Next photos"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

        </div>

        {/* Smooth Curved Section Divider into next section */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none">
          <svg 
            className="relative block w-full h-8 sm:h-12 text-[#FCFAF7]"
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,121.31,191.89,111.4Z" 
              fill="currentColor"
            />
          </svg>
        </div>

      </section>

      {/* ========================================================
          2. COURSE CATEGORY CARDS
          ======================================================== */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C85413] bg-[#FFF8F1] px-3.5 py-1.5 rounded-full border border-[#C85413]/25 mb-3 shadow-xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lang === 'mr' ? 'अभ्यासक्रम विभाग' : 'Course Categories'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-[#651728] tracking-tight">
            {lang === 'mr' ? 'सुरवाणी ज्ञानमंदिर अभ्यासक्रम' : 'Educational Offerings'}
          </h2>
          <p className="text-xs sm:text-base text-[#5C5348] mt-2">
            {lang === 'mr' 
              ? '५ वर्षांच्या बालकांपासून ते ज्येष्ठ नागरिकांपर्यंत सर्वांसाठी उपयुक्त संस्कृत वर्ग.'
              : 'Structured programs catering to school children, youth, priests, and educators.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOME_COURSE_CATEGORIES.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: 'spring', stiffness: 300, damping: 22 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => openCourseDetail(card.routeId)}
              className="bg-gradient-to-b from-[#FFFBF7] via-[#FCFAF7] to-[#FAF7F2] rounded-2xl border-2 border-[#E3D9C4] hover:border-[#C85413] shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group cursor-pointer relative overflow-hidden min-h-[310px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Golden Shimmer Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#FCD34D]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF8F1] border border-[#C85413]/30 flex items-center justify-center text-[#C85413] shadow-2xs group-hover:scale-110 group-hover:bg-[#C85413] group-hover:text-white transition-all duration-300">
                    {card.icon === 'Sparkles' && <Sparkles className="w-5 h-5" />}
                    {card.icon === 'BookOpen' && <BookOpen className="w-5 h-5" />}
                    {card.icon === 'Flame' && <Flame className="w-5 h-5" />}
                    {card.icon === 'GraduationCap' && <GraduationCap className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#883008] bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#E3D9C4]">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#883008] bg-[#FEEEDD] px-2.5 py-0.5 rounded-full mb-2">
                    {lang === 'mr' ? card.badgeMr : card.badgeEn}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#221D18] group-hover:text-[#C85413] transition-colors leading-snug">
                    {lang === 'mr' ? card.titleMr : card.titleEn}
                  </h3>
                </div>

                <p className="text-xs text-[#5C5348] leading-relaxed line-clamp-3">
                  {lang === 'mr' ? card.descriptionMr : card.descriptionEn}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#EFE8DA] flex items-center justify-between text-xs font-semibold text-[#651728] group-hover:text-[#C85413] relative z-10">
                <span>{lang === 'mr' ? 'अधिक माहिती वाचा' : 'View Course Info'}</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================
          3. UPCOMING EVENTS
          ======================================================== */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#FAF7F2] via-[#FFFBF7] to-[#FCFAF7] rounded-3xl border-2 border-[#E3D9C4] p-6 sm:p-10 text-center relative overflow-hidden shadow-lg"
        >
          {/* Subtle background mandala */}
          <div className="absolute -right-16 -bottom-16 opacity-10 pointer-events-none select-none">
            <SacredMandala size={320} interactive3d={false} />
          </div>

          <div className="max-w-5xl mx-auto space-y-6 relative z-10">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#651728] bg-white px-4 py-1.5 rounded-full border border-[#E3D9C4] shadow-xs">
                <Calendar className="w-3.5 h-3.5 text-[#C85413]" />
                <span>{lang === 'mr' ? '॥ आगामी ज्ञानसत्र व उत्सव ॥' : 'Upcoming Sacred Calendar'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#221D18]">
                {lang === 'mr' ? 'आगामी कार्यक्रम व दीक्षांत सोहळा' : 'Upcoming Events & Gatherings'}
              </h2>
              <p className="text-xs sm:text-sm text-[#5C5348] max-w-xl mx-auto">
                {lang === 'mr'
                  ? 'ठाण्यातील ऐतिहासिक पद्म निवास वास्तूत होणारे वार्षिक उपक्रम, स्पर्धा व सांस्कृतिक कार्यक्रम.'
                  : 'Annual Sanskrit recitation competitions, Geeta discourses, and cultural programs at Padma Niwas, Thane.'}
              </p>
            </div>

            {events.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-[#EFE8DA] shadow-xs space-y-2 max-w-md mx-auto">
                <Info className="w-6 h-6 text-[#D49622] mx-auto opacity-80" />
                <p className="text-sm font-medium text-[#5C5348]">
                  {lang === 'mr' ? 'सध्या कोणतेही कार्यक्रम नियोजित नाहीत.' : 'There are currently no events scheduled.'}
                </p>
                <p className="text-xs text-[#8A7E70]">
                  {lang === 'mr' 
                    ? 'नवीन स्पर्धा व दिनोत्सवांच्या तारखा जाहीर झाल्यावर येथे अपडेट केल्या जातील.' 
                    : 'Announcements for upcoming Subhashit competitions, Guru Purnima, and Sanskrit Dinotsav will appear here.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {events.map((ev, idx) => (
                  <motion.div 
                    key={ev.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="p-5 rounded-2xl bg-white border border-[#EFE8DA] hover:border-[#C85413]/60 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4 group"
                  >
                    {/* Left Date Block */}
                    <div className="flex sm:flex-col items-center justify-center bg-gradient-to-b from-[#651728] to-[#80221A] text-white rounded-2xl p-3 sm:py-3.5 sm:px-4 min-w-[76px] shrink-0 text-center shadow-sm">
                      <span className="text-xl sm:text-2xl font-bold font-serif leading-none">{ev.day}</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200 mt-0.5">{ev.month}</span>
                      <span className="text-[10px] text-stone-300 font-mono hidden sm:block">{ev.year}</span>
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[10px] font-bold text-[#C85413] uppercase bg-[#FFF8F1] px-2.5 py-0.5 rounded-full border border-[#C85413]/30">
                          {ev.category}
                        </span>
                        <span className="text-[11px] text-[#8A7E70] flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3 text-[#C85413]" />
                          {ev.time}
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-serif font-bold text-[#221D18] group-hover:text-[#C85413] transition-colors leading-snug">
                        {lang === 'mr' ? ev.titleMr : ev.titleEn}
                      </h4>

                      <p className="text-xs text-[#5C5348] line-clamp-2 leading-relaxed">
                        {lang === 'mr' ? ev.descriptionMr : ev.descriptionEn}
                      </p>

                      <div className="pt-2 border-t border-[#F5EFE6] flex items-center justify-between text-[11px] text-[#8A7E70]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#C85413] shrink-0" />
                          <span className="line-clamp-1">{lang === 'mr' ? ev.venueMr : ev.venueEn}</span>
                        </span>
                        <button
                          onClick={() => setCurrentPage('contact')}
                          className="text-[#651728] hover:text-[#C85413] font-semibold flex items-center gap-0.5 cursor-pointer shrink-0 ml-2"
                        >
                          <span>{lang === 'mr' ? 'नोंदणी' : 'RSVP'}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={() => setCurrentPage('contact')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#651728] hover:text-[#C85413] underline transition-colors cursor-pointer"
              >
                <span>{lang === 'mr' ? 'कार्यक्रमांची सविस्तर माहिती मिळवण्यासाठी संपर्क साधा' : 'Inquire about festival gatherings and seating at Padma Niwas'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </motion.div>
      </section>

      {/* ========================================================
          4. VIDEO GALLERY
          ======================================================== */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C85413] bg-[#FFF8F1] px-3 py-1 rounded-full border border-[#C85413]/20 mb-2">
              <Play className="w-3.5 h-3.5 fill-[#C85413]" />
              <span>{lang === 'mr' ? 'व्हिडिओ दालन' : 'Video Gallery'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#651728]">
              {lang === 'mr' ? 'व्हिडिओ गॅलरी' : 'Video Gallery'}
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5348] mt-1 max-w-2xl">
              We have prepared some videos for you, like &amp; subscribe to our channel to keep updated with all new videos.
            </p>
          </div>

          <button
            onClick={() => navigateToGallery('videos')}
            className="text-xs font-semibold text-[#651728] hover:text-[#C85413] flex items-center gap-1 transition-colors self-start md:self-auto cursor-pointer"
          >
            <span>{lang === 'mr' ? 'सर्व व्हिडिओ पहा' : 'View All Videos'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C85413]" />
          </button>
        </div>

        {/* Dynamic Video Embeds */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayVideos.map((video, idx) => (
            <motion.div 
              key={video.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ y: -8, scale: 1.02, rotateX: 2 }}
              className="bg-[#FCFAF7] rounded-2xl border-2 border-[#E3D9C4] hover:border-[#C85413]/70 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Responsive 16:9 YouTube Player Frame */}
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                  title={video.titleEn}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C85413] bg-[#FFF8F1] px-2 py-0.5 rounded">
                      {video.category}
                    </span>
                    <span className="text-[11px] text-[#8A7E70]">YouTube ID: {video.youtubeId}</span>
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#221D18] group-hover:text-[#C85413] transition-colors">
                    {lang === 'mr' ? video.titleMr : video.titleEn}
                  </h3>
                  <p className="text-xs text-[#5C5348] mt-1 line-clamp-2">
                    {lang === 'mr' ? video.descriptionMr : video.descriptionEn}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#EFE8DA] flex items-center justify-between text-xs">
                  <span className="text-[#883008] font-medium font-mono">{video.speaker}</span>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#651728] hover:text-[#C85413] font-semibold flex items-center gap-1"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================
          5. SPONSORS SECTION
          ======================================================== */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C85413] bg-[#FFF8F1] px-3 py-1 rounded-full border border-[#C85413]/20 mb-2">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Support &amp; Patronage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#651728]">
            {lang === 'mr' ? 'आमचे प्रायोजक' : 'Our Sponsors'}
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5348] mt-1">
            {lang === 'mr' 
              ? 'संस्कृत शिक्षण व डिजिटल उपक्रमांना हातभार लावणारे संस्थात्मक सहयोगी.' 
              : 'Organizations and technical advisors supporting Surawanee Dyan Mandir.'}
          </p>
        </motion.div>

        {/* Sponsor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
          
          {/* 1. TechnoAdviser */}
          <motion.a
            href="https://technoadviser.com"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.04, rotateY: 3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-[#FCFAF7] rounded-2xl border-2 border-[#E3D9C4] p-6 text-center hover:border-[#C85413] hover:shadow-xl transition-all duration-300 group block relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="h-16 flex items-center justify-center mb-3 group-hover:scale-108 transition-transform">
              <img src="/TA-Logo.png" alt="TechnoAdviser Logo" className="h-full w-auto max-w-[240px] object-contain" />
            </div>
            <h3 className="text-lg font-bold text-[#221D18] group-hover:text-[#C85413] transition-colors">
              TechnoAdviser
            </h3>
            <p className="text-xs text-[#5C5348] mt-1">technoadviser.com</p>
            <span className="inline-block mt-3 text-[11px] text-[#883008] font-medium bg-[#FFF8F1] px-2.5 py-0.5 rounded-full border border-[#C85413]/20 shadow-2xs">
              Technology &amp; Web Advisory Partner
            </span>
          </motion.a>

          {/* 2. Surawanee Dyan Mandir Secondary Mark */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.04, rotateY: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-[#FCFAF7] rounded-2xl border-2 border-[#E3D9C4] hover:border-[#651728] p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="h-16 flex items-center justify-center mb-3">
              <TrustLogo variant="round" height={56} />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#651728]">
              Surawanee Dyan Mandir
            </h3>
            <p className="text-xs text-[#5C5348] mt-1">सुरवाणी ज्ञानमंदिर</p>
            <span className="inline-block mt-3 text-[11px] text-[#651728] font-medium bg-[#FAF0F2] px-2.5 py-0.5 rounded-full border border-[#651728]/20 shadow-2xs">
              Registered Charitable Trust (E-225 Thane)
            </span>
          </motion.div>

        </div>

        {/* Sponsor & Donation CTA Pair */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-5 py-2.5 rounded-xl bg-[#651728] hover:bg-[#822237] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
          >
            {lang === 'mr' ? 'प्रायोजक बना (Become Sponsor)' : 'Become Sponsor'}
          </button>
          
          <button
            onClick={openDonateModal}
            className="px-5 py-2.5 rounded-xl bg-[#FAF0F2] hover:bg-[#FEEEDD] text-[#883008] border border-[#C85413]/30 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            {lang === 'mr' ? 'सुरवाणीला देणगी द्या (Donate)' : 'Donate to Surawanee'}
          </button>
        </div>
      </section>

      {/* ========================================================
          6. CONTACT CTA BAND
          ======================================================== */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-r from-[#651728] via-[#852237] to-[#A83E0A] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center sm:text-left"
          style={{ animation: 'sacredGlow 4s ease-in-out infinite' }}
        >
          {/* Subtle watermark */}
          <div className="absolute right-0 top-0 w-80 h-80 opacity-10 pointer-events-none select-none text-[240px] font-serif">
            ॐ
          </div>

          <div className="relative z-10 max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Contact us now
            </h2>
            <p className="text-sm sm:text-base text-[#F8EFD3] opacity-95">
              We love to assist you with your queries soon as possible.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm font-medium">
              <a
                href={`tel:${PRIMARY_PHONE.replace(/\s+/g, '')}`}
                className="px-5 py-3 rounded-xl bg-white text-[#651728] hover:bg-[#FFF8F1] font-bold shadow-md transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C85413]" />
                <span>Call us at {PRIMARY_PHONE}</span>
              </a>

              <a
                href={`mailto:${PRIMARY_EMAIL}`}
                className="px-5 py-3 rounded-xl bg-black/20 hover:bg-black/30 text-white border border-white/40 font-semibold backdrop-blur-xs transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#FCD34D]" />
                <span>Email us at {PRIMARY_EMAIL}</span>
              </a>
            </div>
          </div>

        </motion.div>
      </section>

    </div>
  );
};
