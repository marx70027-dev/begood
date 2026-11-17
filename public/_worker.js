const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const clean = (v, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function handleContact(request, env) {
  if (!env.RESEND_API_KEY) return json({ error: "Server is not configured." }, 500);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  if (body.website) return json({ success: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 254);
  const phone = clean(body.phone, 50);
  const projectType = clean(body.projectType, 100);
  const budget = clean(body.budget, 100);
  const message = clean(body.message);

  if (name.length < 2) return json({ error: "Name must be at least 2 characters." }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Invalid email address." }, 400);
  if (message.length < 10) return json({ error: "Message must be at least 10 characters." }, 400);

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Project type", projectType],
    ["Budget", budget],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:8px 16px 8px 0;color:#888">${k}</td><td style="padding:8px 0"><b>${esc(v)}</b></td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "weblirev.com <onboarding@resend.dev>",
      to: env.CONTACT_EMAIL || "mateostopic2703@gmail.com",
      reply_to: email,
      subject: `[weblirev] New message from ${name}`,
      html: `<div style="font-family:sans-serif;max-width:600px"><h2>New message from weblirev.com</h2><table>${rows}</table><h3>Message</h3><p style="white-space:pre-wrap">${esc(message)}</p></div>`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return json({ error: "Failed to send. Please try again." }, 500);
  }
  return json({ success: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
      return handleContact(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
