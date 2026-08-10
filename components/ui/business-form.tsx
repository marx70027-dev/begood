"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const COUNTRIES = [
  "Hrvatska", "Srbija", "Bosna i Hercegovina", "Crna Gora", "Slovenija",
  "Makedonija", "Njemačka", "Austrija", "Švicarska", "SAD",
  "Ujedinjeno Kraljevstvo", "Kanada", "Australija", "Ostalo",
];

const BUSINESS_TYPES = [
  "Restoran / Kafić", "Trgovina", "Salon ljepote / Frizerski",
  "Fitness / Gym", "Pravne usluge / Odvjetnik", "Medicinska ordinacija",
  "Građevina / Obrt", "IT / Tehnologija", "Marketing / Agencija",
  "Fotografija / Videografija", "Edukacija / Tečajevi", "E-commerce / Web shop",
  "Nekretnine", "Turizam / Smještaj", "Ostalo",
];

const PLANS = [
  { id: "starter", name: "Starter", desc: "Jednostavna web stranica, do 5 stranica", price: "od 299€" },
  { id: "business", name: "Business", desc: "Profesionalna stranica, do 10 stranica + blog", price: "od 599€" },
  { id: "premium", name: "Premium", desc: "Kompleksna stranica, e-commerce, custom funkcionalnosti", price: "od 999€" },
  { id: "custom", name: "Custom", desc: "Po mjeri — razgovorat ćemo o vašim potrebama", price: "Po dogovoru" },
];

interface FormData {
  phone: string;
  country: string;
  businessType: string;
  plan: string;
  message: string;
  honey: string;
}

const PHONE_REGEX = /^\+?[\d\s\-()]{7,20}$/;
export default function BusinessForm() {
  const [form, setForm] = useState<FormData>({
    phone: "", country: "",
    businessType: "", plan: "", message: "", honey: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const formStartTime = useRef(Date.now());
  const lastSubmitTime = useRef(0);

  useEffect(() => {
    formStartTime.current = Date.now();
  }, []);

  const validate = useCallback((): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.phone.trim()) e.phone = "Broj mobitela je obavezan";
    else if (!PHONE_REGEX.test(form.phone.trim())) e.phone = "Nevažeći format broja";
    if (!form.country) e.country = "Odaberite državu";
    if (!form.businessType) e.businessType = "Odaberite vrstu biznisa";
    if (!form.plan) e.plan = "Odaberite plan";
    if (form.message.length > 1000) e.message = "Poruka je preduga (max 1000 znakova)";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.honey) return;

    const now = Date.now();
    const elapsed = now - formStartTime.current;
    if (elapsed < 3000) return;

    if (now - lastSubmitTime.current < 5000) return;

    if (submitCount >= 5) return;

    if (!validate()) return;

    setSubmitting(true);
    lastSubmitTime.current = now;
    setSubmitCount((c) => c + 1);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-[#0a1628] flex items-center justify-center p-6"
      >
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-3xl font-black text-white mb-4">Hvala vam!</h2>
          <p className="text-white/60 text-lg">
            Vaša prijava je zaprimljena. Javit ćemo vam se u roku 24 sata
            putem telefona ili poruke.
          </p>
          <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-4 text-left">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Vaši podaci</p>
            <p className="text-white text-sm">📱 {form.phone}</p>
            <p className="text-white text-sm">🌍 {form.country}</p>
            <p className="text-white text-sm">💼 {form.businessType}</p>
            <p className="text-white text-sm">📋 {PLANS.find((p) => p.id === form.plan)?.name}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1628] py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-10">
          <span className="inline-block bg-yellow-400 text-[#0a1628] text-xs font-black tracking-[2px] uppercase px-3 py-1.5 rounded mb-4">
            weblirev.com
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Kreirajmo vašu <span className="text-yellow-400">web stranicu</span>
          </h1>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            Ispunite obrazac ispod i javit ćemo vam se s ponudom prilagođenom vašem biznisu.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6"
          autoComplete="off"
          noValidate
        >
          {/* Honeypot */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <input
              type="text"
              name="website_url"
              tabIndex={-1}
              value={form.honey}
              onChange={(e) => update("honey", e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-white/80 text-sm font-bold mb-2">
              Broj mobitela <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+385 99 123 4567"
              maxLength={25}
              className={`w-full bg-white/[0.06] border ${errors.phone ? "border-red-400" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-yellow-400/50 transition-colors`}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Country */}
          <div>
            <label className="block text-white/80 text-sm font-bold mb-2">
              Država <span className="text-red-400">*</span>
            </label>
            <select
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
              className={`w-full bg-white/[0.06] border ${errors.country ? "border-red-400" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400/50 transition-colors cursor-pointer [&>option]:bg-[#0a1628] [&>option]:text-white`}
            >
              <option value="">Odaberite državu...</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country}</p>}
          </div>


          {/* Business type */}
          <div>
            <label className="block text-white/80 text-sm font-bold mb-2">
              Vrsta biznisa <span className="text-red-400">*</span>
            </label>
            <select
              value={form.businessType}
              onChange={(e) => update("businessType", e.target.value)}
              className={`w-full bg-white/[0.06] border ${errors.businessType ? "border-red-400" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400/50 transition-colors cursor-pointer [&>option]:bg-[#0a1628] [&>option]:text-white`}
            >
              <option value="">Za što vam treba web stranica?</option>
              {BUSINESS_TYPES.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            {errors.businessType && <p className="text-red-400 text-xs mt-1">{errors.businessType}</p>}
          </div>

          {/* Plan */}
          <div>
            <label className="block text-white/80 text-sm font-bold mb-3">
              Odaberite plan <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => update("plan", p.id)}
                  className={`text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    form.plan === p.id
                      ? "border-yellow-400 bg-yellow-400/10"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-bold text-sm">{p.name}</span>
                    <span className="text-yellow-400 font-black text-xs">{p.price}</span>
                  </div>
                  <p className="text-white/40 text-xs">{p.desc}</p>
                </button>
              ))}
            </div>
            {errors.plan && <p className="text-red-400 text-xs mt-1">{errors.plan}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="block text-white/80 text-sm font-bold mb-2">
              Dodatna poruka (opcionalno)
            </label>
            <textarea
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Opišite što želite na web stranici..."
              maxLength={1000}
              rows={3}
              className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-yellow-400/50 transition-colors resize-none"
            />
            <p className="text-white/20 text-xs text-right mt-1">{form.message.length}/1000</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || submitCount >= 5}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0a1628] font-black text-lg py-4 rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {submitting ? "Šaljem..." : submitCount >= 5 ? "Previše pokušaja" : "Pošalji prijavu"}
          </button>

          <p className="text-white/20 text-xs text-center">
            Vaši podaci su sigurni i koristimo ih isključivo za kontaktiranje.
          </p>
        </form>
      </motion.div>
    </div>
  );
}
