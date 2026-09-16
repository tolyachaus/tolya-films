import { jsPDF } from 'jspdf';

export interface ReleaseFormData {
  partner1Name: string;
  partner2Name: string;
  weddingDate: string;
  location: string;
  email: string;
  signatureUrl: string;
  timestamp: string;
  lang?: 'de' | 'en';
}

export const generateReleasePDF = (data: ReleaseFormData): jsPDF => {
  const isEn = data.lang === 'en';

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // 1. Header Banner
  doc.setFillColor(26, 26, 26);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('TOLYA FILMS', 15, 18);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(197, 160, 89);
  doc.text(
    isEn ? 'EU GDPR (ART. 6) & § 22 KUG COMPLIANT' : 'DSGVO & § 22 KUG KONFORM',
    pageWidth - 15,
    18,
    { align: 'right' }
  );

  // 2. Document Title
  doc.setTextColor(26, 26, 26);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(
    isEn ? 'MEDIA RELEASE & CONSENT AGREEMENT' : 'EINWILLIGUNGSERKLÄRUNG',
    15,
    40
  );

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(
    isEn
      ? 'for Video & Photo Material (Art. 6 GDPR / § 22 KUG Image Copyright)'
      : 'zur Nutzung von Bild- und Videomaterial (§ 22 KUG / Art. 6 Abs. 1 lit. a DSGVO)',
    15,
    46
  );

  doc.setDrawColor(200, 200, 200);
  doc.line(15, 50, pageWidth - 15, 50);

  // 3. Couple & Event Details Box
  doc.setFillColor(247, 247, 247);
  doc.roundedRect(15, 55, pageWidth - 30, 42, 2, 2, 'F');

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(197, 160, 89);
  doc.text(
    isEn ? '1. CONTRACT PARTNERS & EVENT DETAILS' : '1. VERTRAGSPARTNER & HOCHZEITSANGABEN',
    20,
    63
  );

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(26, 26, 26);
  doc.text(`${isEn ? 'Bride / Partner 1:' : 'Braut / Partner 1:'}  ${data.partner1Name}`, 20, 71);
  doc.text(`${isEn ? 'Groom / Partner 2:' : 'Bräutigam / Partner 2:'}  ${data.partner2Name}`, 20, 77);
  doc.text(`${isEn ? 'Wedding Date:' : 'Hochzeitsdatum:'}  ${data.weddingDate}`, 20, 83);

  doc.text(`${isEn ? 'Location / Venue:' : 'Location & Ort:'}  ${data.location}`, 115, 71);
  doc.text(`E-Mail:  ${data.email}`, 115, 77);
  doc.text(`${isEn ? 'Signed On:' : 'Unterzeichnet am:'}  ${data.timestamp}`, 115, 83);

  // 4. Approved Outlets
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(197, 160, 89);
  doc.text(
    isEn ? '2. APPROVED RELEASE OUTLETS' : '2. VEREINBARTE VERÖFFENTLICHUNGSKANÄLE',
    15,
    106
  );

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(26, 26, 26);
  doc.text('• Webseite:  tolyafilms.com', 20, 113);
  doc.text('• Instagram:  @tolya.films', 20, 119);
  doc.text('• YouTube:  @Tolya.filmsss', 20, 125);
  doc.text('• Vimeo:  Tolya films', 115, 113);
  doc.text('• Facebook:  Tolyafilms', 115, 119);

  // 5. Legal Text
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(197, 160, 89);
  doc.text(
    isEn ? '3. LEGAL AGREEMENT & RIGHT OF REVOCATION' : '3. RECHTLICHE VEREINBARUNG & WIDERRUFSRECHT',
    15,
    137
  );

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);

  const legalTextDe = `Gegenstand der Einwilligung: Wir (${data.partner1Name} & ${data.partner2Name}) erteilen dem Videografen Anatolii Rabochauskas (Tolya Films) hiermit die ausdrückliche, unentgeltliche sowie zeitlich und räumlich unbeschränkte Einwilligung zur Nutzung, Veröffentlichung und Verbreitung der im Rahmen unserer Hochzeit erstellten Video- und Fotoaufnahmen auf den oben aufgeführten Plattformen zu Eigenwerbungs- und Portfoliozwecken.\n\nUmfang: Die Einwilligung umfasst den Schnitt, die musikalische Unterlegung sowie die Veröffentlichung von Highlights, Trailern und Filmsequenzen auf den angegebenen Kanälen.\n\nWiderrufsrecht (DSGVO): Diese Einwilligung kann jederzeit mit Wirkung für die Zukunft frei und ohne Angabe von Gründen per E-Mail an tolya.films@gmail.com widerrufen werden. Durch den Widerruf wird die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung und Veröffentlichung nicht berührt.`;

  const legalTextEn = `Grant of Consent: We (${data.partner1Name} & ${data.partner2Name}) hereby grant filmmaker Anatolii Rabochauskas (Tolya Films) explicit, non-exclusive, royalty-free, worldwide, and perpetual consent to use, publish, and distribute the video and photo footage created during our wedding exclusively on the approved outlets listed above for portfolio, showcase, and promotional purposes.\n\nScope of Rights: This consent includes editing, color grading, music licensing, and the publication of highlight films, teasers, trailers, and film stills on the specified channels.\n\nRight of Revocation (EU GDPR Art. 7): Granting this consent is voluntary. You have the right to revoke this consent at any time with future effect, freely and without giving reasons, by emailing tolya.films@gmail.com. Revocation shall not affect the lawfulness of processing or publication carried out prior to revocation.`;

  const splitLegalText = doc.splitTextToSize(isEn ? legalTextEn : legalTextDe, pageWidth - 30);
  doc.text(splitLegalText, 15, 144);

  // 6. Signature Section
  const signatureY = 195;
  doc.setDrawColor(200, 200, 200);
  doc.line(15, signatureY, pageWidth - 15, signatureY);

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(197, 160, 89);
  doc.text(
    isEn ? '4. DIGITAL SIGNATURE OF THE COUPLE' : '4. DIGITALE UNTERSCHRIFT DES PAARES',
    15,
    signatureY + 8
  );

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
  doc.text(
    isEn
      ? `Digitally signed via tolyafilms.com on ${data.timestamp}`
      : `Digital unterzeichnet über tolyafilms.com am ${data.timestamp}`,
    15,
    signatureY + 42
  );
  doc.text(
    isEn
      ? `Legally valid electronic consent under Art. 6(1)(a) EU GDPR & § 22 KUG Image Copyright`
      : `Rechtsgültige elektronische Einwilligung gemäß § 22 KUG & Art. 6 Abs. 1 lit. a DSGVO`,
    15,
    signatureY + 46
  );

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    `© ${new Date().getFullYear()} Tolya Films · Anatolii Rabochauskas · Heckerstraße 9, 68199 Mannheim · tolyafilms.com`,
    pageWidth / 2,
    285,
    { align: 'center' }
  );

  return doc;
};
