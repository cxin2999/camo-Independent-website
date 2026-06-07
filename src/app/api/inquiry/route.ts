import { NextResponse } from "next/server";
import { inquirySchema, validateSubmissionTime } from "@/lib/inquiry/schema";
import { sendInquiryEmail } from "@/lib/inquiry/send-email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = inquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the highlighted fields.",
        errors: parsed.error.flatten().fieldErrors
      },
      { status: 400 }
    );
  }

  if (!validateSubmissionTime(parsed.data.startedAt)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please wait a moment before submitting the form."
      },
      { status: 400 }
    );
  }

  await sendInquiryEmail(parsed.data);

  return NextResponse.json({
    ok: true,
    message:
      "Thank you. We have received your material requirements and will reply with suitable options and quotation details."
  });
}
