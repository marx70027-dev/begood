import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not configured");
  return new Resend(key);
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 3;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxRequests) return false;
  entry.count++;
  return true;
}

function sanitize(str: unknown): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim()
    .slice(0, 2000);
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Previše zahtjeva. Pokušajte za minutu." },
        { status: 429 }
      );
    }

    const body = await req.json();

    if (body.website || body.company_url) {
      return NextResponse.json({ success: true });
    }

    const name = sanitize(body.name);
    const email = sanitize(body.email);
    const phone = sanitize(body.phone);
    const message = sanitize(body.message);
    const projectType = sanitize(body.projectType);
    const budget = sanitize(body.budget);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Ime, email i poruka su obavezni." },
        { status: 400 }
      );
    }

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: "Ime mora imati 2-100 znakova." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 254) {
      return NextResponse.json(
        { error: "Nevažeća email adresa." },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Poruka mora imati barem 10 znakova." },
        { status: 400 }
      );
    }

    const resend = getResend();

    const safeHtml = `
      <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #fafafa; padding: 24px; border-radius: 12px;">
        <h2 style="color: #6366f1; margin-bottom: 4px;">Nova poruka s weblirev.com</h2>
        <p style="color: #999; font-size: 13px; margin-top: 0;">IP: ${ip}</p>
        <hr style="border: 1px solid #eee;" />
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 0; color: #888; width: 130px; font-size: 14px;">Ime:</td><td style="padding: 10px 0; font-weight: 600; font-size: 14px;">${name}</td></tr>
          <tr><td style="padding: 10px 0; color: #888; font-size: 14px;">Email:</td><td style="padding: 10px 0; font-size: 14px;">${email}</td></tr>
          ${phone ? `<tr><td style="padding: 10px 0; color: #888; font-size: 14px;">Telefon:</td><td style="padding: 10px 0; font-size: 14px;">${phone}</td></tr>` : ""}
          ${projectType ? `<tr><td style="padding: 10px 0; color: #888; font-size: 14px;">Tip projekta:</td><td style="padding: 10px 0; font-size: 14px;">${projectType}</td></tr>` : ""}
          ${budget ? `<tr><td style="padding: 10px 0; color: #888; font-size: 14px;">Budžet:</td><td style="padding: 10px 0; font-size: 14px;">${budget}</td></tr>` : ""}
        </table>
        <hr style="border: 1px solid #eee;" />
        <h3 style="color: #333; font-size: 14px;">Poruka:</h3>
        <p style="color: #555; line-height: 1.7; font-size: 14px; white-space: pre-wrap;">${message}</p>
        <hr style="border: 1px solid #eee;" />
        <p style="color: #bbb; font-size: 11px; margin-top: 16px;">
          ⚠️ Ovo je upit s kontakt forme — NIJE potvrda plaćanja.
          Uvijek verificirajte uplatu na vašem bankovnom računu ili Stripe dashboardu
          prije isporuke usluge.
        </p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "weblirev.com <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "mateostopic2703@gmail.com",
      replyTo: email,
      subject: `[weblirev] Nova poruka od ${name} — ${projectType || "Upit"}`,
      html: safeHtml,
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
