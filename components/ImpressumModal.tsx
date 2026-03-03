import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImpressumModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ImpressumModal: React.FC<ImpressumModalProps> = ({ isOpen, onClose }) => {
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
                    className="bg-white max-w-2xl w-full p-8 md:p-12 relative shadow-2xl max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        aria-label="Close impressum"
                        className="absolute top-6 right-6 text-gray-400 hover:text-brand-dark transition-colors"
                    >
                        <X size={32} strokeWidth={1.5} />
                    </button>

                    <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-widest text-brand-dark mb-4">
                        Impressum
                    </h2>
                    <p className="font-bold mb-8">Angaben gemäß § 5 DDG</p>

                    <div className="space-y-8 font-light leading-relaxed text-gray-700">
                        <div>
                            <p className="font-medium text-brand-dark text-lg">Anatolii Rabochauskas</p>
                            <p>geschäftlich tätig unter der Bezeichnung „Tolya Films“</p>
                            <p>Heckerstraße 18</p>
                            <p>68199 Mannheim</p>
                            <p>Deutschland</p>
                        </div>

                        <div>
                            <h3 className="font-display text-xl tracking-wider font-bold text-brand-dark mb-3">Kontakt</h3>
                            <p>Telefon: <a href="tel:+491609652965" className="hover:text-brand-gold transition-colors">+49 160 9652965</a></p>
                            <p>E-Mail: <a href="mailto:tolya.films@gmail.com" className="hover:text-brand-gold transition-colors">tolya.films@gmail.com</a></p>
                        </div>

                        <div>
                            <h3 className="font-display text-xl tracking-wider font-bold text-brand-dark mb-3">Berufsbezeichnung</h3>
                            <p>Videograf / Videoproduktion</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};

export default ImpressumModal;
