import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings, Check, X } from 'lucide-react';
import {
  getConsentPreferences,
  updateConsentState,
  initConsentMode
} from '../src/config/analytics';
import { useLanguage } from '../src/context/LanguageContext';

export const OPEN_COOKIE_SETTINGS_EVENT = 'tolya_open_cookie_settings';

export const triggerCookieSettings = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
  }
};

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // 1. Initialize Consent Mode Default State immediately
    initConsentMode();

    // 2. Check if user already saved consent
    const saved = getConsentPreferences();
    if (!saved) {
      // Show banner after short delay for smooth page entry
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    } else {
      setAnalyticsConsent(saved.analytics);
    }
  }, []);

  useEffect(() => {
    // Listen for footer "Cookie-Einstellungen" click event
    const handleOpenSettings = () => {
      const saved = getConsentPreferences();
      setAnalyticsConsent(saved ? saved.analytics : false);
      setShowSettingsModal(true);
    };

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpenSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpenSettings);
  }, []);

  const handleAcceptAll = () => {
    updateConsentState(true);
    setAnalyticsConsent(true);
    setIsVisible(false);
    setShowSettingsModal(false);
  };

  const handleRejectOptional = () => {
    updateConsentState(false);
    setAnalyticsConsent(false);
    setIsVisible(false);
    setShowSettingsModal(false);
  };

  const handleSaveCustom = () => {
    updateConsentState(analyticsConsent);
    setIsVisible(false);
    setShowSettingsModal(false);
  };

  return (
    <>
      {/* ── SLIDE-UP BOTTOM BANNER ── */}
      <AnimatePresence>
        {isVisible && !showSettingsModal && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-[90] bg-brand-dark/95 backdrop-blur-xl text-white p-6 rounded-sm border border-white/10 shadow-2xl"
          >
            <div className="flex items-start gap-3 mb-3">
              <Cookie size={24} className="text-brand-gold shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                  {t.cookie.title}
                </h3>
                <p className="text-gray-300 text-xs font-light leading-relaxed mt-1">
                  {t.cookie.desc}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mt-4 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 py-2.5 px-4 bg-white text-brand-dark font-display text-[11px] font-bold uppercase tracking-wider rounded-xs hover:bg-brand-gold hover:text-white transition-all shadow-md text-center"
              >
                {t.cookie.acceptAll}
              </button>
              <button
                type="button"
                onClick={handleRejectOptional}
                className="flex-1 py-2.5 px-4 bg-white/15 text-white border border-white/20 font-display text-[11px] font-bold uppercase tracking-wider rounded-xs hover:bg-white/25 transition-all text-center"
              >
                {t.cookie.rejectOptional}
              </button>
              <button
                type="button"
                onClick={() => setShowSettingsModal(true)}
                aria-label="Cookie Einstellungen"
                className="py-2.5 px-3 bg-white/5 text-gray-300 hover:text-white border border-white/10 rounded-xs transition-colors flex items-center justify-center gap-1.5 text-[11px] font-medium uppercase tracking-wider"
              >
                <Settings size={14} />
                <span className="sm:hidden">{t.cookie.settingsBtn}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── DETAILED SETTINGS MODAL ── */}
      <AnimatePresence>
        {showSettingsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
            onClick={() => setShowSettingsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-brand-dark max-w-lg w-full p-6 sm:p-8 rounded-sm shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSettingsModal(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-brand-dark transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Settings size={22} className="text-brand-gold" />
                <h3 className="font-display text-xl font-bold uppercase tracking-wider text-brand-dark">
                  Cookie-Einstellungen
                </h3>
              </div>
              <p className="text-xs text-gray-600 font-light mb-6">
                Passen Sie Ihre persönlichen Einstellungen bezüglich der Verwendung von Cookies auf unserer Website an.
              </p>

              <div className="space-y-4 mb-8">
                {/* Essential Cookies */}
                <div className="p-4 bg-brand-gray/60 border border-black/5 rounded-xs flex items-center justify-between">
                  <div>
                    <p className="font-bold text-xs uppercase tracking-wider text-brand-dark">
                      Technisch Notwendig
                    </p>
                    <p className="text-[11px] text-gray-500 font-light mt-0.5">
                      Essentiell für die Grundfunktionen der Website. Immer aktiv.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-black/10 text-gray-600 rounded-xs">
                    Immer aktiv
                  </span>
                </div>

                {/* Analytics Cookies */}
                <div className="p-4 bg-brand-gray/60 border border-black/5 rounded-xs flex items-center justify-between">
                  <div className="pr-4">
                    <p className="font-bold text-xs uppercase tracking-wider text-brand-dark">
                      Google Analytics 4 (Anonymisiert)
                    </p>
                    <p className="text-[11px] text-gray-500 font-light mt-0.5">
                      Ermöglicht uns die anonyme statistische Auswertung der Nutzung.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsConsent}
                      onChange={(e) => setAnalyticsConsent(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-dark"></div>
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="w-full sm:flex-1 py-3 px-4 bg-brand-dark text-white font-display text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-black transition-all flex items-center justify-center gap-2"
                >
                  <Check size={14} />
                  <span>Auswahl Speichern</span>
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="w-full sm:w-auto py-3 px-4 text-xs uppercase tracking-widest font-semibold text-brand-gold hover:underline"
                >
                  Alle Akzeptieren
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieBanner;
