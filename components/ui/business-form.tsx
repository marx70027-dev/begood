"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import Confetti from "./confetti";

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany",
  "Austria", "Switzerland", "France", "Italy", "Spain",
  "Netherlands", "Croatia", "Serbia", "Bosnia and Herzegovina",
  "Slovenia", "Montenegro", "Other",
];

const BUSINESS_TYPES = [
  "Restaurant / Cafe", "Retail / Shop", "Beauty Salon / Barbershop",
  "Fitness / Gym", "Legal Services / Law Firm", "Medical Practice",
  "Construction / Trades", "IT / Technology", "Marketing / Agency",
  "Photography / Videography", "Education / Courses", "E-commerce / Online Store",
  "Real Estate", "Tourism / Hospitality", "Other",
];

interface FormData {
  phone: string;
  country: string;
  businessType: string;
  message: string;
  honey: string;
}

const PHONE_REGEX = /^\+?[\d\s\-()]{7,20}$/;

const headingFont = "'Bodoni MT Black', 'Bodoni MT', 'Didot', 'Georgia', serif";

export default function BusinessForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState<FormData>({
    phone: "", country: "",
    businessType: "", message: "", honey: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitCount, setSubmitCount] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const formStartTime = useRef(Date.now());
  const lastSubmitTime = useRef(0);

  useEffect(() => {
    formStartTime.current = Date.now();
  }, []);

  const validate = useCallback((): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.phone.trim()) e.phone = t.errorPhoneRequired;
    else if (!PHONE_REGEX.test(form.phone.trim())) e.phone = t.errorPhoneInvalid;
    if (!form.country) e.country = t.errorCountryRequired;
    if (!form.businessType) e.businessType = t.errorBusinessRequired;
    if (form.message.length > 1000) e.message = t.errorMessageTooLong;
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form, t]);

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
    setSubmitError("");
    lastSubmitTime.current = now;
    setSubmitCount((c) => c + 1);

    fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: form.phone.trim(),
        country: form.country,
        businessType: form.businessType,
        message: form.message.trim(),
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        setSubmitted(true);
      })
      .catch(() => {
        setSubmitError(t.submitError);
      })
      .finally(() => {
        setSubmitting(false);
      });
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
        className="min-h-screen bg-black flex items-center justify-center p-6"
      >
        <Confetti />
        <div className="text-center max-w-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
            className="text-6xl mb-6"
          >
            ✅
          </motion.div>
          <h2
            className="text-3xl font-black text-white mb-4"
            style={{ fontFamily: headingFont }}
          >
            {t.thankYouTitle}
          </h2>
          <p className="text-white/60 text-lg">{t.thankYouBody}</p>
          <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-4 text-left">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-2">{t.yourDetails}</p>
            <p className="text-white text-sm">📱 {form.phone}</p>
            <p className="text-white text-sm">🌍 {form.country}</p>
            <p className="text-white text-sm">💼 {form.businessType}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div id="contact-form" className="min-h-screen bg-black py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-10">
          <span className="inline-block bg-white text-black text-xs font-black tracking-[2px] uppercase px-3 py-1.5 rounded mb-4">
            {t.formBadge}
          </span>
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-3"
            style={{ fontFamily: headingFont }}
          >
            {t.formTitlePre}
            <span className="text-white/60">{t.formTitleHighlight}</span>
          </h1>
          <p className="text-white/50 text-lg max-w-lg mx-auto">{t.formSubtitle}</p>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2
            className="text-2xl font-black text-white mb-5 text-center"
            style={{ fontFamily: headingFont }}
          >
            {t.faqTitle}
          </h2>
          <div className="space-y-2">
            {t.faq.map((item, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-white/[0.03] transition-colors"
                >
                  <span className="text-white text-sm font-bold pr-4">{item.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/40 text-xl flex-shrink-0"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-white/50 text-sm leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="relative bg-white/[0.04] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6"
          autoComplete="off"
          noValidate
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <input
              type="text"
              name="website_url"
              tabIndex={-1}
              value={form.honey}
              onChange={(e) => update("honey", e.target.value)}
            />
          </div>

          <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
            <label className="block text-white/80 text-sm font-bold mb-2">
              {t.phoneLabel} <span className="text-red-400">*</span>
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder={t.phonePlaceholder}
              maxLength={25}
              className={`w-full bg-white/[0.06] border ${errors.phone ? "border-red-400" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-white/40 transition-colors`}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
            <label className="block text-white/80 text-sm font-bold mb-2">
              {t.countryLabel} <span className="text-red-400">*</span>
            </label>
            <motion.select
              whileFocus={{ scale: 1.01 }}
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
              className={`w-full bg-white/[0.06] border ${errors.country ? "border-red-400" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors cursor-pointer [&>option]:bg-black [&>option]:text-white`}
            >
              <option value="">{t.countryPlaceholder}</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </motion.select>
            {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country}</p>}
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
            <label className="block text-white/80 text-sm font-bold mb-2">
              {t.businessLabel} <span className="text-red-400">*</span>
            </label>
            <motion.select
              whileFocus={{ scale: 1.01 }}
              value={form.businessType}
              onChange={(e) => update("businessType", e.target.value)}
              className={`w-full bg-white/[0.06] border ${errors.businessType ? "border-red-400" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors cursor-pointer [&>option]:bg-black [&>option]:text-white`}
            >
              <option value="">{t.businessPlaceholder}</option>
              {BUSINESS_TYPES.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </motion.select>
            {errors.businessType && <p className="text-red-400 text-xs mt-1">{errors.businessType}</p>}
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
            <label className="block text-white/80 text-sm font-bold mb-2">{t.messageLabel}</label>
            <motion.textarea
              whileFocus={{ scale: 1.01 }}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder={t.messagePlaceholder}
              maxLength={1000}
              rows={3}
              className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-white/40 transition-colors resize-none"
            />
            <p className="text-white/20 text-xs text-right mt-1">{form.message.length}/1000</p>
          </motion.div>

          {submitError && <p className="text-red-400 text-sm text-center">{submitError}</p>}

          <motion.button
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ scale: submitting || submitCount >= 5 ? 1 : 1.02 }}
            whileTap={{ scale: submitting || submitCount >= 5 ? 1 : 0.98 }}
            type="submit"
            disabled={submitting || submitCount >= 5}
            className="w-full bg-white text-black font-black text-lg py-4 rounded-xl hover:bg-white/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? t.submittingBtn : submitCount >= 5 ? t.tooManyBtn : t.submitBtn}
          </motion.button>

          <p className="text-white/20 text-xs text-center">{t.privacyNote}</p>
        </motion.form>
      </motion.div>
    </div>
  );
}
