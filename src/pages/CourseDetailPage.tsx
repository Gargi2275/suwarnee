import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Clock, 
  BookOpen, 
  Calendar, 
  Award, 
  CheckCircle, 
  Download, 
  Phone, 
  Sparkles, 
  Users, 
  MapPin,
  Volume2,
  ChevronDown,
  FileText,
  Share2
} from 'lucide-react';
import { useAppLanguage } from '../context/LanguageContext';
import { useAppData } from '../context/DataContext';
import { TRUST_INFO } from '../data/mockData';
import { AudioItem } from '../types';

interface CourseDetailPageProps {
  onPlayAudio: (audio: AudioItem) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ onPlayAudio }) => {
  const { lang, selectedCourseId, setCurrentPage, openEnrollModal } = useAppLanguage();
  const { courses, audioItems } = useAppData();
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor' | 'faq'>('overview');
  const [expandedModules, setExpandedModules] = useState<{ [key: string]: boolean }>({
    'pau-m1': true,
    'lan-m1': true,
    'san-m1': true,
    'tt-m1': true,
    'stotra-m1': true,
    'sv-m1': true,
    'slc-m1': true,
    'ttc-m1': true
  });

  const currentCourse = courses.find(c => c.id === selectedCourseId) || 
                        courses.find(c => c.id?.toLowerCase() === selectedCourseId?.toLowerCase()) ||
                        courses.find(c => c.category?.toLowerCase() === selectedCourseId?.toLowerCase()) || 
                        courses[0];

  const course = {
    id: currentCourse?.id || 'stotra-pathan',
    titleEn: currentCourse?.titleEn || 'Stotra Pathan',
    titleMr: currentCourse?.titleMr || 'स्तोत्र पठण',
    category: currentCourse?.category || 'paurohitya',
    categoryLabelEn: currentCourse?.categoryLabelEn || currentCourse?.category || 'Paurohitya Track',
    categoryLabelMr: currentCourse?.categoryLabelMr || currentCourse?.category || 'पौरोहित्य अभ्यासक्रम',
    subtitleEn: currentCourse?.subtitleEn || currentCourse?.descriptionEn || '',
    subtitleMr: currentCourse?.subtitleMr || currentCourse?.descriptionMr || '',
    descriptionEn: currentCourse?.descriptionEn || '',
    descriptionMr: currentCourse?.descriptionMr || '',
    level: currentCourse?.level || 'Beginner',
    duration: currentCourse?.duration || '10 Weeks',
    totalLessons: currentCourse?.totalLessons || 12,
    totalHours: currentCourse?.totalHours || '20+ Hours',
    mode: currentCourse?.mode || 'Classroom (Thane)',
    fee: currentCourse?.fee || 'Free',
    isFreeOrSubsidized: currentCourse?.isFreeOrSubsidized ?? true,
    thumbnail: currentCourse?.thumbnail || '/Photos/Surawanee_Paurohitya-Ganesh-Pooja-e1660834393968-updraft-pre-smush-original.jpg',
    upcomingBatch: currentCourse?.upcomingBatch || 'Inquire at Thane Campus',
    prerequisites: Array.isArray(currentCourse?.prerequisites) ? currentCourse.prerequisites : ['Basic familiarity with Devanagari script'],
    learningOutcomes: Array.isArray(currentCourse?.learningOutcomes) ? currentCourse.learningOutcomes : ['Mastery of core Shlokas and correct pronunciation'],
    modules: Array.isArray(currentCourse?.modules) ? currentCourse.modules : [],
    certificateProvided: currentCourse?.certificateProvided ?? true,
    instructor: currentCourse?.instructor || {
      name: 'Surawanee Acharya Council',
      titleEn: 'Senior Faculty Council',
      titleMr: 'वरिष्ठ आचार्य परिषद',
      credentials: 'Surawanee Dnyanmandir Council',
      avatar: '/Photos/Surawanee_Paurohitya-Varg-1-updraft-pre-smush-original.jpg'
    }
  };

  const toggleModule = (id: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Header Banner & Breadcrumb */}
      <section className="bg-gradient-to-b from-[#FFF8F1] via-[#FAF7F2] to-[#FAF7F2] border-b border-[#E3D9C4] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <button
            onClick={() => setCurrentPage('courses')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#883008] hover:text-[#651728] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{lang === 'mr' ? 'सर्व अभ्यासक्रम यादीकडे परत' : 'Back to All Courses'}</span>
          </button>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-[#FAF0F2] text-[#822237] font-bold uppercase tracking-wider">
                {lang === 'mr' ? (course.categoryLabelMr || course.category) : (course.categoryLabelEn || course.category)}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#FFF8F1] border border-[#C85413]/30 text-[#C85413] font-semibold">
                {course.level}
              </span>
              {course.isFreeOrSubsidized && (
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                  Subsidized Grant Available
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#651728] leading-tight">
              {lang === 'mr' ? (course.titleMr || course.titleEn) : (course.titleEn || course.titleMr)}
            </h1>

            <p className="text-sm sm:text-base text-[#5C5348] max-w-3xl leading-relaxed">
              {lang === 'mr' ? (course.subtitleMr || course.descriptionMr) : (course.subtitleEn || course.descriptionEn)}
            </p>
          </div>

          {/* Key Meta Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E3D9C4] text-xs">
            <div className="p-3 rounded-xl bg-[#FCFAF7] border border-[#E3D9C4]">
              <span className="text-[#736B61] block">{lang === 'mr' ? 'कालावधी' : 'Duration'}</span>
              <span className="font-bold text-[#221D18] text-sm">{course.duration}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FCFAF7] border border-[#E3D9C4]">
              <span className="text-[#736B61] block">{lang === 'mr' ? 'तासिका' : 'Total Hours'}</span>
              <span className="font-bold text-[#221D18] text-sm">{course.totalHours}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FCFAF7] border border-[#E3D9C4]">
              <span className="text-[#736B61] block">{lang === 'mr' ? 'माध्यम' : 'Learning Mode'}</span>
              <span className="font-bold text-[#221D18] text-sm">{course.mode}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FCFAF7] border border-[#E3D9C4]">
              <span className="text-[#736B61] block">{lang === 'mr' ? 'प्रमाणपत्र' : 'Certification'}</span>
              <span className="font-bold text-[#C85413] text-sm">
                {course.certificateProvided !== false ? 'Accredited Trust Diploma' : 'Certificate'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content & Sticky Sidebar Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Tabs Content (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tabs bar */}
            <div className="flex border-b border-[#E3D9C4] gap-2 overflow-x-auto pb-1">
              {[
                { id: 'overview', labelEn: 'Overview & Outcomes', labelMr: 'अभ्यासक्रम परिचय' },
                { id: 'curriculum', labelEn: `Curriculum (${course.modules.length} Modules)`, labelMr: `अभ्यासक्रम सूची (${course.modules.length} विभाग)` },
                { id: 'instructor', labelEn: 'Acharya & Faculty', labelMr: 'मार्गदर्शक आचार्य' },
                { id: 'faq', labelEn: 'Admission FAQs', labelMr: 'प्रवेश प्रश्नोत्तरे' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'text-[#C85413] border-b-2 border-[#C85413] bg-[#FCFAF7]'
                      : 'text-[#5C5348] hover:text-[#221D18]'
                  }`}
                >
                  {lang === 'mr' ? tab.labelMr : tab.labelEn}
                </button>
              ))}
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in duration-150">
                <div className="p-6 rounded-2xl bg-[#FCFAF7] border border-[#E3D9C4] space-y-4">
                  <h3 className="text-lg font-serif font-bold text-[#221D18]">
                    {lang === 'mr' ? 'अभ्यासक्रमाचा मुख्य उद्देश' : 'Program Description & Objectives'}
                  </h3>
                  <p className="text-sm text-[#4A433B] leading-relaxed">
                    {lang === 'mr' ? course.descriptionMr : course.descriptionEn}
                  </p>
                </div>

                {/* Learning outcomes */}
                <div className="p-6 rounded-2xl bg-[#FCFAF7] border border-[#E3D9C4] space-y-4">
                  <h3 className="text-base font-serif font-bold text-[#651728] flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#C85413]" />
                    <span>{lang === 'mr' ? 'प्रमुख अध्ययन निष्पत्ती' : 'Key Learning Outcomes'}</span>
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#4A433B]">
                    {course.learningOutcomes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-[#F7F3EB] border border-[#EFE8DA]">
                        <span className="text-[#C85413] font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prerequisites */}
                <div className="p-5 rounded-xl bg-[#FFF8F1] border border-[#C85413]/30 text-xs text-[#5C5348] space-y-2">
                  <h4 className="font-bold text-[#883008] uppercase tracking-wider">
                    {lang === 'mr' ? 'प्रवेशासाठी पात्रता व पूर्वअटी' : 'Prerequisites & Eligibility'}
                  </h4>
                  <ul className="list-disc list-inside space-y-1">
                    {course.prerequisites.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 2: CURRICULUM ACCORDION */}
            {activeTab === 'curriculum' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="text-base font-serif font-bold text-[#221D18]">
                    {lang === 'mr' ? 'सविस्तर पाठ व प्रात्यक्षिक घटक' : 'Detailed Syllabus Modules'}
                  </h3>
                  <span className="text-xs text-[#736B61]">
                    {course.totalLessons} Lessons • {course.totalHours}
                  </span>
                </div>

                {course.modules.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-[#FCFAF7] border border-[#E3D9C4] text-center space-y-2">
                    <BookOpen className="w-8 h-8 text-[#C85413] mx-auto opacity-50" />
                    <h4 className="text-base font-serif font-bold text-[#221D18]">
                      {lang === 'mr' ? 'अभ्यासक्रम सविस्तर पत्रक उपलब्ध' : 'Syllabus Modules & Course Schedule'}
                    </h4>
                    <p className="text-xs text-[#5C5348] max-w-md mx-auto">
                      {lang === 'mr' 
                        ? 'या अभ्यासक्रमाच्या सविस्तर प्रकरणांचे पत्रक पद्म निवास, ठाणे येथे किंवा ऑनलाइन अर्ज करताना उपलब्ध आहे.' 
                        : 'Detailed lesson-by-lesson modules and lecture guides are provided upon admission at our Thane campus.'}
                    </p>
                  </div>
                ) : (
                  course.modules.map(module => {
                    const isOpen = !!expandedModules[module.id];
                    return (
                      <div
                        key={module.id}
                        className="rounded-2xl bg-[#FCFAF7] border border-[#E3D9C4] overflow-hidden shadow-xs"
                      >
                        <button
                          onClick={() => toggleModule(module.id)}
                          className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#F7F3EB] transition-colors cursor-pointer"
                        >
                          <div className="space-y-1">
                            <span className="text-[11px] font-mono font-bold text-[#C85413]">
                              {module.duration}
                            </span>
                            <h4 className="text-base font-serif font-bold text-[#221D18]">
                              {lang === 'mr' ? module.titleMr : module.titleEn}
                            </h4>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-[#883008] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isOpen && (
                          <div className="p-5 pt-0 border-t border-[#EFE8DA] space-y-4 bg-white/60">
                            <p className="text-xs sm:text-sm text-[#5C5348] mt-3">
                              {module.description}
                            </p>

                            {module.topics && module.topics.length > 0 && (
                              <div className="space-y-2">
                                <h5 className="text-xs font-bold uppercase tracking-wider text-[#651728]">
                                  {lang === 'mr' ? 'अभ्यास घटक:' : 'Topics Covered:'}
                                </h5>
                                <ul className="space-y-1.5 text-xs text-[#4A433B]">
                                  {module.topics.map((t, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <span className="text-[#C85413]">•</span>
                                      <span>{t}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {module.hasAudioSample && (
                              <div className="pt-3 border-t border-[#EFE8DA] flex items-center justify-between bg-[#FFF8F1] p-3 rounded-xl border border-[#C85413]/20">
                                <div className="flex items-center gap-2 text-xs font-semibold text-[#883008]">
                                  <Volume2 className="w-4 h-4 text-[#C85413]" />
                                  <span>{module.audioSampleTitle || 'Vedic Chant Audio Sample'}</span>
                                </div>
                                <button
                                  onClick={() => audioItems[0] && onPlayAudio(audioItems[0])}
                                  className="px-3 py-1 bg-[#C85413] text-white text-xs font-semibold rounded-lg shadow-xs hover:bg-[#A83E0A] cursor-pointer"
                                >
                                  {lang === 'mr' ? 'ध्वनीमुद्रिका ऐका' : 'Play Chanting Sample'}
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* TAB 3: INSTRUCTOR */}
            {activeTab === 'instructor' && (
              <div className="p-6 rounded-2xl bg-[#FCFAF7] border border-[#E3D9C4] space-y-6 animate-in fade-in duration-150">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-[#D49622] shadow-md shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-center sm:text-left space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C85413]">
                      Lead Acharya & Faculty
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#221D18]">
                      {course.instructor.name}
                    </h3>
                    <p className="text-xs text-[#883008] font-semibold">
                      {lang === 'mr' ? course.instructor.titleMr : course.instructor.titleEn}
                    </p>
                    <p className="text-xs text-[#5C5348] font-mono">
                      {course.instructor.credentials}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F7F3EB] border border-[#E3D9C4] text-xs text-[#5C5348] leading-relaxed">
                  {lang === 'mr'
                    ? 'सुरवाणी ज्ञानमंदिरमधील सर्व प्राध्यापक व आचार्य हे पारंपरिक वैदिक गुरुपरंपरेतील विद्वान असून त्यांनी शेकडो विद्यार्थ्यांना संस्कृत व पौरोहित्याचे शुद्ध शिक्षण दिले आहे.'
                    : 'Our esteemed Acharyas combine traditional Ghanapaathi lineage with contemporary didactic methods to ensure each student receives patient, personal guidance.'}
                </div>
              </div>
            )}

            {/* TAB 4: FAQS */}
            {activeTab === 'faq' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                {[
                  {
                    qEn: 'Are prior Sanskrit skills required for this course?',
                    qMr: 'या वर्गासाठी संस्कृतचे पूर्वज्ञान आवश्यक आहे का?',
                    aEn: 'No prior advanced Sanskrit is required for Beginner and Sambhashan courses; only the ability to recognize Devanagari letters. For the Paurohitya Diploma, foundational interest and regular attendance are essential.',
                    aMr: 'नाही, प्राथमिक वर्गांसाठी केवळ देवनागरी लिपी ओळखता येणे पुरेसे आहे. पौरोहित्य वर्गासाठी नियमित उपस्थिती आणि अभ्यासाची तयारी आवश्यक आहे.'
                  },
                  {
                    qEn: 'Will I receive a recognized certificate upon completion?',
                    qMr: 'अभ्यासक्रम पूर्ण केल्यावर अधिकृत प्रमाणपत्र मिळेल का?',
                    aEn: 'Yes. Surawanee Dnyanmandir is a recognized Sanskrit trust established in 1958. Graduates receive an accredited Diploma and certification signed by our Academic Council.',
                    aMr: 'होय, सुरवाणी ज्ञानमंदिर संस्थेच्या वतीने अधिकृत पदविका व प्रमाणपत्र मान्यवर विद्वानांच्या स्वाक्षरीने प्रदान केले जाते.'
                  },
                  {
                    qEn: 'Can working professionals attend weekend batches?',
                    qMr: 'नोकरदार व्यक्तींसाठी शनिवार-रविवार विशेष बॅचेस आहेत का?',
                    aEn: 'Yes! We have dedicated Saturday-Sunday morning and evening cohorts tailored specifically for professionals and college students.',
                    aMr: 'होय, नोकरदार व विद्यार्थ्यांसाठी शनिवार-रविवार विशेष सकाळ व संध्याकाळच्या बॅचेस उपलब्ध आहेत.'
                  }
                ].map((faq, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-[#FCFAF7] border border-[#E3D9C4] space-y-2">
                    <h4 className="text-sm font-serif font-bold text-[#651728]">
                      {lang === 'mr' ? faq.qMr : faq.qEn}
                    </h4>
                    <p className="text-xs text-[#5C5348] leading-relaxed">
                      {lang === 'mr' ? faq.aMr : faq.aEn}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sticky Enrollment Sidebar Box (4 cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <div className="p-6 rounded-3xl bg-[#FCFAF7] border-2 border-[#D49622]/60 shadow-xl space-y-5">
              <div className="border-b border-[#E3D9C4] pb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#883008]">
                  {lang === 'mr' ? 'प्रवेश शुल्क व अनुदान' : 'Tuition & Subsidized Fees'}
                </span>
                <div className="text-2xl font-serif font-bold text-[#651728] mt-0.5">
                  {course.fee}
                </div>
                {course.isFreeOrSubsidized && (
                  <p className="text-[11px] text-emerald-700 font-medium mt-1">
                    * Need-based scholarships available through Trust Endowment
                  </p>
                )}
              </div>

              {/* Batch timeline details */}
              <div className="space-y-3 text-xs text-[#5C5348]">
                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-[#C85413] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#221D18] block">{lang === 'mr' ? 'आगामी बॅच:' : 'Next Batch:'}</span>
                    <span>{course.upcomingBatch}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C85413] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#221D18] block">{lang === 'mr' ? 'स्थान / परिसर:' : 'Campus:'}</span>
                    <span>Surawanee Bhavan, Naupada, Thane (West)</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => openEnrollModal(lang === 'mr' ? course.titleMr : course.titleEn)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#C85413] to-[#A83E0A] hover:from-[#A83E0A] hover:to-[#883008] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>{lang === 'mr' ? 'प्रवेश अर्ज नोंदवा' : 'Apply for Admission'}</span>
                </button>

                <button
                  onClick={() => alert('Official Course Prospectus & Syllabus PDF downloading...')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FAF0F2] hover:bg-[#FEEEDD] text-[#883008] border border-[#C85413]/30 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === 'mr' ? 'अभ्यासक्रम PDF डाउनलोड' : 'Download Syllabus PDF'}</span>
                </button>
              </div>

              {/* Phone help */}
              <div className="pt-3 border-t border-[#E3D9C4] text-center">
                <div className="text-[11px] text-[#736B61]">
                  {lang === 'mr' ? 'थेट प्रवेश सहाय्य कक्षाशी बोला:' : 'Direct Admissions Counseling:'}
                </div>
                <a
                  href={`tel:${TRUST_INFO.phoneRaw}`}
                  className="text-xs font-bold text-[#651728] hover:text-[#C85413] inline-flex items-center gap-1 mt-1"
                >
                  <Phone className="w-3 h-3 text-[#C85413]" />
                  <span>{TRUST_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
