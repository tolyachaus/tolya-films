export default {
  async fetch(request, env) {
    // 1. Handle CORS
    const origin = request.headers.get("Origin") || "";
    const allowedOrigins = [
      "https://tolyafilms.com",
      "https://www.tolyafilms.com",
      "http://localhost:5173",
      "http://localhost:3000"
    ];

    const isAllowed = allowedOrigins.includes(origin) || origin.endsWith(".github.io");

    const corsHeaders = {
      "Access-Control-Allow-Origin": isAllowed ? origin : "https://tolyafilms.com",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
      "Access-Control-Max-Age": "86400"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    try {
      const data = await request.json();

      // 2. Validate Required Fields
      if (!data.email || !data.partner1Name || !data.pdfBase64) {
        return new Response(
          JSON.stringify({ error: "Missing required fields (email, partner1Name, pdfBase64)" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const RESEND_API_KEY = env.RESEND_API_KEY;
      if (!RESEND_API_KEY) {
        return new Response(
          JSON.stringify({ error: "Server misconfiguration: RESEND_API_KEY secret is not set in Cloudflare" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const isEn = data.lang === "en";
      const safePartnerName = (data.partner1Name || "Client").replace(/[^a-zA-Z0-9_\-]/g, "_");
      
      const safeFilename = isEn
        ? `Media_Release_Agreement_TolyaFilms_${safePartnerName}.pdf`
        : `Einwilligungserklaerung_TolyaFilms_${safePartnerName}.pdf`;

      const emailSubject = isEn
        ? `Media Release Agreement: ${data.partner1Name} & ${data.partner2Name || ""}`.trim()
        : `Einwilligungserklärung (Media Release): ${data.partner1Name} & ${data.partner2Name || ""}`.trim();

      // 3. Cinematic HTML Email Template
      const htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111111; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eaeaea; border-radius: 6px; background-color: #ffffff;">
          <div style="background-color: #111111; padding: 24px; text-align: center; border-radius: 4px;">
            <h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0; letter-spacing: 1px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Tolya films</h1>
            <p style="color: #D4AF37; font-size: 11px; margin: 6px 0 0 0; text-transform: uppercase; letter-spacing: 2px;">
              ${isEn ? "Media Release & Consent Agreement" : "Einwilligungserklärung für Film- & Fotomaterial"}
            </p>
          </div>
          
          <div style="padding: 24px 8px 16px 8px;">
            <p style="font-size: 15px; margin-top: 0; color: #111111;">
              ${isEn ? "Hello" : "Hallo"} <strong>${data.partner1Name}${data.partner2Name ? " & " + data.partner2Name : ""}</strong>,
            </p>
            <p style="font-size: 13.5px; color: #444444; line-height: 1.6;">
              ${
                isEn
                  ? "Thank you! Your <strong>Media Release & Consent Agreement</strong> has been successfully submitted and digitally signed."
                  : "vielen Dank! Ihre <strong>Einwilligungserklärung zur Nutzung von Bild- und Videomaterial</strong> wurde erfolgreich übermittelt und digital unterzeichnet."
              }
            </p>
            
            <div style="background-color: #FAF8F5; border-left: 3px solid #D4AF37; padding: 16px; margin: 20px 0; font-size: 12.5px; line-height: 1.7; color: #222222; border-radius: 2px;">
              <p style="margin: 0 0 6px 0;"><strong>${isEn ? "Contract Partners:" : "Vertragspartner:"}</strong> ${data.partner1Name}${data.partner2Name ? " & " + data.partner2Name : ""}</p>
              <p style="margin: 0 0 6px 0;"><strong>${isEn ? "Wedding Date:" : "Hochzeitsdatum:"}</strong> ${data.weddingDate || "—"}</p>
              <p style="margin: 0 0 6px 0;"><strong>${isEn ? "Location / Venue:" : "Location & Ort:"}</strong> ${data.location || "—"}</p>
              <p style="margin: 0 0 6px 0;"><strong>E-Mail:</strong> ${data.email}</p>
              <p style="margin: 0;"><strong>${isEn ? "Signed On (Timestamp):" : "Unterzeichnet am (Zeitstempel):"}</strong> ${data.timestamp || "—"}</p>
            </div>

            <p style="font-size: 13px; color: #111111; margin-bottom: 0;">
              📎 <strong>${
                isEn
                  ? "The legally binding PDF document with your digital signature is attached directly to this email."
                  : "Das rechtlich bindende PDF-Dokument mit Ihrer digitalen Unterschrift befindet sich direkt im Anhang dieser E-Mail."
              }</strong>
            </p>
          </div>

          <div style="border-top: 1px solid #eeeeee; padding-top: 18px; margin-top: 16px; text-align: center; font-size: 11px; color: #888888; line-height: 1.5;">
            © ${new Date().getFullYear()} Tolya films · Anatolii Rabochauskas · Mannheim · <a href="https://tolyafilms.com" style="color: #D4AF37; text-decoration: none;">tolyafilms.com</a>
          </div>
        </div>
      `;

      // 4. Send Email via Resend API (Recipient + BCC Tolya films)
      const fromSender = env.FROM_EMAIL || "Tolya films <release@tolyafilms.com>";

      const resendPayload = {
        from: fromSender,
        to: [data.email],
        bcc: ["tolya.films@gmail.com"],
        reply_to: "tolya.films@gmail.com",
        subject: emailSubject,
        html: htmlContent,
        attachments: [
          {
            filename: safeFilename,
            content: data.pdfBase64
          }
        ]
      };

      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(resendPayload)
      });

      const resendResult = await resendResponse.json();

      if (!resendResponse.ok) {
        console.error("Resend API rejected request:", resendResult);
        return new Response(
          JSON.stringify({ 
            error: "Resend delivery failed", 
            details: resendResult.message || resendResult 
          }),
          { status: resendResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, id: resendResult.id }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );

    } catch (error) {
      console.error("Worker error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error", message: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  }
};
