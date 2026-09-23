import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  Course, 
  AudioItem, 
  VideoItem, 
  GalleryItem, 
  DocumentItem, 
  TrustEvent,
  EnrollmentRecord,
  InquiryRecord,
  Category
} from '../types';
import { 
  COURSES as DEFAULT_COURSES,
  AUDIO_ITEMS as DEFAULT_AUDIO,
  VIDEO_ITEMS as DEFAULT_VIDEOS,
  GALLERY_ITEMS as DEFAULT_GALLERY,
  DOCUMENT_ITEMS as DEFAULT_DOCS,
  TRUST_EVENTS as DEFAULT_EVENTS,
  CATEGORIES as DEFAULT_CATEGORIES,
  ENROLLMENTS as DEFAULT_ENROLLMENTS,
  INQUIRIES as DEFAULT_INQUIRIES
} from '../data/mockData';

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || '';

interface DataContextType {
  // Collections
  categories: Category[];
  courses: Course[];
  audioItems: AudioItem[];
  videoItems: VideoItem[];
  galleryItems: GalleryItem[];
  documentItems: DocumentItem[];
  events: TrustEvent[];
  enrollments: EnrollmentRecord[];
  inquiries: InquiryRecord[];
  
  // Loading & sync state
  isLoading: boolean;
  isSyncing: boolean;
  isBackendConnected: boolean | null;
  lastSyncTime: Date | null;
  checkConnection: () => Promise<boolean>;
  refreshAllData: () => Promise<void>;
  
  // CRUD - Categories
  saveCategory: (category: Partial<Category>) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<boolean>;

  // CRUD - Courses
  saveCourse: (course: Partial<Course>) => Promise<boolean>;
  deleteCourse: (id: string) => Promise<boolean>;
  
  // CRUD - Audio
  saveAudioItem: (item: Partial<AudioItem>) => Promise<boolean>;
  deleteAudioItem: (id: string) => Promise<boolean>;
  
  // CRUD - Video
  saveVideoItem: (item: Partial<VideoItem>) => Promise<boolean>;
  deleteVideoItem: (id: string) => Promise<boolean>;
  
  // CRUD - Gallery
  saveGalleryItem: (item: Partial<GalleryItem>) => Promise<boolean>;
  deleteGalleryItem: (id: string) => Promise<boolean>;
  
  // CRUD - Documents
  saveDocumentItem: (item: Partial<DocumentItem>) => Promise<boolean>;
  deleteDocumentItem: (id: string) => Promise<boolean>;
  
  // CRUD - Events
  saveEvent: (item: Partial<TrustEvent>) => Promise<boolean>;
  deleteEvent: (id: string) => Promise<boolean>;
  
  // Enrollments & Inquiries
  submitEnrollment: (data: Omit<EnrollmentRecord, 'id' | 'createdAt' | 'status'>) => Promise<{ success: boolean; id?: string }>;
  updateEnrollmentStatus: (id: string, status: EnrollmentRecord['status']) => Promise<boolean>;
  deleteEnrollment: (id: string) => Promise<boolean>;
  
  submitInquiry: (data: Omit<InquiryRecord, 'id' | 'createdAt' | 'status'>) => Promise<{ success: boolean; id?: string }>;
  updateInquiryStatus: (id: string, status: InquiryRecord['status']) => Promise<boolean>;
  deleteInquiry: (id: string) => Promise<boolean>;

  // Admin Tools
  resetToDefaults: () => Promise<boolean>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(() => {
    try { const s = localStorage.getItem('surawanee_categories'); if (s) return JSON.parse(s); } catch {}
    return DEFAULT_CATEGORIES;
  });
  const [courses, setCourses] = useState<Course[]>(() => {
    try { const s = localStorage.getItem('surawanee_courses'); if (s) return JSON.parse(s); } catch {}
    return DEFAULT_COURSES;
  });
  const [audioItems, setAudioItems] = useState<AudioItem[]>(() => {
    try { const s = localStorage.getItem('surawanee_audio'); if (s) return JSON.parse(s); } catch {}
    return DEFAULT_AUDIO;
  });
  const [videoItems, setVideoItems] = useState<VideoItem[]>(() => {
    try { const s = localStorage.getItem('surawanee_video'); if (s) return JSON.parse(s); } catch {}
    return DEFAULT_VIDEOS;
  });
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try { const s = localStorage.getItem('surawanee_gallery'); if (s) return JSON.parse(s); } catch {}
    return DEFAULT_GALLERY;
  });
  const [documentItems, setDocumentItems] = useState<DocumentItem[]>(() => {
    try { const s = localStorage.getItem('surawanee_documents'); if (s) return JSON.parse(s); } catch {}
    return DEFAULT_DOCS;
  });
  const [events, setEvents] = useState<TrustEvent[]>(() => {
    try { const s = localStorage.getItem('surawanee_events'); if (s) return JSON.parse(s); } catch {}
    return DEFAULT_EVENTS;
  });
  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>(() => {
    try { const s = localStorage.getItem('surawanee_enrollments'); if (s) return JSON.parse(s); } catch {}
    return DEFAULT_ENROLLMENTS;
  });
  const [inquiries, setInquiries] = useState<InquiryRecord[]>(() => {
    try { const s = localStorage.getItem('surawanee_inquiries'); if (s) return JSON.parse(s); } catch {}
    return DEFAULT_INQUIRIES;
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Check health of backend
  const checkConnection = useCallback(async (): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/api/health`, { method: 'GET', cache: 'no-store' });
      if (res.ok) {
        setIsBackendConnected(true);
        return true;
      }
      setIsBackendConnected(false);
      return false;
    } catch {
      setIsBackendConnected(false);
      return false;
    }
  }, []);

  const fetchCollection = async (endpoint: string, fallback: any[], storageKey?: string) => {
    let localItems: any[] = [];
    if (storageKey) {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) localItems = JSON.parse(saved);
      } catch {}
    }

    try {
      const res = await fetch(`${API_BASE}/api/${endpoint}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          // Backend responded successfully!
          setIsBackendConnected(true);
          
          if (data.length > 0) {
            // Authoritative: SQLite database has data, merge any local items missing from backend
            const backendIds = new Set(data.map((item: any) => String(item.id)));
            const missingLocal = localItems.filter((item: any) => !backendIds.has(String(item.id)));
            const merged = [...data, ...missingLocal];

            // Preserve local blob: URLs if backend audioUrl is empty or missing, and unpack nested bItem.data
            const finalData = merged.map((bItem: any) => {
              const localMatch = localItems.find((l: any) => String(l.id) === String(bItem.id));
              const dataObj = (bItem.data && typeof bItem.data === 'object') ? bItem.data : {};
              let item = { ...dataObj, ...bItem };
              if (localMatch?.audioUrl?.startsWith('blob:') && !item.audioUrl) {
                item.audioUrl = localMatch.audioUrl;
              }
              return item;
            });

            if (storageKey) {
              try { localStorage.setItem(storageKey, JSON.stringify(finalData)); } catch {}
            }
            return finalData;
          } else {
            // Table exists but is currently empty: keep cached or fallback
            const toKeep = localItems.length > 0 ? localItems : (Array.isArray(fallback) ? fallback : []);
            if (storageKey) {
              try { localStorage.setItem(storageKey, JSON.stringify(toKeep)); } catch {}
            }
            return toKeep;
          }
        }
      } else {
        setIsBackendConnected(false);
      }
    } catch (err) {
      setIsBackendConnected(false);
      console.warn(`Database API unavailable for /api/${endpoint}, using offline cache:`, err);
    }

    // Backend is offline: use local cache or fallback
    const offlineItems = localItems.length > 0 ? localItems : (Array.isArray(fallback) ? fallback : []);
    return offlineItems;
  };

  const refreshAllData = useCallback(async () => {
    setIsSyncing(true);
    try {
      await checkConnection();

      const [
        fetchedCategories,
        fetchedCourses,
        fetchedAudio,
        fetchedVideos,
        fetchedGallery,
        fetchedDocs,
        fetchedEvents,
        fetchedEnrollments,
        fetchedInquiries
      ] = await Promise.all([
        fetchCollection('categories', DEFAULT_CATEGORIES, 'surawanee_categories'),
        fetchCollection('courses', DEFAULT_COURSES, 'surawanee_courses'),
        fetchCollection('audio', DEFAULT_AUDIO, 'surawanee_audio'),
        fetchCollection('video', DEFAULT_VIDEOS, 'surawanee_video'),
        fetchCollection('gallery', DEFAULT_GALLERY, 'surawanee_gallery'),
        fetchCollection('documents', DEFAULT_DOCS, 'surawanee_documents'),
        fetchCollection('events', DEFAULT_EVENTS, 'surawanee_events'),
        fetchCollection('enrollments', DEFAULT_ENROLLMENTS, 'surawanee_enrollments'),
        fetchCollection('inquiries', DEFAULT_INQUIRIES, 'surawanee_inquiries')
      ]);

      setCategories(fetchedCategories);
      setCourses(fetchedCourses);
      setAudioItems(fetchedAudio);
      setVideoItems(fetchedVideos);
      setGalleryItems(fetchedGallery);
      setDocumentItems(fetchedDocs);
      setEvents(fetchedEvents);
      setEnrollments(fetchedEnrollments);
      setInquiries(fetchedInquiries);
      setLastSyncTime(new Date());
    } finally {
      setIsSyncing(false);
      setIsLoading(false);
    }
  }, [checkConnection]);

  useEffect(() => {
    refreshAllData();

    // Auto check & sync when tab becomes visible
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        refreshAllData();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Heartbeat ping every 20 seconds to keep connection status active
    const timer = setInterval(() => {
      checkConnection();
    }, 20000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      clearInterval(timer);
    };
  }, [refreshAllData, checkConnection]);

  // Robust API sync helper with automatic retry / fallback
  const syncItemToApi = async (endpoint: string, id: string, item: any, isEdit: boolean) => {
    try {
      if (isEdit) {
        const putRes = await fetch(`${API_BASE}/api/${endpoint}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
        if (putRes.status === 404) {
          // Record does not exist in SQLite yet, create it via POST
          await fetch(`${API_BASE}/api/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
          });
        }
      } else {
        const postRes = await fetch(`${API_BASE}/api/${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
        if (!postRes.ok && (postRes.status === 400 || postRes.status === 409)) {
          // Record already exists with this ID, update via PUT
          await fetch(`${API_BASE}/api/${endpoint}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
          });
        }
      }
      setIsBackendConnected(true);
      setLastSyncTime(new Date());
    } catch (err) {
      console.warn(`[Sync Warning] Failed to reach /api/${endpoint}, cached locally:`, err);
      setIsBackendConnected(false);
    }
  };

  const deleteItemFromApi = async (endpoint: string, id: string) => {
    try {
      await fetch(`${API_BASE}/api/${endpoint}/${id}`, { method: 'DELETE' });
      setIsBackendConnected(true);
      setLastSyncTime(new Date());
    } catch (err) {
      console.warn(`[Delete Warning] Failed to delete from /api/${endpoint}/${id}:`, err);
      setIsBackendConnected(false);
    }
  };

  // --- Category Mutations ---
  const saveCategory = async (category: Partial<Category>): Promise<boolean> => {
    const isEdit = !!category.id && categories.some(c => c.id === category.id);
    const targetId = category.id || `cat_${Date.now()}`;
    const fullItem: Category = {
      id: targetId,
      titleEn: category.titleEn || 'New Category',
      titleMr: category.titleMr || 'नवीन वर्ग',
      type: category.type || 'course',
      descriptionEn: category.descriptionEn || '',
      descriptionMr: category.descriptionMr || '',
      ...category
    } as Category;

    setCategories(prev => {
      const updated = isEdit 
        ? prev.map(c => c.id === targetId ? fullItem : c)
        : [...prev.filter(c => c.id !== targetId), fullItem];
      try { localStorage.setItem('surawanee_categories', JSON.stringify(updated)); } catch {}
      return updated;
    });

    await syncItemToApi('categories', targetId, fullItem, isEdit);
    return true;
  };

  const deleteCategory = async (id: string): Promise<boolean> => {
    setCategories(prev => {
      const updated = prev.filter(c => c.id !== id);
      try { localStorage.setItem('surawanee_categories', JSON.stringify(updated)); } catch {}
      return updated;
    });
    await deleteItemFromApi('categories', id);
    return true;
  };

  // --- Course Mutations ---
  const saveCourse = async (course: Partial<Course>): Promise<boolean> => {
    const isEdit = !!course.id && courses.some(c => c.id === course.id);
    const targetId = course.id || `course_${Date.now()}`;
    const fullItem: Course = {
      id: targetId,
      titleEn: course.titleEn || 'New Course',
      titleMr: course.titleMr || 'नवीन अभ्यासक्रम',
      category: course.category || 'paurohitya',
      categoryLabelEn: course.categoryLabelEn || 'Paurohitya Track',
      categoryLabelMr: course.categoryLabelMr || 'पौरोहित्य अभ्यासक्रम',
      subtitleEn: course.subtitleEn || '',
      subtitleMr: course.subtitleMr || '',
      descriptionEn: course.descriptionEn || '',
      descriptionMr: course.descriptionMr || '',
      level: course.level || 'Beginner',
      duration: course.duration || '6 Months',
      totalLessons: course.totalLessons || 12,
      totalHours: course.totalHours || '24 Hours',
      mode: course.mode || 'Hybrid',
      fee: course.fee || 'Free',
      thumbnail: course.thumbnail || '/Photos/Surawanee_Paurohitya-Ganesh-Pooja-e1660834393968-updraft-pre-smush-original.jpg',
      instructor: course.instructor || {
        name: 'Vedmurti Guruji',
        titleEn: 'Senior Acharya',
        titleMr: 'वरिष्ठ आचार्य',
        credentials: 'Vedacharya',
        avatar: '/Photos/Surawanee_Paurohitya-Varg-1-updraft-pre-smush-original.jpg'
      },
      upcomingBatch: course.upcomingBatch || 'Starting Next Month',
      prerequisites: course.prerequisites || ['Basic Devanagari reading knowledge'],
      learningOutcomes: course.learningOutcomes || ['Complete ritual mastery'],
      modules: course.modules || [],
      certificateProvided: course.certificateProvided ?? true,
      ...course
    } as Course;

    setCourses(prev => {
      const updated = isEdit 
        ? prev.map(c => c.id === targetId ? fullItem : c)
        : [fullItem, ...prev.filter(c => c.id !== targetId)];
      try { localStorage.setItem('surawanee_courses', JSON.stringify(updated)); } catch {}
      return updated;
    });

    await syncItemToApi('courses', targetId, fullItem, isEdit);
    return true;
  };

  const deleteCourse = async (id: string): Promise<boolean> => {
    setCourses(prev => {
      const updated = prev.filter(c => c.id !== id);
      try { localStorage.setItem('surawanee_courses', JSON.stringify(updated)); } catch {}
      return updated;
    });
    await deleteItemFromApi('courses', id);
    return true;
  };

  // --- Audio Mutations ---
  const saveAudioItem = async (item: Partial<AudioItem>): Promise<boolean> => {
    const isEdit = !!item.id && audioItems.some(a => a.id === item.id);
    const targetId = item.id || `audio_${Date.now()}`;
    const fullItem: AudioItem = {
      id: targetId,
      titleEn: item.titleEn || 'New Audio Track',
      titleMr: item.titleMr || 'नवीन ऑडिओ',
      subtitleEn: item.subtitleEn || '',
      subtitleMr: item.subtitleMr || '',
      category: item.category || 'audio-recitations',
      duration: item.duration || '',
      reciter: item.reciter || 'Trust Acharyas',
      shlokaText: item.shlokaText || '',
      transliteration: item.transliteration || '',
      meaning: item.meaning || '',
      audioUrl: item.audioUrl || '',
      ...item
    } as AudioItem;

    setAudioItems(prev => {
      const updated = isEdit 
        ? prev.map(a => a.id === targetId ? fullItem : a)
        : [fullItem, ...prev.filter(a => a.id !== targetId)];
      try { localStorage.setItem('surawanee_audio', JSON.stringify(updated)); } catch {}
      return updated;
    });

    await syncItemToApi('audio', targetId, fullItem, isEdit);
    return true;
  };

  const deleteAudioItem = async (id: string): Promise<boolean> => {
    setAudioItems(prev => {
      const updated = prev.filter(a => a.id !== id);
      try { localStorage.setItem('surawanee_audio', JSON.stringify(updated)); } catch {}
      return updated;
    });
    await deleteItemFromApi('audio', id);
    return true;
  };

  // --- Video Mutations ---
  const saveVideoItem = async (item: Partial<VideoItem>): Promise<boolean> => {
    const isEdit = !!item.id && videoItems.some(v => v.id === item.id);
    const targetId = item.id || `video_${Date.now()}`;
    const fullItem: VideoItem = {
      id: targetId,
      titleEn: item.titleEn || 'New Video Lecture',
      titleMr: item.titleMr || 'नवीन व्हिडिओ',
      speaker: item.speaker || 'Acharya',
      duration: item.duration || '30 mins',
      category: item.category || 'Paurohitya Vidhi',
      thumbnail: item.thumbnail || '/Photos/Surawanee_Paurohitya-Ganesh-Pooja-e1660834393968-updraft-pre-smush-original.jpg',
      youtubeId: item.youtubeId || 'M7lc1UVf-VE',
      descriptionEn: item.descriptionEn || '',
      descriptionMr: item.descriptionMr || '',
      ...item
    } as VideoItem;

    setVideoItems(prev => {
      const updated = isEdit 
        ? prev.map(v => v.id === targetId ? fullItem : v)
        : [fullItem, ...prev.filter(v => v.id !== targetId)];
      try { localStorage.setItem('surawanee_video', JSON.stringify(updated)); } catch {}
      return updated;
    });

    await syncItemToApi('video', targetId, fullItem, isEdit);
    return true;
  };

  const deleteVideoItem = async (id: string): Promise<boolean> => {
    setVideoItems(prev => {
      const updated = prev.filter(v => v.id !== id);
      try { localStorage.setItem('surawanee_video', JSON.stringify(updated)); } catch {}
      return updated;
    });
    await deleteItemFromApi('video', id);
    return true;
  };

  // --- Gallery Mutations ---
  const saveGalleryItem = async (item: Partial<GalleryItem>): Promise<boolean> => {
    const isEdit = !!item.id && galleryItems.some(g => g.id === item.id);
    const targetId = item.id || `gal_${Date.now()}`;
    const fullItem: GalleryItem = {
      id: targetId,
      titleEn: item.titleEn || 'New Photo',
      titleMr: item.titleMr || 'नवीन छायाचित्र',
      category: item.category || 'classes',
      categoryLabel: item.categoryLabel || 'Classes & Varg',
      imageUrl: item.imageUrl || '/Photos/Surawanee_new_location-updraft-pre-smush-original.png',
      captionEn: item.captionEn || '',
      captionMr: item.captionMr || '',
      year: item.year || '2024',
      ...item
    } as GalleryItem;

    setGalleryItems(prev => {
      const updated = isEdit 
        ? prev.map(g => g.id === targetId ? fullItem : g)
        : [fullItem, ...prev.filter(g => g.id !== targetId)];
      try { localStorage.setItem('surawanee_gallery', JSON.stringify(updated)); } catch {}
      return updated;
    });

    await syncItemToApi('gallery', targetId, fullItem, isEdit);
    return true;
  };

  const deleteGalleryItem = async (id: string): Promise<boolean> => {
    setGalleryItems(prev => {
      const updated = prev.filter(g => g.id !== id);
      try { localStorage.setItem('surawanee_gallery', JSON.stringify(updated)); } catch {}
      return updated;
    });
    await deleteItemFromApi('gallery', id);
    return true;
  };

  // --- Documents Mutations ---
  const saveDocumentItem = async (item: Partial<DocumentItem>): Promise<boolean> => {
    const isEdit = !!item.id && documentItems.some(d => d.id === item.id);
    const targetId = item.id || `doc_${Date.now()}`;
    const fullItem: DocumentItem = {
      id: targetId,
      titleEn: item.titleEn || 'New PDF Document',
      titleMr: item.titleMr || 'नवीन कागदपत्र',
      category: item.category || 'Study Material',
      author: item.author || 'Surawanee Trust',
      pages: item.pages || 10,
      fileSize: item.fileSize || '1.5 MB',
      language: item.language || 'Sanskrit & Marathi',
      descriptionEn: item.descriptionEn || '',
      descriptionMr: item.descriptionMr || '',
      ...item
    } as DocumentItem;

    setDocumentItems(prev => {
      const updated = isEdit 
        ? prev.map(d => d.id === targetId ? fullItem : d)
        : [fullItem, ...prev.filter(d => d.id !== targetId)];
      try { localStorage.setItem('surawanee_documents', JSON.stringify(updated)); } catch {}
      return updated;
    });

    await syncItemToApi('documents', targetId, fullItem, isEdit);
    return true;
  };

  const deleteDocumentItem = async (id: string): Promise<boolean> => {
    setDocumentItems(prev => {
      const updated = prev.filter(d => d.id !== id);
      try { localStorage.setItem('surawanee_documents', JSON.stringify(updated)); } catch {}
      return updated;
    });
    await deleteItemFromApi('documents', id);
    return true;
  };

  // --- Events Mutations ---
  const saveEvent = async (item: Partial<TrustEvent>): Promise<boolean> => {
    const isEdit = !!item.id && events.some(e => e.id === item.id);
    const targetId = item.id || `event_${Date.now()}`;
    const fullItem: TrustEvent = {
      id: targetId,
      titleEn: item.titleEn || 'New Trust Event',
      titleMr: item.titleMr || 'नवीन कार्यक्रम',
      date: item.date || '2024-10-15',
      day: item.day || '15',
      month: item.month || 'OCT',
      year: item.year || '2024',
      time: item.time || '06:00 PM - 08:00 PM',
      venueEn: item.venueEn || 'Thane Hall',
      venueMr: item.venueMr || 'ठाणे सभागृह',
      category: item.category || 'Celebration',
      descriptionEn: item.descriptionEn || '',
      descriptionMr: item.descriptionMr || '',
      image: item.image || '/Photos/Surwanee_competition_6-scaled-updraft-pre-smush-original.jpg',
      ...item
    } as TrustEvent;

    setEvents(prev => {
      const updated = isEdit 
        ? prev.map(e => e.id === targetId ? fullItem : e)
        : [fullItem, ...prev.filter(e => e.id !== targetId)];
      try { localStorage.setItem('surawanee_events', JSON.stringify(updated)); } catch {}
      return updated;
    });

    await syncItemToApi('events', targetId, fullItem, isEdit);
    return true;
  };

  const deleteEvent = async (id: string): Promise<boolean> => {
    setEvents(prev => {
      const updated = prev.filter(e => e.id !== id);
      try { localStorage.setItem('surawanee_events', JSON.stringify(updated)); } catch {}
      return updated;
    });
    await deleteItemFromApi('events', id);
    return true;
  };

  // --- Enrollments ---
  const submitEnrollment = async (data: Omit<EnrollmentRecord, 'id' | 'createdAt' | 'status'>) => {
    const newRecord: EnrollmentRecord = {
      id: `enr_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Pending',
      ...data
    };

    setEnrollments(prev => {
      const updated = [newRecord, ...prev.filter(e => e.id !== newRecord.id)];
      try { localStorage.setItem('surawanee_enrollments', JSON.stringify(updated)); } catch {}
      return updated;
    });

    try {
      const res = await fetch(`${API_BASE}/api/enrollments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord)
      });
      if (res.ok) {
        const json = await res.json();
        const serverRecord = json.enrollment || newRecord;
        setEnrollments(prev => {
          const updated = [serverRecord, ...prev.filter(e => e.id !== newRecord.id && e.id !== serverRecord.id)];
          try { localStorage.setItem('surawanee_enrollments', JSON.stringify(updated)); } catch {}
          return updated;
        });
        setIsBackendConnected(true);
        return { success: true, id: serverRecord.id };
      }
    } catch (err) {
      console.warn('Enrollment saved locally, backend unreachable:', err);
    }
    return { success: true, id: newRecord.id };
  };

  const updateEnrollmentStatus = async (id: string, status: EnrollmentRecord['status']): Promise<boolean> => {
    setEnrollments(prev => {
      const updated = prev.map(e => e.id === id ? { ...e, status } : e);
      try { localStorage.setItem('surawanee_enrollments', JSON.stringify(updated)); } catch {}
      return updated;
    });
    try {
      await fetch(`${API_BASE}/api/enrollments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      setIsBackendConnected(true);
    } catch {}
    return true;
  };

  const deleteEnrollment = async (id: string): Promise<boolean> => {
    setEnrollments(prev => {
      const updated = prev.filter(e => e.id !== id);
      try { localStorage.setItem('surawanee_enrollments', JSON.stringify(updated)); } catch {}
      return updated;
    });
    await deleteItemFromApi('enrollments', id);
    return true;
  };

  // --- Inquiries ---
  const submitInquiry = async (data: Omit<InquiryRecord, 'id' | 'createdAt' | 'status'>) => {
    const newRecord: InquiryRecord = {
      id: `inq_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
      ...data
    };

    setInquiries(prev => {
      const updated = [newRecord, ...prev.filter(i => i.id !== newRecord.id)];
      try { localStorage.setItem('surawanee_inquiries', JSON.stringify(updated)); } catch {}
      return updated;
    });

    try {
      const res = await fetch(`${API_BASE}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord)
      });
      if (res.ok) {
        const json = await res.json();
        const serverRecord = json.inquiry || newRecord;
        setInquiries(prev => {
          const updated = [serverRecord, ...prev.filter(i => i.id !== newRecord.id && i.id !== serverRecord.id)];
          try { localStorage.setItem('surawanee_inquiries', JSON.stringify(updated)); } catch {}
          return updated;
        });
        setIsBackendConnected(true);
        return { success: true, id: serverRecord.id };
      }
    } catch (err) {
      console.warn('Inquiry saved locally, backend unreachable:', err);
    }
    return { success: true, id: newRecord.id };
  };

  const updateInquiryStatus = async (id: string, status: InquiryRecord['status']): Promise<boolean> => {
    setInquiries(prev => {
      const updated = prev.map(i => i.id === id ? { ...i, status } : i);
      try { localStorage.setItem('surawanee_inquiries', JSON.stringify(updated)); } catch {}
      return updated;
    });
    try {
      await fetch(`${API_BASE}/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      setIsBackendConnected(true);
    } catch {}
    return true;
  };

  const deleteInquiry = async (id: string): Promise<boolean> => {
    setInquiries(prev => {
      const updated = prev.filter(i => i.id !== id);
      try { localStorage.setItem('surawanee_inquiries', JSON.stringify(updated)); } catch {}
      return updated;
    });
    await deleteItemFromApi('inquiries', id);
    return true;
  };

  // --- Reset to defaults ---
  const resetToDefaults = async (): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/reset-data`, { method: 'POST' });
      if (res.ok) {
        await refreshAllData();
        return true;
      }
    } catch (err) {
      console.error('Error resetting data on server:', err);
    }
    // Fallback: reset local state and localStorage to initial mock data
    try {
      localStorage.setItem('surawanee_categories', JSON.stringify(DEFAULT_CATEGORIES));
      localStorage.setItem('surawanee_courses', JSON.stringify(DEFAULT_COURSES));
      localStorage.setItem('surawanee_audio', JSON.stringify(DEFAULT_AUDIO));
      localStorage.setItem('surawanee_video', JSON.stringify(DEFAULT_VIDEOS));
      localStorage.setItem('surawanee_gallery', JSON.stringify(DEFAULT_GALLERY));
      localStorage.setItem('surawanee_documents', JSON.stringify(DEFAULT_DOCS));
      localStorage.setItem('surawanee_events', JSON.stringify(DEFAULT_EVENTS));
      localStorage.setItem('surawanee_enrollments', JSON.stringify(DEFAULT_ENROLLMENTS));
      localStorage.setItem('surawanee_inquiries', JSON.stringify(DEFAULT_INQUIRIES));
      setCategories(DEFAULT_CATEGORIES);
      setCourses(DEFAULT_COURSES);
      setAudioItems(DEFAULT_AUDIO);
      setVideoItems(DEFAULT_VIDEOS);
      setGalleryItems(DEFAULT_GALLERY);
      setDocumentItems(DEFAULT_DOCS);
      setEvents(DEFAULT_EVENTS);
      setEnrollments(DEFAULT_ENROLLMENTS);
      setInquiries(DEFAULT_INQUIRIES);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
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
        submitEnrollment,
        updateEnrollmentStatus,
        deleteEnrollment,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiry,
        resetToDefaults
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useAppData must be used within a DataProvider');
  }
  return context;
};
