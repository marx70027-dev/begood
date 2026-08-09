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
  Star,
  Zap,
  Clock,
  Users,
  Lock,
} from "lucide-react";
import { useState, useRef, type FormEvent } from "react";
import dynamic from "next/dynamic";
import Logo from "@/components/ui/logo";
import { GradientButton } from "@/components/ui/gradient-button";
import { CookieConsent } from "@/components/ui/cookie-consent";

const ScrollVideo = dynamic(() => import("@/components/ui/scroll-video"), { ssr: false });

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

// ── Data ──

const SKILLS = [
  { name: "React / Next.js", pct: 95, icon: <Code2 className="size-4" />, color: "from-blue-500 to-cyan-400" },
  { name: "UI/UX Dizajn", pct: 90, icon: <Palette className="size-4" />, color: "from-yellow-500 to-amber-400" },
  { name: "Performance", pct: 92, icon: <Rocket className="size-4" />, color: "from-rose-500 to-pink-400" },
  { name: "SEO", pct: 88, icon: <Globe className="size-4" />, color: "from-emerald-500 to-teal-400" },
  { name: "Sigurnost", pct: 85, icon: <Shield className="size-4" />, color: "from-indigo-500 to-blue-400" },
  { name: "Responzivnost", pct: 95, icon: <Smartphone className="size-4" />, color: "from-orange-500 to-amber-400" },
];

const STEPS = [
  { n: "01", title: "Konzultacija", desc: "Upoznajemo vaše potrebe, ciljeve i viziju projekta.", color: "text-blue-600", bg: "bg-blue-100", border: "border-blue-200" },
  { n: "02", title: "Dizajn", desc: "Wireframe i vizualni dizajn prilagođen vašem brendu.", color: "text-yellow-600", bg: "bg-yellow-100", border: "border-yellow-200" },
  { n: "03", title: "Razvoj", desc: "Kodiramo s najnovijim tehnologijama — brzo, sigurno, responzivno.", color: "text-emerald-600", bg: "bg-emerald-100", border: "border-emerald-200" },
  { n: "04", title: "Lansiranje", desc: "Postavljamo sve na server, konfiguriramo domenu — live.", color: "text-rose-600", bg: "bg-rose-100", border: "border-rose-200" },
];

const PORTFOLIO = [
  { title: "E-commerce platforma", cat: "web-shop", gradient: "from-blue-600 via-indigo-500 to-violet-500", tags: ["Next.js", "Stripe", "Tailwind"] },
  { title: "Korporativna stranica", cat: "korporativno", gradient: "from-amber-500 via-yellow-400 to-orange-400", tags: ["React", "CMS", "SEO"] },
  { title: "SaaS dashboard", cat: "aplikacija", gradient: "from-emerald-500 via-teal-400 to-cyan-400", tags: ["TypeScript", "Charts", "API"] },
  { title: "Portfolio fotografa", cat: "portfolio", gradient: "from-pink-500 via-rose-400 to-red-400", tags: ["Galerija", "Animacije", "Lightbox"] },
  { title: "Restaurant web", cat: "ugostiteljstvo", gradient: "from-orange-500 via-amber-400 to-yellow-400", tags: ["Rezervacije", "Meni", "Mapa"] },
  { title: "Fitness aplikacija", cat: "aplikacija", gradient: "from-cyan-500 via-blue-400 to-indigo-500", tags: ["PWA", "Dashboard", "Tracking"] },
];

const CATS = ["sve", "web-shop", "korporativno", "aplikacija", "portfolio", "ugostiteljstvo"];

const PAYMENTS = [
  { icon: <Building2 className="size-6" />, title: "Bankovna transakcija", sub: "IBAN / Transakcijski račun", color: "bg-blue-500" },
  { icon: <CreditCard className="size-6" />, title: "Kartice", sub: "Stripe / Revolut Business", color: "bg-indigo-500" },
  { icon: <Bitcoin className="size-6" />, title: "Kriptovalute", sub: "Po dogovoru", color: "bg-amber-500" },
  { icon: <Receipt className="size-6" />, title: "Gotovina / Račun", sub: "Po ponudi", color: "bg-emerald-500" },
];

const PROJECT_TYPES = [
  "Landing page", "Korporativna stranica", "Web shop", "Web aplikacija",
  "Portfolio", "Blog / CMS", "Redizajn postojeće", "Drugo",
];

const BUDGETS = ["Do 500€", "500€ – 1000€", "1000€ – 2000€", "2000€+", "Po dogovoru"];

// ── Component ──

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

    if (fd.get("website")) return;

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

  return (
    <div>
      <CookieConsent />

      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <a href="#">
            <Logo className="h-6 w-auto" />
          </a>
          <ul className="hidden md:flex gap-8">
            {NAV.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-[13px] text-white/50 hover:text-white transition-colors font-display tracking-wide">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a href="#kontakt" className="hidden md:block">
              <GradientButton size="sm">Započni projekt</GradientButton>
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
              className="md:hidden border-t border-white/[0.06] overflow-hidden bg-black/90 backdrop-blur-xl"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {NAV.map((l) => (
                  <a key={l.id} href={`#${l.id}`} className="text-white/50 hover:text-white py-2.5 text-sm font-display" onClick={() => setMobileMenu(false)}>
                    {l.label}
                  </a>
                ))}
                <a href="#kontakt" className="mt-2" onClick={() => setMobileMenu(false)}>
                  <GradientButton size="sm" className="w-full">Započni projekt</GradientButton>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Hero with scroll-driven video ── */}
      <section className="relative">
        <ScrollVideo />

        <div className="absolute top-0 left-0 right-0 h-screen flex items-center z-10 pointer-events-none">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <div className="max-w-2xl pointer-events-auto">
              <motion.div custom={0} variants={fade} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-display tracking-widest uppercase mb-6">
                <Zap className="size-3" />
                Web Development Studio
              </motion.div>

              <motion.h1 custom={1} variants={fade} initial="hidden" animate="visible" className="text-4xl sm:text-5xl md:text-[3.8rem] font-extrabold leading-[1.1] mb-6 tracking-tight font-display">
                Vaš digitalni uspjeh
                <br />
                <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                  počinje ovdje.
                </span>
              </motion.h1>

              <motion.p custom={2} variants={fade} initial="hidden" animate="visible" className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
                Dizajniramo i razvijamo moderne web stranice koje privlače klijente
                i rastu s vašim poslom.
              </motion.p>

              <motion.div custom={3} variants={fade} initial="hidden" animate="visible" className="flex gap-3 flex-wrap">
                <a href="#kontakt">
                  <GradientButton size="lg">
                    Započni projekt <ArrowRight className="size-4 ml-1" />
                  </GradientButton>
                </a>
                <a href="#portfolio">
                  <GradientButton variant="variant" size="lg">Pogledaj radove</GradientButton>
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.a href="#o-nama" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-[calc(200vh+40px)] left-1/2 -translate-x-1/2 text-white/30 hover:text-white/60 transition-colors z-10"
        >
          <ChevronDown className="size-5" />
        </motion.a>
      </section>

      {/* ── O nama — cream/beige section ── */}
      <section id="o-nama" className="py-28 px-6 bg-cream light-section">
        <div className="max-w-6xl mx-auto">
          <SectionHeadLight
            label="O nama"
            title={<>Gradimo <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">digitalna iskustva</span></>}
            sub="Kombiniramo vrhunski dizajn i najnovije tehnologije za rezultate koji se vide."
          />

          {/* Skill cards — light theme */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-24 max-w-3xl mx-auto">
            {SKILLS.map((s, i) => (
              <motion.div
                key={s.name}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="cursor-pointer group"
                style={{ perspective: 600 }}
                onClick={() => setFlipped((p) => ({ ...p, [i]: !p[i] }))}
              >
                <div className={`relative w-full h-36 transition-transform duration-500 [transform-style:preserve-3d] ${flipped[i] ? "[transform:rotateY(180deg)]" : ""}`}>
                  {/* front */}
                  <div className="absolute inset-0 bg-white border border-black/[0.08] rounded-2xl p-4 flex flex-col justify-between [backface-visibility:hidden] group-hover:shadow-lg group-hover:shadow-black/5 transition-all">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-sm`}>
                        {s.icon}
                      </div>
                      <span className="text-[13px] font-semibold text-gray-800 font-display">{s.name}</span>
                    </div>
                    <div>
                      <div className="w-full h-2 bg-black/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.08 }}
                        />
                      </div>
                      <span className="text-[11px] text-gray-400 mt-1.5 block">Klikni za detalje</span>
                    </div>
                  </div>
                  {/* back */}
                  <div className={`absolute inset-0 rounded-2xl p-4 flex items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br ${s.color} shadow-lg`}>
                    <div>
                      <span className="text-3xl font-extrabold text-white block font-display">{s.pct}%</span>
                      <span className="text-white/80 text-xs font-display">{s.name}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process steps — light theme */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-sm text-gray-400 uppercase tracking-[3px] text-center mb-12 font-display">Proces rada</h3>
            <div className="space-y-0">
              {STEPS.map((step, i) => (
                <motion.div key={step.n} custom={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className={`w-11 h-11 rounded-full ${step.bg} border ${step.border} flex items-center justify-center text-xs ${step.color} font-bold font-display flex-shrink-0`}>
                      {step.n}
                    </div>
                    {i < STEPS.length - 1 && <div className="w-px h-full bg-gradient-to-b from-black/[0.1] to-transparent min-h-[40px]" />}
                  </div>
                  <div className="pb-10">
                    <h4 className={`text-[15px] font-bold ${step.color} mb-1 font-display`}>{step.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Usluge — white section with blue accents ── */}
      <section id="usluge" className="py-28 px-6 bg-white light-section relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
        <div className="max-w-6xl mx-auto relative">
          <SectionHeadLight
            label="Ponuda"
            title={<>Usluge i <span className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">cijene</span></>}
            sub="Transparentne cijene, bez skrivenih troškova."
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Standard */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-slate-soft border border-black/[0.06] rounded-2xl p-8 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
              <span className="text-[11px] text-blue-600 uppercase tracking-widest font-bold font-display">Standardni paket</span>
              <div className="mt-4 mb-6">
                <span className="text-5xl font-extrabold text-gray-900 font-display">1000€</span>
                <span className="text-gray-400 text-sm ml-1">/ godišnje</span>
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
                  <li key={item} className="flex items-center gap-2.5 text-gray-600 text-sm">
                    <Check className="size-4 text-blue-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#kontakt">
                <GradientButton className="w-full">
                  Zatražite ponudu <ArrowRight className="size-4 ml-1" />
                </GradientButton>
              </a>
            </motion.div>

            {/* Custom */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-gray-900 text-white rounded-2xl p-8 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500" />
              <div className="absolute top-4 right-4">
                <span className="text-[10px] text-amber-200 uppercase tracking-widest font-bold bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30 font-display">Premium</span>
              </div>
              <span className="text-[11px] text-amber-400 uppercase tracking-widest font-bold font-display">Po dogovoru</span>
              <div className="mt-4 mb-6">
                <span className="text-5xl font-extrabold bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent font-display">Custom</span>
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
                  <li key={item} className="flex items-center gap-2.5 text-white/60 text-sm">
                    <Check className="size-4 text-amber-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#kontakt">
                <GradientButton variant="variant" className="w-full">
                  Razgovarajmo <ArrowRight className="size-4 ml-1" />
                </GradientButton>
              </a>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
            {[
              { n: "50+", l: "Projekata", c: "text-blue-600", bg: "bg-blue-50" },
              { n: "100%", l: "Zadovoljstvo", c: "text-emerald-600", bg: "bg-emerald-50" },
              { n: "24/7", l: "Podrška", c: "text-amber-600", bg: "bg-amber-50" },
              { n: "30+", l: "Klijenata", c: "text-rose-600", bg: "bg-rose-50" },
            ].map((s, i) => (
              <motion.div key={s.l} custom={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className={`text-center py-6 ${s.bg} rounded-2xl border border-black/[0.04] hover:shadow-md transition-all`}
              >
                <span className={`text-3xl font-extrabold ${s.c} block font-display`}>{s.n}</span>
                <span className="text-gray-400 text-xs font-display">{s.l}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio — dark section ── */}
      <section id="portfolio" className="py-28 px-6 bg-dark-950">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            label="Radovi"
            title={<><span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 bg-clip-text text-transparent">Portfolio</span></>}
            sub="Pogledajte projekte koje smo ostvarili za naše klijente."
          />

          <div className="flex gap-2 mb-10 justify-center flex-wrap">
            {CATS.map((c) => (
              <button key={c} onClick={() => setActiveCat(c)}
                className={`px-4 py-2 rounded-full text-[13px] transition-all cursor-pointer font-display tracking-wide ${
                  activeCat === c
                    ? "bg-white text-black font-semibold"
                    : "text-white/30 hover:text-white/50 border border-white/[0.08]"
                }`}
              >
                {c === "sve" ? "Sve" : c === "web-shop" ? "Web Shop" : c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div key={p.title} layout custom={i} variants={fade} initial="hidden" animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group bg-dark-800 border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.15] transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-white/[0.02]"
                >
                  <div className={`h-48 bg-gradient-to-br ${p.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
                    <div className="absolute bottom-3 left-3 flex gap-1">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="w-2 h-2 rounded-full bg-white/25" />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-sm">
                      <span className="flex items-center gap-1.5 text-white text-sm font-semibold bg-white/15 px-5 py-2.5 rounded-full border border-white/25 font-display">
                        <ExternalLink className="size-3.5" /> Pogledaj
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-white/90 mb-3 font-display">{p.title}</h3>
                    <div className="flex gap-1.5 flex-wrap">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.06] text-white/40 border border-white/[0.08]">
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

      {/* ── Plaćanje — warm/yellow tinted section ── */}
      <section id="placanje" className="py-28 px-6 bg-warm light-section relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400" />
        <div className="max-w-6xl mx-auto relative">
          <SectionHeadLight
            label="Plaćanje"
            title={<>Načini <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">plaćanja</span></>}
            sub="Prihvaćamo više načina plaćanja za vašu udobnost."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
            {PAYMENTS.map((m, i) => (
              <motion.div key={m.title} custom={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="bg-white border border-black/[0.06] rounded-2xl p-5 text-center hover:shadow-lg hover:shadow-black/5 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-2xl ${m.color} flex items-center justify-center text-white mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  {m.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-0.5 font-display">{m.title}</h3>
                <p className="text-[11px] text-gray-400">{m.sub}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3"
          >
            <Lock className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 leading-relaxed">
                <strong className="text-amber-900 font-display">Napomena o sigurnosti:</strong> Plaćanje se ugovara nakon konzultacije.
                Nikada ne isporučujemo usluge bez potvrđene uplate na račun.
                Koristimo Stripe za sigurnu obradu kartica.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Kontakt — dark section ── */}
      <section id="kontakt" className="py-28 px-6 bg-dark-950">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            label="Kontakt"
            title={<>Započnite svoj <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">projekt</span></>}
            sub="Ispunite formu i javit ćemo vam se u roku 24h."
          />

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto bg-dark-800 border border-white/[0.08] rounded-2xl p-8 space-y-5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

            {/* Honeypot */}
            <input type="text" name="website" className="absolute -left-[9999px]" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/40 text-xs mb-1.5 font-display">Ime i prezime *</label>
                <input name="name" type="text" required minLength={2} maxLength={100} className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all" placeholder="Vaše ime" />
              </div>
              <div>
                <label className="block text-white/40 text-xs mb-1.5 font-display">Email *</label>
                <input name="email" type="email" required maxLength={254} className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all" placeholder="vas@email.com" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/40 text-xs mb-1.5 font-display">Telefon</label>
                <input name="phone" type="tel" className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all" placeholder="+385 ..." />
              </div>
              <div>
                <label className="block text-white/40 text-xs mb-1.5 font-display">Tip projekta</label>
                <select name="projectType" className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all appearance-none cursor-pointer">
                  <option value="" className="bg-dark-800">Odaberite...</option>
                  {PROJECT_TYPES.map((t) => (<option key={t} value={t} className="bg-dark-800">{t}</option>))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white/40 text-xs mb-1.5 font-display">Budžet</label>
              <select name="budget" className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all appearance-none cursor-pointer">
                <option value="" className="bg-dark-800">Odaberite raspon...</option>
                {BUDGETS.map((b) => (<option key={b} value={b} className="bg-dark-800">{b}</option>))}
              </select>
            </div>

            <div>
              <label className="block text-white/40 text-xs mb-1.5 font-display">Poruka *</label>
              <textarea name="message" required minLength={10} rows={4} className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all resize-none" placeholder="Opišite svoj projekt..." />
            </div>

            <GradientButton type="submit" disabled={formStatus === "sending"} className="w-full disabled:opacity-40" size="lg">
              {formStatus === "sending" ? (
                "Šalje se..."
              ) : formStatus === "sent" ? (
                <><Check className="size-4" /> Poslano!</>
              ) : (
                <><Send className="size-4" /> Pošaljite poruku</>
              )}
            </GradientButton>

            {formStatus === "error" && <p className="text-red-400 text-sm text-center">{errorMsg}</p>}
            {formStatus === "sent" && <p className="text-emerald-400 text-sm text-center">Hvala! Javit ćemo vam se u roku 24h.</p>}
          </motion.form>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] py-10 px-6 bg-dark-950">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo className="h-5 w-auto opacity-40" />
          <div className="flex gap-6">
            {NAV.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="text-white/20 hover:text-white/40 text-xs transition-colors font-display">
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-white/15 text-xs">&copy; {new Date().getFullYear()} weblirev.com</p>
        </div>
      </footer>
    </div>
  );
}

// ── Helpers ──

function SectionHead({ label, title, sub }: { label: string; title: React.ReactNode; sub: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
      <span className="text-[11px] text-white/25 uppercase tracking-[4px] block mb-3 font-display">{label}</span>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight font-display">{title}</h2>
      <p className="text-white/30 max-w-lg mx-auto text-[15px]">{sub}</p>
    </motion.div>
  );
}

function SectionHeadLight({ label, title, sub }: { label: string; title: React.ReactNode; sub: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
      <span className="text-[11px] text-gray-400 uppercase tracking-[4px] block mb-3 font-display">{label}</span>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight text-gray-900 font-display">{title}</h2>
      <p className="text-gray-500 max-w-lg mx-auto text-[15px]">{sub}</p>
    </motion.div>
  );
}
