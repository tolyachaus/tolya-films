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
    { name: 'Über mich', href: '#about' },
    { name: 'Kontakt', href: '#contact' },
  ];

  // When Mobile Menu is open, we force the navbar text color to white and background to transparent.
  const navBackgroundClass = isMobileMenuOpen
    ? 'bg-transparent py-4'
    : isScrolled
      ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm'
      : 'bg-transparent py-6';

  const logoSrc = isMobileMenuOpen ? ASSETS.logoBlack : (isScrolled ? ASSETS.logoBlack : ASSETS.logoWhite);
  const desktopTextColor = isScrolled && !isMobileMenuOpen ? 'text-brand-dark' : 'text-white';
  const mobileToggleColor = isScrolled && !isMobileMenuOpen ? 'text-brand-dark' : (isMobileMenuOpen ? 'text-brand-dark' : 'text-white');

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${navBackgroundClass}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="relative group z-[60]">
            {/* Fallback text if image fails due to mixed content blocking */}
            <img
              src={logoSrc}
              alt="Tolya Films"
              className="h-8 md:h-10 w-auto object-contain transition-opacity duration-300"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const span = e.currentTarget.parentElement?.querySelector('span');
                if (span) {
                  span.classList.remove('hidden');
                  span.classList.add('block');
                }
              }}
            />
            <span className={`hidden text-2xl font-display font-bold ${isMobileMenuOpen || isScrolled ? "text-brand-dark" : "text-white"} tracking-widest uppercase`}>Tolya Films</span>
          </a>

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center space-x-12 ${desktopTextColor}`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium uppercase tracking-widest hover:opacity-70 transition-opacity relative group"
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isScrolled && !isMobileMenuOpen ? 'bg-brand-dark' : 'bg-white'}`}></span>
              </a>
            ))}
            <div className={`flex items-center gap-3 pl-4 border-l ${isScrolled && !isMobileMenuOpen ? 'border-brand-dark/20' : 'border-white/20'}`}>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 ${isScrolled && !isMobileMenuOpen ? 'bg-gray-100 text-brand-dark hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 ${isScrolled && !isMobileMenuOpen ? 'bg-gray-100 text-brand-dark hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                <Instagram size={16} />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 ${isScrolled && !isMobileMenuOpen ? 'bg-gray-100 text-brand-dark hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                <Facebook size={16} />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 ${isScrolled && !isMobileMenuOpen ? 'bg-gray-100 text-brand-dark hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden relative z-[60] focus:outline-none ${mobileToggleColor}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white/40 backdrop-blur-2xl z-50 flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center space-y-8 w-full px-6 text-gray-800 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-800 hover:text-brand-dark text-3xl font-display font-light tracking-widest transition-colors w-full py-2 drop-shadow-sm font-semibold"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-wrap justify-center gap-4 mt-8 pt-8 border-t border-gray-400/30 w-full max-w-sm">
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-gray-800 hover:text-brand-dark hover:bg-white/40 hover:scale-110 transition-all duration-300 shadow-md border border-gray-400/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-gray-800 hover:text-brand-dark hover:bg-white/40 hover:scale-110 transition-all duration-300 shadow-md border border-gray-400/20"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-gray-800 hover:text-brand-dark hover:bg-white/40 hover:scale-110 transition-all duration-300 shadow-md border border-gray-400/20"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-gray-800 hover:text-brand-dark hover:bg-white/40 hover:scale-110 transition-all duration-300 shadow-md border border-gray-400/20"
                >
                  <Youtube size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;