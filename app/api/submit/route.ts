import { NextResponse } from "next/server";
import { Resend } from "resend";

let resend: Resend;
function getResend() {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

const PHONE_REGEX = /^\+?[\d\s\-()]{7,20}$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, country, businessType, message } = body;

    if (!phone?.trim() || !PHONE_REGEX.test(phone.trim())) {
      return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
    }
    if (!country) {
      return NextResponse.json({ error: "Country required" }, { status: 400 });
    }
    if (!businessType) {
      return NextResponse.json({ error: "Business type required" }, { status: 400 });
    }

    const { error } = await getResend().emails.send({
      from: "weblirev.com <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "mateostopic2703@gmail.com",
      subject: `New Website Request — ${businessType}`,
      html: `
        <h2>New Website Request from weblirev.com</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Country</td><td style="padding:8px;border-bottom:1px solid #eee;">${country}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Business Type</td><td style="padding:8px;border-bottom:1px solid #eee;">${businessType}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${message || "—"}</td></tr>
        </table>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
