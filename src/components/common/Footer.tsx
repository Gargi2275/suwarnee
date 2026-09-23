import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ArrowRight, Rss } from 'lucide-react';
import { TrustLogo } from './TrustLogo';
import { TRUST_INFO, COURSES, MOTTO_SHLOKA, PRIMARY_PHONE, PRIMARY_EMAIL, CONTACT_PERSON } from '../../data/mockData';
import { useAppLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';

export const Footer: React.FC = () => {
  const { lang, setCurrentPage, openCourseDetail, openEnrollModal } = useAppLanguage();
  const currentYear = new Date().getFullYear();

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
  };

  return (
    <footer className="bg-[#221D18] text-[#EFE8DA] border-t-4 border-[#C85413] pt-14 pb-10 relative overflow-hidden">
      {/* Background subtle watermark */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none select-none text-[280px] font-serif text-[#F8EFD3]">
        ॐ
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">

        {/* Top Shloka Ribbon */}
        <div className="text-center max-w-3xl mx-auto mb-12 pb-8 border-b border-[#3D352C]">
          <div className="text-[#D49622] font-serif text-xs sm:text-sm tracking-widest uppercase mb-1.5 font-bold">
            ॥ संस्थेचे ध्येयवाक्य ॥
          </div>
          <div className="font-serif text-sm sm:text-base md:text-lg text-[#F8EFD3] leading-relaxed">
            <span className="block sm:inline">संस्कृताध्ययनेनैव संस्कृतेः प्रसरो भवेत्&nbsp;। </span>
            <span className="block sm:inline">तस्मात्संस्कृतभाषायाः प्रसारो ध्येयमस्तु&nbsp;नः&nbsp;॥</span>
          </div>
          <p className="text-xs text-[#D1C3A7] mt-2 italic font-sans max-w-xl mx-auto">
            {lang === 'mr'
              ? 'संस्कृताच्या अध्ययनानेच संस्कृतीचा प्रसार होईल. म्हणूनच संस्कृत भाषेचा प्रसार हेच आमचे ध्येय असावे.'
              : 'Only through the study of Sanskrit can culture spread. Therefore, the propagation of the Sanskrit language shall be our supreme goal.'}
          </p>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-12">

          {/* Col 1: Trust Info & Registration (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <TrustLogo variant="round" height={48} className="bg-white/10 p-1 rounded-full shrink-0" />
              <div>
                <h4 className="font-serif text-base font-bold text-white tracking-wide">
                  SURAWANEE DNYANMANDIR
                </h4>
                <p className="text-[11px] text-[#D49622] uppercase tracking-wider font-medium">
                  {lang === 'mr' ? 'संस्कृत पाठशाळा (स्था. १९५८)' : 'Sanskrit School (Est. 1958)'}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#D1C3A7] leading-relaxed">
              {lang === 'mr'
                ? 'संस्कृत भाषा प्रसरिणी सभा, ठाणे संलग्नित शासनमान्य संस्कृत पाठशाळा. मागील ६ दशकांपासून शालेय विद्यार्थ्यांपासून ते ज्येष्ठ नागरिकांपर्यंत अविरत संस्कृत शिक्षण.'
                : 'A Sanskrut School (Pathashala) affiliated to The Sanskrut Language Broadcasting Assembly, Thane (संस्कृत भाषा प्रसरिणी सभा, ठाणे). A government recognized Sanskrut Pathashala operating for over 6 decades in Thane.'}
            </p>

            <div className="p-3 rounded-lg bg-[#2E2721] border border-[#4A4035] text-[11px] space-y-1.5 text-[#E3D9C4]">
              <div className="flex items-start gap-1.5 text-[#F8EFD3] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D49622] shrink-0 mt-0.5" />
                <span>{TRUST_INFO.regNo}</span>
              </div>
              <div className="text-[10px] text-[#D1C3A7] leading-tight">
                {TRUST_INFO.regOrder}
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#D49622] border-b border-[#3D352C] pb-2">
              {lang === 'mr' ? 'नेव्हिगेशन' : 'Navigation'}
            </h5>
            <ul className="space-y-2 text-xs text-[#D1C3A7]">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-[#F8EFD3] transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-[#C85413]" />
                  <span>{lang === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#F8EFD3] transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-[#C85413]" />
                  <span>{lang === 'mr' ? 'संस्थेविषयी' : 'About us'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('courses')} className="hover:text-[#F8EFD3] transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-[#C85413]" />
                  <span>{lang === 'mr' ? 'अभ्यासक्रम' : 'Courses'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('knowledge-share')} className="hover:text-[#F8EFD3] transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-[#C85413]" />
                  <span>{lang === 'mr' ? 'ज्ञानकोश' : 'Knowledge Share'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('events')} className="hover:text-[#F8EFD3] transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-[#C85413]" />
                  <span>{lang === 'mr' ? 'कार्यक्रम' : 'Events'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('gallery')} className="hover:text-[#F8EFD3] transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-[#C85413]" />
                  <span>{lang === 'mr' ? 'दालन' : 'Gallery'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#F8EFD3] transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-[#C85413]" />
                  <span>{lang === 'mr' ? 'संपर्क' : 'Contact us'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Tracks & Courses (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#D49622] border-b border-[#3D352C] pb-2">
              {lang === 'mr' ? 'अभ्यासक्रम विभाग' : 'Course Tracks'}
            </h5>
            <div className="space-y-3 text-xs text-[#D1C3A7]">
              <div>
                <div className="text-[#F8EFD3] font-semibold text-[11px] uppercase tracking-wide mb-1">
                  • Paurohitya
                </div>
                <div className="pl-2 space-y-1 text-[11px]">
                  <div onClick={() => openCourseDetail('prashikshan-varg-pratham-star')} className="cursor-pointer hover:text-white transition-colors">
                    Prashikshan Varg (Pratham Star)
                  </div>
                  <div onClick={() => openCourseDetail('stotra-pathan')} className="cursor-pointer hover:text-white transition-colors">
                    Stotra Pathan
                  </div>
                  <div onClick={() => openCourseDetail('pooja-vidhi')} className="cursor-pointer hover:text-white transition-colors">
                    Pooja Vidhi
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[#F8EFD3] font-semibold text-[11px] uppercase tracking-wide mb-1">
                  • Other Courses
                </div>
                <div className="pl-2 space-y-1 text-[11px]">
                  <div onClick={() => openCourseDetail('sanskar-varg')} className="cursor-pointer hover:text-white transition-colors">
                    Sanskar Varg (Age 5-10)
                  </div>
                  <div onClick={() => openCourseDetail('sanskrut-language-classes')} className="cursor-pointer hover:text-white transition-colors">
                    Sanskrut Language Classes
                  </div>
                  <div onClick={() => openCourseDetail('teachers-training-courses')} className="cursor-pointer hover:text-white transition-colors">
                    Teachers Training Courses
                  </div>
                </div>
              </div>

              <button
                onClick={() => openEnrollModal()}
                className="inline-flex items-center gap-1 text-xs text-[#D49622] hover:text-[#F8EFD3] font-semibold pt-1"
              >
                <span>{lang === 'mr' ? 'प्रवेश नोंदणी करा →' : 'Inquire & Enroll Online →'}</span>
              </button>
            </div>
          </div>

          {/* Col 4: Verified Contact Info (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#D49622] border-b border-[#3D352C] pb-2">
              {lang === 'mr' ? 'कार्यालय व संपर्क' : 'Contact & Campus'}
            </h5>
            <div className="space-y-2.5 text-xs text-[#D1C3A7]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C85413] shrink-0 mt-0.5" />
                <span className="leading-tight">{TRUST_INFO.addressEn}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C85413] shrink-0" />
                <a href={`tel:${PRIMARY_PHONE.replace(/\s+/g, '')}`} className="hover:text-white font-mono">
                  {PRIMARY_PHONE}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C85413] shrink-0" />
                <a href={`mailto:${PRIMARY_EMAIL}`} className="hover:text-white underline">
                  {PRIMARY_EMAIL}
                </a>
              </div>

              <div className="text-[11px] text-[#A89F91] pt-1">
                <span className="text-[#D49622] font-medium">Contact Person:</span> {CONTACT_PERSON}
              </div>

              {/* Social Media & RSS Links */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-[#2E2721] hover:bg-[#C85413] text-[#D1C3A7] hover:text-white flex items-center justify-center text-xs transition-colors"
                  title="Facebook"
                >
                  f
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-[#2E2721] hover:bg-[#C85413] text-[#D1C3A7] hover:text-white flex items-center justify-center text-xs transition-colors"
                  title="X (Twitter)"
                >
                  𝕏
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-[#2E2721] hover:bg-[#C85413] text-[#D1C3A7] hover:text-white flex items-center justify-center text-xs transition-colors"
                  title="Instagram"
                >
                  ig
                </a>
                <a
                  href="/feed/"
                  className="w-7 h-7 rounded-full bg-[#2E2721] hover:bg-[#D49622] text-[#D1C3A7] hover:text-white flex items-center justify-center text-xs transition-colors"
                  title="RSS Feed (/feed/)"
                >
                  <Rss className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Centered Copyright Bar */}
        <div className="pt-6 mt-6 border-t border-[#3D352C] text-center">
          <p className="font-sans text-xs tracking-wider text-[#D1C3A7] uppercase font-medium">
            © SURWANEE | ALL RIGHTS RESERVED | DEVELOPED BY{' '}
            <a
              href="https://www.technoadviser.com/"
              target="_blank"
              rel="noreferrer"
              className="text-[#D49622] hover:text-[#F8EFD3] underline font-semibold transition-colors"
            >
              TECHNOADVISER
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};
