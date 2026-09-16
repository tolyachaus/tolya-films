import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ShieldCheck, PenTool, RotateCcw, Send, Globe, Instagram, Youtube, Film, Facebook, Printer, Download } from 'lucide-react';
import { ASSETS } from '../../types';
import { useLanguage } from '../../src/context/LanguageContext';
import { generateReleasePDF } from '../../src/utils/pdfGenerator';

const MediaRelease: React.FC = () => {
  const { lang, setLang } = useLanguage();
  const isEn = lang === 'en';

  // Automatically detect language from URL parameters or routes (e.g. ?lang=en or /release-en)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      if (url.includes('lang=en') || url.includes('/release/en') || url.includes('/release-en') || url.includes('/media-release-en')) {
        setLang('en');
      } else if (url.includes('lang=de')) {
        setLang('de');
      }
    }
  }, []);

  const [formData, setFormData] = useState({
    partner1Name: '',
    partner2Name: '',
    weddingDate: '',
    location: '',
    email: ''
  });

  const [signedData, setSignedData] = useState<{
    partner1Name: string;
    partner2Name: string;
    weddingDate: string;
    location: string;
    email: string;
    signatureUrl: string;
    timestamp: string;
    lang?: 'de' | 'en';
  } | null>(null);

  const [consentChecked, setConsentChecked] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    partner1Name?: boolean;
    partner2Name?: boolean;
    weddingDate?: boolean;
    location?: boolean;
    email?: boolean;
    consent?: boolean;
    signature?: boolean;
  }>({});

  const [isSigned, setIsSigned] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Input & Section Refs for Smooth Auto-Scroll Validation
  const partner1Ref = useRef<HTMLDivElement | null>(null);
  const partner2Ref = useRef<HTMLDivElement | null>(null);
  const weddingDateRef = useRef<HTMLDivElement | null>(null);
  const locationRef = useRef<HTMLDivElement | null>(null);
  const emailRef = useRef<HTMLDivElement | null>(null);
  const consentRef = useRef<HTMLDivElement | null>(null);
  const signatureRef = useRef<HTMLDivElement | null>(null);

  // Canvas signature ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);


  // Initialize and resize Canvas (preserve drawn signature across mobile keyboard resizes)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let prevWidth = 0;

    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0) return;
      // Do not re-allocate canvas size if width hasn't changed (prevents erasing drawn content on mobile keyboard popups)
      if (Math.abs(rect.width - prevWidth) < 5 && canvas.width > 0) return;
      prevWidth = rect.width;

      const tempUrl = isSigned ? canvas.toDataURL() : '';

      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 2.5;

      if (tempUrl) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, rect.width, rect.height);
        };
        img.src = tempUrl;
      }
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    return () => window.removeEventListener('resize', setCanvasSize);
  }, [isSigned]);

  // Canvas Mouse & Touch Event Handlers
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsSigned(true);
    setFieldErrors((prev) => ({ ...prev, signature: false }));
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    if (e.cancelable) {
      e.preventDefault(); // Prevent scrolling on touch devices
    }
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsSigned(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: typeof fieldErrors = {};
    let firstErrorRef: React.RefObject<HTMLDivElement | null> | null = null;

    if (!formData.partner1Name.trim()) {
      errors.partner1Name = true;
      if (!firstErrorRef) firstErrorRef = partner1Ref;
    }
    if (!formData.partner2Name.trim()) {
      errors.partner2Name = true;
      if (!firstErrorRef) firstErrorRef = partner2Ref;
    }
    if (!formData.weddingDate.trim()) {
      errors.weddingDate = true;
      if (!firstErrorRef) firstErrorRef = weddingDateRef;
    }
    if (!formData.location.trim()) {
      errors.location = true;
      if (!firstErrorRef) firstErrorRef = locationRef;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errors.email = true;
      if (!firstErrorRef) firstErrorRef = emailRef;
    }
    if (!consentChecked) {
      errors.consent = true;
      if (!firstErrorRef) firstErrorRef = consentRef;
    }
    if (!isSigned) {
      errors.signature = true;
      if (!firstErrorRef) firstErrorRef = signatureRef;
    }

    setFieldErrors(errors);

    if (firstErrorRef && firstErrorRef.current) {
      firstErrorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const inputChild = firstErrorRef.current.querySelector('input');
      if (inputChild) inputChild.focus();
      return;
    }

    setStatus('submitting');

    const canvas = canvasRef.current;
    const signatureDataUrl = canvas ? canvas.toDataURL('image/png') : '';
    const formattedTimestamp = new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });

    const currentSignedData = {
      ...formData,
      signatureUrl: signatureDataUrl,
      timestamp: formattedTimestamp,
      lang: lang
    };

    setSignedData(currentSignedData);

    // Send email with attached PDF via Resend API directly to client & Tolya Films
    try {
      await sendReleaseEmailWithPDF(currentSignedData);
    } catch (err) {
      console.error('Resend API error:', err);
    }

    setStatus('success');
  };

  const handleDownloadPDF = () => {
    if (!signedData) return;
    const pdfDoc = generateReleasePDF(signedData);
    const safeFilename = `Einwilligungserklaerung_TolyaFilms_${signedData.partner1Name.replace(/\s+/g, '_')}.pdf`;
    pdfDoc.save(safeFilename);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark pt-24 pb-16 font-body">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-3xl">
        

        {/* Top Back Link & Language Toggle */}
        <div className="mb-6 print:hidden flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-brand-dark/50 hover:text-brand-dark transition-colors text-xs uppercase tracking-[0.25em]"
          >
            <ArrowLeft size={14} />
            {isEn ? 'Back to Home' : 'Zurück zur Startseite'}
          </Link>

          <div className="inline-flex items-center bg-white border border-black/15 rounded-full p-1 shadow-sm text-xs">
            <button
              type="button"
              onClick={() => setLang('de')}
              className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                !isEn ? 'bg-brand-dark text-white shadow-xs' : 'text-brand-dark/60 hover:text-brand-dark'
              }`}
            >
              🇩🇪 DE
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                isEn ? 'bg-brand-dark text-white shadow-xs' : 'text-brand-dark/60 hover:text-brand-dark'
              }`}
            >
              🇬🇧 EN
            </button>
          </div>
        </div>

        {/* Header Branding */}
        <div className="bg-white p-6 sm:p-10 rounded-sm border border-black/10 shadow-xl mb-8">
          <div className="flex items-center justify-between border-b border-black/10 pb-6 mb-6">
            <img src={ASSETS.logoBlack} alt="Tolya Films" className="h-8 w-auto opacity-80" />
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">
              <ShieldCheck size={14} />
              {isEn ? 'DSGVO / KUG Compliant' : 'DSGVO & § 22 KUG konform'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-wide text-brand-dark mb-3">
            {isEn ? 'Media Release & Consent Agreement' : 'Einwilligungserklärung zur Nutzung von Bild- und Videomaterial'}
          </h1>
          <p className="text-brand-dark/70 text-sm font-light leading-relaxed">
            {isEn
              ? 'Quick & simple online release for your wedding film footage. Please fill in your details and sign below.'
              : 'Schnell & unkompliziert – Online-Freigabe für euer Hochzeitsvideo. Bitte füllt die Angaben aus und unterschreibt unten.'}
          </p>
        </div>

        {status === 'success' && signedData ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 sm:p-10 rounded-sm border border-brand-gold/30 shadow-2xl space-y-6"
          >
            <div className="flex items-center gap-3 p-4 bg-brand-gold/10 border border-brand-gold/30 rounded-xs text-brand-dark">
              <CheckCircle2 size={28} className="text-brand-gold shrink-0" />
              <div>
                <h2 className="font-display font-bold uppercase text-sm sm:text-base">
                  {isEn ? 'Release Consent Successfully Signed!' : 'Einwilligungserklärung erfolgreich unterzeichnet!'}
                </h2>
                <p className="text-xs opacity-80">
                  {isEn
                    ? 'A copy has been sent to your email. You can also print or save a PDF of your signed agreement below.'
                    : 'Eine Kopie wurde an eure E-Mail gesendet. Ihr könnt dieses Dokument unten als PDF speichern oder ausdrucken.'}
                </p>
              </div>
            </div>

            {/* Signed Document Preview */}
            <div className="border border-black/15 p-6 rounded-xs bg-brand-gray/20 space-y-6 text-xs text-brand-dark">
              <div className="flex justify-between items-start border-b border-black/10 pb-4">
                <div>
                  <p className="text-brand-gold font-bold uppercase text-[10px] tracking-widest">{isEn ? 'Contract Partners' : 'Vertragspartner'}</p>
                  <p className="text-sm font-bold">{signedData.partner1Name} & {signedData.partner2Name}</p>
                  <p className="text-brand-dark/60">{isEn ? 'Location:' : 'Location:'} {signedData.location}</p>
                  <p className="text-brand-dark/60">{isEn ? 'Wedding Date:' : 'Hochzeitsdatum:'} {signedData.weddingDate}</p>
                  <p className="text-brand-dark/60">E-Mail: {signedData.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-brand-gold font-bold uppercase text-[10px] tracking-widest">{isEn ? 'Timestamp' : 'Zeitstempel'}</p>
                  <p className="text-brand-dark/80 font-mono text-[11px]">{signedData.timestamp}</p>
                  <span className="inline-block mt-1 bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-300">
                    {isEn ? 'Legally Digitally Signed' : 'Rechtsgültig digital signiert'}
                  </span>
                </div>
              </div>

              <div>
                <p className="font-bold uppercase tracking-wider text-[11px] mb-2 text-brand-dark">{isEn ? 'Approved Outlets:' : 'Vereinbarte Kanäle:'}</p>
                <p className="text-brand-dark/80 leading-relaxed">
                  Webseite (tolyafilms.com), Instagram (@tolya.films), YouTube (@Tolya.filmsss), Vimeo (Tolya films), Facebook (Tolyafilms).
                </p>
              </div>

              <div>
                <p className="font-bold uppercase tracking-wider text-[11px] mb-2 text-brand-dark">{isEn ? 'Legal Agreement & Revocation Right:' : 'Rechtliche Vereinbarung & Widerrufsrecht:'}</p>
                <p className="text-brand-dark/70 leading-relaxed italic bg-white p-3 rounded-xs border border-black/10">
                  {isEn
                    ? '"We hereby grant Anatolii Rabochauskas (Tolya Films) explicit, non-exclusive, royalty-free, worldwide, and perpetual consent to use, publish, and distribute our wedding video and photo footage on the specified outlets for portfolio and promotional purposes under Art. 6(1)(a) EU GDPR & § 22 KUG. This consent can be revoked at any time with future effect."'
                    : '"Wir erteilen Anatolii Rabochauskas (Tolya Films) hiermit die ausdrückliche, unentgeltliche sowie zeitlich und räumlich unbeschränkte Einwilligung zur Nutzung, Veröffentlichung und Verbreitung der im Rahmen unserer Hochzeit erstellten Video- und Fotoaufnahmen auf den angegebenen Plattformen gemäß § 22 KUG & Art. 6 Abs. 1 lit. a DSGVO. Diese Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden."'}
                </p>
              </div>

              {/* Render Signature Image */}
              <div className="pt-4 border-t border-black/10">
                <p className="font-bold uppercase tracking-wider text-[11px] mb-2 text-brand-dark">{isEn ? 'Captured Digital Signature:' : 'Erfasste digitale Unterschrift:'}</p>
                <div className="bg-white p-3 rounded-xs border border-black/15 inline-block">
                  <img src={signedData.signatureUrl} alt={isEn ? "Digital Signature" : "Digitale Unterschrift"} className="h-16 w-auto object-contain" />
                </div>
              </div>
            </div>

            {/* Print & Download PDF Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 print:hidden">
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="flex-1 bg-brand-dark text-white py-3 px-4 rounded-xs text-xs uppercase tracking-[0.2em] font-bold hover:bg-brand-gold transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Download size={16} />
                <span>{isEn ? 'Download PDF Document' : 'PDF-Dokument herunterladen'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 bg-brand-gray text-brand-dark border border-black/15 py-3 px-4 rounded-xs text-xs uppercase tracking-[0.2em] font-bold hover:bg-black/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer size={16} />
                <span>{isEn ? 'Print Document' : 'Drucken'}</span>
              </button>

              <Link
                to="/"
                className="flex-1 bg-brand-gray text-brand-dark border border-black/15 py-3 px-4 rounded-xs text-xs uppercase tracking-[0.2em] font-bold hover:bg-black/10 transition-colors text-center flex items-center justify-center"
              >
                {isEn ? 'Back to Website' : 'Zurück zur Webseite'}
              </Link>
            </div>
          </motion.div>
        ) : (
          <form noValidate onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-sm border border-black/10 shadow-xl space-y-8">
            
            {/* ── SECTION 1: MINIMAL COUPLE DETAILS ── */}
            <div>
              <h2 className="text-base font-display font-bold uppercase tracking-wider text-brand-dark mb-4 pb-2 border-b border-black/10">
                1. {isEn ? 'Couple & Event Details' : 'Angaben zum Paar & Hochzeit'}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div ref={partner1Ref}>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-dark/70 mb-1">
                    {isEn ? 'Bride / Partner 1 Name *' : 'Name Braut / Partner 1 *'}
                  </label>
                  <input
                    type="text"
                    name="partner1Name"
                    value={formData.partner1Name}
                    onChange={handleChange}
                    placeholder="z. B. Stella Obert"
                    className={`w-full px-3 py-2.5 bg-brand-gray/50 border rounded-xs text-sm text-brand-dark focus:outline-none transition-colors ${
                      fieldErrors.partner1Name
                        ? 'border-red-500 bg-red-50/50 focus:border-red-600 ring-1 ring-red-500'
                        : 'border-black/15 focus:border-brand-gold focus:bg-white'
                    }`}
                  />
                  {fieldErrors.partner1Name && (
                    <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                      <span>⚠</span> {isEn ? 'Please enter a name.' : 'Bitte gebt einen Namen ein.'}
                    </p>
                  )}
                </div>

                <div ref={partner2Ref}>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-dark/70 mb-1">
                    {isEn ? 'Groom / Partner 2 Name *' : 'Name Bräutigam / Partner 2 *'}
                  </label>
                  <input
                    type="text"
                    name="partner2Name"
                    value={formData.partner2Name}
                    onChange={handleChange}
                    placeholder="z. B. Patrick Obert"
                    className={`w-full px-3 py-2.5 bg-brand-gray/50 border rounded-xs text-sm text-brand-dark focus:outline-none transition-colors ${
                      fieldErrors.partner2Name
                        ? 'border-red-500 bg-red-50/50 focus:border-red-600 ring-1 ring-red-500'
                        : 'border-black/15 focus:border-brand-gold focus:bg-white'
                    }`}
                  />
                  {fieldErrors.partner2Name && (
                    <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                      <span>⚠</span> {isEn ? 'Please enter a name.' : 'Bitte gebt einen Namen ein.'}
                    </p>
                  )}
                </div>

                <div ref={weddingDateRef}>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-dark/70 mb-1">
                    {isEn ? 'Wedding Date *' : 'Hochzeitsdatum *'}
                  </label>
                  <input
                    type="date"
                    name="weddingDate"
                    value={formData.weddingDate}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 bg-brand-gray/50 border rounded-xs text-sm text-brand-dark focus:outline-none transition-colors ${
                      fieldErrors.weddingDate
                        ? 'border-red-500 bg-red-50/50 focus:border-red-600 ring-1 ring-red-500'
                        : 'border-black/15 focus:border-brand-gold focus:bg-white'
                    }`}
                  />
                  {fieldErrors.weddingDate && (
                    <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                      <span>⚠</span> {isEn ? 'Please select a wedding date.' : 'Bitte wählt ein Hochzeitsdatum aus.'}
                    </p>
                  )}
                </div>

                <div ref={locationRef}>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-dark/70 mb-1">
                    {isEn ? 'Location / Venue *' : 'Location / Veranstaltungsort *'}
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="z. B. Zandvoort, Netherlands"
                    className={`w-full px-3 py-2.5 bg-brand-gray/50 border rounded-xs text-sm text-brand-dark focus:outline-none transition-colors ${
                      fieldErrors.location
                        ? 'border-red-500 bg-red-50/50 focus:border-red-600 ring-1 ring-red-500'
                        : 'border-black/15 focus:border-brand-gold focus:bg-white'
                    }`}
                  />
                  {fieldErrors.location && (
                    <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                      <span>⚠</span> {isEn ? 'Please enter a venue/location.' : 'Bitte gebt einen Veranstaltungsort ein.'}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2" ref={emailRef}>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-dark/70 mb-1">
                    {isEn ? 'E-Mail Address for Confirmation Copy *' : 'E-Mail-Adresse für Bestätigungskopie *'}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="eure.email@beispiel.de"
                    className={`w-full px-3 py-2.5 bg-brand-gray/50 border rounded-xs text-sm text-brand-dark focus:outline-none transition-colors ${
                      fieldErrors.email
                        ? 'border-red-500 bg-red-50/50 focus:border-red-600 ring-1 ring-red-500'
                        : 'border-black/15 focus:border-brand-gold focus:bg-white'
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                      <span>⚠</span> {isEn ? 'Please enter a valid e-mail address.' : 'Bitte gebt eine gültige E-Mail-Adresse ein.'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── SECTION 2: PUBLICATION OUTLETS (CLEAR LIST) ── */}
            <div>
              <h2 className="text-base font-display font-bold uppercase tracking-wider text-brand-dark mb-4 pb-2 border-b border-black/10">
                2. {isEn ? 'Approved Release Outlets' : 'Vereinbarte Veröffentlichungskanäle'}
              </h2>
              <p className="text-xs text-brand-dark/70 mb-4">
                {isEn
                  ? 'The video and photo material created during the wedding may be published by Tolya Films exclusively on the following official channels:'
                  : 'Die im Rahmen der Hochzeit erstellten Film- und Fotoaufnahmen dürfen von Tolya Films ausschließlich auf den folgenden offiziellen Kanälen zu Portfolio- & Präsentationszwecken veröffentlicht werden:'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2.5 p-2.5 bg-brand-gray/60 rounded-xs border border-black/10">
                  <Globe size={16} className="text-brand-gold shrink-0" />
                  <div>
                    <span className="font-bold text-brand-dark block">Webseite</span>
                    <span className="text-brand-dark/60">tolyafilms.com (Portfolio & Blog)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 bg-brand-gray/60 rounded-xs border border-black/10">
                  <Instagram size={16} className="text-brand-gold shrink-0" />
                  <div>
                    <span className="font-bold text-brand-dark block">Instagram</span>
                    <span className="text-brand-dark/60">@tolya.films (Reels, Posts & Stories)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 bg-brand-gray/60 rounded-xs border border-black/10">
                  <Youtube size={16} className="text-brand-gold shrink-0" />
                  <div>
                    <span className="font-bold text-brand-dark block">YouTube</span>
                    <span className="text-brand-dark/60">@Tolya.filmsss</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 bg-brand-gray/60 rounded-xs border border-black/10">
                  <Film size={16} className="text-brand-gold shrink-0" />
                  <div>
                    <span className="font-bold text-brand-dark block">Vimeo</span>
                    <span className="text-brand-dark/60">Tolya films</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 bg-brand-gray/60 rounded-xs border border-black/10 sm:col-span-2">
                  <Facebook size={16} className="text-brand-gold shrink-0" />
                  <div>
                    <span className="font-bold text-brand-dark block">Facebook</span>
                    <span className="text-brand-dark/60">Tolyafilms (Social Media Auftritt)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── SECTION 3: LEGAL TERMS & CHECKBOX ── */}
            <div>
              <h2 className="text-base font-display font-bold uppercase tracking-wider text-brand-dark mb-4 pb-2 border-b border-black/10">
                3. {isEn ? 'Legal Terms & Right of Revocation' : 'Rechtliche Vereinbarung & Widerrufsrecht'}
              </h2>

              <div className="bg-brand-gray/40 p-4 rounded-xs border border-black/10 text-xs leading-relaxed text-brand-dark/80 space-y-3 max-h-52 overflow-y-auto mb-4">
                {isEn ? (
                  <>
                    <p>
                      <strong>Grant of Consent:</strong> We (the undersigned clients) hereby grant filmmaker Anatolii Rabochauskas (Tolya Films) explicit, non-exclusive, royalty-free, worldwide, and perpetual consent to use, publish, and distribute the video and photo footage created during our wedding exclusively on the approved outlets listed above for portfolio, showcase, and promotional purposes in accordance with Art. 6(1)(a) EU GDPR and applicable image copyright laws (§ 22 KUG).
                    </p>
                    <p>
                      <strong>Scope of Rights:</strong> This consent includes editing, color grading, music licensing/synchronization, and the publication of highlight films, teasers, trailers, and film stills on the specified channels.
                    </p>
                    <p>
                      <strong>Voluntary Nature & Right of Revocation (EU GDPR Art. 7):</strong> Granting this consent is voluntary. You have the right to revoke this consent <strong>at any time with future effect, freely and without giving reasons</strong>, by emailing <a href="mailto:tolya.films@gmail.com" className="underline font-semibold text-brand-gold">tolya.films@gmail.com</a>. Revocation shall not affect the lawfulness of processing or publication carried out prior to revocation.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Gegenstand der Einwilligung:</strong> Wir (die oben genannten Auftraggeber) erteilen dem Videografen Anatolii Rabochauskas (Tolya Films) hiermit die ausdrückliche, unentgeltliche sowie zeitlich und räumlich unbeschränkte Einwilligung zur Nutzung, Veröffentlichung und Verbreitung der im Rahmen unserer Hochzeit erstellten Video- und Fotoaufnahmen auf den oben aufgeführten Plattformen zu Eigenwerbungs- und Portfoliozwecken.
                    </p>
                    <p>
                      <strong>Umfang:</strong> Die Einwilligung umfasst den Schnitt, die musikalische Unterlegung sowie die Veröffentlichung von Highlights, Trailern und Filmsequenzen auf den angegebenen Kanälen.
                    </p>
                    <p>
                      <strong>Freiwilligkeit & Widerrufsrecht (DSGVO):</strong> Die Erteilung dieser Einwilligung ist freiwillig. Diese Einwilligung kann <strong>jederzeit mit Wirkung für die Zukunft frei und ohne Angabe von Gründen</strong> per E-Mail an <a href="mailto:tolya.films@gmail.com" className="underline font-semibold text-brand-gold">tolya.films@gmail.com</a> widerrufen werden. Durch den Widerruf wird die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung und Veröffentlichung nicht berührt.
                    </p>
                  </>
                )}
              </div>

              <div ref={consentRef} className={`p-3 rounded-xs transition-colors ${fieldErrors.consent ? 'border-2 border-red-500 bg-red-50/50' : ''}`}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(e) => {
                      setConsentChecked(e.target.checked);
                      if (e.target.checked && fieldErrors.consent) {
                        setFieldErrors((prev) => ({ ...prev, consent: false }));
                      }
                    }}
                    className="mt-1 h-4 w-4 shrink-0 rounded-xs border-black/20 text-brand-dark focus:ring-brand-gold accent-brand-dark cursor-pointer"
                  />
                  <span className="text-xs text-brand-dark leading-normal">
                    {isEn
                      ? 'We have read the media release agreement and explicitly consent to the publication of our wedding film material on the specified channels. *'
                      : 'Wir haben die Einwilligungserklärung gelesen und erklären uns ausdrücklich mit der Veröffentlichung unseres Hochzeitsfilmmaterials auf den oben genannten Kanälen einverstanden. *'}
                  </span>
                </label>

                {fieldErrors.consent && (
                  <p className="text-xs text-red-600 font-semibold mt-2 flex items-center gap-1">
                    <span>⚠</span> {isEn ? 'Please check the box to confirm the agreement.' : 'Bitte bestätigt die Einwilligungserklärung, um fortzufahren.'}
                  </p>
                )}
              </div>
            </div>

            {/* ── SECTION 4: DIGITAL SIGNATURE PAD ── */}
            <div ref={signatureRef}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-base font-display font-bold uppercase tracking-wider text-brand-dark flex items-center gap-2">
                  <PenTool size={16} className="text-brand-gold" />
                  <span>4. {isEn ? 'Digital Signature *' : 'Digitale Unterschrift *'}</span>
                </label>
                
                {isSigned && (
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-dark/60 hover:text-red-600 transition-colors uppercase tracking-wider"
                  >
                    <RotateCcw size={12} />
                    <span>{isEn ? 'Clear Signature' : 'Unterschrift zurücksetzen'}</span>
                  </button>
                )}
              </div>

              <p className="text-xs text-brand-dark/70 mb-3">
                {isEn
                  ? 'Please sign inside the box below using your finger (on touchscreens) or mouse:'
                  : 'Bitte unterschreibt im Feld unten mit dem Finger (auf Smartphones/Tablets) oder der Maus:'}
              </p>

              {/* Touch & Mouse Canvas */}
              <div className={`relative border-2 border-dashed rounded-xs bg-brand-gray/30 overflow-hidden touch-none transition-colors ${
                fieldErrors.signature ? 'border-red-500 bg-red-50/30 ring-1 ring-red-500' : 'border-black/20'
              }`}>
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  style={{ touchAction: 'none' }}
                  className="w-full h-40 cursor-crosshair block touch-none"
                />
                
                {!isSigned && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <span className="text-xs text-brand-dark/30 font-display tracking-widest uppercase border-b border-black/20 pb-1">
                      {isEn ? 'Sign here / Hier unterschreiben' : 'Hier unterschreiben'}
                    </span>
                  </div>
                )}
              </div>

              {fieldErrors.signature && (
                <p className="text-xs text-red-600 font-semibold mt-2 flex items-center gap-1">
                  <span>⚠</span> {isEn ? 'Please draw your signature in the box above.' : 'Bitte zeichnet eure Unterschrift in das Feld oben.'}
                </p>
              )}
            </div>

            {/* ── SUBMIT BUTTON ── */}
            <div className="pt-4 border-t border-black/10">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-brand-dark text-white py-4 px-6 rounded-xs font-display text-xs sm:text-sm uppercase tracking-[0.25em] font-bold hover:bg-brand-gold transition-colors duration-300 shadow-xl flex items-center justify-center gap-3 disabled:opacity-60 cursor-pointer"
              >
                {status === 'submitting' ? (
                  <span>{isEn ? 'Submitting agreement...' : 'Wird übermittelt...'}</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>{isEn ? 'Legally Sign & Submit' : 'Rechtsverbindlich unterzeichnen & absenden'}</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-center text-brand-dark/50 mt-2">
                {isEn
                  ? 'A confirmation copy of this agreement will be sent to your email address.'
                  : 'Eine Bestätigungskopie dieser Vereinbarung wird an eure E-Mail-Adresse gesendet.'}
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default MediaRelease;
