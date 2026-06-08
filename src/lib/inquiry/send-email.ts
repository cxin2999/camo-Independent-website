import type { InquiryInput } from "@/lib/inquiry/schema";

const RESEND_EMAILS_ENDPOINT = "https://api.resend.com/emails";

type ResendEmailPayload = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  reply_to?: string[];
};

export async function sendInquiryEmail(inquiry: InquiryInput) {
  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!to || !from || !apiKey) {
    console.info("Inquiry received without email service configured", {
      email: inquiry.email,
      productInterest: inquiry.productInterest,
      quantity: inquiry.quantity
    });
    return { mode: "development" as const };
  }

  const businessEmail = await sendResendEmail(apiKey, {
    from,
    to: [to],
    subject: `New material inquiry from ${inquiry.email}`,
    html: buildBusinessEmailHtml(inquiry),
    reply_to: [inquiry.email]
  });

  const customerEmail = await sendResendEmail(apiKey, {
    from,
    to: [inquiry.email],
    subject: "We received your camouflage fabric inquiry",
    html: buildCustomerEmailHtml(inquiry)
  });

  return {
    mode: "sent" as const,
    businessEmailId: businessEmail.id,
    customerEmailId: customerEmail.id
  };
}

async function sendResendEmail(apiKey: string, payload: ResendEmailPayload) {
  const response = await fetch(RESEND_EMAILS_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    console.error("Resend email send failed", {
      status: response.status,
      result,
      subject: payload.subject,
      to: payload.to
    });
    throw new Error(`Resend email send failed with status ${response.status}`);
  }

  return result as { id: string };
}

function buildBusinessEmailHtml(inquiry: InquiryInput) {
  const rows = [
    ["Name", inquiry.name || "Not provided"],
    ["Company", inquiry.company || "Not provided"],
    ["Email", inquiry.email],
    ["Country", inquiry.country || "Not provided"],
    ["WhatsApp", inquiry.whatsapp || "Not provided"],
    ["Product Interest", inquiry.productInterest],
    ["Pattern / Color", inquiry.patternColor || "Not provided"],
    ["Width / Thickness", inquiry.widthThickness || "Not provided"],
    ["Quantity", inquiry.quantity],
    ["Backing Type", inquiry.backingType || "Not provided"],
    ["Source Page", inquiry.sourcePage || "Not provided"]
  ];

  return renderEmailShell(`
    <h1 style="margin:0 0 16px;font-size:24px;line-height:1.25;color:#1f2418;">New material inquiry</h1>
    <p style="margin:0 0 24px;color:#526044;line-height:1.6;">A customer submitted an inquiry from the camouflage hook and loop fabric website.</p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      ${rows
        .map(
          ([label, value]) => `
            <tr>
              <th style="width:34%;padding:10px 12px;border:1px solid #d9dfcf;background:#f5f7ef;text-align:left;font-size:13px;color:#526044;">${escapeHtml(label)}</th>
              <td style="padding:10px 12px;border:1px solid #d9dfcf;font-size:14px;color:#1f2418;">${escapeHtml(value)}</td>
            </tr>
          `
        )
        .join("")}
    </table>
    <h2 style="margin:0 0 10px;font-size:16px;color:#1f2418;">Message</h2>
    <div style="padding:14px 16px;border:1px solid #d9dfcf;background:#fbfcf7;color:#1f2418;line-height:1.7;white-space:pre-wrap;">${escapeHtml(inquiry.message)}</div>
  `);
}

function buildCustomerEmailHtml(inquiry: InquiryInput) {
  return renderEmailShell(`
    <h1 style="margin:0 0 16px;font-size:24px;line-height:1.25;color:#1f2418;">We received your inquiry</h1>
    <p style="margin:0 0 16px;color:#526044;line-height:1.6;">Thank you for contacting us about camouflage hook and loop fabric materials. Our team will review your requirements and reply with suitable material options and quotation details.</p>
    <div style="margin:24px 0;padding:14px 16px;border:1px solid #d9dfcf;background:#fbfcf7;color:#1f2418;line-height:1.7;">
      <strong>Product interest:</strong> ${escapeHtml(inquiry.productInterest)}<br />
      <strong>Quantity:</strong> ${escapeHtml(inquiry.quantity)}
    </div>
    <p style="margin:0;color:#526044;line-height:1.6;">If you have sample photos or reference images, you can reply directly to this email and attach them.</p>
  `);
}

function renderEmailShell(content: string) {
  return `
    <!doctype html>
    <html>
      <body style="margin:0;background:#eef1e5;padding:24px;font-family:Arial,Helvetica,sans-serif;">
        <main style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #d9dfcf;padding:28px;">
          ${content}
          <p style="margin:28px 0 0;padding-top:18px;border-top:1px solid #d9dfcf;color:#7a856f;font-size:12px;line-height:1.6;">TacticalTex Materials · Camo Hook and Loop Fabric Manufacturer</p>
        </main>
      </body>
    </html>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
