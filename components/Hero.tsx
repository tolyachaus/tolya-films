import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ASSETS } from '../types';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full bg-brand-light">
        <video
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          className="w-full h-full object-cover opacity-90"
        >
          <source src={ASSETS.showreel} type="video/mp4" />
          {/* Fallback if video fails to load */}
          Your browser does not support the video tag.
        </video>
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-brand-light/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-[0.15em] uppercase text-white drop-shadow-2xl mb-4">
            Cinematic Vision
          </h1>
          <p className="text-lg md:text-2xl font-light text-gray-100 tracking-[0.3em] uppercase max-w-2xl mx-auto drop-shadow-lg">
            Videografie & Editing
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <a href="#portfolio" className="text-white/70 hover:text-white transition-colors">
          <ChevronDown size={40} strokeWidth={1} />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
