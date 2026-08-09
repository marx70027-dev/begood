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
  Zap,
  Clock,
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
  { name: "React / Next.js", pct: 95, icon: <Code2 className="size-5" />, color: "from-blue-500 to-cyan-400", bg: "bg-blue-50", text: "text-blue-600" },
  { name: "UI/UX Design", pct: 90, icon: <Palette className="size-5" />, color: "from-amber-500 to-yellow-400", bg: "bg-amber-50", text: "text-amber-600" },
  { name: "Performance", pct: 92, icon: <Rocket className="size-5" />, color: "from-rose-500 to-pink-400", bg: "bg-rose-50", text: "text-rose-600" },
  { name: "SEO", pct: 88, icon: <Globe className="size-5" />, color: "from-emerald-500 to-teal-400", bg: "bg-emerald-50", text: "text-emerald-600" },
  { name: "Security", pct: 85, icon: <Shield className="size-5" />, color: "from-indigo-500 to-blue-400", bg: "bg-indigo-50", text: "text-indigo-600" },
  { name: "Responsive", pct: 95, icon: <Smartphone className="size-5" />, color: "from-orange-500 to-amber-400", bg: "bg-orange-50", text: "text-orange-600" },
];

const STEPS = [
  { n: "01", title: "Consultation", desc: "We learn about your needs, goals, and project vision.", color: "text-blue-600", bg: "bg-blue-500", ring: "ring-blue-100" },
  { n: "02", title: "Design", desc: "Wireframes and visual design tailored to your brand.", color: "text-amber-600", bg: "bg-amber-500", ring: "ring-amber-100" },
  { n: "03", title: "Development", desc: "We code with cutting-edge tech — fast, secure, responsive.", color: "text-emerald-600", bg: "bg-emerald-500", ring: "ring-emerald-100" },
  { n: "04", title: "Launch", desc: "We set up hosting, configure the domain, and go live.", color: "text-rose-600", bg: "bg-rose-500", ring: "ring-rose-100" },
];

const PORTFOLIO = [
  { title: "E-commerce Platform", cat: "web-shop", gradient: "from-blue-600 via-indigo-500 to-violet-500", tags: ["Next.js", "Stripe", "Tailwind"] },
  { title: "Corporate Website", cat: "corporate", gradient: "from-amber-500 via-yellow-400 to-orange-400", tags: ["React", "CMS", "SEO"] },
  { title: "SaaS Dashboard", cat: "app", gradient: "from-emerald-500 via-teal-400 to-cyan-400", tags: ["TypeScript", "Charts", "API"] },
  { title: "Photographer Portfolio", cat: "portfolio", gradient: "from-pink-500 via-rose-400 to-red-400", tags: ["Gallery", "Animations", "Lightbox"] },
  { title: "Restaurant Website", cat: "hospitality", gradient: "from-orange-500 via-amber-400 to-yellow-400", tags: ["Reservations", "Menu", "Map"] },
  { title: "Fitness App", cat: "app", gradient: "from-cyan-500 via-blue-400 to-indigo-500", tags: ["PWA", "Dashboard", "Tracking"] },
];

const CATS = ["all", "web-shop", "corporate", "app", "portfolio", "hospitality"];

const PAYMENTS = [
  { icon: <Building2 className="size-6" />, title: "Bank Transfer", sub: "IBAN / Wire transfer", bg: "bg-blue-500" },
  { icon: <CreditCard className="size-6" />, title: "Cards", sub: "Stripe / Revolut Business", bg: "bg-indigo-500" },
  { icon: <Bitcoin className="size-6" />, title: "Crypto", sub: "By arrangement", bg: "bg-amber-500" },
  { icon: <Receipt className="size-6" />, title: "Cash / Invoice", sub: "By quote", bg: "bg-emerald-500" },
];

const PROJECT_TYPES = [
  "Landing page", "Corporate website", "Web shop", "Web application",
  "Portfolio", "Blog / CMS", "Redesign", "Other",
];

const BUDGETS = ["Under 500€", "500€ – 1000€", "1000€ – 2000€", "2000€+", "Flexible"];

// ── Component ──

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCat, setActiveCat] = useState("all");
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const filtered = activeCat === "all" ? PORTFOLIO : PORTFOLIO.filter((p) => p.cat === activeCat);

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
        throw new Error(json.error || "Failed to send.");
      }
      setFormStatus("sent");
      formRef.current?.reset();
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (err) {
      setFormStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send.");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  }

  const NAV = [
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "payment", label: "Payment" },
    { id: "contact", label: "Contact" },
  ];

  const inputCls =
    "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all";

  return (
    <div className="bg-white">
      <CookieConsent />

      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <LogoDark className="h-6 w-auto" />
          </a>
          <ul className="hidden md:flex gap-8">
            {NAV.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors font-medium">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden md:block">
              <GradientButton size="sm">Start a project</GradientButton>
            </a>
            <button
              className="md:hidden text-gray-500 hover:text-gray-900 p-1"
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
              className="md:hidden border-t border-gray-100 overflow-hidden bg-white/95 backdrop-blur-xl"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {NAV.map((l) => (
                  <a key={l.id} href={`#${l.id}`} className="text-gray-600 hover:text-gray-900 py-2.5 text-sm font-medium" onClick={() => setMobileMenu(false)}>
                    {l.label}
                  </a>
                ))}
                <a href="#contact" className="mt-2" onClick={() => setMobileMenu(false)}>
                  <GradientButton size="sm" className="w-full">Start a project</GradientButton>
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
              <motion.div custom={0} variants={fade} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold tracking-widest uppercase mb-6">
                <Zap className="size-3" />
                Web Development Studio
              </motion.div>

              <motion.h1 custom={1} variants={fade} initial="hidden" animate="visible" className="text-4xl sm:text-5xl md:text-[3.8rem] font-extrabold leading-[1.1] mb-6 tracking-tight font-display text-white">
                Your digital success
                <br />
                <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent">
                  starts here.
                </span>
              </motion.h1>

              <motion.p custom={2} variants={fade} initial="hidden" animate="visible" className="text-white/70 text-lg leading-relaxed mb-10 max-w-lg">
                We design and build modern websites that attract clients
                and grow with your business.
              </motion.p>

              <motion.div custom={3} variants={fade} initial="hidden" animate="visible" className="flex gap-3 flex-wrap">
                <a href="#contact">
                  <GradientButton size="lg">
                    Start a project <ArrowRight className="size-4 ml-1" />
                  </GradientButton>
                </a>
                <a href="#portfolio">
                  <GradientButton variant="outline" size="lg">View our work</GradientButton>
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-[calc(200vh+40px)] left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors z-10"
        >
          <ChevronDown className="size-5" />
        </motion.a>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            label="About us"
            title={<>We build <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">digital experiences</span></>}
            sub="We combine top-tier design and the latest technologies for results that speak for themselves."
          />

          {/* Skill cards */}
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
                <div className={`relative w-full h-40 transition-transform duration-500 [transform-style:preserve-3d] ${flipped[i] ? "[transform:rotateY(180deg)]" : ""}`}>
                  {/* front */}
                  <div className="absolute inset-0 bg-white border border-gray-100 rounded-2xl p-5 flex flex-col justify-between [backface-visibility:hidden] group-hover:shadow-lg group-hover:shadow-gray-200/50 group-hover:border-gray-200 transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center ${s.text}`}>
                        {s.icon}
                      </div>
                      <span className="text-[14px] font-bold text-gray-800 font-display">{s.name}</span>
                    </div>
                    <div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.08 }}
                        />
                      </div>
                      <span className="text-[11px] text-gray-400 mt-2 block">Click for details</span>
                    </div>
                  </div>
                  {/* back */}
                  <div className={`absolute inset-0 rounded-2xl p-5 flex items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br ${s.color} shadow-lg`}>
                    <div>
                      <span className="text-4xl font-extrabold text-white block font-display">{s.pct}%</span>
                      <span className="text-white/80 text-sm font-display">{s.name}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process steps */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-sm text-gray-400 uppercase tracking-[4px] text-center mb-12 font-display font-semibold">Our process</h3>
            <div className="space-y-0">
              {STEPS.map((step, i) => (
                <motion.div key={step.n} custom={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className={`w-11 h-11 rounded-full ${step.bg} ring-4 ${step.ring} flex items-center justify-center text-xs text-white font-bold font-display flex-shrink-0`}>
                      {step.n}
                    </div>
                    {i < STEPS.length - 1 && <div className="w-px h-full bg-gradient-to-b from-gray-200 to-transparent min-h-[40px]" />}
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

      {/* ── Services ── */}
      <section id="services" className="py-28 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            label="Services"
            title={<>Services & <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Pricing</span></>}
            sub="Transparent pricing, no hidden costs."
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Standard */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-t-3xl" />
              <span className="text-[11px] text-blue-600 uppercase tracking-widest font-bold font-display">Standard</span>
              <div className="mt-4 mb-6">
                <span className="text-5xl font-extrabold text-gray-900 font-display">1000€</span>
                <span className="text-gray-400 text-sm ml-1">/ year</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Modern, responsive design",
                  "Up to 5 pages",
                  "SEO optimization",
                  "SSL certificate",
                  "Hosting included",
                  "Contact form",
                  "Google Analytics",
                  "Support & maintenance",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-gray-600 text-sm">
                    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Check className="size-3 text-blue-500" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact">
                <GradientButton className="w-full">
                  Get a quote <ArrowRight className="size-4 ml-1" />
                </GradientButton>
              </a>
            </motion.div>

            {/* Custom */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:shadow-amber-100/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-t-3xl" />
              <div className="absolute top-4 right-4">
                <span className="text-[10px] text-amber-700 uppercase tracking-widest font-bold bg-amber-100 px-3 py-1 rounded-full font-display">Premium</span>
              </div>
              <span className="text-[11px] text-amber-600 uppercase tracking-widest font-bold font-display">Custom pricing</span>
              <div className="mt-4 mb-6">
                <span className="text-5xl font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent font-display">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Standard",
                  "Unlimited pages",
                  "E-commerce / Web shop",
                  "Custom functionality",
                  "CMS integration",
                  "API integrations",
                  "Advanced analytics",
                  "Priority support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-gray-600 text-sm">
                    <div className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <Check className="size-3 text-amber-500" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact">
                <GradientButton className="w-full">
                  Let&apos;s talk <ArrowRight className="size-4 ml-1" />
                </GradientButton>
              </a>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
            {[
              { n: "50+", l: "Projects", c: "text-blue-600", bg: "bg-blue-50" },
              { n: "100%", l: "Satisfaction", c: "text-emerald-600", bg: "bg-emerald-50" },
              { n: "24/7", l: "Support", c: "text-amber-600", bg: "bg-amber-50" },
              { n: "30+", l: "Clients", c: "text-rose-600", bg: "bg-rose-50" },
            ].map((s, i) => (
              <motion.div key={s.l} custom={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className={`text-center py-6 ${s.bg} rounded-2xl hover:shadow-md transition-all`}
              >
                <span className={`text-3xl font-extrabold ${s.c} block font-display`}>{s.n}</span>
                <span className="text-gray-500 text-xs font-medium">{s.l}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio ── */}
      <section id="portfolio" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            label="Work"
            title={<>Our <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">Portfolio</span></>}
            sub="Take a look at some of the projects we've built for our clients."
          />

          <div className="flex gap-2 mb-10 justify-center flex-wrap">
            {CATS.map((c) => (
              <button key={c} onClick={() => setActiveCat(c)}
                className={`px-4 py-2 rounded-full text-[13px] transition-all cursor-pointer font-medium ${
                  activeCat === c
                    ? "bg-gray-900 text-white shadow-md"
                    : "text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {c === "all" ? "All" : c === "web-shop" ? "Web Shop" : c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div key={p.title} layout custom={i} variants={fade} initial="hidden" animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 cursor-pointer"
                >
                  <div className={`h-48 bg-gradient-to-br ${p.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_60%)]" />
                    <div className="absolute bottom-3 left-3 flex gap-1">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="w-2 h-2 rounded-full bg-white/30" />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm">
                      <span className="flex items-center gap-1.5 text-white text-sm font-semibold bg-white/20 px-5 py-2.5 rounded-full border border-white/30">
                        <ExternalLink className="size-3.5" /> View
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-gray-800 mb-3 font-display">{p.title}</h3>
                    <div className="flex gap-1.5 flex-wrap">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 font-medium">
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

      {/* ── Payment ── */}
      <section id="payment" className="py-28 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            label="Payment"
            title={<>Payment <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Methods</span></>}
            sub="We accept multiple payment methods for your convenience."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
            {PAYMENTS.map((m, i) => (
              <motion.div key={m.title} custom={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="bg-white border border-gray-100 rounded-2xl p-5 text-center hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-2xl ${m.bg} flex items-center justify-center text-white mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
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
                <strong className="text-amber-900 font-display">Security notice:</strong> Payment is arranged after consultation.
                We never deliver services without a confirmed payment.
                We use Stripe for secure card processing.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            label="Contact"
            title={<>Start your <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">project</span></>}
            sub="Fill out the form and we'll get back to you within 24 hours."
          />

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto bg-white border border-gray-100 rounded-3xl p-8 space-y-5 shadow-xl shadow-gray-100/50"
          >
            {/* Honeypot */}
            <input type="text" name="website" className="absolute -left-[9999px]" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-xs font-medium mb-1.5">Full name *</label>
                <input name="name" type="text" required minLength={2} maxLength={100} className={inputCls} placeholder="Your name" />
              </div>
              <div>
                <label className="block text-gray-600 text-xs font-medium mb-1.5">Email *</label>
                <input name="email" type="email" required maxLength={254} className={inputCls} placeholder="you@email.com" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-xs font-medium mb-1.5">Phone</label>
                <input name="phone" type="tel" className={inputCls} placeholder="+1 ..." />
              </div>
              <div>
                <label className="block text-gray-600 text-xs font-medium mb-1.5">Project type</label>
                <select name="projectType" className={`${inputCls} appearance-none cursor-pointer`}>
                  <option value="">Select...</option>
                  {PROJECT_TYPES.map((t) => (<option key={t} value={t}>{t}</option>))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-600 text-xs font-medium mb-1.5">Budget</label>
              <select name="budget" className={`${inputCls} appearance-none cursor-pointer`}>
                <option value="">Select range...</option>
                {BUDGETS.map((b) => (<option key={b} value={b}>{b}</option>))}
              </select>
            </div>

            <div>
              <label className="block text-gray-600 text-xs font-medium mb-1.5">Message *</label>
              <textarea name="message" required minLength={10} rows={4} className={`${inputCls} resize-none`} placeholder="Tell us about your project..." />
            </div>

            <GradientButton type="submit" disabled={formStatus === "sending"} className="w-full disabled:opacity-40" size="lg">
              {formStatus === "sending" ? (
                "Sending..."
              ) : formStatus === "sent" ? (
                <><Check className="size-4" /> Sent!</>
              ) : (
                <><Send className="size-4" /> Send message</>
              )}
            </GradientButton>

            {formStatus === "error" && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
            {formStatus === "sent" && <p className="text-emerald-500 text-sm text-center">Thank you! We&apos;ll get back to you within 24 hours.</p>}
          </motion.form>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <LogoDark className="h-5 w-auto opacity-50" />
          <div className="flex gap-6">
            {NAV.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="text-gray-400 hover:text-gray-600 text-xs transition-colors font-medium">
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-gray-300 text-xs">&copy; {new Date().getFullYear()} weblirev.com</p>
        </div>
      </footer>
    </div>
  );
}

// ── Helpers ──

function SectionHead({ label, title, sub }: { label: string; title: React.ReactNode; sub: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
      <span className="text-[11px] text-gray-400 uppercase tracking-[4px] block mb-3 font-display font-semibold">{label}</span>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight font-display text-gray-900">{title}</h2>
      <p className="text-gray-500 max-w-lg mx-auto text-[15px]">{sub}</p>
    </motion.div>
  );
}

function LogoDark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="weblirev logo"
    >
      <rect x="2" y="6" width="3" height="20" rx="1.5" fill="#111" transform="rotate(-12 2 6)" />
      <rect x="12" y="4" width="3" height="24" rx="1.5" fill="#111" />
      <rect x="22" y="6" width="3" height="20" rx="1.5" fill="#111" transform="rotate(12 22 6)" />
      <text x="38" y="22" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="700" letterSpacing="-0.5" fill="#111">weblirev</text>
      <circle cx="133" cy="22" r="2.5" fill="#3b82f6" />
    </svg>
  );
}
