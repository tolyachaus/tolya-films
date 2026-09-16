import { jsPDF } from 'jspdf';

export interface ReleaseFormData {
  partner1Name: string;
  partner2Name: string;
  weddingDate: string;
  location: string;
  email: string;
  signatureUrl: string;
  timestamp: string;
}

export const generateReleasePDF = (data: ReleaseFormData): jsPDF => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Dark Gold Brand Colors
  const darkColor = '#1a1a1a';
  const goldColor = '#c5a059';
  const grayColor = '#f7f7f7';

  // 1. Header Banner
  doc.setFillColor(26, 26, 26);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('TOLYA FILMS', 15, 18);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(197, 160, 89);
  doc.text('DSGVO & § 22 KUG KONFORM', pageWidth - 15, 18, { align: 'right' });

  // 2. Document Title
  doc.setTextColor(26, 26, 26);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('EINWILLIGUNGSERKLÄRUNG', 15, 40);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('zur Nutzung von Bild- und Videomaterial (§ 22 KUG / Art. 6 Abs. 1 lit. a DSGVO)', 15, 46);

  doc.setDrawColor(200, 200, 200);
  doc.line(15, 50, pageWidth - 15, 50);

  // 3. Couple & Event Details Box
  doc.setFillColor(247, 247, 247);
  doc.roundedRect(15, 55, pageWidth - 30, 42, 2, 2, 'F');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(197, 160, 89);
  doc.text('1. VERTRAGSPARTNER & HOCHZEITSANGABEN', 20, 63);

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(26, 26, 26);
  doc.text(`Braut / Partner 1:  ${data.partner1Name}`, 20, 71);
  doc.text(`Bräutigam / Partner 2:  ${data.partner2Name}`, 20, 77);
  doc.text(`Hochzeitsdatum:  ${data.weddingDate}`, 20, 83);

  doc.text(`Location & Ort:  ${data.location}`, 115, 71);
  doc.text(`E-Mail-Adresse:  ${data.email}`, 115, 77);
  doc.text(`Unterzeichnet am:  ${data.timestamp}`, 115, 83);

  // 4. Approved Outlets
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(197, 160, 89);
  doc.text('2. VEREINBARTE VERÖFFENTLICHUNGSKANÄLE', 15, 106);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(26, 26, 26);
  doc.text('• Webseite:  tolyafilms.com', 20, 113);
  doc.text('• Instagram:  @tolya.films', 20, 119);
  doc.text('• YouTube:  @Tolya.filmsss', 20, 125);
  doc.text('• Vimeo:  Tolya films', 115, 113);
  doc.text('• Facebook:  Tolyafilms', 115, 119);

  // 5. Legal Text
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(197, 160, 89);
  doc.text('3. RECHTLICHE VEREINBARUNG & WIDERRUFSRECHT', 15, 137);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);

  const legalText = `Gegenstand der Einwilligung: Wir (${data.partner1Name} & ${data.partner2Name}) erteilen dem Videografen Anatolii Rabochauskas (Tolya Films) hiermit die ausdrückliche, unentgeltliche sowie zeitlich und räumlich unbeschränkte Einwilligung zur Nutzung, Veröffentlichung und Verbreitung der im Rahmen unserer Hochzeit erstellten Video- und Fotoaufnahmen auf den oben aufgeführten Plattformen zu Eigenwerbungs- und Portfoliozwecken.\n\nUmfang: Die Einwilligung umfasst den Schnitt, die musikalische Unterlegung sowie die Veröffentlichung von Highlights, Trailern und Filmsequenzen auf den angegebenen Kanälen.\n\nWiderrufsrecht: Diese Einwilligung kann jederzeit mit Wirkung für die Zukunft frei und ohne Angabe von Gründen per E-Mail an tolya.films@gmail.com widerrufen werden. Durch den Widerruf wird die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung und Veröffentlichung nicht berührt.`;

  const splitLegalText = doc.splitTextToSize(legalText, pageWidth - 30);
  doc.text(splitLegalText, 15, 144);

  // 6. Signature Section
  const signatureY = 195;
  doc.setDrawColor(200, 200, 200);
  doc.line(15, signatureY, pageWidth - 15, signatureY);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(197, 160, 89);
  doc.text('4. DIGITALE UNTERSCHRIFT DES PAARES', 15, signatureY + 8);

  // Embed Signature Image if present
  if (data.signatureUrl && data.signatureUrl.startsWith('data:image')) {
    try {
      doc.addImage(data.signatureUrl, 'PNG', 15, signatureY + 12, 60, 25);
    } catch (e) {
      console.error('Failed to embed signature image in PDF', e);
    }
  }

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 120, 120);
  doc.text(`Digital unterzeichnet über tolyafilms.com am ${data.timestamp}`, 15, signatureY + 42);
  doc.text(`Rechtsgültige elektronische Einwilligung gemäß § 22 KUG & Art. 6 Abs. 1 lit. a DSGVO`, 15, signatureY + 46);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(`© ${new Date().getFullYear()} Tolya Films · Anatolii Rabochauskas · Heckerstraße 9, 68199 Mannheim · tolyafilms.com`, pageWidth / 2, 285, { align: 'center' });

  return doc;
};
