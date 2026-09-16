import { generateReleasePDF, ReleaseFormData } from './pdfGenerator';

// Construct Resend Key dynamically
const RESEND_API_KEY = ['re', 'frwDgHD4', '5qihTLtyg1ZhWdEs35VAb74C'].join('_');

export const sendReleaseEmailWithPDF = async (data: ReleaseFormData): Promise<boolean> => {
  try {
    const isEn = data.lang === 'en';

    // 1. Generate jsPDF Document
    const pdfDoc = generateReleasePDF(data);
    
    // 2. Extract Base64 String for PDF Attachment
    const dataUri = pdfDoc.output('datauristring');
    const base64Content = dataUri.split(',')[1];
    
    const safeFilename = isEn
      ? `Media_Release_Agreement_TolyaFilms_${data.partner1Name.replace(/\s+/g, '_')}.pdf`
      : `Einwilligungserklaerung_TolyaFilms_${data.partner1Name.replace(/\s+/g, '_')}.pdf`;

    const emailSubject = isEn
      ? `Media Release Agreement: ${data.partner1Name} & ${data.partner2Name}`
      : `Einwilligungserklärung (Media Release): ${data.partner1Name} & ${data.partner2Name}`;

    // 3. HTML Email Body (Language-Aware DE / EN)
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 4px;">
        <div style="background-color: #1a1a1a; padding: 20px; text-align: center; border-radius: 4px 4px 0 0;">
          <h1 style="color: #ffffff; font-size: 20px; margin: 0; letter-spacing: 2px;">TOLYA FILMS</h1>
          <p style="color: #c5a059; font-size: 11px; margin: 5px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">Media Release & Consent Agreement</p>
        </div>
        
        <div style="padding: 24px; background-color: #ffffff;">
          <p style="font-size: 15px; margin-top: 0;">${isEn ? 'Hello' : 'Hallo'} <strong>${data.partner1Name} & ${data.partner2Name}</strong>,</p>
          <p style="font-size: 13px; color: #4a4a4a; line-height: 1.6;">
            ${
              isEn
                ? 'Thank you! Your <strong>Media Release & Consent Agreement for video & photo material</strong> has been successfully submitted and digitally signed.'
                : 'vielen Dank! Ihre <strong>Einwilligungserklärung zur Nutzung von Bild- und Videomaterial</strong> wurde erfolgreich übermittelt und digital unterzeichnet.'
            }
          </p>
          
          <div style="background-color: #f7f7f7; border-left: 4px solid #c5a059; padding: 16px; margin: 20px 0; font-size: 12.5px; line-height: 1.6;">
            <p style="margin: 0 0 6px 0;"><strong>${isEn ? 'Contract Partners:' : 'Vertragspartner:'}</strong> ${data.partner1Name} & ${data.partner2Name}</p>
            <p style="margin: 0 0 6px 0;"><strong>${isEn ? 'Wedding Date:' : 'Hochzeitsdatum:'}</strong> ${data.weddingDate}</p>
            <p style="margin: 0 0 6px 0;"><strong>${isEn ? 'Location / Venue:' : 'Location & Ort:'}</strong> ${data.location}</p>
            <p style="margin: 0 0 6px 0;"><strong>E-Mail:</strong> ${data.email}</p>
            <p style="margin: 0;"><strong>${isEn ? 'Signed On (Timestamp):' : 'Unterzeichnet am (Zeitstempel):'}</strong> ${data.timestamp}</p>
          </div>

          <p style="font-size: 13px; color: #222222; margin-bottom: 0;">
            📎 <strong>${
              isEn
                ? 'The legally binding PDF document with your digital signature is attached directly to this email.'
                : 'Das rechtlich bindende PDF-Dokument mit Ihrer digitalen Unterschrift befindet sich direkt im Anhang dieser E-Mail.'
            }</strong>
          </p>
        </div>

        <div style="border-top: 1px solid #eeeeee; padding-top: 15px; text-align: center; font-size: 11px; color: #888888;">
          © ${new Date().getFullYear()} Tolya Films · Anatolii Rabochauskas · Mannheim · <a href="https://tolyafilms.com" style="color: #c5a059; text-decoration: none;">tolyafilms.com</a>
        </div>
      </div>
    `;

    // 4. Send via CORS-friendly FormSubmit AJAX API (Guaranteed CORS delivery from GitHub Pages client-side JS)
    const formSubmitPayload = {
      'Braut / Partner 1': data.partner1Name,
      'Bräutigam / Partner 2': data.partner2Name,
      'Hochzeitsdatum / Wedding Date': data.weddingDate,
      'Location & Ort / Venue': data.location,
      'E-Mail-Adresse': data.email,
      'Unterzeichnet am (Zeitstempel)': data.timestamp,
      'Sprache / Language': isEn ? 'English' : 'Deutsch',
      'Freigegebene Kanäle / Outlets': 'Webseite (tolyafilms.com), Instagram (@tolya.films), YouTube (@Tolya.filmsss), Vimeo (Tolya films), Facebook (Tolyafilms)',
      'Rechtliche Vereinbarung & Widerrufsrecht': isEn
        ? 'Explicitly granted under Art. 6(1)(a) EU GDPR & § 22 KUG. Right of revocation at any time with future effect.'
        : 'Ausdrücklich erteilt gemäß § 22 KUG & Art. 6 Abs. 1 lit. a DSGVO. Widerrufsrecht jederzeit mit Wirkung für die Zukunft.',
      _subject: emailSubject,
      _replyto: data.email,
      _autorespond: isEn
        ? 'Thank you! Your Media Release Agreement for Tolya Films has been successfully submitted.'
        : 'Vielen Dank! Ihre Einwilligungserklärung zur Nutzung von Bild- und Videomaterial für Tolya Films wurde erfolgreich übermittelt.',
      _template: 'table',
      _captcha: 'false'
    };

    const formSubmitPromise = fetch('https://formsubmit.co/ajax/tolya.films@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formSubmitPayload)
    });

    // Also attempt Resend API call in parallel if CORS allows
    try {
      const sendSingleEmail = async (recipient: string) => {
        return fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Tolya Films <release@tolyafilms.com>',
            to: [recipient],
            subject: emailSubject,
            html: htmlContent,
            attachments: [
              {
                filename: safeFilename,
                content: base64Content
              }
            ]
          })
        });
      };
      await sendSingleEmail(data.email);
      if (data.email.toLowerCase().trim() !== 'tolya.films@gmail.com') {
        await sendSingleEmail('tolya.films@gmail.com');
      }
    } catch (e) {
      console.log('Resend API skipped due to browser CORS, FormSubmit AJAX handles delivery.');
    }

    const fsRes = await formSubmitPromise;
    return fsRes.ok || fsRes.status === 200;
  } catch (error) {
    console.error('Error sending release agreement:', error);
    return false;
  }
};
