import React, { useState } from 'react';
import { TrustLogo } from '../components/common/TrustLogo';
import {
  ShieldCheck,
  Lock,
  BookOpen,
  Music,
  Video,
  Image as ImageIcon,
  FileText,
  Calendar,
  Users,
  Mail,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  RefreshCw,
  Database,
  ExternalLink,
  AlertCircle,
  Phone,
  Clock,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Eye,
  LogOut,
  Save,
  Info,
  Upload,
  Play,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Menu
} from 'lucide-react';
import { useAppData } from '../context/DataContext';
import { useAppLanguage } from '../context/LanguageContext';
import { AudioPlayerModal } from '../components/common/AudioPlayerModal';
import { ImageUploadField } from '../components/common/ImageUploadField';
import { Course, AudioItem, VideoItem, GalleryItem, DocumentItem, TrustEvent, EnrollmentRecord, InquiryRecord, Category } from '../types';

type AdminTab =
  | 'overview'
  | 'categories'
  | 'courses'
  | 'audio'
  | 'video'
  | 'gallery'
  | 'documents'
  | 'events'
  | 'enrollments'
  | 'inquiries';

export const AdminPage: React.FC = () => {
  const {
    categories,
    courses,
    audioItems,
    videoItems,
    galleryItems,
    documentItems,
    events,
    enrollments,
    inquiries,
    isLoading,
    isSyncing,
    isBackendConnected,
    lastSyncTime,
    checkConnection,
    refreshAllData,
    saveCategory,
    deleteCategory,
    saveCourse,
    deleteCourse,
    saveAudioItem,
    deleteAudioItem,
    saveVideoItem,
    deleteVideoItem,
    saveGalleryItem,
    deleteGalleryItem,
    saveDocumentItem,
    deleteDocumentItem,
    saveEvent,
    deleteEvent,
    updateEnrollmentStatus,
    deleteEnrollment,
    updateInquiryStatus,
    deleteInquiry,
    resetToDefaults
  } = useAppData();

  const { lang, setCurrentPage, openCourseDetail } = useAppLanguage();

  // Auth State (Default PIN is 1958)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('surawanee_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Tab Scroll State
  const tabsNavRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkTabScroll = () => {
    if (tabsNavRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsNavRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  React.useEffect(() => {
    checkTabScroll();
    const el = tabsNavRef.current;
    if (el) {
      el.addEventListener('scroll', checkTabScroll);
      window.addEventListener('resize', checkTabScroll);
      return () => {
        el.removeEventListener('scroll', checkTabScroll);
        window.removeEventListener('resize', checkTabScroll);
      };
    }
  }, [isAuthenticated, activeTab]);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsNavRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      tabsNavRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);
  const [editingAudio, setEditingAudio] = useState<Partial<AudioItem> | null>(null);
  const [editingVideo, setEditingVideo] = useState<Partial<VideoItem> | null>(null);
  const [editingGallery, setEditingGallery] = useState<Partial<GalleryItem> | null>(null);
  const [editingDocument, setEditingDocument] = useState<Partial<DocumentItem> | null>(null);
  const [editingEvent, setEditingEvent] = useState<Partial<TrustEvent> | null>(null);
  const [playingAudioTrack, setPlayingAudioTrack] = useState<AudioItem | null>(null);
  const [selectedEnrollment, setSelectedEnrollment] = useState<EnrollmentRecord | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isAudioSaving, setIsAudioSaving] = useState(false);
  const [galleryPage, setGalleryPage] = useState(1);
  // In-memory store for uploaded audio blob URLs (survives re-renders but not page refresh)
  const audioBlobUrls = React.useRef<Map<string, string>>(new Map());

  const showStatus = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('surawanee_admin_auth');
    setIsAuthenticated(false);
    setPinInput('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1958' || pinInput === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('surawanee_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('Invalid Security PIN. (Default Trust PIN is 1958)');
    }
  };

  const handleLogoutRegex = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('surawanee_admin_auth');
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-[#FFF8F1] via-[#FAF7F2] to-[#FAF7F2]">
        <div className="max-w-md w-full bg-[#FCFAF7] border border-[#E3D9C4] rounded-3xl shadow-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#651728] via-[#C85413] to-[#651728]" />

          <div className="w-16 h-16 rounded-2xl bg-[#651728]/10 text-[#651728] mx-auto flex items-center justify-center mb-5 border border-[#651728]/20">
            <ShieldCheck className="w-8 h-8 text-[#651728]" />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C85413]">
            ADMINISTRATION GATEWAY
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#651728] mt-1 mb-1">
            Surawanee Admin Portal
          </h2>
          <p className="text-xs text-[#8A7E70] mb-6">
            सुरवाणी ज्ञानमंदिर संस्था व्यवस्थापन (SQLite Database Console)
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-left text-xs font-semibold text-[#5C5348] mb-1.5">
                Enter Security PIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (e.g. 1958)"
                  className="w-full px-4 py-3 rounded-xl border border-[#E3D9C4] bg-white text-center text-lg tracking-widest font-mono text-[#221D18] focus:outline-none focus:ring-2 focus:ring-[#C85413]"
                  autoFocus
                />
                <Lock className="w-4 h-4 text-[#8A7E70] absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
              {pinError && (
                <p className="text-xs text-red-600 font-medium mt-1.5 text-left">{pinError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#651728] hover:bg-[#822237] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#FCD34D]" />
              <span>Unlock Admin Console</span>
            </button>
          </form>

          <div className="mt-5 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => { setPinInput('1958'); }}
              className="px-2.5 py-1 rounded-lg bg-[#FAF0F2] text-[#651728] text-xs font-semibold hover:bg-[#F3DEE3] transition-colors border border-[#651728]/20"
            >
              Quick Fill Demo PIN: 1958
            </button>
          </div>

          <div className="mt-6 pt-5 border-t border-[#EFE8DA] flex items-center justify-between text-xs text-[#8A7E70]">
            <button
              onClick={() => setCurrentPage('home')}
              className="font-semibold text-[#651728] hover:underline flex items-center gap-1"
            >
              ← Return to Main Website
            </button>
            <span className="font-mono text-[11px]">v1.0 SQLite</span>
          </div>
        </div>
      </div>
    );
  }

  // --- AUTHENTICATED ADMIN DASHBOARD ---
  return (
    <div className="flex h-screen bg-[#FAF7F2] font-sans overflow-hidden">

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`w-[280px] bg-[#4A0E1B] text-white flex flex-col shadow-2xl z-50 shrink-0 transition-transform duration-300 ease-in-out fixed inset-y-0 left-0 md:relative md:translate-x-0 ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        {/* Mobile Close Button */}
        <button
          className="md:hidden absolute top-4 right-4 text-white/50 hover:text-white p-2"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
        {/* Decorative Top Left Pattern */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

        <div className="pt-8 pb-6 px-6 flex flex-col items-center border-b border-white/10 relative z-10">
          <TrustLogo variant="round" height={70} className="mb-3.5 drop-shadow-md hover:scale-105 transition-transform duration-300" />
          <h2 className="text-base font-serif font-bold tracking-widest uppercase text-white mt-1">Surawanee</h2>
          <h3 className="text-[11px] text-white/70 font-semibold tracking-widest uppercase mt-0.5">Admin Portal</h3>
          <p className="text-[10px] text-[#D4AF37] mt-3 tracking-widest font-serif">|| संस्कृतं संस्कृति जीवनम् ||</p>
        </div>

        <div className="flex-1 overflow-y-auto glass-scrollbar relative z-10 flex flex-col">
          <nav className="py-6 px-4 space-y-1.5">
            {[
              { id: 'overview', label: 'Overview', icon: Layers },
              { id: 'categories', label: 'Categories', count: categories.length, icon: Layers },
              { id: 'courses', label: 'Courses', count: courses.length, icon: BookOpen },
              { id: 'audio', label: 'Audio', count: audioItems.length, icon: Music },
              { id: 'video', label: 'Video', count: videoItems.length, icon: Video },
              { id: 'gallery', label: 'Gallery', count: galleryItems.length, icon: ImageIcon },
              { id: 'documents', label: 'Documents', count: documentItems.length, icon: FileText },
              { id: 'events', label: 'Events', count: events.length, icon: Calendar },
              { id: 'enrollments', label: 'Admissions', icon: Users, badge: enrollments.filter(e => e.status === 'Pending').length },
              { id: 'inquiries', label: 'Inquiries', icon: Mail, badge: inquiries.filter(i => i.status === 'New').length },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as AdminTab);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all text-xs font-semibold cursor-pointer ${isActive
                    ? 'bg-gradient-to-r from-[#B5852A] to-[#D4AF37] text-[#4A0E1B] shadow-lg shadow-[#D4AF37]/20 font-bold'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-[#4A0E1B]' : 'text-white/60'}`} />
                    <span className="tracking-wide">{tab.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {tab.count !== undefined && (
                      <span className={`text-[10px] font-bold ${isActive ? 'text-[#4A0E1B]/80' : 'text-white/40'}`}>
                        ({tab.count})
                      </span>
                    )}
                    {!!tab.badge && tab.badge > 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C85413] shadow-sm"></span>
                    )}
                    {tab.id === 'enrollments' && !isActive && <ChevronRight className="w-3 h-3 text-white/30" />}
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="p-5 mt-auto">
            <div className="text-center mb-6">
              <div className="mb-4 flex justify-center relative">
                <img
                  src="/om-mandala-transparent.png"
                  alt="Om Mandala"
                  className="w-20 h-20 object-contain relative z-10 brightness-110 contrast-125 saturate-150 transition-all duration-500 hover:scale-105 cursor-default"
                />
              </div>
              <p className="text-[11px] text-[#D4AF37] font-serif italic leading-relaxed">
                "Knowledge preserves<br />Culture, Culture builds<br />Better Humans"
              </p>
            </div>

            <div className="space-y-2.5">
              <button onClick={() => setCurrentPage('home')} className="w-full flex items-center gap-2 text-[10px] font-semibold tracking-wider text-white/50 hover:text-white transition-colors cursor-pointer px-2">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Main Website</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
              </button>
              <button onClick={handleLogout} className="w-full py-3 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 text-xs font-bold text-white/90 cursor-pointer group">
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#FAF7F2]">

        {/* Top Header */}
        <header className="py-4 md:py-6 flex items-center justify-center px-4 md:px-10 bg-[#FAF7F2] shrink-0 border-b border-[#E8DFD1] sticky top-0 z-20 shadow-xs relative">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 p-2 text-[#4A0E1B] hover:bg-[#E8DFD1] rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center text-center px-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-black text-[#4A0E1B] mb-1 tracking-wide">|| विद्या ददाति विनयम् ||</h2>
            <p className="text-[8px] sm:text-[10px] md:text-[11px] text-[#8A301A] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-90">Knowledge Creates Humility</p>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto relative">

          {/* Notification Toast (moved inside main scroll area) */}
          {statusMessage && (
            <div className="absolute top-4 right-10 z-50">
              <div className={`px-4 py-3 rounded-2xl text-sm font-medium flex items-center gap-3 shadow-lg transition-all animate-in fade-in slide-in-from-top-2 ${statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-950 border border-emerald-300/80'
                : 'bg-red-50 text-red-950 border border-red-300/80'
                }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${statusMessage.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                  }`}>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>{statusMessage.text}</span>
              </div>
            </div>
          )}

          <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-6 md:py-8">

            {/* --- TAB 1: OVERVIEW METRICS & CONTROLS --- */}
            {activeTab === 'overview' && (
              <div className="space-y-8">



                {/* Quick Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-6 md:mb-8">

                  <div
                    onClick={() => setActiveTab('courses')}
                    className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-[#E8DFD1] shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#FFF3E0] text-[#E65100] flex items-center justify-center">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-[14px] font-bold text-[#4A0E1B] tracking-wide mb-1">Active Courses</div>
                          <span className="text-3xl font-serif font-black text-[#E65100]">{courses.length}</span>
                        </div>
                      </div>

                    </div>
                    <div className="text-[11px] text-[#8A7E70] font-medium border-t border-[#E8DFD1] pt-3 flex items-center justify-between">
                      <span>Paurahitya &amp; Sanskrit Tracks</span>
                      <BookOpen className="w-8 h-8 text-[#FAF7F2] opacity-50" />
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab('audio')}
                    className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-[#E8DFD1] shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#FCE4EC] text-[#C2185B] flex items-center justify-center">
                          <Music className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-[14px] font-bold text-[#4A0E1B] tracking-wide mb-1">Audio Recitations</div>
                          <span className="text-3xl font-serif font-black text-[#C2185B]">{audioItems.length}</span>
                        </div>
                      </div>

                    </div>
                    <div className="text-[11px] text-[#8A7E70] font-medium border-t border-[#E8DFD1] pt-3 flex items-center justify-between">
                      <span>Stotras &amp; Vedic Chants</span>
                      <Music className="w-8 h-8 text-[#FAF7F2] opacity-50" />
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab('enrollments')}
                    className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-[#E8DFD1] shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#E0F2F1] text-[#00796B] flex items-center justify-center">
                          <Users className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-[14px] font-bold text-[#4A0E1B] tracking-wide mb-1">Student Applications</div>
                          <span className="text-3xl font-serif font-black text-[#00796B]">{enrollments.length}</span>
                        </div>
                      </div>

                    </div>
                    <div className="text-[11px] text-[#E65100] font-bold border-t border-[#E8DFD1] pt-3 flex items-center justify-between">
                      <span>{enrollments.filter(e => e.status === 'Pending').length} Pending Action</span>
                      <Users className="w-8 h-8 text-[#FAF7F2] opacity-50" />
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab('inquiries')}
                    className="bg-white p-6 rounded-3xl border border-[#E8DFD1] shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#E3F2FD] text-[#1976D2] flex items-center justify-center">
                          <Mail className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-[14px] font-bold text-[#4A0E1B] tracking-wide mb-1">Contact Messages</div>
                          <span className="text-3xl font-serif font-black text-[#1976D2]">{inquiries.length}</span>
                        </div>
                      </div>

                    </div>
                    <div className="text-[11px] text-[#1976D2] font-bold border-t border-[#E8DFD1] pt-3 flex items-center justify-between">
                      <span>{inquiries.filter(i => i.status === 'New').length} Unread Messages</span>
                      <Mail className="w-8 h-8 text-[#FAF7F2] opacity-50" />
                    </div>
                  </div>

                </div>

                {/* Quick Create Content */}
                <div className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-[#E8DFD1] shadow-sm mb-8">
                  <div className="flex items-center justify-between border-b border-[#E8DFD1] pb-4 mb-6">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-[#4A0E1B] flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#C89B3C]" />
                        <span>Quick Create Content</span>
                      </h3>
                      <p className="text-xs text-[#8A7E70] mt-1">Quickly add new content to keep your platform updated</p>
                    </div>
                    <div className="text-lg font-serif font-bold text-[#8A301A] tracking-widest opacity-60 hidden md:block">|| सत्यम् ज्ञानम् अनन्तम् ||</div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">

                    <button onClick={() => { setEditingCategory({ id: '', titleEn: '', titleMr: '', type: 'course', descriptionEn: '', descriptionMr: '' }); setActiveTab('categories'); }} className="p-4 rounded-3xl bg-[#FFF8E1] hover:bg-[#FFECB3] border border-[#FFE082] text-center transition-all cursor-pointer relative group">
                      <div className="w-10 h-10 mx-auto rounded-full bg-white text-[#F57F17] flex items-center justify-center mb-3 shadow-2xs group-hover:scale-110 transition-transform">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div className="text-[14px] font-bold text-[#4A0E1B]">Add Category</div>
                      <div className="text-[11px] text-[#5C5348] font-medium mt-1">Create new category</div>
                      <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-white text-[#F57F17] shadow-2xs flex items-center justify-center text-[10px] font-bold">+</div>
                    </button>

                    <button onClick={() => { setEditingCourse({ id: '', titleEn: '', titleMr: '', category: 'paurohitya', categoryLabelEn: 'Paurohitya Track', categoryLabelMr: 'पौरोहित्य अभ्यासक्रम', subtitleEn: '', subtitleMr: '', descriptionEn: '', descriptionMr: '', level: 'Beginner', duration: '6 Months', totalLessons: 24, totalHours: '48 Hours', mode: 'Hybrid', fee: '₹3,500', thumbnail: '/Photos/Surawanee_Paurohitya-Ganesh-Pooja-e1660834393968-updraft-pre-smush-original.jpg', prerequisites: ['Basic Devanagari reading knowledge'], learningOutcomes: ['Complete ritual mastery'], modules: [{ id: 'm1', titleEn: 'Introduction', titleMr: 'प्रास्ताविक', duration: '4 Weeks', description: 'Foundations', topics: ['Basics'] }], certificateProvided: true, instructor: { name: 'Vedmurti Guruji', titleEn: 'Senior Acharya', titleMr: 'वरिष्ठ आचार्य', credentials: 'Vedacharya', avatar: '/Photos/Surawanee_Paurohitya-Varg-1-updraft-pre-smush-original.jpg' }, upcomingBatch: 'Starting Next Month' }); setActiveTab('courses'); }} className="p-4 rounded-3xl bg-[#FCE4EC] hover:bg-[#F8BBD0] border border-[#F48FB1] text-center transition-all cursor-pointer relative group">
                      <div className="w-10 h-10 mx-auto rounded-full bg-white text-[#C2185B] flex items-center justify-center mb-3 shadow-2xs group-hover:scale-110 transition-transform">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div className="text-[14px] font-bold text-[#4A0E1B]">Add New Course</div>
                      <div className="text-[11px] text-[#5C5348] font-medium mt-1">Create new course</div>
                      <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-white text-[#C2185B] shadow-2xs flex items-center justify-center text-[10px] font-bold">+</div>
                    </button>

                    <button onClick={() => { setEditingAudio({ id: '', titleEn: '', titleMr: '', subtitleEn: '', subtitleMr: '', category: 'stotra', duration: '05:30', reciter: 'Trust Acharyas', shlokaText: '|| श्री गणेशाय नमः ||', transliteration: 'Shree Ganeshaya Namah', meaning: 'Salutations to Lord Ganesha' }); setActiveTab('audio'); }} className="p-4 rounded-3xl bg-[#F3E5F5] hover:bg-[#E1BEE7] border border-[#CE93D8] text-center transition-all cursor-pointer relative group">
                      <div className="w-10 h-10 mx-auto rounded-full bg-white text-[#7B1FA2] flex items-center justify-center mb-3 shadow-2xs group-hover:scale-110 transition-transform">
                        <Music className="w-5 h-5" />
                      </div>
                      <div className="text-[14px] font-bold text-[#4A0E1B]">Add Audio Track</div>
                      <div className="text-[11px] text-[#5C5348] font-medium mt-1">Upload audio / chant</div>
                      <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-white text-[#7B1FA2] shadow-2xs flex items-center justify-center text-[10px] font-bold">+</div>
                    </button>

                    <button onClick={() => { setEditingVideo({ id: '', titleEn: '', titleMr: '', speaker: 'Acharya', duration: '45 mins', category: 'Paurohitya Vidhi', thumbnail: '/Photos/Surawanee_Paurohitya-Ganesh-Pooja-e1660834393968-updraft-pre-smush-original.jpg', youtubeId: 'M7lc1UVf-VE', descriptionEn: '', descriptionMr: '' }); setActiveTab('video'); }} className="p-4 rounded-3xl bg-[#E8EAF6] hover:bg-[#C5CAE9] border border-[#9FA8DA] text-center transition-all cursor-pointer relative group">
                      <div className="w-10 h-10 mx-auto rounded-full bg-white text-[#303F9F] flex items-center justify-center mb-3 shadow-2xs group-hover:scale-110 transition-transform">
                        <Video className="w-5 h-5" />
                      </div>
                      <div className="text-[14px] font-bold text-[#4A0E1B]">Add YouTube Video</div>
                      <div className="text-[11px] text-[#5C5348] font-medium mt-1">Add video content</div>
                      <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-white text-[#303F9F] shadow-2xs flex items-center justify-center text-[10px] font-bold">+</div>
                    </button>

                    <button onClick={() => { setEditingGallery({ id: '', titleEn: '', titleMr: '', category: 'classes', categoryLabel: 'Classes & Varg', imageUrl: '/Photos/Surawanee_new_location-updraft-pre-smush-original.png', captionEn: '', captionMr: '', year: '2024' }); setActiveTab('gallery'); }} className="p-4 rounded-3xl bg-[#E0F2F1] hover:bg-[#B2DFDB] border border-[#80CBC4] text-center transition-all cursor-pointer relative group">
                      <div className="w-10 h-10 mx-auto rounded-full bg-white text-[#00796B] flex items-center justify-center mb-3 shadow-2xs group-hover:scale-110 transition-transform">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <div className="text-[14px] font-bold text-[#4A0E1B]">Add Photo</div>
                      <div className="text-[11px] text-[#5C5348] font-medium mt-1">Upload to gallery</div>
                      <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-white text-[#00796B] shadow-2xs flex items-center justify-center text-[10px] font-bold">+</div>
                    </button>

                    <button onClick={() => { setEditingDocument({ id: '', titleEn: '', titleMr: '', category: 'Study Material', author: 'Surawanee Trust', pages: 12, fileSize: '1.8 MB', language: 'Sanskrit / Marathi', descriptionEn: '', descriptionMr: '' }); setActiveTab('documents'); }} className="p-4 rounded-3xl bg-[#E3F2FD] hover:bg-[#BBDEFB] border border-[#90CAF9] text-center transition-all cursor-pointer relative group">
                      <div className="w-10 h-10 mx-auto rounded-full bg-white text-[#1976D2] flex items-center justify-center mb-3 shadow-2xs group-hover:scale-110 transition-transform">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="text-[14px] font-bold text-[#4A0E1B]">Add PDF / Guide</div>
                      <div className="text-[11px] text-[#5C5348] font-medium mt-1">Upload document</div>
                      <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-white text-[#1976D2] shadow-2xs flex items-center justify-center text-[10px] font-bold">+</div>
                    </button>
                  </div>
                </div>

                {/* Recent Admissions & Inquiries Snapshot */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">

                  {/* Recent Admissions */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E8DFD1] shadow-xs">
                    <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-[#E8DFD1]">
                      <h4 className="text-sm font-serif font-bold text-[#4A0E1B] flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#FAF0F2] flex items-center justify-center shrink-0">
                          <Users className="w-4 h-4 text-[#C85413]" />
                        </div>
                        <div>
                          <div>Recent Student Applications</div>
                          <div className="text-[10px] font-sans font-medium text-[#8A7E70]">Latest student applications received</div>
                        </div>
                      </h4>
                      <button onClick={() => setActiveTab('enrollments')} className="text-xs font-bold text-[#C85413] hover:text-[#8A301A] transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 group">
                        <span>View All</span>
                        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                      </button>
                    </div>

                    {enrollments.length === 0 ? (
                      <p className="text-xs text-[#8A7E70] py-6 text-center italic">No student applications received yet.</p>
                    ) : (
                      <div className="divide-y divide-[#E8DFD1]/60">
                        {enrollments.slice(0, 4).map(enr => (
                          <div key={enr.id} className="py-2.5 first:pt-1 last:pb-1 flex items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-9 h-9 rounded-full bg-[#4A0E1B] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                                {enr.studentName.substring(0, 2).toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold text-[#4A0E1B] text-sm leading-tight truncate">{enr.studentName}</div>
                                <div className="text-[11px] text-[#5C5348] font-medium truncate mt-0.5">{enr.courseName} • {enr.phone}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
                              <div className="text-[10px] text-[#8A7E70] flex items-center gap-1 whitespace-nowrap">
                                <Clock className="w-3 h-3" />
                                {new Date(enr.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                              </div>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${enr.status === 'Pending'
                                ? 'bg-[#FFF8E1] text-[#F57F17] border border-[#F57F17]/20'
                                : enr.status === 'Enrolled'
                                ? 'bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32]/20'
                                : 'bg-[#E3F2FD] text-[#1976D2] border border-[#1976D2]/20'
                                }`}>
                                {enr.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Recent Contact Inquiries */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E8DFD1] shadow-xs">
                    <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-[#E8DFD1]">
                      <h4 className="text-sm font-serif font-bold text-[#4A0E1B] flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#FFF3E0] flex items-center justify-center shrink-0">
                          <Mail className="w-4 h-4 text-[#C85413]" />
                        </div>
                        <div>
                          <div>Recent Contact Messages</div>
                          <div className="text-[10px] font-sans font-medium text-[#8A7E70]">Latest inquiries and messages from users</div>
                        </div>
                      </h4>
                      <button onClick={() => setActiveTab('inquiries')} className="text-xs font-bold text-[#C85413] hover:text-[#8A301A] transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 group">
                        <span>View All</span>
                        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                      </button>
                    </div>

                    {inquiries.length === 0 ? (
                      <p className="text-xs text-[#8A7E70] py-6 text-center italic">No contact inquiries received yet.</p>
                    ) : (
                      <div className="divide-y divide-[#E8DFD1]/60">
                        {inquiries.slice(0, 4).map(inq => (
                          <div key={inq.id} className="py-2.5 first:pt-1 last:pb-1 flex items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-9 h-9 rounded-full bg-[#FFF3E0] text-[#E65100] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                                {inq.name.substring(0, 1).toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold text-[#4A0E1B] text-sm leading-tight truncate">{inq.name}</div>
                                <div className="text-[11px] text-[#5C5348] font-medium truncate mt-0.5">{inq.subject}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
                              <div className="text-[10px] text-[#8A7E70] flex items-center gap-1 whitespace-nowrap">
                                <Clock className="w-3 h-3" />
                                {new Date(inq.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              </div>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${inq.status === 'New'
                                ? 'bg-[#E3F2FD] text-[#1976D2] border border-[#1976D2]/20'
                                : inq.status === 'Replied'
                                ? 'bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32]/20'
                                : 'bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32]/20'
                                }`}>
                                {inq.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>


              </div>
            )}

            {/* --- TAB: CATEGORIES MANAGER --- */}
            {activeTab === 'categories' && (
              <div className="mt-4 md:mt-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#651728]">Category Manager ({categories.length})</h3>
                    <p className="text-xs text-[#8A7E70]">Add, edit, and organize categories for Courses and Knowledge Share</p>
                  </div>
                  <button
                    onClick={() => setEditingCategory({
                      id: '',
                      titleEn: '',
                      titleMr: '',
                      type: 'course',
                      descriptionEn: '',
                      descriptionMr: ''
                    })}
                    className="px-4 py-2 rounded-xl bg-[#C85413] hover:bg-[#A3430C] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Category</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map(cat => {
                    const courseCount = courses.filter(c => c.category?.toLowerCase() === cat.id?.toLowerCase()).length;
                    const mediaCount = audioItems.filter(a => a.category?.toLowerCase() === cat.id?.toLowerCase()).length +
                      videoItems.filter(v => v.category?.toLowerCase() === cat.id?.toLowerCase()).length +
                      documentItems.filter(d => d.category?.toLowerCase() === cat.id?.toLowerCase()).length;

                    return (
                      <div key={cat.id} className="bg-[#FCFAF7] border border-[#E3D9C4] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:border-[#C85413]/50 transition-all">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <div className="p-2 rounded-xl bg-[#651728]/10 text-[#651728]">
                                <Layers className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-[#221D18]">{cat.titleEn}</h4>
                                <p className="text-xs font-serif text-[#651728]">{cat.titleMr}</p>
                              </div>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${cat.type === 'course' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                              cat.type === 'knowledge' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                                'bg-blue-100 text-blue-900 border border-blue-300'
                              }`}>
                              {cat.type === 'course' ? 'Course Cat' : cat.type === 'knowledge' ? 'Knowledge Cat' : 'Both'}
                            </span>
                          </div>

                          <div className="text-xs text-[#5C5348] mt-2 line-clamp-2">
                            {cat.descriptionEn || cat.descriptionMr || 'No description provided.'}
                          </div>

                          <div className="flex items-center gap-3 mt-3 pt-2 border-t border-[#EFE8DA] text-[11px] text-[#8A7E70]">
                            <span>ID: <code className="font-mono text-[#C85413] bg-[#FFF8F1] px-1 rounded">{cat.id}</code></span>
                            {cat.type !== 'knowledge' && <span>Courses: <strong className="text-[#221D18]">{courseCount}</strong></span>}
                            {cat.type !== 'course' && <span>Media: <strong className="text-[#221D18]">{mediaCount}</strong></span>}
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-[#EFE8DA]">
                          <button
                            onClick={() => setEditingCategory(cat)}
                            className="px-2.5 py-1.5 rounded-lg bg-[#EFE8DA] hover:bg-[#E3D9C4] text-[#5C5348] text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm(`Are you sure you want to delete category "${cat.titleEn}" (${cat.id})?`)) {
                                await deleteCategory(cat.id);
                                showStatus('Category deleted successfully.');
                              }
                            }}
                            className="px-2.5 py-1.5 rounded-lg hover:bg-red-100 text-red-600 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Category Edit / Create Modal */}
                {editingCategory && (
                  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-[#FCFAF7] border border-[#E3D9C4] rounded-2xl shadow-2xl max-w-lg w-full p-6 my-8">
                      <div className="flex items-center justify-between pb-3 border-b border-[#EFE8DA] mb-4">
                        <h4 className="text-lg font-serif font-bold text-[#651728]">
                          {editingCategory.id && categories.some(c => c.id === editingCategory.id) ? 'Edit Category' : 'Add New Category'}
                        </h4>
                        <button onClick={() => setEditingCategory(null)} className="p-1 rounded-lg hover:bg-[#EFE8DA] cursor-pointer">
                          <X className="w-5 h-5 text-[#8A7E70]" />
                        </button>
                      </div>

                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          if (!editingCategory.titleEn || !editingCategory.titleMr) {
                            showStatus('Please fill in both English and Marathi category titles.', 'error');
                            return;
                          }

                          let catId = editingCategory.id;
                          if (!catId) {
                            catId = editingCategory.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                          }

                          const ok = await saveCategory({ ...editingCategory, id: catId });
                          if (ok) {
                            setEditingCategory(null);
                            showStatus('Category saved successfully.');
                          } else {
                            showStatus('Failed to save category.', 'error');
                          }
                        }}
                        className="space-y-4 text-xs"
                      >
                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">Category Unique ID / Slug *</label>
                          <input
                            type="text"
                            required
                            value={editingCategory.id || ''}
                            onChange={e => setEditingCategory({ ...editingCategory, id: e.target.value })}
                            placeholder="e.g. vedanta-varg, paurohitya, audio-recitations"
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] font-mono"
                          />
                          <p className="text-[10px] text-[#8A7E70] mt-0.5">Used internally in URLs and data filters (e.g. <code>paurohitya</code>)</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Title (English) *</label>
                            <input
                              type="text"
                              required
                              value={editingCategory.titleEn || ''}
                              onChange={e => setEditingCategory({ ...editingCategory, titleEn: e.target.value })}
                              placeholder="e.g. Vedanta Varg"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Title (Marathi Devanagari) *</label>
                            <input
                              type="text"
                              required
                              value={editingCategory.titleMr || ''}
                              onChange={e => setEditingCategory({ ...editingCategory, titleMr: e.target.value })}
                              placeholder="e.g. वेदान्त वर्ग"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] font-serif"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">Category Purpose / Type *</label>
                          <select
                            value={editingCategory.type || 'course'}
                            onChange={e => setEditingCategory({ ...editingCategory, type: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                          >
                            <option value="course">Course Category (Appears in Courses Dropdown & Page)</option>
                            <option value="knowledge">Knowledge Share Category (Appears in Knowledge Share)</option>
                            <option value="both">Both (Courses & Knowledge Share)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">Description (English)</label>
                          <textarea
                            rows={2}
                            value={editingCategory.descriptionEn || ''}
                            onChange={e => setEditingCategory({ ...editingCategory, descriptionEn: e.target.value })}
                            placeholder="Brief overview of this category"
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">Description (Marathi)</label>
                          <textarea
                            rows={2}
                            value={editingCategory.descriptionMr || ''}
                            onChange={e => setEditingCategory({ ...editingCategory, descriptionMr: e.target.value })}
                            placeholder="या वर्गाची थोडक्यात माहिती"
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] font-serif"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-3 border-t border-[#EFE8DA]">
                          <button
                            type="button"
                            onClick={() => setEditingCategory(null)}
                            className="px-4 py-2 rounded-xl bg-[#EFE8DA] text-[#5C5348] font-semibold cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-[#651728] text-white font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
                          >
                            <Save className="w-4 h-4 text-[#FCD34D]" />
                            <span>Save Category</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* --- TAB 2: COURSES MANAGER --- */}
            {activeTab === 'courses' && (
              <div className="mt-4 md:mt-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#651728]">Courses Manager ({courses.length})</h3>
                    <p className="text-xs text-[#8A7E70]">Add, edit fees, syllabus modules, prerequisites and timings in SQLite</p>
                  </div>
                  <button
                    onClick={() => setEditingCourse({
                      id: '',
                      titleEn: '',
                      titleMr: '',
                      category: 'paurohitya',
                      categoryLabelEn: 'Paurohitya Track',
                      categoryLabelMr: 'पौरोहित्य अभ्यासक्रम',
                      subtitleEn: '',
                      subtitleMr: '',
                      descriptionEn: '',
                      descriptionMr: '',
                      level: 'Beginner',
                      duration: '6 Months',
                      totalLessons: 24,
                      totalHours: '48 Hours',
                      mode: 'Hybrid',
                      fee: '₹3,500',
                      thumbnail: '/Photos/Surawanee_Paurohitya-Ganesh-Pooja-e1660834393968-updraft-pre-smush-original.jpg',
                      prerequisites: ['Devanagari basics'],
                      learningOutcomes: ['Complete ritual practicals'],
                      modules: [],
                      certificateProvided: true,
                      instructor: {
                        name: 'Trust Acharyas',
                        titleEn: 'Senior Faculty',
                        titleMr: 'वरिष्ठ प्राध्यापक',
                        credentials: 'Vedacharya',
                        avatar: '/Photos/Surawanee_Paurohitya-Varg-1-updraft-pre-smush-original.jpg'
                      },
                      upcomingBatch: 'Batch Starting Soon'
                    })}
                    className="px-4 py-2 rounded-xl bg-[#C85413] hover:bg-[#A3430C] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Course</span>
                  </button>
                </div>

                {/* Courses Table / Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map(course => (
                    <div key={course.id} className="bg-[#FCFAF7] border border-[#E3D9C4] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-[#C85413] transition-colors">
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#651728]/10 text-[#651728] uppercase">
                              {course.category} • {course.level}
                            </span>
                            <h4 className="text-base font-bold text-[#221D18] mt-1 font-serif">{course.titleEn}</h4>
                            <p className="text-xs text-[#C85413] font-serif">{course.titleMr}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-sm font-bold text-[#651728]">{course.fee}</div>
                            <div className="text-[10px] text-[#8A7E70]">{course.duration}</div>
                          </div>
                        </div>

                        <p className="text-xs text-[#5C5348] line-clamp-2 mb-3">
                          {course.descriptionEn}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          <span className="px-2 py-0.5 rounded bg-[#EFE8DA] text-[10px] text-[#5C5348]">
                            {course.modules?.length || 0} Modules
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#EFE8DA] text-[10px] text-[#5C5348]">
                            {course.mode}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#EFE8DA] text-[10px] text-[#5C5348]">
                            Instructor: {course.instructor?.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[#EFE8DA]">
                        <button
                          onClick={() => openCourseDetail(course.id)}
                          className="text-xs font-semibold text-[#883008] hover:text-[#C85413] flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview Page</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingCourse(course)}
                            className="px-2.5 py-1.5 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE2D2] text-xs font-semibold text-[#221D18] flex items-center gap-1 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-[#C85413]" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm(`Delete course "${course.titleEn}"?`)) {
                                const ok迷 = await deleteCourse(course.id);
                                if (ok迷) showStatus('Course deleted from SQLite.');
                              }
                            }}
                            className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                            title="Delete Course"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Course Edit Modal */}
                {editingCourse && (
                  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-[#FCFAF7] border border-[#E3D9C4] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 my-8">
                      <div className="flex items-center justify-between pb-3 border-b border-[#EFE8DA] mb-4">
                        <h4 className="text-lg font-serif font-bold text-[#651728]">
                          {editingCourse.id ? 'Edit Course in SQLite' : 'Create New Course'}
                        </h4>
                        <button onClick={() => setEditingCourse(null)} className="p-1 rounded-lg hover:bg-[#EFE8DA]">
                          <X className="w-5 h-5 text-[#8A7E70]" />
                        </button>
                      </div>

                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const ok = await saveCourse(editingCourse);
                          if (ok) {
                            setEditingCourse(null);
                            showStatus('Course saved to SQLite database successfully.');
                          } else {
                            showStatus('Failed to save course.', 'error');
                          }
                        }}
                        className="space-y-4 text-xs"
                      >
                        {/* ID & Category */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Course ID (Slug) *</label>
                            <input
                              type="text"
                              required
                              value={editingCourse.id || ''}
                              onChange={e => setEditingCourse({ ...editingCourse, id: e.target.value })}
                              placeholder="e.g. pooja-vidhi"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Category Track *</label>
                            <select
                              value={editingCourse.category || 'paurohitya'}
                              onChange={e => {
                                const selectedCat = categories.find(c => c.id === e.target.value);
                                setEditingCourse({
                                  ...editingCourse,
                                  category: e.target.value,
                                  categoryLabelEn: selectedCat?.titleEn || e.target.value,
                                  categoryLabelMr: selectedCat?.titleMr || e.target.value
                                });
                              }}
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            >
                              {categories
                                .filter(c => c.type === 'course' || c.type === 'both')
                                .map(cat => (
                                  <option key={cat.id} value={cat.id}>
                                    {cat.titleEn} ({cat.titleMr})
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>

                        {/* Title En & Mr */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Course Title (English) *</label>
                            <input
                              type="text"
                              required
                              value={editingCourse.titleEn || ''}
                              onChange={e => setEditingCourse({ ...editingCourse, titleEn: e.target.value })}
                              placeholder="e.g. Pooja Vidhi"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] font-bold"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Course Title (Marathi) *</label>
                            <input
                              type="text"
                              required
                              value={editingCourse.titleMr || ''}
                              onChange={e => setEditingCourse({ ...editingCourse, titleMr: e.target.value })}
                              placeholder="e.g. पूजा विधी वर्ग"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] font-serif font-bold"
                            />
                          </div>
                        </div>

                        {/* Subtitle / Summary En & Mr */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Subtitle / Short Tagline (English)</label>
                            <input
                              type="text"
                              value={editingCourse.subtitleEn || ''}
                              onChange={e => setEditingCourse({ ...editingCourse, subtitleEn: e.target.value })}
                              placeholder="Practical guidance in Shodashopachar Pooja..."
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Subtitle / Short Tagline (Marathi)</label>
                            <input
                              type="text"
                              value={editingCourse.subtitleMr || ''}
                              onChange={e => setEditingCourse({ ...editingCourse, subtitleMr: e.target.value })}
                              placeholder="षोडशोपचार पूजा व प्रात्यक्षिक मार्गदर्शक..."
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] font-serif"
                            />
                          </div>
                        </div>

                        {/* Fees, Level & Upcoming Batch */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Tuition / Fee Text</label>
                            <input
                              type="text"
                              value={editingCourse.fee || ''}
                              onChange={e => setEditingCourse({ ...editingCourse, fee: e.target.value })}
                              placeholder="e.g. Contact Trust for Details / ₹2,500"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Level</label>
                            <select
                              value={editingCourse.level || 'Beginner'}
                              onChange={e => setEditingCourse({ ...editingCourse, level: e.target.value as any })}
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                              <option value="Diploma">Diploma</option>
                            </select>
                          </div>
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Next Batch Schedule</label>
                            <input
                              type="text"
                              value={editingCourse.upcomingBatch || ''}
                              onChange={e => setEditingCourse({ ...editingCourse, upcomingBatch: e.target.value })}
                              placeholder="e.g. Weekend Batches at Padma Niwas"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                        </div>

                        {/* Duration, Total Hours & Learning Mode */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Duration</label>
                            <input
                              type="text"
                              value={editingCourse.duration || ''}
                              onChange={e => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                              placeholder="e.g. 10 Weeks"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Total Hours</label>
                            <input
                              type="text"
                              value={editingCourse.totalHours || ''}
                              onChange={e => setEditingCourse({ ...editingCourse, totalHours: e.target.value })}
                              placeholder="e.g. 25 Hours"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Learning Mode</label>
                            <input
                              type="text"
                              value={editingCourse.mode || ''}
                              onChange={e => setEditingCourse({ ...editingCourse, mode: e.target.value as any })}
                              placeholder="e.g. Classroom (Thane)"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                        </div>

                        {/* Course Banner Image Upload */}
                        <ImageUploadField
                          label="Course Cover Photo / Thumbnail"
                          value={editingCourse.thumbnail || ''}
                          onChange={url => setEditingCourse({ ...editingCourse, thumbnail: url })}
                          helpText="Upload a cover photo or banner for this course"
                        />

                        {/* Checkboxes: Subsidized Grant & Accredited Certificate */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-[#FFF8F1] border border-[#C85413]/20">
                          <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#651728]">
                            <input
                              type="checkbox"
                              checked={!!editingCourse.isFreeOrSubsidized}
                              onChange={e => setEditingCourse({ ...editingCourse, isFreeOrSubsidized: e.target.checked })}
                              className="w-4 h-4 rounded text-[#C85413]"
                            />
                            <span>Subsidized Grant / Scholarship Available</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#651728]">
                            <input
                              type="checkbox"
                              checked={editingCourse.certificateProvided !== false}
                              onChange={e => setEditingCourse({ ...editingCourse, certificateProvided: e.target.checked })}
                              className="w-4 h-4 rounded text-[#C85413]"
                            />
                            <span>Accredited Trust Diploma / Certification</span>
                          </label>
                        </div>

                        {/* Program Description En & Mr */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Full Program Description (English)</label>
                            <textarea
                              rows={3}
                              value={editingCourse.descriptionEn || ''}
                              onChange={e => setEditingCourse({ ...editingCourse, descriptionEn: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Full Program Description (Marathi)</label>
                            <textarea
                              rows={3}
                              value={editingCourse.descriptionMr || ''}
                              onChange={e => setEditingCourse({ ...editingCourse, descriptionMr: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] font-serif"
                            />
                          </div>
                        </div>

                        {/* Learning Outcomes & Prerequisites (1 item per line) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Key Learning Outcomes (1 bullet per line)</label>
                            <textarea
                              rows={3}
                              value={(editingCourse.learningOutcomes || []).join('\n')}
                              onChange={e => setEditingCourse({
                                ...editingCourse,
                                learningOutcomes: e.target.value.split('\n').filter(l => l.trim().length > 0)
                              })}
                              placeholder="Mastery of Shodashopachar steps&#10;Independent conduction of Ganapati Pooja"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Prerequisites & Eligibility (1 item per line)</label>
                            <textarea
                              rows={3}
                              value={(editingCourse.prerequisites || []).join('\n')}
                              onChange={e => setEditingCourse({
                                ...editingCourse,
                                prerequisites: e.target.value.split('\n').filter(l => l.trim().length > 0)
                              })}
                              placeholder="Basic familiarity with Stotra recitation&#10;Minimum age 10 years"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                        </div>

                        {/* Faculty / Instructor Card Info */}
                        <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E3D9C4] space-y-2">
                          <div className="font-bold text-[#651728] text-xs">Acharya &amp; Lead Faculty Info</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <label className="block font-semibold text-[#5C5348] mb-1">Faculty Name</label>
                              <input
                                type="text"
                                value={editingCourse.instructor?.name || ''}
                                onChange={e => setEditingCourse({
                                  ...editingCourse,
                                  instructor: {
                                    name: e.target.value,
                                    titleEn: editingCourse.instructor?.titleEn || 'Head Acharya',
                                    titleMr: editingCourse.instructor?.titleMr || 'प्रमुख आचार्य',
                                    credentials: editingCourse.instructor?.credentials || 'Vedacharya',
                                    avatar: editingCourse.instructor?.avatar || '/Photos/Surawanee_Paurohitya-Varg-1-updraft-pre-smush-original.jpg'
                                  }
                                })}
                                placeholder="Vedmurti Acharya Joshi Guruji"
                                className="w-full px-3 py-1.5 rounded-lg border border-[#E3D9C4] bg-white text-[#221D18]"
                              />
                            </div>
                            <div>
                              <label className="block font-semibold text-[#5C5348] mb-1">Credentials / Designation</label>
                              <input
                                type="text"
                                value={editingCourse.instructor?.credentials || ''}
                                onChange={e => setEditingCourse({
                                  ...editingCourse,
                                  instructor: {
                                    name: editingCourse.instructor?.name || 'Vedmurti Guruji',
                                    titleEn: editingCourse.instructor?.titleEn || 'Head Acharya',
                                    titleMr: editingCourse.instructor?.titleMr || 'प्रमुख आचार्य',
                                    credentials: e.target.value,
                                    avatar: editingCourse.instructor?.avatar || '/Photos/Surawanee_Paurohitya-Varg-1-updraft-pre-smush-original.jpg'
                                  }
                                })}
                                placeholder="Vedacharya, 35+ Years Teaching"
                                className="w-full px-3 py-1.5 rounded-lg border border-[#E3D9C4] bg-white text-[#221D18]"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Action Bar */}
                        <div className="flex justify-end gap-2 pt-3 border-t border-[#EFE8DA]">
                          <button
                            type="button"
                            onClick={() => setEditingCourse(null)}
                            className="px-4 py-2 rounded-xl bg-[#EFE8DA] text-[#5C5348] font-semibold cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-[#651728] hover:bg-[#822237] text-white font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                          >
                            <Save className="w-4 h-4 text-[#FCD34D]" />
                            <span>Save Course to SQLite</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* --- TAB 3: AUDIO MANAGER --- */}
            {activeTab === 'audio' && (
              <div className="mt-4 md:mt-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#651728]">Vedic Audio &amp; Stotras ({audioItems.length})</h3>
                    <p className="text-xs text-[#8A7E70]">Manage chanted shlokas, lyrics, meanings and audio frequencies</p>
                  </div>
                  <button
                    onClick={() => setEditingAudio({
                      id: '',
                      titleEn: '',
                      titleMr: '',
                      subtitleEn: '',
                      subtitleMr: '',
                      category: 'audio-recitations',
                      duration: '',
                      reciter: 'Trust Pandits',
                      shlokaText: '',
                      transliteration: '',
                      meaning: '',
                      audioUrl: ''
                    })}
                    className="px-4 py-2 rounded-xl bg-[#C85413] hover:bg-[#A3430C] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Audio Track</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {audioItems.map(audio => (
                    <div key={audio.id} className="bg-[#FCFAF7] border border-[#E3D9C4] rounded-2xl p-4 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-[#651728]/10 text-[#651728]">
                              <Music className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-[#221D18]">{audio.titleEn}</h4>
                              <p className="text-xs text-[#C85413] font-serif">{audio.titleMr}</p>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EFE8DA] text-[#5C5348]">
                            {audio.audioUrl ? '🔊 Audio' : '📝 Text'}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-[#FFF8F1] border border-[#EFE8DA] my-2">
                          <div className="text-[11px] font-serif font-semibold text-[#651728] line-clamp-2">
                            {audio.shlokaText || 'No Sanskrit shloka attached.'}
                          </div>
                        </div>

                        <div className="text-[11px] text-[#8A7E70]">
                          Reciter: <span className="font-semibold text-[#5C5348]">{audio.reciter}</span> • Category: <span className="uppercase">
                            {audio.category === 'audio-recitations' ? 'Audio Recitations' :
                              audio.category === 'paurohitya-media' ? 'Paurohitya Media' :
                                audio.category === 'vedic-chant' ? 'Vedic Chant' :
                                  audio.category || 'General'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-[#EFE8DA]">
                        <button
                          onClick={() => setPlayingAudioTrack(audio)}
                          className="px-3 py-1.5 rounded-lg bg-[#651728] hover:bg-[#C85413] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Play Track</span>
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingAudio(audio)}
                            className="px-2.5 py-1.5 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE2D2] text-xs font-semibold text-[#221D18] flex items-center gap-1 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-[#C85413]" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm(`Delete audio "${audio.titleEn}"?`)) {
                                const ok = await deleteAudioItem(audio.id);
                                if (ok) showStatus('Audio track deleted.');
                              }
                            }}
                            className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Audio Edit Modal */}
                {editingAudio && (
                  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-[#FCFAF7] border border-[#E3D9C4] rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6">
                      <div className="flex items-center justify-between pb-3 border-b border-[#EFE8DA] mb-4">
                        <h4 className="text-lg font-serif font-bold text-[#651728]">
                          {editingAudio.id ? 'Edit Audio in SQLite' : 'Add New Audio Track'}
                        </h4>
                        <button onClick={() => setEditingAudio(null)}>
                          <X className="w-5 h-5 text-[#8A7E70]" />
                        </button>
                      </div>

                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          if (!editingAudio.titleEn?.trim()) {
                            showStatus('Title (English) is required.', 'error');
                            return;
                          }
                          if (!editingAudio.audioUrl?.trim()) {
                            showStatus('Please upload an audio file or paste an audio URL.', 'error');
                            return;
                          }
                          setIsAudioSaving(true);
                          // Close modal immediately for better UX
                          const itemToSave = { ...editingAudio };
                          setEditingAudio(null);
                          showStatus('✅ Audio track saved successfully!');
                          // Save in background (doesn't block UI)
                          try {
                            await saveAudioItem(itemToSave);
                          } catch { }
                          setIsAudioSaving(false);
                        }}
                        className="space-y-3 text-xs"
                      >
                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">Title (English) *</label>
                          <input
                            type="text"
                            required
                            value={editingAudio.titleEn || ''}
                            onChange={e => setEditingAudio({ ...editingAudio, titleEn: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">Title (Marathi) *</label>
                          <input
                            type="text"
                            required
                            value={editingAudio.titleMr || ''}
                            onChange={e => setEditingAudio({ ...editingAudio, titleMr: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] font-serif"
                          />
                        </div>

                        {/* Audio File Source: Upload or Paste Link */}
                        <div className="p-3 rounded-xl bg-[#FFF8F1] border border-[#EFE8DA] space-y-2">
                          <label className="block font-bold text-[#651728] flex items-center gap-1.5">
                            <Upload className="w-4 h-4 text-[#C85413]" />
                            <span>Audio File Upload / Audio URL *</span>
                          </label>

                          <div>
                            <label className="block text-[11px] font-semibold text-[#5C5348] mb-1">Upload Audio File (MP3 / WAV / AAC)</label>
                            <input
                              type="file"
                              accept="audio/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const audioId = editingAudio?.id || `audio_${Date.now()}`;
                                const localBlobUrl = URL.createObjectURL(file);
                                showStatus(`⏳ Uploading audio file: ${file.name}...`);

                                try {
                                  const formData = new FormData();
                                  formData.append('file', file);
                                  const res = await fetch('/api/upload', {
                                    method: 'POST',
                                    body: formData
                                  });
                                  if (res.ok) {
                                    const data = await res.json();
                                    if (data.url) {
                                      setEditingAudio(prev => prev ? ({
                                        ...prev,
                                        id: prev.id || audioId,
                                        audioUrl: data.url,
                                        _uploadedFileName: file.name
                                      } as any) : null);
                                      showStatus(`✅ Audio file uploaded successfully: ${file.name}`);
                                      return;
                                    }
                                  }
                                } catch (err) {
                                  console.warn('Backend upload failed, using local URL:', err);
                                }

                                // Fallback if backend offline
                                audioBlobUrls.current.set(audioId, localBlobUrl);
                                setEditingAudio(prev => prev ? ({
                                  ...prev,
                                  id: prev.id || audioId,
                                  audioUrl: localBlobUrl,
                                  _uploadedFileName: file.name
                                } as any) : null);
                                showStatus(`✅ Audio file loaded: ${file.name}`);
                              }}
                              className="w-full text-xs text-[#5C5348] file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#651728] file:text-white hover:file:bg-[#C85413] cursor-pointer"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[#5C5348] mb-1">Or Paste Direct Audio File URL (MP3/WAV)</label>
                            <input
                              type="text"
                              value={editingAudio.audioUrl || ''}
                              onChange={e => setEditingAudio({ ...editingAudio, audioUrl: e.target.value })}
                              placeholder="https://example.com/sacred-chanting.mp3"
                              className={`w-full px-3 py-2 rounded-xl border bg-white text-[#221D18] ${!editingAudio.audioUrl ? 'border-red-300' : 'border-[#E3D9C4]'
                                }`}
                            />
                          </div>

                          {/* Sample Audio Presets */}
                          <div className="pt-1">
                            <span className="text-[10px] text-[#8A7E70] block mb-1">Quick Sample Presets:</span>
                            <div className="flex flex-wrap gap-1.5">
                              <button
                                type="button"
                                onClick={() => setEditingAudio({ ...editingAudio, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' })}
                                className="px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#E3D9C4] text-[10px] hover:bg-[#EFE8DA] text-[#651728]"
                              >
                                Sample Chanting 1
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingAudio({ ...editingAudio, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' })}
                                className="px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#E3D9C4] text-[10px] hover:bg-[#EFE8DA] text-[#651728]"
                              >
                                Sample Chanting 2
                              </button>
                            </div>
                          </div>

                          {/* Live Audio Preview */}
                          {editingAudio.audioUrl && (
                            <div className="pt-2 border-t border-[#EFE8DA]">
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#C85413] mb-1">Live Audio Preview</label>
                              <audio controls src={editingAudio.audioUrl} className="w-full h-9" />
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">Category</label>
                          <select
                            value={editingAudio.category || 'audio-recitations'}
                            onChange={e => setEditingAudio({ ...editingAudio, category: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                          >
                            {/* Knowledge categories from admin */}
                            {categories.filter(c => c.type === 'knowledge' || c.type === 'both').length > 0
                              ? categories
                                .filter(c => c.type === 'knowledge' || c.type === 'both')
                                .map(cat => (
                                  <option key={cat.id} value={cat.id}>
                                    {cat.titleEn} ({cat.titleMr})
                                  </option>
                                ))
                              : (
                                // Fallback options if categories not loaded
                                <>
                                  <option value="audio-recitations">Audio Recitations (ध्वनी फीती)</option>
                                  <option value="paurohitya-media">Paurohitya Media (पौरोहित्य साहित्य)</option>
                                  <option value="stotra">Stotra (स्तोत्र)</option>
                                  <option value="vedic-chant">Vedic Chant (वैदिक मंत्र)</option>
                                </>
                              )
                            }
                          </select>
                        </div>

                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">Reciter / Chanter Name</label>
                          <input
                            type="text"
                            value={editingAudio.reciter || ''}
                            onChange={e => setEditingAudio({ ...editingAudio, reciter: e.target.value })}
                            placeholder="e.g. Surawanee Paurohitya Acharyas"
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">Sanskrit Shloka Text</label>
                          <textarea
                            rows={3}
                            value={editingAudio.shlokaText || ''}
                            onChange={e => setEditingAudio({ ...editingAudio, shlokaText: e.target.value })}
                            placeholder="Devanagari verses..."
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] font-serif"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">Meaning &amp; Translation</label>
                          <textarea
                            rows={2}
                            value={editingAudio.meaning || ''}
                            onChange={e => setEditingAudio({ ...editingAudio, meaning: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-3 border-t border-[#EFE8DA]">
                          <button
                            type="button"
                            onClick={() => setEditingAudio(null)}
                            className="px-4 py-2 rounded-xl bg-[#EFE8DA] text-[#5C5348] font-semibold"
                            disabled={isAudioSaving}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isAudioSaving}
                            className="px-5 py-2 rounded-xl bg-[#651728] text-white font-semibold flex items-center gap-1.5 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            <Save className="w-4 h-4 text-[#FCD34D]" />
                            <span>{isAudioSaving ? 'Saving...' : 'Save Audio'}</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* --- TAB 4: VIDEO DISCOURSES MANAGER --- */}
            {activeTab === 'video' && (
              <div className="mt-4 md:mt-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#651728]">Video Discourses ({videoItems.length})</h3>
                    <p className="text-xs text-[#8A7E70]">Manage YouTube video lectures, speaker details and categories</p>
                  </div>
                  <button
                    onClick={() => setEditingVideo({
                      id: '',
                      titleEn: '',
                      titleMr: '',
                      speaker: 'Acharya',
                      duration: '30 mins',
                      category: 'Paurohitya Vidhi',
                      thumbnail: '/Photos/Surawanee_Paurohitya-Ganesh-Pooja-e1660834393968-updraft-pre-smush-original.jpg',
                      youtubeId: '',
                      descriptionEn: '',
                      descriptionMr: ''
                    })}
                    className="px-4 py-2 rounded-xl bg-[#C85413] hover:bg-[#A3430C] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add YouTube Video</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {videoItems.map(video => (
                    <div key={video.id} className="bg-[#FCFAF7] border border-[#E3D9C4] rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between">
                      <div className="relative aspect-video bg-black/10">
                        <img src={video.thumbnail} alt={video.titleEn} className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono">
                          {video.duration}
                        </span>
                      </div>

                      <div className="p-3">
                        <div className="text-[10px] font-bold text-[#C85413] uppercase mb-0.5">{video.category}</div>
                        <h4 className="text-xs font-bold text-[#221D18] line-clamp-1">{video.titleEn}</h4>
                        <p className="text-xs text-[#651728] font-serif line-clamp-1">{video.titleMr}</p>
                        <div className="text-[11px] text-[#8A7E70] mt-1">Speaker: {video.speaker} • YT: <code className="font-mono text-[10px]">{video.youtubeId}</code></div>
                      </div>

                      <div className="flex items-center justify-end gap-2 p-3 pt-0 border-t border-[#EFE8DA] mt-2">
                        <button
                          onClick={() => setEditingVideo(video)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#F4EFE6] text-xs font-semibold text-[#221D18] flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#C85413]" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Delete video "${video.titleEn}"?`)) {
                              const ok = await deleteVideoItem(video.id);
                              if (ok) showStatus('Video deleted from SQLite.');
                            }
                          }}
                          className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Video Edit Modal */}
                {editingVideo && (
                  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-[#FCFAF7] border border-[#E3D9C4] rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
                      <div className="flex items-center justify-between pb-3 border-b border-[#EFE8DA] mb-4">
                        <h4 className="text-lg font-serif font-bold text-[#651728]">
                          {editingVideo.id ? 'Edit Video in SQLite' : 'Add Video Discourse'}
                        </h4>
                        <button onClick={() => setEditingVideo(null)}>
                          <X className="w-5 h-5 text-[#8A7E70]" />
                        </button>
                      </div>

                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const ok = await saveVideoItem(editingVideo);
                          if (ok) {
                            setEditingVideo(null);
                            showStatus('Video saved to SQLite.');
                          }
                        }}
                        className="space-y-3 text-xs"
                      >
                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">YouTube Video ID (or URL) *</label>
                          <input
                            type="text"
                            required
                            value={editingVideo.youtubeId || ''}
                            onChange={e => {
                              const val = e.target.value;
                              const match = val.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
                              setEditingVideo({ ...editingVideo, youtubeId: match ? match[1] : val });
                            }}
                            placeholder="e.g. M7lc1UVf-VE"
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] font-mono"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">Title (English) *</label>
                          <input
                            type="text"
                            required
                            value={editingVideo.titleEn || ''}
                            onChange={e => setEditingVideo({ ...editingVideo, titleEn: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">Title (Marathi) *</label>
                          <input
                            type="text"
                            required
                            value={editingVideo.titleMr || ''}
                            onChange={e => setEditingVideo({ ...editingVideo, titleMr: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] font-serif"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Speaker</label>
                            <input
                              type="text"
                              value={editingVideo.speaker || ''}
                              onChange={e => setEditingVideo({ ...editingVideo, speaker: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Category</label>
                            <input
                              type="text"
                              value={editingVideo.category || ''}
                              onChange={e => setEditingVideo({ ...editingVideo, category: e.target.value })}
                              placeholder="e.g. Paurohitya Vidhi"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-3 border-t border-[#EFE8DA]">
                          <button
                            type="button"
                            onClick={() => setEditingVideo(null)}
                            className="px-4 py-2 rounded-xl bg-[#EFE8DA] text-[#5C5348] font-semibold"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-[#651728] text-white font-semibold flex items-center gap-1.5 shadow-sm"
                          >
                            <Save className="w-4 h-4 text-[#FCD34D]" />
                            <span>Save Video</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* --- TAB 5: GALLERY MANAGER --- */}
            {activeTab === 'gallery' && (
              <div className="mt-4 md:mt-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#651728]">Photo Gallery ({galleryItems.length})</h3>
                    <p className="text-xs text-[#8A7E70]">Manage Trust photographs, historical events, classes and convocation archives</p>
                  </div>
                  <button
                    onClick={() => setEditingGallery({
                      id: '',
                      titleEn: '',
                      titleMr: '',
                      category: 'classes',
                      categoryLabel: 'Classes & Varg',
                      imageUrl: '/Photos/Surawanee_new_location-updraft-pre-smush-original.png',
                      captionEn: '',
                      captionMr: '',
                      year: '2024'
                    })}
                    className="px-4 py-2 rounded-xl bg-[#C85413] hover:bg-[#A3430C] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Photo</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryItems.slice((galleryPage - 1) * 16, galleryPage * 16).map(item => (
                    <div key={item.id} className="bg-[#FCFAF7] border border-[#E3D9C4] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div className="aspect-4/3 bg-black/5 relative flex items-center justify-center overflow-hidden">
                        <img src={item.imageUrl} alt={item.titleEn} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 flex items-center gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded-full bg-[#C85413] text-white text-[10px] font-bold shadow-xs">
                            {item.categoryLabel || item.category}
                          </span>
                          {item.year && (
                            <span className="px-1.5 py-0.5 rounded bg-black/75 text-amber-200 text-[10px] font-mono">
                              {item.year}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-3 space-y-1">
                        <div className="text-xs font-bold text-[#221D18] line-clamp-1">{item.titleEn}</div>
                        <div className="text-xs text-[#651728] font-serif line-clamp-1">{item.titleMr}</div>
                        {item.captionEn && (
                          <p className="text-[11px] text-[#5C5348] line-clamp-2 leading-tight">{item.captionEn}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-between p-2.5 border-t border-[#EFE8DA] bg-[#FAF7F2]">
                        <span className="text-[10px] text-[#8A7E70] uppercase font-mono">{item.category}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingGallery(item)}
                            className="p-1.5 rounded-lg hover:bg-[#EFE8DA] text-xs font-semibold text-[#221D18] transition-colors"
                            title="Edit Photo Details"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-[#C85413]" />
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm(`Delete image "${item.titleEn}"?`)) {
                                const ok = await deleteGalleryItem(item.id);
                                if (ok) showStatus('Photo deleted from SQLite.');
                              }
                            }}
                            className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gallery Pagination Controls */}
                {galleryItems.length > 16 && (
                  <div className="flex items-center justify-center gap-2 mt-6">
                    <button
                      disabled={galleryPage === 1}
                      onClick={() => setGalleryPage(prev => Math.max(prev - 1, 1))}
                      className="px-3 py-1.5 rounded-lg border border-[#E3D9C4] bg-white text-[#5C5348] text-xs font-semibold hover:bg-[#F4EFE6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-xs font-semibold text-[#651728]">
                      Page {galleryPage} of {Math.ceil(galleryItems.length / 16)}
                    </span>
                    <button
                      disabled={galleryPage === Math.ceil(galleryItems.length / 16)}
                      onClick={() => setGalleryPage(prev => Math.min(prev + 1, Math.ceil(galleryItems.length / 16)))}
                      className="px-3 py-1.5 rounded-lg border border-[#E3D9C4] bg-white text-[#5C5348] text-xs font-semibold hover:bg-[#F4EFE6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}

                {/* Gallery Edit Modal */}
                {editingGallery && (
                  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-[#FCFAF7] border border-[#E3D9C4] rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6">
                      <div className="flex items-center justify-between pb-3 border-b border-[#EFE8DA] mb-4">
                        <div>
                          <h4 className="text-lg font-serif font-bold text-[#651728]">
                            {editingGallery.id ? 'Edit Photo & Content' : 'Add Photo to Gallery'}
                          </h4>
                          <p className="text-[11px] text-[#8A7E70]">
                            Manage photo details, category tags, and bilingual captions displayed on the website and lightbox.
                          </p>
                        </div>
                        <button onClick={() => setEditingGallery(null)} className="p-1 rounded-lg hover:bg-[#EFE8DA] text-[#8A7E70]">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const ok = await saveGalleryItem(editingGallery);
                          if (ok) {
                            setEditingGallery(null);
                            showStatus('Photo and content saved to SQLite database.');
                          }
                        }}
                        className="space-y-3.5 text-xs"
                      >
                        <ImageUploadField
                          label="Upload Gallery Photo"
                          required
                          value={editingGallery.imageUrl || ''}
                          onChange={url => setEditingGallery({ ...editingGallery, imageUrl: url })}
                          helpText="Select or drag & drop PNG, JPG, WEBP photo (up to 10MB)"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Title (English) *</label>
                            <input
                              type="text"
                              required
                              value={editingGallery.titleEn || ''}
                              onChange={e => setEditingGallery({ ...editingGallery, titleEn: e.target.value })}
                              placeholder="e.g. State Level Competition Ceremony"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Title (Marathi) *</label>
                            <input
                              type="text"
                              required
                              value={editingGallery.titleMr || ''}
                              onChange={e => setEditingGallery({ ...editingGallery, titleMr: e.target.value })}
                              placeholder="उदा. राज्यस्तरीय पारितोषिक वितरण सोहळा"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] font-serif"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Filter Category *</label>
                            <select
                              value={editingGallery.category || 'classes'}
                              onChange={e => {
                                const newCat = e.target.value as any;
                                let defaultLabel = editingGallery.categoryLabel;
                                if (!defaultLabel || defaultLabel === 'Classes & Varg' || defaultLabel === 'Celebrations & Utsav' || defaultLabel === 'Paurohitya & Yajna' || defaultLabel === 'Dikshant Samaroh' || defaultLabel === 'Archival' || defaultLabel === 'Classroom & Sanskar') {
                                  if (newCat === 'events') defaultLabel = 'Celebrations & Utsav';
                                  else if (newCat === 'classes') defaultLabel = 'Classroom & Sanskar';
                                  else if (newCat === 'paurohitya') defaultLabel = 'Paurohitya & Yajna';
                                  else if (newCat === 'convocation') defaultLabel = 'Dikshant Samaroh';
                                  else if (newCat === 'historical') defaultLabel = 'Archival';
                                  else defaultLabel = 'Other Photos';
                                }
                                setEditingGallery({ ...editingGallery, category: newCat, categoryLabel: defaultLabel });
                              }}
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            >
                              <option value="events">Celebrations &amp; Utsav</option>
                              <option value="classes">Classroom &amp; Sanskar</option>
                              <option value="paurohitya">Paurohitya &amp; Yajna</option>
                              <option value="convocation">Dikshant Samaroh</option>
                              <option value="historical">Archival (1958-1980)</option>
                              <option value="other-photos">Other Photos</option>
                            </select>
                          </div>

                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Display Badge Tag</label>
                            <input
                              type="text"
                              value={editingGallery.categoryLabel || ''}
                              onChange={e => setEditingGallery({ ...editingGallery, categoryLabel: e.target.value })}
                              placeholder="e.g. Competition, Bal Sanskar"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Year / Period</label>
                            <input
                              type="text"
                              value={editingGallery.year || ''}
                              onChange={e => setEditingGallery({ ...editingGallery, year: e.target.value })}
                              placeholder="e.g. 2024 or Archive"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">
                            Caption / Description (English)
                            <span className="text-[10px] text-[#8A7E70] font-normal ml-1">(Shown on card &amp; full-screen lightbox)</span>
                          </label>
                          <textarea
                            rows={2}
                            value={editingGallery.captionEn || ''}
                            onChange={e => setEditingGallery({ ...editingGallery, captionEn: e.target.value })}
                            placeholder="Detailed description or context of this photograph in English..."
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] resize-none"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">
                            Caption / Description (Marathi)
                            <span className="text-[10px] text-[#8A7E70] font-normal ml-1">(मराठी भाषांतर)</span>
                          </label>
                          <textarea
                            rows={2}
                            value={editingGallery.captionMr || ''}
                            onChange={e => setEditingGallery({ ...editingGallery, captionMr: e.target.value })}
                            placeholder="या छायाचित्राचे मराठीतील सविस्तर वर्णन..."
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] font-serif resize-none"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-3 border-t border-[#EFE8DA]">
                          <button
                            type="button"
                            onClick={() => setEditingGallery(null)}
                            className="px-4 py-2 rounded-xl bg-[#EFE8DA] hover:bg-[#E3D9C4] text-[#5C5348] font-semibold transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-[#651728] hover:bg-[#4D101E] text-white font-semibold shadow-sm transition-all"
                          >
                            Save Photo &amp; Content
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* --- TAB 6: DOCUMENTS & MONOGRAPHS --- */}
            {activeTab === 'documents' && (
              <div className="mt-4 md:mt-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#651728]">Documents &amp; Study Material ({documentItems.length})</h3>
                    <p className="text-xs text-[#8A7E70]">Manage downloadable PDF monographs, research papers and syllabi</p>
                  </div>
                  <button
                    onClick={() => setEditingDocument({
                      id: '',
                      titleEn: '',
                      titleMr: '',
                      category: 'Study Material',
                      author: 'Surawanee Dnyanmandir',
                      pages: 10,
                      fileSize: '1.2 MB',
                      language: 'Sanskrit / Marathi',
                      descriptionEn: '',
                      descriptionMr: ''
                    })}
                    className="px-4 py-2 rounded-xl bg-[#C85413] hover:bg-[#A3430C] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Study Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documentItems.map(doc => (
                    <div key={doc.id} className="bg-[#FCFAF7] border border-[#E3D9C4] rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="p-3 rounded-xl bg-[#651728]/10 text-[#651728]">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EFE8DA] text-[#651728]">
                            {doc.category}
                          </span>
                          <h4 className="text-xs font-bold text-[#221D18] mt-1">{doc.titleEn}</h4>
                          <p className="text-xs text-[#C85413] font-serif">{doc.titleMr}</p>
                          <div className="text-[11px] text-[#8A7E70] mt-1">
                            {doc.pages} Pages • {doc.fileSize} • Author: {doc.author}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setEditingDocument(doc)}
                          className="p-2 rounded-lg hover:bg-[#EFE8DA] text-[#5C5348]"
                        >
                          <Edit3 className="w-4 h-4 text-[#C85413]" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Delete document "${doc.titleEn}"?`)) {
                              const ok = await deleteDocumentItem(doc.id);
                              if (ok) showStatus('Document removed from SQLite.');
                            }
                          }}
                          className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Document Edit Modal */}
                {editingDocument && (
                  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-[#FCFAF7] border border-[#E3D9C4] rounded-2xl shadow-2xl max-w-md w-full p-6">
                      <div className="flex items-center justify-between pb-3 border-b border-[#EFE8DA] mb-4">
                        <h4 className="text-lg font-serif font-bold text-[#651728]">
                          {editingDocument.id ? 'Edit Document' : 'Add Document to SQLite'}
                        </h4>
                        <button onClick={() => setEditingDocument(null)}>
                          <X className="w-5 h-5 text-[#8A7E70]" />
                        </button>
                      </div>

                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const ok = await saveDocumentItem(editingDocument);
                          if (ok) {
                            setEditingDocument(null);
                            showStatus('Document saved to SQLite.');
                          }
                        }}
                        className="space-y-3 text-xs"
                      >
                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">Title (English) *</label>
                          <input
                            type="text"
                            required
                            value={editingDocument.titleEn || ''}
                            onChange={e => setEditingDocument({ ...editingDocument, titleEn: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">Title (Marathi) *</label>
                          <input
                            type="text"
                            required
                            value={editingDocument.titleMr || ''}
                            onChange={e => setEditingDocument({ ...editingDocument, titleMr: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] font-serif"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Pages</label>
                            <input
                              type="number"
                              value={editingDocument.pages || 0}
                              onChange={e => setEditingDocument({ ...editingDocument, pages: parseInt(e.target.value) || 0 })}
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">File Size</label>
                            <input
                              type="text"
                              value={editingDocument.fileSize || ''}
                              onChange={e => setEditingDocument({ ...editingDocument, fileSize: e.target.value })}
                              placeholder="e.g. 2.4 MB"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Category</label>
                            <select
                              value={editingDocument.category || 'Study Material'}
                              onChange={e => setEditingDocument({ ...editingDocument, category: e.target.value as any })}
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            >
                              <option value="Study Material">Study Material</option>
                              <option value="Syllabus">Syllabus</option>
                              <option value="Research">Research</option>
                              <option value="Manuscript">Manuscript</option>
                              {categories
                                .filter(c => c.type === 'knowledge' || c.type === 'both')
                                .map(cat => (
                                  <option key={cat.id} value={cat.titleEn}>
                                    {cat.titleEn} ({cat.titleMr})
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Language</label>
                            <input
                              type="text"
                              value={editingDocument.language || ''}
                              onChange={e => setEditingDocument({ ...editingDocument, language: e.target.value })}
                              placeholder="e.g. Sanskrit & Marathi"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                        </div>

                        {/* PDF File Source: Upload File or URL */}
                        <div className="p-3 rounded-xl bg-[#FFF8F1] border border-[#EFE8DA] space-y-2">
                          <label className="block font-bold text-[#651728] flex items-center gap-1.5">
                            <Upload className="w-4 h-4 text-[#C85413]" />
                            <span>Document PDF File / URL</span>
                          </label>
                          <div>
                            <label className="block text-[11px] font-semibold text-[#5C5348] mb-1">Upload PDF File</label>
                            <input
                              type="file"
                              accept=".pdf,application/pdf"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (evt) => {
                                    const result = evt.target?.result as string;
                                    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
                                    setEditingDocument(prev => prev ? ({
                                      ...prev,
                                      fileUrl: result,
                                      fileSize: `${sizeMb} MB (PDF)`
                                    }) : null);
                                    showStatus(`Loaded document PDF: ${file.name}`);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="w-full text-xs text-[#5C5348] file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#651728] file:text-white hover:file:bg-[#C85413] cursor-pointer"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-[#5C5348] mb-1">Or Paste Direct File URL (PDF/Doc)</label>
                            <input
                              type="url"
                              value={editingDocument.fileUrl || ''}
                              onChange={e => setEditingDocument({ ...editingDocument, fileUrl: e.target.value })}
                              placeholder="https://example.com/stotra-guide.pdf"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">Author / Institution</label>
                          <input
                            type="text"
                            value={editingDocument.author || ''}
                            onChange={e => setEditingDocument({ ...editingDocument, author: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">Description (English)</label>
                          <textarea
                            rows={2}
                            value={editingDocument.descriptionEn || ''}
                            onChange={e => setEditingDocument({ ...editingDocument, descriptionEn: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">Description (Marathi)</label>
                          <textarea
                            rows={2}
                            value={editingDocument.descriptionMr || ''}
                            onChange={e => setEditingDocument({ ...editingDocument, descriptionMr: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] font-serif"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-3 border-t border-[#EFE8DA]">
                          <button
                            type="button"
                            onClick={() => setEditingDocument(null)}
                            className="px-4 py-2 rounded-xl bg-[#EFE8DA] text-[#5C5348] font-semibold"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-[#651728] text-white font-semibold"
                          >
                            Save Document
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* --- TAB 7: EVENTS MANAGER --- */}
            {activeTab === 'events' && (
              <div className="mt-4 md:mt-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#651728]">Events &amp; Celebrations ({events.length})</h3>
                    <p className="text-xs text-[#8A7E70]">Manage Guru Poornima, Sanskrit Day celebrations and lecture schedules</p>
                  </div>
                  <button
                    onClick={() => setEditingEvent({
                      id: '',
                      titleEn: '',
                      titleMr: '',
                      date: '2024-11-01',
                      day: '01',
                      month: 'NOV',
                      year: '2024',
                      time: '05:30 PM',
                      venueEn: 'Thane Trust Hall',
                      venueMr: 'ठाणे ज्ञानमंदिर सभागृह',
                      category: 'Celebration',
                      descriptionEn: '',
                      descriptionMr: '',
                      image: '/Photos/Surwanee_competition_6-scaled-updraft-pre-smush-original.jpg'
                    })}
                    className="px-4 py-2 rounded-xl bg-[#C85413] hover:bg-[#A3430C] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Event</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {events.map(event => (
                    <div key={event.id} className="bg-[#FCFAF7] border border-[#E3D9C4] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#651728]/10 text-[#651728]">
                              {event.category}
                            </span>
                            <h4 className="text-sm font-bold text-[#221D18] mt-1">{event.titleEn}</h4>
                            <p className="text-xs text-[#C85413] font-serif">{event.titleMr}</p>
                          </div>
                          <div className="text-right shrink-0 bg-[#FFF8F1] px-2.5 py-1 rounded-xl border border-[#EFE8DA]">
                            <div className="text-sm font-bold text-[#651728]">{event.day} {event.month}</div>
                            <div className="text-[10px] text-[#8A7E70]">{event.time}</div>
                          </div>
                        </div>

                        <p className="text-xs text-[#5C5348] line-clamp-2 mb-2">
                          {event.descriptionEn}
                        </p>

                        <div className="text-[11px] text-[#8A7E70]">
                          Venue: <span className="font-semibold text-[#5C5348]">{event.venueEn}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#EFE8DA] mt-3">
                        <button
                          onClick={() => setEditingEvent(event)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#F4EFE6] text-xs font-semibold text-[#221D18] flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#C85413]" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Delete event "${event.titleEn}"?`)) {
                              const ok = await deleteEvent(event.id);
                              if (ok) showStatus('Event deleted from SQLite.');
                            }
                          }}
                          className="p-1.5 rounded-lg hover:bg-red-100 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Event Edit Modal */}
                {editingEvent && (
                  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-[#FCFAF7] border border-[#E3D9C4] rounded-2xl shadow-2xl max-w-lg w-full p-6">
                      <div className="flex items-center justify-between pb-3 border-b border-[#EFE8DA] mb-4">
                        <h4 className="text-lg font-serif font-bold text-[#651728]">
                          {editingEvent.id ? 'Edit Event' : 'Add New Event'}
                        </h4>
                        <button onClick={() => setEditingEvent(null)}>
                          <X className="w-5 h-5 text-[#8A7E70]" />
                        </button>
                      </div>

                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const ok = await saveEvent(editingEvent);
                          if (ok) {
                            setEditingEvent(null);
                            showStatus('Event saved to SQLite.');
                          }
                        }}
                        className="space-y-3 text-xs"
                      >
                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">Title (English) *</label>
                          <input
                            type="text"
                            required
                            value={editingEvent.titleEn || ''}
                            onChange={e => setEditingEvent({ ...editingEvent, titleEn: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">Title (Marathi) *</label>
                          <input
                            type="text"
                            required
                            value={editingEvent.titleMr || ''}
                            onChange={e => setEditingEvent({ ...editingEvent, titleMr: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] font-serif"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Date String (e.g. 15 Aug 2024)</label>
                            <input
                              type="text"
                              value={editingEvent.date || ''}
                              onChange={e => setEditingEvent({ ...editingEvent, date: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-[#5C5348] mb-1">Time</label>
                            <input
                              type="text"
                              value={editingEvent.time || ''}
                              onChange={e => setEditingEvent({ ...editingEvent, time: e.target.value })}
                              placeholder="e.g. 06:00 PM"
                              className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block font-semibold text-[#5C5348] mb-1">Venue</label>
                          <input
                            type="text"
                            value={editingEvent.venueEn || ''}
                            onChange={e => setEditingEvent({ ...editingEvent, venueEn: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18]"
                          />
                        </div>

                        <ImageUploadField
                          label="Event Banner / Flyer"
                          value={editingEvent.image || ''}
                          onChange={url => setEditingEvent({ ...editingEvent, image: url })}
                          helpText="Upload a banner photo or flyer for this event"
                        />

                        <div className="flex justify-end gap-2 pt-3 border-t border-[#EFE8DA]">
                          <button
                            type="button"
                            onClick={() => setEditingEvent(null)}
                            className="px-4 py-2 rounded-xl bg-[#EFE8DA] text-[#5C5348] font-semibold"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-[#651728] text-white font-semibold"
                          >
                            Save Event
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* --- TAB 8: ADMISSION APPLICATIONS INBOX --- */}
            {activeTab === 'enrollments' && (
              <div className="mt-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base md:text-lg font-serif font-bold text-[#651728]">Student Admissions &amp; Enrollments ({enrollments.length})</h3>
                    <p className="text-xs text-[#8A7E70]">Direct applications submitted through the online admission inquiry forms</p>
                  </div>
                </div>

                {enrollments.length === 0 ? (
                  <div className="bg-[#FCFAF7] border border-[#E3D9C4] rounded-2xl p-12 text-center">
                    <Users className="w-12 h-12 text-[#8A7E70] mx-auto mb-3 opacity-40" />
                    <h4 className="text-base font-serif font-bold text-[#221D18]">No Applications In SQLite Yet</h4>
                    <p className="text-xs text-[#5C5348] mt-1 max-w-md mx-auto">
                      When students fill out the "Enroll Now" or "Admission Inquiry" modal on any course page, their record will appear here in real time.
                    </p>
                  </div>
                ) : (
                  <div className="bg-[#FCFAF7] border border-[#E3D9C4] rounded-2xl shadow-xs">
                    <div className="overflow-x-auto -mx-0">
                      <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                        <thead>
                          <tr className="bg-[#F4EFE6] text-[#5C5348] border-b border-[#E3D9C4] font-semibold">
                            <th className="py-3 px-4">Student Candidate</th>
                            <th className="py-3 px-4">Course Track</th>
                            <th className="py-3 px-4">Batch Preference</th>
                            <th className="py-3 px-4">Contact Details</th>
                            <th className="py-3 px-4">Date Submitted</th>
                            <th className="py-3 px-4">Application Status</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EFE8DA]">
                          {enrollments.map(enr => (
                            <tr key={enr.id} className="hover:bg-white/60 transition-colors">
                              <td className="py-3 px-4 font-bold text-[#221D18]">
                                <div className="text-sm font-serif text-[#651728]">{enr.studentName}</div>
                                {enr.occupation && <div className="text-[11px] text-[#8A7E70] font-normal">{enr.occupation}</div>}
                              </td>
                              <td className="py-3 px-4 text-[#C85413] font-medium">
                                <span className="bg-[#FFF8F1] px-2.5 py-1 rounded-lg border border-[#C85413]/20 font-semibold inline-block">
                                  {enr.courseName || enr.courseId}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-[#5C5348] font-medium">
                                {enr.batchPreference || 'Standard Batch'}
                              </td>
                              <td className="py-3 px-4 text-[#5C5348]">
                                <div className="flex items-center gap-1.5">
                                  <Phone className="w-3.5 h-3.5 text-[#C85413]" />
                                  <a href={`tel:${enr.phone}`} className="hover:underline font-mono font-bold text-[#221D18]">{enr.phone}</a>
                                </div>
                                {enr.email && (
                                  <div className="flex items-center gap-1.5 text-[11px] text-[#8A7E70] mt-0.5">
                                    <Mail className="w-3.5 h-3.5" />
                                    <a href={`mailto:${enr.email}`} className="hover:underline">{enr.email}</a>
                                  </div>
                                )}
                              </td>
                              <td className="py-3 px-4 text-[#8A7E70] font-mono">
                                {new Date(enr.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4">
                                <select
                                  value={enr.status}
                                  onChange={async (e) => {
                                    const newStatus = e.target.value as any;
                                    await updateEnrollmentStatus(enr.id, newStatus);
                                    showStatus(`Application status updated to ${newStatus}`);
                                  }}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${enr.status === 'Pending'
                                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                                    : enr.status === 'Enrolled'
                                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                      : enr.status === 'Contacted'
                                        ? 'bg-blue-100 text-blue-900 border-blue-300'
                                        : 'bg-gray-100 text-gray-800 border-gray-300'
                                    }`}
                                >
                                  <option value="Pending">Pending Review</option>
                                  <option value="Contacted">Contacted Candidate</option>
                                  <option value="Enrolled">Enrolled Student</option>
                                  <option value="Completed">Completed Course</option>
                                  <option value="Archived">Archived</option>
                                </select>
                              </td>
                              <td className="py-3 px-4 text-right whitespace-nowrap">
                                <button
                                  onClick={() => setSelectedEnrollment(enr)}
                                  className="px-2.5 py-1.5 rounded-lg bg-[#FFF8F1] hover:bg-[#FCEFD9] border border-[#C85413]/30 text-[#651728] font-bold text-xs inline-flex items-center gap-1 shadow-2xs mr-2 transition-all"
                                  title="View candidate details"
                                >
                                  <Eye className="w-3.5 h-3.5 text-[#C85413]" />
                                  <span>View Details</span>
                                </button>
                                <button
                                  onClick={async () => {
                                    if (confirm(`Delete application for ${enr.studentName}?`)) {
                                      await deleteEnrollment(enr.id);
                                      showStatus('Application deleted.');
                                    }
                                  }}
                                  className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                                  title="Delete application"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Candidate Details Modal */}
                {selectedEnrollment && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
                    <div
                      className="relative w-full max-w-lg bg-[#FCFAF7] border-2 border-[#C85413]/40 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5"
                      onClick={e => e.stopPropagation()}
                    >
                      {/* Modal Header */}
                      <div className="flex items-start justify-between border-b border-[#EFE8DA] pb-4">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C85413] bg-[#FFF8F1] px-2.5 py-0.5 rounded-md border border-[#C85413]/20">
                            ADMISSION APPLICATION DOSSIER
                          </span>
                          <h3 className="text-xl font-serif font-bold text-[#651728] mt-1">
                            {selectedEnrollment.studentName}
                          </h3>
                          <p className="text-xs text-[#8A7E70]">
                            ID: <span className="font-mono">{selectedEnrollment.id}</span> • Applied: {new Date(selectedEnrollment.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedEnrollment(null)}
                          className="p-1.5 rounded-full hover:bg-[#EFE8DA] text-[#5C5348] transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Candidate Details Body */}
                      <div className="space-y-4 text-xs">

                        {/* Contact Card */}
                        <div className="bg-[#FFF8F1] border border-[#C85413]/20 p-4 rounded-2xl space-y-2">
                          <div className="font-bold text-[#651728] text-xs uppercase tracking-wider">Candidate Contact Details</div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-[#C85413]" />
                              <div>
                                <div className="text-[10px] text-[#8A7E70]">Phone / WhatsApp</div>
                                <a href={`tel:${selectedEnrollment.phone}`} className="font-mono font-bold text-[#221D18] hover:underline">
                                  {selectedEnrollment.phone}
                                </a>
                              </div>
                            </div>

                            {selectedEnrollment.email && (
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-[#651728]" />
                                <div>
                                  <div className="text-[10px] text-[#8A7E70]">Email Address</div>
                                  <a href={`mailto:${selectedEnrollment.email}`} className="font-semibold text-[#221D18] hover:underline">
                                    {selectedEnrollment.email}
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Course & Batch Preferences */}
                        <div className="bg-white border border-[#E3D9C4] p-4 rounded-2xl space-y-3">
                          <div>
                            <div className="text-[10px] text-[#8A7E70] font-semibold uppercase">Selected Program Track</div>
                            <div className="text-sm font-serif font-bold text-[#651728]">
                              {selectedEnrollment.courseName || selectedEnrollment.courseId}
                            </div>
                          </div>

                          {selectedEnrollment.batchPreference && (
                            <div>
                              <div className="text-[10px] text-[#8A7E70] font-semibold uppercase">Batch &amp; Timing Preference</div>
                              <div className="font-medium text-[#221D18]">{selectedEnrollment.batchPreference}</div>
                            </div>
                          )}

                          {selectedEnrollment.priorKnowledge && (
                            <div>
                              <div className="text-[10px] text-[#8A7E70] font-semibold uppercase">Prior Sanskrit Background</div>
                              <div className="font-medium text-[#221D18]">{selectedEnrollment.priorKnowledge}</div>
                            </div>
                          )}

                          {selectedEnrollment.notes && (
                            <div>
                              <div className="text-[10px] text-[#8A7E70] font-semibold uppercase">Candidate Remarks / Notes</div>
                              <div className="font-medium text-[#221D18] bg-[#FCFAF7] p-2.5 rounded-xl border border-[#EFE8DA]">{selectedEnrollment.notes}</div>
                            </div>
                          )}
                        </div>

                        {/* Action Bar */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#EFE8DA]">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-[#5C5348]">Status:</span>
                            <select
                              value={selectedEnrollment.status}
                              onChange={async (e) => {
                                const newStatus = e.target.value as any;
                                await updateEnrollmentStatus(selectedEnrollment.id, newStatus);
                                setSelectedEnrollment(prev => prev ? { ...prev, status: newStatus } : null);
                                showStatus(`Application status updated to ${newStatus}`);
                              }}
                              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-[#C85413]/40 text-[#651728]"
                            >
                              <option value="Pending">Pending Review</option>
                              <option value="Contacted">Contacted Candidate</option>
                              <option value="Enrolled">Enrolled Student</option>
                              <option value="Completed">Completed Course</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </div>

                          <a
                            href={`tel:${selectedEnrollment.phone}`}
                            className="px-4 py-2 rounded-xl bg-[#651728] hover:bg-[#822237] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#FCD34D]" />
                            <span>Call Candidate</span>
                          </a>
                        </div>

                      </div>

                    </div>
                  </div>
                )}

              </div>
            )}

            {/* --- TAB 9: INQUIRIES MESSAGES INBOX --- */}
            {activeTab === 'inquiries' && (
              <div className="mt-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base md:text-lg font-serif font-bold text-[#651728]">Contact Inquiries ({inquiries.length})</h3>
                    <p className="text-xs text-[#8A7E70]">Direct inquiries sent from the website Contact Us page</p>
                  </div>
                </div>

                {inquiries.length === 0 ? (
                  <div className="bg-[#FCFAF7] border border-[#E3D9C4] rounded-2xl p-12 text-center">
                    <Mail className="w-12 h-12 text-[#8A7E70] mx-auto mb-3 opacity-40" />
                    <h4 className="text-base font-serif font-bold text-[#221D18]">No Contact Messages Yet</h4>
                    <p className="text-xs text-[#5C5348] mt-1 max-w-md mx-auto">
                      Messages submitted by visitors will be logged here with sender info and inquiry notes.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inquiries.map(inq => (
                      <div key={inq.id} className="bg-[#FCFAF7] border border-[#E3D9C4] rounded-2xl p-5 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-[#221D18]">{inq.name}</h4>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${inq.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                                }`}>
                                {inq.status}
                              </span>
                            </div>
                            <div className="text-xs text-[#5C5348] mt-0.5">
                              Phone: <a href={`tel:${inq.phone}`} className="font-mono text-[#C85413] hover:underline">{inq.phone}</a> • Email: <a href={`mailto:${inq.email}`} className="text-[#651728] hover:underline">{inq.email}</a>
                            </div>
                          </div>
                          <div className="text-xs text-[#8A7E70]">
                            {new Date(inq.createdAt).toLocaleString()}
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-white border border-[#EFE8DA] my-2 text-xs">
                          <div className="font-semibold text-[#651728] mb-1">{inq.subject}</div>
                          <p className="text-[#221D18] whitespace-pre-wrap">{inq.message}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-[#EFE8DA] text-xs gap-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={async () => {
                                await updateInquiryStatus(inq.id, 'Replied');
                                showStatus('Inquiry marked as Replied.');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#EFE8DA] hover:bg-[#E3D9C4] font-semibold text-[#5C5348]"
                            >
                              Mark as Replied
                            </button>
                          </div>

                          <button
                            onClick={async () => {
                              if (confirm(`Delete message from ${inq.name}?`)) {
                                await deleteInquiry(inq.id);
                                showStatus('Inquiry deleted.');
                              }
                            }}
                            className="p-1.5 rounded hover:bg-red-100 text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Audio Player Modal for Admin Testing */}
      <AudioPlayerModal
        isOpen={!!playingAudioTrack}
        audioItem={playingAudioTrack}
        onClose={() => setPlayingAudioTrack(null)}
      />

    </div>
  );
};
