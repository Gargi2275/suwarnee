import React from 'react';
import { X, Play, Clock, User, Sparkles } from 'lucide-react';
import { VideoItem } from '../../types';
import { useAppLanguage } from '../../context/LanguageContext';

interface VideoModalProps {
  isOpen?: boolean;
  video: VideoItem | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, video, onClose }) => {
  const { lang } = useAppLanguage();
  if (isOpen === false || !video) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#FCFAF7] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D49622]/40"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#651728] via-[#883008] to-[#651728] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-[#F8EFD3]">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{video.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Mockup Screen */}
        <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.titleEn}
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-6">
            <div className="flex justify-end">
              <span className="bg-black/70 text-white text-xs px-2.5 py-1 rounded font-mono border border-white/20">
                HD 1080p
              </span>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#C85413] text-white flex items-center justify-center mx-auto shadow-2xl hover:scale-110 transition-transform cursor-pointer border-2 border-white/60">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
              <p className="text-xs text-white/80 mt-3 font-medium">
                {lang === 'mr' ? 'व्हिडीओ व्याख्यान सुरू करण्यासाठी क्लिक करा' : 'Click to stream Sanskrit discourse'}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-white/90">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                {video.speaker}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {video.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Video description */}
        <div className="p-5 sm:p-6 bg-[#FAF7F2]">
          <h3 className="text-lg font-serif font-bold text-[#221D18] mb-2">
            {lang === 'mr' ? video.titleMr : video.titleEn}
          </h3>
          <p className="text-sm text-[#5C5348] leading-relaxed">
            {lang === 'mr' ? video.descriptionMr : video.descriptionEn}
          </p>

          <div className="mt-4 pt-3 border-t border-[#E3D9C4] flex items-center justify-between text-xs text-[#736B61]">
            <span>Surawanee Dnyanmandir Audio-Visual Archive</span>
            <button
              onClick={() => alert('Official YouTube link copied!')}
              className="text-[#C85413] hover:underline font-medium"
            >
              {lang === 'mr' ? 'यूट्यूब चॅनेलवर पहा →' : 'Watch on Official YouTube →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
