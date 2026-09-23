import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Flame, Volume2, VolumeX, ArrowRight, X } from 'lucide-react';
import { AgniParticles } from './AgniParticles';
import { SacredMandala } from './SacredMandala';

interface ScrollIntroProps {
  onClose: () => void;
}

export const ScrollIntro: React.FC<ScrollIntroProps> = ({ onClose }) => {
  const [stage, setStage] = useState<'opening' | 'revealed' | 'closing'>('opening');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    // Automatically transition from opening to revealed
    const timer = setTimeout(() => {
      setStage('revealed');
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setStage('closing');
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      {stage !== 'closing' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#120C08]/95 backdrop-blur-md overflow-hidden select-none"
        >
          {/* Background Ambient Agni Spark Embers */}
          <AgniParticles particleCount={45} className="opacity-70" />

          {/* Background Sacred Geometry Mandala Parallax */}
          <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
            <SacredMandala size={650} interactive3d={false} />
          </div>

          {/* Skip & Audio Buttons Top Bar */}
          <div className="absolute top-6 right-6 z-[110] flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 rounded-full bg-[#321B12]/80 hover:bg-[#651728] border border-[#FCD34D]/30 text-[#FCD34D] transition-all cursor-pointer shadow-lg"
              title={soundEnabled ? "Mute Ambient Sound" : "Enable Ambient Sound"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={handleEnter}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#321B12]/80 hover:bg-[#651728] border border-[#FCD34D]/40 text-[#FCD34D] text-xs font-bold transition-all cursor-pointer shadow-lg"
            >
              <span>Skip Intro</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Main Ancient Parchment Scroll Container */}
          <div className="relative w-full max-w-4xl mx-4 my-auto h-[550px] sm:h-[600px] flex items-center justify-center">
            
            {/* Scroll Roll Unrolling Animation Container */}
            <motion.div
              initial={{ scaleX: 0.05, opacity: 0.8 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full bg-gradient-to-r from-[#F7EEDD] via-[#FFFBF2] to-[#F7EEDD] rounded-xl shadow-[0_0_50px_rgba(200,84,19,0.3)] border-y-8 border-[#883008] overflow-hidden flex flex-col justify-between p-6 sm:p-12 text-center border-x-4 border-x-[#C85413]/40"
              style={{ transformOrigin: 'center center' }}
            >
              {/* Top Traditional Filigree Border Motif */}
              <div className="absolute top-2 left-4 right-4 h-6 border-b-2 border-dashed border-[#C85413]/30 flex items-center justify-center">
                <span className="bg-[#FFFBF2] px-4 text-xs font-serif font-bold text-[#651728] tracking-widest">
                  ॥ ॐ ॥
                </span>
              </div>

              {/* Scroll Inner Header */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-4 space-y-2"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#651728]/10 border border-[#651728]/20 text-[#651728] text-[11px] font-bold tracking-widest uppercase">
                  <Flame className="w-3.5 h-3.5 text-[#C85413] animate-pulse" />
                  <span>Sanskrit Heritage Pathashala Est. 1958</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#651728] tracking-wide">
                  सुरवाणी ज्ञानमंदिर संस्कृत न्यास, ठाणे
                </h2>
                <p className="text-xs sm:text-sm font-serif text-[#C85413] font-semibold">
                  Surawanee Dnyanmandir Sanskrit Trust, Thane (Reg. E-225)
                </p>
              </motion.div>

              {/* Center Sanskrit Shloka Reveal with Golden Calligraphy */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="my-auto py-6 px-4 rounded-2xl bg-[#651728]/5 border border-[#C85413]/20 relative overflow-hidden"
              >
                {/* Gold Glow behind Shloka */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-orange-500/10 to-amber-400/10 blur-xl" />

                <div className="relative z-10 space-y-3">
                  <p className="text-xl sm:text-3xl font-serif font-bold text-[#651728] leading-relaxed tracking-wide drop-shadow-xs">
                    संस्कृताध्ययनेनैव संस्कृतीः प्रसरो भवेत् ।<br />
                    तस्मात्संस्कृतभाषायाः प्रसारो ध्येयमस्तु नः ॥
                  </p>
                  
                  <div className="h-0.5 w-24 mx-auto bg-gradient-to-r from-transparent via-[#C85413] to-transparent" />

                  <p className="text-xs sm:text-sm font-sans italic text-[#5C5348] max-w-2xl mx-auto leading-normal">
                    "Only through the study of Sanskrit can traditional culture flourish. Therefore, the preservation and propagation of the Sanskrit language shall be our supreme goal."
                  </p>
                </div>
              </motion.div>

              {/* Scroll Bottom Controls: Enter Sanctuary Button */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="mb-2 space-y-3"
              >
                <button
                  onClick={handleEnter}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#651728] via-[#C85413] to-[#651728] hover:from-[#883008] hover:to-[#651728] text-white text-sm sm:text-base font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer flex items-center gap-3 mx-auto border border-[#FCD34D]/40 group"
                >
                  <Sparkles className="w-5 h-5 text-[#FCD34D] animate-spin-slow" />
                  <span>प्रवेश करा (Enter Sanctuary)</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#FCD34D]" />
                </button>

                <p className="text-[11px] font-sans text-[#8A7E70]">
                  Click to enter official trust website &amp; course directory
                </p>
              </motion.div>

              {/* Bottom Filigree Border */}
              <div className="absolute bottom-2 left-4 right-4 h-4 border-t-2 border-dashed border-[#C85413]/30" />
            </motion.div>

            {/* Wooden Scroll Left Rod Handle */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '-50%' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#3D1E0C] via-[#6B3A1C] to-[#261206] shadow-2xl rounded-l-md flex flex-col justify-between items-center py-2 z-20 border-r-2 border-[#FCD34D]/40"
            >
              {/* Brass Top Cap */}
              <div className="w-10 h-6 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600 rounded-t-lg shadow-md border border-amber-300" />
              {/* Wooden Texture Detail Lines */}
              <div className="w-full h-full my-2 bg-[radial-gradient(#4a2810_1px,transparent_1px)] [background-size:4px_4px]" />
              {/* Brass Bottom Cap */}
              <div className="w-10 h-6 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600 rounded-b-lg shadow-md border border-amber-300" />
            </motion.div>

            {/* Wooden Scroll Right Rod Handle */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '50%' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#261206] via-[#6B3A1C] to-[#3D1E0C] shadow-2xl rounded-r-md flex flex-col justify-between items-center py-2 z-20 border-l-2 border-[#FCD34D]/40"
            >
              {/* Brass Top Cap */}
              <div className="w-10 h-6 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600 rounded-t-lg shadow-md border border-amber-300" />
              {/* Wooden Texture Detail Lines */}
              <div className="w-full h-full my-2 bg-[radial-gradient(#4a2810_1px,transparent_1px)] [background-size:4px_4px]" />
              {/* Brass Bottom Cap */}
              <div className="w-10 h-6 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600 rounded-b-lg shadow-md border border-amber-300" />
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
