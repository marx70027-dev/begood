"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "hr" | "en";

interface Dict {
  heroTitle: string;
  heroSubtitle: string;
  heroEnLine: string;
  citiesTitle: string;
  portfolioTag: string;
  portfolioTitle: string;
  portfolioHint: string;
  portfolioFooter: string;
}

const dictionaries: Record<Lang, Dict> = {
  hr: {
    heroTitle: "Izrada web stranica za cijelu Hrvatsku - 1000€ za bilo koji web",
    heroSubtitle:
      "Zagreb, Split, Rijeka, Osijek, Zadar, Pula, Dubrovnik... Mala ili ogromna stranica, ista cijena 1000€. Domena, hosting, dizajn i SEO - sve uključeno.",
    heroEnLine: "Any website anywhere in Croatia — same flat price 1000€.",
    citiesTitle: "Radimo u svim gradovima",
    portfolioTag: "Naši radovi",
    portfolioTitle: "Pogledaj što smo već napravili",
    portfolioHint: "Pređi mišem preko kartice",
    portfolioFooter: "Bavimo se i drugim vrstama biznisa — javi nam se za svoju ideju.",
  },
  en: {
    heroTitle: "Website design for all of Croatia - flat 1000€ for any website",
    heroSubtitle:
      "Zagreb, Split, Rijeka, Osijek, Zadar, Pula, Dubrovnik... Small or huge website, same flat price 1000€. Domain, hosting, design and SEO - all included.",
    heroEnLine: "Bilo koji web, bilo gdje u Hrvatskoj — ista cijena 1000€.",
    citiesTitle: "We work in every city",
    portfolioTag: "Our Work",
    portfolioTitle: "See what we've already built",
    portfolioHint: "Hover over a tile to preview",
    portfolioFooter: "We also work with other types of businesses — reach out with your idea.",
  },
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("hr");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
