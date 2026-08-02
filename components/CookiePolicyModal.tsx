import React from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../src/context/LanguageContext';

interface CookiePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CookiePolicyModal: React.FC<CookiePolicyModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  if (!isOpen) return null;

  const isEn = lang === 'en';

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md text-brand-dark p-4 md:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white max-w-2xl w-full p-8 md:p-12 relative shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            aria-label="Close cookie policy"
            className="absolute top-6 right-6 text-gray-400 hover:text-brand-dark transition-colors"
          >
            <X size={32} strokeWidth={1.5} />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck size={28} className="text-brand-gold" />
            <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-widest text-brand-dark">
              {isEn ? 'Cookie Policy' : 'Cookie-Richtlinie'}
            </h2>
          </div>
          <p className="font-medium text-xs uppercase tracking-widest text-gray-500 mb-8">
            {isEn ? 'GDPR & EU Directive on Processing Personal Data' : 'DSGVO & EU-Richtlinie über die Verarbeitung personenbezogener Daten'}
          </p>

          <div className="space-y-6 font-light leading-relaxed text-gray-700 text-sm">
            <div>
              <h3 className="font-display text-lg tracking-wider font-bold text-brand-dark mb-2">
                {isEn ? '1. What are Cookies?' : '1. Was sind Cookies?'}
              </h3>
              <p>
                {isEn
                  ? 'Cookies are small text files stored on your device when you visit a website. They serve to ensure basic functionality and gather anonymous usage statistics.'
                  : 'Cookies sind kleine Textdateien, die von Webseiten auf Ihrem Endgerät gespeichert werden, wenn Sie diese besuchen. Sie dienen dazu, die Funktionsfähigkeit der Website zu gewährleisten und anonyme Informationen zur Nutzung zu erfassen.'}
              </p>
            </div>

            <div>
              <h3 className="font-display text-lg tracking-wider font-bold text-brand-dark mb-2">
                {isEn ? '2. Types of Cookies Used' : '2. Verwendete Arten von Cookies'}
              </h3>
              <div className="space-y-3 mt-3">
                <div className="p-4 bg-brand-gray/60 border-l-2 border-brand-dark">
                  <p className="font-bold text-brand-dark">
                    {isEn ? 'Technically Necessary Cookies (Essential)' : 'Technisch notwendige Cookies (Essentiell)'}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {isEn
                      ? 'These cookies are strictly necessary for the core operation of the website (e.g. navigation, saving your cookie consent). They do not require consent.'
                      : 'Diese Cookies sind für das grundlegende Funktionieren der Website unerlässlich (z. B. Navigation, Speicherung Ihrer Cookie-Einwilligung). Sie erfordern keine Einwilligung.'}
                  </p>
                </div>
                <div className="p-4 bg-brand-gray/60 border-l-2 border-brand-gold">
                  <p className="font-bold text-brand-dark">
                    {isEn ? 'Analytics Cookies (Google Analytics 4)' : 'Analytische Cookies (Google Analytics 4)'}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {isEn
                      ? 'Help us understand how visitors interact with the site. This data is pseudonymized and loaded only with your explicit consent (Google Consent Mode v2).'
                      : 'Helfen uns zu verstehen, wie Besucher mit der Website interagieren. Diese Daten werden pseudonymisiert verarbeitet und nur mit Ihrer ausdrücklichen Einwilligung geladen (Google Consent Mode v2).'}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg tracking-wider font-bold text-brand-dark mb-2">
                {isEn ? '3. Your Consent & Right to Object' : '3. Ihre Einwilligung & Einspruchsrecht'}
              </h3>
              <p>
                {isEn
                  ? 'You can adjust or revoke your consent for analytical cookies at any time via the "Cookie Settings" link in the footer of this website.'
                  : 'Sie können Ihre Einwilligung zur Nutzung von Analyse-Cookies jederzeit über den Link „Cookie-Einstellungen“ im Fußbereich dieser Website anpassen oder widerrufen.'}
              </p>
            </div>

            <div>
              <h3 className="font-display text-lg tracking-wider font-bold text-brand-dark mb-2">
                {isEn ? '4. Retention Period' : '4. Speicherdauer'}
              </h3>
              <p>
                {isEn
                  ? 'Essential settings are stored on your device for up to 12 months. Analytics data in Google Analytics is automatically deleted after 2 months.'
                  : 'Essentielle Einstellungen werden für bis zu 12 Monate auf Ihrem Gerät gespeichert. Analytische Daten in Google Analytics werden nach spätestens 2 Monaten automatisch gelöscht.'}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default CookiePolicyModal;
