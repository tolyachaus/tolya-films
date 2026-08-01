import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, TRANSLATIONS } from '../constants/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: typeof TRANSLATIONS['de'];
}

const STORAGE_KEY = 'tolya_films_lang_v1';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to German ('de') as requested
  const [lang, setLangState] = useState<Language>('de');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY) as Language;
        if (saved && (saved === 'de' || saved === 'en')) {
          setLangState(saved);
        }
      } catch (e) {
        // Fallback to 'de'
      }
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, newLang);
      } catch (e) {
        console.error('Failed to save language preference', e);
      }
    }
  };

  const toggleLang = () => {
    setLang(lang === 'de' ? 'en' : 'de');
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
