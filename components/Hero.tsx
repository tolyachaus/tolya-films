import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ASSETS } from '../types';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] md:h-screen w-full overflow-hidden bg-brand-light md:bg-black flex flex-col md:flex-row items-center justify-start md:justify-center pt-32 sm:pt-36 pb-16 md:pt-0 md:pb-0">
      {/* Background / Main Video Container */}
      <div className="w-full px-4 sm:px-6 md:px-0 md:absolute md:inset-0 md:w-full md:h-full flex items-center justify-center">
        <div className="relative w-full max-w-xl md:max-w-none aspect-video md:h-full md:aspect-auto overflow-hidden rounded-none shadow-none border-none bg-transparent md:bg-black">
          <video
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none md:block hidden"></div>
        </div>
      </div>

      {/* Content Container (Centered between video & portfolio on mobile, centered overlay on desktop) */}
      <div className="relative z-10 w-full max-w-5xl px-6 mt-10 md:mt-0 flex flex-col justify-center items-center text-center my-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full flex flex-col items-center justify-center text-center"
        >
          <h1 className="text-xl sm:text-2xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold tracking-[0.1em] uppercase text-brand-dark md:text-white drop-shadow-none md:drop-shadow-2xl leading-tight max-w-4xl mx-auto">
            Wedding films that feel like cinema
            <span className="sr-only">Tolya Films - Wedding Filmmaker in Mannheim</span>
          </h1>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-10 inset-x-0 flex justify-center items-center z-20 pointer-events-none">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-auto flex items-center justify-center"
        >
          <a
            href="#portfolio"
            aria-label="Scroll down to portfolio"
            className="text-brand-dark/40 md:text-white/70 hover:text-brand-dark md:hover:text-white transition-colors flex items-center justify-center"
          >
            <ChevronDown size={32} strokeWidth={1.5} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
