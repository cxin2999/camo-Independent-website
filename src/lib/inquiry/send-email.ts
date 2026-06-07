import type { InquiryInput } from "@/lib/inquiry/schema";

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

  console.info("Email service placeholder", { to, from, inquiry });
  return { mode: "configured" as const };
}
