import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DatenschutzModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DatenschutzModal: React.FC<DatenschutzModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

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
                        Datenschutzerklärung
                    </h2>

                    <div className="space-y-6 font-light leading-relaxed text-gray-700 text-sm md:text-base">

                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">1. Verantwortlicher</h3>
                            <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
                            <br />
                            <p className="font-medium text-brand-dark">Anatolii Rabochauskas</p>
                            <p>geschäftlich tätig unter der Bezeichnung „Tolya Films“</p>
                            <p>Heckerstraße 18</p>
                            <p>68199 Mannheim</p>
                            <p>Deutschland</p>
                            <br />
                            <p>Telefon: <a href="tel:+491609652965" className="hover:text-brand-gold transition-colors">+49 160 9652965</a></p>
                            <p>E-Mail: <a href="mailto:tolya.films@gmail.com" className="hover:text-brand-gold transition-colors">tolya.films@gmail.com</a></p>
                        </section>

                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">2. Allgemeine Hinweise zur Datenverarbeitung</h3>
                            <p>Der Schutz Ihrer personenbezogenen Daten ist mir ein wichtiges Anliegen. Ich verarbeite personenbezogene Daten ausschließlich im Rahmen der gesetzlichen Vorschriften, insbesondere der Datenschutz-Grundverordnung (DSGVO).</p>
                            <p className="mt-2">Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können oder die einer Person zugeordnet werden können (z. B. IP-Adresse).</p>
                            <p className="mt-2">Diese Datenschutzerklärung informiert über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten auf dieser Website.</p>
                        </section>

                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">3. Hosting und Server-Logfiles</h3>
                            <p>Diese Website wird über GitHub Pages (GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA) gehostet.</p>
                            <p className="mt-2">Beim Besuch dieser Website werden durch den Webserver bzw. den Hosting-Anbieter automatisch Informationen in sogenannten Server-Logfiles erfasst. Dies können insbesondere sein:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>IP-Adresse</li>
                                <li>Datum und Uhrzeit des Zugriffs</li>
                                <li>aufgerufene Seite / Datei</li>
                                <li>Referrer-URL (falls übermittelt)</li>
                                <li>Browsertyp und Browserversion</li>
                                <li>verwendetes Betriebssystem</li>
                            </ul>
                            <p className="mt-2">Die Verarbeitung dieser Daten erfolgt zur technischen Bereitstellung der Website sowie zur Gewährleistung von Stabilität und Sicherheit.</p>
                            <p className="mt-2"><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und funktionsfähigen Webauftritt).</p>
                        </section>

                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">4. Kontaktaufnahme (E-Mail, Telefon, WhatsApp)</h3>
                            <p>Wenn Sie mich per E-Mail, Telefon oder über einen WhatsApp-Link kontaktieren, verarbeite ich Ihre Angaben zur Bearbeitung Ihrer Anfrage und für den Fall von Anschlussfragen.</p>
                            <p className="mt-2">Verarbeitet werden können insbesondere:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Name</li>
                                <li>E-Mail-Adresse</li>
                                <li>Telefonnummer</li>
                                <li>Inhalt der Nachricht</li>
                                <li>Kommunikationsdaten / Zeitpunkt der Kontaktaufnahme</li>
                            </ul>
                            <p className="mt-2"><strong>Rechtsgrundlagen:</strong></p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen / Vertrag), sofern Ihre Anfrage auf eine Beauftragung abzielt.</li>
                                <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Kommunikation und Bearbeitung von Anfragen).</li>
                            </ul>
                            <p className="mt-2 font-medium">Hinweis zu WhatsApp:</p>
                            <p>Bei einer Kontaktaufnahme über WhatsApp können personenbezogene Daten an WhatsApp Ireland Limited bzw. Unternehmen der Meta-Gruppe übermittelt werden. Die Nutzung von WhatsApp erfolgt freiwillig.</p>
                        </section>

                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">5. Links zu externen Plattformen / Social Media</h3>
                            <p>Auf dieser Website befinden sich Links zu externen Plattformen und sozialen Netzwerken, insbesondere:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Instagram</li>
                                <li>YouTube</li>
                                <li>Facebook</li>
                                <li>WhatsApp</li>
                            </ul>
                            <p className="mt-2">Soweit technisch umgesetzt, handelt es sich hierbei um reine Verlinkungen. Beim bloßen Besuch dieser Website werden durch diese Links grundsätzlich noch keine Daten an die jeweiligen Anbieter übertragen. Erst durch das aktive Anklicken eines Links verlassen Sie diese Website und es gelten die Datenschutzbestimmungen des jeweiligen Anbieters.</p>
                        </section>

                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">6. Videos und externe Inhalte (Portfolio)</h3>
                            <p>Das Hauptvideo auf der Website wird nicht über YouTube eingebunden.</p>
                            <p className="mt-2">Weitere Portfolio-Arbeiten werden – soweit technisch umgesetzt – erst nach einer aktiven Handlung der Nutzerin / des Nutzers (z. B. Klick auf einen Link oder ein Vorschauelement) aufgerufen. Erst in diesem Zusammenhang kann eine Verbindung zu externen Plattformen (z. B. YouTube) hergestellt werden.</p>
                            <p className="mt-2">Bitte beachten Sie, dass ab dem Aufruf externer Inhalte die Datenschutzbestimmungen des jeweiligen Anbieters gelten.</p>
                        </section>

                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">7. Schriftarten (lokal eingebundene Fonts)</h3>
                            <p>Auf dieser Website werden Schriftarten verwendet, die lokal auf dem eigenen Webserver eingebunden sind.</p>
                            <p className="mt-2">Beim Laden dieser Schriftarten wird keine Verbindung zu Servern von Google oder anderen externen Anbietern allein zum Abruf der Schriftarten hergestellt.</p>
                        </section>

                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">8. Cookies / technisch erforderliche Funktionen</h3>
                            <p>Diese Website kann technisch erforderliche Funktionen verwenden, die für den Betrieb und die Darstellung der Website notwendig sind.</p>
                            <p className="mt-2 text-brand-dark font-medium">Nach aktuellem Stand werden auf dieser Website keine eigenen Analyse- oder Marketing-Tracking-Tools (z. B. Google Analytics, Google Tag Manager, Meta Pixel) eingesetzt.</p>
                            <p className="mt-2">Sollten künftig zusätzliche Dienste oder Tracking-/Analyse-Tools eingesetzt werden, wird diese Datenschutzerklärung entsprechend aktualisiert.</p>
                        </section>

                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">9. Ihre Rechte nach der DSGVO</h3>
                            <p>Sie haben im Rahmen der gesetzlichen Vorgaben insbesondere folgende Rechte:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                                <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                                <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                                <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">10. Beschwerderecht bei einer Aufsichtsbehörde</h3>
                            <p>Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.</p>
                        </section>

                        <section>
                            <h3 className="font-display font-bold text-lg text-brand-dark mb-2">11. Aktualität und Änderung dieser Datenschutzerklärung</h3>
                            <p>Ich behalte mir vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen meiner Website bzw. der eingesetzten Dienste umzusetzen.</p>
                            <p className="mt-4 font-bold">Stand: 03.03.2026</p>
                        </section>

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};

export default DatenschutzModal;
