import React, { useState } from 'react';
import { Search, X, BookOpen, Music, Calendar, ArrowRight } from 'lucide-react';
import { useAppLanguage } from '../../context/LanguageContext';
import { useAppData } from '../../context/DataContext';

interface SearchModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSelectAudio?: (item: any) => void;
  onSelectVideo?: (video: any) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectAudio,
  onSelectVideo
}) => {
  const { lang, isSearchOpen, setIsSearchOpen, openCourseDetail, setCurrentPage } = useAppLanguage();
  const { courses, audioItems, events, documentItems } = useAppData();
  const effectiveIsOpen = isOpen !== undefined ? isOpen : isSearchOpen;
  const [query, setQuery] = useState('');

  if (!effectiveIsOpen) return null;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setIsSearchOpen(false);
    }
  };

  const q = query.toLowerCase().trim();

  const matchedCourses = q
    ? courses.filter(
        c =>
          c.titleEn.toLowerCase().includes(q) ||
          c.titleMr.includes(q) ||
          c.descriptionEn.toLowerCase().includes(q) ||
          c.categoryLabelEn?.toLowerCase().includes(q)
      )
    : courses.slice(0, 3);

  const matchedAudios = q
    ? audioItems.filter(
        a =>
          a.titleEn.toLowerCase().includes(q) ||
          a.titleMr.includes(q) ||
          (a.shlokaText && a.shlokaText.includes(q)) ||
          a.reciter.toLowerCase().includes(q)
      )
    : audioItems.slice(0, 2);

  const matchedEvents = q
    ? events.filter(
        e =>
          e.titleEn.toLowerCase().includes(q) ||
          e.titleMr.includes(q) ||
          e.descriptionEn.toLowerCase().includes(q)
      )
    : events.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#FCFAF7] border border-[#E3D9C4] rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input bar */}
        <div className="p-4 border-b border-[#EFE8DA] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#C85413]" />
          <input
            type="text"
            autoFocus
            placeholder={
              lang === 'mr'
                ? 'अभ्यासक्रम, स्तोत्रे, कार्यक्रम किंवा माहिती शोधा...'
                : 'Search courses, audio stotras, events, or research papers...'
            }
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-[#221D18] focus:outline-none"
          />
          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-lg hover:bg-[#FAF7F2] flex items-center justify-center text-[#8A7E70]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          
          {/* Courses matches */}
          {matchedCourses.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A7E70] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#C85413]" />
                <span>{lang === 'mr' ? 'अभ्यासक्रम' : 'Courses & Programs'}</span>
              </span>
              <div className="grid grid-cols-1 gap-2">
                {matchedCourses.map(course => (
                  <div
                    key={course.id}
                    onClick={() => {
                      openCourseDetail(course.id);
                      handleClose();
                    }}
                    className="p-3 rounded-xl bg-white border border-[#EFE8DA] hover:border-[#C85413] hover:shadow-xs transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#221D18] group-hover:text-[#C85413] transition-colors">
                        {lang === 'mr' ? course.titleMr : course.titleEn}
                      </h4>
                      <p className="text-[11px] text-[#5C5348] line-clamp-1">
                        {course.duration} • {course.level} • {course.mode}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8A7E70] group-hover:text-[#C85413] group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Audio Chants Matches */}
          {matchedAudios.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A7E70] flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-[#C85413]" />
                <span>{lang === 'mr' ? 'स्तोत्रे व ऑडिओ' : 'Vedic Chants & Audio Stotras'}</span>
              </span>
              <div className="grid grid-cols-1 gap-2">
                {matchedAudios.map(audio => (
                  <div
                    key={audio.id}
                    onClick={() => {
                      if (onSelectAudio) onSelectAudio(audio);
                      handleClose();
                    }}
                    className="p-3 rounded-xl bg-white border border-[#EFE8DA] hover:border-[#C85413] hover:shadow-xs transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#221D18] group-hover:text-[#C85413] transition-colors">
                        {lang === 'mr' ? audio.titleMr : audio.titleEn}
                      </h4>
                      <p className="text-[11px] text-[#5C5348]">
                        Reciter: {audio.reciter} • {audio.duration}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-[#651728] group-hover:underline">
                      {lang === 'mr' ? 'ऐका' : 'Listen'} →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events Matches */}
          {matchedEvents.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A7E70] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C85413]" />
                <span>{lang === 'mr' ? 'कार्यक्रम व उत्सव' : 'Events & Celebrations'}</span>
              </span>
              <div className="grid grid-cols-1 gap-2">
                {matchedEvents.map(event => (
                  <div
                    key={event.id}
                    onClick={() => {
                      setCurrentPage('events');
                      handleClose();
                    }}
                    className="p-3 rounded-xl bg-white border border-[#EFE8DA] hover:border-[#C85413] hover:shadow-xs transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#221D18] group-hover:text-[#C85413] transition-colors">
                        {lang === 'mr' ? event.titleMr : event.titleEn}
                      </h4>
                      <p className="text-[11px] text-[#5C5348]">
                        {event.date} • {event.venueEn}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8A7E70] group-hover:text-[#C85413]" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer shortcuts hint */}
        <div className="p-3 bg-[#FAF7F2] border-t border-[#EFE8DA] text-[11px] text-[#8A7E70] flex items-center justify-between">
          <span>Surawanee Knowledge Engine (SQLite)</span>
          <span>Press ESC or click outside to dismiss</span>
        </div>
      </div>
    </div>
  );
};
