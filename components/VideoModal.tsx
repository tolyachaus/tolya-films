import React from 'react';
import { createPortal } from 'react-dom';
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

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md text-white"
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

        <div className="hidden md:flex items-center gap-3 mr-10">
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="px-3 h-9 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600 hover:scale-105 transition-all duration-300 shadow-md gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span className="text-sm font-medium tracking-wide">{SOCIAL_LINKS.phone}</span>
          </a>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-md"
          >
            <Instagram size={16} />
          </a>
          <a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 hover:scale-110 transition-all duration-300 shadow-md"
          >
            <Facebook size={16} />
          </a>
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 hover:scale-110 transition-all duration-300 shadow-md"
          >
            <Youtube size={16} />
          </a>
        </div>

        <button
          onClick={onClose}
          aria-label="Close video modal"
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

  return createPortal(modalContent, document.body);
};

export default VideoModal;