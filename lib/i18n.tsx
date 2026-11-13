"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "hr" | "en";

export interface FaqItem {
  q: string;
  a: string;
}

interface Dict {
  heroTitlePre: string;
  heroTitlePrice: string;
  heroTitlePost: string;
  heroSubtitle: string;
  heroEnLine: string;
  citiesTitle: string;
  citiesSubtitle: string;
  citiesCount: string;
  aiTag: string;
  aiTitle: string;
  aiBody: string;
  aiCommandLabel: string;
  aiResultLine1: string;
  aiResultLine2: string;
  aiResultLine3: string;
  portfolioTag: string;
  portfolioTitle: string;
  portfolioHint: string;
  portfolioFooter: string;

  formBadge: string;
  formTitlePre: string;
  formTitleHighlight: string;
  formSubtitle: string;
  faqTitle: string;
  faq: FaqItem[];
  phoneLabel: string;
  phonePlaceholder: string;
  countryLabel: string;
  countryPlaceholder: string;
  businessLabel: string;
  businessPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitBtn: string;
  submittingBtn: string;
  tooManyBtn: string;
  privacyNote: string;
  submitError: string;
  thankYouTitle: string;
  thankYouBody: string;
  yourDetails: string;
  errorPhoneRequired: string;
  errorPhoneInvalid: string;
  errorCountryRequired: string;
  errorBusinessRequired: string;
  errorMessageTooLong: string;
}

const faqHr: FaqItem[] = [
  { q: "Koliko košta izrada web stranice?", a: "Profesionalna web stranica kreće od 1.000€. Konačna cijena ovisi o složenosti, broju stranica i funkcionalnostima koje trebaš. Javi nam se za personaliziranu ponudu." },
  { q: "Koliko dugo traje izrada web stranice?", a: "Većina stranica je gotova za 2-4 tjedna, ovisno o složenosti. Dat ćemo ti jasan vremenski okvir nakon što vidimo tvoje potrebe." },
  { q: "Moram li ja osigurati sadržaj i slike?", a: "Pomaže ako ih imaš, ali možemo i mi napisati sadržaj i pronaći profesionalne slike. Vodit ćemo te kroz cijeli proces." },
  { q: "Hoće li moja stranica raditi na mobitelu?", a: "Apsolutno. Svaka stranica koju napravimo je potpuno responzivna i izgleda odlično na mobitelima, tabletima i računalima." },
  { q: "Nudite li hosting i održavanje?", a: "Da — hosting i održavanje su uključeni u cijenu. SSL, sigurnosne kopije, ažuriranja i podrška su pokriveni bez dodatne naplate." },
  { q: "Mogu li sam mijenjati stranicu nakon izrade?", a: "Da. Gradimo na modernim platformama s jednostavnim admin sučeljima. Također osiguravamo kratku obuku kako bi samouvjereno upravljao sadržajem." },
  { q: "Što ako nisam zadovoljan dizajnom?", a: "Uključujemo do 3 kruga revizija. Blisko surađujemo s tobom kako bi finalni rezultat odgovarao tvojoj viziji." },
  { q: "Radite li online trgovine?", a: "Da. Možemo napraviti punu e-commerce funkcionalnost — stranice proizvoda, košaricu, plaćanje i upravljanje narudžbama." },
];

const faqEn: FaqItem[] = [
  { q: "How much does a website cost?", a: "A professional website starts from €1,000. The final price depends on complexity, number of pages, and features you need. Contact us for a personalized quote." },
  { q: "How long does it take to build a website?", a: "Most websites take 2–4 weeks depending on complexity. We'll give you a clear timeline after reviewing your needs." },
  { q: "Do I need to provide content and images?", a: "It helps if you do, but we can also write content and source professional images for you. We'll guide you through the whole process." },
  { q: "Will my website be mobile-friendly?", a: "Absolutely. Every website we build is fully responsive and looks great on phones, tablets, and desktops." },
  { q: "Do you offer hosting and maintenance?", a: "Yes — hosting and maintenance are included in the price. SSL, backups, updates, and support are all covered at no extra cost." },
  { q: "Can I update the website myself after it's built?", a: "Yes. We build on modern platforms with easy-to-use admin panels. We also provide a quick training session so you can manage your content confidently." },
  { q: "What if I'm not happy with the design?", a: "We include up to 3 rounds of revisions. We work closely with you to make sure the final result matches your vision." },
  { q: "Do you build online stores?", a: "Yes. We can build full e-commerce functionality — product pages, cart, checkout, payment integration, and order management." },
];

const dictionaries: Record<Lang, Dict> = {
  hr: {
    heroTitlePre: "Izrada web stranica za cijelu Hrvatsku - ",
    heroTitlePrice: "1000€",
    heroTitlePost: " za bilo koji web",
    heroSubtitle:
      "Zagreb, Split, Rijeka, Osijek, Zadar, Pula, Dubrovnik... Mala ili ogromna stranica, ista cijena 1000€. Domena, hosting, dizajn i SEO - sve uključeno.",
    heroEnLine: "Any website anywhere in Croatia — same flat price 1000€.",
    citiesTitle: "Radimo u svim gradovima",
    citiesSubtitle: "Bez obzira jesi li u glavnom gradu ili manjem mjestu — dolazimo do tebe, online i uživo.",
    citiesCount: "14+ gradova diljem Hrvatske",
    aiTag: "AI Vidljivost",
    aiTitle: "Tvoju stranicu prepoznaje i umjetna inteligencija",
    aiBody: "Svaka stranica koju napravimo dolazi s llms.txt datotekom koja AI alatima (ChatGPT, Claude, Perplexity...) jasno govori tko si, čime se baviš i kako te kontaktirati — tako te lakše pronalaze i preporučuju.",
    aiCommandLabel: "AI čita weblirev.com/llms.txt",
    aiResultLine1: "Usluga: Izrada web stranica za cijelu Hrvatsku",
    aiResultLine2: "Cijena: 1000€ flat",
    aiResultLine3: "Status: Prepoznato ✓",
    portfolioTag: "Naši radovi",
    portfolioTitle: "Pogledaj što smo već napravili",
    portfolioHint: "Pređi mišem preko kartice",
    portfolioFooter: "Bavimo se i drugim vrstama biznisa — javi nam se za svoju ideju.",

    formBadge: "weblirev.com",
    formTitlePre: "Napravimo tvoju ",
    formTitleHighlight: "web stranicu",
    formSubtitle: "Ispuni formu ispod i javit ćemo ti se s ponudom prilagođenom tvom biznisu.",
    faqTitle: "Često postavljana pitanja",
    faq: faqHr,
    phoneLabel: "Broj telefona",
    phonePlaceholder: "+385 91 234 5678",
    countryLabel: "Država",
    countryPlaceholder: "Odaberi državu...",
    businessLabel: "Vrsta biznisa",
    businessPlaceholder: "Za što trebaš web stranicu?",
    messageLabel: "Dodatna poruka (opcionalno)",
    messagePlaceholder: "Opiši što želiš na svojoj stranici...",
    submitBtn: "Pošalji upit",
    submittingBtn: "Šaljem...",
    tooManyBtn: "Previše pokušaja",
    privacyNote: "Tvoji podaci su sigurni i koriste se samo za kontaktiranje.",
    submitError: "Nešto je pošlo po krivu. Pokušaj ponovno.",
    thankYouTitle: "Hvala ti!",
    thankYouBody: "Tvoj upit je zaprimljen. Javit ćemo ti se u roku od 24 sata telefonom ili porukom.",
    yourDetails: "Tvoji podaci",
    errorPhoneRequired: "Broj telefona je obavezan",
    errorPhoneInvalid: "Neispravan format broja",
    errorCountryRequired: "Molimo odaberi državu",
    errorBusinessRequired: "Molimo odaberi vrstu biznisa",
    errorMessageTooLong: "Poruka je predugačka (max 1000 znakova)",
  },
  en: {
    heroTitlePre: "Website design for all of Croatia - flat ",
    heroTitlePrice: "1000€",
    heroTitlePost: " for any website",
    heroSubtitle:
      "Zagreb, Split, Rijeka, Osijek, Zadar, Pula, Dubrovnik... Small or huge website, same flat price 1000€. Domain, hosting, design and SEO - all included.",
    heroEnLine: "Bilo koji web, bilo gdje u Hrvatskoj — ista cijena 1000€.",
    citiesTitle: "We work in every city",
    citiesSubtitle: "Whether you're in the capital or a smaller town — we come to you, online and in person.",
    citiesCount: "14+ cities across Croatia",
    aiTag: "AI Visibility",
    aiTitle: "Your website gets recognized by AI too",
    aiBody: "Every website we build ships with an llms.txt file that tells AI tools (ChatGPT, Claude, Perplexity...) exactly who you are, what you do, and how to reach you — so they find and recommend you more easily.",
    aiCommandLabel: "AI reads weblirev.com/llms.txt",
    aiResultLine1: "Service: Website design for all of Croatia",
    aiResultLine2: "Price: 1000€ flat",
    aiResultLine3: "Status: Recognized ✓",
    portfolioTag: "Our Work",
    portfolioTitle: "See what we've already built",
    portfolioHint: "Hover over a tile to preview",
    portfolioFooter: "We also work with other types of businesses — reach out with your idea.",

    formBadge: "weblirev.com",
    formTitlePre: "Let's Build Your ",
    formTitleHighlight: "Website",
    formSubtitle: "Fill out the form below and we'll get back to you with a tailored offer for your business.",
    faqTitle: "Frequently Asked Questions",
    faq: faqEn,
    phoneLabel: "Phone Number",
    phonePlaceholder: "+1 555 123 4567",
    countryLabel: "Country",
    countryPlaceholder: "Select your country...",
    businessLabel: "Business Type",
    businessPlaceholder: "What do you need a website for?",
    messageLabel: "Additional Message (optional)",
    messagePlaceholder: "Describe what you want on your website...",
    submitBtn: "Submit Request",
    submittingBtn: "Sending...",
    tooManyBtn: "Too many attempts",
    privacyNote: "Your data is secure and used only for contacting you.",
    submitError: "Something went wrong. Please try again.",
    thankYouTitle: "Thank You!",
    thankYouBody: "Your request has been received. We will contact you within 24 hours by phone or message.",
    yourDetails: "Your Details",
    errorPhoneRequired: "Phone number is required",
    errorPhoneInvalid: "Invalid phone format",
    errorCountryRequired: "Please select a country",
    errorBusinessRequired: "Please select a business type",
    errorMessageTooLong: "Message is too long (max 1000 characters)",
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
