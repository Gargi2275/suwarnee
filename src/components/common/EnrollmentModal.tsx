import React, { useState } from 'react';
import { X, CheckCircle, Send, Download, Phone, Calendar, User, Mail, MapPin } from 'lucide-react';
import { useAppLanguage } from '../../context/LanguageContext';
import { useAppData } from '../../context/DataContext';
import { TRUST_INFO } from '../../data/mockData';

interface EnrollmentModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  preselectedCourse?: string;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  preselectedCourse
}) => {
  const { lang, isEnrollModalOpen, setIsEnrollModalOpen, enrollCourseTitle } = useAppLanguage();
  const { courses, submitEnrollment } = useAppData();
  
  const effectiveIsOpen = isOpen !== undefined ? isOpen : isEnrollModalOpen;
  const effectiveCourseTitle = preselectedCourse !== undefined ? preselectedCourse : enrollCourseTitle;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(effectiveCourseTitle || (courses[0]?.titleEn || 'Paurohitya'));
  const [batchPreference, setBatchPreference] = useState('Weekend Morning (Thane Campus)');
  const [priorKnowledge, setPriorKnowledge] = useState('Beginner (Can read Devanagari)');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!effectiveIsOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setIsSubmitting(true);
    try {
      await submitEnrollment({
        studentName: fullName,
        email,
        phone,
        courseName: selectedCourse,
        courseId: selectedCourse.toLowerCase().replace(/\s+/g, '-'),
        batchPreference,
        priorKnowledge
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    if (onClose) {
      onClose();
    } else {
      setIsEnrollModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#FCFAF7] border-2 border-[#D49622]/40 rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header banner */}
        <div className="bg-gradient-to-r from-[#651728] via-[#883008] to-[#651728] text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#F8EFD3]/80 font-medium">
              {lang === 'mr' ? 'प्रवेश व चौकशी अर्ज २०२६' : 'Admissions & Course Enrollment 2026'}
            </span>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-wide">
              {lang === 'mr' ? 'सुरवाणी ज्ञानमंदिर प्रवेश नोंदणी' : 'Apply for Sanskrit Course Admission'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-serif font-bold text-[#651728]">
                {lang === 'mr' ? 'प्रवेश अर्ज यशस्वीरीत्या नोंदवला गेला!' : 'Application Submitted Successfully!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#5C5348] max-w-md mx-auto leading-relaxed">
                {lang === 'mr'
                  ? `धन्यवाद ${fullName}. सुरवाणी ज्ञानमंदिर संस्थेचे पदाधिकारी पुढील २४ तासांत आपल्या भ्रमणध्वनी क्रमांकावर (${phone}) संपर्क साधतील.`
                  : `Thank you ${fullName}. The admission committee at Surawanee Dnyanmandir will contact you at ${phone} to confirm your batch allocation.`}
              </p>

              <div className="pt-4 border-t border-[#EFE8DA] flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl bg-[#651728] text-white font-semibold text-xs sm:text-sm shadow-sm"
                >
                  {lang === 'mr' ? 'बंद करा' : 'Done'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Student Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#5C5348] mb-1">
                    {lang === 'mr' ? 'विद्यार्थ्याचे पूर्ण नाव *' : 'Full Name of Candidate *'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder={lang === 'mr' ? 'उदा. अमित जोशी' : 'e.g. Rahul Sharma'}
                      className="w-full px-3.5 py-2.5 pl-9 rounded-xl border border-[#E3D9C4] bg-white text-xs sm:text-sm text-[#221D18] focus:outline-none focus:ring-2 focus:ring-[#C85413]"
                    />
                    <User className="w-4 h-4 text-[#8A7E70] absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Mobile Phone */}
                <div>
                  <label className="block text-xs font-semibold text-[#5C5348] mb-1">
                    {lang === 'mr' ? 'भ्रमणध्वनी (WhatsApp) *' : 'Phone / WhatsApp *'}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98200 00000"
                      className="w-full px-3.5 py-2.5 pl-9 rounded-xl border border-[#E3D9C4] bg-white text-xs sm:text-sm text-[#221D18] focus:outline-none focus:ring-2 focus:ring-[#C85413]"
                    />
                    <Phone className="w-4 h-4 text-[#8A7E70] absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

              </div>

              {/* Email & Desired Course */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-semibold text-[#5C5348] mb-1">
                    {lang === 'mr' ? 'ईमेल पत्ता' : 'Email Address'}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="student@gmail.com"
                      className="w-full px-3.5 py-2.5 pl-9 rounded-xl border border-[#E3D9C4] bg-white text-xs sm:text-sm text-[#221D18] focus:outline-none focus:ring-2 focus:ring-[#C85413]"
                    />
                    <Mail className="w-4 h-4 text-[#8A7E70] absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5C5348] mb-1">
                    {lang === 'mr' ? 'निवडलेला अभ्यासक्रम' : 'Select Course Track'}
                  </label>
                  <select
                    value={selectedCourse}
                    onChange={e => setSelectedCourse(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3D9C4] bg-white text-xs sm:text-sm text-[#221D18] focus:outline-none focus:ring-2 focus:ring-[#C85413]"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.titleEn}>
                        {lang === 'mr' ? c.titleMr : c.titleEn}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Batch Preference & Prior Knowledge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-semibold text-[#5C5348] mb-1">
                    {lang === 'mr' ? 'बॅच प्राधान्य' : 'Preferred Batch / Timing'}
                  </label>
                  <select
                    value={batchPreference}
                    onChange={e => setBatchPreference(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3D9C4] bg-white text-xs sm:text-sm text-[#221D18] focus:outline-none focus:ring-2 focus:ring-[#C85413]"
                  >
                    <option value="Weekend Morning (Thane Campus)">Weekend Morning (Thane Campus)</option>
                    <option value="Sunday Afternoon (Bal Sanskar)">Sunday Afternoon (Bal Sanskar)</option>
                    <option value="Weekday Evening Online">Weekday Evening Online</option>
                    <option value="Flexible Hybrid">Flexible Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5C5348] mb-1">
                    {lang === 'mr' ? 'संस्कृत पूर्वज्ञान' : 'Prior Sanskrit Background'}
                  </label>
                  <select
                    value={priorKnowledge}
                    onChange={e => setPriorKnowledge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3D9C4] bg-white text-xs sm:text-sm text-[#221D18] focus:outline-none focus:ring-2 focus:ring-[#C85413]"
                  >
                    <option value="Absolute Beginner (Knows Devanagari)">Absolute Beginner (Knows Devanagari)</option>
                    <option value="School level Sanskrit (Std 8-10)">School level Sanskrit (Std 8-10)</option>
                    <option value="Practicing Priest / Purohit">Practicing Priest / Purohit</option>
                    <option value="Advanced Shastra Enthusiast">Advanced Shastra Enthusiast</option>
                  </select>
                </div>

              </div>

              {/* Trust Submission Terms */}
              <div className="p-3 rounded-xl bg-[#FAF0F2] border border-[#651728]/15 text-[11px] text-[#5C5348] flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#651728] shrink-0 mt-0.5" />
                <span>
                  {lang === 'mr'
                    ? 'वर्ग ठाणे येथील पद्मा निवास केंद्रात अथवा हायब्रिड माध्यमातून चालवले जातात. अधिक माहितीसाठी कार्यालयीन वेळेत भेट देऊ शकता.'
                    : 'Classes are conducted at Padma Niwas, Naupada, Thane. No registration fee required for submitting this inquiry form.'}
                </span>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 rounded-xl border border-[#E3D9C4] text-[#5C5348] hover:bg-[#FAF7F2] text-xs sm:text-sm font-semibold transition-colors"
                >
                  {lang === 'mr' ? 'रद्द करा' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#C85413] hover:bg-[#A3430C] text-white text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : (lang === 'mr' ? 'प्रवेश अर्ज पाठवा' : 'Submit Admission Inquiry')}</span>
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
