import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ASSETS } from '../types';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src={ASSETS.showreel} type="video/mp4" />
          {/* Fallback if video fails to load */}
          Your browser does not support the video tag.
        </video>
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
        >
             <img 
                src={ASSETS.logoWhite} 
                alt="Tolya Films" 
                className="h-24 md:h-40 w-auto mb-8 drop-shadow-2xl"
                onError={(e) => e.currentTarget.style.display = 'none'}
            />
             <h1 className="text-4xl md:text-7xl font-display font-bold tracking-[0.2em] uppercase text-glow mb-4">
            Cinematic Vision
            </h1>
            <p className="text-lg md:text-xl font-light text-gray-300 tracking-widest max-w-2xl mx-auto">
            Videografie & Editing • Mannheim
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
