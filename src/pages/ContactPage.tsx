import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle, 
  ShieldCheck, 
  Heart, 
  Building, 
  Share2,
  Copy,
  ExternalLink,
  User
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAppLanguage } from '../context/LanguageContext';
import { useAppData } from '../context/DataContext';
import { TRUST_INFO, PRIMARY_PHONE, SECONDARY_PHONE, PRIMARY_EMAIL, CONTACT_PERSON } from '../data/mockData';

export const ContactPage: React.FC = () => {
  const { lang } = useAppLanguage();
  const { submitInquiry } = useAppData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedBankInfo, setCopiedBankInfo] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitting(true);
    try {
      await submitInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyBankDetails = () => {
    const text = `Trust Name: Surawanee Dyan Mandir\nBank: Saraswat Co-op Bank\nBranch: Naupada, Thane\nReg No: E-225 Thane\nContact: ${CONTACT_PERSON} (${PRIMARY_PHONE})`;
    navigator.clipboard.writeText(text);
    setCopiedBankInfo(true);
    setTimeout(() => setCopiedBankInfo(false), 3000);
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
            {lang === 'mr' ? '॥ संपर्क व मार्गदर्शन ॥' : '॥ THANE CAMPUS & REACH US ॥'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#651728]">
            {lang === 'mr' ? 'संपर्क व कार्यालयीन माहिती' : 'Contact & Campus Location'}
          </h1>
          <p className="text-sm sm:text-base text-[#5C5348] max-w-2xl mx-auto leading-relaxed">
            {lang === 'mr'
              ? 'प्रवेश चौकशी, पौरोहित्य विधी मार्गदर्शन, देणगी अथवा अभ्यासक्रमांसंदर्भात संस्थेच्या कार्यालयाशी संपर्क साधा.'
              : 'Visit our Thane campus at Padma Niwas, inquire about courses and Paurohitya rituals, or submit an admission query.'}
          </p>
        </motion.div>
      </section>

      {/* Main Grid: Form + Address Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Form (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#FCFAF7] border-2 border-[#E3D9C4] shadow-lg space-y-6"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C85413]">
                {lang === 'mr' ? 'ऑनलाइन चौकशी संदेश' : 'Direct Inquiry Form'}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#221D18] mt-1">
                {lang === 'mr' ? 'आम्हाला संदेश पाठवा' : 'Send a Message to the Trust Office'}
              </h3>
              <p className="text-xs text-[#5C5348] mt-1">
                {lang === 'mr'
                  ? 'आपला संदेश मिळाल्यानंतर आमचे प्रतिनिधी लवकरात लवकर संपर्क साधतील.'
                  : 'We love to assist you with your queries as soon as possible.'}
              </p>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-[#F0FAF2] border border-emerald-300 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-serif font-bold text-emerald-950">
                  {lang === 'mr' ? 'आपला संदेश यशस्वीरीत्या पाठवला गेला!' : 'Inquiry Submitted Successfully!'}
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                  {lang === 'mr'
                    ? `धन्यवाद ${formData.name}. सुरवाणी ज्ञानमंदिर कार्यालय लवकरच आपल्याशी ${formData.phone} वर संपर्क करेल.`
                    : `Thank you, ${formData.name}. Our office will get back to you shortly at ${formData.phone}.`}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="mt-2 text-xs text-emerald-700 underline font-semibold cursor-pointer"
                >
                  {lang === 'mr' ? 'दुसरा संदेश पाठवा' : 'Send Another Inquiry'}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#221D18] block">
                      {lang === 'mr' ? 'पूर्ण नाव *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Joshi"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D1C3A7] text-[#221D18] focus:ring-1 focus:ring-[#C85413] focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#221D18] block">
                      {lang === 'mr' ? 'मोबाईल क्रमांक *' : 'Mobile / WhatsApp Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 99672 XXXXX"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D1C3A7] text-[#221D18] focus:ring-1 focus:ring-[#C85413] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#221D18] block">
                      {lang === 'mr' ? 'ईमेल पत्ता' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D1C3A7] text-[#221D18] focus:ring-1 focus:ring-[#C85413] focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#221D18] block">
                      {lang === 'mr' ? 'विषय / विभाग' : 'Inquiry Subject'}
                    </label>
                    <select
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D1C3A7] text-[#221D18] focus:ring-1 focus:ring-[#C85413] focus:outline-hidden"
                    >
                      <option value="Admission">Course Admissions (प्रवेश)</option>
                      <option value="Paurohitya">Paurohitya Puja / Stotra Pathan</option>
                      <option value="Sanskar">Sanskar Varg (Age 5-10)</option>
                      <option value="Teachers">Teachers Training</option>
                      <option value="Sponsorship">Sponsorship &amp; Donation</option>
                      <option value="Other">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#221D18] block">
                    {lang === 'mr' ? 'आपला संदेश / प्रश्न *' : 'Your Message / Inquiry *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your questions or notes here..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D1C3A7] text-[#221D18] focus:ring-1 focus:ring-[#C85413] focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#651728] hover:bg-[#822237] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : (lang === 'mr' ? 'संदेश पाठवा' : 'Submit Inquiry')}</span>
                </button>
              </form>
            )}
          </motion.div>

          {/* Right: Address, Timings & Contact Person (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 rounded-3xl bg-[#FCFAF7] border-2 border-[#E3D9C4] shadow-lg space-y-5">
              <h4 className="font-serif font-bold text-lg text-[#651728] border-b border-[#E3D9C4] pb-3">
                {lang === 'mr' ? 'संस्थेचे मुख्य कार्यालय' : 'Thane Campus & Office'}
              </h4>

              <div className="space-y-3.5 text-xs text-[#5C5348]">
                {/* Exact Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C85413] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#221D18] block text-sm">
                      Surawanee Dyan Mandir
                    </span>
                    <p className="mt-0.5 leading-relaxed">
                      {TRUST_INFO.addressEn}
                    </p>
                    <span className="text-[11px] text-[#883008] font-medium block mt-1">
                      (Naupada, Thane 400602, Maharashtra – India)
                    </span>
                  </div>
                </div>

                {/* Primary Phone */}
                <div className="flex items-center gap-3 pt-2 border-t border-[#EFE8DA]">
                  <Phone className="w-4 h-4 text-[#C85413] shrink-0" />
                  <div>
                    <span className="font-bold text-[#221D18]">Primary Helpline:</span>{' '}
                    <a href={`tel:${PRIMARY_PHONE.replace(/\s+/g, '')}`} className="font-mono text-[#651728] font-semibold hover:underline">
                      {PRIMARY_PHONE}
                    </a>
                  </div>
                </div>

                {/* Secondary Phone */}
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#883008] shrink-0" />
                  <div>
                    <span className="font-bold text-[#221D18]">Alternate Contact:</span>{' '}
                    <a href={`tel:${SECONDARY_PHONE.replace(/\s+/g, '')}`} className="font-mono text-[#651728] hover:underline">
                      {SECONDARY_PHONE}
                    </a>
                  </div>
                </div>

                {/* Contact Person */}
                <div className="flex items-center gap-3 pt-2 border-t border-[#EFE8DA]">
                  <User className="w-4 h-4 text-[#C85413] shrink-0" />
                  <div>
                    <span className="font-bold text-[#221D18]">Contact Person:</span> {CONTACT_PERSON}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C85413] shrink-0" />
                  <div>
                    <span className="font-bold text-[#221D18]">Email:</span>{' '}
                    <a href={`mailto:${PRIMARY_EMAIL}`} className="text-[#651728] underline">
                      {PRIMARY_EMAIL}
                    </a>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-3 pt-2 border-t border-[#EFE8DA]">
                  <Clock className="w-4 h-4 text-[#D49622] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#221D18] block">Visiting &amp; Class Hours:</span>
                    <span>{lang === 'mr' ? TRUST_INFO.hoursMr : TRUST_INFO.hoursEn}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Certificate Card */}
            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E3D9C4] space-y-2 text-xs shadow-xs">
              <div className="flex items-center gap-2 text-[#651728] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#C85413]" />
                <span>Charitable Trust Registration Details</span>
              </div>
              <p className="text-[#5C5348] text-[11px] leading-relaxed">
                {TRUST_INFO.foundingStatement}
              </p>
            </div>

          </motion.div>
        </div>
      </div>

    </div>
  );
};
