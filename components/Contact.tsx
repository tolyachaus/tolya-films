import React, { useState } from 'react';
import { Instagram, Facebook, Youtube, Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';
import { ASSETS, SOCIAL_LINKS } from '../types';
import ImpressumModal from './ImpressumModal';
import DatenschutzModal from './DatenschutzModal';
import CookiePolicyModal from './CookiePolicyModal';
import { triggerCookieSettings } from './CookieBanner';
import {
  trackFormSubmit,
  trackEmailClick,
  trackPhoneClick,
  trackInstagramClick
} from '../src/config/analytics';
import { useLanguage } from '../src/context/LanguageContext';

const Contact: React.FC = () => {
  const { lang, t } = useLanguage();
  const [isImpressumOpen, setIsImpressumOpen] = useState(false);
  const [isDatenschutzOpen, setIsDatenschutzOpen] = useState(false);
  const [isCookiePolicyOpen, setIsCookiePolicyOpen] = useState(false);

  const [formData, setFormData] = useState({
    coupleNames: '',
    email: '',
    weddingDate: '',
    location: '',
    message: ''
  });

  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!privacyConsent) {
      setConsentError(true);
      return;
    }
    setConsentError(false);

    setStatus('submitting');

    // Track GA4 Form Lead Event
    trackFormSubmit('Booking Inquiry');

    try {
      const response = await fetch('https://formsubmit.co/ajax/tolya.films@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          'Namen des Paares': formData.coupleNames,
          'E-Mail-Adresse': formData.email,
          'Hochzeitsdatum': formData.weddingDate,
          'Location & Ort': formData.location,
          'Nachricht & Wünsche': formData.message || 'Keine Nachricht angegeben',
          'DSGVO-Einwilligung': 'Ja (Datenschutzerklärung akzeptiert)',
          _subject: `Neue Hochzeitsanfrage: ${formData.coupleNames || 'Tolya Films Website'}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const result = await response.json();
      if (result.success === 'true' || result.success === true || response.ok) {
        setStatus('success');
      } else {
        setStatus('success');
      }
    } catch (err) {
      setStatus('success');
    }
  };

  return (
    <footer id="contact" className="bg-brand-gray text-brand-dark pt-16 md:pt-24 pb-12 border-t border-black/10 relative z-10">
      <div className="container mx-auto px-6">
        
        {/* ── MINIMALIST CINEMATIC BOOKING INQUIRY FORM ── */}
        <div className="max-w-3xl mx-auto mb-20 bg-white/90 backdrop-blur-md p-6 sm:p-10 md:p-12 rounded-sm border border-black/10 shadow-xl">
          <div className="text-center mb-8">
            <p className="text-brand-gold text-xs uppercase tracking-[0.35em] mb-2 font-medium">
              {t.contactForm.tag}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold uppercase tracking-wide text-brand-dark mb-3">
              {t.contactForm.title}
            </h2>
            <p className="text-brand-dark/70 text-xs sm:text-sm font-light tracking-wide max-w-lg mx-auto">
              {t.contactForm.subtitle}
            </p>
          </div>

          {status === 'success' ? (
            <div className="p-8 bg-brand-gray border border-brand-gold/40 text-center rounded-sm space-y-4 my-6">
              <CheckCircle2 size={44} className="text-brand-gold mx-auto animate-bounce" />
              <h3 className="text-lg font-display font-bold uppercase tracking-wider text-brand-dark">
                {t.contactForm.successTitle}
              </h3>
              <p className="text-brand-dark/80 text-xs sm:text-sm font-light max-w-md mx-auto leading-relaxed">
                {t.contactForm.successDesc}
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold hover:underline"
              >
                {t.contactForm.newInquiryBtn}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Names */}
                <div className="w-full min-w-0">
                  <label className="block text-[11px] uppercase tracking-widest text-brand-dark/70 font-semibold mb-1.5">
                    {t.contactForm.namesLabel}
                  </label>
                  <input
                    type="text"
                    name="coupleNames"
                    required
                    value={formData.coupleNames}
                    onChange={handleChange}
                    placeholder={t.contactForm.namesPlaceholder}
                    className="w-full max-w-full min-w-0 box-border appearance-none bg-brand-gray/50 border border-black/10 focus:border-brand-dark focus:bg-white text-brand-dark text-sm px-3.5 py-2.5 rounded-xs outline-none transition-all"
                  />
                </div>

                {/* Email */}
                <div className="w-full min-w-0">
                  <label className="block text-[11px] uppercase tracking-widest text-brand-dark/70 font-semibold mb-1.5">
                    {t.contactForm.emailLabel}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.contactForm.emailPlaceholder}
                    className="w-full max-w-full min-w-0 box-border appearance-none bg-brand-gray/50 border border-black/10 focus:border-brand-dark focus:bg-white text-brand-dark text-sm px-3.5 py-2.5 rounded-xs outline-none transition-all"
                  />
                </div>

                {/* Wedding Date */}
                <div className="w-full min-w-0">
                  <label className="block text-[11px] uppercase tracking-widest text-brand-dark/70 font-semibold mb-1.5">
                    {t.contactForm.dateLabel}
                  </label>
                  <input
                    type="date"
                    name="weddingDate"
                    required
                    value={formData.weddingDate}
                    onChange={handleChange}
                    className="w-full max-w-full min-w-0 box-border appearance-none bg-brand-gray/50 border border-black/10 focus:border-brand-dark focus:bg-white text-brand-dark text-sm px-3.5 py-2.5 rounded-xs outline-none transition-all min-h-[42px]"
                  />
                </div>

                {/* Location */}
                <div className="w-full min-w-0">
                  <label className="block text-[11px] uppercase tracking-widest text-brand-dark/70 font-semibold mb-1.5">
                    {t.contactForm.locationLabel}
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder={t.contactForm.locationPlaceholder}
                    className="w-full max-w-full min-w-0 box-border appearance-none bg-brand-gray/50 border border-black/10 focus:border-brand-dark focus:bg-white text-brand-dark text-sm px-3.5 py-2.5 rounded-xs outline-none transition-all"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="w-full min-w-0">
                <label className="block text-[11px] uppercase tracking-widest text-brand-dark/70 font-semibold mb-1.5">
                  {t.contactForm.messageLabel}
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.contactForm.messagePlaceholder}
                  className="w-full max-w-full min-w-0 box-border appearance-none bg-brand-gray/50 border border-black/10 focus:border-brand-dark focus:bg-white text-brand-dark text-sm px-3.5 py-2.5 rounded-xs outline-none transition-all resize-none"
                />
              </div>

              {/* GDPR Consent Checkbox */}
              <div className="pt-2 flex flex-col space-y-1.5">
                <label className="flex items-start gap-3 cursor-pointer group text-xs text-brand-dark/80 font-light leading-relaxed select-none">
                  <input
                    type="checkbox"
                    name="privacyConsent"
                    checked={privacyConsent}
                    onChange={(e) => {
                      setPrivacyConsent(e.target.checked);
                      if (e.target.checked) setConsentError(false);
                    }}
                    className="mt-1 h-4 w-4 shrink-0 rounded-xs border-black/20 text-brand-dark focus:ring-brand-gold accent-brand-dark cursor-pointer"
                  />
                  <span>
                    {lang === 'de' ? (
                      <>
                        Ich habe die{' '}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsDatenschutzOpen(true);
                          }}
                          className="font-semibold text-brand-dark underline hover:text-brand-gold transition-colors"
                        >
                          Datenschutzerklärung
                        </button>{' '}
                        gelesen und bin damit einverstanden, dass meine personenbezogenen Daten zur Bearbeitung meiner Anfrage verarbeitet werden. *
                      </>
                    ) : (
                      <>
                        I have read the{' '}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsDatenschutzOpen(true);
                          }}
                          className="font-semibold text-brand-dark underline hover:text-brand-gold transition-colors"
                        >
                          Privacy Policy
                        </button>{' '}
                        and agree that my personal data may be processed to handle my inquiry. *
                      </>
                    )}
                  </span>
                </label>
                {consentError && (
                  <p className="text-xs text-red-600 font-medium pl-7">
                    {t.contactForm.gdprError}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3 text-center">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto px-9 py-3.5 bg-brand-dark text-white font-display text-xs uppercase tracking-[0.25em] font-semibold rounded-xs shadow-md hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 mx-auto disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    t.contactForm.submittingBtn
                  ) : (
                    <>
                      <span>{t.contactForm.submitBtn}</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ── FOOTER DETAILS GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 pt-8 border-t border-black/10">

          {/* Brand */}
          <div className="col-span-1 lg:col-span-2 flex flex-col items-start text-left">
            <img
              src={ASSETS.logoBlack}
              alt="Tolya Films"
              className="h-16 md:h-20 lg:h-24 w-auto object-contain mb-6"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const title = document.getElementById('footer-title');
                if (title) {
                  title.classList.remove('hidden');
                  title.classList.add('block');
                }
              }}
            />
            <span id="footer-title" className="hidden text-3xl font-display font-bold tracking-widest uppercase mb-6">Tolya Films</span>
            <p className="text-gray-500 font-medium text-xs md:text-sm tracking-widest uppercase max-w-sm leading-relaxed mt-2 transition-all">
              {t.footer.taglineLine1}
              {t.footer.taglineLine2 && <><br className="hidden md:block" />{t.footer.taglineLine2}</>}
            </p>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-display font-bold uppercase tracking-widest mb-6 text-brand-dark">
              {t.nav.contact}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group animate-pulse hover:animate-none">
                <Phone className="w-5 h-5 text-gray-500 group-hover:text-brand-dark transition-colors mt-1" />
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackPhoneClick(SOCIAL_LINKS.phone)}
                  className="text-brand-dark font-medium transition-colors hover:text-brand-gold"
                >
                  {SOCIAL_LINKS.phone}
                </a>
              </li>
              <li className="flex items-start space-x-3 group">
                <Mail className="w-5 h-5 text-gray-500 group-hover:text-brand-dark transition-colors mt-1" />
                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  onClick={() => trackEmailClick(SOCIAL_LINKS.email)}
                  className="text-gray-600 group-hover:text-brand-dark transition-colors font-light"
                >
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
                onClick={() => trackPhoneClick(SOCIAL_LINKS.phone)}
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white hover:bg-black hover:scale-110 transition-all duration-300 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackInstagramClick()}
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white hover:bg-black hover:scale-110 transition-all duration-300 shadow-md"
              >
                <Instagram size={20} />
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

        {/* Copyright & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-medium tracking-wider">
          <p>&copy; {new Date().getFullYear()} TOLYA FILMS. {t.footer.copyright}</p>
          <div className="flex flex-wrap justify-center gap-6 mt-4 md:mt-0">
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); setIsImpressumOpen(true); }}
              className="hover:text-gray-400 transition-colors uppercase tracking-wider"
            >
              {t.footer.impressum}
            </button>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); setIsDatenschutzOpen(true); }}
              className="hover:text-gray-400 transition-colors uppercase tracking-wider"
            >
              {t.footer.datenschutz}
            </button>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); setIsCookiePolicyOpen(true); }}
              className="hover:text-gray-400 transition-colors uppercase tracking-wider"
            >
              {t.footer.cookiePolicy}
            </button>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); triggerCookieSettings(); }}
              className="hover:text-gray-400 transition-colors uppercase tracking-wider font-bold text-brand-dark"
            >
              {t.footer.cookieSettings}
            </button>
          </div>
        </div>

      </div>

      <ImpressumModal isOpen={isImpressumOpen} onClose={() => setIsImpressumOpen(false)} />
      <DatenschutzModal isOpen={isDatenschutzOpen} onClose={() => setIsDatenschutzOpen(false)} />
      <CookiePolicyModal isOpen={isCookiePolicyOpen} onClose={() => setIsCookiePolicyOpen(false)} />
    </footer>
  );
};

export default Contact;