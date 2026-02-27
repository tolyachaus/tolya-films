import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook, Youtube } from 'lucide-react';
import { ASSETS, SOCIAL_LINKS } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="relative z-50 group">
          {/* Fallback text if image fails due to mixed content blocking */}
          <img
            src={isScrolled ? ASSETS.logoBlack : ASSETS.logoWhite}
            alt="Tolya Films"
            className="h-8 md:h-10 w-auto object-contain transition-opacity duration-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const span = e.currentTarget.parentElement?.querySelector('span');
              if (span) span.style.display = 'block';
            }}
          />
          <span className="hidden text-2xl font-display font-bold tracking-widest uppercase">Tolya Films</span>
        </a>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center space-x-12 ${isScrolled ? 'text-brand-dark' : 'text-white'}`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium uppercase tracking-widest hover:opacity-70 transition-opacity relative group"
            >
              {link.name}
              <span className={`absolute -bottom-2 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-brand-dark' : 'bg-white'}`}></span>
            </a>
          ))}
          <div className={`flex items-center space-x-4 pl-4 border-l ${isScrolled ? 'border-brand-dark/20' : 'border-white/20'}`}>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-transform hover:scale-110">
              <Instagram size={18} />
            </a>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-transform hover:scale-110">
              <Facebook size={18} />
            </a>
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-transform hover:scale-110">
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden relative z-50 focus:outline-none ${!isMobileMenuOpen && isScrolled ? 'text-brand-dark' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-display font-light tracking-widest hover:text-gray-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex space-x-8 mt-8">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400"><Instagram size={24} /></a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400"><Facebook size={24} /></a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400"><Youtube size={24} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;