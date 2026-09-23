import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  Phone, 
  Globe, 
  BookOpen, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Music, 
  Sparkles,
  Flame,
  Calendar,
  Layers,
  ChevronRight,
  Check,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { useAppLanguage } from '../../context/LanguageContext';
import { TrustLogo } from './TrustLogo';
import { PRIMARY_PHONE } from '../../data/mockData';
import { useAppData } from '../../context/DataContext';
import { PageId } from '../../types';

interface HeaderProps {
  onReplayIntro?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReplayIntro }) => {
  const { 
    lang, 
    setLang,
    toggleLang, 
    currentPage, 
    setCurrentPage, 
    openCourseDetail, 
    openDonateModal,
    setIsSearchOpen,
    navigateToKnowledgeShare,
    navigateToGallery
  } = useAppLanguage();

  const { categories, courses, audioItems, videoItems, documentItems } = useAppData();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [knowledgeDropdownOpen, setKnowledgeDropdownOpen] = useState(false);
  const [galleryDropdownOpen, setGalleryDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeCourseCategory, setActiveCourseCategory] = useState<string | null>(null);
  const [activeKnowledgeCategory, setActiveKnowledgeCategory] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click or escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setCoursesDropdownOpen(false);
        setKnowledgeDropdownOpen(false);
        setGalleryDropdownOpen(false);
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setCoursesDropdownOpen(false);
    setKnowledgeDropdownOpen(false);
    setGalleryDropdownOpen(false);
    setLangDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCourseSelect = (courseId: string) => {
    openCourseDetail(courseId);
    setCoursesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleKnowledgeSelect = (filter: string) => {
    navigateToKnowledgeShare(filter);
    setKnowledgeDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleGallerySelect = (filter: string) => {
    navigateToGallery(filter);
    setGalleryDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      
      {/* 1. CLEAN MODERN NAVIGATION BAR */}
      <div className={`bg-white transition-all duration-200 border-t-[1.5px] border-b-[1.5px] border-[#5A1221] ${scrolled ? 'shadow-md' : 'shadow-none'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16 sm:h-[68px]">
          
          {/* Left Group: Logo + Desktop Navigation Links */}
          <div className="flex items-center gap-5 xl:gap-6 shrink-0">
            
            {/* Brand Logo */}
            <div 
              onClick={() => navigateTo('home')}
              className="flex items-center cursor-pointer group select-none shrink-0 py-1 focus:outline-none"
              title="सुरवाणी ज्ञानमंदिर - Surawanee Dnyanmandir Home"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigateTo('home'); }}
            >
              <div className="h-11 sm:h-12 flex items-center">
                <img 
                  src="/Surwanee-logo.png" 
                  alt="सुरवाणी ज्ञानमंदिर - Surawanee Dnyanmandir"
                  className="h-10 sm:h-11 w-auto object-contain transition-all duration-200 group-hover:scale-[1.02]" 
                />
              </div>
            </div>

            {/* Desktop Navigation Links (Visible on xl: 1280px+) */}
            <nav className="hidden xl:flex items-center gap-0.5 xl:gap-1">
            
            {/* 1. Home */}
            <button
              onClick={() => navigateTo('home')}
              className={`px-4 py-1.5 text-[13.5px] sm:text-[14px] transition-all rounded-full whitespace-nowrap ${
                currentPage === 'home'
                  ? 'text-[#5A1221] bg-[#FDF1EB] font-semibold'
                  : 'text-[#222222] hover:text-[#5A1221] hover:bg-[#FDF1EB]/60 font-medium'
              }`}
            >
              {lang === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}
            </button>

            {/* 2. About us */}
            <button
              onClick={() => navigateTo('about')}
              className={`px-4 py-1.5 text-[13.5px] sm:text-[14px] transition-all rounded-full whitespace-nowrap ${
                currentPage === 'about'
                  ? 'text-[#5A1221] bg-[#FDF1EB] font-semibold'
                  : 'text-[#222222] hover:text-[#5A1221] hover:bg-[#FDF1EB]/60 font-medium'
              }`}
            >
              {lang === 'mr' ? 'संस्थेविषयी' : 'About us'}
            </button>

            {/* 3. Courses Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCoursesDropdownOpen(true)}
              onMouseLeave={() => setCoursesDropdownOpen(false)}
            >
              <button
                onClick={() => navigateTo('courses')}
                className={`flex items-center gap-1 px-3.5 py-1.5 text-[13.5px] sm:text-[14px] transition-all rounded-full whitespace-nowrap ${
                  currentPage === 'courses' || currentPage === 'course-detail'
                    ? 'text-[#5A1221] bg-[#FDF1EB] font-semibold'
                    : 'text-[#222222] hover:text-[#5A1221] hover:bg-[#FDF1EB]/60 font-medium'
                }`}
              >
                <span>{lang === 'mr' ? 'अभ्यासक्रम' : 'Courses'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${coursesDropdownOpen ? 'rotate-180 text-[#5A1221]' : 'text-[#666666]'}`} />
              </button>

              {coursesDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150 p-2.5 min-w-[440px] flex flex-col"
                  onMouseLeave={() => setActiveCourseCategory(null)}
                >
                  <div className="flex gap-2">
                    {/* Left Column: Category List */}
                    <div className="w-48 bg-[#FFF9F6] rounded-xl p-1.5 border border-[#F3E6DF] shrink-0 flex flex-col">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#5A1221] px-2 py-1 border-b border-[#F3E6DF] flex items-center gap-1 mb-1">
                        <Flame className="w-3 h-3 text-[#DF785D]" />
                        <span>{lang === 'mr' ? 'वर्ग प्रकार' : 'Categories'}</span>
                      </div>
                      <div className="max-h-[190px] overflow-y-auto custom-scrollbar-red pr-1 space-y-1">
                        {categories.filter(c => c.type === 'course' || c.type === 'both').map(cat => {
                          const isHovered = (activeCourseCategory || categories.filter(c => c.type === 'course' || c.type === 'both')[0]?.id) === cat.id;
                          return (
                            <div
                              key={cat.id}
                              onMouseEnter={() => setActiveCourseCategory(cat.id)}
                              onClick={() => {
                                navigateTo('courses');
                                setCoursesDropdownOpen(false);
                              }}
                              className={`px-2.5 py-2 rounded-lg cursor-pointer text-xs font-semibold flex items-center justify-between transition-colors ${
                                isHovered 
                                  ? 'bg-[#5A1221] text-white shadow-2xs' 
                                  : 'text-[#221D18] hover:bg-[#FDF1EB] hover:text-[#5A1221]'
                              }`}
                            >
                              <div className="truncate pr-1">
                                <div>{lang === 'mr' ? cat.titleMr : cat.titleEn}</div>
                                {cat.titleMr && lang === 'en' && (
                                  <div className={`text-[10px] ${isHovered ? 'text-amber-200' : 'text-[#8A7E70]'}`}>{cat.titleMr}</div>
                                )}
                              </div>
                              <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isHovered ? 'text-[#FCD34D]' : 'text-[#8A7E70]'}`} />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Column: Courses in Active Category (Flyout) */}
                    <div className="flex-1 bg-white rounded-xl p-2.5 border border-[#F3E6DF] min-h-[200px] flex flex-col justify-between">
                      {(() => {
                        const courseCats = categories.filter(c => c.type === 'course' || c.type === 'both');
                        const selectedId = activeCourseCategory || courseCats[0]?.id || 'paurohitya';
                        const currentCat = courseCats.find(c => c.id === selectedId);
                        const subCourses = courses.filter(c => c.category?.toLowerCase() === selectedId?.toLowerCase());

                        return (
                          <div>
                            <div className="text-[11px] font-bold text-[#5A1221] pb-1.5 mb-2 border-b border-[#F3E6DF] flex items-center justify-between">
                              <span className="truncate">{lang === 'mr' ? currentCat?.titleMr : currentCat?.titleEn}</span>
                              <span className="text-[10px] text-[#8A7E70] font-normal shrink-0">({subCourses.length})</span>
                            </div>

                            {subCourses.length === 0 ? (
                              <div className="py-6 text-center text-xs text-[#8A7E70]">
                                <BookOpen className="w-6 h-6 mx-auto text-[#DF785D]/40 mb-1" />
                                <span>{lang === 'mr' ? 'अभ्यासक्रम पहा' : 'Explore Courses Directory'}</span>
                              </div>
                            ) : (
                              <div className="max-h-[190px] overflow-y-auto custom-scrollbar-red pr-1 space-y-1">
                                {subCourses.map(course => (
                                  <div
                                    key={course.id}
                                    onClick={() => handleCourseSelect(course.id)}
                                    className="px-2.5 py-1.5 rounded-lg hover:bg-[#FDF1EB] border border-transparent hover:border-[#DF785D]/30 cursor-pointer text-xs text-[#221D18] hover:text-[#5A1221] font-medium transition-all flex items-center justify-between group"
                                  >
                                    <span className="truncate">{lang === 'mr' ? course.titleMr : course.titleEn}</span>
                                    <ChevronRight className="w-3 h-3 text-[#8A7E70] group-hover:text-[#5A1221] group-hover:translate-x-0.5 transition-all shrink-0" />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-[#F3E6DF] text-center">
                    <button
                      onClick={() => navigateTo('courses')}
                      className="text-xs font-semibold text-[#5A1221] hover:text-[#DF785D] transition-colors"
                    >
                      {lang === 'mr' ? 'सर्व अभ्यासक्रम पहा (View All Courses) →' : 'View Full Courses Directory →'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Knowledge Share Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setKnowledgeDropdownOpen(true)}
              onMouseLeave={() => setKnowledgeDropdownOpen(false)}
            >
              <button
                onClick={() => navigateTo('knowledge-share')}
                className={`flex items-center gap-1 px-3.5 py-1.5 text-[13.5px] sm:text-[14px] transition-all rounded-full whitespace-nowrap ${
                  currentPage === 'knowledge-share'
                    ? 'text-[#5A1221] bg-[#FDF1EB] font-semibold'
                    : 'text-[#222222] hover:text-[#5A1221] hover:bg-[#FDF1EB]/60 font-medium'
                }`}
              >
                <span>{lang === 'mr' ? 'ज्ञानकोश' : 'Knowledge Share'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${knowledgeDropdownOpen ? 'rotate-180 text-[#5A1221]' : 'text-[#666666]'}`} />
              </button>

              {knowledgeDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150 p-2.5 min-w-[440px] flex flex-col"
                  onMouseLeave={() => setActiveKnowledgeCategory(null)}
                >
                  <div className="flex gap-2">
                    {/* Left Column: Knowledge Categories */}
                    <div className="w-48 bg-[#FFF9F6] rounded-xl p-1.5 border border-[#F3E6DF] space-y-1 shrink-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#5A1221] px-2 py-1 border-b border-[#F3E6DF] flex items-center gap-1 mb-1">
                        <BookOpen className="w-3 h-3 text-[#DF785D]" />
                        <span>{lang === 'mr' ? 'ज्ञानकोश श्रेणी' : 'Categories'}</span>
                      </div>
                      <div className="max-h-[190px] overflow-y-auto custom-scrollbar-red pr-1 space-y-1">
                        {categories.filter(c => c.type === 'knowledge' || c.type === 'both').map(cat => {
                          const isHovered = (activeKnowledgeCategory || categories.filter(c => c.type === 'knowledge' || c.type === 'both')[0]?.id) === cat.id;
                          return (
                            <div
                              key={cat.id}
                              onMouseEnter={() => setActiveKnowledgeCategory(cat.id)}
                              onClick={() => handleKnowledgeSelect(cat.id)}
                              className={`px-2.5 py-2 rounded-lg cursor-pointer text-xs font-semibold flex items-center justify-between transition-colors ${
                                isHovered 
                                  ? 'bg-[#5A1221] text-white shadow-2xs' 
                                  : 'text-[#221D18] hover:bg-[#FDF1EB] hover:text-[#5A1221]'
                              }`}
                            >
                              <div className="truncate pr-1">
                                <div>{lang === 'mr' ? cat.titleMr : cat.titleEn}</div>
                                {cat.titleMr && lang === 'en' && (
                                  <div className={`text-[10px] ${isHovered ? 'text-amber-200' : 'text-[#8A7E70]'}`}>{cat.titleMr}</div>
                                )}
                              </div>
                              <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isHovered ? 'text-[#FCD34D]' : 'text-[#8A7E70]'}`} />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Column: Items under Active Category */}
                    <div className="flex-1 bg-white rounded-xl p-2.5 border border-[#F3E6DF] min-h-[200px] flex flex-col justify-between">
                      {(() => {
                        const knowCats = categories.filter(c => c.type === 'knowledge' || c.type === 'both');
                        const selectedId = activeKnowledgeCategory || knowCats[0]?.id || 'paurohitya-media';
                        const currentCat = knowCats.find(c => c.id === selectedId);

                        return (
                          <div>
                            <div className="text-[11px] font-bold text-[#5A1221] pb-1.5 mb-2 border-b border-[#F3E6DF] flex items-center justify-between">
                              <span className="truncate">{lang === 'mr' ? currentCat?.titleMr : currentCat?.titleEn}</span>
                            </div>

                            <div className="space-y-1.5">
                              <div 
                                onClick={() => handleKnowledgeSelect('audio')}
                                className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-[#FDF1EB] border border-transparent hover:border-[#DF785D]/30 cursor-pointer text-xs text-[#221D18] hover:text-[#5A1221] font-medium transition-all group"
                              >
                                <Music className="w-4 h-4 text-[#DF785D] shrink-0" />
                                <span>{lang === 'mr' ? 'ध्वनी फीती (Audio Chants)' : 'Audio Recitations'}</span>
                              </div>
                              <div 
                                onClick={() => handleKnowledgeSelect('video')}
                                className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-[#FDF1EB] border border-transparent hover:border-[#DF785D]/30 cursor-pointer text-xs text-[#221D18] hover:text-[#5A1221] font-medium transition-all group"
                              >
                                <Video className="w-4 h-4 text-[#DF785D] shrink-0" />
                                <span>{lang === 'mr' ? 'व्हिडिओ वर्ग (Video Lectures)' : 'Video Lectures'}</span>
                              </div>
                              <div 
                                onClick={() => handleKnowledgeSelect('document')}
                                className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-[#FDF1EB] border border-transparent hover:border-[#DF785D]/30 cursor-pointer text-xs text-[#221D18] hover:text-[#5A1221] font-medium transition-all group"
                              >
                                <FileText className="w-4 h-4 text-[#DF785D] shrink-0" />
                                <span>{lang === 'mr' ? 'पुस्तके व अभ्यास साहित्य (PDFs)' : 'Study Material & PDFs'}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-[#F3E6DF] text-center">
                    <button
                      onClick={() => navigateTo('knowledge-share')}
                      className="text-xs font-semibold text-[#5A1221] hover:text-[#DF785D] transition-colors"
                    >
                      {lang === 'mr' ? 'सर्व ज्ञानकोश साहित्य पहा →' : 'Explore All Knowledge Share →'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Events */}
            <button
              onClick={() => navigateTo('events')}
              className={`px-4 py-1.5 text-[13.5px] sm:text-[14px] transition-all rounded-full whitespace-nowrap ${
                currentPage === 'events'
                  ? 'text-[#5A1221] bg-[#FDF1EB] font-semibold'
                  : 'text-[#222222] hover:text-[#5A1221] hover:bg-[#FDF1EB]/60 font-medium'
              }`}
            >
              {lang === 'mr' ? 'कार्यक्रम' : 'Events'}
            </button>

            {/* 6. Gallery Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setGalleryDropdownOpen(true)}
              onMouseLeave={() => setGalleryDropdownOpen(false)}
            >
              <button
                onClick={() => navigateTo('gallery')}
                className={`flex items-center gap-1 px-3.5 py-1.5 text-[13.5px] sm:text-[14px] transition-all rounded-full whitespace-nowrap ${
                  currentPage === 'gallery'
                    ? 'text-[#5A1221] bg-[#FDF1EB] font-semibold'
                    : 'text-[#222222] hover:text-[#5A1221] hover:bg-[#FDF1EB]/60 font-medium'
                }`}
              >
                <span>{lang === 'mr' ? 'दालन' : 'Gallery'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${galleryDropdownOpen ? 'rotate-180 text-[#5A1221]' : 'text-[#666666]'}`} />
              </button>

              {galleryDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div 
                    onClick={() => handleGallerySelect('images')}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#FDF1EB] cursor-pointer text-xs font-medium text-[#221D18] hover:text-[#5A1221] transition-colors"
                  >
                    <ImageIcon className="w-4 h-4 text-[#DF785D]" />
                    <span>{lang === 'mr' ? 'छायाचित्र दालन (Image Gallery)' : 'Image Gallery'}</span>
                  </div>
                  <div 
                    onClick={() => handleGallerySelect('videos')}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#FDF1EB] cursor-pointer text-xs font-medium text-[#221D18] hover:text-[#5A1221] transition-colors"
                  >
                    <Video className="w-4 h-4 text-[#DF785D]" />
                    <span>{lang === 'mr' ? 'व्हिडिओ दालन (Videos Gallery)' : 'Videos Gallery'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* 7. Contact us */}
            <button
              onClick={() => navigateTo('contact')}
              className={`px-4 py-1.5 text-[13.5px] sm:text-[14px] transition-all rounded-full whitespace-nowrap ${
                currentPage === 'contact'
                  ? 'text-[#5A1221] bg-[#FDF1EB] font-semibold'
                  : 'text-[#222222] hover:text-[#5A1221] hover:bg-[#FDF1EB]/60 font-medium'
              }`}
            >
              {lang === 'mr' ? 'संपर्क' : 'Contact us'}
            </button>

          </nav>
          </div>

          {/* Right Controls: Language Selector, Search, Donate, Call Button & Mobile Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">

            {/* Language Selector Pill */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="h-[38px] flex items-center gap-1.5 px-3.5 rounded-full bg-white hover:bg-[#FFF9F6] border border-[#DF785D] text-[#222222] text-xs sm:text-[13px] font-medium transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                title="Change language / भाषा बदला"
                aria-label="Language selector"
              >
                <Globe className="w-3.5 h-3.5 text-[#DF785D]" />
                <span className="font-sans">{lang === 'mr' ? 'मराठी' : 'English'}</span>
                <ChevronDown className={`w-3 h-3 text-[#666666] transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => {
                      setLang('mr');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      lang === 'mr' 
                        ? 'bg-[#5A1221] text-white' 
                        : 'text-[#221D18] hover:bg-[#FDF1EB] hover:text-[#5A1221]'
                    }`}
                  >
                    <span className="font-serif">मराठी (Marathi)</span>
                    {lang === 'mr' && <Check className="w-3.5 h-3.5 text-[#FCD34D]" />}
                  </button>
                  <button
                    onClick={() => {
                      setLang('en');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors mt-1 ${
                      lang === 'en' 
                        ? 'bg-[#5A1221] text-white' 
                        : 'text-[#221D18] hover:bg-[#FDF1EB] hover:text-[#5A1221]'
                    }`}
                  >
                    <span>English</span>
                    {lang === 'en' && <Check className="w-3.5 h-3.5 text-[#FCD34D]" />}
                  </button>
                </div>
              )}
            </div>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-[38px] h-[38px] rounded-xl flex items-center justify-center border border-[#E5E7EB] bg-[#F9FAFB] hover:bg-[#F3F4F6] text-[#4B5563] hover:text-[#111827] transition-all cursor-pointer shadow-2xs"
              title="Search courses, audio & archives"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-[#4B5563]" />
            </button>

            {/* Donate CTA Button */}
            <button
              onClick={openDonateModal}
              className="hidden sm:inline-flex h-[38px] items-center gap-1.5 px-4 rounded-full bg-white hover:bg-[#FFF6F2] border border-[#DF785D] text-[#5A1221] text-xs sm:text-[13px] font-semibold transition-all shadow-2xs hover:shadow-xs cursor-pointer"
              title="Donate or Sponsor Sanskrit Education"
            >
              <Heart className="w-3.5 h-3.5 text-[#DF785D]" />
              <span>{lang === 'mr' ? 'देणगी' : 'Donate'}</span>
            </button>

            {/* Helpline Phone Button */}
            <a
              href={`tel:${PRIMARY_PHONE.replace(/\s+/g, '')}`}
              className="hidden md:inline-flex h-[38px] items-center gap-2 px-4 sm:px-5 rounded-full bg-[#5A1221] hover:bg-[#450C18] text-white text-xs sm:text-[13px] font-semibold shadow-xs hover:shadow-md transition-all whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#E8A538]" />
              <span>{PRIMARY_PHONE}</span>
            </a>

            {/* Mobile Hamburger Toggle (Visible below xl) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-[#221D18] hover:bg-[#F4EFE6] border border-[#E3D9C4] transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#5A1221]" /> : <Menu className="w-5 h-5 text-[#5A1221]" />}
            </button>
          </div>

        </div>
      </div>

      {/* 2. MOBILE RESPONSIVE DRAWER */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FCFAF7] border-b border-[#E3D9C4] shadow-2xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          <div className="p-4 space-y-2">
            
            {/* Quick Language Toggle inside Mobile Drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE8DA] gap-2">
              <span className="text-xs font-serif font-bold text-[#651728]">
                {lang === 'mr' ? 'सुरवाणी ज्ञानमंदिर' : 'Surawanee Dnyanmandir'}
              </span>
              <div className="flex items-center gap-1 bg-[#F4EFE6] p-1 rounded-xl border border-[#E3D9C4]">
                <button
                  onClick={() => setLang('mr')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    lang === 'mr' ? 'bg-[#651728] text-white shadow-xs' : 'text-[#5C5348] hover:text-[#221D18]'
                  }`}
                >
                  मराठी
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    lang === 'en' ? 'bg-[#651728] text-white shadow-xs' : 'text-[#5C5348] hover:text-[#221D18]'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            {/* Home */}
            <button
              onClick={() => navigateTo('home')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
                currentPage === 'home' ? 'bg-[#FFF8F1] text-[#C85413] font-bold' : 'text-[#221D18]'
              }`}
            >
              {lang === 'mr' ? 'मुख्यपृष्ठ (Home)' : 'Home'}
            </button>

            {/* About us */}
            <button
              onClick={() => navigateTo('about')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
                currentPage === 'about' ? 'bg-[#FFF8F1] text-[#C85413] font-bold' : 'text-[#221D18]'
              }`}
            >
              {lang === 'mr' ? 'संस्थेविषयी (About us)' : 'About us'}
            </button>

            {/* Courses Mobile Accordion */}
            <div className="border border-[#EFE8DA] rounded-xl overflow-hidden">
              <button
                onClick={() => setMobileSubmenu(mobileSubmenu === 'courses' ? null : 'courses')}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-[#F7F3EB] text-sm font-semibold text-[#651728]"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#C85413]" />
                  <span>{lang === 'mr' ? 'अभ्यासक्रम (Courses)' : 'Courses'}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubmenu === 'courses' ? 'rotate-180' : ''}`} />
              </button>

              {mobileSubmenu === 'courses' && (
                <div className="p-3 bg-[#FCFAF7] space-y-3">
                  <div>
                    <div className="text-[11px] font-bold uppercase text-[#C85413] mb-1 flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      <span>Paurohitya</span>
                    </div>
                    <div className="space-y-1 pl-2 text-xs">
                      <div onClick={() => handleCourseSelect('prashikshan-varg-pratham-star')} className="py-1 cursor-pointer hover:text-[#C85413]">
                        • Prashikshan Varg (Pratham Star)
                      </div>
                      <div onClick={() => handleCourseSelect('stotra-pathan')} className="py-1 cursor-pointer hover:text-[#C85413]">
                        • Stotra Pathan
                      </div>
                      <div onClick={() => handleCourseSelect('pooja-vidhi')} className="py-1 cursor-pointer hover:text-[#C85413]">
                        • Pooja Vidhi
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#EFE8DA] pt-2">
                    <div className="text-[11px] font-bold uppercase text-[#883008] mb-1 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span>Other Courses</span>
                    </div>
                    <div className="space-y-1 pl-2 text-xs">
                      <div onClick={() => handleCourseSelect('sanskar-varg')} className="py-1 cursor-pointer hover:text-[#C85413]">
                        • Sanskar Varg (Age 5-10)
                      </div>
                      <div onClick={() => handleCourseSelect('sanskrut-language-classes')} className="py-1 cursor-pointer hover:text-[#C85413]">
                        • Sanskrut Language Classes
                      </div>
                      <div onClick={() => handleCourseSelect('teachers-training-courses')} className="py-1 cursor-pointer hover:text-[#C85413]">
                        • Teachers Training Courses
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#EFE8DA] pt-2 text-center">
                    <button
                      onClick={() => navigateTo('courses')}
                      className="text-xs font-bold text-[#651728] hover:text-[#C85413]"
                    >
                      View All Courses →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Knowledge Share Mobile Accordion */}
            <div className="border border-[#EFE8DA] rounded-xl overflow-hidden">
              <button
                onClick={() => setMobileSubmenu(mobileSubmenu === 'knowledge' ? null : 'knowledge')}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-[#F7F3EB] text-sm font-semibold text-[#651728]"
              >
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-[#C85413]" />
                  <span>{lang === 'mr' ? 'ज्ञानकोश (Knowledge Share)' : 'Knowledge Share'}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubmenu === 'knowledge' ? 'rotate-180' : ''}`} />
              </button>

              {mobileSubmenu === 'knowledge' && (
                <div className="p-3 bg-[#FCFAF7] space-y-3">
                  <div>
                    <div className="text-[11px] font-bold uppercase text-[#C85413] mb-1">Paurohitya Media</div>
                    <div className="space-y-1 pl-2 text-xs">
                      <div onClick={() => handleKnowledgeSelect('paurohitya-video')} className="py-1 cursor-pointer hover:text-[#C85413]">
                        • Paurohitya Video
                      </div>
                      <div onClick={() => handleKnowledgeSelect('paurohitya-audio')} className="py-1 cursor-pointer hover:text-[#C85413]">
                        • Paurohitya Audio
                      </div>
                      <div onClick={() => handleKnowledgeSelect('paurohitya-docs')} className="py-1 cursor-pointer hover:text-[#C85413]">
                        • Paurohitya Documents
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#EFE8DA] pt-2">
                    <div className="text-[11px] font-bold uppercase text-[#883008] mb-1">General Knowledge Base</div>
                    <div className="space-y-1 pl-2 text-xs">
                      <div onClick={() => handleKnowledgeSelect('other-video')} className="py-1 cursor-pointer hover:text-[#C85413]">
                        • Lecture Videos
                      </div>
                      <div onClick={() => handleKnowledgeSelect('other-audio')} className="py-1 cursor-pointer hover:text-[#C85413]">
                        • Audio Chants
                      </div>
                      <div onClick={() => handleKnowledgeSelect('other-docs')} className="py-1 cursor-pointer hover:text-[#C85413]">
                        • Study Guides &amp; PDF
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Events */}
            <button
              onClick={() => navigateTo('events')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
                currentPage === 'events' ? 'bg-[#FFF8F1] text-[#C85413] font-bold' : 'text-[#221D18]'
              }`}
            >
              {lang === 'mr' ? 'कार्यक्रम (Events)' : 'Events'}
            </button>

            {/* Gallery Mobile Accordion */}
            <div className="border border-[#EFE8DA] rounded-xl overflow-hidden">
              <button
                onClick={() => setMobileSubmenu(mobileSubmenu === 'gallery' ? null : 'gallery')}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-[#F7F3EB] text-sm font-semibold text-[#651728]"
              >
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#C85413]" />
                  <span>{lang === 'mr' ? 'दालन (Gallery)' : 'Gallery'}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubmenu === 'gallery' ? 'rotate-180' : ''}`} />
              </button>

              {mobileSubmenu === 'gallery' && (
                <div className="p-3 bg-[#FCFAF7] space-y-1 pl-2 text-xs">
                  <div onClick={() => handleGallerySelect('images')} className="py-1.5 cursor-pointer hover:text-[#C85413]">
                    • Image Gallery (छायाचित्र दालन)
                  </div>
                  <div onClick={() => handleGallerySelect('videos')} className="py-1.5 cursor-pointer hover:text-[#C85413]">
                    • Videos Gallery (व्हिडिओ दालन)
                  </div>
                </div>
              )}
            </div>

            {/* Contact us */}
            <button
              onClick={() => navigateTo('contact')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
                currentPage === 'contact' ? 'bg-[#FFF8F1] text-[#C85413] font-bold' : 'text-[#221D18]'
              }`}
            >
              {lang === 'mr' ? 'संपर्क (Contact us)' : 'Contact us'}
            </button>


            {/* Direct Helpline Action in mobile */}
            <div className="pt-3 border-t border-[#EFE8DA]">
              <a
                href={`tel:${PRIMARY_PHONE.replace(/\s+/g, '')}`}
                className="w-full py-3 px-4 rounded-xl bg-[#651728] text-white flex items-center justify-center gap-2 text-sm font-semibold shadow-md active:scale-98 transition-transform"
              >
                <Phone className="w-4 h-4 text-[#D49622]" />
                <span>Call: {PRIMARY_PHONE}</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
