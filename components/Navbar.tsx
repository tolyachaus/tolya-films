import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook, Youtube } from 'lucide-react';
import { ASSETS, SOCIAL_LINKS } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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

  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for the home page to render before scrolling
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Über mich', href: '#about' },
    { name: 'Kontakt', href: '#contact' },
  ];

  const docLink = { name: 'Documentary / Commercial', to: '/documentary' };

  const isLightBgPage = location.pathname === '/documentary' || location.pathname.startsWith('/wedding');
  const isDarkNavbarText = isScrolled || isLightBgPage;

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navBackgroundClass = isMobileMenuOpen
    ? 'bg-transparent py-3'
    : isDarkNavbarText
      ? 'bg-white/95 backdrop-blur-md py-2.5 shadow-sm'
      : 'bg-transparent py-3 md:py-4';

  const desktopLogoSrc = isDarkNavbarText ? ASSETS.logoBlack : ASSETS.logoWhite;
  const mobileLogoSrc = ASSETS.logoBlack;
  const desktopTextColor = isDarkNavbarText && !isMobileMenuOpen ? 'text-brand-dark' : 'text-white';
  const mobileToggleColor = isMobileMenuOpen ? 'text-brand-dark' : (isDarkNavbarText ? 'text-brand-dark' : 'text-brand-dark md:text-white');
  const underlineClass = isDarkNavbarText && !isMobileMenuOpen ? 'bg-brand-dark' : 'bg-white';
  const iconStyleClass = isDarkNavbarText && !isMobileMenuOpen ? 'bg-gray-100 text-brand-dark hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${navBackgroundClass}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="/" onClick={handleLogoClick} className="relative group z-[60]">
            <img
              src={isMobileMenuOpen ? ASSETS.logoBlack : desktopLogoSrc}
              alt="Tolya Films"
              className="h-10 md:h-12 lg:h-14 w-auto object-contain transition-all duration-300 hidden md:block"
            />
            <img
              src={mobileLogoSrc}
              alt="Tolya Films"
              className="h-9 sm:h-10 w-auto object-contain transition-all duration-300 md:hidden"
            />
            <span className={`hidden text-xl font-display font-bold ${isMobileMenuOpen || isDarkNavbarText ? "text-brand-dark" : "text-brand-dark md:text-white"} tracking-widest uppercase`}>Tolya Films</span>
          </a>

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center space-x-10 ${desktopTextColor}`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-medium uppercase tracking-widest hover:opacity-70 transition-opacity relative group"
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${underlineClass}`}></span>
              </a>
            ))}
            <Link
              to={docLink.to}
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (location.pathname === '/documentary') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="text-xs font-medium uppercase tracking-widest hover:opacity-70 transition-opacity relative group"
            >
              {docLink.name}
              <span className={`absolute -bottom-2 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${underlineClass}`}></span>
            </Link>
            <div className={`flex items-center gap-3 pl-4 border-l ${isDarkNavbarText && !isMobileMenuOpen ? 'border-brand-dark/20' : 'border-white/20'}`}>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 ${iconStyleClass}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 ${iconStyleClass}`}
              >
                <Instagram size={15} />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 ${iconStyleClass}`}
              >
                <Youtube size={15} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden relative z-[60] focus:outline-none ${mobileToggleColor}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
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
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-gray-800 hover:text-brand-dark text-3xl font-display font-light tracking-widest transition-colors w-full py-2 drop-shadow-sm font-semibold"
                >
                  {link.name}
                </a>
              ))}
              <Link
                to={docLink.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-800 hover:text-brand-dark text-2xl font-display font-light tracking-widest transition-colors w-full py-2 drop-shadow-sm font-semibold"
              >
                {docLink.name}
              </Link>
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