import React from 'react';
import { X, Instagram, Facebook, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../types';

interface VideoModalProps {
  videoId: string | null;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoId, onClose }) => {
  if (!videoId) return null;

  // Construct safe origin for embed
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black text-white"
      onClick={onClose}
    >
      {/* Header Controls */}
      <div 
        className="absolute top-0 left-0 right-0 p-6 md:p-8 flex justify-end items-center z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hidden md:flex items-center space-x-8 mr-8">
          <a href="#portfolio" onClick={onClose} className="text-xs font-bold tracking-widest text-white hover:text-gray-300 uppercase transition-colors">
            Portfolio
          </a>
          <a href="#about" onClick={onClose} className="text-xs font-bold tracking-widest text-white hover:text-gray-300 uppercase transition-colors">
            Über mich
          </a>
          <a href="#contact" onClick={onClose} className="text-xs font-bold tracking-widest text-white hover:text-gray-300 uppercase transition-colors">
            Kontakt
          </a>
        </div>

        <div className="hidden md:block w-px h-5 bg-white/20 mr-8"></div>

        <div className="hidden md:flex items-center space-x-5 mr-10">
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
              <Instagram size={18} />
            </a>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
              <Facebook size={18} />
            </a>
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
              <Youtube size={18} />
            </a>
        </div>

        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors"
        >
          <X size={40} strokeWidth={1} />
        </button>
      </div>
      
      {/* Video Container */}
      <div 
        className="w-full max-w-6xl aspect-video bg-black shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&playsinline=1&origin=${origin}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </motion.div>
  );
};

export default VideoModal;