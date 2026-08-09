"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Send,
  Menu,
  X,
  ChevronDown,
  CreditCard,
  Building2,
  Bitcoin,
  Receipt,
  ExternalLink,
  Code2,
  Palette,
  Rocket,
  Globe,
  Shield,
  Smartphone,
} from "lucide-react";
import { useState, useRef, type FormEvent } from "react";
import HeroAnimation from "@/components/ui/hero-animation";
import { Button } from "@/components/ui/neon-button";
import Logo from "@/components/ui/logo";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

// ── Data ──

const SKILLS = [
  { name: "React / Next.js", pct: 95, icon: <Code2 className="size-4" /> },
  { name: "UI/UX Dizajn", pct: 90, icon: <Palette className="size-4" /> },
  { name: "Performance", pct: 92, icon: <Rocket className="size-4" /> },
  { name: "SEO", pct: 88, icon: <Globe className="size-4" /> },
  { name: "Sigurnost", pct: 85, icon: <Shield className="size-4" /> },
  { name: "Responzivnost", pct: 95, icon: <Smartphone className="size-4" /> },
];

const STEPS = [
  { n: "01", title: "Konzultacija", desc: "Upoznajemo vaše potrebe, ciljeve i viziju projekta." },
  { n: "02", title: "Dizajn", desc: "Wireframe i vizualni dizajn prilagođen vašem brendu." },
  { n: "03", title: "Razvoj", desc: "Kodiramo s najnovijim tehnologijama — brzo, sigurno, responzivno." },
  { n: "04", title: "Lansiranje", desc: "Postavljamo sve na server, konfiguriramo domenu — live." },
];

const PORTFOLIO = [
  { title: "E-commerce platforma", cat: "web-shop", bg: "#111", tags: ["Next.js", "Stripe", "Tailwind"] },
  { title: "Korporativna stranica", cat: "korporativno", bg: "#0d0d0d", tags: ["React", "CMS", "SEO"] },
  { title: "SaaS dashboard", cat: "aplikacija", bg: "#0a0a0a", tags: ["TypeScript", "Charts", "API"] },
  { title: "Portfolio fotografa", cat: "portfolio", bg: "#111", tags: ["Galerija", "Animacije", "Lightbox"] },
  { title: "Restaurant web", cat: "ugostiteljstvo", bg: "#0d0d0d", tags: ["Rezervacije", "Meni", "Mapa"] },
  { title: "Fitness aplikacija", cat: "aplikacija", bg: "#0a0a0a", tags: ["PWA", "Dashboard", "Tracking"] },
];

const CATS = ["sve", "web-shop", "korporativno", "aplikacija", "portfolio", "ugostiteljstvo"];

const PAYMENTS = [
  { icon: <Building2 className="size-6" />, title: "Bankovna transakcija", sub: "IBAN / Transakcijski račun" },
  { icon: <CreditCard className="size-6" />, title: "Kartice", sub: "Stripe / Revolut Business" },
  { icon: <Bitcoin className="size-6" />, title: "Kriptovalute", sub: "Po dogovoru" },
  { icon: <Receipt className="size-6" />, title: "Gotovina / Račun", sub: "Po ponudi" },
];

const PROJECT_TYPES = [
  "Landing page", "Korporativna stranica", "Web shop", "Web aplikacija",
  "Portfolio", "Blog / CMS", "Redizajn postojeće", "Drugo",
];

const BUDGETS = ["Do 500€", "500€ – 1000€", "1000€ – 2000€", "2000€+", "Po dogovoru"];

// ── Page ──

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCat, setActiveCat] = useState("sve");
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const filtered = activeCat === "sve" ? PORTFOLIO : PORTFOLIO.filter((p) => p.cat === activeCat);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    setErrorMsg("");
    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      message: fd.get("message"),
      projectType: fd.get("projectType"),
      budget: fd.get("budget"),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Greška pri slanju.");
      }
      setFormStatus("sent");
      formRef.current?.reset();
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (err) {
      setFormStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Greška pri slanju.");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  }

  const NAV = [
    { id: "o-nama", label: "O nama" },
    { id: "usluge", label: "Usluge" },
    { id: "portfolio", label: "Portfolio" },
    { id: "placanje", label: "Plaćanje" },
    { id: "kontakt", label: "Kontakt" },
  ];

  const inputCls =
    "w-full bg-dark-800 border border-white/[0.06] rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors";

  return (
    <div className="bg-dark-950">
      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-dark-950/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <a href="#">
            <Logo className="h-6 w-auto" />
          </a>
          <ul className="hidden md:flex gap-8">
            {NAV.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-[13px] text-white/40 hover:text-white transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a href="#kontakt" className="hidden md:block">
              <Button size="sm">Započni projekt</Button>
            </a>
            <button
              className="md:hidden text-white/50 hover:text-white p-1"
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Menu"
            >
              {mobileMenu ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/[0.04] overflow-hidden bg-dark-950/95 backdrop-blur-xl"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {NAV.map((l) => (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    className="text-white/50 hover:text-white py-2.5 text-sm"
                    onClick={() => setMobileMenu(false)}
                  >
                    {l.label}
                  </a>
                ))}
                <a href="#kontakt" className="mt-2" onClick={() => setMobileMenu(false)}>
                  <Button className="w-full" size="sm">Započni projekt</Button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroAnimation />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-950/40 to-dark-950" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 w-full">
          <div className="max-w-2xl">
            <motion.p custom={0} variants={fade} initial="hidden" animate="visible" className="text-white/30 text-sm tracking-wider uppercase mb-6">
              Izrada web stranica
            </motion.p>

            <motion.h1 custom={1} variants={fade} initial="hidden" animate="visible" className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold leading-[1.15] mb-6 tracking-tight">
              Vaš digitalni uspjeh<br />počinje ovdje.
            </motion.h1>

            <motion.p custom={2} variants={fade} initial="hidden" animate="visible" className="text-white/35 text-lg leading-relaxed mb-10 max-w-lg">
              Dizajniramo i razvijamo moderne web stranice koje privlače klijente
              i rastu s vašim poslom.
            </motion.p>

            <motion.div custom={3} variants={fade} initial="hidden" animate="visible" className="flex gap-3 flex-wrap">
              <a href="#kontakt">
                <Button size="lg">
                  Započni projekt <ArrowRight className="inline size-4 ml-1.5" />
                </Button>
              </a>
              <a href="#portfolio">
                <Button variant="outline" size="lg">Pogledaj radove</Button>
              </a>
            </motion.div>
          </div>
        </div>

        <motion.a
          href="#o-nama"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/15 hover:text-white/30 transition-colors z-10"
        >
          <ChevronDown className="size-5" />
        </motion.a>
      </section>

      {/* ── O nama ── */}
      <section id="o-nama" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHead label="O nama" title="Gradimo digitalna iskustva" sub="Kombiniramo vrhunski dizajn i najnovije tehnologije za rezultate koji se vide." />

          {/* Skill cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-24 max-w-3xl mx-auto">
            {SKILLS.map((s, i) => (
              <motion.div
                key={s.name}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="cursor-pointer"
                style={{ perspective: 600 }}
                onClick={() => setFlipped((p) => ({ ...p, [i]: !p[i] }))}
              >
                <div
                  className={`relative w-full h-32 transition-transform duration-500 [transform-style:preserve-3d] ${
                    flipped[i] ? "[transform:rotateY(180deg)]" : ""
                  }`}
                >
                  {/* front */}
                  <div className="absolute inset-0 bg-dark-800 border border-white/[0.06] rounded-xl p-4 flex flex-col justify-between [backface-visibility:hidden]">
                    <div className="flex items-center gap-2 text-white/50">
                      {s.icon}
                      <span className="text-[13px] font-medium text-white/70">{s.name}</span>
                    </div>
                    <div>
                      <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-white/40 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.08 }}
                        />
                      </div>
                      <span className="text-[11px] text-white/20 mt-1.5 block">Klikni za detalje</span>
                    </div>
                  </div>
                  {/* back */}
                  <div className="absolute inset-0 bg-dark-700 border border-white/[0.08] rounded-xl p-4 flex items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div>
                      <span className="text-3xl font-bold text-white block">{s.pct}%</span>
                      <span className="text-white/40 text-xs">{s.name}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process steps */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-sm text-white/30 uppercase tracking-wider text-center mb-12">Proces rada</h3>
            <div className="space-y-0">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.n}
                  custom={i}
                  variants={fade}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex gap-6 group"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-xs text-white/40 font-mono group-hover:border-white/20 group-hover:text-white/60 transition-colors flex-shrink-0">
                      {step.n}
                    </div>
                    {i < STEPS.length - 1 && <div className="w-px h-full bg-white/[0.06] min-h-[40px]" />}
                  </div>
                  <div className="pb-10">
                    <h4 className="text-[15px] font-semibold text-white/80 mb-1">{step.title}</h4>
                    <p className="text-sm text-white/30 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Usluge ── */}
      <section id="usluge" className="py-28 px-6 bg-dark-900/50">
        <div className="max-w-6xl mx-auto">
          <SectionHead label="Ponuda" title="Usluge i cijene" sub="Transparentne cijene, bez skrivenih troškova." />

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {/* Standard */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-dark-800 border border-white/[0.06] rounded-2xl p-8 hover:border-white/10 transition-colors"
            >
              <span className="text-[11px] text-white/30 uppercase tracking-wider">Standardni paket</span>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-white">1000€</span>
                <span className="text-white/25 text-sm ml-1">/ godišnje</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Moderan, responzivan dizajn",
                  "Do 5 stranica",
                  "SEO optimizacija",
                  "SSL certifikat",
                  "Hosting uključen",
                  "Kontakt forma",
                  "Google Analytics",
                  "Podrška i održavanje",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-white/40 text-sm">
                    <Check className="size-3.5 text-white/25 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#kontakt">
                <Button className="w-full">Zatražite ponudu</Button>
              </a>
            </motion.div>

            {/* Custom */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-dark-800 border border-white/[0.08] rounded-2xl p-8 hover:border-white/12 transition-colors relative"
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] text-white/80 uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-full">Premium</span>
              </div>
              <span className="text-[11px] text-white/30 uppercase tracking-wider">Po dogovoru</span>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-white">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Sve iz standardnog paketa",
                  "Neograničen broj stranica",
                  "E-commerce / Web shop",
                  "Prilagođene funkcionalnosti",
                  "CMS integracija",
                  "API integracije",
                  "Napredna analitika",
                  "Prioritetna podrška",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-white/40 text-sm">
                    <Check className="size-3.5 text-white/25 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#kontakt">
                <Button variant="outline" className="w-full">Razgovarajmo</Button>
              </a>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-16 max-w-3xl mx-auto">
            {[
              { n: "50+", l: "Projekata" },
              { n: "100%", l: "Zadovoljstvo" },
              { n: "24/7", l: "Podrška" },
              { n: "30+", l: "Klijenata" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center py-6"
              >
                <span className="text-2xl font-bold text-white block">{s.n}</span>
                <span className="text-white/20 text-xs">{s.l}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio ── */}
      <section id="portfolio" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHead label="Radovi" title="Portfolio" sub="Pogledajte projekte koje smo ostvarili za naše klijente." />

          <div className="flex gap-2 mb-10 justify-center flex-wrap">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`px-3.5 py-1.5 rounded-md text-[13px] transition-all cursor-pointer ${
                  activeCat === c
                    ? "bg-white/10 text-white"
                    : "text-white/25 hover:text-white/40"
                }`}
              >
                {c === "sve" ? "Sve" : c === "web-shop" ? "Web Shop" : c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.title}
                  layout
                  custom={i}
                  variants={fade}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group bg-dark-800 border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/10 transition-colors cursor-pointer"
                >
                  <div
                    className="h-44 relative flex items-center justify-center"
                    style={{ background: p.bg }}
                  >
                    <span className="text-white/[0.03] text-6xl font-bold select-none">{p.title.charAt(0)}</span>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <span className="flex items-center gap-1.5 text-white text-sm font-medium">
                        <ExternalLink className="size-3.5" /> Pogledaj
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-white/80 mb-2">{p.title}</h3>
                    <div className="flex gap-1.5 flex-wrap">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-white/[0.04] text-white/25">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Plaćanje ── */}
      <section id="placanje" className="py-28 px-6 bg-dark-900/50">
        <div className="max-w-6xl mx-auto">
          <SectionHead label="Plaćanje" title="Načini plaćanja" sub="Prihvaćamo više načina plaćanja za vašu udobnost." />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {PAYMENTS.map((m, i) => (
              <motion.div
                key={m.title}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-dark-800 border border-white/[0.06] rounded-xl p-5 text-center hover:border-white/10 transition-colors"
              >
                <div className="text-white/30 flex justify-center mb-3">{m.icon}</div>
                <h3 className="text-sm font-medium text-white/70 mb-0.5">{m.title}</h3>
                <p className="text-[11px] text-white/20">{m.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Kontakt ── */}
      <section id="kontakt" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHead label="Kontakt" title="Započnite svoj projekt" sub="Ispunite formu i javit ćemo vam se u roku 24h." />

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto bg-dark-800 border border-white/[0.06] rounded-2xl p-8 space-y-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/30 text-xs mb-1.5">Ime i prezime *</label>
                <input name="name" type="text" required className={inputCls} placeholder="Vaše ime" />
              </div>
              <div>
                <label className="block text-white/30 text-xs mb-1.5">Email *</label>
                <input name="email" type="email" required className={inputCls} placeholder="vas@email.com" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/30 text-xs mb-1.5">Telefon</label>
                <input name="phone" type="tel" className={inputCls} placeholder="+385 ..." />
              </div>
              <div>
                <label className="block text-white/30 text-xs mb-1.5">Tip projekta</label>
                <select name="projectType" className={`${inputCls} appearance-none cursor-pointer`}>
                  <option value="" className="bg-dark-800">Odaberite...</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-dark-800">{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white/30 text-xs mb-1.5">Budžet</label>
              <select name="budget" className={`${inputCls} appearance-none cursor-pointer`}>
                <option value="" className="bg-dark-800">Odaberite raspon...</option>
                {BUDGETS.map((b) => (
                  <option key={b} value={b} className="bg-dark-800">{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white/30 text-xs mb-1.5">Poruka *</label>
              <textarea
                name="message"
                required
                rows={4}
                className={`${inputCls} resize-none`}
                placeholder="Opišite svoj projekt..."
              />
            </div>

            <Button
              type="submit"
              disabled={formStatus === "sending"}
              className="w-full disabled:opacity-40"
              size="lg"
            >
              {formStatus === "sending" ? (
                "Šalje se..."
              ) : formStatus === "sent" ? (
                <span className="flex items-center justify-center gap-2"><Check className="size-4" /> Poslano!</span>
              ) : (
                <span className="flex items-center justify-center gap-2"><Send className="size-4" /> Pošaljite poruku</span>
              )}
            </Button>

            {formStatus === "error" && <p className="text-red-400/80 text-sm text-center">{errorMsg}</p>}
            {formStatus === "sent" && <p className="text-white/40 text-sm text-center">Hvala! Javit ćemo vam se u roku 24h.</p>}
          </motion.form>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.04] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo className="h-5 w-auto opacity-40" />
          <div className="flex gap-6">
            {NAV.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="text-white/15 hover:text-white/30 text-xs transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-white/10 text-xs">&copy; {new Date().getFullYear()} weblirev.com</p>
        </div>
      </footer>
    </div>
  );
}

// ── Helpers ──

function SectionHead({ label, title, sub }: { label: string; title: string; sub: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-14"
    >
      <span className="text-[11px] text-white/25 uppercase tracking-[3px] block mb-3">{label}</span>
      <h2 className="text-2xl md:text-4xl font-bold mb-3 tracking-tight">{title}</h2>
      <p className="text-white/30 max-w-lg mx-auto text-[15px]">{sub}</p>
    </motion.div>
  );
}
