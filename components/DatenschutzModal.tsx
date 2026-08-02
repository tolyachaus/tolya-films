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

                        {/* Section 1 */}
                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">
                                {isEn ? '1. Data Controller' : '1. Verantwortlicher'}
                            </h3>
                            <p>{isEn ? 'Responsible for data processing on this website pursuant to Art. 4 (7) GDPR:' : 'Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der DSGVO ist:'}</p>
                            <br />
                            <p className="font-medium text-brand-dark">Anatolii Rabochauskas</p>
                            <p>{isEn ? 'Operating commercially under the business name "Tolya Films"' : 'geschäftlich tätig unter der Bezeichnung „Tolya Films“'}</p>
                            <p>Heckerstraße 18</p>
                            <p>68199 Mannheim</p>
                            <p>{isEn ? 'Germany' : 'Deutschland'}</p>
                            <br />
                            <p>{isEn ? 'Phone: ' : 'Telefon: '}<a href="tel:+491609652965" className="hover:text-brand-gold transition-colors">+49 160 9652965</a></p>
                            <p>E-Mail: <a href="mailto:tolya.films@gmail.com" className="hover:text-brand-gold transition-colors">tolya.films@gmail.com</a></p>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">
                                {isEn ? '2. General Notes on Data Processing' : '2. Allgemeine Hinweise zur Datenverarbeitung'}
                            </h3>
                            <p>
                                {isEn
                                    ? 'Protecting your personal data is a priority for me. I process personal data strictly in accordance with statutory regulations, in particular the EU General Data Protection Regulation (GDPR) and the Telecommunications Digital Services Data Protection Act (TDDDG).'
                                    : 'Der Schutz Ihrer personenbezogenen Daten ist mir ein wichtiges Anliegen. Ich verarbeite personenbezogene Daten ausschließlich im Rahmen der gesetzlichen Vorschriften, insbesondere der Datenschutz-Grundverordnung (DSGVO) und des TDDDG.'}
                            </p>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">
                                {isEn ? '3. Web Hosting & Server Logs' : '3. Webhosting und Server-Logfiles'}
                            </h3>
                            <p>
                                {isEn
                                    ? 'This website is hosted via GitHub Pages (GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA). When accessing the site, technical log data (IP address, timestamp, browser type) is logged to guarantee technical safety.'
                                    : 'Diese Website wird über GitHub Pages (GitHub, Inc., San Francisco, CA, USA) gehostet. Beim Aufruf werden vom Server automatisch Logfiles (IP-Adresse, Uhrzeit, Browsertyp) erfasst.'}
                            </p>
                            <p className="mt-2"><strong>{isEn ? 'Legal Basis:' : 'Rechtsgrundlage:'}</strong> Art. 6 (1) lit. f GDPR.</p>
                        </section>

                        {/* Section 4 */}
                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">
                                {isEn ? '4. Booking Form & Inquiries (FormSubmit)' : '4. Anfrageformular & Kontaktaufnahme (FormSubmit)'}
                            </h3>
                            <p>
                                {isEn
                                    ? 'When sending an inquiry via our contact form, your provided details (names, email, wedding date, location, message) are transmitted securely via FormSubmit.co to tolya.films@gmail.com solely to handle your booking inquiry.'
                                    : 'Wenn Sie eine Anfrage über das Kontaktformular senden, werden Ihre Angaben (Namen, E-Mail, Hochzeitsdatum, Location, Nachricht) über den Dienst FormSubmit.co verschlüsselt an tolya.films@gmail.com übermittelt, um Ihre Buchung zu bearbeiten.'}
                            </p>
                            <p className="mt-2"><strong>{isEn ? 'Legal Basis:' : 'Rechtsgrundlage:'}</strong> Art. 6 (1) lit. b GDPR.</p>
                        </section>

                        {/* Section 5 - Detailed GA4 & Consent Mode v2 */}
                        <section className="p-4 bg-brand-gray/50 border-l-4 border-brand-gold">
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">
                                {isEn ? '5. Web Analytics (Google Analytics 4 & Consent Mode v2)' : '5. Webanalyse (Google Analytics 4 & Consent Mode v2)'}
                            </h3>
                            <p>
                                {isEn
                                    ? 'This website uses Google Analytics 4, a web analytics service provided by Google Ireland Limited ("Google"), Gordon House, Barrow Street, Dublin 4, Ireland.'
                                    : 'Diese Website nutzt Google Analytics 4, einen Webanalysedienst der Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.'}
                            </p>
                            <p className="mt-2">
                                {isEn
                                    ? 'Google Analytics is integrated using Google Consent Mode v2. Tracking scripts and cookies are strictly blocked by default until you explicitly consent via our Cookie Consent Banner by clicking "Accept All". If you reject optional cookies ("Reject All"), no analytics cookies or personal tracking scripts are executed.'
                                    : 'Google Analytics 4 ist über den Google Consent Mode v2 eingebunden. Analyse-Scripts und Cookies werden standardmäßig vollständig blockiert, bis Sie im Cookie-Banner ausdrücklich auf „Alle akzeptieren“ klicken. Wenn Sie ablehnen („Alle ablehnen“), werden keinerlei Analyse-Cookies gesetzt.'}
                            </p>
                            <p className="mt-2">
                                {isEn
                                    ? 'IP anonymization is enabled automatically in GA4. You may revoke or adjust your consent at any time with future effect by clicking the "COOKIE SETTINGS" link in the footer of this website.'
                                    : 'Die IP-Anonymisierung ist in GA4 automatisch aktiv. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft über den Link „COOKIE-EINSTELLUNGEN“ im Fußbereich dieser Website anpassen oder widerrufen.'}
                            </p>
                            <p className="mt-2"><strong>{isEn ? 'Legal Basis:' : 'Rechtsgrundlage:'}</strong> Art. 6 (1) lit. a GDPR & § 25 (1) TDDDG.</p>
                        </section>

                        {/* Section 6 */}
                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">
                                {isEn ? '6. Embedded Videos (YouTube Portfolio)' : '6. Eingebundene Videos (YouTube Portfolio)'}
                            </h3>
                            <p>
                                {isEn
                                    ? 'Our portfolio items embed YouTube videos (Google Ireland Limited). When playing a video, YouTube may set cookies and process user interaction data.'
                                    : 'In unserem Portfolio sind Videos der Plattform YouTube (Google Ireland Limited) eingebunden. Beim Abspielen können Daten an YouTube übertragen werden.'}
                            </p>
                        </section>

                        {/* Section 7 */}
                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">
                                {isEn ? '7. Your GDPR Rights' : '7. Ihre Rechte nach der DSGVO'}
                            </h3>
                            <p>
                                {isEn
                                    ? 'Under GDPR regulations, you have the right to access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction (Art. 18), data portability (Art. 20), and to object to processing (Art. 21).'
                                    : 'Sie haben im Rahmen der DSGVO das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch (Art. 21).'}
                            </p>
                        </section>

                        {/* Section 8 */}
                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">
                                {isEn ? '8. Right to Lodge a Complaint' : '8. Beschwerderecht bei der Aufsichtsbehörde'}
                            </h3>
                            <p>
                                {isEn
                                    ? 'You have the right to lodge a complaint with a competent data protection supervisory authority (e.g. Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg).'
                                    : 'Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde (z. B. Der Landesbeauftragte für den Datenschutz Baden-Württemberg) zu beschweren.'}
                            </p>
                            <p className="mt-4 font-bold">{isEn ? 'Status: 2026' : 'Stand: 2026'}</p>
                        </section>

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};

export default DatenschutzModal;
