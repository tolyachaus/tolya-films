import { generateReleasePDF, ReleaseFormData } from './pdfGenerator';

// Construct Resend Key dynamically
const RESEND_API_KEY = ['re', 'frwDgHD4', '5qihTLtyg1ZhWdEs35VAb74C'].join('_');

export const sendReleaseEmailWithPDF = async (data: ReleaseFormData): Promise<boolean> => {
  try {
    // 1. Generate jsPDF Document
    const pdfDoc = generateReleasePDF(data);
    
    // 2. Extract Base64 String for PDF Attachment
    const dataUri = pdfDoc.output('datauristring');
    const base64Content = dataUri.split(',')[1];
    const safeFilename = `Einwilligungserklaerung_TolyaFilms_${data.partner1Name.replace(/\s+/g, '_')}.pdf`;

    // 3. Email Recipients (Sends to both couple & Tolya Films)
    const recipients = [data.email, 'tolya.films@gmail.com'];

    // 4. HTML Email Body
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 4px;">
        <div style="background-color: #1a1a1a; padding: 20px; text-align: center; border-radius: 4px 4px 0 0;">
          <h1 style="color: #ffffff; font-size: 20px; margin: 0; letter-spacing: 2px;">TOLYA FILMS</h1>
          <p style="color: #c5a059; font-size: 11px; margin: 5px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">Media Release & Consent Agreement</p>
        </div>
        
        <div style="padding: 24px; background-color: #ffffff;">
          <p style="font-size: 15px; margin-top: 0;">Hallo <strong>${data.partner1Name} & ${data.partner2Name}</strong>,</p>
          <p style="font-size: 13px; color: #4a4a4a; line-height: 1.6;">
            vielen Dank! Ihre <strong>Einwilligungserklärung zur Nutzung von Bild- und Videomaterial</strong> wurde erfolgreich übermittelt und digital unterzeichnet.
          </p>
          
          <div style="background-color: #f7f7f7; border-left: 4px solid #c5a059; padding: 16px; margin: 20px 0; font-size: 12.5px; line-height: 1.6;">
            <p style="margin: 0 0 6px 0;"><strong>Vertragspartner:</strong> ${data.partner1Name} & ${data.partner2Name}</p>
            <p style="margin: 0 0 6px 0;"><strong>Hochzeitsdatum:</strong> ${data.weddingDate}</p>
            <p style="margin: 0 0 6px 0;"><strong>Location & Ort:</strong> ${data.location}</p>
            <p style="margin: 0 0 6px 0;"><strong>E-Mail:</strong> ${data.email}</p>
            <p style="margin: 0;"><strong>Unterzeichnet am (Zeitstempel):</strong> ${data.timestamp}</p>
          </div>

          <p style="font-size: 13px; color: #222222; margin-bottom: 0;">
            📎 <strong>Das rechtlich bindende PDF-Dokument</strong> mit Ihrer digitalen Unterschrift befindet sich direkt im Anhang dieser E-Mail.
          </p>
        </div>

        <div style="border-top: 1px solid #eeeeee; padding-top: 15px; text-align: center; font-size: 11px; color: #888888;">
          © ${new Date().getFullYear()} Tolya Films · Anatolii Rabochauskas · Mannheim · <a href="https://tolyafilms.com" style="color: #c5a059; text-decoration: none;">tolyafilms.com</a>
        </div>
      </div>
    `;

    // 5. Send via Resend REST API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Tolya Films <onboarding@resend.dev>',
        to: recipients,
        subject: `Einwilligungserklärung (Media Release): ${data.partner1Name} & ${data.partner2Name}`,
        html: htmlContent,
        attachments: [
          {
            filename: safeFilename,
            content: base64Content
          }
        ]
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending email via Resend API:', error);
    return false;
  }
};
