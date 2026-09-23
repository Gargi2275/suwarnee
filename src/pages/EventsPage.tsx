import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Sparkles, 
  CheckCircle, 
  Users, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAppLanguage } from '../context/LanguageContext';
import { useAppData } from '../context/DataContext';
import { TRUST_INFO } from '../data/mockData';
import { TraditionalDivider } from '../components/common/Motifs';
import { TrustEvent } from '../types';

export const EventsPage: React.FC = () => {
  const { lang, openEnrollModal } = useAppLanguage();
  const { events } = useAppData();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [forceEmptyState, setForceEmptyState] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState<{ [key: string]: boolean }>({});

  const upcomingEvents = events.filter(e => !e.isPast);
  const pastEvents = events.filter(e => e.isPast);

  const displayedEvents = activeTab === 'upcoming' 
    ? (forceEmptyState ? [] : upcomingEvents) 
    : pastEvents;

  const handleRegister = (id: string) => {
    setRegisteredEvents(prev => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <div className="space-y-12 pb-16 overflow-hidden">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#FFF8F1] via-[#FAF7F2] to-[#FAF7F2] border-b border-[#E3D9C4] py-12 sm:py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#C85413]">
            {lang === 'mr' ? '॥ उत्सव व व्याख्यानमाला ॥' : '॥ ANNUAL CULTURAL CELEBRATIONS ॥'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#651728]">
            {lang === 'mr' ? 'संस्थेचे सांस्कृतिक कार्यक्रम व उत्सव' : 'Events, Utsav & Vakyartha Sabha'}
          </h1>
          <p className="text-sm sm:text-base text-[#5C5348] max-w-2xl mx-auto leading-relaxed">
            {lang === 'mr'
              ? 'संस्कृत दिनोत्सव, गुरुपौर्णिमा वंदना, गीता जयंती पठण आणि विद्वत सभेचे आयोजन.'
              : 'Join our revered assemblies, student drama recitations, and seasonal Vedic rituals in Thane.'}
          </p>
        </motion.div>
      </section>

      {/* Tabs & Empty-State Switcher Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-4 rounded-2xl bg-[#FCFAF7] border border-[#E3D9C4] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs"
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('upcoming');
                setForceEmptyState(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'upcoming' && !forceEmptyState
                  ? 'bg-[#C85413] text-white shadow-xs scale-105'
                  : 'bg-[#FAF7F2] text-[#5C5348] hover:bg-[#F4EFE6] border border-[#D1C3A7]'
              }`}
            >
              {lang === 'mr' ? 'आगामी कार्यक्रम (Upcoming)' : 'Upcoming Events'}
            </button>
            <button
              onClick={() => {
                setActiveTab('past');
                setForceEmptyState(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'past'
                  ? 'bg-[#651728] text-white shadow-xs scale-105'
                  : 'bg-[#FAF7F2] text-[#5C5348] hover:bg-[#F4EFE6] border border-[#D1C3A7]'
              }`}
            >
              {lang === 'mr' ? 'मागील उत्सव (Past Events)' : 'Past Celebrations'}
            </button>
          </div>

          {/* Prompt Empty State preview toggle */}
          <div className="flex items-center gap-2 bg-[#F7F3EB] px-3 py-1.5 rounded-xl border border-[#D1C3A7] text-xs">
            <span className="text-[#5C5348] font-medium">Demo State:</span>
            <button
              onClick={() => {
                setActiveTab('upcoming');
                setForceEmptyState(true);
              }}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                forceEmptyState
                  ? 'bg-[#651728] text-white'
                  : 'text-[#5C5348] hover:text-[#221D18]'
              }`}
            >
              {lang === 'mr' ? 'रिक्त स्थिती (Empty State)' : 'Show "No Events" State'}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Events Listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {displayedEvents.length === 0 ? (
          /* Empty State mandated by prompt */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 px-6 text-center rounded-3xl bg-[#FCFAF7] border-2 border-dashed border-[#D1C3A7] max-w-2xl mx-auto space-y-4 shadow-sm"
          >
            <div className="w-16 h-16 rounded-full bg-[#FFF8F1] border-2 border-[#C85413]/30 flex items-center justify-center mx-auto text-[#C85413]">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#221D18]">
              {lang === 'mr' ? 'सध्या कोणतेही आगामी कार्यक्रम नियोजित नाहीत' : 'No upcoming events at the moment'}
            </h3>
            <p className="text-sm text-[#5C5348] leading-relaxed max-w-md mx-auto">
              {lang === 'mr'
                ? 'नवीन व्याख्याने व संस्कृत महोत्सवांचे वेळापत्रक लवकरच प्रकाशित केले जाईल. आपण आमचे नियमित वर्ग किंवा मागील कार्यक्रमांचे अहवाल पाहू शकता.'
                : 'Please check back soon for our upcoming Sanskrit Dinotsav schedule, workshops, and ritual lectures. You can also view our past celebration reports below.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveTab('past');
                  setForceEmptyState(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#651728] hover:bg-[#4D101E] text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                {lang === 'mr' ? 'मागील उत्सव अहवाल पहा' : 'View Past Celebrations Archive'}
              </button>
              <button
                onClick={() => setForceEmptyState(false)}
                className="px-4 py-2.5 rounded-xl bg-[#FAF0F2] text-[#883008] text-xs font-semibold border border-[#C85413]/30 cursor-pointer"
              >
                {lang === 'mr' ? 'पुन्हा कार्यक्रम दाखवा' : 'Reset Event Preview'}
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayedEvents.map((event, idx) => {
              const isRegistered = registeredEvents[event.id];

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02, rotateX: 2 }}
                  className="rounded-3xl bg-[#FCFAF7] border-2 border-[#E3D9C4] hover:border-[#C85413] shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative aspect-16/9 overflow-hidden bg-stone-900">
                    <img
                      src={event.image}
                      alt={event.titleEn}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4 text-white">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#C85413] text-white">
                          {event.category}
                        </span>
                        {event.isPast && (
                          <span className="text-[11px] px-2 py-0.5 rounded bg-black/60 text-amber-200">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-xs text-[#883008] font-semibold">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#C85413]" />
                          {event.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#C85413]" />
                          {event.time}
                        </span>
                      </div>

                      <h3 className="text-lg font-serif font-bold text-[#221D18] leading-snug">
                        {lang === 'mr' ? event.titleMr : event.titleEn}
                      </h3>

                      <p className="text-xs text-[#5C5348] leading-relaxed">
                        {lang === 'mr' ? event.descriptionMr : event.descriptionEn}
                      </p>

                      <div className="p-3 rounded-xl bg-[#F7F3EB] border border-[#EFE8DA] text-xs space-y-1">
                        <div className="flex items-start gap-1.5 text-[#4A433B]">
                          <MapPin className="w-3.5 h-3.5 text-[#C85413] shrink-0 mt-0.5" />
                          <span>{lang === 'mr' ? event.venueMr : event.venueEn}</span>
                        </div>
                        {event.speaker && (
                          <div className="flex items-center gap-1.5 text-[#883008] font-medium">
                            <User className="w-3.5 h-3.5 text-[#C85413]" />
                            <span>Speaker / Vidwan: {event.speaker}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {!event.isPast && (
                      <div className="pt-4 border-t border-[#EFE8DA]">
                        <button
                          onClick={() => handleRegister(event.id)}
                          className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            isRegistered
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#C85413] hover:bg-[#A83E0A] text-white shadow-xs'
                          }`}
                        >
                          {isRegistered ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              <span>{lang === 'mr' ? 'नोंदणी निश्चित झाली!' : 'Seat Reserved!'}</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 text-amber-200" />
                              <span>{lang === 'mr' ? 'उपस्थितीसाठी विनामूल्य नोंदणी करा' : 'Register Free for Event'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
