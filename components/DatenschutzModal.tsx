import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../src/context/LanguageContext';

interface DatenschutzModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DatenschutzModal: React.FC<DatenschutzModalProps> = ({ isOpen, onClose }) => {
    const { language } = useLanguage();
    if (!isOpen) return null;

    const isEn = language === 'en';

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
                    className="bg-white max-w-3xl w-full p-8 md:p-12 relative shadow-2xl max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        aria-label="Close datenschutz"
                        className="absolute top-6 right-6 text-gray-400 hover:text-brand-dark transition-colors"
                    >
                        <X size={32} strokeWidth={1.5} />
                    </button>

                    <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-widest text-brand-dark mb-8">
                        {isEn ? 'Privacy Policy' : 'Datenschutzerklärung'}
                    </h2>

                    <div className="space-y-6 font-light leading-relaxed text-gray-700 text-sm md:text-base">

                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">
                                {isEn ? '1. Data Controller' : '1. Verantwortlicher'}
                            </h3>
                            <p>{isEn ? 'Responsible for data processing on this website:' : 'Verantwortlich für die Datenverarbeitung auf dieser Website ist:'}</p>
                            <br />
                            <p className="font-medium text-brand-dark">Anatolii Rabochauskas</p>
                            <p>{isEn ? 'Operating commercially under the name "Tolya Films"' : 'geschäftlich tätig unter der Bezeichnung „Tolya Films“'}</p>
                            <p>Heckerstraße 18</p>
                            <p>68199 Mannheim</p>
                            <p>{isEn ? 'Germany' : 'Deutschland'}</p>
                            <br />
                            <p>{isEn ? 'Phone: ' : 'Telefon: '}<a href="tel:+491609652965" className="hover:text-brand-gold transition-colors">+49 160 9652965</a></p>
                            <p>E-Mail: <a href="mailto:tolya.films@gmail.com" className="hover:text-brand-gold transition-colors">tolya.films@gmail.com</a></p>
                        </section>

                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">
                                {isEn ? '2. General Notes on Data Processing' : '2. Allgemeine Hinweise zur Datenverarbeitung'}
                            </h3>
                            <p>
                                {isEn
                                    ? 'Protecting your personal data is a priority for me. I process personal data strictly in accordance with statutory data protection regulations, in particular the EU General Data Protection Regulation (GDPR).'
                                    : 'Der Schutz Ihrer personenbezogenen Daten ist mir ein wichtiges Anliegen. Ich verarbeite personenbezogene Daten ausschließlich im Rahmen der gesetzlichen Vorschriften, insbesondere der Datenschutz-Grundverordnung (DSGVO).'}
                            </p>
                        </section>

                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">
                                {isEn ? '3. Hosting & Server Log Files' : '3. Hosting und Server-Logfiles'}
                            </h3>
                            <p>
                                {isEn
                                    ? 'This website is hosted via GitHub Pages (GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA).'
                                    : 'Diese Website wird über GitHub Pages (GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA) gehostet.'}
                            </p>
                            <p className="mt-2">
                                {isEn
                                    ? 'When visiting this website, server log files automatically capture information such as IP address, date & time, browser type, and operating system.'
                                    : 'Beim Besuch dieser Website werden durch den Webserver bzw. den Hosting-Anbieter automatisch Informationen in sogenannten Server-Logfiles erfasst.'}
                            </p>
                            <p className="mt-2"><strong>{isEn ? 'Legal Basis:' : 'Rechtsgrundlage:'}</strong> Art. 6 (1) lit. f GDPR.</p>
                        </section>

                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">
                                {isEn ? '4. Contacting Us (Email, Phone, WhatsApp)' : '4. Kontaktaufnahme (E-Mail, Telefon, WhatsApp)'}
                            </h3>
                            <p>
                                {isEn
                                    ? 'When contacting me by email, phone, or WhatsApp link, your data will be stored to process your inquiry.'
                                    : 'Wenn Sie mich per E-Mail, Telefon oder über einen WhatsApp-Link kontaktieren, verarbeite ich Ihre Angaben zur Bearbeitung Ihrer Anfrage.'}
                            </p>
                        </section>

                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">
                                {isEn ? '5. Cookies & Analytics' : '5. Cookies & Analytik'}
                            </h3>
                            <p>
                                {isEn
                                    ? 'Analytics cookies (Google Analytics 4) are loaded exclusively upon your explicit consent via Google Consent Mode v2.'
                                    : 'Analyse-Cookies (Google Analytics 4) werden ausschließlich nach Ihrer ausdrücklichen Einwilligung über den Google Consent Mode v2 geladen.'}
                            </p>
                        </section>

                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">
                                {isEn ? '6. Your GDPR Rights' : '6. Ihre Rechte nach der DSGVO'}
                            </h3>
                            <p>
                                {isEn
                                    ? 'Under the GDPR, you have the right to access, rectification, erasure, restriction of processing, data portability, and the right to object.'
                                    : 'Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) und Widerspruch (Art. 21 DSGVO).'}
                            </p>
                        </section>

                        <section>
                            <p className="mt-4 font-bold">{isEn ? 'Status: March 2026' : 'Stand: 03.03.2026'}</p>
                        </section>

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};

export default DatenschutzModal;
