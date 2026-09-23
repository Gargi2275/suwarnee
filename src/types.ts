export type Language = 'en' | 'mr';

export type PageId = 
  | 'home'
  | 'about'
  | 'courses'
  | 'course-detail'
  | 'knowledge-share'
  | 'events'
  | 'gallery'
  | 'contact'
  | 'admin';

export interface EnrollmentRecord {
  id: string;
  studentName: string;
  phone: string;
  email?: string;
  courseId?: string;
  courseName?: string;
  batchPreference?: string;
  priorKnowledge?: string;
  age?: string;
  occupation?: string;
  address?: string;
  city?: string;
  priorSanskritExp?: string;
  notes?: string;
  createdAt: string;
  status: 'Pending' | 'Contacted' | 'Enrolled' | 'Completed' | 'Archived';
}

export interface InquiryRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Read' | 'Replied' | 'Archived';
}

export interface Shloka {
  sanskrit: string;
  transliteration: string;
  meaningEn: string;
  meaningMr: string;
  source: string;
}

export interface CourseModule {
  id: string;
  titleEn: string;
  titleMr: string;
  duration: string;
  description: string;
  topics: string[];
  hasAudioSample?: boolean;
  audioSampleTitle?: string;
}

export interface Category {
  id: string;
  titleEn: string;
  titleMr: string;
  type: 'course' | 'knowledge' | 'both';
  descriptionEn?: string;
  descriptionMr?: string;
  icon?: string;
  updatedAt?: string;
}

export interface Course {
  id: string;
  titleEn: string;
  titleMr: string;
  category: string;
  categoryLabelEn: string;
  categoryLabelMr: string;
  subtitleEn: string;
  subtitleMr: string;
  descriptionEn: string;
  descriptionMr: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Diploma';
  duration: string;
  totalLessons: number;
  totalHours: string;
  mode: 'Classroom (Thane)' | 'Online Weekend' | 'Hybrid';
  fee: string;
  isFreeOrSubsidized?: boolean;
  thumbnail: string;
  instructor: {
    name: string;
    titleEn: string;
    titleMr: string;
    credentials: string;
    avatar: string;
  };
  upcomingBatch: string;
  prerequisites: string[];
  learningOutcomes: string[];
  modules: CourseModule[];
  certificateProvided: boolean;
  featured?: boolean;
}

export interface CommitteeMember {
  id: string;
  nameEn: string;
  nameMr: string;
  roleEn: string;
  roleMr: string;
  qualification: string;
  bioEn: string;
  bioMr: string;
  photo: string;
}

export interface TimelineEvent {
  year: string;
  titleEn: string;
  titleMr: string;
  descriptionEn: string;
  descriptionMr: string;
  highlight?: string;
  image?: string;
}

export interface TrustEvent {
  id: string;
  titleEn: string;
  titleMr: string;
  date: string;
  day: string;
  month: string;
  year: string;
  time: string;
  venueEn: string;
  venueMr: string;
  category: 'Celebration' | 'Lecture Series' | 'Competition' | 'Varg' | 'Convocation';
  descriptionEn: string;
  descriptionMr: string;
  speaker?: string;
  image: string;
  isPast?: boolean;
  attendeesCount?: number;
}

export interface GalleryItem {
  id: string;
  titleEn: string;
  titleMr: string;
  category: 'all' | 'historical' | 'events' | 'classes' | 'paurohitya' | 'convocation';
  categoryLabel: string;
  imageUrl: string;
  year?: string;
  captionEn: string;
  captionMr: string;
}

export interface VideoItem {
  id: string;
  titleEn: string;
  titleMr: string;
  speaker: string;
  duration: string;
  category: string;
  thumbnail: string;
  youtubeId: string;
  descriptionEn: string;
  descriptionMr: string;
}

export interface AudioItem {
  id: string;
  titleEn: string;
  titleMr: string;
  subtitleEn: string;
  subtitleMr: string;
  category: 'vedic-chant' | 'stotra' | 'grammar' | 'pronunciation' | string;
  duration: string;
  reciter: string;
  shlokaText: string;
  transliteration: string;
  meaning: string;
  audioUrl?: string; // MP3/WAV/Audio File URL or Data URL
  audioFrequency?: number; // for custom web audio synth chanting
}

export interface DocumentItem {
  id: string;
  titleEn: string;
  titleMr: string;
  category: 'Research' | 'Syllabus' | 'Manuscript' | 'Study Material' | string;
  author: string;
  pages: number;
  fileSize: string;
  language: string;
  descriptionEn: string;
  descriptionMr: string;
  fileUrl?: string;
}


