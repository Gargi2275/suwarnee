import React, { useState, useEffect } from 'react';
import { 
  Music, 
  Video, 
  FileText, 
  Download, 
  Play, 
  Volume2, 
  BookOpen, 
  Sparkles,
  Search,
  CheckCircle,
  FileCheck,
  Flame,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAppLanguage } from '../context/LanguageContext';
import { useAppData } from '../context/DataContext';
import { AudioItem, VideoItem, DocumentItem } from '../types';

interface KnowledgeSharePageProps {
  onPlayAudio: (audio: AudioItem) => void;
  onPlayVideo: (video: VideoItem) => void;
}

export const KnowledgeSharePage: React.FC<KnowledgeSharePageProps> = ({
  onPlayAudio,
  onPlayVideo
}) => {
  const { lang, knowledgeShareFilter, setKnowledgeShareFilter } = useAppLanguage();
  const { audioItems, videoItems, documentItems } = useAppData();
  const [activeCategory, setActiveCategory] = useState<'audio' | 'video' | 'documents'>('audio');
  const [trackFilter, setTrackFilter] = useState<'all' | 'paurohitya' | 'other'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadSuccessDocId, setDownloadSuccessDocId] = useState<string | null>(null);

  // Sync with context filter if set from navigation
  useEffect(() => {
    if (knowledgeShareFilter) {
      if (knowledgeShareFilter.includes('audio')) setActiveCategory('audio');
      else if (knowledgeShareFilter.includes('video')) setActiveCategory('video');
      else if (knowledgeShareFilter.includes('doc')) setActiveCategory('documents');

      if (knowledgeShareFilter.startsWith('paurohitya')) setTrackFilter('paurohitya');
      else if (knowledgeShareFilter.startsWith('other')) setTrackFilter('other');
    }
  }, [knowledgeShareFilter]);

  const handleDownload = (doc: DocumentItem) => {
    setDownloadSuccessDocId(doc.id);
    setTimeout(() => setDownloadSuccessDocId(null), 3000);

    if (doc.fileUrl) {
      const link = document.createElement('a');
      link.href = doc.fileUrl;
      link.download = `${doc.titleEn.replace(/[^a-z0-9]+/gi, '_')}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const content = `SURAWANEE DNYANMANDIR - STUDY GUIDE & DOCUMENT
==================================================
Title (English): ${doc.titleEn}
Title (Marathi): ${doc.titleMr}
Category: ${doc.category}
Author / Institution: ${doc.author}
Language: ${doc.language}
Pages: ${doc.pages}
File Size: ${doc.fileSize}

DESCRIPTION:
${doc.descriptionEn}
${doc.descriptionMr}

--
Surawanee Dnyanmandir Sanskrit Pathashala & Cultural Trust (Est. 1958)
Padma Niwas, Ram Maruti Cross Lane, Naupada, Thane 400602, Maharashtra
Official Website: https://www.surawanee.org
Contact: +91 99672 21246 | info@surawanee.org
`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${doc.titleEn.replace(/[^a-z0-9]+/gi, '_')}_Guide.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const q = searchQuery.trim().toLowerCase();

  const filteredAudio = audioItems.filter(item => {
    const catLower = (item.category || '').toLowerCase();
    const isPaurohitya = catLower.includes('paurohitya') ||
      item.category === 'stotra' ||
      item.category === 'vedic-chant' ||
      item.category === 'audio-recitations' ||
      item.category === 'paurohitya-media' ||
      item.titleEn.toLowerCase().includes('stotra') ||
      item.titleEn.toLowerCase().includes('sukta') ||
      item.titleEn.toLowerCase().includes('atharvashirsha') ||
      item.titleEn.toLowerCase().includes('shodashopachar');

    const matchTrack = trackFilter === 'all' ||
      (trackFilter === 'paurohitya' && isPaurohitya) ||
      (trackFilter === 'other' && !isPaurohitya);

    const matchQuery = !q ||
      item.titleEn.toLowerCase().includes(q) ||
      item.titleMr.includes(q) ||
      (item.subtitleEn && item.subtitleEn.toLowerCase().includes(q)) ||
      (item.subtitleMr && item.subtitleMr.includes(q)) ||
      (item.reciter && item.reciter.toLowerCase().includes(q)) ||
      (item.shlokaText && item.shlokaText.includes(q));

    return matchTrack && matchQuery;
  });

  const filteredVideo = videoItems.filter(item => {
    const isPaurohitya = (item.category || '').toLowerCase().includes('paurohitya') ||
      item.titleEn.toLowerCase().includes('puja') ||
      item.titleEn.toLowerCase().includes('stotra') ||
      item.titleEn.toLowerCase().includes('varg');

    const matchTrack = trackFilter === 'all' ||
      (trackFilter === 'paurohitya' && isPaurohitya) ||
      (trackFilter === 'other' && !isPaurohitya);

    const matchQuery = !q ||
      item.titleEn.toLowerCase().includes(q) ||
      item.titleMr.includes(q) ||
      (item.speaker && item.speaker.toLowerCase().includes(q)) ||
      (item.descriptionEn && item.descriptionEn.toLowerCase().includes(q)) ||
      (item.descriptionMr && item.descriptionMr.includes(q));

    return matchTrack && matchQuery;
  });

  const filteredDocs = documentItems.filter(item => {
    const isPaurohitya = (item.category || '').toLowerCase().includes('paurohitya') ||
      item.titleEn.toLowerCase().includes('paurohitya') ||
      item.titleEn.toLowerCase().includes('stotra') ||
      item.titleEn.toLowerCase().includes('pooja') ||
      item.titleEn.toLowerCase().includes('puja');

    const matchTrack = trackFilter === 'all' ||
      (trackFilter === 'paurohitya' && isPaurohitya) ||
      (trackFilter === 'other' && !isPaurohitya);

    const matchQuery = !q ||
      item.titleEn.toLowerCase().includes(q) ||
      item.titleMr.includes(q) ||
      (item.author && item.author.toLowerCase().includes(q)) ||
      (item.category && item.category.toLowerCase().includes(q)) ||
      (item.descriptionEn && item.descriptionEn.toLowerCase().includes(q)) ||
      (item.descriptionMr && item.descriptionMr.includes(q));

    return matchTrack && matchQuery;
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
            {lang === 'mr' ? '॥ ज्ञानं परमं बलम् ॥' : '॥ SURAWANEE KNOWLEDGE REPOSITORY ॥'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#651728]">
            {lang === 'mr' ? 'ज्ञानकोश व अभ्यास साहित्य' : 'Knowledge Share & Digital Archive'}
          </h1>
          <p className="text-sm sm:text-base text-[#5C5348] max-w-2xl mx-auto leading-relaxed">
            {lang === 'mr'
              ? 'ऋग्वेदीय सस्वर स्तोत्रे, विद्वानांची व्याख्याने, हस्तलिखित संदर्भ ग्रंथ आणि विनामूल्य संस्कृत अभ्यास साहित्य.'
              : 'Listen to pristine Vedic audio recitations, stream scholarly discourses on Sanskrit linguistics, and download research monographs.'}
          </p>
        </motion.div>
      </section>

      {/* 3 Main Category Tiles Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {/* Tile 1: Audio Chants */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => {
              setActiveCategory('audio');
              setKnowledgeShareFilter('audio');
            }}
            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${
              activeCategory === 'audio'
                ? 'bg-[#FFF8F1] border-[#C85413] shadow-md scale-102'
                : 'bg-[#FCFAF7] border-[#E3D9C4] hover:border-[#D1C3A7]'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              activeCategory === 'audio' ? 'bg-[#C85413] text-white shadow-xs' : 'bg-[#FAF0F2] text-[#883008]'
            }`}>
              <Music className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#221D18]">
                {lang === 'mr' ? 'सस्वर ऑडिओ स्तोत्रे' : 'Vedic Audio Chants'}
              </h3>
              <p className="text-xs text-[#5C5348] mt-0.5">
                {lang === 'mr' ? 'अथर्वशीर्ष, शिवमहिम्न व स्तोत्रे' : 'Stotras, Mantras with Lyrics'}
              </p>
            </div>
          </motion.div>

          {/* Tile 2: Video Lectures */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => {
              setActiveCategory('video');
              setKnowledgeShareFilter('video');
            }}
            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${
              activeCategory === 'video'
                ? 'bg-[#FFF8F1] border-[#C85413] shadow-md scale-102'
                : 'bg-[#FCFAF7] border-[#E3D9C4] hover:border-[#D1C3A7]'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              activeCategory === 'video' ? 'bg-[#C85413] text-white shadow-xs' : 'bg-[#FAF0F2] text-[#883008]'
            }`}>
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#221D18]">
                {lang === 'mr' ? 'व्हिडिओ व्याख्याने' : 'Video Discourses'}
              </h3>
              <p className="text-xs text-[#5C5348] mt-0.5">
                {lang === 'mr' ? 'संस्कृत संभाषण व पौरोहित्य' : 'YouTube Channel Videos & Discourses'}
              </p>
            </div>
          </motion.div>

          {/* Tile 3: Documents & Syllabus */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => {
              setActiveCategory('documents');
              setKnowledgeShareFilter('docs');
            }}
            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${
              activeCategory === 'documents'
                ? 'bg-[#FFF8F1] border-[#C85413] shadow-md scale-102'
                : 'bg-[#FCFAF7] border-[#E3D9C4] hover:border-[#D1C3A7]'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              activeCategory === 'documents' ? 'bg-[#C85413] text-white shadow-xs' : 'bg-[#FAF0F2] text-[#883008]'
            }`}>
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#221D18]">
                {lang === 'mr' ? 'संदर्भ ग्रंथ व दस्तऐवज' : 'Syllabus & Documents'}
              </h3>
              <p className="text-xs text-[#5C5348] mt-0.5">
                {lang === 'mr' ? 'हस्तलिखिते व PDF साहित्य' : 'Downloadable PDF Study Guides'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Track Filter & Search */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E3D9C4] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#5C5348]">Track Filter:</span>
            <button
              onClick={() => setTrackFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                trackFilter === 'all' ? 'bg-[#651728] text-white' : 'bg-white text-[#5C5348] border border-[#D1C3A7]'
              }`}
            >
              All Tracks
            </button>
            <button
              onClick={() => setTrackFilter('paurohitya')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                trackFilter === 'paurohitya' ? 'bg-[#C85413] text-white' : 'bg-white text-[#5C5348] border border-[#D1C3A7]'
              }`}
            >
              <Flame className="w-3 h-3" />
              <span>Paurohitya Track</span>
            </button>
            <button
              onClick={() => setTrackFilter('other')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                trackFilter === 'other' ? 'bg-[#883008] text-white' : 'bg-white text-[#5C5348] border border-[#D1C3A7]'
              }`}
            >
              Other Sanskrit Courses
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#883008] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search in knowledge base..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#D1C3A7] rounded-lg text-xs text-[#221D18] focus:outline-hidden"
            />
          </div>
        </motion.div>
      </div>

      {/* Main Content Sections based on category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* SECTION 1: AUDIO CHANTS */}
        {activeCategory === 'audio' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3D9C4]">
              <h2 className="text-xl font-serif font-bold text-[#651728]">
                {lang === 'mr' ? 'सस्वर ऑडिओ स्तोत्र संग्रह' : 'Vedic Audio Recitations & Stotra Pathan'}
              </h2>
              <span className="text-xs text-[#8A7E70]">{filteredAudio.length} Audio Tracks</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAudio.map((audio, idx) => (
                <motion.div
                  key={audio.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-5 rounded-2xl bg-[#FCFAF7] border-2 border-[#E3D9C4] hover:border-[#C85413] shadow-xs hover:shadow-xl flex items-center justify-between group transition-all"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C85413] bg-[#FFF8F1] px-2 py-0.5 rounded border border-[#C85413]/20">
                        {audio.category === 'audio-recitations' ? 'Audio Recitations' :
                         audio.category === 'paurohitya-media' ? 'Paurohitya' :
                         audio.category === 'vedic-chant' ? 'Vedic Chant' :
                         audio.category === 'stotra' ? 'Stotra' :
                         audio.category || 'Audio'}
                      </span>
                      {/* Animated Sound Waves */}
                      <div className="flex items-end gap-0.5 h-3 opacity-70 group-hover:opacity-100">
                        <span className="w-0.5 bg-[#C85413] animate-pulse h-full" />
                        <span className="w-0.5 bg-[#C85413] animate-pulse h-2/3" />
                        <span className="w-0.5 bg-[#C85413] animate-pulse h-4/5" />
                      </div>
                    </div>
                    <h4 className="text-base font-serif font-bold text-[#221D18] group-hover:text-[#C85413] transition-colors">
                      {lang === 'mr' ? audio.titleMr : audio.titleEn}
                    </h4>
                    <p className="text-xs text-[#5C5348]">{audio.reciter}{audio.duration ? ` • ${audio.duration}` : ''}</p>
                  </div>

                  <button
                    onClick={() => onPlayAudio(audio)}
                    className="w-11 h-11 rounded-full bg-[#651728] hover:bg-[#C85413] text-white flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-110 cursor-pointer"
                    title="Play Audio Chanting"
                  >
                    <Play className="w-5 h-5 ml-0.5 fill-white" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: VIDEO DISCOURSES */}
        {activeCategory === 'video' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3D9C4]">
              <h2 className="text-xl font-serif font-bold text-[#651728]">
                {lang === 'mr' ? 'व्हिडिओ व्याख्यानमाला' : 'Video Discourses & Classes'}
              </h2>
              <span className="text-xs text-[#8A7E70]">{filteredVideo.length} Videos Available</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideo.map((video, idx) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="rounded-2xl bg-[#FCFAF7] border-2 border-[#E3D9C4] hover:border-[#C85413] overflow-hidden shadow-xs hover:shadow-xl transition-all group flex flex-col justify-between"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    onClick={() => onPlayVideo(video)}
                    className="relative aspect-video bg-black cursor-pointer overflow-hidden"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.titleEn}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 opacity-85"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#C85413] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 ml-0.5 fill-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C85413] bg-[#FFF8F1] px-2 py-0.5 rounded">
                      {video.category}
                    </span>
                    <h4 className="text-sm font-serif font-bold text-[#221D18] group-hover:text-[#C85413] transition-colors">
                      {lang === 'mr' ? video.titleMr : video.titleEn}
                    </h4>
                    <p className="text-xs text-[#5C5348] line-clamp-2">
                      {lang === 'mr' ? video.descriptionMr : video.descriptionEn}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: DOCUMENTS & SYLLABUS */}
        {activeCategory === 'documents' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3D9C4]">
              <h2 className="text-xl font-serif font-bold text-[#651728]">
                {lang === 'mr' ? 'संदर्भ ग्रंथ, नियमावली व अभ्यासक्रम PDF' : 'Reference Documents & Study Guides'}
              </h2>
              <span className="text-xs text-[#8A7E70]">{filteredDocs.length} Documents</span>
            </div>

            <div className="space-y-3">
              {filteredDocs.map((doc, idx) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="p-5 rounded-2xl bg-[#FCFAF7] border-2 border-[#E3D9C4] hover:border-[#C85413] shadow-xs hover:shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF0F2] text-[#651728] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C85413] bg-[#FFF8F1] px-2 py-0.5 rounded">
                          {doc.category}
                        </span>
                        <span className="text-[11px] text-[#8A7E70]">{doc.fileSize} • {doc.pages} pages</span>
                      </div>
                      <h4 className="text-base font-serif font-bold text-[#221D18] mt-1">
                        {lang === 'mr' ? doc.titleMr : doc.titleEn}
                      </h4>
                      <p className="text-xs text-[#5C5348] mt-0.5">
                        {lang === 'mr' ? doc.descriptionMr : doc.descriptionEn}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(doc)}
                    className="px-4 py-2 rounded-xl bg-[#651728] hover:bg-[#822237] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-xs cursor-pointer"
                  >
                    {downloadSuccessDocId === doc.id ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Downloaded</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
