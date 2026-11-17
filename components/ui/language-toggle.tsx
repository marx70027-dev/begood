"use client";

import { useLanguage } from "@/lib/i18n";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => setLang(lang === "hr" ? "en" : "hr")}
      className="flex items-center gap-1 text-xs font-bold tracking-widest text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-full px-3 py-1.5 transition-colors"
      aria-label="Switch language"
    >
      <span className={lang === "hr" ? "text-white" : "text-white/40"}>HR</span>
      <span className="text-white/30">/</span>
      <span className={lang === "en" ? "text-white" : "text-white/40"}>EN</span>
    </button>
  );
}
