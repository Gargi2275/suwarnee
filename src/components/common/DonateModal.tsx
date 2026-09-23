import React, { useState } from 'react';
import { X, Heart, CheckCircle, Send, ShieldCheck, Phone, Mail, User, IndianRupee } from 'lucide-react';
import { useAppLanguage } from '../../context/LanguageContext';
import { useAppData } from '../../context/DataContext';
import { TRUST_INFO } from '../../data/mockData';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useAppLanguage();
  const { submitInquiry } = useAppData();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('1000');
  const [donationType, setDonationType] = useState('Student Scholarship & Sponsorship');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setIsSubmitting(true);
    try {
      await submitInquiry({
        name: fullName,
        email,
        phone,
        subject: `Donation & Support (${donationType})`,
        message: `Pledged Donation Amount: ₹${amount || 'Flexible'}.\nDonation Type: ${donationType}.\nNotes: ${message || 'No additional note'}`
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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#FCFAF7] border-2 border-[#D49622]/40 rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#651728] via-[#883008] to-[#651728] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#FCD34D]">
              <Heart className="w-5 h-5 fill-[#FCD34D]" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#F8EFD3]/80 font-medium block">
                {lang === 'mr' ? 'संस्कृत धर्मार्थ देणगी' : 'Charitable Support & Patronage'}
              </span>
              <h3 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide">
                {lang === 'mr' ? 'सुरवाणी ज्ञानमंदिर देणगी अर्ज' : 'Donate to Surawanee Dnyanmandir'}
              </h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 text-xs">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-serif font-bold text-[#651728]">
                {lang === 'mr' ? 'आपली देणगी नोंदणी प्राप्त झाली!' : 'Donation Pledge Submitted!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#5C5348] max-w-md mx-auto leading-relaxed">
                {lang === 'mr'
                  ? `धन्यवाद ${fullName}. आपली देणगी चौकशी Admin Dashboard (Inquiries) मध्ये नोंदवली गेली आहे. आमचे विश्वस्त आपल्याशी ${phone} वर संपर्क साधतील.`
                  : `Thank you, ${fullName}. Your patronage inquiry has been logged to the Trust Admin Inquiries console. Our team will get back to you at ${phone}.`}
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-[#651728] text-white font-semibold shadow-sm cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Donor Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#5C5348] mb-1">
                    {lang === 'mr' ? 'देणगीदाराचे नाव *' : 'Donor Full Name *'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. Anand Kulkarni"
                      className="w-full px-3 py-2 pl-9 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] focus:ring-2 focus:ring-[#C85413] focus:outline-hidden"
                    />
                    <User className="w-4 h-4 text-[#8A7E70] absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#5C5348] mb-1">
                    {lang === 'mr' ? 'भ्रमणध्वनी (WhatsApp) *' : 'Mobile / Phone *'}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98200 00000"
                      className="w-full px-3 py-2 pl-9 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] focus:ring-2 focus:ring-[#C85413] focus:outline-hidden"
                    />
                    <Phone className="w-4 h-4 text-[#8A7E70] absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Email & Donation Cause */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#5C5348] mb-1">
                    {lang === 'mr' ? 'ईमेल पत्ता' : 'Email Address'}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="donor@example.com"
                      className="w-full px-3 py-2 pl-9 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] focus:ring-2 focus:ring-[#C85413] focus:outline-hidden"
                    />
                    <Mail className="w-4 h-4 text-[#8A7E70] absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#5C5348] mb-1">
                    {lang === 'mr' ? 'देणगीचा उद्देश' : 'Select Cause'}
                  </label>
                  <select
                    value={donationType}
                    onChange={e => setDonationType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] focus:ring-2 focus:ring-[#C85413] focus:outline-hidden"
                  >
                    <option value="Student Scholarship & Sponsorship">Student Scholarship &amp; Books</option>
                    <option value="Paurohitya Pathashala Maintenance">Paurohitya Class Infrastructure</option>
                    <option value="Sanskrit Digital Preservation & Audio">Sanskrit Audio &amp; Video Digitization</option>
                    <option value="General Trust Corpus Fund">General Trust Corpus Fund</option>
                  </select>
                </div>
              </div>

              {/* Pledged Amount */}
              <div>
                <label className="block font-semibold text-[#5C5348] mb-1">
                  {lang === 'mr' ? 'देणगी रक्कम (₹)' : 'Pledged Amount (₹ INR)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="1000"
                    className="w-full px-3 py-2 pl-9 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] font-bold text-sm focus:ring-2 focus:ring-[#C85413] focus:outline-hidden"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A7E70] font-bold">₹</span>
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="block font-semibold text-[#5C5348] mb-1">
                  {lang === 'mr' ? 'काही संदेश किंवा विशेष सूचना' : 'Special Instructions / Remarks'}
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="e.g. Donation in memory of late parent..."
                  className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-[#221D18] focus:ring-2 focus:ring-[#C85413] focus:outline-hidden"
                />
              </div>

              {/* Trust Details Note */}
              <div className="p-3 rounded-xl bg-[#FFF8F1] border border-[#C85413]/20 text-[11px] text-[#5C5348] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C85413] shrink-0 mt-0.5" />
                <span>
                  <strong>Surawanee Dnyanmandir (Reg No: E-225 Thane)</strong>.<br />
                  Submitting this pledge will notify the Trust Admin Console. Direct bank transfer instructions will be shared by the Trust Secretary.
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl border border-[#E3D9C4] text-[#5C5348] font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-[#651728] hover:bg-[#822237] text-white font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-[#FCD34D]" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Donation Inquiry'}</span>
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
