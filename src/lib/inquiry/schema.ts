import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().max(80).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email address").max(120),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  whatsapp: z.string().trim().max(80).optional().or(z.literal("")),
  productInterest: z.string().trim().min(2, "Product interest is required").max(140),
  patternColor: z.string().trim().max(140).optional().or(z.literal("")),
  widthThickness: z.string().trim().max(140).optional().or(z.literal("")),
  quantity: z.string().trim().min(1, "Quantity is required").max(80),
  backingType: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(4, "Please add a short requirement").max(2000),
  sourcePage: z.string().trim().max(160).optional().or(z.literal("")),
  website: z.string().max(0, "Spam check failed").optional().or(z.literal("")),
  startedAt: z.coerce.number().optional()
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export function validateSubmissionTime(startedAt?: number) {
  if (!startedAt) return true;
  return Date.now() - startedAt > 2500;
}
