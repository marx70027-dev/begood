"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Palette,
  Rocket,
  Globe,
  Shield,
  Smartphone,
  ArrowRight,
  Check,
  Star,
  Send,
  Menu,
  X,
  ChevronDown,
  CreditCard,
  Building2,
  Bitcoin,
  Receipt,
  Sparkles,
  Zap,
  Clock,
  Users,
  ExternalLink,
  MousePointer,
} from "lucide-react";
import { useState, useRef, type FormEvent } from "react";
import HeroAnimation from "@/components/ui/hero-animation";
import { Button } from "@/components/ui/neon-button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── DATA ──────────────────────────────────────────────────────

const SKILLS = [
  { name: "React / Next.js", level: 95, icon: <Code2 className="size-4" /> },
  { name: "UI/UX Dizajn", level: 90, icon: <Palette className="size-4" /> },
  { name: "Performance", level: 92, icon: <Rocket className="size-4" /> },
  { name: "SEO", level: 88, icon: <Globe className="size-4" /> },
  { name: "Sigurnost", level: 85, icon: <Shield className="size-4" /> },
  {
    name: "Responzivnost",
    level: 95,
    icon: <Smartphone className="size-4" />,
  },
];

const TIMELINE = [
  {
    year: "Korak 1",
    title: "Konzultacija",
    desc: "Besplatni poziv ili meeting — upoznajemo vaše potrebe, ciljeve i viziju.",
  },
  {
    year: "Korak 2",
    title: "Dizajn i prototip",
    desc: "Kreiramo wireframe i vizualni dizajn prilagođen vašem brendu.",
  },
  {
    year: "Korak 3",
    title: "Razvoj",
    desc: "Kodiramo stranicu s najnovijim tehnologijama — brzo, sigurno, responzivno.",
  },
  {
    year: "Korak 4",
    title: "Lansiranje",
    desc: "Postavljamo sve na server, konfiguriramo domenu i idemo live!",
  },
];

const PORTFOLIO = [
  {
    title: "E-commerce platforma",
    category: "web-shop",
    image:
      "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)",
    tags: ["Next.js", "Stripe", "Tailwind"],
  },
  {
    title: "Korporativna stranica",
    category: "korporativno",
    image:
      "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)",
    tags: ["React", "CMS", "SEO"],
  },
  {
    title: "SaaS dashboard",
    category: "aplikacija",
    image:
      "linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)",
    tags: ["TypeScript", "Charts", "API"],
  },
  {
    title: "Portfolio fotografa",
    category: "portfolio",
    image:
      "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f43f5e 100%)",
    tags: ["Galerija", "Animacije", "Lightbox"],
  },
  {
    title: "Restaurant web",
    category: "ugostiteljstvo",
    image:
      "linear-gradient(135deg, #f97316 0%, #eab308 50%, #84cc16 100%)",
    tags: ["Rezervacije", "Meni", "Mapa"],
  },
  {
    title: "Fitness aplikacija",
    category: "aplikacija",
    image:
      "linear-gradient(135deg, #06b6d4 0%, #10b981 50%, #34d399 100%)",
    tags: ["PWA", "Dashboard", "Tracking"],
  },
];

const CATEGORIES = [
  "sve",
  "web-shop",
  "korporativno",
  "aplikacija",
  "portfolio",
  "ugostiteljstvo",
];

const PAYMENT_METHODS = [
  {
    icon: <Building2 className="size-8" />,
    title: "Bankovna transakcija",
    desc: "IBAN / Transakcijski račun",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <CreditCard className="size-8" />,
    title: "Kartice",
    desc: "Stripe / Revolut Business",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    icon: <Bitcoin className="size-8" />,
    title: "Kriptovalute",
    desc: "Po dogovoru",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: <Receipt className="size-8" />,
    title: "Gotovina / Račun",
    desc: "Po ponudi",
    color: "from-emerald-500 to-green-500",
  },
];

const PROJECT_TYPES = [
  "Landing page",
  "Korporativna stranica",
  "Web shop",
  "Web aplikacija",
  "Portfolio",
  "Blog / CMS",
  "Redizajn postojeće",
  "Drugo",
];

const BUDGETS = [
  "Do 500€",
  "500€ – 1000€",
  "1000€ – 2000€",
  "2000€+",
  "Po dogovoru",
];

// ─── COMPONENT ─────────────────────────────────────────────────

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState("sve");
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const filteredPortfolio =
    activeCategory === "sve"
      ? PORTFOLIO
      : PORTFOLIO.filter((p) => p.category === activeCategory);

  function toggleFlip(i: number) {
    setFlippedCards((prev) => ({ ...prev, [i]: !prev[i] }));
  }

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
      setErrorMsg(
        err instanceof Error ? err.message : "Greška pri slanju."
      );
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  }

  const NAV_LINKS = [
    { id: "o-nama", label: "O nama" },
    { id: "usluge", label: "Usluge" },
    { id: "portfolio", label: "Portfolio" },
    { id: "placanje", label: "Plaćanje" },
    { id: "kontakt", label: "Kontakt" },
  ];

  return (
    <div className="bg-navy-950 overflow-x-hidden">
      {/* ─── NAVBAR ─────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#" className="text-xl font-bold tracking-tight">
            <span className="text-gradient">webli</span>
            <span className="text-white">rev</span>
          </a>

          <ul className="hidden md:flex gap-8 list-none">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-white/60 hover:text-cyan-400 text-sm font-medium transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href="#kontakt" className="hidden md:block">
              <Button size="sm">Započnite projekt</Button>
            </a>
            <button
              className="md:hidden text-white/70 hover:text-white p-2"
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
              className="md:hidden glass border-t border-white/5 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className="text-white/70 hover:text-cyan-400 py-2 text-sm font-medium"
                    onClick={() => setMobileMenu(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a href="#kontakt" onClick={() => setMobileMenu(false)}>
                  <Button className="w-full mt-2" size="sm">
                    Započnite projekt
                  </Button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ─── HERO ───────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden">
        <HeroAnimation />

        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/50 via-navy-950/80 to-navy-950" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
          <div className="max-w-3xl">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-6">
                <Sparkles className="size-3" />
                Profesionalna izrada web stranica
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
            >
              Vaš digitalni uspjeh
              <br />
              <span className="text-gradient">počinje ovdje.</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-white/50 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            >
              Dizajniramo i razvijamo moderne web stranice koje privlače
              klijente, grade povjerenje i rastu s vašim poslom.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex gap-4 flex-wrap"
            >
              <a href="#kontakt">
                <Button size="lg">
                  Započnite projekt
                  <ArrowRight className="inline size-4 ml-2" />
                </Button>
              </a>
              <a href="#portfolio">
                <Button variant="ghost" size="lg">
                  Pogledajte radove
                </Button>
              </a>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex gap-8 mt-14 flex-wrap"
            >
              {[
                { icon: <Zap className="size-4" />, text: "Brza izrada" },
                { icon: <Shield className="size-4" />, text: "100% sigurno" },
                { icon: <Smartphone className="size-4" />, text: "Responzivno" },
                { icon: <Clock className="size-4" />, text: "24/7 podrška" },
              ].map((item) => (
                <span
                  key={item.text}
                  className="flex items-center gap-2 text-white/40 text-sm"
                >
                  <span className="text-cyan-400">{item.icon}</span>
                  {item.text}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <a
            href="#o-nama"
            className="flex flex-col items-center text-white/30 hover:text-cyan-400 transition-colors"
          >
            <span className="text-xs mb-2">Saznajte više</span>
            <ChevronDown className="size-5 animate-bounce" />
          </a>
        </motion.div>
      </section>

      {/* ─── O NAMA (INTERACTIVE) ───────────────────── */}
      <section id="o-nama" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-400 text-xs font-semibold tracking-[3px] uppercase block mb-3">
              Tko smo mi
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Gradimo <span className="text-gradient">digitalna iskustva</span>
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto text-lg">
              Kombiniramo vrhunski dizajn i najnovije tehnologije kako bismo
              vašem brendu donijeli rezultate na webu.
            </p>
          </motion.div>

          {/* Skill Flip Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20 max-w-4xl mx-auto">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="perspective-[800px] cursor-pointer"
                onClick={() => toggleFlip(i)}
              >
                <div
                  className={`relative w-full h-36 transition-transform duration-500 [transform-style:preserve-3d] ${
                    flippedCards[i] ? "[transform:rotateY(180deg)]" : ""
                  }`}
                >
                  {/* Front */}
                  <div className="absolute inset-0 glass-card rounded-2xl p-5 flex flex-col justify-between [backface-visibility:hidden]">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400">{skill.icon}</span>
                      <span className="text-sm font-semibold text-white/90">
                        {skill.name}
                      </span>
                    </div>
                    <div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        />
                      </div>
                      <span className="text-xs text-white/30 mt-1 block">
                        {skill.level}% — klik za detalje
                      </span>
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 glass-card rounded-2xl p-5 flex items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
                    <div>
                      <span className="text-cyan-400 font-bold text-2xl block mb-1">
                        {skill.level}%
                      </span>
                      <span className="text-white/60 text-sm">
                        {skill.name}
                      </span>
                      <p className="text-white/30 text-xs mt-2">
                        Klik za povratak
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Timeline */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-center mb-10 text-white/80">
              Kako radimo?
            </h3>
            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/50 to-transparent" />
              {TIMELINE.map((step, i) => (
                <motion.div
                  key={step.year}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`relative flex items-start gap-6 mb-12 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 border-4 border-navy-950 z-10 mt-2" />
                  <div
                    className={`ml-14 md:ml-0 md:w-1/2 glass-card rounded-2xl p-6 hover:border-cyan-500/30 transition-colors ${
                      i % 2 === 0 ? "md:pr-10" : "md:pl-10"
                    }`}
                  >
                    <span className="text-cyan-400 text-xs font-semibold tracking-wider uppercase">
                      {step.year}
                    </span>
                    <h4 className="text-lg font-semibold text-white mt-1 mb-2">
                      {step.title}
                    </h4>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── USLUGE I CIJENE ─────────────────────────── */}
      <section id="usluge" className="py-24 px-6 bg-navy-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-400 text-xs font-semibold tracking-[3px] uppercase block mb-3">
              Naša ponuda
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Usluge i <span className="text-gradient">cijene</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto text-lg">
              Transparentne cijene, bez skrivenih troškova.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Standard Plan */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl" />
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-6">
                <Star className="size-3" />
                Najpopularniji
              </span>
              <h3 className="text-2xl font-bold mb-2">Standardna web stranica</h3>
              <p className="text-white/40 text-sm mb-6">
                Sve što trebate za profesionalnu online prisutnost.
              </p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-bold text-gradient">1000€</span>
                <span className="text-white/30 text-sm">/ godišnje</span>
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
                  <li
                    key={item}
                    className="flex items-center gap-3 text-white/60 text-sm"
                  >
                    <Check className="size-4 text-cyan-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#kontakt">
                <Button className="w-full">
                  Zatražite ponudu
                  <ArrowRight className="inline size-4 ml-2" />
                </Button>
              </a>
            </motion.div>

            {/* Custom Plan */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 relative overflow-hidden group hover:border-violet-500/30 transition-all duration-300 border-violet-500/10"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl" />
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-semibold mb-6">
                <Sparkles className="size-3" />
                Premium
              </span>
              <h3 className="text-2xl font-bold mb-2">Izrada po dogovoru</h3>
              <p className="text-white/40 text-sm mb-6">
                Za projekte koji zahtijevaju posebne funkcionalnosti.
              </p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  Custom
                </span>
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
                  <li
                    key={item}
                    className="flex items-center gap-3 text-white/60 text-sm"
                  >
                    <Check className="size-4 text-violet-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#kontakt">
                <Button variant="outline" className="w-full border-violet-500/50 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400">
                  Razgovarajmo
                  <ArrowRight className="inline size-4 ml-2" />
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Why us */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            {[
              { num: "50+", label: "Projekata", icon: <Globe className="size-5" /> },
              { num: "100%", label: "Zadovoljstvo", icon: <Star className="size-5" /> },
              { num: "24/7", label: "Podrška", icon: <Clock className="size-5" /> },
              { num: "30+", label: "Klijenata", icon: <Users className="size-5" /> },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 text-center hover:border-cyan-500/20 transition-colors"
              >
                <span className="text-cyan-400 flex justify-center mb-3">
                  {stat.icon}
                </span>
                <span className="text-2xl md:text-3xl font-bold text-white block">
                  {stat.num}
                </span>
                <span className="text-white/30 text-sm">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ──────────────────────────────── */}
      <section id="portfolio" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-cyan-400 text-xs font-semibold tracking-[3px] uppercase block mb-3">
              Naši radovi
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Portfolio</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto text-lg">
              Pogledajte projekte koje smo ostvarili za naše klijente.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-10 justify-center flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-white/40 hover:text-white/60 border border-transparent hover:border-white/10"
                }`}
              >
                {cat === "sve"
                  ? "Sve"
                  : cat === "web-shop"
                    ? "Web Shop"
                    : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredPortfolio.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group glass-card rounded-2xl overflow-hidden hover:border-cyan-500/20 transition-all duration-300 cursor-pointer"
                >
                  <div
                    className="h-48 relative overflow-hidden"
                    style={{ background: project.image }}
                  >
                    <div className="absolute inset-0 bg-navy-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="flex items-center gap-2 text-white font-semibold text-sm bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                        <ExternalLink className="size-4" />
                        Pogledaj projekt
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MousePointer className="size-5 text-white/80" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-white mb-3">
                      {project.title}
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-white/40 border border-white/5"
                        >
                          {tag}
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

      {/* ─── PLAĆANJE ───────────────────────────────── */}
      <section id="placanje" className="py-24 px-6 bg-navy-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-cyan-400 text-xs font-semibold tracking-[3px] uppercase block mb-3">
              Fleksibilno plaćanje
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Načini <span className="text-gradient">plaćanja</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto text-lg">
              Prihvaćamo više načina plaćanja za vašu udobnost.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {PAYMENT_METHODS.map((method, i) => (
              <motion.div
                key={method.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 text-center hover:border-cyan-500/20 transition-all duration-300 group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {method.icon}
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">
                  {method.title}
                </h3>
                <p className="text-white/30 text-xs">{method.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── KONTAKT ────────────────────────────────── */}
      <section id="kontakt" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-400 text-xs font-semibold tracking-[3px] uppercase block mb-3">
              Javite nam se
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Započnite svoj <span className="text-gradient">projekt</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto text-lg">
              Ispunite formu i javit ćemo vam se u roku 24h.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-card rounded-3xl p-8 md:p-10 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/50 text-sm font-medium mb-2">
                    Ime i prezime *
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-colors"
                    placeholder="Vaše ime"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-sm font-medium mb-2">
                    Email adresa *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-colors"
                    placeholder="vas@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/50 text-sm font-medium mb-2">
                    Broj telefona
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-colors"
                    placeholder="+385 ..."
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-sm font-medium mb-2">
                    Tip projekta
                  </label>
                  <select
                    name="projectType"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-navy-900">
                      Odaberite...
                    </option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-navy-900">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/50 text-sm font-medium mb-2">
                  Budžet
                </label>
                <select
                  name="budget"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-navy-900">
                    Odaberite raspon...
                  </option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b} className="bg-navy-900">
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/50 text-sm font-medium mb-2">
                  Poruka *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-colors resize-none"
                  placeholder="Opišite svoj projekt ili ideju..."
                />
              </div>

              <Button
                type="submit"
                disabled={formStatus === "sending"}
                className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {formStatus === "sending" ? (
                  "Šalje se..."
                ) : formStatus === "sent" ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check className="size-4" />
                    Poruka poslana!
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="size-4" />
                    Pošaljite poruku
                  </span>
                )}
              </Button>

              {formStatus === "error" && (
                <p className="text-red-400 text-sm text-center">{errorMsg}</p>
              )}
              {formStatus === "sent" && (
                <p className="text-emerald-400 text-sm text-center">
                  Hvala! Javit ćemo vam se u roku 24h.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────── */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <a href="#" className="text-xl font-bold tracking-tight">
              <span className="text-gradient">webli</span>
              <span className="text-white">rev</span>
            </a>
            <p className="text-white/20 text-sm mt-1">
              Profesionalna izrada web stranica
            </p>
          </div>
          <div className="flex gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-white/30 hover:text-cyan-400 text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-white/15 text-xs">
            &copy; {new Date().getFullYear()} weblirev.com
          </p>
        </div>
      </footer>
    </div>
  );
}
