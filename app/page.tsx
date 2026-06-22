"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, CheckCircle, Hammer, Paintbrush, Grid3x3 } from "lucide-react";
import { useState } from "react";
import HeroAnimation from "@/components/ui/hero-animation";
import DisplayCards from "@/components/ui/display-cards";
import { Button } from "@/components/ui/neon-button";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

const GALLERY = [
  { src: "/galerija/91168180-9de4-4005-8dda-1377ec6b17d6.jpeg", label: "Moleraj", tall: true },
  { src: "/galerija/e8501d74-b603-431e-800d-c39b99016f4f.jpeg", label: "Moleraj", wide: true },
  { src: "/galerija/9d48078a-c9d0-4932-8daf-322a5b61ed19.jpeg", label: "Moleraj" },
  { src: "/galerija/1d658dbe-9cdc-4369-81ce-4a240c5a9646.jpeg", label: "Keramika" },
  { src: "/galerija/ccdce442-3f18-4c50-9852-cb475eb5bdc2.jpeg", label: "Moleraj" },
  { src: "/galerija/c1cdb7a1-dd85-4c03-a8f0-3ec0f8a13131.jpeg", label: "Keramika" },
  { src: "/galerija/c1cdb7a1-dd85-4c03-a8f0-3ec0f8a13131_1.jpeg", label: "Keramika" },
  { src: "/galerija/ccdce442-3f18-4c50-9852-cb475eb5bdc2_1.jpeg", label: "Moleraj" },
  { src: "/galerija/e8501d74-b603-431e-800d-c39b99016f4f_1.jpeg", label: "Moleraj" },
];

const SERVICES_CARDS = [
  {
    icon: <Hammer className="size-4 text-yellow-300" />,
    title: "Fasade",
    description: "Toplinska izolacija, žbuke",
    date: "ETICS · Silikonske · Akrilne",
    titleClassName: "text-yellow-400",
    className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-full before:rounded-xl before:h-full before:content-[''] before:bg-[#0a1628]/70 hover:before:opacity-0 before:transition-opacity before:duration-700 before:left-0 before:top-0",
  },
  {
    icon: <Paintbrush className="size-4 text-yellow-300" />,
    title: "Moleraj",
    description: "Gletanje, bojanje zidova",
    date: "Unutarnji · Vanjski · Dekorativni",
    titleClassName: "text-yellow-400",
    className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-full before:rounded-xl before:h-full before:content-[''] before:bg-[#0a1628]/70 hover:before:opacity-0 before:transition-opacity before:duration-700 before:left-0 before:top-0",
  },
  {
    icon: <Grid3x3 className="size-4 text-yellow-300" />,
    title: "Keramika",
    description: "Pločice, mozaik, kamen",
    date: "Kupaonice · Podovi · Terase",
    titleClassName: "text-yellow-400",
    className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
  },
];

type PriceRow = { name: string; desc: string; price: string; hot?: boolean; isNew?: boolean };

const PRICE_DATA: Record<PriceTab, PriceRow[]> = {
  fasade: [
    { name: "Topla fasada (EPS)", desc: "Ljepljenje, armirani sloj, završna žbuka", price: "od 35 €/m²", hot: true },
    { name: "Silikonska završna žbuka", desc: "Na pripremljenu podlogu", price: "od 12 €/m²" },
    { name: "Akrilna žbuka", desc: "Glatka ili struktura po izboru", price: "od 10 €/m²" },
    { name: "Kamena vuna + fasada", desc: "Vatrostalni sustav", price: "od 45 €/m²" },
    { name: "Sanacija fasade", desc: "Krpanje, premaz, bojanje", price: "od 15 €/m²" },
    { name: "Mozaik fasada", desc: "Razne granulacije i boje", price: "od 18 €/m²" },
  ],
  moleraj: [
    { name: "Gletanje (2 sloja)", desc: "Dvostruko + brušenje", price: "od 7 €/m²", hot: true },
    { name: "Bojanje zidova (2 sloja)", desc: "Disperzivna boja po izboru", price: "od 4 €/m²" },
    { name: "Kompletni moleraj sobe", desc: "Priprema + gletanje + bojanje", price: "od 10 €/m²" },
    { name: "Dekorativna žbuka", desc: "Beton look, mramor, venecijanski efekti", price: "od 18 €/m²", isNew: true },
    { name: "Tapete", desc: "Sve vrste, priprema + postava", price: "od 8 €/m²" },
    { name: "Ličenje drva i metala", desc: "Prozori, vrata, ograde", price: "po dogovoru" },
  ],
  keramika: [
    { name: "Podne pločice", desc: "Standardne i large-format", price: "od 12 €/m²", hot: true },
    { name: "Zidne pločice", desc: "Kupaonice, kuhinje, predprostori", price: "od 14 €/m²" },
    { name: "Kupaonica komplet", desc: "Pod + zidovi + fugiranje", price: "od 25 €/m²" },
    { name: "Terasa / vanjski prostori", desc: "Vodonepropusna postava", price: "od 18 €/m²" },
    { name: "Prirodni kamen", desc: "Mramor, granit, travertin", price: "od 25 €/m²" },
    { name: "Fugiranje", desc: "Klasično ili epoksidno", price: "od 3 €/m²" },
  ],
};

type PriceTab = "fasade" | "moleraj" | "keramika";

export default function Home() {
  const [activeTab, setActiveTab] = useState<PriceTab>("fasade");
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="bg-white overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/97 backdrop-blur-md border-b-2 border-yellow-400 flex items-center justify-between px-[6%] h-[68px]">
        <a href="#" className="text-2xl font-black text-white tracking-tight">
          Be<span className="text-yellow-400">Good</span>
        </a>
        <ul className="hidden md:flex gap-8 list-none">
          {(["sto-radimo", "galerija", "cjenik", "kontakt"] as const).map((id) => (
            <li key={id}>
              <a href={`#${id}`} className="text-white/80 hover:text-yellow-400 text-sm font-semibold uppercase tracking-wide transition-colors">
                {id === "sto-radimo" ? "Što radimo" : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <a href="tel:0992263774" className="bg-yellow-400 text-[#0a1628] px-4 py-2 rounded-lg font-black text-sm hover:bg-yellow-300 transition-colors whitespace-nowrap">
          📞 099 2263774
        </a>
      </nav>

      {/* HERO */}
      <section className="relative w-full h-screen min-h-[500px] flex items-center overflow-hidden bg-[#0a1628]">
        <HeroAnimation />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/55 to-[#0a1628]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 via-transparent to-transparent" />

        <motion.div initial={{ opacity: 0, scale: 1.5 }} animate={{ opacity: 0.12, scale: 1 }} transition={{ duration: 2, delay: 0.5 }}
          className="absolute right-[5%] top-[20%] w-[500px] h-[120px] rounded-full bg-yellow-400 blur-3xl pointer-events-none" />

        <div className="relative z-10 px-[6%] md:px-[8%] max-w-2xl">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <span className="inline-block bg-yellow-400 text-[#0a1628] text-xs font-black tracking-[2px] uppercase px-3 py-1.5 rounded mb-5">
              Zagreb &amp; okolica
            </span>
          </motion.div>
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] mb-5 drop-shadow-2xl">
            Fasade, moleraj<br />i <span className="text-yellow-400">keramika</span>
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
            Kvalitetna izvedba, pouzdani majstori i besprijekoran završni izgled.
            Procjena je <strong className="text-yellow-400">besplatna</strong>.
          </motion.p>
          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="flex gap-3 flex-wrap">
            <a href="#kontakt">
              <Button variant="solid" size="lg" className="text-base font-black px-8 py-3 rounded-xl">Zatražite ponudu</Button>
            </a>
            <a href="#galerija">
              <Button variant="ghost" size="lg" className="text-white border-white/40 text-base px-8 py-3 rounded-xl">Pogledaj radove</Button>
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-[#0a1628]/80 backdrop-blur-sm border-t border-yellow-400/20 flex justify-center items-center gap-8 py-3 px-[6%] flex-wrap z-10">
          {["🏅 Vrhunska kvaliteta", "🔧 Stručna izvedba", "✨ Moderan dizajn", "📅 Brzi rokovi"].map((b) => (
            <span key={b} className="text-white text-sm font-semibold">{b}</span>
          ))}
        </div>
      </section>

      {/* ŠTO RADIMO */}
      <section id="sto-radimo" className="bg-[#f4f6fa] py-24 px-[6%]">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
          <span className="text-yellow-500 text-xs font-black tracking-[3px] uppercase block mb-2">Naše usluge</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0a1628]">Što radimo</h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg">Specijalizirani smo za tri ključna područja — od temelja do savršenog završnog izgleda.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-24">
          {[
            { icon: <Hammer className="size-7" />, title: "Fasade", items: ["Toplinska izolacija — ETICS", "Silikonske i akrilne žbuke", "Dekorativne fasade", "Obnova starih fasada", "Mozaik i kamene fasade"] },
            { icon: <Paintbrush className="size-7" />, title: "Moleraj", items: ["Gletanje i izravnanje zidova", "Bojanje zidova i stropova", "Dekorativne žbuke i efekti", "Postavljanje tapeta", "Ličenje drva i metala"] },
            { icon: <Grid3x3 className="size-7" />, title: "Keramika", items: ["Podne i zidne pločice", "Kupaonice i kuhinje", "Terasa i vanjski prostori", "Prirodni kamen", "Fugiranje i brtvljenje"] },
          ].map((s, i) => (
            <motion.div key={s.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="h-1.5 bg-gradient-to-r from-[#1a3a6e] to-yellow-400" />
              <div className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0a1628] to-[#1a3a6e] flex items-center justify-center text-yellow-400 mb-5">{s.icon}</div>
                <h3 className="text-2xl font-black text-[#0a1628] mb-3">{s.title}</h3>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-600 text-sm">
                      <CheckCircle className="size-4 text-yellow-500 flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Display Cards */}
        <div className="bg-[#0a1628] rounded-3xl py-16 px-6 max-w-6xl mx-auto flex flex-col items-center">
          <span className="text-yellow-400 text-xs font-black tracking-[3px] uppercase mb-10">Naše specijalizacije</span>
          <DisplayCards cards={SERVICES_CARDS} />
        </div>
      </section>

      {/* GALERIJA */}
      <section id="galerija" className="bg-[#0a1628] py-24 px-[6%]">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-12">
          <span className="text-yellow-400 text-xs font-black tracking-[3px] uppercase block mb-2">Naši radovi</span>
          <h2 className="text-4xl md:text-5xl font-black text-white">Galerija</h2>
          <p className="text-white/50 mt-4 text-lg">Primjeri završenih projekata — moleraj, keramika i fasade</p>
        </motion.div>
        <div className="columns-2 md:columns-3 gap-3 max-w-6xl mx-auto space-y-3">
          {GALLERY.map((img, i) => (
            <motion.div key={img.src} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl cursor-pointer group break-inside-avoid"
              onClick={() => setLightbox(img.src)}>
              <Image src={img.src} alt={img.label} width={600} height={img.tall ? 800 : 400}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl" />
              <div className="absolute inset-0 bg-[#0a1628]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 rounded-xl">
                <span className="bg-yellow-400 text-[#0a1628] text-xs font-black uppercase px-2 py-1 rounded">{img.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CJENIK */}
      <section id="cjenik" className="bg-[#f4f6fa] py-24 px-[6%]">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-10">
          <span className="text-yellow-500 text-xs font-black tracking-[3px] uppercase block mb-2">Transparentne cijene</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0a1628]">Cjenik usluga</h2>
          <p className="text-gray-500 mt-3 text-lg max-w-xl">Okvirne cijene bez PDV-a. Procjena je <strong>besplatna</strong> — dolazimo na mjerenje.</p>
        </motion.div>
        <div className="bg-yellow-400/15 border border-yellow-400 rounded-xl p-4 mb-6 text-sm text-gray-700">
          ℹ️ Pozovite <strong>099 2263774</strong> za točnu ponudu — dolazimo na besplatni pregled.
        </div>
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["fasade", "moleraj", "keramika"] as PriceTab[]).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg border-2 font-bold text-sm transition-all cursor-pointer ${activeTab === tab ? "bg-[#0a1628] text-white border-[#0a1628]" : "border-[#1a3a6e] text-[#1a3a6e] hover:bg-[#0a1628] hover:text-white hover:border-[#0a1628]"}`}>
              {tab === "fasade" ? "🏗️ Fasade" : tab === "moleraj" ? "🖌️ Moleraj" : "🪵 Keramika"}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl overflow-hidden shadow-md max-w-5xl">
          <table className="w-full border-collapse">
            <thead className="bg-[#0a1628] text-white">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider">Usluga</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider hidden sm:table-cell">Opis</th>
                <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider">Cijena</th>
              </tr>
            </thead>
            <tbody>
              {PRICE_DATA[activeTab].map((row, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-[#0a1628]">
                    {row.name}
                    {row.hot && <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 font-bold px-2 py-0.5 rounded uppercase">Popularno</span>}
                    {row.isNew && <span className="ml-2 text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded uppercase">Novo</span>}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm hidden sm:table-cell">{row.desc}</td>
                  <td className="px-6 py-4 text-right font-bold text-[#1a3a6e] whitespace-nowrap">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="bg-gradient-to-br from-[#0a1628] to-[#1a3a6e] py-24 px-[6%] text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="text-yellow-400 text-xs font-black tracking-[3px] uppercase block mb-3">Kontakt</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Zatražite besplatnu procjenu</h2>
          <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto">Javljamo se u roku 24h. Dolazimo na pregled i mjerenje — bez naknade.</p>
        </motion.div>
        <div className="flex justify-center gap-4 flex-wrap mb-10">
          {[
            { icon: <Phone className="size-6" />, label: "Telefon / WhatsApp", val: "099 2263774", href: "tel:0992263774" },
            { icon: <MapPin className="size-6" />, label: "Područje rada", val: "Zagreb i okolica" },
            { icon: <Clock className="size-6" />, label: "Radno vrijeme", val: "Pon–Sub 7:00–19:00" },
          ].map((c) => (
            <div key={c.label} className="bg-white/[0.08] border border-white/15 rounded-2xl px-8 py-6 flex flex-col items-center gap-2 min-w-[200px]">
              <span className="text-yellow-400">{c.icon}</span>
              <span className="text-white/40 text-xs uppercase tracking-wider font-semibold">{c.label}</span>
              {c.href
                ? <a href={c.href} className="text-yellow-400 font-black text-xl hover:underline">{c.val}</a>
                : <span className="text-white font-bold text-lg">{c.val}</span>}
            </div>
          ))}
        </div>
        <a href="tel:0992263774"
          className="inline-block bg-yellow-400 text-[#0a1628] font-black text-xl px-12 py-4 rounded-2xl hover:bg-yellow-300 transition-all hover:-translate-y-1 shadow-2xl shadow-yellow-400/30">
          📞 Nazovite odmah — 099 2263774
        </a>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#040d1a] text-white/30 text-center py-5 text-sm">
        <p>&copy; 2025 <span className="text-yellow-400 font-bold">BeGood</span> — Fasade, Moleraj, Keramika · Zagreb · 099 2263774</p>
        <p className="mt-1 text-xs">Kvaliteta koja se vidi, usluga kojoj vjerujete.</p>
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="fixed inset-0 z-[9999] bg-black/92 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-6 text-white text-4xl leading-none z-10">✕</button>
          <div className="relative max-w-[92vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={lightbox} alt="" width={1200} height={900} className="object-contain max-h-[90vh] rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
}
