import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  User, 
  Award, 
  Filter, 
  Sparkles, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAppLanguage } from '../context/LanguageContext';
import { useAppData } from '../context/DataContext';
import { TraditionalDivider } from '../components/common/Motifs';

export const CoursesPage: React.FC = () => {
  const { lang, openCourseDetail, openEnrollModal } = useAppLanguage();
  const { courses, categories: appCategories } = useAppData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', labelEn: 'All Courses', labelMr: 'सर्व अभ्यासक्रम' },
    ...appCategories
      .filter(c => c.type === 'course' || c.type === 'both')
      .map(c => ({ id: c.id, labelEn: c.titleEn, labelMr: c.titleMr }))
  ];

  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Diploma'];

  const filteredCourses = courses.filter(course => {
    const matchCategory = selectedCategory === 'all' || course.category?.toLowerCase() === selectedCategory?.toLowerCase();
    const matchLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchSearch =
      !searchQuery.trim() ||
      course.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.titleMr.includes(searchQuery) ||
      course.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchLevel && matchSearch;
  });

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
            {lang === 'mr' ? '॥ विद्या ददाति विनयं ॥' : '॥ SANSKRIT EDUCATIONAL PROGRAMS ॥'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#651728]">
            {lang === 'mr' ? 'संस्कृत अभ्यासक्रम व पदविका' : 'Courses, Diplomas & Varg'}
          </h1>
          <p className="text-sm sm:text-base text-[#5C5348] max-w-2xl mx-auto leading-relaxed">
            {lang === 'mr'
              ? 'बालसंस्कारांपासून ते अधिकृत पौरोहित्य पदविकेपर्यंत — अनुभवनिष्ठ आचार्य, शुद्ध स्वरोच्चार आणि आधुनिक अध्यापन पद्धतीसह.'
              : 'From foundational youth Sanskar Varg to rigorous 1-year Paurohitya priesthood diplomas, choose a course tailored to your spiritual and academic goals.'}
          </p>
        </motion.div>
      </section>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#FCFAF7] border border-[#E3D9C4] rounded-2xl p-4 sm:p-6 shadow-sm space-y-4"
        >
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder={lang === 'mr' ? 'अभ्यासक्रम शोधा...' : 'Search courses by name or topic...'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E3D9C4] bg-white text-xs sm:text-sm text-[#221D18] focus:outline-none focus:ring-2 focus:ring-[#C85413]"
              />
              <Search className="w-4 h-4 text-[#8A7E70] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-[#EFE8DA] pt-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#C85413] text-white shadow-sm scale-105'
                    : 'text-[#5C5348] hover:text-[#221D18] hover:bg-[#FAF7F2]'
                }`}
              >
                {lang === 'mr' ? cat.labelMr : cat.labelEn}
              </button>
            ))}
          </div>

        </motion.div>
      </div>

      {/* Courses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-[#FCFAF7] rounded-3xl border border-[#E3D9C4] p-8">
            <BookOpen className="w-12 h-12 text-[#8A7E70] mx-auto mb-3 opacity-40" />
            <h3 className="text-lg font-serif font-bold text-[#221D18]">
              {lang === 'mr' ? 'कोणतेही अभ्यासक्रम सापडले नाहीत' : 'No courses match your filter'}
            </h3>
            <p className="text-xs text-[#5C5348] mt-1">
              {lang === 'mr' ? 'कृपया वेगळे शोध शब्द वापरा.' : 'Try changing your search term or category filters.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -8, scale: 1.02, rotateX: 2 }}
                className="bg-[#FCFAF7] rounded-2xl border-2 border-[#E3D9C4] overflow-hidden shadow-md hover:shadow-2xl hover:border-[#C85413] transition-all duration-300 flex flex-col justify-between group"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Course Thumbnail */}
                <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                  <img
                    src={course.thumbnail}
                    alt={course.titleEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#651728] text-white shadow-xs">
                      {lang === 'mr' ? course.categoryLabelMr : course.categoryLabelEn}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#FAF7F2] text-[#221D18] border border-[#E3D9C4] shadow-xs">
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/75 text-white text-[11px] font-mono">
                    {course.duration}
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#8A7E70]">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#C85413]" />
                        {course.totalHours} ({course.totalLessons} Lessons)
                      </span>
                      <span className="font-semibold text-[#883008]">{course.mode}</span>
                    </div>

                    <h3 
                      onClick={() => openCourseDetail(course.id)}
                      className="text-lg font-serif font-bold text-[#221D18] group-hover:text-[#C85413] transition-colors cursor-pointer leading-snug"
                    >
                      {lang === 'mr' ? course.titleMr : course.titleEn}
                    </h3>
                    
                    <p className="text-xs text-[#5C5348] line-clamp-3 leading-relaxed">
                      {lang === 'mr' ? course.descriptionMr : course.descriptionEn}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="pt-3 border-t border-[#EFE8DA] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          className="w-6 h-6 rounded-full object-cover border border-[#E3D9C4]"
                        />
                        <span className="text-[11px] font-semibold text-[#221D18]">
                          {course.instructor.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#651728] font-mono">
                        {course.fee}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => openCourseDetail(course.id)}
                        className="flex-1 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE8DA] border border-[#E3D9C4] text-xs font-semibold text-[#221D18] transition-colors cursor-pointer"
                      >
                        {lang === 'mr' ? 'अभ्यासक्रम तपशील' : 'Syllabus Details'}
                      </button>
                      <button
                        onClick={() => openEnrollModal(lang === 'mr' ? course.titleMr : course.titleEn)}
                        className="flex-1 py-2 rounded-xl bg-[#C85413] hover:bg-[#A3430C] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                      >
                        {lang === 'mr' ? 'प्रवेश घ्या' : 'Enroll Now'}
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Certification Note */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4 text-center"
      >
        <div className="p-6 rounded-2xl bg-[#FFF8F1] border border-[#C85413]/20 flex flex-col sm:flex-row items-center gap-4 text-left shadow-md">
          <div className="w-12 h-12 rounded-xl bg-[#C85413]/10 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6 text-[#C85413]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#221D18] font-serif">
              {lang === 'mr' ? 'अधिकृत प्रमाणपत्र व दीक्षांत संचिका' : 'Recognized Certificates & Practical Convocation'}
            </h4>
            <p className="text-xs text-[#5C5348] mt-0.5 leading-relaxed">
              {lang === 'mr'
                ? 'अभ्यासक्रम यशस्वीरीत्या पूर्ण करणाऱ्या सर्व विद्यार्थ्यांना सुरवाणी ज्ञानमंदिर संस्थेचे अधिकृत प्रमाणपत्र प्रदान केले जाते.'
                : 'All successful candidates receive official trust certificates recognized by institutions, temples, and academic boards across Maharashtra.'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
