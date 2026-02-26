import React from 'react';
import { Instagram, Facebook, Youtube, Mail, MapPin } from 'lucide-react';
import { ASSETS, SOCIAL_LINKS } from '../types';

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-black text-white pt-24 pb-12 border-t border-white/10 relative z-10">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
             <img 
                src={ASSETS.logoWhite} 
                alt="Tolya Films" 
                className="h-12 mb-6"
                onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const title = document.getElementById('footer-title');
                    if(title) title.style.display = 'block';
                }}
            />
            <span id="footer-title" className="hidden text-3xl font-display font-bold tracking-widest uppercase mb-6">Tolya Films</span>
            <p className="text-gray-400 font-light max-w-sm leading-relaxed">
              Professionelle Videoproduktion mit Leidenschaft für Detail und Rhythmus. 
              Lassen Sie uns Ihre Geschichte erzählen.
            </p>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-display font-bold uppercase tracking-widest mb-6 text-gray-200">
              Kontakt
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <Mail className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors mt-1" />
                <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-gray-400 group-hover:text-white transition-colors font-light">
                  {SOCIAL_LINKS.email}
                </a>
              </li>
              <li className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors mt-1" />
                <span className="text-gray-400 group-hover:text-white transition-colors font-light">
                  Deutschland, Mannheim
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-1">
            <h3 className="text-lg font-display font-bold uppercase tracking-widest mb-6 text-gray-200">
              Social Media
            </h3>
            <div className="flex space-x-4">
                <a 
                  href={SOCIAL_LINKS.instagram}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                >
                    <Instagram size={20} />
                </a>
                <a 
                  href={SOCIAL_LINKS.facebook}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                >
                    <Facebook size={20} />
                </a>
                <a 
                  href={SOCIAL_LINKS.youtube}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
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
                <a href="#" className="hover:text-gray-400 transition-colors">IMPRESSUM</a>
                <a href="#" className="hover:text-gray-400 transition-colors">DATENSCHUTZ</a>
            </div>
        </div>

      </div>
    </footer>
  );
};

export default Contact;