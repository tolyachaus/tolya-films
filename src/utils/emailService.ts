import emailjs from '@emailjs/browser';
import { generateReleasePDF, ReleaseFormData } from './pdfGenerator';

// EmailJS Credentials (Can be set via env variables or direct constants)
const EMAILJS_SERVICE_ID = 'service_tolyafilms';
const EMAILJS_TEMPLATE_ID = 'template_media_release';
const EMAILJS_PUBLIC_KEY = 'P95W1_Yxyh6i2g5g-'; // Placeholder or actual EmailJS Public Key

export const sendReleaseEmailWithPDF = async (data: ReleaseFormData): Promise<boolean> => {
  try {
    // 1. Generate jsPDF Document
    const pdfDoc = generateReleasePDF(data);
    
    // 2. Convert PDF to Base64 String for EmailJS Attachment
    const pdfBase64 = pdfDoc.output('datauristring');

    // 3. Prepare EmailJS Template Parameters
    const templateParams = {
      to_email: data.email,
      to_name: `${data.partner1Name} & ${data.partner2Name}`,
      partner1_name: data.partner1Name,
      partner2_name: data.partner2Name,
      wedding_date: data.weddingDate,
      location: data.location,
      timestamp: data.timestamp,
      content_attachment: pdfBase64 // Base64 PDF attachment for EmailJS
    };

    // 4. Send via EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    return response.status === 200;
  } catch (error) {
    console.warn('EmailJS sending failed or credentials pending:', error);
    return false;
  }
};
