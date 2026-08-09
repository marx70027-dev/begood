import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not configured");
  return new Resend(key);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, projectType, budget } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Ime, email i poruka su obavezni." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Nevažeća email adresa." },
        { status: 400 }
      );
    }

    const resend = getResend();

    const { error } = await resend.emails.send({
      from: "weblirev.com <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "mateostopic2703@gmail.com",
      replyTo: email,
      subject: `Nova poruka od ${name} — ${projectType || "Upit"}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #06b6d4;">Nova poruka s weblirev.com</h2>
          <hr style="border: 1px solid #e5e7eb;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; width: 120px;">Ime:</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Email:</td><td style="padding: 8px 0;">${email}</td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #6b7280;">Telefon:</td><td style="padding: 8px 0;">${phone}</td></tr>` : ""}
            ${projectType ? `<tr><td style="padding: 8px 0; color: #6b7280;">Tip projekta:</td><td style="padding: 8px 0;">${projectType}</td></tr>` : ""}
            ${budget ? `<tr><td style="padding: 8px 0; color: #6b7280;">Budžet:</td><td style="padding: 8px 0;">${budget}</td></tr>` : ""}
          </table>
          <hr style="border: 1px solid #e5e7eb;" />
          <h3 style="color: #374151;">Poruka:</h3>
          <p style="color: #4b5563; line-height: 1.6;">${message.replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Greška pri slanju. Pokušajte ponovo." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Greška na serveru. Pokušajte ponovo." },
      { status: 500 }
    );
  }
}
