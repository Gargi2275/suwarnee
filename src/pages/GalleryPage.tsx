import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Video, 
  Filter, 
  Play, 
  Calendar, 
  Sparkles,
  Maximize2,
  Tag,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAppLanguage } from '../context/LanguageContext';
import { useAppData } from '../context/DataContext';
import { GalleryItem, VideoItem } from '../types';

interface GalleryPageProps {
  onOpenLightbox: (item: GalleryItem, index: number) => void;
  onPlayVideo: (video: VideoItem) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onOpenLightbox,
  onPlayVideo
}) => {
  const { lang, galleryFilter, setGalleryFilter } = useAppLanguage();
  const { galleryItems, videoItems } = useAppData();
  const [galleryTab, setGalleryTab] = useState<'photos' | 'videos'>('photos');
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState<string>('all');

  // Sync tab with galleryFilter from context if passed from header
  useEffect(() => {
    if (galleryFilter === 'videos') {
      setGalleryTab('videos');
    } else if (galleryFilter === 'images' || galleryFilter === 'photos') {
      setGalleryTab('photos');
    }
  }, [galleryFilter]);

  const photoCategories = [
    { id: 'all', labelEn: 'All Photos', labelMr: 'सर्व छायाचित्रे' },
    { id: 'events', labelEn: 'Celebrations & Utsav', labelMr: 'उत्सव व कार्यक्रम' },
    { id: 'classes', labelEn: 'Classroom & Sanskar', labelMr: 'वर्ग व संस्कार' },
    { id: 'paurohitya', labelEn: 'Paurohitya & Yajna', labelMr: 'पौरोहित्य व यज्ञ' },
    { id: 'convocation', labelEn: 'Dikshant Samaroh', labelMr: 'दीक्षांत समारंभ' },
    { id: 'historical', labelEn: 'Archival (1958-1980)', labelMr: 'ऐतिहासिक (१९५८-१९८०)' }
  ];

  const filteredPhotos = galleryItems.filter(item => {
    if (selectedPhotoCategory === 'all') return true;
    return (
      item.category === selectedPhotoCategory ||
      (selectedPhotoCategory === 'events' && (item.category === 'competition' || item.category === 'events')) ||
      (selectedPhotoCategory === 'classes' && (item.category === 'classes' || item.category === 'bal-sanskar' || item.category === 'teachers-training')) ||
      (selectedPhotoCategory === 'historical' && (item.category === 'historical' || item.category === 'archive'))
    );
  });

  return (
    <div className="space-y-8 sm:space-y-12 pb-16 overflow-hidden">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#FFF8F1] via-[#FAF7F2] to-[#FAF7F2] border-b border-[#E3D9C4] py-8 sm:py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-2 sm:space-y-3"
        >
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#C85413] block">
            {lang === 'mr' ? '॥ दृक्-श्राव्य कला दालन ॥' : '॥ SURAWANEE VISUAL CHRONICLES ॥'}
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#651728] leading-tight">
            {lang === 'mr' ? 'छायाचित्र व दृकश्राव्य दालन' : 'Photo & Video Gallery'}
          </h1>
        </motion.div>
      </section>

      {/* Main Tab Switcher: Photos vs Videos (Mobile-first Segmented Control) */}
      <div className="max-w-md mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-[#F5EFE6] border border-[#D8CCB5] shadow-inner gap-1.5">
          <button
            onClick={() => {
              setGalleryTab('photos');
              setGalleryFilter('images');
            }}
            className={`py-2 px-3 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap ${
              galleryTab === 'photos'
                ? 'bg-[#C85413] text-white shadow-md'
                : 'text-[#5C5348] hover:text-[#221D18] hover:bg-white/60'
            }`}
          >
            <ImageIcon className="w-4 h-4 shrink-0" />
            <span>{lang === 'mr' ? 'छायाचित्रे' : 'Image Gallery'}</span>
          </button>
          <button
            onClick={() => {
              setGalleryTab('videos');
              setGalleryFilter('videos');
            }}
            className={`py-2 px-3 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap ${
              galleryTab === 'videos'
                ? 'bg-[#651728] text-white shadow-md'
                : 'text-[#5C5348] hover:text-[#221D18] hover:bg-white/60'
            }`}
          >
            <Video className="w-4 h-4 shrink-0" />
            <span>{lang === 'mr' ? 'व्हिडिओ दालन' : 'Videos Gallery'}</span>
          </button>
        </div>
      </div>

      {/* 1. PHOTO GALLERY VIEW */}
      {galleryTab === 'photos' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6 sm:space-y-8">
          {/* Category Filter Chips - Swipeable Horizontal Scroll on Mobile, Centered Grid on Desktop */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 sm:flex-wrap sm:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 sm:mx-0 sm:px-0">
            {photoCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedPhotoCategory(cat.id)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedPhotoCategory === cat.id
                    ? 'bg-[#651728] text-white shadow-md scale-102 ring-2 ring-[#651728]/20'
                    : 'bg-[#FCFAF7] text-[#5C5348] hover:bg-[#F4EFE6] border border-[#D1C3A7] shadow-xs'
                }`}
              >
                {lang === 'mr' ? cat.labelMr : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Masonry / Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.03, rotateX: 2 }}
                onClick={() => onOpenLightbox(item, index)}
                className="group relative rounded-2xl overflow-hidden bg-stone-900 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-[#E3D9C4] hover:border-[#C85413]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.titleEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#C85413] text-white shadow-xs">
                      {item.categoryLabel}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    {item.year && (
                      <span className="text-[10px] text-amber-300/90 font-mono">
                        {item.year.toLowerCase().includes('year') ? item.year : /^\d{4}$/.test(item.year) ? `Year ${item.year}` : item.year}
                      </span>
                    )}
                    <h4 className="text-sm font-serif font-bold text-white leading-tight">
                      {lang === 'mr' ? item.titleMr : item.titleEn}
                    </h4>
                    {(item.captionMr || item.captionEn) && (
                      <p className="text-xs text-stone-300 line-clamp-2">
                        {lang === 'mr' ? (item.captionMr || item.captionEn) : (item.captionEn || item.captionMr)}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 2. VIDEOS GALLERY VIEW */}
      {galleryTab === 'videos' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm text-[#5C5348]">
              We have prepared some videos for you, like &amp; subscribe to our channel to keep updated with all new videos.
            </p>
          </div>

          {/* YouTube Embeds Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videoItems.slice(0, 4).map((video, idx) => (
              <motion.div 
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-[#FCFAF7] rounded-2xl border-2 border-[#E3D9C4] hover:border-[#C85413] overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300 flex flex-col"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                    title={video.titleEn}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C85413] bg-[#FFF8F1] px-2 py-0.5 rounded">
                        {video.category}
                      </span>
                      <span className="text-[11px] text-[#8A7E70]">ID: {video.youtubeId}</span>
                    </div>
                    <h3 className="text-base font-serif font-bold text-[#221D18] group-hover:text-[#C85413] transition-colors">
                      {lang === 'mr' ? video.titleMr : video.titleEn}
                    </h3>
                    <p className="text-xs text-[#5C5348] mt-1">
                      {lang === 'mr' ? video.descriptionMr : video.descriptionEn}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#EFE8DA] flex items-center justify-between text-xs">
                    <span className="text-[#883008] font-medium font-mono">{video.speaker}</span>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#651728] hover:text-[#C85413] font-semibold flex items-center gap-1"
                    >
                      <span>Watch on YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Video Discourses from Knowledge Base */}
          <div className="pt-8 border-t border-[#E3D9C4]">
            <h3 className="text-lg font-serif font-bold text-[#651728] mb-4">
              {lang === 'mr' ? 'संस्कृत व्याख्याने व कार्यशाळा' : 'Lectures & Discourses Archive'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => onPlayVideo(item)}
                  className="rounded-2xl bg-[#FCFAF7] border-2 border-[#E3D9C4] hover:border-[#C85413] overflow-hidden shadow-xs hover:shadow-lg transition-all group cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.titleEn}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 opacity-80"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-[#C85413] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 ml-0.5 fill-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <span className="text-[10px] font-bold text-[#C85413] uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-serif font-bold text-[#221D18] group-hover:text-[#C85413] transition-colors">
                      {lang === 'mr' ? item.titleMr : item.titleEn}
                    </h4>
                    <p className="text-xs text-[#5C5348] line-clamp-2">
                      {lang === 'mr' ? item.descriptionMr : item.descriptionEn}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
