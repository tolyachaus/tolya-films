import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { ASSETS } from '../types';
import { useLanguage } from '../src/context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      video.volume = 1.0;
      video.play().catch(() => {});
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section className="relative min-h-screen md:h-screen w-full overflow-hidden bg-brand-light md:bg-black flex flex-col justify-between md:justify-center pt-24 pb-16 md:pt-0 md:pb-0">
      {/* Background / Main Video Container */}
      <div className="w-full px-4 sm:px-6 md:px-0 md:absolute md:inset-0 md:w-full md:h-full flex items-center justify-center z-0 md:z-10">
        <div className="relative w-full max-w-xl md:max-w-none aspect-video md:h-full md:aspect-auto overflow-hidden rounded-none shadow-none border-none bg-transparent md:bg-black">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            disablePictureInPicture
            className="w-full h-full object-cover opacity-100 brightness-110"
          >
            <source src={ASSETS.showreel} type="video/mp4" />
            {/* Fallback if video fails to load */}
            Your browser does not support the video tag.
          </video>
          {/* Overlay Gradient: 20% lighter overlay for crystal clear video */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40 pointer-events-none md:block hidden"></div>

          {/* Sound Toggle Button */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? (t.hero.soundOn || 'Ton an') : (t.hero.soundOff || 'Stumm')}
            className={`absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-8 md:right-8 z-30 inline-flex items-center gap-2 px-3.5 py-2 md:px-4 md:py-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-2xl cursor-pointer hover:scale-105 active:scale-95 group border ${
              isMuted
                ? 'bg-black/65 hover:bg-black/85 text-white/90 border-white/20'
                : 'bg-black/85 text-brand-gold border-brand-gold/60 ring-1 ring-brand-gold/40'
            }`}
          >
            {isMuted ? (
              <>
                <VolumeX size={15} className="text-white/80 group-hover:text-white transition-colors" />
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-white/90 group-hover:text-white transition-colors">
                  {t.hero.soundOn || 'Ton an'}
                </span>
              </>
            ) : (
              <>
                <Volume2 size={15} className="text-brand-gold" />
                <span className="flex items-center gap-0.5 h-3 px-0.5">
                  <span className="w-0.5 h-2 bg-brand-gold rounded-full animate-pulse" />
                  <span className="w-0.5 h-3.5 bg-brand-gold rounded-full animate-bounce" style={{ animationDuration: '600ms' }} />
                  <span className="w-0.5 h-2.5 bg-brand-gold rounded-full animate-pulse" style={{ animationDuration: '800ms' }} />
                </span>
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
                  {t.hero.soundOff || 'Stumm'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Container (Cleanly below video on mobile, 100% dead-center overlay on desktop) */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:absolute md:inset-0 md:z-20 md:flex md:flex-col md:items-center md:justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-5xl flex flex-col items-center justify-center text-center mt-6 sm:mt-8 md:mt-0 space-y-3 md:space-y-5 pointer-events-auto"
        >
          {/* Main Headline - Strictly 2 Lines */}
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold tracking-[0.08em] md:tracking-[0.1em] uppercase text-brand-dark md:text-white drop-shadow-none md:drop-shadow-2xl leading-snug md:leading-tight">
            <span className="block whitespace-nowrap">{t.hero.taglineLine1}</span>
            <span className="block whitespace-nowrap">{t.hero.taglineLine2}</span>
            <span className="sr-only">Tolya Films - Wedding Filmmaker in Mannheim</span>
          </h1>

          {/* Subheadline - Single Line, Light Font, Smaller */}
          <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-light tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-brand-dark/75 md:text-white/90 drop-shadow-none md:drop-shadow-md sm:whitespace-nowrap uppercase">
            {t.hero.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative md:absolute bottom-2 md:bottom-8 inset-x-0 flex justify-center items-center z-20 pointer-events-none">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-auto flex items-center justify-center"
        >
          <a
            href="#portfolio"
            aria-label="Scroll down to portfolio"
            className="text-brand-dark/40 md:text-white/70 hover:text-brand-dark md:hover:text-white transition-colors flex items-center justify-center p-2"
          >
            <ChevronDown size={30} strokeWidth={1.5} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
