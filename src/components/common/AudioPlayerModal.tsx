import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, X, BookOpen, Sparkles, Check, Music } from 'lucide-react';
import { AudioItem } from '../../types';
import { useAppLanguage } from '../../context/LanguageContext';

interface AudioPlayerProps {
  isOpen?: boolean;
  item?: AudioItem | null;
  audioItem?: AudioItem | null;
  onClose: () => void;
}

export const AudioPlayerModal: React.FC<AudioPlayerProps> = ({ isOpen, item, audioItem, onClose }) => {
  const { lang } = useAppLanguage();
  const currentItem = audioItem || item || null;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationSec, setDurationSec] = useState(180);
  const [isMuted, setIsMuted] = useState(false);
  const [copied, setCopied] = useState(false);

  // HTML5 Audio Element Ref for real audio files (MP3/WAV/Data URLs)
  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);

  // Web Audio Synth Ref for synth fallback
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!currentItem || isOpen === false) {
      stopAudio();
      return;
    }

    setCurrentTime(0);
    setIsPlaying(false);

    if (currentItem.audioUrl) {
      const audio = new Audio(currentItem.audioUrl);
      htmlAudioRef.current = audio;

      const handleLoadedMetadata = () => {
        if (audio.duration && !isNaN(audio.duration)) {
          setDurationSec(Math.floor(audio.duration));
        }
      };

      const handleTimeUpdate = () => {
        setCurrentTime(Math.floor(audio.currentTime));
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.pause();
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        htmlAudioRef.current = null;
        stopSynthAudio();
      };
    }

    return () => {
      stopAudio();
    };
  }, [currentItem, isOpen]);

  const startSynthAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const baseFreq = currentItem?.audioFrequency || 220;

      const osc1 = audioCtxRef.current.createOscillator();
      const osc2 = audioCtxRef.current.createOscillator();
      const gainNode = audioCtxRef.current.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(baseFreq, audioCtxRef.current.currentTime);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(baseFreq * 1.5, audioCtxRef.current.currentTime);

      const filter = audioCtxRef.current.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(440, audioCtxRef.current.currentTime);

      gainNode.gain.setValueAtTime(isMuted ? 0 : 0.08, audioCtxRef.current.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtxRef.current.destination);

      osc1.start();
      osc2.start();

      osc1Ref.current = osc1;
      osc2Ref.current = osc2;
      gainNodeRef.current = gainNode;
      setIsPlaying(true);

      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => {
        setCurrentTime(t => {
          if (t >= durationSec) {
            stopSynthAudio();
            return 0;
          }
          return t + 1;
        });
      }, 1000);
    } catch {
      setIsPlaying(true);
    }
  };

  const stopSynthAudio = () => {
    if (osc1Ref.current) {
      try { osc1Ref.current.stop(); } catch {}
      osc1Ref.current.disconnect();
      osc1Ref.current = null;
    }
    if (osc2Ref.current) {
      try { osc2Ref.current.stop(); } catch {}
      osc2Ref.current.disconnect();
      osc2Ref.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  };

  const stopAudio = () => {
    if (htmlAudioRef.current) {
      htmlAudioRef.current.pause();
    }
    stopSynthAudio();
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (htmlAudioRef.current) {
        htmlAudioRef.current.pause();
      }
      stopSynthAudio();
      setIsPlaying(false);
    } else {
      if (htmlAudioRef.current) {
        htmlAudioRef.current.muted = isMuted;
        htmlAudioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.warn('Audio play error, falling back to synth:', err);
          startSynthAudio();
        });
      } else {
        startSynthAudio();
      }
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (htmlAudioRef.current) {
      htmlAudioRef.current.muted = nextMuted;
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(nextMuted ? 0 : 0.08, audioCtxRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (htmlAudioRef.current) {
      htmlAudioRef.current.currentTime = newTime;
    }
  };

  const copyText = () => {
    if (!currentItem) return;
    navigator.clipboard.writeText(`${currentItem.shlokaText}\n\n${currentItem.transliteration}\n\nMeaning:\n${currentItem.meaning}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!currentItem || isOpen === false) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#FCFAF7] border-2 border-[#D49622]/40 rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Decorative Header */}
        <div className="bg-gradient-to-r from-[#651728] via-[#883008] to-[#651728] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF0F2]/10 border border-[#D49622]/60 flex items-center justify-center text-[#F8EFD3]">
              <Sparkles className="w-5 h-5 text-[#F8EFD3]" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#F8EFD3]/80 font-medium flex items-center gap-1">
                {currentItem.audioUrl ? <Music className="w-3 h-3 text-[#FCD34D]" /> : null}
                <span>{lang === 'mr' ? 'सुरवाणी ध्वनी मुद्रिका' : 'Surawanee Sacred Chanting Audio'}</span>
              </span>
              <h3 className="text-lg font-serif font-bold text-white tracking-wide">
                {lang === 'mr' ? currentItem.titleMr : currentItem.titleEn}
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              stopAudio();
              onClose();
            }}
            className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chanting & Shloka Body */}
        <div className="p-5 sm:p-6 max-h-[60vh] overflow-y-auto space-y-5">
          {/* Reciter pill */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E3D9C4]">
            <div className="text-xs text-[#5C5348]">
              <span className="font-medium text-[#221D18]">
                {lang === 'mr' ? 'गायन/पठण:' : 'Recited by:'}
              </span>{' '}
              {currentItem.reciter || 'Surawanee Faculty'}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFF8F1] border border-[#C85413]/30 text-[#C85413] font-medium uppercase">
                {currentItem.category}
              </span>
              <button
                onClick={copyText}
                className="text-xs flex items-center gap-1 text-[#883008] hover:text-[#651728] px-2 py-1 rounded bg-[#FAF7F2] border border-[#E3D9C4]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <BookOpen className="w-3.5 h-3.5" />}
                {copied ? (lang === 'mr' ? 'कॉपी झाले!' : 'Copied!') : (lang === 'mr' ? 'श्लोक कॉपी करा' : 'Copy Shloka')}
              </button>
            </div>
          </div>

          {/* Sanskrit Devanagari Display Card */}
          {currentItem.shlokaText && (
            <div className="p-5 rounded-xl bg-[#FAF3E8] border border-[#E3D9C4] text-center shadow-inner relative overflow-hidden">
              <div className="absolute top-2 right-3 text-4xl opacity-10 font-serif select-none pointer-events-none">
                ॐ
              </div>
              <div className="text-lg sm:text-xl font-serif text-[#651728] leading-relaxed whitespace-pre-line font-medium mb-3">
                {currentItem.shlokaText}
              </div>
              {currentItem.transliteration && (
                <div className="text-xs sm:text-sm text-[#883008] font-mono tracking-wide italic border-t border-[#D1C3A7]/50 pt-3">
                  {currentItem.transliteration}
                </div>
              )}
            </div>
          )}

          {/* Meaning / Translation */}
          {currentItem.meaning && (
            <div className="bg-[#FCFAF7] p-4 rounded-lg border border-[#E3D9C4]/80">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C85413] mb-1.5 flex items-center gap-1.5">
                <span>{lang === 'mr' ? 'भावार्थ व संदर्भ:' : 'Spiritual Meaning & Context:'}</span>
              </h4>
              <p className="text-sm text-[#4A433B] leading-relaxed">
                {currentItem.meaning}
              </p>
            </div>
          )}
        </div>

        {/* Player Controls Bar */}
        <div className="bg-[#F7F3EB] border-t border-[#E3D9C4] p-4 sm:p-5">
          {/* Progress Bar with seeking */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-[#5C5348] w-10 shrink-0">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={durationSec || 180}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 accent-[#C85413] h-2 bg-[#E3D9C4] rounded-full cursor-pointer"
            />
            <span className="text-xs font-mono text-[#5C5348] w-10 text-right shrink-0">
              {currentItem.duration || formatTime(durationSec)}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-2 text-[#5C5348] hover:text-[#221D18] hover:bg-[#FAF7F2] rounded-lg border border-transparent hover:border-[#D1C3A7] transition-all"
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-600" /> : <Volume2 className="w-4 h-4 text-[#651728]" />}
              </button>
              <button
                onClick={() => {
                  if (htmlAudioRef.current) {
                    htmlAudioRef.current.currentTime = 0;
                  }
                  setCurrentTime(0);
                }}
                className="p-2 text-[#5C5348] hover:text-[#221D18] hover:bg-[#FAF7F2] rounded-lg border border-transparent hover:border-[#D1C3A7] transition-all"
                title="Restart Audio"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Play / Pause Button */}
            <button
              onClick={togglePlay}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#651728] via-[#C85413] to-[#A83E0A] hover:from-[#A83E0A] hover:to-[#883008] text-white font-medium shadow-md hover:shadow-lg transition-all transform active:scale-95"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span className="text-sm font-semibold">{lang === 'mr' ? 'विराम द्या' : 'Pause Chanting'}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                  <span className="text-sm font-semibold">{lang === 'mr' ? 'पठण ऐका' : 'Play Audio Chanting'}</span>
                </>
              )}
            </button>

            <div className="text-xs text-[#883008] font-serif font-medium hidden sm:block">
              {isPlaying ? '● ध्वनी चालू (Playing)' : '○ ध्वनी मुद्रिका'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
