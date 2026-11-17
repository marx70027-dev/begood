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
  Code2,
  Palette,
  Rocket,
  Globe,
  Shield,
  Smartphone,
  Lock,
  ArrowUpRight,
} from "lucide-react";
import { useState, useRef, useEffect, type FormEvent } from "react";
import dynamic from "next/dynamic";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { T, LANG_KEY, type Lang } from "@/lib/i18n";

const ScrollVideo = dynamic(() => import("@/components/ui/scroll-video"), { ssr: false });

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }),
};

// ── Data ──

const SKILLS = [
  { pct: 95, icon: <Code2 className="size-4" /> },
  { pct: 90, icon: <Palette className="size-4" /> },
  { pct: 92, icon: <Rocket className="size-4" /> },
  { pct: 88, icon: <Globe className="size-4" /> },
  { pct: 85, icon: <Shield className="size-4" /> },
  { pct: 95, icon: <Smartphone className="size-4" /> },
];

const STEP_NUMS = ["01", "02", "03", "04"];

const PORTFOLIO_URLS: (string | null)[] = [
  "https://begoodfasade.com",
  "https://stopandgocaffe.com",
  null,
  null,
  null,
  null,
];

const STAT_VALUES = ["50+", "100%", "24/7", "30+"];

const PROJECT_TYPES_EN = T.en.projectTypes;
const BUDGETS_EN = T.en.budgets;

// ── Component ──

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const t = T[lang];

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === "hr" || saved === "en") setLang(saved);
      else if (navigator.language?.toLowerCase().startsWith("hr")) setLang("hr");
    } catch {}
  }, []);

  function changeLang(l: Lang) {
    setLang(l);
    try { localStorage.setItem(LANG_KEY, l); } catch {}
    document.documentElement.lang = l;
  }

  const [mobileMenu, setMobileMenu] = useState(false);
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

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
        throw new Error(json.error || t.contact.failed);
      }
      setFormStatus("sent");
      formRef.current?.reset();
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (err) {
      setFormStatus("error");
      setErrorMsg(err instanceof Error ? err.message : t.contact.failed);
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  }

  const NAV = [
    { id: "about", label: t.nav.about },
    { id: "portfolio", label: t.nav.work },
    { id: "payment", label: t.nav.payment },
    { id: "contact", label: t.nav.contact },
  ];

  const inputCls =
    "w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all";

  return (
    <div className="bg-white">
      <CookieConsent lang={lang} />

      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <a href="#" className="flex items-center gap-2">
            <span className="text-[15px] font-bold tracking-[-0.03em] text-slate-900">
              weblirev<span className="text-indigo-500">.</span>
            </span>
          </a>
          <ul className="hidden md:flex gap-3">
            {NAV.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`}>
                  <button className="fancy-btn text-xs">{l.label}</button>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <div className="flex rounded-full border border-slate-200 p-0.5 text-[11px] font-semibold" role="group" aria-label="Language">
              {(["hr", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => changeLang(l)}
                  aria-pressed={lang === l}
                  className={`px-2.5 py-1 rounded-full uppercase transition-colors cursor-pointer ${
                    lang === l ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button
              className="md:hidden text-slate-500 hover:text-slate-900 p-1"
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
              className="md:hidden border-t border-slate-100 overflow-hidden bg-white/95 backdrop-blur-xl"
            >
              <div className="px-6 py-4 flex flex-col gap-2">
                {NAV.map((l) => (
                  <a key={l.id} href={`#${l.id}`} onClick={() => setMobileMenu(false)}>
                    <button className="fancy-btn w-full text-xs">{l.label}</button>
                  </a>
                ))}
                <a href="#contact" className="mt-1" onClick={() => setMobileMenu(false)}>
                  <button className="fancy-btn w-full text-xs">{t.nav.getInTouch}</button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen bg-black overflow-hidden flex items-center">
        <div className="hero-blob hero-blob-a" />
        <div className="hero-blob hero-blob-b" />
        <div className="hero-blob hero-blob-c" />
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-24 pb-24">
          <div className="max-w-3xl">
            <motion.h1 custom={0} variants={fade} initial="hidden" animate="visible"
              className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] mb-7 tracking-[-0.04em] text-white"
            >
              {t.hero.h1a}
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                {t.hero.h1b}
              </span>
            </motion.h1>

            <motion.p custom={1} variants={fade} initial="hidden" animate="visible"
              className="text-white/60 text-base sm:text-lg leading-relaxed mb-10 max-w-lg"
            >
              {t.hero.sub}
            </motion.p>

            <motion.div custom={2} variants={fade} initial="hidden" animate="visible" className="flex gap-4 flex-wrap">
              <a href="#contact">
                <button className="fancy-btn">
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    {t.hero.cta1} <ArrowRight className="size-4" />
                  </span>
                </button>
              </a>
              <a href="#portfolio">
                <button className="fancy-btn" style={{ "--bg": "transparent", "--color": "#ffffff" } as React.CSSProperties}>
                  {t.hero.cta2}
                </button>
              </a>
            </motion.div>
          </div>
        </div>

        <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          aria-label="Scroll"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors z-10"
        >
          <ChevronDown className="size-6 animate-bounce" />
        </motion.a>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHead
            label={t.about.label}
            title={t.about.title}
            sub={t.about.sub}
          />

          {/* Skill cards — glow style, click to flip */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-28 max-w-3xl mx-auto">
            {SKILLS.map((s, i) => (
              <motion.div
                key={t.skills[i]}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glow-card h-44"
                onClick={() => setFlipped((p) => ({ ...p, [i]: !p[i] }))}
              >
                <div className="glow-card-glow" />
                <div className="glow-card-inner">
                  <AnimatePresence mode="wait">
                    {!flipped[i] ? (
                      <motion.div
                        key="front"
                        initial={{ opacity: 0, rotateY: -90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: 90 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center justify-center gap-3 px-4 text-center"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-cyan-300">
                          {s.icon}
                        </div>
                        <span className="text-[13px] font-semibold text-white/90 tracking-[-0.01em]">{t.skills[i]}</span>
                        <span className="text-[10px] text-white/30 font-mono">{t.about.reveal}</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="back"
                        initial={{ opacity: 0, rotateY: -90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: 90 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center justify-center gap-2"
                      >
                        <span className="font-mono text-4xl font-bold text-cyan-300">{s.pct}%</span>
                        <span className="text-[12px] text-white/50">{t.skills[i]}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process */}
          <div className="max-w-2xl mx-auto">
            <h3 className="font-mono text-xs text-slate-400 uppercase tracking-[0.2em] text-center mb-14 font-medium">{t.about.howWeWork}</h3>
            <div className="space-y-0">
              {t.steps.map((step, i) => (
                <motion.div key={STEP_NUMS[i]} custom={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex gap-5 group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:border-indigo-300 group-hover:bg-indigo-50 transition-colors">
                      <span className="font-mono text-xs text-slate-500 font-semibold group-hover:text-indigo-600 transition-colors">{STEP_NUMS[i]}</span>
                    </div>
                    {i < t.steps.length - 1 && <div className="w-px h-full bg-slate-200 min-h-[40px]" />}
                  </div>
                  <div className="pb-10">
                    <h4 className="text-sm font-semibold text-slate-900 mb-1 tracking-[-0.01em]">{step.title}</h4>
                    <p className="text-[13px] text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200/60 rounded-2xl overflow-hidden mt-20 max-w-3xl mx-auto border border-slate-200/60">
            {t.stats.map((label, i) => (
              <motion.div key={STAT_VALUES[i]} custom={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="bg-white text-center py-8 px-4"
              >
                <span className="font-mono text-2xl font-bold text-slate-900 block tracking-[-0.02em]">{STAT_VALUES[i]}</span>
                <span className="text-slate-500 text-xs font-medium mt-1 block">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Showcase (scroll video) ── */}
      <section id="showcase" className="relative bg-black">
        <ScrollVideo />
        <div className="absolute inset-0 pointer-events-none">
          <div className="sticky top-0 h-screen flex items-end">
            <div className="max-w-6xl mx-auto px-6 w-full pb-24">
              <span className="font-mono text-[11px] text-cyan-300 uppercase tracking-[0.2em] block mb-3 font-medium">{t.showcase.label}</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-[-0.03em] mb-3 max-w-xl">{t.showcase.title}</h2>
              <p className="text-white/60 max-w-md text-[15px] leading-relaxed">{t.showcase.sub}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Portfolio ── */}
      <section id="portfolio" className="py-32 px-6 bg-slate-50/50">
        <div className="max-w-5xl mx-auto">
          <SectionHead
            label={t.portfolio.label}
            title={t.portfolio.title}
            sub={t.portfolio.sub}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.portfolio.items.map((p, i) => {
              const url = PORTFOLIO_URLS[i];
              const cls =
                "group border border-slate-200/60 rounded-xl overflow-hidden hover:border-slate-300 hover:shadow-lg transition-all duration-300 bg-white block";
              const inner = (
                <>
                  <div className="h-44 bg-slate-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,#f1f5f9_25%,#e2e8f0_50%,#f1f5f9_75%)]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-slate-400 text-sm font-semibold tracking-wide">
                        {url ? url.replace("https://", "") : p.title}
                      </span>
                    </div>
                    {url && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-900/60 backdrop-blur-sm">
                        <span className="flex items-center gap-1.5 text-white text-[12px] font-medium bg-white/15 px-4 py-2 rounded-full border border-white/20">
                          {t.portfolio.visit} <ArrowUpRight className="size-3" />
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-slate-800 mb-2.5 tracking-[-0.01em]">{p.title}</h3>
                    <div className="flex gap-1.5 flex-wrap">
                      {p.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              );
              return url ? (
                <motion.a key={i} href={url} target="_blank" rel="noopener noreferrer" custom={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className={cls}>
                  {inner}
                </motion.a>
              ) : (
                <motion.div key={i} custom={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className={cls}>
                  {inner}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Payment ── */}
      <section id="payment" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHead
            label={t.payment.label}
            title={t.payment.title}
            sub={t.payment.sub}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto bg-white border border-slate-200/60 rounded-xl p-6 text-center hover:border-slate-300 hover:shadow-sm transition-all duration-200 mb-8"
          >
            <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mx-auto mb-4">
              <CreditCard className="size-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-800 mb-1 tracking-[-0.01em]">{t.payment.cardTitle}</h3>
            <p className="text-[13px] text-slate-500 mb-4">{t.payment.cards}</p>
            <p className="text-[12px] text-slate-400">{t.payment.processed}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="max-w-md mx-auto bg-slate-50 border border-slate-200/60 rounded-xl p-4 flex items-start gap-3"
          >
            <Lock className="size-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <p className="text-[13px] text-slate-500 leading-relaxed">
              <span className="font-semibold text-slate-700">{t.payment.noticeLabel}</span> {t.payment.notice}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-32 px-6 bg-slate-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left — Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-6 shadow-sm">
                <Send className="size-6 text-indigo-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-[-0.03em] mb-4">{t.contact.title}</h2>
              <p className="text-slate-500 text-[15px] leading-relaxed mb-10 max-w-sm">
                {t.contact.desc}
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <svg className="size-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium mb-0.5">{t.contact.email}</p>
                    <a href="mailto:contact@weblirev.com" className="text-sm text-slate-700 font-medium hover:text-indigo-600 transition-colors">contact@weblirev.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <svg className="size-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium mb-0.5">{t.contact.phone}</p>
                    <a href="tel:+385997874239" className="text-sm text-slate-700 font-medium hover:text-indigo-600 transition-colors">+385 99 787 4239</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <svg className="size-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium mb-0.5">{t.contact.location}</p>
                    <p className="text-sm text-slate-700 font-medium">{t.contact.locationValue}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border border-slate-200/60 rounded-2xl p-7 space-y-4 shadow-sm"
            >
              <input type="text" name="website" className="absolute -left-[9999px]" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <div>
                <label className="block text-slate-700 text-xs font-medium mb-1.5">{t.contact.fullName}</label>
                <input name="name" type="text" required minLength={2} maxLength={100} className={inputCls} placeholder={t.contact.namePh} />
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-medium mb-1.5">{t.contact.emailLabel}</label>
                <input name="email" type="email" required maxLength={254} className={inputCls} placeholder="you@email.com" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 text-xs font-medium mb-1.5">{t.contact.phoneLabel}</label>
                  <input name="phone" type="tel" className={inputCls} placeholder="+385 ..." />
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-medium mb-1.5">{t.contact.projectType}</label>
                  <select name="projectType" className={`${inputCls} appearance-none cursor-pointer`}>
                    <option value="">{t.contact.select}</option>
                    {PROJECT_TYPES_EN.map((en, i) => (<option key={en} value={en}>{t.projectTypes[i]}</option>))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-medium mb-1.5">{t.contact.budget}</label>
                <select name="budget" className={`${inputCls} appearance-none cursor-pointer`}>
                  <option value="">{t.contact.selectRange}</option>
                  {BUDGETS_EN.map((en, i) => (<option key={en} value={en}>{t.budgets[i]}</option>))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-medium mb-1.5">{t.contact.message}</label>
                <textarea name="message" required minLength={10} rows={4} className={`${inputCls} resize-none`} placeholder={t.contact.messagePh} />
              </div>

              <button type="submit" disabled={formStatus === "sending"} className="fancy-btn w-full disabled:opacity-40">
                {formStatus === "sending" ? (
                  t.contact.sending
                ) : formStatus === "sent" ? (
                  <span className="flex items-center justify-center gap-2"><Check className="size-4" /> {t.contact.sent}</span>
                ) : (
                  <span className="flex items-center justify-center gap-2"><Send className="size-4" /> {t.contact.send}</span>
                )}
              </button>

              {formStatus === "error" && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
              {formStatus === "sent" && <p className="text-emerald-600 text-sm text-center">{t.contact.thanks}</p>}
            </motion.form>
          </div>

          {/* World Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative"
          >
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 md:p-10 shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 mb-6">
                <Globe className="size-4 text-indigo-500" />
                <span className="text-xs text-slate-400 font-medium uppercase tracking-[0.15em]">{t.contact.globally}</span>
              </div>
              <svg viewBox="0 0 1000 500" className="w-full h-auto opacity-[0.35]" fill="none">
                <g fill="#94a3b8">
                  {/* North America */}
                  <path d="M60 120 C70 80,120 50,160 45 C180 42,200 50,220 55 C240 58,250 65,260 60 C270 55,265 45,275 40 C285 38,290 45,300 50 C295 55,285 65,280 75 C275 85,270 95,265 105 C260 115,258 120,255 130 L250 140 C245 145,240 148,238 155 C235 165,232 170,228 178 L220 185 C215 180,210 175,205 178 C200 182,195 185,192 190 L185 195 C180 198,175 195,172 198 L165 195 C158 190,155 185,148 182 C140 180,135 178,128 175 C120 172,115 170,108 168 C100 165,95 160,90 158 C85 155,80 148,78 142 C75 135,72 130,68 125 Z" />
                  <path d="M155 195 L160 200 C165 210,168 218,170 225 C172 232,175 238,178 245 C180 252,178 258,175 265 C170 270,165 268,160 270 C155 272,150 275,145 272 C140 268,138 262,135 258 C130 252,125 248,122 242 C118 235,115 228,112 222 C110 218,108 212,108 208 C110 202,115 198,120 195 C128 192,138 192,148 194 Z" />
                  {/* South America */}
                  <path d="M220 310 C225 300,228 295,232 290 C235 285,238 280,240 275 C242 270,245 265,248 262 C252 258,258 255,262 260 C268 265,270 272,272 280 C275 290,278 298,280 308 C282 318,280 325,278 335 C275 345,272 352,268 360 C265 368,260 375,255 382 C250 390,245 395,240 400 C235 405,230 408,225 410 C220 408,218 402,215 395 C210 385,208 378,205 368 C202 358,200 348,200 338 C202 328,205 322,210 315 Z" />
                  {/* Europe */}
                  <path d="M440 75 C445 72,450 70,455 72 C460 75,462 80,465 85 C468 90,470 95,472 100 C475 108,478 112,480 118 C482 125,485 128,488 132 C490 138,488 142,485 148 C480 152,475 155,470 158 C465 160,460 162,455 160 C450 158,445 155,440 152 C435 148,432 142,430 138 C428 132,425 128,422 122 C420 115,422 108,425 102 C428 95,432 88,435 82 Z" />
                  <path d="M488 132 C492 130,498 128,502 132 C508 138,510 145,512 152 C515 158,518 162,520 168 C518 172,515 175,510 178 C505 180,500 178,495 175 C490 172,488 168,485 162 C482 155,480 148,482 142 C485 138,488 135,488 132Z" />
                  {/* Africa */}
                  <path d="M440 180 C448 175,455 172,462 175 C470 178,475 185,480 192 C485 200,488 208,490 218 C492 228,494 238,495 248 C496 258,498 268,498 278 C498 290,496 300,492 310 C488 320,484 328,478 335 C472 342,466 348,458 352 C450 355,442 356,435 352 C428 348,422 342,418 335 C415 328,412 318,410 308 C408 298,408 288,410 278 C412 268,415 258,418 248 C420 238,422 228,425 218 C428 208,432 198,435 190 Z" />
                  {/* Asia */}
                  <path d="M520 55 C530 48,545 42,558 45 C572 48,582 55,592 62 C602 70,610 78,618 85 C628 92,638 98,648 102 C660 108,672 112,682 118 C690 122,698 128,705 132 C712 138,718 142,722 148 C728 155,732 162,735 170 C738 178,740 185,738 192 C735 200,730 205,722 208 C715 210,708 208,700 205 C692 202,685 198,678 195 C668 190,658 188,648 185 C640 182,632 180,625 178 C618 175,610 172,602 170 C595 168,588 165,580 162 C572 158,565 155,558 152 C550 148,542 145,535 140 C528 135,522 128,518 120 C515 112,512 105,512 98 C514 88,518 78,520 68 Z" />
                  <path d="M648 185 C655 188,660 192,665 198 C670 205,672 212,675 220 C678 228,680 235,682 242 C684 250,685 258,684 265 C682 272,678 278,672 282 C665 285,658 285,650 282 C642 278,635 272,630 265 C625 258,622 250,620 242 C618 235,618 228,620 220 C622 212,628 205,635 198 C640 192,645 188,648 185Z" />
                  {/* Australia */}
                  <path d="M720 320 C730 312,742 308,755 310 C768 312,778 318,788 325 C798 332,805 340,810 350 C812 358,812 368,808 375 C802 382,795 388,785 390 C775 392,765 390,755 385 C745 380,738 372,732 362 C728 352,725 342,722 332 Z" />
                  {/* Greenland */}
                  <path d="M280 25 C290 20,302 18,312 22 C322 28,328 35,330 45 C330 52,328 58,322 62 C315 65,308 62,300 58 C292 54,285 48,282 40 C280 35,278 30,280 25Z" />
                </g>
                {/* Location pin for Croatia */}
                <g transform="translate(480,145)">
                  <circle cx="0" cy="0" r="6" fill="#6366f1" opacity="0.2">
                    <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="0" cy="0" r="4" fill="#6366f1" />
                </g>
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-100 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm font-bold tracking-[-0.03em] text-slate-400">
            weblirev<span className="text-indigo-400">.</span>
          </span>
          <div className="flex gap-6">
            {NAV.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="text-slate-400 hover:text-slate-600 text-xs transition-colors font-medium">
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-slate-300 text-xs">&copy; {new Date().getFullYear()} weblirev.com</p>
        </div>
      </footer>
    </div>
  );
}

// ── Helpers ──

function SectionHead({ label, title, sub }: { label: string; title: string; sub: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
      <span className="font-mono text-[11px] text-indigo-500 uppercase tracking-[0.2em] block mb-3 font-medium">{label}</span>
      <h2 className="text-2xl sm:text-3xl md:text-[2.25rem] font-bold mb-3 tracking-[-0.03em] text-slate-900">{title}</h2>
      <p className="text-slate-500 max-w-md mx-auto text-[14px] leading-relaxed">{sub}</p>
    </motion.div>
  );
}
