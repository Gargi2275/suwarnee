import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AgniParticles } from './AgniParticles';
import { SacredMandala } from './SacredMandala';

interface AncientScrollFrameProps {
  children: React.ReactNode;
  isReplaying?: boolean;
  onReplayComplete?: () => void;
}

export const AncientScrollFrame: React.FC<AncientScrollFrameProps> = ({
  children,
  isReplaying = false,
  onReplayComplete
}) => {
  const [isUnrolling, setIsUnrolling] = useState<boolean>(true);

  useEffect(() => {
    // Reset and trigger majestic slow-motion unroll animation
    setIsUnrolling(true);
    const timer = setTimeout(() => {
      setIsUnrolling(false);
      if (onReplayComplete) onReplayComplete();
    }, 3600);

    return () => clearTimeout(timer);
  }, [isReplaying]);

  return (
    <div className="relative min-h-screen [overflow-x:clip] bg-[#0F0A06]">
      
      {/* 1. Slow-Motion Ancient Parchment Scroll Unrolling Overlay */}
      <AnimatePresence>
        {isUnrolling && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="fixed inset-0 z-[100] pointer-events-none flex flex-col justify-between overflow-hidden bg-[#0D0805]"
          >
            {/* Background Agni Spark Embers */}
            <AgniParticles particleCount={45} className="opacity-90 z-10" />

            {/* Sacred 3D Mandala Glow in Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none z-0">
              <SacredMandala size={550} interactive3d={false} />
            </div>

            {/* Top Carved Wooden Spindle Roller Bar (Rolls Up in Slow Motion) */}
            <motion.div
              initial={{ y: '42vh' }}
              animate={{ y: '-120%' }}
              transition={{ duration: 3.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-20 bg-gradient-to-r from-[#2A1408] via-[#5C2E13] to-[#2A1408] shadow-[0_15px_40px_rgba(0,0,0,0.9)] border-b-4 border-[#FCD34D] flex items-center justify-between px-4 sm:px-8 z-30"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600 border-2 border-amber-300 shadow-xl flex items-center justify-center font-serif font-black text-[#651728] text-base drop-shadow-md">
                  ॐ
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-serif font-bold text-[#FCD34D] tracking-widest">सुरवाणी ज्ञानमंदिर</div>
                  <div className="text-[10px] text-amber-200">स्थापना १९५८ • ठाणे</div>
                </div>
              </div>

              <div className="text-center">
                <span className="font-serif font-black text-[#FCD34D] text-sm sm:text-base tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  ॥ श्री गणेशाय नमः • प्राचीन संस्कृत ग्रंथपट ॥
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <div className="text-xs font-serif font-bold text-[#FCD34D] tracking-widest">संस्कृत न्यास</div>
                  <div className="text-[10px] text-amber-200">Reg. E-225 Thane</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600 border-2 border-amber-300 shadow-xl flex items-center justify-center font-serif font-black text-[#651728] text-base drop-shadow-md">
                  ॐ
                </div>
              </div>
            </motion.div>

            {/* Center Aged Parchment Unrolling Surface with Golden Calligraphy */}
            <motion.div
              initial={{ scaleY: 0.02, opacity: 1 }}
              animate={{ scaleY: 1, opacity: 0.2 }}
              transition={{ duration: 3.0, ease: [0.22, 1, 0.36, 1] }}
              className="my-auto w-full h-full bg-gradient-to-b from-[#F2E5CE] via-[#FFF8EB] to-[#F2E5CE] border-x-[12px] border-[#9A420B]/80 flex flex-col items-center justify-center shadow-[inset_0_0_80px_rgba(101,23,40,0.3)] z-10 p-6 text-center"
              style={{ transformOrigin: 'center center' }}
            >
              <div className="max-w-3xl space-y-4 bg-[#651728]/10 p-8 rounded-3xl border-2 border-[#C85413]/40 shadow-2xl backdrop-blur-xs">
                <div className="text-xs font-bold uppercase tracking-widest text-[#C85413] font-serif">
                  ॥ ताडपत्र ग्रंथोद्घाटन (UNROLLING ANCIENT MANUSCRIPT) ॥
                </div>

                <p className="text-2xl sm:text-4xl font-serif font-bold text-[#651728] leading-relaxed tracking-wide drop-shadow-md">
                  संस्कृताध्ययनेनैव संस्कृतीः प्रसरो भवेत् ।<br />
                  तस्मात्संस्कृतभाषायाः प्रसारो ध्येयमस्तु नः ॥
                </p>

                <div className="w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-[#C85413] to-transparent" />

                <p className="text-xs sm:text-sm font-serif italic text-[#883008] max-w-xl mx-auto">
                  Only through the study of Sanskrit can traditional culture flourish. The propagation of Sanskrit shall be our supreme goal.
                </p>
              </div>
            </motion.div>

            {/* Bottom Carved Wooden Spindle Roller Bar (Rolls Down in Slow Motion) */}
            <motion.div
              initial={{ y: '-42vh' }}
              animate={{ y: '120%' }}
              transition={{ duration: 3.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-20 bg-gradient-to-r from-[#2A1408] via-[#5C2E13] to-[#2A1408] shadow-[0_-15px_40px_rgba(0,0,0,0.9)] border-t-4 border-[#FCD34D] flex items-center justify-between px-4 sm:px-8 z-30"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 border border-amber-300 shadow-md flex items-center justify-center font-serif text-amber-200 text-xs font-bold">
                1958
              </div>

              <div className="text-center text-xs font-serif font-semibold text-amber-200 tracking-wider">
                ॥ सुरवाणी ज्ञानमंदिर संस्कृत पाठशाळा • ठाणे ॥
              </div>

              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 border border-amber-300 shadow-md flex items-center justify-center font-serif text-amber-200 text-xs font-bold">
                2026
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Full-Width Website Container */}
      <div className="relative w-full bg-[#FFFBF7]">
        {/* Website Content */}
        {children}
      </div>

    </div>
  );
};
