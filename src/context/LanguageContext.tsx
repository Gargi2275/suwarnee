import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, PageId } from '../types';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  openCourseDetail: (courseId: string) => void;
  isEnrollModalOpen: boolean;
  setIsEnrollModalOpen: (open: boolean) => void;
  enrollCourseTitle: string;
  openEnrollModal: (courseTitle?: string) => void;
  isDonateModalOpen: boolean;
  setIsDonateModalOpen: (open: boolean) => void;
  openDonateModal: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  knowledgeShareFilter: string;
  setKnowledgeShareFilter: (filter: string) => void;
  galleryFilter: string;
  setGalleryFilter: (filter: string) => void;
  navigateToKnowledgeShare: (filter?: string) => void;
  navigateToGallery: (filter?: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.includes('/admin') || hash.includes('admin')) {
      return 'admin';
    }
    return 'home';
  });
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>('stotra-pathan');
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrollCourseTitle, setEnrollCourseTitle] = useState('');
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [knowledgeShareFilter, setKnowledgeShareFilter] = useState<string>('all');
  const [galleryFilter, setGalleryFilter] = useState<string>('all');

  React.useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('/admin') || hash.includes('admin')) {
        setCurrentPage('admin');
      }
    };
    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'mr' : 'en'));
  };

  const openCourseDetail = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentPage('course-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEnrollModal = (courseTitle?: string) => {
    setEnrollCourseTitle(courseTitle || 'Surawanee Course Admissions');
    setIsEnrollModalOpen(true);
  };

  const openDonateModal = () => {
    setIsDonateModalOpen(true);
  };

  const navigateToKnowledgeShare = (filter?: string) => {
    if (filter) setKnowledgeShareFilter(filter);
    setCurrentPage('knowledge-share');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToGallery = (filter?: string) => {
    if (filter) setGalleryFilter(filter);
    setCurrentPage('gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        currentPage,
        setCurrentPage: (page: PageId) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        selectedCourseId,
        setSelectedCourseId,
        openCourseDetail,
        isEnrollModalOpen,
        setIsEnrollModalOpen,
        enrollCourseTitle,
        openEnrollModal,
        isDonateModalOpen,
        setIsDonateModalOpen,
        openDonateModal,
        isSearchOpen,
        setIsSearchOpen,
        knowledgeShareFilter,
        setKnowledgeShareFilter,
        galleryFilter,
        setGalleryFilter,
        navigateToKnowledgeShare,
        navigateToGallery
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useAppLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useAppLanguage must be used within a LanguageProvider');
  }
  return context;
};
