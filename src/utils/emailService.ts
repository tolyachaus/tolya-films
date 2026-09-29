import { generateReleasePDF, ReleaseFormData } from './pdfGenerator';

const WORKER_ENDPOINT = 'https://tolyafilms-release.tolyachaus.workers.dev/';

export interface SendEmailResult {
  success: boolean;
  error?: string;
}

export const sendReleaseEmailWithPDF = async (data: ReleaseFormData): Promise<SendEmailResult> => {
  try {
    // 1. Generate jsPDF Document
    const pdfDoc = generateReleasePDF(data);
    
    // 2. Extract Base64 String for PDF Attachment
    const dataUri = pdfDoc.output('datauristring');
    const base64Content = dataUri.split(',')[1];

    if (!base64Content) {
      throw new Error('Failed to generate PDF document attachment');
    }

    // 3. Send to Cloudflare Worker backend proxy
    const response = await fetch(WORKER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        partner1Name: data.partner1Name,
        partner2Name: data.partner2Name,
        weddingDate: data.weddingDate,
        location: data.location,
        email: data.email,
        timestamp: data.timestamp,
        lang: data.lang || 'de',
        pdfBase64: base64Content
      }),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = result?.error || result?.details || `HTTP error ${response.status}`;
      console.error('Cloudflare Worker email delivery error:', errorMessage);
      return {
        success: false,
        error: String(errorMessage)
      };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error sending release agreement:', error);
    return {
      success: false,
      error: error?.message || 'Network error occurred while connecting to email service.'
    };
  }
};
