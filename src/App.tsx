import React, { useState, useEffect } from 'react';
import { LanguageProvider, useAppLanguage } from './context/LanguageContext';
import { DataProvider, useAppData } from './context/DataContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { AudioPlayerModal } from './components/common/AudioPlayerModal';
import { VideoModal } from './components/common/VideoModal';
import { LightboxModal } from './components/common/LightboxModal';
import { EnrollmentModal } from './components/common/EnrollmentModal';
import { DonateModal } from './components/common/DonateModal';
import { SearchModal } from './components/common/SearchModal';
import { AncientScrollFrame } from './components/common/AncientScrollFrame';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { KnowledgeSharePage } from './pages/KnowledgeSharePage';
import { EventsPage } from './pages/EventsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

import { AudioItem, VideoItem, GalleryItem } from './types';
import { ArrowUp } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { 
    currentPage, 
    isEnrollModalOpen, 
    setIsEnrollModalOpen, 
    enrollCourseTitle,
    isDonateModalOpen,
    setIsDonateModalOpen,
    isSearchOpen,
    setIsSearchOpen
  } = useAppLanguage();

  const { galleryItems } = useAppData();

  const [isReplayingScroll, setIsReplayingScroll] = useState<boolean>(false);

  const handleReplayIntro = () => {
    setIsReplayingScroll(prev => !prev);
  };

  // Modal States
  const [activeAudio, setActiveAudio] = useState<AudioItem | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    images: GalleryItem[];
    initialIndex: number;
  }>({
    isOpen: false,
    images: [],
    initialIndex: 0
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lightbox opener
  const handleOpenLightbox = (item: GalleryItem, index: number) => {
    setLightboxData({
      isOpen: true,
      images: galleryItems.length > 0 ? galleryItems : [item],
      initialIndex: index
    });
  };

  return (
    <div className="min-h-screen bg-[#120C08] text-[#221D18] flex flex-col font-sans selection:bg-[#C85413] selection:text-white">
      {/* If on Admin portal, render standalone dedicated admin dashboard without public Header/Footer */}
      {currentPage === 'admin' ? (
        <main className="flex-1">
          <AdminPage />
        </main>
      ) : (
        <AncientScrollFrame isReplaying={isReplayingScroll}>
          {/* Universal Public Website Header */}
          <Header onReplayIntro={handleReplayIntro} />

          {/* Main Dynamic View */}
          <main className="flex-1">
            {currentPage === 'home' && (
              <HomePage
                onPlayAudio={item => setActiveAudio(item)}
                onPlayVideo={video => setActiveVideo(video)}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage onOpenLightbox={handleOpenLightbox} />
            )}

            {currentPage === 'courses' && <CoursesPage />}

            {currentPage === 'course-detail' && (
              <CourseDetailPage onPlayAudio={item => setActiveAudio(item)} />
            )}

            {currentPage === 'knowledge-share' && (
              <KnowledgeSharePage
                onPlayAudio={item => setActiveAudio(item)}
                onPlayVideo={video => setActiveVideo(video)}
              />
            )}

            {currentPage === 'events' && <EventsPage />}

            {currentPage === 'gallery' && (
              <GalleryPage
                onOpenLightbox={handleOpenLightbox}
                onPlayVideo={video => setActiveVideo(video)}
              />
            )}

            {currentPage === 'contact' && <ContactPage />}
          </main>

          {/* Universal Public Website Footer */}
          <Footer />
        </AncientScrollFrame>
      )}

      {/* Modals */}
      <AudioPlayerModal
        isOpen={!!activeAudio}
        audioItem={activeAudio}
        onClose={() => setActiveAudio(null)}
      />

      <VideoModal
        isOpen={!!activeVideo}
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

      <LightboxModal
        isOpen={lightboxData.isOpen}
        images={lightboxData.images}
        initialIndex={lightboxData.initialIndex}
        onClose={() => setLightboxData(prev => ({ ...prev, isOpen: false }))}
      />

      <EnrollmentModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        preselectedCourse={enrollCourseTitle}
      />

      <DonateModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAudio={item => setActiveAudio(item)}
        onSelectVideo={video => setActiveVideo(video)}
      />

      {/* Back to top button (only on public pages) */}
      {showScrollTop && currentPage !== 'admin' && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-[#C85413] hover:bg-[#883008] text-white shadow-xl flex items-center justify-center transition-all z-40 animate-in fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <LanguageProvider>
        <MainLayout />
      </LanguageProvider>
    </DataProvider>
  );
}
