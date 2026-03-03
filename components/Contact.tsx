import React, { useState } from 'react';
import { Instagram, Facebook, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { ASSETS, SOCIAL_LINKS } from '../types';
import ImpressumModal from './ImpressumModal';
import DatenschutzModal from './DatenschutzModal';

const Contact: React.FC = () => {
  const [isImpressumOpen, setIsImpressumOpen] = useState(false);
  const [isDatenschutzOpen, setIsDatenschutzOpen] = useState(false);

  return (
    <footer id="contact" className="bg-brand-gray text-brand-dark pt-24 pb-12 border-t border-black/10 relative z-10">
      <div className="container mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <img
              src={ASSETS.logoBlack}
              alt="Tolya Films"
              className="h-12 mb-6"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const title = document.getElementById('footer-title');
                if (title) title.style.display = 'block';
              }}
            />
            <span id="footer-title" className="hidden text-3xl font-display font-bold tracking-widest uppercase mb-6">Tolya Films</span>
            <p className="text-gray-600 font-light max-w-sm leading-relaxed">
              Jede Geschichte verdient es, gesehen zu werden.
            </p>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-display font-bold uppercase tracking-widest mb-6 text-brand-dark">
              Kontakt
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group animate-pulse hover:animate-none">
                <Phone className="w-5 h-5 text-gray-500 group-hover:text-brand-dark transition-colors mt-1" />
                <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-brand-dark font-medium transition-colors hover:text-brand-gold">
                  {SOCIAL_LINKS.phone}
                </a>
              </li>
              <li className="flex items-start space-x-3 group">
                <Mail className="w-5 h-5 text-gray-500 group-hover:text-brand-dark transition-colors mt-1" />
                <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-gray-600 group-hover:text-brand-dark transition-colors font-light">
                  {SOCIAL_LINKS.email}
                </a>
              </li>
              <li className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 text-gray-500 group-hover:text-brand-dark transition-colors mt-1" />
                <span className="text-gray-600 group-hover:text-brand-dark transition-colors font-light">
                  Deutschland, Mannheim
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-1">
            <h3 className="text-lg font-display font-bold uppercase tracking-widest mb-6 text-brand-dark">
              Social Media
            </h3>
            <div className="flex flex-wrap gap-4">
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white hover:bg-black hover:scale-110 transition-all duration-300 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white hover:bg-black hover:scale-110 transition-all duration-300 shadow-md"
              >
                <Instagram size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white hover:bg-black hover:scale-110 transition-all duration-300 shadow-md"
              >
                <Facebook size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white hover:bg-black hover:scale-110 transition-all duration-300 shadow-md"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-medium tracking-wider">
          <p>&copy; {new Date().getFullYear()} TOLYA FILMS. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); setIsImpressumOpen(true); }}
              className="hover:text-gray-400 transition-colors uppercase tracking-wider"
            >
              IMPRESSUM
            </button>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); setIsDatenschutzOpen(true); }}
              className="hover:text-gray-400 transition-colors uppercase tracking-wider"
            >
              DATENSCHUTZ
            </button>
          </div>
        </div>

      </div>

      <ImpressumModal isOpen={isImpressumOpen} onClose={() => setIsImpressumOpen(false)} />
      <DatenschutzModal isOpen={isDatenschutzOpen} onClose={() => setIsDatenschutzOpen(false)} />
    </footer>
  );
};

export default Contact;