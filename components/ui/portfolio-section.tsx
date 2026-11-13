"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

const headingFont = "'Bodoni MT Black', 'Bodoni MT', 'Didot', 'Georgia', serif";

interface WorkItem {
  label: string;
  tagline: { hr: string; en: string };
  gradient: string;
  emoji: string;
}

const WORK_ITEMS: WorkItem[] = [
  {
    label: "Café Abrt Stop & Go",
    tagline: { hr: "KAFIĆ", en: "COFFEE SHOP" },
    gradient: "linear-gradient(135deg, #241a12 0%, #4e3524 50%, #8a6a45 100%)",
    emoji: "☕",
  },
  {
    label: "BeGood Fasade",
    tagline: { hr: "FASADE & GRADNJA", en: "FACADES & CONSTRUCTION" },
    gradient: "linear-gradient(135deg, #1a1a1a 0%, #2e2e2e 50%, #555 100%)",
    emoji: "🏗️",
  },
  {
    label: "Marlon Modeling",
    tagline: { hr: "E-COMMERCE", en: "E-COMMERCE" },
    gradient: "linear-gradient(135deg, #1f1520 0%, #4a2e4e 50%, #8a5a9a 100%)",
    emoji: "🛍️",
  },
  {
    label: "Gym",
    tagline: { hr: "TERETANA", en: "FITNESS STUDIO" },
    gradient: "linear-gradient(135deg, #1a1a1a 0%, #2e2e2e 50%, #4a4a4a 100%)",
    emoji: "💪",
  },
  {
    label: "Slastičarnica",
    tagline: { hr: "SLATKO & SVJEŽE", en: "SWEET & FRESH" },
    gradient: "linear-gradient(135deg, #3a1f1f 0%, #7a3b2e 50%, #c97b4a 100%)",
    emoji: "🍰",
  },
  {
    label: "Salon za Nokte",
    tagline: { hr: "LJEPOTA & STIL", en: "NAIL SALON" },
    gradient: "linear-gradient(135deg, #1f1520 0%, #4a2e4e 50%, #c97bb0 100%)",
    emoji: "💅",
  },
];

export default function PortfolioSection() {
  const { lang, t } = useLanguage();

  return (
    <section className="border-t border-white/10 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <span className="inline-block bg-white text-black text-xs font-black tracking-[2px] uppercase px-3 py-1.5 rounded mb-4">
            {t.portfolioTag}
          </span>
          <h2
            className="text-3xl md:text-5xl text-white mb-3"
            style={{ fontFamily: headingFont }}
          >
            {t.portfolioTitle}
          </h2>
          <p className="text-white/50 text-sm md:text-base uppercase tracking-widest">
            {t.portfolioHint}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {WORK_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-white/10"
            >
              <div
                className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ background: item.gradient }}
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <span className="text-5xl mb-4 transition-transform duration-500 group-hover:scale-125 group-hover:-translate-y-2">
                  {item.emoji}
                </span>
                <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase mb-1 transition-opacity duration-500 group-hover:opacity-100 opacity-70">
                  {item.tagline[lang]}
                </p>
                <h3
                  className="text-white text-xl md:text-2xl"
                  style={{ fontFamily: headingFont }}
                >
                  {item.label}
                </h3>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>

        <p className="text-center text-white/40 text-sm mt-10">{t.portfolioFooter}</p>
      </div>
    </section>
  );
}
